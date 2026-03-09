```javascript
/**
 * algorithms/basicSorts.js
 *
 * This file contains implementations of fundamental, comparison-based sorting algorithms.
 * These are often taught first and provide a good foundation for understanding sorting complexities.
 *
 * Each function includes:
 * - Detailed comments explaining the logic.
 * - Time and Space Complexity analysis.
 * - Consideration for an optional custom comparison function.
 * - Handling of edge cases (empty or single-element arrays).
 */

const { swap, getComparator } = require('../utils/sorterUtils');

/**
 * 1. Bubble Sort
 *
 * Description:
 *   Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list,
 *   compares adjacent elements, and swaps them if they are in the wrong order. The pass through
 *   the list is repeated until no swaps are needed, which indicates that the list is sorted.
 *   Elements "bubble up" to their correct position.
 *
 * Advantages:
 *   - Simple to understand and implement.
 *   - Stable (maintains relative order of equal elements).
 *   - In-place (requires minimal extra space).
 *
 * Disadvantages:
 *   - Very inefficient for large lists.
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (e.g., reverse sorted array)
 *   - Average Case: O(N^2)
 *   - Best Case: O(N) (if the array is already sorted, due to optimization)
 *
 * Space Complexity:
 *   - O(1) auxiliary space (in-place sort).
 *
 * @param {Array<any>} arr The array to be sorted.
 * @param {function(any, any): number} [compareFn] Optional comparison function (e.g., (a, b) => a - b for ascending).
 * @returns {Array<any>} The sorted array.
 */
function bubbleSort(arr, compareFn) {
    if (!arr || arr.length < 2) {
        return arr; // Already sorted or invalid input
    }

    const comparator = getComparator(compareFn);
    const n = arr.length;
    let swapped; // Flag to track if any swaps occurred in a pass

    // Outer loop for passes through the array
    for (let i = 0; i < n - 1; i++) {
        swapped = false; // Reset swapped flag for each pass
        // Inner loop for comparisons and swaps
        // The largest i elements are already in place at the end
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (comparator(arr[j], arr[j + 1]) > 0) {
                swap(arr, j, j + 1); // Swap if out of order
                swapped = true; // Mark that a swap occurred
            }
        }
        // If no two elements were swapped by inner loop, then array is sorted
        if (!swapped) {
            break; // Optimization for already sorted or nearly sorted arrays
        }
    }
    return arr;
}

/**
 * 2. Selection Sort
 *
 * Description:
 *   Selection Sort is an in-place comparison-based algorithm that divides the input list
 *   into two parts: a sorted sublist of items built up from left to right at the front
 *   (left side) of the list, and an unsorted sublist of items occupying the rest of the list.
 *   The algorithm proceeds by finding the smallest (or largest, depending on order) element
 *   in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving
 *   the sublist boundary one element to the right.
 *
 * Advantages:
 *   - Simple to understand and implement.
 *   - Performs well on small lists.
 *   - Minimizes the number of swaps (at most N-1 swaps).
 *
 * Disadvantages:
 *   - Inefficient for large lists.
 *   - Unstable (does not preserve the relative order of equal elements).
 *
 * Time Complexity:
 *   - Worst Case: O(N^2)
 *   - Average Case: O(N^2)
 *   - Best Case: O(N^2) (it always performs N passes, even if already sorted)
 *
 * Space Complexity:
 *   - O(1) auxiliary space (in-place sort).
 *
 * @param {Array<any>} arr The array to be sorted.
 * @param {function(any, any): number} [compareFn] Optional comparison function.
 * @returns {Array<any>} The sorted array.
 */
function selectionSort(arr, compareFn) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    const comparator = getComparator(compareFn);
    const n = arr.length;

    // One by one move boundary of unsorted sub-array
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (comparator(arr[j], arr[minIdx]) < 0) {
                minIdx = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted sub-array
        // Only swap if the minimum element is not already in its correct position
        if (minIdx !== i) {
            swap(arr, i, minIdx);
        }
    }
    return arr;
}

/**
 * 3. Insertion Sort
 *
 * Description:
 *   Insertion Sort builds the final sorted array (or list) one item at a time.
 *   It is much less efficient on large lists than more advanced algorithms like
 *   Quick Sort, Heap Sort, or Merge Sort. However, it has some advantages:
 *   - Simple implementation.
 *   - Efficient for small data sets.
 *   - More efficient than Selection Sort and Bubble Sort for nearly sorted arrays.
 *   - Stable.
 *   - In-place.
 *
 * How it works:
 *   It iterates through the input array and removes one element at each iteration,
 *   finds the place where it belongs within the already sorted part of the array,
 *   and inserts it there. It repeats until no input elements remain.
 *
 * Advantages:
 *   - Efficient for small data sets or nearly sorted data.
 *   - Stable.
 *   - In-place.
 *
 * Disadvantages:
 *   - Inefficient for large, randomly ordered lists.
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (e.g., reverse sorted array)
 *   - Average Case: O(N^2)
 *   - Best Case: O(N) (if the array is already sorted)
 *
 * Space Complexity:
 *   - O(1) auxiliary space (in-place sort).
 *
 * @param {Array<any>} arr The array to be sorted.
 * @param {function(any, any): number} [compareFn] Optional comparison function.
 * @returns {Array<any>} The sorted array.
 */
function insertionSort(arr, compareFn) {
    if (!arr || arr.length < 2) {
        return arr;
    }

    const comparator = getComparator(compareFn);
    const n = arr.length;

    // Start from the second element (index 1), as the first is considered sorted
    for (let i = 1; i < n; i++) {
        let currentVal = arr[i]; // The element to be inserted
        let j = i - 1; // Start comparing with the element before currentVal

        // Move elements of arr[0...i-1], that are greater than currentVal,
        // to one position ahead of their current position
        while (j >= 0 && comparator(arr[j], currentVal) > 0) {
            arr[j + 1] = arr[j]; // Shift element to the right
            j--;
        }
        arr[j + 1] = currentVal; // Place currentVal at its correct position
    }
    return arr;
}

module.exports = {
    bubbleSort,
    selectionSort,
    insertionSort
};
```