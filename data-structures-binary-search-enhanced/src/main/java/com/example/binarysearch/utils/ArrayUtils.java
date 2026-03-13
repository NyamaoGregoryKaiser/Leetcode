package com.example.binarysearch.utils;

import java.util.Random;
import java.util.Arrays;

public class ArrayUtils {

    /**
     * Prints an array to the console.
     * @param arr The array to print.
     */
    public static void printArray(int[] arr) {
        System.out.println(Arrays.toString(arr));
    }

    /**
     * Generates a sorted array of a given size.
     * @param size The size of the array.
     * @param maxValue The maximum value for elements in the array.
     * @return A sorted array of integers.
     */
    public static int[] generateSortedArray(int size, int maxValue) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(maxValue) + 1; // Values from 1 to maxValue
        }
        Arrays.sort(arr);
        return arr;
    }

    /**
     * Generates a sorted array with a specified number of duplicates for a given target.
     * @param size The total size of the array.
     * @param maxValue The maximum value for other elements.
     * @param target The value to duplicate.
     * @param numDuplicates The number of times the target should appear.
     * @return A sorted array with duplicates.
     */
    public static int[] generateSortedArrayWithDuplicates(int size, int maxValue, int target, int numDuplicates) {
        if (numDuplicates > size) {
            throw new IllegalArgumentException("Number of duplicates cannot exceed array size.");
        }
        if (target < 0 || target > maxValue) {
            throw new IllegalArgumentException("Target value out of range [0, maxValue].");
        }

        int[] arr = new int[size];
        Random random = new Random();
        int targetCount = 0;

        // Fill with random numbers, avoiding the target initially if possible
        for (int i = 0; i < size; i++) {
            int val = random.nextInt(maxValue + 1);
            if (val == target && targetCount < numDuplicates) {
                arr[i] = target;
                targetCount++;
            } else if (val == target && targetCount >= numDuplicates) {
                // If we've already placed enough targets, choose a different number
                arr[i] = random.nextInt(maxValue); // Make sure it's not target (simple retry)
                if (arr[i] >= target) arr[i]++; // Ensure it's not target, or shift it
                if (arr[i] > maxValue) arr[i] = maxValue;
            } else {
                arr[i] = val;
            }
        }

        // Ensure numDuplicates of target are present
        while (targetCount < numDuplicates) {
            int randomIndex = random.nextInt(size);
            if (arr[randomIndex] != target) { // Replace a non-target element
                arr[randomIndex] = target;
                targetCount++;
            }
        }

        Arrays.sort(arr);
        return arr;
    }

    /**
     * Generates a rotated sorted array.
     * @param size The size of the array.
     * @param maxValue The maximum value for elements.
     * @return A rotated sorted array.
     */
    public static int[] generateRotatedSortedArray(int size, int maxValue) {
        int[] sortedArr = generateSortedArray(size, maxValue);
        if (size <= 1) {
            return sortedArr;
        }

        Random random = new Random();
        int rotationPoint = random.nextInt(size); // 0 to size-1, 0 means no rotation practically
        int[] rotatedArr = new int[size];

        for (int i = 0; i < size; i++) {
            rotatedArr[i] = sortedArr[(i + rotationPoint) % size];
        }
        return rotatedArr;
    }
}