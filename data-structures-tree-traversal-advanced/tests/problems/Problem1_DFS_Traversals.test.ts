```typescript
import { TreeNode } from '../../src/data-structures/TreeNode';
import { buildTreeFromArray } from '../../src/utils/treeUtils';
import {
    inorderTraversalRecursive,
    inorderTraversalIterative,
    preorderTraversalRecursive,
    preorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack
} from '../../src/problems/Problem1_DFS_Traversals';

describe('Problem 1: DFS Traversals (Inorder, Preorder, Postorder)', () => {

    // Test cases for a common tree:
    //      3
    //     / \
    //    9  20
    //      /  \
    //     15   7
    const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
    const expectedInorder1 = [9, 3, 15, 20, 7];
    const expectedPreorder1 = [3, 9, 20, 15, 7];
    const expectedPostorder1 = [9, 15, 7, 20, 3];

    // Test cases for a single node tree:
    //      1
    const tree2 = buildTreeFromArray([1]);
    const expectedInorder2 = [1];
    const expectedPreorder2 = [1];
    const expectedPostorder2 = [1];

    // Test cases for a left-skewed tree:
    //      1
    //     /
    //    2
    //   /
    //  3
    const tree3 = buildTreeFromArray([1, 2, null, 3]);
    const expectedInorder3 = [3, 2, 1];
    const expectedPreorder3 = [1, 2, 3];
    const expectedPostorder3 = [3, 2, 1];

    // Test cases for a right-skewed tree:
    //  1
    //   \
    //    2
    //     \
    //      3
    const tree4 = buildTreeFromArray([1, null, 2, null, null, null, 3]);
    const expectedInorder4 = [1, 2, 3];
    const expectedPreorder4 = [1, 2, 3];
    const expectedPostorder4 = [3, 2, 1];

    // Test cases for an empty tree:
    const tree5 = buildTreeFromArray([]);
    const expectedEmpty = [];

    // Test cases for a complete tree:
    //       1
    //      / \
    //     2   3
    //    / \ / \
    //   4  5 6  7
    const tree6 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
    const expectedInorder6 = [4, 2, 5, 1, 6, 3, 7];
    const expectedPreorder6 = [1, 2, 4, 5, 3, 6, 7];
    const expectedPostorder6 = [4, 5, 2, 6, 7, 3, 1];

    // =====================================
    // Inorder Traversal Tests
    // =====================================
    describe('Inorder Traversal', () => {
        describe('Recursive', () => {
            test('should correctly perform inorder traversal on a general tree', () => {
                expect(inorderTraversalRecursive(tree1)).toEqual(expectedInorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(inorderTraversalRecursive(tree2)).toEqual(expectedInorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(inorderTraversalRecursive(tree3)).toEqual(expectedInorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(inorderTraversalRecursive(tree4)).toEqual(expectedInorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(inorderTraversalRecursive(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(inorderTraversalRecursive(tree6)).toEqual(expectedInorder6);
            });
        });

        describe('Iterative', () => {
            test('should correctly perform inorder traversal on a general tree', () => {
                expect(inorderTraversalIterative(tree1)).toEqual(expectedInorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(inorderTraversalIterative(tree2)).toEqual(expectedInorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(inorderTraversalIterative(tree3)).toEqual(expectedInorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(inorderTraversalIterative(tree4)).toEqual(expectedInorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(inorderTraversalIterative(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(inorderTraversalIterative(tree6)).toEqual(expectedInorder6);
            });
        });
    });

    // =====================================
    // Preorder Traversal Tests
    // =====================================
    describe('Preorder Traversal', () => {
        describe('Recursive', () => {
            test('should correctly perform preorder traversal on a general tree', () => {
                expect(preorderTraversalRecursive(tree1)).toEqual(expectedPreorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(preorderTraversalRecursive(tree2)).toEqual(expectedPreorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(preorderTraversalRecursive(tree3)).toEqual(expectedPreorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(preorderTraversalRecursive(tree4)).toEqual(expectedPreorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(preorderTraversalRecursive(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(preorderTraversalRecursive(tree6)).toEqual(expectedPreorder6);
            });
        });

        describe('Iterative', () => {
            test('should correctly perform preorder traversal on a general tree', () => {
                expect(preorderTraversalIterative(tree1)).toEqual(expectedPreorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(preorderTraversalIterative(tree2)).toEqual(expectedPreorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(preorderTraversalIterative(tree3)).toEqual(expectedPreorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(preorderTraversalIterative(tree4)).toEqual(expectedPreorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(preorderTraversalIterative(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(preorderTraversalIterative(tree6)).toEqual(expectedPreorder6);
            });
        });
    });

    // =====================================
    // Postorder Traversal Tests
    // =====================================
    describe('Postorder Traversal', () => {
        describe('Recursive', () => {
            test('should correctly perform postorder traversal on a general tree', () => {
                expect(postorderTraversalRecursive(tree1)).toEqual(expectedPostorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(postorderTraversalRecursive(tree2)).toEqual(expectedPostorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(postorderTraversalRecursive(tree3)).toEqual(expectedPostorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(postorderTraversalRecursive(tree4)).toEqual(expectedPostorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(postorderTraversalRecursive(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(postorderTraversalRecursive(tree6)).toEqual(expectedPostorder6);
            });
        });

        describe('Iterative (Two Stacks)', () => {
            test('should correctly perform postorder traversal on a general tree', () => {
                expect(postorderTraversalIterativeTwoStacks(tree1)).toEqual(expectedPostorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(postorderTraversalIterativeTwoStacks(tree2)).toEqual(expectedPostorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(postorderTraversalIterativeTwoStacks(tree3)).toEqual(expectedPostorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(postorderTraversalIterativeTwoStacks(tree4)).toEqual(expectedPostorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(postorderTraversalIterativeTwoStacks(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(postorderTraversalIterativeTwoStacks(tree6)).toEqual(expectedPostorder6);
            });
        });

        describe('Iterative (One Stack)', () => {
            test('should correctly perform postorder traversal on a general tree', () => {
                expect(postorderTraversalIterativeOneStack(tree1)).toEqual(expectedPostorder1);
            });

            test('should return correct traversal for a single node tree', () => {
                expect(postorderTraversalIterativeOneStack(tree2)).toEqual(expectedPostorder2);
            });

            test('should return correct traversal for a left-skewed tree', () => {
                expect(postorderTraversalIterativeOneStack(tree3)).toEqual(expectedPostorder3);
            });

            test('should return correct traversal for a right-skewed tree', () => {
                expect(postorderTraversalIterativeOneStack(tree4)).toEqual(expectedPostorder4);
            });

            test('should return an empty array for an empty tree', () => {
                expect(postorderTraversalIterativeOneStack(tree5)).toEqual(expectedEmpty);
            });

            test('should handle a complete binary tree', () => {
                expect(postorderTraversalIterativeOneStack(tree6)).toEqual(expectedPostorder6);
            });
        });
    });
});
```