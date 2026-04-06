```typescript
/**
 * src/utils/logger.ts
 *
 * A simple logging utility for consistent output.
 */

export enum LogLevel {
  INFO,
  WARN,
  ERROR,
  DEBUG,
}

export class Logger {
  private static instance: Logger;
  private currentLevel: LogLevel;

  private constructor(level: LogLevel = LogLevel.INFO) {
    this.currentLevel = level;
  }

  public static getInstance(level: LogLevel = LogLevel.INFO): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(level);
    }
    // Allow updating log level if getInstance is called with a new level
    Logger.instance.currentLevel = level;
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (level >= this.currentLevel) {
      const timestamp = new Date().toISOString();
      let prefix = '';
      let logMethod: (...args: any[]) => void = console.log;

      switch (level) {
        case LogLevel.INFO:
          prefix = '[INFO]';
          logMethod = console.info;
          break;
        case LogLevel.WARN:
          prefix = '[WARN]';
          logMethod = console.warn;
          break;
        case LogLevel.ERROR:
          prefix = '[ERROR]';
          logMethod = console.error;
          break;
        case LogLevel.DEBUG:
          prefix = '[DEBUG]';
          logMethod = console.log; // Using console.log for debug
          break;
      }
      logMethod(`${timestamp} ${prefix} ${message}`, ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  public error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  public debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  public setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }
}

// Export a default instance for convenience
export const logger = Logger.getInstance(process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO);
```