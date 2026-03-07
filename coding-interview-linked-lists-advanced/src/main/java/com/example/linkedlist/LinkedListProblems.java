```java
package com.example.linkedlist;

import java.util.HashSet;
import java.util.Stack;

/**
 * This class contains solutions to various common Linked List problems
 * encountered in coding interviews. Each method includes comments
 * explaining the logic, time complexity, and space complexity.
 */
public class LinkedListProblems {

    /**
     * Problem 1: Reverse Linked List
     * Given the head of a singly linked list, reverse the list, and return the reversed list.
     *
     * Approach 1: Iterative
     * We use three pointers: `prev`, `current`, and `nextTemp`.
     * - `prev` keeps track of the previously reversed node (initially null).
     * - `current` points to the node currently being processed (initially head).
     * - `nextTemp` temporarily stores `current.next` before `current.next` is changed.
     * In each iteration, we:
     * 1. Store `current.next` in `nextTemp`.
     * 2. Change `current.next` to `prev`.
     * 3. Move `prev` to `current`.
     * 4. Move `current` to `nextTemp`.
     * This process continues until `current` becomes `null`.
     *
     * Time Complexity: O(N), where N is the number of nodes in the linked list.
     * We iterate through the list exactly once.
     * Space Complexity: O(1).
     * We only use a few extra pointers, regardless of the list size.
     *
     * @param head The head of the linked list to be reversed.
     * @return The head of the reversed linked list.
     */
    public ListNode reverseListIterative(ListNode head) {
        ListNode prev = null;       // Pointer to the previous node (initially null)
        ListNode current = head;    // Pointer to the current node (initially head)

        while (current != null) {
            ListNode nextTemp = current.next; // Store the next node temporarily
            current.next = prev;              // Reverse current node's pointer
            prev = current;                   // Move prev pointer one step forward
            current = nextTemp;               // Move current pointer one step forward
        }
        return prev; // prev will be the new head of the reversed list
    }

    /**
     * Problem 1: Reverse Linked List
     * Approach 2: Recursive
     *
     * The recursive approach works by dividing the problem into smaller subproblems.
     * Base case: If the list is empty or has only one node, it's already reversed.
     * Recursive step:
     * 1. Recursively reverse the rest of the list (`head.next`). This call returns the new head of the reversed sublist.
     * 2. Point `head.next.next` to `head`. This effectively links the current head to the end of the reversed sublist.
     * 3. Set `head.next` to `null` to properly terminate the original head (which is now the tail).
     *
     * Time Complexity: O(N), where N is the number of nodes.
     * Each node is visited once during the recursion.
     * Space Complexity: O(N) due to the recursion stack.
     * In the worst case (a long list), the depth of the recursion can be N.
     *
     * @param head The head of the linked list to be reversed.
     * @return The head of the reversed linked list.
     */
    public ListNode reverseListRecursive(ListNode head) {
        // Base case: If head is null or it's the last node, it's already reversed
        if (head == null || head.next == null) {
            return head;
        }

        // Recursively reverse the rest of the list
        ListNode reversedRest = reverseListRecursive(head.next);

        // After the recursive call returns, `head.next` is the original second node.
        // `head.next.next` should now point back to `head`.
        head.next.next = head;

        // The original head is now the last node, so its next should be null.
        head.next = null;

        return reversedRest; // `reversedRest` is the new head of the entire reversed list
    }


    /**
     * Problem 2: Detect Cycle and Find Start Node
     * Given the head of a linked list, return the node where the cycle begins.
     * If there is no cycle, return null.
     *
     * Approach: Floyd's Tortoise and Hare (Slow and Fast Pointers)
     *
     * Phase 1: Detect the cycle.
     * - Initialize two pointers, `slow` and `fast`, both starting at `head`.
     * - `slow` moves one step at a time (`slow = slow.next`).
     * - `fast` moves two steps at a time (`fast = fast.next.next`).
     * - If there is a cycle, `slow` and `fast` will eventually meet.
     * - If `fast` or `fast.next` becomes `null`, there is no cycle.
     *
     * Phase 2: Find the start of the cycle.
     * - Once `slow` and `fast` meet, reset `slow` to `head`.
     * - Keep `fast` at the meeting point.
     * - Move both `slow` and `fast` one step at a time.
     * - The point where they meet again is the start of the cycle.
     *
     * Mathematical Proof for Phase 2:
     * Let L be the distance from head to cycle start.
     * Let C be the length of the cycle.
     * Let K be the distance from cycle start to meeting point.
     *
     * When slow and fast meet:
     * Distance covered by slow: `Ds = L + K`
     * Distance covered by fast: `Df = L + K + n*C` (where n is number of full cycles fast completed)
     * Also, `Df = 2 * Ds` (because fast moves twice as fast)
     * So, `2 * (L + K) = L + K + n*C`
     * `2L + 2K = L + K + n*C`
     * `L + K = n*C`
     * `L = n*C - K`
     * `L = (n-1)*C + (C - K)`
     * This means that the distance from the head to the cycle start (`L`) is equal to
     * `(n-1)` full cycles plus the remaining distance `(C - K)`.
     * `(C - K)` is the distance from the meeting point back to the cycle start
     * (moving `C-K` steps from the meeting point clockwise brings you to the start of the cycle).
     *
     * So, if we place one pointer at `head` (distance `L` from cycle start) and
     * another pointer at the meeting point (distance `C-K` from cycle start),
     * and move both one step at a time, they will meet at the cycle start.
     *
     * Time Complexity: O(N).
     * In Phase 1, `fast` covers at most `2N` steps, `slow` covers `N` steps.
     * In Phase 2, `slow` and `fast` cover at most `N` steps to meet.
     * Space Complexity: O(1).
     * Uses only a few extra pointers.
     *
     * @param head The head of the linked list.
     * @return The node where the cycle begins, or null if no cycle.
     */
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) {
            return null; // No cycle possible with 0 or 1 node
        }

        ListNode slow = head;
        ListNode fast = head;

        // Phase 1: Detect cycle
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                // Cycle detected, break out of loop to proceed to Phase 2
                break;
            }
        }

        // If fast or fast.next is null, no cycle was found
        if (fast == null || fast.next == null) {
            return null;
        }

        // Phase 2: Find the start of the cycle
        // Reset slow pointer to head
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }

        return slow; // Both pointers meet at the cycle start node
    }


    /**
     * Problem 3: Merge Two Sorted Lists
     * You are given the heads of two sorted linked lists, list1 and list2.
     * Merge the two lists into a single sorted list.
     * The list should be made by splicing together the nodes of the first two lists.
     * Return the head of the merged linked list.
     *
     * Approach: Iterative with a Dummy Node
     * - Create a dummy node to simplify the logic for handling the head of the merged list.
     * - Use a `current` pointer to build the new list.
     * - Compare the values of the nodes pointed to by `list1` and `list2`.
     * - Append the smaller node to `current.next` and advance that list's pointer.
     * - Advance `current` to its newly appended node.
     * - After one list is exhausted, append the remaining nodes of the other list.
     *
     * Time Complexity: O(M + N), where M and N are the lengths of list1 and list2.
     * We iterate through both lists once.
     * Space Complexity: O(1).
     * We only use a few extra pointers; no new nodes are created (we reuse existing nodes).
     *
     * @param list1 The head of the first sorted linked list.
     * @param list2 The head of the second sorted linked list.
     * @return The head of the merged sorted linked list.
     */
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Create a dummy node to act as the placeholder for the head of the merged list.
        // This simplifies handling the first node.
        ListNode dummyHead = new ListNode(0);
        ListNode current = dummyHead; // Pointer to build the new list

        // Iterate while both lists have nodes remaining
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1; // Append node from list1
                list1 = list1.next;   // Move list1 pointer forward
            } else {
                current.next = list2; // Append node from list2
                list2 = list2.next;   // Move list2 pointer forward
            }
            current = current.next; // Move current pointer forward in the merged list
        }

        // If one list is exhausted, append the remaining nodes of the other list
        if (list1 != null) {
            current.next = list1;
        } else {
            current.next = list2;
        }

        return dummyHead.next; // The actual head is after the dummy node
    }

    /**
     * Problem 4: Remove Nth Node From End of List
     * Given the head of a linked list, remove the n-th node from the end of the list and return its head.
     *
     * Approach: Two Pointers (Fast and Slow)
     * - Use a dummy node to handle edge cases like removing the head of the list.
     * - Initialize two pointers, `fast` and `slow`, both starting at the dummy node.
     * - Move `fast` `n` steps ahead. Now `fast` is `n` nodes ahead of `slow`.
     * - Move both `fast` and `slow` one step at a time until `fast` reaches the end of the list (`fast == null`).
     * - At this point, `slow` will be pointing to the node *before* the n-th node from the end.
     * - To remove the n-th node, update `slow.next = slow.next.next`.
     *
     * Time Complexity: O(N), where N is the number of nodes in the linked list.
     * We iterate through the list at most twice (once for fast to move `n` steps, then both move till end).
     * Space Complexity: O(1).
     * Uses only a few extra pointers.
     *
     * Edge Cases:
     * - `n` is equal to the length of the list (remove head).
     * - `n` is 1 (remove tail).
     * - List has only one node.
     * The dummy node handles the "remove head" case elegantly.
     *
     * @param head The head of the linked list.
     * @param n The position from the end of the list to remove.
     * @return The head of the modified linked list.
     */
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Create a dummy node to simplify edge cases, especially when the head needs to be removed.
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode fast = dummy;
        ListNode slow = dummy;

        // Move fast pointer n steps ahead.
        // This creates a gap of n nodes between fast and slow.
        for (int i = 0; i < n; i++) {
            // If n is larger than the list length, or list is null (shouldn't happen per problem constraints, but good defensive check)
            if (fast == null) return head; // Or throw an error depending on problem spec
            fast = fast.next;
        }

        // Move both fast and slow pointers until fast reaches the end of the list.
        // When fast reaches null, slow will be pointing to the node *before* the Nth node from the end.
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // Now slow.next is the Nth node from the end. Remove it.
        slow.next = slow.next.next;

        return dummy.next; // Return the new head (which might be the original head or null if it was removed)
    }

    /**
     * Problem 5: Reorder List
     * Given the head of a singly linked list. Reorder the list such that:
     * L0 → LN → L1 → LN-1 → L2 → LN-2 → ...
     * You may not modify the values in the list's nodes. Only nodes themselves may be changed.
     *
     * Approach:
     * This problem can be broken down into three main steps:
     * 1. Find the middle of the linked list.
     * 2. Reverse the second half of the linked list.
     * 3. Merge the first half and the reversed second half alternately.
     *
     * Step 1: Find the middle of the list.
     * Use slow and fast pointers. When fast reaches the end, slow is at the middle.
     * If the list has an odd number of nodes, slow will be the exact middle.
     * If even, slow will be the first of the two middle nodes.
     *
     * Step 2: Reverse the second half.
     * Disconnect the first half from the second half by setting `slow.next = null`.
     * Then, use the `reverseListIterative` method (or a similar one) to reverse the second half.
     *
     * Step 3: Merge the two halves.
     * Alternately take nodes from the first half and the reversed second half.
     *
     * Time Complexity: O(N), where N is the number of nodes in the linked list.
     * - Finding middle: O(N/2) = O(N)
     * - Reversing second half: O(N/2) = O(N)
     * - Merging: O(N/2) = O(N)
     * Total: O(N)
     * Space Complexity: O(1).
     * We only use a few extra pointers. No recursion stack for reversal if using iterative approach.
     *
     * @param head The head of the linked list to be reordered.
     */
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) {
            return; // No reordering needed for empty or single-node lists
        }

        // Step 1: Find the middle of the list
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // At this point, slow is at the middle.
        // For 1->2->3->4->5, slow is 3.
        // For 1->2->3->4, slow is 3.

        // Step 2: Split the list into two halves and reverse the second half
        ListNode firstHalfHead = head;
        ListNode secondHalfHead = slow.next; // Start of the second half
        slow.next = null; // Disconnect the two halves

        secondHalfHead = reverseListIterative(secondHalfHead); // Use the iterative reversal from above

        // Step 3: Merge the two halves alternately
        // first half: L0 -> L1 -> L2 -> ...
        // second half: LN -> LN-1 -> LN-2 -> ...
        // Result: L0 -> LN -> L1 -> LN-1 -> L2 -> LN-2 -> ...
        ListNode p1 = firstHalfHead;
        ListNode p2 = secondHalfHead;

        while (p1 != null && p2 != null) {
            ListNode nextP1 = p1.next; // Store next of p1
            ListNode nextP2 = p2.next; // Store next of p2

            p1.next = p2;       // Link p1 to p2
            p2.next = nextP1;   // Link p2 to original next of p1

            p1 = nextP1; // Move p1 to its original next
            p2 = nextP2; // Move p2 to its original next
        }
        // If p1 is not null, it means the original list had an odd number of nodes,
        // and p1 is the last node, which is already correctly linked.
        // If p2 is not null, it means there was an issue, which shouldn't happen if list lengths are correctly handled.
    }
}
```