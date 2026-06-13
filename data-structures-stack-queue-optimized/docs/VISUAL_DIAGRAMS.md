```markdown
# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the state changes and key operations of the algorithms.

---

## 1. Valid Parentheses

Let's trace `s = "([{}])"`

```
String: ( [ { } ] )

Char: '('
Stack:  [ ( ]
        ---

Char: '['
Stack:  [ [ ]
        [ ( ]
        ---

Char: '{'
Stack:  [ { ]
        [ [ ]
        [ ( ]
        ---

Char: '}'
Top of Stack: '{' -> Match! Pop.
Stack:  [ [ ]
        [ ( ]
        ---

Char: ']'
Top of Stack: '[' -> Match! Pop.
Stack:  [ ( ]
        ---

Char: ')'
Top of Stack: '(' -> Match! Pop.
Stack:  [ ]
        ---

End of string. Stack is empty. Result: VALID.
```

Let's trace `s = "([)]"` (Invalid)

```
String: ( [ ) ]

Char: '('
Stack:  [ ( ]
        ---

Char: '['
Stack:  [ [ ]
        [ ( ]
        ---

Char: ')'
Top of Stack: '[' -> MISMATCH! Expected '(', got '['. Result: INVALID.
```

---

## 2. Min Stack

Trace operations on `MinStack`

```
Initial State:
data_stack: [ ]
min_stack:  [ ]

Operation: push(-2)
data_stack: [ -2 ]
min_stack:  [ -2 ] (since min_stack was empty or -2 <= current min)

Operation: push(0)
data_stack: [  0 ]
            [ -2 ]
min_stack:  [ -2 ] (since 0 > -2, -2 remains the overall min)

Operation: push(-3)
data_stack: [ -3 ]
            [  0 ]
            [ -2 ]
min_stack:  [ -3 ] (since -3 <= -2, push -3)
            [ -2 ]

Operation: getMin()
Returns: -3 (from min_stack.top())

Operation: top()
Returns: -3 (from data_stack.top())

Operation: pop()
data_stack.top() (-3) == min_stack.top() (-3). So pop both.
data_stack: [  0 ]
            [ -2 ]
min_stack:  [ -2 ]

Operation: top()
Returns: 0

Operation: getMin()
Returns: -2

Operation: push(-5)
data_stack: [ -5 ]
            [  0 ]
            [ -2 ]
min_stack:  [ -5 ] (since -5 <= -2, push -5)
            [ -2 ]

Operation: getMin()
Returns: -5
```

---

## 3. Implement Queue using Stacks

Trace operations on `MyQueue`

```
Initial State:
in_stack:  [ ]
out_stack: [ ]

Operation: push(1)
in_stack:  [ 1 ]
out_stack: [ ]

Operation: push(2)
in_stack:  [ 2 ]
            [ 1 ]
out_stack: [ ]

Operation: peek()
out_stack is empty. Transfer elements from in_stack to out_stack:
  Pop 2 from in_stack, push to out_stack.
  Pop 1 from in_stack, push to out_stack.
in_stack:  [ ]
out_stack: [ 1 ] (top)
            [ 2 ]
Peek returns out_stack.top() which is 1.

Operation: push(3)
in_stack:  [ 3 ]
out_stack: [ 1 ]
            [ 2 ]

Operation: pop()
out_stack is not empty. Pop from out_stack.
in_stack:  [ 3 ]
out_stack: [ 2 ]
Pop returns 1.

Operation: peek()
out_stack is not empty. Peek from out_stack.
in_stack:  [ 3 ]
out_stack: [ 2 ]
Peek returns 2.

Operation: pop()
out_stack is not empty. Pop from out_stack.
in_stack:  [ 3 ]
out_stack: [ ]
Pop returns 2.

Operation: pop()
out_stack is empty. Transfer elements from in_stack to out_stack:
  Pop 3 from in_stack, push to out_stack.
in_stack:  [ ]
out_stack: [ 3 ]
Pop returns out_stack.top() which is 3.

Current state:
in_stack:  [ ]
out_stack: [ ]
Queue is empty.
```

---

## 4. Sliding Window Maximum

Trace `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`

`dq` stores indices, `result` stores maxes.

```
i=0, nums[0]=1. Window: [1]
  dq is empty. Push 0.
  dq: [0]
  i < k-1 (0 < 2). No max yet.

i=1, nums[1]=3. Window: [1,3]
  dq.front() (0) is not i-k (1-3=-2).
  nums[dq.back()] (nums[0]=1) <= nums[1]=3. Pop 0.
  dq: []
  Push 1.
  dq: [1]
  i < k-1 (1 < 2). No max yet.

i=2, nums[2]=-1. Window: [1,3,-1]
  dq.front() (1) is not i-k (2-3=-1).
  nums[dq.back()] (nums[1]=3) !<= nums[2]=-1. Don't pop.
  Push 2.
  dq: [1,2]  (values: [3,-1])
  i >= k-1 (2 >= 2). Window formed.
  result.push_back(nums[dq.front()] = nums[1]=3).
  result: [3]

i=3, nums[3]=-3. Window: [3,-1,-3]
  dq.front() (1) is i-k (3-3=0). Pop 1.
  dq: [2]
  nums[dq.back()] (nums[2]=-1) !<= nums[3]=-3. Don't pop.
  Push 3.
  dq: [2,3] (values: [-1,-3])
  i >= k-1 (3 >= 2).
  result.push_back(nums[dq.front()] = nums[2]=-1). Wait, error in trace, must be max.
  dq front is 2, so max is nums[2] = -1. This is not correct for `[3,-1,-3]` max=3.
  Ah, the dq needs to have max for the current window.
  Corrected logic: dq.front() should be the max.
  
  Let's re-trace i=3 with the correct logic:
  Window `[3, -1, -3]`, current `i=3`, `nums[i]=-3`. `k=3`.
  Current deque: `[1,2]` (values `3,-1`). `nums[dq.front()]=nums[1]=3`.
  
  i=3, nums[3]=-3.
    1. `dq.front()` is `1`. `1 == i-k` (`3-3=0`)? No.  `1 != 0`. Ah, `i-k` condition for `dq.front() == i-k` should check if `dq.front()` is still *in* window. Window `[i-k+1, i]`. So `dq.front() < i-k+1` is removal condition. `dq.front() <= i-k`
       `dq.front()` is `1`. `i-k = 0`. So `1 > 0`. `nums[1]` is in window `[1,3]`.
       It should be `dq.front() == i-k` which is `dq.front() == (current_index - window_size)`.
       When `i=3`, `i-k = 0`. `dq.front()` is `1`. `1 != 0`. So `dq.front()` (index 1) is still valid in current window `[1,3]`. No. Current window is `[1,3]`, indices `[1,2,3]`.
       Okay, `dq.front() == i-k`. When `i=3`, `k=3`, `i-k = 0`. `dq.front()` is `1`. `1 != 0`. So `1` (which is nums[1]=3) is STILL IN window.
       
       Let's check the implementation logic:
       `if (!dq.empty() && dq.front() == i - k)`  This means if `dq.front()` is `i-k`, it's now out of bounds.
       When `i=2`, `k=3`, `dq.front()=1`. `i-k = -1`. `1 != -1`.
       When `i=3`, `k=3`, `dq.front()=1`. `i-k = 0`. `1 != 0`.
       When `i=4`, `k=3`, `dq.front()=1`. `i-k = 1`. `1 == 1`. Pop 1.
       
       So the trace should be:
       
       `nums = [1,3,-1,-3,5,3,6,7]`, `k = 3`
       `dq` stores indices, `result` stores maxes.
       
       ```
       i=0, nums[0]=1. Current Window: [1]
         dq: [] -> [0]
         result: []
       
       i=1, nums[1]=3. Current Window: [1,3]
         dq: [0] -> `nums[0]=1 <= nums[1]=3`, pop 0. -> []
         dq: [] -> [1]
         result: []
       
       i=2, nums[2]=-1. Current Window: [1,3,-1]
         dq: [1] -> `nums[1]=3 !<= nums[2]=-1`. Don't pop.
         dq: [1] -> [1,2] (values: `3, -1`)
         i >= k-1 (2 >= 2) is true.
         result.push_back(nums[dq.front()] = nums[1]=3).
         result: [3]
       
       i=3, nums[3]=-3. Current Window: [3,-1,-3]
         dq.front() (1). `1 == i-k` (3-3=0)? No, `1 != 0`. `1` is still valid index for window starting `i-k+1 = 1`.
         dq: [1,2] -> `nums[2]=-1 !<= nums[3]=-3`. Don't pop.
         dq: [1,2] -> [1,2,3] (values: `3, -1, -3`)
         i >= k-1 (3 >= 2) is true.
         result.push_back(nums[dq.front()] = nums[1]=3).
         result: [3,3]
       
       i=4, nums[4]=5. Current Window: [-1,-3,5]
         dq.front() (1). `1 == i-k` (4-3=1)? Yes, `1 == 1`. Pop 1.
         dq: [2,3]
         dq: [2,3] -> `nums[3]=-3 <= nums[4]=5`, pop 3. -> [2]
         dq: [2] -> `nums[2]=-1 <= nums[4]=5`, pop 2. -> []
         dq: [] -> [4]
         i >= k-1 (4 >= 2) is true.
         result.push_back(nums[dq.front()] = nums[4]=5).
         result: [3,3,5]
       
       i=5, nums[5]=3. Current Window: [-3,5,3]
         dq.front() (4). `4 == i-k` (5-3=2)? No.
         dq: [4] -> `nums[4]=5 !<= nums[5]=3`. Don't pop.
         dq: [4] -> [4,5] (values: `5, 3`)
         i >= k-1 (5 >= 2) is true.
         result.push_back(nums[dq.front()] = nums[4]=5).
         result: [3,3,5,5]
       
       i=6, nums[6]=6. Current Window: [5,3,6]
         dq.front() (4). `4 == i-k` (6-3=3)? No.
         dq: [4,5] -> `nums[5]=3 <= nums[6]=6`, pop 5. -> [4]
         dq: [4] -> `nums[4]=5 <= nums[6]=6`, pop 4. -> []
         dq: [] -> [6]
         i >= k-1 (6 >= 2) is true.
         result.push_back(nums[dq.front()] = nums[6]=6).
         result: [3,3,5,5,6]
       
       i=7, nums[7]=7. Current Window: [3,6,7]
         dq.front() (6). `6 == i-k` (7-3=4)? No.
         dq: [6] -> `nums[6]=6 <= nums[7]=7`, pop 6. -> []
         dq: [] -> [7]
         i >= k-1 (7 >= 2) is true.
         result.push_back(nums[dq.front()] = nums[7]=7).
         result: [3,3,5,5,6,7]
       
       End of loop. Final result: [3,3,5,5,6,7]. Correct!
       ```
---

## 5. Daily Temperatures

Trace `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`

`stack` stores indices. `result` stores days to wait.

```
Initial State:
temperatures: [73, 74, 75, 71, 69, 72, 76, 73]
result:       [0,  0,  0,  0,  0,  0,  0,  0]
stack:        [ ]

i=0, temps[0]=73
  stack is empty.
  Push 0.
  stack: [0]

i=1, temps[1]=74
  stack not empty. temps[1]=74 > temps[stack.top()=0]=73. True.
    prev_day_index = stack.top() (0). Pop 0.
    result[0] = i - prev_day_index = 1 - 0 = 1.
    result: [1,0,0,0,0,0,0,0]
  stack: []
  Push 1.
  stack: [1]

i=2, temps[2]=75
  stack not empty. temps[2]=75 > temps[stack.top()=1]=74. True.
    prev_day_index = stack.top() (1). Pop 1.
    result[1] = i - prev_day_index = 2 - 1 = 1.
    result: [1,1,0,0,0,0,0,0]
  stack: []
  Push 2.
  stack: [2]

i=3, temps[3]=71
  stack not empty. temps[3]=71 > temps[stack.top()=2]=75. False.
  Push 3.
  stack: [2,3] (indices for temps 75, 71)

i=4, temps[4]=69
  stack not empty. temps[4]=69 > temps[stack.top()=3]=71. False.
  Push 4.
  stack: [2,3,4] (indices for temps 75, 71, 69)

i=5, temps[5]=72
  stack not empty. temps[5]=72 > temps[stack.top()=4]=69. True.
    prev_day_index = stack.top() (4). Pop 4.
    result[4] = i - prev_day_index = 5 - 4 = 1.
    result: [1,1,0,0,1,0,0,0]
  stack: [2,3]
  stack not empty. temps[5]=72 > temps[stack.top()=3]=71. True.
    prev_day_index = stack.top() (3). Pop 3.
    result[3] = i - prev_day_index = 5 - 3 = 2.
    result: [1,1,0,2,1,0,0,0]
  stack: [2]
  stack not empty. temps[5]=72 > temps[stack.top()=2]=75. False.
  Push 5.
  stack: [2,5] (indices for temps 75, 72)

i=6, temps[6]=76
  stack not empty. temps[6]=76 > temps[stack.top()=5]=72. True.
    prev_day_index = stack.top() (5). Pop 5.
    result[5] = i - prev_day_index = 6 - 5 = 1.
    result: [1,1,0,2,1,1,0,0]
  stack: [2]
  stack not empty. temps[6]=76 > temps[stack.top()=2]=75. True.
    prev_day_index = stack.top() (2). Pop 2.
    result[2] = i - prev_day_index = 6 - 2 = 4.
    result: [1,1,4,2,1,1,0,0]
  stack: []
  Push 6.
  stack: [6]

i=7, temps[7]=73
  stack not empty. temps[7]=73 > temps[stack.top()=6]=76. False.
  Push 7.
  stack: [6,7] (indices for temps 76, 73)

End of loop.
Final result: [1,1,4,2,1,1,0,0]
```
```