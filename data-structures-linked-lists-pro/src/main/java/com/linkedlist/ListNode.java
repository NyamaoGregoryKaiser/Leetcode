```java
package com.linkedlist;

/**
 * Definition for a singly-linked list node.
 * This class represents a single node in a linked list.
 * It contains an integer value and a reference to the next node in the list.
 */
public class ListNode {
    public int val;       // The value stored in the node
    public ListNode next;  // Reference to the next node in the list

    /**
     * Constructor to create a node with a given value.
     * The next pointer is initialized to null.
     * @param val The integer value for the node.
     */
    public ListNode(int val) {
        this.val = val;
        this.next = null; // By default, a new node doesn't point to anything
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
     * Overrides the toString method to provide a string representation of the node.
     * Useful for debugging and printing a single node's value.
     * For printing the whole list, use LinkedListUtils.printList().
     * @return A string representation of the node's value.
     */
    @Override
    public String toString() {
        return String.valueOf(val);
    }

    /**
     * Custom equals method to compare two ListNode objects based on their values.
     * Note: This only compares the current node's value, not the entire list.
     * For comparing entire lists, use LinkedListUtils.areEqual().
     * @param o The object to compare with.
     * @return true if the values are equal, false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListNode listNode = (ListNode) o;
        return val == listNode.val;
    }

    /**
     * Custom hashCode method consistent with the custom equals method.
     * @return The hash code of the node's value.
     */
    @Override
    public int hashCode() {
        return Integer.hashCode(val);
    }
}
```