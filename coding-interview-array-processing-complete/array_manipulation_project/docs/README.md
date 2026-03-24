# Array Manipulation Project for Coding Interviews

This project provides a comprehensive set of problems, solutions, and resources focused on **Array Manipulation**, specifically designed to help candidates prepare for coding interviews. It covers various techniques, optimal algorithms, edge cases, and performance considerations.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Setup](#setup)
4.  [How to Run](#how-to-run)
    *   [Run Tests](#run-tests)
    *   [Run Benchmarks](#run-benchmarks)
5.  [Problems Covered](#problems-covered)
    *   [1. Maximum Subarray Sum (Kadane's Algorithm)](#1-maximum-subarray-sum-kadanes-algorithm)
    *   [2. Rotate Array](#2-rotate-array)
    *   [3. Product of Array Except Self](#3-product-of-array-except-self)
    *   [4. Merge Overlapping Intervals](#4-merge-overlapping-intervals)
    *   [5. Find Smallest Missing Positive Integer](#5-find-smallest-missing-positive-integer)
6.  [Documentation Links](#documentation-links)
7.  [Interview Tips](#interview-tips)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Structure

```
array_manipulation_project/
├── src/
│   ├── algorithms.py           # Core algorithm implementations
│   └── utils.py                # Helper functions (e.g., array generation)
├── tests/
│   ├── test_algorithms.py      # Pytest unit tests for all algorithms
│   └── conftest.py             # Pytest configuration
├── docs/
│   ├── README.md               # This file
│   ├── algorithm_explanations.md # Detailed problem descriptions, logic, ASCII diagrams, edge cases, interview tips
│   └── variations.md           # Discussion on brute-force, optimized, memory-efficient solutions, and paradigms
├── benchmarks/
│   └── benchmark_performance.py # Script for comparing performance of different solutions
├── .gitignore                  # Standard Git ignore file
└── requirements.txt            # Python dependencies
```

## Features

*   **Multiple Problems**: Covers 5 fundamental array manipulation problems.
*   **Optimal Solutions**: Provides highly optimized solutions for each problem.
*   **Alternative Approaches**: Includes brute-force or alternative optimal solutions for comparison and understanding trade-offs.
*   **Detailed Comments**: Explanatory comments within the code for logic clarity.
*   **Complexity Analysis**: Time and space complexity specified for each function.
*   **Comprehensive Testing**: Extensive unit tests using `pytest` covering various scenarios, including edge cases.
*   **Performance Benchmarking**: Tools to compare the speed of different solutions on varying input sizes.
*   **In-depth Documentation**:
    *   Clear problem statements.
    *   Step-by-step logic explanations.
    *   ASCII visual diagrams to illustrate concepts.
    *   Discussion of edge cases, potential pitfalls, and common interview questions/variations.
    *   Insights into brute-force vs. optimized, memory-efficient, and different programming paradigms.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array_manipulation_project.git
    cd array_manipulation_project
    ```
    *(Note: Replace `https://github.com/your-username/array_manipulation_project.git` with your actual repository URL)*

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run

### Run Tests

Navigate to the project root directory and run `pytest`:

```bash
pytest
```

To see more detailed output, including print statements and specific test names:

```bash
pytest -v -s
```

### Run Benchmarks

The `benchmark_performance.py` script compares the execution time of different approaches for a given problem.

Navigate to the `benchmarks/` directory and run the script:

```bash
python benchmarks/benchmark_performance.py
```

This script will generate plots comparing performance, saved in a `results/` directory (which will be created if it doesn't exist).

## Problems Covered

### 1. Maximum Subarray Sum (Kadane's Algorithm)
Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
*   `max_subarray_sum_brute_force`: O(n^2)
*   `max_subarray_sum_kadane`: O(n) (Optimal)

### 2. Rotate Array
Rotate an array to the right by `k` steps.
*   `rotate_array_extra_space`: O(n) time, O(n) space
*   `rotate_array_reverse`: O(n) time, O(1) space (Optimal)

### 3. Product of Array Except Self
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Constraint: cannot use the division operation and must run in O(n) time.
*   `product_except_self_brute_force`: O(n^2)
*   `product_except_self_optimized`: O(n) time, O(1) space (Optimal, excluding output array)

### 4. Merge Overlapping Intervals
Given a collection of intervals, merge all overlapping intervals.
*   `merge_intervals`: O(n log n) time (due to sorting), O(n) space (for output and sort space) (Optimal)

### 5. Find Smallest Missing Positive Integer
Given an unsorted integer array `nums`, find the smallest missing positive integer.
*   `find_missing_positive_optimized`: O(n) time, O(1) space (Optimal, in-place modification)
*   `find_missing_positive_set_based`: O(n) time, O(n) space (Alternative)

## Documentation Links

*   **Detailed Algorithm Explanations, Diagrams, and Interview Tips**: [`docs/algorithm_explanations.md`](docs/algorithm_explanations.md)
*   **Discussion on Brute-Force vs. Optimized Solutions, Memory Efficiency, and Paradigms**: [`docs/variations.md`](docs/variations.md)

## Interview Tips

*   **Understand the Problem**: Always clarify constraints, input/output types, and edge cases with the interviewer.
*   **Think Aloud**: Explain your thought process, even when exploring incorrect paths.
*   **Start Simple (Brute Force)**: If stuck, outline a brute-force approach first. This can often reveal insights for optimization.
*   **Optimize Step-by-Step**: Look for ways to reduce time or space complexity from your initial solution.
*   **Consider Edge Cases**: Empty arrays, single-element arrays, all same elements, max/min integer values, negative numbers, zeros, duplicates.
*   **Time and Space Complexity**: Always analyze and state the complexity of your solution.
*   **Test Your Code**: Walk through examples manually (especially edge cases) before writing tests.
*   **Practice, Practice, Practice**: The more problems you solve, the better you become at pattern recognition and problem-solving strategies.

## Contributing

Feel free to contribute by:
*   Adding more problems or alternative solutions.
*   Improving existing solutions or documentation.
*   Adding more comprehensive test cases.
*   Enhancing benchmark scripts.

Please open an issue or submit a pull request!

## License

This project is open-sourced under the MIT License. See the LICENSE file for details.