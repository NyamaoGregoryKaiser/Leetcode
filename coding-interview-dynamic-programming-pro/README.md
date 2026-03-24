# Dynamic Programming Interview Project

This project serves as a comprehensive resource for understanding and practicing Dynamic Programming (DP) problems, suitable for coding interviews. It covers various DP patterns, multiple solution approaches (brute force, memoization, tabulation, space-optimization), detailed complexity analysis, extensive test cases, and performance benchmarking.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Installation and Setup](#installation-and-setup)
3.  [Problems Covered](#problems-covered)
    *   [1. Fibonacci Sequence](#1-fibonacci-sequence)
    *   [2. Coin Change (Minimum Coins)](#2-coin-change-minimum-coins)
    *   [3. Longest Common Subsequence (LCS)](#3-longest-common-subsequence-lcs)
    *   [4. 0/1 Knapsack Problem](#4-01-knapsack-problem)
    *   [5. House Robber](#5-house-robber)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
dp-interview-project/
├── src/
│   ├── problems/              # Core DP problem implementations
│   │   ├── fibonacci.js
│   │   ├── coinChange.js
│   │   ├── longestCommonSubsequence.js
│   │   ├── knapsack.js
│   │   └── houseRobber.js
│   └── utils/                 # Helper utilities (e.g., performance logging)
│       └── helpers.js
├── tests/                     # Jest test files for each problem
│   ├── fibonacci.test.js
│   ├── coinChange.test.js
│   ├── longestCommonSubsequence.test.js
│   ├── knapsack.test.js
│   └── houseRobber.test.js
├── scripts/                   # Scripts for performance benchmarking
│   └── benchmark.js
├── docs/                      # Comprehensive documentation on DP concepts
│   ├── algorithms.md          # General DP explanation, memoization vs. tabulation
│   ├── diagrams.md            # Visual aids (ASCII art) for DP states
│   ├── edge_cases_gotchas.md  # Common pitfalls and tricky scenarios
│   └── interview_tips.md      # Advice for DP interviews
├── .gitignore
├── package.json
└── README.md
```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp-interview-project.git
    cd dp-interview-project
    ```
2.  **Install dependencies:**
    This project uses `jest` for testing.
    ```bash
    npm install
    ```

## Problems Covered

Each problem is implemented with multiple approaches:
*   **Brute Force (Recursive):** Demonstrates the naive recursive solution, often leading to exponential time complexity due to redundant computations.
*   **Memoization (Top-Down DP):** Optimizes the brute force by storing results of expensive function calls and returning the cached result when the same inputs occur again.
*   **Tabulation (Bottom-Up DP):** Solves the problem by iteratively filling up a DP table, starting from base cases and building up to the final solution.
*   **Space-Optimized Tabulation:** Further refines tabulation by reducing the space complexity, often from O(N) or O(N*M) to O(1) or O(min(N, M)) by noticing that only a few previous states are needed.

Detailed comments, time/space complexity analysis, and explanations are provided within each problem file.

---

### 1. Fibonacci Sequence

**Problem Description:**
Given an integer `n`, return the `n`-th Fibonacci number. The Fibonacci sequence is a sequence where each number is the sum of the two preceding ones, usually starting with 0 and 1.
`F(0) = 0, F(1) = 1`
`F(n) = F(n-1) + F(n-2)` for `n > 1`.

**File:** `src/problems/fibonacci.js`

---

### 2. Coin Change (Minimum Coins)

**Problem Description:**
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.

**File:** `src/problems/coinChange.js`

---

### 3. Longest Common Subsequence (LCS)

**Problem Description:**
Given two strings `text1` and `text2`, return the length of their longest common subsequence.
A subsequence of a string is a new string generated from the original string with some characters (or no characters) deleted without changing the relative order of the remaining characters.
For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

**File:** `src/problems/longestCommonSubsequence.js`

---

### 4. 0/1 Knapsack Problem

**Problem Description:**
Given weights and values of `N` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. You cannot break an item, and you can only either take the item or not take it (0/1 property).

**File:** `src/problems/knapsack.js`

---

### 5. House Robber

**Problem Description:**
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses are robbed on the same night.
Given an integer array `nums` representing the amount of money in each house, return the maximum amount of money you can rob tonight without alerting the police.

**File:** `src/problems/houseRobber.js`

---

## Running Tests

To run all tests:
```bash
npm test
```
To run tests for a specific problem (e.g., Fibonacci):
```bash
npm test tests/fibonacci.test.js
```

## Running Benchmarks

To run the performance benchmark script:
```bash
npm run benchmark
```
This script compares the execution time and memory usage of different approaches for a selected set of problems.

## Documentation

The `docs/` directory contains comprehensive explanations and tips:

*   **`algorithms.md`**: Provides an introduction to Dynamic Programming, explains its core concepts (overlapping subproblems, optimal substructure), and clarifies the differences between memoization and tabulation.
*   **`diagrams.md`**: Offers visual explanations (ASCII art) for common DP state transitions and table filling processes, making complex concepts easier to grasp.
*   **`edge_cases_gotchas.md`**: Highlights common pitfalls, tricky edge cases, and typical mistakes made when implementing DP solutions.
*   **`interview_tips.md`**: Offers strategic advice for approaching DP questions in interviews, including how to communicate your thought process, common patterns to look for, and questions to ask the interviewer.

## Contributing

Feel free to contribute by adding more problems, alternative solutions, improving existing code, or enhancing documentation.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details (not included in this response, but typically present in a real project).

---