# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the fundamental data structures (Stack, Queue, Doubly Linked List) and the core concepts behind some of the more complex algorithms (Min Stack, Queue using Stacks, LRU Cache).

---

## 1. Stack (LIFO - Last-In, First-Out)

A stack is like a pile of plates. You can only add or remove plates from the top.

```
+----+  <-- Top
| P3 |
+----+
| P2 |
+----+
| P1 |
+----+
  ^
  |
  |
  |   PUSH (add to top)
  |   POP (remove from top)
  |   PEEK (look at top)
```

**Operations:**

*   **`push(P4)`**:
    ```
    +----+
    | P4 |  <-- Top
    +----+
    | P3 |
    +----+
    | P2 |
    +----+
    | P1 |
    +----+
    ```
*   **`pop()`**: (removes P4)
    ```
    +----+  <-- Top
    | P3 |
    +----+
    | P2 |
    +----+
    | P1 |
    +----+
    ```

---

## 2. Queue (FIFO - First-In, First-Out)

A queue is like a line of people waiting. The first person in line is the first to be served.

```
<-- Front             Back -->
+----+ +----+ +----+
| P1 |<--| P2 |<--| P3 |
+----+ +----+ +----+
  ^                       ^
  |                       |
  |                       |
  |   DEQUEUE (remove from front)
  |                       |   ENQUEUE (add to back)
  |                       |
```

**Operations:**

*   **`enqueue(P4)`**:
    ```
    <-- Front             Back -->
    +----+ +----+ +----+ +----+
    | P1 |<--| P2 |<--| P3 |<--| P4 |
    +----+ +----+ +----+ +----+
    ```
*   **`dequeue()`**: (removes P1)
    ```
    <-- Front             Back -->
    +----+ +----+ +----+
    | P2 |<--| P3 |<--| P4 |
    +----+ +----+ +----+
    ```

---

## 3. Doubly Linked List (for LRU Cache)

Each node points to both the previous and next node. This allows O(1) removal/insertion anywhere if you have a reference to the node. Our LRU uses dummy head/tail.

```
       DUMMY HEAD              DUMMY TAIL
       (MRU end)               (LRU end)
      +------+    +------+    +------+    +------+    +------+
null <-> | HEAD |<-->| NODE1|<-->| NODE2|<-->| TAIL |<--> null
      +------+    +------+    +------+    +------+    +------+
```

**Operations for LRU:**

*   **`addFront(NEW_NODE)`**:
    ```
           HEAD       NEW_NODE   NODE1
          +------+    +------+    +------+
null <-> | HEAD |<-->| NEW  |<-->| NODE1| ...
          +------+    +------+    +------+
    ```
*   **`removeNode(NODE1)`**: (removes NODE1 by linking its neighbors)
    ```
           HEAD       NODE2
          +------+    +------+
null <-> | HEAD |<-->| NODE2| ...
          +------+    +------+
    ```
*   **`removeTail()`**: (removes the node just before DUMMY TAIL)
    ```
           NODE1      NODE2      TAIL
    ... <--| NODE1|<-->| NODE2|<-->| TAIL |<--> null
          +------+    +------+    +------+

    (NODE2 is removed)

           NODE1                 TAIL
    ... <--| NODE1|<--------------->| TAIL |<--> null
          +------+                 +------+
    ```

---

## 4. Min Stack (Two Stacks Approach)

Two stacks are used: `dataStack` holds all elements, `minStack` holds current minimums.

```
PUSH 2:

dataStack:
+---+
| 2 |  <- Top
+---+

minStack:
+---+
| 2 |  <- Top (min is 2)
+---+

--------------------------
PUSH 0: (0 <= minStack.peek() which is 2)

dataStack:
+---+
| 0 |  <- Top
+---+
| 2 |
+---+

minStack:
+---+
| 0 |  <- Top (min is 0)
+---+
| 2 |
+---+

--------------------------
PUSH 3: (3 > minStack.peek() which is 0)

dataStack:
+---+
| 3 |  <- Top
+---+
| 0 |
+---+
| 2 |
+---+

minStack:
+---+
| 0 |  <- Top (min is still 0)
+---+
| 0 |
+---+
| 2 |
+---+

--------------------------
POP: (removes 3 from data, 0 from min)

dataStack:
+---+
| 0 |  <- Top
+---+
| 2 |
+---+

minStack:
+---+
| 0 |  <- Top (min is now 0 again)
+---+
| 2 |
+---+
```

---

## 5. Queue Using Stacks

Two stacks, `inputStack` for `push` and `outputStack` for `pop`/`peek`.

```
Initial State:
inputStack:  []
outputStack: []

--------------------------
push(1), push(2), push(3):

inputStack:
+---+
| 3 |  <- Top
+---+
| 2 |
+---+
| 1 |
+---+

outputStack: []

--------------------------
peek() or pop(): (outputStack is empty, so transfer)

1. Pop 3 from inputStack, push to outputStack
2. Pop 2 from inputStack, push to outputStack
3. Pop 1 from inputStack, push to outputStack

inputStack:  []

outputStack:
+---+
| 1 |  <- Top
+---+
| 2 |
+---+
| 3 |
+---+

Now, peek() returns 1. pop() removes 1.
```

---

## 6. LRU Cache (Conceptual Flow)

Combines a Map for O(1) lookup and a Doubly Linked List for O(1) ordering.

```
Capacity = 2

1. put(1, A)
   Map: {1 -> Node(1,A)}
   DLL: (Head) <-> [1,A] <-> (Tail)
        (MRU)           (LRU)

2. put(2, B)
   Map: {1 -> Node(1,A), 2 -> Node(2,B)}
   DLL: (Head) <-> [2,B] <-> [1,A] <-> (Tail)
        (MRU)           (LRU)

3. get(1) -> returns A
   (1,A) becomes MRU.
   Map: {1 -> Node(1,A), 2 -> Node(2,B)}
   DLL: (Head) <-> [1,A] <-> [2,B] <-> (Tail)
        (MRU)           (LRU)

4. put(3, C)
   Cache is full (capacity 2). LRU item [2,B] is evicted.
   Map: {1 -> Node(1,A), 3 -> Node(3,C)}
   DLL: (Head) <-> [3,C] <-> [1,A] <-> (Tail)
        (MRU)           (LRU)
```

---