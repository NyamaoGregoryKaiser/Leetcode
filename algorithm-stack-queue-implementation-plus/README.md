```markdown
# Stack and Queue Interview Project

This project provides a comprehensive set of coding interview problems centered around Stack and Queue data structures. It aims to cover various common patterns, techniques, and complexities associated with these fundamental data structures, offering optimal solutions, alternative approaches, detailed explanations, and extensive test cases.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup and Installation](#setup-and-installation)
3.  [Problems Covered](#problems-covered)
    *   [P1: Valid Parentheses](#p1-valid-parentheses)
    *   [P2: Min Stack](#p2-min-stack)
    *   [P3: Implement Queue using Stacks](#p3-implement-queue-using-stacks)
    *   [P4: Walls and Gates (BFS)](#p4-walls-and-gates-bfs)
    *   [P5: Sliding Window Maximum (Deque)](#p5-sliding-window-maximum-deque)
4.  [Data Structures](#data-structures)
5.  [Testing](#testing)
6.  [Benchmarking](#benchmarking)
7.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Diagrams](#diagrams)
    *   [Interview Tips](#interview-tips)

## Project Structure

```
.
├── README.md
├── package.json
├── tsconfig.json
├── src
│   ├── data-structures           # Custom implementations of Stack, Queue, Deque
│   │   ├── Deque.ts
│   │   ├── Queue.ts
│   │   └── Stack.ts
│   ├── problems                  # Main algorithm implementations for each problem
│   │   ├── P1_ValidParentheses.ts
│   │   ├── P2_MinStack.ts
│   │   ├── P3_QueueUsingStacks.ts
│   │   ├── P4_WallsAndGates.ts
│   │   └── P5_SlidingWindowMaximum.ts
│   ├── utils                     # Helper utilities (e.g., performance benchmarking)
│   │   └── benchmark.ts
│   └── index.ts                  # Entry point to run examples and benchmarks
├── tests                         # Jest test files for each problem
│   ├── P1_ValidParentheses.test.ts
│   ├── P2_MinStack.test.ts
│   ├── P3_QueueUsingStacks.test.ts
│   ├── P4_WallsAndGates.test.ts
│   └── P5_SlidingWindowMaximum.test.ts
└── docs                          # Comprehensive documentation
    ├── algorithms_explained.md
    ├── diagrams.md
    └── interview_tips.md
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd stack-queue-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install TypeScript, Jest, and other development dependencies.

## Problems Covered

Each problem file (`src/problems/P*.ts`) contains:
*   Problem statement (as comments).
*   Multiple approaches (where applicable, e.g., brute force vs. optimal).
*   Detailed comments explaining logic.
*   Time and space complexity analysis.

### P1: Valid Parentheses

**Problem Statement:**
Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid.
An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Example:**
*   `"()[]{}"` -> `true`
*   `"([{}])"` -> `true`
*   `"({[)]"` -> `false`
*   `"{[]}"` -> `true`

**Approach:** Use a stack to keep track of opening brackets.

### P2: Min Stack

**Problem Statement:**
Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.
Implement the `MinStack` class:
*   `MinStack()` initializes the stack object.
*   `void push(val)` pushes the element `val` onto the stack.
*   `void pop()` removes the element on the top of the stack.
*   `int top()` gets the top element of the stack.
*   `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for `getMin`, `push`, `pop`, and `top` operations.

**Approach:** Use an auxiliary stack or store pairs of `[value, current_min]`.

### P3: Implement Queue using Stacks

**Problem Statement:**
Implement a first-in, first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:
*   `MyQueue()` initializes the queue object.
*   `void push(x)` pushes element `x` to the back of the queue.
*   `int pop()` removes the element from the front of the queue and returns it.
*   `int peek()` returns the element at the front of the queue.
*   `boolean empty()` returns `true` if the queue is empty, `false` otherwise.

**Notes:**
*   You must use only standard operations of a stack, meaning only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
*   Each of the operations should have an amortized O(1) time complexity.

**Approach:** Use two stacks, one for input and one for output.

### P4: Walls and Gates (BFS)

**Problem Statement:**
You are given an `m x n` `grid` representing a 2D map.
*   `-1` represents a wall or an obstacle.
*   `0` represents a gate.
*   `INF` (represented by `2^31 - 1` or `Number.MAX_SAFE_INTEGER` in our case) represents an empty room.

Fill each empty room with the distance to its nearest gate. If an empty room cannot reach a gate, it should remain `INF`.
The distance between two rooms is the number of steps in a four-directional movement (up, down, left, right).

**Example:**
Input:
```
INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
```
Output:
```
  3  -1  0   1
  2   2  1  -1
  1  -1  2  -1
  0  -1  3   4
```

**Approach:** Multi-source Breadth-First Search (BFS) starting from all gates simultaneously.

### P5: Sliding Window Maximum (Deque)

**Problem Statement:**
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.

**Example:**
Input: `nums = [1,3,-1,-3,5,3,6,7], k = 3`
Output: `[3,3,5,5,6,7]`

Explanation:

Window position                Max
---------------               -----
`[1  3  -1]` -3  5  3  6  7       3
 1 `[3  -1  -3]` 5  3  6  7       3
 1  3 `[-1  -3  5]` 3  6  7       5
 1  3  -1 `[-3  5  3]` 6  7       5
 1  3  -1  -3 `[5  3  6]` 7       6
 1  3  -1  -3  5 `[3  6  7]`      7

**Approach:** Use a Double-Ended Queue (Deque) to store indices of elements in decreasing order of their values.

## Data Structures

The `src/data-structures` directory contains custom implementations of basic data structures, primarily for demonstration and to ensure understanding of their underlying mechanics.

*   `Stack.ts`: A generic LIFO (Last-In, First-Out) stack.
*   `Queue.ts`: A generic FIFO (First-In, First-Out) queue.
*   `Deque.ts`: A generic Double-Ended Queue, which allows additions/removals from both ends.

## Testing

This project uses [Jest](https://jestjs.io/) for testing.
Test files are located in the `tests/` directory and mirror the problem structure. Each test file (`P*.test.ts`) contains extensive test cases, including:
*   Happy paths
*   Edge cases (empty input, single element, large inputs)
*   Specific tricky scenarios

To run all tests:
```bash
npm test
```

## Benchmarking

A simple benchmarking utility (`src/utils/benchmark.ts`) is provided to measure the execution time of different solutions or for specific test cases.

To run benchmarks for the problems (currently configured in `src/index.ts`):
```bash
npm run start
```
This script compiles the TypeScript code and then executes `src/index.ts`, which can be configured to call benchmark functions for different problems.

## Documentation

The `docs/` directory contains comprehensive documentation to complement the code.

### Algorithm Explanations (`docs/algorithms_explained.md`)
*   Detailed breakdown of the logic behind each optimal solution.
*   Discussion of alternative approaches, their pros and cons.
*   In-depth analysis of time and space complexity.

### Diagrams (`docs/diagrams.md`)
*   ASCII art diagrams to visually explain complex concepts or data structure operations (e.g., stack pushes/pops, queue flow, deque state changes, BFS traversal).

### Interview Tips (`docs/interview_tips.md`)
*   General advice for tackling Stack and Queue problems in interviews.
*   Common pitfalls, edge cases to always consider.
*   Variations of standard problems.
*   Strategies for communicating your thought process.
```