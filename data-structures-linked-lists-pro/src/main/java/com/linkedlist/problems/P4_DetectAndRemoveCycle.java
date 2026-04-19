```java
package com.linkedlist.problems;

import com.linkedlist.ListNode;

import java.util.HashSet;
import java.util.Set;

/**
 * Problem 4: Detect and Remove Cycle in Linked List
 * Source: LeetCode 141 (Detect Cycle), 142 (Cycle Start), variations for removal.
 *
 * Description:
 * Given the head of a singly linked list, detect if there is a cycle in the linked list.
 * If a cycle exists, return the node where the cycle begins. If there is no cycle, return `null`.
 * Additionally, if a cycle is detected, modify the list to remove the cycle (i.e., set the `next`
 * pointer of the last node in the cycle to `null`).
 *
 * Example 1:
 * Input: head = [3,2,0,-4], pos = 1 (cycle connects to node with val 2)
 * Output: Node with value 2 (after removal: 3 -> 2 -> 0 -> -4 -> NULL)
 * Explanation: There is a cycle in the linked list, where the tail connects to the second node.
 *
 * Example 2:
 * Input: head = [1,2], pos = 0 (cycle connects to node with val 1)
 * Output: Node with value 1 (after removal: 1 -> 2 -> NULL)
 * Explanation: There is a cycle in the linked list, where the tail connects to the first node.
 *
 * Example 3:
 * Input: head = [1], pos = -1 (no cycle)
 * Output: null
 * Explanation: There is no cycle in the linked list.
 *
 * Constraints:
 * The number of nodes in the list is in the range [0, 10^5].
 * -10^5 <= Node.val <= 10^5
 * `pos` is -1 or a valid index in the linked list.
 */
public class P4_DetectAndRemoveCycle {

    /**
     * Approach 1: Floyd's Tortoise and Hare Algorithm (Optimal for O(1) space)
     *
     * This algorithm is a two-phase process:
     * Phase 1: Detect if a cycle exists.
     * Phase 2: If a cycle exists, find the starting node of the cycle and remove it.
     *
     * Logic for Cycle Detection (Phase 1):
     * 1. Use two pointers, `slow` and `fast`, both starting at the `head`.
     * 2. `slow` moves one step at a time, `fast` moves two steps at a time.
     * 3. If there is a cycle, `fast` will eventually catch up to `slow` (they will meet at some node within the cycle).
     * 4. If `fast` reaches `null` or `fast.next` reaches `null`, there is no cycle.
     *
     * Logic for Finding Cycle Start (Phase 2, if cycle detected):
     * 1. Once `slow` and `fast` meet (let's call this `meetingPoint`), a cycle is confirmed.
     * 2. To find the starting node of the cycle, reset `slow` to `head`.
     * 3. Move both `slow` and `fast` (from `meetingPoint`) one step at a time.
     * 4. The node where `slow` and `fast` meet *again* is the starting node of the cycle.
     *    Mathematical proof: If the distance from head to cycle start is `k`, and cycle length is `L`.
     *    When slow and fast meet, slow has traveled `d` steps, fast `2d` steps.
     *    `2d = d + nL` (where n is some integer indicating how many times fast completed the cycle)
     *    `d = nL`. So, the meeting point is `nL` steps from the cycle start (for `slow` to catch up).
     *    Also, `d = k + mL` for some integer m.
     *    This means `k + mL = nL`.
     *    So, `k` must be a multiple of `L` away from `meetingPoint`.
     *    Distance from head to cycle start = `k`.
     *    Distance from `meetingPoint` to cycle start = `L - (d % L)`.
     *    It can be proven that `k` is equal to the distance from `meetingPoint` to cycle start.
     *    Therefore, if you start one pointer from `head` and another from `meetingPoint`, and move them
     *    one step at a time, they will meet at the cycle start.
     *
     * Logic for Removing Cycle (Phase 2, after cycle start found):
     * 1. Once `cycleStart` is found, we need to find the node *just before* `cycleStart` (the last node in the cycle)
     *    and set its `next` pointer to `null`.
     * 2. Start a pointer `current` from `cycleStart`. Iterate `current` until `current.next` is `cycleStart`.
     *    This `current` node is the last node in the cycle.
     * 3. Set `current.next = null`.
     *
     * Time Complexity: O(N)
     * - Phase 1 (detection): `fast` pointer traverses the list, making at most 2N steps.
     * - Phase 2 (finding cycle start): `slow` and `fast` traverse at most N steps combined.
     * - Phase 3 (removal): `current` pointer traverses at most L steps (cycle length).
     * Overall, it's linear with respect to the number of nodes.
     *
     * Space Complexity: O(1)
     * Only a few pointers (`slow`, `fast`, `head`, `current`) are used, regardless of list size.
     *
     * @param head The head of the singly linked list.
     * @return The starting node of the cycle if detected, otherwise null. The list is modified to remove the cycle if found.
     */
    public ListNode detectAndRemoveCycleFloyds(ListNode head) {
        if (head == null || head.next == null) {
            return null; // No cycle possible with 0 or 1 node
        }

        ListNode slow = head;
        ListNode fast = head;
        ListNode meetingPoint = null;

        // Phase 1: Detect Cycle
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                meetingPoint = slow; // Cycle detected, they meet at 'slow' (or 'fast')
                break;
            }
        }

        if (meetingPoint == null) {
            return null; // No cycle found
        }

        // Phase 2: Find Cycle Start
        // Reset slow to head, move both pointers one step at a time until they meet again.
        // That meeting point is the start of the cycle.
        ListNode cycleStart = head;
        while (cycleStart != meetingPoint) {
            cycleStart = cycleStart.next;
            meetingPoint = meetingPoint.next;
        }

        // At this point, `cycleStart` is the node where the cycle begins.

        // Phase 3: Remove Cycle
        // Find the node just before `cycleStart` (the tail of the cycle)
        ListNode current = cycleStart;
        while (current.next != cycleStart) {
            current = current.next;
        }
        // `current` is now the last node in the cycle. Break the cycle.
        current.next = null;

        return cycleStart;
    }

    /**
     * Approach 2: Using a HashSet (Brute force / O(N) space)
     *
     * This approach is simpler to implement but uses extra space.
     *
     * Logic:
     * 1. Iterate through the linked list.
     * 2. For each node, check if it has already been visited by storing nodes in a `HashSet`.
     * 3. If a node is encountered that is already in the set, a cycle is detected, and that node
     *    is the start of the cycle.
     * 4. To remove the cycle, we need to keep track of the `previous` node. When the current node
     *    is detected in the set, the `previous` node's `next` pointer should be set to `null`.
     *
     * Time Complexity: O(N)
     * In the worst case, we traverse the entire list once. Hash set operations (add, contains)
     * take average O(1) time.
     *
     * Space Complexity: O(N)
     * In the worst case (no cycle or cycle at the very end), we store all N nodes in the hash set.
     *
     * @param head The head of the singly linked list.
     * @return The starting node of the cycle if detected, otherwise null. The list is modified to remove the cycle if found.
     */
    public ListNode detectAndRemoveCycleHashSet(ListNode head) {
        if (head == null || head.next == null) {
            return null; // No cycle possible with 0 or 1 node
        }

        Set<ListNode> visitedNodes = new HashSet<>();
        ListNode current = head;
        ListNode prev = null; // Keep track of the previous node for cycle removal

        while (current != null) {
            if (visitedNodes.contains(current)) {
                // Cycle detected! 'current' is the cycle start.
                // To remove the cycle, the previous node should point to null.
                if (prev != null) { // This check is important for cycle at head, where prev might be null
                    prev.next = null;
                } else {
                    // This case means the head itself is part of a self-loop (e.g., 1 -> 1)
                    // or a cycle that includes the head, but `prev` is null (e.g., head is cycle start,
                    // and its previous node is null or not visited yet, which shouldn't happen
                    // if current is the first node visited in the cycle).
                    // More correctly, if current is the head, and it's already in the set,
                    // it means a single node list self-loops or head is re-visited immediately.
                    // This scenario is handled by prev.next = null if prev is available.
                    // If cycle at head: [1] points to [1]. prev is null. This case needs careful handling.
                    // If prev is null, it means the cycle starts at the head, and the list is just the cycle.
                    // This can be simplified. We just return the cycle start. The removal logic needs to correctly find
                    // the node *whose next points to cycleStart*.
                    
                    // For the purpose of *removing* the cycle, this set approach is tricky if prev is null.
                    // A more robust way: once `current` is found in `visitedNodes`, `current` is `cycleStart`.
                    // Then iterate from `temp = head` until `temp.next == cycleStart`. Set `temp.next = null`.
                    // This might be tricky if cycleStart is head itself.

                    // Let's refine removal for HashSet:
                    // Once cycle start is detected, iterate from temp = head, until temp.next is cycleStart.
                    // This 'temp' is the node before the cycle start.
                    ListNode tailOfPreCycle = head;
                    while(tailOfPreCycle.next != current) {
                        tailOfPreCycle = tailOfPreCycle.next;
                    }
                    tailOfPreCycle.next = null;

                    return current; // Return the cycle start
                }
                return current; // Return the cycle start
            }

            visitedNodes.add(current);
            prev = current;
            current = current.next;
        }

        return null; // No cycle found
    }
}
```