# Dynamic Programming Interview Project

Welcome to the Dynamic Programming Interview Project! This repository is designed to be a comprehensive resource for understanding, implementing, and mastering Dynamic Programming (DP) techniques for coding interviews. It includes multiple classic DP problems, various solution approaches (brute-force, memoized, tabulated, space-optimized), extensive tests, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Installation and Setup](#installation-and-setup)
4.  [How to Run](#how-to-run)
    *   [Run Tests](#run-tests)
    *   [Run Benchmarks](#run-benchmarks)
5.  [Problems Covered](#problems-covered)
    *   [1. Fibonacci Sequence](#1-fibonacci-sequence)
    *   [2. Coin Change](#2-coin-change)
    *   [3. Longest Common Subsequence (LCS)](#3-longest-common-subsequence-lcs)
    *   [4. 0/1 Knapsack Problem](#4-01-knapsack-problem)
    *   [5. Unique Paths](#5-unique-paths)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
dp-interview-project/
├── src/
│   ├── problems/            # Contains individual DP problem implementations
│   │   ├── coinChange.js
│   │   ├── fibonacci.js
│   │   ├── knapsack01.js
│   │   ├── longestCommonSubsequence.js
│   │   └── uniquePaths.js
│   └── index.js             # Exports all DP solutions for easy access
├── test/
│   └── dp.test.js           # Test suite for all implemented DP problems
├── benchmarks/
│   └── benchmark.js         # Scripts for comparing performance of different algorithms
├── docs/
│   └── dp_guide.md          # Comprehensive guide on DP concepts, problem details, and interview tips
├── .gitignore               # Specifies intentionally untracked files to ignore
├── package.json             # Project metadata and scripts
└── README.md                # This file
```

## Features

*   **Multiple DP Problems:** Covers 5 fundamental DP problems.
*   **Diverse Approaches:** Each problem typically includes:
    *   Brute-force (recursive without memoization)
    *   Memoization (Top-down Dynamic Programming)
    *   Tabulation (Bottom-up Dynamic Programming)
    *   Space-Optimized versions (where applicable)
*   **Detailed Explanations:** Inline comments for logic, time/space complexity analysis for each function.
*   **Extensive Test Suite:** Thorough test cases covering base cases, edge cases, and typical scenarios.
*   **Performance Benchmarking:** Compare the efficiency of different solution approaches.
*   **Comprehensive Documentation:** A dedicated guide explaining DP concepts, specific problem breakdowns with ASCII diagrams, common pitfalls, and interview strategies.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp-interview-project.git
    cd dp-interview-project
    ```
2.  **Install dependencies:**
    This project uses no external `npm` dependencies for core logic or testing. We use Node.js's built-in `assert` module.

## How to Run

### Run Tests

To execute the test suite for all DP problems:

```bash
npm test
```

### Run Benchmarks

To run the performance benchmarks and compare different solution approaches:

```bash
npm run benchmark
```

## Problems Covered

Here's a brief overview of the problems addressed in this project:

### 1. Fibonacci Sequence

The classic sequence where each number is the sum of the two preceding ones. This problem is excellent for demonstrating the core concepts of memoization and tabulation, as well as space optimization.

*   **Approaches:** Brute-force, Memoization, Tabulation, Space-Optimized.

### 2. Coin Change

Given a set of coin denominations and a target amount, find the minimum number of coins needed to make up that amount. This is a classic unbounded knapsack type problem.

*   **Approaches:** Memoization, Tabulation (1D array).

### 3. Longest Common Subsequence (LCS)

Find the length of the longest subsequence common to two given strings. A good example of 2D DP and string manipulation.

*   **Approaches:** Memoization, Tabulation.

### 4. 0/1 Knapsack Problem

Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. Each item can only be included once (0 or 1).

*   **Approaches:** Memoization, Tabulation, Space-Optimized.

### 5. Unique Paths

A robot is located at the top-left corner of a `m x n` grid. The robot can only move either down or right at any point in time. It is trying to reach the bottom-right corner of the grid. How many possible unique paths are there?

*   **Approaches:** Memoization, Tabulation, Space-Optimized.

## Documentation

The `docs/dp_guide.md` file provides extensive documentation covering:

*   **What is Dynamic Programming?**
*   **Key Principles:** Optimal Substructure, Overlapping Subproblems.
*   **Techniques:** Memoization (Top-Down) vs. Tabulation (Bottom-Up).
*   **Common DP Patterns.**
*   **Detailed Problem Explanations:** For each problem, including recurrence relations, base cases, and step-by-step table filling with ASCII diagrams.
*   **Edge Cases and Gotchas:** Common mistakes and how to avoid them.
*   **Interview Tips and Variations:** Strategies for identifying and solving DP problems in interviews.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, bug fixes, or new problems to add.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details (not included in this example, but standard practice).
---