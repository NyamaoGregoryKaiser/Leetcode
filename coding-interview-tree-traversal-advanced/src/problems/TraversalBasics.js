```javascript
/**
 * @fileoverview Implementations for the three fundamental Depth-First Search (DFS) traversals:
 *               Inorder, Preorder, and Postorder. Both recursive and iterative approaches are provided.
 */

const TreeNode = require('../data-structures/TreeNode');

/**
 * --- Problem Description: Inorder, Preorder, Postorder Traversal ---
 * Given the root of a binary tree, return the values of its nodes in:
 * 1. Preorder traversal (Root, Left, Right)
 * 2. Inorder traversal (Left, Root, Right)
 * 3. Postorder traversal (Left, Right, Root)
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 100].
 * - -100 <= Node.val <= 100
 */

/**
 * Helper function for recursive DFS traversals.
 * Modifies the result array in place.
 * @param {TreeNode|null} node The current node being visited.
 * @param {Array<number>} result The array to store traversal results.
 * @param {string} order The traversal order ('pre', 'in', 'post').
 */
function _dfsRecursiveHelper(node, result, order) {
    if (!node) {
        return;
    }

    if (order === 'pre') {
        result.push(node.val); // Visit root
    }
    _dfsRecursiveHelper(node.left, result, order); // Go left
    if (order === 'in') {
        result.push(node.val); // Visit root
    }
    _dfsRecursiveHelper(node.right, result, order); // Go right
    if (order === 'post') {
        result.push(node.val); // Visit root
    }
}

// ====================================================================
// 1. Preorder Traversal (Root, Left, Right)
// ====================================================================

/**
 * Performs Preorder Traversal recursively.
 * Visits the current node, then its left subtree, then its right subtree.
 *
 * Time Complexity: O(N), where N is the number of nodes in the tree.
 *                  Each node is visited exactly once.
 * Space Complexity: O(H) in the worst case (skewed tree), where H is the height of the tree.
 *                   This is due to the recursion stack. In the best case (balanced tree),
 *                   it's O(log N).
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in preorder.
 */
function preorderTraversalRecursive(root) {
    const result = [];
    _dfsRecursiveHelper(root, result, 'pre');
    return result;
}

/**
 * Performs Preorder Traversal iteratively using a stack.
 *
 * Algorithm:
 * 1. Initialize an empty stack and an empty result list.
 * 2. If the root is null, return the empty result list.
 * 3. Push the root node onto the stack.
 * 4. While the stack is not empty:
 *    a. Pop a node from the stack. Let it be `current`.
 *    b. Add `current.val` to the result list.
 *    c. Push `current.right` onto the stack (if not null).
 *    d. Push `current.left` onto the stack (if not null).
 *       (Note: Push right first, then left, because stack is LIFO.
 *        We want to process left before right, so left should be popped first.)
 *
 * Time Complexity: O(N), where N is the number of nodes. Each node is pushed and popped once.
 * Space Complexity: O(H) in the worst case (skewed tree), where H is the height of the tree.
 *                   This is due to the stack. In the best case (balanced tree), O(log N).
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in preorder.
 */
function preorderTraversalIterative(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [root]; // Initialize stack with the root

    while (stack.length > 0) {
        const currentNode = stack.pop();
        result.push(currentNode.val);

        // Push right child first, then left child, because stack is LIFO.
        // We want to process left child before right child, so left should be on top.
        if (currentNode.right) {
            stack.push(currentNode.right);
        }
        if (currentNode.left) {
            stack.push(currentNode.left);
        }
    }
    return result;
}

// ====================================================================
// 2. Inorder Traversal (Left, Root, Right)
// ====================================================================

/**
 * Performs Inorder Traversal recursively.
 * Visits the left subtree, then the current node, then its right subtree.
 *
 * Time Complexity: O(N). Each node is visited once.
 * Space Complexity: O(H) for recursion stack.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in inorder.
 */
function inorderTraversalRecursive(root) {
    const result = [];
    _dfsRecursiveHelper(root, result, 'in');
    return result;
}

/**
 * Performs Inorder Traversal iteratively using a stack.
 *
 * Algorithm:
 * 1. Initialize an empty stack and an empty result list.
 * 2. Initialize `current` node to `root`.
 * 3. While `current` is not null or the stack is not empty:
 *    a. While `current` is not null:
 *       i. Push `current` onto the stack.
 *       ii. Move `current` to `current.left`.
 *    b. `current` is now null (meaning we've gone as far left as possible).
 *    c. Pop a node from the stack. Let it be `current`.
 *    d. Add `current.val` to the result list (this is the "visit root" step).
 *    e. Move `current` to `current.right` (to process the right subtree).
 *
 * Time Complexity: O(N). Each node is pushed and popped once.
 * Space Complexity: O(H) for stack.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in inorder.
 */
function inorderTraversalIterative(root) {
    const result = [];
    const stack = [];
    let currentNode = root;

    while (currentNode !== null || stack.length > 0) {
        // Traverse to the leftmost node, pushing all visited nodes onto the stack
        while (currentNode !== null) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }

        // Now currentNode is null, meaning we've reached the leftmost child (or end of a left path)
        // Pop the node from the stack - this is the "root" of the current subtree
        currentNode = stack.pop();
        result.push(currentNode.val); // Visit the node

        // Now move to the right subtree
        currentNode = currentNode.right;
    }
    return result;
}

// ====================================================================
// 3. Postorder Traversal (Left, Right, Root)
// ====================================================================

/**
 * Performs Postorder Traversal recursively.
 * Visits the left subtree, then its right subtree, then the current node.
 *
 * Time Complexity: O(N). Each node is visited once.
 * Space Complexity: O(H) for recursion stack.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in postorder.
 */
function postorderTraversalRecursive(root) {
    const result = [];
    _dfsRecursiveHelper(root, result, 'post');
    return result;
}

/**
 * Performs Postorder Traversal iteratively using two stacks.
 * This is a common and relatively straightforward way.
 *
 * Algorithm:
 * 1. Initialize two empty stacks: `s1` and `s2`.
 * 2. Push the `root` node onto `s1`.
 * 3. While `s1` is not empty:
 *    a. Pop a node from `s1`. Let it be `current`.
 *    b. Push `current` onto `s2`.
 *    c. Push `current.left` onto `s1` (if not null).
 *    d. Push `current.right` onto `s1` (if not null).
 *       (Note: Pushing left then right to s1 ensures right is processed first for s2,
 *        which reverses the order again.)
 * 4. While `s2` is not empty, pop nodes from `s2` and add their values to the result list.
 *    The `s2` stack will now contain nodes in Postorder.
 *
 * Time Complexity: O(N). Each node is pushed and popped twice (once from s1, once from s2).
 * Space Complexity: O(N) in the worst case (skewed tree), as both stacks can hold up to N nodes.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in postorder.
 */
function postorderTraversalIterativeTwoStacks(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const s1 = [root]; // Main stack for processing nodes (preorder-like)
    const s2 = [];    // Stack to store nodes in reverse postorder

    while (s1.length > 0) {
        const currentNode = s1.pop();
        s2.push(currentNode.val); // Push value to s2

        // Push left child, then right child to s1.
        // Because s1 is LIFO, right will be processed before left in the next iteration.
        // This effectively reverses the natural preorder of processing children.
        if (currentNode.left) {
            s1.push(currentNode.left);
        }
        if (currentNode.right) {
            s1.push(currentNode.right);
        }
    }

    // Now s2 contains elements in the order: Root, Right, Left.
    // Popping from s2 will reverse this to: Left, Right, Root (Postorder).
    while (s2.length > 0) {
        result.push(s2.pop());
    }

    return result;
}

/**
 * Performs Postorder Traversal iteratively using a single stack.
 * This approach is more complex but more memory-efficient (O(H) space).
 *
 * Algorithm:
 * 1. Initialize an empty stack and an empty result list.
 * 2. Initialize `current` node to `root`.
 * 3. While `current` is not null or the stack is not empty:
 *    a. While `current` is not null:
 *       i. Push `current` onto the stack.
 *       ii. Move `current` to `current.left`.
 *    b. Peek at the top of the stack (`peekNode`).
 *    c. If `peekNode.right` exists and `peekNode.right` has not been visited yet
 *       (i.e., it's not the same as the last node added to the result):
 *       i. Move `current` to `peekNode.right`.
 *    d. Else (either `peekNode.right` is null, or it's already visited):
 *       i. Pop `peekNode` from the stack.
 *       ii. Add `peekNode.val` to the result list.
 *       iii. Set `current` to null to ensure we don't re-enter the left traversal loop,
 *            and instead pop another node from the stack.
 *
 * Time Complexity: O(N). Each node is visited multiple times (once for left, once for right, once for root).
 * Space Complexity: O(H) for stack.
 *
 * @param {TreeNode|null} root The root of the binary tree.
 * @returns {Array<number>} An array containing the node values in postorder.
 */
function postorderTraversalIterativeOneStack(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [];
    let currentNode = root;
    let lastVisitedNode = null; // Tracks the last node whose value was added to result

    while (currentNode !== null || stack.length > 0) {
        // Traverse to the leftmost node, pushing nodes onto stack
        while (currentNode !== null) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }

        // Peek at the top node of the stack
        const peekNode = stack[stack.length - 1];

        // If right child exists AND right child has not been visited yet
        if (peekNode.right !== null && peekNode.right !== lastVisitedNode) {
            currentNode = peekNode.right; // Move to right child to process it
        } else {
            // Right child is either null, or has already been visited (processed)
            // It's safe to visit the current node (pop it)
            stack.pop();
            result.push(peekNode.val);
            lastVisitedNode = peekNode; // Mark this node as visited
            currentNode = null;         // Set current to null so we don't re-enter left traversal
                                        // and instead proceed to pop from stack again.
        }
    }
    return result;
}

module.exports = {
    preorderTraversalRecursive,
    preorderTraversalIterative,
    inorderTraversalRecursive,
    inorderTraversalIterative,
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack
};
```