# Backtracking Algorithms Interview Project

This project is a comprehensive guide and implementation set for various Backtracking algorithms, designed to help prepare for technical coding interviews. It covers fundamental concepts, multiple problem-solving approaches, detailed code implementations, testing, performance analysis, and interview strategies.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Implemented Algorithms](#implemented-algorithms)
    *   [Permutations](#permutations-leetcode-46)
    *   [Combination Sum II](#combination-sum-ii-leetcode-40)
    *   [N-Queens Problem](#n-queens-problem-leetcode-51)
    *   [Sudoku Solver](#sudoku-solver-leetcode-37)
    *   [Palindrome Partitioning](#palindrome-partitioning-leetcode-131)
4.  [Setup and Installation](#setup-and-installation)
5.  [How to Run](#how-to-run)
    *   [Run Tests](#run-tests)
    *   [Run Benchmarks](#run-benchmarks)
    *   [Run Comparison Scripts](#run-comparison-scripts)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Introduction

Backtracking is a general algorithmic technique for finding all (or some) solutions to computational problems, particularly constraint satisfaction problems. It incrementally builds candidates to the solutions, and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be extended to a valid solution.

This project aims to solidify understanding and practical application of backtracking through:
*   Clear, commented Python implementations of classic problems.
*   Thorough testing with edge cases.
*   Performance analysis.
*   Comparison with brute-force and memory-optimized approaches.
*   Extensive documentation covering theory, tips, and visual aids.

## Project Structure

```
backtracking_interview_project/
├── src/                                    # Main source code for algorithms and helpers
│   ├── algorithms.py                       # Core backtracking implementations
│   ├── helpers.py                          # Utility functions
│   └── __init__.py                         # Python package initializer
├── tests/                                  # Unit tests for algorithms
│   ├── test_algorithms.py                  # Pytest test cases
│   └── __init__.py
├── docs/                                   # Documentation files
│   ├── README.md                           # This file
│   ├── ALGORITHM_EXPLANATION.md            # Detailed explanation of backtracking concepts
│   ├── VISUAL_DIAGRAMS.md                  # ASCII art diagrams for visualization
│   └── INTERVIEW_TIPS.md                   # Interview strategies, edge cases, and variations
├── benchmarks/                             # Performance benchmarking scripts
│   └── benchmark_algorithms.py             # Script to measure algorithm performance
├── solutions_comparison/                   # Scripts for comparing different solution types
│   ├── brute_force_vs_optimized.py         # Compares brute force with optimized backtracking
│   └── memory_optimized.py                 # Demonstrates memory-efficient solutions (e.g., generators)
├── .gitignore                              # Git ignore file
└── requirements.txt                        # Python dependencies
```

## Implemented Algorithms

Each problem includes an optimal backtracking solution, detailed comments, and complexity analysis within `src/algorithms.py`.

### Permutations (LeetCode 46)
Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

### Combination Sum II (LeetCode 40)
Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination. The solution set must not contain duplicate combinations.

### N-Queens Problem (LeetCode 51)
The n-queens puzzle is the problem of placing n non-attacking queens on an `n x n` chessboard. Given an integer `n`, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

### Sudoku Solver (LeetCode 37)
Write a program to solve a Sudoku puzzle by filling the empty cells. A Sudoku solution must satisfy all the following rules:
1.  Each of the digits 1-9 must occur exactly once in each row.
2.  Each of the digits 1-9 must occur exactly once in each column.
3.  Each of the digits 1-9 must occur exactly once in each of the nine 3x3 sub-boxes of the grid.
The `'.'` character indicates empty cells.

### Palindrome Partitioning (LeetCode 131)
Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking_interview_project.git
    cd backtracking_interview_project
    ```
2.  **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run

### Run Tests

To run all unit tests for the implemented algorithms:

```bash
pytest tests/
```

### Run Benchmarks

To run the performance benchmarking script:

```bash
python benchmarks/benchmark_algorithms.py
```

This will print execution times for different algorithms with varying input sizes.

### Run Comparison Scripts

**Brute Force vs. Optimized:**
This script compares the performance and approach of a brute-force solution against an optimized backtracking solution for a chosen problem (e.g., Permutations).

```bash
python solutions_comparison/brute_force_vs_optimized.py
```

**Memory Optimized:**
This script demonstrates memory-efficient versions of backtracking algorithms, typically using generators to yield results instead of storing all of them in memory.

```bash
python solutions_comparison/memory_optimized.py
```

## Documentation

The `docs/` directory contains rich documentation to aid in understanding:

*   **`ALGORITHM_EXPLANATION.md`**: A deep dive into what backtracking is, its components, and a general template.
*   **`VISUAL_DIAGRAMS.md`**: ASCII art diagrams to visually represent decision trees and problem states (e.g., N-Queens board).
*   **`INTERVIEW_TIPS.md`**: Practical advice for interviews, common pitfalls, edge cases, and variations of backtracking problems.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions, find bugs, or want to add more problems/solutions.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details (not provided in this response, but would be a standard part of a real project).

---