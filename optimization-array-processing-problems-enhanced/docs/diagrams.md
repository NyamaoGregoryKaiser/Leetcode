```markdown
# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the steps and concepts for some of the array manipulation algorithms.

---

## Problem 1: Rotate Array (Reversal Algorithm)

**Scenario:** `nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`

**1. Initial Array:**
```
+---+---+---+---+---+---+---+
| 1 | 2 | 3 | 4 | 5 | 6 | 7 |
+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6
```

**2. Reverse the entire array:** (from index 0 to n-1)
`[1, 2, 3, 4, 5, 6, 7]` becomes `[7, 6, 5, 4, 3, 2, 1]`
```
+---+---+---+---+---+---+---+
| 7 | 6 | 5 | 4 | 3 | 2 | 1 |
+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6
```

**3. Reverse the first `k` elements:** (from index 0 to k-1)
`k=3`, so reverse `[7, 6, 5]`
`[7, 6, 5, 4, 3, 2, 1]` becomes `[5, 6, 7, 4, 3, 2, 1]`
```
      <-Reversed->
+---+---+---+---+---+---+---+
| 5 | 6 | 7 | 4 | 3 | 2 | 1 |
+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6
```

**4. Reverse the remaining `n-k` elements:** (from index k to n-1)
`n-k = 7-3 = 4`, so reverse `[4, 3, 2, 1]`
`[5, 6, 7, 4, 3, 2, 1]` becomes `[5, 6, 7, 1, 2, 3, 4]`
```
                <-Reversed->
+---+---+---+---+---+---+---+
| 5 | 6 | 7 | 1 | 2 | 3 | 4 |
+---+---+---+---+---+---+---+
  0   1   2   3   4   5   6
```
This is the correctly rotated array.

---

## Problem 2: Merge Intervals (Sort and Merge)

**Scenario:** `intervals = [[1,3],[8,10],[2,6],[15,18]]`

**1. Initial (Unsorted) Intervals:**
```
[1,3] ----
[2,6]   ------
[8,10]          ----
[15,18]               ----
```

**2. Sort Intervals by Start Time:**
`intervals` becomes `[[1,3],[2,6],[8,10],[15,18]]`
```
[1,3] ----
[2,6]   ------
[8,10]          ----
[15,18]               ----
```
(Looks the same here, but the order is crucial)

**3. Iterate and Merge:**

*   **Add `[1,3]` to `merged`**: `merged = [[1,3]]`
    ```
    Merged: [1,3] ----
    ```

*   **Process `[2,6]`**:
    *   Last merged: `[1,3]`
    *   `last.end (3) >= current.start (2)` -> **Overlap!**
    *   Merge: `[1, max(3,6)]` = `[1,6]`
    *   `merged` becomes `[[1,6]]`
    ```
    Merged: [1,6] --------
    ```

*   **Process `[8,10]`**:
    *   Last merged: `[1,6]`
    *   `last.end (6) < current.start (8)` -> **No Overlap.**
    *   Add `[8,10]`
    *   `merged` becomes `[[1,6], [8,10]]`
    ```
    Merged: [1,6] --------  [8,10]  ----
    ```

*   **Process `[15,18]`**:
    *   Last merged: `[8,10]`
    *   `last.end (10) < current.start (15)` -> **No Overlap.**
    *   Add `[15,18]`
    *   `merged` becomes `[[1,6], [8,10], [15,18]]`
    ```
    Merged: [1,6] --------  [8,10]  ----  [15,18]   ----
    ```

**Final Merged Intervals:** `[[1,6],[8,10],[15,18]]`

---

## Problem 4: Trapping Rain Water (Two Pointers)

**Scenario:** `height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`

Visualizing the elevation map:
`_` represents ground (height 0), `|` represents a bar.

```
Elevation Map:
       _|_ _ _ _|_ _ _ _
      | | | | | | | | | |
      | | | | | | | | | |
  _ _|_|_|_|_|_|_|_|_|_|_|_
Heights: 0 1 0 2 1 0 1 3 2 1 2 1
Indices: 0 1 2 3 4 5 6 7 8 9 10 11
```

**Two Pointers Walkthrough (simplified):**

Initial: `left=0`, `right=11`, `maxLeft=0`, `maxRight=0`, `water=0`

`heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
           `L`                                `R`
           `maxL=0`                           `maxR=0`

1.  `h[L]=0`, `h[R]=1`. `h[L] < h[R]`.
    `maxL` (0) is not less than `h[L]` (0). Update `maxL=0`. `L++`.
    `water=0`
    `heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
              `  L`                             `R`
              `maxL=0`                        `maxR=0`

2.  `h[L]=1`, `h[R]=1`. `h[L] >= h[R]`.
    `maxR` (0) is less than `h[R]` (1). Update `maxR=1`. `R--`.
    `water=0`
    `heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
              `  L`                         `R`
              `maxL=0`                      `maxR=1`

3.  `h[L]=1`, `h[R]=2`. `h[L] < h[R]`.
    `maxL` (0) is less than `h[L]` (1). Update `maxL=1`. `L++`.
    `water=0`
    `heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
              `    L`                       `R`
              `maxL=1`                    `maxR=1`

4.  `h[L]=0`, `h[R]=2`. `h[L] < h[R]`.
    `maxL` (1) is greater than `h[L]` (0). Water trapped: `maxL - h[L] = 1 - 0 = 1`. `water += 1`. `L++`.
    `water=1`
    `heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
              `      L`                     `R`
              `maxL=1`                    `maxR=1`

    Visual: `maxL` for index 2 is 1. `height[2]` is 0. Traps 1 unit.
    ```
    _|_
   | | |      (at index 2)
    ```

... continues until `L >= R`

Final state should yield `totalWater = 6`.

```
Visual of Trapped Water:
       _|_W_ _ _ _|_ _ _ _   (W = Water)
      | |W| | |W| | |W| | |
      | |W| | |W| | |W| | |
  _ _|_|_|_|_|_|_|_|_|_|_|_
Heights: 0 1 0 2 1 0 1 3 2 1 2 1
Indices: 0 1 2 3 4 5 6 7 8 9 10 11

Water at:
  Index 2: min(maxL=1, maxR=3) - h[2]=0  => 1 - 0 = 1
  Index 4: min(maxL=2, maxR=3) - h[4]=1  => 2 - 1 = 1
  Index 5: min(maxL=2, maxR=3) - h[5]=0  => 2 - 0 = 2
  Index 6: min(maxL=2, maxR=3) - h[6]=1  => 2 - 1 = 1
  Index 8: min(maxL=3, maxR=2) - h[8]=2  => 2 - 2 = 0
  Index 9: min(maxL=3, maxR=2) - h[9]=1  => 2 - 1 = 1
Total = 1 + 1 + 2 + 1 + 0 + 1 = 6
```
(Note: the specific indices where water is trapped might differ based on how you trace, but the total amount is what matters. The two-pointer logic handles this correctly by only calculating when a boundary is certain.)

---

## Problem 5: Find the Duplicate Number (Floyd's Tortoise and Hare)

**Scenario:** `nums = [1, 3, 4, 2, 2]`

Imagine the array elements as pointers to the next index.
`index i` points to `nums[i]`.

```
Indices:  0   1   2   3   4
Nums:    [1,  3,  4,  2,  2]

Mapping:
0 -> 1
1 -> 3
3 -> 2
2 -> 4
4 -> 2  <-- Cycle starts here (value 2 is pointed to by 3 and 4)
```

**Visualizing the "Linked List":**
```
      +-----+
      |     |
      v     |
0 --> 1 --> 3 --> 2 <-- 4
                  ^     |
                  +-----+
```
The cycle is `2 -> 4 -> 2`. The entry point of the cycle is `2`.

**Phase 1: Find Intersection Point**
*   `tortoise = nums[0] = 1`
*   `hare = nums[0] = 1`

Path:
```
Start:  tortoise=1, hare=1
Step 1: tortoise = nums[1] = 3
        hare     = nums[nums[1]] = nums[3] = 2
        (tortoise=3, hare=2)

Step 2: tortoise = nums[3] = 2
        hare     = nums[nums[2]] = nums[4] = 2
        (tortoise=2, hare=2) - They meet!
```
**Intersection Point: 2**

**Phase 2: Find Cycle Entrance**
*   `tortoise` resets to `nums[0] = 1`
*   `hare` stays at `2` (the intersection point)

Path:
```
Start:  tortoise=1, hare=2
Step 1: tortoise = nums[1] = 3
        hare     = nums[2] = 4
        (tortoise=3, hare=4)

Step 2: tortoise = nums[3] = 2
        hare     = nums[4] = 2
        (tortoise=2, hare=2) - They meet!
```
**Cycle Entrance: 2**

The value at the cycle entrance, `2`, is the duplicate number.

---
```