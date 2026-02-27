```markdown
# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the operations and internal states of the data structures and algorithms used in this project.

---

## 1. Stack Operations (`src/data-structures/Stack.ts`)

A Stack is a Last-In, First-Out (LIFO) data structure.

### `push(item)`

Adds an item to the top of the stack.

```
Initial Stack:
+---+
| D |
+---+
| C |
+---+
| B |
+---+
| A |
+---+
  |
  V
Bottom

push(E):
+---+
| E | <--- TOP
+---+
| D |
+---+
| C |
+---+
| B |
+---+
| A |
+---+
Bottom
```

### `pop()`

Removes and returns the item from the top of the stack.

```
Initial Stack:
+---+
| E | <--- TOP
+---+
| D |
+---+
| C |
+---+
| B |
+---+
| A |
+---+
Bottom

pop() returns E:
+---+
| D | <--- TOP
+---+
| C |
+---+
| B |
+---+
| A |
+---+
Bottom
```

### `peek()`

Returns the item from the top of the stack without removing it.

```
Stack:
+---+
| D | <--- TOP
+---+
| C |
+---+
| B |
+---+
| A |
+---+
Bottom

peek() returns D (stack remains unchanged)
```

---

## 2. Queue Operations (`src/data-structures/Queue.ts`)

A Queue is a First-In, First-Out (FIFO) data structure.

### `enqueue(item)`

Adds an item to the back (rear) of the queue.

```
Initial Queue:
Front -> [A, B, C, D] <- Rear

enqueue(E):
Front -> [A, B, C, D, E] <- Rear
```

### `dequeue()`

Removes and returns the item from the front of the queue.

```
Initial Queue:
Front -> [A, B, C, D, E] <- Rear

dequeue() returns A:
Front -> [B, C, D, E] <- Rear
```

### `peek()`

Returns the item at the front of the queue without removing it.

```
Queue:
Front -> [B, C, D, E] <- Rear

peek() returns B (queue remains unchanged)
```

---

## 3. Deque Operations (`src/data-structures/Deque.ts`)

A Deque (Double-Ended Queue) allows adding and removing elements from both ends.

### `addFront(item)`

Adds an item to the front of the deque.

```
Initial Deque:
Front -> [B, C, D] <- Rear

addFront(A):
Front -> [A, B, C, D] <- Rear
```

### `addBack(item)`

Adds an item to the back of the deque.

```
Initial Deque:
Front -> [A, B, C, D] <- Rear

addBack(E):
Front -> [A, B, C, D, E] <- Rear
```

### `removeFront()`

Removes and returns the item from the front of the deque.

```
Initial Deque:
Front -> [A, B, C, D, E] <- Rear

removeFront() returns A:
Front -> [B, C, D, E] <- Rear
```

### `removeBack()`

Removes and returns the item from the back of the deque.

```
Initial Deque:
Front -> [B, C, D, E] <- Rear

removeBack() returns E:
Front -> [B, C, D] <- Rear
```

---

## 4. P1: Valid Parentheses (Stack Usage)

**Input:** `s = "([{}])"`

| Step | Character | Stack State (Top is Right) | Action                         | Result |
| :--- | :-------- | :------------------------- | :----------------------------- | :----- |
| 1    | `(`       | `[`                        | Push `(`                       |        |
| 2    | `[`       | `[ ( , [`                  | Push `[`                       |        |
| 3    | `{`       | `[ ( , [ , {`              | Push `{`                       |        |
| 4    | `}`       | `[ ( , [`                  | Pop `{`, matches `}`           |        |
| 5    | `]`       | `[ (`                      | Pop `[`, matches `]`           |        |
| 6    | `)`       | `[]`                       | Pop `(`, matches `)`           |        |
| End  |           | `[]` (Empty)               | Stack is empty, all matched.   | `true` |

---

## 5. P3: Implement Queue using Stacks (Transfer Operation)

**Scenario:** Queue has elements `[A, B, C]`. `A` is front.
`inputStack` initially holds `[C, B, A]` (top is `A`).
`outputStack` is empty.

**Goal:** `pop()` operation.

```
Initial State:
   InputStack      OutputStack
   +---+             +---+
   | A | <--- TOP    |   | <--- TOP
   +---+             +---+
   | B |             |   |
   +---+             +---+
   | C |             |   |
   +---+             +---+
   Bottom            Bottom

1. outputStack is empty, so transfer elements from inputStack.
   - Pop A from InputStack, Push A to OutputStack.
   - Pop B from InputStack, Push B to OutputStack.
   - Pop C from InputStack, Push C to OutputStack.

Intermediate State (after transfer):
   InputStack      OutputStack
   +---+             +---+
   |   | <--- TOP    | C | <--- TOP
   +---+             +---+
   |   |             | B |
   +---+             +---+
   |   |             | A |
   +---+             +---+
   Bottom            Bottom

2. Now outputStack has elements in correct FIFO order.
   Pop from OutputStack.

Final State (after pop A):
   InputStack      OutputStack
   +---+             +---+
   |   | <--- TOP    | C | <--- TOP
   +---+             +---+
   |   |             | B |
   +---+             +---+
   |   |             |   |
   +---+             +---+
   Bottom            Bottom

Returned: A
Next peek/pop would return B.
```

---

## 6. P4: Walls and Gates (BFS Traversal)

**Input Grid:**
```
INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
```
**Queue Initialization (Gates at distance 0):** `Q = [[0,2], [3,0]]` (value in grid is 0 for these)

**Iteration 1: Dequeue `[0,2]` (value 0)**
*   Neighbors: `[0,1]`(wall), `[0,3]`(INF), `[1,2]`(INF).
*   `[0,3]` -> `grid[0][3] = 0 + 1 = 1`. Enqueue `[0,3]`.
*   `[1,2]` -> `grid[1][2] = 0 + 1 = 1`. Enqueue `[1,2]`.
*   `Q = [[3,0], [0,3], [1,2]]`
Grid (partial):
```
INF  -1  0   1
INF INF  1  -1
INF  -1 INF  -1
  0  -1 INF INF
```

**Iteration 2: Dequeue `[3,0]` (value 0)**
*   Neighbors: `[2,0]`(INF), `[3,1]`(wall).
*   `[2,0]` -> `grid[2][0] = 0 + 1 = 1`. Enqueue `[2,0]`.
*   `Q = [[0,3], [1,2], [2,0]]`
Grid (partial):
```
INF  -1  0   1
INF INF  1  -1
  1  -1 INF  -1
  0  -1 INF INF
```
... and so on. BFS will expand outward layer by layer from all gates simultaneously, filling `INF` cells with the shortest distance.

---

## 7. P5: Sliding Window Maximum (Deque Usage)

**Input:** `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`

**Deque Invariant:** Stores indices, values at indices are decreasing from front to back. Front of deque is max.

| `i` | `nums[i]` | Deque (Indices, Front is Left) | Action/Explanation                                        | `results` |
| :-- | :-------- | :----------------------------- | :-------------------------------------------------------- | :-------- |
| 0   | `1`       | `[0]`                          | Add `0` (`nums[0]=1`).                                    | `[]`      |
| 1   | `3`       | `[1]`                          | `nums[0]=1 < nums[1]=3`, remove `0`. Add `1`.             | `[]`      |
| 2   | `-1`      | `[1, 2]`                       | `nums[2]=-1 < nums[1]=3` (keep `1`). Add `2`. Window `[1,3,-1]`. `i=2 >= k-1`. `nums[deque.front()] = nums[1] = 3`. | `[3]`     |
| 3   | `-3`      | `[1, 2, 3]`                    | `deque.front()=1` is not `i-k=3-3=0`. `nums[3]=-3 < nums[2]=-1`. Add `3`. Window `[3,-1,-3]`. `nums[deque.front()] = nums[1] = 3`. | `[3, 3]`  |
| 4   | `5`       | `[4]`                          | `deque.front()=1 <= i-k=4-3=1`, remove `1`. `nums[3]=-3 < nums[4]=5`, remove `3`. `nums[2]=-1 < nums[4]=5`, remove `2`. Add `4`. Window `[-1,-3,5]`. `nums[deque.front()] = nums[4] = 5`. | `[3, 3, 5]` |
| 5   | `3`       | `[4, 5]`                       | `deque.front()=4` is not `i-k=5-3=2`. `nums[5]=3 < nums[4]=5` (keep `4`). Add `5`. Window `[-3,5,3]`. `nums[deque.front()] = nums[4] = 5`. | `[3, 3, 5, 5]` |
| 6   | `6`       | `[6]`                          | `deque.front()=4 <= i-k=6-3=3`, remove `4`. `nums[5]=3 < nums[6]=6`, remove `5`. Add `6`. Window `[5,3,6]`. `nums[deque.front()] = nums[6] = 6`. | `[3, 3, 5, 5, 6]` |
| 7   | `7`       | `[7]`                          | `deque.front()=6 <= i-k=7-3=4`, remove `6`. `nums[6]=6 < nums[7]=7`, remove `6`. Add `7`. Window `[3,6,7]`. `nums[deque.front()] = nums[7] = 7`. | `[3, 3, 5, 5, 6, 7]` |

Final result: `[3, 3, 5, 5, 6, 7]`
```