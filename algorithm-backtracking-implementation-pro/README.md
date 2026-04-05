# Backtracking Interview Project

This project is a comprehensive resource for understanding and practicing Backtracking algorithms, a fundamental technique in computer science and a common topic in coding interviews. It includes implementations of classic Backtracking problems, detailed explanations, extensive test cases, performance benchmarks, and interview tips.

## Table of Contents

1.  [Introduction to Backtracking](#introduction-to-backtracking)
2.  [Project Structure](#project-structure)
3.  [Problems Implemented](#problems-implemented)
    *   [N-Queens](#n-queens)
    *   [Sudoku Solver](#sudoku-solver)
    *   [Permutations](#permutations)
    *   [Subsets](#subsets)
4.  [Building and Running](#building-and-running)
    *   [Building](#building)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Running Main Demos (TBD/Via tests/benchmarks)](#running-main-demos)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)

## Introduction to Backtracking

Backtracking is an algorithmic paradigm for solving problems, typically constraint-based, by systematically trying all possible solutions. It builds a solution incrementally, and if a partial solution cannot be completed to a valid solution, it "backtracks" (undoes its last choice) and tries another option. It's often visualized as exploring a state-space tree.

Key characteristics:
*   **Recursive Nature:** Backtracking is almost always implemented recursively.
*   **Choices:** At each step, there are multiple choices to make.
*   **Constraints:** Rules that limit valid choices or valid partial solutions.
*   **Goal:** A condition that determines if a complete, valid solution has been found.
*   **Pruning:** Optimizing by cutting off branches of the search tree that cannot lead to a solution.

## Project Structure

The project is organized into `src`, `tests`, `benchmarks`, and `docs` directories, along with a `CMakeLists.txt` for easy building. Refer to the project tree at the top of this README for details.

## Problems Implemented

This project includes optimal C++ implementations for the following Backtracking problems:

### N-Queens

*   **Problem Description:** The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard. A queen can attack horizontally, vertically, and diagonally. The goal is to find all distinct solutions to the N-Queens puzzle.
*   **Approach:** We use a recursive backtracking function that tries to place a queen in each column, row by row. Before placing a queen, we check if the position is safe (no other queen attacks it). If a position is safe, we place the queen and recurse for the next row. If no safe position is found in a row, we backtrack.
*   **Location:** `src/n_queens.cpp`

### Sudoku Solver

*   **Problem Description:** Write a program to solve a Sudoku puzzle by filling the empty cells. A Sudoku solution must satisfy all of the following rules:
    1.  Each of the digits 1-9 must occur exactly once in each row.
    2.  Each of the digits 1-9 must occur exactly once in each column.
    3.  Each of the digits 1-9 must occur exactly once in each of the nine 3x3 sub-boxes of the grid.
    The given board contains only digits 1-9 and the character '.'. It is guaranteed that there will be only one unique solution.
*   **Approach:** We use a recursive backtracking function. We find an empty cell, try placing digits 1-9. For each digit, we check if it's valid according to Sudoku rules. If valid, we place it and recursively call the solver for the next empty cell. If the recursive call returns true (meaning a solution was found), we return true. If not, we backtrack (undo the placement) and try the next digit.
*   **Location:** `src/sudoku_solver.cpp`

### Permutations

*   **Problem Description:** Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.
*   **Approach:** We use a recursive backtracking function. We maintain a `current_permutation` and a `used` boolean array (or `std::vector<bool>`) to track which numbers have been used. At each step, we iterate through `nums`. If a number hasn't been used, we add it to `current_permutation`, mark it as used, and recurse. After the recursive call, we backtrack by removing the number and marking it as unused.
*   **Location:** `src/permutations.cpp`

### Subsets

*   **Problem Description:** Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.
*   **Approach (Backtracking):** We use a recursive backtracking function. At each step, for a given element `nums[i]`, we have two choices: either include it in the current subset or exclude it. We generate subsets by either including the current element and recursing, or excluding it and recursing.
*   **Approach (Iterative/Bit Manipulation - in `optimized_solutions.cpp`):** An alternative approach for generating subsets involves bit manipulation. For an array of N elements, there are 2^N subsets. Each subset can be represented by a binary number from 0 to 2^N - 1. If the k-th bit of the binary number is set, the k-th element of the input array is included in the subset.
*   **Location:** `src/subsets.cpp`, `src/optimized_solutions.cpp`

## Building and Running

This project uses CMake for building.

### Building

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking_interview_project.git
    cd backtracking_interview_project
    ```
2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```
3.  **Configure CMake:**
    ```bash
    cmake ..
    ```
4.  **Build the project:**
    ```bash
    make
    ```
    This will generate executables `run_tests` and `run_benchmarks` in the `build` directory.

### Running Tests

To execute all the test cases:
```bash
./run_tests
```
The output will indicate if all tests passed or which ones failed.

### Running Benchmarks

To run performance benchmarks for the implemented algorithms:
```bash
./run_benchmarks
```
This will display execution times for various problem sizes and instances.

### Running Main Demos (TBD/Via tests/benchmarks)

Currently, the primary way to "run" the algorithms is through the test suite and benchmark suite, which call the algorithm functions with specific inputs and verify their outputs or measure their performance. A separate `main.cpp` for interactive demos can be added if needed, but for interview prep, testing and benchmarking are usually sufficient.

## Documentation

The `docs/` directory contains rich documentation to help understand Backtracking concepts:

*   **`backtracking_explanation.md`**: A deep dive into the Backtracking paradigm, its structure, and common optimizations.
*   **`visual_diagrams.md`**: ASCII art diagrams to visually explain the search space and backtracking process for problems like N-Queens and Sudoku.
*   **`edge_cases_gotchas.md`**: A guide to common pitfalls, tricky scenarios, and important considerations when implementing Backtracking.
*   **`interview_tips.md`**: Advice on how to approach Backtracking problems in a coding interview, how to communicate your thoughts, and what interviewers look for.

## Contributing

Feel free to contribute by:
*   Adding more Backtracking problems.
*   Improving existing implementations or adding alternative approaches.
*   Expanding test cases or benchmarks.
*   Enhancing documentation or adding more visual aids.
*   Refactoring code for better readability or performance.

Please open an issue or submit a pull request!
---