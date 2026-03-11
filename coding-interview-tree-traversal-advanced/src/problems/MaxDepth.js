```javascript
/**
 * @fileoverview Implementations to find the maximum depth of a binary tree.
 *               Both recursive (DFS) and iterative (BFS) approaches are provided.
 */

const TreeNode = require('../data-structures/TreeNode');

/**
 * --- Problem Description: Maximum Depth of Binary Tree ---
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 *
 * Example:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * Output: 3 (Path: 3 -> 20 -> 7 or 3 -> 20 -> 15)
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 10^4].
 * - -100 <= Node.val <= 100
 */

/**
 * Calculates the maximum depth of a binary tree recursively (DFS approach).
 *
 * Algorithm:
 * The maximum depth of a node is 1 plus the maximum depth of its children.
 * If the node is null, its depth is 0.
 *
 * 1. Base case: If `root` is null, return 0.
 * 2. Recursively calculate the maximum depth of the left subtree: `leftDepth = maxDepthRecursive(root.left)`.
 * 3. Recursively calculate the maximum depth of the right subtree: `rightDepth = maxDepthRecursive(root.right)`.
 * 4. Return 1 + `max(leftDepth, rightDepth)`.
 *
 * Time Complexity: O(N), where N is the number of nodes in the tree.
 *                  Each node is visited exactly once.
 * Space Complexity: O(H) in the worst case (skewed tree), where H is the height of the tree.
 *                   This is due to the recursion stack. In the best case (balanced tree), O(log N).
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {number} The maximum depth of the tree.
 */
function maxDepthRecursive(root) {
    // Base case: An empty tree has a depth of 0
    if (!root) {
        return 0;
    }

    // Recursively find the depth of the left and right subtrees
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);

    // The maximum depth of the current node is 1 (for the node itself)
    // plus the maximum depth of its deepest subtree.
    return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Calculates the maximum depth of a binary tree iteratively (BFS approach).
 *
 * Algorithm:
 * This is essentially a level-order traversal where we count the levels.
 * 1. If `root` is null, return 0.
 * 2. Initialize a queue with the `root` node.
 * 3. Initialize `depth = 0`.
 * 4. While the queue is not empty:
 *    a. Increment `depth` (we are starting a new level).
 *    b. Get the `levelSize` (number of nodes at the current level).
 *    c. Loop `levelSize` times:
 *       i. Dequeue a node.
 *       ii. Enqueue its children (left then right) if they exist.
 * 5. Return `depth`.
 *
 * Time Complexity: O(N), where N is the number of nodes.
 *                  Each node is enqueued and dequeued exactly once.
 * Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
 *                   In a complete binary tree, W can be up to N/2, so O(N).
 *                   This is due to the queue storing nodes at the widest level.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {number} The maximum depth of the tree.
 */
function maxDepthIterativeBFS(root) {
    if (!root) {
        return 0;
    }

    const queue = [root];
    let depth = 0;

    while (queue.length > 0) {
        depth++; // Increment depth for each new level discovered
        const levelSize = queue.length; // Number of nodes at the current level

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();

            // Enqueue children for the next level
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }

    return depth;
}

/**
 * Calculates the maximum depth of a binary tree iteratively (DFS with explicit stack).
 *
 * Algorithm:
 * Instead of relying on the call stack, we use an explicit stack.
 * We store pairs of [node, current_depth] on the stack.
 * 1. If `root` is null, return 0.
 * 2. Initialize a stack with `[root, 1]`.
 * 3. Initialize `max_depth = 0`.
 * 4. While the stack is not empty:
 *    a. Pop a `[node, current_depth]` pair.
 *    b. Update `max_depth = max(max_depth, current_depth)`.
 *    c. If `node.left` exists, push `[node.left, current_depth + 1]` onto the stack.
 *    d. If `node.right` exists, push `[node.right, current_depth + 1]` onto the stack.
 * 5. Return `max_depth`.
 *
 * Time Complexity: O(N), where N is the number of nodes. Each node is processed once.
 * Space Complexity: O(H) in the worst case (skewed tree), where H is the height of the tree.
 *                   This is due to the stack storing nodes along the current path.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {number} The maximum depth of the tree.
 */
function maxDepthIterativeDFS(root) {
    if (!root) {
        return 0;
    }

    // Stack stores pairs of [node, current_depth]
    const stack = [[root, 1]];
    let maxDepth = 0;

    while (stack.length > 0) {
        const [currentNode, currentDepth] = stack.pop();

        maxDepth = Math.max(maxDepth, currentDepth);

        // Push children with incremented depth
        if (currentNode.left) {
            stack.push([currentNode.left, currentDepth + 1]);
        }
        if (currentNode.right) {
            stack.push([currentNode.right, currentDepth + 1]);
        }
    }

    return maxDepth;
}

module.exports = {
    maxDepthRecursive,
    maxDepthIterativeBFS,
    maxDepthIterativeDFS
};
```