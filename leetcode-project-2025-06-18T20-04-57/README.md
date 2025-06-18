# Greedy Algorithms Interview Project

This project contains implementations of several classic greedy algorithm problems.  Each problem includes optimized solutions, alternative approaches (where applicable), and performance analysis.

**Problems:**

1. **Fractional Knapsack:** Given a knapsack with a maximum weight capacity and a set of items with weights and values, determine the maximum value that can be carried by selecting fractions of items.

2. **Huffman Coding:** Construct an optimal prefix-free binary code for a given set of characters and their frequencies to minimize the expected code length.

3. **Activity Selection:** Given a set of activities with start and finish times, select the maximum number of non-overlapping activities.

4. **Coin Change (Minimum Coins):** Find the minimum number of coins of different denominations needed to make up a given amount.


**Project Structure:**

- `greedy_algorithms.cpp`: Main implementation of greedy algorithms.
- `test_greedy.cpp`: Unit tests for the algorithms.
- `utils.h`: Helper functions and data structures.
- `benchmark.cpp`: Performance benchmarking code.
- `documentation.md`: Detailed algorithm explanations, diagrams, and edge cases.


**How to Run:**

1. Compile:  `g++ greedy_algorithms.cpp test_greedy.cpp benchmark.cpp -o greedy_app`
2. Run: `./greedy_app`