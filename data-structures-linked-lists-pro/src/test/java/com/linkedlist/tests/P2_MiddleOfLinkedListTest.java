```java
package com.linkedlist.tests;

import com.linkedlist.ListNode;
import com.linkedlist.LinkedListUtils;
import com.linkedlist.problems.P2_MiddleOfLinkedList;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("P2: Middle of Linked List Tests")
class P2_MiddleOfLinkedListTest {

    private final P2_MiddleOfLinkedList solver = new P2_MiddleOfLinkedList();

    // --- Fast and Slow Pointers Tests ---

    @Test
    @DisplayName("Fast/Slow: Should find middle of an odd-length list")
    void testFindMiddle_OddLengthList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        ListNode middleNode = solver.findMiddle(head);
        assertEquals(3, middleNode.val, "Middle node for [1,2,3,4,5] should be 3.");
    }

    @Test
    @DisplayName("Fast/Slow: Should find the second middle of an even-length list")
    void testFindMiddle_EvenLengthList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        ListNode middleNode = solver.findMiddle(head);
        assertEquals(4, middleNode.val, "Second middle node for [1,2,3,4,5,6] should be 4.");
    }

    @Test
    @DisplayName("Fast/Slow: Should handle a single-node list")
    void testFindMiddle_SingleNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode middleNode = solver.findMiddle(head);
        assertEquals(1, middleNode.val, "Middle node for [1] should be 1.");
    }

    @Test
    @DisplayName("Fast/Slow: Should handle a two-node list")
    void testFindMiddle_TwoNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2});
        ListNode middleNode = solver.findMiddle(head);
        assertEquals(2, middleNode.val, "Middle node for [1,2] should be 2 (second middle).");
    }

    @Test
    @DisplayName("Fast/Slow: Should handle a list with three nodes")
    void testFindMiddle_ThreeNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode middleNode = solver.findMiddle(head);
        assertEquals(2, middleNode.val, "Middle node for [1,2,3] should be 2.");
    }

    // Constraint: List will not be empty. So no test for null head needed.

    // --- Count Nodes (Two-Pass) Tests ---

    @Test
    @DisplayName("Count Nodes: Should find middle of an odd-length list")
    void testFindMiddleWithCount_OddLengthList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5});
        ListNode middleNode = solver.findMiddleWithCount(head);
        assertEquals(3, middleNode.val, "Middle node for [1,2,3,4,5] should be 3.");
    }

    @Test
    @DisplayName("Count Nodes: Should find the second middle of an even-length list")
    void testFindMiddleWithCount_EvenLengthList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        ListNode middleNode = solver.findMiddleWithCount(head);
        assertEquals(4, middleNode.val, "Second middle node for [1,2,3,4,5,6] should be 4.");
    }

    @Test
    @DisplayName("Count Nodes: Should handle a single-node list")
    void testFindMiddleWithCount_SingleNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1});
        ListNode middleNode = solver.findMiddleWithCount(head);
        assertEquals(1, middleNode.val, "Middle node for [1] should be 1.");
    }

    @Test
    @DisplayName("Count Nodes: Should handle a two-node list")
    void testFindMiddleWithCount_TwoNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2});
        ListNode middleNode = solver.findMiddleWithCount(head);
        assertEquals(2, middleNode.val, "Middle node for [1,2] should be 2 (second middle).");
    }

    @Test
    @DisplayName("Count Nodes: Should handle a list with three nodes")
    void testFindMiddleWithCount_ThreeNodeList() {
        ListNode head = LinkedListUtils.createLinkedList(new int[]{1, 2, 3});
        ListNode middleNode = solver.findMiddleWithCount(head);
        assertEquals(2, middleNode.val, "Middle node for [1,2,3] should be 2.");
    }
}
```