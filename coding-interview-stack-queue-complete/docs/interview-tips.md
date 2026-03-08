# Coding Interview Tips: Stacks and Queues

Success in coding interviews, especially those involving data structures like Stacks and Queues, goes beyond just knowing the algorithms. It involves demonstrating strong problem-solving skills, clear communication, and handling various aspects of the interview process.

## General Approach to Stack/Queue Problems

1.  **Understand the Problem Thoroughly:**
    *   Read the problem statement carefully. Don't assume.
    *   Clarify constraints: input size, data types, time/space limits.
    *   Ask for examples, or create your own simple ones, especially edge cases.
    *   Identify the core requirement: Is it LIFO (Stack) or FIFO (Queue)? This is the first hint.

2.  **Think Out Loud (Verbalize Your Thoughts):**
    *   This is crucial. Interviewers want to see your thought process.
    *   Explain your initial brute-force ideas, even if not optimal.
    *   Discuss why they might be inefficient (e.g., "This would be O(N^2) because...").
    *   Brainstorm alternative data structures or approaches.

3.  **Choose the Right Data Structure:**
    *   **Stack (LIFO):**
        *   Reversing order (e.g., reverse a string, evaluate postfix expression).
        *   Matching pairs (e.g., parentheses, HTML tags).
        *   Keeping track of previous states (e.g., DFS, backtracking, browser history).
        *   Monotonic stacks (e.g., finding next greater element, `slidingWindowMaximum`).
    *   **Queue (FIFO):**
        *   Processing items in order of arrival (e.g., BFS, task scheduling, print queues).
        *   Buffering.
        *   Event handling.
        *   `Deque` (Double-Ended Queue): When you need to add/remove from both ends in O(1) (e.g., `slidingWindowMaximum`).

4.  **Develop an Algorithm:**
    *   Once you've identified a promising data structure, outline the steps.
    *   Walk through your chosen example with your proposed algorithm.
    *   Consider different scenarios: average case, best case, worst case.

5.  **Analyze Complexity (Time & Space):**
    *   Always state and justify your time and space complexity.
    *   Be precise about average vs. worst-case.
    *   For amortized analysis (like Queue with Stacks), explain why it's amortized.

6.  **Write Clean Code:**
    *   Use meaningful variable names.
    *   Break down complex logic into helper functions.
    *   Add comments for tricky parts, but don't over-comment obvious code.
    *   Handle edge cases explicitly (empty inputs, single element, maximum/minimum values).
    *   Consider using custom data structures (like provided in this project) if the problem implies needing to understand internals, or if standard library ones have performance caveats (like `Array.prototype.shift()` vs a real O(1) `dequeue`).

7.  **Test Your Code:**
    *   Verbally walk through your code with your chosen test cases.
    *   Include happy path, edge cases, and invalid inputs.
    *   Look for off-by-one errors, infinite loops, and incorrect conditions.

## Common Pitfalls & Gotchas

*   **Misidentifying LIFO vs. FIFO:** The most fundamental error. Make sure you use the right tool for the job.
*   **Not Handling Empty Data Structures:** Forgetting `isEmpty()` checks before `pop()`, `peek()`, `dequeue()`. This leads to errors (or `undefined` behavior in some languages).
*   **Off-by-One Errors:** Especially in loops or when dealing with window sizes (`k-1` vs `k`).
*   **Incorrect Amortized Analysis:** Forgetting that operations like `Array.prototype.shift()` are O(N) in JavaScript, even if conceptually a "queue dequeue" should be O(1). Be prepared to explain how to achieve true O(1) if challenged.
*   **Overflow/Underflow:** For fixed-size stacks/queues, consider what happens when they are full or empty. Our dynamic ones handle this by resizing (implicitly for arrays) or throwing errors.
*   **Mutable vs. Immutable:** Be aware if functions modify the input array/data structure in place or return a new one.
*   **Forgetting `pop()` on auxiliary stack in `MinStack`:** When the main stack's popped element is the minimum, you MUST also pop it from the `minStack`. Otherwise, `minStack` could keep an element that's no longer present in the main stack.
*   **Infinite Loops in Queue/Stack Implementations:** When transferring elements between auxiliary data structures (e.g., in `MyQueue` or `MyStack`), ensure the loop termination condition is correct (`!inStack.isEmpty()`) and that you actually move all elements.

## Interviewer Expectations

*   **Problem-Solving:** Can you break down complex problems?
*   **Algorithmic Thinking:** Can you devise an efficient algorithm?
*   **Data Structure Knowledge:** Do you understand the strengths and weaknesses of different data structures?
*   **Coding Proficiency:** Is your code correct, clean, and readable?
*   **Communication:** Can you articulate your thoughts clearly?
*   **Handling Pressure:** Can you debug your code, adapt to new constraints, and take feedback?

Practice, practice, practice! The more problems you solve and explain, the more comfortable and confident you'll become. Good luck!