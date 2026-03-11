```markdown
# 🌳 Tree Traversals Interview Project 🌳

This project provides a comprehensive set of problems, solutions, and documentation related to binary tree traversals, designed to help prepare for coding interviews.

## 🚀 Project Overview

Binary tree traversals are fundamental algorithms in computer science and a common topic in coding interviews. This project covers various traversal types (DFS, BFS, and variations), offering multiple implementation approaches, detailed complexity analysis, and extensive test cases.

### ✨ Features

*   **Core Traversal Algorithms**: Preorder, Inorder, Postorder, Level Order, Zigzag Level Order.
*   **Problem-Solving**: Applied traversals to find tree properties (Max Depth) and solve complex pathfinding (Path Sum III).
*   **Multiple Approaches**: For many problems, both recursive and iterative solutions are provided. For `Path Sum III`, brute-force and optimized solutions are shown.
*   **Detailed Documentation**: In-code comments, separate algorithm explanation, and interview tips.
*   **Robust Testing**: Comprehensive test suite with various edge cases.
*   **Performance Benchmarking**: Compare the efficiency of different algorithms and approaches.
*   **Helper Utilities**: `TreeNode` class and `TreeBuilder` for easy tree creation.

## 📂 Project Structure

```
tree-traversals-project/
├── src/
│   ├── data-structures/
│   │   └── TreeNode.js             # Basic Binary Tree Node definition.
│   ├── problems/
│   │   ├── TraversalBasics.js      # Inorder, Preorder, Postorder (Recursive & Iterative)
│   │   ├── LevelOrderTraversal.js  # Level Order Traversal (BFS)
│   │   ├── ZigzagLevelOrder.js     # Zigzag Level Order Traversal (BFS variation)
│   │   ├── MaxDepth.js             # Maximum Depth of Binary Tree (Recursive & Iterative)
│   │   └── PathSumIII.js           # Path Sum III (Brute force & Optimized with Prefix Sums)
│   └── utils/
│       └── TreeBuilder.js          # Utility to build trees from array representations.
├── tests/
│   ├── TraversalBasics.test.js
│   ├── LevelOrderTraversal.test.js
│   ├── ZigzagLevelOrder.test.js
│   ├── MaxDepth.test.js
│   ├── PathSumIII.test.js
│   └── testRunner.js               # Simple custom test runner.
├── benchmarks/
│   └── benchmark.js                # Performance comparison script.
├── docs/
│   ├── README.md                   # This file.
│   ├── ALGORITHM_EXPLANATION.md    # Detailed explanation of traversal algorithms with ASCII diagrams.
│   └── INTERVIEW_GUIDE.md          # Interview tips, common variations, and gotchas.
└── package.json
```

## 📋 Problem Descriptions

Here's a brief overview of the problems addressed in this project:

### 1. Basic DFS Traversals: Inorder, Preorder, Postorder

*   **Description**: Given the root of a binary tree, return the values of its nodes in Preorder (Root, Left, Right), Inorder (Left, Root, Right), and Postorder (Left, Right, Root).
*   **Approaches**: Recursive and Iterative (using stacks).

### 2. Level Order Traversal (BFS)

*   **Description**: Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
*   **Approach**: Iterative (using a queue).

### 3. Zigzag Level Order Traversal

*   **Description**: Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and so on).
*   **Approach**: Iterative (using a queue and direction flag).

### 4. Maximum Depth of Binary Tree

*   **Description**: Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
*   **Approaches**: Recursive (DFS) and Iterative (BFS and DFS with explicit stack).

### 5. Path Sum III

*   **Description**: Given the root of a binary tree and an integer `targetSum`, return the number of paths where the sum of the nodes' values equals `targetSum`. A path does not need to start or end at the root or a leaf, but it must go downwards.
*   **Approaches**: Brute-force (O(N^2)) and Optimized (O(N) using DFS with prefix sums/hash map).

## 🛠️ How to Run

### Prerequisites

*   Node.js (v14 or higher recommended)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/tree-traversals-project.git
    cd tree-traversals-project
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Tests

To run all the provided test cases:

```bash
npm test
```

### Running Benchmarks

To run performance benchmarks for different algorithms:

```bash
npm run benchmark
```
*Note: Benchmarking for very large trees might require increasing Node.js's stack size for recursive solutions (e.g., `node --stack-size=4096 benchmarks/benchmark.js`). Iterative solutions are generally more robust to deep trees.*

## 📖 Documentation & Learning

Dive deeper into the algorithms and interview preparation:

*   **Algorithm Explanations**: Read `docs/ALGORITHM_EXPLANATION.md` for detailed breakdowns of DFS and BFS traversals, including ASCII diagrams and logic.
*   **Interview Guide**: Check `docs/INTERVIEW_GUIDE.md` for common interview questions, variations, edge cases, and tips on how to approach and articulate your solutions.

---

Feel free to explore the code, run the tests, and use this project as a resource for mastering tree traversals!
```