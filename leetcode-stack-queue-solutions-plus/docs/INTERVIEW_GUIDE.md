```markdown
# Interview Guide: Stacks and Queues

This document provides interview tips, common variations, and discussion points related to Stack and Queue problems.

---

## General Interview Tips for Stack and Queue Problems

1.  **Understand the Core Concepts**:
    *   **Stack**: LIFO (Last In, First Out). Operations: `push`, `pop`, `peek` (or `top`), `isEmpty`, `size`.
    *   **Queue**: FIFO (First In, First Out). Operations: `enqueue` (or `add`), `dequeue` (or `remove`), `peek` (or `front`), `isEmpty`, `size`.
    *   **Deque (Double-Ended Queue)**: Can add/remove from both ends. `collections.deque` in Python is highly optimized for this.

2.  **Recognize When to Use Them**:
    *   **Stack**:
        *   Reversing order (e.g., reverse a string, undo operations).
        *   Matching pairs (parentheses, braces).
        *   Tracking states that need to be revisited in reverse order (DFS, backtracking).
        *   Evaluating expressions (postfix/prefix).
        *   "Next Greater/Smaller Element" problems (monotonic stack).
    *   **Queue**:
        *   Processing elements in the order they arrive (BFS, scheduling tasks).
        *   Buffering data.
        *   Implementing a "waiting list" or "line."
        *   Sliding window problems (often with a deque for optimization).

3.  **Talk Through Your Thought Process**:
    *   Start with a simple example and trace it.
    *   Propose a brute-force solution first (if applicable), then discuss its inefficiencies.
    *   Explain how using a Stack/Queue (or a specialized variant like a monotonic stack/deque) can optimize it.
    *   Clearly articulate your chosen data structure and why it fits the problem.

4.  **Consider Edge Cases**:
    *   Empty input (empty string, empty array, empty stack/queue).
    *   Single element input.
    *   Inputs with all identical elements.
    *   Maximum/minimum possible values.
    *   Inputs that lead to stack/queue being full or empty (e.g., all opening brackets, all closing brackets).

5.  **Complexity Analysis**:
    *   Always state the time and space complexity of your solution.
    *   Be precise about amortized vs. worst-case complexity (e.g., Queue from Stacks).

6.  **Code Quality**:
    *   Use meaningful variable names.
    *   Add comments for non-obvious logic.
    *   Handle errors gracefully (though interview problems often simplify this).
    *   Write clean, readable code.

---

## Problem-Specific Interview Tips & Variations

### 1. Valid Parentheses

*   **Key Insight**: Last open bracket must be the first closed. (LIFO -> Stack)
*   **Variations**:
    *   **Different types of brackets**: The problem already covers this.
    *   **Only one type of bracket**: Simplifies the mapping.
    *   **Removing minimum invalid parentheses**: Much harder, often uses BFS with a queue.
    *   **Longest valid parentheses substring**: Uses stack to find valid lengths.
*   **Edge Cases**: Empty string (valid), string with only open/close brackets, mismatched types.
*   **Discussion Points**: Why stack is suitable. How to handle invalid sequences (e.g., `)]`, `[{)]`).

### 2. Min Stack

*   **Key Insight**: Need to track minimum efficiently.
*   **Variations**:
    *   **Using `(value, current_min)` pairs on a single stack**:
        *   Instead of two separate stacks, each element pushed is a tuple `(val, min_at_this_point)`.
        *   When pushing `val`, `min_at_this_point` is `min(val, stack[-1][1] if stack else val)`.
        *   This uses slightly more space per element but can be cleaner conceptually.
    *   **O(1) space `getMin()` (tricky)**:
        *   This is a highly advanced trick, often not expected unless specifically hinted. It modifies the pushed value such that when you pop, you can restore the previous minimum.
        *   For example, if pushing `x` and `x < min_val`, push `2*x - min_val` and update `min_val = x`. When popping, if popped value `y < min_val`, then `prev_min = 2*min_val - y`. This only works for specific constraints (e.g., non-negative integers).
        *   Focus on the two-stack solution first.
*   **Edge Cases**: Empty stack operations (`pop`, `top`, `getMin`).
*   **Discussion Points**: Trade-offs between the two-stack approach and storing pairs. Why standard stack won't work for `getMin()` in O(1).

### 3. Implement Queue using Stacks

*   **Key Insight**: To get FIFO from LIFO, you need to reverse the order of elements. Two stacks provide this reversal.
*   **Variations**:
    *   **Make `pop`/`peek` strictly O(1) (not amortized)**: This is usually not achievable while keeping `push` O(1) as well. You'd have to transfer elements on every `push` or `pop` which would be O(N) in the worst case for those operations. The amortized O(1) solution is standard and preferred.
    *   **Implement a Stack using Queues**:
        *   Similar logic. One queue for main storage, another as a temporary buffer.
        *   `push`: Add to Q1.
        *   `pop`: To get LIFO, transfer N-1 elements from Q1 to Q2, dequeue the last one from Q1, then transfer all from Q2 back to Q1. (O(N) operation).
*   **Edge Cases**: Empty queue, pushing/popping single elements. The problem statement usually guarantees valid operations on a non-empty queue for `pop`/`peek`.
*   **Discussion Points**: Explain the amortized complexity. Why the two-stack approach works (the "transfer" mechanism). Contrast with implementing a Stack with Queues.

### 4. Sliding Window Maximum

*   **Key Insight**: Need to efficiently find the maximum in a window while elements enter and exit. A simple max-heap is O(logK) for each operation, leading to O(NlogK). A monotonic deque achieves O(N).
*   **Monotonic Deque Properties**:
    *   Stores *indices* of elements.
    *   Elements (by value) are in *decreasing order* from front to back.
    *   Front of deque `dq[0]` always points to the current maximum.
*   **How it works**:
    1.  Remove indices from front if they are out of the current window.
    2.  Remove indices from back if their values are smaller than the current element (because they can no longer be the maximum if a larger element appears later in the window).
    3.  Add current element's index to the back.
*   **Variations**:
    *   **Sliding window minimum**: Same logic, but monotonic *increasing* deque.
    *   **Sliding window average/sum**: Usually uses a prefix sum array or simple addition/subtraction, not a deque.
    *   **General sliding window problems**: Often involves hash maps for frequency counts or two pointers, not necessarily a deque.
*   **Edge Cases**: `k=1`, `k=N` (entire array is one window), empty array, `k=0`.
*   **Discussion Points**: Why a max-heap is O(NlogK) and a deque is O(N). Explain the "monotonic" property and why it's maintained. Trace an example step-by-step.

### 5. Daily Temperatures

*   **Key Insight**: For each temperature, you need to find the "next greater element" to its right. This is a classic monotonic stack application.
*   **Monotonic Stack Properties**:
    *   Stores *indices* of elements.
    *   Elements (by value) are in *decreasing order* from bottom to top.
*   **How it works**:
    1.  Iterate through temperatures.
    2.  If the current temperature is *greater* than the temperature at the index on top of the stack:
        *   Pop the index from the stack.
        *   The popped index has found its "next greater element" at the current index. Calculate the difference.
        *   Repeat until stack is empty or current temperature is not greater.
    3.  Push the current index onto the stack.
*   **Variations**:
    *   **Next Greater Element I/II**: Similar problems finding the next greater element in an array (potentially circular).
    *   **Next Smaller Element**: Same logic, but monotonic *increasing* stack and compare for smaller.
    *   **Previous Greater/Smaller Element**: Iterate from right-to-left, or reverse the array.
*   **Edge Cases**: All temperatures increasing (stack grows, then rapidly empties), all temperatures decreasing (stack grows to full size, remains non-empty), empty array, single element.
*   **Discussion Points**: Explain why a monotonic decreasing stack is used. Trace an example. Compare with a brute-force O(N^2) solution.

---

By preparing these concepts, problem solutions, and discussion points, you will be well-equipped to tackle Stack and Queue questions in your coding interviews. Good luck!
```