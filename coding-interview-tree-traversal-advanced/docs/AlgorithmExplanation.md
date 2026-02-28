```markdown
# Tree Traversal Algorithms: In-Depth Explanation

This document provides a detailed explanation of common binary tree traversal algorithms. Understanding these traversals is fundamental for working with tree data structures and is a frequent topic in coding interviews.

## What is Tree Traversal?

Tree traversal is the process of visiting each node in a tree data structure exactly once in a systematic way. There are two main categories of traversal strategies for binary trees:

1.  **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking. This includes Inorder, Preorder, and Postorder traversals.
2.  **Breadth-First Search (BFS)**: Explores all nodes at the present depth level before moving on to nodes at the next depth level. Level Order traversal is the primary BFS method.

---

## 1. Depth-First Search (DFS) Traversals

DFS traversals are defined by the order in which they visit the root node relative to its left and right children.

### A. Inorder Traversal (Left -> Root -> Right)

**Concept:**
Inorder traversal first recursively visits the left subtree, then visits the root node itself, and finally recursively visits the right subtree.

**Key Property:**
For a Binary Search Tree (BST), inorder traversal retrieves the nodes' values in non-decreasing (sorted) order.

**Use Cases:**
*   Retrieving elements of a BST in sorted order.
*   Copying a tree (less common than preorder, but possible).

**Example Tree:**
```
      4
     / \
    2   5
   / \
  1   3
```

**Inorder Traversal Sequence:** `1 -> 2 -> 3 -> 4 -> 5`

---

#### 1. Recursive Inorder Traversal

The recursive implementation is the most intuitive.

**Algorithm:**
1.  **Base Case:** If the current node is `null`, return.
2.  Recursively call `inorder(node.left)`.
3.  Visit the current `node` (e.g., add its value to a list).
4.  Recursively call `inorder(node.right)`.

**Java Implementation Snippet:**
```java
// See BasicTraversals.java for full implementation
public List<Integer> inorderTraversalRecursive(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    inorderHelper(root, result);
    return result;
}

private void inorderHelper(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }
    inorderHelper(node.left, result);  // Traverse left
    result.add(node.val);              // Visit root
    inorderHelper(node.right, result); // Traverse right
}
```

**Time Complexity:** O(N), where N is the number of nodes, as each node is visited exactly once.
**Space Complexity:** O(H), where H is the height of the tree, due to the recursion call stack. In the worst case (skewed tree), H can be N, so O(N). In the best case (balanced tree), H is logN, so O(logN).

---

#### 2. Iterative Inorder Traversal

The iterative approach simulates the recursion stack using an explicit `Stack` data structure.

**Algorithm:**
1.  Initialize an empty `Stack<TreeNode>` and a `current` pointer to the `root`.
2.  Loop while `current` is not `null` OR the `stack` is not empty.
    a.  **Go Left:** While `current` is not `null`, push `current` onto the stack and move `current = current.left`. This pushes all left ancestors until the leftmost node is reached.
    b.  **Visit and Go Right:** `current` is now `null`. Pop a node from the stack. This is the node whose left subtree has been fully traversed (or was empty). Add its value to the result. Then, set `current = poppedNode.right` to explore its right subtree.

**Java Implementation Snippet:**
```java
// See BasicTraversals.java for full implementation
public List<Integer> inorderTraversalIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;

    while (current != null || !stack.isEmpty()) {
        // Traverse to the leftmost node, pushing all visited nodes onto the stack
        while (current != null) {
            stack.push(current);
            current = current.left;
        }

        // Current is null, meaning we've reached the leftmost point
        // Pop the last visited node (which is the root of the current subtree)
        current = stack.pop();
        result.add(current.val); // Add its value (visit)

        // Now, traverse its right subtree
        current = current.right;
    }
    return result;
}
```

**Time Complexity:** O(N). Each node is pushed onto and popped from the stack at most once.
**Space Complexity:** O(H). The stack size can grow up to the height of the tree.

---

### B. Preorder Traversal (Root -> Left -> Right)

**Concept:**
Preorder traversal first visits the root node, then recursively visits the left subtree, and finally recursively visits the right subtree.

**Use Cases:**
*   Creating a duplicate copy of a tree.
*   Serializing a tree into a format that can be used to reconstruct it (along with null markers).
*   Evaluating prefix expressions.

**Example Tree:**
```
      4
     / \
    2   5
   / \
  1   3
```

**Preorder Traversal Sequence:** `4 -> 2 -> 1 -> 3 -> 5`

---

#### 1. Recursive Preorder Traversal

**Algorithm:**
1.  **Base Case:** If the current node is `null`, return.
2.  Visit the current `node`.
3.  Recursively call `preorder(node.left)`.
4.  Recursively call `preorder(node.right)`.

**Java Implementation Snippet:**
```java
// See BasicTraversals.java for full implementation
public List<Integer> preorderTraversalRecursive(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    preorderHelper(root, result);
    return result;
}

private void preorderHelper(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }
    result.add(node.val); // Visit root
    preorderHelper(node.left, result); // Traverse left
    preorderHelper(node.right, result); // Traverse right
}
```

**Time Complexity:** O(N).
**Space Complexity:** O(H).

---

#### 2. Iterative Preorder Traversal

Iterative preorder traversal also uses a stack. The key is to remember that for Root -> Left -> Right, we want to process the root first, then its left child, then its right child. Since a stack is LIFO (Last-In, First-Out), we push the right child *before* the left child.

**Algorithm:**
1.  Initialize an empty `Stack<TreeNode>` and an empty `result` list.
2.  If `root` is `null`, return an empty list.
3.  Push `root` onto the stack.
4.  While the stack is not empty:
    a.  Pop a `node` from the stack.
    b.  Add `node.val` to the `result` list (this is the "Root" visit).
    c.  If `node.right` is not `null`, push `node.right` onto the stack.
    d.  If `node.left` is not `null`, push `node.left` onto the stack. (Push left last so it's processed first)

**Java Implementation Snippet:**
```java
// See BasicTraversals.java for full implementation
public List<Integer> preorderTraversalIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) {
        return result;
    }

    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    while (!stack.isEmpty()) {
        TreeNode node = stack.pop(); // Visit current node
        result.add(node.val);

        if (node.right != null) { // Push right child first
            stack.push(node.right);
        }
        if (node.left != null) {  // Push left child last (to be processed first)
            stack.push(node.left);
        }
    }
    return result;
}
```

**Time Complexity:** O(N).
**Space Complexity:** O(H).

---

### C. Postorder Traversal (Left -> Right -> Root)

**Concept:**
Postorder traversal first recursively visits the left subtree, then recursively visits the right subtree, and finally visits the root node.

**Use Cases:**
*   Deleting a tree (delete children first, then parent).
*   Evaluating postfix expressions.

**Example Tree:**
```
      4
     / \
    2   5
   / \
  1   3
```

**Postorder Traversal Sequence:** `1 -> 3 -> 2 -> 5 -> 4`

---

#### 1. Recursive Postorder Traversal

**Algorithm:**
1.  **Base Case:** If the current node is `null`, return.
2.  Recursively call `postorder(node.left)`.
3.  Recursively call `postorder(node.right)`.
4.  Visit the current `node`.

**Java Implementation Snippet:**
```java
// See BasicTraversals.java for full implementation
public List<Integer> postorderTraversalRecursive(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    postorderHelper(root, result);
    return result;
}

private void postorderHelper(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }
    postorderHelper(node.left, result);  // Traverse left
    postorderHelper(node.right, result); // Traverse right
    result.add(node.val);                // Visit root
}
```

**Time Complexity:** O(N).
**Space Complexity:** O(H).

---

#### 2. Iterative Postorder Traversal (Two Stacks)

Iterative postorder traversal is the most complex of the three DFS traversals to implement with a single stack. A simpler approach uses two stacks. The idea is to reverse a modified preorder traversal.

A standard preorder traversal is `Root -> Left -> Right`.
If we modify the preorder to `Root -> Right -> Left` and store it in a temporary stack (Stack2), then pop elements from Stack2, the order will be reversed to `Left -> Right -> Root`, which is exactly postorder.

**Algorithm:**
1.  Initialize two empty stacks: `stack1` and `stack2`.
2.  Push `root` onto `stack1`.
3.  While `stack1` is not empty:
    a.  Pop a `node` from `stack1`.
    b.  Push `node` onto `stack2`.
    c.  If `node.left` is not `null`, push `node.left` onto `stack1`.
    d.  If `node.right` is not `null`, push `node.right` onto `stack1`.
    *(Note: pushing left then right ensures `right` is popped from `stack1` before `left`, achieving Root -> Right -> Left order in `stack1`'s processing)*
4.  Once `stack1` is empty, all nodes have been moved to `stack2` in `Root -> Right -> Left` order.
5.  While `stack2` is not empty, pop nodes and add their values to the `result` list. This reverse-pops `Left -> Right -> Root`.

**Java Implementation Snippet:**
```java
// See BasicTraversals.java for full implementation
public List<Integer> postorderTraversalIterative(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) {
        return result;
    }

    Stack<TreeNode> stack1 = new Stack<>(); // For traversal (Root -> Right -> Left)
    Stack<TreeNode> stack2 = new Stack<>(); // For collecting in reverse (Left -> Right -> Root)

    stack1.push(root);

    while (!stack1.isEmpty()) {
        TreeNode node = stack1.pop();
        stack2.push(node); // Push to stack2

        if (node.left != null) { // Push left first
            stack1.push(node.left);
        }
        if (node.right != null) { // Push right second (will be popped from stack1 before left)
            stack1.push(node.right);
        }
    }

    // Now pop from stack2 to get the final postorder sequence
    while (!stack2.isEmpty()) {
        result.add(stack2.pop().val);
    }
    return result;
}
```

**Time Complexity:** O(N). Each node is pushed and popped from both stacks at most once.
**Space Complexity:** O(N). In the worst case (skewed tree), both stacks could hold up to N nodes.

---

## 2. Breadth-First Search (BFS) Traversals

BFS traverses the tree level by level, exploring all nodes at the current depth before moving to the next depth.

### A. Level Order Traversal

**Concept:**
Level order traversal visits all nodes at depth 0 (the root), then all nodes at depth 1 (children of the root), then all nodes at depth 2, and so on, typically from left to right within each level.

**Mechanism:**
It uses a `Queue` data structure. Nodes are enqueued, and when a node is dequeued, its children are enqueued. This ensures that nodes at the current level are processed before any nodes at the next level.

**Use Cases:**
*   Finding the shortest path in an unweighted tree (distance from root).
*   Level-by-level processing (e.g., printing a tree by levels).

**Example Tree:**
```
      4
     / \
    2   5
   / \
  1   3
```

**Level Order Traversal Sequence:**
Level 0: `[4]`
Level 1: `[2, 5]`
Level 2: `[1, 3]`
Combined: `4 -> 2 -> 5 -> 1 -> 3`

---

#### Iterative Level Order Traversal

**Algorithm:**
1.  Initialize an empty `Queue<TreeNode>` and an empty `result` list of lists.
2.  If `root` is `null`, return an empty list.
3.  Enqueue the `root` node.
4.  While the queue is not empty:
    a.  Get the `levelSize` (number of nodes currently in the queue). This represents all nodes at the *current* level.
    b.  Create an empty list `currentLevel` to store nodes' values for this level.
    c.  Loop `levelSize` times:
        i.   Dequeue a `node` from the queue.
        ii.  Add `node.val` to `currentLevel`.
        iii. If `node.left` is not `null`, enqueue `node.left`.
        iv.  If `node.right` is not `null`, enqueue `node.right`.
    d.  Add `currentLevel` to the `result` list.

**Java Implementation Snippet:**
```java
// See LevelOrderProblems.java for full implementation
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) {
        return result;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);

            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        result.add(currentLevel);
    }
    return result;
}
```

**Time Complexity:** O(N). Each node is enqueued and dequeued exactly once.
**Space Complexity:** O(W), where W is the maximum width of the tree. In the worst case (a complete tree), W can be N/2, so O(N).

---

### B. Zigzag Level Order Traversal

**Concept:**
This is a variation of level order traversal where nodes are visited alternately from left-to-right and right-to-left for successive levels.

**Mechanism:**
It also uses a `Queue` for overall level processing, but for storing values of each level, a `Deque` (double-ended queue) is very efficient. For left-to-right levels, elements are added to the back of the deque. For right-to-left levels, elements are added to the front of the deque.

**Example Tree:**
```
      4
     / \
    2   5
   / \
  1   3
```

**Zigzag Level Order Traversal Sequence:**
Level 0 (L->R): `[4]`
Level 1 (R->L): `[5, 2]`
Level 2 (L->R): `[1, 3]`
Combined: `4 -> (5, 2) -> (1, 3)` (represented as `[[4], [5,2], [1,3]]`)

---

#### Iterative Zigzag Level Order Traversal

**Algorithm:**
1.  Initialize an empty `Queue<TreeNode>` and an empty `result` list of lists.
2.  If `root` is `null`, return an empty list.
3.  Enqueue the `root` node.
4.  Initialize a boolean flag `leftToRight = true`.
5.  While the queue is not empty:
    a.  Get the `levelSize`.
    b.  Create a `Deque<Integer>` named `currentLevelDeque`.
    c.  Loop `levelSize` times:
        i.   Dequeue a `node`.
        ii.  If `leftToRight` is `true`, add `node.val` to the end (`addLast`) of `currentLevelDeque`.
        iii. Else (`leftToRight` is `false`), add `node.val` to the front (`addFirst`) of `currentLevelDeque`.
        iv.  Enqueue `node.left` and `node.right` if they exist (always in left-to-right order into the primary queue).
    d.  Add `new ArrayList<>(currentLevelDeque)` to the `result` list.
    e.  Toggle `leftToRight = !leftToRight`.

**Java Implementation Snippet:**
```java
// See LevelOrderProblems.java for full implementation
public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) {
        return result;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    boolean leftToRight = true;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        Deque<Integer> currentLevelDeque = new LinkedList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            if (leftToRight) {
                currentLevelDeque.addLast(node.val); // Add to end for L->R
            } else {
                currentLevelDeque.addFirst(node.val); // Add to front for R->L
            }

            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        result.add(new ArrayList<>(currentLevelDeque));
        leftToRight = !leftToRight; // Toggle direction
    }
    return result;
}
```

**Time Complexity:** O(N). Each node is processed once. `Deque` operations (addFirst/addLast) are O(1).
**Space Complexity:** O(W). For the queue and the deque, up to the maximum width of the tree.

---

## 3. Maximum Depth of Binary Tree

This problem demonstrates how traversals can be adapted to calculate tree properties. The maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node.

**Example Tree:**
```
      3
     / \
    9  20
       / \
      15  7
```
**Maximum Depth:** 3 (Path: 3 -> 20 -> 7 or 3 -> 20 -> 15)

---

### A. DFS Approach (Recursive)

This approach is similar to a post-order traversal, as it needs to know the depths of the children before calculating the current node's depth.

**Algorithm:**
1.  **Base Case:** If the `root` is `null`, its depth is 0.
2.  Recursively calculate `leftDepth = maxDepthDFS(root.left)`.
3.  Recursively calculate `rightDepth = maxDepthDFS(root.right)`.
4.  The depth of the current node is `1 + Math.max(leftDepth, rightDepth)`.

**Java Implementation Snippet:**
```java
// See BinaryTreeProperties.java for full implementation
public int maxDepthDFS(TreeNode root) {
    if (root == null) {
        return 0;
    }
    int leftDepth = maxDepthDFS(root.left);
    int rightDepth = maxDepthDFS(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
}
```

**Time Complexity:** O(N). Each node visited once.
**Space Complexity:** O(H) for the recursion stack.

---

### B. BFS Approach (Iterative)

This approach is essentially a level order traversal where we count the levels.

**Algorithm:**
1.  Initialize a `Queue<TreeNode>` and add the `root`.
2.  If `root` is `null`, return 0.
3.  Initialize `depth = 0`.
4.  While the queue is not empty:
    a.  Increment `depth` (a new level is being processed).
    b.  Get `levelSize = queue.size()`.
    c.  Loop `levelSize` times:
        i.   Dequeue a `node`.
        ii.  Enqueue its non-null children.
5.  Return `depth`.

**Java Implementation Snippet:**
```java
// See BinaryTreeProperties.java for full implementation
public int maxDepthBFS(TreeNode root) {
    if (root == null) {
        return 0;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int depth = 0;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        depth++; // Increment depth for each new level

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
    }
    return depth;
}
```

**Time Complexity:** O(N). Each node enqueued/dequeued once.
**Space Complexity:** O(W) for the queue.

---

This covers the essential aspects of binary tree traversals. Practice implementing these variations and understanding their underlying principles for a strong foundation in tree algorithms.
```