```markdown
# Bit Manipulation Interview Project

This project is designed to be a comprehensive resource for mastering Bit Manipulation problems commonly encountered in technical interviews. It covers several fundamental problems, offering multiple solution approaches, detailed explanations, complexity analysis, extensive test cases, and performance benchmarking.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Problem Descriptions](#problem-descriptions)
    *   [1. Count Set Bits (Hamming Weight)](#1-count-set-bits-hamming-weight)
    *   [2. Single Number](#2-single-number)
    *   [3. Reverse Bits](#3-reverse-bits)
    *   [4. Power of Two](#4-power-of-two)
    *   [5. Insert M into N (Update Bits)](#5-insert-m-into-n-update-bits)
4.  [How to Run](#how-to-run)
    *   [Prerequisites](#prerequisites)
    *   [Build and Test](#build-and-test)
    *   [Run Performance Benchmarks](#run-performance-benchmarks)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)
7.  [License](#license)

## Introduction

Bit manipulation is a powerful technique for optimizing algorithms, especially in competitive programming and low-level system design. It leverages the underlying binary representation of numbers to perform operations efficiently. This project aims to solidify understanding of common bitwise tricks and their applications.

## Project Structure

```
bit-manipulation-interview-project/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── bitmanipulation/
│                   ├── algorithms/
│                   │   ├── BitManipulationAlgorithms.java     // Core problem solutions
│                   │   └── BitUtils.java                      // Helper utilities for bit ops
│                   └── performance/
│                       └── PerformanceBenchmarker.java        // Benchmarking code
├── src/
│   └── test/
│       └── java/
│           └── com/
│               └── bitmanipulation/
│                   └── algorithms/
│                       └── BitManipulationAlgorithmsTest.java // Test cases
├── README.md
├── AlgorithmExplanation.md
├── .gitignore
├── pom.xml
```

## Problem Descriptions

### 1. Count Set Bits (Hamming Weight)

**Problem:** Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Example:**
Input: `00000000000000000000000000001011` (decimal 11)
Output: `3`

**Approaches Implemented:**
*   **Loop and Check LSB:** Iteratively checks the least significant bit.
*   **Brian Kernighan's Algorithm:** Efficiently turns off the rightmost set bit.
*   **Lookup Table:** Precomputes results for small chunks of bits (e.g., 8-bit bytes) and sums them up.
*   **Java API:** Uses `Integer.bitCount()`.

### 2. Single Number

**Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.

**Constraint:** Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

**Example:**
Input: `[2, 2, 1]`
Output: `1`

**Approach Implemented:**
*   **XOR Property:** Utilizes the property `A ^ A = 0` and `A ^ 0 = A`.

### 3. Reverse Bits

**Problem:** Reverse bits of a given 32-bit unsigned integer.

**Example:**
Input: `00000010100101000001111010011100` (decimal `43261596`)
Output: `00111001011110000010100101000000` (decimal `964176192`)

**Approach Implemented:**
*   **Bit Shifting and Masking:** Iteratively extracts the LSB and places it at the MSB position, shifting the result.

### 4. Power of Two

**Problem:** Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Examples:**
*   Input: `n = 1` -> Output: `true` (2^0)
*   Input: `n = 16` -> Output: `true` (2^4)
*   Input: `n = 3` -> Output: `false`

**Approaches Implemented:**
*   **Bitwise AND Trick:** `n > 0 && (n & (n - 1)) == 0`.
*   **Loop and Division:** Iteratively divides `n` by 2.

### 5. Insert M into N (Update Bits)

**Problem:** You are given two 32-bit numbers, `N` and `M`, and two bit positions, `i` and `j`. Write a method to insert `M` into `N` such that `M` starts at bit `j` and ends at bit `i`. You can assume that `M` will fit into the space between `i` and `j`.

**Example:**
Input: `N = 10000000000` (`1024` decimal), `M = 10011` (`19` decimal), `i = 2`, `j = 6`
Output: `N = 10001001100` (`1164` decimal)

**Approach Implemented:**
*   **Masking and ORing:** Clear the target bits in `N` using a mask, then `OR` the shifted `M` into `N`.

## How to Run

This project uses Maven for dependency management and building.

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven 3.6.3 or higher

### Build and Test

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/bit-manipulation-interview-project.git
    cd bit-manipulation-interview-project
    ```
2.  **Compile the project:**
    ```bash
    mvn clean compile
    ```
3.  **Run all unit tests:**
    ```bash
    mvn test
    ```

### Run Performance Benchmarks

To run the `PerformanceBenchmarker` to compare different `countSetBits` implementations:

```bash
mvn exec:java -Dexec.mainClass="com.bitmanipulation.performance.PerformanceBenchmarker"
```

You can also run it directly from your IDE by executing the `main` method in `PerformanceBenchmarker.java`.

## Documentation

*   **`AlgorithmExplanation.md`**: This file provides in-depth explanations of core bitwise operations, common bit manipulation patterns, the logic behind each problem's optimal solution, ASCII diagrams, edge cases, and interview tips. It's an essential read for understanding the concepts.

## Contributing

Feel free to open issues or submit pull requests to improve the project, add more problems, or refine explanations.

## License

This project is open-sourced under the MIT License. See the LICENSE file for details (though not explicitly created here, it's common practice).
```