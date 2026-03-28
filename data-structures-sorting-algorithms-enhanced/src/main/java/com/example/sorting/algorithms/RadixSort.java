```java
package com.example.sorting.algorithms;

import java.util.Arrays;

/**
 * Implements the Radix Sort algorithm.
 * Radix sort is a non-comparison integer sorting algorithm that sorts data
 * with integer keys by grouping keys by the individual digits which share
 * the same significant position and value (place value).
 *
 * <p>It distributes elements into buckets according to their radix (e.g., decimal digits).
 * This process is repeated for each digit position, from the least significant digit (LSD)
 * to the most significant digit (MSD) or vice-versa.
 *
 * <p>This implementation uses LSD (Least Significant Digit) Radix Sort with Counting Sort
 * as the stable sorting subroutine for each digit.
 * It's particularly efficient when numbers have a similar number of digits and the range of values is large.
 */
public class RadixSort extends AbstractSorter {

    /**
     * Sorts an array of non-negative integers using the Radix Sort algorithm.
     * This implementation requires all elements to be non-negative.
     * Negative numbers would require a more complex approach (e.g., separating positive and negative,
     * or using a 2's complement approach).
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(d * (n + k)), where n is the number of elements, d is the number of digits
     *       in the maximum number, and k is the base (radix) of the number system (e.g., 10 for decimal).</li>
     *   <li>Average Case: O(d * (n + k))</li>
     *   <li>Best Case: O(d * (n + k))</li>
     * </ul>
     *
     * <p>Space Complexity: O(n + k) - Requires an auxiliary output array of size n and a count array of size k.
     *
     * <p>Stability: Stable - It preserves the relative order of equal elements because it uses
     * a stable sorting algorithm (Counting Sort) as its subroutine for each digit.
     *
     * @param arr The array of non-negative integers to be sorted.
     * @throws IllegalArgumentException if the input array is null or contains negative numbers.
     */
    @Override
    public void sort(int[] arr) {
        validateArray(arr);
        int n = arr.length;
        if (n <= 1) {
            return;
        }

        // Find the maximum number to know number of digits
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] < 0) {
                throw new IllegalArgumentException("Radix Sort as implemented here does not support negative numbers.");
            }
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        // Do counting sort for every digit. Note that instead of passing digit number,
        // exp is passed. exp is 10^i where i is current digit number
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countSortByDigit(arr, n, exp);
        }
    }

    /**
     * A utility function to do counting sort of arr[] according to the digit
     * represented by exp.
     *
     * @param arr The array to be sorted.
     * @param n   The size of the array.
     * @param exp The exponent (10^i) to determine the current digit place.
     */
    private void countSortByDigit(int[] arr, int n, int exp) {
        int[] output = new int[n]; // output array
        int[] count = new int[10]; // for digits 0-9

        Arrays.fill(count, 0); // Initialize count array with 0s

        // Store count of occurrences in count[]
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        // Change count[i] so that count[i] now contains actual
        // position of this digit in output[]
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array. To make it stable, traverse input array from right to left.
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers
        // according to current digit
        System.arraycopy(output, 0, arr, 0, n);
    }
}
```