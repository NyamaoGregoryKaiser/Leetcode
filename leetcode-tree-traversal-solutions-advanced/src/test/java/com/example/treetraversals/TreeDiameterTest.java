```java
package com.example.treetraversals;

import com.example.treetraversals.datastructures.TreeNode;
import com.example.treetraversals.problems.TreeDiameter;
import com.example.treetraversals.utils.TreeBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for {@link TreeDiameter}.
 * Covers various tree structures for diameter calculation.
 */
public class TreeDiameterTest {

    private TreeDiameter treeDiameter;

    @BeforeEach
    void setUp() {
        treeDiameter = new TreeDiameter();
    }

    @Test
    void testDiameterOfBinaryTree_EmptyTree() {
        TreeNode root = null;
        assertEquals(0, treeDiameter.diameterOfBinaryTree(root));
    }

    @Test
    void testDiameterOfBinaryTree_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        assertEquals(0, treeDiameter.diameterOfBinaryTree(root));
    }

    @Test
    void testDiameterOfBinaryTree_TwoNodes() {
        // 1
        //  \
        //   2
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2});
        assertEquals(1, treeDiameter.diameterOfBinaryTree(root)); // Path 1-2
    }

    @Test
    void testDiameterOfBinaryTree_Example1() {
        // LeetCode example:
        //      1
        //     / \
        //    2   3
        //   / \
        //  4   5
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5});
        assertEquals(3, treeDiameter.diameterOfBinaryTree(root)); // Path 4-2-1-3 or 5-2-1-3 (3 edges)
    }

    @Test
    void testDiameterOfBinaryTree_BalancedTree() {
        //      3
        //     / \
        //    9  20
        //       /  \
        //      15   7
        // Path 9-3-20-15 (3 edges) or 9-3-20-7 (3 edges)
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        assertEquals(3, treeDiameter.diameterOfBinaryTree(root));
    }

    @Test
    void testDiameterOfBinaryTree_LeftSkewedTree() {
        // 1-2-3-4
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        assertEquals(3, treeDiameter.diameterOfBinaryTree(root)); // Path 4-3-2-1 (3 edges)
    }

    @Test
    void testDiameterOfBinaryTree_RightSkewedTree() {
        // 1-2-3-4
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4});
        assertEquals(3, treeDiameter.diameterOfBinaryTree(root)); // Path 1-2-3-4 (3 edges)
    }

    @Test
    void testDiameterOfBinaryTree_DiameterNotThroughRoot() {
        //          A
        //         / \
        //        B   C
        //       /     \
        //      D       E
        //     /         \
        //    F           G
        // Diameter is D-B-C-E-G (4 edges) or F-D-B-C-E (4 edges)
        // Not passing through root A directly.
        // Array representation: [A, B, C, D, null, null, E, F, null, null, null, null, null, null, G]
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, null, null, 5, 6, null, null, null, null, null, null, 7});
        assertEquals(4, treeDiameter.diameterOfBinaryTree(root)); // Path 6-4-2-3-5 (4 edges)
    }

    @Test
    void testDiameterOfBinaryTree_ComplexBalanced() {
        //         4
        //        / \
        //       2   7
        //      / \ / \
        //     1  3 6  9
        // diameter is (1-2-4-7-9) or (3-2-4-7-9) or (1-2-4-7-6) (4 edges)
        Integer[] values = {4, 2, 7, 1, 3, 6, 9};
        TreeNode root = TreeBuilder.buildTree(values);
        assertEquals(4, treeDiameter.diameterOfBinaryTree(root));
    }

    @Test
    void testDiameterOfBinaryTree_DeepComplex() {
        // This tree structure manually crafted to ensure a complex case
        TreeNode n1 = new TreeNode(1);
        TreeNode n2 = new TreeNode(2);
        TreeNode n3 = new TreeNode(3);
        TreeNode n4 = new TreeNode(4);
        TreeNode n5 = new TreeNode(5);
        TreeNode n6 = new TreeNode(6);
        TreeNode n7 = new TreeNode(7);
        TreeNode n8 = new TreeNode(8);
        TreeNode n9 = new TreeNode(9);
        TreeNode n10 = new TreeNode(10);

        n1.left = n2;
        n1.right = n3;
        n2.left = n4;
        n2.right = n5;
        n4.left = n6;
        n5.right = n7;
        n7.left = n8;
        n8.right = n9;
        n9.left = n10;

        // Path: 10-9-8-7-5-2-1-3 (7 edges)
        // Path: 6-4-2-1-3 (4 edges)
        // Path: 6-4-2-5-7-8-9-10 (7 edges)
        assertEquals(7, treeDiameter.diameterOfBinaryTree(n1));
    }
}
```