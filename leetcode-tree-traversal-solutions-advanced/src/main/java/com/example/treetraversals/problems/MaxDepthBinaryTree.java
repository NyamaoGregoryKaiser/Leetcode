```java
package com.example.treetraversals.problems;

import com.example.treetraversals.datastructures.TreeNode;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

/**
 * This class provides solutions for finding the maximum depth of a binary tree.
 * The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 * Solutions using both Depth-First Search (DFS) and Breadth-First Search (BFS) are provided.
 */
public class MaxDepthBinaryTree {

    /**
     * Calculates the maximum depth of a binary tree using Depth-First Search (DFS) - Recursive Approach.
     * This is a post-order traversal pattern: calculate depths of left and right subtrees,
     * then combine them for the current node.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H) in the average case (balanced tree) and O(N) in the worst case (skewed tree),
     *                   where H is the height of the tree. This is due to the recursion stack space.
     *
     * @param root The root of the binary tree.
     * @return The maximum depth of the tree. Returns 0 if the tree is empty (root is null).
     */
    public int maxDepthDFSRecursive(TreeNode root) {
        // Base case: an empty tree has a depth of 0.
        if (root == null) {
            return 0;
        }

        // Recursively find the maximum depth of the left and right subtrees.
        int leftDepth = maxDepthDFSRecursive(root.left);
        int rightDepth = maxDepthDFSRecursive(root.right);

        // The depth of the current tree is 1 (for the root itself) plus the maximum
        // of the depths of its left and right subtrees.
        return 1 + Math.max(leftDepth, rightDepth);
    }

    /**
     * Calculates the maximum depth of a binary tree using Depth-First Search (DFS) - Iterative Approach.
     * This approach uses a stack to simulate recursion. It tracks nodes along with their current depth.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is pushed and popped exactly once.
     * Space Complexity: O(H) in the average case (balanced tree) and O(N) in the worst case (skewed tree),
     *                   where H is the height of the tree. This is due to the stack space.
     *
     * @param root The root of the binary tree.
     * @return The maximum depth of the tree. Returns 0 if the tree is empty.
     */
    public int maxDepthDFSIterative(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Stack<NodeDepthPair> stack = new Stack<>();
        stack.push(new NodeDepthPair(root, 1)); // Push root with depth 1
        int maxDepth = 0;

        while (!stack.isEmpty()) {
            NodeDepthPair current = stack.pop();
            TreeNode node = current.node;
            int depth = current.depth;

            maxDepth = Math.max(maxDepth, depth); // Update maxDepth with current node's depth

            // Process children: push right child first, then left, to maintain typical DFS order (LIFO)
            if (node.right != null) {
                stack.push(new NodeDepthPair(node.right, depth + 1));
            }
            if (node.left != null) {
                stack.push(new NodeDepthPair(node.left, depth + 1));
            }
        }
        return maxDepth;
    }

    /**
     * Helper class to store a TreeNode and its corresponding depth.
     * Used in the iterative DFS approach.
     */
    private static class NodeDepthPair {
        TreeNode node;
        int depth;

        NodeDepthPair(TreeNode node, int depth) {
            this.node = node;
            this.depth = depth;
        }
    }


    /**
     * Calculates the maximum depth of a binary tree using Breadth-First Search (BFS) - Iterative Approach.
     * This method explores the tree level by level. The depth is incremented each time a new level is processed.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is enqueued and dequeued exactly once.
     * Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
     *                   For a complete binary tree, this can be O(N/2), effectively O(N).
     *
     * @param root The root of the binary tree.
     * @return The maximum depth of the tree. Returns 0 if the tree is empty.
     */
    public int maxDepthBFS(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Add the root node to the queue
        int depth = 0;     // Initialize depth

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of nodes at the current level
            depth++; // Increment depth for each new level

            // Process all nodes at the current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll(); // Dequeue a node

                // Enqueue its children for the next level
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
        }
        return depth;
    }
}
```