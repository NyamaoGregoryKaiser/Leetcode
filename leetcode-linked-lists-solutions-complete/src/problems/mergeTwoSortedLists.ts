import { ListNode } from '@data-structures/ListNode';

/**
 * Problem: Merge Two Sorted Lists
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into a single sorted list.
 * The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 */

/**
 * Solution 1: Iterative Approach
 *
 * This approach uses a dummy node to simplify the logic of handling the head of the merged list.
 * It iterates through both lists, comparing the values of the current nodes and appending the
 * smaller one to the merged list.
 *
 * 1. Create a dummy node. This node simplifies edge cases like an empty merged list.
 * 2. Initialize a `current` pointer to the dummy node. This pointer will traverse and build the merged list.
 * 3. Iterate while both `list1` and `list2` are not `null`:
 *    a. If `list1.val` is less than or equal to `list2.val`:
 *       Append `list1` to the merged list (`current.next = list1`).
 *       Move `list1` to its next node (`list1 = list1.next`).
 *    b. Else (if `list2.val` is smaller):
 *       Append `list2` to the merged list (`current.next = list2`).
 *       Move `list2` to its next node (`list2 = list2.next`).
 *    c. Move `current` to its next node (`current = current.next`).
 * 4. After the loop, one of the lists might still have remaining elements.
 *    Append the non-null remainder of `list1` or `list2` to the merged list.
 *    (`current.next = list1 || list2`).
 * 5. Return `dummy.next`, which is the actual head of the merged sorted list.
 *
 * @param list1 The head of the first sorted linked list.
 * @param list2 The head of the second sorted linked list.
 * @returns The head of the merged sorted linked list.
 *
 * Time Complexity: O(M + N) where M and N are the number of nodes in `list1` and `list2` respectively.
 *                  In the worst case, we visit each node from both lists exactly once.
 * Space Complexity: O(1) if we modify the existing nodes' `next` pointers.
 *                   If a new list is always created (e.g., in some recursive implementations), it would be O(M+N).
 *                   This iterative solution reuses existing nodes, so it's O(1) auxiliary space.
 */
export function mergeTwoSortedListsIterative(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Create a dummy node to act as the head of the merged list.
    // This simplifies handling the first node.
    const dummyHead = new ListNode(0);
    let current: ListNode | null = dummyHead;

    // Iterate while both lists have nodes
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next; // Move the current pointer forward
    }

    // If one of the lists is not exhausted, append the remaining nodes
    if (list1 !== null) {
        current.next = list1;
    } else if (list2 !== null) {
        current.next = list2;
    }

    // The actual head of the merged list is dummyHead.next
    return dummyHead.next;
}


/**
 * Solution 2: Recursive Approach
 *
 * This approach uses recursion by comparing the heads of the two lists.
 *
 * 1. Base cases:
 *    a. If `list1` is `null`, return `list2` (nothing to merge from `list1`).
 *    b. If `list2` is `null`, return `list1` (nothing to merge from `list2`).
 * 2. Recursive step:
 *    a. If `list1.val` is less than or equal to `list2.val`:
 *       The head of the merged list will be `list1`.
 *       Recursively merge `list1.next` and `list2`, and set the result as `list1.next`.
 *       Return `list1`.
 *    b. Else (if `list2.val` is smaller):
 *       The head of the merged list will be `list2`.
 *       Recursively merge `list1` and `list2.next`, and set the result as `list2.next`.
 *       Return `list2`.
 *
 * @param list1 The head of the first sorted linked list.
 * @param list2 The head of the second sorted linked list.
 * @returns The head of the merged sorted linked list.
 *
 * Time Complexity: O(M + N) where M and N are the number of nodes in `list1` and `list2` respectively.
 *                  Each recursive call processes one node, and we make M+N calls.
 * Space Complexity: O(M + N) due to the recursion stack. In the worst case, the depth of the
 *                   recursion can be M+N (e.g., if one list is much longer and always contributes).
 */
export function mergeTwoSortedListsRecursive(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Base cases
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }

    // Recursive step
    if (list1.val <= list2.val) {
        list1.next = mergeTwoSortedListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoSortedListsRecursive(list1, list2.next);
        return list2;
    }
}