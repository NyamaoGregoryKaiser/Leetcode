```markdown
# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to visually explain the state changes and key concepts for some of the more complex Stack and Queue problems.

---

## Table of Contents

1.  [Custom Stack Operations](#1-custom-stack-operations)
2.  [Custom Queue Operations](#2-custom-queue-operations)
3.  [Problem 2: Implement Queue using Stacks](#3-problem-2-implement-queue-using-stacks)
4.  [Problem 4: Largest Rectangle in Histogram (Monotonic Stack)](#4-problem-4-largest-rectangle-in-histogram-monotonic-stack)
5.  [Problem 5: Min Stack (Auxiliary Stack)](#5-problem-5-min-stack-auxiliary-stack)

---

## 1. Custom Stack Operations

A Stack follows a Last-In, First-Out (LIFO) principle.

```
Initial State:
[ ] <-- top
```

**`push(10)`:**
```
[ 10 ] <-- top
```

**`push(20)`:**
```
[ 10 ]
[ 20 ] <-- top
```

**`peek()` (returns 20):**
```
[ 10 ]
[ 20 ] <-- top
```

**`pop()` (returns 20):**
```
[ 10 ] <-- top
```

**`pop()` (returns 10):**
```
[ ] <-- top
```

---

## 2. Custom Queue Operations

A Queue follows a First-In, First-Out (FIFO) principle.

```
Initial State:
front --> [ ] <-- back
```

**`enqueue(10)`:**
```
front --> [ 10 ] <-- back
```

**`enqueue(20)`:**
```
front --> [ 10, 20 ] <-- back
```

**`peek()` (returns 10):**
```
front --> [ 10, 20 ] <-- back
```

**`dequeue()` (returns 10):**
```
front --> [ 20 ] <-- back
```

**`dequeue()` (returns 20):**
```
front --> [ ] <-- back
```

---

## 3. Problem 2: Implement Queue using Stacks

**Concept:** Using `inStack` for pushes and `outStack` for pops/peeks. Elements are transferred from `inStack` to `outStack` only when `outStack` is empty to maintain FIFO order.

```
Initial:
inStack:  [ ]
outStack: [ ]

1. push(1)
   inStack:  [ 1 ]
   outStack: [ ]

2. push(2)
   inStack:  [ 1, 2 ]
   outStack: [ ]

3. push(3)
   inStack:  [ 1, 2, 3 ]
   outStack: [ ]

4. peek()  // outStack is empty, so transfer from inStack
   Transfer: pop 3 from inStack, push 3 to outStack
   inStack:  [ 1, 2 ]
   outStack: [ 3 ]
   Transfer: pop 2 from inStack, push 2 to outStack
   inStack:  [ 1 ]
   outStack: [ 3, 2 ]
   Transfer: pop 1 from inStack, push 1 to outStack
   inStack:  [ ]
   outStack: [ 3, 2, 1 ] <-- top is now 1 (original first element)

   peek() returns 1 (top of outStack)

5. pop()   // outStack is not empty, no transfer needed
   pop 1 from outStack
   inStack:  [ ]
   outStack: [ 3, 2 ]

   pop() returns 1

6. push(4)
   inStack:  [ 4 ]
   outStack: [ 3, 2 ]

7. peek()  // outStack is not empty
   peek() returns 2 (top of outStack)
```

---

## 4. Problem 4: Largest Rectangle in Histogram (Monotonic Stack)

**Concept:** A monotonic increasing stack stores indices of bars. When a shorter bar is encountered (or end of array), bars taller than it are popped, and their maximum possible rectangle area is calculated.

`heights = [2, 1, 5, 6, 2, 3]`
Append dummy `0`: `[2, 1, 5, 6, 2, 3, 0]`

Stack stores indices. `maxArea` updated throughout.

```
i=0, h=2: stack=[] -> push(0). stack=[0]

i=1, h=1: Current h (1) < heights[stack.peek()] (heights[0]=2)
          POP index 0:
            h = heights[0]=2. Stack empty -> width = i (1)
            Area = 2 * 1 = 2. maxArea = 2
          stack=[]. Push(1). stack=[1]

i=2, h=5: Current h (5) > heights[stack.peek()] (heights[1]=1)
          Push(2). stack=[1, 2]

i=3, h=6: Current h (6) > heights[stack.peek()] (heights[2]=5)
          Push(3). stack=[1, 2, 3]

i=4, h=2: Current h (2) < heights[stack.peek()] (heights[3]=6)
          POP index 3:
            h = heights[3]=6. stack=[1, 2].
            width = i - stack.peek() - 1 = 4 - 2 - 1 = 1
            Area = 6 * 1 = 6. maxArea = 6
          Current h (2) < heights[stack.peek()] (heights[2]=5)
          POP index 2:
            h = heights[2]=5. stack=[1].
            width = i - stack.peek() - 1 = 4 - 1 - 1 = 2
            Area = 5 * 2 = 10. maxArea = 10
          Current h (2) > heights[stack.peek()] (heights[1]=1) -> STOP popping
          Push(4). stack=[1, 4]

i=5, h=3: Current h (3) > heights[stack.peek()] (heights[4]=2)
          Push(5). stack=[1, 4, 5]

i=6, h=0 (dummy): Current h (0) < heights[stack.peek()] (heights[5]=3)
          POP index 5:
            h = heights[5]=3. stack=[1, 4].
            width = i - stack.peek() - 1 = 6 - 4 - 1 = 1
            Area = 3 * 1 = 3. maxArea = 10
          Current h (0) < heights[stack.peek()] (heights[4]=2)
          POP index 4:
            h = heights[4]=2. stack=[1].
            width = i - stack.peek() - 1 = 6 - 1 - 1 = 4
            Area = 2 * 4 = 8. maxArea = 10
          Current h (0) < heights[stack.peek()] (heights[1]=1)
          POP index 1:
            h = heights[1]=1. stack=[].
            width = i = 6
            Area = 1 * 6 = 6. maxArea = 10
          stack is empty -> STOP popping
          Push(6). stack=[6]

END loop. Return maxArea = 10.
```

---

## 5. Problem 5: Min Stack (Auxiliary Stack)

**Concept:** Two stacks: `dataStack` for elements, `minStack` to keep track of the minimum up to each point in `dataStack`.

```
Initial:
dataStack: [ ]
minStack:  [ ]

1. push(-2)
   dataStack: [ -2 ]
   minStack:  [ -2 ] (since minStack was empty, -2 is the min)

2. push(0)
   dataStack: [ -2 ]
              [  0 ] <-- top
   minStack:  [ -2 ]
              [ -2 ] <-- top (0 is not smaller than current min -2, so push old min)

3. push(-3)
   dataStack: [ -2 ]
              [  0 ]
              [ -3 ] <-- top
   minStack:  [ -2 ]
              [ -2 ]
              [ -3 ] <-- top (-3 is smaller than current min -2, so push -3)

4. getMin()
   Returns minStack.peek() -> -3

5. pop()
   dataStack: [ -2 ]
              [  0 ] <-- top
   minStack:  [ -2 ]
              [ -2 ] <-- top (both stacks pop their top element)

6. top()
   Returns dataStack.peek() -> 0

7. getMin()
   Returns minStack.peek() -> -2
```
---
```
```