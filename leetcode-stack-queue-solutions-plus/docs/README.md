```markdown
# Stack and Queue Interview Project

This project provides a comprehensive resource for mastering Stack and Queue data structures in the context of coding interviews. It includes optimal Python implementations for several classic problems, thorough unit tests, performance benchmarks, and detailed documentation.

## Project Structure

```
stack_queue_interview_project/
├── src/
│   ├── stack_queue_problems.py         # Main algorithm implementations for core problems
│   ├── custom_ds.py                    # Custom Stack and Queue implementations (for understanding)
│   └── utils.py                        # Helper utilities like a Timer for benchmarking
├── tests/
│   ├── test_stack_queue_problems.py    # Unit tests for the problems in stack_queue_problems.py
│   └── test_performance.py             # Performance benchmarking script
├── docs/
│   ├── README.md                       # (You are here) Project overview, setup, and problem descriptions
│   ├── ALGORITHM_EXPLANATIONS.md       # Detailed explanation of algorithms with diagrams
│   └── INTERVIEW_GUIDE.md              # Interview tips, common variations, and edge cases
└── additional_implementations/
    ├── min_stack_variations.py         # Different approaches to implement Min Stack
    └── queue_from_stacks_variations.py # Different approaches to implement Queue from Stacks
```

## Setup and Running

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd stack_queue_interview_project
    ```
2.  **Ensure Python 3 is installed.**

### Running Tests

To run the unit tests for all problems:

```bash
python -m unittest discover tests
```

### Running Performance Benchmarks

To execute the performance benchmarks on large datasets:

```bash
python tests/test_performance.py
```

### Exploring Implementations

The main algorithms are in `src/stack_queue_problems.py`.
Custom data structure implementations (for foundational understanding) are in `src/custom_ds.py`.
Additional implementation variations (e.g., different ways to solve Min Stack) are in the `additional_implementations/` directory.

## Problem Descriptions

Here's a brief overview of the problems covered in `src/stack_queue_problems.py`:

1.  **Valid Parentheses (LeetCode 20)**
    *   **Description**: Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. Valid strings have matching open and close brackets in the correct order.
    *   **Technique**: Stack
    *   **Optimal Complexity**: Time O(N), Space O(N)

2.  **Min Stack (LeetCode 155)**
    *   **Description**: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
    *   **Technique**: Two Stacks (or one stack with paired elements)
    *   **Optimal Complexity**: Time O(1) for all operations, Space O(N)

3.  **Implement Queue using Stacks (LeetCode 232)**
    *   **Description**: Implement a FIFO queue using only two stacks. The queue should support `push`, `pop`, `peek`, and `empty` operations.
    *   **Technique**: Two Stacks
    *   **Optimal Complexity**: Time O(1) amortized for `pop` and `peek`, O(1) for `push` and `empty`. Space O(N).

4.  **Sliding Window Maximum (LeetCode 239)**
    *   **Description**: Given an array of integers `nums` and a sliding window of size `k`, return the maximum value in each window as it slides from left to right.
    *   **Technique**: Monotonic Deque (Double-Ended Queue)
    *   **Optimal Complexity**: Time O(N), Space O(K)

5.  **Daily Temperatures (LeetCode 739)**
    *   **Description**: Given an array of daily temperatures, return an array `answer` where `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If no such day exists, `answer[i]` is `0`.
    *   **Technique**: Monotonic Stack
    *   **Optimal Complexity**: Time O(N), Space O(N)

## Documentation

Dive deeper into the `docs/` directory for:
*   **`ALGORITHM_EXPLANATIONS.md`**: Detailed step-by-step breakdowns of each algorithm with visual diagrams (ASCII art) and complexity analysis.
*   **`INTERVIEW_GUIDE.md`**: Practical interview tips, common variations of these problems, discussions on edge cases, and points to highlight during an interview.

## Contributing

Feel free to fork this project, add more problems, alternative solutions, or improve documentation. Pull requests are welcome!

```