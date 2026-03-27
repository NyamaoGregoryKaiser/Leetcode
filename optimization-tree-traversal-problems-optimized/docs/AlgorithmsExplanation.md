```markdown
# Algorithm Explanations

This document provides a detailed explanation of the logic, time complexity, and space complexity for each tree traversal algorithm implemented in this project.

## Table of Contents
1.  [Standard Traversals (Recursive)](#1-standard-traversals-recursive)
    *   [Preorder Traversal](#preorder-traversal-recursive)
    *   [Inorder Traversal](#inorder-traversal-recursive)
    *   [Postorder Traversal](#postorder-traversal-recursive)
2.  [Level Order Traversal (BFS)](#2-level-order-traversal-bfs)
3.  [Zigzag Level Order Traversal](#3-zigzag-level-order-traversal)
4.  [Boundary Traversal](#4-boundary-traversal)
5.  [Flatten Binary Tree to Linked List](#5-flatten-binary-tree-to-linked-list)
6.  [Iterative Standard Traversals](#6-iterative-standard-traversals)
    *   [Preorder Traversal (Iterative)](#preorder-traversal-iterative)
    *   [Inorder Traversal (Iterative)](#inorder-traversal-iterative)
    *   [Postorder Traversal (Iterative - Two Stacks)](#postorder-traversal-iterative---two-stacks)
    *   [Postorder Traversal (Iterative - One Stack)](#postorder-traversal-iterative---one-stack)
7.  [Morris Traversal (O(1) Space)](#7-morris-traversal-o1-space)
    *   [Morris Inorder Traversal](#morris-inorder-traversal)
    *   [Morris Preorder Traversal](#morris-preorder-traversal)

---

## 1. Standard Traversals (Recursive)

Recursive traversals are the most intuitive and elegant way to implement Preorder, Inorder, and Postorder. They naturally follow the definition of how to process the current node (Root) relative to its left and right subtrees.

### Preorder Traversal (Recursive)
*   **Order**: Root -> Left -> Right
*   **Logic**:
    1.  Process the current node (add its value to the result).
    2.  Recursively call the function for the left child.
    3.  Recursively call the function for the right child.
    Base Case: If the current node is `null`, return.
*   **Time Complexity**: O(N), where N is the number of nodes in the tree. Each node is visited exactly once.
*   **Space Complexity**: O(H), where H is the height of the tree. This is due to the recursion stack. In the worst case (a skewed tree), H can be N, leading to O(N) space. In the best case (a balanced tree), H is logN, leading to O(logN) space.

### Inorder Traversal (Recursive)
*   **Order**: Left -> Root -> Right
*   **Logic**:
    1.  Recursively call the function for the left child.
    2.  Process the current node (add its value to the result).
    3.  Recursively call the function for the right child.
    Base Case: If the current node is `null`, return.
*   **Time Complexity**: O(N). Each node is visited exactly once.
*   **Space Complexity**: O(H), same as Preorder.

### Postorder Traversal (Recursive)
*   **Order**: Left -> Right -> Root
*   **Logic**:
    1.  Recursively call the function for the left child.
    2.  Recursively call the function for the right child.
    3.  Process the current node (add its value to the result).
    Base Case: If the current node is `null`, return.
*   **Time Complexity**: O(N). Each node is visited exactly once.
*   **Space Complexity**: O(H), same as Preorder.

---

## 2. Level Order Traversal (BFS)

Level Order Traversal explores the tree level by level, processing all nodes at one depth before moving to the next. It's a classic application of Breadth-First Search (BFS).

*   **Order**: Level by Level (Left to Right within each level)
*   **Logic**:
    1.  Use a `Queue` to store nodes to be visited.
    2.  Add the `root` node to the queue.
    3.  While the queue is not empty:
        *   Get the `size` of the queue, which represents the number of nodes at the current level.
        *   Create a list to store nodes for the current level.
        *   Loop `size` times:
            *   Dequeue a node.
            *   Add its value to the current level's list.
            *   Enqueue its left child (if not null).
            *   Enqueue its right child (if not null).
        *   Add the current level's list to the overall result.
*   **Time Complexity**: O(N). Each node is enqueued and dequeued exactly once.
*   **Space Complexity**: O(W), where W is the maximum width of the tree (maximum number of nodes at any single level). In the worst case (a complete binary tree), W can be N/2, so effectively O(N).

---

## 3. Zigzag Level Order Traversal

This is a variation of Level Order Traversal where the direction of traversal alternates between left-to-right and right-to-left for successive levels.

*   **Order**: Level 0: L->R, Level 1: R->L, Level 2: L->R, ...
*   **Logic**:
    1.  Similar to standard Level Order, use a `Queue`.
    2.  Maintain a boolean flag, `leftToRight`, initialized to `true`.
    3.  In each level processing loop:
        *   Dequeue nodes and add their values to a `LinkedList` for the current level.
        *   If `leftToRight` is `true`, add to the end (`addLast`).
        *   If `leftToRight` is `false`, add to the beginning (`addFirst`). This achieves the right-to-left order.
        *   Enqueue children (left then right) into the main queue for the *next* level, regardless of the current level's zigzag direction.
        *   Toggle `leftToRight` for the next level.
*   **Time Complexity**: O(N). Each node is processed once. Using `LinkedList.addFirst()` is O(1) amortized.
*   **Space Complexity**: O(W), similar to Level Order.

---

## 4. Boundary Traversal

Boundary traversal involves visiting the nodes that form the perimeter of the tree in a counter-clockwise direction. It typically consists of three parts:
1.  Left Boundary (excluding leaves).
2.  Leaves (from left to right).
3.  Right Boundary (excluding leaves, in reverse order).

*   **Logic**:
    1.  Handle `null` root and single-node tree cases.
    2.  Add the root's value to the result.
    3.  **Add Left Boundary**: Traverse down the leftmost path. At each node, add its value to the result *before* going to its left child. If a left child is `null`, try the right child. Stop if a leaf node is encountered (leaves will be handled separately).
    4.  **Add Leaves**: Perform an Inorder-like traversal (or any traversal that visits all nodes) and add a node's value to the result only if it's a leaf node.
    5.  **Add Right Boundary**: Traverse down the rightmost path. At each node, store its value in a temporary list *before* going to its right child. If a right child is `null`, try the left child. Stop if a leaf node is encountered. After traversal, add values from the temporary list to the main result in reverse order.
*   **Helper functions**: `isLeaf(TreeNode node)`, `addLeftBoundary(TreeNode node, List<Integer> result)`, `addLeaves(TreeNode node, List<Integer> result)`, `addRightBoundary(TreeNode node, List<Integer> result)`.
*   **Time Complexity**: O(N). Each node is visited a constant number of times across the three helper functions.
*   **Space Complexity**: O(H) for the recursion stack (primarily from `addLeaves` and `addRightBoundary`'s temporary list) + O(N) for the final result list. In the worst case, H can be N, so O(N).

---

## 5. Flatten Binary Tree to Linked List

This problem requires transforming a binary tree into a skewed "linked list" structure in-place, following a preorder traversal order. The `right` pointers become the `next` pointers, and `left` pointers are set to `null`.

*   **Logic (Recursive, Reverse Preorder)**:
    This approach uses a `prev` pointer to keep track of the node that was most recently processed in the flattened list. The key insight is to process the nodes in the order: Right child -> Left child -> Root.
    1.  Recursively flatten the right subtree.
    2.  Recursively flatten the left subtree.
    3.  Once the children are flattened, the current node `root` needs to be linked.
        *   Set `root.right = prev` (the `prev` node holds the head of the flattened right/left subtree from previous calls).
        *   Set `root.left = null`.
        *   Update `prev = root` (current node becomes the new "previous" for its parent).
*   **Time Complexity**: O(N). Each node is visited exactly once.
*   **Space Complexity**: O(H) for the recursion stack. In the worst case, H can be N.

---

## 6. Iterative Standard Traversals

Iterative traversals use an explicit stack to simulate the recursion stack. This is important for understanding memory management and avoiding stack overflow errors on very deep trees.

### Preorder Traversal (Iterative)
*   **Order**: Root -> Left -> Right
*   **Logic**:
    1.  Create an empty `Stack`.
    2.  Push the `root` onto the stack.
    3.  While the stack is not empty:
        *   Pop a node (`current`).
        *   Add `current.val` to the result list.
        *   Push `current.right` to the stack (if not null).
        *   Push `current.left` to the stack (if not null).
        (Pushing right then left ensures that when nodes are popped (LIFO), left is processed before right).
*   **Time Complexity**: O(N). Each node is pushed and popped exactly once.
*   **Space Complexity**: O(H). In the worst case (skewed tree), the stack can hold all N nodes, so O(N). In the best case (balanced tree), O(logN).

### Inorder Traversal (Iterative)
*   **Order**: Left -> Root -> Right
*   **Logic**:
    1.  Create an empty `Stack`.
    2.  Initialize `current` node to `root`.
    3.  Loop while `current` is not `null` OR the stack is not empty:
        *   **Go Left**: While `current` is not `null`, push `current` onto the stack and set `current = current.left`. This pushes all ancestors on the left path.
        *   **Visit Root**: When `current` becomes `null` (meaning we've gone as far left as possible), pop a node from the stack. This node is the "Root" whose left subtree has been fully processed. Add its value to the result.
        *   **Go Right**: Set `current = poppedNode.right`. Now, we start traversing the right subtree.
*   **Time Complexity**: O(N). Each node is pushed and popped exactly once.
*   **Space Complexity**: O(H). In the worst case (skewed tree), O(N).

### Postorder Traversal (Iterative - Two Stacks)
*   **Order**: Left -> Right -> Root
*   **Logic**:
    This approach exploits the fact that if you reverse a `Root -> Right -> Left` traversal, you get `Left -> Right -> Root`.
    1.  Create two empty `Stacks`: `stack1` and `stack2`.
    2.  Push `root` onto `stack1`.
    3.  While `stack1` is not empty:
        *   Pop a node from `stack1` (`current`).
        *   Push `current` onto `stack2`.
        *   Push `current.left` onto `stack1` (if not null).
        *   Push `current.right` onto `stack1` (if not null).
        (This order in `stack1` ensures `current`'s left child is pushed before its right. Since `stack1` is LIFO, `right` will be processed (popped and pushed to `stack2`) before `left`).
    4.  Once `stack1` is empty, pop all elements from `stack2` and add their values to the result. This reverse order of `stack2` gives the correct Postorder sequence.
*   **Time Complexity**: O(N). Each node is pushed and popped twice (once from `stack1`, once from `stack2`).
*   **Space Complexity**: O(N). In the worst case, `stack1` and `stack2` can each hold about N/2 nodes.

### Postorder Traversal (Iterative - One Stack)
*   **Order**: Left -> Right -> Root
*   **Logic**:
    This is more complex and less intuitive than the two-stack approach. It requires tracking the `lastVisited` node to ensure a node is processed only after its right subtree has been fully traversed.
    1.  Create an empty `Stack`.
    2.  Initialize `current` to `root`, `lastVisited` to `null`.
    3.  Loop while `current` is not `null` OR the stack is not empty:
        *   **Go Left**: If `current` is not `null`, push `current` to stack and set `current = current.left`. (Go down left path).
        *   **Check Right/Pop**: If `current` is `null` (reached leftmost path):
            *   Peek the top node from the stack (`peekNode`).
            *   If `peekNode.right` exists AND `peekNode.right` is NOT `lastVisited` (meaning right subtree hasn't been processed yet):
                *   Set `current = peekNode.right` (start traversing right subtree).
            *   Else (right child is `null` OR right child *has been* `lastVisited`):
                *   Pop `peekNode` from stack.
                *   Add `peekNode.val` to result (all children processed, now visit root).
                *   Set `lastVisited = peekNode` (mark this node as processed).
                *   Set `current = null` (signal that we just processed a root and should now check its parent, not go down a path).
*   **Time Complexity**: O(N). Each node is pushed and popped once.
*   **Space Complexity**: O(H). In the worst case (skewed tree), O(N).

---

## 7. Morris Traversal (O(1) Space)

Morris Traversal is an advanced threading-based algorithm that achieves O(1) auxiliary space complexity (excluding the output list) by modifying the tree temporarily. It uses the `right` child pointers of nodes in the left subtree to store pointers back to the ancestor (current node).

### Morris Inorder Traversal
*   **Order**: Left -> Root -> Right
*   **Logic**:
    1.  Initialize `current` node to `root`.
    2.  Loop while `current` is not `null`:
        *   **If `current` has no left child**:
            *   Add `current.val` to result (Root).
            *   Move `current = current.right` (Right).
        *   **If `current` has a left child**:
            *   Find the `predecessor`: The rightmost node in `current`'s left subtree.
            *   Traverse `predecessor = current.left`; then `while (predecessor.right != null && predecessor.right != current) predecessor = predecessor.right;`
            *   **If `predecessor.right` is `null` (first time visit)**:
                *   Create a thread: `predecessor.right = current`.
                *   Move `current = current.left` (Left).
            *   **Else (`predecessor.right` is `current`, meaning left subtree processed)**:
                *   Remove the thread: `predecessor.right = null`.
                *   Add `current.val` to result (Root).
                *   Move `current = current.right` (Right).
*   **Time Complexity**: O(N). Although there's a nested loop to find the predecessor, each edge in the tree is traversed at most a constant number of times (e.g., down, up to create thread, down to break thread).
*   **Space Complexity**: O(1) (excluding the result list). No recursion stack or explicit stack is used.

### Morris Preorder Traversal
*   **Order**: Root -> Left -> Right
*   **Logic**:
    Very similar to Morris Inorder, but the "visit" (adding `current.val` to result) happens at a different point.
    1.  Initialize `current` node to `root`.
    2.  Loop while `current` is not `null`:
        *   **If `current` has no left child**:
            *   Add `current.val` to result (Root).
            *   Move `current = current.right` (Right).
        *   **If `current` has a left child**:
            *   Find the `predecessor` (same as Inorder).
            *   **If `predecessor.right` is `null` (first time visit)**:
                *   Add `current.val` to result (Root, as per preorder).
                *   Create a thread: `predecessor.right = current`.
                *   Move `current = current.left` (Left).
            *   **Else (`predecessor.right` is `current`, meaning left subtree processed)**:
                *   Remove the thread: `predecessor.right = null`.
                *   Move `current = current.right` (Right). (The root was already visited when the thread was created).
*   **Time Complexity**: O(N).
*   **Space Complexity**: O(1) (excluding the result list).
```