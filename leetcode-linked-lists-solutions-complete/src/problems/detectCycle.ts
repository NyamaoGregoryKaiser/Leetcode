import { ListNode } from '@data-structures/ListNode';

/**
 * Problem: Detect Cycle in Linked List
 * Given the head of a linked list, return the node where the cycle begins.
 * If there is no cycle, return null.
 */

/**
 * Solution 1: Floyd's Tortoise and Hare (Fast and Slow Pointers)
 *
 * This is the optimal approach for detecting a cycle and finding its start node
 * with O(1) space complexity.
 *
 * Part 1: Detect the cycle
 * 1. Initialize two pointers, `slow` and `fast`, both starting at `head`.
 * 2. Move `slow` by one step and `fast` by two steps in each iteration.
 * 3. If there is a cycle, `fast` will eventually meet `slow` (they will point to the same node).
 *    If `fast` or `fast.next` becomes `null`, there is no cycle.
 *
 * Part 2: Find the starting node of the cycle
 * 1. Once `slow` and `fast` meet (let's call this meeting point `intersection`).
 * 2. Reset `slow` to `head`.
 * 3. Move both `slow` and `fast` one step at a time.
 * 4. The node where they meet again is the starting node of the cycle.
 *
 * Why does this work?
 * - Let `L` be the distance from head to the start of the cycle.
 * - Let `C` be the length of the cycle.
 * - Let `K` be the distance from the cycle start to the meeting point `intersection`.
 * - When `slow` and `fast` meet:
 *   `slow` has traveled `L + K` steps.
 *   `fast` has traveled `L + K + nC` steps for some integer `n` (multiple full cycles).
 *   Since `fast` travels twice as fast as `slow`, `2 * (L + K) = L + K + nC`.
 *   This simplifies to `L + K = nC`.
 * - To find the cycle start:
 *   We need to find the node `X` such that `distance(head, X) = distance(intersection, X)` (moving `X` towards head).
 *   We know `L = nC - K`.
 *   We also know `distance_from_intersection_to_cycle_start = C - K`.
 *   If we move `slow` from `head` (`L` steps) and `fast` from `intersection` (`C - K` steps),
 *   they will meet at the cycle start.
 *   Since `L = nC - K`, and `nC - K` is equivalent to `(n-1)C + (C-K)`,
 *   `L` steps from head is effectively `(C-K)` steps after potentially `(n-1)` full cycles.
 *   Thus, `L` steps from head will lead to the same node as `C-K` steps from the intersection point.
 *
 * @param head The head of the linked list.
 * @returns The ListNode where the cycle begins, or null if no cycle.
 *
 * Time Complexity: O(N) where N is the number of nodes in the list.
 *                  In the worst case, both pointers traverse the list at most twice.
 * Space Complexity: O(1) as only a few pointers are used.
 */
export function detectCycleFloyd(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return null; // No cycle possible with 0 or 1 node
    }

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // Part 1: Detect if a cycle exists
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;          // Move slow by 1 step
        fast = fast.next.next;      // Move fast by 2 steps

        if (slow === fast) {
            // Cycle detected!
            // Part 2: Find the start of the cycle
            let ptr1: ListNode | null = head;
            let ptr2: ListNode | null = slow; // This is the meeting point

            while (ptr1 !== ptr2) {
                ptr1 = ptr1!.next;
                ptr2 = ptr2!.next;
            }
            return ptr1; // ptr1 (and ptr2) now points to the start of the cycle
        }
    }

    return null; // No cycle found
}

/**
 * Solution 2: Using a Hash Set (Brute Force / Extra Space)
 *
 * This approach uses a `Set` to keep track of all visited nodes.
 *
 * 1. Initialize an empty `Set` to store visited `ListNode` objects.
 * 2. Traverse the linked list using a `current` pointer starting from `head`.
 * 3. In each step:
 *    a. If `current` is `null`, it means we reached the end of the list, so no cycle. Return `null`.
 *    b. If `current` is already in the `Set`, it means we've encountered this node before,
 *       which indicates the start of a cycle. Return `current`.
 *    c. Otherwise, add `current` to the `Set` and move `current` to `current.next`.
 *
 * @param head The head of the linked list.
 * @returns The ListNode where the cycle begins, or null if no cycle.
 *
 * Time Complexity: O(N) where N is the number of nodes in the list.
 *                  In the worst case, we visit each node once and perform set operations (average O(1)).
 * Space Complexity: O(N) in the worst case, as we might store all N nodes in the hash set.
 */
export function detectCycleHashSet(head: ListNode | null): ListNode | null {
    const visitedNodes: Set<ListNode> = new Set<ListNode>();
    let current: ListNode | null = head;

    while (current !== null) {
        if (visitedNodes.has(current)) {
            return current; // Cycle detected, this is the start node
        }
        visitedNodes.add(current);
        current = current.next;
    }

    return null; // No cycle found
}