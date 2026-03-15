# Algorithm Explanation: Tree Traversals

This document provides detailed explanations, ASCII diagrams, and complexity analysis for the tree traversal algorithms implemented in this project.

## Table of Contents
1.  [Introduction to Tree Traversals](#1-introduction-to-tree-traversals)
2.  [Depth-First Search (DFS) Traversals](#2-depth-first-search-dfs-traversals)
    *   [2.1 Inorder Traversal](#21-inorder-traversal)
        *   [2.1.1 Recursive Implementation](#211-recursive-implementation)
        *   [2.1.2 Iterative Implementation](#212-iterative-implementation)
    *   [2.2 Preorder Traversal](#22-preorder-traversal)
        *   [2.2.1 Recursive Implementation](#221-recursive-implementation)
        *   [2.2.2 Iterative Implementation](#222-iterative-implementation)
    *   [2.3 Postorder Traversal](#23-postorder-traversal)
        *   [2.3.1 Recursive Implementation](#231-recursive-implementation)
        *   [2.3.2 Iterative Implementation (Two Stacks)](#232-iterative-implementation-two-stacks)
        *   [2.3.3 Iterative Implementation (One Stack)](#233-iterative-implementation-one-stack)
3.  [Breadth-First Search (BFS) Traversals](#3-breadth-first-search-bfs-traversals)
    *   [3.1 Level Order Traversal](#31-level-order-traversal)
    *   [3.2 Zigzag Level Order Traversal](#32-zigzag-level-order-traversal)
4.  [Applications of Traversals](#4-applications-of-traversals)
    *   [4.1 Validate Binary Search Tree](#41-validate-binary-search-tree)
        *   [4.1.1 Recursive with Bounds](#411-recursive-with-bounds)
        *   [4.1.2 Iterative Inorder](#412-iterative-inorder)
    *   [4.2 All Paths from Root to Leaf](#42-all-paths-from-root-to-leaf)
        *   [4.2.1 Recursive DFS with Backtracking](#421-recursive-dfs-with-backtracking)
        *   [4.2.2 Iterative DFS](#422-iterative-dfs)
5.  [Memory-Efficient Traversal (Bonus)](#5-memory-efficient-traversal-bonus)
    *   [5.1 Morris Traversal (Inorder & Preorder)](#51-morris-traversal-inorder--preorder)

---

## 1. Introduction to Tree Traversals

Tree traversal refers to the process of visiting each node in a tree data structure exactly once. There are generally two main categories of traversal:

*   **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking. This includes Inorder, Preorder, and Postorder traversals.
*   **Breadth-First Search (BFS)**: Explores all nodes at the present depth before moving on to nodes at the next depth level. This is commonly known as Level Order traversal.

Let's use a common example tree for our diagrams:
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```

## 2. Depth-First Search (DFS) Traversals

DFS traversals prioritize depth over breadth. They can be implemented recursively (natural for trees due to their recursive definition) or iteratively using a stack.

### 2.1 Inorder Traversal

**Order:** Left subtree -> Root -> Right subtree

When applied to a Binary Search Tree (BST), Inorder traversal visits nodes in non-decreasing (sorted) order.

#### 2.1.1 Recursive Implementation
The most intuitive way.
**Algorithm:**
1.  Traverse the left subtree recursively.
2.  Visit the root node.
3.  Traverse the right subtree recursively.

**Example Walkthrough:**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
`inorder(1)`
  `inorder(2)`
    `inorder(4)`
      `inorder(None)` -> return
      Visit 4 -> `[4]`
      `inorder(None)` -> return
    Return from `inorder(4)`
    Visit 2 -> `[4, 2]`
    `inorder(5)`
      `inorder(None)` -> return
      Visit 5 -> `[4, 2, 5]`
      `inorder(None)` -> return
    Return from `inorder(5)`
  Return from `inorder(2)`
  Visit 1 -> `[4, 2, 5, 1]`
  `inorder(3)`
    `inorder(6)`
      `inorder(None)` -> return
      Visit 6 -> `[4, 2, 5, 1, 6]`
      `inorder(None)` -> return
    Return from `inorder(6)`
    Visit 3 -> `[4, 2, 5, 1, 6, 3]`
    `inorder(7)`
      `inorder(None)` -> return
      Visit 7 -> `[4, 2, 5, 1, 6, 3, 7]`
      `inorder(None)` -> return
    Return from `inorder(7)`
  Return from `inorder(3)`
Return from `inorder(1)`

**Result:** `[4, 2, 5, 1, 6, 3, 7]`

**Complexity:**
*   **Time:** O(N), where N is the number of nodes. Each node is visited once.
*   **Space:** O(H), where H is the height of the tree, for the recursion stack. In worst case (skewed tree), H = N. In best case (balanced tree), H = log N.

#### 2.1.2 Iterative Implementation

**Algorithm (using a stack):**
1.  Initialize an empty stack and an empty result list.
2.  Set `current` node to `root`.
3.  Loop while `current` is not `None` or stack is not empty:
    a.  While `current` is not `None`:
        Push `current` onto the stack.
        Move `current` to its left child (go left as much as possible).
    b.  Pop a node from the stack. This is the "Root" part.
        Add its value to the result list.
    c.  Move `current` to its right child (process right subtree).

**Example Walkthrough (simplified states):**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
| `current` | Stack  | Result      | Action                               |
| :-------- | :----- | :---------- | :----------------------------------- |
| 1         | [1]    | []          | Push 1, go left (`current=2`)        |
| 2         | [1, 2] | []          | Push 2, go left (`current=4`)        |
| 4         | [1, 2, 4]| []          | Push 4, go left (`current=None`)     |
| None      | [1, 2, 4]| []          | `current` is None. Pop 4.            |
| 4 (popped) | [1, 2] | [4]         | Add 4. `current = 4.right` (None)    |
| None      | [1, 2] | [4]         | `current` is None. Pop 2.            |
| 2 (popped) | [1]    | [4, 2]      | Add 2. `current = 2.right` (5)       |
| 5         | [1, 5] | [4, 2]      | Push 5, go left (`current=None`)     |
| None      | [1, 5] | [4, 2]      | `current` is None. Pop 5.            |
| 5 (popped) | [1]    | [4, 2, 5]   | Add 5. `current = 5.right` (None)    |
| None      | [1]    | [4, 2, 5]   | `current` is None. Pop 1.            |
| 1 (popped) | []     | [4, 2, 5, 1]| Add 1. `current = 1.right` (3)       |
| 3         | [3]    | [4, 2, 5, 1]| Push 3, go left (`current=6`)        |
| 6         | [3, 6] | [4, 2, 5, 1]| Push 6, go left (`current=None`)     |
| None      | [3, 6] | [4, 2, 5, 1]| `current` is None. Pop 6.            |
| 6 (popped) | [3]    | [4, 2, 5, 1, 6]| Add 6. `current = 6.right` (None)    |
| ...                                    |
| None      | []     | [4, 2, 5, 1, 6, 3, 7]| Loop terminates.              |

**Result:** `[4, 2, 5, 1, 6, 3, 7]`

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(H) for the stack.

### 2.2 Preorder Traversal

**Order:** Root -> Left subtree -> Right subtree

This traversal is useful for creating a copy of the tree or for prefix expressions.

#### 2.2.1 Recursive Implementation
**Algorithm:**
1.  Visit the root node.
2.  Traverse the left subtree recursively.
3.  Traverse the right subtree recursively.

**Example Walkthrough:**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
`preorder(1)`
  Visit 1 -> `[1]`
  `preorder(2)`
    Visit 2 -> `[1, 2]`
    `preorder(4)`
      Visit 4 -> `[1, 2, 4]`
      `preorder(None)` -> return
      `preorder(None)` -> return
    Return from `preorder(4)`
    `preorder(5)`
      Visit 5 -> `[1, 2, 4, 5]`
      `preorder(None)` -> return
      `preorder(None)` -> return
    Return from `preorder(5)`
  Return from `preorder(2)`
  `preorder(3)`
    Visit 3 -> `[1, 2, 4, 5, 3]`
    `preorder(6)`
      Visit 6 -> `[1, 2, 4, 5, 3, 6]`
      `preorder(None)` -> return
      `preorder(None)` -> return
    Return from `preorder(6)`
    `preorder(7)`
      Visit 7 -> `[1, 2, 4, 5, 3, 6, 7]`
      `preorder(None)` -> return
      `preorder(None)` -> return
    Return from `preorder(7)`
  Return from `preorder(3)`
Return from `preorder(1)`

**Result:** `[1, 2, 4, 5, 3, 6, 7]`

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(H) for the recursion stack.

#### 2.2.2 Iterative Implementation

**Algorithm (using a stack):**
1.  Initialize an empty stack and an empty result list.
2.  If `root` is `None`, return empty result.
3.  Push `root` onto the stack.
4.  While stack is not empty:
    a.  Pop a node from the stack.
    b.  Add its value to the result list (Visit Root).
    c.  Push its right child onto the stack (if exists).
    d.  Push its left child onto the stack (if exists).
        (Right child is pushed before left because stack is LIFO, so left child will be processed first).

**Example Walkthrough:**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
| Stack    | Result      | Action                               |
| :------- | :---------- | :----------------------------------- |
| [1]      | []          | Push 1                               |
| []       | [1]         | Pop 1. Add 1. Push 3, then 2.        |
| [3, 2]   | [1]         | Pop 2. Add 2. Push 5, then 4.        |
| [3, 5, 4]| [1, 2]      | Pop 4. Add 4. No children.           |
| [3, 5]   | [1, 2, 4]   | Pop 5. Add 5. No children.           |
| [3]      | [1, 2, 4, 5]| Pop 3. Add 3. Push 7, then 6.        |
| [7, 6]   | [1, 2, 4, 5, 3]| Pop 6. Add 6. No children.           |
| [7]      | [1, 2, 4, 5, 3, 6]| Pop 7. Add 7. No children.           |
| []       | [1, 2, 4, 5, 3, 6, 7]| Loop terminates.              |

**Result:** `[1, 2, 4, 5, 3, 6, 7]`

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(H) for the stack.

### 2.3 Postorder Traversal

**Order:** Left subtree -> Right subtree -> Root

This traversal is useful for deleting a tree or for postfix expressions.

#### 2.3.1 Recursive Implementation
**Algorithm:**
1.  Traverse the left subtree recursively.
2.  Traverse the right subtree recursively.
3.  Visit the root node.

**Example Walkthrough:**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
`postorder(1)`
  `postorder(2)`
    `postorder(4)`
      `postorder(None)` -> return
      `postorder(None)` -> return
      Visit 4 -> `[4]`
    Return from `postorder(4)`
    `postorder(5)`
      `postorder(None)` -> return
      `postorder(None)` -> return
      Visit 5 -> `[4, 5]`
    Return from `postorder(5)`
    Visit 2 -> `[4, 5, 2]`
  Return from `postorder(2)`
  `postorder(3)`
    `postorder(6)`
      `postorder(None)` -> return
      `postorder(None)` -> return
      Visit 6 -> `[4, 5, 2, 6]`
    Return from `postorder(6)`
    `postorder(7)`
      `postorder(None)` -> return
      `postorder(None)` -> return
      Visit 7 -> `[4, 5, 2, 6, 7]`
    Return from `postorder(7)`
    Visit 3 -> `[4, 5, 2, 6, 7, 3]`
  Return from `postorder(3)`
  Visit 1 -> `[4, 5, 2, 6, 7, 3, 1]`
Return from `postorder(1)`

**Result:** `[4, 5, 2, 6, 7, 3, 1]`

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(H) for the recursion stack.

#### 2.3.2 Iterative Implementation (Two Stacks)

This is a simpler iterative approach for Postorder.

**Algorithm:**
1.  Initialize two stacks, `s1` and `s2`, and an empty result list.
2.  Push `root` onto `s1`.
3.  While `s1` is not empty:
    a.  Pop a node from `s1`.
    b.  Push this node onto `s2`.
    c.  Push its left child onto `s1` (if exists).
    d.  Push its right child onto `s1` (if exists).
4.  While `s2` is not empty:
    Pop nodes from `s2` and append their values to the result list.
    (`s2` will contain nodes in Root -> Right -> Left order, popping from it reverses this to Left -> Right -> Root).

**Example Walkthrough (simplified states):**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
| `s1`     | `s2`      | Result      | Action                               |
| :------- | :-------- | :---------- | :----------------------------------- |
| [1]      | []        | []          | Push 1 to `s1`                       |
| []       | [1]       | []          | Pop 1 from `s1`, push to `s2`. Push 2, then 3 to `s1` |
| [2, 3]   | [1]       | []          | Pop 3 from `s1`, push to `s2`. Push 6, then 7 to `s1` |
| [2, 6, 7]| [1, 3]    | []          | Pop 7 from `s1`, push to `s2`. No children. |
| [2, 6]   | [1, 3, 7] | []          | Pop 6 from `s1`, push to `s2`. No children. |
| [2]      | [1, 3, 7, 6]| []          | Pop 2 from `s1`, push to `s2`. Push 4, then 5 to `s1` |
| [4, 5]   | [1, 3, 7, 6, 2]| []          | Pop 5 from `s1`, push to `s2`. No children. |
| [4]      | [1, 3, 7, 6, 2, 5]| []          | Pop 4 from `s1`, push to `s2`. No children. |
| []       | [1, 3, 7, 6, 2, 5, 4]| []          | `s1` is empty. Now pop from `s2` and add to result. |
|          | []        | [4, 5, 2, 6, 7, 3, 1]| `s2` empty. Loop terminates. |

**Result:** `[4, 5, 2, 6, 7, 3, 1]`

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(N) in the worst case, as both stacks could hold up to N nodes.

#### 2.3.3 Iterative Implementation (One Stack)

This approach is more complex but uses less space than the two-stack method.

**Algorithm:**
1.  Initialize an empty stack and an empty result list.
2.  Set `current` node to `root`.
3.  Keep track of `last_visited_node`.
4.  Loop while `current` is not `None` or stack is not empty:
    a.  While `current` is not `None`:
        Push `current` onto the stack.
        Move `current` to its left child.
    b.  Peek at the top of the stack (`peek_node`).
    c.  If `peek_node` has a right child AND the right child was NOT `last_visited_node`:
        Move `current` to `peek_node.right`. (This is because we need to process the right subtree before visiting `peek_node`).
    d.  Else (`peek_node` has no right child, or its right child has already been visited):
        Pop `peek_node` from the stack.
        Add its value to the result list.
        Set `last_visited_node = peek_node`.
        Set `current = None` (important: prevents going left again, allows processing the next node from stack).

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(H) for the stack.

## 3. Breadth-First Search (BFS) Traversals

BFS traversals explore nodes level by level. They are typically implemented using a queue.

### 3.1 Level Order Traversal

**Order:** Level by level, from left to right within each level.

**Algorithm (using a queue):**
1.  Initialize an empty list of lists for the result.
2.  If `root` is `None`, return the empty result.
3.  Initialize a deque (double-ended queue) and add the `root` to it.
4.  While the queue is not empty:
    a.  Get the number of nodes at the current level (`level_size`).
    b.  Initialize an empty list for nodes at the `current_level_nodes`.
    c.  For `_` in range(`level_size`):
        i.  Dequeue a node.
        ii. Add its value to `current_level_nodes`.
        iii. Enqueue its left child (if exists).
        iv. Enqueue its right child (if exists).
    d.  Add `current_level_nodes` to the overall result.

**Example Walkthrough:**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
| Queue | `current_level_nodes` | Result            | Action                               |
| :---- | :-------------------- | :---------------- | :----------------------------------- |
| [1]   | []                    | []                | Add 1                                |
| []    | [1]                   | [[1]]             | Pop 1. Add 1. Add 2, 3. `level_size=1`. |
| [2, 3]| []                    | [[1]]             | `level_size=2`. Pop 2. Add 2. Add 4, 5. Pop 3. Add 3. Add 6, 7. |
| [4, 5, 6, 7]| [2, 3]              | [[1], [2, 3]]     | `level_size=4`. Pop 4. Add 4. No children. Pop 5. Add 5. No children. Pop 6. Add 6. No children. Pop 7. Add 7. No children. |
| []    | [4, 5, 6, 7]          | [[1], [2, 3], [4, 5, 6, 7]]| `level_size=0`. Queue empty. Loop ends. |

**Result:** `[[1], [2, 3], [4, 5, 6, 7]]`

**Complexity:**
*   **Time:** O(N). Each node is enqueued and dequeued once.
*   **Space:** O(W), where W is the maximum width of the tree. In a complete binary tree, W can be up to N/2, so O(N).

### 3.2 Zigzag Level Order Traversal

**Order:** Alternates between left-to-right and right-to-left for each level.

**Algorithm:**
1.  Similar to regular Level Order Traversal, using a deque.
2.  Maintain a `left_to_right` boolean flag, initialized to `True`.
3.  For each level:
    a.  Collect nodes for the current level into a `current_level_nodes` list.
    b.  If `left_to_right` is `True`, append nodes as collected.
    c.  If `left_to_right` is `False`, reverse `current_level_nodes` before appending to the result.
    d.  Toggle `left_to_right` for the next level.

**Example Walkthrough:**
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
Initial: `left_to_right = True`

| Queue | `current_level_nodes` | Result            | Action                                                                                                 |
| :---- | :-------------------- | :---------------- | :----------------------------------------------------------------------------------------------------- |
| [1]   | []                    | []                | Add 1                                                                                                  |
| []    | [1]                   | [[1]]             | Pop 1. Add 1. Add 2, 3. `level_size=1`. `left_to_right` is True. Toggle `left_to_right` to False.         |
| [2, 3]| []                    | [[1]]             | `level_size=2`. `left_to_right` is False. Pop 2. Add 2. Add 4, 5. Pop 3. Add 3. Add 6, 7.                 |
| [4, 5, 6, 7]| [2, 3]              | [[1], [3, 2]]     | Reverse `[2, 3]` to `[3, 2]`. Add to result. Toggle `left_to_right` to True.                               |
| []    | [4, 5, 6, 7]          | [[1], [3, 2], [4, 5, 6, 7]]| `level_size=0`. `left_to_right` is True. Add `[4, 5, 6, 7]`. Toggle to False. Queue empty. Loop ends. |

**Result:** `[[1], [3, 2], [4, 5, 6, 7]]`

**Complexity:**
*   **Time:** O(N). The `reverse()` operation for each level with `k` nodes takes O(k), total still O(N).
*   **Space:** O(W) for the queue and current level list.

## 4. Applications of Traversals

Traversals are fundamental operations that underpin many other tree algorithms.

### 4.1 Validate Binary Search Tree

**Problem:** Determine if a binary tree is a valid Binary Search Tree (BST).
**BST Properties:**
*   The left subtree of a node contains only nodes with keys less than the node's key.
*   The right subtree of a node contains only nodes with keys greater than the node's key.
*   Both the left and right subtrees must also be BSTs.
*   (Some definitions allow equality for left/right children, but strict BST often requires strictly less/greater.) This project's implementation assumes **strict inequality**.

#### 4.1.1 Recursive with Bounds

The most robust way to validate a BST. Simply checking `node.left.val < node.val < node.right.val` locally is insufficient, as it doesn't propagate the full range constraints down the tree (e.g., a node in the right subtree must be greater than its grandparent, not just its parent).

**Algorithm:**
1.  Define a helper function `_is_valid(node, min_val, max_val)`.
2.  Base case: If `node` is `None`, it's a valid BST subtree, return `True`.
3.  Check current node's value:
    If `node.val <= min_val` or `node.val >= max_val`, it violates BST property, return `False`.
    (Initial bounds are `float('-inf')` and `float('inf')`.)
4.  Recursively check left subtree: `_is_valid(node.left, min_val, node.val)`
    (Left child must be `> min_val` and `< node.val`).
5.  Recursively check right subtree: `_is_valid(node.right, node.val, max_val)`
    (Right child must be `> node.val` and `< max_val`).
6.  If both recursive calls return `True`, then current subtree is valid.

**Complexity:**
*   **Time:** O(N). Each node visited once.
*   **Space:** O(H) for the recursion stack.

#### 4.1.2 Iterative Inorder

This approach leverages the property that an inorder traversal of a BST yields elements in strictly increasing order.

**Algorithm:**
1.  Perform an iterative inorder traversal (similar to `inorder_iterative`).
2.  Keep track of the `prev_val` (the value of the previously visited node).
3.  Initialize `prev_val` to `float('-inf')`.
4.  During traversal, when a node is visited (popped from stack):
    a.  If `node.val <= prev_val`, it violates the strictly increasing property, return `False`.
    b.  Update `prev_val = node.val`.
5.  If the entire traversal completes without violation, return `True`.

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(H) for the stack.

### 4.2 All Paths from Root to Leaf

**Problem:** Given the `root` of a binary tree, return all root-to-leaf paths. Each path should be represented as a list of node values.

This is a classic DFS problem involving backtracking.

#### 4.2.1 Recursive DFS with Backtracking

**Algorithm:**
1.  Initialize an empty list `all_paths` to store results.
2.  Define a recursive helper function `_dfs(node, current_path)`:
    a.  Base case: If `node` is `None`, return.
    b.  Add `node.val` to `current_path`.
    c.  If `node` is a leaf (i.e., `node.left` is `None` AND `node.right` is `None`):
        Append a **copy** of `current_path` to `all_paths`.
    d.  Recursively call `_dfs(node.left, current_path)`.
    e.  Recursively call `_dfs(node.right, current_path)`.
    f.  **Backtrack**: Remove `node.val` from `current_path` (to explore other branches).

**Example Walkthrough:**
```
      1
     / \
    2   3
     \
      5
```
`all_paths = []`, `current_path = []`

`_dfs(1, [])`
  `current_path = [1]`
  `_dfs(2, [1])`
    `current_path = [1, 2]`
    `_dfs(None, [1, 2])` -> returns
    `_dfs(5, [1, 2])`
      `current_path = [1, 2, 5]`
      Is 5 a leaf? Yes. `all_paths.append([1, 2, 5])`
      `_dfs(None, [1, 2, 5])` -> returns
      `_dfs(None, [1, 2, 5])` -> returns
      `current_path.pop()` (removes 5) -> `current_path = [1, 2]`
    Returns from `_dfs(5)`
    `current_path.pop()` (removes 2) -> `current_path = [1]`
  Returns from `_dfs(2)`
  `_dfs(3, [1])`
    `current_path = [1, 3]`
    Is 3 a leaf? Yes. `all_paths.append([1, 3])`
    `_dfs(None, [1, 3])` -> returns
    `_dfs(None, [1, 3])` -> returns
    `current_path.pop()` (removes 3) -> `current_path = [1]`
  Returns from `_dfs(3)`
  `current_path.pop()` (removes 1) -> `current_path = []`
Returns from `_dfs(1)`

**Result:** `[[1, 2, 5], [1, 3]]` (order may vary, but content will be same)

**Complexity:**
*   **Time:** O(N). Each node is visited once. Building paths contributes to `L*H` where L is number of leaves and H is height. Overall, it's typically considered O(N) or O(N*H) for deep trees if paths are copied. If paths are constructed by appending/popping, it's efficient.
*   **Space:** O(H) for the recursion stack and `current_path`.

#### 4.2.2 Iterative DFS

**Algorithm (using a stack):**
1.  Initialize `all_paths` list.
2.  If root is `None`, return `all_paths`.
3.  Initialize a stack, push a tuple `(root, [root.val])` onto it.
    Each stack item stores `(node, current_path_list)`.
4.  While stack is not empty:
    a.  Pop `(node, current_path)` from stack.
    b.  If `node` is a leaf:
        Append `current_path` to `all_paths`.
    c.  If `node.right` exists:
        Push `(node.right, current_path + [node.right.val])` onto stack.
    d.  If `node.left` exists:
        Push `(node.left, current_path + [node.left.val])` onto stack.
        (Push right first so left is processed earlier, similar to preorder iterative).

**Complexity:**
*   **Time:** O(N*H) in worst case (skewed tree), where H is height. Creating new path lists `current_path + [node.val]` can be O(H) for each push onto stack.
*   **Space:** O(N*H) in worst case (skewed tree), as stack can store multiple paths. Each path is O(H) length. Total space is sum of path lengths on stack. This is generally less efficient in space than recursive for this problem due to explicit path copying.

## 5. Memory-Efficient Traversal (Bonus)

### 5.1 Morris Traversal (Inorder & Preorder)

Morris Traversal is an advanced algorithm that allows for tree traversals (Inorder and Preorder) with O(1) auxiliary space complexity. It achieves this by temporarily modifying the tree structure by creating "threaded" links (connecting a node's predecessor to itself) and then restoring the original structure.

**Key Idea:**
When traversing to the left child, we need a way to return to the parent node without using a stack. Morris traversal achieves this by finding the inorder predecessor of the current node in its left subtree. If this predecessor's right child is `None`, we link it to the current node. This link acts as a "thread" to return to the current node after processing its left subtree. If the predecessor's right child already points back to the current node, it means the left subtree has been fully traversed, so we can cut the thread and move on.

#### Example Threading:
Consider:
```
    A
   / \
  B   C
 / \
D   E
```
Predecessor of A is E.
Predecessor of B is D.

When at `A`, we go to `A.left` (`B`). Before that, we'd like to find `B`'s inorder predecessor and link it to `A`. `B`'s predecessor is `D.right` (which is `E` if `E` is present, or `B` itself if `D` has no children). Actually, it's the rightmost node of the left subtree. For `A`, the predecessor is `E`. We'd link `E.right` to `A`.

```
        A
       / \
      B   C
     / \
    D   E
         \
          A  <-- Temporary thread
```
Once `A`'s left subtree (B, D, E) is processed, we follow `E.right` back to `A`.

#### Morris Inorder Traversal

**Algorithm:**
1.  Initialize `current` node to `root`.
2.  While `current` is not `None`:
    a.  If `current.left` is `None`:
        This node has no left child, so it is the next node in inorder sequence.
        Add `current.val` to result.
        Move `current` to its right child.
    b.  Else (`current.left` exists):
        Find the rightmost node in the left subtree (predecessor of `current`).
        `predecessor = current.left`
        While `predecessor.right` is not `None` AND `predecessor.right` is not `current`:
            `predecessor = predecessor.right`

        i.  If `predecessor.right` is `None` (first time visiting `current`'s left subtree):
            Establish a temporary link: `predecessor.right = current`.
            Move `current` to its left child.
        ii. If `predecessor.right` is `current` (second time visiting `current`'s left subtree):
            The left subtree has been fully processed, and we're returning to `current`.
            Remove the temporary link: `predecessor.right = None`.
            Add `current.val` to result (now `current` is visited after its left subtree).
            Move `current` to its right child.

**Complexity:**
*   **Time:** O(N). Each edge is traversed at most twice (once to create the thread, once to remove it).
*   **Space:** O(1) auxiliary space.

#### Morris Preorder Traversal

**Algorithm:**
1.  Initialize `current` node to `root`.
2.  While `current` is not `None`:
    a.  If `current.left` is `None`:
        Add `current.val` to result (Root is visited).
        Move `current` to its right child.
    b.  Else (`current.left` exists):
        Find the rightmost node in the left subtree (predecessor of `current`).
        `predecessor = current.left`
        While `predecessor.right` is not `None` AND `predecessor.right` is not `current`:
            `predecessor = predecessor.right`

        i.  If `predecessor.right` is `None` (first time visiting `current`'s left subtree):
            Add `current.val` to result (Root is visited, as this is preorder).
            Establish a temporary link: `predecessor.right = current`.
            Move `current` to its left child.
        ii. If `predecessor.right` is `current` (second time visiting `current`'s left subtree):
            The left subtree has been fully processed.
            Remove the temporary link: `predecessor.right = None`.
            Move `current` to its right child (no visit here, as it was visited in step i).

**Complexity:**
*   **Time:** O(N).
*   **Space:** O(1) auxiliary space.

---
This concludes the detailed algorithm explanations. Refer to `src/traversals.py` and `src/morris_traversal.py` for Python implementations.