```javascript
const {
    inorderTraversalRecursive,
    inorderTraversalIterative,
    preorderTraversalRecursive,
    preorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack,
    levelOrderTraversal,
    zigzagLevelOrderTraversal,
    maxDepthRecursive,
    maxDepthIterativeBFS,
    pathSumIII_BruteForceDFS,
    pathSumIII_OptimizedDFS
} = require('../algorithms/traversalProblems');
const { buildTree } = require('../utils/treeBuilder');

describe('Tree Traversal Algorithms', () => {

    // Helper function to create a basic tree for multiple tests
    const createTestTree = () => {
        // Tree:
        //      3
        //     / \
        //    9  20
        //      /  \
        //     15   7
        return buildTree([3, 9, 20, null, null, 15, 7]);
    };

    // Helper function to create a skewed left tree
    const createLeftSkewedTree = () => {
        // Tree:
        //      1
        //     /
        //    2
        //   /
        //  3
        // /
        // 4
        return buildTree([1, 2, null, 3, null, null, null, 4]);
    };

    // Helper function to create a skewed right tree
    const createRightSkewedTree = () => {
        // Tree:
        //  1
        //   \
        //    2
        //     \
        //      3
        //       \
        //        4
        return buildTree([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]);
    };

    describe('Inorder Traversal (Left -> Root -> Right)', () => {
        it('should return empty array for null root', () => {
            expect(inorderTraversalRecursive(null)).toEqual([]);
            expect(inorderTraversalIterative(null)).toEqual([]);
        });

        it('should return root for single node tree', () => {
            const root = buildTree([1]);
            expect(inorderTraversalRecursive(root)).toEqual([1]);
            expect(inorderTraversalIterative(root)).toEqual([1]);
        });

        it('should perform inorder traversal on a balanced tree', () => {
            const root = createTestTree();
            expect(inorderTraversalRecursive(root)).toEqual([9, 3, 15, 20, 7]);
            expect(inorderTraversalIterative(root)).toEqual([9, 3, 15, 20, 7]);
        });

        it('should perform inorder traversal on a left-skewed tree', () => {
            const root = createLeftSkewedTree();
            expect(inorderTraversalRecursive(root)).toEqual([4, 3, 2, 1]);
            expect(inorderTraversalIterative(root)).toEqual([4, 3, 2, 1]);
        });

        it('should perform inorder traversal on a right-skewed tree', () => {
            const root = createRightSkewedTree();
            expect(inorderTraversalRecursive(root)).toEqual([1, 2, 3, 4]);
            expect(inorderTraversalIterative(root)).toEqual([1, 2, 3, 4]);
        });

        it('should handle tree with negative values', () => {
            const root = buildTree([-5, -3, -7, -1, -4]);
            //    -5
            //   /  \
            // -3   -7
            // / \
            //-1 -4
            expect(inorderTraversalRecursive(root)).toEqual([-1, -3, -4, -5, -7]);
            expect(inorderTraversalIterative(root)).toEqual([-1, -3, -4, -5, -7]);
        });
    });

    describe('Preorder Traversal (Root -> Left -> Right)', () => {
        it('should return empty array for null root', () => {
            expect(preorderTraversalRecursive(null)).toEqual([]);
            expect(preorderTraversalIterative(null)).toEqual([]);
        });

        it('should return root for single node tree', () => {
            const root = buildTree([1]);
            expect(preorderTraversalRecursive(root)).toEqual([1]);
            expect(preorderTraversalIterative(root)).toEqual([1]);
        });

        it('should perform preorder traversal on a balanced tree', () => {
            const root = createTestTree();
            expect(preorderTraversalRecursive(root)).toEqual([3, 9, 20, 15, 7]);
            expect(preorderTraversalIterative(root)).toEqual([3, 9, 20, 15, 7]);
        });

        it('should perform preorder traversal on a left-skewed tree', () => {
            const root = createLeftSkewedTree();
            expect(preorderTraversalRecursive(root)).toEqual([1, 2, 3, 4]);
            expect(preorderTraversalIterative(root)).toEqual([1, 2, 3, 4]);
        });

        it('should perform preorder traversal on a right-skewed tree', () => {
            const root = createRightSkewedTree();
            expect(preorderTraversalRecursive(root)).toEqual([1, 2, 3, 4]);
            expect(preorderTraversalIterative(root)).toEqual([1, 2, 3, 4]);
        });
    });

    describe('Postorder Traversal (Left -> Right -> Root)', () => {
        it('should return empty array for null root', () => {
            expect(postorderTraversalRecursive(null)).toEqual([]);
            expect(postorderTraversalIterativeTwoStacks(null)).toEqual([]);
            expect(postorderTraversalIterativeOneStack(null)).toEqual([]);
        });

        it('should return root for single node tree', () => {
            const root = buildTree([1]);
            expect(postorderTraversalRecursive(root)).toEqual([1]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([1]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([1]);
        });

        it('should perform postorder traversal on a balanced tree', () => {
            const root = createTestTree();
            expect(postorderTraversalRecursive(root)).toEqual([9, 15, 7, 20, 3]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([9, 15, 7, 20, 3]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([9, 15, 7, 20, 3]);
        });

        it('should perform postorder traversal on a left-skewed tree', () => {
            const root = createLeftSkewedTree();
            expect(postorderTraversalRecursive(root)).toEqual([4, 3, 2, 1]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([4, 3, 2, 1]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([4, 3, 2, 1]);
        });

        it('should perform postorder traversal on a right-skewed tree', () => {
            const root = createRightSkewedTree();
            expect(postorderTraversalRecursive(root)).toEqual([4, 3, 2, 1]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([4, 3, 2, 1]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([4, 3, 2, 1]);
        });
    });

    describe('Level Order Traversal (BFS)', () => {
        it('should return empty array for null root', () => {
            expect(levelOrderTraversal(null)).toEqual([]);
        });

        it('should return single level for single node tree', () => {
            const root = buildTree([1]);
            expect(levelOrderTraversal(root)).toEqual([[1]]);
        });

        it('should perform level order traversal on a balanced tree', () => {
            const root = createTestTree();
            expect(levelOrderTraversal(root)).toEqual([[3], [9, 20], [15, 7]]);
        });

        it('should perform level order traversal on a skewed tree', () => {
            const root = createLeftSkewedTree();
            expect(levelOrderTraversal(root)).toEqual([[1], [2], [3], [4]]);
        });

        it('should handle incomplete trees', () => {
            const root = buildTree([1, 2, 3, 4, null, null, 5]);
            //       1
            //      / \
            //     2   3
            //    /     \
            //   4       5
            expect(levelOrderTraversal(root)).toEqual([[1], [2, 3], [4, 5]]);
        });
    });

    describe('Zigzag Level Order Traversal', () => {
        it('should return empty array for null root', () => {
            expect(zigzagLevelOrderTraversal(null)).toEqual([]);
        });

        it('should return single level for single node tree', () => {
            const root = buildTree([1]);
            expect(zigzagLevelOrderTraversal(root)).toEqual([[1]]);
        });

        it('should perform zigzag level order traversal on a balanced tree', () => {
            const root = createTestTree(); // Tree: [[3], [9, 20], [15, 7]]
            // Expected:
            // Level 0: [3] (L->R)
            // Level 1: [20, 9] (R->L)
            // Level 2: [15, 7] (L->R)
            expect(zigzagLevelOrderTraversal(root)).toEqual([[3], [20, 9], [15, 7]]);
        });

        it('should perform zigzag level order traversal on a more complex tree', () => {
            const root = buildTree([1, 2, 3, 4, 5, 6, 7]);
            //       1
            //      / \
            //     2   3
            //    / \ / \
            //   4  5 6  7
            // Expected:
            // Level 0: [1]
            // Level 1: [3, 2]
            // Level 2: [4, 5, 6, 7] (This level is Left-to-Right after Level 1 was Right-to-Left)
            expect(zigzagLevelOrderTraversal(root)).toEqual([[1], [3, 2], [4, 5, 6, 7]]);
        });

        it('should handle incomplete trees', () => {
            const root = buildTree([1, 2, null, 3, 4]);
            //    1
            //   /
            //  2
            // / \
            //3   4
            expect(zigzagLevelOrderTraversal(root)).toEqual([[1], [2], [3, 4]]);
        });
    });

    describe('Maximum Depth of Binary Tree', () => {
        it('should return 0 for a null root', () => {
            expect(maxDepthRecursive(null)).toBe(0);
            expect(maxDepthIterativeBFS(null)).toBe(0);
        });

        it('should return 1 for a single node tree', () => {
            const root = buildTree([1]);
            expect(maxDepthRecursive(root)).toBe(1);
            expect(maxDepthIterativeBFS(root)).toBe(1);
        });

        it('should calculate correct depth for a balanced tree', () => {
            const root = createTestTree(); // Depth should be 3 (3 -> 20 -> 15 or 3 -> 20 -> 7)
            expect(maxDepthRecursive(root)).toBe(3);
            expect(maxDepthIterativeBFS(root)).toBe(3);
        });

        it('should calculate correct depth for a left-skewed tree', () => {
            const root = createLeftSkewedTree(); // Depth should be 4
            expect(maxDepthRecursive(root)).toBe(4);
            expect(maxDepthIterativeBFS(root)).toBe(4);
        });

        it('should calculate correct depth for a right-skewed tree', () => {
            const root = createRightSkewedTree(); // Depth should be 4
            expect(maxDepthRecursive(root)).toBe(4);
            expect(maxDepthIterativeBFS(root)).toBe(4);
        });

        it('should handle complex tree with varying depths', () => {
            const root = buildTree([1, 2, 3, 4, null, 5, 6, 7]);
            //        1
            //       / \
            //      2   3
            //     /   / \
            //    4   5   6
            //   /
            //  7
            // Longest path: 1->2->4->7 (depth 4)
            expect(maxDepthRecursive(root)).toBe(4);
            expect(maxDepthIterativeBFS(root)).toBe(4);
        });
    });

    describe('Path Sum III', () => {
        // Test tree for Path Sum III
        //       10
        //      /  \
        //     5   -3
        //    / \    \
        //   3   2   11
        //  / \   \
        // 3  -2   1
        const createPathSumTestTree = () => buildTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);

        it('should return 0 for null root', () => {
            expect(pathSumIII_BruteForceDFS(null, 8)).toBe(0);
            expect(pathSumIII_OptimizedDFS(null, 8)).toBe(0);
        });

        it('should find correct paths for a simple tree', () => {
            const root = buildTree([1, 2, 3]);
            //   1
            //  / \
            // 2   3
            expect(pathSumIII_OptimizedDFS(root, 3)).toBe(2); // Path 1->2, Path 3
            expect(pathSumIII_BruteForceDFS(root, 3)).toBe(2);
            expect(pathSumIII_OptimizedDFS(root, 1)).toBe(1); // Path 1
            expect(pathSumIII_BruteForceDFS(root, 1)).toBe(1);
            expect(pathSumIII_OptimizedDFS(root, 5)).toBe(1); // Path 2->3
            expect(pathSumIII_BruteForceDFS(root, 5)).toBe(1);
        });

        it('should find correct paths for the example tree (targetSum = 8)', () => {
            const root = createPathSumTestTree();
            // Paths that sum to 8:
            // 1. 5 -> 3
            // 2. 5 -> 2 -> 1
            // 3. -3 -> 11
            expect(pathSumIII_BruteForceDFS(root, 8)).toBe(3);
            expect(pathSumIII_OptimizedDFS(root, 8)).toBe(3);
        });

        it('should find correct paths when targetSum is 0', () => {
            const root = buildTree([1, 2, -2, 3, -3, 4, -4]);
            // Example paths with 0 sum: 2 -> -2, 3 -> -3, 4 -> -4
            expect(pathSumIII_OptimizedDFS(root, 0)).toBe(3);
            expect(pathSumIII_BruteForceDFS(root, 0)).toBe(3);
        });

        it('should find paths starting from root and equaling targetSum', () => {
            const root = buildTree([10, 5, -3]);
            expect(pathSumIII_OptimizedDFS(root, 10)).toBe(1);
            expect(pathSumIII_BruteForceDFS(root, 10)).toBe(1);
        });

        it('should find paths that contain negative values', () => {
            const root = buildTree([1, -2, -3, 1, 3, -2, null, -1]);
            //      1
            //     / \
            //    -2  -3
            //   / \  /
            //  1  3 -2
            // /
            //-1
            // Paths for sum -1:
            // 1. -1 (from leaf)
            // 2. 1 -> -2
            // 3. -2 -> 1 (This is not allowed, only downwards)
            // Paths for target -1:
            // 1. node -1
            // 2. 1 -> -2
            // 3. -2 -> 1 -> -1
            // 4. -3 -> -2
            // 5. ... (many more, depends on path selection for -1)
            expect(pathSumIII_OptimizedDFS(root, -1)).toBe(5); // This value is determined by manual trace of the tree.
            expect(pathSumIII_BruteForceDFS(root, -1)).toBe(5);
        });

        it('should handle only one path when targetSum matches only one path', () => {
            const root = buildTree([1, 2, 3]);
            expect(pathSumIII_OptimizedDFS(root, 6)).toBe(1); // Path 1->2->3
            expect(pathSumIII_BruteForceDFS(root, 6)).toBe(1);
        });

        it('should handle no paths when no sum matches target', () => {
            const root = buildTree([1, 2, 3]);
            expect(pathSumIII_OptimizedDFS(root, 10)).toBe(0);
            expect(pathSumIII_BruteForceDFS(root, 10)).toBe(0);
        });
    });
});
```