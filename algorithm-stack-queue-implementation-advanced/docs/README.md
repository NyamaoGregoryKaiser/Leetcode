```markdown
# Stack and Queue Interview Project

This project provides a comprehensive set of problems, solutions, tests, and documentation focused on **Stack and Queue** data structures, commonly encountered in coding interviews. It aims to be a complete resource for practicing and understanding these fundamental data structures.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Run](#how-to-run)
3.  [Problem Descriptions](#problem-descriptions)
    *   [1. Min Stack](#1-min-stack)
    *   [2. Implement Queue using Stacks](#2-implement-queue-using-stacks)
    *   [3. Number of Recent Calls](#3-number-of-recent-calls)
    *   [4. Valid Parentheses](#4-valid-parentheses)
    *   [5. Walls and Gates](#5-walls-and-gates)
    *   [6. Daily Temperatures (Bonus Problem)](#6-daily-temperatures-bonus-problem)
    *   [7. Number of Islands (Bonus Problem)](#7-number-of-islands-bonus-problem)
4.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Interview Tips & Variations](#interview-tips--variations)
    *   [Visual Diagrams](#visual-diagrams)
5.  [Performance Benchmarking](#performance-benchmarking)

## Project Structure

```
stack-queue-interview-project/
├── pom.xml                                   # Maven project configuration
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/techinterview/stackqueue/
│   │           ├── problems/                 # Main algorithm implementations
│   │           │   ├── MinStack.java
│   │           │   ├── QueueUsingStacks.java
│   │           │   ├── RecentCounter.java
│   │           │   ├── StackQueueProblems.java # Contains Valid Parentheses, Daily Temperatures, Num Islands
│   │           │   └── WallsAndGates.java
│   │           ├── util/                     # Helper utilities
│   │           │   └── PerformanceBenchmark.java
│   │           └── MainApp.java              # Entry point for demonstrations and benchmarks
│   └── test/
│       └── java/
│           └── com/techinterview/stackqueue/
│               ├── MinStackTest.java
│               ├── QueueUsingStacksTest.java
│               ├── RecentCounterTest.java
│               ├── StackQueueProblemsTest.java
│               └── WallsAndGatesTest.java    # Unit tests for each problem
└── docs/
    ├── README.md                             # This file
    ├── AlgorithmExplanation.md               # Detailed explanations of algorithms
    ├── InterviewTips.md                      # Interview advice and common variations
    └── diagrams/                             # ASCII art diagrams
        ├── min_stack.txt
        ├── queue_using_stacks.txt
        └── walls_and_gates.txt
```

## How to Run

This project uses Maven.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd stack-queue-interview-project
    ```

2.  **Compile the project:**
    ```bash
    mvn clean compile
    ```

3.  **Run the demonstrations and benchmarks:**
    ```bash
    mvn exec:java -Dexec.mainClass="com.techinterview.stackqueue.MainApp"
    ```
    This will execute the `MainApp.java` which demonstrates each problem with example inputs and runs basic performance benchmarks.

4.  **Run the unit tests:**
    ```bash
    mvn test
    ```
    This will execute all JUnit 5 tests, verifying the correctness of the solutions.

## Problem Descriptions

### 1. Min Stack

**Problem:** Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time complexity.

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/MinStack.java`. Uses an auxiliary stack to keep track of minimums.

### 2. Implement Queue using Stacks

**Problem:** Implement a FIFO queue using only two stacks. The queue should support `push`, `pop`, `peek`, and `empty` operations.

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/QueueUsingStacks.java`. Utilizes two stacks for efficient amortized O(1) operations.

### 3. Number of Recent Calls

**Problem:** Design a `RecentCounter` class that counts the number of requests made within the last 3000 milliseconds. `ping(t)` adds a new request at time `t` and returns the count of requests in `[t - 3000, t]`. `t` values are strictly increasing.

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/RecentCounter.java`. Uses a `java.util.Queue` (specifically `LinkedList`) to maintain a sliding window of requests.

### 4. Valid Parentheses

**Problem:** Given a string `s` containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid (brackets match and are correctly ordered).

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/StackQueueProblems.java`. Uses a `java.util.Deque` as a stack to match opening and closing brackets.

### 5. Walls and Gates

**Problem:** You are given an `m x n` grid. Each cell can be a wall (`-1`), a gate (`0`), or an empty room (`INF`). Fill each empty room with the distance to its nearest gate.

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/WallsAndGates.java`. This is a classic multi-source Breadth-First Search (BFS) problem, leveraging a `java.util.Queue` to explore the grid.

### 6. Daily Temperatures (Bonus Problem)

**Problem:** Given an array of daily temperatures, return an array where `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If no future day is warmer, `answer[i]` is `0`.

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/StackQueueProblems.java`. This problem uses a **monotonic stack** to efficiently find the next greater element to the right.

### 7. Number of Islands (Bonus Problem)

**Problem:** Given an `m x n` 2D binary grid representing a map of '1's (land) and '0's (water), count the number of islands. An island is formed by horizontally or vertically connecting adjacent lands.

**Solution:** Implemented in `src/main/java/com/techinterview/stackqueue/problems/StackQueueProblems.java`. This is another classic **BFS** problem, using a `java.util.Queue` to explore and mark visited land cells for each island.

## Documentation

### Algorithm Explanation

A detailed explanation of the chosen algorithms, including logic, reasoning, time/space complexity analysis, and discussions of alternative approaches, can be found in `docs/AlgorithmExplanation.md`.

### Interview Tips & Variations

Insights into common interview questions, potential follow-ups, and useful tips for handling stack/queue problems are in `docs/InterviewTips.md`.

### Visual Diagrams

ASCII art diagrams illustrating the key concepts for complex algorithms are available in `docs/diagrams/`:
*   `min_stack.txt`
*   `queue_using_stacks.txt`
*   `walls_and_gates.txt`

## Performance Benchmarking

The `MainApp.java` includes a section that runs basic performance benchmarks using the `PerformanceBenchmark` utility. This provides an empirical measure of the solutions' efficiency on larger inputs. The `PerformanceBenchmark.java` utility itself is designed for simple time measurements.

---
```