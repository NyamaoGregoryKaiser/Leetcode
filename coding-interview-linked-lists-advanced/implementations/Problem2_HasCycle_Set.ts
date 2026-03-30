```typescript
import { ListNode } from '../src/data-structures/LinkedList';

/**
 * Problem 2: Linked List Cycle - Using a HashSet (Alternative Solution)
 *
 * This is an alternative approach to `hasCycle` found in `src/algorithms/Problem2_HasCycle.ts`.
 * While functionally correct, it uses more space than Floyd's Tortoise and Hare algorithm.
 *
 * Algorithm:
 * 1. Initialize an empty `Set` (or `HashSet` in other languages) to store visited nodes.
 * 2. Iterate through the linked list, starting from the head.
 * 3. For each node `current`:
 *    a. Check if `current` is already in the `Set`. If it is, a cycle is detected, and we return `true`.
 *    b. If `current` is not in the `Set`, add it to the `Set`.
 *    c. Move to the next node: `current = current.next`.
 * 4. If the loop finishes (meaning `current` becomes `null`), it means we reached the end of the list
 *    without encountering any previously visited nodes, so there is no cycle. Return `false`.
 *
 * Time Complexity: O(N)
 * In the worst case (no cycle), we traverse the entire list, visiting each node once.
 * Hash Set operations (add, check existence) take O(1) on average. So, total time is O(N).
 *
 * Space Complexity: O(N)
 * In the worst case (no cycle), we store all N nodes in the `Set`.
 * This can be a significant memory overhead for very long lists.
 */
export function hasCycleSet(head: ListNode | null): boolean {
    // If the list is empty, a cycle is not possible.
    if (head === null) {
        return false;
    }

    // Use a Set to store nodes we have already visited.
    const visitedNodes: Set<ListNode> = new Set();
    let current: ListNode | null = head;

    // Traverse the list
    while (current !== null) {
        // If the current node is already in the set, we've found a cycle.
        if (visitedNodes.has(current)) {
            return true;
        }

        // Otherwise, add the current node to the set and move to the next node.
        visitedNodes.add(current);
        current = current.next;
    }

    // If we reach here, it means we traversed the entire list without finding a cycle.
    return false;
}
```