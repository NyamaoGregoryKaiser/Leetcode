```java
package com.example.treetraversals;

import com.example.treetraversals.datastructures.TreeNode;
import com.example.treetraversals.problems.ZigzagLevelOrderTraversal;
import com.example.treetraversals.utils.TreeBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for {@link ZigzagLevelOrderTraversal}.
 * Covers various tree structures for zigzag level order traversal.
 */
public class ZigzagLevelOrderTraversalTest {

    private ZigzagLevelOrderTraversal zigzagTraversal;

    @BeforeEach
    void setUp() {
        zigzagTraversal = new ZigzagLevelOrderTraversal();
    }

    @Test
    void testZigzagLevelOrder_EmptyTree() {
        TreeNode root = null;
        List<List<Integer>> expected = Collections.emptyList();
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }

    @Test
    void testZigzagLevelOrder_SingleNode() {
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1});
        List<List<Integer>> expected = Collections.singletonList(Collections.singletonList(1));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }

    @Test
    void testZigzagLevelOrder_ExampleTree() {
        // Tree:       3
        //           /   \
        //          9    20
        //              /  \
        //             15   7
        // Level 0: [3] (L->R)
        // Level 1: [20, 9] (R->L)
        // Level 2: [15, 7] (L->R)
        TreeNode root = TreeBuilder.buildTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(3),
                Arrays.asList(20, 9),
                Arrays.asList(15, 7)
        );
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }

    @Test
    void testZigzagLevelOrder_ComplexTree() {
        // Tree:     1
        //          / \
        //         2   3
        //        / \   \
        //       4   5   6
        //      / \
        //     7   8
        // Level 0: [1]
        // Level 1: [3, 2]
        // Level 2: [4, 5, 6]
        // Level 3: [8, 7]
        Integer[] values = {1, 2, 3, 4, 5, null, 6, 7, 8, null, null, null, null, null, null};
        TreeNode root = TreeBuilder.buildTree(values);
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(3, 2),
                Arrays.asList(4, 5, 6),
                Arrays.asList(8, 7)
        );
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }

    @Test
    void testZigzagLevelOrder_LeftSkewedTree() {
        // Tree:    1
        //         /
        //        2
        //       /
        //      3
        //     /
        //    4
        // Level 0: [1]
        // Level 1: [2] (R->L is still [2] for single element)
        // Level 2: [3] (L->R is still [3])
        // Level 3: [4] (R->L is still [4])
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, null, 3, null, null, null, 4});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(2),
                Arrays.asList(3),
                Arrays.asList(4)
        );
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }

    @Test
    void testZigzagLevelOrder_RightSkewedTree() {
        // Tree: 1
        //        \
        //         2
        //          \
        //           3
        //            \
        //             4
        // Level 0: [1]
        // Level 1: [2]
        // Level 2: [3]
        // Level 3: [4]
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(2),
                Arrays.asList(3),
                Arrays.asList(4)
        );
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }

    @Test
    void testZigzagLevelOrder_SmallBalancedTree() {
        // Tree:     1
        //          / \
        //         2   3
        // Level 0: [1]
        // Level 1: [3, 2]
        TreeNode root = TreeBuilder.buildTree(new Integer[]{1, 2, 3});
        List<List<Integer>> expected = Arrays.asList(
                Arrays.asList(1),
                Arrays.asList(3, 2)
        );
        assertEquals(expected, zigzagTraversal.zigzagLevelOrder(root));
        assertEquals(expected, zigzagTraversal.zigzagLevelOrderWithReversal(root));
    }
}
```