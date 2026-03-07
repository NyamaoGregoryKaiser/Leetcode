# Linked List Interview Project

This repository provides a comprehensive resource for preparing for Linked List problems in coding interviews. It includes a variety of common Linked List challenges, optimal solutions with detailed explanations, thorough test cases, performance benchmarks, and supplementary materials to deepen understanding.

## Project Structure

*   `src/main/java/com/example/linkedlist/`: Contains the core Java code.
    *   `ListNode.java`: Defines the basic `ListNode` structure for our Linked Lists.
    *   `LinkedListProblems.java`: Implements solutions to several fundamental Linked List problems.
*   `src/test/java/com/example/linkedlist/`: Contains JUnit tests for the implemented problems.
    *   `LinkedListProblemsTest.java`: Comprehensive test cases for `LinkedListProblems.java`.
*   `docs/`: Contains documentation and explanatory materials.
    *   `README.md`: This file, providing an overview and problem descriptions.
    *   `algorithm_explanation.md`: Detailed explanations of algorithms, time/space complexity, edge cases, and interview tips.
    *   `diagrams.md`: ASCII art diagrams to visualize Linked List operations.
*   `perf/`: Contains code for benchmarking solution performance.
    *   `PerformanceBenchmarking.java`: Utility to measure the execution time of the algorithms.
*   `additional_implementations/`: Contains alternative approaches and more advanced problems.
    *   `ReversalVariations.java`: Demonstrates different ways to reverse a Linked List (iterative, recursive, k-group reversal).
    *   `AdvancedLinkedListOperations.java`: Tackles problems like finding the intersection of two lists and removing duplicates in-place.

## Setup and How to Run

This project uses Java and JUnit for testing.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/linked-list-interview-project.git
    cd linked-list-interview-project
    ```
2.  **Compile (if not using an IDE):**
    You'll need `junit-platform-console-standalone.jar` for running tests from the command line. Download it from the JUnit 5 releases page (e.g., `junit-platform-console-standalone-1.10.0.jar`). Place it in a `lib` directory at the project root or adjust the classpath.

    ```bash
    # Example compilation (adjust paths and add JUnit to classpath)
    mkdir -p out/production/
    javac -d out/production/ -cp "src/main/java" src/main/java/com/example/linkedlist/*.java
    mkdir -p out/test/
    javac -d out/test/ -cp "out/production/:path/to/junit-platform-console-standalone.jar" src/test/java/com/example/linkedlist/*.java
    ```

3.  **Run Tests (using an IDE like IntelliJ IDEA or VS Code is recommended):**
    *   Open the project in your IDE.
    *   Navigate to `src/test/java/com/example/linkedlist/LinkedListProblemsTest.java`.
    *   Run all tests from there.

    **To run tests from the command line:**
    ```bash
    java -jar path/to/junit-platform-console-standalone.jar --class-path out/production/:out/test/ --scan-classpath
    ```

4.  **Run Performance Benchmarking:**
    ```bash
    javac -d out/production/ src/perf/PerformanceBenchmarking.java
    java -cp out/production/ com.example.linkedlist.PerformanceBenchmarking
    ```
    (Note: You might need to compile `LinkedListProblems.java` and `ListNode.java` into the same `out/production` directory for `PerformanceBenchmarking` to find them.)

## Problem Descriptions (from `LinkedListProblems.java`)

Here are the problems addressed in the `LinkedListProblems.java` file:

### 1. Reverse Linked List

**Problem Statement:** Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Example:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
Output: `5 -> 4 -> 3 -> 2 -> 1 -> NULL`

### 2. Detect Cycle and Find Start Node

**Problem Statement:** Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`. There is a cycle in a linked list if some node in the list can be reached again by continuously following the `next` pointers.

**Example:**
Input: `3 -> 2 -> 0 -> -4 -> 2 (cycle back to node 2)`
Output: `Node with value 2`

### 3. Merge Two Sorted Lists

**Problem Statement:** You are given the heads of two sorted linked lists, `list1` and `list2`. Merge the two lists into a single sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Example:**
Input: `list1 = 1 -> 2 -> 4`, `list2 = 1 -> 3 -> 4`
Output: `1 -> 1 -> 2 -> 3 -> 4 -> 4`

### 4. Remove Nth Node From End of List

**Problem Statement:** Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head.

**Example:**
Input: `head = 1 -> 2 -> 3 -> 4 -> 5`, `n = 2`
Output: `1 -> 2 -> 3 -> 5` (Node `4` is removed)

### 5. Reorder List

**Problem Statement:** You are given the `head` of a singly linked list. Reorder the list such that:
`L0 → LN → L1 → LN-1 → L2 → LN-2 → ...`
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

**Example:**
Input: `head = 1 -> 2 -> 3 -> 4 -> 5`
Output: `1 -> 5 -> 2 -> 4 -> 3`

---
Feel free to explore the code, run the tests, and consult the `docs/` folder for in-depth explanations and interview preparation tips. Good luck!

---