import winston from "winston";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
};

// 📌 Crear formato de log
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      levels: logLevels,
      level: "info",
      format: logFormat,
      transports: [
        new winston.transports.Console(), // 📌 Muestra logs en la consola
        new winston.transports.File({ filename: "logs/error.log", level: "error" }), // 📌 Guarda solo errores
        new winston.transports.File({ filename: "logs/combined.log" }), // 📌 Guarda todos los logs
      ],
    });
  }

  log(level: "info" | "warn" | "error" | "debug", message: string): void {
    this.logger.log(level, message);
  }

  info(message: string): void {
    this.log("info", message);
  }

  warn(message: string): void {
    this.log("warn", message);
  }

  error(message: string): void {
    this.log("error", message);
  }

  debug(message: string): void {
    this.log("debug", message);
  }
}

export const logger = new Logger();
