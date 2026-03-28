# Greedy Algorithms Interview Project

This project serves as a comprehensive resource for understanding, implementing, and testing Greedy Algorithms, particularly in the context of coding interviews. It includes implementations of several classic greedy problems, extensive test cases, performance benchmarking, and detailed documentation.

## Project Structure

*   `README.md`: This file, providing an overview of the project.
*   `src/`: Contains the main algorithm implementations.
    *   `greedy_algorithms.cpp`: Implementations of various greedy algorithms with detailed comments, complexity analysis, and multiple approaches where applicable.
    *   `utils/`: Helper utilities.
        *   `stopwatch.h`: A simple utility for performance benchmarking.
        *   `test_utils.h`: Utilities for formatting test output.
*   `tests/`: Contains test files for the algorithms.
    *   `test_greedy_algorithms.cpp`: Comprehensive unit tests for all algorithms in `greedy_algorithms.cpp`, including edge cases and performance benchmarks.
*   `docs/`: Documentation files.
    *   `greedy_explanation.md`: A detailed explanation of Greedy Algorithms, their characteristics, proof techniques, and common pitfalls.
    *   `interview_tips.md`: Advice on how to approach greedy problems in an interview setting, common variations, and questions to ask.
*   `brute_force_vs_greedy/`: Demonstrates the difference between brute-force and greedy approaches, particularly for problems where greedy might not yield an optimal solution.
    *   `knapsack_brute_force.cpp`: A brute-force (recursive) solution for the 0/1 Knapsack problem.
    *   `knapsack_greedy_comparison.cpp`: Demonstrates how the greedy approach for Fractional Knapsack differs from 0/1 Knapsack and why it's not optimal for 0/1.

## Algorithms Implemented

1.  **Activity Selection Problem**:
    *   **Description**: Given a set of activities, each with a start and finish time, select the maximum number of non-overlapping activities that can be performed by a single person or machine.
    *   **Greedy Choice**: Always select the activity that finishes earliest among the remaining compatible activities.

2.  **Fractional Knapsack Problem**:
    *   **Description**: Given a set of items, each with a weight and a value, and a knapsack with a maximum capacity, determine the fraction of each item to include in the knapsack so that the total value is maximized. Items can be broken.
    *   **Greedy Choice**: Sort items by their value-to-weight ratio in descending order and pick items with the highest ratio first.

3.  **Coin Change Problem (Greedy for specific coin sets)**:
    *   **Description**: Given a set of coin denominations and an amount, find the minimum number of coins to make up that amount. (Note: This greedy strategy only works for *specific* coin sets, like standard currency systems, but not all arbitrary sets. The implementation focuses on the scenario where it *does* work.)
    *   **Greedy Choice**: Always pick the largest denomination coin less than or equal to the remaining amount.

4.  **Huffman Coding**:
    *   **Description**: A data compression algorithm that assigns variable-length codes to input characters, with shorter codes assigned to more frequent characters. It constructs an optimal prefix code.
    *   **Greedy Choice**: Repeatedly merge the two nodes (characters or sub-trees) with the smallest frequencies until a single tree remains. This is typically done using a min-priority queue.

## How to Build and Run

This project uses C++17 features (e.g., `std::tuple` for structured bindings), but can be adapted for C++11/14. A standard C++ compiler like g++ is sufficient.

**Compilation Steps (using g++ on Linux/macOS):**

1.  **Compile Main Algorithms & Tests:**
    ```bash
    g++ -std=c++17 -O2 -Wall src/greedy_algorithms.cpp tests/test_greedy_algorithms.cpp -Isrc/utils -o greedy_tests
    ```
    *   `-std=c++17`: Enables C++17 features.
    *   `-O2`: Optimization level.
    *   `-Wall`: Enables all warnings.
    *   `-Isrc/utils`: Includes the `src/utils` directory for headers like `stopwatch.h`.
    *   `-o greedy_tests`: Output executable name.

2.  **Run Tests:**
    ```bash
    ./greedy_tests
    ```

3.  **Compile Brute Force vs. Greedy Comparison (Optional):**
    ```bash
    g++ -std=c++17 -O2 -Wall brute_force_vs_greedy/knapsack_brute_force.cpp -o knapsack_brute_force
    g++ -std=c++17 -O2 -Wall brute_force_vs_greedy/knapsack_greedy_comparison.cpp src/greedy_algorithms.cpp -Isrc/utils -o knapsack_greedy_comparison
    ```
    (Note: `knapsack_greedy_comparison.cpp` needs `greedy_algorithms.cpp` because it uses the `fractionalKnapsack` function.)

4.  **Run Brute Force vs. Greedy Comparison:**
    ```bash
    ./knapsack_brute_force
    ./knapsack_greedy_comparison
    ```

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements.

---
**Author:** AI Assistant

---