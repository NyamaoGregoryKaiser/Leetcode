```java
package com.linkedlist.problems;

import com.linkedlist.ListNode;

/**
 * Problem 1: Reverse Linked List
 * Source: LeetCode 206 - https://leetcode.com/problems/reverse-linked-list/
 *
 * Description:
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
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
 * The number of nodes in the list is the range [0, 5000].
 * -5000 <= Node.val <= 5000
 */
public class P1_ReverseLinkedList {

    /**
     * Approach 1: Iterative Solution
     *
     * This is the most common and often preferred method for reversing a linked list
     * due to its O(1) space complexity and clarity.
     *
     * Logic:
     * We iterate through the list, changing the `next` pointer of each node to point to its previous node.
     * To do this, we need three pointers:
     * 1. `prev`: Keeps track of the previously processed node. Initially `null` because the new head (original tail)
     *    will point to `null`.
     * 2. `curr`: The current node being processed. Initially `head`.
     * 3. `nextTemp`: Temporarily stores the `curr.next` node before `curr.next` is modified. This is crucial
     *    to avoid losing the rest of the list.
     *
     * Steps:
     * 1. Initialize `prev = null` and `curr = head`.
     * 2. Loop while `curr` is not `null`:
     *    a. Store `curr.next` in `nextTemp`.
     *    b. Change `curr.next` to `prev`. This reverses the link.
     *    c. Move `prev` to `curr`. `prev` now becomes the node that was just processed.
     *    d. Move `curr` to `nextTemp`. `curr` now becomes the next node to be processed.
     * 3. After the loop, `curr` will be `null` (meaning we've traversed the entire original list),
     *    and `prev` will be pointing to the last node of the original list, which is the new head of the reversed list.
     *
     * Time Complexity: O(N)
     * We iterate through the list once, where N is the number of nodes. Each step inside the loop
     * takes constant time.
     *
     * Space Complexity: O(1)
     * We only use a few extra pointers (`prev`, `curr`, `nextTemp`), regardless of the list size.
     *
     * @param head The head of the singly linked list.
     * @return The head of the reversed linked list.
     */
    public ListNode reverseListIterative(ListNode head) {
        ListNode prev = null;   // Pointer to the previous node, initialized to null
        ListNode curr = head;   // Pointer to the current node, initialized to head

        // Iterate through the list until current becomes null (meaning we've processed all nodes)
        while (curr != null) {
            ListNode nextTemp = curr.next; // 1. Store the next node temporarily to avoid losing the rest of the list
            curr.next = prev;              // 2. Reverse the current node's pointer to point to the previous node
            prev = curr;                   // 3. Move 'prev' one step forward to the current node
            curr = nextTemp;               // 4. Move 'curr' one step forward to the next node (which was stored in nextTemp)
        }

        // When the loop finishes, 'curr' is null and 'prev' is the new head of the reversed list.
        return prev;
    }

    /**
     * Approach 2: Recursive Solution
     *
     * This approach uses recursion to reverse the list. It's often more elegant but can consume
     * more stack space for very long lists (leading to StackOverflowError in extreme cases).
     *
     * Logic:
     * The idea is to reverse the rest of the list (from `head.next`) first, and then attach `head`
     * to the end of the reversed sublist.
     *
     * Base Cases:
     * 1. If `head` is `null` (empty list) or `head.next` is `null` (single node list), the list
     *    is already reversed, so return `head`.
     *
     * Recursive Step:
     * 1. Call `reverseListRecursive(head.next)` to get the `newHead` of the sublist reversed from `head.next`.
     * 2. At this point, `head.next` points to what *was* the second node of the original list.
     *    Let's say original: `A -> B -> C ...`. When we're at `A`, `head.next` is `B`.
     *    The recursive call `reverseListRecursive(B)` returns the head of `... C -> B`.
     *    Now, `head.next` (which is `B`) still points to `C` (or the previous `head.next.next` from its perspective).
     *    We want `B` to point to `A`. So, `head.next.next = head`.
     * 3. Set `head.next = null` to break the original link and make `head` the new tail.
     * 4. Return `newHead` (which is the head of the fully reversed list).
     *
     * Example Trace (1 -> 2 -> 3 -> NULL):
     * reverseListRecursive(1)
     *   -> reverseListRecursive(2)
     *     -> reverseListRecursive(3)
     *       -> Base case: head=3, head.next=NULL. Returns 3. (newHead = 3)
     *     -> Back to reverseListRecursive(2):
     *        `newHead` is 3.
     *        `head` is 2. `head.next` is 3.
     *        `head.next.next = head;` means `3.next = 2;` (List is now: 3 -> 2).
     *        `head.next = null;` means `2.next = NULL;` (List is now: 3 -> 2 -> NULL).
     *        Returns `newHead` (which is 3).
     *   -> Back to reverseListRecursive(1):
     *      `newHead` is 3.
     *      `head` is 1. `head.next` is 2.
     *      `head.next.next = head;` means `2.next = 1;` (List is now: 3 -> 2 -> 1).
     *      `head.next = null;` means `1.next = NULL;` (List is now: 3 -> 2 -> 1 -> NULL).
     *      Returns `newHead` (which is 3).
     *
     * Final Result: 3 -> 2 -> 1 -> NULL
     *
     * Time Complexity: O(N)
     * Each node is visited once during the recursion.
     *
     * Space Complexity: O(N)
     * Due to the recursion stack. In the worst case (a list of N nodes), the depth of the recursion
     * can be N, consuming O(N) space on the call stack.
     *
     * @param head The head of the singly linked list.
     * @return The head of the reversed linked list.
     */
    public ListNode reverseListRecursive(ListNode head) {
        // Base case: If the list is empty or has only one node, it's already reversed.
        if (head == null || head.next == null) {
            return head;
        }

        // Recursively reverse the rest of the list (from head.next onwards)
        ListNode newHead = reverseListRecursive(head.next);

        // At this point, `head.next` is the original second node (e.g., node 'B' for 'A->B->C').
        // After the recursive call, `head.next` (node 'B') now points to the reversed sublist,
        // and its `next` pointer points to 'C' (or whatever was originally after 'B').
        // We want 'B' to point to 'A' (current 'head').
        head.next.next = head;

        // The current 'head' (node 'A') is now the last node in the reversed segment.
        // It should point to null.
        head.next = null;

        // 'newHead' is the head of the fully reversed list (e.g., node 'C' then 'B' then 'A').
        return newHead;
    }
}

```