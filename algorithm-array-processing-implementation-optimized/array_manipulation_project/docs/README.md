# Array Manipulation Interview Project

This project provides a comprehensive set of problems, solutions, tests, and documentation for common Array Manipulation interview questions. It's designed to help candidates prepare for technical interviews by offering detailed explanations, multiple approaches, complexity analysis, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [Setup and Installation](#setup-and-installation)
4.  [How to Run Tests](#how-to-run-tests)
5.  [How to Run Benchmarks](#how-to-run-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
array_manipulation_project/
├── src/                          # Main source code
│   ├── problems/                 # Problem implementations
│   │   ├── array_rotation.py
│   │   ├── subarray_sum_equals_k.py
│   │   ├── merge_intervals.py
│   │   └── trapping_rain_water.py
│   └── utils/                    # Helper utilities
│       └── array_helpers.py
├── tests/                        # Unit tests for each problem
│   ├── test_array_rotation.py
│   ├── test_subarray_sum_equals_k.py
│   ├── test_merge_intervals.py
│   └── test_trapping_rain_water.py
├── docs/                         # Documentation files
│   ├── README.md                 # This file
│   ├── ALGORITHM_EXPLANATIONS.md # Detailed problem explanations, diagrams, edge cases
│   └── INTERVIEW_TIPS.md         # General interview advice for array problems
├── benchmarks/                   # Performance benchmarking scripts
│   └── benchmark_solutions.py
├── requirements.txt              # Python dependencies
└── .gitignore                    # Git ignore file
```

## Problems Covered

This project covers four fundamental array manipulation problems, each with multiple approaches (where applicable), optimal solutions, detailed comments, and complexity analysis:

1.  **Array Rotation**: Rotate an array to the right by `k` steps.
2.  **Subarray Sum Equals K**: Find the total number of continuous subarrays whose sum equals `k`.
3.  **Merge Intervals**: Given a collection of intervals, merge all overlapping intervals.
4.  **Trapping Rain Water**: Compute how much water an elevation map can trap after raining.

For a deep dive into each problem's explanation, algorithms, visual diagrams, and edge cases, refer to `docs/ALGORITHM_EXPLANATIONS.md`.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array_manipulation_project.git
    cd array_manipulation_project
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv .venv
    ```
3.  **Activate the virtual environment:**
    -   On macOS/Linux:
        ```bash
        source .venv/bin/activate
        ```
    -   On Windows:
        ```bash
        .venv\Scripts\activate
        ```
4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run Tests

All unit tests are located in the `tests/` directory. You can run them using the `unittest` module from the project root:

```bash
python -m unittest discover tests
```

To run tests for a specific problem, e.g., Array Rotation:

```bash
python -m unittest tests.test_array_rotation
```

## How to Run Benchmarks

The `benchmarks/benchmark_solutions.py` script compares the performance of different approaches for selected problems.

To run the benchmarks:

```bash
python benchmarks/benchmark_solutions.py
```

The output will show the execution time for different algorithms on various input sizes.

## Documentation

The `docs/` directory contains comprehensive documentation:

*   **`ALGORITHM_EXPLANATIONS.md`**: Detailed breakdown of each problem, including:
    *   Problem Description
    *   Multiple Approaches (Brute Force, Optimized)
    *   Step-by-step logic
    *   Time and Space Complexity Analysis
    *   Visual Diagrams (ASCII art)
    *   Edge Cases and Gotchas
*   **`INTERVIEW_TIPS.md`**: General advice for tackling array manipulation problems in interviews, common patterns, discussion points, and follow-up questions.

## Contributing

Feel free to open issues or submit pull requests for improvements, additional problems, or alternative solutions.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details. (Note: A `LICENSE` file is not included in this response, but would typically be part of a real project).