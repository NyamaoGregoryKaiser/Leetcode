const { swap } = require('../utils/arrayUtils');

/**
 * src/algorithms/heapSort.js
 *
 * Implements the Heap Sort algorithm.
 *
 * Heap Sort is a comparison-based, in-place sorting algorithm that uses a binary heap
 * data structure. It can be thought of as an improved selection sort: it finds the
 * maximum (or minimum) element and places it at the end (or beginning) of the sorted portion.
 *
 * Mechanism:
 * 1. Build a Max-Heap from the input array. This arranges the array such that the largest
 *    element is at the root (index 0).
 * 2. Repeatedly extract the maximum element: Swap the root with the last element of the heap.
 *    Then, reduce the heap size by one and heapify the new root to restore the max-heap property.
 *    This process is repeated until the heap size is 1.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array.
 *
 * Time Complexity:
 *   - Worst Case: O(N log N)
 *   - Average Case: O(N log N)
 *   - Best Case: O(N log N)
 * Space Complexity: O(1) auxiliary space (in-place sort).
 * Stability: Not stable.
 */
function heapSort(arr) {
    const n = arr.length;

    // Handle edge cases: empty or single-element array
    if (n <= 1) {
        return arr;
    }

    // Step 1: Build a max-heap (rearrange array)
    // Start from the last non-leaf node and heapify upwards.
    // (n / 2) - 1 is the index of the last non-leaf node.
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements one by one from the heap
    // After building the heap, arr[0] is the largest element.
    // We swap it with the last element, reduce the heap size, and then heapify the root.
    for (let i = n - 1; i > 0; i--) {
        // Move current root (max element) to end
        swap(arr, 0, i);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0); // 'i' here represents the current size of the heap
    }

    return arr;
}

/**
 * Helper function to maintain the max-heap property.
 *
 * Given an array and an index 'i', this function assumes that the subtrees rooted at
 * leftChild(i) and rightChild(i) are already max-heaps. It then ensures that the
 * subtree rooted at 'i' is also a max-heap by moving element 'i' down to its correct position.
 *
 * @param {Array<number>} arr The array representing the heap.
 * @param {number} heapSize The current size of the heap (number of elements to consider).
 * @param {number} i The index of the root of the subtree to heapify.
 */
function heapify(arr, heapSize, i) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index

    // If left child is larger than root
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than current largest
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        swap(arr, i, largest);

        // Recursively heapify the affected sub-tree
        heapify(arr, heapSize, largest);
    }
}

module.exports = heapSort;