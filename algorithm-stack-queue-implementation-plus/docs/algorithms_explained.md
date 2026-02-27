```markdown
# Algorithm Explanations: Stack and Queue Problems

This document provides detailed explanations of the algorithms used to solve the problems in this project. It covers the logic, time/space complexity, and discusses alternative approaches where relevant.

---

## P1: Valid Parentheses

**Problem:** Given a string `s` containing only '(', ')', '{', '}', '[', ']', determine if it's valid. Valid means open brackets are closed by the same type of brackets in the correct order.

### Optimal Approach: Using a Stack

**Logic:**
The problem naturally follows a Last-In, First-Out (LIFO) pattern: the most recently opened bracket must be the first one closed. This is a classic indicator for a stack.

1.  **Map Bracket Pairs:** Create a map (or hash table) where keys are closing brackets and values are their corresponding opening brackets (e.g., `')' -> '('`).
2.  **Initialize Stack:** Use an empty stack to keep track of open brackets.
3.  **Iterate Through String:**
    *   If the current character is an **opening bracket** (`(`, `{`, `[`), push it onto the stack.
    *   If the current character is a **closing bracket** (`)`, `}`, `]`):
        *   Check if the stack is empty. If it is, there's no matching opening bracket, so the string is invalid. Return `false`.
        *   Pop the top element from the stack.
        *   Compare the popped element with the expected opening bracket for the current closing bracket (using the map). If they don't match, the brackets are mismatched, so the string is invalid. Return `false`.
4.  **Final Check:** After iterating through the entire string, if the stack is empty, it means all opening brackets have been correctly matched and closed. The string is valid. Return `true`. If the stack is not empty, there are unclosed opening brackets, making the string invalid. Return `false`.

**Time Complexity:** O(N), where N is the length of the input string. We iterate through the string once, and each stack operation (push, pop, peek, isEmpty) and map lookup is O(1) on average.

**Space Complexity:** O(N), where N is the length of the input string. In the worst case (e.g., `((((()))))`), the stack could store up to N/2 opening brackets.

**Alternative Approaches:**
*   **Native Array as Stack:** Using a JavaScript array with `push()` and `pop()` directly acts as a stack and has the same performance characteristics. This is shown in `isValidParenthesesNativeArray`.
*   **Brute Force / Exhaustive Search:** This problem is not well-suited for a brute-force approach. A true brute-force would involve trying all possible pairings or recursive checks, which would be extremely inefficient (likely exponential) and wouldn't correctly leverage the structural properties of parentheses. The stack-based solution is already optimal.

---

## P2: Min Stack

**Problem:** Design a stack that supports `push`, `pop`, `top`, and `getMin` all in O(1) time. `getMin` should return the minimum element currently in the stack.

### Optimal Approach 1: Single Stack with Pair Objects

**Logic:**
The key challenge is `getMin()` in O(1). A naive approach of iterating the stack to find the minimum for `getMin()` is O(N). To achieve O(1), we need to store the minimum state alongside the elements.

This approach modifies what each stack element stores. Instead of just storing the value, each element is an object containing two properties:
1.  `value`: The actual number being pushed.
2.  `min`: The minimum value found in the stack *from the bottom up to and including this element*.

**Algorithm:**
1.  **`constructor()`:** Initialize an empty array `stack` (to act as the primary stack).
2.  **`push(val)`:**
    *   If the stack is empty, the current `val` is also the minimum up to this point. Push `{ value: val, min: val }`.
    *   If the stack is not empty, the minimum `min` for the new element will be `Math.min(val, stack[stack.length - 1].min)`. Push `{ value: val, min: new_min }`.
3.  **`pop()`:** Simply remove the last element from the `stack` array.
4.  **`top()`:** Return `stack[stack.length - 1].value`.
5.  **`getMin()`:** Return `stack[stack.length - 1].min`.

**Time Complexity:** O(1) for all operations. Each operation involves a constant number of array accesses, pushes, or pops.

**Space Complexity:** O(N), where N is the number of elements in the stack. Each element stores two numbers, effectively doubling the storage compared to a normal stack but still linear with respect to N. This is generally the most space-efficient way to achieve O(1) for all operations.

### Optimal Approach 2: Two Stacks

**Logic:**
This approach uses two separate stacks:
1.  `mainStack`: Stores all the actual values pushed onto the stack. Behaves like a normal stack.
2.  `minTrackerStack`: This auxiliary stack only stores values that are current or new minimums.

**Algorithm:**
1.  **`constructor()`:** Initialize `mainStack` and `minTrackerStack` as empty arrays.
2.  **`push(val)`:**
    *   Push `val` onto `mainStack`.
    *   If `minTrackerStack` is empty OR `val` is less than or equal to `minTrackerStack.peek()` (current minimum), push `val` onto `minTrackerStack`. (The "equal to" part is important to handle duplicate minimums correctly, so that when one duplicate is popped, the other remains the minimum until it's also popped).
3.  **`pop()`:**
    *   Pop the element from `mainStack`.
    *   If the popped element is equal to `minTrackerStack.peek()`, then also pop from `minTrackerStack`.
4.  **`top()`:** Return `mainStack.peek()`.
5.  **`getMin()`:** Return `minTrackerStack.peek()`.

**Time Complexity:** O(1) for all operations. Each operation involves a constant number of array accesses, pushes, or pops on two arrays.

**Space Complexity:** O(N) in the worst case. `mainStack` always stores N elements. `minTrackerStack` can store up to N elements if the pushed values are in strictly decreasing order (e.g., `[5, 4, 3, 2, 1]`). If values are pushed in increasing order, `minTrackerStack` might only store one element. Average case is often less than N.

**Comparison of Optimal Approaches:**
*   Both are O(1) time for all operations.
*   **Single Stack with Pairs** is generally slightly more space-efficient because it avoids the overhead of a separate array object for `minTrackerStack`, although both are O(N). It also implicitly handles duplicates correctly without special `if` conditions during `pop`.
*   **Two Stacks** can be slightly easier to reason about initially for some, as `mainStack` is "just a stack".

**Brute Force (for context):**
A naive approach would be to only store values in a single stack. `push`, `pop`, `top` would be O(1). However, `getMin()` would require iterating through the entire stack to find the minimum, making it O(N). This fails the O(1) requirement.

---

## P3: Implement Queue using Stacks

**Problem:** Implement a FIFO queue using only two LIFO stacks. All operations (`push`, `pop`, `peek`, `empty`) should have amortized O(1) time complexity.

### Optimal Approach: Two Stacks with Lazy Transfer

**Logic:**
The core idea is to use two stacks: one for `input` and one for `output`.
*   `inputStack`: When `push(x)` is called, `x` is simply pushed onto `inputStack`. This stack accumulates elements in the reverse order of how they should be dequeued (LIFO order).
*   `outputStack`: When `pop()` or `peek()` is called, we need the front element (FIFO order). If `outputStack` is not empty, its top element is the correct front element. If `outputStack` *is* empty, it means we need to reverse `inputStack` to get elements in the correct order. We do this by popping all elements from `inputStack` and pushing them onto `outputStack`. After this transfer, `outputStack` will have the oldest elements at its top.

**Algorithm:**
1.  **`constructor()`:** Initialize `inputStack` and `outputStack` as empty stacks.
2.  **`push(x)`:**
    *   Push `x` onto `inputStack`.
    *   Time Complexity: O(1)
3.  **`pop()`:**
    *   Call a helper function, `transferElements()`, to ensure `outputStack` has elements ready.
    *   Pop and return the top element from `outputStack`.
    *   Time Complexity: Amortized O(1). (See Amortized Analysis below).
4.  **`peek()`:**
    *   Call `transferElements()` to ensure `outputStack` has elements ready.
    *   Return the top element from `outputStack` without removing it.
    *   Time Complexity: Amortized O(1).
5.  **`empty()`:**
    *   Return `true` if `inputStack` is empty AND `outputStack` is empty, otherwise `false`.
    *   Time Complexity: O(1)

**Helper: `transferElements()` (or `_moveElements`)**
*   This function only executes if `outputStack` is empty.
*   It repeatedly pops elements from `inputStack` and pushes them onto `outputStack` until `inputStack` is empty.

**Amortized Analysis:**
While a single `pop()` or `peek()` operation (when `outputStack` is empty) can take O(N) time (where N is the current size of `inputStack`) due to the `transferElements` operation, this O(N) cost is distributed over N `push` operations.
Each element is pushed onto `inputStack` once and then, at most once, moved from `inputStack` to `outputStack`, and then popped from `outputStack` once. The total cost for `N` operations is proportional to `N` (N pushes + N pops from input + N pushes to output + N pops from output). Therefore, the average (amortized) cost per operation is O(1).

**Space Complexity:** O(N), where N is the total number of elements in the queue. All elements are stored across the two stacks.

**Alternative Approaches:**
A less optimal (and not amortized O(1)) approach would be to transfer elements on *every* `pop` or `peek` call, even if `outputStack` is not empty. This would lead to repeated transfers of the same elements, resulting in O(N) worst-case time for *each* `pop`/`peek`, making total operations O(N^2) for a sequence of N pushes followed by N pops. The "lazy transfer" approach of only transferring when `outputStack` is empty is crucial for amortized O(1).

---

## P4: Walls and Gates (BFS)

**Problem:** Fill empty rooms (represented by `INF`) in a 2D grid with the distance to their nearest gate (`0`). Walls (`-1`) are impassable.

### Optimal Approach: Multi-Source Breadth-First Search (BFS)

**Logic:**
This problem is a shortest-path problem in an unweighted graph (where each step has a cost of 1). BFS is ideal for this. Instead of starting a BFS from each `INF` room to find the nearest gate (which would be `O((M*N)^2)`), we reverse the perspective. We want to find the distance *from* the gates *to* all `INF` rooms.

This is a classic "Multi-Source BFS" problem. We start BFS from *all* gates simultaneously.

**Algorithm:**
1.  **Initialization:**
    *   Create an empty queue.
    *   Iterate through the entire `grid`. For every cell `(r, c)` that is a `0` (a gate), add its coordinates `[r, c]` to the queue. These are our starting points.
2.  **BFS Traversal:**
    *   While the queue is not empty:
        *   Dequeue a cell `[r, c]`. Its value `grid[r][c]` represents the distance from a gate to this cell.
        *   Consider its four neighbors (up, down, left, right). For each neighbor `(nr, nc)`:
            *   **Boundary Check:** Ensure `(nr, nc)` is within grid boundaries.
            *   **Obstacle/Gate Check:** If `grid[nr][nc]` is a wall (`-1`) or another gate (`0`), ignore it.
            *   **Visited/Distance Check:** If `grid[nr][nc]` is *not* `INF`, it means this room has already been reached by a gate via an equal or shorter path. We only want to update `INF` rooms. So, if `grid[nr][nc]` is `INF`:
                *   Update `grid[nr][nc] = grid[r][c] + 1`. This is the distance to the nearest gate from this neighbor.
                *   Enqueue `[nr, nc]` to explore its neighbors.

**Why this works for shortest path:**
BFS naturally explores layer by layer. When an `INF` room is visited for the *first time* during this multi-source BFS, the distance `grid[r][c] + 1` is guaranteed to be the shortest possible distance from *any* gate, because BFS explores all distance `d` rooms before any distance `d+1` rooms.

**Time Complexity:** O(M * N), where M is the number of rows and N is the number of columns in the grid. Each cell is added to the queue and processed at most once.

**Space Complexity:** O(M * N) in the worst case. The queue could potentially hold all cells in the grid (e.g., if all cells are empty rooms reachable from a single gate, or if all cells are gates initially).

**Brute Force (for context):**
A brute-force approach would be to iterate through every cell in the grid. If a cell is an `INF` room, perform a *separate* BFS starting from that `INF` room to find the *nearest gate*. This would take `O(M*N)` time for each `INF` cell, leading to a total time complexity of `O((M*N)^2)`. For a 250x250 grid, this is `(62500)^2` operations, which is far too slow (`~3.9 * 10^9`). The multi-source BFS is significantly more efficient.

---

## P5: Sliding Window Maximum

**Problem:** Given an array `nums` and a window size `k`, return an array of the maximum value in each sliding window.

### Optimal Approach: Using a Deque (Double-Ended Queue)

**Logic:**
The challenge is to find the maximum in a window in O(1) time (amortized) as the window slides. A naive approach (iterating `k` elements for each window) would be O(N*K). A Deque is perfect here because it allows efficient addition/removal from both ends.

The Deque will store `indices` of elements from `nums`. The invariant we maintain in the Deque is that elements corresponding to these indices are in **decreasing order** from front to back.
*   The front of the Deque (`deque.peekFront()`) will always hold the index of the largest element in the *current* window.

**Algorithm:**
1.  **Initialization:**
    *   Initialize an empty Deque (e.g., `Deque<number>`) to store indices.
    *   Initialize an empty array `results` to store the maximums of each window.
2.  **Iterate `i` from `0` to `N-1` (where `N` is `nums.length`):**
    a.  **Remove Old Indices from Front:**
        *   If the Deque is not empty AND `deque.peekFront()` is an index that is now *outside* the current window (i.e., `deque.peekFront() <= i - k`), remove it from the front of the Deque (`deque.removeFront()`).
    b.  **Remove Smaller Elements from Back:**
        *   While the Deque is not empty AND `nums[deque.peekBack()] <= nums[i]` (the element at the back of the deque is smaller than or equal to the current element `nums[i]`):
            *   Remove from the back (`deque.removeBack()`). These smaller elements are no longer candidates for the maximum because `nums[i]` is greater and appears later in the window.
    c.  **Add Current Index to Back:**
        *   Add the current index `i` to the back of the Deque (`deque.addBack(i)`).
    d.  **Record Maximum (when window is formed):**
        *   If `i >= k - 1` (meaning the window has fully formed and `k` elements are available for the first time):
            *   The maximum for the current window is `nums[deque.peekFront()]`. Add this value to `results`.
3.  **Return `results`.**

**Time Complexity:** O(N), where N is the length of `nums`. Each element's index is pushed onto the Deque at most once and popped from the Deque at most once. All Deque operations are amortized O(1).

**Space Complexity:** O(K), where K is the window size. In the worst case (e.g., a strictly decreasing array like `[5,4,3,2,1]`), the Deque could store up to `k` elements/indices.

### Alternative Approach 1: Brute Force

**Logic:**
This is the most straightforward but least efficient approach. It directly simulates the sliding window.

**Algorithm:**
1.  Iterate `i` from `0` to `N - K` (representing the start of each window).
2.  For each `i`, find the maximum value in the subarray `nums[i]` to `nums[i + K - 1]`.
3.  Store this maximum in the `results` array.

**Time Complexity:** O(N * K). There are `N - K + 1` windows, and for each window, we iterate `K` elements to find the maximum. In the worst case (K approaches N), this becomes O(N^2). This is too slow for large N (e.g., `N = 10^5`).

**Space Complexity:** O(N) for the `results` array.

### Alternative Approach 2: Two Passes (Dynamic Programming-like)

**Logic:**
This is a clever O(N) approach that is less intuitive than the Deque method. It uses dynamic programming to precompute left and right maximums for blocks of size `k`.

1.  **`left` array:** `left[i]` stores the maximum value in the block `nums[j...i]`, where `j` is the start of the current `k`-sized block.
    *   `left[i] = nums[i]` if `i % k == 0` (new block start).
    *   `left[i] = max(left[i-1], nums[i])` otherwise.
2.  **`right` array:** `right[i]` stores the maximum value in the block `nums[i...j]`, where `j` is the end of the current `k`-sized block.
    *   `right[i] = nums[i]` if `(i + 1) % k == 0` or `i == N - 1` (new block end or last element).
    *   `right[i] = max(right[i+1], nums[i])` otherwise.
3.  **Combine for Results:** For each window `[i, i + k - 1]`, the maximum is `max(right[i], left[i + k - 1])`.
    *   `right[i]` gives the maximum from the current window's start up to the end of its block.
    *   `left[i + k - 1]` gives the maximum from the start of the window's block up to the current window's end.
    *   Combining these ensures we cover the maximum within the entire sliding window.

**Time Complexity:** O(N). Three passes over the array (two for `left`/`right`, one for `results`).

**Space Complexity:** O(N) for `left`, `right`, and `results` arrays.

**Comparison:**
While both Deque and Two Passes are O(N), the Deque approach is generally considered more straightforward to understand and implement in an interview setting for this problem. The Two Passes approach is a good example of how DP can be applied to achieve optimal performance but is less direct.
```