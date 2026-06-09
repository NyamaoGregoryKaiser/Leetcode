# Interview Preparation: Stack & Queue Tips

This document provides general interview tips, common gotchas, and variations for Stack and Queue problems, along with advice on complexity analysis and communication.

---

## General Interview Tips

1.  **Understand the Problem Thoroughly:**
    *   Ask clarifying questions: What are the constraints (array size, value range, character set)? Are there edge cases (empty input, single element, all same elements)? Is the array sorted, distinct, circular?
    *   Confirm expected output format and data types.

2.  **Start with a Brute Force (if applicable):**
    *   Even if not optimal, outlining a brute force solution demonstrates problem understanding and provides a baseline. It can often help you identify patterns for optimization.

3.  **Think out loud:**
    *   Verbalize your thought process. Explain *why* you're considering a stack, queue, or deque.
    *   Discuss potential data structures and their pros/cons for the given problem.

4.  **Walk Through an Example:**
    *   Choose a small, non-trivial example.
    *   Manually trace your algorithm step-by-step. This often reveals bugs or missing edge cases. Use the "ASCII art" style from `diagrams.md` if helpful.

5.  **Identify the Core Data Structure:**
    *   **Stack (LIFO - Last-In, First-Out):**
        *   Used for problems involving matching (parentheses), parsing, backtracking (DFS), reversing order, or tracking state that needs to be undone (e.g., call stack).
        *   Monotonic stacks are powerful for finding "next greater/smaller element" or "nearest smaller/greater element" patterns.
    *   **Queue (FIFO - First-In, First-Out):**
        *   Used for problems involving order of processing (BFS), task scheduling, buffering.
        *   `collections.deque` in Python is the go-to for efficient queue operations.
    *   **Deque (Double-Ended Queue):**
        *   Combines stack and queue functionalities, allowing efficient additions/removals from both ends.
        *   Crucial for "sliding window maximum/minimum" problems (monotonic deque).

6.  **Complexity Analysis:**
    *   Always state and justify your Time and Space complexity.
    *   Be precise about amortized vs. worst-case complexity for operations like Queue using Stacks.

7.  **Code Quality:**
    *   Use meaningful variable names.
    *   Add comments for complex logic.
    *   Keep your code clean and readable.

---

## Edge Cases and Gotchas

These are common pitfalls to consider for Stack and Queue problems:

1.  **Empty Input:**
    *   **String:** `""` for valid parentheses.
    *   **List/Array:** `[]` for sliding window, next greater element, etc.
    *   **Stack/Queue operations on empty structure:** `pop()`, `peek()/top()`, `getMin()` on an empty stack/queue should typically raise an error or return a specific default value (like `None` or `float('-inf')` depending on problem context). Ensure your code handles this gracefully.

2.  **Single Element Input:**
    *   `"a"` (invalid parentheses unless it's an empty string case)
    *   `[5]` for sliding window max (returns `[5]`), next greater element (returns `[-1]`).

3.  **All Same Elements:**
    *   `"((()))"` vs. `"((()))"` (valid).
    *   `[7, 7, 7, 7]` for sliding window (returns `[7, 7]`) or next greater element (returns `[-1, -1, -1, -1]`).

4.  **Extremes for Values:**
    *   Very large/small numbers (`int` limits).
    *   All negative numbers.
    *   Zeros.

5.  **Window Size `k` (for sliding window problems):**
    *   `k = 0`: Usually returns `[]`.
    *   `k = 1`: Returns the original array itself.
    *   `k = len(nums)`: Returns a list with a single element, which is the max of the entire array.
    *   `k > len(nums)`: The window never fully forms. Typically returns `[]`.

6.  **Circular Arrays:**
    *   Requires iterating twice or more (e.g., `2 * N` for `Next Greater Element`).
    *   Careful with index mapping (`i % N`).

7.  **Duplicates:**
    *   How do duplicates affect "next greater" or "minimum" logic? For `MinStack`, handling `push(5), push(5), pop(5), getMin()` should still yield `5`. This requires `val <= min_stack[-1]` when pushing to the auxiliary min stack.
    *   For monotonic deques, `nums[dq[-1]] <= nums[i]` (if allowing current number to be equal to previous smaller elements from deque) or `nums[dq[-1]] < nums[i]` (if strictly removing smaller). The choice depends on specific problem interpretation regarding "next greater/smaller including equal". The standard is usually strictly greater.

---

## Interview Tips and Variations

### General Strategies:

*   **When to use a Stack:**
    *   Reversing order: `push` all elements, then `pop` all.
    *   Matching pairs: `Valid Parentheses`.
    *   Tracking ancestry/context: DFS, expression evaluation, HTML/XML parsing.
    *   "Next Greater/Smaller" type problems: Monotonic Stack.
    *   Undo/Redo functionality.
*   **When to use a Queue:**
    *   Processing elements in arrival order: BFS, task queues.
    *   Buffering.
    *   "Sliding window" problems: Monotonic Deque (often a specialized queue).

### Problem-Specific Variations:

1.  **Valid Parentheses:**
    *   **Different characters:** Include `< >`, custom delimiters.
    *   **Only one type of bracket:** Simplifies the problem.
    *   **Validating XML/JSON:** More complex parsing, but same stack principle.

2.  **Min Stack:**
    *   **Max Stack:** Same logic, but track maximum instead of minimum.
    *   **Min/Max Stack:** Keep track of both simultaneously.
    *   **Stack with `getAverage()` in O(1):** Much harder, often requires more complex data structures or approximate solutions.

3.  **Queue using Stacks:**
    *   **Stack using Queues:** Also possible, but `pop` and `peek` typically become O(N) because you need to move N-1 elements back and forth.
    *   **Limited size stacks/queues:** What if stacks have a max capacity?

4.  **Sliding Window Maximum:**
    *   **Sliding Window Minimum:** Same logic, but maintain a monotonic *increasing* deque.
    *   **Sliding Window Average/Sum:** Can be done in O(1) per window update using a running sum.
    *   **Sliding Window with Kth Largest/Smallest:** Often requires a min-heap or max-heap of size `k`.
    *   **Longest subarray with condition X:** Often involves two pointers and potentially a `HashMap` or a `Deque`.

5.  **Next Greater Element:**
    *   **Next Smaller Element:** Similar monotonic stack logic, but stack stores elements in increasing order.
    *   **Previous Greater/Smaller Element:** Iterate from right to left (for previous greater) or use modified logic.
    *   **Next Greater Element I/II/III (LeetCode variants):** `I` is for a subset, `II` is circular (our problem), `III` involves digit permutation.
    *   **Trapping Rain Water:** A classic problem that can be solved with a monotonic stack.

### Communication during the interview:

*   **Clarity:** Use precise language when describing stack/queue operations (push/pop/top/enqueue/dequeue/front).
*   **Justification:** Explain your choices. "I'm using a stack here because I need to match the most recently opened bracket, which is a LIFO pattern."
*   **Handle Errors:** Discuss how you would handle potential errors (e.g., trying to pop from an empty stack).
*   **Test Cases:** Propose diverse test cases including base cases, edge cases, and typical scenarios.

By thoroughly preparing with these concepts, examples, and variations, you'll be well-equipped to tackle a wide range of Stack and Queue-related coding interview questions.
---