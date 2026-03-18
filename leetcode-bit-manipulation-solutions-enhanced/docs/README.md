```markdown
# Bit Manipulation Interview Project

This project provides a comprehensive set of problems, solutions, and documentation for Bit Manipulation, a crucial topic in coding interviews. It aims to cover various techniques, edge cases, and performance considerations to prepare candidates for challenging questions.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Problem Descriptions](#problem-descriptions)
3.  [Project Structure](#project-structure)
4.  [How to Compile and Run](#how-to-compile-and-run)
5.  [Documentation Links](#documentation-links)

---

## Project Overview

Bit manipulation involves working with numbers at the bit level, using bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`). It's often used for:
*   Optimizing algorithms for speed and memory.
*   Solving problems where properties of individual bits are relevant (e.g., powers of two, counting set bits).
*   Handling flags, permissions, and compact data representations.

This project includes:
*   **Core Algorithms:** C++ implementations of 5 common bit manipulation problems, each with multiple approaches (optimal, brute-force, lookup table where applicable).
*   **Detailed Explanations:** Comments within the code, and a dedicated `algorithms.md` document for deeper dives.
*   **Complexity Analysis:** Time and space complexity for each solution.
*   **Extensive Tests:** Unit tests with various inputs, including edge cases.
*   **Performance Benchmarking:** Code to compare the efficiency of different solutions.
*   **Comprehensive Documentation:** `README.md`, `algorithms.md`, `edge_cases.md`, and `interview_tips.md`.

---

## Problem Descriptions

Here are the problems addressed in this project:

### 1. Count Set Bits (Hamming Weight)
**Problem:** Write a function that takes an unsigned 32-bit integer and returns the number of '1' bits it has (also known as the Hamming weight).
**Example:**
Input: `n = 00000000000000000000000000001011`
Output: `3` (since there are three '1' bits)

**Approaches Implemented:**
*   **Iterative:** Simple loop checking LSB and right-shifting.
*   **Brian Kernighan's Algorithm:** Efficiently clears the least significant set bit repeatedly.
*   **Lookup Table:** Precomputes bit counts for bytes and sums them up for a 32-bit integer.

### 2. Single Number III (Find two unique numbers)
**Problem:** Given an integer array `nums` where exactly two elements appear once and all the other elements appear twice, find the two elements that appear only once. You can return the answer in any order.
**Constraints:** Your algorithm should run in O(N) time complexity and use only O(1) extra space.
**Example:**
Input: `nums = [1, 2, 1, 3, 2, 5]`
Output: `[3, 5]` (or `[5, 3]`)

**Approach Implemented:**
*   **XOR Properties:** Utilize the properties of XOR to first isolate the XOR sum of the two unique numbers, then use a distinguishing bit to separate them into two groups.

### 3. Power of Two
**Problem:** Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.
**Example:**
Input: `n = 16`
Output: `true` (16 = 2^4)

**Approaches Implemented:**
*   **Loop and Divide:** Repeatedly divide by 2 until 1.
*   **Bit Manipulation:** Leverage the property that a power of two has exactly one '1' bit in its binary representation (`n > 0 && (n & (n - 1)) == 0`).

### 4. Reverse Bits
**Problem:** Reverse bits of a given 32-bit unsigned integer.
**Example:**
Input: `n = 00000010100101000001111010011100` (decimal 43261596)
Output: `00111001011110000010100101000000` (decimal 964176192)

**Approach Implemented:**
*   **Iterative Shifting:** Extract bit by bit from the original number and place it in the correct reversed position in the result.

### 5. Insert M into N (Update Bits)
**Problem:** You are given two 32-bit numbers, `N` and `M`, and two bit positions, `i` and `j`. Write a method to insert `M` into `N` such that `M` starts at bit `j` and ends at bit `i`. You can assume that `j` is greater than or equal to `i`, and that `M` will fit within the bits `j` through `i`.
**Example:**
Input: `N = 10000000000_2` (1024 decimal), `M = 10011_2` (19 decimal), `i = 2`, `j = 6`
Output: `10001001100_2` (1100 decimal)

**Approach Implemented:**
*   **Clear and Set:** Create a mask to clear the target bits in `N`, then left-shift `M` to align it and OR with `N`.

---

## Project Structure

```
bit_manipulation_project/
├── src/
│   ├── bit_manipulation.h         // Function declarations for algorithms
│   ├── bit_manipulation.cpp       // Main algorithm implementations (solutions to problems)
│   ├── utils.h                    // Helper functions (e.g., toBinaryString) and a lightweight test framework
│   └── utils.cpp                  // Helper function implementations
├── tests/
│   └── test_bit_manipulation.cpp  // Unit tests for all implemented algorithms
├── docs/
│   ├── README.md                  // Project overview, problem descriptions (this file)
│   ├── algorithms.md              // Detailed explanations of bitwise operators and algorithms with ASCII diagrams
│   ├── edge_cases.md              // Common edge cases, signed/unsigned considerations, and gotchas
│   └── interview_tips.md          // Strategies for approaching bit manipulation problems in interviews
├── benchmarks/
│   └── benchmark.cpp              // Code for performance comparison of different approaches
└── Makefile                       // For easy compilation and execution
```

---

## How to Compile and Run

This project uses a simple `Makefile` for compilation.

1.  **Navigate to the project root:**
    ```bash
    cd bit_manipulation_project
    ```

2.  **Compile the entire project (executables for tests and benchmarks):**
    ```bash
    make
    ```
    This will create `tests/run_tests` and `benchmarks/run_benchmarks` executables.

3.  **Run the unit tests:**
    ```bash
    ./tests/run_tests
    ```

4.  **Run the performance benchmarks:**
    ```bash
    ./benchmarks/run_benchmarks
    ```

5.  **Clean compiled files:**
    ```bash
    make clean
    ```

---

## Documentation Links

For deeper insights into the algorithms, edge cases, and interview strategies, refer to the following documents:

*   **[Algorithms Explanation (algorithms.md)](docs/algorithms.md)**: Detailed breakdown of each problem's solution, underlying bitwise concepts, and visual diagrams.
*   **[Edge Cases and Gotchas (edge_cases.md)](docs/edge_cases.md)**: Important considerations like signed vs. unsigned integers, specific bit patterns, and common pitfalls.
*   **[Interview Tips and Variations (interview_tips.md)](docs/interview_tips.md)**: Advice on how to approach bit manipulation problems in an interview setting, questions to ask, and common problem variations.
```