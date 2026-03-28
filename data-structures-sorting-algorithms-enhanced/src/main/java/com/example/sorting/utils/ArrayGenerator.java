```java
package com.example.sorting.utils;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Utility class for generating various types of integer arrays for testing and benchmarking sorting algorithms.
 */
public class ArrayGenerator {

    private static final Random RANDOM = ThreadLocalRandom.current();

    /**
     * Generates an array of a specified size with random integer values.
     *
     * @param size The size of the array to generate.
     * @param min  The minimum possible value for elements.
     * @param max  The maximum possible value for elements.
     * @return A new integer array with random values.
     * @throws IllegalArgumentException if size is negative or max is less than min.
     */
    public static int[] generateRandomArray(int size, int min, int max) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        if (min > max) {
            throw new IllegalArgumentException("Min value cannot be greater than max value.");
        }

        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = RANDOM.nextInt(max - min + 1) + min;
        }
        return arr;
    }

    /**
     * Generates a sorted array of a specified size with distinct values.
     *
     * @param size The size of the array.
     * @return A new sorted integer array.
     * @throws IllegalArgumentException if size is negative.
     */
    public static int[] generateSortedArray(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = i; // Simple ascending sequence
        }
        return arr;
    }

    /**
     * Generates a reverse sorted array of a specified size with distinct values.
     *
     * @param size The size of the array.
     * @return A new reverse sorted integer array.
     * @throws IllegalArgumentException if size is negative.
     */
    public static int[] generateReverseSortedArray(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = size - 1 - i; // Simple descending sequence
        }
        return arr;
    }

    /**
     * Generates an array with many duplicate values.
     *
     * @param size The size of the array.
     * @param numDistinct The number of distinct values to use.
     * @return An array with many duplicates.
     * @throws IllegalArgumentException if size is negative or numDistinct is non-positive.
     */
    public static int[] generateArrayWithDuplicates(int size, int numDistinct) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        if (numDistinct <= 0) {
            throw new IllegalArgumentException("Number of distinct elements must be positive.");
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = RANDOM.nextInt(numDistinct); // Values will be between 0 and numDistinct-1
        }
        return arr;
    }

    /**
     * Generates an array of a specified size with elements all having the same value.
     *
     * @param size The size of the array.
     * @param value The value to fill the array with.
     * @return A new array with all elements equal to 'value'.
     * @throws IllegalArgumentException if size is negative.
     */
    public static int[] generateConstantArray(int size, int value) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = value;
        }
        return arr;
    }
}
```