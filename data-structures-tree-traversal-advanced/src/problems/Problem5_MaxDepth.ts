```typescript
import { TreeNode } from '../data-structures/TreeNode';

/**
 * @module Problem5_MaxDepth
 * @description Functions to calculate the maximum depth of a binary tree.
 */

/**
 * ====================================================================
 * 1. Maximum Depth using Recursive DFS
 * This is the most common and concise approach for depth.
 * ====================================================================
 */

/**
 * @function maxDepthDFS_Recursive
 * @description Calculates the maximum depth of a binary tree using a recursive Depth-First Search (DFS) approach.
 * The depth of a tree is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number} The maximum depth of the tree. Returns 0 if the tree is empty (root is null).
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is visited exactly once.
 * Space: O(H), where H is the height of the tree, due to the recursion stack.
 *        Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
export function maxDepthDFS_Recursive(root: TreeNode | null): number {
    // Base case: If the node is null, it contributes 0 to the depth.
    if (root === null) {
        return 0;
    }

    // Recursively calculate the maximum depth of the left and right subtrees.
    const leftDepth = maxDepthDFS_Recursive(root.left);
    const rightDepth = maxDepthDFS_Recursive(root.right);

    // The depth of the current tree is 1 (for the current node) plus the maximum
    // of the left and right subtree depths.
    return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * ====================================================================
 * 2. Maximum Depth using Iterative BFS (Level Order Traversal)
 * This approach counts levels.
 * ====================================================================
 */

/**
 * @function maxDepthBFS_Iterative
 * @description Calculates the maximum depth of a binary tree using an iterative Breadth-First Search (BFS) approach.
 * This method counts the number of levels in the tree.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number} The maximum depth of the tree. Returns 0 if the tree is empty (root is null).
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is enqueued and dequeued exactly once.
 * Space: O(W), where W is the maximum width of the tree (for the queue). In the worst case (a complete
 *        binary tree), W can be N/2, so O(N).
 */
export function maxDepthBFS_Iterative(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    const queue: TreeNode[] = [root];
    let depth = 0; // Initialize depth counter

    while (queue.length > 0) {
        depth++; // Increment depth for each new level processed
        const levelSize = queue.length; // Number of nodes at the current level

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!; // Dequeue a node

            // Enqueue its children for the next level
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    return depth;
}
```