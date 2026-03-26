```markdown
# Comprehensive Tree Traversals Project

This project is designed to be a thorough resource for understanding and implementing various tree traversal algorithms. It's structured as a coding interview project, offering multiple problems, diverse solutions (recursive, iterative, space-optimized), extensive testing, and detailed documentation.

## Table of Contents

-   [Introduction](#introduction)
-   [Project Structure](#project-structure)
-   [Installation and Setup](#installation-and-setup)
-   [Problems Covered](#problems-covered)
-   [Running Tests](#running-tests)
-   [Running Benchmarks](#running-benchmarks)
-   [Documentation](#documentation)
    -   [Algorithm Explanations](#algorithm-explanations)
    -   [Interview Tips](#interview-tips)

## Introduction

Tree traversals are fundamental algorithms in computer science, used for visiting nodes in a tree data structure in a specific order. They form the basis for solving a wide range of tree-related problems. This project explores Depth-First Search (DFS) traversals (Inorder, Preorder, Postorder) and Breadth-First Search (BFS) traversals (Level Order), along with their variations and applications.

We've implemented solutions in TypeScript, demonstrating both recursive and iterative approaches, and also covered advanced topics like O(1) space Morris Traversal.

## Project Structure

```
tree-traversals-project/
├── src/
│   ├── algorithms/
│   │   ├── treeTraversals.ts              # Main recursive/iterative traversal algorithms (DFS, BFS)
│   │   └── treeTraversalVariations.ts     # Advanced/memory-efficient traversals (e.g., Morris)
│   ├── data-structures/
│   │   └── TreeNode.ts                    # Definition of the TreeNode class and tree builders
│   └── utils/
│       └── benchmarking.ts                # Utility for performance measurement
├── tests/
│   ├── treeTraversals.test.ts             # Test cases for main algorithms
│   └── treeTraversalVariations.test.ts    # Test cases for advanced algorithms
├── docs/
│   ├── README.md                          # Project overview, setup, and problem descriptions
│   ├── ALGORITHM_EXPLANATION.md           # Detailed algorithm explanations, diagrams, complexity
│   └── INTERVIEW_TIPS.md                  # Interview strategies, common pitfalls, and variations
├── package.json
├── tsconfig.json
```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd tree-traversals-project
    ```
2.  **Install dependencies:**
    This project uses `typescript` and `jest` for development and testing.
    ```bash
    npm install
    # or
    yarn install
    ```

## Problems Covered

The `src/algorithms` directory contains implementations for the following problems/traversals:

### `src/algorithms/treeTraversals.ts`

1.  **Standard DFS Traversals:**
    *   **Inorder Traversal:** Left -> Root -> Right (Recursive and Iterative)
    *   **Preorder Traversal:** Root -> Left -> Right (Recursive and Iterative)
    *   **Postorder Traversal:** Left -> Right -> Root (Recursive and Iterative using two stacks)
2.  **Level Order Traversal (BFS):** Returns nodes level by level.
3.  **Zigzag Level Order Traversal:** Alternates between left-to-right and right-to-left for each level. (Optimized version also included)
4.  **Maximum Depth of Binary Tree:** Finds the height of the tree (Recursive DFS and Iterative BFS).
5.  **Symmetric Tree:** Checks if a binary tree is a mirror image of itself (Recursive and Iterative).

### `src/algorithms/treeTraversalVariations.ts`

1.  **Morris Inorder Traversal:** An advanced, space-efficient (O(1) extra space) inorder traversal that modifies the tree structure temporarily.
2.  **Iterative Postorder Traversal (Single Stack):** A more complex iterative postorder implementation using only one stack. An alternative, easier-to-understand single-stack approach (reverse of preorder) is also provided.

## Running Tests

We use `jest` for our test suite. To run all tests:

```bash
npm test
# or
yarn test
```

To run tests in watch mode (reruns tests on file changes):

```bash
npm test -- --watch
# or
yarn test -- --watch
```

## Running Benchmarks

The `src/utils/benchmarking.ts` file provides a utility to measure the performance of algorithms.

To run the example benchmarks:

1.  Compile the TypeScript files:
    ```bash
    npm run build
    ```
    (This runs `tsc` as defined in `package.json` scripts)
2.  Execute the compiled benchmark script:
    ```bash
    node dist/src/utils/benchmarking.js
    ```

You can modify `src/utils/benchmarking.ts` to benchmark different functions or with different tree sizes and structures.

## Documentation

### Algorithm Explanations

For detailed explanations of each algorithm, including logic, pseudocode ideas, time/space complexity analysis, and ASCII art diagrams, please refer to:
[docs/ALGORITHM_EXPLANATION.md](docs/ALGORITHM_EXPLANATION.md)

### Interview Tips

For advice on approaching tree traversal problems in an interview, common pitfalls, variations to expect, and questions to ask, please refer to:
[docs/INTERVIEW_TIPS.md](docs/INTERVIEW_TIPS.md)

---
```