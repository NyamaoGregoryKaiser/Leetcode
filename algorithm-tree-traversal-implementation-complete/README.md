```markdown
# Tree Traversals Coding Interview Project

This project provides a comprehensive set of solutions, tests, and documentation for various binary tree traversal problems commonly encountered in coding interviews. It aims to offer a complete package for learning, practicing, and benchmarking different traversal techniques.

## Project Structure

*   `src/main/java/tree_traversals/`: Contains the main Java source code.
    *   `TreeNode.java`: A basic class for a binary tree node.
    *   `TreeTraversals.java`: Implements various tree traversal algorithms (Inorder, Preorder, Postorder, Level Order, Zigzag Level Order, Right Side View, Vertical Order) using both recursive and iterative (stack-based) approaches where applicable.
    *   `IterativeTreeTraversals.java`: Focuses on additional, more complex iterative tree problems, demonstrating the power of iterative approaches beyond standard traversals.
    *   `MorrisTreeTraversals.java`: Implements the space-optimized Morris Traversal for Inorder, Preorder, and Postorder.
    *   `util/TreeBuilder.java`: A utility class to easily construct `TreeNode` objects from an array representation (similar to LeetCode input format).
    *   `benchmarking/TreeTraversalBenchmarker.java`: Code to benchmark the performance of different traversal algorithms on large trees.
*   `src/test/java/tree_traversals/`: Contains JUnit 5 test cases for all implemented algorithms.
    *   `TreeTraversalsTest.java`: Comprehensive test suite with various edge cases.
*   `docs/`: Contains detailed documentation.
    *   `AlgorithmExplanation.md`: Detailed explanations of each algorithm, including visual (ASCII) diagrams and complexity analysis.
    *   `InterviewTips.md`: Covers common edge cases, variations, and tips for interviews related to tree traversals.
*   `README.md`: This file, providing an overview of the project.

## Problems Covered

### 1. Standard Traversals (Recursive & Iterative)
*   **Inorder Traversal**: Left -> Root -> Right
*   **Preorder Traversal**: Root -> Left -> Right
*   **Postorder Traversal**: Left -> Right -> Root

### 2. Breadth-First Search (BFS) Traversals
*   **Level Order Traversal**: Traverse level by level.
*   **Zigzag Level Order Traversal**: Traverse levels alternating direction (left-to-right, then right-to-left, etc.).
*   **Binary Tree Right Side View**: See the nodes visible from the right side of the tree.
*   **Vertical Order Traversal**: Traverse nodes column by column.

### 3. Advanced/Specialized Iterative Problems
*   **Kth Smallest Element in a BST**: Find the Kth smallest element efficiently using iterative inorder.
*   **Path Sum**: Check if a path from root to leaf exists with a given target sum (iterative approach).
*   **Flatten Binary Tree to Linked List**: Transform a binary tree into a linked list in-place (preorder traversal order).

### 4. Space-Optimized Traversals (Morris Traversal)
*   **Morris Inorder Traversal**
*   **Morris Preorder Traversal**
*   **Morris Postorder Traversal**

## How to Run

### Prerequisites
*   Java Development Kit (JDK) 8 or higher
*   Maven (for build automation and dependency management)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd tree-traversals-project
    ```
2.  **Build the project:**
    ```bash
    mvn clean install
    ```

### Running Tests

To execute all unit tests:
```bash
mvn test
```

### Running Benchmarks

To run the performance benchmarks:
```bash
mvn exec:java -Dexec.mainClass="tree_traversals.benchmarking.TreeTraversalBenchmarker"
```

### Exploring the Code and Documentation

*   Review the `src/` directory for algorithm implementations.
*   Read `docs/AlgorithmExplanation.md` for in-depth explanations and diagrams.
*   Check `docs/InterviewTips.md` for interview-specific advice.

## Contributing

Feel free to open issues or submit pull requests to improve this project.

## License

This project is open-source and available under the MIT License.
```