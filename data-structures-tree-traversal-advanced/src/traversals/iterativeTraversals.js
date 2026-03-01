```javascript
const TreeNode = require('../data-structures/TreeNode');

/**
 * @module iterativeTraversals
 * @description Provides standard binary tree traversal algorithms implemented iteratively using a stack.
 * These methods avoid recursion stack limits, making them suitable for very deep trees.
 */

/**
 * Performs an Inorder Traversal (Left, Root, Right) iteratively.
 * Uses a stack to keep track of nodes to visit.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {Array<*>} The array containing nodes' values in inorder.
 *
 * Logic:
 * 1. Initialize an empty stack and an empty result list.
 * 2. Set current node to root.
 * 3. Loop while current node is not null OR stack is not empty:
 *    a. While current node is not null:
 *       Push current node to stack.
 *       Move current to its left child (current = current.left).
 *    b. Pop a node from the stack. This is the leftmost unvisited node (or a node whose left subtree has been visited).
 *    c. Add its value to the result list.
 *    d. Move current to the right child of the popped node (current = popped.right) to explore its right subtree.
 *
 * Time Complexity: O(N) where N is the number of nodes. Each node is pushed and popped exactly once.
 * Space Complexity: O(H) where H is the height of the tree, for the stack.
 *                   Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let current = root;

    while (current !== null || stack.length > 0) {
        // Go as far left as possible, pushing nodes onto the stack
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // current is null, meaning we've reached the leftmost node (or null from a previous right child)
        // Pop the top node from the stack - this is the "root" for the current subtree being processed.
        current = stack.pop();
        result.push(current.val); // Visit the root

        // Move to the right subtree
        current = current.right;
    }

    return result;
}

/**
 * Performs a Preorder Traversal (Root, Left, Right) iteratively.
 * Uses a stack.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {Array<*>} The array containing nodes' values in preorder.
 *
 * Logic:
 * 1. Initialize an empty stack and an empty result list.
 * 2. If root is null, return empty result.
 * 3. Push root onto the stack.
 * 4. While stack is not empty:
 *    a. Pop a node from the stack.
 *    b. Add its value to the result list.
 *    c. Push its right child onto the stack (if exists).
 *    d. Push its left child onto the stack (if exists).
 *       (Right is pushed before left because stack is LIFO, so left will be processed first).
 *
 * Time Complexity: O(N) where N is the number of nodes.
 * Space Complexity: O(H) where H is the height of the tree (for the stack).
 *                   Worst case (skewed tree): O(N). Best case (balanced tree): O(logN).
 */
function preorderTraversalIterative(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [root]; // Initialize stack with the root node

    while (stack.length > 0) {
        const current = stack.pop(); // Pop and visit the current node
        result.push(current.val);

        // Push right child first, so left child is processed before right (LIFO)
        if (current.right) {
            stack.push(current.right);
        }
        if (current.left) {
            stack.push(current.left);
        }
    }

    return result;
}

/**
 * Performs a Postorder Traversal (Left, Right, Root) iteratively.
 * This is the trickiest iterative traversal. It can be done using two stacks,
 * or by using one stack and keeping track of the previously visited node.
 * This implementation uses two stacks for simplicity and clarity.
 * @param {TreeNode | null} root - The root of the binary tree.
 * @returns {Array<*>} The array containing nodes' values in postorder.
 *
 * Logic (Two Stacks):
 * 1. Initialize two empty stacks: `stack1` and `stack2`.
 * 2. Initialize an empty result list.
 * 3. If root is null, return empty result.
 * 4. Push root onto `stack1`.
 * 5. While `stack1` is not empty:
 *    a. Pop a node from `stack1` and push it onto `stack2`.
 *    b. If the popped node has a left child, push it onto `stack1`.
 *    c. If the popped node has a right child, push it onto `stack1`.
 * 6. After `stack1` is empty, `stack2` contains nodes in Postorder in reverse.
 * 7. Pop all elements from `stack2` and add them to the result list.
 *
 * Time Complexity: O(N) where N is the number of nodes.
 * Space Complexity: O(N) in the worst case, as both stacks can hold up to N nodes.
 */
function postorderTraversalIterative(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack1 = [root];
    const stack2 = []; // This stack will store nodes in the order they should be visited (Root, Right, Left)

    while (stack1.length > 0) {
        const current = stack1.pop();
        stack2.push(current); // Push popped node from stack1 to stack2

        // Push left child first, then right, to stack1.
        // This ensures that when we process nodes from stack2,
        // the left child will be processed after the right child.
        if (current.left) {
            stack1.push(current.left);
        }
        if (current.right) {
            stack1.push(current.right);
        }
    }

    // Now, stack2 contains nodes in reverse postorder (Root, Right, Left).
    // Popping them will give us Left, Right, Root.
    while (stack2.length > 0) {
        result.push(stack2.pop().val);
    }

    return result;
}

module.exports = {
    inorderTraversalIterative,
    preorderTraversalIterative,
    postorderTraversalIterative
};
```