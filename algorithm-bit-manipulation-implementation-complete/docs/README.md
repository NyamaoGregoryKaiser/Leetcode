```markdown
# Bit Manipulation Coding Interview Project

This project is a comprehensive guide and practice set for bit manipulation problems commonly encountered in coding interviews. It aims to cover various techniques, provide optimal solutions, and equip you with the knowledge to tackle similar problems confidently.

## Project Structure

```
bit_manipulation_project/
├── src/
│   ├── main_algorithms.py      # Core algorithms and multiple approaches
│   └── utils.py                # Helper utilities (e.g., binary string conversion)
├── tests/
│   ├── test_main_algorithms.py # Extensive unit tests for all algorithms
│   └── test_performance.py     # Performance comparison tests (currently not implemented, see 'performance/benchmark.py')
├── docs/
│   ├── README.md               # Project overview, setup, and problem descriptions (this file)
│   ├── algorithms_explanation.md # Detailed algorithmic explanations, ASCII diagrams
│   └── interview_tips.md       # Interview strategies, edge cases, and common variations
├── performance/
│   └── benchmark.py            # Script for benchmarking different algorithm approaches
└── .gitignore                  # Git ignore file
```

## Problems Covered

We cover a range of problems demonstrating different bit manipulation concepts. Each problem in `src/main_algorithms.py` includes multiple approaches (where applicable), detailed comments, and complexity analysis.

### 1. Count Set Bits (Hamming Weight)
*   **Description:** Count the number of '1' bits in the binary representation of a non-negative integer.
*   **Techniques:** Iterative right shift, Brian Kernighan's Algorithm, built-in functions.
*   **Relevance:** Fundamental operation, often used as a helper or in related problems like Hamming Distance.

### 2. Check if a Number is a Power of Two
*   **Description:** Determine if a given positive integer is a power of two.
*   **Techniques:** Elegant bitwise trick (`n > 0 and (n & (n - 1) == 0)`), iterative division, logarithm.
*   **Relevance:** Quick check for powers of two, demonstrates how `n & (n-1)` affects the LSB.

### 3. Reverse Bits
*   **Description:** Reverse the bits of a given fixed-size (e.g., 32-bit) unsigned integer.
*   **Techniques:** Iterative bit extraction and placement, byte swapping (more advanced/optimized).
*   **Relevance:** Requires careful handling of shifting and masking, understanding bit positions.

### 4. Find the Single Number
*   **Description:** Given an array where every element appears twice except for one, find that single one.
*   **Techniques:** XOR property (`x ^ x = 0`, `x ^ 0 = x`), hash map, set.
*   **Relevance:** A classic problem demonstrating the powerful application of XOR.

### 5. Bitwise Insertion (Cracking the Coding Interview - 5.1)
*   **Description:** Insert number `M` into `N` such that `M` starts at bit `j` and ends at bit `i`.
*   **Techniques:** Creating masks to clear specific bit ranges, shifting, and ORing.
*   **Relevance:** Combines multiple bitwise operations (clearing, shifting, combining), good test of understanding masks.

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd bit_manipulation_project
    ```

2.  **Install dependencies (if any):**
    For this project, standard Python 3 is sufficient. No external libraries are strictly required beyond the `unittest` module for testing, which is built-in.

3.  **Run Tests:**
    To run all unit tests for the algorithms:
    ```bash
    python -m unittest tests/test_main_algorithms.py
    ```
    This will execute all test cases defined in `test_main_algorithms.py`.

4.  **Run Performance Benchmarks:**
    To compare the performance of different approaches for selected problems (e.g., `count_set_bits`):
    ```bash
    python performance/benchmark.py
    ```
    This script will print out the execution times for various implementations.

## Documentation

*   **`docs/algorithms_explanation.md`**: Dive deep into the logic behind each optimal solution. This file uses ASCII diagrams to visually explain how bitwise operations work step-by-step.
*   **`docs/interview_tips.md`**: Provides general advice for bit manipulation problems in interviews, common pitfalls, important questions to ask, and potential variations of the problems.

## Contributing

Feel free to open issues or submit pull requests for improvements, additional problems, alternative solutions, or more extensive test cases.

---
Enjoy your bit manipulation journey!
```