# Tree Traversals Coding Interview Project

This project is a comprehensive guide and implementation for various tree traversal algorithms, specifically tailored for coding interview preparation. It covers fundamental traversal methods (Inorder, Preorder, Postorder, Level Order), advanced techniques (Zigzag Level Order, Morris Traversal), and practical problems that leverage these traversals (BST Validation, All Paths from Root to Leaf).

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Main Algorithms Covered](#main-algorithms-covered)
    *   [Problem 1: Basic DFS Traversals (Inorder, Preorder, Postorder)](#problem-1-basic-dfs-traversals-inorder-preorder-postorder)
    *   [Problem 2: Basic BFS Traversals (Level Order)](#problem-2-basic-bfs-traversals-level-order)
    *   [Problem 3: Zigzag Level Order Traversal](#problem-3-zigzag-level-order-traversal)
    *   [Problem 4: Validate Binary Search Tree](#problem-4-validate-binary-search-tree)
    *   [Problem 5: All Paths from Root to Leaf](#problem-5-all-paths-from-root-to-leaf)
    *   [Bonus: Morris Traversal (O(1) Space Inorder/Preorder)](#bonus-morris-traversal-o1-space-inorderpreorder)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Interview Guide](#interview-guide)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

```
tree_traversals_project/
├── src/                        # Source code for algorithms and data structures
│   ├── data_structures.py      # Definition of TreeNode, utility for tree creation
│   ├── traversals.py           # Implementations for the core traversal problems
│   ├── morris_traversal.py     # Implementation of Morris Traversal (O(1) space)
│   └── __init__.py             # Makes src a Python package
├── tests/                      # Unit tests for all implementations
│   ├── test_data_structures.py # Tests for tree building utilities
│   ├── test_traversals.py      # Tests for basic, level-order, zigzag, BST validation, all paths
│   └── test_morris_traversal.py# Tests for Morris Traversal
├── docs/                       # Comprehensive documentation
│   ├── README.md               # This file
│   ├── algorithm_explanation.md# Detailed algorithm explanations, ASCII diagrams, complexity
│   └── interview_guide.md      # Interview tips, common variations, edge cases, gotchas
├── benchmarks/                 # Performance benchmarking scripts
│   └── benchmark_traversals.py # Compares different traversal implementations
├── requirements.txt            # Python dependencies
└── .gitignore                  # Git ignore file
```

## Main Algorithms Covered

### Problem 1: Basic DFS Traversals (Inorder, Preorder, Postorder)

**Description:** Implement the three fundamental Depth-First Search (DFS) traversals: Inorder (Left -> Root -> Right), Preorder (Root -> Left -> Right), and Postorder (Left -> Right -> Root). Provide both recursive and iterative solutions for each.

**Key Files:**
*   `src/traversals.py`
*   `src/data_structures.py`
*   `tests/test_traversals.py`

### Problem 2: Basic BFS Traversals (Level Order)

**Description:** Implement Breadth-First Search (BFS) for a tree, also known as Level Order Traversal. The traversal should visit nodes level by level, from left to right.

**Key Files:**
*   `src/traversals.py`
*   `src/data_structures.py`
*   `tests/test_traversals.py`

### Problem 3: Zigzag Level Order Traversal

**Description:** Given a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

**Key Files:**
*   `src/traversals.py`
*   `src/data_structures.py`
*   `tests/test_traversals.py`

### Problem 4: Validate Binary Search Tree

**Description:** Given the `root` of a binary tree, determine if it is a valid Binary Search Tree (BST). A valid BST has the following properties:
*   The left subtree of a node contains only nodes with keys less than the node's key.
*   The right subtree of a node contains only nodes with keys greater than the node's key.
*   Both the left and right subtrees must also be binary search trees.

**Key Files:**
*   `src/traversals.py`
*   `src/data_structures.py`
*   `tests/test_traversals.py`

### Problem 5: All Paths from Root to Leaf

**Description:** Given the `root` of a binary tree, return all root-to-leaf paths. Each path should be represented as a list of node values.

**Key Files:**
*   `src/traversals.py`
*   `src/data_structures.py`
*   `tests/test_traversals.py`

### Bonus: Morris Traversal (O(1) Space Inorder/Preorder)

**Description:** Implement Morris Traversal for Inorder and Preorder. This advanced traversal technique visits nodes without using a recursion stack or an explicit stack/queue, achieving O(1) auxiliary space complexity. It modifies the tree structure temporarily by creating threaded links and then restores it.

**Key Files:**
*   `src/morris_traversal.py`
*   `src/data_structures.py`
*   `tests/test_morris_traversal.py`

## Getting Started

### Prerequisites

*   Python 3.6+

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tree_traversals_project.git
    cd tree_traversals_project
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

### Running Tests

To run all unit tests:
```bash
python -m unittest discover tests
```
Or, if you have `pytest` installed (recommended, as listed in `requirements.txt`):
```bash
pytest tests
```

### Running Benchmarks

To run the performance benchmarks:
```bash
python benchmarks/benchmark_traversals.py
```

## Documentation

### Algorithm Explanation

For detailed explanations of each algorithm, including logic, ASCII diagrams, and complexity analysis, please refer to:
[docs/algorithm_explanation.md](docs/algorithm_explanation.md)

### Interview Guide

For tips on interviewing, common variations of these problems, handling edge cases, and common gotchas, please refer to:
[docs/interview_guide.md](docs/interview_guide.md)

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details (if applicable, otherwise state as per your choice).