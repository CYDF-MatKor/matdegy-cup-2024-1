const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const process = require("process");
require("events").EventEmitter.defaultMaxListeners = 20;

const { combine, timestamp, label, printf } = winston.format;

const logDir = `${process.cwd()}/logs`;
console.log("logDir: ", logDir);

const logFormat = printf(
  ({ level, message, label, timestamp, ...metadata }) => {
    var msg = `${timestamp} [${label}] ${level}: ${message} `;
    if (metadata && Object.keys(metadata).length > 0) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  }
);

const makeNewWinstonDaily = (level, filename) =>
  new winstonDaily({
    level: level,
    datePattern: "YYYY-MM-DD",
    dirname: logDir,
    filename: filename,
    maxFiles: 30,
    zippedArchive: true,
    utc: true,
  });

const levels = ["error", "warn", "info", "http", "verbose", "debug", "silly"];

const logger = winston.createLogger({
  format: combine(
    label({ label: "Matdegy Cup 2024 - 1" }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: levels.map((level) =>
    makeNewWinstonDaily(level, `%DATE%-${level}.log`)
  ),
  exceptionHandlers: levels.map((level) =>
    makeNewWinstonDaily(level, `%DATE%-exceptions.log`)
  ),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    })
  );
}

module.exports = logger;
