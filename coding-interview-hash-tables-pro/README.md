# Hash Table Coding Interview Project

This project provides a comprehensive set of problems focused on Hash Tables, designed to simulate and prepare for a coding interview. It includes multiple problems, various solution approaches (brute force vs. optimized), detailed explanations, test cases, performance benchmarks, and extensive documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Build and Run Instructions](#build-and-run-instructions)
3.  [Problem Statements](#problem-statements)
    *   [1. Two Sum](#1-two-sum)
    *   [2. Longest Consecutive Sequence](#2-longest-consecutive-sequence)
    *   [3. Group Anagrams](#3-group-anagrams)
    *   [4. LFU Cache](#4-lfu-cache)
4.  [Complexity Summary](#complexity-summary)
5.  [Documentation Guide](#documentation-guide)

## Project Structure

```
hash_table_interview_project/
├── README.md                           // Project overview and instructions
├── src/                                // Source code for algorithms
│   ├── group_anagrams.h                // Header for Group Anagrams
│   ├── group_anagrams.cpp              // Implementations for Group Anagrams
│   ├── longest_consecutive_sequence.h  // Header for Longest Consecutive Sequence
│   ├── longest_consecutive_sequence.cpp// Implementations for Longest Consecutive Sequence
│   ├── lfu_cache.h                     // Header for LFU Cache
│   ├── lfu_cache.cpp                   // Implementations for LFU Cache
│   ├── two_sum.h                       // Header for Two Sum
│   └── two_sum.cpp                     // Implementations for Two Sum
├── tests/                              // Unit tests for each problem
│   └── test_problems.cpp
├── benchmarks/                         // Performance benchmarking for solutions
│   └── benchmark_problems.cpp
├── docs/                               // Comprehensive documentation
│   ├── algorithm_explanation.md        // Detailed algorithm walkthroughs
│   ├── diagrams.txt                    // ASCII diagrams for data structures
│   ├── edge_cases_gotchas.md           // Common edge cases and pitfalls
│   └── interview_tips.md               // Tips for a successful interview
├── utils/                              // Utility functions (e.g., testing helpers)
│   └── test_utils.h
└── main.cpp                            // Entry point for running tests and benchmarks
```

## Build and Run Instructions

To compile and run this project, you will need a C++11 (or newer) compiler (e.g., g++).

**Manual Compilation:**

1.  **Navigate to the project root directory:**
    ```bash
    cd hash_table_interview_project
    ```

2.  **Compile all source files into an executable:**
    ```bash
    g++ -std=c++11 -O2 -Wall main.cpp \
        src/two_sum.cpp \
        src/longest_consecutive_sequence.cpp \
        src/group_anagrams.cpp \
        src/lfu_cache.cpp \
        tests/test_problems.cpp \
        benchmarks/benchmark_problems.cpp \
        -I./src -I./utils -I./tests -I./benchmarks \
        -o hash_table_project
    ```
    *   `-std=c++11`: Ensures C++11 standard is used.
    *   `-O2`: Optimization level 2 (optional, but good for benchmarks).
    *   `-Wall`: Enable all warnings.
    *   `-I./src -I./utils -I./tests -I./benchmarks`: Specifies include directories.
    *   `-o hash_table_project`: Names the output executable.

3.  **Run the executable:**
    ```bash
    ./hash_table_project
    ```
    This will execute all integrated tests and benchmarks.

## Problem Statements

### 1. Two Sum

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

**Example:**
`nums = [2, 7, 11, 15]`, `target = 9`
Output: `[0, 1]` (because `nums[0] + nums[1] == 9`)

### 2. Longest Consecutive Sequence

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.

**Example:**
`nums = [100, 4, 200, 1, 3, 2]`
Output: `4` (The longest consecutive elements sequence is `[1, 2, 3, 4]`. Its length is 4.)

### 3. Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example:**
`strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
Output: `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`

### 4. LFU Cache

Design and implement a data structure for a [Least Frequently Used (LFU) cache](https://en.wikipedia.org/wiki/Least_frequently_used).
It should support the following operations: `get` and `put`.

*   `LFUCache(capacity)`: Initializes the cache with the given positive `capacity`.
*   `int get(int key)`: Gets the value of the `key` if the `key` exists in the cache. Otherwise, returns -1.
*   `void put(int key, int value)`: Updates the value of the `key` if the `key` exists. Otherwise, adds the `key-value` pair to the cache.
    *   If the number of keys exceeds the `capacity` from this operation, evicts the least frequently used key.
    *   If there is a tie in frequency, the least recently used `key` among them should be evicted.
    *   When a `key` is accessed (`get`) or updated (`put`), its frequency count should be incremented.

## Complexity Summary

| Problem                       | Approach              | Time Complexity | Space Complexity |
| :---------------------------- | :-------------------- | :-------------- | :--------------- |
| **Two Sum**                   | Brute Force           | O(N^2)          | O(1)             |
|                               | Hash Map              | O(N)            | O(N)             |
| **Longest Consecutive Seq.**  | Sort                  | O(N log N)      | O(1) (or O(N))   |
|                               | Hash Set              | O(N)            | O(N)             |
| **Group Anagrams**            | Brute Force           | O(N^2 * M)      | O(N) (for result)|
|                               | Hash Map (Sorted Key) | O(N * M log M)  | O(N * M)         |
| **LFU Cache**                 | Get Operation         | O(1)            | O(Capacity)      |
|                               | Put Operation         | O(1)            | O(Capacity)      |

*   `N`: number of elements/strings
*   `M`: average length of strings
*   `Capacity`: max number of keys in cache

## Documentation Guide

The `docs/` directory contains detailed explanations to aid understanding and interview preparation:

*   **`algorithm_explanation.md`**: Provides in-depth discussions of each algorithm, including logic, optimal choices, and step-by-step walkthroughs.
*   **`diagrams.txt`**: Features ASCII art to visualize data structures like Hash Tables and the complex LFU Cache.
*   **`edge_cases_gotchas.md`**: Highlights common pitfalls, edge cases (e.g., empty inputs, duplicates, large numbers), and how to handle them.
*   **`interview_tips.md`**: Offers advice on how to approach hash table problems in an interview, including questions to ask, trade-offs to discuss, and variations to consider.

It's highly recommended to review these documents for a complete understanding of the project and for effective interview preparation.

---