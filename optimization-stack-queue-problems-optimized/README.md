# Stack and Queue Interview Project

This project provides a comprehensive set of coding interview problems focusing on **Stack** and **Queue** data structures. It includes multiple problems, optimal solutions, alternative approaches, detailed explanations, test cases, benchmarking, and interview preparation materials.

The project is structured to offer a realistic experience of a coding interview project, from initial problem understanding to implementation, testing, and performance analysis.

## Project Structure

```
stack_queue_interview_project/
├── src/
│   ├── problems.h             // Declarations for all problem functions and classes
│   ├── problems.cpp           // Main implementations of optimal algorithms (Stack/Queue based)
│   ├── utilities.h            // Helper utilities (e.g., custom data structures, timers)
│   ├── utilities.cpp          // Implementations for utilities
│   └── main.cpp               // Entry point for running examples and demos
├── tests/
│   ├── test_runner.cpp        // Main test file with extensive test cases
│   └── test_cases.h           // Definitions of test data for various problems
├── benchmarks/
│   └── benchmark.cpp          // Performance benchmarking code comparing optimized vs. brute-force
├── docs/
│   ├── algorithms.md          // Detailed explanations of algorithms with ASCII diagrams
│   └── interview_tips.md      // Interview tips, common variations, edge cases, and gotchas
├── brute_force_examples/
│   └── brute_force.cpp        // Implementations of less-optimized/brute-force solutions for comparison
├── README.md                  // Project overview, problem descriptions, build instructions
└── Makefile                   // Build automation script
```

## Problems Covered

This project covers the following classic Stack and Queue problems:

### 1. Valid Parentheses

**Problem Description:**
Given a string `s` containing just the characters '(', ')', '{', '}', '[', ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example:**
*   `"()"` -> `true`
*   `"()[]{}"` -> `true`
*   `"(]"` -> `false`
*   `"{[]}"` -> `true`
*   `"([{}])"` -> `true`
*   `"{[()]}"` -> `true`
*   `"((("` -> `false`
*   `"]"` -> `false`

### 2. Implement Queue using Stacks

**Problem Description:**
Implement a first-in, first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `pop`, `peek`, and `empty`).

You must use only standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid. Depending on your language, a stack may not be supported natively. You may simulate a stack using a list or deque (as `std::stack` does).

**Example:**
```
MyQueue q;
q.push(1);
q.push(2);
q.peek();   // returns 1
q.pop();    // returns 1
q.empty();  // returns false
```

### 3. Daily Temperatures

**Problem Description:**
Given an array of integers `temperatures` representing the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

**Example:**
*   `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`
    `answer = [1, 1, 4, 2, 1, 1, 0, 0]`
    *   Day 0 (73): Next warmer is 74 (1 day later) -> `1`
    *   Day 1 (74): Next warmer is 75 (1 day later) -> `1`
    *   Day 2 (75): Next warmer is 76 (4 days later) -> `4` (71, 69, 72, 76)
    *   ...
*   `temperatures = [30, 40, 50, 60]`
    `answer = [1, 1, 1, 0]`
*   `temperatures = [30, 60, 90]`
    `answer = [1, 1, 0]`

### 4. Sliding Window Maximum

**Problem Description:**
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

**Example:**
*   `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`
    `Output: [3, 3, 5, 5, 6, 7]`

    **Explanation:**
    Window position        Max
    ----------------------- -----
    `[1, 3, -1]`, -3, 5, 3, 6, 7   `3`
    1, `[3, -1, -3]`, 5, 3, 6, 7   `3`
    1, 3, `[-1, -3, 5]`, 3, 6, 7   `5`
    1, 3, -1, `[-3, 5, 3]`, 6, 7   `5`
    1, 3, -1, -3, `[5, 3, 6]`, 7   `6`
    1, 3, -1, -3, 5, `[3, 6, 7]`   `7`

## Build and Run

To build and run this project, navigate to the root directory `stack_queue_interview_project/` and use the provided `Makefile`.

*   **Build all executables (main, tests, benchmarks):**
    ```bash
    make all
    ```
    This will create executables in the `bin/` directory.

*   **Run the main examples:**
    ```bash
    ./bin/main
    ```

*   **Run the tests:**
    ```bash
    ./bin/test_runner
    ```

*   **Run the benchmarks:**
    ```bash
    ./bin/benchmark
    ```

*   **Clean build artifacts:**
    ```bash
    make clean
    ```

## Development and Contribution

Feel free to explore the code, experiment with different solutions, and contribute improvements. Each problem in `src/problems.cpp` is accompanied by detailed comments, complexity analysis, and sometimes multiple approaches. The `docs/` folder contains extensive explanations and interview tips to aid in understanding and preparation.