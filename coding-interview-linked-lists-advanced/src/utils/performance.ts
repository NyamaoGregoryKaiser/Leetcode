```typescript
/**
 * Utility for measuring the execution time of a function.
 * @param func The function to benchmark.
 * @param args Arguments to pass to the function.
 * @returns The elapsed time in milliseconds.
 */
export function benchmark<T extends (...args: any[]) => any>(
    func: T,
    ...args: Parameters<T>
): { result: ReturnType<T>; time: number } {
    const start = process.hrtime.bigint(); // High-resolution time
    const result = func(...args);
    const end = process.hrtime.bigint();
    const time = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    return { result, time };
}

/**
 * Runs a function multiple times and returns the average execution time.
 * @param func The function to benchmark.
 * @param args Arguments to pass to the function.
 * @param iterations Number of times to run the function.
 * @returns An object containing the last result, total time, and average time.
 */
export function benchmarkAverage<T extends (...args: any[]) => any>(
    func: T,
    args: Parameters<T>, // Pass args as an array to avoid spreading issues with multiple parameters
    iterations: number = 100
): { lastResult: ReturnType<T>; totalTimeMs: number; averageTimeMs: number } {
    if (iterations <= 0) {
        throw new Error("Iterations must be a positive number.");
    }

    let totalTime = 0;
    let lastResult: ReturnType<T>;

    for (let i = 0; i < iterations; i++) {
        const start = process.hrtime.bigint();
        lastResult = func(...args); // Call the function
        const end = process.hrtime.bigint();
        totalTime += Number(end - start) / 1_000_000;
    }

    return {
        lastResult: lastResult!, // lastResult will definitely be assigned
        totalTimeMs: totalTime,
        averageTimeMs: totalTime / iterations,
    };
}
```