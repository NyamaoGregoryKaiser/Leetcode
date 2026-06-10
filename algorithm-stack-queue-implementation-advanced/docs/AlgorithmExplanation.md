```markdown
# Algorithm Explanation Document

This document provides detailed explanations for the algorithms implemented in the Stack and Queue Interview Project. For each problem, we cover the core idea, chosen solution approach, step-by-step logic, time and space complexity, and discuss alternative methods where applicable.

## Table of Contents

1.  [Min Stack](#1-min-stack)
2.  [Implement Queue using Stacks](#2-implement-queue-using-stacks)
3.  [Number of Recent Calls](#3-number-of-recent-calls)
4.  [Valid Parentheses](#4-valid-parentheses)
5.  [Walls and Gates](#5-walls-and-gates)
6.  [Daily Temperatures](#6-daily-temperatures)
7.  [Number of Islands](#7-number-of-islands)

---

## 1. Min Stack

**Problem:** Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time.

**Core Idea:**
A standard stack (LIFO) allows `push`, `pop`, `top` in O(1). The challenge is `getMin` in O(1). A naive approach of iterating through the stack to find the minimum would be O(N). To achieve O(1), we need to store information about the current minimum efficiently.

**Chosen Solution: Two Stacks Approach**
We use two `java.util.Stack` objects:
1.  `mainStack`: Stores all elements pushed onto the stack.
2.  `minStack`: Stores the minimum element encountered *so far* at each corresponding state of the `mainStack`.

**Step-by-step Logic:**

*   **`MinStack()` constructor:** Initializes both `mainStack` and `minStack` as empty.
*   **`push(int val)`:**
    *   Always push `val` onto `mainStack`.
    *   For `minStack`:
        *   If `minStack` is empty, or `val` is less than or equal to `minStack.peek()`, push `val` onto `minStack`.
        *   The "less than or equal to" condition is crucial: if `val` is equal to the current minimum, we still push it. This ensures that when this `val` is eventually popped from `mainStack`, its corresponding minimum can also be popped from `minStack` without losing track of the *previous* minimum if one existed before the duplicate.
*   **`pop()`:**
    *   Pop the top element from `mainStack`. Let this be `poppedValue`.
    *   If `poppedValue` is equal to `minStack.peek()`, then `poppedValue` was one of the current minimums. In this case, pop from `minStack` as well to reflect the new minimum.
*   **`top()`:** Returns `mainStack.peek()`.
*   **`getMin()`:** Returns `minStack.peek()`.

**Time Complexity:**
*   `MinStack()`: O(1)
*   `push(val)`: O(1) (all stack operations are constant time)
*   `pop()`: O(1) (all stack operations are constant time)
*   `top()`: O(1)
*   `getMin()`: O(1)

**Space Complexity:**
*   O(N) in the worst case, where N is the number of elements in the stack. This happens if elements are pushed in strictly decreasing order (e.g., 5, 4, 3, 2, 1), in which case `minStack` will grow to the same size as `mainStack`.
*   In the best case (e.g., elements pushed in strictly increasing order 1, 2, 3, 4, 5), `minStack` would only store the first element (O(1) space).

**Edge Cases & Gotchas:**
*   **Empty stack operations:** `pop`, `top`, `getMin` should ideally throw an `IllegalStateException` or similar if called on an empty stack. `java.util.Stack` naturally throws `EmptyStackException`.
*   **Duplicate minimums:** Handled correctly by pushing equal values onto `minStack`. This ensures the previous minimum is preserved if a duplicate minimum is popped.

**Alternative Approaches:**
1.  **Single Stack with Pairs:** Store `(value, current_min)` pairs in a single stack. When pushing `val`, the `current_min` for `val` is `min(val, stack.peek().current_min)`. This simplifies logic but each stack element consumes twice the memory.
2.  **Single Stack with Optimized Min Tracking:** Store `value` in the main stack. When a new minimum `x` comes along, push the previous minimum `min` onto the stack *before* pushing `x`. Update `min = x`. This is more complex to implement correctly during `pop` operations, as you need to differentiate between a regular value and a stored previous minimum. Generally, the two-stack approach is preferred for its clarity and robustness in interviews unless strict memory constraints require this more complex solution.

---

## 2. Implement Queue using Stacks

**Problem:** Implement a FIFO queue using only two stacks. Support `push`, `pop`, `peek`, `empty`.

**Core Idea:**
Stacks are LIFO, queues are FIFO. To simulate FIFO using LIFO, we need to reverse the order of elements. Two stacks allow us to achieve this reversal.

**Chosen Solution: Two Stacks (Input/Output Stacks)**
We use two `java.util.Stack` objects:
1.  `s1` (Input Stack): Used for `push` operations. New elements are always added here.
2.  `s2` (Output Stack): Used for `pop` and `peek` operations. Elements are moved here from `s1` when needed.

**Step-by-step Logic:**

*   **`QueueUsingStacks()` constructor:** Initializes both `s1` and `s2` as empty.
*   **`push(int x)`:**
    *   Simply push `x` onto `s1`. This is always O(1).
*   **`pop()`:**
    *   First, call a helper method `shiftElements()` to ensure `s2` is ready.
    *   If `s2` is still empty (meaning the queue is empty), throw an exception.
    *   Otherwise, pop and return the top element from `s2`.
*   **`peek()`:**
    *   First, call `shiftElements()` to ensure `s2` is ready.
    *   If `s2` is still empty (meaning the queue is empty), throw an exception.
    *   Otherwise, peek and return the top element from `s2`.
*   **`empty()`:** Returns `s1.isEmpty() && s2.isEmpty()`.
*   **`shiftElements()` (Helper Method):**
    *   This method is called by `pop()` and `peek()` *only if `s2` is empty*.
    *   While `s1` is not empty, pop elements from `s1` and push them onto `s2`.
    *   This effectively reverses the order of elements from `s1` into `s2`. The first element pushed into `s1` will be the last to be popped from `s1` and thus the first to be pushed onto `s2`, making it the `peek`/`pop` candidate.

**Time Complexity:**
*   `QueueUsingStacks()`: O(1)
*   `push(x)`: O(1)
*   `pop()`: Amortized O(1). In the worst case (e.g., `s2` is empty and `s1` has N elements), N elements are moved from `s1` to `s2`. However, each element is moved at most once from `s1` to `s2` over its lifetime. So, for a sequence of N operations, the total cost for moving elements is O(N), leading to an average of O(1) per operation.
*   `peek()`: Amortized O(1) (same reasoning as `pop`).
*   `empty()`: O(1)

**Space Complexity:**
*   O(N) where N is the total number of elements in the queue, as elements are distributed between `s1` and `s2`.

**Edge Cases & Gotchas:**
*   **Empty queue operations:** `pop` and `peek` on an empty queue should throw an exception.
*   **Interleaving pushes and pops:** The amortized analysis holds. If you push many items, then pop many items, then push more, the mechanism correctly handles the transfers.

**Alternative Approaches:**
1.  **Always transfer on Push:** Instead of transferring elements from `s1` to `s2` on demand (during `pop`/`peek`), you could always transfer elements back and forth on every `push`. When `push(x)` is called:
    *   Move all elements from `s2` to `s1`.
    *   Push `x` onto `s1`.
    *   Move all elements from `s1` back to `s2`.
    *   This makes `push` O(N) but `pop` and `peek` become O(1) guaranteed (not amortized). However, for many use cases, `push` operations are more frequent, making this less efficient overall. The amortized O(1) approach is generally preferred.

---

## 3. Number of Recent Calls

**Problem:** Design a `RecentCounter` class. `ping(t)` adds request at time `t` and returns count of requests in `[t - 3000, t]`. `t` is strictly increasing.

**Core Idea:**
This is a classic "sliding window" problem. Since timestamps are strictly increasing, requests naturally form an ordered sequence. We need to efficiently add new requests and remove old, outdated requests from the window.

**Chosen Solution: Queue (Sliding Window)**
A `java.util.Queue` (specifically `LinkedList` in Java, which implements `Deque` and `Queue`) is ideal for this. It allows O(1) addition to the tail (`offer`) and O(1) removal from the head (`poll`).

**Step-by-step Logic:**

*   **`RecentCounter()` constructor:** Initializes an empty `LinkedList` to act as the queue `requests`.
*   **`ping(int t)`:**
    1.  **Add current request:** `requests.offer(t)`. The new timestamp is added to the end of the queue.
    2.  **Remove outdated requests:** Since `t` is strictly increasing, any request at the front of the queue (`requests.peek()`) that is older than `t - 3000` is outside the current window `[t - 3000, t]`. We repeatedly `poll()` (remove from front) these outdated requests.
        ```java
        while (!requests.isEmpty() && requests.peek() < t - 3000) {
            requests.poll();
        }
        ```
    3.  **Count remaining requests:** After removing all outdated requests, all remaining requests in the queue are within the `[t - 3000, t]` window. Return `requests.size()`.

**Time Complexity:**
*   `RecentCounter()`: O(1)
*   `ping(t)`: Amortized O(1).
    *   Each `offer` is O(1).
    *   The `while` loop with `poll` operations might seem like O(N) in the worst case (e.g., a huge gap in `t` values causing many elements to be removed). However, each request (timestamp) is added to the queue once and removed from the queue once over its entire lifetime. Therefore, over a sequence of N `ping` calls, the total number of `offer` and `poll` operations is O(N), leading to an amortized O(1) per `ping` call.

**Space Complexity:**
*   O(W) where W is the maximum number of requests that can be held within the 3000ms window. If requests come in very rapidly, the queue can store many elements. In the worst case (e.g., all `N` requests happen within the window), it can be O(N).

**Edge Cases & Gotchas:**
*   **Empty queue:** The `while` loop's `!requests.isEmpty()` check handles this.
*   **Window boundary:** The condition `requests.peek() < t - 3000` correctly removes elements strictly outside the lower bound. Elements exactly at `t - 3000` are included.

**Alternative Approaches:**
1.  **Sorted List/Array and Binary Search:** If `t` was not strictly increasing, or if frequent arbitrary range queries were needed, one might consider a `List` of timestamps and use binary search (`Collections.binarySearch`) to find the start of the `[t - 3000, t]` range. However, inserting into a sorted list is O(N), and removing elements efficiently is also an issue, making it less suitable for this specific problem.
2.  **`TreeMap`:** Could map timestamps to counts. Using `subMap(t - 3000, true, t, true)` would give the relevant range. But `ping` would involve `put` (O(logN)) and potentially iterating the submap, which is less efficient than the queue's amortized O(1).

---

## 4. Valid Parentheses

**Problem:** Given a string of parentheses `()[]{}` determine if it's valid (matched and correctly ordered).

**Core Idea:**
Parentheses matching is inherently a LIFO (Last-In, First-Out) problem. The most recently opened bracket must be the first one closed. This makes a stack the perfect data structure.

**Chosen Solution: Stack**
A `java.util.Deque` (used as a stack) is employed to keep track of unclosed opening brackets.

**Step-by-step Logic:**

1.  Initialize an empty `Deque<Character>` (used as a stack).
2.  Iterate through each character `c` in the input string `s`.
    *   **If `c` is an opening bracket (`(`, `{`, `[`):**
        *   Push `c` onto the stack.
    *   **If `c` is a closing bracket (`)`, `}`, `]`):**
        *   **Check for empty stack:** If the stack is empty, it means we encountered a closing bracket without a corresponding opening bracket. The string is invalid. Return `false`.
        *   **Pop and match:** Pop the top element `top` from the stack.
        *   Compare `c` with `top`:
            *   If `c` is `)` and `top` is not `(` -> Invalid. Return `false`.
            *   If `c` is `}` and `top` is not `{` -> Invalid. Return `false`.
            *   If `c` is `]` and `top` is not `[` -> Invalid. Return `false`.
3.  **After iterating through the string:**
    *   If the stack is empty, it means all opening brackets were correctly matched and closed. The string is valid. Return `true`.
    *   If the stack is not empty, it means there are unclosed opening brackets. The string is invalid. Return `false`.

**Time Complexity:**
*   O(N), where N is the length of the input string `s`. We iterate through the string once, and each stack operation (`push`, `pop`, `peek`, `isEmpty`) takes O(1) time.

**Space Complexity:**
*   O(N) in the worst case. This occurs if the string consists of only opening brackets (e.g., "((("), or deeply nested valid brackets. The stack will store at most N/2 characters.

**Edge Cases & Gotchas:**
*   **Empty string:** The loop won't run, and `stack.isEmpty()` will be true, correctly returning `true`.
*   **String starting with closing bracket:** `stack.isEmpty()` check handles this.
*   **String ending with unclosed opening bracket:** `stack.isEmpty()` check after the loop handles this.

**Alternative Approaches:**
1.  **Using a `HashMap` for pairings:** Instead of an `if-else if` chain for matching brackets, a `HashMap` can store mappings like `')' -> '('`, `'}' -> '{'`, `']' -> '['`. This makes the code cleaner and more extensible if new bracket types were added, but doesn't change time/space complexity. The implementation in `StackQueueProblems.java` briefly mentions this.

---

## 5. Walls and Gates

**Problem:** Given a grid with walls (`-1`), gates (`0`), and empty rooms (`INF`), fill empty rooms with the distance to their nearest gate.

**Core Idea:**
This is a classic "all-pairs shortest path from multiple sources" problem on an unweighted grid. Breadth-First Search (BFS) is the optimal algorithm for finding shortest paths in unweighted graphs. Since we have multiple sources (gates), we can perform a multi-source BFS.

**Chosen Solution: Multi-Source BFS using a Queue**

**Step-by-step Logic:**

1.  **Initialization:**
    *   If the `rooms` grid is empty or invalid, return.
    *   Create a `Queue<int[]>` to store the coordinates `[row, col]` of cells to visit.
    *   Define `dr` and `dc` arrays for easy neighbor traversal (up, down, left, right).
2.  **Enqueue all gates:** Iterate through the entire `rooms` grid. Whenever a `0` (gate) is found, add its coordinates to the queue.
    *   These gates are the starting points for our BFS and are considered to have a distance of `0`.
3.  **BFS Traversal:**
    *   While the `queue` is not empty:
        *   Dequeue a cell `[r, c]`. This `[r, c]` represents a room (or gate) whose distance from an initial gate is `rooms[r][c]`.
        *   For each of its four neighbors `[nr, nc]` (using `dr`, `dc` arrays):
            *   **Check validity:** Ensure `[nr, nc]` is within grid boundaries.
            *   **Check type:** If `rooms[nr][nc]` is currently `INF` (an empty room that hasn't been reached yet by a shorter path):
                *   Update `rooms[nr][nc] = rooms[r][c] + 1`. This means the distance to this neighbor is one more than the current cell's distance.
                *   Enqueue `[nr, nc]`. This neighbor will now be explored in the next BFS level.
    *   Cells that remain `INF` after the BFS are unreachable from any gate. Walls (`-1`) and original gates (`0`) are untouched.

**Why Multi-source BFS works:**
By adding all gates to the queue at the beginning, the BFS expands outwards from all gates simultaneously. The first time an empty room (`INF`) is encountered, it is guaranteed to be reached via the shortest path because BFS explores layer by layer. Once `rooms[nr][nc]` is updated from `INF` to a specific distance, it will never be updated again to a shorter distance because any subsequent path would have to be longer (since we are exploring level by level).

**Time Complexity:**
*   O(M * N), where M is the number of rows and N is the number of columns in the grid.
    *   Each cell is visited and processed (added to queue, neighbors checked) at most a constant number of times.

**Space Complexity:**
*   O(M * N) in the worst case. The queue can hold up to all cells in the grid if they are all empty rooms and reachable (e.g., a grid entirely of `INF`s with one central gate).

**Edge Cases & Gotchas:**
*   **Empty grid:** Handled by initial checks.
*   **No gates:** The queue will be empty initially, and the BFS loop won't run, leaving all `INF`s as `INF`, which is correct.
*   **Rooms unreachable due to walls:** These will correctly remain `INF`.
*   **Large `INF` value:** `Integer.MAX_VALUE` is used, ensure arithmetic doesn't overflow (though `MAX_VALUE + 1` turning negative is usually fine as it won't be less than other valid distances).

**Alternative Approaches:**
1.  **Run BFS from Each Gate Separately:** Iterate through the grid, and whenever a gate is found, run a *single-source* BFS from that gate. In this BFS, update `rooms[nr][nc]` if `rooms[r][c] + 1` is *less than* the current value of `rooms[nr][nc]`.
    *   **Time Complexity:** O(K * M * N), where K is the number of gates. If K is large (e.g., K = M*N/2), this can be significantly slower than the multi-source BFS.
    *   **Space Complexity:** O(M * N).
    *   This approach is less efficient because many BFS runs might redundantly explore paths to the same empty rooms, only to find that an earlier-computed distance from another gate was shorter. The multi-source BFS avoids this by ensuring each empty room is processed once with its final shortest distance.

---

## 6. Daily Temperatures

**Problem:** For each day, find how many days until a warmer temperature.

**Core Idea:**
This problem requires finding the "Next Greater Element to the Right" for each element in the `temperatures` array. A **monotonic stack** is the standard and most efficient approach for such problems. A monotonic stack maintains elements in either strictly increasing or strictly decreasing order. For "next greater", we typically use a decreasing stack (storing indices).

**Chosen Solution: Monotonic Stack (Decreasing)**

**Step-by-step Logic:**

1.  Initialize an `answer` array of the same size as `temperatures`, filled with `0`s (default value if no warmer day is found).
2.  Initialize an empty `Deque<Integer>` to act as a stack, which will store *indices* of temperatures. We maintain these indices such that `temperatures[stack.peek()]` is always decreasing.
3.  Iterate through the `temperatures` array with index `i` from `0` to `n-1`:
    *   **While the stack is not empty AND `temperatures[i]` is greater than `temperatures[stack.peek()]`:**
        *   This means we've found a warmer day (`temperatures[i]`) for the day whose index is `stack.peek()`.
        *   Pop `prevIndex = stack.pop()`.
        *   Calculate the wait days: `answer[prevIndex] = i - prevIndex`.
    *   **Push current index:** After processing any smaller temperatures on the stack, push the current index `i` onto the stack. This maintains the decreasing order (or if `temperatures[i]` is smaller than `temperatures[stack.peek()]`, it simply gets pushed).
4.  After the loop finishes, any indices remaining in the stack have no warmer day to their right, so their corresponding `answer` value remains `0`.

**Example Walkthrough:** `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`

| `i` | `temp[i]` | Stack (indices) | Condition `temp[i] > temp[stack.peek()]` | Actions                                    | `answer`                               |
| :-- | :-------- | :-------------- | :--------------------------------------- | :----------------------------------------- | :------------------------------------- |
| -   | -         | `[]`            | -                                        | -                                          | `[0,0,0,0,0,0,0,0]`                    |
| 0   | 73        | `[0]`           | `[]` (empty)                             | push 0                                     | `[0,0,0,0,0,0,0,0]`                    |
| 1   | 74        | `[0]` (73)      | `74 > 73` (True)                         | pop 0, `answer[0] = 1-0 = 1`               | `[1,0,0,0,0,0,0,0]`                    |
|     |           | `[]`            | `[]` (empty)                             | push 1                                     | `[1,0,0,0,0,0,0,0]`                    |
| 2   | 75        | `[1]` (74)      | `75 > 74` (True)                         | pop 1, `answer[1] = 2-1 = 1`               | `[1,1,0,0,0,0,0,0]`                    |
|     |           | `[]`            | `[]` (empty)                             | push 2                                     | `[1,1,0,0,0,0,0,0]`                    |
| 3   | 71        | `[2]` (75)      | `71 > 75` (False)                        | push 3                                     | `[1,1,0,0,0,0,0,0]`                    |
|     |           | `[2,3]`         | -                                        | -                                          | -                                      |
| 4   | 69        | `[2,3]` (75,71) | `69 > 71` (False)                        | push 4                                     | `[1,1,0,0,0,0,0,0]`                    |
|     |           | `[2,3,4]`       | -                                        | -                                          | -                                      |
| 5   | 72        | `[2,3,4]` (75,71,69) | `72 > 69` (True)                   | pop 4, `answer[4] = 5-4 = 1`               | `[1,1,0,0,1,0,0,0]`                    |
|     |           | `[2,3]` (75,71) | `72 > 71` (True)                         | pop 3, `answer[3] = 5-3 = 2`               | `[1,1,0,2,1,0,0,0]`                    |
|     |           | `[2]` (75)      | `72 > 75` (False)                        | push 5                                     | `[1,1,0,2,1,0,0,0]`                    |
|     |           | `[2,5]`         | -                                        | -                                          | -                                      |
| 6   | 76        | `[2,5]` (75,72) | `76 > 72` (True)                         | pop 5, `answer[5] = 6-5 = 1`               | `[1,1,0,2,1,1,0,0]`                    |
|     |           | `[2]` (75)      | `76 > 75` (True)                         | pop 2, `answer[2] = 6-2 = 4`               | `[1,1,4,2,1,1,0,0]`                    |
|     |           | `[]`            | `[]` (empty)                             | push 6                                     | `[1,1,4,2,1,1,0,0]`                    |
| 7   | 73        | `[6]` (76)      | `73 > 76` (False)                        | push 7                                     | `[1,1,4,2,1,1,0,0]`                    |
|     |           | `[6,7]`         | -                                        | -                                          | -                                      |

Final `answer`: `[1, 1, 4, 2, 1, 1, 0, 0]`

**Time Complexity:**
*   O(N), where N is the number of temperatures. Each index is pushed onto the stack once and popped from the stack at most once.

**Space Complexity:**
*   O(N) in the worst case. If temperatures are strictly decreasing (e.g., `[5, 4, 3, 2, 1]`), all indices will remain in the stack until the end.

**Edge Cases & Gotchas:**
*   **Empty array:** Returns an empty `answer` array.
*   **Single element array:** Correctly returns `[0]`.
*   **All increasing / all decreasing / all same:** Handled by the logic.

**Alternative Approaches:**
1.  **Brute Force:** For each day `i`, iterate from `i+1` to `n-1` to find the first warmer day. This would be O(N^2) time, which is too slow for large inputs.
2.  **Using `TreeMap` for `(temperature, index)`:** Can store `(temp, index)` pairs and query for `ceilingKey` to find next greater temp. This might be O(N log N) but usually more complex than the monotonic stack.

---

## 7. Number of Islands

**Problem:** Given a binary grid representing land ('1') and water ('0'), count the number of islands.

**Core Idea:**
This is a connected components problem on a grid. An "island" is a connected component of '1's. When we find a '1', we increment the island count, then explore all connected '1's (its entire component) and mark them as visited to avoid recounting them. Both BFS (Breadth-First Search) and DFS (Depth-First Search) are suitable for exploring connected components. BFS is chosen here as it naturally uses a queue.

**Chosen Solution: BFS using a Queue**

**Step-by-step Logic:**

1.  **Initialization:**
    *   If the `grid` is empty or invalid, return `0`.
    *   Get grid dimensions `numRows`, `numCols`.
    *   Initialize `numIslands = 0`.
    *   Define `dr` and `dc` arrays for neighbor traversal.
2.  **Iterate through the grid:** Use nested loops to visit every cell `(r, c)` in the grid.
3.  **Find unvisited land:** If `grid[r][c]` is `'1'` (land):
    *   Increment `numIslands`. We've found the start of a new island.
    *   **Start BFS:**
        *   Create a new `Queue<int[]>` and add `[r, c]` to it.
        *   Mark `grid[r][c]` as `'0'` (water or visited) to prevent revisiting this cell and avoid infinite loops. (Modifying the grid in-place is common; alternatively, a `boolean[][] visited` array could be used).
        *   **BFS Loop:** While the queue is not empty:
            *   Dequeue `[currR, currC]`.
            *   For each of its four neighbors `[nr, nc]` (using `dr`, `dc` arrays):
                *   **Check validity:** Ensure `[nr, nc]` is within grid boundaries.
                *   **Check type:** If `grid[nr][nc]` is `'1'` (unvisited land):
                    *   Mark `grid[nr][nc]` as `'0'`.
                    *   Enqueue `[nr, nc]`.
4.  After the loops complete, `numIslands` will hold the total count.

**Time Complexity:**
*   O(M * N), where M is the number of rows and N is the number of columns.
    *   Each cell is visited by the outer loops once. If it's a '1', it triggers a BFS. During the BFS, each cell is added to the queue at most once and processed once. Marking visited cells to '0' ensures this. Therefore, the total work is proportional to the number of cells.

**Space Complexity:**
*   O(min(M, N)) in the worst case for the queue. This occurs when the grid has a large "snake-like" island (e.g., one long diagonal of '1's), where the queue might store up to `min(M, N)` elements at a time. In the absolute worst case (e.g., a grid full of '1's), the queue can theoretically hold up to O(M*N) elements if not optimized, but practical implementations tend to be closer to O(min(M,N)).

**Edge Cases & Gotchas:**
*   **Empty grid:** Handled by initial checks.
*   **Grid with no islands (all '0's):** `numIslands` remains `0`.
*   **Grid entirely of '1's:** Correctly counts as 1 island.
*   **Modifying grid vs. visited array:** Modifying the grid in-place (`grid[r][c] = '0'`) is a common optimization and saves extra memory for a `visited` array. If the original grid needs to be preserved, a `boolean[][] visited` array should be used.

**Alternative Approaches:**
1.  **DFS (Depth-First Search):** This is equally valid and often more concise to implement recursively.
    *   When an unvisited '1' is found, increment island count.
    *   Call a recursive DFS helper function `dfs(grid, r, c)`:
        *   Mark `grid[r][c]` as '0'.
        *   Recursively call `dfs` for all valid '1' neighbors.
    *   **Time Complexity:** O(M * N).
    *   **Space Complexity:** O(M * N) in the worst case for the recursion stack (e.g., a long snake-like island filling the grid).

Both BFS and DFS are optimal for this problem in terms of time complexity. The choice often comes down to personal preference or specific constraints (e.g., avoiding recursion depth limits for very large grids, where iterative BFS is safer).

---
```