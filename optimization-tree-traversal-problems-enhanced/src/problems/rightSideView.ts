/**
 * @fileoverview Implements the Binary Tree Right Side View problem.
 * This problem can be solved efficiently using either BFS (level order traversal)
 * or DFS (preorder traversal with level tracking).
 */

import { TreeNode } from '../utils/treeNode';

/**
 * @interface IRightSideView
 * Defines the contract for an object exposing right side view methods.
 */
export interface IRightSideView {
    rightSideViewBFS(root: TreeNode | null): number[];
    rightSideViewDFS(root: TreeNode | null): number[];
}

/**
 * Implements solutions for Binary Tree Right Side View.
 */
export class RightSideView implements IRightSideView {

    /**
     * Solves the Binary Tree Right Side View problem using Breadth-First Search (BFS).
     * For each level, the last node processed in that level (which is the rightmost node)
     * will be the one visible from the right side.
     *
     * @param root The root of the binary tree.
     * @returns An array containing the values of the nodes visible from the right side.
     *
     * Time Complexity: O(N) - Each node is enqueued and dequeued exactly once.
     * Space Complexity: O(W) - Where W is the maximum width of the tree.
     *                     In the worst case (a complete binary tree), W can be N/2, so O(N).
     */
    rightSideViewBFS(root: TreeNode | null): number[] {
        const result: number[] = [];
        if (!root) {
            return result;
        }

        const queue: TreeNode[] = [root];

        while (queue.length > 0) {
            const levelSize = queue.length;
            // The value of the very last node in the current level will be the rightmost view.
            // We initialize `rightmostNodeVal` with `undefined` to ensure it only gets a value
            // if there's at least one node in the level.
            let rightmostNodeVal: number | undefined;

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift()!;
                rightmostNodeVal = node.val; // Always update with the current node's value

                if (node.left !== null) {
                    queue.push(node.left);
                }
                if (node.right !== null) {
                    queue.push(node.right);
                }
            }
            // After iterating through the entire level, `rightmostNodeVal` holds the value
            // of the last node (i.e., the rightmost) encountered on that level.
            if (rightmostNodeVal !== undefined) {
                result.push(rightmostNodeVal);
            }
        }

        return result;
    }

    /**
     * Solves the Binary Tree Right Side View problem using Depth-First Search (DFS).
     * We perform a modified Preorder Traversal (Root -> Right -> Left).
     * By prioritizing the right child, we ensure that the first node we encounter
     * at any given `level` will be the rightmost one visible from that level.
     *
     * @param root The root of the binary tree.
     * @returns An array containing the values of the nodes visible from the right side.
     *
     * Time Complexity: O(N) - Each node is visited exactly once.
     * Space Complexity: O(H) - The recursion stack depth, where H is the height of the tree.
     *                     In the worst case (skewed tree), H can be N, so O(N).
     */
    rightSideViewDFS(root: TreeNode | null): number[] {
        const result: number[] = [];
        // `level` acts as the index for `result` array.
        // `maxLevelVisited` keeps track of the deepest level for which we've added a node.
        this.dfsRightSideView(root, 0, result);
        return result;
    }

    /**
     * Helper function for recursive DFS to find the right side view.
     * @param node The current node being visited.
     * @param level The current depth of the node (0-indexed).
     * @param result The array to store the right side view values.
     */
    private dfsRightSideView(node: TreeNode | null, level: number, result: number[]): void {
        if (!node) {
            return;
        }

        // If this is the first time we visit a node at this level,
        // it must be the rightmost node for this level (due to Right -> Left traversal order).
        if (level === result.length) {
            result.push(node.val);
        }

        // Traverse right child first to prioritize the rightmost nodes.
        this.dfsRightSideView(node.right, level + 1, result);
        // Then traverse left child.
        this.dfsRightSideView(node.left, level + 1, result);
    }
}