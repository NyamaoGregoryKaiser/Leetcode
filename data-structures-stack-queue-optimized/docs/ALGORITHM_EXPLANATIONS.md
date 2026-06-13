```markdown
# Algorithm Explanations

This document provides detailed explanations for each problem, including intuition, step-by-step logic, and time/space complexity analysis.

---

## 1. Valid Parentheses

**Problem Statement:**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Intuition:**
This is a classic problem perfectly suited for a stack. When we encounter an opening bracket, we expect a corresponding closing bracket later. A stack helps us remember the *most recent* unclosed opening bracket. When we see a closing bracket, we check if it matches the *top* of our stack. If it does, we've found a valid pair, and we can "remove" the opening bracket from our memory (pop from stack). If it doesn't match or the stack is empty, the string is invalid.

**Algorithm Steps:**
1. Initialize an empty stack of characters.
2. Iterate through each character `c` in the input string `s`.
    a. If `c` is an opening bracket (`(`, `[`, `{`), push it onto the stack.
    b. If `c` is a closing bracket (`)`, `]`, `}`):
        i. Check if the stack is empty. If it is, there's no matching opening bracket, so the string is invalid. Return `false`.
        ii. Pop the top element from the stack. Let's call it `top_char`.
        iii. Check if `c` matches `top_char`:
            - If `c == ')'` and `top_char != '('`, return `false`.
            - If `c == ']'` and `top_char != '['`, return `false`.
            - If `c == '}'` and `top_char != '{'`, return `false`.
            - If none of these conditions are met, it means `c` matches `top_char`, so the pair is valid. Continue.
3. After iterating through the entire string:
    a. If the stack is empty, all opening brackets have been correctly closed. Return `true`.
    b. If the stack is not empty, there are unclosed opening brackets. Return `false`.

**Time Complexity:** O(N), where N is the length of the string `s`. We iterate through the string once, and each stack operation (push, pop, top, empty) takes O(1) time.

**Space Complexity:** O(N) in the worst case. For example, if the input string is "((((((", the stack will grow to store all N opening brackets. In the best case (e.g., "()[]{}"), the stack might remain small or empty.

---

## 2. Min Stack

**Problem Statement:**
Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time complexity.

**Intuition:**
A standard stack doesn't support `getMin` in O(1) without iterating through all elements (O(N)). To achieve O(1) `getMin`, we need to store information about the minimum element.
A common approach is to use an auxiliary stack to keep track of minimums. When we push an element, if it's less than or equal to the current minimum, we push it onto the `min_stack`. When we pop, if the popped element *was* the current minimum, we must also pop from the `min_stack`.

**Algorithm Steps:**
We'll use two `std::stack<int>` instances:
*   `data_stack`: This will store all elements pushed onto our `MinStack`.
*   `min_stack`: This will store the minimum elements encountered *so far*. The top of this stack will always be the current minimum of all elements in `data_stack`.

**`MinStack::push(int val)`:**
1. Push `val` onto `data_stack`.
2. Compare `val` with `min_stack.top()`.
   - If `min_stack` is empty OR `val <= min_stack.top()`, push `val` onto `min_stack`. (It's crucial to use `<=` to handle duplicate minimums correctly; if `val == min_stack.top()`, pushing `val` ensures `min_stack` has a corresponding element to pop when that minimum is removed from `data_stack`).

**`MinStack::pop()`:**
1. Check if `data_stack` is empty. If so, throw an exception.
2. If `data_stack.top()` is equal to `min_stack.top()`, then the element being popped is the current minimum. Pop from `min_stack` as well.
3. Pop from `data_stack`.

**`MinStack::top()`:**
1. Check if `data_stack` is empty. If so, throw an exception.
2. Return `data_stack.top()`.

**`MinStack::getMin()`:**
1. Check if `min_stack` is empty. If so, throw an exception.
2. Return `min_stack.top()`.

**Time Complexity:** O(1) for all operations (`push`, `pop`, `top`, `getMin`). Each operation involves a constant number of stack pushes or pops.

**Space Complexity:** O(N) in the worst case, where N is the number of elements in the `MinStack`. If elements are pushed in strictly decreasing order (e.g., 5, 4, 3, 2, 1), `min_stack` will grow to the same size as `data_stack`. In the best case (e.g., 1, 2, 3, 4, 5), `min_stack` will only store the initial minimum (O(1)). On average, it's less than O(N) but bounded by O(N).

---

## 3. Implement Queue using Stacks

**Problem Statement:**
Implement a First-In, First-Out (FIFO) queue using only two Last-In, First-Out (LIFO) stacks. The implemented queue should support `push`, `pop`, `peek`, and `empty` operations.

**Intuition:**
Stacks are LIFO, queues are FIFO. To achieve FIFO behavior with LIFO stacks, we need a mechanism to reverse the order of elements. We can use one stack (`in_stack`) for pushing new elements (like an "input" buffer) and another stack (`out_stack`) for popping/peeking elements (like an "output" buffer). When an element is needed for `pop` or `peek`, and `out_stack` is empty, we transfer all elements from `in_stack` to `out_stack`. This reversal ensures the oldest element from `in_stack` becomes the top of `out_stack`, ready for FIFO processing.

**Algorithm Steps:**
We'll use two `std::stack<int>` instances:
*   `in_stack`: Elements are pushed here directly.
*   `out_stack`: Elements are popped/peeked from here.

**`MyQueue::push(int x)`:**
1. Simply push `x` onto `in_stack`. This is an O(1) operation.

**`MyQueue::pop()`:**
1. **Helper Function `transferElements()`:** If `out_stack` is empty, move all elements from `in_stack` to `out_stack`. This reverses their order, so the oldest element in `in_stack` becomes `out_stack.top()`.
2. Call `transferElements()`.
3. If after `transferElements()` `out_stack` is still empty, the queue is empty; throw an exception.
4. Pop the top element from `out_stack` and return it.

**`MyQueue::peek()`:**
1. Call `transferElements()`.
2. If after `transferElements()` `out_stack` is still empty, the queue is empty; throw an exception.
3. Return `out_stack.top()`.

**`MyQueue::empty()`:**
1. Return `true` if both `in_stack` and `out_stack` are empty, `false` otherwise.

**`transferElements()` Helper Function:**
```cpp
void MyQueue::transferElements() {
    if (out_stack.empty()) { // Only transfer if out_stack is exhausted
        while (!in_stack.empty()) {
            out_stack.push(in_stack.top());
            in_stack.pop();
        }
    }
}
```

**Time Complexity:**
*   **`push`**: O(1).
*   **`pop`, `peek`**: Amortized O(1). While a single `pop` or `peek` operation might take O(N) if it triggers a transfer of all N elements from `in_stack` to `out_stack`, each element is moved at most twice: once from `in_stack` to `out_stack`, and once popped from `out_stack`. Over a sequence of N operations, the total cost is proportional to N, making the amortized cost O(1) per operation.
*   **`empty`**: O(1).

**Space Complexity:** O(N) where N is the total number of elements currently in the queue, as all elements are stored across the two stacks.

---

## 4. Sliding Window Maximum

**Problem Statement:**
Given an array `nums` and an integer `k`, return the *maximum* sliding window. The window slides from the very left to the very right. You can only see the `k` numbers in the window.

**Brute Force Approach:**
For each possible window (from index `i` to `i + k - 1`), iterate from `i` to `i + k - 1` to find the maximum element.
*   Time: O(N*K)
*   Space: O(1) (excluding result array)

**Optimal Solution: Using a Deque (Double-Ended Queue) - Monotonic Decreasing Deque**

**Intuition:**
To find the maximum in a window efficiently, we need a data structure that can:
1. Quickly give us the maximum element.
2. Efficiently remove elements that are no longer in the window.
3. Efficiently add new elements.

A `std::deque` can do this. We'll maintain a deque that stores *indices* of elements from `nums` in a *monotonically decreasing* order of their values.
This means: `nums[dq.front()]` will always be the maximum in the current window.
And `nums[dq[i]] >= nums[dq[i+1]]` for all elements `dq[i]` in the deque.

**Algorithm Steps:**
1. Initialize an empty `std::deque<int>` (to store indices) and an empty `std::vector<int>` `result`.
2. Handle edge cases: If `nums` is empty, `k <= 0`, or `k > nums.size()`, return an empty `result`.
3. Iterate with index `i` from `0` to `nums.size() - 1`:
    a. **Remove Out-of-Window Elements (from front):**
       If the deque is not empty and the index at the front (`dq.front()`) is `i - k` (meaning it's the start of the *previous* window and thus out of the current window `[i - k + 1, i]`), pop it from the front of the deque.
    b. **Maintain Monotonic Decreasing Property (from back):**
       While the deque is not empty and the element `nums[i]` (current element) is greater than or equal to the element at the back of the deque (`nums[dq.back()]`):
       Pop elements from the back of the deque. This is because any elements in the deque that are smaller than `nums[i]` and appear *before* `nums[i]` can never be the maximum in any future window that `nums[i]` is part of. `nums[i]` is larger and appears later.
    c. **Add Current Element (to back):**
       Push the current index `i` onto the back of the deque.
    d. **Record Maximum (if window is formed):**
       If `i` is greater than or equal to `k - 1` (meaning the first full window `[0, k-1]` has been processed, or subsequent windows are formed), the maximum element for the current window is `nums[dq.front()]`. Add `nums[dq.front()]` to `result`.

**Time Complexity:** O(N), where N is the length of `nums`. Each element's index is pushed onto the deque at most once and popped from the deque at most once. Therefore, all deque operations combined take linear time.

**Space Complexity:** O(K) in the worst case, as the deque will store at most `K` indices.

---

## 5. Daily Temperatures

**Problem Statement:**
Given an array of integers `temperatures` representing the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

**Brute Force Approach:**
For each day `i`, iterate through all subsequent days `j` (from `i+1` to `N-1`) to find the first day `j` where `temperatures[j] > temperatures[i]`. If found, store `j - i`; otherwise, store `0`.
*   Time: O(N^2)
*   Space: O(1) (excluding result array)

**Optimal Solution: Using a Monotonic Stack**

**Intuition:**
When we are at a particular day `i`, we want to find the *next* day `j` that is warmer. If we iterate forward, we'd have to search ahead. If we process the temperatures from left to right, we're looking for a *future* warmer day.
A monotonic stack (specifically, a *decreasing* monotonic stack storing *indices*) is ideal here. When we iterate through the temperatures from left to right, if the current temperature `temperatures[i]` is warmer than the temperature at the top of our stack, it means we've found the next warmer day for the day at `stack.top()`.

**Algorithm Steps:**
1. Initialize `n = temperatures.size()`.
2. Create a `std::vector<int> result` of size `n`, initialized with zeros. This will store our waiting days.
3. Initialize an empty `std::stack<int> s`. This stack will store *indices* of days for which we haven't yet found a warmer day, in decreasing order of their temperatures. That is, if `idx1` is below `idx2` in the stack, then `temperatures[idx1]` is less than `temperatures[idx2]` (or `idx1` is earlier and we're waiting to find a warmer day for `idx1`). More precisely, `temperatures[s.top()]` is always less than `temperatures[s.next_to_top()]` and so on. (Wait, this intuition is for strictly decreasing stack, storing indices such that `temperatures[s.top()]` is the *smallest* among those, but the key is `temperatures[s.top()] < current_temp`).

Let's refine the monotonic stack:
The stack will store indices `j` such that `temperatures[j]` is in decreasing order.
If we push `i`, then `temperatures[i]` must be less than or equal to `temperatures[s.top()]` (if stack not empty). If it's *greater*, then `s.top()` has found its warmer day!

**Revised Algorithm Steps:**
1. Initialize `n = temperatures.size()`.
2. Create a `std::vector<int> result(n, 0)`.
3. Initialize an empty `std::stack<int> s`. (This stack will store indices `j` such that `temperatures[j]` is in decreasing order from bottom to top of the stack).

4. Iterate `i` from `0` to `n - 1` (i.e., for each day):
    a. **While the stack is not empty AND `temperatures[i]` is greater than `temperatures[s.top()]`:**
       This means we found a warmer day (`i`) for the day at `s.top()`.
       i. Let `prev_day_index = s.top()`.
       ii. Pop `s.top()`.
       iii. Set `result[prev_day_index] = i - prev_day_index`. (The wait time is the difference in indices).
    b. **Push current day's index:**
       Push `i` onto the stack. This maintains the decreasing temperature property for the stack (any subsequent day `j` will be compared to `temperatures[i]`).

5. After the loop finishes, any indices remaining in the stack have no warmer day to their right, so their `result` values remain `0` (which was the default initialization).
6. Return `result`.

**Example Trace:** `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`

| `i` | `temps[i]` | Stack (indices) | `s.top()` | `temps[s.top()]` | `temps[i] > temps[s.top()]` | `result` (updated) | Action                                           |
|-----|------------|-----------------|-----------|------------------|-----------------------------|--------------------|--------------------------------------------------|
| 0   | 73         | []              | -         | -                | -                           | [0,0,0,0,0,0,0,0]  | Push 0                                           |
|     |            | [0]             |           |                  |                             |                    |                                                  |
| 1   | 74         | [0]             | 0         | 73               | True (74 > 73)              | [1,0,0,0,0,0,0,0]  | Pop 0, `result[0] = 1-0 = 1`. Push 1             |
|     |            | [1]             |           |                  |                             |                    |                                                  |
| 2   | 75         | [1]             | 1         | 74               | True (75 > 74)              | [1,1,0,0,0,0,0,0]  | Pop 1, `result[1] = 2-1 = 1`. Push 2             |
|     |            | [2]             |           |                  |                             |                    |                                                  |
| 3   | 71         | [2]             | 2         | 75               | False (71 !> 75)            | [1,1,0,0,0,0,0,0]  | Push 3                                           |
|     |            | [2,3]           |           |                  |                             |                    |                                                  |
| 4   | 69         | [2,3]           | 3         | 71               | False (69 !> 71)            | [1,1,0,0,0,0,0,0]  | Push 4                                           |
|     |            | [2,3,4]         |           |                  |                             |                    |                                                  |
| 5   | 72         | [2,3,4]         | 4         | 69               | True (72 > 69)              | [1,1,0,0,1,0,0,0]  | Pop 4, `result[4] = 5-4 = 1`. Stack: [2,3]       |
|     |            | [2,3]           | 3         | 71               | True (72 > 71)              | [1,1,0,1,1,0,0,0]  | Pop 3, `result[3] = 5-3 = 2`. Stack: [2]         |
|     |            | [2]             | 2         | 75               | False (72 !> 75)            | [1,1,0,1,1,0,0,0]  | Push 5                                           |
|     |            | [2,5]           |           |                  |                             |                    |                                                  |
| 6   | 76         | [2,5]           | 5         | 72               | True (76 > 72)              | [1,1,0,1,1,1,0,0]  | Pop 5, `result[5] = 6-5 = 1`. Stack: [2]         |
|     |            | [2]             | 2         | 75               | True (76 > 75)              | [1,1,4,1,1,1,0,0]  | Pop 2, `result[2] = 6-2 = 4`. Stack: []          |
|     |            | []              | -         | -                | -                           | [1,1,4,1,1,1,0,0]  | Push 6                                           |
|     |            | [6]             |           |                  |                             |                    |                                                  |
| 7   | 73         | [6]             | 6         | 76               | False (73 !> 76)            | [1,1,4,1,1,1,0,0]  | Push 7                                           |
|     |            | [6,7]           |           |                  |                             |                    |                                                  |

End of loop. Final `result`: `[1, 1, 4, 2, 1, 1, 0, 0]` (Note the initial values for `result[3]` and `result[4]` were incorrect in table, fixed them. `result[2]` was 0, then 4).

**Time Complexity:** O(N), where N is the number of days (temperatures). Each index is pushed onto the stack at most once and popped from the stack at most once. All stack operations are O(1).

**Space Complexity:** O(N) in the worst case (e.g., strictly decreasing temperatures like `[100, 90, 80, ..., 10]`), where the stack might store all indices.
```