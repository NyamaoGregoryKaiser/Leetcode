# Dynamic Programming Interview Project

Welcome to the Dynamic Programming Interview Project! This repository is a comprehensive resource designed to help you master Dynamic Programming (DP) for coding interviews. It covers several classic DP problems, demonstrates multiple solution approaches, provides detailed explanations, and includes robust testing and benchmarking tools.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Directory Structure](#directory-structure)
3.  [Problems Covered](#problems-covered)
4.  [Setup and Installation](#setup-and-installation)
5.  [How to Run](#how-to-run)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Exploring Solutions](#exploring-solutions)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

This project aims to provide a holistic understanding of Dynamic Programming. For each problem, you'll find:
*   **Multiple Approaches:** Recursive with memoization (top-down), iterative with tabulation (bottom-up), and where applicable, space-optimized iterative solutions.
*   **Detailed Comments:** Explanations of logic, state transitions, base cases, and recurrence relations within the code.
*   **Complexity Analysis:** Time and space complexity for each solution.
*   **Comprehensive Tests:** Unit tests covering various scenarios, including edge cases.
*   **Performance Benchmarking:** Tools to compare the efficiency of different solution approaches.
*   **In-depth Documentation:** Dedicated markdown files explaining DP concepts, problem breakdowns, ASCII diagrams, interview tips, and common pitfalls.
*   **Brute-Force Comparison:** A dedicated file showcasing how DP drastically improves upon naive brute-force solutions.

## Directory Structure

```
.
├── algorithms/                     # Core DP problem implementations
│   ├── dp_problems.py              # Main DP algorithm implementations
│   └── brute_force_vs_optimized.py # Illustrates Brute Force vs. Optimized DP
├── tests/                          # Unit tests for all algorithms
│   ├── test_dp_problems.py         # Tests for algorithms/dp_problems.py
│   └── test_brute_force.py         # Tests for algorithms/brute_force_vs_optimized.py
├── docs/                           # Detailed documentation
│   ├── algorithm_explanations.md   # Explanations, recurrence relations, ASCII diagrams
│   └── interview_tips.md           # Tips for identifying DP, common patterns, variations
├── benchmarking/                   # Performance testing scripts
│   └── performance_benchmark.py    # Compares speeds of different DP solutions
├── utils/                          # Helper utilities
│   └── memoization_decorator.py    # Custom memoization decorator example
└── README.md                       # This file
```

## Problems Covered

The `algorithms/dp_problems.py` file contains solutions for the following classic Dynamic Programming problems:

1.  **Fibonacci Sequence:**
    *   Recursive with memoization (`fibonacci_memoized`)
    *   Iterative with tabulation (`fibonacci_tabulation`)
    *   Space-optimized iterative (`fibonacci_space_optimized`)
    *   A fundamental problem to understand memoization and tabulation.

2.  **0/1 Knapsack Problem:**
    *   Recursive with memoization (`knapsack_memoized`)
    *   Iterative with tabulation (`knapsack_tabulation`)
    *   Given weights and values of items, and a max capacity, find the maximum value that can be put into the knapsack. Each item can only be taken once.

3.  **Longest Common Subsequence (LCS):**
    *   Recursive with memoization (`lcs_memoized`)
    *   Iterative with tabulation (`lcs_tabulation`)
    *   Find the length of the longest subsequence common to two sequences.

4.  **Coin Change Problem (Minimum Coins):**
    *   Recursive with memoization (`coin_change_memoized`)
    *   Iterative with tabulation (`coin_change_tabulation`)
    *   Given a set of coin denominations and a target amount, find the minimum number of coins needed to make up that amount.

## Setup and Installation

This project requires Python 3.6 or higher. No external libraries are strictly necessary beyond standard Python.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/dp_interview_project.git
    cd dp_interview_project
    ```

## How to Run

### Running Tests

To ensure all algorithms are working correctly, run the unit tests.
Navigate to the root directory of the project and execute:

```bash
python -m unittest discover tests
```

This command will discover and run all test files within the `tests/` directory.

### Running Benchmarks

To compare the performance of different solution approaches (e.g., recursive memoized vs. iterative tabulation), run the benchmarking script:

```bash
python benchmarking/performance_benchmark.py
```

This script will execute various solutions for specific problems with different input sizes and print their execution times.

### Exploring Solutions

You can directly inspect the `algorithms/` directory for the code. To quickly try out a function:

```python
# From the project root, open a python interpreter
python

# Then import and call functions
from algorithms import dp_problems
from algorithms import brute_force_vs_optimized

print(dp_problems.fibonacci_tabulation(10))
print(dp_problems.knapsack_tabulation([10, 20, 30], [60, 100, 120], 50))

print(brute_force_vs_optimized.fibonacci_brute_force(8))
print(brute_force_vs_optimized.fibonacci_optimized(8))
```

## Documentation

The `docs/` directory contains crucial documentation:

*   **`algorithm_explanations.md`**: Provides a theoretical background on DP, detailed problem descriptions with recurrence relations, state definitions, and visual (ASCII art) diagrams of DP tables.
*   **`interview_tips.md`**: Offers practical advice for interviews, including how to identify DP problems, common DP patterns, a step-by-step approach to solving them, and a list of typical edge cases and gotchas.

It is highly recommended to read through these documents to gain a deeper understanding of the concepts.

## Contributing

Feel free to fork this repository, add more problems, improve explanations, or enhance test cases. Pull requests are welcome!

## License

This project is open-sourced under the MIT License. See the `LICENSE` file (if applicable, or simply state it here) for more details.
---