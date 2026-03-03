```java
package com.example.treetraversals;

/**
 * Definition for a binary tree node.
 * This class provides a basic structure for a tree node, commonly used in binary tree problems.
 */
public class TreeNode {
    public int val;       // Value of the node
    public TreeNode left;  // Reference to the left child
    public TreeNode right; // Reference to the right child

    /**
     * Constructor for a tree node with a given value.
     * Left and right children are initialized to null.
     * @param val The integer value to store in the node.
     */
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * Constructor for a tree node with a given value and specified children.
     * @param val The integer value to store in the node.
     * @param left The left child node.
     * @param right The right child node.
     */
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**
     * Helper method to build a tree from an array representation (level order).
     * Null values in the array represent missing children.
     * Example: [3,9,20,null,null,15,7]
     *
     * @param array The array representation of the tree. Null indicates no node.
     * @return The root of the constructed tree.
     */
    public static TreeNode fromArray(Integer[] array) {
        if (array == null || array.length == 0 || array[0] == null) {
            return null;
        }

        TreeNode root = new TreeNode(array[0]);
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);

        int i = 1;
        while (!queue.isEmpty() && i < array.length) {
            TreeNode current = queue.poll();

            // Add left child
            if (i < array.length && array[i] != null) {
                current.left = new TreeNode(array[i]);
                queue.offer(current.left);
            }
            i++;

            // Add right child
            if (i < array.length && array[i] != null) {
                current.right = new TreeNode(array[i]);
                queue.offer(current.right);
            }
            i++;
        }
        return root;
    }
}
```