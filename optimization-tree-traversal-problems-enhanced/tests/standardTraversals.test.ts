/**
 * @fileoverview Unit tests for the StandardTraversals class in `src/problems/standardTraversals.ts`.
 * This file tests all recursive and iterative implementations of Inorder, Preorder, and Postorder traversals.
 */

import { TreeNode, buildTreeFromArray } from '../src/utils/treeNode';
import { StandardTraversals, IStandardTraversals } from '../src/problems/standardTraversals';

describe('StandardTraversals', () => {
    let traversals: IStandardTraversals;

    beforeEach(() => {
        traversals = new StandardTraversals();
    });

    // Helper function to create test trees
    const createTestTree = (arr: (number | null)[]): TreeNode | null => buildTreeFromArray(arr);

    // Test cases for different tree structures
    const testCases = [
        {
            name: 'Empty tree',
            treeArray: [],
            root: null,
            expected: {
                inorder: [],
                preorder: [],
                postorder: []
            }
        },
        {
            name: 'Single node tree',
            treeArray: [1],
            root: createTestTree([1]),
            expected: {
                inorder: [1],
                preorder: [1],
                postorder: [1]
            }
        },
        {
            name: 'Simple tree (Root, Left, Right)',
            treeArray: [1, 2, 3], //     1
                                 //    / \
                                 //   2   3
            root: createTestTree([1, 2, 3]),
            expected: {
                inorder: [2, 1, 3],
                preorder: [1, 2, 3],
                postorder: [2, 3, 1]
            }
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
            expected: {
                inorder: [4, 2, 5, 1, 6, 3, 7],
                preorder: [1, 2, 4, 5, 3, 6, 7],
                postorder: [4, 5, 2, 6, 7, 3, 1]
            }
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
            expected: {
                inorder: [4, 3, 2, 1],
                preorder: [1, 2, 3, 4],
                postorder: [4, 3, 2, 1]
            }
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
            expected: {
                inorder: [1, 2, 3],
                preorder: [1, 2, 3],
                postorder: [3, 2, 1]
            }
        },
        {
            name: 'Tree with internal nulls',
            treeArray: [3, 9, 20, null, null, 15, 7],
            //     3
            //    / \
            //   9  20
            //     /  \
            //    15   7
            root: createTestTree([3, 9, 20, null, null, 15, 7]),
            expected: {
                inorder: [9, 3, 15, 20, 7],
                preorder: [3, 9, 20, 15, 7],
                postorder: [9, 15, 7, 20, 3]
            }
        },
        {
            name: 'Another tree with internal nulls (missing right child)',
            treeArray: [1, 2, 3, 4, null, null, 5],
            //      1
            //     / \
            //    2   3
            //   /     \
            //  4       5
            root: createTestTree([1, 2, 3, 4, null, null, 5]),
            expected: {
                inorder: [4, 2, 1, 3, 5],
                preorder: [1, 2, 4, 3, 5],
                postorder: [4, 2, 5, 3, 1]
            }
        }
    ];

    testCases.forEach(({ name, root, expected }) => {
        describe(`Recursive Traversal - Test Case: ${name}`, () => {
            it('should perform inorder traversal recursively', () => {
                expect(traversals.inorderTraversalRecursive(root)).toEqual(expected.inorder);
            });

            it('should perform preorder traversal recursively', () => {
                expect(traversals.preorderTraversalRecursive(root)).toEqual(expected.preorder);
            });

            it('should perform postorder traversal recursively', () => {
                expect(traversals.postorderTraversalRecursive(root)).toEqual(expected.postorder);
            });
        });

        describe(`Iterative Traversal - Test Case: ${name}`, () => {
            it('should perform inorder traversal iteratively', () => {
                expect(traversals.inorderTraversalIterative(root)).toEqual(expected.inorder);
            });

            it('should perform preorder traversal iteratively', () => {
                expect(traversals.preorderTraversalIterative(root)).toEqual(expected.preorder);
            });

            it('should perform postorder traversal iteratively (two stacks)', () => {
                expect(traversals.postorderTraversalIterative(root)).toEqual(expected.postorder);
            });

            it('should perform postorder traversal iteratively (single stack)', () => {
                expect(traversals.postorderTraversalIterativeSingleStack(root)).toEqual(expected.postorder);
            });
        });
    });
});