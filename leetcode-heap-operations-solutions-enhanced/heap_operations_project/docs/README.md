```markdown
# Heap Operations Interview Project

This project is a comprehensive guide and implementation for common Heap-related problems encountered in coding interviews. It aims to provide multiple approaches, detailed complexity analysis, thorough testing, and performance benchmarking for each problem.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Problem Set](#problem-set)
4.  [Setup and Build](#setup-and-build)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Interview Guide](#interview-guide)

---

## 1. Project Structure

```
heap_operations_project/
├── src/
│   ├── custom_heap.h               # Custom Min/Max Heap implementation (template-based)
│   └── main_heap_problems.cpp      # Main problem solutions
├── tests/
│   └── test_heap_problems.cpp      # Unit tests using Catch2
├── docs/
│   ├── README.md                   # Project overview and setup guide (this file)
│   ├── ALGORITHM_EXPLANATION.md    # Detailed algorithm explanations with ASCII diagrams
│   └── INTERVIEW_GUIDE.md          # Interview tips, variations, edge cases
├── benchmarking/
│   └── benchmark_heap_problems.cpp # Performance benchmarking using Google Benchmark
├── .gitignore                      # Git ignore file
└── CMakeLists.txt                  # CMake build configuration
```

---

## 2. Features

*   **Custom Heap Implementation**: A generic `MinHeap` and `MaxHeap` class built from scratch using `std::vector`, demonstrating a deep understanding of heap data structures.
*   **Multiple Solution Approaches**: For each problem, various solutions are provided, ranging from brute force to optimal heap-based solutions, and sometimes alternative optimal algorithms like Quickselect.
*   **Detailed Comments & Complexity Analysis**: Each function includes comments explaining its logic, time complexity, and space complexity.
*   **Extensive Unit Tests**: Uses the Catch2 framework to ensure correctness with a wide range of test cases, including edge cases.
*   **Performance Benchmarking**: Leverages Google Benchmark to compare the performance of different algorithms across varying input sizes.
*   **Comprehensive Documentation**: Dedicated Markdown files explain heap concepts, algorithm details, and provide interview preparation tips.

---

## 3. Problem Set

The project covers the following heap-related problems:

1.  **Kth Largest Element in an Array**:
    *   Finds the k-th largest element in an unsorted array.
    *   Approaches: Sorting, `std::priority_queue` (Min-Heap), Custom Min-Heap, Quickselect (`std::nth_element`).
2.  **Merge K Sorted Lists**:
    *   Merges `k` sorted linked lists into a single sorted linked list.
    *   Approaches: Brute Force (collect all, then sort), `std::priority_queue` (Min-Heap), Custom Min-Heap, Divide and Conquer.
3.  **Find Median from Data Stream**:
    *   Designs a data structure that supports adding numbers and finding the median of the numbers added so far.
    *   Approaches: Two Heaps (Max-Heap for smaller half, Min-Heap for larger half) using `std::priority_queue` and Custom Heaps.
4.  **Top K Frequent Elements**:
    *   Returns the `k` most frequent elements from a given array.
    *   Approaches: Frequency Map + Sorting, Frequency Map + `std::priority_queue` (Min-Heap), Frequency Map + Custom Min-Heap.

---

## 4. Setup and Build

### Prerequisites

*   **CMake**: Version 3.10 or higher.
*   **C++ Compiler**: C++17 compatible (e.g., g++-7 or newer, Clang-5 or newer, MSVC 2017 or newer).
*   **Catch2**: Testing framework (included as a submodule, or can be installed system-wide).
*   **Google Benchmark**: Performance benchmarking library (included as a submodule).

### Building the Project

1.  **Clone the repository:**
    ```bash
    git clone --recurse-submodules https://github.com/your_username/heap_operations_project.git
    cd heap_operations_project
    ```
    (Note: Replace `https://github.com/your_username/heap_operations_project.git` with the actual repository URL if you host this project.)

2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```

3.  **Configure CMake and build:**
    ```bash
    cmake .. -DCMAKE_BUILD_TYPE=Release # Or Debug
    cmake --build .
    ```
    This will compile the `test_heap_problems` and `benchmark_heap_problems` executables.

### Running Tests

After building, navigate to the `build` directory and run the test executable:

```bash
cd build
./tests/test_heap_problems
```

You should see output indicating all tests passed.

### Running Benchmarks

After building, navigate to the `build` directory and run the benchmark executable:

```bash
cd build
./benchmarking/benchmark_heap_problems
```

The output will show performance metrics for different algorithms and input sizes. You can filter benchmarks using `google-benchmark` command line options (e.g., `./benchmarking/benchmark_heap_problems --benchmark_filter=KthLargest`).

---

## 5. Documentation

Detailed documentation is provided in the `docs/` directory.

### Algorithm Explanation (`docs/ALGORITHM_EXPLANATION.md`)

This document explains:
*   What a Heap is (Min-Heap, Max-Heap).
*   How basic heap operations (insert, extract-min/max, heapify) work.
*   Why heaps are suitable for the problems in this project.
*   Detailed walkthroughs of the optimal solutions with ASCII diagrams.

### Interview Guide (`docs/INTERVIEW_GUIDE.md`)

This document offers:
*   General tips for approaching heap problems in an interview.
*   Common edge cases and how to handle them.
*   Potential variations or follow-up questions for each problem.
*   Discussion points on brute-force vs. optimized solutions and their trade-offs.
```