import { ErrorCodes, SDKException } from "./types";

export const ErrorFactory = {
  Timeout(message: string): SDKException {
    return {
      code: ErrorCodes.TIMEOUT,
      name: "TIMEOUT",
      message,
    };
  },

  MakeError(code?: number, status?: string, message?: string): SDKException {
    return {
      code,
      name: status ?? "Unknown",
      message: message ?? "An unknown Error occurred!",
    };
  },
};
