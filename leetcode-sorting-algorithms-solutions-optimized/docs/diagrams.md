# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the working principles of some core sorting algorithms.

---

## 1. Merge Sort

Merge Sort follows a divide-and-conquer strategy.

**Phase 1: Divide (Recursive splitting)**

```
Original Array:      [ 38 | 27 | 43 | 3 | 9 | 82 | 10 ]
                       /           \   /           \
First Split:        [ 38 | 27 | 43 | 3 ] [ 9 | 82 | 10 ]
                   /       \     /      \     /      \
Second Split:     [ 38 | 27 ] [ 43 | 3 ] [ 9 | 82 ] [ 10 ]
                 /   \   /   \   /   \   /   \   /   \
Final Split:   [ 38 ] [ 27 ] [ 43 ] [ 3 ] [ 9 ] [ 82 ] [ 10 ]
```

**Phase 2: Conquer (Merging sorted sub-arrays)**

The merging process happens bottom-up.

```
       [ 38 ] [ 27 ] [ 43 ] [ 3 ] [ 9 ] [ 82 ] [ 10 ]
          \   /         \   /       \   /      /
           V             V           V        V
       [ 27, 38 ]    [ 3, 43 ]    [ 9, 82 ]   [ 10 ]
            \           /             \         /
             V         V               V       V
          [ 3, 27, 38, 43 ]         [ 9, 10, 82 ]
                 \                   /
                  V                 V
              [ 3, 9, 10, 27, 38, 43, 82 ]
```

---

## 2. Quick Sort (Lomuto Partition Scheme Example)

Let's trace one partition step with `pivot = last element`.

**Array:** `[10, 80, 30, 90, 40, 50, 70]`
**Pivot:** `70` (last element)
**Pointers:** `i` (index of smaller element), `j` (current element)
`i` starts at `low - 1` (`-1`).
`j` iterates from `low` to `high - 1`.

Initial state:
`i: -1`
`j: 0`
`arr: [10, 80, 30, 90, 40, 50, 70]`
             ^                   ^
             low (0)           high (6)
             pivot_val = 70

---

**Step 1:** `j = 0`, `arr[0] = 10`. `10 <= 70`.
  `i` increments to `0`. Swap `arr[0]` with `arr[0]`.
`i:  0`
`j:  0`
`arr: [10, 80, 30, 90, 40, 50, 70]`
       ^
       i, j

---

**Step 2:** `j = 1`, `arr[1] = 80`. `80 > 70`. No swap.
`i:  0`
`j:  1`
`arr: [10, 80, 30, 90, 40, 50, 70]`
       ^   ^
       i   j

---

**Step 3:** `j = 2`, `arr[2] = 30`. `30 <= 70`.
  `i` increments to `1`. Swap `arr[1]` (`80`) with `arr[2]` (`30`).
`i:  1`
`j:  2`
`arr: [10, 30, 80, 90, 40, 50, 70]`
           ^   ^
           i   j

---

**Step 4:** `j = 3`, `arr[3] = 90`. `90 > 70`. No swap.
`i:  1`
`j:  3`
`arr: [10, 30, 80, 90, 40, 50, 70]`
           ^      ^
           i      j

---

**Step 5:** `j = 4`, `arr[4] = 40`. `40 <= 70`.
  `i` increments to `2`. Swap `arr[2]` (`80`) with `arr[4]` (`40`).
`i:  2`
`j:  4`
`arr: [10, 30, 40, 90, 80, 50, 70]`
               ^      ^
               i      j

---

**Step 6:** `j = 5`, `arr[5] = 50`. `50 <= 70`.
  `i` increments to `3`. Swap `arr[3]` (`90`) with `arr[5]` (`50`).
`i:  3`
`j:  5`
`arr: [10, 30, 40, 50, 80, 90, 70]`
                   ^      ^
                   i      j

---

**End of `j` loop.** Final swap: Place pivot (`70`) at `arr[i+1]` (`arr[4]`).
  Swap `arr[4]` (`80`) with `arr[6]` (`70`).

`arr: [10, 30, 40, 50, 70, 90, 80]`
                   ^   ^   ^
                   i   pivot i+1 high

**Pivot's final position (partition index `pi`) is `i + 1 = 4`.**

Resulting partitions:
`[10, 30, 40, 50]` | `70` | `[90, 80]`
  < pivot              = pivot   > pivot

---

## 3. Sort Colors (Dutch National Flag)

Sorting `0`s, `1`s, and `2`s in-place.

**Array:** `[2, 0, 2, 1, 1, 0]`

Initial State:
`low = 0`
`mid = 0`
`high = 5`

```
nums: [ 2 | 0 | 2 | 1 | 1 | 0 ]
        ^   ^               ^
       low mid             high
```

---

**Iteration 1:** `mid = 0`, `nums[mid] = 2`.
  Swap `nums[mid]` (`2`) with `nums[high]` (`0`). `high--`.

```
nums: [ 0 | 0 | 2 | 1 | 1 | 2 ]
        ^   ^           ^
       low mid         high
```

---

**Iteration 2:** `mid = 0`, `nums[mid] = 0`.
  Swap `nums[low]` (`0`) with `nums[mid]` (`0`). `low++`, `mid++`.

```
nums: [ 0 | 0 | 2 | 1 | 1 | 2 ]
            ^   ^       ^
           low mid     high
```

---

**Iteration 3:** `mid = 1`, `nums[mid] = 0`.
  Swap `nums[low]` (`0`) with `nums[mid]` (`0`). `low++`, `mid++`.

```
nums: [ 0 | 0 | 2 | 1 | 1 | 2 ]
                ^   ^   ^
               low mid high
```

---

**Iteration 4:** `mid = 2`, `nums[mid] = 2`.
  Swap `nums[mid]` (`2`) with `nums[high]` (`1`). `high--`.

```
nums: [ 0 | 0 | 1 | 1 | 2 | 2 ]
                ^   ^   ^
               low mid high
```

---

**Iteration 5:** `mid = 2`, `nums[mid] = 1`.
  `nums[mid]` is `1`. `mid++`.

```
nums: [ 0 | 0 | 1 | 1 | 2 | 2 ]
                ^       ^
               low     high
                    ^
                   mid
```

---

**Iteration 6:** `mid = 3`, `nums[mid] = 1`.
  `nums[mid]` is `1`. `mid++`.

```
nums: [ 0 | 0 | 1 | 1 | 2 | 2 ]
                ^       ^
               low     high
                        ^
                       mid
```

---

**End Condition:** `mid = 4`, `high = 3`. `mid > high`. Loop terminates.

Final Sorted Array: `[0, 0, 1, 1, 2, 2]`

---