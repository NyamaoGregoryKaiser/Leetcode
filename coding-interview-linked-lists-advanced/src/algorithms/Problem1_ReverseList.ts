```typescript
import { ListNode } from '../data-structures/LinkedList';

/**
 * Problem 1: Reverse Linked List
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list's head.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 *
 * Example 2:
 * Input: head = [1,2]
 * Output: [2,1]
 *
 * Example 3:
 * Input: head = []
 * Output: []
 *
 * Constraints:
 * The number of nodes in the list is in the range [0, 5000].
 * -5000 <= Node.val <= 5000
 */

/**
 * Optimal Solution: Iterative Approach to Reverse Linked List
 *
 * This method iterates through the linked list, changing the `next` pointer of each node
 * to point to its previous node.
 *
 * Algorithm:
 * 1. Initialize three pointers: `prev` to `null`, `current` to `head`, and `nextTemp` to `null`.
 *    - `prev` will store the previously processed node (which becomes the `next` node in the reversed list).
 *    - `current` is the node currently being processed.
 *    - `nextTemp` temporarily stores the `current.next` before `current.next` is modified.
 * 2. Loop while `current` is not null:
 *    a. Store `current.next` in `nextTemp`. This is crucial because we're about to change `current.next`,
 *       and we need a way to advance to the next node in the original list.
 *    b. Change `current.next` to `prev`. This reverses the link.
 *    c. Move `prev` forward: `prev = current`. The current node now becomes the previous node for the next iteration.
 *    d. Move `current` forward: `current = nextTemp`. Advance to the next node in the original list.
 * 3. Once `current` becomes null, `prev` will be pointing to the new head of the reversed list.
 *
 * Time Complexity: O(N)
 * We iterate through the list once, where N is the number of nodes. Each node is visited and its pointer is reversed exactly once.
 *
 * Space Complexity: O(1)
 * We only use a few constant extra pointers (`prev`, `current`, `nextTemp`), regardless of the list size.
 */
export function reverseListIterative(head: ListNode | null): ListNode | null {
    // If the list is empty or has only one node, it's already reversed.
    if (!head || !head.next) {
        return head;
    }

    let prev: ListNode | null = null;      // Pointer to the previous node (initially null, as the new tail will point to null)
    let current: ListNode | null = head;   // Pointer to the current node being processed

    // Iterate through the list until current becomes null (meaning we've processed all nodes)
    while (current !== null) {
        // 1. Store the next node before modifying current.next
        const nextTemp: ListNode | null = current.next;

        // 2. Reverse the current node's pointer: make it point to the previous node
        current.next = prev;

        // 3. Move 'prev' and 'current' one step forward for the next iteration
        prev = current;         // The current node becomes the previous node for the next step
        current = nextTemp;     // Move to the next node in the original list
    }

    // When the loop finishes, 'prev' will be pointing to the new head of the reversed list
    return prev;
}

// For interview, you might be asked for both iterative and recursive.
// The recursive solution is provided in implementations/Problem1_ReverseList_Recursive.ts
```