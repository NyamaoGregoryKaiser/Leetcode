```typescript
import { TreeNode } from '../../src/data-structures/TreeNode';
import { buildTreeFromArray } from '../../src/utils/treeUtils';
import {
    isValidBSTRecursive,
    isValidBSTInorderIterative
} from '../../src/problems/Problem4_ValidateBST';

describe('Problem 4: Validate Binary Search Tree', () => {

    // Test cases for valid BSTs
    // Case 1: Simple valid BST
    //    2
    //   / \
    //  1   3
    const validBST1 = buildTreeFromArray([2, 1, 3]);

    // Case 2: Larger valid BST
    //      5
    //     / \
    //    1   7
    //       / \
    //      6   8
    const validBST2 = buildTreeFromArray([5, 1, 7, null, null, 6, 8]);

    // Case 3: Single node is a valid BST
    //    1
    const validBST3 = buildTreeFromArray([1]);

    // Case 4: Empty tree is a valid BST
    const validBST4 = buildTreeFromArray([]);

    // Case 5: Valid BST with left subtree having multiple nodes
    //       10
    //      /  \
    //     5    15
    //    / \
    //   3   7
    const validBST5 = buildTreeFromArray([10, 5, 15, 3, 7]);

    // Case 6: Valid BST with right subtree having multiple nodes
    //       10
    //      /  \
    //     5    15
    //         /  \
    //        12  20
    const validBST6 = buildTreeFromArray([10, 5, 15, null, null, 12, 20]);


    // Test cases for invalid BSTs
    // Case 1: Root violates right child constraint
    //    5
    //   / \
    //  1   4
    //     / \
    //    3   6
    // (4 is not > 5, but 3 is < 5 and 6 > 5. The problem is that the 3 in the right subtree is < 5)
    // The range check is crucial here: 3 in right subtree of 5 must be > 5.
    const invalidBST1 = buildTreeFromArray([5, 1, 4, null, null, 3, 6]);

    // Case 2: Root violates left child constraint (child is equal to parent - usually not allowed in strict BST)
    //    2
    //   / \
    //  2   3
    const invalidBST2 = buildTreeFromArray([2, 2, 3]);

    // Case 3: Left child violates constraint
    //    1
    //   / \
    //  2   3
    const invalidBST3 = buildTreeFromArray([1, 2, 3]);

    // Case 4: Right child violates constraint
    //    3
    //   / \
    //  1   2
    const invalidBST4 = buildTreeFromArray([3, 1, 2]);

    // Case 5: Complex invalid scenario
    //      10
    //     /  \
    //    5   15
    //       /  \
    //      6    20  (6 is in right subtree of 10, but 6 < 10. Also 6 < 15, so valid for 15, but global valid is failed)
    const invalidBST5 = buildTreeFromArray([10, 5, 15, null, null, 6, 20]);

    // Case 6: Duplicates in right subtree
    //    2
    //   / \
    //  1   2
    const invalidBST6 = buildTreeFromArray([2, 1, 2]);

    // Case 7: Duplicates in left subtree
    //    2
    //   / \
    //  3   4
    const invalidBST7 = buildTreeFromArray([2, 3, 4]);


    // Test suite for recursive approach
    describe('isValidBSTRecursive', () => {
        // Valid BSTs
        test('should return true for a simple valid BST', () => {
            expect(isValidBSTRecursive(validBST1)).toBe(true);
        });

        test('should return true for a larger valid BST', () => {
            expect(isValidBSTRecursive(validBST2)).toBe(true);
        });

        test('should return true for a single node tree', () => {
            expect(isValidBSTRecursive(validBST3)).toBe(true);
        });

        test('should return true for an empty tree', () => {
            expect(isValidBSTRecursive(validBST4)).toBe(true);
        });

        test('should return true for a valid BST with left subtree nodes', () => {
            expect(isValidBSTRecursive(validBST5)).toBe(true);
        });

        test('should return true for a valid BST with right subtree nodes', () => {
            expect(isValidBSTRecursive(validBST6)).toBe(true);
        });

        // Invalid BSTs
        test('should return false when a node in right subtree violates global min constraint (problem example)', () => {
            expect(isValidBSTRecursive(invalidBST1)).toBe(false);
        });

        test('should return false when root has a left child with equal value', () => {
            expect(isValidBSTRecursive(invalidBST2)).toBe(false);
        });

        test('should return false when left child violates property (left child > root)', () => {
            expect(isValidBSTRecursive(invalidBST3)).toBe(false);
        });

        test('should return false when right child violates property (right child < root)', () => {
            expect(isValidBSTRecursive(invalidBST4)).toBe(false);
        });

        test('should return false for a complex invalid scenario (6 in right subtree of 10)', () => {
            expect(isValidBSTRecursive(invalidBST5)).toBe(false);
        });

        test('should return false for duplicates in right subtree', () => {
            expect(isValidBSTRecursive(invalidBST6)).toBe(false);
        });

        test('should return false for duplicates in left subtree', () => {
            expect(isValidBSTRecursive(invalidBST7)).toBe(false);
        });
    });

    // Test suite for iterative inorder traversal approach
    describe('isValidBSTInorderIterative', () => {
        // Valid BSTs
        test('should return true for a simple valid BST', () => {
            expect(isValidBSTInorderIterative(validBST1)).toBe(true);
        });

        test('should return true for a larger valid BST', () => {
            expect(isValidBSTInorderIterative(validBST2)).toBe(true);
        });

        test('should return true for a single node tree', () => {
            expect(isValidBSTInorderIterative(validBST3)).toBe(true);
        });

        test('should return true for an empty tree', () => {
            expect(isValidBSTInorderIterative(validBST4)).toBe(true);
        });

        test('should return true for a valid BST with left subtree nodes', () => {
            expect(isValidBSTInorderIterative(validBST5)).toBe(true);
        });

        test('should return true for a valid BST with right subtree nodes', () => {
            expect(isValidBSTInorderIterative(validBST6)).toBe(true);
        });

        // Invalid BSTs
        test('should return false when a node in right subtree violates global min constraint (problem example)', () => {
            expect(isValidBSTInorderIterative(invalidBST1)).toBe(false);
        });

        test('should return false when root has a left child with equal value', () => {
            expect(isValidBSTInorderIterative(invalidBST2)).toBe(false);
        });

        test('should return false when left child violates property (left child > root)', () => {
            expect(isValidBSTInorderIterative(invalidBST3)).toBe(false);
        });

        test('should return false when right child violates property (right child < root)', () => {
            expect(isValidBSTInorderIterative(invalidBST4)).toBe(false);
        });

        test('should return false for a complex invalid scenario (6 in right subtree of 10)', () => {
            expect(isValidBSTInorderIterative(invalidBST5)).toBe(false);
        });

        test('should return false for duplicates in right subtree', () => {
            expect(isValidBSTInorderIterative(invalidBST6)).toBe(false);
        });

        test('should return false for duplicates in left subtree', () => {
            expect(isValidBSTInorderIterative(invalidBST7)).toBe(false);
        });
    });
});
```