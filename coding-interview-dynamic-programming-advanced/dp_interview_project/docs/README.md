```markdown
# Dynamic Programming Interview Project

This project provides a comprehensive set of Dynamic Programming (DP) problems, their optimal solutions using various DP paradigms, detailed explanations, and supporting infrastructure for testing and benchmarking. It's designed to be a valuable resource for preparing for coding interviews that involve DP.

## Project Structure

```
dp_interview_project/
├── algorithms/                 # Contains implementations of DP problems
│   ├── fibonacci.py            # Classic: Memoization, Tabulation, Space Optimization
│   ├── knapsack_01.py          # 0/1 Knapsack: Decision problem
│   ├── longest_common_subsequence.py # LCS: String DP
│   ├── word_break.py           # Word Break: Boolean DP
│   └── min_cost_climbing_stairs.py # Min Cost Path: Pathfinding DP
├── tests/                      # Unit tests for all algorithms
│   ├── test_fibonacci.py
│   ├── test_knapsack_01.py
│   ├── test_longest_common_subsequence.py
│   ├── test_word_break.py
│   └── test_min_cost_climbing_stairs.py
├── docs/                       # Documentation, explanations, and interview tips
│   ├── README.md               # This file
│   ├── dp_concepts.md          # Detailed explanation of DP, paradigms, diagrams
│   ├── dp_patterns.md          # Common DP patterns and variations
│   └── interview_tips.md       # Strategies, edge cases, gotchas
├── utils/                      # Helper utilities (e.g., custom decorators)
│   └── decorators.py           # Custom memoization and timing decorators
├── benchmarks/                 # Performance benchmarking scripts
│   └── benchmark_all.py        # Compares brute-force vs. DP performance
└── requirements.txt            # Project dependencies
```

## Problem Descriptions

This section outlines the problems implemented in the `algorithms/` directory. Each problem includes multiple solution approaches: brute-force recursion, memoization (top-down DP), tabulation (bottom-up DP), and for some, space-optimized tabulation.

### 1. Fibonacci Numbers (`fibonacci.py`)

**Problem:** Calculate the `n`-th Fibonacci number. The sequence is defined as `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n > 1`.

**Approaches:**
*   `fib_recursive_bruteforce`: Naive recursive implementation.
*   `fib_memoization_lru_cache`: Memoized recursive solution using `functools.lru_cache`.
*   `fib_memoization_custom`: Memoized recursive solution using a custom memoization decorator.
*   `fib_tabulation`: Iterative bottom-up solution using a DP array.
*   `fib_space_optimized`: Space-optimized iterative solution using only two variables.

### 2. 0/1 Knapsack Problem (`knapsack_01.py`)

**Problem:** Given weights and values of `N` items, and a knapsack capacity `W`, choose a subset of items to maximize the total value, such that the total weight does not exceed `W`. Each item can only be picked once.

**Approaches:**
*   `knapsack_recursive_bruteforce`: Naive recursive implementation considering all subsets.
*   `knapsack_memoization`: Memoized recursive solution (top-down DP).
*   `knapsack_tabulation`: Iterative bottom-up solution using a 2D DP table.
*   `knapsack_tabulation_space_optimized`: Space-optimized iterative solution using a 1D DP array.

### 3. Longest Common Subsequence (LCS) (`longest_common_subsequence.py`)

**Problem:** Given two strings `text1` and `text2`, find the length of their longest common subsequence. A subsequence is formed by deleting zero or more characters from a string without changing the order of the remaining characters.

**Approaches:**
*   `lcs_recursive_bruteforce`: Naive recursive solution.
*   `lcs_memoization`: Memoized recursive solution (top-down DP).
*   `lcs_tabulation`: Iterative bottom-up solution using a 2D DP table.
*   `lcs_space_optimized`: Space-optimized iterative solution using two 1D DP arrays.

### 4. Word Break Problem (`word_break.py`)

**Problem:** Given a string `s` and a dictionary of words `word_dict`, determine if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Approaches:**
*   `word_break_recursive_bruteforce`: Naive recursive solution.
*   `word_break_memoization`: Memoized recursive solution (top-down DP).
*   `word_break_tabulation`: Iterative bottom-up solution using a 1D boolean DP array.

### 5. Min Cost Climbing Stairs (`min_cost_climbing_stairs.py`)

**Problem:** You are given an integer array `cost` where `cost[i]` is the cost of the `i`-th step. Once you pay the cost, you can either climb one or two steps. You can start from step 0 or step 1. Return the minimum cost to reach the top of the floor (one step beyond the last element of `cost`).

**Approaches:**
*   `min_cost_recursive_bruteforce`: Naive recursive solution.
*   `min_cost_memoization`: Memoized recursive solution (top-down DP).
*   `min_cost_tabulation`: Iterative bottom-up solution using a 1D DP array.
*   `min_cost_space_optimized`: Space-optimized iterative solution using only two variables.

## Getting Started

### Prerequisites

*   Python 3.6+

### Installation

Clone the repository:
```bash
git clone https://github.com/your-username/dp-interview-project.git
cd dp-interview-project
```

Install any dependencies (currently none beyond standard library, but good practice):
```bash
pip install -r requirements.txt
```

### Running Tests

To run all unit tests:
```bash
python -m unittest discover tests
```

You can also run specific test files:
```bash
python -m unittest tests.test_fibonacci
```

### Running Benchmarks

To compare the performance of brute-force vs. optimized DP solutions:
```bash
python benchmarks/benchmark_all.py
```
This script will print execution times for different approaches and input sizes, demonstrating the efficiency gains of Dynamic Programming.

### Exploring Algorithms

Each algorithm file in `algorithms/` contains example usage within its `if __name__ == '__main__':` block. You can run these files directly to see their output:
```bash
python algorithms/fibonacci.py
```

## Documentation

The `docs/` directory contains in-depth documentation:

*   **`dp_concepts.md`**: Explains what Dynamic Programming is, its core characteristics (overlapping subproblems, optimal substructure), and the two main paradigms (memoization and tabulation), along with illustrative ASCII diagrams.
*   **`dp_patterns.md`**: Categorizes common DP problem patterns (e.g., 0/1 Knapsack type, unbounded knapsack, subset sum, grid DP, string DP) and discusses variations for each implemented problem.
*   **`interview_tips.md`**: Provides advice on identifying DP problems, steps to formulate a DP solution, common edge cases, potential pitfalls, and strategies for success in a DP interview.

---

Feel free to explore, modify, and contribute to this project to deepen your understanding of Dynamic Programming!
```