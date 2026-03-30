```typescript
import { ListNode } from '../src/data-structures/LinkedList';

/**
 * Problem 1: Reverse Linked List - Recursive Approach
 *
 * This is an alternative approach to `reverseListIterative` found in `src/algorithms/Problem1_ReverseList.ts`.
 *
 * The recursive solution works by breaking down the problem into smaller, similar subproblems.
 *
 * Algorithm:
 * 1. Base Case: If the head is null (empty list) or head.next is null (single node list),
 *    the list is already reversed. Return the head.
 * 2. Recursive Step:
 *    a. Recursively reverse the rest of the list: `newHead = reverseListRecursive(head.next)`.
 *       `newHead` will be the new head of the sub-list starting from `head.next` after it's reversed.
 *    b. The current `head.next` (which is `tail` of the sub-list after recursive call)
 *       should now point back to `head`. So, `head.next.next = head`.
 *    c. The original `head` should now be the tail of the new reversed list segment,
 *       so its `next` pointer must be set to `null`. `head.next = null`.
 *    d. Return `newHead`, which is the head of the fully reversed list.
 *
 * Let's trace with [1 -> 2 -> 3 -> 4 -> 5]:
 * reverseListRecursive([1,2,3,4,5])
 *   -> reverseListRecursive([2,3,4,5])
 *      -> reverseListRecursive([3,4,5])
 *         -> reverseListRecursive([4,5])
 *            -> reverseListRecursive([5]) // Base case: head.next is null. Returns 5.
 *         // Now back in reverseListRecursive([4,5]) call, newHead = 5
 *         // head = 4
 *         // head.next = 5
 *         // head.next.next = head  => 5.next = 4 (List: 5 -> 4)
 *         // head.next = null      => 4.next = null (List: 5 -> 4 -> null)
 *         // Returns 5
 *      // Now back in reverseListRecursive([3,4,5]) call, newHead = 5
 *      // head = 3
 *      // head.next = 4 (now 4 is part of 5->4)
 *      // head.next.next = head  => 4.next = 3 (List: 5 -> 4 -> 3)
 *      // head.next = null      => 3.next = null (List: 5 -> 4 -> 3 -> null)
 *      // Returns 5
 *   ... and so on, until the initial call returns 5.
 *
 * Time Complexity: O(N)
 * Each node is visited exactly once during the recursive calls.
 *
 * Space Complexity: O(N)
 * This is due to the recursion stack. In the worst case (a long list),
 * there will be N stack frames, each consuming some memory.
 * This can lead to a Stack Overflow for very large lists in some languages/environments.
 * For this reason, the iterative approach is often preferred in production code,
 * although recursive solutions are elegant and good for interviews.
 */
export function reverseListRecursive(head: ListNode | null): ListNode | null {
    // Base case: If head is null (empty list) or head.next is null (single node list),
    // the list is already reversed, so return head.
    if (head === null || head.next === null) {
        return head;
    }

    // Recursively reverse the rest of the list.
    // 'newHead' will be the head of the list starting from head.next, after it's been reversed.
    const newHead: ListNode | null = reverseListRecursive(head.next);

    // After the recursive call, 'head.next' is now the last node of the reversed sublist.
    // We want this last node to point back to the current 'head'.
    head.next.next = head;

    // The current 'head' is now the new tail of the reversed sublist, so its next pointer must be null.
    head.next = null;

    // 'newHead' is the head of the fully reversed list (from the original 'head.next' all the way to the end).
    // We pass this 'newHead' up the call stack.
    return newHead;
}
```