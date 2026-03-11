```javascript
/**
 * @fileoverview Defines the TreeNode class for binary tree implementation.
 */

/**
 * Represents a node in a Binary Tree.
 * Each node has a value, and references to its left and right children.
 */
class TreeNode {
    /**
     * Constructs a new TreeNode.
     * @param {*} val The value to store in the node. Defaults to 0.
     * @param {TreeNode|null} left The left child node. Defaults to null.
     * @param {TreeNode|null} right The right child node. Defaults to null.
     */
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**
     * Checks if the node is a leaf node (has no children).
     * @returns {boolean} True if it's a leaf, false otherwise.
     */
    isLeaf() {
        return this.left === null && this.right === null;
    }

    /**
     * Returns a string representation of the node.
     * @returns {string} The value of the node as a string.
     */
    toString() {
        return String(this.val);
    }
}

module.exports = TreeNode;
```