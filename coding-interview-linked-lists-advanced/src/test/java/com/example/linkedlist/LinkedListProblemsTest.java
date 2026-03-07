```java
package com.example.linkedlist;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for LinkedListProblems.
 * Uses JUnit 5 for testing.
 */
public class LinkedListProblemsTest {

    private LinkedListProblems solver;

    @BeforeEach
    void setUp() {
        solver = new LinkedListProblems();
    }

    // Helper method to compare two linked lists for equality
    private void assertListEquals(ListNode expectedHead, ListNode actualHead) {
        ListNode currentExpected = expectedHead;
        ListNode currentActual = actualHead;

        while (currentExpected != null && currentActual != null) {
            assertEquals(currentExpected.val, currentActual.val, "Node value mismatch");
            currentExpected = currentExpected.next;
            currentActual = currentActual.next;
        }
        // Both should be null if lists are of equal length and values match
        assertNull(currentExpected, "Expected list has more nodes than actual");
        assertNull(currentActual, "Actual list has more nodes than expected");
    }

    /*
     * Test cases for Problem 1: Reverse Linked List
     */
    @Test
    @DisplayName("Reverse List - Iterative: Empty list")
    void testReverseListIterative_Empty() {
        assertNull(solver.reverseListIterative(null));
    }

    @Test
    @DisplayName("Reverse List - Iterative: Single node list")
    void testReverseListIterative_SingleNode() {
        ListNode head = new ListNode(1);
        ListNode expected = new ListNode(1);
        assertListEquals(expected, solver.reverseListIterative(head));
    }

    @Test
    @DisplayName("Reverse List - Iterative: Multiple nodes list")
    void testReverseListIterative_MultipleNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode expected = ListNode.fromArray(new int[]{5, 4, 3, 2, 1});
        assertListEquals(expected, solver.reverseListIterative(head));
    }

    @Test
    @DisplayName("Reverse List - Iterative: Two nodes list")
    void testReverseListIterative_TwoNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2});
        ListNode expected = ListNode.fromArray(new int[]{2, 1});
        assertListEquals(expected, solver.reverseListIterative(head));
    }

    @Test
    @DisplayName("Reverse List - Iterative: Long list")
    void testReverseListIterative_LongList() {
        int[] original = new int[1000];
        int[] reversed = new int[1000];
        for (int i = 0; i < 1000; i++) {
            original[i] = i + 1;
            reversed[i] = 1000 - i;
        }
        ListNode head = ListNode.fromArray(original);
        ListNode expected = ListNode.fromArray(reversed);
        assertListEquals(expected, solver.reverseListIterative(head));
    }

    @Test
    @DisplayName("Reverse List - Recursive: Empty list")
    void testReverseListRecursive_Empty() {
        assertNull(solver.reverseListRecursive(null));
    }

    @Test
    @DisplayName("Reverse List - Recursive: Single node list")
    void testReverseListRecursive_SingleNode() {
        ListNode head = new ListNode(1);
        ListNode expected = new ListNode(1);
        assertListEquals(expected, solver.reverseListRecursive(head));
    }

    @Test
    @DisplayName("Reverse List - Recursive: Multiple nodes list")
    void testReverseListRecursive_MultipleNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode expected = ListNode.fromArray(new int[]{5, 4, 3, 2, 1});
        assertListEquals(expected, solver.reverseListRecursive(head));
    }

    @Test
    @DisplayName("Reverse List - Recursive: Two nodes list")
    void testReverseListRecursive_TwoNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2});
        ListNode expected = ListNode.fromArray(new int[]{2, 1});
        assertListEquals(expected, solver.reverseListRecursive(head));
    }


    /*
     * Test cases for Problem 2: Detect Cycle and Find Start Node
     */
    @Test
    @DisplayName("Detect Cycle: No cycle in empty list")
    void testDetectCycle_NoCycle_Empty() {
        assertNull(solver.detectCycle(null));
    }

    @Test
    @DisplayName("Detect Cycle: No cycle in single node list")
    void testDetectCycle_NoCycle_SingleNode() {
        ListNode head = new ListNode(1);
        assertNull(solver.detectCycle(head));
    }

    @Test
    @DisplayName("Detect Cycle: No cycle in linear list")
    void testDetectCycle_NoCycle_LinearList() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        assertNull(solver.detectCycle(head));
    }

    @Test
    @DisplayName("Detect Cycle: Cycle at head")
    void testDetectCycle_CycleAtHead() {
        ListNode head = new ListNode(1);
        ListNode node2 = new ListNode(2);
        ListNode node3 = new ListNode(3);
        head.next = node2;
        node2.next = node3;
        node3.next = head; // Cycle: 1 -> 2 -> 3 -> 1

        assertEquals(head, solver.detectCycle(head));
    }

    @Test
    @DisplayName("Detect Cycle: Cycle in middle")
    void testDetectCycle_CycleInMiddle() {
        ListNode head = new ListNode(1);
        ListNode node2 = new ListNode(2);
        ListNode node3 = new ListNode(3);
        ListNode node4 = new ListNode(4);
        ListNode node5 = new ListNode(5);
        head.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;
        node5.next = node3; // Cycle: 1 -> 2 -> 3 -> 4 -> 5 -> 3

        assertEquals(node3, solver.detectCycle(head));
    }

    @Test
    @DisplayName("Detect Cycle: Cycle at tail pointing to head")
    void testDetectCycle_CycleTailToHead() {
        ListNode head = new ListNode(1);
        ListNode node2 = new ListNode(2);
        ListNode node3 = new ListNode(3);
        head.next = node2;
        node2.next = node3;
        node3.next = head; // Cycle: 1 -> 2 -> 3 -> 1

        assertEquals(head, solver.detectCycle(head));
    }

    @Test
    @DisplayName("Detect Cycle: Cycle with only two nodes")
    void testDetectCycle_TwoNodesCycle() {
        ListNode head = new ListNode(1);
        ListNode node2 = new ListNode(2);
        head.next = node2;
        node2.next = head; // Cycle: 1 -> 2 -> 1

        assertEquals(head, solver.detectCycle(head));
    }

    @Test
    @DisplayName("Detect Cycle: Cycle with no entry from head, just an internal cycle (not possible with definition)")
    void testDetectCycle_InternalCycleNoHeadEntry() {
        // This scenario is not really possible with the problem definition
        // "return the node where the cycle begins" implies it's reachable from head.
        // If head itself is not part of the cycle, and points to a list that has a cycle,
        // it's effectively a cycle reachable from head.
        // Test with a long list and cycle far away
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
        ListNode curr = head;
        ListNode cycleStart = null;
        while(curr.val != 5) {
            curr = curr.next;
        }
        cycleStart = curr; // Node 5

        ListNode tail = head;
        while(tail.next != null) {
            tail = tail.next;
        }
        tail.next = cycleStart; // Cycle: 1->...->4->5->...->10->5

        assertEquals(cycleStart, solver.detectCycle(head));
    }


    /*
     * Test cases for Problem 3: Merge Two Sorted Lists
     */
    @Test
    @DisplayName("Merge Two Lists: Both empty")
    void testMergeTwoLists_BothEmpty() {
        assertNull(solver.mergeTwoLists(null, null));
    }

    @Test
    @DisplayName("Merge Two Lists: First list empty")
    void testMergeTwoLists_FirstEmpty() {
        ListNode list2 = ListNode.fromArray(new int[]{1, 2, 3});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3});
        assertListEquals(expected, solver.mergeTwoLists(null, list2));
    }

    @Test
    @DisplayName("Merge Two Lists: Second list empty")
    void testMergeTwoLists_SecondEmpty() {
        ListNode list1 = ListNode.fromArray(new int[]{1, 2, 3});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3});
        assertListEquals(expected, solver.mergeTwoLists(list1, null));
    }

    @Test
    @DisplayName("Merge Two Lists: Normal case with distinct elements")
    void testMergeTwoLists_DistinctElements() {
        ListNode list1 = ListNode.fromArray(new int[]{1, 3, 5});
        ListNode list2 = ListNode.fromArray(new int[]{2, 4, 6});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3, 4, 5, 6});
        assertListEquals(expected, solver.mergeTwoLists(list1, list2));
    }

    @Test
    @DisplayName("Merge Two Lists: Normal case with duplicate elements")
    void testMergeTwoLists_DuplicateElements() {
        ListNode list1 = ListNode.fromArray(new int[]{1, 2, 4});
        ListNode list2 = ListNode.fromArray(new int[]{1, 3, 4});
        ListNode expected = ListNode.fromArray(new int[]{1, 1, 2, 3, 4, 4});
        assertListEquals(expected, solver.mergeTwoLists(list1, list2));
    }

    @Test
    @DisplayName("Merge Two Lists: One list shorter than other")
    void testMergeTwoLists_UnequalLengths() {
        ListNode list1 = ListNode.fromArray(new int[]{1, 5, 7});
        ListNode list2 = ListNode.fromArray(new int[]{2, 3, 4, 6, 8, 9});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9});
        assertListEquals(expected, solver.mergeTwoLists(list1, list2));
    }

    @Test
    @DisplayName("Merge Two Lists: All elements from one list smaller than other")
    void testMergeTwoLists_OneListAllSmaller() {
        ListNode list1 = ListNode.fromArray(new int[]{1, 2, 3});
        ListNode list2 = ListNode.fromArray(new int[]{4, 5, 6});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3, 4, 5, 6});
        assertListEquals(expected, solver.mergeTwoLists(list1, list2));
    }

    /*
     * Test cases for Problem 4: Remove Nth Node From End of List
     */
    @Test
    @DisplayName("Remove Nth From End: Remove middle node")
    void testRemoveNthFromEnd_Middle() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3, 5}); // Remove 4 (2nd from end)
        assertListEquals(expected, solver.removeNthFromEnd(head, 2));
    }

    @Test
    @DisplayName("Remove Nth From End: Remove head node (N is length)")
    void testRemoveNthFromEnd_RemoveHead() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode expected = ListNode.fromArray(new int[]{2, 3, 4, 5}); // Remove 1 (5th from end)
        assertListEquals(expected, solver.removeNthFromEnd(head, 5));
    }

    @Test
    @DisplayName("Remove Nth From End: Remove tail node (N is 1)")
    void testRemoveNthFromEnd_RemoveTail() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode expected = ListNode.fromArray(new int[]{1, 2, 3, 4}); // Remove 5 (1st from end)
        assertListEquals(expected, solver.removeNthFromEnd(head, 1));
    }

    @Test
    @DisplayName("Remove Nth From End: List with one node, remove head")
    void testRemoveNthFromEnd_SingleNode() {
        ListNode head = new ListNode(1);
        assertNull(solver.removeNthFromEnd(head, 1)); // Remove 1 (1st from end), list becomes empty
    }

    @Test
    @DisplayName("Remove Nth From End: List with two nodes, remove head")
    void testRemoveNthFromEnd_TwoNodesRemoveHead() {
        ListNode head = ListNode.fromArray(new int[]{1, 2});
        ListNode expected = new ListNode(2); // Remove 1 (2nd from end)
        assertListEquals(expected, solver.removeNthFromEnd(head, 2));
    }

    @Test
    @DisplayName("Remove Nth From End: List with two nodes, remove tail")
    void testRemoveNthFromEnd_TwoNodesRemoveTail() {
        ListNode head = ListNode.fromArray(new int[]{1, 2});
        ListNode expected = new ListNode(1); // Remove 2 (1st from end)
        assertListEquals(expected, solver.removeNthFromEnd(head, 1));
    }

    @Test
    @DisplayName("Remove Nth From End: Empty list (should not happen based on typical constraints, but defensive)")
    void testRemoveNthFromEnd_EmptyList() {
        // Depending on problem spec, might throw an exception or return null.
        // Current implementation correctly returns null as dummy.next is null.
        assertNull(solver.removeNthFromEnd(null, 1));
    }


    /*
     * Test cases for Problem 5: Reorder List
     */
    @Test
    @DisplayName("Reorder List: Empty list")
    void testReorderList_Empty() {
        ListNode head = null;
        solver.reorderList(head);
        assertNull(head);
    }

    @Test
    @DisplayName("Reorder List: Single node list")
    void testReorderList_SingleNode() {
        ListNode head = new ListNode(1);
        ListNode expected = new ListNode(1);
        solver.reorderList(head);
        assertListEquals(expected, head);
    }

    @Test
    @DisplayName("Reorder List: Two nodes list")
    void testReorderList_TwoNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2});
        ListNode expected = ListNode.fromArray(new int[]{1, 2}); // Already reordered
        solver.reorderList(head);
        assertListEquals(expected, head);
    }

    @Test
    @DisplayName("Reorder List: Odd number of nodes")
    void testReorderList_OddNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5});
        ListNode expected = ListNode.fromArray(new int[]{1, 5, 2, 4, 3});
        solver.reorderList(head);
        assertListEquals(expected, head);
    }

    @Test
    @DisplayName("Reorder List: Even number of nodes")
    void testReorderList_EvenNodes() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4});
        ListNode expected = ListNode.fromArray(new int[]{1, 4, 2, 3});
        solver.reorderList(head);
        assertListEquals(expected, head);
    }

    @Test
    @DisplayName("Reorder List: Long list")
    void testReorderList_LongList() {
        ListNode head = ListNode.fromArray(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
        ListNode expected = ListNode.fromArray(new int[]{1, 10, 2, 9, 3, 8, 4, 7, 5, 6});
        solver.reorderList(head);
        assertListEquals(expected, head);
    }
}
```