```markdown
# Dynamic Programming Interview Project

This project is a comprehensive guide and practice platform for Dynamic Programming (DP) problems commonly encountered in coding interviews. It aims to provide a deep understanding of DP concepts, various implementation strategies, and their impact on performance.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Problem Descriptions](#problem-descriptions)
    *   [1. Fibonacci Number](#1-fibonacci-number)
    *   [2. Climbing Stairs](#2-climbing-stairs)
    *   [3. Longest Common Subsequence (LCS)](#3-longest-common-subsequence-lcs)
    *   [4. 0/1 Knapsack Problem](#4-01-knapsack-problem)
4.  [Setup and Running](#setup-and-running)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Project Structure](#project-structure)

## Project Overview

Dynamic Programming is a powerful technique for solving complex problems by breaking them down into simpler overlapping subproblems and storing the results to avoid redundant computations. This project illustrates DP through several classic problems, demonstrating:

*   **Recursive (Brute-Force)** solutions to understand the problem structure.
*   **Memoization (Top-Down DP)**: Storing results of subproblems in a cache.
*   **Tabulation (Bottom-Up DP)**: Building up solutions from base cases iteratively.
*   **Space-Optimized Tabulation**: Reducing memory footprint when possible.

Each solution comes with detailed comments, time and space complexity analysis, and extensive test cases.

## Features

*   **Multiple DP Problems**: Four fundamental DP problems.
*   **Multiple Solution Approaches**: For each problem: recursive, memoized, tabulated, and space-optimized.
*   **Detailed Explanations**: In-line comments and a dedicated `docs/algorithms.md` file.
*   **Complexity Analysis**: Time and space complexity for every approach.
*   **Extensive Test Cases**: Located in the `test/` directory to ensure correctness.
*   **Performance Benchmarking**: Compare the efficiency of different solutions.
*   **Comprehensive Documentation**: Covering DP concepts, diagrams, edge cases, and interview strategies.

## Problem Descriptions

### 1. Fibonacci Number

**Problem Statement**: Given an integer `n`, return the `n`-th Fibonacci number. The Fibonacci sequence is defined as `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n - 1) + F(n - 2)` for `n > 1`.

**Example**:
*   `n = 2` -> `F(2) = F(1) + F(0) = 1 + 0 = 1`
*   `n = 3` -> `F(3) = F(2) + F(1) = 1 + 1 = 2`
*   `n = 4` -> `F(4) = F(3) + F(2) = 2 + 1 = 3`

### 2. Climbing Stairs

**Problem Statement**: You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example**:
*   `n = 1` -> 1 way (1 step)
*   `n = 2` -> 2 ways (1+1 steps, 2 steps)
*   `n = 3` -> 3 ways (1+1+1 steps, 1+2 steps, 2+1 steps)

### 3. Longest Common Subsequence (LCS)

**Problem Statement**: Given two strings `text1` and `text2`, return the length of their longest common subsequence.
A subsequence is a sequence that can be derived from another sequence by deleting some or no characters without changing the order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings.

**Example**:
*   `text1 = "abcde"`, `text2 = "ace"` -> `LCS` is "ace", length is 3.
*   `text1 = "abc"`, `text2 = "abc"` -> `LCS` is "abc", length is 3.
*   `text1 = "abc"`, `text2 = "def"` -> `LCS` is "", length is 0.

### 4. 0/1 Knapsack Problem

**Problem Statement**: Given weights and values of `n` items, put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack. You can't break an item, meaning you can either put the whole item or not put it.

**Example**:
*   `weights = [10, 20, 30]`
*   `values = [60, 100, 120]`
*   `capacity = 50`

The optimal items to take are item 1 (weight 20, value 100) and item 0 (weight 10, value 60), for a total weight of 30 and total value of 160. Taking item 2 (weight 30, value 120) and item 0 (weight 10, value 60) for total weight 40 and value 180 is better. Max value = 180.

## Setup and Running

This project uses Node.js. Ensure you have Node.js installed on your system.

```bash
# Clone the repository
git clone https://github.com/your_username/dp-interview-project.git
cd dp-interview-project
```

### Running Tests

To run all the test cases and verify the correctness of the implementations:

```bash
node test/runTests.js
```

### Running Benchmarks

To compare the performance of different DP approaches for various input sizes:

```bash
node benchmark/runner.js
```

## Documentation

Explore the `docs/` directory for in-depth explanations:

*   **`docs/algorithms.md`**: Dive into the core concepts of Dynamic Programming and detailed breakdowns of how each problem is solved with different DP techniques.
*   **`docs/diagrams.md`**: Visual aids (ASCII art) to understand recursive call trees, DP table constructions, and state transitions.
*   **`docs/edge-cases-gotchas.md`**: Learn about common pitfalls, specific edge scenarios for the problems, and debugging strategies.
*   **`docs/interview-tips.md`**: Get advice on how to identify DP problems, structure your solutions during an interview, and effectively communicate your thought process.

## Project Structure

Refer to the tree diagram at the top of this `README.md` for a complete overview of the project structure.
```