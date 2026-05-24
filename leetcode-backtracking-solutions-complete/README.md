# Backtracking Interview Project

This project provides a comprehensive resource for understanding and practicing **Backtracking algorithms**, a fundamental technique in computer science and a common topic in coding interviews. It includes multiple problems with optimal TypeScript solutions, extensive tests, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Introduction to Backtracking](#introduction-to-backtracking)
2.  [Project Structure](#project-structure)
3.  [Implemented Problems](#implemented-problems)
    *   [N-Queens](#n-queens)
    *   [Subsets II (with Duplicates)](#subsets-ii-with-duplicates)
    *   [Combination Sum II (with Duplicates)](#combination-sum-ii-with-duplicates)
    *   [Permutations II (with Duplicates)](#permutations-ii-with-duplicates)
4.  [Setup and Installation](#setup-and-installation)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
8.  [Contributing](#contributing)
9.  [License](#license)

---

## 1. Introduction to Backtracking

Backtracking is an algorithmic paradigm for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time (backtrack). It's essentially a form of depth-first search (DFS) on a state-space tree.

Key characteristics:
*   **Recursive:** Solutions are typically implemented using recursion.
*   **Exploration:** Explores all possible paths to find one or all solutions.
*   **Pruning:** Eliminates paths that cannot lead to a valid solution early, improving efficiency over brute force.

For a deeper dive, refer to the [Algorithm Explanation Document](./docs/ALGORITHM_EXPLANATION.md).

## 2. Project Structure

```
backtracking-interview-project/
├── src/
│   ├── problems/              # Core backtracking algorithm implementations
│   │   ├── nQueens.ts
│   │   ├── subsetsWithDup.ts
│   │   ├── combinationSumII.ts
│   │   ├── permuteUnique.ts
│   │   └── index.ts           # Exports for all problems
│   └── utils/                 # Utility functions (e.g., for board printing)
│       └── boardUtils.ts
├── test/                      # Jest test files for each problem
│   ├── nQueens.test.ts
│   ├── subsetsWithDup.test.ts
│   ├── combinationSumII.test.ts
│   ├── permuteUnique.test.ts
│   └── setup.ts               # Jest setup file
├── docs/                      # Comprehensive documentation
│   ├── ALGORITHM_EXPLANATION.md # Detailed explanation of backtracking
│   ├── common_pitfalls_and_tips.md # Interview tips and common errors
│   └── visuals/               # ASCII art diagrams
│       └── n_queens_diagram.txt
├── benchmarks/                # Performance benchmarking scripts
│   └── benchmarkRunner.ts
├── .gitignore
├── package.json               # Project dependencies and scripts
├── README.md                  # This file
└── tsconfig.json              # TypeScript compiler configuration
```

## 3. Implemented Problems

Each problem includes:
*   Optimal backtracking solution in TypeScript.
*   Detailed comments explaining the logic, state management, and pruning techniques.
*   Time and Space Complexity analysis.
*   Discussion of brute-force alternatives and why backtracking is superior.
*   Handling of edge cases and specific constraints (e.g., duplicates).

---

### N-Queens

**Problem Description:** The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard. This means no two queens can share the same row, column, or diagonal. Given an integer `n`, return all distinct solutions to the N-Queens puzzle. Each solution contains a distinct board configuration of the N-Queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

**Key Concepts:** Board traversal, constraint satisfaction, state modification and restoration.

### Subsets II (with Duplicates)

**Problem Description:** Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

**Key Concepts:** Combination generation, handling duplicates efficiently, sorting input.

### Combination Sum II (with Duplicates)

**Problem Description:** Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination. The solution set must not contain duplicate combinations.

**Key Concepts:** Combination generation, sum constraint, handling duplicates, sorting input.

### Permutations II (with Duplicates)

**Problem Description:** Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations in any order.

**Key Concepts:** Permutation generation, handling duplicates, using a `used` array/set for tracking, sorting input.

---

## 4. Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking-interview-project.git
    cd backtracking-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install TypeScript, Jest, ts-node, and their respective type definitions.
3.  **Build the project (compile TypeScript):**
    ```bash
    npm run build
    ```
    This compiles the TypeScript files in `src/` to JavaScript files in the `dist/` directory.

## 5. Running Tests

Tests are written using [Jest](https://jestjs.io/).

To run all tests:
```bash
npm test
```

To run tests in watch mode (reruns tests on file changes):
```bash
npm test:watch
```

## 6. Running Benchmarks

Performance benchmarks are available for the implemented algorithms.
To run the benchmarks:
```bash
npm run benchmark
```
This will execute `benchmarkRunner.ts` which measures the execution time of selected problems for various input sizes.

## 7. Documentation

The `docs/` directory contains detailed explanations:

*   **`ALGORITHM_EXPLANATION.md`**: A deep dive into the backtracking algorithm, its structure, decision trees, and common patterns.
*   **`common_pitfalls_and_tips.md`**: Practical advice for interviews, common mistakes to avoid, and variations of backtracking problems.
*   **`visuals/n_queens_diagram.txt`**: An ASCII art representation to visualize the N-Queens problem.

## 8. Contributing

Contributions are welcome! If you have suggestions for new problems, optimizations, or improvements to documentation, feel free to open an issue or submit a pull request.

## 9. License

This project is licensed under the MIT License - see the `LICENSE` file for details (Note: `LICENSE` file not explicitly created here, but implied).