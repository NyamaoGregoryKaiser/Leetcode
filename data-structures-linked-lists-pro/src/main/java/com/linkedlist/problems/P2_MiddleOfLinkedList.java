```java
package com.linkedlist.problems;

import com.linkedlist.ListNode;

/**
 * Problem 2: Middle of the Linked List
 * Source: LeetCode 876 - https://leetcode.com/problems/middle-of-the-linked-list/
 *
 * Description:
 * Given the head of a singly linked list, return the middle node of the list.
 * If there are two middle nodes, return the second middle node.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [3,4,5] (node with value 3)
 * Explanation: The middle node of the list is node 3.
 *
 * Example 2:
 * Input: head = [1,2,3,4,5,6]
 * Output: [4,5,6] (node with value 4)
 * Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
 *
 * Constraints:
 * The number of nodes in the list is in the range [1, 100].
 * 1 <= Node.val <= 1000
 */
public class P2_MiddleOfLinkedList {

    /**
     * Approach 1: Fast and Slow Pointers (Tortoise and Hare Algorithm)
     *
     * This is the most efficient and common approach for finding the middle of a linked list.
     * It uses two pointers, one moving twice as fast as the other.
     *
     * Logic:
     * 1. Initialize two pointers, `slow` and `fast`, both starting at the `head`.
     * 2. In each step, `slow` moves one step forward (`slow = slow.next`), and `fast` moves two steps forward (`fast = fast.next.next`).
     * 3. When `fast` reaches the end of the list (i.e., `fast` becomes `null`) or `fast.next` becomes `null`
     *    (meaning `fast` is at the second-to-last node for an even-length list, or the last node for an odd-length list),
     *    `slow` will be exactly at the middle node.
     *
     * How it works:
     * - If the list has an odd number of nodes (e.g., 1 -> 2 -> 3 -> 4 -> 5):
     *   - `fast` reaches the last node (5). `fast.next` will be `null`.
     *   - `slow` will be at the middle node (3).
     * - If the list has an even number of nodes (e.g., 1 -> 2 -> 3 -> 4 -> 5 -> 6):
     *   - `fast` reaches `null` (after 6).
     *   - `slow` will be at the second middle node (4), which is the requirement.
     *
     * Consider edge cases:
     * - Empty list: Problem constraints state 1 <= N, so head is never null initially.
     * - Single node list: `head = [1]`
     *   - `slow = 1`, `fast = 1`
     *   - Loop condition `fast != null && fast.next != null` (`1 != null && 1.next != null`) is `true && false`, so `false`.
     *   - Loop does not run. Returns `slow` (which is `1`). Correct.
     *
     * Time Complexity: O(N)
     * The fast pointer traverses the list, effectively visiting each node once. The slow pointer traverses half the list.
     * Total operations are proportional to N.
     *
     * Space Complexity: O(1)
     * Only two pointers (`slow`, `fast`) are used, regardless of the list size.
     *
     * @param head The head of the singly linked list.
     * @return The middle node of the list.
     */
    public ListNode findMiddle(ListNode head) {
        // According to constraints, head will never be null, as N >= 1.
        // If N=1, slow=head, fast=head. Loop condition (fast.next != null) fails immediately.
        // Returns slow (which is head). This is correct.

        ListNode slow = head;
        ListNode fast = head;

        // The loop continues as long as `fast` and `fast.next` are not null.
        // This ensures `fast.next.next` is always a valid operation or correctly stops.
        while (fast != null && fast.next != null) {
            slow = slow.next;       // Slow pointer moves one step
            fast = fast.next.next;  // Fast pointer moves two steps
        }

        // When the loop terminates, slow will be at the middle node.
        // For odd length lists: fast will be at the last node, fast.next will be null.
        // For even length lists: fast will be null, slow will be at the second middle node.
        return slow;
    }


    /**
     * Approach 2: Count Nodes (Brute-force/Two-pass approach)
     *
     * This approach is simpler to understand but less efficient as it requires two passes over the list.
     *
     * Logic:
     * 1. First Pass: Traverse the entire list to count the total number of nodes (N).
     * 2. Second Pass: Traverse the list again from the head for `N / 2` steps. The node at this position
     *    will be the middle node.
     *
     * Example: List [1,2,3,4,5], N = 5
     * Middle index = 5 / 2 = 2 (0-indexed). The 3rd node is at index 2 (value 3).
     *
     * Example: List [1,2,3,4,5,6], N = 6
     * Middle index = 6 / 2 = 3 (0-indexed). The 4th node is at index 3 (value 4).
     * This matches the requirement to return the second middle node for even lists.
     *
     * Time Complexity: O(N)
     * The first pass takes O(N) to count nodes. The second pass takes O(N/2) to reach the middle.
     * Total is O(N) + O(N/2) = O(1.5N) which simplifies to O(N).
     *
     * Space Complexity: O(1)
     * Only a few integer variables (`count`, `middleIndex`) and a pointer are used.
     *
     * @param head The head of the singly linked list.
     * @return The middle node of the list.
     */
    public ListNode findMiddleWithCount(ListNode head) {
        // According to constraints, head will never be null, as N >= 1.

        // First pass: Count the number of nodes
        int count = 0;
        ListNode current = head;
        while (current != null) {
            count++;
            current = current.next;
        }

        // Calculate the index of the middle node. For N nodes, the middle is at index N/2 (0-indexed).
        // For N=5, middleIndex=2. For N=6, middleIndex=3.
        int middleIndex = count / 2;

        // Second pass: Traverse to the middle node
        current = head;
        for (int i = 0; i < middleIndex; i++) {
            current = current.next;
        }

        return current;
    }
}
```