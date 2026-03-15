```markdown
# Stack and Queue Interview Project

This project provides a comprehensive set of coding interview problems and solutions related to Stack and Queue data structures. It's designed to cover various common interview scenarios, from basic implementations to more advanced algorithmic applications.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Run](#how-to-run)
    *   [Prerequisites](#prerequisites)
    *   [Compiling and Running Tests](#compiling-and-running-tests)
    *   [Running Benchmarks](#running-benchmarks)
3.  [Problems and Solutions](#problems-and-solutions)
    *   [Problem 1: Min Stack](#problem-1-min-stack)
    *   [Problem 2: Valid Parentheses](#problem-2-valid-parentheses)
    *   [Problem 3: Trapping Rain Water](#problem-3-trapping-rain-water)
    *   [Problem 4: Implement Queue using Stacks](#problem-4-implement-queue-using-stacks)
    *   [Problem 5: Sliding Window Maximum](#problem-5-sliding-window-maximum)
4.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips and Variations](#interview-tips-and-variations)
5.  [Contributing](#contributing)

---

## 1. Project Structure

```
stack-queue-interview-project/
├── pom.xml                                 # Maven project configuration
├── .gitignore                              # Git ignore file
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── stackqueue/
│   │                   ├── CustomMinStack.java         # Problem 1: Min Stack implementation
│   │                   ├── CustomQueueViaStacks.java   # Problem 4: Queue using two stacks implementation
│   │                   ├── StackProblems.java          # Contains solutions for Valid Parentheses & Trapping Rain Water
│   │                   ├── QueueProblems.java          # Placeholder for future queue problems (Problem 4 is a custom DS)
│   │                   └── CombinedProblems.java       # Contains solution for Sliding Window Maximum
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── stackqueue/
│                       ├── StackProblemsTest.java
│                       ├── QueueProblemsTest.java
│                       └── CombinedProblemsTest.java
├── docs/
│   ├── README.md                           # This README file
│   ├── AlgorithmExplanations.md            # Detailed explanations for algorithms
│   ├── VisualDiagrams.txt                  # ASCII art diagrams for complex problems
│   └── InterviewTipsAndVariations.md       # Interview tips, variations, and edge cases
└── benchmarking/
    └── PerformanceBenchmarking.java        # Code for performance testing
```

## 2. How to Run

### Prerequisites

*   **Java Development Kit (JDK) 11 or higher:** Ensure `java` and `javac` commands are available in your PATH.
*   **Apache Maven 3.6.0 or higher:** Ensure `mvn` command is available in your PATH.

### Compiling and Running Tests

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```
2.  **Compile the project:**
    ```bash
    mvn clean compile
    ```
3.  **Run all unit tests:**
    ```bash
    mvn test
    ```
    You should see output indicating all tests passed.

### Running Benchmarks

The `PerformanceBenchmarking.java` file contains a simple benchmarking setup.

1.  **Compile the project first (if you haven't):**
    ```bash
    mvn clean compile
    ```
2.  **Run the benchmark:**
    ```bash
    mvn exec:java -Dexec.mainClass="benchmarking.PerformanceBenchmarking"
    ```
    This will execute the `main` method in `PerformanceBenchmarking.java`, which runs the specified benchmarks and prints the results to the console.

## 3. Problems and Solutions

Each problem includes:
*   A clear description.
*   Multiple approaches (where applicable), with time and space complexity analysis.
*   The chosen optimal solution implemented in Java.
*   Detailed comments explaining the logic.

### Problem 1: Min Stack

*   **File:** `src/main/java/com/example/stackqueue/CustomMinStack.java`
*   **Description:** Design a stack that supports `push`, `pop`, `top`, and `getMin` operations in constant time.
*   **Approaches:** Two Stacks (Optimal), Single Stack with Pairs, Single Stack with Difference.
*   **Optimal Solution:** Uses an auxiliary stack to keep track of minimums.

### Problem 2: Valid Parentheses

*   **File:** `src/main/java/com/example/stackqueue/StackProblems.java` (method `isValidParentheses`)
*   **Description:** Given a string `s` containing just '(', ')', '{', '}', '[', ']', determine if the input string is valid.
*   **Approaches:** Stack (Optimal).
*   **Optimal Solution:** Uses a single stack to push opening brackets and pop/match with closing brackets.

### Problem 3: Trapping Rain Water

*   **File:** `src/main/java/com/example/stackqueue/StackProblems.java` (methods `trapRainWaterMonotonicStack` and `trapRainWaterTwoPointers`)
*   **Description:** Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.
*   **Approaches:** Brute Force, Dynamic Programming, Two Pointers (Optimal for space), Monotonic Stack (Optimal for time/concept).
*   **Implemented Solutions:** Both Monotonic Stack and Two Pointers approaches are provided.

### Problem 4: Implement Queue using Stacks

*   **File:** `src/main/java/com/example/stackqueue/CustomQueueViaStacks.java`
*   **Description:** Implement a first-in-first-out (FIFO) queue using only two stacks.
*   **Approaches:** Two Stacks (Optimal).
*   **Optimal Solution:** Uses an `inputStack` for pushing and an `outputStack` for popping/peeking, transferring elements when `outputStack` is empty.

### Problem 5: Sliding Window Maximum

*   **File:** `src/main/java/com/example/stackqueue/CombinedProblems.java` (method `maxSlidingWindow`)
*   **Description:** Given an array `nums` and a sliding window of size `k`, return the maximum for each window.
*   **Approaches:** Brute Force, Max-Heap (PriorityQueue), Deque (Monotonic Queue) (Optimal).
*   **Optimal Solution:** Uses an `ArrayDeque` (double-ended queue) to maintain indices of elements in decreasing order, allowing O(1) retrieval of the current window's maximum.

## 4. Documentation

Detailed documentation files are available in the `docs/` directory:

### Algorithm Explanations

*   **File:** `docs/AlgorithmExplanations.md`
*   **Content:** Provides step-by-step logic, detailed reasoning, and specific examples for each algorithm implemented in the project.

### Visual Diagrams

*   **File:** `docs/VisualDiagrams.txt`
*   **Content:** Contains ASCII art diagrams to illustrate the working principles of more complex algorithms, such as Trapping Rain Water and Sliding Window Maximum.

### Interview Tips and Variations

*   **File:** `docs/InterviewTipsAndVariations.md`
*   **Content:** Offers advice on how to approach these problems in an interview setting, common pitfalls, and potential variations or follow-up questions for each problem.

---

## 5. Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, bug fixes, or additional problems/solutions.

---
```