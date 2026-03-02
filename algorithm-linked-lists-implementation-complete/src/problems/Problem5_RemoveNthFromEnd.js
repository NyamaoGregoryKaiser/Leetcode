```javascript
/**
 * @fileoverview Solutions for LeetCode Problem 19: Remove Nth Node From End of List.
 * Provides a two-pointer approach with a dummy node.
 */

const { Node } = require('../data-structures/LinkedList');

/**
 * Problem Description:
 * Given the head of a singly linked list, remove the nth node from the end of the list and return its head.
 * Assume n is always valid (1 <= n <= list.length).
 *
 * Example:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 */

/**
 * --- Solution: One-Pass Two-Pointer Approach with Dummy Node (Optimal) ---
 *
 * This problem is a variation of finding the Kth node from the end.
 * To remove the Nth node from the end, we actually need to find the (N+1)th node from the end,
 * because we need access to the node *before* the one to be removed to update its `next` pointer.
 *
 * The two-pointer strategy is ideal here:
 * 1. **Dummy Node:** Create a `dummy` node and point its `next` to the original `head`.
 *    This simplifies edge cases, especially when the head itself needs to be removed
 *    (e.g., removing the 1st node from a list of 1 node, or the Nth node from a list of N nodes).
 *    The new head of the list will be `dummy.next`.
 * 2. **Initialize Pointers:**
 *    - `slow` pointer starts at `dummy`.
 *    - `fast` pointer also starts at `dummy`.
 * 3. **Advance Fast Pointer:** Move `fast` pointer `n + 1` steps forward.
 *    This creates a gap of `n` nodes between `slow` and `fast`.
 *    (If `fast` becomes null here, it implies `n` is greater than or equal to the list length,
 *    but problem constraints guarantee `n` is valid).
 * 4. **Advance Both Pointers:** Now, move both `slow` and `fast` pointers one step at a time,
 *    simultaneously, until `fast` reaches the end of the list (i.e., `fast` becomes `null`).
 * 5. **Remove Node:** When `fast` is `null`, `slow` will be pointing to the node *before*
 *    the Nth node from the end.
 *    - The node to be removed is `slow.next`.
 *    - Update `slow.next` to `slow.next.next` to bypass and remove the node.
 * 6. **Return New Head:** The head of the modified list is `dummy.next`.
 *
 * Why `n + 1` steps for `fast`?
 * If `slow` is at `dummy` and `fast` is `n` steps ahead of `slow`, when `fast` reaches the
 * actual end of the list (the *last node*), `slow` will be at the `n`th node from the end.
 * To remove the `n`th node, we need its *predecessor*, which is the `(n+1)`th node from the end.
 * So, if `fast` has `n+1` lead, when `fast` points to `null` (one *beyond* the last node),
 * `slow` will be pointing to the `(n+1)`th node from the end.
 *
 * @param {Node|null} head The head of the linked list.
 * @param {number} n The position from the end to remove (1-indexed).
 * @returns {Node|null} The head of the modified linked list.
 * @complexity
 * Time: O(N) where N is the number of nodes in the list.
 *       The fast pointer traverses N+1 steps, and then both pointers traverse N-n steps.
 *       Total steps are proportional to N.
 * Space: O(1) auxiliary space.
 *        We only use a few pointers (dummy, slow, fast).
 */
function removeNthFromEnd(head, n) {
    // Create a dummy node to handle edge cases, especially when removing the head node.
    // The dummy node points to the original head.
    const dummy = new Node(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    // Move 'fast' pointer n + 1 steps ahead.
    // This creates a gap of 'n' nodes between 'slow' and 'fast'.
    // When 'fast' reaches the end (becomes null), 'slow' will be at the node
    // *before* the nth node from the end.
    for (let i = 0; i <= n; i++) {
        // Problem states n is always valid, so fast will not become null here
        // unless head is null or list is too short (which is not allowed by constraints).
        fast = fast.next;
    }

    // Now, move both 'slow' and 'fast' pointers one step at a time
    // until 'fast' reaches the end of the list (i.e., null).
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // At this point, 'slow' is pointing to the node directly before the
    // nth node from the end.
    // 'slow.next' is the node to be removed.
    // 'slow.next.next' is the node after the one to be removed.
    slow.next = slow.next.next;

    // The head of the modified list is dummy.next
    return dummy.next;
}

module.exports = {
    removeNthFromEnd
};
```