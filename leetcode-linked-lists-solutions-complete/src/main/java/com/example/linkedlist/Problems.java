```java
package com.example.linkedlist;

import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * This class contains optimal solutions for various classic Linked List problems.
 * Each method includes detailed comments on logic, time, and space complexity.
 */
public class Problems {

    /**
     * Problem 1: Reorder List
     * Given a singly linked list L: L0 -> L1 -> ... -> Ln-1 -> Ln,
     * reorder it to: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...
     * You may not modify the values in the list's nodes. Only nodes themselves may be changed.
     *
     * Example:
     * Input: head = [1,2,3,4]
     * Output: [1,4,2,3]
     *
     * Example:
     * Input: head = [1,2,3,4,5]
     * Output: [1,5,2,4,3]
     *
     * Optimal Approach:
     * 1. Find the middle of the linked list. (e.g., using fast and slow pointers).
     * 2. Split the linked list into two halves. The second half starts from (middle.next).
     *    The first half ends at middle, so set middle.next = null.
     * 3. Reverse the second half of the linked list.
     * 4. Merge the two halves alternating nodes.
     *
     * Time Complexity: O(N)
     *   - Finding middle: O(N)
     *   - Reversing second half: O(N/2) = O(N)
     *   - Merging: O(N/2) = O(N)
     *   Overall: O(N)
     *
     * Space Complexity: O(1)
     *   - Only a few pointers are used, no extra data structures proportional to N.
     */
    public void reorderList(LinkedListNode head) {
        if (head == null || head.next == null) {
            return; // List is empty or has only one node, no reordering needed.
        }

        // Step 1: Find the middle of the linked list using fast and slow pointers.
        // When fast reaches the end, slow will be at the middle.
        LinkedListNode slow = head;
        LinkedListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // At this point, 'slow' is the middle node.
        // If the list has an odd number of nodes, slow is the actual middle.
        // If the list has an even number of nodes, slow is the first of the two middle nodes.

        // Step 2: Split the linked list into two halves.
        // first half: head -> ... -> (slow node before split)
        // second half: (slow.next before split) -> ... -> null
        LinkedListNode firstHalfHead = head;
        LinkedListNode secondHalfHead = slow.next; // The head of the second half
        slow.next = null; // Break the list into two distinct halves

        // Step 3: Reverse the second half of the linked list.
        secondHalfHead = reverseList(secondHalfHead);

        // Step 4: Merge the two halves alternating nodes.
        // Example: L1: 1 -> 2 -> 3
        //          L2: 6 -> 5 -> 4 (reversed from 4 -> 5 -> 6)
        // Result: 1 -> 6 -> 2 -> 5 -> 3 -> 4
        LinkedListNode p1 = firstHalfHead;
        LinkedListNode p2 = secondHalfHead;
        while (p1 != null && p2 != null) {
            LinkedListNode p1Next = p1.next; // Store next node of first half
            LinkedListNode p2Next = p2.next; // Store next node of second half

            p1.next = p2;       // Link first half node to second half node
            p2.next = p1Next;   // Link second half node to next first half node

            p1 = p1Next;        // Move p1 to its original next
            p2 = p2Next;        // Move p2 to its original next
        }
        // If one list is longer (only possible for the first half if odd length original list),
        // the remaining nodes are already correctly linked at the end of the merged list.
        // For example, if original list [1,2,3,4,5], first half [1,2,3], second half reversed [5,4].
        // Merging: 1->5->2->4->3. '3' remains linked to null naturally.
    }

    /**
     * Helper function to reverse a linked list.
     * This is a standard iterative approach.
     *
     * @param head The head of the list to be reversed.
     * @return The new head of the reversed list.
     */
    private LinkedListNode reverseList(LinkedListNode head) {
        LinkedListNode prev = null;
        LinkedListNode current = head;
        while (current != null) {
            LinkedListNode nextTemp = current.next; // Store next node
            current.next = prev;                   // Reverse current node's pointer
            prev = current;                        // Move prev to current node
            current = nextTemp;                    // Move current to next node
        }
        return prev; // 'prev' will be the new head (original tail)
    }

    /**
     * Problem 2: Add Two Numbers
     * You are given two non-empty linked lists representing two non-negative integers.
     * The digits are stored in reverse order, and each of their nodes contains a single digit.
     * Add the two numbers and return the sum as a linked list.
     * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
     *
     * Example:
     * Input: l1 = [2,4,3], l2 = [5,6,4]  (represents 342 + 465)
     * Output: [7,0,8]                     (represents 807)
     *
     * Example:
     * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
     * Output: [8,9,9,9,0,0,0,1]
     *
     * Optimal Approach:
     * Iterate through both lists simultaneously, summing digits and handling carry.
     * Create a new linked list for the result.
     *
     * Time Complexity: O(max(M, N)), where M and N are the lengths of l1 and l2 respectively.
     *   - We traverse each list at most once.
     *
     * Space Complexity: O(max(M, N))
     *   - A new linked list is created to store the sum. In the worst case (e.g., 99 + 1 = 100),
     *     the sum list can be one node longer than the longest input list.
     */
    public LinkedListNode addTwoNumbers(LinkedListNode l1, LinkedListNode l2) {
        // Dummy head for the result list, simplifies adding the first node.
        LinkedListNode dummyHead = new LinkedListNode(0);
        LinkedListNode current = dummyHead; // Pointer to build the result list
        int carry = 0; // Carry-over from previous sum

        // Iterate as long as there are digits in either list or a carry exists.
        while (l1 != null || l2 != null || carry != 0) {
            int val1 = (l1 != null) ? l1.val : 0; // Get value from l1, or 0 if l1 is null
            int val2 = (l2 != null) ? l2.val : 0; // Get value from l2, or 0 if l2 is null

            int sum = val1 + val2 + carry; // Calculate sum of digits and carry
            carry = sum / 10;              // Update carry (e.g., 17 / 10 = 1)
            int digit = sum % 10;          // Get the digit for the current node (e.g., 17 % 10 = 7)

            current.next = new LinkedListNode(digit); // Create new node with the digit
            current = current.next;                   // Move current pointer forward

            if (l1 != null) {
                l1 = l1.next; // Move l1 forward if not null
            }
            if (l2 != null) {
                l2 = l2.next; // Move l2 forward if not null
            }
        }

        return dummyHead.next; // The actual head of the sum list is after the dummy node.
    }

    /**
     * Problem 3: Merge k Sorted Lists
     * You are given an array of k linked-lists lists, each linked list is sorted in ascending order.
     * Merge all the linked-lists into one sorted linked list and return it.
     *
     * Example:
     * Input: lists = [[1,4,5],[1,3,4],[2,6]]
     * Output: [1,1,2,3,4,4,5,6]
     * Explanation: The linked lists are:
     * [1->4->5],
     * [1->3->4],
     * [2->6]
     * merging them into one sorted list: 1->1->2->3->4->4->5->6
     *
     * Optimal Approach: Using a Min-Priority Queue (Min-Heap).
     * 1. Create a Min-Priority Queue that stores LinkedListNodes, ordered by their 'val'.
     * 2. Add the head of each non-empty list into the priority queue.
     * 3. Repeatedly extract the minimum node from the PQ. This node is the next node in our merged list.
     * 4. If the extracted node has a 'next' node, add that 'next' node to the PQ.
     * 5. Continue until the PQ is empty.
     *
     * Time Complexity: O(N log k)
     *   - N is the total number of nodes across all k lists.
     *   - k is the number of linked lists.
     *   - Each node is added to the priority queue once and extracted once.
     *   - Adding/extracting from a priority queue of size k takes O(log k) time.
     *   - Total operations: N * O(log k).
     *
     * Space Complexity: O(k)
     *   - The priority queue stores at most k nodes (one from each list).
     */
    public LinkedListNode mergeKLists(LinkedListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        // Create a min-priority queue to store the head nodes of each list.
        // It will order nodes based on their 'val' in ascending order.
        PriorityQueue<LinkedListNode> minHeap = new PriorityQueue<>(Comparator.comparingInt(node -> node.val));

        // Add the head of each non-null list to the priority queue.
        for (LinkedListNode listHead : lists) {
            if (listHead != null) {
                minHeap.add(listHead);
            }
        }

        // Dummy head for the merged list, simplifies construction.
        LinkedListNode dummyHead = new LinkedListNode(0);
        LinkedListNode tail = dummyHead; // Pointer to the last node of the merged list

        // While the priority queue is not empty, extract the smallest node.
        while (!minHeap.isEmpty()) {
            LinkedListNode smallestNode = minHeap.poll(); // Get and remove the smallest node

            tail.next = smallestNode; // Append the smallest node to the merged list
            tail = tail.next;         // Move the tail pointer forward

            // If the extracted node has a next node, add it to the priority queue.
            // This ensures we always have the next available candidate from that list.
            if (smallestNode.next != null) {
                minHeap.add(smallestNode.next);
            }
        }

        return dummyHead.next; // The actual head of the merged list.
    }

    /**
     * Problem 4: Reverse Nodes in k-Group
     * Given the head of a linked list, reverse the nodes of the list k at a time,
     * and return the modified list.
     * k is a positive integer and is less than or equal to the length of the linked list.
     * If the number of nodes is not a multiple of k, then the remaining nodes,
     * in the end, should remain as they are.
     * You may not alter the values in the list's nodes, only nodes themselves may be changed.
     *
     * Example:
     * Input: head = [1,2,3,4,5], k = 2
     * Output: [2,1,4,3,5]
     *
     * Example:
     * Input: head = [1,2,3,4,5], k = 3
     * Output: [3,2,1,4,5]
     *
     * Optimal Approach: Iterative reversal of k-length segments.
     * This involves careful pointer manipulation to connect the reversed segments.
     *
     * 1. Use a dummy node to simplify handling the new head.
     * 2. Traverse the list, identifying k-node segments.
     * 3. For each k-node segment:
     *    a. Check if there are k nodes remaining. If not, break (or just append the rest).
     *    b. Reverse the k nodes.
     *    c. Connect the reversed segment back to the previous segment.
     *    d. The original head of the k-segment becomes the tail of the reversed segment.
     *       This tail then points to the next segment's head.
     *
     * Time Complexity: O(N)
     *   - Each node is visited and its `next` pointer is modified a constant number of times.
     *
     * Space Complexity: O(1)
     *   - Only a few pointers are used for iteration and reversal. No extra data structures
     *     proportional to N or k are created.
     */
    public LinkedListNode reverseKGroup(LinkedListNode head, int k) {
        if (head == null || k == 1) {
            return head; // No reversal needed for null list or k=1
        }

        // Dummy node to simplify handling the new head of the list.
        LinkedListNode dummy = new LinkedListNode(0);
        dummy.next = head;

        LinkedListNode prevGroupTail = dummy; // The node before the current k-group
        LinkedListNode current = head;        // The current node being processed

        while (current != null) {
            // Step 1: Check if there are at least k nodes remaining in the current segment.
            LinkedListNode groupHead = current; // Head of the current k-group
            LinkedListNode groupEnd = current;  // Will become the end of the current k-group

            int count = 0;
            while (groupEnd != null && count < k) {
                groupEnd = groupEnd.next;
                count++;
            }

            // If we don't have k nodes, we stop and don't reverse the remaining nodes.
            if (count < k) {
                break;
            }

            // Step 2: Reverse the k-group.
            // 'groupHead' is the start of the segment to reverse.
            // 'groupEnd' is the node *after* the segment to reverse (or null if it's the end of list).
            LinkedListNode reversedHead = reverseSublist(groupHead, groupEnd); // Reverses from groupHead up to (but not including) groupEnd

            // Step 3: Connect the reversed group.
            // The `prevGroupTail` (which initially is dummy) should point to the new `reversedHead`.
            // The original `groupHead` (which is now the tail of the reversed segment) should point to `groupEnd`.
            prevGroupTail.next = reversedHead;   // Connect the previous group to the new head of the reversed group
            groupHead.next = groupEnd;           // Connect the tail of the reversed group to the next group's head

            // Step 4: Update pointers for the next iteration.
            prevGroupTail = groupHead; // The tail of the current reversed group becomes the prevGroupTail for the next.
            current = groupEnd;        // The current node for the next iteration starts from where this group ended.
        }

        return dummy.next; // The new head of the entire modified list.
    }

    /**
     * Helper function to reverse a sublist of a linked list.
     * Reverses the list from 'start' up to (but not including) 'end'.
     *
     * @param start The first node of the sublist to reverse.
     * @param end   The node AFTER the last node of the sublist to reverse.
     *              The reversal stops just before 'end'.
     * @return The new head of the reversed sublist (which was 'start's k-th node).
     */
    private LinkedListNode reverseSublist(LinkedListNode start, LinkedListNode end) {
        LinkedListNode prev = null;
        LinkedListNode current = start;
        // Keep reversing until 'current' reaches 'end'.
        while (current != end) {
            LinkedListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev; // 'prev' is the new head of the reversed sublist.
    }
}
```