```javascript
const { buildTreeFromArray } = require('../../src/utils/treeNode');
const {
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack
} = require('../../src/problems/postorderTraversal');

describe('Postorder Traversal', () => {
    // Test cases for recursive approach
    describe('postorderTraversalRecursive', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(postorderTraversalRecursive(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(postorderTraversalRecursive(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            //      1
            //     / \
            //    2   3
            const root = buildTreeFromArray([1, 2, 3]);
            expect(postorderTraversalRecursive(root)).toEqual([2, 3, 1]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            //        3
            //       / \
            //      9  20
            //        /  \
            //       15   7
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(postorderTraversalRecursive(root)).toEqual([9, 15, 7, 20, 3]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            //    1
            //   /
            //  2
            // /
            // 3
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(postorderTraversalRecursive(root)).toEqual([3, 2, 1]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            // 1
            //  \
            //   2
            //    \
            //     3
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(postorderTraversalRecursive(root)).toEqual([3, 2, 1]);
        });

        test('should handle a tree with only left children', () => {
            const root = buildTreeFromArray([4, 2, null, 1, null]);
            expect(postorderTraversalRecursive(root)).toEqual([1, 2, 4]);
        });

        test('should handle a tree with only right children', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 4]);
            expect(postorderTraversalRecursive(root)).toEqual([4, 2, 1]);
        });
    });

    // Test cases for iterative approach (two stacks)
    describe('postorderTraversalIterativeTwoStacks', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            const root = buildTreeFromArray([1, 2, 3]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([2, 3, 1]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([9, 15, 7, 20, 3]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([3, 2, 1]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(postorderTraversalIterativeTwoStacks(root)).toEqual([3, 2, 1]);
        });
    });

    // Test cases for iterative approach (one stack)
    describe('postorderTraversalIterativeOneStack', () => {
        test('should return an empty array for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([]);
        });

        test('should return the node value for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([1]);
        });

        test('should correctly traverse a simple balanced tree', () => {
            const root = buildTreeFromArray([1, 2, 3]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([2, 3, 1]);
        });

        test('should correctly traverse a more complex balanced tree', () => {
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([9, 15, 7, 20, 3]);
        });

        test('should correctly traverse a left-skewed tree', () => {
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([3, 2, 1]);
        });

        test('should correctly traverse a right-skewed tree', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(postorderTraversalIterativeOneStack(root)).toEqual([3, 2, 1]);
        });
    });
});
```