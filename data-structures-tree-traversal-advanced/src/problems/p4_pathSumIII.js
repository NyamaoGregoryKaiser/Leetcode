```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @problem 4: Path Sum III
 * @description Given the `root` of a binary tree and an integer `targetSum`,
 * return the number of paths where the sum of the nodes' values equals `targetSum`.
 *
 * The path does not need to start at the root or end at a leaf, but it must go downwards
 * (traveling only from parent nodes to child nodes).
 *
 * Example:
 * Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * Output: 3
 * Explanation: The paths that sum to 8 are:
 * 1. 5 -> 3
 * 2. 5 -> 2 -> 1
 * 3. -3 -> 11
 *
 * Constraints:
 * The number of nodes in the tree is in the range [0, 1000].
 * -10^9 <= Node.val <= 10^9
 * -1000 <= targetSum <= 1000
 * The depth of the tree will not exceed 1000.
 */

/**
 * Approach 1: Recursive Depth-First Search (DFS) with a nested DFS
 *
 * Logic:
 * This problem has two key requirements:
 * 1. A path can start at *any* node.
 * 2. A path must go downwards.
 *
 * This suggests a two-level recursive approach:
 * Outer DFS (`pathSum` function): Traverses every node in the tree. For each node,
 *   it considers this node as a potential starting point for a path.
 * Inner DFS (`countPathsFromNode` helper): For a given starting node, it finds all
 *   downward paths from *that specific node* whose sum equals `targetSum`.
 *
 * Detailed Steps:
 * 1. `pathSum(root, targetSum)`:
 *    a. Base case: If `root` is null, return 0.
 *    b. Initialize `totalPaths = 0`.
 *    c. `totalPaths += countPathsFromNode(root, targetSum, 0)`: This calls the inner DFS
 *       to count paths starting from the current `root` node.
 *    d. `totalPaths += pathSum(root.left, targetSum)`: Recursively check paths starting
 *       from the left child (i.e., treating `root.left` as a new "root" for its subtree).
 *    e. `totalPaths += pathSum(root.right, targetSum)`: Recursively check paths starting
 *       from the right child.
 *    f. Return `totalPaths`.
 *
 * 2. `countPathsFromNode(node, targetSum, currentSum)`:
 *    a. Base case: If `node` is null, return 0.
 *    b. Add `node.val` to `currentSum`.
 *    c. Initialize `count = 0`.
 *    d. If `currentSum === targetSum`, increment `count`.
 *    e. `count += countPathsFromNode(node.left, targetSum, currentSum)`: Explore paths
 *       further down the left child, continuing the `currentSum`.
 *    f. `count += countPathsFromNode(node.right, targetSum, currentSum)`: Explore paths
 *       further down the right child, continuing the `currentSum`.
 *    g. Return `count`.
 *
 * This approach ensures that every possible downward path segment is considered.
 * The `pathSum` ensures every node is a potential start. The `countPathsFromNode`
 * ensures every path from that start is checked.
 *
 * @param {TreeNode | null} root - The root of the binary tree.
 * @param {number} targetSum - The target sum to find.
 * @returns {number} The number of paths that sum to targetSum.
 *
 * Time Complexity: O(N^2) in the worst case (skewed tree).
 *   - The outer `pathSum` visits each node once (O(N)).
 *   - For each node, the inner `countPathsFromNode` performs a DFS from that node
 *     down to all its descendants. In the worst case (skewed tree), this inner DFS
 *     can visit O(N) nodes.
 *   - Thus, N * O(N) = O(N^2).
 *   - In a balanced tree, the inner DFS would be O(logN), leading to O(N logN) overall.
 * Space Complexity: O(H) where H is the height of the tree, for the recursion stack.
 *                   In the worst case (skewed tree), H can be N, so O(N).
 */
function pathSum(root, targetSum) {
    if (!root) {
        return 0;
    }

    // This function explores all paths that START from the 'node' and sum to 'targetSum'
    // It passes down the 'currentPathSum' accumulating values.
    /**
     * @param {TreeNode} node - The current node in the path.
     * @param {number} target - The target sum we are looking for.
     * @param {number} currentPathSum - The sum of values from the starting node to the 'node'.
     * @returns {number} The count of paths starting from the initial call's node that sum to 'target'.
     */
    function countPathsFromNode(node, target, currentPathSum) {
        if (!node) {
            return 0;
        }

        currentPathSum += node.val;
        let count = 0;

        // If the current path sum equals the target, we found one valid path
        if (currentPathSum === target) {
            count++;
        }

        // Continue exploring left and right children, accumulating the sum
        count += countPathsFromNode(node.left, target, currentPathSum);
        count += countPathsFromNode(node.right, target, currentPathSum);

        return count;
    }

    // Total paths will be the sum of:
    // 1. Paths starting from the current root node.
    // 2. Paths starting from the left child's subtree.
    // 3. Paths starting from the right child's subtree.
    let totalPaths = 0;
    totalPaths += countPathsFromNode(root, targetSum, 0); // Paths starting at 'root'

    // Recursively call pathSum for left and right children to find paths starting at those nodes
    totalPaths += pathSum(root.left, targetSum);
    totalPaths += pathSum(root.right, targetSum);

    return totalPaths;
}

/**
 * Approach 2: Optimized DFS with Prefix Sums (using a Map)
 *
 * Logic:
 * This approach optimizes the O(N^2) solution to O(N) by using a hash map (or Map in JS)
 * to store the counts of prefix sums encountered so far along the path from the root to the current node.
 *
 * Let `current_sum` be the sum of values from the root to the current node.
 * If we are looking for a path segment that sums to `targetSum`, this means we need to find
 * a previous prefix sum `P` such that `current_sum - P = targetSum`.
 * This implies `P = current_sum - targetSum`.
 *
 * We can store the frequency of each prefix sum encountered in a `Map<sum, count>`.
 *
 * Detailed Steps:
 * 1. Initialize `totalPaths = 0`.
 * 2. Initialize `prefixSumCounts = new Map()`:
 *    - Add `0` with a count of `1` to `prefixSumCounts`. This handles cases where a path
 *      starting from the root itself sums to `targetSum`. If `current_sum - targetSum`
 *      is `0`, it means `current_sum` itself is `targetSum`.
 * 3. Define a recursive helper function `dfs(node, currentSum)`:
 *    a. Base case: If `node` is null, return.
 *    b. Add `node.val` to `currentSum`.
 *    c. Check if `prefixSumCounts` contains `currentSum - targetSum`.
 *       If it does, add its count to `totalPaths`. This means we found `count` paths
 *       ending at the current node that sum to `targetSum`.
 *    d. Increment the count for `currentSum` in `prefixSumCounts`.
 *       `prefixSumCounts.set(currentSum, (prefixSumCounts.get(currentSum) || 0) + 1);`
 *    e. Recursively call `dfs` for left child: `dfs(node.left, currentSum)`.
 *    f. Recursively call `dfs` for right child: `dfs(node.right, currentSum)`.
 *    g. Backtrack: After visiting children, *decrement* the count for `currentSum` in
 *       `prefixSumCounts`. This is crucial because `currentSum` is no longer part of
 *       the path when we move to a sibling or an ancestor's other child.
 *       `prefixSumCounts.set(currentSum, prefixSumCounts.get(currentSum) - 1);`
 * 4. Start the DFS from the root: `dfs(root, 0)`.
 * 5. Return `totalPaths`.
 *
 * @param {TreeNode | null} root - The root of the binary tree.
 * @param {number} targetSum - The target sum to find.
 * @returns {number} The number of paths that sum to targetSum.
 *
 * Time Complexity: O(N) where N is the number of nodes. Each node is visited exactly once,
 *                  and hash map operations (get, set) are O(1) on average.
 * Space Complexity: O(H) where H is the height of the tree for the recursion stack.
 *                   Additionally, the `prefixSumCounts` map can store up to O(H) distinct
 *                   prefix sums in the worst case (skewed tree), so total O(H).
 *                   In the worst case (skewed tree), H can be N, so O(N).
 */
function pathSumOptimized(root, targetSum) {
    if (!root) {
        return 0;
    }

    let totalPaths = 0;
    // Map to store the frequency of prefix sums encountered on the path from root to current node.
    // Key: prefix sum, Value: frequency of that prefix sum.
    const prefixSumCounts = new Map();

    // Initialize with a prefix sum of 0 occurring once.
    // This is crucial to handle paths that start from the root and sum up to targetSum.
    // E.g., if targetSum = 8, and root.val = 8, then currentSum (8) - targetSum (8) = 0.
    // We would find 0 in the map and count it as one path.
    prefixSumCounts.set(0, 1);

    /**
     * Helper function for DFS traversal with prefix sum tracking.
     * @param {TreeNode | null} node - The current node being visited.
     * @param {number} currentSum - The sum of values from the actual tree root down to the 'node'.
     */
    function dfs(node, currentSum) {
        if (!node) {
            return;
        }

        // Add the current node's value to the running sum
        currentSum += node.val;

        // Check if there's a previous prefix sum that, when subtracted from currentSum, equals targetSum.
        // If (currentSum - targetSum) exists in the map, it means there are
        // (prefixSumCounts.get(currentSum - targetSum)) ways to form a path that ends at 'node'
        // and sums to 'targetSum'.
        if (prefixSumCounts.has(currentSum - targetSum)) {
            totalPaths += prefixSumCounts.get(currentSum - targetSum);
        }

        // Add the currentSum to the map, or increment its count.
        prefixSumCounts.set(currentSum, (prefixSumCounts.get(currentSum) || 0) + 1);

        // Recursively traverse left and right children
        dfs(node.left, currentSum);
        dfs(node.right, currentSum);

        // Backtrack: After visiting children, remove the currentSum from the map.
        // This is important because the currentSum is only valid for paths that include 'node'
        // and its descendants. When returning to a parent or exploring a sibling subtree,
        // this currentSum is no longer part of the active path.
        prefixSumCounts.set(currentSum, prefixSumCounts.get(currentSum) - 1);
    }

    // Start DFS from the root with an initial sum of 0
    dfs(root, 0);

    return totalPaths;
}


module.exports = {
    pathSum, // O(N^2) approach for comparison
    pathSumOptimized // O(N) approach
};
```