```typescript
/**
 * @fileoverview Performance Benchmarking Utility
 *
 * This utility provides a simple way to measure the execution time of functions.
 * It's useful for comparing the performance of different algorithmic approaches
 * (e.g., brute force vs. optimized) for the same problem.
 */

/**
 * Executes a function and measures its execution time in milliseconds.
 *
 * @param fn The function to benchmark.
 * @param args Arguments to pass to the function.
 * @returns An object containing the elapsed time and the function's return value.
 */
export function benchmark<T>(fn: (...args: any[]) => T, ...args: any[]): { timeMs: number; result: T } {
    const start = process.hrtime.bigint();
    const result = fn(...args);
    const end = process.hrtime.bigint();
    const timeNs = Number(end - start);
    const timeMs = timeNs / 1_000_000; // Convert nanoseconds to milliseconds

    return { timeMs, result };
}

/**
 * Runs a function multiple times and calculates average execution time.
 * This helps to mitigate noise from single runs and gives a more reliable
 * performance measurement.
 *
 * @param fn The function to benchmark.
 * @param iterations The number of times to run the function.
 * @param args Arguments to pass to the function.
 * @returns An object containing the average time in milliseconds and the result of the *last* execution.
 */
export function benchmarkAverage<T>(fn: (...args: any[]) => T, iterations: number, ...args: any[]): { averageTimeMs: number; lastResult: T } {
    if (iterations <= 0) {
        throw new Error("Number of iterations must be positive.");
    }

    let totalTimeMs = 0;
    let lastResult: T;

    for (let i = 0; i < iterations; i++) {
        const { timeMs, result } = benchmark(fn, ...args);
        totalTimeMs += timeMs;
        lastResult = result; // Keep track of the last result, as function output should be consistent
    }

    return {
        averageTimeMs: totalTimeMs / iterations,
        lastResult: lastResult!, // lastResult will definitely be assigned if iterations > 0
    };
}

/**
 * Utility function to generate a large array for testing purposes.
 * @param size The desired size of the array.
 * @param min The minimum value for elements.
 * @param max The maximum value for elements.
 * @param unique If true, ensure all elements are unique (up to max-min+1 size).
 * @returns A randomly generated array of numbers.
 */
export function generateRandomArray(size: number, min: number, max: number, unique: boolean = false): number[] {
    if (unique && (max - min + 1) < size) {
        console.warn("Cannot generate unique array of given size within the range. Some duplicates might occur.");
        unique = false; // Fallback to non-unique if range is too small
    }

    const arr: number[] = new Array(size);
    if (unique) {
        const numbers = new Set<number>();
        while (numbers.size < size) {
            numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(numbers);
    } else {
        for (let i = 0; i < size; i++) {
            arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return arr;
    }
}
```