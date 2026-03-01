```markdown
# Tree Traversal Algorithms and Problem Solutions

This document provides detailed explanations of fundamental binary tree traversal algorithms (DFS and BFS variants) and their application to solve common interview problems.

---

## I. Fundamental Traversal Algorithms

Tree traversals are methods for visiting each node in a tree data structure exactly once. There are two main categories: Depth-First Search (DFS) and Breadth-First Search (BFS).

### A. Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. For binary trees, there are three common DFS traversals, named by the relative order in which the root node is visited compared to its left and right subtrees.

#### 1. Inorder Traversal (Left -> Root -> Right)
- **Purpose**: Primarily used with Binary Search Trees (BSTs) because it visits nodes in non-decreasing order.
- **Recursive Logic**:
    1. Recursively traverse the left subtree.
    2. Visit the current node (process its value).
    3. Recursively traverse the right subtree.
- **Iterative Logic (using a Stack)**:
    1. Initialize an empty stack and set `current` to the `root`.
    2. Loop while `current` is not null OR the stack is not empty:
        a. While `current` is not null, push `current` onto the stack and move `current = current.left`. This pushes all left ancestors onto the stack.
        b. When `current` becomes null (meaning we've gone as far left as possible), pop a node from the stack. This is the leftmost unvisited node or a node whose left subtree has been fully visited. Visit this popped node.
        c. Move `current = popped.right` to explore its right subtree.
- **Time Complexity**: O(N) for N nodes. Each node is visited once.
- **Space Complexity**: O(H) for H tree height (recursion stack or explicit stack). Worst case O(N) for skewed tree, best case O(logN) for balanced tree.

**Example (Inorder):**
Tree:
    4
   / \
  2   5
 / \
1   3
Traversal: `[1, 2, 3, 4, 5]`

#### 2. Preorder Traversal (Root -> Left -> Right)
- **Purpose**: Useful for creating a copy of the tree or for prefix expressions.
- **Recursive Logic**:
    1. Visit the current node.
    2. Recursively traverse the left subtree.
    3. Recursively traverse the right subtree.
- **Iterative Logic (using a Stack)**:
    1. Initialize an empty stack and an empty result list.
    2. If `root` is null, return. Push `root` onto the stack.
    3. While the stack is not empty:
        a. Pop a node. Visit it (add to result).
        b. Push its right child onto the stack (if exists).
        c. Push its left child onto the stack (if exists). (Push right before left because stack is LIFO, so left is processed first).
- **Time Complexity**: O(N).
- **Space Complexity**: O(H).

**Example (Preorder):**
Tree:
    4
   / \
  2   5
 / \
1   3
Traversal: `[4, 2, 1, 3, 5]`

#### 3. Postorder Traversal (Left -> Right -> Root)
- **Purpose**: Used for deleting a tree (delete children before parent) or for postfix expressions.
- **Recursive Logic**:
    1. Recursively traverse the left subtree.
    2. Recursively traverse the right subtree.
    3. Visit the current node.
- **Iterative Logic (using two Stacks)**:
    1. Initialize `stack1` with the `root`. `stack2` empty.
    2. While `stack1` is not empty:
        a. Pop a node from `stack1` and push it onto `stack2`.
        b. Push the popped node's left child onto `stack1` (if exists).
        c. Push the popped node's right child onto `stack1` (if exists).
    3. While `stack2` is not empty, pop nodes and add to result. (This reverses the order in `stack2` from Root-Right-Left to Left-Right-Root).
- **Time Complexity**: O(N).
- **Space Complexity**: O(N) in worst case (two stacks can store all nodes).

**Example (Postorder):**
Tree:
    4
   / \
  2   5
 / \
1   3
Traversal: `[1, 3, 2, 5, 4]`

### B. Breadth-First Search (BFS) / Level Order Traversal

BFS explores all nodes at the current depth level before moving on to nodes at the next depth level.

- **Purpose**: Finding the shortest path in an unweighted graph, level-by-level processing.
- **Logic (using a Queue)**:
    1. Initialize an empty queue and add the `root`.
    2. Loop while the queue is not empty:
        a. Get the `levelSize` (number of nodes at the current level).
        b. Create a list to store nodes of the current level.
        c. For `i` from 0 to `levelSize - 1`:
            i. Dequeue a node.
            ii. Add its value to the current level's list.
            iii. Enqueue its left child (if exists).
            iv. Enqueue its right child (if exists).
        d. Add the current level's list to the overall result.
- **Time Complexity**: O(N).
- **Space Complexity**: O(W) for maximum width W of the tree. Worst case O(N) (e.g., a complete binary tree where the last level holds N/2 nodes).

**Example (Level Order):**
Tree:
    4
   / \
  2   5
 / \
1   3
Traversal: `[[4], [2, 5], [1, 3]]`

---

## II. Problem Solutions

### Problem 1: Maximum Depth of Binary Tree

**Description**: Find the number of nodes along the longest path from the root node down to the farthest leaf node.

**Approach 1: Recursive Depth-First Search (DFS)**
- **Logic**: The depth of a node is `1 + max(depth(left_subtree), depth(right_subtree))`. Base case is `0` for a null node.
- **Time Complexity**: O(N).
- **Space Complexity**: O(H) for recursion stack.

**Approach 2: Iterative Breadth-First Search (BFS)**
- **Logic**: Perform a level-order traversal. Each time you complete a level, increment a depth counter. The final depth is the maximum depth.
- **Time Complexity**: O(N).
- **Space Complexity**: O(W) for the queue.

Both approaches are optimal, but DFS often feels more natural for depth problems due to its recursive definition. BFS avoids deep recursion stacks, which can be an advantage for extremely deep trees.

### Problem 2: Binary Tree Zigzag Level Order Traversal

**Description**: Return the level order traversal with alternating directions: left-to-right for level 0, right-to-left for level 1, left-to-right for level 2, and so on.

**Approach 1: Iterative BFS with Direction Flag**
- **Logic**: Use a standard BFS (queue) to process nodes level by level. Maintain a `level` counter or a boolean `leftToRight` flag. For each level:
    - Collect all nodes into a temporary list.
    - If `leftToRight` is true (even level), add collected nodes to the result as is.
    - If `leftToRight` is false (odd level), reverse the temporary list before adding to the result.
    - Alternatively, use `unshift()` for odd levels and `push()` for even levels directly into the temporary level list, then add the list.
- **Time Complexity**: O(N) if using a proper Deque or a list where `unshift` is O(1). If using JS array `unshift`, it can be O(N) due to array shifting, making worst-case O(N^2) for extremely wide levels. However, for typical interview scenarios, it's often considered O(N) as amortized costs might be lower or N is not large enough to hit worst case.
- **Space Complexity**: O(W) for the queue and temporary list.

### Problem 3: Count Good Nodes in Binary Tree

**Description**: A node `X` is "good" if its value is greater than or equal to all values on the path from the root to `X`. Count all good nodes.

**Approach 1: Recursive Depth-First Search (DFS)**
- **Logic**: This is a classic DFS problem where information (the maximum value encountered `maxValSoFar`) needs to be passed down the recursive calls.
    1. Define a `dfs(node, maxValSoFar)` helper.
    2. Base case: If `node` is null, return.
    3. If `node.val >= maxValSoFar`, increment a global/closure counter.
    4. Update `maxValSoFar = Math.max(maxValSoFar, node.val)`.
    5. Recursively call `dfs(node.left, newMaxVal)` and `dfs(node.right, newMaxVal)`.
    6. Start the DFS from `root` with `root.val` as the initial `maxValSoFar` (as root is always good).
- **Time Complexity**: O(N).
- **Space Complexity**: O(H) for recursion stack.

### Problem 4: Path Sum III

**Description**: Find the number of paths where the sum of nodes' values equals `targetSum`. Paths can start anywhere and end anywhere (must go downwards).

**Approach 1: Recursive DFS with Nested DFS (Brute Force)**
- **Logic**: This approach has two main parts:
    1. An outer DFS (`pathSum`) that traverses every node in the tree. For each node, it treats that node as a potential *starting point* of a valid path.
    2. An inner DFS (`countPathsFromNode`) that, given a `startingNode` and a `currentSum`, recursively explores all downward paths from `startingNode` and counts how many sum up to `targetSum`.
- **Time Complexity**: O(N^2) in the worst case (skewed tree). Each node `N` can start a path, and each path can go `N` nodes deep.
- **Space Complexity**: O(H) for recursion stack.

**Approach 2: Optimized DFS with Prefix Sums (using a Map)**
- **Logic**: This is a more efficient approach (O(N)) using a technique similar to finding subarray sums.
    1. Maintain a `Map<sum, count>` to store the frequency of prefix sums encountered from the actual root to the current node.
    2. Initialize `prefixSumCounts.set(0, 1)` to handle paths starting from the root.
    3. During a single DFS traversal:
        a. Calculate `currentSum` (sum from root to current node).
        b. Check if `(currentSum - targetSum)` exists in `prefixSumCounts`. If it does, add its count to `totalPaths`. This means we found a segment `X...current_node` that sums to `targetSum`.
        c. Increment count for `currentSum` in `prefixSumCounts`.
        d. Recurse for children.
        e. **Backtrack**: Decrement count for `currentSum` in `prefixSumCounts` after returning from children. This is crucial because `currentSum` is no longer part of the active path when exploring other branches.
- **Time Complexity**: O(N) on average (due to Map operations being O(1)).
- **Space Complexity**: O(H) for recursion stack and `prefixSumCounts` map (can store up to H distinct sums).

---
```