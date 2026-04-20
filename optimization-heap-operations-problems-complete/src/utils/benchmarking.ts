```typescript
/**
 * Measures the execution time of a given function.
 * @param name A descriptive name for the benchmark.
 * @param func The function to benchmark.
 * @returns The elapsed time in milliseconds.
 */
export function measurePerformance(name: string, func: () => void): number {
    const start = process.hrtime.bigint();
    func();
    const end = process.hrtime.bigint();
    const elapsedTimeMs = Number(end - start) / 1_000_000;
    console.log(`[BENCHMARK] ${name}: ${elapsedTimeMs.toFixed(3)} ms`);
    return elapsedTimeMs;
}
```