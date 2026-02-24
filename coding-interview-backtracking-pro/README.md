# Backtracking Interview Project

This project serves as a comprehensive resource for understanding and implementing Backtracking algorithms, a fundamental technique for solving a wide range of combinatorial problems. It's designed to be a robust practice environment for coding interviews, featuring multiple problems, optimized solutions, testing, benchmarking, and detailed documentation.

## Table of Contents

1.  [Introduction to Backtracking](#introduction-to-backtracking)
2.  [Project Structure](#project-structure)
3.  [Main Algorithm Implementations](#main-algorithm-implementations)
    *   [N-Queens Problem](#n-queens-problem)
    *   [Sudoku Solver](#sudoku-solver)
    *   [Combination Sum II](#combination-sum-ii)
    *   [Permutations](#permutations)
4.  [Supporting Files](#supporting-files)
    *   [Tests](#tests)
    *   [Utilities](#utilities)
    *   [Benchmarking](#benchmarking)
5.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Edge Cases and Gotchas](#edge-cases-and-gotchas)
    *   [Interview Tips](#interview-tips)
6.  [Additional Implementations](#additional-implementations)
    *   [Brute Force vs. Optimized (N-Queens Less Pruned)](#brute-force-vs-optimized-n-queens-less-pruned)
    *   [Different Paradigms (Permutations Iterative)](#different-paradigms-permutations-iterative)
    *   [Memory-Efficient Versions (Subsets Bitmask)](#memory-efficient-versions-subsets-bitmask)
7.  [How to Compile and Run](#how-to-compile-and-run)
8.  [License](#license)

## Introduction to Backtracking

Backtracking is an algorithmic paradigm that systematically tries to build a solution to a computational problem incrementally. It explores all possible paths to find a solution. If a path (partial solution) is found to not lead to a valid full solution, the algorithm "backtracks" (undoes its last choice) and tries a different path. This technique is often used for problems like puzzles, combinatorial optimization, and constraint satisfaction.

Key characteristics:
*   **Recursive nature**: Backtracking is typically implemented using recursion.
*   **Choices**: At each step, there are multiple choices to make.
*   **Constraints**: Rules that limit valid choices or invalidate partial solutions.
*   **Goal**: A condition that signifies a complete and valid solution has been found.
*   **"Undo" operation**: Crucial for exploring different paths, restoring the state before the last choice was made.

## Project Structure

```
.
├── src/                                // Contains the core optimal backtracking implementations
├── tests/                              // Contains unit tests for each problem
├── utils/                              // Common helper functions (e.g., printing, timing)
├── docs/                               // Comprehensive documentation on backtracking
├── benchmarking/                       // Code for performance analysis
├── bruteforce_vs_optimized/            // Demonstrates impact of pruning on N-Queens
├── different_paradigms/                // Shows alternative approaches (e.g., iterative permutations)
├── memory_efficient_versions/          // Examples of memory-optimized solutions (e.g., subsets via bitmask)
└── README.md                           // This file
```

## Main Algorithm Implementations

The `src/` directory contains optimal C++ implementations for several classic backtracking problems. Each file includes detailed comments, logic explanations, and complexity analysis.

### N-Queens Problem

The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard. A queen can attack horizontally, vertically, and diagonally.

*   **File**: `src/n_queens.cpp`
*   **Approach**: Recursive backtracking. At each row, try to place a queen in a valid column. Use boolean arrays to efficiently check for column, diagonal, and anti-diagonal conflicts.
*   **Optimal Solution**: Finds all distinct solutions.

### Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells. A Sudoku board can be solved if it follows the standard Sudoku rules:
1.  Each of the digits 1-9 must occur exactly once in each row.
2.  Each of the digits 1-9 must occur exactly once in each column.
3.  Each of the digits 1-9 must occur exactly once in each of the nine 3x3 sub-boxes of the grid.

*   **File**: `src/sudoku_solver.cpp`
*   **Approach**: Recursive backtracking. Iterate through the board, and for each empty cell, try digits from '1' to '9'. If a digit is valid, place it and recursively try to solve the rest of the board. If the recursion fails, backtrack by removing the digit and trying the next one.
*   **Optimal Solution**: Solves the puzzle in-place, finding one valid solution.

### Combination Sum II

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination. Note: The solution set must not contain duplicate combinations.

*   **File**: `src/combination_sum_ii.cpp`
*   **Approach**: Recursive backtracking with pruning. Sort the `candidates` array to handle duplicates efficiently. When making choices, skip duplicate numbers to ensure unique combinations.
*   **Optimal Solution**: Finds all unique combinations.

### Permutations

Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.

*   **File**: `src/permutations.cpp`
*   **Approach**: Recursive backtracking. Maintain a `used` boolean array to track which numbers have already been placed in the current permutation.
*   **Optimal Solution**: Generates all permutations.

## Supporting Files

### Tests

*   **File**: `tests/test_main.cpp`
*   **Description**: Contains a `main` function to run various test cases for each implemented algorithm. It uses simple assertions and prints results to the console, making it easy to verify correctness. Includes a range of test cases, from small inputs to edge cases.

### Utilities

*   **File**: `utils/helpers.hpp`
*   **Description**: Provides helper functions such as `printBoard` (for N-Queens/Sudoku) and `printVectorOfVectors` (for combinations/permutations) to neatly display results. Also includes a simple `Timer` class for benchmarking.

### Benchmarking

*   **File**: `benchmarking/benchmark_main.cpp`
*   **Description**: Contains code to measure the performance of the backtracking algorithms for different input sizes. This helps in understanding their time complexity in practice and observing how execution time scales with input.

## Documentation

The `docs/` directory provides comprehensive explanations and tips.

### Algorithm Explanation

*   **File**: `docs/algorithm_explanation.md`
*   **Description**: A detailed general explanation of what backtracking is, its core components, when to use it, and a general pseudocode template. It also includes specific explanations for each problem, illustrating how the backtracking template applies, along with ASCII art diagrams to visualize the search space or problem state.

### Edge Cases and Gotchas

*   **File**: `docs/edge_cases_gotchas.md`
*   **Description**: Highlights common pitfalls when implementing backtracking (e.g., forgetting to "undo" choices, incorrect pruning, handling duplicates) and discusses important edge cases for the given problems (e.g., empty input, no solution, very small `N`).

### Interview Tips

*   **File**: `docs/interview_tips.md`
*   **Description**: Provides practical advice for approaching backtracking problems in a coding interview setting. This includes strategies for thinking out loud, designing the recursive state, identifying base cases, drawing recursion trees, and analyzing complexity.

## Additional Implementations

These files demonstrate variations or alternative approaches to specific problems, fulfilling common interview discussions.

### Brute Force vs. Optimized (N-Queens Less Pruned)

*   **File**: `bruteforce_vs_optimized/n_queens_less_pruned.cpp`
*   **Description**: Implements a version of the N-Queens problem where the validity check for placing a queen is performed *only after* all N queens have been placed. This contrasts with the optimized version in `src/` which checks for validity at each step, pruning invalid branches much earlier. This clearly demonstrates the impact of effective pruning in backtracking.

### Different Paradigms (Permutations Iterative)

*   **File**: `different_paradigms/permutations_iterative.cpp`
*   **Description**: Shows an iterative way to generate permutations, specifically using a simulated DFS with an explicit stack, or by adapting the `next_permutation` algorithm. This offers an alternative to the typical recursive backtracking.

### Memory-Efficient Versions (Subsets Bitmask)

*   **File**: `memory_efficient_versions/subsets_bitmask.cpp`
*   **Description**: While not directly a backtracking solution, this file demonstrates a highly memory-efficient way to generate all subsets of a given set using bit manipulation. This is an excellent alternative for subset problems where the number of elements is small (`N <= 20`), showcasing a different algorithmic paradigm that can be more efficient for specific constraints.

## How to Compile and Run

This project uses C++17 and can be compiled with `g++`.

1.  **Navigate to the project root directory**:
    ```bash
    cd backtracking_interview_project
    ```

2.  **Compile and Run Tests**:
    ```bash
    g++ -std=c++17 -Wall -O2 tests/test_main.cpp src/*.cpp utils/helpers.hpp -o test_runner
    ./test_runner
    ```

3.  **Compile and Run Benchmarks**:
    ```bash
    g++ -std=c++17 -Wall -O2 benchmarking/benchmark_main.cpp src/*.cpp utils/helpers.hpp -o benchmark_runner
    ./benchmark_runner
    ```

4.  **Compile and Run Specific Additional Files**:
    *   **N-Queens Less Pruned**:
        ```bash
        g++ -std=c++17 -Wall -O2 bruteforce_vs_optimized/n_queens_less_pruned.cpp utils/helpers.hpp -o nqueens_less_pruned
        ./nqueens_less_pruned
        ```
    *   **Permutations Iterative**:
        ```bash
        g++ -std=c++17 -Wall -O2 different_paradigms/permutations_iterative.cpp utils/helpers.hpp -o permutations_iterative
        ./permutations_iterative
        ```
    *   **Subsets Bitmask**:
        ```bash
        g++ -std=c++17 -Wall -O2 memory_efficient_versions/subsets_bitmask.cpp utils/helpers.hpp -o subsets_bitmask
        ./subsets_bitmask
        ```

## License

This project is open-source and available under the MIT License.

---