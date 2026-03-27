```java
package com.example.treetraversals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("MorrisTreeTraversalSolutions Tests")
class MorrisTreeTraversalSolutionsTest {

    private MorrisTreeTraversalSolutions solutions;

    @BeforeEach
    void setUp() {
        solutions = new MorrisTreeTraversalSolutions();
    }

    // Example Tree:
    //         1
    //        / \
    //       2   3
    //      / \
    //     4   5
    private TreeNode createExampleTree() {
        // Important: Morris traversal modifies the tree.
        // We need a fresh tree for each test.
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

    // Tree with single right child:
    // 1
    //  \
    //   2
    private TreeNode createSingleRightChildTree() {
        return TreeUtils.buildTreeFromArray(new Integer[]{1, null, 2});
    }

    // Tree with single left child:
    //   1
    //  /
    // 2
    private TreeNode createSingleLeftChildTree() {
        return TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null});
    }

    /*
     * Tests for Morris Inorder Traversal
     */

    @Test
    @DisplayName("Morris Inorder Traversal: Empty Tree")
    void testInorderTraversalMorris_Empty() {
        assertEquals(Collections.emptyList(), solutions.inorderTraversalMorris(null));
    }

    @Test
    @DisplayName("Morris Inorder Traversal: Single Node Tree")
    void testInorderTraversalMorris_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.inorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Inorder Traversal: Example Tree")
    void testInorderTraversalMorris_ExampleTree() {
        TreeNode root = createExampleTree();
        assertEquals(Arrays.asList(4, 2, 5, 1, 3), solutions.inorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Inorder Traversal: Skewed Left Tree")
    void testInorderTraversalMorris_SkewedLeft() {
        TreeNode root = createSkewedLeftTree();
        assertEquals(Arrays.asList(3, 2, 1), solutions.inorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Inorder Traversal: Skewed Right Tree")
    void testInorderTraversalMorris_SkewedRight() {
        TreeNode root = createSkewedRightTree();
        assertEquals(Arrays.asList(1, 2, 3), solutions.inorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Inorder Traversal: Single Right Child Tree")
    void testInorderTraversalMorris_SingleRightChild() {
        TreeNode root = createSingleRightChildTree();
        assertEquals(Arrays.asList(1, 2), solutions.inorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Inorder Traversal: Single Left Child Tree")
    void testInorderTraversalMorris_SingleLeftChild() {
        TreeNode root = createSingleLeftChildTree();
        assertEquals(Arrays.asList(2, 1), solutions.inorderTraversalMorris(root));
    }

    /*
     * Tests for Morris Preorder Traversal
     */

    @Test
    @DisplayName("Morris Preorder Traversal: Empty Tree")
    void testPreorderTraversalMorris_Empty() {
        assertEquals(Collections.emptyList(), solutions.preorderTraversalMorris(null));
    }

    @Test
    @DisplayName("Morris Preorder Traversal: Single Node Tree")
    void testPreorderTraversalMorris_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.preorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Preorder Traversal: Example Tree")
    void testPreorderTraversalMorris_ExampleTree() {
        TreeNode root = createExampleTree();
        assertEquals(Arrays.asList(1, 2, 4, 5, 3), solutions.preorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Preorder Traversal: Skewed Left Tree")
    void testPreorderTraversalMorris_SkewedLeft() {
        TreeNode root = createSkewedLeftTree();
        assertEquals(Arrays.asList(1, 2, 3), solutions.preorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Preorder Traversal: Skewed Right Tree")
    void testPreorderTraversalMorris_SkewedRight() {
        TreeNode root = createSkewedRightTree();
        assertEquals(Arrays.asList(1, 2, 3), solutions.preorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Preorder Traversal: Single Right Child Tree")
    void testPreorderTraversalMorris_SingleRightChild() {
        TreeNode root = createSingleRightChildTree();
        assertEquals(Arrays.asList(1, 2), solutions.preorderTraversalMorris(root));
    }

    @Test
    @DisplayName("Morris Preorder Traversal: Single Left Child Tree")
    void testPreorderTraversalMorris_SingleLeftChild() {
        TreeNode root = createSingleLeftChildTree();
        assertEquals(Arrays.asList(1, 2), solutions.preorderTraversalMorris(root));
    }
}
```