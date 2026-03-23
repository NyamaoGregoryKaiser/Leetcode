```typescript
/**
 * benchmarks/kth-largest-benchmark.ts
 * 
 * Performance benchmarking for the KthLargest problem.
 * Compares the heap-based solution (`KthLargest` class) against a
 * brute-force approach (maintaining a sorted array) for `add` operations
 * with varying data sizes and K values.
 */

import { KthLargest } from '../src/problems/kth-largest-in-stream';

// --- Brute-Force Implementation for comparison ---
/**
 * BruteForceKthLargest: A simple, less efficient implementation for comparison.
 * Stores all numbers in an array, sorts it on each 'add', and returns the k-th largest.
 * Time: O(N log N) for each add, where N is the current size of the stream.
 * Space: O(N)
 */
class BruteForceKthLargest {
    private k: number;
    private stream: number[];

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.stream = [...nums]; // Copy initial numbers
    }

    add(val: number): number {
        this.stream.push(val);
        this.stream.sort((a, b) => a - b); // Sort the entire array
        return this.stream[this.stream.length - this.k];
    }
}
// --- End Brute-Force Implementation ---

/**
 * Runs a benchmark for a given KthLargest implementation.
 * @param KthLargestImpl The KthLargest class (either optimized or brute-force).
 * @param k The 'k' for k-th largest.
 * @param initialNums The initial array of numbers.
 * @param numsToAdd An array of numbers to add sequentially.
 * @param name The name of the implementation for logging.
 */
function runBenchmark(KthLargestImpl: typeof KthLargest | typeof BruteForceKthLargest, k: number, initialNums: number[], numsToAdd: number[], name: string) {
    console.time(name);
    const instance = new KthLargestImpl(k, initialNums);
    for (const num of numsToAdd) {
        instance.add(num);
    }
    console.timeEnd(name);
}

console.log('--- Kth Largest Element in a Stream Benchmarks ---');

const K_VALUES = [5, 50, 500]; // Different K values
const INITIAL_STREAM_SIZES = [1000, 10000]; // Different initial stream sizes
const ADD_OPERATIONS = 5000; // Number of add operations to perform

// Generate random initial numbers
const generateRandomNumbers = (count: number) => Array.from({ length: count }, () => Math.floor(Math.random() * 10000));
const generateNumbersToAdd = (count: number) => Array.from({ length: count }, () => Math.floor(Math.random() * 10000));

for (const initialSize of INITIAL_STREAM_SIZES) {
    const initialNums = generateRandomNumbers(initialSize);
    const numsToAdd = generateNumbersToAdd(ADD_OPERATIONS);

    for (const k of K_VALUES) {
        if (k > initialSize + ADD_OPERATIONS) {
             // Skip if k is too large for the stream size, as it might lead to undefined behavior or trivial results
             // depending on exact problem constraints (here KthLargest assumes at least k elements for valid result).
             continue;
        }

        console.log(`\nBenchmarking for K=${k}, Initial Stream Size=${initialSize}, Add Operations=${ADD_OPERATIONS}`);

        runBenchmark(KthLargest, k, initialNums, numsToAdd, `Heap-based KthLargest (K=${k}, InitialSize=${initialSize})`);
        runBenchmark(BruteForceKthLargest, k, initialNums, numsToAdd, `Brute-Force KthLargest (K=${k}, InitialSize=${initialSize})`);
    }
}

console.log('\n--- Benchmark End ---');

/*
Expected Output Characteristics:
- The `Heap-based KthLargest` solution should be significantly faster, especially as `initialSize` and `ADD_OPERATIONS` increase.
- The performance of the `Heap-based` solution is primarily dependent on `log k`, so `k` size has a logarithmic impact.
- The `Brute-Force` solution's `add` operation is `O(N log N)` where `N` is the *current* stream size, making it much slower.
  As `ADD_OPERATIONS` increase, `N` grows, and `N log N` becomes much larger than `log k`.
*/
```