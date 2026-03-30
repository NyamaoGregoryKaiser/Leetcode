```typescript
import { ListNode } from '../data-structures/LinkedList';

/**
 * Problem 2: Linked List Cycle
 *
 * Given the head of a linked list, return `true` if there is a cycle in the linked list.
 * Otherwise, return `false`.
 *
 * A cycle in a linked list means that some node in the list can be reached again by
 * continuously following the `next` pointer. Internally, `pos` is used to denote the index
 * of the node that the tail's `next` pointer is connected to. `pos` is -1 if there is no cycle.
 * Note that `pos` is not passed as a parameter to the function.
 *
 * Example 1:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 *
 * Example 2:
 * Input: head = [1,2], pos = 0
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
 *
 * Example 3:
 * Input: head = [1], pos = -1
 * Output: false
 * Explanation: There is no cycle in the linked list.
 *
 * Constraints:
 * The number of nodes in the list is in the range [0, 10^5].
 * -10^5 <= Node.val <= 10^5
 * `pos` is -1 or a valid index in the linked list.
 */

/**
 * Optimal Solution: Floyd's Tortoise and Hare Algorithm (Two Pointers)
 *
 * This algorithm uses two pointers, a 'slow' pointer and a 'fast' pointer,
 * to detect if a cycle exists in a linked list.
 *
 * Algorithm:
 * 1. Initialize `slow` pointer to `head` and `fast` pointer to `head`.
 * 2. Traverse the list:
 *    - `slow` moves one step at a time (`slow = slow.next`).
 *    - `fast` moves two steps at a time (`fast = fast.next.next`).
 * 3. If there is a cycle, the `fast` pointer will eventually catch up to the `slow` pointer
 *    (i.e., `fast === slow`). This is because the distance between them decreases by 1
 *    at each step within the cycle, and `fast` is moving twice as fast.
 * 4. If there is no cycle, `fast` will eventually reach `null` (or `fast.next` will be `null`),
 *    at which point we know there's no cycle.
 *
 * Time Complexity: O(N)
 * In the worst case (no cycle or a very long cycle), the fast pointer traverses the list.
 * The slow pointer traverses at most N nodes. The fast pointer traverses at most 2N nodes.
 * So, total time is proportional to N.
 *
 * Space Complexity: O(1)
 * We only use two constant extra pointers (`slow` and `fast`). No additional data structures are used.
 */
export function hasCycle(head: ListNode | null): boolean {
    // If the list is empty or has only one node, a cycle is not possible.
    if (head === null || head.next === null) {
        return false;
    }

    let slow: ListNode | null = head;        // Slow pointer, moves one step at a time
    let fast: ListNode | null = head;        // Fast pointer, moves two steps at a time

    // Loop until fast pointer reaches the end of the list (no cycle)
    // or until slow and fast pointers meet (cycle detected).
    // The conditions `fast !== null` and `fast.next !== null` ensure we don't try to
    // access `.next` on a null pointer, which would throw an error.
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;           // Move slow by one step
        fast = fast.next.next;       // Move fast by two steps

        // If slow and fast pointers meet, a cycle is detected.
        if (slow === fast) {
            return true;
        }
    }

    // If the loop finishes, it means fast reached null, so there is no cycle.
    return false;
}

// An alternative (less optimal in space) solution using a Set is provided
// in implementations/Problem2_HasCycle_Set.ts.
```