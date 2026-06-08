```javascript
/**
 * @fileoverview Alternative Solution: Detect Cycle in Linked List (using Set)
 * This file provides an alternative solution for detecting a cycle in a linked list using a Set.
 */

const ListNode = require('../utils/ListNode');

/**
 * Detects if a linked list has a cycle using a Set to store visited nodes.
 *
 * This approach iterates through the linked list, adding each node to a Set.
 * If a node is encountered that is already in the Set, a cycle is detected,
 * and that node is the starting point of the cycle.
 *
 * If the end of the list (null) is reached, no cycle exists.
 *
 * @param {ListNode | null} head The head of the linked list.
 * @returns {ListNode | null} The node where the cycle begins. Returns null if no cycle.
 *
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 *                  In the worst case (no cycle), we traverse all N nodes.
 *                  Set operations (add, has) take O(1) on average.
 * Space Complexity: O(N) because, in the worst case (no cycle), we store all N nodes
 *                   in the Set. This can be problematic for very large lists due to memory limits.
 */
function detectCycleSet(head) {
    if (!head) {
        return null; // An empty list cannot have a cycle
    }

    const visitedNodes = new Set();
    let current = head;

    while (current !== null) {
        // If the current node is already in the set, we've found the start of a cycle.
        if (visitedNodes.has(current)) {
            return current;
        }
        // Otherwise, add the current node to the set and move to the next.
        visitedNodes.add(current);
        current = current.next;
    }

    // If the loop finishes, it means we reached the end of the list without finding a duplicate,
    // so there is no cycle.
    return null;
}

module.exports = detectCycleSet;
```