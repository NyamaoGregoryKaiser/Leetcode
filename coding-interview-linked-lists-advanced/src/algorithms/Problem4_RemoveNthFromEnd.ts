```typescript
import { ListNode } from '../data-structures/LinkedList';

/**
 * Problem 4: Remove Nth Node From End of List
 *
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 *
 * Example 2:
 * Input: head = [1], n = 1
 * Output: []
 *
 * Example 3:
 * Input: head = [1,2], n = 1
 * Output: [1]
 *
 * Constraints:
 * The number of nodes in the list is `sz`.
 * `1 <= sz <= 30`
 * `1 <= n <= sz`
 */

/**
 * Optimal Solution: One-Pass Two-Pointer Approach
 *
 * This approach uses two pointers, `fast` and `slow`, to find the node to be removed
 * in a single pass.
 *
 * Algorithm:
 * 1. Create a `dummy` node and point its `next` to the `head` of the list.
 *    This dummy node simplifies edge cases, especially when the head itself needs to be removed.
 *    Initialize `slow` and `fast` pointers to `dummy`.
 * 2. Advance the `fast` pointer `n + 1` steps ahead. This creates a gap of `n` nodes
 *    between `slow` and `fast`. The `+1` is crucial because `slow` needs to stop
 *    *before* the node to be removed, so its `next` can be updated.
 *    If `fast` becomes `null` during this step, it implies `n` is greater than or equal
 *    to the list length, which should not happen per constraints (1 <= n <= sz).
 * 3. Move both `slow` and `fast` pointers one step at a time until `fast` reaches the end of the list (i.e., `fast` becomes `null`).
 *    - When `fast` reaches the end, `slow` will be pointing to the node *just before* the nth node from the end.
 *      For example, if we want to remove the 2nd node from the end in [1,2,3,4,5], and `n=2`:
 *      Initial: dummy -> 1 -> 2 -> 3 -> 4 -> 5
 *      Fast advanced by n+1 (3 steps):
 *      slow: dummy, fast: 2
 *      Then both move together:
 *      slow: 1, fast: 3
 *      slow: 2, fast: 4
 *      slow: 3, fast: 5
 *      slow: 4, fast: null (fast reaches end)
 *      Here `slow` is at 3, which is before 4. But we need slow to be before 4 which is the node to be removed (4 is 2nd from end).
 *      Let's re-think the `n+1` for fast.
 *      The goal is that when `fast` is `null`, `slow` is at `(length - n - 1)`th index.
 *      The node to be removed is at `(length - n)`th index.
 *      `slow` needs to be at `(length - n - 1)`th index to correctly remove `(length - n)`th node.
 *      If fast is `n` steps ahead of `slow`, when `fast` reaches the end, `slow` will be at the `n`th node from the end.
 *      We need `slow` to be at `n+1`th node from end, i.e., before the node to be removed.
 *      So, initialize `slow` at `dummy`, `fast` at `head`.
 *      Move `fast` `n` steps ahead.
 *      Then move `fast` and `slow` together until `fast.next` is `null`.
 *      This way, `slow` will stop *at* the node before the one to be removed.
 * 4. Remove the nth node: `slow.next = slow.next.next`.
 * 5. Return `dummy.next` as the head of the modified list.
 *
 * Let's refine step 2 and 3 for the `n` steps ahead approach:
 * 1. Create a `dummy` node and point its `next` to the `head`.
 *    Initialize `slow` to `dummy` and `fast` to `head`.
 * 2. Move `fast` pointer `n` steps ahead.
 *    For `i` from `0` to `n-1`: `fast = fast.next`.
 * 3. Now, `fast` is `n` nodes ahead of `slow` (if `slow` was at `head`).
 *    But `slow` is at `dummy` and `fast` at `head` initially.
 *    So `fast` is `n` nodes ahead of `head`, while `slow` is effectively `n+1` nodes behind `fast`.
 *    Example: [1,2,3,4,5], n = 2
 *    dummy -> 1 -> 2 -> 3 -> 4 -> 5
 *    slow = dummy, fast = 1
 *    Advance fast 2 steps:
 *    fast = 1.next = 2
 *    fast = 2.next = 3
 *    Now, slow = dummy, fast = 3.
 *    They are `n` distance apart, meaning `fast` has traversed `n` steps.
 *    Move both `slow` and `fast` one step at a time until `fast.next` is `null`.
 *    While `fast.next !== null`:
 *      slow = slow.next
 *      fast = fast.next
 *
 *    Initial: `slow = dummy`, `fast = head`
 *    Steps to advance `fast` `n` times:
 *    `fast` pointer is now at the `n`-th node from the beginning.
 *    `slow` pointer is still at `dummy`.
 *
 *    Now, move both `slow` and `fast` one step at a time until `fast` reaches the end.
 *    When `fast` hits `null`, `slow` will be at the node *just before* the nth node from the end.
 *
 *    Example: [1,2,3,4,5], n = 2
 *    1. dummy -> 1 -> 2 -> 3 -> 4 -> 5
 *       slow = dummy, fast = dummy
 *    2. Advance `fast` `n+1` steps. (This is the standard approach for removing a node)
 *       `fast` will be `null` when it has traversed `length + 1` nodes.
 *       After `n+1` steps: `fast` is at `n+1`-th node (0-indexed).
 *       Let's trace:
 *       n=2, n+1=3
 *       fast: dummy -> 1 -> 2 -> 3
 *       slow: dummy
 *       Current state: slow=dummy, fast=node(3)
 *
 *    3. Move both `slow` and `fast` one step at a time until `fast` becomes `null`.
 *       (fast is not null in the loop condition, so it means until fast.next is null, fast is the last node)
 *       While `fast !== null`: (This will ensure slow stops at the node before the one to remove)
 *         slow = slow.next
 *         fast = fast.next
 *
 *       Iteration 1: slow=node(1), fast=node(4)
 *       Iteration 2: slow=node(2), fast=node(5)
 *       Iteration 3: slow=node(3), fast=null (fast becomes null, loop terminates)
 *
 *       At this point, `slow` is at node 3. The node to remove is node 4.
 *       `slow.next` is node 4. We want to remove `slow.next`.
 *       So, `slow.next = slow.next.next`.
 *
 * Time Complexity: O(L)
 * We traverse the list once. The fast pointer goes L times, then both go L-n times. Total ~L.
 *
 * Space Complexity: O(1)
 * We use a few constant extra pointers (`dummy`, `slow`, `fast`).
 */
export function removeNthFromEndOnePass(head: ListNode | null, n: number): ListNode | null {
    // Create a dummy node to handle edge cases like removing the head of the list.
    // The dummy node points to the original head.
    const dummy = new ListNode(0);
    dummy.next = head;

    let slow: ListNode | null = dummy; // Slow pointer, starts at dummy
    let fast: ListNode | null = dummy; // Fast pointer, starts at dummy

    // 1. Move fast pointer 'n + 1' steps ahead.
    // This creates a gap of 'n' nodes between slow and fast.
    // The '+1' is crucial because 'slow' needs to stop *before* the node to be removed.
    // So when fast reaches the end, slow will be at the predecessor of the node to remove.
    for (let i = 0; i <= n; i++) {
        // If n is greater than the list length, this might make fast null.
        // Problem constraints state 1 <= n <= sz, so fast will not become null here
        // unless head is null and n=0, which is also out of constraints.
        if (fast === null) { // Should not happen given constraints, but good defensive check
            return head; // Or throw error
        }
        fast = fast.next;
    }

    // 2. Move both slow and fast pointers one step at a time until fast reaches the end (null).
    // When fast becomes null, slow will be pointing to the node *before* the nth node from the end.
    while (fast !== null) {
        slow = slow!.next; // Move slow pointer one step
        fast = fast.next;  // Move fast pointer one step
    }

    // 3. Remove the nth node from the end.
    // 'slow.next' is the node to be removed.
    // By setting 'slow.next = slow.next.next', we effectively skip and remove 'slow.next'.
    // Use non-null assertion `!` because slow cannot be null at this point (starts from dummy, moves to non-null nodes).
    slow!.next = slow!.next!.next;

    // The head of the modified list is 'dummy.next'.
    // If the original head was removed, dummy.next will point to the new head.
    // If the list becomes empty, dummy.next will be null.
    return dummy.next;
}

// An alternative (two-pass) solution is provided in implementations/Problem4_RemoveNthFromEnd_TwoPass.ts
```