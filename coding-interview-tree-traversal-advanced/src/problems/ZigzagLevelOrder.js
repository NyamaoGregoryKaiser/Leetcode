```javascript
/**
 * @fileoverview Implementation for Zigzag Level Order Traversal.
 */

const TreeNode = require('../data-structures/TreeNode');

/**
 * --- Problem Description: Zigzag Level Order Traversal ---
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
 * (i.e., from left to right, then right to left for the next level and so on).
 *
 * Example:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * Output: [[3], [20,9], [15,7]]
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 2000].
 * - -1000 <= Node.val <= 1000
 */

/**
 * Performs Zigzag Level Order Traversal (BFS with direction change).
 *
 * Algorithm:
 * This is a modification of standard Level Order Traversal.
 * 1. Initialize an empty list `result` to store levels.
 * 2. If the `root` is null, return `result`.
 * 3. Initialize a queue and add the `root` to it.
 * 4. Initialize a boolean `leftToRight` to `true` (for the first level).
 * 5. While the queue is not empty:
 *    a. Get the current `levelSize`.
 *    b. Initialize an empty temporary list `tempLevel` to collect nodes for the current level.
 *    c. Loop `levelSize` times:
 *       i. Dequeue a node `currentNode`.
 *       ii. Add `currentNode.val` to `tempLevel`.
 *       iii. Enqueue `currentNode.left` if it exists.
 *       iv. Enqueue `currentNode.right` if it exists.
 *    d. If `leftToRight` is `false`, reverse `tempLevel`.
 *    e. Add `tempLevel` to `result`.
 *    f. Toggle `leftToRight` for the next level.
 * 6. Return `result`.
 *
 * Time Complexity: O(N), where N is the number of nodes.
 *                  Each node is enqueued/dequeued once. The reversal of `tempLevel` for half the levels
 *                  adds to this, but the total elements across all levels sum up to N,
 *                  so reversing adds O(N) in total.
 * Space Complexity: O(W), where W is the maximum width of the tree.
 *                   Similar to regular BFS, the queue can hold up to W nodes.
 *                   `tempLevel` can also hold up to W nodes. So overall O(W), which is O(N) in worst case.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<Array<number>>} An array of arrays, where each inner array contains
 *                                 the values of nodes at that level, in zigzag order.
 */
function zigzagLevelOrder(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root];
    let leftToRight = true; // Flag to determine traversal direction for the current level

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelValues = []; // Using a temporary array to store values for the current level

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();
            currentLevelValues.push(currentNode.val); // Add value

            // Enqueue children for the next level, regardless of current level's direction
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        // Apply zigzag order: if not leftToRight, reverse the current level's values
        if (!leftToRight) {
            currentLevelValues.reverse();
        }

        result.push(currentLevelValues); // Add the processed level to the result
        leftToRight = !leftToRight;      // Toggle direction for the next level
    }

    return result;
}

module.exports = {
    zigzagLevelOrder
};
```