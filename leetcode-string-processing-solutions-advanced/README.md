```markdown
# String Manipulation Interview Project

This project serves as a comprehensive resource for preparing for coding interviews focused on String Manipulation problems. It includes multiple common interview questions, each with optimal solutions, alternative approaches, detailed complexity analysis, extensive test cases, performance benchmarks, and in-depth documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Use](#how-to-use)
3.  [Problem Descriptions](#problem-descriptions)
    *   [1. Longest Palindromic Substring](#1-longest-palindromic-substring)
    *   [2. Minimum Window Substring](#2-minimum-window-substring)
    *   [3. Group Anagrams](#3-group-anagrams)
    *   [4. String to Integer (atoi)](#4-string-to-integer-atoi)
4.  [Performance Benchmarking](#performance-benchmarking)
5.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Interview Tips & Variations](#interview-tips--variations)

## Project Structure

```
string-manipulation-interview/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── stringmanipulation/
│   │                   ├── problems/                   # Core algorithm implementations
│   │                   │   ├── GroupAnagrams.java
│   │                   │   ├── LongestPalindromicSubstring.java
│   │                   │   ├── MinimumWindowSubstring.java
│   │                   │   └── StringToIntegerAtoi.java
│   │                   ├── utils/                      # Utility classes, e.g., for benchmarking
│   │                   │   └── PerformanceBenchmark.java
│   │                   └── MainApp.java                # Entry point for running examples/benchmarks
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── stringmanipulation/
│                       ├── GroupAnagramsTest.java
│                       ├── LongestPalindromicSubstringTest.java
│                       ├── MinimumWindowSubstringTest.java
│                       └── StringToIntegerAtoiTest.java
├── docs/                               # Detailed documentation files
│   ├── Algorithms.md                   # In-depth algorithm explanations, diagrams, edge cases
│   └── InterviewTips.md                # General interview advice and problem variations
├── README.md                           # This file
└── pom.xml                             # Maven project configuration
```

## How to Use

This project is built with Maven.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/string-manipulation-interview.git
    cd string-manipulation-interview
    ```

2.  **Compile the project:**
    ```bash
    mvn clean install
    ```

3.  **Run Tests:**
    To execute all JUnit 5 test cases:
    ```bash
    mvn test
    ```

4.  **Run Main Application (Examples & Benchmarks):**
    The `MainApp.java` file demonstrates how to use the implemented algorithms and runs performance benchmarks.
    ```bash
    mvn exec:java -Dexec.mainClass="com.example.stringmanipulation.MainApp"
    ```
    Alternatively, after `mvn install`, you can run the generated JAR:
    ```bash
    java -jar target/string-manipulation-interview-1.0-SNAPSHOT.jar
    ```

## Problem Descriptions

### 1. Longest Palindromic Substring

**Problem:** Given a string `s`, return the longest palindromic substring in `s`.

**Examples:**
*   Input: `s = "babad"`
    Output: `"bab"` (or `"aba"`)
*   Input: `s = "cbbd"`
    Output: `"bb"`
*   Input: `s = "a"`
    Output: `"a"`

**Constraints:**
*   `1 <= s.length <= 1000`
*   `s` consists of only digits and English letters.

**Implemented Approaches:**
*   **Expand Around Center:** Iterates through each character (and between characters) as a potential center of a palindrome and expands outwards.
*   **Dynamic Programming:** Builds a `dp` table where `dp[i][j]` is true if `s[i...j]` is a palindrome.

### 2. Minimum Window Substring

**Problem:** Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return an empty string `""`.

**Examples:**
*   Input: `s = "ADOBECODEBANC", t = "ABC"`
    Output: `"BANC"`
*   Input: `s = "a", t = "a"`
    Output: `"a"`
*   Input: `s = "a", t = "aa"`
    Output: `""`

**Constraints:**
*   `m == s.length`
*   `n == t.length`
*   `1 <= m, n <= 10^5`
*   `s` and `t` consist of uppercase and lowercase English letters.

**Implemented Approach:**
*   **Sliding Window with Two Pointers:** Uses a hash map to keep track of character counts in `t` and in the current window, expanding the right pointer and contracting the left pointer.

### 3. Group Anagrams

**Problem:** Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Examples:**
*   Input: `strs = ["eat","tea","tan","ate","nat","bat"]`
    Output: `[["bat"],["nat","tan"],["ate","eat","tea"]]`
*   Input: `strs = [""]`
    Output: `[[""]]`
*   Input: `strs = ["a"]`
    Output: `[["a"]]`

**Constraints:**
*   `1 <= strs.length <= 10^4`
*   `0 <= strs[i].length <= 100`
*   `strs[i]` consists of lowercase English letters.

**Implemented Approaches:**
*   **Sorting Characters (Optimal):** Uses a hash map where the key is the sorted version of the string, and the value is a list of anagrams.
*   **Character Count Array (Optimal Alternative):** Uses a hash map where the key is a string representation of a character frequency count array.

### 4. String to Integer (atoi)

**Problem:** Implement the `myAtoi(String s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function). The algorithm should parse the string, ignoring leading whitespace, handle an optional sign, and convert subsequent digits. It must also handle non-digit characters, overflow/underflow conditions, and return `0` if no valid conversion can be performed.

**Examples:**
*   Input: `s = "42"`
    Output: `42`
*   Input: `s = "   -42"`
    Output: `-42`
*   Input: `s = "4193 with words"`
    Output: `4193`
*   Input: `s = "words and 987"`
    Output: `0`
*   Input: `s = "-91283472332"`
    Output: `-2147483648` (INT_MIN)

**Constraints:**
*   `0 <= s.length <= 200`
*   `s` consists of English letters (lower-case and upper-case), digits (`0-9`), `'+'`, `'-'`, and `' '`.

**Implemented Approach:**
*   **Iterative Parsing with State Management:** A single pass algorithm that handles whitespace, sign, digit accumulation, and overflow detection step-by-step.

## Performance Benchmarking

The `com.example.stringmanipulation.utils.PerformanceBenchmark` class provides methods to measure the execution time of different algorithm implementations.
Run `MainApp.java` to see the benchmark results printed to the console. This helps in understanding the real-world performance differences between different approaches, especially for larger inputs.

## Documentation

### Algorithm Explanations

The `docs/Algorithms.md` file contains detailed explanations for each problem's optimal solution, including:
*   Step-by-step logic walkthroughs.
*   ASCII art diagrams to visualize concepts like "Expand Around Center" or "Sliding Window".
*   In-depth analysis of time and space complexity.
*   Discussion of edge cases and common pitfalls.

### Interview Tips & Variations

The `docs/InterviewTips.md` file offers general advice for string manipulation interviews, including:
*   Common string manipulation techniques.
*   How to approach different problem types.
*   Strategies for handling edge cases (null, empty strings, unusual characters).
*   Potential variations or follow-up questions for the implemented problems.

---

Feel free to explore the code, run tests, and consult the documentation to deepen your understanding of these critical string manipulation algorithms. Good luck with your interviews!
```