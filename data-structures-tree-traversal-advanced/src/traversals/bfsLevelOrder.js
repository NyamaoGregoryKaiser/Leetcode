```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @module bfsLevelOrder
 * @description Implements Breadth-First Search (BFS) for Level Order Traversal.
 * BFS uses a queue to explore nodes level by level.
 */

/**
 * Performs a Level Order Traversal (BFS).
 * Visits nodes level by level, from left to right within each level.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {Array<Array<*>>} A 2D array where each inner array contains the values
 *                             of nodes at a particular level.
 *
 * Logic:
 * 1. Initialize an empty queue and an empty result list.
 * 2. If root is null, return empty result.
 * 3. Enqueue the root node.
 * 4. While the queue is not empty:
 *    a. Get the number of nodes currently at the current level (queue size).
 *    b. Initialize an empty list for the current level's nodes.
 *    c. For the count of nodes at this level:
 *       i. Dequeue a node.
 *       ii. Add its value to the current level's list.
 *       iii. Enqueue its left child (if exists).
 *       iv. Enqueue its right child (if exists).
 *    d. Add the current level's list to the overall result.
 *
 * Time Complexity: O(N) where N is the number of nodes. Each node is enqueued and dequeued exactly once.
 * Space Complexity: O(W) where W is the maximum width of the tree (max number of nodes at any level).
 *                   In the worst case (a complete binary tree), W can be N/2, so O(N).
 */
function levelOrderTraversal(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root]; // Initialize queue with the root node

    while (queue.length > 0) {
        const levelSize = queue.length; // Number of nodes at the current level
        const currentLevelNodes = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // Dequeue a node
            currentLevelNodes.push(node.val); // Add its value to the current level's list

            // Enqueue children for the next level
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes); // Add the list of current level nodes to the overall result
    }

    return result;
}

module.exports = {
    levelOrderTraversal
};
```