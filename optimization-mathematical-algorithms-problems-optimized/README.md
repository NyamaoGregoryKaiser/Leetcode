# Math Problems Interview Project

This project is a comprehensive resource for preparing for coding interviews that involve mathematical problems. It covers a range of common and complex mathematical challenges, presenting multiple solution approaches, detailed complexity analysis, robust testing, and performance benchmarking.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [Setup and Installation](#setup-and-installation)
4.  [How to Run](#how-to-run)
    *   [Run Tests](#run-tests)
    *   [Run Benchmarks](#run-benchmarks)
    *   [Explore Solutions](#explore-solutions)
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Structure

```
math_problems_interview/
├── README.md                          # Project overview and instructions
├── problems/                          # Core algorithm implementations
│   ├── __init__.py
│   ├── problem_01_prime_factors.py    # Prime Factorization
│   ├── problem_02_nth_fibonacci.py    # Nth Fibonacci Number
│   ├── problem_03_gcd_lcm.py          # Greatest Common Divisor (GCD) & Least Common Multiple (LCM)
│   ├── problem_04_power_function.py   # Implement pow(x, n)
│   └── problem_05_sudoku_solver.py    # Sudoku Solver (Backtracking)
├── tests/                             # Unit tests for each problem
│   ├── __init__.py
│   ├── test_prime_factors.py
│   ├── test_nth_fibonacci.py
│   ├── test_gcd_lcm.py
│   ├── test_power_function.py
│   └── test_sudoku_solver.py
├── utils/                             # Helper utilities
│   ├── __init__.py
│   └── performance_profiler.py        # Decorator for measuring function execution time
├── docs/                              # Detailed documentation
│   ├── algorithms_explanation.md      # In-depth algorithm analysis, edge cases, ASCII diagrams
│   └── interview_tips.md              # General interview advice, strategy for math problems
├── benchmarks/                        # Scripts for performance comparison
│   ├── __init__.py
│   └── benchmark_all.py               # Runs performance tests for various solutions
└── requirements.txt                   # Project dependencies
```

## Problems Covered

Each problem file (`problems/*.py`) contains:
*   Multiple approaches (e.g., brute force, optimized, recursive, iterative, specific algorithms).
*   Detailed comments explaining logic.
*   Time and space complexity analysis for each method.

1.  **Prime Factorization (`problem_01_prime_factors.py`)**
    *   **Description:** Find all prime factors of a given positive integer.
    *   **Approaches:** Trial division, optimized trial division.
    *   **Concepts:** Number theory, primality testing, factorization.

2.  **Nth Fibonacci Number (`problem_02_nth_fibonacci.py`)**
    *   **Description:** Calculate the Nth number in the Fibonacci sequence.
    *   **Approaches:** Naive recursion, memoization (top-down DP), iteration (bottom-up DP), matrix exponentiation.
    *   **Concepts:** Dynamic programming, recursion, matrix multiplication, Big O optimization.

3.  **Greatest Common Divisor (GCD) & Least Common Multiple (LCM) (`problem_03_gcd_lcm.py`)**
    *   **Description:** Implement functions to find the GCD and LCM of two integers.
    *   **Approaches:** Naive iteration, Euclidean algorithm (recursive and iterative).
    *   **Concepts:** Number theory, Euclidean algorithm.

4.  **Power Function (x^n) (`problem_04_power_function.py`)**
    *   **Description:** Implement `pow(x, n)` which calculates `x` raised to the power `n` (n can be negative).
    *   **Approaches:** Naive multiplication, binary exponentiation (recursive and iterative).
    *   **Concepts:** Exponentiation by squaring, handling negative exponents, floating-point precision.

5.  **Sudoku Solver (`problem_05_sudoku_solver.py`)**
    *   **Description:** Solve a Sudoku puzzle by filling empty cells.
    *   **Approaches:** Backtracking algorithm.
    *   **Concepts:** Backtracking, recursion, constraint satisfaction, 2D arrays/matrices.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your_username/math_problems_interview.git
    cd math_problems_interview
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    *   **On macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```
    *   **On Windows:**
        ```bash
        venv\Scripts\activate
        ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run

### Run Tests

To execute all unit tests using `pytest`:

```bash
pytest tests/
```

You can also run tests for a specific problem, e.g., for prime factors:

```bash
pytest tests/test_prime_factors.py
```

### Run Benchmarks

To run the performance benchmarks for all problems and compare different solution approaches:

```bash
python benchmarks/benchmark_all.py
```

This script will print out the execution times for various algorithms and input sizes, helping to visualize performance differences.

### Explore Solutions

Navigate to the `problems/` directory and open any `.py` file to study the implementations. Each file contains multiple approaches, detailed comments, and complexity analysis.

Example:
```bash
cat problems/problem_02_nth_fibonacci.py
```

## Documentation

The `docs/` directory contains crucial supplementary materials:

*   **`algorithms_explanation.md`**: Provides in-depth explanations of the algorithms used, including step-by-step logic, ASCII art diagrams, discussions on edge cases, and common pitfalls. This is essential for understanding the "why" behind the solutions.
*   **`interview_tips.md`**: Offers general advice for technical interviews, strategies for approaching math-related problems, how to communicate your thought process, and common questions to ask the interviewer.

## Contributing

Feel free to fork this repository, add more problems, alternative solutions, optimize existing code, or improve documentation. Pull requests are welcome!

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for details (if included, otherwise assume MIT as per common practice for such repos).
---