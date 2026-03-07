```java
package com.example.linkedlist;

/**
 * Definition for singly-linked list.
 * This class represents a node in a singly linked list.
 */
public class ListNode {
    public int val;       // The value stored in the node
    public ListNode next; // Reference to the next node in the list

    /**
     * Constructor to create a node with a given value.
     * The next pointer is initialized to null.
     * @param val The integer value for the node.
     */
    public ListNode(int val) {
        this.val = val;
        this.next = null;
    }

    /**
     * Constructor to create a node with a given value and a reference to the next node.
     * @param val The integer value for the node.
     * @param next The next ListNode in the sequence.
     */
    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }

    /**
     * Helper method to convert a ListNode (head of a list) to a string representation.
     * Useful for printing and debugging.
     * @param head The head of the linked list.
     * @return A string representing the linked list (e.g., "1 -> 2 -> 3 -> NULL").
     */
    public static String toString(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode current = head;
        while (current != null) {
            sb.append(current.val).append(" -> ");
            current = current.next;
        }
        sb.append("NULL");
        return sb.toString();
    }

    /**
     * Helper method to create a linked list from an array of integers.
     * @param arr An array of integers to be converted into a linked list.
     * @return The head of the newly created linked list.
     */
    public static ListNode fromArray(int[] arr) {
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
     * Overrides the default `equals` method to compare two ListNode objects.
     * This method checks if two ListNode objects are identical by value.
     * @param obj The object to compare with.
     * @return true if the objects have the same value, false otherwise.
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ListNode other = (ListNode) obj;
        return val == other.val;
    }

    /**
     * Overrides the default `hashCode` method, consistent with `equals`.
     * @return The hash code for this ListNode.
     */
    @Override
    public int hashCode() {
        return Integer.hashCode(val);
    }
}
```