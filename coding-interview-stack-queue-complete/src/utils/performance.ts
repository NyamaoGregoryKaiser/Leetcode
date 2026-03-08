/**
 * Utility functions for performance benchmarking.
 * Provides a simple way to measure execution time of functions.
 */

export type BenchmarkResult = {
    name: string;
    iterations: number;
    totalTimeMs: number;
    averageTimeMs: number;
    errorMessage?: string;
};

/**
 * Measures the execution time of a given function.
 * @param func The function to benchmark.
 * @param args Arguments to pass to the function.
 * @returns The elapsed time in milliseconds.
 */
export function measureExecutionTime<T extends any[]>(func: (...args: T) => any, ...args: T): number {
    const start = process.hrtime.bigint();
    func(...args);
    const end = process.hrtime.bigint();
    return Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
}

/**
 * Runs a benchmark for a function over multiple iterations.
 * @param name Name of the benchmark.
 * @param func The function to benchmark.
 * @param iterations The number of times to run the function.
 * @param args Arguments to pass to the function.
 * @returns An object containing benchmark results.
 */
export function runBenchmark<T extends any[]>(
    name: string,
    func: (...args: T) => any,
    iterations: number,
    ...args: T
): BenchmarkResult {
    let totalTimeMs = 0;
    try {
        for (let i = 0; i < iterations; i++) {
            totalTimeMs += measureExecutionTime(func, ...args);
        }
        const averageTimeMs = totalTimeMs / iterations;
        return {
            name,
            iterations,
            totalTimeMs,
            averageTimeMs,
        };
    } catch (error: any) {
        return {
            name,
            iterations,
            totalTimeMs: 0,
            averageTimeMs: 0,
            errorMessage: error.message || "An unknown error occurred during benchmarking.",
        };
    }
}

/**
 * Prints benchmark results to the console.
 * @param results An array of benchmark results.
 */
export function printBenchmarkResults(results: BenchmarkResult[]): void {
    console.log("\n--- Benchmark Results ---");
    results.forEach(result => {
        if (result.errorMessage) {
            console.error(`ERROR: ${result.name} failed with: ${result.errorMessage}`);
        } else {
            console.log(
                `[${result.name}] - Iterations: ${result.iterations}, Total Time: ${result.totalTimeMs.toFixed(
                    3
                )} ms, Avg Time: ${result.averageTimeMs.toFixed(3)} ms`
            );
        }
    });
    console.log("---------------------------\n");
}