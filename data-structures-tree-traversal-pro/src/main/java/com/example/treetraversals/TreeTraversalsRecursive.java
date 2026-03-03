```java
package com.example.treetraversals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Queue;
import java.util.LinkedList;

/**
 * This class implements various tree traversal algorithms using recursive approaches.
 * It covers Depth-First Search (DFS) traversals (Preorder, Inorder, Postorder)
 * and Breadth-First Search (BFS) traversals (Level Order, Zigzag Level Order).
 */
public class TreeTraversalsRecursive {

    // --- Problem 1: Depth-First Search (DFS) Traversals ---

    /**
     * Performs a Preorder Traversal recursively.
     * Visit root, then left subtree, then right subtree.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     */
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }

    private void preorderHelper(TreeNode node, List<Integer> result) {
        // Base case: if node is null, return.
        if (node == null) {
            return;
        }
        // 1. Visit current node (add its value to the result list).
        result.add(node.val);
        // 2. Traverse left subtree.
        preorderHelper(node.left, result);
        // 3. Traverse right subtree.
        preorderHelper(node.right, result);
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H) where H is the height of the tree.
     *                   This is due to the recursion stack. In the worst case (skewed tree), H can be N.
     *                   In the best case (balanced tree), H is log N.
     */


    /**
     * Performs an Inorder Traversal recursively.
     * Visit left subtree, then root, then right subtree.
     * For a Binary Search Tree (BST), inorder traversal yields sorted elements.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     */
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }

    private void inorderHelper(TreeNode node, List<Integer> result) {
        // Base case: if node is null, return.
        if (node == null) {
            return;
        }
        // 1. Traverse left subtree.
        inorderHelper(node.left, result);
        // 2. Visit current node (add its value to the result list).
        result.add(node.val);
        // 3. Traverse right subtree.
        inorderHelper(node.right, result);
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H) where H is the height of the tree.
     *                   Due to recursion stack. Worst case H=N, best case H=log N.
     */


    /**
     * Performs a Postorder Traversal recursively.
     * Visit left subtree, then right subtree, then root.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     */
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }

    private void postorderHelper(TreeNode node, List<Integer> result) {
        // Base case: if node is null, return.
        if (node == null) {
            return;
        }
        // 1. Traverse left subtree.
        postorderHelper(node.left, result);
        // 2. Traverse right subtree.
        postorderHelper(node.right, result);
        // 3. Visit current node (add its value to the result list).
        result.add(node.val);
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H) where H is the height of the tree.
     *                   Due to recursion stack. Worst case H=N, best case H=log N.
     */

    // --- Problem 2: Breadth-First Search (BFS) Traversals ---

    /**
     * Performs a Level Order Traversal (BFS).
     * Visits nodes level by level, from left to right.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level's nodes.
     */
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Start by adding the root to the queue.

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of nodes at the current level.
            List<Integer> currentLevelNodes = new ArrayList<>();

            // Process all nodes at the current level.
            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll(); // Dequeue a node.
                currentLevelNodes.add(current.val); // Add its value to the current level's list.

                // Enqueue its children for the next level.
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            result.add(currentLevelNodes); // Add the completed level to the overall result.
        }
        return result;
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is enqueued and dequeued exactly once.
     * Space Complexity: O(W) where W is the maximum width of the tree.
     *                   In the worst case (a complete binary tree), W can be N/2, so O(N).
     *                   This is the maximum number of nodes in the queue at any given time.
     */


    /**
     * Performs a Zigzag Level Order Traversal.
     * The first level is left to right, the second level right to left, and so on.
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
        boolean leftToRight = true; // Flag to determine traversal direction for the current level.

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevelNodes = new ArrayList<>();

            // Process all nodes at the current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();
                currentLevelNodes.add(current.val); // Always add to a temporary list in natural order first

                // Enqueue children for the next level
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }

            // Reverse the current level's list if traversing right-to-left
            if (!leftToRight) {
                Collections.reverse(currentLevelNodes);
            }
            result.add(currentLevelNodes);
            leftToRight = !leftToRight; // Toggle direction for the next level
        }
        return result;
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is processed once. Reversing a list of size K takes O(K).
     *                  Sum of K for all levels is N, so total is still O(N).
     * Space Complexity: O(W) where W is the maximum width of the tree (for the queue)
     *                   plus O(W) for the list that stores current level nodes before reversing.
     *                   In the worst case, O(N).
     */
}
```