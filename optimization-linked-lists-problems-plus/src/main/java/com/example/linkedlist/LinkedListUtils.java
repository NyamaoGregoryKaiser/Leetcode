```java
package com.example.linkedlist;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for Linked Lists, providing helper methods for creation, manipulation,
 * and comparison of LinkedListNode structures.
 */
public class LinkedListUtils {

    /**
     * Creates a singly linked list from an array of integers.
     *
     * @param arr The array of integers to convert into a linked list.
     * @return The head of the newly created linked list, or null if the array is null or empty.
     */
    public static LinkedListNode createLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }

        LinkedListNode head = new LinkedListNode(arr[0]);
        LinkedListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new LinkedListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    /**
     * Prints the values of a linked list to the console, separated by " -> ".
     *
     * @param head The head of the linked list to print.
     */
    public static void printLinkedList(LinkedListNode head) {
        if (head == null) {
            System.out.println("null");
            return;
        }

        LinkedListNode current = head;
        StringBuilder sb = new StringBuilder();
        while (current != null) {
            sb.append(current.val);
            if (current.next != null) {
                sb.append(" -> ");
            }
            current = current.next;
        }
        System.out.println(sb.toString());
    }

    /**
     * Converts a linked list to an ArrayList of integers.
     *
     * @param head The head of the linked list.
     * @return An ArrayList containing the values of the linked list in order, or an empty list if head is null.
     */
    public static List<Integer> toArrayList(LinkedListNode head) {
        List<Integer> list = new ArrayList<>();
        LinkedListNode current = head;
        while (current != null) {
            list.add(current.val);
            current = current.next;
        }
        return list;
    }

    /**
     * Compares two linked lists for equality. Two lists are considered equal if they have
     * the same length and contain the same values in the same order.
     *
     * @param head1 The head of the first linked list.
     * @param head2 The head of the second linked list.
     * @return True if the lists are equal, false otherwise.
     */
    public static boolean compareLinkedLists(LinkedListNode head1, LinkedListNode head2) {
        LinkedListNode c1 = head1;
        LinkedListNode c2 = head2;

        while (c1 != null && c2 != null) {
            if (c1.val != c2.val) {
                return false;
            }
            c1 = c1.next;
            c2 = c2.next;
        }

        // Both must be null for lists to be equal length
        return c1 == null && c2 == null;
    }

    /**
     * Creates a linked list with a cycle at a specific position.
     *
     * @param arr The array of integers to convert into a linked list.
     * @param pos The 0-indexed position where the cycle should begin.
     *            If pos is -1, no cycle is created.
     *            If pos is out of bounds, no cycle is created (or it's an error state).
     * @return The head of the newly created linked list.
     */
    public static LinkedListNode createLinkedListWithCycle(int[] arr, int pos) {
        if (arr == null || arr.length == 0) {
            return null;
        }

        LinkedListNode head = new LinkedListNode(arr[0]);
        LinkedListNode current = head;
        LinkedListNode cycleStartNode = null;

        if (pos == 0) {
            cycleStartNode = head;
        }

        for (int i = 1; i < arr.length; i++) {
            current.next = new LinkedListNode(arr[i]);
            current = current.next;
            if (i == pos) {
                cycleStartNode = current;
            }
        }

        // If a cycle start node was identified and exists, connect the tail to it.
        if (cycleStartNode != null && pos != -1) {
            current.next = cycleStartNode;
        }
        return head;
    }

    /**
     * Counts the number of nodes in a linked list.
     * @param head The head of the linked list.
     * @return The number of nodes, or 0 if the list is null.
     */
    public static int countNodes(LinkedListNode head) {
        int count = 0;
        LinkedListNode current = head;
        while (current != null) {
            count++;
            current = current.next;
        }
        return count;
    }
}
```