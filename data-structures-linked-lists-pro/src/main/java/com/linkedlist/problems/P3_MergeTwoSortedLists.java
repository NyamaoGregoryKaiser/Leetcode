```java
package com.linkedlist.problems;

import com.linkedlist.ListNode;

/**
 * Problem 3: Merge Two Sorted Lists
 * Source: LeetCode 21 - https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * Description:
 * You are given the heads of two sorted linked lists `list1` and `list2`.
 * Merge the two lists into a single **sorted** list. The list should be made by splicing
 * together the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Example 1:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Example 2:
 * Input: list1 = [], list2 = []
 * Output: []
 *
 * Example 3:
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 *
 * Constraints:
 * The number of nodes in both lists is in the range [0, 50].
 * -100 <= Node.val <= 100
 * Both list1 and list2 are sorted in non-decreasing order.
 */
public class P3_MergeTwoSortedLists {

    /**
     * Approach 1: Iterative Solution
     *
     * This approach builds the merged list by iteratively comparing the heads of the two input lists.
     * It uses a dummy node to simplify handling the head of the new merged list.
     *
     * Logic:
     * 1. Create a `dummyHead` node. This node simplifies the process as we don't have to
     *    deal with null checks for the first node of the merged list.
     * 2. Create a `current` pointer, initialized to `dummyHead`. This pointer will always point
     *    to the last node of the merged list so far.
     * 3. Loop while both `list1` and `list2` are not `null`:
     *    a. Compare the values of `list1.val` and `list2.val`.
     *    b. Attach the node with the smaller value to `current.next`.
     *    c. Advance the pointer of the list from which the node was taken (e.g., if `list1.val` was smaller,
     *       then `list1 = list1.next`).
     *    d. Advance `current` to the newly attached node (`current = current.next`).
     * 4. After the loop, one of the lists might still have remaining elements (because the other list became null).
     *    Since both input lists are sorted, the remaining elements of the non-null list are already
     *    greater than or equal to all elements already merged. So, simply attach the rest of the non-null list
     *    to `current.next`.
     * 5. The actual head of the merged list is `dummyHead.next`.
     *
     * Time Complexity: O(M + N)
     * Where M is the number of nodes in `list1` and N is the number of nodes in `list2`.
     * We traverse both lists once, comparing each node. In the worst case, we might visit each node from both lists.
     *
     * Space Complexity: O(1)
     * We only use a few extra pointers (`dummyHead`, `current`, `list1`, `list2`), regardless of the list sizes.
     * No additional data structures are used.
     *
     * @param list1 The head of the first sorted linked list.
     * @param list2 The head of the second sorted linked list.
     * @return The head of the merged sorted linked list.
     */
    public ListNode mergeTwoListsIterative(ListNode list1, ListNode list2) {
        // Create a dummy node to serve as the head of the merged list.
        // This simplifies logic by avoiding special handling for the first node.
        ListNode dummyHead = new ListNode(0);
        ListNode current = dummyHead; // Pointer to the last node of the merged list

        // Iterate while both lists have elements
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1; // Attach node from list1
                list1 = list1.next;   // Advance list1 pointer
            } else {
                current.next = list2; // Attach node from list2
                list2 = list2.next;   // Advance list2 pointer
            }
            current = current.next; // Advance current pointer in the merged list
        }

        // If one of the lists is not exhausted, append the remaining part.
        // Since both input lists are sorted, the remaining elements are already in order.
        if (list1 != null) {
            current.next = list1;
        } else { // list2 != null (or both were null, in which case current.next will remain null)
            current.next = list2;
        }

        // The merged list starts from dummyHead.next (dummyHead itself is just a placeholder)
        return dummyHead.next;
    }

    /**
     * Approach 2: Recursive Solution
     *
     * This approach leverages recursion to merge the lists.
     *
     * Logic:
     * The base cases are when one of the lists is empty. In that case, the other list (or `null`)
     * is the result.
     *
     * Recursive Step:
     * 1. Compare the values of `list1.val` and `list2.val`.
     * 2. If `list1.val` is smaller (or equal), then `list1`'s current node is the first node
     *    of the merged list. Its `next` pointer should point to the result of merging `list1.next`
     *    with the entire `list2`.
     * 3. If `list2.val` is smaller, then `list2`'s current node is the first node of the merged list.
     *    Its `next` pointer should point to the result of merging the entire `list1` with `list2.next`.
     * 4. The function returns the chosen head node (either `list1` or `list2` from this step).
     *
     * Time Complexity: O(M + N)
     * Each recursive call processes one node and makes one or two comparisons. The total number
     * of nodes processed is M + N. The depth of the recursion can be up to M + N in the worst case
     * (e.g., one list is empty, the other is long, or nodes alternate perfectly).
     *
     * Space Complexity: O(M + N)
     * Due to the recursion stack. In the worst case, the depth of the recursion can be M + N,
     * consuming O(M + N) space on the call stack.
     *
     * @param list1 The head of the first sorted linked list.
     * @param list2 The head of the second sorted linked list.
     * @return The head of the merged sorted linked list.
     */
    public ListNode mergeTwoListsRecursive(ListNode list1, ListNode list2) {
        // Base cases: If either list is null, return the other list (which could also be null).
        if (list1 == null) {
            return list2;
        }
        if (list2 == null) {
            return list1;
        }

        ListNode head; // This will be the head of the merged sub-list

        // Compare the current nodes and decide which one becomes the head of the current merged segment
        if (list1.val <= list2.val) {
            head = list1;
            // The next node of 'head' will be the result of merging the rest of list1 with list2
            head.next = mergeTwoListsRecursive(list1.next, list2);
        } else {
            head = list2;
            // The next node of 'head' will be the result of merging list1 with the rest of list2
            head.next = mergeTwoListsRecursive(list1, list2.next);
        }

        return head;
    }
}
```