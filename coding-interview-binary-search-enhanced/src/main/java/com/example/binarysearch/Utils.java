```java
package com.example.binarysearch;

import java.util.Arrays;
import java.util.Random;

/**
 * Utility class for generating test data and helper methods.
 */
public class Utils {

    private static final Random random = new Random();

    /**
     * Generates a sorted array of a given size with random values.
     *
     * @param size   The size of the array.
     * @param maxVal The maximum value for elements in the array.
     * @return A new sorted array.
     */
    public static int[] generateSortedArray(int size, int maxVal) {
        if (size <= 0) {
            return new int[0];
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(maxVal);
        }
        Arrays.sort(arr);
        return arr;
    }

    /**
     * Generates a sorted array with duplicates for specific tests.
     *
     * @param size      The size of the array.
     * @param maxVal    The maximum value for elements.
     * @param numDuplicates The number of duplicates to introduce for a target value.
     * @param targetVal The value that will have duplicates.
     * @return A new sorted array with duplicates around the target.
     */
    public static int[] generateSortedArrayWithDuplicates(int size, int maxVal, int numDuplicates, int targetVal) {
        if (size <= 0) {
            return new int[0];
        }
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(maxVal);
        }
        Arrays.sort(arr);

        // Introduce duplicates of targetVal
        if (numDuplicates > 0) {
            int insertIndex = random.nextInt(size - numDuplicates + 1); // Ensure enough space
            for (int i = 0; i < numDuplicates; i++) {
                if (insertIndex + i < size) {
                    arr[insertIndex + i] = targetVal;
                }
            }
            Arrays.sort(arr); // Re-sort to maintain order after insertion
        }
        return arr;
    }


    /**
     * Generates a sorted array and then rotates it at a random pivot.
     *
     * @param size The size of the array.
     * @param maxVal The maximum value for elements in the array.
     * @return A new rotated sorted array.
     */
    public static int[] generateRotatedSortedArray(int size, int maxVal) {
        if (size <= 0) {
            return new int[0];
        }
        int[] arr = generateSortedArray(size, maxVal);
        if (size == 1) return arr;

        int rotationPoint = random.nextInt(size - 1) + 1; // Random point from 1 to size-1
        int[] rotatedArr = new int[size];

        System.arraycopy(arr, rotationPoint, rotatedArr, 0, size - rotationPoint);
        System.arraycopy(arr, 0, rotatedArr, size - rotationPoint, rotationPoint);

        return rotatedArr;
    }

    /**
     * Generates an array that likely contains a peak element for testing Problem 4.
     * It's not strictly necessary for tests to generate *only* arrays with peaks,
     * as problem constraints usually guarantee one.
     * This creates a strictly increasing then strictly decreasing sequence.
     *
     * @param size The size of the array.
     * @param maxVal The maximum value for elements.
     * @return An array with a guaranteed single peak.
     */
    public static int[] generatePeakArray(int size, int maxVal) {
        if (size < 3) { // A peak needs at least 3 elements to have two neighbors
            // For smaller sizes, generate simple increasing or decreasing
            int[] arr = new int[size];
            for(int i=0; i<size; i++) arr[i] = random.nextInt(maxVal);
            Arrays.sort(arr); // Ensure at least 0 or 1 is a peak for size 1, 2
            if(size == 2 && arr[0] > arr[1]) {
                int temp = arr[0]; arr[0] = arr[1]; arr[1] = temp;
            } // Ensure sorted if size 2
            return arr;
        }

        int[] arr = new int[size];
        int peakIndex = random.nextInt(size - 2) + 1; // Peak can't be at index 0 or size-1
        int currentValue = random.nextInt(maxVal / 2); // Start from a relatively small value

        // Ascending part
        for (int i = 0; i <= peakIndex; i++) {
            arr[i] = currentValue + random.nextInt(maxVal / (size * 2)) + 1; // Ensure increasing
            currentValue = arr[i];
        }

        // Descending part
        currentValue = arr[peakIndex];
        for (int i = peakIndex + 1; i < size; i++) {
            int decrease = random.nextInt(maxVal / (size * 2)) + 1; // Ensure decreasing
            if (currentValue - decrease <= 0 && i < size - 1) { // Avoid going too low too fast
                arr[i] = currentValue - 1; // Just decrease by 1
            } else {
                arr[i] = currentValue - decrease;
            }
            currentValue = arr[i];
        }
        return arr;
    }


    /**
     * Prints an array to the console for debugging.
     *
     * @param arr The array to print.
     * @param label A label to prefix the output.
     */
    public static void printArray(int[] arr, String label) {
        System.out.println(label + ": " + Arrays.toString(arr));
    }
}
```