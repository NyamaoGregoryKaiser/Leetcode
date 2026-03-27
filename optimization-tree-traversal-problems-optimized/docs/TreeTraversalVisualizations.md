```markdown
# Tree Traversal Visualizations (ASCII Art)

This document provides visual representations of binary trees and their traversal paths using ASCII art.

---

## Basic Tree Structure

Let's use a common example tree for our visualizations:

```
        1
       / \
      2   3
     / \
    4   5
```

Represented as an array for `TreeUtils.buildTreeFromArray`: `[1, 2, 3, 4, 5, null, null]`

---

## 1. Standard Traversals

### Preorder Traversal (Root -> Left -> Right)

Visit the root, then its left subtree, then its right subtree.

```
Traversal path:
(1) -> (2) -> (4) -> (5) -> (3)

Steps:
1. Visit 1
2. Go Left to 2
3. Visit 2
4. Go Left to 4
5. Visit 4 (4 has no children, go up)
6. Go up to 2, Right to 5
7. Visit 5 (5 has no children, go up)
8. Go up to 2 (left subtree of 1 complete), go up to 1, Right to 3
9. Visit 3 (3 has no children, go up)

Result: [1, 2, 4, 5, 3]
```

### Inorder Traversal (Left -> Root -> Right)

Visit the left subtree, then the root, then the right subtree. For a BST, this yields sorted order.

```
Traversal path:
(4) -> (2) -> (5) -> (1) -> (3)

Steps:
1. Go Left from 1 to 2
2. Go Left from 2 to 4
3. Visit 4 (4 has no left. Right is null. Go up to 2)
4. Visit 2 (left subtree of 2 complete. Right is 5)
5. Go Right from 2 to 5
6. Visit 5 (5 has no children. Go up to 2)
7. Go up to 1 (left subtree of 1 complete. Right is 3)
8. Visit 1 (root of main tree)
9. Go Right from 1 to 3
10. Visit 3 (3 has no children. Go up)

Result: [4, 2, 5, 1, 3]
```

### Postorder Traversal (Left -> Right -> Root)

Visit the left subtree, then the right subtree, then the root.

```
Traversal path:
(4) -> (5) -> (2) -> (3) -> (1)

Steps:
1. Go Left from 1 to 2
2. Go Left from 2 to 4
3. Visit 4 (4 has no children. Go up to 2)
4. Go Right from 2 to 5
5. Visit 5 (5 has no children. Go up to 2)
6. Visit 2 (left and right of 2 complete. Go up to 1)
7. Go Right from 1 to 3
8. Visit 3 (3 has no children. Go up to 1)
9. Visit 1 (left and right of 1 complete)

Result: [4, 5, 2, 3, 1]
```

---

## 2. Level Order Traversal (BFS)

Visit nodes level by level, from left to right within each level.

```
Tree:
        1   (Level 0)
       / \
      2   3 (Level 1)
     / \
    4   5   (Level 2)

Queue (Q):
Initial: [1]
Level 0: Pop 1. Q: []. Add 2, 3. Result: [[1]]
         Q: [2, 3]
Level 1: Pop 2. Q: [3]. Add 4, 5. Result: [[1], [2]]
         Q: [3, 4, 5]
         Pop 3. Q: [4, 5]. Result: [[1], [2, 3]]
         Q: [4, 5]
Level 2: Pop 4. Q: [5]. Result: [[1], [2, 3], [4]]
         Q: [5]
         Pop 5. Q: []. Result: [[1], [2, 3], [4, 5]]
         Q: [] (empty)

Result: [[1], [2, 3], [4, 5]]
```

---

## 3. Zigzag Level Order Traversal

Visit nodes level by level, alternating direction: L->R, R->L, L->R, ...

```
Tree:
        3   (Level 0) L->R
       / \
      9  20 (Level 1) R->L
     / \ / \
    6 10 15 7 (Level 2) L->R

Queue (Q), Current Level List (CLL), Direction (Dir):
Initial: Q: [3], Dir: L->R
Level 0: Pop 3. CLL: [3]. Q: [9, 20]. Result: [[3]]. Dir: R->L
         Q: [9, 20]
Level 1: Pop 9. CLL: [9]. (addFirst for R->L).
         Pop 20. CLL: [20, 9]. (addFirst for R->L)
         Q: [6, 10, 15, 7]. Result: [[3], [20, 9]]. Dir: L->R
         Q: [6, 10, 15, 7]
Level 2: Pop 6. CLL: [6]. (addLast for L->R)
         Pop 10. CLL: [6, 10].
         Pop 15. CLL: [6, 10, 15].
         Pop 7. CLL: [6, 10, 15, 7].
         Q: []. Result: [[3], [20, 9], [6, 10, 15, 7]]. Dir: R->L
         Q: [] (empty)

Result: [[3], [20, 9], [6, 10, 15, 7]]
```

---

## 4. Boundary Traversal

Traverse the boundary counter-clockwise: Left Boundary (no leaves) -> All Leaves (L-R) -> Right Boundary (no leaves, bottom-up).

```
Tree:
          20
         /   \
        8     22
       / \     \
      4   12    25
         /  \
        10  14

Steps:
1. Root: 20. Result: [20]
2. Left Boundary (excluding leaves):
   - From 20, go to 8. Add 8. Result: [20, 8]
   - From 8, go to 4. 4 is a leaf. STOP. (4 will be added as a leaf)
3. All Leaves (L-R):
   - Traverse tree, collect leaves: 4, 10, 14, 25. Result: [20, 8, 4, 10, 14, 25]
4. Right Boundary (excluding leaves, bottom-up):
   - From 20, go to 22. Add 22 to temp list. Temp: [22]
   - From 22, go to 25. 25 is a leaf. STOP. (25 was already added as a leaf)
   - Add nodes from temp list in reverse. Temp: [22] becomes [22].
   - Result: [20, 8, 4, 10, 14, 25, 22]

Final Result: [20, 8, 4, 10, 14, 25, 22]
```

---

## 5. Flatten Binary Tree to Linked List

Transforms the tree in-place into a linked list using the right pointers, in preorder sequence. Left pointers are set to null.

```
Original Tree:
       1
      / \
     2   5
    / \   \
   3   4   6

Flattening Process (conceptual, actual implementation uses reverse preorder):
1. Start at 1. Its right child will be 2.
2. For 2, its right child will be 3.
3. For 3, its right child will be 4.
4. For 4, its right child will be 5.
5. For 5, its right child will be 6.
6. For 6, its right child will be null.

Final Flattened Structure (conceptual, it's still TreeNode objects):
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

---

## 6. Iterative Traversals (Using Stack)

### Iterative Inorder Traversal

```
Tree:
        1
       / \
      2   3
     / \
    4   5

Stack (S), Current (C), Result (R):
Initial: S: [], C: 1, R: []

1. C is 1. Push 1. C = 2. S: [1]
2. C is 2. Push 2. C = 4. S: [1, 2]
3. C is 4. Push 4. C = null. S: [1, 2, 4]
4. C is null. Pop 4. R: [4]. C = 4.right (null). S: [1, 2]
5. C is null. Pop 2. R: [4, 2]. C = 2.right (5). S: [1]
6. C is 5. Push 5. C = null. S: [1, 5]
7. C is null. Pop 5. R: [4, 2, 5]. C = 5.right (null). S: [1]
8. C is null. Pop 1. R: [4, 2, 5, 1]. C = 1.right (3). S: []
9. C is 3. Push 3. C = null. S: [3]
10. C is null. Pop 3. R: [4, 2, 5, 1, 3]. C = 3.right (null). S: []
11. C is null, S is empty. STOP.

Result: [4, 2, 5, 1, 3]
```

---

## 7. Morris Traversal (O(1) Space)

Morris Traversal builds temporary links (threads) to navigate the tree without a stack.

### Morris Inorder Traversal

```
Tree:
        1
       / \
      2   3
     / \
    4   5

Current (C), Predecessor (P), Result (R):
Initial: C: 1, R: []

1. C = 1. Has left child (2).
   Find P for 1: P = 5 (rightmost in 2's subtree).
   P.right (null). Set P.right = 1. (5 -> 1)
   C = C.left (2).
   Tree (conceptual):
           1
          / \
         2   3
        / \
       4   5 --(thread)-> 1

2. C = 2. Has left child (4).
   Find P for 2: P = 4 (rightmost in 4's subtree, which is 4 itself).
   P.right (null). Set P.right = 2. (4 -> 2)
   C = C.left (4).
   Tree:
           1
          / \
         2   3
        / \
       4 --(thread)-> 2
       \
        5 --(thread)-> 1

3. C = 4. No left child.
   Add 4 to R. R: [4]
   C = C.right (2). (Follows thread 4->2)

4. C = 2. Has left child (4).
   Find P for 2: P = 4.
   P.right is 2 (the thread we made).
   Break thread: P.right = null (4's right becomes null again).
   Add 2 to R. R: [4, 2]
   C = C.right (5).
   Tree (threads broken):
           1
          / \
         2   3
        / \
       4   5 --(thread)-> 1

5. C = 5. No left child.
   Add 5 to R. R: [4, 2, 5]
   C = C.right (1). (Follows thread 5->1)

6. C = 1. Has left child (2).
   Find P for 1: P = 5.
   P.right is 1 (the thread we made).
   Break thread: P.right = null (5's right becomes null again).
   Add 1 to R. R: [4, 2, 5, 1]
   C = C.right (3).
   Tree:
           1
          / \
         2   3
        / \
       4   5

7. C = 3. No left child.
   Add 3 to R. R: [4, 2, 5, 1, 3]
   C = C.right (null).

8. C is null. Loop ends.

Result: [4, 2, 5, 1, 3]
```
```
```