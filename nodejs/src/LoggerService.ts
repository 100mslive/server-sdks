import log, { LogLevelDesc } from "loglevel";

const isDev = process.env.NODE_ENV !== "production";
const level = isDev ? "debug" : "info";
log.setLevel(level);

export const logger = log;

export function setLogLevel(level: LogLevelDesc) {
  log.setLevel(level);
}

export type LogLevelOptions = LogLevelDesc;
