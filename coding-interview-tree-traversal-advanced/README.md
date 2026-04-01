# Tree Traversals Project

This project serves as a comprehensive guide and implementation set for various tree traversal algorithms, specifically designed for coding interview preparation. It includes multiple problems, different solution approaches (recursive and iterative), detailed complexity analysis, extensive unit tests, performance benchmarks, and thorough documentation.

## Project Structure

*   `README.md`: This file, providing an overview of the project, problem descriptions, and execution instructions.
*   `documentation.md`: Contains detailed explanations of algorithms, ASCII diagrams, edge cases, and interview tips.
*   `src/`:
    *   `tree_node.py`: Defines the `TreeNode` class and helper functions to construct binary trees from array representations.
    *   `basic_traversals.py`: Implementations for Inorder, Preorder, and Postorder traversals (both recursive and iterative).
    *   `level_order_traversals.py`: Implementations for Level Order (BFS) and Zigzag Level Order traversals.
    *   `bst_traversals.py`: Implementations for validating a Binary Search Tree (BST) and finding the Kth smallest element in a BST.
*   `tests/`: Contains `unittest` based test files for each problem category, ensuring correctness across various tree structures and edge cases.
*   `benchmarks/`: Contains scripts for benchmarking the performance of different solution approaches.

## Problems Covered

### 1. Basic Tree Traversals (Inorder, Preorder, Postorder)

These are the fundamental ways to visit nodes in a binary tree.

*   **Inorder Traversal**: Left -> Root -> Right. For a BST, this yields elements in non-decreasing order.
*   **Preorder Traversal**: Root -> Left -> Right. Useful for creating a copy of the tree or expressing prefix notation.
*   **Postorder Traversal**: Left -> Right -> Root. Useful for deleting a tree or expressing postfix notation.

For each, both recursive and iterative solutions are provided.

### 2. Level Order Traversal (BFS)

Also known as Breadth-First Search (BFS), this traversal visits nodes level by level, from left to right.

### 3. Zigzag Level Order Traversal

A variation of Level Order Traversal where nodes at odd levels are visited from right to left, and nodes at even levels from left to right.

### 4. Validate Binary Search Tree (BST)

Given the `root` of a binary tree, determine if it is a valid Binary Search Tree (BST). A valid BST is defined as follows:
*   The left subtree of a node contains only nodes with keys less than the node's key.
*   The right subtree of a node contains only nodes with keys greater than the node's key.
*   Both the left and right subtrees must also be BSTs.
*   There can be no duplicate values (for strict BST definition, though some definitions allow equality).

### 5. Kth Smallest Element in a BST

Given the `root` of a Binary Search Tree (BST) and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.

## How to Run and Test

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tree_traversals_project.git
    cd tree_traversals_project
    ```

2.  **Explore the source code:**
    Navigate to the `src/` directory to view the implementations.

3.  **Run Tests:**
    From the project root directory, you can run all tests using `unittest`:
    ```bash
    python -m unittest discover tests
    ```
    Or, to run specific test files:
    ```bash
    python -m unittest tests.test_basic_traversals
    python -m unittest tests.test_level_order_traversals
    python -m unittest tests.test_bst_traversals
    ```

4.  **Run Benchmarks:**
    From the project root directory:
    ```bash
    python benchmarks/benchmark_traversals.py
    ```
    This script will compare the performance of different approaches for selected problems.

5.  **Read Documentation:**
    Open `documentation.md` in a Markdown viewer to get an in-depth understanding of the algorithms, visualize traversals with ASCII diagrams, and learn about interview tips and common pitfalls.

## Contribution

Feel free to open issues or submit pull requests if you have suggestions for improvements, new problems, or additional test cases.

---