```typescript
/**
 * benchmarks/top-k-frequent-benchmark.ts
 * 
 * Performance benchmarking for the Top K Frequent Elements problem.
 * Compares the heap-based solution (`topKFrequent` function) against a
 * brute-force approach (counting, then sorting all unique elements)
 * with varying data sizes and K values.
 */

import { topKFrequent } from '../src/problems/top-k-frequent-elements';

// --- Brute-Force Implementation for comparison ---
/**
 * BruteForceTopKFrequent: A simple, less efficient implementation for comparison.
 * Counts frequencies, then converts to an array of pairs and sorts it entirely,
 * then takes the top k.
 * Time: O(N) for counting, O(M log M) for sorting (M unique elements).
 * Space: O(N) for map + array.
 */
function bruteForceTopKFrequent(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
        return [];
    }
    const frequencyMap = new Map<number, number>();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    const freqArray: [number, number][] = Array.from(frequencyMap.entries());

    // Sort in descending order of frequency
    freqArray.sort((a, b) => b[1] - a[1]);

    const result: number[] = [];
    for (let i = 0; i < k && i < freqArray.length; i++) {
        result.push(freqArray[i][0]);
    }
    return result;
}
// --- End Brute-Force Implementation ---

/**
 * Runs a benchmark for a given topKFrequent implementation.
 * @param topKFrequentFn The topKFrequent function (either optimized or brute-force).
 * @param nums The input array of numbers.
 * @param k The 'k' for k most frequent.
 * @param name The name of the implementation for logging.
 */
function runBenchmark(topKFrequentFn: (nums: number[], k: number) => number[], nums: number[], k: number, name: string) {
    console.time(name);
    topKFrequentFn(nums, k);
    console.timeEnd(name);
}

console.log('--- Top K Frequent Elements Benchmarks ---');

const N_VALUES = [10000, 100000, 1000000]; // Different array sizes
const K_VALUES_PERCENTAGE = [0.01, 0.1, 0.5]; // K as a percentage of unique elements (simulated)

// Generate test data: numbers with varying frequencies
const generateTestData = (count: number): number[] => {
    const data: number[] = [];
    // Generate a mix of highly frequent and less frequent numbers
    for (let i = 0; i < count; i++) {
        // Roughly 10% of numbers will be very frequent (0-9)
        // Roughly 90% of numbers will be less frequent (10-count/10)
        if (Math.random() < 0.1) {
            data.push(Math.floor(Math.random() * 10)); // High frequency small numbers
        } else {
            data.push(Math.floor(Math.random() * (count / 10)) + 10); // Lower frequency, larger range
        }
    }
    return data;
};

for (const n of N_VALUES) {
    const nums = generateTestData(n);
    // Estimate unique elements (M). For this test data, M will be roughly (N/10) + 10
    const estimatedM = new Set(nums).size; // Actual M might be different

    for (const kPerc of K_VALUES_PERCENTAGE) {
        const k = Math.max(1, Math.min(Math.floor(estimatedM * kPerc), estimatedM)); // Ensure k is valid and within unique count

        console.log(`\nBenchmarking for N=${n}, K=${k} (approx ${kPerc * 100}% of ${estimatedM} unique elements)`);

        runBenchmark(topKFrequent, nums, k, `Heap-based topKFrequent (N=${n}, K=${k})`);
        runBenchmark(bruteForceTopKFrequent, nums, k, `Brute-Force topKFrequent (N=${n}, K=${k})`);
    }
}

console.log('\n--- Benchmark End ---');

/*
Expected Output Characteristics:
- The `Heap-based topKFrequent` solution (`O(N + M log k)`) should be faster than `Brute-Force` (`O(N + M log M)`)
  when `k` is significantly smaller than `M` (the number of unique elements).
- When `k` approaches `M`, both solutions' `log` factors (`log k` vs `log M`) become similar,
  and the difference might reduce, or brute-force might even be slightly faster due to lower constant factors of array sort vs heap.
- For very large `N`, the initial `O(N)` frequency counting phase will dominate both algorithms.
- The test data generation aims for a diverse set of frequencies to make the `M log k` vs `M log M` comparison relevant.
*/
```