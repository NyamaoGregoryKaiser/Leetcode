```markdown
# String Manipulation Coding Interview Project

This project provides a comprehensive set of String Manipulation problems, designed to help prepare for coding interviews. It includes multiple solutions for each problem (covering brute force to optimal), detailed explanations, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Problems Covered](#problems-covered)
3.  [Setup and Installation](#setup-and-installation)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Project Structure](#project-structure)
8.  [License](#license)

---

## 1. Project Overview

The goal of this project is to create a robust practice environment for common string manipulation algorithms. Each problem comes with:

*   **Multiple Approaches**: Demonstrating different algorithmic strategies (e.g., Dynamic Programming, Two Pointers, Hash Maps, Sliding Window).
*   **Optimal Solutions**: Focusing on the most efficient time and space complexity.
*   **Detailed Code Comments**: Explaining the logic step-by-step.
*   **Time & Space Complexity Analysis**: For each solution.
*   **Extensive Test Cases**: Covering happy paths, edge cases, and invalid inputs.
*   **Performance Benchmarking**: To compare the real-world speed of different solutions.
*   **In-depth Documentation**: Explaining algorithms, common pitfalls, and interview tips.

## 2. Problems Covered

Here are the String Manipulation problems included in this project:

### 1. Longest Palindromic Substring

Given a string `s`, return *the longest palindromic substring* in `s`.

*   **Approach 1**: Expand Around Center
*   **Approach 2**: Dynamic Programming

### 2. Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

*   **Approach 1**: Sort String as Key
*   **Approach 2**: Character Count as Key

### 3. Minimum Window Substring

Given two strings `s` and `t` of lengths `m` and `n` respectively, return *the minimum window substring* of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return an empty string `""`.

*   **Approach**: Sliding Window

### 4. String to Integer (atoi)

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function). The algorithm for `myAtoi(string s)` is as follows:

1.  Read in and ignore any leading whitespace.
2.  Check if the next character is `'-'` or `'+'`. Read this character in if it is either. This determines the sign.
3.  Read in the next characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4.  Convert these digits into an integer. If no digits were read, the integer is `0`.
5.  If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer to stay within the range. Specifically, integers less than `-2^31` should be clamped to `-2^31`, and integers greater than `2^31 - 1` should be clamped to `2^31 - 1`.
6.  Return the integer as the final result.

*   **Approach**: Iterative Parsing with Edge Case Handling

## 3. Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/string-manipulation-project.git
    cd string-manipulation-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the project (compile TypeScript to JavaScript):**
    ```bash
    npm run build
    ```

## 4. Running Tests

This project uses `Jest` for testing.

To run all tests:
```bash
npm test
```

To run a specific test file (e.g., `longestPalindromicSubstring.test.ts`):
```bash
jest tests/longestPalindromicSubstring.test.ts
```

## 5. Running Benchmarks

A separate benchmarking script is provided to compare the performance of different solutions and algorithms with large inputs.

To run the benchmarks:
```bash
npm run benchmark
```

The output will show the execution time for each algorithm and approach.

## 6. Documentation

Detailed documentation for each problem, including algorithm explanations, visual diagrams (ASCII art), edge cases, and interview tips, can be found in `docs/ALGORITHMS.md`.

## 7. Project Structure

```
.
├── src/                          # Source code for algorithms and utilities
│   ├── algorithms/               # Main algorithm implementations
│   │   ├── longestPalindromicSubstring.ts
│   │   ├── groupAnagrams.ts
│   │   ├── minWindowSubstring.ts
│   │   ├── myAtoi.ts
│   │   └── index.ts              # Exports all algorithm functions
│   ├── utils/                    # Helper utilities (Logger, PerformanceTimer)
│   │   ├── logger.ts
│   │   ├── performanceTimer.ts
│   │   └── index.ts              # Exports all utilities
│   └── index.ts                  # Main entry point (exports from algorithms and utils)
├── tests/                        # Jest test files
│   ├── longestPalindromicSubstring.test.ts
│   ├── groupAnagrams.test.ts
│   ├── minWindowSubstring.test.ts
│   ├── myAtoi.test.ts
│   └── jest.config.js            # Jest configuration
├── benchmarks/                   # Performance benchmarking scripts
│   └── benchmark.ts
├── docs/                         # Documentation files
│   └── ALGORITHMS.md             # Detailed algorithm explanations
├── README.md                     # Project README
├── package.json                  # Node.js project configuration
├── tsconfig.json                 # TypeScript compiler configuration
└── .eslintrc.js                  # ESLint configuration
```

## 8. License

This project is licensed under the MIT License. See the `LICENSE` file for details. (Note: `LICENSE` file is not generated here, but usually would be present in a real project).
```