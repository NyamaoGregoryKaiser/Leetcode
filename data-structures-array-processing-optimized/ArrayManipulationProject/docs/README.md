# Array Manipulation Interview Project

This project serves as a comprehensive resource for preparing for coding interviews focused on Array Manipulation problems. It includes C++ implementations of several common array problems, each with multiple approaches (optimal, alternative, brute-force), detailed complexity analysis, extensive test cases, and performance benchmarks.

The goal is to provide a holistic learning experience, covering not just the code, but also the thought process, documentation, and evaluation aspects crucial for a successful interview.

## Project Structure

*   `src/`: Contains the C++ source code for the array manipulation algorithms.
*   `tests/`: Contains unit tests implemented using the Google Test framework.
*   `benchmarks/`: Contains performance benchmarking code to compare different algorithm approaches.
*   `docs/`: Contains detailed documentation including this README, algorithm explanations, and interview tips.
*   `utils/`: Contains utility functions used across tests and benchmarks.
*   `Makefile`: Automates the build and test process.

## Problems Covered

This project addresses the following array manipulation problems:

1.  **Rotate Array**: Rotate an array to the right by `k` steps.
2.  **Find the Duplicate Number**: Find the one duplicate number in an array containing `n+1` integers where each integer is between `1` and `n` inclusive.
3.  **Trapping Rain Water**: Calculate how much rainwater can be trapped between bars of varying heights.
4.  **Product of Array Except Self**: Calculate an array `output` such that `output[i]` is equal to the product of all the elements of `nums` except `nums[i]`, without using division.

For detailed problem descriptions, multiple approaches, complexity analysis, and visual diagrams, please refer to `docs/ALGORITHMS.md`.

## Setup and Building

To build and run this project, you will need:
*   A C++ compiler (GCC, Clang, etc.)
*   `make` utility
*   Google Test framework (can be installed or built from source, `Makefile` includes instructions to fetch it if not found locally)

### Clone the Repository (or create the directory structure)

```bash
git clone <repository_url> # If this were a real repo
cd ArrayManipulationProject
```

### Build Everything

The `Makefile` will automatically fetch Google Test if it's not present in a common system path.

```bash
make
```

This command will:
1.  Compile all source files.
2.  Build the test executable (`./bin/test_runner`).
3.  Build the benchmark executable (`./bin/benchmark_runner`).

## Running Tests

After building, you can run the unit tests:

```bash
make test
# Or directly:
./bin/test_runner
```

This will execute all test cases defined in `tests/test_array_manipulator.cpp` and `tests/main_test.cpp`.

## Running Benchmarks

To evaluate the performance of different algorithm implementations:

```bash
make benchmark
# Or directly:
./bin/benchmark_runner
```

This will run various benchmarks, comparing the execution time of different approaches for each problem with varying input sizes.

## Documentation

*   **`docs/ALGORITHMS.md`**: Dive deep into each problem with problem statements, examples, step-by-step explanations of multiple approaches (optimal, alternative), ASCII diagrams, and detailed time/space complexity analysis.
*   **`docs/INTERVIEW_TIPS.md`**: Get valuable advice on how to approach array manipulation questions in an interview, common pitfalls, crucial questions to ask, and variations to expect.

---