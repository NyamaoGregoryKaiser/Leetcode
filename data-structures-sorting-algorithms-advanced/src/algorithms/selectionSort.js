```javascript
/**
 * @fileoverview Implementation of the Selection Sort algorithm.
 */

const { swap } = require('../utils/arrayUtils');

/**
 * Sorts an array of numbers using the Selection Sort algorithm.
 *
 * Selection Sort works by repeatedly finding the minimum (or maximum) element
 * from the unsorted part of the array and putting it at the beginning (or end)
 * of the sorted part.
 *
 * Characteristics:
 * - Simple to understand and implement.
 * - Unstable: Yes (does not preserve the relative order of equal elements).
 *   Example: [5a, 5b, 1] -> [1, 5b, 5a]. 5b moves before 5a.
 * - In-place: Yes.
 * - Not adaptive: Performance is the same regardless of initial order.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array. The original array is modified in-place.
 *
 * Time Complexity:
 *   - Worst-case: O(N^2)
 *   - Average-case: O(N^2)
 *   - Best-case: O(N^2) (still performs N comparisons in inner loop)
 *
 * Space Complexity:
 *   - O(1) (in-place)
 *
 * Example:
 *   selectionSort([5, 1, 4, 2, 8]) // returns [1, 2, 4, 5, 8]
 *   selectionSort([])             // returns []
 *   selectionSort([1])            // returns [1]
 */
function selectionSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const n = arr.length;

  // An array with 0 or 1 element is already sorted.
  if (n <= 1) {
    return arr;
  }

  // One by one, move the boundary of the unsorted subarray.
  // The outer loop iterates from the first element up to the second to last.
  // The last element will automatically be in its correct place after n-1 passes.
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the unsorted portion of the array (from index i to n-1).
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // If the minimum element is not already at the current position 'i', swap them.
    // This places the found minimum element at the correct sorted position.
    if (minIdx !== i) {
      swap(arr, i, minIdx);
    }
  }
  return arr;
}

module.exports = selectionSort;
```