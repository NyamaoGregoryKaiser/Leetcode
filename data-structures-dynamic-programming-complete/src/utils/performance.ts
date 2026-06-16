```typescript
/**
 * src/utils/performance.ts
 *
 * This utility provides functions for benchmarking the performance of different
 * algorithm implementations. It measures execution time and memory usage (if applicable
 * or measurable in a Node.js context) for a given function.
 */

import { performance } from 'perf_hooks';

/**
 * Defines the structure for a benchmark result.
 */
export interface BenchmarkResult {
    name: string;
    iterations: number;
    totalTimeMs: number;
    averageTimeMs: number;
    // Potentially add memory usage if a more sophisticated measurement tool is used
    // e.g., process.memoryUsage() before and after function execution, though this
    // can be tricky to attribute accurately to a single function call in JS.
}

/**
 * Benchmarks a given function by running it multiple times and measuring the
 * total and average execution time.
 *
 * @param {string} name - A descriptive name for the function being benchmarked.
 * @param {Function} func - The function to benchmark.
 * @param {any[]} args - An array of arguments to pass to the function.
 * @param {number} [iterations=100] - The number of times to run the function for benchmarking.
 * @returns {BenchmarkResult} An object containing the benchmark results.
 */
export function benchmark(
    name: string,
    func: (...args: any[]) => any,
    args: any[],
    iterations: number = 100
): BenchmarkResult {
    if (iterations <= 0) {
        throw new Error('Iterations must be a positive number.');
    }

    let totalTime = 0;
    let result: any; // To store the last result, ensuring the function works correctly

    // Warm-up phase to avoid cold cache effects
    for (let i = 0; i < Math.min(iterations, 10); i++) {
        func(...args);
    }

    const startTime = performance.now();
    for (let i = 0; i < iterations; i++) {
        result = func(...args); // Execute the function
    }
    const endTime = performance.now();

    totalTime = endTime - startTime;

    return {
        name,
        iterations,
        totalTimeMs: totalTime,
        averageTimeMs: totalTime / iterations,
        // Optional: you could add a 'lastResult' field here if needed for verification
        // lastResult: result
    };
}

/**
 * Prints the benchmark results in a formatted way.
 *
 * @param {BenchmarkResult[]} results - An array of benchmark results to print.
 */
export function printBenchmarkResults(results: BenchmarkResult[]): void {
    if (results.length === 0) {
        console.log("No benchmark results to display.");
        return;
    }

    console.log("\n--- BENCHMARK RESULTS ---");
    // Find the longest name for alignment
    const maxNameLength = Math.max(...results.map(r => r.name.length));

    results.forEach(result => {
        const paddedName = result.name.padEnd(maxNameLength);
        console.log(
            `${paddedName} | Iterations: ${result.iterations} | Total Time: ${result.totalTimeMs.toFixed(3)} ms | Avg Time: ${result.averageTimeMs.toFixed(6)} ms/op`
        );
    });
    console.log("-------------------------");
}

/**
 * Compares the performance of multiple functions given the same arguments.
 *
 * @param {Array<{name: string, func: Function}>} functions - An array of objects, each with a name and the function to benchmark.
 * @param {any[]} args - An array of arguments to pass to all functions.
 * @param {number} [iterations=100] - The number of times to run each function.
 * @returns {BenchmarkResult[]} An array of benchmark results for each function.
 */
export function comparePerformance(
    functions: Array<{ name: string; func: (...args: any[]) => any }>,
    args: any[],
    iterations: number = 100
): BenchmarkResult[] {
    console.log(`\n--- Comparing ${functions.length} functions with ${iterations} iterations each ---`);
    const allResults: BenchmarkResult[] = [];
    for (const { name, func } of functions) {
        try {
            const result = benchmark(name, func, args, iterations);
            allResults.push(result);
        } catch (error: any) {
            console.error(`Error benchmarking ${name}: ${error.message}`);
        }
    }
    printBenchmarkResults(allResults.sort((a, b) => a.averageTimeMs - b.averageTimeMs));
    return allResults;
}

```