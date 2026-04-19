```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Path Sum III
 *
 * Given the root of a binary tree and an integer `targetSum`, return the number of paths where the
 * sum of the nodes' values equals `targetSum`.
 *
 * The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
 *
 * Example:
 *       10
 *      /  \
 *     5   -3
 *    / \    \
 *   3   2   11
 *  / \   \
 * 3  -2   1
 * Target Sum: 8
 * Output: 3 (Paths: 5->3; 5->2->1; -3->11)
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 1000].
 * - -10^9 <= Node.val <= 10^9
 * - -1000 <= targetSum <= 1000
 * - The depth of the tree will not exceed 1000.
 */

/**
 * Approach 1: Brute-Force Recursive Depth-First Search (DFS)
 *
 * This approach involves a double recursion. For each node in the tree, we start a new DFS traversal
 * from that node to find all paths starting from it that sum up to `targetSum`.
 *
 * - Outer DFS (`pathSumRecursive`): Traverses every node in the tree.
 * - Inner DFS (`countPathsFromNode`): For each node, it explores all downward paths starting from it.
 *
 * Time Complexity: O(N^2) in the worst case (e.g., a skewed tree where each node might be the start of a path,
 *                  and each path traversal takes O(N) time). In a balanced tree, it might be closer to O(N log N).
 * Space Complexity: O(H) - For the recursion stack, where H is the height of the tree. In the worst case, O(N).
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number} targetSum - The target sum to find.
 * @returns {number} The total number of paths that sum up to targetSum.
 */
function pathSumRecursive(root, targetSum) {
    if (!root) {
        return 0;
    }

    // Function to count paths that start from a given node and sum to 'sum'
    function countPathsFromNode(node, currentSum) {
        if (!node) {
            return 0;
        }

        let count = 0;
        if (currentSum === node.val) {
            count++; // Found a path ending at this node
        }

        // Recurse to left and right children, reducing the target sum by the current node's value.
        count += countPathsFromNode(node.left, currentSum - node.val);
        count += countPathsFromNode(node.right, currentSum - node.val);

        return count;
    }

    // Total paths is the sum of paths starting from the current root,
    // plus paths from its left child, plus paths from its right child.
    let totalPaths = countPathsFromNode(root, targetSum);
    totalPaths += pathSumRecursive(root.left, targetSum);
    totalPaths += pathSumRecursive(root.right, targetSum);

    return totalPaths;
}

/**
 * Approach 2: Optimized Recursive Depth-First Search (DFS) with Prefix Sums
 *
 * This approach uses a hash map (`prefixSumCounts`) to store the frequencies of prefix sums
 * encountered from the root to the current node. This allows us to find paths that sum to `targetSum`
 * in O(1) time for each node.
 *
 * Let `currentSum` be the sum of values from the root to the current node.
 * If we are looking for a path `P` (from an ancestor to the current node) that sums to `targetSum`,
 * it means `currentSum - P = targetSum`, or `P = currentSum - targetSum`.
 * If `currentSum - targetSum` exists in our `prefixSumCounts` map, it means there was an ancestor `X`
 * such that the sum from root to `X` equals `currentSum - targetSum`.
 * The path from `X.next` to current node will then sum to `targetSum`.
 *
 * The map stores `(prefix_sum -> count)` pairs.
 *
 * Time Complexity: O(N) - Each node is visited exactly once. Hash map operations (get/set) are O(1) on average.
 * Space Complexity: O(H) - For the recursion stack and the hash map, where H is the height of the tree.
 *                          In the worst case, O(N).
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {number} targetSum - The target sum to find.
 * @returns {number} The total number of paths that sum up to targetSum.
 */
function pathSumOptimized(root, targetSum) {
    // Map to store prefix sums and their frequencies.
    // Initialize with {0: 1} to account for paths that start from the root itself and sum to targetSum.
    const prefixSumCounts = new Map([[0, 1]]);
    let totalPaths = 0;

    /**
     * Helper DFS function to traverse the tree and calculate paths.
     * @param {TreeNode|null} node - The current node.
     * @param {number} currentPathSum - The sum of values from the root to the current node (inclusive).
     */
    function dfs(node, currentPathSum) {
        if (!node) {
            return;
        }

        currentPathSum += node.val;

        // Check if there's an ancestor prefix sum such that
        // (currentPathSum - ancestor_prefix_sum) equals targetSum.
        // If (currentPathSum - targetSum) is found in the map, it means there are
        // `prefixSumCounts.get(currentPathSum - targetSum)` number of paths ending at `node`
        // that sum up to `targetSum`.
        if (prefixSumCounts.has(currentPathSum - targetSum)) {
            totalPaths += prefixSumCounts.get(currentPathSum - targetSum);
        }

        // Add the currentPathSum to the map.
        prefixSumCounts.set(currentPathSum, (prefixSumCounts.get(currentPathSum) || 0) + 1);

        // Recurse on children.
        dfs(node.left, currentPathSum);
        dfs(node.right, currentPathSum);

        // Backtrack: remove the currentPathSum from the map after visiting its subtree.
        // This is crucial because the path sum is only valid for paths going downwards.
        prefixSumCounts.set(currentPathSum, prefixSumCounts.get(currentPathSum) - 1);
    }

    dfs(root, 0); // Start DFS from root with initial path sum 0.
    return totalPaths;
}


module.exports = {
    pathSumRecursive,
    pathSumOptimized
};
```