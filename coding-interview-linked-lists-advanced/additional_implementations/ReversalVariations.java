```java
package com.example.linkedlist;

/**
 * This class provides different variations for reversing linked lists,
 * including iterative, recursive (already in LinkedListProblems, but shown here for completeness),
 * and a common variation: reversing nodes in K-groups.
 */
public class ReversalVariations {

    /**
     * Reverses a singly linked list iteratively.
     * This is the standard, most robust way for production code due to no stack limits.
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     *
     * @param head The head of the linked list to be reversed.
     * @return The new head of the reversed linked list.
     */
    public ListNode reverseListIterative(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }

    /**
     * Reverses a singly linked list recursively.
     * Elegant but can cause StackOverflowError for very long lists.
     * Time Complexity: O(N)
     * Space Complexity: O(N) due to recursion stack.
     *
     * @param head The head of the linked list to be reversed.
     * @return The new head of the reversed linked list.
     */
    public ListNode reverseListRecursive(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode reversedRest = reverseListRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return reversedRest;
    }

    /**
     * Problem: Reverse Nodes in k-Group
     * Given the head of a linked list, reverse the nodes of the list k at a time,
     * and return the modified list.
     * If the number of nodes is not a multiple of k, then left-out nodes in the end
     * should remain as they are.
     * You may not alter the values in the list's nodes, only nodes themselves may be changed.
     *
     * Approach: Iterative with helper for reversing a sublist.
     * 1. Use a dummy node to handle modifications at the head.
     * 2. Iterate through the list, marking the `prev` node before each group and the `current` node at the start of each group.
     * 3. Check if there are `k` nodes available for reversal in the current group. If not, break (or just link the remaining part).
     * 4. If `k` nodes are available, reverse this sublist of `k` nodes.
     *    - The reversal returns the new head and new tail of the reversed sublist.
     *    - Link `prev.next` to the new head of the reversed group.
     *    - Link the original `k-th` node (which is now the tail of the reversed group) to the `next` group.
     * 5. Update `prev` for the next iteration to be the current group's original head (which is now its tail).
     *
     * Example: 1->2->3->4->5, k=2
     * Dummy->1->2->3->4->5
     * prev=dummy, curr=1
     *
     * Iteration 1:
     * Check 2 nodes: 1, 2. Yes.
     * groupPrev = dummy
     * groupStart = 1
     * groupEnd = 2
     * nextGroupStart = 3
     *
     * Reverse 1->2: becomes 2->1
     * groupPrev.next = 2 (dummy->2)
     * groupStart.next = nextGroupStart (1.next = 3)
     * prev = groupStart (prev = 1)
     *
     * State: Dummy->2->1->3->4->5, prev=1, curr=3
     *
     * Iteration 2:
     * Check 2 nodes: 3, 4. Yes.
     * groupPrev = 1
     * groupStart = 3
     * groupEnd = 4
     * nextGroupStart = 5
     *
     * Reverse 3->4: becomes 4->3
     * groupPrev.next = 4 (1.next = 4)
     * groupStart.next = nextGroupStart (3.next = 5)
     * prev = groupStart (prev = 3)
     *
     * State: Dummy->2->1->4->3->5, prev=3, curr=5
     *
     * Iteration 3:
     * Check 2 nodes: only 5. Not enough.
     * Loop terminates.
     *
     * Return dummy.next (2->1->4->3->5)
     *
     * Time Complexity: O(N), each node is visited and its pointer changed a constant number of times.
     * Space Complexity: O(1).
     *
     * @param head The head of the linked list.
     * @param k The group size for reversal.
     * @return The head of the modified linked list.
     */
    public ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k <= 1) {
            return head;
        }

        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy; // Points to the node before the current group to be reversed.

        while (prev != null) {
            // Find the k-th node of the current group
            ListNode groupEnd = prev;
            for (int i = 0; i < k; i++) {
                if (groupEnd == null) break; // Not enough nodes for a full group
                groupEnd = groupEnd.next;
            }

            if (groupEnd == null) {
                // Not enough nodes to reverse the current group, break out.
                // The remaining nodes are left as they are, which is handled by prev.next remaining untouched.
                break;
            }

            ListNode groupStart = prev.next;   // The first node of the current group
            ListNode nextGroupStart = groupEnd.next; // The first node of the next group

            // Now, reverse the group from groupStart to groupEnd (inclusive)
            // This is a standard sublist reversal logic
            ListNode current = groupStart;
            ListNode groupPrev = groupEnd.next; // This will become the next of groupStart (which is now tail)
                                                // So, current.next should point to groupPrev
            while (current != nextGroupStart) { // Iterate until current reaches the node after groupEnd
                ListNode nextTemp = current.next;
                current.next = groupPrev; // Reverse the link
                groupPrev = current;      // Move groupPrev to current
                current = nextTemp;       // Move current to next
            }
            // After this loop, groupPrev is the new head of the reversed segment (groupEnd originally)
            // current is nextGroupStart

            // Connect the reversed group to the rest of the list
            prev.next = groupEnd;       // Link the previous segment's end to the new head of the reversed group
                                        // groupEnd is actually the *new* head of the reversed group
            groupStart.next = nextGroupStart; // Link the original groupStart (now tail) to the next group

            // Update prev for the next iteration: it's now the original groupStart (which is the tail of the reversed group)
            prev = groupStart;
        }

        return dummy.next;
    }
}
```