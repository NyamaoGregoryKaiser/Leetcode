```markdown
# Algorithm Explanation and Complexity Analysis for Tree Traversals

This document provides detailed explanations for the tree traversal algorithms implemented in this project, including their logic, step-by-step process, and time/space complexity analysis.

## Table of Contents
1.  [General Tree Traversal Concepts](#1-general-tree-traversal-concepts)
2.  [Problem 1: Standard DFS Traversals](#2-problem-1-standard-dfs-traversals)
    *   [Inorder Traversal](#inorder-traversal)
    *   [Preorder Traversal](#preorder-traversal)
    *   [Postorder Traversal](#postorder-traversal)
3.  [Problem 2: Level Order Traversal (BFS)](#3-problem-2-level-order-traversal-bfs)
    *   [Basic Level Order](#basic-level-order)
    *   [Level Order with Levels Separated](#level-order-with-levels-separated)
4.  [Problem 3: Zigzag Level Order Traversal](#4-problem-3-zigzag-level-order-traversal)
5.  [Problem 4: Boundary Traversal](#5-problem-4-boundary-traversal)
6.  [Problem 5: Kth Smallest Element in a BST](#6-problem-5-kth-smallest-element-in-a-bst)

---

## 1. General Tree Traversal Concepts

Tree traversals are methods for visiting each node in a tree data structure exactly once. They are broadly categorized into:

*   **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. Typically implemented using recursion or an explicit stack.
    *   Inorder, Preorder, Postorder.
*   **Breadth-First Search (BFS):** Explores all nodes at the current depth level before moving on to nodes at the next depth level. Typically implemented using a queue.
    *   Level Order.

**Common Complexity Notations:**
*   `N`: Number of nodes in the tree.
*   `H`: Height of the tree.
    *   For a balanced tree, `H` is approximately `log N`.
    *   For a skewed tree (e.g., a linked list), `H` is `N`.
*   `W`: Maximum width of the tree (maximum number of nodes at any single level).
    *   For a complete binary tree, `W` is approximately `N/2`.

## 2. Problem 1: Standard DFS Traversals

These traversals differ only in the order in which they visit the root node relative to its left and right subtrees.

### Inorder Traversal (Left -> Root -> Right)

Visits the left child, then the parent, then the right child.
For a Binary Search Tree (BST), this traversal retrieves elements in non-decreasing (sorted) order.

#### Example Tree:
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

**Inorder Result:** `[4, 2, 5, 1, 6, 3, 7]`

#### Approach 1: Recursive
*   **Logic:**
    1.  Recursively traverse the left subtree.
    2.  Visit the current node (add its value to the result).
    3.  Recursively traverse the right subtree.
    *   Base case: If the current node is `nullptr`, return.
*   **C++ Code Snippet (from `problems.cpp`):**
    ```cpp
    void _inorderRecursive(TreeNode* node, std::vector<int>& result) {
        if (node == nullptr) {
            return;
        }
        _inorderRecursive(node->left, result);
        result.push_back(node->val);
        _inorderRecursive(node->right, result);
    }
    ```
*   **Complexity Analysis:**
    *   **Time:** O(N) - Each node is visited exactly once.
    *   **Space:** O(H) - Due to the recursion stack. In the worst case (skewed tree), this can be O(N).

#### Approach 2: Iterative (using a stack)
*   **Logic:**
    1.  Initialize an empty stack and a `current` pointer to the root.
    2.  While `current` is not `nullptr` OR the stack is not empty:
        *   Keep pushing `current` and its left children onto the stack until `current` becomes `nullptr`. This gets us to the leftmost node.
        *   Pop a node from the stack. This is the next node in inorder sequence. Add its value to the result.
        *   Move `current` to the popped node's right child to explore its right subtree.
*   **C++ Code Snippet (from `problems.cpp`):**
    ```cpp
    std::vector<int> _inorderIterative(TreeNode* root) {
        std::vector<int> result;
        std::stack<TreeNode*> s;
        TreeNode* current = root;
        while (current != nullptr || !s.empty()) {
            while (current != nullptr) {
                s.push(current);
                current = current->left;
            }
            current = s.top();
            s.pop();
            result.push_back(current->val);
            current = current->right;
        }
        return result;
    }
    ```
*   **Complexity Analysis:**
    *   **Time:** O(N) - Each node is pushed and popped from the stack once.
    *   **Space:** O(H) - In the worst case (skewed tree), the stack can hold up to `N` nodes, so O(N). For a balanced tree, it's O(log N).

### Preorder Traversal (Root -> Left -> Right)

Visits the parent, then its left child, then its right child.
Useful for copying a tree or for generating prefix expressions of expression trees.

#### Example Tree:
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

**Preorder Result:** `[1, 2, 4, 5, 3, 6, 7]`

#### Approach 1: Recursive
*   **Logic:**
    1.  Visit the current node (add its value to the result).
    2.  Recursively traverse the left subtree.
    3.  Recursively traverse the right subtree.
    *   Base case: If the current node is `nullptr`, return.
*   **C++ Code Snippet:**
    ```cpp
    void _preorderRecursive(TreeNode* node, std::vector<int>& result) {
        if (node == nullptr) {
            return;
        }
        result.push_back(node->val);
        _preorderRecursive(node->left, result);
        _preorderRecursive(node->right, result);
    }
    ```
*   **Complexity Analysis:** Same as Inorder Recursive: O(N) time, O(H) space.

#### Approach 2: Iterative (using a stack)
*   **Logic:**
    1.  Initialize an empty stack and push the root onto it.
    2.  While the stack is not empty:
        *   Pop a node from the stack. Visit it (add its value to the result).
        *   Push its right child onto the stack (if exists).
        *   Push its left child onto the stack (if exists).
        *   Note: Push right first, then left, because stack is LIFO, so left will be processed before right.
*   **C++ Code Snippet:**
    ```cpp
    std::vector<int> _preorderIterative(TreeNode* root) {
        std::vector<int> result;
        if (root == nullptr) return result;
        std::stack<TreeNode*> s;
        s.push(root);
        while (!s.empty()) {
            TreeNode* current = s.top();
            s.pop();
            result.push_back(current->val);
            if (current->right != nullptr) s.push(current->right);
            if (current->left != nullptr) s.push(current->left);
        }
        return result;
    }
    ```
*   **Complexity Analysis:** Same as Inorder Iterative: O(N) time, O(H) space.

### Postorder Traversal (Left -> Right -> Root)

Visits the left child, then its right child, then the parent.
Useful for deleting a tree (ensures children are deleted before parent) or for generating postfix expressions.

#### Example Tree:
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

**Postorder Result:** `[4, 5, 2, 6, 7, 3, 1]`

#### Approach 1: Recursive
*   **Logic:**
    1.  Recursively traverse the left subtree.
    2.  Recursively traverse the right subtree.
    3.  Visit the current node (add its value to the result).
    *   Base case: If the current node is `nullptr`, return.
*   **C++ Code Snippet:**
    ```cpp
    void _postorderRecursive(TreeNode* node, std::vector<int>& result) {
        if (node == nullptr) {
            return;
        }
        _postorderRecursive(node->left, result);
        _postorderRecursive(node->right, result);
        result.push_back(node->val);
    }
    ```
*   **Complexity Analysis:** Same as Inorder Recursive: O(N) time, O(H) space.

#### Approach 2: Iterative (using two stacks)
*   **Logic:**
    1.  Initialize two stacks, `s1` and `s2`. Push the root to `s1`.
    2.  While `s1` is not empty:
        *   Pop a node from `s1`, say `current`. Push `current` to `s2`.
        *   Push `current`'s left child to `s1` (if exists).
        *   Push `current`'s right child to `s1` (if exists).
    3.  After `s1` is empty, `s2` contains nodes in reverse postorder. Pop all nodes from `s2` and add to the result.
    *   This works because `s1` processes nodes in Root->Right->Left order, so `s2` receives them in Root->Right->Left, which means when `s2` is popped, it's Left->Right->Root (Postorder).
*   **C++ Code Snippet:**
    ```cpp
    std::vector<int> _postorderIterativeTwoStacks(TreeNode* root) {
        std::vector<int> result;
        if (root == nullptr) return result;
        std::stack<TreeNode*> s1, s2;
        s1.push(root);
        while (!s1.empty()) {
            TreeNode* current = s1.top();
            s1.pop();
            s2.push(current);
            if (current->left != nullptr) s1.push(current->left);
            if (current->right != nullptr) s1.push(current->right);
        }
        while (!s2.empty()) {
            result.push_back(s2.top()->val);
            s2.pop();
        }
        return result;
    }
    ```
*   **Complexity Analysis:** O(N) time, O(N) space (two stacks can hold all nodes in worst case).

## 3. Problem 2: Level Order Traversal (BFS)

Visits all nodes at the current level before moving to the next level. Always processes from left to right within a level.

#### Example Tree:
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

### Basic Level Order

**Result:** `[1, 2, 3, 4, 5, 6, 7]`

#### Approach: Using a queue
*   **Logic:**
    1.  Initialize an empty queue and add the root.
    2.  While the queue is not empty:
        *   Dequeue a node. Visit it.
        *   Enqueue its left child (if exists).
        *   Enqueue its right child (if exists).
*   **C++ Code Snippet:**
    ```cpp
    std::vector<int> levelOrderTraversal(TreeNode* root) {
        std::vector<int> result;
        if (root == nullptr) return result;
        std::queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* current = q.front();
            q.pop();
            result.push_back(current->val);
            if (current->left != nullptr) q.push(current->left);
            if (current->right != nullptr) q.push(current->right);
        }
        return result;
    }
    ```
*   **Complexity Analysis:**
    *   **Time:** O(N) - Each node is enqueued and dequeued once.
    *   **Space:** O(W) - In the worst case (a complete binary tree), the queue can hold up to `N/2` nodes, so O(N).

### Level Order with Levels Separated

**Result:** `[[1], [2, 3], [4, 5, 6, 7]]`

#### Approach: Modified queue-based BFS
*   **Logic:**
    1.  Initialize an empty queue and add the root.
    2.  While the queue is not empty:
        *   Get the `level_size` (number of nodes currently in the queue, which represents the nodes at the *current* level).
        *   Create a temporary vector `current_level_nodes`.
        *   Loop `level_size` times:
            *   Dequeue a node. Add its value to `current_level_nodes`.
            *   Enqueue its left child (if exists).
            *   Enqueue its right child (if exists).
        *   Add `current_level_nodes` to the main result vector.
*   **C++ Code Snippet:**
    ```cpp
    std::vector<std::vector<int>> levelOrderTraversal_LevelsSeparated(TreeNode* root) {
        std::vector<std::vector<int>> result;
        if (root == nullptr) return result;
        std::queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int level_size = q.size();
            std::vector<int> current_level_nodes;
            for (int i = 0; i < level_size; ++i) {
                TreeNode* current = q.front();
                q.pop();
                current_level_nodes.push_back(current->val);
                if (current->left != nullptr) q.push(current->left);
                if (current->right != nullptr) q.push(current->right);
            }
            result.push_back(current_level_nodes);
        }
        return result;
    }
    ```
*   **Complexity Analysis:** Same as basic Level Order: O(N) time, O(W) space (worst case O(N)).

## 4. Problem 3: Zigzag Level Order Traversal

Traverses nodes level by level, alternating direction: L->R for level 0, R->L for level 1, L->R for level 2, etc.

#### Example Tree:
```
        3
       / \
      9  20
         /  \
        15   7
```

**Zigzag Result:** `[[3], [20, 9], [15, 7]]`

#### Approach: BFS with a flag and `std::reverse`
*   **Logic:**
    1.  Use a standard queue for BFS. Maintain a boolean flag, `left_to_right`, initialized to `true`.
    2.  In each level iteration:
        *   Collect all nodes for the current level into a `current_level_nodes` vector (always from left to right, as produced by the queue).
        *   If `left_to_right` is `false` (meaning the current level should be R->L), `std::reverse` the `current_level_nodes` vector.
        *   Add `current_level_nodes` to the result.
        *   Toggle `left_to_right` for the next level.
*   **C++ Code Snippet:**
    ```cpp
    std::vector<std::vector<int>> zigzagLevelOrder(TreeNode* root) {
        std::vector<std::vector<int>> result;
        if (root == nullptr) return result;
        std::queue<TreeNode*> q;
        q.push(root);
        bool left_to_right = true;
        while (!q.empty()) {
            int level_size = q.size();
            std::vector<int> current_level_nodes;
            for (int i = 0; i < level_size; ++i) {
                TreeNode* current = q.front();
                q.pop();
                current_level_nodes.push_back(current->val);
                if (current->left != nullptr) q.push(current->left);
                if (current->right != nullptr) q.push(current->right);
            }
            if (!left_to_right) {
                std::reverse(current_level_nodes.begin(), current_level_nodes.end());
            }
            result.push_back(current_level_nodes);
            left_to_right = !left_to_right;
        }
        return result;
    }
    ```
*   **Complexity Analysis:**
    *   **Time:** O(N) - Each node is visited once. Reversing a vector of size `K` takes O(K), and sum of `K` for all levels is `N`.
    *   **Space:** O(W) - Same as Level Order, queue can hold up to `W` nodes. Plus, the `current_level_nodes` vector can also hold up to `W` nodes. Worst case O(N).

## 5. Problem 4: Boundary Traversal

The boundary traversal of a binary tree is the traversal of:
1.  Left boundary nodes (from root to the leftmost leaf, excluding the leaf).
2.  All leaf nodes (from left to right).
3.  Right boundary nodes (from the rightmost leaf up to the root, excluding the leaf).
The root node is part of the boundary. If the root is also a leaf, it's the only node in the traversal.

#### Example Tree:
```
         1
        / \
       2   3
      / \   \
     4   5   6
    /         \
   7           8
```

**Boundary Result:** `[1, 2, 4, 7, 5, 8, 6, 3]`

#### Approach: Combination of DFS
*   **Logic:**
    1.  Add the root node to the result (if not null).
    2.  Traverse the left boundary: Start from `root->left`. Keep going left until a leaf or `nullptr` is encountered. Add non-leaf nodes to the result. If a node has no left child, move to its right child to continue the left boundary.
    3.  Traverse all leaf nodes: Perform a standard DFS (preorder or inorder works) to find all leaves in left-to-right order. Add them to the result.
    4.  Traverse the right boundary: Start from `root->right`. Keep going right until a leaf or `nullptr` is encountered. Add non-leaf nodes to a temporary list. If a node has no right child, move to its left child to continue the right boundary. Reverse this temporary list and add its elements to the main result.
    *   Careful handling of edge cases (empty tree, single node tree, skewed trees) is crucial. Ensure no duplicate nodes are added (e.g., if a node is both a left boundary node and a leaf). The root is typically handled separately.
*   **C++ Code Snippet (from `problems.cpp`, simplified):**
    ```cpp
    std::vector<int> boundaryTraversal(TreeNode* root) {
        std::vector<int> result;
        if (root == nullptr) return result;

        result.push_back(root->val); // Add root

        if (root->left == nullptr && root->right == nullptr) return result; // Single node case

        // Add left boundary (excluding root and leaves)
        // _addLeftBoundary logic: node->val then recurse (left child preferred)
        _addLeftBoundary(root->left, result);

        // Add leaves
        // _addLeaves logic: if leaf, add; else recurse (left then right)
        _addLeaves(root->left, result);
        _addLeaves(root->right, result);

        // Add right boundary (excluding root and leaves, then reverse)
        // _addRightBoundary logic: recurse (right child preferred) then node->val
        std::vector<int> right_boundary_nodes;
        _addRightBoundary(root->right, right_boundary_nodes);
        std::reverse(right_boundary_nodes.begin(), right_boundary_nodes.end());
        result.insert(result.end(), right_boundary_nodes.begin(), right_boundary_nodes.end());

        return result;
    }

    // Helper functions _addLeftBoundary, _addLeaves, _addRightBoundary defined in problems.cpp
    ```
*   **Complexity Analysis:**
    *   **Time:** O(N) - Each node is visited at most a constant number of times across the three phases.
    *   **Space:** O(H) - Recursion stack for DFS parts. Temporary vector for right boundary nodes also max O(H) in skewed tree. Worst case O(N).

## 6. Problem 5: Kth Smallest Element in a BST

Finds the `k`-th smallest element in a Binary Search Tree.

#### Example BST:
```
        8
       / \
      3  10
     / \   \
    1   6   14
       / \
      4   7
```

**Inorder Traversal:** `[1, 3, 4, 6, 7, 8, 10, 14]`
If `k=3`, result is `4`. If `k=5`, result is `7`.

#### Approach 1: Recursive Inorder Traversal
*   **Logic:**
    1.  Perform a standard inorder traversal.
    2.  Maintain a counter. Every time a node is "visited" (i.e., its value is added to the result in an inorder traversal), decrement `k`.
    3.  When `k` becomes 0, that node's value is the `k`-th smallest. Stop further traversal.
*   **C++ Code Snippet:**
    ```cpp
    void _kthSmallestRecursiveHelper(TreeNode* node, int& k, int& result) {
        if (node == nullptr || k == 0) return; // Optimization: stop if k is 0

        _kthSmallestRecursiveHelper(node->left, k, result);

        if (k > 0) { // Only process if not found yet
            k--;
            if (k == 0) {
                result = node->val;
                return; // Found it, can return early
            }
        }

        _kthSmallestRecursiveHelper(node->right, k, result);
    }
    ```
*   **Complexity Analysis:**
    *   **Time:** O(H + k) in the best case (when `k` is small, only traverses a portion of the tree). Worst case O(N) if `k` is close to `N` or tree is skewed.
    *   **Space:** O(H) for the recursion stack. Worst case O(N).

#### Approach 2: Iterative Inorder Traversal
*   **Logic:**
    1.  Use the iterative inorder traversal algorithm (described above).
    2.  Instead of adding to a result vector, simply decrement `k` each time a node is popped from the stack and "visited".
    3.  When `k` becomes 0, return the value of the currently visited node.
*   **C++ Code Snippet:**
    ```cpp
    int _kthSmallestIterativeHelper(TreeNode* root, int k) {
        std::stack<TreeNode*> s;
        TreeNode* current = root;
        while (current != nullptr || !s.empty()) {
            while (current != nullptr) {
                s.push(current);
                current = current->left;
            }
            current = s.top();
            s.pop();
            k--;
            if (k == 0) {
                return current->val; // Found the Kth smallest
            }
            current = current->right;
        }
        return -1; // k is out of bounds
    }
    ```
*   **Complexity Analysis:**
    *   **Time:** O(H + k) in the best case. Worst case O(N).
    *   **Space:** O(H) for the explicit stack. Worst case O(N).

---
```