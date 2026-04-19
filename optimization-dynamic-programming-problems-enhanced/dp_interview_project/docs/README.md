# Dynamic Programming Interview Project

This project is designed to be a comprehensive resource for understanding and practicing Dynamic Programming (DP) for coding interviews. It covers several classic DP problems, implementing various solution approaches (brute force, memoization, tabulation, space-optimized) along with detailed explanations, complexity analysis, robust testing, and performance benchmarking.

## Project Structure

*   `algorithms/`: Contains the implementations for various DP problems. Each problem has its own file with multiple solution approaches.
*   `tests/`: Unit tests for all implemented algorithms to ensure correctness.
*   `docs/`: Documentation files including a detailed explanation of Dynamic Programming, interview tips, and this README.
*   `utils/`: Helper utilities, such as a performance profiler.
*   `benchmarks/`: Scripts to benchmark the performance of different solutions.
*   `requirements.txt`: Python dependencies.

## Problems Covered

1.  **Fibonacci Numbers:** A fundamental DP problem illustrating recursion, memoization, tabulation, and space optimization.
2.  **0/1 Knapsack Problem:** A classic optimization problem demonstrating choices and capacity constraints.
3.  **Longest Common Subsequence (LCS):** A sequence alignment problem, great for understanding 2D DP tables with string inputs.
4.  **Unique Paths:** A grid-based DP problem focusing on path counting and grid traversal.

## Features

*   **Multiple Solution Approaches:** For each problem, implementations include:
    *   Brute Force (Recursive)
    *   Memoization (Top-Down Dynamic Programming)
    *   Tabulation (Bottom-Up Dynamic Programming)
    *   Space-Optimized (where applicable)
*   **Detailed Comments:** Every solution is thoroughly commented, explaining the logic, base cases, recurrence relations, and state transitions.
*   **Time & Space Complexity Analysis:** Explicitly stated for each approach.
*   **Comprehensive Testing:** Each algorithm has dedicated unit tests covering various scenarios, including edge cases.
*   **Performance Benchmarking:** Tools to compare the execution time of different solution approaches.
*   **In-depth Documentation:**
    *   `dynamic_programming_explanation.md`: Explains DP concepts, strategies, and common patterns.
    *   `interview_tips.md`: Provides advice for DP interviews, common pitfalls, and follow-up questions.

## Getting Started

### Prerequisites

*   Python 3.7+

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/dp_interview_project.git
    cd dp_interview_project
    ```
2.  (Optional but Recommended) Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: `venv\Scripts\activate`
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running Tests

To run all unit tests:

```bash
python -m unittest discover tests
```

You can also run tests for a specific problem, e.g., Fibonacci:

```bash
python -m unittest tests.test_fibonacci
```

## Running Benchmarks

To run benchmarks for all problems and compare solution performances:

```bash
python benchmarks/benchmark_all.py
```

To run benchmarks for a specific problem, e.g., Fibonacci:

```bash
python benchmarks/benchmark_fibonacci.py
```

## Exploring the Code and Documentation

Navigate through the `algorithms/` directory to see the problem implementations.
Check the `docs/` directory for detailed explanations and interview tips.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, new problems, or additional explanations.

---
**Happy Coding!**
---