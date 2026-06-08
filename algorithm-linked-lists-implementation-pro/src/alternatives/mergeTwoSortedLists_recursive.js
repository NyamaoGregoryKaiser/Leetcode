```javascript
/**
 * @fileoverview Alternative Solution: Merge Two Sorted Lists (Recursive)
 * This file provides a recursive solution for merging two sorted linked lists.
 */

const ListNode = require('../utils/ListNode');

/**
 * Merges two sorted singly linked lists into a single sorted list recursively.
 *
 * The recursive approach breaks down the problem:
 * 1. Base cases: If either list is null, return the other list (or null if both are null).
 * 2. Recursive step: Compare the heads of `list1` and `list2`.
 *    a. If `list1.val` is smaller or equal, `list1`'s current node is the head of the merged list.
 *       Then, recursively merge `list1.next` with `list2`, and attach the result to `list1.next`.
 *    b. If `list2.val` is smaller, `list2`'s current node is the head of the merged list.
 *       Then, recursively merge `list1` with `list2.next`, and attach the result to `list2.next`.
 *
 * @param {ListNode | null} list1 The head of the first sorted linked list.
 * @param {ListNode | null} list2 The head of the second sorted linked list.
 * @returns {ListNode | null} The head of the merged sorted linked list.
 *
 * Time Complexity: O(M + N) where M and N are the number of nodes in `list1` and `list2` respectively.
 *                  Each node is visited and compared exactly once across all recursive calls.
 * Space Complexity: O(M + N) due to the recursion stack. In the worst case (e.g., one list much longer),
 *                   the stack depth can be M + N. This can lead to stack overflow for very long lists.
 */
function mergeTwoSortedListsRecursive(list1, list2) {
    // Base case 1: If list1 is empty, return list2 (which could also be empty).
    if (list1 === null) {
        return list2;
    }
    // Base case 2: If list2 is empty, return list1.
    if (list2 === null) {
        return list1;
    }

    // Recursive step: Compare current nodes and decide which one comes first.
    if (list1.val <= list2.val) {
        // If list1's current node is smaller or equal, it's the head of the merged list.
        // Recursively merge the rest of list1 (list1.next) with list2,
        // and attach the result to list1.next.
        list1.next = mergeTwoSortedListsRecursive(list1.next, list2);
        return list1; // Return the current list1 node as the head
    } else {
        // If list2's current node is smaller, it's the head of the merged list.
        // Recursively merge list1 with the rest of list2 (list2.next),
        // and attach the result to list2.next.
        list2.next = mergeTwoSortedListsRecursive(list1, list2.next);
        return list2; // Return the current list2 node as the head
    }
}

module.exports = mergeTwoSortedListsRecursive;
```