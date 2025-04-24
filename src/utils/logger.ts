/**
 * Simple logger utility for test framework
 */

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// Set log level from environment or default to INFO
const currentLogLevel = (process.env.LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel) || 'INFO';
const logLevelValue = LogLevel[currentLogLevel] !== undefined ? LogLevel[currentLogLevel] : LogLevel.INFO;

class Logger {
  debug(message: string): void {
    if (logLevelValue <= LogLevel.DEBUG) {
      console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`);
    }
  }

  info(message: string): void {
    if (logLevelValue <= LogLevel.INFO) {
      console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    }
  }

  warn(message: string): void {
    if (logLevelValue <= LogLevel.WARN) {
      console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
    }
  }

  error(message: string, error?: Error): void {
    if (logLevelValue <= LogLevel.ERROR) {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
      if (error) {
        console.error(error);
      }
    }
  }

  step(message: string): void {
    this.info(`STEP: ${message}`);
  }
}

export const logger = new Logger(); 