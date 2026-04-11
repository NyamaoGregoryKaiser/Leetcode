```markdown
# Detailed Algorithm Explanations and Analysis

This document provides a deep dive into the algorithms implemented for each array manipulation problem, including the rationale behind different approaches, step-by-step logic, and detailed time/space complexity analysis.

---

## 1. Two Sum

**Problem Statement:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Assume each input would have exactly one solution, and you may not use the same element twice.

### Approach 1: Brute Force

**Logic:**
The most straightforward way is to check every possible pair of numbers. We can use two nested loops. The outer loop iterates from the first element to the second-to-last. The inner loop iterates from the element *after* the outer loop's current element to the last element. For each pair, check if their sum equals the `target`.

**Example:** `nums = [2, 7, 11, 15]`, `target = 9`

```
i=0, nums[0]=2
  j=1, nums[1]=7  -> 2+7=9. Found! Return {0, 1}.
```

**Complexity Analysis:**
*   **Time Complexity: O(N^2)**
    *   The outer loop runs `N-1` times.
    *   The inner loop runs approximately `N` times for each outer loop iteration (on average `N/2`).
    *   Thus, roughly `N * (N/2)` operations, which simplifies to O(N^2).
*   **Space Complexity: O(1)**
    *   Only a few constant variables are used.

**Pros:** Simple to understand and implement.
**Cons:** Inefficient for large inputs.

### Approach 2: Hash Map (Optimal)

**Logic:**
This approach uses a hash map (or dictionary) to significantly reduce the lookup time. As we iterate through the array, for each number `x`, we calculate the `complement` needed (`target - x`). If this `complement` is already present in our hash map, it means we've found the pair, and we can return its index (from the map) and the current number's index. If the `complement` is not in the map, we add the current number `x` and its index to the map for future lookups.

**Example:** `nums = [2, 7, 11, 15]`, `target = 9`

```
1. Initialize `num_map = {}`
2. `i = 0, nums[0] = 2`
   `complement = 9 - 2 = 7`
   `7` not in `num_map`. Add `(2: 0)` to `num_map`. `num_map = {2: 0}`
3. `i = 1, nums[1] = 7`
   `complement = 9 - 7 = 2`
   `2` IS in `num_map`! Its index is `0`.
   Return `{num_map[2], i}` which is `{0, 1}`.
```

**Complexity Analysis:**
*   **Time Complexity: O(N)**
    *   We iterate through the array once.
    *   For each element, hash map insertion (`num_map[nums[i]] = i`) and lookup (`num_map.find(complement)`) operations take, on average, O(1) time. In the worst case (hash collisions), they can degrade to O(N), but this is rare with good hash functions and typically not assumed in interviews.
*   **Space Complexity: O(N)**
    *   In the worst case, if no pair is found until the very last element, the hash map could store all `N` elements from the array.

**Pros:** Highly efficient in terms of time complexity.
**Cons:** Uses additional space.

---

## 2. Rotate Array

**Problem Statement:** Rotate an array by `k` steps to the right.
Example: `nums = [1,2,3,4,5,6,7], k = 3` -> `[5,6,7,1,2,3,4]`

**Constraint:** `k` can be larger than the array size `n`. We need to handle this by taking `k = k % n`.

### Approach 1: Using an Extra Array

**Logic:**
Create a new array of the same size. For each element in the original array at index `i`, place it into the new array at index `(i + k) % n`. After filling the new array, copy its contents back to the original array.

**Example:** `nums = [1,2,3,4,5,6,7], k = 3`, `n = 7`

```
New array: `rotated_nums = [_,_,_,_,_,_,_]`

i=0, nums[0]=1 -> rotated_nums[(0+3)%7] = rotated_nums[3] = 1
i=1, nums[1]=2 -> rotated_nums[(1+3)%7] = rotated_nums[4] = 2
i=2, nums[2]=3 -> rotated_nums[(2+3)%7] = rotated_nums[5] = 3
i=3, nums[3]=4 -> rotated_nums[(3+3)%7] = rotated_nums[6] = 4
i=4, nums[4]=5 -> rotated_nums[(4+3)%7] = rotated_nums[0] = 5
i=5, nums[5]=6 -> rotated_nums[(5+3)%7] = rotated_nums[1] = 6
i=6, nums[6]=7 -> rotated_nums[(6+3)%7] = rotated_nums[2] = 7

`rotated_nums` becomes `[5,6,7,1,2,3,4]`. Copy to `nums`.
```

**Complexity Analysis:**
*   **Time Complexity: O(N)**
    *   One pass to fill the new array, another pass to copy back.
*   **Space Complexity: O(N)**
    *   An auxiliary array of size `N` is used.

**Pros:** Simple, easy to understand.
**Cons:** Requires extra space, not an in-place solution.

### Approach 2: Bubble Rotate (k times)

**Logic:**
This approach simulates the rotation `k` times. In each step, we move the last element to the first position and shift all other elements one position to the right. This is repeated `k` times.

**Example:** `nums = [1,2,3,4,5,6,7], k = 3`

```
Initial: [1,2,3,4,5,6,7]

k=1: Last element is 7.
     Shift [1,2,3,4,5,6] -> [6,1,2,3,4,5]
     New array: [7,1,2,3,4,5,6]

k=2: Last element is 6.
     Shift [7,1,2,3,4,5] -> [5,7,1,2,3,4]
     New array: [6,7,1,2,3,4,5]

k=3: Last element is 5.
     Shift [6,7,1,2,3,4] -> [4,6,7,1,2,3]
     New array: [5,6,7,1,2,3,4] (Desired result)
```

**Complexity Analysis:**
*   **Time Complexity: O(N * k)**
    *   The outer loop runs `k` times.
    *   The inner loop (shifting) runs `N-1` times.
*   **Space Complexity: O(1)**
    *   This is an in-place solution.

**Pros:** In-place.
**Cons:** Very inefficient if `k` is large (e.g., `k` close to `N`). In worst case, `k=N-1`, leading to O(N^2).

### Approach 3: Reversal (Optimal In-Place)

**Logic:**
This is a clever and optimal in-place solution. It involves three reversal operations:

1.  Reverse the entire array.
2.  Reverse the first `k` elements.
3.  Reverse the remaining `n-k` elements.

**Example:** `nums = [1,2,3,4,5,6,7], k = 3`, `n = 7`

```
Initial: `[1,2,3,4,5,6,7]`

1. Reverse entire array (`[0...n-1]`):
   `[7,6,5,4,3,2,1]`

2. Reverse first `k` elements (`[0...k-1]`): `k=3` -> `[0...2]`
   `[5,6,7,4,3,2,1]`

3. Reverse remaining `n-k` elements (`[k...n-1]`): `n-k = 7-3 = 4` -> `[3...6]`
   `[5,6,7,1,2,3,4]` (Desired result)
```

**Why it works:**
When you reverse the entire array, elements that were at the end come to the beginning, and vice versa. By reversing the first `k` elements, you put the `k` "new" leading elements in their correct relative order. By reversing the remaining `n-k` elements, you put the `n-k` "new" trailing elements in their correct relative order. Because `k` is taken modulo `n`, the `k` elements that move to the front are indeed the last `k` elements of the original array.

**Complexity Analysis:**
*   **Time Complexity: O(N)**
    *   Each reversal operation takes O(N) time (or O(segment_length)). Since we perform three reversals on segments that sum up to N, the total time is O(N).
*   **Space Complexity: O(1)**
    *   This is an in-place solution.

**Pros:** Optimal in both time and space complexity for in-place rotation.
**Cons:** The logic might not be immediately intuitive.

---

## 3. Merge Intervals

**Problem Statement:** Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Approach 1: Sort and Merge (Optimal)

**Logic:**
The key idea here is that if we sort the intervals by their start times, then any overlapping intervals *must* be adjacent in the sorted list. This allows us to process them in a single pass.

1.  **Sort:** Sort the input `intervals` array based on the start time of each interval. If two intervals have the same start time, their relative order doesn't strictly matter, but sorting by end time can be a tie-breaker.
2.  **Iterate and Merge:**
    *   Initialize an empty list `merged_intervals` to store the result.
    *   Add the first interval from the sorted list to `merged_intervals`.
    *   Iterate through the rest of the sorted intervals, starting from the second one. For each `current_interval`:
        *   Compare its start time with the end time of the `last_merged_interval` (the last interval added to `merged_intervals`).
        *   **If `current_interval.start <= last_merged_interval.end`**: There's an overlap. Merge them by updating the `last_merged_interval.end = max(last_merged_interval.end, current_interval.end)`. This effectively extends the existing merged interval.
        *   **Else (no overlap)**: The `current_interval` does not overlap with the `last_merged_interval`. Add `current_interval` as a new, separate interval to `merged_intervals`.

**Example:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`

```
1. Sort by start time: `[[1,3],[2,6],[8,10],[15,18]]` (already sorted)

2. Initialize `merged_intervals = []`

3. Add first interval: `merged_intervals = [[1,3]]`

4. Process `[2,6]`:
   `last_merged_end = 3` (from `[1,3]`)
   `current_start = 2`
   `2 <= 3` (overlap detected)
   Update last merged: `merged_intervals.back().end = max(3, 6) = 6`
   `merged_intervals` is now `[[1,6]]`

5. Process `[8,10]`:
   `last_merged_end = 6` (from `[1,6]`)
   `current_start = 8`
   `8 > 6` (no overlap)
   Add current interval: `merged_intervals.push_back([8,10])`
   `merged_intervals` is now `[[1,6],[8,10]]`

6. Process `[15,18]`:
   `last_merged_end = 10` (from `[8,10]`)
   `current_start = 15`
   `15 > 10` (no overlap)
   Add current interval: `merged_intervals.push_back([15,18])`
   `merged_intervals` is now `[[1,6],[8,10],[15,18]]`

7. End of intervals. Return `[[1,6],[8,10],[15,18]]`.
```

**Complexity Analysis:**
*   **Time Complexity: O(N log N)**
    *   The dominant factor is the sorting step, which takes O(N log N) time for `N` intervals.
    *   The subsequent single pass through the sorted intervals takes O(N) time.
*   **Space Complexity: O(N)**
    *   The `merged_intervals` list can, in the worst case (no overlaps), contain all `N` original intervals.
    *   The sorting algorithm itself might use O(log N) or O(N) auxiliary space depending on the implementation.

**Pros:** Efficient and generally the standard approach for this problem.
**Cons:** Requires sorting, which can be a bottleneck for extremely large N.

---

## 4. Trapping Rain Water

**Problem Statement:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Visual Example:**
Consider `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```
Elevation Map (heights):
     #
 #   ## #
_#_##_##_#_

Water trapped between bars:
     #     <-- height = 3
 #   ## #  <-- water level at 2
_#_##_##_#_ <-- ground (height = 0)

Specifically at index 2 (height 0), water trapped is min(max_left, max_right) - height[2]
max_left for index 2 is max(height[0], height[1], height[2]) = max(0,1,0) = 1
max_right for index 2 is max(height[2], ..., height[11]) = max(0,2,1,0,1,3,2,1,2,1) = 3
Water at index 2 = min(1,3) - 0 = 1.
```

The amount of water a bar at index `i` can trap depends on the maximum height of a bar to its left (`left_max`) and the maximum height of a bar to its right (`right_max`). The water level at index `i` will be determined by the `min(left_max, right_max)`. If this water level is greater than `height[i]`, then `min(left_max, right_max) - height[i]` amount of water is trapped above bar `i`.

### Approach 1: Brute Force

**Logic:**
For each bar (excluding the first and last, which cannot trap water), we iterate through the array twice to find its `left_max` and `right_max`.
1.  Iterate from `i = 1` to `n-2`.
2.  For each `i`:
    *   Find `left_max`: Iterate from `j = 0` to `i`, keeping track of the maximum height seen.
    *   Find `right_max`: Iterate from `j = i` to `n-1`, keeping track of the maximum height seen.
    *   Calculate `water_trapped_at_i = max(0, min(left_max, right_max) - height[i])`.
    *   Add this to `total_water`.

**Complexity Analysis:**
*   **Time Complexity: O(N^2)**
    *   The outer loop runs `N-2` times.
    *   Inside, finding `left_max` takes O(i) and `right_max` takes O(N-i) time. In the worst case, both are O(N).
    *   Thus, `N * (N + N)` which simplifies to O(N^2).
*   **Space Complexity: O(1)**
    *   Only a few constant variables are used.

**Pros:** Easy to understand the concept directly from the definition.
**Cons:** Very inefficient for larger inputs.

### Approach 2: Precompute Max Heights (Dynamic Programming / Two-Pass)

**Logic:**
To optimize finding `left_max` and `right_max` for each bar, we can precompute these values in two separate passes.
1.  **`left_max` array:** Create an array `left_max` of size `N`. `left_max[i]` will store the maximum height encountered from index 0 up to `i`.
    *   `left_max[0] = height[0]`
    *   For `i` from 1 to `n-1`: `left_max[i] = max(left_max[i-1], height[i])`
2.  **`right_max` array:** Create an array `right_max` of size `N`. `right_max[i]` will store the maximum height encountered from index `n-1` down to `i`.
    *   `right_max[n-1] = height[n-1]`
    *   For `i` from `n-2` down to 0: `right_max[i] = max(right_max[i+1], height[i])`
3.  **Calculate water:** Iterate from `i = 1` to `n-2`. For each `i`:
    *   `water_at_i = min(left_max[i], right_max[i]) - height[i]`
    *   Add `water_at_i` to `total_water`.

**Example:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```
n = 12

1. left_max array:
   i=0: height[0]=0, left_max[0]=0
   i=1: height[1]=1, left_max[1]=max(left_max[0], height[1]) = max(0,1) = 1
   i=2: height[2]=0, left_max[2]=max(left_max[1], height[2]) = max(1,0) = 1
   ...
   left_max = [0,1,1,2,2,2,2,3,3,3,3,3]

2. right_max array:
   i=11: height[11]=1, right_max[11]=1
   i=10: height[10]=2, right_max[10]=max(right_max[11], height[10]) = max(1,2) = 2
   i=9: height[9]=1, right_max[9]=max(right_max[10], height[9]) = max(2,1) = 2
   ...
   right_max = [3,3,3,3,3,3,3,3,2,2,2,1]

3. Calculate water (i from 1 to 10):
   i=1 (height[1]=1): min(left_max[1]=1, right_max[1]=3) - 1 = 1 - 1 = 0
   i=2 (height[2]=0): min(left_max[2]=1, right_max[2]=3) - 0 = 1 - 0 = 1
   i=3 (height[3]=2): min(left_max[3]=2, right_max[3]=3) - 2 = 2 - 2 = 0
   i=4 (height[4]=1): min(left_max[4]=2, right_max[4]=3) - 1 = 2 - 1 = 1
   i=5 (height[5]=0): min(left_max[5]=2, right_max[5]=3) - 0 = 2 - 0 = 2
   i=6 (height[6]=1): min(left_max[6]=2, right_max[6]=3) - 1 = 2 - 1 = 1
   i=7 (height[7]=3): min(left_max[7]=3, right_max[7]=3) - 3 = 3 - 3 = 0
   i=8 (height[8]=2): min(left_max[8]=3, right_max[8]=2) - 2 = 2 - 2 = 0
   i=9 (height[9]=1): min(left_max[9]=3, right_max[9]=2) - 1 = 2 - 1 = 1
   i=10 (height[10]=2): min(left_max[10]=3, right_max[10]=2) - 2 = 2 - 2 = 0
   Total water = 0+1+0+1+2+1+0+0+1+0 = 6
```

**Complexity Analysis:**
*   **Time Complexity: O(N)**
    *   Three passes over the array (one for `left_max`, one for `right_max`, one for total water).
*   **Space Complexity: O(N)**
    *   Two auxiliary arrays of size `N` are used (`left_max` and `right_max`).

**Pros:** Much more efficient than brute force.
**Cons:** Uses extra space.

### Approach 3: Two-Pointer (Optimal In-Place Logic)

**Logic:**
This method achieves O(1) space complexity by strategically using two pointers, `left` and `right`, starting from the ends of the array and moving inwards. It keeps track of `max_left` and `max_right` *globally* as it traverses.

The key insight is: If `height[left] < height[right]`, then the water trapped at `left` (and any points to its right until `right`) can only be limited by `max_left`. The `right` wall is guaranteed to be at least `height[left]` or taller, so we don't need to worry about `max_right` yet. We can confidently calculate water at `left` and move `left` inwards. The symmetrical argument holds if `height[right] <= height[left]`.

1.  Initialize `left = 0`, `right = n-1`.
2.  Initialize `max_left = 0`, `max_right = 0`.
3.  Initialize `total_water = 0`.
4.  Loop while `left < right`:
    *   Update `max_left = max(max_left, height[left])`.
    *   Update `max_right = max(max_right, height[right])`.
    *   **If `height[left] < height[right]`:**
        *   Water at `left` is `max_left - height[left]`. Add this to `total_water`.
        *   Move `left++`.
    *   **Else (`height[right] <= height[left]`):**
        *   Water at `right` is `max_right - height[right]`. Add this to `total_water`.
        *   Move `right--`.

**Example:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```
Initial: left=0, right=11, max_left=0, max_right=0, total_water=0

Loop:
1. `height[0]=0, height[11]=1`. `height[left] < height[right]` (0 < 1)
   `max_left = max(0, height[0]=0) = 0`
   `total_water += (max_left - height[0]) = (0 - 0) = 0`
   `left = 1`

2. `height[1]=1, height[11]=1`. `height[left] <= height[right]` (1 <= 1)
   `max_right = max(0, height[11]=1) = 1`
   `total_water += (max_right - height[11]) = (1 - 1) = 0`
   `right = 10` (total_water = 0)

3. `height[1]=1, height[10]=2`. `height[left] < height[right]` (1 < 2)
   `max_left = max(0, height[1]=1) = 1`
   `total_water += (max_left - height[1]) = (1 - 1) = 0`
   `left = 2` (total_water = 0)

4. `height[2]=0, height[10]=2`. `height[left] < height[right]` (0 < 2)
   `max_left = max(1, height[2]=0) = 1`
   `total_water += (max_left - height[2]) = (1 - 0) = 1`
   `left = 3` (total_water = 1)

5. `height[3]=2, height[10]=2`. `height[left] <= height[right]` (2 <= 2)
   `max_right = max(1, height[10]=2) = 2`
   `total_water += (max_right - height[10]) = (2 - 2) = 0`
   `right = 9` (total_water = 1)

6. `height[3]=2, height[9]=1`. `height[left] > height[right]` (2 > 1)
   `max_right = max(2, height[9]=1) = 2`
   `total_water += (max_right - height[9]) = (2 - 1) = 1`
   `right = 8` (total_water = 2)

7. `height[3]=2, height[8]=2`. `height[left] <= height[right]` (2 <= 2)
   `max_right = max(2, height[8]=2) = 2`
   `total_water += (max_right - height[8]) = (2 - 2) = 0`
   `right = 7` (total_water = 2)

8. `height[3]=2, height[7]=3`. `height[left] < height[right]` (2 < 3)
   `max_left = max(1, height[3]=2) = 2` (max_left was 1 before step 3, now it's 2 after updating at step 5)
   `total_water += (max_left - height[3]) = (2 - 2) = 0`
   `left = 4` (total_water = 2)

9. `height[4]=1, height[7]=3`. `height[left] < height[right]` (1 < 3)
   `max_left = max(2, height[4]=1) = 2`
   `total_water += (max_left - height[4]) = (2 - 1) = 1`
   `left = 5` (total_water = 3)

10. `height[5]=0, height[7]=3`. `height[left] < height[right]` (0 < 3)
    `max_left = max(2, height[5]=0) = 2`
    `total_water += (max_left - height[5]) = (2 - 0) = 2`
    `left = 6` (total_water = 5)

11. `height[6]=1, height[7]=3`. `height[left] < height[right]` (1 < 3)
    `max_left = max(2, height[6]=1) = 2`
    `total_water += (max_left - height[6]) = (2 - 1) = 1`
    `left = 7` (total_water = 6)

12. Now `left = 7, right = 7`. `left < right` condition is false. Loop ends.
Total water = 6.

**Complexity Analysis:**
*   **Time Complexity: O(N)**
    *   The two pointers traverse the array from opposite ends, meeting in the middle. Each element is visited at most once.
*   **Space Complexity: O(1)**
    *   Only a few constant variables are used.

**Pros:** Optimal solution in both time and space.
**Cons:** The reasoning behind why it works might require some careful thought to fully grasp.
```