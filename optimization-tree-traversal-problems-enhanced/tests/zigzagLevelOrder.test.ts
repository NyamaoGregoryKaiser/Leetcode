/**
 * @fileoverview Unit tests for the ZigzagLevelOrder class in `src/problems/zigzagLevelOrder.ts`.
 * This file tests the Zigzag Level Order Traversal implementation.
 */

import { TreeNode, buildTreeFromArray } from '../src/utils/treeNode';
import { ZigzagLevelOrder, IZigzagLevelOrder } from '../src/problems/zigzagLevelOrder';

describe('ZigzagLevelOrder', () => {
    let zigzagLevelOrder: IZigzagLevelOrder;

    beforeEach(() => {
        zigzagLevelOrder = new ZigzagLevelOrder();
    });

    // Helper function to create test trees
    const createTestTree = (arr: (number | null)[]): TreeNode | null => buildTreeFromArray(arr);

    // Test cases for different tree structures
    const testCases = [
        {
            name: 'Empty tree',
            treeArray: [],
            root: null,
            expected: []
        },
        {
            name: 'Single node tree',
            treeArray: [1],
            root: createTestTree([1]),
            expected: [[1]]
        },
        {
            name: 'Simple tree (Root, Left, Right)',
            treeArray: [1, 2, 3], //     1
                                 //    / \
                                 //   2   3
            root: createTestTree([1, 2, 3]),
            expected: [[1], [3, 2]] // Level 0: [1] (L-R), Level 1: [3, 2] (R-L)
        },
        {
            name: 'Full binary tree (3 levels)',
            treeArray: [1, 2, 3, 4, 5, 6, 7],
            //      1
            //     / \
            //    2   3
            //   / \ / \
            //  4  5 6  7
            root: createTestTree([1, 2, 3, 4, 5, 6, 7]),
            expected: [[1], [3, 2], [4, 5, 6, 7]] // L0: [1], L1: [3,2], L2: [4,5,6,7]
        },
        {
            name: 'Left-skewed tree',
            treeArray: [1, 2, null, 3, null, 4, null],
            //     1
            //    /
            //   2
            //  /
            // 3
            // /
            //4
            root: createTestTree([1, 2, null, 3, null, null, null, 4]),
            expected: [[1], [2], [3], [4]] // All levels have 1 node, so direction doesn't change visible order
        },
        {
            name: 'Right-skewed tree',
            treeArray: [1, null, 2, null, null, null, 3],
            // 1
            //  \
            //   2
            //    \
            //     3
            root: createTestTree([1, null, 2, null, null, null, 3]),
            expected: [[1], [2], [3]] // All levels have 1 node
        },
        {
            name: 'LeetCode example tree',
            treeArray: [3, 9, 20, null, null, 15, 7],
            //     3
            //    / \
            //   9  20
            //     /  \
            //    15   7
            root: createTestTree([3, 9, 20, null, null, 15, 7]),
            expected: [[3], [20, 9], [15, 7]] // L0: [3], L1: [20,9], L2: [15,7]
        },
        {
            name: 'Another tree with internal nulls',
            treeArray: [1, 2, 3, 4, null, null, 5],
            //      1
            //     / \
            //    2   3
            //   /     \
            //  4       5
            root: createTestTree([1, 2, 3, 4, null, null, 5]),
            expected: [[1], [3, 2], [4, 5]] // L0: [1], L1: [3,2], L2: [4,5]
        },
        {
            name: 'Tree with uneven levels',
            treeArray: [1,2,3,4,null,null,5,6,7],
            //        1
            //       / \
            //      2   3
            //     /     \
            //    4       5
            //   / \
            //  6   7
            root: createTestTree([1,2,3,4,null,null,5,6,7]),
            expected: [[1], [3,2], [4,5], [7,6]] // L0: [1], L1: [3,2], L2: [4,5], L3: [7,6]
        }
    ];

    testCases.forEach(({ name, root, expected }) => {
        it(`should correctly perform zigzag level order traversal for: ${name}`, () => {
            expect(zigzagLevelOrder.zigzagLevelOrder(root)).toEqual(expected);
        });
    });
});