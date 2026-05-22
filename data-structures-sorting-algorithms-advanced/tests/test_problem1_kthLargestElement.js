```javascript
/**
 * @fileoverview Unit tests for Problem 1: Kth Largest Element.
 */

const { expect } = require('chai');
const {
  findKthLargest_sort,
  findKthLargest_minHeap,
  findKthLargest_quickSelect,
} = require('../src/problems/problem1_kthLargestElement');

const testCases = [
  { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5, description: 'Basic test case' },
  { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4, description: 'With duplicates' },
  { nums: [1], k: 1, expected: 1, description: 'Single element array' },
  { nums: [7, 6, 5, 4, 3, 2, 1], k: 5, expected: 3, description: 'Reverse sorted array' },
  { nums: [1, 2, 3, 4, 5, 6, 7], k: 1, expected: 7, description: 'Largest element (k=1)' },
  { nums: [1, 2, 3, 4, 5, 6, 7], k: 7, expected: 1, description: 'Smallest element (k=N)' },
  { nums: [-1, -5, -2, -3, -4], k: 2, expected: -2, description: 'Negative numbers' },
  { nums: [2, 2, 2, 2, 2], k: 3, expected: 2, description: 'All duplicate numbers' },
  { nums: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], k: 3, expected: 8, description: 'k=3 in reverse sorted' },
  { nums: [1, 5, 3, 2, 4], k: 3, expected: 3, description: 'k=3 in mixed order' },
];

const edgeCases = [
  { nums: [], k: 1, error: 'Invalid input', description: 'Empty array' },
  { nums: [1, 2, 3], k: 0, error: 'Invalid input', description: 'k less than 1' },
  { nums: [1, 2, 3], k: 4, error: 'Invalid input', description: 'k greater than array length' },
  { nums: null, k: 1, error: 'Invalid input', description: 'Null input array' },
  { nums: [1, 2, 3], k: 'a', error: 'Invalid input', description: 'Invalid k type' }, // Though JS won't throw specifically for type within function, it'll fail k > nums.length
];

describe('Kth Largest Element in an Array', () => {

  const approaches = {
    'Sorting Approach (findKthLargest_sort)': findKthLargest_sort,
    'Min-Heap Approach (findKthLargest_minHeap)': findKthLargest_minHeap,
    'QuickSelect Approach (findKthLargest_quickSelect)': findKthLargest_quickSelect,
  };

  Object.keys(approaches).forEach(approachName => {
    const findKthLargest = approaches[approachName];

    describe(approachName, () => {
      testCases.forEach(({ nums, k, expected, description }) => {
        it(`should return ${expected} for nums=${JSON.stringify(nums)}, k=${k} (${description})`, () => {
          expect(findKthLargest(nums, k)).to.equal(expected);
        });
      });

      edgeCases.forEach(({ nums, k, error, description }) => {
        it(`should throw an error for ${description}`, () => {
          // Wrap the function call in an anonymous function to catch errors
          // Note: Error message might vary slightly based on implementation.
          expect(() => findKthLargest(nums, k)).to.throw(error);
        });
      });

      // Additional test for large arrays to check robustness
      it('should correctly find kth largest in a large random array', () => {
        const size = 10000;
        const randomArr = Array.from({ length: size }, (_, i) => Math.floor(Math.random() * 20000) - 10000);
        const k = Math.floor(size / 2); // Find the median-ish element

        // Native sort for verification
        const sortedRandomArr = [...randomArr].sort((a, b) => a - b);
        const expected = sortedRandomArr[size - k];

        expect(findKthLargest(randomArr, k)).to.equal(expected);
      });
    });
  });
});
```