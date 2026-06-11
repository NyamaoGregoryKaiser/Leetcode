# Binary Tree Traversals Interview Project

This project provides a comprehensive set of problems, solutions, tests, benchmarks, and documentation for Binary Tree Traversals, a fundamental topic in coding interviews. It aims to cover various traversal methods (DFS, BFS, and their variations) with optimal solutions, detailed explanations, and interview preparation resources.

## Table of Contents

1.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Standard DFS Traversals](#problem-1-standard-dfs-traversals)
    *   [Problem 2: Level Order Traversal (BFS)](#problem-2-level-order-traversal-bfs)
    *   [Problem 3: Zigzag Level Order Traversal](#problem-3-zigzag-level-order-traversal)
    *   [Problem 4: Binary Tree Right Side View](#problem-4-binary-tree-right-side-view)
2.  [Project Structure](#project-structure)
3.  [Setup and Usage](#setup-and-usage)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Building the Project](#building-the-project)
4.  [Detailed Documentation](#detailed-documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Problem Descriptions

### Problem 1: Standard DFS Traversals

Implement the three classic Depth-First Search (DFS) traversals for a binary tree:
*   **Inorder Traversal**: Visit left subtree, then root, then right subtree.
*   **Preorder Traversal**: Visit root, then left subtree, then right subtree.
*   **Postorder Traversal**: Visit left subtree, then right subtree, then root.

Provide both **recursive** and **iterative** solutions for each traversal.

**Example:**
For a tree `[1, 2, 3, 4, 5, 6, 7]` (level order representation):
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
*   **Inorder**: `[4, 2, 5, 1, 6, 3, 7]`
*   **Preorder**: `[1, 2, 4, 5, 3, 6, 7]`
*   **Postorder**: `[4, 5, 2, 6, 7, 3, 1]`

### Problem 2: Level Order Traversal (BFS)

Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example:**
For a tree `[3, 9, 20, null, null, 15, 7]`:
```
    3
   / \
  9  20
    /  \
   15   7
```
*   **Level Order**: `[[3], [9, 20], [15, 7]]`

### Problem 3: Zigzag Level Order Traversal

Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and so on. The next level again from left to right, and so on.)

**Example:**
For a tree `[3, 9, 20, null, null, 15, 7]`:
```
    3
   / \
  9  20
    /  \
   15   7
```
*   **Zigzag Level Order**: `[[3], [20, 9], [15, 7]]`

### Problem 4: Binary Tree Right Side View

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it. Return the values of the nodes you can see ordered from top to bottom.

**Example:**
For a tree `[1, 2, 3, null, 5, null, 4]`:
```
      1         <---
     / \
    2   3       <---
     \   \
      5   4     <---
```
*   **Right Side View**: `[1, 3, 4]`

## Project Structure

Refer to the top-level project structure diagram for a visual representation of the file organization.

## Setup and Usage

### Installation

1.  Make sure you have Node.js and npm installed.
2.  Navigate to the project root directory.
3.  Install development dependencies:
    ```bash
    npm install
    ```

### Running Tests

To execute all unit tests:
```bash
npm test
```
This command uses Jest to run all `.test.ts` files in the `tests/` directory.

### Running Benchmarks

To run the performance benchmarks:
```bash
npm run benchmark
```
This command uses `ts-node` to execute the `benchmark/benchmark.ts` script, which compares the performance of different traversal algorithms on various tree sizes.

### Building the Project

To compile the TypeScript code into JavaScript:
```bash
npm run build
```
This will output compiled JavaScript files into the `dist/` directory.

## Detailed Documentation

For an in-depth explanation of the algorithms, time/space complexity, ASCII diagrams, edge cases, interview tips, and variations, please refer to:

[`docs/algorithmExplanation.md`](./docs/algorithmExplanation.md)

## Contributing

Feel free to open issues or pull requests to improve the solutions, add more test cases, enhance documentation, or propose new tree traversal problems.

## License

This project is open-sourced under the MIT License.

---