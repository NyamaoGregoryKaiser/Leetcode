```javascript
/**
 * @fileoverview Implementation for Level Order Traversal (Breadth-First Search).
 */

const TreeNode = require('../data-structures/TreeNode');

/**
 * --- Problem Description: Level Order Traversal ---
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 *
 * Example:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * Output: [[3], [9,20], [15,7]]
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 2000].
 * - -1000 <= Node.val <= 1000
 */

/**
 * Performs Level Order Traversal (BFS) of a binary tree.
 *
 * Algorithm:
 * 1. Initialize an empty list `result` to store levels.
 * 2. If the `root` is null, return `result`.
 * 3. Initialize a queue and add the `root` to it.
 * 4. While the queue is not empty:
 *    a. Get the current `levelSize` (number of nodes at the current level).
 *    b. Initialize an empty list `currentLevelNodes` for the current level's values.
 *    c. Loop `levelSize` times:
 *       i. Dequeue a node. Let it be `currentNode`.
 *       ii. Add `currentNode.val` to `currentLevelNodes`.
 *       iii. If `currentNode.left` exists, enqueue it.
 *       iv. If `currentNode.right` exists, enqueue it.
 *    d. Add `currentLevelNodes` to the `result` list.
 * 5. Return `result`.
 *
 * Time Complexity: O(N), where N is the number of nodes in the tree.
 *                  Each node is enqueued and dequeued exactly once.
 * Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
 *                   In a complete binary tree, W can be up to N/2, so O(N).
 *                   This is due to the queue storing nodes at the widest level.
 *                   In a skewed tree, W=1, so O(1) apart from result storage.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<Array<number>>} An array of arrays, where each inner array contains
 *                                 the values of nodes at that level.
 */
function levelOrderTraversal(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root]; // Initialize queue with the root node

    while (queue.length > 0) {
        const levelSize = queue.length; // Number of nodes at the current level
        const currentLevelNodes = [];   // List to store values of nodes at this level

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift(); // Dequeue the front node
            currentLevelNodes.push(currentNode.val); // Add its value to the current level's list

            // Enqueue children for the next level
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        result.push(currentLevelNodes); // Add the list of current level's values to the result
    }

    return result;
}

module.exports = {
    levelOrderTraversal
};
```