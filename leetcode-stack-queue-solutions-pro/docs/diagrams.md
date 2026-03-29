# Visual Diagrams (ASCII Art) for Stack and Queue Operations

This document provides ASCII art diagrams to help visualize the state changes of stacks and queues during the execution of some key algorithms.

---

## 1. Valid Parentheses (`is_valid_parentheses`)

**Input:** `s = "({[]})"`

```
Initial state:
Stack: []

Processing '(':
Stack:
[ '(' ]

Processing '{':
Stack:
[ '{' ]
[ '(' ]

Processing '[':
Stack:
[ '[' ]
[ '{' ]
[ '(' ]

Processing ']':
Current char: ']'
Stack top: '['. Matches! Pop.
Stack:
[ '{' ]
[ '(' ]

Processing '}':
Current char: '}'
Stack top: '{'. Matches! Pop.
Stack:
[ '(' ]

Processing ')':
Current char: ')'
Stack top: '('. Matches! Pop.
Stack:
[]

End of string. Stack is empty. Result: True.
```

---

## 2. Min Stack (`MinStack`)

**Operations:** `push(-2)`, `push(0)`, `push(-3)`, `getMin()`, `pop()`, `top()`, `getMin()`

```
Initial state:
Main Stack: []
Min Stack:  []

push(-2):
Main Stack: [-2]
Min Stack:  [-2] (since min_stack was empty, or -2 <= current_min_top (inf))

push(0):
Main Stack: [-2, 0]
Min Stack:  [-2] (since 0 > current_min_top (-2), no push to min_stack)

push(-3):
Main Stack: [-2, 0, -3]
Min Stack:  [-2, -3] (since -3 <= current_min_top (-2), push -3 to min_stack)

getMin():
Min Stack top is -3. Returns -3.

pop():
Pop from Main Stack: -3
Popped value (-3) == Min Stack top (-3). Pop from Min Stack.
Main Stack: [-2, 0]
Min Stack:  [-2]

top():
Main Stack top is 0. Returns 0.

getMin():
Min Stack top is -2. Returns -2.
```

---

## 3. Implement Queue using Stacks (`MyQueue`)

**Operations:** `push(1)`, `push(2)`, `peek()`, `pop()`, `push(3)`, `pop()`, `pop()`

```
Initial state:
Input Stack:  []
Output Stack: []

push(1):
Input Stack:  [1]
Output Stack: []

push(2):
Input Stack:  [1, 2]
Output Stack: []

peek():
Output Stack is empty. Transfer elements from Input to Output.
Input Stack:  []
Output Stack: [2, 1] (1 was at bottom of Input, now at top of Output)
Peek: 1

pop():
Output Stack top is 1. Pop 1.
Input Stack:  []
Output Stack: [2]
Pop result: 1

push(3):
Input Stack:  [3]
Output Stack: [2]

pop():
Output Stack is NOT empty. Pop from Output.
Input Stack:  [3]
Output Stack: []
Pop result: 2

Output Stack is empty. Transfer elements from Input to Output.
Input Stack:  []
Output Stack: [3]

pop():
Output Stack top is 3. Pop 3.
Input Stack:  []
Output Stack: []
Pop result: 3

Queue empty: True
```

---

## 5. Daily Temperatures (`daily_temperatures`)

**Input:** `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`

`answer` array initialized to `[0, 0, 0, 0, 0, 0, 0, 0]`

```
Initial state:
Stack (stores indices): []

i = 0, T[0] = 73:
Stack is empty. Push 0.
Stack: [0]
Answer: [0,0,0,0,0,0,0,0]

i = 1, T[1] = 74:
Stack not empty. T[stack.top()] (T[0]=73) < T[1]=74.
  Pop 0. answer[0] = 1 - 0 = 1.
Stack: []
Stack is empty. Push 1.
Stack: [1]
Answer: [1,0,0,0,0,0,0,0]

i = 2, T[2] = 75:
Stack not empty. T[stack.top()] (T[1]=74) < T[2]=75.
  Pop 1. answer[1] = 2 - 1 = 1.
Stack: []
Stack is empty. Push 2.
Stack: [2]
Answer: [1,1,0,0,0,0,0,0]

i = 3, T[3] = 71:
Stack not empty. T[stack.top()] (T[2]=75) > T[3]=71. No pop.
Push 3.
Stack: [2, 3]
Answer: [1,1,0,0,0,0,0,0]

i = 4, T[4] = 69:
Stack not empty. T[stack.top()] (T[3]=71) > T[4]=69. No pop.
Push 4.
Stack: [2, 3, 4]
Answer: [1,1,0,0,0,0,0,0]

i = 5, T[5] = 72:
Stack not empty. T[stack.top()] (T[4]=69) < T[5]=72.
  Pop 4. answer[4] = 5 - 4 = 1.
Stack: [2, 3]
Stack not empty. T[stack.top()] (T[3]=71) < T[5]=72.
  Pop 3. answer[3] = 5 - 3 = 2.
Stack: [2]
Stack not empty. T[stack.top()] (T[2]=75) > T[5]=72. No pop.
Push 5.
Stack: [2, 5]
Answer: [1,1,0,2,1,0,0,0]

i = 6, T[6] = 76:
Stack not empty. T[stack.top()] (T[5]=72) < T[6]=76.
  Pop 5. answer[5] = 6 - 5 = 1.
Stack: [2]
Stack not empty. T[stack.top()] (T[2]=75) < T[6]=76.
  Pop 2. answer[2] = 6 - 2 = 4.
Stack: []
Stack is empty. Push 6.
Stack: [6]
Answer: [1,1,4,2,1,1,0,0]

i = 7, T[7] = 73:
Stack not empty. T[stack.top()] (T[6]=76) > T[7]=73. No pop.
Push 7.
Stack: [6, 7]
Answer: [1,1,4,2,1,1,0,0]

End of loop.
Final answer: [1,1,4,2,1,1,0,0]. (Indices 6 and 7 remain in stack, their answer is 0 as initialized).
```

---