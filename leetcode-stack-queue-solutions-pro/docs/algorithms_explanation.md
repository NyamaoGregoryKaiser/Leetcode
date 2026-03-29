# Algorithm Explanations for Stack and Queue Problems

This document provides a detailed explanation of the algorithms used to solve the problems in this project. It covers optimal approaches, time/space complexity analysis, comparisons with alternative solutions (where applicable), edge cases, and general interview tips.

## 1. Valid Parentheses

**Problem Statement:** Determine if a string containing '(', ')', '{', '}', '[', ']' is valid based on correct matching and nesting.

### Optimal Solution: Using a Stack

**Core Idea:**
The problem inherently requires matching opening brackets with their corresponding closing brackets in the correct order. A stack is the perfect data structure for this because of its Last-In, First-Out (LIFO) property. The most recently opened bracket must be the first one to be closed.

**Algorithm Steps:**
1.  **Initialize an empty stack.** This stack will store all encountered *opening* brackets.
2.  **Define a mapping** for closing brackets to their corresponding opening brackets (e.g., `')': '('`, `'}' : '{'`, `']': '['`). This allows for quick lookup.
3.  **Iterate through each character (`char`) in the input string `s`:**
    *   **If `char` is an opening bracket** (`(`, `{`, `[`):
        *   Push `char` onto the stack.
    *   **If `char` is a closing bracket** (`)`, `}`, `]`):
        *   **Check for empty stack:** If the stack is empty, it means we've encountered a closing bracket without a corresponding opening bracket. The string is invalid. Return `False`.
        *   **Pop from stack:** Pop the top element from the stack. This element should be the most recently opened bracket.
        *   **Check for match:** Compare the popped opening bracket with the expected opening bracket for the current `char` (using our mapping). If they don't match, the string is invalid (e.g., `([)]`). Return `False`.
4.  **After iterating through the entire string:**
    *   If the stack is empty, it means all opening brackets were correctly closed. The string is valid. Return `True`.
    *   If the stack is *not* empty, it means there are unmatched opening brackets (e.g., `"((("`). The string is invalid. Return `False`.

**Example Walkthrough (for `s = "({[]})"`):**

| Char | Stack (State after processing) | Explanation                                                      |
| :--- | :----------------------------- | :--------------------------------------------------------------- |
| `(`  | `[`(`]`                    | Push `(`.                                                        |
| `{`  | `[`(`, `{`]`                | Push `{`.                                                        |
| `[`  | `[`(`, `{`, `[`]`            | Push `[`.                                                        |
| `]`  | `[`(`, `{`]`                | `]` is closing. Stack not empty. Pop `[`. Match `[` with `]`. OK. |
| `}`  | `[`(`]`                    | `}` is closing. Stack not empty. Pop `{`. Match `{` with `}`. OK. |
| `)`  | `[]`                         | `)` is closing. Stack not empty. Pop `(`. Match `(` with `)`. OK. |
| (End)| `[]`                         | Stack is empty. String is valid.                                 |

**Time Complexity:** O(N), where N is the length of the input string `s`. Each character is processed exactly once, involving constant time stack operations (push, pop, peek, empty check).
**Space Complexity:** O(N) in the worst case. This occurs when all characters are opening brackets (e.g., `"((((("`), in which case the stack will store N/2 elements. In the best case (e.g., `""` or `"()"`), it's O(1).

**Edge Cases & Gotchas:**
*   **Empty string:** Should be considered valid. Our algorithm handles this (stack remains empty, returns `True`).
*   **String with only one type of bracket:** `((` or `))`. Handled.
*   **Mismatched types:** `([)]`. Handled.
*   **Unclosed brackets:** `({`. Handled.
*   **Unopened brackets:** `})`. Handled.

**Interview Tips & Variations:**
*   **Clarify requirements:** Ask about valid characters, empty string, `null` input, maximum length.
*   **Alternative (incorrect) approach:** Mentioning a counter-based approach (e.g., count `(` and `)` separately) and explaining why it fails for nesting (`([)]`) demonstrates deeper understanding. (See `is_valid_parentheses_naive` in `stack_queue_problems.py`).
*   **Variations:**
    *   Only one type of bracket (e.g., `()`): Simpler, just a counter.
    *   Allow other characters (e.g., `foo(bar)`): Ignore non-bracket characters.
    *   Return the index of the first invalid character.
    *   Generate all valid parentheses combinations of length `2n`. (This is a different problem, often solved with recursion/backtracking, sometimes involving a stack implicitly).

## 2. Min Stack

**Problem Statement:** Design a stack that supports `push`, `pop`, `top`, and `getMin` operations in O(1) time complexity.

### Optimal Solution: Using an Auxiliary Stack

**Core Idea:**
The challenge is `getMin()` in O(1). A regular stack's `getMin()` would require O(N) scan. The solution is to maintain the minimum value seen so far as elements are pushed and popped. An auxiliary stack (let's call it `min_stack`) can help achieve this.

**Algorithm Steps:**
1.  **Initialize two stacks:**
    *   `main_stack`: Stores all elements of the stack.
    *   `min_stack`: Stores the minimum element encountered *up to the current point* in the `main_stack`.
2.  **`push(val)`:**
    *   Push `val` onto `main_stack`.
    *   **Crucial step for `min_stack`:**
        *   If `min_stack` is empty OR `val` is less than or equal to the top element of `min_stack`, then push `val` onto `min_stack`.
        *   **Why "less than or equal to"?** If `val` is equal to the current minimum, we still push it to `min_stack`. This handles duplicate minimums correctly. If we only pushed strictly smaller values, and the current minimum was popped, we wouldn't know if there was another instance of that minimum further down.
3.  **`pop()`:**
    *   Pop `popped_val` from `main_stack`.
    *   **Crucial step for `min_stack`:**
        *   If `popped_val` is equal to the top element of `min_stack`, then also pop from `min_stack`.
        *   This ensures `min_stack` accurately reflects the minimum of the *remaining* elements in `main_stack`.
4.  **`top()`:**
    *   Return the top element of `main_stack`.
5.  **`getMin()`:**
    *   Return the top element of `min_stack`.

**Example Walkthrough:**

Let's trace `MinStack`: `push(-2)`, `push(0)`, `push(-3)`, `getMin()`, `pop()`, `top()`, `getMin()`

| Operation        | `main_stack`    | `min_stack`   | `getMin()` | `top()` | Explanation                                                    |
| :--------------- | :-------------- | :------------ | :--------- | :------ | :------------------------------------------------------------- |
| `push(-2)`       | `[-2]`          | `[-2]`        |            |         | -2 is min                                                      |
| `push(0)`        | `[-2, 0]`       | `[-2]`        |            |         | 0 > -2, so min_stack unchanged                                 |
| `push(-3)`       | `[-2, 0, -3]`   | `[-2, -3]`    |            |         | -3 < -2, new min. push -3 to min_stack                         |
| `getMin()`       | `[-2, 0, -3]`   | `[-2, -3]`    | `-3`       |         | Return top of min_stack                                        |
| `pop()`          | `[-2, 0]`       | `[-2]`        |            |         | Pop -3 from main. Since -3 == min_stack.top(), pop -3 from min_stack too. |
| `top()`          | `[-2, 0]`       | `[-2]`        |            | `0`     | Return top of main_stack                                       |
| `getMin()`       | `[-2, 0]`       | `[-2]`        | `-2`       |         | Return top of min_stack                                        |

**Time Complexity:** All operations (`push`, `pop`, `top`, `getMin`) are O(1). Each operation involves at most two constant-time list operations (append, pop, peek).
**Space Complexity:** O(N) in the worst case. If elements are pushed in strictly decreasing order (e.g., `5, 4, 3, 2, 1`), then `min_stack` will grow to the same size as `main_stack`. In the best case (strictly increasing order), `min_stack` might only store one element.

**Alternative Approach (Tuple in a Single Stack):**
Instead of two separate stacks, you could store tuples `(value, current_min)` in a single stack. When you push `val`, you calculate the new `current_min` (which is `min(val, stack.top().min)`) and push `(val, new_min)`. This works, but potentially uses slightly more memory per element due to tuple overhead and storing min at every level. The two-stack approach often feels cleaner. (See `MinStackTuple` in `stack_queue_problems.py`).

**Edge Cases & Gotchas:**
*   **Empty stack operations:** `pop()`, `top()`, `getMin()` on an empty stack should typically raise an error or return a default value (e.g., `None`). The provided solution raises `IndexError`.
*   **Duplicate minimums:** As discussed, pushing `val <= min_stack[-1]` is crucial for correctness.
*   **Integer limits:** If dealing with very large or small integers, be mindful of overflow if using fixed-size integers in other languages, or `float('inf')` for initial `current_min` calculations.

**Interview Tips & Variations:**
*   **Clarify O(1):** Emphasize that it's amortized O(1) for Python lists, but practically considered O(1).
*   **Discuss space-time tradeoff:** The two-stack approach sacrifices some space for O(1) time.
*   **Variations:**
    *   `getMax()` in O(1) - Similar logic, use a `max_stack`.
    *   `getMedian()` in O(1) - Much harder, typically uses two heaps (min-heap and max-heap).

## 3. Implement Queue using Stacks

**Problem Statement:** Implement a FIFO queue using only two stacks.

### Optimal Solution: Two Stacks (`input_stack`, `output_stack`)

**Core Idea:**
Stacks are LIFO, queues are FIFO. To achieve FIFO using LIFO, we need a mechanism to reverse the order of elements. Two stacks can do this efficiently. One stack (`input_stack`) acts as an "inbox" for new elements. The other (`output_stack`) acts as an "outbox" from which elements are dequeued.

**Algorithm Steps:**
1.  **Initialize two stacks:**
    *   `input_stack`: Used for `push` operations (enqueue).
    *   `output_stack`: Used for `pop` and `peek` operations (dequeue and look at front).
2.  **`_transfer_if_needed()` (Helper Method):**
    *   This is the core logic. Before any `pop` or `peek` operation, check if `output_stack` is empty.
    *   If `output_stack` is empty, move *all* elements from `input_stack` to `output_stack`. This reversal effectively puts the oldest elements (which are at the bottom of `input_stack`) on top of `output_stack`.
    *   Example: `input_stack = [1, 2, 3]` (1 is oldest). `output_stack = []`.
        *   Pop 3 from `input_stack`, push to `output_stack`. `input_stack = [1, 2]`, `output_stack = [3]`.
        *   Pop 2 from `input_stack`, push to `output_stack`. `input_stack = [1]`, `output_stack = [3, 2]`.
        *   Pop 1 from `input_stack`, push to `output_stack`. `input_stack = []`, `output_stack = [3, 2, 1]`.
        Now, 1 (the oldest) is at the top of `output_stack`.
3.  **`push(x)`:**
    *   Simply append `x` to `input_stack`. This is an O(1) operation.
4.  **`pop()`:**
    *   Call `_transfer_if_needed()`. This ensures `output_stack` is ready with elements in FIFO order.
    *   If `output_stack` is still empty (meaning the queue was empty), raise an `IndexError`.
    *   Pop and return the top element from `output_stack`.
5.  **`peek()`:**
    *   Call `_transfer_if_needed()`.
    *   If `output_stack` is still empty, raise an `IndexError`.
    *   Return the top element of `output_stack` without removing it.
6.  **`empty()`:**
    *   Return `True` if both `input_stack` and `output_stack` are empty. Otherwise, `False`.

**Example Walkthrough:**

Let's trace `MyQueue`: `push(1)`, `push(2)`, `peek()`, `pop()`, `push(3)`, `pop()`, `pop()`

| Operation | `input_stack` | `output_stack` | `peek()`/`pop()` result | Explanation                                       |
| :-------- | :------------ | :------------- | :---------------------- | :------------------------------------------------ |
| `push(1)` | `[1]`         | `[]`           |                         |                                                   |
| `push(2)` | `[1, 2]`      | `[]`           |                         |                                                   |
| `peek()`  | `[]`          | `[2, 1]`       | `1`                     | `output_stack` was empty, transfer. `1` is now top. |
| `pop()`   | `[]`          | `[2]`          | `1`                     | Pop `1` from `output_stack`.                      |
| `push(3)` | `[3]`         | `[2]`          |                         |                                                   |
| `pop()`   | `[]`          | `[3, 2]`       | `2`                     | `output_stack` not empty. Pop `2`.                |
|           |               |                |                         | `output_stack` now empty. Transfer `3`.           |
| `pop()`   | `[]`          | `[]`           | `3`                     | Pop `3`.                                          |

**Time Complexity:**
*   `push`: O(1) amortized. (Python list append).
*   `pop`: O(1) amortized. While a single `pop` operation might involve an O(N) transfer if `output_stack` is empty, each element is pushed into `input_stack` once and then popped from `input_stack` and pushed into `output_stack` once, and finally popped from `output_stack` once. This means each element undergoes a constant number of stack operations over its lifetime. Summing up costs for N elements, total is O(N), so amortized average is O(1) per operation.
*   `peek`: O(1) amortized (same reasoning as `pop`).
*   `empty`: O(1).
**Space Complexity:** O(N) for storing N elements across both `input_stack` and `output_stack`.

**Edge Cases & Gotchas:**
*   Operations on an empty queue. Handled by raising `IndexError`.
*   Interleaving `push` and `pop` operations frequently. The amortized analysis holds.

**Interview Tips & Variations:**
*   **Emphasize amortized time complexity:** This is a key point for this solution.
*   **Explain the role of the two stacks:** One for inflow, one for outflow.
*   **Discuss why `collections.deque` is a better choice for actual Python queues.** (O(1) `append` and `popleft`).
*   **Variations:**
    *   Implement stack using queues (see next problem).
    *   Implement a double-ended queue (deque) using two stacks (more complex).

## 4. Implement Stack using Queues

**Problem Statement:** Implement a LIFO stack using only queues.

### Optimal Solution: One Queue (with Expensive Push)

**Core Idea:**
This is the inverse of the previous problem. We need to achieve LIFO behavior using FIFO queues. The standard way to do this with queues involves making one of the operations (`push` or `pop`) more expensive by moving elements.

**We will implement the "Expensive Push" approach:**

**Algorithm Steps (using `collections.deque` for efficient queue operations):**
1.  **Initialize one queue:**
    *   `q`: A `collections.deque` instance will be used as our main queue. It offers O(1) `append` (enqueue) and O(1) `popleft` (dequeue from front).
2.  **`push(x)`:** (This is the expensive operation)
    *   **Enqueue `x`:** Add `x` to the back of `q`.
    *   **Rotate elements:** To make `x` the "top" of the stack (i.e., the next element to be dequeued), we need to move all elements that were *previously* in the queue from the front to the back.
        *   Loop `len(q) - 1` times:
            *   Dequeue an element from the front of `q`.
            *   Enqueue it back to the rear of `q`.
    *   After this loop, `x` (the newly added element) will be at the front of the queue, making it the "top" for LIFO.
3.  **`pop()`:**
    *   Since `push` ensured the top element is at the front of `q`, simply dequeue (pop from left) from `q`. This is an O(1) operation.
4.  **`top()`:**
    *   Since `push` ensured the top element is at the front of `q`, simply peek (look at `q[0]`) at the front of `q`. This is an O(1) operation.
5.  **`empty()`:**
    *   Return `True` if `q` is empty. Otherwise, `False`.

**Example Walkthrough:**

Let's trace `MyStack` (expensive push): `push(1)`, `push(2)`, `top()`, `pop()`, `push(3)`, `pop()`, `pop()`

| Operation | `q` (state after op) | `top()`/`pop()` result | Explanation                                                               |
| :-------- | :------------------- | :--------------------- | :------------------------------------------------------------------------ |
| `push(1)` | `[1]`                |                        | Add 1. No rotation needed (len-1 = 0).                                    |
| `push(2)` | `[2, 1]`             |                        | Add 2 (`[1, 2]`). Rotate 1 element: pop 1, append 1. `[2, 1]`. `2` is now top. |
| `top()`   | `[2, 1]`             | `2`                    | Peek at front of `q`.                                                     |
| `pop()`   | `[1]`                | `2`                    | Pop from front of `q`.                                                    |
| `push(3)` | `[3, 1]`             |                        | Add 3 (`[1, 3]`). Rotate 1 element: pop 1, append 1. `[3, 1]`. `3` is now top. |
| `pop()`   | `[1]`                | `3`                    | Pop from front of `q`.                                                    |
| `pop()`   | `[]`                 | `1`                    | Pop from front of `q`.                                                    |

**Time Complexity (Expensive Push):**
*   `push`: O(N) where N is the current number of elements in the stack. This is because N-1 elements are dequeued and re-enqueued.
*   `pop`: O(1) (simple dequeue).
*   `top`: O(1) (simple peek).
*   `empty`: O(1).
**Space Complexity:** O(N) for storing N elements in the single queue.

**Alternative Approach (Expensive Pop - using two queues):**
1.  **`push(x)`:** Simply enqueue `x` into `q1`. O(1).
2.  **`pop()`:**
    *   Move all elements except the last one from `q1` to `q2`.
    *   The last element remaining in `q1` is the actual top of the stack. Dequeue it and return.
    *   Swap `q1` and `q2` (i.e., `q1 = q2`, `q2 = new empty deque`).
    *   This takes O(N) as N-1 elements are moved.
3.  **`top()`:** Same as `pop()`, but after identifying the top element, enqueue it back to `q2` before swapping queues. Also O(N).

**Interview Tips & Variations:**
*   **Discuss the trade-offs:** Expensive push vs. expensive pop. Generally, O(N) push with O(1) pop/top is preferred if pop/top are more frequent, or vice-versa.
*   **`collections.deque` is key for Python:** Explain why you'd use it over `src/custom_queue.py`'s `pop(0)`.
*   **Emphasize LIFO with FIFO constraints:** Clearly explain how the rotation achieves this.

## 5. Daily Temperatures

**Problem Statement:** Given daily temperatures, return an array `answer` where `answer[i]` is the number of days until a warmer temperature occurs.

### Optimal Solution: Using a Monotonic Stack

**Core Idea:**
For each day `i`, we are looking for the *first* future day `j > i` such that `temperatures[j] > temperatures[i]`. This "first future" property is a strong hint for using a stack. Specifically, a *monotonic stack* (in this case, decreasing) is very effective.
A decreasing monotonic stack will store indices `i` such that `temperatures[i]` is decreasing. When we encounter a `temperatures[current_index]` that is *warmer* than `temperatures[stack.top()]`, it means we've found the warmer day for `stack.top()`.

**Algorithm Steps:**
1.  **Initialize `answer` array:** Create an `answer` array of the same length as `temperatures`, initialized with zeros. `answer[i]` will store the waiting days for `temperatures[i]`.
2.  **Initialize an empty stack:** This stack will store *indices* of days for which we haven't yet found a warmer temperature. It will maintain a *decreasing* sequence of temperatures corresponding to these indices.
3.  **Iterate through `temperatures` with index `i`:**
    *   **Current temperature:** `current_temp = temperatures[i]`
    *   **Process stack (while conditions met):**
        *   While the stack is *not* empty AND `current_temp` is *warmer* than `temperatures[stack[-1]]` (the temperature of the day at the top of the stack):
            *   Pop `prev_index = stack.pop()`. This `prev_index` is a day for which we just found its first warmer day (`i`).
            *   Calculate the waiting days: `answer[prev_index] = i - prev_index`.
    *   **Push current index:** After processing all days in the stack that are cooler than `current_temp`, push the current index `i` onto the stack. This maintains the decreasing property (or adds `i` if `current_temp` is not warmer than `stack.top()`, or if the stack is empty).
4.  **Return `answer`:** After the loop finishes, any indices remaining in the stack have no warmer future day, and their `answer` values correctly remain 0 (from initialization).

**Example Walkthrough (for `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`):**

| i | `T[i]` | Stack (Indices) | `answer` array                                    | Explanation                                                                         |
| :- | :----- | :-------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------- |
| 0 | 73     | `[0]`           | `[0,0,0,0,0,0,0,0]`                               | Push `0` (temp 73).                                                                 |
| 1 | 74     | `[1]`           | `[1,0,0,0,0,0,0,0]`                               | `T[0]` (73) < `T[1]` (74). Pop `0`. `answer[0] = 1-0 = 1`. Push `1` (temp 74).           |
| 2 | 75     | `[2]`           | `[1,1,0,0,0,0,0,0]`                               | `T[1]` (74) < `T[2]` (75). Pop `1`. `answer[1] = 2-1 = 1`. Push `2` (temp 75).           |
| 3 | 71     | `[2, 3]`        | `[1,1,0,0,0,0,0,0]`                               | `T[2]` (75) > `T[3]` (71). Push `3` (temp 71). Stack: [idx for 75, idx for 71]      |
| 4 | 69     | `[2, 3, 4]`     | `[1,1,0,0,0,0,0,0]`                               | `T[3]` (71) > `T[4]` (69). Push `4` (temp 69). Stack: [idx for 75, 71, 69]          |
| 5 | 72     | `[2, 5]`        | `[1,1,0,2,1,0,0,0]`                               | `T[4]` (69) < `T[5]` (72). Pop `4`. `answer[4] = 5-4 = 1`.                         |
|   |        |                 |                                                   | `T[3]` (71) < `T[5]` (72). Pop `3`. `answer[3] = 5-3 = 2`.                         |
|   |        |                 |                                                   | `T[2]` (75) > `T[5]` (72). No pop. Push `5` (temp 72). Stack: [idx for 75, 72]      |
| 6 | 76     | `[6]`           | `[1,1,4,2,1,1,0,0]`                               | `T[5]` (72) < `T[6]` (76). Pop `5`. `answer[5] = 6-5 = 1`.                         |
|   |        |                 |                                                   | `T[2]` (75) < `T[6]` (76). Pop `2`. `answer[2] = 6-2 = 4`.                         |
|   |        |                 |                                                   | Stack empty. Push `6` (temp 76). Stack: [idx for 76]                               |
| 7 | 73     | `[6, 7]`        | `[1,1,4,2,1,1,0,0]`                               | `T[6]` (76) > `T[7]` (73). No pop. Push `7` (temp 73). Stack: [idx for 76, 73]      |
| (End)|     | `[6, 7]`        | `[1,1,4,2,1,1,0,0]`                               | Remaining indices `6, 7` have no warmer days; `answer[6]` and `answer[7]` remain `0`. |

**Time Complexity:** O(N), where N is the number of temperatures. Each index is pushed onto the stack once and popped from the stack at most once. All other operations are constant time.
**Space Complexity:** O(N) in the worst case. If `temperatures` are strictly decreasing (e.g., `[100, 90, 80, ..., 10]`), all indices will be pushed onto the stack and remain there until the end, resulting in a stack size of N.

### Brute Force Solution: Nested Loops

**Core Idea:**
For each day, iterate through all subsequent days to find the first warmer one.

**Algorithm Steps:**
1.  Initialize `answer` array of length N with zeros.
2.  Outer loop: Iterate with `i` from `0` to `N-1`.
3.  Inner loop: Iterate with `j` from `i+1` to `N-1`.
    *   If `temperatures[j] > temperatures[i]`:
        *   `answer[i] = j - i`.
        *   Break the inner loop (found the first warmer day).
4.  Return `answer`.

**Time Complexity (Brute Force):** O(N^2). The nested loops mean for each of N days, we potentially scan N-1 subsequent days.
**Space Complexity (Brute Force):** O(N) for the `answer` array.

**Comparison:**
The brute force solution is simple to understand but significantly slower for large inputs (e.g., N=100,000, N^2 = 10^10 operations, too slow). The monotonic stack optimizes this to O(N) by cleverly avoiding redundant comparisons.

**Edge Cases & Gotchas:**
*   **Empty input:** `[]` -> `[]`. Handled.
*   **Single element input:** `[70]` -> `[0]`. Handled.
*   **All temperatures decreasing:** `[70, 60, 50]` -> `[0, 0, 0]`. Handled. Stack will grow to full size.
*   **All temperatures increasing:** `[50, 60, 70]` -> `[1, 1, 0]`. Handled. Stack will have minimal elements (pushed and immediately popped).
*   **Temperatures can be same:** `[70, 70, 70, 80]` -> `[3, 2, 1, 0]`. `>` condition ensures "strictly warmer."

**Interview Tips & Variations:**
*   **Recognizing monotonic stack patterns:** Look for problems asking for "next greater element," "previous smaller element," "first element to the left/right that satisfies a condition."
*   **Explain why it's O(N):** Crucial for showing deep understanding of stack amortized analysis.
*   **Variations:**
    *   **Next Greater Element I/II:** Classic problems, very similar.
    *   **Largest Rectangle in Histogram:** More complex monotonic stack application.
    *   `Previous Smaller Element`, `Next Smaller Element`.
    *   Return indices instead of waiting days.
    *   Return the temperature itself.

---
This document covers the algorithmic aspects. For visual diagrams, refer to `docs/diagrams.md`.
For actual code, refer to `src/stack_queue_problems.py`.
For tests, refer to `tests/test_stack_queue_problems.py` and `tests/test_performance.py`.