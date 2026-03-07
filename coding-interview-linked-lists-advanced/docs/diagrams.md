# Linked List Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to visually represent the state changes during key Linked List operations. These diagrams are helpful for understanding pointer movements and the overall flow of algorithms.

---

## 1. Reverse Linked List (Iterative)

**Problem:** `1 -> 2 -> 3 -> NULL`
**Goal:** `3 -> 2 -> 1 -> NULL`

**Initial State:**
```
NULL <- prev
  1  <- current
  |
  v
  2  <- nextTemp
  |
  v
  3  -> NULL
```

**Step 1: Process node '1'**
*   `nextTemp` = `current.next` (stores '2')
*   `current.next` = `prev` (1.next becomes NULL)
*   `prev` = `current` (prev moves to '1')
*   `current` = `nextTemp` (current moves to '2')

```
NULL <- prev (now 1)
  ^
  |
  1  <- current (now 2)
  |
  v
  2  <- nextTemp (now 3)
  |
  v
  3  -> NULL

// Visual representation after step 1
NULL <- 1 <- prev
        |
        v
        2 <- current
        |
        v
        3 -> NULL
```

**Step 2: Process node '2'**
*   `nextTemp` = `current.next` (stores '3')
*   `current.next` = `prev` (2.next becomes '1')
*   `prev` = `current` (prev moves to '2')
*   `current` = `nextTemp` (current moves to '3')

```
NULL <- 1 <- prev (now 2)
        ^
        |
        2 <- current (now 3)
        |
        v
        3 -> NULL

// Visual representation after step 2
NULL <- 1 <- 2 <- prev
             |
             v
             3 <- current
             |
             v
             NULL <- nextTemp (now NULL)
```

**Step 3: Process node '3'**
*   `nextTemp` = `current.next` (stores `NULL`)
*   `current.next` = `prev` (3.next becomes '2')
*   `prev` = `current` (prev moves to '3')
*   `current` = `nextTemp` (current moves to `NULL`)

```
NULL <- 1 <- 2 <- prev (now 3)
             ^
             |
             3 <- current (now NULL)
             |
             v
             NULL <- nextTemp (now NULL)

// Visual representation after step 3
NULL <- 1 <- 2 <- 3 <- prev
                      |
                      v
                      NULL <- current
```

`current` is `NULL`, loop terminates. Return `prev`.
**Result:** `3 -> 2 -> 1 -> NULL`

---

## 2. Detect Cycle and Find Start Node (Floyd's Tortoise and Hare)

**Problem:** `1 -> 2 -> 3 -> 4 -> 5 -> 3` (cycle starts at node '3')

**Phase 1: Detect Cycle**

Initial:
`1 -> 2 -> 3 -> 4 -> 5`
         `^       |`
         `|_______|`
`slow: 1`
`fast: 1`

Move:
`slow: 2`, `fast: 3`
`slow: 3`, `fast: 5`
`slow: 4`, `fast: 4`  (Fast overtakes slow within the cycle. THEY MEET at node '4'!)

```
  H
  |
  v
  1 -> 2 -> 3 <- cycle_start
            ^   |
            |   v
            5 <- 4 <- meeting_point
            ^   |
            |   v
            fast & slow (they met here)
```

**Phase 2: Find Cycle Start**

Reset `slow` to `head`. Keep `fast` at meeting point.
Move both one step at a time.

Initial (Phase 2):
`slow: 1` (head)
`fast: 4` (meeting point)

Move:
`slow: 2`, `fast: 5`
`slow: 3`, `fast: 3` (THEY MEET at node '3'!)

```
  H
  |
  v
  1 -> 2 -> 3 <- cycle_start (MEET HERE)
            ^   |
            |   v
            5 <- 4
```
**Result:** Node '3' is the cycle start.

---

## 3. Remove Nth Node From End

**Problem:** `1 -> 2 -> 3 -> 4 -> 5`, `n = 2` (remove node '4')

**Initial Setup with Dummy:**
`dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`
`slow: dummy`
`fast: dummy`

**Step 1: Move `fast` `n` steps ahead (n=2)**
`fast` moves to `1`
`fast` moves to `2`

```
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
^       ^    ^
|       |    |
slow    fast (2 steps ahead)
```

**Step 2: Move `fast` and `slow` until `fast.next` is `NULL`**

*   `fast` moves to `3`, `slow` moves to `1`
*   `fast` moves to `4`, `slow` moves to `2`
*   `fast` moves to `5`, `slow` moves to `3`

Now `fast.next` (which is `5.next`) is `NULL`. Stop.

```
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
               ^    ^    ^
               |    |    |
               slow (points to node before target)
                    target node to remove (4)
                         fast (at end)
```

**Step 3: Remove `slow.next`**
`slow` is pointing to `3`. We want to remove `4`.
`slow.next` (which is `3.next`) should now point to `slow.next.next` (which is `4.next`, i.e., `5`).
So, `3.next = 5`.

```
       ________________
      |                |
      v                |
dummy -> 1 -> 2 -> 3   5 -> NULL
                    ^  ^
                    |  |
                  slow   (4 is bypassed and removed)
```
**Result:** `1 -> 2 -> 3 -> 5 -> NULL` (Note: `dummy` is removed from returned list)

---

## 4. Reorder List

**Problem:** `1 -> 2 -> 3 -> 4 -> 5`
**Goal:** `1 -> 5 -> 2 -> 4 -> 3`

**Step 1: Find Middle**
`slow` and `fast` pointers:
`1 -> 2 -> 3 -> 4 -> 5 -> NULL`
Initially: `s=1`, `f=1`
Move 1: `s=2`, `f=3`
Move 2: `s=3`, `f=5`
`fast.next` is `NULL`, so `slow` (node `3`) is the middle.

**Step 2: Split and Reverse Second Half**
Original List: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
First Half Head (`p1_head`): `1`
Second Half Head (`p2_head`): `slow.next` (which is `4`)
Disconnect: `slow.next = NULL` (i.e., `3.next = NULL`)

List 1: `1 -> 2 -> 3 -> NULL`
List 2 (original): `4 -> 5 -> NULL`

Reverse List 2:
`NULL <- 5 <- 4`
`p2_head` becomes `5`.

**Step 3: Merge Alternately**
`p1_current = 1 -> 2 -> 3 -> NULL`
`p2_current = 5 -> 4 -> NULL`

Merge Loop:

1.  Current state:
    `p1_c: 1 -> 2 -> 3 -> NULL`
    `p2_c: 5 -> 4 -> NULL`
    `temp1 = p1_c.next (2)`
    `temp2 = p2_c.next (4)`
    `p1_c.next = p2_c` (`1.next = 5`)
    `p2_c.next = temp1` (`5.next = 2`)
    `p1_c = temp1 (2)`
    `p2_c = temp2 (4)`
    Resulting segment: `1 -> 5 -> 2`

2.  Current state:
    `p1_c: 2 -> 3 -> NULL`
    `p2_c: 4 -> NULL`
    `temp1 = p1_c.next (3)`
    `temp2 = p2_c.next (NULL)`
    `p1_c.next = p2_c` (`2.next = 4`)
    `p2_c.next = temp1` (`4.next = 3`)
    `p1_c = temp1 (3)`
    `p2_c = temp2 (NULL)`
    Resulting segment: `1 -> 5 -> 2 -> 4 -> 3`

Loop terminates because `p2_c` is `NULL`.

**Final List:** `1 -> 5 -> 2 -> 4 -> 3 -> NULL`

---
These diagrams should help in visualizing the dynamic nature of Linked List operations and pointer manipulations.