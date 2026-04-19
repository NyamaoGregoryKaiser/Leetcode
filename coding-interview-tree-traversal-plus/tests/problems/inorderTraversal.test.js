```javascript
const { buildTreeFromArray } = require('../../src/utils/treeNode');
const { inorderTraversalRecursive, inorderTraversalIterative } = require('../../src/problems/inorderTraversal');

describe('Inorder Traversal', () => {
    // Test cases for recursive approach
    describe('inorderTraversalRecursive', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(inorderTraversalRecursive(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(inorderTraversalRecursive(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            //      1
            //     / \
            //    2   3
            const root = buildTreeFromArray([1, 2, 3]);
            expect(inorderTraversalRecursive(root)).toEqual([2, 1, 3]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            //        3
            //       / \
            //      9  20
            //        /  \
            //       15   7
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(inorderTraversalRecursive(root)).toEqual([9, 3, 15, 20, 7]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            //    1
            //   /
            //  2
            // /
            // 3
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(inorderTraversalRecursive(root)).toEqual([3, 2, 1]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            // 1
            //  \
            //   2
            //    \
            //     3
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(inorderTraversalRecursive(root)).toEqual([1, 2, 3]);
        });

        test('should handle a tree with only left children', () => {
            //    4
            //   /
            //  2
            // /
            // 1
            const root = buildTreeFromArray([4, 2, null, 1, null]);
            expect(inorderTraversalRecursive(root)).toEqual([1, 2, 4]);
        });

        test('should handle a tree with only right children', () => {
            // 1
            //  \
            //   2
            //    \
            //     4
            const root = buildTreeFromArray([1, null, 2, null, null, null, 4]);
            expect(inorderTraversalRecursive(root)).toEqual([1, 2, 4]);
        });
    });

    // Test cases for iterative approach
    describe('inorderTraversalIterative', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(inorderTraversalIterative(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(inorderTraversalIterative(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            const root = buildTreeFromArray([1, 2, 3]);
            expect(inorderTraversalIterative(root)).toEqual([2, 1, 3]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(inorderTraversalIterative(root)).toEqual([9, 3, 15, 20, 7]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(inorderTraversalIterative(root)).toEqual([3, 2, 1]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(inorderTraversalIterative(root)).toEqual([1, 2, 3]);
        });

        test('should handle a tree with only left children', () => {
            const root = buildTreeFromArray([4, 2, null, 1, null]);
            expect(inorderTraversalIterative(root)).toEqual([1, 2, 4]);
        });

        test('should handle a tree with only right children', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 4]);
            expect(inorderTraversalIterative(root)).toEqual([1, 2, 4]);
        });
    });
});
```