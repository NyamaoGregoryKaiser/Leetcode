```markdown
# Sorting Algorithms Interview Project

This project is a comprehensive guide and implementation set for various sorting algorithms and related problems, designed to prepare for coding interviews. It includes multiple problem solutions, extensive test cases, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [Setup and Running](#setup-and-running)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Documentation](#documentation)
5.  [Contributing](#contributing)

---

## Problems Covered

This project addresses the following common sorting-related interview problems:

### Problem 1: Sort an Array (LeetCode 912 Equivalent)
Implement various standard sorting algorithms to sort an integer array in ascending order.

*   **Algorithms Implemented**:
    *   Merge Sort
    *   Quick Sort (Lomuto Partition Scheme)
    *   Heap Sort

### Problem 2: Merge Sorted Arrays (LeetCode 88 Equivalent)
Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array. `nums1` has enough space to hold elements from both arrays.

*   **Approaches**:
    *   Optimal: Merge from the back (in-place, O(1) auxiliary space).
    *   Brute-force: Copy and sort.

### Problem 3: Kth Largest Element in an Array (LeetCode 215 Equivalent)
Find the `k`-th largest element in an unsorted array.

*   **Approaches**:
    *   Optimal: QuickSelect (average O(N)).
    *   Using a Min-Heap (O(N log K)).
    *   Brute-force: Sort the array (O(N log N)).

### Problem 4: Sort Colors (LeetCode 75 Equivalent)
Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. Use integers 0, 1, and 2 to represent red, white, and blue respectively.

*   **Approaches**:
    *   Optimal: Dutch National Flag algorithm (single pass, O(1) auxiliary space).
    *   Counting Sort (two passes).
    *   Brute-force: Built-in sort.

---

## Setup and Running

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven

### Building the Project

Navigate to the project root directory (`sorting-algorithms-project/`) and run:

```bash
mvn clean install
```

This will compile the code and package it into a JAR file.

### Running Tests

To execute all JUnit 5 test cases:

```bash
mvn test
```

### Running Benchmarks

Benchmarks use [JMH (Java Microbenchmark Harness)](https://openjdk.java.net/projects/code-tools/jmh/).
To run the benchmarks, first build the project (as shown above), then execute:

```bash
java -jar target/benchmarks.jar
```
*(Note: The exact JAR name might vary slightly, check the `target/` directory for `benchmarks.jar` after `mvn clean install`)*

You can specify which benchmark to run or configure other options. For example, to run only `SortBenchmark.measureQuickSort`:
```bash
java -jar target/benchmarks.jar com.example.sorting.benchmarks.SortBenchmark.measureQuickSort
```

---

## Documentation

The `docs/` directory contains detailed explanations for the algorithms and interview aspects:

*   **`docs/AlgorithmsExplanation.md`**: In-depth explanations of Merge Sort, Quick Sort, Heap Sort, QuickSelect, and the Dutch National Flag algorithm, including pseudocode and ASCII art diagrams.
*   **`docs/EdgeCasesAndGotchas.md`**: A discussion of common edge cases (empty arrays, single element, duplicates, already sorted, reverse sorted) and potential pitfalls for sorting problems.
*   **`docs/InterviewTips.md`**: Advice on how to approach sorting problems in an interview, common follow-up questions, variations, and what interviewers look for.

---

## Contributing

Feel free to contribute by:
*   Adding more sorting algorithms (e.g., Insertion Sort, Counting Sort as standalone).
*   Proposing alternative solutions for existing problems.
*   Adding more extensive test cases.
*   Improving documentation or diagrams.
*   Optimizing existing code.

Please open an issue or pull request with your suggestions.
```