```javascript
/**
 * @fileoverview Implementation of the Bubble Sort algorithm.
 */

const { swap } = require('../utils/arrayUtils');

/**
 * Sorts an array of numbers using the Bubble Sort algorithm.
 *
 * Bubble Sort repeatedly steps through the list, compares adjacent elements
 * and swaps them if they are in the wrong order. The pass through the list
 * is repeated until no swaps are needed, which indicates that the list is sorted.
 *
 * Characteristics:
 * - Simple to understand and implement.
 * - Stable: Yes (maintains the relative order of equal elements).
 * - In-place: Yes (does not require extra memory beyond a few temporary variables).
 * - Adaptive: Yes (can be optimized to detect if array is already sorted and stop early).
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array. The original array is modified in-place.
 *
 * Time Complexity:
 *   - Worst-case: O(N^2) (e.g., reverse-sorted array)
 *   - Average-case: O(N^2)
 *   - Best-case: O(N) (if array is already sorted and optimization is used)
 *
 * Space Complexity:
 *   - O(1) (in-place)
 *
 * Example:
 *   bubbleSort([5, 1, 4, 2, 8]) // returns [1, 2, 4, 5, 8]
 *   bubbleSort([])             // returns []
 *   bubbleSort([1])            // returns [1]
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const n = arr.length;

  // An array with 0 or 1 element is already sorted.
  if (n <= 1) {
    return arr;
  }

  // Outer loop for passes through the array
  // After each pass, the largest unsorted element "bubbles up" to its correct position.
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // Flag to optimize: if no swaps occur in a pass, array is sorted.

    // Inner loop for comparisons and swaps
    // We only need to go up to n - 1 - i because the last `i` elements are already sorted.
    for (let j = 0; j < n - 1 - i; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if they are in the wrong order
        swap(arr, j, j + 1);
        swapped = true;
      }
    }

    // If no two elements were swapped by inner loop, then the array is sorted
    if (!swapped) {
      break;
    }
  }
  return arr;
}

module.exports = bubbleSort;
```