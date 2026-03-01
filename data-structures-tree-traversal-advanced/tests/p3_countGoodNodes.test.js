```javascript
const { buildTree } = require('../src/utils/treeBuilder');
const { countGoodNodes } = require('../src/problems/p3_countGoodNodes');

describe('Count Good Nodes in Binary Tree', () => {
    const testCases = [
        {
            name: 'Example 1: LC Example',
            tree: [3,1,4,3,null,1,5],
            //        3 (Good)
            //       / \
            //      1   4 (Good)
            //     /   / \
            //    3   1   5 (Good)
            //   (Good)
            expected: 4
        },
        {
            name: 'Example 2: All good nodes (increasing path)',
            tree: [1,2,3,4,5],
            //       1 (Good)
            //      / \
            //     2   3 (Good)
            //    / \
            //   4   5 (Good)
            // (Good)
            expected: 5
        },
        {
            name: 'Example 3: Only root is good',
            tree: [5,4,3,null,null,1,2],
            //        5 (Good)
            //       / \
            //      4   3
            //         / \
            //        1   2
            expected: 1
        },
        {
            name: 'Example 4: Skewed right with varying values',
            tree: [1,null,5,null,4,null,6,null,3],
            // 1 (Good)
            //  \
            //   5 (Good)
            //    \
            //     4 (Not good, 5>4)
            //      \
            //       6 (Good)
            //        \
            //         3 (Not good, 6>3)
            expected: 3
        },
        {
            name: 'Example 5: Skewed left with varying values',
            tree: [10,8,null,6,null,11],
            //         10 (Good)
            //        /
            //       8 (Not good, 10>8)
            //      /
            //     6 (Not good, 10>6)
            //      \
            //       11 (Good)
            expected: 3
        },
        {
            name: 'Example 6: Single node',
            tree: [7],
            expected: 1
        },
        {
            name: 'Example 7: Empty tree',
            tree: [],
            expected: 0
        },
        {
            name: 'Example 8: Null root',
            tree: null,
            expected: 0
        },
        {
            name: 'Example 9: All nodes same value',
            tree: [1,1,1,1,1,1,1],
            //       1 (Good)
            //      / \
            //     1   1 (Good)
            //    / \ / \
            //   1  1 1  1 (Good)
            expected: 7
        },
        {
            name: 'Example 10: Specific example from description with path 3->3->4',
            tree: [3,3,null,4,2],
            //      3 (Good)
            //     /
            //    3 (Good)
            //   / \
            //  4   2
            // (Good)
            expected: 3
        }
    ];

    testCases.forEach(testCase => {
        it(`should return the correct number of good nodes for ${testCase.name}`, () => {
            const root = buildTree(testCase.tree);
            expect(countGoodNodes(root)).toBe(testCase.expected);
        });
    });
});
```