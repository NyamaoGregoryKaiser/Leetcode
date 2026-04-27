# Dynamic Programming Interview Project

This project serves as a comprehensive resource for understanding and practicing Dynamic Programming (DP) problems, specifically tailored for coding interviews. It includes implementations of classic DP problems using various approaches (recursive, memoization, tabulation, space-optimization), detailed explanations, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Installation](#installation)
4.  [How to Run](#how-to-run)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Problems Covered](#problems-covered)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

Dynamic Programming is a powerful technique for solving problems by breaking them down into simpler subproblems and storing the results of these subproblems to avoid redundant computations. This project illustrates DP through several fundamental problems, showcasing different paradigms and optimization techniques.

## Features

*   **Multiple DP Problems**: Covers 4 classic DP problems.
*   **Diverse Solution Approaches**: Each problem includes recursive (brute force), memoized (top-down DP), tabulated (bottom-up DP), and sometimes space-optimized solutions.
*   **Detailed Comments**: In-depth explanations for logic, base cases, and recurrence relations within the code.
*   **Complexity Analysis**: Time and space complexity for each solution approach.
*   **Extensive Test Cases**: Comprehensive unit tests to ensure correctness across various scenarios (happy path, edge cases, large inputs).
*   **Performance Benchmarking**: Tools to compare the performance of different solution approaches.
*   **In-depth Documentation**: A dedicated `algorithms.md` file providing theoretical background, visual diagrams, interview tips, and problem-specific explanations.

## Installation

This project uses Node.js. Make sure you have Node.js (v14 or higher recommended) installed on your system.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp-interview-project.git
    cd dp-interview-project
    ```
2.  **No external dependencies:** This project is designed to run with plain Node.js, so no `npm install` is required for production code. The test runner and benchmarking use built-in Node.js features or simple custom utilities.

## How to Run

### Running Tests

To execute all the test cases for the implemented DP problems:

```bash
node tests/dp.test.js
```

The output will indicate whether each test suite passed or failed, along with details for any failures.

### Running Benchmarks

To compare the performance of different solution approaches for selected problems:

```bash
node benchmarks/benchmark.js
```

This will output execution times for various input sizes, demonstrating the performance improvements offered by DP solutions over brute-force recursion.

## Problems Covered

1.  **Fibonacci Sequence**:
    *   Recursive
    *   Memoization (Top-Down DP)
    *   Tabulation (Bottom-Up DP)
    *   Space-Optimized Tabulation
2.  **Coin Change**:
    *   Recursive
    *   Memoization (Top-Down DP)
    *   Tabulation (Bottom-Up DP)
3.  **Longest Common Subsequence (LCS)**:
    *   Recursive
    *   Memoization (Top-Down DP)
    *   Tabulation (Bottom-Up DP)
4.  **Knapsack Problem (0/1)**:
    *   Recursive
    *   Memoization (Top-Down DP)
    *   Tabulation (Bottom-Up DP)

## Documentation

For a deeper dive into Dynamic Programming concepts, detailed problem explanations, recurrence relations, ASCII diagrams, common pitfalls, and interview tips, please refer to:

*   **`docs/algorithms.md`**: The main documentation file.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions, find bugs, or want to add more problems/solutions.

## License

This project is licensed under the MIT License - see the LICENSE file for details (if you choose to add one). For now, it's open for use.