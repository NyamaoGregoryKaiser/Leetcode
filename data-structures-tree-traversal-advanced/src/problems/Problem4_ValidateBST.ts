```typescript
import { TreeNode } from '../data-structures/TreeNode';

/**
 * @module Problem4_ValidateBST
 * @description Functions to validate if a binary tree is a Binary Search Tree (BST).
 */

/**
 * ====================================================================
 * 1. Validate BST using Range Check (Recursive DFS)
 * This is the most common and robust approach.
 * ====================================================================
 */

/**
 * @function isValidBSTRecursive
 * @description Determines if a binary tree is a valid Binary Search Tree (BST) using a
 * recursive depth-first search (DFS) approach with min/max bounds.
 *
 * A valid BST:
 * - The left subtree of a node contains only nodes with values less than the node's value.
 * - The right subtree of a node contains only nodes with values greater than the node's value.
 * - Both the left and right subtrees must also be valid BSTs.
 * - The definition applies recursively to all nodes.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {boolean} True if the tree is a valid BST, false otherwise.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is visited exactly once.
 * Space: O(H), where H is the height of the tree, due to the recursion stack.
 *        Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
export function isValidBSTRecursive(root: TreeNode | null): boolean {
    /**
     * @private
     * @function validate
     * @description Helper function to recursively check BST properties within a given range.
     * @param {TreeNode | null} node The current node being checked.
     * @param {number | null} min The minimum allowed value for nodes in the current subtree (exclusive).
     * @param {number | null} max The maximum allowed value for nodes in the current subtree (exclusive).
     * @returns {boolean} True if the subtree rooted at 'node' is a valid BST within the min/max bounds.
     */
    function validate(node: TreeNode | null, min: number | null, max: number | null): boolean {
        // An empty tree is a valid BST
        if (node === null) {
            return true;
        }

        // Check if the current node's value violates the min/max bounds
        // If min is not null and node.val <= min, it's invalid.
        // If max is not null and node.val >= max, it's invalid.
        if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
            return false;
        }

        // Recursively validate left and right subtrees:
        // For the left subtree, the max value becomes the current node's value.
        // The min value remains the same.
        const isLeftValid = validate(node.left, min, node.val);

        // For the right subtree, the min value becomes the current node's value.
        // The max value remains the same.
        const isRightValid = validate(node.right, node.val, max);

        // The current subtree is valid only if both left and right subtrees are valid.
        return isLeftValid && isRightValid;
    }

    // Start the validation from the root with no initial min/max constraints (null for infinity)
    return validate(root, null, null);
}

/**
 * ====================================================================
 * 2. Validate BST using Inorder Traversal (Iterative DFS)
 * Inorder traversal of a BST should yield elements in non-decreasing order.
 * This approach checks if this property holds.
 * ====================================================================
 */

/**
 * @function isValidBSTInorderIterative
 * @description Determines if a binary tree is a valid Binary Search Tree (BST) using an
 * iterative inorder traversal approach.
 *
 * The key property of a BST is that an inorder traversal visits nodes in
 * non-decreasing order. This function checks if this property holds true.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {boolean} True if the tree is a valid BST, false otherwise.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is pushed and popped
 *       from the stack at most once.
 * Space: O(H), where H is the height of the tree, for the explicit stack.
 *        Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
export function isValidBSTInorderIterative(root: TreeNode | null): boolean {
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;
    let previousVal: number | null = null; // Stores the value of the previously visited node

    while (current !== null || stack.length > 0) {
        // Traverse to the leftmost node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Pop the current node (this is the "visit" step in inorder)
        current = stack.pop()!;

        // Check if the current node's value is less than or equal to the previous node's value.
        // If it is, the BST property is violated because inorder traversal should be strictly increasing
        // (or non-decreasing if duplicates are allowed, but standard BSTs usually don't allow equals in right subtree).
        // For strict BST definition: `node.val <= previousVal`
        // For non-strict BST (allows duplicates): `node.val < previousVal`
        // Problem usually implies strict '<' for left and '>' for right.
        if (previousVal !== null && current.val <= previousVal) {
            return false;
        }

        // Update previousVal to the current node's value
        previousVal = current.val;

        // Move to the right subtree
        current = current.right;
    }

    return true;
}
```