import { ListNode } from '@data-structures/ListNode';

/**
 * Problem: Reverse Linked List
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 */

/**
 * Solution 1: Iterative Approach
 *
 * This approach traverses the list once, changing the `next` pointer of each node
 * to point to its previous node. It uses three pointers: `prev`, `current`, and `nextTemp`.
 *
 * 1. Initialize `prev` to `null` (this will be the new tail of the reversed list).
 * 2. Initialize `current` to `head` (this pointer moves through the original list).
 * 3. In each iteration:
 *    a. Store `current.next` in `nextTemp` before modifying `current.next`.
 *    b. Change `current.next` to `prev`. This reverses the link.
 *    c. Move `prev` to `current`. `prev` now points to the node that was just processed.
 *    d. Move `current` to `nextTemp`. `current` moves to the next node in the original list.
 * 4. After the loop finishes (when `current` becomes `null`), `prev` will be pointing
 *    to the new head of the reversed list.
 *
 * @param head The head of the input linked list.
 * @returns The head of the reversed linked list.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 *                  We traverse the list exactly once.
 * Space Complexity: O(1) as we only use a few extra pointers, regardless of list size.
 */
export function reverseLinkedListIterative(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    while (current !== null) {
        // Store the next node temporarily
        const nextTemp: ListNode | null = current.next;

        // Reverse the current node's pointer
        current.next = prev;

        // Move pointers one step forward
        prev = current;
        current = nextTemp;
    }

    // `prev` will be the new head of the reversed list
    return prev;
}

/**
 * Solution 2: Recursive Approach
 *
 * This approach uses recursion to reverse the list. The base case is when the list is empty
 * or has only one node, in which case it's already reversed.
 *
 * 1. If `head` is `null` or `head.next` is `null`, return `head` (base case).
 * 2. Recursively call `reverseLinkedListRecursive` on `head.next`. This will reverse the rest of the list.
 *    Let `restReversedHead` be the head of the reversed sublist.
 * 3. The current `head` node needs to be appended to the end of the `restReversedHead` list.
 *    The original `head.next` (which is now the tail of the `restReversedHead` list) should point back to `head`.
 *    So, `head.next.next = head`.
 * 4. Set `head.next = null` to break the original link and ensure `head` becomes the new tail.
 * 5. Return `restReversedHead` as the new head of the fully reversed list.
 *
 * @param head The head of the input linked list.
 * @returns The head of the reversed linked list.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 *                  Each node is visited once during the recursive calls.
 * Space Complexity: O(N) due to the recursion stack. In the worst case (a long list),
 *                   N stack frames might be created.
 */
export function reverseLinkedListRecursive(head: ListNode | null): ListNode | null {
    // Base case: if head is null or it's the last node, it's already reversed.
    if (head === null || head.next === null) {
        return head;
    }

    // Recursively reverse the rest of the list (from head.next onwards)
    const restReversedHead: ListNode | null = reverseLinkedListRecursive(head.next);

    // After the recursive call, head.next is the original second node,
    // which is now the tail of the 'restReversedHead' list.
    // We make its 'next' pointer point back to the current 'head'.
    head.next.next = head;

    // The current 'head' node is now the new tail of the reversed list.
    // Its 'next' pointer should be set to null.
    head.next = null;

    // The 'restReversedHead' is the new head of the entirely reversed list.
    return restReversedHead;
}