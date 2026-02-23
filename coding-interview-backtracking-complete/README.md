# Backtracking Algorithms Interview Project

This project is a comprehensive resource for mastering backtracking algorithms, a fundamental technique in computer science and a common topic in coding interviews. It provides detailed implementations of several classic backtracking problems, along with extensive documentation, test cases, and performance benchmarks.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Problem Descriptions](#problem-descriptions)
    *   [N-Queens](#n-queens)
    *   [Subsets II](#subsets-ii)
    *   [Permutations II](#permutations-ii)
    *   [Combination Sum III](#combination-sum-iii)
    *   [Word Search](#word-search)
4.  [Building and Running](#building-and-running)
    *   [Prerequisites](#prerequisites)
    *   [Compilation](#compilation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)

## Introduction

Backtracking is an algorithmic-technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time (i.e., pruning). This project aims to provide a robust learning and practice environment for this powerful technique.

## Project Structure

*   `src/`: Contains the C++ implementations of various backtracking problems. Each problem is in its own header file.
*   `utils/`: Contains helper utilities, such as functions for printing complex data structures.
*   `tests/`: Contains `test_main.cpp` with extensive unit tests for all implemented algorithms.
*   `benchmarking/`: Contains `benchmark_main.cpp` for performance measurement of the algorithms.
*   `docs/`: Contains detailed documentation on backtracking theory, visual aids, edge cases, and interview tips.
*   `README.md`: This file, providing an overview of the project.
*   `CMakeLists.txt`: Build configuration file for CMake.

## Problem Descriptions

Here's a brief overview of the problems solved in this project:

### N-Queens

**Problem:** The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard. This means no two queens share the same row, column, or diagonal. The goal is to return all distinct solutions to the N-Queens puzzle.

**Example (N=4):**
```
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
```

**Backtracking Insight:** We can place queens row by row. For each row, we try to place a queen in every column. Before placing, we check if the position is safe (no conflicts with previously placed queens). If safe, we place the queen and recurse for the next row. If unsafe, we backtrack and try the next column.

### Subsets II

**Problem:** Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

**Example (nums = [1,2,2]):**
```
[
  [],
  [1],
  [1,2],
  [1,2,2],
  [2],
  [2,2]
]
```

**Backtracking Insight:** This is a combination problem. Sort the input array first. At each step, either include the current element or skip it. To handle duplicates, if we skip an element, we must skip all subsequent identical elements to avoid generating duplicate subsets.

### Permutations II

**Problem:** Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations. You can return the answer in any order.

**Example (nums = [1,1,2]):**
```
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

**Backtracking Insight:** Similar to permutations, but with duplicates. Sort the input array. Use a `used` array to track elements in the current permutation. When iterating through choices, skip an element if it's the same as the previous element AND the previous element has not been used in the current path (meaning the previous identical element was already considered and skipped for this position).

### Combination Sum III

**Problem:** Find all valid combinations of `k` numbers that sum up to `n` such that only numbers from 1 to 9 are used and each combination is a unique set of numbers.

**Example (k = 3, n = 7):**
```
[[1,2,4]]
```

**Backtracking Insight:** This is a variation of combination sum. We need to select exactly `k` numbers from `1` to `9`. At each step, we decide whether to include the current number `i` (from 1 to 9) in our combination. If we include it, we reduce `k` and `n` and recurse for `i+1`. We prune if `n` becomes negative or `k` becomes negative.

### Word Search

**Problem:** Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example (board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"):**
```
true
```

**Backtracking Insight:** This is a DFS (Depth-First Search) problem on a grid, which is a form of backtracking. Iterate through each cell of the grid. If a cell matches the first character of the word, start a DFS from that cell. In the DFS, mark the current cell as visited (e.g., by temporarily changing its character) and explore its neighbors. If a path leads to the full word, return true. If not, backtrack by unmarking the cell and trying other paths.

## Building and Running

This project uses CMake for building.

### Prerequisites

*   A C++ compiler (e.g., GCC, Clang)
*   CMake (version 3.10 or higher)

### Compilation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking_project.git
    cd backtracking_project
    ```
2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```
3.  **Run CMake to configure the project:**
    ```bash
    cmake ..
    ```
4.  **Build the project:**
    ```bash
    cmake --build .
    ```
    This will generate two executables in the `build/bin` directory: `backtracking_tests` and `backtracking_benchmarks`.

### Running Tests

After compilation, navigate to the `build/bin` directory and run the test executable:
```bash
cd build/bin
./backtracking_tests
```
This will execute all test cases defined in `tests/test_main.cpp`.

### Running Benchmarks

After compilation, navigate to the `build/bin` directory and run the benchmark executable:
```bash
cd build/bin
./backtracking_benchmarks
```
This will run performance tests for selected problems and print their execution times.

## Documentation

The `docs/` directory contains detailed markdown files:

*   `Backtracking_Explanation.md`: In-depth explanation of backtracking, its structure, and when to use it.
*   `Visual_Diagrams.md`: ASCII art diagrams to help visualize the backtracking process (e.g., state-space trees).
*   `Edge_Cases_Gotchas.md`: A guide to common edge cases, mistakes, and pitfalls in backtracking problems.
*   `Interview_Tips_Variations.md`: Advice for approaching backtracking problems in interviews, common variations, and questions to ask.

## Contributing

Feel free to open issues or submit pull requests to improve this project.

---