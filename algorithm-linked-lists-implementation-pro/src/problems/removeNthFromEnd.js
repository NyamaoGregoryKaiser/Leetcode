```javascript
/**
 * @fileoverview Problem: Remove Nth Node From End of List
 * Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.
 */

const ListNode = require('../utils/ListNode');

/**
 * Removes the nth node from the end of a singly linked list using a two-pointer approach.
 *
 * This optimal solution makes a single pass through the linked list.
 * It uses two pointers, `fast` and `slow`, initialized to a `dummyHead` node.
 * The `dummyHead` simplifies edge cases like removing the head of the original list.
 *
 * 1. The `fast` pointer is advanced `n` steps ahead of the `slow` pointer.
 *    This creates a gap of `n` nodes between `fast` and `slow`.
 * 2. Both `fast` and `slow` pointers then move one step at a time until `fast` reaches the end of the list (i.e., `fast` becomes `null`).
 * 3. When `fast` is `null`, `slow` will be pointing to the node *before* the `nth` node from the end.
 * 4. To remove the `nth` node, we simply update `slow.next` to `slow.next.next`, effectively bypassing the node to be removed.
 *
 * @param {ListNode | null} head The head of the linked list.
 * @param {number} n The position from the end of the list (1-indexed) of the node to remove.
 * @returns {ListNode | null} The head of the linked list after removing the nth node from the end.
 *
 * Time Complexity: O(L) where L is the length of the linked list.
 *                  The `fast` pointer iterates L times to reach the end.
 *                  The `slow` pointer iterates (L - n) times. Overall, it's a single pass.
 * Space Complexity: O(1) as we only use a few extra pointers (`dummyHead`, `slow`, `fast`).
 */
function removeNthFromEnd(head, n) {
    // Create a dummy node that points to the head.
    // This handles edge cases where the head itself needs to be removed.
    // The result will be `dummyHead.next`.
    let dummyHead = new ListNode(0);
    dummyHead.next = head;

    let fast = dummyHead;
    let slow = dummyHead;

    // 1. Advance 'fast' pointer 'n' steps ahead.
    // This creates a gap of 'n' nodes between 'fast' and 'slow'.
    for (let i = 0; i <= n; i++) { // Loop n+1 times because fast starts at dummyHead
        if (fast === null) {
            // This case should ideally be caught by problem constraints (n will be valid)
            // or indicates n is larger than list length.
            // For robustness, could throw an error or handle gracefully.
            return head; // Or dummyHead.next depending on desired behavior for invalid n
        }
        fast = fast.next;
    }

    // 2. Move both 'fast' and 'slow' pointers until 'fast' reaches the end of the list.
    // When 'fast' becomes null, 'slow' will be at the node *before* the nth node from the end.
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // 3. 'slow' is now pointing to the node right before the node to be removed.
    // Bypass the nth node from the end.
    if (slow.next) { // Ensure slow.next exists before trying to access slow.next.next
        slow.next = slow.next.next;
    }

    // The head of the modified list is `dummyHead.next`.
    return dummyHead.next;
}

module.exports = removeNthFromEnd;
```