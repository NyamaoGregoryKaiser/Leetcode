```java
package com.linkedlist.tests;

import com.linkedlist.ListNode;
import com.linkedlist.LinkedListUtils;
import com.linkedlist.problems.P3_MergeTwoSortedLists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNull;

@DisplayName("P3: Merge Two Sorted Lists Tests")
class P3_MergeTwoSortedListsTest {

    private final P3_MergeTwoSortedLists solver = new P3_MergeTwoSortedLists();

    // --- Iterative Tests ---

    @Test
    @DisplayName("Iterative: Should merge two standard sorted lists")
    void testMergeTwoListsIterative_StandardCase() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 4});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{1, 3, 4});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 1, 2, 3, 4, 4});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Two standard sorted lists should merge correctly.");
    }

    @Test
    @DisplayName("Iterative: Should merge when first list is empty")
    void testMergeTwoListsIterative_List1Empty() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{0});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{0});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging with empty list1 should return list2.");
    }

    @Test
    @DisplayName("Iterative: Should merge when second list is empty")
    void testMergeTwoListsIterative_List2Empty() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging with empty list2 should return list1.");
    }

    @Test
    @DisplayName("Iterative: Should merge when both lists are empty")
    void testMergeTwoListsIterative_BothEmpty() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertNull(result, "Merging two empty lists should return null.");
    }

    @Test
    @DisplayName("Iterative: Should merge lists of different lengths")
    void testMergeTwoListsIterative_DifferentLengths() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 5, 7});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{2, 3, 4, 6, 8});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging lists of different lengths should work.");
    }

    @Test
    @DisplayName("Iterative: Should merge lists with one node each")
    void testMergeTwoListsIterative_SingleNodes() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{5});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 5});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging single-node lists should work.");
    }

    @Test
    @DisplayName("Iterative: Should merge lists with all elements from one list smaller than other")
    void testMergeTwoListsIterative_OneListEntirelySmaller() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{4, 5, 6});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "One list entirely smaller should merge correctly.");
    }

    @Test
    @DisplayName("Iterative: Should merge lists with negative values")
    void testMergeTwoListsIterative_NegativeValues() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{-3, -1, 0});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{-2, 1, 2});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{-3, -2, -1, 0, 1, 2});
        ListNode result = solver.mergeTwoListsIterative(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging lists with negative values should work.");
    }

    // --- Recursive Tests ---

    @Test
    @DisplayName("Recursive: Should merge two standard sorted lists")
    void testMergeTwoListsRecursive_StandardCase() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 4});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{1, 3, 4});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 1, 2, 3, 4, 4});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Two standard sorted lists should merge correctly.");
    }

    @Test
    @DisplayName("Recursive: Should merge when first list is empty")
    void testMergeTwoListsRecursive_List1Empty() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{0});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{0});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging with empty list1 should return list2.");
    }

    @Test
    @DisplayName("Recursive: Should merge when second list is empty")
    void testMergeTwoListsRecursive_List2Empty() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging with empty list2 should return list1.");
    }

    @Test
    @DisplayName("Recursive: Should merge when both lists are empty")
    void testMergeTwoListsRecursive_BothEmpty() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertNull(result, "Merging two empty lists should return null.");
    }

    @Test
    @DisplayName("Recursive: Should merge lists of different lengths")
    void testMergeTwoListsRecursive_DifferentLengths() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 5, 7});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{2, 3, 4, 6, 8});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging lists of different lengths should work.");
    }

    @Test
    @DisplayName("Recursive: Should merge lists with one node each")
    void testMergeTwoListsRecursive_SingleNodes() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{5});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 5});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging single-node lists should work.");
    }

    @Test
    @DisplayName("Recursive: Should merge lists with all elements from one list smaller than other")
    void testMergeTwoListsRecursive_OneListEntirelySmaller() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{4, 5, 6});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "One list entirely smaller should merge correctly.");
    }

    @Test
    @DisplayName("Recursive: Should merge lists with negative values")
    void testMergeTwoListsRecursive_NegativeValues() {
        ListNode l1 = LinkedListUtils.createLinkedList(new int[]{-3, -1, 0});
        ListNode l2 = LinkedListUtils.createLinkedList(new int[]{-2, 1, 2});
        ListNode expected = LinkedListUtils.createLinkedList(new int[]{-3, -2, -1, 0, 1, 2});
        ListNode result = solver.mergeTwoListsRecursive(l1, l2);
        assertTrue(LinkedListUtils.areEqual(expected, result), "Merging lists with negative values should work.");
    }
}
```