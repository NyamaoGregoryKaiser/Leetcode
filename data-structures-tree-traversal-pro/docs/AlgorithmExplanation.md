```markdown
# Algorithm Explanation: Tree Traversals

This document provides a detailed explanation of the tree traversal algorithms implemented in this project, including their principles, pseudocode logic, ASCII diagrams, and complexity analysis.

## Table of Contents

1.  [Binary Tree Definition](#1-binary-tree-definition)
2.  [Depth-First Search (DFS) Traversals](#2-depth-first-search-dfs-traversals)
    *   [2.1 Preorder Traversal](#21-preorder-traversal)
    *   [2.2 Inorder Traversal](#22-inorder-traversal)
    *   [2.3 Postorder Traversal](#23-postorder-traversal)
3.  [Breadth-First Search (BFS) Traversals](#3-breadth-first-search-bfs-traversals)
    *   [3.1 Level Order Traversal](#31-level-order-traversal)
    *   [3.2 Zigzag Level Order Traversal](#32-zigzag-level-order-traversal)
4.  [BST Iterator (Iterative Inorder for BSTs)](#4-bst-iterator-iterative-inorder-for-bsts)
5.  [Complexity Summary](#5-complexity-summary)

---

## 1. Binary Tree Definition

A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.

```
      A
     / \
    B   C
   / \   \
  D   E   F
```

Our `TreeNode` class:
```java
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    // Constructor and helper methods
}
```

---

## 2. Depth-First Search (DFS) Traversals

DFS algorithms explore as far as possible along each branch before backtracking. There are three common ways to perform DFS on a binary tree, distinguished by the order in which the root node's data is processed relative to its left and right subtrees.

**General Principle (Recursive):**
1.  Perform an action on the current node (Root).
2.  Recursively traverse the Left subtree.
3.  Recursively traverse the Right subtree.

The specific order of these three steps defines the traversal type.

### 2.1 Preorder Traversal (Root - Left - Right)

In a preorder traversal, we visit the root node first, then recursively traverse its left subtree, and finally recursively traverse its right subtree.

**Uses:**
*   Creating a copy of the tree.
*   Representing an expression tree as a prefix expression (e.g., `+ A B`).

**ASCII Diagram & Steps:**

Consider the tree:
```
      1
     / \
    2   3
   / \
  4   5
```

1.  **Visit 1** (Root)
2.  Traverse Left Subtree (Root is 2):
    *   **Visit 2** (Root)
    *   Traverse Left Subtree (Root is 4):
        *   **Visit 4** (Root)
        *   Left is null, Right is null. Backtrack.
    *   Traverse Right Subtree (Root is 5):
        *   **Visit 5** (Root)
        *   Left is null, Right is null. Backtrack.
    *   Backtrack from 2.
3.  Traverse Right Subtree (Root is 3):
    *   **Visit 3** (Root)
    *   Left is null, Right is null. Backtrack.
    *   Backtrack from 3.
4.  Finished.

**Traversal Order: `1 -> 2 -> 4 -> 5 -> 3`**

**Pseudocode (Recursive):**
```
PREORDER(node):
  IF node IS NULL:
    RETURN
  PRINT node.value
  PREORDER(node.left)
  PREORDER(node.right)
```

**Pseudocode (Iterative - using Stack):**
```
PREORDER_ITERATIVE(root):
  IF root IS NULL:
    RETURN []
  result = []
  stack = new Stack()
  stack.push(root)

  WHILE stack IS NOT EMPTY:
    current = stack.pop()
    result.add(current.value)
    IF current.right IS NOT NULL:
      stack.push(current.right)  // Push right first so left is processed next
    IF current.left IS NOT NULL:
      stack.push(current.left)   // Push left last to be processed first
  RETURN result
```

### 2.2 Inorder Traversal (Left - Root - Right)

In an inorder traversal, we recursively traverse the left subtree, then visit the root node, and finally recursively traverse its right subtree.

**Uses:**
*   Retrieving elements of a Binary Search Tree (BST) in sorted order.
*   Representing an expression tree as an infix expression (e.g., `A + B`).

**ASCII Diagram & Steps:**

Consider the tree:
```
      1
     / \
    2   3
   / \
  4   5
```

1.  Traverse Left Subtree (Root is 2):
    *   Traverse Left Subtree (Root is 4):
        *   Left is null.
        *   **Visit 4** (Root)
        *   Right is null. Backtrack.
    *   **Visit 2** (Root)
    *   Traverse Right Subtree (Root is 5):
        *   Left is null.
        *   **Visit 5** (Root)
        *   Right is null. Backtrack.
    *   Backtrack from 2.
2.  **Visit 1** (Root)
3.  Traverse Right Subtree (Root is 3):
    *   Left is null.
    *   **Visit 3** (Root)
    *   Right is null. Backtrack.
    *   Backtrack from 3.
4.  Finished.

**Traversal Order: `4 -> 2 -> 5 -> 1 -> 3`**

**Pseudocode (Recursive):**
```
INORDER(node):
  IF node IS NULL:
    RETURN
  INORDER(node.left)
  PRINT node.value
  INORDER(node.right)
```

**Pseudocode (Iterative - using Stack):**
```
INORDER_ITERATIVE(root):
  IF root IS NULL:
    RETURN []
  result = []
  stack = new Stack()
  current = root

  WHILE current IS NOT NULL OR stack IS NOT EMPTY:
    WHILE current IS NOT NULL:          // Go left as far as possible
      stack.push(current)
      current = current.left
    current = stack.pop()               // Pop the leftmost node
    result.add(current.value)           // Visit it
    current = current.right             // Go to its right subtree
  RETURN result
```

### 2.3 Postorder Traversal (Left - Right - Root)

In a postorder traversal, we recursively traverse the left subtree, then recursively traverse the right subtree, and finally visit the root node.

**Uses:**
*   Deleting a tree (ensuring children are deleted before their parent).
*   Representing an expression tree as a postfix expression (e.g., `A B +`).

**ASCII Diagram & Steps:**

Consider the tree:
```
      1
     / \
    2   3
   / \
  4   5
```

1.  Traverse Left Subtree (Root is 2):
    *   Traverse Left Subtree (Root is 4):
        *   Left is null, Right is null.
        *   **Visit 4** (Root)
        *   Backtrack.
    *   Traverse Right Subtree (Root is 5):
        *   Left is null, Right is null.
        *   **Visit 5** (Root)
        *   Backtrack.
    *   **Visit 2** (Root)
    *   Backtrack from 2.
2.  Traverse Right Subtree (Root is 3):
    *   Left is null, Right is null.
    *   **Visit 3** (Root)
    *   Backtrack from 3.
3.  **Visit 1** (Root)
4.  Finished.

**Traversal Order: `4 -> 5 -> 2 -> 3 -> 1`**

**Pseudocode (Recursive):**
```
POSTORDER(node):
  IF node IS NULL:
    RETURN
  POSTORDER(node.left)
  POSTORDER(node.right)
  PRINT node.value
```

**Pseudocode (Iterative - using Two Stacks):**
```
POSTORDER_ITERATIVE(root):
  IF root IS NULL:
    RETURN []
  result = []
  s1 = new Stack() // Main stack for processing
  s2 = new Stack() // Auxiliary stack for storing result in reverse postorder

  s1.push(root)

  WHILE s1 IS NOT EMPTY:
    current = s1.pop()
    s2.push(current)        // Add to s2

    IF current.left IS NOT NULL:
      s1.push(current.left)
    IF current.right IS NOT NULL:
      s1.push(current.right)

  WHILE s2 IS NOT EMPTY:
    result.add(s2.pop().value) // Pop from s2 to get actual postorder
  RETURN result
```

---

## 3. Breadth-First Search (BFS) Traversals

BFS algorithms explore nodes level by level. It uses a queue data structure to keep track of nodes to visit.

### 3.1 Level Order Traversal

Visits all nodes at the current depth level before moving on to nodes at the next depth level. It typically processes nodes from left to right within each level.

**Uses:**
*   Finding the shortest path in an unweighted tree/graph.
*   Web crawling (exploring pages at current depth before going deeper).
*   Social network "friend of a friend" searches.

**ASCII Diagram & Steps:**

Consider the tree:
```
      3
     / \
    9  20
       / \
      15  7
```

1.  Queue: `[3]`
2.  Dequeue 3. Add `3` to current level. Enqueue children `9, 20`.
    Current Level: `[3]`
    Queue: `[9, 20]`
3.  Dequeue 9. Add `9` to current level. No children.
    Dequeue 20. Add `20` to current level. Enqueue children `15, 7`.
    Current Level: `[9, 20]`
    Queue: `[15, 7]`
4.  Dequeue 15. Add `15` to current level. No children.
    Dequeue 7. Add `7` to current level. No children.
    Current Level: `[15, 7]`
    Queue: `[]`
5.  Queue is empty. Finished.

**Traversal Order: `[[3], [9, 20], [15, 7]]`** (grouped by level)

**Pseudocode (Iterative - using Queue):**
```
LEVEL_ORDER(root):
  IF root IS NULL:
    RETURN []
  result = []
  queue = new Queue()
  queue.offer(root)

  WHILE queue IS NOT EMPTY:
    levelSize = queue.size()
    currentLevelNodes = []
    FOR i FROM 0 TO levelSize - 1:
      current = queue.poll()
      currentLevelNodes.add(current.value)
      IF current.left IS NOT NULL:
        queue.offer(current.left)
      IF current.right IS NOT NULL:
        queue.offer(current.right)
    result.add(currentLevelNodes)
  RETURN result
```

### 3.2 Zigzag Level Order Traversal

This is a variation of level order traversal where nodes are visited level by level, but the order of nodes within each level alternates between left-to-right and right-to-left.

**Uses:**
*   A common interview question combining BFS with a twist.

**ASCII Diagram & Steps:**

Consider the tree:
```
      3
     / \
    9  20
       / \
      15  7
```

1.  Queue: `[3]`
    `leftToRight = true`
2.  Level 1:
    Dequeue 3. Add `3` to `currentLevelNodes`. Enqueue `9, 20`.
    `currentLevelNodes`: `[3]`
    `leftToRight` is true, so no reverse. `result.add([3])`.
    `leftToRight = false`
    Queue: `[9, 20]`
3.  Level 2:
    Dequeue 9. Add `9` to `currentLevelNodes`. No children.
    Dequeue 20. Add `20` to `currentLevelNodes`. Enqueue `15, 7`.
    `currentLevelNodes`: `[9, 20]`
    `leftToRight` is false, so `reverse(currentLevelNodes)`. `currentLevelNodes` becomes `[20, 9]`.
    `result.add([20, 9])`.
    `leftToRight = true`
    Queue: `[15, 7]`
4.  Level 3:
    Dequeue 15. Add `15` to `currentLevelNodes`. No children.
    Dequeue 7. Add `7` to `currentLevelNodes`. No children.
    `currentLevelNodes`: `[15, 7]`
    `leftToRight` is true, so no reverse. `result.add([15, 7])`.
    `leftToRight = false`
    Queue: `[]`
5.  Queue is empty. Finished.

**Traversal Order: `[[3], [20, 9], [15, 7]]`** (grouped by level)

**Pseudocode (Iterative - using Queue + Flag):**
```
ZIGZAG_LEVEL_ORDER(root):
  IF root IS NULL:
    RETURN []
  result = []
  queue = new Queue()
  queue.offer(root)
  leftToRight = true

  WHILE queue IS NOT EMPTY:
    levelSize = queue.size()
    currentLevelNodes = [] // Temporary list to gather nodes for current level

    FOR i FROM 0 TO levelSize - 1:
      current = queue.poll()
      currentLevelNodes.add(current.value) // Always add in natural order
      IF current.left IS NOT NULL:
        queue.offer(current.left)
      IF current.right IS NOT NULL:
        queue.offer(current.right)

    IF NOT leftToRight:
      REVERSE(currentLevelNodes) // Reverse if traversing right-to-left
    result.add(currentLevelNodes)
    leftToRight = NOT leftToRight // Toggle for next level
  RETURN result
```
*Alternative for Zigzag*: Use a `Deque` (double-ended queue). For odd levels, add to tail; for even levels, add to head. This avoids the explicit `reverse()` operation on the list.

---

## 4. BST Iterator (Iterative Inorder for BSTs)

This is a specific application of iterative inorder traversal tailored for Binary Search Trees. The goal is to provide elements in sorted order on demand, mimicking an iterator, with optimal time and space complexity.

**Problem:** Design an iterator that can traverse a BST and return its elements in ascending order.
*   `BSTIterator(TreeNode root)`: Initializes the iterator.
*   `int next()`: Returns the next smallest number.
*   `boolean hasNext()`: Returns `true` if there are more elements, `false` otherwise.

**Constraints:**
*   `next()` and `hasNext()` should run in amortized O(1) time.
*   Space complexity should be O(H), where H is the height of the BST.

**Key Idea:** The smallest element in a BST is always the leftmost node. The second smallest will be either the parent of that leftmost node (if it has no right child) or the leftmost node of its right child. This pattern aligns perfectly with an iterative inorder traversal using a stack.

**ASCII Diagram & Steps:**

Consider the BST:
```
        7
       / \
      3  15
         / \
        9  20
```

**Constructor `BSTIterator(root = 7)`:**
1.  `pushAllLeft(7)`:
    *   Push 7. `stack = [7]`
    *   `node = 3`. Push 3. `stack = [7, 3]`
    *   `node = null`. Stop.
    Initial `stack = [7, 3]` (top is 3).

**`hasNext()`:** `stack` is not empty, returns `true`.

**`next()`:**
1.  `current = stack.pop()` (3). `val = 3`. `stack = [7]`
2.  `3` has no right child.
3.  Returns `3`.

**`hasNext()`:** `stack` is not empty, returns `true`.

**`next()`:**
1.  `current = stack.pop()` (7). `val = 7`. `stack = []`
2.  `7` has a right child (15). Call `pushAllLeft(15)`.
    *   Push 15. `stack = [15]`
    *   `node = 9`. Push 9. `stack = [15, 9]`
    *   `node = null`. Stop.
    Current `stack = [15, 9]` (top is 9).
3.  Returns `7`.

...and so on.

**Pseudocode (`BSTIterator` class methods):**
```
class BSTIterator:
  stack = new Stack()

  CONSTRUCTOR(root):
    pushAllLeft(root) // Helper to pre-fill stack

  next():
    current = stack.pop()
    val = current.value
    IF current.right IS NOT NULL:
      pushAllLeft(current.right) // Prepare for next smallest
    RETURN val

  hasNext():
    RETURN stack IS NOT EMPTY

  pushAllLeft(node):
    WHILE node IS NOT NULL:
      stack.push(node)
      node = node.left
```

---

## 5. Complexity Summary

| Traversal Type           | Method                  | Time Complexity | Space Complexity (Auxiliary) | Notes                                                                                   |
| :----------------------- | :---------------------- | :-------------- | :--------------------------- | :-------------------------------------------------------------------------------------- |
| **DFS Traversals**       | Preorder (Recursive)    | O(N)            | O(H)                         | H is tree height. O(N) worst case (skewed), O(log N) best case (balanced).             |
|                          | Preorder (Iterative)    | O(N)            | O(H)                         | Avoids recursion stack limit, explicit stack.                                           |
|                          | Inorder (Recursive)     | O(N)            | O(H)                         | Yields sorted output for BSTs.                                                          |
|                          | Inorder (Iterative)     | O(N)            | O(H)                         | Essential for BST Iterator or avoiding stack overflow.                                  |
|                          | Postorder (Recursive)   | O(N)            | O(H)                         | Used for tree deletion.                                                                 |
|                          | Postorder (Iterative)   | O(N)            | O(N)                         | Often uses two stacks, worst case space is O(N).                                        |
| **BFS Traversals**       | Level Order (Iterative) | O(N)            | O(W)                         | W is max width of tree. O(N) worst case (complete tree), uses a Queue.                |
|                          | Zigzag Level Order (Iterative) | O(N)            | O(W)                         | Variation of Level Order, often uses a Queue + flag or Deque.                           |
| **BST Iterator**         | Constructor             | O(H)            | O(H)                         | Initializes stack with leftmost path.                                                   |
|                          | `next()`                | O(1) amortized  | O(H)                         | Each node processed once over total calls.                                              |
|                          | `hasNext()`             | O(1)            | O(H)                         | Simple stack check.                                                                     |

*   **N**: Number of nodes in the tree.
*   **H**: Height of the tree.
*   **W**: Maximum width of the tree.
```