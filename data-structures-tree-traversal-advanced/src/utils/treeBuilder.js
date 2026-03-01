```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @function buildTree
 * @description Builds a binary tree from an array representation (level-order traversal with nulls).
 * The array `[1, 2, 3, null, 4, 5, null]` would represent:
 *        1
 *       / \
 *      2   3
 *       \ /
 *        4 5
 * @param {Array<number|null>} arr - The array representation of the tree.
 * @returns {TreeNode | null} The root of the constructed binary tree.
 *
 * Example:
 * buildTree([3,9,20,null,null,15,7])
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 */
function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const current = queue.shift();

        // Process left child
        if (arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;

        // Process right child
        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i++;
    }

    return root;
}

module.exports = {
    buildTree
};
```