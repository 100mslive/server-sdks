import AuthService from "./AuthService";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { logger } from "./LoggerService";
import { ErrorFactory } from "../errorFactory";
import { castDateFields, serializeQueryParams } from "../utils/typeUtils";

export default class APIService {
  private baseUrl =
    process.env.HMS_ENV === "nonprod"
      ? "https://api-nonprod.100ms.live/v2"
      : "https://api.100ms.live/v2";
  private readonly axios: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 3 * 60000,
    });
    this.setupAxios();
  }

  async get<T>(path: string, queryParams?: Record<string, any>): Promise<T> {
    const resp: AxiosResponse = await this.axios.get(path, {
      params: queryParams,
      paramsSerializer: (params) => serializeQueryParams(params),
    });
    logger.debug(
      `GET - ${path}
          Status code: ${resp.status}`
    );
    return castDateFields<T>(resp.data);
  }

  async post<T, P>(path: string, payload?: P): Promise<T> {
    const resp: AxiosResponse = await this.axios.post(path, payload ?? {});
    logger.debug(
      `POST - ${path}
          Status code: ${resp.status}`
    );
    return castDateFields<T>(resp.data);
  }

  private setupAxios() {
    // use auth token for all requests, refresh auth token on getting 401
    this.axios.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${(await this.authService.getManagementToken()).token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;
        logger.error(
          `Error in ${originalRequest.method?.toUpperCase()} API call - ${originalRequest.url}`,
          {
            statusCode: error.response?.status,
            response: error.response?.data,
          }
        );
        if (
          (error.response?.status === 403 || error.response?.status === 401) &&
          !(originalRequest as any)._retry
        ) {
          logger.debug("Retrying request with refreshed token");
          (originalRequest as any)._retry = true;
          const { token: authToken } = await this.authService.getManagementToken({
            forceNew: true,
          });
          this.axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
          try {
            return this.axios(originalRequest);
          } catch (error) {
            throw this.convertAxiosErrorToHMS(error as AxiosError);
          }
        }
        return Promise.reject(this.convertAxiosErrorToHMS(error));
      }
    );
  }

  private convertAxiosErrorToHMS(error: AxiosError) {
    return ErrorFactory.MakeError(
      error.response?.status,
      error.response?.statusText,
      // @ts-ignore
      error.response?.data?.message
    );
  }
}
