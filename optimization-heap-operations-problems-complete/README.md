# Heap Operations Coding Interview Project

This project serves as a comprehensive resource for understanding and implementing heap-based algorithms, crucial for coding interviews. It includes a robust heap data structure, solutions to several common interview problems, extensive testing, performance benchmarking, and detailed documentation.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Setup and Installation](#setup-and-installation)
4.  [Core Data Structure: Heap](#core-data-structure-heap)
    *   [Usage](#usage)
5.  [Problems Covered](#problems-covered)
    *   [1. Kth Largest/Smallest Element in an Array](#1-kth-largestsmallest-element-in-an-array)
    *   [2. Merge K Sorted Lists](#2-merge-k-sorted-lists)
    *   [3. Top K Frequent Elements](#3-top-k-frequent-elements)
    *   [4. Find Median from Data Stream](#4-find-median-from-data-stream)
6.  [Running Tests](#running-tests)
7.  [Benchmarking Performance](#benchmarking-performance)
8.  [Documentation](#documentation)
9.  [Interview Tips](#interview-tips)
10. [License](#license)

## Introduction

Heaps are a fundamental data structure, often implemented as a binary tree, that satisfy the heap property: for any given node `i`, the value of `i` is either greater than or equal to the value of each of its children (max-heap) or less than or equal to the value of each of its children (min-heap). They are particularly useful for problems involving priority queues, finding Kth largest/smallest elements, and managing elements in a sorted order efficiently.

This project aims to provide a practical and theoretical understanding of heaps through:
*   A well-commented, generic Heap implementation in TypeScript.
*   Optimal solutions to common interview problems.
*   Thorough test cases for correctness.
*   Performance analysis to compare different approaches.
*   In-depth documentation to explain concepts and interview nuances.

## Project Structure

```
heap-operations-project/
├── src/
│   ├── data-structures/
│   │   └── Heap.ts             # Generic Min/Max Heap implementation
│   ├── problems/
│   │   ├── KthElement.ts           # Problem: Kth Largest/Smallest Element
│   │   ├── MergeKSortedLists.ts    # Problem: Merge K Sorted Lists
│   │   ├── TopKFrequentElements.ts # Problem: Top K Frequent Elements
│   │   └── FindMedianFromDataStream.ts # Problem: Find Median from Data Stream
│   └── utils/
│       └── comparator.ts         # Utility for default numeric comparisons
├── test/
│   ├── data-structures/
│   │   └── Heap.test.ts
│   ├── problems/
│   │   ├── KthElement.test.ts
│   │   ├── MergeKSortedLists.test.ts
│   │   ├── TopKFrequentElements.test.ts
│   │   └── FindMedianFromDataStream.test.ts
│   └── utils/
│       └── benchmarking.ts       # Performance benchmarking utility
├── docs/
│   ├── algorithms-explanation.md   # Detailed explanation of all algorithms
│   ├── brute-force-vs-optimized.md # Comparison of approaches
│   └── memory-efficiency.md        # Memory considerations
├── README.md                     # Project overview and setup
├── package.json
└── tsconfig.json
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/heap-operations-project.git
    cd heap-operations-project
    ```
2.  **Install dependencies:**
    This project uses `typescript` and `jest` for testing.
    ```bash
    npm install
    ```
3.  **Compile TypeScript:**
    ```bash
    npm run build
    ```
    This will compile the TypeScript files from `src/` into JavaScript in the `dist/` directory.

## Core Data Structure: Heap

The `src/data-structures/Heap.ts` file contains a generic `Heap` class implementation. It's an array-based binary heap that can function as a Min-Heap or a Max-Heap based on a provided comparator function.

### Usage

```typescript
import { Heap } from '../src/data-structures/Heap';
import { defaultCompare } from '../src/utils/comparator';

// Min-Heap (default behavior for defaultCompare)
const minHeap = new Heap<number>(defaultCompare);
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
console.log(minHeap.peek()); // 3
console.log(minHeap.extract()); // 3
console.log(minHeap.peek()); // 5

// Max-Heap (by reversing the defaultCompare function)
const maxHeap = new Heap<number>((a, b) => defaultCompare(b, a));
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(8);
console.log(maxHeap.peek()); // 8
console.log(maxHeap.extract()); // 8
console.log(maxHeap.peek()); // 5
```

## Problems Covered

This project tackles four common interview problems where heaps provide an optimal solution. Each problem has its implementation in `src/problems/` and detailed explanations in `docs/algorithms-explanation.md`.

### 1. Kth Largest/Smallest Element in an Array

*   **Problem:** Find the Kth largest or Kth smallest element in an unsorted array.
*   **Solution:** Uses a Min-Heap (for Kth largest) or Max-Heap (for Kth smallest) of size K to maintain the relevant elements.
*   **File:** `src/problems/KthElement.ts`
*   **Approaches:**
    *   **Optimal (Heap):** O(N log K) time, O(K) space.
    *   **Alternative (Sorting):** O(N log N) time, O(1) or O(N) space depending on sort implementation.
    *   **Alternative (QuickSelect):** Average O(N) time, Worst O(N^2) time, O(1) space. (Discussed in docs)

### 2. Merge K Sorted Lists

*   **Problem:** Merge `k` sorted linked lists into one single sorted linked list.
*   **Solution:** Uses a Min-Heap to keep track of the smallest element from the heads of all `k` lists.
*   **File:** `src/problems/MergeKSortedLists.ts`
*   **Approaches:**
    *   **Optimal (Heap):** O(N log K) time, O(K) space (N is total elements, K is number of lists).
    *   **Alternative (Iterative Merging):** O(N * K) time, O(1) space.

### 3. Top K Frequent Elements

*   **Problem:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.
*   **Solution:** Uses a frequency map followed by a Min-Heap of size K to store `[frequency, element]` pairs, ensuring the heap always holds the K most frequent elements found so far.
*   **File:** `src/problems/TopKFrequentElements.ts`
*   **Approaches:**
    *   **Optimal (Map + Min-Heap):** O(N log K) time, O(N) space (for map) + O(K) space (for heap).
    *   **Alternative (Map + Sorting):** O(N + M log M) time (M is unique elements), O(N) space.
    *   **Alternative (Bucket Sort):** O(N) time, O(N) space (discussed in docs).

### 4. Find Median from Data Stream

*   **Problem:** Design a data structure that supports adding new numbers and finding the median of all numbers added so far.
*   **Solution:** Employs two heaps: a Max-Heap for the smaller half of numbers and a Min-Heap for the larger half. This maintains a balanced structure to efficiently find the median.
*   **File:** `src/problems/FindMedianFromDataStream.ts`
*   **Approaches:**
    *   **Optimal (Two Heaps):** `addNum`: O(log N) time, `findMedian`: O(1) time, O(N) space.
    *   **Alternative (Sorted List/Array):** `addNum`: O(N) time (for insertion/sorting), `findMedian`: O(1) time, O(N) space.

## Running Tests

Tests are written using `Jest`.

To run all tests:
```bash
npm test
```

To run tests for a specific file (e.g., `Heap.test.ts`):
```bash
npm test test/data-structures/Heap.test.ts
```

## Benchmarking Performance

The `test/utils/benchmarking.ts` file provides a simple utility to measure the execution time of different functions. You can modify this file or add new benchmark scripts to compare the performance of various approaches (e.g., heap-based vs. sorting for Kth element).

Example usage (from `test/problems/KthElement.test.ts`):
```typescript
import { measurePerformance } from '../../src/utils/benchmarking';
// ... inside a test block
const array = Array.from({ length: 100000 }, (_, i) => Math.random() * 1000000);
const k = 100;
measurePerformance('findKthLargestHeap', () => findKthLargestHeap(array, k));
measurePerformance('findKthLargestSort', () => findKthLargestSort(array, k));
```

To run benchmarks, ensure they are enabled in your test files (e.g., by uncommenting them) and then run `npm test`. The output will show the execution times.

## Documentation

The `docs/` directory contains detailed markdown files:

*   `docs/algorithms-explanation.md`: Provides in-depth explanations of each problem's optimal solution, including logic, pseudocode, ASCII art diagrams, and complexity analysis.
*   `docs/brute-force-vs-optimized.md`: Compares brute-force/naive approaches with the optimized heap-based solutions, highlighting trade-offs.
*   `docs/memory-efficiency.md`: Discusses memory considerations for heap implementations and problem solutions.

## Interview Tips

*   **Understand the Heap Property:** Be able to explain Min-Heap vs. Max-Heap and how they maintain order.
*   **Draw Diagrams:** For problems like "Find Median from Data Stream", drawing out the two heaps and how elements are balanced helps immensely.
*   **Complexity Analysis:** Always provide time and space complexity for your solutions. Explain how different operations (insert, extract) affect complexity.
*   **Edge Cases:** Discuss and handle null/empty inputs, single-element arrays, duplicate values, and `k` values (e.g., `k=1`, `k=N`).
*   **Trade-offs:** Be prepared to discuss why a heap solution might be preferred over sorting or other methods, particularly concerning `N` and `K` values.
*   **Variations:** Think about how the problem could be slightly altered and how your solution would adapt (e.g., "Kth smallest" instead of "Kth largest").

## License

This project is open-sourced under the MIT License. Feel free to use, modify, and distribute it for personal or educational purposes.

---