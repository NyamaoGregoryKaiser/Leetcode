```javascript
/**
 * @fileoverview Alternative Solution: Reverse Linked List (Recursive)
 * This file provides a recursive solution for reversing a singly linked list.
 */

const ListNode = require('../utils/ListNode');

/**
 * Reverses a singly linked list recursively.
 *
 * The recursive approach works by reversing the `next` pointer of the current node
 * to point to its `prev` node. The base case for the recursion is when the head
 * is null or has only one node, in which case it is already "reversed".
 *
 * For a list `A -> B -> C -> D -> null`:
 * 1. The function calls itself with `head.next` (i.e., `reverseLinkedList(B)`).
 * 2. It continues until it reaches the last node `D`. `D` becomes the new head.
 * 3. As the calls return, for node `C`: `C.next` is `D`.
 *    `D.next` is set to `C` (`C.next.next = C`).
 *    `C.next` is set to `null` to break the original forward link.
 *    The `newHead` (which is `D`) is propagated back up.
 *
 * @param {ListNode | null} head The head of the linked list to be reversed.
 * @returns {ListNode | null} The head of the reversed linked list.
 *
 * Time Complexity: O(N) where N is the number of nodes.
 *                  Each node is visited once during the recursion.
 * Space Complexity: O(N) due to the recursion stack. In the worst case (a long list),
 *                   the stack depth can be N. This can lead to stack overflow for very long lists.
 */
function reverseLinkedListRecursive(head) {
    // Base case: If head is null or only one node, it's already reversed.
    if (head === null || head.next === null) {
        return head;
    }

    // Recursively reverse the rest of the list starting from head.next.
    // `newHead` will eventually be the *original* last node (e.g., D in A->B->C->D).
    const newHead = reverseLinkedListRecursive(head.next);

    // At this point, the sublist from `head.next` onwards is reversed.
    // For example, if head is 'A' and list is A -> B -> C, `newHead` is 'C'.
    // And after the recursive call, B's next pointer is still C, but C's next is B.
    // Now we need to reverse the link for `head`.
    
    // `head.next` is the node B (the first node of the reversed sublist).
    // Set `B.next` to point back to `A` (head).
    head.next.next = head;

    // Set `A.next` to null, as A is now the tail of the reversed sublist.
    head.next = null;

    // Return the new head of the fully reversed list (which is `D` in the example).
    return newHead;
}

module.exports = reverseLinkedListRecursive;
```