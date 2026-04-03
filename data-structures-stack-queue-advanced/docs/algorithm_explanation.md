# Algorithm Explanations, Diagrams, and Complexity Analysis

This document provides in-depth explanations for the optimal solutions to the Stack and Queue problems covered in this project. Each problem includes a breakdown of the algorithm's logic, visual diagrams (ASCII art) to illustrate key steps, and a detailed analysis of its time and space complexity.

---

## 1. Valid Parentheses

**Problem Statement Recap:** Determine if a string of parentheses `()[]{}` is valid based on matching types and correct order.

**Optimal Solution (Stack-based):**

The most efficient approach uses a stack (LIFO). We iterate through the string character by character:
*   **If an opening bracket `(`, `[`, `{` is encountered:** Push it onto the stack.
*   **If a closing bracket `)`, `]`, `}` is encountered:**
    *   Check if the stack is empty. If it is, there's no matching opening bracket, so the string is invalid.
    *   If the stack is not empty, pop the top element.
    *   Compare the popped element with the current closing bracket. If they don't form a valid pair (e.g., `)` with `[`), the string is invalid.
*   **After iterating through the entire string:**
    *   If the stack is empty, all opening brackets were correctly closed. The string is valid.
    *   If the stack is not empty, there are unmatched opening brackets. The string is invalid.

**ASCII Diagram (Example: `([{}])`):**

```
Input: s = "([{}])"

1. char = '('
   Stack: ['(']

2. char = '['
   Stack: ['(', '[']

3. char = '{'
   Stack: ['(', '[', '{']

4. char = '}'
   Pop '{', matches '}'.
   Stack: ['(', '[']

5. char = ']'
   Pop '[', matches ']'.
   Stack: ['(']

6. char = ')'
   Pop '(', matches ')'.
   Stack: []

End of string. Stack is empty. Result: Valid.
```

**Edge Cases & Gotchas:**
*   **Empty string:** Valid (no brackets to invalidate it).
*   **Unmatched opening bracket:** `([)` -> Stack ends with `[`, invalid.
*   **Unmatched closing bracket:** `)` -> Stack is empty when `)` is seen, invalid.
*   **Mismatched types:** `({)}` -> `)` pops `{`, mismatch, invalid.

**Time Complexity:** O(N), where N is the length of the string. Each character is processed exactly once, and stack operations (push, pop, peek) take O(1) time.

**Space Complexity:** O(N) in the worst case. For a string like `((((((`, the stack will store N/2 opening brackets. In the best case (e.g., `()()()`), the space is O(1) as pairs are matched immediately.

---

## 2. Min Stack

**Problem Statement Recap:** Implement a stack that supports `push`, `pop`, `top`, and `getMin` all in O(1) time.

**Optimal Solution (Two Stacks):**

To achieve O(1) `getMin`, we use an auxiliary stack, let's call it `min_stack`.
*   **`push(val)`:**
    *   Push `val` onto the main stack.
    *   If `min_stack` is empty OR `val` is less than or equal to the current top of `min_stack`, push `val` onto `min_stack`. (It's crucial to use `<=` to handle duplicate minimums correctly; if we used `<`, popping one instance of the minimum might leave the `min_stack` incorrect if another instance exists).
*   **`pop()`:**
    *   Pop `val` from the main stack.
    *   If `val` is equal to the current top of `min_stack`, pop from `min_stack` as well.
*   **`top()`:** Return the top of the main stack.
*   **`getMin()`:** Return the top of `min_stack`.

**ASCII Diagram (Example Operations):**

```
minStack = MinStack()

1. minStack.push(-2)
   Main Stack: [-2]
   Min Stack:  [-2] (min_stack was empty)

2. minStack.push(0)
   Main Stack: [-2, 0]
   Min Stack:  [-2] (0 is not <= -2)

3. minStack.push(-3)
   Main Stack: [-2, 0, -3]
   Min Stack:  [-2, -3] (-3 is <= -2)

4. minStack.getMin() -> -3 (top of Min Stack)

5. minStack.pop()
   Popped: -3 (from Main Stack)
   -3 == Min Stack top (-3). So, pop from Min Stack too.
   Main Stack: [-2, 0]
   Min Stack:  [-2]

6. minStack.top() -> 0 (top of Main Stack)

7. minStack.getMin() -> -2 (top of Min Stack)
```

**Alternative Approach (Tuple in Main Stack):**

Instead of a separate `min_stack`, each element pushed to the main stack could be a tuple `(value, current_min_at_this_level)`.
*   **`push(val)`:**
    *   `current_min = min(val, stack[-1][1] if stack else float('inf'))`
    *   Push `(val, current_min)` onto the main stack.
*   **`pop()`:** Pop from main stack.
*   **`top()`:** Return `stack[-1][0]`.
*   **`getMin()`:** Return `stack[-1][1]`.

This approach uses slightly more memory per element but avoids a second stack object. Both achieve O(1) for all operations.

**Edge Cases & Gotchas:**
*   **Empty stack:** `pop()`, `top()`, `getMin()` on an empty stack should raise an error (or return a sentinel value depending on problem constraints). Our implementation raises `IndexError`.
*   **Duplicate minimums:** Handled by `val <= self._min_stack[-1]` in `push()` and `popped_val == self._min_stack[-1]` in `pop()`. This ensures all instances of the minimum are on `min_stack` and removed appropriately.

**Time Complexity:** O(1) for all operations (`push`, `pop`, `top`, `getMin`).
Stack operations on `collections.deque` (used in Python) are O(1).

**Space Complexity:** O(N) in the worst case. If elements are pushed in decreasing order (e.g., `5, 4, 3, 2, 1`), `min_stack` will also grow to size N. If elements are pushed in increasing order (e.g., `1, 2, 3, 4, 5`), `min_stack` will only contain the first (minimum) element, taking O(1) space. The tuple approach also takes O(N) as each element stores two integers.

---

## 3. Implement Queue using Stacks

**Problem Statement Recap:** Implement a FIFO queue using only two LIFO stacks.

**Optimal Solution (Two Stacks - `in_stack` and `out_stack`):**

The key idea is to use two stacks:
1.  **`in_stack`**: Used primarily for `push` (enqueue) operations. Elements are added here.
2.  **`out_stack`**: Used primarily for `pop` (dequeue) and `peek` operations. It stores elements in the correct FIFO order.

**Logic:**
*   **`push(x)`:** Simply push `x` onto `in_stack`. This is O(1).
*   **`pop()` / `peek()`:**
    *   First, check if `out_stack` is empty.
    *   If `out_stack` is empty, it means we need to "transfer" elements from `in_stack` to `out_stack`. To do this, pop *all* elements from `in_stack` and push them onto `out_stack`. This reversal ensures that the first element pushed into `in_stack` (the oldest element) will end up at the top of `out_stack`.
    *   Once `out_stack` is populated (or if it wasn't empty to begin with), perform the `pop()` or `peek()` operation on `out_stack`.
*   **`empty()`:** The queue is empty if and only if both `in_stack` AND `out_stack` are empty.

**ASCII Diagram (Example: push 1, push 2, peek, pop, push 3, push 4, pop):**

```
Initial:
in_stack: []
out_stack: []

1. push(1)
   in_stack: [1]
   out_stack: []

2. push(2)
   in_stack: [1, 2]
   out_stack: []

3. peek()
   out_stack is empty. Transfer from in_stack:
     pop 2 from in_stack, push 2 to out_stack
     pop 1 from in_stack, push 1 to out_stack
   in_stack: []
   out_stack: [2, 1] (top is 1)
   peek() returns 1.

4. pop()
   out_stack is not empty. Pop from out_stack.
   in_stack: []
   out_stack: [2]
   pop() returns 1.

5. push(3)
   in_stack: [3]
   out_stack: [2]

6. push(4)
   in_stack: [3, 4]
   out_stack: [2]

7. pop()
   out_stack is not empty. Pop from out_stack.
   in_stack: [3, 4]
   out_stack: []
   pop() returns 2.

Now, if another pop() or peek() is called, out_stack will be empty again,
triggering another transfer from in_stack:
  in_stack: [3, 4] -> pop 4, push 4; pop 3, push 3
  in_stack: []
  out_stack: [4, 3] (top is 3)
```

**Edge Cases & Gotchas:**
*   **Empty queue for `pop`/`peek`:** The problem states all calls to `pop` and `peek` are valid (i.e., queue will not be empty). Our implementation raises `IndexError` if this assumption is violated.
*   **Sequence of operations:** Understanding when the transfer happens is crucial. It only happens when `out_stack` is depleted.

**Time Complexity:**
*   `push`: O(1). A single element is pushed onto `in_stack`.
*   `pop`/`peek`: O(1) **amortized**. In the worst case, when `out_stack` is empty, it costs O(N) to transfer all N elements from `in_stack` to `out_stack`. However, each element is moved between stacks only a constant number of times (pushed to `in_stack`, popped from `in_stack`, pushed to `out_stack`, popped from `out_stack`). Over a sequence of N operations, the total cost is O(N), leading to an amortized O(1) per operation.
*   `empty`: O(1). Checking two booleans.

**Space Complexity:** O(N), where N is the total number of elements stored in the queue. All elements are distributed between `in_stack` and `out_stack`.

---

## 4. Sliding Window Maximum

**Problem Statement Recap:** Find the maximum element in each sliding window of size `k` in an array.

**Optimal Solution (Monotonic Deque / Double-Ended Queue):**

This problem is a classic application of a monotonic deque. A deque is used to store *indices* of elements, maintaining them in decreasing order of their values. The front of the deque will always point to the index of the maximum element in the current window.

**Logic:**
1.  **Initialize `deque` and `results` list.**
2.  **Iterate `i` from 0 to `N-1` (where N is `nums.length`):**
    *   **Remove outdated elements from front:** If the index at `d[0]` (front of deque) is `i - k` (i.e., it's no longer in the current window `[i-k+1, i]`), `d.popleft()`.
    *   **Maintain monotonicity (remove smaller elements from back):** While the deque is not empty AND `nums[d[-1]] <= nums[i]`, `d.pop()`. This is because `nums[i]` is a larger or equal value that appeared later, making any smaller/equal elements before it redundant as potential maximums *within the current window and subsequent windows where `nums[i]` is still valid*.
    *   **Add current element's index to back:** `d.append(i)`.
    *   **Record maximum:** If `i >= k - 1` (the window has fully formed), then `nums[d[0]]` is the maximum for the current window. Add it to `results`.

**ASCII Diagram (Example: `nums = [1,3,-1,-3,5,3,6,7], k = 3`):**

```
Nums: [1,  3,  -1, -3, 5,  3,  6,  7]
Indices: 0   1   2   3   4   5   6   7
k = 3
Result: []
Deque d: [] (stores indices)

i = 0, num = 1 (Window: [1])
  d is empty.
  d.append(0) -> d: [0]
  i < k-1 (0 < 2), no result yet.

i = 1, num = 3 (Window: [1, 3])
  d[0] (0) != 1-3.
  nums[d[-1]] (nums[0]=1) <= num (3). d.pop() -> d: []
  d.append(1) -> d: [1]
  i < k-1 (1 < 2), no result yet.

i = 2, num = -1 (Window: [1, 3, -1])
  d[0] (1) != 2-3.
  nums[d[-1]] (nums[1]=3) is not <= num (-1). No pop.
  d.append(2) -> d: [1, 2]
  i >= k-1 (2 >= 2). Window formed. Max is nums[d[0]] (nums[1]=3).
  Result: [3]

i = 3, num = -3 (Window: [3, -1, -3])
  d[0] (1) == 3-3. d.popleft() -> d: [2]
  nums[d[-1]] (nums[2]=-1) is not <= num (-3). No pop.
  d.append(3) -> d: [2, 3]
  i >= k-1. Max is nums[d[0]] (nums[2]=-1).
  Result: [3, -1] -> Oh, mistake in trace! nums[d[0]] is max, not the number itself.
  Let's retrace the step for i=3 and Result.

Corrected Trace:

i = 0, num = 1
  d: [0]
  Result: []

i = 1, num = 3
  nums[d[-1]] (nums[0]=1) <= 3. d.pop() -> d: []
  d.append(1) -> d: [1]
  Result: []

i = 2, num = -1
  d: [1, 2]
  i >= k-1 (2 >= 2). Max is nums[d[0]] (nums[1]=3).
  Result: [3]

i = 3, num = -3 (Window: [3, -1, -3])
  d[0] (1) == i-k (3-3=0). d.popleft() -> d: [2]
  nums[d[-1]] (nums[2]=-1) is not <= num (-3). No pop.
  d.append(3) -> d: [2, 3]
  i >= k-1. Max is nums[d[0]] (nums[2]=-1). ERROR in manual trace.
  It should be: Max is nums[d[0]] (nums[2]=-1) -> Output: 3.
  Okay, the logic for `nums[d[0]]` being the max is correct, but my example values for `nums` here are slightly off the actual input example.
  Let's use the provided example: `nums = [1,3,-1,-3,5,3,6,7], k = 3`

`nums = [1,  3,  -1, -3, 5,  3,  6,  7]`
`k = 3`
`results = []`
`d = deque()`

`i = 0, num = 1`
  `d` empty, push 0. `d = [0]`
  `i < k-1`.
`i = 1, num = 3`
  `nums[d[-1]]` (nums[0]=1) <= 3. Pop 0. `d = []`
  Push 1. `d = [1]`
  `i < k-1`.
`i = 2, num = -1`
  `nums[d[-1]]` (nums[1]=3) is not <= -1. No pop from back.
  Push 2. `d = [1, 2]`
  `i >= k-1`. `results.append(nums[d[0]])` -> `results.append(nums[1])` -> `results = [3]`

`i = 3, num = -3`
  `d[0]` (1) == `i-k` (3-3=0). Pop 1. `d = [2]`
  `nums[d[-1]]` (nums[2]=-1) is not <= -3. No pop from back.
  Push 3. `d = [2, 3]`
  `i >= k-1`. `results.append(nums[d[0]])` -> `results.append(nums[2])` -> `results = [3, -1]`

Hold on, my manual trace of `results` for `i=3` still yields `-1`.
The example output `[3,3,5,5,6,7]` for `nums = [1,3,-1,-3,5,3,6,7], k = 3` means at index 3, the window is `[3, -1, -3]`, max is `3`.
Ah, the issue is that `d[0]` is index `2` which contains `-1`. When `nums[2]` is popped, `nums[1]` (which is `3`) should be the max.
My removal logic for `d[0]` being `i-k` is correct.
The critical thing is that `nums[d[0]]` will *always* be the maximum value in the current window *because the deque only contains relevant indices in decreasing order of value*.

Let's re-run with careful attention to the original example:
`nums = [1,  3,  -1, -3, 5,  3,  6,  7]`
`k = 3`
`results = []`
`d = deque()`

`i=0, num=1`:
  `d` empty, `d.append(0)`. `d = [0]`
  `i < k-1`.
`i=1, num=3`:
  `nums[d[-1]] (nums[0]=1) <= 3`. `d.pop()`. `d = []`
  `d.append(1)`. `d = [1]`
  `i < k-1`.
`i=2, num=-1`:
  `nums[d[-1]] (nums[1]=3) > -1`. No pop from back.
  `d.append(2)`. `d = [1, 2]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[1] = 3)`. `results = [3]`

`i=3, num=-3`:
  `d[0]` (1) == `i-k` (3-3=0). Pop 1. `d = [2]`
  `nums[d[-1]] (nums[2]=-1) > -3`. No pop from back.
  `d.append(3)`. `d = [2, 3]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[2] = -1)`. `results = [3, -1]`
  Wait, this is still wrong. The output for `i=3` is `3`. Window `[3, -1, -3]` has max `3`.
  My `d[0]` is `2`, which is `nums[2]=-1`.

The issue is with `d[0] == i - k`.
When `i=3`, `i-k = 0`. `d[0]` is currently `1`. So `d[0]` is NOT equal to `i-k`.
The condition for removal is `d[0] == i - k`.
At `i=3`, the window is `[3, -1, -3]` corresponding to indices `[1, 2, 3]`.
The element at `nums[0]` is `1`. It's outside this window.
The current `d` is `[1, 2]`. `d[0]` is `1`. This index is still *within* the window `[1, 2, 3]`.
So, the `d.popleft()` condition `d[0] == i - k` might be too strict, or my understanding of `i-k` window start is off.

Let's clarify window indices:
Window `[i-k+1, ..., i]`.
An index `j` is outdated if `j < i-k+1`.
So, `d[0]` (the index at the front of the deque) is outdated if `d[0] < i-k+1`.
This is equivalent to `d[0] <= i-k`.

Let's re-re-trace.

`nums = [1,  3,  -1, -3, 5,  3,  6,  7]`
`k = 3`
`results = []`
`d = deque()`

`i=0, num=1`: (Window `[-2, -1, 0]`)
  `d` empty, `d.append(0)`. `d = [0]`
  `i < k-1`.
`i=1, num=3`: (Window `[-1, 0, 1]`)
  `nums[d[-1]] (nums[0]=1) <= 3`. `d.pop()`. `d = []`
  `d.append(1)`. `d = [1]`
  `i < k-1`.
`i=2, num=-1`: (Window `[0, 1, 2]`)
  `nums[d[-1]] (nums[1]=3) > -1`. No pop from back.
  `d.append(2)`. `d = [1, 2]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[1] = 3)`. `results = [3]`
  (Correct for window `[1,3,-1]`, max `3`)

`i=3, num=-3`: (Window `[1, 2, 3]`)
  `d[0]` (1) is NOT `<= i-k` (3-3=0). `1 > 0`. So, no `popleft()`.
  This is the source of my confusion. `d[0]` refers to `nums[1]` which is `3`. It IS IN THE CURRENT WINDOW!
  `nums[d[-1]] (nums[2]=-1) > -3`. No pop from back.
  `d.append(3)`. `d = [1, 2, 3]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[1] = 3)`. `results = [3, 3]`
  (Correct for window `[3,-1,-3]`, max `3`)

`i=4, num=5`: (Window `[2, 3, 4]`)
  `d[0]` (1) IS `<= i-k` (4-3=1). `1 <= 1`. `d.popleft()`. `d = [2, 3]`
  `nums[d[-1]] (nums[3]=-3) <= 5`. `d.pop()`. `d = [2]`
  `nums[d[-1]] (nums[2]=-1) <= 5`. `d.pop()`. `d = []`
  `d.append(4)`. `d = [4]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[4] = 5)`. `results = [3, 3, 5]`
  (Correct for window `[-1,-3,5]`, max `5`)

`i=5, num=3`: (Window `[3, 4, 5]`)
  `d[0]` (4) is NOT `<= i-k` (5-3=2). `4 > 2`. No `popleft()`.
  `nums[d[-1]] (nums[4]=5) > 3`. No pop from back.
  `d.append(5)`. `d = [4, 5]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[4] = 5)`. `results = [3, 3, 5, 5]`
  (Correct for window `[-3,5,3]`, max `5`)

`i=6, num=6`: (Window `[4, 5, 6]`)
  `d[0]` (4) is NOT `<= i-k` (6-3=3). `4 > 3`. No `popleft()`.
  `nums[d[-1]] (nums[5]=3) <= 6`. `d.pop()`. `d = [4]`
  `nums[d[-1]] (nums[4]=5) <= 6`. `d.pop()`. `d = []`
  `d.append(6)`. `d = [6]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[6] = 6)`. `results = [3, 3, 5, 5, 6]`
  (Correct for window `[5,3,6]`, max `6`)

`i=7, num=7`: (Window `[5, 6, 7]`)
  `d[0]` (6) is NOT `<= i-k` (7-3=4). `6 > 4`. No `popleft()`.
  `nums[d[-1]] (nums[6]=6) <= 7`. `d.pop()`. `d = []`
  `d.append(7)`. `d = [7]`
  `i >= k-1`. `results.append(nums[d[0]] = nums[7] = 7)`. `results = [3, 3, 5, 5, 6, 7]`
  (Correct for window `[3,6,7]`, max `7`)

This trace is consistent with the example output. My initial understanding of `d[0] == i-k` was correct for the problem code. My error was in applying `i-k` vs `i-k+1` to the window boundaries. The code is using `d[0] == i - k` as equivalent to `d[0] < i - k + 1`, which means if `d[0]` is the *start* of the window (i.e. `i-k+1`), then `i-k` is the previous start index. If `d[0]` is at `i-k`, it means the item at `nums[i-k]` is now fully out of the window, as the new window starts at `i-k+1`. This is indeed the correct check.

**Edge Cases & Gotchas:**
*   **Empty `nums`:** Constraints `1 <= nums.length` prevent this.
*   **`k=1`:** Each element is its own max. The algorithm handles this by only having one element in the deque at most.
*   **`k=len(nums)`:** Only one window, `max(nums)`.
*   **All elements same:** `[5,5,5,5], k=2` -> `[5,5,5]`. Deque still functions correctly.
*   **Monotonically increasing/decreasing arrays:** Deque handles these efficiently, either growing large (decreasing) or staying small (increasing).

**Time Complexity:** O(N), where N is the length of `nums`. Each element is pushed and popped from the deque at most once. All deque operations are O(1).
**Space Complexity:** O(K), where K is the window size. The deque stores at most K indices.

---

## 5. Rotten Oranges

**Problem Statement Recap:** Given a grid of fresh (1), rotten (2), and empty (0) oranges, find the minimum time for all fresh oranges to rot. If impossible, return -1.

**Optimal Solution (Breadth-First Search - Multi-Source BFS):**

This is a classic multi-source BFS problem. Since all rotten oranges begin rotting their neighbors *simultaneously* and we need the *minimum* time, BFS is the perfect algorithm. Each "minute" represents a layer in the BFS.

**Logic:**
1.  **Initialization:**
    *   Find all initially rotten oranges (`grid[r][c] == 2`). Add their `(row, col)` coordinates to a `deque` (our BFS queue).
    *   Count the total number of `fresh_oranges` (`grid[r][c] == 1`).
    *   Initialize `minutes = 0`.
2.  **Base Case:** If `fresh_oranges == 0` initially, return `0` (no time needed).
3.  **BFS Loop:**
    *   Continue while the `queue` is not empty AND there are still `fresh_oranges`.
    *   **Level Processing:** Crucially, for each `minute` (or BFS level), process *all* oranges that became rotten in the *previous* minute. This means taking `len(queue)` at the beginning of the loop for the current level.
    *   For each orange `(r, c)` dequeued from this level:
        *   Check its four neighbors `(nr, nc)` (up, down, left, right).
        *   If a neighbor `(nr, nc)` is within grid bounds AND is a `fresh_orange`:
            *   Mark `grid[nr][nc]` as `rotten` (`2`).
            *   Decrement `fresh_oranges`.
            *   Enqueue `(nr, nc)` to be processed in the *next* minute.
    *   After processing all oranges for the current minute, increment `minutes`.
4.  **Final Check:**
    *   After the BFS loop finishes:
        *   If `fresh_oranges == 0`, all oranges rotted. Return `minutes`.
        *   Otherwise (`fresh_oranges > 0`), some fresh oranges are unreachable. Return `-1`.

**ASCII Diagram (Example: `[[2,1,1],[1,1,0],[0,1,1]]`):**

```
Grid:
[2,1,1]
[1,1,0]
[0,1,1]

Initial State:
  Queue: [(0,0)]  (Only (0,0) is rotten initially. No, actually `grid[2][2]` is also rotten!
                   Let's use an example where only one is rotten for simplicity or find all initial rotten.)
  Ah, my code finds all initial rotten oranges. Let's trace it.
  Initial rotten: (0,0), (2,2)
  Fresh: (0,1), (0,2), (1,0), (1,1), (2,1) => count = 5

Initial State:
  Grid:
  [2,1,1]
  [1,1,0]
  [0,1,2]
  Queue `q`: [(0,0), (2,2)]
  `fresh_oranges`: 5
  `minutes`: 0

Minute 1: (`minutes` becomes 1)
  Process initial rotten oranges from `q` (size 2):
  1. Dequeue (0,0):
     Neighbors: (0,1), (1,0) are fresh.
       (0,1) -> rots. `grid[0][1]=2`. `fresh_oranges=4`. Enqueue (0,1).
       (1,0) -> rots. `grid[1][0]=2`. `fresh_oranges=3`. Enqueue (1,0).
  2. Dequeue (2,2):
     Neighbors: (1,2), (2,1) are fresh. (Grid value (1,2) is 0, wait.)
     Input Example Grid 1: `[[2,1,1],[1,1,0],[0,1,1]]`
     Initial Rotten: (0,0)
     Fresh: (0,1), (0,2), (1,0), (1,1), (2,1), (2,2) => Count = 6
     Queue `q`: [(0,0)]
     `fresh_oranges`: 6
     `minutes`: 0

Corrected Trace Example 1: `grid = [[2,1,1],[1,1,0],[0,1,1]]`

Initial State:
  Grid:
  [2,1,1]
  [1,1,0]
  [0,1,1]
  Queue `q`: [(0,0)]  (Index of the 2)
  `fresh_oranges`: 6
  `minutes`: 0

Minute 1: (`minutes` becomes 1)
  Process `q` (size 1):
  1. Dequeue (0,0):
     Neighbors: (0,1), (1,0) are fresh.
       (0,1) -> rots. `grid[0][1]=2`. `fresh_oranges=5`. Enqueue (0,1).
       (1,0) -> rots. `grid[1][0]=2`. `fresh_oranges=4`. Enqueue (1,0).
  Current Grid:
  [2,2,1]
  [2,1,0]
  [0,1,1]
  Queue `q`: [(0,1), (1,0)]

Minute 2: (`minutes` becomes 2)
  Process `q` (size 2):
  1. Dequeue (0,1): (originally fresh, now rotten)
     Neighbors: (0,0) (rotten), (0,2) (fresh), (1,1) (fresh)
       (0,2) -> rots. `grid[0][2]=2`. `fresh_oranges=3`. Enqueue (0,2).
       (1,1) -> rots. `grid[1][1]=2`. `fresh_oranges=2`. Enqueue (1,1).
  2. Dequeue (1,0): (originally fresh, now rotten)
     Neighbors: (0,0) (rotten), (1,1) (rotten), (2,0) (empty)
       No new fresh oranges.
  Current Grid:
  [2,2,2]
  [2,2,0]
  [0,1,1]
  Queue `q`: [(0,2), (1,1)]

Minute 3: (`minutes` becomes 3)
  Process `q` (size 2):
  1. Dequeue (0,2):
     Neighbors: (0,1) (rotten), (1,2) (empty)
       No new fresh oranges.
  2. Dequeue (1,1):
     Neighbors: (0,1) (rotten), (1,0) (rotten), (1,2) (empty), (2,1) (fresh)
       (2,1) -> rots. `grid[2][1]=2`. `fresh_oranges=1`. Enqueue (2,1).
  Current Grid:
  [2,2,2]
  [2,2,0]
  [0,2,1]
  Queue `q`: [(2,1)]

Minute 4: (`minutes` becomes 4)
  Process `q` (size 1):
  1. Dequeue (2,1):
     Neighbors: (1,1) (rotten), (2,0) (empty), (2,2) (fresh)
       (2,2) -> rots. `grid[2][2]=2`. `fresh_oranges=0`. Enqueue (2,2).
  Current Grid:
  [2,2,2]
  [2,2,0]
  [0,2,2]
  Queue `q`: [(2,2)]

End of loop: `fresh_oranges == 0`. Return `minutes = 4`.
This matches the example.

**Edge Cases & Gotchas:**
*   **No fresh oranges initially:** Return 0. Handled.
*   **All oranges initially rotten:** Return 0. Handled.
*   **Unreachable fresh oranges:** If `fresh_oranges > 0` after `q` is empty, return -1. Handled.
*   **Single orange:** `[[1]]` -> -1, `[[2]]` -> 0, `[[0]]` -> 0. Handled.
*   **Grid modification:** The `grid` is modified in-place to mark oranges as rotten (`grid[nr][nc] = 2`). This prevents re-processing them and correctly updates the state.

**Time Complexity:** O(R * C), where R is the number of rows and C is the number of columns in the grid. In the worst case, every cell (orange) is visited and processed once. Each cell is added to the queue at most once. For each cell, its 4 neighbors are checked.
**Space Complexity:** O(R * C) in the worst case. The queue can store up to all cells in the grid (e.g., if all oranges are initially rotten or become rotten). The grid itself takes O(R*C) space.

---