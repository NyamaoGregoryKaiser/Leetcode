```java
package com.example.linkedlist;

/**
 * Represents a node in a singly linked list.
 * This class provides a basic structure for linked list elements,
 * containing a value and a reference to the next node.
 */
public class LinkedListNode {
    public int val;          // The value stored in this node
    public LinkedListNode next; // Reference to the next node in the list

    /**
     * Constructs a new node with the specified value.
     * The next pointer is initialized to null.
     * @param val The integer value to store in this node.
     */
    public LinkedListNode(int val) {
        this.val = val;
        this.next = null;
    }

    /**
     * Constructs a new node with the specified value and next node.
     * This constructor is useful for building lists quickly.
     * @param val The integer value to store in this node.
     * @param next The next node in the list.
     */
    public LinkedListNode(int val, LinkedListNode next) {
        this.val = val;
        this.next = next;
    }

    /**
     * Overrides the toString method to provide a string representation of the node.
     * Useful for debugging and printing individual nodes.
     * @return A string representation of the node's value.
     */
    @Override
    public String toString() {
        return String.valueOf(val);
    }

    /**
     * Helper method to compare two LinkedListNodes for equality based on their values.
     * This is a shallow comparison, only checking the current node's value.
     * For deep comparison of entire lists, use LinkedListUtils.compareLinkedLists.
     * @param o The object to compare with.
     * @return true if the objects are equal (both are LinkedListNode and have the same value), false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LinkedListNode that = (LinkedListNode) o;
        return val == that.val;
    }

    /**
     * Overrides hashCode consistent with equals.
     * @return The hash code of the node.
     */
    @Override
    public int hashCode() {
        return val;
    }
}
```