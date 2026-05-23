```javascript
const TreeNode = require('../algorithms/TreeNode');

/**
 * Builds a binary tree from an array representation (level order with nulls).
 * This is a common way to serialize/deserialize trees in LeetCode problems.
 * Example: [3,9,20,null,null,15,7]
 *
 * @param {Array<number|null>} arr - The array representation of the tree.
 * @returns {TreeNode|null} The root of the constructed binary tree.
 */
function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const currentNode = queue.shift();

        // Left child
        if (arr[i] !== null) {
            currentNode.left = new TreeNode(arr[i]);
            queue.push(currentNode.left);
        }
        i++;

        // Right child
        if (i < arr.length && arr[i] !== null) {
            currentNode.right = new TreeNode(arr[i]);
            queue.push(currentNode.right);
        }
        i++;
    }

    return root;
}

module.exports = { buildTree };
```