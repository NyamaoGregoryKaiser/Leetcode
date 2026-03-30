```typescript
import { ListNode } from '../data-structures/LinkedList';

/**
 * Problem 3: Merge Two Sorted Lists
 *
 * You are given the heads of two sorted linked lists `list1` and `list2`.
 * Merge the two lists into one **sorted** list. The list should be made by splicing together
 * the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Example 1:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Example 2:
 * Input: list1 = [], list2 = []
 * Output: []
 *
 * Example 3:
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 *
 * Constraints:
 * The number of nodes in both lists is in the range [0, 50].
 * -100 <= Node.val <= 100
 * Both `list1` and `list2` are sorted in non-decreasing order.
 */

/**
 * Optimal Solution: Recursive Approach to Merge Two Sorted Lists
 *
 * This method leverages recursion to merge the two sorted lists. It compares the heads
 * of the two lists and recursively merges the rest.
 *
 * Algorithm:
 * 1. Base Cases:
 *    - If `list1` is null, it means there's nothing left in `list1`. Return `list2`.
 *    - If `list2` is null, it means there's nothing left in `list2`. Return `list1`.
 * 2. Recursive Step:
 *    - Compare `list1.val` and `list2.val`.
 *    - If `list1.val` is smaller or equal to `list2.val`:
 *      - `list1` becomes the current node in the merged list.
 *      - Recursively merge the rest of `list1` (`list1.next`) with `list2`.
 *      - Set `list1.next` to the result of this recursive call.
 *      - Return `list1`.
 *    - Else (if `list2.val` is smaller):
 *      - `list2` becomes the current node in the merged list.
 *      - Recursively merge `list1` with the rest of `list2` (`list2.next`).
 *      - Set `list2.next` to the result of this recursive call.
 *      - Return `list2`.
 *
 * Time Complexity: O(M + N)
 * Where M and N are the number of nodes in `list1` and `list2` respectively.
 * In each recursive call, we compare the head of the remaining lists and make a constant
 * number of operations. The recursion depth goes up to M+N, and each node is processed once.
 *
 * Space Complexity: O(M + N)
 * This is due to the recursion stack. In the worst case (e.g., one list is much longer),
 * the depth of the recursion can be M + N, consuming stack space proportional to the total number of nodes.
 *
 * For an iterative solution (O(1) space), refer to implementations/Problem3_MergeSorted_Iterative.ts
 */
export function mergeTwoListsRecursive(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Base Case 1: If list1 is empty, the merged list is just list2.
    if (list1 === null) {
        return list2;
    }
    // Base Case 2: If list2 is empty, the merged list is just list1.
    if (list2 === null) {
        return list1;
    }

    let mergedHead: ListNode;

    // Compare the values of the current heads
    if (list1.val <= list2.val) {
        // If list1's value is smaller (or equal), it becomes the head of the merged list.
        mergedHead = list1;
        // Recursively merge the rest of list1 with list2, and set it as the next of mergedHead.
        mergedHead.next = mergeTwoListsRecursive(list1.next, list2);
    } else {
        // If list2's value is smaller, it becomes the head of the merged list.
        mergedHead = list2;
        // Recursively merge list1 with the rest of list2, and set it as the next of mergedHead.
        mergedHead.next = mergeTwoListsRecursive(list1, list2.next);
    }

    return mergedHead;
}
```