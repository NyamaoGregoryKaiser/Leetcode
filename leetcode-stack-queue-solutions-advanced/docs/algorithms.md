# Algorithms: Stack and Queue Problems

This document provides detailed explanations, solution approaches, complexity analysis, and visual diagrams for the Stack and Queue problems included in this project.

---

## 1. Valid Parentheses

*   **Problem Statement**:
    Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
    An input string is valid if:
    1.  Open brackets must be closed by the same type of brackets.
    2.  Open brackets must be closed in the correct order.
    3.  Every close bracket has a corresponding open bracket of the same type.

*   **Example**:
    ```
    Input: s = "([{}])"
    Output: true

    Input: s = "{[]}"
    Output: true

    Input: s = "(]"
    Output: false

    Input: s = "([)"
    Output: false
    ```

*   **Approach: Stack-based Matching (Optimal)**

    This problem is a classic application of a Stack. The key idea is that when you encounter an opening bracket, you expect a specific closing bracket type to appear later. A stack helps manage these expectations in the correct Last-In, First-Out (LIFO) order.

    1.  **Initialize a Stack**: Create an empty stack to store opening brackets.
    2.  **Create a Map**: Use a hash map (or dictionary) to quickly identify corresponding pairs. For example, `map = {')': '(', '}': '{', ']': '['}`. The keys are closing brackets, and values are their matching opening brackets.
    3.  **Iterate Through the String**:
        *   If the current character is an **opening bracket** (`(`, `{`, `[`), push it onto the stack.
        *   If the current character is a **closing bracket** (`)`, `}`, `]`):
            *   Check if the stack is empty. If it is, it means we found a closing bracket without a corresponding opening bracket. The string is invalid.
            *   Pop the top element from the stack.
            *   Compare the popped element with the expected opening bracket for the current closing bracket (using our map). If they don't match, the string is invalid.
    4.  **Final Check**: After iterating through the entire string, if the stack is empty, it means all opening brackets have been correctly matched and closed. If the stack is not empty, it means there are unmatched opening brackets left.

*   **ASCII Diagram Example: `s = "([{}])"`**

    ```
    s: " (   [   {   }   ]   ) "
    Stack:
    Initial: []

    Char: '('
    Action: push '('
    Stack: ['(']

    Char: '['
    Action: push '['
    Stack: ['(', '[']

    Char: '{'
    Action: push '{'
    Stack: ['(', '[', '{']

    Char: '}'
    Action: peek: '{', map['}'] == '{'. Match! Pop.
    Stack: ['(', '[']

    Char: ']'
    Action: peek: '[', map[']'] == '['. Match! Pop.
    Stack: ['(']

    Char: ')'
    Action: peek: '(', map[')'] == '('. Match! Pop.
    Stack: []

    End of string. Stack is empty.
    Result: true
    ```

*   **Time Complexity**:
    *   `O(N)`, where `N` is the length of the input string `s`. We iterate through the string once, and each stack operation (push, pop, peek, isEmpty) takes `O(1)` time.

*   **Space Complexity**:
    *   `O(N)` in the worst case. If the string consists only of opening brackets (e.g., `"((((("`), the stack will store all `N` characters. In the best case (e.g., `"()()()"`), the stack size remains constant (max 1 element).

---

## 2. Implement Queue using Stacks

*   **Problem Statement**:
    Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

*   **Example**:
    ```
    MyQueue queue = new MyQueue();
    queue.push(1); // queue is: [1]
    queue.push(2); // queue is: [1, 2]
    queue.peek();  // returns 1
    queue.pop();   // returns 1, queue is: [2]
    queue.empty(); // returns false
    ```

*   **Approach: Two Stacks (Optimal)**

    The core idea is to simulate a FIFO queue using two LIFO stacks:
    1.  **`inStack`**: This stack is used exclusively for `push` operations. When you enqueue an element, you push it onto `inStack`. This stack stores elements in reverse FIFO order (newest at top).
    2.  **`outStack`**: This stack is used for `pop` and `peek` operations. It aims to store elements in FIFO order (oldest at top).

    **Operations**:
    *   **`push(x)`**: Simply push `x` onto `inStack`. This is an `O(1)` operation.
    *   **`pop()`**:
        *   Before popping, ensure `outStack` has elements. If `outStack` is empty, you need to transfer all elements from `inStack` to `outStack`. This transfer reverses the order of elements, effectively putting the oldest elements from `inStack` at the top of `outStack`.
        *   Once `outStack` is populated (or was already non-empty), pop its top element.
    *   **`peek()`**: Same logic as `pop()`, but instead of popping, you peek at the top element of `outStack`.
    *   **`empty()`**: The queue is empty if *both* `inStack` and `outStack` are empty.

*   **ASCII Diagram Example:** `push(1), push(2), push(3), pop(), peek()`

    ```
    Initial State:
    inStack: []
    outStack: []

    1. push(1):
       inStack: [1]
       outStack: []

    2. push(2):
       inStack: [1, 2]
       outStack: []

    3. push(3):
       inStack: [1, 2, 3]
       outStack: []

    4. pop():
       outStack is empty, so transfer from inStack:
       - Pop 3 from inStack, push to outStack. inStack: [1, 2], outStack: [3]
       - Pop 2 from inStack, push to outStack. inStack: [1], outStack: [3, 2]
       - Pop 1 from inStack, push to outStack. inStack: [], outStack: [3, 2, 1] (bottom to top)

       Now, pop from outStack:
       Pop 1 from outStack.
       Returns 1.
       inStack: []
       outStack: [3, 2]

    5. peek():
       outStack is NOT empty.
       Peek at outStack.
       Returns 2.
       inStack: []
       outStack: [3, 2] (unchanged)
    ```

*   **Time Complexity (Amortized)**:
    *   `push`: `O(1)`
    *   `pop`: `O(1)` amortized. In the worst case, transferring `N` elements takes `O(N)` time. However, each element is pushed onto `inStack` once, moved to `outStack` once, and popped from `outStack` once. Over `N` operations, the total cost is `O(N)`, hence `O(1)` amortized per operation.
    *   `peek`: `O(1)` amortized (same reasoning as `pop`).
    *   `empty`: `O(1)`

*   **Space Complexity**:
    *   `O(N)`, where `N` is the total number of elements currently in the queue. All elements reside in either `inStack` or `outStack`.

---

## 3. Sliding Window Maximum

*   **Problem Statement**:
    You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Return the max sliding window.

*   **Example**:
    ```
    Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
    Output: [3,3,5,5,6,7]

    Explanation:
    Window position                Max
    ---------------               -----
    [1  3  -1] -3  5  3  6  7       3
     1 [3  -1  -3] 5  3  6  7       3
     1  3 [-1  -3  5] 3  6  7       5
     1  3  -1 [-3  5  3] 6  7       5
     1  3  -1  -3 [5  3  6] 7       6
     1  3  -1  -3  5 [3  6  7]      7
    ```

*   **Approach 1: Brute Force**

    This is the most straightforward but least efficient approach.
    1.  Iterate `i` from `0` to `N - K` (where `N` is `nums.length`). This `i` represents the start of each sliding window.
    2.  For each window starting at `i` and ending at `i + K - 1`, iterate from `j = i` to `i + K - 1` to find the maximum element within that window.
    3.  Store this maximum in a result array.

    *   **Time Complexity**: `O(N * K)`. For each of the `N - K + 1` windows, we iterate `K` elements.
    *   **Space Complexity**: `O(N)` for the result array.

*   **Approach 2: Monotonic Decreasing Deque (Optimal)**

    This approach uses a **double-ended queue (deque)**, also known as a `Dequeue`, to achieve `O(N)` time complexity. The deque stores indices of elements from the current window, and these elements are kept in **monotonically decreasing order** of their values.

    **Why a monotonic deque?**
    If we have elements `A`, `B`, `C` in the deque, and `nums[A] > nums[B] > nums[C]`, then `nums[A]` is always the maximum until `A` slides out of the window. `B` and `C` are potential maximums only if `A` is gone.

    **Algorithm Steps**:
    1.  **Initialize**: Create an empty deque and an empty result array.
    2.  **Iterate `i` from `0` to `N - 1`**:
        *   **Remove Old Elements**: If the index at the front of the deque (`deque.front()`) is `i - K`, it means this element is now outside the current window. Remove it from the front (`deque.shift()`).
        *   **Maintain Monotonicity**: While the deque is not empty AND `nums[deque.back()] <= nums[i]`, remove elements from the back of the deque (`deque.pop()`). This step is crucial: if a new element `nums[i]` is greater than or equal to an element currently at the back of the deque, then that older, smaller element will *never* be the maximum in any future window that `nums[i]` is part of. `nums[i]` "dominates" it.
        *   **Add Current Element**: Push the current index `i` to the back of the deque (`deque.push(i)`).
        *   **Record Maximum**: If `i` is greater than or equal to `K - 1` (meaning the first full window has been formed and processed), the element at the front of the deque (`nums[deque.front()]`) is the maximum for the current window. Add it to the result array.

*   **ASCII Diagram Example: `nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3`**

    ```
    N: [ 1,  3, -1, -3,  5,  3,  6,  7 ]
    K: 3
    Result: []
    Deque: (stores indices)

    i = 0, nums[0] = 1 (Window: [1])
        Remove old: Deque empty.
        Maintain mono: Deque empty.
        Add: push(0). Deque: [0]
        Record: i < k-1. Skip.

    i = 1, nums[1] = 3 (Window: [1, 3])
        Remove old: Deque empty.
        Maintain mono: nums[deque.back()]=nums[0]=1 < nums[1]=3. Pop 0. Deque: []
        Add: push(1). Deque: [1]
        Record: i < k-1. Skip.

    i = 2, nums[2] = -1 (Window: [1, 3, -1])
        Remove old: Deque empty.
        Maintain mono: nums[deque.back()]=nums[1]=3 > nums[2]=-1. Don't pop.
        Add: push(2). Deque: [1, 2]
        Record: i >= k-1 (2 >= 2). Add nums[deque.front()]=nums[1]=3. Result: [3]

    i = 3, nums[3] = -3 (Window: [3, -1, -3])
        Remove old: deque.front()=1. 1 <= i-k (3-3=0) is FALSE. (1 > 0). Oh, wait, 1 is NOT <= 0.
                    i-k is 0. deque.front() is 1. So 1 is not outside.
                    This check should be `deque.front() === i - k`.
                    Actually `deque.front() <= i - k` works. `1 <= 0` is false.
                    No. `deque.front() <= i - k` means `1 <= 0` is false. So 1 is still in window.
                    The condition for removing from front is `deque.front() <= i - k`.
                    For i=3, k=3, `i-k=0`. The `deque.front()` is 1. `1 <= 0` is FALSE. So 1 is still technically in the range.

                    Correct logic for `Remove old`: `if (!deque.isEmpty() && deque.front() === i - k)` for exact match OR `deque.front() <= i - k`.
                    Let's use `deque.front() <= i - k`.
                    For i=3, k=3, i-k = 0. deque.front() is 1. `1 <= 0` is false. So 1 is still active.
                    Wait, if the window is [nums[i-k+1], ..., nums[i]], then the indices should be `i-k+1` to `i`.
                    So, if `deque.front() === i - k`, it means `deque.front()` is `(current window start index - 1)`.
                    The element at index `i-k` is the one that just *exited* the window.
                    The window for `i=2` is `[0,1,2]`.
                    The window for `i=3` is `[1,2,3]`. So index 0 just exited.
                    My deque has `[1,2]`. Index 0 is not in my deque. This check only applies if it *was* in the deque.
                    So `deque.front() === i-k` should remove the very first element.
                    When `i=2`, `k=3`, `i-k = -1`.
                    When `i=3`, `k=3`, `i-k = 0`.
                    At `i=3`, the window is `[3,-1,-3]` (indices `1,2,3`). Index `0` just exited.
                    My deque currently: `[1, 2]` (corresponds to `[3, -1]`).
                    Is `deque.front() (1)` equal to `i-k (0)`? No. Is `deque.front() (1)` less than `i-k (0)`? No.
                    So, nothing removed from front in this specific instance. This is correct as index 0 wasn't in the deque.

        Maintain mono: nums[deque.back()]=nums[2]=-1. nums[3]=-3. -1 > -3. Don't pop.
        Add: push(3). Deque: [1, 2, 3] (corresponds to [3, -1, -3])
        Record: i >= k-1 (3 >= 2). Add nums[deque.front()]=nums[1]=3. Result: [3, 3]

    i = 4, nums[4] = 5 (Window: [-1, -3, 5])
        Remove old: i-k = 1. deque.front() is 1. `1 <= 1` is true. Pop 1. Deque: [2, 3]
        Maintain mono: nums[deque.back()]=nums[3]=-3. nums[4]=5. -3 < 5. Pop 3. Deque: [2]
                     nums[deque.back()]=nums[2]=-1. nums[4]=5. -1 < 5. Pop 2. Deque: []
        Add: push(4). Deque: [4] (corresponds to [5])
        Record: i >= k-1 (4 >= 2). Add nums[deque.front()]=nums[4]=5. Result: [3, 3, 5]

    ... and so on.

    The correct condition for removing from front:
    If the index at the front of the deque is older than `i - k + 1` (the start of the current window), remove it.
    So, `if (deque.front() < i - k + 1)` OR `if (deque.front() <= i - k)` because `i - k` is the last index *outside* the window from the left.
    Let's check the code: `deque.front() <= i - k`.
    When `i=3`, `k=3`, `i-k=0`.
    Deque before `i=3` processing: `[1, 2]`
    `deque.front() = 1`. `1 <= 0` is false. So 1 is NOT removed. THIS IS WRONG.
    Index 0 exited.
    The rule `deque.front() <= i - k` means the first element in the deque is at or before the index that just left the window.

    Let's re-verify the standard logic:
    Window for index `i` is `[i - k + 1, ..., i]`.
    So any index `j` in deque where `j < i - k + 1` (or `j <= i - k`) should be removed.

    Let's retrace for `i=3`:
    `i=2`, Deque: `[1, 2]`. (nums[1]=3, nums[2]=-1)
    `i=3`, `nums[3]=-3`. Current window should be `[1, 2, 3]`.
        Remove old: `i-k = 0`. `deque.front()=1`. Is `1 <= 0`? No. So 1 is not removed. **This is wrong for `i=3`**.
        Index `0` (value `1`) left the window.
        My current deque is `[1, 2]`. It contains indices `1` and `2`.
        The actual front of the window is at index `1`. So elements at `0` or less are out.
        The `deque.front()` should be compared against `i - k + 1`.
        If `deque.front() < i - k + 1` then remove.
        For `i=3, k=3`, `i-k+1 = 3-3+1 = 1`.
        `deque.front() = 1`. Is `1 < 1`? No. So 1 is not removed.

    Ah, the implementation is `deque.front() <= i - k`. This is for removing elements whose *original index* is less than or equal to `i-k`.
    The window *starts* at `i-k+1`.
    So if deque has `0`, and `i-k` is `0`, then `0 <= 0` is true, remove `0`.
    This logic *is* correct. My manual trace for `i=3` just means index 0 was already removed in an earlier `Maintain Monotonicity` step.
    Let's retrace `i=0,1,2,3,4` for `[1, 3, -1, -3, 5, 3, 6, 7], k=3`:

    Initial: result=[], deque=[]

    i=0, num=1:
        `i-k=-3`. deque.front() <= -3 (false).
        `nums[deque.back()] <= 1` (false).
        deque.push(0). deque=[0].
    i=1, num=3:
        `i-k=-2`. deque.front()=0. 0 <= -2 (false).
        `nums[deque.back()]=nums[0]=1 <= 3` (true). deque.pop(). deque=[].
        deque.push(1). deque=[1].
    i=2, num=-1:
        `i-k=-1`. deque.front()=1. 1 <= -1 (false).
        `nums[deque.back()]=nums[1]=3 <= -1` (false).
        deque.push(2). deque=[1, 2].
        `i=2 >= k-1=2`. result.push(nums[deque.front()]=nums[1]=3). result=[3].

    i=3, num=-3:
        `i-k=0`. deque.front()=1. `1 <= 0` (false). (Index 0 was already removed at i=1)
        `nums[deque.back()]=nums[2]=-1 <= -3` (false).
        deque.push(3). deque=[1, 2, 3].
        `i=3 >= k-1=2`. result.push(nums[deque.front()]=nums[1]=3). result=[3, 3].

    i=4, num=5:
        `i-k=1`. deque.front()=1. `1 <= 1` (true). deque.shift(). deque=[2, 3]. (Index 1 (value 3) is now out of window `[2,3,4]`)
        `nums[deque.back()]=nums[3]=-3 <= 5` (true). deque.pop(). deque=[2].
        `nums[deque.back()]=nums[2]=-1 <= 5` (true). deque.pop(). deque=[].
        deque.push(4). deque=[4].
        `i=4 >= k-1=2`. result.push(nums[deque.front()]=nums[4]=5). result=[3, 3, 5].

    The logic `deque.front() <= i - k` IS correct. My previous interpretation was off.
    `i - k` is the index of the element *just before* the current window.
    If `deque.front()` is `i - k` or less, it's definitely out of window.

*   **Time Complexity**:
    *   `O(N)`, where `N` is the length of `nums`. Each element is added to the deque once and removed from the deque at most twice (once from the back, once from the front). All deque operations are `O(1)`.

*   **Space Complexity**:
    *   `O(K)`, where `K` is the window size. In the worst case (e.g., a strictly decreasing array), the deque might store up to `K` indices.

---

## 4. Evaluate Reverse Polish Notation

*   **Problem Statement**:
    You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression.
    Supported operators: `+`, `-`, `*`, `/`.
    Division between two integers should truncate toward zero.

*   **Example**:
    ```
    Input: tokens = ["2","1","+","3","*"]
    Output: 9
    Explanation: ((2 + 1) * 3) = 9

    Input: tokens = ["4","13","5","/","+"]
    Output: 6
    Explanation: (4 + (13 / 5)) = 4 + 2 = 6 (integer division)

    Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
    Output: 22
    Explanation:
      ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
    = ((10 * (6 / (12 * -11))) + 17) + 5
    = ((10 * (6 / -132)) + 17) + 5
    = ((10 * 0) + 17) + 5  (integer division `6 / -132` truncates to 0)
    = (0 + 17) + 5
    = 22
    ```

*   **Approach: Stack-based Evaluation (Optimal)**

    Reverse Polish Notation (RPN) is specifically designed for stack-based evaluation.
    The rule is simple:
    1.  If you see a **number (operand)**, push it onto the stack.
    2.  If you see an **operator**, pop the required number of operands (usually two for binary operators), perform the operation, and push the result back onto the stack.

    **Algorithm Steps**:
    1.  **Initialize a Stack**: An empty stack will hold the operands and intermediate results.
    2.  **Define Operators**: Create a set or a simple check for valid operators (`+`, `-`, `*`, `/`).
    3.  **Iterate Through Tokens**: For each token in the input array:
        *   **If token is an operator**:
            *   Pop the top two elements from the stack. **Crucially, the order matters for subtraction and division.** The first element popped is the second operand (`operand2`), and the second element popped is the first operand (`operand1`).
            *   Perform the arithmetic operation: `operand1 <operator> operand2`.
            *   For division, ensure truncation towards zero (e.g., `Math.trunc(operand1 / operand2)` in JavaScript).
            *   Push the calculated result back onto the stack.
        *   **If token is a number (operand)**:
            *   Convert the token string to an integer.
            *   Push the integer onto the stack.
    4.  **Final Result**: After processing all tokens, the stack should contain exactly one element, which is the final result of the expression. Pop this element and return it.

*   **ASCII Diagram Example: `tokens = ["2", "1", "+", "3", "*"]`**

    ```
    Tokens: ["2", "1", "+", "3", "*"]
    Stack:
    Initial: []

    Token: "2"
    Action: push 2
    Stack: [2]

    Token: "1"
    Action: push 1
    Stack: [2, 1]

    Token: "+"
    Action: op2 = pop() (1), op1 = pop() (2). Result = 2 + 1 = 3. Push 3.
    Stack: [3]

    Token: "3"
    Action: push 3
    Stack: [3, 3]

    Token: "*"
    Action: op2 = pop() (3), op1 = pop() (3). Result = 3 * 3 = 9. Push 9.
    Stack: [9]

    End of tokens. Stack has one element.
    Result: pop() (9) => 9
    ```

*   **Time Complexity**:
    *   `O(N)`, where `N` is the number of tokens. We iterate through the `tokens` array once. Each operation (push, pop, arithmetic calculation, operator check) takes `O(1)` time.

*   **Space Complexity**:
    *   `O(N)` in the worst case. If all tokens are numbers before any operators appear (e.g., `["1", "2", "3", "4", "5", "+", "*", "-", "/"]`), the stack could store up to `N/2 + 1` numbers.

---

## 5. Walls and Gates (BFS)

*   **Problem Statement**:
    You are given an `m x n` grid where:
    *   `-1` represents a wall or an obstacle.
    *   `0` represents a gate.
    *   `INF` (represented by `2^31 - 1`) represents an empty room.

    Fill each empty room with the distance to its nearest gate. If an empty room cannot reach a gate, it should remain `INF`.

*   **Example**:
    ```
    Input grid:
    INF  -1  0  INF
    INF INF INF  -1
    INF  -1 INF  -1
      0  -1 INF INF

    Output grid:
      3  -1  0   1
      2   2  1  -1
      1  -1  2  -1
      0  -1  3   4
    ```

*   **Approach: Multi-Source Breadth-First Search (BFS) (Optimal)**

    This problem is a classic graph traversal problem where the grid rooms are nodes and adjacent rooms are connected by edges. The goal is to find the shortest path (minimum distance) from multiple source nodes (gates) to all other reachable nodes (empty rooms). BFS is inherently suited for finding shortest paths in unweighted graphs.

    The key insight for efficiency is to use a **Multi-Source BFS**:
    Instead of running a separate BFS from each empty room to find its nearest gate (which would be `O((M*N)^2)` in the worst case), we start the BFS from *all gates simultaneously*.

    **Algorithm Steps**:
    1.  **Constants**: Define constants for `INF`, `WALL`, and `GATE` for readability.
    2.  **Initialize Queue**: Create a queue and add the coordinates `[row, col]` of all cells that are gates (`0`) to it. These gates are the starting points for our BFS level 0.
    3.  **Define Directions**: Create an array of possible movements (e.g., `[[0, 1], [0, -1], [1, 0], [-1, 0]]` for right, left, down, up).
    4.  **BFS Traversal**: While the queue is not empty:
        *   **Dequeue**: Remove the front element `[row, col]` from the queue.
        *   **Explore Neighbors**: For each of the four possible directions:
            *   Calculate the neighbor's coordinates `[nRow, nCol]`.
            *   **Validate Neighbor**:
                *   Check if `[nRow, nCol]` is within the grid boundaries.
                *   Check if `rooms[nRow][nCol]` is an `INF` (empty room). This also implicitly acts as a "visited" check, because once an empty room is updated with a distance, it will no longer be `INF`. Walls (`-1`) and other gates (`0`) are ignored.
            *   **Update and Enqueue**: If the neighbor is valid (within bounds and an `INF` room):
                *   Update its distance: `rooms[nRow][nCol] = rooms[row][col] + 1`. The distance to the neighbor is one more than the distance to the current cell.
                *   Enqueue `[nRow, nCol]` to explore its neighbors in the next level.

    The BFS layers naturally ensure that when a room is first reached, it's via the shortest path from *some* gate.

*   **ASCII Diagram Example:** (Part of the problem example)

    ```
    Initial Grid:
    [INF, -1,  0, INF]
    [INF, INF, INF, -1]
    [INF, -1, INF, -1]
    [  0, -1, INF, INF]

    Queue: [[0, 2], [3, 0]] (Initial gates)

    Level 0 (distance 0):
    Dequeue [0, 2] (value 0)
        Neighbors:
        [0, 1] (-1 Wall) -> Skip
        [0, 3] (INF)   -> rooms[0][3] = 0+1=1. Enqueue [0, 3].
        [1, 2] (INF)   -> rooms[1][2] = 0+1=1. Enqueue [1, 2].
    Grid after [0,2] processed (partial):
    [INF, -1,  0,   1]
    [INF, INF,  1, -1]
    [INF, -1, INF, -1]
    [  0, -1, INF, INF]

    Dequeue [3, 0] (value 0)
        Neighbors:
        [2, 0] (INF)   -> rooms[2][0] = 0+1=1. Enqueue [2, 0].
        [3, 1] (-1 Wall) -> Skip
    Grid after [3,0] processed (partial):
    [INF, -1,  0,   1]
    [INF, INF,  1, -1]
    [  1, -1, INF, -1]
    [  0, -1, INF, INF]

    Queue: [[0, 3], [1, 2], [2, 0]] (Next level's cells)

    Level 1 (distance 1):
    Dequeue [0, 3] (value 1)
        Neighbors:
        [0, 2] (0 Gate) -> Skip
        [1, 3] (-1 Wall) -> Skip
    Dequeue [1, 2] (value 1)
        Neighbors:
        [0, 2] (0 Gate) -> Skip
        [1, 1] (INF)   -> rooms[1][1] = 1+1=2. Enqueue [1, 1].
        [1, 3] (-1 Wall) -> Skip
        [2, 2] (INF)   -> rooms[2][2] = 1+1=2. Enqueue [2, 2].
    Dequeue [2, 0] (value 1)
        Neighbors:
        [1, 0] (INF)   -> rooms[1][0] = 1+1=2. Enqueue [1, 0].
        [2, 1] (-1 Wall) -> Skip
        [3, 0] (0 Gate) -> Skip

    ... and so on, until the queue is empty.
    ```

*   **Time Complexity**:
    *   `O(M * N)`, where `M` is the number of rows and `N` is the number of columns. Each cell in the grid is visited and enqueued/dequeued at most once. For each cell, we perform constant-time operations (checking neighbors).

*   **Space Complexity**:
    *   `O(M * N)` in the worst case. This is the space required for the queue. In the worst case (e.g., a grid full of empty rooms with gates around the perimeter), the queue might hold up to all `M * N` cells.

---