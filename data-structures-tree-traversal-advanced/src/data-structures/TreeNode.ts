```typescript
/**
 * @class TreeNode
 * @description Represents a node in a binary tree.
 * Each node has a value, and references to its left and right children.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    /**
     * Creates an instance of TreeNode.
     * @param {number} val The value stored in the node.
     * @param {TreeNode | null} [left=null] The left child of the node. Defaults to null.
     * @param {TreeNode | null} [right=null] The right child of the node. Defaults to null.
     */
    constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```