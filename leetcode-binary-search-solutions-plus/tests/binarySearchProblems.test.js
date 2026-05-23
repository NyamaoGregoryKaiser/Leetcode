```javascript
/**
 * tests/binarySearchProblems.test.js
 *
 * Jest test suite for the Binary Search algorithm implementations.
 * Covers a wide range of test cases including edge cases, typical cases,
 * and scenarios specific to each problem.
 */

const {
  standardBinarySearchIterative,
  standardBinarySearchRecursive,
  findFirstAndLastOccurrence,
  searchInRotatedSortedArray,
  findPeakElement,
  minEatingSpeed,
} = require('../src/algorithms/binarySearchProblems');

describe('Binary Search Algorithms', () => {

  // --- Problem 1: Standard Binary Search ---
  describe('standardBinarySearch (Iterative and Recursive)', () => {
    const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    test('should find target in the middle (iterative)', () => {
      expect(standardBinarySearchIterative(sortedArray, 9)).toBe(4);
    });

    test('should find target at the beginning (iterative)', () => {
      expect(standardBinarySearchIterative(sortedArray, 1)).toBe(0);
    });

    test('should find target at the end (iterative)', () => {
      expect(standardBinarySearchIterative(sortedArray, 19)).toBe(9);
    });

    test('should return -1 if target not found (iterative)', () => {
      expect(standardBinarySearchIterative(sortedArray, 8)).toBe(-1);
    });

    test('should handle empty array (iterative)', () => {
      expect(standardBinarySearchIterative([], 5)).toBe(-1);
    });

    test('should handle single element array (target found) (iterative)', () => {
      expect(standardBinarySearchIterative([5], 5)).toBe(0);
    });

    test('should handle single element array (target not found) (iterative)', () => {
      expect(standardBinarySearchIterative([5], 1)).toBe(-1);
    });

    test('should find target in the middle (recursive)', () => {
      expect(standardBinarySearchRecursive(sortedArray, 9)).toBe(4);
    });

    test('should find target at the beginning (recursive)', () => {
      expect(standardBinarySearchRecursive(sortedArray, 1)).toBe(0);
    });

    test('should find target at the end (recursive)', () => {
      expect(standardBinarySearchRecursive(sortedArray, 19)).toBe(9);
    });

    test('should return -1 if target not found (recursive)', () => {
      expect(standardBinarySearchRecursive(sortedArray, 8)).toBe(-1);
    });

    test('should handle empty array (recursive)', () => {
      expect(standardBinarySearchRecursive([], 5)).toBe(-1);
    });

    test('should handle single element array (target found) (recursive)', () => {
      expect(standardBinarySearchRecursive([5], 5)).toBe(0);
    });

    test('should handle single element array (target not found) (recursive)', () => {
      expect(standardBinarySearchRecursive([5], 1)).toBe(-1);
    });
  });

  // --- Problem 2: Find First and Last Occurrence ---
  describe('findFirstAndLastOccurrence', () => {
    test('should find first and last occurrence for a single target', () => {
      const nums = [1, 2, 3, 3, 3, 4, 5];
      expect(findFirstAndLastOccurrence(nums, 3)).toEqual([2, 4]);
    });

    test('should find first and last occurrence for target at beginning', () => {
      const nums = [1, 1, 2, 3, 4, 5];
      expect(findFirstAndLastOccurrence(nums, 1)).toEqual([0, 1]);
    });

    test('should find first and last occurrence for target at end', () => {
      const nums = [1, 2, 3, 4, 5, 5];
      expect(findFirstAndLastOccurrence(nums, 5)).toEqual([4, 5]);
    });

    test('should return [-1, -1] if target not found', () => {
      const nums = [1, 2, 3, 4, 5];
      expect(findFirstAndLastOccurrence(nums, 6)).toEqual([-1, -1]);
    });

    test('should handle target present once', () => {
      const nums = [1, 2, 3, 4, 5];
      expect(findFirstAndLastOccurrence(nums, 3)).toEqual([2, 2]);
    });

    test('should handle empty array', () => {
      expect(findFirstAndLastOccurrence([], 5)).toEqual([-1, -1]);
    });

    test('should handle single element array (target found)', () => {
      expect(findFirstAndLastOccurrence([5], 5)).toEqual([0, 0]);
    });

    test('should handle single element array (target not found)', () => {
      expect(findFirstAndLastOccurrence([5], 1)).toEqual([-1, -1]);
    });

    test('should handle all elements being the target', () => {
      const nums = [7, 7, 7, 7, 7];
      expect(findFirstAndLastOccurrence(nums, 7)).toEqual([0, 4]);
    });
  });

  // --- Problem 3: Search in Rotated Sorted Array ---
  describe('searchInRotatedSortedArray', () => {
    test('should find target in typical rotated array (target in right half of original)', () => {
      const nums = [4, 5, 6, 7, 0, 1, 2];
      expect(searchInRotatedSortedArray(nums, 0)).toBe(4);
    });

    test('should find target in typical rotated array (target in left half of original)', () => {
      const nums = [4, 5, 6, 7, 0, 1, 2];
      expect(searchInRotatedSortedArray(nums, 6)).toBe(2);
    });

    test('should return -1 if target not found', () => {
      const nums = [4, 5, 6, 7, 0, 1, 2];
      expect(searchInRotatedSortedArray(nums, 3)).toBe(-1);
    });

    test('should handle array not rotated', () => {
      const nums = [0, 1, 2, 4, 5, 6, 7];
      expect(searchInRotatedSortedArray(nums, 4)).toBe(3);
    });

    test('should handle empty array', () => {
      expect(searchInRotatedSortedArray([], 5)).toBe(-1);
    });

    test('should handle single element array (target found)', () => {
      expect(searchInRotatedSortedArray([5], 5)).toBe(0);
    });

    test('should handle single element array (target not found)', () => {
      expect(searchInRotatedSortedArray([5], 1)).toBe(-1);
    });

    test('should handle array with two elements (target first)', () => {
      expect(searchInRotatedSortedArray([3, 1], 3)).toBe(0);
    });

    test('should handle array with two elements (target second)', () => {
      expect(searchInRotatedSortedArray([3, 1], 1)).toBe(1);
    });

    test('should handle array with two elements (target not found)', () => {
      expect(searchInRotatedSortedArray([3, 1], 2)).toBe(-1);
    });

    test('should handle array with duplicate values (though problem statement typically implies distinct, robust solution should handle)', () => {
        // LeetCode's "Search in Rotated Sorted Array II" handles duplicates, this one usually doesn't need to.
        // For distinct values problem, [1,1,1,1,1] with a pivot is still [1,1,1,1,1]
        // If values are not distinct, simple BS does not always work in O(logN).
        // For distinct values, test with a small rotated array.
        expect(searchInRotatedSortedArray([1, 0, 1, 1, 1], 0)).toBe(1); // Not distinct, but if it passes, it's fine.
        expect(searchInRotatedSortedArray([1, 1, 1, 0, 1], 0)).toBe(3);
    });
  });

  // --- Problem 4: Find Peak Element ---
  describe('findPeakElement', () => {
    test('should find a peak in a simple ascending-descending array', () => {
      const nums = [1, 2, 3, 1];
      expect(findPeakElement(nums)).toBe(2); // 3 is the peak
    });

    test('should find a peak in an array with multiple peaks (returns any)', () => {
      const nums = [1, 2, 1, 3, 5, 6, 4];
      const result = findPeakElement(nums);
      expect([1, 5]).toContain(result); // 2 at index 1 or 6 at index 5
    });

    test('should find a peak in a strictly ascending array (last element)', () => {
      const nums = [1, 2, 3, 4, 5];
      expect(findPeakElement(nums)).toBe(4); // 5 is the peak (nums[n] = -Infinity)
    });

    test('should find a peak in a strictly descending array (first element)', () => {
      const nums = [5, 4, 3, 2, 1];
      expect(findPeakElement(nums)).toBe(0); // 5 is the peak (nums[-1] = -Infinity)
    });

    test('should handle a two-element array (ascending)', () => {
      const nums = [1, 2];
      expect(findPeakElement(nums)).toBe(1);
    });

    test('should handle a two-element array (descending)', () => {
      const nums = [2, 1];
      expect(findPeakElement(nums)).toBe(0);
    });

    test('should handle three elements, middle peak', () => {
      const nums = [1, 3, 2];
      expect(findPeakElement(nums)).toBe(1);
    });

    test('should handle three elements, first peak', () => {
      const nums = [3, 2, 1];
      expect(findPeakElement(nums)).toBe(0);
    });

    test('should handle three elements, last peak', () => {
      const nums = [1, 2, 3];
      expect(findPeakElement(nums)).toBe(2);
    });

    test('should handle a larger complex array', () => {
      const nums = [1, 3, 20, 4, 1, 0];
      expect(findPeakElement(nums)).toBe(2); // 20 at index 2
    });

    test('should handle an array with single peak at the start', () => {
      const nums = [10, 5, 2];
      expect(findPeakElement(nums)).toBe(0);
    });

    test('should handle an array with single peak at the end', () => {
      const nums = [2, 5, 10];
      expect(findPeakElement(nums)).toBe(2);
    });
  });

  // --- Problem 5: Koko Eating Bananas ---
  describe('minEatingSpeed', () => {
    test('should find minimum speed for a standard case', () => {
      const piles = [3, 6, 7, 11];
      const h = 8;
      expect(minEatingSpeed(piles, h)).toBe(4);
    });

    test('should find minimum speed for a case requiring high speed', () => {
      const piles = [30, 11, 23, 4, 20];
      const h = 5;
      expect(minEatingSpeed(piles, h)).toBe(30);
    });

    test('should find minimum speed for a case requiring low speed', () => {
      const piles = [30, 11, 23, 4, 20];
      const h = 6; // With speed 23: 2 + 1 + 1 + 1 + 1 = 6 hours
      expect(minEatingSpeed(piles, h)).toBe(23);
    });

    test('should handle single pile, speed = pile', () => {
      const piles = [100];
      const h = 1;
      expect(minEatingSpeed(piles, h)).toBe(100);
    });

    test('should handle single pile, speed = ceil(pile/h)', () => {
      const piles = [100];
      const h = 5;
      expect(minEatingSpeed(piles, h)).toBe(20);
    });

    test('should handle case where h is exactly piles.length (speed must be max pile)', () => {
      const piles = [1, 2, 3, 4, 5];
      const h = 5; // Each pile in 1 hour
      expect(minEatingSpeed(piles, h)).toBe(5);
    });

    test('should handle large values', () => {
      const piles = [1000000000];
      const h = 2;
      expect(minEatingSpeed(piles, h)).toBe(500000000);
    });

    test('should handle all piles being small, many hours', () => {
      const piles = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 10 piles
      const h = 100;
      expect(minEatingSpeed(piles, h)).toBe(1);
    });

    test('should handle minimum possible speed 1', () => {
      const piles = [1, 2, 3];
      const h = 6; // 1+2+3=6 hours if k=1
      expect(minEatingSpeed(piles, h)).toBe(1);
    });

    test('should handle empty piles array', () => {
      const piles = [];
      const h = 10;
      expect(minEatingSpeed(piles, h)).toBe(0); // Assuming 0 is a reasonable return for no bananas
    });
  });
});
```