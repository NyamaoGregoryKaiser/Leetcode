```javascript
/**
 * @fileoverview Problem: Detect Cycle in Linked List
 * Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
 *
 * There is a cycle in a linked list if there is some node in the list that can be reached again by
 * continuously following the next pointer. Internally, `pos` is used to denote the index of the node
 * that tail's next pointer is connected to. Note that `pos` is not passed as a parameter to this function.
 */

const ListNode = require('../utils/ListNode');

/**
 * Detects if a linked list has a cycle using Floyd's Tortoise and Hare algorithm.
 *
 * This algorithm uses two pointers, `slow` and `fast`.
 * - `slow` moves one step at a time.
 * - `fast` moves two steps at a time.
 *
 * If there is a cycle, `fast` will eventually catch up to `slow` inside the cycle.
 * If there is no cycle, `fast` will reach the end of the list (null).
 *
 * When `slow` and `fast` meet, it indicates the presence of a cycle. To find the start
 * of the cycle, we reset `slow` to the head of the list. Then, both `slow` and `fast`
 * move one step at a time. The point where they meet again is the start of the cycle.
 *
 * Why this works:
 * Let L be the length of the list, F be the length of the non-cyclic part, and C be the length of the cyclic part.
 * When slow and fast meet for the first time:
 *   Slow's distance: F + x (where x is distance into cycle)
 *   Fast's distance: F + x + nC (where n is number of full cycles fast completed)
 * Since fast moves twice as fast as slow:
 *   2 * (F + x) = F + x + nC
 *   2F + 2x = F + x + nC
 *   F + x = nC
 *   F = nC - x
 *   F = (n-1)C + (C - x)
 *
 * This implies that the distance from the head to the start of the cycle (F) is equal to
 * the distance from the meeting point to the start of the cycle (C-x, plus any full cycles n-1).
 * So, if we place one pointer at the head and another at the meeting point, and move them one step
 * at a time, they will meet at the start of the cycle.
 *
 * @param {ListNode | null} head The head of the linked list.
 * @returns {ListNode | null} The node where the cycle begins. Returns null if no cycle.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 *                  In the worst case (no cycle or a cycle at the end), both pointers traverse the list.
 *                  If a cycle exists, the pointers will meet within C steps after entering the cycle.
 * Space Complexity: O(1) as we only use a few extra pointers.
 */
function detectCycle(head) {
    if (!head || !head.next) {
        return null; // A cycle needs at least two nodes
    }

    let slow = head;
    let fast = head;

    // Phase 1: Detect if a cycle exists
    // The loop continues as long as `fast` and `fast.next` are not null.
    // This ensures `fast.next.next` is always valid before accessing it.
    while (fast !== null && fast.next !== null) {
        slow = slow.next;        // Slow pointer moves one step
        fast = fast.next.next;   // Fast pointer moves two steps

        // If slow and fast meet, a cycle is detected.
        if (slow === fast) {
            // Phase 2: Find the start of the cycle
            // Reset one pointer (slow) to the head.
            slow = head;
            // Move both pointers one step at a time until they meet again.
            // The meeting point will be the start of the cycle.
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow; // `slow` (or `fast`) is the starting node of the cycle
        }
    }

    // If the loop finishes, it means `fast` (or `fast.next`) became null,
    // indicating that the end of the list was reached and no cycle exists.
    return null;
}

module.exports = detectCycle;
```