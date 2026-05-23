# Algorithm Explanations: Tree Traversals

This document provides detailed explanations for the tree traversal algorithms implemented in this project. Each section covers the intuition, step-by-step logic, and time/space complexity of different approaches.

## Table of Contents

1.  [Basic Traversals](#1-basic-traversals)
    *   [Inorder Traversal](#inorder-traversal-left---root---right)
    *   [Preorder Traversal](#preorder-traversal-root---left---right)
    *   [Postorder Traversal](#postorder-traversal-left---right---root)
2.  [Level Order Traversal (BFS)](#2-level-order-traversal-bfs)
3.  [Zigzag Level Order Traversal](#3-zigzag-level-order-traversal)
4.  [Maximum Depth of Binary Tree](#4-maximum-depth-of-binary-tree)
5.  [Path Sum III](#5-path-sum-iii)

---

## 1. Basic Traversals

The three classic ways to traverse a binary tree are Inorder, Preorder, and Postorder. They differ in the order in which they visit the root node relative to its left and right children.

### Inorder Traversal (Left -> Root -> Right)

**Intuition:**
Inorder traversal processes the left subtree, then the root, then the right subtree. For a Binary Search Tree (BST), inorder traversal visits nodes in non-decreasing (sorted) order.

**Recursive Approach (`inorderTraversalRecursive`):**
This is the most natural way to implement inorder traversal.

1.  **Base Case:** If the current `root` is `null`, return.
2.  **Recurse Left:** Recursively call `inorderTraversalRecursive` on `root.left`.
3.  **Visit Root:** Add `root.val` to the result list.
4.  **Recurse Right:** Recursively call `inorderTraversalRecursive` on `root.right`.

*   **Time Complexity:** O(N), where N is the number of nodes. Each node is visited exactly once.
*   **Space Complexity:** O(H), where H is the height of the tree. This is due to the recursion stack. In the worst case (a skewed tree), H can be N, leading to O(N) space. In a balanced tree, H is log N, leading to O(log N) space.

**Iterative Approach (`inorderTraversalIterative`):**
This approach simulates the recursion stack using an explicit stack data structure.

1.  Initialize an empty `result` list and an empty `stack`.
2.  Initialize `current` to `root`.
3.  Loop while `current` is not `null` OR `stack` is not empty:
    *   **Go Left:** While `current` is not `null`, push `current` onto the `stack` and move `current = current.left`. This pushes all left ancestors onto the stack until we reach the leftmost node.
    *   **Visit Node:** Pop a node from the `stack`. This node is the next one in inorder sequence. Add its value to `result`.
    *   **Go Right:** Move `current = current.right`. This prepares to explore the right subtree of the popped node.

*   **Time Complexity:** O(N). Each node is pushed onto the stack and popped from it once.
*   **Space Complexity:** O(H). The stack can hold up to H nodes at any given time. Similar to recursive, O(N) in worst case, O(log N) in best case.

### Preorder Traversal (Root -> Left -> Right)

**Intuition:**
Preorder traversal processes the root node first, then recursively traverses the left subtree, and finally the right subtree. This traversal is useful for creating a copy of a tree or for expressing the structure of the tree.

**Recursive Approach (`preorderTraversalRecursive`):**

1.  **Base Case:** If the current `root` is `null`, return.
2.  **Visit Root:** Add `root.val` to the result list.
3.  **Recurse Left:** Recursively call `preorderTraversalRecursive` on `root.left`.
4.  **Recurse Right:** Recursively call `preorderTraversalRecursive` on `root.right`.

*   **Time Complexity:** O(N).
*   **Space Complexity:** O(H).

**Iterative Approach (`preorderTraversalIterative`):**

1.  Initialize an empty `result` list. If `root` is `null`, return `result`.
2.  Initialize a `stack` with the `root` node.
3.  Loop while `stack` is not empty:
    *   **Visit Node:** Pop a node from the `stack`. Add its value to `result`.
    *   **Push Children:** Push the right child onto the `stack` first (if it exists), then the left child (if it exists). This ensures that the left child is processed before the right child due to LIFO (Last-In, First-Out) nature of the stack.

*   **Time Complexity:** O(N).
*   **Space Complexity:** O(H).

### Postorder Traversal (Left -> Right -> Root)

**Intuition:**
Postorder traversal processes the left subtree, then the right subtree, and finally the root node. This traversal is useful for deleting a tree (deleting children before their parent) or evaluating expressions represented by a tree.

**Recursive Approach (`postorderTraversalRecursive`):**

1.  **Base Case:** If the current `root` is `null`, return.
2.  **Recurse Left:** Recursively call `postorderTraversalRecursive` on `root.left`.
3.  **Recurse Right:** Recursively call `postorderTraversalRecursive` on `root.right`.
4.  **Visit Root:** Add `root.val` to the result list.

*   **Time Complexity:** O(N).
*   **Space Complexity:** O(H).

**Iterative Approach (Two Stacks) (`postorderTraversalIterativeTwoStacks`):**
This is a relatively simpler iterative approach for postorder.

1.  Initialize an empty `result` list. If `root` is `null`, return `result`.
2.  Initialize two stacks: `s1` with the `root` node, and `s2` empty.
3.  Loop while `s1` is not empty:
    *   Pop a node from `s1`. Push its value onto `s2`.
    *   If the popped node has a left child, push it onto `s1`.
    *   If the popped node has a right child, push it onto `s1`.
    *   **Why this order?** This effectively performs a "Root -> Right -> Left" traversal and pushes values onto `s2`. When `s2` is finally reversed, it becomes "Left -> Right -> Root" (postorder).
4.  Return `s2` reversed.

*   **Time Complexity:** O(N).
*   **Space Complexity:** O(N) in the worst case, as `s2` can store all node values and `s1` can also store up to H nodes.

**Iterative Approach (One Stack) (`postorderTraversalIterativeOneStack`):**
This approach is more intricate but generally considered more memory-efficient than the two-stack method, using O(H) space for the stack.

1.  Initialize an empty `result` list. If `root` is `null`, return `result`.
2.  Initialize an empty `stack`, `current` to `root`, and `lastVisitedNode` to `null`.
3.  Loop while `current` is not `null` OR `stack` is not empty:
    *   **Go Left:** While `current` is not `null`, push `current` onto `stack` and move `current = current.left`.
    *   **Peek Node:** Look at the top node of the `stack` (let's call it `peekNode`).
    *   **Check Right Child:** If `peekNode` has a right child AND the right child is NOT the `lastVisitedNode` (meaning we haven't processed it yet):
        *   Set `current = peekNode.right` to explore the right subtree.
    *   **Process Node:** Else (if `peekNode` has no right child, or its right child has already been visited):
        *   Add `peekNode.val` to `result`.
        *   Set `lastVisitedNode = stack.pop()`. (The node is now processed and removed).
        *   Set `current = null` to ensure we don't accidentally re-enter the "Go Left" phase for the same subtree.

*   **Time Complexity:** O(N).
*   **Space Complexity:** O(H).

## 2. Level Order Traversal (BFS)

**Intuition:**
Level order traversal visits all nodes at the current depth before moving to nodes at the next depth. This is a Breadth-First Search (BFS) algorithm. It's often used when you need to process nodes level by level, like finding the minimum depth or the widest level.

**Algorithm (`levelOrderTraversal`):**

1.  Initialize an empty `result` array (to store levels) and a `queue` with the `root` node. If `root` is `null`, return `result`.
2.  Loop while the `queue` is not empty:
    *   Get the `levelSize` (number of nodes currently in the queue), which represents all nodes at the current level.
    *   Initialize an empty `currentLevelNodes` array to store values for this level.
    *   Loop `levelSize` times:
        *   Dequeue a `node` from the front of the `queue`.
        *   Add `node.val` to `currentLevelNodes`.
        *   If `node.left` exists, enqueue it.
        *   If `node.right` exists, enqueue it.
    *   Add `currentLevelNodes` to the `result`.
3.  Return `result`.

*   **Time Complexity:** O(N). Each node is enqueued and dequeued exactly once.
*   **Space Complexity:** O(W), where W is the maximum width of the tree. In the worst case (a complete binary tree), the last level can have N/2 nodes, making it O(N) space.

## 3. Zigzag Level Order Traversal

**Intuition:**
This is a variation of level order traversal where the order of nodes within each level alternates. The first level is left-to-right, the second is right-to-left, the third is left-to-right, and so on.

**Algorithm (`zigzagLevelOrderTraversal`):**

1.  This largely follows the Level Order Traversal structure.
2.  Introduce a boolean flag, `leftToRight`, initialized to `true`.
3.  Inside the main `while (queue.length > 0)` loop:
    *   Process nodes for the current level as in BFS.
    *   When adding `node.val` to `currentLevelNodes`:
        *   If `leftToRight` is `true`, `currentLevelNodes.push(node.val)` (add to end).
        *   If `leftToRight` is `false`, `currentLevelNodes.unshift(node.val)` (add to beginning).
    *   After processing all nodes for the current level, toggle the flag: `leftToRight = !leftToRight`.
4.  Return `result`.

*   **Time Complexity:** O(N). Each node is processed once. The `unshift` operation for right-to-left levels adds an additional O(K) cost for a level with K nodes, resulting in O(N) overall.
*   **Space Complexity:** O(W). Similar to level order, dominated by the queue and the storage for the widest level.

## 4. Maximum Depth of Binary Tree

**Intuition:**
The maximum depth of a binary tree is the number of nodes along the longest path from the root node down to the farthest leaf node. An empty tree has depth 0.

### Recursive Approach (`maxDepthRecursive`):

1.  **Base Case:** If `root` is `null`, return 0.
2.  **Recursive Step:** Recursively calculate the maximum depth of the left subtree (`leftDepth`) and the right subtree (`rightDepth`).
3.  The maximum depth of the current tree is `1` (for the current `root` node itself) plus the maximum of `leftDepth` and `rightDepth`.
    `return 1 + Math.max(leftDepth, rightDepth);`

*   **Time Complexity:** O(N). Each node is visited once.
*   **Space Complexity:** O(H) for the recursion stack. O(N) in worst case, O(log N) in best case.

### Iterative Approach (BFS) (`maxDepthIterativeBFS`):

This leverages the level order traversal idea. Each time we complete a level, we increment the depth count.

1.  If `root` is `null`, return 0.
2.  Initialize a `queue` with `root` and `depth = 0`.
3.  Loop while `queue` is not empty:
    *   Increment `depth` (this indicates we are starting a new level).
    *   Get `levelSize`.
    *   Dequeue `levelSize` nodes, and enqueue their non-null children.
4.  Return `depth`.

*   **Time Complexity:** O(N). Each node is enqueued and dequeued once.
*   **Space Complexity:** O(W), max width of the tree. O(N) in worst case.

## 5. Path Sum III

**Problem Statement:** Given the root of a binary tree and an integer `targetSum`, return the number of paths where the sum of the nodes along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards (parent to child).

### Brute Force DFS (`pathSumIII_BruteForceDFS`):

**Intuition:**
The most straightforward approach is to consider every possible node as a starting point for a path. For each node, perform a DFS to find all downward paths that sum to `targetSum`.

**Algorithm:**

1.  **Main Function `pathSumIII_BruteForceDFS(root, targetSum)`:**
    *   If `root` is `null`, return 0.
    *   Calculate `totalPaths = countPathsFromNode(root, 0)` (paths starting at current root).
    *   Add paths found in the left subtree: `totalPaths += pathSumIII_BruteForceDFS(root.left, targetSum)`.
    *   Add paths found in the right subtree: `totalPaths += pathSumIII_BruteForceDFS(root.right, targetSum)`.
    *   Return `totalPaths`.

2.  **Helper Function `countPathsFromNode(node, currentSum)`:**
    *   If `node` is `null`, return 0.
    *   Update `currentSum += node.val`.
    *   Initialize `count = 0`. If `currentSum === targetSum`, increment `count`.
    *   Recursively call for left and right children:
        *   `count += countPathsFromNode(node.left, currentSum)`
        *   `count += countPathsFromNode(node.right, currentSum)`
    *   Return `count`.

*   **Time Complexity:** O(N^2) in the worst case (a skewed tree). For each of N nodes, `countPathsFromNode` can traverse up to N nodes downwards. For a balanced tree, it's closer to O(N log N) because the average path length is O(log N).
*   **Space Complexity:** O(H) for the recursion stack.

### Optimized DFS with Prefix Sums (`pathSumIII_OptimizedDFS`):

**Intuition:**
This is a classic technique for "subarray sum equals K" problems, adapted for trees. We use a hash map (or dictionary) to store the frequency of prefix sums encountered along the current path from the root.

When we are at a node, say with `currentSum` from the root, we want to find if there was any ancestor node `A` such that the sum from `A` to the current node is `targetSum`. This means:
`currentSum - sum(path_from_root_to_A_exclusive) = targetSum`
Rearranging: `sum(path_from_root_to_A_exclusive) = currentSum - targetSum`.

So, we check if `currentSum - targetSum` exists in our `prefixSumCount` map. If it does, every occurrence of that `prefixSum` indicates a valid path ending at the current node.

**Algorithm:**

1.  Initialize `count = 0` (global to the DFS or passed by reference/closure).
2.  Initialize a `prefixSumCount` map: `Map<number, number>`. Add `(0, 1)` to it. This handles paths that start from the root itself and sum up to `targetSum`.

3.  **DFS Helper Function `dfs(node, currentSum)`:**
    *   If `node` is `null`, return.
    *   Update `currentSum += node.val`.
    *   **Check for paths:** If `prefixSumCount.has(currentSum - targetSum)`, add `prefixSumCount.get(currentSum - targetSum)` to `count`.
    *   **Update prefix sum map:** Increment the count for `currentSum` in the map: `prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1)`.
    *   **Recurse:** Call `dfs` for `node.left` and `node.right` with the updated `currentSum`.
    *   **Backtrack:** After returning from children (i.e., when leaving the current node's path), decrement the count for `currentSum` in the map: `prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1)`. This is critical because `prefixSumCount` should only reflect sums along the *current* active path from the root.

4.  Call `dfs(root, 0)` initially.
5.  Return `count`.

*   **Time Complexity:** O(N). Each node is visited once. Map operations (set, get, has) are O(1) on average.
*   **Space Complexity:** O(H) for the recursion stack and the hash map. The map stores at most H distinct prefix sums at any given time, as sums are added and removed as we traverse up and down the tree. O(N) in worst case, O(log N) in best case.

---
**Comparison of Brute-Force vs. Optimized (Path Sum III):**
The optimized solution using prefix sums significantly improves time complexity from O(N^2) (or O(N log N) for balanced trees) to O(N). This is a crucial optimization for larger trees and a common pattern in interview problems. The space complexity remains similar (O(H)) because both approaches rely on recursion, but the optimized solution also uses additional space for the hash map, which is bounded by H.