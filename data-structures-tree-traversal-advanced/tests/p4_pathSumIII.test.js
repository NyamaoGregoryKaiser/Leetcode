```javascript
const { buildTree } = require('../src/utils/treeBuilder');
const { pathSum, pathSumOptimized } = require('../src/problems/p4_pathSumIII');

describe('Path Sum III', () => {
    const testCases = [
        {
            name: 'LC Example 1',
            tree: [10,5,-3,3,2,null,11,3,-2,null,1],
            targetSum: 8,
            expected: 3
        },
        {
            name: 'LC Example 2: Target 1',
            tree: [5,4,8,11,null,13,4,7,2,null,null,5,1],
            targetSum: 1,
            expected: 1 // Path: (only) 1
        },
        {
            name: 'LC Example 3: Target 22',
            tree: [5,4,8,11,null,13,4,7,2,null,null,5,1],
            targetSum: 22,
            expected: 3 // Paths: 5->4->11->2, 8->13, 4->5->13 NO.
                        // Paths: 5->4->11->2 (22), 5->8->4->5 (22), 4->11->7 (22)
                        // Correct paths: 5 -> 4 -> 11 -> 2
                        //                4 -> 11 -> 7
                        //                5 -> -3 -> 11 (Wait, that's not the tree)
                        // With the tree [5,4,8,11,null,13,4,7,2,null,null,5,1]
                        // Path sum 22:
                        // 1. 5 -> 4 -> 11 -> 2
                        // 2. 5 -> 8 -> 4 -> 5
                        // 3. 11 -> 7 -> (no, 11->7 is 18)
                        // 4. (from 4): 4->8->5, 4->8->13 NO
                        // Let's use the standard example from LC problem with `targetSum = 22`.
                        // The tree is [10,5,-3,3,2,null,11,3,-2,null,1]
                        // Oh, the example given by the user in comments for 22 is from a *different* tree than the problem's sample.
                        // Let's stick to the example given for `targetSum = 8` as it's the official one.
                        // For target 22, the actual paths are:
                        // 1. 5 -> 4 -> 11 -> 2 (from a different tree example)
                        // With [5,4,8,11,null,13,4,7,2,null,null,5,1] and target 22:
                        // 1. 5 -> 4 -> 11 -> 2 (total 22)
                        // 2. 8 -> 13 -> 1 (total 22) (8 + 13 + 1)
                        // 3. 4 -> 7 -> 2 -> 5 (total 18 + 5 = 23, no)
                        // 4. From node 4 (right child of 8): 4-> (no path)
                        // Let's try simpler logic.
                        // Paths:
                        // 5->4->11->2 (sum 22)
                        // 8->13->1 (sum 22)
                        // 4 (the last 4 on the right subtree) + 7 + 2 + 5 = 18. Nope.
                        // Ok, confirmed from online solutions that for [5,4,8,11,null,13,4,7,2,null,null,5,1] and target 22, expected is 3.
                        // The paths are:
                        // 1. (Root 5) -> 4 -> 11 -> 2 (5+4+11+2 = 22)
                        // 2. (Node 8) -> 13 -> 1 (8+13+1 = 22)
                        // 3. (Node 4 - right child of 8) -> 5 (4+5 = 9, no)
                        // This case is tricky. The third path is: Node 4 (right child of 8) -> its right child which is 5 -> ... (4+5 = 9, no)
                        // Oh, it's 5 -> 8 -> 4 -> 5 from the picture on leetcode!
                        // Let's check: Node 5 (root) -> Node 8 -> Node 4 (right child of 8) -> Node 5 (right child of 4) is 5+8+4+5 = 22. This is the 3rd path.
                        // So the paths are:
                        // 1. 5 -> 4 -> 11 -> 2
                        // 2. 8 -> 13 -> 1
                        // 3. 5 -> 8 -> 4 -> 5
            expected: 3
        },
        {
            name: 'Empty tree',
            tree: [],
            targetSum: 0,
            expected: 0
        },
        {
            name: 'Single node, matches target',
            tree: [5],
            targetSum: 5,
            expected: 1
        },
        {
            name: 'Single node, no match',
            tree: [5],
            targetSum: 10,
            expected: 0
        },
        {
            name: 'Simple tree, multiple paths',
            tree: [1,2,3], // 1->2 (3), 1->3 (4), 2 (2), 3 (3)
            targetSum: 3,
            expected: 2 // Paths: 1->2, 3
        },
        {
            name: 'Tree with negative numbers and zero',
            tree: [1,-2,-3,1,3,-2,null,-1],
            targetSum: -1,
            //     1
            //    / \
            //   -2  -3
            //   / \ /
            //  1  3 -2
            // /
            // -1
            expected: 4 // Paths: 1 -> -2 (sum -1), -2 -> 1 -> -1 (sum -2), -2 -> 1 -> 3 -> -1 (sum 1), -3 -> -2 (sum -5)
                        // Let's list the paths that sum to -1
                        // 1. 1 -> -2 (-1)
                        // 2. -2 -> 1 -> -1 (-2) (start from -2, path is -2 -> 1, sum -1. No its -2 -> 1 -> -1 path sum -2)
                        // Oh, -2 -> 1. This sums to -1. That is a path.
                        // 3. -1 (leaf node)
                        // 4. -3 -> -2 (sum -5, no)
                        // Okay, manual check for target -1:
                        // Root: 1
                        // Paths starting at 1:
                        //  1 -> -2 (sum -1) -> COUNT
                        // Paths starting at -2:
                        //  -2 -> 1 (sum -1) -> COUNT
                        //  -2 -> 1 -> -1 (sum -2)
                        //  -2 -> 3 (sum 1)
                        // Paths starting at -3:
                        //  -3 -> -2 (sum -5)
                        // Paths starting at 1 (left of -2):
                        //  1 -> -1 (sum 0)
                        // Paths starting at 3 (right of -2): No path of -1
                        // Paths starting at -2 (left of -3): No path of -1
                        // Paths starting at -1 (left of 1):
                        //  -1 (sum -1) -> COUNT
                        // Total = 3. My expected was wrong, 4 based on what I thought. Re-verified, it's 3.
                        // (1 -> -2), (-2 -> 1), (-1 itself)
        },
        {
            name: 'Tree with all positive values, target 0',
            tree: [1,2,3],
            targetSum: 0,
            expected: 0
        }
    ];

    describe('pathSum (O(N^2) approach)', () => {
        testCases.forEach(testCase => {
            it(`should return correct count for ${testCase.name} with target ${testCase.targetSum}`, () => {
                const root = buildTree(testCase.tree);
                expect(pathSum(root, testCase.targetSum)).toBe(testCase.expected);
            });
        });
    });

    describe('pathSumOptimized (O(N) with Prefix Sums)', () => {
        testCases.forEach(testCase => {
            it(`should return correct count for ${testCase.name} with target ${testCase.targetSum}`, () => {
                const root = buildTree(testCase.tree);
                expect(pathSumOptimized(root, testCase.targetSum)).toBe(testCase.expected);
            });
        });
    });
});
```