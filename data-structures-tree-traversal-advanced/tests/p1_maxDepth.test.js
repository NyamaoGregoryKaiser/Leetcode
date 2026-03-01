```javascript
const { buildTree } = require('../src/utils/treeBuilder');
const { maxDepthDFS, maxDepthBFS } = require('../src/problems/p1_maxDepth');

describe('Maximum Depth of Binary Tree', () => {
    // Test cases shared by both DFS and BFS approaches

    const testCases = [
        {
            name: 'Example 1: Balanced tree',
            tree: [3,9,20,null,null,15,7],
            expected: 3
        },
        {
            name: 'Example 2: Skewed tree (right)',
            tree: [1,null,2,null,3,null,4],
            expected: 4
        },
        {
            name: 'Example 3: Single node tree',
            tree: [1],
            expected: 1
        },
        {
            name: 'Example 4: Empty tree',
            tree: [],
            expected: 0
        },
        {
            name: 'Example 5: Left skewed tree',
            tree: [1,2,null,3,null,4,null],
            expected: 4
        },
        {
            name: 'Example 6: Complex tree',
            tree: [1,2,3,4,null,null,5,6,null,null,7],
            //       1
            //      / \
            //     2   3
            //    /     \
            //   4       5
            //  /         \
            // 6           7
            expected: 5
        },
        {
            name: 'Example 7: Another balanced tree',
            tree: [1,2,3,4,5,6,7],
            //       1
            //      / \
            //     2   3
            //    / \ / \
            //   4  5 6  7
            expected: 3
        },
    ];

    describe('maxDepthDFS (Recursive DFS)', () => {
        testCases.forEach(testCase => {
            it(`should return the correct maximum depth for ${testCase.name}`, () => {
                const root = buildTree(testCase.tree);
                expect(maxDepthDFS(root)).toBe(testCase.expected);
            });
        });

        it('should handle null root explicitly', () => {
            expect(maxDepthDFS(null)).toBe(0);
        });
    });

    describe('maxDepthBFS (Iterative BFS)', () => {
        testCases.forEach(testCase => {
            it(`should return the correct maximum depth for ${testCase.name}`, () => {
                const root = buildTree(testCase.tree);
                expect(maxDepthBFS(root)).toBe(testCase.expected);
            });
        });

        it('should handle null root explicitly', () => {
            expect(maxDepthBFS(null)).toBe(0);
        });
    });
});
```