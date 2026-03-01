```markdown
# 🌳 Tree Traversals Project: A Comprehensive Interview Prep Kit 🌳

This project provides a complete environment for mastering binary tree traversal algorithms and related problems, specifically designed for coding interview preparation. It includes multiple implementations, extensive tests, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Introduction](#1-introduction)
2.  [Project Structure](#2-project-structure)
3.  [Setup and Installation](#3-setup-and-installation)
4.  [Core Traversal Algorithms](#4-core-traversal-algorithms)
    *   [DFS (Recursive)](#dfs-recursive)
    *   [DFS (Iterative)](#dfs-iterative)
    *   [BFS (Level Order)](#bfs-level-order)
5.  [Problem Descriptions and Solutions](#5-problem-descriptions-and-solutions)
    *   [P1: Maximum Depth of Binary Tree](#p1-maximum-depth-of-binary-tree)
    *   [P2: Binary Tree Zigzag Level Order Traversal](#p2-binary-tree-zigzag-level-order-traversal)
    *   [P3: Count Good Nodes in Binary Tree](#p3-count-good-nodes-in-binary-tree)
    *   [P4: Path Sum III](#p4-path-sum-iii)
6.  [Running Tests](#6-running-tests)
7.  [Running Benchmarks](#7-running-benchmarks)
8.  [Documentation](#8-documentation)
9.  [Contribution](#9-contribution)
10. [License](#10-license)

---

## 1. Introduction

Binary trees are fundamental data structures, and traversals are core algorithms for processing their nodes. This project aims to equip you with a deep understanding of tree traversals, including their recursive and iterative forms, and how to apply them to solve various interview problems effectively.

**Key Features:**

*   **Modular JavaScript Code**: Clean, well-commented, and organized.
*   **Multiple Approaches**: Recursive vs. Iterative for traversals, different solutions for problems (e.g., O(N^2) vs O(N)).
*   **Comprehensive Testing**: Jest framework with diverse test cases.
*   **Performance Benchmarking**: Compare algorithm efficiency on different tree sizes and structures.
*   **Detailed Documentation**: Algorithm explanations, ASCII diagrams, interview tips, and edge case discussions.

---

## 2. Project Structure

```
tree-traversals-project/
├── src/
│   ├── data-structures/
│   │   └── TreeNode.js             // Definition of a Binary Tree Node
│   ├── utils/
│   │   └── treeBuilder.js          // Utility to build trees from array representation
│   ├── traversals/
│   │   ├── recursiveTraversals.js  // Inorder, Preorder, Postorder (Recursive)
│   │   ├── iterativeTraversals.js  // Inorder, Preorder, Postorder (Iterative)
│   │   └── bfsLevelOrder.js        // Level Order Traversal (BFS)
│   ├── problems/
│   │   ├── p1_maxDepth.js          // Problem 1: Maximum Depth of Binary Tree
│   │   ├── p2_levelOrderZigzag.js  // Problem 2: Binary Tree Zigzag Level Order Traversal
│   │   ├── p3_countGoodNodes.js    // Problem 3: Count Good Nodes in Binary Tree
│   │   └── p4_pathSumIII.js        // Problem 4: Path Sum III
│   └── index.js                    // Entry point for demo/running all functions
├── tests/
│   ├── traversals.test.js          // Tests for core traversal algorithms
│   ├── p1_maxDepth.test.js         // Tests for Problem 1
│   ├── p2_levelOrderZigzag.test.js // Tests for Problem 2
│   ├── p3_countGoodNodes.test.js   // Tests for Problem 3
│   └── p4_pathSumIII.test.js       // Tests for Problem 4
├── benchmarks/
│   └── traversalBenchmarks.js      // Performance benchmarks for traversals and problems
├── docs/
│   ├── algorithms.md               // Detailed explanations of traversal algorithms
│   ├── interview_tips.md           // Interview strategies, variations, and gotchas
│   └── diagrams.md                 // ASCII art diagrams for tree structures and traversals
├── README.md                       // Project overview, setup, and problem descriptions
└── package.json                    // Node.js project configuration (dependencies, scripts)
```

---

## 3. Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tree-traversals-project.git
    cd tree-traversals-project
    ```
    (Note: This is a placeholder for `your-username`. If you are just copy-pasting, you can skip `git clone` and just create the directory and files manually.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `jest` for testing.

---

## 4. Core Traversal Algorithms

The `src/traversals/` directory contains implementations for the fundamental binary tree traversals.

### DFS (Recursive)
*   **`inorderTraversal(root)`**: Visits nodes in Left -> Root -> Right order.
*   **`preorderTraversal(root)`**: Visits nodes in Root -> Left -> Right order.
*   **`postorderTraversal(root)`**: Visits nodes in Left -> Right -> Root order.
*   **File**: `src/traversals/recursiveTraversals.js`
*   **Complexity**: O(N) time, O(H) space (recursion stack).

### DFS (Iterative)
*   **`inorderTraversalIterative(root)`**: Iterative Inorder using a stack.
*   **`preorderTraversalIterative(root)`**: Iterative Preorder using a stack.
*   **`postorderTraversalIterative(root)`**: Iterative Postorder using two stacks (or one stack with careful tracking).
*   **File**: `src/traversals/iterativeTraversals.js`
*   **Complexity**: O(N) time, O(H) space for Inorder/Preorder stacks, O(N) space for Postorder (two stacks).

### BFS (Level Order)
*   **`levelOrderTraversal(root)`**: Visits nodes level by level, left to right.
*   **File**: `src/traversals/bfsLevelOrder.js`
*   **Complexity**: O(N) time, O(W) space (max width of tree for queue).

---

## 5. Problem Descriptions and Solutions

The `src/problems/` directory contains solutions to common tree traversal interview problems.

### P1: Maximum Depth of Binary Tree
*   **Description**: Given the `root` of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
*   **Approaches**:
    *   `maxDepthDFS(root)`: Recursive Depth-First Search. (Optimal)
    *   `maxDepthBFS(root)`: Iterative Breadth-First Search. (Optimal)
*   **File**: `src/problems/p1_maxDepth.js`

### P2: Binary Tree Zigzag Level Order Traversal
*   **Description**: Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values (i.e., from left to right, then right to left for the next level and so on).
*   **Approaches**:
    *   `zigzagLevelOrder(root)`: Iterative BFS with a direction flag, using `push`/`unshift` for level-wise ordering. (Optimal)
*   **File**: `src/problems/p2_levelOrderZigzag.js`

### P3: Count Good Nodes in Binary Tree
*   **Description**: A node `X` is "good" if in the path from the root to `X`, there are no nodes with a value greater than `X.val`. Return the number of good nodes.
*   **Approaches**:
    *   `countGoodNodes(root)`: Recursive Depth-First Search, passing `maxValSoFar` down the recursion. (Optimal)
*   **File**: `src/problems/p3_countGoodNodes.js`

### P4: Path Sum III
*   **Description**: Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the nodes' values equals `targetSum`. The path does not need to start at the root or end at a leaf, but it must go downwards.
*   **Approaches**:
    *   `pathSum(root, targetSum)`: Recursive DFS with a nested DFS. (O(N^2) time complexity, simpler to understand initially)
    *   `pathSumOptimized(root, targetSum)`: Optimized DFS using prefix sums (with a hash map). (O(N) time complexity)
*   **File**: `src/problems/p4_pathSumIII.js`

---

## 6. Running Tests

This project uses `Jest` for testing. You can run all tests or specific test files.

**Run all tests:**
```bash
npm test
```

**Run a specific test file:**
```bash
npx jest tests/p1_maxDepth.test.js
```

---

## 7. Running Benchmarks

The benchmarks compare the performance of different traversal algorithms and problem solutions (e.g., recursive vs. iterative, O(N^2) vs. O(N)) on trees of varying sizes and structures (balanced, skewed).

**Run benchmarks:**
```bash
npm run benchmark
```
*Note*: For very deep skewed trees, recursive approaches might hit JavaScript's recursion stack limit (typically around 10,000-100,000 calls), which is explicitly demonstrated in the benchmarks.

---

## 8. Documentation

The `docs/` directory contains detailed explanations and diagrams.

*   **`docs/algorithms.md`**: In-depth explanation of Inorder, Preorder, Postorder, and Level Order traversals, including recursive and iterative logic, complexity analysis, and examples.
*   **`docs/interview_tips.md`**: Guidance on how to approach tree traversal problems in an interview, common pitfalls, edge cases, and variations (N-ary trees, BSTs, advanced traversals).
*   **`docs/diagrams.md`**: ASCII art visualizations of tree structures and the step-by-step paths of different traversal algorithms.

---

## 9. Contribution

Feel free to open issues or pull requests to improve this project. Suggestions for new problems, alternative solutions, or documentation enhancements are welcome!

---

## 10. License

This project is open-sourced under the MIT License.

---
```