# Sorting Algorithms Interview Project

This project is designed to be a comprehensive resource for mastering sorting algorithms and related interview problems. It covers fundamental sorting techniques, common problem patterns, performance analysis, and best practices for interview preparation.

## Project Structure

```
sorting_algorithms_project/
├── README.md                           # This file
├── algorithms/                         # Implementations of core sorting algorithms
│   ├── __init__.py
│   ├── bubble_sort.py
│   ├── selection_sort.py
│   ├── insertion_sort.py
│   ├── merge_sort.py
│   ├── quick_sort.py
│   └── heap_sort.py
├── problems/                           # Common interview problems leveraging sorting
│   ├── __init__.py
│   ├── problem_1_two_sum_sorted.py
│   ├── problem_2_merge_intervals.py
│   ├── problem_3_k_largest_elements.py
│   └── problem_4_sort_colors.py
├── tests/                              # Unit tests for algorithms and problems
│   ├── __init__.py
│   ├── test_sorting_algorithms.py
│   └── test_problems.py
├── utils/                              # Helper utilities (e.g., array generation, timing)
│   ├── __init__.py
│   ├── array_generator.py
│   └── stopwatch.py
├── benchmarks/                         # Performance benchmarking scripts
│   └── benchmark_sorting_algorithms.py
├── docs/                               # Documentation, explanations, and interview tips
│   ├── algorithms_explained.md
│   └── interview_tips.md
└── additional_implementations/         # Advanced/alternative implementations
    ├── __init__.py
    └── quickselect.py                  # Optimized solution for K-largest (Problem 3)
```

## How to Use This Project

1.  **Explore Core Algorithms (`algorithms/`):**
    *   Read the code for each sorting algorithm. Pay attention to comments, logic, and complexity analysis.
    *   Understand the nuances of in-place vs. out-of-place sorting, stability, and various pivot selection strategies for Quick Sort.

2.  **Solve Interview Problems (`problems/`):**
    *   Each problem directory contains different approaches, from brute force to optimal.
    *   Try to solve them on your own first before looking at the solutions.
    *   Understand *why* a particular approach is optimal and its limitations.

3.  **Run Tests (`tests/`):**
    *   Navigate to the `sorting_algorithms_project` directory in your terminal.
    *   Run tests for sorting algorithms: `python -m unittest tests.test_sorting_algorithms`
    *   Run tests for problems: `python -m unittest tests.test_problems`
    *   The tests ensure the correctness of the implementations and cover various edge cases.

4.  **Benchmark Performance (`benchmarks/`):**
    *   Run the benchmarking script: `python benchmarks/benchmark_sorting_algorithms.py`
    *   Observe how different algorithms perform on various data sizes and distributions. This provides practical insight into their theoretical complexities.

5.  **Review Documentation (`docs/`):**
    *   `algorithms_explained.md`: Provides high-level explanations, visual diagrams (ASCII art), and key characteristics of each sorting algorithm.
    *   `interview_tips.md`: Offers general advice, common pitfalls, and strategies for tackling sorting-related interview questions.

6.  **Study Additional Implementations (`additional_implementations/`):**
    *   This section might contain more advanced or highly optimized versions of algorithms, or alternative approaches (e.g., Quickselect for K-th element).
    *   `quickselect.py` provides a dedicated, optimized solution for finding the Kth largest element, directly addressing one of the problems.

## Installation

This project uses standard Python libraries. No special installation is required beyond having Python 3 installed.

```bash
# Clone the repository (if this were a git repo)
# git clone <repository_url>
# cd sorting_algorithms_project

# No specific dependencies needed, just Python 3
python --version
```

---

## Problems Description (from `problems/` directory)

### Problem 1: Two Sum (Sorted Array)
Given an array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the *1-indexed* indices of the two numbers.
*   **Example:** `numbers = [2, 7, 11, 15]`, `target = 9` -> `[1, 2]` (2 + 7 = 9)

### Problem 2: Merge Intervals
Given a collection of intervals, merge all overlapping intervals.
*   An interval `[start, end]` denotes the start and end of an interval.
*   **Example:** `intervals = [[1,3],[2,6],[8,10],[15,18]]` -> `[[1,6],[8,10],[15,18]]` (because [1,3] and [2,6] overlap, they merge to [1,6]).

### Problem 3: Kth Largest Element in an Array
Find the k-th largest element in an unsorted array. Note that it is the k-th largest element in the sorted order, not the k-th distinct element.
*   **Example:** `nums = [3,2,1,5,6,4]`, `k = 2` -> `5` (sorted array would be `[1,2,3,4,5,6]`, 2nd largest is 5).

### Problem 4: Sort Colors (Dutch National Flag Problem)
Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
*   Use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.
*   **Example:** `nums = [2,0,2,1,1,0]` -> `[0,0,1,1,2,2]`

---

This project aims to give you a solid foundation for approaching sorting-related problems in technical interviews. Happy coding!
```