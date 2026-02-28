```java
package com.example.treetraversals;

import com.example.treetraversals.models.TreeNode;

import java.util.LinkedList;
import java.util.Queue;

/**
 * This class contains problems related to calculating properties of a binary tree,
 * specifically the maximum depth, using both Depth-First Search (DFS) and
 * Breadth-First Search (BFS) approaches.
 */
public class BinaryTreeProperties {

    // --- Problem: Maximum Depth of Binary Tree ---
    // The maximum depth is the number of nodes along the longest path from the root node
    // down to the farthest leaf node.

    /**
     * Calculates the maximum depth of a binary tree using a Depth-First Search (DFS) approach.
     * This is typically implemented recursively and resembles a post-order traversal logic.
     *
     * Algorithm:
     * 1. If the root is null, the depth is 0 (base case for an empty tree).
     * 2. Recursively calculate the maximum depth of the left subtree.
     * 3. Recursively calculate the maximum depth of the right subtree.
     * 4. The maximum depth of the current tree is 1 (for the current root node itself)
     *    plus the maximum of the left and right subtree depths.
     *
     * @param root The root node of the binary tree.
     * @return The maximum depth of the tree.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is visited once.
     * Space Complexity: O(H) where H is the height of the tree. This space is used by the
     *                    recursion call stack. In the worst case (skewed tree), H can be N,
     *                    leading to O(N) space. In the best case (balanced tree), H is logN,
     *                    leading to O(logN) space.
     */
    public int maxDepthDFS(TreeNode root) {
        // Base case: If the node is null, it means we've gone past a leaf,
        // or the tree itself is empty. Its contribution to depth is 0.
        if (root == null) {
            return 0;
        }

        // Recursively find the maximum depth of the left subtree.
        int leftDepth = maxDepthDFS(root.left);
        // Recursively find the maximum depth of the right subtree.
        int rightDepth = maxDepthDFS(root.right);

        // The depth of the current tree (rooted at 'root') is 1 (for 'root' itself)
        // plus the maximum depth found in its left or right subtrees.
        return 1 + Math.max(leftDepth, rightDepth);
    }

    /**
     * Calculates the maximum depth of a binary tree using a Breadth-First Search (BFS) approach.
     * This is typically implemented iteratively using a queue and essentially performs a
     * level-order traversal while keeping track of the level count.
     *
     * Algorithm:
     * 1. If the root is null, the depth is 0.
     * 2. Initialize a queue with the root node and a depth counter to 0.
     * 3. While the queue is not empty:
     *    a. Increment the depth counter (we are moving to a new level or starting a new one).
     *    b. Get the number of nodes currently in the queue (this is the `levelSize`).
     *       These are all the nodes at the current level.
     *    c. Process `levelSize` nodes: dequeue each node, and enqueue its non-null children.
     * 4. The final value of the depth counter is the maximum depth.
     *
     * @param root The root node of the binary tree.
     * @return The maximum depth of the tree.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is
     *                  enqueued and dequeued exactly once.
     * Space Complexity: O(W) where W is the maximum width of the tree (max number of
     *                   nodes at any single level). In the worst case (a complete
     *                   binary tree), W can be N/2, so O(N).
     */
    public int maxDepthBFS(TreeNode root) {
        if (root == null) {
            return 0; // An empty tree has depth 0.
        }

        // Use a queue for BFS traversal.
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Start with the root node.
        int depth = 0;     // Initialize depth counter.

        // Continue as long as there are nodes to process in the queue.
        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of nodes at the current level.
            depth++;                      // Increment depth as we are about to process a new level.

            // Process all nodes at the current level.
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll(); // Dequeue a node.

                // Enqueue its children for the next level.
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
        }
        return depth; // The final depth is the maximum depth.
    }
}
```