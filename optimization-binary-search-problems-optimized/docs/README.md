# Binary Search Interview Prep Project

Welcome to the Binary Search Interview Prep project! This repository is designed to be a comprehensive resource for understanding, implementing, and mastering Binary Search and its many variations, crucial for coding interviews.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Setup and Installation](#setup-and-installation)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Problems Covered](#problems-covered)
    *   [Problem 1: Search in a Sorted Array](#problem-1-search-in-a-sorted-array)
    *   [Problem 2: Search in Rotated Sorted Array](#problem-2-search-in-rotated-sorted-array)
    *   [Problem 3: Find Peak Element](#problem-3-find-peak-element)
    *   [Problem 4: First Bad Version](#problem-4-first-bad-version)
    *   [Problem 5: Find First and Last Position of Element in Sorted Array](#problem-5-find-first-and-last-position-of-element-in-sorted-array)
7.  [Documentation](#documentation)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Overview

Binary Search is a fundamental algorithm for searching in sorted data structures, known for its `O(log N)` time complexity. This project goes beyond the basic implementation, exploring common interview questions that require a nuanced understanding of Binary Search's core principles.

You'll find:
*   **Core Binary Search implementations**: Iterative and recursive approaches.
*   **Diverse Problem Set**: 5 distinct problems showcasing different Binary Search patterns.
*   **Optimal Solutions**: Each problem comes with well-commented, optimal JavaScript solutions.
*   **Time & Space Complexity Analysis**: For every solution.
*   **Extensive Test Cases**: To ensure correctness and robustness.
*   **Performance Benchmarking**: To compare efficiency.
*   **Comprehensive Documentation**: Covering algorithm explanations, edge cases, and interview tips.

## Features

*   **Modular Codebase**: Algorithms and problems are organized clearly.
*   **Detailed Explanations**: Understand *why* and *how* each solution works.
*   **Multiple Approaches**: Where applicable (e.g., iterative vs. recursive, different template uses).
*   **Interview Focus**: Designed to prepare you for common Binary Search challenges.
*   **Node.js based**: All code is in JavaScript, runnable with Node.js.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary-search-interview-prep.git
    cd binary-search-interview-prep
    ```

2.  **Install dependencies (for linting):**
    ```bash
    npm install
    ```

## Running Tests

To run all the test suites for the algorithms and problems:

```bash
npm test
```

This command executes `test/runAllTests.js`, which dynamically loads and runs all individual test files.

## Running Benchmarks

To evaluate the performance of the implemented algorithms:

```bash
npm benchmark
```

This command executes `test/performance/benchmark.js`, which measures the execution time for selected problems with varying input sizes.

## Problems Covered

Each problem has its solution in `src/algorithms/problems/` and corresponding tests in `test/algorithms/`.

### Problem 1: Search in a Sorted Array
**File**: `src/algorithms/problems/problem1_sortedArraySearch.js`
**Description**: Implement the basic binary search to find a target value in a sorted array. Includes variations for finding the first occurrence, last occurrence, and any occurrence.
**Optimal Solution**: Iterative Binary Search.
**Complexity**:
*   Time: O(log N)
*   Space: O(1)

### Problem 2: Search in Rotated Sorted Array
**File**: `src/algorithms/problems/problem2_rotatedSortedArraySearch.js`
**Description**: Search for a target value in a sorted array that has been rotated at an unknown pivot.
**Optimal Solution**: Modified Binary Search to handle the rotation.
**Complexity**:
*   Time: O(log N)
*   Space: O(1)

### Problem 3: Find Peak Element
**File**: `src/algorithms/problems/problem3_peakElement.js`
**Description**: Find a peak element in an array. A peak element is an element that is strictly greater than its neighbors. The array may contain multiple peaks.
**Optimal Solution**: Binary Search, leveraging the monotonic property of the "up-slope" and "down-slope" towards a peak.
**Complexity**:
*   Time: O(log N)
*   Space: O(1)

### Problem 4: First Bad Version
**File**: `src/algorithms/problems/problem4_firstBadVersion.js`
**Description**: You are a product manager and want to find the first bad version among `n` versions using an API `isBadVersion(version)`. This is a classic "binary search on the answer" problem.
**Optimal Solution**: Binary Search to find the first true in a boolean array (implicitly).
**Complexity**:
*   Time: O(log N) (where N is the number of versions)
*   Space: O(1)

### Problem 5: Find First and Last Position of Element in Sorted Array
**File**: `src/algorithms/problems/problem5_findRange.js`
**Description**: Given a sorted array of integers `nums` and a target value, find the starting and ending position of the given target value. If the target is not found in the array, return `[-1, -1]`.
**Optimal Solution**: Two separate Binary Searches: one for the first occurrence and one for the last occurrence.
**Complexity**:
*   Time: O(log N)
*   Space: O(1)

## Documentation

The `docs/` directory contains crucial supplementary materials:

*   **`docs/algorithm_explanation.md`**: A deep dive into how Binary Search works, its prerequisites, and common variations (iterative vs. recursive, different template uses). Includes ASCII diagrams for visual understanding.
*   **`docs/edge_cases_gotchas.md`**: A list of common mistakes, off-by-one errors, and tricky scenarios to watch out for when implementing Binary Search.
*   **`docs/interview_tips_variations.md`**: Strategies for tackling Binary Search problems in interviews, common follow-up questions, and the concept of "Binary Search on the Answer".

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements. Any contributions that enhance the learning experience or expand the problem set are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (though I haven't generated a full LICENSE file, it would typically be here).