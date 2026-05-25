# Algorithm Explanations

This document provides detailed explanations for the optimal algorithms used to solve the problems in this project. Each section includes a high-level overview, step-by-step logic, and ASCII diagrams to visualize the data structures' state changes.

---

## 1. Valid Parentheses

**Problem:** Check if a string of parentheses `(`, `)`, `{`, `}`, `[`, `]` is valid.

**Optimal Approach: Using a Stack**

The core idea is that an opening bracket must be closed by the *same type* of closing bracket and in the *correct order*. A stack is a perfect data structure for this because it enforces LIFO (Last-In, First-Out), which mirrors the nesting nature of parentheses.

**Logic:**

1.  **Initialize an empty stack.** This stack will store opening brackets.
2.  **Iterate through the input string character by character.**
    *   **If an opening bracket is encountered** (`(`, `{`, `[`), push it onto the stack.
    *   **If a closing bracket is encountered** (`)`, `}`, `]`):
        *   Check if the stack is empty. If it is, there's no corresponding opening bracket, so the string is invalid.
        *   Check if the top element of the stack matches the type of the current closing bracket (e.g., if `)` is current, `(` must be on top). If they don't match, the string is invalid.
        *   If they match, pop the top element from the stack, indicating a successful pair.
3.  **After iterating through the entire string:**
    *   If the stack is empty, it means all opening brackets have found their matching closing brackets in the correct order. The string is valid.
    *   If the stack is not empty, it means there are unmatched opening brackets. The string is invalid.

**Time Complexity:** O(N) - We iterate through the string once. Each stack operation (push, pop, top, empty) takes O(1) time.
**Space Complexity:** O(N) - In the worst case (e.g., "((("), the stack can store all N opening brackets.

**ASCII Diagram Example: `s = "([{}])"`**

```
Input String: "([{}])"

Current Char | Stack State (top at right) | Explanation
-------------|----------------------------|----------------------------------------------------
'('          | [ (                        | Push '('.
'['          | [ ( [                      | Push '['.
'{'          | [ ( [ {                    | Push '{'.
'}'          | [ ( [                      | Current '}' matches stack top '{'. Pop '{'.
']'          | [ (                        | Current ']' matches stack top '['. Pop '['.
')'          | [                          | Current ')' matches stack top '('. Pop '('.
(End of String)| []                         | Stack is empty. String is valid.
```

---

## 2. Implement Queue using Stacks

**Problem:** Implement a FIFO queue using only two `std::stack` objects.

**Optimal Approach: Two Stacks (Input and Output)**

The key challenge is simulating FIFO (first-in, first-out) with LIFO (last-in, first-out) stacks. This can be achieved by using two stacks: one for "input" (where new elements are pushed) and one for "output" (where elements are popped/peeked from).

**Logic:**

Let's call the stacks `inputStack` and `outputStack`.

*   **`push(x)` operation:**
    *   Simply push the new element `x` onto `inputStack`. This is an O(1) operation.

*   **`pop()` and `peek()` operations:**
    *   **Before performing a `pop()` or `peek()`:** Check if `outputStack` is empty.
    *   **If `outputStack` is empty:** All elements in `inputStack` need to be transferred to `outputStack`. This involves popping elements one by one from `inputStack` and pushing them onto `outputStack`. This effectively reverses their order, making the oldest element in `inputStack` (which is at its bottom) become the top of `outputStack`.
    *   **Once `outputStack` is populated (or if it wasn't empty to begin with):**
        *   For `pop()`: Pop the top element from `outputStack`.
        *   For `peek()`: Return the top element of `outputStack`.
    *   If `outputStack` is still empty after attempting a transfer (meaning `inputStack` was also empty), the queue is empty.

*   **`empty()` operation:**
    *   The queue is empty if and only if both `inputStack` and `outputStack` are empty.

**Time Complexity:**
*   `push()`: O(1)
*   `pop()` and `peek()`: Amortized O(1).
    *   In the worst case, if `outputStack` is empty, an O(N) transfer operation occurs (where N is the number of elements in `inputStack`).
    *   However, each element is pushed onto `inputStack` once, and then transferred to `outputStack` once, and then popped from `outputStack` once. This means each element undergoes a constant number of stack operations. Over N operations, the total time complexity is O(N), leading to an amortized O(1) cost per operation.
**Space Complexity:** O(N) - The two stacks together store N elements.

**ASCII Diagram Example: Push 1, 2, 3; Pop; Push 4; Pop; Pop**

```
Initial State:
inputStack: []
outputStack: []

1. Push(1):
   inputStack: [1]
   outputStack: []

2. Push(2):
   inputStack: [1, 2]
   outputStack: []

3. Push(3):
   inputStack: [1, 2, 3] (3 is top)
   outputStack: []

4. Pop(): (outputStack is empty, transfer inputStack to outputStack)
   - Pop 3 from inputStack, push to outputStack: inputStack: [1, 2], outputStack: [3]
   - Pop 2 from inputStack, push to outputStack: inputStack: [1], outputStack: [3, 2]
   - Pop 1 from inputStack, push to outputStack: inputStack: [], outputStack: [3, 2, 1] (1 is top)
   - Now pop from outputStack: Pop 1.
   Returns: 1
   inputStack: []
   outputStack: [3, 2] (2 is top)

5. Push(4):
   inputStack: [4]
   outputStack: [3, 2]

6. Pop(): (outputStack is NOT empty)
   - Pop from outputStack: Pop 2.
   Returns: 2
   inputStack: [4]
   outputStack: [3]

7. Pop(): (outputStack is NOT empty)
   - Pop from outputStack: Pop 3.
   Returns: 3
   inputStack: [4]
   outputStack: []

Final State after sequence:
inputStack: [4]
outputStack: []
```

---

## 3. Daily Temperatures

**Problem:** Given `temperatures`, return an array `answer` where `answer[i]` is the number of days to wait for a warmer temperature.

**Optimal Approach: Monotonic Stack**

This problem is a classic application of a "monotonic stack". A monotonic stack is a stack where elements are kept in a specific order (either strictly increasing or strictly decreasing). Here, we need a **monotonic decreasing stack** of *indices*.

**Logic:**

1.  **Initialize an `answer` array** of the same size as `temperatures`, filled with zeros.
2.  **Initialize an empty stack.** This stack will store the *indices* of days whose warmer day has not yet been found. We maintain the invariant that `temperatures[stack.top()]` is always less than or equal to `temperatures[stack.elements_below_top()]`. Or more simply, as we iterate, we push indices onto the stack, ensuring that the temperature at the index we are about to push is *less than or equal to* the temperature at the index at the top of the stack.
3.  **Iterate through the `temperatures` array with index `i` from left to right.**
    *   **While the stack is NOT empty AND the current temperature `temperatures[i]` is GREATER than `temperatures[stack.top()]`:**
        *   This means we've found a warmer day for the day at `stack.top()`.
        *   Let `prevDayIndex = stack.top()`.
        *   Pop `prevDayIndex` from the stack.
        *   Calculate the waiting days: `answer[prevDayIndex] = i - prevDayIndex`.
    *   **Push the current day's index `i` onto the stack.** This maintains the monotonic decreasing property (or rather, ensures that `temperatures[i]` is the "next colder or equal" day for any element potentially still in the stack that is about to be processed). If `temperatures[i]` was greater than `temperatures[stack.top()]`, then `stack.top()` has already been processed and removed. So `i` is pushed onto a stack where all existing elements (if any) are colder than `temperatures[i]`.

4.  **After the loop finishes**, any indices remaining in the stack never found a warmer day, so their `answer` value remains 0 (which was the initial value).

**Time Complexity:** O(N) - Each element is pushed onto the stack and popped from the stack at most once.
**Space Complexity:** O(N) - In the worst case (e.g., `temperatures = [5, 4, 3, 2, 1]`), the stack can store all N indices.

**ASCII Diagram Example: `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`**

```
N = 8
temperatures: [73, 74, 75, 71, 69, 72, 76, 73]
answer:       [ 0,  0,  0,  0,  0,  0,  0,  0]
stack: [] (stores indices)

Iteration | Current Temp | Stack (indices) | Logic                                        | answer array
----------|--------------|-----------------|----------------------------------------------|--------------------------------------
i=0 (73)  | 73           | [0]             | Stack empty, push 0.                         | [0, 0, 0, 0, 0, 0, 0, 0]
i=1 (74)  | 74           | [0] -> 73 < 74  | Pop 0. answer[0] = 1-0 = 1. Push 1.         | [1, 0, 0, 0, 0, 0, 0, 0]
          |              | [1]             |                                              |
i=2 (75)  | 75           | [1] -> 74 < 75  | Pop 1. answer[1] = 2-1 = 1. Push 2.         | [1, 1, 0, 0, 0, 0, 0, 0]
          |              | [2]             |                                              |
i=3 (71)  | 71           | [2] -> 75 > 71  | 71 is not warmer than 75. Push 3.          | [1, 1, 0, 0, 0, 0, 0, 0]
          |              | [2, 3]          |                                              |
i=4 (69)  | 69           | [3] -> 71 > 69  | 69 is not warmer than 71. Push 4.          | [1, 1, 0, 0, 0, 0, 0, 0]
          |              | [2, 3, 4]       |                                              |
i=5 (72)  | 72           | [4] -> 69 < 72  | Pop 4. answer[4] = 5-4 = 1.                | [1, 1, 0, 0, 1, 0, 0, 0]
          |              | [3] -> 71 < 72  | Pop 3. answer[3] = 5-3 = 2.                | [1, 1, 0, 2, 1, 0, 0, 0]
          |              | [2] -> 75 > 72  | 72 is not warmer than 75. Push 5.          | [1, 1, 0, 2, 1, 0, 0, 0]
          |              | [2, 5]          |                                              |
i=6 (76)  | 76           | [5] -> 72 < 76  | Pop 5. answer[5] = 6-5 = 1.                | [1, 1, 0, 2, 1, 1, 0, 0]
          |              | [2] -> 75 < 76  | Pop 2. answer[2] = 6-2 = 4.                | [1, 1, 4, 2, 1, 1, 0, 0]
          |              | []              | Stack empty. Push 6.                         |
          |              | [6]             |                                              |
i=7 (73)  | 73           | [6] -> 76 > 73  | 73 is not warmer than 76. Push 7.          | [1, 1, 4, 2, 1, 1, 0, 0]
          |              | [6, 7]          |                                              |

End of loop.
Final answer: `[1, 1, 4, 2, 1, 1, 0, 0]` (Elements remaining in stack [6,7] will have 0, which is their initial value)
```

---

## 4. Sliding Window Maximum

**Problem:** Find the maximum in each sliding window of size `k` in an array `nums`.

**Optimal Approach: Using a Deque (Double-Ended Queue)**

This problem can be efficiently solved using a `std::deque` (double-ended queue), which allows O(1) time complexity for adding and removing elements from both ends. The deque will store *indices* of elements, not the elements themselves.

**Logic:**

The deque maintains elements (indices) in a **monotonically decreasing order** based on their corresponding values in `nums`. The front of the deque will always store the index of the maximum element in the current window.

1.  **Initialize an empty `result` vector** to store the window maximums.
2.  **Initialize an empty `std::deque<int>` `dq`.** This deque will store indices.
3.  **Iterate through the `nums` array with index `i` from `0` to `N-1`:**

    *   **Step 1: Remove elements from the front of the deque that are out of the current window.**
        *   If `dq` is not empty and `dq.front()` (the index of the maximum candidate) is less than `i - k + 1` (the start of the current window), then `dq.front()` is no longer relevant. Pop it from the front.

    *   **Step 2: Remove elements from the back of the deque that are smaller than or equal to the current element `nums[i]`.**
        *   While `dq` is not empty and `nums[dq.back()] <= nums[i]`:
            *   Pop `dq.back()`.
        *   This ensures that the deque maintains its decreasing order of values and that any smaller element appearing before `nums[i]` is removed because `nums[i]` is a better candidate for the maximum (it's larger and appears later).

    *   **Step 3: Add the current element's index `i` to the back of the deque.**

    *   **Step 4: If the window has fully formed (i.e., `i >= k - 1`):**
        *   The maximum element for the current window is `nums[dq.front()]`. Add this value to the `result` vector.

**Time Complexity:** O(N) - Each element is pushed onto the deque and popped from the deque at most once.
**Space Complexity:** O(K) - The deque stores at most K elements (indices within the current window).

**ASCII Diagram Example: `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`**

```
nums:    [1,  3, -1, -3,  5,  3,  6,  7]
k = 3
result: []
deque:  [] (stores indices)

i | nums[i] | Deque Actions                                        | Deque State (front at left) | Window            | Max
--|---------|------------------------------------------------------|-----------------------------|-------------------|----
0 | 1       | Add 0.                                               | [0]                         | [1]               | -
1 | 3       | Pop 0 (1 < 3). Add 1.                                | [1]                         | [1, 3]            | -
2 | -1      | Add 2. (3 > -1)                                      | [1, 2]                      | [1, 3, -1]        | Add nums[dq.front()]=nums[1]=3 to result.
                                                                                                    result: [3]
3 | -3      | Pop 1 (1 == 3-3). Add 3. ( -1 > -3)                  | [2, 3]                      | [3, -1, -3]       | Add nums[dq.front()]=nums[2]=-1 NO!
                                                                                                    Wait! nums[dq.front()] == nums[2] == -1. This is wrong.
                                                                                                    Correct value is nums[1] = 3.
                                                                                                    Let's retrace step 3 and 4:
                                                                                                    result.push_back(nums[dq.front()])
                                                                                                    For i=2, dq.front()=1, so nums[1]=3. Correct.
                                                                                                    For i=3, dq.front()=2, so nums[2]=-1. Still incorrect based on example output.

                                                                                                    Ah, the condition "Pop 1 (1 == 3-3)" is wrong.
                                                                                                    The window start is `i - k + 1`.
                                                                                                    For i=3, k=3, window starts at `3 - 3 + 1 = 1`.
                                                                                                    dq.front() is 2. 2 is NOT < 1. So 2 is still in window.
                                                                                                    My deque example was wrong for i=3.
                                                                                                    Let's retry from i=3 with correct logic.

Revised ASCII Diagram Example: `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`

```
nums:    [1,  3, -1, -3,  5,  3,  6,  7]
k = 3
result: []
deque:  [] (stores indices)

i | nums[i] | Deque Front Removal (Out of Window) | Deque Back Removal (Smaller) | Add i | Deque State | Window Start | Max (if i >= k-1)
--|---------|-------------------------------------|------------------------------|-------|-------------|--------------|-------------------
0 | 1       | -                                   | -                            | Push 0| [0]         | -            | -
1 | 3       | -                                   | Pop 0 (nums[0]=1 <= nums[1]=3)| Push 1| [1]         | -            | -
2 | -1      | -                                   | -                            | Push 2| [1, 2]      | 0            | nums[1]=3 -> result.push_back(3)
                                                                                                         result: [3]
3 | -3      | - (dq.front()=1, window_start=1)    | -                            | Push 3| [1, 2, 3]   | 1            | nums[1]=3 -> result.push_back(3)
                                                                                                         result: [3, 3]
4 | 5       | - (dq.front()=1, window_start=2)    | Pop 1 (nums[1]=3 <= nums[4]=5)| Push 4| [2, 3]      | 2            | nums[2]=-1 -- NO!
          |         | Pop 2 (nums[2]=-1 <= nums[4]=5) |                        |       | [3]         |
          |         | Pop 3 (nums[3]=-3 <= nums[4]=5) |                        |       | [4]         |
                                                                                                         result: [3, 3, 5]
5 | 3       | - (dq.front()=4, window_start=3)    | -                            | Push 5| [4, 5]      | 3            | nums[4]=5 -> result.push_back(5)
                                                                                                         result: [3, 3, 5, 5]
6 | 6       | - (dq.front()=4, window_start=4)    | Pop 4 (nums[4]=5 <= nums[6]=6)| Push 6| [5]         | 4            | nums[5]=3 -- NO!
          |         | Pop 5 (nums[5]=3 <= nums[6]=6)|                        |       | [6]         |
                                                                                                         result: [3, 3, 5, 5, 6]
7 | 7       | - (dq.front()=6, window_start=5)    | Pop 6 (nums[6]=6 <= nums[7]=7)| Push 7| [7]         | 5            | nums[7]=7 -> result.push_back(7)
                                                                                                         result: [3, 3, 5, 5, 6, 7]

End of loop. Final result: `[3, 3, 5, 5, 6, 7]`
```
The retrace was essential, the diagram logic for monotonic deque can be subtle, especially for step 2's condition `nums[dq.back()] <= nums[i]`. It means *any* elements in the deque that are smaller than or equal to the *new incoming element* `nums[i]` are effectively "obsolete" because `nums[i]` is both greater (or equal) and appears later, making it a better candidate for future window maximums. The element at `dq.front()` will always be the largest in the *current* window.