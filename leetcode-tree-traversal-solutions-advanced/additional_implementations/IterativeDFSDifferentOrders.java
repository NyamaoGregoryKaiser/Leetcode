```java
package additional_implementations;

import com.example.treetraversals.datastructures.TreeNode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;

/**
 * This class specifically demonstrates the iterative implementations for
 * Preorder, Inorder, and Postorder traversals using a stack.
 * It provides a focused view on how stack manipulation allows simulating recursion
 * for different traversal orders.
 */
public class IterativeDFSDifferentOrders {

    /**
     * Iterative Preorder Traversal (Root, Left, Right).
     * Algorithm:
     * 1. Push root to stack.
     * 2. While stack is not empty:
     *    a. Pop node, add to result.
     *    b. Push right child (if exists).
     *    c. Push left child (if exists). (This ensures left is processed before right due to LIFO)
     *
     * Time Complexity: O(N)
     * Space Complexity: O(H) (height of the tree, worst case O(N))
     */
    public List<Integer> preorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);

            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
        }
        return result;
    }

    /**
     * Iterative Inorder Traversal (Left, Root, Right).
     * Algorithm:
     * 1. Initialize `current` to root.
     * 2. While `current` is not null or stack is not empty:
     *    a. While `current` is not null: push `current` to stack, then move `current = current.left`.
     *    b. `current` is now null (reached leftmost). Pop a node from stack. Add its value to result.
     *    c. Move `current = current.right`.
     *
     * Time Complexity: O(N)
     * Space Complexity: O(H) (height of the tree, worst case O(N))
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

    /**
     * Iterative Postorder Traversal (Left, Right, Root) - Two Stacks.
     * Algorithm:
     * 1. Push root to `stack1`.
     * 2. While `stack1` is not empty:
     *    a. Pop node from `stack1`, push to `stack2`.
     *    b. Push left child (if exists) to `stack1`.
     *    c. Push right child (if exists) to `stack1`.
     * 3. Pop all elements from `stack2` and add to result (this reverses the order).
     *
     * Time Complexity: O(N)
     * Space Complexity: O(N) (both stacks can hold up to N nodes in worst case)
     */
    public List<Integer> postorderIterativeTwoStacks(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack1 = new Stack<>();
        Stack<TreeNode> stack2 = new Stack<>();
        stack1.push(root);

        while (!stack1.isEmpty()) {
            TreeNode node = stack1.pop();
            stack2.push(node);

            if (node.left != null) {
                stack1.push(node.left);
            }
            if (node.right != null) {
                stack1.push(node.right);
            }
        }

        while (!stack2.isEmpty()) {
            result.add(stack2.pop().val);
        }
        return result;
    }

    /**
     * Iterative Postorder Traversal (Left, Right, Root) - One Stack.
     * Algorithm:
     * 1. Initialize `current` to root, `lastVisited` to null.
     * 2. While `current` is not null or stack is not empty:
     *    a. While `current` is not null: push `current` to stack, then move `current = current.left`.
     *    b. Peek node from stack (`peekNode`).
     *    c. If `peekNode.right` exists AND `peekNode.right` is not `lastVisited`:
     *       Move `current = peekNode.right`. (This means we need to process the right subtree)
     *    d. Else (no right child, or right child has been visited):
     *       Pop `peekNode`. Add its value to result. Set `lastVisited = peekNode`.
     *
     * Time Complexity: O(N)
     * Space Complexity: O(H) (height of the tree, worst case O(N))
     */
    public List<Integer> postorderIterativeOneStack(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        TreeNode lastVisited = null;

        while (current != null || !stack.isEmpty()) {
            if (current != null) {
                stack.push(current);
                current = current.left;
            } else {
                TreeNode peekNode = stack.peek();
                if (peekNode.right != null && peekNode.right != lastVisited) {
                    current = peekNode.right;
                } else {
                    result.add(peekNode.val);
                    lastVisited = stack.pop();
                }
            }
        }
        return result;
    }
}
```