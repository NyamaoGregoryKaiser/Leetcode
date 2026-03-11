```javascript
/**
 * @fileoverview Implementation for Path Sum III problem using Depth-First Search (DFS)
 *               with an optimized approach leveraging prefix sums (hash map).
 */

const TreeNode = require('../data-structures/TreeNode');

/**
 * --- Problem Description: Path Sum III ---
 * Given the root of a binary tree and an integer `targetSum`, return the number of paths
 * where the sum of the nodes' values equals `targetSum`.
 *
 * A path does not need to start or end at the root or a leaf, but it must go downwards
 * (traveling only from parent nodes to child nodes).
 *
 * Example:
 *        10
 *       /  \
 *      5   -3
 *     / \    \
 *    3   2   11
 *   / \   \
 *  3  -2   1
 * targetSum = 8
 * Output: 3 (Paths: 5 -> 3,  5 -> 2 -> 1,  -3 -> 11)
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 1000].
 * - -10^9 <= Node.val <= 10^9
 * - -1000 <= targetSum <= 1000
 */

/**
 * Counts the number of paths that sum to `targetSum` in a binary tree.
 * This is an optimized solution using DFS and a hash map for prefix sums.
 *
 * Algorithm:
 * We perform a DFS traversal, keeping track of the current path sum from the root to the current node.
 * A hash map `prefixSumCount` stores the frequency of each prefix sum encountered so far.
 *
 * For each node:
 * 1. Add the current node's value to the `currentPathSum`.
 * 2. Check if `currentPathSum - targetSum` exists in `prefixSumCount`.
 *    If it does, it means there's a path starting from an ancestor (or the root)
 *    and ending at the current node that sums to `targetSum`.
 *    Add its frequency to the total `pathCount`.
 * 3. Increment the count for `currentPathSum` in `prefixSumCount`.
 * 4. Recursively call for left and right children.
 * 5. Backtrack: After visiting children, decrement the count for `currentPathSum` in `prefixSumCount`
 *    to remove the effect of the current node's path sum for sibling/cousin branches.
 *
 * The initial `prefixSumCount` should contain `0: 1` to account for paths starting from the root itself
 * (i.e., if `currentPathSum == targetSum`, then `currentPathSum - targetSum == 0`, and we count the path starting at root).
 *
 * Time Complexity: O(N), where N is the number of nodes in the tree.
 *                  Each node is visited once, and hash map operations (insertion, lookup) take O(1) on average.
 * Space Complexity: O(H) for the recursion stack, where H is the height of the tree.
 *                   In the worst case (skewed tree), H can be N, so O(N).
 *                   The hash map can store up to H distinct prefix sums, so O(H) space for the map as well.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @param {number} targetSum The target sum to find paths for.
 * @returns {number} The total number of paths that sum to targetSum.
 */
function pathSum(root, targetSum) {
    // Stores the frequency of prefix sums encountered from root to current node.
    // Initialize with {0: 1} to handle cases where a path starts from the root
    // and sums up to targetSum itself. (currentPathSum - targetSum == 0)
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1);

    let pathCount = 0; // Total number of paths found

    /**
     * Recursive DFS helper function.
     * @param {TreeNode|null} node The current node being visited.
     * @param {number} currentPathSum The sum of values from the root to the current node.
     */
    function dfs(node, currentPathSum) {
        if (!node) {
            return;
        }

        // 1. Update current path sum by adding current node's value
        currentPathSum += node.val;

        // 2. Check if there's a prefix sum that makes the remainder equal to targetSum
        //    If (currentPathSum - targetSum) exists in the map,
        //    it means there are `prefixSumCount.get(currentPathSum - targetSum)` paths
        //    ending at the current node whose sum is targetSum.
        if (prefixSumCount.has(currentPathSum - targetSum)) {
            pathCount += prefixSumCount.get(currentPathSum - targetSum);
        }

        // 3. Add the current path sum to the map or increment its frequency
        prefixSumCount.set(currentPathSum, (prefixSumCount.get(currentPathSum) || 0) + 1);

        // 4. Recurse on children
        dfs(node.left, currentPathSum);
        dfs(node.right, currentPathSum);

        // 5. Backtrack: Remove the current path sum from the map.
        //    This is crucial because we are done with this branch, and its prefix sum
        //    should not affect sibling branches or paths going up from here.
        prefixSumCount.set(currentPathSum, prefixSumCount.get(currentPathSum) - 1);
    }

    dfs(root, 0); // Start DFS from root with initial sum 0
    return pathCount;
}

/**
 * Brute-force approach for Path Sum III.
 * For each node in the tree, perform a separate DFS traversal to find all paths starting from that node
 * that sum to targetSum.
 *
 * Algorithm:
 * 1. `countPaths(node, targetSum)`: This is the main function.
 *    a. If `node` is null, return 0.
 *    b. Initialize `totalPaths = 0`.
 *    c. Call `countPathsFromNode(node, targetSum, 0)` to find paths starting at `node`.
 *    d. Recursively call `countPaths` for left and right children.
 *       `totalPaths += countPaths(node.left, targetSum)`
 *       `totalPaths += countPaths(node.right, targetSum)`
 *    e. Return `totalPaths`.
 *
 * 2. `countPathsFromNode(node, targetSum, currentSum)`: Helper to find paths starting at a specific node.
 *    a. If `node` is null, return 0.
 *    b. Update `currentSum += node.val`.
 *    c. Initialize `paths = 0`.
 *    d. If `currentSum == targetSum`, increment `paths`.
 *    e. Recursively call for children:
 *       `paths += countPathsFromNode(node.left, targetSum, currentSum)`
 *       `paths += countPathsFromNode(node.right, targetSum, currentSum)`
 *    f. Return `paths`.
 *
 * Time Complexity: O(N^2) in the worst case (skewed tree).
 *                  For each of N nodes, we potentially traverse down its entire subtree,
 *                  which can take O(N) time.
 * Space Complexity: O(H) for recursion stack, where H is the height of the tree.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @param {number} targetSum The target sum to find paths for.
 * @returns {number} The total number of paths that sum to targetSum.
 */
function pathSumBruteForce(root, targetSum) {
    if (!root) {
        return 0;
    }

    // Function to count paths that start from a given node and sum to target
    function countPathsStartingWithNode(node, currentTarget) {
        if (!node) {
            return 0;
        }

        let paths = 0;
        // If the current node's value equals the remaining target, we found a path
        if (node.val === currentTarget) {
            paths++;
        }

        // Recursively check paths in left and right children
        // The target for children is reduced by the current node's value
        paths += countPathsStartingWithNode(node.left, currentTarget - node.val);
        paths += countPathsStartingWithNode(node.right, currentTarget - node.val);

        return paths;
    }

    // The total count is the sum of paths starting from each node in the tree
    // (paths starting at root + paths starting at left child's subtree + paths starting at right child's subtree)
    return countPathsStartingWithNode(root, targetSum) +
           pathSumBruteForce(root.left, targetSum) +
           pathSumBruteForce(root.right, targetSum);
}


module.exports = {
    pathSum, // Optimized
    pathSumBruteForce // Brute force
};
```