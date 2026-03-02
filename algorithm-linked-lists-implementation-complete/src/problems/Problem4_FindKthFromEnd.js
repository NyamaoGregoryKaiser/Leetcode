```javascript
/**
 * @fileoverview Solutions for LeetCode Problem 19 variation: Find Kth Node From End of List.
 * Provides two-pointer and length-based approaches. (LeetCode 19 is Remove Nth, this is Find Nth).
 */

const { Node } = require('../data-structures/LinkedList');

/**
 * Problem Description:
 * Given the head of a singly linked list and an integer k, return the k-th node from the end of the list.
 * Assume k is always valid (1 <= k <= list.length).
 *
 * Example:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: Node with value 4
 */

/**
 * --- Solution 1: Two-Pointer Approach (Optimal) ---
 *
 * This is the most efficient and common approach for this problem.
 * It uses two pointers, `fast` and `slow`, to traverse the list.
 *
 * 1. Initialize `fast` and `slow` pointers to the `head`.
 * 2. Move the `fast` pointer `k` steps forward. This creates a gap of `k` nodes between `fast` and `slow`.
 *    (If `fast` becomes null during this step, it means `k` is greater than or equal to the list length,
 *    but the problem statement assumes `k` is valid. A real-world solution would handle this edge case).
 * 3. Now, move both `fast` and `slow` pointers one step at a time, simultaneously, until `fast` reaches the end of the list (i.e., `fast` becomes null).
 * 4. When `fast` is null, `slow` will be pointing to the k-th node from the end.
 *    This is because `fast` maintained a `k`-node lead over `slow`, so when `fast` has traversed `N` nodes,
 *    `slow` has traversed `N-k` nodes, which is exactly the position of the k-th node from the end.
 *
 * @param {Node|null} head The head of the linked list.
 * @param {number} k The position from the end (1-indexed).
 * @returns {Node|null} The k-th node from the end of the list.
 * @complexity
 * Time: O(N) where N is the number of nodes in the list.
 *       The fast pointer traverses N steps. The slow pointer traverses N-k steps.
 *       Total steps are proportional to N.
 * Space: O(1) auxiliary space.
 *        We only use a few pointers.
 */
function findKthFromEndTwoPointers(head, k) {
    if (!head) {
        return null;
    }

    let slow = head;
    let fast = head;

    // Move fast pointer k steps ahead
    for (let i = 0; i < k; i++) {
        // According to problem constraints, k is always valid.
        // If k could be invalid (e.g., k > list length), we would need to check `if (!fast) return null;` here.
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end (null)
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // At this point, slow is pointing to the k-th node from the end
    return slow;
}

/**
 * --- Solution 2: Two-Pass Approach (Calculate Length First) ---
 *
 * This approach is simpler to understand but requires two passes over the linked list.
 *
 * 1. First Pass: Traverse the entire list to calculate its total length (N).
 * 2. Calculate the target index from the beginning: `targetIndex = N - k`.
 *    (Remember: k-th from end is 1-indexed, so N-k is 0-indexed from beginning).
 * 3. Second Pass: Traverse the list again from the `head` until `targetIndex` is reached.
 *    The node at this position is the k-th node from the end.
 *
 * @param {Node|null} head The head of the linked list.
 * @param {number} k The position from the end (1-indexed).
 * @returns {Node|null} The k-th node from the end of the list.
 * @complexity
 * Time: O(N) where N is the number of nodes.
 *       First pass takes O(N) to find length. Second pass takes O(N-k) steps. Total O(N).
 * Space: O(1) auxiliary space.
 *        We only use a few variables (length, count, current pointer).
 */
function findKthFromEndWithLength(head, k) {
    if (!head) {
        return null;
    }

    // First pass: Calculate the length of the list
    let length = 0;
    let current = head;
    while (current !== null) {
        length++;
        current = current.next;
    }

    // Calculate the 0-indexed position from the beginning
    // k-th from end is equivalent to (length - k) from beginning (0-indexed)
    const targetIndex = length - k;

    // Second pass: Traverse to the target node
    current = head;
    for (let i = 0; i < targetIndex; i++) {
        current = current.next;
    }

    return current;
}

module.exports = {
    findKthFromEndTwoPointers,
    findKthFromEndWithLength
};
```