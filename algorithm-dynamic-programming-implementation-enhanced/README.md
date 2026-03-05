# Dynamic Programming Interview Project

This project is a comprehensive resource for understanding and implementing Dynamic Programming (DP) algorithms, specifically designed for coding interview preparation. It features multiple classic DP problems, each with various solution approaches (brute force recursion, memoization, tabulation, space optimization), detailed explanations, complexity analysis, and extensive test cases.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Installation and Setup](#installation-and-setup)
3.  [Problems Covered](#problems-covered)
    *   [1. Fibonacci Number](#1-fibonacci-number)
    *   [2. Unique Paths](#2-unique-paths)
    *   [3. Coin Change](#3-coin-change)
    *   [4. Longest Increasing Subsequence (LIS)](#4-longest-increasing-subsequence-lis)
    *   [5. 0/1 Knapsack Problem](#5-01-knapsack-problem)
4.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Interview Tips](#interview-tips)
5.  [Contributing](#contributing)
6.  [License](#license)

## Problems Covered

Each problem includes implementations for:
*   **Brute Force Recursion:** Demonstrates the naive recursive approach, often leading to exponential time complexity due to redundant computations.
*   **Memoization (Top-Down DP):** Optimizes recursion by storing results of expensive function calls and returning the cached result when the same inputs occur again.
*   **Tabulation (Bottom-Up DP):** Builds up the solution iteratively by filling a DP table, starting from base cases.
*   **Space Optimization:** Further optimizes the tabulation approach by reducing the space complexity, typically from O(N) or O(N*M) to O(1) or O(min(N, M)).

### 1. Fibonacci Number

**Problem Description:**
Given an integer `n`, return the `n`-th Fibonacci number.
The Fibonacci sequence is defined as `F(0) = 0`, `F(1) = 1`, `F(n) = F(n - 1) + F(n - 2)` for `n > 1`.

**Implementations:**
*   `fibonacci_recursive(n: number): number`
*   `fibonacci_memoized(n: number): number`
*   `fibonacci_tabulated(n: number): number`
*   `fibonacci_spaceOptimized(n: number): number`

**File:** `src/algorithms/fibonacci.ts`

### 2. Unique Paths

**Problem Description:**
A robot is located at the top-left corner of an `m x n` grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid. How many possible unique paths are there?

**Implementations:**
*   `uniquePaths_recursive(m: number, n: number): number`
*   `uniquePaths_memoized(m: number, n: number): number`
*   `uniquePaths_tabulated(m: number, n: number): number`
*   `uniquePaths_spaceOptimized(m: number, n: number): number`

**File:** `src/algorithms/uniquePaths.ts`

### 3. Coin Change

**Problem Description:**
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.

**Implementations:**
*   `coinChange_recursive(coins: number[], amount: number): number`
*   `coinChange_memoized(coins: number[], amount: number): number`
*   `coinChange_tabulated(coins: number[], amount: number): number`

**File:** `src/algorithms/coinChange.ts`

### 4. Longest Increasing Subsequence (LIS)

**Problem Description:**
Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

**Implementations:**
*   `lis_recursive(nums: number[]): number`
*   `lis_memoized(nums: number[]): number`
*   `lis_tabulated(nums: number[]): number`
*   `lis_nLogn(nums: number[]): number` (using patience sorting / binary search)

**File:** `src/algorithms/longestIncreasingSubsequence.ts`

### 5. 0/1 Knapsack Problem

**Problem Description:**
Given `n` items, each with a `weight[i]` and a `value[i]`, and a knapsack with a maximum `capacity`, determine the maximum total value that can be carried in the knapsack such that the total weight does not exceed the capacity. Each item can either be included or not included (0/1 choice).

**Implementations:**
*   `knapsack01_recursive(weights: number[], values: number[], capacity: number): number`
*   `knapsack01_memoized(weights: number[], values: number[], capacity: number): number`
*   `knapsack01_tabulated(weights: number[], values: number[], capacity: number): number`
*   `knapsack01_spaceOptimized(weights: number[], values: number[], capacity: number): number`

**File:** `src/algorithms/knapsack01.ts`

## Documentation

The `docs/` directory contains detailed explanations and interview tips:

### Algorithm Explanations
*   **`docs/ALGORITHM_EXPLANATION.md`**: Provides a theoretical introduction to Dynamic Programming, explains its core concepts (optimal substructure, overlapping subproblems), differentiates between memoization and tabulation, and offers detailed breakdowns for each problem, including recurrence relations, state definitions, base cases, and illustrative ASCII diagrams.

### Interview Tips
*   **`docs/INTERVIEW_TIPS.md`**: Offers practical advice for tackling DP problems in interviews, including strategies for identification, common patterns, debugging tips, and how to discuss complexity and edge cases effectively.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions, find bugs, or want to add more problems/solutions!

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if included, otherwise assume standard open source).