import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import config from "../config.js";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} ${level}: ${message}\n${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
  })
);

const fileRotateTransport = new DailyRotateFile({
  filename: "logs/%DATE%-app.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  format: format,
});

const Logger = winston.createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "warn",
  levels,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    fileRotateTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

export default Logger;
