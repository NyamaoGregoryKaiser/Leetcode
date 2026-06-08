```javascript
/**
 * @fileoverview Alternative Solution: Remove Nth Node From End of List (Two Pass)
 * This file provides a two-pass approach for removing the nth node from the end of a linked list.
 */

const ListNode = require('../utils/ListNode');

/**
 * Removes the nth node from the end of a singly linked list using a two-pass approach.
 *
 * This approach involves:
 * 1. First Pass: Traverse the entire list to calculate its total length (L).
 * 2. Calculate the position from the beginning to remove: `(L - n)`.
 *    This means we need to stop at the `(L - n - 1)`-th node from the beginning
 *    to correctly modify its `next` pointer.
 * 3. Second Pass: Traverse the list again up to the `(L - n - 1)`-th node.
 * 4. Remove the node by linking `(L - n - 1)`-th node's `next` to `(L - n + 1)`-th node.
 *
 * A `dummyHead` node is used to simplify edge cases, particularly when the head
 * of the original list needs to be removed.
 *
 * @param {ListNode | null} head The head of the linked list.
 * @param {number} n The position from the end of the list (1-indexed) of the node to remove.
 * @returns {ListNode | null} The head of the linked list after removing the nth node from the end.
 *
 * Time Complexity: O(L) where L is the length of the linked list.
 *                  We traverse the list completely twice. This is still O(L).
 * Space Complexity: O(1) as we only use a few extra pointers and variables.
 */
function removeNthFromEndTwoPass(head, n) {
    // Create a dummy node that points to the head.
    // This handles edge cases where the head itself needs to be removed.
    let dummyHead = new ListNode(0);
    dummyHead.next = head;

    let length = 0;
    let current = dummyHead.next; // Start from the actual head

    // First Pass: Calculate the length of the list.
    while (current !== null) {
        length++;
        current = current.next;
    }

    // Calculate the position from the beginning to stop before the target node.
    // We want to remove the (L - n + 1)-th node from the beginning.
    // So, we need to reach the (L - n)-th node from the beginning.
    let positionToRemoveFromStart = length - n;

    // Reset current to dummyHead to start the second pass.
    current = dummyHead;

    // Second Pass: Traverse to the node *before* the one to be removed.
    // We iterate `positionToRemoveFromStart` times.
    for (let i = 0; i < positionToRemoveFromStart; i++) {
        current = current.next;
    }

    // `current` is now pointing to the node right before the node to be removed.
    // Bypass the nth node from the end.
    if (current.next) { // Ensure current.next exists before trying to access current.next.next
        current.next = current.next.next;
    }

    // The head of the modified list is `dummyHead.next`.
    return dummyHead.next;
}

module.exports = removeNthFromEndTwoPass;
```