```javascript
/**
 * @fileoverview Utility functions for building binary trees from array representations.
 * This is useful for creating test cases easily.
 */

const TreeNode = require('../data-structures/TreeNode');

/**
 * Builds a binary tree from an array representation (level-order traversal with nulls).
 * The array is similar to how LeetCode represents trees.
 * Example: [3,9,20,null,null,15,7]
 *
 * @param {Array<number|null>} arr The array representing the tree.
 * @returns {TreeNode|null} The root of the constructed binary tree, or null if the array is empty.
 */
function buildTreeFromArray(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    // Create the root node
    const root = new TreeNode(arr[0]);
    // Use a queue for level-order processing to build the tree
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const currentNode = queue.shift();

        // Process left child
        if (i < arr.length) {
            if (arr[i] !== null) {
                const leftChild = new TreeNode(arr[i]);
                currentNode.left = leftChild;
                queue.push(leftChild);
            }
            i++;
        }

        // Process right child
        if (i < arr.length) {
            if (arr[i] !== null) {
                const rightChild = new TreeNode(arr[i]);
                currentNode.right = rightChild;
                queue.push(rightChild);
            }
            i++;
        }
    }

    return root;
}

/**
 * Converts a binary tree into its level-order array representation.
 * Useful for verifying tree construction or for debugging.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number|null>} An array representing the tree in level-order.
 */
function treeToArray(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];
    let hasNonNull = true; // Flag to stop adding nulls at the end

    while (queue.length > 0 && hasNonNull) {
        hasNonNull = false; // Reset for this level

        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();

            if (currentNode) {
                result.push(currentNode.val);
                queue.push(currentNode.left);
                queue.push(currentNode.right);
                if (currentNode.left || currentNode.right) {
                    hasNonNull = true; // If children exist, continue traversal
                }
            } else {
                result.push(null);
            }
        }
    }

    // Remove trailing nulls to match common array representation format
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}


module.exports = {
    buildTreeFromArray,
    treeToArray
};
```