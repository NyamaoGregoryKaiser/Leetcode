```markdown
# Heap Operations Coding Interview Project

This project is designed as a comprehensive coding interview preparation kit focusing on the Heap data structure. It includes detailed implementations of common heap-related problems, custom heap classes, test cases, performance benchmarks, and extensive documentation.

## Table of Contents

1.  [Introduction to Heaps](#introduction-to-heaps)
2.  [Project Structure](#project-structure)
3.  [Problems Covered](#problems-covered)
    *   [Problem 1: Kth Smallest Element in an Array](#problem-1-kth-smallest-element-in-an-array)
    *   [Problem 2: Merge K Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Find Median from Data Stream](#problem-3-find-median-from-data-stream)
    *   [Problem 4: Top K Frequent Elements](#problem-4-top-k-frequent-elements)
    *   [Problem 5: Smallest Range Covering Elements from K Lists](#problem-5-smallest-range-covering-elements-from-k-lists)
4.  [How to Compile and Run](#how-to-compile-and-run)
5.  [Testing](#testing)
6.  [Benchmarking](#benchmarking)
7.  [Additional Implementations](#additional-implementations)
8.  [Further Documentation](#further-documentation)

---

## 1. Introduction to Heaps

A **Heap** is a specialized tree-based data structure that satisfies the heap property. This property states that if `P` is a parent node of `C`, then the value of `P` must be related in a certain way to the value of `C`.

*   **Min-Heap**: The value of `P` is less than or equal to the value of `C`. The smallest element is always at the root.
*   **Max-Heap**: The value of `P` is greater than or equal to the value of `C`. The largest element is always at the root.

Heaps are typically implemented using an array or a `std::vector` in C++, leveraging the fact that a complete binary tree can be efficiently mapped to an array (children of node `i` are at `2i+1` and `2i+2`; parent of node `i` is at `(i-1)/2`).

Heaps are excellent for problems involving:
*   Finding the Kth smallest/largest element.
*   Priority queues.
*   Merging sorted collections.
*   Graph algorithms (e.g., Dijkstra's, Prim's).

## 2. Project Structure

```
heap_operations_project/
├── src/                          # Main source code for algorithms and custom heaps
│   ├── main_heap_algo.cpp        # Implementations of various heap-related problems
│   ├── min_heap.h                # Custom Min-Heap class implementation
│   └── max_heap.h                # Custom Max-Heap class implementation
├── tests/                        # Unit tests for all problems and custom heaps
│   └── test_heap_problems.cpp
├── docs/                         # Documentation and explanations
│   ├── README.md                 # This file
│   └── algorithm_explanation.md  # Detailed algorithm explanations, diagrams, tips
├── benchmarking/                 # Performance measurement code
│   └── benchmark_heap_problems.cpp
└── extra_implementations/        # Alternative or brute-force solutions
    ├── kth_smallest_brute_force.cpp
    ├── median_finder_naive.cpp
    └── functional_min_heap.cpp
```

## 3. Problems Covered

The `src/main_heap_algo.cpp` file contains optimal, heap-based solutions for the following common interview problems. Each function includes detailed comments on logic, time, and space complexity.

### Problem 1: Kth Smallest Element in an Array
*   **Description**: Given an unsorted array of numbers, find the Kth smallest number.
*   **Approach 1 (Optimal)**: Use a Max-Heap of size K. Iterate through the array; push elements into the heap. If the heap size exceeds K, pop the maximum element (heap top). The remaining elements in the heap will be the K smallest, with the Kth smallest at the top.
    *   **Time Complexity**: O(N log K)
    *   **Space Complexity**: O(K)
*   **Approach 2 (Less Optimal)**: Use a Min-Heap. Push all elements into a min-heap, then pop K-1 times. The next element popped is the Kth smallest.
    *   **Time Complexity**: O(N + K log N)
    *   **Space Complexity**: O(N)

### Problem 2: Merge K Sorted Lists
*   **Description**: Merge K sorted linked lists into one sorted linked list.
*   **Approach 1 (Optimal)**: Use a Min-Heap. Initially, add the first node of each list to the heap. Repeatedly extract the minimum node from the heap, add it to the result list, and if the extracted node has a next element, push that into the heap.
    *   **Time Complexity**: O(N log K), where N is total elements, K is number of lists.
    *   **Space Complexity**: O(K)
*   **Approach 2 (Less Optimal - Pairwise Merging)**: Merge lists two by two. This can be done sequentially (list1+list2, then result+list3, etc.) or using a divide-and-conquer strategy (like merge sort).
    *   **Time Complexity**: O(N * K) for sequential, O(N log K) for divide-and-conquer (similar to heap, but typically higher constant factor due to multiple list traversals).
    *   **Space Complexity**: O(1) auxiliary for iterative in-place, O(log K) for recursive calls.

### Problem 3: Find Median from Data Stream
*   **Description**: Design a data structure that supports adding new numbers and finding the median of all numbers added so far.
*   **Approach (Optimal)**: Use two heaps: a Max-Heap (`low`) for the smaller half of numbers and a Min-Heap (`high`) for the larger half. Maintain the invariant that `low.size() == high.size()` or `low.size() == high.size() + 1`, and all elements in `low` are less than or equal to elements in `high`.
    *   **Time Complexity**: O(log N) for `addNum`, O(1) for `findMedian`.
    *   **Space Complexity**: O(N)

### Problem 4: Top K Frequent Elements
*   **Description**: Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
*   **Approach (Optimal)**:
    1.  Count frequencies of all elements using a hash map (`std::map` or `std::unordered_map`).
    2.  Use a Min-Heap to store pairs of `(frequency, element)`. Iterate through the frequency map. For each pair, push it into the heap. If the heap size exceeds `k`, pop the element with the smallest frequency (heap top).
    3.  After processing all unique elements, the heap will contain the `k` elements with the highest frequencies.
    *   **Time Complexity**: O(N + M log K), where N is `nums.size()`, M is number of unique elements.
    *   **Space Complexity**: O(M + K)

### Problem 5: Smallest Range Covering Elements from K Lists
*   **Description**: Given `k` lists of sorted integers, find the smallest range that includes at least one number from each of the `k` lists.
*   **Approach (Optimal)**: Use a Min-Heap.
    1.  Initialize `currentMax` to track the maximum element seen across the elements currently in the heap. Initialize `rangeStart`, `rangeEnd` to cover the widest possible range.
    2.  Push the first element of each of the `k` lists into a min-heap. Each element in the heap is a tuple `(value, list_index, element_index_in_list)`. Update `currentMax`.
    3.  Loop while the heap contains an element from all `k` lists (heap size == `k`):
        a.  Extract the minimum element `(minVal, listIdx, elemIdx)` from the heap.
        b.  Update `rangeStart`, `rangeEnd` if `(currentMax - minVal)` is smaller than the best found so far.
        c.  If `listIdx` has a next element, add `(nextVal, listIdx, elemIdx + 1)` to the heap and update `currentMax`.
        d.  If `listIdx` is exhausted, break the loop.
    *   **Time Complexity**: O(N log K), where N is total elements, K is number of lists.
    *   **Space Complexity**: O(K)

## 4. How to Compile and Run

This project uses C++ and can be compiled with a standard C++ compiler like g++.

1.  **Navigate to the project root directory**:
    ```bash
    cd heap_operations_project
    ```

2.  **Compile the main algorithms and tests**:
    ```bash
    g++ -std=c++17 -O2 tests/test_heap_problems.cpp -o run_tests
    ```
    (Note: `main_heap_algo.cpp` and custom heap headers are included directly by `test_heap_problems.cpp`).

3.  **Run the tests**:
    ```bash
    ./run_tests
    ```

4.  **Compile and run benchmarking (optional)**:
    ```bash
    g++ -std=c++17 -O2 benchmarking/benchmark_heap_problems.cpp -o run_benchmarks
    ./run_benchmarks
    ```

5.  **Compile and run extra implementations (optional)**:
    Individual files in `extra_implementations` can be compiled and run similarly, for example:
    ```bash
    g++ -std=c++17 -O2 extra_implementations/kth_smallest_brute_force.cpp -o run_brute_force_kth
    ./run_brute_force_kth
    ```

## 5. Testing

The `tests/test_heap_problems.cpp` file contains a custom, lightweight testing framework. It includes comprehensive test cases for:
*   **Custom Min-Heap and Max-Heap classes**: Verifying `push`, `pop`, `peek`, `isEmpty`, `size`, and constructor from vector.
*   **Kth Smallest Element**: Various array sizes, K values, duplicates, edge cases.
*   **Merge K Sorted Lists**: Empty lists, single lists, multiple lists, large number of lists.
*   **Median Finder**: Adding numbers incrementally, checking median at each step, negative numbers, empty state.
*   **Top K Frequent Elements**: Various frequencies, ties, all unique elements, `k` exceeding unique count, empty array.
*   **Smallest Range Covering Elements**: Standard cases, all same elements, single element lists, negative numbers, empty lists.

To run all tests, follow the "How to Compile and Run" section.

## 6. Benchmarking

The `benchmarking/benchmark_heap_problems.cpp` file provides performance measurements using `std::chrono`. It compares different approaches (e.g., heap vs. less optimized) for relevant problems, generating random data to simulate real-world scenarios. This helps in understanding the practical implications of theoretical time complexities.

## 7. Additional Implementations

The `extra_implementations/` directory contains alternative solutions, often less optimized or demonstrating different approaches:

*   **`kth_smallest_brute_force.cpp`**: Demonstrates finding the Kth smallest element by sorting the entire array or using `std::nth_element`.
*   **`median_finder_naive.cpp`**: A less efficient approach to finding the median from a data stream, typically involving maintaining a sorted vector and recalculating the median by iterating. This highlights why the two-heap approach is superior.
*   **`functional_min_heap.cpp`**: An example of a min-heap implemented in a more functional style, directly operating on a `std::vector` using global functions, without a dedicated class wrapper. This demonstrates the underlying array manipulation principles.

## 8. Further Documentation

For an in-depth understanding of heap data structures, visual explanations, edge cases, and interview tips, refer to:

*   **`docs/algorithm_explanation.md`**: This document provides a comprehensive theoretical background, visual diagrams (ASCII art) of heap operations, discusses common edge cases and gotchas, and offers valuable interview tips and variations for heap-related questions.

---
```