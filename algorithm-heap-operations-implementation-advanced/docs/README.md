```markdown
# Heap Operations Coding Interview Project

This project provides a comprehensive set of problems and solutions related to Heap (Priority Queue) operations, designed to simulate a coding interview scenario. It includes optimized algorithms, alternative approaches, detailed complexity analysis, extensive tests, performance benchmarks, and thorough documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Build and Run](#how-to-build-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Build](#build)
    *   [Run Tests](#run-tests)
    *   [Run Benchmarks](#run-benchmarks)
3.  [Problems Solved](#problems-solved)
    *   [1. Kth Smallest Element in an Unsorted Array](#1-kth-smallest-element-in-an-unsorted-array)
    *   [2. Find Median from Data Stream](#2-find-median-from-data-stream)
    *   [3. Merge K Sorted Lists](#3-merge-k-sorted-lists)
    *   [4. Top K Frequent Elements](#4-top-k-frequent-elements)
4.  [Key Files Description](#key-files-description)
5.  [Documentation](#documentation)
    *   [ALGORITHM_EXPLANATION.md](#algorithm_explanationmd)
    *   [INTERVIEW_GUIDE.md](#interview_guidemd)
6.  [Additional Implementations](#additional-implementations)

---

## 1. Project Structure

```
heap-interview-project/
├── pom.xml                                     # Maven build file
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   ├── heapinterview/
│   │   │   │   │   ├── algorithms/
│   │   │   │   │   │   ├── HeapProblems.java   # Main algorithm implementations
│   │   │   │   │   ├── datastructures/
│   │   │   │   │   │   ├── CustomMaxHeap.java  # Custom Max-Heap implementation
│   │   │   │   │   │   ├── CustomMinHeap.java  # Custom Min-Heap implementation
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── PerformanceBenchmarker.java # Utility for benchmarking
│   ├── test/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   ├── heapinterview/
│   │   │   │   │   ├── CustomHeapTest.java     # Tests for custom heap implementations
│   │   │   │   │   ├── HeapProblemsTest.java   # Tests for algorithm solutions
├── additional_implementations/                 # Alternative/Brute-force solutions for comparison
│   ├── KthSmallestElement_BruteForce.java
│   ├── KthSmallestElement_StreamAPI.java
│   ├── MedianFinder_SortedList.java
├── docs/
│   ├── ALGORITHM_EXPLANATION.md                # Detailed algorithm explanations and diagrams
│   ├── INTERVIEW_GUIDE.md                      # Interview tips, edge cases, and variations
│   ├── README.md                               # This file
```

## 2. How to Build and Run

### Prerequisites

*   Java Development Kit (JDK) 11 or newer
*   Apache Maven 3.6.0 or newer

### Build

Navigate to the root directory of the project (`heap-interview-project/`) and run:

```bash
mvn clean install
```

This will compile the source code and package it into a JAR file (though for interview practice, you'll mainly be running tests).

### Run Tests

To run all JUnit tests (including performance benchmarks output to console):

```bash
mvn test
```

### Run Benchmarks

The performance benchmarks are integrated into the `HeapProblemsTest.java` file and will run with `mvn test`. Look for output prefixed with "Benchmark" in your console.

## 3. Problems Solved

This project covers the following heap-related problems:

### 1. Kth Smallest Element in an Unsorted Array

**Problem Description:** Given an unsorted array of numbers, find the Kth smallest number in it. (Note: This is the Kth smallest number in the sorted order, not the Kth distinct element).

**Solutions Provided in `HeapProblems.java`:**
*   `findKthSmallestMaxHeap`: Optimal solution using a Max-Heap (size K).
    *   **Time Complexity:** O(N log K)
    *   **Space Complexity:** O(K)
*   `findKthSmallestMinHeap`: Alternative using a Min-Heap (add all, then poll K times).
    *   **Time Complexity:** O(N + K log N)
    *   **Space Complexity:** O(N)
*   `findKthSmallestSorting`: Brute-force/Simple approach using `Arrays.sort()`.
    *   **Time Complexity:** O(N log N)
    *   **Space Complexity:** O(1) or O(N)

**Additional Implementations:**
*   `additional_implementations/KthSmallestElement_BruteForce.java`: Dedicated brute-force file.
*   `additional_implementations/KthSmallestElement_StreamAPI.java`: Solution using Java Stream API.

### 2. Find Median from Data Stream

**Problem Description:** Design a data structure that supports adding new numbers and finding the median of all numbers added so far.

**Solution Provided in `HeapProblems.java` (`MedianFinder` class):**
*   Optimal solution using two heaps: a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half. The heaps are kept balanced to efficiently find the median.
    *   `addNum`: O(log N)
    *   `findMedian`: O(1)
    *   **Total Space Complexity:** O(N)

**Additional Implementations:**
*   `additional_implementations/MedianFinder_SortedList.java`: Alternative using a sorted `ArrayList`.
    *   `addNum`: O(N)
    *   `findMedian`: O(1)

### 3. Merge K Sorted Lists

**Problem Description:** You are given an array of `k` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Solutions Provided in `HeapProblems.java` (`MergeKSortedLists` class):**
*   `mergeKLists`: Optimal solution using a Min-Heap.
    *   **Time Complexity:** O(N log K) (N is total nodes, K is number of lists)
    *   **Space Complexity:** O(K)
*   `mergeKListsNaive`: Naive approach, merging lists one by one using a helper `mergeTwoLists` function.
    *   **Time Complexity:** O(N * K)
    *   **Space Complexity:** O(1) (excluding output list)
*   `mergeKListsDivideAndConquer`: Divide and Conquer approach, recursively merging halves of the list array.
    *   **Time Complexity:** O(N log K)
    *   **Space Complexity:** O(log K) (for recursion stack)

### 4. Top K Frequent Elements

**Problem Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Solutions Provided in `HeapProblems.java` (`TopKFrequentElements` class):**
*   `topKFrequentMinHeap`: Optimal solution using a Min-Heap (of size K) to store (frequency, number) pairs.
    *   **Time Complexity:** O(N + M log K) (N is total elements, M is unique elements)
    *   **Space Complexity:** O(M + K)
*   `topKFrequentMaxHeap`: Alternative using a Max-Heap (stores all unique elements, then polls K times).
    *   **Time Complexity:** O(N + M log M)
    *   **Space Complexity:** O(M)
*   `topKFrequentBucketSort`: Highly efficient alternative using Bucket Sort, especially good if `MaxFreq` is not too large.
    *   **Time Complexity:** O(N) average, O(N + MaxFreq) worst-case.
    *   **Space Complexity:** O(N)

## 4. Key Files Description

*   `HeapProblems.java`: Contains the primary, optimized solutions for the listed problems. Each solution includes detailed comments on logic, multiple approaches (where applicable), and time/space complexity analysis.
*   `CustomMinHeap.java`, `CustomMaxHeap.java`: Hand-rolled, array-based implementations of Min-Heap and Max-Heap. These serve to illustrate the fundamental heap data structure and its operations (`insert`, `peek`, `poll`, `heapifyUp`, `heapifyDown`).
*   `PerformanceBenchmarker.java`: A simple utility to measure the execution time of code blocks, used in tests to compare algorithm performance.
*   `HeapProblemsTest.java`: JUnit 5 test cases for all problems in `HeapProblems.java`, including edge cases and larger randomized tests.
*   `CustomHeapTest.java`: JUnit 5 test cases for the `CustomMinHeap` and `CustomMaxHeap` implementations.

## 5. Documentation

The `docs/` directory contains in-depth documentation:

### `ALGORITHM_EXPLANATION.md`

This document provides a detailed explanation of:
*   What a Heap is (Min-Heap vs. Max-Heap properties).
*   Common Heap operations and their complexities.
*   Step-by-step walkthroughs of the optimal algorithms for each problem with illustrative ASCII diagrams.
*   A summary of time and space complexities for all solutions.

### `INTERVIEW_GUIDE.md`

This guide offers advice for tackling heap-related interview questions, including:
*   General tips for problem-solving with heaps.
*   Common variations and follow-up questions for each problem.
*   Discussion of edge cases to consider (e.g., empty inputs, duplicates, constraints on `k`).
*   Strategies for communicating your solution during an interview.

## 6. Additional Implementations

The `additional_implementations/` directory houses alternative approaches for some problems, showcasing different paradigms or less optimized (brute-force) solutions for comparative analysis:

*   **`KthSmallestElement_BruteForce.java`**: Finds Kth smallest by sorting the entire array.
*   **`KthSmallestElement_StreamAPI.java`**: Finds Kth smallest using Java 8 Stream API.
*   **`MedianFinder_SortedList.java`**: Implements `MedianFinder` using a sorted `ArrayList`, contrasting its performance with the two-heap approach.

This comprehensive project aims to equip interviewees with a solid understanding and practical experience in solving heap-based problems.
```