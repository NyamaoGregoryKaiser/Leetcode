```java
package com.linkedlist.tests;

import com.linkedlist.ListNode;
import com.linkedlist.LinkedListUtils;
import com.linkedlist.problems.P1_ReverseLinkedList;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("P1: Reverse Linked List Tests")
class P1_ReverseLinkedListTest {

    private final P1_ReverseLinkedList solver = new P1_ReverseLinkedList();

    // --- Iterative Tests ---

    @Test
    @DisplayName("Iterative: Should reverse a standard linked list")
    void testReverseListIterative_StandardCase() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{5, 4, 3, 2, 1});
        ListNode result = solver.reverseListIterative(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Standard list should be reversed iteratively.");
    }

    @Test
    @DisplayName("Iterative: Should handle an empty list")
    void testReverseListIterative_EmptyList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{});
        ListNode result = solver.reverseListIterative(head);
        assertNull(result, "Empty list should return null.");
    }

    @Test
    @DisplayName("Iterative: Should handle a single-node list")
    void testReverseListIterative_SingleNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode result = solver.reverseListIterative(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Single-node list should remain unchanged.");
    }

    @Test
    @DisplayName("Iterative: Should handle a two-node list")
    void testReverseListIterative_TwoNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{2, 1});
        ListNode result = solver.reverseListIterative(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Two-node list should be reversed.");
    }

    @Test
    @DisplayName("Iterative: Should handle a list with even number of nodes")
    void testReverseListIterative_EvenNodes() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{4, 3, 2, 1});
        ListNode result = solver.reverseListIterative(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Even-node list should be reversed.");
    }

    @Test
    @DisplayName("Iterative: Should handle a list with duplicate values")
    void testReverseListIterative_Duplicates() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 2, 1});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 2, 1});
        ListNode result = solver.reverseListIterative(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "List with duplicates should be reversed correctly.");
    }

    // --- Recursive Tests ---

    @Test
    @DisplayName("Recursive: Should reverse a standard linked list")
    void testReverseListRecursive_StandardCase() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{5, 4, 3, 2, 1});
        ListNode result = solver.reverseListRecursive(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Standard list should be reversed recursively.");
    }

    @Test
    @DisplayName("Recursive: Should handle an empty list")
    void testReverseListRecursive_EmptyList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{});
        ListNode result = solver.reverseListRecursive(head);
        assertNull(result, "Empty list should return null.");
    }

    @Test
    @DisplayName("Recursive: Should handle a single-node list")
    void testReverseListRecursive_SingleNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode result = solver.reverseListRecursive(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Single-node list should remain unchanged.");
    }

    @Test
    @DisplayName("Recursive: Should handle a two-node list")
    void testReverseListRecursive_TwoNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{2, 1});
        ListNode result = solver.reverseListRecursive(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Two-node list should be reversed.");
    }

    @Test
    @DisplayName("Recursive: Should handle a list with even number of nodes")
    void testReverseListRecursive_EvenNodes() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{4, 3, 2, 1});
        ListNode result = solver.reverseListRecursive(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Even-node list should be reversed.");
    }

    @Test
    @DisplayName("Recursive: Should handle a list with duplicate values")
    void testReverseListRecursive_Duplicates() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 2, 1});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 2, 1});
        ListNode result = solver.reverseListRecursive(head);
        assertTrue(LinkedListUtils.areEqual(expected, result), "List with duplicates should be reversed correctly.");
    }
}
```