# Bit Manipulation Coding Interview Project

This project aims to provide a comprehensive resource for mastering bit manipulation techniques, a common topic in coding interviews. It covers several classic problems with multiple solution approaches, detailed explanations, and supporting materials.

## Project Structure

*   `src/`: Contains the main Python implementations for each problem. Each file focuses on a single problem and includes various approaches (naive, optimal, advanced) with detailed comments, time/space complexity analysis.
*   `tests/`: Contains `pytest`-based unit tests for all implemented functions, ensuring correctness across a wide range of inputs, including edge cases.
*   `docs/`: Comprehensive documentation files:
    *   `algorithms.md`: Detailed explanations of the bit manipulation logic and properties used in the solutions.
    *   `visualizations.md`: ASCII art diagrams to visually represent bitwise operations and complex algorithms.
    *   `interview_tips.md`: Advice on approaching bit manipulation problems, common patterns, edge cases, and interview strategies.
*   `utils/`: Contains utility functions that might be helpful for debugging or visualization, such as converting numbers to binary strings.
*   `benchmarking/`: Includes scripts to compare the performance of different solution approaches for problems where multiple methods exist.
*   `README.md`: This file, providing an overview of the project and setup instructions.

## Problems Covered

1.  **Count Set Bits (Hamming Weight)**: Determine the number of '1' bits in the binary representation of an integer.
    *   Approaches: Iterative shifting, Brian Kernighan's algorithm, Lookup table, Built-in functions.
2.  **Power of Two**: Check if a given integer is a power of two.
    *   Approaches: Iterative division, Optimal bitwise trick.
3.  **Reverse Bits**: Reverse the bits of a 32-bit unsigned integer.
    *   Approaches: Iterative shifting, Optimized divide-and-conquer strategy (briefly discussed/implemented).
4.  **Single Number III**: Given an integer array `nums` where exactly two elements appear once and all the other elements appear twice, find the two elements that appear only once.
    *   Approach: Advanced XOR properties to isolate and identify the two unique numbers.

## Setup and Running

### Prerequisites

*   Python 3.8+
*   `pip` (Python package installer)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bit_manipulation_project.git
    cd bit_manipulation_project
    ```
    *(Replace `your-username` with your actual GitHub username or the repository URL)*

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    (A `requirements.txt` will be created if needed, mostly for `pytest`)

### Running Tests

To run all unit tests:
```bash
pytest tests/
```

### Running Benchmarks

To run performance benchmarks for different algorithms (e.g., counting set bits):
```bash
python benchmarking/benchmark.py
```

### Exploring Solutions

Navigate to the `src/` directory to view the problem implementations. Each file contains detailed comments, complexity analysis, and multiple approaches where applicable.

```bash
cat src/problem_1_count_set_bits.py
```

### Reading Documentation

Explore the `docs/` directory for in-depth explanations, visual aids, and interview tips.

```bash
cat docs/algorithms.md
cat docs/visualizations.md
cat docs/interview_tips.md
```

## Contribution

Feel free to open issues or submit pull requests if you have suggestions for improvements, additional problems, or alternative solutions.

---
## requirements.txt
*(This file will be created as part of the project structure. Its content is simple)*

```
pytest>=7.0
```
---

## File Contents Generation

---