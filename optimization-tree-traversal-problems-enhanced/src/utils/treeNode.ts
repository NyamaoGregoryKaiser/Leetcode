/**
 * @fileoverview Defines the TreeNode class and utility functions for building binary trees.
 * This file is crucial for creating tree structures used in all problem solutions and tests.
 */

/**
 * Represents a node in a binary tree.
 * Each node has a value, and optional left and right child nodes.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    /**
     * Constructs a new TreeNode.
     * @param val The value of the node.
     * @param left The left child node (default: null).
     * @param right The right child node (default: null).
     */
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

/**
 * Builds a binary tree from an array representation (level order).
 * Null values in the array represent missing children.
 *
 * Example: `[1, 2, 3, null, 4, 5, 6]` creates a tree like:
 *      1
 *     / \
 *    2   3
 *     \ / \
 *      4 5 6
 *
 * @param arr An array of numbers or nulls representing the tree in level order.
 * @returns The root TreeNode of the constructed binary tree, or null if the array is empty/invalid.
 */
export function buildTreeFromArray(arr: (number | null)[]): TreeNode | null {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    const root = new TreeNode(arr[0] as number);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const currentNode = queue.shift()!; // Dequeue the first node

        // Process left child
        if (i < arr.length) {
            const leftVal = arr[i];
            if (leftVal !== null) {
                currentNode.left = new TreeNode(leftVal);
                queue.push(currentNode.left);
            }
            i++;
        }

        // Process right child
        if (i < arr.length) {
            const rightVal = arr[i];
            if (rightVal !== null) {
                currentNode.right = new TreeNode(rightVal);
                queue.push(currentNode.right);
            }
            i++;
        }
    }

    return root;
}

/**
 * Converts a binary tree to its level order array representation.
 * This can be useful for comparing trees in tests.
 * @param root The root of the binary tree.
 * @returns An array of numbers or nulls representing the tree in level order.
 */
export function treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) {
        return [];
    }

    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];
    let hasNonNull = false; // Flag to track if we've encountered a non-null node to trim trailing nulls

    while (queue.length > 0) {
        const node = queue.shift();

        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
            // If this node is not null, then subsequent nulls are meaningful
            // unless they are at the very end.
            if (node.left || node.right) {
                 hasNonNull = true;
            }
        } else {
            result.push(null);
        }
    }

    // Trim trailing nulls that represent non-existent subtrees
    // This makes the array representation match common LeetCode formats.
    let lastNonNullIndex = result.length - 1;
    while (lastNonNullIndex >= 0 && result[lastNonNullIndex] === null) {
        lastNonNullIndex--;
    }

    return result.slice(0, lastNonNullIndex + 1);
}