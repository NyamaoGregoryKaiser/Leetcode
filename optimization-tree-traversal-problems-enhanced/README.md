# Tree Traversals Coding Interview Project

This project aims to provide a comprehensive resource for mastering tree traversal algorithms, a fundamental topic in coding interviews. It includes multiple problems, various solution approaches (recursive, iterative), detailed complexity analysis, extensive tests, performance benchmarks, and thorough documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup and Installation](#setup-and-installation)
3.  [Problems Covered](#problems-covered)
4.  [Running Tests](#running-tests)
5.  [Running Performance Benchmarks](#running-performance-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
tree-traversals-project/
├── README.md
├── package.json
├── .gitignore
├── algorithms/
│   ├── TreeNode.js             # Basic Tree Node definition
│   └── traversalProblems.js    # Main algorithm implementations for various traversal problems
├── tests/
│   ├── traversalProblems.test.js # Extensive unit tests for all problems
│   └── performance.test.js     # Performance benchmarks comparing different implementations
├── utils/
│   └── treeBuilder.js          # Helper function to construct `TreeNode` objects from an array representation (e.g., [3,9,20,null,null,15,7])
└── docs/
    ├── algorithm_explanations.md # Detailed explanations of each algorithm's logic and different approaches.
    ├── traversal_diagrams.md     # Visual ASCII art diagrams illustrating tree structures and traversal paths.
    └── interview_tips.md         # General tips for approaching tree problems in interviews, common follow-ups, and related concepts.
```

## Setup and Installation

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

The `algorithms/traversalProblems.js` file contains solutions for the following problems:

1.  **Basic Traversals:**
    *   **Inorder Traversal:** Left -> Root -> Right
    *   **Preorder Traversal:** Root -> Left -> Right
    *   **Postorder Traversal:** Left -> Right -> Root
    *   _Solutions provided for both recursive and iterative approaches._

2.  **Level Order Traversal (BFS):** Traverse the tree level by level.

3.  **Zigzag Level Order Traversal:** Similar to Level Order, but alternate the order of nodes for each level (left-to-right, then right-to-left, and so on).

4.  **Maximum Depth of Binary Tree:** Find the longest path from the root node down to the farthest leaf node.

5.  **Path Sum III:** Given the root of a binary tree and an integer `targetSum`, return the number of paths where the sum of the nodes along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards (parent to child).

For detailed problem descriptions, algorithmic explanations, and complexities, please refer to [`docs/algorithm_explanations.md`](./docs/algorithm_explanations.md).

## Running Tests

To run all unit tests:

```bash
npm test
```

This will execute tests defined in `tests/traversalProblems.test.js`.

## Running Performance Benchmarks

To run the performance benchmarks:

```bash
npm run benchmark
```

This will execute the benchmarks defined in `tests/performance.test.js`, comparing the performance of different implementations (e.g., recursive vs. iterative traversals) for various tree sizes.

## Documentation

The `docs/` directory contains comprehensive documentation:

*   [`docs/algorithm_explanations.md`](./docs/algorithm_explanations.md): In-depth explanations of each algorithm, including intuition, step-by-step logic, and comparison of different approaches.
*   [`docs/traversal_diagrams.md`](./docs/traversal_diagrams.md): Visual ASCII art diagrams to help understand tree structures and how different traversals work.
*   [`docs/interview_tips.md`](./docs/interview_tips.md): Valuable advice for coding interviews, focusing on tree-related questions, common pitfalls, and follow-up questions.

## Contributing

Feel free to open issues or submit pull requests for improvements, bug fixes, or additional problems/solutions.

## License

This project is licensed under the MIT License - see the LICENSE file for details. (Note: A `LICENSE` file is not included in this prompt, but would typically be added).