```java
package tree_traversals;

import java.util.Objects;

/**
 * Represents a node in a binary tree.
 * This is a standard structure used across all tree-related problems in this project.
 */
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;

    /**
     * Constructs a TreeNode with a given value and null left/right children.
     * @param val The integer value of the node.
     */
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /**
     * Constructs a TreeNode with a given value and specified left/right children.
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
        // A simple string representation for debugging purposes.
        // For more complex tree visualization, a dedicated traversal method would be needed.
        return "TreeNode{" + "val=" + val + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TreeNode treeNode = (TreeNode) o;
        return val == treeNode.val &&
                Objects.equals(left, treeNode.left) &&
                Objects.equals(right, treeNode.right);
    }

    @Override
    public int hashCode() {
        return Objects.hash(val, left, right);
    }
}
```