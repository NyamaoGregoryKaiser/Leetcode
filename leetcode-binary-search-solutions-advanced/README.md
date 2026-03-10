# Binary Search Project

This project provides a comprehensive deep dive into Binary Search, a fundamental algorithm widely used in computer science and a common topic in coding interviews. It covers various problems, optimal solutions, alternative approaches, detailed explanations, testing, and performance benchmarking.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Installation and Setup](#installation-and-setup)
3.  [Main Algorithms & Problems](#main-algorithms--problems)
    *   [Problem 1: Standard Binary Search](#problem-1-standard-binary-search)
    *   [Problem 2: Search in Rotated Sorted Array](#problem-2-search-in-rotated-sorted-array)
    *   [Problem 3: Find First and Last Position of Element in Sorted Array](#problem-3-find-first-and-last-position-of-element-in-sorted-array)
    *   [Problem 4: Sqrt(x)](#problem-4-sqrtx)
    *   [Problem 5: Find Peak Element](#problem-5-find-peak-element)
4.  [Additional Implementations](#additional-implementations)
5.  [Testing](#testing)
6.  [Benchmarking](#benchmarking)
7.  [Documentation](#documentation)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Structure

```
binary_search_project/
├── main_algorithms/                    # Core optimal implementations of various binary search problems
│   ├── simple_binary_search.py
│   ├── rotated_sorted_array.py
│   ├── find_first_last_position.py
│   ├── sqrt_x.py
│   └── peak_element.py
├── tests/                              # Unit tests for all algorithms using pytest
│   ├── test_simple_binary_search.py
│   ├── test_rotated_sorted_array.py
│   ├── test_find_first_last_position.py
│   ├── test_sqrt_x.py
│   └── test_peak_element.py
├── docs/                               # Comprehensive documentation for binary search
│   ├── algorithm_explanation.md        # General explanation of Binary Search
│   ├── binary_search_diagrams.md       # ASCII diagrams
│   ├── edge_cases_gotchas.md           # Common pitfalls and edge cases
│   └── interview_tips.md               # Strategies for interview success
├── benchmarking/                       # Code for performance comparison
│   ├── benchmark_all.py                # Script to run all benchmarks
│   └── utils.py                        # Helper utilities for timing
├── additional_implementations/         # Alternative (e.g., recursive, brute-force) implementations
│   ├── simple_binary_search_recursive.py
│   ├── simple_binary_search_bruteforce.py
│   └── sqrt_x_bruteforce.py
├── .gitignore                          # Standard git ignore file
├── README.md                           # Project overview (this file)
└── requirements.txt                    # Python dependencies
```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary_search_project.git
    cd binary_search_project
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Main Algorithms & Problems

This section describes the core binary search problems and their optimal solutions provided in `main_algorithms/`.

### Problem 1: Standard Binary Search
*   **File:** `main_algorithms/simple_binary_search.py`
*   **Description:** Given a sorted array of integers and a target value, return the index of the target if it exists, otherwise return -1.
*   **Approach:** Iterative Binary Search.
*   **Time Complexity:** O(log N)
*   **Space Complexity:** O(1)

### Problem 2: Search in Rotated Sorted Array
*   **File:** `main_algorithms/rotated_sorted_array.py`
*   **Description:** Given a sorted array that has been rotated at some pivot unknown to you beforehand (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`), search for a given target value. If it exists, return its index, otherwise return -1.
*   **Approach:** Modified Binary Search to handle the pivot point.
*   **Time Complexity:** O(log N)
*   **Space Complexity:** O(1)

### Problem 3: Find First and Last Position of Element in Sorted Array
*   **File:** `main_algorithms/find_first_last_position.py`
*   **Description:** Given a sorted array with potentially duplicate elements, find the starting and ending position of a given target value. If the target is not found, return `[-1, -1]`.
*   **Approach:** Two modified Binary Search calls: one to find the first occurrence and another to find the last occurrence.
*   **Time Complexity:** O(log N)
*   **Space Complexity:** O(1)

### Problem 4: Sqrt(x)
*   **File:** `main_algorithms/sqrt_x.py`
*   **Description:** Implement `int sqrt(int x)`. Compute and return the square root of `x`. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
*   **Approach:** Binary Search on the range `[0, x]` (or `[0, x/2 + 1]`) for the answer.
*   **Time Complexity:** O(log X)
*   **Space Complexity:** O(1)

### Problem 5: Find Peak Element
*   **File:** `main_algorithms/peak_element.py`
*   **Description:** A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that `nums[-1] = nums[n] = -∞`.
*   **Approach:** Binary Search where the decision to move left or right is based on the slope.
*   **Time Complexity:** O(log N)
*   **Space Complexity:** O(1)

## Additional Implementations

The `additional_implementations/` directory contains alternative ways to solve some of the problems, often for comparison against the optimized binary search approaches.

*   `simple_binary_search_recursive.py`: A recursive version of the standard binary search. (O(log N) time, O(log N) space due to recursion stack).
*   `simple_binary_search_bruteforce.py`: A linear search implementation for comparison with binary search. (O(N) time, O(1) space).
*   `sqrt_x_bruteforce.py`: A linear scan approach to finding the integer square root. (O(sqrt(X)) time, O(1) space).

## Testing

Tests are written using `pytest`. To run all tests:

```bash
pytest tests/
```

You can also run tests for a specific problem, e.g.:

```bash
pytest tests/test_simple_binary_search.py
```

## Benchmarking

The `benchmarking/` directory contains scripts to measure the performance of different implementations.

To run benchmarks:

```bash
python benchmarking/benchmark_all.py
```

This script will compare:
*   Iterative Binary Search vs. Recursive Binary Search
*   Binary Search vs. Linear Search for finding an element
*   Binary Search Sqrt vs. Brute-force Sqrt

## Documentation

The `docs/` directory provides in-depth explanations and resources:

*   **`algorithm_explanation.md`**: A general overview of Binary Search, its prerequisites, and why it's efficient.
*   **`binary_search_diagrams.md`**: Visual (ASCII art) diagrams to illustrate the binary search process.
*   **`edge_cases_gotchas.md`**: Discusses common pitfalls, off-by-one errors, and how to handle various edge cases (empty arrays, single elements, duplicates).
*   **`interview_tips.md`**: Guidance on how to approach binary search problems in an interview, what interviewers look for, and common variations.

## Contributing

Feel free to contribute to this project by:
*   Adding more binary search problems.
*   Providing alternative solutions or more optimized ones.
*   Improving documentation or adding more diagrams.
*   Expanding test cases or benchmarks.

Please follow standard pull request guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file (not included here for brevity, but would be standard MIT license) for details.