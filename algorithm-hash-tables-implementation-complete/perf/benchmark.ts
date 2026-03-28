```typescript
/**
 * @file perf/benchmark.ts
 * @description Performance benchmarking script to compare different
 * implementations (e.g., brute-force vs. hash table) for selected problems.
 */

import { twoSum } from '../src/main';
import { twoSumBruteForce } from '../implementations/brute-force-problems';

// Helper to generate test data
function generateTwoSumData(size: number): { nums: number[]; target: number } {
    const nums: number[] = [];
    for (let i = 0; i < size; i++) {
        nums.push(Math.floor(Math.random() * 2 * size) - size); // Generate numbers around 0
    }
    // Ensure a solution exists
    const idx1 = Math.floor(Math.random() * size);
    let idx2 = Math.floor(Math.random() * size);
    while (idx1 === idx2) { // Ensure different indices
        idx2 = Math.floor(Math.random() * size);
    }
    const target = nums[idx1] + nums[idx2];
    return { nums, target };
}

// Function to run a benchmark
function runBenchmark(
    name: string,
    algorithm: (nums: number[], target: number) => number[],
    data: { nums: number[]; target: number }[]
) {
    let totalTime = 0;
    const start = process.hrtime.bigint();

    for (const { nums, target } of data) {
        // console.time(`${name} for size ${nums.length}`);
        algorithm(nums, target);
        // console.timeEnd(`${name} for size ${nums.length}`);
    }

    const end = process.hrtime.bigint();
    totalTime = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds

    console.log(`  ${name}: ${totalTime.toFixed(3)} ms`);
    return totalTime;
}

// Main benchmark execution
function main() {
    console.log("--- Benchmarking Two Sum Implementations ---");

    const testSizes = [1000, 5000, 10000, 20000]; // Sizes of the input arrays

    for (const size of testSizes) {
        console.log(`\nBenchmarking for N = ${size} elements (20 runs each):`);
        const numRuns = 20; // Number of times to run each algorithm for averaging
        const datasets = Array.from({ length: numRuns }, () => generateTwoSumData(size));

        // Run brute force
        runBenchmark('Two Sum Brute Force (O(N^2))', twoSumBruteForce, datasets);

        // Run optimal hash map solution
        runBenchmark('Two Sum Optimal (O(N))', twoSum, datasets);
    }
    console.log("\n--- Benchmarking Complete ---");
    console.log("Note: Results may vary based on system load and JavaScript engine optimizations.");
}

main();
```