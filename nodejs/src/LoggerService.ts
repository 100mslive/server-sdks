import winston, { Logger } from "winston";

const isDev = process.env.NODE_ENV !== "production";

export const logger = winston.createLogger({
  level: isDev ? "debug" : "info",
  format: winston.format.json(),
  defaultMeta: { module: "hms-sdk" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export const getLoggerForMethod = (method: string, customLogger?: Logger) => {
  return (customLogger || logger).child({ method });
};
