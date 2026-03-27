```java
package com.example.treetraversals;

import java.util.*;

/**
 * This class provides solutions for various binary tree traversal problems
 * using primarily recursive approaches for standard traversals and BFS for level order.
 *
 * Problems covered:
 * 1. Standard Traversals (Preorder, Inorder, Postorder) - Recursive
 * 2. Level Order Traversal (BFS)
 * 3. Zigzag Level Order Traversal
 * 4. Boundary Traversal
 * 5. Flatten Binary Tree to Linked List
 */
public class TreeTraversalSolutions {

    /*
     * =======================================================================
     * Problem 1: Standard Traversals (Recursive)
     * Description: Implement Preorder, Inorder, and Postorder traversals recursively.
     * =======================================================================
     */

    /**
     * Performs a Preorder Traversal of the binary tree recursively.
     * Preorder: Root -> Left -> Right
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the preorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H), where H is the height of the tree.
     *                   This is due to the recursion stack. In the worst case (skewed tree), H can be N.
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
        result.add(node.val);      // Visit root
        preorderHelper(node.left, result);  // Traverse left subtree
        preorderHelper(node.right, result); // Traverse right subtree
    }

    /**
     * Performs an Inorder Traversal of the binary tree recursively.
     * Inorder: Left -> Root -> Right
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the inorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H), where H is the height of the tree.
     *                   This is due to the recursion stack. In the worst case (skewed tree), H can be N.
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
        inorderHelper(node.left, result);   // Traverse left subtree
        result.add(node.val);       // Visit root
        inorderHelper(node.right, result);  // Traverse right subtree
    }

    /**
     * Performs a Postorder Traversal of the binary tree recursively.
     * Postorder: Left -> Right -> Root
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the postorder traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H), where H is the height of the tree.
     *                   This is due to the recursion stack. In the worst case (skewed tree), H can be N.
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
        postorderHelper(node.left, result);   // Traverse left subtree
        postorderHelper(node.right, result);  // Traverse right subtree
        result.add(node.val);       // Visit root
    }

    /*
     * =======================================================================
     * Problem 2: Level Order Traversal (BFS)
     * Description: Traverse a tree level by level.
     * =======================================================================
     */

    /**
     * Performs a Level Order Traversal (Breadth-First Search) of the binary tree.
     * Nodes are visited level by level, from left to right.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level's nodes.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is added to and removed from the queue exactly once.
     * Space Complexity: O(W), where W is the maximum width of the tree (max number of nodes at any level).
     *                   In the worst case (a complete binary tree), W can be N/2, so O(N).
     */
    public List<List<Integer>> levelOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // Start by adding the root to the queue

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of nodes at the current level
            List<Integer> currentLevelNodes = new ArrayList<>();

            // Process all nodes at the current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();
                currentLevelNodes.add(current.val);

                // Add children of the current node to the queue for the next level
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            result.add(currentLevelNodes); // Add the list of nodes for the current level to the result
        }
        return result;
    }

    /*
     * =======================================================================
     * Problem 3: Zigzag Level Order Traversal
     * Description: Traverse a tree level by level, alternating direction (left-to-right, then right-to-left).
     * =======================================================================
     */

    /**
     * Performs a Zigzag Level Order Traversal of the binary tree.
     * The first level is left-to-right, the second level is right-to-left, and so on.
     *
     * @param root The root of the binary tree.
     * @return A list of lists of integers, where each inner list represents a level's nodes
     *         in zigzag order.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited and processed once.
     * Space Complexity: O(W), where W is the maximum width of the tree (max number of nodes at any level).
     *                   In the worst case, W can be N/2, so O(N).
     */
    public List<List<Integer>> zigzagLevelOrderTraversal(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true; // Flag to determine traversal direction for the current level

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            // Use LinkedList to efficiently add elements at the beginning or end for zigzag
            LinkedList<Integer> currentLevelNodes = new LinkedList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode current = queue.poll();

                // Add node value based on current direction
                if (leftToRight) {
                    currentLevelNodes.addLast(current.val); // Add to end for left-to-right
                } else {
                    currentLevelNodes.addFirst(current.val); // Add to beginning for right-to-left
                }

                // Add children to the queue for the next level (always left then right,
                // the direction logic only affects how their values are added to currentLevelNodes)
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            result.add(currentLevelNodes);
            leftToRight = !leftToRight; // Toggle direction for the next level
        }
        return result;
    }

    /*
     * =======================================================================
     * Problem 4: Boundary Traversal
     * Description: Traverse the boundary of a binary tree in a counter-clockwise direction.
     *              The boundary traversal includes the left boundary (excluding leaf nodes),
     *              all leaf nodes (from left to right), and the right boundary (excluding leaf nodes, in reverse order).
     * =======================================================================
     */

    /**
     * Performs a Boundary Traversal of the binary tree.
     *
     * @param root The root of the binary tree.
     * @return A list of integers representing the boundary traversal.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited at most a constant number of times (checking for left/right boundary, or leaf).
     * Space Complexity: O(H) for recursion stack, plus O(N) for result list.
     *                   In worst case (skewed tree), H can be N, making it O(N).
     */
    public List<Integer> boundaryTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        result.add(root.val); // Add root always (if tree is not empty)

        // If root is a leaf, it's the only node, so no further boundary traversal needed.
        if (isLeaf(root)) {
            return result;
        }

        // 1. Add left boundary (excluding leaf nodes)
        addLeftBoundary(root.left, result);

        // 2. Add all leaf nodes
        addLeaves(root, result); // Start from root, but only its children will be checked if they are leaves

        // 3. Add right boundary (excluding leaf nodes), in reverse order
        addRightBoundary(root.right, result);

        return result;
    }

    /** Helper: Checks if a node is a leaf node. */
    private boolean isLeaf(TreeNode node) {
        return node != null && node.left == null && node.right == null;
    }

    /** Helper: Adds left boundary nodes (top-down) to the result list, excluding leaves. */
    private void addLeftBoundary(TreeNode node, List<Integer> result) {
        while (node != null && !isLeaf(node)) {
            result.add(node.val);
            if (node.left != null) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
    }

    /** Helper: Adds all leaf nodes (left-to-right) to the result list. */
    private void addLeaves(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        if (isLeaf(node)) {
            result.add(node.val);
            return;
        }
        addLeaves(node.left, result);
        addLeaves(node.right, result);
    }

    /** Helper: Adds right boundary nodes (bottom-up, using recursion) to the result list, excluding leaves. */
    private void addRightBoundary(TreeNode node, List<Integer> result) {
        List<Integer> temp = new ArrayList<>(); // To store right boundary nodes in reverse
        while (node != null && !isLeaf(node)) {
            temp.add(node.val);
            if (node.right != null) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        // Add nodes from temp list in reverse order
        for (int i = temp.size() - 1; i >= 0; i--) {
            result.add(temp.get(i));
        }
    }


    /*
     * =======================================================================
     * Problem 5: Flatten Binary Tree to Linked List
     * Description: Flatten a binary tree into a "linked list" in-place.
     *              The "linked list" should be in the same order as a pre-order traversal.
     *              The right child pointer should point to the next node in the list, and
     *              the left child pointer should always be null.
     * =======================================================================
     */

    /**
     * Flattens a binary tree into a pseudo-linked list in-place using a preorder traversal logic.
     * The `right` child pointer becomes the `next` pointer, and the `left` child pointer is set to `null`.
     *
     * This recursive approach uses a `prev` TreeNode to keep track of the previously visited node
     * in reverse preorder (right-root-left) to achieve the desired flattening in O(1) space
     * (excluding recursion stack).
     *
     * @param root The root of the binary tree to flatten.
     *
     * Time Complexity: O(N), where N is the number of nodes in the tree.
     *                  Each node is visited exactly once.
     * Space Complexity: O(H), where H is the height of the tree, due to the recursion stack.
     *                   In the worst case (skewed tree), H can be N.
     */
    private TreeNode prev = null; // Helper variable to keep track of the previous node in the modified preorder traversal

    public void flatten(TreeNode root) {
        if (root == null) {
            return;
        }

        // Recursively flatten the right subtree first
        flatten(root.right);
        // Then recursively flatten the left subtree
        flatten(root.left);

        // After flattening children, link current node to the 'prev' node
        // 'prev' will be the rightmost node of the previously flattened subtree (or null initially)
        root.right = prev;
        root.left = null; // Left child must be null for the "linked list" structure
        prev = root;       // Update 'prev' to the current node for the next iteration (parent node)
    }

    // Alternative approach for flatten (more intuitive preorder, but requires temporary variables)
    // public void flattenAlternative(TreeNode root) {
    //     if (root == null) return;

    //     TreeNode current = root;
    //     while (current != null) {
    //         if (current.left != null) {
    //             // Find the rightmost node in the left subtree
    //             TreeNode rightmost = current.left;
    //             while (rightmost.right != null) {
    //                 rightmost = rightmost.right;
    //             }

    //             // Attach the current's right subtree to the rightmost node of the left subtree
    //             rightmost.right = current.right;

    //             // Move the left subtree to the right
    //             current.right = current.left;
    //             current.left = null; // Set left to null
    //         }
    //         // Move to the next node in the flattened structure
    //         current = current.right;
    //     }
    // }
}
```