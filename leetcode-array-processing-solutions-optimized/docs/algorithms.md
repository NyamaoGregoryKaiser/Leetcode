# Array Manipulation Algorithms: Detailed Explanations

This document provides in-depth explanations for the algorithms implemented in the Array Manipulation project. Each problem discusses the core logic, time/space complexity, and illustrates concepts with ASCII diagrams.

---

## 1. Rotate Array

**Problem:** Given an integer array `nums`, rotate the array to the right by `k` steps.

### Approach 1: Using a Temporary Array

**Logic:**
The simplest idea is to create a new array and place each element of the original array into its correct new position. If an element is at index `i` in the original array, its new position after `k` right rotations will be `(i + k) % n`, where `n` is the size of the array. After filling the new array, copy its contents back to the original array.

**Time Complexity:** O(N) because we iterate through the array twice (once to fill the temp array, once to copy back).
**Space Complexity:** O(N) for the temporary array.

**Visual Example (nums = [1,2,3,4,5,6,7], k = 3):**

Original Array:
```
Index: 0 1 2 3 4 5 6
Value: 1 2 3 4 5 6 7
```

Temporary Array (initialized empty):
```
Index: 0 1 2 3 4 5 6
Value: _ _ _ _ _ _ _
```

Mapping:
- `nums[0]` (1) moves to `(0+3)%7 = 3`
- `nums[1]` (2) moves to `(1+3)%7 = 4`
- `nums[2]` (3) moves to `(2+3)%7 = 5`
- `nums[3]` (4) moves to `(3+3)%7 = 6`
- `nums[4]` (5) moves to `(4+3)%7 = 0`
- `nums[5]` (6) moves to `(5+3)%7 = 1`
- `nums[6]` (7) moves to `(6+3)%7 = 2`

After filling `temp`:
```
Index: 0 1 2 3 4 5 6
Value: 5 6 7 1 2 3 4
```
Copy `temp` back to `nums`.

---

### Approach 2: Reversal Technique (Optimal)

**Logic:**
This in-place approach is quite clever and widely used. It leverages the property that reversing a segment of an array can help achieve rotation.
The steps are:
1.  Reverse the entire array.
2.  Reverse the first `k` elements.
3.  Reverse the remaining `n-k` elements.

Remember to normalize `k` by `k = k % n` first, as `k` can be larger than `n`.

**Time Complexity:** O(N) because we perform three reversals, each taking O(N) time.
**Space Complexity:** O(1) as the operation is performed in-place.

**Visual Example (nums = [1,2,3,4,5,6,7], k = 3):**

Original:
```
[1, 2, 3, 4, 5, 6, 7]
```

1.  Reverse all elements (`0` to `n-1`):
    ```
    [7, 6, 5, 4, 3, 2, 1]
    ```

2.  Reverse first `k` (3) elements (`0` to `k-1`):
    ```
    [5, 6, 7, 4, 3, 2, 1]
     ^--^--^
    ```

3.  Reverse remaining `n-k` (4) elements (`k` to `n-1`):
    ```
    [5, 6, 7, 1, 2, 3, 4]
              ^--^--^--^
    ```
This is the desired rotated array.

---

### Approach 3: Juggling Cycle Algorithm (Optimal)

**Logic:**
This is an advanced in-place approach. It works by moving elements in cycles. For an array of size `n` and rotation `k`, there are `gcd(n, k)` cycles. `gcd` is the greatest common divisor. In each cycle, an element is picked, moved to its new position, the element that was there is moved to its new position, and so on, until the cycle returns to the starting point.

The number of elements to process in total is `n`. Each element is moved exactly once.
The elements at `index i` should go to `(i + k) % n`.
Instead of directly moving elements to `(i+k)%n`, we pick `nums[i]`, then put `nums[(i-k+n)%n]` into `nums[i]`, and so on, until the original `nums[i]` finds its spot.

**Time Complexity:** O(N) because each element is visited and moved exactly once.
**Space Complexity:** O(1) as the operation is performed in-place.

**Visual Example (nums = [1,2,3,4,5,6,7], k = 3, n = 7):**

`gcd(7, 3) = 1`, so there's one cycle starting at index 0.

Original: `[1, 2, 3, 4, 5, 6, 7]`

1.  Start `i = 0`. `prev_val = nums[0] = 1`. `current_idx = 0`.
2.  `next_idx = (current_idx + k) % n = (0+3)%7 = 3`.
    `temp = nums[3] = 4`. `nums[3] = prev_val (1)`. Array: `[1,2,3,1,5,6,7]`
    `prev_val = temp (4)`. `current_idx = 3`.
3.  `next_idx = (3+3)%7 = 6`.
    `temp = nums[6] = 7`. `nums[6] = prev_val (4)`. Array: `[1,2,3,1,5,6,4]`
    `prev_val = temp (7)`. `current_idx = 6`.
4.  `next_idx = (6+3)%7 = 2`.
    `temp = nums[2] = 3`. `nums[2] = prev_val (7)`. Array: `[1,2,7,1,5,6,4]`
    `prev_val = temp (3)`. `current_idx = 2`.
5.  `next_idx = (2+3)%7 = 5`.
    `temp = nums[5] = 6`. `nums[5] = prev_val (3)`. Array: `[1,2,7,1,5,3,4]`
    `prev_val = temp (6)`. `current_idx = 5`.
6.  `next_idx = (5+3)%7 = 1`.
    `temp = nums[1] = 2`. `nums[1] = prev_val (6)`. Array: `[1,6,7,1,5,3,4]`
    `prev_val = temp (2)`. `current_idx = 1`.
7.  `next_idx = (1+3)%7 = 4`.
    `temp = nums[4] = 5`. `nums[4] = prev_val (2)`. Array: `[1,6,7,1,2,3,4]`
    `prev_val = temp (5)`. `current_idx = 4`.
8.  `next_idx = (4+3)%7 = 0`. This is our `start` index.
    `nums[0] = prev_val (5)`. Array: `[5,6,7,1,2,3,4]`
    `current_idx = 0`. Cycle ends.

Result: `[5,6,7,1,2,3,4]`

---

## 2. Product of Array Except Self

**Problem:** Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Must run in `O(N)` time and without division.

### Approach 1: Two-Pass (Prefix and Suffix Products)

**Logic:**
For each element `nums[i]`, its product except self is `(product of elements to its left) * (product of elements to its right)`.
We can calculate these two parts separately:
1.  **Prefix Products Pass (Left to Right):** Create an `answer` array. `answer[i]` will store the product of all elements to the *left* of `nums[i]`.
    *   Initialize `answer[0] = 1` (no elements to the left of the first element).
    *   For `i` from 1 to `n-1`, `answer[i] = nums[i-1] * answer[i-1]`.
    After this pass, `answer[i]` holds `product(nums[0]...nums[i-1])`.

2.  **Suffix Products Pass (Right to Left):** Iterate from right to left. Maintain a `right_product` variable, initially 1.
    *   For each `i` from `n-1` down to `0`:
        *   Multiply `answer[i]` (which currently holds the prefix product) by `right_product`. This combines left and right products.
        *   Update `right_product = right_product * nums[i]`. This prepares `right_product` for the next element to its left.

**Time Complexity:** O(N) because we iterate through the array twice.
**Space Complexity:** O(1) auxiliary space, considering the output array doesn't count towards extra space (as is typical for this problem). If it counts, then O(N).

**Visual Example (nums = [1,2,3,4]):**

Original:
```
nums:   [1,   2,   3,   4]
Index:   0    1    2    3
```

**Pass 1: Prefix Products (Left to Right)**
`answer` array initialized to `[_, _, _, _]`
`left_product` starts at `1`

| i | `nums[i]` | `left_product` (before update) | `answer[i]` = `left_product` | `left_product` (after update) = `left_product * nums[i]` | `answer` array after step |
|---|----------|--------------------------------|-------------------------------|----------------------------------------------------------|---------------------------|
| 0 | 1        | 1                              | `answer[0] = 1`               | `1 * 1 = 1`                                              | `[1, _, _, _]`            |
| 1 | 2        | 1                              | `answer[1] = 1`               | `1 * 2 = 2`                                              | `[1, 1, _, _]`            |
| 2 | 3        | 2                              | `answer[2] = 2`               | `2 * 3 = 6`                                              | `[1, 1, 2, _]`            |
| 3 | 4        | 6                              | `answer[3] = 6`               | `6 * 4 = 24`                                             | `[1, 1, 2, 6]`            |

After Pass 1: `answer = [1, 1, 2, 6]`
(`answer[i]` now holds `product(nums[0...i-1])`)

**Pass 2: Suffix Products (Right to Left) and Final Result**
`right_product` starts at `1`

| i | `nums[i]` | `right_product` (before update) | `answer[i]` = `answer[i] * right_product` | `right_product` (after update) = `right_product * nums[i]` | `answer` array after step |
|---|----------|---------------------------------|--------------------------------------------|-----------------------------------------------------------|---------------------------|
| 3 | 4        | 1                               | `answer[3] = 6 * 1 = 6`                    | `1 * 4 = 4`                                               | `[1, 1, 2, 6]`            |
| 2 | 3        | 4                               | `answer[2] = 2 * 4 = 8`                    | `4 * 3 = 12`                                              | `[1, 1, 8, 6]`            |
| 1 | 2        | 12                              | `answer[1] = 1 * 12 = 12`                  | `12 * 2 = 24`                                             | `[1, 12, 8, 6]`           |
| 0 | 1        | 24                              | `answer[0] = 1 * 24 = 24`                  | `24 * 1 = 24`                                             | `[24, 12, 8, 6]`          |

Final Result: `[24, 12, 8, 6]`

---

## 3. Merge Intervals

**Problem:** Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals.

### Approach 1: Sort and Merge (Optimal)

**Logic:**
The key insight here is that if we sort the intervals by their start times, then any overlapping intervals must be adjacent in the sorted list (or contain each other). This simplifies the merging process.

1.  **Sort Intervals:** Sort the input `intervals` array based on the start time of each interval.
2.  **Initialize Merged List:** Create a `merged_intervals` list and add the first interval from the sorted list to it.
3.  **Iterate and Merge:** Go through the rest of the sorted intervals:
    *   For each `current_interval`, compare it with the `last_merged_interval` (which is the last interval added to `merged_intervals`).
    *   **If overlap:** If `current_interval.start <= last_merged_interval.end`, it means there's an overlap. Merge them by updating `last_merged_interval.end = max(last_merged_interval.end, current_interval.end)`.
    *   **If no overlap:** If `current_interval.start > last_merged_interval.end`, they don't overlap. Add `current_interval` as a new distinct interval to `merged_intervals`.

**Time Complexity:** O(N log N) primarily due to the sorting step. The iteration and merging take O(N).
**Space Complexity:** O(N) for storing the `merged_intervals`. In the worst case (no overlaps), this could be `N` intervals.

**Visual Example (intervals = [[1,3],[2,6],[8,10],[15,18]]):**

Original (already sorted by start time):
```
Intervals: [[1,3], [2,6], [8,10], [15,18]]
```

1.  Initialize `merged_intervals`:
    `merged_intervals = [[1,3]]` (add first interval)

2.  Process `[2,6]`:
    *   `last_merged = [1,3]`
    *   `current = [2,6]`
    *   Overlap check: `2 <= 3` (True).
    *   Merge: `last_merged[1] = max(3, 6) = 6`.
    *   `merged_intervals` becomes `[[1,6]]`

3.  Process `[8,10]`:
    *   `last_merged = [1,6]`
    *   `current = [8,10]`
    *   Overlap check: `8 <= 6` (False). No overlap.
    *   Add `current` to `merged_intervals`.
    *   `merged_intervals` becomes `[[1,6], [8,10]]`

4.  Process `[15,18]`:
    *   `last_merged = [8,10]`
    *   `current = [15,18]`
    *   Overlap check: `15 <= 10` (False). No overlap.
    *   Add `current` to `merged_intervals`.
    *   `merged_intervals` becomes `[[1,6], [8,10], [15,18]]`

All intervals processed.

Final Result: `[[1,6],[8,10],[15,18]]`

---

## 4. Trapping Rain Water

**Problem:** Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.

### Approach 1: Two Pointers (Optimal)

**Logic:**
This method calculates trapped water by processing from both ends of the array inwards. The key idea is that the amount of water trapped at a certain position `i` depends on the maximum height of bars to its left and right: `min(max_left_so_far, max_right_so_far) - height[i]`.

We maintain two pointers, `left` and `right`, starting at the ends of the array. We also keep track of `max_left` (the highest bar encountered from the left) and `max_right` (the highest bar encountered from the right).

The crucial insight:
*   If `height[left] <= height[right]`, it implies that the water level at `left` is determined by `max_left`. Even if `max_right` is much larger, the `height[left]` bar serves as a "bottleneck" because we are guaranteed to have a wall at `height[right]` (or something taller) on the right side. So, we can safely calculate water trapped at `left`.
*   Similarly, if `height[left] > height[right]`, the water level at `right` is determined by `max_right`.

**Algorithm:**
1.  Initialize `left = 0`, `right = n - 1`.
2.  Initialize `max_left = 0`, `max_right = 0`.
3.  Initialize `trapped_water = 0`.
4.  While `left <= right`:
    *   If `height[left] <= height[right]`:
        *   If `height[left] >= max_left`, update `max_left = height[left]` (no water trapped at `left` as it's a new max boundary).
        *   Else, `trapped_water += max_left - height[left]` (water trapped).
        *   Increment `left`.
    *   Else (`height[left] > height[right]`):
        *   If `height[right] >= max_right`, update `max_right = height[right]` (no water trapped at `right`).
        *   Else, `trapped_water += max_right - height[right]` (water trapped).
        *   Decrement `right`.
5.  Return `trapped_water`.

**Time Complexity:** O(N) because the two pointers traverse the array once.
**Space Complexity:** O(1) as only a few variables are used.

**Visual Example (height = [0,1,0,2,1,0,1,3,2,1,2,1]):**

Original Heights:
```
Index:    0 1 2 3 4 5 6 7 8 9 10 11
Heights: [0,1,0,2,1,0,1,3,2,1, 2, 1]
```
`n = 12`
`left = 0`, `right = 11`
`max_left = 0`, `max_right = 0`
`trapped_water = 0`

| Step | `left` | `right` | `h[left]` | `h[right]` | `max_left` | `max_right` | Condition (`h[l] <= h[r]`) | Action | `trapped_water` |
|------|--------|---------|-----------|------------|------------|-------------|-----------------------------|--------|-----------------|
| 1    | 0      | 11      | 0         | 1          | 0          | 0           | True                        | `h[0]>=max_l`. `max_l=0`. `l++` | 0               |
| 2    | 1      | 11      | 1         | 1          | 0          | 0           | True                        | `h[1]>=max_l`. `max_l=1`. `l++` | 0               |
| 3    | 2      | 11      | 0         | 1          | 1          | 0           | True                        | `h[2]<max_l`. `water+=1-0=1`. `l++` | 1               |
| 4    | 3      | 11      | 2         | 1          | 1          | 0           | False                       | `h[11]>=max_r`. `max_r=1`. `r--` | 1               |
| 5    | 3      | 10      | 2         | 2          | 1          | 1           | True                        | `h[3]>=max_l`. `max_l=2`. `l++` | 1               |
| 6    | 4      | 10      | 1         | 2          | 2          | 1           | True                        | `h[4]<max_l`. `water+=2-1=1`. `l++` | 2               |
| 7    | 5      | 10      | 0         | 2          | 2          | 1           | True                        | `h[5]<max_l`. `water+=2-0=2`. `l++` | 4               |
| 8    | 6      | 10      | 1         | 2          | 2          | 1           | True                        | `h[6]<max_l`. `water+=2-1=1`. `l++` | 5               |
| 9    | 7      | 10      | 3         | 2          | 2          | 1           | False                       | `h[10]>=max_r`. `max_r=2`. `r--` | 5               |
| 10   | 7      | 9       | 3         | 1          | 2          | 2           | False                       | `h[9]<max_r`. `water+=2-1=1`. `r--` | 6               |
| 11   | 7      | 8       | 3         | 2          | 2          | 2           | False                       | `h[8]>=max_r`. `max_r=2`. `r--` | 6               |
| 12   | 7      | 7       | 3         | 3          | 2          | 2           | True                        | `h[7]>=max_l`. `max_l=3`. `l++` | 6               |
| 13   | 8      | 7       | -         | -          | 3          | 2           | Loop ends (`left > right`)  | -      | 6               |

Final `trapped_water = 6`.

---

### Approach 2: Using a Stack

**Logic:**
This approach uses a monotonic stack to find the boundaries for each "valley" that can trap water. The stack stores indices of bars, maintaining a decreasing order of heights.

When we encounter a bar `height[i]`:
1.  **Pop:** While the stack is not empty AND `height[i]` is taller than the bar at `stack.top()`, pop `stack.top()`. This popped bar is a "bottom" of a potential valley.
2.  **Calculate Water:** If the stack is not empty after popping (meaning there's a left boundary), we can calculate the water trapped:
    *   `popped_idx` = the index of the bar just popped.
    *   `left_boundary_idx` = `stack.top()`.
    *   `distance` = `i - left_boundary_idx - 1` (width between boundaries).
    *   `bounded_height` = `min(height[i], height[left_boundary_idx]) - height[popped_idx]`.
    *   Add `distance * bounded_height` to `trapped_water`.
3.  **Push:** Push `i` onto the stack.

**Time Complexity:** O(N) because each element is pushed onto and popped from the stack at most once.
**Space Complexity:** O(N) in the worst case (e.g., `[5,4,3,2,1]`), where all elements might be pushed onto the stack.

**Visual Example (height = [0,1,0,2,1,0,1,3,2,1,2,1]):**

Original Heights:
```
Index:    0 1 2 3 4 5 6 7 8 9 10 11
Heights: [0,1,0,2,1,0,1,3,2,1, 2, 1]
```
`stack = []`, `trapped_water = 0`

| i | `h[i]` | Stack (before push) | Action                                                                                                                                                                                                                                                                                                                           | `trapped_water` |
|---|--------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| 0 | 0      | `[]`                | Push 0                                                                                                                                                                                                                                                                                                                           | 0               |
| 1 | 1      | `[0]`               | `h[1]>h[0]`. Pop 0. Stack empty. Push 1.                                                                                                                                                                                                                                                                                         | 0               |
| 2 | 0      | `[1]`               | `h[2]<h[1]`. Push 2.                                                                                                                                                                                                                                                                                                             | 0               |
| 3 | 2      | `[1,2]`             | `h[3]>h[2]`. Pop 2 (`popped_h=0`). `Left=1`. `dist=3-1-1=1`. `b_h=min(h[3](2),h[1](1))-h[2](0)=1-0=1`. `water+=1*1=1`. Stack: `[1]`.<br>`h[3]>h[1]`. Pop 1 (`popped_h=1`). Stack empty. Break. Push 3.                                                                                                                   | 1               |
| 4 | 1      | `[3]`               | `h[4]<h[3]`. Push 4.                                                                                                                                                                                                                                                                                                             | 1               |
| 5 | 0      | `[3,4]`             | `h[5]<h[4]`. Push 5.                                                                                                                                                                                                                                                                                                             | 1               |
| 6 | 1      | `[3,4,5]`           | `h[6]>h[5]`. Pop 5 (`popped_h=0`). `Left=4`. `dist=6-4-1=1`. `b_h=min(h[6](1),h[4](1))-h[5](0)=1-0=1`. `water+=1*1=1`. Stack: `[3,4]`.<br>`h[6]==h[4]`. Loop condition false. Push 6.                                                                                                                                       | 2               |
| 7 | 3      | `[3,4,6]`           | `h[7]>h[6]`. Pop 6 (`popped_h=1`). `Left=4`. `dist=7-4-1=2`. `b_h=min(h[7](3),h[4](1))-h[6](1)=1-1=0`. `water+=2*0=0`. Stack: `[3,4]`.<br>`h[7]>h[4]`. Pop 4 (`popped_h=1`). `Left=3`. `dist=7-3-1=3`. `b_h=min(h[7](3),h[3](2))-h[4](1)=2-1=1`. `water+=3*1=3`. Stack: `[3]`.<br>`h[7]>h[3]`. Pop 3 (`popped_h=2`). Stack empty. Break. Push 7. | 5               |
| 8 | 2      | `[7]`               | `h[8]<h[7]`. Push 8.                                                                                                                                                                                                                                                                                                             | 5               |
| 9 | 1      | `[7,8]`             | `h[9]<h[8]`. Push 9.                                                                                                                                                                                                                                                                                                             | 5               |
| 10| 2      | `[7,8,9]`           | `h[10]>h[9]`. Pop 9 (`popped_h=1`). `Left=8`. `dist=10-8-1=1`. `b_h=min(h[10](2),h[8](2))-h[9](1)=1`. `water+=1*1=1`. Stack: `[7,8]`.<br>`h[10]==h[8]`. Loop condition false. Push 10.                                                                                                                                   | 6               |
| 11| 1      | `[7,8,10]`          | `h[11]<h[10]`. Push 11.                                                                                                                                                                                                                                                                                                          | 6               |

Loop ends. Final `trapped_water = 6`.

---