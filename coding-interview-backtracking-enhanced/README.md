# Backtracking Interview Project

This project serves as a comprehensive resource for understanding and implementing Backtracking algorithms, a fundamental technique in computer science and a common topic in coding interviews. It includes several classic backtracking problems, optimal solutions, detailed explanations, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Project Structure](#project-structure)
3.  [Problem Descriptions](#problem-descriptions)
    *   [Subsets](#subsets)
    *   [Permutations](#permutations)
    *   [Combination Sum II](#combination-sum-ii)
    *   [N-Queens](#n-queens)
4.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Core Concepts](#core-concepts)
7.  [Interview Tips](#interview-tips)
8.  [License](#license)

## Project Overview

Backtracking is an algorithmic paradigm that attempts to find solutions by incrementally building candidates to the solutions and abandoning a candidate ("backtracking") as soon as it determines that the candidate cannot possibly be completed to a valid solution. It's often used for problems involving searching through a state space, typically represented as a tree structure.

This project aims to:
*   Provide clear, well-commented, and optimal Python implementations for common backtracking problems.
*   Offer thorough explanations of the algorithms, including time and space complexity analysis.
*   Demonstrate robust testing practices with a wide range of test cases.
*   Showcase performance characteristics through benchmarking.
*   Furnish comprehensive documentation to solidify understanding.

## Project Structure

```
backtracking_interview_project/
├── src/                          # Main algorithm implementations
│   ├── __init__.py               # Python package marker
│   ├── subsets.py                # Finds all possible subsets of a given set.
│   ├── permutations.py           # Finds all possible permutations of a given set.
│   ├── combination_sum_ii.py     # Finds unique combinations that sum to a target (with duplicates).
│   └── n_queens.py               # Solves the N-Queens problem.
├── tests/                        # Unit tests for each problem
│   ├── __init__.py
│   ├── test_subsets.py
│   ├── test_permutations.py
│   ├── test_combination_sum_ii.py
│   └── test_n_queens.py
├── docs/                         # Comprehensive algorithm explanation and diagrams
│   └── ALGORITHM_EXPLANATION.md
├── performance/                  # Performance benchmarking scripts
│   └── benchmark.py
├── utils/                        # Helper utilities (e.g., for displaying N-Queens board)
│   ├── __init__.py
│   └── display.py
└── README.md                     # Project overview and instructions
```

## Problem Descriptions

### Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

*   **Example:**
    *   Input: `nums = [1, 2, 3]`
    *   Output: `[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]`

### Permutations

Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.

*   **Example:**
    *   Input: `nums = [1, 2, 3]`
    *   Output: `[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]`

### Combination Sum II

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used **once** in the combination. The solution set must not contain duplicate combinations.

*   **Example:**
    *   Input: `candidates = [10, 1, 2, 7, 6, 1, 5]`, `target = 8`
    *   Output: `[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]`
    *   Note: `1` is used twice in `[1, 1, 6]` because it appears twice in `candidates`.

### N-Queens

The N-Queens puzzle is the problem of placing N non-attacking queens on an N×N chessboard. This means no two queens share the same row, column, or diagonal. Given an integer `n`, return all distinct solutions to the N-Queens puzzle. Each solution contains a distinct board configuration of the N queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

*   **Example:**
    *   Input: `n = 4`
    *   Output:
        ```
        [[".Q..",  // Solution 1
          "...Q",
          "Q...",
          "..Q."],

         ["..Q.",  // Solution 2
          "Q...",
          "...Q",
          ".Q.."]]
        ```

## Getting Started

### Prerequisites

*   Python 3.6+

### Installation

No specific installation steps are required beyond cloning the repository.

```bash
git clone https://github.com/your-username/backtracking_interview_project.git
cd backtracking_interview_project
```

### Running Tests

To run all unit tests:

```bash
python -m unittest discover tests
```

### Running Benchmarks

To execute the performance benchmarks:

```bash
python performance/benchmark.py
```

## Documentation

For a deep dive into the backtracking algorithm, its general template, problem-specific explanations, visual diagrams, edge cases, and interview tips, please refer to:

[`docs/ALGORITHM_EXPLANATION.md`](./docs/ALGORITHM_EXPLANATION.md)

## Core Concepts

The `docs/ALGORITHM_EXPLANATION.md` covers these in detail:
*   **Decision Tree:** How problems can be visualized as a tree of choices.
*   **State:** What information needs to be maintained at each step of the recursion.
*   **Choices:** The options available at the current state.
*   **Constraints:** Rules that limit valid choices and allow for pruning.
*   **Goal/Base Case:** The condition under which a valid solution is found or the recursion terminates.
*   **Backtracking Step:** Reverting choices to explore alternative paths.

## Interview Tips

*   **Understand the template:** A common recursive structure applies to many backtracking problems.
*   **Identify State:** What do you need to pass in your recursive helper function?
*   **Pruning:** How can you optimize by avoiding invalid paths early?
*   **Handle Duplicates:** Sorting and conditional skips are often key.
*   **Practice Visualization:** Draw recursion trees.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details (not included in this output for brevity, but a standard one would be here).