```java
package com.example.treetraversals;

import com.example.treetraversals.models.TreeNode;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * This class implements the three fundamental binary tree traversals:
 * Inorder, Preorder, and Postorder.
 * Each traversal is provided with both a recursive and an iterative solution.
 *
 * Tree Traversals are algorithms for visiting all nodes in a tree data structure.
 * There are two main types:
 * 1. Depth-First Search (DFS): Explores as far as possible along each branch before backtracking.
 *    Inorder, Preorder, and Postorder are DFS traversals.
 * 2. Breadth-First Search (BFS): Explores all nodes at the present depth before moving on
 *    to nodes at the next depth level (e.g., Level Order Traversal).
 */
public class BasicTraversals {

    // --- Inorder Traversal ---
    // Order: Left -> Root -> Right
    // For a Binary Search Tree (BST), inorder traversal visits nodes in non-decreasing order.

    /**
     * Performs an Inorder Traversal of a binary tree recursively.
     * Inorder traversal visits the left subtree, then the root, then the right subtree.
     *
     * @param root The root node of the binary tree.
     * @return A list of integers representing the inorder traversal of the tree.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is visited once.
     * Space Complexity: O(H) where H is the height of the tree. This space is used by the
     *                    recursion call stack. In the worst case (skewed tree), H can be N,
     *                    leading to O(N) space. In the best case (balanced tree), H is logN,
     *                    leading to O(logN) space.
     */
    public List<Integer> inorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        // Call the helper function to perform the recursive traversal.
        inorderHelper(root, result);
        return result;
    }

    /**
     * Helper method for recursive inorder traversal.
     * @param node The current node being visited.
     * @param result The list to store the traversal sequence.
     */
    private void inorderHelper(TreeNode node, List<Integer> result) {
        // Base case: if the current node is null, there's nothing to visit, so return.
        if (node == null) {
            return;
        }
        // 1. Recursively traverse the left subtree.
        inorderHelper(node.left, result);
        // 2. Visit the current node (add its value to the result list).
        result.add(node.val);
        // 3. Recursively traverse the right subtree.
        inorderHelper(node.right, result);
    }

    /**
     * Performs an Inorder Traversal of a binary tree iteratively using a stack.
     * The iterative approach simulates the recursion stack manually.
     *
     * @param root The root node of the binary tree.
     * @return A list of integers representing the inorder traversal of the tree.
     *
     * Time Complexity: O(N) where N is the number of nodes in the tree. Each node is pushed
     *                  and popped from the stack at most once.
     * Space Complexity: O(H) where H is the height of the tree. This space is used by the
     *                    stack. In the worst case (skewed tree), H can be N, leading to O(N) space.
     *                    In the best case (balanced tree), H is logN, leading to O(logN) space.
     */
    public List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        // Use a stack to keep track of nodes to visit later (parent nodes).
        Stack<TreeNode> stack = new Stack<>();
        // 'current' pointer to traverse the tree.
        TreeNode current = root;

        // Loop continues as long as there are nodes to process (current is not null)
        // or there are nodes in the stack waiting to be visited.
        while (current != null || !stack.isEmpty()) {
            // Step 1: Traverse to the leftmost node.
            // Push all nodes encountered along the path onto the stack.
            while (current != null) {
                stack.push(current); // Push the current node, as we need to visit it after its left subtree.
                current = current.left; // Move to the left child.
            }

            // At this point, 'current' is null, meaning we've reached the leftmost node (or an empty subtree).
            // The top of the stack is now the node whose left subtree has been fully traversed (or is null).
            // Step 2: Visit the node (pop from stack).
            current = stack.pop();       // Pop the node from the stack. This is the 'root' in "Left -> Root -> Right".
            result.add(current.val);     // Add its value to the result list.

            // Step 3: Traverse its right subtree.
            // After visiting the current node, its right subtree is the next part of the inorder sequence.
            current = current.right;     // Set 'current' to the right child, and the loop will continue.
                                         // If current.right is null, the loop will pop the next element from stack.
        }
        return result;
    }


    // --- Preorder Traversal ---
    // Order: Root -> Left -> Right
    // Preorder traversal is useful for creating a copy of the tree or for serializing it.

    /**
     * Performs a Preorder Traversal of a binary tree recursively.
     * Preorder traversal visits the root, then the left subtree, then the right subtree.
     *
     * @param root The root node of the binary tree.
     * @return A list of integers representing the preorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node visited once.
     * Space Complexity: O(H) for recursion stack.
     */
    public List<Integer> preorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }

    /**
     * Helper method for recursive preorder traversal.
     * @param node The current node being visited.
     * @param result The list to store the traversal sequence.
     */
    private void preorderHelper(TreeNode node, List<Integer> result) {
        // Base case: if the current node is null, return.
        if (node == null) {
            return;
        }
        // 1. Visit the current node (add its value to the result list).
        result.add(node.val);
        // 2. Recursively traverse the left subtree.
        preorderHelper(node.left, result);
        // 3. Recursively traverse the right subtree.
        preorderHelper(node.right, result);
    }

    /**
     * Performs a Preorder Traversal of a binary tree iteratively using a stack.
     * The iterative approach for preorder is quite straightforward.
     *
     * @param root The root node of the binary tree.
     * @return A list of integers representing the preorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node pushed and popped once.
     * Space Complexity: O(H) for stack.
     */
    public List<Integer> preorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        // Use a stack to keep track of nodes to visit.
        // For preorder (Root, Left, Right), we push Root, then Left, then Right.
        // When popping, we process Root first. Then, to ensure Left is processed before Right,
        // we push Right first, then Left, because stack is LIFO.
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root); // Start by pushing the root node.

        // Loop as long as there are nodes in the stack.
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop(); // Pop a node. This is the 'Root' to be visited.
            result.add(node.val);       // Add its value to the result.

            // Push right child first, so it will be processed *after* the left child.
            if (node.right != null) {
                stack.push(node.right);
            }
            // Push left child next, so it will be processed *before* the right child (LIFO).
            if (node.left != null) {
                stack.push(node.left);
            }
        }
        return result;
    }


    // --- Postorder Traversal ---
    // Order: Left -> Right -> Root
    // Postorder traversal is useful for deleting a tree or evaluating expressions.

    /**
     * Performs a Postorder Traversal of a binary tree recursively.
     * Postorder traversal visits the left subtree, then the right subtree, then the root.
     *
     * @param root The root node of the binary tree.
     * @return A list of integers representing the postorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node visited once.
     * Space Complexity: O(H) for recursion stack.
     */
    public List<Integer> postorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }

    /**
     * Helper method for recursive postorder traversal.
     * @param node The current node being visited.
     * @param result The list to store the traversal sequence.
     */
    private void postorderHelper(TreeNode node, List<Integer> result) {
        // Base case: if the current node is null, return.
        if (node == null) {
            return;
        }
        // 1. Recursively traverse the left subtree.
        postorderHelper(node.left, result);
        // 2. Recursively traverse the right subtree.
        postorderHelper(node.right, result);
        // 3. Visit the current node (add its value to the result list).
        result.add(node.val);
    }

    /**
     * Performs a Postorder Traversal of a binary tree iteratively using two stacks.
     * This approach is generally easier to understand than the single-stack variant.
     * The idea is to reverse a modified preorder traversal.
     * A regular preorder is Root -> Left -> Right.
     * If we modify preorder to Root -> Right -> Left and store it, then reverse the stored list,
     * we get Left -> Right -> Root, which is postorder.
     *
     * Stack1 is used to get nodes in Root -> Right -> Left order.
     * Stack2 stores these nodes, which naturally reverses their order to Left -> Right -> Root.
     *
     * @param root The root node of the binary tree.
     * @return A list of integers representing the postorder traversal of the tree.
     *
     * Time Complexity: O(N). Each node is pushed and popped from both stacks at most once.
     * Space Complexity: O(N). In the worst case (skewed tree), both stacks could hold up to N nodes.
     */
    public List<Integer> postorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack1 = new Stack<>(); // Primary stack for traversal (Root -> Right -> Left)
        Stack<TreeNode> stack2 = new Stack<>(); // Secondary stack to collect nodes in reversed order

        stack1.push(root); // Start by pushing the root to stack1.

        // Phase 1: Populate stack2 with nodes in Root -> Right -> Left order.
        while (!stack1.isEmpty()) {
            TreeNode node = stack1.pop(); // Pop a node from stack1. This is the 'Root' part.
            stack2.push(node);            // Push it to stack2.

            // Push left child first, then right child. This ensures that when stack1 pops
            // for the next iteration, the right child is processed BEFORE the left child,
            // giving us a Root -> Right -> Left sequence in stack1's processing.
            if (node.left != null) {
                stack1.push(node.left);
            }
            if (node.right != null) {
                stack1.push(node.right);
            }
        }

        // Phase 2: Pop from stack2 to get the final Postorder (Left -> Right -> Root).
        // Since stack2 was populated with Root -> Right -> Left, popping it will reverse this order.
        while (!stack2.isEmpty()) {
            result.add(stack2.pop().val);
        }

        return result;
    }
}
```