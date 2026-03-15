```markdown
# Interview Tips and Variations

This document provides guidance on how to approach these Stack and Queue problems in a coding interview, common pitfalls, and potential variations or follow-up questions.

---

## General Interview Tips for Stack/Queue Problems

1.  **Clarify Constraints:** Always start by asking clarifying questions. What are the constraints on input size, data types (positive/negative integers, characters, objects), time/space limits, and edge cases (empty input, single element)?
2.  **Talk Through Your Thought Process:** Articulate your ideas. Start with a brute-force approach, identify its shortcomings, and then brainstorm optimizations. This shows your problem-solving methodology.
3.  **Choose Appropriate Data Structures:** Understand when to use a `Stack` (LIFO) vs. a `Queue` (FIFO) vs. a `Deque` (double-ended). Explain *why* you chose a particular structure.
4.  **Handle Edge Cases:** Explicitly consider `null` inputs, empty collections, single elements, and inputs that might push boundaries (e.g., very long strings, arrays with all same values).
5.  **Complexity Analysis:** Always state the time and space complexity of your solution. Be prepared to justify it. For amortized complexity, explain why it's amortized.
6.  **Code Cleanliness:** Write clean, readable code with meaningful variable names and comments for complex logic.
7.  **Test Cases:** Walk through your solution with example test cases, including normal cases, edge cases, and potentially invalid inputs.

---

## Problem 1: Min Stack

**Interview Tips:**
*   **Start Simple:** You might initially think of sorting or iterating, but quickly realize these won't be O(1).
*   **Hint if Stuck:** If you're stuck, the interviewer might hint at using "another data structure" or "storing more information." This points to the auxiliary stack or pair approach.
*   **Discuss Trade-offs:** Be ready to discuss the space trade-off of the two-stack approach. While operations are O(1), space can be O(N) worst-case. The single-stack with pair approach also has O(N) space for objects.
*   **Duplicate Minimums:** Emphasize how you handle duplicate minimums (e.g., `push(0)`, `push(0)`). The `val <= minStack.peek()` check is crucial here.

**Variations & Follow-ups:**
*   **Max Stack:** Design a `MaxStack` (identical logic, just store max instead of min).
*   **Min/Max Stack:** Support both `getMin()` and `getMax()` in O(1). You'd use two auxiliary stacks, one for min and one for max.
*   **Stack with `getKthMin()`:** How would you get the Kth minimum in O(1)? This usually requires a more complex data structure like an order statistic tree or balanced BST, not typically a stack problem anymore.
*   **Using a single stack and storing `(value, current_min)` pairs:** Discuss this alternative. It can simplify the pop logic slightly but fundamentally has similar space complexity.
*   **Space-optimized single stack (difference method):** This is harder to implement and has overflow risks. Only suggest it if you are very confident and the interviewer pushes for extreme space optimization.

---

## Problem 2: Valid Parentheses

**Interview Tips:**
*   **Recognize the Pattern:** This is a classic "matching symbols" problem, a direct hint for using a stack.
*   **Map for Bracket Pairs:** Using a `HashMap` for `closing -> opening` bracket mappings is clean and efficient. Avoid long `if-else if` chains.
*   **Order Matters:** Explain how the stack naturally enforces the "correct order" requirement by matching the *most recently opened* bracket.
*   **Empty Stack Check:** Emphasize checking `stack.isEmpty()` when encountering a closing bracket *before* trying to pop. Also, the final `return stack.isEmpty()` is critical.

**Variations & Follow-ups:**
*   **Different Types of Brackets/Symbols:** What if the problem included XML tags or other custom delimiters? The solution would adapt easily.
*   **Validating Arithmetic Expressions:** This problem is a stepping stone to evaluating arithmetic expressions (infix to postfix, or RPN evaluation), which heavily rely on stacks.
*   **Validating HTML/XML:** Slightly more complex due to attributes and tag names, but the core stack principle remains.
*   **Remove Invalid Parentheses:** Given a string with invalid parentheses, remove the minimum number to make it valid. This is a much harder problem often involving BFS or backtracking.
*   **Longest Valid Parentheses:** Find the length of the longest valid parentheses substring. This can be solved with a stack or dynamic programming.

---

## Problem 3: Trapping Rain Water

**Interview Tips:**
*   **Start with Brute Force:** It's good to show you understand the problem. For each bar, find its left max and right max. O(N^2) time, O(1) space.
*   **Dynamic Programming (Precomputation):** Optimize brute force by precomputing `leftMax[]` and `rightMax[]` arrays. O(N) time, O(N) space. This is a solid intermediate solution.
*   **Two Pointers (Space Optimized):** Explain how `min(leftMax, rightMax)` determines the water level. The two-pointer trick correctly identifies the *limiting* boundary locally. This is often considered the most elegant O(1) space solution.
*   **Monotonic Stack (Alternative Perspective):** Describe how the stack keeps track of potential left boundaries and helps calculate water when a right boundary is found. This is a common advanced stack pattern. Choose one of the O(N) solutions to implement.

**Variations & Follow-ups:**
*   **Trapping Rain Water II (3D):** This is a much harder problem (often asked in Google interviews) involving a min-heap and BFS/Dijkstra-like approach on a 2D grid.
*   **Smallest Rectangle in Histogram:** Another classic stack problem that uses a similar monotonic stack concept to find the largest rectangle. Often asked together or as a follow-up.
*   **Find all pairs `(i, j)` that can trap water:** Instead of total amount, list the specific segments.

---

## Problem 4: Implement Queue using Stacks

**Interview Tips:**
*   **Conceptual Understanding:** Explain the core idea: `inputStack` for new elements, `outputStack` for "old" elements that are ready to be dequeued.
*   **Amortized Analysis:** This is crucial. Don't just say O(N) for `pop`; explain *why* it's O(1) amortized. Each element is pushed and popped twice (once from `inputStack`, once from `outputStack`).
*   **Transfer Logic:** Clearly explain the `transferElementsIfNeeded()` helper and why it only moves elements when `outputStack` is empty. This prevents unnecessary transfers.
*   **Empty Queue:** Ensure `empty()` checks *both* stacks.

**Variations & Follow-ups:**
*   **Implement Stack using Queues:** This is the inverse problem. Can be done with one or two queues. With one queue, it involves repeatedly dequeuing and enqueuing (N-1) elements to get the last one.
*   **Implement Deque using Stacks/Queues:** More complex, but similar ideas of transferring elements.
*   **Queue with Max/Min Element:** Extend this to also return the maximum/minimum element in O(1). This would combine `CustomQueueViaStacks` with ideas from `CustomMinStack`, likely requiring additional deques or stacks.
*   **Bounded Queue:** What if the queue has a fixed capacity? Add logic for throwing exceptions or returning false on `push` if full.

---

## Problem 5: Sliding Window Maximum

**Interview Tips:**
*   **Start with Naive:** Brute force (O(NK)) or a `PriorityQueue` (O(N log K)) are good starting points. Discuss their limitations (Time Limit Exceeded for large N, K).
*   **Monotonic Deque is Key:** This is the optimal solution. Clearly explain *why* a `Deque` is used and its monotonic property (decreasing order of values, front is max).
*   **Three Deque Operations:** Break down the logic into:
    1.  Removing old indices from the front.
    2.  Removing smaller/irrelevant elements from the back (maintaining monotonicity).
    3.  Adding the current element's index to the back.
*   **Index vs. Value:** Emphasize storing *indices* in the deque, not values, because you need to check if an element's index is still within the window.
*   **Amortized Complexity:** Each element is pushed and popped at most once, leading to O(N) overall.

**Variations & Follow-ups:**
*   **Sliding Window Minimum:** Identical logic, but maintain an *increasing* monotonic deque.
*   **Sliding Window Average/Sum:** Simpler, just need to maintain sum and update.
*   **Sliding Window Median:** Harder, typically uses two heaps (min-heap and max-heap) to maintain the median in O(log K) per operation.
*   **Sliding Window Frequency:** Find most frequent element in window. Requires a `HashMap` + possibly a `TreeMap` or another `Deque` to track frequency counts or orders.
*   **First Negative Number in Every Window:** A simpler sliding window problem that can be solved with a deque or even a queue of negative numbers.

---
```