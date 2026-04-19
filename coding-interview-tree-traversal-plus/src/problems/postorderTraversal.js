```javascript
const { TreeNode } = require('../utils/treeNode');

/**
 * Problem: Binary Tree Postorder Traversal
 *
 * Given the root of a binary tree, return the postorder traversal of its nodes' values.
 *
 * Postorder traversal visits nodes in the order: Left -> Right -> Root.
 * This traversal is useful for deleting a tree (deleting children before parent) or evaluating an expression tree.
 *
 * Example:
 *     1
 *      \
 *       2
 *      /
 *     3
 * Postorder: [3, 2, 1]
 */

/**
 * Approach 1: Recursive Postorder Traversal (DFS)
 *
 * The most straightforward way to implement postorder traversal.
 * It uses the call stack to manage node visits.
 *
 * Time Complexity: O(N) - We visit each node exactly once.
 * Space Complexity: O(H) - Where H is the height of the tree. In the worst case (skewed tree), H can be N,
 *                          so O(N) for the recursion stack. In the best case (balanced tree), H is logN, so O(logN).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the postorder traversal of node values.
 */
function postorderTraversalRecursive(root) {
    const result = [];

    /**
     * Helper function for recursive traversal.
     * @param {TreeNode|null} node - The current node being visited.
     */
    function traverse(node) {
        if (!node) {
            return; // Base case: If node is null, do nothing.
        }

        traverse(node.left);    // 1. Visit left subtree
        traverse(node.right);   // 2. Visit right subtree
        result.push(node.val);  // 3. Visit current node
    }

    traverse(root);
    return result;
}

/**
 * Approach 2: Iterative Postorder Traversal using Two Stacks
 *
 * This approach cleverly uses two stacks. The first stack is used to reverse the order of nodes
 * that would be visited in a Preorder (Root -> Left -> Right) but pushing Right then Left.
 * The second stack then captures these nodes in reverse, effectively achieving Left -> Right -> Root.
 *
 * The order of nodes in the first stack (before reversing) is Root, Right, Left...
 * The order of values popped from the first stack (and pushed to second) is Root, Right, Left.
 * When popped from the second stack, it's Left, Right, Root.
 *
 * Time Complexity: O(N) - Each node is pushed onto stack1, then stack2, then popped from stack2.
 * Space Complexity: O(N) - In the worst case, both stacks can hold up to N nodes.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the postorder traversal of node values.
 */
function postorderTraversalIterativeTwoStacks(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack1 = [root]; // Used for "preorder-like" traversal (Root, Right, Left)
    const stack2 = [];    // Used to reverse the order to (Left, Right, Root)

    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node.val); // Push the node's value to stack2

        // Push left child first, then right.
        // This ensures the right child is processed before the left for stack1's "preorder"
        // (i.e., when stack1 pops, it will be Root, then Right, then Left)
        if (node.left) {
            stack1.push(node.left);
        }
        if (node.right) {
            stack1.push(node.right);
        }
    }

    // Now, pop from stack2 to get the correct postorder sequence.
    while (stack2.length > 0) {
        result.push(stack2.pop());
    }

    return result;
}

/**
 * Approach 3: Iterative Postorder Traversal using One Stack
 *
 * This is more complex than the two-stack approach and requires careful tracking
 * of the previously visited node to determine if the right child has been processed.
 *
 * Time Complexity: O(N) - Each node is pushed onto the stack and popped. Some nodes might be processed multiple times (checking children).
 * Space Complexity: O(H) - For the stack. In the worst case, O(N).
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array containing the postorder traversal of node values.
 */
function postorderTraversalIterativeOneStack(root) {
    const result = [];
    if (!root) {
        return result;
    }

    const stack = [];
    let current = root;
    let lastVisited = null; // To keep track of the last node whose children have been fully processed.

    while (current !== null || stack.length > 0) {
        // Step 1: Traverse left as far as possible, pushing all nodes onto the stack.
        // These nodes are potential roots for future subtrees, or nodes whose children need processing.
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Step 2: Current is null. Look at the top of the stack (potential "root" or parent).
        let peekNode = stack[stack.length - 1];

        // Check if the right child exists AND it hasn't been visited yet (i.e., it's not the lastVisited node).
        if (peekNode.right !== null && peekNode.right !== lastVisited) {
            current = peekNode.right; // If right child exists and hasn't been visited, move to process it.
        } else {
            // If right child doesn't exist OR it has been visited,
            // then both left and right subtrees of peekNode are processed.
            // So, it's time to visit peekNode itself.
            result.push(peekNode.val);
            lastVisited = stack.pop(); // Mark this node as fully visited.
            current = null; // Set current to null to force pop from stack in next iteration.
        }
    }
    return result;
}


module.exports = {
    postorderTraversalRecursive,
    postorderTraversalIterativeTwoStacks,
    postorderTraversalIterativeOneStack
};
```