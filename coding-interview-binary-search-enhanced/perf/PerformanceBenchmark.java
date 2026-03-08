```java
package com.example.binarysearch;

import java.util.Arrays;
import java.util.Random;

/**
 * Simple manual performance benchmark comparing Binary Search algorithms
 * with their brute-force counterparts.
 * This class directly calls the methods and measures execution time using System.nanoTime().
 * For more robust benchmarking, consider using JMH (Java Microbenchmark Harness).
 */
public class PerformanceBenchmark {

    private static final int SMALL_ARRAY_SIZE = 100;
    private static final int MEDIUM_ARRAY_SIZE = 10_000;
    private static final int LARGE_ARRAY_SIZE = 1_000_000;
    private static final int MAX_VALUE = 1_000_000;
    private static final int ITERATIONS = 100; // Number of times to repeat search for averaging
    private static final Random random = new Random();

    public static void main(String[] args) {
        System.out.println("--- Binary Search Performance Benchmark ---");
        System.out.println("Iterations per test: " + ITERATIONS);
        System.out.println("Max element value: " + MAX_VALUE);
        System.out.println("-----------------------------------------");

        runBenchmarks("Small Array (" + SMALL_ARRAY_SIZE + ")", SMALL_ARRAY_SIZE);
        runBenchmarks("Medium Array (" + MEDIUM_ARRAY_SIZE + ")", MEDIUM_ARRAY_SIZE);
        runBenchmarks("Large Array (" + LARGE_ARRAY_SIZE + ")", LARGE_ARRAY_SIZE);
    }

    private static void runBenchmarks(String label, int size) {
        System.out.println("\n=== " + label + " ===");

        // Pre-generate arrays for consistent testing
        int[] sortedArr = Utils.generateSortedArray(size, MAX_VALUE);
        int[] rotatedArr = Utils.generateRotatedSortedArray(size, MAX_VALUE);
        int[] peakArr = Utils.generatePeakArray(size, MAX_VALUE);

        // Target values: middle, not found (worst case for linear), beginning, end
        int targetFound = sortedArr.length > 0 ? sortedArr[size / 2] : 0;
        int targetNotFound = MAX_VALUE + 1; // Guaranteed not in array

        // For first/last occurrence, generate array with duplicates
        int duplicateTarget = MAX_VALUE / 2;
        int[] sortedWithDuplicatesArr = Utils.generateSortedArrayWithDuplicates(size, MAX_VALUE, size / 10, duplicateTarget);


        System.out.println("\n--- Problem 1: Standard Binary Search (findTarget) ---");
        measureFindTarget(sortedArr, targetFound);
        measureFindTarget(sortedArr, targetNotFound);

        System.out.println("\n--- Problem 2: Find First/Last Occurrence (findFirstAndLastOccurrence) ---");
        measureFindFirstLast(sortedWithDuplicatesArr, duplicateTarget);
        measureFindFirstLast(sortedWithDuplicatesArr, targetNotFound);

        System.out.println("\n--- Problem 3: Search in Rotated Sorted Array (searchInRotatedSortedArray) ---");
        measureSearchRotated(rotatedArr, targetFound); // Target likely exists, depends on rotation
        measureSearchRotated(rotatedArr, targetNotFound);

        System.out.println("\n--- Problem 4: Find Peak Element (findPeakElement) ---");
        measureFindPeak(peakArr);

        System.out.println("\n--- Problem 5: Sqrt(x) ---");
        measureMySqrt(MAX_VALUE); // Use MAX_VALUE as input for sqrt to test large numbers
        measureMySqrt(100000);
    }

    private static void measureFindTarget(int[] nums, int target) {
        BinarySearchAlgorithms bsAlg = new BinarySearchAlgorithms();
        BinarySearchBruteForce bsBrute = new BinarySearchBruteForce();

        long startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsAlg.findTarget(nums, target);
        }
        long bsTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsBrute.findTarget(nums, target);
        }
        long bruteTime = System.nanoTime() - startTime;

        System.out.printf("Target: %d (Found: %b) - Binary Search: %d ns, Brute Force: %d ns. Ratio (BF/BS): %.2f%n",
                target, bsAlg.findTarget(nums, target) != -1, bsTime / ITERATIONS, bruteTime / ITERATIONS,
                (double) bruteTime / bsTime);
    }

    private static void measureFindFirstLast(int[] nums, int target) {
        BinarySearchAlgorithms bsAlg = new BinarySearchAlgorithms();
        BinarySearchBruteForce bsBrute = new BinarySearchBruteForce();

        long startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsAlg.findFirstAndLastOccurrence(nums, target);
        }
        long bsTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsBrute.findFirstAndLastOccurrence(nums, target);
        }
        long bruteTime = System.nanoTime() - startTime;

        System.out.printf("Target: %d (Found: %s) - Binary Search: %d ns, Brute Force: %d ns. Ratio (BF/BS): %.2f%n",
                target, Arrays.toString(bsAlg.findFirstAndLastOccurrence(nums, target)), bsTime / ITERATIONS, bruteTime / ITERATIONS,
                (double) bruteTime / bsTime);
    }

    private static void measureSearchRotated(int[] nums, int target) {
        BinarySearchAlgorithms bsAlg = new BinarySearchAlgorithms();
        BinarySearchBruteForce bsBrute = new BinarySearchBruteForce();

        long startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsAlg.searchInRotatedSortedArray(nums, target);
        }
        long bsTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsBrute.searchInRotatedSortedArray(nums, target);
        }
        long bruteTime = System.nanoTime() - startTime;

        System.out.printf("Target: %d (Found: %b) - Binary Search: %d ns, Brute Force: %d ns. Ratio (BF/BS): %.2f%n",
                target, bsAlg.searchInRotatedSortedArray(nums, target) != -1, bsTime / ITERATIONS, bruteTime / ITERATIONS,
                (double) bruteTime / bsTime);
    }

    private static void measureFindPeak(int[] nums) {
        BinarySearchAlgorithms bsAlg = new BinarySearchAlgorithms();
        BinarySearchBruteForce bsBrute = new BinarySearchBruteForce();

        long startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsAlg.findPeakElement(nums);
        }
        long bsTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsBrute.findPeakElement(nums);
        }
        long bruteTime = System.nanoTime() - startTime;

        System.out.printf("Peak element: %d - Binary Search: %d ns, Brute Force: %d ns. Ratio (BF/BS): %.2f%n",
                nums.length > 0 ? nums[bsAlg.findPeakElement(nums)] : -1, bsTime / ITERATIONS, bruteTime / ITERATIONS,
                (double) bruteTime / bsTime);
    }

    private static void measureMySqrt(int x) {
        BinarySearchAlgorithms bsAlg = new BinarySearchAlgorithms();
        BinarySearchBruteForce bsBrute = new BinarySearchBruteForce();

        long startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsAlg.mySqrt(x);
        }
        long bsTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < ITERATIONS; i++) {
            bsBrute.mySqrt(x);
        }
        long bruteTime = System.nanoTime() - startTime;

        System.out.printf("Sqrt(%d): %d - Binary Search: %d ns, Brute Force: %d ns. Ratio (BF/BS): %.2f%n",
                x, bsAlg.mySqrt(x), bsTime / ITERATIONS, bruteTime / ITERATIONS,
                (double) bruteTime / bsTime);
    }
}
```