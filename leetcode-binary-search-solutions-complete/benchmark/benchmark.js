```javascript
/**
 * benchmark/benchmark.js
 * Performance benchmarking script for binary search problems.
 */

const {
    binarySearchIterative,
    binarySearchRecursive,
    findFirstOccurrence,
    findLastOccurrence,
    searchRotatedArray,
    searchRotatedArrayBruteForce,
    findPeakElement,
    findPeakElementBruteForce,
    mySqrt,
    mySqrtBruteForce
} = require('../src/problems'); // Import all solutions
const { ArrayUtils, Logger } = require('../src'); // Import utilities

/**
 * Runs a benchmark for a given function.
 * @param {string} name - Name of the function being benchmarked.
 * @param {Function} func - The function to benchmark.
 * @param {Array<Object>} testCases - Array of objects with { input, expected } for the function.
 * @returns {number} The average execution time in milliseconds.
 */
function runBenchmark(name, func, testCases) {
    let totalTime = 0;
    const iterations = 1000; // Number of times to run each test case for averaging

    for (let i = 0; i < iterations; i++) {
        for (const testCase of testCases) {
            const startTime = process.hrtime.bigint(); // High-resolution time
            // Spread input if it's an array, otherwise pass directly
            const result = Array.isArray(testCase.input) ? func(...testCase.input) : func(testCase.input);
            const endTime = process.hrtime.bigint();

            totalTime += Number(endTime - startTime); // Convert BigInt to number (nanoseconds)
        }
    }
    // Convert total nanoseconds to milliseconds
    return (totalTime / BigInt(iterations * testCases.length)) / 1_000_000;
}


Logger.section('Performance Benchmarks');

// --- Problem 1: Standard Binary Search ---
Logger.subSection('1. Standard Binary Search');
const arrSizeSmall = 100;
const arrSizeMedium = 10000;
const arrSizeLarge = 1000000;

const arrSmall = ArrayUtils.generateSortedArray(arrSizeSmall);
const arrMedium = ArrayUtils.generateSortedArray(arrSizeMedium);
const arrLarge = ArrayUtils.generateSortedArray(arrSizeLarge);

const bsTestCases = [
    { arr: arrSmall, target: arrSmall[Math.floor(arrSizeSmall / 2)] },
    { arr: arrSmall, target: arrSmall[arrSizeSmall - 1] },
    { arr: arrSmall, target: -1 }, // Not found
    { arr: arrMedium, target: arrMedium[Math.floor(arrSizeMedium / 2)] },
    { arr: arrMedium, target: arrMedium[arrSizeMedium - 1] },
    { arr: arrMedium, target: -1 },
    { arr: arrLarge, target: arrLarge[Math.floor(arrSizeLarge / 2)] },
    { arr: arrLarge, target: arrLarge[arrSizeLarge - 1] },
    { arr: arrLarge, target: -1 },
];

const formattedBSTestCases = bsTestCases.map(tc => ({ input: [tc.arr, tc.target] }));

const timeIterative = runBenchmark('binarySearchIterative', binarySearchIterative, formattedBSTestCases);
const timeRecursive = runBenchmark('binarySearchRecursive', binarySearchRecursive, formattedBSTestCases);

Logger.log(`  Iterative Binary Search: ${timeIterative.toFixed(5)} ms (avg per op)`);
Logger.log(`  Recursive Binary Search: ${timeRecursive.toFixed(5)} ms (avg per op)`);


// --- Problem 2: Find First/Last Occurrence ---
Logger.subSection('2. Find First/Last Occurrence');
const arrWithDupesSmall = ArrayUtils.generateSortedArrayWithDuplicates(100, 50, 20, 0);
const arrWithDupesMedium = ArrayUtils.generateSortedArrayWithDuplicates(10000, 5000, 2000, 0);
const arrWithDupesLarge = ArrayUtils.generateSortedArrayWithDuplicates(1000000, 500000, 200000, 0);

const findOccurrenceTestCases = [
    { arr: arrWithDupesSmall, target: 50 },
    { arr: arrWithDupesSmall, target: 10 },
    { arr: arrWithDupesSmall, target: 100 },
    { arr: arrWithDupesMedium, target: 5000 },
    { arr: arrWithDupesMedium, target: 1000 },
    { arr: arrWithDupesMedium, target: 10000 },
    { arr: arrWithDupesLarge, target: 500000 },
    { arr: arrWithDupesLarge, target: 100000 },
    { arr: arrWithDupesLarge, target: 1000000 },
];

const formattedFirstLastTestCases = findOccurrenceTestCases.map(tc => ({ input: [tc.arr, tc.target] }));

const timeFirstOcc = runBenchmark('findFirstOccurrence', findFirstOccurrence, formattedFirstLastTestCases);
const timeLastOcc = runBenchmark('findLastOccurrence', findLastOccurrence, formattedFirstLastTestCases);

Logger.log(`  Find First Occurrence: ${timeFirstOcc.toFixed(5)} ms (avg per op)`);
Logger.log(`  Find Last Occurrence: ${timeLastOcc.toFixed(5)} ms (avg per op)`);


// --- Problem 3: Search in Rotated Sorted Array ---
Logger.subSection('3. Search in Rotated Sorted Array');
const rotatedArrSmall = ArrayUtils.generateRotatedSortedArray(100, 25);
const rotatedArrMedium = ArrayUtils.generateRotatedSortedArray(10000, 2500);
const rotatedArrLarge = ArrayUtils.generateRotatedSortedArray(1000000, 250000);

const rotatedTestCases = [
    { arr: rotatedArrSmall, target: rotatedArrSmall[0] },
    { arr: rotatedArrSmall, target: rotatedArrSmall[rotatedArrSmall.length - 1] },
    { arr: rotatedArrSmall, target: 999 }, // Not found
    { arr: rotatedArrMedium, target: rotatedArrMedium[0] },
    { arr: rotatedArrMedium, target: rotatedArrMedium[rotatedArrMedium.length - 1] },
    { arr: rotatedArrMedium, target: 99999 },
    { arr: rotatedArrLarge, target: rotatedArrLarge[0] },
    { arr: rotatedArrLarge, target: rotatedArrLarge[rotatedArrLarge.length - 1] },
    { arr: rotatedArrLarge, target: 9999999 },
];

const formattedRotatedTestCases = rotatedTestCases.map(tc => ({ input: [tc.arr, tc.target] }));

const timeRotatedOptimized = runBenchmark('searchRotatedArray', searchRotatedArray, formattedRotatedTestCases);
const timeRotatedBruteForce = runBenchmark('searchRotatedArrayBruteForce', searchRotatedArrayBruteForce, formattedRotatedTestCases);

Logger.log(`  Optimized (Binary Search): ${timeRotatedOptimized.toFixed(5)} ms (avg per op)`);
Logger.log(`  Brute Force (Linear Scan): ${timeRotatedBruteForce.toFixed(5)} ms (avg per op)`);


// --- Problem 4: Find Peak Element ---
Logger.subSection('4. Find Peak Element');
const peakArrSmall = [1, 2, 1, 3, 5, 6, 4, 2, 0];
const peakArrMedium = ArrayUtils.generateSortedArray(5000).concat(ArrayUtils.generateSortedArray(5000).reverse().slice(1)); // Mountain shape
const peakArrLarge = ArrayUtils.generateSortedArray(500000).concat(ArrayUtils.generateSortedArray(500000).reverse().slice(1)); // Mountain shape

const peakTestCases = [
    { arr: peakArrSmall },
    { arr: [1, 2, 3, 4, 5] },
    { arr: [5, 4, 3, 2, 1] },
    { arr: peakArrMedium },
    { arr: peakArrLarge },
];

const formattedPeakTestCases = peakTestCases.map(tc => ({ input: [tc.arr] }));

const timePeakOptimized = runBenchmark('findPeakElement', findPeakElement, formattedPeakTestCases);
const timePeakBruteForce = runBenchmark('findPeakElementBruteForce', findPeakElementBruteForce, formattedPeakTestCases);

Logger.log(`  Optimized (Binary Search): ${timePeakOptimized.toFixed(5)} ms (avg per op)`);
Logger.log(`  Brute Force (Linear Scan): ${timePeakBruteForce.toFixed(5)} ms (avg per op)`);


// --- Problem 5: Sqrt(x) ---
Logger.subSection('5. Sqrt(x)');
const sqrtTestCases = [
    { input: 0 }, { input: 1 }, { input: 4 }, { input: 8 }, { input: 16 }, { input: 99 }, { input: 100 },
    { input: 2147395599 }, { input: Math.pow(2, 30) }, { input: Math.pow(2, 40) }
];

const formattedSqrtTestCases = sqrtTestCases.map(tc => ({ input: tc.input }));

const timeSqrtOptimized = runBenchmark('mySqrt', mySqrt, formattedSqrtTestCases);
const timeSqrtBruteForce = runBenchmark('mySqrtBruteForce', mySqrtBruteForce, formattedSqrtTestCases); // uses Math.sqrt()

Logger.log(`  Optimized (Binary Search): ${timeSqrtOptimized.toFixed(5)} ms (avg per op)`);
Logger.log(`  Brute Force (Math.sqrt()): ${timeSqrtBruteForce.toFixed(5)} ms (avg per op)`);


Logger.section('Benchmarking Complete');
```