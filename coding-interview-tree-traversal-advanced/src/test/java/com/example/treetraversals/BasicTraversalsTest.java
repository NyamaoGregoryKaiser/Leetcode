```java
package com.example.treetraversals;

import com.example.treetraversals.models.TreeNode;
import com.example.treetraversals.utils.TreeUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * JUnit test class for BasicTraversals, covering Inorder, Preorder, and Postorder traversals
 * using both recursive and iterative approaches.
 */
class BasicTraversalsTest {

    private BasicTraversals traversals;

    @BeforeEach
    void setUp() {
        traversals = new BasicTraversals();
    }

    // --- Test Cases for Inorder Traversal ---

    @Test
    @DisplayName("Inorder Recursive: Empty tree should return empty list")
    void inorderRecursive_emptyTree_returnsEmptyList() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Recursive: Single node tree")
    void inorderRecursive_singleNode_returnsSingleElementList() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Recursive: Complete binary tree")
    void inorderRecursive_completeTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{4, 2, 5, 1, 3}); //   4
                                                                      //  / \
                                                                      // 2   5
                                                                      // / \
                                                                      // 1   3
        List<Integer> expected = Arrays.asList(1, 2, 3, 4, 5);
        assertEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Recursive: Skewed left tree")
    void inorderRecursive_skewedLeftTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{3, 2, null, 1}); //    3
                                                                       //   /
                                                                       //  2
                                                                       // /
                                                                       // 1
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Recursive: Skewed right tree")
    void inorderRecursive_skewedRightTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1, null, 2, null, null, null, 3}); // 1
                                                                                        //  \
                                                                                        //   2
                                                                                        //    \
                                                                                        //     3
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Recursive: Complex tree")
    void inorderRecursive_complexTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{10, 5, 15, null, 7, 12, 18});
        List<Integer> expected = Arrays.asList(5, 7, 10, 12, 15, 18);
        assertEquals(expected, traversals.inorderTraversalRecursive(root));
    }


    @Test
    @DisplayName("Inorder Iterative: Empty tree should return empty list")
    void inorderIterative_emptyTree_returnsEmptyList() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Iterative: Single node tree")
    void inorderIterative_singleNode_returnsSingleElementList() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Iterative: Complete binary tree")
    void inorderIterative_completeTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{4, 2, 5, 1, 3});
        List<Integer> expected = Arrays.asList(1, 2, 3, 4, 5);
        assertEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Iterative: Skewed left tree")
    void inorderIterative_skewedLeftTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{3, 2, null, 1});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Iterative: Skewed right tree")
    void inorderIterative_skewedRightTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Iterative: Complex tree")
    void inorderIterative_complexTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{10, 5, 15, null, 7, 12, 18});
        List<Integer> expected = Arrays.asList(5, 7, 10, 12, 15, 18);
        assertEquals(expected, traversals.inorderTraversalIterative(root));
    }

    // --- Test Cases for Preorder Traversal ---

    @Test
    @DisplayName("Preorder Recursive: Empty tree should return empty list")
    void preorderRecursive_emptyTree_returnsEmptyList() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Recursive: Single node tree")
    void preorderRecursive_singleNode_returnsSingleElementList() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Recursive: Complete binary tree")
    void preorderRecursive_completeTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{4, 2, 5, 1, 3});
        List<Integer> expected = Arrays.asList(4, 2, 1, 3, 5);
        assertEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Recursive: Skewed left tree")
    void preorderRecursive_skewedLeftTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{3, 2, null, 1});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Recursive: Skewed right tree")
    void preorderRecursive_skewedRightTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Recursive: Complex tree")
    void preorderRecursive_complexTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{10, 5, 15, null, 7, 12, 18});
        List<Integer> expected = Arrays.asList(10, 5, 7, 15, 12, 18);
        assertEquals(expected, traversals.preorderTraversalRecursive(root));
    }


    @Test
    @DisplayName("Preorder Iterative: Empty tree should return empty list")
    void preorderIterative_emptyTree_returnsEmptyList() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Iterative: Single node tree")
    void preorderIterative_singleNode_returnsSingleElementList() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Iterative: Complete binary tree")
    void preorderIterative_completeTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{4, 2, 5, 1, 3});
        List<Integer> expected = Arrays.asList(4, 2, 1, 3, 5);
        assertEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Iterative: Skewed left tree")
    void preorderIterative_skewedLeftTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{3, 2, null, 1});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Iterative: Skewed right tree")
    void preorderIterative_skewedRightTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Iterative: Complex tree")
    void preorderIterative_complexTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{10, 5, 15, null, 7, 12, 18});
        List<Integer> expected = Arrays.asList(10, 5, 7, 15, 12, 18);
        assertEquals(expected, traversals.preorderTraversalIterative(root));
    }

    // --- Test Cases for Postorder Traversal ---

    @Test
    @DisplayName("Postorder Recursive: Empty tree should return empty list")
    void postorderRecursive_emptyTree_returnsEmptyList() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Recursive: Single node tree")
    void postorderRecursive_singleNode_returnsSingleElementList() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Recursive: Complete binary tree")
    void postorderRecursive_completeTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{4, 2, 5, 1, 3});
        List<Integer> expected = Arrays.asList(1, 3, 2, 5, 4);
        assertEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Recursive: Skewed left tree")
    void postorderRecursive_skewedLeftTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{3, 2, null, 1});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Recursive: Skewed right tree")
    void postorderRecursive_skewedRightTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Recursive: Complex tree")
    void postorderRecursive_complexTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{10, 5, 15, null, 7, 12, 18});
        List<Integer> expected = Arrays.asList(7, 5, 12, 18, 15, 10);
        assertEquals(expected, traversals.postorderTraversalRecursive(root));
    }


    @Test
    @DisplayName("Postorder Iterative: Empty tree should return empty list")
    void postorderIterative_emptyTree_returnsEmptyList() {
        TreeNode root = null;
        List<Integer> expected = Collections.emptyList();
        assertEquals(expected, traversals.postorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Postorder Iterative: Single node tree")
    void postorderIterative_singleNode_returnsSingleElementList() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1});
        List<Integer> expected = Arrays.asList(1);
        assertEquals(expected, traversals.postorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Postorder Iterative: Complete binary tree")
    void postorderIterative_completeTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{4, 2, 5, 1, 3});
        List<Integer> expected = Arrays.asList(1, 3, 2, 5, 4);
        assertEquals(expected, traversals.postorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Postorder Iterative: Skewed left tree")
    void postorderIterative_skewedLeftTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{3, 2, null, 1});
        List<Integer> expected = Arrays.asList(1, 2, 3);
        assertEquals(expected, traversals.postorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Postorder Iterative: Skewed right tree")
    void postorderIterative_skewedRightTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        List<Integer> expected = Arrays.asList(3, 2, 1);
        assertEquals(expected, traversals.postorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Postorder Iterative: Complex tree")
    void postorderIterative_complexTree_returnsCorrectOrder() {
        TreeNode root = TreeUtils.buildTree(new Integer[]{10, 5, 15, null, 7, 12, 18});
        List<Integer> expected = Arrays.asList(7, 5, 12, 18, 15, 10);
        assertEquals(expected, traversals.postorderTraversalIterative(root));
    }
}
```