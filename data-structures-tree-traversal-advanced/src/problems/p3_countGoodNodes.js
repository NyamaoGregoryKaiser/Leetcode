```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @problem 3: Count Good Nodes in Binary Tree
 * @description Given a binary tree `root`, a node `X` in the tree is named a "good node" if in the path
 * from the root to `X`, there are no nodes with a value greater than `X.val`.
 * Return the number of good nodes in the binary tree.
 *
 * Example:
 * Input: root = [3,1,4,3,null,1,5]
 * Output: 4
 * Explanation:
 * Path to node 3 (root) is [3], max value is 3. Node 3 is good.
 * Path to node 1 is [3,1], max value is 3. Node 1 is NOT good (3 > 1).
 * Path to node 4 is [3,4], max value is 4. Node 4 is good.
 * Path to node 3 (left child of 1) is [3,1,3], max value is 3. Node 3 is good.
 * Path to node 1 (left child of 4) is [3,4,1], max value is 4. Node 1 is NOT good (4 > 1).
 * Path to node 5 (right child of 4) is [3,4,5], max value is 5. Node 5 is good.
 * Good nodes are: 3 (root), 4, 3 (left child of 1), 5.
 *
 * Constraints:
 * The number of nodes in the tree is in the range [1, 10^5].
 * -10^4 <= Node.val <= 10^4
 */

/**
 * Approach 1: Recursive Depth-First Search (DFS)
 *
 * Logic:
 * This problem requires keeping track of the maximum value encountered along the path from the root
 * to the current node. This is a classic scenario for DFS where information (like `maxVal`) is passed
 * down the recursive calls.
 *
 * 1. Initialize a counter for good nodes.
 * 2. Define a recursive helper function `dfs(node, maxVal)`:
 *    a. Base case: If `node` is null, return.
 *    b. Check if the current `node.val` is greater than or equal to `maxVal`.
 *       If it is, this node is a "good node", so increment the counter.
 *    c. Update `maxVal` for the children's recursive calls: `newMax = Math.max(maxVal, node.val)`.
 *       The `maxVal` for subsequent calls should be the maximum value seen *so far* on the path to the current node.
 *    d. Recursively call `dfs` for the left child: `dfs(node.left, newMax)`.
 *    e. Recursively call `dfs` for the right child: `dfs(node.right, newMax)`.
 * 3. Start the DFS from the root, initializing `maxVal` to `root.val` (or negative infinity for safety if values can be very small).
 *    Since the root is always considered 'good' (its path is just itself), its value is the initial max.
 *
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {number} The total count of good nodes.
 *
 * Time Complexity: O(N) where N is the number of nodes, as each node is visited exactly once.
 * Space Complexity: O(H) where H is the height of the tree, due to the recursion stack.
 *                   In the worst case (skewed tree), H can be N, so O(N).
 *                   In the best case (balanced tree), H is logN, so O(logN).
 */
function countGoodNodes(root) {
    if (!root) {
        return 0;
    }

    let goodNodesCount = 0;

    /**
     * Helper function for DFS traversal.
     * @param {TreeNode | null} node - The current node being visited.
     * @param {number} maxValSoFar - The maximum value encountered on the path from the root to the current node (exclusive of current node's value).
     */
    function dfs(node, maxValSoFar) {
        if (!node) {
            return;
        }

        // Check if the current node is a 'good node'
        // A node is good if its value is greater than or equal to the maximum value on the path from root to its parent.
        if (node.val >= maxValSoFar) {
            goodNodesCount++;
        }

        // Update maxValSoFar for the next recursive calls.
        // The maximum value for children's paths will be the max of current maxValSoFar and current node's value.
        const newMaxVal = Math.max(maxValSoFar, node.val);

        // Recursively call for left and right children
        dfs(node.left, newMaxVal);
        dfs(node.right, newMaxVal);
    }

    // Start DFS from the root. The root node's path only contains itself,
    // so its value is the max value on the path to it.
    // Initialize maxValSoFar with negative infinity if values can be extremely small,
    // or simply root.val since root is always good. Using root.val is safe as per constraints.
    dfs(root, root.val);

    return goodNodesCount;
}

module.exports = {
    countGoodNodes
};
```