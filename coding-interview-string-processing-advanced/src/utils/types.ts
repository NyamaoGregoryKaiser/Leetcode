```typescript
/**
 * Represents a generic algorithm function signature for performance testing.
 * @template T - The type of the input to the algorithm.
 * @template R - The type of the output from the algorithm.
 */
export type AlgorithmFn<T extends any[], R> = (...args: T) => R;

/**
 * Defines a test case structure for benchmarking.
 * @template T - The type of the input to the algorithm.
 * @template R - The type of the output from the algorithm.
 */
export interface BenchmarkTestCase<T extends any[], R> {
  name: string;
  inputs: T;
  expected?: R; // Optional, as some benchmarks might only care about execution time, not correctness
}
```