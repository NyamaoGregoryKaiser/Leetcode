```typescript
/**
 * src/algorithms/treeTraversals.ts
 *
 * This file contains implementations for various tree traversal algorithms (DFS and BFS based)
 * and common problems solved using these traversals.
 *
 * Problems Covered:
 * 1.  Standard DFS Traversals: Inorder, Preorder, Postorder (Recursive & Iterative)
 * 2.  Level Order Traversal (BFS)
 * 3.  Zigzag Level Order Traversal (BFS Variation)
 * 4.  Maximum Depth of Binary Tree (DFS)
 * 5.  Symmetric Tree Check (DFS)
 */

import { TreeNode } from '../data-structures/TreeNode';

// --- Problem 1: Standard DFS Traversals (Inorder, Preorder, Postorder) ---

/**
 * Performs an Inorder Traversal (Left -> Root -> Right) recursively.
 *
 * Inorder traversal for a BST visits nodes in ascending order.
 *
 * Time Complexity: O(N), where N is the number of nodes in the tree. Each node is visited once.
 * Space Complexity: O(H) in the worst case (skewed tree) for the recursion stack, where H is the height of the tree.
 *                   O(log N) for a balanced tree.
 */
export function inorderTraversalRecursive<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
        if (node === null) {
            return;
        }
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return result;
}

/**
 * Performs an Inorder Traversal (Left -> Root -> Right) iteratively using a stack.
 *
 * Algorithm:
 * 1. Initialize an empty stack and an empty result list.
 * 2. Start with the current node as the root.
 * 3. While the current node is not null or the stack is not empty:
 *    a. Keep pushing current node onto stack and move to its left child until current node is null.
 *    b. Pop a node from the stack. This is the next node in inorder sequence. Add its value to result.
 *    c. Move to the popped node's right child.
 *
 * Time Complexity: O(N), where N is the number of nodes in the tree. Each node is pushed and popped once.
 * Space Complexity: O(H) in the worst case (skewed tree) for the stack, where H is the height of the tree.
 *                   O(log N) for a balanced tree.
 */
export function inorderTraversalIterative<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    const stack: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = root;

    while (current !== null || stack.length > 0) {
        // Reach the leftmost node of the current subtree
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Current must be null at this point, so we pop from stack
        current = stack.pop()!; // Guaranteed to not be null because of while condition
        result.push(current.val);

        // Move to the right subtree
        current = current.right;
    }
    return result;
}

/**
 * Performs a Preorder Traversal (Root -> Left -> Right) recursively.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) for recursion stack
 */
export function preorderTraversalRecursive<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
        if (node === null) {
            return;
        }
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return result;
}

/**
 * Performs a Preorder Traversal (Root -> Left -> Right) iteratively using a stack.
 *
 * Algorithm:
 * 1. Initialize an empty stack and an empty result list.
 * 2. Push the root node onto the stack.
 * 3. While the stack is not empty:
 *    a. Pop a node from the stack.
 *    b. Add its value to the result list.
 *    c. Push its right child onto the stack (if exists).
 *    d. Push its left child onto the stack (if exists).
 *    (Push right first, then left, because stack is LIFO, so left will be processed before right).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) for stack
 */
export function preorderTraversalIterative<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    if (root === null) {
        return result;
    }

    const stack: TreeNode<T>[] = [root];

    while (stack.length > 0) {
        const node = stack.pop()!;
        result.push(node.val);

        // Push right child first so left child is processed next (LIFO)
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
    return result;
}

/**
 * Performs a Postorder Traversal (Left -> Right -> Root) recursively.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) for recursion stack
 */
export function postorderTraversalRecursive<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
        if (node === null) {
            return;
        }
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
    }
    traverse(root);
    return result;
}

/**
 * Performs a Postorder Traversal (Left -> Right -> Root) iteratively using two stacks.
 *
 * Algorithm:
 * 1. Initialize two stacks, `s1` and `s2`. Push root to `s1`.
 * 2. While `s1` is not empty:
 *    a. Pop a node from `s1` and push it onto `s2`.
 *    b. If the popped node has a left child, push it onto `s1`.
 *    c. If the popped node has a right child, push it onto `s1`.
 * 3. Once `s1` is empty, `s2` contains nodes in postorder (Root -> Right -> Left reversed).
 *    Pop all elements from `s2` and add their values to the result list.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N) in worst case (skewed tree) for two stacks.
 */
export function postorderTraversalIterativeTwoStacks<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    if (root === null) {
        return result;
    }

    const s1: TreeNode<T>[] = [root];
    const s2: TreeNode<T>[] = [];

    while (s1.length > 0) {
        const node = s1.pop()!;
        s2.push(node);

        if (node.left) {
            s1.push(node.left);
        }
        if (node.right) {
            s1.push(node.right);
        }
    }

    while (s2.length > 0) {
        result.push(s2.pop()!.val);
    }

    return result;
}

// --- Problem 2: Level Order Traversal (BFS) ---

/**
 * Performs a Level Order Traversal (Breadth-First Search) of the tree.
 * Returns a list of lists, where each inner list contains the nodes at that level.
 *
 * Algorithm:
 * 1. Initialize an empty queue and add the root node.
 * 2. While the queue is not empty:
 *    a. Get the number of nodes at the current level (queue size).
 *    b. Create a list for the current level's nodes.
 *    c. For each node at the current level:
 *       i. Dequeue the node.
 *       ii. Add its value to the current level list.
 *       iii. Enqueue its left child (if exists).
 *       iv. Enqueue its right child (if exists).
 *    d. Add the current level list to the overall result.
 *
 * Time Complexity: O(N), as each node is enqueued and dequeued exactly once.
 * Space Complexity: O(W) in the worst case, where W is the maximum width of the tree.
 *                   In a complete binary tree, W = N/2, so O(N).
 */
export function levelOrderTraversal<T>(root: TreeNode<T> | null): T[][] {
    const result: T[][] = [];
    if (root === null) {
        return result;
    }

    const queue: TreeNode<T>[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: T[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevel);
    }
    return result;
}

// --- Problem 3: Zigzag Level Order Traversal ---

/**
 * Performs a Zigzag Level Order Traversal of the tree.
 * Returns a list of lists, where odd-numbered levels are traversed from left to right,
 * and even-numbered levels from right to left (0-indexed).
 *
 * Algorithm:
 * Uses a standard BFS queue, but alternates adding elements to the current level list.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(W) (maximum width of the tree)
 */
export function zigzagLevelOrderTraversal<T>(root: TreeNode<T> | null): T[][] {
    const result: T[][] = [];
    if (root === null) {
        return result;
    }

    const queue: TreeNode<T>[] = [root];
    let level = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: T[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            // For even levels (0, 2, ...), add to end (left to right)
            // For odd levels (1, 3, ...), add to beginning (right to left)
            if (level % 2 === 0) {
                currentLevel.push(node.val);
            } else {
                currentLevel.unshift(node.val); // O(K) operation, where K is currentLevel size. Can be slow.
                                                 // Better: push to end, then reverse array at the end of loop.
            }

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevel);
        level++;
    }
    return result;
}

// Optimized `zigzagLevelOrderTraversal` to avoid `unshift` performance penalty
export function zigzagLevelOrderTraversalOptimized<T>(root: TreeNode<T> | null): T[][] {
    const result: T[][] = [];
    if (root === null) {
        return result;
    }

    const queue: TreeNode<T>[] = [root];
    let level = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: T[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val); // Always add to end
            
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        // If it's an odd level (1, 3, ...), reverse the collected list
        if (level % 2 === 1) {
            currentLevel.reverse();
        }
        result.push(currentLevel);
        level++;
    }
    return result;
}


// --- Problem 4: Maximum Depth of Binary Tree ---

/**
 * Calculates the maximum depth (height) of a binary tree recursively.
 * The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * Algorithm: Depth-First Search (DFS)
 * Base Case: If root is null, depth is 0.
 * Recursive Step: max_depth = 1 + max(max_depth(left_subtree), max_depth(right_subtree))
 *
 * Time Complexity: O(N), as each node is visited once.
 * Space Complexity: O(H) for the recursion stack in the worst case (skewed tree).
 *                   O(log N) for a balanced tree.
 */
export function maxDepthRecursive<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    const leftDepth = maxDepthRecursive(root.left);
    const rightDepth = maxDepthRecursive(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
}

/**
 * Calculates the maximum depth (height) of a binary tree iteratively using BFS.
 *
 * Algorithm:
 * 1. Initialize a queue and add the root. If root is null, return 0.
 * 2. Initialize depth to 0.
 * 3. While the queue is not empty:
 *    a. Increment depth.
 *    b. Get the number of nodes at the current level (queue size).
 *    c. For each node at the current level:
 *       i. Dequeue the node.
 *       ii. Enqueue its left child (if exists).
 *       iii. Enqueue its right child (if exists).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(W) (maximum width of the tree)
 */
export function maxDepthIterativeBFS<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }

    const queue: TreeNode<T>[] = [root];
    let depth = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        depth++; // Increment depth for each level

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }
    return depth;
}

// --- Problem 5: Symmetric Tree ---

/**
 * Checks if a binary tree is symmetric around its center.
 * This means the left and right subtrees must be mirror images of each other.
 *
 * Algorithm: Recursive DFS.
 * Define a helper function `isMirror(node1, node2)`:
 * 1. Base Case: If both nodes are null, they are symmetric (return true).
 * 2. Base Case: If one node is null and the other is not, they are not symmetric (return false).
 * 3. Recursive Step: Check if their values are equal AND
 *    `isMirror(node1.left, node2.right)` (outer children) AND
 *    `isMirror(node1.right, node2.left)` (inner children) are all true.
 *
 * Time Complexity: O(N), as each pair of nodes (one from left, one from right) is compared once.
 * Space Complexity: O(H) for the recursion stack.
 */
export function isSymmetricRecursive<T>(root: TreeNode<T> | null): boolean {
    if (root === null) {
        return true;
    }

    function isMirror(node1: TreeNode<T> | null, node2: TreeNode<T> | null): boolean {
        // Both are null, they are symmetric
        if (node1 === null && node2 === null) {
            return true;
        }
        // One is null, the other is not, not symmetric
        if (node1 === null || node2 === null) {
            return false;
        }
        // Check values and mirror children
        return (
            node1.val === node2.val &&
            isMirror(node1.left, node2.right) && // Outer children
            isMirror(node1.right, node2.left)    // Inner children
        );
    }

    return isMirror(root.left, root.right);
}

/**
 * Checks if a binary tree is symmetric iteratively using a queue (BFS-like approach).
 *
 * Algorithm:
 * 1. If root is null, return true.
 * 2. Initialize a queue and add `root.left` and `root.right`.
 * 3. While the queue is not empty:
 *    a. Dequeue two nodes, `t1` and `t2`.
 *    b. If both are null, continue (they are symmetric).
 *    c. If one is null and the other is not, or their values are different, return false.
 *    d. Enqueue `t1.left`, `t2.right` (outer children).
 *    e. Enqueue `t1.right`, `t2.left` (inner children).
 * 4. If the loop completes, the tree is symmetric, return true.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(W) (maximum width of the tree)
 */
export function isSymmetricIterative<T>(root: TreeNode<T> | null): boolean {
    if (root === null) {
        return true;
    }

    const queue: (TreeNode<T> | null)[] = [];
    queue.push(root.left);
    queue.push(root.right);

    while (queue.length > 0) {
        const t1 = queue.shift();
        const t2 = queue.shift();

        // Both are null, continue checking other pairs
        if (t1 === null && t2 === null) {
            continue;
        }
        // One is null or values are different, not symmetric
        if (t1 === null || t2 === null || t1.val !== t2.val) {
            return false;
        }

        // Enqueue outer children pair
        queue.push(t1.left);
        queue.push(t2.right);

        // Enqueue inner children pair
        queue.push(t1.right);
        queue.push(t2.left);
    }

    return true;
}
```