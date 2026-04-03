# Stack and Queue Interview Project

Welcome to the Stack and Queue Interview Project! This repository is designed to be a comprehensive resource for mastering Stack and Queue data structures for coding interviews. It includes multiple problems with optimal solutions, detailed explanations, performance benchmarks, and interview preparation tips.

## Project Structure

*   `main_algorithms/`: Contains the primary, optimized solutions for various Stack and Queue problems.
*   `tests/`: Unit tests for all implemented algorithms to ensure correctness.
*   `utils/`: Helper utilities and custom data structure implementations (e.g., a basic Stack/Queue).
*   `benchmarks/`: Scripts for performance benchmarking of different solutions.
*   `docs/`: Extensive documentation including problem descriptions, detailed algorithm explanations with ASCII diagrams, and interview preparation tips.
*   `paradigms/`: Alternative implementations, such as brute-force approaches, for comparison with optimized solutions.
*   `README.md` (this file): Project overview and setup instructions.

## Problems Covered

1.  **Valid Parentheses**: Checks if a string containing parentheses is valid. (Stack)
2.  **Min Stack**: Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time. (Stack)
3.  **Implement Queue using Stacks**: Implement a queue's functionality using two stacks. (Stack/Queue interaction)
4.  **Sliding Window Maximum**: Find the maximum element in each sliding window of size `k`. (Monotonic Deque/Queue)
5.  **Rotten Oranges**: Determine the minimum time required for all fresh oranges to rot in a grid. (BFS/Queue)

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/stack_queue_interview_project.git
    cd stack_queue_interview_project
    ```

2.  **Install dependencies (if any, though standard Python libraries are used):**
    No special packages are required beyond Python's built-in `collections` module.

3.  **Run Tests:**
    To run all unit tests for the implemented algorithms:
    ```bash
    python -m unittest discover -s tests
    # or
    python tests/test_problems.py
    ```

4.  **Run Benchmarks:**
    To execute performance benchmarks for comparing different approaches (e.g., optimized vs. brute-force):
    ```bash
    python benchmarks/benchmark_problems.py
    ```

5.  **Explore Solutions and Documentation:**
    *   Browse the `main_algorithms/` directory for problem solutions.
    *   Refer to `docs/README.md` for problem descriptions.
    *   Dive into `docs/algorithm_explanation.md` for in-depth understanding, logic, complexity, and visual diagrams.
    *   Check `docs/interview_tips.md` for preparing for your interviews.

## Contribution

Feel free to open issues or submit pull requests if you have suggestions, improvements, or want to add more problems.

---
### Happy Coding and Good Luck with your Interviews!
---