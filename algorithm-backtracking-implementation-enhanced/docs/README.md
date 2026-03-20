# Backtracking Interview Project

This project provides a comprehensive study and implementation guide for Backtracking algorithms, a fundamental technique in computer science for solving problems recursively by trying to build a solution incrementally, one piece at a time. Whenever a solution path fails, the algorithm "backtracks" to reconsider previous choices and explore alternative paths.

This repository is designed to be a complete resource for understanding, implementing, testing, and benchmarking various Backtracking problems, making it an excellent resource for preparing for coding interviews.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
3.  [Implemented Algorithms](#implemented-algorithms)
    *   [1. Permutations](#1-permutations)
    *   [2. Combinations](#2-combinations)
    *   [3. Subsets](#3-subsets)
    *   [4. N-Queens](#4-n-queens)
    *   [5. Sudoku Solver](#5-sudoku-solver)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
backtracking-interview-project/
├── src/
│   ├── algorithms/          # Core Backtracking algorithm implementations
│   │   ├── combinations.js
│   │   ├── nqueens.js
│   │   ├── permutations.js
│   │   ├── subsets.js
│   │   └── sudokuSolver.js
│   ├── utils/               # Utility functions (e.g., array comparison)
│   │   └── arrayUtils.js
│   └── index.js             # Main entry point to demonstrate algorithms
├── tests/                   # Test files for each algorithm
│   ├── combinations.test.js
│   ├── nqueens.test.js
│   ├── permutations.test.js
│   ├── subsets.test.js
│   ├── sudokuSolver.test.js
│   └── testRunner.js        # Custom simple test runner
├── docs/                    # Comprehensive documentation
│   ├── ALGORITHM_EXPLANATION.md # In-depth explanation of Backtracking
│   ├── INTERVIEW_GUIDE.md   # Tips, common pitfalls, and variations for interviews
│   └── README.md            # This file
├── benchmarks/              # Performance benchmarking scripts
│   ├── benchmarkRunner.js
│   └── benchmarkUtils.js
├── package.json             # Project metadata and scripts
```

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking-interview-project.git
    cd backtracking-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Implemented Algorithms

Each problem is implemented in `src/algorithms/` with detailed comments, complexity analysis, and considerations for edge cases.

### 1. Permutations

Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.

*   **File:** `src/algorithms/permutations.js`
*   **Concept:** Generate all possible orderings of elements. Each element can be used exactly once.
*   **Example:** `[1, 2, 3]` -> `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

### 2. Combinations

Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`. You can return the answer in any order.

*   **File:** `src/algorithms/combinations.js`
*   **Concept:** Select `k` items from `n` items without regard to the order of selection.
*   **Example:** `n = 4, k = 2` -> `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`

### 3. Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. You can return the answer in any order.

*   **File:** `src/algorithms/subsets.js`
*   **Concept:** Generate all possible sub-collections, including the empty set. Each element can either be included or excluded.
*   **Example:** `[1, 2, 3]` -> `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

### 4. N-Queens

The N-Queens puzzle is the problem of placing `n` non-attacking queens on an `n x n` chessboard. Return all distinct solutions to the N-Queens puzzle. Each solution contains a distinct board configuration of the N-Queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

*   **File:** `src/algorithms/nqueens.js`
*   **Concept:** Place queens column by column, ensuring no two queens attack each other (same row, same column, or same diagonal).
*   **Example:** For `n = 4`, there are 2 solutions.

```
. Q . .    . . Q .
. . . Q    Q . . .
Q . . .    . . . Q
. . Q .    . Q . .
```

### 5. Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells. A Sudoku solution must satisfy all the following rules:
1. Each of the digits 1-9 must appear exactly once in each row.
2. Each of the digits 1-9 must appear exactly once in each column.
3. Each of the digits 1-9 must appear exactly once in each of the nine 3x3 sub-boxes of the grid.
The `'.'` character indicates empty cells.

*   **File:** `src/algorithms/sudokuSolver.js`
*   **Concept:** For each empty cell, try placing digits 1-9. If a placement is valid, recurse. If it leads to a solution, return true. If not, backtrack and try the next digit.
*   **Example:** Given a partially filled 9x9 board, fill it to a valid solution.

## Running Tests

A custom test runner is provided in `tests/testRunner.js`. To run all tests:

```bash
npm test
```

You can also run specific test files by calling them directly (though `npm test` runs them all).

## Running Benchmarks

Benchmarks are implemented in `benchmarks/`. To run the performance benchmarks for all algorithms:

```bash
npm run benchmark
```

This will output the execution time for different input sizes for each algorithm.

## Documentation

The `docs/` directory contains in-depth documentation:

*   **`ALGORITHM_EXPLANATION.md`**: A detailed explanation of the Backtracking paradigm, its components, general structure, and how it applies to various problems. Includes ASCII art diagrams.
*   **`INTERVIEW_GUIDE.md`**: Offers valuable advice for tackling backtracking problems in interviews, including common pitfalls, strategies for problem-solving, and questions to ask your interviewer.

## Contributing

Feel free to open issues or submit pull requests to improve this project. Suggestions for new backtracking problems, more efficient implementations, or additional documentation are welcome!

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (though for this specific output, a `LICENSE` file is not generated, but it's good practice to include one).