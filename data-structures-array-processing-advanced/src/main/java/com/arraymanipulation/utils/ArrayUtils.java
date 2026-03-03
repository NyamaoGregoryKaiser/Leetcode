```java
package com.arraymanipulation.utils;

import java.util.Arrays;
import java.util.Random;

/**
 * Utility class for array-related operations, such as printing,
 * copying, and generating random arrays.
 */
public class ArrayUtils {

    private static final Random random = new Random();

    /**
     * Prints an integer array to the console in a readable format.
     *
     * @param array The integer array to print.
     * @param prefix An optional prefix string to print before the array.
     */
    public static void printArray(int[] array, String prefix) {
        System.out.println(prefix + ": " + (array == null ? "null" : Arrays.toString(array)));
    }

    /**
     * Prints an integer array to the console with a default "Array" prefix.
     *
     * @param array The integer array to print.
     */
    public static void printArray(int[] array) {
        printArray(array, "Array");
    }

    /**
     * Creates a deep copy of an integer array.
     * This is useful for testing or when multiple operations need to be performed
     * on the original state of an array.
     *
     * @param original The array to copy.
     * @return A new array containing the same elements as the original,
     *         or null if the original array is null.
     */
    public static int[] deepCopy(int[] original) {
        if (original == null) {
            return null;
        }
        return Arrays.copyOf(original, original.length);
    }

    /**
     * Generates a random integer array.
     *
     * @param size The desired size of the array.
     * @param minVal The minimum possible value for elements (inclusive).
     * @param maxVal The maximum possible value for elements (exclusive).
     * @return A new integer array with random values.
     * @throws IllegalArgumentException if size is negative or maxVal is not greater than minVal.
     */
    public static int[] generateRandomArray(int size, int minVal, int maxVal) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        if (maxVal <= minVal) {
            throw new IllegalArgumentException("maxVal must be greater than minVal.");
        }

        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = random.nextInt(maxVal - minVal) + minVal;
        }
        return array;
    }

    /**
     * Checks if two integer arrays are equal in content and order.
     *
     * @param arr1 The first array.
     * @param arr2 The second array.
     * @return true if arrays are equal, false otherwise.
     */
    public static boolean areArraysEqual(int[] arr1, int[] arr2) {
        return Arrays.equals(arr1, arr2);
    }
}

```