# Heap Operations Coding Interview Project

This project provides a comprehensive set of problems, solutions, and supporting documentation for mastering heap operations in coding interviews. It covers fundamental heap concepts, `std::priority_queue` usage, custom heap implementations, and various problem-solving techniques.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Build and Run](#build-and-run)
3.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Kth Largest Element in an Array](#problem-1-kth-largest-element-in-an-array)
    *   [Problem 2: Merge K Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Top K Frequent Elements](#problem-3-top-k-frequent-elements)
    *   [Problem 4: Find Median from Data Stream](#problem-4-find-median-from-data-stream)
4.  [Solution Approaches & Complexities](#solution-approaches--complexities)
5.  [Supporting Files](#supporting-files)
6.  [Documentation](#documentation)
7.  [Additional Implementations](#additional-implementations)

## Project Overview

The goal of this project is to provide a holistic resource for preparing for heap-related interview questions. It includes:
*   **Main Algorithm Implementations**: C++ solutions for 4 core heap problems, featuring optimal approaches, alternative solutions (e.g., Quickselect), and detailed comments.
*   **Custom Heap**: A generic `CustomHeap` class implementation that can serve as both min-heap and max-heap.
*   **Testing**: A robust test suite with various edge cases and general scenarios.
*   **Benchmarking**: Performance comparison between different algorithms (e.g., heap vs. Quickselect).
*   **Documentation**: In-depth explanations of heap algorithms, visual diagrams, and interview strategies.

## Build and Run

To build and run the project, you need a C++ compiler (like g++).

1.  **Clone the repository (if applicable, otherwise save files locally):**
    ```bash
    # Assuming you have the files in a directory named heap_operations_project
    cd heap_operations_project
    ```

2.  **Build using the provided Makefile:**
    ```bash
    make all
    ```
    This will compile `main_heap_problems.cpp`, `test_suite.cpp`, and `benchmark_suite.cpp` into executables named `main_problems`, `run_tests`, and `run_benchmarks` respectively.

3.  **Run the main problem demonstrations:**
    ```bash
    ./main_problems
    ```

4.  **Run the test suite:**
    ```bash
    ./run_tests
    ```

5.  **Run the performance benchmarks:**
    ```bash
    ./run_benchmarks
    ```

## Problem Descriptions

### Problem 1: Kth Largest Element in an Array
**Description:** Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

**Example:**
Input: `nums = [3,2,1,5,6,4], k = 2`
Output: `5`

### Problem 2: Merge K Sorted Lists
**Description:** You are given an array of `k` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Example:**
Input: `lists = [[1,4,5],[1,3,4],[2,6]]`
Output: `[1,1,2,3,4,4,5,6]`

### Problem 3: Top K Frequent Elements
**Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Example:**
Input: `nums = [1,1,1,2,2,3], k = 2`
Output: `[1,2]` (or `[2,1]`)

### Problem 4: Find Median from Data Stream
**Description:** The median is the middle value in an ordered integer list. If the size of the list is even, there is no single middle value, and the median is typically the average of the two middle values.
Implement the `MedianFinder` class:
*   `MedianFinder()` initializes the `MedianFinder` object.
*   `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
*   `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

**Example:**
`addNum(1)`
`addNum(2)`
`findMedian()` -> `1.5`
`addNum(3)`
`findMedian()` -> `2.0`

## Solution Approaches & Complexities

### Problem 1: Kth Largest Element in an Array
*   **Approach 1: Min-Heap (Priority Queue)**
    *   **Time Complexity:** `O(N log K)`
    *   **Space Complexity:** `O(K)`
*   **Approach 2: Quickselect (Partition-based Selection)**
    *   **Average Time Complexity:** `O(N)`
    *   **Worst-case Time Complexity:** `O(N^2)`
    *   **Space Complexity:** `O(1)` (in-place recursion stack `O(log N)` average, `O(N)` worst)
*   **Approach 3: Sorting (Brute-force)**
    *   **Time Complexity:** `O(N log N)`
    *   **Space Complexity:** `O(log N)` or `O(N)` depending on sort implementation

### Problem 2: Merge K Sorted Lists
*   **Approach 1: Min-Heap (Priority Queue)**
    *   **Time Complexity:** `O(N log K)`, where `N` is the total number of elements across all lists and `K` is the number of lists.
    *   **Space Complexity:** `O(K)`
*   **Approach 2: Pairwise Merge (Divide and Conquer)**
    *   **Time Complexity:** `O(N log K)`
    *   **Space Complexity:** `O(1)` (excluding output list) or `O(log K)` for recursion stack

### Problem 3: Top K Frequent Elements
*   **Approach 1: Hash Map + Min-Heap**
    *   **Time Complexity:** `O(N + M log K)`, where `N` is the number of elements in `nums` and `M` is the number of unique elements.
    *   **Space Complexity:** `O(M + K)`
*   **Approach 2: Hash Map + Bucket Sort**
    *   **Time Complexity:** `O(N)`
    *   **Space Complexity:** `O(N)` (for map and buckets)

### Problem 4: Find Median from Data Stream
*   **Approach 1: Two Heaps (Max-Heap & Min-Heap)**
    *   `addNum`: `O(log N)`
    *   `findMedian`: `O(1)`
    *   **Space Complexity:** `O(N)`

## Supporting Files

*   `src/custom_heap.hpp`: A templated C++ implementation of a binary heap, capable of acting as both a min-heap and a max-heap through a configurable comparator. It provides `push`, `pop`, `top`, `empty`, `size` operations.
*   `tests/test_suite.cpp`: Contains a series of test cases for each problem, covering general cases, edge cases (empty inputs, single elements, duplicates), and performance-critical scenarios. Uses simple `assert` checks.
*   `benchmarks/benchmark_suite.cpp`: Compares the performance of different algorithms for problems with multiple solutions (e.g., heap vs. Quickselect for Kth Largest), using `std::chrono` for accurate timing.

## Documentation

*   `docs/algorithm_explanation.md`: Provides a detailed explanation of heap data structures (binary heaps, min-heaps, max-heaps), their underlying array representation, and how core operations (heapify-up, heapify-down) work. It includes ASCII diagrams to visualize heap structures and operations. Each problem's solution is also explained step-by-step.
*   `docs/interview_guide.md`: Offers practical advice for handling heap-related interview questions. It includes common variations, follow-up questions, key points to mention, and pitfalls to avoid during an interview.

## Additional Implementations

*   **Brute Force vs. Optimized Solutions**: For problems like "Kth Largest Element" and "Merge K Sorted Lists", brute-force approaches (e.g., sorting the entire array, collecting all elements and then sorting) are mentioned and contrasted with the optimized heap-based solutions in terms of complexity. Quickselect offers a non-heap optimized solution.
*   **Memory-Efficient Versions**: The Quickselect algorithm for "Kth Largest" is an excellent example of an `O(1)` space complexity solution (amortized for recursion stack). The heap-based solutions typically use `O(K)` or `O(N)` space, which is also discussed in the complexity analysis.

---