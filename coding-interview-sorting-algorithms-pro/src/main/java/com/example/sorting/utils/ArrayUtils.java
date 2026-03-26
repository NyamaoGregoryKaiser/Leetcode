```java
package com.example.sorting.utils;

import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Utility class for array operations, helpful for testing and debugging sorting algorithms.
 */
public class ArrayUtils {

    /**
     * Prints an integer array to the console.
     *
     * @param arr The array to print.
     */
    public static void printArray(int[] arr) {
        System.out.println(Arrays.toString(arr));
    }

    /**
     * Swaps two elements in an array.
     *
     * @param arr The array.
     * @param i   Index of the first element.
     * @param j   Index of the second element.
     */
    public static void swap(int[] arr, int i, int j) {
        if (i == j) { // Optimization: no need to swap if indices are the same
            return;
        }
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /**
     * Checks if an array is sorted in ascending order.
     *
     * @param arr The array to check.
     * @return true if the array is sorted, false otherwise.
     */
    public static boolean isSorted(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return true; // Empty or single-element arrays are considered sorted
        }
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Generates a random integer array of a specified size.
     * Elements are within a default range of [0, 1000).
     *
     * @param size The desired size of the array.
     * @return A randomly generated integer array.
     */
    public static int[] generateRandomArray(int size) {
        return generateRandomArray(size, 0, 1000);
    }

    /**
     * Generates a random integer array of a specified size with elements within a given range.
     *
     * @param size The desired size of the array.
     * @param min  The minimum possible value for an element (inclusive).
     * @param max  The maximum possible value for an element (exclusive).
     * @return A randomly generated integer array.
     */
    public static int[] generateRandomArray(int size, int min, int max) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = ThreadLocalRandom.current().nextInt(min, max);
        }
        return arr;
    }

    /**
     * Creates a deep copy of an integer array.
     *
     * @param original The array to copy.
     * @return A new array containing the same elements as the original.
     */
    public static int[] copyArray(int[] original) {
        if (original == null) {
            return null;
        }
        return Arrays.copyOf(original, original.length);
    }

    /**
     * Generates an array that is mostly sorted but with a few elements out of place.
     *
     * @param size The desired size of the array.
     * @param numDisruptions The number of swaps to make to disrupt the sorted order.
     * @return A mostly sorted array.
     */
    public static int[] generateMostlySortedArray(int size, int numDisruptions) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = i;
        }

        ThreadLocalRandom random = ThreadLocalRandom.current();
        for (int i = 0; i < numDisruptions; i++) {
            int idx1 = random.nextInt(size);
            int idx2 = random.nextInt(size);
            swap(arr, idx1, idx2);
        }
        return arr;
    }

    /**
     * Generates an array with many duplicate elements.
     *
     * @param size The desired size of the array.
     * @param uniqueElements The number of unique elements to use (must be less than or equal to size).
     * @return An array with duplicate elements.
     */
    public static int[] generateArrayWithDuplicates(int size, int uniqueElements) {
        if (uniqueElements <= 0 || uniqueElements > size) {
            throw new IllegalArgumentException("uniqueElements must be positive and less than or equal to size.");
        }
        int[] arr = new int[size];
        ThreadLocalRandom random = ThreadLocalRandom.current();
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(uniqueElements); // Values will be 0 to uniqueElements-1
        }
        return arr;
    }
}
```