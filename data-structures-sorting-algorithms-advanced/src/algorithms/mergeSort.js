```javascript
/**
 * @fileoverview Implementation of the Merge Sort algorithm.
 */

/**
 * Merges two sorted subarrays into a single sorted array.
 * This is a helper function for mergeSort.
 *
 * @param {Array<number>} left The left sorted subarray.
 * @param {Array<number>} right The right sorted subarray.
 * @returns {Array<number>} A new array containing all elements from left and right, sorted.
 */
function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from left and right arrays and push the smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate any remaining elements (one of the arrays might still have elements)
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/**
 * Sorts an array of numbers using the Merge Sort algorithm.
 *
 * Merge Sort is a divide-and-conquer algorithm. It works by:
 * 1. Dividing the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
 * 2. Repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.
 *
 * Characteristics:
 * - Stable: Yes.
 * - Not in-place: No, requires O(N) auxiliary space for merging.
 * - Not adaptive: Performance is consistent regardless of initial order.
 * - Excellent for external sorting due to sequential access pattern.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} A new array representing the sorted version of the input array.
 *                         The original array is NOT modified.
 *
 * Time Complexity:
 *   - Worst-case: O(N log N)
 *   - Average-case: O(N log N)
 *   - Best-case: O(N log N)
 *
 * Space Complexity:
 *   - O(N) (due to the auxiliary space used for merging subarrays)
 *
 * Example:
 *   mergeSort([5, 1, 4, 2, 8]) // returns [1, 2, 4, 5, 8]
 *   mergeSort([])             // returns []
 *   mergeSort([1])            // returns [1]
 */
function mergeSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const n = arr.length;

  // Base case: an array with 0 or 1 element is already sorted.
  if (n <= 1) {
    return arr;
  }

  // Find the middle point to divide the array into two halves
  const middle = Math.floor(n / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Recursively sort the two halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

module.exports = mergeSort;
```