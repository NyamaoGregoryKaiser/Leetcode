# Heap Operations Interview Project

This project is a comprehensive guide and practice ground for mastering Heap operations, a fundamental data structure frequently encountered in coding interviews. It provides optimized solutions to various problems, alternative approaches, extensive testing, performance benchmarking, and detailed documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Setup and Installation](#setup-and-installation)
3.  [Core Problems and Algorithms](#core-problems-and-algorithms)
    *   [Problem 1: Kth Largest Element in an Array](#problem-1-kth-largest-element-in-an-array)
    *   [Problem 2: Merge K Sorted Lists](#problem-2-merge-k-sorted-lists)
    *   [Problem 3: Top K Frequent Elements](#problem-3-top-k-frequent-elements)
    *   [Problem 4: Find Medians in a Data Stream](#problem-4-find-medians-in-a-data-stream)
    *   [Problem 5: Smallest Range Covering Elements from K Lists](#problem-5-smallest-range-covering-elements-from-k-lists)
4.  [Supporting Files](#supporting-files)
    *   [Custom Heap Implementations](#custom-heap-implementations)
    *   [Brute Force / Alternative Solutions](#brute-force--alternative-solutions)
    *   [Memory-Efficient Considerations](#memory-efficient-considerations)
5.  [Testing](#testing)
6.  [Performance Benchmarking](#performance-benchmarking)
7.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Heap Visualizations](#heap-visualizations)
    *   [Interview Tips](#interview-tips)

## Project Overview

The goal of this project is to provide a holistic understanding of heaps for interview preparation. It includes:
*   **Optimal Heap Solutions:** Python implementations using `heapq` and custom heap classes.
*   **Multiple Approaches:** Discussion and implementation of alternative (e.g., sorting-based) solutions for comparison.
*   **Detailed Explanations:** Comments within code and dedicated documentation files.
*   **Comprehensive Testing:** Unit tests covering various scenarios, including edge cases.
*   **Performance Analysis:** Benchmarking code to demonstrate the efficiency gains of heap-based solutions.
*   **Interview Resources:** Tips, common questions, and visual aids.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/heap_operations_project.git
    cd heap_operations_project
    ```
    (Note: Replace `https://github.com/your-username/heap_operations_project.git` with your actual repository URL if you host this project.)

2.  **Create a virtual environment (recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Core Problems and Algorithms

All main heap-based solutions are located in `algorithms/heap_problems.py`.

### Problem 1: Kth Largest Element in an Array

**Description:** Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array. Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

**Example:**
`nums = [3,2,1,5,6,4], k = 2` -> `Output: 5`
`nums = [3,2,3,1,2,4,5,5,6], k = 4` -> `Output: 4`

**Approach:** Use a min-heap to keep track of the `k` largest elements seen so far. If the heap size exceeds `k`, remove the smallest element (root of min-heap).

### Problem 2: Merge K Sorted Lists

**Description:** You are given an array of `k` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Example:**
`lists = [[1,4,5],[1,3,4],[2,6]]` -> `Output: [1,1,2,3,4,4,5,6]`

**Approach:** Use a min-heap to store the smallest element from each of the `k` lists. Repeatedly extract the minimum, add it to the result list, and push the next element from the same list back into the heap.

### Problem 3: Top K Frequent Elements

**Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

**Example:**
`nums = [1,1,1,2,2,3], k = 2` -> `Output: [1,2]`
`nums = [1], k = 1` -> `Output: [1]`

**Approach:** First, count frequencies using a hash map. Then, use a min-heap to maintain the `k` elements with the highest frequencies. The heap stores `(frequency, number)` pairs. If the heap size exceeds `k`, pop the element with the smallest frequency.

### Problem 4: Find Medians in a Data Stream

**Description:** The median is the middle value in an ordered integer list. If the size of the list is even, there is no single middle value, and the median is the average of the two middle values. Implement `MedianFinder` class:
*   `MedianFinder()` initializes the `MedianFinder` object.
*   `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
*   `double findMedian()` returns the median of all elements so far.

**Example:**
`MedianFinder mf = new MedianFinder();`
`mf.addNum(1);`    // arr = [1]
`mf.addNum(2);`    // arr = [1, 2]
`mf.findMedian();` // return 1.5 (average of (1, 2))
`mf.addNum(3);`    // arr = [1, 2, 3]
`mf.findMedian();` // return 2.0

**Approach:** Maintain two heaps: a max-heap for the smaller half of the numbers and a min-heap for the larger half. Ensure the sizes are balanced (differ by at most 1). The median can then be derived from the roots of these heaps.

### Problem 5: Smallest Range Covering Elements from K Lists

**Description:** You have `k` lists of sorted integers. Find the smallest range that includes at least one number from each of the `k` lists. We define the range `[a,b]` as smaller than range `[c,d]` if `b-a < d-c` or `a < c` if `b-a == d-c`.

**Example:**
`nums = [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]` -> `Output: [20,24]`

**Approach:** Use a min-heap to store the current minimum element from each list, along with its list index and its index within that list. Keep track of the current maximum element among those in the heap. Repeatedly extract the minimum, update the range if it's smaller, and add the next element from the same list into the heap, updating the overall maximum.

## Supporting Files

### Custom Heap Implementations
- `utils/max_heap.py`: A custom implementation of a Max-Heap. This is useful for understanding the underlying mechanics of heaps without relying solely on `heapq` (which is a min-heap).
- `utils/min_heap.py`: A custom implementation of a Min-Heap. While Python's `heapq` provides this functionality, this custom version helps illustrate the principles.

### Brute Force / Alternative Solutions
- `algorithms/brute_force_alternatives.py`: Contains alternative, often less optimal, solutions for some problems (e.g., sorting-based approaches). These are useful for comparing efficiency and understanding why heap solutions are preferred.

### Memory-Efficient Considerations
- `algorithms/memory_efficient.py`: Discusses how heap-based solutions often provide good memory efficiency (e.g., storing only `k` elements instead of the entire array for `Kth Largest`).

## Testing

To run all unit tests:
```bash
python -m unittest discover tests
```
Or, to run a specific test file:
```bash
python -m unittest tests.test_heap_problems
```

The tests cover various inputs, including empty lists, single elements, duplicates, negative numbers, and large datasets to ensure robustness.

## Performance Benchmarking

To run the performance benchmarks:
```bash
python benchmarks/performance_benchmark.py
```

This script compares the execution time of heap-based solutions against their brute-force or simpler counterparts for selected problems, demonstrating the efficiency gains of using heaps.

## Documentation

The `docs/` directory contains detailed explanations and resources:

### Algorithm Explanation
- `docs/algorithm_explanation.md`: Provides a detailed theoretical background on heaps, their properties (min-heap, max-heap), and step-by-step explanations of the algorithms implemented for each problem.

### Heap Visualizations
- `docs/heap_visuals.md`: Contains ASCII art diagrams illustrating the structure of heaps and the operations (insertion, deletion) performed on them.

### Interview Tips
- `docs/interview_tips.md`: Offers advice on how to approach heap problems in an interview, common pitfalls, important edge cases to consider, and variations of standard problems.

---

This project aims to be a comprehensive resource for anyone looking to master heap operations for technical interviews. Good luck!

---