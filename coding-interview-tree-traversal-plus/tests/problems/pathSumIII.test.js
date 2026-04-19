```javascript
const { buildTreeFromArray } = require('../../src/utils/treeNode');
const { pathSumRecursive, pathSumOptimized } = require('../../src/problems/pathSumIII');

describe('Path Sum III', () => {
    // Test cases for brute-force recursive approach
    describe('pathSumRecursive', () => {
        test('should return 0 for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(pathSumRecursive(root, 8)).toBe(0);
        });

        test('should return 1 for a single node tree matching target', () => {
            const root = buildTreeFromArray([5]);
            expect(pathSumRecursive(root, 5)).toBe(1);
        });

        test('should return 0 for a single node tree not matching target', () => {
            const root = buildTreeFromArray([5]);
            expect(pathSumRecursive(root, 10)).toBe(0);
        });

        test('should correctly find paths in the example tree', () => {
            //       10
            //      /  \
            //     5   -3
            //    / \    \
            //   3   2   11
            //  / \   \
            // 3  -2   1
            const root = buildTreeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
            expect(pathSumRecursive(root, 8)).toBe(3); // Paths: 5->3, 5->2->1, -3->11
        });

        test('should handle negative numbers and zero sums', () => {
            //    1
            //   / \
            //  2  -1
            // / \   /
            //-2  0 -1
            const root = buildTreeFromArray([1, 2, -1, -2, 0, -1]);
            expect(pathSumRecursive(root, 0)).toBe(3); // Paths: 2->-2, 2->0->-1, -1->-1
        });

        test('should handle paths with zero values', () => {
            //    0
            //   / \
            //  0   0
            // / \
            //0   0
            const root = buildTreeFromArray([0, 0, 0, 0, 0]);
            expect(pathSumRecursive(root, 0)).toBe(7); // Every single node path is 0, plus longer paths
            // paths: [0], [0], [0], [0], [0] (5 single node paths)
            // [0,0] (root->left)
            // [0,0] (root->right)
            // [0,0,0] (root->left->left)
            // [0,0,0] (root->left->right)
            // Wait, let's trace this properly for the example.
            // (0, 0, 0, 0, 0)
            // Root(0) -> target 0: 1 path
            // Root(0) -> left(0) -> target 0: 1 path starting at root.left
            // Root(0) -> right(0) -> target 0: 1 path starting at root.right
            // Root(0) -> left(0) -> left(0) -> target 0: 1 path
            // Root(0) -> left(0) -> right(0) -> target 0: 1 path
            // total count:
            // countPathsFromNode(0,0): 1 (for 0 itself) + (countPathsFromNode(0,0) + countPathsFromNode(0,0)) => 1 + (1+1) + (1+1)
            // It's more complex. A single 0 path.
            // 0, 0->0, 0->0
            // root, L, R, LL, LR
            // root (0) = 1
            // L (0) = 1 (if starting from L)
            // R (0) = 1 (if starting from R)
            // LL (0) = 1 (if starting from LL)
            // LR (0) = 1 (if starting from LR)
            // Paths from root:
            // 0 -> target 0 (1)
            // 0->0 -> target 0 (1)
            // 0->0 -> target 0 (1)
            // 0->0->0 -> target 0 (1)
            // 0->0->0 -> target 0 (1)
            // total = 5 paths.
            // My function output: 7
            // `pathSumRecursive(root, targetSum)`:
            // countPathsFromNode(root, targetSum) = 1 (for root itself)
            //  + countPathsFromNode(root.left, targetSum - root.val)
            //  + countPathsFromNode(root.right, targetSum - root.val)
            //  = 1 + countPathsFromNode(L, 0) + countPathsFromNode(R, 0)
            // countPathsFromNode(L, 0) = 1 (for L itself)
            //  + countPathsFromNode(LL, 0) + countPathsFromNode(LR, 0)
            //  = 1 + 1 (for LL) + 1 (for LR) = 3
            // countPathsFromNode(R, 0) = 1 (for R itself) + 0 + 0 = 1
            // So, countPathsFromNode(root, 0) = 1 + 3 + 1 = 5
            // Then `totalPaths += pathSumRecursive(root.left, targetSum)`
            // `pathSumRecursive(L, 0)`:
            // countPathsFromNode(L, 0) = 3 (as calculated above)
            //  + pathSumRecursive(LL, 0) + pathSumRecursive(LR, 0)
            // pathSumRecursive(LL, 0) = countPathsFromNode(LL, 0) + 0 + 0 = 1
            // pathSumRecursive(LR, 0) = countPathsFromNode(LR, 0) + 0 + 0 = 1
            // So, pathSumRecursive(L, 0) = 3 + 1 + 1 = 5
            // totalPaths += pathSumRecursive(root.right, targetSum)`
            // `pathSumRecursive(R, 0)`:
            // countPathsFromNode(R, 0) = 1
            //  + pathSumRecursive(R.left, 0) + pathSumRecursive(R.right, 0)
            //  = 1 + 0 + 0 = 1
            // totalPaths = 5 (from root) + 5 (from L) + 1 (from R) = 11. This is much higher than expected.
            // Let me re-verify the definition of pathSumRecursive. The standard interpretation:
            // a path from a node to one of its descendants (including itself).
            // A path that sums to 0:
            // 1. 0 (root itself)
            // 2. 0 (left child)
            // 3. 0 (right child)
            // 4. 0 (left-left child)
            // 5. 0 (left-right child)
            // 6. 0 -> 0 (root to left)
            // 7. 0 -> 0 (root to right)
            // 8. 0 -> 0 -> 0 (root to left to left-left)
            // 9. 0 -> 0 -> 0 (root to left to left-right)
            // Total should be 9.
            // The brute-force implementation does count each path from a starting node.
            // Let's manually trace `pathSumRecursive` for `[0,0,0,0,0]`, target 0.
            // `pathSumRecursive(root, 0)`:
            //  `countPathsFromNode(root, 0)`: returns 5 (paths starting at root: [0], [0,0] (L), [0,0] (R), [0,0,0] (LL), [0,0,0] (LR))
            //  `totalPaths` = 5
            //  `pathSumRecursive(root.left, 0)`:
            //      `countPathsFromNode(root.left, 0)`: returns 3 (paths starting at L: [0], [0,0] (LL), [0,0] (LR))
            //      `totalPaths` = 3
            //      `pathSumRecursive(root.left.left, 0)`: returns `countPathsFromNode(LL, 0)` which is 1. total = 1.
            //      `pathSumRecursive(root.left.right, 0)`: returns `countPathsFromNode(LR, 0)` which is 1. total = 1.
            //      So `pathSumRecursive(root.left, 0)` returns 3 + 1 + 1 = 5.
            //  `totalPaths` = 5 + 5 = 10
            //  `pathSumRecursive(root.right, 0)`:
            //      `countPathsFromNode(root.right, 0)`: returns 1 (path starting at R: [0])
            //      `totalPaths` = 1
            //      `pathSumRecursive(root.right.left, 0)`: returns 0.
            //      `pathSumRecursive(root.right.right, 0)`: returns 0.
            //      So `pathSumRecursive(root.right, 0)` returns 1 + 0 + 0 = 1.
            //  `totalPaths` = 10 + 1 = 11.
            // The result 11 indicates my manual count of 9 was off, or my interpretation of the problem.
            // The problem: "path does not need to start or end at the root or a leaf"
            // Let's list the 11 paths:
            // 1. [10] (if target 10)
            // 2. [5]
            // 3. [3]
            // 4. [2]
            // 5. [11]
            // 6. [3] (leftmost 3)
            // 7. [-2]
            // 8. [1]
            // 9. 10 -> 5 -> 3
            // 10. 10 -> 5 -> 2
            // 11. 10 -> -3 -> 11
            // This suggests 11 paths that SUM to 10 from the example tree.
            // For `[0,0,0,0,0]` target 0:
            // Paths of sum 0:
            // 1. [0] (root)
            // 2. [0] (root->left)
            // 3. [0] (root->right)
            // 4. [0] (root->left->left)
            // 5. [0] (root->left->right)
            // 6. [0,0] (root->left)
            // 7. [0,0] (root->right)
            // 8. [0,0,0] (root->left->left)
            // 9. [0,0,0] (root->left->right)
            // This is 9 distinct paths. The code returns 11.
            // Let's reconsider `countPathsFromNode(node, currentSum)`
            // `currentSum` is the remaining target.
            // `currentSum === node.val`: this path ending at `node` has this sum.
            // For root `0`, target `0`:
            // `countPathsFromNode(root, 0)`:
            //  `count = 1` (because root.val is 0, matches remaining target)
            //  `count += countPathsFromNode(root.left, 0 - 0)` => `countPathsFromNode(L, 0)`
            //  `countPathsFromNode(L, 0)`:
            //      `count = 1` (L.val is 0, matches)
            //      `count += countPathsFromNode(LL, 0)`
            //      `countPathsFromNode(LL, 0)`:
            //          `count = 1` (LL.val is 0, matches)
            //          `count += 0 + 0` = 1. Returns 1.
            //      `count += countPathsFromNode(LR, 0)`
            //      `countPathsFromNode(LR, 0)`:
            //          `count = 1` (LR.val is 0, matches)
            //          `count += 0 + 0` = 1. Returns 1.
            //      So `countPathsFromNode(L, 0)` returns 1 + 1 + 1 = 3.
            //  `count += countPathsFromNode(root.right, 0 - 0)` => `countPathsFromNode(R, 0)`
            //  `countPathsFromNode(R, 0)`:
            //      `count = 1` (R.val is 0, matches)
            //      `count += 0 + 0` = 1. Returns 1.
            // So `countPathsFromNode(root, 0)` returns 1 + 3 + 1 = 5.
            // This part is correct. It counts paths starting from `root`.
            // Now `pathSumRecursive(root, 0)`:
            // `totalPaths = 5` (from paths starting at `root`)
            // `totalPaths += pathSumRecursive(root.left, 0)`:
            //  `pathSumRecursive(L, 0)`:
            //      `countPathsFromNode(L, 0)` returns 3 (paths starting at L)
            //      `totalPaths = 3`
            //      `totalPaths += pathSumRecursive(LL, 0)`:
            //          `pathSumRecursive(LL, 0)`:
            //              `countPathsFromNode(LL, 0)` returns 1.
            //              `totalPaths = 1`
            //              `totalPaths += 0 + 0`. Returns 1.
            //      `totalPaths = 3 + 1 = 4`
            //      `totalPaths += pathSumRecursive(LR, 0)`:
            //          `pathSumRecursive(LR, 0)`:
            //              `countPathsFromNode(LR, 0)` returns 1.
            //              `totalPaths = 1`
            //              `totalPaths += 0 + 0`. Returns 1.
            //      `totalPaths = 4 + 1 = 5`. So `pathSumRecursive(L, 0)` returns 5.
            // `totalPaths = 5 + 5 = 10`.
            // `totalPaths += pathSumRecursive(root.right, 0)`:
            //  `pathSumRecursive(R, 0)`:
            //      `countPathsFromNode(R, 0)` returns 1 (paths starting at R)
            //      `totalPaths = 1`
            //      `totalPaths += 0 + 0`. Returns 1.
            // `totalPaths = 10 + 1 = 11`.
            // The brute-force actually counts correctly according to the problem statement.
            // My manual path counting was incomplete.
            // For [0,0,0,0,0], target 0:
            // Paths starting at root (value 0):
            // 1. [0]
            // 2. [0,0] (to L)
            // 3. [0,0] (to R)
            // 4. [0,0,0] (to LL)
            // 5. [0,0,0] (to LR)
            // Paths starting at L (value 0):
            // 6. [0]
            // 7. [0,0] (to LL)
            // 8. [0,0] (to LR)
            // Paths starting at R (value 0):
            // 9. [0]
            // Paths starting at LL (value 0):
            // 10. [0]
            // Paths starting at LR (value 0):
            // 11. [0]
            // Total 11 paths. The code is correct.
            const rootWithZeros = buildTreeFromArray([0, 0, 0, 0, 0]);
            expect(pathSumRecursive(rootWithZeros, 0)).toBe(11);
        });

        test('should handle a large tree with no matching paths', () => {
            // A long skewed tree
            const largeTree = buildTreeFromArray([1, 2, null, 3, null, null, null, 4, null, null, null, null, null, null, 5]);
            expect(pathSumRecursive(largeTree, 100)).toBe(0);
        });

        test('should handle a single path that matches exactly', () => {
            //   1
            //  / \
            // 2   3
            //    /
            //   4
            const root = buildTreeFromArray([1, 2, 3, null, null, 4]);
            expect(pathSumRecursive(root, 7)).toBe(1); // Path: 1 -> 3 -> 4
        });
    });

    // Test cases for optimized prefix sum approach
    describe('pathSumOptimized', () => {
        test('should return 0 for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(pathSumOptimized(root, 8)).toBe(0);
        });

        test('should return 1 for a single node tree matching target', () => {
            const root = buildTreeFromArray([5]);
            expect(pathSumOptimized(root, 5)).toBe(1);
        });

        test('should return 0 for a single node tree not matching target', () => {
            const root = buildTreeFromArray([5]);
            expect(pathSumOptimized(root, 10)).toBe(0);
        });

        test('should correctly find paths in the example tree', () => {
            const root = buildTreeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
            expect(pathSumOptimized(root, 8)).toBe(3); // Paths: 5->3, 5->2->1, -3->11
        });

        test('should handle negative numbers and zero sums', () => {
            const root = buildTreeFromArray([1, 2, -1, -2, 0, -1]);
            expect(pathSumOptimized(root, 0)).toBe(3); // Paths: 2->-2, 2->0->-1, -1->-1
        });

        test('should handle paths with zero values', () => {
            const rootWithZeros = buildTreeFromArray([0, 0, 0, 0, 0]);
            expect(pathSumOptimized(rootWithZeros, 0)).toBe(11); // The same 11 paths as brute-force
        });

        test('should handle a large tree with no matching paths', () => {
            const largeTree = buildTreeFromArray([1, 2, null, 3, null, null, null, 4, null, null, null, null, null, null, 5]);
            expect(pathSumOptimized(largeTree, 100)).toBe(0);
        });

        test('should handle a single path that matches exactly', () => {
            const root = buildTreeFromArray([1, 2, 3, null, null, 4]);
            expect(pathSumOptimized(root, 7)).toBe(1); // Path: 1 -> 3 -> 4
        });
    });
});
```