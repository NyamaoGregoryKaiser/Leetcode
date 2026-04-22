# Tree Traversals Project

This project explores various binary tree traversal algorithms, providing multiple implementations (recursive, iterative), detailed complexity analysis, extensive test cases, and performance benchmarking. It's designed as a comprehensive resource for understanding and practicing tree traversals, especially for coding interviews.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Setup and Running](#setup-and-running)
3.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: DFS Traversals (Inorder, Preorder, Postorder)](#problem-1-dfs-traversals-inorder-preorder-postorder)
    *   [Problem 2: BFS - Level Order Traversal](#problem-2-bfs---level-order-traversal)
    *   [Problem 3: BFS - Zigzag Level Order Traversal](#problem-3-bfs---zigzag-level-order-traversal)
    *   [Problem 4: Validate Binary Search Tree](#problem-4-validate-binary-search-tree)
    *   [Problem 5: Maximum Depth of Binary Tree](#problem-5-maximum-depth-of-binary-tree)
4.  [Project Structure](#project-structure)
5.  [Documentation](#documentation)
6.  [Performance Benchmarking](#performance-benchmarking)
7.  [Interview Tips](#interview-tips)

## Project Overview

Binary tree traversals are fundamental algorithms for visiting each node in a tree exactly once. They are broadly categorized into Depth-First Search (DFS) and Breadth-First Search (BFS). This project implements and analyzes several key traversal algorithms and their applications.

**Key Features:**
*   **Multiple Problems**: Covers core traversal techniques and common interview questions.
*   **Diverse Implementations**: Provides both recursive and iterative solutions where applicable.
*   **Detailed Explanations**: In-code comments, time/space complexity analysis, and a dedicated `ALGORITHM_EXPLANATION.md` file.
*   **Robust Testing**: Comprehensive test suites using Jest to ensure correctness.
*   **Performance Benchmarking**: A dedicated script to measure the efficiency of different approaches.
*   **Clear Structure**: Organized codebase for easy navigation and understanding.

## Setup and Running

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url-here>
    cd tree-traversals-project
    ```
    (Note: If you're creating files manually, skip this step and just create the files as specified.)

2.  **Install dependencies:**
    This project uses TypeScript and Jest for testing.
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Compile TypeScript:**
    Although `jest` and `ts-node` handle compilation for tests and benchmarks, you can manually compile the `src` directory if needed:
    ```bash
    npx tsc
    ```

4.  **Run Tests:**
    To execute the test suite for all problems:
    ```bash
    npm test
    # or
    yarn test
    ```
    To run tests for a specific file:
    ```bash
    npm test -- tests/problems/Problem1_DFS_Traversals.test.ts
    ```

5.  **Run Benchmarks:**
    To measure the performance of different implementations:
    ```bash
    npm run benchmark
    # or
    yarn benchmark
    ```

## Problem Descriptions

### Problem 1: DFS Traversals (Inorder, Preorder, Postorder)
Implement the three fundamental Depth-First Search (DFS) traversals: Inorder, Preorder, and Postorder. For each, provide both recursive and iterative solutions.

*   **Inorder Traversal**: Visit left child, then current node, then right child. For a BST, this yields elements in non-decreasing order.
*   **Preorder Traversal**: Visit current node, then left child, then right child. Useful for creating a copy of the tree or expressing tree structure.
*   **Postorder Traversal**: Visit left child, then right child, then current node. Useful for deleting a tree from leaf to root.

### Problem 2: BFS - Level Order Traversal
Implement the Breadth-First Search (BFS) traversal, also known as Level Order Traversal. This involves visiting nodes level by level, from left to right.

*   **Output**: A list of lists, where each inner list contains the nodes at a specific level.

### Problem 3: BFS - Zigzag Level Order Traversal
Implement a variation of Level Order Traversal where nodes at odd-numbered levels (0-indexed) are visited from left to right, and nodes at even-numbered levels are visited from right to left.

*   **Output**: A list of lists, similar to Level Order, but with alternating order for inner lists.

### Problem 4: Validate Binary Search Tree
Given the `root` of a binary tree, determine if it is a valid Binary Search Tree (BST).

A valid BST is defined as follows:
*   The left subtree of a node contains only nodes with values **less than** the node's value.
*   The right subtree of a node contains only nodes with values **greater than** the node's value.
*   Both the left and right subtrees must also be valid BSTs.
*   A single node or an empty tree is a valid BST.

*   **Constraint**: The problem can be efficiently solved using an Inorder Traversal variant.

### Problem 5: Maximum Depth of Binary Tree
Given the `root` of a binary tree, return its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. A leaf node is a node with no children.

*   **Approaches**: Can be solved using both DFS (recursive) and BFS (iterative).

## Project Structure

Refer to the "Project Structure" section at the top of this `README.md` for a visual overview of the directory and file organization.

## Documentation

A detailed explanation of the algorithms, including visual diagrams (ASCII art), edge cases, and interview tips, can be found in:

*   `docs/ALGORITHM_EXPLANATION.md`

## Performance Benchmarking

The `benchmarking/benchmark.ts` script allows you to compare the performance of different implementations (e.g., recursive vs. iterative) for various tree sizes. It helps in understanding the real-world implications of time complexity.

To run the benchmarks:
```bash
npm run benchmark
```

## Interview Tips

*   **Understand the Core**: Master the recursive versions of DFS traversals first, as they are often more intuitive.
*   **Iterative Conversion**: Learn how to convert recursive DFS to iterative using a stack. This is a common interview follow-up.
*   **BFS vs. DFS**: Know when to use each. BFS is for level-by-level processing, shortest path on unweighted graphs, etc. DFS is for deeper exploration, cycle detection, path finding, etc.
*   **Edge Cases**: Always consider `null` trees, single-node trees, and skewed trees.
*   **BST Properties**: Remember that an inorder traversal of a BST yields sorted elements. This is crucial for problems like "Validate BST."
*   **Space Complexity**: Be aware of the auxiliary space used. Recursive solutions use call stack space (proportional to height), while iterative solutions use explicit stack/queue space.
*   **Time Complexity**: All standard traversals visit each node once, resulting in O(N) time complexity where N is the number of nodes.

---
**Happy coding!**
---