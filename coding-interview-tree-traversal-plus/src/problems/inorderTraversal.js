```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Binary Tree Inorder Traversal
 *
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 *
 * Inorder traversal visits nodes in the order: Left -> Root -> Right.
 * For a Binary Search Tree (BST), inorder traversal produces a sorted list of elements.
 *
 * Example:
 *     1
 *      \
 *       2
 *      /
 *     3
 * Inorder: [1, 3, 2]
 */

/**
 * Approach 1: Recursive Inorder Traversal (DFS)
 *
 * The most straightforward way to implement inorder traversal.
 * It uses the call stack to manage node visits.
 *
 * Time Complexity: O(N) - We visit each node exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree. In the worst case (skewed tree), H can be N (all nodes in a line),
 *                          so O(N) for the recursion stack. In the best case (balanced tree), H is logN, so O(logN).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the inorder traversal of node values.
 */
function inorderTraversalRecursive(root) {
    const result = [];

    /**
     * Helper function for recursive traversal.
     * @param {TreeNode|null} node - The current node being visited.
     */
    function traverse(node) {
        if (!node) {
            return; // Base case: If node is null, do nothing.
        }

        traverse(node.left);    // 1. Visit left subtree
        result.push(node.val);  // 2. Visit current node
        traverse(node.right);   // 3. Visit right subtree
    }

    traverse(root);
    return result;
}

/**
 * Approach 2: Iterative Inorder Traversal using a Stack
 *
 * This approach mimics the recursion behavior using an explicit stack.
 *
 * Time Complexity: O(N) - Each node is pushed onto the stack and popped exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree, for the stack. In the worst case, O(N).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the inorder traversal of node values.
 */
function inorderTraversalIterative(root) {
    const result = [];
    const stack = []; // Used to store nodes that need to be visited later.
    let current = root; // Pointer to the current node being processed.

    while (current !== null || stack.length > 0) {
        // Step 1: Traverse left as far as possible, pushing all visited nodes onto the stack.
        // These nodes are potential roots for future subtrees.
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Step 2: Current is null, meaning we've reached the leftmost node (or null from a left child).
        // Pop the top node from the stack - this is the "root" to be visited now.
        current = stack.pop();
        result.push(current.val); // Visit the node.

        // Step 3: Now that the current node is visited, move to its right subtree.
        // The loop will then try to push its leftmost descendants onto the stack.
        current = current.right;
    }

    return result;
}

module.exports = {
    inorderTraversalRecursive,
    inorderTraversalIterative
};
```