# Array Manipulation Interview Project

This project is a comprehensive guide and implementation for common array manipulation problems encountered in coding interviews. It provides multiple solutions, detailed explanations, performance analysis, and supporting documentation to help solidify understanding and prepare for technical interviews.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [How to Build and Run](#how-to-build-and-run)
4.  [File Descriptions](#file-descriptions)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)

## Project Structure

```
array_manipulation_project/
├── src/
│   ├── array_manipulation.hpp    // Header for main algorithm functions
│   ├── array_manipulation.cpp    // Implementation of array manipulation algorithms
│   └── utils.hpp                 // Utility functions (e.g., vector printing, simple timer)
├── tests/
│   └── test_array_manipulation.cpp // Unit tests for all problems
├── benchmarks/
│   └── benchmark.cpp             // Performance benchmarking for different solutions
├── docs/
│   ├── algorithms.md             // Detailed algorithm explanations
│   ├── diagrams.md               // ASCII art diagrams for key concepts
│   └── interview_guide.md        // Interview tips, edge cases, and variations
├── CMakeLists.txt                // Build system configuration
└── README.md                     // Project overview, setup, and problem descriptions
```

## Problems Covered

This project addresses the following fundamental array manipulation problems:

1.  **Rotate Array**:
    *   **Problem**: Rotate an array to the right by `k` steps.
    *   **Solutions**: Brute Force (k rotations), Using Extra Space (temp array), Three Reversals, Juggling Algorithm.
    *   **Concepts**: In-place modification, modular arithmetic.

2.  **Product of Array Except Self**:
    *   **Problem**: Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The algorithm must run in O(n) time and without using the division operation.
    *   **Solutions**: Brute Force (division allowed), Prefix/Suffix Products.
    *   **Concepts**: Prefix sums/products, efficient array traversal.

3.  **Maximum Subarray Sum (Kadane's Algorithm)**:
    *   **Problem**: Find the contiguous subarray (containing at least one number) which has the largest sum.
    *   **Solutions**: Brute Force, Dynamic Programming (Kadane's Algorithm).
    *   **Concepts**: Dynamic programming, greedy approach.

4.  **Merge Intervals**:
    *   **Problem**: Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
    *   **Solutions**: Sorting and Merging.
    *   **Concepts**: Sorting custom objects/pairs, greedy algorithm, interval management.

## How to Build and Run

To build and run this project, you will need a C++ compiler (like g++) and CMake.

1.  **Clone the Repository (or save files locally):**
    ```bash
    git clone https://github.com/your-username/array_manipulation_project.git
    cd array_manipulation_project
    ```
    (Replace with your actual repo URL if hosted, otherwise ensure all files are in the correct directories.)

2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```

3.  **Configure CMake:**
    ```bash
    cmake ..
    ```

4.  **Build the executables:**
    ```bash
    cmake --build .
    ```

5.  **Run Tests:**
    To run the unit tests:
    ```bash
    ./array_manipulation_tests
    ```

6.  **Run Benchmarks:**
    To run the performance benchmarks:
    ```bash
    ./array_manipulation_benchmarks
    ```

## File Descriptions

*   `src/array_manipulation.hpp`: Declares the functions for all array manipulation problems.
*   `src/array_manipulation.cpp`: Contains the implementations for various approaches to each problem. Each solution includes detailed comments, time/space complexity analysis, and multiple approaches where applicable.
*   `src/utils.hpp`: Provides utility functions like `printVector` for debugging and a `Timer` class for performance measurement.
*   `tests/test_array_manipulation.cpp`: Contains unit tests using a simple assertion framework to verify the correctness of all implemented solutions across a wide range of test cases, including edge cases.
*   `benchmarks/benchmark.cpp`: Utilizes the `Timer` utility to measure and compare the performance of different algorithms or approaches for a given problem (e.g., different `rotateArray` methods).
*   `docs/algorithms.md`: Offers in-depth explanations of the logic behind each algorithm, including step-by-step breakdowns and rationale for optimal choices.
*   `docs/diagrams.md`: Features ASCII art diagrams to visually represent key algorithm steps or data structures, enhancing understanding.
*   `docs/interview_guide.md`: Provides general interview tips, common variations of the problems, follow-up questions, and identifies common edge cases and potential pitfalls.
*   `CMakeLists.txt`: Defines the build process for the project, specifying how source files are compiled into executables.

## Documentation

The `docs/` directory is crucial for understanding the project in depth:

*   **`algorithms.md`**: Dive into the "why" and "how" of each solution.
*   **`diagrams.md`**: Visual learners will appreciate the ASCII art.
*   **`interview_guide.md`**: Essential for interview preparation, covering variations, edge cases, and discussion points.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, new problems, or additional solutions.

---
© 2023 [Your Name/Company]. All rights reserved.