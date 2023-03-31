export enum ErrorCodes {
  TIMEOUT = 503,
  NOT_FOUND = 404,
}

export interface SDKException {
  code?: number;
  name: string;
  message: string;
}
