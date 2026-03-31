```markdown
# Tree Traversal Algorithms: Detailed Explanation

This document provides a detailed explanation of the tree traversal algorithms implemented in this project,
including their logic, ASCII diagrams for illustration, and time/space complexity analysis.

---

## 1. Standard Depth-First Search (DFS) Traversals

DFS traversals explore as far as possible along each branch before backtracking. The three main types are:

### 1.1 Inorder Traversal (Left -> Root -> Right)

Visits the left subtree, then the root node, then the right subtree.

**Typical Use Cases:**
*   Retrieving elements of a Binary Search Tree (BST) in sorted order.
*   Copying a tree.

**ASCII Diagram (Inorder for `exampleTree`):**
```
      3
     / \
    9  20
       / \
      15  7

Traversal Order: 9 -> 3 -> 15 -> 20 -> 7
```

#### 1.1.1 Recursive Approach (`inorderTraversalRecursive`)

**Logic:**
1.  Recursively call `inorderHelperRecursive` for the left child.
2.  Add the current node's value to the result list.
3.  Recursively call `inorderHelperRecursive` for the right child.
4.  Base case: If the node is null, return.

**Time Complexity:** O(N), where N is the number of nodes. Each node is visited exactly once.
**Space Complexity:** O(H), where H is the height of the tree. This is for the recursion stack. In the worst case (skewed tree), H can be N; in the best case (balanced tree), H is log N.

#### 1.1.2 Iterative Approach (`inorderTraversalIterative`)

**Logic:**
1.  Initialize an empty stack and set `current` to `root`.
2.  Loop while `current` is not null OR the stack is not empty:
    a.  **Go Left:** While `current` is not null, push `current` onto the stack and move `current` to `current.left`. This effectively pushes all left ancestors.
    b.  **Visit Node:** Once `current` becomes null, pop a node from the stack. This node is the leftmost unvisited node (or an ancestor whose left subtree has been processed). Add its value to the result.
    c.  **Go Right:** Move `current` to the popped node's `right` child to process its right subtree.

**Time Complexity:** O(N). Each node is pushed onto and popped from the stack once.
**Space Complexity:** O(H) for the stack, similar to the recursive approach.

### 1.2 Preorder Traversal (Root -> Left -> Right)

Visits the root node, then the left subtree, then the right subtree.

**Typical Use Cases:**
*   Creating a copy of the tree.
*   Serializing/deserializing a tree.
*   Representing a tree structure (e.g., directory structure).

**ASCII Diagram (Preorder for `exampleTree`):**
```
      3
     / \
    9  20
       / \
      15  7

Traversal Order: 3 -> 9 -> 20 -> 15 -> 7
```

#### 1.2.1 Recursive Approach (`preorderTraversalRecursive`)

**Logic:**
1.  Add the current node's value to the result list.
2.  Recursively call `preorderHelperRecursive` for the left child.
3.  Recursively call `preorderHelperRecursive` for the right child.
4.  Base case: If the node is null, return.

**Time Complexity:** O(N).
**Space Complexity:** O(H) for the recursion stack.

#### 1.2.2 Iterative Approach (`preorderTraversalIterative`)

**Logic:**
1.  Initialize an empty stack. If `root` is null, return.
2.  Push `root` onto the stack.
3.  Loop while the stack is not empty:
    a.  Pop a node from the stack. Add its value to the result.
    b.  **Push Right First, then Left:** Push the right child onto the stack (if not null), then push the left child (if not null). This order ensures that when nodes are popped (LIFO), the left child is processed before the right child.

**Time Complexity:** O(N).
**Space Complexity:** O(H) for the stack.

### 1.3 Postorder Traversal (Left -> Right -> Root)

Visits the left subtree, then the right subtree, then the root node.

**Typical Use Cases:**
*   Deleting a tree (e.g., `free` memory after children are freed).
*   Evaluating expression trees (operators are at the root).

**ASCII Diagram (Postorder for `exampleTree`):**
```
      3
     / \
    9  20
       / \
      15  7

Traversal Order: 9 -> 15 -> 7 -> 20 -> 3
```

#### 1.3.1 Recursive Approach (`postorderTraversalRecursive`)

**Logic:**
1.  Recursively call `postorderHelperRecursive` for the left child.
2.  Recursively call `postorderHelperRecursive` for the right child.
3.  Add the current node's value to the result list.
4.  Base case: If the node is null, return.

**Time Complexity:** O(N).
**Space Complexity:** O(H) for the recursion stack.

#### 1.3.2 Iterative Approach (Two Stacks) (`postorderTraversalIterativeTwoStacks`)

**Logic:**
1.  Initialize two stacks, `s1` and `s2`. If `root` is null, return.
2.  Push `root` onto `s1`.
3.  Loop while `s1` is not empty:
    a.  Pop a node `current` from `s1`.
    b.  Push `current` onto `s2`.
    c.  Push `current.left` (if not null) onto `s1`.
    d.  Push `current.right` (if not null) onto `s1`.
    *(Note: The order of pushing left/right onto `s1` for preorder-like behavior results in `s2` having nodes in "Root, Right, Left" order.)*
4.  After the loop, `s2` contains nodes in the order: Root, Right child, Left child. Pop all nodes from `s2` and add them to the result list. This reverses the order to Left child, Right child, Root (Postorder).

**Time Complexity:** O(N). Each node is pushed and popped twice.
**Space Complexity:** O(H) for both stacks.

#### 1.3.3 Iterative Approach (One Stack) (`postorderTraversalIterativeOneStack`)

**Logic:**
This is more complex. It simulates the recursion by using a `lastVisited` node to check if the right child has been processed.
1.  Initialize an empty stack, set `current` to `root`, and `lastVisited` to null.
2.  Loop while `current` is not null OR the stack is not empty:
    a.  **Go Left:** While `current` is not null, push `current` onto the stack and move `current` to `current.left`.
    b.  **Peek and Decide:** Peek at the top node (`peekNode`).
    c.  If `peekNode.right` is not null AND `peekNode.right` is not `lastVisited` (meaning right child exists and hasn't been processed yet):
        Move `current` to `peekNode.right` to process the right subtree.
    d.  Else (right child is null OR right child has been visited):
        Pop `peekNode` from the stack. Add `peekNode.val` to the result.
        Set `lastVisited = peekNode`.
        Set `current = null` (to ensure the loop continues by popping from stack, not by moving left/right from current).

**Time Complexity:** O(N).
**Space Complexity:** O(H) for the stack.

---

## 2. Breadth-First Search (BFS) Traversals

BFS traverses the tree level by level. It typically uses a queue.

### 2.1 Level Order Traversal (`levelOrderTraversal`)

Visits all nodes at the current level from left to right before moving to the next level.

**Typical Use Cases:**
*   Finding the shortest path in an unweighted tree.
*   Printing a tree level by level.

**ASCII Diagram (Level Order for `exampleTree`):**
```
      3     -> Level 0
     / \
    9  20   -> Level 1
       / \
      15  7 -> Level 2

Traversal Order: [[3], [9, 20], [15, 7]]
```

**Logic:**
1.  Initialize an empty list of lists for the result and an empty queue. If `root` is null, return.
2.  Enqueue `root`.
3.  Loop while the queue is not empty:
    a.  Get the `levelSize` (number of nodes currently in the queue), which represents the nodes at the current level.
    b.  Initialize an empty list `currentLevelNodes` to store values for this level.
    c.  Loop `levelSize` times:
        i.  Dequeue a node `current`.
        ii. Add `current.val` to `currentLevelNodes`.
        iii. Enqueue `current.left` (if not null).
        iv. Enqueue `current.right` (if not null).
    d.  Add `currentLevelNodes` to the main result list.

**Time Complexity:** O(N). Each node is enqueued and dequeued exactly once.
**Space Complexity:** O(W), where W is the maximum width of the tree. In the worst case (complete binary tree), W can be N/2, so O(N). In the best case (skewed tree), W is 1, so O(1).

### 2.2 Zigzag Level Order Traversal (`zigzagLevelOrderTraversal`)

Similar to level order, but the traversal direction alternates for each level:
*   Level 0: Left to Right
*   Level 1: Right to Left
*   Level 2: Left to Right, and so on.

**ASCII Diagram (Zigzag Level Order for `exampleTree`):**
```
      3     -> Level 0 (L->R)
     / \
    9  20   -> Level 1 (R->L)
       / \
      15  7 -> Level 2 (L->R)

Traversal Order: [[3], [20, 9], [15, 7]]
```

**Logic:**
1.  Similar to `levelOrderTraversal`, but use a `LinkedList` for `currentLevelNodes` and a boolean flag `leftToRight`.
2.  If `leftToRight` is true, add elements to the `LinkedList`'s end (`addLast`).
3.  If `leftToRight` is false, add elements to the `LinkedList`'s front (`addFirst`).
4.  Toggle `leftToRight` after processing each level.

**Time Complexity:** O(N).
**Space Complexity:** O(W) for the queue and `LinkedList`.

### 2.3 Binary Tree Right Side View (`rightSideView`)

Returns the values of nodes visible from the right side of the tree, ordered from top to bottom.

**ASCII Diagram (Right Side View for `exampleTree`):**
```
      3  <-- Visible
     / \
    9  20 <-- Visible
       / \
      15  7 <-- Visible

Right Side View: [3, 20, 7]
```

**Logic:**
1.  Use a Level Order Traversal (BFS).
2.  For each level, the last node processed (when iterating from left to right) is the one visible from the right side.
3.  Initialize an empty list for the result and an empty queue. Enqueue `root`.
4.  Loop through levels:
    a.  Get `levelSize`.
    b.  Loop `levelSize` times:
        i.  Dequeue `current` node.
        ii. If `current` is the LAST node of the current level (`i == levelSize - 1`), add its value to the result.
        iii. Enqueue children as usual.

**Time Complexity:** O(N).
**Space Complexity:** O(W) for the queue.

### 2.4 Vertical Order Traversal (`verticalOrderTraversal`)

Traverses nodes column by column. Within each column, nodes are ordered by row (depth). If nodes are at the same column and row, they are ordered by their value.

**ASCII Diagram (Vertical Order for `exampleTree`):**
```
      3 (0,0)
     /     \
    9 (-1,1) 20 (1,1)
           /    \
         15 (0,2) 7 (2,2)

Column -1: [9]
Column 0:  [3, 15] (3 at row 0, 15 at row 2)
Column 1:  [20]
Column 2:  [7]

Traversal Order: [[9], [3, 15], [20], [7]]
```

**Logic:**
1.  Assign each node a `(column, row)` coordinate. Root is `(0,0)`.
    *   Left child of `(col, row)` is `(col-1, row+1)`.
    *   Right child of `(col, row)` is `(col+1, row+1)`.
2.  Use BFS to process nodes level by level, maintaining their coordinates.
3.  Store nodes in a `TreeMap<Integer, TreeMap<Integer, List<Integer>>>` where:
    *   Outer key: `column` (ensures columns are sorted).
    *   Inner key: `row` (ensures nodes within a column are sorted by row).
    *   Value: `List<Integer>` of node values at that specific `(column, row)`. These lists need to be sorted by value if multiple nodes occupy the exact same `(column, row)` (though this is rare in standard binary trees unless values are duplicated or a custom problem definition allows it). For distinct nodes, the BFS order implicitly handles the value ordering for same (col,row) but here we explicitly sort `nodesAtRow` for robustness.
4.  After BFS, iterate through the `TreeMap` to construct the final list of lists.

**Time Complexity:** O(N log W), where N is the number of nodes and W is the width of the tree. The `TreeMap` operations take `log W` time. Sorting lists within columns can add to complexity depending on the number of nodes at the same (column, row).
**Space Complexity:** O(N) for the map and queue.

---

## 3. Advanced/Specialized Iterative Problems

These problems demonstrate how iterative traversal patterns can solve more specific challenges.

### 3.1 Kth Smallest Element in a BST (`kthSmallestInBSTIterative`)

Finds the k-th smallest element in a Binary Search Tree.

**Logic:**
The inorder traversal of a BST visits nodes in ascending order. Therefore, an iterative inorder traversal can be used, and a counter tracks which "smallest" element is currently being visited.
1.  Perform iterative inorder traversal using a stack.
2.  Maintain a `count` variable. Increment `count` each time a node is visited (popped from the stack).
3.  When `count` equals `k`, the current node's value is the Kth smallest. Return it.

**Time Complexity:** O(H + k). In the worst case (skewed tree or k near N), this can be O(N).
**Space Complexity:** O(H) for the stack.

### 3.2 Path Sum (Iterative DFS/BFS) (`hasPathSumIterativeDFS`, `hasPathSumIterativeBFS`)

Determines if there is a root-to-leaf path whose node values sum up to a given `targetSum`.

#### 3.2.1 Iterative DFS Approach (`hasPathSumIterativeDFS`)

**Logic:**
1.  Use a stack. Instead of just `TreeNode`, push `Pair<TreeNode, Integer>` where the integer is the cumulative sum to reach that node.
2.  Start by pushing `(root, root.val)` onto the stack.
3.  When popping a `(node, currentSum)`:
    a.  If `node` is a leaf (no left or right children), check if `currentSum` equals `targetSum`. If yes, return `true`.
    b.  If `node` has a left child, push `(node.left, currentSum + node.left.val)` onto the stack.
    c.  If `node` has a right child, push `(node.right, currentSum + node.right.val)` onto the stack.
4.  If the stack becomes empty and no path sum was found, return `false`.

**Time Complexity:** O(N).
**Space Complexity:** O(H) for the stack.

#### 3.2.2 Iterative BFS Approach (`hasPathSumIterativeBFS`)

**Logic:**
1.  Similar to iterative DFS, but use a queue instead of a stack. Push `Pair<TreeNode, Integer>` onto the queue.
2.  Start by offering `(root, root.val)` to the queue.
3.  When polling a `(node, currentSum)`:
    a.  If `node` is a leaf, check if `currentSum` equals `targetSum`. If yes, return `true`.
    b.  If `node` has a left child, offer `(node.left, currentSum + node.left.val)` to the queue.
    c.  If `node` has a right child, offer `(node.right, currentSum + node.right.val)` to the queue.
4.  If the queue becomes empty and no path sum was found, return `false`.

**Time Complexity:** O(N).
**Space Complexity:** O(W) for the queue.

### 3.3 Flatten Binary Tree to Linked List (`flattenIterative`, `flattenIterativeO1Space`)

Flattens a binary tree into a "linked list" in-place, following a preorder traversal order. The left child pointers should be null, and right child pointers should point to the next node in the flattened list.

#### 3.3.1 Iterative Approach (Using Stack) (`flattenIterative`)

**Logic:**
1.  Use a stack to simulate preorder traversal.
2.  Initialize `previous` node to null.
3.  Push `root` onto the stack (if not null).
4.  Loop while the stack is not empty:
    a.  Pop `current` node.
    b.  If `previous` is not null, set `previous.right = current` and `previous.left = null`.
    c.  Push `current.right` (if not null) then `current.left` (if not null) onto the stack. This maintains preorder.
    d.  Update `previous = current`.

**Time Complexity:** O(N).
**Space Complexity:** O(H) for the stack.

#### 3.3.2 Iterative Approach (O(1) Space) (`flattenIterativeO1Space`)

**Logic (Morris-like approach):**
This is a more advanced technique that modifies the tree in-place without an auxiliary stack.
1.  Initialize `current` to `root`.
2.  Loop while `current` is not null:
    a.  If `current` has a left child:
        i.  Find the rightmost node in `current`'s left subtree. Let's call it `rightmostInLeft`.
        ii. Point `rightmostInLeft.right` to `current.right`. (This is the key step: connecting the end of the left subtree to the original right subtree).
        iii. Move `current`'s left subtree to its right: `current.right = current.left`.
        iv. Set `current.left = null`.
    b.  Move `current` to `current.right` (which is now the next node in the flattened sequence).

**Time Complexity:** O(N).
**Space Complexity:** O(1). This is the most memory-efficient approach for flattening.

---

## 4. Space-Optimized Traversals (Morris Traversal)

Morris Traversal allows performing inorder, preorder, and postorder traversals in O(1) auxiliary space (excluding the result list and recursion stack). It achieves this by temporarily modifying the tree structure by creating "threads" (links to predecessors/successors) and then restoring them.

### 4.1 Morris Inorder Traversal (`morrisInorderTraversal`)

**Logic:**
1.  Initialize `current = root`.
2.  Loop while `current` is not null:
    a.  If `current.left` is null: This means `current` has no left subtree to visit. Visit `current` (add to result) and move `current` to `current.right`.
    b.  If `current.left` is not null:
        i.  Find the **inorder predecessor** of `current`. The predecessor is the rightmost node in `current`'s left subtree.
        ii. If `predecessor.right` is null (no thread exists to `current`):
            Create a thread: `predecessor.right = current`.
            Move `current` to `current.left` (to traverse the left subtree).
        iii. If `predecessor.right` is `current` (a thread exists, meaning the left subtree has already been fully traversed and we are returning to `current`):
            Remove the thread: `predecessor.right = null`.
            Visit `current` (add to result).
            Move `current` to `current.right` (to traverse the right subtree).

**Time Complexity:** O(N). Each edge is traversed at most twice (once to establish a thread, once to break it).
**Space Complexity:** O(1).

### 4.2 Morris Preorder Traversal (`morrisPreorderTraversal`)

**Logic:**
Similar to inorder, but the "visit" (add to result) step happens at a different point.
1.  Initialize `current = root`.
2.  Loop while `current` is not null:
    a.  If `current.left` is null: Visit `current` (add to result) and move `current` to `current.right`.
    b.  If `current.left` is not null:
        i.  Find the **inorder predecessor** of `current`.
        ii. If `predecessor.right` is null (no thread):
            Visit `current` (add to result, as this is the first time we encounter it).
            Create a thread: `predecessor.right = current`.
            Move `current` to `current.left`.
        iii. If `predecessor.right` is `current` (thread exists):
            Remove the thread: `predecessor.right = null`.
            Move `current` to `current.right`.

**Time Complexity:** O(N).
**Space Complexity:** O(1).

### 4.3 Morris Postorder Traversal (`morrisPostorderTraversal`)

**Logic:**
This is the most complex Morris traversal. It relies on a trick: when a thread is broken (meaning the left subtree has been fully processed), we traverse the right spine of that processed left subtree in reverse order and add its nodes to the result. This effectively collects the "left -> right" part of postorder. After the main loop, any remaining nodes forming the rightmost path from the root (or from a dummy node) are also processed in reverse.

1.  Create a `dummy` node whose left child is the `root`. This simplifies handling the rightmost path of the entire tree. Set `current = dummy`.
2.  Loop while `current` is not null:
    a.  If `current.left` is null: Move `current` to `current.right`.
    b.  If `current.left` is not null:
        i.  Find the **inorder predecessor** of `current`.
        ii. If `predecessor.right` is null (no thread):
            Create a thread: `predecessor.right = current`.
            Move `current` to `current.left`.
        iii. If `predecessor.right` is `current` (thread exists):
            Remove the thread: `predecessor.right = null`.
            Call a helper function `addReverse(current.left, predecessor, result)` to collect the right spine of the left subtree (from `current.left` up to `predecessor`) in reverse order and add to the `result`.
            Move `current` to `current.right`.

The `addReverse` helper function:
*   Takes `from` (e.g., `current.left`), `to` (e.g., `predecessor`), and the `result` list.
*   Traverses from `from` to `to` using `right` pointers, collecting values into a temporary list.
*   Reverses the temporary list and adds all elements to the main `result` list.

**Time Complexity:** O(N).
**Space Complexity:** O(1).

---
```