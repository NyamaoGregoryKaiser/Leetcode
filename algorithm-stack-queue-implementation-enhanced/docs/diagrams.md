# Visual Diagrams (ASCII Art) for Stack & Queue Problems

This document provides ASCII art diagrams to help visualize the operations and state changes for some of the more complex Stack and Queue algorithms.

---

## Problem 2: Min Stack - Tuple Storage

This diagram illustrates the state of the `MinStack` (using tuple storage `(value, current_min)`) as elements are pushed and popped.

```
Initial Stack: []

1. push(-2)
   Stack is empty. new_min = -2.
   Stack: [ (-2, -2) ]

2. push(0)
   Current top: (-2, -2). Prev_min = -2.
   min(0, -2) = -2.
   Stack: [ (-2, -2), (0, -2) ]

3. push(-3)
   Current top: (0, -2). Prev_min = -2.
   min(-3, -2) = -3.
   Stack: [ (-2, -2), (0, -2), (-3, -3) ]
   getMin() -> -3 (from top of stack)
   top()    -> -3 (value part from top of stack)

4. pop()
   Removes (-3, -3)
   Stack: [ (-2, -2), (0, -2) ]
   top()    -> 0 (value part from new top)
   getMin() -> -2 (min part from new top)

5. push(-4)
   Current top: (0, -2). Prev_min = -2.
   min(-4, -2) = -4.
   Stack: [ (-2, -2), (0, -2), (-4, -4) ]
   getMin() -> -4

6. pop()
   Removes (-4, -4)
   Stack: [ (-2, -2), (0, -2) ]
   getMin() -> -2
```

---

## Problem 3: Implement Queue using Stacks

This diagram visualizes the two-stack approach for implementing a queue.

```
Initial state:
Input Stack:  []
Output Stack: []

1. push(1)
   Input Stack:  [1]
   Output Stack: []

2. push(2)
   Input Stack:  [1, 2]
   Output Stack: []

3. peek()
   Output Stack is empty. Transfer elements from Input Stack.
   - Pop 2 from Input, Push 2 to Output. Input: [1], Output: [2]
   - Pop 1 from Input, Push 1 to Output. Input: [], Output: [2, 1] (Bottom is 2, Top is 1)
   Output Stack is now [2, 1]. Peek at top (1).
   Return 1.
   Input Stack:  []
   Output Stack: [2, 1]

4. push(3)
   Input Stack:  [3]
   Output Stack: [2, 1]

5. pop()
   Output Stack is NOT empty. Pop from Output Stack.
   Pop 1 from Output. Return 1.
   Input Stack:  [3]
   Output Stack: [2]

6. pop()
   Output Stack is NOT empty. Pop from Output Stack.
   Pop 2 from Output. Return 2.
   Input Stack:  [3]
   Output Stack: []

7. pop()
   Output Stack is empty. Transfer elements from Input Stack.
   - Pop 3 from Input, Push 3 to Output. Input: [], Output: [3]
   Output Stack is now [3]. Pop from Output Stack.
   Pop 3 from Output. Return 3.
   Input Stack:  []
   Output Stack: []
```

---

## Problem 4: Sliding Window Maximum - Monotonic Deque

This diagram illustrates the state of the deque and result for `nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3`.
The deque stores indices of elements in *decreasing order of their values*.

```
nums = [1,  3, -1, -3,  5,  3,  6,  7]
index= [0,  1,  2,  3,  4,  5,  6,  7]
k = 3

Initial: result = [], dq = deque()

i = 0, num = 1:
    - dq: []
    - Append 0.
    dq: [0] (nums[0]=1)
    result: []

i = 1, num = 3:
    - dq: [0]. nums[0]=1 < nums[1]=3. Pop 0. dq: []
    - Append 1.
    dq: [1] (nums[1]=3)
    result: []

i = 2, num = -1:
    - dq: [1]. nums[1]=3 !< nums[2]=-1.
    - Append 2.
    dq: [1, 2] (nums[1]=3, nums[2]=-1)
    - Window formed (i=2 >= k-1=2). max = nums[dq[0]] = nums[1]=3.
    result: [3]

i = 3, num = -3:
    - dq: [1, 2]. dq[0]=1 == i-k (3-3=0). NO, dq[0] = 1, i-k = 0.
      Oh wait, `i-k` is `0`, `dq[0]` is `1`. This element is `nums[1]` (value `3`).
      It's still in the window. `i-k` (start index) must be `< dq[0]`.
      The condition is `if dq and dq[0] == i - k: dq.popleft()`
      For i=3, i-k=0. dq[0]=1. So 1 is NOT 0. It is not out of window.
      (My manual trace was incorrect here, actual code for `dq[0] == i - k` would not pop.)
      Let's re-trace based on correct condition:
      `if dq and dq[0] == i - k:`
      For `i=3`, `i-k=0`. `dq[0]=1`. `1 != 0`. Don't popleft.
    - dq: [1, 2]. nums[2]=-1 !< nums[3]=-3.
    - Append 3.
    dq: [1, 2, 3] (nums[1]=3, nums[2]=-1, nums[3]=-3)
    - Window formed. max = nums[dq[0]] = nums[1]=3.
    result: [3, 3]

i = 4, num = 5:
    - dq: [1, 2, 3]. dq[0]=1 == i-k (4-3=1). Pop 1. dq: [2, 3]
    - dq: [2, 3]. nums[3]=-3 < nums[4]=5. Pop 3. dq: [2]
    - dq: [2]. nums[2]=-1 < nums[4]=5. Pop 2. dq: []
    - Append 4.
    dq: [4] (nums[4]=5)
    - Window formed. max = nums[dq[0]] = nums[4]=5.
    result: [3, 3, 5]

i = 5, num = 3:
    - dq: [4]. dq[0]=4 != i-k (5-3=2). Don't popleft.
    - dq: [4]. nums[4]=5 !< nums[5]=3.
    - Append 5.
    dq: [4, 5] (nums[4]=5, nums[5]=3)
    - Window formed. max = nums[dq[0]] = nums[4]=5.
    result: [3, 3, 5, 5]

i = 6, num = 6:
    - dq: [4, 5]. dq[0]=4 != i-k (6-3=3). Don't popleft.
    - dq: [4, 5]. nums[5]=3 < nums[6]=6. Pop 5. dq: [4]
    - dq: [4]. nums[4]=5 < nums[6]=6. Pop 4. dq: []
    - Append 6.
    dq: [6] (nums[6]=6)
    - Window formed. max = nums[dq[0]] = nums[6]=6.
    result: [3, 3, 5, 5, 6]

i = 7, num = 7:
    - dq: [6]. dq[0]=6 != i-k (7-3=4). Don't popleft.
    - dq: [6]. nums[6]=6 < nums[7]=7. Pop 6. dq: []
    - Append 7.
    dq: [7] (nums[7]=7)
    - Window formed. max = nums[dq[0]] = nums[7]=7.
    result: [3, 3, 5, 5, 6, 7]

Final result: [3, 3, 5, 5, 6, 7]
```

---

## Problem 5: Next Greater Element - Monotonic Stack (Circular)

This diagram visualizes the monotonic stack approach for `nums = [13, 7, 6, 12]`

```
nums = [13, 7, 6, 12]
n = 4
result = [-1, -1, -1, -1]
stack = [] (stores indices)

Loop for i from 0 to 2*n-1 (0 to 7)

i=0 (idx=0, num=13):
    stack empty.
    i < n (0 < 4). Push 0.
    stack: [0] (val: 13)
    result: [-1, -1, -1, -1]

i=1 (idx=1, num=7):
    stack: [0]. nums[0]=13 !< 7.
    i < n (1 < 4). Push 1.
    stack: [0, 1] (vals: 13, 7)
    result: [-1, -1, -1, -1]

i=2 (idx=2, num=6):
    stack: [0, 1]. nums[1]=7 !< 6.
    i < n (2 < 4). Push 2.
    stack: [0, 1, 2] (vals: 13, 7, 6)
    result: [-1, -1, -1, -1]

i=3 (idx=3, num=12):
    stack: [0, 1, 2].
    - nums[2]=6 < 12. Pop 2. result[2]=12. stack: [0, 1]
    - nums[1]=7 < 12. Pop 1. result[1]=12. stack: [0]
    - nums[0]=13 !< 12.
    i < n (3 < 4). Push 3.
    stack: [0, 3] (vals: 13, 12)
    result: [-1, 12, 12, -1]

--- Second pass (for circularity) ---

i=4 (idx=0, num=13):
    stack: [0, 3].
    - nums[3]=12 < 13. Pop 3. result[3]=13. stack: [0]
    - nums[0]=13 !< 13.
    i >= n (4 >= 4). Do not push index to stack again.
    stack: [0] (val: 13)
    result: [-1, 12, 12, 13]

i=5 (idx=1, num=7):
    stack: [0]. nums[0]=13 !< 7.
    i >= n. Do not push.
    stack: [0] (val: 13)
    result: [-1, 12, 12, 13]

i=6 (idx=2, num=6):
    stack: [0]. nums[0]=13 !< 6.
    i >= n. Do not push.
    stack: [0] (val: 13)
    result: [-1, 12, 12, 13]

i=7 (idx=3, num=12):
    stack: [0]. nums[0]=13 !< 12.
    i >= n. Do not push.
    stack: [0] (val: 13)
    result: [-1, 12, 12, 13]

End of loop.
Final result: [-1, 12, 12, 13]
```
---