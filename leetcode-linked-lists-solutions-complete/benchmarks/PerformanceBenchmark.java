```java
package com.example.linkedlist;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.concurrent.TimeUnit;
import java.util.Random;

/**
 * Performance benchmarks for the Linked List problems using JMH.
 *
 * To run:
 * 1. Navigate to the project root directory.
 * 2. Build the project: `mvn clean install`
 * 3. Navigate to the benchmarks directory: `cd benchmarks`
 * 4. Build the benchmarks JAR: `mvn clean install`
 * 5. Run the benchmarks: `java -jar target/benchmarks.jar`
 *
 * Configuration:
 * - Warmup iterations: 5 (to allow JVM to warm up and apply optimizations)
 * - Measurement iterations: 10 (for actual performance measurement)
 * - Fork: 1 (run the benchmark in a separate JVM process)
 * - Time unit: Milliseconds
 */
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@State(Scope.Benchmark) // State shared by all benchmark threads
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 10, time = 2, timeUnit = TimeUnit.SECONDS)
@Fork(1)
public class PerformanceBenchmark {

    private Problems problems;
    private Problems_Alternative problemsAlternative;

    // Test data for Reorder List
    @Param({"1000", "10000", "100000"})
    public int N_reorder;
    private LinkedListNode reorderListHead;
    private LinkedListNode reorderListHeadAlternative; // A separate copy for alternative method

    // Test data for Add Two Numbers
    @Param({"500", "5000", "50000"})
    public int N_add;
    private LinkedListNode addL1;
    private LinkedListNode addL2;
    private LinkedListNode addL1Alternative; // A separate copy for alternative method
    private LinkedListNode addL2Alternative; // A separate copy for alternative method

    // Test data for Merge K Lists
    @Param({"10", "100", "1000"}) // Number of lists (k)
    public int K_merge;
    @Param({"100", "1000"}) // Average length per list
    public int L_merge;
    private LinkedListNode[] mergeLists;
    private LinkedListNode[] mergeListsAlternative; // A separate copy for alternative method

    // Test data for Reverse K Group
    @Param({"10000", "100000"})
    public int N_reverseK;
    @Param({"2", "5", "100"}) // k value
    public int K_reverseK;
    private LinkedListNode reverseKGroupHead;
    private LinkedListNode reverseKGroupHeadAlternative; // A separate copy for alternative method


    /**
     * Setup method to initialize data for benchmarks.
     * This method runs once for each parameter combination before the actual benchmarks.
     */
    @Setup(Level.Iteration)
    public void setup() {
        problems = new Problems();
        problemsAlternative = new Problems_Alternative();
        Random random = new Random(42); // Seed for reproducibility

        // --- Reorder List Setup ---
        int[] reorderArr = new int[N_reorder];
        for (int i = 0; i < N_reorder; i++) {
            reorderArr[i] = i;
        }
        reorderListHead = LinkedListUtils.createLinkedList(reorderArr);
        reorderListHeadAlternative = LinkedListUtils.createLinkedList(reorderArr); // Deep copy for comparison

        // --- Add Two Numbers Setup ---
        int[] arr1 = new int[N_add];
        int[] arr2 = new int[N_add]; // Both lists same length for simplicity in benchmark
        for (int i = 0; i < N_add; i++) {
            arr1[i] = random.nextInt(10); // Digits 0-9
            arr2[i] = random.nextInt(10);
        }
        addL1 = LinkedListUtils.createLinkedList(arr1);
        addL2 = LinkedListUtils.createLinkedList(arr2);
        addL1Alternative = LinkedListUtils.createLinkedList(arr1); // Deep copy
        addL2Alternative = LinkedListUtils.createLinkedList(arr2); // Deep copy

        // --- Merge K Lists Setup ---
        mergeLists = new LinkedListNode[K_merge];
        mergeListsAlternative = new LinkedListNode[K_merge];
        for (int i = 0; i < K_merge; i++) {
            int[] currentListArr = new int[L_merge];
            // Ensure sorted unique values, starting from a random base
            int startVal = random.nextInt(1000) + i * (L_merge / 2); // Spread out starting values
            for (int j = 0; j < L_merge; j++) {
                currentListArr[j] = startVal + j;
            }
            mergeLists[i] = LinkedListUtils.createLinkedList(currentListArr);
            mergeListsAlternative[i] = LinkedListUtils.createLinkedList(currentListArr); // Deep copy
        }

        // --- Reverse K Group Setup ---
        int[] reverseKArr = new int[N_reverseK];
        for (int i = 0; i < N_reverseK; i++) {
            reverseKArr[i] = i;
        }
        reverseKGroupHead = LinkedListUtils.createLinkedList(reverseKArr);
        reverseKGroupHeadAlternative = LinkedListUtils.createLinkedList(reverseKArr); // Deep copy
    }

    /**
     * Benchmark for Reorder List - Optimal O(N) time, O(1) space.
     */
    @Benchmark
    public void benchReorderList(Blackhole bh) {
        // Need to create a new list for each benchmark run if it modifies the list in place
        LinkedListNode listCopy = LinkedListUtils.createLinkedList(LinkedListUtils.toList(reorderListHead));
        problems.reorderList(listCopy);
        bh.consume(listCopy); // Consume the result to prevent dead code elimination
    }

    /**
     * Benchmark for Reorder List - Alternative O(N) time, O(N) space.
     */
    @Benchmark
    public void benchReorderList_Alternative(Blackhole bh) {
        // Need to create a new list for each benchmark run if it modifies the list in place
        LinkedListNode listCopy = LinkedListUtils.createLinkedList(LinkedListUtils.toList(reorderListHeadAlternative));
        problemsAlternative.reorderListBruteForce(listCopy);
        bh.consume(listCopy); // Consume the result
    }

    /**
     * Benchmark for Add Two Numbers - Optimal O(max(M, N)) time, O(max(M, N)) space.
     */
    @Benchmark
    public void benchAddTwoNumbers(Blackhole bh) {
        // Add Two Numbers creates a new list, so no deep copy needed for input lists
        bh.consume(problems.addTwoNumbers(addL1, addL2));
    }

    /**
     * Benchmark for Add Two Numbers - Recursive O(max(M,N)) time, O(max(M,N)) stack space.
     */
    @Benchmark
    public void benchAddTwoNumbers_Alternative(Blackhole bh) {
        bh.consume(problemsAlternative.addTwoNumbersRecursive(addL1Alternative, addL2Alternative));
    }

    /**
     * Benchmark for Merge K Lists - Optimal O(N log k) time, O(k) space using Priority Queue.
     */
    @Benchmark
    public void benchMergeKLists(Blackhole bh) {
        // Merge K Lists modifies the input lists by rewiring next pointers
        // so we need fresh copies of the list heads each time.
        LinkedListNode[] listsCopy = new LinkedListNode[K_merge];
        for (int i = 0; i < K_merge; i++) {
            listsCopy[i] = LinkedListUtils.createLinkedList(LinkedListUtils.toList(mergeLists[i]));
        }
        bh.consume(problems.mergeKLists(listsCopy));
    }

    /**
     * Benchmark for Merge K Lists - Alternative O(N*k) time, O(1) space (in-place mergeTwoLists).
     */
    @Benchmark
    public void benchMergeKLists_Alternative(Blackhole bh) {
        LinkedListNode[] listsCopy = new LinkedListNode[K_merge];
        for (int i = 0; i < K_merge; i++) {
            listsCopy[i] = LinkedListUtils.createLinkedList(LinkedListUtils.toList(mergeListsAlternative[i]));
        }
        bh.consume(problemsAlternative.mergeKListsIterative(listsCopy));
    }

    /**
     * Benchmark for Reverse K Group - Optimal O(N) time, O(1) space.
     */
    @Benchmark
    public void benchReverseKGroup(Blackhole bh) {
        // Reverse K Group modifies the list in place
        LinkedListNode listCopy = LinkedListUtils.createLinkedList(LinkedListUtils.toList(reverseKGroupHead));
        problems.reverseKGroup(listCopy, K_reverseK);
        bh.consume(listCopy);
    }

    /**
     * Benchmark for Reverse K Group - Alternative Recursive O(N) time, O(N/k) stack space.
     */
    @Benchmark
    public void benchReverseKGroup_Alternative(Blackhole bh) {
        LinkedListNode listCopy = LinkedListUtils.createLinkedList(LinkedListUtils.toList(reverseKGroupHeadAlternative));
        problemsAlternative.reverseKGroupRecursive(listCopy, K_reverseK);
        bh.consume(listCopy);
    }
}
```