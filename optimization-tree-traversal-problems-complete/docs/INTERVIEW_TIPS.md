```markdown
# Interview Tips for Tree Traversals

Mastering tree traversals is crucial for coding interviews. This document provides tips, common variations, edge cases, and strategies to confidently tackle tree-related questions.

## Table of Contents

1.  [General Approach to Tree Problems](#1-general-approach-to-tree-problems)
2.  [Asking Clarifying Questions](#2-asking-clarifying-questions)
3.  [DFS vs. BFS: When to Use Which?](#3-dfs-vs-bfs-when-to-use-which)
4.  [Common Patterns and Template Code](#4-common-patterns-and-template-code)
    *   [Recursive DFS Template](#recursive-dfs-template)
    *   [Iterative DFS Template (Stack)](#iterative-dfs-template-stack)
    *   [Iterative BFS Template (Queue)](#iterative-bfs-template-queue)
5.  [Edge Cases and Gotchas](#5-edge-cases-and-gotchas)
6.  [Variations and Advanced Topics](#6-variations-and-advanced-topics)
7.  [Interview Etiquette and Communication](#7-interview-etiquette-and-communication)

---

## 1. General Approach to Tree Problems

1.  **Understand the Problem:** Read carefully. What is the desired output? What constraints exist?
2.  **Identify the Traversal Type:**
    *   **DFS (Preorder, Inorder, Postorder):** Good for problems that involve properties of nodes and their immediate children, or path-related problems (e.g., finding height, sum of paths, validating BSTs).
    *   **BFS (Level Order):** Ideal for problems that deal with nodes level by level, shortest path in unweighted graphs, or minimum depth (e.g., finding nodes at a specific depth, checking if a tree is complete).
3.  **Choose an Implementation Method:**
    *   **Recursive:** Often more concise and easier to write for DFS. Watch out for stack overflow with deep trees.
    *   **Iterative:** Uses explicit stack/queue. Avoids recursion depth limits, sometimes offers more control, but can be more complex to write (especially iterative postorder).
4.  **Handle Base Cases:** What happens with `null` nodes, empty trees, or single-node trees?
5.  **Test Cases:** Think about various test cases: empty tree, single node, balanced tree, skewed tree (left/right).
6.  **Complexity Analysis:** Always state the time and space complexity.

---

## 2. Asking Clarifying Questions

Before jumping into code, clarify these:

*   **What type of tree?** (Binary tree, N-ary tree, BST, AVL, Red-Black, etc.) Our project focuses on Binary Trees.
*   **Are node values unique?**
*   **Are there negative values?** (If relevant to sums, min/max, etc.)
*   **What about `null` children?** (Standard for binary trees)
*   **What is the maximum number of nodes?** (Helps gauge potential stack overflow for deep recursion).
*   **What is the expected output format?** (e.g., `number[]`, `number[][]`, `boolean`)

---

## 3. DFS vs. BFS: When to Use Which?

**Use DFS (Depth-First Search) for:**

*   **Path-related problems:** Finding a path from root to a leaf, checking if a path with a certain sum exists.
*   **Problems requiring processing all ancestors before descendants (or vice versa):** E.g., maximum depth, same tree, symmetric tree, lowest common ancestor.
*   **Binary Search Tree (BST) specific problems:** Inorder traversal naturally gives sorted elements.
*   **When space complexity for skewed trees is less critical (or recursion depth is not an issue):** Recursive DFS is elegant.

**Use BFS (Breadth-First Search) for:**

*   **Level-by-level processing:** Printing nodes level by level, finding the average of each level.
*   **Shortest path on unweighted trees/graphs:** BFS naturally finds the shortest path in terms of number of edges.
*   **Minimum depth/height:** The first time you reach a leaf in BFS gives the minimum depth.
*   **Checking for completeness:** BFS can easily determine if a tree is complete.

---

## 4. Common Patterns and Template Code

Having these templates in mind can speed up problem-solving.

### Recursive DFS Template

```typescript
function dfsRecursive<T>(node: TreeNode<T> | null): any { // Return type varies by problem
    // 1. Base Case:
    if (node === null) {
        return /* appropriate value for problem (e.g., [], 0, null, true) */;
    }

    // 2. Perform actions on left/right children (recursive calls)
    //    The order of these calls defines Preorder, Inorder, Postorder.
    //    Preorder: process node, then left, then right
    //    Inorder: process left, then node, then right
    //    Postorder: process left, then right, then node

    // Example (Preorder-like structure):
    const resultForCurrentNode = []; // Or some initial computation

    // Visit current node
    resultForCurrentNode.push(node.val); // Example: collecting values

    // Recurse on children
    const leftResult = dfsRecursive(node.left);
    const rightResult = dfsRecursive(node.right);

    // 3. Combine results (if necessary) and return
    // Example: For preorder, you might combine current node's value with left and right results
    // return [...resultForCurrentNode, ...leftResult, ...rightResult];
    // Example: For max depth: return 1 + Math.max(leftResult, rightResult);

    // Default return or combine logic
    return resultForCurrentNode;
}

// Initial call: dfsRecursive(root);
```

### Iterative DFS Template (Stack)

```typescript
function dfsIterative<T>(root: TreeNode<T> | null): any { // Return type varies
    const result: T[] = []; // Example: For collecting traversal order
    if (root === null) {
        return result;
    }

    const stack: TreeNode<T>[] = [];
    stack.push(root);

    while (stack.length > 0) {
        const node = stack.pop()!; // Process the current node

        // For Preorder: Add node.val to result here
        // result.push(node.val);

        // Push children onto stack. The order depends on desired traversal.
        // For Preorder: Push right child first, then left (so left is processed next due to LIFO)
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
        // For Inorder/Postorder iterative, the logic is more complex and not a simple template.
        // Refer to src/algorithms/treeTraversals.ts and treeTraversalVariations.ts for specific implementations.
    }
    return result;
}
```

### Iterative BFS Template (Queue)

```typescript
function bfsIterative<T>(root: TreeNode<T> | null): any { // Return type varies
    const result: T[][] = []; // Example: For level order traversal
    if (root === null) {
        return result;
    }

    const queue: TreeNode<T>[] = [root];
    let level = 0; // Optional: for level tracking

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevelNodes: T[] = []; // Collect nodes for current level

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // Dequeue a node

            // Process current node
            currentLevelNodes.push(node.val); // Example: collecting values

            // Enqueue children
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(currentLevelNodes); // Add current level's nodes to overall result
        level++; // Increment level
    }
    return result;
}
```

---

## 5. Edge Cases and Gotchas

*   **Empty Tree (`root = null`):** Always handle this first. The result is usually an empty list, 0, or `true`/`false` depending on the problem (e.g., empty tree is symmetric).
*   **Single Node Tree:** Ensure your code correctly handles a tree with only a root node.
*   **Skewed Trees:**
    *   **Left-skewed:** `1 -> 2 -> 3`. All nodes are left children.
    *   **Right-skewed:** `1 -> null -> 2 -> null -> 3`. All nodes are right children.
    *   These are important for testing recursion depth (potential stack overflow for very deep trees) and iterative stack/queue behavior.
*   **Memory Limits for Deep Recursion:** In languages like JavaScript/TypeScript, very deep recursive calls can hit the call stack limit. For N=10^5, an iterative solution is usually safer.
*   **Off-by-one errors for depth/height:** Clarify if depth is 0-indexed (root at depth 0) or 1-indexed (root at depth 1). Usually 1-indexed for height, 0-indexed for levels.
*   **Modifying Tree Structure:** If the problem requires modifying the tree (e.g., Morris traversal), ensure you understand if the original structure needs to be restored. Morris traversal restores the tree.

---

## 6. Variations and Advanced Topics

*   **N-ary Trees:** Traversals can be adapted. DFS involves iterating through all children; BFS is largely the same.
*   **Tree Serialization/Deserialization:** Involves converting a tree to a string (or array) and back. Often uses preorder or level order traversal.
*   **Iterative Postorder with one stack:** More complex logic, but possible. See `src/algorithms/treeTraversalVariations.ts`.
*   **Morris Traversal (O(1) space DFS):** A clever way to do inorder traversal without a stack, by threading the tree. Good for advanced interviews. See `src/algorithms/treeTraversalVariations.ts`.
*   **Graph Traversals (DFS/BFS):** Tree traversals are a special case of graph traversals (trees are acyclic graphs). Concepts extend directly.
*   **Specific Tree Types:**
    *   **Binary Search Trees (BST):** Inorder traversal yields sorted values. This is a crucial property.
    *   **Complete Binary Trees:** All levels except possibly the last are completely filled, and all nodes in the last level are as far left as possible. BFS is good for checking this.

---

## 7. Interview Etiquette and Communication

*   **Think Aloud:** Verbalize your thought process. Explain your understanding of the problem, your chosen approach, potential alternatives, and why you pick one.
*   **Start Simple:** If stuck, consider the simplest cases (empty, single node).
*   **Draw Diagrams:** Use the whiteboard (or virtual equivalent) to draw the tree and trace your chosen traversal step-by-step. This is especially helpful for iterative approaches or complex logic.
*   **Discuss Time/Space Complexity:** Always analyze and discuss the complexities of your solution. Justify your choices (e.g., "I'm using recursive DFS which takes O(H) space for the call stack, where H is the height. If the tree were extremely deep, I would consider an iterative approach to avoid stack overflow.").
*   **Write Clean Code:** Use meaningful variable names, add comments for non-obvious logic, and ensure correct indentation.
*   **Test Your Code:** Walk through your code with at least one example (including an edge case) on the whiteboard.
*   **Be Open to Feedback:** If the interviewer suggests an alternative, listen and engage in discussion. It shows flexibility and willingness to learn.

By following these tips and thoroughly understanding the concepts in this project, you'll be well-prepared to ace tree traversal problems in technical interviews.
```