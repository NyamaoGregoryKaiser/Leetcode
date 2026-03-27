```java
package com.example.treetraversals;

import com.example.treetraversals.datastructures.TreeNode;
import com.example.treetraversals.problems.MaxDepthBinaryTree;
import com.example.treetraversals.utils.TreeBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for {@link MaxDepthBinaryTree}.
 * Covers various tree structures for max depth calculation.
 */
public class MaxDepthBinaryTreeTest {

    private MaxDepthBinaryTree maxDepthFinder;

    @BeforeEach
    void setUp() {
        maxDepthFinder = new MaxDepthBinaryTree();
    }

    // --- Tests for DFS Recursive ---

    @Test
    void testMaxDepthDFSRecursive_EmptyTree() {
        TreeNode root = null;
        assertEquals(0, maxDepthFinder.maxDepthDFSRecursive(root));
    }

    @Test
    void testMaxDepthDFSRecursive_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        assertEquals(1, maxDepthFinder.maxDepthDFSRecursive(root));
    }

    @Test
    void testMaxDepthDFSRecursive_BalancedTree() {
        // Tree:       3 (depth 1)
        //           /   \
        //          9    20 (depth 2)
        //              /  \
        //             15   7 (depth 3)
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        assertEquals(3, maxDepthFinder.maxDepthDFSRecursive(root));
    }

    @Test
    void testMaxDepthDFSRecursive_LeftSkewedTree() {
        // Tree:    1 (depth 1)
        //         /
        //        2 (depth 2)
        //       /
        //      3 (depth 3)
        //     /
        //    4 (depth 4)
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        assertEquals(4, maxDepthFinder.maxDepthDFSRecursive(root));
    }

    @Test
    void testMaxDepthDFSRecursive_RightSkewedTree() {
        // Tree: 1 (depth 1)
        //        \
        //         2 (depth 2)
        //          \
        //           3 (depth 3)
        //            \
        //             4 (depth 4)
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4});
        assertEquals(4, maxDepthFinder.maxDepthDFSRecursive(root));
    }

    @Test
    void testMaxDepthDFSRecursive_ComplexTree() {
        // Tree:     1
        //          / \
        //         2   3
        //        / \   \
        //       4   5   6
        //            \
        //             7
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, null, 6, null, null, null, 7});
        assertEquals(4, maxDepthFinder.maxDepthDFSRecursive(root)); // Path 1-2-5-7
    }

    // --- Tests for DFS Iterative ---

    @Test
    void testMaxDepthDFSIterative_EmptyTree() {
        TreeNode root = null;
        assertEquals(0, maxDepthFinder.maxDepthDFSIterative(root));
    }

    @Test
    void testMaxDepthDFSIterative_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        assertEquals(1, maxDepthFinder.maxDepthDFSIterative(root));
    }

    @Test
    void testMaxDepthDFSIterative_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        assertEquals(3, maxDepthFinder.maxDepthDFSIterative(root));
    }

    @Test
    void testMaxDepthDFSIterative_LeftSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        assertEquals(4, maxDepthFinder.maxDepthDFSIterative(root));
    }

    @Test
    void testMaxDepthDFSIterative_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4});
        assertEquals(4, maxDepthFinder.maxDepthDFSIterative(root));
    }

    @Test
    void testMaxDepthDFSIterative_ComplexTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, null, 6, null, null, null, 7});
        assertEquals(4, maxDepthFinder.maxDepthDFSIterative(root));
    }


    // --- Tests for BFS ---

    @Test
    void testMaxDepthBFS_EmptyTree() {
        TreeNode root = null;
        assertEquals(0, maxDepthFinder.maxDepthBFS(root));
    }

    @Test
    void testMaxDepthBFS_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        assertEquals(1, maxDepthFinder.maxDepthBFS(root));
    }

    @Test
    void testMaxDepthBFS_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        assertEquals(3, maxDepthFinder.maxDepthBFS(root));
    }

    @Test
    void testMaxDepthBFS_LeftSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        assertEquals(4, maxDepthFinder.maxDepthBFS(root));
    }

    @Test
    void testMaxDepthBFS_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4});
        assertEquals(4, maxDepthFinder.maxDepthBFS(root));
    }

    @Test
    void testMaxDepthBFS_ComplexTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, null, 6, null, null, null, 7});
        assertEquals(4, maxDepthFinder.maxDepthBFS(root));
    }
}
```