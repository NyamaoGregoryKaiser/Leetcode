# Bit Manipulation Coding Interview Project

This project provides a comprehensive set of problems, solutions, tests, benchmarks, and documentation for bit manipulation, a common topic in coding interviews. It's designed to help you master bitwise operations and approach related problems effectively.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup and Installation](#setup-and-installation)
3.  [Problem Descriptions](#problem-descriptions)
    *   [1. Count Set Bits (Hamming Weight)](#1-count-set-bits-hamming-weight)
    *   [2. Power of Two](#2-power-of-two)
    *   [3. Reverse Bits](#3-reverse-bits)
    *   [4. Single Number](#4-single-number)
    *   [5. Insert M into N](#5-insert-m-into-n)
4.  [How to Run Tests](#how-to-run-tests)
5.  [How to Run Benchmarks](#how-to-run-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)

## Project Structure

```
bit_manipulation_project/
├── src/
│   ├── algorithms.py               # Main algorithms with multiple approaches
│   └── __init__.py
├── tests/
│   ├── test_algorithms.py          # Extensive test cases using pytest
│   └── __init__.py
├── docs/
│   ├── README.md                   # Project overview, setup, and problem descriptions (YOU ARE HERE)
│   ├── algorithm_explanation.md    # Detailed logic, ASCII diagrams, edge cases
│   └── interview_tips.md           # Interview strategies, variations, common gotchas
├── benchmarks/
│   ├── benchmark_algorithms.py     # Performance comparison of different solutions
│   └── __init__.py
├── utils/
│   ├── bit_visualizer.py           # Helper for visualizing binary representations
│   └── __init__.py
└── requirements.txt                # Project dependencies
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bit_manipulation_project.git
    cd bit_manipulation_project
    ```
    (Note: Replace `https://github.com/your-username/bit_manipulation_project.git` with your actual repo URL if you host this project).

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows: `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Problem Descriptions

This section outlines the problems implemented in `src/algorithms.py`. For detailed explanations of the algorithms, complexity analysis, and more, refer to `docs/algorithm_explanation.md`.

---

### 1. Count Set Bits (Hamming Weight)

**Problem Statement:**
Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Example:**
Input: `n = 00000000000000000000000000001011` (decimal 11)
Output: `3` (because there are three '1' bits)

**Approaches Implemented:**
*   **Approach 1:** Iterating through bits (Right Shift and AND)
*   **Approach 2:** Brian Kernighan's Algorithm (Optimal)

---

### 2. Power of Two

**Problem Statement:**
Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.
An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.

**Examples:**
*   Input: `n = 1` -> Output: `true` (2^0)
*   Input: `n = 16` -> Output: `true` (2^4)
*   Input: `n = 3` -> Output: `false`

**Approaches Implemented:**
*   **Approach 1:** Loop and Divide
*   **Approach 2:** Bit Manipulation (`n > 0 and (n & (n - 1)) == 0`) (Optimal)

---

### 3. Reverse Bits

**Problem Statement:**
Reverse the bits of a given 32-bit unsigned integer.

**Example:**
Input: `n = 00000010100101000001111010011100` (decimal 43261596)
Output: `00111001011110000010100101000000` (decimal 964176192)

**Approaches Implemented:**
*   **Approach 1:** Iterative Shifting and Building (Most common in interviews)
*   *(Approach 2: Optimized Swapping using masks for fixed-size ints is discussed in documentation but not fully generalized in code for clarity)*

---

### 4. Single Number

**Problem Statement:**
Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.

**Constraints:**
*   The array is non-empty.
*   Every element appears twice except for one.

**Examples:**
*   Input: `nums = [2, 2, 1]` -> Output: `1`
*   Input: `nums = [4, 1, 2, 1, 2]` -> Output: `4`

**Approaches Implemented:**
*   **Approach 1:** Hash Map (Brute Force / Common non-bit approach)
*   **Approach 2:** Bit Manipulation (XOR Property) (Optimal)

---

### 5. Insert M into N

**Problem Statement:**
Given two 32-bit (or `num_bits`) numbers, `N` and `M`, and two bit positions, `i` and `j`. Write a method to insert `M` into `N` such that `M` starts at bit `j` and ends at bit `i`. Assume that bits `j` through `i` have enough space to fit `M`. Bits are 0-indexed, with bit 0 being the least significant bit.

**Example:**
*   `N = 10000000000_2` (decimal 1024)
*   `M = 10011_2` (decimal 19)
*   `i = 2`
*   `j = 6`
*   Result: `N` becomes `10001001100_2` (decimal 1164)

**Approach Implemented:**
*   **Single Optimal Approach:** Clear bits in `N` using a mask, then OR with `M` shifted to its target position.

---

## How to Run Tests

Ensure you have activated your virtual environment and installed dependencies.

To run all tests:
```bash
pytest
```

To run tests with verbose output:
```bash
pytest -v
```

To run a specific test file:
```bash
pytest tests/test_algorithms.py
```

## How to Run Benchmarks

The benchmarks compare the performance of different approaches for each problem.

To run all benchmarks:
```bash
pytest --benchmark-columns='mean,stddev,rounds,min,max' --benchmark-sort=mean benchmarks/benchmark_algorithms.py
```
*   `--benchmark-columns`: Specifies which columns to show in the benchmark report.
*   `--benchmark-sort`: Sorts the results by a given column.

## Documentation

*   **`docs/algorithm_explanation.md`**: Provides in-depth explanations of the logic behind each algorithm, including visual ASCII diagrams for bit manipulations, detailed time and space complexity analysis, and discussions of edge cases and potential "gotchas."
*   **`docs/interview_tips.md`**: Offers general advice for approaching bit manipulation questions in interviews, common patterns, variations of the problems, and strategies for demonstrating your understanding.

## Contributing

Feel free to fork this repository, add more problems, optimize existing solutions, improve documentation, or extend test cases. Pull requests are welcome!