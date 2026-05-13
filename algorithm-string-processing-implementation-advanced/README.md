```markdown
# String Manipulation Coding Interview Project

This project provides a comprehensive set of problems and solutions for String Manipulation, commonly encountered in coding interviews. It includes multiple algorithmic approaches, detailed complexity analysis, extensive test cases, performance benchmarking, and thorough documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
3.  [Problems Covered](#problems-covered)
    *   [1. Longest Palindromic Substring](#1-longest-palindromic-substring)
    *   [2. String Permutations](#2-string-permutations)
    *   [3. Anagram Checker](#3-anagram-checker)
    *   [4. Minimum Window Substring](#4-minimum-window-substring)
4.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Edge Cases and Gotchas](#edge-cases-and-gotchas)
    *   [Interview Tips and Variations](#interview-tips-and-variations)

---

## Project Structure

```
string-manipulation-project/
├── pom.xml                     # Maven Project Object Model
├── README.md                   # Project README
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── stringmanipulation/
│   │   │               ├── benchmarks/
│   │   │               │   └── PerformanceBenchmarker.java  # JMH Benchmarking code
│   │   │               └── problems/
│   │   │                   ├── AnagramChecker.java          # Problem solutions
│   │   │                   ├── LongestPalindromicSubstring.java
│   │   │                   ├── MinimumWindowSubstring.java
│   │   │                   ├── StringManipulationUtils.java # Helper utilities
│   │   │                   └── StringPermutations.java
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── stringmanipulation/
│                       └── problems/
│                           ├── AnagramCheckerTest.java      # JUnit 5 Test files
│                           ├── LongestPalindromicSubstringTest.java
│                           ├── MinimumWindowSubstringTest.java
│                           └── StringPermutationsTest.java
└── docs/
    ├── algorithm_explanations.md  # Detailed algorithm descriptions
    ├── edge_cases_gotchas.md      # Common pitfalls and edge cases
    └── interview_tips_variations.md # Interview advice and problem variations
```

---

## Getting Started

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven 3.6.0 or higher

### Building the Project

Navigate to the project's root directory (`string-manipulation-project/`) in your terminal and run:

```bash
mvn clean install
```

This command compiles the source code, runs the tests, and packages the project into a JAR file.

### Running Tests

To run all JUnit tests:

```bash
mvn test
```

### Running Benchmarks

The project uses JMH (Java Microbenchmark Harness) for performance benchmarking.
To run the benchmarks, execute the following command from the project root:

```bash
mvn exec:java
```

This will compile and run the `PerformanceBenchmarker` class, which will output detailed performance metrics for various algorithm implementations. Benchmarking can take a few minutes.

---

## Problems Covered

Each problem below includes multiple approaches, from brute force to optimized solutions, along with comments explaining the logic and complexity analysis.

### 1. Longest Palindromic Substring

**Problem Description:**
Given a string `s`, find the longest palindromic substring in `s`. You may assume that the maximum length of `s` is 1000.

**Examples:**
*   Input: `s = "babad"`
    Output: `"bab"` (or `"aba"`)
*   Input: `s = "cbbd"`
    Output: `"bb"`
*   Input: `s = "a"`
    Output: `"a"`
*   Input: `s = "ac"`
    Output: `"a"`

**File:** `src/main/java/com/example/stringmanipulation/problems/LongestPalindromicSubstring.java`
**Test File:** `src/test/java/com/example/stringmanipulation/problems/LongestPalindromicSubstringTest.java`

### 2. String Permutations

**Problem Description:**
Given a string `s`, return all possible distinct permutations of the string. You may return the answer in any order.

**Examples:**
*   Input: `s = "abc"`
    Output: `["abc", "acb", "bac", "bca", "cab", "cba"]`
*   Input: `s = "aab"`
    Output: `["aab", "aba", "baa"]`

**File:** `src/main/java/com/example/stringmanipulation/problems/StringPermutations.java`
**Test File:** `src/test/java/com/example/stringmanipulation/problems/StringPermutationsTest.java`

### 3. Anagram Checker

**Problem Description:**
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Examples:**
*   Input: `s = "anagram"`, `t = "nagaram"`
    Output: `true`
*   Input: `s = "rat"`, `t = "car"`
    Output: `false`
*   Input: `s = "listen"`, `t = "silent"`
    Output: `true`

**File:** `src/main/java/com/example/stringmanipulation/problems/AnagramChecker.java`
**Test File:** `src/test/java/com/example/stringmanipulation/problems/AnagramCheckerTest.java`

### 4. Minimum Window Substring

**Problem Description:**
Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return an empty string `""`.

**Examples:**
*   Input: `s = "ADOBECODEBANC"`, `t = "ABC"`
    Output: `"BANC"`
*   Input: `s = "a"`, `t = "a"`
    Output: `"a"`
*   Input: `s = "a"`, `t = "aa"`
    Output: `""`

**File:** `src/main/java/com/example/stringmanipulation/problems/MinimumWindowSubstring.java`
**Test File:** `src/test/java/com/example/stringmanipulation/problems/MinimumWindowSubstringTest.java`

---

## Documentation

The `docs/` directory contains detailed explanations and interview-specific advice:

### Algorithm Explanations

*   **File:** `docs/algorithm_explanations.md`
*   Provides high-level overviews, logic, and complexity discussions for the main algorithms used in this project. Includes ASCII diagrams for better understanding.

### Edge Cases and Gotchas

*   **File:** `docs/edge_cases_gotchas.md`
*   Details common edge cases, potential pitfalls, and considerations for each problem (e.g., empty strings, null inputs, character sets, performance for large inputs, handling duplicates).

### Interview Tips and Variations

*   **File:** `docs/interview_tips_variations.md`
*   Offers general advice for string manipulation interviews, common follow-up questions, and variations of the problems presented. Discusses how to choose the optimal approach and communicate your thought process effectively.
```