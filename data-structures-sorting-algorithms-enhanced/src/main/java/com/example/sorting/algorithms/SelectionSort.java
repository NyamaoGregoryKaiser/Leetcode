```java
package com.example.sorting.algorithms;

/**
 * Implements the Selection Sort algorithm.
 * Selection sort is a simple comparison-based sorting algorithm that divides the input list
 * into two parts: a sorted sublist of items built up from left to right at the front
 * (left) of the list and an unsorted sublist of items occupying the remainder of the list.
 *
 * <p>The algorithm proceeds by finding the smallest (or largest) element in the unsorted sublist,
 * exchanging it with the leftmost unsorted element (putting it in sorted order), and moving
 * the sublist boundaries one element to the right.
 *
 * <p>It is generally not used in practice due to its poor performance compared to more advanced algorithms.
 */
public class SelectionSort extends AbstractSorter {

    /**
     * Sorts an array of integers using the Selection Sort algorithm.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n^2) - The number of comparisons and swaps remains the same regardless
     *       of the initial order of elements.</li>
     *   <li>Average Case: O(n^2)</li>
     *   <li>Best Case: O(n^2)</li>
     * </ul>
     *
     * <p>Space Complexity: O(1) - It's an in-place sorting algorithm, requiring only a constant
     * amount of extra memory for temporary variables.
     *
     * <p>Stability: Unstable - The relative order of equal elements is not preserved.
     *   Example: [5a, 5b, 1]. In the first pass, 1 is found to be the smallest.
     *   If 1 is swapped with 5a, then 5b comes before 5a.
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

        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }

            // Swap the found minimum element with the first element of the unsorted part
            // Only swap if the minimum element is not already in its correct position
            if (minIdx != i) {
                swap(arr, i, minIdx);
            }
        }
    }
}
```