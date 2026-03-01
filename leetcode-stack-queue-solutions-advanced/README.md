# Stack and Queue Interview Project

This project is designed to provide a comprehensive resource for mastering Stack and Queue data structures in a coding interview context. It includes multiple problems, optimal solutions, alternative approaches, detailed explanations, extensive tests, performance benchmarks, and interview tips.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup and Installation](#setup-and-installation)
3.  [Data Structures](#data-structures)
4.  [Problems](#problems)
    *   [Problem 1: Valid Parentheses](#problem-1-valid-parentheses)
    *   [Problem 2: Implement Queue using Stacks](#problem-2-implement-queue-using-stacks)
    *   [Problem 3: Sliding Window Maximum](#problem-3-sliding-window-maximum)
    *   [Problem 4: Evaluate Reverse Polish Notation](#problem-4-evaluate-reverse-polish-notation)
    *   [Problem 5: Walls and Gates (BFS)](#problem-5-walls-and-gates-bfs)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation and Interview Guide](#documentation-and-interview-guide)

## Project Structure

```
stack-queue-interview-project/
├── src/
│   ├── data-structures/
│   │   ├── Stack.js              # Custom Stack implementation
│   │   └── Queue.js              # Custom Queue implementation (efficient array-based)
│   ├── problems/
│   │   ├── problem1-valid-parentheses/
│   │   │   └── validParentheses.js
│   │   ├── problem2-implement-queue-using-stacks/
│   │   │   └── myQueue.js
│   │   ├── problem3-sliding-window-maximum/
│   │   │   ├── slidingWindowMaximum.js (Optimal with Deque)
│   │   │   └── slidingWindowMaximumBruteForce.js
│   │   ├── problem4-evaluate-reverse-polish-notation/
│   │   │   └── evalRPN.js
│   │   └── problem5-walls-and-gates/
│   │       └── wallsAndGates.js
├── tests/
│   ├── problem1.test.js
│   ├── problem2.test.js
│   ├── problem3.test.js
│   ├── problem4.test.js
│   └── problem5.test.js
├── benchmarks/
│   ├── benchmark-problem1.js
│   ├── benchmark-problem3.js
│   └── benchmark-problem5.js
├── docs/
│   ├── algorithms.md             # Detailed explanations, diagrams, complexities for each problem
│   └── interview-guide.md        # General interview tips, edge cases, variations
├── README.md                     # Project overview and instructions
├── package.json                  # Node.js project configuration and dependencies
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```
2.  **Install dependencies:**
    This project uses `jest` for testing and `benchmark` for performance testing.
    ```bash
    npm install
    ```

## Data Structures

The `src/data-structures` directory contains custom implementations of `Stack` and `Queue` classes. These are used within the problem solutions to demonstrate how these structures work and to ensure a consistent interface.

*   `Stack.js`: An array-based stack implementation with `push`, `pop`, `peek`, `isEmpty`, `size`.
*   `Queue.js`: An efficient array-based queue implementation using two pointers (`head`, `tail`) to avoid `shift()` performance issues, providing `enqueue`, `dequeue`, `peek`, `isEmpty`, `size`.

## Problems

Each problem below is located in its dedicated directory under `src/problems/`. For detailed explanations, examples, and complexity analysis, please refer to [`docs/algorithms.md`](./docs/algorithms.md).

### Problem 1: Valid Parentheses

*   **Description**: Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
*   **Solution**: `src/problems/problem1-valid-parentheses/validParentheses.js`
*   **Approach**: Uses a stack to keep track of opening brackets and match them with closing brackets.

### Problem 2: Implement Queue using Stacks

*   **Description**: Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
*   **Solution**: `src/problems/problem2-implement-queue-using-stacks/myQueue.js`
*   **Approach**: Uses two internal stacks: one for input (`inStack`) and one for output (`outStack`). Elements are moved from `inStack` to `outStack` when a `pop` or `peek` operation is performed on an empty `outStack`.

### Problem 3: Sliding Window Maximum

*   **Description**: You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Return the max sliding window.
*   **Optimal Solution**: `src/problems/problem3-sliding-window-maximum/slidingWindowMaximum.js`
    *   **Approach**: Uses a **monotonic decreasing deque (double-ended queue)** to efficiently find the maximum in `O(N)` time.
*   **Brute Force Solution**: `src/problems/problem3-sliding-window-maximum/slidingWindowMaximumBruteForce.js`
    *   **Approach**: Iterates through each window and finds the maximum in `O(K)` time, leading to `O(N*K)` total time.

### Problem 4: Evaluate Reverse Polish Notation

*   **Description**: You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression.
*   **Solution**: `src/problems/problem4-evaluate-reverse-polish-notation/evalRPN.js`
*   **Approach**: Uses a stack to store operands. When an operator is encountered, pop the top two operands, perform the operation, and push the result back onto the stack.

### Problem 5: Walls and Gates (BFS)

*   **Description**: You are given an `m x n` grid where:
    *   `-1` represents a wall or an obstacle.
    *   `0` represents a gate.
    *   `INF` (represented by `2^31 - 1`) represents an empty room.
    Fill each empty room with the distance to its nearest gate. If an empty room cannot reach a gate, it should remain `INF`.
*   **Solution**: `src/problems/problem5-walls-and-gates/wallsAndGates.js`
*   **Approach**: Implements a **Multi-Source Breadth-First Search (BFS)**. All gates are initially added to the queue, and then BFS expands outwards, filling distances layer by layer. This problem demonstrates a powerful application of Queues in graph traversal.

## Running Tests

To run all tests for the project:

```bash
npm test
```

To run tests for a specific problem (e.g., Problem 1):

```bash
npm test -- tests/problem1.test.js
```

## Running Benchmarks

Benchmarks are provided for problems where performance comparison (e.g., brute force vs. optimized) is relevant or to demonstrate the efficiency of the optimal solution on large inputs.

To run all benchmarks:

```bash
npm run benchmark

# Or individually:
npm run benchmark-problem1
npm run benchmark-problem3
npm run benchmark-problem5
```

## Documentation and Interview Guide

*   **`docs/algorithms.md`**: Provides in-depth explanations for each problem, including:
    *   Problem statement and examples.
    *   Detailed logic of optimal and alternative approaches.
    *   Step-by-step walkthroughs (sometimes with ASCII diagrams).
    *   Time and Space Complexity analysis.
    *   Consideration of edge cases.
*   **`docs/interview-guide.md`**: Offers general advice for tackling Stack and Queue problems in interviews:
    *   Common patterns and use cases.
    *   Tips for discussing complexity.
    *   Strategies for handling edge cases.
    *   Variations of classic problems.

---
Enjoy your journey mastering Stacks and Queues!

---