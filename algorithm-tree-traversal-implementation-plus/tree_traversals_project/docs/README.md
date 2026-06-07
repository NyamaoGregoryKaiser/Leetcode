```markdown
# Tree Traversals Coding Interview Project

This project provides a comprehensive set of solutions and tools for various tree traversal problems commonly encountered in coding interviews. It aims to be a complete resource, including multiple approaches, detailed explanations, extensive tests, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Directory Structure](#directory-structure)
3.  [Build and Run Instructions](#build-and-run-instructions)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Demonstrations](#running-demonstrations)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Problem Descriptions](#problem-descriptions)
5.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Interview Tips & Variations](#interview-tips--variations)
6.  [Contributing](#contributing)

## Project Overview

Tree traversals are fundamental operations on tree data structures. Mastery of these algorithms is crucial for solving more complex tree-related problems. This project covers:

*   **Standard DFS Traversals:** Inorder, Preorder, Postorder (both recursive and iterative).
*   **BFS Traversals:** Level Order Traversal (basic and with levels separated).
*   **Advanced Traversals:** Zigzag Level Order, Boundary Traversal.
*   **BST-specific Traversal Application:** Kth Smallest Element in a BST.

Each problem includes:
*   Optimal C++ implementations.
*   Multiple approaches where applicable (e.g., recursive vs. iterative).
*   Detailed comments and complexity analysis (documented in `algorithm_explanation.md`).

## Directory Structure

```
tree_traversals_project/
├── src/
│   ├── tree_node.hpp            // Definition for TreeNode structure
│   ├── utils.hpp                // Utility functions (e.g., tree creation from vector)
│   ├── problems.hpp             // Header for traversal problem declarations
│   ├── problems.cpp             // Implementations of traversal problems
│   └── main.cpp                 // Main executable to demonstrate solutions
├── tests/
│   └── test_traversals.cpp      // Google Test based unit tests
├── benchmarks/
│   └── benchmark_traversals.cpp // Google Benchmark based performance tests
├── docs/
│   ├── README.md                // This file
│   ├── algorithm_explanation.md // Detailed explanations of algorithms, ASCII diagrams
│   └── interview_tips.md        // Interview tips, common variations, edge cases
└── scripts/
    └── build_and_run.sh         // Shell script to build and run the project
```

## Build and Run Instructions

### Prerequisites

*   **C++ Compiler:** C++17 compatible (e.g., g++ or clang++).
*   **CMake:** Version 3.10 or higher.
*   **Google Test:** For running unit tests.
*   **Google Benchmark:** For running performance benchmarks.

You can install Google Test and Google Benchmark usually via your package manager or by downloading and building from source.

**Example for Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install build-essential cmake
# For Google Test and Google Benchmark:
# It's often easier to let CMake fetch them or install system-wide.
# If installing system-wide:
# sudo apt install libgtest-dev libgoogle-benchmark-dev
# If not available as dev packages, you might need to build from source:
# git clone https://github.com/google/googletest.git
# cd googletest && mkdir build && cd build && cmake .. && make && sudo make install
# git clone https://github.com/google/benchmark.git
# cd benchmark && mkdir build && cd build && cmake .. && make && sudo make install
```

The provided `CMakeLists.txt` will attempt to find Google Test and Google Benchmark. If they are not found system-wide, you might need to specify their paths or ensure they are discoverable.

### Building the Project

Navigate to the root of the project directory and use CMake:

```bash
cd tree_traversals_project
mkdir build
cd build
cmake ..
make
```

Alternatively, you can use the provided convenience script:

```bash
cd tree_traversals_project
./scripts/build_and_run.sh build
```

### Running Demonstrations

After building, you can run the main demonstration program:

```bash
./build/bin/main_demo
```

Or using the script:

```bash
./scripts/build_and_run.sh run_demo
```

### Running Tests

After building, run the unit tests:

```bash
./build/bin/test_traversals
```

Or using the script:

```bash
./scripts/build_and_run.sh run_tests
```

### Running Benchmarks

After building, run the benchmarks:

```bash
./build/bin/benchmark_traversals
```

Or using the script:

```bash
./scripts/build_and_run.sh run_benchmarks
```

## Problem Descriptions

This section briefly describes the problems solved in `src/problems.cpp`. For detailed algorithm explanations, refer to `docs/algorithm_explanation.md`.

1.  **Standard DFS Traversals (Inorder, Preorder, Postorder)**
    *   **Inorder Traversal:** Visits the left subtree, then the root, then the right subtree. For a BST, this yields elements in sorted order.
    *   **Preorder Traversal:** Visits the root, then the left subtree, then the right subtree. Useful for copying a tree or prefix expressions.
    *   **Postorder Traversal:** Visits the left subtree, then the right subtree, then the root. Useful for deleting a tree or postfix expressions.
    *   *Implementations:* Both recursive and iterative (using a stack) approaches are provided.

2.  **Level Order Traversal (BFS)**
    *   Visits nodes level by level, from left to right.
    *   *Variants:*
        *   Basic: Returns a flat list of all nodes.
        *   Levels Separated: Returns a list of lists, where each inner list contains nodes from one level.
    *   *Implementation:* Uses a queue.

3.  **Zigzag Level Order Traversal**
    *   Similar to level order, but alternates traversal direction for each level: left-to-right for the first level, right-to-left for the second, and so on.
    *   *Implementation:* Uses a queue and reverses level vectors or a deque to alternate insertions/removals.

4.  **Boundary Traversal**
    *   Traverses the "boundary" of the tree. This typically includes the root, all left boundary nodes (excluding leaves), all leaf nodes (from left to right), and all right boundary nodes (excluding leaves, traversed from bottom-up).
    *   *Implementation:* Involves a combination of DFS techniques to collect the different parts.

5.  **Kth Smallest Element in a BST**
    *   Given a Binary Search Tree (BST) and an integer `k`, find the `k`-th smallest element.
    *   *Leverages:* The property that an inorder traversal of a BST visits nodes in ascending order.
    *   *Implementations:* Both recursive and iterative inorder traversal approaches are provided to find the `k`-th element by counting.

## Documentation

### Algorithm Explanation

A detailed document explaining the logic, steps, and complexity analysis for each algorithm, along with illustrative ASCII diagrams.
Refer to: [`docs/algorithm_explanation.md`](docs/algorithm_explanation.md)

### Interview Tips & Variations

This document covers common questions, edge cases, typical follow-up questions, and variations of tree traversal problems in an interview setting.
Refer to: [`docs/interview_tips.md`](docs/interview_tips.md)

## Contributing

Feel free to open issues or submit pull requests to improve the project, add more problems, or enhance existing solutions.
```