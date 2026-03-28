```java
package com.example.sorting.algorithms;

import com.example.sorting.utils.ArrayGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Performance benchmark for various sorting algorithms.
 * Measures execution time for different array sizes and types.
 */
class PerformanceBenchmark {

    private static final int[] ARRAY_SIZES = {1000, 5000, 10000, 50000};
    private static final int MIN_VAL = 0;
    private static final int MAX_VAL = 100000;
    private static final int NUM_RUNS = 5; // Number of runs for averaging

    private final Map<String, AbstractSorter> sorters = new LinkedHashMap<>();

    // Static block to initialize sorters
    {
        sorters.put("BubbleSort", new BubbleSort());
        sorters.put("SelectionSort", new SelectionSort());
        sorters.put("InsertionSort", new InsertionSort());
        sorters.put("MergeSort", new MergeSort());
        sorters.put("QuickSort", new QuickSort());
        sorters.put("HeapSort", new HeapSort());
        sorters.put("CountingSort", new CountingSort()); // For non-negative only
        sorters.put("RadixSort", new RadixSort());       // For non-negative only
    }

    @Test
    @DisplayName("Benchmark Sorting Algorithms Performance")
    void benchmarkSortingAlgorithms() {
        System.out.println("--- Sorting Algorithms Performance Benchmark ---");
        System.out.printf("%-15s %-15s %-15s %-15s %-15s %-15s %n", "Algorithm", "Array Type", "Size", "Min Time (ms)", "Max Time (ms)", "Avg Time (ms)");
        System.out.println("---------------------------------------------------------------------------------------------------");

        for (int size : ARRAY_SIZES) {
            // Benchmark Random Array
            benchmarkArrayType("Random", size, () -> ArrayGenerator.generateRandomArray(size, MIN_VAL, MAX_VAL));

            // Benchmark Sorted Array
            benchmarkArrayType("Sorted", size, () -> ArrayGenerator.generateSortedArray(size));

            // Benchmark Reverse Sorted Array
            benchmarkArrayType("Reverse Sorted", size, () -> ArrayGenerator.generateReverseSortedArray(size));

            // Benchmark Array with Duplicates
            benchmarkArrayType("Duplicates", size, () -> ArrayGenerator.generateArrayWithDuplicates(size, 100)); // 100 distinct values
        }
        System.out.println("---------------------------------------------------------------------------------------------------");
    }

    private void benchmarkArrayType(String arrayType, int size, ArraySupplier arraySupplier) {
        for (Map.Entry<String, AbstractSorter> entry : sorters.entrySet()) {
            String algoName = entry.getKey();
            AbstractSorter sorter = entry.getValue();

            // Skip Counting/Radix Sort for negative numbers, if arraySupplier could generate negatives
            // In this benchmark, MIN_VAL is 0, so all generated arrays are non-negative.
            // If MIN_VAL was negative, we'd need a more complex check.
            if ((algoName.equals("CountingSort") || algoName.equals("RadixSort")) && (MIN_VAL < 0 || MAX_VAL < 0)) {
                // This branch won't be hit with current MIN_VAL/MAX_VAL, but kept for robustness
                // in case ArrayGenerator is modified to produce negatives in 'generateRandomArray'
                System.out.printf("%-15s %-15s %-15d %-45s%n", algoName, arrayType, size, "N/A (negative numbers not supported)");
                continue;
            }

            long totalTime = 0;
            long minTime = Long.MAX_VALUE;
            long maxTime = 0;

            for (int i = 0; i < NUM_RUNS; i++) {
                int[] arr = arraySupplier.get();
                // Create a copy for comparison with Arrays.sort, not strictly needed for benchmark but good for sanity
                // int[] original = Arrays.copyOf(arr, arr.length);

                long startTime = System.nanoTime();
                try {
                    sorter.sort(arr);
                } catch (IllegalArgumentException | IllegalStateException e) {
                    // Catch exceptions from CountingSort/RadixSort if they encounter unsupported inputs
                    System.out.printf("%-15s %-15s %-15d %-45s%n", algoName, arrayType, size, "ERROR: " + e.getMessage());
                    totalTime = -1; // Indicate error
                    break;
                }
                long endTime = System.nanoTime();
                long duration = TimeUnit.NANOSECONDS.toMillis(endTime - startTime);

                totalTime += duration;
                minTime = Math.min(minTime, duration);
                maxTime = Math.max(maxTime, duration);
            }

            if (totalTime != -1) {
                double avgTime = (double) totalTime / NUM_RUNS;
                System.out.printf("%-15s %-15s %-15d %-15d %-15d %-15.2f%n",
                        algoName, arrayType, size, minTime, maxTime, avgTime);
            }
        }
    }

    /**
     * Functional interface to supply an array.
     */
    @FunctionalInterface
    interface ArraySupplier {
        int[] get();
    }
}
```