```java
package com.example.linkedlist;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.concurrent.TimeUnit;

/**
 * Benchmarks for various Linked List problem solutions using JMH (Java Microbenchmark Harness).
 *
 * To run:
 * 1. Build the project: `mvn clean install`
 * 2. Run benchmarks: `java -jar target/benchmarks.jar`
 *    (or `mvn clean verify` which is configured in pom.xml to run them after tests)
 *
 * This benchmark compares different approaches for:
 * - Reversing a Linked List (Iterative vs. Recursive)
 * - Merging Two Sorted Lists (Iterative vs. Recursive)
 * - Detecting Cycle and Finding Start (HashSet vs. Floyd's Tortoise and Hare)
 * - Removing Nth Node From End (Two-pass vs. One-pass)
 * - Palindrome Linked List (Stack vs. Reverse Half)
 */
@State(Scope.Benchmark)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Fork(1)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
public class LinkedListBenchmark {

    private LinkedListProblems problems;

    // --- Reverse List Benchmarks ---
    private LinkedListNode reverseListSmall;
    private LinkedListNode reverseListMedium;
    private LinkedListNode reverseListLarge;

    // --- Merge Two Sorted Lists Benchmarks ---
    private LinkedListNode mergeList1Small;
    private LinkedListNode mergeList2Small;
    private LinkedListNode mergeList1Medium;
    private LinkedListNode mergeList2Medium;
    private LinkedListNode mergeList1Large;
    private LinkedListNode mergeList2Large;

    // --- Detect Cycle Benchmarks ---
    private LinkedListNode cycleListNoCycle;
    private LinkedListNode cycleListSmallCycle; // Cycle near head
    private LinkedListNode cycleListMediumCycle; // Cycle in middle
    private LinkedListNode cycleListLargeCycle; // Cycle near tail

    // --- Remove Nth From End Benchmarks ---
    private LinkedListNode removeNthSmallList;
    private LinkedListNode removeNthMediumList;
    private LinkedListNode removeNthLargeList;
    private int N_SMALL = 1;
    private int N_MEDIUM = 5;
    private int N_LARGE = 100; // For large list

    // --- Palindrome List Benchmarks ---
    private LinkedListNode palindromeListSmallTrue;
    private LinkedListNode palindromeListSmallFalse;
    private LinkedListNode palindromeListMediumTrue;
    private LinkedListNode palindromeListMediumFalse;
    private LinkedListNode palindromeListLargeTrue;
    private LinkedListNode palindromeListLargeFalse;

    @Setup(Level.Trial)
    public void setup() {
        problems = new LinkedListProblems();

        // Initialize for Reverse List
        reverseListSmall = LinkedListUtils.createLinkedList(generateIntArray(10));
        reverseListMedium = LinkedListUtils.createLinkedList(generateIntArray(100));
        reverseListLarge = LinkedListUtils.createLinkedList(generateIntArray(1000));

        // Initialize for Merge Two Sorted Lists
        mergeList1Small = LinkedListUtils.createLinkedList(generateSortedIntArray(5));
        mergeList2Small = LinkedListUtils.createLinkedList(generateSortedIntArray(5, 100));
        mergeList1Medium = LinkedListUtils.createLinkedList(generateSortedIntArray(50));
        mergeList2Medium = LinkedListUtils.createLinkedList(generateSortedIntArray(50, 100));
        mergeList1Large = LinkedListUtils.createLinkedList(generateSortedIntArray(500));
        mergeList2Large = LinkedListUtils.createLinkedList(generateSortedIntArray(500, 1000));

        // Initialize for Detect Cycle
        cycleListNoCycle = LinkedListUtils.createLinkedList(generateIntArray(1000));
        cycleListSmallCycle = LinkedListUtils.createLinkedListWithCycle(generateIntArray(1000), 5); // Cycle at 5th node
        cycleListMediumCycle = LinkedListUtils.createLinkedListWithCycle(generateIntArray(1000), 500); // Cycle in middle
        cycleListLargeCycle = LinkedListUtils.createLinkedListWithCycle(generateIntArray(1000), 900); // Cycle near end

        // Initialize for Remove Nth From End
        removeNthSmallList = LinkedListUtils.createLinkedList(generateIntArray(10));
        removeNthMediumList = LinkedListUtils.createLinkedList(generateIntArray(100));
        removeNthLargeList = LinkedListUtils.createLinkedList(generateIntArray(1000));

        // Initialize for Palindrome List
        palindromeListSmallTrue = LinkedListUtils.createLinkedList(new int[]{1,2,3,2,1});
        palindromeListSmallFalse = LinkedListUtils.createLinkedList(new int[]{1,2,3,4,5});
        palindromeListMediumTrue = LinkedListUtils.createLinkedList(generatePalindromeArray(100));
        palindromeListMediumFalse = LinkedListUtils.createLinkedList(generateNonPalindromeArray(100));
        palindromeListLargeTrue = LinkedListUtils.createLinkedList(generatePalindromeArray(1000));
        palindromeListLargeFalse = LinkedListUtils.createLinkedList(generateNonPalindromeArray(1000));
    }

    // Helper to create a deep copy of a linked list for each benchmark iteration
    // to ensure modifications don't affect subsequent runs.
    private LinkedListNode deepCopy(LinkedListNode head) {
        if (head == null) return null;
        return LinkedListUtils.createLinkedList(LinkedListUtils.toArrayList(head).stream().mapToInt(i->i).toArray());
    }

    // Helper to create a deep copy of two linked lists
    private LinkedListNode[] deepCopy(LinkedListNode list1, LinkedListNode list2) {
        return new LinkedListNode[]{deepCopy(list1), deepCopy(list2)};
    }


    /*
     * ==============================================================================
     * BENCHMARKS FOR PROBLEM 1: Reverse Linked List
     * ==============================================================================
     */

    @Benchmark
    public void testReverseListIterativeSmall(Blackhole bh) {
        bh.consume(problems.reverseListIterative(deepCopy(reverseListSmall)));
    }

    @Benchmark
    public void testReverseListRecursiveSmall(Blackhole bh) {
        bh.consume(problems.reverseListRecursive(deepCopy(reverseListSmall)));
    }

    @Benchmark
    public void testReverseListIterativeMedium(Blackhole bh) {
        bh.consume(problems.reverseListIterative(deepCopy(reverseListMedium)));
    }

    @Benchmark
    public void testReverseListRecursiveMedium(Blackhole bh) {
        bh.consume(problems.reverseListRecursive(deepCopy(reverseListMedium)));
    }

    @Benchmark
    public void testReverseListIterativeLarge(Blackhole bh) {
        bh.consume(problems.reverseListIterative(deepCopy(reverseListLarge)));
    }

    @Benchmark
    public void testReverseListRecursiveLarge(Blackhole bh) {
        // Recursive might stack overflow for very large lists,
        // but for typical interview sizes (N=1000), it should be fine.
        bh.consume(problems.reverseListRecursive(deepCopy(reverseListLarge)));
    }

    /*
     * ==============================================================================
     * BENCHMARKS FOR PROBLEM 2: Merge Two Sorted Lists
     * ==============================================================================
     */

    @Benchmark
    public void testMergeTwoListsIterativeSmall(Blackhole bh) {
        LinkedListNode[] lists = deepCopy(mergeList1Small, mergeList2Small);
        bh.consume(problems.mergeTwoListsIterative(lists[0], lists[1]));
    }

    @Benchmark
    public void testMergeTwoListsRecursiveSmall(Blackhole bh) {
        LinkedListNode[] lists = deepCopy(mergeList1Small, mergeList2Small);
        bh.consume(problems.mergeTwoListsRecursive(lists[0], lists[1]));
    }

    @Benchmark
    public void testMergeTwoListsIterativeMedium(Blackhole bh) {
        LinkedListNode[] lists = deepCopy(mergeList1Medium, mergeList2Medium);
        bh.consume(problems.mergeTwoListsIterative(lists[0], lists[1]));
    }

    @Benchmark
    public void testMergeTwoListsRecursiveMedium(Blackhole bh) {
        LinkedListNode[] lists = deepCopy(mergeList1Medium, mergeList2Medium);
        bh.consume(problems.mergeTwoListsRecursive(lists[0], lists[1]));
    }

    @Benchmark
    public void testMergeTwoListsIterativeLarge(Blackhole bh) {
        LinkedListNode[] lists = deepCopy(mergeList1Large, mergeList2Large);
        bh.consume(problems.mergeTwoListsIterative(lists[0], lists[1]));
    }

    @Benchmark
    public void testMergeTwoListsRecursiveLarge(Blackhole bh) {
        LinkedListNode[] lists = deepCopy(mergeList1Large, mergeList2Large);
        bh.consume(problems.mergeTwoListsRecursive(lists[0], lists[1]));
    }

    /*
     * ==============================================================================
     * BENCHMARKS FOR PROBLEM 3: Detect Cycle and Find Cycle Start
     * ==============================================================================
     */

    @Benchmark
    public void testDetectCycleHashSetNoCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartUsingHashSet(deepCopy(cycleListNoCycle)));
    }

    @Benchmark
    public void testDetectCycleFloydNoCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartFloyd(deepCopy(cycleListNoCycle)));
    }

    @Benchmark
    public void testDetectCycleHashSetSmallCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartUsingHashSet(deepCopy(cycleListSmallCycle)));
    }

    @Benchmark
    public void testDetectCycleFloydSmallCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartFloyd(deepCopy(cycleListSmallCycle)));
    }

    @Benchmark
    public void testDetectCycleHashSetMediumCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartUsingHashSet(deepCopy(cycleListMediumCycle)));
    }

    @Benchmark
    public void testDetectCycleFloydMediumCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartFloyd(deepCopy(cycleListMediumCycle)));
    }

    @Benchmark
    public void testDetectCycleHashSetLargeCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartUsingHashSet(deepCopy(cycleListLargeCycle)));
    }

    @Benchmark
    public void testDetectCycleFloydLargeCycle(Blackhole bh) {
        bh.consume(problems.detectCycleAndFindStartFloyd(deepCopy(cycleListLargeCycle)));
    }

    /*
     * ==============================================================================
     * BENCHMARKS FOR PROBLEM 4: Remove Nth Node From End
     * ==============================================================================
     */

    @Benchmark
    public void testRemoveNthFromEndTwoPassSmall(Blackhole bh) {
        bh.consume(problems.removeNthFromEndTwoPass(deepCopy(removeNthSmallList), N_SMALL));
    }

    @Benchmark
    public void testRemoveNthFromEndOnePassSmall(Blackhole bh) {
        bh.consume(problems.removeNthFromEndOnePass(deepCopy(removeNthSmallList), N_SMALL));
    }

    @Benchmark
    public void testRemoveNthFromEndTwoPassMedium(Blackhole bh) {
        bh.consume(problems.removeNthFromEndTwoPass(deepCopy(removeNthMediumList), N_MEDIUM));
    }

    @Benchmark
    public void testRemoveNthFromEndOnePassMedium(Blackhole bh) {
        bh.consume(problems.removeNthFromEndOnePass(deepCopy(removeNthMediumList), N_MEDIUM));
    }

    @Benchmark
    public void testRemoveNthFromEndTwoPassLarge(Blackhole bh) {
        bh.consume(problems.removeNthFromEndTwoPass(deepCopy(removeNthLargeList), N_LARGE));
    }

    @Benchmark
    public void testRemoveNthFromEndOnePassLarge(Blackhole bh) {
        bh.consume(problems.removeNthFromEndOnePass(deepCopy(removeNthLargeList), N_LARGE));
    }

    /*
     * ==============================================================================
     * BENCHMARKS FOR PROBLEM 5: Palindrome Linked List
     * ==============================================================================
     */
    @Benchmark
    public void testIsPalindromeUsingStackSmallTrue(Blackhole bh) {
        bh.consume(problems.isPalindromeUsingStack(deepCopy(palindromeListSmallTrue)));
    }

    @Benchmark
    public void testIsPalindromeOptimalSmallTrue(Blackhole bh) {
        bh.consume(problems.isPalindromeOptimal(deepCopy(palindromeListSmallTrue)));
    }

    @Benchmark
    public void testIsPalindromeUsingStackSmallFalse(Blackhole bh) {
        bh.consume(problems.isPalindromeUsingStack(deepCopy(palindromeListSmallFalse)));
    }

    @Benchmark
    public void testIsPalindromeOptimalSmallFalse(Blackhole bh) {
        bh.consume(problems.isPalindromeOptimal(deepCopy(palindromeListSmallFalse)));
    }

    @Benchmark
    public void testIsPalindromeUsingStackMediumTrue(Blackhole bh) {
        bh.consume(problems.isPalindromeUsingStack(deepCopy(palindromeListMediumTrue)));
    }

    @Benchmark
    public void testIsPalindromeOptimalMediumTrue(Blackhole bh) {
        bh.consume(problems.isPalindromeOptimal(deepCopy(palindromeListMediumTrue)));
    }

    @Benchmark
    public void testIsPalindromeUsingStackMediumFalse(Blackhole bh) {
        bh.consume(problems.isPalindromeUsingStack(deepCopy(palindromeListMediumFalse)));
    }

    @Benchmark
    public void testIsPalindromeOptimalMediumFalse(Blackhole bh) {
        bh.consume(problems.isPalindromeOptimal(deepCopy(palindromeListMediumFalse)));
    }

    @Benchmark
    public void testIsPalindromeUsingStackLargeTrue(Blackhole bh) {
        bh.consume(problems.isPalindromeUsingStack(deepCopy(palindromeListLargeTrue)));
    }

    @Benchmark
    public void testIsPalindromeOptimalLargeTrue(Blackhole bh) {
        bh.consume(problems.isPalindromeOptimal(deepCopy(palindromeListLargeTrue)));
    }

    @Benchmark
    public void testIsPalindromeUsingStackLargeFalse(Blackhole bh) {
        bh.consume(problems.isPalindromeUsingStack(deepCopy(palindromeListLargeFalse)));
    }

    @Benchmark
    public void testIsPalindromeOptimalLargeFalse(Blackhole bh) {
        bh.consume(problems.isPalindromeOptimal(deepCopy(palindromeListLargeFalse)));
    }

    // --- Utility methods for generating test data ---

    private int[] generateIntArray(int size) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = i + 1;
        }
        return arr;
    }

    private int[] generateSortedIntArray(int size) {
        return generateSortedIntArray(size, 0);
    }

    private int[] generateSortedIntArray(int size, int startValue) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = startValue + i;
        }
        return arr;
    }

    private int[] generatePalindromeArray(int size) {
        int[] arr = new int[size];
        for (int i = 0; i < size / 2; i++) {
            arr[i] = i + 1;
            arr[size - 1 - i] = i + 1;
        }
        if (size % 2 == 1) {
            arr[size / 2] = size / 2 + 1;
        }
        return arr;
    }

    private int[] generateNonPalindromeArray(int size) {
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = i + 1;
        }
        if (size > 1) { // Ensure it's not a palindrome unless size is 0 or 1.
            arr[0] = arr[0] + 1; // Change first element to break palindrome property
        }
        return arr;
    }
}
```