```javascript
/**
 * @fileoverview Performance benchmarking for sorting algorithms and problem solutions.
 * This script compares the execution time of different sorting algorithms and
 * multiple approaches for selected interview problems on various input sizes.
 */

const { generateRandomArray, isSorted } = require('../src/utils/arrayUtils');

// Sorting Algorithms
const bubbleSort = require('../src/algorithms/bubbleSort');
const selectionSort = require('../src/algorithms/selectionSort');
const insertionSort = require('../src/algorithms/insertionSort');
const mergeSort = require('../src/algorithms/mergeSort');
const quickSort = require('../src/algorithms/quickSort');
const heapSort = require('../src/algorithms/heapSort');

// Problem Solutions
const {
  findKthLargest_sort,
  findKthLargest_minHeap,
  findKthLargest_quickSelect,
} = require('../src/problems/problem1_kthLargestElement');

const mergeIntervals = require('../src/problems/problem2_mergeIntervals');

const {
  sortColors_twoPass,
  sortColors_onePass,
} = require('../src/problems/problem3_dutchNationalFlag');


// --- Benchmarking Utilities ---

/**
 * Runs a function and measures its execution time.
 * @param {Function} func The function to benchmark.
 * @param {Array<any>} args Arguments to pass to the function.
 * @returns {number} The execution time in milliseconds.
 */
function measureTime(func, args) {
  const start = process.hrtime.bigint();
  func(...args);
  const end = process.hrtime.bigint();
  return Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
}

/**
 * Executes a benchmark for a given function across different array sizes.
 * @param {string} name Name of the algorithm/function.
 * @param {Function} func The function to benchmark.
 * @param {Array<number>} inputSizes An array of input sizes to test.
 * @param {Function} arrayGenerator A function that takes size, min, max and returns an array.
 * @param {Function} validator An optional function to validate the output (e.g., isSorted).
 * @param {boolean} copyInput If true, pass a copy of the array to the function.
 * @param {Array<any>} additionalArgs Additional arguments to pass to the function besides the array.
 */
function runBenchmark(name, func, inputSizes, arrayGenerator, validator = null, copyInput = true, additionalArgs = []) {
  console.log(`\n--- Benchmarking: ${name} ---`);
  inputSizes.forEach(size => {
    let arr = arrayGenerator(size, 0, size * 2); // Generate unique arrays for each size
    let result = null;
    let time = 0;
    try {
      if (copyInput) {
        // Deep copy for objects in problems
        const inputForFunc = JSON.parse(JSON.stringify(arr));
        time = measureTime(func, [inputForFunc, ...additionalArgs]);
        result = inputForFunc; // For in-place modifications
        // If the function returns a new array (like mergeSort), capture that.
        // For general purpose, let's assume if it returns something, it's the result.
        // Otherwise, the input is modified.
        const returnedResult = func(JSON.parse(JSON.stringify(arr)), ...additionalArgs);
        if (returnedResult !== undefined && returnedResult !== inputForFunc) {
            result = returnedResult;
        }
      } else {
        time = measureTime(func, [arr, ...additionalArgs]);
        result = arr;
      }
    } catch (e) {
      console.error(`  Size ${size}: Error during execution: ${e.message}`);
      return;
    }

    let validationStatus = 'N/A';
    if (validator) {
      try {
        validationStatus = validator(result, ...additionalArgs) ? 'PASSED' : 'FAILED';
      } catch (e) {
        validationStatus = `ERROR: ${e.message}`;
      }
    }
    console.log(`  Size ${size}: ${time.toFixed(3).padStart(8, ' ')} ms (Validation: ${validationStatus})`);
  });
}

// --- Benchmark Configurations ---

const sizes = [100, 1000, 5000, 10000, 50000]; // Array sizes for sorting algorithms

// Sorting algorithms benchmark
const sortingAlgorithmsToBenchmark = [
  { name: 'Bubble Sort', func: bubbleSort, copyInput: true },
  { name: 'Selection Sort', func: selectionSort, copyInput: true },
  { name: 'Insertion Sort', func: insertionSort, copyInput: true },
  { name: 'Merge Sort', func: mergeSort, copyInput: true }, // Merge sort returns new array
  { name: 'Quick Sort', func: quickSort, copyInput: true },
  { name: 'Heap Sort', func: heapSort, copyInput: true },
];

// Problem 1: Kth Largest Element
const kthLargestInputSizes = [100, 1000, 10000, 100000, 500000];
const kthLargestK = (size) => Math.floor(size / 2); // Example: always find the median-ish element

// This validator verifies if the found element is indeed the k-th largest by sorting
const validateKthLargest = (result, originalNums, k) => {
  const sorted = [...originalNums].sort((a, b) => a - b);
  return result === sorted[originalNums.length - k];
};

const kthLargestApproaches = [
  { name: 'Kth Largest (Sort)', func: findKthLargest_sort, validator: validateKthLargest, additionalArgs: [kthLargestK] },
  { name: 'Kth Largest (Min-Heap)', func: findKthLargest_minHeap, validator: validateKthLargest, additionalArgs: [kthLargestK] },
  { name: 'Kth Largest (QuickSelect)', func: findKthLargest_quickSelect, validator: validateKthLargest, additionalArgs: [kthLargestK] },
];

// Problem 2: Merge Intervals
const mergeIntervalsInputSizes = [100, 1000, 5000, 10000];
// Intervals generator: generates non-overlapping and overlapping intervals
const generateIntervals = (size) => {
  const intervals = [];
  let currentStart = 0;
  for (let i = 0; i < size; i++) {
    // Random interval length between 1 and 100
    const length = Math.floor(Math.random() * 100) + 1;
    // Add some overlap potential, or space out
    const gap = Math.floor(Math.random() * 50); // Gap or overlap value
    const start = currentStart + gap;
    const end = start + length;
    intervals.push([start, end]);
    currentStart = start + length + Math.floor(Math.random() * 20); // Move currentStart forward
  }
  return intervals;
};

const validateMergedIntervals = (merged, originalIntervals) => {
    // For robust validation, you'd need a more complex check, e.g.,
    // 1. Ensure all original points are covered.
    // 2. Ensure no overlaps in merged.
    // 3. Ensure merged is sorted.
    // For simplicity here, we'll just check if it's sorted and no trivial overlaps.
    for (let i = 0; i < merged.length - 1; i++) {
        if (merged[i][1] >= merged[i+1][0]) {
            return false; // Found overlap
        }
    }
    return true; // Simplistic validation
};

const mergeIntervalsApproach = [
  { name: 'Merge Intervals', func: mergeIntervals, generator: generateIntervals, validator: validateMergedIntervals, copyInput: true },
];

// Problem 3: Sort Colors (Dutch National Flag)
const sortColorsInputSizes = [1000, 10000, 100000, 1000000];
// Generator for 0, 1, 2
const generateColorsArray = (size) => generateRandomArray(size, 0, 2);

const validateSortedColors = (arr) => {
  // Check if all 0s come first, then 1s, then 2s
  let first1 = -1;
  let first2 = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1 && first1 === -1) first1 = i;
    if (arr[i] === 2 && first2 === -1) first2 = i;

    if (first1 !== -1 && arr[i] === 0) return false; // 0 after 1s started
    if (first2 !== -1 && (arr[i] === 0 || arr[i] === 1)) return false; // 0 or 1 after 2s started
  }
  return true;
};

const sortColorsApproaches = [
  { name: 'Sort Colors (Two-Pass)', func: sortColors_twoPass, validator: validateSortedColors, copyInput: true },
  { name: 'Sort Colors (One-Pass DNF)', func: sortColors_onePass, validator: validateSortedColors, copyInput: true },
];

// --- Main Benchmark Runner ---
function runAllBenchmarks() {
  console.log('Starting Benchmarks...\n');
  console.log('Note: Times are in milliseconds. "N/A" for validation means no specific validator was provided or it threw an error.');

  // Benchmarking Sorting Algorithms
  sortingAlgorithmsToBenchmark.forEach(algo => {
    runBenchmark(
      algo.name,
      algo.func,
      sizes,
      generateRandomArray, // Random arrays are typical for avg case
      isSorted,             // Validate that the output is sorted
      algo.copyInput
    );
  });

  // Benchmarking Kth Largest Element approaches
  kthLargestApproaches.forEach(approach => {
    runBenchmark(
      approach.name,
      approach.func,
      kthLargestInputSizes,
      (size) => generateRandomArray(size, 0, size * 2), // Array generator
      (result, arrCopy) => validateKthLargest(result, arrCopy, approach.additionalArgs[0](arrCopy.length)), // Validator needs original array and k
      true, // Always copy input for problems
      [kthLargestK] // Pass k as an additional argument factory
    );
  });


  // Benchmarking Merge Intervals
  mergeIntervalsApproach.forEach(approach => {
    runBenchmark(
      approach.name,
      approach.func,
      mergeIntervalsInputSizes,
      approach.generator, // Use custom generator for intervals
      validateMergedIntervals, // Validate merged intervals
      approach.copyInput
    );
  });

  // Benchmarking Sort Colors
  sortColorsApproaches.forEach(approach => {
    runBenchmark(
      approach.name,
      approach.func,
      sortColorsInputSizes,
      generateColorsArray, // Use custom generator for colors (0,1,2)
      validateSortedColors, // Validate sorted colors
      approach.copyInput
    );
  });

  console.log('\nBenchmarks Finished.');
}

// Run all benchmarks
runAllBenchmarks();
```