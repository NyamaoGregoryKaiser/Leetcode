```markdown
# Dynamic Programming Interview Project

This project serves as a comprehensive resource for understanding and practicing Dynamic Programming (DP) problems, particularly in the context of coding interviews. It includes multiple classic DP problems solved with various techniques (memoization, tabulation, space optimization), along with extensive documentation, testing, and performance benchmarking.

## Table of Contents

1.  [Project Goals](#project-goals)
2.  [Project Structure](#project-structure)
3.  [Problems Covered](#problems-covered)
    *   [1. Fibonacci Numbers](#1-fibonacci-numbers)
    *   [2. Longest Common Subsequence (LCS)](#2-longest-common-subsequence-lcs)
    *   [3. 0/1 Knapsack Problem](#3-01-knapsack-problem)
    *   [4. Coin Change Problem (Count Ways)](#4-coin-change-problem-count-ways)
4.  [How to Compile and Run](#how-to-compile-and-run)
    *   [Compiling](#compiling)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Interview Tips](#interview-tips)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Goals

*   Provide optimal C++ implementations for common DP problems.
*   Demonstrate different DP approaches: recursive brute force, memoization (top-down), tabulation (bottom-up), and space optimization.
*   Offer detailed explanations of logic, time/space complexity.
*   Include comprehensive test cases for correctness verification.
*   Implement performance benchmarking to compare different solutions.
*   Supply extensive documentation on DP concepts, edge cases, and interview strategies.

## Project Structure

*   `src/`: Contains the core C++ source code for DP algorithms and the main executable.
    *   `dp_problems.hpp`: Header file declaring DP functions.
    *   `dp_problems.cpp`: Implementation of DP solutions.
    *   `main.cpp`: Entry point for running examples and performance benchmarks.
*   `test/`: Contains unit tests for verifying the correctness of DP implementations.
    *   `test_dp_problems.cpp`: Test cases for each DP problem and its variants.
*   `doc/`: Contains detailed documentation for the project.
    *   `README.md`: This file, providing project overview and instructions.
    *   `DP_Concepts.md`: In-depth explanations of Dynamic Programming principles, visual diagrams, interview tips, and common pitfalls.
*   `utils/`: Contains helper utilities.
    *   `timer.hpp`: A simple C++ class for measuring execution time.

## Problems Covered

Each problem below includes a brief description, an example, and the complexities of its various solutions implemented in `src/dp_problems.cpp`.

---

### 1. Fibonacci Numbers

**Description:** The Fibonacci sequence is a series where the next number is the sum of the previous two. The sequence starts with 0 and 1. (e.g., 0, 1, 1, 2, 3, 5, 8, 13, ...) The problem is to find the N-th Fibonacci number.

**Example:**
Input: `n = 6`
Output: `8` (because F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8)

**Implemented Solutions & Complexities:**

*   `fibonacci_recursive(n)`:
    *   Time: O(2^n)
    *   Space: O(n) (for recursion stack)
*   `fibonacci_memoized(n)`:
    *   Time: O(n)
    *   Space: O(n) (for memoization table + recursion stack)
*   `fibonacci_tabulated(n)`:
    *   Time: O(n)
    *   Space: O(n) (for DP table)
*   `fibonacci_space_optimized(n)`:
    *   Time: O(n)
    *   Space: O(1)

---

### 2. Longest Common Subsequence (LCS)

**Description:** Given two sequences, find the length of the longest subsequence present in both of them. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Example:**
Input: `text1 = "abcde"`, `text2 = "ace"`
Output: `3` (LCS is "ace")

**Implemented Solutions & Complexities:**

*   `longestCommonSubsequence(text1, text2)`:
    *   This implements the **tabulated (bottom-up) DP approach**.
    *   Time: O(m*n) where m and n are lengths of text1 and text2.
    *   Space: O(m*n) (for DP table)
*   `reconstructLCS(text1, text2)`:
    *   Function to reconstruct one of the actual LCS strings.
    *   Time: O(m*n) (building DP table) + O(m+n) (reconstruction) = O(m*n)
    *   Space: O(m*n)

---

### 3. 0/1 Knapsack Problem

**Description:** Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value. You can either take an item completely or not take it at all (0/1 property).

**Example:**
Input:
`weights = {10, 20, 30}`
`values = {60, 100, 120}`
`capacity = 50`
Output: `220` (Taking items with weights 20 and 30 gives value 100 + 120 = 220)

**Implemented Solutions & Complexities:**

*   `knapsack_tabulated(weights, values, capacity)`:
    *   **Tabulated (bottom-up) DP approach.**
    *   Time: O(N*W) where N is number of items, W is knapsack capacity.
    *   Space: O(N*W) (for DP table)
*   `knapsack_space_optimized(weights, values, capacity)`:
    *   **Space-optimized tabulated DP approach.**
    *   Time: O(N*W)
    *   Space: O(W)

---

### 4. Coin Change Problem (Count Ways)

**Description:** Given a set of coin denominations and a target amount, find the number of ways to make change for that amount. Assume an infinite supply of each coin type.

**Example:**
Input:
`coins = {1, 2, 5}`
`amount = 5`
Output: `4` (Ways: {1,1,1,1,1}, {1,1,1,2}, {1,2,2}, {5})

**Implemented Solutions & Complexities:**

*   `coinChange_countWays_tabulated(coins, amount)`:
    *   **Tabulated (bottom-up) DP approach.**
    *   Time: O(N*Amount) where N is the number of coin denominations.
    *   Space: O(Amount) (for DP table)

---

## How to Compile and Run

This project uses a standard C++ build process. A `Makefile` is not provided, but the commands are straightforward using `g++`.

### Compiling

Navigate to the project root directory (`dp_interview_project/`) in your terminal.

```bash
# Compile source files for the main executable
g++ -std=c++17 -O2 -Isrc -Iutils src/dp_problems.cpp src/main.cpp -o bin/dp_main

# Compile source files for tests
g++ -std=c++17 -g -Isrc -Iutils test/test_dp_problems.cpp src/dp_problems.cpp -o bin/dp_tests
```
*   `-std=c++17`: Specifies C++17 standard.
*   `-O2`: Optimization level 2 for better performance in benchmarks.
*   `-Isrc -Iutils`: Includes header files from `src` and `utils` directories.
*   `-o bin/dp_main`: Output the executable to `bin/dp_main`.
*   `-g`: Include debugging information for tests.

You might need to create a `bin/` directory first: `mkdir -p bin`.

### Running Tests

After compiling the test executable:

```bash
./bin/dp_tests
```

This will run all defined test cases and print their results (PASS/FAIL).

### Running Benchmarks

After compiling the main executable:

```bash
./bin/dp_main
```

This will execute the main program, which demonstrates the DP solutions with example inputs and runs performance benchmarks comparing different approaches for Fibonacci.

## Documentation

The `doc/` directory contains:
*   `README.md`: You are reading it now!
*   `DP_Concepts.md`: This file provides a deep dive into Dynamic Programming. It explains what DP is, its core principles (overlapping subproblems, optimal substructure), different approaches (memoization vs. tabulation), visual diagrams (ASCII art), how to identify DP problems, common edge cases, and valuable interview tips. It's highly recommended to read this for a solid theoretical foundation.

## Interview Tips

*   **Start Simple**: If stuck, try a recursive brute-force solution first. This helps in understanding the subproblems.
*   **Identify Overlapping Subproblems**: Look for repeated calculations in the recursion tree.
*   **Identify Optimal Substructure**: Can the optimal solution to the problem be constructed from optimal solutions of its subproblems?
*   **Memoize**: Convert the recursive solution into a memoized (top-down DP) solution by storing results of subproblems.
*   **Tabulate**: Convert the memoized solution into a tabulated (bottom-up DP) solution by iteratively filling a DP table. This often has better cache performance and avoids recursion overhead.
*   **Space Optimize**: If a DP state only depends on a few previous states, try to reduce the space complexity (e.g., from O(N) to O(1) or O(N*W) to O(W)).
*   **State Definition**: Clearly define what `dp[i]` or `dp[i][j]` represents.
*   **Base Cases**: Correctly identify the smallest subproblems and their solutions.
*   **Recurrence Relation**: Formulate the rule to calculate `dp[i]` or `dp[i][j]` based on previous states.
*   **Complexity Analysis**: Always be ready to discuss time and space complexity.

Refer to `doc/DP_Concepts.md` for more in-depth tips.

## Contributing

Feel free to fork this repository, add more DP problems, improve existing solutions, enhance documentation, or add more test cases. Pull requests are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).
```