```typescript
import { TreeNode } from '../data-structures/TreeNode';

/**
 * @module Problem1_DFS_Traversals
 * @description Implementations for Inorder, Preorder, and Postorder DFS traversals
 * in a binary tree, using both recursive and iterative approaches.
 */

/**
 * ====================================================================
 * 1. INORDER TRAVERSAL
 * (Left, Root, Right)
 * For a Binary Search Tree (BST), Inorder traversal visits nodes in non-decreasing order.
 * ====================================================================
 */

/**
 * @function inorderTraversalRecursive
 * @description Performs an inorder traversal of a binary tree recursively.
 * Visits nodes in the order: Left -> Root -> Right.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in inorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is visited exactly once.
 * Space: O(H), where H is the height of the tree. This is due to the recursion stack.
 *        In the worst case (skewed tree), H can be N, so O(N).
 *        In the best case (balanced tree), H is logN, so O(logN).
 */
export function inorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];

    function traverse(node: TreeNode | null) {
        if (node === null) {
            return;
        }
        traverse(node.left);  // 1. Visit left subtree
        result.push(node.val); // 2. Visit current node
        traverse(node.right); // 3. Visit right subtree
    }

    traverse(root);
    return result;
}

/**
 * @function inorderTraversalIterative
 * @description Performs an inorder traversal of a binary tree iteratively using a stack.
 * Visits nodes in the order: Left -> Root -> Right.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in inorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is pushed and popped
 *       from the stack at most once.
 * Space: O(H), where H is the height of the tree. This is for the explicit stack.
 *        In the worst case (skewed tree), H can be N, so O(N).
 *        In the best case (balanced tree), H is logN, so O(logN).
 */
export function inorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;

    while (current !== null || stack.length > 0) {
        // Traverse to the leftmost node, pushing all visited nodes onto the stack
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Pop the top node (which is the leftmost unvisited node)
        current = stack.pop()!; // We know stack won't be empty here if current is null
        result.push(current.val);

        // Now move to the right subtree of the popped node
        current = current.right;
    }

    return result;
}

/**
 * ====================================================================
 * 2. PREORDER TRAVERSAL
 * (Root, Left, Right)
 * Useful for creating a copy of the tree or expressing its structure.
 * ====================================================================
 */

/**
 * @function preorderTraversalRecursive
 * @description Performs a preorder traversal of a binary tree recursively.
 * Visits nodes in the order: Root -> Left -> Right.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in preorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is visited exactly once.
 * Space: O(H), where H is the height of the tree. Due to the recursion stack.
 *        Worst case: O(N), Best case: O(logN).
 */
export function preorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];

    function traverse(node: TreeNode | null) {
        if (node === null) {
            return;
        }
        result.push(node.val); // 1. Visit current node
        traverse(node.left);  // 2. Visit left subtree
        traverse(node.right); // 3. Visit right subtree
    }

    traverse(root);
    return result;
}

/**
 * @function preorderTraversalIterative
 * @description Performs a preorder traversal of a binary tree iteratively using a stack.
 * Visits nodes in the order: Root -> Left -> Right.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in preorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is pushed and popped once.
 * Space: O(H), where H is the height of the tree. For the explicit stack.
 *        Worst case: O(N), Best case: O(logN).
 */
export function preorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root === null) {
        return result;
    }

    const stack: TreeNode[] = [root]; // Start with the root

    while (stack.length > 0) {
        const node = stack.pop()!; // Pop the top node (which is the current node to visit)
        result.push(node.val);

        // Push right child first, then left child, so left is processed first (LIFO)
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }

    return result;
}

/**
 * ====================================================================
 * 3. POSTORDER TRAVERSAL
 * (Left, Right, Root)
 * Useful for deleting a tree or evaluating expressions.
 * ====================================================================
 */

/**
 * @function postorderTraversalRecursive
 * @description Performs a postorder traversal of a binary tree recursively.
 * Visits nodes in the order: Left -> Right -> Root.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in postorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes in the tree. Each node is visited exactly once.
 * Space: O(H), where H is the height of the tree. Due to the recursion stack.
 *        Worst case: O(N), Best case: O(logN).
 */
export function postorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];

    function traverse(node: TreeNode | null) {
        if (node === null) {
            return;
        }
        traverse(node.left);  // 1. Visit left subtree
        traverse(node.right); // 2. Visit right subtree
        result.push(node.val); // 3. Visit current node
    }

    traverse(root);
    return result;
}

/**
 * @function postorderTraversalIterativeTwoStacks
 * @description Performs a postorder traversal of a binary tree iteratively using two stacks.
 * This approach is generally more intuitive than a single-stack postorder.
 * Visits nodes in the order: Left -> Right -> Root.
 *
 * Stack 1 is used for processing. Stack 2 (result stack) stores nodes in Root -> Right -> Left order,
 * which when popped will yield Left -> Right -> Root.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in postorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes. Each node is pushed and popped twice.
 * Space: O(N), where N is the number of nodes. In the worst case, both stacks can hold N nodes.
 */
export function postorderTraversalIterativeTwoStacks(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root === null) {
        return result;
    }

    const stack1: TreeNode[] = [root];
    const stack2: TreeNode[] = []; // This stack will store nodes in the correct postorder sequence

    while (stack1.length > 0) {
        const node = stack1.pop()!;
        stack2.push(node); // Push to result stack

        // Push left child first, then right child to stack1.
        // This ensures that when nodes are popped from stack1, right is processed before left.
        // Thus, left will be pushed to stack2 after right, and eventually popped before right.
        if (node.left !== null) {
            stack1.push(node.left);
        }
        if (node.right !== null) {
            stack1.push(node.right);
        }
    }

    // Pop from stack2 to get the postorder sequence
    while (stack2.length > 0) {
        result.push(stack2.pop()!.val);
    }

    return result;
}

/**
 * @function postorderTraversalIterativeOneStack
 * @description Performs a postorder traversal of a binary tree iteratively using a single stack.
 * This method is more complex than the two-stack approach but uses less space in some cases (though still O(N) worst case).
 * It requires keeping track of the previously visited node to determine if the right child has been processed.
 *
 * @param {TreeNode | null} root The root node of the binary tree.
 * @returns {number[]} An array containing the values of the nodes in postorder.
 *
 * @complexity
 * Time: O(N), where N is the number of nodes. Each node is visited multiple times (pushed, peeked, popped).
 * Space: O(H), where H is the height of the tree. For the explicit stack.
 *        Worst case: O(N), Best case: O(logN).
 */
export function postorderTraversalIterativeOneStack(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (root === null) {
        return result;
    }

    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;
    let lastVisitedNode: TreeNode | null = null;

    while (current !== null || stack.length > 0) {
        // Go to the leftmost node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Peek the top of the stack
        const peekNode = stack[stack.length - 1];

        // If the right child exists and hasn't been visited yet
        if (peekNode.right !== null && peekNode.right !== lastVisitedNode) {
            current = peekNode.right; // Move to the right child
        } else {
            // Otherwise, pop the node, add to result, and mark as last visited
            stack.pop();
            result.push(peekNode.val);
            lastVisitedNode = peekNode;
            current = null; // Set current to null to prevent re-entering the leftmost traversal
        }
    }

    return result;
}
```