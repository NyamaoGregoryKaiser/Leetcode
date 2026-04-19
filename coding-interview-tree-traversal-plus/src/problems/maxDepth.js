```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Maximum Depth of Binary Tree
 *
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 * A leaf node is a node with no children.
 *
 * Example:
 *      3
 *     / \
 *    9  20
 *      /  \
 *     15   7
 * Max Depth: 3 (Path: 3 -> 20 -> 15 or 3 -> 20 -> 7)
 *
 * Example 2:
 *     1
 *      \
 *       2
 * Max Depth: 2
 */

/**
 * Approach 1: Recursive Depth-First Search (DFS)
 *
 * This is the most intuitive approach. The maximum depth of a node is 1 (for itself) plus the
 * maximum depth of its children. We recursively calculate the depth of left and right subtrees
 * and take the maximum.
 *
 * Time Complexity: O(N) - We visit each node exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree. This is for the recursion stack.
 *                          Worst case (skewed tree) O(N), best case (balanced tree) O(logN).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number} The maximum depth of the tree. Returns 0 for an empty tree.
 */
function maxDepthDFS(root) {
    // Base case: If the node is null, its depth is 0.
    if (!root) {
        return 0;
    }

    // Recursively find the depth of the left and right subtrees.
    const leftDepth = maxDepthDFS(root.left);
    const rightDepth = maxDepthDFS(root.right);

    // The depth of the current node is 1 (for itself) plus the maximum of its children's depths.
    return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Approach 2: Iterative Breadth-First Search (BFS) / Level Order Traversal
 *
 * We can find the maximum depth by counting the number of levels. BFS naturally
 * processes the tree level by level.
 *
 * Time Complexity: O(N) - We visit each node exactly once.
 * Space Complexity: O(W) - Where W is the maximum width of the tree, for the queue. In the worst case, O(N).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number} The maximum depth of the tree. Returns 0 for an empty tree.
 */
function maxDepthBFS(root) {
    if (!root) {
        return 0;
    }

    const queue = [root];
    let depth = 0;

    while (queue.length > 0) {
        depth++; // Increment depth for each new level.
        const levelSize = queue.length; // Number of nodes at the current level.

        // Process all nodes at the current level.
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // Dequeue the front node.

            // Enqueue its children for the next level.
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