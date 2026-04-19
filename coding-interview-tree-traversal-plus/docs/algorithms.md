# Tree Traversal Algorithms: Explanations and Diagrams

This document provides a detailed explanation of fundamental tree traversal algorithms, including their concepts, time/space complexity, and ASCII art diagrams for visualization.

## Table of Contents

1.  [Introduction to Tree Traversals](#introduction-to-tree-traversals)
2.  [Depth-First Search (DFS) Traversals](#depth-first-search-dfs-traversals)
    *   [Inorder Traversal](#inorder-traversal)
    *   [Preorder Traversal](#preorder-traversal)
    *   [Postorder Traversal](#postorder-traversal)
3.  [Breadth-First Search (BFS) Traversal](#breadth-first-search-bfs-traversal)
    *   [Level Order Traversal](#level-order-traversal)
    *   [Zigzag Level Order Traversal](#zigzag-level-order-traversal)
4.  [Advanced Traversal: Morris Traversal](#advanced-traversal-morris-traversal)
5.  [Common Problem Applications](#common-problem-applications)
6.  [Complexity Analysis Summary](#complexity-analysis-summary)

---

## 1. Introduction to Tree Traversals

Tree traversal refers to the process of visiting (checking and/or updating) each node in a tree data structure exactly once. The order in which nodes are visited defines the type of traversal. There are two main categories:

*   **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking. This includes Inorder, Preorder, and Postorder traversals.
*   **Breadth-First Search (BFS)**: Explores all the nodes at the present depth level before moving on to nodes at the next depth level. This is commonly known as Level Order traversal.

---

## 2. Depth-First Search (DFS) Traversals

DFS traversals typically use recursion (which implicitly uses the call stack) or an explicit stack for iterative implementations.

### Inorder Traversal

**Order:** Left -> Root -> Right

**Concept:** Visit the left child, then the current node, then the right child.
**Use Cases:** For a Binary Search Tree (BST), inorder traversal retrieves elements in non-decreasing (sorted) order. Also useful for "flattening" a tree into a sorted list.

**Diagram:**

```
        A
       / \
      B   C
     / \
    D   E

Inorder Traversal: D -> B -> E -> A -> C
```

**Step-by-step example:**

1.  Start at `A`.
2.  Go Left to `B`.
3.  Go Left to `D`.
4.  `D` has no children. Visit `D`. Output: `[D]`
5.  Backtrack to `B`. Visit `B`. Output: `[D, B]`
6.  Go Right from `B` to `E`.
7.  `E` has no children. Visit `E`. Output: `[D, B, E]`
8.  Backtrack to `A`. Visit `A`. Output: `[D, B, E, A]`
9.  Go Right from `A` to `C`.
10. `C` has no children. Visit `C`. Output: `[D, B, E, A, C]`

**Time Complexity:** O(N), where N is the number of nodes, as each node is visited once.
**Space Complexity:** O(H) for recursion stack or explicit stack, where H is the height of the tree. In the worst case (skewed tree), H can be N, so O(N). In the best case (balanced tree), H is logN, so O(logN).

### Preorder Traversal

**Order:** Root -> Left -> Right

**Concept:** Visit the current node, then its left child, then its right child.
**Use Cases:** Creating a copy of the tree, serializing/deserializing a tree, representing directory structures.

**Diagram:**

```
        A
       / \
      B   C
     / \
    D   E

Preorder Traversal: A -> B -> D -> E -> C
```

**Step-by-step example:**

1.  Start at `A`. Visit `A`. Output: `[A]`
2.  Go Left to `B`. Visit `B`. Output: `[A, B]`
3.  Go Left to `D`. Visit `D`. Output: `[A, B, D]`
4.  `D` has no children. Backtrack to `B`.
5.  Go Right from `B` to `E`. Visit `E`. Output: `[A, B, D, E]`
6.  `E` has no children. Backtrack to `A`.
7.  Go Right from `A` to `C`. Visit `C`. Output: `[A, B, D, E, C]`
8.  `C` has no children. Traversal complete.

**Time Complexity:** O(N)
**Space Complexity:** O(H)

### Postorder Traversal

**Order:** Left -> Right -> Root

**Concept:** Visit the left child, then the right child, then the current node.
**Use Cases:** Deleting a tree (children must be deleted before parent), evaluating expression trees.

**Diagram:**

```
        A
       / \
      B   C
     / \
    D   E

Postorder Traversal: D -> E -> B -> C -> A
```

**Step-by-step example:**

1.  Start at `A`.
2.  Go Left to `B`.
3.  Go Left to `D`.
4.  `D` has no children. Visit `D`. Output: `[D]`
5.  Backtrack to `B`.
6.  Go Right from `B` to `E`.
7.  `E` has no children. Visit `E`. Output: `[D, E]`
8.  Backtrack to `B`. All children visited. Visit `B`. Output: `[D, E, B]`
9.  Backtrack to `A`.
10. Go Right from `A` to `C`.
11. `C` has no children. Visit `C`. Output: `[D, E, B, C]`
12. Backtrack to `A`. All children visited. Visit `A`. Output: `[D, E, B, C, A]`

**Time Complexity:** O(N)
**Space Complexity:** O(H)

---

## 3. Breadth-First Search (BFS) Traversal

BFS traversals typically use a queue to manage node visits, ensuring all nodes at a given level are processed before moving to the next level.

### Level Order Traversal

**Order:** Level by level, from left to right within each level.

**Concept:** Process all nodes at depth `d` before processing any nodes at depth `d+1`.
**Use Cases:** Finding the shortest path in an unweighted tree, connecting nodes at the same level (e.g., "next right pointer").

**Diagram:**

```
        A (Level 0)
       / \
      B   C (Level 1)
     / \   / \
    D   E F   G (Level 2)

Level Order Traversal: [[A], [B, C], [D, E, F, G]]
```

**Step-by-step example:**

1.  Initialize queue with `A`. `queue = [A]`, `result = []`
2.  **Level 0:**
    *   Dequeue `A`. `currentLevel = [A.val]`
    *   Enqueue `A`'s children `B`, `C`. `queue = [B, C]`
    *   Add `currentLevel` to `result`. `result = [[A.val]]`
3.  **Level 1:**
    *   Dequeue `B`. `currentLevel = [B.val]`
    *   Enqueue `B`'s children `D`, `E`. `queue = [C, D, E]`
    *   Dequeue `C`. `currentLevel = [B.val, C.val]`
    *   Enqueue `C`'s children `F`, `G`. `queue = [D, E, F, G]`
    *   Add `currentLevel` to `result`. `result = [[A.val], [B.val, C.val]]`
4.  **Level 2:**
    *   Dequeue `D`. `currentLevel = [D.val]`. Enqueue no children. `queue = [E, F, G]`
    *   Dequeue `E`. `currentLevel = [D.val, E.val]`. Enqueue no children. `queue = [F, G]`
    *   Dequeue `F`. `currentLevel = [D.val, E.val, F.val]`. Enqueue no children. `queue = [G]`
    *   Dequeue `G`. `currentLevel = [D.val, E.val, F.val, G.val]`. Enqueue no children. `queue = []`
    *   Add `currentLevel` to `result`. `result = [[A.val], [B.val, C.val], [D.val, E.val, F.val, G.val]]`
5.  Queue is empty. Traversal complete.

**Time Complexity:** O(N)
**Space Complexity:** O(W), where W is the maximum width of the tree. In the worst case (a complete binary tree), the last level can hold N/2 nodes, so O(N).

### Zigzag Level Order Traversal

**Order:** Alternating left-to-right and right-to-left for each level.

**Concept:** A variation of level order where the direction of traversal switches for successive levels.
**Use Cases:** Specific display requirements, interesting algorithmic puzzle.

**Diagram:**

```
        A (Level 0: L->R)
       / \
      B   C (Level 1: R->L)
     / \   / \
    D   E F   G (Level 2: L->R)

Zigzag Level Order: [[A], [C, B], [D, E, F, G]]
```

**Step-by-step example:**

Similar to Level Order, but for each level, if `isLeftToRight` is false, reverse the `currentLevel` array before adding it to `result`.

1.  Initialize queue with `A`. `queue = [A]`, `result = []`, `isLeftToRight = true`
2.  **Level 0 (L->R):**
    *   Dequeue `A`. `currentLevel = [A.val]`
    *   Enqueue `B`, `C`. `queue = [B, C]`
    *   `isLeftToRight` is true, no reverse. `result = [[A.val]]`
    *   Toggle `isLeftToRight` to `false`.
3.  **Level 1 (R->L):**
    *   Dequeue `B`. `currentLevel = [B.val]`
    *   Enqueue `D`, `E`. `queue = [C, D, E]`
    *   Dequeue `C`. `currentLevel = [B.val, C.val]`
    *   Enqueue `F`, `G`. `queue = [D, E, F, G]`
    *   `isLeftToRight` is false, reverse `currentLevel`. `[B.val, C.val]` becomes `[C.val, B.val]`
    *   Add `currentLevel` to `result`. `result = [[A.val], [C.val, B.val]]`
    *   Toggle `isLeftToRight` to `true`.
4.  **Level 2 (L->R):**
    *   Dequeue `D`, `E`, `F`, `G` in order. `currentLevel = [D.val, E.val, F.val, G.val]`
    *   Enqueue no children. `queue = []`
    *   `isLeftToRight` is true, no reverse.
    *   Add `currentLevel` to `result`. `result = [[A.val], [C.val, B.val], [D.val, E.val, F.val, G.val]]`
    *   Toggle `isLeftToRight` to `false`.
5.  Queue is empty. Traversal complete.

**Time Complexity:** O(N) (due to array reversal per level, sum of lengths of levels is N).
**Space Complexity:** O(W)

---

## 4. Advanced Traversal: Morris Traversal

Morris Traversal is an advanced technique for inorder traversal that uses O(1) auxiliary space (excluding the output list). It achieves this by modifying the tree structure during traversal, creating temporary "threads" to link nodes to their inorder predecessors. After visiting, these threads are removed to restore the original tree.

**Concept:**
It works by:
1.  If the current node has no left child, visit it and move to its right child.
2.  If the current node has a left child:
    *   Find its inorder predecessor (rightmost node in its left subtree).
    *   If the predecessor's right child is null, set `predecessor.right = current` (create a thread) and move `current = current.left`.
    *   If the predecessor's right child is `current` (meaning we've already visited the left subtree and returned), visit `current`, remove the thread (`predecessor.right = null`), and move `current = current.right`.

**Diagram (Conceptual):**

```
Initial Tree:
        A
       / \
      B   C

During traversal, before B's left subtree is finished:
        A
       / \
      B---C  (temporary thread from B's rightmost left descendant to B itself)
     / \
    D   E

After D and E are processed, B is visited, then thread removed, then current moves to C.
```

**Time Complexity:** O(N). Although there are nested loops, each edge is traversed at most a constant number of times (twice for threads creation/deletion).
**Space Complexity:** O(1) auxiliary space.

---

## 5. Common Problem Applications

Tree traversals are fundamental to solving many tree-related problems:

*   **Finding Max/Min Depth/Height**: Both DFS and BFS can be used. DFS (recursive) is often simpler.
*   **Checking if a tree is balanced**: Inorder traversal can help ensure sorted order for BSTs; postorder can gather subtree heights.
*   **Checking if two trees are identical**: Recursive traversals comparing nodes.
*   **Converting a tree to a linked list**: Inorder traversal for sorted lists, preorder for a specific ordering.
*   **Constructing a tree from traversals**: Often requires two traversals (e.g., inorder and preorder/postorder).
*   **Serializing/Deserializing a tree**: Preorder or level order are common for this.
*   **Finding paths with a given sum**: DFS with path tracking or optimized with prefix sums (as seen in Path Sum III).
*   **Views of a tree (Left, Right, Top, Bottom View)**: Often involves level order traversal combined with specific logic to track visible nodes.

---

## 6. Complexity Analysis Summary

| Traversal Type      | Time Complexity (Worst/Average) | Space Complexity (Worst Case) | Notes                                           |
| :------------------ | :------------------------------ | :---------------------------- | :---------------------------------------------- |
| **Inorder (Rec)**   | O(N)                            | O(H) (up to O(N))             | H is tree height                                |
| **Inorder (Iter)**  | O(N)                            | O(H) (up to O(N))             | Uses explicit stack                             |
| **Inorder (Morris)**| O(N)                            | O(1)                          | Modifies tree structure temporarily             |
| **Preorder (Rec)**  | O(N)                            | O(H) (up to O(N))             | H is tree height                                |
| **Preorder (Iter)** | O(N)                            | O(H) (up to O(N))             | Uses explicit stack                             |
| **Postorder (Rec)** | O(N)                            | O(H) (up to O(N))             | H is tree height                                |
| **Postorder (Iter)**| O(N)                            | O(N) (Two stacks)             | Simpler iterative postorder                     |
| **Postorder (Iter)**| O(N)                            | O(H) (up to O(N)) (One stack) | More complex iterative postorder                |
| **Level Order (BFS)**| O(N)                            | O(W) (up to O(N))             | W is max width of tree; uses queue              |
| **Zigzag Level Order**| O(N)                            | O(W) (up to O(N))             | Variation of BFS, involves array reversal       |

**N**: Number of nodes in the tree
**H**: Height of the tree (max depth). H can be N in a skewed tree, logN in a balanced tree.
**W**: Maximum width of the tree. W can be N/2 in a complete binary tree.

---