# Dynamic Programming Interview Project

Welcome to the Dynamic Programming Interview Project! This repository is designed to be a comprehensive resource for understanding, implementing, and practicing Dynamic Programming (DP) problems, especially for coding interviews. It includes multiple classic DP problems, various solution approaches (brute force, memoization, tabulation, space optimization), extensive test cases, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Getting Started](#getting-started)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
3.  [Problems Covered](#problems-covered)
    *   [Fibonacci Sequence](#fibonacci-sequence)
    *   [Coin Change](#coin-change)
    *   [Longest Common Subsequence (LCS)](#longest-common-subsequence-lcs)
    *   [0/1 Knapsack Problem](#01-knapsack-problem)
4.  [Documentation](#documentation)
5.  [Interview Tips](#interview-tips)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Overview

This project aims to provide a holistic view of Dynamic Programming by offering:

*   **Multiple Problems:** Classic DP problems covering different patterns (1D, 2D, target sum, string manipulation, optimization).
*   **Diverse Solutions:** For each problem, you'll find:
    *   **Brute Force:** To understand the exponential complexity that DP solves.
    *   **Memoization (Top-Down DP):** Recursive approach with caching.
    *   **Tabulation (Bottom-Up DP):** Iterative approach building up solutions from base cases.
    *   **Space-Optimized Tabulation:** Where applicable, reducing memory footprint.
*   **Detailed Explanations:** In-code comments and separate documentation for logic, complexity, and common pitfalls.
*   **Robust Testing:** Comprehensive test suites using Jest to ensure correctness for various inputs, including edge cases.
*   **Performance Benchmarking:** Tools to compare the execution speed of different algorithms for varying input sizes.
*   **Learning Resources:** Dedicated documentation on DP concepts, visual diagrams, and interview strategies.

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp-interview-project.git
    cd dp-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `jest` for testing.

### Running Tests

To run all tests for the project:
```bash
npm test
```
This will execute all `*.test.js` files in the `src/tests` directory.

### Running Benchmarks

To run the performance benchmarks:
```bash
npm run benchmark
```
This script will compare the execution times of different algorithms for each problem with various input sizes. The results will be printed to the console.

## Problems Covered

Here's a summary of the DP problems included, along with their solutions and complexities.

| Problem                     | Brute Force         | Memoization (Time / Space) | Tabulation (Time / Space) | Space Optimized (Time / Space) |
| :-------------------------- | :------------------ | :------------------------- | :------------------------ | :----------------------------- |
| **Fibonacci Sequence**      | O(2^n) / O(n)       | O(n) / O(n)                | O(n) / O(n)               | O(n) / O(1)                    |
| **Coin Change**             | O(amount^coins.len) / O(amount) | O(coins.len * amount) / O(coins.len * amount) | O(coins.len * amount) / O(amount) | N/A (problem specific)         |
| **Longest Common Subsequence** | O(2^m * 2^n) / O(m+n) | O(m*n) / O(m*n)            | O(m*n) / O(m*n)           | N/A (problem specific)         |
| **0/1 Knapsack Problem**    | O(2^n) / O(n)       | O(n*W) / O(n*W)            | O(n*W) / O(n*W)           | O(n*W) / O(W)                  |

*   `n`: input number (Fibonacci), number of items (Knapsack)
*   `m`: length of `text1`
*   `W`: Knapsack capacity

### Fibonacci Sequence

**Problem Description:** Calculate the n-th Fibonacci number. The sequence starts with `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n > 1`.

**Implementations:**
*   `fibonacci_brute_force`: Pure recursive.
*   `fibonacci_memo`: Recursive with memoization.
*   `fibonacci_tab`: Iterative with tabulation.
*   `fibonacci_tab_optimized`: Iterative with space optimization.

### Coin Change

**Problem Description:** Given an array of coin denominations `coins` and a total `amount`, return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. Assume you have an infinite supply of each coin type.

**Implementations:**
*   `coinChange_memo`: Recursive with memoization.
*   `coinChange_tab`: Iterative with tabulation.

### Longest Common Subsequence (LCS)

**Problem Description:** Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence is a sequence that can be derived from another sequence by deleting some or no characters without changing the order of the remaining characters.

**Implementations:**
*   `lcs_memo`: Recursive with memoization.
*   `lcs_tab`: Iterative with tabulation.

### 0/1 Knapsack Problem

**Problem Description:** Given weights and values of `n` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. You cannot break an item, and you can only take an item or not take it (0/1 choice).

**Implementations:**
*   `knapsack_brute_force`: Pure recursive.
*   `knapsack_memo`: Recursive with memoization.
*   `knapsack_tab`: Iterative with tabulation.
*   `knapsack_tab_optimized`: Iterative with space optimization.

## Documentation

The `docs/` directory contains detailed explanations and visual aids:

*   **`dp_explanation.md`**: A comprehensive introduction to Dynamic Programming, covering its principles, approaches (memoization vs. tabulation), and steps to solve DP problems.
*   **`fibonacci_diagram.md`**: ASCII art illustrating the recursion tree for Fibonacci and how memoization/tabulation prunes redundant calculations.
*   **`lcs_diagram.md`**: ASCII art showing the fill-in process of the 2D DP table for the Longest Common Subsequence problem.
*   **`knapsack_diagram.md`**: ASCII art demonstrating the 2D DP table fill-in for the 0/1 Knapsack problem.

## Interview Tips

The `docs/interview_tips.md` file provides practical advice for tackling DP problems in a coding interview setting. It covers:

*   Recognizing DP problems.
*   Formulating the state and recurrence relation.
*   Handling edge cases.
*   Optimizing space.
*   Communicating your thought process.

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements. Any contributions that enhance the learning experience or expand the problem set are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file (not explicitly created, but implied by MIT mention).