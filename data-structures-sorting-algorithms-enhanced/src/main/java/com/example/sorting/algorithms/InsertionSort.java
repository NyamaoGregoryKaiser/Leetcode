```java
package com.example.sorting.algorithms;

/**
 * Implements the Insertion Sort algorithm.
 * Insertion sort is a simple sorting algorithm that builds the final sorted array (or list)
 * one item at a time. It is much less efficient on large lists than more advanced algorithms
 * such as quicksort, heapsort, or merge sort.
 *
 * <p>The algorithm iterates through the input elements and at each iteration removes one element
 * from the input data and inserts it into the correct position in the already sorted list.
 * The choice of which element to remove from the input data and where to place it in the
 * sorted list is done by comparing values.
 *
 * <p>It is efficient for small datasets or data that is already substantially sorted.
 */
public class InsertionSort extends AbstractSorter {

    /**
     * Sorts an array of integers using the Insertion Sort algorithm.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n^2) - Occurs when the array is sorted in reverse order, as each
     *       element needs to be shifted to the beginning.</li>
     *   <li>Average Case: O(n^2)</li>
     *   <li>Best Case: O(n) - Occurs when the array is already sorted, as only a single
     *       comparison is needed for each element.</li>
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

        // Start from the second element as the first element is trivially sorted
        for (int i = 1; i < n; i++) {
            int key = arr[i]; // The element to be inserted into the sorted part
            int j = i - 1;    // Index of the last element in the sorted part

            // Move elements of arr[0..i-1], that are greater than key,
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j]; // Shift element to the right
                j = j - 1;           // Move to the left to compare with next element
            }
            arr[j + 1] = key; // Place key at its correct position
        }
    }
}
```