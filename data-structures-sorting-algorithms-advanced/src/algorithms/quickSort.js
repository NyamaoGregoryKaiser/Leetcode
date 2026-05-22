```javascript
/**
 * @fileoverview Implementation of the Quick Sort algorithm using Lomuto partition scheme.
 */

const { swap } = require('../utils/arrayUtils');

/**
 * Partitions the array around a pivot element using Lomuto partition scheme.
 * Elements smaller than or equal to the pivot are moved to its left,
 * and elements greater than the pivot are moved to its right.
 * The pivot element ends up in its final sorted position.
 *
 * @param {Array<number>} arr The array to partition.
 * @param {number} low The starting index of the subarray to partition.
 * @param {number} high The ending index of the subarray to partition.
 * @returns {number} The final index of the pivot element.
 */
function partition(arr, low, high) {
  // Choose the last element as the pivot.
  // Other pivot strategies exist: first element, middle element, random element.
  const pivot = arr[high];
  let i = low - 1; // Index of smaller element

  for (let j = low; j < high; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++; // Increment index of smaller element
      swap(arr, i, j);
    }
  }

  // Place the pivot element at its correct position
  swap(arr, i + 1, high);
  return i + 1; // Return the pivot's final index
}

/**
 * Recursive helper function for Quick Sort.
 *
 * @param {Array<number>} arr The array to be sorted.
 * @param {number} low The starting index of the subarray to sort.
 * @param {number} high The ending index of the subarray to sort.
 * @returns {void} The array is modified in-place.
 */
function _quickSort(arr, low, high) {
  if (low < high) {
    // pi is partitioning index, arr[pi] is now at right place
    const pi = partition(arr, low, high);

    // Recursively sort elements before partition and after partition
    _quickSort(arr, low, pi - 1);
    _quickSort(arr, pi + 1, high);
  }
}

/**
 * Sorts an array of numbers using the Quick Sort algorithm.
 *
 * Quick Sort is a divide-and-conquer algorithm. It works by:
 * 1. Picking an element as a pivot.
 * 2. Partitioning the array around the pivot: all elements smaller than the pivot
 *    come before it, and all elements larger come after it. The pivot is now
 *    in its final sorted position.
 * 3. Recursively applying the above steps to the subarrays formed by the partition.
 *
 * Characteristics:
 * - Highly efficient in practice, often faster than Merge Sort and Heap Sort.
 * - Unstable: Yes (does not preserve the relative order of equal elements).
 * - In-place: Yes (most implementations are, especially with Lomuto or Hoare partition).
 * - Not adaptive: Performance doesn't significantly improve on already sorted data (can even degrade).
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array. The original array is modified in-place.
 *
 * Time Complexity:
 *   - Worst-case: O(N^2) (occurs when the pivot selection consistently leads to
 *                     unbalanced partitions, e.g., already sorted array with
 *                     last element as pivot).
 *   - Average-case: O(N log N)
 *   - Best-case: O(N log N)
 *
 * Space Complexity:
 *   - O(log N) on average (due to recursion stack for balanced partitions).
 *   - O(N) in worst-case (for highly unbalanced partitions).
 *
 * Example:
 *   let arr = [5, 1, 4, 2, 8];
 *   quickSort(arr); // arr becomes [1, 2, 4, 5, 8]
 *   quickSort([]);   // returns []
 *   quickSort([1]);  // returns [1]
 */
function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const n = arr.length;

  // An array with 0 or 1 element is already sorted.
  if (n <= 1) {
    return arr;
  }

  // Call the recursive helper function
  _quickSort(arr, 0, n - 1);
  return arr;
}

module.exports = quickSort;
```