# Backtracking Algorithms Interview Project

This project provides a comprehensive suite for understanding and practicing Backtracking algorithms, a fundamental technique in computer science and a common topic in coding interviews. It includes multiple problems, optimal solutions, detailed explanations, robust testing, performance benchmarking, and extensive documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Installation](#installation)
4.  [Problems Covered](#problems-covered)
    *   [Subsets](#subsets)
    *   [Permutations](#permutations)
    *   [Combination Sum II](#combination-sum-ii)
    *   [N-Queens](#n-queens)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
8.  [Alternative Implementations](#alternative-implementations)
9.  [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

Backtracking is an algorithmic paradigm that tries to find a solution by incrementally building candidates to the solution, and abandoning a candidate ("backtracking") as soon as it determines that the candidate cannot possibly be completed to a valid solution. It's often used for problems that involve searching for all possible solutions or a specific solution in a set of choices.

This project aims to be an all-in-one resource for mastering backtracking, covering:
*   Core algorithmic implementations in Python.
*   Comprehensive unit tests.
*   Performance analysis tools.
*   In-depth theoretical documentation.
*   Practical interview advice.

---

## Features

*   **Diverse Problem Set**: 4 classic backtracking problems with varying complexities.
*   **Optimal Solutions**: Each problem includes an optimal recursive backtracking solution.
*   **Detailed Explanations**: In-code comments, docstrings, and separate documentation files provide thorough explanations of logic, time/space complexity, and edge cases.
*   **Robust Testing**: Extensive unit tests ensure correctness for various inputs, including edge cases.
*   **Performance Benchmarking**: Tools to measure the efficiency of implementations with varying input sizes.
*   **Comprehensive Documentation**: Markdown files covering backtracking fundamentals, visual diagrams, and interview strategies.
*   **Alternative Approaches**: Demonstrates different paradigms (e.g., iterative) or optimized techniques (e.g., bitmasking for N-Queens).

---

## Installation

This project requires Python 3.6 or higher. No external libraries are strictly necessary for the core functionalities, but `unittest` (built-in) is used for testing.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking_project.git
    cd backtracking_project
    ```
    (Replace `your-username` with your actual GitHub username or the project's repository URL)

2.  **No further installation steps are typically needed.**

---

## Problems Covered

### Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

*   **File**: `src/backtracking_problems.py`
*   **Function**: `subsets(nums: list[int]) -> list[list[int]]`
*   **Concepts**: Decision tree, include/exclude element.

### Permutations

Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.

*   **File**: `src/backtracking_problems.py`
*   **Function**: `permutations(nums: list[int]) -> list[list[int]]`
*   **Concepts**: State management (used elements), swapping or visited array.

### Combination Sum II

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used once in the combination. The solution set must not contain duplicate combinations.

*   **File**: `src/backtracking_problems.py`
*   **Function**: `combination_sum_ii(candidates: list[int], target: int) -> list[list[int]]`
*   **Concepts**: Sorting, pruning, handling duplicates, avoiding re-using elements.

### N-Queens

The n-queens puzzle is the problem of placing n non-attacking queens on an `n x n` chessboard. Given an integer `n`, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

*   **File**: `src/backtracking_problems.py`
*   **Function**: `n_queens(n: int) -> list[list[str]]`
*   **Concepts**: Grid traversal, complex state validation, managing rows, columns, and diagonals.

---

## Running Tests

To execute all unit tests, navigate to the project's root directory and run:

```bash
python -m unittest discover tests
```

This command will find and run all test files within the `tests/` directory.

---

## Running Benchmarks

To evaluate the performance of the implemented algorithms, use the benchmarking script:

```bash
python benchmarks/benchmark_runner.py
```

The script will run each algorithm with a series of increasing input sizes and print the execution times. This helps in understanding the practical implications of their theoretical time complexities.

---

## Documentation

The `docs/` directory contains in-depth explanations:

*   **`backtracking_primer.md`**: An introduction to backtracking, its principles, general pseudo-code, and when to use it.
*   **`problem_visualizations.md`**: ASCII art diagrams illustrating the decision trees and state spaces for selected problems.
*   **`interview_guide.md`**: Tips on how to approach backtracking problems in an interview, common pitfalls, complexity analysis, and variations.

You can read these files directly in your markdown viewer or browser.

---

## Alternative Implementations

The `alternative_implementations/` directory showcases different ways to solve some of the problems, often with different trade-offs or demonstrating advanced techniques:

*   **`subsets_iterative.py`**: An iterative approach to generating subsets, often using bit manipulation, which doesn't directly use recursion/backtracking but is a common alternative for this specific problem.
*   **`n_queens_optimized_bitmask.py`**: A highly optimized solution for N-Queens that uses bitmasks to check for conflicts (columns and diagonals) in `O(1)` time, significantly improving performance for larger `n`.

---

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements. Your contributions are welcome!

---

## License

This project is licensed under the MIT License - see the LICENSE file for details. (Note: A LICENSE file is not generated in this response, but would typically be included in a real project).