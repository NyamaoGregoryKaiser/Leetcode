```java
package com.example.treetraversals;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BSTIteratorTest {

    /**
     * Helper to build a BST from an array.
     * Note: This is a simplified builder; actual BST insertion logic would be more complex.
     * We assume the array already represents a valid BST structure when converted to `TreeNode.fromArray`.
     * For BSTIterator, the tree structure itself needs to be a valid BST for inorder to be "sorted".
     */
    private TreeNode buildBSTFromArray(Integer[] array) {
        // For testing BSTIterator, we just need a valid tree that produces the expected inorder sequence.
        // TreeNode.fromArray builds a general binary tree.
        // We will assert the output against the expected sorted sequence.
        return TreeNode.fromArray(array);
    }

    @Test
    void testBSTIterator_example1() {
        // BST:
        //        7
        //       / \
        //      3  15
        //         / \
        //        9  20
        TreeNode root = buildBSTFromArray(new Integer[]{7, 3, 15, null, null, 9, 20});
        BSTIterator iterator = new BSTIterator(root);

        assertTrue(iterator.hasNext());
        assertEquals(3, iterator.next());    // return 3
        assertTrue(iterator.hasNext());
        assertEquals(7, iterator.next());    // return 7
        assertTrue(iterator.hasNext());
        assertEquals(9, iterator.next());    // return 9
        assertTrue(iterator.hasNext());
        assertEquals(15, iterator.next());   // return 15
        assertTrue(iterator.hasNext());
        assertEquals(20, iterator.next());   // return 20
        assertFalse(iterator.hasNext());
    }

    @Test
    void testBSTIterator_emptyTree() {
        TreeNode root = null;
        BSTIterator iterator = new BSTIterator(root);
        assertFalse(iterator.hasNext());
    }

    @Test
    void testBSTIterator_singleNodeTree() {
        TreeNode root = buildBSTFromArray(new Integer[]{5});
        BSTIterator iterator = new BSTIterator(root);

        assertTrue(iterator.hasNext());
        assertEquals(5, iterator.next());
        assertFalse(iterator.hasNext());
    }

    @Test
    void testBSTIterator_skewedLeftTree() {
        // BST:
        //        5
        //       /
        //      4
        //     /
        //    3
        //   /
        //  2
        TreeNode root = buildBSTFromArray(new Integer[]{5, 4, null, 3, null, 2, null});
        BSTIterator iterator = new BSTIterator(root);

        List<Integer> actualOrder = new ArrayList<>();
        while (iterator.hasNext()) {
            actualOrder.add(iterator.next());
        }
        assertEquals(Arrays.asList(2, 3, 4, 5), actualOrder);
    }

    @Test
    void testBSTIterator_skewedRightTree() {
        // BST:
        //    2
        //     \
        //      3
        //       \
        //        4
        //         \
        //          5
        TreeNode root = buildBSTFromArray(new Integer[]{2, null, 3, null, 4, null, 5});
        BSTIterator iterator = new BSTIterator(root);

        List<Integer> actualOrder = new ArrayList<>();
        while (iterator.hasNext()) {
            actualOrder.add(iterator.next());
        }
        assertEquals(Arrays.asList(2, 3, 4, 5), actualOrder);
    }

    @Test
    void testBSTIterator_complexBalancedTree() {
        // BST:
        //          10
        //         /  \
        //        5    15
        //       / \   / \
        //      2   7 12  18
        TreeNode root = buildBSTFromArray(new Integer[]{10, 5, 15, 2, 7, 12, 18});
        BSTIterator iterator = new BSTIterator(root);

        List<Integer> actualOrder = new ArrayList<>();
        while (iterator.hasNext()) {
            actualOrder.add(iterator.next());
        }
        assertEquals(Arrays.asList(2, 5, 7, 10, 12, 15, 18), actualOrder);
    }

    @Test
    void testBSTIterator_multipleCallsToHasNext() {
        TreeNode root = buildBSTFromArray(new Integer[]{10, 5, 15});
        BSTIterator iterator = new BSTIterator(root);

        assertTrue(iterator.hasNext()); // Should be true
        assertTrue(iterator.hasNext()); // Should still be true
        assertEquals(5, iterator.next());
        assertTrue(iterator.hasNext()); // Should be true
        assertEquals(10, iterator.next());
        assertTrue(iterator.hasNext()); // Should be true
        assertEquals(15, iterator.next());
        assertFalse(iterator.hasNext()); // Should be false
        assertFalse(iterator.hasNext()); // Should still be false
    }

    @Test
    void testBSTIterator_callsMixingHasNextAndNext() {
        TreeNode root = buildBSTFromArray(new Integer[]{10, 5, 15, 2, 7, 12, 18});
        BSTIterator iterator = new BSTIterator(root);

        assertEquals(2, iterator.next());
        assertTrue(iterator.hasNext());
        assertEquals(5, iterator.next());
        assertEquals(7, iterator.next());
        assertTrue(iterator.hasNext());
        assertEquals(10, iterator.next());
        assertEquals(12, iterator.next());
        assertTrue(iterator.hasNext());
        assertEquals(15, iterator.next());
        assertTrue(iterator.hasNext());
        assertEquals(18, iterator.next());
        assertFalse(iterator.hasNext());
    }
}
```