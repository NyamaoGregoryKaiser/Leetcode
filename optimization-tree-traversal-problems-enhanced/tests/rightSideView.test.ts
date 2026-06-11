/**
 * @fileoverview Unit tests for the RightSideView class in `src/problems/rightSideView.ts`.
 * This file tests both BFS and DFS implementations of the Binary Tree Right Side View problem.
 */

import { TreeNode, buildTreeFromArray } from '../src/utils/treeNode';
import { RightSideView, IRightSideView } from '../src/problems/rightSideView';

describe('RightSideView', () => {
    let rightSideView: IRightSideView;

    beforeEach(() => {
        rightSideView = new RightSideView();
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
            expected: [1]
        },
        {
            name: 'Simple tree (Root, Left, Right)',
            treeArray: [1, 2, 3], //     1
                                 //    / \
                                 //   2   3
            root: createTestTree([1, 2, 3]),
            expected: [1, 3]
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
            expected: [1, 3, 7]
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
            expected: [1, 2, 3, 4]
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
            expected: [1, 2, 3]
        },
        {
            name: 'LeetCode example 1',
            treeArray: [1, 2, 3, null, 5, null, 4],
            //      1
            //     / \
            //    2   3
            //     \   \
            //      5   4
            root: createTestTree([1, 2, 3, null, 5, null, 4]),
            expected: [1, 3, 4]
        },
        {
            name: 'LeetCode example 2',
            treeArray: [1, null, 3],
            //   1
            //    \
            //     3
            root: createTestTree([1, null, 3]),
            expected: [1, 3]
        },
        {
            name: 'LeetCode example 3',
            treeArray: [],
            root: createTestTree([]),
            expected: []
        },
        {
            name: 'Tree with mixed structure, right-heavy',
            treeArray: [10, 5, 15, null, 7, 12, 20],
            //         10
            //        /  \
            //       5    15
            //        \  /  \
            //         7 12  20
            root: createTestTree([10, 5, 15, null, 7, 12, 20]),
            expected: [10, 15, 20]
        },
        {
            name: 'Tree with mixed structure, left-heavy',
            treeArray: [1, 2, null, 3, null, 4, null, 5],
            //      1
            //     /
            //    2
            //   /
            //  3
            // /
            //4
            // /
            //5
            root: createTestTree([1, 2, null, 3, null, null, null, 4, null, null, null, null, null, null, 5]),
            expected: [1, 2, 3, 4, 5]
        }
    ];

    testCases.forEach(({ name, root, expected }) => {
        describe(`BFS Approach - Test Case: ${name}`, () => {
            it('should correctly determine the right side view using BFS', () => {
                expect(rightSideView.rightSideViewBFS(root)).toEqual(expected);
            });
        });

        describe(`DFS Approach - Test Case: ${name}`, () => {
            it('should correctly determine the right side view using DFS', () => {
                expect(rightSideView.rightSideViewDFS(root)).toEqual(expected);
            });
        });
    });
});