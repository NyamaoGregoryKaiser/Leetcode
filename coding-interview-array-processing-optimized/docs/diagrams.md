# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the steps and concepts for some of the array manipulation algorithms.

---

## Problem 1: Container With Most Water (Two Pointers)

**Initial State:**
`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`
`left = 0` (points to height 1)
`right = 8` (points to height 7)

```
       8                   8
       |                   |
   _   |                   |   _
  | |  |               _   |  | |
  | |  |           _  | |  |  | |
  | |  |       _  | | | |  |  | |
  | |  |   _  | | | | | |  |  | |
  | |  |  | | | | | | | |  |  | |
  1 8  6  2  5  4  8  3  7
  ^                       ^
  L                       R

Area = min(height[L], height[R]) * (R - L) = min(1, 7) * (8 - 0) = 1 * 8 = 8
max_area = 8
```

**Iteration 1:**
`height[L]` (1) < `height[R]` (7). Move `L` to `L+1`.
`left = 1` (points to height 8)
`right = 8` (points to height 7)

```
       8                   8
       |                   |
       |                   |   _
       |                   |  | |
       |               _   |  | |
       |           _  | |  |  | |
       |       _  | | | |  |  | |
       |   _  | | | | | |  |  | |
       8  6  2  5  4  8  3  7
       ^                 ^
       L                 R

Area = min(height[L], height[R]) * (R - L) = min(8, 7) * (8 - 1) = 7 * 7 = 49
max_area = 49
```

**Iteration 2:**
`height[L]` (8) > `height[R]` (7). Move `R` to `R-1`.
`left = 1` (points to height 8)
`right = 7` (points to height 3)

```
       8
       |
       |
       |                   _
       |               _  | |
       |           _  | | | |
       |       _  | | | | | |
       |   _  | | | | | | | |
       8  6  2  5  4  8  3
       ^                 ^
       L                 R

Area = min(8, 3) * (7 - 1) = 3 * 6 = 18
max_area` remains `49`.
```
... and so on, until `L` crosses `R`.

---

## Problem 2: Product of Array Except Self (Optimal O(1) Space)

`nums = [1, 2, 3, 4]`

**Step 1: Initialize `answer` array and calculate Prefix Products**
`answer = [1, 1, 1, 1]`

   `i = 0`: `answer[0]` is already 1.
   `i = 1`: `answer[1] = answer[0] * nums[0] = 1 * 1 = 1`
   `answer = [1, 1, 1, 1]`
   `i = 2`: `answer[2] = answer[1] * nums[1] = 1 * 2 = 2`
   `answer = [1, 1, 2, 1]`
   `i = 3`: `answer[3] = answer[2] * nums[2] = 2 * 3 = 6`
   `answer = [1, 1, 2, 6]`

After Pass 1 (`answer` holds prefix products):
`answer = [1, 1, 2, 6]`  (products to the left of each index)
            ^  ^  ^  ^
            1  2  3  4 (original `nums`)

**Step 2: Calculate Suffix Products on the fly and combine**
`right_product = 1`

   `i = 3`:
     `answer[3] = answer[3] * right_product = 6 * 1 = 6`
     `right_product = right_product * nums[3] = 1 * 4 = 4`
     `answer = [1, 1, 2, 6]`
   `i = 2`:
     `answer[2] = answer[2] * right_product = 2 * 4 = 8`
     `right_product = right_product * nums[2] = 4 * 3 = 12`
     `answer = [1, 1, 8, 6]`
   `i = 1`:
     `answer[1] = answer[1] * right_product = 1 * 12 = 12`
     `right_product = right_product * nums[1] = 12 * 2 = 24`
     `answer = [1, 12, 8, 6]`
   `i = 0`:
     `answer[0] = answer[0] * right_product = 1 * 24 = 24`
     `right_product = right_product * nums[0] = 24 * 1 = 24`
     `answer = [24, 12, 8, 6]`

Final `answer = [24, 12, 8, 6]`

---

## Problem 3: Rotate Image (Matrix) (Transpose & Reverse)

`matrix = [[1,2,3],[4,5,6],[7,8,9]]`

**Original Matrix:**
```
[ 1, 2, 3 ]
[ 4, 5, 6 ]
[ 7, 8, 9 ]
```

**Step 1: Transpose (swap `matrix[r][c]` with `matrix[c][r]` for `c > r`)**

   `(0,1) <=> (1,0)`: `2` and `4` swap
   `(0,2) <=> (2,0)`: `3` and `7` swap
   `(1,2) <=> (2,1)`: `6` and `8` swap

   Matrix after Transpose:
   ```
   [ 1, 4, 7 ]
   [ 2, 5, 8 ]
   [ 3, 6, 9 ]
   ```

**Step 2: Reverse each row**

   Row 0: `[1, 4, 7]` becomes `[7, 4, 1]`
   Row 1: `[2, 5, 8]` becomes `[8, 5, 2]`
   Row 2: `[3, 6, 9]` becomes `[9, 6, 3]`

   Matrix after Reversing Rows:
   ```
   [ 7, 4, 1 ]
   [ 8, 5, 2 ]
   [ 9, 6, 3 ]
   ```
This is the 90-degree clockwise rotated matrix.

---

## Problem 4: Meeting Rooms II (Sorting + Min-Heap)

`intervals = [[0,30],[5,10],[15,20]]`

**1. Sort by Start Times:**
`[[0,30], [5,10], [15,20]]`

**2. Initialize Min-Heap:** `rooms = []`

**3. Process Intervals:**

   **Interval 1: [0, 30]**
   - Heap is empty.
   - Push `30` (end time) to heap.
   - `rooms = [30]`
   - Current rooms needed: `len(rooms) = 1`

   Timeline:
   ```
   0  5 10  15 20           30
   |--M1--------------------|
   ```
   Heap (end times): `[30]`

   **Interval 2: [5, 10]**
   - Current meeting start: `5`
   - Earliest ending meeting in heap: `rooms[0] = 30`
   - `5 < 30`, so no room is free.
   - Push `10` (end time) to heap.
   - `rooms = [10, 30]` (heap after push, min-heap property)
   - Current rooms needed: `len(rooms) = 2`

   Timeline:
   ```
   0  5 10  15 20           30
   |--M1--------------------|
      |--M2--|
   ```
   Heap (end times): `[10, 30]`

   **Interval 3: [15, 20]**
   - Current meeting start: `15`
   - Earliest ending meeting in heap: `rooms[0] = 10`
   - `15 >= 10`, so the room ending at `10` is now free.
   - Pop `10` from heap. `rooms = [30]`
   - Push `20` (end time) to heap.
   - `rooms = [20, 30]` (heap after push, min-heap property)
   - Current rooms needed: `len(rooms) = 2`

   Timeline:
   ```
   0  5 10  15 20           30
   |--M1--------------------|
      [M2 ends]  |--M3--|
   ```
   Heap (end times): `[20, 30]`

**Result:** All intervals processed. The final size of the heap is `2`.
Minimum rooms required = `2`.

---