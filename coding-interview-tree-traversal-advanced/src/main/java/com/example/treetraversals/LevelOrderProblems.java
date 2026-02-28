```java
package com.example.treetraversals;

import com.example.treetraversals.models.TreeNode;

import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * This class implements Level Order Traversal (Breadth-First Search)
 * and its common variation, Zigzag Level Order Traversal.
 */
public class LevelOrderProblems {

    // --- Level Order Traversal (BFS) ---
    // Visits nodes level by level, from left to right within each level.
    // Uses a queue data structure.

    /**
     * Performs a Level Order Traversal (Breadth-First Search) of a binary tree.
     * Nodes are visited level by level, from left to right.
     * The result is a list of lists, where each inner list contains the nodes' values
     * at a specific level.
     *
     * @param root The root node of the binary tree.
     * @return A list of lists of integers representing the level order traversal.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is
     *                  enqueued and dequeued exactly once.
     * Space Complexity: O(W) where W is the maximum width of the tree (max number of
     *                   nodes at any single level). In the worst case (a complete
     *                   binary tree), W can be N/2, so O(N).
     */
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result; // An empty tree has no levels.
        }

        // Use a queue to manage nodes to visit. BFS requires a queue.
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Start by adding the root to the queue.

        // Loop as long as there are nodes in the queue to process.
        while (!queue.isEmpty()) {
            // Get the number of nodes at the current level.
            // This is crucial to process exactly one level at a time.
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>(); // List to store values of current level.

            // Process all nodes at the current level.
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll(); // Dequeue a node from the front of the queue.
                currentLevel.add(node.val);   // Add its value to the current level's list.

                // Enqueue children for the next level's processing.
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            // After processing all nodes at this level, add the current level's list to the overall result.
            result.add(currentLevel);
        }
        return result;
    }

    // --- Zigzag Level Order Traversal ---
    // A variation of level order where levels are traversed alternately from left-to-right
    // and right-to-left.

    /**
     * Performs a Zigzag Level Order Traversal of a binary tree.
     * The first level is traversed left to right, the second level right to left,
     * the third level left to right, and so on.
     *
     * @param root The root node of the binary tree.
     * @return A list of lists of integers representing the zigzag level order traversal.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is
     *                  enqueued and dequeued once. Adding to a Deque (LinkedList) at
     *                  either end is O(1).
     * Space Complexity: O(W) where W is the maximum width of the tree, used by the queue
     *                   and the Deque for the current level. In the worst case, O(N).
     */
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true; // Flag to determine current level's traversal direction.

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            // Use a Deque (double-ended queue) to efficiently add elements to both ends.
            // This avoids O(N) cost of reversing a list for right-to-left levels.
            Deque<Integer> currentLevelDeque = new LinkedList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();

                // Depending on the direction, add to the front or back of the deque.
                if (leftToRight) {
                    currentLevelDeque.addLast(node.val); // Add to end for L->R traversal (normal order).
                } else {
                    currentLevelDeque.addFirst(node.val); // Add to front for R->L traversal (reversed order).
                }

                // Enqueue children for the next level, always in left-to-right order for queue.
                // The zigzag logic only applies to how values are stored in 'currentLevelDeque'.
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            // Add the current level's values (from deque) to the final result list.
            result.add(new ArrayList<>(currentLevelDeque));
            // Toggle direction for the next level.
            leftToRight = !leftToRight;
        }
        return result;
    }
}

```