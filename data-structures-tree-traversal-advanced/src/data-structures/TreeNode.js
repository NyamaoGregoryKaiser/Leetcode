```javascript
/**
 * @class TreeNode
 * @description Represents a node in a Binary Tree.
 * Each node has a value, a left child, and a right child.
 */
class TreeNode {
    /**
     * Creates an instance of TreeNode.
     * @param {*} val - The value of the node.
     * @param {TreeNode | null} left - The left child of the node. Defaults to null.
     * @param {TreeNode | null} right - The right child of the node. Defaults to null.
     */
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    /**
     * Helper to easily check if a node is a leaf node.
     * @returns {boolean} True if the node has no children, false otherwise.
     */
    isLeaf() {
        return this.left === null && this.right === null;
    }
}

module.exports = TreeNode;
```