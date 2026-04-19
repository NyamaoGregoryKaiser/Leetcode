```java
package com.linkedlist;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for Linked List operations.
 * Provides methods to create, print, compare, and manipulate linked lists,
 * especially useful for testing and debugging.
 */
public class LinkedListUtils {

    /**
     * Creates a singly linked list from an array of integers.
     *
     * @param arr The array of integers to convert into a linked list.
     * @return The head of the created linked list, or null if the array is null or empty.
     */
    public static ListNode createLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }

        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    /**
     * Creates a singly linked list with a cycle at a specified position.
     *
     * @param arr The array of integers to convert into a linked list.
     * @param pos The 0-indexed position where the cycle should begin.
     *            If pos is -1, no cycle is created.
     *            If pos is out of bounds, an IllegalArgumentException is thrown.
     * @return The head of the created linked list, possibly with a cycle.
     * @throws IllegalArgumentException if pos is out of bounds for non-empty array and not -1.
     */
    public static ListNode createListWithCycle(int[] arr, int pos) {
        if (arr == null || arr.length == 0) {
            return null;
        }

        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        ListNode cycleStartNode = null;

        if (pos == 0) {
            cycleStartNode = head; // Cycle starts at the head
        }

        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
            if (i == pos) {
                cycleStartNode = current; // Node at 'pos' is the cycle start
            }
        }

        if (pos != -1) {
            if (cycleStartNode == null) { // This means pos was out of bounds if arr not empty
                throw new IllegalArgumentException("Position " + pos + " is out of bounds for list of length " + arr.length);
            }
            current.next = cycleStartNode; // Last node points to the cycle start node
        }
        return head;
    }

    /**
     * Gets the Nth node (0-indexed) from the head of the linked list.
     *
     * @param head The head of the linked list.
     * @param n The 0-indexed position of the node to retrieve.
     * @return The ListNode at the specified position, or null if the position is out of bounds.
     */
    public static ListNode getNthNode(ListNode head, int n) {
        ListNode current = head;
        int count = 0;
        while (current != null && count < n) {
            current = current.next;
            count++;
        }
        return current;
    }

    /**
     * Prints the elements of a linked list to the console.
     * For lists with cycles, it prints up to a certain number of elements to avoid infinite loops,
     * and indicates if a cycle is detected.
     *
     * @param head The head of the linked list to print.
     */
    public static void printList(ListNode head) {
        if (head == null) {
            System.out.println("NULL");
            return;
        }

        ListNode slow = head;
        ListNode fast = head;
        boolean hasCycle = false;
        // Detect cycle using Floyd's Tortoise and Hare algorithm
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }

        ListNode current = head;
        int count = 0;
        // Max nodes to print to avoid excessively long output for very long lists or subtle cycles
        int maxPrintNodes = 20;

        StringBuilder sb = new StringBuilder();
        while (current != null && count < maxPrintNodes) {
            sb.append(current.val);
            if (current.next != null && (hasCycle && current.next == slow && count > 0)) { // Don't print "->" if it's the cycle point
                sb.append(" -> (Cycle Detected at ");
                sb.append(slow.val).append(")");
                break; // Stop printing further to avoid infinite loop output
            }
            if (current.next != null) {
                sb.append(" -> ");
            }
            current = current.next;
            count++;
        }
        if (current != null && count == maxPrintNodes) {
            sb.append(" ... (truncated)");
        } else if (current == null) {
            sb.append(" -> NULL");
        }
        System.out.println(sb.toString());
    }

    /**
     * Compares two linked lists for equality.
     * Two lists are equal if they have the same values in the same order and are of the same length.
     * This method does NOT detect or handle cycles. It will loop infinitely if a cycle is present.
     *
     * @param l1 The head of the first linked list.
     * @param l2 The head of the second linked list.
     * @return true if the lists are equal, false otherwise.
     */
    public static boolean areEqual(ListNode l1, ListNode l2) {
        while (l1 != null && l2 != null) {
            if (l1.val != l2.val) {
                return false;
            }
            l1 = l1.next;
            l2 = l2.next;
        }
        // Both should be null if lists were of same length and had same elements
        return l1 == null && l2 == null;
    }

    /**
     * Converts a linked list to an ArrayList of integers.
     * Useful for comparing linked lists in tests, especially when dealing with cycles
     * where direct list comparison might be tricky or infinite.
     *
     * @param head The head of the linked list.
     * @return An ArrayList containing the values of the linked list nodes,
     *         or an empty list if head is null.
     *         For cyclic lists, it will include nodes up to the point of cycle detection (non-repeating part).
     */
    public static List<Integer> toList(ListNode head) {
        List<Integer> list = new ArrayList<>();
        if (head == null) {
            return list;
        }

        ListNode slow = head;
        ListNode fast = head;
        ListNode cycleStart = null;
        boolean hasCycle = false;

        // Detect cycle and find cycle start
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                cycleStart = slow; // Meeting point
                break;
            }
        }

        ListNode current = head;
        while (current != null) {
            list.add(current.val);
            if (hasCycle && current.next == cycleStart) {
                // If current.next is the cycle start, we've reached the end of the non-repeating part.
                // We could optionally add elements of the cycle until we hit cycleStart again if needed,
                // but for basic representation, stopping before repeating is common.
                // For this utility, we'll just capture the non-repeating part + one full cycle if it exists from cycleStart.
                // For simplicity here, we'll stop if we've added a node that is part of the cycle starting point for the *second time*.
                // A better approach for cyclic list to array would be:
                // 1. Add all elements before cycle
                // 2. Add elements of the cycle once
                // This 'toList' for a cycle will stop at the *first* encounter of `cycleStart` during the full linear scan.
                // A better approach is to use a set to track visited nodes during the conversion.
                break; // Stop before repeating cycle elements for simple representation
            }
            current = current.next;
            // A more robust way to handle cycles in toList:
            // Use a Set<ListNode> visitedNodes to prevent infinite loop and collect nodes.
            // If current.next is already in visitedNodes, break.
        }

        // Robust toList with cycle detection using a Set
        list.clear(); // Clear existing
        java.util.Set<ListNode> visitedNodes = new java.util.HashSet<>();
        current = head;
        while (current != null && visitedNodes.add(current)) {
            list.add(current.val);
            current = current.next;
        }
        return list;
    }
}

```