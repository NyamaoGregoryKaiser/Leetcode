```typescript
/**
 * @fileoverview Utility functions for measuring execution time of functions.
 */

/**
 * Measures the execution time of a given function.
 * @param func The function to measure.
 * @param args Arguments to pass to the function.
 * @returns An object containing the result of the function call and its execution time in milliseconds.
 */
export function measureExecutionTime<T extends (...args: any[]) => any>(
    func: T,
    ...args: Parameters<T>
): { result: ReturnType<T>; timeMs: number } {
    const start = process.hrtime.bigint();
    const result = func(...args);
    const end = process.hrtime.bigint();
    const timeNs = end - start;
    const timeMs = Number(timeNs) / 1_000_000; // Convert nanoseconds to milliseconds

    return { result, timeMs };
}

/**
 * A type for a function that can be benchmarked.
 */
export type BenchmarkFunction<T extends (...args: any[]) => any> = {
    name: string;
    func: T;
};

/**
 * Benchmarks multiple functions with the same arguments and returns their execution times.
 * @param functions An array of BenchmarkFunction objects to test.
 * @param args Arguments to pass to all functions.
 * @returns An array of objects, each containing the function's name, its result, and its execution time in milliseconds.
 */
export function benchmarkFunctions<T extends (...args: any[]) => any>(
    functions: BenchmarkFunction<T>[],
    ...args: Parameters<T>
): { name: string; result: ReturnType<T>; timeMs: number }[] {
    const results: { name: string; result: ReturnType<T>; timeMs: number }[] = [];

    for (const { name, func } of functions) {
        const { result, timeMs } = measureExecutionTime(func, ...args);
        results.push({ name, result, timeMs });
    }

    return results;
}

/**
 * Formats time in milliseconds to a human-readable string.
 * @param timeMs Time in milliseconds.
 * @returns A formatted string (e.g., "12.34 ms", "5.67 s").
 */
export function formatTime(timeMs: number): string {
    if (timeMs < 1) {
        return `${(timeMs * 1000).toFixed(2)} µs`; // microseconds
    } else if (timeMs < 1000) {
        return `${timeMs.toFixed(2)} ms`; // milliseconds
    } else {
        return `${(timeMs / 1000).toFixed(2)} s`; // seconds
    }
}
```