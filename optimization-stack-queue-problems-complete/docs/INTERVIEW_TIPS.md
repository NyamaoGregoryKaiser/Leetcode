```markdown
# Stack and Queue Interview Tips and Variations

This document provides general advice for tackling Stack and Queue problems in coding interviews, along with common pitfalls, strategies, and potential variations for the problems covered in this project.

## General Interview Tips for Stack & Queue Problems

1.  **Understand the Core Properties:**
    *   **Stack (LIFO - Last In, First Out):** Think about scenarios where the most recent item is the first one you need to access (e.g., undo/redo, function call stack, parsing expressions, backtracking).
    *   **Queue (FIFO - First In, First Out):** Think about scenarios where items are processed in the order they arrive (e.g., task scheduling, breadth-first search, buffering).
    *   **Deque (Double-Ended Queue):** Offers both LIFO and FIFO capabilities, allowing additions/removals from both ends. Excellent for sliding window problems, or when you need a "monotonic" data structure.

2.  **When to Consider a Stack:**
    *   **Matching Parentheses/Brackets:** Classic use case.
    *   **"Next Greater/Smaller Element" Problems:** Use a monotonic stack (e.g., Daily Temperatures).
    *   **Parsing and Expression Evaluation:** Infix to Postfix, evaluating RPN expressions.
    *   **Backtracking/DFS Simulation:** Can simulate recursion explicitly.
    *   **Browser History, Undo/Redo functionality.**

3.  **When to Consider a Queue:**
    *   **Breadth-First Search (BFS):** Level-order traversal of trees/graphs.
    *   **Task Scheduling/Job Processing:** Any scenario requiring order of arrival processing.
    *   **Producer-Consumer problems.**
    *   **Printer queues, waiting lines.**

4.  **When to Consider a Deque:**
    *   **Sliding Window Maximum/Minimum:** Maintain a monotonic deque of indices.
    *   **Problems requiring efficient insertions/deletions from both ends.**
    *   **Implementing both Stack and Queue functionalities with one data structure.**

5.  **Think about "Next Greater/Smaller Element" Pattern:**
    *   If a problem asks for finding the "next X" or "previous Y" for each element in an array, and X/Y is related to comparison (greater/smaller), a monotonic stack is often the key.
    *   *How it works*: Iterate through the array. If the current element is "greater" than elements at the top of the stack, pop them and process them (current element is their "next greater"). Push current element onto stack. This keeps the stack "monotonic".

6.  **Amortized Analysis:**
    *   For problems like "Implement Queue using Stacks" or "Implement Stack using Queues", understanding amortized time complexity is crucial. An O(N) operation might occur, but it's "paid for" by many O(1) operations, averaging out to O(1) per operation over a sequence.

7.  **Communication is Key:**
    *   **Clarify:** Ask clarifying questions about constraints (input size, value range, character set), edge cases (empty input, nulls), and expected output format.
    *   **High-Level Plan:** Start with a high-level approach (e.g., "I'll use a stack for this...") before diving into code.
    *   **Walkthrough:** Explain your logic step-by-step with an example before writing code.
    *   **Complexity:** State and justify your time and space complexity.
    *   **Trade-offs:** Discuss alternative approaches and their trade-offs (e.g., brute force vs. optimized, space vs. time).

8.  **Test Thoroughly:**
    *   After coding, trace your solution with various test cases:
        *   **Base cases:** Empty input, single element.
        *   **Typical cases.**
        *   **Edge cases:** All identical elements, sorted (increasing/decreasing), alternating patterns, large inputs (if possible by hand).
        *   **Invalid inputs** (if problem requires handling them).

## Specific Problem Variations and Interview Tips

### 1. Implement Queue using Stacks

*   **Tip**: Emphasize the amortized O(1) complexity and how elements are effectively "flipped" when transferring.
*   **Variations**:
    *   Implement `Queue` using `LinkedList` and `Stack`. (More trivial but good for understanding interfaces).
    *   What if `pop` or `peek` is called on an empty queue? (Standard library throws exception; should you return `null` or a specific error?)
    *   Can you do it with *one* stack (not really, but a common trick question for understanding fundamental limitations).

### 2. Implement Stack using Queues

*   **Tip**: Explain the trade-off. The single-queue approach makes `push` O(N) and `pop`/`top` O(1). A two-queue approach can make `push` O(1) and `pop`/`top` O(N). Be prepared to discuss why one might be preferred (e.g., if `push` is rare, or if `pop`/`top` are latency-critical).
*   **Variations**:
    *   Implement using *two* queues. (A common way is `push` is O(1) by adding to `q1`, and `pop`/`top` is O(N) by moving all but the last from `q1` to `q2`, then swapping `q1` and `q2`).
    *   What if `pop` or `top` is called on an empty stack?

### 3. Valid Parentheses

*   **Tip**: This is a fundamental stack problem. Make sure your logic for matching opening/closing brackets is solid and handles mismatches correctly.
*   **Variations**:
    *   Validate HTML/XML tags.
    *   Validate arithmetic expressions (e.g., `(a + (b * c)) - d`).
    *   Allow other characters in the string (e.g., `s = "a(b[c]{d})"`). Your solution should ignore non-bracket characters.
    *   Return the length of the longest valid parentheses substring (Hard problem, but often discussed as a variation).
    *   Count total number of valid pairs.

### 4. Daily Temperatures

*   **Tip**: Clearly explain the monotonic stack concept. Draw an example trace to solidify understanding.
*   **Variations**:
    *   "Next Greater Element" (return the actual value instead of days).
    *   "Next Smaller Element".
    *   "Previous Greater/Smaller Element" (iterate from right to left or left to right, adjusting logic).
    *   Find largest rectangle in histogram (another classic monotonic stack problem).
    *   Maximal rectangle in a binary matrix.
    *   Calculate "stock span" problem (number of consecutive days before current where price was less than or equal).

### 5. Sliding Window Maximum

*   **Tip**: This is a key `Deque` problem. Explain how the deque maintains both monotonicity and window constraints.
*   **Variations**:
    *   Sliding Window Minimum (just change the comparison logic).
    *   Sliding Window Average/Sum (simpler, usually just requires maintaining a running sum and adjusting).
    *   Find the longest subarray with at most K distinct characters (uses a hash map with a sliding window, not a deque).
    *   Implement a `MinMaxStack` or `MinMaxQueue` (data structure that supports `push`, `pop`, `min`, `max` in O(1)). This can be solved by having an auxiliary stack/deque to track min/max values.

---
```