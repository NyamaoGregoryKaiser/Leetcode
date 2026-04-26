```typescript
/**
 * @file benchmark.ts
 * @description Provides a utility for benchmarking different algorithm implementations.
 */

/**
 * Measures the execution time of a given function.
 *
 * @param func The function to benchmark.
 * @param args The arguments to pass to the function.
 * @returns The elapsed time in milliseconds.
 */
export function measureExecutionTime<TArgs extends any[], TResult>(
    func: (...args: TArgs) => TResult,
    ...args: TArgs
): { timeMs: number, result: TResult } {
    const start = process.hrtime.bigint();
    const result = func(...args);
    const end = process.hrtime.bigint();
    const timeNs = Number(end - start);
    return { timeMs: timeNs / 1_000_000, result };
}

/**
 * Runs a benchmark for multiple solutions of the same problem.
 *
 * @param problemName The name of the problem being benchmarked.
 * @param solutions An array of objects, each containing a `name` and `solve` function.
 * @param testCase A single input test case to use for all solutions.
 * @param iterations The number of times to run each solution for averaging.
 * @returns An array of benchmark results, sorted by performance.
 */
export function benchmarkSolutions<TInput, TOutput>(
    problemName: string,
    solutions: { name: string, solve: (input: TInput) => TOutput }[],
    testCase: TInput,
    iterations: number = 100000
): { name: string, averageTimeMs: number, result: TOutput }[] {
    console.log(`--- Benchmarking ${problemName} ---`);
    console.log(`Input: ${JSON.stringify(testCase)}`);
    console.log(`Iterations per solution: ${iterations}`);

    const results: { name: string, averageTimeMs: number, result: TOutput }[] = [];

    for (const { name, solve } of solutions) {
        let totalTime = 0;
        let lastResult: TOutput | undefined;

        // Warm-up run (optional but good for JIT compilation)
        solve(testCase);

        for (let i = 0; i < iterations; i++) {
            const { timeMs, result } = measureExecutionTime(solve, testCase);
            totalTime += timeMs;
            if (i === 0) { // Store result only once, assume consistent output
                lastResult = result;
            }
        }
        const averageTimeMs = totalTime / iterations;
        results.push({ name, averageTimeMs, result: lastResult! });
        // console.log(`  ${name}: Avg Time: ${averageTimeMs.toFixed(6)} ms, Result: ${JSON.stringify(lastResult)}`);
    }

    // Sort by average time (fastest first)
    results.sort((a, b) => a.averageTimeMs - b.averageTimeMs);

    console.log("\nBenchmark Results (Average time per iteration):");
    results.forEach((res, index) => {
        console.log(`${index + 1}. ${res.name.padEnd(30)}: ${res.averageTimeMs.toFixed(6)} ms`);
        // console.log(`   Result: ${JSON.stringify(res.result)}`);
    });
    console.log("-------------------------------------------\n");

    return results;
}
```