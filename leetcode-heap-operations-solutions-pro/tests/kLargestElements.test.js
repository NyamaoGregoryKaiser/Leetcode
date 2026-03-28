```javascript
/**
 * kLargestElements.test.js
 *
 * Jest test suite for the Kth Largest Element / K Largest Elements problem.
 */

const { findKthLargest, findKLargestElements, findKthLargest_BruteForce } = require('../src/algorithms/kLargestElements');
const { benchmark, benchmarkAverage } = require('../src/utils/performanceBenchmarking');

describe('findKthLargest', () => {
    test('should find the 2nd largest element', () => {
        const nums = [3, 2, 1, 5, 6, 4];
        const k = 2;
        expect(findKthLargest(nums, k)).toBe(5);
    });

    test('should find the 4th largest element with duplicates', () => {
        const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
        const k = 4;
        expect(findKthLargest(nums, k)).toBe(4);
    });

    test('should handle k = 1 (largest element)', () => {
        const nums = [7, 6, 5, 4, 3, 2, 1];
        const k = 1;
        expect(findKthLargest(nums, k)).toBe(7);
    });

    test('should handle k = nums.length (smallest element)', () => {
        const nums = [7, 6, 5, 4, 3, 2, 1];
        const k = 7;
        expect(findKthLargest(nums, k)).toBe(1);
    });

    test('should handle single element array', () => {
        const nums = [1];
        const k = 1;
        expect(findKthLargest(nums, k)).toBe(1);
    });

    test('should throw error for invalid k', () => {
        const nums = [1, 2, 3];
        expect(() => findKthLargest(nums, 0)).toThrow("Invalid input");
        expect(() => findKthLargest(nums, 4)).toThrow("Invalid input");
    });

    test('should throw error for empty array', () => {
        const nums = [];
        expect(() => findKthLargest(nums, 1)).toThrow("Invalid input");
    });

    test('should find Kth largest in a larger array', () => {
        const nums = [99, 12, 34, 5, 76, 23, 89, 45, 67, 88, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11];
        const k = 5;
        // Sorted descending: [99, 89, 88, 76, 67, 45, ...]
        expect(findKthLargest(nums, k)).toBe(67);
    });

    test('optimized vs brute force for Kth Largest (large data, small K)', () => {
        const N = 100000;
        const K = 10;
        const nums = Array.from({ length: N }, () => Math.floor(Math.random() * N));

        // Optimized Heap solution
        const heapBenchmark = benchmark(() => findKthLargest(nums, K));
        console.log(`\nfindKthLargest (Heap, N=${N}, K=${K}): Result=${heapBenchmark.result}, Time=${heapBenchmark.durationMs.toFixed(3)}ms`);
        // Brute force (Sorting) solution
        const bruteForceBenchmark = benchmark(() => findKthLargest_BruteForce(nums, K));
        console.log(`findKthLargest_BruteForce (Sorting, N=${N}, K=${K}): Result=${bruteForceBenchmark.result}, Time=${bruteForceBenchmark.durationMs.toFixed(3)}ms`);

        expect(heapBenchmark.result).toBe(bruteForceBenchmark.result);
        // Expect heap to be faster for small K relative to N, but not strictly guaranteed in test.
        // It generally should be, as O(N log K) < O(N log N) when K << N.
        // If K is close to N, sorting might be faster due to constant factors or highly optimized built-in sort.
    });
});

describe('findKLargestElements', () => {
    test('should find the 3 largest elements', () => {
        const nums = [3, 2, 1, 5, 6, 4];
        const k = 3;
        expect(findKLargestElements(nums, k)).toEqual([6, 5, 4]);
    });

    test('should find the 5 largest elements with duplicates', () => {
        const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
        const k = 5;
        expect(findKLargestElements(nums, k)).toEqual([6, 5, 5, 4, 3]);
    });

    test('should handle k = 1', () => {
        const nums = [7, 6, 5, 4, 3, 2, 1];
        const k = 1;
        expect(findKLargestElements(nums, k)).toEqual([7]);
    });

    test('should return all elements if k >= nums.length', () => {
        const nums = [1, 5, 2];
        const k = 3;
        expect(findKLargestElements(nums, k)).toEqual([5, 2, 1]); // sorted descending
        expect(findKLargestElements(nums, 4)).toEqual([5, 2, 1]); // k > nums.length
    });

    test('should return empty array for empty input or k <= 0', () => {
        expect(findKLargestElements([], 1)).toEqual([]);
        expect(findKLargestElements([1, 2, 3], 0)).toEqual([]);
    });
});
```