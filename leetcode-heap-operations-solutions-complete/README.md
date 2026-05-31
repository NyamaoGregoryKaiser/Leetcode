# Heap Operations Coding Interview Project

This project is a comprehensive resource for mastering Heap operations, tailored for coding interview preparation. It covers several classic problems, providing optimal solutions, alternative approaches, detailed complexity analysis, and extensive supporting materials.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Problem Descriptions](#problem-descriptions)
4.  [Project Structure](#project-structure)
5.  [Setup and Usage](#setup-and-usage)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Exploring Solutions](#exploring-solutions)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

Heaps are essential data structures in computer science, frequently appearing in coding interviews due to their efficiency in managing priority queues, finding K-th elements, merging sorted collections, and more. This project aims to provide a deep dive into using heaps effectively, showcasing various patterns and problem-solving techniques.

## Features

*   **Multiple Heap Problems:** 4 classic and common heap interview problems.
*   **Optimal Solutions:** Python implementations using built-in `heapq` and custom `MinHeap`/`MaxHeap` classes.
*   **Detailed Explanations:** In-depth comments within code and a dedicated `algorithms_explained.md` document with ASCII diagrams.
*   **Complexity Analysis:** Time and space complexity for all solutions.
*   **Extensive Test Cases:** Robust unit tests to ensure correctness, covering edge cases.
*   **Performance Benchmarking:** Scripts to compare the performance of different approaches.
*   **Brute Force / Alternative Solutions:** Demonstrates why heap-based solutions are often superior.
*   **Memory Efficiency:** Discusses and illustrates memory considerations.
*   **Interview Tips:** A dedicated document with strategies, common variations, and follow-up questions.

## Problem Descriptions

Here's a brief overview of the problems addressed in this project. For detailed explanations, refer to `docs/algorithms_explained.md`.

1.  **Kth Largest Element in a Stream**
    *   Design a class that finds the `k`th largest element in a stream of integers.
    *   *Concept:* Maintain a min-heap of size `k`.

2.  **Merge K Sorted Lists**
    *   Merge `k` sorted linked lists into one sorted linked list.
    *   *Concept:* Use a min-heap to keep track of the smallest element from each list.

3.  **Find Median from Data Stream**
    *   Design a class that supports the following two operations:
        *   `addNum(int num)`: Adds an integer number from the data stream to the data structure.
        *   `findMedian()`: Returns the median of all elements so far.
    *   *Concept:* Use two heaps (a max-heap for the lower half and a min-heap for the upper half) to maintain balance.

4.  **Top K Frequent Elements**
    *   Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
    *   *Concept:* Use a hash map to count frequencies, then a min-heap to efficiently find the top `k`.

## Project Structure

```
heap_operations_project/
├── README.md                           # This file
├── src/                                # Source code for algorithms and data structures
│   ├── __init__.py                     # Makes `src` a Python package
│   ├── min_heap.py                     # Custom MinHeap implementation
│   ├── max_heap.py                     # Custom MaxHeap implementation
│   ├── heap_problems.py                # Main algorithms solving the problems
│   └── utils.py                        # General utilities
├── tests/                              # Unit tests for the solutions
│   ├── __init__.py
│   └── test_heap_problems.py
├── docs/                               # Documentation files
│   ├── algorithms_explained.md         # Detailed problem analysis, solutions, diagrams
│   └── interview_tips.md               # Interview strategies and advice
├── benchmarking/                       # Performance benchmarking scripts
│   └── benchmark_heap_problems.py
└── extra_implementations/              # Alternative, less optimal, or memory-focused implementations
    ├── brute_force_solutions.py        # Brute-force approaches for comparison
    └── memory_efficient_versions.py    # Demonstrations of memory considerations
```

## Setup and Usage

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/heap_operations_project.git
    cd heap_operations_project
    ```
    (Replace `your-username` with the actual path if you're cloning from a different source.)

2.  **Ensure Python is installed:** This project uses Python 3.x.

### Running Tests

To run all unit tests for the implemented problems:

```bash
python -m unittest discover -s tests
```

This will execute `tests/test_heap_problems.py` and report the results.

### Running Benchmarks

To run performance benchmarks:

```bash
python benchmarking/benchmark_heap_problems.py
```

This script will compare the performance of optimal heap solutions against naive or less efficient approaches for selected problems.

### Exploring Solutions

All core problem solutions are located in `src/heap_problems.py`. You can examine the code directly, including detailed comments and complexity analysis.

For an interactive session, you can open a Python interpreter from the project root and import the solutions:

```python
from src.heap_problems import KthLargestInStream, MergeKSortedLists, MedianFinder, TopKFrequentElements

# Example for Kth Largest
k_largest = KthLargestInStream(3, [4, 5, 8, 2])
print(k_largest.add(3)) # Output: 4
print(k_largest.add(5)) # Output: 5
print(k_largest.add(10)) # Output: 5
print(k_largest.add(9)) # Output: 8
print(k_largest.add(4)) # Output: 8
```

## Documentation

*   **`docs/algorithms_explained.md`**: This document provides a deep dive into each problem, explaining the problem statement, various approaches (including brute force), the optimal heap-based solution, the rationale behind it, and illustrative ASCII diagrams. It also covers important edge cases and potential "gotchas".
*   **`docs/interview_tips.md`**: Here, you'll find general advice for approaching heap problems in interviews. This includes how to identify when a heap is suitable, strategies for communicating your thought process, common follow-up questions, and memory considerations.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Suggestions for new problems, alternative solutions, better explanations, or more comprehensive tests are always welcome!

## License

This project is open-sourced under the MIT License. See the `LICENSE` file (if present, otherwise assume MIT) for more details.