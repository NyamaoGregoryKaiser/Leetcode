```java
package com.example.treetraversals.utils;

import com.example.treetraversals.models.TreeNode;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Utility class for creating and serializing binary trees.
 * Provides methods to convert an array representation into a TreeNode structure
 * and vice-versa (partial serialization to a list for testing/visualization).
 */
public class TreeUtils {

    /**
     * Builds a binary tree from an array representation (level order traversal with nulls).
     * This format is commonly used in LeetCode problems (e.g., [3,9,20,null,null,15,7]).
     *
     * @param nodes An array of Integers where `null` represents a missing child.
     *              The first element is the root. Subsequent elements are children
     *              in level order (left then right).
     * @return The root TreeNode of the constructed binary tree, or null if the input is invalid/empty.
     *
     * Time Complexity: O(N) where N is the number of nodes in the array. Each node is
     *                  processed and added to the queue once.
     * Space Complexity: O(W) where W is the maximum width of the tree (number of nodes
     *                   at the widest level), used by the queue. In the worst case (complete tree),
     *                   W can be O(N).
     */
    public static TreeNode buildTree(Integer[] nodes) {
        if (nodes == null || nodes.length == 0 || nodes[0] == null) {
            return null; // Empty or invalid input array
        }

        // The first element is always the root.
        TreeNode root = new TreeNode(nodes[0]);
        // Use a queue for level-order processing to build the tree.
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Add root to the queue to start.

        int i = 1; // Start processing children from the second element of the array.
        while (!queue.isEmpty() && i < nodes.length) {
            TreeNode currentParent = queue.poll(); // Get the current parent node from the queue.

            // Assign left child
            if (nodes[i] != null) {
                currentParent.left = new TreeNode(nodes[i]);
                queue.offer(currentParent.left); // Add the new left child to the queue for its children.
            }
            i++; // Move to the next element in the array for the right child.

            // Assign right child, if available in the array
            if (i < nodes.length && nodes[i] != null) {
                currentParent.right = new TreeNode(nodes[i]);
                queue.offer(currentParent.right); // Add the new right child to the queue.
            }
            i++; // Move to the next element in the array for the next parent's children.
        }
        return root;
    }

    /**
     * Serializes a binary tree into a List of Integers using level-order traversal,
     * including nulls to represent empty child positions.
     * This is useful for comparing tree structures in tests.
     *
     * @param root The root TreeNode of the tree to serialize.
     * @return A List of Integers representing the tree in level order, with nulls for missing nodes.
     *         Trailing nulls are removed for a cleaner representation up to the last non-null node.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is visited once.
     * Space Complexity: O(W) where W is the maximum width of the tree, for the queue. In the worst case, O(N).
     */
    public static List<Integer> serializeTreeToList(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            // If the tree is empty, return an empty list.
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Start with the root.

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll(); // Dequeue a node.

            if (node == null) {
                // If the dequeued item is null (a placeholder for a missing child), add null to result.
                result.add(null);
            } else {
                // If it's a valid node, add its value and enqueue its children (even if null).
                result.add(node.val);
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }

        // Remove trailing nulls to clean up the representation.
        // For example, [1,2,3,null,null,null,null] becomes [1,2,3].
        while (!result.isEmpty() && result.get(result.size() - 1) == null) {
            result.remove(result.size() - 1);
        }
        return result;
    }
}
```