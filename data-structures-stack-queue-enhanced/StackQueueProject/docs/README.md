```markdown
# Stack and Queue Interview Project

This project is a comprehensive resource for preparing for coding interviews that involve Stack and Queue data structures. It includes a collection of classic problems, optimized solutions, detailed explanations, unit tests, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Build and Run Instructions](#build-and-run-instructions)
3.  [Problem Set](#problem-set)
    *   [1. Valid Parentheses](#1-valid-parentheses)
    *   [2. Daily Temperatures](#2-daily-temperatures)
    *   [3. Implement Queue using Stacks](#3-implement-queue-using-stacks)
    *   [4. Implement Stack using Queues](#4-implement-stack-using-queues)
    *   [5. Trapping Rain Water](#5-trapping-rain-water)
4.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips and Variations](#interview-tips-and-variations)

---

## Project Structure

(See top-level README for detailed project structure)

## Build and Run Instructions

(See top-level README for detailed build and run instructions)

---

## Problem Set

Here are the problems included in this project, along with brief descriptions. For detailed logic, complexity analysis, and edge cases, refer to `docs/algorithms_explanation.md`.

### 1. Valid Parentheses
*   **LeetCode:** 20
*   **Description:** Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
    An input string is valid if:
    1.  Open brackets must be closed by the same type of brackets.
    2.  Open brackets must be closed in the correct order.
    3.  Every close bracket has a corresponding open bracket of the same type.
*   **Tags:** Stack, String

### 2. Daily Temperatures
*   **LeetCode:** 739
*   **Description:** Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i]` as `0` instead.
*   **Tags:** Stack, Array, Monotonic Stack

### 3. Implement Queue using Stacks
*   **LeetCode:** 232
*   **Description:** Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, `empty`).
*   **Tags:** Stack, Queue, Design

### 4. Implement Stack using Queues
*   **LeetCode:** 225
*   **Description:** Implement a last in first out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, `empty`).
*   **Tags:** Queue, Stack, Design

### 5. Trapping Rain Water
*   **LeetCode:** 42
*   **Description:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
*   **Tags:** Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack

---

## Documentation

This project comes with extensive documentation to aid in understanding the solutions and preparing for interviews.

### Algorithm Explanations
Refer to `docs/algorithms_explanation.md` for a deep dive into each problem's logic, multiple solution approaches, detailed time and space complexity analysis, and considerations for edge cases.

### Visual Diagrams
Visual aids (ASCII art) for complex algorithms like Trapping Rain Water are provided in `docs/diagrams.txt` to help in visualizing the stack's behavior or the problem structure.

### Interview Tips and Variations
Check `docs/interview_tips.md` for general advice on how to approach Stack and Queue problems in an interview setting, common pitfalls, and potential variations of the included problems.
```