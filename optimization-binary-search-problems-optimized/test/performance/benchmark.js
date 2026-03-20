/**
 * @fileoverview Performance benchmark for Binary Search algorithms.
 * Compares the execution time of various Binary Search implementations
 * and a linear search for different input sizes.
 */

const { performance } = require('perf_hooks');

// Import algorithms
const { findTargetIterative, findTargetRecursive } = require('../../src/algorithms/binarySearchCore');
const { searchAnyOccurrence, linearSearch } = require('../../src/algorithms/problems/problem1_sortedArraySearch');
const { searchRotated } = require('../../src/algorithms/problems/problem2_rotatedSortedArraySearch');
const { findPeakElement } = require('../../src/algorithms/problems/problem3_peakElement');
const { firstBadVersion } = require('../../src/algorithms/problems/problem4_firstBadVersion');
const { findFirstAndLastPosition } = require('../../src/algorithms/problems/problem5_findRange');

// Import utilities
const { generateSortedArray, generateRotatedSortedArray, createBadVersionAPI } = require('../../src/algorithms/utils/arrayUtils');

/**
 * Runs a benchmark for a given function.
 * @param {string} name Name of the function being benchmarked.
 * @param {function} func The function to benchmark.
 * @param {Array<any>} args Arguments to pass to the function.
 * @param {number} iterations Number of times to run the function for average.
 * @returns {number} Average execution time in milliseconds.
 */
function benchmarkFunction(name, func, args, iterations = 100) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        func(...args);
        const endTime = performance.now();
        totalTime += (endTime - startTime);
    }
    return totalTime / iterations;
}

/**
 * Runs benchmarks for various Binary Search problems.
 */
function runBenchmarks() {
    console.log("--- Binary Search Performance Benchmarks ---");
    console.log("Note: Times are average over 100 iterations. 'Target Found' tests typically search for a middle element.");

    const arraySizes = [100, 1000, 10000, 100000, 1000000];

    // --- Problem 1: Search in Sorted Array ---
    console.log("\n--- Problem 1: Search in a Sorted Array ---");
    arraySizes.forEach(size => {
        const sortedArr = generateSortedArray(size, 0, size * 2);
        const target = sortedArr[Math.floor(size / 2)]; // Target in middle
        const nonTarget = -1; // Guaranteed not in array

        console.log(`\nArray Size: ${size}`);

        // Iterative Binary Search (core)
        let time = benchmarkFunction('Iterative BS (found)', findTargetIterative, [sortedArr, target]);
        console.log(`  Iterative BS (found): ${time.toFixed(4)} ms`);
        time = benchmarkFunction('Iterative BS (not found)', findTargetIterative, [sortedArr, nonTarget]);
        console.log(`  Iterative BS (not found): ${time.toFixed(4)} ms`);

        // Recursive Binary Search (core)
        time = benchmarkFunction('Recursive BS (found)', findTargetRecursive, [sortedArr, target]);
        console.log(`  Recursive BS (found): ${time.toFixed(4)} ms`);
        time = benchmarkFunction('Recursive BS (not found)', findTargetRecursive, [sortedArr, nonTarget]);
        console.log(`  Recursive BS (not found): ${time.toFixed(4)} ms`);

        // Linear Search (for comparison)
        time = benchmarkFunction('Linear Search (found)', linearSearch, [sortedArr, target]);
        console.log(`  Linear Search (found): ${time.toFixed(4)} ms`);
        time = benchmarkFunction('Linear Search (not found)', linearSearch, [sortedArr, nonTarget]);
        console.log(`  Linear Search (not found): ${time.toFixed(4)} ms`);
    });

    // --- Problem 2: Search in Rotated Sorted Array ---
    console.log("\n--- Problem 2: Search in Rotated Sorted Array ---");
    arraySizes.forEach(size => {
        if (size < 1000000) { // Limit size for rotated array generation/target finding
            const rotatedArr = generateRotatedSortedArray(size, 0, size * 2);
            const target = rotatedArr[Math.floor(size / 2)];
            const nonTarget = -1;

            console.log(`\nArray Size: ${size}`);
            let time = benchmarkFunction('Search Rotated (found)', searchRotated, [rotatedArr, target]);
            console.log(`  Search Rotated (found): ${time.toFixed(4)} ms`);
            time = benchmarkFunction('Search Rotated (not found)', searchRotated, [rotatedArr, nonTarget]);
            console.log(`  Search Rotated (not found): ${time.toFixed(4)} ms`);
        } else {
            console.log(`\nSkipping large array size ${size} for rotated array benchmark due to generation overhead.`);
        }
    });

    // --- Problem 3: Find Peak Element ---
    console.log("\n--- Problem 3: Find Peak Element ---");
    arraySizes.forEach(size => {
        const nums = Array.from({ length: size }, (_, i) => i);
        if (size > 1) { // Ensure there's a peak for realistic test
            // Create a guaranteed peak for testing purposes
            const peakIdx = Math.floor(size / 2);
            nums[peakIdx] = size * 10;
        }

        console.log(`\nArray Size: ${size}`);
        let time = benchmarkFunction('Find Peak Element', findPeakElement, [nums]);
        console.log(`  Find Peak Element: ${time.toFixed(4)} ms`);
    });

    // --- Problem 4: First Bad Version ---
    console.log("\n--- Problem 4: First Bad Version ---");
    arraySizes.forEach(size => {
        const badVersion = Math.floor(size / 2) + 1;
        const isBadVersionAPI = createBadVersionAPI(size, badVersion);

        console.log(`\nNumber of Versions (N): ${size}`);
        let time = benchmarkFunction('First Bad Version', firstBadVersion, [size, isBadVersionAPI]);
        console.log(`  First Bad Version: ${time.toFixed(4)} ms`);
    });

    // --- Problem 5: Find First and Last Position of Element ---
    console.log("\n--- Problem 5: Find First and Last Position ---");
    arraySizes.forEach(size => {
        const arrWithDuplicates = generateSortedArray(size, 0, size / 2); // More duplicates
        const target = arrWithDuplicates[Math.floor(size / 2)];
        const nonTarget = -1;

        console.log(`\nArray Size: ${size}`);
        let time = benchmarkFunction('Find First/Last (found)', findFirstAndLastPosition, [arrWithDuplicates, target]);
        console.log(`  Find First/Last (found): ${time.toFixed(4)} ms`);
        time = benchmarkFunction('Find First/Last (not found)', findFirstAndLastPosition, [arrWithDuplicates, nonTarget]);
        console.log(`  Find First/Last (not found): ${time.toFixed(4)} ms`);
    });

    console.log("\n--- Benchmarks Complete ---");
}

runBenchmarks();