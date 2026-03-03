```typescript
import { AlgorithmFn, BenchmarkTestCase } from './types';

/**
 * Measures the execution time of a function.
 * @param fn - The function to measure.
 * @param args - The arguments to pass to the function.
 * @returns The time taken in milliseconds.
 */
export function measureTime<T extends any[], R>(fn: AlgorithmFn<T, R>, ...args: T): number {
  const start = process.hrtime.bigint();
  fn(...args);
  const end = process.hrtime.bigint();
  return Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
}

/**
 * Runs a set of benchmarks for a given algorithm.
 * @param algorithmName - The name of the algorithm.
 * @param solutions - An object where keys are solution names (e.g., "Optimal", "Brute Force") and values are the algorithm functions.
 * @param testCases - An array of test cases to run against each solution.
 */
export function runBenchmarks<T extends any[], R>(
  algorithmName: string,
  solutions: { [key: string]: AlgorithmFn<T, R> },
  testCases: BenchmarkTestCase<T, R>[],
): void {
  console.log(`\n--- Benchmarking: ${algorithmName} ---`);

  for (const testCase of testCases) {
    console.log(`\nTest Case: ${testCase.name}`);
    const results: { solution: string; time: number }[] = [];

    for (const solutionName in solutions) {
      if (Object.prototype.hasOwnProperty.call(solutions, solutionName)) {
        const fn = solutions[solutionName];
        const time = measureTime(fn, ...testCase.inputs);
        results.push({ solution: solutionName, time });

        // Optional: Verify correctness for the first run if expected is provided
        if (testCase.expected !== undefined) {
          try {
            const actual = fn(...testCase.inputs);
            const isCorrect = JSON.stringify(actual) === JSON.stringify(testCase.expected);
            // console.log(`  ${solutionName} - Correctness: ${isCorrect ? '✅' : '❌'}`);
            if (!isCorrect) {
              console.warn(
                `  ${solutionName} produced incorrect result for this case. Expected: ${JSON.stringify(
                  testCase.expected,
                )}, Actual: ${JSON.stringify(actual)}`,
              );
            }
          } catch (e: any) {
            console.warn(`  ${solutionName} threw an error: ${e.message}`);
          }
        }
      }
    }

    results.sort((a, b) => a.time - b.time); // Sort by time ascending

    results.forEach((result, index) => {
      const icon = index === 0 ? '🏆 ' : ''; // Crown for the fastest
      console.log(`  ${icon}${result.solution}: ${result.time.toFixed(4)} ms`);
    });
  }
  console.log('--------------------------------------');
}
```