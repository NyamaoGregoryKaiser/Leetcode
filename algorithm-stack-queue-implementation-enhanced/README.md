# Stack and Queue Interview Project

This project provides a comprehensive resource for mastering Stack and Queue-related coding interview problems. It includes multiple problems, optimal solutions, alternative approaches, detailed explanations, robust testing, performance benchmarks, and in-depth documentation.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Installation](#installation)
4.  [Problems Covered](#problems-covered)
    *   [Problem 1: Valid Parentheses](#problem-1-valid-parentheses)
    *   [Problem 2: Min Stack](#problem-2-min-stack)
    *   [Problem 3: Implement Queue using Stacks](#problem-3-implement-queue-using-stacks)
    *   [Problem 4: Sliding Window Maximum](#problem-4-sliding-window-maximum)
    *   [Problem 5: Next Greater Element](#problem-5-next-greater-element)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
    *   [Detailed Algorithms (`docs/algorithms.md`)](#detailed-algorithms-docsalgorithmsmd)
    *   [Visual Diagrams (`docs/diagrams.md`)](#visual-diagrams-docsdiagramsmd)
    *   [Interview Preparation (`docs/interview_prep.md`)](#interview-preparation-docsinterview_prepmd)
8.  [Contributing](#contributing)
9.  [License](#license)

## Introduction

Stacks and Queues are fundamental data structures that appear frequently in technical interviews. This project aims to provide a hands-on learning experience by implementing various problems, exploring different solution strategies, and understanding their performance characteristics. Each problem comes with:
*   Optimal Python implementations.
*   Alternative approaches (where applicable).
*   Detailed comments and complexity analysis.
*   Extensive unit tests.
*   Performance benchmarking.
*   In-depth documentation with ASCII diagrams and interview tips.

## Project Structure

```
stack_queue_interview_project/
├── main_algorithms/                  # Core Python implementations for each problem
│   ├── problem1_valid_parentheses.py
│   ├── problem2_min_stack.py
│   ├── problem3_queue_using_stacks.py
│   ├── problem4_sliding_window_maximum.py
│   └── problem5_next_greater_element.py
├── tests/                            # Unit tests for all algorithms
│   ├── test_problem1_valid_parentheses.py
│   ├── ...
├── utils/                            # Custom data structures and helper utilities
│   └── custom_data_structures.py
├── benchmarks/                       # Performance benchmarking scripts
│   └── benchmark_all_problems.py
├── docs/                             # Comprehensive documentation
│   ├── algorithms.md                 # Detailed algorithm explanations
│   ├── diagrams.md                   # ASCII art diagrams for visualization
│   └── interview_prep.md             # Interview tips, edge cases, variations
├── .gitignore                        # Git ignore file
├── README.md                         # Project overview and guide (this file)
└── requirements.txt                  # Python dependencies
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stack_queue_interview_project.git
    cd stack_queue_interview_project
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Problems Covered

### Problem 1: Valid Parentheses
Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid.
An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

### Problem 2: Min Stack
Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.
Implement the `MinStack` class:
*   `MinStack()` initializes the stack object.
*   `void push(int val)` pushes the element `val` onto the stack.
*   `void pop()` removes the element on the top of the stack.
*   `int top()` gets the top element of the stack.
*   `int getMin()` retrieves the minimum element in the stack.

### Problem 3: Implement Queue using Stacks
Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
Implement the `MyQueue` class:
*   `MyQueue()` initializes the queue object.
*   `void push(int x)` Pushes element `x` to the back of the queue.
*   `int pop()` Removes the element from the front of the queue and returns it.
*   `int peek()` Returns the element at the front of the queue.
*   `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

### Problem 4: Sliding Window Maximum
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.

### Problem 5: Next Greater Element
Given a circular integer array `nums` (i.e., the next element of `nums[nums.length - 1]` is `nums[0]`), return the *next greater element* for every element in `nums`.
The next greater element of a number `x` is the first greater number to its traversing next in the array, which means you could search in a circular way to find its next greater number. If it does not exist, return -1 for this number.

## Running Tests

To run all unit tests for the project:

```bash
python -m unittest discover tests
```

To run tests for a specific problem, e.g., Valid Parentheses:

```bash
python -m unittest tests.test_problem1_valid_parentheses
```

## Running Benchmarks

To run the performance benchmarks for all problems:

```bash
python benchmarks/benchmark_all_problems.py
```

The benchmark script will output execution times for different input sizes and, where applicable, compare different approaches (e.g., brute force vs. optimal).

## Documentation

The `docs/` directory contains detailed explanations for each aspect of the project:

### Detailed Algorithms (`docs/algorithms.md`)
This file provides in-depth explanations of the optimal solutions for each problem, including the logic, step-by-step walkthroughs, and why they are efficient.

### Visual Diagrams (`docs/diagrams.md`)
Contains ASCII art diagrams to help visualize the state of stacks, queues, and deques during the execution of algorithms, particularly for complex problems like Min Stack and Sliding Window Maximum.

### Interview Preparation (`docs/interview_prep.md`)
Offers valuable advice for tackling Stack and Queue questions in interviews. It covers common pitfalls, important edge cases to consider, typical variations of the problems, and tips for clear communication and complexity analysis.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Suggestions for new problems, alternative solutions, or documentation enhancements are welcome.

## License

This project is open-sourced under the MIT License. See the LICENSE file (if included) for more details.
---