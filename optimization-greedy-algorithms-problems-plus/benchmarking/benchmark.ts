```typescript
/**
 * benchmarking/benchmark.ts
 *
 * This file contains performance benchmarking code for the implemented greedy algorithms.
 * It measures the execution time of each algorithm for varying input sizes to
 * demonstrate their time complexity characteristics.
 */

import { Activity, selectActivities } from '../src/algorithms/activity-selection';
import { Item, fractionalKnapsack } from '../src/algorithms/fractional-knapsack';
import { greedyCoinChange } from '../src/algorithms/coin-change';
import { Job, jobSequencing } from '../src/algorithms/job-sequencing';
import { getRandomInt, measureExecutionTime } from '../src/utils/helpers';

interface BenchmarkResult {
    inputSize: number | string;
    timeMs: number;
    description: string;
}

/**
 * Runs a benchmark for a given algorithm function.
 * @param name The name of the algorithm.
 * @param func The algorithm function to benchmark.
 * @param generateInput A function that generates input for a given size.
 * @param sizes An array of input sizes to test.
 * @returns An array of BenchmarkResult objects.
 */
function runBenchmark<T>(
    name: string,
    func: (...args: any[]) => T,
    generateInput: (size: number) => any[],
    sizes: number[]
): BenchmarkResult[] {
    console.log(`\n--- Benchmarking ${name} ---`);
    const results: BenchmarkResult[] = [];

    for (const size of sizes) {
        process.stdout.write(`  Running for N=${size}...`);
        const input = generateInput(size);
        const { timeMs } = measureExecutionTime(func, ...input);
        console.log(` ${timeMs.toFixed(3)} ms`);
        results.push({ inputSize: size, timeMs, description: name });
    }
    return results;
}

/**
 * Main benchmark execution function.
 */
async function main() {
    console.log('Starting Greedy Algorithms Benchmarks...\n');

    const benchmarkSizes = [100, 1000, 5000, 10000, 50000]; // Input sizes for N

    // --- Activity Selection Benchmark ---
    const generateActivities = (count: number): [Activity[]] => {
        const activities: Activity[] = [];
        for (let i = 0; i < count; i++) {
            const start = getRandomInt(0, count * 2);
            const finish = start + getRandomInt(1, 100);
            activities.push({ id: i, start, finish });
        }
        return [activities];
    };
    runBenchmark(
        'Activity Selection',
        selectActivities,
        generateActivities,
        benchmarkSizes
    );

    // --- Fractional Knapsack Benchmark ---
    const generateKnapsackItems = (count: number): [number, Item[]] => {
        const items: Item[] = [];
        const capacity = count * 5; // Capacity scales with number of items
        for (let i = 0; i < count; i++) {
            const weight = getRandomInt(1, 100);
            const value = getRandomInt(1, 200);
            items.push({ id: `Item-${i}`, value, weight });
        }
        return [capacity, items];
    };
    runBenchmark(
        'Fractional Knapsack',
        fractionalKnapsack,
        generateKnapsackItems,
        benchmarkSizes
    );

    // --- Greedy Coin Change Benchmark ---
    // Note: Coin change 'N' is the target amount, not number of denominations
    // Denominations are fixed for this benchmark to illustrate time with increasing amount.
    const standardUSDenominations = [1, 5, 10, 25, 100]; // Cents
    const generateCoinChangeAmount = (amount: number): [number[], number] => {
        return [standardUSDenominations, amount];
    };
    runBenchmark(
        'Greedy Coin Change (Amount as N)',
        greedyCoinChange,
        generateCoinChangeAmount,
        [100, 1000, 10000, 100000, 1000000] // Larger amounts for coin change
    );

    // --- Job Sequencing Benchmark ---
    const generateJobs = (count: number): [Job[]] => {
        const jobs: Job[] = [];
        const maxDeadline = Math.min(count, 5000); // Keep maxDeadline reasonable relative to N
        for (let i = 0; i < count; i++) {
            const deadline = getRandomInt(1, maxDeadline);
            const profit = getRandomInt(1, 1000);
            jobs.push({ id: `J${i}`, deadline, profit });
        }
        return [jobs];
    };
    // Job Sequencing has O(N * maxDeadline) in its simple array-based implementation.
    // For larger N, maxDeadline needs to be capped, or this will be too slow.
    // The benchmark sizes here will push the N*maxDeadline limits for large N.
    runBenchmark(
        'Job Sequencing (O(N*maxDeadline) variant)',
        jobSequencing,
        generateJobs,
        [100, 500, 1000, 2000] // Smaller sizes for N due to higher complexity
    );

    console.log('\nAll benchmarks completed.');
}

main().catch(error => {
    console.error('Benchmark failed:', error);
});
```