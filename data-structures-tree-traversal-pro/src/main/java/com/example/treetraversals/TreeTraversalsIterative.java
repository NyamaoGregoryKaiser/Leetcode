```java
package com.example.treetraversals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;
import java.util.Queue;
import java.util.LinkedList;
import java.util.Deque; // For Zigzag, a Deque can be more efficient if adding to both ends

/**
 * This class implements various tree traversal algorithms using iterative approaches.
 * It covers Depth-First Search (DFS) traversals (Preorder, Inorder, Postorder)
 * using an explicit stack, and Breadth-First Search (BFS) traversals (Level Order, Zigzag Level Order)
 * using a queue/deque.
 */
public class TreeTraversalsIterative {

    // --- Problem 1: Depth-First Search (DFS) Traversals (Iterative) ---

    /**
     * Performs an iterative Preorder Traversal.
     * Uses a stack to keep track of nodes to visit.
     *
     * Logic:
     * 1. Push root to stack.
     * 2. While stack is not empty:
     *    a. Pop a node, add its value to result.
     *    b. Push right child first (so left is processed next).
     *    c. Push left child.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     */
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            result.add(current.val);

            // Push right child first, so left child is processed before right
            if (current.right != null) {
                stack.push(current.right);
            }
            if (current.left != null) {
                stack.push(current.left);
            }
        }
        return result;
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is pushed and popped exactly once.
     * Space Complexity: O(H) where H is the height of the tree.
     *                   In the worst case (skewed tree), H can be N.
     *                   This is the maximum size of the stack.
     */


    /**
     * Performs an iterative Inorder Traversal.
     * Uses a stack to keep track of nodes and simulate recursion.
     *
     * Logic:
     * 1. Initialize current node to root.
     * 2. While current is not null or stack is not empty:
     *    a. Traverse to the leftmost node, pushing all visited nodes onto the stack.
     *    b. Pop a node from the stack (this is the "current" node in inorder). Add its value to result.
     *    c. Move to the right child of the popped node.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     */
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Traverse to the leftmost node, pushing nodes onto stack
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // At this point, current is null (reached end of left path)
            // Pop from stack, process, and go right
            current = stack.pop();
            result.add(current.val);

            // Move to the right subtree
            current = current.right;
        }
        return result;
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is pushed and popped exactly once.
     * Space Complexity: O(H) where H is the height of the tree.
     *                   In the worst case (skewed tree), H can be N.
     *                   This is the maximum size of the stack.
     */


    /**
     * Performs an iterative Postorder Traversal.
     * This is the most complex iterative DFS traversal.
     * One common approach uses two stacks or a single stack with careful handling of visited nodes.
     * This implementation uses two stacks.
     *
     * Logic (Two Stacks):
     * 1. Push root to stack1.
     * 2. While stack1 is not empty:
     *    a. Pop a node from stack1, push it onto stack2.
     *    b. Push left child of popped node to stack1.
     *    c. Push right child of popped node to stack1.
     * 3. Pop all elements from stack2 and add to result (this gives postorder).
     *    (Note: The order of pushing children to stack1 matters. If left then right, stack2 will be right then left.
     *    Popping from stack2 yields correct postorder: Left -> Right -> Root).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     */
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack1 = new Stack<>(); // For processing order
        Stack<TreeNode> stack2 = new Stack<>(); // For storing results in reverse postorder

        stack1.push(root);

        while (!stack1.isEmpty()) {
            TreeNode current = stack1.pop();
            stack2.push(current); // Push to stack2

            // Push left child first, then right. This ensures left is processed earlier by stack1.
            // But when popped from stack2, right will be popped before left, thus yielding L-R-N
            if (current.left != null) {
                stack1.push(current.left);
            }
            if (current.right != null) {
                stack1.push(current.right);
            }
        }

        // Pop elements from stack2 to get the postorder traversal
        while (!stack2.isEmpty()) {
            result.add(stack2.pop().val);
        }

        return result;
    }
    /*
     * Time Complexity: O(N) where N is the number of nodes in the tree.
     *                  Each node is pushed and popped exactly once from both stacks.
     * Space Complexity: O(N) in the worst case, as both stacks could hold up to N/2 nodes
     *                   simultaneously (e.g., in a complete binary tree), effectively O(N).
     */
}
```