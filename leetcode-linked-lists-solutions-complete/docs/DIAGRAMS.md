# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the logic behind some of the key Linked List algorithms.

---

## 1. Reverse Linked List (Iterative)

**Initial State:**
```
null <- prev  current -> nextTemp
              |
              V
       [1] -> [2] -> [3] -> null
       head
```

**Step 1: Process node 1**
*   `nextTemp` points to `2`.
*   `current.next` (node `1`'s next) now points to `prev` (`null`).
*   `prev` moves to `current` (node `1`).
*   `current` moves to `nextTemp` (node `2`).

```
prev -> [1] <- [2] -> [3] -> null
        head  current  nextTemp
```

**Step 2: Process node 2**
*   `nextTemp` points to `3`.
*   `current.next` (node `2`'s next) now points to `prev` (node `1`).
*   `prev` moves to `current` (node `2`).
*   `current` moves to `nextTemp` (node `3`).

```
        prev -> [2] <- [1] <- null
                |      head
                V
               [3] -> null
              current  nextTemp
```

**After all steps:**
`current` eventually becomes `null`. `prev` will be at the original last node, which is now the new head.

```
       [5] -> [4] -> [3] -> [2] -> [1] -> null
        ^
        |
       prev (new head)
```

---

## 2. Detect Cycle in Linked List (Floyd's Tortoise and Hare)

**Initial State:**
```
[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|

H: Head, S: Slow, F: Fast (both start at H)
```

**Phase 1: Detect Cycle**
*   `S` moves 1 step, `F` moves 2 steps.

```
Iteration 1:
S: H -> A
F: H -> A -> B

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
        S    F
```

```
Iteration 2:
S: A -> B
F: B -> C -> D

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
             S          F
```

```
Iteration 3:
S: B -> C
F: D -> E -> B (F wraps around and meets S!)

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^     |      |             |
        |-----|------|-------------|
              S, F (meeting point)
```

**Phase 2: Find Cycle Start**
*   `slow` is reset to `head`.
*   Both `slow` and `fast` move one step at a time.

```
Initial for Phase 2:
head (ptr1) -> [H] -> [A] -> [B] -> [C] -> [D] -> [E]
                       ^                         |
                       |-------------------------|
                      (ptr2, meeting point B)
```

```
Iteration 1:
ptr1: H -> A
ptr2: B -> C

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
       ptr1         ptr2
```

```
Iteration 2:
ptr1: A -> B
ptr2: C -> D

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
             ptr1          ptr2
```

```
Iteration 3:
ptr1: B -> C
ptr2: D -> E

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
                  ptr1         ptr2
```

```
Iteration 4:
ptr1: C -> D
ptr2: E -> B (ptr2 wraps around)

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
                       ptr1 (ptr2 will meet here next)
```

```
Iteration 5:
ptr1: D -> E
ptr2: B -> C

[H] -> [A] -> [B] -> [C] -> [D] -> [E]
        ^                          |
        |--------------------------|
                            ptr1, ptr2 (meeting point E, which is the cycle start)
```
Wait, the example was for cycle starting at A. Let's re-do for a simpler case where `A` is the cycle start.

**Let's use a simpler example: `1 -> 2 -> 3 -> 4 -> 2 (cycle)`**

```
Initial State:
[1] -> [2] -> [3] -> [4]
        ^             |
        |-------------|

head=1, slow=1, fast=1
```

**Phase 1: Detect Cycle**

*   **Start:** `S=1, F=1`
*   **1st step:** `S=2, F=3`
    ```
    [1] -> [2] -> [3] -> [4]
            S      F      |
            ^             |
            |-------------|
    ```
*   **2nd step:** `S=3, F=2` (F: 3->4->2)
    ```
    [1] -> [2] -> [3] -> [4]
            F      S      |
            ^             |
            |-------------|
    ```
*   **3rd step:** `S=4, F=4` (S: 3->4, F: 2->3->4). **Meet at 4.**
    ```
    [1] -> [2] -> [3] -> [4]
            ^             S,F (intersection)
            |-------------|
    ```

**Phase 2: Find Cycle Start**

*   `ptr1 = head (1)`, `ptr2 = intersection (4)`
*   **Start:** `ptr1=1, ptr2=4`
    ```
    [1] -> [2] -> [3] -> [4]
    ptr1    ^             ptr2
            |-------------|
    ```
*   **1st step:** `ptr1=2, ptr2=2` (ptr2: 4->2). **Meet at 2.**
    ```
    [1] -> [2] -> [3] -> [4]
           ptr1,ptr2      |
            ^             |
            |-------------|
    ```
    The cycle starts at node `2`. This matches the logic.

---

## 3. Remove Nth Node From End of List (One-Pass)

**Example: `[1] -> [2] -> [3] -> [4] -> [5]`, remove 2nd from end (node `4`)**

**Initial State:**
```
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> null
^
|
slow, fast
```

**Step 1: Move `fast` `n+1` steps (2+1=3 steps) ahead.**
*   `n=2`. `fast` moves 3 steps.
*   `fast` is now at node `3`.

```
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> null
^             ^
|             |
slow          fast
```

**Step 2: Move both `slow` and `fast` until `fast` reaches `null`.**

*   **Move 1:** `slow` at `1`, `fast` at `4`.
    ```
    dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> null
             ^             ^
             |             |
             slow          fast
    ```
*   **Move 2:** `slow` at `2`, `fast` at `5`.
    ```
    dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> null
                    ^             ^
                    |             |
                    slow          fast
    ```
*   **Move 3:** `slow` at `3`, `fast` at `null`. (`fast` moves from `5` to `null`).
    ```
    dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> null
                           ^                    ^
                           |                    |
                           slow                 fast (null)
    ```

**Step 3: `slow` is now at node `3`. Its `next` is `4` (the node to be removed).**
*   Set `slow.next = slow.next.next` (i.e., `3.next = 4.next`, which is `5`).

```
dummy -> [1] -> [2] -> [3] -> [5] -> null
                           ^
                           |
                           slow (now points to 5, effectively removing 4)
```

**Result:** `[1] -> [2] -> [3] -> [5]` (Return `dummy.next`).

---