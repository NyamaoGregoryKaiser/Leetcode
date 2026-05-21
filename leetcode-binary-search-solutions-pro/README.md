# Binary Search Interview Project

This project is a comprehensive guide and implementation for mastering Binary Search, a fundamental algorithm often encountered in coding interviews. It covers various problem patterns, optimal solutions, brute-force comparisons, extensive testing, performance benchmarking, and detailed documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Installation and Setup](#installation-and-setup)
3.  [Running Tests](#running-tests)
4.  [Running Benchmarks](#running-benchmarks)
5.  [Problems Covered](#problems-covered)
6.  [Documentation](#documentation)
7.  [Additional Solutions](#additional-solutions)

## Project Structure

The project is organized into several directories to keep different aspects of the implementation separate and clean:

*   `main_algorithms/`: Contains the optimal (binary search) solutions for the core problems.
*   `solutions_bruteforce/`: Provides brute-force (typically linear scan) solutions for comparison.
*   `solutions_recursive/`: Offers recursive implementations for problems where applicable.
*   `tests/`: Holds unit tests using `pytest` for all implemented algorithms.
*   `utils/`: Contains utility functions, such as array generators for testing and benchmarking.
*   `benchmarks/`: Scripts to measure and compare the performance of different solutions.
*   `docs/`: Comprehensive documentation including problem descriptions, algorithm explanations, visual aids, edge cases, and interview tips.
*   `README.md`: This file, providing an overview of the project.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary_search_project.git
    cd binary_search_project
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    (A `requirements.txt` file would typically contain `pytest` and any other specific libraries if needed, though for pure Python, `pytest` is the main one.)

## Running Tests

Tests are written using `pytest`. To run all tests from the project root:

```bash
pytest
```

To run tests for a specific file:

```bash
pytest tests/test_problems.py
```

## Running Benchmarks

Benchmarks are implemented using `time.perf_counter()` to compare the execution time of optimal (binary search) solutions against brute-force methods for varying input sizes.

To run the benchmarks:

```bash
python benchmarks/benchmark_problems.py
```

## Problems Covered

The `main_algorithms/` directory contains optimal solutions for the following problems:

1.  **Standard Binary Search & First/Last Occurrence:**
    *   Find if a target element exists in a sorted array.
    *   Find the first position of a target element in a sorted array (handles duplicates).
    *   Find the last position of a target element in a sorted array (handles duplicates).
    *   Find both the first and last positions.
2.  **Search in Rotated Sorted Array:**
    *   Search for a target in a sorted array that has been rotated at an unknown pivot.
3.  **Find Peak Element:**
    *   Find a peak element in an array where `nums[i] > nums[i-1]` and `nums[i] > nums[i+1]`. The array may contain multiple peaks, and any one of them is acceptable.
4.  **Kth Smallest Element in Sorted Matrix:**
    *   Given an `n x n` matrix where each row and column are sorted in ascending order, find the k-th smallest element in the matrix. (This problem uses binary search on the *answer*).

Detailed descriptions of these problems, along with examples, can be found in `docs/README.md`.

## Documentation

The `docs/` directory provides extensive documentation:

*   **`docs/README.md`**: Detailed problem descriptions, examples, and expected output.
*   **`docs/binary_search_explanation.md`**: A deep dive into how binary search works, its core principles, and the common template.
*   **`docs/visual_diagrams.md`**: ASCII art diagrams to visually explain the algorithm's steps and concepts.
*   **`docs/edge_cases_and_gotchas.md`**: Discusses common pitfalls, integer overflow, boundary conditions, and how to write robust binary search code.
*   **`docs/interview_tips.md`**: Advice on how to approach binary search problems in an interview setting, common variations, and communication strategies.

## Additional Solutions

*   **Brute Force Solutions (`solutions_bruteforce/`):** Provides simple, less efficient solutions (e.g., linear scan) for comparison purposes.
*   **Recursive Solutions (`solutions_recursive/`):** Demonstrates recursive implementations for problems that can be solved both iteratively and recursively.

This project aims to give you a holistic understanding of Binary Search, not just how to implement it, but also how to think about it, test it, and optimize it.