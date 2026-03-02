```javascript
/**
 * @fileoverview Solutions for LeetCode Problem 141/142: Linked List Cycle I & II.
 * Provides functions to detect if a cycle exists and to find the starting node of the cycle.
 */

const { Node } = require('../data-structures/LinkedList');

/**
 * Problem Description (Linked List Cycle I - 141):
 * Given the head of a linked list, return true if there is a cycle in the linked list.
 * Otherwise, return false.
 * A cycle in a linked list means that some node in the list can be reached again by
 * continuously following the next pointer.
 *
 * Example:
 * Input: head = [3,2,0,-4], pos = 1 (meaning node at index 1, value 2, points to itself)
 * Output: true
 */

/**
 * --- Solution 1: Detect Cycle (Boolean Check) using Floyd's Tortoise and Hare Algorithm ---
 *
 * This algorithm uses two pointers, a "slow" pointer and a "fast" pointer.
 * - The slow pointer moves one step at a time.
 * - The fast pointer moves two steps at a time.
 *
 * If there is no cycle, the fast pointer will eventually reach the end of the list (null).
 * If there is a cycle, the fast pointer will eventually catch up to the slow pointer
 * inside the cycle. This is because every time the fast pointer makes a step, it
 * either gets closer to the slow pointer by 1 (if it's an even number of steps ahead)
 * or maintains the same distance (if it's an odd number of steps ahead, but the distance
 * effectively decreases on the next slow step). Eventually, they must meet.
 *
 * @param {Node|null} head The head of the linked list.
 * @returns {boolean} True if a cycle is present, false otherwise.
 * @complexity
 * Time: O(N) where N is the number of nodes in the list.
 *       In the worst case, the fast pointer traverses the entire list, and then both pointers
 *       traverse the cycle. The number of steps is proportional to N.
 * Space: O(1) auxiliary space.
 *        We only use two pointers.
 */
function hasCycle(head) {
    if (head === null || head.next === null) {
        return false; // An empty list or a list with a single node cannot have a cycle.
    }

    let slow = head;
    let fast = head;

    // The loop continues as long as fast and fast.next are not null.
    // This ensures fast doesn't go out of bounds before its next step.
    while (fast !== null && fast.next !== null) {
        slow = slow.next;         // Slow pointer moves one step
        fast = fast.next.next;    // Fast pointer moves two steps

        // If they meet, a cycle is detected
        if (slow === fast) {
            return true;
        }
    }

    // If the loop finishes, it means fast reached the end of the list, so no cycle
    return false;
}

/**
 * Problem Description (Linked List Cycle II - 142):
 * Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
 *
 * Example:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: Node with value 2 (the cycle starts at index 1)
 */

/**
 * --- Solution 2: Find Cycle Start Node using Floyd's Tortoise and Hare ---
 *
 * This builds upon the `hasCycle` algorithm.
 *
 * Phase 1: Detect the cycle. Use slow and fast pointers. If they meet, a cycle exists.
 *
 * Phase 2: Find the starting node.
 *   - When slow and fast meet, move `slow` back to `head`.
 *   - Keep `fast` at the meeting point.
 *   - Now, move both `slow` and `fast` one step at a time.
 *   - The point where they meet again is the start of the cycle.
 *
 * Mathematical proof for Phase 2:
 * Let `L` be the distance from head to cycle start.
 * Let `C` be the length of the cycle.
 * Let `K` be the distance from cycle start to the meeting point.
 *
 * When slow and fast meet:
 * Slow distance = `L + K`
 * Fast distance = `L + K + nC` (fast has completed `n` cycles)
 * Since fast moves twice as fast as slow: `2 * (L + K) = L + K + nC`
 * `2L + 2K = L + K + nC`
 * `L + K = nC`
 * `L = nC - K`
 * `L = (n-1)C + (C - K)`
 *
 * This means the distance from the head to the cycle start (`L`) is equal to
 * the distance from the meeting point back to the cycle start (`C - K`), plus any full cycles.
 * So, if you reset `slow` to `head` and keep `fast` at the meeting point,
 * and both move one step at a time, they will meet at the cycle start.
 *
 * @param {Node|null} head The head of the linked list.
 * @returns {Node|null} The starting node of the cycle, or null if no cycle.
 * @complexity
 * Time: O(N) where N is the number of nodes.
 *       Phase 1 (detection) is O(N). Phase 2 (finding start) is also O(N) in worst case (one traversal).
 * Space: O(1) auxiliary space.
 */
function detectCycle(head) {
    if (head === null || head.next === null) {
        return null;
    }

    let slow = head;
    let fast = head;
    let cycleDetected = false;

    // Phase 1: Detect the cycle
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            cycleDetected = true;
            break; // Cycle detected, break out of the loop
        }
    }

    // If no cycle was detected, return null
    if (!cycleDetected) {
        return null;
    }

    // Phase 2: Find the starting node of the cycle
    // Reset slow pointer to the head
    slow = head;

    // Move both pointers one step at a time until they meet.
    // This meeting point will be the start of the cycle.
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow; // Both slow and fast now point to the cycle's starting node
}

module.exports = {
    hasCycle,
    detectCycle
};
```