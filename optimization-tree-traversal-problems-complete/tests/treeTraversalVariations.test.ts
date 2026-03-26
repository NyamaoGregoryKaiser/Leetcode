```typescript
/**
 * tests/treeTraversalVariations.test.ts
 *
 * Test suite for advanced tree traversal algorithms defined in `src/algorithms/treeTraversalVariations.ts`.
 * Uses Jest for testing.
 */

import { TreeNode, buildTreeFromArray } from '../src/data-structures/TreeNode';
import {
    morrisInorderTraversal,
    postorderTraversalIterativeSingleStack,
    postorderTraversalIterativeSingleStackAlternative
} from '../src/algorithms/treeTraversalVariations';

describe('Advanced Tree Traversals', () => {
    // Test tree:
    //      3
    //     / \
    //    9  20
    //       / \
    //      15  7
    const tree = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
    // Expected inorder: [9, 3, 15, 20, 7]
    // Expected postorder: [9, 15, 7, 20, 3]

    // Another tree:
    //      1
    //     / \
    //    2   3
    //   / \
    //  4   5
    const tree2 = buildTreeFromArray([1, 2, 3, 4, 5]);
    // Expected inorder: [4, 2, 5, 1, 3]
    // Expected postorder: [4, 5, 2, 3, 1]

    // Single node tree
    const singleNodeTree = buildTreeFromArray([1]);
    // Expected inorder: [1]
    // Expected postorder: [1]

    // Empty tree
    const emptyTree = null;
    // Expected inorder: []
    // Expected postorder: []

    // Skewed left tree
    //    1
    //   /
    //  2
    // /
    //3
    const skewedLeftTree = buildTreeFromArray([1, 2, null, 3]);
    // Expected inorder: [3, 2, 1]
    // Expected postorder: [3, 2, 1]

    // Skewed right tree
    // 1
    //  \
    //   2
    //    \
    //     3
    const skewedRightTree = buildTreeFromArray([1, null, 2, null, null, null, 3]);
    // Expected inorder: [1, 2, 3]
    // Expected postorder: [3, 2, 1]


    // --- Morris Inorder Traversal ---
    describe('Morris Inorder Traversal (O(1) Space)', () => {
        test('should correctly traverse a balanced tree', () => {
            expect(morrisInorderTraversal(tree)).toEqual([9, 3, 15, 20, 7]);
        });

        test('should correctly traverse tree2', () => {
            expect(morrisInorderTraversal(tree2)).toEqual([4, 2, 5, 1, 3]);
        });

        test('should handle an empty tree', () => {
            expect(morrisInorderTraversal(emptyTree)).toEqual([]);
        });

        test('should handle a single node tree', () => {
            expect(morrisInorderTraversal(singleNodeTree)).toEqual([1]);
        });

        test('should handle a skewed left tree', () => {
            expect(morrisInorderTraversal(skewedLeftTree)).toEqual([3, 2, 1]);
        });

        test('should handle a skewed right tree', () => {
            expect(morrisInorderTraversal(skewedRightTree)).toEqual([1, 2, 3]);
        });
    });

    // --- Iterative Postorder Traversal (Single Stack) ---
    describe('Iterative Postorder Traversal (Single Stack)', () => {
        test('should correctly traverse a balanced tree (last visited approach)', () => {
            expect(postorderTraversalIterativeSingleStack(tree)).toEqual([9, 15, 7, 20, 3]);
        });

        test('should correctly traverse tree2 (last visited approach)', () => {
            expect(postorderTraversalIterativeSingleStack(tree2)).toEqual([4, 5, 2, 3, 1]);
        });

        test('should handle an empty tree (last visited approach)', () => {
            expect(postorderTraversalIterativeSingleStack(emptyTree)).toEqual([]);
        });

        test('should handle a single node tree (last visited approach)', () => {
            expect(postorderTraversalIterativeSingleStack(singleNodeTree)).toEqual([1]);
        });

        test('should handle a skewed left tree (last visited approach)', () => {
            expect(postorderTraversalIterativeSingleStack(skewedLeftTree)).toEqual([3, 2, 1]);
        });

        test('should handle a skewed right tree (last visited approach)', () => {
            expect(postorderTraversalIterativeSingleStack(skewedRightTree)).toEqual([3, 2, 1]);
        });

        test('should correctly traverse a balanced tree (alternative approach)', () => {
            expect(postorderTraversalIterativeSingleStackAlternative(tree)).toEqual([9, 15, 7, 20, 3]);
        });

        test('should correctly traverse tree2 (alternative approach)', () => {
            expect(postorderTraversalIterativeSingleStackAlternative(tree2)).toEqual([4, 5, 2, 3, 1]);
        });

        test('should handle an empty tree (alternative approach)', () => {
            expect(postorderTraversalIterativeSingleStackAlternative(emptyTree)).toEqual([]);
        });

        test('should handle a single node tree (alternative approach)', () => {
            expect(postorderTraversalIterativeSingleStackAlternative(singleNodeTree)).toEqual([1]);
        });

        test('should handle a skewed left tree (alternative approach)', () => {
            expect(postorderTraversalIterativeSingleStackAlternative(skewedLeftTree)).toEqual([3, 2, 1]);
        });

        test('should handle a skewed right tree (alternative approach)', () => {
            expect(postorderTraversalIterativeSingleStackAlternative(skewedRightTree)).toEqual([3, 2, 1]);
        });
    });
});
```