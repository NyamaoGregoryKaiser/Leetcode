```markdown
# Bit Manipulation Interview Project

This project serves as a comprehensive resource for mastering Bit Manipulation techniques, crucial for coding interviews. It provides a structured approach with multiple problems, optimal solutions in TypeScript, detailed explanations, extensive test cases, performance benchmarks, and in-depth documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Installation and Usage](#installation-and-usage)
3.  [Problems Covered](#problems-covered)
    *   [1. Count Set Bits (Hamming Weight)](#1-count-set-bits-hamming-weight)
    *   [2. Power of Two](#2-power-of-two)
    *   [3. Reverse Bits](#3-reverse-bits)
    *   [4. Single Number](#4-single-number)
    *   [5. Generate Subsets](#5-generate-subsets)
4.  [Documentation](#documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

Refer to the project structure diagram in the top-level README.md for a visual overview.

## Installation and Usage

To set up and run this project:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bit-manipulation-interview-project.git
    cd bit-manipulation-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the TypeScript code:**
    ```bash
    npm run build
    ```
4.  **Run all tests:**
    ```bash
    npm test
    ```
5.  **Run performance benchmarks:**
    ```bash
    npm run benchmark
    ```
6.  **Explore the code:**
    *   `src/algorithms`: Contains the main implementations.
    *   `src/extra`: Demonstrates alternative approaches (e.g., brute force, lookup tables).
    *   `src/utils`: Helper functions like binary string conversion.
    *   `tests`: Unit tests for algorithms and performance benchmarks.
    *   `docs`: Detailed explanations, edge cases, and interview tips.

## Problems Covered

Each problem below includes a brief description. For detailed algorithm explanations, complexity analysis, and visual diagrams, please refer to [`docs/Algorithms.md`](./docs/Algorithms.md).

### 1. Count Set Bits (Hamming Weight)

**Description:** Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Files:**
*   Implementation: [`src/algorithms/countSetBits.ts`](./src/algorithms/countSetBits.ts)
*   Tests: [`tests/algorithms/countSetBits.test.ts`](./tests/algorithms/countSetBits.test.ts)
*   Extra/Alternative: [`src/extra/bruteForceVsOptimized.ts`](./src/extra/bruteForceVsOptimized.ts), [`src/extra/lookupTables.ts`](./src/extra/lookupTables.ts)

### 2. Power of Two

**Description:** Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Files:**
*   Implementation: [`src/algorithms/isPowerOfTwo.ts`](./src/algorithms/isPowerOfTwo.ts)
*   Tests: [`tests/algorithms/isPowerOfTwo.test.ts`](./tests/algorithms/isPowerOfTwo.test.ts)
*   Extra/Alternative: [`src/extra/bruteForceVsOptimized.ts`](./src/extra/bruteForceVsOptimized.ts)

### 3. Reverse Bits

**Description:** Reverse the bits of a given 32-bit unsigned integer.

**Files:**
*   Implementation: [`src/algorithms/reverseBits.ts`](./src/algorithms/reverseBits.ts)
*   Tests: [`tests/algorithms/reverseBits.test.ts`](./tests/algorithms/reverseBits.test.ts)

### 4. Single Number

**Description:** Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

**Files:**
*   Implementation: [`src/algorithms/singleNumber.ts`](./src/algorithms/singleNumber.ts)
*   Tests: [`tests/algorithms/singleNumber.test.ts`](./tests/algorithms/singleNumber.test.ts)

### 5. Generate Subsets

**Description:** Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order. This problem demonstrates bitmasking.

**Files:**
*   Implementation: [`src/algorithms/generateSubsets.ts`](./src/algorithms/generateSubsets.ts)
*   Tests: [`tests/algorithms/generateSubsets.test.ts`](./tests/algorithms/generateSubsets.test.ts)

## Documentation

The `docs` directory contains in-depth explanations and supplementary materials:

*   [`docs/Algorithms.md`](./docs/Algorithms.md): Detailed explanations of each algorithm, including alternative approaches, visual diagrams (ASCII art), and step-by-step logic.
*   [`docs/EdgeCasesGotchas.md`](./docs/EdgeCasesGotchas.md): A guide to common pitfalls in bit manipulation, such as signed vs. unsigned integers, two's complement, overflow, and specific language considerations (e.g., JavaScript's 32-bit integer operations).
*   [`docs/InterviewTips.md`](./docs/InterviewTips.md): Practical advice for approaching bit manipulation problems in interviews, including strategies, common patterns, and potential follow-up questions.

## Contributing

Feel free to contribute by:
*   Adding more problems or alternative solutions.
*   Improving existing explanations or code.
*   Adding more comprehensive test cases.
*   Translating to other languages (while keeping TypeScript as the primary).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```