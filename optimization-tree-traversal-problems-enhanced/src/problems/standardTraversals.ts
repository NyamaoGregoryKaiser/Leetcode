/**
 * @fileoverview Implements the three standard Depth-First Search (DFS) traversals
 * (Inorder, Preorder, Postorder) for a binary tree.
 * Both recursive and iterative approaches are provided for each traversal.
 */

import { TreeNode } from '../utils/treeNode';

/**
 * @interface IStandardTraversals
 * Defines the contract for an object exposing all standard traversal methods.
 */
export interface IStandardTraversals {
    inorderTraversalRecursive(root: TreeNode | null): number[];
    inorderTraversalIterative(root: TreeNode | null): number[];
    preorderTraversalRecursive(root: TreeNode | null): number[];
    preorderTraversalIterative(root: TreeNode | null): number[];
    postorderTraversalRecursive(root: TreeNode | null): number[];
    postorderTraversalIterative(root: TreeNode | null): number[];
}

/**
 * Implements standard DFS traversals.
 */
export class StandardTraversals implements IStandardTraversals {

    // --- Inorder Traversal ---
    // Definition: Left -> Root -> Right

    /**
     * Performs Inorder Traversal recursively.
     * @param root The root of the binary tree.
     * @returns An array containing the node values in inorder sequence.
     *
     * Time Complexity: O(N) - Each node is visited exactly once.
     * Space Complexity: O(H) - In the worst case (skewed tree), the recursion stack depth can be N.
     *                     H is the height of the tree.
     */
    inorderTraversalRecursive(root: TreeNode | null): number[] {
        const result: number[] = [];
        this.dfsInorderRecursive(root, result);
        return result;
    }

    /**
     * Helper function for recursive inorder traversal.
     * @param node The current node being visited.
     * @param result The array to store traversal results.
     */
    private dfsInorderRecursive(node: TreeNode | null, result: number[]): void {
        if (!node) {
            return;
        }
        this.dfsInorderRecursive(node.left, result);  // Visit left subtree
        result.push(node.val);                       // Visit root
        this.dfsInorderRecursive(node.right, result); // Visit right subtree
    }

    /**
     * Performs Inorder Traversal iteratively using a stack.
     * @param root The root of the binary tree.
     * @returns An array containing the node values in inorder sequence.
     *
     * Time Complexity: O(N) - Each node is pushed and popped onto the stack at most once.
     * Space Complexity: O(H) - In the worst case (skewed tree), the stack can hold all nodes from root to a leaf.
     *                     H is the height of the tree.
     */
    inorderTraversalIterative(root: TreeNode | null): number[] {
        const result: number[] = [];
        const stack: TreeNode[] = [];
        let current: TreeNode | null = root;

        while (current !== null || stack.length > 0) {
            // Traverse to the leftmost node, pushing all intermediate nodes onto the stack
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            // Pop the top node (which is the leftmost unvisited node)
            current = stack.pop()!;
            result.push(current.val);

            // Now visit the right subtree
            current = current.right;
        }

        return result;
    }

    // --- Preorder Traversal ---
    // Definition: Root -> Left -> Right

    /**
     * Performs Preorder Traversal recursively.
     * @param root The root of the binary tree.
     * @returns An array containing the node values in preorder sequence.
     *
     * Time Complexity: O(N) - Each node is visited exactly once.
     * Space Complexity: O(H) - In the worst case (skewed tree), the recursion stack depth can be N.
     *                     H is the height of the tree.
     */
    preorderTraversalRecursive(root: TreeNode | null): number[] {
        const result: number[] = [];
        this.dfsPreorderRecursive(root, result);
        return result;
    }

    /**
     * Helper function for recursive preorder traversal.
     * @param node The current node being visited.
     * @param result The array to store traversal results.
     */
    private dfsPreorderRecursive(node: TreeNode | null, result: number[]): void {
        if (!node) {
            return;
        }
        result.push(node.val);                        // Visit root
        this.dfsPreorderRecursive(node.left, result);   // Visit left subtree
        this.dfsPreorderRecursive(node.right, result);  // Visit right subtree
    }

    /**
     * Performs Preorder Traversal iteratively using a stack.
     * @param root The root of the binary tree.
     * @returns An array containing the node values in preorder sequence.
     *
     * Time Complexity: O(N) - Each node is pushed and popped onto the stack at most once.
     * Space Complexity: O(H) - In the worst case (skewed tree), the stack can hold all nodes from root to a leaf.
     *                     H is the height of the tree.
     */
    preorderTraversalIterative(root: TreeNode | null): number[] {
        const result: number[] = [];
        if (!root) {
            return result;
        }

        const stack: TreeNode[] = [root]; // Start with the root node

        while (stack.length > 0) {
            const node = stack.pop()!; // Pop the current node

            result.push(node.val);     // Visit root

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

    // --- Postorder Traversal ---
    // Definition: Left -> Right -> Root

    /**
     * Performs Postorder Traversal recursively.
     * @param root The root of the binary tree.
     * @returns An array containing the node values in postorder sequence.
     *
     * Time Complexity: O(N) - Each node is visited exactly once.
     * Space Complexity: O(H) - In the worst case (skewed tree), the recursion stack depth can be N.
     *                     H is the height of the tree.
     */
    postorderTraversalRecursive(root: TreeNode | null): number[] {
        const result: number[] = [];
        this.dfsPostorderRecursive(root, result);
        return result;
    }

    /**
     * Helper function for recursive postorder traversal.
     * @param node The current node being visited.
     * @param result The array to store traversal results.
     */
    private dfsPostorderRecursive(node: TreeNode | null, result: number[]): void {
        if (!node) {
            return;
        }
        this.dfsPostorderRecursive(node.left, result);    // Visit left subtree
        this.dfsPostorderRecursive(node.right, result);   // Visit right subtree
        result.push(node.val);                          // Visit root
    }

    /**
     * Performs Postorder Traversal iteratively using two stacks.
     * This is a common and relatively straightforward iterative approach for postorder.
     *
     * The idea is:
     * 1. Push root to stack1.
     * 2. While stack1 is not empty:
     *    a. Pop a node from stack1 and push it to stack2.
     *    b. Push node's left child to stack1 (if exists).
     *    c. Push node's right child to stack1 (if exists).
     * 3. Once stack1 is empty, stack2 will contain nodes in Postorder (Root -> Right -> Left, reversed).
     * 4. Pop all elements from stack2 and add to result to get Left -> Right -> Root.
     *
     * @param root The root of the binary tree.
     * @returns An array containing the node values in postorder sequence.
     *
     * Time Complexity: O(N) - Each node is pushed and popped twice (once from stack1, once from stack2).
     * Space Complexity: O(N) - In the worst case (skewed tree), both stacks together can hold up to N nodes.
     */
    postorderTraversalIterative(root: TreeNode | null): number[] {
        const result: number[] = [];
        if (!root) {
            return result;
        }

        const stack1: TreeNode[] = [root];
        const stack2: TreeNode[] = [];

        while (stack1.length > 0) {
            const node = stack1.pop()!;
            stack2.push(node); // Push to stack2

            // Push left and then right children to stack1
            // This ensures that when stack2 is popped, right child is processed before left.
            if (node.left !== null) {
                stack1.push(node.left);
            }
            if (node.right !== null) {
                stack1.push(node.right);
            }
        }

        // Pop all elements from stack2 to get the final postorder result
        while (stack2.length > 0) {
            result.push(stack2.pop()!.val);
        }

        return result;
    }

    /**
     * Alternative iterative Postorder Traversal using a single stack.
     * This is more complex but more space-efficient (O(H) vs O(N) for two-stack in worst case if tree is balanced).
     *
     * The logic is to keep track of the previously visited node to determine if we should
     * process the current node (root) or go to its right child.
     *
     * @param root The root of the binary tree.
     * @returns An array containing the node values in postorder sequence.
     *
     * Time Complexity: O(N) - Each node is pushed and popped onto the stack.
     * Space Complexity: O(H) - In the worst case (skewed tree), the stack can hold up to N nodes.
     *                            For balanced trees, it's O(log N).
     */
    postorderTraversalIterativeSingleStack(root: TreeNode | null): number[] {
        const result: number[] = [];
        if (!root) {
            return result;
        }

        const stack: TreeNode[] = [];
        let current: TreeNode | null = root;
        let lastVisitedNode: TreeNode | null = null;

        while (current !== null || stack.length > 0) {
            // Traverse to the leftmost node, pushing all intermediate nodes onto the stack
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            // Peek at the top of the stack (this is the current node we are considering)
            current = stack[stack.length - 1];

            // If the right child exists and has not been visited yet
            if (current.right !== null && current.right !== lastVisitedNode) {
                current = current.right; // Move to the right child
            } else {
                // Otherwise, process the current node (root)
                // This means either right child is null or has already been visited
                result.push(current.val);
                lastVisitedNode = stack.pop()!; // Mark as visited and remove from stack
                current = null; // Set current to null to force pop from stack in next iteration
            }
        }

        return result;
    }
}