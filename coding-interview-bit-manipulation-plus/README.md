```markdown
# Bit Manipulation Interview Project

This project serves as a comprehensive resource for mastering bit manipulation techniques, crucial for coding interviews. It covers several common problems, providing optimal solutions, alternative approaches, detailed explanations, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Setup](#setup)
4.  [Problems Covered](#problems-covered)
    *   [1. Counting Set Bits (Hamming Weight)](#1-counting-set-bits-hamming-weight)
    *   [2. Single Number](#2-single-number)
    *   [3. Power of Two](#3-power-of-two)
    *   [4. Reverse Bits](#4-reverse-bits)
    *   [5. Bit Utilities](#5-bit-utilities)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
8.  [File Structure](#file-structure)
9.  [Contributing](#contributing)
10. [License](#license)

## Project Overview

Bit manipulation is a fundamental skill in computer science, often appearing in technical interviews due to its efficiency and elegance. This project aims to equip developers with a solid understanding and practical experience in this domain. It's designed to be a complete package, from code implementation to detailed theoretical explanations.

## Features

*   **Multiple Problems**: Tackles common bit manipulation problems.
*   **Optimal Solutions**: Provides the most efficient algorithms.
*   **Alternative Approaches**: Explores different ways to solve problems, including brute-force vs. optimized.
*   **Detailed Comments**: Code is heavily commented for clarity.
*   **Time/Space Complexity Analysis**: Each solution includes its complexity.
*   **Comprehensive Test Suite**: Jest-based tests with various edge cases.
*   **Performance Benchmarking**: Compares different approaches' runtime.
*   **In-depth Documentation**: `ALGORITHM_EXPLANATIONS.md` covers concepts, logic, ASCII diagrams, edge cases, and interview tips.
*   **TypeScript**: Implemented in TypeScript for type safety and modern JavaScript features.

## Setup

To get this project up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bit-manipulation-interview.git
    cd bit-manipulation-interview
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install TypeScript, Jest, ts-node, and their respective type definitions.

## Problems Covered

### 1. Counting Set Bits (Hamming Weight)

Given an unsigned integer, count the number of '1' bits it has (also known as the Hamming weight).

*   **Approaches**: Simple iteration, Brian Kernighan's algorithm.

### 2. Single Number

Given a non-empty array of integers, every element appears twice except for one. Find that single one.

*   **Approaches**: XOR-based solution, Hash Map (alternative, less optimal).

### 3. Power of Two

Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.

*   **Approaches**: Bitwise AND trick, Iterative division (alternative).

### 4. Reverse Bits

Reverse bits of a given 32-bit unsigned integer.

*   **Approaches**: Iterative shifting and combining.

### 5. Bit Utilities

A set of general helper functions for common bit operations.

*   `getBit(num, i)`: Gets the bit at a specific position.
*   `setBit(num, i)`: Sets the bit at a specific position to 1.
*   `clearBit(num, i)`: Clears the bit at a specific position to 0.
*   `updateBit(num, i, bitValue)`: Updates the bit at a specific position.

## Running Tests

To run the entire test suite:

```bash
npm test
```

To run tests in watch mode (reruns tests on file changes):

```bash
npm test:watch
```

## Running Benchmarks

To execute the performance benchmarks comparing different algorithm approaches:

```bash
npm run benchmark
```

## Documentation

The `ALGORITHM_EXPLANATIONS.md` file contains detailed discussions for each problem, including:

*   Problem statement
*   Detailed logic explanation
*   Step-by-step examples with ASCII diagrams
*   Edge cases and common pitfalls
*   Interview tips and variations for each problem
*   General bit manipulation concepts

It's highly recommended to read through this document to fully grasp the concepts and solutions.

## File Structure

```
.
├── src/
│   ├── bitManipulation.ts          # Core algorithm implementations
│   └── bitUtils.ts                 # Reusable bit manipulation helpers
├── tests/
│   ├── bitManipulation.test.ts     # Tests for main algorithms
│   └── bitUtils.test.ts            # Tests for bit utilities
├── benchmarks/
│   └── benchmark.ts                # Performance comparison script
├── ALGORITHM_EXPLANATIONS.md       # In-depth theoretical explanations
├── README.md                       # Project overview and instructions
├── package.json                    # Project metadata and dependencies
└── tsconfig.json                   # TypeScript compiler settings
```

## Contributing

Feel free to contribute to this project by:

*   Adding more bit manipulation problems.
*   Suggesting alternative solutions or optimizations.
*   Improving explanations or diagrams.
*   Adding more comprehensive test cases.

Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (not included in this output, but generally good practice).

```