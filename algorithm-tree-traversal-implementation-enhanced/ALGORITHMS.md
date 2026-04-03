# ALGORITHMS.md: Detailed Algorithm Explanations for Tree Traversals

This document provides in-depth explanations of the algorithms implemented in this project, covering the fundamental concepts, recursive and iterative approaches, and specific logic for each problem.

## Table of Contents
1.  [Binary Tree Basics](#binary-tree-basics)
2.  [Depth-First Search (DFS) Traversals](#depth-first-search-dfs-traversals)
    *   [Preorder Traversal](#preorder-traversal)
    *   [Inorder Traversal](#inorder-traversal)
    *   [Postorder Traversal](#postorder-traversal)
    *   [Recursive vs. Iterative DFS](#recursive-vs-iterative-dfs)
3.  [Breadth-First Search (BFS) Traversals](#breadth-first-search-bfs-traversals)
    *   [Level Order Traversal](#level-order-traversal)
    *   [Zigzag Level Order Traversal](#zigzag-level-order-traversal)
4.  [Problem-Specific Algorithms](#problem-specific-algorithms)
    *   [Validate Binary Search Tree](#validate-binary-search-tree)
    *   [Serialize and Deserialize Binary Tree](#serialize-and-deserialize-binary-tree)
5.  [Time and Space Complexity](#time-and-space-complexity)

---

## 1. Binary Tree Basics

A **Binary Tree** is a tree data structure in which each node has at most two children, referred to as the left child and the right child.

```ascii
      1
     / \
    2   3
   / \
  4   5
```

*   **Root**: The topmost node of the tree (1).
*   **Leaf**: A node with no children (4, 5, 3).
*   **Parent**: A node that has one or more children (1 is parent of 2 and 3; 2 is parent of 4 and 5).
*   **Child**: A node connected to a parent node.
*   **Subtree**: A tree formed by a node and all its descendants.
*   **Depth of a node**: The number of edges from the root to the node.
*   **Height of a tree**: The maximum depth of any node in the tree.

## 2. Depth-First Search (DFS) Traversals

DFS algorithms explore as far as possible along each branch before backtracking. There are three common ways to perform DFS on a binary tree, differing only in the order the root node is processed relative to its left and right subtrees.

All DFS traversals have a **Time Complexity** of O(N), where N is the number of nodes, as each node is visited exactly once.
The **Space Complexity** for recursive versions is O(H) due to the call stack, where H is the height of the tree. In the worst case (skewed tree), H can be N, so O(N). For iterative versions using an explicit stack, it's also O(H) in the worst case.

### Preorder Traversal (Root -> Left -> Right)

In a preorder traversal, the root node is visited first, then the left subtree, and finally the right subtree.

```ascii
      1
     / \
    2   3
   / \
  4   5

Traversal Order: 1, 2, 4, 5, 3
```

*   **Use Cases**:
    *   Creating a copy of the tree.
    *   Prefix expressions (e.g., `+ A B`).

#### Recursive Approach
1.  Visit the current node (add its value to the result).
2.  Recursively traverse the left subtree.
3.  Recursively traverse the right subtree.

#### Iterative Approach (using a Stack)
1.  Initialize an empty stack and add the root node to it.
2.  While the stack is not empty:
    a.  Pop a node from the stack.
    b.  Visit this node (add its value to the result).
    c.  Push the right child onto the stack (if not null).
    d.  Push the left child onto the stack (if not null).
    *   *Note*: Right child is pushed first so that left child is processed before right (LIFO).

### Inorder Traversal (Left -> Root -> Right)

In an inorder traversal, the left subtree is visited first, then the root node, and finally the right subtree. For a Binary Search Tree (BST), inorder traversal visits nodes in non-decreasing order.

```ascii
      1
     / \
    2   3
   / \
  4   5

Traversal Order: 4, 2, 5, 1, 3
```

*   **Use Cases**:
    *   Retrieving sorted elements from a BST.
    *   Evaluating infix expressions (e.g., `A + B`).

#### Recursive Approach
1.  Recursively traverse the left subtree.
2.  Visit the current node (add its value to the result).
3.  Recursively traverse the right subtree.

#### Iterative Approach (using a Stack)
1.  Initialize an empty stack and set `current` to the root.
2.  While `current` is not null or the stack is not empty:
    a.  While `current` is not null:
        i.  Push `current` onto the stack.
        ii. Set `current = current->left`.
    b.  Pop a node from the stack.
    c.  Visit this node (add its value to the result).
    d.  Set `current = popped_node->right`.

### Postorder Traversal (Left -> Right -> Root)

In a postorder traversal, the left subtree is visited first, then the right subtree, and finally the root node.

```ascii
      1
     / \
    2   3
   / \
  4   5

Traversal Order: 4, 5, 2, 3, 1
```

*   **Use Cases**:
    *   Deleting a tree (delete children before parent).
    *   Postfix expressions (e.g., `A B +`).

#### Recursive Approach
1.  Recursively traverse the left subtree.
2.  Recursively traverse the right subtree.
3.  Visit the current node (add its value to the result).

#### Iterative Approach (using two Stacks)
1.  Initialize two empty stacks, `s1` and `s2`.
2.  Push the root node onto `s1`.
3.  While `s1` is not empty:
    a.  Pop a node from `s1`.
    b.  Push this node onto `s2`.
    c.  Push the left child onto `s1` (if not null).
    d.  Push the right child onto `s1` (if not null).
4.  While `s2` is not empty:
    a.  Pop a node from `s2`.
    b.  Visit this node (add its value to the result).
    *   *Explanation*: This approach effectively reverses the Preorder traversal (Root -> Right -> Left), which when reversed again gives Left -> Right -> Root.

#### Iterative Approach (using one Stack - more complex)
This approach is more intricate, requiring checking if the right child has been visited or if the current node is a leaf before processing the root. It's generally less intuitive than the two-stack method for interviews.

### Recursive vs. Iterative DFS

*   **Recursive**:
    *   **Pros**: Often more concise and easier to write, especially for beginners. Directly mirrors the mathematical definition of tree traversals.
    *   **Cons**: Uses the call stack, which can lead to Stack Overflow for very deep trees (large N for skewed trees).
    *   **Space**: O(H) due to call stack.
*   **Iterative**:
    *   **Pros**: Avoids stack overflow issues (uses an explicit stack on the heap). More control over the traversal process.
    *   **Cons**: Can be more complex to implement, especially Postorder with one stack. Requires careful management of the explicit stack.
    *   **Space**: O(H) for explicit stack.

Both are generally equally performant in terms of time complexity O(N). The choice often depends on personal preference, language features, and specific constraints (e.g., extremely deep trees where stack limits might be hit).

## 3. Breadth-First Search (BFS) Traversals

BFS algorithms explore all nodes at the current depth level before moving on to nodes at the next depth level. For trees, this is commonly called Level Order Traversal.

All BFS traversals have a **Time Complexity** of O(N), where N is the number of nodes, as each node is visited exactly once.
The **Space Complexity** for BFS is O(W) in the worst case, where W is the maximum width of the tree. For a complete binary tree, W can be N/2, so O(N).

### Level Order Traversal (BFS)

Nodes are visited level by level, from left to right within each level.

```ascii
      1
     / \
    2   3
   / \
  4   5

Traversal Order: 1, 2, 3, 4, 5
```

*   **Use Cases**:
    *   Finding the shortest path in an unweighted graph (trees are a special type of graph).
    *   Problems that require processing nodes level by level (e.g., finding tree height, perfect binary tree check).

#### Algorithm (using a Queue)
1.  Initialize an empty queue and add the root node to it.
2.  While the queue is not empty:
    a.  Get the number of nodes `level_size` currently in the queue (this is the number of nodes at the current level).
    b.  For `level_size` times:
        i.  Dequeue a node.
        ii. Visit this node (add its value to the current level's result).
        iii. Enqueue its left child (if not null).
        iv. Enqueue its right child (if not null).
    c.  Add the current level's result to the overall list of levels.

### Zigzag Level Order Traversal

This is a variation of level order traversal where nodes are visited left-to-right for the first level, then right-to-left for the second, left-to-right for the third, and so on.

```ascii
        3
       / \
      9  20
        /  \
       15   7

Level 0: [3] (L->R)
Level 1: [20, 9] (R->L)
Level 2: [15, 7] (L->R)

Traversal Order: [3], [20, 9], [15, 7]
```

#### Algorithm (using a Queue and a Flag)
1.  Initialize an empty queue and add the root node to it.
2.  Initialize a boolean flag `left_to_right = true`.
3.  While the queue is not empty:
    a.  Get the number of nodes `level_size` in the queue.
    b.  Create a temporary list `current_level_nodes` to store nodes for this level.
    c.  For `level_size` times:
        i.  Dequeue a node.
        ii. Add it to `current_level_nodes`.
        iii. Enqueue its left child (if not null).
        iv. Enqueue its right child (if not null).
    d.  If `left_to_right` is false, reverse `current_level_nodes`.
    e.  Add `current_level_nodes` values to the overall result.
    f.  Toggle `left_to_right`.

## 4. Problem-Specific Algorithms

### Validate Binary Search Tree

A Binary Search Tree (BST) has specific ordering properties:
*   All nodes in the left subtree of a node `N` must have values less than `N->val`.
*   All nodes in the right subtree of a node `N` must have values greater than `N->val`.
*   Both left and right subtrees must also be BSTs.

A common pitfall is to only check `node->left->val < node->val` and `node->right->val > node->val`. This is insufficient because it doesn't enforce the property across the entire subtree. For example, a node in the right subtree of the root might have a value less than the root, but greater than its immediate parent.

```
       10
      /  \
     5   15
        /  \
       6   20   (Incorrect: 6 is in right subtree of 10, but 6 < 10)
```

The correct way is to maintain a valid range `(min_val, max_val)` for each node.

#### Algorithm (Recursive with Range Constraints)
A helper function `isValidBST(TreeNode* node, long min_val, long max_val)` is used.
1.  **Base Case**: If `node` is null, it's a valid BST (an empty tree is a BST). Return `true`.
2.  **Current Node Check**: If `node->val` is less than or equal to `min_val` OR `node->val` is greater than or equal to `max_val`, it violates the BST property. Return `false`.
3.  **Recursive Calls**:
    a.  Recursively check the left subtree: `isValidBST(node->left, min_val, node->val)`. The `max_val` for the left child is the current `node->val`.
    b.  Recursively check the right subtree: `isValidBST(node->right, node->val, max_val)`. The `min_val` for the right child is the current `node->val`.
4.  Return `true` only if both recursive calls return `true`.

Initial call: `isValidBST(root, LONG_MIN, LONG_MAX)` (or `std::numeric_limits<long>::min()` and `max()`). Using `long` ensures that integer `INT_MIN` and `INT_MAX` can be valid node values without conflicting with boundary checks.

#### Algorithm (Inorder Traversal - Property Check)
An alternative is to use inorder traversal. As noted, an inorder traversal of a valid BST will yield a strictly increasing sequence of node values.
1.  Perform an inorder traversal.
2.  Store the previous node's value.
3.  During traversal, if the current node's value is less than or equal to the previous node's value, the tree is not a BST.

This can be done recursively or iteratively.

```cpp
// Recursive Inorder Check
bool checkBST(TreeNode* node, long& prev_val) {
    if (!node) return true;
    if (!checkBST(node->left, prev_val)) return false; // Check left subtree

    if (node->val <= prev_val) return false; // Check current node
    prev_val = node->val; // Update previous value

    return checkBST(node->right, prev_val); // Check right subtree
}

bool isValidBST(TreeNode* root) {
    long prev_val = std::numeric_limits<long>::min();
    return checkBST(root, prev_val);
}
```

**Time Complexity**: O(N) for both approaches.
**Space Complexity**: O(H) for recursive call stack.

### Serialize and Deserialize Binary Tree

The goal is to convert a tree into a string (serialize) and then convert that string back into the original tree structure (deserialize). A common approach uses a variation of Preorder or Level Order traversal.

#### Approach 1: Preorder Traversal with Markers

This method uses a Depth-First Search (Preorder) approach. Null nodes are explicitly marked (e.g., with "#") to reconstruct the tree structure correctly.

```ascii
      1
     / \
    2   3
   / \
  4   #
```

Serialized string (Preorder): `1,2,4,#,#,#,3,#,#`

**Serialization Algorithm:**
1.  A recursive helper function `serialize(TreeNode* node)`:
    a.  If `node` is null, append "#" to the string.
    b.  Else, append `node->val` to the string, then recursively call for `node->left`, then `node->right`.
2.  Separate values with a delimiter (e.g., comma).

**Deserialization Algorithm:**
1.  Split the serialized string into a list of values/markers.
2.  Use a recursive helper function `deserialize(std::queue<std::string>& nodes_queue)`:
    a.  Dequeue the next string.
    b.  If it's "#", return `nullptr`.
    c.  Else, create a new `TreeNode` with the parsed integer value.
    d.  Recursively set `node->left = deserialize(nodes_queue)`.
    e.  Recursively set `node->right = deserialize(nodes_queue)`.
    f.  Return the created node.

**Time Complexity**: O(N) for both. Each node is visited once during serialization and created once during deserialization.
**Space Complexity**: O(N) for the string storage, O(H) for recursive call stack.

#### Approach 2: Level Order Traversal with Markers (BFS)

This method uses a Breadth-First Search approach. Null nodes are explicitly marked.

```ascii
      1
     / \
    2   3
   / \
  4   #
```

Serialized string (Level Order): `1,2,3,4,#,#,#,#,#` (assuming maximum 2 children and representing nulls explicitly)
More accurate representation for `1,2,3,4,null,null,null,null` using queue:
`1, 2, 3, 4, null, null, null, null`

**Serialization Algorithm:**
1.  Initialize a queue and add the root.
2.  Initialize a stringstream to build the result.
3.  While the queue is not empty:
    a.  Dequeue a node.
    b.  If node is null, append "#" to stringstream.
    c.  Else, append `node->val` to stringstream. Enqueue `node->left` and `node->right`.
4.  Remove trailing delimiters/nulls if desired for cleaner output (though not strictly necessary for deserialization).

**Deserialization Algorithm:**
1.  Split the serialized string into a list of values/markers.
2.  If the first element is "#", return `nullptr`.
3.  Create the root node from the first element.
4.  Initialize a queue and add the root.
5.  Use an index to iterate through the remaining elements:
    a.  Dequeue a parent node.
    b.  Get the next element for the left child. If not "#", create and link, then enqueue.
    c.  Get the next element for the right child. If not "#", create and link, then enqueue.
    d.  Repeat until all elements processed or queue is empty.

**Time Complexity**: O(N) for both.
**Space Complexity**: O(N) for the string storage, O(W) for the queue (where W is max width).

For this project, the Preorder Traversal with Markers approach is chosen due to its conceptual simplicity and consistent O(H) stack space for both serialization and deserialization recursion, making it a common interview choice.

## 5. Time and Space Complexity Summary

| Problem / Algorithm                   | Time Complexity | Space Complexity | Notes                                                        |
| :------------------------------------ | :-------------- | :--------------- | :----------------------------------------------------------- |
| **DFS Traversals**                    |                 |                  |                                                              |
| Preorder (Recursive)                  | O(N)            | O(H)             | H = tree height (worst N for skewed tree)                    |
| Preorder (Iterative)                  | O(N)            | O(H)             | Explicit stack                                               |
| Inorder (Recursive)                   | O(N)            | O(H)             | H = tree height (worst N for skewed tree)                    |
| Inorder (Iterative)                   | O(N)            | O(H)             | Explicit stack                                               |
| Postorder (Recursive)                 | O(N)            | O(H)             | H = tree height (worst N for skewed tree)                    |
| Postorder (Iterative, 2 Stacks)       | O(N)            | O(N)             | Second stack can hold up to N nodes                          |
| Postorder (Iterative, 1 Stack)        | O(N)            | O(H)             | More complex logic                                           |
| **BFS Traversals**                    |                 |                  |                                                              |
| Level Order                           | O(N)            | O(W)             | W = max width of tree (worst N for complete tree)            |
| Zigzag Level Order                    | O(N)            | O(W)             | Similar to Level Order, extra logic for reversal             |
| **Specific Problems**                 |                 |                  |                                                              |
| Validate BST (Recursive with Range)   | O(N)            | O(H)             | Best approach                                                |
| Validate BST (Inorder Traorder Check) | O(N)            | O(H)             | Also optimal                                                 |
| Serialize/Deserialize (Preorder)      | O(N)            | O(N)             | O(N) for string, O(H) for recursion stack                    |
| Serialize/Deserialize (Level Order)   | O(N)            | O(N)             | O(N) for string, O(W) for queue                              |

*   **N**: Number of nodes in the tree.
*   **H**: Height of the tree.
    *   Best Case (balanced tree): H = log N
    *   Worst Case (skewed tree): H = N
*   **W**: Maximum width of the tree.
    *   Worst Case (complete tree): W = N/2
*   `O(N)` space for iterative Postorder (2 stacks) is because the second stack can store all nodes in a flat list.
*   `O(N)` space for Serialize/Deserialize string includes the serialized string itself.