```java
package additional_implementations;

import com.example.treetraversals.datastructures.TreeNode;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * This class provides a side-by-side comparison of recursive and iterative
 * implementations for the three main Depth-First Search (DFS) binary tree traversals:
 * Preorder, Inorder, and Postorder.
 * It highlights the differences in approach and structure.
 */
public class IterativeVsRecursiveTraversals {

    // --- Preorder Traversal (Root, Left, Right) ---

    /**
     * Recursive Preorder Traversal.
     * Natural, concise, and often easier to understand initially.
     * Leverages the call stack implicitly.
     */
    public List<Integer> preorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderRecursiveHelper(root, result);
        return result;
    }

    private void preorderRecursiveHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);
        preorderRecursiveHelper(node.left, result);
        preorderRecursiveHelper(node.right, result);
    }

    /**
     * Iterative Preorder Traversal.
     * Uses an explicit stack to mimic the recursion.
     * Nodes are pushed onto the stack in such a way that they are processed in R-L-Root order for a LIFO stack.
     */
    public List<Integer> preorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            if (node.right != null) stack.push(node.right); // Push right first
            if (node.left != null) stack.push(node.left);   // Then push left
        }
        return result;
    }


    // --- Inorder Traversal (Left, Root, Right) ---

    /**
     * Recursive Inorder Traversal.
     * Simple and elegant for producing sorted order in BSTs.
     */
    public List<Integer> inorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderRecursiveHelper(root, result);
        return result;
    }

    private void inorderRecursiveHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorderRecursiveHelper(node.left, result);
        result.add(node.val);
        inorderRecursiveHelper(node.right, result);
    }

    /**
     * Iterative Inorder Traversal.
     * More complex than preorder iterative, as it requires "pausing" at a node
     * to traverse its left subtree before processing the node itself.
     */
    public List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        return result;
    }


    // --- Postorder Traversal (Left, Right, Root) ---

    /**
     * Recursive Postorder Traversal.
     * Often used for deletion or expression tree evaluation.
     */
    public List<Integer> postorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderRecursiveHelper(root, result);
        return result;
    }

    private void postorderRecursiveHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorderRecursiveHelper(node.left, result);
        postorderRecursiveHelper(node.right, result);
        result.add(node.val);
    }

    /**
     * Iterative Postorder Traversal (using two stacks).
     * Conceptually simpler than one-stack postorder.
     * First stack builds a "Root, Right, Left" order, second stack reverses it to "Left, Right, Root".
     */
    public List<Integer> postorderIterativeTwoStacks(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<TreeNode> s1 = new Stack<>();
        Stack<TreeNode> s2 = new Stack<>();
        s1.push(root);

        while (!s1.isEmpty()) {
            TreeNode node = s1.pop();
            s2.push(node);
            if (node.left != null) s1.push(node.left);
            if (node.right != null) s1.push(node.right);
        }

        while (!s2.isEmpty()) {
            result.add(s2.pop().val);
        }
        return result;
    }

    /**
     * Iterative Postorder Traversal (using one stack).
     * The most intricate of the iterative DFS traversals.
     * It requires keeping track of the last visited node to decide if the right subtree
     * has been processed before visiting the current node.
     */
    public List<Integer> postorderIterativeOneStack(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        TreeNode lastVisited = null; // Keep track of the last node whose value was added to result

        while (current != null || !stack.isEmpty()) {
            // Traverse left as far as possible
            if (current != null) {
                stack.push(current);
                current = current.left;
            } else {
                TreeNode peekNode = stack.peek();
                // If right child exists and hasn't been visited yet, go right
                if (peekNode.right != null && peekNode.right != lastVisited) {
                    current = peekNode.right;
                } else {
                    // Otherwise, both left and right (or no children) have been processed,
                    // so visit the node and mark it as lastVisited.
                    result.add(peekNode.val);
                    lastVisited = stack.pop();
                }
            }
        }
        return result;
    }
}
```