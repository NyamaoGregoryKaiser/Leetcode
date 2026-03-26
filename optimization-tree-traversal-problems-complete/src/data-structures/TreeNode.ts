```typescript
/**
 * src/data-structures/TreeNode.ts
 *
 * Defines the TreeNode class for binary trees and utility functions to build trees.
 */

export class TreeNode<T = number> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Builds a binary tree from an array representation (level order with nulls).
 * This is a common format used in platforms like LeetCode.
 *
 * Example: [3, 9, 20, null, null, 15, 7]
 * Represents:
 *      3
 *     / \
 *    9  20
 *       / \
 *      15  7
 *
 * @param arr An array representing the tree in level order. `null` denotes missing nodes.
 * @returns The root TreeNode of the constructed binary tree.
 */
export function buildTreeFromArray<T>(arr: (T | null)[]): TreeNode<T> | null {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    const rootVal = arr[0];
    if (rootVal === null) return null; // Should be handled by previous check, but for type safety

    const root = new TreeNode(rootVal);
    const queue: (TreeNode<T> | null)[] = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const currentNode = queue.shift();

        if (currentNode) {
            // Left child
            if (i < arr.length && arr[i] !== null) {
                currentNode.left = new TreeNode(arr[i] as T);
                queue.push(currentNode.left);
            }
            i++;

            // Right child
            if (i < arr.length && arr[i] !== null) {
                currentNode.right = new TreeNode(arr[i] as T);
                queue.push(currentNode.right);
            }
            i++;
        }
    }

    return root;
}

/**
 * Converts a binary tree back into an array representation (level order with nulls).
 * Useful for verifying tree construction or for visual comparison in tests.
 *
 * @param root The root of the binary tree.
 * @returns An array representing the tree in level order.
 */
export function treeToArray<T>(root: TreeNode<T> | null): (T | null)[] {
    if (!root) {
        return [];
    }

    const result: (T | null)[] = [];
    const queue: (TreeNode<T> | null)[] = [root];
    let hasNonNull = true; // Flag to stop adding trailing nulls

    while (queue.length > 0 && hasNonNull) {
        const levelSize = queue.length;
        hasNonNull = false; // Reset for current level

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node) {
                result.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
                if (node.left || node.right) {
                    hasNonNull = true; // Still have non-null descendants
                }
            } else {
                result.push(null);
                // Even if null, we must push nulls for its children placeholders
                // to maintain level order consistency. However, for treeToArray,
                // we actually only push real nodes. This specific implementation
                // needs to handle trailing nulls correctly.
                // A simplified approach for treeToArray: push null, but don't add children to queue.
                // We'll add children only if the parent is non-null.
            }
        }
    }

    // Remove trailing nulls to match common array representation conventions (e.g., LeetCode)
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}
```