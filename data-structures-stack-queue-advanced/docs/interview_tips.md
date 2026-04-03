# Interview Tips and Variations for Stack and Queue Problems

This document provides strategies for approaching Stack and Queue interview questions, common pitfalls to avoid, and potential variations or follow-up questions you might encounter.

---

## General Interview Tips for Stack & Queue Problems

1.  **Understand the Core ADT:**
    *   **Stack (LIFO - Last In, First Out):** Operations: `push`, `pop`, `peek`/`top`, `isEmpty`, `size`. Think of plate stacks or browser history.
    *   **Queue (FIFO - First In, First Out):** Operations: `enqueue`/`push`, `dequeue`/`pop`, `peek`/`front`, `isEmpty`, `size`. Think of a line at a store or a printer queue.

2.  **When to Use Which?**
    *   **Stack:** Often used for problems involving:
        *   Reversal (string, linked list, etc.)
        *   Matching (parentheses, tags)
        *   Backtracking / DFS (explicit stack or recursion call stack)
        *   Maintaining state or order where the *most recent* item is relevant (e.g., Min Stack, monotonic stack).
    *   **Queue:** Often used for problems involving:
        *   Processing elements in the order they arrive (BFS, level-order traversal).
        *   Simulating real-world queues.
        *   Managing limited-size windows (sliding window problems, often with `deque`).
        *   Multi-source problems (like Rotten Oranges).

3.  **Python Specifics:**
    *   **Stack:** `list` can be used (`append` for push, `pop()` for pop). `collections.deque` is generally more efficient (`append`, `pop`).
    *   **Queue:** `collections.deque` is ideal (`append` for enqueue, `popleft()` for dequeue). A `list` is inefficient for queue operations as `pop(0)` is O(N).
    *   For interview purposes, explicitly stating you're using `deque` for efficiency is a good practice.

4.  **Think Through Examples:**
    *   Always walk through small examples, including base cases, edge cases, and typical cases. This helps clarify your logic and catch errors early.
    *   For stack: empty, single element, all pushes, all pops, alternating.
    *   For queue: empty, single element, all enqueues, all dequeues, alternating.

5.  **Complexity Analysis:**
    *   Always be prepared to state and justify the time and space complexity of your solution. This is a critical part of the interview.
    *   Remember amortized analysis for operations like `pop` in "Queue using Stacks" or `list.append()` in Python.

6.  **Visualize:**
    *   If struggling, draw out the stack/queue state on a whiteboard. Use arrows for push/pop. This is especially helpful for problems like Valid Parentheses or Sliding Window Maximum. (Our `algorithm_explanation.md` uses ASCII art for this!)

---

## Common Pitfalls and Gotchas

*   **Off-by-one errors:** Especially in sliding window problems when calculating indices or window boundaries.
*   **Empty stack/queue handling:** Always consider what happens if `pop()`, `peek()`, or `getMin()` is called on an empty structure. Your code should handle this gracefully (e.g., raise an error, return a sentinel, or rely on problem constraints).
*   **Modifying data structures during iteration:** Be careful when iterating over a list/queue and simultaneously adding/removing elements. Use appropriate techniques (e.g., separate a queue's current "level" in BFS, or use new data structures).
*   **Incorrect monotonic property:** For monotonic stacks/queues, ensure you are correctly maintaining the increasing/decreasing order and handling equality.
*   **Reversing order unintentionally:** `list.reverse()` or extending a list in reverse can be O(N). Be mindful of performance implications if you need to reverse a large collection.

---

## Interview Tips for Specific Problems

### 1. Valid Parentheses
*   **Initial thoughts:** This screams stack. Matching open/close implies LIFO.
*   **Mapping:** Use a dictionary for `close -> open` bracket mapping for clean code.
*   **Edge cases:** Empty string, string with only open/close brackets, mismatched types.

### 2. Min Stack
*   **The trick:** The "constant time" requirement for `getMin` is the key. A single stack won't do it unless you always keep sorted data, which breaks LIFO or O(1).
*   **Two stacks:** The most common and clearest solution. One for data, one for minimums.
*   **Tuple in one stack:** An alternative, but adds slight overhead per element.
*   **Equality for `push` and `pop` from `min_stack`:** If `val <= min_stack.top()` (not just `<`), you handle duplicate minimums correctly. If `pop_val == min_stack.top()`, you pop from `min_stack`.

### 3. Implement Queue using Stacks
*   **Amortized analysis:** Be ready to explain why `pop`/`peek` is O(1) amortized, not O(N) worst-case. The total work for N operations is O(N).
*   **Transfer logic:** The core logic is to transfer `in_stack` to `out_stack` *only when `out_stack` is empty*. This ensures FIFO order is maintained when elements are popped.

### 4. Sliding Window Maximum
*   **Monotonic deque:** This is an advanced technique. If you know it, it's impressive. If not, start with brute force (O(NK)) and discuss optimization.
*   **Store indices, not values:** Crucial for efficient window management (checking `d[0] == i-k`).
*   **Monotonic decreasing:** Elements from front to back of deque should be decreasing. When adding `nums[i]`, remove smaller/equal elements from back (`nums[d[-1]] <= nums[i]`).
*   **Visualize:** This problem often benefits most from tracing on paper.

### 5. Rotten Oranges
*   **Multi-source BFS:** Recognize that multiple rotten oranges spread simultaneously.
*   **Level-by-level processing:** Increment `minutes` after processing each *full level* of the BFS queue. This means `for _ in range(len(queue_at_start_of_minute)):`
*   **State modification:** Mark visited/rotted cells in the grid to avoid re-processing and correctly count fresh oranges.
*   **Unreachable oranges:** The final `fresh_oranges > 0` check is vital for the `-1` case.

---

## Variations and Follow-up Questions

**General:**
*   "What if the stack/queue had a fixed capacity?"
*   "How would you implement this using only arrays/linked lists?"
*   "Discuss tradeoffs if you chose a different data structure."
*   "Can this be solved recursively?" (Often for stack problems, less so for queues)

**Valid Parentheses:**
*   "Handle additional characters (e.g., letters, numbers)." (Ignore them or validate specific ones).
*   "What if there are different types of brackets, like `< >` or custom ones?" (Extend `bracket_map`).
*   "Return the index of the first invalid character."
*   "Find the longest valid parentheses substring." (Harder, often uses a stack and a pointer or dynamic programming).

**Min Stack:**
*   "Implement a `MaxStack` (similar logic)."
*   "Implement a stack that returns the minimum and maximum in O(1)." (Could use two aux stacks or a tuple of `(val, current_min, current_max)`).
*   "What if `pop()` on an empty stack is allowed and just does nothing?" (Adjust error handling).

**Implement Queue using Stacks:**
*   "Implement Stack using Queues." (Harder than queue using stacks, requires more complex operations or O(N) for push/pop).
*   "Implement a `Deque` using stacks." (Very complex).

**Sliding Window Maximum:**
*   "Find the *minimum* in a sliding window." (Monotonic *increasing* deque).
*   "Find the sum of elements in a sliding window." (Simple two-pointer approach, no deque needed).
*   "Find the count of distinct elements in a sliding window."
*   "Find the average/median in a sliding window." (Often involves a data structure like a balanced BST or two heaps, harder).
*   "What if `k` is very large, approaching `N`? What if `k=1`?" (Discuss performance for extremes).

**Rotten Oranges:**
*   "What if oranges can rot diagonally?" (Add 4 more directions to `directions` array).
*   "Return the grid after a certain number of minutes `T`."
*   "What if there are multiple types of fruit, and some only rot from a specific type?" (More complex state in BFS).
*   "Find the cell that rots last." (Keep track of the last dequeued item or its distance).
*   "What if the grid is enormous, how would you handle memory?" (Consider disk-based or streaming approaches, more systems design).

By understanding these concepts, practicing the problems, and thinking about variations, you'll be well-prepared for Stack and Queue questions in coding interviews. Good luck!