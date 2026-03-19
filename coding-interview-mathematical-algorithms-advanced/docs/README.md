# Math Problems Interview Project

This project is designed to be a comprehensive resource for preparing for coding interviews that involve mathematical algorithms. It covers several fundamental math problems, presenting multiple algorithmic approaches, detailed explanations, complexity analysis, and robust testing.

## Project Structure

The project is organized into the following directories:

*   **`src/problems/`**: Contains the core Python implementations for each math problem. Each problem typically includes multiple solutions (e.g., brute force, optimized, recursive, iterative, dynamic programming) with extensive comments.
*   **`tests/`**: Contains unit tests for all the algorithms implemented in `src/problems/`. These tests cover a wide range of inputs, including edge cases, positive/negative scenarios (where applicable), and large numbers.
*   **`docs/`**: Holds documentation files.
    *   `README.md`: This file, providing an overview of the project.
    *   `algorithms.md`: Detailed explanations of the algorithms, including mathematical background and ASCII art diagrams.
    *   `interview_guide.md`: Tips for approaching math problems in interviews, common pitfalls, edge cases, and typical follow-up questions.
*   **`benchmarks/`**: Contains scripts to benchmark the performance of different solutions for the same problem, allowing for empirical comparison of time complexities.

## Problems Covered

1.  **Greatest Common Divisor (GCD) & Least Common Multiple (LCM)**
    *   Euclidean Algorithm (recursive and iterative)
    *   Prime Factorization based approach (for LCM conceptually)
2.  **Prime Numbers**
    *   Primality Test (Trial Division, optimized trial division)
    *   Sieve of Eratosthenes (standard, optimized space)
3.  **Modular Exponentiation**
    *   Naive approach
    *   Binary Exponentiation (iterative and recursive)
4.  **Fibonacci Numbers**
    *   Recursive (naive)
    *   Iterative (dynamic programming, space-optimized)
    *   Matrix Exponentiation

## How to Run

### Setup

Clone the repository:
```bash
git clone https://github.com/yourusername/math-interview-project.git
cd math-interview_project
```

### Running Tests

To run all unit tests, navigate to the project root and execute `pytest`:

```bash
pytest
```
(You might need to install `pytest`: `pip install pytest`)

### Running Benchmarks

To compare the performance of different algorithms, run the benchmark script:

```bash
python benchmarks/benchmark_performance.py
```

### Exploring Solutions

You can directly inspect the code in `src/problems/` for detailed implementations and comments. For deeper understanding, refer to the `docs/algorithms.md` file.

## Contributing

Feel free to open issues or submit pull requests if you find areas for improvement, want to add more problems, or enhance existing solutions/documentation.

---