# Binary Search Interview Project

This project is a comprehensive guide and implementation for the Binary Search algorithm, designed specifically for coding interview preparation. It covers various problem patterns, optimal solutions, brute-force comparisons, testing, and detailed documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Project Structure](#project-structure)
3.  [Installation](#installation)
4.  [How to Run Tests](#how-to-run-tests)
5.  [How to Run Benchmarks](#how-to-run-benchmarks)
6.  [Problems Covered](#problems-covered)
7.  [Documentation](#documentation)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Overview

Binary Search is a highly efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

This project aims to provide:
*   Multiple implementations of Binary Search, including iterative, recursive, and template-based approaches.
*   Solutions to classic Binary Search interview problems.
*   Comparisons with brute-force alternatives to highlight performance gains.
*   Extensive unit tests using `pytest` to ensure correctness.
*   Performance benchmarking to quantify efficiency differences.
*   Detailed markdown documentation explaining the algorithm, common patterns, edge cases, and interview strategies.

## Project Structure

Refer to the tree structure above for a visual representation.

*   `algorithms/`: Contains Python implementations of various Binary Search problems and their brute-force counterparts.
*   `benchmarks/`: Python scripts for measuring and comparing the performance of different solutions.
*   `docs/`: Markdown files providing in-depth explanations, ASCII diagrams, interview tips, and common pitfalls.
*   `tests/`: `pytest` test files with comprehensive test cases for all implemented algorithms.
*   `utils/`: Helper utilities, such as array generation for testing and benchmarking.
*   `requirements.txt`: Lists Python dependencies.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary-search-project.git
    cd binary_search_project
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run Tests

Ensure you have `pytest` installed (`pip install pytest`).

To run all tests:
```bash
pytest tests/
```

To run tests for a specific problem (e.g., `core_binary_search`):
```bash
pytest tests/test_core_binary_search.py
```

## How to Run Benchmarks

The benchmarking script compares the performance of optimal (Binary Search) solutions against their brute-force counterparts using large, randomly generated datasets.

To run benchmarks:
```bash
python benchmarks/benchmark_all_problems.py
```

## Problems Covered

The `algorithms/` directory contains solutions to the following problems:

1.  **Core Binary Search (`core_binary_search.py`)**
    *   Standard iterative and recursive implementations.
    *   Templates for finding the *leftmost* (first occurrence or insertion point) and *rightmost* (last occurrence) elements.
    *   Comparison with linear search.
    *   [Detailed Explanation in docs/algorithm_explanation.md](docs/algorithm_explanation.md)

2.  **Search in Rotated Sorted Array (`problem_search_rotated_array.py`)**
    *   Find a target in a sorted array that has been rotated at an unknown pivot.
    *   Optimal O(log N) solution and brute-force O(N) solution.

3.  **Find First and Last Position of Element in Sorted Array (`problem_find_first_last.py`)**
    *   Given a sorted array with duplicates, find the starting and ending position of a given target value.
    *   Optimal O(log N) solution (using two binary searches) and brute-force O(N) solution.

4.  **Kth Smallest Element in a Sorted Matrix (`problem_kth_smallest_matrix.py`)**
    *   Find the Kth smallest element in an `m x n` matrix where each row and column is sorted in ascending order. This is an example of "Binary Search on the Answer".
    *   Optimal O(N log(Max-Min)) solution and brute-force O(N^2 log(N^2)) solution.

## Documentation

The `docs/` directory contains crucial documentation:

*   **`algorithm_explanation.md`**: Provides an in-depth explanation of Binary Search, its preconditions, different templates (standard, leftmost, rightmost, binary search on answer), time/space complexity, and illustrative ASCII diagrams.
*   **`interview_tips.md`**: Offers guidance on recognizing Binary Search problems, common pitfalls, edge cases to consider, debugging strategies, and related concepts that might come up in interviews.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, bug fixes, or additional problems/solutions.

## License

This project is licensed under the MIT License - see the LICENSE file for details (if applicable, or state "No license specified").
*(For this response, I'm not providing a LICENSE file, but for a real project, it would be essential)*

---