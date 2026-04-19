```java
package com.example.binarysearch.benchmark;

import com.example.binarysearch.core.BinarySearchIterative;
import com.example.binarysearch.core.BinarySearchRecursive;
import com.example.binarysearch.problems.BinarySearchAdvancedProblems;
import com.example.binarysearch.problems.BruteForceSolutions;
import com.example.binarysearch.utility.ArrayUtility;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * JMH benchmarks for comparing different binary search implementations
 * and against brute-force linear search.
 */
@BenchmarkMode(Mode.AverageTime) // Measure average time per operation
@OutputTimeUnit(TimeUnit.MICROSECONDS) // Output in microseconds
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS) // 5 warmup iterations, 1 second each
@Measurement(iterations = 10, time = 1, timeUnit = TimeUnit.SECONDS) // 10 measurement iterations, 1 second each
@Fork(1) // Run in a single JVM fork
@State(Scope.Benchmark) // State shared by all benchmark threads
public class BinarySearchBenchmark {

    // --- Configuration ---
    private static final int SMALL_ARRAY_SIZE = 100;
    private static final int MEDIUM_ARRAY_SIZE = 10000;
    private static final int LARGE_ARRAY_SIZE = 1000000;
    private static final int MAX_VALUE = 2_000_000;

    private int[] smallSortedArray;
    private int[] mediumSortedArray;
    private int[] largeSortedArray;

    private int[] smallRotatedArray;
    private int[] mediumRotatedArray;
    private int[] largeRotatedArray;

    private int targetInSmall;
    private int targetNotInSmall;
    private int targetInLarge;
    private int targetNotInLarge;
    private int targetFirstOcc;
    private int targetLastOcc;
    private int peakTargetInLarge;
    private int sqrtTargetLarge;

    // --- Instances of search algorithms ---
    private final BinarySearchIterative iterativeBS = new BinarySearchIterative();
    private final BinarySearchRecursive recursiveBS = new BinarySearchRecursive();
    private final BinarySearchAdvancedProblems advancedBS = new BinarySearchAdvancedProblems();
    private final BruteForceSolutions bruteForce = new BruteForceSolutions();
    private final Random random = new Random();

    @Setup(Level.Trial) // Setup once for all benchmarks
    public void setup() {
        // Generate sorted arrays
        smallSortedArray = ArrayUtility.generateSortedArray(SMALL_ARRAY_SIZE, MAX_VALUE, false);
        mediumSortedArray = ArrayUtility.generateSortedArray(MEDIUM_ARRAY_SIZE, MAX_VALUE, false);
        largeSortedArray = ArrayUtility.generateSortedArray(LARGE_ARRAY_SIZE, MAX_VALUE, false);

        // Generate rotated arrays (findMin assumes no duplicates, so generate without)
        smallRotatedArray = ArrayUtility.generateRotatedSortedArray(SMALL_ARRAY_SIZE, MAX_VALUE, false);
        mediumRotatedArray = ArrayUtility.generateRotatedSortedArray(MEDIUM_ARRAY_SIZE, MAX_VALUE, false);
        largeRotatedArray = ArrayUtility.generateRotatedSortedArray(LARGE_ARRAY_SIZE, MAX_VALUE, false);

        // Select targets for search (ensure they are present or absent for consistent testing)
        targetInSmall = smallSortedArray[random.nextInt(SMALL_ARRAY_SIZE)];
        targetNotInSmall = MAX_VALUE + 1; // Guaranteed not in array

        targetInLarge = largeSortedArray[random.nextInt(LARGE_ARRAY_SIZE)];
        targetNotInLarge = MAX_VALUE + 1;

        // For first/last occurrence, generate array with duplicates
        int[] dupArray = new int[MEDIUM_ARRAY_SIZE];
        for (int i = 0; i < MEDIUM_ARRAY_SIZE / 2; i++) {
            dupArray[i] = i;
        }
        for (int i = MEDIUM_ARRAY_SIZE / 2; i < MEDIUM_ARRAY_SIZE; i++) {
            dupArray[i] = MEDIUM_ARRAY_SIZE / 2; // Many duplicates of this value
        }
        // Shuffle to distribute duplicates somewhat for better testing of first/last
        // But for binary search, it needs to be sorted for first/last. So let's create a specific one.
        for (int i = 0; i < MEDIUM_ARRAY_SIZE; i++) {
            dupArray[i] = i < MEDIUM_ARRAY_SIZE / 2 ? i : MEDIUM_ARRAY_SIZE / 2;
        }
        // Ensure sorted for the method. A better test array:
        int[] sortedDupArr = new int[MEDIUM_ARRAY_SIZE];
        int val = 0;
        for (int i = 0; i < MEDIUM_ARRAY_SIZE; i++) {
            if (i % 100 == 0 && val < MAX_VALUE) val++; // Increase value every 100 elements
            sortedDupArr[i] = val;
        }
        // Put a block of duplicates in the middle
        int duplicateVal = 5000;
        int duplicateStart = MEDIUM_ARRAY_SIZE / 4;
        int duplicateEnd = duplicateStart + MEDIUM_ARRAY_SIZE / 2;
        for (int i = duplicateStart; i < duplicateEnd; i++) {
            sortedDupArr[i] = duplicateVal;
        }
        mediumSortedArray = sortedDupArr; // Overwrite medium array for these specific tests
        targetFirstOcc = duplicateVal;
        targetLastOcc = duplicateVal;

        // For peak element
        peakTargetInLarge = largeSortedArray[largeSortedArray.length / 2];

        // For sqrt
        sqrtTargetLarge = 2147395600; // Value for which sqrt is 46340 (Integer.MAX_VALUE - some)
    }

    // --- Benchmarks for Standard Search ---

    @Benchmark
    public void measureIterativeSearch(Blackhole bh) {
        bh.consume(iterativeBS.search(largeSortedArray, targetInLarge));
        bh.consume(iterativeBS.search(largeSortedArray, targetNotInLarge));
    }

    @Benchmark
    public void measureRecursiveSearch(Blackhole bh) {
        bh.consume(recursiveBS.search(largeSortedArray, targetInLarge));
        bh.consume(recursiveBS.search(largeSortedArray, targetNotInLarge));
    }

    @Benchmark
    public void measureLinearSearch(Blackhole bh) {
        bh.consume(bruteForce.linearSearch(largeSortedArray, targetInLarge));
        bh.consume(bruteForce.linearSearch(largeSortedArray, targetNotInLarge));
    }

    // --- Benchmarks for First/Last Occurrence ---

    @Benchmark
    public void measureFindFirstOccurrenceBS(Blackhole bh) {
        bh.consume(advancedBS.findFirstOccurrence(mediumSortedArray, targetFirstOcc));
        bh.consume(advancedBS.findFirstOccurrence(mediumSortedArray, targetNotInSmall));
    }

    @Benchmark
    public void measureFindFirstOccurrenceBruteForce(Blackhole bh) {
        bh.consume(bruteForce.findFirstOccurrenceBruteForce(mediumSortedArray, targetFirstOcc));
        bh.consume(bruteForce.findFirstOccurrenceBruteForce(mediumSortedArray, targetNotInSmall));
    }

    @Benchmark
    public void measureFindLastOccurrenceBS(Blackhole bh) {
        bh.consume(advancedBS.findLastOccurrence(mediumSortedArray, targetLastOcc));
        bh.consume(advancedBS.findLastOccurrence(mediumSortedArray, targetNotInSmall));
    }

    @Benchmark
    public void measureFindLastOccurrenceBruteForce(Blackhole bh) {
        bh.consume(bruteForce.findLastOccurrenceBruteForce(mediumSortedArray, targetLastOcc));
        bh.consume(bruteForce.findLastOccurrenceBruteForce(mediumSortedArray, targetNotInSmall));
    }

    // --- Benchmarks for Search in Rotated Sorted Array ---

    @Benchmark
    public void measureSearchRotatedBS(Blackhole bh) {
        bh.consume(advancedBS.searchInRotatedSortedArray(largeRotatedArray, targetInLarge));
        bh.consume(advancedBS.searchInRotatedSortedArray(largeRotatedArray, targetNotInLarge));
    }

    @Benchmark
    public void measureSearchRotatedBruteForce(Blackhole bh) {
        bh.consume(bruteForce.searchInRotatedSortedArrayBruteForce(largeRotatedArray, targetInLarge));
        bh.consume(bruteForce.searchInRotatedSortedArrayBruteForce(largeRotatedArray, targetNotInLarge));
    }

    // --- Benchmarks for Find Minimum in Rotated Sorted Array ---

    @Benchmark
    public void measureFindMinRotatedBS(Blackhole bh) {
        bh.consume(advancedBS.findMinInRotatedSortedArray(largeRotatedArray));
    }

    @Benchmark
    public void measureFindMinRotatedBruteForce(Blackhole bh) {
        bh.consume(bruteForce.findMinInRotatedSortedArrayBruteForce(largeRotatedArray));
    }

    // --- Benchmarks for Square Root ---

    @Benchmark
    public void measureMySqrtBS(Blackhole bh) {
        bh.consume(advancedBS.mySqrt(sqrtTargetLarge));
        bh.consume(advancedBS.mySqrt(Integer.MAX_VALUE));
        bh.consume(advancedBS.mySqrt(1));
    }

    @Benchmark
    public void measureMySqrtBruteForce(Blackhole bh) {
        bh.consume(bruteForce.mySqrtBruteForce(sqrtTargetLarge));
        bh.consume(bruteForce.mySqrtBruteForce(Integer.MAX_VALUE));
        bh.consume(bruteForce.mySqrtBruteForce(1));
    }

    // --- Benchmarks for Find Peak Element ---

    @Benchmark
    public void measureFindPeakBS(Blackhole bh) {
        bh.consume(advancedBS.findPeakElement(largeSortedArray)); // Simulates a peak at the end
        bh.consume(advancedBS.findPeakElement(largeRotatedArray)); // Simulates a peak potentially in middle
    }

    @Benchmark
    public void measureFindPeakBruteForce(Blackhole bh) {
        bh.consume(bruteForce.findPeakElementBruteForce(largeSortedArray));
        bh.consume(bruteForce.findPeakElementBruteForce(largeRotatedArray));
    }
}
```