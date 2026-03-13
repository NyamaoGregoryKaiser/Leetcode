package com.binarysearch.utils;

import java.util.Arrays;
import java.util.Random;

/**
 * Utility class to generate various types of arrays for testing and benchmarking
 * Binary Search algorithms.
 */
public class ArrayGenerator {

    private static final Random RANDOM = new Random();

    /**
     * Generates a sorted array of a specified size.
     *
     * @param size The desired size of the array.
     * @return A sorted array with unique, increasing elements.
     */
    public static int[] generateSortedArray(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        int[] arr = new int[size];
        if (size == 0) return arr;

        arr[0] = RANDOM.nextInt(10); // Start with a small random number
        for (int i = 1; i < size; i++) {
            // Ensure elements are increasing, add a random offset
            arr[i] = arr[i - 1] + 1 + RANDOM.nextInt(5);
        }
        return arr;
    }

    /**
     * Generates a sorted array of a specified size with a certain percentage of duplicates.
     *
     * @param size             The desired size of the array.
     * @param duplicatePercent The percentage of elements that might be duplicates (0-100).
     * @return A sorted array with duplicates.
     */
    public static int[] generateSortedArrayWithDuplicates(int size, int duplicatePercent) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        if (duplicatePercent < 0 || duplicatePercent > 100) {
            throw new IllegalArgumentException("Duplicate percentage must be between 0 and 100.");
        }

        int[] arr = new int[size];
        if (size == 0) return arr;

        arr[0] = RANDOM.nextInt(10);
        for (int i = 1; i < size; i++) {
            if (RANDOM.nextInt(100) < duplicatePercent && i > 0) {
                arr[i] = arr[i - 1]; // Introduce a duplicate
            } else {
                arr[i] = arr[i - 1] + 1 + RANDOM.nextInt(3); // Increase value
            }
        }
        return arr;
    }

    /**
     * Generates a sorted array and then rotates it by a random pivot.
     *
     * @param size The desired size of the array.
     * @return A rotated sorted array with unique elements.
     */
    public static int[] generateRotatedSortedArray(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        if (size <= 1) { // An array of size 0 or 1 is not meaningfully rotated
            return generateSortedArray(size);
        }

        int[] sortedArr = generateSortedArray(size);
        // Ensure values are unique and sufficiently spaced for rotation clarity
        for(int i = 1; i < size; i++) {
            if (sortedArr[i] <= sortedArr[i-1]) {
                sortedArr[i] = sortedArr[i-1] + 1;
            }
        }

        int pivot = RANDOM.nextInt(size); // Pivot can be from 0 to size-1
        int[] rotatedArr = new int[size];

        for (int i = 0; i < size; i++) {
            rotatedArr[i] = sortedArr[(i + pivot) % size];
        }
        return rotatedArr;
    }

    /**
     * Generates an array that has a peak element (or is monotonic).
     * Assumes nums[i] != nums[i+1].
     *
     * @param size The desired size of the array.
     * @return An array with a guaranteed peak element.
     */
    public static int[] generatePeakArray(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Array size cannot be negative.");
        }
        if (size <= 1) {
            return new int[size];
        }

        int[] arr = new int[size];
        int peakIndex = RANDOM.nextInt(size); // Random index for the peak

        // Build left side (increasing up to peak)
        if (peakIndex > 0) {
            arr[0] = RANDOM.nextInt(10);
            for (int i = 1; i <= peakIndex; i++) {
                arr[i] = arr[i - 1] + 1 + RANDOM.nextInt(5);
            }
        } else { // Peak is at index 0
            arr[0] = RANDOM.nextInt(100) + 50; // A large value
        }


        // Build right side (decreasing from peak)
        for (int i = peakIndex + 1; i < size; i++) {
            // Ensure strictly decreasing and different from previous
            int nextVal = arr[i - 1] - 1 - RANDOM.nextInt(5);
            if (nextVal <= 0 && arr[i-1] > 0) nextVal = 0; // Avoid negative if starting high
            else if (arr[i-1] <= 0) nextVal = arr[i-1] -1; // If already negative, keep decreasing
            arr[i] = nextVal;

            // Ensure no duplicates directly adjacent (nums[i] != nums[i+1])
            if (i > 0 && arr[i] == arr[i-1]) {
                arr[i]--;
            }
        }
        
        // Final adjustment to ensure nums[i] != nums[i+1] for peak problems
        for(int i=0; i < size -1; i++) {
            if (arr[i] == arr[i+1]) {
                arr[i+1]++; // Make it strictly different
            }
        }

        return arr;
    }

    public static void main(String[] args) {
        System.out.println("--- Array Generator Examples ---");

        int[] sorted = generateSortedArray(10);
        System.out.println("Sorted Array (size 10): " + Arrays.toString(sorted));

        int[] sortedDup = generateSortedArrayWithDuplicates(15, 30);
        System.out.println("Sorted Array with Duplicates (size 15, 30% dup): " + Arrays.toString(sortedDup));

        int[] rotated = generateRotatedSortedArray(12);
        System.out.println("Rotated Sorted Array (size 12): " + Arrays.toString(rotated));

        int[] peakArr = generatePeakArray(10);
        System.out.println("Peak Array (size 10): " + Arrays.toString(peakArr));
        // Verify peak property for one element
        if (peakArr.length > 1) {
            int peakIdx = -1;
            for(int i=0; i<peakArr.length; i++) {
                boolean leftGreater = (i == 0) || (peakArr[i] > peakArr[i-1]);
                boolean rightGreater = (i == peakArr.length - 1) || (peakArr[i] > peakArr[i+1]);
                if (leftGreater && rightGreater) {
                    peakIdx = i;
                    break;
                }
            }
            System.out.println("  (Example peak at index: " + peakIdx + ")");
        }
    }
}