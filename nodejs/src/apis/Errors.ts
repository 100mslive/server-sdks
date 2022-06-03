export enum ErrorCodes {
  TIMEOUT = 503,
  NOT_FOUND = 404,
}

export interface HMSException {
  code?: number;
  name: string;
  message: string;
}

export const ErrorFactory = {
  Timeout(message: string) {
    return {
      code: ErrorCodes.TIMEOUT,
      name: "TIMEOUT",
      message,
    };
  },

  NotFound(message: string) {
    return {
      code: ErrorCodes.NOT_FOUND,
      name: "NOT_FOUND",
      message,
    };
  },

  PassThrough(code?: number, status?: string, message?: string) {
    return {
      code,
      name: status,
      message,
    };
  },
};
