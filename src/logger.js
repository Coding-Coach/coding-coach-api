import winston from 'winston';
import fs from 'fs';

process.env.LOGS_FOLDER = process.env.LOGS_FOLDER || 'logs';

if (!fs.existsSync(process.env.LOGS_FOLDER)) {
  fs.mkdirSync(process.env.LOGS_FOLDER);
}

const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
  const modifiedLog = logEntry;
  const base = {
    timestamp: new Date(),
  };
  const json = Object.assign(base, logEntry);
  modifiedLog[MESSAGE] = JSON.stringify(json);
  return modifiedLog;
};

const logger = winston.createLogger({
  format: winston.format(jsonFormatter)(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${process.env.LOGS_FOLDER}/${process.env.INFO_LOG || 'info.log'}`,
      handleExceptions: true,
      json: true,
    }),
    new winston.transports.File({
      level: 'error',
      filename: `${process.env.LOGS_FOLDER}/${process.env.ERROR_LOG || 'error.log'}`,
      handleExceptions: true,
      json: true,
    }),
    new winston.transports.File({
      level: 'warn',
      filename: `${process.env.LOGS_FOLDER}/${process.env.WARNINGS_LOG || 'warn.log'}`,
      handleExceptions: true,
      json: true,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${ info.level }: ${ info.message } JSON.stringify({ ...rest })`
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format(jsonFormatter)(),
    }),
  );
} else {
  winston.remove(winston.transports.Console);
}

const log = (level, message) => {
  logger.log({
    level,
    message,
  });
};

global.ERROR = (message) => {
  log('error', message);
};

global.INFO = (message) => {
  log('info', message);
};

global.WARN = (message) => {
  log('warn', message);
};
