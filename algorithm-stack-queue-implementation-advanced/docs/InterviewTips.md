```markdown
# Interview Tips and Variations for Stack and Queue Problems

This document provides tips for approaching stack and queue problems in coding interviews, along with common variations and follow-up questions.

## General Interview Tips

1.  **Understand the Problem Thoroughly:**
    *   Clarify input/output formats, constraints (e.g., `N` size, value range, strictly increasing timestamps, characters allowed).
    *   Ask about edge cases: empty inputs, single element, duplicates, maximum values.
    *   Understand the desired time and space complexity.

2.  **Start with a Brute-Force (if applicable):**
    *   Even if inefficient, describing a brute-force approach shows you understand the problem and can establish a baseline. This also helps you identify inefficiencies to optimize later.

3.  **Think Data Structures:**
    *   **LIFO (Last-In, First-Out):** Immediately think `Stack`. Common uses:
        *   Parentheses/bracket matching
        *   Function call stack (recursion simulation)
        *   Undo/redo operations
        *   Syntax parsing
        *   Backtracking algorithms
        *   "Next greater/smaller element" problems (monotonic stacks)
    *   **FIFO (First-In, First-Out):** Immediately think `Queue`. Common uses:
        *   BFS (Breadth-First Search) for shortest paths on unweighted graphs/grids
        *   Task scheduling/processing
        *   Buffer management
        *   Sliding window problems (like Recent Counter)
        *   Level order traversal of trees

4.  **Visualize with Examples:**
    *   Walk through small examples manually with your chosen data structure. This helps catch logic errors and confirms your understanding.
    *   Use the whiteboard or scratchpad to draw out the stack/queue state.

5.  **Explain Your Thought Process:**
    *   Verbalize your reasoning *before* coding. Explain why you chose a particular data structure or algorithm.
    *   Discuss trade-offs (e.g., space vs. time).
    *   Talk about the time and space complexity clearly.

6.  **Write Clean, Readable Code:**
    *   Use meaningful variable names.
    *   Add comments for complex logic or non-obvious steps.
    *   Structure your code logically (e.g., helper methods).

7.  **Test Thoroughly:**
    *   After writing code, test with provided examples and your own edge cases.
    *   Mentally "dry run" your code with these test cases.

## Common Stack Variations

1.  **Monotonic Stack:**
    *   **Problem Types:** Finding the "next greater/smaller element" to the left or right, calculating areas of histograms, trapping rainwater.
    *   **Tip:** The stack stores indices (or values) in either strictly increasing or decreasing order. When a new element breaks this monotonicity, pop elements from the stack until monotonicity is restored, processing popped elements as they find their "next greater/smaller".
    *   **Example:** `Daily Temperatures` (implemented).

2.  **Stack with O(1) Min/Max:**
    *   **Problem:** Standard `Min Stack` (implemented).
    *   **Variations:** `Max Stack` (similar logic, auxiliary stack for max), or a stack that supports `getMin` and `getMax` simultaneously in O(1).
    *   **Tip:** Using two auxiliary stacks is generally the clearest. Discuss the single-stack approaches (storing pairs or differences) for memory optimization if the interviewer probes.

3.  **Expression Parsing / Evaluation:**
    *   **Problem Types:** Infix to Postfix conversion, evaluating postfix/prefix expressions, basic calculator problems.
    *   **Tip:** Often involves multiple stacks (one for operators, one for operands), or a single stack for RPN. Operator precedence rules are key.

4.  **Backtracking Simulation:**
    *   **Problem Types:** Maze solving (DFS), Sudoku solver, N-Queens problem (though often done recursively, iterative solutions use explicit stacks).
    *   **Tip:** A stack can explicitly manage states in a search tree. Push a state, explore. If dead end, pop and try another path.

## Common Queue Variations

1.  **BFS (Breadth-First Search):**
    *   **Problem Types:** Shortest path in unweighted graphs/grids, level-order traversal of trees, finding connected components, "Walls and Gates" (multi-source BFS), "Number of Islands" (BFS for connected components).
    *   **Tip:** Use a queue to maintain nodes to visit. Always mark nodes as visited *when adding them to the queue* to prevent redundant additions and cycles.
    *   **Variations:**
        *   **Multi-source BFS:** Start BFS by adding all initial "source" nodes to the queue (like all gates in "Walls and Gates").
        *   **0-1 BFS:** If edge weights are only 0 or 1, a `Deque` can be used. Push 0-weight edges to the front, 1-weight edges to the back.

2.  **Sliding Window:**
    *   **Problem Types:** Finding max/min in a sliding window, counting elements in a time-based window (like `Recent Counter`), substring/subarray problems.
    *   **Tip:** A queue or deque (double-ended queue) is essential. Add new elements to one end, remove outdated elements from the other.
    *   **Variations:**
        *   **Fixed-size window:** Maintain the queue to always contain `K` elements.
        *   **Dynamic window:** Window size changes based on a condition (e.g., `k` elements in range `[t-X, t]`).

3.  **Priority Queue:**
    *   **Problem Types:** Dijkstra's algorithm (shortest path with non-negative weights), Huffman coding, Top K elements, scheduling tasks based on priority.
    *   **Tip:** While not a "Stack or Queue" in the traditional sense, a `PriorityQueue` is a common data structure that extends `Queue` in Java and often comes up in related contexts. Be familiar with its O(logN) `add`/`poll` complexity.

4.  **Implement Queue/Stack using other data structures:**
    *   **Problem:** `Implement Queue using Stacks` (implemented), `Implement Stack using Queues`.
    *   **Tip:** Understand the core LIFO/FIFO principles. For "Stack using Queues", it's trickier, often involving transferring all elements from one queue to another, then adding the new element, then transferring back, or just one transfer during pop/top.

## Language Specifics (Java)

*   **`java.util.Stack` vs. `java.util.Deque`:**
    *   `java.util.Stack` extends `Vector` (legacy synchronized class, less efficient).
    *   `java.util.Deque` (implemented by `LinkedList` or `ArrayDeque`) is generally preferred for stack operations (`push`, `pop`, `peek`) due to better performance and being part of the Java Collections Framework. Use `LinkedList` for dynamic growth, `ArrayDeque` for slightly better performance when capacity can be estimated (or if you need a resizable array-backed deque).
*   **`java.util.Queue`:**
    *   `LinkedList` is a common implementation for a general-purpose queue.
    *   `ArrayDeque` can also be used and is often faster than `LinkedList` for queue operations.
    *   `PriorityQueue` implements `Queue` but orders elements based on priority.

## What to Emphasize During the Interview

*   **Correctness:** Does your code produce the correct output for all cases, especially edge cases?
*   **Efficiency:** Is your solution optimal in terms of time and space complexity? Justify why.
*   **Readability:** Is your code clear and easy to understand?
*   **Robustness:** Does it handle invalid inputs gracefully (e.g., throwing exceptions)?
*   **Trade-offs:** Can you discuss alternative solutions and explain why your chosen solution is better or under what circumstances an alternative might be preferred?

By focusing on these points and practicing with the problems provided in this project, you'll be well-prepared for stack and queue questions in your coding interviews.
```