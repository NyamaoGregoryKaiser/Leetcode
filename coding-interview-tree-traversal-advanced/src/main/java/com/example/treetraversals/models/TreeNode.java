```java
package com.example.treetraversals.models;

/**
 * Represents a node in a binary tree.
 * Each node has an integer value, and references to its left and right children.
 */
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;

    /**
     * Default constructor for an empty node.
     */
    public TreeNode() {}

    /**
     * Constructor for a node with a given value.
     * Left and right children are initialized to null.
     * @param val The integer value of the node.
     */
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * Constructor for a node with a given value and specific left and right children.
     * @param val The integer value of the node.
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
        return "TreeNode{" + "val=" + val + '}';
    }
}

```