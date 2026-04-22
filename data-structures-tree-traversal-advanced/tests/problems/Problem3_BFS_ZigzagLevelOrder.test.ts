```typescript
import { TreeNode } from '../../src/data-structures/TreeNode';
import { buildTreeFromArray } from '../../src/utils/treeUtils';
import { zigzagLevelOrderTraversal } from '../../src/problems/Problem3_BFS_ZigzagLevelOrder';

describe('Problem 3: BFS - Zigzag Level Order Traversal', () => {

    // Test case 1: Example from LeetCode
    //      3
    //     / \
    //    9  20
    //      /  \
    //     15   7
    // Expected: [[3], [20,9], [15,7]]
    const tree1 = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
    const expected1 = [[3], [20, 9], [15, 7]];

    // Test case 2: Single node tree
    //      1
    // Expected: [[1]]
    const tree2 = buildTreeFromArray([1]);
    const expected2 = [[1]];

    // Test case 3: Empty tree
    // Expected: []
    const tree3 = buildTreeFromArray([]);
    const expected3: number[][] = [];

    // Test case 4: Balanced tree with more levels
    //           1
    //         /   \
    //        2     3
    //       / \   / \
    //      4   5 6   7
    //     / \
    //    8   9
    // Expected: [[1], [3,2], [4,5,6,7], [9,8]]
    const tree4 = buildTreeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, null, null, null, null, null, null]);
    const expected4 = [[1], [3, 2], [4, 5, 6, 7], [9, 8]];

    // Test case 5: Left-skewed tree
    //      1
    //     /
    //    2
    //   /
    //  3
    // Expected: [[1], [2], [3]] (level 1 is right-to-left, but only 1 node)
    const tree5 = buildTreeFromArray([1, 2, null, 3]);
    const expected5 = [[1], [2], [3]];

    // Test case 6: Right-skewed tree
    //  1
    //   \
    //    2
    //     \
    //      3
    // Expected: [[1], [2], [3]]
    const tree6 = buildTreeFromArray([1, null, 2, null, null, null, 3]);
    const expected6 = [[1], [2], [3]];

    // Test case 7: Tree with only left and right children at root
    //      1
    //     / \
    //    2   3
    // Expected: [[1], [3,2]]
    const tree7 = buildTreeFromArray([1, 2, 3]);
    const expected7 = [[1], [3, 2]];


    test('should correctly perform zigzag level order traversal on a general tree', () => {
        expect(zigzagLevelOrderTraversal(tree1)).toEqual(expected1);
    });

    test('should return correct traversal for a single node tree', () => {
        expect(zigzagLevelOrderTraversal(tree2)).toEqual(expected2);
    });

    test('should return an empty array for an empty tree', () => {
        expect(zigzagLevelOrderTraversal(tree3)).toEqual(expected3);
    });

    test('should handle a multi-level balanced tree', () => {
        expect(zigzagLevelOrderTraversal(tree4)).toEqual(expected4);
    });

    test('should return correct traversal for a left-skewed tree', () => {
        expect(zigzagLevelOrderTraversal(tree5)).toEqual(expected5);
    });

    test('should return correct traversal for a right-skewed tree', () => {
        expect(zigzagLevelOrderTraversal(tree6)).toEqual(expected6);
    });

    test('should handle a tree with only two levels', () => {
        expect(zigzagLevelOrderTraversal(tree7)).toEqual(expected7);
    });
});
```