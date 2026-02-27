```java
package com.codinginterview.heapoperations.utils;

/**
 * Definition for singly-linked list.
 * This class is a standard utility for linked list problems.
 */
public class ListNode {
    public int val;
    public ListNode next;

    public ListNode() {}

    public ListNode(int val) {
        this.val = val;
    }

    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }

    /**
     * Helper method to convert an array to a ListNode chain.
     *
     * @param arr The array of integers.
     * @return The head of the linked list.
     */
    public static ListNode fromArray(int[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        for (int val : arr) {
            current.next = new ListNode(val);
            current = current.next;
        }
        return dummy.next;
    }

    /**
     * Helper method to convert a ListNode chain to an array.
     *
     * @param head The head of the linked list.
     * @return An array of integers representing the linked list.
     */
    public static int[] toArray(ListNode head) {
        if (head == null) {
            return new int[0];
        }
        java.util.List<Integer> list = new java.util.ArrayList<>();
        ListNode current = head;
        while (current != null) {
            list.add(current.val);
            current = current.next;
        }
        return list.stream().mapToInt(i -> i).toArray();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        ListNode current = this;
        while (current != null) {
            sb.append(current.val);
            if (current.next != null) {
                sb.append(" -> ");
            }
            current = current.next;
        }
        return sb.toString();
    }
}
```