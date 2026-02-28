```markdown
# Visual Diagrams for Tree Traversals (ASCII Art)

This document provides ASCII art diagrams to help visualize binary tree structures and the paths taken during different traversal algorithms.

---

## Example Binary Tree Structure

Let's use the following tree for all our examples:

```
        4
       / \
      2   5
     / \
    1   3
```

This tree can be represented in an array format (used by `TreeUtils.buildTree`) as `[4, 2, 5, 1, 3, null, null]`.

---

## 1. Depth-First Search (DFS) Traversals

### A. Inorder Traversal (Left -> Root -> Right)

**Order:**
1.  Go left as far as possible.
2.  Visit the node.
3.  Go right.

**Traversal Path Visualization:**

```
        4
       / \
      2   5
     / \
    1   3

   ↓
   Start at 4. Go Left. Current: 2
   ↓
   Go Left. Current: 1
   ↓
   Go Left. Current: null. Backtrack.
   ↑
   Visit 1. (Output: 1) Current: 1. Go Right. Current: null. Backtrack.
   ↑
   Current: 2. Left subtree done. Visit 2. (Output: 1, 2) Current: 2. Go Right. Current: 3
   ↓
   Go Left. Current: null. Backtrack.
   ↑
   Visit 3. (Output: 1, 2, 3) Current: 3. Go Right. Current: null. Backtrack.
   ↑
   Current: 2. Right subtree done. Backtrack.
   ↑
   Current: 4. Left subtree done. Visit 4. (Output: 1, 2, 3, 4) Current: 4. Go Right. Current: 5
   ↓
   Go Left. Current: null. Backtrack.
   ↑
   Visit 5. (Output: 1, 2, 3, 4, 5) Current: 5. Go Right. Current: null. Backtrack.
   ↑
   Current: 4. Right subtree done. All done.
```

**Final Sequence:** `1, 2, 3, 4, 5`

---

### B. Preorder Traversal (Root -> Left -> Right)

**Order:**
1.  Visit the node.
2.  Go left.
3.  Go right.

**Traversal Path Visualization:**

```
        4
       / \
      2   5
     / \
    1   3

   ↓
   Start at 4. Visit 4. (Output: 4) Go Left. Current: 2
   ↓
   Visit 2. (Output: 4, 2) Go Left. Current: 1
   ↓
   Visit 1. (Output: 4, 2, 1) Go Left. Current: null. Backtrack.
   ↑
   Current: 1. Left done. Go Right. Current: null. Backtrack.
   ↑
   Current: 2. Left done. Go Right. Current: 3
   ↓
   Visit 3. (Output: 4, 2, 1, 3) Go Left. Current: null. Backtrack.
   ↑
   Current: 3. Left done. Go Right. Current: null. Backtrack.
   ↑
   Current: 2. Right done. Backtrack.
   ↑
   Current: 4. Left done. Go Right. Current: 5
   ↓
   Visit 5. (Output: 4, 2, 1, 3, 5) Go Left. Current: null. Backtrack.
   ↑
   Current: 5. Left done. Go Right. Current: null. Backtrack.
   ↑
   Current: 4. Right done. All done.
```

**Final Sequence:** `4, 2, 1, 3, 5`

---

### C. Postorder Traversal (Left -> Right -> Root)

**Order:**
1.  Go left.
2.  Go right.
3.  Visit the node.

**Traversal Path Visualization:**

```
        4
       / \
      2   5
     / \
    1   3

   ↓
   Start at 4. Go Left. Current: 2
   ↓
   Go Left. Current: 1
   ↓
   Go Left. Current: null. Backtrack.
   ↑
   Current: 1. Left done. Go Right. Current: null. Backtrack.
   ↑
   Current: 1. Right done. Visit 1. (Output: 1) Backtrack.
   ↑
   Current: 2. Left done. Go Right. Current: 3
   ↓
   Go Left. Current: null. Backtrack.
   ↑
   Current: 3. Left done. Go Right. Current: null. Backtrack.
   ↑
   Current: 3. Right done. Visit 3. (Output: 1, 3) Backtrack.
   ↑
   Current: 2. Right done. Visit 2. (Output: 1, 3, 2) Backtrack.
   ↑
   Current: 4. Left done. Go Right. Current: 5
   ↓
   Go Left. Current: null. Backtrack.
   ↑
   Current: 5. Left done. Go Right. Current: null. Backtrack.
   ↑
   Current: 5. Right done. Visit 5. (Output: 1, 3, 2, 5) Backtrack.
   ↑
   Current: 4. Right done. Visit 4. (Output: 1, 3, 2, 5, 4) All done.
```

**Final Sequence:** `1, 3, 2, 5, 4`

---

## 2. Breadth-First Search (BFS) Traversals

### A. Level Order Traversal

**Order:** Visit nodes level by level, left-to-right.

**Traversal Path Visualization:**

```
        4           (Level 0)
       / \
      2   5         (Level 1)
     / \
    1   3           (Level 2)

Queue: [4]
Output: []

1. Dequeue 4. Add 4 to current level. Enqueue 2, 5.
   Queue: [2, 5]
   Current Level: [4]
   Output: [[4]]

2. Dequeue 2. Add 2 to current level. Enqueue 1, 3.
   Dequeue 5. Add 5 to current level. (5 has no children in this example)
   Queue: [1, 3]
   Current Level: [2, 5]
   Output: [[4], [2, 5]]

3. Dequeue 1. Add 1 to current level. (1 has no children)
   Dequeue 3. Add 3 to current level. (3 has no children)
   Queue: []
   Current Level: [1, 3]
   Output: [[4], [2, 5], [1, 3]]

Queue is empty. All done.
```

**Final Sequence:** `[[4], [2, 5], [1, 3]]`

---

### B. Zigzag Level Order Traversal

**Order:** Alternating level-by-level traversal (L->R, then R->L, then L->R, etc.)

**Traversal Path Visualization:**

```
        4           (Level 0: L->R)
       / \
      2   5         (Level 1: R->L)
     / \
    1   3           (Level 2: L->R)

Queue: [4]
Output: []
leftToRight = true

1. Dequeue 4. Add 4 to Deque (L->R: addLast). Enqueue 2, 5.
   Queue: [2, 5]
   Deque for current level: [4]
   Output: [[4]]
   leftToRight = false

2. Dequeue 2. Add 2 to Deque (R->L: addFirst). Deque: [2]
   Dequeue 5. Add 5 to Deque (R->L: addFirst). Deque: [5, 2]
   Enqueue 1, 3 (from 2).
   Queue: [1, 3]
   Current Level: [5, 2]
   Output: [[4], [5, 2]]
   leftToRight = true

3. Dequeue 1. Add 1 to Deque (L->R: addLast). Deque: [1]
   Dequeue 3. Add 3 to Deque (L->R: addLast). Deque: [1, 3]
   (1 and 3 have no children)
   Queue: []
   Current Level: [1, 3]
   Output: [[4], [5, 2], [1, 3]]

Queue is empty. All done.
```

**Final Sequence:** `[[4], [5, 2], [1, 3]]`

---

These diagrams should provide a clear visual understanding of how each traversal method explores a binary tree.
```