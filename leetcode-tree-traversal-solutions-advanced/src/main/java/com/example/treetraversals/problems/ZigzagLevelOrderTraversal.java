```java
package com.example.treetraversals.problems;

import com.example.treetraversals.datastructures.TreeNode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * This class implements the Zigzag Level Order Traversal of a binary tree.
 * In a zigzag traversal, elements at odd levels are visited from left to right,
 * and elements at even levels are visited from right to left. (Root is level 0).
 */
public class ZigzagLevelOrderTraversal {

    /**
     * Performs a zigzag level order traversal of a binary tree.
     *
     * This method uses a standard BFS approach with a queue, but keeps track of the current level.
     * For even levels (0, 2, 4...), the elements are added to the list normally (left to right).
     * For odd levels (1, 3, 5...), the elements are added to the list normally but then the list is reversed
     * before being added to the final result.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is enqueued and dequeued once.
     *                  Reversing a list of 'k' elements takes O(k) time. Summing over all levels,
     *                  this is still O(N) as each node is part of a list that might be reversed at most once.
     * Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
     *                   This can be O(N/2) for a complete binary tree, effectively O(N) due to queue and temporary list storage.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level's nodes
     *         in zigzag order.
     */
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true; // Flag to determine traversal direction for the current level
        int level = 0; // Current level, starting from 0 for the root

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            // Use LinkedList for current level to allow efficient insertion at beginning/end
            // This avoids the O(k) reversal using Collections.reverse() later.
            // Alternative: use ArrayList and Collections.reverse().
            LinkedList<Integer> currentLevelNodes = new LinkedList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();

                // Add node value to currentLevelNodes based on direction
                if (leftToRight) {
                    currentLevelNodes.addLast(node.val); // Add to end for left-to-right
                } else {
                    currentLevelNodes.addFirst(node.val); // Add to beginning for right-to-left
                }

                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            result.add(new ArrayList<>(currentLevelNodes)); // Convert LinkedList to ArrayList for consistency
            leftToRight = !leftToRight; // Toggle direction for the next level
            level++; // Increment level counter
        }
        return result;
    }

    /**
     * Alternative approach using a single Queue (LinkedList) and Collections.reverse().
     * This is slightly less efficient in theory due to `Collections.reverse()` but
     * often simpler to implement and might have good performance characteristics for smaller lists.
     *
     * Time Complexity: O(N) - Same as above, reversal doesn't change overall complexity.
     * Space Complexity: O(W) - Same as above.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level's nodes
     *         in zigzag order.
     */
    public List<List<Integer>> zigzagLevelOrderWithReversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true; // Flag to determine traversal direction

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevelNodes = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevelNodes.add(node.val);

                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }

            // Reverse the list if it's an odd-indexed level (0-indexed)
            if (!leftToRight) {
                Collections.reverse(currentLevelNodes);
            }
            result.add(currentLevelNodes);
            leftToRight = !leftToRight; // Toggle direction for the next level
        }
        return result;
    }
}
```