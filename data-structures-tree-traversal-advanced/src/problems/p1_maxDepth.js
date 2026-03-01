```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @problem 1: Maximum Depth of Binary Tree
 * @description Given the `root` of a binary tree, return its maximum depth.
 * The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 * A leaf node is a node with no children.
 *
 * Example:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * Max depth is 3 (path: 3 -> 20 -> 7 or 3 -> 20 -> 15)
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 10^4].
 * -100 <= Node.val <= 100
 */

/**
 * Approach 1: Recursive Depth-First Search (DFS)
 *
 * Logic:
 * The depth of a node is 1 plus the maximum depth of its children.
 * Base case: If the node is null, its depth is 0.
 * Recursive step: Calculate the depth of the left subtree and the right subtree.
 * The depth of the current node is 1 (for itself) + the maximum of the left and right subtree depths.
 *
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {number} The maximum depth of the tree.
 *
 * Time Complexity: O(N) where N is the number of nodes, as each node is visited exactly once.
 * Space Complexity: O(H) where H is the height of the tree, due to the recursion stack.
 *                   In the worst case (skewed tree), H can be N, so O(N).
 *                   In the best case (balanced tree), H is logN, so O(logN).
 */
function maxDepthDFS(root) {
    // Base case: If the node is null, it contributes 0 to the depth.
    if (!root) {
        return 0;
    }

    // Recursively calculate the maximum depth of the left subtree.
    const leftDepth = maxDepthDFS(root.left);
    // Recursively calculate the maximum depth of the right subtree.
    const rightDepth = maxDepthDFS(root.right);

    // The depth of the current node is 1 (for itself) plus the maximum depth of its children.
    return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Approach 2: Iterative Breadth-First Search (BFS) / Level Order Traversal
 *
 * Logic:
 * We can find the maximum depth by counting the number of levels.
 * This approach performs a level-order traversal, incrementing a depth counter
 * each time it moves to a new level.
 *
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {number} The maximum depth of the tree.
 *
 * Time Complexity: O(N) where N is the number of nodes. Each node is enqueued and dequeued once.
 * Space Complexity: O(W) where W is the maximum width of the tree (maximum number of nodes at any level).
 *                   In the worst case (a complete binary tree), W can be N/2, so O(N).
 */
function maxDepthBFS(root) {
    if (!root) {
        return 0;
    }

    const queue = [root]; // Initialize queue with the root node
    let depth = 0;        // Initialize depth counter

    while (queue.length > 0) {
        // Increment depth for each new level.
        depth++;
        const levelSize = queue.length; // Number of nodes at the current level

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // Dequeue a node

            // Enqueue children for the next level
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    return depth;
}

module.exports = {
    maxDepthDFS,
    maxDepthBFS
};
```