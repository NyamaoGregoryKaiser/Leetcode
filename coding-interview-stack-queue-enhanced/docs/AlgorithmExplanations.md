```markdown
# Algorithm Explanations

This document provides detailed explanations for the algorithms implemented in the `stack-queue-interview-project`. Each explanation covers the core logic, data structures used, and a step-by-step breakdown of how the solution works.

---

## Problem 1: Min Stack (`CustomMinStack.java`)

**Problem Description:** Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time complexity.

**Approach: Two Stacks**

This approach uses two `java.util.Stack` instances:
1.  **`mainStack`**: Stores all the elements of the stack in their normal order.
2.  **`minStack`**: Stores the minimum element encountered *up to that point* in the `mainStack`.

**Detailed Logic:**

*   **`CustomMinStack()` (Constructor):**
    *   Initializes `mainStack` and `minStack` as empty `Stack` objects.

*   **`push(int val)`:**
    1.  Always push `val` onto `mainStack`. This ensures the primary stack behavior.
    2.  Check `minStack`:
        *   If `minStack` is empty, or `val` is less than or equal to `minStack.peek()`, then `val` is a new overall minimum (or a duplicate minimum that needs to be tracked). Push `val` onto `minStack`.
        *   **Why `<= val` and not just `< val`?** If we have `[2, 0, 3, 0]` and only push to `minStack` if `val < minStack.peek()`, `minStack` might look like `[2, 0]`. If the first `0` is popped, the `getMin` would then return `2`, which is incorrect because the second `0` is still in `mainStack`. By pushing `0` again (if `0 <= 0`), `minStack` would be `[2, 0, 0]`, ensuring `getMin` remains `0` until both `0`s are popped.

*   **`pop()`:**
    1.  Check `mainStack.peek()`: If the element at the top of `mainStack` is equal to `minStack.peek()`, it means this element was a minimum that we tracked. Therefore, pop it from `minStack` as well.
    2.  Always pop from `mainStack`.

*   **`top()`:**
    1.  Returns `mainStack.peek()`. This is straightforward as `mainStack` contains all elements in standard stack order.

*   **`getMin()`:**
    1.  Returns `minStack.peek()`. By design, `minStack`'s top element is always the current minimum of all elements currently in `mainStack`.

**Time Complexity:**
*   `push`, `pop`, `top`, `getMin`: O(1) for all operations. Stack operations (push, pop, peek) are inherently O(1). The conditional checks and comparisons also take constant time.

**Space Complexity:**
*   O(N) in the worst case, where N is the number of elements in the stack. This happens when elements are pushed in strictly decreasing order (e.g., `5, 4, 3, 2, 1`), causing `minStack` to grow to the same size as `mainStack`. In the best case (e.g., `1, 2, 3, 4, 5`), `minStack` might only store one element.

---

## Problem 2: Valid Parentheses (`StackProblems.java#isValidParentheses`)

**Problem Description:** Given a string `s` consisting of '(', ')', '{', '}', '[', ']', determine if the input string is valid.

**Approach: Stack**

This problem is a classic application of a stack to check for balanced symbols.

**Detailed Logic:**

1.  **Edge Case:** If the length of the string `s` is odd, it's impossible for all brackets to be matched, so return `false` immediately.
2.  **Initialize Stack and Mappings:**
    *   Create an empty `Stack<Character>` to store opening brackets.
    *   Create a `HashMap<Character, Character>` to map closing brackets to their corresponding opening brackets (e.g., `')' -> '('`, `'}' -> '{'`, `']' -> '['`). This allows for quick lookup.
3.  **Iterate Through String:**
    *   For each character `c` in the input string `s`:
        *   **If `c` is a closing bracket:**
            *   Check if `c` is a key in our `mappings` map.
            *   If yes, then `c` is a closing bracket.
            *   **Condition 1: Empty Stack or Mismatch:**
                *   If the stack is empty, it means we encountered a closing bracket without any corresponding opening bracket, so the string is invalid. Return `false`.
                *   Pop the top element from the stack (`topChar`).
                *   Compare `topChar` with the expected opening bracket for `c` (which is `mappings.get(c)`). If they don't match, the order is incorrect, so the string is invalid. Return `false`.
        *   **If `c` is an opening bracket:**
            *   If `c` is not a key in `mappings` (meaning it's an opening bracket), push `c` onto the stack.
4.  **Final Check:**
    *   After iterating through the entire string, if the stack is empty, it means every opening bracket had a corresponding and correctly ordered closing bracket. Return `true`.
    *   If the stack is not empty, it means there are unmatched opening brackets (e.g., `"{[("`), so return `false`.

**Time Complexity:**
*   O(N), where N is the length of the input string. We iterate through the string once, and each stack operation (push, pop, peek, isEmpty) and map lookup takes O(1) time.

**Space Complexity:**
*   O(N) in the worst case (e.g., a string like `(((((((((`), where all characters are opening brackets and are pushed onto the stack. The `HashMap` for mappings is constant size (6 entries).

---

## Problem 3: Trapping Rain Water (`StackProblems.java#trapRainWaterMonotonicStack`, `StackProblems.java#trapRainWaterTwoPointers`)

**Problem Description:** Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.

This problem has several elegant solutions. Two optimal solutions are implemented: Monotonic Stack and Two Pointers.

### Approach 1: Monotonic Stack

A monotonic stack (specifically, a decreasing monotonic stack for this problem) helps find the "walls" that can trap water.

**Detailed Logic:**

1.  **Initialize:**
    *   `totalWater = 0`: Stores the total amount of trapped water.
    *   `stack = new Stack<Integer>()`: Stores indices of bars. The stack will maintain indices of bars in *decreasing order of their heights*.
2.  **Iterate Through `height` Array:** For `i` from 0 to `n-1` (the length of `height`):
    *   **While `stack` is not empty AND `height[i]` is greater than `height[stack.peek()]`:**
        *   This condition means we've found a bar (`height[i]`) that is taller than the bar at the top of the stack (`height[stack.peek()]`). This taller bar can act as a right boundary.
        *   `bottomIndex = stack.pop()`: Pop the bar that is shorter and acts as the "bottom" of a potential water well.
        *   **If `stack` is now empty:**
            *   It means there is no left boundary for the `bottomIndex` bar (all previous bars were shorter or equal and got popped). So, no water can be trapped with this `bottomIndex` as the base. Break from the inner while loop.
        *   **If `stack` is not empty:**
            *   `leftBoundaryIndex = stack.peek()`: The bar at the new stack top is the left boundary.
            *   `leftBoundaryHeight = height[leftBoundaryIndex]`
            *   `rightBoundaryHeight = height[i]`
            *   `trappedHeight = Math.min(leftBoundaryHeight, rightBoundaryHeight) - height[bottomIndex]`: The water level is limited by the shorter of the two boundaries. Subtract `height[bottomIndex]` to get the water depth above the popped bar.
            *   `trappedWidth = i - leftBoundaryIndex - 1`: The width is the distance between the two boundaries minus the `bottomIndex` bar itself.
            *   `totalWater += trappedHeight * trappedWidth`: Add the calculated water volume.
    *   **After the while loop:** Push `i` (the index of the current bar) onto the stack. This maintains the decreasing order property or starts a new potential well.

**Time Complexity:**
*   O(N). Each element is pushed onto the stack and popped from the stack at most once. Therefore, the total number of operations is proportional to N.

**Space Complexity:**
*   O(N) in the worst case (e.g., `[5, 4, 3, 2, 1]`), where all elements might be pushed onto the stack before any popping occurs.

### Approach 2: Two Pointers

This approach is highly efficient in terms of space.

**Detailed Logic:**

1.  **Initialize:**
    *   `left = 0`, `right = n - 1`: Pointers starting at the ends of the array.
    *   `leftMax = 0`, `rightMax = 0`: Stores the maximum height encountered so far from the left and right, respectively.
    *   `totalWater = 0`: Stores the total trapped water.
2.  **Iterate with Two Pointers:** While `left < right`:
    *   **If `height[left] < height[right]`:**
        *   This means the `left` side is currently the shorter wall. The amount of water that can be trapped at the `left` pointer's position will be limited by `leftMax`. We are guaranteed that there's a wall on the `right` that is at least as tall as `height[left]` (or `rightMax` which is at least `height[right]`).
        *   **If `height[left] >= leftMax`:** Update `leftMax = height[left]`. This new bar is taller than or equal to anything seen on its left, so it becomes the new left maximum. No water can be trapped at this position.
        *   **Else (`height[left] < leftMax`):** Water can be trapped here. The water level will be `leftMax`, so `totalWater += leftMax - height[left]`.
        *   Increment `left` (`left++`).
    *   **Else (`height[right] <= height[left]`):**
        *   This means the `right` side is currently the shorter or equal wall. The logic is symmetrical to the left side.
        *   **If `height[right] >= rightMax`:** Update `rightMax = height[right]`.
        *   **Else (`height[right] < rightMax`):** `totalWater += rightMax - height[right]`.
        *   Decrement `right` (`right--`).
3.  **Return `totalWater`**.

**Why this works:** When we move the `left` pointer, we know that there is *some* bar on the right side that is at least as tall as `height[left]`. The actual `rightMax` is sufficient to contain the water. Similarly, when we move the `right` pointer, there is *some* bar on the left that is at least as tall as `height[right]`.

**Time Complexity:**
*   O(N). We iterate through the array with two pointers, each moving inward, resulting in a single pass.

**Space Complexity:**
*   O(1). Only a few variables are used.

---

## Problem 4: Implement Queue using Stacks (`CustomQueueViaStacks.java`)

**Problem Description:** Implement a FIFO queue using only two stacks. Support `push`, `pop`, `peek`, and `empty` operations.

**Approach: Two Stacks**

This is the standard solution for implementing a queue with two stacks.

**Detailed Logic:**

1.  **Initialize:**
    *   `inputStack = new Stack<T>()`: Used for `push` operations. New elements are always added here.
    *   `outputStack = new Stack<T>()`: Used for `pop` and `peek` operations. Elements are moved here when needed for FIFO retrieval.
2.  **`push(T x)`:**
    *   Simply push `x` onto `inputStack`. This is an O(1) operation.
3.  **`peek()` and `pop()`:**
    *   The core idea is that `outputStack` should always contain elements in the correct FIFO order for retrieval.
    *   **First, check `outputStack`:** If `outputStack` is not empty, its top element is the front of the queue. So, just `peek()` or `pop()` from `outputStack`. This is O(1).
    *   **If `outputStack` is empty:** This is when we need to "transfer" elements.
        *   Call a helper method `transferElementsIfNeeded()`.
        *   While `inputStack` is not empty, pop elements from `inputStack` and push them onto `outputStack`.
        *   This effectively reverses the order of elements from `inputStack` (LIFO) into `outputStack` (now FIFO for the order they were pushed into `inputStack`).
    *   After the transfer (if needed), `outputStack` will have the correct front element at its top. Now `peek()` or `pop()` from `outputStack`.
4.  **`empty()`:**
    *   The queue is empty if and only if both `inputStack` and `outputStack` are empty. This is an O(1) operation.

**Amortized Time Complexity:**
*   **`push`**: O(1).
*   **`pop` / `peek`**: O(1) amortized. While a single `pop` or `peek` operation (when `outputStack` is empty) can take O(N) time (to transfer N elements), each element is transferred from `inputStack` to `outputStack` only once in its lifetime. So, for N elements, the total cost of transfers is O(N). When averaged over N operations, the amortized cost per `pop` or `peek` is O(1).
*   **`empty`**: O(1).

**Space Complexity:**
*   O(N), where N is the total number of elements in the queue. All elements are stored across `inputStack` and `outputStack`.

---

## Problem 5: Sliding Window Maximum (`CombinedProblems.java#maxSlidingWindow`)

**Problem Description:** Given an array `nums` and a sliding window of size `k`, return the maximum for each window.

**Approach: Deque (Double-Ended Queue) / Monotonic Queue**

This is the most efficient approach, using a `Deque` to maintain a "monotonic queue" of potentially maximum elements.

**Detailed Logic:**

1.  **Initialize:**
    *   `result = new int[n - k + 1]`: Array to store the maximums for each window.
    *   `resultIdx = 0`: Index for populating `result`.
    *   `deque = new ArrayDeque<Integer>()`: Stores *indices* of elements from `nums`. The deque will maintain elements such that `nums[deque.peekFirst()]` is the maximum in the current window, and elements within the deque are in *decreasing order* of their values.

2.  **Iterate Through `nums` Array:** For `i` from 0 to `n-1`:

    *   **Step 1: Remove Old Indices (Out of Window)**
        *   If `deque` is not empty and `deque.peekFirst()` (the index of the current maximum) is outside the current window `[i - k + 1, i]` (i.e., `deque.peekFirst() <= i - k`), remove it from the front of the deque (`deque.removeFirst()`).

    *   **Step 2: Remove Smaller Elements (Maintain Monotonic Decreasing Order)**
        *   While `deque` is not empty and `nums[deque.peekLast()]` (the value of the element at the back of the deque) is less than or equal to `nums[i]` (the current element):
            *   Remove `deque.peekLast()` from the back (`deque.removeLast()`).
            *   **Why?** If `nums[i]` is greater than or equal to `nums[deque.peekLast()]`, and `nums[i]` appears later, then `nums[deque.peekLast()]` can never be the maximum in any future window that `nums[i]` is part of (because `nums[i]` is better and newer). So, it's irrelevant. Removing these smaller elements from the back maintains the decreasing order property and keeps only relevant candidates.

    *   **Step 3: Add Current Index**
        *   Add the current index `i` to the back of the deque (`deque.addLast(i)`).

    *   **Step 4: Record Maximum (Once Window is Formed)**
        *   If `i` is greater than or equal to `k - 1` (meaning the first window of size `k` has been fully formed or we are in subsequent windows):
            *   The maximum element in the current window is `nums[deque.peekFirst()]` (because the deque always keeps the largest element's index at its front).
            *   Store this maximum in `result[resultIdx++]`.

3.  **Return `result`**.

**Time Complexity:**
*   O(N). Each element in `nums` is processed once. It is pushed onto the deque at most once and popped from the deque at most once. Therefore, the total number of operations on the deque is proportional to N.

**Space Complexity:**
*   O(K) in the worst case. The deque can store up to `k` elements if the window contains a strictly decreasing sequence (e.g., `[5, 4, 3]`).

---
```