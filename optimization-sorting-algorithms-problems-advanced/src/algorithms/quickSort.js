const { swap } = require('../utils/arrayUtils');

/**
 * src/algorithms/quickSort.js
 *
 * Implements the Quick Sort algorithm.
 *
 * Quick Sort is a highly efficient, comparison-based, divide-and-conquer sorting algorithm.
 * It works by picking an element as a "pivot" and partitioning the array around it,
 * such that elements smaller than the pivot are on its left, and elements greater
 * than the pivot are on its right. The sub-arrays are then recursively sorted.
 *
 * This implementation uses the Lomuto partition scheme where the last element is chosen as the pivot.
 * For production or very large datasets, a randomized pivot selection or median-of-three
 * is often preferred to mitigate worst-case scenarios.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array.
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (e.g., already sorted array with last element as pivot)
 *   - Average Case: O(N log N)
 *   - Best Case: O(N log N)
 * Space Complexity: O(log N) on average (due to recursion stack), O(N) in worst case (unbalanced partitions).
 * Stability: Not stable (generally).
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    // Base case: if the sub-array has 0 or 1 element, it's already sorted.
    if (low >= high) {
        return arr;
    }

    // Partition the array and get the pivot's final index
    const pivotIndex = partition(arr, low, high);

    // Recursively sort the sub-array before the pivot
    quickSort(arr, low, pivotIndex - 1);

    // Recursively sort the sub-array after the pivot
    quickSort(arr, pivotIndex + 1, high);

    return arr;
}

/**
 * Helper function for partitioning the array (Lomuto Partition Scheme).
 *
 * This scheme selects the last element as the pivot. It maintains an index `i`
 * such that elements from `low` to `i` are less than or equal to the pivot,
 * and elements from `i+1` to `j-1` are greater than the pivot.
 *
 * @param {Array<number>} arr The array to be partitioned.
 * @param {number} low The starting index of the sub-array.
 * @param {number} high The ending index of the sub-array (pivot element).
 * @returns {number} The final index of the pivot element after partitioning.
 */
function partition(arr, low, high) {
    const pivot = arr[high]; // Choose the last element as the pivot
    let i = low - 1; // Index of smaller element, indicates the right position of pivot found so far

    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++; // Increment index of smaller element
            swap(arr, i, j); // Swap current element with element at i
        }
    }

    // Put the pivot element in its correct sorted position
    swap(arr, i + 1, high);

    return i + 1; // Return the final index of the pivot
}

module.exports = quickSort;