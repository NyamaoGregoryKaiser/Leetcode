```typescript
import { TreeNode } from '../data-structures/TreeNode';

/**
 * @module Problem2_BFS_LevelOrder
 * @description Implements the Level Order Traversal (BFS) of a binary tree.
 */

/**
 * @function levelOrderTraversal
 * @description Performs a level order traversal (BFS) of a binary tree.
 * Nodes are visited level by level, from left to right.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[][]} A list of lists, where each inner list contains the
 *                        values of nodes at a specific level from left to right.
 *                        Returns an empty array if the root is null.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is enqueued
 *       and dequeued exactly once.
 * Space: O(W), where W is the maximum width of the tree. In the worst case (a complete
 *        binary tree), W can be N/2, so O(N). For a skewed tree, W is 1, so O(1).
 *        Therefore, the space complexity is O(N) in the worst case.
 */
export function levelOrderTraversal(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (root === null) {
        return result;
    }

    // Use a queue for BFS. The queue will store TreeNode objects.
    const queue: TreeNode[] = [root];

    // Continue as long as there are nodes to process in the queue
    while (queue.length > 0) {
        // `levelSize` determines how many nodes are in the current level
        const levelSize = queue.length;
        const currentLevelNodes: number[] = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!; // Dequeue the front node

            currentLevelNodes.push(currentNode.val); // Add its value to the current level's list

            // Enqueue left child if it exists
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            // Enqueue right child if it exists
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        // After processing all nodes at the current level, add their values to the result
        result.push(currentLevelNodes);
    }

    return result;
}
```