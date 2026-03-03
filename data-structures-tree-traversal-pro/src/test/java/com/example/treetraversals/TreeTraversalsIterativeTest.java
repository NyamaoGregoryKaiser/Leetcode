```java
package com.example.treetraversals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TreeTraversalsIterativeTest {

    private TreeTraversalsIterative traversals;

    @BeforeEach
    void setUp() {
        traversals = new TreeTraversalsIterative();
    }

    // Helper method to build a simple tree for testing
    //      1
    //     / \
    //    2   3
    //   / \
    //  4   5
    private TreeNode buildSimpleTree() {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        return root;
    }

    // Helper method to build a skewed left tree
    //      1
    //     /
    //    2
    //   /
    //  3
    private TreeNode buildSkewedLeftTree() {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.left.left = new TreeNode(3);
        return root;
    }

    // Helper method to build a skewed right tree
    //   1
    //    \
    //     2
    //      \
    //       3
    private TreeNode buildSkewedRightTree() {
        TreeNode root = new TreeNode(1);
        root.right = new TreeNode(2);
        root.right.right = new TreeNode(3);
        return root;
    }

    // --- Preorder Traversal Tests ---
    @Test
    void testPreorderTraversal_simpleTree() {
        TreeNode root = buildSimpleTree();
        List<Integer> expected = Arrays.asList(1, 2, 4, 5, 3);
        assertEquals(expected, traversals.preorderTraversal(root));
    }

    @Test
    void testPreorderTraversal_emptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.preorderTraversal(root));
    }

    @Test
    void testPreorderTraversal_singleNodeTree() {
        TreeNode root = new TreeNode(10);
        List<Integer> expected = Collections.singletonList(10);
        assertEquals(expected, traversals.preorderTraversal(root));
    }

    @Test
    void testPreorderTraversal_skewedLeftTree() {
        TreeNode root = buildSkewedLeftTree();
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.preorderTraversal(root));
    }

    @Test
    void testPreorderTraversal_skewedRightTree() {
        TreeNode root = buildSkewedRightTree();
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.preorderTraversal(root));
    }

    // --- Inorder Traversal Tests ---
    @Test
    void testInorderTraversal_simpleTree() {
        TreeNode root = buildSimpleTree();
        List<Integer> expected = Arrays.asList(4, 2, 5, 1, 3);
        assertEquals(expected, traversals.inorderTraversal(root));
    }

    @Test
    void testInorderTraversal_emptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.inorderTraversal(root));
    }

    @Test
    void testInorderTraversal_singleNodeTree() {
        TreeNode root = new TreeNode(10);
        List<Integer> expected = Collections.singletonList(10);
        assertEquals(expected, traversals.inorderTraversal(root));
    }

    @Test
    void testInorderTraversal_skewedLeftTree() {
        TreeNode root = buildSkewedLeftTree();
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.inorderTraversal(root));
    }

    @Test
    void testInorderTraversal_skewedRightTree() {
        TreeNode root = buildSkewedRightTree();
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.inorderTraversal(root));
    }

    // --- Postorder Traversal Tests ---
    @Test
    void testPostorderTraversal_simpleTree() {
        TreeNode root = buildSimpleTree();
        List<Integer> expected = Arrays.asList(4, 5, 2, 3, 1);
        assertEquals(expected, traversals.postorderTraversal(root));
    }

    @Test
    void testPostorderTraversal_emptyTree() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.postorderTraversal(root));
    }

    @Test
    void testPostorderTraversal_singleNodeTree() {
        TreeNode root = new TreeNode(10);
        List<Integer> expected = Collections.singletonList(10);
        assertEquals(expected, traversals.postorderTraversal(root));
    }

    @Test
    void testPostorderTraversal_skewedLeftTree() {
        TreeNode root = buildSkewedLeftTree();
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.postorderTraversal(root));
    }

    @Test
    void testPostorderTraversal_skewedRightTree() {
        TreeNode root = buildSkewedRightTree();
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.postorderTraversal(root));
    }
}
```