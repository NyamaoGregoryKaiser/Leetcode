```markdown
# Binary Tree Traversal Project

This project provides a comprehensive set of implementations, tests, and documentation for various binary tree traversal algorithms. It's designed to be a thorough resource for understanding and practicing tree traversals, especially for coding interview preparation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Project Structure](#project-structure)
4.  [Setup and Run](#setup-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Problem Descriptions](#problem-descriptions)
    *   [1. Standard Traversals (Recursive)](#1-standard-traversals-recursive)
    *   [2. Level Order Traversal](#2-level-order-traversal)
    *   [3. Zigzag Level Order Traversal](#3-zigzag-level-order-traversal)
    *   [4. Boundary Traversal](#4-boundary-traversal)
    *   [5. Flatten Binary Tree to Linked List](#5-flatten-binary-tree-to-linked-list)
    *   [Additional: Iterative Standard Traversals](#additional-iterative-standard-traversals)
    *   [Additional: Morris Traversal (O(1) Space)](#additional-morris-traversal-o1-space)
6.  [Documentation Links](#documentation-links)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

Binary tree traversals are fundamental algorithms in computer science, widely used in various applications from data processing to search algorithms. This project delves into the most common traversal methods, offering multiple implementation strategies (recursive, iterative using stacks, and space-optimized Morris traversal) for a robust understanding. Each solution is accompanied by detailed comments, time and space complexity analysis.

## Features

*   **Diverse Traversal Problems**: Covers standard traversals (Preorder, Inorder, Postorder), Level Order (BFS), Zigzag Level Order, Boundary Traversal, and Tree Flattening.
*   **Multiple Approaches**:
    *   **Recursive**: Classic, elegant solutions.
    *   **Iterative (using Stack/Queue)**: Essential for understanding explicit control flow and avoiding stack overflow on deep trees.
    *   **Morris Traversal**: Advanced, space-optimized (O(1) auxiliary space) for Inorder and Preorder.
*   **Comprehensive Testing**: Extensive JUnit 5 test suites for all algorithms, covering edge cases (empty tree, single node, skewed trees) and various tree structures.
*   **Helper Utilities**: `TreeNode` definition and `TreeUtils` for easy tree creation from arrays, serialization, and visualization.
*   **Performance Benchmarking**: A simple benchmarking tool to compare the practical performance of different traversal implementations.
*   **Detailed Documentation**:
    *   `AlgorithmsExplanation.md`: In-depth explanation of each algorithm's logic and complexity.
    *   `TreeTraversalVisualizations.md`: ASCII art diagrams to visually illustrate tree structures and traversal paths.
    *   `InterviewTips.md`: Insights into common interview questions, edge cases, follow-ups, and strategies for success.

## Project Structure

```
tree_traversals_project/
├── pom.xml                                     # Maven Project Object Model
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── treetraversals/
│   │   │               ├── TreeNode.java                   # Basic Binary Tree Node structure
│   │   │               ├── TreeUtils.java                  # Utilities for tree creation, serialization, visualization
│   │   │               ├── TreeTraversalSolutions.java     # Main algorithms: Recursive standard, Level Order, Zigzag, Boundary, Flatten
│   │   │               ├── IterativeTreeTraversalSolutions.java # Iterative standard traversals (using Stack)
│   │   │               └── MorrisTreeTraversalSolutions.java  # Space-optimized Morris Traversal implementations
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── treetraversals/
│                       ├── TreeTraversalSolutionsTest.java # JUnit tests for TreeTraversalSolutions
│                       ├── IterativeTreeTraversalSolutionsTest.java # JUnit tests for IterativeTreeTraversalSolutions
│                       └── MorrisTreeTraversalSolutionsTest.java  # JUnit tests for MorrisTreeTraversalSolutions
├── benchmarking/
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── example/
│                       └── treetraversals/
│                           └── PerformanceBenchmark.java   # Simple performance benchmarking using System.nanoTime()
├── docs/
│   ├── README.md                               # Comprehensive Project README (this file)
│   ├── AlgorithmsExplanation.md                # Detailed explanation of algorithms, logic, and complexities
│   ├── TreeTraversalVisualizations.md          # ASCII art diagrams for tree traversals
│   └── InterviewTips.md                        # Edge cases, common questions, and interview strategies
└── .gitignore
```

## Setup and Run

### Prerequisites

*   **Java Development Kit (JDK) 11 or higher**: Ensure Java is installed and configured correctly.
*   **Apache Maven 3.6.0 or higher**: Maven is used for building the project and managing dependencies.

### Building the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tree_traversals_project.git
    cd tree_traversals_project
    ```
    *(Note: Replace `https://github.com/your-username/tree_traversals_project.git` with the actual repository URL if you host this project)*

2.  **Build the project using Maven:**
    ```bash
    mvn clean install
    ```
    This command compiles all Java source files, runs tests, and packages the project into a `.jar` file in the `target/` directory.

### Running Tests

All unit tests are written using JUnit 5. You can run them using Maven:

```bash
mvn test
```
This will execute all tests located in `src/test/java`.

### Running Benchmarks

A simple `PerformanceBenchmark.java` is included to compare the execution times of different traversal implementations.

To run the benchmark:

```bash
mvn exec:java@run-benchmark
```
This command uses the `exec-maven-plugin` configured in `pom.xml` to run the `PerformanceBenchmark` class.

## Problem Descriptions

### 1. Standard Traversals (Recursive)
*   **File**: `src/main/java/com/example/treetraversals/TreeTraversalSolutions.java`
*   **Methods**: `preorderTraversalRecursive`, `inorderTraversalRecursive`, `postorderTraversalRecursive`
*   **Description**: The fundamental ways to traverse a binary tree.
    *   **Preorder (Root-Left-Right)**: Used for creating a copy of the tree or for prefix expressions.
    *   **Inorder (Left-Root-Right)**: For Binary Search Trees (BSTs), this yields elements in non-decreasing order.
    *   **Postorder (Left-Right-Root)**: Useful for deleting nodes in a tree or for postfix expressions.
*   **Complexity**:
    *   Time: O(N) for all (N is number of nodes)
    *   Space: O(H) for all (H is tree height, O(N) in worst case for skewed tree)

### 2. Level Order Traversal
*   **File**: `src/main/java/com/example/treetraversals/TreeTraversalSolutions.java`
*   **Method**: `levelOrderTraversal`
*   **Description**: Traverses the tree level by level, from left to right. This is a Breadth-First Search (BFS) approach.
*   **Complexity**:
    *   Time: O(N)
    *   Space: O(W) (W is max width of tree, O(N) in worst case for complete tree)

### 3. Zigzag Level Order Traversal
*   **File**: `src/main/java/com/example/treetraversals/TreeTraversalSolutions.java`
*   **Method**: `zigzagLevelOrderTraversal`
*   **Description**: A variation of level order traversal where nodes are visited left-to-right on the first level, then right-to-left on the second, and so on, alternating direction for each level.
*   **Complexity**:
    *   Time: O(N)
    *   Space: O(W) (W is max width of tree, O(N) in worst case)

### 4. Boundary Traversal
*   **File**: `src/main/java/com/example/treetraversals/TreeTraversalSolutions.java`
*   **Method**: `boundaryTraversal`
*   **Description**: Traverse the boundary of a binary tree in a counter-clockwise direction. This involves:
    1.  The root node.
    2.  All nodes on the left boundary (top-down), excluding leaf nodes.
    3.  All leaf nodes (left-to-right).
    4.  All nodes on the right boundary (bottom-up), excluding leaf nodes.
*   **Complexity**:
    *   Time: O(N)
    *   Space: O(H) (for recursion stack in helpers) + O(N) (for result list)

### 5. Flatten Binary Tree to Linked List
*   **File**: `src/main/java/com/example/treetraversals/TreeTraversalSolutions.java`
*   **Method**: `flatten`
*   **Description**: Transforms the tree *in-place* into a "linked list" where each node's `right` child points to the next node in preorder sequence, and its `left` child is `null`.
*   **Complexity**:
    *   Time: O(N)
    *   Space: O(H) (for recursion stack)

### Additional: Iterative Standard Traversals
*   **File**: `src/main/java/com/example/treetraversals/IterativeTreeTraversalSolutions.java`
*   **Methods**: `preorderTraversalIterative`, `inorderTraversalIterative`, `postorderTraversalIterativeTwoStacks`, `postorderTraversalIterativeOneStack`
*   **Description**: Provides iterative implementations of Preorder, Inorder, and Postorder traversals using an explicit `Stack` data structure. The one-stack postorder is more complex but demonstrates advanced stack manipulation.
*   **Complexity**:
    *   Time: O(N) for all
    *   Space: O(H) for all (O(N) in worst case)

### Additional: Morris Traversal (O(1) Space)
*   **File**: `src/main/java/com/example/treetraversals/MorrisTreeTraversalSolutions.java`
*   **Methods**: `inorderTraversalMorris`, `preorderTraversalMorris`
*   **Description**: An advanced traversal technique that achieves O(1) auxiliary space complexity (excluding output list). It works by temporarily modifying the tree structure by creating "threads" (pointers) to predecessors and then restoring the tree.
*   **Complexity**:
    *   Time: O(N)
    *   Space: O(1) (excluding output list)

## Documentation Links

*   [**Algorithm Explanations**](docs/AlgorithmsExplanation.md): Detailed logic and complexity analysis for each algorithm.
*   [**Tree Traversal Visualizations**](docs/TreeTraversalVisualizations.md): ASCII art diagrams to help visualize tree structures and traversal paths.
*   [**Interview Tips**](docs/InterviewTips.md): Guidance on common interview questions, variations, and how to approach these problems effectively.

## Contributing

Feel free to fork this project, add more problems, alternative solutions, or improve existing ones. Pull requests are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).
```