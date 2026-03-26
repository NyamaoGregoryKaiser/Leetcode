```markdown
# Algorithm Explanations for Tree Traversals

This document provides detailed explanations for each tree traversal algorithm and related problems implemented in this project. It covers the logic, approaches (recursive vs. iterative), time and space complexity, and provides visual diagrams using ASCII art.

## Table of Contents

1.  [Core Concepts: Trees and Traversals](#1-core-concepts-trees-and-traversals)
    *   [TreeNode Structure](#treenode-structure)
    *   [DFS vs. BFS](#dfs-vs-bfs)
2.  [Depth-First Search (DFS) Traversals](#2-depth-first-search-dfs-traversals)
    *   [Inorder Traversal](#inorder-traversal)
    *   [Preorder Traversal](#preorder-traversal)
    *   [Postorder Traversal](#postorder-traversal)
3.  [Breadth-First Search (BFS) Traversals](#3-breadth-first-search-bfs-traversals)
    *   [Level Order Traversal](#level-order-traversal)
    *   [Zigzag Level Order Traversal](#zigzag-level-order-traversal)
4.  [Problems Using Traversals](#4-problems-using-traversals)
    *   [Maximum Depth of Binary Tree](#maximum-depth-of-binary-tree)
    *   [Symmetric Tree](#symmetric-tree)
5.  [Advanced Traversal Techniques](#5-advanced-traversal-techniques)
    *   [Morris Inorder Traversal (O(1) Space)](#morris-inorder-traversal-o1-space)
    *   [Iterative Postorder Traversal (Single Stack)](#iterative-postorder-traversal-single-stack)

---

## 1. Core Concepts: Trees and Traversals

### TreeNode Structure

All algorithms in this project operate on a standard binary tree `TreeNode` structure:

```typescript
export class TreeNode<T = number> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

This represents a node with a value (`val`) and pointers to its `left` and `right` children, which can be `null` if they don't exist.

### DFS vs. BFS

Tree traversals can be broadly categorized into two main types:

*   **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. DFS traversals are naturally recursive, but can also be implemented iteratively using a stack. The three common types are Preorder, Inorder, and Postorder.
*   **Breadth-First Search (BFS):** Explores all nodes at the present depth level before moving on to nodes at the next depth level. BFS traversals are typically implemented iteratively using a queue. The most common type is Level Order traversal.

---

## 2. Depth-First Search (DFS) Traversals

DFS traversals visit nodes in a linear order. The difference lies in when the root node is visited relative to its left and right children.

Consider the example tree:
```
      A
     / \
    B   C
   / \   \
  D   E   F
```

### Inorder Traversal (Left -> Root -> Right)

Visits the left subtree, then the root, then the right subtree. For a Binary Search Tree (BST), an inorder traversal yields nodes in non-decreasing order.

**Recursive Approach (`inorderTraversalRecursive`)**
The most natural way to implement inorder traversal is recursively.

*   **Logic:**
    1.  Recursively traverse the left subtree.
    2.  Visit the current node (add its value to the result).
    3.  Recursively traverse the right subtree.
    4.  Base case: If the node is `null`, return.

*   **Example Trace:**
    ```
    A -> B -> D (visit D) -> B (visit B) -> E (visit E) -> A (visit A) -> C -> F (visit F) -> C (visit C)
    Result: [D, B, E, A, F, C]
    ```

*   **Time Complexity:** O(N), where N is the number of nodes, as each node is visited exactly once.
*   **Space Complexity:** O(H) in the worst case (skewed tree) for the recursion stack, where H is the height of the tree. For a balanced tree, it's O(log N).

**Iterative Approach (`inorderTraversalIterative`)**
Uses a stack to simulate the recursion.

*   **Logic:**
    1.  Initialize an empty stack and set `current` to the root.
    2.  While `current` is not `null` OR the stack is not empty:
        a.  Repeatedly push `current` onto the stack and move `current` to its `left` child until `current` becomes `null`. This ensures we reach the leftmost node.
        b.  Pop a node from the stack. This is the next node in the inorder sequence. Add its value to the result.
        c.  Move `current` to the popped node's `right` child to start processing the right subtree.

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(H) for the stack.

---

### Preorder Traversal (Root -> Left -> Right)

Visits the root, then the left subtree, then the right subtree. This order is often used for creating a copy of the tree or for representing the tree structure.

**Recursive Approach (`preorderTraversalRecursive`)**

*   **Logic:**
    1.  Visit the current node (add its value to the result).
    2.  Recursively traverse the left subtree.
    3.  Recursively traverse the right subtree.
    4.  Base case: If the node is `null`, return.

*   **Example Trace:**
    ```
    A (visit A) -> B (visit B) -> D (visit D) -> E (visit E) -> C (visit C) -> F (visit F)
    Result: [A, B, D, E, C, F]
    ```

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(H) for recursion stack.

**Iterative Approach (`preorderTraversalIterative`)**
Uses a stack.

*   **Logic:**
    1.  Initialize an empty stack and add the root.
    2.  While the stack is not empty:
        a.  Pop a node from the stack.
        b.  Add its value to the result.
        c.  Push its `right` child onto the stack (if exists).
        d.  Push its `left` child onto the stack (if exists).
        *(Note: `right` is pushed before `left` because the stack is LIFO, so `left` will be processed first.)*

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(H) for the stack.

---

### Postorder Traversal (Left -> Right -> Root)

Visits the left subtree, then the right subtree, then the root. This order is useful for deleting a tree (deleting children before parents).

**Recursive Approach (`postorderTraversalRecursive`)**

*   **Logic:**
    1.  Recursively traverse the left subtree.
    2.  Recursively traverse the right subtree.
    3.  Visit the current node (add its value to the result).
    4.  Base case: If the node is `null`, return.

*   **Example Trace:**
    ```
    D (visit D) -> E (visit E) -> B (visit B) -> F (visit F) -> C (visit C) -> A (visit A)
    Result: [D, E, B, F, C, A]
    ```

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(H) for recursion stack.

**Iterative Approach (Two Stacks) (`postorderTraversalIterativeTwoStacks`)**
This is a straightforward iterative approach for postorder using two stacks.

*   **Logic:**
    1.  Initialize two stacks, `s1` and `s2`. Push the root onto `s1`.
    2.  While `s1` is not empty:
        a.  Pop a node from `s1` and push it onto `s2`.
        b.  If the popped node has a `left` child, push it onto `s1`.
        c.  If the popped node has a `right` child, push it onto `s1`.
        *(This process populates `s2` in the order: Root -> Right -> Left)*
    3.  Once `s1` is empty, pop all elements from `s2` and add their values to the result list. This reverses the order from `s2` to produce Left -> Right -> Root.

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(N) in the worst case (skewed tree), as both stacks can hold up to H nodes, and in a skewed tree H=N.

---

## 3. Breadth-First Search (BFS) Traversals

BFS traversals visit nodes level by level, starting from the root.

Consider the example tree:
```
      A
     / \
    B   C
   / \   \
  D   E   F
```

### Level Order Traversal (`levelOrderTraversal`)

Visits all nodes at the current depth level before moving on to nodes at the next depth level.

*   **Logic:**
    1.  Initialize an empty queue and add the root node.
    2.  While the queue is not empty:
        a.  Get the `levelSize` (number of nodes currently in the queue), which represents all nodes at the current level.
        b.  Create a list for the `currentLevel`'s nodes.
        c.  Loop `levelSize` times:
            i.  Dequeue a node.
            ii. Add its value to `currentLevel`.
            iii. Enqueue its `left` child (if exists).
            iv. Enqueue its `right` child (if exists).
        d.  Add `currentLevel` to the overall result.

*   **Example Trace:**
    ```
    Level 0: [A]
    Level 1: [B, C]
    Level 2: [D, E, F]
    Result: [[A], [B, C], [D, E, F]]
    ```

*   **Time Complexity:** O(N), as each node is enqueued and dequeued exactly once.
*   **Space Complexity:** O(W) in the worst case, where W is the maximum width of the tree. For a complete binary tree, W can be N/2, so O(N).

---

### Zigzag Level Order Traversal (`zigzagLevelOrderTraversal`, `zigzagLevelOrderTraversalOptimized`)

A variation of level order traversal where nodes are visited in alternating directions for each level (e.g., Left-to-Right, then Right-to-Left, then Left-to-Right, and so on).

*   **Logic (Optimized version `zigzagLevelOrderTraversalOptimized`):**
    1.  Similar to standard Level Order, use a queue.
    2.  Keep track of the current `level` number (0-indexed).
    3.  For each level:
        a.  Collect all nodes' values into a `currentLevel` list in standard Left-to-Right order.
        b.  If `level` is odd (1, 3, 5, ...), reverse the `currentLevel` list.
        c.  Add `currentLevel` to the overall result.
        d.  Increment `level`.

*   **Example Trace:**
    ```
    Level 0 (L-R): [A]
    Level 1 (R-L): [C, B]
    Level 2 (L-R): [D, E, F]
    Result: [[A], [C, B], [D, E, F]]
    ```

*   **Time Complexity:** O(N). The reversal of lists for odd levels adds O(W) per level, summing up to O(N) overall.
*   **Space Complexity:** O(W) for the queue and temporary level list.

---

## 4. Problems Using Traversals

### Maximum Depth of Binary Tree (`maxDepthRecursive`, `maxDepthIterativeBFS`)

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Recursive DFS Approach (`maxDepthRecursive`)**

*   **Logic:**
    1.  Base Case: If the root is `null`, the depth is 0.
    2.  Recursive Step: The depth of the current node is `1` (for itself) plus the maximum depth of its left or right subtree.
        `max_depth = 1 + Math.max(maxDepth(root.left), maxDepth(root.right))`

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(H) for recursion stack.

**Iterative BFS Approach (`maxDepthIterativeBFS`)**

*   **Logic:**
    1.  Similar to Level Order Traversal. Initialize a queue with the root and `depth = 0`.
    2.  For each level processed:
        a.  Increment `depth`.
        b.  Dequeue all nodes at the current level and enqueue their children.
    3.  The final `depth` value will be the maximum depth.

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(W) for the queue.

---

### Symmetric Tree (`isSymmetricRecursive`, `isSymmetricIterative`)

Checks if a binary tree is symmetric around its center, meaning its left and right subtrees must be mirror images of each other.

Consider the example:
```
       1
      / \
     2   2
    / \ / \
   3  4 4  3   (Symmetric)

       1
      / \
     2   2
      \   \
       3   3   (Not Symmetric: Left's right child (3) vs Right's left child (null))
```

**Recursive DFS Approach (`isSymmetricRecursive`)**

*   **Logic:**
    1.  Define a helper function `isMirror(node1, node2)`.
    2.  **Base Cases for `isMirror`:**
        *   If both `node1` and `node2` are `null`, they are symmetric (`return true`).
        *   If one is `null` and the other is not, they are NOT symmetric (`return false`).
    3.  **Recursive Step for `isMirror`:**
        *   They are symmetric if their values are equal (`node1.val === node2.val`) AND
        *   The left child of `node1` mirrors the right child of `node2` (`isMirror(node1.left, node2.right)`) AND
        *   The right child of `node1` mirrors the left child of `node2` (`isMirror(node1.right, node2.left)`).
    4.  The main function calls `isMirror(root.left, root.right)`.

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(H) for recursion stack.

**Iterative BFS Approach (`isSymmetricIterative`)**

*   **Logic:**
    1.  Initialize a queue and add `root.left` and `root.right` as the initial pair to compare.
    2.  While the queue is not empty:
        a.  Dequeue two nodes, `t1` and `t2`.
        b.  If both are `null`, continue (this pair is symmetric).
        c.  If one is `null` or their values are different, return `false` (not symmetric).
        d.  Enqueue `t1.left` and `t2.right` (the "outer" children pair).
        e.  Enqueue `t1.right` and `t2.left` (the "inner" children pair).
    3.  If the loop completes, the tree is symmetric, return `true`.

*   **Time Complexity:** O(N)
*   **Space Complexity:** O(W) for the queue.

---

## 5. Advanced Traversal Techniques

### Morris Inorder Traversal (O(1) Space) (`morrisInorderTraversal`)

This is an advanced technique for inorder traversal that uses O(1) auxiliary space (constant extra space) by temporarily modifying the tree structure. It achieves this by creating "threaded" links to allow returning to parent nodes without a stack.

*   **Logic:**
    1.  Initialize `current` to the `root`.
    2.  While `current` is not `null`:
        a.  **If `current` has no left child:**
            *   Visit `current` (add its value to result).
            *   Move `current` to its `right` child.
        b.  **If `current` has a left child:**
            *   Find the `predecessor`: the rightmost node in `current`'s left subtree. This is the node that would be visited *just before* `current` in an inorder traversal.
            *   **Case 1: `predecessor.right` is `null` (first time reaching `current` through this path):**
                *   Create a temporary link: `predecessor.right = current`. This thread allows us to return to `current` after processing its left subtree.
                *   Move `current` to `current.left` to process the left subtree.
            *   **Case 2: `predecessor.right` is `current` (second time reaching `current`, meaning the left subtree has been fully processed):**
                *   Break the temporary link: `predecessor.right = null` (restore tree structure).
                *   Visit `current` (add its value to result).
                *   Move `current` to `current.right` to process the right subtree.

*   **Time Complexity:** O(N), because each edge is traversed at most 3 times (once to find the predecessor, once to create the thread, once to break it).
*   **Space Complexity:** O(1) auxiliary space.

---

### Iterative Postorder Traversal (Single Stack) (`postorderTraversalIterativeSingleStack`, `postorderTraversalIterativeSingleStackAlternative`)

Implementing postorder traversal iteratively with a single stack is more challenging than inorder or preorder. Two common strategies exist:

1.  **Using a `lastVisited` node (`postorderTraversalIterativeSingleStack`):**
    *   This approach keeps track of the last node whose children have all been processed.
    *   It involves descending left (pushing nodes onto stack), then checking the right child. If the right child exists and hasn't been visited, process it. Otherwise, if the right child is `null` or already visited, pop the current node (meaning both children are processed or don't exist) and add its value to the result.

2.  **Reverse of Preorder (`postorderTraversalIterativeSingleStackAlternative`):**
    *   This is often simpler to implement and reason about.
    *   Perform a modified preorder traversal: push `root`, then for each popped node, push its `left` child, then its `right` child (effectively generating a Root -> Right -> Left sequence).
    *   Store these popped nodes in a temporary list.
    *   Finally, reverse the temporary list to get the Left -> Right -> Root (postorder) sequence.

*   **Time Complexity:** O(N) for both approaches.
*   **Space Complexity:** O(H) for the stack and O(N) for the temporary result list (in the reverse preorder approach).

---
```