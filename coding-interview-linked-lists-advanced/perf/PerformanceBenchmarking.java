```java
package com.example.linkedlist;

import java.util.Random;

/**
 * Performance benchmarking class for Linked List problems.
 * This class measures the execution time of various linked list algorithms
 * implemented in {@link LinkedListProblems}.
 * It uses System.nanoTime() for precise time measurement.
 */
public class PerformanceBenchmarking {

    private static final int WARMUP_ITERATIONS = 5;
    private static final int BENCHMARK_ITERATIONS = 10;
    private static final int SMALL_LIST_SIZE = 1_000;
    private static final int MEDIUM_LIST_SIZE = 10_000;
    private static final int LARGE_LIST_SIZE = 100_000;
    private static final int VERY_LARGE_LIST_SIZE = 1_000_000;

    private LinkedListProblems solver;
    private Random random;

    public PerformanceBenchmarking() {
        solver = new LinkedListProblems();
        random = new Random();
    }

    /**
     * Creates a linked list of a specified size with random integer values.
     * @param size The number of nodes in the linked list.
     * @return The head of the created linked list.
     */
    private ListNode createRandomList(int size) {
        if (size <= 0) {
            return null;
        }
        ListNode head = new ListNode(random.nextInt(1000));
        ListNode current = head;
        for (int i = 1; i < size; i++) {
            current.next = new ListNode(random.nextInt(1000));
            current = current.next;
        }
        return head;
    }

    /**
     * Creates a sorted linked list of a specified size.
     * @param size The number of nodes in the linked list.
     * @return The head of the created sorted linked list.
     */
    private ListNode createSortedList(int size) {
        if (size <= 0) {
            return null;
        }
        ListNode head = new ListNode(random.nextInt(10)); // Start with a small random number
        ListNode current = head;
        for (int i = 1; i < size; i++) {
            current.next = new ListNode(current.val + random.nextInt(10) + 1); // Ensure increasing value
            current = current.next;
        }
        return head;
    }

    /**
     * Creates a linked list with a cycle starting at a specific node.
     * @param size The total number of nodes in the list.
     * @param cycleStartNodeIndex The 0-based index where the cycle should start.
     * @return The head of the linked list with a cycle.
     */
    private ListNode createListWithCycle(int size, int cycleStartNodeIndex) {
        if (size <= 0) return null;
        if (cycleStartNodeIndex < 0 || cycleStartNodeIndex >= size) {
            // Invalid cycle start index, create a linear list
            return createRandomList(size);
        }

        ListNode head = new ListNode(random.nextInt(1000));
        ListNode current = head;
        ListNode cycleStartNode = null;

        for (int i = 1; i < size; i++) {
            if (i == cycleStartNodeIndex) {
                cycleStartNode = current;
            }
            current.next = new ListNode(random.nextInt(1000));
            current = current.next;
        }

        if (cycleStartNode != null) {
            current.next = cycleStartNode; // Create the cycle
        }
        return head;
    }

    /**
     * Runs a benchmark for a given operation.
     * @param operationName The name of the operation being benchmarked.
     * @param listSize The size of the linked list for the benchmark.
     * @param runner A functional interface to execute the operation.
     * @param listGenerator A functional interface to generate a fresh list for each run.
     */
    private void runBenchmark(String operationName, int listSize, Runnable runner, ListGenerator listGenerator) {
        System.out.println(String.format("Benchmarking: %-40s (List size: %d)", operationName, listSize));

        // Warmup runs
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            listGenerator.generate(listSize); // Generate list for warmup (and discard)
            runner.run();
        }

        long totalTime = 0;
        for (int i = 0; i < BENCHMARK_ITERATIONS; i++) {
            // Re-generate list for each benchmark run to ensure consistent starting state
            listGenerator.generate(listSize);
            long startTime = System.nanoTime();
            runner.run();
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }

        long averageTime = totalTime / BENCHMARK_ITERATIONS;
        System.out.println(String.format("  Average time: %.3f ms\n", averageTime / 1_000_000.0));
    }

    // Functional interface for list generation
    @FunctionalInterface
    interface ListGenerator {
        ListNode generate(int size);
    }

    public void benchmarkAll() {
        System.out.println("--- Starting Linked List Performance Benchmarks ---\n");

        // --- Benchmark Reverse List (Iterative) ---
        ListGenerator randomListGenerator = this::createRandomList;
        runBenchmark("Reverse List (Iterative)", SMALL_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(SMALL_LIST_SIZE);
            solver.reverseListIterative(head);
        }, randomListGenerator);

        runBenchmark("Reverse List (Iterative)", MEDIUM_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(MEDIUM_LIST_SIZE);
            solver.reverseListIterative(head);
        }, randomListGenerator);

        runBenchmark("Reverse List (Iterative)", LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(LARGE_LIST_SIZE);
            solver.reverseListIterative(head);
        }, randomListGenerator);

        runBenchmark("Reverse List (Iterative)", VERY_LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(VERY_LARGE_LIST_SIZE);
            solver.reverseListIterative(head);
        }, randomListGenerator);


        // --- Benchmark Reverse List (Recursive) ---
        // Note: Recursive might cause StackOverflowError for very large lists.
        // We'll test with slightly smaller max size.
        runBenchmark("Reverse List (Recursive)", SMALL_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(SMALL_LIST_SIZE);
            solver.reverseListRecursive(head);
        }, randomListGenerator);

        runBenchmark("Reverse List (Recursive)", MEDIUM_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(MEDIUM_LIST_SIZE);
            solver.reverseListRecursive(head);
        }, randomListGenerator);

        // This might fail with StackOverflowError for large lists depending on JVM stack size
        runBenchmark("Reverse List (Recursive)", LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(LARGE_LIST_SIZE);
            try {
                solver.reverseListRecursive(head);
            } catch (StackOverflowError e) {
                System.err.println("    [WARNING] StackOverflowError for Recursive Reverse on list size " + LARGE_LIST_SIZE);
            }
        }, randomListGenerator);


        // --- Benchmark Detect Cycle ---
        // Test with a list that has a cycle
        ListGenerator cycleListGenerator = (size) -> createListWithCycle(size, size / 2); // Cycle in middle
        runBenchmark("Detect Cycle (with cycle)", SMALL_LIST_SIZE, () -> {
            ListNode head = cycleListGenerator.generate(SMALL_LIST_SIZE);
            solver.detectCycle(head);
        }, cycleListGenerator);

        runBenchmark("Detect Cycle (with cycle)", LARGE_LIST_SIZE, () -> {
            ListNode head = cycleListGenerator.generate(LARGE_LIST_SIZE);
            solver.detectCycle(head);
        }, cycleListGenerator);

        // Test with a list that has NO cycle
        runBenchmark("Detect Cycle (no cycle)", SMALL_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(SMALL_LIST_SIZE);
            solver.detectCycle(head);
        }, randomListGenerator);

        runBenchmark("Detect Cycle (no cycle)", LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(LARGE_LIST_SIZE);
            solver.detectCycle(head);
        }, randomListGenerator);


        // --- Benchmark Merge Two Sorted Lists ---
        ListGenerator sortedListGenerator = this::createSortedList;
        runBenchmark("Merge Two Sorted Lists", SMALL_LIST_SIZE, () -> {
            ListNode list1 = sortedListGenerator.generate(SMALL_LIST_SIZE / 2);
            ListNode list2 = sortedListGenerator.generate(SMALL_LIST_SIZE / 2);
            solver.mergeTwoLists(list1, list2);
        }, (size) -> null); // Not using generator for this specific test, generating lists inside runner

        runBenchmark("Merge Two Sorted Lists", LARGE_LIST_SIZE, () -> {
            ListNode list1 = sortedListGenerator.generate(LARGE_LIST_SIZE / 2);
            ListNode list2 = sortedListGenerator.generate(LARGE_LIST_SIZE / 2);
            solver.mergeTwoLists(list1, list2);
        }, (size) -> null);


        // --- Benchmark Remove Nth From End ---
        runBenchmark("Remove Nth From End (middle)", SMALL_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(SMALL_LIST_SIZE);
            solver.removeNthFromEnd(head, SMALL_LIST_SIZE / 2); // Remove middle
        }, randomListGenerator);

        runBenchmark("Remove Nth From End (middle)", LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(LARGE_LIST_SIZE);
            solver.removeNthFromEnd(head, LARGE_LIST_SIZE / 2); // Remove middle
        }, randomListGenerator);

        runBenchmark("Remove Nth From End (head)", SMALL_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(SMALL_LIST_SIZE);
            solver.removeNthFromEnd(head, SMALL_LIST_SIZE); // Remove head
        }, randomListGenerator);

        runBenchmark("Remove Nth From End (head)", LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(LARGE_LIST_SIZE);
            solver.removeNthFromEnd(head, LARGE_LIST_SIZE); // Remove head
        }, randomListGenerator);


        // --- Benchmark Reorder List ---
        runBenchmark("Reorder List", SMALL_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(SMALL_LIST_SIZE);
            solver.reorderList(head);
        }, randomListGenerator);

        runBenchmark("Reorder List", MEDIUM_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(MEDIUM_LIST_SIZE);
            solver.reorderList(head);
        }, randomListGenerator);

        runBenchmark("Reorder List", LARGE_LIST_SIZE, () -> {
            ListNode head = randomListGenerator.generate(LARGE_LIST_SIZE);
            solver.reorderList(head);
        }, randomListGenerator);


        System.out.println("--- Benchmarks Finished ---");
    }

    public static void main(String[] args) {
        PerformanceBenchmarking benchmark = new PerformanceBenchmarking();
        benchmark.benchmarkAll();
    }
}
```