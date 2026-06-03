# Backtracking Interview Project

This project is a comprehensive guide and practice platform for Backtracking algorithms, a powerful technique used for solving problems that involve exploring multiple possibilities. It's designed for anyone preparing for coding interviews, wanting to deepen their understanding of recursion and state management.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Problems Covered](#problems-covered)
3.  [Project Structure](#project-structure)
4.  [How to Run](#how-to-run)
    *   [Setup](#setup)
    *   [Running Examples](#running-examples)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Overview

Backtracking is an algorithmic paradigm that tries to build a solution incrementally. If at any point, a solution candidate turns out to be not viable, the algorithm "backtracks" to an earlier state and tries a different path. This project explores various classic backtracking problems, providing multiple solutions, detailed explanations, and performance analysis.

**Key Features:**

*   **Multiple Backtracking Problems:** Implements solutions for 5 common backtracking problems.
*   **Optimal Solutions:** Each problem includes an optimal backtracking solution.
*   **Detailed Comments & Analysis:** Code is heavily commented with explanations of logic, time, and space complexity.
*   **Comprehensive Testing:** Extensive test cases ensure correctness.
*   **Performance Benchmarking:** Tools to measure and compare algorithm performance.
*   **In-depth Documentation:** Explanations of backtracking concepts, interview tips, and visual aids.

## Problems Covered

1.  **Permutations**: Generate all possible permutations of a given array of distinct numbers. Includes handling duplicates.
2.  **Subsets**: Generate all possible subsets (the power set) of a given array of distinct numbers. Includes handling duplicates.
3.  **N-Queens**: Place N non-attacking queens on an N×N chessboard.
4.  **Sudoku Solver**: Solve a given Sudoku puzzle by filling empty cells.
5.  **Combination Sum**: Find all unique combinations in a `candidates` array where the numbers sum up to a `target`. Includes variations where numbers can be reused or used only once with duplicates.

## Project Structure

```
backtracking_interview_project/
├── README.md                 # Project description and guide
├── requirements.txt          # Python dependencies
├── main.py                   # Entry point for running examples and benchmarks
├── algorithms/               # Directory for algorithm implementations
│   ├── __init__.py
│   ├── permutations.py       # Permutations algorithms
│   ├── subsets.py            # Subsets algorithms
│   ├── n_queens.py           # N-Queens solver
│   ├── sudoku_solver.py      # Sudoku solver
│   └── combination_sum.py    # Combination Sum algorithms
├── tests/                    # Directory for unit tests
│   ├── __init__.py
│   ├── test_permutations.py
│   ├── test_subsets.py
│   ├── test_n_queens.py
│   ├── test_sudoku_solver.py
│   └── test_combination_sum.py
├── docs/                     # Directory for documentation
│   ├── backtracking_explanation.md # General explanation of backtracking
│   └── interview_tips.md     # Tips for interviews, variations, edge cases
└── utils/                    # Utility functions
    ├── __init__.py
    └── benchmark.py          # Performance benchmarking utilities
```

## How to Run

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/backtracking_interview_project.git
    cd backtracking_interview_project
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

### Running Examples

To see the algorithms in action with predefined examples, run the `main.py` file:

```bash
python main.py
```

This will execute various problems and print their outputs.

### Running Tests

To ensure all algorithms work correctly, run the comprehensive test suite. This project uses Python's built-in `unittest` framework.

```bash
python -m unittest discover tests
```

### Running Benchmarks

To measure the performance of the implemented algorithms, run the benchmarks through `main.py`:

```bash
python main.py benchmark
```

This will execute specific benchmark functions defined in `utils/benchmark.py` and print their execution times.

## Documentation

The `docs/` directory contains important conceptual and practical documentation:

*   **`backtracking_explanation.md`**: A detailed explanation of what backtracking is, its core components, when to use it, a general template, and an ASCII art example.
*   **`interview_tips.md`**: Practical advice for interviews, common questions, how to approach problems, handle edge cases, and discuss complexity.

You can read these Markdown files directly in any text editor or browser that supports Markdown rendering.

## Contributing

Contributions are welcome! If you have suggestions for new problems, alternative solutions, improved documentation, or more extensive test cases, please feel free to open an issue or submit a pull request.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file (not explicitly generated here, but implied) for more details.