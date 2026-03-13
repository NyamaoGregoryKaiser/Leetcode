package com.example.binarysearch;

import com.example.binarysearch.utils.ArrayUtils;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * JMH Performance Benchmark for Binary Search problems.
 * This class benchmarks the performance of the implemented Binary Search algorithms
 * against naive linear search for comparison where applicable.
 *
 * To run:
 * 1. Compile the project: `mvn clean install`
 * 2. Navigate to `benchmarks` directory, then `mvn clean install`
 * 3. From project root: `java -jar benchmarks/target/benchmarks.jar`
 */
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 10, time = 1, timeUnit = TimeUnit.SECONDS)
@Fork(1)
@State(Scope.Benchmark)
public class PerformanceBenchmark {

    private BinarySearchProblems solver;
    private int[] sortedArrSmall;
    private int[] sortedArrMedium;
    private int[] sortedArrLarge;
    private int[] rotatedArrMedium;

    private int targetInSorted;
    private int targetNotInSorted;
    private int targetInRotated;

    @Param({"1000", "10000", "1000000"}) // Array sizes
    public int ARRAY_SIZE;

    @Setup(Level.Trial)
    public void setUp() {
        solver = new BinarySearchProblems();
        Random random = new Random();

        // Standard sorted array for search and first/last occurrence
        sortedArrLarge = ArrayUtils.generateSortedArray(ARRAY_SIZE, Integer.MAX_VALUE / 2);
        targetInSorted = sortedArrLarge[random.nextInt(ARRAY_SIZE)];
        targetNotInSorted = sortedArrLarge[ARRAY_SIZE - 1] + 1; // Guaranteed not in array

        // For rotated array, ensure it's large enough to demonstrate BS
        rotatedArrMedium = ArrayUtils.generateRotatedSortedArray(ARRAY_SIZE, Integer.MAX_VALUE / 2);
        targetInRotated = rotatedArrMedium[random.nextInt(ARRAY_SIZE)];

        // Initialize smaller arrays for methods not depending on ARRAY_SIZE
        sortedArrSmall = ArrayUtils.generateSortedArray(1000, 1000);
        sortedArrMedium = ArrayUtils.generateSortedArray(10000, 10000);
    }

    // --- Benchmarks for Standard Binary Search ---

    @Benchmark
    public void benchSearch_BinarySearch(Blackhole bh) {
        bh.consume(solver.search(sortedArrLarge, targetInSorted));
    }

    @Benchmark
    public void benchSearch_LinearSearch(Blackhole bh) {
        // Naive linear search for comparison
        int result = -1;
        for (int i = 0; i < sortedArrLarge.length; i++) {
            if (sortedArrLarge[i] == targetInSorted) {
                result = i;
                break;
            }
        }
        bh.consume(result);
    }

    // --- Benchmarks for Find First Occurrence ---

    @Benchmark
    public void benchFindFirstOccurrence_BinarySearch(Blackhole bh) {
        // Use an array with duplicates for this benchmark
        int targetWithDuplicates = 500;
        int[] arrWithDuplicates = ArrayUtils.generateSortedArrayWithDuplicates(ARRAY_SIZE, 1000, targetWithDuplicates, ARRAY_SIZE / 10);
        bh.consume(solver.findFirstOccurrence(arrWithDuplicates, targetWithDuplicates));
    }

    // --- Benchmarks for Search in Rotated Sorted Array ---

    @Benchmark
    public void benchSearchInRotatedSortedArray_BinarySearch(Blackhole bh) {
        bh.consume(solver.searchInRotatedSortedArray(rotatedArrMedium, targetInRotated));
    }

    // --- Benchmarks for Find Peak Element ---
    // Note: Comparing Find Peak Element with a linear scan is less meaningful
    // because a linear scan would also take O(N) to find *any* peak, but it would
    // be a trivial loop comparing `nums[i]` with `nums[i+1]`.
    // The problem explicitly asks for O(log N).

    @Benchmark
    public void benchFindPeakElement_BinarySearch(Blackhole bh) {
        // For FindPeakElement, create a specific array pattern to ensure a peak is found.
        // A simple up-then-down slope is good.
        int[] peakArray = new int[ARRAY_SIZE];
        for (int i = 0; i < ARRAY_SIZE / 2; i++) {
            peakArray[i] = i;
        }
        for (int i = ARRAY_SIZE / 2; i < ARRAY_SIZE; i++) {
            peakArray[i] = ARRAY_SIZE - 1 - (i - ARRAY_SIZE / 2);
        }
        bh.consume(solver.findPeakElement(peakArray));
    }

    // --- Benchmarks for Sqrt(x) ---

    @Benchmark
    public void benchMySqrt_BinarySearch(Blackhole bh) {
        bh.consume(solver.mySqrt(Integer.MAX_VALUE));
    }

    @Benchmark
    public void benchMySqrt_LinearSearch(Blackhole bh) {
        // Naive linear search for integer square root
        int x = Integer.MAX_VALUE;
        if (x < 0) throw new IllegalArgumentException();
        if (x == 0 || x == 1) bh.consume(x);

        int result = 0;
        for (int i = 1; i <= x / 2 + 1; i++) { // Optimization: sqrt(x) <= x/2 + 1 for x > 1
            if ((long) i * i > x) { // Use long to prevent overflow
                result = i - 1;
                break;
            }
            if ((long) i * i == x) {
                result = i;
                break;
            }
        }
        bh.consume(result);
    }

    @Benchmark
    public void benchMySqrt_MathSqrt(Blackhole bh) {
        // Built-in Math.sqrt for comparison (double precision)
        bh.consume((int) Math.sqrt(Integer.MAX_VALUE));
    }
}