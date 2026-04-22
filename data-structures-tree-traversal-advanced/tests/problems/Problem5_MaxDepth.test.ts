```typescript
import { TreeNode } from '../../src/data-structures/TreeNode';
import { buildTreeFromArray } from '../../src/utils/treeUtils';
import {
    maxDepthDFS_Recursive,
    maxDepthBFS_Iterative
} from '../../src/problems/Problem5_MaxDepth';

describe('Problem 5: Maximum Depth of Binary Tree', () => {

    // Test case 1: General binary tree
    //      3
    //     / \
    //    9  20
    //      /  \
    //     15   7
    // Depth: 3 (path 3->20->15 or 3->20->7)
    const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
    const expectedDepth1 = 3;

    // Test case 2: Single node tree
    //      1
    // Depth: 1
    const tree2 = buildTreeFromArray([1]);
    const expectedDepth2 = 1;

    // Test case 3: Empty tree
    // Depth: 0
    const tree3 = buildTreeFromArray([]);
    const expectedDepth3 = 0;

    // Test case 4: Left-skewed tree
    //      1
    //     /
    //    2
    //   /
    //  3
    // Depth: 3
    const tree4 = buildTreeFromArray([1, 2, null, 3, null]);
    const expectedDepth4 = 3;

    // Test case 5: Right-skewed tree
    //  1
    //   \
    //    2
    //     \
    //      3
    // Depth: 3
    const tree5 = buildTreeFromArray([1, null, 2, null, null, null, 3]);
    const expectedDepth5 = 3;

    // Test case 6: Complete binary tree
    //       1
    //      / \
    //     2   3
    //    / \ / \
    //   4  5 6  7
    // Depth: 3
    const tree6 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
    const expectedDepth6 = 3;

    // Test case 7: Tree with only a left child at root
    //      1
    //     /
    //    2
    // Depth: 2
    const tree7 = buildTreeFromArray([1, 2]);
    const expectedDepth7 = 2;

    // Test case 8: Tree with only a right child at root
    //      1
    //       \
    //        2
    // Depth: 2
    const tree8 = buildTreeFromArray([1, null, 2]);
    const expectedDepth8 = 2;

    // Test case 9: Deeper, unbalanced tree
    //          1
    //         / \
    //        2   3
    //       / \
    //      4   5
    //     /
    //    6
    //   /
    //  7
    // Depth: 5 (path 1->2->4->6->7)
    const tree9 = buildTreeFromArray([1, 2, 3, 4, 5, null, null, 6, null, null, null, null, null, 7, null]);
    const expectedDepth9 = 5;

    describe('maxDepthDFS_Recursive', () => {
        test('should correctly calculate max depth for a general tree', () => {
            expect(maxDepthDFS_Recursive(tree1)).toBe(expectedDepth1);
        });

        test('should return 1 for a single node tree', () => {
            expect(maxDepthDFS_Recursive(tree2)).toBe(expectedDepth2);
        });

        test('should return 0 for an empty tree', () => {
            expect(maxDepthDFS_Recursive(tree3)).toBe(expectedDepth3);
        });

        test('should correctly calculate max depth for a left-skewed tree', () => {
            expect(maxDepthDFS_Recursive(tree4)).toBe(expectedDepth4);
        });

        test('should correctly calculate max depth for a right-skewed tree', () => {
            expect(maxDepthDFS_Recursive(tree5)).toBe(expectedDepth5);
        });

        test('should correctly calculate max depth for a complete binary tree', () => {
            expect(maxDepthDFS_Recursive(tree6)).toBe(expectedDepth6);
        });

        test('should handle a tree with only a left child', () => {
            expect(maxDepthDFS_Recursive(tree7)).toBe(expectedDepth7);
        });

        test('should handle a tree with only a right child', () => {
            expect(maxDepthDFS_Recursive(tree8)).toBe(expectedDepth8);
        });

        test('should handle a deeper, unbalanced tree', () => {
            expect(maxDepthDFS_Recursive(tree9)).toBe(expectedDepth9);
        });
    });

    describe('maxDepthBFS_Iterative', () => {
        test('should correctly calculate max depth for a general tree', () => {
            expect(maxDepthBFS_Iterative(tree1)).toBe(expectedDepth1);
        });

        test('should return 1 for a single node tree', () => {
            expect(maxDepthBFS_Iterative(tree2)).toBe(expectedDepth2);
        });

        test('should return 0 for an empty tree', () => {
            expect(maxDepthBFS_Iterative(tree3)).toBe(expectedDepth3);
        });

        test('should correctly calculate max depth for a left-skewed tree', () => {
            expect(maxDepthBFS_Iterative(tree4)).toBe(expectedDepth4);
        });

        test('should correctly calculate max depth for a right-skewed tree', () => {
            expect(maxDepthBFS_Iterative(tree5)).toBe(expectedDepth5);
        });

        test('should correctly calculate max depth for a complete binary tree', () => {
            expect(maxDepthBFS_Iterative(tree6)).toBe(expectedDepth6);
        });

        test('should handle a tree with only a left child', () => {
            expect(maxDepthBFS_Iterative(tree7)).toBe(expectedDepth7);
        });

        test('should handle a tree with only a right child', () => {
            expect(maxDepthBFS_Iterative(tree8)).toBe(expectedDepth8);
        });

        test('should handle a deeper, unbalanced tree', () => {
            expect(maxDepthBFS_Iterative(tree9)).toBe(expectedDepth9);
        });
    });
});
```