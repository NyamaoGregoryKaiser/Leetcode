/**
 * src/algorithms/bubbleSort.js
 *
 * Implements the Bubble Sort algorithm.
 *
 * Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps
 * through the list, compares adjacent elements and swaps them if they are in the
 * wrong order. The pass through the list is repeated until no swaps are needed,
 * which indicates that the list is sorted.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array.
 *
 * Time Complexity:
 *   - Worst Case: O(N^2) (e.g., reverse sorted array)
 *   - Average Case: O(N^2)
 *   - Best Case: O(N) (if already sorted and optimized to stop early)
 * Space Complexity: O(1) auxiliary space (in-place sort).
 * Stability: Stable.
 */
function bubbleSort(arr) {
    const n = arr.length;
    let swapped; // Flag to check if any swaps occurred in a pass

    // Outer loop for passes. In each pass, the largest unsorted element
    // "bubbles" up to its correct position at the end of the unsorted portion.
    // We need at most n-1 passes.
    for (let i = 0; i < n - 1; i++) {
        swapped = false; // Reset flag for the current pass

        // Inner loop for comparisons and swaps.
        // The last 'i' elements are already in place, so we don't need to check them.
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in the wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true; // A swap occurred
            }
        }

        // Optimization: If no two elements were swapped by the inner loop,
        // then the array is already sorted, and we can break early.
        if (!swapped) {
            break;
        }
    }
    return arr;
}

module.exports = bubbleSort;