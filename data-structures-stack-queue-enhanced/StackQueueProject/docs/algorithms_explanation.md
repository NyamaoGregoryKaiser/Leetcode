# Algorithm Explanations: Stack and Queue Problems

This document provides detailed explanations for each problem, including the logic behind the optimal solution, alternative approaches, time and space complexity analysis, and considerations for edge cases.

---

## 1. Valid Parentheses

*   **Problem Statement:** Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets in the correct order.

### Optimal Solution: Using a Stack

**Logic:**
The key idea is that opening brackets wait for their corresponding closing brackets. A stack is perfect for this "last in, first out" matching.
1.  Initialize an empty stack of characters.
2.  Iterate through each character `c` in the input string `s`.
    *   If `c` is an opening bracket (`(`, `{`, `[`), push it onto the stack.
    *   If `c` is a closing bracket (`)`, `}`, `]`):
        *   First, check if the stack is empty. If it is, there's no opening bracket to match `c`, so the string is invalid.
        *   If the stack is not empty, pop the top element (`top_char`).
        *   Check if `c` matches `top_char` (e.g., `)` matches `(`, `}` matches `{`, `]` matches `[`). If they don't match, the string is invalid.
3.  After iterating through the entire string, if the stack is empty, it means all opening brackets were correctly matched with their closing counterparts. The string is valid.
4.  If the stack is not empty, it means there are unmatched opening brackets. The string is invalid.

**Example Walkthrough (s = "({[]})"):**
1.  `s[0] = '('`: Push `(` onto stack. `Stack: [`(`]`
2.  `s[1] = '{'`: Push `{` onto stack. `Stack: [`(`, `{`]`
3.  `s[2] = '['`: Push `[` onto stack. `Stack: [`(`, `{`, `[`]`
4.  `s[3] = ']'`: `]` is a closing bracket. Stack not empty. `top = [` (matches `]`). Pop. `Stack: [`(`, `{`]`
5.  `s[4] = '}'`: `}` is a closing bracket. Stack not empty. `top = {` (matches `}`). Pop. `Stack: [`(`]`
6.  `s[5] = ')'`: `)` is a closing bracket. Stack not empty. `top = (` (matches `)`). Pop. `Stack: []`
7.  End of string. Stack is empty. Result: Valid.

**Time Complexity:** O(N), where N is the length of the string. Each character is processed once, involving constant time stack operations (push, pop, top, empty).
**Space Complexity:** O(N) in the worst case (e.g., "((((("), where all N characters are pushed onto the stack. In the best case (e.g., "()()"), it can be O(1) if the stack size remains small.

**Edge Cases:**
*   Empty string: `""` -> Valid (stack remains empty).
*   String with only opening brackets: `"((("` -> Invalid (stack not empty at end).
*   String with only closing brackets: `")))"` -> Invalid (stack empty when closing bracket encountered).
*   Mismatched brackets: `"{[}"` -> Invalid.
*   Unbalanced but matched: `"([)]"` -> Invalid (order matters).

---

## 2. Daily Temperatures

*   **Problem Statement:** Given an array `temperatures`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If no such day exists, `answer[i]` is 0.

### Optimal Solution: Monotonic Stack

**Logic:**
This is a classic "next greater element" problem. A monotonic stack is the most efficient approach. We're looking for the *next* warmer temperature, which implies we should process temperatures from left to right and use a stack to keep track of previous "unresolved" temperatures.

1.  Initialize an `answer` array of the same size as `temperatures`, filled with zeros.
2.  Initialize an empty stack that will store *indices* of temperatures. We want to maintain a *decreasing* monotonic stack (i.e., `temperatures[stack.top()]` is greater than or equal to `temperatures[stack.top()-1]`, etc., if we consider elements from bottom to top).
3.  Iterate through `temperatures` from `i = 0` to `n-1`:
    *   Let `current_temp = temperatures[i]`.
    *   **While** the stack is not empty **AND** `current_temp` is greater than `temperatures[stack.top()]`:
        *   This means we found a warmer day (`i`) for the day whose index is `stack.top()`.
        *   Let `prev_index = stack.top()`. Pop `prev_index` from the stack.
        *   Calculate the waiting days: `answer[prev_index] = i - prev_index`.
    *   **After** the `while` loop, push the current index `i` onto the stack.
4.  After the loop finishes, any indices remaining in the stack correspond to days for which no warmer temperature was found to their right. Their `answer` values correctly remain 0.

**Example Walkthrough (temperatures = [73, 74, 75, 71, 69, 72, 76, 73]):**
`answer = [0,0,0,0,0,0,0,0]`, `stack = []`

*   **i = 0, temp = 73:** `stack` is empty. Push 0. `stack = [0]`
*   **i = 1, temp = 74:** `74 > temperatures[stack.top()=0] (73)`. Pop 0. `answer[0] = 1 - 0 = 1`. `stack = []`. Push 1. `stack = [1]`
*   **i = 2, temp = 75:** `75 > temperatures[stack.top()=1] (74)`. Pop 1. `answer[1] = 2 - 1 = 1`. `stack = []`. Push 2. `stack = [2]`
*   **i = 3, temp = 71:** `71 < temperatures[stack.top()=2] (75)`. Push 3. `stack = [2, 3]`
*   **i = 4, temp = 69:** `69 < temperatures[stack.top()=3] (71)`. Push 4. `stack = [2, 3, 4]`
*   **i = 5, temp = 72:**
    *   `72 > temperatures[stack.top()=4] (69)`. Pop 4. `answer[4] = 5 - 4 = 1`. `stack = [2, 3]`
    *   `72 > temperatures[stack.top()=3] (71)`. Pop 3. `answer[3] = 5 - 3 = 2`. `stack = [2]`
    *   `72 < temperatures[stack.top()=2] (75)`. Stop popping. Push 5. `stack = [2, 5]`
*   **i = 6, temp = 76:**
    *   `76 > temperatures[stack.top()=5] (72)`. Pop 5. `answer[5] = 6 - 5 = 1`. `stack = [2]`
    *   `76 > temperatures[stack.top()=2] (75)`. Pop 2. `answer[2] = 6 - 2 = 4`. `stack = []`
    *   `stack` is empty. Stop popping. Push 6. `stack = [6]`
*   **i = 7, temp = 73:** `73 < temperatures[stack.top()=6] (76)`. Push 7. `stack = [6, 7]`

End of loop. `answer = [1, 1, 4, 2, 1, 1, 0, 0]`.

**Time Complexity:** O(N), where N is the number of temperatures. Each index is pushed onto the stack once and popped from the stack at most once.
**Space Complexity:** O(N) in the worst case (e.g., temperatures are strictly decreasing, `[5, 4, 3, 2, 1]`), where all indices are pushed onto the stack.

**Edge Cases:**
*   Empty array: `[]` -> `[]` (handled by `n = 0` check implicitly or by empty loop).
*   Single element: `[70]` -> `[0]` (no warmer day).
*   All temperatures increasing: `[30, 40, 50, 60]` -> `[1, 1, 1, 0]`.
*   All temperatures decreasing: `[60, 50, 40, 30]` -> `[0, 0, 0, 0]`.
*   All temperatures same: `[70, 70, 70]` -> `[0, 0, 0]`.

---

## 3. Implement Queue using Stacks

*   **Problem Statement:** Implement a FIFO queue using only two stacks (`push`, `peek`, `pop`, `empty`).

### Optimal Solution: Two Stacks (`inStack`, `outStack`)

**Logic:**
The core idea is to use one stack (`inStack`) for all push operations (like a buffer) and another stack (`outStack`) for all pop/peek operations. When an element needs to be dequeued or peeked, if `outStack` is empty, all elements are transferred from `inStack` to `outStack`. This reverses the order, making the oldest element from `inStack` (which is the first pushed element) appear at the top of `outStack`.

1.  **`push(x)`:**
    *   Simply push `x` onto `inStack`. This is O(1).
2.  **`pop()`:**
    *   Before popping, ensure `outStack` has elements. If `outStack` is empty, transfer all elements from `inStack` to `outStack`. This reverses their order.
    *   Pop the top element from `outStack`.
3.  **`peek()`:**
    *   Similar to `pop()`, ensure `outStack` has elements by transferring from `inStack` if necessary.
    *   Return the top element of `outStack`.
4.  **`empty()`:**
    *   The queue is empty if both `inStack` and `outStack` are empty.

**Key Concept: Amortized O(1) Time Complexity for `pop`/`peek`**
While a `transferElements` operation can take O(N) time (where N is the number of elements in `inStack`), this transfer happens infrequently. Each element is pushed onto `inStack` once, then transferred to `outStack` once, and then popped from `outStack` once. Thus, over a sequence of M operations, the total cost is proportional to M (each element moved a constant number of times). The average cost per operation is O(1).

**Time Complexity:**
*   `push`: O(1)
*   `pop`: Amortized O(1) (Worst case O(N) when transfer happens)
*   `peek`: Amortized O(1) (Worst case O(N) when transfer happens)
*   `empty`: O(1)
**Space Complexity:** O(N) to store N elements across the two stacks.

**Edge Cases:**
*   Empty queue: `pop()` or `peek()` on an empty queue should ideally throw an exception or return a sentinel value (problem constraints usually specify behavior). Our implementation implicitly assumes calls are valid (i.e., not calling `pop` on empty).
*   Interleaved pushes and pops.
*   Single element queue.

---

## 4. Implement Stack using Queues

*   **Problem Statement:** Implement a LIFO stack using only two queues (`push`, `top`, `pop`, `empty`).

### Optimal Solution: One Queue (Efficient Pop/Top, O(N) Push)

**Logic:**
The challenge is to make the "last in" element the "first out" using a FIFO queue. If we just push elements, the newest element is at the back. To get it to the front (for `top` or `pop`), we must move all older elements to the back.

1.  **`push(x)`:**
    *   Push `x` to the back of `q1`.
    *   Now, `x` is the *newest* element, but it's at the back. To make it the front (like a stack's top), we need to move all elements that were *before* `x` to the back of the queue.
    *   Iterate `q1.size() - 1` times:
        *   Dequeue the front element.
        *   Enqueue it back to the rear of `q1`.
    *   After this, `x` will be at the front of `q1`.
2.  **`pop()`:**
    *   Dequeue and return the front element of `q1`. This is O(1) because `push` already rearranged it.
3.  **`top()`:**
    *   Return the front element of `q1`. This is O(1).
4.  **`empty()`:**
    *   Return `q1.empty()`.

**Example Walkthrough (push(1), push(2), push(3)):**
`q1 = []`

*   **`push(1)`:**
    *   `q1.push(1)`. `q1 = [1]`
    *   Loop `q1.size()-1 = 0` times. No moves.
    *   `q1 = [1]` (1 is front/top)

*   **`push(2)`:**
    *   `q1.push(2)`. `q1 = [1, 2]`
    *   Loop `q1.size()-1 = 1` time:
        *   `q1.push(q1.front())` (pushes 1 to back). `q1 = [1, 2, 1]`
        *   `q1.pop()` (removes original 1). `q1 = [2, 1]`
    *   `q1 = [2, 1]` (2 is front/top)

*   **`push(3)`:**
    *   `q1.push(3)`. `q1 = [2, 1, 3]`
    *   Loop `q1.size()-1 = 2` times:
        *   (1) `q1.push(q1.front())` (pushes 2). `q1 = [2, 1, 3, 2]`. `q1.pop()`. `q1 = [1, 3, 2]`
        *   (2) `q1.push(q1.front())` (pushes 1). `q1 = [1, 3, 2, 1]`. `q1.pop()`. `q1 = [3, 2, 1]`
    *   `q1 = [3, 2, 1]` (3 is front/top)

Now, `pop()` would return 3 (O(1)), then 2, then 1.

**Time Complexity:**
*   `push`: O(N), where N is the current number of elements in the stack. This is because all existing N-1 elements are dequeued and re-enqueued.
*   `pop`: O(1)
*   `top`: O(1)
*   `empty`: O(1)
**Space Complexity:** O(N) to store N elements in the queue.

**Alternative Approach (Two Queues - Efficient Push, O(N) Pop/Top):**
1.  **`push(x)`:** Always push `x` to `q1`. O(1).
2.  **`pop()`:** To pop the top element, transfer all elements *except the last one* from `q1` to `q2`. Then, pop the last remaining element from `q1` (this is the actual top of the stack). Swap `q1` and `q2` so `q1` is ready for next pushes. This is O(N).
3.  **`top()`:** Same as `pop()`, but peek the last remaining element from `q1` and then transfer it back to `q2` along with others. This is also O(N).
This approach moves N-1 elements on every `pop`/`top` if `q1` is not empty. The one-queue approach above moves N-1 elements on every `push`. The choice depends on which operation (push vs. pop/top) is more frequent or critical. Often, `top` and `pop` are expected to be O(1) for a stack, so the chosen one-queue implementation (O(N) push) is a common interview solution.

**Edge Cases:**
*   Empty stack: Similar to `MyQueue`, `pop()` or `top()` on empty can be problematic.
*   Single element stack.

---

## 5. Trapping Rain Water

*   **Problem Statement:** Given `n` non-negative integers representing an elevation map, compute how much water it can trap.

### Optimal Solution: Using a Stack (Monotonic Stack Variant)

**Logic:**
The stack-based approach helps find the left and right boundaries for forming a "well" that can trap water. It keeps track of indices of bars in decreasing order of height (a decreasing monotonic stack). When we encounter a bar taller than the top of the stack, it means we might have found a right boundary for a "well" whose bottom is the popped bar(s).

1.  Initialize `total_water = 0`.
2.  Initialize an empty stack `st` to store indices of bars.
3.  Iterate through `height` array with index `i` from `0` to `n-1`.
    *   **While** the stack is not empty **AND** `height[i]` is strictly greater than `height[st.top()]`:
        *   We found a right boundary (`i`) and a bottom (`st.top()`) for a potential water trap.
        *   Let `bottom_idx = st.top()`. Pop `bottom_idx` from the stack.
        *   If the stack becomes empty after popping `bottom_idx`, it means there's no left wall. We cannot trap water, so `break` from the inner `while` loop.
        *   Otherwise, `left_wall_idx = st.top()` (the new top of the stack).
        *   `right_wall_idx = i`.
        *   Calculate the height of water trapped: `water_height = std::min(height[left_wall_idx], height[right_wall_idx]) - height[bottom_idx]`.
        *   Calculate the width of the trapped water: `width = right_wall_idx - left_wall_idx - 1`.
        *   Add trapped water to `total_water`: `total_water += water_height * width`.
    *   Push the current index `i` onto the stack.

**Example Walkthrough (height = [0,1,0,2,1,0,1,3,2,1,2,1]):**
`total_water = 0`, `stack = []`

*   **i = 0, h = 0:** Push 0. `st = [0]`
*   **i = 1, h = 1:** `1 > height[0](0)`. Pop 0. `st` empty? No. `left_wall_idx` no longer exists as stack empty (after first pop, it was already empty). This is incorrect in initial logic. No water is trapped. Wait, `height[i] > height[st.top()]` condition means `st.top()` is a potential bottom. When `st.empty()` *after* popping, it means there is no left wall.
    *   Revised for `i=1, h=1`: `height[1](1) > height[0](0)`.
        *   `bottom_idx = 0`. Pop 0. `st = []`.
        *   `st` is empty. Break. (No left wall).
    *   Push 1. `st = [1]`

*   **i = 2, h = 0:** `0 < height[1](1)`. Push 2. `st = [1, 2]`
*   **i = 3, h = 2:** `2 > height[2](0)`.
    *   `bottom_idx = 2`. Pop 2. `st = [1]`.
    *   `st` not empty. `left_wall_idx = 1`. `right_wall_idx = 3`.
    *   `min_h = min(height[1](1), height[3](2)) = 1`.
    *   `water_h = min_h - height[bottom_idx](0) = 1 - 0 = 1`.
    *   `width = 3 - 1 - 1 = 1`.
    *   `total_water += 1 * 1 = 1`. `total_water = 1`.
    *   Still `2 > height[st.top()=1](1)` is false. `2` is not strictly greater than `1`.
    *   Push 3. `st = [1, 3]`

*   **i = 4, h = 1:** `1 < height[3](2)`. Push 4. `st = [1, 3, 4]`
*   **i = 5, h = 0:** `0 < height[4](1)`. Push 5. `st = [1, 3, 4, 5]`
*   **i = 6, h = 1:** `1 > height[5](0)`.
    *   `bottom_idx = 5`. Pop 5. `st = [1, 3, 4]`.
    *   `left_wall_idx = 4`. `right_wall_idx = 6`.
    *   `min_h = min(height[4](1), height[6](1)) = 1`.
    *   `water_h = min_h - height[5](0) = 1 - 0 = 1`.
    *   `width = 6 - 4 - 1 = 1`.
    *   `total_water += 1 * 1 = 2`. `total_water = 2`.
    *   Still `1 > height[st.top()=4](1)` is false. (This part needs care - `height[i] > height[st.top()]` is the correct condition).
    *   Push 6. `st = [1, 3, 4, 6]`

*   ... (and so on) ...
*   **Final Result for [0,1,0,2,1,0,1,3,2,1,2,1] is 6.**

The stack approach can be tricky to get right on the first try, particularly the `while` loop condition and `if (st.empty()) break;` logic.

**Time Complexity:** O(N), where N is the number of bars. Each element is pushed and popped at most once.
**Space Complexity:** O(N) in the worst case (e.g., heights are strictly decreasing), where all indices are pushed onto the stack.

### Alternative Approaches

**1. Two Pointers (Most Optimal: O(N) Time, O(1) Space)**
This is generally considered the most efficient solution.
*   Initialize `left = 0`, `right = n-1`, `left_max = 0`, `right_max = 0`, `total_water = 0`.
*   While `left < right`:
    *   If `height[left] < height[right]`:
        *   If `height[left] >= left_max`, update `left_max = height[left]`.
        *   Else, `total_water += left_max - height[left]`.
        *   Increment `left`.
    *   Else (`height[right] <= height[left]`):
        *   If `height[right] >= right_max`, update `right_max = height[right]`.
        *   Else, `total_water += right_max - height[right]`.
        *   Decrement `right`.
*   Return `total_water`.
This works because at any point, if `height[left] < height[right]`, we know that the water trapped at `height[left]` (if any) will be limited by `left_max`, not by `height[right]` (because there's a taller or equal bar on the right side). The same logic applies when `height[right] <= height[left]`.

**2. Dynamic Programming (O(N) Time, O(N) Space)**
*   Create two arrays: `left_max[N]` and `right_max[N]`.
*   `left_max[i]` stores the maximum height encountered from the left up to index `i` (inclusive).
    *   `left_max[0] = height[0]`
    *   `left_max[i] = std::max(left_max[i-1], height[i])` for `i > 0`.
*   `right_max[i]` stores the maximum height encountered from the right up to index `i` (inclusive).
    *   `right_max[n-1] = height[n-1]`
    *   `right_max[i] = std::max(right_max[i+1], height[i])` for `i < n-1`.
*   Iterate `i` from `0` to `n-1`:
    *   `water_at_i = std::min(left_max[i], right_max[i]) - height[i]`.
    *   If `water_at_i > 0`, add it to `total_water`.
*   Return `total_water`.

**Edge Cases:**
*   Empty array: `[]` -> 0.
*   Array with 1 or 2 elements: `[1]`, `[1, 2]` -> 0 (cannot trap water).
*   Monotonically increasing or decreasing heights: `[1,2,3,4,5]`, `[5,4,3,2,1]` -> 0.
*   All heights are same: `[2,2,2,2]` -> 0.
*   Complex combinations of peaks and valleys.

---
```