# Dynamic Programming Interview Project

This project provides a comprehensive resource for understanding and implementing Dynamic Programming (DP) algorithms, focusing on common problems encountered in coding interviews. It includes multiple approaches (brute-force recursion, memoization, tabulation, space optimization), detailed explanations, time/space complexity analysis, extensive test cases, and performance benchmarks, all implemented in TypeScript.

## Table of Contents

1.  [Project Goals](#project-goals)
2.  [Features](#features)
3.  [Installation and Setup](#installation-and-setup)
4.  [Problems Covered](#problems-covered)
    *   [1. Fibonacci Numbers](#1-fibonacci-numbers)
    *   [2. Unique Paths](#2-unique-paths)
    *   [3. Coin Change](#3-coin-change)
    *   [4. Longest Common Subsequence (LCS)](#4-longest-common-subsequence-lcs)
    *   [5. 0/1 Knapsack Problem](#5-01-knapsack-problem)
5.  [Running Tests](#running-tests)
6.  [Performance Benchmarking](#performance-benchmarking)
7.  [Documentation](#documentation)
    *   [Detailed Algorithms Explanation (ALGORITHMS.md)](#detailed-algorithms-explanation-algorithmsmd)
    *   [Interview Tips (INTERVIEW_TIPS.md)](#interview-tips-interview_tipsmd)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Goals

*   **Deep Understanding**: Explore DP concepts from basic recursion to optimized iterative solutions.
*   **Practical Implementation**: Provide clean, well-commented, and robust TypeScript code.
*   **Interview Preparation**: Focus on common interview patterns, edge cases, and performance considerations.
*   **Comprehensive Resource**: Offer detailed documentation, complexity analysis, and visual aids.

## Features

*   **TypeScript**: Strongly typed, modern JavaScript for better code quality and maintainability.
*   **Multiple Approaches**: For each problem, implementations typically include:
    *   Brute-force Recursive
    *   Memoization (Top-Down DP)
    *   Tabulation (Bottom-Up DP)
    *   Space-Optimized Tabulation (where applicable)
*   **Detailed Comments**: Explanations of logic, base cases, recurrence relations, and state transitions within the code.
*   **Complexity Analysis**: Inline time and space complexity analysis for each approach.
*   **Extensive Tests**: Unit tests using Jest covering standard, edge, and larger cases.
*   **Performance Benchmarking**: Dedicated tests to compare the execution time of different approaches for larger inputs, highlighting DP's efficiency.
*   **Rich Documentation**: Separate markdown files for in-depth algorithm explanations, ASCII diagrams, and general interview strategies.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp-interview-project.git
    cd dp-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the TypeScript project:**
    ```bash
    npm run build
    ```

## Problems Covered

This project covers 5 fundamental Dynamic Programming problems. Each problem's solution resides in `src/algorithms/<problem_name>.ts`.

### 1. Fibonacci Numbers

**Problem**: Calculate the Nth Fibonacci number.
**Variations**: Simple recursion, memoization, tabulation, space optimization.
**Files**: `src/algorithms/fibonacci.ts`, `tests/fibonacci.test.ts`

### 2. Unique Paths

**Problem**: A robot on an `m x n` grid can only move down or right. How many unique paths are there to reach the bottom-right corner?
**Variations**: Recursive, memoization, tabulation (2D grid), space optimization (1D array).
**Files**: `src/algorithms/uniquePaths.ts`, `tests/uniquePaths.test.ts`

### 3. Coin Change

**Problem**: Given coin denominations and a target amount, find the minimum number of coins to make up that amount. Infinite supply of each coin.
**Variations**: Recursive (brute force), memoization, tabulation. This is a classic unbounded knapsack type problem.
**Files**: `src/algorithms/coinChange.ts`, `tests/coinChange.test.ts`

### 4. Longest Common Subsequence (LCS)

**Problem**: Given two strings, find the length of their longest common subsequence.
**Variations**: Recursive, memoization, tabulation (2D array), space optimization.
**Files**: `src/algorithms/longestCommonSubsequence.ts`, `tests/longestCommonSubsequence.test.ts`

### 5. 0/1 Knapsack Problem

**Problem**: Given `n` items with weights and values, and a knapsack capacity, find the maximum total value of items that can be placed in the knapsack. Each item can be picked at most once.
**Variations**: Recursive, memoization, tabulation (2D table), space optimization (1D array).
**Files**: `src/algorithms/knapsack01.ts`, `tests/knapsack01.test.ts`

## Running Tests

To run all unit tests:

```bash
npm test
```

This will execute tests for all algorithms and provide a summary of successes and failures.

## Performance Benchmarking

A separate test suite is available for benchmarking performance. It uses larger inputs to demonstrate the significant speed improvements of DP approaches over brute-force recursion.

To run performance tests:

```bash
npm run test:performance
```

The output will include execution times (in milliseconds) for different algorithms on the specified inputs. Note that brute-force solutions for larger inputs are commented out in the performance test to prevent excessively long run times.

## Documentation

### Detailed Algorithms Explanation (ALGORITHMS.md)

This document provides in-depth explanations for each DP problem, covering:
*   Problem Statement
*   Breakdown of brute-force recursion, memoization, tabulation, and space-optimized methods.
*   **Recurrence Relations**: Mathematical formulas defining the subproblems.
*   **Base Cases**: Conditions for stopping recursion or initializing DP tables.
*   **State Definition**: What `dp[i]` or `dp[i][j]` represents.
*   **ASCII Diagrams**: Visual representations of DP tables or state transitions.
*   **Time and Space Complexity Analysis**: For each approach.
*   **Edge Cases and Gotchas**: Specific considerations for each problem.
*   **Variations and Follow-ups**: Ideas for extending the problem.

### Interview Tips (INTERVIEW_TIPS.md)

This document offers general advice for tackling DP problems in coding interviews, including:
*   Identifying if a problem is DP.
*   Steps to derive a DP solution (state definition, recurrence, base cases).
*   Choosing between top-down (memoization) and bottom-up (tabulation).
*   Communicating your thought process.
*   Common DP patterns.
*   Strategies for optimizing space.

## Contributing

Feel free to open issues or submit pull requests to improve this project. Suggestions for new problems, alternative solutions, or documentation enhancements are welcome.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.