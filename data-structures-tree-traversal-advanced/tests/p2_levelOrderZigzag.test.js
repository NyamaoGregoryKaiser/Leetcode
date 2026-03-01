```javascript
const { buildTree } = require('../src/utils/treeBuilder');
const { zigzagLevelOrder } = require('../src/problems/p2_levelOrderZigzag');

describe('Binary Tree Zigzag Level Order Traversal', () => {
    const testCases = [
        {
            name: 'Example 1: Balanced tree',
            tree: [3,9,20,null,null,15,7],
            expected: [[3], [20, 9], [15, 7]]
        },
        {
            name: 'Example 2: Skewed tree (right)',
            tree: [1,null,2,3],
            //   1
            //    \
            //     2
            //    /
            //   3
            expected: [[1], [2], [3]]
        },
        {
            name: 'Example 3: Single node tree',
            tree: [1],
            expected: [[1]]
        },
        {
            name: 'Example 4: Empty tree',
            tree: [],
            expected: []
        },
        {
            name: 'Example 5: Null root',
            tree: null,
            expected: []
        },
        {
            name: 'Example 6: Full binary tree (4 levels)',
            tree: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            //        1
            //      /   \
            //     2     3
            //    / \   / \
            //   4   5 6   7
            //  /|\ /|\ /|\ /|\
            // 8 9 ...
            expected: [
                [1],
                [3, 2],
                [4, 5, 6, 7],
                [15, 14, 13, 12, 11, 10, 9, 8]
            ]
        },
        {
            name: 'Example 7: Complex tree with nulls',
            tree: [1,2,3,4,null,null,5,6,null,null,7],
            //       1
            //      / \
            //     2   3
            //    /     \
            //   4       5
            //  /         \
            // 6           7
            expected: [[1], [3,2], [4,5], [7,6]]
        }
    ];

    testCases.forEach(testCase => {
        it(`should return the correct zigzag level order for ${testCase.name}`, () => {
            const root = buildTree(testCase.tree);
            expect(zigzagLevelOrder(root)).toEqual(testCase.expected);
        });
    });

    it('should handle an empty array representation of a tree', () => {
        const root = buildTree([]);
        expect(zigzagLevelOrder(root)).toEqual([]);
    });
});
```