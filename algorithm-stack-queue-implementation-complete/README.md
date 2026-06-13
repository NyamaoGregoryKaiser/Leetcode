# Stack and Queue Interview Project

This project provides a comprehensive collection of problems, solutions, and supporting materials for common Stack and Queue data structure interview questions. It aims to be a valuable resource for developers preparing for technical interviews, offering detailed explanations, optimal implementations, and performance analysis.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Data Structures](#data-structures)
4.  [Problems & Solutions](#problems--solutions)
    *   [Problem 1: Valid Parentheses](#problem-1-valid-parentheses)
    *   [Problem 2: Min Stack](#problem-2-min-stack)
    *   [Problem 3: Implement Queue using Stacks](#problem-3-implement-queue-using-stacks)
    *   [Problem 4: LRU Cache](#problem-4-lru-cache)
    *   [Problem 5: Moving Average from Data Stream](#problem-5-moving-average-from-data-stream)
5.  [Setup and Usage](#setup-and-usage)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Exploring Code](#exploring-code)
6.  [Documentation](#documentation)
7.  [Interview Tips](#interview-tips)

## Project Structure

```
stack-queue-interview-project/
├── README.md                 # This file
├── src/                      # Source code for data structures and problems
│   ├── data-structures/      # Custom implementations of Stack and Queue
│   │   ├── Stack.js
│   │   └── Queue.js
│   ├── problems/             # Solutions to various problems
│   │   ├── Problem1_ValidParentheses.js
│   │   ├── Problem2_MinStack.js
│   │   ├── Problem3_QueueUsingStacks.js
│   │   ├── Problem4_LRUCache.js
│   │   └── Problem5_MovingAverageFromDataStream.js
│   ├── utils/                # Helper utilities (e.g., Doubly Linked List for LRU Cache)
│   │   └── DoublyLinkedList.js
│   └── index.js              # Entry point to run examples or test individual problems
├── tests/                    # Unit tests for data structures and problems
│   ├── test_Stack.js
│   ├── test_Queue.js
│   ├── test_ValidParentheses.js
│   ├── test_MinStack.js
│   ├── test_QueueUsingStacks.js
│   ├── test_LRUCache.js
│   └── test_MovingAverageFromDataStream.js
├── docs/                     # Comprehensive documentation
│   ├── algorithms.md         # Detailed explanation of algorithms
│   ├── interview-tips.md     # General interview advice and problem variations
│   └── diagrams.md           # ASCII art diagrams for data structures and concepts
├── benchmarks/               # Performance benchmarking scripts
│   ├── benchmark_ValidParentheses.js
│   ├── benchmark_MinStack.js
│   └── benchmark_QueueUsingStacks.js
└── package.json              # Project dependencies and scripts
```

## Features

*   **Custom Data Structures:** Implementations of Stack and Queue from scratch.
*   **Multiple Problems:** A selection of 5 common and challenging interview problems.
*   **Optimal Solutions:** Each problem provides an optimal solution with detailed comments.
*   **Complexity Analysis:** Time and space complexity for all solutions.
*   **Extensive Tests:** Comprehensive unit tests covering various scenarios and edge cases.
*   **Performance Benchmarking:** Scripts to measure and compare solution performance.
*   **Detailed Documentation:** In-depth explanations of algorithms, visual diagrams, and interview tips.

## Data Structures

The `src/data-structures` directory contains custom implementations:

*   **`Stack.js`**: A basic LIFO (Last-In, First-Out) stack implementation using an array.
*   **`Queue.js`**: A basic FIFO (First-In, First-Out) queue implementation using an array.
*   **`DoublyLinkedList.js`**: (Located in `src/utils`) A helper structure crucial for the LRU Cache problem, providing O(1) insertions and deletions.

## Problems & Solutions

Here's a brief overview of the problems addressed in `src/problems`:

### Problem 1: Valid Parentheses
*   **Description:** Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if open brackets must be closed by the same type of brackets and open brackets must be closed in the correct order.
*   **Concepts:** Stack, matching pairs.
*   **Solution:** `src/problems/Problem1_ValidParentheses.js`

### Problem 2: Min Stack
*   **Description:** Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
*   **Concepts:** Stack, auxiliary data structures, constant time operations.
*   **Solution:** `src/problems/Problem2_MinStack.js`

### Problem 3: Implement Queue using Stacks
*   **Description:** Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
*   **Concepts:** Stack, Queue, data structure transformation.
*   **Solution:** `src/problems/Problem3_QueueUsingStacks.js`

### Problem 4: LRU Cache
*   **Description:** Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get` and `put` operations. Both operations should run in O(1) average time complexity.
*   **Concepts:** Cache eviction policies, Hash Map, Doubly Linked List, combining data structures.
*   **Solution:** `src/problems/Problem4_LRUCache.js`

### Problem 5: Moving Average from Data Stream
*   **Description:** Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
*   **Concepts:** Queue, sliding window.
*   **Solution:** `src/problems/Problem5_MovingAverageFromDataStream.js`

## Setup and Usage

### Prerequisites

*   Node.js (v14 or higher recommended)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Tests

All tests use Node.js's built-in `assert` module.

To run all tests:
```bash
npm test
```

To run a specific test file, e.g., for Valid Parentheses:
```bash
node tests/test_ValidParentheses.js
```

### Running Benchmarks

Benchmarks use `console.time` and `process.hrtime` for simple performance measurement.

To run all benchmarks:
```bash
npm run benchmark
```

To run a specific benchmark, e.g., for Min Stack:
```bash
node benchmarks/benchmark_MinStack.js
```

### Exploring Code

You can explore the source code directly in `src/`.
To quickly see an example of a solution in action, you can modify `src/index.js` or run individual problem files (though they are designed primarily for export).

## Documentation

The `docs/` directory contains valuable resources:

*   **`algorithms.md`**: Provides detailed explanations for the logic behind the optimal solutions, discusses alternative approaches, and offers insights into why certain data structures are chosen.
*   **`diagrams.md`**: Contains ASCII art diagrams to visually represent the internal workings of Stacks, Queues, Doubly Linked Lists, and the logic of problems like Min Stack or Queue using Stacks.
*   **`interview-tips.md`**: Offers general advice for tackling Stack and Queue problems in interviews, highlights common pitfalls, and suggests variations of the problems presented here.

## Interview Tips

Don't forget to check out `docs/interview-tips.md` for advice on:
*   Clarifying questions.
*   Thinking out loud.
*   Testing your code.
*   Common variations of these problems.

---
**Author:** AI Assistant
---