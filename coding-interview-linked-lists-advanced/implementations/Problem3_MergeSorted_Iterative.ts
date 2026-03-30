```typescript
import { ListNode } from '../src/data-structures/LinkedList';

/**
 * Problem 3: Merge Two Sorted Lists - Iterative Approach
 *
 * This is an alternative approach to `mergeTwoListsRecursive` found in `src/algorithms/Problem3_MergeSorted.ts`.
 * This iterative solution uses constant extra space.
 *
 * Algorithm:
 * 1. Create a dummy node. This node simplifies the logic by always having a valid starting point
 *    for the merged list, even if one of the input lists is empty.
 *    Initialize a `tail` pointer to this dummy node. This `tail` pointer will always point
 *    to the last node added to the merged list.
 * 2. Loop while both `list1` and `list2` are not null:
 *    a. Compare `list1.val` and `list2.val`.
 *    b. Attach the node with the smaller value to `tail.next`.
 *    c. Move the pointer of the list from which the node was taken forward.
 *    d. Move the `tail` pointer forward (`tail = tail.next`).
 * 3. After the loop, one of the lists might still have remaining nodes (if they were of different lengths).
 *    Attach the remaining nodes of `list1` (if any) or `list2` (if any) to `tail.next`.
 * 4. Return `dummy.next`, which is the actual head of the merged sorted list (skipping the dummy node).
 *
 * Time Complexity: O(M + N)
 * Where M and N are the number of nodes in `list1` and `list2` respectively.
 * We traverse both lists once, comparing nodes. Each node is visited once.
 *
 * Space Complexity: O(1)
 * We only use a few constant extra pointers (`dummy`, `tail`, `list1`, `list2`).
 * No additional data structures are used, and no recursion stack.
 * This is generally preferred over the recursive solution for very large lists to avoid stack overflow.
 */
export function mergeTwoListsIterative(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Create a dummy node to simplify the logic of adding the first node
    const dummyHead = new ListNode(0);
    let currentTail: ListNode = dummyHead;

    // Loop while both lists have nodes to compare
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            // If list1's value is smaller (or equal), append list1's current node
            currentTail.next = list1;
            list1 = list1.next; // Move list1's pointer forward
        } else {
            // If list2's value is smaller, append list2's current node
            currentTail.next = list2;
            list2 = list2.next; // Move list2's pointer forward
        }
        // Move the currentTail pointer forward to the newly added node
        currentTail = currentTail.next;
    }

    // After the loop, one of the lists might still have remaining elements.
    // Append the rest of the non-empty list to the merged list.
    if (list1 !== null) {
        currentTail.next = list1;
    } else if (list2 !== null) {
        currentTail.next = list2;
    }

    // The actual head of the merged list is after the dummy node.
    return dummyHead.next;
}
```