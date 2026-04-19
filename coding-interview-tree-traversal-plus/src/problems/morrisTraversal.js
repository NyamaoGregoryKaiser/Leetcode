```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Binary Tree Inorder Traversal (Morris Traversal - O(1) Space)
 *
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * This implementation uses Morris Traversal, which achieves O(1) auxiliary space complexity.
 *
 * Morris Traversal works by temporarily modifying the tree structure by creating
 * "threaded" links to simulate stack behavior without using an explicit stack.
 *
 * The algorithm can be summarized as follows:
 * 1. Initialize `current` to `root`.
 * 2. While `current` is not null:
 *    a. If `current` has no left child:
 *       - Add `current.val` to the result.
 *       - Move `current` to `current.right`. (No left subtree to traverse, so current node is visited, then go right)
 *    b. If `current` has a left child:
 *       - Find the rightmost node in `current`'s left subtree (this is the "predecessor").
 *       - The predecessor is found by going left once, then right repeatedly until `right` is null or `right` is `current`.
 *       - If the predecessor's `right` child is `null` (first time visiting this link):
 *         - Make `predecessor.right` point to `current`. (Create a thread)
 *         - Move `current` to `current.left`. (Continue exploring the left subtree)
 *       - If the predecessor's `right` child is `current` (already visited left subtree, returning to root):
 *         - Add `current.val` to the result. (Visit current node)
 *         - Set `predecessor.right` back to `null`. (Break the thread to restore tree)
 *         - Move `current` to `current.right`. (Move to right subtree)
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
 * Approach: Morris Inorder Traversal
 *
 * Time Complexity: O(N) - Although there are nested loops, each edge in the tree is traversed at most a constant number of times.
 *                          Specifically, each node's right child link is modified at most twice (once to establish the thread,
 *                          once to break it). All other operations are constant time per node.
 * Space Complexity: O(1) - It uses no extra space beyond the output list and a few pointers.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the inorder traversal of node values.
 */
function morrisInorderTraversal(root) {
    const result = [];
    let current = root;

    while (current !== null) {
        if (current.left === null) {
            // Case 1: No left child.
            // This means we have visited all nodes in the left subtree (if any)
            // and processed the current node. So, add its value to the result
            // and move to the right child.
            result.push(current.val);
            current = current.right;
        } else {
            // Case 2: Has a left child.
            // Find the inorder predecessor (rightmost node in the left subtree).
            let predecessor = current.left;
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }

            // Subcase 2.1: Predecessor's right child is null.
            // This is the first time we are visiting `current` from its predecessor.
            // Create a temporary link (thread) from predecessor to current.
            // Then, move `current` to its left child to continue exploring the left subtree.
            if (predecessor.right === null) {
                predecessor.right = current; // Create thread
                current = current.left;
            } else {
                // Subcase 2.2: Predecessor's right child is `current`.
                // This means we have already visited `current`'s left subtree
                // and are returning to `current` via the thread.
                // Now, it's time to visit `current` itself.
                result.push(current.val); // Visit current node
                predecessor.right = null; // Break the thread to restore the tree structure
                current = current.right; // Move to the right child to continue traversal
            }
        }
    }

    return result;
}

module.exports = {
    morrisInorderTraversal
};
```