```java
package com.example.sorting.benchmarks;

import com.example.sorting.problems.Problem1_SortAnArray;
import com.example.sorting.problems.Problem2_MergeSortedArrays;
import com.example.sorting.problems.Problem3_KthLargestElement;
import com.example.sorting.problems.Problem4_SortColors;
import com.example.sorting.utils.ArrayUtils;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

/**
 * Performance benchmarks for sorting algorithms and related problems.
 * Uses JMH (Java Microbenchmark Harness) to measure the execution time
 * of different sorting implementations and problem solutions.
 *
 * To run:
 * 1. Build the project with `mvn clean install`.
 * 2. Navigate to the target directory.
 * 3. Run `java -jar benchmarks.jar` (replace `benchmarks.jar` with the actual shaded JAR name if different).
 *    You can specify which benchmarks to run, e.g., `java -jar benchmarks.jar SortBenchmark.measureMergeSort`
 */
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Fork(1)
@State(Scope.Benchmark)
public class SortBenchmark {

    @Param({"100", "1000", "10000", "100000"})
    public int N; // Size of the array for sorting

    private int[] randomArray;
    private int[] sortedArray;
    private int[] reverseSortedArray;
    private int[] arrayWithDuplicates;
    private int[] colorsArray; // For Sort Colors problem
    private int[] nums1Merge, nums2Merge; // For Merge Sorted Arrays problem
    private int mMerge, nMerge;
    private int kthLargestK; // For Kth Largest Element problem

    private Problem1_SortAnArray problem1;
    private Problem2_MergeSortedArrays problem2;
    private Problem3_KthLargestElement problem3;
    private Problem4_SortColors problem4;


    @Setup(Level.Iteration)
    public void setup() {
        problem1 = new Problem1_SortAnArray();
        problem2 = new Problem2_MergeSortedArrays();
        problem3 = new Problem3_KthLargestElement();
        problem4 = new Problem4_SortColors();

        // For general sorting algorithms (Problem 1) and Kth Largest (Problem 3)
        randomArray = ArrayUtils.generateRandomArray(N, 0, N * 10);
        sortedArray = ArrayUtils.copyArray(randomArray);
        Arrays.sort(sortedArray);
        reverseSortedArray = ArrayUtils.copyArray(sortedArray);
        for (int i = 0; i < N / 2; i++) {
            ArrayUtils.swap(reverseSortedArray, i, N - 1 - i);
        }
        arrayWithDuplicates = ArrayUtils.generateArrayWithDuplicates(N, N / 10);
        kthLargestK = N / 2; // Find median-like element for Kth largest

        // For Merge Sorted Arrays (Problem 2)
        mMerge = N / 2;
        nMerge = N - mMerge;
        nums1Merge = new int[N];
        nums2Merge = ArrayUtils.generateRandomArray(nMerge, 0, N * 5);
        Arrays.sort(nums2Merge);
        int[] tempNums1 = ArrayUtils.generateRandomArray(mMerge, 0, N * 5);
        Arrays.sort(tempNums1);
        System.arraycopy(tempNums1, 0, nums1Merge, 0, mMerge); // Fill the 'm' part of nums1Merge

        // For Sort Colors (Problem 4)
        colorsArray = new int[N];
        for (int i = 0; i < N; i++) {
            colorsArray[i] = (int) (Math.random() * 3); // 0, 1, or 2
        }
    }

    // --- Benchmarks for Problem 1: Sort an Array ---

    @Benchmark
    public void measureMergeSort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        problem1.mergeSort(arr);
        bh.consume(arr);
    }

    @Benchmark
    public void measureQuickSort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        problem1.quickSort(arr);
        bh.consume(arr);
    }

    @Benchmark
    public void measureHeapSort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        problem1.heapSort(arr);
        bh.consume(arr);
    }

    @Benchmark
    public void measureArraysSort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        Arrays.sort(arr);
        bh.consume(arr);
    }

    // --- Benchmarks for Problem 2: Merge Sorted Arrays ---

    @Benchmark
    public void measureMergeSortedArrays_Optimal(Blackhole bh) {
        int[] n1 = ArrayUtils.copyArray(nums1Merge);
        int[] n2 = ArrayUtils.copyArray(nums2Merge);
        problem2.mergeOptimal(n1, mMerge, n2, nMerge);
        bh.consume(n1);
    }

    @Benchmark
    public void measureMergeSortedArrays_BruteForce(Blackhole bh) {
        int[] n1 = ArrayUtils.copyArray(nums1Merge);
        int[] n2 = ArrayUtils.copyArray(nums2Merge);
        problem2.mergeBruteForce(n1, mMerge, n2, nMerge);
        bh.consume(n1);
    }

    // --- Benchmarks for Problem 3: Kth Largest Element ---

    @Benchmark
    public void measureKthLargest_QuickSelect(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        int result = problem3.findKthLargestQuickSelect(arr, kthLargestK);
        bh.consume(result);
    }

    @Benchmark
    public void measureKthLargest_MinHeap(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        int result = problem3.findKthLargestMinHeap(arr, kthLargestK);
        bh.consume(result);
    }

    @Benchmark
    public void measureKthLargest_Sort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(randomArray);
        int result = problem3.findKthLargestSort(arr, kthLargestK);
        bh.consume(result);
    }

    // --- Benchmarks for Problem 4: Sort Colors ---

    @Benchmark
    public void measureSortColors_DutchNationalFlag(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(colorsArray);
        problem4.sortColorsDutchNationalFlag(arr);
        bh.consume(arr);
    }

    @Benchmark
    public void measureSortColors_CountingSort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(colorsArray);
        problem4.sortColorsCountingSort(arr);
        bh.consume(arr);
    }

    @Benchmark
    public void measureSortColors_BuiltInSort(Blackhole bh) {
        int[] arr = ArrayUtils.copyArray(colorsArray);
        problem4.sortColorsBuiltInSort(arr);
        bh.consume(arr);
    }
}
```