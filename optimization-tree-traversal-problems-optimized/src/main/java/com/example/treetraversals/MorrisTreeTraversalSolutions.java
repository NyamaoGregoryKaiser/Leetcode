```java
package com.example.treetraversals;

import java.util.ArrayList;
import java.util.List;

/**
 * This class implements Morris Traversal for Inorder and Preorder traversals.
 * Morris Traversal is an advanced tree traversal algorithm that does not use
 * recursion or an explicit stack. It achieves O(1) space complexity
 * (excluding the result list) by modifying the tree structure temporarily
 * by creating "threaded" links to predecessors, then restoring them.
 */
public class MorrisTreeTraversalSolutions {

    /*
     * =======================================================================
     * Problem 1: Morris Inorder Traversal (O(1) space)
     * Description: Implement Inorder traversal without recursion or explicit stack.
     * Inorder: Left -> Root -> Right
     * =======================================================================
     */

    /**
     * Performs an Inorder Traversal of the binary tree using Morris Traversal algorithm.
     * This method modifies the tree structure temporarily by establishing threads
     * and then restores the tree to its original state.
     *
     * Logic:
     * 1. Initialize `current` node to `root`.
     * 2. Loop while `current` is not null:
     *    a. If `current` has no left child:
     *       - This means we have traversed the left subtree (or there was none).
     *       - Add `current.val` to result (Root).
     *       - Move `current` to its right child (Right).
     *    b. If `current` has a left child:
     *       - Find the `predecessor` of `current` in its left subtree.
     *         The `predecessor` is the rightmost node in the left subtree.
     *       - While `predecessor.right` is not null AND `predecessor.right` is not `current`:
     *         - Move `predecessor` to `predecessor.right`.
     *       - If `predecessor.right` is null (first time visiting this path):
     *         - Create a thread: `predecessor.right = current`.
     *         - Move `current` to `current.left` (explore left subtree).
     *       - Else (`predecessor.right` is `current`, meaning we've already visited the left subtree and are returning):
     *         - This indicates the left subtree rooted at `current.left` has been fully traversed.
     *         - Remove the thread: `predecessor.right = null`.
     *         - Add `current.val` to result (Root).
     *         - Move `current` to `current.right` (explore right subtree).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Although there's a nested loop to find the predecessor, each edge
     *                  is traversed at most 3 times (down, up to create thread, down to break thread).
     * Space Complexity: O(1) (excluding the result list). No recursion stack or explicit data structure is used.
     */
    public List<Integer> inorderTraversalMorris(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode current = root;

        while (current != null) {
            if (current.left == null) {
                // If no left child, we can visit this node and move to its right child.
                result.add(current.val);
                current = current.right;
            } else {
                // If there is a left child, find the rightmost node in the left subtree (predecessor).
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }

                // If predecessor's right is null, it means this is the first time we're visiting this link.
                // Create a thread from predecessor to current, then move current to its left child.
                if (predecessor.right == null) {
                    predecessor.right = current; // Create thread
                    current = current.left;
                } else {
                    // If predecessor's right is current, it means we've already visited and processed the left subtree.
                    // Now, remove the thread, visit current, and move to its right child.
                    predecessor.right = null; // Remove thread
                    result.add(current.val);
                    current = current.right;
                }
            }
        }
        return result;
    }

    /*
     * =======================================================================
     * Problem 2: Morris Preorder Traversal (O(1) space)
     * Description: Implement Preorder traversal without recursion or explicit stack.
     * Preorder: Root -> Left -> Right
     * =======================================================================
     */

    /**
     * Performs a Preorder Traversal of the binary tree using Morris Traversal algorithm.
     * Similar to Morris Inorder, it modifies the tree structure temporarily.
     *
     * Logic:
     * The core logic is similar to Morris Inorder, but the "visit" operation (adding to result)
     * happens at a different point.
     *
     * 1. Initialize `current` node to `root`.
     * 2. Loop while `current` is not null:
     *    a. If `current` has no left child:
     *       - Add `current.val` to result.
     *       - Move `current` to its right child.
     *    b. If `current` has a left child:
     *       - Find the `predecessor` of `current` in its left subtree.
     *       - While `predecessor.right` is not null AND `predecessor.right` is not `current`:
     *         - Move `predecessor` to `predecessor.right`.
     *       - If `predecessor.right` is null (first time visiting this path):
     *         - Add `current.val` to result (visit root *before* traversing left).
     *         - Create a thread: `predecessor.right = current`.
     *         - Move `current` to `current.left`.
     *       - Else (`predecessor.right` is `current`, meaning we've already traversed the left subtree):
     *         - Remove the thread: `predecessor.right = null`.
     *         - Move `current` to `current.right` (explore right subtree).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     * Space Complexity: O(1) (excluding the result list).
     */
    public List<Integer> preorderTraversalMorris(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode current = root;

        while (current != null) {
            if (current.left == null) {
                // If no left child, visit current and move to right child.
                // This is the "Root" step when there's no left child to process first.
                result.add(current.val);
                current = current.right;
            } else {
                // If there is a left child, find the rightmost node in the left subtree (predecessor).
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }

                // If predecessor's right is null, it means this is the first time we're visiting current.
                // Visit current, create a thread, then move to current's left child.
                if (predecessor.right == null) {
                    result.add(current.val); // Visit current (Root)
                    predecessor.right = current; // Create thread
                    current = current.left;
                } else {
                    // If predecessor's right is current, it means we've already processed the left subtree
                    // and are returning to current. Remove the thread and move to current's right child.
                    predecessor.right = null; // Remove thread
                    current = current.right;
                }
            }
        }
        return result;
    }
}
```