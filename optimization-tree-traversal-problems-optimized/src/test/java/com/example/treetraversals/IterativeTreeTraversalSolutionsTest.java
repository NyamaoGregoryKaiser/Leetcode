```java
package com.example.treetraversals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("IterativeTreeTraversalSolutions Tests")
class IterativeTreeTraversalSolutionsTest {

    private IterativeTreeTraversalSolutions solutions;

    @BeforeEach
    void setUp() {
        solutions = new IterativeTreeTraversalSolutions();
    }

    // Example Tree:
    //         1
    //        / \
    //       2   3
    //      / \
    //     4   5
    private TreeNode createExampleTree() {
        return TreeUtils.buildTreeFromArray(new Integer[]{1, 2, 3, 4, 5, null, null});
    }

    // Skewed Left Tree:
    //     1
    //    /
    //   2
    //  /
    // 3
    private TreeNode createSkewedLeftTree() {
        return TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, 3, null, null, null});
    }

    // Skewed Right Tree:
    // 1
    //  \
    //   2
    //    \
    //     3
    private TreeNode createSkewedRightTree() {
        return TreeUtils.buildTreeFromArray(new Integer[]{1, null, 2, null, null, null, 3});
    }


    /*
     * Tests for Iterative Preorder Traversal
     */

    @Test
    @DisplayName("Preorder Traversal Iterative: Empty Tree")
    void testPreorderTraversalIterative_Empty() {
        assertEquals(Collections.emptyList(), solutions.preorderTraversalIterative(null));
    }

    @Test
    @DisplayName("Preorder Traversal Iterative: Single Node Tree")
    void testPreorderTraversalIterative_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Traversal Iterative: Example Tree")
    void testPreorderTraversalIterative_ExampleTree() {
        TreeNode root = createExampleTree();
        assertEquals(Arrays.asList(1, 2, 4, 5, 3), solutions.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Traversal Iterative: Skewed Left Tree")
    void testPreorderTraversalIterative_SkewedLeft() {
        TreeNode root = createSkewedLeftTree();
        assertEquals(Arrays.asList(1, 2, 3), solutions.preorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Preorder Traversal Iterative: Skewed Right Tree")
    void testPreorderTraversalIterative_SkewedRight() {
        TreeNode root = createSkewedRightTree();
        assertEquals(Arrays.asList(1, 2, 3), solutions.preorderTraversalIterative(root));
    }

    /*
     * Tests for Iterative Inorder Traversal
     */

    @Test
    @DisplayName("Inorder Traversal Iterative: Empty Tree")
    void testInorderTraversalIterative_Empty() {
        assertEquals(Collections.emptyList(), solutions.inorderTraversalIterative(null));
    }

    @Test
    @DisplayName("Inorder Traversal Iterative: Single Node Tree")
    void testInorderTraversalIterative_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Traversal Iterative: Example Tree")
    void testInorderTraversalIterative_ExampleTree() {
        TreeNode root = createExampleTree();
        assertEquals(Arrays.asList(4, 2, 5, 1, 3), solutions.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Traversal Iterative: Skewed Left Tree")
    void testInorderTraversalIterative_SkewedLeft() {
        TreeNode root = createSkewedLeftTree();
        assertEquals(Arrays.asList(3, 2, 1), solutions.inorderTraversalIterative(root));
    }

    @Test
    @DisplayName("Inorder Traversal Iterative: Skewed Right Tree")
    void testInorderTraversalIterative_SkewedRight() {
        TreeNode root = createSkewedRightTree();
        assertEquals(Arrays.asList(1, 2, 3), solutions.inorderTraversalIterative(root));
    }

    /*
     * Tests for Iterative Postorder Traversal (Two Stacks)
     */

    @Test
    @DisplayName("Postorder Traversal Iterative (Two Stacks): Empty Tree")
    void testPostorderTraversalIterativeTwoStacks_Empty() {
        assertEquals(Collections.emptyList(), solutions.postorderTraversalIterativeTwoStacks(null));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (Two Stacks): Single Node Tree")
    void testPostorderTraversalIterativeTwoStacks_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (Two Stacks): Example Tree")
    void testPostorderTraversalIterativeTwoStacks_ExampleTree() {
        TreeNode root = createExampleTree();
        assertEquals(Arrays.asList(4, 5, 2, 3, 1), solutions.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (Two Stacks): Skewed Left Tree")
    void testPostorderTraversalIterativeTwoStacks_SkewedLeft() {
        TreeNode root = createSkewedLeftTree();
        assertEquals(Arrays.asList(3, 2, 1), solutions.postorderTraversalIterativeTwoStacks(root));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (Two Stacks): Skewed Right Tree")
    void testPostorderTraversalIterativeTwoStacks_SkewedRight() {
        TreeNode root = createSkewedRightTree();
        assertEquals(Arrays.asList(3, 2, 1), solutions.postorderTraversalIterativeTwoStacks(root));
    }


    /*
     * Tests for Iterative Postorder Traversal (One Stack)
     */

    @Test
    @DisplayName("Postorder Traversal Iterative (One Stack): Empty Tree")
    void testPostorderTraversalIterativeOneStack_Empty() {
        assertEquals(Collections.emptyList(), solutions.postorderTraversalIterativeOneStack(null));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (One Stack): Single Node Tree")
    void testPostorderTraversalIterativeOneStack_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.postorderTraversalIterativeOneStack(root));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (One Stack): Example Tree")
    void testPostorderTraversalIterativeOneStack_ExampleTree() {
        TreeNode root = createExampleTree();
        assertEquals(Arrays.asList(4, 5, 2, 3, 1), solutions.postorderTraversalIterativeOneStack(root));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (One Stack): Skewed Left Tree")
    void testPostorderTraversalIterativeOneStack_SkewedLeft() {
        TreeNode root = createSkewedLeftTree();
        assertEquals(Arrays.asList(3, 2, 1), solutions.postorderTraversalIterativeOneStack(root));
    }

    @Test
    @DisplayName("Postorder Traversal Iterative (One Stack): Skewed Right Tree")
    void testPostorderTraversalIterativeOneStack_SkewedRight() {
        TreeNode root = createSkewedRightTree();
        assertEquals(Arrays.asList(3, 2, 1), solutions.postorderTraversalIterativeOneStack(root));
    }
}
```