```java
package com.example.linkedlist;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the LinkedList problems in the `Problems` class.
 * Uses JUnit 5.
 */
public class ProblemsTest {

    private Problems problems;
    private Problems_Alternative problemsAlternative; // For testing alternative approaches

    @BeforeEach
    void setUp() {
        problems = new Problems();
        problemsAlternative = new Problems_Alternative();
    }

    // --- Test Cases for Problem 1: Reorder List ---

    @Test
    @DisplayName("Reorder List: Empty list")
    void testReorderList_Empty() {
        LinkedListNode head = null;
        problems.reorderList(head);
        assertNull(head, "Empty list should remain null.");
    }

    @Test
    @DisplayName("Reorder List: Single node list")
    void testReorderList_SingleNode() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1});
        problems.reorderList(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1})), "Single node list should remain unchanged.");
    }

    @Test
    @DisplayName("Reorder List: Two nodes list")
    void testReorderList_TwoNodes() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2});
        problems.reorderList(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 2})), "Two nodes list should remain unchanged (1->2).");
    }

    @Test
    @DisplayName("Reorder List: Even length list")
    void testReorderList_EvenLength() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4});
        problems.reorderList(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 4, 2, 3})), "Even length list reordering.");

        head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        problems.reorderList(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 6, 2, 5, 3, 4})), "Longer even length list reordering.");
    }

    @Test
    @DisplayName("Reorder List: Odd length list")
    void testReorderList_OddLength() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        problems.reorderList(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 5, 2, 4, 3})), "Odd length list reordering.");

        head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        problems.reorderList(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 3, 2})), "Shorter odd length list reordering.");
    }

    @Test
    @DisplayName("Reorder List Alternative: Even length list")
    void testReorderListAlternative_EvenLength() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4});
        problemsAlternative.reorderListBruteForce(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 4, 2, 3})), "Alternative Even length list reordering.");
    }

    @Test
    @DisplayName("Reorder List Alternative: Odd length list")
    void testReorderListAlternative_OddLength() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        problemsAlternative.reorderListBruteForce(head);
        assertTrue(LinkedListUtils.areEqual(head, LinkedListUtils.createLinkedList(new int[]{1, 5, 2, 4, 3})), "Alternative Odd length list reordering.");
    }

    // --- Test Cases for Problem 2: Add Two Numbers ---

    @Test
    @DisplayName("Add Two Numbers: Basic case")
    void testAddTwoNumbers_Basic() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{2, 4, 3}); // 342
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{5, 6, 4}); // 465
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{7, 0, 8}); // 807
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));
    }

    @Test
    @DisplayName("Add Two Numbers: Different lengths")
    void testAddTwoNumbers_DifferentLengths() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{9, 9, 9, 9}); // 9999
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{9, 9});       // 99
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{8, 9, 0, 0, 1}); // 10098
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));

        l1 = LinkedListUtils.createLinkedList(new int[]{1});
        l2 = LinkedListUtils.createLinkedList(new int[]{9, 9, 9});
        expected = LinkedListUtils.createLinkedList(new int[]{0, 0, 0, 1});
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));
    }

    @Test
    @DisplayName("Add Two Numbers: Carry at the end")
    void testAddTwoNumbers_CarryAtEnd() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{9});
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{1});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{0, 1}); // 10
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));

        l1 = LinkedListUtils.createLinkedList(new int[]{9, 9});
        l2 = LinkedListUtils.createLinkedList(new int[]{1});
        expected = LinkedListUtils.createLinkedList(new int[]{0, 0, 1}); // 100
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));
    }

    @Test
    @DisplayName("Add Two Numbers: Zeroes")
    void testAddTwoNumbers_Zeroes() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{0});
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{0});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{0});
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));

        l1 = LinkedListUtils.createLinkedList(new int[]{5});
        l2 = LinkedListUtils.createLinkedList(new int[]{0});
        expected = LinkedListUtils.createLinkedList(new int[]{5});
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), expected));
    }

    @Test
    @DisplayName("Add Two Numbers: One list null")
    void testAddTwoNumbers_OneListNull() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        LinkedListNode l2 = null;
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l1, l2), LinkedListUtils.createLinkedList(new int[]{1, 2, 3})));
        assertTrue(LinkedListUtils.areEqual(problems.addTwoNumbers(l2, l1), LinkedListUtils.createLinkedList(new int[]{1, 2, 3})));
    }

    @Test
    @DisplayName("Add Two Numbers Recursive: Basic case")
    void testAddTwoNumbersRecursive_Basic() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{2, 4, 3}); // 342
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{5, 6, 4}); // 465
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{7, 0, 8}); // 807
        assertTrue(LinkedListUtils.areEqual(problemsAlternative.addTwoNumbersRecursive(l1, l2), expected));
    }

    // --- Test Cases for Problem 3: Merge k Sorted Lists ---

    @Test
    @DisplayName("Merge K Lists: Basic case")
    void testMergeKLists_Basic() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 4, 5});
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{1, 3, 4});
        LinkedListNode l3 = LinkedListUtils.createLinkedList(new int[]{2, 6});
        LinkedListNode[] lists = new LinkedListNode[]{l1, l2, l3};
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 1, 2, 3, 4, 4, 5, 6});
        assertTrue(LinkedListUtils.areEqual(problems.mergeKLists(lists), expected));
    }

    @Test
    @DisplayName("Merge K Lists: Empty input array")
    void testMergeKLists_EmptyArray() {
        LinkedListNode[] lists = new LinkedListNode[]{};
        assertNull(problems.mergeKLists(lists), "Should return null for an empty array of lists.");
    }

    @Test
    @DisplayName("Merge K Lists: Array with null lists")
    void testMergeKLists_ArrayWithNulls() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 5});
        LinkedListNode l2 = null;
        LinkedListNode l3 = LinkedListUtils.createLinkedList(new int[]{2, 4});
        LinkedListNode[] lists = new LinkedListNode[]{l1, l2, l3};
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 4, 5});
        assertTrue(LinkedListUtils.areEqual(problems.mergeKLists(lists), expected));
    }

    @Test
    @DisplayName("Merge K Lists: All lists are empty")
    void testMergeKLists_AllEmpty() {
        LinkedListNode[] lists = new LinkedListNode[]{null, null, null};
        assertNull(problems.mergeKLists(lists), "Should return null if all lists are null.");
    }

    @Test
    @DisplayName("Merge K Lists: Single list in array")
    void testMergeKLists_SingleList() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        LinkedListNode[] lists = new LinkedListNode[]{l1};
        assertTrue(LinkedListUtils.areEqual(problems.mergeKLists(lists), LinkedListUtils.createLinkedList(new int[]{1, 2, 3})), "Should return the single list itself.");
    }

    @Test
    @DisplayName("Merge K Lists: Lists with varying lengths and values")
    void testMergeKLists_VaryingLengths() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{10});
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        LinkedListNode l3 = LinkedListUtils.createLinkedList(new int[]{5, 8, 12, 15});
        LinkedListNode[] lists = new LinkedListNode[]{l1, l2, l3};
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 5, 8, 10, 12, 15});
        assertTrue(LinkedListUtils.areEqual(problems.mergeKLists(lists), expected));
    }

    @Test
    @DisplayName("Merge K Lists Alternative: Basic case")
    void testMergeKListsAlternative_Basic() {
        LinkedListNode l1 = LinkedListUtils.createLinkedList(new int[]{1, 4, 5});
        LinkedListNode l2 = LinkedListUtils.createLinkedList(new int[]{1, 3, 4});
        LinkedListNode l3 = LinkedListUtils.createLinkedList(new int[]{2, 6});
        LinkedListNode[] lists = new LinkedListNode[]{l1, l2, l3};
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 1, 2, 3, 4, 4, 5, 6});
        assertTrue(LinkedListUtils.areEqual(problemsAlternative.mergeKListsIterative(lists), expected));
    }

    // --- Test Cases for Problem 4: Reverse Nodes in k-Group ---

    @Test
    @DisplayName("Reverse K Group: k = 1 (no change)")
    void testReverseKGroup_KIsOne() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 1), expected));
    }

    @Test
    @DisplayName("Reverse K Group: k = length of list (reverse all)")
    void testReverseKGroup_KIsLength() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{3, 2, 1});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 3), expected));
    }

    @Test
    @DisplayName("Reverse K Group: k = 2, even length")
    void testReverseKGroup_K2Even() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{2, 1, 4, 3});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 2), expected));
    }

    @Test
    @DisplayName("Reverse K Group: k = 2, odd length (remainder unchanged)")
    void testReverseKGroup_K2Odd() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{2, 1, 4, 3, 5});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 2), expected));
    }

    @Test
    @DisplayName("Reverse K Group: k = 3, odd length (remainder unchanged)")
    void testReverseKGroup_K3Odd() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{3, 2, 1, 4, 5});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 3), expected));
    }

    @Test
    @DisplayName("Reverse K Group: Empty list")
    void testReverseKGroup_Empty() {
        assertNull(problems.reverseKGroup(null, 2), "Empty list should return null.");
    }

    @Test
    @DisplayName("Reverse K Group: Single node list")
    void testReverseKGroup_SingleNode() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 2), expected), "Single node list with k>1 should be unchanged.");
    }

    @Test
    @DisplayName("Reverse K Group: List shorter than k")
    void testReverseKGroup_ShorterThanK() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{1, 2});
        assertTrue(LinkedListUtils.areEqual(problems.reverseKGroup(head, 3), expected), "List shorter than k should be unchanged.");
    }

    @Test
    @DisplayName("Reverse K Group Recursive: k = 2, even length")
    void testReverseKGroupRecursive_K2Even() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{2, 1, 4, 3});
        assertTrue(LinkedListUtils.areEqual(problemsAlternative.reverseKGroupRecursive(head, 2), expected));
    }

    @Test
    @DisplayName("Reverse K Group Recursive: k = 3, odd length (remainder unchanged)")
    void testReverseKGroupRecursive_K3Odd() {
        LinkedListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        LinkedListNode expected = LinkedListUtils.createLinkedList(new int[]{3, 2, 1, 4, 5});
        assertTrue(LinkedListUtils.areEqual(problemsAlternative.reverseKGroupRecursive(head, 3), expected));
    }
}
```