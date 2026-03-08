/**
 * benchmarks/performanceBenchmarker.js
 *
 * This file contains a utility to benchmark the performance of various sorting algorithms.
 * It generates random arrays of different sizes and measures the execution time for each algorithm.
 */

const { generateRandomArray } = require('../src/utils/arrayUtils');
const bubbleSort = require('../src/algorithms/bubbleSort');
const mergeSort = require('../src/algorithms/mergeSort');
const quickSort = require('../src/algorithms/quickSort');
const heapSort = require('../src/algorithms/heapSort');
const countingSort = require('../src/algorithms/countingSort'); // Note: Counting sort has specific constraints (non-negative integers, limited range)

/**
 * Runs a performance benchmark for a given sorting function.
 * @param {string} name The name of the sorting algorithm.
 * @param {function} sortFn The sorting function to benchmark.
 * @param {number[]} sizes An array of array sizes to test.
 * @param {number} maxValue The maximum value for random numbers in the array (relevant for Counting Sort).
 */
function benchmarkSort(name, sortFn, sizes, maxValue = 1000) {
    console.log(`\n--- Benchmarking ${name} ---`);
    for (const size of sizes) {
        // Generate a fresh random array for each test to ensure fairness
        const arr = generateRandomArray(size, 0, maxValue); // Use 0 for min to be safe with counting sort

        const start = process.hrtime.bigint();
        // Create a copy to ensure the original array isn't modified by other benchmarks
        sortFn([...arr]);
        const end = process.hrtime.bigint();

        const durationNs = Number(end - start);
        const durationMs = durationNs / 1_000_000;

        console.log(`  Array size: ${size.toLocaleString()} | Time: ${durationMs.toFixed(3)} ms`);
    }
}

// Define array sizes to test
const arraySizes = [100, 1000, 5000, 10000, 50000, 100000]; // Go up to 100,000 for faster sorts
const smallArraySizes = [100, 500, 1000, 2000, 5000]; // Smaller sizes for O(N^2) sorts

// Max value for random numbers (important for Counting Sort)
const MAX_VALUE_FOR_COUNTING_SORT = 10000; // If range is too large, Counting Sort becomes inefficient.

console.log("Starting performance benchmarks for sorting algorithms...\n");

// Benchmarking Bubble Sort (O(N^2))
benchmarkSort('Bubble Sort', bubbleSort, smallArraySizes);

// Benchmarking Merge Sort (O(N log N))
benchmarkSort('Merge Sort', mergeFn => mergeSort(mergeFn), arraySizes); // Wrap to handle mergeSort signature

// Benchmarking Quick Sort (O(N log N) average)
benchmarkSort('Quick Sort', quickFn => quickSort(quickFn), arraySizes); // Wrap to handle quickSort signature

// Benchmarking Heap Sort (O(N log N))
benchmarkSort('Heap Sort', heapSort, arraySizes);

// Benchmarking Counting Sort (O(N+K)) - Note: Requires positive integers and max value
// This benchmark specifically tests its strength for small-range data.
benchmarkSort('Counting Sort (small range)', countingSort, arraySizes, MAX_VALUE_FOR_COUNTING_SORT);

console.log("\nPerformance benchmarks completed.");