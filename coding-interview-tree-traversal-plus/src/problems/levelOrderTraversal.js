```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Binary Tree Level Order Traversal
 *
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 *
 * This is a Breadth-First Search (BFS) algorithm for trees.
 *
 * Example:
 *      3
 *     / \
 *    9  20
 *      /  \
 *     15   7
 * Level order: [[3], [9, 20], [15, 7]]
 */

/**
 * Approach: Iterative Level Order Traversal using a Queue (BFS)
 *
 * A queue is essential for BFS to maintain the order of nodes to visit.
 * We process nodes level by level.
 *
 * Time Complexity: O(N) - Each node is enqueued and dequeued exactly once.
 * Space Complexity: O(W) - Where W is the maximum width of the tree. In the worst case (a complete binary tree),
 *                          the last level can hold N/2 nodes, so O(N).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[][]} A 2D array where each inner array contains the values of nodes at a specific level.
 */
function levelOrderTraversal(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root]; // Initialize the queue with the root node.

    while (queue.length > 0) {
        const levelSize = queue.length; // Number of nodes at the current level.
        const currentLevelNodes = []; // Store values of nodes at the current level.

        // Process all nodes at the current level.
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // Dequeue the front node.
            currentLevelNodes.push(node.val); // Add its value to the current level's list.

            // Enqueue its children for the next level.
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes); // Add the completed level to the overall result.
    }

    return result;
}

module.exports = {
    levelOrderTraversal
};
```