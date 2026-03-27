```java
package com.example.treetraversals;

/**
 * Definition for a binary tree node.
 * This class represents a single node in a binary tree,
 * holding an integer value and references to its left and right children.
 */
public class TreeNode {
    public int val;       // The value stored in the node
    public TreeNode left;  // Reference to the left child node
    public TreeNode right; // Reference to the right child node

    /**
     * Constructor to create a new TreeNode with a given value.
     * The left and right children are initialized to null.
     * @param val The integer value to be stored in the node.
     */
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * Constructor to create a new TreeNode with a given value and children.
     * @param val The integer value to be stored in the node.
     * @param left The left child node.
     * @param right The right child node.
     */
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**
     * Overrides the toString method to provide a string representation of the node.
     * Useful for debugging.
     * @return A string representation of the node's value.
     */
    @Override
    public String toString() {
        return String.valueOf(val);
    }

    /**
     * Custom equals method to compare two TreeNodes based on their structure and values.
     * This is useful for comparing expected and actual tree structures in tests.
     * @param o The object to compare with.
     * @return true if the trees rooted at this node and 'o' are identical, false otherwise.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TreeNode treeNode = (TreeNode) o;
        return val == treeNode.val &&
                (left == treeNode.left || (left != null && left.equals(treeNode.left))) &&
                (right == treeNode.right || (right != null && right.equals(treeNode.right)));
    }

    /**
     * Custom hashCode method to accompany the custom equals method.
     * This is generally required when overriding equals.
     * @return The hash code for the node.
     */
    @Override
    public int hashCode() {
        int result = val;
        result = 31 * result + (left != null ? left.hashCode() : 0);
        result = 31 * result + (right != null ? right.hashCode() : 0);
        return result;
    }
}
```