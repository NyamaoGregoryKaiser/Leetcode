```typescript
/**
 * src/utils/performanceTimer.ts
 *
 * A utility for measuring the execution time of code blocks.
 */

import { logger, LogLevel } from './logger';

export class PerformanceTimer {
  private startTime: [number, number] | null = null;
  private label: string;

  constructor(label: string = 'Unnamed Task') {
    this.label = label;
  }

  /**
   * Starts the timer.
   */
  public start(): void {
    this.startTime = process.hrtime();
    logger.debug(`Timer '${this.label}' started.`);
  }

  /**
   * Stops the timer and returns the elapsed time in milliseconds.
   * If the timer was not started, it returns 0.
   * @returns The elapsed time in milliseconds.
   */
  public stop(): number {
    if (!this.startTime) {
      logger.warn(`Timer '${this.label}' was stopped without being started.`);
      return 0;
    }

    const endTime = process.hrtime(this.startTime);
    const nanoseconds = endTime[0] * 1e9 + endTime[1];
    const milliseconds = nanoseconds / 1e6;

    this.startTime = null; // Reset timer
    logger.debug(`Timer '${this.label}' stopped. Elapsed: ${milliseconds.toFixed(3)} ms`);
    return milliseconds;
  }

  /**
   * Executes a given function and measures its execution time.
   * @param func The function to execute.
   * @param args Arguments to pass to the function.
   * @returns An object containing the result of the function and the elapsed time.
   */
  public time<T>(func: (...args: any[]) => T, ...args: any[]): { result: T; timeMs: number } {
    this.start();
    const result = func(...args);
    const timeMs = this.stop();
    return { result, timeMs };
  }

  /**
   * Executes an asynchronous function and measures its execution time.
   * @param func The async function to execute.
   * @param args Arguments to pass to the async function.
   * @returns A promise that resolves to an object containing the result of the function and the elapsed time.
   */
  public async timeAsync<T>(func: (...args: any[]) => Promise<T>, ...args: any[]): Promise<{ result: T; timeMs: number }> {
    this.start();
    const result = await func(...args);
    const timeMs = this.stop();
    return { result, timeMs };
  }
}
```