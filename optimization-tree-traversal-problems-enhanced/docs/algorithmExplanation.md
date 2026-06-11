# Binary Tree Traversals: Algorithms and Interview Guide

This document provides a detailed explanation of common binary tree traversal algorithms, including their concepts, implementations, time/space complexity, and practical interview tips.

## Table of Contents

1.  [Introduction to Tree Traversals](#introduction-to-tree-traversals)
    *   [Depth-First Search (DFS)](#depth-first-search-dfs)
    *   [Breadth-First Search (BFS)](#breadth-first-search-bfs)
2.  [Problem 1: Standard DFS Traversals](#problem-1-standard-dfs-traversals)
    *   [Inorder Traversal](#inorder-traversal)
    *   [Preorder Traversal](#preorder-traversal)
    *   [Postorder Traversal](#postorder-traversal)
3.  [Problem 2: Level Order Traversal (BFS)](#problem-2-level-order-traversal-bfs)
4.  [Problem 3: Zigzag Level Order Traversal](#problem-3-zigzag-level-order-traversal)
5.  [Problem 4: Binary Tree Right Side View](#problem-4-binary-tree-right-side-view)
6.  [Edge Cases and Gotchas](#edge-cases-and-gotchas)
7.  [Interview Tips and Variations](#interview-tips-and-variations)
    *   [Before Coding](#before-coding)
    *   [During Coding](#during-coding)
    *   [Follow-up Questions and Variations](#follow-up-questions-and-variations)
    *   [Choosing Between DFS and BFS](#choosing-between-dfs-and-bfs)
    *   [Recursive vs. Iterative](#recursive-vs-iterative)
    *   [Memory Efficiency (Morris Traversal)](#memory-efficiency-morris-traversal)

---

## 1. Introduction to Tree Traversals

Tree traversal refers to the process of visiting each node in a tree data structure exactly once. The order in which nodes are visited defines the type of traversal. There are two main categories: Depth-First Search (DFS) and Breadth-First Search (BFS).

Let's consider a sample binary tree for illustration:

```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```

### Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. It can be implemented recursively or iteratively using a stack. The three common DFS traversals are:

*   **Inorder**: Left -> Root -> Right
*   **Preorder**: Root -> Left -> Right
*   **Postorder**: Left -> Right -> Root

### Breadth-First Search (BFS)

BFS explores all nodes at the current depth level before moving on to nodes at the next depth level. It is typically implemented iteratively using a queue. This is also known as **Level Order Traversal**.

---

## 2. Problem 1: Standard DFS Traversals

These are the fundamental building blocks for many tree problems. For each, we'll cover both recursive and iterative solutions.

### TreeNode Structure

All problems in this project use the following `TreeNode` structure:

```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}
```

### Inorder Traversal

**Order:** Left -> Root -> Right

**Purpose:** For a Binary Search Tree (BST), inorder traversal visits nodes in non-decreasing order.

**Example for our sample tree `[1,2,3,4,5,6,7]`:** `[4, 2, 5, 1, 6, 3, 7]`

#### Recursive Approach

```typescript
// Time: O(N) | Space: O(H) - H is tree height (N in worst case skewed tree)
function inorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];
    function dfs(node: TreeNode | null): void {
        if (!node) {
            return;
        }
        dfs(node.left);    // 1. Traverse left subtree
        result.push(node.val); // 2. Visit root
        dfs(node.right);   // 3. Traverse right subtree
    }
    dfs(root);
    return result;
}
```

#### Iterative Approach (using a stack)

```typescript
// Time: O(N) | Space: O(H) - H is tree height (N in worst case skewed tree)
function inorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;

    while (current !== null || stack.length > 0) {
        // Keep going left, pushing nodes onto the stack
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Pop the leftmost node (which is the current root to visit)
        current = stack.pop()!;
        result.push(current.val);

        // Move to the right child to repeat the process
        current = current.right;
    }
    return result;
}
```

### Preorder Traversal

**Order:** Root -> Left -> Right

**Purpose:** Useful for creating a copy of the tree, or for expressing prefix expressions.

**Example for our sample tree `[1,2,3,4,5,6,7]`:** `[1, 2, 4, 5, 3, 6, 7]`

#### Recursive Approach

```typescript
// Time: O(N) | Space: O(H)
function preorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];
    function dfs(node: TreeNode | null): void {
        if (!node) {
            return;
        }
        result.push(node.val); // 1. Visit root
        dfs(node.left);       // 2. Traverse left subtree
        dfs(node.right);      // 3. Traverse right subtree
    }
    dfs(root);
    return result;
}
```

#### Iterative Approach (using a stack)

```typescript
// Time: O(N) | Space: O(H)
function preorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (!root) {
        return result;
    }

    const stack: TreeNode[] = [root]; // Start with the root

    while (stack.length > 0) {
        const node = stack.pop()!; // Pop and visit current node
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
```

### Postorder Traversal

**Order:** Left -> Right -> Root

**Purpose:** Useful for deleting a tree (delete children before parent), or for expressing postfix expressions.

**Example for our sample tree `[1,2,3,4,5,6,7]`:** `[4, 5, 2, 6, 7, 3, 1]`

#### Recursive Approach

```typescript
// Time: O(N) | Space: O(H)
function postorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];
    function dfs(node: TreeNode | null): void {
        if (!node) {
            return;
        }
        dfs(node.left);    // 1. Traverse left subtree
        dfs(node.right);   // 2. Traverse right subtree
        result.push(node.val); // 3. Visit root
    }
    dfs(root);
    return result;
}
```

#### Iterative Approach (using two stacks)

This is a common and relatively straightforward iterative approach for postorder.

```typescript
// Time: O(N) | Space: O(N) (two stacks might hold N nodes in worst case)
function postorderTraversalIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (!root) {
        return result;
    }

    const stack1: TreeNode[] = [root];
    const stack2: TreeNode[] = []; // Stores nodes in Root -> Right -> Left order

    while (stack1.length > 0) {
        const node = stack1.pop()!;
        stack2.push(node);

        if (node.left !== null) {
            stack1.push(node.left);
        }
        if (node.right !== null) {
            stack1.push(node.right);
        }
    }

    // Pop from stack2 to get Left -> Right -> Root order
    while (stack2.length > 0) {
        result.push(stack2.pop()!.val);
    }
    return result;
}
```

#### Iterative Approach (using a single stack - more complex)

```typescript
// Time: O(N) | Space: O(H)
function postorderTraversalIterativeSingleStack(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (!root) {
        return result;
    }

    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;
    let lastVisitedNode: TreeNode | null = null; // To track if right child has been visited

    while (current !== null || stack.length > 0) {
        // Go left as far as possible
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Peek the top node (current root candidate)
        current = stack[stack.length - 1];

        // If right child exists AND has not been visited yet, go right
        if (current.right !== null && current.right !== lastVisitedNode) {
            current = current.right;
        } else {
            // Otherwise, process current node
            result.push(current.val);
            lastVisitedNode = stack.pop()!; // Mark as visited and remove
            current = null; // Set current to null to trigger next pop from stack
        }
    }
    return result;
}
```

---

## 3. Problem 2: Level Order Traversal (BFS)

**Description:** Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example for `[3, 9, 20, null, null, 15, 7]`:** `[[3], [9, 20], [15, 7]]`

```
    3
   / \
  9  20
    /  \
   15   7
```

**Approach:** Use a queue to implement Breadth-First Search (BFS).

```typescript
// Time: O(N) | Space: O(W) - W is max width of tree (N in worst case)
function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }

    const queue: TreeNode[] = [root]; // Initialize queue with root

    while (queue.length > 0) {
        const levelSize = queue.length; // Number of nodes at the current level
        const currentLevelNodes: number[] = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // Dequeue node
            currentLevelNodes.push(node.val); // Add its value

            // Enqueue its children for the next level
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes); // Add the complete level to the result
    }
    return result;
}
```

---

## 4. Problem 3: Zigzag Level Order Traversal

**Description:** Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and so on).

**Example for `[3, 9, 20, null, null, 15, 7]`:** `[[3], [20, 9], [15, 7]]`

```
    3         <--- Level 0 (L-R)
   / \
  9  20       <--- Level 1 (R-L)
    /  \
   15   7     <--- Level 2 (L-R)
```

**Approach:** This is a variation of BFS. We use a queue, but alternate the way we add elements to the `currentLevelNodes` list.

```typescript
// Time: O(N) | Space: O(W) (N in worst case)
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }

    const queue: TreeNode[] = [root];
    let isLeftToRight = true; // Flag to track direction

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            // Add node value based on current direction
            if (isLeftToRight) {
                currentLevelNodes.push(node.val); // Add to end for L-R
            } else {
                currentLevelNodes.unshift(node.val); // Add to beginning for R-L (effectively reversing order)
            }

            // Enqueue children normally (left then right) for the next level
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes);
        isLeftToRight = !isLeftToRight; // Toggle direction for next level
    }
    return result;
}
```

---

## 5. Problem 4: Binary Tree Right Side View

**Description:** Given the `root` of a binary tree, imagine yourself standing on the **right side** of it. Return the values of the nodes you can see ordered from top to bottom.

**Example for `[1, 2, 3, null, 5, null, 4]`:** `[1, 3, 4]`

```
      1         <--- (Visible)
     / \
    2   3       <--- (Visible)
     \   \
      5   4     <--- (Visible)
```

**Approaches:** This can be solved with either BFS or DFS.

### BFS Approach

The last node processed at each level in a standard BFS will be the rightmost node of that level.

```typescript
// Time: O(N) | Space: O(W) (N in worst case)
function rightSideViewBFS(root: TreeNode | null): number[] {
    const result: number[] = [];
    if (!root) {
        return result;
    }

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let rightmostNodeVal: number | undefined; // To store the value of the rightmost node for current level

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            rightmostNodeVal = node.val; // Always update with the current node's value

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        // After processing all nodes in the level, `rightmostNodeVal` holds the value of the last node (rightmost).
        if (rightmostNodeVal !== undefined) {
            result.push(rightmostNodeVal);
        }
    }
    return result;
}
```

### DFS Approach

We can use a modified Preorder Traversal (Root -> Right -> Left). By visiting the right child before the left child, the first node we encounter at any given `level` will be the rightmost one visible from that level.

```typescript
// Time: O(N) | Space: O(H) (N in worst case)
function rightSideViewDFS(root: TreeNode | null): number[] {
    const result: number[] = [];
    // `level` tracks current depth, `result.length` stores max_level_visited + 1
    function dfs(node: TreeNode | null, level: number): void {
        if (!node) {
            return;
        }

        // If this is the first time we visit a node at this level,
        // it must be the rightmost one (because we prioritize right children).
        if (level === result.length) {
            result.push(node.val);
        }

        dfs(node.right, level + 1); // Go right first
        dfs(node.left, level + 1);  // Then go left
    }
    dfs(root, 0); // Start at level 0
    return result;
}
```

---

## 6. Edge Cases and Gotchas

When dealing with tree traversals, always consider:

*   **Empty Tree (null root):** The code should gracefully handle `root === null` and return an empty result (e.g., `[]` or `[[]]`). All provided solutions handle this.
*   **Single Node Tree:** The traversal should correctly visit just the root node.
*   **Skewed Trees (linear list):**
    *   **Space Complexity:** Recursive DFS can lead to a stack overflow for very deep skewed trees in languages with limited recursion depth (like Python's default). Iterative solutions or languages with Tail Call Optimization (TCO) might be preferred. In JavaScript, recursion depth is generally limited.
    *   Iterative solutions using a stack or queue typically convert the recursion stack into an explicit data structure, managing memory more predictably.
*   **Tree with only Left Children/Right Children:** These are specific cases of skewed trees.
*   **Tree with Internal Nulls:** Ensure your tree construction and traversal logic correctly skips `null` children without errors, but still traverses deeper branches if they exist (e.g., `[1, null, 2, 3]` should still visit `3`).
*   **Node Values:** Are they unique? Can they be negative? `0`? The problems typically deal with `number` types, so this is generally not an issue unless the problem specifies constraints.

---

## 7. Interview Tips and Variations

### Before Coding

1.  **Clarify the Problem:**
    *   What kind of tree is it (binary, N-ary, BST, AVL, general)? (Assumed binary for this project)
    *   Are node values unique?
    *   What's the expected output format (array of numbers, 2D array, etc.)?
    *   What about an empty tree or single-node tree?
    *   Constraints on node values or tree size (can affect integer overflow, recursion depth)?
2.  **Understand the Traversal Type:** Which order is required (inorder, preorder, postorder, level order, or a variation)?
3.  **Discuss Approaches:**
    *   **DFS vs. BFS:** Which is more natural for the problem?
        *   DFS is good for problems that need to explore entire paths (e.g., path sum, lowest common ancestor).
        *   BFS is good for problems that need to explore layer by layer (e.g., shortest path in unweighted graph, level order problems).
    *   **Recursive vs. Iterative:**
        *   Recursive is often simpler to write and understand (more "functional").
        *   Iterative avoids recursion depth limits and can sometimes be more efficient in terms of constant factors or memory allocation for the stack.

### During Coding

1.  **Start with Base Cases:** Always handle `if (!root) return []` (or similar) first.
2.  **Helper Functions:** For recursive DFS, use a helper function to pass the `result` array by reference or closure.
3.  **Data Structures:**
    *   **DFS (Iterative):** Use a `Stack` (Last-In, First-Out). In JavaScript, an array's `push()` and `pop()` simulate a stack.
    *   **BFS:** Use a `Queue` (First-In, First-Out). In JavaScript, an array's `push()` and `shift()` simulate a queue. `shift()` is O(N) for arrays, for very large queues, a `deque` (like a linked list-based queue) might be more efficient, but JS arrays are usually fine in interviews.
4.  **Clarity:** Use meaningful variable names (e.g., `current`, `node`, `queue`, `stack`).
5.  **Complexity Analysis:** State the time and space complexity for your chosen solution.
    *   **Time:** O(N) for all traversals (each node visited once).
    *   **Space:**
        *   **DFS (Recursive):** O(H), where H is the height of the tree. In worst case (skewed tree), H = N.
        *   **DFS (Iterative):** O(H), using a stack to store ancestors. In worst case (skewed tree), H = N. (Postorder with two stacks is O(N) in worst case).
        *   **BFS:** O(W), where W is the maximum width of the tree. In worst case (complete tree), W = N/2, so O(N).

### Follow-up Questions and Variations

*   **N-ary Tree Traversals:** How would you adapt the traversals for a tree where nodes can have more than two children? (BFS is similar, DFS would loop through all children).
*   **Path Sum:** Find if there's a path from root to leaf that sums to a target. (DFS, pass current sum down).
*   **All Paths from Root to Leaf:** Return all paths. (DFS, track current path in an array).
*   **Lowest Common Ancestor (LCA):** Find the LCA of two nodes. (DFS-based or path-tracking).
*   **Serialization/Deserialization:** Convert a tree to a string and back. (Preorder DFS or Level Order BFS are common).
*   **Kth Smallest Element in BST:** (Inorder traversal, stop at Kth element).
*   **Boundary Traversal:** Visit nodes forming the boundary of the tree.
*   **Vertical Order Traversal:** Group nodes by their vertical column.
*   **Diagonal Traversal:** Group nodes by diagonals.

### Choosing Between DFS and BFS

*   **DFS (recursive) is generally preferred when:**
    *   The problem asks for properties of paths (e.g., path sum, checking if a path exists).
    *   The tree is very wide but not very deep (to avoid deep recursion stack, though iterative DFS or BFS might be better here).
    *   Memory is a concern and the tree is balanced (recursion stack is `O(log N)`).
*   **BFS is generally preferred when:**
    *   The problem asks for properties level by level (e.g., min depth, level order, zigzag order).
    *   You need the shortest path in an unweighted tree (BFS guarantees finding the shortest path first).
    *   The tree is very deep but not very wide (BFS queue size is `O(W)`).
*   **DFS (iterative with stack) is a good alternative when:**
    *   You need DFS behavior but want to avoid recursion depth limits.
    *   You want more explicit control over the traversal.

### Recursive vs. Iterative

*   **Readability:** Recursive solutions are often more concise and easier to grasp initially, especially for problems that naturally fit a divide-and-conquer pattern.
*   **Memory (Stack):** Both recursive and iterative DFS use stack memory.
    *   Recursive uses the call stack, which has built-in limits.
    *   Iterative uses an explicit data structure (array/stack), giving more control but requiring manual management.
*   **Performance:** In JavaScript, iterative solutions using arrays for stacks/queues can sometimes be slightly faster due to less overhead from function calls, but this is often negligible for typical interview problem constraints. The primary concern is usually stack overflow for very deep recursive trees.

### Memory Efficiency (Morris Traversal)

For inorder traversal, there's a unique algorithm called **Morris Traversal** that achieves O(1) space complexity without using a stack or recursion. It does this by temporarily modifying the tree structure to create "threads" back to ancestor nodes, then restoring the tree.

*   **How it works (Inorder):**
    1.  Initialize `current` to `root`.
    2.  While `current` is not `null`:
        a.  If `current` has no left child:
            *   Visit `current`.
            *   Move `current` to its right child (`current = current.right`).
        b.  If `current` has a left child:
            *   Find the `predecessor` of `current` (the rightmost node in `current`'s left subtree).
            *   If `predecessor`'s `right` child is `null` (first visit):
                *   Set `predecessor.right = current` (create a thread).
                *   Move `current` to its left child (`current = current.left`).
            *   If `predecessor`'s `right` child is `current` (second visit):
                *   Set `predecessor.right = null` (remove the thread).
                *   Visit `current`.
                *   Move `current` to its right child (`current = current.right`).
*   **Why it's rarely used in interviews for basic traversals:**
    *   It's significantly more complex to implement correctly on the fly.
    *   It modifies the tree structure (even if temporary), which might not be allowed for all problems.
    *   The interviewer might not expect it unless specifically asked for O(1) space.
    *   However, knowing about it shows advanced understanding.

This document aims to provide a solid foundation for approaching binary tree traversal problems in coding interviews. Practice each traversal type with different tree structures, and understand the trade-offs between various implementation strategies.