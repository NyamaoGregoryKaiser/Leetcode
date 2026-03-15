# Heap Operations Interview Project

This repository provides a comprehensive coding interview project focused on Heap operations. It includes generic Min-Heap and Max-Heap implementations, solutions to several classic interview problems using heaps, extensive test cases, detailed documentation, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Installation](#installation)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Algorithms Implemented](#algorithms-implemented)
7.  [Documentation](#documentation)
8.  [Core Heap Implementations](#core-heap-implementations)
9.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Kth Largest Element in an Array](#problem-1-kth-largest-element-in-an-array)
    *   [Problem 2: Merge k Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Find Median from Data Stream](#problem-3-find-median-from-data-stream)
    *   [Problem 4: Top K Frequent Elements](#problem-4-top-k-frequent-elements)
    *   [Problem 5: Kth Largest Element in a Data Stream](#problem-5-kth-largest-element-in-a-data-stream)

## Project Structure

```
heap-operations-interview-project/
├── src/                         # Source code for algorithms and utilities
│   ├── algorithms/              # Heap implementations and problem solutions
│   │   ├── MinHeap.ts           # Generic Min-Heap
│   │   ├── MaxHeap.ts           # Generic Max-Heap
│   │   ├── KthLargestElement.ts
│   │   ├── MergeKSortedLists.ts
│   │   ├── MedianFinder.ts
│   │   ├── TopKFrequentElements.ts
│   │   └── KthLargestInStream.ts
│   ├── utils/                   # Helper utilities
│   │   └── arrayUtils.ts
│   └── index.ts                 # Main entry point (can be used for examples)
├── tests/                       # Jest test files for all implementations
│   ├── MinHeap.test.ts
│   ├── MaxHeap.test.ts
│   ├── KthLargestElement.test.ts
│   ├── MergeKSortedLists.test.ts
│   ├── MedianFinder.test.ts
│   ├── TopKFrequentElements.test.ts
│   └── KthLargestInStream.test.ts
├── docs/                        # Comprehensive documentation
│   ├── ALGORITHMS.md            # Detailed algorithm explanations, diagrams
│   └── INTERVIEW_TIPS.md        # Interview strategies, edge cases, variations
├── benchmarks/                  # Performance comparison scripts
│   └── performance.ts
├── README.md                    # Project overview (this file)
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── .gitignore                   # Files/directories to ignore
```

## Features

*   **Robust Heap Implementations:** Generic `MinHeap` and `MaxHeap` classes supporting custom comparators.
*   **Multiple Problem Solutions:** Optimal heap-based solutions for 5 common interview problems.
*   **Detailed Explanations:** In-code comments, time/space complexity analysis, and a dedicated `ALGORITHMS.md` document.
*   **Comprehensive Testing:** Extensive unit tests using Jest covering various scenarios and edge cases.
*   **Performance Benchmarking:** Scripts to compare the performance of optimized solutions against brute-force or alternative approaches.
*   **Interview Preparation:** `INTERVIEW_TIPS.md` provides insights into interview strategies, common pitfalls, and problem variations.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/heap-operations-interview-project.git
    cd heap-operations-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the project:**
    ```bash
    npm run build
    ```

## Running Tests

To run all unit tests:

```bash
npm test
```

You can also run tests for a specific file, e.g.:

```bash
jest tests/KthLargestElement.test.ts
```

## Running Benchmarks

To run the performance benchmarks:

```bash
npm run benchmark
```

## Algorithms Implemented

This project implements and applies the following core algorithms and data structures:

*   **Binary Heap:** Min-Heap and Max-Heap properties and operations (insertion, extraction, heapify-up, heapify-down).
*   **Priority Queue:** Heaps are used as efficient implementations of priority queues.

## Documentation

*   **`ALGORITHMS.md`**: Delves into the theoretical foundations of Binary Heaps, explaining their structure, operations, and providing ASCII diagrams for visualization. It also walks through the heap-based logic for each implemented problem.
*   **`INTERVIEW_TIPS.md`**: Offers advice for tackling heap-related interview questions, including identifying when to use a heap, discussing time/space complexities, handling edge cases, and exploring common variations.

## Core Heap Implementations

The project provides robust, generic `MinHeap` and `MaxHeap` implementations that form the foundation for solving various problems.

*   `src/algorithms/MinHeap.ts`
*   `src/algorithms/MaxHeap.ts`

Both support custom comparison functions, making them versatile for storing objects or complex data types.

## Problem Descriptions

### Problem 1: Kth Largest Element in an Array

**Description:** Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

**Example:**
Input: `nums = [3,2,1,5,6,4]`, `k = 2`
Output: `5` (Sorted array: `[1,2,3,4,5,6]`, 2nd largest is `5`)

**Solution Strategy:** Use a Min-Heap of size `k`. Iterate through the array; if the current element is larger than the heap's minimum, remove the minimum and insert the current element. The heap's minimum at the end will be the `k`th largest element.

### Problem 2: Merge k Sorted Lists

**Description:** You are given an array of `k` linked-lists `lists`, each list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Example:**
Input: `lists = [[1,4,5],[1,3,4],[2,6]]`
Output: `[1,1,2,3,4,4,5,6]`

**Solution Strategy:** Use a Min-Heap (priority queue) to keep track of the smallest element from the heads of all active lists. Repeatedly extract the minimum, add it to the merged list, and if its parent list has more elements, add the next element from that list to the heap.

### Problem 3: Find Median from Data Stream

**Description:** The median is the middle value in an ordered integer list. If the size of the list is even, there is no single middle value, and the median is the average of the two middle values. Implement the `MedianFinder` class:
*   `MedianFinder()`: Initializes the `MedianFinder` object.
*   `void addNum(int num)`: Adds an integer `num` from the data stream to the data structure.
*   `double findMedian()`: Returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

**Example:**
```
MedianFinder mf = new MedianFinder();
mf.addNum(1);    // arr = [1]
mf.addNum(2);    // arr = [1, 2]
mf.findMedian(); // return 1.5
mf.addNum(3);    // arr = [1, 2, 3]
mf.findMedian(); // return 2.0
```

**Solution Strategy:** Maintain two heaps: a Max-Heap for the smaller half of numbers (`maxHeapSmall`) and a Min-Heap for the larger half of numbers (`minHeapLarge`). Ensure `maxHeapSmall`'s size is equal to or one greater than `minHeapLarge`'s size. The median can then be easily found from the roots of these heaps.

### Problem 4: Top K Frequent Elements

**Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Example:**
Input: `nums = [1,1,1,2,2,3]`, `k = 2`
Output: `[1,2]` (1 appears 3 times, 2 appears 2 times, 3 appears 1 time. Top 2 are 1 and 2.)

**Solution Strategy:** First, count the frequency of each number using a hash map. Then, use a Min-Heap to store `(frequency, number)` pairs. Keep the heap size at `k`. If a new element's frequency is greater than the smallest frequency in the heap, pop the smallest and push the new one. The elements remaining in the heap are the top K frequent elements.

### Problem 5: Kth Largest Element in a Data Stream

**Description:** Design a class to find the `k`th largest element in a stream. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

Implement the `KthLargestInStream` class:
*   `KthLargestInStream(int k, int[] nums)`: Initializes the object with the integer `k` and the stream of integers `nums`.
*   `int add(int val)`: Appends the integer `val` to the stream and returns the element representing the `k`th largest element in the stream.

**Example:**
```
KthLargestInStream kthLargest = new KthLargestInStream(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
```

**Solution Strategy:** Similar to "Kth Largest Element in an Array", but maintains the state over multiple `add` calls. Use a Min-Heap of size `k`. When `add(val)` is called, if the heap is not yet full, add `val`. If it's full and `val` is greater than the heap's minimum, remove the minimum and insert `val`. The `k`th largest element is always the root of this Min-Heap.

---
```typescript