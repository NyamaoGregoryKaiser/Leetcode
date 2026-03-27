```java
package com.example.treetraversals;

import com.example.treetraversals.datastructures.TreeNode;
import com.example.treetraversals.problems.BinaryTreeTraversals;
import com.example.treetraversals.utils.TreeBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for {@link BinaryTreeTraversals}.
 * Covers various tree structures including null, single node, balanced, skewed, and complex trees.
 */
public class BinaryTreeTraversalsTest {

    private BinaryTreeTraversals traversals;

    @BeforeEach
    void setUp() {
        traversals = new BinaryTreeTraversals();
    }

    // Helper method to compare lists
    private void assertListEquals(List<Integer> expected, List<Integer> actual) {
        assertEquals(expected.size(), actual.size(), "Lists have different sizes");
        for (int i = 0; i < expected.size(); i++) {
            assertEquals(expected.get(i), actual.get(i), "Mismatch at index " + i);
        }
    }

    // --- Test Cases for Preorder Traversal ---

    @Test
    void testPreorderTraversal_Recursive_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    void testPreorderTraversal_Iterative_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    void testPreorderTraversal_Recursive_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    void testPreorderTraversal_Iterative_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    void testPreorderTraversal_Recursive_BalancedTree() {
        // Tree:       3
        //           /   \
        //          9    20
        //              /  \
        //             15   7
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(3, 9, 20, 15, 7);
        assertListEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    void testPreorderTraversal_Iterative_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(3, 9, 20, 15, 7);
        assertListEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    void testPreorderTraversal_Recursive_LeftSkewedTree() {
        // Tree:    1
        //         /
        //        2
        //       /
        //      3
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        List<Integer> expected = Arrays.asList(1, 2, 3, 4);
        assertListEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    void testPreorderTraversal_Iterative_LeftSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        List<Integer> expected = Arrays.asList(1, 2, 3, 4);
        assertListEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    void testPreorderTraversal_Recursive_RightSkewedTree() {
        // Tree: 1
        //        \
        //         2
        //          \
        //           3
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertListEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    void testPreorderTraversal_Iterative_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertListEquals(expected, traversals.preorderTraversalIterative(root));
    }

    // --- Test Cases for Inorder Traversal ---

    @Test
    void testInorderTraversal_Recursive_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    void testInorderTraversal_Iterative_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    void testInorderTraversal_Recursive_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    void testInorderTraversal_Iterative_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    void testInorderTraversal_Recursive_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(9, 3, 15, 20, 7); // Left, Root, Right
        assertListEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    void testInorderTraversal_Iterative_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(9, 3, 15, 20, 7);
        assertListEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    void testInorderTraversal_Recursive_LeftSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        List<Integer> expected = Arrays.asList(4, 3, 2, 1);
        assertListEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    void testInorderTraversal_Iterative_LeftSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        List<Integer> expected = Arrays.asList(4, 3, 2, 1);
        assertListEquals(expected, traversals.inorderTraversalIterative(root));
    }

    // --- Test Cases for Postorder Traversal ---

    @Test
    void testPostorderTraversal_Recursive_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    void testPostorderTraversal_TwoStacks_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    void testPostorderTraversal_OneStack_EmptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertListEquals(expected, traversals.postorderTraversalIterativeOneStack(root));
    }

    @Test
    void testPostorderTraversal_Recursive_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    void testPostorderTraversal_TwoStacks_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    void testPostorderTraversal_OneStack_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertListEquals(expected, traversals.postorderTraversalIterativeOneStack(root));
    }

    @Test
    void testPostorderTraversal_Recursive_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(9, 15, 7, 20, 3); // Left, Right, Root
        assertListEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    void testPostorderTraversal_TwoStacks_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(9, 15, 7, 20, 3);
        assertListEquals(expected, traversals.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    void testPostorderTraversal_OneStack_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<Integer> expected = Arrays.asList(9, 15, 7, 20, 3);
        assertListEquals(expected, traversals.postorderTraversalIterativeOneStack(root));
    }

    @Test
    void testPostorderTraversal_Recursive_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertListEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    void testPostorderTraversal_TwoStacks_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertListEquals(expected, traversals.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    void testPostorderTraversal_OneStack_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertListEquals(expected, traversals.postorderTraversalIterativeOneStack(root));
    }

    // --- Test Cases for Level Order Traversal ---

    @Test
    void testLevelOrderTraversal_EmptyTree() {
        TreeNode root = null;
        List<List<Integer>> expected = Collections.emptyList();
        assertEquals(expected, traversals.levelOrderTraversal(root));
    }

    @Test
    void testLevelOrderTraversal_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<List<Integer>> expected = Collections.singletonList(Collections.singletonList(1));
        assertEquals(expected, traversals.levelOrderTraversal(root));
    }

    @Test
    void testLevelOrderTraversal_BalancedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(3),
                Arrays.asList(9, 20),
                Arrays.asList(15, 7)
        );
        assertEquals(expected, traversals.levelOrderTraversal(root));
    }

    @Test
    void testLevelOrderTraversal_ComplexTree() {
        // Tree:     1
        //          / \
        //         2   3
        //        / \   \
        //       4   5   6
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, null, 6});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(2, 3),
                Arrays.asList(4, 5, 6)
        );
        assertEquals(expected, traversals.levelOrderTraversal(root));
    }

    @Test
    void testLevelOrderTraversal_LeftSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(2),
                Arrays.asList(3),
                Arrays.asList(4)
        );
        assertEquals(expected, traversals.levelOrderTraversal(root));
    }

    @Test
    void testLevelOrderTraversal_RightSkewedTree() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(2),
                Arrays.asList(3)
        );
        assertEquals(expected, traversals.levelOrderTraversal(root));
    }
}
```