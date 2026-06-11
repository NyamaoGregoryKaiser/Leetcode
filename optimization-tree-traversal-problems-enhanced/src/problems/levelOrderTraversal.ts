/**
 * @fileoverview Implements the Breadth-First Search (BFS) / Level Order Traversal
 * for a binary tree.
 */

import { TreeNode } from '../utils/treeNode';

/**
 * @interface ILevelOrderTraversal
 * Defines the contract for an object exposing level order traversal methods.
 */
export interface ILevelOrderTraversal {
    levelOrder(root: TreeNode | null): number[][];
}

/**
 * Implements Level Order Traversal (BFS).
 */
export class LevelOrderTraversal implements ILevelOrderTraversal {

    /**
     * Performs a Level Order Traversal (Breadth-First Search) on a binary tree.
     * Returns a list of lists, where each inner list contains the node values
     * at that level from left to right.
     *
     * @param root The root of the binary tree.
     * @returns A 2D array representing the level order traversal.
     *
     * Time Complexity: O(N) - Each node is enqueued and dequeued exactly once.
     * Space Complexity: O(W) - Where W is the maximum width of the tree.
     *                     In the worst case (a complete binary tree), W can be N/2, so O(N).
     */
    levelOrder(root: TreeNode | null): number[][] {
        const result: number[][] = [];
        if (!root) {
            return result;
        }

        // Use a queue to manage nodes to visit. Queue stores TreeNode objects.
        const queue: TreeNode[] = [root];

        while (queue.length > 0) {
            // Number of nodes at the current level
            const levelSize = queue.length;
            const currentLevelNodes: number[] = [];

            // Iterate over all nodes at the current level
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift()!; // Dequeue the first node
                currentLevelNodes.push(node.val); // Add its value to the current level list

                // Enqueue its children for the next level
                if (node.left !== null) {
                    queue.push(node.left);
                }
                if (node.right !== null) {
                    queue.push(node.right);
                }
            }
            result.push(currentLevelNodes); // Add the list of current level nodes to the final result
        }

        return result;
    }
}