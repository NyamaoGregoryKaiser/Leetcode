# Stack and Queue Interview Project

This project provides a comprehensive set of problems, solutions, tests, and documentation centered around the Stack and Queue data structures, commonly encountered in coding interviews. It aims to offer a complete learning and preparation resource.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Problems Covered](#problems-covered)
    *   [1. Valid Parentheses](#1-valid-parentheses)
    *   [2. Min Stack](#2-min-stack)
    *   [3. Implement Queue using Stacks](#3-implement-queue-using-stacks)
    *   [4. Implement Stack using Queues](#4-implement-stack-using-queues)
    *   [5. Daily Temperatures](#5-daily-temperatures)
4.  [How to Run](#how-to-run)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
6.  [Additional Notes](#additional-notes)

## Introduction

Stacks and Queues are fundamental linear data structures that follow specific access patterns: Last-In, First-Out (LIFO) for Stacks and First-In, First-Out (FIFO) for Queues. Understanding their properties and typical applications is crucial for any software engineer. This project dives deep into common interview problems involving these data structures, offering optimal solutions, detailed explanations, and performance analysis.

## Project Structure

```
stack_queue_interview_project/
├── README.md                      # This file
├── requirements.txt               # Python dependencies
├── src/                           # Source code for algorithms and custom DS
│   ├── __init__.py
│   ├── stack_queue_problems.py    # Main implementations of problem solutions
│   ├── custom_stack.py            # Custom Stack implementation
│   └── custom_queue.py            # Custom Queue implementation
├── tests/                         # Unit tests
│   ├── __init__.py
│   ├── test_stack_queue_problems.py # Tests for the algorithms
│   └── test_performance.py        # Performance tests for benchmarking
├── docs/                          # Documentation files
│   ├── algorithms_explanation.md  # Detailed algorithm explanations, edge cases, interview tips
│   └── diagrams.md                # Visual diagrams (ASCII art) for complex operations
└── benchmarks/                    # Performance benchmarking scripts
    └── benchmark_runner.py        # Script to run and compare algorithm performance
```

## Problems Covered

Each problem below is implemented with an optimal solution, and often includes discussions or alternative (e.g., brute force) approaches in the code comments or `algorithms_explanation.md`.

### 1. Valid Parentheses

**Problem Description:**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example:**
Input: `s = "()[]{}"`
Output: `true`

Input: `s = "([{}])"`
Output: `true`

Input: `s = "([)]"`
Output: `false`

**Concepts:** Stack, Parentheses Matching

### 2. Min Stack

**Problem Description:**
Design a stack that supports `push`, `pop`, `top`, and `getMin` operations in O(1) time complexity.
*   `push(val)`: Pushes the element `val` onto the stack.
*   `pop()`: Removes the element on top of the stack.
*   `top()`: Gets the top element of the stack.
*   `getMin()`: Retrieves the minimum element in the stack.

**Example:**
```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

**Concepts:** Stack, Auxiliary Data Structure, O(1) Operations

### 3. Implement Queue using Stacks

**Problem Description:**
Implement a first-in, first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

**Example:**
```
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front)
myQueue.peek();  // return 1
myQueue.pop();   // return 1, queue is: [2]
myQueue.empty(); // return false
```

**Concepts:** Queue, Stack, Data Structure Conversion

### 4. Implement Stack using Queues

**Problem Description:**
Implement a last-in, first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

**Example:**
```
MyStack myStack = new MyStack();
myStack.push(1); // stack is: [1]
myStack.push(2); // stack is: [1, 2] (rightmost is top)
myStack.top();   // return 2
myStack.pop();   // return 2, stack is: [1]
myStack.empty(); // return false
```

**Concepts:** Stack, Queue, Data Structure Conversion

### 5. Daily Temperatures

**Problem Description:**
Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

**Example:**
Input: `temperatures = [73,74,75,71,69,72,76,73]`
Output: `[1,1,4,2,1,1,0,0]`
Explanation:
- Day 0 (73): Next warmer is Day 1 (74), wait 1 day.
- Day 1 (74): Next warmer is Day 2 (75), wait 1 day.
- Day 2 (75): Next warmer is Day 6 (76), wait 4 days.
- Day 3 (71): Next warmer is Day 4 (72), wait 2 days.
- Day 4 (69): Next warmer is Day 5 (72), wait 1 day.
- Day 5 (72): Next warmer is Day 6 (76), wait 1 day.
- Day 6 (76): No warmer day.
- Day 7 (73): No warmer day.

**Concepts:** Monotonic Stack, Array Manipulation

## How to Run

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your_username/stack_queue_interview_project.git
    cd stack_queue_interview_project
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Running Tests

To run all unit tests for the problem solutions:

```bash
python -m unittest discover tests
```

### Running Benchmarks

To execute performance benchmarks for selected algorithms:

```bash
python benchmarks/benchmark_runner.py
```

This will output the execution times for different algorithms and input sizes.

## Documentation

*   **Algorithm Explanations**: `docs/algorithms_explanation.md` contains detailed write-ups for each problem, including alternative approaches, time/space complexity comparisons, and interview tips.
*   **Visual Diagrams**: `docs/diagrams.md` provides ASCII art diagrams to visually explain the state changes of data structures during problem execution.

## Additional Notes

*   **Custom Implementations**: `src/custom_stack.py` and `src/custom_queue.py` provide basic list-based implementations of Stack and Queue. While Python's built-in lists are efficient for most use cases, these custom classes are included to demonstrate how these ADTs can be built from primitives and for scenarios where more control or specific behaviors (like fixed-size or linked-list based) might be required.
*   **Brute Force vs. Optimized**: For several problems, a brute-force approach is either discussed in the documentation or included as a commented-out function in the code to highlight the performance benefits of the optimized solution.
*   **Memory Efficiency**: Discussions on memory efficiency are included in the documentation, especially comparing different approaches for problems like `Min Stack` or the implications of using Python's dynamic lists.

This project is designed to be a comprehensive resource for mastering Stack and Queue problems for coding interviews. Happy coding!

---