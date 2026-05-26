```java
package com.example.linkedlist;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for Linked List operations,
 * such as creation from an array, printing, and comparison.
 */
public class LinkedListUtils {

    /**
     * Creates a singly linked list from an array of integers.
     *
     * @param arr The array of integers to convert into a linked list.
     * @return The head of the created linked list. Returns null if the array is null or empty.
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
     * Prints the elements of a linked list to the console.
     *
     * @param head The head of the linked list to print.
     */
    public static void printLinkedList(LinkedListNode head) {
        if (head == null) {
            System.out.println("null");
            return;
        }

        StringBuilder sb = new StringBuilder();
        LinkedListNode current = head;
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
     * Converts a linked list into a List of Integers.
     * Useful for comparison or further processing.
     *
     * @param head The head of the linked list.
     * @return A List of Integers representing the linked list. Returns an empty list if head is null.
     */
    public static List<Integer> toList(LinkedListNode head) {
        List<Integer> list = new ArrayList<>();
        LinkedListNode current = head;
        while (current != null) {
            list.add(current.val);
            current = current.next;
        }
        return list;
    }

    /**
     * Compares two linked lists for equality.
     * Two lists are considered equal if they have the same length and
     * the same values in the same order.
     *
     * @param l1 The head of the first linked list.
     * @param l2 The head of the second linked list.
     * @return True if the lists are equal, false otherwise.
     */
    public static boolean areEqual(LinkedListNode l1, LinkedListNode l2) {
        while (l1 != null && l2 != null) {
            if (l1.val != l2.val) {
                return false;
            }
            l1 = l1.next;
            l2 = l2.next;
        }
        // If one list is longer than the other, they are not equal.
        // Both must be null at the same time for equality.
        return l1 == null && l2 == null;
    }
}
```