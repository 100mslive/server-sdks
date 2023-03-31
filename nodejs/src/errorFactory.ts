import { ErrorCodes, HMSException } from "./types";

export const ErrorFactory = {
  Timeout(message: string): HMSException {
    return {
      code: ErrorCodes.TIMEOUT,
      name: "TIMEOUT",
      message,
    };
  },

  MakeError(code?: number, status?: string, message?: string): HMSException {
    return {
      code,
      name: status ?? "Unknown",
      message: message ?? "An unknown Error occurred!",
    };
  },
};
