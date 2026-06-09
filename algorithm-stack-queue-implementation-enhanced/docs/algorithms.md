# Detailed Algorithms for Stack & Queue Problems

This document provides in-depth explanations of the optimal solutions for each problem, including their logic, step-by-step walkthroughs, and why they achieve optimal time and space complexity.

---

## Problem 1: Valid Parentheses

**Problem Statement:** Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid. A string is valid if brackets are closed by the same type and in the correct order.

### Optimal Solution: Using a Stack

**Approach:**
The core idea is that when we encounter an opening bracket, we expect a specific closing bracket later. A stack is perfect for this "last-in, first-out" matching.

1.  **Initialize a Stack:** Create an empty list to act as a stack.
2.  **Define a Mapping:** Create a dictionary that maps each closing bracket to its corresponding opening bracket (e.g., `')': '('`, `'}': '{`, `']': '['`). This allows for quick lookup.
3.  **Iterate Through the String:**
    *   **If `char` is an opening bracket:** Push it onto the stack.
    *   **If `char` is a closing bracket:**
        *   Check if the stack is empty. If it is, this closing bracket has no corresponding opening bracket, so the string is invalid. Return `False`.
        *   Pop the top element from the stack.
        *   Compare the popped element with the expected opening bracket (obtained from the `mapping` using the current `char`). If they don't match, the brackets are mismatched, so the string is invalid. Return `False`.
4.  **Final Check:** After iterating through the entire string, if the stack is empty, it means all opening brackets have been correctly matched by their corresponding closing brackets. If the stack is not empty, there are unmatched opening brackets, so the string is invalid. Return `True` if empty, `False` otherwise.

**Time Complexity:** O(N), where N is the length of the string `s`. Each character is processed exactly once (pushed or popped from the stack, or checked against the stack top), and stack operations (push, pop, peek, is_empty) take O(1) time.

**Space Complexity:** O(N) in the worst case. For example, a string like "(((((" would push all N opening brackets onto the stack. In the best case (e.g., "()[]{}"), the stack depth remains small, effectively O(1).

**Example Walkthrough for "([{}])"**:

1.  `s = "([{}])"`, `stack = []`, `mapping = {')': '(', '}': '{', ']': '['}`
2.  `char = '('`: `stack.append('(')` -> `stack = ['(']`
3.  `char = '['`: `stack.append('[')` -> `stack = ['(', '[']`
4.  `char = '{'`: `stack.append('{')` -> `stack = ['(', '[', '{']`
5.  `char = '}'`: It's a closing bracket.
    *   `stack` is not empty. `stack.pop()` -> `'{}'`. `stack = ['(', '[']`
    *   `mapping['}']` is `'{}'`. Popped `'{}'` matches `'{}'`. Continue.
6.  `char = ']'`: It's a closing bracket.
    *   `stack` is not empty. `stack.pop()` -> `'['`. `stack = ['(']`
    *   `mapping[']']` is `'['`. Popped `'['` matches `'['`. Continue.
7.  `char = ')'`: It's a closing bracket.
    *   `stack` is not empty. `stack.pop()` -> `'('`. `stack = []`
    *   `mapping[')']` is `'('`. Popped `'('` matches `'('`. Continue.
8.  End of string. `stack` is empty. Return `True`.

---

## Problem 2: Min Stack

**Problem Statement:** Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.

### Optimal Solution: Storing (value, current_min) Tuples

**Approach:**
The challenge is to get the minimum element in O(1) time. A standard stack `min()` operation is O(N). To achieve O(1), we need to store information about the minimum *with each element* or in an auxiliary structure.

This approach modifies the main stack to store not just the value, but a pair: `(value, current_minimum_up_to_this_point)`.

1.  **Initialize the Stack:** The main stack `self.stack` will store tuples `(val, min_val_at_this_level)`.
2.  **`push(val)`:**
    *   If `self.stack` is empty, the `val` is the first element, so it's also the current minimum. Push `(val, val)`.
    *   If `self.stack` is not empty, the `current_min_at_this_level` will be the minimum of `val` and the `min_val_at_this_level` of the element currently at the top of the stack (`self.stack[-1][1]`). Push `(val, min(val, self.stack[-1][1]))`.
3.  **`pop()`:** Simply pop the top tuple from `self.stack`. This works because when an element is popped, the minimum of the stack is now represented by the minimum value stored in the new top element.
4.  **`top()`:** Return the value part of the top tuple: `self.stack[-1][0]`.
5.  **`getMin()`:** Return the minimum part of the top tuple: `self.stack[-1][1]`.

**Time Complexity:** All operations (`push`, `pop`, `top`, `getMin`) are O(1) because they involve constant-time list operations (append, pop, accessing last element).

**Space Complexity:** O(N), where N is the number of elements in the stack. Each element pushed requires storing two integers (the value and the current minimum).

**Alternative Solution: Using an Auxiliary Minimum Stack**

**Approach:**
Instead of storing tuples, we can use two separate stacks: a `main_stack` for all elements and a `min_stack` to specifically track minimums.

1.  **Initialize `main_stack` and `min_stack`:** Both are empty lists.
2.  **`push(val)`:**
    *   Push `val` onto `main_stack`.
    *   If `min_stack` is empty, or `val` is less than or equal to the top of `min_stack`, push `val` onto `min_stack`. (It's crucial to use `<=` to handle duplicate minimums correctly, so popping a minimum doesn't break `getMin` if another instance of that minimum still exists.)
3.  **`pop()`:**
    *   Pop `popped_val` from `main_stack`.
    *   If `popped_val` is equal to the top of `min_stack`, then pop from `min_stack` as well.
4.  **`top()`:** Return `main_stack[-1]`.
5.  **`getMin()`:** Return `min_stack[-1]`.

**Time Complexity:** All operations are O(1).
**Space Complexity:** O(N) in the worst case. If the input is a strictly decreasing sequence (e.g., `5, 4, 3, 2, 1`), then `min_stack` will also store all N elements, making the total space 2N, or O(N). In the best case (e.g., `1, 2, 3, 4, 5`), `min_stack` might only store one element, making its contribution O(1).

Both solutions are optimal in terms of time complexity. The tuple-based approach might have slightly better constant factors for space if there are many non-minimum elements. The auxiliary stack approach might be slightly clearer conceptually for some.

---

## Problem 3: Implement Queue using Stacks

**Problem Statement:** Implement a first-in-first-out (FIFO) queue using only two stacks.

### Optimal Solution: Two-Stack Approach with Amortized O(1) Operations

**Approach:**
This classic problem demonstrates how to simulate queue behavior (FIFO) using LIFO stacks. The trick is to use two stacks:

1.  **`input_stack` (or `s1`):** Used primarily for `push` operations. New elements are always pushed onto this stack.
2.  **`output_stack` (or `s2`):** Used primarily for `pop` and `peek` operations. Elements are moved from `input_stack` to `output_stack` when needed for retrieval.

**Algorithm:**

*   **`push(x)`:**
    *   Simply append `x` to `input_stack`. This is an O(1) operation.

*   **`pop()`:**
    *   **Ensure `output_stack` is ready:** Before popping, check if `output_stack` is empty.
    *   If `output_stack` is empty, transfer all elements from `input_stack` to `output_stack`. This is done by repeatedly popping from `input_stack` and pushing onto `output_stack`. This reverses the order of elements, so the oldest element in the `input_stack` (which was at the bottom) becomes the top of `output_stack`.
    *   Once `output_stack` is populated (or was already not empty), pop its top element. This is the true FIFO element.
    *   If `output_stack` is empty *after* attempting to transfer elements (meaning `input_stack` was also empty), the queue is empty.
*   **`peek()`:**
    *   Similar to `pop()`, but instead of removing the element, just return the top element of `output_stack`.
    *   First, ensure `output_stack` is ready by calling the transfer logic.
*   **`empty()`:**
    *   The queue is empty if and only if both `input_stack` and `output_stack` are empty.

**Time Complexity:**
*   **`push`:** O(1).
*   **`pop`, `peek`:** Amortized O(1).
    *   A single `pop` or `peek` operation might take O(N) in the worst case (when `output_stack` is empty and N elements need to be transferred from `input_stack`).
    *   However, consider a sequence of M operations. Each element is pushed onto `input_stack` once, moved from `input_stack` to `output_stack` once, and popped from `output_stack` once. This means each element undergoes a constant number of stack operations. Thus, the total time for M operations is O(M), making the amortized time per operation O(1).
*   **`empty`:** O(1).

**Space Complexity:** O(N), where N is the total number of elements currently in the queue. All elements are stored across the two stacks.

**Example Walkthrough:**

Initial: `input_stack = []`, `output_stack = []`

1.  **`push(1)`**: `input_stack = [1]`, `output_stack = []`
2.  **`push(2)`**: `input_stack = [1, 2]`, `output_stack = []`
3.  **`push(3)`**: `input_stack = [1, 2, 3]`, `output_stack = []`
4.  **`pop()`**:
    *   `output_stack` is empty.
    *   Transfer `input_stack` to `output_stack`:
        *   `input_stack.pop()` (3) -> `output_stack.append(3)`
        *   `input_stack.pop()` (2) -> `output_stack.append(2)`
        *   `input_stack.pop()` (1) -> `output_stack.append(1)`
    *   Now: `input_stack = []`, `output_stack = [3, 2, 1]`
    *   `output_stack.pop()` -> returns `1`.
    *   Final: `input_stack = []`, `output_stack = [3, 2]`
5.  **`peek()`**:
    *   `output_stack` is NOT empty.
    *   Return `output_stack[-1]` -> returns `2`.
    *   Final: `input_stack = []`, `output_stack = [3, 2]`
6.  **`push(4)`**: `input_stack = [4]`, `output_stack = [3, 2]`
7.  **`pop()`**:
    *   `output_stack` is NOT empty.
    *   `output_stack.pop()` -> returns `2`.
    *   Final: `input_stack = [4]`, `output_stack = [3]`

---

## Problem 4: Sliding Window Maximum

**Problem Statement:** Given an array `nums` and a sliding window size `k`, return the maximum value in each sliding window.

### Optimal Solution: Monotonic Deque (Double-Ended Queue)

**Approach:**
A deque is ideal for maintaining a "monotonic queue" (or "deque"). This deque will store indices of elements from the current window, in decreasing order of their values. The element at the front of the deque will always correspond to the maximum value in the current window.

**Algorithm:**

1.  **Initialization:**
    *   Handle edge cases: empty `nums`, `k=0`, `k=1` (return `nums` itself).
    *   `result = []` to store the maximums.
    *   `dq = collections.deque()` to store indices.

2.  **Iterate through `nums` with index `i`:**
    *   **Remove indices out of window:** If the index at the front of the `dq` (`dq[0]`) is `i - k`, it means this element is now outside the current window. Pop it from the left (`dq.popleft()`).
    *   **Maintain decreasing order:** While `dq` is not empty AND the value at the index `dq[-1]` (`nums[dq[-1]]`) is less than the current value `nums[i]`:
        *   These smaller elements from the back of the deque can never be the maximum of *any future window* as long as `nums[i]` (which is greater and appears later) is still in consideration. Pop them from the right (`dq.pop()`).
    *   **Add current index:** Append the current index `i` to the right of `dq` (`dq.append(i)`).
    *   **Record maximum:** If `i` is greater than or equal to `k - 1` (meaning the window has fully formed), the maximum for the current window is `nums[dq[0]]`. Add this to `result`.

**Time Complexity:** O(N), where N is the length of `nums`. Each element is added to the deque and removed from the deque at most once.

**Space Complexity:** O(k), as the deque will store at most `k` elements (indices) at any given time.

**Example Walkthrough for `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`**

Initial: `result = []`, `dq = deque()`

| i | num | dq (indices)                                      | Action                                                                                                                                                                                                                                                                                           | result |
|---|-----|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| 0 | 1   | `[]`                                              | `dq.append(0)`                                                                                                                                                                                                                                                                                   | `[]`   |
| 1 | 3   | `[0]`                                             | `nums[dq[-1]] (nums[0]=1) < nums[1]=3` -> `dq.pop()`. `dq` is now `[]`. `dq.append(1)`                                                                                                                                                                                                           | `[]`   |
| 2 | -1  | `[1]`                                             | `nums[dq[-1]] (nums[1]=3) !< nums[2]=-1`. `dq.append(2)`. Window formed (`i=2 >= k-1=2`). Add `nums[dq[0]] (nums[1]=3)` to result.                                                                                                                                                              | `[3]`  |
| 3 | -3  | `[1, 2]` (`nums[1]=3, nums[2]=-1`)                | `dq[0] (1) != i-k (0)`. `nums[dq[-1]] (nums[2]=-1) !< nums[3]=-3`. `dq.append(3)`. Window formed. Add `nums[dq[0]] (nums[1]=3)` to result.                                                                                                                                                         | `[3, 3]` |
| 4 | 5   | `[1, 2, 3]` (`nums[1]=3, nums[2]=-1, nums[3]=-3`) | `dq[0] (1) != i-k (1)`. `dq.popleft()` as `dq[0]` is `1` and `i-k` is `4-3=1`. `dq` is `[2, 3]`. `nums[dq[-1]] (nums[3]=-3) < nums[4]=5` -> `dq.pop()`. `dq` is `[2]`. `nums[dq[-1]] (nums[2]=-1) < nums[4]=5` -> `dq.pop()`. `dq` is `[]`. `dq.append(4)`. Window formed. Add `nums[dq[0]] (nums[4]=5)` to result. | `[3, 3, 5]` |
| 5 | 3   | `[4]` (`nums[4]=5`)                               | `dq[0] (4) != i-k (2)`. `nums[dq[-1]] (nums[4]=5) !< nums[5]=3`. `dq.append(5)`. Window formed. Add `nums[dq[0]] (nums[4]=5)` to result.                                                                                                                                                         | `[3, 3, 5, 5]` |
| 6 | 6   | `[4, 5]` (`nums[4]=5, nums[5]=3`)                 | `dq[0] (4) == i-k (3)`. `dq.popleft()`. `dq` is `[5]`. `nums[dq[-1]] (nums[5]=3) < nums[6]=6` -> `dq.pop()`. `dq` is `[]`. `dq.append(6)`. Window formed. Add `nums[dq[0]] (nums[6]=6)` to result.                                                                                             | `[3, 3, 5, 5, 6]` |
| 7 | 7   | `[6]` (`nums[6]=6`)                               | `dq[0] (6) != i-k (4)`. `nums[dq[-1]] (nums[6]=6) < nums[7]=7` -> `dq.pop()`. `dq` is `[]`. `dq.append(7)`. Window formed. Add `nums[dq[0]] (nums[7]=7)` to result.                                                                                                                             | `[3, 3, 5, 5, 6, 7]` |

Final `result = [3, 3, 5, 5, 6, 7]`

---

## Problem 5: Next Greater Element (Circular Array)

**Problem Statement:** Given a circular integer array `nums`, return the next greater element for every element. The next greater element of `x` is the first greater number to its traversing next in the array, circularly. If it does not exist, return -1.

### Optimal Solution: Monotonic Stack (Iterating Twice)

**Approach:**
This problem uses a monotonic stack (specifically, a decreasing stack) to find the next greater element efficiently. The circular nature means we might need to "wrap around" the array.

**Algorithm:**

1.  **Initialization:**
    *   `n = len(nums)`. If `n == 0`, return `[]`.
    *   `result = [-1] * n`. Initialize all results to -1, as this is the default if no NGE is found.
    *   `stack = []` (stores indices). This stack will store indices of elements for which we haven't yet found a next greater element. Elements in the stack will be in decreasing order of their values.

2.  **Iterate Twice (Virtually):**
    *   The key to handling circularity is to iterate `2 * n` times. This effectively processes the array twice. We use `i % n` to get the actual index in `nums`.
    *   For `i` from `0` to `2 * n - 1`:
        *   `current_idx = i % n`
        *   `current_num = nums[current_idx]`

3.  **Process `current_num` with the stack:**
    *   **Pop smaller elements:** While the `stack` is not empty AND the element `nums[stack[-1]]` (value at the index at the top of the stack) is less than `current_num`:
        *   This means `current_num` is the Next Greater Element for `nums[stack[-1]]`.
        *   Pop `popped_idx = stack.pop()`.
        *   Set `result[popped_idx] = current_num`.
    *   **Push current index (first pass only):** If `i < n` (i.e., we are in the *first* pass over the original array indices), push `current_idx` onto the `stack`.
        *   This is crucial: we only push each original index onto the stack once. If we pushed it in the second pass, it might overwrite a valid `result` found in the second pass for an element from the first pass, or create incorrect results for already-processed elements.
        *   Elements from the first pass might find their NGE in the first pass or the second pass. Elements from the second pass are only relevant for finding NGEs for elements *already on the stack* from the first pass.

4.  **Final Result:** After the loop, the `result` array contains the next greater element for each original index. Any elements still on the `stack` at the end do not have a next greater element (even circularly), so their `result` value remains -1 (as initialized).

**Time Complexity:** O(N), where N is the length of `nums`. Each element's index is pushed onto the stack at most once (during the first pass `i < n`) and popped from the stack at most once. We iterate roughly `2N` times.

**Space Complexity:** O(N) in the worst case (e.g., a strictly decreasing array like `[5, 4, 3, 2, 1]`), where all N indices might be stored in the stack before finding their NGEs.

**Example Walkthrough for `nums = [13, 7, 6, 12]`**
`n = 4`, `result = [-1, -1, -1, -1]`, `stack = []`

| `i` | `current_idx` | `current_num` | Stack (indices) | Action                                                                                                                    | Result                |
|-----|---------------|---------------|-----------------|---------------------------------------------------------------------------------------------------------------------------|-----------------------|
| 0   | 0             | 13            | `[]`            | `stack.append(0)`                                                                                                         | `[-1, -1, -1, -1]`    |
| 1   | 1             | 7             | `[0]`           | `nums[0]=13 !< 7`. `stack.append(1)`                                                                                      | `[-1, -1, -1, -1]`    |
| 2   | 2             | 6             | `[0, 1]`        | `nums[1]=7 !< 6`. `stack.append(2)`                                                                                       | `[-1, -1, -1, -1]`    |
| 3   | 3             | 12            | `[0, 1, 2]`     | `nums[2]=6 < 12`. Pop 2. `result[2] = 12`. `stack=[0, 1]`.<br>`nums[1]=7 < 12`. Pop 1. `result[1] = 12`. `stack=[0]`.<br>`nums[0]=13 !< 12`. `stack.append(3)` (end of 1st pass, `i=3 < n=4`) | `[-1, 12, 12, -1]`    |
| 4   | 0             | 13            | `[0, 3]`        | (2nd pass starts, `i=4 >= n=4`, so no push to stack for `i < n` check)<br>`nums[3]=12 < 13`. Pop 3. `result[3] = 13`. `stack=[0]`.<br>`nums[0]=13 !< 13`.                                                                             | `[-1, 12, 12, 13]`    |
| 5   | 1             | 7             | `[0]`           | `nums[0]=13 !< 7`.                                                                                                        | `[-1, 12, 12, 13]`    |
| 6   | 2             | 6             | `[0]`           | `nums[0]=13 !< 6`.                                                                                                        | `[-1, 12, 12, 13]`    |
| 7   | 3             | 12            | `[0]`           | `nums[0]=13 !< 12`.                                                                                                       | `[-1, 12, 12, 13]`    |

Loop ends. Final `result = [-1, 12, 12, 13]`.

---