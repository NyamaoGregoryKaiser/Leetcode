# Algorithm Explanation: Tree Traversals

This document provides a detailed explanation of binary tree traversal algorithms implemented in this project. It covers the core concepts, common approaches, visual diagrams, edge cases, and interview considerations.

## Table of Contents

1.  [Introduction to Tree Traversals](#1-introduction-to-tree-traversals)
2.  [Depth-First Search (DFS) Traversals](#2-depth-first-search-dfs-traversals)
    *   [Inorder Traversal](#inorder-traversal)
    *   [Preorder Traversal](#preorder-traversal)
    *   [Postorder Traversal](#postorder-traversal)
3.  [Breadth-First Search (BFS) Traversals](#3-breadth-first-search-bfs-traversals)
    *   [Level Order Traversal](#level-order-traversal)
    *   [Zigzag Level Order Traversal](#zigzag-level-order-traversal)
4.  [Applications of Traversals](#4-applications-of-traversals)
    *   [Validating a Binary Search Tree](#validating-a-binary-search-tree)
    *   [Calculating Maximum Depth](#calculating-maximum-depth)
5.  [Edge Cases and Gotchas](#5-edge-cases-and-gotchas)
6.  [Interview Tips and Variations](#6-interview-tips-and-variations)

---

## 1. Introduction to Tree Traversals

Tree traversal is the process of visiting each node in a tree data structure exactly once in a systematic way. Binary tree traversals are categorized into two main types:

*   **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking.
*   **Breadth-First Search (BFS)**: Explores nodes level by level, horizontally before vertically.

### Common Tree Structure (Example)

Let's use the following tree as a running example:

```
        10
       /  \
      5    15
     / \    /
    3   7  12
```

## 2. Depth-First Search (DFS) Traversals

DFS traversals prioritize depth. There are three primary ways to perform a DFS traversal in a binary tree, distinguished by the order in which the root node is visited relative to its left and right children:

1.  **Inorder Traversal (Left -> Root -> Right)**
2.  **Preorder Traversal (Root -> Left -> Right)**
3.  **Postorder Traversal (Left -> Right -> Root)**

Each of these can be implemented recursively (often simpler) or iteratively (using an explicit stack).

### Inorder Traversal

*   **Order**: Visit the **left** subtree, then the **root** node, then the **right** subtree.
*   **Property**: For a Binary Search Tree (BST), an inorder traversal yields nodes in non-decreasing (sorted) order.
*   **Use Cases**:
    *   Retrieving elements of a BST in sorted order.
    *   For `Problem4_ValidateBST.ts`, it's used to check the BST property.

#### Recursive Approach (`inorderTraversalRecursive`)

```
inorder(node):
  if node is null: return
  inorder(node.left)
  visit(node)
  inorder(node.right)
```

**Example Walkthrough for `inorderTraversalRecursive(root=10)`:**

```
Call Stack Trace:
1. inorder(10)
   2. inorder(5)
      3. inorder(3)
         4. inorder(null) -> return
         Visit 3 -> [3]
         5. inorder(null) -> return
      Visit 5 -> [3, 5]
      6. inorder(7)
         7. inorder(null) -> return
         Visit 7 -> [3, 5, 7]
         8. inorder(null) -> return
   Visit 10 -> [3, 5, 7, 10]
   9. inorder(15)
      10. inorder(12)
          11. inorder(null) -> return
          Visit 12 -> [3, 5, 7, 10, 12]
          12. inorder(null) -> return
      Visit 15 -> [3, 5, 7, 10, 12, 15]
      13. inorder(null) -> return
```

**Result**: `[3, 5, 7, 10, 12, 15]`

#### Iterative Approach (`inorderTraversalIterative`)

Uses an explicit stack to simulate the recursion. The core idea is to go left as far as possible, pushing nodes onto the stack. Once a null is hit, pop a node, visit it, and then go right.

**Example Walkthrough for `inorderTraversalIterative(root=10)`:**

| `current` | `stack`       | `result` | Action                                       |
| :-------- | :------------ | :------- | :------------------------------------------- |
| 10        | `[]`          | `[]`     | Initialize                                   |
| 10        | `[10]`        | `[]`     | `current=10`, push 10, `current=5`           |
| 5         | `[10, 5]`     | `[]`     | `current=5`, push 5, `current=3`             |
| 3         | `[10, 5, 3]`  | `[]`     | `current=3`, push 3, `current=null`          |
| null      | `[10, 5, 3]`  | `[]`     | `current=null`, pop 3; `result.push(3)`      |
| null      | `[10, 5]`     | `[3]`    | `current=3.right=null`                       |
| null      | `[10, 5]`     | `[3]`    | `current=null`, pop 5; `result.push(5)`      |
| null      | `[10]`        | `[3, 5]` | `current=5.right=7`                          |
| 7         | `[10]`        | `[3, 5]` | `current=7`, push 7, `current=null`          |
| null      | `[10, 7]`     | `[3, 5]` | `current=null`, pop 7; `result.push(7)`      |
| null      | `[10]`        | `[3, 5, 7]`| `current=7.right=null`                       |
| null      | `[10]`        | `[3, 5, 7]`| `current=null`, pop 10; `result.push(10)`    |
| null      | `[]`          | `[3, 5, 7, 10]`| `current=10.right=15`                        |
| 15        | `[]`          | `[3, 5, 7, 10]`| `current=15`, push 15, `current=12`          |
| 12        | `[15, 12]`    | `[3, 5, 7, 10]`| `current=12`, push 12, `current=null`        |
| null      | `[15, 12]`    | `[3, 5, 7, 10]`| `current=null`, pop 12; `result.push(12)`    |
| null      | `[15]`        | `[3, 5, 7, 10, 12]`| `current=12.right=null`                      |
| null      | `[15]`        | `[3, 5, 7, 10, 12]`| `current=null`, pop 15; `result.push(15)`    |
| null      | `[]`          | `[3, 5, 7, 10, 12, 15]`| `current=15.right=null`                      |
| null      | `[]`          | `[3, 5, 7, 10, 12, 15]`| Loop ends                                    |

**Result**: `[3, 5, 7, 10, 12, 15]`

### Preorder Traversal

*   **Order**: Visit the **root** node, then the **left** subtree, then the **right** subtree.
*   **Use Cases**:
    *   Creating a copy of the tree (e.g., in a file).
    *   Expressing the structure of a tree.

#### Recursive Approach (`preorderTraversalRecursive`)

```
preorder(node):
  if node is null: return
  visit(node)
  preorder(node.left)
  preorder(node.right)
```

**Example Walkthrough for `preorderTraversalRecursive(root=10)`:**

```
Call Stack Trace:
1. preorder(10)
   Visit 10 -> [10]
   2. preorder(5)
      Visit 5 -> [10, 5]
      3. preorder(3)
         Visit 3 -> [10, 5, 3]
         4. preorder(null) -> return
         5. preorder(null) -> return
      6. preorder(7)
         Visit 7 -> [10, 5, 3, 7]
         7. preorder(null) -> return
         8. preorder(null) -> return
   9. preorder(15)
      Visit 15 -> [10, 5, 3, 7, 15]
      10. preorder(12)
          Visit 12 -> [10, 5, 3, 7, 15, 12]
          11. preorder(null) -> return
          12. preorder(null) -> return
      13. preorder(null) -> return
```

**Result**: `[10, 5, 3, 7, 15, 12]`

#### Iterative Approach (`preorderTraversalIterative`)

Uses an explicit stack. Push the root. While the stack is not empty, pop a node, visit it, then push its *right* child, then its *left* child. Pushing right then left ensures left is processed first due to LIFO.

**Example Walkthrough for `preorderTraversalIterative(root=10)`:**

| `stack`     | `result` | Action                                       |
| :---------- | :------- | :------------------------------------------- |
| `[10]`      | `[]`     | Initialize                                   |
| `[]`        | `[10]`   | Pop 10, `result.push(10)`. Push 15, then 5. |
| `[15, 5]`   | `[10]`   | `stack=[5, 15]` (after pushing)              |
| `[15]`      | `[10, 5]`| Pop 5, `result.push(5)`. Push 7, then 3.     |
| `[15, 7, 3]`| `[10, 5]`| `stack=[3, 7, 15]`                           |
| `[15, 7]`   | `[10, 5, 3]`| Pop 3, `result.push(3)`. No children.      |
| `[15]`      | `[10, 5, 3, 7]`| Pop 7, `result.push(7)`. No children.      |
| `[]`        | `[10, 5, 3, 7, 15]`| Pop 15, `result.push(15)`. Push null, then 12. |
| `[12]`      | `[10, 5, 3, 7, 15]`| `stack=[12]`                                 |
| `[]`        | `[10, 5, 3, 7, 15, 12]`| Pop 12, `result.push(12)`. No children.    |
| `[]`        | `[10, 5, 3, 7, 15, 12]`| Loop ends                                    |

**Result**: `[10, 5, 3, 7, 15, 12]`

### Postorder Traversal

*   **Order**: Visit the **left** subtree, then the **right** subtree, then the **root** node.
*   **Use Cases**:
    *   Deleting a tree (delete children before parent to avoid dangling pointers).
    *   Evaluating postfix expressions (if tree represents expression).

#### Recursive Approach (`postorderTraversalRecursive`)

```
postorder(node):
  if node is null: return
  postorder(node.left)
  postorder(node.right)
  visit(node)
```

**Example Walkthrough for `postorderTraversalRecursive(root=10)`:**

```
Call Stack Trace:
1. postorder(10)
   2. postorder(5)
      3. postorder(3)
         4. postorder(null) -> return
         5. postorder(null) -> return
         Visit 3 -> [3]
      6. postorder(7)
         7. postorder(null) -> return
         8. postorder(null) -> return
         Visit 7 -> [3, 7]
      Visit 5 -> [3, 7, 5]
   9. postorder(15)
      10. postorder(12)
          11. postorder(null) -> return
          12. postorder(null) -> return
          Visit 12 -> [3, 7, 5, 12]
      13. postorder(null) -> return
      Visit 15 -> [3, 7, 5, 12, 15]
   Visit 10 -> [3, 7, 5, 12, 15, 10]
```

**Result**: `[3, 7, 5, 12, 15, 10]`

#### Iterative Approach (Two Stacks) (`postorderTraversalIterativeTwoStacks`)

This is the most common iterative approach for postorder. It uses two stacks: `stack1` for processing (similar to preorder), and `stack2` to store results in reverse order.

1.  Push `root` to `stack1`.
2.  While `stack1` is not empty:
    a.  Pop `node` from `stack1`.
    b.  Push `node` to `stack2`.
    c.  Push `node.left` (if exists) to `stack1`.
    d.  Push `node.right` (if exists) to `stack1`.
3.  Pop all elements from `stack2` and add to result.

**Why this works**: `stack1` will process nodes in `Root -> Left -> Right` order (like preorder, but children are pushed to `stack1` in `left` then `right` order so `right` is popped first for processing next level). When pushed to `stack2`, they are effectively in `Root -> Right -> Left` order. Popping `stack2` reverses this to `Left -> Right -> Root`.

**Example Walkthrough for `postorderTraversalIterativeTwoStacks(root=10)`:**

| `stack1`      | `stack2`          | `result` | Action                                       |
| :------------ | :---------------- | :------- | :------------------------------------------- |
| `[10]`        | `[]`              | `[]`     | Initialize                                   |
| `[]`          | `[10]`            | `[]`     | Pop 10 from `s1`, push 10 to `s2`. Push 5 then 15 to `s1`. |
| `[5, 15]`     | `[10]`            | `[]`     | `s1` now `[15, 5]`                           |
| `[5]`         | `[10, 15]`        | `[]`     | Pop 15 from `s1`, push 15 to `s2`. Push 12 then null to `s1`. |
| `[5, 12]`     | `[10, 15]`        | `[]`     | `s1` now `[12, 5]`                           |
| `[12]`        | `[10, 15, 5]`     | `[]`     | Pop 5 from `s1`, push 5 to `s2`. Push 3 then 7 to `s1`. |
| `[12, 3, 7]`  | `[10, 15, 5]`     | `[]`     | `s1` now `[7, 3, 12]`                        |
| `[12, 3]`     | `[10, 15, 5, 7]`  | `[]`     | Pop 7 from `s1`, push 7 to `s2`. No children. |
| `[12]`        | `[10, 15, 5, 7, 3]`| `[]`     | Pop 3 from `s1`, push 3 to `s2`. No children. |
| `[]`          | `[10, 15, 5, 7, 3, 12]`| `[]`     | Pop 12 from `s1`, push 12 to `s2`. No children. |
| `[]`          | `[10, 15, 5, 7, 3, 12]`| `[]`     | `s1` empty. Pop all from `s2` to `result`. |
| `[]`          | `[]`              | `[12, 3, 7, 5, 15, 10]` | Mistake here! The order of `stack1` pushes for `left` and `right` matters.
|               |                   |          | It should be `right` then `left` to process `left` first.  Corrected:
| `stack1`      | `stack2`          | `result` | Action (Corrected for `s1` push order)       |
| :------------ | :---------------- | :------- | :------------------------------------------- |
| `[10]`        | `[]`              | `[]`     | Initialize                                   |
| `[]`          | `[10]`            | `[]`     | Pop 10 from `s1`, push 10 to `s2`. Push **right (15)** then **left (5)** to `s1`. |
| `[15, 5]`     | `[10]`            | `[]`     | `s1` now `[5, 15]`                           |
| `[15]`        | `[10, 5]`         | `[]`     | Pop 5 from `s1`, push 5 to `s2`. Push **right (7)** then **left (3)** to `s1`. |
| `[15, 7, 3]`  | `[10, 5]`         | `[]`     | `s1` now `[3, 7, 15]`                        |
| `[15, 7]`     | `[10, 5, 3]`      | `[]`     | Pop 3 from `s1`, push 3 to `s2`. No children. |
| `[15]`        | `[10, 5, 3, 7]`   | `[]`     | Pop 7 from `s1`, push 7 to `s2`. No children. |
| `[]`          | `[10, 5, 3, 7, 15]`| `[]`     | Pop 15 from `s1`, push 15 to `s2`. Push **right (null)** then **left (12)** to `s1`. |
| `[12]`        | `[10, 5, 3, 7, 15]`| `[]`     | `s1` now `[12]`                              |
| `[]`          | `[10, 5, 3, 7, 15, 12]`| `[]`     | Pop 12 from `s1`, push 12 to `s2`. No children. |
| `[]`          | `[]`              | `[12, 15, 7, 3, 5, 10]` | Pop from `s2` and reverse |

**Result**: `[3, 7, 5, 12, 15, 10]`

#### Iterative Approach (One Stack) (`postorderTraversalIterativeOneStack`)

This approach is more complex. It requires tracking the `lastVisitedNode` to correctly identify when to pop a node (only after its right child has been processed or is null).

**Logic**:
1.  Go left as far as possible, pushing nodes onto the stack.
2.  When a null is hit, peek at the top node of the stack.
3.  If the peeked node has a right child *and* that right child has not been visited yet (i.e., it's not the `lastVisitedNode`), then move `current` to that right child to process it.
4.  Otherwise (no right child, or right child already visited), pop the node, add its value to result, and set it as `lastVisitedNode`. Set `current` to `null` to ensure the loop continues by popping from the stack.

**Result**: `[3, 7, 5, 12, 15, 10]`

## 3. Breadth-First Search (BFS) Traversals

BFS traversals explore nodes level by level. A queue is typically used to manage the order of nodes to visit.

### Level Order Traversal

*   **Order**: Visit nodes level by level, from left to right within each level.
*   **Property**: Explores all neighbors at the present depth before moving on to nodes at the next depth level.
*   **Use Cases**:
    *   Finding the shortest path in an unweighted tree.
    *   Determining tree height (`Problem5_MaxDepth.ts` can use this).
    *   Visualizing tree levels.

#### Iterative Approach (`levelOrderTraversal`)

Uses a queue. At each step, dequeue a node, add its value to the current level's list, then enqueue its left and right children. A crucial step is to get the `levelSize` at the beginning of each level loop to process only the nodes belonging to that level.

**Example Walkthrough for `levelOrderTraversal(root=10)`:**

```
Queue: [10]
Level: 0
Result: []

Loop 1 (depth=1): queue.length = 1, levelNodes = []
  Dequeue 10. levelNodes = [10]. Enqueue 5, 15.
Queue: [5, 15]
Level: 1
Result: [[10]]

Loop 2 (depth=2): queue.length = 2, levelNodes = []
  Dequeue 5. levelNodes = [5]. Enqueue 3, 7.
Queue: [15, 3, 7]
  Dequeue 15. levelNodes = [5, 15]. Enqueue 12.
Queue: [3, 7, 12]
Level: 2
Result: [[10], [5, 15]]

Loop 3 (depth=3): queue.length = 3, levelNodes = []
  Dequeue 3. levelNodes = [3]. No children.
Queue: [7, 12]
  Dequeue 7. levelNodes = [3, 7]. No children.
Queue: [12]
  Dequeue 12. levelNodes = [3, 7, 12]. No children.
Queue: []
Level: 3
Result: [[10], [5, 15], [3, 7, 12]]

Queue is empty. Loop ends.
```

**Result**: `[[10], [5, 15], [3, 7, 12]]`

### Zigzag Level Order Traversal

*   **Order**: Alternates direction for each level:
    *   Level 0: Left-to-Right
    *   Level 1: Right-to-Left
    *   Level 2: Left-to-Right
    *   ...and so on.
*   **Use Cases**: Specific pattern-based traversal, interview problem.

#### Iterative Approach (`zigzagLevelOrderTraversal`)

Similar to standard Level Order Traversal, but with an added flag (`isLeftToRight`) to control direction. After collecting nodes for a level, reverse the `currentLevelNodes` array if `isLeftToRight` is false.

**Example Walkthrough for `zigzagLevelOrderTraversal(root=10)`:**

```
Queue: [10]
isLeftToRight: true
Result: []

Loop 1 (level 0): queue.length = 1, levelNodes = []
  Dequeue 10. levelNodes = [10]. Enqueue 5, 15.
Queue: [5, 15]
  isLeftToRight is true, so levelNodes stays [10].
Result: [[10]]
isLeftToRight = false

Loop 2 (level 1): queue.length = 2, levelNodes = []
  Dequeue 5. levelNodes = [5]. Enqueue 3, 7.
Queue: [15, 3, 7]
  Dequeue 15. levelNodes = [5, 15]. Enqueue 12.
Queue: [3, 7, 12]
  isLeftToRight is false, so levelNodes.reverse() -> [15, 5].
Result: [[10], [15, 5]]
isLeftToRight = true

Loop 3 (level 2): queue.length = 3, levelNodes = []
  Dequeue 3. levelNodes = [3]. No children.
Queue: [7, 12]
  Dequeue 7. levelNodes = [3, 7]. No children.
Queue: [12]
  Dequeue 12. levelNodes = [3, 7, 12]. No children.
Queue: []
  isLeftToRight is true, so levelNodes stays [3, 7, 12].
Result: [[10], [15, 5], [3, 7, 12]]
isLeftToRight = false

Queue is empty. Loop ends.
```

**Result**: `[[10], [15, 5], [3, 7, 12]]`

## 4. Applications of Traversals

Traversals are not just for printing nodes; they are fundamental building blocks for many other tree algorithms.

### Validating a Binary Search Tree

*   **Problem**: Given a binary tree, determine if it is a valid BST.
*   **BST Properties**:
    *   Left subtree values < Root value
    *   Right subtree values > Root value
    *   Both left and right subtrees must also be BSTs.
*   **Approach**: The most robust way is a recursive DFS that passes `min` and `max` allowed values down the tree. For the left child, `max` is updated to the current node's value. For the right child, `min` is updated to the current node's value.
*   **Alternative**: An inorder traversal of a BST yields sorted elements. You can perform an inorder traversal and check if the result is strictly increasing. This works but requires storing all elements or keeping track of the `previousVal`.

#### Recursive Approach (`isValidBSTRecursive`)

This approach passes `min` and `max` boundary values (initially `null` for negative/positive infinity) down the recursion.

```
isValidBST(node, min, max):
  if node is null: return true
  if (min is not null and node.val <= min) or (max is not null and node.val >= max): return false

  return isValidBST(node.left, min, node.val) AND isValidBST(node.right, node.val, max)
```

#### Iterative Inorder Approach (`isValidBSTInorderIterative`)

Uses an iterative inorder traversal pattern. It keeps track of the `previousVal` visited. If at any point the current node's value is less than or equal to `previousVal`, it's not a valid BST.

### Calculating Maximum Depth

*   **Problem**: Find the length of the longest path from the root node down to the farthest leaf node.
*   **Approach 1 (Recursive DFS)**: The depth of a node is `1 + max(depth of left child, depth of right child)`. This is a classic recursive solution.
*   **Approach 2 (Iterative BFS)**: Perform a level-order traversal. Each time a new level is processed, increment a depth counter. The final count is the maximum depth.

#### Recursive DFS (`maxDepthDFS_Recursive`)

```
maxDepth(node):
  if node is null: return 0
  leftDepth = maxDepth(node.left)
  rightDepth = maxDepth(node.right)
  return 1 + max(leftDepth, rightDepth)
```

#### Iterative BFS (`maxDepthBFS_Iterative`)

Uses a queue. Loops through levels, incrementing depth each time.

```
maxDepth(root):
  if root is null: return 0
  queue = [root]
  depth = 0
  while queue is not empty:
    depth++
    levelSize = queue.length
    for i from 0 to levelSize-1:
      node = queue.dequeue()
      if node.left is not null: queue.enqueue(node.left)
      if node.right is not null: queue.enqueue(node.right)
  return depth
```

## 5. Edge Cases and Gotchas

When dealing with tree traversals, always consider these edge cases:

*   **Empty Tree**: `root` is `null`. All traversal functions should gracefully handle this, typically returning an empty list or 0.
*   **Single Node Tree**: `root` exists, but `root.left` and `root.right` are `null`. The traversal should simply visit this one node.
*   **Skewed Trees**:
    *   **Left-skewed**: All nodes are left children. This can lead to a recursion stack depth equal to `N` (number of nodes), making the space complexity O(N).
    *   **Right-skewed**: All nodes are right children. Similar to left-skewed, O(N) space.
*   **Trees with `null` children in the middle**: Ensure your logic correctly skips `null` children and doesn't cause errors. The array-to-tree utility helps in creating such trees.
*   **Duplicates in BSTs**: The strict definition of a BST typically requires `left < root < right`. If `left <= root < right` or `left < root <= right` is allowed, the validation logic (`isValidBST`) needs slight adjustment. The implementation here assumes `left < root < right`.
*   **Integer Overflow (for min/max values in BST validation)**: When using `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER` as initial `min`/`max` bounds, be careful if node values can exceed these. For example, LeetCode problems often specify `val` within `[-2^31, 2^31 - 1]`, which are exactly `MIN_SAFE_INTEGER` and `MAX_SAFE_INTEGER` in 32-bit signed integers. Using `null` as initial bounds and checking `min !== null` / `max !== null` is a more robust approach, as done in `isValidBSTRecursive`.

## 6. Interview Tips and Variations

*   **Master the Basics**: Be comfortable with all three DFS traversals (Inorder, Preorder, Postorder) and BFS (Level Order) both recursively and iteratively.
*   **Know Time/Space Complexity**: Always be ready to state and justify the complexities.
    *   **Time**: All standard traversals are O(N) because each node is visited once.
    *   **Space**:
        *   **DFS Recursive**: O(H) for recursion stack (H = height of tree). Worst case O(N) for skewed, best case O(logN) for balanced.
        *   **DFS Iterative (Stack)**: O(H) for explicit stack. Same worst/best cases as recursive.
        *   **BFS Iterative (Queue)**: O(W) for queue (W = maximum width of tree). Worst case O(N) for complete tree (last level can have N/2 nodes), best case O(1) for skewed.
*   **Recursive vs. Iterative**:
    *   **Recursion**: Often more elegant and easier to write. Can lead to stack overflow for very deep trees in languages with limited stack size.
    *   **Iteration**: Avoids stack overflow for deep trees, but code can be more complex due to explicit stack/queue management.
*   **Common Variations/Follow-ups**:
    *   **Zigzag Level Order**: Already implemented.
    *   **Vertical Order Traversal**: Requires tracking horizontal distance from root.
    *   **Boundary Traversal**: Requires specific logic for left boundary, leaves, and right boundary.
    *   **Morris Traversal**: An O(1) space inorder traversal (highly advanced, rarely required in standard interviews but good to know).
    *   **Serialization/Deserialization**: Using preorder/postorder for serialization and then reconstructing the tree.
    *   **Path Sum/All Paths**: Variations of DFS where you track the path from root to node.
    *   **Symmetric Tree**: Check if a tree is a mirror image of itself (requires a modified traversal comparing left/right children).
    *   **Lowest Common Ancestor (LCA)**: Often solved with DFS or parent pointers.
*   **Practice Drawing Trees**: Use diagrams to trace traversals and debug your logic. It's often easier to spot errors visually.
*   **Think about helper functions**: For problems like BST validation, passing bounds via helper functions is cleaner than global variables.

---
This document covers the theoretical and practical aspects of binary tree traversals within this project. Refer to the specific source files (`src/problems/*.ts`) for code implementations and detailed comments.