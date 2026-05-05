# Hash Table Coding Interview Project

This project is a comprehensive resource for mastering Hash Tables, a fundamental data structure for coding interviews. It provides a structured approach to understanding, implementing, and optimizing solutions using hash tables (specifically `std::unordered_map` and `std::unordered_set` in C++).

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Problem Statements](#problem-statements)
4.  [Building and Running](#building-and-running)
    *   [Prerequisites](#prerequisites)
    *   [Compile and Run Tests](#compile-and-run-tests)
    *   [Compile and Run Benchmarks](#compile-and-run-benchmarks)
5.  [Documentation](#documentation)
6.  [License](#license)

## Introduction

Hash tables are essential for efficient data retrieval, insertion, and deletion operations, typically offering average O(1) time complexity. This project covers:
*   **Core Concepts**: Understanding hash functions, collision resolution, and load factors.
*   **Practical Problems**: Solving common interview questions using hash tables.
*   **Performance Analysis**: Comparing optimal hash table solutions against brute-force or less optimized approaches.
*   **Robust Testing**: Ensuring correctness with a wide range of test cases.
*   **Detailed Documentation**: Explaining algorithms, edge cases, and interview strategies.

## Project Structure

*   `src/`: Contains the C++ source code for problem solutions and utilities.
    *   `main_problems.cpp`: Implementation of all hash table problems, including optimal and alternative approaches.
    *   `utils.hpp`: Helper functions (e.g., for printing vectors, comparing data structures).
*   `tests/`: Contains the C++ test suite.
    *   `test_problems.cpp`: Comprehensive test cases for each problem.
*   `benchmarks/`: Contains C++ code for performance measurement.
    *   `benchmark.cpp`: Compares the execution time of different solutions (e.g., hash table vs. brute force).
*   `docs/`: Contains detailed markdown documentation.
    *   `hash_tables_deep_dive.md`: In-depth explanation of hash tables, `unordered_map`/`unordered_set`, and algorithm walkthroughs.
    *   `edge_cases_and_gotchas.md`: A guide to common pitfalls and important edge cases.
    *   `interview_tips.md`: Strategies for approaching hash table problems in interviews, including common questions and variations.
*   `README.md`: This file.

## Problem Statements

This project addresses the following common hash table interview problems:

### 1. Two Sum
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:**
Input: `nums = [2, 7, 11, 15]`, `target = 9`
Output: `[0, 1]`
Explanation: Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

### 2. Longest Consecutive Sequence
Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
Your algorithm should run in `O(n)` time.

**Example:**
Input: `nums = [100, 4, 200, 1, 3, 2]`
Output: `4`
Explanation: The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.

### 3. Group Anagrams
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example:**
Input: `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
Output: `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`

### 4. First Unique Character in a String
Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.

**Example:**
Input: `s = "leetcode"`
Output: `0`
Explanation: 'l' is the first unique character at index 0.

Input: `s = "loveleetcode"`
Output: `2`
Explanation: 'v' is the first unique character at index 2.

### 5. Contains Duplicate
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

**Example:**
Input: `nums = [1, 2, 3, 1]`
Output: `true`

Input: `nums = [1, 2, 3, 4]`
Output: `false`

## Building and Running

### Prerequisites
You need a C++ compiler (e.g., g++).

### Compile and Run Tests
Navigate to the project root and execute the following commands:

```bash
g++ -std=c++17 -Wall -Wextra tests/test_problems.cpp src/main_problems.cpp src/utils.hpp -o test_runner
./test_runner
```

Expected output will indicate `PASSED` or `FAILED` for each test suite.

### Compile and Run Benchmarks
Navigate to the project root and execute the following commands:

```bash
g++ -std=c++17 -Wall -Wextra benchmarks/benchmark.cpp src/main_problems.cpp src/utils.hpp -o benchmark_runner
./benchmark_runner
```

Expected output will show execution times for different algorithms and input sizes.

## Documentation

Explore the `docs/` directory for in-depth explanations:

*   **`docs/hash_tables_deep_dive.md`**: Understand the mechanics of hash tables, `unordered_map`, `unordered_set`, and detailed algorithmic breakdowns.
*   **`docs/edge_cases_and_gotchas.md`**: Learn about common pitfalls, performance considerations, and tricky scenarios to watch out for.
*   **`docs/interview_tips.md`**: Get advice on how to approach hash table problems in an interview setting, including questions to ask and variations to expect.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details.

---