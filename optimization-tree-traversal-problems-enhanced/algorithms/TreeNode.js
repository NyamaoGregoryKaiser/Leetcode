```javascript
/**
 * @class TreeNode
 * @description Represents a node in a binary tree.
 * @property {*} val - The value stored in the node.
 * @property {TreeNode|null} left - Reference to the left child node.
 * @property {TreeNode|null} right - Reference to the right child node.
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

module.exports = TreeNode;
```