```java
package com.example.sorting.algorithms;

import java.util.concurrent.ThreadLocalRandom;

/**
 * Implements the Quick Sort algorithm.
 * Quick Sort is a highly efficient, comparison-based, in-place sorting algorithm.
 * It's another divide-and-conquer algorithm.
 *
 * <p>It works by selecting a 'pivot' element from the array and partitioning the other
 * elements into two sub-arrays, according to whether they are less than or greater than the pivot.
 * The sub-arrays are then sorted recursively. This can be done in-place, requiring small
 * additional amounts of memory.
 *
 * <p>Choosing a good pivot is crucial for performance. A common strategy is to pick a random pivot
 * to mitigate worst-case scenarios for specific input distributions.
 */
public class QuickSort extends AbstractSorter {

    /**
     * Sorts an array of integers using the Quick Sort algorithm.
     * Uses a random pivot selection strategy to ensure average-case performance.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n^2) - Occurs when the pivot selection consistently results in highly
     *       unbalanced partitions (e.g., already sorted array with first/last element as pivot).
     *       Random pivot helps prevent this.</li>
     *   <li>Average Case: O(n log n) - The most common and expected performance.</li>
     *   <li>Best Case: O(n log n) - When partitions are always balanced (pivot is median).</li>
     * </ul>
     *
     * <p>Space Complexity: O(log n) on average due to recursive call stack. In the worst case,
     * it can be O(n) if partitions are highly unbalanced.
     *
     * <p>Stability: Unstable - The relative order of equal elements is generally not preserved.
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
        quickSortRecursive(arr, 0, n - 1);
    }

    /**
     * The recursive helper function for Quick Sort.
     *
     * @param arr    The array to be sorted.
     * @param low    The starting index of the subarray.
     * @param high   The ending index of the subarray.
     */
    private void quickSortRecursive(int[] arr, int low, int high) {
        if (low < high) {
            // pi is partitioning index, arr[pi] is now at right place
            int pi = partition(arr, low, high);

            // Recursively sort elements before partition and after partition
            quickSortRecursive(arr, low, pi - 1);
            quickSortRecursive(arr, pi + 1, high);
        }
    }

    /**
     * This function takes last element as pivot, places the pivot element at its correct position
     * in sorted array, and places all smaller (smaller than pivot) to left of pivot
     * and all greater elements to right of pivot.
     *
     * @param arr    The array to be partitioned.
     * @param low    The starting index of the subarray.
     * @param high   The ending index of the subarray.
     * @return The partitioning index.
     */
    private int partition(int[] arr, int low, int high) {
        // Choose a random pivot and move it to the end
        // This helps to avoid worst-case O(n^2) performance on already sorted or reverse-sorted arrays.
        int randomIndex = ThreadLocalRandom.current().nextInt(low, high + 1);
        swap(arr, randomIndex, high);

        int pivot = arr[high];
        int i = (low - 1); // Index of smaller element

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) { // Use <= for stability if elements are equal to pivot
                i++;
                // Swap arr[i] and arr[j]
                swap(arr, i, j);
            }
        }

        // Swap arr[i+1] and arr[high] (or pivot)
        swap(arr, i + 1, high);

        return i + 1; // Return the partitioning index
    }
}
```