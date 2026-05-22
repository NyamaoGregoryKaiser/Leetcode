```javascript
/**
 * @fileoverview Implementation of the Heap Sort algorithm.
 */

const { swap } = require('../utils/arrayUtils');

/**
 * Helper function to heapify a subtree rooted with node 'i'.
 * This assumes that the subtrees at 'left' and 'right' are already heapified.
 *
 * @param {Array<number>} arr The array representing the heap.
 * @param {number} n The size of the heap (number of elements in the current array segment).
 * @param {number} i The index of the root node of the subtree to heapify.
 * @returns {void} The array is modified in-place.
 */
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    swap(arr, i, largest);
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

/**
 * Sorts an array of numbers using the Heap Sort algorithm.
 *
 * Heap Sort is a comparison-based sorting algorithm. It's conceptually similar to selection sort,
 * but instead of scanning the entire unsorted part of the array to find the maximum element,
 * it uses a heap data structure to efficiently find the maximum.
 *
 * The algorithm involves two main steps:
 * 1. Build a max-heap from the input data.
 * 2. One by one, extract the maximum element from the heap (which is at the root),
 *    and replace it with the last element of the heap, then reduce the heap size
 *    and heapify the root. Repeat until the heap is empty.
 *
 * Characteristics:
 * - Not stable: Yes (does not preserve the relative order of equal elements).
 * - In-place: Yes.
 * - Not adaptive: Performance is consistent regardless of initial order.
 * - Guaranteed O(N log N) worst-case performance.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array. The original array is modified in-place.
 *
 * Time Complexity:
 *   - Worst-case: O(N log N)
 *   - Average-case: O(N log N)
 *   - Best-case: O(N log N) (even on already sorted data)
 *
 * Space Complexity:
 *   - O(1) (in-place)
 *
 * Example:
 *   let arr = [5, 1, 4, 2, 8];
 *   heapSort(arr); // arr becomes [1, 2, 4, 5, 8]
 *   heapSort([]);   // returns []
 *   heapSort([1]);  // returns [1]
 */
function heapSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const n = arr.length;

  // An array with 0 or 1 element is already sorted.
  if (n <= 1) {
    return arr;
  }

  // Build a max-heap (rearrange array)
  // We start from the last non-leaf node and go up to the root.
  // The index of the last non-leaf node is floor(n/2) - 1.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // One by one extract elements from the heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    swap(arr, 0, i);

    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  return arr;
}

module.exports = heapSort;
```