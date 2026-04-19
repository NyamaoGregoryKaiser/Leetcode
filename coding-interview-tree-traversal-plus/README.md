# Tree Traversals Project

This project is a comprehensive guide and implementation for various tree traversal algorithms, designed to be an excellent resource for coding interview preparation. It covers fundamental traversals, advanced variations, performance considerations, and includes detailed explanations, robust tests, and thorough documentation.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Installation](#installation)
4.  [Problems Covered](#problems-covered)
    *   [Problem 1: Inorder Traversal](#problem-1-inorder-traversal)
    *   [Problem 2: Preorder Traversal](#problem-2-preorder-traversal)
    *   [Problem 3: Postorder Traversal](#problem-3-postorder-traversal)
    *   [Problem 4: Level Order Traversal](#problem-4-level-order-traversal)
    *   [Problem 5: Zigzag Level Order Traversal](#problem-5-zigzag-level-order-traversal)
    *   [Problem 6: Maximum Depth of Binary Tree](#problem-6-maximum-depth-of-binary-tree)
    *   [Problem 7: Path Sum III](#problem-7-path-sum-iii)
    *   [Advanced: Morris Traversal](#advanced-morris-traversal)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
8.  [Contributing](#contributing)
9.  [License](#license)

## Introduction

Tree traversals are fundamental algorithms in computer science, crucial for processing data stored in tree structures. Understanding them is a prerequisite for tackling more complex tree problems in interviews. This project aims to provide a deep dive into various traversal methods, offering multiple implementation approaches (recursive, iterative), analyzing their complexity, and discussing practical considerations.

## Project Structure

```
.
├── src/                      # Source code for algorithms and utilities
│   ├── problems/             # Contains solutions for each problem
│   │   ├── ...               # e.g., inorderTraversal.js, pathSumIII.js
│   └── utils/                # Helper utilities and data structures
│       └── treeNode.js       # Basic TreeNode class and tree builder
├── tests/                    # Jest test files for verifying algorithms
│   └── problems/
│       └── ...               # e.g., inorderTraversal.test.js
├── performance/              # Scripts for benchmarking algorithm performance
│   └── benchmark.js
├── docs/                     # Comprehensive documentation
│   ├── algorithms.md         # Detailed explanation of algorithms with diagrams
│   └── interview_tips.md     # Tips for approaching tree problems in interviews
├── README.md                 # Project overview and instructions
├── package.json              # Node.js project configuration
└── .gitignore                # Files/directories to ignore in Git
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tree-traversals-project.git
    cd tree-traversals-project
    ```
2.  **Install dependencies:**
    This project uses `jest` for testing.
    ```bash
    npm install
    ```

## Problems Covered

Each problem includes multiple approaches (recursive, iterative, optimized, brute-force, memory-efficient) where applicable, detailed comments, and complexity analysis.

---

### Problem 1: Inorder Traversal

**Description:** Traverse the tree by visiting the left subtree, then the root, then the right subtree. For a Binary Search Tree (BST), this traversal retrieves elements in non-decreasing order.

**Implementations:**
*   Recursive approach
*   Iterative approach using a stack
*   (Advanced) Morris Traversal (O(1) space) - located in `src/problems/morrisTraversal.js`

**Files:**
*   `src/problems/inorderTraversal.js`
*   `tests/problems/inorderTraversal.test.js`

---

### Problem 2: Preorder Traversal

**Description:** Traverse the tree by visiting the root, then the left subtree, then the right subtree. Useful for creating a copy of the tree or serializing it.

**Implementations:**
*   Recursive approach
*   Iterative approach using a stack

**Files:**
*   `src/problems/preorderTraversal.js`
*   `tests/problems/preorderTraversal.test.js`

---

### Problem 3: Postorder Traversal

**Description:** Traverse the tree by visiting the left subtree, then the right subtree, then the root. Useful for deleting a tree or evaluating an expression tree.

**Implementations:**
*   Recursive approach
*   Iterative approach using two stacks (or one stack with careful logic)

**Files:**
*   `src/problems/postorderTraversal.js`
*   `tests/problems/postorderTraversal.test.js`

---

### Problem 4: Level Order Traversal

**Description:** Traverse the tree level by level, from left to right. This is a Breadth-First Search (BFS) for trees.

**Implementations:**
*   Iterative approach using a queue

**Files:**
*   `src/problems/levelOrderTraversal.js`
*   `tests/problems/levelOrderTraversal.test.js`

---

### Problem 5: Zigzag Level Order Traversal

**Description:** A variation of level order traversal where nodes at even levels are visited from left to right, and nodes at odd levels are visited from right to left.

**Implementations:**
*   Iterative approach using a queue and a flag to alternate direction

**Files:**
*   `src/problems/zigzagLevelOrder.js`
*   `tests/problems/zigzagLevelOrder.test.js`

---

### Problem 6: Maximum Depth of Binary Tree

**Description:** Find the longest path from the root node down to the farthest leaf node.

**Implementations:**
*   Recursive (DFS) approach
*   Iterative (BFS) approach

**Files:**
*   `src/problems/maxDepth.js`
*   `tests/problems/maxDepth.test.js`

---

### Problem 7: Path Sum III

**Description:** Given the root of a binary tree and an integer `targetSum`, return the number of paths where the sum of the nodes' values equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards.

**Implementations:**
*   **Brute-force/Recursive DFS:** For each node, perform another DFS to find paths starting from that node.
*   **Optimized with Prefix Sums:** Uses a hash map to store prefix sums encountered on the path from the root, allowing O(N) time complexity.

**Files:**
*   `src/problems/pathSumIII.js`
*   `tests/problems/pathSumIII.test.js`

---

### Advanced: Morris Traversal

**Description:** An advanced inorder traversal algorithm that uses O(1) extra space (excluding the output list) by modifying the tree structure during traversal.

**Files:**
*   `src/problems/morrisTraversal.js`

---

## Running Tests

To run all test suites:

```bash
npm test
```

To run tests for a specific problem (e.g., Inorder Traversal):

```bash
npm test tests/problems/inorderTraversal.test.js
```

## Running Benchmarks

To run the performance benchmarks for selected algorithms:

```bash
npm run benchmark
```

This will execute `performance/benchmark.js` and print the execution times for different algorithms with large inputs.

## Documentation

The `docs/` directory contains detailed explanations and diagrams:

*   **`docs/algorithms.md`**: Explains the core concepts of tree traversals, including ASCII art diagrams, time/space complexity, and common use cases.
*   **`docs/interview_tips.md`**: Provides general advice, common pitfalls, and variations for tree-related interview questions.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Suggestions for new problems, alternative solutions, or improved documentation are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details (if I were to create one, it would go here).
For now, consider it open source for educational purposes.

---