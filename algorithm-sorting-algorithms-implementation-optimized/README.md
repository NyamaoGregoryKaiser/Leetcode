# Sorting Algorithms Interview Project

Welcome to the Sorting Algorithms Interview Project! This repository is designed to be a comprehensive resource for mastering sorting algorithms and related problems commonly encountered in coding interviews.

## Project Goal

The primary goal of this project is to provide:
1.  **Core Sorting Algorithm Implementations**: Deep understanding of algorithms like Quicksort and Mergesort.
2.  **Problem-Solving with Sorting**: Apply sorting techniques to solve common interview problems.
3.  **Multiple Approaches**: Explore brute-force, optimized, and alternative solutions for each problem.
4.  **Detailed Analysis**: Understand time and space complexity, edge cases, and trade-offs.
5.  **Robust Testing**: Ensure correctness with comprehensive unit tests.
6.  **Performance Benchmarking**: Compare the efficiency of different algorithms and approaches.
7.  **Interview Preparation**: Gain insights into common interview questions, variations, and tips.

## Project Structure

```
sorting_interview_project/
├── README.md                          # You are here! Project overview.
├── ALGORITHMS.md                      # Detailed explanations of algorithms, ASCII diagrams, edge cases.
├── core_algorithms/                   # Main implementation files for each problem.
│   ├── quicksort_mergesort.py         # Problem 1: Quicksort, Mergesort implementations.
│   ├── kth_largest_element.py         # Problem 2: Kth Largest Element using Quickselect, Heap, Sorting.
│   ├── sort_colors.py                 # Problem 3: Dutch National Flag (Sort Colors) problem.
│   └── merge_intervals.py             # Problem 4: Merge Overlapping Intervals.
├── tests/                             # Unit tests for all problems using unittest.
│   ├── test_quicksort_mergesort.py
│   ├── test_kth_largest_element.py
│   ├── test_sort_colors.py
│   └── test_merge_intervals.py
├── utils/                             # Helper utilities.
│   └── array_generator.py             # Functions to generate various test arrays.
├── benchmarks/                        # Performance benchmarking scripts.
│   └── benchmark_all.py               # Compares different solutions and algorithms.
└── resources/
    └── interview_notes.md             # Tips for interviewing, common variations, and follow-up questions.
```

## Problems Covered

### Problem 1: Implement Quicksort & Mergesort
*   **Description**: Implement two fundamental comparison-based sorting algorithms: Quicksort and Mergesort.
*   **Approaches**:
    *   **Quicksort**: In-place, recursive, with Lomuto partition scheme and Hoare partition scheme variations. Discuss pivot selection strategies.
    *   **Mergesort**: Out-of-place, recursive. Discuss space complexity trade-offs.
*   **Complexity**:
    *   Quicksort: Average O(N log N) time, Worst O(N^2) time. O(log N) space (recursive stack) or O(N) worst-case.
    *   Mergesort: O(N log N) time, O(N) space.

### Problem 2: Kth Largest Element in an Array
*   **Description**: Find the Kth largest element in an unsorted array.
*   **Approaches**:
    *   **Optimal (Quickselect)**: Average O(N) time, worst O(N^2) time. Modifies Quicksort's partitioning logic.
    *   **Min-Heap**: O(N log K) time, O(K) space.
    *   **Sorting**: O(N log N) time, O(1) or O(N) space depending on sort implementation. (Brute Force)
*   **Complexity**: Varies by approach as described above.

### Problem 3: Sort Colors (Dutch National Flag Problem)
*   **Description**: Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. Use integers 0, 1, and 2 to represent red, white, and blue, respectively.
*   **Approaches**:
    *   **Optimal (Dutch National Flag Algorithm)**: O(N) time, O(1) space, single pass.
    *   **Counting Sort**: O(N) time, O(K) space (where K is number of colors, 3 here). (Alternative/Brute-force in terms of space)
    *   **Standard Sort**: O(N log N) time, O(1) or O(N) space.
*   **Complexity**: Varies by approach.

### Problem 4: Merge Intervals
*   **Description**: Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
*   **Approach**:
    *   **Optimal**: Sort intervals by start time, then iterate and merge. O(N log N) time, O(N) space (for result).
    *   **Naive (without initial sort)**: O(N^2) time.
*   **Complexity**: Varies by approach.

## How to Run

### Setup
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/sorting_interview_project.git
    cd sorting_interview_project
    ```
2.  **Python Environment**: Ensure you have Python 3.7+ installed. Virtual environment is recommended:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: `venv\Scripts\activate`
    ```

### Running Tests
To run all unit tests:
```bash
python -m unittest discover tests
```
Or, to run tests for a specific problem, e.g., Quicksort/Mergesort:
```bash
python -m unittest tests.test_quicksort_mergesort
```

### Running Benchmarks
To execute the performance benchmarks:
```bash
python benchmarks/benchmark_all.py
```

### Reading Documentation
Open `ALGORITHMS.md` and `resources/interview_notes.md` in a Markdown viewer or directly in your browser if hosted.

## Contributions

Feel free to open issues or submit pull requests for improvements, additional problems, or alternative solutions!

---