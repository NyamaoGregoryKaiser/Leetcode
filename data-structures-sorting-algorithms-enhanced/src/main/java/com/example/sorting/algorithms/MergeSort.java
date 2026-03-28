```java
package com.example.sorting.algorithms;

/**
 * Implements the Merge Sort algorithm.
 * Merge Sort is a divide-and-conquer algorithm. It divides the input array into two halves,
 * calls itself for the two halves, and then merges the two sorted halves.
 *
 * <p>The `merge` function is the key part of the algorithm. It takes two sorted subarrays
 * and merges them into a single sorted array.
 *
 * <p>Merge Sort is a stable sort and guarantees O(N log N) time complexity in all cases.
 */
public class MergeSort extends AbstractSorter {

    /**
     * Sorts an array of integers using the Merge Sort algorithm.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n log n) - Division and merging both take logarithmic and linear time respectively.</li>
     *   <li>Average Case: O(n log n)</li>
     *   <li>Best Case: O(n log n)</li>
     * </ul>
     *
     * <p>Space Complexity: O(n) - Requires an auxiliary array of size 'n' for merging operations.
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
        mergeSortRecursive(arr, new int[n], 0, n - 1);
    }

    /**
     * The recursive helper function for Merge Sort.
     *
     * @param arr    The array to be sorted.
     * @param temp   An auxiliary array used for merging. Passed to avoid repeated allocations.
     * @param left   The starting index of the subarray.
     * @param right  The ending index of the subarray.
     */
    private void mergeSortRecursive(int[] arr, int[] temp, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSortRecursive(arr, temp, left, mid);
            mergeSortRecursive(arr, temp, mid + 1, right);

            // Merge the sorted halves
            merge(arr, temp, left, mid, right);
        }
    }

    /**
     * Merges two sorted subarrays of arr[].
     * First subarray is arr[left..mid].
     * Second subarray is arr[mid+1..right].
     *
     * @param arr    The original array.
     * @param temp   The auxiliary array for merging.
     * @param left   Starting index of the first subarray.
     * @param mid    Ending index of the first subarray.
     * @param right  Ending index of the second subarray.
     */
    private void merge(int[] arr, int[] temp, int left, int mid, int right) {
        // Copy data to temp arrays
        for (int i = left; i <= right; i++) {
            temp[i] = arr[i];
        }

        int i = left;      // Initial index of first subarray (in temp)
        int j = mid + 1;   // Initial index of second subarray (in temp)
        int k = left;      // Initial index of merged subarray (in arr)

        // Merge the two arrays back into the original array (arr)
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) { // Use <= for stability
                arr[k] = temp[i];
                i++;
            } else {
                arr[k] = temp[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements of the first half, if any
        while (i <= mid) {
            arr[k] = temp[i];
            k++;
            i++;
        }

        // Copy remaining elements of the second half, if any
        // (This loop is technically not needed if the second half is not fully copied
        // because its elements are already in their correct sorted position relative to each other
        // in the temp array, and would only be copied if the first half exhausted first.
        // However, it's good practice to include it for completeness or if `temp` were smaller.)
        // But for `temp` being `arr`'s size, if `j` finished, `temp[j..right]` is already in `arr[k..]`
        // This is only true if `arr` is used as destination, not source for remaining elements.
        // For correctness with `temp` as source, we *must* copy remaining elements.
        // In the current implementation, `temp` is a full copy. So if `j` finished, it means
        // `temp[mid+1..right]` are elements that were already in their position relative to the portion
        // of `arr` we are filling.
        // Let's ensure the loop is correct for copying from `temp`.
        while (j <= right) {
            arr[k] = temp[j];
            k++;
            j++;
        }
    }
}
```