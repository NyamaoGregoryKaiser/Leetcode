```javascript
/**
 * @fileoverview Implementation of the Insertion Sort algorithm.
 */

const { swap } = require('../utils/arrayUtils'); // Although not strictly needed, good for consistency.

/**
 * Sorts an array of numbers using the Insertion Sort algorithm.
 *
 * Insertion Sort builds the final sorted array one item at a time. It iterates
 * through the input array and at each iteration, it removes one element from
 * the input data, finds the location it belongs within the sorted list, and
 * inserts it there. It repeats until no input elements remain.
 *
 * Characteristics:
 * - Simple to implement.
 * - Efficient for small data sets or partially sorted arrays.
 * - Stable: Yes.
 * - In-place: Yes.
 * - Adaptive: Yes (performs well on nearly sorted arrays).
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array. The original array is modified in-place.
 *
 * Time Complexity:
 *   - Worst-case: O(N^2) (e.g., reverse-sorted array)
 *   - Average-case: O(N^2)
 *   - Best-case: O(N) (if array is already sorted, only N comparisons needed)
 *
 * Space Complexity:
 *   - O(1) (in-place)
 *
 * Example:
 *   insertionSort([5, 1, 4, 2, 8]) // returns [1, 2, 4, 5, 8]
 *   insertionSort([])             // returns []
 *   insertionSort([1])            // returns [1]
 */
function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const n = arr.length;

  // An array with 0 or 1 element is already sorted.
  if (n <= 1) {
    return arr;
  }

  // Start from the second element (index 1), as the first element (index 0)
  // is considered already sorted in its own subarray of size 1.
  for (let i = 1; i < n; i++) {
    let currentElement = arr[i]; // The element to be inserted into the sorted subarray
    let j = i - 1; // Start comparing with the last element of the sorted subarray

    // Move elements of arr[0...i-1], that are greater than currentElement,
    // to one position ahead of their current position.
    while (j >= 0 && arr[j] > currentElement) {
      arr[j + 1] = arr[j]; // Shift element to the right
      j--;
    }

    // Place the currentElement at its correct position in the sorted subarray.
    arr[j + 1] = currentElement;
  }
  return arr;
}

module.exports = insertionSort;
```