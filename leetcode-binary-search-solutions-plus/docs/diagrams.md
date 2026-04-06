# Binary Search Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the steps and logic of various binary search implementations.

---

## 1. Standard Binary Search (Finding `target = 9` in `[ -1, 0, 3, 5, 9, 12 ]`)

Array: `[-1, 0, 3, 5, 9, 12]`
Indices: `  0, 1, 2, 3, 4,  5`

**Iteration 1:**
- `low = 0`, `high = 5`
- `mid = (0 + 5) / 2 = 2`
- `nums[mid] = nums[2] = 3`
- `3 < 9`, so target is in the right half.
- `low` moves to `mid + 1` (`2 + 1 = 3`).

```
   low        mid        high
    |          |          |
   [ -1, 0, 3, 5, 9, 12 ]
          ^
         (3 < 9)
```

**Iteration 2:**
- `low = 3`, `high = 5`
- `mid = (3 + 5) / 2 = 4`
- `nums[mid] = nums[4] = 9`
- `9 == 9`, target found! Return `mid` (which is 4).

```
              low   mid   high
               |     |     |
   [ -1, 0, 3, 5, 9, 12 ]
                     ^
                    (9 == 9)
```

---

## 2. Finding First Occurrence (Finding `target = 7` in `[ 5, 7, 7, 8, 8, 10 ]`)

Array: `[ 5, 7, 7, 8, 8, 10 ]`
Indices: `  0, 1, 2, 3, 4,  5`
`result = -1`

**Iteration 1:**
- `low = 0`, `high = 5`
- `mid = 2`
- `nums[mid] = nums[2] = 7`
- `7 == 7`, `result = 2`. Try to find an earlier occurrence.
- `high = mid - 1` (`2 - 1 = 1`).

```
   low        mid        high
    |          |          |
   [ 5, 7, 7, 8, 8, 10 ]
             ^
            (7 == 7, result=2, high=1)
```

**Iteration 2:**
- `low = 0`, `high = 1`
- `mid = 0`
- `nums[mid] = nums[0] = 5`
- `5 < 7`, target is in the right half.
- `low = mid + 1` (`0 + 1 = 1`).

```
   low  mid   high
    |    |     |
   [ 5, 7, 7, 8, 8, 10 ]
   ^
  (5 < 7, low=1)
```

**Iteration 3:**
- `low = 1`, `high = 1`
- `mid = 1`
- `nums[mid] = nums[1] = 7`
- `7 == 7`, `result = 1`. Try to find an earlier occurrence.
- `high = mid - 1` (`1 - 1 = 0`).

```
       low mid high
        |   |   |
   [ 5, 7, 7, 8, 8, 10 ]
          ^
         (7 == 7, result=1, high=0)
```

**Iteration 4:**
- `low = 1`, `high = 0`
- Loop condition `low <= high` (1 <= 0) is false. Loop terminates.

Final `result = 1`.

---

## 3. Search in Rotated Sorted Array (Finding `target = 0` in `[ 4, 5, 6, 7, 0, 1, 2 ]`)

Array: `[ 4, 5, 6, 7, 0, 1, 2 ]`
Indices: `  0, 1, 2, 3, 4, 5, 6`

**Iteration 1:**
- `low = 0`, `high = 6`
- `mid = 3`
- `nums[mid] = nums[3] = 7`
- `nums[low] = 4`, `nums[mid] = 7`. Left half `[4,5,6,7]` is sorted.
- `target = 0`. Is `0` in `[4,7]`? No.
- So, target must be in the right half (unsorted part).
- `low = mid + 1` (`3 + 1 = 4`).

```
   low        mid        high
    |          |          |
   [ 4, 5, 6, 7, 0, 1, 2 ]
             ^
(Left sorted, target not there, low=4)
```

**Iteration 2:**
- `low = 4`, `high = 6`
- `mid = 5`
- `nums[mid] = nums[5] = 1`
- `nums[low] = 0`, `nums[mid] = 1`. Left half `[0,1]` is sorted.
- `target = 0`. Is `0` in `[0,1]`? Yes.
- So, target must be in the left half (`[low, mid-1]`).
- `high = mid - 1` (`5 - 1 = 4`).

```
                   low   mid   high
                    |     |     |
   [ 4, 5, 6, 7, 0, 1, 2 ]
                         ^
(Left sorted, target there, high=4)
```

**Iteration 3:**
- `low = 4`, `high = 4`
- `mid = 4`
- `nums[mid] = nums[4] = 0`
- `0 == 0`, target found! Return `mid` (which is 4).

```
                       low mid high
                        |   |   |
   [ 4, 5, 6, 7, 0, 1, 2 ]
                           ^
                          (0 == 0)
```

---

## 4. Find Peak Element (Finding a peak in `[ 1, 2, 1, 3, 5, 6, 4 ]`)

Array: `[ 1, 2, 1, 3, 5, 6, 4 ]`
Indices: `  0, 1, 2, 3, 4, 5, 6`

**Iteration 1:**
- `low = 0`, `high = 6`
- `mid = 3`
- `nums[mid] = nums[3] = 3`
- Compare `nums[mid]` with `nums[mid+1]`: `3` vs `5`. `nums[mid] < nums[mid+1]`.
- This means we are on an ascending slope (like `...3,5...`). A peak must be to the right of `mid`.
- `low = mid + 1` (`3 + 1 = 4`).

```
   low        mid        high
    |          |          |
   [ 1, 2, 1, 3, 5, 6, 4 ]
             ^   ^
            (3 < 5, low=4)
```

**Iteration 2:**
- `low = 4`, `high = 6`
- `mid = 5`
- `nums[mid] = nums[5] = 6`
- Compare `nums[mid]` with `nums[mid+1]`: `6` vs `4`. `nums[mid] > nums[mid+1]`.
- This means we are on a descending slope (like `...6,4...`). A peak could be `mid` itself or to its left.
- `high = mid` (`5`).

```
                   low        mid        high
                    |          |          |
   [ 1, 2, 1, 3, 5, 6, 4 ]
                           ^   ^
                          (6 > 4, high=5)
```

**Iteration 3:**
- `low = 4`, `high = 5`
- `mid = 4`
- `nums[mid] = nums[4] = 5`
- Compare `nums[mid]` with `nums[mid+1]`: `5` vs `6`. `nums[mid] < nums[mid+1]`.
- Ascending slope. Peak must be to the right.
- `low = mid + 1` (`4 + 1 = 5`).

```
                   low   mid   high
                    |     |     |
   [ 1, 2, 1, 3, 5, 6, 4 ]
                         ^   ^
                        (5 < 6, low=5)
```

**Iteration 4:**
- `low = 5`, `high = 5`
- Loop condition `low < high` (5 < 5) is false. Loop terminates.
- Return `low` (which is 5). The peak is `nums[5] = 6`.

---