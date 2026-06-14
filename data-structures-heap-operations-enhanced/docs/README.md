# Heap Operations Coding Interview Project

This project aims to provide a comprehensive resource for understanding and implementing heap-based algorithms, commonly encountered in coding interviews. It covers several classic problems, offering optimal solutions, performance analysis, and detailed explanations.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Kth Largest Element in an Array](#problem-1-kth-largest-element-in-an-array)
    *   [Problem 2: Merge K Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Find Median from Data Stream](#problem-3-find-median-from-data-stream)
    *   [Problem 4: Top K Frequent Elements](#problem-4-top-k-frequent-elements)
4.  [How to Build and Run](#how-to-build-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Building](#building)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Overview

Heaps are a crucial data structure for efficiently managing priorities and solving problems involving "top K" elements, merging sorted data, and maintaining running statistics. This project demonstrates the power and versatility of heaps through practical examples. It includes:

*   **Custom Heap Implementations:** `MinHeap` and `MaxHeap` from scratch to demonstrate fundamental understanding.
*   **Problem Solutions:** Optimal heap-based solutions for 4 common interview problems.
*   **Multiple Approaches:** Where applicable, alternative solutions (e.g., brute force, `std::priority_queue`) are discussed or implemented for comparison.
*   **Comprehensive Tests:** Unit tests covering various scenarios and edge cases using Google Test.
*   **Performance Benchmarks:** Comparison of different approaches using Google Benchmark.
*   **Detailed Documentation:** In-depth explanations of algorithms, time/space complexity, ASCII diagrams, and interview tips.

## Features

*   **C++17 Standard:** Modern C++ practices.
*   **Modular Design:** Clearly separated concerns (source, utilities, tests, benchmarks, docs).
*   **Educational Focus:** Emphasizes understanding the underlying mechanics of heaps and their applications.
*   **Interview-Ready:** Directly addresses common interview questions and provides context for discussion.

## Problem Descriptions

### Problem 1: Kth Largest Element in an Array

**Description:** Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

**Example:**
Input: `nums = [3,2,1,5,6,4], k = 2`
Output: `5`

**Constraints:**
*   `1 <= k <= nums.length <= 10^5`
*   `-10^4 <= nums[i] <= 10^4`

**Heap Approach:** Use a Min-Heap of size `k`. Iterate through the array. For each number, push it to the heap. If the heap size exceeds `k`, pop the smallest element. After iterating through all numbers, the root of the heap will be the `k`th largest element.

### Problem 2: Merge K Sorted Lists

**Description:** You are given an array of `k` linked-lists `lists`, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Example:**
Input: `lists = [[1,4,5],[1,3,4],[2,6]]`
Output: `[1,1,2,3,4,4,5,6]`

**Constraints:**
*   `k == lists.length`
*   `0 <= k <= 10^4`
*   `0 <= lists[i].length <= 500`
*   `-10^4 <= lists[i][j] <= 10^4`
*   `lists[i]` is sorted in ascending order.
*   The total number of nodes in all linked lists will not exceed `10^4`.

**Heap Approach:** Use a Min-Heap to store the current node from each list. Initially, add the head of all non-empty lists to the heap. Repeatedly extract the minimum node from the heap, add it to the merged list, and if the extracted node has a `next` element, add `next` to the heap.

### Problem 3: Find Median from Data Stream

**Description:** The median is the middle value in an ordered integer list. If the size of the list is even, there is no single middle value, and the median is typically the average of the two middle values.
Implement the `MedianFinder` class:
*   `MedianFinder()` initializes the `MedianFinder` object.
*   `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
*   `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

**Example:**
```
MedianFinder mf = new MedianFinder();
mf.addNum(1);    // arr = [1]
mf.addNum(2);    // arr = [1, 2]
mf.findMedian(); // return 1.5 (left middle (1) + right middle (2)) / 2
mf.addNum(3);    // arr = [1, 2, 3]
mf.findMedian(); // return 2.0
```

**Constraints:**
*   `-10^5 <= num <= 10^5`
*   There will be at least one element in the data structure before calling `findMedian`.
*   At most `5 * 10^4` calls will be made to `addNum` and `findMedian`.

**Heap Approach:** Maintain two heaps: a Max-Heap for the lower half of numbers (`max_heap_low`) and a Min-Heap for the upper half (`min_heap_high`).
*   `max_heap_low` stores elements less than or equal to the median, ensuring its top is the largest element in the lower half.
*   `min_heap_high` stores elements greater than or equal to the median, ensuring its top is the smallest element in the upper half.
The heaps are kept balanced such that their sizes differ by at most 1.

### Problem 4: Top K Frequent Elements

**Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Example:**
Input: `nums = [1,1,1,2,2,3], k = 2`
Output: `[1,2]`

**Constraints:**
*   `1 <= nums.length <= 10^5`
*   `-10^4 <= nums[i] <= 10^4`
*   `k` is in the range `[1, the number of unique elements in the array]`.
*   It is guaranteed that the answer is unique.

**Heap Approach:**
1.  Count the frequency of each number using a hash map.
2.  Use a Min-Heap to store pairs of `(frequency, number)`.
3.  Iterate through the frequency map. For each `(freq, num)` pair, push it to the min-heap.
4.  If the heap's size exceeds `k`, pop the element with the smallest frequency (which is at the top of the min-heap).
5.  After processing all frequencies, the heap will contain the `k` elements with the highest frequencies. Extract them.

---

## How to Build and Run

### Prerequisites

*   C++17 compatible compiler (e.g., g++-7 or higher, Clang)
*   CMake (version 3.10 or higher)
*   Google Test (will be fetched by CMake)
*   Google Benchmark (will be fetched by CMake)

### Building

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/HeapOperationsProject.git
    cd HeapOperationsProject
    ```
2.  Create a build directory and navigate into it:
    ```bash
    mkdir build
    cd build
    ```
3.  Configure the project with CMake:
    ```bash
    cmake ..
    ```
4.  Build the project:
    ```bash
    cmake --build .
    ```

### Running Tests

After building, you can run the unit tests:
```bash
./bin/heap_tests
```

### Running Benchmarks

After building, you can run the performance benchmarks:
```bash
./bin/heap_benchmarks
```

## Documentation

The `docs/` directory contains detailed explanations:

*   **`docs/algorithm_explanation.md`**: Deep dive into Heap data structure, its operations, and the rationale behind the solutions.
*   **`docs/diagrams.txt`**: ASCII art illustrations of heap structure and concepts.
*   **`docs/interview_tips.md`**: Advice for interviews, common variations, and points to discuss.

## Contributing

Feel free to open issues or submit pull requests to improve the project!

## License

This project is licensed under the MIT License - see the LICENSE file for details (though no explicit LICENSE file is generated here, MIT is a good default for open-source projects).