```java
package com.example.treetraversals.datastructures;

/**
 * Definition for a binary tree node.
 * This class represents a single node in a binary tree,
 * containing an integer value and references to its left and right children.
 */
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;

    /**
     * Constructs a new TreeNode with the specified value.
     * Left and right children are initialized to null.
     *
     * @param val The integer value to be stored in this node.
     */
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * Constructs a new TreeNode with the specified value and children.
     * This constructor is useful for creating a tree structure directly.
     *
     * @param val The integer value.
     * @param left The left child node.
     * @param right The right child node.
     */
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**
     * Provides a string representation of the TreeNode, primarily for debugging.
     * This basic implementation only shows the node's value.
     * For full tree visualization, a more complex method would be needed.
     *
     * @return A string representation of the node's value.
     */
    @Override
    public String toString() {
        return String.valueOf(val);
    }
}
```