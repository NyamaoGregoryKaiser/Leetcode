```markdown
# Algorithms Explanation Document

This document provides a detailed explanation of the algorithms used to solve the Stack and Queue problems in this project. Each problem includes its statement, the intuition behind the solution, step-by-step algorithm, and a comprehensive complexity analysis. Where applicable, multiple approaches (e.g., brute-force vs. optimized) are discussed.

---

## Table of Contents

1.  [Problem 1: Valid Parentheses](#problem-1-valid-parentheses)
2.  [Problem 2: Implement Queue using Stacks](#problem-2-implement-queue-using-stacks)
3.  [Problem 3: Moving Average from Data Stream](#problem-3-moving-average-from-data-stream)
4.  [Problem 4: Largest Rectangle in Histogram](#problem-4-largest-rectangle-in-histogram)
5.  [Problem 5: Min Stack](#problem-5-min-stack)

---

## 1. Problem 1: Valid Parentheses

**Problem Statement:**
Given a string `s` containing just the characters '(', ')', '{', '}', '[', ']', determine if the input string is valid.

An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Constraints:** `1 <= s.length <= 10^4`, `s` consists of parentheses only `'()[]{}'`.

### Approach 1 (Optimal): Using a Stack

**Intuition:**
This is a classic use case for a Stack. Stacks follow the LIFO (Last-In, First-Out) principle, which perfectly mirrors the requirement for parentheses to be closed in the reverse order of their opening. When we encounter an opening bracket, we expect its corresponding closing bracket to appear *later* but *before* other opening brackets that come after it.

We can process the string character by character:
*   If we see an opening bracket `(`, `{`, or `[`, we "remember" it by pushing it onto the stack.
*   If we see a closing bracket `)`, `}`, or `]`, we must check if it matches the *most recently opened* unmatched bracket. This "most recently opened" concept directly translates to the top of our stack.
    *   If the stack is empty, there's no opening bracket to match, so it's invalid.
    *   If the stack is not empty, we pop the top element. If it doesn't match the current closing bracket's type, it's invalid.
*   After iterating through the entire string, if the stack is empty, it means all opening brackets found their proper closing counterparts. If the stack is not empty, it means there are unclosed opening brackets, rendering the string invalid.

**Algorithm (`isValidParenthesesOptimal`):**
1.  Initialize an empty `Stack`.
2.  Create a `map` (or `object` in JS) to store the corresponding opening bracket for each closing bracket. E.g., `')': '(', '}': '{', ']': '['`.
3.  Iterate through each `char` in the input string `s`:
    *   If `char` is a *closing* bracket (i.e., `map[char]` exists):
        *   Check if the `stack` is empty. If it is, or if `stack.pop()` does not equal `map[char]`, then the string is invalid. Return `false`.
    *   If `char` is an *opening* bracket:
        *   Push `char` onto the `stack`.
4.  After the loop, return `stack.isEmpty()`. If true, all brackets were matched; otherwise, some opening brackets were left unclosed.

**Example Walkthrough for `s = "{[()]}"`:**
1.  `stack = []`, `map = {')':'(', '}':'{', ']':'['}`
2.  `char = '{'`: Is opening. `stack.push('{')`. `stack = ['{']`
3.  `char = '['`: Is opening. `stack.push('[')`. `stack = ['{', '[']`
4.  `char = '('`: Is opening. `stack.push('(')`. `stack = ['{', '[', '(']`
5.  `char = ')'`: Is closing. `stack` is not empty. `stack.pop()` -> `'('`. `'(' === map[')']` (which is `'('`). Match! `stack = ['{', '[']`
6.  `char = ']':` Is closing. `stack` is not empty. `stack.pop()` -> `'['`. `'[' === map[']']` (which is `'['`). Match! `stack = ['{']`
7.  `char = '}'`: Is closing. `stack` is not empty. `stack.pop()` -> `'{'`. `'{' === map['}']` (which is `'{'`). Match! `stack = []`
8.  End of string. `stack.isEmpty()` is `true`. Return `true`.

**Complexity Analysis:**
*   **Time Complexity:** O(N), where N is the length of the input string `s`.
    *   We iterate through the string once.
    *   Each stack operation (`push`, `pop`, `peek`, `isEmpty`) takes O(1) time.
*   **Space Complexity:** O(N)
    *   In the worst case (e.g., `(((((((`), the stack could store all N opening brackets.
    *   The map for bracket relationships uses constant space (6 key-value pairs).

### Approach 2 (Conceptual Brute Force): String Replacement

**Intuition:**
While not a typical "brute force" in the sense of trying all permutations, a less efficient approach could involve iteratively removing all valid adjacent pairs of brackets from the string until no more such pairs exist. If the string becomes empty, it was valid.

**Algorithm (`isValidParenthesesBruteForce`):**
1.  Initialize `currentS = s`.
2.  Enter a loop that continues as long as `currentS` changes in length:
    *   Store `prevLength = currentS.length`.
    *   Replace all occurrences of `"()"` with `""` in `currentS`.
    *   Replace all occurrences of `"{}"` with `""` in `currentS`.
    *   Replace all occurrences of `"[]"` with `""` in `currentS`.
    *   If `currentS.length` is still `prevLength`, break the loop (no more valid pairs could be removed).
3.  After the loop, return `currentS.length === 0`.

**Example Walkthrough for `s = "{[()]}"`:**
1.  `currentS = "{[()]}"`
2.  Pass 1:
    *   `currentS.replace('()', '')` -> `"{[]}"`
    *   `currentS.replace('{}', '')` -> `"{[]}"`
    *   `currentS.replace('[]', '')` -> `"{}"`
    *   `currentS` changed length.
3.  Pass 2:
    *   `currentS = "{}"`
    *   `currentS.replace('()', '')` -> `"{}"`
    *   `currentS.replace('{}', '')` -> `""`
    *   `currentS` changed length.
4.  Pass 3:
    *   `currentS = ""`
    *   No replacements change length. Break.
5.  Return `"".length === 0` which is `true`.

**Complexity Analysis:**
*   **Time Complexity:** O(N^2) in the worst case.
    *   In JavaScript, `String.prototype.replace` creates a new string and can take O(N) time for scanning and copying, where N is the string's current length.
    *   Consider a string like `((()))`. Each pass removes one `()` pair. This means O(N) passes. Each pass involves replacements on a string that is still O(N) length.
    *   Total: O(N * N) = O(N^2).
*   **Space Complexity:** O(N)
    *   Due to string immutability in JavaScript, each `replace` operation potentially creates new strings, which can accumulate to O(N) space.

---

## 2. Problem 2: Implement Queue using Stacks

**Problem Statement:**
Implement a first-in, first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `pop`, `peek`, and `empty`).

You must use only standard operations of a stack, which means only `push to top`, `peek/top`, `pop from top`, and `is empty` operations are valid.

**Constraints:** `1 <= x <= 9`, at most `100` calls to operations, all calls to `pop` and `peek` are valid (i.e., not called on an empty queue).

### Approach 1 (Optimal): Lazy Transfer with Two Stacks

**Intuition:**
A queue is FIFO, while a stack is LIFO. To simulate FIFO using two LIFO stacks, we need a mechanism to reverse the order of elements when necessary.

Imagine `stack1` where you push elements. The first element pushed is at the bottom. To "dequeue" it, you need to get the bottom element. You can achieve this by moving all elements from `stack1` to a `stack2`. When `stack1` is emptied into `stack2`, the order of elements is reversed. The original bottom element of `stack1` (the "front" of our conceptual queue) will now be at the top of `stack2`.

We use two stacks:
*   `inStack`: For `push` operations. Elements are always pushed here.
*   `outStack`: For `pop` and `peek` operations. Elements are transferred here from `inStack` when `outStack` is empty.

The "lazy" part means we only transfer elements when `outStack` is empty and a `pop` or `peek` operation is requested. This amortizes the cost of transfers.

**Algorithm (`MyQueueOptimal`):**
1.  **`constructor()`**:
    *   Initialize `inStack = new Stack()` and `outStack = new Stack()`.
2.  **`push(x)`**:
    *   `inStack.push(x)`. This is always O(1).
3.  **`pop()`**:
    *   Call `_transferStacks()` to ensure `outStack` has elements in the correct order.
    *   Return `outStack.pop()`.
4.  **`peek()`**:
    *   Call `_transferStacks()` to ensure `outStack` has elements in the correct order.
    *   Return `outStack.peek()`.
5.  **`empty()`**:
    *   Return `inStack.isEmpty() && outStack.isEmpty()`.
6.  **`_transferStacks()` (private helper method):**
    *   If `outStack.isEmpty()` is `true`:
        *   While `inStack` is not empty:
            *   `outStack.push(inStack.pop())`.
        *   This moves all elements from `inStack` to `outStack`, reversing their order. The first element pushed into `inStack` is now at the top of `outStack`.

**Example Walkthrough for `push(1), push(2), peek(), pop(), push(3), peek()`:**
1.  `push(1)`: `inStack = [1]`, `outStack = []`
2.  `push(2)`: `inStack = [1, 2]`, `outStack = []`
3.  `peek()`:
    *   `outStack` is empty, so `_transferStacks()` is called.
    *   `inStack.pop()` (2) -> `outStack.push(2)`. `inStack = [1]`, `outStack = [2]`
    *   `inStack.pop()` (1) -> `outStack.push(1)`. `inStack = []`, `outStack = [2, 1]`
    *   Now `outStack.peek()` returns `1`. Output: `1`
4.  `pop()`:
    *   `outStack` is NOT empty (it has `[2, 1]`), so `_transferStacks()` is NOT called.
    *   `outStack.pop()` returns `1`. Output: `1`. `outStack = [2]`
5.  `push(3)`: `inStack = [3]`, `outStack = [2]`
6.  `peek()`:
    *   `outStack` is NOT empty (it has `[2]`), so `_transferStacks()` is NOT called.
    *   `outStack.peek()` returns `2`. Output: `2`

**Complexity Analysis:**
*   **Time Complexity:**
    *   `push`: O(1).
    *   `pop`, `peek`: Amortized O(1). In the worst case, if `outStack` is empty and `inStack` has N elements, `_transferStacks()` takes O(N). However, each element is pushed once to `inStack`, popped once from `inStack` (to `outStack`), and popped once from `outStack`. Across a sequence of M operations, the total work for transfers is proportional to the number of elements pushed, so the average cost per operation is O(1).
    *   `empty`: O(1).
*   **Space Complexity:** O(N)
    *   In the worst case, all N elements will be stored across both `inStack` and `outStack`.

### Approach 2 (Alternative): Eager Transfer with Two Stacks

**Intuition:**
Instead of transferring elements lazily, we can ensure that one stack (say, `mainStack`) always holds the elements in true queue order (oldest at top, newest at bottom). To do this, every time we `push` a new element, we must temporarily move all existing elements out, push the new element, and then move the old elements back.

**Algorithm (`MyQueueEagerTransfer`):**
1.  **`constructor()`**:
    *   Initialize `mainStack = new Stack()` and `tempStack = new Stack()`.
2.  **`push(x)`**:
    *   While `mainStack` is not empty, `tempStack.push(mainStack.pop())`. (Transfer all elements to `tempStack`)
    *   `mainStack.push(x)`. (Push the new element, it becomes the new "front")
    *   While `tempStack` is not empty, `mainStack.push(tempStack.pop())`. (Transfer elements back, maintaining order with `x` now at the bottom of the original elements)
3.  **`pop()`**:
    *   Return `mainStack.pop()`. (Since `mainStack` is always maintained in queue order, the top is the front)
4.  **`peek()`**:
    *   Return `mainStack.peek()`.
5.  **`empty()`**:
    *   Return `mainStack.isEmpty()`.

**Complexity Analysis:**
*   **Time Complexity:**
    *   `push`: O(N), where N is the current number of elements in the queue. Every push requires transferring all existing elements twice.
    *   `pop`, `peek`, `empty`: O(1).
*   **Space Complexity:** O(N)
    *   All N elements will be stored across both stacks during the transfer process.

**Comparison:**
The "Lazy Transfer" (Optimal) approach is generally preferred because it amortizes the cost of transfers, making `pop` and `peek` O(1) on average, while `push` is always O(1). The "Eager Transfer" approach has an O(N) `push` operation, which can be a bottleneck if many `push` operations occur.

---

## 3. Problem 3: Moving Average from Data Stream

**Problem Statement:**
Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the `MovingAverage` class:
*   `MovingAverage(int size)` Initializes the object with the size of the window `size`.
*   `double next(int val)` Returns the moving average of the last `size` values of the stream.

**Constraints:** `1 <= size <= 1000`, `-10^5 <= val <= 10^5`, at most `10^4` calls to `next`.

### Approach 1 (Optimal): Using a Queue (Sliding Window)

**Intuition:**
The concept of a "moving average of the last `size` values" perfectly describes a sliding window pattern where elements enter from one end and leave from the other. A Queue (FIFO - First-In, First-Out) is the ideal data structure for managing the elements within such a window.

When a new value `val` arrives:
1.  It is added to the "back" of the window (queue).
2.  If the window is now larger than `size`, the "oldest" value (from the "front" of the queue) must be removed.
To efficiently calculate the average, we also need to maintain the sum of elements currently in the window.

**Algorithm (`MovingAverageOptimal`):**
1.  **`constructor(size)`**:
    *   Initialize `this.windowSize = size`.
    *   Initialize `this.queue = new Queue()`.
    *   Initialize `this.windowSum = 0`.
2.  **`next(val)`**:
    *   **Add new element:**
        *   `this.queue.enqueue(val)`.
        *   `this.windowSum += val`.
    *   **Manage window size (remove oldest if full):**
        *   If `this.queue.size() > this.windowSize`:
            *   `oldestVal = this.queue.dequeue()`.
            *   `this.windowSum -= oldestVal`.
    *   **Calculate average:**
        *   Return `this.windowSum / this.queue.size()`. (The `queue.size()` will be `windowSize` if full, or smaller if the window is still filling up).

**Example Walkthrough for `MovingAverage(3)` with `next(1), next(10), next(3), next(5)`:**
*   `ma = new MovingAverage(3)`: `windowSize=3`, `queue=[]`, `windowSum=0`

1.  `next(1)`:
    *   `queue.enqueue(1)`. `queue=[1]`, `windowSum=1`
    *   `queue.size()` (1) <= `windowSize` (3), so no dequeue.
    *   Return `1 / 1 = 1.0`
2.  `next(10)`:
    *   `queue.enqueue(10)`. `queue=[1, 10]`, `windowSum=1 + 10 = 11`
    *   `queue.size()` (2) <= `windowSize` (3), so no dequeue.
    *   Return `11 / 2 = 5.5`
3.  `next(3)`:
    *   `queue.enqueue(3)`. `queue=[1, 10, 3]`, `windowSum=11 + 3 = 14`
    *   `queue.size()` (3) <= `windowSize` (3), so no dequeue.
    *   Return `14 / 3 = 4.666...`
4.  `next(5)`:
    *   `queue.enqueue(5)`. `queue=[1, 10, 3, 5]`, `windowSum=14 + 5 = 19`
    *   `queue.size()` (4) > `windowSize` (3):
        *   `oldestVal = queue.dequeue()` (1). `queue=[10, 3, 5]`
        *   `windowSum = 19 - 1 = 18`
    *   Return `18 / 3 = 6.0`

**Complexity Analysis:**
*   **Time Complexity:** O(1) for each `next()` operation.
    *   Queue operations (`enqueue`, `dequeue`, `size`) are typically O(1) for a well-implemented queue (e.g., using a linked list or circular buffer). Our custom `Queue` uses `push` and `shift` on an array. While `shift` can be O(N) in the worst case for standard arrays in JavaScript, for practical scenarios and typical array sizes in interview problems, JavaScript engines often optimize it to be effectively constant or near-constant time. If `N` were extremely large and `shift` performance became critical, a truly O(1) circular buffer (see next approach) would be used.
    *   Arithmetic operations are O(1).
*   **Space Complexity:** O(WindowSize)
    *   The queue will store at most `windowSize` elements.

### Approach 2 (Alternative): Fixed-size Circular Buffer (Array-based)

**Intuition:**
To guarantee strict O(1) time complexity for `dequeue`-like operations even for very large window sizes, we can use a pre-allocated fixed-size array and manage it as a circular buffer. This avoids the potential O(N) cost of `Array.prototype.shift()` in JavaScript.

We maintain:
*   An array `buffer` of size `windowSize`.
*   A `head` pointer that indicates the next position to write to (and also points to the oldest element if the buffer is full).
*   A `count` of currently valid elements in the buffer.

**Algorithm (`MovingAverageCircularBuffer`):**
1.  **`constructor(size)`**:
    *   Initialize `this.windowSize = size`.
    *   Initialize `this.buffer = new Array(size).fill(0)`. (Pre-allocate space)
    *   Initialize `this.head = 0`. (Index for next write)
    *   Initialize `this.count = 0`. (Number of elements currently in buffer)
    *   Initialize `this.windowSum = 0`.
2.  **`next(val)`**:
    *   **Remove oldest (if window is full):**
        *   If `this.count === this.windowSize` (buffer is full):
            *   `this.windowSum -= this.buffer[this.head]`. (Subtract the oldest element that will be overwritten)
    *   **Add new element:**
        *   `this.buffer[this.head] = val`.
        *   `this.windowSum += val`.
    *   **Advance head pointer:**
        *   `this.head = (this.head + 1) % this.windowSize`. (Uses modulo to wrap around)
    *   **Update count:**
        *   If `this.count < this.windowSize`, `this.count++`. (Increment count until window is full)
    *   **Calculate average:**
        *   Return `this.windowSum / this.count`.

**Complexity Analysis:**
*   **Time Complexity:** O(1) for each `next()` operation. All array accesses and arithmetic operations are constant time.
*   **Space Complexity:** O(WindowSize)
    *   The `buffer` array has a fixed size equal to `windowSize`.

**Comparison:**
Both approaches achieve O(1) time complexity per `next()` call, but the Circular Buffer guarantees it even with `Array.prototype.shift()`'s potential pitfalls. For interview settings, the Queue-based solution is often sufficient and easier to implement quickly. The Circular Buffer is a good demonstration of deeper understanding of array limitations.

---

## 4. Problem 4: Largest Rectangle in Histogram

**Problem Statement:**
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Constraints:** `1 <= heights.length <= 10^5`, `0 <= heights[i] <= 10^4`.

### Approach 1 (Optimal): Using a Monotonic Stack

**Intuition:**
For any given bar `heights[i]`, if we consider it as the *minimum height* of a rectangle, that rectangle can extend to the left as far as it encounters a bar shorter than `heights[i]`, and to the right as far as it encounters a bar shorter than `heights[i]`. The area would then be `heights[i] * (right_smaller_index - left_smaller_index - 1)`.

The challenge is to efficiently find the `left_smaller_index` and `right_smaller_index` for all `i`. A monotonic stack is perfectly suited for this. We use a **monotonic increasing stack** (indices of bars with increasing heights).

When we iterate through the `heights` array:
*   If the current bar `heights[i]` is taller than or equal to the bar at the top of the stack, we push `i`. This maintains the increasing property.
*   If `heights[i]` is *shorter* than the bar at the top of the stack, it means the bar(s) at the top of the stack can no longer extend to the right past `i` (because `i` is shorter). This is when we pop from the stack and calculate areas for the popped bars.
    *   When we pop an index `hIndex` from the stack:
        *   The height of the rectangle is `heights[hIndex]`.
        *   The `right_smaller_index` is the current `i`.
        *   The `left_smaller_index` is the new top of the stack (the bar that is the first shorter bar to the left of `heights[hIndex]`), or -1 if the stack becomes empty.
        *   The width is then `i - (stack.peek() + 1)`. If `stack` is empty, `width = i`.

To ensure all bars on the stack are processed, we append a dummy bar of height 0 at the end of the `heights` array. This guarantees that any remaining bars in the stack will be "popped" and their areas calculated.

**Algorithm (`largestRectangleAreaOptimal`):**
1.  Initialize `maxArea = 0`.
2.  Initialize an empty `Stack` (to store indices).
3.  Iterate `i` from `0` to `heights.length` (inclusive, for the dummy bar):
    *   Let `currentHeight = (i === heights.length) ? 0 : heights[i]`. (The dummy bar has height 0 to trigger pops).
    *   **While** the stack is not empty **AND** `currentHeight` is less than `heights[stack.peek()]`:
        *   `hIndex = stack.pop()`. (Index of the bar acting as height)
        *   `h = heights[hIndex]`. (Actual height of the rectangle)
        *   Calculate `width`:
            *   If `stack.isEmpty()` after popping `hIndex`, it means `h` extends from index 0 to `i-1`. So, `width = i`.
            *   Else, `width = i - stack.peek() - 1`. (The element `stack.peek()` is the first shorter bar to the left).
        *   `maxArea = Math.max(maxArea, h * width)`.
    *   Push `i` onto the stack.
4.  Return `maxArea`.

**Example Walkthrough for `heights = [2, 1, 5, 6, 2, 3]`:**
Add dummy `0`: `heights = [2, 1, 5, 6, 2, 3, 0]`
1.  `i=0, h=2`: `stack=[]`. `stack.push(0)`. `stack=[0]`
2.  `i=1, h=1`: `h < heights[stack.peek()]` (1 < 2).
    *   `hIndex=stack.pop()` (0). `h=heights[0]=2`. `stack=[]`.
    *   `width = i` (1). `area = 2 * 1 = 2`. `maxArea=2`.
    *   `stack.push(1)`. `stack=[1]`
3.  `i=2, h=5`: `h > heights[stack.peek()]` (5 > 1). `stack.push(2)`. `stack=[1, 2]`
4.  `i=3, h=6`: `h > heights[stack.peek()]` (6 > 5). `stack.push(3)`. `stack=[1, 2, 3]`
5.  `i=4, h=2`: `h < heights[stack.peek()]` (2 < 6).
    *   `hIndex=stack.pop()` (3). `h=heights[3]=6`. `stack=[1, 2]`.
    *   `width = i - stack.peek() - 1 = 4 - 2 - 1 = 1`. `area = 6 * 1 = 6`. `maxArea=6`.
    *   `h < heights[stack.peek()]` (2 < 5).
    *   `hIndex=stack.pop()` (2). `h=heights[2]=5`. `stack=[1]`.
    *   `width = i - stack.peek() - 1 = 4 - 1 - 1 = 2`. `area = 5 * 2 = 10`. `maxArea=10`.
    *   `h > heights[stack.peek()]` (2 > 1) is FALSE, so exit while loop.
    *   `stack.push(4)`. `stack=[1, 4]`
6.  `i=5, h=3`: `h > heights[stack.peek()]` (3 > 2). `stack.push(5)`. `stack=[1, 4, 5]`
7.  `i=6, h=0` (dummy): `h < heights[stack.peek()]` (0 < 3).
    *   `hIndex=stack.pop()` (5). `h=heights[5]=3`. `stack=[1, 4]`.
    *   `width = i - stack.peek() - 1 = 6 - 4 - 1 = 1`. `area = 3 * 1 = 3`. `maxArea=10`.
    *   `h < heights[stack.peek()]` (0 < 2).
    *   `hIndex=stack.pop()` (4). `h=heights[4]=2`. `stack=[1]`.
    *   `width = i - stack.peek() - 1 = 6 - 1 - 1 = 4`. `area = 2 * 4 = 8`. `maxArea=10`.
    *   `h < heights[stack.peek()]` (0 < 1).
    *   `hIndex=stack.pop()` (1). `h=heights[1]=1`. `stack=[]`.
    *   `width = i` (6). `area = 1 * 6 = 6`. `maxArea=10`.
    *   `stack` is empty. Exit while loop.
    *   `stack.push(6)`. `stack=[6]`
8.  End of loop. Return `maxArea = 10`.

**Complexity Analysis:**
*   **Time Complexity:** O(N)
    *   Each bar's index is pushed onto the stack once and popped from the stack at most once.
    *   All stack operations (`push`, `pop`, `peek`) are O(1).
    *   The loop runs N+1 times.
*   **Space Complexity:** O(N)
    *   In the worst case (e.g., a monotonically increasing histogram `[1,2,3,4,5]`), the stack could store all N indices.

### Approach 2 (Brute Force): Iterate All Subarrays

**Intuition:**
A rectangle is defined by a starting bar index `i`, an ending bar index `j`, and the minimum height bar `minH` within that range `heights[i...j]`. We can simply iterate through all possible `(i, j)` pairs, find the `minH` in each range, and calculate the area.

**Algorithm (`largestRectangleAreaBruteForce`):**
1.  Initialize `maxArea = 0`.
2.  Get `n = heights.length`.
3.  Outer loop: Iterate `i` from `0` to `n - 1` (this `i` is the starting bar of the potential rectangle).
    *   Initialize `minHeight = heights[i]`.
    *   Inner loop: Iterate `j` from `i` to `n - 1` (this `j` is the ending bar of the potential rectangle).
        *   Update `minHeight = Math.min(minHeight, heights[j])`. (As `j` extends, `minHeight` can only decrease or stay the same).
        *   Calculate `currentWidth = j - i + 1`.
        *   Calculate `currentArea = minHeight * currentWidth`.
        *   `maxArea = Math.max(maxArea, currentArea)`.
4.  Return `maxArea`.

**Complexity Analysis:**
*   **Time Complexity:** O(N^2)
    *   The outer loop runs N times.
    *   The inner loop runs N times in the worst case.
    *   Inside the inner loop, finding `minHeight` takes O(1) (because we update incrementally) and other operations are O(1).
    *   Total: N * N = O(N^2).
    *   (If `minHeight` was found by iterating `k` from `i` to `j`, it would be O(N^3)).
*   **Space Complexity:** O(1)
    *   Only a few variables are used.

**Comparison:**
The brute-force O(N^2) solution is too slow for the given constraints (N up to 10^5 would mean 10^10 operations, taking minutes or hours). The monotonic stack solution is efficient at O(N) and is the standard optimal approach.

---

## 5. Problem 5: Min Stack

**Problem Statement:**
Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.

Implement the `MinStack` class:
*   `MinStack()` initializes the stack object.
*   `void push(int val)` pushes the element `val` onto the stack.
*   `void pop()` removes the element on the top of the stack.
*   `int top()` gets the top element of the stack.
*   `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for `push`, `pop`, `top`, and `getMin`.

**Constraints:** `-2^31 <= val <= 2^31 - 1`, `pop`, `top`, `getMin` will always be called on non-empty stacks, at most `3 * 10^4` calls.

### Approach 1 (Optimal): Using an Auxiliary Stack

**Intuition:**
The challenge is `getMin()` in O(1). A regular stack can do `push`, `pop`, `top` in O(1), but `getMin` would typically require iterating through all elements (O(N)). To achieve O(1) `getMin`, we need to store information about the minimums.

The key idea is to use a second, auxiliary stack (`minStack`) that runs in parallel with our main data stack (`dataStack`). The `minStack` will store the minimum element *up to that point* in the `dataStack`.

When we `push(val)`:
*   We always push `val` onto `dataStack`.
*   For `minStack`, we push the *current minimum*. The current minimum is `Math.min(val, minStack.peek())`. If `minStack` is empty, `val` is the first minimum. By pushing the current minimum (even if it's a duplicate of the previous minimum), we ensure `minStack.peek()` *always* holds the correct minimum for the current state of `dataStack`.

When we `pop()`:
*   We simply pop from both `dataStack` and `minStack`. This keeps them synchronized. When an element (and its corresponding minimum tracking entry) is removed, the `minStack.peek()` will correctly show the minimum of the remaining elements.

**Algorithm (`MinStackOptimal`):**
1.  **`constructor()`**:
    *   Initialize `this.dataStack = new Stack()`.
    *   Initialize `this.minStack = new Stack()`.
2.  **`push(val)`**:
    *   `this.dataStack.push(val)`.
    *   If `this.minStack.isEmpty()` or `val <= this.minStack.peek()`:
        *   `this.minStack.push(val)`. (New minimum found or duplicate minimum)
    *   Else:
        *   `this.minStack.push(this.minStack.peek())`. (Maintain previous minimum on `minStack` for synchronization)
3.  **`pop()`**:
    *   `this.dataStack.pop()`.
    *   `this.minStack.pop()`.
4.  **`top()`**:
    *   Return `this.dataStack.peek()`.
5.  **`getMin()`**:
    *   Return `this.minStack.peek()`.

**Example Walkthrough for `push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()`:**
*   `ms = new MinStackOptimal()`: `dataStack=[]`, `minStack=[]`

1.  `push(-2)`:
    *   `dataStack.push(-2)`. `dataStack=[-2]`
    *   `minStack` is empty. `minStack.push(-2)`. `minStack=[-2]`
2.  `push(0)`:
    *   `dataStack.push(0)`. `dataStack=[-2, 0]`
    *   `0 > minStack.peek()` (-2). So `minStack.push(minStack.peek())` (-2). `minStack=[-2, -2]`
3.  `push(-3)`:
    *   `dataStack.push(-3)`. `dataStack=[-2, 0, -3]`
    *   `-3 <= minStack.peek()` (-2). So `minStack.push(-3)`. `minStack=[-2, -2, -3]`
4.  `getMin()`:
    *   Return `minStack.peek()` (-3). Output: `-3`
5.  `pop()`:
    *   `dataStack.pop()` (-3). `dataStack=[-2, 0]`
    *   `minStack.pop()` (-3). `minStack=[-2, -2]`
6.  `top()`:
    *   Return `dataStack.peek()` (0). Output: `0`
7.  `getMin()`:
    *   Return `minStack.peek()` (-2). Output: `-2`

**Complexity Analysis:**
*   **Time Complexity:** O(1) for all operations (`push`, `pop`, `top`, `getMin`).
    *   All stack operations are constant time.
*   **Space Complexity:** O(N)
    *   In the worst case (e.g., monotonically decreasing elements like `[5, 4, 3, 2, 1]`), `minStack` will grow to the same size as `dataStack`. So, we use ~2N space.

### Approach 2 (Memory Optimized): Single Stack with Value-Min Pairs

**Intuition:**
Instead of two entirely separate stacks, we can store pairs of `[value, minimum_at_this_point]` in a single stack. This is conceptually similar to the two-stack approach but keeps related data together.

**Algorithm (`MinStackMemoryOptimized`):**
1.  **`constructor()`**:
    *   Initialize `this.dataStack = new Stack()`. (This stack will store arrays `[value, min_so_far]`).
2.  **`push(val)`**:
    *   `currentMin`: If `this.dataStack.isEmpty()`, `currentMin = val`.
    *   Else, `currentMin = Math.min(val, this.dataStack.peek()[1])`. (Compare with the min of the previous state).
    *   `this.dataStack.push([val, currentMin])`.
3.  **`pop()`**:
    *   `this.dataStack.pop()`.
4.  **`top()`**:
    *   Return `this.dataStack.peek()[0]`. (The actual value).
5.  **`getMin()`**:
    *   Return `this.dataStack.peek()[1]`. (The minimum value in the pair).

**Complexity Analysis:**
*   **Time Complexity:** O(1) for all operations.
    *   Stack operations are O(1), and array access (`[0]` or `[1]`) is O(1).
*   **Space Complexity:** O(N)
    *   The stack stores N elements, but each element is an array (a pair of numbers). This effectively uses `2N` storage for numbers, which is similar to the auxiliary stack approach. The "memory optimized" part comes from potentially better cache locality and less overhead of managing two distinct stack objects depending on the language/runtime, though asymptotically it's still O(N).

### Approach 3 (Further Memory Optimization): Storing Differences

**Intuition:**
This is a more advanced technique to potentially save space, particularly when the minimum doesn't change frequently. Instead of storing the actual value or a pair, when we push a number `val`, we store `val - current_min`. We also need to keep track of the `current_min` separately.

The trick is that if `val` is the new minimum, then `val - old_min` will be negative. When we pop a negative `diff`, we know that the element we are popping *was* the current minimum, and we can restore the *previous* minimum by doing `old_min - diff`.

**Algorithm (`MinStackDiffOptimized`):**
1.  **`constructor()`**:
    *   Initialize `this.dataStack = new Stack()`.
    *   Initialize `this.min = Infinity`. (Keeps track of the absolute minimum value currently in the stack).
2.  **`push(val)`**:
    *   If `this.dataStack.isEmpty()`:
        *   `this.dataStack.push(0)`. (Sentinel value, representing `val - val`).
        *   `this.min = val`.
    *   Else:
        *   `diff = val - this.min`.
        *   `this.dataStack.push(diff)`.
        *   If `diff < 0`: (`val` is the new minimum)
            *   `this.min = val`.
3.  **`pop()`**:
    *   `diff = this.dataStack.pop()`.
    *   If `diff < 0`: (The popped element was the minimum)
        *   `this.min = this.min - diff`. (This mathematically restores the previous minimum)
    *   If the stack becomes empty after pop, `this.min` should typically be reset to `Infinity`. (This edge case is often guaranteed not to happen in LeetCode problems where `pop` is called on non-empty stacks).
4.  **`top()`**:
    *   `diff = this.dataStack.peek()`.
    *   If `diff < 0`:
        *   Return `this.min`. (If `diff` is negative, the current minimum *is* the actual value on top of stack).
    *   Else:
        *   Return `this.min + diff`. (The actual value `val` was `min + diff`).
5.  **`getMin()`**:
    *   Return `this.min`.

**Complexity Analysis:**
*   **Time Complexity:** O(1) for all operations.
*   **Space Complexity:** O(N)
    *   The stack stores N numbers. Compared to `2N` numbers in the previous two approaches, this *can* be more memory-efficient if the numbers stored as differences are smaller and thus consume less memory (e.g., if using fixed-size integers). In JavaScript, where numbers are floating-point, the memory savings might be less pronounced but still avoids storing explicit pairs. This is usually a theoretical optimization for space and comes with increased complexity and potential for bugs.

**Comparison:**
The "Auxiliary Stack" approach is the most straightforward and easiest to understand/implement, making it the preferred solution in interviews. The "Value-Min Pair" approach offers similar asymptotic complexity with slightly cleaner code. The "Difference Storing" approach is a clever but more complex optimization for space that is less common in typical interviews unless specifically probed for advanced memory techniques.
```