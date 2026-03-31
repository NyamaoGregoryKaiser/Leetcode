```java
package tree_traversals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tree_traversals.util.TreeBuilder;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Extensive test suite for TreeTraversal algorithms.
 * Covers various tree structures: empty, single node, balanced, skewed, and general cases.
 */
public class TreeTraversalsTest {

    private TreeTraversals treeTraversals;
    private IterativeTreeTraversals iterativeTreeTraversals;
    private MorrisTreeTraversals morrisTreeTraversals;

    @BeforeEach
    void setUp() {
        treeTraversals = new TreeTraversals();
        iterativeTreeTraversals = new IterativeTreeTraversals();
        morrisTreeTraversals = new MorrisTreeTraversals();
    }

    // --- Helper for creating a deep copy of a tree for Morris Traversal tests ---
    private TreeNode copyTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode newRoot = new TreeNode(root.val);
        newRoot.left = copyTree(root.left);
        newRoot.right = copyTree(root.right);
        return newRoot;
    }

    // --- Test Data ---
    // Example tree:
    //      3
    //     / \
    //    9  20
    //       / \
    //      15  7
    private final TreeNode exampleTree = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
    private final List<Integer> inorderExample = Arrays.asList(9, 3, 15, 20, 7);
    private final List<Integer> preorderExample = Arrays.asList(3, 9, 20, 15, 7);
    private final List<Integer> postorderExample = Arrays.asList(9, 15, 7, 20, 3);
    private final List<List<Integer>> levelOrderExample = Arrays.asList(
            Arrays.asList(3),
            Arrays.asList(9, 20),
            Arrays.asList(15, 7)
    );
    private final List<List<Integer>> zigzagLevelOrderExample = Arrays.asList(
            Arrays.asList(3),
            Arrays.asList(20, 9),
            Arrays.asList(15, 7)
    );
    private final List<Integer> rightSideViewExample = Arrays.asList(3, 20, 7);
    private final List<List<Integer>> verticalOrderExample = Arrays.asList(
            Arrays.asList(9),
            Arrays.asList(3, 15),
            Arrays.asList(20),
            Arrays.asList(7)
    );

    // Skewed left tree:
    //     1
    //    /
    //   2
    //  /
    // 3
    private final TreeNode skewedLeftTree = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3});
    private final List<Integer> inorderSkewedLeft = Arrays.asList(3, 2, 1);
    private final List<Integer> preorderSkewedLeft = Arrays.asList(1, 2, 3);
    private final List<Integer> postorderSkewedLeft = Arrays.asList(3, 2, 1);
    private final List<List<Integer>> levelOrderSkewedLeft = Arrays.asList(
            Arrays.asList(1),
            Arrays.asList(2),
            Arrays.asList(3)
    );
    private final List<Integer> rightSideViewSkewedLeft = Arrays.asList(1, 2, 3);
    private final List<List<Integer>> verticalOrderSkewedLeft = Arrays.asList(
            Arrays.asList(3),
            Arrays.asList(2),
            Arrays.asList(1)
    );


    // Skewed right tree:
    // 1
    //  \
    //   2
    //    \
    //     3
    private final TreeNode skewedRightTree = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, 3});
    private final List<Integer> inorderSkewedRight = Arrays.asList(1, 2, 3);
    private final List<Integer> preorderSkewedRight = Arrays.asList(1, 2, 3);
    private final List<Integer> postorderSkewedRight = Arrays.asList(3, 2, 1);
    private final List<List<Integer>> levelOrderSkewedRight = Arrays.asList(
            Arrays.asList(1),
            Arrays.asList(2),
            Arrays.asList(3)
    );
    private final List<Integer> rightSideViewSkewedRight = Arrays.asList(1, 2, 3);
    private final List<List<Integer>> verticalOrderSkewedRight = Arrays.asList(
            Arrays.asList(1),
            Arrays.asList(2),
            Arrays.asList(3)
    );


    // Full binary tree:
    //      1
    //     / \
    //    2   3
    //   / \ / \
    //  4  5 6  7
    private final TreeNode fullTree = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, 6, 7});
    private final List<Integer> inorderFull = Arrays.asList(4, 2, 5, 1, 6, 3, 7);
    private final List<Integer> preorderFull = Arrays.asList(1, 2, 4, 5, 3, 6, 7);
    private final List<Integer> postorderFull = Arrays.asList(4, 5, 2, 6, 7, 3, 1);
    private final List<List<Integer>> levelOrderFull = Arrays.asList(
            Arrays.asList(1),
            Arrays.asList(2, 3),
            Arrays.asList(4, 5, 6, 7)
    );
    private final List<List<Integer>> zigzagLevelOrderFull = Arrays.asList(
            Arrays.asList(1),
            Arrays.asList(3, 2),
            Arrays.asList(4, 5, 6, 7)
    );
    private final List<Integer> rightSideViewFull = Arrays.asList(1, 3, 7);
    private final List<List<Integer>> verticalOrderFull = Arrays.asList(
            Arrays.asList(4),
            Arrays.asList(2),
            Arrays.asList(1, 5, 6),
            Arrays.asList(3),
            Arrays.asList(7)
    );

    // --- TreeNode for BST tests ---
    //      5
    //     / \
    //    3   8
    //   / \ / \
    //  2  4 7  9
    private final TreeNode bstTree = TreeBuilder.buildTree(new Integer[]{5, 3, 8, 2, 4, 7, 9});


    // --- Test Cases for Standard Traversals (Recursive & Iterative) ---

    @Test
    void testInorderTraversalRecursive() {
        assertEquals(Collections.emptyList(), treeTraversals.inorderTraversalRecursive(null));
        assertEquals(Arrays.asList(1), treeTraversals.inorderTraversalRecursive(new TreeNode(1)));
        assertEquals(inorderExample, treeTraversals.inorderTraversalRecursive(exampleTree));
        assertEquals(inorderSkewedLeft, treeTraversals.inorderTraversalRecursive(skewedLeftTree));
        assertEquals(inorderSkewedRight, treeTraversals.inorderTraversalRecursive(skewedRightTree));
        assertEquals(inorderFull, treeTraversals.inorderTraversalRecursive(fullTree));
    }

    @Test
    void testInorderTraversalIterative() {
        assertEquals(Collections.emptyList(), treeTraversals.inorderTraversalIterative(null));
        assertEquals(Arrays.asList(1), treeTraversals.inorderTraversalIterative(new TreeNode(1)));
        assertEquals(inorderExample, treeTraversals.inorderTraversalIterative(exampleTree));
        assertEquals(inorderSkewedLeft, treeTraversals.inorderTraversalIterative(skewedLeftTree));
        assertEquals(inorderSkewedRight, treeTraversals.inorderTraversalIterative(skewedRightTree));
        assertEquals(inorderFull, treeTraversals.inorderTraversalIterative(fullTree));
    }

    @Test
    void testPreorderTraversalRecursive() {
        assertEquals(Collections.emptyList(), treeTraversals.preorderTraversalRecursive(null));
        assertEquals(Arrays.asList(1), treeTraversals.preorderTraversalRecursive(new TreeNode(1)));
        assertEquals(preorderExample, treeTraversals.preorderTraversalRecursive(exampleTree));
        assertEquals(preorderSkewedLeft, treeTraversals.preorderTraversalRecursive(skewedLeftTree));
        assertEquals(preorderSkewedRight, treeTraversals.preorderTraversalRecursive(skewedRightTree));
        assertEquals(preorderFull, treeTraversals.preorderTraversalRecursive(fullTree));
    }

    @Test
    void testPreorderTraversalIterative() {
        assertEquals(Collections.emptyList(), treeTraversals.preorderTraversalIterative(null));
        assertEquals(Arrays.asList(1), treeTraversals.preorderTraversalIterative(new TreeNode(1)));
        assertEquals(preorderExample, treeTraversals.preorderTraversalIterative(exampleTree));
        assertEquals(preorderSkewedLeft, treeTraversals.preorderTraversalIterative(skewedLeftTree));
        assertEquals(preorderSkewedRight, treeTraversals.preorderTraversalIterative(skewedRightTree));
        assertEquals(preorderFull, treeTraversals.preorderTraversalIterative(fullTree));
    }

    @Test
    void testPostorderTraversalRecursive() {
        assertEquals(Collections.emptyList(), treeTraversals.postorderTraversalRecursive(null));
        assertEquals(Arrays.asList(1), treeTraversals.postorderTraversalRecursive(new TreeNode(1)));
        assertEquals(postorderExample, treeTraversals.postorderTraversalRecursive(exampleTree));
        assertEquals(postorderSkewedLeft, treeTraversals.postorderTraversalRecursive(skewedLeftTree));
        assertEquals(postorderSkewedRight, treeTraversals.postorderTraversalRecursive(skewedRightTree));
        assertEquals(postorderFull, treeTraversals.postorderTraversalRecursive(fullTree));
    }

    @Test
    void testPostorderTraversalIterativeTwoStacks() {
        assertEquals(Collections.emptyList(), treeTraversals.postorderTraversalIterativeTwoStacks(null));
        assertEquals(Arrays.asList(1), treeTraversals.postorderTraversalIterativeTwoStacks(new TreeNode(1)));
        assertEquals(postorderExample, treeTraversals.postorderTraversalIterativeTwoStacks(exampleTree));
        assertEquals(postorderSkewedLeft, treeTraversals.postorderTraversalIterativeTwoStacks(skewedLeftTree));
        assertEquals(postorderSkewedRight, treeTraversals.postorderTraversalIterativeTwoStacks(skewedRightTree));
        assertEquals(postorderFull, treeTraversals.postorderTraversalIterativeTwoStacks(fullTree));
    }

    @Test
    void testPostorderTraversalIterativeOneStack() {
        assertEquals(Collections.emptyList(), treeTraversals.postorderTraversalIterativeOneStack(null));
        assertEquals(Arrays.asList(1), treeTraversals.postorderTraversalIterativeOneStack(new TreeNode(1)));
        assertEquals(postorderExample, treeTraversals.postorderTraversalIterativeOneStack(exampleTree));
        assertEquals(postorderSkewedLeft, treeTraversals.postorderTraversalIterativeOneStack(skewedLeftTree));
        assertEquals(postorderSkewedRight, treeTraversals.postorderTraversalIterativeOneStack(skewedRightTree));
        assertEquals(postorderFull, treeTraversals.postorderTraversalIterativeOneStack(fullTree));
    }

    // --- Test Cases for BFS Traversals ---

    @Test
    void testLevelOrderTraversal() {
        assertEquals(Collections.emptyList(), treeTraversals.levelOrderTraversal(null));
        assertEquals(Collections.singletonList(Collections.singletonList(1)), treeTraversals.levelOrderTraversal(new TreeNode(1)));
        assertEquals(levelOrderExample, treeTraversals.levelOrderTraversal(exampleTree));
        assertEquals(levelOrderSkewedLeft, treeTraversals.levelOrderTraversal(skewedLeftTree));
        assertEquals(levelOrderSkewedRight, treeTraversals.levelOrderTraversal(skewedRightTree));
        assertEquals(levelOrderFull, treeTraversals.levelOrderTraversal(fullTree));
    }

    @Test
    void testZigzagLevelOrderTraversal() {
        assertEquals(Collections.emptyList(), treeTraversals.zigzagLevelOrderTraversal(null));
        assertEquals(Collections.singletonList(Collections.singletonList(1)), treeTraversals.zigzagLevelOrderTraversal(new TreeNode(1)));
        assertEquals(zigzagLevelOrderExample, treeTraversals.zigzagLevelOrderTraversal(exampleTree));
        assertEquals(levelOrderSkewedLeft, treeTraversals.zigzagLevelOrderTraversal(skewedLeftTree)); // Still L-R for single child levels
        assertEquals(levelOrderSkewedRight, treeTraversals.zigzagLevelOrderTraversal(skewedRightTree)); // Still L-R for single child levels
        assertEquals(zigzagLevelOrderFull, treeTraversals.zigzagLevelOrderTraversal(fullTree));
    }

    @Test
    void testRightSideView() {
        assertEquals(Collections.emptyList(), treeTraversals.rightSideView(null));
        assertEquals(Arrays.asList(1), treeTraversals.rightSideView(new TreeNode(1)));
        assertEquals(rightSideViewExample, treeTraversals.rightSideView(exampleTree));
        assertEquals(rightSideViewSkewedLeft, treeTraversals.rightSideView(skewedLeftTree));
        assertEquals(rightSideViewSkewedRight, treeTraversals.rightSideView(skewedRightTree));
        assertEquals(rightSideViewFull, treeTraversals.rightSideView(fullTree));
    }

    @Test
    void testVerticalOrderTraversal() {
        assertEquals(Collections.emptyList(), treeTraversals.verticalOrderTraversal(null));
        assertEquals(Collections.singletonList(Collections.singletonList(1)), treeTraversals.verticalOrderTraversal(new TreeNode(1)));
        assertEquals(verticalOrderExample, treeTraversals.verticalOrderTraversal(exampleTree));
        assertEquals(verticalOrderSkewedLeft, treeTraversals.verticalOrderTraversal(skewedLeftTree));
        assertEquals(verticalOrderSkewedRight, treeTraversals.verticalOrderTraversal(skewedRightTree));
        assertEquals(verticalOrderFull, treeTraversals.verticalOrderTraversal(fullTree));

        // Test with a tree having nodes at same column & row but different values (should be sorted by value)
        //       1
        //      / \
        //     2   3
        //    /     \
        //   4       5
        //    \     /
        //     6   7
        // Vertical order: [4], [2], [1, 6, 7 (sorted)], [3], [5]
        TreeNode complexVerticalTree = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, null, null, 5, null, 6, 7});
        List<List<Integer>> expectedComplexVertical = Arrays.asList(
                Arrays.asList(4),
                Arrays.asList(2, 6), // 2 at (col -1, row 1), 6 at (col -1, row 3)
                Arrays.asList(1, 7), // 1 at (col 0, row 0), 7 at (col 0, row 3) - but 7 comes from right path of 5
                Arrays.asList(3),
                Arrays.asList(5)
        );
        // Let's re-evaluate vertical order for complexVerticalTree
        // Node (val, col, row)
        // (1, 0, 0)
        // (2, -1, 1), (3, 1, 1)
        // (4, -2, 2), (5, 2, 2) (null children of 2 and 3)
        // (6, -1, 3) (child of 4)
        // (7, 1, 3) (child of 5)

        // Column -2: [4]
        // Column -1: [2, 6] (2 at row 1, 6 at row 3)
        // Column 0:  [1] (1 at row 0)
        // Column 1:  [3, 7] (3 at row 1, 7 at row 3)
        // Column 2:  [5]

        List<List<Integer>> expectedComplexVerticalCorrected = Arrays.asList(
                Arrays.asList(4),
                Arrays.asList(2, 6),
                Arrays.asList(1), // No other node at col 0, row 0 to sort with.
                Arrays.asList(3, 7),
                Arrays.asList(5)
        );
        assertEquals(expectedComplexVerticalCorrected, treeTraversals.verticalOrderTraversal(complexVerticalTree));
    }


    // --- Test Cases for IterativeTreeTraversals ---

    @Test
    void testKthSmallestInBSTIterative() {
        // Null root case
        assertThrows(IllegalArgumentException.class, () -> iterativeTreeTraversals.kthSmallestInBSTIterative(null, 1));

        // Single node
        assertEquals(1, iterativeTreeTraversals.kthSmallestInBSTIterative(new TreeNode(1), 1));

        // Skewed left (BST property: left < root)
        //  3
        // /
        // 2
        // /
        // 1
        TreeNode skewedBSTLeft = TreeBuilder.buildTree(new Integer[]{3, 2, null, 1});
        assertEquals(1, iterativeTreeTraversals.kthSmallestInBSTIterative(skewedBSTLeft, 1));
        assertEquals(2, iterativeTreeTraversals.kthSmallestInBSTIterative(skewedBSTLeft, 2));
        assertEquals(3, iterativeTreeTraversals.kthSmallestInBSTIterative(skewedBSTLeft, 3));

        // Skewed right (BST property: right > root)
        // 1
        //  \
        //   2
        //    \
        //     3
        TreeNode skewedBSTRight = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        assertEquals(1, iterativeTreeTraversals.kthSmallestInBSTIterative(skewedBSTRight, 1));
        assertEquals(2, iterativeTreeTraversals.kthSmallestInBSTIterative(skewedBSTRight, 2));
        assertEquals(3, iterativeTreeTraversals.kthSmallestInBSTIterative(skewedBSTRight, 3));


        // General BST
        assertEquals(2, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 1));
        assertEquals(3, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 2));
        assertEquals(4, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 3));
        assertEquals(5, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 4));
        assertEquals(7, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 5));
        assertEquals(8, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 6));
        assertEquals(9, iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 7));

        // K out of bounds
        assertThrows(IllegalArgumentException.class, () -> iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 0));
        assertThrows(IllegalArgumentException.class, () -> iterativeTreeTraversals.kthSmallestInBSTIterative(bstTree, 8));
    }

    @Test
    void testHasPathSumIterativeDFS() {
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeDFS(null, 0));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeDFS(null, 10));

        // Single node tree
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeDFS(new TreeNode(5), 5));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeDFS(new TreeNode(5), 10));

        // Example Tree:
        //      3
        //     / \
        //    9  20
        //       / \
        //      15  7
        // Paths: 3->9 (12), 3->20->15 (38), 3->20->7 (30)
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeDFS(exampleTree, 12));
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeDFS(exampleTree, 38));
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeDFS(exampleTree, 30));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeDFS(exampleTree, 10)); // No path for 10
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeDFS(exampleTree, 23)); // No path for 23

        // Tree with negative numbers
        //      10
        //     /  \
        //    5   -3
        //   / \    \
        //  3   2   11
        // Paths: 10->5->3 (18), 10->5->2 (17), 10->-3->11 (18)
        TreeNode negativeTree = TreeBuilder.buildTree(new Integer[]{10, 5, -3, 3, 2, null, 11});
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeDFS(negativeTree, 18));
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeDFS(negativeTree, 17));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeDFS(negativeTree, 20));
    }

    @Test
    void testHasPathSumIterativeBFS() {
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeBFS(null, 0));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeBFS(null, 10));

        assertTrue(iterativeTreeTraversals.hasPathSumIterativeBFS(new TreeNode(5), 5));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeBFS(new TreeNode(5), 10));

        assertTrue(iterativeTreeTraversals.hasPathSumIterativeBFS(exampleTree, 12));
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeBFS(exampleTree, 38));
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeBFS(exampleTree, 30));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeBFS(exampleTree, 10));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeBFS(exampleTree, 23));

        TreeNode negativeTree = TreeBuilder.buildTree(new Integer[]{10, 5, -3, 3, 2, null, 11});
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeBFS(negativeTree, 18));
        assertTrue(iterativeTreeTraversals.hasPathSumIterativeBFS(negativeTree, 17));
        assertFalse(iterativeTreeTraversals.hasPathSumIterativeBFS(negativeTree, 20));
    }


    @Test
    void testFlattenIterative() {
        // Null tree
        TreeNode nullTree = null;
        iterativeTreeTraversals.flattenIterative(nullTree);
        assertNull(nullTree); // Should remain null

        // Single node tree
        TreeNode singleNode = new TreeNode(1);
        iterativeTreeTraversals.flattenIterative(singleNode);
        assertNull(singleNode.left);
        assertNull(singleNode.right);
        assertEquals(1, singleNode.val);

        // Example tree:
        //      3
        //     / \
        //    9  20
        //       / \
        //      15  7
        // Flattened should be: 3 -> 9 -> 20 -> 15 -> 7
        TreeNode exampleTreeCopy = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        iterativeTreeTraversals.flattenIterative(exampleTreeCopy);
        assertFlattenedTree(exampleTreeCopy, Arrays.asList(3, 9, 20, 15, 7));

        // Skewed left tree: 1 -> 2 -> 3
        TreeNode skewedLeftTreeCopy = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3});
        iterativeTreeTraversals.flattenIterative(skewedLeftTreeCopy);
        assertFlattenedTree(skewedLeftTreeCopy, Arrays.asList(1, 2, 3));

        // Skewed right tree: 1 -> 2 -> 3
        TreeNode skewedRightTreeCopy = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        iterativeTreeTraversals.flattenIterative(skewedRightTreeCopy);
        assertFlattenedTree(skewedRightTreeCopy, Arrays.asList(1, 2, 3));

        // Full tree: 1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7
        TreeNode fullTreeCopy = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, 6, 7});
        iterativeTreeTraversals.flattenIterative(fullTreeCopy);
        assertFlattenedTree(fullTreeCopy, Arrays.asList(1, 2, 4, 5, 3, 6, 7));
    }

    @Test
    void testFlattenIterativeO1Space() {
        // Null tree
        TreeNode nullTree = null;
        iterativeTreeTraversals.flattenIterativeO1Space(nullTree);
        assertNull(nullTree); // Should remain null

        // Single node tree
        TreeNode singleNode = new TreeNode(1);
        iterativeTreeTraversals.flattenIterativeO1Space(singleNode);
        assertNull(singleNode.left);
        assertNull(singleNode.right);
        assertEquals(1, singleNode.val);

        // Example tree:
        //      3
        //     / \
        //    9  20
        //       / \
        //      15  7
        // Flattened should be: 3 -> 9 -> 20 -> 15 -> 7
        TreeNode exampleTreeCopy = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        iterativeTreeTraversals.flattenIterativeO1Space(exampleTreeCopy);
        assertFlattenedTree(exampleTreeCopy, Arrays.asList(3, 9, 20, 15, 7));

        // Skewed left tree: 1 -> 2 -> 3
        TreeNode skewedLeftTreeCopy = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3});
        iterativeTreeTraversals.flattenIterativeO1Space(skewedLeftTreeCopy);
        assertFlattenedTree(skewedLeftTreeCopy, Arrays.asList(1, 2, 3));

        // Skewed right tree: 1 -> 2 -> 3
        TreeNode skewedRightTreeCopy = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3});
        iterativeTreeTraversals.flattenIterativeO1Space(skewedRightTreeCopy);
        assertFlattenedTree(skewedRightTreeCopy, Arrays.asList(1, 2, 3));

        // Full tree: 1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7
        TreeNode fullTreeCopy = TreeBuilder.buildTree(new Integer[]{1, 2, 3, 4, 5, 6, 7});
        iterativeTreeTraversals.flattenIterativeO1Space(fullTreeCopy);
        assertFlattenedTree(fullTreeCopy, Arrays.asList(1, 2, 4, 5, 3, 6, 7));
    }

    // Helper to assert if a tree is flattened correctly
    private void assertFlattenedTree(TreeNode root, List<Integer> expectedOrder) {
        List<Integer> actualOrder = new java.util.ArrayList<>();
        TreeNode current = root;
        while (current != null) {
            actualOrder.add(current.val);
            assertNull(current.left, "Left child of " + current.val + " should be null after flattening.");
            current = current.right;
        }
        assertEquals(expectedOrder, actualOrder, "Flattened tree order mismatch.");
    }

    // --- Test Cases for Morris Traversal ---

    @Test
    void testMorrisInorderTraversal() {
        assertEquals(Collections.emptyList(), morrisTreeTraversals.morrisInorderTraversal(null));
        assertEquals(Arrays.asList(1), morrisTreeTraversals.morrisInorderTraversal(new TreeNode(1)));
        assertEquals(inorderExample, morrisTreeTraversals.morrisInorderTraversal(copyTree(exampleTree)));
        assertEquals(inorderSkewedLeft, morrisTreeTraversals.morrisInorderTraversal(copyTree(skewedLeftTree)));
        assertEquals(inorderSkewedRight, morrisTreeTraversals.morrisInorderTraversal(copyTree(skewedRightTree)));
        assertEquals(inorderFull, morrisTreeTraversals.morrisInorderTraversal(copyTree(fullTree)));
    }

    @Test
    void testMorrisPreorderTraversal() {
        assertEquals(Collections.emptyList(), morrisTreeTraversals.morrisPreorderTraversal(null));
        assertEquals(Arrays.asList(1), morrisTreeTraversals.morrisPreorderTraversal(new TreeNode(1)));
        assertEquals(preorderExample, morrisTreeTraversals.morrisPreorderTraversal(copyTree(exampleTree)));
        assertEquals(preorderSkewedLeft, morrisTreeTraversals.morrisPreorderTraversal(copyTree(skewedLeftTree)));
        assertEquals(preorderSkewedRight, morrisTreeTraversals.morrisPreorderTraversal(copyTree(skewedRightTree)));
        assertEquals(preorderFull, morrisTreeTraversals.morrisPreorderTraversal(copyTree(fullTree)));
    }

    @Test
    void testMorrisPostorderTraversal() {
        assertEquals(Collections.emptyList(), morrisTreeTraversals.morrisPostorderTraversal(null));
        assertEquals(Arrays.asList(1), morrisTreeTraversals.morrisPostorderTraversal(new TreeNode(1)));
        assertEquals(postorderExample, morrisTreeTraversals.morrisPostorderTraversal(copyTree(exampleTree)));
        assertEquals(postorderSkewedLeft, morrisTreeTraversals.morrisPostorderTraversal(copyTree(skewedLeftTree)));
        assertEquals(postorderSkewedRight, morrisTreeTraversals.morrisPostorderTraversal(copyTree(skewedRightTree)));
        assertEquals(postorderFull, morrisTreeTraversals.morrisPostorderTraversal(copyTree(fullTree)));
    }
}
```