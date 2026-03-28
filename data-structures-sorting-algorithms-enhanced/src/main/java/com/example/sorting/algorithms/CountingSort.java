```java
package com.example.sorting.algorithms;

import java.util.Arrays;

/**
 * Implements the Counting Sort algorithm.
 * Counting sort is a non-comparison based sorting algorithm. It is effective when:
 * 1. The input elements are integers.
 * 2. The range of input numbers (k) is not significantly larger than the number of elements (n).
 *
 * <p>It works by counting the number of occurrences of each distinct element in the input array.
 * Then, it uses these counts to determine the positions of each element in the sorted output array.
 */
public class CountingSort extends AbstractSorter {

    /**
     * Sorts an array of non-negative integers using the Counting Sort algorithm.
     * This implementation requires all elements to be non-negative.
     * If the array contains negative numbers, a different approach or
     * an offset adjustment is needed.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n + k), where n is the number of elements in the input array
     *       and k is the range of input values (max - min + 1).</li>
     *   <li>Average Case: O(n + k)</li>
     *   <li>Best Case: O(n + k)</li>
     * </ul>
     *
     * <p>Space Complexity: O(k) - Requires an auxiliary count array of size k.
     *
     * <p>Stability: Stable - It preserves the relative order of equal elements (if implemented carefully).
     * The current implementation (populating from right to left) ensures stability.
     *
     * @param arr The array of non-negative integers to be sorted.
     * @throws IllegalArgumentException if the input array is null or contains negative numbers.
     * @throws IllegalStateException if the range of numbers (k) is too large (e.g., exceeds Integer.MAX_VALUE for count array indexing).
     */
    @Override
    public void sort(int[] arr) {
        validateArray(arr);
        int n = arr.length;
        if (n <= 1) {
            return;
        }

        // 1. Find the maximum element in the input array
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] < 0) {
                throw new IllegalArgumentException("Counting Sort as implemented here does not support negative numbers.");
            }
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        // The size of the count array is max + 1 (to include 0)
        // Check for potential overflow or excessively large range
        if (max >= Integer.MAX_VALUE -1) { // -1 to avoid max + 1 overflow
            throw new IllegalStateException("Range of numbers (max + 1) is too large for counting sort (max: " + max + ").");
        }
        int range = max + 1;
        int[] count = new int[range];
        int[] output = new int[n];

        // 2. Store count of each character
        for (int i = 0; i < n; i++) {
            count[arr[i]]++;
        }

        // 3. Modify count[i] such that count[i] contains the actual position of this character in output array
        // (Cumulative sum)
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        // 4. Build the output array
        // Iterate from the end of the original array to ensure stability
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i]; // Place element at its sorted position
            count[arr[i]]--;                   // Decrement count for next occurrence of same element
        }

        // 5. Copy the output array to arr, so that arr now contains sorted characters
        System.arraycopy(output, 0, arr, 0, n);
    }
}
```