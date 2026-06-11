/**
 * @fileoverview Unit tests for the TreeNode class and utility functions
 * (`buildTreeFromArray`, `treeToArray`) in `src/utils/treeNode.ts`.
 * These tests ensure that the tree building and conversion logic works correctly.
 */

import { TreeNode, buildTreeFromArray, treeToArray } from '../src/utils/treeNode';

describe('TreeNode', () => {
    it('should create a TreeNode with default values', () => {
        const node = new TreeNode();
        expect(node.val).toBe(0);
        expect(node.left).toBeNull();
        expect(node.right).toBeNull();
    });

    it('should create a TreeNode with specified value', () => {
        const node = new TreeNode(5);
        expect(node.val).toBe(5);
        expect(node.left).toBeNull();
        expect(node.right).toBeNull();
    });

    it('should create a TreeNode with children', () => {
        const left = new TreeNode(2);
        const right = new TreeNode(3);
        const root = new TreeNode(1, left, right);
        expect(root.val).toBe(1);
        expect(root.left).toBe(left);
        expect(root.right).toBe(right);
        expect(root.left?.val).toBe(2);
        expect(root.right?.val).toBe(3);
    });
});

describe('buildTreeFromArray', () => {
    it('should return null for an empty array', () => {
        expect(buildTreeFromArray([])).toBeNull();
    });

    it('should return null for an array starting with null', () => {
        expect(buildTreeFromArray([null])).toBeNull();
        expect(buildTreeFromArray([null, 1, 2])).toBeNull();
    });

    it('should build a single-node tree', () => {
        const root = buildTreeFromArray([1]);
        expect(root).not.toBeNull();
        expect(root?.val).toBe(1);
        expect(root?.left).toBeNull();
        expect(root?.right).toBeNull();
    });

    it('should build a simple two-node tree (left child)', () => {
        const root = buildTreeFromArray([1, 2]);
        expect(root?.val).toBe(1);
        expect(root?.left?.val).toBe(2);
        expect(root?.right).toBeNull();
    });

    it('should build a simple two-node tree (right child)', () => {
        const root = buildTreeFromArray([1, null, 3]);
        expect(root?.val).toBe(1);
        expect(root?.left).toBeNull();
        expect(root?.right?.val).toBe(3);
    });

    it('should build a full binary tree', () => {
        const root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
        expect(root?.val).toBe(1);
        expect(root?.left?.val).toBe(2);
        expect(root?.right?.val).toBe(3);
        expect(root?.left?.left?.val).toBe(4);
        expect(root?.left?.right?.val).toBe(5);
        expect(root?.right?.left?.val).toBe(6);
        expect(root?.right?.right?.val).toBe(7);
    });

    it('should handle nulls correctly for missing children', () => {
        const root = buildTreeFromArray([1, 2, null, 4, 5]);
        //      1
        //     /
        //    2
        //   / \
        //  4   5
        expect(root?.val).toBe(1);
        expect(root?.left?.val).toBe(2);
        expect(root?.right).toBeNull();
        expect(root?.left?.left?.val).toBe(4);
        expect(root?.left?.right?.val).toBe(5);
    });

    it('should build a complex tree with various nulls', () => {
        // Example: [3, 9, 20, null, null, 15, 7]
        //     3
        //    / \
        //   9  20
        //     /  \
        //    15   7
        const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
        expect(root?.val).toBe(3);
        expect(root?.left?.val).toBe(9);
        expect(root?.right?.val).toBe(20);
        expect(root?.left?.left).toBeNull();
        expect(root?.left?.right).toBeNull();
        expect(root?.right?.left?.val).toBe(15);
        expect(root?.right?.right?.val).toBe(7);
    });

    it('should build a right-skewed tree', () => {
        const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
        // 1
        //  \
        //   2
        //    \
        //     3
        expect(root?.val).toBe(1);
        expect(root?.left).toBeNull();
        expect(root?.right?.val).toBe(2);
        expect(root?.right?.left).toBeNull();
        expect(root?.right?.right?.val).toBe(3);
    });
});

describe('treeToArray', () => {
    it('should return an empty array for a null root', () => {
        expect(treeToArray(null)).toEqual([]);
    });

    it('should convert a single-node tree', () => {
        const root = new TreeNode(1);
        expect(treeToArray(root)).toEqual([1]);
    });

    it('should convert a simple two-node tree (left child)', () => {
        const root = new TreeNode(1, new TreeNode(2), null);
        expect(treeToArray(root)).toEqual([1, 2]);
    });

    it('should convert a simple two-node tree (right child)', () => {
        const root = new TreeNode(1, null, new TreeNode(3));
        expect(treeToArray(root)).toEqual([1, null, 3]);
    });

    it('should convert a full binary tree', () => {
        const root = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
        expect(treeToArray(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should convert a tree with missing children and trim trailing nulls', () => {
        const root = buildTreeFromArray([1, 2, null, 4, 5]);
        //      1
        //     /
        //    2
        //   / \
        //  4   5
        expect(treeToArray(root)).toEqual([1, 2, null, 4, 5]);
    });

    it('should convert a complex tree with various nulls', () => {
        const root = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
        expect(treeToArray(root)).toEqual([3, 9, 20, null, null, 15, 7]);
    });

    it('should convert a right-skewed tree', () => {
        const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
        expect(treeToArray(root)).toEqual([1, null, 2, null, null, null, 3]);
    });

    it('should handle a tree with only left children', () => {
        const root = buildTreeFromArray([1, 2, null, 3, null, 4, null]);
        //      1
        //     /
        //    2
        //   /
        //  3
        // /
        //4
        expect(treeToArray(root)).toEqual([1, 2, null, 3, null, null, null, 4]);
    });

    it('should handle a tree with only right children', () => {
        const root = buildTreeFromArray([1, null, 2, null, null, null, 3]);
        expect(treeToArray(root)).toEqual([1, null, 2, null, null, null, 3]);
    });
});