# Binary Search Comprehensive Interview Project

This project provides a comprehensive exploration of the Binary Search algorithm, covering its fundamental implementation, common variations, and more advanced applications. It's designed to serve as an excellent resource for preparing for coding interviews, demonstrating a deep understanding of the algorithm's mechanics, complexity, and practical uses.

## Project Structure

```
binary_search_project/
├── src/
│   ├── main_algorithms.cpp           // Core Binary Search problems and solutions
│   ├── brute_force_vs_optimized.cpp  // Demonstrates brute force vs. optimized (binary search)
│   └── utils.h                       // Helper utilities (array generation, printing)
├── test/
│   ├── test_main_algorithms.cpp      // Unit tests for main_algorithms.cpp
│   └── test_performance.cpp          // Performance benchmarking
├── docs/
│   ├── README.md                     // Project overview, problem descriptions, build/run instructions (THIS FILE)
│   ├── algorithm_explanation.md      // Detailed explanation of Binary Search, edge cases, interview tips
│   └── binary_search_diagram.txt     // ASCII art diagrams for visualization
├── build.sh                          // Script to compile all C++ files
└── run_tests.sh                      // Script to run tests and performance benchmarks
```

## Problem Descriptions

This project implements optimal (binary search based) solutions for the following problems:

### 1. Classic Binary Search (`binarySearchIterative`, `binarySearchRecursive`)
*   **Description**: Given a sorted array of integers and a target value, return the index of the target if it exists, or -1 if not.
*   **Variations**: Implemented both iterative and recursive approaches.
*   **Complexity**:
    *   Time: O(log N)
    *   Space: O(1) for iterative, O(log N) for recursive (call stack)

### 2. Find First and Last Occurrence of an Element (`findFirstOccurrence`, `findLastOccurrence`)
*   **Description**: Given a sorted array potentially containing duplicate elements and a target value, find the index of its first and last occurrence.
*   **Concept**: This demonstrates the "lower bound" and "upper bound" variations of binary search.
*   **Complexity**:
    *   Time: O(log N)
    *   Space: O(1)

### 3. Search in Rotated Sorted Array (`searchInRotatedSortedArray`)
*   **Description**: Given a sorted array that has been rotated at some pivot unknown to you beforehand (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`), find a target value.
*   **Concept**: This problem requires careful analysis of which half of the array is sorted to narrow down the search space.
*   **Complexity**:
    *   Time: O(log N)
    *   Space: O(1)

### 4. Find Minimum in Rotated Sorted Array (`findMinInRotatedSortedArray`, `findMinInRotatedSortedArray_V2`)
*   **Description**: Given a rotated sorted array, find its minimum element.
*   **Concept**: Another variation where binary search is used to find a property (the minimum element, which acts as the pivot) rather than a specific target value. Two slightly different optimal approaches are provided.
*   **Complexity**:
    *   Time: O(log N)
    *   Space: O(1)

### 5. Square Root (Integer) (`mySqrt`)
*   **Description**: Implement `int sqrt(int x)`. Compute and return the square root of `x`, where `x` is guaranteed to be a non-negative integer. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
*   **Concept**: This is a classic example of "Binary Search on the Answer" (or "Search on Result"). The search space is not the input array, but the possible range of the answer itself (from 0 to `x`).
*   **Complexity**:
    *   Time: O(log X)
    *   Space: O(1)

## Setup and Execution

### Prerequisites
*   A C++ compiler (e.g., g++).
*   `make` (optional, for convenience with build script).

### Build Instructions

1.  Navigate to the project root directory:
    ```bash
    cd binary_search_project
    ```
2.  Make the build and run scripts executable:
    ```bash
    chmod +x build.sh run_tests.sh
    ```
3.  Run the build script to compile all C++ files:
    ```bash
    ./build.sh
    ```
    This will compile `main_algorithms.cpp`, `brute_force_vs_optimized.cpp`, `test_main_algorithms.cpp`, and `test_performance.cpp` into executables in the current directory.

### Run Instructions

1.  After building, you can run the tests and demos:
    ```bash
    ./run_tests.sh
    ```
    This script will execute:
    *   `./bin/main_algorithms_demo` (Demonstration of core problems)
    *   `./bin/brute_force_vs_optimized_demo` (Demonstration of performance difference)
    *   `./bin/run_unit_tests` (Unit tests for all problems)
    *   `./bin/run_performance_benchmarks` (Performance comparison against brute force)

    You can also run them individually:
    ```bash
    ./bin/main_algorithms_demo
    ./bin/brute_force_vs_optimized_demo
    ./bin/run_unit_tests
    ./bin/run_performance_benchmarks
    ```

## Documentation

The `docs/` directory contains detailed explanations:

*   **`algorithm_explanation.md`**: A deep dive into Binary Search, covering its principles, common pitfalls, and strategies for interviews.
*   **`binary_search_diagram.txt`**: ASCII art visualizations to help understand the search process.

## Key Concepts Covered

*   Iterative and Recursive Binary Search
*   Handling duplicates (first/last occurrence, lower/upper bound)
*   Binary Search in modified/complex search spaces (rotated arrays)
*   Binary Search on the answer (e.g., square root)
*   Time and Space Complexity analysis
*   Comparison with brute-force approaches
*   Edge case handling (empty array, single element, target at boundaries)
*   Integer overflow considerations in `mid` calculation (`low + (high - low) / 2`)

Feel free to explore the code, documentation, and tests to gain a thorough understanding of Binary Search!