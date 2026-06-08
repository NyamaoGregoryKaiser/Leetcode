```javascript
/**
 * @fileoverview Problem: Reverse Linked List
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 */

const ListNode = require('../utils/ListNode');

/**
 * Reverses a singly linked list iteratively.
 *
 * This approach uses three pointers: `prev`, `current`, and `nextTemp`.
 * - `prev` keeps track of the previously processed node (which becomes the `next` for `current`).
 * - `current` is the node currently being processed.
 * - `nextTemp` temporarily stores the next node in the original list before `current.next` is changed.
 *
 * The loop continues as long as `current` is not null. In each iteration:
 * 1. Store `current.next` in `nextTemp`.
 * 2. Change `current.next` to `prev` (reversing the pointer).
 * 3. Move `prev` to `current`.
 * 4. Move `current` to `nextTemp`.
 *
 * @param {ListNode | null} head The head of the linked list to be reversed.
 * @returns {ListNode | null} The head of the reversed linked list.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 *                  We iterate through the list exactly once.
 * Space Complexity: O(1) as we only use a few extra pointers (prev, current, nextTemp)
 *                   regardless of the list's size.
 */
function reverseLinkedList(head) {
    let prev = null;       // Pointer to the previous node, initialized to null (as new tail will point to null)
    let current = head;    // Pointer to the current node, initialized to the head of the original list

    while (current !== null) {
        // 1. Store the next node temporarily.
        // This is crucial because `current.next` will be modified in the next step.
        let nextTemp = current.next;

        // 2. Reverse the current node's pointer.
        // Make `current.next` point to `prev`.
        current.next = prev;

        // 3. Move `prev` and `current` one step forward.
        // `prev` becomes the current node.
        prev = current;
        // `current` becomes the node that was originally next.
        current = nextTemp;
    }

    // When the loop finishes, `current` will be null, and `prev` will be pointing
    // to the last node of the original list, which is now the new head.
    return prev;
}

module.exports = reverseLinkedList;
```