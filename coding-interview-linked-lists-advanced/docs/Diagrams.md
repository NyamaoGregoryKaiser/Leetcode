```markdown
# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the state changes and pointer movements for some of the linked list algorithms.

---

## 1. Reverse Linked List (Iterative Approach)

**Initial State:**
```
null <- prev
  |
  V
  1 -> 2 -> 3 -> 4 -> 5 -> null
  ^
  |
  current
```

**Step 1: Save `current.next` to `nextTemp`**
```
null <- prev
  |
  V
  1 -> 2 -> 3 -> 4 -> 5 -> null
  ^    ^
  |    |
  current nextTemp
```

**Step 2: Reverse `current.next` to `prev`**
```
     null <- prev
       ^
       |
  null <- 1 <- 2 -> 3 -> 4 -> 5 -> null
         ^    ^
         |    |
         current nextTemp
```

**Step 3 & 4: Advance `prev` and `current`**
```
          null
            ^
            |
            1 <- prev
            ^
            |
      2 -> 3 -> 4 -> 5 -> null
      ^
      |
      current
```
*(Diagram for `prev=current` then `current=nextTemp` combined for next iteration start)*

**Continuing the process...**

After processing node `2`:
```
          null
            ^
            |
            1 <- 2 <- prev
                 ^
                 |
           3 -> 4 -> 5 -> null
           ^
           |
           current
```

After processing node `3`:
```
          null
            ^
            |
            1 <- 2 <- 3 <- prev
                      ^
                      |
                4 -> 5 -> null
                ^
                |
                current
```

**Final State:**
```
null <- 1 <- 2 <- 3 <- 4 <- 5 <- prev
                                 ^
                                 |
                                 current (is null)

Return prev (which is 5) => 5 -> 4 -> 3 -> 2 -> 1 -> null
```

---

## 2. Linked List Cycle (Floyd's Tortoise and Hare)

**Scenario: Cycle Exists** (`head = [3,2,0,-4]`, `pos = 1` => tail points to `2`)

Initial State:
```
3 -> 2 -> 0 -> -4
     ^         |
     |---------|

slow = 3
fast = 3
```

After 1st step: `slow` moves 1, `fast` moves 2
```
3 -> 2 -> 0 -> -4
     ^         |
     |---------|

slow = 2
fast = 0
```

After 2nd step: `slow` moves 1, `fast` moves 2 (from `0`, `fast.next` is `-4`, `fast.next.next` is `2`)
```
3 -> 2 -> 0 -> -4
     ^         |
     |---------|

slow = 0
fast = 2  <-- They meet! Cycle detected.
```

---

**Scenario: No Cycle** (`head = [1,2,3,4,5]`)

Initial State:
```
1 -> 2 -> 3 -> 4 -> 5 -> null

slow = 1
fast = 1
```

After 1st step:
```
1 -> 2 -> 3 -> 4 -> 5 -> null

slow = 2
fast = 3
```

After 2nd step:
```
1 -> 2 -> 3 -> 4 -> 5 -> null

slow = 3
fast = 5
```

After 3rd step: `fast` becomes `null` (`fast.next` was `null`)
```
1 -> 2 -> 3 -> 4 -> 5 -> null

slow = 4
fast = null  <-- Loop terminates. No cycle.
```

---

## 4. Remove Nth Node From End of List (One-Pass Two-Pointer)

**Problem:** `head = [1,2,3,4,5]`, `n = 2` (Remove `4`)

Initial State (with dummy node):
```
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
^
|
slow, fast
```

**Step 1: Move `fast` `n+1` (3) steps ahead.**
```
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
^             ^
|             |
slow          fast
```

**Step 2: Move `slow` and `fast` simultaneously until `fast` is `null`.**

*   Iteration 1: `slow` moves to `1`, `fast` moves to `4`.
    ```
    dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
             ^         ^
             |         |
             slow      fast
    ```

*   Iteration 2: `slow` moves to `2`, `fast` moves to `5`.
    ```
    dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                  ^         ^
                  |         |
                  slow      fast
    ```

*   Iteration 3: `slow` moves to `3`, `fast` moves to `null`.
    ```
    dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                       ^               ^
                       |               |
                       slow            fast (null)
    ```
    Loop terminates. `slow` is now at node `3`.

**Step 3: Remove the node (`slow.next`)**
`slow.next` is node `4`. We set `slow.next = slow.next.next` (which is node `5`).
```
dummy -> 1 -> 2 -> 3 --.  4 -> 5 -> null
                       | /
                       '
```
Effectively:
```
dummy -> 1 -> 2 -> 3 -> 5 -> null
```

**Final Result (return `dummy.next`):** `1 -> 2 -> 3 -> 5 -> null`

---
```