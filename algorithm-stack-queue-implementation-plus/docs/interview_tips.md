```markdown
# Interview Tips for Stack and Queue Problems

This document provides general tips, common patterns, edge cases, and variations to consider when tackling Stack and Queue problems in coding interviews.

---

## General Advice

1.  **Understand the Core Properties:**
    *   **Stack (LIFO - Last-In, First-Out):** Think of a stack of plates. The last plate you put on is the first one you take off. Operations: `push`, `pop`, `peek`, `isEmpty`, `size`.
    *   **Queue (FIFO - First-In, First-Out):** Think of a line at a store. The first person in line is the first one served. Operations: `enqueue` (or `add`), `dequeue` (or `remove`), `peek`, `isEmpty`, `size`.
    *   **Deque (Double-Ended Queue):** Combines features of both. Operations at both ends: `addFront`, `addBack`, `removeFront`, `removeBack`, `peekFront`, `peekBack`.

2.  **When to Use Which?**
    *   **Stack:**
        *   Reversing order (e.g., reversing a string, undo/redo).
        *   Matching pairs/nesting (e.g., parentheses, HTML tags).
        *   Tracking states that need to be returned to in reverse order (e.g., DFS traversal, function call stack).
        *   Evaluating expressions (e.g., postfix, infix to postfix).
        *   Monotonic stacks (for next greater/smaller element type problems).
    *   **Queue:**
        *   Processing items in the order they arrive (e.g., task scheduling, print queues).
        *   Breadth-First Search (BFS) for graphs or trees.
        *   Level-order traversal of trees.
        *   Caching/buffering systems.
        *   Simulations.
    *   **Deque:**
        *   Sliding window problems (e.g., sliding window maximum/minimum).
        *   Implementing both stack and queue behavior with a single data structure.
        *   Specific graph algorithms (e.g., 0-1 BFS).

3.  **Draw Diagrams:** Especially for stack/queue problems, drawing out the data structure's state changes on a whiteboard (or mentally) with each operation can prevent mistakes and clarify your logic. Use ASCII art or simple boxes.

4.  **Talk Through Your Thoughts:** Explain your thought process.
    *   "This feels like a LIFO problem because..."
    *   "If I push this, what happens? If I pop, what happens?"
    *   "What's the state of the stack/queue after these operations?"

---

## Common Patterns & Techniques

1.  **Parentheses/Bracket Matching (P1):**
    *   **Pattern:** Use a stack to store opening brackets. When a closing bracket appears, pop from the stack and check for a match.
    *   **Key Idea:** The matching opening bracket must be the *most recently seen* unmatched opening bracket.

2.  **Min/Max Stack/Queue (P2, P5):**
    *   **Pattern:** To support `getMin`/`getMax` in O(1) alongside standard operations, you usually need *additional storage* that also updates in O(1).
    *   **Techniques:**
        *   **Auxiliary Stack/Deque:** Maintain a second stack/deque that stores minimums/maximums. When pushing, only add to the auxiliary if the new element is `min <= current_min` (for `MinStack`) or `max >= current_max` (for `MaxStack`). When popping, if the element being removed is the current min/max, also pop from the auxiliary. (Seen in P2, P5)
        *   **Store Pairs:** Each element in the main stack/queue stores not just its value, but also the min/max *up to that point* in the data structure. (Seen in P2)

3.  **Implementing One DS with Another (P3):**
    *   **Pattern:** Simulate Queue with Stacks, or Stack with Queues.
    *   **Key Idea for Queue with Stacks (P3):** Use two stacks: one for `input` and one for `output`. Elements are pushed to `input`. When `pop`/`peek` is called, if `output` is empty, transfer all elements from `input` to `output`. This reverse-reverses the order, making it FIFO. Crucial for amortized O(1): only transfer when `output` is empty.
    *   **Key Idea for Stack with Queues:** More complex, often requires two queues and transferring elements to maintain LIFO property on `top`/`pop`.

4.  **BFS (Breadth-First Search) for Shortest Path on Unweighted Graphs (P4):**
    *   **Pattern:** Used for finding the shortest path in terms of number of edges (or steps) in an unweighted graph. It explores all neighbors at distance `d` before moving to neighbors at distance `d+1`.
    *   **Key Idea:** Use a queue to store nodes to visit. Start with source nodes, then add their unvisited neighbors, and so on. Mark visited nodes to avoid cycles and redundant processing.
    *   **Multi-Source BFS (P4):** Start BFS from *all* initial source nodes simultaneously (e.g., all gates in Walls and Gates). This is efficient because each node is visited only once.

5.  **Monotonic Stack/Deque (P5):**
    *   **Pattern:** The Deque in Sliding Window Maximum is an example of a monotonic deque. Elements are added such that a specific order (e.g., strictly increasing or decreasing) is maintained.
    *   **Key Idea:** When adding a new element, remove existing elements from one end that violate the monotonic property. This keeps the desired element (max/min/next greater) efficiently accessible at one end.

---

## Edge Cases and Gotchas

1.  **Empty Inputs:**
    *   Empty string for `Valid Parentheses` (usually `true`).
    *   Empty stack/queue when `pop()` or `peek()` is called (should return `undefined` or throw error, depending on problem spec).
    *   Empty array for sliding window problems.

2.  **Single Element/Smallest Possible Inputs:**
    *   `"()"` for `Valid Parentheses`.
    *   A stack with one element for `MinStack`.
    *   A queue with one element for `Queue using Stacks`.
    *   A grid of `1x1` for `Walls and Gates`.
    *   `k=1` for `Sliding Window Maximum`.

3.  **All Same Elements / All Different Elements:**
    *   `"((()))"` vs `"([{}])"`
    *   `[5,5,5,5]` vs `[1,2,3,4]` vs `[4,3,2,1]`
    *   These test the logic of handling duplicates and monotonic sequences.

4.  **Constraints:**
    *   What are the max length/size? This dictates if an O(N^2) or O(N log N) solution is acceptable over O(N).
    *   Are numbers positive/negative? Integers/floats? Range?
    *   Are `pop`/`peek`/`getMin` guaranteed to be called on non-empty structures? This affects error handling.

5.  **Off-by-one Errors:**
    *   Window start/end indices (`i - k + 1` to `i`).
    *   Array boundaries (`0` to `length - 1`).
    *   Loop conditions (`<` vs `<=`).

6.  **Amortized vs. Worst-Case:**
    *   Understand the difference, especially for problems like "Implement Queue using Stacks". Explain why an O(N) operation becomes O(1) *amortized* over many operations.

7.  **Immutability vs. In-place:**
    *   Does the problem require modifying the input grid in-place (`Walls and Gates`) or returning a new data structure?

---

## Interview Tips Specific to Communication

1.  **Clarify the Problem:** Don't hesitate to ask clarifying questions about constraints, edge cases, input/output formats.
2.  **Start with Brute Force (if applicable):** Even if you know the optimal, briefly describe a naive solution. This shows you understand the problem, sets a baseline, and allows you to contrast your optimal solution.
3.  **Explain Your Data Structure Choice:** "I'm choosing a stack here because the problem has a LIFO property, where the last item pushed needs to be processed first..."
4.  **Walk Through an Example:** Use a small, representative example (like the ones in `diagrams.md`) to trace your algorithm step-by-step.
5.  **Analyze Complexity:** Always provide time and space complexity analysis. Justify your reasoning.
6.  **Consider Follow-ups/Variations:**
    *   "What if the input could contain other characters?"
    *   "What if `k` could be larger than `N` for sliding window?"
    *   "How would I implement `MinQueue`?" (Queue with `getMin()` in O(1)) - This often involves a similar dual-queue/deque strategy as `MinStack`.
    *   "What if the grid had weighted edges?" (Dijkstra's or A* instead of BFS).
    *   "What if there were `popMiddle` for a custom DS?" (Linked list or tree structures).

By being thorough in these areas, you demonstrate not just coding ability, but also strong problem-solving skills, communication, and a deep understanding of data structures.
```