# Linked List Interview Project

This project provides a comprehensive set of solutions, tests, benchmarks, and documentation for common Linked List problems frequently encountered in coding interviews. It aims to serve as a complete study guide and reference for mastering Linked List algorithms.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Implemented](#problems-implemented)
    *   [1. Reverse Linked List](#1-reverse-linked-list)
    *   [2. Merge Two Sorted Lists](#2-merge-two-sorted-lists)
    *   [3. Linked List Cycle Detection](#3-linked-list-cycle-detection)
    *   [4. Remove Nth Node From End of List](#4-remove-nth-node-from-end-of-list)
    *   [5. Palindrome Linked List](#5-palindrome-linked-list)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Documentation](#documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

```
linked_list_project/
├── main_algorithms/              # Core algorithm implementations
│   ├── __init__.py
│   ├── reverse_list.py           # Reverse Linked List
│   ├── merge_sorted_lists.py     # Merge Two Sorted Lists
│   ├── detect_cycle.py           # Linked List Cycle Detection
│   ├── remove_nth_from_end.py    # Remove Nth Node From End
│   └── palindrome_list.py        # Palindrome Linked List
├── utils/                        # Helper utilities and data structures
│   ├── __init__.py
│   └── linked_list_utils.py      # ListNode class, list to LL, LL to list, cycle creation
├── tests/                        # Unit tests for all algorithms
│   ├── __init__.py
│   └── test_linked_lists.py
├── docs/                         # Comprehensive documentation
│   ├── algorithm_explanations.md # Detailed problem breakdowns, ASCII diagrams
│   └── interview_tips.md         # General interview advice, common pitfalls, variations
├── performance_benchmark.py      # Script for benchmarking algorithm performance
└── README.md                     # This project overview
```

## Problems Implemented

Each problem includes:
*   Optimal solutions with detailed comments.
*   Multiple approaches where applicable (e.g., iterative vs. recursive, two-pass vs. one-pass).
*   Time and Space Complexity analysis.

### 1. Reverse Linked List

*   **Description**: Given the `head` of a singly linked list, reverse the list, and return the reversed list.
*   **Approaches**:
    *   **Iterative**: Uses three pointers (`prev`, `curr`, `next_node`) to re-point nodes.
    *   **Recursive**: Reverses the sublist and then attaches the current `head` to its end.
*   **Key Concepts**: Pointer manipulation, recursion.

### 2. Merge Two Sorted Lists

*   **Description**: Merge two sorted linked lists into a single sorted list.
*   **Approaches**:
    *   **Iterative**: Uses a `dummy_head` to build the new list by comparing and splicing nodes.
    *   **Recursive**: Recursively merges the rest of the lists after picking the smaller head.
*   **Key Concepts**: Dummy nodes, in-place modification, recursion.

### 3. Linked List Cycle Detection

*   **Description**: Determine if a linked list has a cycle, and if so, find the starting node of the cycle and its length.
*   **Approaches**:
    *   **Floyd's Tortoise and Hare (Fast and Slow Pointers)**:
        *   `hasCycle`: Detects the presence of a cycle.
        *   `detectCycle`: Finds the node where the cycle begins.
        *   `cycleLength`: Calculates the number of nodes in the cycle.
*   **Key Concepts**: Fast/slow pointers, mathematical derivation for cycle start.

### 4. Remove Nth Node From End of List

*   **Description**: Remove the *n*th node from the end of a linked list and return its head.
*   **Approaches**:
    *   **Two-pass Algorithm**: First, calculate the list length; then, traverse to the `(length - n)`th node to remove the target.
    *   **One-pass Algorithm (Two Pointers)**: Uses `fast` and `slow` pointers, with `fast` `n` steps ahead of `slow`. When `fast` reaches the end, `slow` is at the predecessor of the node to be removed.
*   **Key Concepts**: Dummy nodes, two-pointer technique, handling edge cases (removing head).

### 5. Palindrome Linked List

*   **Description**: Check if a singly linked list is a palindrome.
*   **Approaches**:
    *   **Optimized O(1) Space**: Find the middle of the list, reverse the second half, and then compare the first half with the reversed second half.
    *   **Auxiliary O(N) Space**: Copy all list values to a Python list (or stack) and check for palindrome property.
*   **Key Concepts**: Fast/slow pointers, in-place list reversal, comparison.

## Getting Started

### Prerequisites

*   Python 3.6+
*   `pytest` for running tests:
    ```bash
    pip install pytest
    ```
*   (Optional) `tabulate` for prettier benchmark output (not used in current `performance_benchmark.py` but good for extension):
    ```bash
    pip install tabulate
    ```

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/linked-list-project.git
    cd linked_list_project
    ```

### Running Tests

Navigate to the root of the project and run `pytest`:

```bash
pytest
```

This will execute all tests in `tests/test_linked_lists.py`. You should see output indicating all tests passed.

### Running Benchmarks

Navigate to the root of the project and execute the benchmark script:

```bash
python performance_benchmark.py
```

This will print out performance metrics (average execution time per operation) for different list sizes and algorithms, comparing different approaches where available.

## Documentation

Dive deeper into the algorithms and interview strategies with these documents:

*   **[Algorithm Explanations](docs/algorithm_explanations.md)**: Detailed breakdown of each algorithm's logic, including ASCII art diagrams for visualization.
*   **[Interview Tips and Variations](docs/interview_tips.md)**: Guidance on approaching Linked List problems in interviews, common pitfalls, and variations to expect.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, new problems, or additional test cases.

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details.