```javascript
/**
 * @fileoverview Solutions for LeetCode Problem 21: Merge Two Sorted Lists.
 * Provides iterative and recursive approaches.
 */

const { Node } = require('../data-structures/LinkedList');

/**
 * Problem Description:
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists in a one sorted list. The list should be made by splicing together
 * the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Example:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 */

/**
 * --- Solution 1: Iterative Approach (Optimal) ---
 *
 * This approach uses a dummy head node to simplify the logic of building the new merged list.
 * A `current` pointer tracks the tail of the merged list, to which new nodes are appended.
 *
 * In each step, it compares the values of the current nodes from `list1` and `list2`.
 * The node with the smaller value is appended to the merged list, and its pointer is advanced.
 *
 * After one list is exhausted, the remaining nodes of the other list are simply appended
 * to the merged list's tail, as they are already sorted.
 *
 * @param {Node|null} list1 The head of the first sorted linked list.
 * @param {Node|null} list2 The head of the second sorted linked list.
 * @returns {Node|null} The head of the merged sorted linked list.
 * @complexity
 * Time: O(N + M) where N and M are the lengths of list1 and list2 respectively.
 *       We traverse each list exactly once, making a single comparison and assignment for each node.
 * Space: O(1) auxiliary space.
 *        We only use a few pointers (dummy, current, list1, list2) and modify existing nodes.
 *        No new nodes are created, only pointers are re-arranged.
 */
function mergeTwoListsIterative(list1, list2) {
    // Create a dummy node. This helps to easily handle the head of the merged list
    // without special checks for an empty merged list initially.
    const dummyHead = new Node(0);
    let current = dummyHead; // Pointer to the last node of the merged list

    // Iterate while both lists have nodes remaining
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1; // Append node from list1
            list1 = list1.next;   // Move list1 pointer forward
        } else {
            current.next = list2; // Append node from list2
            list2 = list2.next;   // Move list2 pointer forward
        }
        current = current.next; // Move current pointer to the newly appended node
    }

    // If one of the lists still has remaining elements, append them all
    // (they are already sorted and greater than or equal to the last merged node)
    if (list1 !== null) {
        current.next = list1;
    } else if (list2 !== null) {
        current.next = list2;
    }

    // The merged list starts from dummyHead.next
    return dummyHead.next;
}

/**
 * --- Solution 2: Recursive Approach ---
 *
 * The recursive approach breaks down the problem into smaller subproblems.
 *
 * Base cases:
 * 1. If `list1` is null, return `list2` (as `list2` is already sorted).
 * 2. If `list2` is null, return `list1`.
 *
 * Recursive step:
 * 1. Compare the values of `list1.val` and `list2.val`.
 * 2. If `list1.val` is smaller or equal:
 *    - `list1.next` should point to the result of merging `list1.next` and `list2`.
 *    - Return `list1` as the head of this sub-merged list.
 * 3. Else (`list2.val` is smaller):
 *    - `list2.next` should point to the result of merging `list1` and `list2.next`.
 *    - Return `list2` as the head of this sub-merged list.
 *
 * @param {Node|null} list1 The head of the first sorted linked list.
 * @param {Node|null} list2 The head of the second sorted linked list.
 * @returns {Node|null} The head of the merged sorted linked list.
 * @complexity
 * Time: O(N + M) where N and M are the lengths of list1 and list2.
 *       Each recursive call processes one node from either list1 or list2.
 * Space: O(N + M) due to the recursion stack.
 *        In the worst case (e.g., alternating elements), the depth of the recursion can be N+M.
 */
function mergeTwoListsRecursive(list1, list2) {
    // Base cases
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }

    // Recursive step
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}

module.exports = {
    mergeTwoListsIterative,
    mergeTwoListsRecursive
};
```