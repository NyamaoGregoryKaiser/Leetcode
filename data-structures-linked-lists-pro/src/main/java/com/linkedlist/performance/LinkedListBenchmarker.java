```java
package com.linkedlist.performance;

import com.linkedlist.ListNode;
import com.linkedlist.LinkedListUtils;
import com.linkedlist.problems.*;

import java.util.Random;

/**
 * Performance Benchmarking for Linked List Problems.
 * This class provides a simple utility to measure and compare the execution times
 * of different approaches for the linked list problems.
 * It uses System.nanoTime() for basic timing. For more precise, production-grade
 * benchmarking, consider using JMH (Java Microbenchmark Harness).
 */
public class LinkedListBenchmarker {

    private static final int SMALL_LIST_SIZE = 100;
    private static final int MEDIUM_LIST_SIZE = 1000;
    private static final int LARGE_LIST_SIZE = 10000;
    private static final int HUGE_LIST_SIZE = 100000; // For problems where N=10^5 is allowed

    private static final int NUM_RUNS = 5; // Number of times to run each benchmark for averaging

    public static void main(String[] args) {
        System.out.println("--- Linked List Algorithm Benchmarking ---");
        System.out.println("Running each benchmark " + NUM_RUNS + " times for averaging.\n");

        benchmarkReverseLinkedList();
        System.out.println("----------------------------------------\n");
        benchmarkMiddleOfLinkedList();
        System.out.println("----------------------------------------\n");
        benchmarkMergeTwoSortedLists();
        System.out.println("----------------------------------------\n");
        benchmarkDetectAndRemoveCycle();
        System.out.println("----------------------------------------\n");
    }

    private static ListNode generateRandomLinkedList(int size) {
        Random rand = new Random();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = rand.nextInt(1000); // Values between 0-999
        }
        return LinkedListUtils.createLinkedList(arr);
    }

    private static ListNode generateSortedLinkedList(int size) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = i * 2; // Even numbers, sorted
        }
        return LinkedListUtils.createLinkedList(arr);
    }

    private static void benchmarkReverseLinkedList() {
        System.out.println("Benchmarking P1: Reverse Linked List");
        P1_ReverseLinkedList solver = new P1_ReverseLinkedList();

        int[] listSizes = {SMALL_LIST_SIZE, MEDIUM_LIST_SIZE, LARGE_LIST_SIZE, HUGE_LIST_SIZE};

        for (int size : listSizes) {
            long totalIterativeTime = 0;
            long totalRecursiveTime = 0;

            for (int i = 0; i < NUM_RUNS; i++) {
                ListNode originalList1 = generateRandomLinkedList(size);
                ListNode originalList2 = LinkedListUtils.createLinkedList(LinkedListUtils.toList(originalList1).stream().mapToInt(Integer::intValue).toArray()); // Deep copy

                // Iterative
                long start = System.nanoTime();
                solver.reverseListIterative(originalList1);
                long end = System.nanoTime();
                totalIterativeTime += (end - start);

                // Recursive
                start = System.nanoTime();
                solver.reverseListRecursive(originalList2);
                end = System.nanoTime();
                totalRecursiveTime += (end - start);
            }
            System.out.printf("  List Size: %d%n", size);
            System.out.printf("    Iterative Avg. Time: %.2f us%n", (double) totalIterativeTime / NUM_RUNS / 1000.0);
            System.out.printf("    Recursive Avg. Time: %.2f us%n", (double) totalRecursiveTime / NUM_RUNS / 1000.0);
        }
    }

    private static void benchmarkMiddleOfLinkedList() {
        System.out.println("Benchmarking P2: Middle of Linked List");
        P2_MiddleOfLinkedList solver = new P2_MiddleOfLinkedList();

        int[] listSizes = {SMALL_LIST_SIZE, MEDIUM_LIST_SIZE, LARGE_LIST_SIZE, HUGE_LIST_SIZE};

        for (int size : listSizes) {
            long totalFastSlowTime = 0;
            long totalCountTime = 0;

            for (int i = 0; i < NUM_RUNS; i++) {
                ListNode originalList1 = generateRandomLinkedList(size);
                ListNode originalList2 = LinkedListUtils.createLinkedList(LinkedListUtils.toList(originalList1).stream().mapToInt(Integer::intValue).toArray()); // Deep copy

                // Fast and Slow Pointers
                long start = System.nanoTime();
                solver.findMiddle(originalList1);
                long end = System.nanoTime();
                totalFastSlowTime += (end - start);

                // Count Nodes
                start = System.nanoTime();
                solver.findMiddleWithCount(originalList2);
                end = System.nanoTime();
                totalCountTime += (end - start);
            }
            System.out.printf("  List Size: %d%n", size);
            System.out.printf("    Fast/Slow Pointers Avg. Time: %.2f us%n", (double) totalFastSlowTime / NUM_RUNS / 1000.0);
            System.out.printf("    Count Nodes (Two Pass) Avg. Time: %.2f us%n", (double) totalCountTime / NUM_RUNS / 1000.0);
        }
    }

    private static void benchmarkMergeTwoSortedLists() {
        System.out.println("Benchmarking P3: Merge Two Sorted Lists");
        P3_MergeTwoSortedLists solver = new P3_MergeTwoSortedLists();

        int[] listSizes = {SMALL_LIST_SIZE / 2, MEDIUM_LIST_SIZE / 2, LARGE_LIST_SIZE / 2, HUGE_LIST_SIZE / 2}; // Half for each list

        for (int size : listSizes) {
            long totalIterativeTime = 0;
            long totalRecursiveTime = 0;

            for (int i = 0; i < NUM_RUNS; i++) {
                ListNode list1_orig_it = generateSortedLinkedList(size);
                ListNode list2_orig_it = generateSortedLinkedList(size);
                ListNode list1_orig_rec = generateSortedLinkedList(size);
                ListNode list2_orig_rec = generateSortedLinkedList(size);

                // Iterative
                long start = System.nanoTime();
                solver.mergeTwoListsIterative(list1_orig_it, list2_orig_it);
                long end = System.nanoTime();
                totalIterativeTime += (end - start);

                // Recursive
                start = System.nanoTime();
                solver.mergeTwoListsRecursive(list1_orig_rec, list2_orig_rec);
                end = System.nanoTime();
                totalRecursiveTime += (end - start);
            }
            System.out.printf("  List Size (each list): %d (total %d)%n", size, size * 2);
            System.out.printf("    Iterative Avg. Time: %.2f us%n", (double) totalIterativeTime / NUM_RUNS / 1000.0);
            System.out.printf("    Recursive Avg. Time: %.2f us%n", (double) totalRecursiveTime / NUM_RUNS / 1000.0);
        }
    }

    private static void benchmarkDetectAndRemoveCycle() {
        System.out.println("Benchmarking P4: Detect and Remove Cycle");
        P4_DetectAndRemoveCycle solver = new P4_DetectAndRemoveCycle();

        int[] listSizes = {SMALL_LIST_SIZE, MEDIUM_LIST_SIZE, LARGE_LIST_SIZE, HUGE_LIST_SIZE};
        Random rand = new Random();

        for (int size : listSizes) {
            long totalFloydsTime = 0;
            long totalHashSetTime = 0;

            for (int i = 0; i < NUM_RUNS; i++) {
                // Generate list with a cycle. Cycle position is random within the list.
                int cyclePos = rand.nextInt(size);
                int[] arr1 = new int[size];
                int[] arr2 = new int[size];
                for(int j=0; j<size; j++) {
                    arr1[j] = rand.nextInt(1000);
                    arr2[j] = arr1[j]; // Ensure both lists are identical for fair comparison
                }

                ListNode listFloyds = LinkedListUtils.createListWithCycle(arr1, cyclePos);
                ListNode listHashSet = LinkedListUtils.createListWithCycle(arr2, cyclePos);

                // Floyd's Tortoise and Hare
                long start = System.nanoTime();
                solver.detectAndRemoveCycleFloyds(listFloyds);
                long end = System.nanoTime();
                totalFloydsTime += (end - start);

                // HashSet
                start = System.nanoTime();
                solver.detectAndRemoveCycleHashSet(listHashSet);
                end = System.nanoTime();
                totalHashSetTime += (end - start);
            }
            System.out.printf("  List Size: %d (with random cycle)%n", size);
            System.out.printf("    Floyd's (O(1) space) Avg. Time: %.2f us%n", (double) totalFloydsTime / NUM_RUNS / 1000.0);
            System.out.printf("    HashSet (O(N) space) Avg. Time: %.2f us%n", (double) totalHashSetTime / NUM_RUNS / 1000.0);
        }

        // Also test with no cycle
        System.out.println("\n  Testing with NO Cycle:");
        for (int size : listSizes) {
            long totalFloydsTime = 0;
            long totalHashSetTime = 0;

            for (int i = 0; i < NUM_RUNS; i++) {
                int[] arr1 = new int[size];
                int[] arr2 = new int[size];
                for(int j=0; j<size; j++) {
                    arr1[j] = rand.nextInt(1000);
                    arr2[j] = arr1[j];
                }

                ListNode listFloyds = LinkedListUtils.createListWithCycle(arr1, -1); // No cycle
                ListNode listHashSet = LinkedListUtils.createListWithCycle(arr2, -1); // No cycle

                long start = System.nanoTime();
                solver.detectAndRemoveCycleFloyds(listFloyds);
                long end = System.nanoTime();
                totalFloydsTime += (end - start);

                start = System.nanoTime();
                solver.detectAndRemoveCycleHashSet(listHashSet);
                end = System.nanoTime();
                totalHashSetTime += (end - start);
            }
            System.out.printf("  List Size: %d (no cycle)%n", size);
            System.out.printf("    Floyd's (O(1) space) Avg. Time: %.2f us%n", (double) totalFloydsTime / NUM_RUNS / 1000.0);
            System.out.printf("    HashSet (O(N) space) Avg. Time: %.2f us%n", (double) totalHashSetTime / NUM_RUNS / 1000.0);
        }
    }
}
```