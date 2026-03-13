# Dynamic Programming Interview Project

This project provides a comprehensive set of Dynamic Programming (DP) problems, solutions, and supporting materials designed to help prepare for coding interviews. It covers various DP patterns, from basic 1D DP to 2D table problems, along with detailed explanations, test cases, and performance analysis.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Build and Run](#how-to-build-and-run)
3.  [Problems Covered](#problems-covered)
    *   [1. Fibonacci Number](#1-fibonacci-number)
    *   [2. Longest Common Subsequence (LCS)](#2-longest-common-subsequence-lcs)
    *   [3. 0/1 Knapsack Problem](#3-01-knapsack-problem)
    *   [4. Coin Change (Minimum Coins)](#4-coin-change-minimum-coins)
    *   [5. House Robber (Linear & Circular)](#5-house-robber-linear--circular)
4.  [Documentation](#documentation)
5.  [Benchmarking](#benchmarking)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Structure

```
dp_interview_project/
├── src/
│   ├── main_dp_problems.cpp        # Optimal DP solutions (memoization/tabulation)
│   ├── brute_force_solutions.cpp   # Brute-force/naive recursive solutions for comparison
│   ├── optimized_space.cpp         # Space-optimized DP solutions for select problems
│   └── helpers.hpp                 # Utility functions (e.g., printing vectors/matrices)
├── tests/
│   ├── test_dp_problems.cpp        # Unit tests using Google Test
│   └── test_data.hpp               # Definitions of test cases
├── docs/
│   ├── README.md                   # Project overview, build instructions, problem descriptions
│   ├── ALGORITHM_EXPLANATION.md    # Detailed DP concepts, recurrence relations, state transitions
│   ├── INTERVIEW_TIPS.md           # General DP interview strategies, common pitfalls, variations
│   └── visual_diagrams.txt         # ASCII art diagrams for DP table filling, recursion trees
├── benchmarking/
│   └── benchmark.cpp               # Performance benchmarks using Google Benchmark
├── .gitignore                      # Git ignore file
└── CMakeLists.txt                  # CMake build configuration
```

## How to Build and Run

This project uses `CMake` for building and `Google Test` and `Google Benchmark` for testing and performance analysis.

### Prerequisites

*   A C++17 compatible compiler (e.g., GCC, Clang, MSVC).
*   CMake (version 3.14 or higher).
*   Google Test library installed on your system.
*   Google Benchmark library installed on your system.

**Installing Google Test and Google Benchmark (Example for Ubuntu/Debian):**

```bash
# For Google Test
sudo apt-get update
sudo apt-get install libgtest-dev
cd /usr/src/googletest
sudo cmake .
sudo make
sudo mv libgtest* /usr/local/lib/
# Rebuild the installed libraries if necessary to link properly for your compiler
# For benchmark
sudo apt-get install libbenchmark-dev
```
*Note: Depending on your system, you might need to build Google Test and Google Benchmark from source if pre-built packages aren't available or compatible.*

### Build Steps

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd dp_interview_project
    ```
2.  **Create a build directory:**
    ```bash
    mkdir build
    cd build
    ```
3.  **Configure CMake:**
    ```bash
    cmake ..
    ```
    *If CMake struggles to find Google Test or Google Benchmark, you might need to specify their installation paths, e.g.:*
    ```bash
    cmake .. -DGTest_DIR="/path/to/googletest/install/lib/cmake/GTest" -Dbenchmark_DIR="/path/to/google_benchmark/install/lib/cmake/benchmark"
    ```
4.  **Build the project:**
    ```bash
    cmake --build .
    ```

### Run Steps

*   **Run Tests:**
    ```bash
    ./dp_tests
    ```
*   **Run Benchmarks:**
    ```bash
    ./dp_benchmarks
    ```

## Problems Covered

Each problem includes multiple implementations (optimal DP, brute force, space-optimized) and is thoroughly tested.

### 1. Fibonacci Number

*   **Description**: Calculate the N-th Fibonacci number. ($F(0) = 0, F(1) = 1, F(N) = F(N-1) + F(N-2)$ for $N > 1$).
*   **Implementations**:
    *   `DPProblems::fibonacci_memoization`: Top-down (recursive with memoization).
    *   `DPProblems::fibonacci_tabulation`: Bottom-up (iterative with tabulation).
    *   `BruteForceDP::fibonacci_brute_force`: Naive recursive (exponential time).
    *   `OptimizedSpaceDP::fibonacci_o1_space`: Bottom-up with O(1) space complexity.

### 2. Longest Common Subsequence (LCS)

*   **Description**: Find the length of the longest common subsequence of two given strings.
*   **Implementations**:
    *   `DPProblems::longest_common_subsequence`: Bottom-up (iterative with 2D tabulation).
    *   `BruteForceDP::longest_common_subsequence_brute_force`: Naive recursive (exponential time).
    *   `OptimizedSpaceDP::longest_common_subsequence_o_n_space`: Bottom-up with O(min(m, n)) space complexity for length calculation.

### 3. 0/1 Knapsack Problem

*   **Description**: Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value. Each item can either be put or not put in the knapsack.
*   **Implementations**:
    *   `DPProblems::knapsack_01_tabulation`: Bottom-up (iterative with 2D tabulation).
    *   `BruteForceDP::knapsack_01_brute_force`: Naive recursive (exponential time).
    *   `OptimizedSpaceDP::knapsack_01_o_w_space`: Bottom-up with O(W) space complexity.

### 4. Coin Change (Minimum Coins)

*   **Description**: Given an array of coin denominations and a target amount, return the fewest number of coins needed to make up that amount. Assume infinite supply of each coin.
*   **Implementations**:
    *   `DPProblems::coin_change_min_coins`: Bottom-up (iterative with 1D tabulation). (This is already space-optimal for this problem, O(amount) space).

### 5. House Robber (Linear & Circular)

*   **Description**:
    *   **Linear**: Rob houses along a street; adjacent houses cannot be robbed. Maximize total money.
    *   **Circular**: Houses are arranged in a circle; first and last houses are adjacent. Maximize total money.
*   **Implementations**:
    *   `DPProblems::house_robber_linear`: Bottom-up (iterative with 1D tabulation) for linear arrangement.
    *   `DPProblems::house_robber_circular`: Extends linear solution for circular arrangement.
    *   `OptimizedSpaceDP::house_robber_linear_o1_space`: O(1) space for linear arrangement.
    *   `OptimizedSpaceDP::house_robber_circular_o1_space`: Extends O(1) linear solution for circular.

## Documentation

The `docs/` directory contains detailed explanations:

*   **`ALGORITHM_EXPLANATION.md`**: Delves into core DP concepts (overlapping subproblems, optimal substructure, memoization vs. tabulation) and provides detailed walkthroughs for each problem, including recurrence relations, base cases, and DP table construction.
*   **`INTERVIEW_TIPS.md`**: Offers general advice for tackling DP problems in interviews, common DP patterns, space optimization techniques, and potential follow-up questions.
*   **`visual_diagrams.txt`**: ASCII art diagrams to visually illustrate DP concepts, such as recursion trees for Fibonacci or DP table filling for LCS and Knapsack.

## Benchmarking

The `benchmarking/` directory contains `benchmark.cpp` which uses `Google Benchmark` to compare the performance of different implementations (brute force vs. optimized DP, memoization vs. tabulation, space-optimized vs. standard DP) for various problems and input sizes. This helps in empirically understanding the efficiency gains.

## Contributing

Feel free to contribute by:
*   Adding more DP problems.
*   Improving existing solutions or adding alternative approaches.
*   Enhancing documentation or adding more visual aids.
*   Expanding test cases or benchmarks.

Please follow standard C++ coding conventions and maintain clear comments and complexity analysis.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (not included in this generation, but good practice to have).

---
*(End of README.md)*