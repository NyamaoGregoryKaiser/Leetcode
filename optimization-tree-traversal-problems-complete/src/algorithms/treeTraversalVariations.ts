```typescript
/**
 * src/algorithms/treeTraversalVariations.ts
 *
 * This file contains advanced or memory-efficient tree traversal techniques
 * and alternative implementations.
 *
 * Problems/Techniques Covered:
 * 1.  Morris Inorder Traversal (O(1) Space)
 * 2.  Iterative Postorder Traversal (Single Stack) - More complex, but only one stack.
 */

import { TreeNode } from '../data-structures/TreeNode';

// --- Problem 1: Morris Inorder Traversal ---

/**
 * Performs Morris Inorder Traversal. This is a space-optimized traversal that
 * does not use a stack or recursion. It modifies the tree temporarily by creating
 * 'threaded' links (pointers) to allow returning to parent nodes without extra space.
 *
 * Algorithm:
 * 1. Initialize `current` as the root.
 * 2. While `current` is not null:
 *    a. If `current` has no left child:
 *       i. Add `current.val` to result.
 *       ii. Move `current` to its right child.
 *    b. If `current` has a left child:
 *       i. Find the rightmost node in `current`'s left subtree (let's call it `predecessor`).
 *          This predecessor should be the node that would be visited *just before* `current` in inorder.
 *       ii. If `predecessor.right` is null (first visit to `current` via this thread):
 *           1. Create a temporary link: `predecessor.right = current`.
 *           2. Move `current` to its left child.
 *       iii. If `predecessor.right` is `current` (second visit to `current`, meaning left subtree is processed):
 *           1. Break the temporary link: `predecessor.right = null`.
 *           2. Add `current.val` to result.
 *           3. Move `current` to its right child.
 *
 * Time Complexity: O(N), as each edge is traversed at most 3 times (down to find predecessor, back up to link, down to unlink).
 * Space Complexity: O(1) auxiliary space (modifies tree structure temporarily).
 */
export function morrisInorderTraversal<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    let current: TreeNode<T> | null = root;

    while (current !== null) {
        if (current.left === null) {
            // No left child, so add current node's value and move to right
            result.push(current.val);
            current = current.right;
        } else {
            // Find the inorder predecessor of current
            let predecessor = current.left;
            // The predecessor is the rightmost node in the left subtree
            // OR the node whose right child is `current` (if already threaded)
            while (predecessor.right !== null && predecessor.right !== current) {
                predecessor = predecessor.right;
            }

            // Case 1: Predecessor's right child is null (first time visiting current through this path)
            // Create a temporary link to come back to current after processing its left subtree.
            if (predecessor.right === null) {
                predecessor.right = current;
                current = current.left; // Move to left to process it
            }
            // Case 2: Predecessor's right child is current (left subtree already processed)
            // This means we have processed the entire left subtree and are ready to visit current.
            else {
                predecessor.right = null; // Break the link to restore tree structure
                result.push(current.val); // Add current node's value
                current = current.right;  // Move to right subtree
            }
        }
    }
    return result;
}

// --- Problem 2: Iterative Postorder Traversal (Single Stack) ---

/**
 * Performs Postorder Traversal (Left -> Right -> Root) iteratively using a single stack.
 * This is more complex than the two-stack approach or iterative inorder/preorder.
 *
 * Algorithm (using a 'peek' and 'last visited' mechanism):
 * 1. Initialize an empty stack and an empty result list.
 * 2. Initialize `current` as the root and `lastVisited` as null.
 * 3. Loop:
 *    a. While `current` is not null:
 *       i. Push `current` onto the stack.
 *       ii. Move `current` to `current.left`. (Go as far left as possible)
 *    b. Peek at the top of the stack (don't pop yet). Let this be `peekNode`.
 *    c. If `peekNode.right` is null OR `peekNode.right` is `lastVisited`:
 *       i. This means `peekNode` has no right child or its right child has already been processed.
 *       ii. Pop `peekNode` from the stack.
 *       iii. Add `peekNode.val` to result.
 *       iv. Set `lastVisited = peekNode`.
 *       v. Set `current = null` (so we don't try to go left again from `peekNode`).
 *    d. Else (`peekNode.right` exists and hasn't been visited yet):
 *       i. Set `current = peekNode.right`. (Move to process the right subtree)
 * 4. Continue until the stack is empty.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) for stack
 */
export function postorderTraversalIterativeSingleStack<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    if (root === null) {
        return result;
    }

    const stack: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = root;
    let lastVisited: TreeNode<T> | null = null;

    while (current !== null || stack.length > 0) {
        // Traverse to the leftmost node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Get the top node on the stack, but don't pop yet
        const peekNode = stack[stack.length - 1];

        // If right child exists and has not been visited yet, go to right subtree
        if (peekNode.right !== null && peekNode.right !== lastVisited) {
            current = peekNode.right;
        }
        // If right child is null OR right child has already been visited (meaning left and right are processed)
        else {
            stack.pop(); // Pop the node
            result.push(peekNode.val); // Add to result
            lastVisited = peekNode;    // Mark as last visited
            current = null;            // Set current to null to prevent re-entering the left-descent loop
                                       // and to force checking the stack top for the next node.
        }
    }
    return result;
}

// Alternative for single stack postorder, sometimes considered more intuitive for some:
// Push root, then pop, push left, push right, reverse result. This is essentially
// a reverse of preorder (Root -> Right -> Left).
export function postorderTraversalIterativeSingleStackAlternative<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    if (!root) {
        return result;
    }

    const stack: TreeNode<T>[] = [root];
    const temp: T[] = []; // Stores nodes in Root -> Right -> Left order

    while (stack.length > 0) {
        const node = stack.pop()!;
        temp.push(node.val);

        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }

    // Reverse the temp array to get Left -> Right -> Root order
    while (temp.length > 0) {
        result.push(temp.pop()!);
    }

    return result;
}
```