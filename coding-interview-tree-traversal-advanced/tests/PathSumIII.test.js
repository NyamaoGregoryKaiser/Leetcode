```javascript
/**
 * @fileoverview Test cases for Path Sum III problem.
 */

const { buildTreeFromArray } = require('../src/utils/TreeBuilder');
const { pathSum, pathSumBruteForce } = require('../src/problems/PathSumIII');

/**
 * Test suite for Path Sum III.
 * @param {function} assert The assertion function.
 */
function testPathSumIII(assert) {
    // Test Case 1: Empty tree
    let root = buildTreeFromArray([]);
    assert(pathSum(root, 0), 0, "Optimized Path Sum III: Empty tree, target 0");
    assert(pathSum(root, 10), 0, "Optimized Path Sum III: Empty tree, target 10");
    assert(pathSumBruteForce(root, 0), 0, "Brute Force Path Sum III: Empty tree, target 0");

    // Test Case 2: Single node tree, target matches
    root = buildTreeFromArray([5]);
    assert(pathSum(root, 5), 1, "Optimized Path Sum III: Single node, target matches");
    assert(pathSumBruteForce(root, 5), 1, "Brute Force Path Sum III: Single node, target matches");

    // Test Case 3: Single node tree, target does not match
    assert(pathSum(root, 10), 0, "Optimized Path Sum III: Single node, target mismatch");
    assert(pathSumBruteForce(root, 10), 0, "Brute Force Path Sum III: Single node, target mismatch");

    // Test Case 4: Example tree from problem (target 8)
    root = buildTreeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
    //        10
    //       /  \
    //      5   -3
    //     / \    \
    //    3   2   11
    //   / \   \
    //  3  -2   1
    // Target: 8
    // Paths: (5 -> 3), (5 -> 2 -> 1), (-3 -> 11)
    assert(pathSum(root, 8), 3, "Optimized Path Sum III: Problem example (target 8)");
    assert(pathSumBruteForce(root, 8), 3, "Brute Force Path Sum III: Problem example (target 8)");

    // Test Case 5: Example tree from problem (target 3)
    // Paths: (3), (3 again), (2 -> 1)
    assert(pathSum(root, 3), 3, "Optimized Path Sum III: Problem example (target 3)");
    assert(pathSumBruteForce(root, 3), 3, "Brute Force Path Sum III: Problem example (target 3)");

    // Test Case 6: Target 0
    root = buildTreeFromArray([0, 0, 0, 0, 0]);
    //      0
    //     / \
    //    0   0
    //   / \
    //  0   0
    // Target: 0. Many paths sum to 0.
    // E.g., root itself, root->left, root->right, root->left->left, root->left->right.
    // From 0 (root), paths (0), (0->0), (0->0), (0->0->0), (0->0->0) are 5 paths.
    // Also consider paths starting from 0 (left child), (0->0), (0->0->0), etc.
    // Total count for target 0 in this specific tree is 10.
    assert(pathSum(root, 0), 10, "Optimized Path Sum III: Tree with all zeros, target 0");
    assert(pathSumBruteForce(root, 0), 10, "Brute Force Path Sum III: Tree with all zeros, target 0");

    // Test Case 7: Larger target on a path that exists
    root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // 1->2->4->8 (15)
    // 1->2->5->9 (17)
    // 1->3->6->10 (20)
    // Target 15 should be 1
    assert(pathSum(root, 15), 1, "Optimized Path Sum III: Large target, one path");
    assert(pathSumBruteForce(root, 15), 1, "Brute Force Path Sum III: Large target, one path");

    // Test Case 8: No paths matching target
    assert(pathSum(root, 100), 0, "Optimized Path Sum III: No path matches target");
    assert(pathSumBruteForce(root, 100), 0, "Brute Force Path Sum III: No path matches target");

    // Test Case 9: Tree with negative values and target sum is also negative
    root = buildTreeFromArray([1, -2, -3, 1, 3, -2, null, -1]);
    //        1
    //       / \
    //      -2 -3
    //     / \ /
    //    1  3 -2
    //   /
    //  -1
    // Target: -1
    // Paths: (1 -> -2), (1 -> -2 -> 1 -> -1), (-2 -> 1 -> -1), (-3 -> -2), (-1)
    assert(pathSum(root, -1), 5, "Optimized Path Sum III: Negative values and negative target");
    assert(pathSumBruteForce(root, -1), 5, "Brute Force Path Sum III: Negative values and negative target");

    // Test Case 10: Long skewed path
    root = buildTreeFromArray([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]); // A path of 10 nodes, all value 1
    // 1
    //  \
    //   1
    //    \
    //     1
    //      ... (10 times)
    // Target: 3
    // Should have 8 paths of 3 consecutive ones: (1,1,1) starting at depth 0 to 7
    // Total paths for target 3: 8
    assert(pathSum(root, 3), 8, "Optimized Path Sum III: Long skewed path, target 3");
    assert(pathSumBruteForce(root, 3), 8, "Brute Force Path Sum III: Long skewed path, target 3");

    // Test Case 11: LeetCode specific (target 0)
    root = buildTreeFromArray([1, null, 2, null, 3, null, 4, null, 5]); // right skewed
    assert(pathSum(root, 3), 1, "Optimized Path Sum III: Right skewed tree, target 3"); // 1->2 (sum=3)
    assert(pathSumBruteForce(root, 3), 1, "Brute Force Path Sum III: Right skewed tree, target 3");

    // Test Case 12: Complex tree, with multiple paths from different nodes
    root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]); // target = 7
    //   1
    //  / \
    // 2   3
    // / \ / \
    // 4 5 6 7
    // Paths: (2->5), (3->4 (if values changed to 4 and 3, currently it's impossible. Let's make it work))
    // Let's create a tree with multiple 7-sum paths
    root = buildTreeFromArray([1, 6, 7, 1, null, 0, 7]);
    //        1
    //       / \
    //      6   7
    //     / \ / \
    //    1  N 0  7
    // Target = 7
    // Paths: (7), (7, last node), (1->6), (1->0->7) - this is (1->6) or (1->7) and (0->7)
    // Actually:
    // 1. Root's 7 (right child)
    // 2. 6 + 1 (left child + left child's left child)
    // 3. 0 + 7 (right child of 7 + right child of 7's right child) -> Incorrect, 0 is right child of 6
    //    Root: 1
    //    Left: 6 -> 1
    //    Right: 7 -> 0
    //                    7 (another one)
    // Target 7:
    // 1. Path (6, 1) starting at node 6: 6+1 = 7.
    // 2. Path (7) starting at node 7: 7 = 7.
    // 3. Path (7, last node) starting at node 7: 7 = 7.
    // 4. Path (1 -> 6) starting at root: 1+6 = 7.
    // Total = 4.
    assert(pathSum(root, 7), 4, "Optimized Path Sum III: Complex tree, multiple target paths");
    assert(pathSumBruteForce(root, 7), 4, "Brute Force Path Sum III: Complex tree, multiple target paths");
}

module.exports = {
    testPathSumIII
};
```