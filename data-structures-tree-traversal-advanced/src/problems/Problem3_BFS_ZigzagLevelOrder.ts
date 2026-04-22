```typescript
import { TreeNode } from '../data-structures/TreeNode';

/**
 * @module Problem3_BFS_ZigzagLevelOrder
 * @description Implements the Zigzag Level Order Traversal of a binary tree.
 */

/**
 * @function zigzagLevelOrderTraversal
 * @description Performs a zigzag level order traversal (BFS with direction change) of a binary tree.
 * Nodes at odd levels (0-indexed) are traversed left-to-right, and nodes at even levels
 * are traversed right-to-left.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[][]} A list of lists, where each inner list contains the
 *                        values of nodes at a specific level, with alternating
 *                        left-to-right and right-to-left order.
 *                        Returns an empty array if the root is null.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is enqueued
 *       and dequeued exactly once. The reversal for zigzag adds O(k) for each level
 *       where k is the number of nodes in that level, summing up to O(N) total.
 * Space: O(W), where W is the maximum width of the tree (for the queue). In the worst case (a complete
 *        binary tree), W can be N/2, so O(N).
 */
export function zigzagLevelOrderTraversal(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (root === null) {
        return result;
    }

    // Use a deque (double-ended queue) or an array that supports efficient shift/pop/unshift for BFS.
    // In JavaScript, array's shift() is O(N) but modern JS engines optimize it for small arrays.
    // For very large queues, a linked list based queue would be more performant for shift().
    const queue: TreeNode[] = [root];
    let isLeftToRight = true; // Flag to track traversal direction for the current level

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes: number[] = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!; // Always dequeue from the front
            currentLevelNodes.push(currentNode.val);

            // Enqueue children for the next level in normal left-to-right order
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }

        // Apply zigzag order based on the `isLeftToRight` flag
        if (!isLeftToRight) {
            currentLevelNodes.reverse(); // Reverse the array for right-to-left order
        }

        result.push(currentLevelNodes);
        isLeftToRight = !isLeftToRight; // Toggle direction for the next level
    }

    return result;
}
```