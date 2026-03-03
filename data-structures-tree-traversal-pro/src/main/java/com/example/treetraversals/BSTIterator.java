```java
package com.example.treetraversals;

import java.util.Stack;

/**
 * Problem 3: Implement the `BSTIterator` class.
 * This class implements an iterator over a Binary Search Tree (BST) that returns its elements
 * in ascending order (inorder traversal).
 *
 * It should support `hasNext()` and `next()` operations.
 * `next()` should return the next smallest number.
 * `hasNext()` should return whether there is a next smallest number.
 * The amortized time complexity for `next()` and `hasNext()` should be O(1),
 * and the space complexity should be O(H), where H is the height of the BST.
 */
public class BSTIterator {

    private Stack<TreeNode> stack; // Stack to store nodes for inorder traversal.

    /**
     * Constructor for BSTIterator.
     * Initializes the iterator by pushing all leftmost nodes from the root to the stack.
     * This prepares the stack so that the smallest element is at the top.
     *
     * @param root The root of the BST.
     */
    public BSTIterator(TreeNode root) {
        stack = new Stack<>();
        // Populate the stack with the path to the smallest element (leftmost)
        pushAllLeft(root);
    }

    /**
     * Returns the next smallest number in the BST.
     * This method effectively simulates one step of an iterative inorder traversal.
     *
     * @return The value of the next smallest node.
     */
    public int next() {
        // The top of the stack always holds the next smallest element
        TreeNode current = stack.pop();
        int val = current.val;

        // If the popped node has a right child, we need to find the leftmost node
        // in its right subtree and push it (and its left ancestors) to the stack.
        // This makes the next smallest element available at the top for the subsequent call.
        if (current.right != null) {
            pushAllLeft(current.right);
        }
        return val;
    }

    /**
     * Returns true if there is a next smallest number, otherwise false.
     *
     * @return True if the iterator has more elements, false otherwise.
     */
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    /**
     * Helper method to push all leftmost nodes from a given node onto the stack.
     * This is crucial for maintaining the invariant that the stack's top
     * is always the next node to be visited in inorder traversal.
     *
     * @param node The starting node from which to push leftmost descendants.
     */
    private void pushAllLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
    /*
     * Time Complexity:
     * - Constructor: O(H) where H is the height of the tree, as it pushes nodes along the leftmost path.
     * - next(): Amortized O(1). Each node is pushed onto the stack and popped from it exactly once over the
     *           entire traversal. While a single call might take O(H) (e.g., when traversing down a right child's
     *           left subtree), the total time for N calls to next() is O(N).
     *           Therefore, the amortized time for next() is O(N)/N = O(1).
     * - hasNext(): O(1). Simply checks if the stack is empty.
     *
     * Space Complexity: O(H) where H is the height of the tree.
     *                   In the worst case (skewed tree), H can be N.
     *                   The stack stores the current path from the root to the current node.
     */
}

/**
 * Example of usage:
 * BSTIterator iterator = new BSTIterator(root);
 * while (iterator.hasNext()) {
 *     System.out.println(iterator.next());
 * }
 */
```