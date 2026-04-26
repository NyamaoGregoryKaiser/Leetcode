```markdown
# Sorting Algorithms Interview Project

This project is a comprehensive resource for understanding, implementing, and practicing sorting algorithms, as well as applying them to common coding interview problems. It's designed to be a complete study guide and coding environment.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Running Main Algorithms Demo](#running-main-algorithms-demo)
3.  [Core Sorting Algorithms Implemented](#core-sorting-algorithms-implemented)
4.  [Main Interview Problems](#main-interview-problems)
5.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Interview Tips & Variations](#interview-tips--variations)
    *   [Visual Diagrams](#visual-diagrams)
6.  [Contributing](#contributing)
7.  [License](#license)

## 1. Project Structure

```
sorting_interview_project/
├── CMakeLists.txt              # CMake build configuration
├── src/
│   ├── main_algorithms.cpp     # Solutions to main interview problems
│   ├── helpers.h               # Utility functions (swap, print, test asserts, timer)
│   ├── sort_implementations.cpp# Implementations of core sorting algorithms
│   └── sort_implementations.h  # Header for core sorting algorithms
├── tests/
│   ├── test_main_algorithms.cpp# Unit tests for solutions in main_algorithms.cpp
│   └── test_sort_implementations.cpp# Unit tests for core sorting algorithms
├── benchmark/
│   └── benchmark.cpp           # Performance benchmarking for algorithms and problems
├── docs/
│   ├── README.md               # This file
│   ├── ALGORITHM_EXPLANATIONS.md# Detailed explanations of algorithms
│   ├── INTERVIEW_TIPS.md       # General interview advice and problem variations
│   └── diagrams.txt            # ASCII art diagrams for visualization
└── build/                      # Directory for compiled binaries (created by CMake)
```

## 2. Getting Started

### Prerequisites

*   **C++ Compiler**: A C++17 compatible compiler (e.g., GCC 7+, Clang 5+).
*   **CMake**: Version 3.10 or higher.

### Building the Project

1.  **Clone the repository (if applicable)**:
    ```bash
    # git clone <repository_url>
    # cd sorting_interview_project
    ```
    (For this generated content, you'll just create the files manually in a directory)

2.  **Create a build directory and navigate into it**:
    ```bash
    mkdir build
    cd build
    ```

3.  **Run CMake to configure the project**:
    ```bash
    cmake ..
    ```

4.  **Build the project**:
    ```bash
    make
    ```
    This will compile all executables: `main_algorithms`, `test_sort_implementations`, `test_main_algorithms`, and `benchmark_runner`.

### Running Tests

After building, you can run the test executables:

```bash
./test_sort_implementations
./test_main_algorithms
```

Each test suite will print a summary of passed and failed tests.

### Running Benchmarks

To assess the performance of different algorithms and approaches:

```bash
./benchmark_runner
```

This will output average execution times for various algorithms and problem solutions across different input sizes.

### Running Main Algorithms Demo

The `main_algorithms` executable demonstrates the solutions to the main interview problems with predefined test cases:

```bash
./main_algorithms
```

## 3. Core Sorting Algorithms Implemented

The `src/sort_implementations.cpp` file contains implementations of the following sorting algorithms:

*   **Bubble Sort**: Simplest, O(N^2), in-place.
*   **Selection Sort**: O(N^2), in-place.
*   **Insertion Sort**: O(N^2), O(N) best case, good for nearly sorted arrays, in-place.
*   **Quick Sort**: O(N log N) average, O(N^2) worst, in-place. Uses randomized pivot.
*   **Merge Sort**: O(N log N) always, O(N) space.
*   **Heap Sort**: O(N log N) always, O(1) space (in-place).
*   **QuickSelect**: O(N) average, O(N^2) worst. Used for finding the Kth smallest/largest element.

## 4. Main Interview Problems

The `src/main_algorithms.cpp` file provides solutions to the following common coding interview problems, often demonstrating multiple approaches (brute-force vs. optimized) and complexity analysis:

1.  **Kth Largest Element in an Array (LeetCode 215)**
    *   **Approaches**: QuickSelect (optimal), Min-Heap, Sorting.
2.  **Sort Colors (Dutch National Flag Problem) (LeetCode 75)**
    *   **Approaches**: One-pass (Dutch National Flag - optimal), Two-pass Counting Sort.
3.  **Merge Intervals (LeetCode 56)**
    *   **Approach**: Sort by start time, then iterate and merge (optimal).
4.  **Meeting Rooms II (LeetCode 253)**
    *   **Approaches**: Sort and Min-Heap (optimal), Sweep Line Algorithm (optimal).

## 5. Documentation

The `docs/` directory contains detailed explanations to aid your understanding:

### Algorithm Explanations
*   `ALGORITHM_EXPLANATIONS.md`: Detailed breakdown of each sorting algorithm and the core logic behind the interview problem solutions. Includes pseudocode and complexity analysis.

### Interview Tips & Variations
*   `INTERVIEW_TIPS.md`: Advice on how to approach sorting problems in interviews, common pitfalls, and variations of the problems presented here.

### Visual Diagrams
*   `diagrams.txt`: ASCII art representations to visually explain key concepts like QuickSort partitioning, MergeSort merging, and Heap structure.

## 6. Contributing

Feel free to explore, modify, and expand this project. If you find any issues or have suggestions for improvements, please consider contributing.

## 7. License

This project is open-source and available under the MIT License.
```