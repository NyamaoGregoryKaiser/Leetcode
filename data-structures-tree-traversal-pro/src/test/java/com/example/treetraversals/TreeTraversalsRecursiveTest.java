```java
package com.example.treetraversals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TreeTraversalsRecursiveTest {

    private TreeTraversalsRecursive traversals;

    @BeforeEach
    void setUp() {
        traversals = new TreeTraversalsRecursive();
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

    // --- Level Order Traversal Tests ---
    @Test
    void testLevelOrderTraversal_simpleTree() {
        // Tree:
        //      3
        //     / \
        //    9  20
        //       / \
        //      15  7
        TreeNode root = TreeNode.fromArray(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(3),
                Arrays.asList(9, 20),
                Arrays.asList(15, 7)
        );
        assertEquals(expected, traversals.levelOrder(root));
    }

    @Test
    void testLevelOrderTraversal_emptyTree() {
        TreeNode root = null;
        List<List<Integer>> expected = Collections.emptyList();
        assertTrue(traversals.levelOrder(root).isEmpty());
    }

    @Test
    void testLevelOrderTraversal_singleNodeTree() {
        TreeNode root = new TreeNode(1);
        List<List<Integer>> expected = Collections.singletonList(Collections.singletonList(1));
        assertEquals(expected, traversals.levelOrder(root));
    }

    @Test
    void testLevelOrderTraversal_fullBinaryTree() {
        // Tree:
        //        1
        //       / \
        //      2   3
        //     / \ / \
        //    4  5 6  7
        TreeNode root = TreeNode.fromArray(new Integer[]{1, 2, 3, 4, 5, 6, 7});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(1),
                Arrays.asList(2, 3),
                Arrays.asList(4, 5, 6, 7)
        );
        assertEquals(expected, traversals.levelOrder(root));
    }

    @Test
    void testLevelOrderTraversal_unbalancedTree() {
        // Tree:
        //       1
        //      / \
        //     2   3
        //    /     \
        //   4       5
        TreeNode root = TreeNode.fromArray(new Integer[]{1, 2, 3, 4, null, null, 5});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(1),
                Arrays.asList(2, 3),
                Arrays.asList(4, 5)
        );
        assertEquals(expected, traversals.levelOrder(root));
    }

    // --- Zigzag Level Order Traversal Tests ---
    @Test
    void testZigzagLevelOrder_simpleTree() {
        // Tree:
        //      3
        //     / \
        //    9  20
        //       / \
        //      15  7
        // Expected: [3], [20, 9], [15, 7]
        TreeNode root = TreeNode.fromArray(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(3),
                Arrays.asList(20, 9),
                Arrays.asList(15, 7)
        );
        assertEquals(expected, traversals.zigzagLevelOrder(root));
    }

    @Test
    void testZigzagLevelOrder_emptyTree() {
        TreeNode root = null;
        List<List<Integer>> expected = Collections.emptyList();
        assertTrue(traversals.zigzagLevelOrder(root).isEmpty());
    }

    @Test
    void testZigzagLevelOrder_singleNodeTree() {
        TreeNode root = new TreeNode(1);
        List<List<Integer>> expected = Collections.singletonList(Collections.singletonList(1));
        assertEquals(expected, traversals.zigzagLevelOrder(root));
    }

    @Test
    void testZigzagLevelOrder_fullBinaryTree() {
        // Tree:
        //        1
        //       / \
        //      2   3
        //     / \ / \
        //    4  5 6  7
        // Expected: [1], [3, 2], [4, 5, 6, 7]
        TreeNode root = TreeNode.fromArray(new Integer[]{1, 2, 3, 4, 5, 6, 7});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(1),
                Arrays.asList(3, 2),
                Arrays.asList(4, 5, 6, 7)
        );
        assertEquals(expected, traversals.zigzagLevelOrder(root));
    }

    @Test
    void testZigzagLevelOrder_unbalancedTree() {
        // Tree:
        //       1
        //      / \
        //     2   3
        //    /     \
        //   4       5
        // Expected: [1], [3, 2], [4, 5]
        TreeNode root = TreeNode.fromArray(new Integer[]{1, 2, 3, 4, null, null, 5});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(1),
                Arrays.asList(3, 2),
                Arrays.asList(4, 5)
        );
        assertEquals(expected, traversals.zigzagLevelOrder(root));
    }

    @Test
    void testZigzagLevelOrder_complexTree() {
        // Tree:
        //           10
        //          /  \
        //         5    15
        //        / \   / \
        //       2   7 12  18
        // Expected: [10], [15, 5], [2, 7, 12, 18]
        TreeNode root = TreeNode.fromArray(new Integer[]{10, 5, 15, 2, 7, 12, 18});
        List<List<Integer>> expected = Arrays.asList(
                Collections.singletonList(10),
                Arrays.asList(15, 5),
                Arrays.asList(2, 7, 12, 18)
        );
        assertEquals(expected, traversals.zigzagLevelOrder(root));
    }
}
```