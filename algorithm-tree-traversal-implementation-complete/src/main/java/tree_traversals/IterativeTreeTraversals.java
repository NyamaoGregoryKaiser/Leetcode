```java
package tree_traversals;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

/**
 * This class focuses on iterative solutions for additional, more complex tree problems
 * that often leverage traversal patterns.
 */
public class IterativeTreeTraversals {

    // --- Problem 1: Kth Smallest Element in a BST (Iterative Inorder) ---

    /**
     * Finds the Kth smallest element in a Binary Search Tree (BST) using an iterative inorder traversal.
     * Inorder traversal of a BST visits nodes in increasing order.
     *
     * @param root The root of the BST.
     * @param k The desired rank (1-indexed) of the smallest element to find.
     * @return The value of the Kth smallest element.
     * @throws IllegalArgumentException if k is out of bounds (e.g., k <= 0 or k > number of nodes).
     *
     * Time Complexity: O(H + k), where H is the height of the tree. In the worst case (skewed tree)
     *                  or if k is close to N, it can be O(N). We traverse down to the leftmost node
     *                  (H steps) and then k steps up/right.
     * Space Complexity: O(H) for the stack.
     */
    public int kthSmallestInBSTIterative(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        int count = 0; // Counter for visited nodes

        while (current != null || !stack.isEmpty()) {
            // Traverse to the leftmost node, pushing nodes onto the stack
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // Pop the top node (which is the next smallest)
            current = stack.pop();
            count++;

            // If we found the Kth smallest node, return its value
            if (count == k) {
                return current.val;
            }

            // Move to the right subtree
            current = current.right;
        }

        // If k is greater than the number of nodes, it means k is out of bounds.
        // In a typical LeetCode-style problem, k is guaranteed to be valid.
        // For robustness, we could throw an exception or return a special value.
        throw new IllegalArgumentException("k is out of bounds or tree is empty for k=" + k);
    }

    // --- Problem 2: Path Sum (Iterative DFS using Stack) ---

    /**
     * Given the root of a binary tree and an integer targetSum, return true if the tree has a
     * root-to-leaf path such that adding up all the values along the path equals targetSum.
     * A leaf is a node with no children.
     *
     * This uses an iterative Depth-First Search (DFS) approach with a stack.
     * Each element in the stack stores a `TreeNode` and the `sum` accumulated so far to reach that node.
     *
     * @param root The root of the binary tree.
     * @param targetSum The target sum to find.
     * @return true if such a path exists, false otherwise.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree. Each node is pushed and popped once.
     * Space Complexity: O(H), where H is the height of the tree. This is for the stack.
     *                   In the worst case (skewed tree), H can be N, so O(N).
     *                   In the best case (balanced tree), H is log N, so O(log N).
     */
    public boolean hasPathSumIterativeDFS(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }

        // Use a pair (TreeNode, currentPathSum) to store state
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, root.val));

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> currentPair = stack.pop();
            TreeNode currentNode = currentPair.getKey();
            int currentSum = currentPair.getValue();

            // Check if it's a leaf node
            if (currentNode.left == null && currentNode.right == null) {
                if (currentSum == targetSum) {
                    return true;
                }
            }

            // Push right child first (so left child is processed first, standard DFS)
            if (currentNode.right != null) {
                stack.push(new Pair<>(currentNode.right, currentSum + currentNode.right.val));
            }
            if (currentNode.left != null) {
                stack.push(new Pair<>(currentNode.left, currentSum + currentNode.left.val));
            }
        }
        return false;
    }

    /**
     * Alternative for Path Sum using Iterative Breadth-First Search (BFS) with a queue.
     *
     * @param root The root of the binary tree.
     * @param targetSum The target sum to find.
     * @return true if such a path exists, false otherwise.
     *
     * Time Complexity: O(N). Each node is enqueued and dequeued once.
     * Space Complexity: O(W), where W is the maximum width of the tree (for the queue).
     *                   In the worst case (complete binary tree), W can be N/2, so O(N).
     */
    public boolean hasPathSumIterativeBFS(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }

        Queue<Pair<TreeNode, Integer>> queue = new LinkedList<>();
        queue.offer(new Pair<>(root, root.val));

        while (!queue.isEmpty()) {
            Pair<TreeNode, Integer> currentPair = queue.poll();
            TreeNode currentNode = currentPair.getKey();
            int currentSum = currentPair.getValue();

            // Check if it's a leaf node
            if (currentNode.left == null && currentNode.right == null) {
                if (currentSum == targetSum) {
                    return true;
                }
            }

            // Enqueue children
            if (currentNode.left != null) {
                queue.offer(new Pair<>(currentNode.left, currentSum + currentNode.left.val));
            }
            if (currentNode.right != null) {
                queue.offer(new Pair<>(currentNode.right, currentSum + currentNode.right.val));
            }
        }
        return false;
    }


    // --- Problem 3: Flatten Binary Tree to Linked List (Iterative) ---

    /**
     * Flattens a binary tree into a "linked list" in-place.
     * The "linked list" should be in the same order as a preorder traversal.
     * The right child pointer should point to the next node in the list, and the left child pointer should always be null.
     *
     * This iterative approach simulates a preorder traversal and rebuilds pointers on the fly.
     * It uses a stack to keep track of nodes to visit.
     *
     * @param root The root of the binary tree to flatten.
     *
     * Time Complexity: O(N), where N is the number of nodes. Each node is visited (pushed/popped) once.
     * Space Complexity: O(H) for the stack, where H is the height of the tree.
     */
    public void flattenIterative(TreeNode root) {
        if (root == null) {
            return;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        TreeNode previous = null; // Tracks the previously processed node in preorder

        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();

            // If there's a previous node, link it to the current node
            if (previous != null) {
                previous.right = current;
                previous.left = null; // Left child must be null
            }

            // Push right child first, then left child (to ensure left is processed before right in preorder)
            if (current.right != null) {
                stack.push(current.right);
            }
            if (current.left != null) {
                stack.push(current.left);
            }

            previous = current; // Update previous to the current node
        }
    }

    /**
     * Alternative iterative flatten: Using an approach that directly manipulates pointers
     * without an explicit stack. It effectively finds the rightmost node of the left subtree
     * and links it to the right subtree. This is similar to Morris traversal idea but specific to flattening.
     *
     * @param root The root of the binary tree to flatten.
     * Time Complexity: O(N)
     * Space Complexity: O(1) -- This is the true memory-efficient version!
     */
    public void flattenIterativeO1Space(TreeNode root) {
        if (root == null) {
            return;
        }

        TreeNode current = root;
        while (current != null) {
            if (current.left != null) {
                // Find the rightmost node in the left subtree
                TreeNode rightmostInLeft = current.left;
                while (rightmostInLeft.right != null) {
                    rightmostInLeft = rightmostInLeft.right;
                }

                // Attach current's right subtree to the rightmost node of its left subtree
                rightmostInLeft.right = current.right;

                // Move current's left subtree to its right
                current.right = current.left;
                current.left = null; // Clear current's left pointer
            }
            // Move to the next node in the flattened list (which is now current.right)
            current = current.right;
        }
    }


    // --- Helper class for Pair ---
    private static class Pair<K, V> {
        private K key;
        private V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
    }
}
```