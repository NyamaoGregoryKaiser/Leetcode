```javascript
/**
 * benchmarks/benchmarkRunner.js
 *
 * This file provides a performance benchmarking utility for all implemented
 * sorting algorithms and select problem solutions. It measures the execution
 * time for different array sizes and types, helping to observe their
 * practical performance characteristics and confirm theoretical complexities.
 *
 * To run benchmarks: `node benchmarks/benchmarkRunner.js`
 *
 * Make sure to `npm install` for 'cli-table' if not already done.
 */

const {
    generateRandomArray,
    generateSortedArray,
    generateReverseSortedArray,
    generateDuplicatesArray
} = require('../utils/arrayGenerator');
const basicSorts = require('../algorithms/basicSorts');
const advancedSorts = require('../algorithms/advancedSorts');
const sortingProblems = require('../algorithms/sortingProblems');
const Table = require('cli-table');
const colors = require('colors/safe');

const ALL_SORTS = { ...basicSorts, ...advancedSorts };

// --- Configuration ---
const ARRAY_SIZES = [100, 1000, 5000, 10000]; // Array sizes to test
const NUM_ITERATIONS = 5; // Number of runs for each test to average results
const PROBLEM_ARRAY_SIZES = [100, 1000, 5000, 10000]; // Sizes for problem specific benchmarks

// Define the problems to benchmark and how to call them
const PROBLEMS_TO_BENCHMARK = [
    {
        name: "Kth Largest (BruteForce)",
        fn: sortingProblems.findKthLargest_BruteForce,
        args: (arr) => [arr, Math.floor(arr.length / 2)], // k is roughly median
        type: "problem"
    },
    {
        name: "Kth Largest (QuickSelect)",
        fn: sortingProblems.findKthLargest_QuickSelect,
        args: (arr) => [arr, Math.floor(arr.length / 2)],
        type: "problem"
    },
    {
        name: "Kth Largest (MinHeap)",
        fn: sortingProblems.findKthLargest_MinHeap,
        args: (arr) => [arr, Math.floor(arr.length / 2)],
        type: "problem"
    },
    {
        name: "Merge Intervals",
        fn: sortingProblems.mergeIntervals_Optimal,
        args: (arr) => {
            // Convert numbers to intervals for mergeIntervals_Optimal
            const intervals = [];
            for (let i = 0; i < arr.length; i += 2) {
                if (i + 1 < arr.length) {
                    intervals.push([arr[i], arr[i + 1] + Math.floor(Math.random() * 5)]); // Create some overlap potential
                } else {
                    intervals.push([arr[i], arr[i] + Math.floor(Math.random() * 5)]);
                }
            }
            return [intervals.sort((a,b) => a[0] - b[0])]; // Sort intervals for better testing
        },
        type: "problem",
        skipSizes: [10000] // Skip for very large arrays for interval generation complexity
    },
    {
        name: "Wiggle Sort II",
        fn: sortingProblems.wiggleSortII_SortAndDistribute,
        args: (arr) => [arr], // Modifies in-place
        type: "problem"
    },
    {
        name: "Sort Colors (Two-Pass)",
        fn: sortingProblems.sortColors_TwoPass,
        args: (arr) => {
            // Generate an array of 0s, 1s, 2s
            const colorsArr = arr.map(() => Math.floor(Math.random() * 3));
            return [colorsArr];
        },
        type: "problem"
    },
    {
        name: "Sort Colors (One-Pass)",
        fn: sortingProblems.sortColors_OnePass,
        args: (arr) => {
            const colorsArr = arr.map(() => Math.floor(Math.random() * 3));
            return [colorsArr];
        },
        type: "problem"
    },
    {
        name: "Smallest K (BruteForce)",
        fn: sortingProblems.getSmallestKNumbers_BruteForce,
        args: (arr) => [arr, Math.floor(arr.length / 4)], // k is 1/4 of length
        type: "problem"
    },
    {
        name: "Smallest K (MaxHeap)",
        fn: sortingProblems.getSmallestKNumbers_MaxHeap,
        args: (arr) => [arr, Math.floor(arr.length / 4)],
        type: "problem"
    },
    {
        name: "Smallest K (QuickSelect)",
        fn: sortingProblems.getSmallestKNumbers_QuickSelect,
        args: (arr) => [arr, Math.floor(arr.length / 4)],
        type: "problem"
    }
];


/**
 * Measures the execution time of a function.
 * @param {function(...any): any} fn The function to benchmark.
 * @param {Array<any>} args Arguments to pass to the function.
 * @returns {number} Execution time in milliseconds.
 */
function measureExecutionTime(fn, args) {
    const start = process.hrtime.bigint();
    fn(...args);
    const end = process.hrtime.bigint();
    return Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
}

/**
 * Runs benchmarks for a given function and array type.
 * @param {string} name Algorithm/Problem name.
 * @param {function(...any): any} func The function to benchmark.
 * @param {function(number): Array<number>} arrayGenerator Function to generate arrays.
 * @param {function(Array<any>): Array<any>} [argTransformer] Optional function to transform generated array into specific arguments.
 * @param {number[]} [sizesToSkip=[]] Optional array of sizes to skip for this specific benchmark.
 * @returns {object} An object containing average times for each array size.
 */
function benchmarkFunction(name, func, arrayGenerator, argTransformer = (arr) => [arr], sizesToSkip = []) {
    const results = {};
    for (const size of (name.includes("Kth Largest") || name.includes("Smallest K") || name.includes("Merge Intervals") || name.includes("Wiggle Sort") || name.includes("Sort Colors")) ? PROBLEM_ARRAY_SIZES : ARRAY_SIZES) {
        if (sizesToSkip.includes(size)) {
            results[size] = "Skipped";
            continue;
        }
        let totalTime = 0;
        for (let i = 0; i < NUM_ITERATIONS; i++) {
            const arr = arrayGenerator(size);
            const args = argTransformer([...arr]); // Always pass a clone of the generated array
            totalTime += measureExecutionTime(func, args);
        }
        results[size] = (totalTime / NUM_ITERATIONS).toFixed(3); // Average time in ms
    }
    return results;
}

// --- Main Benchmark Execution ---
console.log(colors.bold.blue('--- Running Sorting Algorithm Benchmarks ---'));
console.log(colors.yellow(`(Average over ${NUM_ITERATIONS} runs)`));
console.log('');

const tableHeaders = ['Algorithm', ...ARRAY_SIZES.map(s => `Size ${s}`)];
const sortTable = new Table({
    head: tableHeaders.map(h => colors.cyan(h)),
    colWidths: [20, ...Array_SIZES.map(() => 10)]
});

const problemTable = new Table({
    head: tableHeaders.map(h => colors.cyan(h)),
    colWidths: [25, ...PROBLEM_ARRAY_SIZES.map(() => 10)]
});


// Benchmark standard sorting algorithms
console.log(colors.bold.green('=== Standard Sorts - Random Data ==='));
for (const sortName in ALL_SORTS) {
    const row = [colors.white(sortName)];
    const results = benchmarkFunction(sortName, ALL_SORTS[sortName], generateRandomArray);
    for (const size of ARRAY_SIZES) {
        row.push(results[size]);
    }
    sortTable.push(row);
}
console.log(sortTable.toString());
console.log('');

console.log(colors.bold.green('=== Standard Sorts - Sorted Data (Best Case) ==='));
const sortedTable = new Table({
    head: tableHeaders.map(h => colors.cyan(h)),
    colWidths: [20, ...Array_SIZES.map(() => 10)]
});
for (const sortName in ALL_SORTS) {
    const row = [colors.white(sortName)];
    const results = benchmarkFunction(sortName, ALL_SORTS[sortName], generateSortedArray);
    for (const size of ARRAY_SIZES) {
        row.push(results[size]);
    }
    sortedTable.push(row);
}
console.log(sortedTable.toString());
console.log('');


console.log(colors.bold.green('=== Standard Sorts - Reverse Sorted Data (Worst Case for some) ==='));
const reverseSortedTable = new Table({
    head: tableHeaders.map(h => colors.cyan(h)),
    colWidths: [20, ...Array_SIZES.map(() => 10)]
});
for (const sortName in ALL_SORTS) {
    // Skip negative input for counting/radix sorts, they will error
    const shouldSkipNegative = (sortName === 'countingSort' || sortName === 'radixSort');
    const row = [colors.white(sortName)];
    const results = benchmarkFunction(sortName, ALL_SORTS[sortName], generateReverseSortedArray);
    for (const size of ARRAY_SIZES) {
        if (shouldSkipNegative && results[size] !== "Skipped") {
            // These would throw errors, so we handle them by marking as "N/A"
            row.push(colors.red('N/A (negatives)'));
        } else {
             row.push(results[size]);
        }
    }
    reverseSortedTable.push(row);
}
console.log(reverseSortedTable.toString());
console.log('');


// Benchmark problem solutions
console.log(colors.bold.blue('--- Running Sorting Problem Benchmarks ---'));
console.log(colors.yellow(`(Average over ${NUM_ITERATIONS} runs)`));
console.log('');

console.log(colors.bold.green('=== Problem Solutions - Random Data ==='));
for (const problem of PROBLEMS_TO_BENCHMARK) {
    const row = [colors.white(problem.name)];
    const results = benchmarkFunction(problem.name, problem.fn, generateRandomArray, problem.args, problem.skipSizes || []);
    for (const size of PROBLEM_ARRAY_SIZES) {
        row.push(results[size]);
    }
    problemTable.push(row);
}
console.log(problemTable.toString());
console.log('');

console.log(colors.bold.magenta('Benchmark complete!'));
```