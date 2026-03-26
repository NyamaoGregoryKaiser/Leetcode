```typescript
/**
 * tests/treeTraversals.test.ts
 *
 * Test suite for the main tree traversal algorithms defined in `src/algorithms/treeTraversals.ts`.
 * Uses Jest for testing.
 */

import { TreeNode, buildTreeFromArray } from '../src/data-structures/TreeNode';
import {
    inorderTraversalRecursive,
    inorderTraversalIterative,
    preorderTraversalRecursive,
    preorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    levelOrderTraversal,
    zigzagLevelOrderTraversal,
    zigzagLevelOrderTraversalOptimized,
    maxDepthRecursive,
    maxDepthIterativeBFS,
    isSymmetricRecursive,
    isSymmetricIterative
} from '../src/algorithms/treeTraversals';

describe('Tree Traversals - DFS (Inorder, Preorder, Postorder)', () => {
    // Test tree:
    //      3
    //     / \
    //    9  20
    //       / \
    //      15  7
    const tree = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
    // Another tree:
    //      1
    //     / \
    //    2   3
    //   / \
    //  4   5
    const tree2 = buildTreeFromArray([1, 2, 3, 4, 5]);
    // Single node tree
    const singleNodeTree = buildTreeFromArray([1]);
    // Skewed left tree
    //    1
    //   /
    //  2
    // /
    //3
    const skewedLeftTree = buildTreeFromArray([1, 2, null, 3]);
    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    const skewedRightTree = buildTreeFromArray([1, null, 2, null, null, null, 3]);


    // --- Inorder Traversal (Left -> Root -> Right) ---
    describe('Inorder Traversal', () => {
        test('recursive should correctly traverse a balanced tree', () => {
            expect(inorderTraversalRecursive(tree)).toEqual([9, 3, 15, 20, 7]);
        });

        test('iterative should correctly traverse a balanced tree', () => {
            expect(inorderTraversalIterative(tree)).toEqual([9, 3, 15, 20, 7]);
        });

        test('recursive should handle an empty tree', () => {
            expect(inorderTraversalRecursive(null)).toEqual([]);
        });

        test('iterative should handle an empty tree', () => {
            expect(inorderTraversalIterative(null)).toEqual([]);
        });

        test('recursive should handle a single node tree', () => {
            expect(inorderTraversalRecursive(singleNodeTree)).toEqual([1]);
        });

        test('iterative should handle a single node tree', () => {
            expect(inorderTraversalIterative(singleNodeTree)).toEqual([1]);
        });

        test('recursive should handle a skewed left tree', () => {
            expect(inorderTraversalRecursive(skewedLeftTree)).toEqual([3, 2, 1]);
        });

        test('iterative should handle a skewed left tree', () => {
            expect(inorderTraversalIterative(skewedLeftTree)).toEqual([3, 2, 1]);
        });

        test('recursive should handle a skewed right tree', () => {
            expect(inorderTraversalRecursive(skewedRightTree)).toEqual([1, 2, 3]);
        });

        test('iterative should handle a skewed right tree', () => {
            expect(inorderTraversalIterative(skewedRightTree)).toEqual([1, 2, 3]);
        });

        test('recursive and iterative should produce the same result for tree2', () => {
            const recursiveResult = inorderTraversalRecursive(tree2);
            const iterativeResult = inorderTraversalIterative(tree2);
            expect(recursiveResult).toEqual(iterativeResult);
            expect(recursiveResult).toEqual([4, 2, 5, 1, 3]);
        });
    });

    // --- Preorder Traversal (Root -> Left -> Right) ---
    describe('Preorder Traversal', () => {
        test('recursive should correctly traverse a balanced tree', () => {
            expect(preorderTraversalRecursive(tree)).toEqual([3, 9, 20, 15, 7]);
        });

        test('iterative should correctly traverse a balanced tree', () => {
            expect(preorderTraversalIterative(tree)).toEqual([3, 9, 20, 15, 7]);
        });

        test('recursive should handle an empty tree', () => {
            expect(preorderTraversalRecursive(null)).toEqual([]);
        });

        test('iterative should handle an empty tree', () => {
            expect(preorderTraversalIterative(null)).toEqual([]);
        });

        test('recursive should handle a single node tree', () => {
            expect(preorderTraversalRecursive(singleNodeTree)).toEqual([1]);
        });

        test('iterative should handle a single node tree', () => {
            expect(preorderTraversalIterative(singleNodeTree)).toEqual([1]);
        });

        test('recursive and iterative should produce the same result for tree2', () => {
            const recursiveResult = preorderTraversalRecursive(tree2);
            const iterativeResult = preorderTraversalIterative(tree2);
            expect(recursiveResult).toEqual(iterativeResult);
            expect(recursiveResult).toEqual([1, 2, 4, 5, 3]);
        });
    });

    // --- Postorder Traversal (Left -> Right -> Root) ---
    describe('Postorder Traversal', () => {
        test('recursive should correctly traverse a balanced tree', () => {
            expect(postorderTraversalRecursive(tree)).toEqual([9, 15, 7, 20, 3]);
        });

        test('iterative (two stacks) should correctly traverse a balanced tree', () => {
            expect(postorderTraversalIterativeTwoStacks(tree)).toEqual([9, 15, 7, 20, 3]);
        });

        test('recursive should handle an empty tree', () => {
            expect(postorderTraversalRecursive(null)).toEqual([]);
        });

        test('iterative (two stacks) should handle an empty tree', () => {
            expect(postorderTraversalIterativeTwoStacks(null)).toEqual([]);
        });

        test('recursive should handle a single node tree', () => {
            expect(postorderTraversalRecursive(singleNodeTree)).toEqual([1]);
        });

        test('iterative (two stacks) should handle a single node tree', () => {
            expect(postorderTraversalIterativeTwoStacks(singleNodeTree)).toEqual([1]);
        });

        test('recursive and iterative should produce the same result for tree2', () => {
            const recursiveResult = postorderTraversalRecursive(tree2);
            const iterativeResult = postorderTraversalIterativeTwoStacks(tree2);
            expect(recursiveResult).toEqual(iterativeResult);
            expect(recursiveResult).toEqual([4, 5, 2, 3, 1]);
        });
    });
});

describe('Tree Traversals - BFS (Level Order, Zigzag Level Order)', () => {
    // Test tree:
    //      3
    //     / \
    //    9  20
    //       / \
    //      15  7
    const tree = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
    // Another tree:
    //      1
    //     / \
    //    2   3
    //   / \   \
    //  4   5   6
    const tree2 = buildTreeFromArray([1, 2, 3, 4, 5, null, 6]);
    // Single node tree
    const singleNodeTree = buildTreeFromArray([1]);
    // Empty tree
    const emptyTree = null;

    // --- Level Order Traversal ---
    describe('Level Order Traversal', () => {
        test('should correctly traverse a balanced tree', () => {
            expect(levelOrderTraversal(tree)).toEqual([[3], [9, 20], [15, 7]]);
        });

        test('should correctly traverse tree2', () => {
            expect(levelOrderTraversal(tree2)).toEqual([[1], [2, 3], [4, 5, 6]]);
        });

        test('should handle an empty tree', () => {
            expect(levelOrderTraversal(emptyTree)).toEqual([]);
        });

        test('should handle a single node tree', () => {
            expect(levelOrderTraversal(singleNodeTree)).toEqual([[1]]);
        });

        test('should handle a tree with missing nodes', () => {
            const t = buildTreeFromArray([1, null, 2, 3]); // 1, null, 2, null, null, 3
            //    1
            //     \
            //      2
            //     /
            //    3
            expect(levelOrderTraversal(t)).toEqual([[1], [2], [3]]);
        });
    });

    // --- Zigzag Level Order Traversal ---
    describe('Zigzag Level Order Traversal', () => {
        test('should correctly traverse a balanced tree (zigzag)', () => {
            // Level 0: [3]
            // Level 1: [20, 9] (right to left)
            // Level 2: [15, 7] (left to right)
            expect(zigzagLevelOrderTraversal(tree)).toEqual([[3], [20, 9], [15, 7]]);
            expect(zigzagLevelOrderTraversalOptimized(tree)).toEqual([[3], [20, 9], [15, 7]]);
        });

        test('should correctly traverse tree2 (zigzag)', () => {
            // Level 0: [1]
            // Level 1: [3, 2]
            // Level 2: [4, 5, 6]
            expect(zigzagLevelOrderTraversal(tree2)).toEqual([[1], [3, 2], [4, 5, 6]]);
            expect(zigzagLevelOrderTraversalOptimized(tree2)).toEqual([[1], [3, 2], [4, 5, 6]]);
        });

        test('should handle an empty tree', () => {
            expect(zigzagLevelOrderTraversal(emptyTree)).toEqual([]);
            expect(zigzagLevelOrderTraversalOptimized(emptyTree)).toEqual([]);
        });

        test('should handle a single node tree', () => {
            expect(zigzagLevelOrderTraversal(singleNodeTree)).toEqual([[1]]);
            expect(zigzagLevelOrderTraversalOptimized(singleNodeTree)).toEqual([[1]]);
        });

        test('should handle a tree with only left children (zigzag)', () => {
            const t = buildTreeFromArray([1, 2, null, 3, null, null, null, 4]);
            //       1
            //      /
            //     2
            //    /
            //   3
            //  /
            // 4
            expect(zigzagLevelOrderTraversal(t)).toEqual([[1], [2], [3], [4]]);
            expect(zigzagLevelOrderTraversalOptimized(t)).toEqual([[1], [2], [3], [4]]);
        });

        test('should handle a tree with only right children (zigzag)', () => {
            const t = buildTreeFromArray([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]);
            // 1
            //  \
            //   2
            //    \
            //     3
            //      \
            //       4
            expect(zigzagLevelOrderTraversal(t)).toEqual([[1], [2], [3], [4]]);
            expect(zigzagLevelOrderTraversalOptimized(t)).toEqual([[1], [2], [3], [4]]);
        });
    });
});

describe('Tree Problems - Max Depth and Symmetric Tree', () => {
    // Test tree:
    //      3
    //     / \
    //    9  20
    //       / \
    //      15  7
    const tree = buildTreeFromArray([3, 9, 20, null, null, 15, 7]); // Depth 3
    // Another tree:
    //      1
    //     / \
    //    2   3
    //   / \   \
    //  4   5   6
    const tree2 = buildTreeFromArray([1, 2, 3, 4, 5, null, 6]); // Depth 3 (1->2->4 or 1->3->6)
    // Single node tree
    const singleNodeTree = buildTreeFromArray([1]); // Depth 1
    // Empty tree
    const emptyTree = null;
    // Skewed tree
    const skewedTree = buildTreeFromArray([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4]); // Depth 4

    // --- Max Depth ---
    describe('Max Depth of Binary Tree', () => {
        test('recursive should correctly calculate depth for a balanced tree', () => {
            expect(maxDepthRecursive(tree)).toBe(3);
        });

        test('iterative BFS should correctly calculate depth for a balanced tree', () => {
            expect(maxDepthIterativeBFS(tree)).toBe(3);
        });

        test('recursive should correctly calculate depth for tree2', () => {
            expect(maxDepthRecursive(tree2)).toBe(3);
        });

        test('iterative BFS should correctly calculate depth for tree2', () => {
            expect(maxDepthIterativeBFS(tree2)).toBe(3);
        });

        test('recursive should handle an empty tree', () => {
            expect(maxDepthRecursive(emptyTree)).toBe(0);
        });

        test('iterative BFS should handle an empty tree', () => {
            expect(maxDepthIterativeBFS(emptyTree)).toBe(0);
        });

        test('recursive should handle a single node tree', () => {
            expect(maxDepthRecursive(singleNodeTree)).toBe(1);
        });

        test('iterative BFS should handle a single node tree', () => {
            expect(maxDepthIterativeBFS(singleNodeTree)).toBe(1);
        });

        test('recursive should handle a skewed tree', () => {
            expect(maxDepthRecursive(skewedTree)).toBe(4);
        });

        test('iterative BFS should handle a skewed tree', () => {
            expect(maxDepthIterativeBFS(skewedTree)).toBe(4);
        });
    });

    // --- Symmetric Tree ---
    describe('Symmetric Tree', () => {
        // Symmetric tree:
        //    1
        //   / \
        //  2   2
        // / \ / \
        //3  4 4  3
        const symmetricTree = buildTreeFromArray([1, 2, 2, 3, 4, 4, 3]);

        // Non-symmetric tree (different values):
        //    1
        //   / \
        //  2   2
        //   \   \
        //    3   3
        const nonSymmetricVal = buildTreeFromArray([1, 2, 2, null, 3, null, 3]);

        // Non-symmetric tree (different structure):
        //    1
        //   / \
        //  2   2
        //   \
        //    3
        const nonSymmetricStruct = buildTreeFromArray([1, 2, 2, null, 3, null, null]);

        // Symmetric single node
        const symmetricSingle = buildTreeFromArray([1]);
        // Symmetric empty
        const symmetricEmpty = null;
        // Symmetric with nulls at same positions
        //    1
        //   / \
        //  2   2
        // /     \
        //3       3
        const symmetricWithNulls = buildTreeFromArray([1, 2, 2, 3, null, null, 3]);


        test('recursive should return true for a perfectly symmetric tree', () => {
            expect(isSymmetricRecursive(symmetricTree)).toBe(true);
        });

        test('iterative should return true for a perfectly symmetric tree', () => {
            expect(isSymmetricIterative(symmetricTree)).toBe(true);
        });

        test('recursive should return false for a non-symmetric tree (values)', () => {
            expect(isSymmetricRecursive(nonSymmetricVal)).toBe(false);
        });

        test('iterative should return false for a non-symmetric tree (values)', () => {
            expect(isSymmetricIterative(nonSymmetricVal)).toBe(false);
        });

        test('recursive should return false for a non-symmetric tree (structure)', () => {
            expect(isSymmetricRecursive(nonSymmetricStruct)).toBe(false);
        });

        test('iterative should return false for a non-symmetric tree (structure)', () => {
            expect(isSymmetricIterative(nonSymmetricStruct)).toBe(false);
        });

        test('recursive should return true for a single node tree', () => {
            expect(isSymmetricRecursive(symmetricSingle)).toBe(true);
        });

        test('iterative should return true for a single node tree', () => {
            expect(isSymmetricIterative(symmetricSingle)).toBe(true);
        });

        test('recursive should return true for an empty tree', () => {
            expect(isSymmetricRecursive(symmetricEmpty)).toBe(true);
        });

        test('iterative should return true for an empty tree', () => {
            expect(isSymmetricIterative(symmetricEmpty)).toBe(true);
        });

        test('recursive should return true for symmetric tree with nulls', () => {
            expect(isSymmetricRecursive(symmetricWithNulls)).toBe(true);
        });

        test('iterative should return true for symmetric tree with nulls', () => {
            expect(isSymmetricIterative(symmetricWithNulls)).toBe(true);
        });

        test('non-symmetric example: [1,2,2,null,3,null,3]', () => {
            const t = buildTreeFromArray([1,2,2,null,3,null,3]);
            //    1
            //   / \
            //  2   2
            //   \   \
            //    3   3
            // This is symmetric as 2's right child (3) mirrors 2's left child (3) on the other side.
            // Oh, wait, the example is [1,2,2,null,3,null,3]
            // Left subtree of 1: Node 2, right child 3.
            // Right subtree of 1: Node 2, right child 3.
            // It should be: Left subtree's right child (3) compared to Right subtree's left child (null)
            // Left subtree's left child (null) compared to Right subtree's right child (3)
            // So, [1,2,2,null,3,null,3] is indeed NOT symmetric.
            expect(isSymmetricRecursive(t)).toBe(false);
            expect(isSymmetricIterative(t)).toBe(false);
        });

        test('Symmetric case: [1,2,2,3,null,null,3]', () => {
             //    1
             //   / \
             //  2   2
             // /     \
             //3       3
            const t = buildTreeFromArray([1,2,2,3,null,null,3]);
            expect(isSymmetricRecursive(t)).toBe(true);
            expect(isSymmetricIterative(t)).toBe(true);
        });
    });
});
```