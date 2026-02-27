```markdown
# Binary Search Interview Project

This project is a comprehensive resource for mastering Binary Search, a fundamental algorithm often encountered in technical interviews. It's designed to provide a deep understanding through practical implementation, diverse problem-solving, robust testing, and detailed documentation.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Installation and Setup](#installation-and-setup)
4.  [Usage](#usage)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Problem Set](#problem-set)
    *   [1. Standard Binary Search & First/Last Occurrence](#1-standard-binary-search--firstlast-occurrence)
    *   [2. Search in Rotated Sorted Array](#2-search-in-rotated-sorted-array)
    *   [3. Find Peak Element](#3-find-peak-element)
    *   [4. Sqrt(x)](#4-sqrtx)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Introduction

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one. While the basic concept is simple, its applications and variations can be surprisingly complex, making it a favorite for interviewers.

This project aims to solidify your understanding by:
*   Presenting multiple common Binary Search problem patterns.
*   Providing optimal, well-commented JavaScript solutions.
*   Including brute-force alternatives where applicable to highlight efficiency gains.
*   Implementing a robust testing framework with extensive test cases.
*   Offering performance benchmarks to compare approaches.
*   Delivering comprehensive documentation, including algorithm explanations, ASCII diagrams, edge cases, and interview tips.

## Project Structure

```
binary-search-project/
├── src/
│   ├── problems/                   // Contains JavaScript implementations for each problem
│   │   ├── binarySearch.js
│   │   ├── searchRotatedArray.js
│   │   ├── findPeakElement.js
│   │   ├── sqrtX.js
│   │   └── index.js                // Exports all problem solutions
│   ├── utils/                      // Helper utilities (logger, array manipulation)
│   │   ├── logger.js
│   │   └── arrayUtils.js
│   └── index.js                    // Main exports from src
├── test/                           // Contains test files for each problem and a test runner
│   ├── testRunner.js
│   ├── testBinarySearch.js
│   ├── testRotatedArray.js
│   ├── testFindPeakElement.js
│   ├── testSqrtX.js
│   └── allTests.js                 // Orchestrates all test files
├── docs/                           // Detailed documentation
│   ├── README.md                   // Project overview (this file)
│   ├── binarySearchAlgorithm.md    // In-depth explanation of Binary Search algorithm
│   └── interviewTips.md            // Interview advice, common variations, and gotchas
├── benchmark/                      // Performance benchmarking scripts
│   └── benchmark.js
└── package.json                    // Project metadata and scripts
```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary-search-project.git
    cd binary-search-project
    ```
2.  **Install dependencies:**
    This project has no external npm dependencies beyond a standard Node.js environment.
    ```bash
    npm install # (This will mainly just set up the package-lock.json)
    ```

## Usage

### Running Tests

To execute all test cases for the implemented problems:

```bash
npm test
```

The output will show the status of each test suite (passed/failed) and detailed messages for failures.

### Running Benchmarks

To compare the performance (execution time) of different algorithms or approaches for a given problem:

```bash
npm run benchmark
```

The benchmark script will run various solutions against different input sizes and print the execution times.

## Problem Set

Here's a brief description of the problems addressed in this project:

### 1. Standard Binary Search & First/Last Occurrence
**(File: `src/problems/binarySearch.js`)**
*   **Standard Binary Search**: Given a sorted array and a target value, find the index of the target.
*   **Find First Occurrence**: Given a sorted array (possibly with duplicates) and a target value, find the index of its first occurrence.
*   **Find Last Occurrence**: Given a sorted array (possibly with duplicates) and a target value, find the index of its last occurrence.

### 2. Search in Rotated Sorted Array
**(File: `src/problems/searchRotatedArray.js`)**
Given a sorted array that has been rotated at some pivot unknown to you beforehand (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`), find a target value. If it's not in the array, return -1. Assume no duplicate values.

### 3. Find Peak Element
**(File: `src/problems/findPeakElement.js`)**
A peak element is an element that is greater than its neighbors. Given an input array `nums`, where `nums[i] ≠ nums[i+1]`, find a peak element and return its index. The array may contain multiple peaks, in which case return the index to any one of the peaks. You may imagine that `nums[-1] = nums[n] = -∞`.

### 4. Sqrt(x)
**(File: `src/problems/sqrtX.js`)**
Implement `int sqrt(int x)`. Compute and return the square root of `x`, where `x` is guaranteed to be a non-negative integer. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.

## Documentation

The `docs/` directory contains important documentation:

*   **`docs/binarySearchAlgorithm.md`**: An in-depth explanation of the Binary Search algorithm, including its core principles, variations in loop conditions (`left <= right` vs `left < right`), how to calculate `mid`, and its general applicability. It also features ASCII diagrams to visualize the process.
*   **`docs/interviewTips.md`**: A guide for interview preparation, covering common Binary Search variations, crucial edge cases to consider, and general tips for approaching these problems in an interview setting.

## Contributing

Feel free to contribute by:
*   Adding more Binary Search problems and solutions.
*   Improving existing solutions or adding alternative approaches.
*   Enhancing test coverage or adding more comprehensive benchmarks.
*   Refining documentation or adding more diagrams.

To contribute, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details (not included in this output, but typically standard).

```