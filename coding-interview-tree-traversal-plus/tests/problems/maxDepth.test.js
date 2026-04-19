```javascript
const { buildTreeFromArray } = require('../../src/utils/treeNode');
const { maxDepthDFS, maxDepthBFS } = require('../../src/problems/maxDepth');

describe('Maximum Depth of Binary Tree', () => {
    // Test cases for DFS approach
    describe('maxDepthDFS', () => {
        test('should return 0 for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(maxDepthDFS(root)).toBe(0);
        });

        test('should return 1 for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(maxDepthDFS(root)).toBe(1);
        });

        test('should correctly calculate depth for a simple balanced tree', () => {
            //      1
            //     / \
            //    2   3
            const root = buildTreeFromArray([1, 2, 3]);
            expect(maxDepthDFS(root)).toBe(2);
        });

        test('should correctly calculate depth for a more complex balanced tree', () => {
            //        3
            //       / \
            //      9  20
            //        /  \
            //       15   7
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(maxDepthDFS(root)).toBe(3);
        });

        test('should correctly calculate depth for a left-skewed tree', () => {
            //    1
            //   /
            //  2
            // /
            // 3
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(maxDepthDFS(root)).toBe(3);
        });

        test('should correctly calculate depth for a right-skewed tree', () => {
            // 1
            //  \
            //   2
            //    \
            //     3
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(maxDepthDFS(root)).toBe(3);
        });

        test('should handle a tree with deep left and shallow right subtrees', () => {
            //        1
            //       / \
            //      2   3
            //     /
            //    4
            //   /
            //  5
            const root = buildTreeFromArray([1, 2, 3, 4, null, null, null, 5]);
            expect(maxDepthDFS(root)).toBe(4);
        });

        test('should handle a tree with deep right and shallow left subtrees', () => {
            //    1
            //   / \
            //  2   3
            //       \
            //        4
            //         \
            //          5
            const root = buildTreeFromArray([1, 2, 3, null, null, null, 4, null, null, null, null, null, null, null, 5]);
            expect(maxDepthDFS(root)).toBe(4);
        });
    });

    // Test cases for BFS approach
    describe('maxDepthBFS', () => {
        test('should return 0 for an empty tree', () => {
            const root = buildTreeFromArray([]);
            expect(maxDepthBFS(root)).toBe(0);
        });

        test('should return 1 for a single node tree', () => {
            const root = buildTreeFromArray([1]);
            expect(maxDepthBFS(root)).toBe(1);
        });

        test('should correctly calculate depth for a simple balanced tree', () => {
            const root = buildTreeFromArray([1, 2, 3]);
            expect(maxDepthBFS(root)).toBe(2);
        });

        test('should correctly calculate depth for a more complex balanced tree', () => {
            const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
            expect(maxDepthBFS(root)).toBe(3);
        });

        test('should correctly calculate depth for a left-skewed tree', () => {
            const root = buildTreeFromArray([1, 2, null, 3]);
            expect(maxDepthBFS(root)).toBe(3);
        });

        test('should correctly calculate depth for a right-skewed tree', () => {
            const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
            expect(maxDepthBFS(root)).toBe(3);
        });

        test('should handle a tree with deep left and shallow right subtrees', () => {
            const root = buildTreeFromArray([1, 2, 3, 4, null, null, null, 5]);
            expect(maxDepthBFS(root)).toBe(4);
        });

        test('should handle a tree with deep right and shallow left subtrees', () => {
            const root = buildTreeFromArray([1, 2, 3, null, null, null, 4, null, null, null, null, null, null, null, 5]);
            expect(maxDepthBFS(root)).toBe(4);
        });
    });
});
```