```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Binary Tree Zigzag Level Order Traversal
 *
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
 * (i.e., from left to right, then right to left for the next level and so on. The levels are alternated).
 *
 * Example:
 *      3
 *     / \
 *    9  20
 *      /  \
 *     15   7
 * Zigzag level order: [[3], [20, 9], [15, 7]]
 */

/**
 * Approach: Iterative Zigzag Level Order Traversal using a Queue (BFS variation)
 *
 * This approach extends the standard level order traversal (BFS) by introducing a flag
 * to determine the direction of traversal for each level. We use a queue for BFS,
 * and for each level, we collect nodes and then reverse them based on the current level's direction.
 *
 * Time Complexity: O(N) - Each node is enqueued, dequeued, and its value potentially reversed (which is O(k) for k nodes in a level).
 *                          Summing up for all levels, it's still O(N) because sum of nodes in all levels is N.
 * Space Complexity: O(W) - Where W is the maximum width of the tree, for the queue. In the worst case, O(N).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[][]} A 2D array where each inner array contains the values of nodes at a specific level, in zigzag order.
 */
function zigzagLevelOrder(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const queue = [root];
    let isLeftToRight = true; // Flag to track current level's traversal direction.

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevelNodes.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        // Apply zigzag order: Reverse the level if it's right-to-left.
        if (!isLeftToRight) {
            currentLevelNodes.reverse();
        }

        result.push(currentLevelNodes);
        isLeftToRight = !isLeftToRight; // Toggle direction for the next level.
    }

    return result;
}

module.exports = {
    zigzagLevelOrder
};
```