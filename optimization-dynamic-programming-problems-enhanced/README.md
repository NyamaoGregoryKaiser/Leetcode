# Dynamic Programming Interview Project

This project serves as a comprehensive resource for understanding and practicing Dynamic Programming (DP) concepts, particularly in the context of coding interviews. It includes multiple classic DP problems, each with various solution approaches (brute-force recursion, memoization, tabulation, space-optimized DP), detailed explanations, complexity analysis, and extensive test cases.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup Instructions](#setup-instructions)
3.  [How to Run](#how-to-run)
4.  [Problems Covered](#problems-covered)
    *   [Fibonacci Sequence](#fibonacci-sequence)
    *   [Longest Common Subsequence](#longest-common-subsequence)
    *   [0/1 Knapsack Problem](#01-knapsack-problem)
    *   [Unique Paths](#unique-paths)
    *   [House Robber](#house-robber)
5.  [Documentation](#documentation)
    *   [Introduction to Dynamic Programming (docs/dp-introduction.md)](#introduction-to-dynamic-programming-docsdp-introductionmd)
    *   [Visual Diagrams (docs/diagrams.md)](#visual-diagrams-docsdiagramsmd)
    *   [Interview Tips & Gotchas (docs/interview-tips.md)](#interview-tips--gotchas-docsinterview-tipsmd)
6.  [Performance Benchmarking](#performance-benchmarking)

## Project Structure

(See top-level README section for structure)

## Setup Instructions

(See top-level README section for setup)

## How to Run

(See top-level README section for how to run)

## Problems Covered

Each problem is implemented in `src/algorithms` and comes with its own test file in `tests/`.

### Fibonacci Sequence
*   **Description**: Calculate the N-th Fibonacci number.
*   **Approaches**: Recursive (brute-force), Memoization (Top-down DP), Tabulation (Bottom-up DP), Space-Optimized Tabulation.
*   **File**: [`src/algorithms/fibonacci.ts`](./src/algorithms/fibonacci.ts)
*   **Tests**: [`tests/fibonacci.test.ts`](./tests/fibonacci.test.ts)

### Longest Common Subsequence
*   **Description**: Find the length of the longest common subsequence between two strings.
*   **Approaches**: Recursive (brute-force), Memoization (Top-down DP), Tabulation (Bottom-up DP).
*   **File**: [`src/algorithms/longest-common-subsequence.ts`](./src/algorithms/longest-common-subsequence.ts)
*   **Tests**: [`tests/longest-common-subsequence.test.ts`](./tests/longest-common-subsequence.test.ts)

### 0/1 Knapsack Problem
*   **Description**: Given weights and values of N items, put them in a knapsack of capacity W to get the maximum total value. Each item can only be included once.
*   **Approaches**: Recursive (brute-force), Memoization (Top-down DP), Tabulation (Bottom-up DP).
*   **File**: [`src/algorithms/knapsack.ts`](./src/algorithms/knapsack.ts)
*   **Tests**: [`tests/knapsack.test.ts`](./tests/knapsack.test.ts)

### Unique Paths
*   **Description**: A robot is located at the top-left corner of an `m x n` grid. The robot can only move either down or right at any point in time. How many possible unique paths are there to reach the bottom-right corner?
*   **Approaches**: Recursive (brute-force), Memoization (Top-down DP), Tabulation (Bottom-up DP), Space-Optimized Tabulation.
*   **File**: [`src/algorithms/unique-paths.ts`](./src/algorithms/unique-paths.ts)
*   **Tests**: [`tests/unique-paths.test.ts`](./tests/unique-paths.test.ts)

### House Robber
*   **Description**: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array `nums` representing the amount of money in each house, return the maximum amount of money you can rob tonight without alerting the police.
*   **Approaches**: Recursive (brute-force), Memoization (Top-down DP), Tabulation (Bottom-up DP), Space-Optimized Tabulation.
*   **File**: [`src/algorithms/house-robber.ts`](./src/algorithms/house-robber.ts)
*   **Tests**: [`tests/house-robber.test.ts`](./tests/house-robber.test.ts)

## Documentation

This project also includes comprehensive documentation to aid in understanding DP concepts and interview strategies.

### Introduction to Dynamic Programming (`docs/dp-introduction.md`)
A detailed explanation of what Dynamic Programming is, when to use it, the characteristics of problems solvable by DP (optimal substructure, overlapping subproblems), and the differences between memoization and tabulation.

### Visual Diagrams (`docs/diagrams.md`)
ASCII art diagrams illustrating core DP concepts, such as recursion trees, memoization tables, and state transitions in DP tables.

### Interview Tips & Gotchas (`docs/interview-tips.md`)
Practical advice for DP interviews, including common pitfalls, how to identify DP problems, articulating your thought process, and handling time/space complexity discussions.

## Performance Benchmarking

The `bench/benchmark.ts` script allows you to compare the runtime performance of different algorithms (brute-force vs. DP) for selected problems. This helps visualize the significant performance gains offered by dynamic programming.

To run benchmarks:
```bash
npm run benchmark
```

---

Happy learning and coding!