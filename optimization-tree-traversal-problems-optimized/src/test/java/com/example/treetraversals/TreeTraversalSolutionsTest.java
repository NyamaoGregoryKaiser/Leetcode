```java
package com.example.treetraversals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("TreeTraversalSolutions Tests")
class TreeTraversalSolutionsTest {

    private TreeTraversalSolutions solutions;

    @BeforeEach
    void setUp() {
        solutions = new TreeTraversalSolutions();
    }

    // Helper to compare List<List<Integer>>
    private void assertListOfListsEquals(List<List<Integer>> expected, List<List<Integer>> actual) {
        assertEquals(expected.size(), actual.size(), "Number of levels mismatch");
        for (int i = 0; i < expected.size(); i++) {
            assertEquals(expected.get(i), actual.get(i), "Level " + i + " mismatch");
        }
    }

    /*
     * Tests for Standard Traversals (Recursive)
     */

    @Test
    @DisplayName("Preorder Traversal Recursive: Empty Tree")
    void testPreorderTraversalRecursive_Empty() {
        assertEquals(Collections.emptyList(), solutions.preorderTraversalRecursive(null));
    }

    @Test
    @DisplayName("Preorder Traversal Recursive: Single Node Tree")
    void testPreorderTraversalRecursive_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Traversal Recursive: Complete Tree")
    void testPreorderTraversalRecursive_CompleteTree() {
        // Tree:    1
        //         / \
        //        2   3
        //       / \
        //      4   5
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, 3, 4, 5, null, null});
        assertEquals(Arrays.asList(1, 2, 4, 5, 3), solutions.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Preorder Traversal Recursive: Skewed Left Tree")
    void testPreorderTraversalRecursive_SkewedLeft() {
        // Tree:    1
        //         /
        //        2
        //       /
        //      3
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, 3, null, null, null});
        assertEquals(Arrays.asList(1, 2, 3), solutions.preorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Traversal Recursive: Empty Tree")
    void testInorderTraversalRecursive_Empty() {
        assertEquals(Collections.emptyList(), solutions.inorderTraversalRecursive(null));
    }

    @Test
    @DisplayName("Inorder Traversal Recursive: Single Node Tree")
    void testInorderTraversalRecursive_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Traversal Recursive: Complete Tree")
    void testInorderTraversalRecursive_CompleteTree() {
        // Tree:    1
        //         / \
        //        2   3
        //       / \
        //      4   5
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, 3, 4, 5, null, null});
        assertEquals(Arrays.asList(4, 2, 5, 1, 3), solutions.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Inorder Traversal Recursive: Skewed Right Tree")
    void testInorderTraversalRecursive_SkewedRight() {
        // Tree:    1
        //           \
        //            2
        //             \
        //              3
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, null, 2, null, null, null, 3});
        assertEquals(Arrays.asList(1, 2, 3), solutions.inorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Traversal Recursive: Empty Tree")
    void testPostorderTraversalRecursive_Empty() {
        assertEquals(Collections.emptyList(), solutions.postorderTraversalRecursive(null));
    }

    @Test
    @DisplayName("Postorder Traversal Recursive: Single Node Tree")
    void testPostorderTraversalRecursive_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Traversal Recursive: Complete Tree")
    void testPostorderTraversalRecursive_CompleteTree() {
        // Tree:    1
        //         / \
        //        2   3
        //       / \
        //      4   5
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, 3, 4, 5, null, null});
        assertEquals(Arrays.asList(4, 5, 2, 3, 1), solutions.postorderTraversalRecursive(root));
    }

    @Test
    @DisplayName("Postorder Traversal Recursive: Skewed Left Tree")
    void testPostorderTraversalRecursive_SkewedLeft() {
        // Tree:    1
        //         /
        //        2
        //       /
        //      3
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, 3, null, null, null});
        assertEquals(Arrays.asList(3, 2, 1), solutions.postorderTraversalRecursive(root));
    }

    /*
     * Tests for Level Order Traversal
     */

    @Test
    @DisplayName("Level Order Traversal: Empty Tree")
    void testLevelOrderTraversal_Empty() {
        assertTrue(solutions.levelOrderTraversal(null).isEmpty());
    }

    @Test
    @DisplayName("Level Order Traversal: Single Node Tree")
    void testLevelOrderTraversal_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertListOfListsEquals(Arrays.asList(Arrays.asList(1)), solutions.levelOrderTraversal(root));
    }

    @Test
    @DisplayName("Level Order Traversal: Complete Tree")
    void testLevelOrderTraversal_CompleteTree() {
        // Tree:    3
        //         / \
        //        9  20
        //       /  \
        //      15   7
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(3),
                Arrays.asList(9, 20),
                Arrays.asList(15, 7)
        );
        assertListOfListsEquals(expected, solutions.levelOrderTraversal(root));
    }

    @Test
    @DisplayName("Level Order Traversal: Skewed Right Tree")
    void testLevelOrderTraversal_SkewedRight() {
        // Tree:    1
        //           \
        //            2
        //             \
        //              3
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, null, 2, null, null, null, 3});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(2),
                Arrays.asList(3)
        );
        assertListOfListsEquals(expected, solutions.levelOrderTraversal(root));
    }

    /*
     * Tests for Zigzag Level Order Traversal
     */

    @Test
    @DisplayName("Zigzag Level Order Traversal: Empty Tree")
    void testZigzagLevelOrderTraversal_Empty() {
        assertTrue(solutions.zigzagLevelOrderTraversal(null).isEmpty());
    }

    @Test
    @DisplayName("Zigzag Level Order Traversal: Single Node Tree")
    void testZigzagLevelOrderTraversal_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertListOfListsEquals(Arrays.asList(Arrays.asList(1)), solutions.zigzagLevelOrderTraversal(root));
    }

    @Test
    @DisplayName("Zigzag Level Order Traversal: Complex Tree")
    void testZigzagLevelOrderTraversal_ComplexTree() {
        // Tree:      3
        //           / \
        //          9  20
        //         / \  / \
        //        6  10 15 7
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{3, 9, 20, 6, 10, 15, 7});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(3),          // L->R
                Arrays.asList(20, 9),      // R->L
                Arrays.asList(6, 10, 15, 7) // L->R
        );
        assertListOfListsEquals(expected, solutions.zigzagLevelOrderTraversal(root));
    }

    @Test
    @DisplayName("Zigzag Level Order Traversal: Another Complex Tree")
    void testZigzagLevelOrderTraversal_AnotherComplexTree() {
        // Tree:      1
        //           / \
        //          2   3
        //         / \ / \
        //        4  5 6  7
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, 3, 4, 5, 6, 7});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(3, 2),
                Arrays.asList(4, 5, 6, 7)
        );
        assertListOfListsEquals(expected, solutions.zigzagLevelOrderTraversal(root));
    }

    /*
     * Tests for Boundary Traversal
     */

    @Test
    @DisplayName("Boundary Traversal: Empty Tree")
    void testBoundaryTraversal_Empty() {
        assertEquals(Collections.emptyList(), solutions.boundaryTraversal(null));
    }

    @Test
    @DisplayName("Boundary Traversal: Single Node Tree")
    void testBoundaryTraversal_SingleNode() {
        TreeNode root = new TreeNode(1);
        assertEquals(Arrays.asList(1), solutions.boundaryTraversal(root));
    }

    @Test
    @DisplayName("Boundary Traversal: Complex Tree")
    void testBoundaryTraversal_ComplexTree() {
        // Tree:       20
        //            /   \
        //           8     22
        //          / \     \
        //         4   12    25
        //            /  \
        //           10  14
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{20, 8, 22, 4, 12, null, 25, null, null, 10, 14});
        List<Integer> expected = Arrays.asList(20, 8, 4, 10, 14, 25, 22);
        assertEquals(expected, solutions.boundaryTraversal(root));
    }

    @Test
    @DisplayName("Boundary Traversal: Tree with missing children")
    void testBoundaryTraversal_MissingChildren() {
        // Tree:       1
        //            /
        //           2
        //            \
        //             3
        //            /
        //           4
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, null, 3, 4, null});
        List<Integer> expected = Arrays.asList(1, 2, 4, 3);
        assertEquals(expected, solutions.boundaryTraversal(root));
    }

    @Test
    @DisplayName("Boundary Traversal: Tree with no left boundary but has right")
    void testBoundaryTraversal_NoLeftBoundary() {
        // Tree:       1
        //              \
        //               2
        //              / \
        //             3   4
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, null, 2, 3, 4});
        List<Integer> expected = Arrays.asList(1, 3, 4, 2);
        assertEquals(expected, solutions.boundaryTraversal(root));
    }

    @Test
    @DisplayName("Boundary Traversal: Tree with no right boundary but has left")
    void testBoundaryTraversal_NoRightBoundary() {
        // Tree:       1
        //            /
        //           2
        //          / \
        //         3   4
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, 3, 4});
        List<Integer> expected = Arrays.asList(1, 2, 3, 4);
        assertEquals(expected, solutions.boundaryTraversal(root));
    }

    /*
     * Tests for Flatten Binary Tree to Linked List
     */

    @Test
    @DisplayName("Flatten Tree: Empty Tree")
    void testFlatten_Empty() {
        TreeNode root = null;
        solutions.flatten(root);
        assertNull(root);
    }

    @Test
    @DisplayName("Flatten Tree: Single Node Tree")
    void testFlatten_SingleNode() {
        TreeNode root = new TreeNode(1);
        solutions.flatten(root);
        assertEquals(1, root.val);
        assertNull(root.left);
        assertNull(root.right);
    }

    @Test
    @DisplayName("Flatten Tree: Example Tree")
    void testFlatten_ExampleTree() {
        // Original Tree:
        //       1
        //      / \
        //     2   5
        //    / \   \
        //   3   4   6
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, 5, 3, 4, null, 6});

        solutions.flatten(root);

        // Expected flattened list: 1 -> 2 -> 3 -> 4 -> 5 -> 6
        // Use serializeTreeToArray to verify the structure
        List<Integer> expectedSerialization = Arrays.asList(1, null, 2, null, 3, null, 4, null, 5, null, 6);
        assertEquals(expectedSerialization, TreeUtils.serializeTreeToArray(root));

        // Manual check for linked list structure
        assertEquals(1, root.val);
        assertNull(root.left);
        assertEquals(2, root.right.val);
        assertNull(root.right.left);
        assertEquals(3, root.right.right.val);
        assertNull(root.right.right.left);
        assertEquals(4, root.right.right.right.val);
        assertNull(root.right.right.right.left);
        assertEquals(5, root.right.right.right.right.val);
        assertNull(root.right.right.right.right.left);
        assertEquals(6, root.right.right.right.right.right.val);
        assertNull(root.right.right.right.right.right.left);
        assertNull(root.right.right.right.right.right.right);
    }

    @Test
    @DisplayName("Flatten Tree: Skewed Left Tree")
    void testFlatten_SkewedLeft() {
        // Original:  1
        //           /
        //          2
        //         /
        //        3
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, 3, null, null, null});
        solutions.flatten(root);

        // Expected: 1 -> 2 -> 3
        List<Integer> expectedSerialization = Arrays.asList(1, null, 2, null, 3);
        assertEquals(expectedSerialization, TreeUtils.serializeTreeToArray(root));
    }

    @Test
    @DisplayName("Flatten Tree: Skewed Right Tree")
    void testFlatten_SkewedRight() {
        // Original:  1
        //             \
        //              2
        //               \
        //                3
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, null, 2, null, null, null, 3});
        solutions.flatten(root);

        // Expected: 1 -> 2 -> 3
        List<Integer> expectedSerialization = Arrays.asList(1, null, 2, null, 3);
        assertEquals(expectedSerialization, TreeUtils.serializeTreeToArray(root));
    }

    @Test
    @DisplayName("Flatten Tree: Tree with only left children, then a right child")
    void testFlatten_LeftThenRight() {
        // Original:
        //       1
        //      /
        //     2
        //    / \
        //   3   4
        TreeNode root = TreeUtils.buildTreeFromArray(new Integer[]{1, 2, null, 3, 4});
        solutions.flatten(root);

        // Expected: 1 -> 2 -> 3 -> 4
        List<Integer> expectedSerialization = Arrays.asList(1, null, 2, null, 3, null, 4);
        assertEquals(expectedSerialization, TreeUtils.serializeTreeToArray(root));
    }
}
```