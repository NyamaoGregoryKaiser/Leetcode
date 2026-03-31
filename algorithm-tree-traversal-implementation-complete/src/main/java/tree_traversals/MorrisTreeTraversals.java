```java
package tree_traversals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Implements Morris Traversal for Inorder, Preorder, and Postorder.
 * Morris Traversal is an O(1) space complexity traversal algorithm (excluding output list)
 * that modifies the tree structure temporarily by creating threaded links, then restoring it.
 * It's often considered an advanced topic for interviews.
 */
public class MorrisTreeTraversals {

    // --- Morris Inorder Traversal (O(1) Space) ---

    /**
     * Performs Morris Inorder Traversal.
     * Steps:
     * 1. Initialize `current` to `root`.
     * 2. While `current` is not null:
     *    a. If `current.left` is null, it means there is no left subtree to visit.
     *       Add `current.val` to result and move `current` to `current.right`.
     *    b. If `current.left` is not null, find the rightmost node in `current`'s left subtree.
     *       Let's call this `predecessor`.
     *       i. If `predecessor.right` is null (no thread exists), create a thread:
     *          `predecessor.right = current`. Move `current` to `current.left`.
     *       ii. If `predecessor.right` is `current` (thread already exists), it means
     *           we've visited the left subtree and are returning to `current`.
     *           Remove the thread: `predecessor.right = null`. Add `current.val` to result.
     *           Move `current` to `current.right`.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     *
     * Time Complexity: O(N). Each edge is traversed at most twice (once down, once up via thread).
     * Space Complexity: O(1) (excluding the result list).
     */
    public List<Integer> morrisInorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode current = root;

        while (current != null) {
            if (current.left == null) {
                // If no left child, visit current and move to right
                result.add(current.val);
                current = current.right;
            } else {
                // Find the inorder predecessor of current
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }

                // If predecessor's right is null, create a thread and move left
                if (predecessor.right == null) {
                    predecessor.right = current; // Create thread
                    current = current.left;
                } else {
                    // If thread already exists, remove it, visit current, and move right
                    predecessor.right = null; // Remove thread
                    result.add(current.val);
                    current = current.right;
                }
            }
        }
        return result;
    }

    // --- Morris Preorder Traversal (O(1) Space) ---

    /**
     * Performs Morris Preorder Traversal.
     * Similar logic to inorder, but `current.val` is added when `current` is first visited.
     *
     * Steps:
     * 1. Initialize `current` to `root`.
     * 2. While `current` is not null:
     *    a. If `current.left` is null, add `current.val` to result and move `current` to `current.right`.
     *    b. If `current.left` is not null, find `predecessor`.
     *       i. If `predecessor.right` is null (no thread):
     *          Add `current.val` to result (first visit of current).
     *          `predecessor.right = current`. Move `current` to `current.left`.
     *       ii. If `predecessor.right` is `current` (thread exists):
     *           Remove the thread: `predecessor.right = null`.
     *           Move `current` to `current.right`. (Left subtree already visited).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     *
     * Time Complexity: O(N).
     * Space Complexity: O(1) (excluding the result list).
     */
    public List<Integer> morrisPreorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode current = root;

        while (current != null) {
            if (current.left == null) {
                // If no left child, visit current and move to right
                result.add(current.val);
                current = current.right;
            } else {
                // Find the inorder predecessor of current
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }

                // If predecessor's right is null, create a thread, visit current, and move left
                if (predecessor.right == null) {
                    result.add(current.val); // Visit current (first time)
                    predecessor.right = current; // Create thread
                    current = current.left;
                } else {
                    // If thread already exists, remove it and move right
                    predecessor.right = null; // Remove thread
                    current = current.right;
                }
            }
        }
        return result;
    }

    // --- Morris Postorder Traversal (O(1) Space) ---

    /**
     * Performs Morris Postorder Traversal.
     * This is the trickiest of the three Morris traversals.
     * It requires a slightly different strategy to ensure `left`, `right`, then `root` order.
     * The approach involves:
     * 1. Standard Morris threading as in Inorder.
     * 2. When a thread is broken (meaning left subtree is fully processed), print the right spine
     *    of the left subtree in reverse order. This spine represents nodes whose right children
     *    are processed before the node itself, which is the postorder requirement.
     * 3. After the main loop, print the right spine of the whole tree (from original root's right spine)
     *    in reverse.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     *
     * Time Complexity: O(N).
     * Space Complexity: O(1) (excluding the result list).
     */
    public List<Integer> morrisPostorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode dummy = new TreeNode(0); // Dummy node to handle the right spine of the original tree
        dummy.left = root;
        TreeNode current = dummy;

        while (current != null) {
            if (current.left == null) {
                current = current.right;
            } else {
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }

                if (predecessor.right == null) {
                    predecessor.right = current;
                    current = current.left;
                } else {
                    // Thread exists, meaning left subtree of 'current' has been processed.
                    // Now, collect nodes in reverse order from 'current.left' to 'predecessor' (the right spine)
                    addReverse(current.left, predecessor, result);
                    predecessor.right = null; // Remove thread
                    current = current.right;
                }
            }
        }
        return result;
    }

    /**
     * Helper function to add nodes from `from` to `to` (inclusive) along the right child chain
     * to the result list in reverse order. This effectively simulates a postorder traversal
     * for a "right-skewed" subtree.
     *
     * @param from The starting node (e.g., current.left).
     * @param to The ending node (e.g., predecessor).
     * @param result The list to add values to.
     */
    private void addReverse(TreeNode from, TreeNode to, List<Integer> result) {
        List<Integer> temp = new ArrayList<>();
        TreeNode current = from;
        while (true) {
            temp.add(current.val);
            if (current == to) {
                break;
            }
            current = current.right;
        }
        Collections.reverse(temp); // Reverse the collected nodes to get postorder for this segment
        result.addAll(temp);
    }
}
```