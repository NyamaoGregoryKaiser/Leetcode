# Algorithms Explained: Stacks and Queues

This document provides a deeper dive into the problems covered in this project, offering detailed explanations of the optimal solutions, visual diagrams (ASCII art), discussions of edge cases, and potential variations.

---

## Problem 1: Valid Parentheses

**Problem Description:**
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets in the correct order, and every close bracket has a corresponding open bracket.

**Optimal Solution (Using a Stack):**

The core idea is that when we encounter an opening bracket, we "expect" a specific closing bracket later. A stack is perfect for this "last in, first out" expectation.

1.  **Initialize a Stack:** Create an empty stack to store opening brackets.
2.  **Define a Map:** Create a mapping between opening and closing brackets (e.g., `'{': '}'`, `'(': ')'`, `'[': ']'`).
3.  **Iterate Through String:**
    *   If the current character is an **opening bracket** (i.e., it's a key in our map), push it onto the stack.
    *   If the current character is a **closing bracket**:
        *   Check if the stack is empty. If it is, there's no matching opening bracket, so the string is invalid.
        *   Pop the top element from the stack. This represents the most recently seen opening bracket.
        *   Compare the popped opening bracket with the current closing bracket using our map. If they don't match (e.g., popped `(` but current is `]`), the string is invalid.
4.  **Final Check:** After iterating through all characters, if the stack is empty, it means every opening bracket found its matching closing bracket. If the stack is not empty, there are unclosed opening brackets, so the string is invalid.

**ASCII Diagram:**

Consider `s = "({[]})"`

```
String:  (   {   [   ]   }   )
Stack:  []  [  [  [  [  [  [  []
              (   (   (   (   (
                  {   {   {   {
                      [   [   [] (pop '[', match ']')
                          (   (
                              {   {
                                  [] (pop '{', match '}')
                                      (   (
                                          [] (pop '(', match ')')
Final: [] -> Valid
```

Consider `s = "([)]"`

```
String:  (   [   )   ]
Stack:  []  [  [  [  [
              (   (   (
                  [   [
                      [] (pop '[', mismatch with ')') -> Invalid!
```

**Edge Cases & Gotchas:**

*   **Empty String:** `""` is valid. Handle this by returning `true` at the start.
*   **Odd Length String:** Any valid parentheses string must have an even length. If `s.length % 2 !== 0`, it's immediately invalid. (This is an optimization, not strictly required for correctness).
*   **Closing Bracket First:** `"]"` or `"{`" is invalid. The stack will be empty when `pop` is called, handled by the `stack.isEmpty()` check.
*   **Unclosed Brackets:** `"((("` is invalid. The stack will not be empty at the end, handled by the `stack.isEmpty()` final check.
*   **Mismatched Brackets:** `"(]"` is invalid. Handled by `map[lastOpen] !== char` check.

**Variations:**

*   **Custom Delimiters:** What if you had `<` and `>`? Just update the `map`.
*   **HTML/XML Tag Validation:** Similar concept, but tags can have attributes and might not be self-closing. Requires more complex parsing but the fundamental stack principle applies.
*   **Arithmetic Expression Balancing:** Check for balanced parentheses in `(a + (b * c)) - d`. Same algorithm.

---

## Problem 2: Min Stack

**Problem Description:**
Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time complexity.

**Optimal Solution (Using an Auxiliary Stack):**

The challenge is `getMin()` in O(1). A standard stack's `getMin()` would require iterating O(N) elements. The trick is to keep track of the minimums as elements are pushed and popped.

We use two stacks:
1.  `stack`: The main stack, storing all elements as usual.
2.  `minStack`: An auxiliary stack that stores the minimum element *at each point in time*.

**Logic:**

*   **`constructor()`:** Initialize both `stack` and `minStack` as empty.
*   **`push(val)`:**
    *   Push `val` onto the `stack`.
    *   For `minStack`: If `minStack` is empty OR `val` is less than or equal to `minStack.peek()`, then push `val` onto `minStack`.
        *   **Why `<= val`?** If `val` is equal to the current minimum, we still push it. This ensures that when that minimum is popped, the *next* minimum (which might be another instance of the same value) is still available.
*   **`pop()`:**
    *   Pop the top element from `stack`.
    *   If the popped element is *equal* to `minStack.peek()`, then also pop from `minStack`.
*   **`top()`:** Return `stack.peek()`.
*   **`getMin()`:** Return `minStack.peek()`.

**ASCII Diagram:**

Consider operations: `push(-2)`, `push(0)`, `push(-3)`, `getMin`, `pop`, `top`, `getMin`

```
Operation       Main Stack (S)        Min Stack (MS)     Output
--------------------------------------------------------------------
push(-2)        [-2]                  [-2]
push(0)         [-2, 0]               [-2]                 (0 > -2, so -2 remains min)
push(-3)        [-2, 0, -3]           [-2, -3]             (-3 <= -2, push -3)
getMin()        [-2, 0, -3]           [-2, -3]           -> -3
pop()           [-2, 0]               [-2]                 (popped -3, which was min, so pop -3 from MS)
top()           [-2, 0]               [-2]               -> 0
getMin()        [-2, 0]               [-2]               -> -2
```

**Edge Cases & Gotchas:**

*   **Empty Stack:** All `pop`, `top`, `getMin` operations must handle an empty stack by throwing an error or returning a specific value (e.g., `null`). Our implementation throws errors.
*   **Duplicate Minimums:** As explained in `push` logic, handling `val <= minStack.peek()` (rather than just `<`) is crucial for correctness when duplicate minimum values exist.
*   **Negative Numbers:** The logic works fine with negative numbers, as `min` still compares numerically.

**Variations:**

*   **Store `(value, current_min)` pairs:** Instead of two separate stacks, each element on the main stack could be an object/tuple `(value, min_so_far_up_to_this_point)`. This slightly increases space per element but can simplify logic slightly. Space complexity is guaranteed O(N) in this variation.
*   **`getMax()` in O(1) too:** You could extend this with a third `maxStack` using similar logic.
*   **`getMin` not O(1):** If O(N) `getMin` is allowed, simply iterate through the main stack.

---

## Problem 3: Implement Queue using Stacks

**Problem Description:**
Implement a FIFO (First-In, First-Out) queue using only two stacks. The queue should support `push`, `pop`, `peek`, and `empty`.

**Optimal Solution (Using Two Stacks - `inStack` and `outStack`):**

The core idea is to use one stack (`inStack`) for `push` operations and another stack (`outStack`) for `pop` and `peek` operations. When `outStack` becomes empty, we transfer all elements from `inStack` to `outStack`. This transfer effectively reverses the order of elements from LIFO to FIFO.

**Logic:**

1.  **`inStack`:** Where all new elements are `push`ed. This maintains the order of elements pushed recently.
2.  **`outStack`:** Where elements are `pop`ped or `peek`ed from. When `inStack` elements are moved to `outStack`, their order is reversed. This makes the oldest element (first-in) available at the top of `outStack`.

*   **`constructor()`:** Initialize `inStack` and `outStack` as empty.
*   **`push(x)`:** Simply `inStack.push(x)`. This is O(1).
*   **`pop()`:**
    *   Call `transferElementsIfNeeded()`.
    *   If `outStack` is still empty, throw an error (queue is empty).
    *   Return `outStack.pop()`. This is O(1) after transfer.
*   **`peek()`:**
    *   Call `transferElementsIfNeeded()`.
    *   If `outStack` is still empty, throw an error.
    *   Return `outStack.peek()`. This is O(1) after transfer.
*   **`empty()`:** Return `inStack.isEmpty() && outStack.isEmpty()`. This is O(1).
*   **`transferElementsIfNeeded()` (Helper):**
    *   If `outStack.isEmpty()`:
        *   While `inStack` is not empty, `outStack.push(inStack.pop())`.

**ASCII Diagram:**

Consider operations: `push(1)`, `push(2)`, `peek()`, `push(3)`, `pop()`, `pop()`

```
Operation       inStack      outStack     Output
------------------------------------------------------
initial         []           []
push(1)         [1]          []
push(2)         [1, 2]       []
peek()          [1, 2]       []           (outStack empty, transfer)
                []           [2, 1]       -> 1
push(3)         [3]          [2, 1]
pop()           [3]          [2, 1]       -> 1             (pop from outStack)
pop()           [3]          [2]          -> 2             (pop from outStack)
pop()           [3]          []           (outStack empty, transfer)
                []           [3]          -> 3             (pop from outStack)
```

**Edge Cases & Gotchas:**

*   **Empty Queue:** All operations must correctly handle an empty queue state. `peek` and `pop` should throw errors, `empty` should return true.
*   **Interleaving operations:** The `transferElementsIfNeeded` logic ensures correctness even with mixed `push`/`pop`/`peek` calls.
*   **Performance:** `push` is always O(1). `pop` and `peek` are amortized O(1). Each element is transferred between stacks at most once in its lifetime in the queue. Over a sequence of N operations, the total cost of transfers is O(N), making the average (amortized) cost O(1) per operation.

**Variations:**

*   **Always transfer on push:** A less efficient approach would be to always transfer on `push` to keep the most recent element at the bottom of one stack. This is usually not optimal.

---

## Problem 4: Implement Stack using Queues

**Problem Description:**
Implement a LIFO (Last-In, First-Out) stack using only two queues. The stack should support `push`, `pop`, `top`, and `empty`.

**Optimal Solution (Using Two Queues - Strategy 1: `push` O(N), `pop` O(1)):**

This problem is generally trickier than implementing a Queue with Stacks because queues are FIFO, and we want LIFO. The key is to make sure the "top" element is always at the front of one of the queues.

We use two queues: `q1` (main queue) and `q2` (auxiliary queue).

**Logic for Strategy 1 (`push` O(N), `pop` O(1)):**

*   **`constructor()`:** Initialize `q1` and `q2` as empty.
*   **`push(x)`:**
    *   `q2.enqueue(x)`: Add the new element to the auxiliary queue. This new element `x` is destined to be the new "top".
    *   While `q1` is not empty: `q2.enqueue(q1.dequeue())`: Move all existing elements from `q1` to `q2`. This places them *after* the new element `x` in `q2`.
    *   Swap `q1` and `q2`: Now `q1` contains `x` at its front, followed by all previously existing elements in their original LIFO order. `q2` becomes empty.
    *   This ensures the `push`ed element is always at the front of `q1` (the "top" of our logical stack).
*   **`pop()`:**
    *   If `q1` is empty, throw an error.
    *   Return `q1.dequeue()`. Since `push` ensures `q1`'s front is the stack's top, this is O(1).
*   **`top()`:**
    *   If `q1` is empty, throw an error.
    *   Return `q1.peek()`. This is O(1).
*   **`empty()`:** Return `q1.isEmpty()`. This is O(1).

**ASCII Diagram (Strategy 1):**

Consider operations: `push(1)`, `push(2)`, `top()`, `push(3)`, `pop()`, `pop()`

```
Operation       q1            q2            Output
-------------------------------------------------------
initial         []            []
push(1)         []            [1]           (enqueue to q2)
                [1]           []            (move q2 to q1 via swap)
push(2)         [1]           [2]           (enqueue to q2)
                []            [2, 1]        (move q1 to q2)
                [2, 1]        []            (move q2 to q1 via swap)
top()           [2, 1]        []            -> 2
push(3)         [2, 1]        [3]           (enqueue to q2)
                []            [3, 2, 1]     (move q1 to q2)
                [3, 2, 1]     []            (move q2 to q1 via swap)
pop()           [3, 2, 1]     []            -> 3
pop()           [2, 1]        []            -> 2
```

**Edge Cases & Gotchas:**

*   **Empty Stack:** Similar to `MyQueue`, handle `pop` and `top` on an empty stack.
*   **Underlying Queue Performance:** The typical interview assumption is that basic queue operations (`enqueue`, `dequeue`, `peek`) are O(1) amortized.
    *   With this assumption, Strategy 1 has: `push` O(N), `pop` O(1), `top` O(1), `empty` O(1).
    *   **IMPORTANT for this project:** Our custom `Queue` uses `Array.prototype.shift()`, which makes `dequeue` O(N).
        *   Therefore, in our actual project: `push` becomes O(N^2) (N `dequeue`s, each O(N)). `pop` becomes O(N). `top` remains O(1). This is inefficient but demonstrates the conceptual solution.
*   **Strategy 2 (`push` O(1), `pop` O(N)):**
    *   `push(x)`: Simply `q1.enqueue(x)`. O(1).
    *   `pop()`: To get the LIFO element, we must `dequeue` N-1 elements from `q1` and `enqueue` them into `q2`. Then `dequeue` the last element from `q1` (this is our result). Finally, swap `q1` and `q2`. O(N) operations.
    *   `top()`: Similar to `pop`, but after getting the last element, re-enqueue it into the main queue. O(N).
    *   `empty()`: O(1).
    *   This strategy makes `pop` (and `top`) expensive, which is often less desirable for a stack.

**Variations:**

*   **Using a single queue:** It's possible to implement a stack with a single queue. On `push(x)`, you `enqueue(x)`, then repeatedly `dequeue` all `N-1` elements and `enqueue` them back. This effectively rotates the queue so `x` becomes the new front. This leads to O(N) for `push` and O(1) for `pop`/`top`.

---

## Problem 5: Sliding Window Maximum

**Problem Description:**
Given an array `nums` and a sliding window of size `k`, return the maximum value in the window as it slides from left to right.

**Optimal Solution (Using a Monotonic Decreasing Deque):**

This is a classic problem that efficiently uses a Deque (Double-Ended Queue). The deque will store indices of elements, not the elements themselves. The key property of the deque is that it will always maintain indices of elements in *decreasing order of their values*.

**Logic:**

1.  **Initialize `result` array and a `deque` (of indices).**
2.  **Iterate `i` from `0` to `nums.length - 1`:**
    *   **Remove elements out of window:** If the index at the front of the deque (`deque.peekFront()`) is `i - k` (or earlier), it means that element is no longer in the current window. `deque.removeFront()`.
    *   **Remove smaller elements from back:** While the deque is not empty AND the element at `nums[deque.peekBack()]` is less than or equal to `nums[i]`, `deque.removeBack()`. This is crucial: if a smaller element is encountered *before* `nums[i]` in the array, it can never be the maximum in any future window that `nums[i]` is part of (because `nums[i]` is larger and comes later). So, these smaller elements are irrelevant. This maintains the decreasing order property.
    *   **Add current element's index:** `deque.addBack(i)`.
    *   **Record maximum:** If `i` is greater than or equal to `k - 1` (meaning the window has fully formed), then the maximum element for the current window is `nums[deque.peekFront()]`. Add this to the `result` array.

**ASCII Diagram:**

`nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`

```
i | nums[i] | Window               | Deque (indices, values)              | Result
--|---------|----------------------|--------------------------------------|----------
0 | 1       | [1                  | D: [0 (1)]                           |
1 | 3       | [1, 3               | D: [1 (3)]                           | (remove 0 because nums[0] <= nums[1])
2 | -1      | [1, 3, -1]           | D: [1 (3), 2 (-1)]                   |
  |         | Window forms         |                                      | [3] (max is nums[deque.peekFront()])
3 | -3      |    [3, -1, -3]       | D: [1 (3), 2 (-1), 3 (-3)]           | [3, 3]
4 | 5       |       [-1, -3, 5]    | D: [4 (5)]                           | (remove 1 (out of window), remove 2,3 (smaller than 5))
  |         |                      |                                      | [3, 3, 5]
5 | 3       |          [-3, 5, 3]  | D: [4 (5), 5 (3)]                    | [3, 3, 5, 5]
6 | 6       |             [5, 3, 6]| D: [6 (6)]                           | (remove 4,5 (smaller than 6))
  |         |                      |                                      | [3, 3, 5, 5, 6]
7 | 7       |                [3, 6, 7]| D: [7 (7)]                           | (remove 5 (out of window), remove 6 (smaller than 7))
  |         |                      |                                      | [3, 3, 5, 5, 6, 7]
```

**Edge Cases & Gotchas:**

*   **Empty `nums` or `k=0`:** Return empty array.
*   **`k=1`:** Each element is its own window's max. Return `nums` itself.
*   **`k > nums.length`:** The window covers the entire array. The result is just `[Math.max(...nums)]`.
*   **All elements are same:** `[5, 5, 5, 5], k=2` -> `[5, 5, 5]`
*   **Duplicate maximums:** The algorithm correctly handles duplicates because `nums[deque.peekBack()] <= nums[i]` will remove older, equal elements, ensuring the deque only keeps the *most recent* index for any given value. This means if `nums = [3, 3, 3]` and `k=2`, it will correctly output `[3, 3]`.

**Variations:**

*   **Sliding Window Minimum:** Use a monotonic *increasing* deque instead.
*   **Sliding Window Average/Sum:** These usually don't require a deque; a running sum with additions/subtractions is sufficient.
*   **Other Sliding Window problems:** Many sliding window problems use two pointers, not necessarily a deque. The deque is specific to finding min/max efficiently.
*   **Fixed size window vs. variable size window:** This problem is fixed size. Variable size window problems often use hash maps for frequency counting or sets for unique elements.

---
---
## Appendix: Memory-Efficient Considerations

While our custom `Stack` and `Queue` implementations use a simple array internally, they are designed to conceptually represent the data structures. In a production environment or for highly memory-constrained systems, further optimizations could be:

*   **Custom `Deque` for `Queue`:** Our `Deque` uses head/tail pointers to achieve O(1) `enqueue` and `dequeue` (amortized). A `Queue` built directly on this `Deque` would be more efficient than `Array.prototype.shift()`.
*   **Linked Lists:** Implementing `Stack`, `Queue`, and `Deque` with linked lists guarantees O(1) `push`/`pop`/`enqueue`/`dequeue` without the need for array resizing, potentially saving memory reallocation overhead. However, linked lists incur slightly more memory per element (due to pointer overhead) and might have worse cache performance compared to contiguous arrays.
*   **Pre-allocated Arrays/Circular Buffers:** For fixed-size or predictable workloads, pre-allocating an array and using it as a circular buffer can be very memory efficient for queues, avoiding dynamic resizing and shifting.

For the purpose of these interview problems, the focus is generally on algorithmic complexity (Time/Space) rather than micro-optimizations of the underlying data structures, assuming standard O(1) operations for primitive stack/queue methods. Our provided `Stack` and `Queue` are clear and functional for demonstrating the core concepts. The `Deque` shows a more robust array-based O(1) implementation.