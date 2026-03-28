```markdown
# Backtracking Interview Project

This project provides a comprehensive overview and implementation of backtracking algorithms, commonly encountered in coding interviews. It includes multiple classic backtracking problems with optimal solutions, various approaches, detailed explanations, and supporting utilities for testing and performance analysis.

## Table of Contents

1.  [Introduction to Backtracking](#introduction-to-backtracking)
2.  [Project Structure](#project-structure)
3.  [Problems Implemented](#problems-implemented)
    *   [Subsets](#subsets)
    *   [Permutations](#permutations)
    *   [Combination Sum II](#combination-sum-ii)
    *   [N-Queens](#n-queens)
4.  [Building and Running the Project](#building-and-running-the-project)
5.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Interview Tips & Variations](#interview-tips--variations)
6.  [Performance Benchmarking](#performance-benchmarking)

## Introduction to Backtracking

Backtracking is a general algorithmic technique for finding all (or some) solutions to some computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution. It's often visualized as searching a state-space tree.

## Project Structure

```
backtracking_interview_project/
├── README.md                          <- This file
├── main.cpp                           <- Entry point, runs tests and benchmarks
├── src/                               <- Source code for backtracking problems
│   ├── backtracking_problems.h        <- Declarations of problem functions
│   └── backtracking_problems.cpp      <- Implementations of problem functions
├── tests/                             <- Unit tests for each problem
│   └── test_backtracking.cpp          <- Contains test cases and assertion framework
├── utils/                             <- Utility functions
│   └── profiler.h                     <- Simple timer and print utilities
└── docs/                              <- Documentation files
    ├── backtracking_explanation.md    <- Detailed explanation of backtracking algorithm
    └── interview_tips.md              <- Tips for tackling backtracking problems in interviews
```

## Problems Implemented

### Subsets

*   **Problem Description**: Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.
*   **Approaches Implemented**:
    *   **Backtracking (Recursive)**: The standard recursive approach exploring choices to include or not include an element.
    *   **Iterative**: Builds subsets by iteratively adding each element to all existing subsets.
*   **Key Concepts**: Decision tree, include/exclude, `start_index` to prevent duplicates.
*   **Complexity**:
    *   Time: O(N * 2^N)
    *   Space: O(N * 2^N) (for storing results) + O(N) (recursion stack)

### Permutations

*   **Problem Description**: Given an array `nums` of distinct integers, return all the possible permutations.
*   **Approaches Implemented**:
    *   **Backtracking (In-place Swap)**: Modifies the input array by swapping elements to generate permutations, then swaps back to backtrack.
    *   **Backtracking (Visited Array)**: Uses a boolean array to keep track of which elements have already been added to the current permutation.
*   **Key Concepts**: State tracking (visited elements or current permutation order), `swap` for state change, `backtrack` to restore state.
*   **Complexity**:
    *   Time: O(N * N!)
    *   Space: O(N * N!) (for storing results) + O(N) (recursion stack/visited array)

### Combination Sum II

*   **Problem Description**: Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination.
*   **Approach Implemented**:
    *   **Backtracking with Pruning & Duplicate Handling**: Similar to subsets but includes a target sum constraint and careful handling of duplicate numbers in the input array. Requires sorting the input array.
*   **Key Concepts**: `start_index` for unique combinations, pruning (`target < 0` or `candidates[i] > target`), skipping adjacent duplicates (`i > start && candidates[i] == candidates[i-1]`).
*   **Complexity**:
    *   Time: Exponential, roughly O(2^N) * N in worst case (pruning makes it better in practice).
    *   Space: O(N) (recursion stack) + O(Result Size * N) (for storing results).

### N-Queens

*   **Problem Description**: The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.
*   **Approach Implemented**:
    *   **Backtracking with Board State Validation**: Places queens row by row. For each cell, it checks if placing a queen there is valid given previously placed queens. If valid, it places a queen and recurses for the next row. If no valid placement is found in a row, it backtracks.
*   **Key Concepts**: Board state representation, `isValid` helper function (checks column, diagonals), row-by-row decision making.
*   **Complexity**:
    *   Time: Exponential, roughly O(N!) or O(exp(N)) due to heavy pruning. Each solution takes O(N^2) to copy.
    *   Space: O(N^2) (for board representation) + O(N) (recursion stack) + O(Number of Solutions * N^2) (for storing results).

## Building and Running the Project

To build and run this project, you will need a C++ compiler (e.g., g++).

**1. Navigate to the project root:**
```bash
cd backtracking_interview_project
```

**2. Compile the code:**
You can use a simple `g++` command:
```bash
g++ main.cpp src/backtracking_problems.cpp -o backtracking_solver -std=c++17 -Wall -Wextra -pedantic
```
*   `-std=c++17`: Enables C++17 features (optional, but good practice).
*   `-Wall -Wextra -pedantic`: Enables strict warnings.

**3. Run the executable:**
```bash
./backtracking_solver
```

This will execute all unit tests and then run the performance benchmarks.

## Documentation

### Algorithm Explanation

Refer to `docs/backtracking_explanation.md` for a detailed explanation of the backtracking algorithm, its components, analogies, and how to visualize it.

### Interview Tips & Variations

Refer to `docs/interview_tips.md` for advice on approaching backtracking problems in interviews, common pitfalls, complexity analysis tips, and typical variations of standard problems.

## Performance Benchmarking

The `main.cpp` file includes a `runBenchmarks()` function that measures the execution time of each implemented problem for a reasonably sized input. This helps illustrate the practical performance characteristics and compare different approaches (e.g., recursive vs. iterative subsets, swap vs. visited permutations).

Expected output will show execution times in microseconds (µs) for each problem, along with the size of the generated result set. Keep in mind that performance can vary greatly depending on hardware and compiler optimizations.
```