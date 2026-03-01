```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @module recursiveTraversals
 * @description Provides standard binary tree traversal algorithms implemented recursively.
 * These methods are generally simpler to write but can lead to stack overflow for very deep trees.
 */

/**
 * Performs an Inorder Traversal (Left, Root, Right) recursively.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @param {Array<*>} result - An array to store the traversal result.
 * @returns {Array<*>} The array containing nodes' values in inorder.
 *
 * Time Complexity: O(N) where N is the number of nodes, as each node is visited exactly once.
 * Space Complexity: O(H) where H is the height of the tree, due to the recursion stack.
 *                   In the worst case (skewed tree), H can be N, so O(N).
 *                   In the best case (balanced tree), H is logN, so O(logN).
 */
function inorderTraversal(root, result = []) {
    if (!root) {
        return result;
    }

    // Traverse left subtree
    inorderTraversal(root.left, result);

    // Visit root
    result.push(root.val);

    // Traverse right subtree
    inorderTraversal(root.right, result);

    return result;
}

/**
 * Performs a Preorder Traversal (Root, Left, Right) recursively.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @param {Array<*>} result - An array to store the traversal result.
 * @returns {Array<*>} The array containing nodes' values in preorder.
 *
 * Time Complexity: O(N) where N is the number of nodes.
 * Space Complexity: O(H) where H is the height of the tree (recursion stack).
 */
function preorderTraversal(root, result = []) {
    if (!root) {
        return result;
    }

    // Visit root
    result.push(root.val);

    // Traverse left subtree
    preorderTraversal(root.left, result);

    // Traverse right subtree
    preorderTraversal(root.right, result);

    return result;
}

/**
 * Performs a Postorder Traversal (Left, Right, Root) recursively.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @param {Array<*>} result - An array to store the traversal result.
 * @returns {Array<*>} The array containing nodes' values in postorder.
 *
 * Time Complexity: O(N) where N is the number of nodes.
 * Space Complexity: O(H) where H is the height of the tree (recursion stack).
 */
function postorderTraversal(root, result = []) {
    if (!root) {
        return result;
    }

    // Traverse left subtree
    postorderTraversal(root.left, result);

    // Traverse right subtree
    postorderTraversal(root.right, result);

    // Visit root
    result.push(root.val);

    return result;
}

module.exports = {
    inorderTraversal,
    preorderTraversal,
    postorderTraversal
};
```