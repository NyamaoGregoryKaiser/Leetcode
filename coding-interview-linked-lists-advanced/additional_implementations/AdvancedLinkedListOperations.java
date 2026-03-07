```java
package com.example.linkedlist;

import java.util.HashSet;
import java.util.Set;

/**
 * This class contains implementations for more advanced or specific
 * Linked List operations, focusing on efficiency and different problem types.
 */
public class AdvancedLinkedListOperations {

    /**
     * Problem: Get Intersection Node of Two Linked Lists
     * Given the heads of two singly linked lists headA and headB, return the node at which
     * the two lists intersect. If the two linked lists have no intersection at all, return null.
     *
     * Approach 1: Using Length Differences (O(1) space)
     * 1. Calculate the lengths of both lists, L1 and L2.
     * 2. Find the difference in lengths, `diff = |L1 - L2|`.
     * 3. Advance the pointer of the longer list by `diff` steps. This makes both pointers equidistant from the intersection point.
     * 4. Now, traverse both lists simultaneously, one step at a time. The first node where they meet is the intersection node.
     * 5. If they reach `null` simultaneously, there is no intersection.
     *
     * Time Complexity: O(L1 + L2). We iterate through each list once to find length, and then at most once more to find intersection.
     * Space Complexity: O(1). Only a few pointers are used.
     *
     * @param headA The head of the first linked list.
     * @param headB The head of the second linked list.
     * @return The intersection node, or null if no intersection.
     */
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }

        // Step 1: Calculate lengths
        int lenA = getLength(headA);
        int lenB = getLength(headB);

        // Step 2: Determine longer list and difference
        ListNode ptrA = headA;
        ListNode ptrB = headB;
        int diff = 0;

        if (lenA > lenB) {
            diff = lenA - lenB;
            // Step 3: Advance longer list's pointer
            for (int i = 0; i < diff; i++) {
                ptrA = ptrA.next;
            }
        } else {
            diff = lenB - lenA;
            // Step 3: Advance longer list's pointer
            for (int i = 0; i < diff; i++) {
                ptrB = ptrB.next;
            }
        }

        // Step 4: Traverse both lists simultaneously until they meet
        while (ptrA != null && ptrB != null) {
            if (ptrA == ptrB) {
                return ptrA; // Intersection found
            }
            ptrA = ptrA.next;
            ptrB = ptrB.next;
        }

        return null; // No intersection
    }

    // Helper to get length of a linked list
    private int getLength(ListNode head) {
        int length = 0;
        ListNode current = head;
        while (current != null) {
            length++;
            current = current.next;
        }
        return length;
    }


    /**
     * Problem: Get Intersection Node of Two Linked Lists
     * Approach 2: Using a Set (O(N) space)
     * 1. Traverse listA and store all its nodes in a HashSet.
     * 2. Traverse listB. For each node in listB, check if it exists in the HashSet.
     * 3. The first node of listB found in the HashSet is the intersection node.
     * 4. If listB is fully traversed without finding a match, there's no intersection.
     *
     * Time Complexity: O(L1 + L2). L1 to put all nodes of listA into set, L2 to check nodes of listB.
     * Space Complexity: O(L1). The HashSet stores up to L1 nodes.
     *
     * @param headA The head of the first linked list.
     * @param headB The head of the second linked list.
     * @return The intersection node, or null if no intersection.
     */
    public ListNode getIntersectionNodeHashSet(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }

        Set<ListNode> nodesInA = new HashSet<>();
        ListNode current = headA;
        while (current != null) {
            nodesInA.add(current);
            current = current.next;
        }

        current = headB;
        while (current != null) {
            if (nodesInA.contains(current)) {
                return current; // Intersection found
            }
            current = current.next;
        }

        return null; // No intersection
    }

    /**
     * Problem: Remove Duplicates from Unsorted Linked List (In-place, O(1) space)
     * Given the head of an unsorted linked list, delete all duplicate nodes
     * such that each element appears only once.
     *
     * Note: This is a challenging problem to do in O(1) space because the list is unsorted.
     * A common approach with O(N) space uses a HashSet to track seen elements (similar to approach 2 for intersection).
     * The O(1) space approach typically involves nested loops.
     *
     * Approach: Two Pointers (Current and Runner) - O(1) Space
     * 1. Use a `current` pointer to iterate through the list.
     * 2. For each `current` node, use a `runner` pointer (starting from `current`) to check for duplicates in the rest of the list.
     * 3. `runner` (specifically `runner.next`) checks if its value is equal to `current.val`.
     * 4. If a duplicate is found (`runner.next.val == current.val`), bypass it: `runner.next = runner.next.next`.
     * 5. If no duplicate is found, simply advance `runner`: `runner = runner.next`.
     *
     * Time Complexity: O(N^2). For each of N nodes, the runner pointer traverses up to N-1 nodes.
     * Space Complexity: O(1). No auxiliary data structures are used.
     *
     * @param head The head of the unsorted linked list.
     * @return The head of the list with duplicates removed.
     */
    public ListNode removeDuplicatesUnsortedO1Space(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode current = head;
        while (current != null) {
            ListNode runner = current; // Runner starts from current
            while (runner.next != null) {
                if (runner.next.val == current.val) {
                    // Duplicate found, bypass it
                    runner.next = runner.next.next;
                } else {
                    // No duplicate, move runner forward
                    runner = runner.next;
                }
            }
            current = current.next; // Move to the next unique element to check
        }
        return head;
    }

    /**
     * Problem: Remove Duplicates from Unsorted Linked List (O(N) space)
     * Given the head of an unsorted linked list, delete all duplicate nodes
     * such that each element appears only once.
     *
     * Approach: Using a HashSet
     * 1. Use a `Set` to store values of nodes encountered so far.
     * 2. Use two pointers: `current` (to traverse) and `prev` (to link nodes).
     * 3. Iterate through the list with `current`.
     * 4. If `current.val` is already in the set, it's a duplicate. Bypass `current`: `prev.next = current.next`.
     * 5. If `current.val` is not in the set, add it to the set and advance `prev = current`.
     * 6. Always advance `current` to `current.next`.
     *
     * Time Complexity: O(N). Each node is visited once, and set operations (add, contains) are O(1) on average.
     * Space Complexity: O(N) in the worst case (all unique elements) for the HashSet.
     *
     * @param head The head of the unsorted linked list.
     * @return The head of the list with duplicates removed.
     */
    public ListNode removeDuplicatesUnsortedONSpace(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        Set<Integer> seen = new HashSet<>();
        ListNode current = head;
        ListNode prev = null; // We need a 'previous' pointer to modify links

        while (current != null) {
            if (seen.contains(current.val)) {
                // Duplicate found, remove current node by bypassing it
                prev.next = current.next;
            } else {
                // Not a duplicate, add to set and move prev forward
                seen.add(current.val);
                prev = current;
            }
            current = current.next;
        }
        return head;
    }
}
```