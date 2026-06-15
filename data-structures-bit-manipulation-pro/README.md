# Bit Manipulation Interview Project

This project provides a comprehensive set of resources for mastering bit manipulation problems commonly encountered in coding interviews. It includes multiple problems, various solution approaches (including optimal ones), detailed explanations, extensive test cases, performance benchmarks, and interview tips.

## Table of Contents

1.  [Project Description](#project-description)
2.  [Problem Statements](#problem-statements)
    *   [Problem 1: Count Set Bits (Hamming Weight)](#problem-1-count-set-bits-hamming-weight)
    *   [Problem 2: Check if Power of Two](#problem-2-check-if-power-of-two)
    *   [Problem 3: Single Number (Find Unique Element)](#problem-3-single-number-find-unique-element)
    *   [Problem 4: Reverse Bits](#problem-4-reverse-bits)
    *   [Problem 5: Insert M into N](#problem-5-insert-m-into-n)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running the Main Demo](#running-the-main-demo)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Directory Structure](#directory-structure)
5.  [Documentation](#documentation)
6.  [License](#license)

## Project Description

The goal of this project is to offer a complete package for practicing and understanding bit manipulation algorithms. It covers:

*   **Core Algorithms**: Implementations of several classic bit manipulation problems using C++.
*   **Multiple Approaches**: For many problems, both brute-force/intuitive and optimized bitwise solutions are provided.
*   **Detailed Comments**: Every piece of code is thoroughly commented to explain the logic, bitwise operations, and choices made.
*   **Complexity Analysis**: Time and space complexity are analyzed for each solution.
*   **Robust Testing**: Comprehensive unit tests using the Catch2 framework to ensure correctness across various edge cases.
*   **Performance Benchmarking**: Google Benchmark is used to compare the performance of different algorithms for the same problem.
*   **In-depth Documentation**: Markdown files provide algorithm explanations, visual diagrams, edge case discussions, and general interview tips for bit manipulation.

## Problem Statements

### Problem 1: Count Set Bits (Hamming Weight)

Write a function that takes an unsigned 32-bit integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Example:**
Input: `00000000000000000000000000001011` (binary representation of `11`)
Output: `3`

### Problem 2: Check if Power of Two

Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Example:**
Input: `16`
Output: `true` (since `16 = 2^4`)
Input: `3`
Output: `false`

### Problem 3: Single Number (Find Unique Element)

Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

**Example:**
Input: `[2,2,1]`
Output: `1`

### Problem 4: Reverse Bits

Reverse the bits of a given 32-bit unsigned integer.

**Example:**
Input: `00000010100101000001111010011100` (binary representation of `43261596`)
Output: `00111001011110000010100101000000` (binary representation of `964176192`)

### Problem 5: Insert M into N

Given two 32-bit numbers, `N` and `M`, and two bit positions, `i` and `j`. Write a method to insert `M` into `N` such that `M` starts at bit `j` and ends at bit `i`. You can assume that bits `j` through `i` have enough space to fit all of `M`. That is, if `M` has length `k`, you can assume `j - i + 1 >= k`.

**Example:**
Input: `N = 10000000000` (binary, `1024` decimal)
       `M = 10011` (binary, `19` decimal)
       `i = 2, j = 6`
Output: `N = 10001001100` (binary, `1092` decimal)

## Getting Started

### Prerequisites

*   A C++11 compatible compiler (e.g., GCC, Clang, MSVC)
*   CMake (version 3.10 or higher)
*   Git (for cloning the repository)

### Building the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/BitManipulationInterviewProject.git
    cd BitManipulationInterviewProject
    ```
    *(Note: Replace `https://github.com/yourusername/BitManipulationInterviewProject.git` with the actual path if you've forked/created it.)*

2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```

3.  **Configure CMake:**
    ```bash
    cmake ..
    ```
    CMake will automatically download and configure Catch2 and Google Benchmark dependencies.

4.  **Build the project:**
    ```bash
    cmake --build .
    ```
    This will compile the main application, tests, and benchmarks.

### Running the Main Demo

The main demo (`BitManipulation_Demo`) showcases the usage of each implemented algorithm with predefined examples.

```bash
./src/BitManipulation_Demo
```

### Running Tests

The unit tests use the Catch2 framework.

```bash
./test/BitManipulation_Tests
```

### Running Benchmarks

The performance benchmarks use Google Benchmark.

```bash
./benchmarking/BitManipulation_Benchmarks
```
The output will show detailed performance metrics for different implementations of the algorithms.

## Directory Structure

```
BitManipulationInterviewProject/
├── CMakeLists.txt                  # CMake build configuration
├── README.md                       # Project overview and instructions
├── src/                            # Source code for algorithms
│   ├── BitManipulationProblems.cpp # Implementations of bit manipulation problems
│   ├── BitManipulationProblems.h   # Declarations of bit manipulation problems
│   └── main.cpp                    # Main demo application
├── test/                           # Unit tests
│   ├── Catch2_setup.cpp            # Catch2 configuration
│   └── TestBitManipulation.cpp     # Specific test cases for problems
├── docs/                           # Documentation
│   ├── AlgorithmExplanation.md     # Detailed algorithm explanations with diagrams
│   └── InterviewTips.md            # General tips for bit manipulation interviews
├── benchmarking/                   # Performance benchmarks
│   └── BenchmarkBitManipulation.cpp # Benchmark code for various solutions
└── utils/                          # Utility functions
    └── CommonHelpers.h             # Helper functions (e.g., print binary)
```

## Documentation

*   **Algorithm Explanation (`docs/AlgorithmExplanation.md`)**: Dive deep into the logic behind each bit manipulation problem. Understand the properties of bitwise operators and how they are applied. Includes ASCII art diagrams for better visualization.
*   **Interview Tips (`docs/InterviewTips.md`)**: Get insights into common bit manipulation patterns, tricks, edge cases to consider, and strategies for tackling these problems in an interview setting.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details. (Note: A `LICENSE` file is not explicitly generated here, but it's good practice to include one in a real project.)

---