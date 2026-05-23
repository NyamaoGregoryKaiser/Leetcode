```javascript
/**
 * tests/performance.test.js
 *
 * This file contains performance benchmarks for the Binary Search algorithms
 * compared against their brute-force counterparts (where applicable).
 * It uses the `performanceMonitor` utility and `arrayGenerator` to create
 * large datasets and measure execution times.
 */

const {
  standardBinarySearchIterative,
  standardBinarySearchRecursive,
  findFirstAndLastOccurrence,
  searchInRotatedSortedArray,
  findPeakElement,
  minEatingSpeed,
} = require('../src/algorithms/binarySearchProblems');

const {
  standardLinearSearch,
  findFirstAndLastOccurrenceBruteForce,
  searchInRotatedSortedArrayBruteForce,
  findPeakElementBruteForce,
  minEatingSpeedBruteForce,
} = require('../src/algorithms/bruteForceSolutions');

const {
  generateSortedArray,
  generateSortedArrayWithDuplicates,
  generateHomogeneousArray,
  generateRotatedSortedArray,
  generatePeakArray,
  generateBananaPiles,
} = require('../src/utils/arrayGenerator');

const {
  measurePerformance
} = require('../src/utils/performanceMonitor');

// Use a custom reporter or just console.log for benchmarks
// Jest does not typically provide a built-in benchmark runner like `benchmark.js`.
// We'll use `describe.skip` for manual triggering or `if (process.env.BENCHMARK)`
// to prevent running during regular tests. For this project, we'll run it explicitly
// and print results to console.

describe('Performance Benchmarks (Binary Search vs Brute Force)', () => {
  const SIZES = [10000, 100000, 1000000]; // Array sizes for benchmarking
  const TARGET_VAL = 5000; // A common target for testing
  const ITERATIONS = 10; // Number of repetitions for averaging performance

  // Helper to log results
  const logResult = (problem, size, method, time) => {
    console.log(`  ${method.padEnd(40)} | Array Size: ${String(size).padEnd(10)} | Time: ${time.toFixed(4).padEnd(10)} ms`);
  };

  // Skip this entire describe block during normal 'npm test'
  // Run with 'npm run benchmark'
  // To enable, remove .skip or set an environment variable, e.g., `BENCHMARK=true jest tests/performance.test.js`
  // We'll enable it for this output.
  
  console.log("\n--- Binary Search Performance Benchmarks ---");
  console.log("-------------------------------------------\n");


  // --- Problem 1: Standard Binary Search ---
  describe('Problem 1: Standard Binary Search', () => {
    for (const size of SIZES) {
      const sortedArr = generateSortedArray(size, 0, size * 2); // Max value larger than size
      const targetFound = sortedArr[Math.floor(size / 2)]; // Target in middle
      const targetNotFound = size * 3; // Target not in array

      test(`Size ${size}: Target found`, () => {
        const iterativeRes = measurePerformance(standardBinarySearchIterative, [sortedArr, targetFound], ITERATIONS);
        const recursiveRes = measurePerformance(standardBinarySearchRecursive, [sortedArr, targetFound], ITERATIONS);
        const linearRes = measurePerformance(standardLinearSearch, [sortedArr, targetFound], ITERATIONS);

        console.log(`\nProblem 1: Standard Search (Target FOUND: ${targetFound})`);
        logResult('Standard Search', size, 'Binary Search (Iterative)', iterativeRes.timeMs);
        logResult('Standard Search', size, 'Binary Search (Recursive)', recursiveRes.timeMs);
        logResult('Standard Search', size, 'Linear Search (Brute Force)', linearRes.timeMs);

        // Basic sanity check, not strict performance assertion
        expect(iterativeRes.timeMs).toBeLessThan(linearRes.timeMs);
        expect(recursiveRes.timeMs).toBeLessThan(linearRes.timeMs);
        expect(iterativeRes.result).toBe(standardLinearSearch(sortedArr, targetFound));
      });

      test(`Size ${size}: Target not found`, () => {
        const iterativeRes = measurePerformance(standardBinarySearchIterative, [sortedArr, targetNotFound], ITERATIONS);
        const recursiveRes = measurePerformance(standardBinarySearchRecursive, [sortedArr, targetNotFound], ITERATIONS);
        const linearRes = measurePerformance(standardLinearSearch, [sortedArr, targetNotFound], ITERATIONS);

        console.log(`\nProblem 1: Standard Search (Target NOT FOUND: ${targetNotFound})`);
        logResult('Standard Search', size, 'Binary Search (Iterative)', iterativeRes.timeMs);
        logResult('Standard Search', size, 'Binary Search (Recursive)', recursiveRes.timeMs);
        logResult('Standard Search', size, 'Linear Search (Brute Force)', linearRes.timeMs);

        expect(iterativeRes.timeMs).toBeLessThan(linearRes.timeMs);
        expect(recursiveRes.timeMs).toBeLessThan(linearRes.timeMs);
        expect(iterativeRes.result).toBe(standardLinearSearch(sortedArr, targetNotFound));
      });
    }
  });

  // --- Problem 2: Find First and Last Occurrence ---
  describe('Problem 2: Find First and Last Occurrence', () => {
    for (const size of SIZES) {
      const arrWithDuplicates = generateSortedArrayWithDuplicates(size, 0, Math.floor(size / 10), 0.7);
      const target = arrWithDuplicates[Math.floor(arrWithDuplicates.length / 2)]; // Pick a target likely to have duplicates
      const nonExistentTarget = Math.max(...arrWithDuplicates) + 1;

      test(`Size ${size}: Target found (duplicates)`, () => {
        const bsRes = measurePerformance(findFirstAndLastOccurrence, [arrWithDuplicates, target], ITERATIONS);
        const bfRes = measurePerformance(findFirstAndLastOccurrenceBruteForce, [arrWithDuplicates, target], ITERATIONS);

        console.log(`\nProblem 2: Find First/Last Occurrence (Target FOUND: ${target})`);
        logResult('First/Last Occurrence', size, 'Binary Search', bsRes.timeMs);
        logResult('First/Last Occurrence', size, 'Brute Force', bfRes.timeMs);

        expect(bsRes.timeMs).toBeLessThan(bfRes.timeMs);
        expect(bsRes.result).toEqual(findFirstAndLastOccurrenceBruteForce(arrWithDuplicates, target));
      });

      test(`Size ${size}: Target not found`, () => {
        const bsRes = measurePerformance(findFirstAndLastOccurrence, [arrWithDuplicates, nonExistentTarget], ITERATIONS);
        const bfRes = measurePerformance(findFirstAndLastOccurrenceBruteForce, [arrWithDuplicates, nonExistentTarget], ITERATIONS);

        console.log(`\nProblem 2: Find First/Last Occurrence (Target NOT FOUND: ${nonExistentTarget})`);
        logResult('First/Last Occurrence', size, 'Binary Search', bsRes.timeMs);
        logResult('First/Last Occurrence', size, 'Brute Force', bfRes.timeMs);

        expect(bsRes.timeMs).toBeLessThan(bfRes.timeMs);
        expect(bsRes.result).toEqual(findFirstAndLastOccurrenceBruteForce(arrWithDuplicates, nonExistentTarget));
      });
    }
  });

  // --- Problem 3: Search in Rotated Sorted Array ---
  describe('Problem 3: Search in Rotated Sorted Array', () => {
    for (const size of SIZES) {
      const rotatedArr = generateRotatedSortedArray(size, 0, size * 2);
      const targetFound = rotatedArr[Math.floor(size / 2)];
      const targetNotFound = size * 3;

      test(`Size ${size}: Target found`, () => {
        const bsRes = measurePerformance(searchInRotatedSortedArray, [rotatedArr, targetFound], ITERATIONS);
        const bfRes = measurePerformance(searchInRotatedSortedArrayBruteForce, [rotatedArr, targetFound], ITERATIONS);

        console.log(`\nProblem 3: Search in Rotated Sorted Array (Target FOUND: ${targetFound})`);
        logResult('Rotated Search', size, 'Binary Search', bsRes.timeMs);
        logResult('Rotated Search', size, 'Brute Force', bfRes.timeMs);

        expect(bsRes.timeMs).toBeLessThan(bfRes.timeMs);
        expect(bsRes.result).toBe(searchInRotatedSortedArrayBruteForce(rotatedArr, targetFound));
      });

      test(`Size ${size}: Target not found`, () => {
        const bsRes = measurePerformance(searchInRotatedSortedArray, [rotatedArr, targetNotFound], ITERATIONS);
        const bfRes = measurePerformance(searchInRotatedSortedArrayBruteForce, [rotatedArr, targetNotFound], ITERATIONS);

        console.log(`\nProblem 3: Search in Rotated Sorted Array (Target NOT FOUND: ${targetNotFound})`);
        logResult('Rotated Search', size, 'Binary Search', bsRes.timeMs);
        logResult('Rotated Search', size, 'Brute Force', bfRes.timeMs);

        expect(bsRes.timeMs).toBeLessThan(bfRes.timeMs);
        expect(bsRes.result).toBe(searchInRotatedSortedArrayBruteForce(rotatedArr, targetNotFound));
      });
    }
  });

  // --- Problem 4: Find Peak Element ---
  describe('Problem 4: Find Peak Element', () => {
    for (const size of SIZES) {
      // Peak arrays can be complex, ensure peak is findable
      const peakArr = generatePeakArray(size, 1, size * 2);

      test(`Size ${size}: Find Peak Element`, () => {
        const bsRes = measurePerformance(findPeakElement, [peakArr], ITERATIONS);
        const bfRes = measurePerformance(findPeakElementBruteForce, [peakArr], ITERATIONS);

        console.log(`\nProblem 4: Find Peak Element`);
        logResult('Find Peak', size, 'Binary Search', bsRes.timeMs);
        logResult('Find Peak', size, 'Brute Force', bfRes.timeMs);

        // For peak, there can be multiple valid peaks. Just check that *a* peak is found and is valid.
        const peakIndex = bsRes.result;
        const peakValue = peakArr[peakIndex];
        const leftNeighbor = peakIndex > 0 ? peakArr[peakIndex - 1] : -Infinity;
        const rightNeighbor = peakIndex < peakArr.length - 1 ? peakArr[peakIndex + 1] : -Infinity;
        expect(peakValue).toBeGreaterThan(leftNeighbor);
        expect(peakValue).toBeGreaterThan(rightNeighbor);
        expect(bsRes.timeMs).toBeLessThan(bfRes.timeMs);
      });
    }
  });

  // --- Problem 5: Koko Eating Bananas ---
  describe('Problem 5: Koko Eating Bananas', () => {
    // Koko's problem involves N * log M complexity. Let's use smaller N for huge M.
    const KOKO_SIZES = [{
      piles: 1000,
      maxPile: 1000000
    }, {
      piles: 10000,
      maxPile: 100000
    }];
    const H_FACTOR = 1.5; // h = N * H_FACTOR (to ensure speed is not always 1 or max_pile)

    for (const config of KOKO_SIZES) {
      const {
        piles: numPiles,
        maxPile: maxPileSize
      } = config;
      const piles = generateBananaPiles(numPiles, 1, maxPileSize);
      // Hours should be within a reasonable range for Koko to find an optimal k.
      // E.g., if h is very large, k=1. If h is very small, k=max(piles).
      const h = Math.floor(numPiles * H_FACTOR) + Math.ceil(Math.log2(maxPileSize)); // Adjusted H to make it challenging

      test(`Piles: ${numPiles}, MaxPile: ${maxPileSize}, H: ${h}`, () => {
        const bsRes = measurePerformance(minEatingSpeed, [piles, h], ITERATIONS);
        const bfRes = measurePerformance(minEatingSpeedBruteForce, [piles, h], ITERATIONS);

        console.log(`\nProblem 5: Koko Eating Bananas (Piles: ${numPiles}, MaxPile: ${maxPileSize}, H: ${h})`);
        logResult('Koko Eating Bananas', numPiles, 'Binary Search on Answer', bsRes.timeMs);
        logResult('Koko Eating Bananas', numPiles, 'Brute Force Iteration', bfRes.timeMs);

        expect(bsRes.timeMs).toBeLessThan(bfRes.timeMs);
        expect(bsRes.result).toBe(minEatingSpeedBruteForce(piles, h));
      });
    }
  });
});
```