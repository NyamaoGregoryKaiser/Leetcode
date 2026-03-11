```markdown
# 📚 Algorithm Explanations: Binary Tree Traversals 📚

This document provides a detailed explanation of the core binary tree traversal algorithms: Depth-First Search (DFS) variants and Breadth-First Search (BFS).

## 🌲 What is a Binary Tree?

A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.

```ascii
      (Root)
        A
       / \
      B   C
     / \   \
    D   E   F
```

## 🚶 What is Tree Traversal?

Tree traversal is the process of visiting each node in the tree exactly once in a systematic way. There are two main categories:

1.  **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking.
    *   Preorder Traversal (Root-Left-Right)
    *   Inorder Traversal (Left-Root-Right)
    *   Postorder Traversal (Left-Right-Root)
2.  **Breadth-First Search (BFS)**: Explores all nodes at the present depth level before moving on to nodes at the next depth level.
    *   Level Order Traversal

---

## 1. Depth-First Search (DFS) Traversals

DFS algorithms typically use a stack (explicit or implicit through recursion) to keep track of nodes to visit.

### 1.1. Preorder Traversal (Root, Left, Right)

In a preorder traversal, we visit the current node first, then recursively traverse its left subtree, and finally recursively traverse its right subtree.

**Conceptual Steps:**
1.  **Visit** the root node.
2.  **Traverse** the left subtree in preorder.
3.  **Traverse** the right subtree in preorder.

**ASCII Diagram Example:**

```ascii
      1
     / \
    2   3
   / \
  4   5
```

Traversal Order: `1 -> 2 -> 4 -> 5 -> 3`

**Recursive Implementation Logic:**

```javascript
function preorder(node) {
    if (node === null) return;
    result.push(node.val); // 1. Visit root
    preorder(node.left);   // 2. Go left
    preorder(node.right);  // 3. Go right
}
```

**Iterative Implementation Logic (using a Stack):**
The iterative approach simulates the recursion stack explicitly.
1.  Push the root onto the stack.
2.  While the stack is not empty:
    a.  Pop a node.
    b.  Process its value.
    c.  Push its **right** child, then its **left** child onto the stack (LIFO ensures left is processed first).

```javascript
function preorderIterative(root) {
    if (!root) return [];
    const stack = [root];
    const result = [];
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right); // Push right first
        if (node.left) stack.push(node.left);   // Then push left (so left is processed before right)
    }
    return result;
}
```

---

### 1.2. Inorder Traversal (Left, Root, Right)

In an inorder traversal, we recursively traverse the left subtree, then visit the current node, and finally recursively traverse its right subtree. For Binary Search Trees (BSTs), inorder traversal yields elements in sorted order.

**Conceptual Steps:**
1.  **Traverse** the left subtree in inorder.
2.  **Visit** the root node.
3.  **Traverse** the right subtree in inorder.

**ASCII Diagram Example:**

```ascii
      1
     / \
    2   3
   / \
  4   5
```

Traversal Order: `4 -> 2 -> 5 -> 1 -> 3`

**Recursive Implementation Logic:**

```javascript
function inorder(node) {
    if (node === null) return;
    inorder(node.left);    // 1. Go left
    result.push(node.val); // 2. Visit root
    inorder(node.right);   // 3. Go right
}
```

**Iterative Implementation Logic (using a Stack):**
The iterative inorder traversal is more involved. It repeatedly goes left, pushing nodes onto the stack, until it reaches a null node. Then it pops a node, visits it, and proceeds to its right child.

1.  Initialize `current = root`.
2.  While `current` is not null or stack is not empty:
    a.  While `current` is not null:
        i.  Push `current` onto stack.
        ii. Move `current = current.left`.
    b.  `current` is now null, meaning we've gone as far left as possible.
    c.  Pop a node from the stack. This is the node to `visit`.
    d.  Process its value.
    e.  Move `current = popped_node.right` to explore the right subtree.

```javascript
function inorderIterative(root) {
    const stack = [];
    const result = [];
    let current = root;
    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
}
```

---

### 1.3. Postorder Traversal (Left, Right, Root)

In a postorder traversal, we recursively traverse the left subtree, then its right subtree, and finally visit the current node.

**Conceptual Steps:**
1.  **Traverse** the left subtree in postorder.
2.  **Traverse** the right subtree in postorder.
3.  **Visit** the root node.

**ASCII Diagram Example:**

```ascii
      1
     / \
    2   3
   / \
  4   5
```

Traversal Order: `4 -> 5 -> 2 -> 3 -> 1`

**Recursive Implementation Logic:**

```javascript
function postorder(node) {
    if (node === null) return;
    postorder(node.left);    // 1. Go left
    postorder(node.right);   // 2. Go right
    result.push(node.val); // 3. Visit root
}
```

**Iterative Implementation Logic (using Two Stacks):**
This is the most common and simpler iterative approach for postorder.
1.  Push root to `s1`.
2.  While `s1` is not empty:
    a.  Pop `node` from `s1`.
    b.  Push `node` to `s2`.
    c.  Push `node.left` to `s1` (if exists).
    d.  Push `node.right` to `s1` (if exists).
3.  Pop all elements from `s2` and add to result. This will be the postorder sequence.

*Why this works*: The first stack (`s1`) effectively performs a modified preorder traversal (Root -> Right -> Left). When nodes are popped from `s1` and pushed onto `s2`, they get reversed. So, `s2` accumulates nodes in (Left -> Right -> Root) order, which is postorder.

```javascript
function postorderIterativeTwoStacks(root) {
    if (!root) return [];
    const s1 = [root];
    const s2 = [];
    const result = [];
    while (s1.length > 0) {
        const node = s1.pop();
        s2.push(node); // Push node to s2
        if (node.left) s1.push(node.left);   // Push left then right to s1
        if (node.right) s1.push(node.right); // Ensures right is processed before left from s1 for s2
    }
    while (s2.length > 0) {
        result.push(s2.pop().val); // Pop from s2 to get postorder
    }
    return result;
}
```

**Iterative Implementation Logic (using One Stack):**
More complex, but uses O(H) space instead of O(N) for two stacks. Requires tracking `lastVisitedNode` to distinguish when to process a node versus going to its right child.

```javascript
function postorderIterativeOneStack(root) {
    if (!root) return [];
    const stack = [];
    const result = [];
    let current = root;
    let lastVisitedNode = null;

    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        const peekNode = stack[stack.length - 1]; // Peek at the top of the stack

        // If right child exists and it hasn't been visited yet
        if (peekNode.right !== null && peekNode.right !== lastVisitedNode) {
            current = peekNode.right; // Move to right child
        } else {
            // Right child is null, or it has already been visited
            // This means we can now visit the peekNode itself
            stack.pop();
            result.push(peekNode.val);
            lastVisitedNode = peekNode; // Mark this node as visited
            current = null;             // Ensures next iteration pops from stack
        }
    }
    return result;
}
```

---

## 2. Breadth-First Search (BFS) Traversal

BFS, also known as Level Order Traversal, explores all nodes at the current depth before moving to the next depth level. It typically uses a queue.

### 2.1. Level Order Traversal

**Conceptual Steps:**
1.  Initialize a queue and add the root.
2.  While the queue is not empty:
    a.  Dequeue a node.
    b.  Process its value.
    c.  Enqueue its left child (if exists).
    d.  Enqueue its right child (if exists).

To group nodes by level:
1.  Initialize a queue with the root and a list `result` to store levels.
2.  While the queue is not empty:
    a.  Get the current `levelSize` (number of nodes at current depth).
    b.  Create an empty list `currentLevelNodes`.
    c.  Loop `levelSize` times:
        i.  Dequeue a node `n`.
        ii. Add `n.val` to `currentLevelNodes`.
        iii. Enqueue `n.left` (if exists).
        iv. Enqueue `n.right` (if exists).
    d.  Add `currentLevelNodes` to `result`.

**ASCII Diagram Example:**

```ascii
      1
     / \
    2   3
   / \   \
  4   5   6
```

Traversal Order (grouped by level): `[[1], [2, 3], [4, 5, 6]]`

**Implementation Logic (using a Queue):**

```javascript
function levelOrder(root) {
    const result = [];
    if (!root) return result;

    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelValues = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // Dequeue
            currentLevelValues.push(node.val);
            if (node.left) queue.push(node.left); // Enqueue children
            if (node.right) queue.push(node.right);
        }
        result.push(currentLevelValues);
    }
    return result;
}
```

---

### 2.2. Zigzag Level Order Traversal

This is a variation of Level Order Traversal where levels are traversed alternately from left-to-right and right-to-left.

**Conceptual Steps:**
The same as Level Order Traversal, but with an added flag (`leftToRight`) to control the order of adding elements to the `currentLevelValues` list.

1.  Initialize a queue with the root, `result` list, and `leftToRight = true`.
2.  While the queue is not empty:
    a.  Get `levelSize`.
    b.  Create an empty list `currentLevelValues`.
    c.  Loop `levelSize` times:
        i.  Dequeue a node `n`.
        ii. Add `n.val` to `currentLevelValues`.
        iii. Enqueue `n.left` (if exists).
        iv. Enqueue `n.right` (if exists).
    d.  If `leftToRight` is `false`, reverse `currentLevelValues`.
    e.  Add `currentLevelValues` to `result`.
    f.  Toggle `leftToRight = !leftToRight`.

**ASCII Diagram Example:**

```ascii
      1
     / \
    2   3
   / \   \
  4   5   6
```

Traversal Order (zigzag grouped by level): `[[1], [3, 2], [4, 5, 6]]`

**Implementation Logic (using a Queue and direction flag):**

```javascript
function zigzagLevelOrder(root) {
    const result = [];
    if (!root) return result;

    const queue = [root];
    let leftToRight = true;
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelValues = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevelValues.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        if (!leftToRight) {
            currentLevelValues.reverse(); // Reverse for right-to-left levels
        }
        result.push(currentLevelValues);
        leftToRight = !leftToRight; // Toggle for next level
    }
    return result;
}
```

---

## Time and Space Complexity Summary

| Traversal Type                  | Time Complexity | Space Complexity (Worst Case) | Notes                                           |
| :------------------------------ | :-------------- | :---------------------------- | :---------------------------------------------- |
| **DFS (Recursive)**             | O(N)            | O(H)                          | `H` is tree height. O(N) for skewed tree.       |
| **DFS (Iterative w/ Stack)**    | O(N)            | O(H)                          | `H` is tree height. O(N) for skewed tree.       |
| **Postorder (Iterative w/ 2 Stacks)** | O(N)            | O(N)                          | Second stack can store all nodes.               |
| **BFS (Level Order)**           | O(N)            | O(W) (or O(N))                | `W` is max width. O(N) for complete tree.       |
| **Zigzag Level Order**          | O(N)            | O(W) (or O(N))                | Reversal adds minor constant factor per level.  |

*   `N`: Number of nodes in the tree.
*   `H`: Height of the tree.
    *   For a balanced tree, `H = log N`.
    *   For a skewed tree, `H = N`.
*   `W`: Maximum width of the tree.
    *   For a complete tree, `W ≈ N/2`.
    *   For a skewed tree, `W = 1`.

---
```