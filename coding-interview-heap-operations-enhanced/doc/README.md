```markdown
# Heap Operations Project

This project is a comprehensive guide and implementation for various algorithms involving Heap data structures, primarily aimed at coding interview preparation. It covers custom heap implementations, common problems, multiple solution approaches, detailed explanations, and performance benchmarking.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Build and Run](#build-and-run)
4.  [Core Problems Implemented](#core-problems-implemented)
5.  [Custom Heap Implementation](#custom-heap-implementation)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
HeapOperationsProject/
├── src/
│   ├── heap_operations.hpp         // Custom MinHeap/MaxHeap implementation
│   └── main_algorithms.cpp         // Main algorithm implementations for problems
├── test/
│   ├── test_heap_operations.cpp    // Tests for custom heap implementation
│   └── test_main_algorithms.cpp    // Tests for main algorithm solutions
├── doc/
│   ├── README.md                   // Main project README (this file)
│   ├── ALGORITHM_EXPLANATION.md    // Detailed algorithm explanations, ASCII diagrams
│   └── INTERVIEW_TIPS.md           // Interview tips, variations, edge cases
├── benchmark/
│   └── benchmark_algorithms.cpp    // Performance benchmarking code
├── utils/
│   └── data_generator.hpp          // Utility to generate test data
├── build.sh                        // Simple script to build the project
└── run.sh                          // Simple script to run tests and benchmarks
```

## Features

*   **Custom Heap Implementations:** Generic `MinHeap` and `MaxHeap` classes using `std::vector`.
*   **Multiple Problem Solutions:** Demonstrates various approaches (custom heap, `std::priority_queue`, brute-force) for classic heap problems.
*   **Detailed Comments:** In-code explanations for logic, time, and space complexity.
*   **Comprehensive Testing:** Unit tests for custom heaps and problem solutions with diverse test cases.
*   **Performance Benchmarking:** Tools to measure and compare the efficiency of different algorithms.
*   **Rich Documentation:**
    *   **`ALGORITHM_EXPLANATION.md`**: In-depth explanations of heap concepts, implementation details, and problem-solving strategies with ASCII diagrams.
    *   **`INTERVIEW_TIPS.md`**: Practical advice for interviews, common variations, and edge cases.

## Build and Run

To build and run the entire project, navigate to the root directory `HeapOperationsProject/` and execute the provided shell scripts:

1.  **Build:**
    ```bash
    ./build.sh
    ```
    This will create an executable for heap tests, algorithm tests, and benchmarks in the `build/` directory.

2.  **Run:**
    ```bash
    ./run.sh
    ```
    This will execute:
    *   Tests for the custom heap implementation.
    *   Tests for the main algorithm solutions.
    *   Performance benchmarks comparing different approaches.

    You should see output indicating test successes/failures and benchmark results.

## Core Problems Implemented

The `src/main_algorithms.cpp` file contains solutions for the following problems:

1.  **Kth Largest Element in a Stream**
    *   **Description:** Design a class to find the k-th largest element in a stream.
    *   **Approaches:** Using `MinHeap` (custom and `std::priority_queue`).

2.  **Merge K Sorted Lists**
    *   **Description:** Merge k sorted linked lists into one sorted linked list.
    *   **Approaches:** Using `MinHeap` (custom and `std::priority_queue`), and a brute-force approach for comparison.

3.  **Find Median from Data Stream**
    *   **Description:** Design a data structure that supports adding new numbers and finding the median of all numbers added so far.
    *   **Approaches:** Using two heaps (`MaxHeap` for lower half, `MinHeap` for upper half - both custom and `std::priority_queue`).

4.  **Top K Frequent Elements**
    *   **Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
    *   **Approaches:** Using a `MinHeap` (custom and `std::priority_queue`) to keep track of top `k` frequencies.

## Custom Heap Implementation

The `src/heap_operations.hpp` file contains a generic `MinHeap` and `MaxHeap` implementation. These classes provide:
*   `push(T value)`: Adds an element.
*   `pop()`: Removes the top element.
*   `top()`: Returns the top element.
*   `size()`: Returns the number of elements.
*   `empty()`: Checks if the heap is empty.

These custom implementations are used in the problem solutions to demonstrate a fundamental understanding of heap data structures.

## Documentation

*   **`doc/ALGORITHM_EXPLANATION.md`**: Provides a theoretical background on binary heaps, detailed explanations of the custom `MinHeap`/`MaxHeap` internal workings (heapify-up, heapify-down), and step-by-step logic for each problem's heap-based solution, often with illustrative ASCII diagrams.

*   **`doc/INTERVIEW_TIPS.md`**: Offers practical advice for tackling heap-related interview questions, including common patterns, variations, critical edge cases to consider, and memory efficiency discussions.

## Contributing

Feel free to fork this repository, add more heap-related problems, alternative solutions, or improve existing explanations/tests.

## License

This project is open-source and available under the MIT License. See the LICENSE file for more details (not explicitly created in this output, but implied).
```