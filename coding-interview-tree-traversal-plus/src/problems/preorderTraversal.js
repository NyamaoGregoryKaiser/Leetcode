```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Binary Tree Preorder Traversal
 *
 * Given the root of a binary tree, return the preorder traversal of its nodes' values.
 *
 * Preorder traversal visits nodes in the order: Root -> Left -> Right.
 * This traversal is useful for creating a copy of the tree or for serializing it.
 *
 * Example:
 *     1
 *      \
 *       2
 *      /
 *     3
 * Preorder: [1, 2, 3]
 */

/**
 * Approach 1: Recursive Preorder Traversal (DFS)
 *
 * The most straightforward way to implement preorder traversal.
 * It uses the call stack to manage node visits.
 *
 * Time Complexity: O(N) - We visit each node exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree. In the worst case (skewed tree), H can be N,
 *                          so O(N) for the recursion stack. In the best case (balanced tree), H is logN, so O(logN).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the preorder traversal of node values.
 */
function preorderTraversalRecursive(root) {
    const result = [];

    /**
     * Helper function for recursive traversal.
     * @param {TreeNode|null} node - The current node being visited.
     */
    function traverse(node) {
        if (!node) {
            return; // Base case: If node is null, do nothing.
        }

        result.push(node.val);  // 1. Visit current node
        traverse(node.left);    // 2. Visit left subtree
        traverse(node.right);   // 3. Visit right subtree
    }

    traverse(root);
    return result;
}

/**
 * Approach 2: Iterative Preorder Traversal using a Stack
 *
 * This approach mimics the recursion behavior using an explicit stack.
 *
 * Time Complexity: O(N) - Each node is pushed onto the stack and popped exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree, for the stack. In the worst case, O(N).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the preorder traversal of node values.
 */
function preorderTraversalIterative(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [root]; // Initialize stack with the root.

    while (stack.length > 0) {
        const node = stack.pop(); // Pop the current node.

        result.push(node.val); // Visit the node (add to result).

        // Push right child first, then left child.
        // This ensures that when popped, the left child is processed before the right,
        // maintaining the Root -> Left -> Right order.
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }

    return result;
}

module.exports = {
    preorderTraversalRecursive,
    preorderTraversalIterative
};
```