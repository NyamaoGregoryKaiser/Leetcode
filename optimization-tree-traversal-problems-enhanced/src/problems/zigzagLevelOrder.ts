/**
 * @fileoverview Implements the Zigzag Level Order Traversal for a binary tree.
 * This is a variation of BFS where levels alternate direction.
 */

import { TreeNode } from '../utils/treeNode';

/**
 * @interface IZigzagLevelOrder
 * Defines the contract for an object exposing zigzag level order traversal methods.
 */
export interface IZigzagLevelOrder {
    zigzagLevelOrder(root: TreeNode | null): number[][];
}

/**
 * Implements Zigzag Level Order Traversal.
 */
export class ZigzagLevelOrder implements IZigzagLevelOrder {

    /**
     * Performs a Zigzag Level Order Traversal on a binary tree.
     * Returns a list of lists, where each inner list contains the node values
     * at that level. The order alternates: left-to-right, then right-to-left, and so on.
     *
     * @param root The root of the binary tree.
     * @returns A 2D array representing the zigzag level order traversal.
     *
     * Time Complexity: O(N) - Each node is enqueued and dequeued exactly once.
     * Space Complexity: O(W) - Where W is the maximum width of the tree.
     *                     In the worst case (a complete binary tree), W can be N/2, so O(N).
     */
    zigzagLevelOrder(root: TreeNode | null): number[][] {
        const result: number[][] = [];
        if (!root) {
            return result;
        }

        // Use a queue for BFS.
        const queue: TreeNode[] = [root];
        // Flag to determine the current level's traversal direction.
        // True for left-to-right, false for right-to-left.
        let isLeftToRight = true;

        while (queue.length > 0) {
            const levelSize = queue.length;
            // Use a temporary array to store nodes of the current level.
            // Using a regular array and then reversing or unshifting dynamically
            // can be less efficient than a deque/double-ended queue for JS arrays.
            // However, `unshift` is O(N) for small arrays and `reverse` is O(N).
            // For simplicity and common JS interview settings, we'll use a standard array
            // and `unshift` or `reverse` as needed.
            const currentLevelNodes: number[] = [];

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift()!; // Dequeue from the front

                // Add node value based on direction
                if (isLeftToRight) {
                    currentLevelNodes.push(node.val); // Append to end for L-R
                } else {
                    currentLevelNodes.unshift(node.val); // Prepend to front for R-L
                }

                // Enqueue children for the next level (always left then right for standard BFS order)
                if (node.left !== null) {
                    queue.push(node.left);
                }
                if (node.right !== null) {
                    queue.push(node.right);
                }
            }

            result.push(currentLevelNodes);
            // Toggle direction for the next level
            isLeftToRight = !isLeftToRight;
        }

        return result;
    }
}