```markdown
# Algorithm Explanations

This document provides detailed explanations, step-by-step logic, and ASCII diagrams for the algorithms implemented in `src/stack_queue_problems.py`.

---

## 1. Valid Parentheses (LeetCode 20)

**Problem Description**: Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order. 3. Every close bracket has a corresponding open bracket of the same type.

**High-Level Approach**:
We can use a stack to keep track of the opening brackets encountered. When a closing bracket appears, we check if it matches the most recently opened (and still unmatched) bracket at the top of the stack.

**Step-by-Step Logic**:
1.  Initialize an empty stack.
2.  Create a mapping of closing brackets to their corresponding opening brackets (e.g., `')': '('`).
3.  Iterate through each character in the input string:
    *   If the character is a closing bracket (i.e., it's a key in our mapping):
        *   Pop the top element from the stack. If the stack is empty, assign a dummy value (e.g., `'#'`) to `top_element` to avoid errors.
        *   Compare `top_element` with the expected opening bracket for the current closing bracket (from our mapping).
        *   If they don't match, or if the stack was empty (meaning a closing bracket appeared without a corresponding open one), the string is invalid. Return `False`.
    *   If the character is an opening bracket:
        *   Push it onto the stack.
4.  After iterating through the entire string, if the stack is empty, it means all opening brackets were correctly closed. The string is valid. Return `True`. Otherwise, there are unclosed opening brackets, so return `False`.

**ASCII Diagram (Example: "([{}])")**:

```
String: " ( [ { } ] ) "
Stack:  []

1. Char: '('
   Push '(':
   Stack: ['(']

2. Char: '['
   Push '[':
   Stack: ['(', '[']

3. Char: '{'
   Push '{':
   Stack: ['(', '[', '{']

4. Char: '}'
   Is closing. Mapped to '{'.
   Pop from stack: '{'
   Match! Stack: ['(', '[']

5. Char: ']'
   Is closing. Mapped to '['.
   Pop from stack: '['
   Match! Stack: ['(']

6. Char: ')'
   Is closing. Mapped to '('.
   Pop from stack: '('
   Match! Stack: []

End of string. Stack is empty. -> Valid.
```

**Complexity Analysis**:
*   **Time Complexity**: O(N), where N is the length of the input string `s`. Each character is processed once. Pushing and popping from a Python list (used as a stack) are amortized O(1) operations.
*   **Space Complexity**: O(N), in the worst case (e.g., `((((((...))))))`), the stack might hold all opening brackets before any closing brackets appear.

---

## 2. Min Stack (LeetCode 155)

**Problem Description**: Design a stack that supports `push`, `pop`, `top`, and `getMin` operations, all in O(1) time.

**High-Level Approach**:
To achieve O(1) `getMin`, we need to store the minimum value encountered *up to that point* for each element in the stack. A common way is to use an auxiliary stack to keep track of minimums.

**Step-by-Step Logic**:
1.  Initialize two lists (acting as stacks): `self.stack` for the main elements and `self.min_stack` for tracking minimums.
2.  **`push(val)`**:
    *   Append `val` to `self.stack`.
    *   For `self.min_stack`, append the *minimum* of `val` and the current minimum element (which is `self.min_stack[-1]` if `self.min_stack` is not empty, otherwise `val` itself or `infinity` for comparison). This ensures `self.min_stack[-1]` always holds the minimum value among elements currently in `self.stack`.
3.  **`pop()`**:
    *   Remove the top element from both `self.stack` and `self.min_stack`. This keeps them synchronized.
4.  **`top()`**:
    *   Return the top element of `self.stack`.
5.  **`getMin()`**:
    *   Return the top element of `self.min_stack`.

**ASCII Diagram (Example: push(-2), push(0), push(-3), getMin, pop, top, getMin)**:

```
Initial:
self.stack:    []
self.min_stack:[]

1. push(-2):
   self.stack:    [-2]
   self.min_stack:[-2] (min(-2, inf) = -2)

2. push(0):
   self.stack:    [-2, 0]
   self.min_stack:[-2, -2] (min(0, -2) = -2)

3. push(-3):
   self.stack:    [-2, 0, -3]
   self.min_stack:[-2, -2, -3] (min(-3, -2) = -3)

4. getMin():
   Returns self.min_stack[-1] -> -3

5. pop():
   self.stack:    [-2, 0]
   self.min_stack:[-2, -2]

6. top():
   Returns self.stack[-1] -> 0

7. getMin():
   Returns self.min_stack[-1] -> -2
```

**Complexity Analysis**:
*   **Time Complexity**: O(1) for all `push`, `pop`, `top`, and `getMin` operations. Each operation involves a constant number of list appends or pops.
*   **Space Complexity**: O(N), where N is the number of elements in the stack. In the worst case (e.g., elements pushed in strictly decreasing order), `self.min_stack` will also grow to size N.

---

## 3. Implement Queue using Stacks (LeetCode 232)

**Problem Description**: Implement a FIFO queue using only two stacks. The queue should support `push`, `pop`, `peek`, and `empty` operations.

**High-Level Approach**:
We can simulate a queue's FIFO behavior using two stacks: an "in-stack" for pushing new elements and an "out-stack" for popping/peeking elements. When `out_stack` is empty and a `pop` or `peek` operation is requested, we transfer all elements from `in_stack` to `out_stack`, effectively reversing their order. This allows `out_stack` to serve elements in FIFO order.

**Step-by-Step Logic**:
1.  Initialize two empty lists (stacks): `self.in_stack` and `self.out_stack`.
2.  **`push(x)`**:
    *   Simply append `x` to `self.in_stack`. This is an O(1) operation.
3.  **`_transfer_if_needed()` (Helper)**:
    *   This private method is called before `pop` or `peek`.
    *   If `self.out_stack` is empty:
        *   While `self.in_stack` is not empty, pop elements from `self.in_stack` and push them onto `self.out_stack`. This reverses the order, so the oldest elements are now at the top of `self.out_stack`.
4.  **`pop()`**:
    *   Call `self._transfer_if_needed()`.
    *   Pop and return the top element from `self.out_stack`. This is an O(1) operation after potential transfer.
5.  **`peek()`**:
    *   Call `self._transfer_if_needed()`.
    *   Return the top element of `self.out_stack` (without popping). This is an O(1) operation after potential transfer.
6.  **`empty()`**:
    *   Return `True` if both `self.in_stack` and `self.out_stack` are empty, `False` otherwise. This is an O(1) operation.

**ASCII Diagram (Example: push(1), push(2), peek, pop, push(3), peek, pop, pop)**:

```
Initial:
in_stack:  []
out_stack: []

1. push(1):
   in_stack:  [1]
   out_stack: []

2. push(2):
   in_stack:  [1, 2]
   out_stack: []

3. peek():
   out_stack is empty. Transfer from in_stack:
     Pop 2 from in_stack, push to out_stack: in_stack:[1], out_stack:[2]
     Pop 1 from in_stack, push to out_stack: in_stack:[], out_stack:[2, 1]
   Peek out_stack top: 1.
   Result: 1.
   in_stack:  []
   out_stack: [2, 1] (top is 1)

4. pop():
   out_stack is NOT empty. Pop from out_stack: 1.
   Result: 1.
   in_stack:  []
   out_stack: [2] (top is 2)

5. push(3):
   in_stack:  [3]
   out_stack: [2]

6. peek():
   out_stack is NOT empty. Peek out_stack top: 2.
   Result: 2.
   in_stack:  [3]
   out_stack: [2]

7. pop():
   out_stack is NOT empty. Pop from out_stack: 2.
   Result: 2.
   in_stack:  [3]
   out_stack: []

8. pop():
   out_stack is empty. Transfer from in_stack:
     Pop 3 from in_stack, push to out_stack: in_stack:[], out_stack:[3]
   Pop out_stack top: 3.
   Result: 3.
   in_stack:  []
   out_stack: []

End State: Queue is empty.
```

**Complexity Analysis**:
*   **Time Complexity**:
    *   `push`: O(1).
    *   `pop`, `peek`: Amortized O(1). While a single `pop` or `peek` might take O(N) if a transfer is needed (where N is the number of elements in `in_stack`), this cost is amortized over N `push` operations. Each element is pushed onto `in_stack` once and moved to `out_stack` once.
    *   `empty`: O(1).
*   **Space Complexity**: O(N), where N is the total number of elements currently in the queue. Both stacks together store all N elements.

---

## 4. Sliding Window Maximum (LeetCode 239)

**Problem Description**: Given an array `nums` and a sliding window of size `k`, return the maximum value in each window as it slides.

**High-Level Approach**:
A brute-force approach would be O(N\*K) by iterating each window and finding the max. To achieve O(N), we use a `deque` (double-ended queue) to maintain a "monotonic decreasing" sequence of *indices* within the current window. The front of the deque will always store the index of the maximum element.

**Step-by-Step Logic**:
1.  Initialize an empty `collections.deque` (Python's efficient double-ended queue) to store indices and an empty list `result` to store the window maximums.
2.  Iterate through the `nums` array with index `i` from `0` to `N-1`.
3.  **Window Maintenance (Deque Front)**:
    *   If the deque is not empty AND the index at the front of the deque (`dq[0]`) is outside the current window (i.e., `dq[0] == i - k`), remove it from the front (`dq.popleft()`).
4.  **Monotonic Property Maintenance (Deque Rear)**:
    *   While the deque is not empty AND the value at the index at the back of the deque (`nums[dq[-1]]`) is less than or equal to the current number `nums[i]`:
        *   Remove elements from the back (`dq.pop()`). This ensures the deque maintains indices of elements in *decreasing* order of their values. If `nums[i]` is greater, previous smaller elements cannot be the maximum for any future window that includes `nums[i]`.
5.  **Add Current Element**:
    *   Append the current index `i` to the back of the deque (`dq.append(i)`).
6.  **Record Maximum**:
    *   If `i` is greater than or equal to `k - 1` (meaning the window has fully formed):
        *   The maximum element for the current window is `nums[dq[0]]` (the element at the index at the front of the deque).
        *   Append this maximum to the `result` list.

**ASCII Diagram (Example: nums = [1,3,-1,-3,5,3,6,7], k = 3)**:

```
nums: [1, 3, -1, -3, 5, 3, 6, 7]
k: 3
result: []
dq: [] (stores indices)

i = 0, nums[0] = 1. Window: [1]
  - dq empty.
  - dq empty.
  - Push 0. dq: [0]
  - i < k-1. No result yet.

i = 1, nums[1] = 3. Window: [1,3]
  - dq[0] (0) is not == 1-3 = -2.
  - nums[dq[-1]] (nums[0]=1) <= nums[1] (3). Pop 0. dq: []
  - Push 1. dq: [1]
  - i < k-1. No result yet.

i = 2, nums[2] = -1. Window: [1,3,-1]
  - dq[0] (1) is not == 2-3 = -1.
  - nums[dq[-1]] (nums[1]=3) > nums[2] (-1). Don't pop.
  - Push 2. dq: [1, 2]
  - i == k-1. Window formed. Add nums[dq[0]] (nums[1]=3) to result.
  - result: [3]

i = 3, nums[3] = -3. Window: [3,-1,-3]
  - dq[0] (1) is not == 3-3 = 0.
  - nums[dq[-1]] (nums[2]=-1) > nums[3] (-3). Don't pop.
  - Push 3. dq: [1, 2, 3]
  - i >= k-1. Add nums[dq[0]] (nums[1]=3) to result.
  - result: [3, 3]

i = 4, nums[4] = 5. Window: [-1,-3,5]
  - dq[0] (1) == 4-3 = 1. Pop 1. dq: [2, 3]
  - nums[dq[-1]] (nums[3]=-3) <= nums[4] (5). Pop 3. dq: [2]
  - nums[dq[-1]] (nums[2]=-1) <= nums[4] (5). Pop 2. dq: []
  - Push 4. dq: [4]
  - i >= k-1. Add nums[dq[0]] (nums[4]=5) to result.
  - result: [3, 3, 5]

i = 5, nums[5] = 3. Window: [-3,5,3]
  - dq[0] (4) is not == 5-3 = 2.
  - nums[dq[-1]] (nums[4]=5) > nums[5] (3). Don't pop.
  - Push 5. dq: [4, 5]
  - i >= k-1. Add nums[dq[0]] (nums[4]=5) to result.
  - result: [3, 3, 5, 5]

i = 6, nums[6] = 6. Window: [5,3,6]
  - dq[0] (4) is not == 6-3 = 3.
  - nums[dq[-1]] (nums[5]=3) <= nums[6] (6). Pop 5. dq: [4]
  - nums[dq[-1]] (nums[4]=5) <= nums[6] (6). Pop 4. dq: []
  - Push 6. dq: [6]
  - i >= k-1. Add nums[dq[0]] (nums[6]=6) to result.
  - result: [3, 3, 5, 5, 6]

i = 7, nums[7] = 7. Window: [3,6,7]
  - dq[0] (6) is not == 7-3 = 4.
  - nums[dq[-1]] (nums[6]=6) <= nums[7] (7). Pop 6. dq: []
  - Push 7. dq: [7]
  - i >= k-1. Add nums[dq[0]] (nums[7]=7) to result.
  - result: [3, 3, 5, 5, 6, 7]

Final result: [3, 3, 5, 5, 6, 7]
```

**Complexity Analysis**:
*   **Time Complexity**: O(N), where N is the length of `nums`. Each element is pushed onto the deque once and potentially popped once.
*   **Space Complexity**: O(K), as the deque stores at most `k` elements (indices) at any given time, representing the current window.

---

## 5. Daily Temperatures (LeetCode 739)

**Problem Description**: Given an array of daily temperatures, return an array `answer` where `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If no such day exists, `answer[i]` is `0`.

**High-Level Approach**:
This is a classic "next greater element" problem. We can solve it efficiently using a monotonic stack. Specifically, we'll use a "decreasing monotonic stack" to store indices of temperatures for which we haven't found a warmer day yet.

**Step-by-Step Logic**:
1.  Initialize `n` as the length of `temperatures`.
2.  Create an `answer` list of size `n`, initialized with zeros. These zeros will be the default for days that never find a warmer temperature.
3.  Initialize an empty `stack`. This stack will store *indices* of temperatures in decreasing order of temperature values.
4.  Iterate through `temperatures` using index `i` from `0` to `n-1`.
5.  **Process Stack**:
    *   While the `stack` is not empty AND the current temperature `temperatures[i]` is greater than the temperature at the index at the top of the stack (`temperatures[stack[-1]]`):
        *   Pop the `prev_index` from the stack.
        *   Calculate the waiting days: `i - prev_index`.
        *   Store this difference in `answer[prev_index]`. This `prev_index` has now found its warmer day.
6.  **Push Current Index**:
    *   Push the current index `i` onto the stack (`stack.append(i)`). This maintains the decreasing monotonic property. If `temperatures[i]` is not greater than `temperatures[stack[-1]]`, then `temperatures[i]` is either less than or equal to `temperatures[stack[-1]]`, so pushing `i` maintains the relative decreasing order or allows for future greater elements to pop `i`.

**ASCII Diagram (Example: temperatures = [73,74,75,71,69,72,76,73])**:

```
temperatures: [73, 74, 75, 71, 69, 72, 76, 73]
n: 8
answer:       [0,  0,  0,  0,  0,  0,  0,  0]
stack:        [] (stores indices)

i = 0, temp = 73
  - stack empty.
  - Push 0. stack: [0]

i = 1, temp = 74
  - stack not empty, temps[stack[-1]] (temps[0]=73) < temps[1] (74).
  - Pop 0. prev_index = 0.
  - answer[0] = 1 - 0 = 1. answer: [1,0,0,0,0,0,0,0]
  - Push 1. stack: [1]

i = 2, temp = 75
  - stack not empty, temps[stack[-1]] (temps[1]=74) < temps[2] (75).
  - Pop 1. prev_index = 1.
  - answer[1] = 2 - 1 = 1. answer: [1,1,0,0,0,0,0,0]
  - Push 2. stack: [2]

i = 3, temp = 71
  - stack not empty, temps[stack[-1]] (temps[2]=75) > temps[3] (71).
  - Don't pop.
  - Push 3. stack: [2, 3]

i = 4, temp = 69
  - stack not empty, temps[stack[-1]] (temps[3]=71) > temps[4] (69).
  - Don't pop.
  - Push 4. stack: [2, 3, 4]

i = 5, temp = 72
  - stack not empty, temps[stack[-1]] (temps[4]=69) < temps[5] (72).
  - Pop 4. prev_index = 4.
  - answer[4] = 5 - 4 = 1. answer: [1,1,0,0,1,0,0,0]
  - stack not empty, temps[stack[-1]] (temps[3]=71) < temps[5] (72).
  - Pop 3. prev_index = 3.
  - answer[3] = 5 - 3 = 2. answer: [1,1,0,2,1,0,0,0]
  - stack not empty, temps[stack[-1]] (temps[2]=75) > temps[5] (72).
  - Don't pop.
  - Push 5. stack: [2, 5]

i = 6, temp = 76
  - stack not empty, temps[stack[-1]] (temps[5]=72) < temps[6] (76).
  - Pop 5. prev_index = 5.
  - answer[5] = 6 - 5 = 1. answer: [1,1,0,2,1,1,0,0]
  - stack not empty, temps[stack[-1]] (temps[2]=75) < temps[6] (76).
  - Pop 2. prev_index = 2.
  - answer[2] = 6 - 2 = 4. answer: [1,1,4,2,1,1,0,0]
  - stack empty.
  - Push 6. stack: [6]

i = 7, temp = 73
  - stack not empty, temps[stack[-1]] (temps[6]=76) > temps[7] (73).
  - Don't pop.
  - Push 7. stack: [6, 7]

End of array. Stack: [6, 7].
These indices (6 and 7) did not find a warmer day to their right,
so their values in `answer` remain 0, as initialized.

Final answer: [1, 1, 4, 2, 1, 1, 0, 0]
```

**Complexity Analysis**:
*   **Time Complexity**: O(N), where N is the number of temperatures. Each temperature's index is pushed onto the stack and popped from it at most once.
*   **Space Complexity**: O(N), in the worst case (e.g., temperatures are in strictly decreasing order), the stack will hold all indices.
```