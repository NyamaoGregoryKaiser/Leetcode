# String Manipulation Coding Interview Project

This project is a comprehensive guide and practice ground for common string manipulation problems encountered in coding interviews. It provides multiple solutions for each problem, ranging from brute-force to optimal, along with detailed explanations, complexity analysis, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Installation](#installation)
4.  [Problems Covered](#problems-covered)
    *   [1. Reverse String](#1-reverse-string)
    *   [2. Valid Parentheses](#2-valid-parentheses)
    *   [3. Longest Substring Without Repeating Characters](#3-longest-substring-without-repeating-characters)
    *   [4. Group Anagrams](#4-group-anagrams)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [ASCII Diagrams](#ascii-diagrams)
    *   [Edge Cases & Gotchas](#edge-cases--gotchas)
    *   [Interview Tips & Variations](#interview-tips--variations)

## Introduction

String manipulation is a fundamental topic in computer science and a frequent subject in technical interviews. This project aims to equip you with the knowledge and practice necessary to tackle these problems confidently. Each problem is presented with different approaches, demonstrating trade-offs between time complexity, space complexity, and implementation simplicity.

## Project Structure

```
string-manipulation-project/
├── src/
│   ├── algorithms/                    # Main algorithm implementations
│   │   ├── groupAnagrams.js
│   │   ├── longestSubstringWithoutRepeatingCharacters.js
│   │   ├── reverseString.js
│   │   └── validParentheses.js
│   └── utils/                       # Helper utilities and custom data structures
│       └── dataStructures.js
├── tests/                           # Extensive test files for each algorithm
│   ├── groupAnagrams.test.js
│   ├── longestSubstringWithoutRepeatingCharacters.test.js
│   ├── reverseString.test.js
│   └── validParentheses.test.js
├── benchmarks/                      # Performance benchmarking code
│   └── benchmark.js
├── docs/                            # Comprehensive documentation
│   ├── algorithm_explanations.md    # Detailed algorithm logic and complexity
│   ├── ascii_diagrams.md            # Visual diagrams using ASCII art
│   ├── edge_cases_gotchas.md        # Common edge cases and pitfalls
│   └── interview_tips.md            # General interview advice and variations
├── .gitignore
├── package.json
└── README.md
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/string-manipulation-project.git
    cd string-manipulation-project
    ```
2.  **Install dependencies:**
    This project uses `jest` for testing and `benchmark` for performance comparisons.
    ```bash
    npm install
    ```

## Problems Covered

### 1. Reverse String

**Problem Description:**
Write a function that reverses a string. The input string is given as an array of characters `char[]`. Do not allocate extra space for another array. You must do this by modifying the input array in-place with `O(1)` extra memory.

**Example:**
Input: `["h","e","l","l","o"]`
Output: `["o","l","l","e","h"]`

**Solutions Provided:**
*   `reverseStringIterative(s)`: Creates a new string by iterating backwards. (Not in-place, for comparison)
*   `reverseStringTwoPointersInPlace(s)`: Optimal in-place solution using two pointers.
*   `reverseStringRecursiveInPlace(s)`: Recursive in-place solution using two pointers.

### 2. Valid Parentheses

**Problem Description:**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Example:**
Input: `"([{}])"`
Output: `true`

**Solutions Provided:**
*   `isValidParenthesesUsingArrayAsStack(s)`: Optimal solution using a JavaScript array as a stack.
*   `isValidParenthesesUsingCustomStack(s)`: Same logic, but demonstrates using a custom `Stack` data structure from `src/utils/dataStructures.js`.

### 3. Longest Substring Without Repeating Characters

**Problem Description:**
Given a string `s`, find the length of the longest substring without repeating characters.

**Example:**
Input: `"abcabcbb"`
Output: `3` (The answer is "abc", with a length of 3.)

**Solutions Provided:**
*   `lengthOfLongestSubstringBruteForce(s)`: Checks every possible substring.
*   `lengthOfLongestSubstringSlidingWindowSet(s)`: Optimal solution using a sliding window and a `Set` to track characters.
*   `lengthOfLongestSubstringSlidingWindowMap(s)`: Even more optimized sliding window using a `Map` to store character indices, allowing for direct jumps.

### 4. Group Anagrams

**Problem Description:**
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example:**
Input: `["eat","tea","tan","ate","nat","bat"]`
Output: `[["bat"],["nat","tan"],["ate","eat","tea"]]`

**Solutions Provided:**
*   `groupAnagramsSortingKey(strs)`: Optimal solution using a hash map where the key is the sorted version of the string.
*   `groupAnagramsCountingKey(strs)`: Optimal solution using a hash map where the key is a character count array/string representation.

## Running Tests

To run all tests for the project:

```bash
npm test
```

To run tests for a specific file (e.g., `reverseString`):

```bash
npm test tests/reverseString.test.js
```

## Running Benchmarks

To run the performance benchmarks comparing different algorithm approaches:

```bash
npm run benchmark
```

This will execute `benchmarks/benchmark.js` and print performance results to the console.

## Documentation

The `docs/` directory contains detailed explanations and auxiliary materials:

### Algorithm Explanations
*   `docs/algorithm_explanations.md`: In-depth discussions of the logic behind each algorithm, including step-by-step breakdowns and detailed time/space complexity analysis.

### ASCII Diagrams
*   `docs/ascii_diagrams.md`: Visual aids using ASCII art to illustrate concepts like two-pointers, sliding window, and stack operations.

### Edge Cases & Gotchas
*   `docs/edge_cases_gotchas.md`: A collection of common edge cases (empty strings, single characters, special characters, etc.) and pitfalls to watch out for in string manipulation problems.

### Interview Tips & Variations
*   `docs/interview_tips.md`: General advice for approaching coding interviews, communication strategies, and common variations/follow-up questions for string problems.

---
---