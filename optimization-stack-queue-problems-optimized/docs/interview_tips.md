# Interview Tips and Variations for Stack & Queue Problems

This document provides general advice for tackling Stack and Queue problems in coding interviews, along with common variations and edge cases to consider for each specific problem covered in this project.

## General Interview Tips for Stack & Queue Problems

1.  **Understand the Core Properties:**
    *   **Stack (LIFO - Last-In, First-Out):** `push`, `pop`, `peek/top`, `empty`. Think of scenarios requiring reversal or nested structures.
    *   **Queue (FIFO - First-In, First-Out):** `enqueue/push`, `dequeue/pop`, `peek/front`, `empty`. Think of scenarios requiring ordered processing or BFS (Breadth-First Search).

2.  **Recognize Patterns:**
    *   **Reversal/Nesting:** If you need to process items in reverse order of their appearance or deal with nested structures (like parentheses, HTML tags), a stack is often the tool.
    *   **Order of Processing/BFS:** If you need to process items in the order they arrive, or explore layers in a graph/tree, a queue is typically used.
    *   **Monotonicity:** Problems involving "next greater/smaller element," "previous greater/smaller element," "daily temperatures," "sliding window maximum" often hint at a monotonic stack or deque.

3.  **Use Standard Library Containers:**
    *   In C++, `std::stack` and `std::queue` are adapter containers built on top of other sequence containers (like `std::deque` by default). `std::deque` itself is a highly versatile double-ended queue. Use them unless explicitly asked to implement your own.

4.  **Complexity Analysis is Crucial:**
    *   Always be prepared to discuss the time and space complexity of your solution. For stack/queue operations, individual `push`/`pop`/`top`/`empty` are typically O(1). Pay attention to loops that might involve these operations, and especially "amortized" complexity (like in Queue with Stacks).

5.  **Handle Edge Cases:**
    *   Empty input (empty string, empty array).
    *   Single element input.
    *   All elements same.
    *   All elements increasing/decreasing.
    *   Invalid inputs (e.g., mismatched parentheses).

6.  **"Walk Through" with Examples:**
    *   Before coding, walk through your algorithm with a small, representative example (and an edge case) on a whiteboard or scratchpad. This helps catch logic errors early.
    *   Trace the state of the stack/queue explicitly.

7.  **Communicate Your Thought Process:**
    *   State the problem in your own words.
    *   Discuss brute-force approaches and their complexity.
    *   Explain why a stack/queue is a good fit and how it improves complexity.
    *   Talk through your optimal solution step-by-step.
    *   Discuss edge cases.

---

## Problem-Specific Tips and Variations

### 1. Valid Parentheses

**Interview Tips:**
*   **Don't overthink:** This is a straightforward stack problem. The main challenge is correctly mapping opening to closing brackets.
*   **Use a map:** An `unordered_map` is very clean for mapping closing brackets to their corresponding opening ones.
*   **Empty string:** Is usually considered valid.
*   **String with only closing/opening brackets:** Should be invalid.

**Variations:**
*   **Longest Valid Parentheses:** Find the length of the longest valid substring of parentheses. (More complex, often uses DP or two-pass scan, sometimes stack-based approaches too).
*   **Remove Invalid Parentheses:** Given a string with invalid parentheses, remove the minimum number of invalid parentheses to make the input string valid. Return all possible results. (BFS + string manipulation).
*   **Balance Brackets:** Similar, but might involve other characters in the string that should be ignored.

**Edge Cases / Gotchas:**
*   **Empty string:** `""` should return `true`.
*   **String with only opening brackets:** `(((` should return `false`.
*   **String with only closing brackets:** `)))` should return `false`.
*   **Mismatched types:** `({)}` should return `false`.
*   **Mismatched order:** `([)]` should return `false`.

---

### 2. Implement Queue using Stacks

**Interview Tips:**
*   **Amortized O(1):** Clearly explain the amortized time complexity of `pop` and `peek`. This is a key insight. Each element is moved between stacks only twice (once from input to output, once from output when popped).
*   **Lazy transfer:** Only transfer elements from `inputStack` to `outputStack` when `outputStack` is empty. This prevents unnecessary transfers.
*   **Empty check:** Both stacks must be empty for the queue to be empty.
*   **Error handling:** What happens if `pop()` or `peek()` is called on an empty queue? (Throw an exception or return a sentinel value).

**Variations:**
*   **Implement Stack using Queues:** (Less common, but good to know). This is harder to achieve amortized O(1) for `pop`/`peek` with standard queues, usually resulting in O(N) operations.
    *   **One Queue Approach:** `push` is normal. `pop` involves `N-1` dequeues and enqueues to bring the last-pushed element to the front, then dequeue it.
    *   **Two Queue Approach:** `push` is normal. `pop` involves moving `N-1` elements from Q1 to Q2, then dequeueing the last element from Q1, then swapping Q1 and Q2.
*   **Design a Queue with O(1) `min()` operation:** Similar to "Min Stack," but for a queue. (Can use an auxiliary deque or another queue to track minimums).

**Edge Cases / Gotchas:**
*   Calling `pop()` or `peek()` on an empty queue.
*   Mixing `push` and `pop` operations extensively.
*   Performing many `push` operations followed by many `pop` operations, then more `push` operations. The amortized complexity explanation is vital here.

---

### 3. Daily Temperatures

**Interview Tips:**
*   **Monotonic Stack Pattern:** This is the most important concept. Recognize that you're looking for the "next greater element" to the right. A stack is perfect for this.
*   **Store Indices:** Don't store temperatures directly in the stack; store their *indices*. This allows you to easily calculate the distance (number of days) and access the original temperature value.
*   **Direction of Iteration:** Iterate from left to right. When `temperatures[i]` is greater than `temperatures[stack.top()]`, it means `stack.top()` has found its warmer day.

**Variations:**
*   **Next Greater Element I/II:** Find the next greater element for each element in an array (or in a circular array). This is the direct generalization.
*   **Previous Greater/Smaller Element:** Modify the iteration direction or comparison logic.
*   **Largest Rectangle in Histogram:** A more complex problem that uses a monotonic stack to find the boundaries of rectangles for calculating area.
*   **Trapping Rain Water:** Another advanced problem that can be solved with a monotonic stack (or two pointers).

**Edge Cases / Gotchas:**
*   **Empty array:** Should return an empty array.
*   **Single element array:** Should return `[0]`.
*   **Strictly increasing temperatures:** `[30, 40, 50, 60]` -> `[1, 1, 1, 0]`. Stack will always have one element.
*   **Strictly decreasing temperatures:** `[60, 50, 40, 30]` -> `[0, 0, 0, 0]`. Stack will grow to full size.
*   **Temperatures with no warmer day:** Their `answer` value should remain 0.

---

### 4. Sliding Window Maximum

**Interview Tips:**
*   **Deque for Monotonicity + Window:** A deque is crucial here because it allows O(1) operations at both ends, which is needed to maintain monotonicity *and* remove elements that fall out of the window.
*   **Store Indices, not Values:** Similar to Daily Temperatures, store indices to check if an element is still within the window.
*   **Monotonically Decreasing Deque:** Ensure elements in the deque (by their values in `nums`) are always in decreasing order from front to back. The front will always be the maximum.

**Variations:**
*   **Sliding Window Minimum:** Change the comparison in the deque from `>` to `<`.
*   **Sliding Window Average/Sum:** These usually don't need a deque; a simple running sum/count works (O(1) update).
*   **Sliding Window Median:** More complex, often uses two heaps (min-heap and max-heap) to maintain the median in O(logK) per window movement.
*   **Find all anagrams in a string / Permutation in String:** Uses a sliding window combined with a frequency map/array.

**Edge Cases / Gotchas:**
*   **Empty array or `k=0`:** The result should be an empty array.
*   **`k=1`:** Each element is its own maximum, so the result is the original array.
*   **`k` equals array size:** The result will be a single element array containing the maximum of the entire input array.
*   **All elements are same:** `[5, 5, 5, 5]`, `k=2` -> `[5, 5, 5]`.
*   **Strictly increasing/decreasing arrays:** Understand how the deque behaves in these cases. For increasing, it will mostly contain just the current element. For decreasing, it will hold many elements.
*   **Negative numbers:** The logic remains the same.
*   **Duplicate maximums:** The deque correctly handles duplicates by keeping the rightmost occurrence.