```typescript
import { ListNode } from '../src/data-structures/LinkedList';

/**
 * Problem 4: Remove Nth Node From End of List - Two-Pass Approach
 *
 * This is an alternative approach to `removeNthFromEndOnePass` found in `src/algorithms/Problem4_RemoveNthFromEnd.ts`.
 * This solution requires two passes through the linked list.
 *
 * Algorithm:
 * 1. **First Pass: Calculate Length**
 *    - Traverse the entire linked list to count the total number of nodes, let's call it `length`.
 * 2. **Determine Node to Remove**
 *    - The Nth node from the end is equivalent to the `(length - n + 1)`th node from the beginning.
 *    - We need to find the node *before* the one to be removed. This is the `(length - n)`th node from the beginning.
 * 3. **Second Pass: Remove Node**
 *    - Create a `dummy` node and point its `next` to the `head`. This simplifies handling the case
 *      where the head itself needs to be removed.
 *    - Initialize a `current` pointer to the `dummy` node.
 *    - Traverse `(length - n)` steps from `dummy`. After these steps, `current` will be pointing
 *      to the node *before* the one to be removed.
 *    - Update pointers to skip the node: `current.next = current.next.next`.
 *    - Return `dummy.next` as the new head.
 *
 * Time Complexity: O(L)
 * We traverse the list once to find its length (L steps), and then a second time to find the
 * node to remove (L - n steps). Total operations are proportional to L.
 *
 * Space Complexity: O(1)
 * We only use a few constant extra variables (`length`, `dummy`, `current`).
 */
export function removeNthFromEndTwoPass(head: ListNode | null, n: number): ListNode | null {
    // Create a dummy node, pointing to the original head.
    // This helps handle cases where the head itself needs to be removed.
    const dummy = new ListNode(0);
    dummy.next = head;

    let length = 0;
    let current: ListNode | null = head;

    // First Pass: Calculate the length of the list
    while (current !== null) {
        length++;
        current = current.next;
    }

    // Calculate the position of the node *before* the one to be removed (from the beginning).
    // The node to remove is (length - n + 1)th from the beginning.
    // So, we need to stop at (length - n)th node from the beginning.
    const stepsToReachPredecessor = length - n;

    // Reset current pointer to the dummy node to start the second pass
    current = dummy;

    // Second Pass: Traverse to the node *before* the one to be removed
    for (let i = 0; i < stepsToReachPredecessor; i++) {
        current = current!.next;
    }

    // Now, `current` is pointing to the node before the target node.
    // Remove the target node by updating current.next.
    // `current.next` is the node to be removed. `current.next.next` is the node after it.
    current!.next = current!.next!.next;

    // The head of the modified list is dummy.next.
    return dummy.next;
}
```