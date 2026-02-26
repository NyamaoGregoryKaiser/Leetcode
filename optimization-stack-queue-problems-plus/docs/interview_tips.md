```markdown
# Interview Tips for Stack and Queue Problems

This document provides valuable tips for tackling Stack and Queue problems in coding interviews. It covers general strategies, common pitfalls, and variations of the problems encountered in this project.

---

## Table of Contents

1.  [General Strategies for Stack/Queue Problems](#1-general-strategies-for-stackqueue-problems)
2.  [Communicating Your Solution](#2-communicating-your-solution)
3.  [Common Pitfalls and Edge Cases](#3-common-pitfalls-and-edge-cases)
4.  [Interview Tips Specific to Problems](#4-interview-tips-specific-to-problems)
    *   [Valid Parentheses](#valid-parentheses)
    *   [Implement Queue using Stacks](#implement-queue-using-stacks)
    *   [Moving Average from Data Stream](#moving-average-from-data-stream)
    *   [Largest Rectangle in Histogram](#largest-rectangle-in-histogram)
    *   [Min Stack](#min-stack)
5.  [Variations and Related Problems](#5-variations-and-related-problems)

---

## 1. General Strategies for Stack/Queue Problems

*   **Recognize the Pattern:**
    *   **Stack (LIFO):** Think Stack when you need to process things in reverse order of appearance, or when matching opening/closing elements (parentheses, tags), tracking previous states, or dealing with "next greater/smaller element" type problems (monotonic stacks). Recursion implicitly uses a call stack.
    *   **Queue (FIFO):** Think Queue when you need to process things in the order they arrived, manage tasks in a sequential manner, implement breadth-first search (BFS), or handle sliding window problems.
*   **Visualize:** Use simple examples and trace the stack/queue operations step-by-step on paper or a whiteboard. This helps catch errors and solidify understanding. ASCII art diagrams (like in `docs/diagrams.md`) are excellent for this.
*   **Start Simple (Brute Force):** If the optimal solution isn't immediately obvious, start by describing a brute-force approach. This demonstrates problem understanding and can sometimes lead you to optimizations.
*   **Optimal Data Structure:** Clearly articulate *why* a Stack or Queue is the right data structure for the problem. What properties (LIFO/FIFO) make it suitable?
*   **Amortized Analysis:** For problems like "Implement Queue using Stacks", be prepared to explain amortized time complexity.
*   **Edge Cases First:** Consider what happens with empty inputs, single elements, all identical elements, or very small/large values.

## 2. Communicating Your Solution

*   **Clarify:** Ask clarifying questions about constraints, input types, output format, and edge cases before writing any code. (e.g., "Are inputs always valid characters?", "Can the stack be empty before `pop` or `peek`?").
*   **High-Level Plan:** Start by outlining your approach at a high level. "I'm going to use a stack for this because..."
*   **Detailed Algorithm:** Then, walk through the step-by-step algorithm before writing code.
*   **Code as You Speak:** Explain your code as you write it. Don't just type silently.
*   **Test Cases:** After coding, dry run your solution with a few test cases, including edge cases.
*   **Complexity Analysis:** Always provide a time and space complexity analysis for your solution and explain your reasoning.

## 3. Common Pitfalls and Edge Cases

*   **Empty Stack/Queue:** Attempting `pop()`, `peek()`, or `top()` on an empty data structure can lead to errors. Always check `isEmpty()` first (unless problem constraints guarantee non-empty calls).
*   **Off-by-One Errors:** Especially in problems involving indices (e.g., "Largest Rectangle"), be careful with loop bounds and index calculations.
*   **Synchronization Issues:** When using multiple stacks/queues, ensure they remain synchronized (e.g., `MinStack`, `Implement Queue using Stacks`).
*   **Immutability of Strings:** In JavaScript (and many other languages), strings are immutable. Operations like `replace` create new strings, which can have performance implications (`isValidParenthesesBruteForce`).
*   **Floating-Point Precision:** When calculating averages (e.g., `MovingAverage`), remember that floating-point arithmetic can have precision issues. Use a small epsilon for comparisons in tests if exact equality isn't expected.

## 4. Interview Tips Specific to Problems

### Valid Parentheses
*   **Tip:** This is a fundamental stack problem. If you nail this, it shows good understanding of basic stack usage.
*   **Variation:** Extend to other delimiters like `<...>`, `/* ... */`, or HTML tags.

### Implement Queue using Stacks
*   **Tip:** Explain the amortized time complexity clearly. It's a common point of confusion.
*   **Variation:** Implement Stack using Queues (more complex than Queue using Stacks, as `push` or `pop` becomes O(N)).

### Moving Average from Data Stream
*   **Tip:** Recognize the sliding window pattern immediately. A queue is the natural fit.
*   **Variation:** What if `size` could change? What if you needed the median instead of the average? (Would require a different data structure, e.g., two heaps for median).

### Largest Rectangle in Histogram
*   **Tip:** This is an advanced stack problem (monotonic stack). If you can solve this, it's a strong signal. Practice tracing the stack.
*   **Variation:** "Next Greater/Smaller Element" problems, "Trapping Rain Water". The same monotonic stack pattern applies.

### Min Stack
*   **Tip:** The core insight is that you need to store minimums *alongside* the actual values. Be ready to explain why the auxiliary stack works and why popping from both is crucial.
*   **Variation:** What if `getMin()` only needed to be O(logN)? (Could use a min-heap or balanced BST). What if `pop` could be called on an empty stack? (Handle errors/return null).

## 5. Variations and Related Problems

*   **Monotonic Stack Problems:**
    *   Next Greater Element I/II
    *   Daily Temperatures
    *   Sum of Subarray Minimums
    *   Trapping Rain Water (can also be solved with a stack)
*   **Stack for Expression Evaluation:**
    *   Basic Calculator I/II/III
    *   Infix to Postfix conversion
*   **Queue for BFS:**
    *   Breadth-First Search on graphs/trees
    *   Shortest path in unweighted graphs
    *   Level order traversal of a tree
*   **Deques (Double-Ended Queues):**
    *   Sliding Window Maximum (often uses a deque for O(N) solution)
    *   Can implement both Stack and Queue functionalities efficiently.
*   **Priority Queues (Heaps):**
    *   Finding Kth largest/smallest element
    *   Median of a data stream
    *   Dijkstra's algorithm, Prim's algorithm

By understanding these core concepts and practicing the problems, you'll be well-prepared for Stack and Queue questions in coding interviews!
```