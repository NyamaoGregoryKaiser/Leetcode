```javascript
const { buildTreeFromArray } = require('../../src/utils/treeNode');
const { preorderTraversalRecursive, preorderTraversalIterative } = require('../../src/problems/preorderTraversal');

describe('Preorder Traversal', () => {
    // Test cases for recursive approach
    describe('preorderTraversalRecursive', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(preorderTraversalRecursive(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(preorderTraversalRecursive(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            //      1
            //     / \
            //    2   3
            const root = buildTreeFromArray([1, 2, 3]);
            expect(preorderTraversalRecursive(root)).toEqual([1, 2, 3]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            //        3
            //       / \
            //      9  20
            //        /  \
            //       15   7
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(preorderTraversalRecursive(root)).toEqual([3, 9, 20, 15, 7]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            //    1
            //   /
            //  2
            // /
            // 3
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(preorderTraversalRecursive(root)).toEqual([1, 2, 3]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            // 1
            //  \
            //   2
            //    \
            //     3
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(preorderTraversalRecursive(root)).toEqual([1, 2, 3]);
        });

        test('should handle a tree with only left children', () => {
            const root = buildTreeFromArray([4, 2, null, 1, null]);
            expect(preorderTraversalRecursive(root)).toEqual([4, 2, 1]);
        });

        test('should handle a tree with only right children', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 4]);
            expect(preorderTraversalRecursive(root)).toEqual([1, 2, 4]);
        });
    });

    // Test cases for iterative approach
    describe('preorderTraversalIterative', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(preorderTraversalIterative(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(preorderTraversalIterative(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            const root = buildTreeFromArray([1, 2, 3]);
            expect(preorderTraversalIterative(root)).toEqual([1, 2, 3]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(preorderTraversalIterative(root)).toEqual([3, 9, 20, 15, 7]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(preorderTraversalIterative(root)).toEqual([1, 2, 3]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(preorderTraversalIterative(root)).toEqual([1, 2, 3]);
        });

        test('should handle a tree with only left children', () => {
            const root = buildTreeFromArray([4, 2, null, 1, null]);
            expect(preorderTraversalIterative(root)).toEqual([4, 2, 1]);
        });

        test('should handle a tree with only right children', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 4]);
            expect(preorderTraversalIterative(root)).toEqual([1, 2, 4]);
        });
    });
});
```