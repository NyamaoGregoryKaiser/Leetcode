# Binary Search Interview Project

This project provides a comprehensive suite of binary search problems, their optimal solutions, brute-force counterparts, extensive tests, and performance benchmarks. It aims to be a complete resource for preparing for binary search-related questions in coding interviews.

## Table of Contents

1.  [Introduction to Binary Search](#introduction-to-binary-search)
2.  [Implemented Problems](#implemented-problems)
3.  [Project Structure](#project-structure)
4.  [How to Compile and Run](#how-to-compile-and-run)
5.  [Complexity Summary](#complexity-summary)
6.  [Documentation](#documentation)

## Introduction to Binary Search

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

Its core principle is **divide and conquer**.

## Implemented Problems

This project covers 5 distinct binary search problems, demonstrating various applications and techniques:

1.  **Standard Binary Search (Find Element)**:
    *   **Description**: Find the index of a target element in a sorted array.
    *   **Variations**: Iterative and Recursive approaches.
    *   **Files**: `src/binary_search_problems.cpp`, `src/brute_force_solutions.cpp`

2.  **First and Last Occurrence of an Element**:
    *   **Description**: Given a sorted array with duplicates, find the first and last index of a target element. If not found, return -1.
    *   **Files**: `src/binary_search_problems.cpp`

3.  **Search in Rotated Sorted Array**:
    *   **Description**: Search for a target element in a sorted array that has been rotated at an unknown pivot point.
    *   **Example**: `[4,5,6,7,0,1,2]` - `target = 0` should return `4`.
    *   **Files**: `src/binary_search_problems.cpp`, `src/brute_force_solutions.cpp`

4.  **Integer Square Root (MySqrt)**:
    *   **Description**: Implement `sqrt(x)`. Compute and return the square root of `x`, where `x` is a non-negative integer. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
    *   **Concept**: Binary search on the answer space `[0, x]`.
    *   **Files**: `src/binary_search_problems.cpp`

5.  **Kth Smallest Element in Two Sorted Arrays**:
    *   **Description**: Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the `k`-th smallest element (1-indexed). This is a generalization of the "Median of Two Sorted Arrays" problem.
    *   **Concept**: Advanced binary search on partitions or the answer space.
    *   **Files**: `src/binary_search_problems.cpp`, `src/brute_force_solutions.cpp`

## Project Structure

```
.
├── src/
│   ├── binary_search_problems.cpp    // Contains all optimized binary search implementations.
│   └── brute_force_solutions.cpp     // Contains simple, less optimized solutions for comparison.
├── include/
│   ├── binary_search_problems.h      // Function declarations for binary search solutions.
│   └── brute_force_solutions.h       // Function declarations for brute-force solutions.
├── tests/
│   ├── test_binary_search.cpp        // Comprehensive unit tests for all problems.
│   └── test_utils.h                  // Helper macros for testing (e.g., ASSERT_EQ).
├── benchmarks/
│   ├── benchmark_runner.cpp          // Code for performance measurement and comparison.
│   └── timer.h                       // A simple utility class for timing code execution.
├── docs/
│   ├── ALGORITHM.md                  // Detailed explanation of binary search, its variants, and problem-solving patterns.
│   ├── GOTCHAS.md                    // Common pitfalls, edge cases, and integer overflow considerations.
│   └── INTERVIEW_TIPS.md             // Advice for interviews, identifying binary search problems, and common follow-ups.
├── README.md                         // This file.
└── Makefile                          // Simplifies compilation and execution.
```

## How to Compile and Run

Make sure you have a C++ compiler (like g++) installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd binary_search_project
    ```

2.  **Compile and Run Tests:**
    ```bash
    make test
    ```
    This will compile `src/*.cpp` and `tests/test_binary_search.cpp` and run the generated `test_binary_search` executable.

3.  **Compile and Run Benchmarks:**
    ```bash
    make benchmark
    ```
    This will compile `src/*.cpp` and `benchmarks/benchmark_runner.cpp` and run the generated `benchmark_runner` executable.

4.  **Clean build artifacts:**
    ```bash
    make clean
    ```

## Complexity Summary

| Problem                             | Optimal (Binary Search)                                   | Brute Force                                            |
| :---------------------------------- | :-------------------------------------------------------- | :----------------------------------------------------- |
| Standard Binary Search              | **Time**: O(log N), **Space**: O(1) (iterative) / O(log N) (recursive) | **Time**: O(N), **Space**: O(1)                      |
| First/Last Occurrence               | **Time**: O(log N), **Space**: O(1)                      | **Time**: O(N), **Space**: O(1)                      |
| Search in Rotated Sorted Array      | **Time**: O(log N), **Space**: O(1)                      | **Time**: O(N), **Space**: O(1)                      |
| Integer Square Root (`mySqrt(x)`)   | **Time**: O(log X), **Space**: O(1)                      | **Time**: O(sqrt(X)), **Space**: O(1) (linear search) |
| Kth Smallest in Two Sorted Arrays   | **Time**: O(log(min(m, n))), **Space**: O(1)             | **Time**: O(m+n), **Space**: O(m+n) (merge)          |

_N, M_ refer to array sizes. _X_ refers to the input number for square root.

## Documentation

Explore the `docs/` directory for in-depth explanations:

*   **`ALGORITHM.md`**: Delves into the theory of binary search, its variants (lower_bound, upper_bound, on answer), and advanced applications.
*   **`GOTCHAS.md`**: Highlights common errors like integer overflow, off-by-one mistakes, and how to correctly handle loop conditions.
*   **`INTERVIEW_TIPS.md`**: Provides guidance on how to approach binary search problems in an interview setting, recognize patterns, and answer follow-up questions.

---