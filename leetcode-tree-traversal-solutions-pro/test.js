package com.interview.treetraversals;

/**
 * Definition for a binary tree node.
 * This class represents a single node in a binary tree, holding an integer value
 * and references to its left and right children.
 */
public class TreeNode {
    public int val;       // The value stored in the node
    public TreeNode left;  // Reference to the left child node
    public TreeNode right; // Reference to the right child node

    /**
     * Constructor to create a new tree node with a given value.
     * The left and right children are initialized to null.
     * @param val The integer value to be stored in this node.
     */
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * Constructor to create a new tree node with a given value and specific children.
     * @param val The integer value to be stored in this node.
     * @param left The left child node.
     * @param right The right child node.
     */
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    @Override
    public String toString() {
        return "TreeNode{" +
               "val=" + val +
               '}';
    }
}