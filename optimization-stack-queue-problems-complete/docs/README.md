```markdown
# Stack and Queue Coding Interview Project

This project provides a comprehensive set of problems focused on the Stack and Queue data structures, commonly encountered in coding interviews. It aims to offer robust solutions, detailed explanations, and utilities for practice and preparation.

## Project Goals

*   **Problem Variety**: Cover classic and advanced problems involving Stacks and Queues.
*   **Optimal Solutions**: Provide efficient solutions with detailed time and space complexity analysis.
*   **Multiple Approaches**: Illustrate different ways to solve a problem, including brute-force vs. optimized.
*   **Comprehensive Documentation**: Explain algorithms clearly, including step-by-step logic and visual diagrams.
*   **Thorough Testing**: Include extensive unit tests covering various scenarios and edge cases.
*   **Performance Benchmarking**: Offer a utility to measure the execution time of solutions.
*   **Interview Preparation**: Provide tips, common pitfalls, and variations for each problem.

## Project Structure

```
stack-queue-interview-project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── stackqueue/
│   │   │           ├── problems/                   // Contains core algorithm implementations
│   │   │           │   ├── MyQueue.java              // Problem 1: Implement Queue using Stacks
│   │   │           │   ├── MyStack.java              // Problem 2: Implement Stack using Queues
│   │   │           │   └── StackAndQueueProblems.java  // Problems 3, 4, 5: Valid Parentheses, Daily Temperatures, Sliding Window Max
│   │   │           └── util/                       // Helper utilities
│   │   │               └── PerformanceBenchmarker.java // Utility for benchmarking solution performance
│   ├── test/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── stackqueue/
│   │   │           ├── MyQueueTest.java            // Unit tests for MyQueue
│   │   │           ├── MyStackTest.java            // Unit tests for MyStack
│   │   │           └── StackAndQueueProblemsTest.java // Unit tests for problems in StackAndQueueProblems
├── docs/                                           // Documentation files
│   ├── README.md                                   // This file: Project overview, problem descriptions, setup
│   ├── ALGORITHM_EXPLANATIONS.md                   // Detailed algorithm logic, diagrams, complexity
│   └── INTERVIEW_TIPS.md                           // General interview advice, problem variations
├── build.gradle                                    // Gradle build file
├── .gitignore                                      // Git ignore file
```

## Problems Covered

Here's a brief overview of the problems addressed in this project:

1.  **Implement Queue using Stacks (`MyQueue.java`)**
    *   **Description**: Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, `empty`).
    *   **Focus**: Understanding the relationship and transformation between LIFO and FIFO.
    *   **Solution Approach**: Use an `inStack` for `push` operations and an `outStack` for `pop`/`peek` operations, moving elements between them as needed.

2.  **Implement Stack using Queues (`MyStack.java`)**
    *   **Description**: Implement a last-in-first-out (LIFO) stack using only one or two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, `empty`).
    *   **Focus**: Demonstrating how to simulate LIFO behavior with FIFO structures.
    *   **Solution Approach**: Use a single queue where `push` operations involve adding the new element and then re-adding all previous elements to the end of the queue, effectively moving the new element to the front.

3.  **Valid Parentheses (`StackAndQueueProblems.java::isValid`)**
    *   **Description**: Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
        1.  Open brackets must be closed by the same type of brackets.
        2.  Open brackets must be closed in the correct order.
        3.  Every close bracket has a corresponding open bracket of the same type.
    *   **Focus**: Classic stack application for matching pairs.
    *   **Solution Approach**: Use a stack to keep track of open brackets. When a closing bracket is encountered, check if it matches the top of the stack.

4.  **Daily Temperatures (`StackAndQueueProblems.java::dailyTemperatures`)**
    *   **Description**: Given an array of integers `temperatures` representing the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.
    *   **Focus**: Monotonic stack pattern.
    *   **Solution Approaches**:
        *   **Brute Force**: Nested loops.
        *   **Optimized (Monotonic Stack)**: Iterate through temperatures and maintain a stack of indices of temperatures in decreasing order.

5.  **Sliding Window Maximum (`StackAndQueueProblems.java::maxSlidingWindow`)**
    *   **Description**: You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Return the maximum sliding window.
    *   **Focus**: Deque (double-ended queue) for efficiently finding maximums in a sliding window.
    *   **Solution Approaches**:
        *   **Brute Force**: Iterate through all windows and find max for each.
        *   **Optimized (Deque)**: Use a deque to store indices of elements in the current window, maintaining them in decreasing order of their values.

## How to Build and Run

This project uses Gradle.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```

2.  **Build the project:**
    ```bash
    ./gradlew build
    ```
    (On Windows, use `.\gradlew.bat build`)

3.  **Run Tests:**
    ```bash
    ./gradlew test
    ```

4.  **Run Performance Benchmarks:**
    ```bash
    ./gradlew benchmark
    ```
    This will execute the `PerformanceBenchmarker` utility, which contains examples of how to benchmark different solutions.

## Further Documentation

*   **Detailed Algorithm Explanations**: For in-depth understanding of each problem's logic, complexities, and visual aids, refer to `docs/ALGORITHM_EXPLANATIONS.md`.
*   **Interview Tips and Variations**: For general interview advice, common pitfalls, and variations of these problems, refer to `docs/INTERVIEW_TIPS.md`.

---
```