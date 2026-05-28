```markdown
# Stack and Queue Interview Project

This project is a comprehensive resource for mastering Stack and Queue data structures in the context of coding interviews. It provides multiple common interview problems, optimal solutions, alternative approaches, detailed explanations, extensive test cases, performance benchmarks, and interview preparation tips.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Getting Started](#getting-started)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
3.  [Problems Covered](#problems-covered)
    *   [1. Implement Queue using Stacks (LeetCode 232)](#1-implement-queue-using-stacks-leetcode-232)
    *   [2. Implement Stack using Queues (LeetCode 225)](#2-implement-stack-using-queues-leetcode-225)
    *   [3. Valid Parentheses (LeetCode 20)](#3-valid-parentheses-leetcode-20)
    *   [4. Sliding Window Maximum (LeetCode 239)](#4-sliding-window-maximum-leetcode-239)
    *   [5. Trapping Rain Water (LeetCode 42)](#5-trapping-rain-water-leetcode-42)
4.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Interview Tips](#interview-tips)
5.  [Custom Data Structures](#custom-data-structures)

---

## Project Structure

The project is organized into `src` for source code, `test` for unit tests, and `docs` for detailed documentation.

```
stack-queue-interview-project/
├── src/
│   ├── algorithms/                 # Core algorithm implementations
│   │   ├── stack-queue-problems.js
│   ├── data-structures/            # Custom implementations of Stack, Queue, Deque
│   │   ├── stack.js
│   │   ├── queue.js
│   │   ├── deque.js
│   ├── utils/                      # Utility functions, e.g., performance benchmarking
│   │   ├── performance.js
├── test/
│   ├── algorithms/                 # Tests for the algorithm problems
│   │   ├── stack-queue-problems.test.js
│   ├── data-structures/            # Tests for custom data structure implementations
│   │   ├── stack.test.js
│   │   ├── queue.test.js
│   │   ├── deque.test.js
├── docs/                           # Detailed explanations and interview preparation materials
│   ├── algorithms-explanation.md
│   ├── interview-tips.md
├── README.md                       # This file
├── package.json                    # Project configuration and dependencies
├── .gitignore
```

---

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `jest` for testing.

### Running Tests

To run all unit tests:

```bash
npm test
```

To run tests in watch mode (reruns tests on file changes):

```bash
npm test:watch
```

### Running Benchmarks

To run the performance benchmarks for selected algorithms:

```bash
npm benchmark
```

---

## Problems Covered

This section provides a brief description of each problem. For detailed explanations, solutions, complexity analysis, and ASCII diagrams, refer to `docs/algorithms-explanation.md`.

### 1. Implement Queue using Stacks (LeetCode 232)

Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

### 2. Implement Stack using Queues (LeetCode 225)

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

### 3. Valid Parentheses (LeetCode 20)

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

### 4. Sliding Window Maximum (LeetCode 239)

You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.

### 5. Trapping Rain Water (LeetCode 42)

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

---

## Documentation

### Algorithm Explanations

The `docs/algorithms-explanation.md` file contains in-depth discussions for each problem:
*   Problem statement re-iteration
*   Conceptual approach and intuition
*   Detailed step-by-step logic
*   Time and space complexity analysis (including derivation)
*   Discussion of alternative (e.g., brute force) approaches and their tradeoffs
*   Visual diagrams (ASCII art) to illustrate key steps or data structure states.

### Interview Tips

The `docs/interview-tips.md` file provides valuable guidance for coding interviews:
*   General interview strategies (clarification, examples, thinking process, optimization, testing).
*   Problem-specific tips for each covered algorithm, including common pitfalls, edge cases to consider, and potential follow-up questions.
*   Variations of the problems that an interviewer might ask.

---

## Custom Data Structures

The `src/data-structures/` directory contains custom implementations of Stack, Queue, and Deque. These are used by the algorithms and are also excellent practice for understanding how these data structures work internally.

*   `Stack`: Implemented using a JavaScript array.
*   `Queue`: Implemented using a JavaScript array (with discussion of `shift` performance and linked-list alternative).
*   `Deque` (Double-Ended Queue): Implemented using a doubly linked list for optimal O(1) additions/removals from both ends, which is crucial for problems like Sliding Window Maximum.
```