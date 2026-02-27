```java
package com.codinginterview.heapoperations.benchmarks;

import com.codinginterview.heapoperations.problems.KthLargestElement;
import com.codinginterview.heapoperations.problems.MergeKSortedLists;
import com.codinginterview.heapoperations.problems.TopKFrequentElements;
import com.codinginterview.heapoperations.utils.ListNode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

/**
 * This class provides simple performance benchmarks for various heap-based solutions
 * and their alternatives discussed in the project.
 *
 * It focuses primarily on `KthLargestElement` to show the efficiency difference
 * between O(N log K) and O(N log N) approaches.
 *
 * Note: For serious benchmarking, frameworks like JMH (Java Microbenchmark Harness)
 * should be used. This class provides a basic comparison using `System.nanoTime()`.
 */
public class HeapBenchmarks {

    private static final Random random = new Random();
    private static final int WARMUP_ITERATIONS = 5;
    private static final int MEASUREMENT_ITERATIONS = 10;

    public static void main(String[] args) {
        System.out.println("--- Starting Heap Operations Benchmarks ---");
        System.out.println("Warmup iterations: " + WARMUP_ITERATIONS);
        System.out.println("Measurement iterations: " + MEASUREMENT_ITERATIONS);
        System.out.println("-----------------------------------------");

        benchmarkKthLargestElement();
        System.out.println("\n-----------------------------------------");
        // benchmarkMergeKSortedLists(); // Can be added for more extensive benchmarks
        // benchmarkTopKFrequentElements(); // Can be added for more extensive benchmarks
        System.out.println("--- Benchmarks Finished ---");
    }

    /**
     * Benchmarks the KthLargestElement problem with different approaches.
     * Compares O(N log K) heap solution against O(N log N) sorting solution.
     */
    private static void benchmarkKthLargestElement() {
        System.out.println("\n--- Benchmarking Kth Largest Element ---");
        KthLargestElement solver = new KthLargestElement();

        int[] inputSizes = {10_000, 50_000, 100_000, 500_000, 1_000_000};
        int[] kValues = {1, 10, 100, 1000, 10_000}; // Vary K to see its impact

        for (int N : inputSizes) {
            System.out.printf("\n--- Array Size N = %d ---\n", N);
            int[] nums = generateRandomArray(N, -10000, 10000);

            for (int k : kValues) {
                if (k > N) continue; // Skip if k is larger than N

                System.out.printf("  K = %d\n", k);

                // Benchmark Min-Heap (Optimal)
                long minHeapAvgTime = runBenchmark(() -> {
                    // Create a copy to ensure each run has the same initial state
                    int[] numsCopy = Arrays.copyOf(nums, nums.length);
                    solver.findKthLargestMinHeap(numsCopy, k);
                });
                System.out.printf("    Min-Heap (O(N log K)): %d ns\n", minHeapAvgTime);

                // Benchmark Custom Min-Heap (Optimal)
                long customMinHeapAvgTime = runBenchmark(() -> {
                    int[] numsCopy = Arrays.copyOf(nums, nums.length);
                    solver.findKthLargestCustomMinHeap(numsCopy, k);
                });
                System.out.printf("    Custom Min-Heap (O(N log K)): %d ns\n", customMinHeapAvgTime);


                // Benchmark Sorting (Brute Force / Less Optimal)
                long sortingAvgTime = runBenchmark(() -> {
                    int[] numsCopy = Arrays.copyOf(nums, nums.length); // Use a fresh copy
                    solver.findKthLargestSorting(numsCopy, k);
                });
                System.out.printf("    Sorting (O(N log N)): %d ns\n", sortingAvgTime);
            }
        }
    }

    /**
     * Helper to run a benchmark for a given runnable task.
     * Includes warmup and multiple measurements.
     * @param task The Runnable task to benchmark.
     * @return Average time in nanoseconds.
     */
    private static long runBenchmark(Runnable task) {
        // Warmup
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            task.run();
        }

        long totalTime = 0;
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            long startTime = System.nanoTime();
            task.run();
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }
        return totalTime / MEASUREMENT_ITERATIONS;
    }

    /**
     * Generates a random integer array.
     * @param size The size of the array.
     * @param min The minimum value for elements.
     * @param max The maximum value for elements.
     * @return A randomly generated integer array.
     */
    private static int[] generateRandomArray(int size, int min, int max) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(max - min + 1) + min;
        }
        return arr;
    }

    /**
     * Benchmarks the MergeKSortedLists problem.
     * Can be uncommented and extended for more detailed comparisons.
     */
    private static void benchmarkMergeKSortedLists() {
        System.out.println("\n--- Benchmarking Merge K Sorted Lists ---");
        MergeKSortedLists solver = new MergeKSortedLists();

        int[] kListCounts = {5, 10, 50, 100}; // Number of lists
        int nodesPerList = 1000;              // Nodes per list

        for (int k : kListCounts) {
            System.out.printf("\n--- Number of Lists K = %d (approx %d nodes total) ---\n", k, k * nodesPerList);
            ListNode[] lists = generateSortedLists(k, nodesPerList);

            // Benchmark Heap Solution
            long heapAvgTime = runBenchmark(() -> {
                ListNode[] listsCopy = copyLists(lists);
                solver.mergeKListsHeap(listsCopy);
            });
            System.out.printf("    Heap Solution (O(N log K)): %d ns\n", heapAvgTime);

            // Benchmark Divide and Conquer Solution
            long divideConquerAvgTime = runBenchmark(() -> {
                ListNode[] listsCopy = copyLists(lists);
                solver.mergeKListsDivideAndConquer(listsCopy);
            });
            System.out.printf("    Divide and Conquer (O(N log K)): %d ns\n", divideConquerAvgTime);

            // Benchmark Brute Force (Collect, Sort, Rebuild)
            long bruteForceAvgTime = runBenchmark(() -> {
                ListNode[] listsCopy = copyLists(lists);
                solver.mergeKListsBruteForce(listsCopy);
            });
            System.out.printf("    Brute Force (O(N log N)): %d ns\n", bruteForceAvgTime);
        }
    }

    /**
     * Generates an array of k sorted linked lists.
     */
    private static ListNode[] generateSortedLists(int k, int nodesPerList) {
        ListNode[] lists = new ListNode[k];
        for (int i = 0; i < k; i++) {
            int[] arr = IntStream.generate(() -> random.nextInt(10000)).limit(nodesPerList).toArray();
            Arrays.sort(arr);
            lists[i] = ListNode.fromArray(arr);
        }
        return lists;
    }

    /**
     * Creates a deep copy of an array of ListNodes.
     * Essential for fair benchmarking when methods modify the input.
     */
    private static ListNode[] copyLists(ListNode[] originalLists) {
        ListNode[] copies = new ListNode[originalLists.length];
        for (int i = 0; i < originalLists.length; i++) {
            ListNode original = originalLists[i];
            if (original == null) {
                copies[i] = null;
                continue;
            }
            ListNode dummy = new ListNode(0);
            ListNode currentCopy = dummy;
            ListNode currentOriginal = original;
            while (currentOriginal != null) {
                currentCopy.next = new ListNode(currentOriginal.val);
                currentCopy = currentCopy.next;
                currentOriginal = currentOriginal.next;
            }
            copies[i] = dummy.next;
        }
        return copies;
    }

    /**
     * Benchmarks the TopKFrequentElements problem.
     * Can be uncommented and extended for more detailed comparisons.
     */
    private static void benchmarkTopKFrequentElements() {
        System.out.println("\n--- Benchmarking Top K Frequent Elements ---");
        TopKFrequentElements solver = new TopKFrequentElements();

        int[] inputSizes = {10_000, 50_000, 100_000, 500_000, 1_000_000};
        int[] kValues = {1, 10, 100, 1000}; // Vary K

        for (int N : inputSizes) {
            System.out.printf("\n--- Array Size N = %d ---\n", N);
            // Generate an array with some frequent elements, some less frequent
            int[] nums = generateFrequentedArray(N, 1000); // Max value up to 1000 to encourage duplicates

            for (int k : kValues) {
                if (k > 1000) continue; // Max unique elements is 1000, so k shouldn't exceed this.

                System.out.printf("  K = %d\n", k);

                // Benchmark Heap Solution
                long heapAvgTime = runBenchmark(() -> {
                    int[] numsCopy = Arrays.copyOf(nums, nums.length);
                    solver.topKFrequentHeap(numsCopy, k);
                });
                System.out.printf("    Heap Solution (O(N + M log K)): %d ns\n", heapAvgTime);

                // Benchmark Bucket Sort Solution
                long bucketSortAvgTime = runBenchmark(() -> {
                    int[] numsCopy = Arrays.copyOf(nums, nums.length);
                    solver.topKFrequentBucketSort(numsCopy, k);
                });
                System.out.printf("    Bucket Sort (O(N)): %d ns\n", bucketSortAvgTime);


                // Benchmark Sorting Solution
                long sortingAvgTime = runBenchmark(() -> {
                    int[] numsCopy = Arrays.copyOf(nums, nums.length);
                    solver.topKFrequentSorting(numsCopy, k);
                });
                System.out.printf("    Sorting (O(N + M log M)): %d ns\n", sortingAvgTime);
            }
        }
    }

    /**
     * Generates a random integer array suitable for frequency counting,
     * with values in a limited range to create duplicates.
     */
    private static int[] generateFrequentedArray(int size, int maxValue) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(maxValue); // Values from 0 to maxValue-1
        }
        return arr;
    }
}
```