import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

// Ensure log directory exists
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Log errors to error.log
    new transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    // Log all requests to combined.log
    new transports.File({ filename: path.join(logDir, "combined.log") }),
  ],
});

// Log to console in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
