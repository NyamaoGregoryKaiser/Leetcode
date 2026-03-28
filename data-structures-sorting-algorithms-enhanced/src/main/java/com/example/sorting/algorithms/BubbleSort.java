```java
package com.example.sorting.algorithms;

/**
 * Implements the Bubble Sort algorithm.
 * Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order. The pass through the
 * list is repeated until no swaps are needed, which indicates that the list is sorted.
 *
 * <p>It gets its name because smaller elements "bubble" to the top (beginning) of the list
 * and larger elements "sink" to the bottom (end) of the list.
 *
 * <p>It is generally not used in practice due to its poor performance.
 */
public class BubbleSort extends AbstractSorter {

    /**
     * Sorts an array of integers using the Bubble Sort algorithm.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n^2) - Occurs when the array is sorted in reverse order.</li>
     *   <li>Average Case: O(n^2) - Many swaps and comparisons are needed.</li>
     *   <li>Best Case: O(n) - Occurs when the array is already sorted. This is achieved by
     *       an optimization to stop early if no swaps are made in a pass.</li>
     * </ul>
     *
     * <p>Space Complexity: O(1) - It's an in-place sorting algorithm, requiring only a constant
     * amount of extra memory for temporary variables.
     *
     * <p>Stability: Stable - It preserves the relative order of equal elements.
     *
     * @param arr The array of integers to be sorted.
     * @throws IllegalArgumentException if the input array is null.
     */
    @Override
    public void sort(int[] arr) {
        validateArray(arr);
        int n = arr.length;
        if (n <= 1) { // An array with 0 or 1 element is already sorted
            return;
        }

        boolean swapped;
        // Outer loop for passes through the array
        // Each pass places the largest unsorted element at its correct position
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            // Inner loop for comparisons and swaps
            // The last `i` elements are already in place, so we don't need to check them
            for (int j = 0; j < n - 1 - i; j++) {
                // If the current element is greater than the next element, swap them
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    swapped = true; // Mark that a swap occurred
                }
            }

            // Optimization: If no two elements were swapped by inner loop, then array is sorted
            if (!swapped) {
                break;
            }
        }
    }
}
```