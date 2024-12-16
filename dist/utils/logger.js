"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const config_1 = __importDefault(require("../config"));
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json());
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
        return `${timestamp} ${level}: ${message}\n${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
}));
const fileRotateTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/%DATE%-app.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    format: format,
});
const Logger = winston_1.default.createLogger({
    level: config_1.default.NODE_ENV === 'development' ? 'debug' : 'warn',
    levels,
    transports: [
        new winston_1.default.transports.Console({
            format: consoleFormat,
        }),
        fileRotateTransport,
    ],
    exceptionHandlers: [
        new winston_1.default.transports.File({ filename: 'logs/exceptions.log' }),
    ],
    rejectionHandlers: [
        new winston_1.default.transports.File({ filename: 'logs/rejections.log' }),
    ],
});
exports.default = Logger;
