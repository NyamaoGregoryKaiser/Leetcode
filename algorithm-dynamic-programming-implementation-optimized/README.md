# Dynamic Programming Interview Project

This project is designed to be a comprehensive resource for mastering Dynamic Programming (DP) for coding interviews. It includes implementations of several classic DP problems, each solved with multiple approaches (brute force recursion, memoization/top-down DP, tabulation/bottom-up DP, and space-optimized DP where applicable).

## Project Structure

*   `algorithms/`: Contains the core DP problem implementations. Each problem is in a separate file, detailing various solution approaches with extensive comments, time/space complexity analysis.
*   `tests/`: Unit tests for all implemented algorithms using `pytest`.
*   `utils/`: Helper utilities, such as a `stopwatch` for performance measurement.
*   `docs/`: Comprehensive documentation including DP concepts, visual diagrams, problem variations, edge cases, and interview tips.
*   `benchmark.py`: A script to compare the performance of different solution approaches for each problem.
*   `requirements.txt`: Lists project dependencies.
*   `README.md`: This file, providing project overview and setup instructions.

## Problems Covered

1.  **Fibonacci Sequence**: A fundamental problem to introduce memoization and tabulation.
2.  **0/1 Knapsack Problem**: A classic combinatorial optimization problem demonstrating 2D DP and decision-making.
3.  **Longest Common Subsequence (LCS)**: A string-based DP problem, good for understanding 2D DP table construction and path reconstruction.
4.  **Coin Change Problem**: A problem with variations for counting ways or finding minimum coins, demonstrating unbounded knapsack principles.

## Features

*   **Multiple Solutions**: For each problem, you'll find:
    *   Brute Force Recursive solution (often inefficient)
    *   Memoization (Top-Down Dynamic Programming)
    *   Tabulation (Bottom-Up Dynamic Programming)
    *   Space-Optimized Tabulation (where applicable)
*   **Detailed Comments**: Explanations of recurrence relations, base cases, state definitions, and transitions.
*   **Complexity Analysis**: Time and space complexity for each solution approach.
*   **Extensive Test Cases**: Robust unit tests cover general cases, edge cases, and constraints.
*   **Performance Benchmarking**: Compare the efficiency of different DP approaches.
*   **Comprehensive Documentation**: Deep dive into DP concepts, problem variations, and interview strategies.
*   **ASCII Diagrams**: Visual aids for understanding DP table filling and state transitions.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp_interview_project.git
    cd dp_interview_project
    ```
    (Note: Replace `your-username` with your actual GitHub username if you're hosting this.)

2.  **Create a virtual environment (recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run Tests

To run all unit tests for the project:

```bash
pytest tests/
```

You can also run tests for a specific problem, e.g., for Fibonacci:

```bash
pytest tests/test_fibonacci.py
```

## How to Run Benchmarks

To compare the performance of different implementations (recursive, memoized, tabulated) for all problems:

```bash
python benchmark.py
```

## How to Explore the Code and Docs

*   **Algorithms**: Dive into the `algorithms/` directory to see the implementations. Each file is heavily commented.
*   **Documentation**: Check the `docs/` directory for conceptual explanations (`dp_concepts.md`), problem-specific details (`problem_variations.md`), and visual aids (`diagrams.txt`).

## Contributing

Feel free to open issues or pull requests if you find any bugs, have suggestions for improvements, or want to add more DP problems!

---
**Happy Coding and Good Luck with your Interviews!**