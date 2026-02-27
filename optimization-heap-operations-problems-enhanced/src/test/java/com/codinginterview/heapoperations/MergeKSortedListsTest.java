```java
package com.codinginterview.heapoperations;

import com.codinginterview.heapoperations.problems.MergeKSortedLists;
import com.codinginterview.heapoperations.utils.ListNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class MergeKSortedListsTest {

    private MergeKSortedLists solver;

    @BeforeEach
    void setUp() {
        solver = new MergeKSortedLists();
    }

    // --- Test cases for mergeKListsHeap (Optimal Heap Solution) ---

    @Test
    @DisplayName("Heap: Basic merge of 3 lists")
    void testMergeKListsHeapBasic1() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 4, 5});
        ListNode l2 = ListNode.fromArray(new int[]{1, 3, 4});
        ListNode l3 = ListNode.fromArray(new int[]{2, 6});
        ListNode[] lists = {l1, l2, l3};
        int[] expected = {1, 1, 2, 3, 4, 4, 5, 6};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsHeap(lists)));
    }

    @Test
    @DisplayName("Heap: Empty input array of lists")
    void testMergeKListsHeapEmptyArray() {
        ListNode[] lists = {};
        assertNull(solver.mergeKListsHeap(lists));
    }

    @Test
    @DisplayName("Heap: Array with a single empty list")
    void testMergeKListsHeapSingleEmptyList() {
        ListNode[] lists = {null};
        assertNull(solver.mergeKListsHeap(lists));
    }

    @Test
    @DisplayName("Heap: Array with multiple empty lists")
    void testMergeKListsHeapMultipleEmptyLists() {
        ListNode[] lists = {null, null, null};
        assertNull(solver.mergeKListsHeap(lists));
    }

    @Test
    @DisplayName("Heap: Single list in the array")
    void testMergeKListsHeapSingleList() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode[] lists = {l1};
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsHeap(lists)));
    }

    @Test
    @DisplayName("Heap: Lists with varying lengths, including empty ones")
    void testMergeKListsHeapVaryingLengths() {
        ListNode l1 = ListNode.fromArray(new int[]{});
        ListNode l2 = ListNode.fromArray(new int[]{1, 2});
        ListNode l3 = ListNode.fromArray(new int[]{3, 4, 5});
        ListNode l4 = ListNode.fromArray(new int[]{});
        ListNode[] lists = {l1, l2, l3, l4};
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsHeap(lists)));
    }

    @Test
    @DisplayName("Heap: Lists with duplicates")
    void testMergeKListsHeapDuplicates() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 1, 2});
        ListNode l2 = ListNode.fromArray(new int[]{1, 2, 2});
        ListNode l3 = ListNode.fromArray(new int[]{2, 3, 3});
        ListNode[] lists = {l1, l2, l3};
        int[] expected = {1, 1, 2, 2, 2, 3, 3};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsHeap(lists)));
    }

    @Test
    @DisplayName("Heap: Lists with negative numbers")
    void testMergeKListsHeapNegativeNumbers() {
        ListNode l1 = ListNode.fromArray(new int[]{-5, -2, 0});
        ListNode l2 = ListNode.fromArray(new int[]{-3, -1, 1});
        ListNode l3 = ListNode.fromArray(new int[]{-4, 2, 3});
        ListNode[] lists = {l1, l2, l3};
        int[] expected = {-5, -4, -3, -2, -1, 0, 1, 2, 3};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsHeap(lists)));
    }

    @Test
    @DisplayName("Heap: Many short lists")
    void testMergeKListsHeapManyShortLists() {
        ListNode[] lists = new ListNode[10];
        for (int i = 0; i < 10; i++) {
            lists[i] = ListNode.fromArray(new int[]{i * 2, i * 2 + 1});
        }
        int[] expected = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsHeap(lists)));
    }

    // --- Test cases for mergeKListsDivideAndConquer (Alternative Optimal) ---

    @Test
    @DisplayName("Divide and Conquer: Basic merge of 3 lists")
    void testMergeKListsDivideAndConquerBasic1() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 4, 5});
        ListNode l2 = ListNode.fromArray(new int[]{1, 3, 4});
        ListNode l3 = ListNode.fromArray(new int[]{2, 6});
        ListNode[] lists = {l1, l2, l3};
        int[] expected = {1, 1, 2, 3, 4, 4, 5, 6};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsDivideAndConquer(lists)));
    }

    @Test
    @DisplayName("Divide and Conquer: Empty input array of lists")
    void testMergeKListsDivideAndConquerEmptyArray() {
        ListNode[] lists = {};
        assertNull(solver.mergeKListsDivideAndConquer(lists));
    }

    @Test
    @DisplayName("Divide and Conquer: Array with a single empty list")
    void testMergeKListsDivideAndConquerSingleEmptyList() {
        ListNode[] lists = {null};
        assertNull(solver.mergeKListsDivideAndConquer(lists));
    }

    @Test
    @DisplayName("Divide and Conquer: Single list in the array")
    void testMergeKListsDivideAndConquerSingleList() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode[] lists = {l1};
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsDivideAndConquer(lists)));
    }

    @Test
    @DisplayName("Divide and Conquer: Lists with varying lengths, including empty ones")
    void testMergeKListsDivideAndConquerVaryingLengths() {
        ListNode l1 = ListNode.fromArray(new int[]{});
        ListNode l2 = ListNode.fromArray(new int[]{1, 2});
        ListNode l3 = ListNode.fromArray(new int[]{3, 4, 5});
        ListNode l4 = ListNode.fromArray(new int[]{});
        ListNode[] lists = {l1, l2, l3, l4};
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsDivideAndConquer(lists)));
    }

    // --- Test cases for mergeKListsBruteForce (Brute Force/Comparison) ---

    @Test
    @DisplayName("Brute Force: Basic merge of 3 lists")
    void testMergeKListsBruteForceBasic1() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 4, 5});
        ListNode l2 = ListNode.fromArray(new int[]{1, 3, 4});
        ListNode l3 = ListNode.fromArray(new int[]{2, 6});
        ListNode[] lists = {l1, l2, l3};
        int[] expected = {1, 1, 2, 3, 4, 4, 5, 6};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsBruteForce(lists)));
    }

    @Test
    @DisplayName("Brute Force: Empty input array of lists")
    void testMergeKListsBruteForceEmptyArray() {
        ListNode[] lists = {};
        assertNull(solver.mergeKListsBruteForce(lists));
    }

    @Test
    @DisplayName("Brute Force: Array with a single empty list")
    void testMergeKListsBruteForceSingleEmptyList() {
        ListNode[] lists = {null};
        assertNull(solver.mergeKListsBruteForce(lists));
    }

    @Test
    @DisplayName("Brute Force: Single list in the array")
    void testMergeKListsBruteForceSingleList() {
        ListNode l1 = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode[] lists = {l1};
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsBruteForce(lists)));
    }

    @Test
    @DisplayName("Brute Force: Lists with varying lengths, including empty ones")
    void testMergeKListsBruteForceVaryingLengths() {
        ListNode l1 = ListNode.fromArray(new int[]{});
        ListNode l2 = ListNode.fromArray(new int[]{1, 2});
        ListNode l3 = ListNode.fromArray(new int[]{3, 4, 5});
        ListNode l4 = ListNode.fromArray(new int[]{});
        ListNode[] lists = {l1, l2, l3, l4};
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, ListNode.toArray(solver.mergeKListsBruteForce(lists)));
    }
}
```