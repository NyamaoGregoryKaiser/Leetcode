```java
package com.example.binarysearch.utility;

import java.util.Arrays;
import java.util.Random;

/**
 * Utility class for array-related operations, helpful for testing and debugging.
 */
public class ArrayUtility {

    /**
     * Prints an integer array to the console.
     *
     * @param arr The array to print.
     * @param prefix An optional prefix string to print before the array.
     */
    public static void printArray(int[] arr, String prefix) {
        System.out.println(prefix + ": " + (arr == null ? "null" : Arrays.toString(arr)));
    }

    /**
     * Generates a sorted integer array of a specified size.
     *
     * @param size The size of the array.
     * @param maxValue The maximum value for elements in the array.
     * @param allowDuplicates If true, duplicates may appear.
     * @return A sorted integer array.
     */
    public static int[] generateSortedArray(int size, int maxValue, boolean allowDuplicates) {
        if (size <= 0) {
            return new int[0];
        }
        Random rand = new Random();
        int[] arr = new int[size];
        arr[0] = rand.nextInt(maxValue / size); // Ensure initial value is small enough

        for (int i = 1; i < size; i++) {
            int minPossible = arr[i - 1] + (allowDuplicates ? 0 : 1);
            if (minPossible > maxValue) { // Prevent elements from exceeding maxValue if no space
                // If we hit maxValue limit, try to fill remaining with same value or give up
                arr[i] = arr[i-1];
            } else {
                arr[i] = minPossible + rand.nextInt(Math.max(1, (maxValue - minPossible) / (size - i + 1) + 1));
            }
            if (arr[i] > maxValue) arr[i] = maxValue; // Cap at max value
        }
        return arr;
    }

    /**
     * Generates a potentially rotated sorted integer array.
     *
     * @param size The size of the array.
     * @param maxValue The maximum value for elements in the array.
     * @param allowDuplicates If true, duplicates may appear (note: findMinInRotatedSortedArray assumes no duplicates).
     * @return A rotated sorted integer array.
     */
    public static int[] generateRotatedSortedArray(int size, int maxValue, boolean allowDuplicates) {
        int[] sortedArr = generateSortedArray(size, maxValue, allowDuplicates);
        if (size <= 1) {
            return sortedArr;
        }
        Random rand = new Random();
        int pivot = rand.nextInt(size); // Pivot point can be from 0 to size-1

        int[] rotatedArr = new int[size];
        for (int i = 0; i < size; i++) {
            rotatedArr[i] = sortedArr[(i + pivot) % size];
        }
        return rotatedArr;
    }
}
```