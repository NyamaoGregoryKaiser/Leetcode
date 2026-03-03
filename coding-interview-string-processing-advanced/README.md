```markdown
# String Manipulation Interview Project

This project provides a comprehensive set of resources for practicing and understanding String Manipulation algorithms, a common topic in coding interviews. It includes multiple problems, optimal solutions, alternative approaches, detailed explanations, testing infrastructure, and performance benchmarks.

## Table of Contents

1.  [Project Setup](#project-setup)
2.  [Problems Covered](#problems-covered)
    *   [1. Valid Palindrome II](#1-valid-palindrome-ii)
    *   [2. Group Anagrams](#2-group-anagrams)
    *   [3. Longest Substring Without Repeating Characters](#3-longest-substring-without-repeating-characters)
    *   [4. String Compression](#4-string-compression)
3.  [Running Tests](#running-tests)
4.  [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [ASCII Diagrams](#ascii-diagrams)
    *   [Interview Guide](#interview-guide)
6.  [Solution Comparisons](#solution-comparisons)

## Project Setup

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/string-manipulation-interview-project.git
cd string-manipulation-interview-project
npm install
npm run build # Compile TypeScript files
```

## Problems Covered

This section briefly describes the problems addressed in this project. For detailed algorithm explanations, complexity analysis, and variations, refer to the [Algorithm Explanations Document](./docs/algorithms-explanation.md).

---

### 1. Valid Palindrome II

Given a string `s`, return `true` if the `s` can be a palindrome after deleting **at most one** character from it.

**Example 1:**
Input: `s = "aba"`
Output: `true`

**Example 2:**
Input: `s = "abca"`
Output: `true` (Delete 'c')

**Example 3:**
Input: `s = "abc"`
Output: `false`

---

### 2. Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
Input: `strs = ["eat","tea","tan","ate","nat","bat"]`
Output: `[["bat"],["nat","tan"],["ate","eat","tea"]]`

**Example 2:**
Input: `strs = [""]`
Output: `[[""]]`

**Example 3:**
Input: `strs = ["a"]`
Output: `[["a"]]`

---

### 3. Longest Substring Without Repeating Characters

Given a string `s`, find the length of the longest substring without repeating characters.

**Example 1:**
Input: `s = "abcabcbb"`
Output: `3`
Explanation: The answer is "abc", with the length of 3.

**Example 2:**
Input: `s = "bbbbb"`
Output: `1`
Explanation: The answer is "b", with the length of 1.

**Example 3:**
Input: `s = "pwwkew"`
Output: `3`
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

---

### 4. String Compression

Implement a function to perform basic string compression using the counts of repeated characters. For example, the string "aabcccccaaa" would become "a2b1c5a3". If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a-z).

**Example 1:**
Input: `s = "aabcccccaaa"`
Output: `"a2b1c5a3"`

**Example 2:**
Input: `s = "aabbcc"`
Output: `"aabbcc"` (Compressed "a2b2c2" is not smaller)

**Example 3:**
Input: `s = "a"`
Output: `"a"`

## Running Tests

Tests are implemented using Jest. To run all tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Running Benchmarks

Performance benchmarks compare different approaches for each problem.

To run the benchmarks:

```bash
npm run perf
```

## Documentation

### Algorithm Explanations

Detailed explanations of the optimal solutions, alternative approaches, time/space complexity, and reasoning for each problem can be found in:
[docs/algorithms-explanation.md](./docs/algorithms-explanation.md)

### ASCII Diagrams

Visual aids illustrating key concepts like two-pointers and sliding windows are available in:
[docs/diagrams.txt](./docs/diagrams.txt)

### Interview Guide

Tips, common pitfalls, and follow-up questions relevant to these problems in an interview setting are in:
[docs/interview-guide.md](./docs/interview-guide.md)

## Solution Comparisons

The `solutions-comparison/` directory contains various implementations (brute-force, optimized, alternative paradigms) for each problem, allowing for a side-by-side study of efficiency and design choices.

For instance, you can find different ways to solve "Valid Palindrome II" here:
`solutions-comparison/valid-palindrome-ii/`

```
```