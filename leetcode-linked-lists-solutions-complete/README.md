# Linked List Interview Project

This project is a comprehensive resource for mastering Linked List problems commonly encountered in coding interviews. It provides multiple problem statements, optimal and alternative solutions in TypeScript, detailed explanations, extensive test cases, performance benchmarks, and interview tips.

## Table of Contents

1.  [Problem Descriptions](#problem-descriptions)
    *   [Problem 1: Reverse Linked List](#problem-1-reverse-linked-list)
    *   [Problem 2: Merge Two Sorted Lists](#problem-2-merge-two-sorted-lists)
    *   [Problem 3: Detect Cycle in Linked List](#problem-3-detect-cycle-in-linked-list)
    *   [Problem 4: Remove Nth Node From End of List](#problem-4-remove-nth-node-from-end-of-list)
2.  [Project Structure](#project-structure)
3.  [Installation and Setup](#installation-and-setup)
4.  [Running the Project](#running-the-project)
    *   [Running Examples](#running-examples)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
5.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Diagrams](#diagrams)
    *   [Interview Tips](#interview-tips)

## Problem Descriptions

### Problem 1: Reverse Linked List

**Description:** Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Examples:**

*   Input: `head = [1,2,3,4,5]`
    Output: `[5,4,3,2,1]`
*   Input: `head = [1,2]`
    Output: `[2,1]`
*   Input: `head = []`
    Output: `[]`

### Problem 2: Merge Two Sorted Lists

**Description:** You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into a single **sorted** list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Examples:**

*   Input: `list1 = [1,2,4]`, `list2 = [1,3,4]`
    Output: `[1,1,2,3,4,4]`
*   Input: `list1 = []`, `list2 = []`
    Output: `[]`
*   Input: `list1 = []`, `list2 = [0]`
    Output: `[0]`

### Problem 3: Detect Cycle in Linked List

**Description:** Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointers. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter.**

**Constraints:**
*   The number of nodes in the list is in the range `[0, 10^5]`.
*   `-10^5 <= Node.val <= 10^5`
*   `pos` is `-1` or a **valid index** in the linked list.

**Examples:**

*   Input: `head = [3,2,0,-4]`, `pos = 1` (tail connects to node index 1)
    Output: `node with value 2`
*   Input: `head = [1,2]`, `pos = 0` (tail connects to node index 0)
    Output: `node with value 1`
*   Input: `head = [1]`, `pos = -1` (no cycle)
    Output: `null`

### Problem 4: Remove Nth Node From End of List

**Description:** Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head.

**Constraints:**
*   The number of nodes in the list is `sz`.
*   `1 <= sz <= 30`
*   `1 <= n <= sz`

**Examples:**

*   Input: `head = [1,2,3,4,5]`, `n = 2`
    Output: `[1,2,3,5]`
*   Input: `head = [1]`, `n = 1`
    Output: `[]`
*   Input: `head = [1,2]`, `n = 1`
    Output: `[1]`

---

## Project Structure

```
.
├── src/
│   ├── data-structures/
│   │   └── ListNode.ts                 // Defines the basic structure of a linked list node.
│   ├── problems/
│   │   ├── detectCycle.ts              // Implementations for cycle detection.
│   │   ├── mergeTwoSortedLists.ts      // Implementations for merging sorted lists.
│   │   ├── removeNthFromEnd.ts         // Implementations for removing the Nth node from end.
│   │   └── reverseLinkedList.ts        // Implementations for reversing a linked list.
│   ├── utils/
│   │   └── listUtils.ts                // Utility functions for creating, printing, and converting linked lists.
│   └── main.ts                         // Entry point to demonstrate problem solutions.
├── tests/
│   ├── detectCycle.test.ts             // Jest tests for cycle detection.
│   ├── mergeTwoSortedLists.test.ts     // Jest tests for merging sorted lists.
│   ├── removeNthFromEnd.test.ts        // Jest tests for removing Nth node.
│   └── reverseLinkedList.test.ts       // Jest tests for reversing a linked list.
├── benchmarks/
│   └── benchmark.ts                    // Script to compare performance of different algorithms.
├── docs/
│   ├── ALGORITHM_EXPLANATIONS.md       // Detailed explanations of algorithms, including reasoning for optimal choices.
│   ├── DIAGRAMS.md                     // ASCII art diagrams to visualize key algorithms.
│   └── INTERVIEW_TIPS.md               // General tips and strategies for linked list interviews.
├── .gitignore                          // Specifies intentionally untracked files to ignore.
├── package.json                        // Project metadata and dependencies.
├── tsconfig.json                       // TypeScript compiler configuration.
└── README.md                           // This file.
```

---

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/linked-list-interview-project.git # Replace with actual repo URL
    cd linked-list-interview-project
    ```

2.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```
    This will install `typescript`, `jest`, `ts-node`, and their respective type definitions.

3.  **Build the project:**
    Compile the TypeScript code to JavaScript.
    ```bash
    npm run build
    ```
    This command will output compiled JavaScript files into the `dist/` directory.

---

## Running the Project

### Running Examples

To see the algorithms in action, run the `main.ts` script:
```bash
npm start
```
This script demonstrates how to use each implemented algorithm with sample inputs and prints their outputs.

### Running Tests

To verify the correctness of the solutions, run the Jest test suite:
```bash
npm test
```
This command will execute all `*.test.ts` files under the `tests/` directory.

### Running Benchmarks

To compare the performance (time complexity) of different approaches for certain problems:
```bash
npm run benchmark
```
This script will run various solutions against large datasets and print their execution times.

---

## Documentation

The `docs/` directory contains detailed explanations and resources:

### Algorithm Explanations

[`docs/ALGORITHM_EXPLANATIONS.md`](./docs/ALGORITHM_EXPLANATIONS.md)
This document provides in-depth explanations for each problem, detailing the logic behind optimal solutions, discussing alternative approaches, and analyzing their time and space complexities.

### Diagrams

[`docs/DIAGRAMS.md`](./docs/DIAGRAMS.md)
Visual aids in ASCII art format to help understand complex concepts like two-pointer techniques, cycle detection (Floyd's Tortoise and Hare algorithm), and list manipulation.

### Interview Tips

[`docs/INTERVIEW_TIPS.md`](./docs/INTERVIEW_TIPS.md)
This file offers general advice for approaching linked list problems in interviews, covering common pitfalls, strategies for problem-solving, and questions to ask your interviewer.
---