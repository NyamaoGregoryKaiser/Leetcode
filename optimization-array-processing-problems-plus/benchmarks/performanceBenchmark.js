/**
 * @fileoverview Performance benchmarking script for array manipulation algorithms.
 * This script compares the execution time of different approaches for selected problems
 * using large datasets.
 */

const { generateRandomArray, generateRandomIntervals, isEqualArrays } = require('../utils/arrayUtils');

// Import algorithm implementations
const {
    rotateArrayByReverse,
    rotateArrayBySplice,
    rotateArrayByTempArray
} = require('../src/rotateArray');

const {
    productExceptSelfOptimal,
    productExceptSelfBruteForce
} = require('../src/productExceptSelf');

const {
    maxSubarraySumKadane,
    maxSubarraySumBruteForce
} = require('../src/maxSubarraySum');

const { mergeIntervals } = require('../src/mergeIntervals');

// --- Configuration ---
const ARRAY_SIZE_SMALL = 1000;
const ARRAY_SIZE_MEDIUM = 10000;
const ARRAY_SIZE_LARGE = 100000;
const INTERVAL_SIZE_LARGE = 50000; // Intervals tend to be more complex, so a bit smaller than general array
const K_ROTATION = Math.floor(ARRAY_SIZE_LARGE / 3); // A non-trivial rotation k

console.log("--- Array Manipulation Algorithm Benchmarks ---");
console.log(`Array sizes: Small=${ARRAY_SIZE_SMALL}, Medium=${ARRAY_SIZE_MEDIUM}, Large=${ARRAY_SIZE_LARGE}`);
console.log(`Interval size: Large=${INTERVAL_SIZE_LARGE}`);
console.log(`Rotation k for large array: ${K_ROTATION}`);
console.log("-----------------------------------------------");

/**
 * Generic benchmarking function.
 * @param {string} name Name of the test.
 * @param {Function} func The function to benchmark.
 * @param {any[]} args Arguments to pass to the function.
 * @param {boolean} verify If true, try to verify output against a reference (optional).
 * @param {any} expected The expected output for verification.
 * @returns {number} Execution time in milliseconds.
 */
function benchmark(name, func, args, verify = false, expected = null) {
    const startTime = process.hrtime.bigint();
    const result = func(...args);
    const endTime = process.hrtime.bigint();
    const durationMs = Number(endTime - startTime) / 1_000_000;

    console.log(`  - ${name}: ${durationMs.toFixed(3)} ms`);

    if (verify && expected !== null) {
        let testPassed = false;
        if (Array.isArray(expected)) {
            // For arrays, use deep comparison
            testPassed = isEqualArrays(result, expected);
        } else {
            // For primitives
            testPassed = (result === expected);
        }
        if (!testPassed) {
            console.error(`    VERIFICATION FAILED for ${name}. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`);
        }
    }
    return durationMs;
}

// --- Problem 1: Rotate Array ---
console.log("\n--- Rotating Array ---");
const largeArrayRotate = generateRandomArray(ARRAY_SIZE_LARGE, 1, 100);
let clonedArray1, clonedArray2;

// To ensure consistent input, clone the original array for each method
clonedArray1 = [...largeArrayRotate];
benchmark(`Rotate (Reverse Method, ${ARRAY_SIZE_LARGE} elements)`, rotateArrayByReverse, [clonedArray1, K_ROTATION]);

clonedArray1 = [...largeArrayRotate]; // Reset for next method
benchmark(`Rotate (Temp Array Method, ${ARRAY_SIZE_LARGE} elements)`, rotateArrayByTempArray, [clonedArray1, K_ROTATION]);

clonedArray1 = [...largeArrayRotate]; // Reset for next method
// For very large arrays, splice/unshift can be extremely slow. Test with medium size.
clonedArray2 = generateRandomArray(ARRAY_SIZE_MEDIUM, 1, 100);
benchmark(`Rotate (Splice/Unshift Method, ${ARRAY_SIZE_MEDIUM} elements)`, rotateArrayBySplice, [clonedArray2, Math.floor(ARRAY_SIZE_MEDIUM / 3)]);


// --- Problem 2: Product of Array Except Self ---
console.log("\n--- Product of Array Except Self ---");
const largeArrayProduct = generateRandomArray(ARRAY_SIZE_LARGE, -10, 10);
const mediumArrayProduct = generateRandomArray(ARRAY_SIZE_MEDIUM, -10, 10);

benchmark(`Optimal (O(N), ${ARRAY_SIZE_LARGE} elements)`, productExceptSelfOptimal, [largeArrayProduct]);
benchmark(`Brute Force (O(N^2), ${ARRAY_SIZE_MEDIUM} elements)`, productExceptSelfBruteForce, [mediumArrayProduct]); // Brute force too slow for ARRAY_SIZE_LARGE


// --- Problem 3: Maximum Subarray Sum ---
console.log("\n--- Maximum Subarray Sum ---");
const largeArraySum = generateRandomArray(ARRAY_SIZE_LARGE, -100, 100);
const mediumArraySum = generateRandomArray(ARRAY_SIZE_MEDIUM, -100, 100);

benchmark(`Kadane's Algorithm (O(N), ${ARRAY_SIZE_LARGE} elements)`, maxSubarraySumKadane, [largeArraySum]);
benchmark(`Brute Force (O(N^2), ${ARRAY_SIZE_MEDIUM} elements)`, maxSubarraySumBruteForce, [mediumArraySum]); // Brute force too slow for ARRAY_SIZE_LARGE


// --- Problem 4: Merge Overlapping Intervals ---
console.log("\n--- Merge Overlapping Intervals ---");
const largeIntervals = generateRandomIntervals(INTERVAL_SIZE_LARGE, 0, 100000, 500); // Max end 100k, max duration 500
benchmark(`Merge Intervals (O(N log N), ${INTERVAL_SIZE_LARGE} intervals)`, mergeIntervals, [largeIntervals]);

console.log("\n-----------------------------------------------");
console.log("Benchmarks complete.");