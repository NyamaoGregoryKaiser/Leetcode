# Algorithm Explanations

This document provides in-depth explanations for the array manipulation problems covered in this project. Each problem includes a clear description, multiple approaches, detailed logic, complexity analysis, visual diagrams, and common edge cases/gotchas.

---

## 1. Array Rotation

### Problem Description
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

**Example:**
`nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`
Output: `[5, 6, 7, 1, 2, 3, 4]`

### Approach 1: Brute Force (Iterative Shifting)

**Logic:**
Rotate the array one step at a time, `k` times. In each step, move the last element to the front and shift all other elements one position to the right.

**Step-by-step:**
1.  Take the last element.
2.  Shift all elements from `nums[0]` to `nums[n-2]` one position to the right.
3.  Place the taken last element at `nums[0]`.
4.  Repeat `k` times.

**Visual Diagram:**
```
Initial: [1, 2, 3, 4, 5, 6, 7], k=3

k=1:
  _ _ _ _ _ _ 7 (last element)
[1, 2, 3, 4, 5, 6] (shift right)
  _
[7, 1, 2, 3, 4, 5, 6]

k=2:
  _ _ _ _ _ _ 6 (last element)
[7, 1, 2, 3, 4, 5] (shift right)
  _
[6, 7, 1, 2, 3, 4, 5]

k=3:
  _ _ _ _ _ _ 5 (last element)
[6, 7, 1, 2, 3, 4] (shift right)
  _
[5, 6, 7, 1, 2, 3, 4] (Final)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N * k). In the worst case, `k` can be close to `N`, making it O(N^2).
*   **Space Complexity:** O(1) (in-place).

**Gotchas:**
*   `k` can be greater than `N`. Remember to use `k % N` to handle this.

### Approach 2: Using an Extra Array

**Logic:**
Create a new array and place each element at its new rotated position. Then copy the elements back to the original array.

**Step-by-step:**
1.  Calculate `k = k % N` (where `N` is array length) to handle redundant rotations.
2.  Create a temporary array `temp` of the same size.
3.  For each element `nums[i]`:
    *   Its new position will be `(i + k) % N`.
    *   Place `nums[i]` into `temp[(i + k) % N]`.
4.  Copy all elements from `temp` back to `nums`.

**Visual Diagram:**
```
Initial: [1, 2, 3, 4, 5, 6, 7], k=3, N=7
k_eff = 3 % 7 = 3

nums:   [1, 2, 3, 4, 5, 6, 7]
index:   0  1  2  3  4  5  6

temp:   [_, _, _, _, _, _, _]

i=0, nums[0]=1 -> new_idx=(0+3)%7 = 3. temp[3] = 1
i=1, nums[1]=2 -> new_idx=(1+3)%7 = 4. temp[4] = 2
i=2, nums[2]=3 -> new_idx=(2+3)%7 = 5. temp[5] = 3
i=3, nums[3]=4 -> new_idx=(3+3)%7 = 6. temp[6] = 4
i=4, nums[4]=5 -> new_idx=(4+3)%7 = 0. temp[0] = 5
i=5, nums[5]=6 -> new_idx=(5+3)%7 = 1. temp[1] = 6
i=6, nums[6]=7 -> new_idx=(6+3)%7 = 2. temp[2] = 7

temp:   [5, 6, 7, 1, 2, 3, 4] (after filling)

Copy temp to nums:
nums:   [5, 6, 7, 1, 2, 3, 4] (Final)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) because we iterate through the array twice (once to fill `temp`, once to copy back).
*   **Space Complexity:** O(N) for the temporary array.

### Approach 3: Reversal Algorithm (Optimal)

**Logic:**
This is an elegant in-place algorithm that uses three reversals.
1.  Reverse the entire array.
2.  Reverse the first `k` elements.
3.  Reverse the remaining `N-k` elements.

**Step-by-step:**
1.  Calculate `k = k % N`.
2.  Reverse the entire array `nums[0...N-1]`.
3.  Reverse the sub-array `nums[0...k-1]`.
4.  Reverse the sub-array `nums[k...N-1]`.

**Visual Diagram:**
```
Initial: [1, 2, 3, 4, 5, 6, 7], k=3, N=7
k_eff = 3 % 7 = 3

1. Reverse entire array:
   [7, 6, 5, 4, 3, 2, 1]

2. Reverse first k elements (0 to k-1 = 0 to 2):
   [5, 6, 7, 4, 3, 2, 1]

3. Reverse remaining N-k elements (k to N-1 = 3 to 6):
   [5, 6, 7, 1, 2, 3, 4] (Final)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) because we perform three reversals, each taking O(N) time.
*   **Space Complexity:** O(1) (in-place).

**Gotchas:**
*   Ensure `k` is normalized with `k % N`.
*   Handle edge cases like empty array or `k=0`.

---

## 2. Subarray Sum Equals K

### Problem Description
Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.

**Example:**
`nums = [1, 1, 1], k = 2`
Output: `2` (subarrays are `[1, 1]` from index 0-1 and `[1, 1]` from index 1-2)

### Approach 1: Brute Force

**Logic:**
Iterate through all possible continuous subarrays, calculate their sum, and check if it equals `k`.

**Step-by-step:**
1.  Initialize `count = 0`.
2.  Outer loop: `start` from `0` to `N-1`.
3.  Inner loop: `end` from `start` to `N-1`.
4.  Innermost logic: Calculate sum of `nums[start...end]`. If `sum == k`, increment `count`.

**Complexity Analysis:**
*   **Time Complexity:** O(N^3) if sum is recomputed for each subarray. Can be optimized to O(N^2) by accumulating sum in the inner loop.
    *   O(N^2) version:
        ```python
        for i in range(N):
            current_sum = 0
            for j in range(i, N):
                current_sum += nums[j]
                if current_sum == k:
                    count += 1
        ```
*   **Space Complexity:** O(1).

**Gotchas:**
*   Make sure to consider single-element subarrays.

### Approach 2: Using Prefix Sums and a Hash Map (Optimal)

**Logic:**
The sum of a subarray `nums[i...j]` can be expressed as `prefix_sum[j] - prefix_sum[i-1]`.
We are looking for `prefix_sum[j] - prefix_sum[i-1] == k`, which implies `prefix_sum[j] - k == prefix_sum[i-1]`.
We can iterate through the array, maintaining a running `current_prefix_sum`. For each `current_prefix_sum`, we check if `current_prefix_sum - k` has been seen before (i.e., if it exists as a previous `prefix_sum`). If it has, it means there's a subarray ending at the current index whose sum is `k`.

**Step-by-step:**
1.  Initialize `count = 0`, `current_sum = 0`.
2.  Initialize a hash map `prefix_sum_counts` with `{0: 1}`. This is crucial:
    *   `0: 1` means a prefix sum of 0 has occurred once (before the array starts). This handles cases where the subarray itself starts from index 0 and sums to `k`.
3.  Iterate through `num` in `nums`:
    *   Add `num` to `current_sum`.
    *   Check if `(current_sum - k)` exists in `prefix_sum_counts`. If it does, add its count to `count`. This signifies that we found `prefix_sum[j] - prefix_sum[i-1] = k`.
    *   Increment the count for `current_sum` in `prefix_sum_counts`. If `current_sum` is not present, initialize it to 0 before incrementing.

**Visual Diagram:**
```
nums = [1, 2, 3], k = 3

Initial: count=0, current_sum=0, prefix_sum_counts={0: 1}

i=0, num=1:
  current_sum = 0 + 1 = 1
  look for current_sum - k = 1 - 3 = -2. Not in prefix_sum_counts.
  prefix_sum_counts[1] += 1 -> {0: 1, 1: 1}

i=1, num=2:
  current_sum = 1 + 2 = 3
  look for current_sum - k = 3 - 3 = 0. In prefix_sum_counts, count is 1.
  count = 0 + 1 = 1 (Subarray [1, 2] sums to 3)
  prefix_sum_counts[3] += 1 -> {0: 1, 1: 1, 3: 1}

i=2, num=3:
  current_sum = 3 + 3 = 6
  look for current_sum - k = 6 - 3 = 3. In prefix_sum_counts, count is 1.
  count = 1 + 1 = 2 (Subarray [3] sums to 3)
  prefix_sum_counts[6] += 1 -> {0: 1, 1: 1, 3: 1, 6: 1}

Final count = 2
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) because we iterate through the array once. Hash map operations (insert, lookup) take O(1) on average.
*   **Space Complexity:** O(N) in the worst case, as the hash map could store up to N distinct prefix sums.

**Edge Cases and Gotchas:**
*   **`k=0`**: The logic handles this correctly, counting subarrays that sum to zero.
*   **Negative numbers**: Handled naturally by prefix sums.
*   **Initialization `prefix_sum_counts = {0: 1}`**: This is critical. If a `current_sum` itself equals `k`, then `current_sum - k = 0`. The initial `0:1` in the map ensures that such subarrays (starting from index 0) are counted.
*   **Large numbers**: Watch out for integer overflow in languages with fixed-size integers (Python handles large integers automatically).

---

## 3. Merge Intervals

### Problem Description
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example:**
`intervals = [[1,3],[2,6],[8,10],[15,18]]`
Output: `[[1,6],[8,10],[15,18]]`
Explanation: `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.

### Approach 1: Sort and Merge (Optimal)

**Logic:**
If intervals are sorted by their start times, then any overlapping intervals must be adjacent in the sorted list. We can iterate through the sorted intervals, merging them as we go.

**Step-by-step:**
1.  Handle edge cases: If the input list is empty or has only one interval, return it as is.
2.  **Sort** the `intervals` list based on their start times (the first element of each interval `[start, end]`).
3.  Initialize an empty list `merged` to store the results.
4.  Add the first interval from the sorted list to `merged`.
5.  Iterate through the rest of the sorted intervals, starting from the second one:
    *   Let `current_interval` be the interval from the sorted list.
    *   Let `last_merged_interval` be the last interval added to `merged`.
    *   **Check for overlap:** If `current_interval.start <= last_merged_interval.end`:
        *   Overlap exists. Merge them by updating `last_merged_interval.end = max(last_merged_interval.end, current_interval.end)`.
    *   **No overlap:** If `current_interval.start > last_merged_interval.end`:
        *   No overlap. Add `current_interval` to `merged`.
6.  Return `merged`.

**Visual Diagram:**
```
intervals = [[1,3],[8,10],[2,6],[15,18]]

1. Sort by start time:
   [[1,3], [2,6], [8,10], [15,18]]

2. Initialize merged = []
   Add [1,3] to merged: merged = [[1,3]]

3. Iterate:

   Current: [2,6]
   Last merged: [1,3]
   Overlap? 2 <= 3 (Yes)
   Merge: last_merged_interval[1] = max(3, 6) = 6
   merged = [[1,6]]

   Current: [8,10]
   Last merged: [1,6]
   Overlap? 8 <= 6 (No)
   Add [8,10] to merged: merged = [[1,6], [8,10]]

   Current: [15,18]
   Last merged: [8,10]
   Overlap? 15 <= 10 (No)
   Add [15,18] to merged: merged = [[1,6], [8,10], [15,18]]

Final merged: [[1,6], [8,10], [15,18]]
```

**Complexity Analysis:**
*   **Time Complexity:** O(N log N) dominated by the sorting step. The merging pass takes O(N) time.
*   **Space Complexity:** O(N) for storing the sorted intervals (if a new list is created for sorting, or in Python `list.sort()` is in-place) and O(N) for the `merged` list in the worst case (e.g., no overlaps).

**Edge Cases and Gotchas:**
*   **Empty input:** Return `[]`.
*   **Single interval:** Return the interval itself.
*   **All intervals merge into one:** e.g., `[[1,10],[2,3],[4,5]]` -> `[[1,10]]`. Handled correctly.
*   **No overlaps:** e.g., `[[1,2],[3,4],[5,6]]` -> `[[1,2],[3,4],[5,6]]`. Handled correctly.
*   **Intervals touching but not overlapping:** `[[1,2],[2,3]]` -> `[[1,3]]`. The condition `current_interval.start <= last_merged_interval.end` handles this as `2 <= 2` is true.

---

## 4. Trapping Rain Water

### Problem Description
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:**
`height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Output: `6`

**Visual Diagram of Example:**
```
Elevation Map:
_   _ _   _
_|_|_|_|_|_|_ _
| | | | | | | | | | | |
| |X| |X|X|X|X| | | | |  (X denotes trapped water)
+-+-+-+-+-+-+-+-+-+-+-+-+
0 1 0 2 1 0 1 3 2 1 2 1  <- height
```
Water trapped:
(at index 2) `min(left_max=1, right_max=3) - height[2]=0` => `1 - 0 = 1`
(at index 5) `min(left_max=2, right_max=3) - height[5]=0` => `2 - 0 = 2`
(at index 6) `min(left_max=2, right_max=3) - height[6]=1` => `2 - 1 = 1`
(at index 9) `min(left_max=3, right_max=2) - height[9]=1` => `2 - 1 = 1`
(at index 10) `min(left_max=3, right_max=2) - height[10]=2` => `2 - 2 = 0` (no water)
Total = 1 + 2 + 1 + 1 = 5. (Wait, example output is 6. Let's re-verify logic for index 1, 2, 3...)

Let's trace it carefully for the example: `[0,1,0,2,1,0,1,3,2,1,2,1]`
- The amount of water trapped at an index `i` is `max(0, min(left_max[i], right_max[i]) - height[i])`.

`left_max` array: `[0,0,1,1,2,2,2,2,3,3,3,3]` (max height to the left, *excluding* current)
`right_max` array: `[3,3,3,3,3,3,3,2,2,2,1,0]` (max height to the right, *excluding* current)

Index | height | left_max | right_max | min(l_m, r_m) | water = max(0, min - h)
------|--------|----------|-----------|---------------|-----------------------
0     | 0      | 0        | 3         | 0             | 0
1     | 1      | 0        | 3         | 0             | 0 (min is 0, height is 1)
2     | 0      | 1        | 3         | 1             | 1 (min is 1, height is 0)
3     | 2      | 1        | 3         | 1             | 0 (min is 1, height is 2. `1-2=-1`)
4     | 1      | 2        | 3         | 2             | 1 (min is 2, height is 1)
5     | 0      | 2        | 3         | 2             | 2 (min is 2, height is 0)
6     | 1      | 2        | 3         | 2             | 1 (min is 2, height is 1)
7     | 3      | 2        | 2         | 2             | 0 (min is 2, height is 3. `2-3=-1`)
8     | 2      | 3        | 2         | 2             | 0 (min is 2, height is 2)
9     | 1      | 3        | 2         | 2             | 1 (min is 2, height is 1)
10    | 2      | 3        | 1         | 1             | 0 (min is 1, height is 2. `1-2=-1`)
11    | 1      | 3        | 0         | 0             | 0 (min is 0, height is 1. `0-1=-1`)

Total trapped water = 0+0+1+0+1+2+1+0+0+1+0+0 = **6**. Okay, example is correct, my tracing was initially faulty.

### Approach 1: Brute Force (Iterate and find left/right max for each bar)

**Logic:**
For each bar, find the maximum height of a bar to its left and the maximum height of a bar to its right. The amount of water it can trap is `min(left_max, right_max) - height[i]`, but only if this value is positive. Sum up these amounts.

**Step-by-step:**
1.  Initialize `total_water = 0`.
2.  Iterate `i` from `0` to `N-1` (excluding the first and last bar, as they can't trap water, or just handle `min(left_max, right_max)` carefully).
3.  For each `i`:
    *   Find `left_max`: the maximum height in `height[0...i]`.
    *   Find `right_max`: the maximum height in `height[i...N-1]`.
    *   `water_at_i = min(left_max, right_max) - height[i]`.
    *   If `water_at_i > 0`, add it to `total_water`.

**Complexity Analysis:**
*   **Time Complexity:** O(N^2) because for each of the N elements, we iterate left and right to find max heights.
*   **Space Complexity:** O(1).

**Gotchas:**
*   A bar itself can be the `left_max` or `right_max`.
*   The water trapped at a position `i` is `max(0, min(left_max_i, right_max_i) - height[i])`. This `max(0, ...)` is important because if the current bar is higher than `min(left_max, right_max)`, it can't trap water.

### Approach 2: Dynamic Programming (Precompute Left and Right Max Arrays)

**Logic:**
Instead of recomputing `left_max` and `right_max` for each `i`, we can precompute these for all `i` in two passes.

**Step-by-step:**
1.  Handle edge cases: If `N < 3`, no water can be trapped, return `0`.
2.  Create `left_max` array of size `N`.
3.  Create `right_max` array of size `N`.
4.  **Populate `left_max`**:
    *   `left_max[0] = height[0]`
    *   For `i` from `1` to `N-1`: `left_max[i] = max(left_max[i-1], height[i])`.
5.  **Populate `right_max`**:
    *   `right_max[N-1] = height[N-1]`
    *   For `i` from `N-2` down to `0`: `right_max[i] = max(right_max[i+1], height[i])`.
6.  Initialize `total_water = 0`.
7.  Iterate `i` from `0` to `N-1`:
    *   `total_water += min(left_max[i], right_max[i]) - height[i]`. (No `max(0,...)` needed here because `left_max[i]` and `right_max[i]` include `height[i]`, so `min(left_max[i], right_max[i])` will always be at least `height[i]`). Wait, this is slightly incorrect. `left_max[i]` should be max to the *left* of i, not including i. Let's fix.

Corrected logic for `left_max`/`right_max` precomputation and summation:
1.  Initialize `total_water = 0`.
2.  If `N < 3`, return `0`.
3.  Create `left_max_arr` of size `N`, `right_max_arr` of size `N`.
4.  **Populate `left_max_arr`**: Stores the maximum height encountered **from the left up to `i` (inclusive)**.
    *   `left_max_arr[0] = height[0]`
    *   For `i` from `1` to `N-1`: `left_max_arr[i] = max(left_max_arr[i-1], height[i])`.
5.  **Populate `right_max_arr`**: Stores the maximum height encountered **from the right up to `i` (inclusive)**.
    *   `right_max_arr[N-1] = height[N-1]`
    *   For `i` from `N-2` down to `0`: `right_max_arr[i] = max(right_max_arr[i+1], height[i])`.
6.  Iterate `i` from `0` to `N-1`:
    *   The water trapped *above* `height[i]` is `min(left_max_arr[i], right_max_arr[i]) - height[i]`.
    *   Add this amount to `total_water`.

**Complexity Analysis:**
*   **Time Complexity:** O(N) for three passes (one for `left_max`, one for `right_max`, one for summing water).
*   **Space Complexity:** O(N) for `left_max_arr` and `right_max_arr`.

**Visual Diagram (left_max_arr, right_max_arr):**
```
height =    [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
index =      0  1  2  3  4  5  6  7  8  9 10 11

left_max_arr (max from left up to current):
             [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]

right_max_arr (max from right up to current):
             [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]

Water calculation for each index i: min(left_max_arr[i], right_max_arr[i]) - height[i]

i=0: min(0,3) - 0 = 0
i=1: min(1,3) - 1 = 0
i=2: min(1,3) - 0 = 1
i=3: min(2,3) - 2 = 0
i=4: min(2,3) - 1 = 1
i=5: min(2,3) - 0 = 2
i=6: min(2,3) - 1 = 1
i=7: min(3,3) - 3 = 0
i=8: min(3,2) - 2 = 0
i=9: min(3,2) - 1 = 1
i=10: min(3,2) - 2 = 0
i=11: min(3,1) - 1 = 0

Total: 0+0+1+0+1+2+1+0+0+1+0+0 = 6
```

### Approach 3: Two Pointers (Optimal and Space-Efficient)

**Logic:**
This approach avoids extra arrays by using two pointers, one from the left and one from the right. It maintains `max_left` and `max_right` (the maximum heights encountered so far from the left and right, respectively).

The key insight: if `height[left] < height[right]`, then the water trapped at `left` can only be limited by `max_left`. The `right_max` for `left` will *at least* be `height[right]`, which is greater than `height[left]`, so `max_left` is the limiting factor. We can thus calculate water at `left`, update `max_left`, and move `left` pointer.
Conversely, if `height[left] >= height[right]`, `max_right` is the limiting factor for `right`.

**Step-by-step:**
1.  Initialize `left = 0`, `right = N-1`.
2.  Initialize `total_water = 0`, `max_left = 0`, `max_right = 0`.
3.  While `left < right`:
    *   If `height[left] < height[right]`:
        *   If `height[left] >= max_left`: Update `max_left = height[left]`. (This bar extends the wall, no water trapped here yet)
        *   Else (`height[left] < max_left`): Water can be trapped. `total_water += max_left - height[left]`.
        *   Increment `left`.
    *   Else (`height[left] >= height[right]`):
        *   If `height[right] >= max_right`: Update `max_right = height[right]`.
        *   Else (`height[right] < max_right`): Water can be trapped. `total_water += max_right - height[right]`.
        *   Decrement `right`.
4.  Return `total_water`.

**Visual Diagram:**
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]
N = 12

Initial: left=0, right=11, total_water=0, max_left=0, max_right=0

1. height[0]=0, height[11]=1.  height[left] < height[right] (0 < 1)
   height[left](0) >= max_left(0). Update max_left = 0.
   left = 1.

   State: l=1, r=11, total_water=0, max_l=0, max_r=0

2. height[1]=1, height[11]=1.  height[left] >= height[right] (1 >= 1) -- move right
   height[right](1) >= max_right(0). Update max_right = 1.
   right = 10.

   State: l=1, r=10, total_water=0, max_l=0, max_r=1

3. height[1]=1, height[10]=2.  height[left] < height[right] (1 < 2) -- move left
   height[left](1) >= max_left(0). Update max_left = 1.
   left = 2.

   State: l=2, r=10, total_water=0, max_l=1, max_r=1

4. height[2]=0, height[10]=2.  height[left] < height[right] (0 < 2) -- move left
   height[left](0) < max_left(1). Water trapped: total_water += max_left - height[left] = 1 - 0 = 1.
   total_water = 1.
   left = 3.

   State: l=3, r=10, total_water=1, max_l=1, max_r=1

5. height[3]=2, height[10]=2.  height[left] >= height[right] (2 >= 2) -- move right
   height[right](2) >= max_right(1). Update max_right = 2.
   right = 9.

   State: l=3, r=9, total_water=1, max_l=1, max_r=2

6. height[3]=2, height[9]=1.  height[left] >= height[right] (2 >= 1) -- move right
   height[right](1) < max_right(2). Water trapped: total_water += max_right - height[right] = 2 - 1 = 1.
   total_water = 1 + 1 = 2.
   right = 8.

   State: l=3, r=8, total_water=2, max_l=1, max_r=2

7. height[3]=2, height[8]=2.  height[left] >= height[right] (2 >= 2) -- move right
   height[right](2) >= max_right(2). Update max_right = 2.
   right = 7.

   State: l=3, r=7, total_water=2, max_l=1, max_r=2

8. height[3]=2, height[7]=3.  height[left] < height[right] (2 < 3) -- move left
   height[left](2) >= max_left(1). Update max_left = 2.
   left = 4.

   State: l=4, r=7, total_water=2, max_l=2, max_r=2

9. height[4]=1, height[7]=3.  height[left] < height[right] (1 < 3) -- move left
   height[left](1) < max_left(2). Water trapped: total_water += max_left - height[left] = 2 - 1 = 1.
   total_water = 2 + 1 = 3.
   left = 5.

   State: l=5, r=7, total_water=3, max_l=2, max_r=2

10. height[5]=0, height[7]=3.  height[left] < height[right] (0 < 3) -- move left
    height[left](0) < max_left(2). Water trapped: total_water += max_left - height[left] = 2 - 0 = 2.
    total_water = 3 + 2 = 5.
    left = 6.

    State: l=6, r=7, total_water=5, max_l=2, max_r=2

11. height[6]=1, height[7]=3.  height[left] < height[right] (1 < 3) -- move left
    height[left](1) < max_left(2). Water trapped: total_water += max_left - height[left] = 2 - 1 = 1.
    total_water = 5 + 1 = 6.
    left = 7.

    State: l=7, r=7, total_water=6, max_l=2, max_r=2

Loop terminates as left is no longer < right.

Final total_water = 6. Correct!
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) because the `left` and `right` pointers traverse the array once, performing constant work at each step.
*   **Space Complexity:** O(1) as no extra arrays are used. This is the most optimal solution.

**Edge Cases and Gotchas:**
*   **Empty array or `N < 3`**: Return `0`. No water can be trapped with less than 3 bars.
*   **Monotonically increasing/decreasing arrays**: No water will be trapped. Handled correctly as `max_left` or `max_right` will always be updated and `total_water` remains 0.
*   **Plateaus**: Handled correctly.
*   The `max_left` and `max_right` variables only need to store the maximum seen so far from their respective sides, not necessarily the absolute global max.

---
[Go back to README.md](../README.md)
[Go to Interview Tips](INTERVIEW_TIPS.md)