import { AuthService } from "./AuthService";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { logger } from "./LoggerService";
import { ErrorFactory } from "./Errors";

export class APIService {
  private baseUrl =
    process.env.HMS_ENV === "nonprod"
      ? "https://api-nonprod.100ms.live/v2"
      : "https://api.100ms.live/v2";
  private readonly axios: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 3 * 60000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupAxios();
  }

  async get<T>(path: string, queryParams?: Record<string, any>): Promise<T> {
    const resp: AxiosResponse = await this.axios.get(path, { params: queryParams });
    logger.debug(`get call to path - ${path}, status code - ${resp.status}`);
    return resp.data;
  }

  async post<T, P>(path: string, payload: P): Promise<T> {
    const resp: AxiosResponse = await this.axios.post(path, payload || {});
    logger.debug(`post call to path - ${path}, status code - ${resp.status}`);
    return resp.data;
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
      async (error) => {
        logger.error("error in making api call", { response: error.response?.data });
        const originalRequest = error.config;
        if (
          (error.response?.status === 403 || error.response?.status === 401) &&
          !originalRequest._retry
        ) {
          logger.debug("retrying request with refreshed token");
          originalRequest._retry = true;
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
