import { ListNode } from '@data-structures/ListNode';

/**
 * Problem: Remove Nth Node From End of List
 * Given the head of a linked list, remove the n-th node from the end of the list and return its head.
 */

/**
 * Solution 1: One-Pass (Two-Pointer Approach)
 *
 * This is the optimal approach, solving the problem in a single pass.
 * It uses two pointers, `fast` and `slow`, separated by `n` nodes.
 *
 * 1. Create a dummy node and point its `next` to `head`. This handles edge cases like removing
 *    the head of the list or an empty list.
 * 2. Initialize `fast` and `slow` pointers to the `dummy` node.
 * 3. Move `fast` `n` steps ahead of `slow`. Now, `fast` is `n` nodes ahead of `slow`.
 * 4. Move both `fast` and `slow` one step at a time until `fast` reaches the end of the list (i.e., `fast.next` is `null`).
 *    At this point, `slow` will be pointing to the node *before* the `n`-th node from the end.
 * 5. Remove the `n`-th node from the end: `slow.next = slow.next.next`.
 * 6. Return `dummy.next` as the head of the modified list.
 *
 * @param head The head of the linked list.
 * @param n The position from the end to remove (1-indexed).
 * @returns The head of the modified linked list.
 *
 * Time Complexity: O(L) where L is the number of nodes in the list.
 *                  We traverse the list a single time.
 * Space Complexity: O(1) as we only use a few extra pointers.
 */
export function removeNthFromEndOnePass(head: ListNode | null, n: number): ListNode | null {
    // Create a dummy node. This helps in cases where the head itself needs to be removed.
    const dummy = new ListNode(0);
    dummy.next = head;

    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    // Move fast pointer n steps ahead
    for (let i = 0; i <= n; i++) { // move n+1 steps, so fast is n nodes ahead of slow's target parent
        if (fast === null) {
            // This case should ideally not happen based on problem constraints (1 <= n <= sz)
            // but is a good defensive check for invalid 'n'
            return head;
        }
        fast = fast.next;
    }

    // Now, move both fast and slow pointers until fast reaches the end.
    // When fast reaches null, slow will be at the node *before* the one to be removed.
    while (fast !== null) {
        slow = slow!.next;
        fast = fast.next;
    }

    // `slow.next` is the node to be removed.
    // Bypass it by setting `slow.next` to `slow.next.next`.
    if (slow && slow.next) {
        slow.next = slow.next.next;
    }

    return dummy.next; // Return the head of the modified list (skipping the dummy node)
}

/**
 * Solution 2: Two-Pass Approach
 *
 * This approach solves the problem by first finding the length of the list,
 * and then traversing again to find the node to remove.
 *
 * 1. Create a dummy node and point its `next` to `head`.
 * 2. First pass: Iterate through the list to count the total number of nodes (`length`).
 * 3. Calculate the position of the node to remove from the beginning: `nodeToRemoveFromStart = length - n`.
 * 4. Second pass: Iterate from the `dummy` node up to `nodeToRemoveFromStart` steps.
 *    The pointer `current` will then be at the node *before* the one to be removed.
 * 5. Remove the node: `current.next = current.next.next`.
 * 6. Return `dummy.next`.
 *
 * @param head The head of the linked list.
 * @param n The position from the end to remove (1-indexed).
 * @returns The head of the modified linked list.
 *
 * Time Complexity: O(L) where L is the number of nodes in the list.
 *                  We traverse the list twice: once to count, once to remove.
 * Space Complexity: O(1) as we only use a few extra variables.
 */
export function removeNthFromEndTwoPass(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;

    let length = 0;
    let current: ListNode | null = head;
    // First pass: Calculate the length of the list
    while (current !== null) {
        length++;
        current = current.next;
    }

    // Calculate the position of the node to remove from the beginning (0-indexed)
    // We want to stop at the node *before* the one to be removed.
    const nodeToRemoveFromStart = length - n;

    current = dummy; // Reset current to dummy to start second pass
    // Second pass: Traverse to the node *before* the one to remove
    for (let i = 0; i < nodeToRemoveFromStart; i++) {
        current = current!.next;
    }

    // current.next is the node to be removed
    // Bypass it by setting current.next to current.next.next
    if (current && current.next) {
        current.next = current.next.next;
    }

    return dummy.next; // Return the head of the modified list
}