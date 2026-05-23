# Tree Traversal Diagrams (ASCII Art)

This document provides visual representations of a sample binary tree and illustrates how different traversal algorithms navigate it.

---

## Sample Binary Tree Structure

Let's consider the following binary tree:

```
        3
       / \
      9  20
         / \
        15  7
```

*   Root: 3
*   Left child of 3: 9
*   Right child of 3: 20
*   Left child of 20: 15
*   Right child of 20: 7
*   9, 15, 7 are leaf nodes.

---

## 1. Inorder Traversal (Left -> Root -> Right)

**Path:** Start from Root (3), go Left (9). 9 is a leaf.
   -> Visit 9.
   -> Go back to 3, visit 3.
   -> Go Right (20) from 3.
   -> From 20, go Left (15). 15 is a leaf.
   -> Visit 15.
   -> Go back to 20, visit 20.
   -> Go Right (7) from 20. 7 is a leaf.
   -> Visit 7.

**Sequence:** `[9, 3, 15, 20, 7]`

```
        3
       / \
      9  20
         / \
        15  7

Traversal Order:
1.  Go left from 3 to 9. (Current path: [3, 9])
    9 has no left child.
2.  Visit 9. (Result: [9])
3.  9 has no right child. Pop 9.
4.  Current node is 3. Visit 3. (Result: [9, 3])
5.  Go right from 3 to 20. (Current path: [3, 20])
6.  Go left from 20 to 15. (Current path: [3, 20, 15])
    15 has no left child.
7.  Visit 15. (Result: [9, 3, 15])
8.  15 has no right child. Pop 15.
9.  Current node is 20. Visit 20. (Result: [9, 3, 15, 20])
10. Go right from 20 to 7. (Current path: [3, 20, 7])
    7 has no left child.
11. Visit 7. (Result: [9, 3, 15, 20, 7])
12. 7 has no right child. Pop 7.
13. Pop 20. Pop 3. End.
```

---

## 2. Preorder Traversal (Root -> Left -> Right)

**Path:** Start from Root (3), visit 3.
   -> Go Left (9). 9 is a leaf.
   -> Visit 9.
   -> Go back to 3, Left is done.
   -> Go Right (20) from 3.
   -> From 20, visit 20.
   -> Go Left (15) from 20. 15 is a leaf.
   -> Visit 15.
   -> Go back to 20, Left is done.
   -> Go Right (7) from 20. 7 is a leaf.
   -> Visit 7.

**Sequence:** `[3, 9, 20, 15, 7]`

```
        3
       / \
      9  20
         / \
        15  7

Traversal Order:
1.  Visit 3. (Result: [3])
2.  Go left from 3 to 9.
3.  Visit 9. (Result: [3, 9])
4.  9 has no left/right children. Backtrack.
5.  Current node is 3. Left subtree done.
6.  Go right from 3 to 20.
7.  Visit 20. (Result: [3, 9, 20])
8.  Go left from 20 to 15.
9.  Visit 15. (Result: [3, 9, 20, 15])
10. 15 has no left/right children. Backtrack.
11. Current node is 20. Left subtree done.
12. Go right from 20 to 7.
13. Visit 7. (Result: [3, 9, 20, 15, 7])
14. 7 has no left/right children. Backtrack.
15. Backtrack from 20. Backtrack from 3. End.
```

---

## 3. Postorder Traversal (Left -> Right -> Root)

**Path:** Start from Root (3), go Left (9). 9 is a leaf.
   -> Visit 9.
   -> Go back to 3. Left is done.
   -> Go Right (20) from 3.
   -> From 20, go Left (15). 15 is a leaf.
   -> Visit 15.
   -> Go back to 20. Left is done.
   -> Go Right (7) from 20. 7 is a leaf.
   -> Visit 7.
   -> Go back to 20. Right is done.
   -> Visit 20.
   -> Go back to 3. Right is done.
   -> Visit 3.

**Sequence:** `[9, 15, 7, 20, 3]`

```
        3
       / \
      9  20
         / \
        15  7

Traversal Order:
1.  Go left from 3 to 9.
    9 has no left/right children.
2.  Visit 9. (Result: [9])
3.  Backtrack to 3. Left subtree done for 3.
4.  Go right from 3 to 20.
5.  Go left from 20 to 15.
    15 has no left/right children.
6.  Visit 15. (Result: [9, 15])
7.  Backtrack to 20. Left subtree done for 20.
8.  Go right from 20 to 7.
    7 has no left/right children.
9.  Visit 7. (Result: [9, 15, 7])
10. Backtrack to 20. Right subtree done for 20.
11. Visit 20. (Result: [9, 15, 7, 20])
12. Backtrack to 3. Right subtree done for 3.
13. Visit 3. (Result: [9, 15, 7, 20, 3])
14. End.
```

---

## 4. Level Order Traversal (BFS)

**Path:** Visit all nodes at Level 0, then Level 1, then Level 2, etc. From left to right within each level.

**Sequence:**
*   Level 0: `[3]`
*   Level 1: `[9, 20]`
*   Level 2: `[15, 7]`

**Result:** `[[3], [9, 20], [15, 7]]`

```
        3    <- Level 0
       / \
      9  20  <- Level 1
         / \
        15  7  <- Level 2

Traversal Order:
1.  Queue: [3]
2.  Dequeue 3. Add 3 to Level 0 list. Enqueue 9, 20.
    Level 0: [3]
    Queue: [9, 20]
3.  Dequeue 9. Add 9 to Level 1 list. Enqueue nothing (9 has no children).
    Dequeue 20. Add 20 to Level 1 list. Enqueue 15, 7.
    Level 1: [9, 20]
    Queue: [15, 7]
4.  Dequeue 15. Add 15 to Level 2 list. Enqueue nothing.
    Dequeue 7. Add 7 to Level 2 list. Enqueue nothing.
    Level 2: [15, 7]
    Queue: []
5.  All levels processed.
```

---

## 5. Zigzag Level Order Traversal

**Path:** Similar to Level Order, but alternate direction for each level.

*   Level 0 (L->R): `[3]`
*   Level 1 (R->L): `[20, 9]`
*   Level 2 (L->R): `[15, 7]`

**Result:** `[[3], [20, 9], [15, 7]]`

```
        3    <- Level 0 (L->R)
       / \
      9  20  <- Level 1 (R->L)
         / \
        15  7  <- Level 2 (L->R)

Traversal Order:
1.  Queue: [3]
2.  Dequeue 3. Add 3 to Level 0 list (L->R). Enqueue 9, 20.
    Level 0: [3]
    Queue: [9, 20]
    Direction: R->L for next level.
3.  Dequeue 9. Add 9 to Level 1 list (unshift for R->L: [9]).
    Dequeue 20. Add 20 to Level 1 list (unshift for R->L: [20, 9]). Enqueue 15, 7 (standard order).
    Level 1: [20, 9]
    Queue: [15, 7]
    Direction: L->R for next level.
4.  Dequeue 15. Add 15 to Level 2 list (L->R: [15]).
    Dequeue 7. Add 7 to Level 2 list (L->R: [15, 7]). Enqueue nothing.
    Level 2: [15, 7]
    Queue: []
    Direction: R->L for next level.
5.  All levels processed.
```