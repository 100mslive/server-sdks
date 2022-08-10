import { ErrorFactory } from "../apis/Errors";
import { logger } from "../LoggerService";

export async function sleep(timeoutMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutMs);
  });
}

const DEFAULT_POLL_TIMEOUT_SECONDS = 5 * 60;
const DEFAULT_POLL_INTERVAL_SECONDS = 5;

/**
 * run passed in function periodically(with intervalSeconds as the period) till
 * we've run out of timeoutSeconds or tillCondition returns false
 */
export async function pollTillSuccess<T>(
  fn: () => Promise<T>,
  tillCondition: (data: T) => boolean,
  { timeoutSeconds, intervalSeconds }: APIPollConfig = {}
): Promise<T> {
  timeoutSeconds ||= DEFAULT_POLL_TIMEOUT_SECONDS;
  intervalSeconds ||= DEFAULT_POLL_INTERVAL_SECONDS;
  const timeoutMs = timeoutSeconds * 1000;
  const startTime = Date.now();
  
  while (true) {
    const hasTimeRunOut = Date.now() - startTime > timeoutMs;
    if (hasTimeRunOut) {
      logger.error("polling timed out");
      throw ErrorFactory.Timeout("stopping fn poll due to timeout");
    }
    try {
      let result = await fn();
      if (!tillCondition(result)) {
        logger.debug("done with");
        return result
      }
    } catch (err) {}
    await sleep(intervalSeconds * 1000);
  }
}

export interface APIPollConfig {
  /**
   * interval in seconds to do the polling in
   */
  intervalSeconds?: number;
  /**
   * timeout in seconds post which the polling stops
   */
  timeoutSeconds?: number;
}
