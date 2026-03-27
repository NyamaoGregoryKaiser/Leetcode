```java
package com.example.treetraversals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;

/**
 * This class provides iterative solutions for standard binary tree traversals
 * (Preorder, Inorder, Postorder) using explicit stacks.
 */
public class IterativeTreeTraversalSolutions {

    /*
     * =======================================================================
     * Problem 1: Preorder Traversal (Iterative)
     * Description: Implement Preorder traversal iteratively using a stack.
     * Preorder: Root -> Left -> Right
     * =======================================================================
     */

    /**
     * Performs an iterative Preorder Traversal of the binary tree.
     * Uses a stack to keep track of nodes to visit.
     *
     * Logic:
     * 1. Push root to stack.
     * 2. While stack is not empty:
     *    a. Pop a node, add its value to result.
     *    b. Push right child first (if exists), then left child (if exists).
     *       This ensures left child is processed before right because stack is LIFO.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is pushed and popped from the stack exactly once.
     * Space Complexity: O(H), where H is the height of the tree.
     *                   In the worst case (skewed tree), the stack can hold up to N nodes.
     */
    public List<Integer> preorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            result.add(current.val);

            // Push right child first, so left child is processed before it
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
     * =======================================================================
     * Problem 2: Inorder Traversal (Iterative)
     * Description: Implement Inorder traversal iteratively using a stack.
     * Inorder: Left -> Root -> Right
     * =======================================================================
     */

    /**
     * Performs an iterative Inorder Traversal of the binary tree.
     * Uses a stack to keep track of nodes whose left subtrees have been visited.
     *
     * Logic:
     * 1. Initialize current node to root.
     * 2. While current is not null or stack is not empty:
     *    a. While current is not null: push current to stack, move current to its left child.
     *       This goes down the left path, pushing all ancestors.
     *    b. Current becomes the node popped from stack (this is the root of the (sub)tree).
     *    c. Add current's value to result.
     *    d. Move current to its right child (to process the right subtree).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is pushed and popped from the stack at most once.
     * Space Complexity: O(H), where H is the height of the tree.
     *                   In the worst case (skewed tree), the stack can hold up to N nodes.
     */
    public List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Traverse to the leftmost node, pushing all intermediate nodes onto the stack
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // Pop the top node (which is the leftmost unvisited node)
            current = stack.pop();
            result.add(current.val); // Add its value (Root)

            // Now move to the right subtree
            current = current.right;
        }
        return result;
    }

    /*
     * =======================================================================
     * Problem 3: Postorder Traversal (Iterative)
     * Description: Implement Postorder traversal iteratively using a stack.
     * Postorder: Left -> Right -> Root
     *
     * Approach 1: Using Two Stacks (Easier to understand)
     * Logic:
     * 1. Push root to stack1.
     * 2. While stack1 is not empty:
     *    a. Pop node from stack1, push to stack2.
     *    b. Push left child (if exists) to stack1.
     *    c. Push right child (if exists) to stack1.
     * 3. Pop all elements from stack2 and add to result.
     * This effectively performs a reverse preorder (Root -> Right -> Left),
     * and reversing this sequence gives Postorder (Left -> Right -> Root).
     *
     * Approach 2: Using One Stack (More complex, requires checking previously visited nodes)
     * This is generally more intricate and often avoided in interviews unless specifically requested
     * for space optimization where Morris traversal is also an option. The two-stack approach is
     * more common for single-stack postorder simulation.
     * =======================================================================
     */

    /**
     * Performs an iterative Postorder Traversal of the binary tree using two stacks.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is pushed and popped from both stacks at most once.
     * Space Complexity: O(N), where N is the number of nodes in the tree.
     *                   In the worst case (skewed tree), both stacks can hold up to N nodes (roughly N/2 each).
     */
    public List<Integer> postorderTraversalIterativeTwoStacks(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack1 = new Stack<>(); // Main stack for traversal
        Stack<TreeNode> stack2 = new Stack<>(); // Stack to store results in reverse postorder

        stack1.push(root);

        while (!stack1.isEmpty()) {
            TreeNode current = stack1.pop();
            stack2.push(current); // Push popped node to stack2

            // Push left child then right child to stack1.
            // This order ensures that right is processed before left in stack1's LIFO,
            // which means right is pushed to stack2 before left.
            if (current.left != null) {
                stack1.push(current.left);
            }
            if (current.right != null) {
                stack1.push(current.right);
            }
        }

        // Pop all elements from stack2 to get the postorder traversal
        while (!stack2.isEmpty()) {
            result.add(stack2.pop().val);
        }

        return result;
    }

    /**
     * Performs an iterative Postorder Traversal of the binary tree using a single stack.
     * This approach is more complex than the two-stack method.
     * It relies on tracking the `lastVisited` node to decide whether to visit the root or pop.
     *
     * Logic:
     * 1. Initialize current node to root, stack empty, lastVisited to null.
     * 2. Loop while current is not null or stack is not empty:
     *    a. If current is not null: Push current to stack, move current to its left child.
     *       (Go left as far as possible)
     *    b. If current is null (reached end of left path):
     *       i. Peek at the top of the stack (this is the parent).
     *       ii. If parent's right child exists AND it's not the `lastVisited` node:
     *           Move current to parent's right child (process right subtree).
     *       iii. Else (right child is null OR right child has been visited):
     *           Pop parent, add its value to result, set `lastVisited` to this parent, set current to null
     *           (to signal that we've processed a root and should now check the parent's parent).
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is pushed and popped from the stack at most once.
     * Space Complexity: O(H), where H is the height of the tree.
     *                   In the worst case (skewed tree), the stack can hold up to N nodes.
     */
    public List<Integer> postorderTraversalIterativeOneStack(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        TreeNode lastVisited = null; // Tracks the last node that was processed (added to result)

        while (current != null || !stack.isEmpty()) {
            // Traverse to the leftmost node, pushing intermediate nodes
            if (current != null) {
                stack.push(current);
                current = current.left;
            } else {
                // Peek at the top node (potential parent)
                TreeNode peekNode = stack.peek();

                // If right child exists and hasn't been visited yet (important for postorder logic)
                if (peekNode.right != null && peekNode.right != lastVisited) {
                    current = peekNode.right; // Move to right child
                } else {
                    // Otherwise, process the current peekNode (Root)
                    // This means left and right subtrees (or one of them) have been processed
                    result.add(peekNode.val);
                    lastVisited = stack.pop(); // Mark this node as last visited and pop
                    current = null; // Reset current to null to avoid re-processing left/right path
                }
            }
        }
        return result;
    }
}
```