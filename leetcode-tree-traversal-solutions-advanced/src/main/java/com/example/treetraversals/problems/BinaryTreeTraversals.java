```java
package com.example.treetraversals.problems;

import com.example.treetraversals.datastructures.TreeNode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;
import java.util.Queue;

/**
 * This class implements various standard binary tree traversals:
 * Preorder, Inorder, Postorder, and Level Order.
 * Each traversal is provided with both recursive and iterative solutions
 * where applicable, along with detailed time and space complexity analysis.
 */
public class BinaryTreeTraversals {

    // --- Preorder Traversal (Root, Left, Right) ---

    /**
     * Recursive Preorder Traversal.
     * Visits the root, then recursively traverses the left subtree, then the right subtree.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H) in the average case (balanced tree) and O(N) in the worst case (skewed tree),
     *                   where H is the height of the tree. This is due to the recursion stack space.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     */
    public List<Integer> preorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }

    private void preorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        result.add(node.val);         // Visit root
        preorderHelper(node.left, result);  // Traverse left
        preorderHelper(node.right, result); // Traverse right
    }

    /**
     * Iterative Preorder Traversal using a Stack.
     * The strategy is to push the root, then repeatedly pop a node, add its value to the result,
     * and then push its right child (if exists) and then its left child (if exists).
     * Pushing right then left ensures left is processed before right because of LIFO stack behavior.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is pushed and popped exactly once.
     * Space Complexity: O(H) in the average case (balanced tree) and O(N) in the worst case (skewed tree),
     *                   where H is the height of the tree. This is due to the stack space.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     */
    public List<Integer> preorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);

            // Push right child first, so left child is processed after (LIFO)
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
        }
        return result;
    }

    // --- Inorder Traversal (Left, Root, Right) ---

    /**
     * Recursive Inorder Traversal.
     * Recursively traverses the left subtree, then visits the root, then recursively traverses the right subtree.
     * For a Binary Search Tree (BST), inorder traversal yields nodes in non-decreasing order.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     * Space Complexity: O(H) in the average case and O(N) in the worst case, due to recursion stack.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     */
    public List<Integer> inorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }

    private void inorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        inorderHelper(node.left, result);   // Traverse left
        result.add(node.val);          // Visit root
        inorderHelper(node.right, result);  // Traverse right
    }

    /**
     * Iterative Inorder Traversal using a Stack.
     * The strategy involves continuously going left and pushing nodes onto the stack.
     * Once a null left child is reached, pop a node, add its value to the result,
     * and then move to its right child.
     *
     * Time Complexity: O(N), where N is the number of nodes. Each node is pushed and popped once.
     * Space Complexity: O(H) in the average case and O(N) in the worst case, due to stack space.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     */
    public List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Reach the leftmost node of the current subtree
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // Current must be null at this point, so pop from stack
            current = stack.pop();
            result.add(current.val); // Visit the node

            // Now, traverse the right subtree
            current = current.right;
        }
        return result;
    }

    // --- Postorder Traversal (Left, Right, Root) ---

    /**
     * Recursive Postorder Traversal.
     * Recursively traverses the left subtree, then the right subtree, then visits the root.
     *
     * Time Complexity: O(N).
     * Space Complexity: O(H) average, O(N) worst, due to recursion stack.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     */
    public List<Integer> postorderTraversalRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }

    private void postorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        postorderHelper(node.left, result);  // Traverse left
        postorderHelper(node.right, result); // Traverse right
        result.add(node.val);         // Visit root
    }

    /**
     * Iterative Postorder Traversal using Two Stacks.
     * This approach is straightforward:
     * 1. Push root to stack1.
     * 2. While stack1 is not empty:
     *    a. Pop a node from stack1 and push it to stack2.
     *    b. Push left child of popped node to stack1 (if exists).
     *    c. Push right child of popped node to stack1 (if exists).
     * 3. Finally, pop all elements from stack2 and add them to the result list.
     *    This effectively reverses the "Root, Right, Left" order that stack1 produces,
     *    resulting in "Left, Right, Root".
     *
     * Time Complexity: O(N). Each node is pushed and popped twice (once from stack1, once from stack2).
     * Space Complexity: O(N) in the worst case (skewed tree), as both stacks can hold all nodes.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     */
    public List<Integer> postorderTraversalIterativeTwoStacks(TreeNode root) {
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
     * Iterative Postorder Traversal using One Stack.
     * This is more complex than the two-stack approach.
     * The idea is to push a node to the stack, then repeatedly go to its left child.
     * When backtracking, if a node's right child exists and has not been visited,
     * make the right child the current node and repeat. Otherwise, visit the node.
     *
     * Time Complexity: O(N). Each node is processed constant number of times.
     * Space Complexity: O(H) average, O(N) worst.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     */
    public List<Integer> postorderTraversalIterativeOneStack(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        // This 'lastVisited' helps distinguish between returning from left vs right child
        TreeNode lastVisited = null;

        while (current != null || !stack.isEmpty()) {
            if (current != null) {
                stack.push(current);
                current = current.left;
            } else {
                TreeNode peekNode = stack.peek();
                // If right child exists and hasn't been visited yet
                if (peekNode.right != null && peekNode.right != lastVisited) {
                    current = peekNode.right;
                } else {
                    // Otherwise, pop the node and process it
                    result.add(peekNode.val);
                    lastVisited = stack.pop();
                }
            }
        }
        return result;
    }


    // --- Level Order Traversal (BFS) ---

    /**
     * Iterative Level Order Traversal (Breadth-First Search).
     * Visits nodes level by level, from left to right.
     * Uses a queue to store nodes to be visited.
     *
     * Time Complexity: O(N), where N is the number of nodes. Each node is enqueued and dequeued once.
     * Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
     *                   This can be O(N/2) for a complete binary tree, effectively O(N).
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level's nodes.
     */
    public List<List<Integer>> levelOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Add the root node to the queue

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of nodes at the current level
            List<Integer> currentLevel = new ArrayList<>();

            // Process all nodes at the current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll(); // Dequeue a node
                currentLevel.add(node.val);   // Add its value to the current level list

                // Enqueue its children for the next level
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            result.add(currentLevel); // Add the completed level to the overall result
        }
        return result;
    }
}
```