```java
package com.example.linkedlist;

/**
 * Represents a node in a singly linked list.
 * This is a fundamental building block for all linked list problems.
 */
public class LinkedListNode {
    public int val;             // Value stored in the node
    public LinkedListNode next; // Reference to the next node in the list

    /**
     * Constructor for a node with a given value.
     * The 'next' pointer is initialized to null.
     * @param val The integer value to store in the node.
     */
    public LinkedListNode(int val) {
        this.val = val;
        this.next = null;
    }

    /**
     * Constructor for a node with a given value and a reference to the next node.
     * @param val The integer value to store in the node.
     * @param next The next LinkedListNode in the sequence.
     */
    public LinkedListNode(int val, LinkedListNode next) {
        this.val = val;
        this.next = next;
    }

    /**
     * Overrides the toString method to provide a string representation of the node's value.
     * This can be useful for debugging or simple printing.
     * For full list printing, use LinkedListUtils.printLinkedList.
     * @return A string representation of the node's value.
     */
    @Override
    public String toString() {
        return String.valueOf(val);
    }
}
```