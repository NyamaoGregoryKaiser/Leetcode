# Binary Search Interview Project

This project is a comprehensive guide and implementation set for mastering Binary Search, a crucial algorithm for coding interviews. It includes multiple problem types, various optimal solutions, detailed explanations, robust testing, and performance benchmarking.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Building and Running](#building-and-running)
    *   [Prerequisites](#prerequisites)
    *   [Build Steps](#build-steps)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Problems Covered](#problems-covered)
5.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Visual Diagrams](#visual-diagrams)
6.  [Contributing](#contributing)
7.  [License](#license)

## Introduction

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one. This project aims to provide a thorough understanding and practical implementation experience for common binary search interview questions.

## Project Structure

-   `src/`: Contains all source code for algorithm implementations and helper utilities.
    -   `algorithms.h`: Function declarations for all binary search problems.
    -   `algorithms.cpp`: Implementations of various binary search algorithms.
    -   `helpers.h`, `helpers.cpp`: General utility functions (e.g., vector printing, random data generation).
-   `tests/`: Contains unit tests for all implemented algorithms using the Google Test framework.
-   `benchmarks/`: Contains performance benchmarks using the Google Benchmark framework, comparing different approaches and showcasing efficiency.
-   `docs/`: Contains detailed documentation for the project.
    -   `README.md`: This file.
    -   `binary_search_explained.md`: In-depth explanation of the binary search algorithm, its variations, pitfalls, and interview tips.
    -   `diagrams.md`: ASCII art diagrams to visually explain complex binary search scenarios.
    -   `problems_description.md`: Detailed descriptions for each problem solved in `src/algorithms.cpp`.
-   `CMakeLists.txt`: Top-level CMake file for building the entire project.
-   `.gitignore`: Specifies intentionally untracked files to ignore.

## Building and Running

### Prerequisites

You'll need the following installed:
-   A C++ compiler (GCC/Clang recommended) supporting C++11 or later.
-   CMake (version 3.10 or higher).
-   Google Test (will be fetched automatically by CMake if not found globally).
-   Google Benchmark (will be fetched automatically by CMake if not found globally).

### Build Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary_search_project.git
    cd binary_search_project
    ```
    (Note: Replace `your-username` with your actual GitHub username or remove this line if this is a local project setup.)

2.  **Create a build directory and run CMake:**
    ```bash
    mkdir build
    cd build
    cmake ..
    ```
    This will configure the project and download Google Test and Google Benchmark if they are not already installed on your system.

3.  **Compile the project:**
    ```bash
    cmake --build .
    ```
    This will compile all source files, creating executables for tests and benchmarks.

### Running Tests

After building, you can run all unit tests:
```bash
./tests/binary_search_tests
```

### Running Benchmarks

After building, you can run all performance benchmarks:
```bash
./benchmarks/binary_search_benchmarks
```

## Problems Covered

This project covers the following essential binary search problems:

1.  **Standard Binary Search:** Finding an exact element in a sorted array.
    *   Iterative Approach
    *   Recursive Approach
    *   Comparison with Linear Search (Brute Force)
2.  **Find First and Last Occurrence:** Locating the first and last indices of a target in a sorted array with duplicates.
3.  **Search in Rotated Sorted Array:** Finding an element in a sorted array that has been rotated at an unknown pivot.
4.  **Find Peak Element:** Identifying a peak element in an array where `nums[i] > nums[i-1]` and `nums[i] > nums[i+1]`.
5.  **Smallest Divisor Given a Threshold (Binary Search on Answer):** Finding the smallest positive divisor such that the sum of the division results (rounded up) is less than or equal to a given threshold. This demonstrates binary search on the *answer space* rather than directly on the input array.

For detailed descriptions of each problem, refer to `docs/problems_description.md`.

## Documentation

### Algorithm Explanation
For a deep dive into the theory, common variations, and interview strategies for Binary Search, check out `docs/binary_search_explained.md`.

### Visual Diagrams
Visual aids using ASCII art to understand the mechanics of binary search are available in `docs/diagrams.md`.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, find bugs, or want to add more problems/solutions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
(Note: A `LICENSE` file would typically be added to a real project.)

---