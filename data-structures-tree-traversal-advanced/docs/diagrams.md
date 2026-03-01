```markdown
# Tree Traversal Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize various binary tree structures and how different traversal algorithms process them.

---

## I. Basic Tree Structure

A simple binary tree:

```
        A
       / \
      B   C
     / \   \
    D   E   F
```

---

## II. Traversal Paths

Let's use the following example tree for all traversal demonstrations:

```
        1
       / \
      2   3
     / \   \
    4   5   6
       /
      7
```

### A. Inorder Traversal (Left -> Root -> Right)

Visits nodes in the order: `4, 2, 7, 5, 1, 3, 6`

```
Processing order:
        1   (5th visited)
       / \
      2   3   (2nd and 6th visited)
     / \   \
    4   5   6   (1st, 4th and 7th visited)
       /
      7   (3rd visited)

Path visualization (simplified, just indicating order):
(1) 4 <- (2) 2 <- (5) 1 -> (6) 3 -> (7) 6
         -> (3) 7 -> (4) 5
```

### B. Preorder Traversal (Root -> Left -> Right)

Visits nodes in the order: `1, 2, 4, 5, 7, 3, 6`

```
Processing order:
        1   (1st visited)
       / \
      2   3   (2nd and 6th visited)
     / \   \
    4   5   6   (3rd, 4th and 7th visited)
       /
      7   (5th visited)

Path visualization:
(1) 1 -> (2) 2 -> (3) 4
                 -> (4) 5 -> (5) 7
             -> (6) 3 -> (7) 6
```

### C. Postorder Traversal (Left -> Right -> Root)

Visits nodes in the order: `4, 7, 5, 2, 6, 3, 1`

```
Processing order:
        1   (7th visited)
       / \
      2   3   (4th and 6th visited)
     / \   \
    4   5   6   (1st, 3rd and 5th visited)
       /
      7   (2nd visited)

Path visualization:
(4) 1 <- (3) 3 <- (5) 6
       <- (1) 2 <- (2) 4
                 <- (6) 5 <- (7) 7
```

### D. Level Order Traversal (BFS)

Visits nodes level by level: `[[1], [2, 3], [4, 5, 6], [7]]`

```
Level 0:        1   (1st processed)
               / \
Level 1:      2   3   (2nd, 3rd processed)
             / \   \
Level 2:    4   5   6   (4th, 5th, 6th processed)
               /
Level 3:      7   (7th processed)
```

---

## III. Special Tree Structures

### A. Skewed Tree (Right Skewed)

A tree where each node only has a right child.

```
1
 \
  2
   \
    3
     \
      4
```
- **Max Depth**: 4
- **DFS Recursion Stack**: O(N) as all nodes are on one path.

### B. Skewed Tree (Left Skewed)

A tree where each node only has a left child.

```
        4
       /
      3
     /
    2
   /
  1
```
- **Max Depth**: 4
- **DFS Recursion Stack**: O(N) as all nodes are on one path.

### C. Complete Binary Tree (Balanced Example)

A tree where every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```
- **Max Depth**: 3
- **DFS Recursion Stack**: O(logN) (height is logN).
- **BFS Queue Size**: O(N/2) for the last level (O(N)).

---
```