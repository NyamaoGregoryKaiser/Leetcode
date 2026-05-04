```markdown
# Algorithm Explanations

This document provides detailed explanations for the optimal solutions implemented in the `src/problems/` directory. Understanding the intuition and mechanics behind these algorithms is crucial for successful problem-solving in interviews.

---

## Problem 1: Rotate Array (Optimal: Reversal Algorithm)

**Problem Statement:** Given an array, rotate the array to the right by `k` steps.

**Intuition:**
A naive approach would be to repeatedly shift elements one by one, which is `O(N*k)`. Another common approach is to use an auxiliary array, which is `O(N)` time and `O(N)` space. The challenge is often to achieve `O(1)` space complexity. The reversal algorithm is an elegant way to do this.

Consider the array `nums = [1, 2, 3, 4, 5, 6, 7]` and `k = 3`.
We want the output `[5, 6, 7, 1, 2, 3, 4]`.
Notice that the last `k` elements `[5, 6, 7]` move to the front, and the first `n-k` elements `[1, 2, 3, 4]` move to the end. Essentially, both blocks are reversed relative to their original positions, and then the combined block is "reversed" again.

**Algorithm Steps:**

1.  **Normalize `k`**: Since rotating `n` times brings the array back to its original state, we only need to rotate by `k % n`.
    If `k` becomes 0 after normalization, no rotation is needed.
2.  **Reverse the entire array**: This brings the elements that should be at the end to the front, and vice-versa.
    *   Example: `[1, 2, 3, 4, 5, 6, 7]` becomes `[7, 6, 5, 4, 3, 2, 1]`
3.  **Reverse the first `k` elements**: These are the `k` elements that were originally at the end and are now at the beginning but in reverse order.
    *   Example: `[7, 6, 5, 4, 3, 2, 1]` -> reverse first `3` elements (`[7,6,5]`) -> `[5, 6, 7, 4, 3, 2, 1]`
4.  **Reverse the remaining `n - k` elements**: These are the elements that were originally at the beginning and are now at the end, also in reverse order.
    *   Example: `[5, 6, 7, 4, 3, 2, 1]` -> reverse remaining `4` elements (`[4,3,2,1]`) -> `[5, 6, 7, 1, 2, 3, 4]`
    *   This is the desired rotated array.

**Detailed Example:**
`nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`

1.  `k = 3 % 7 = 3`.
2.  Reverse all: `[1, 2, 3, 4, 5, 6, 7]` becomes `[7, 6, 5, 4, 3, 2, 1]`
3.  Reverse first `k=3` elements (indices `0` to `2`): `[7, 6, 5]` becomes `[5, 6, 7]`.
    Array is now `[5, 6, 7, 4, 3, 2, 1]`
4.  Reverse remaining `n-k = 7-3 = 4` elements (indices `3` to `6`): `[4, 3, 2, 1]` becomes `[1, 2, 3, 4]`.
    Array is now `[5, 6, 7, 1, 2, 3, 4]`

**Complexity Analysis:**
*   **Time Complexity:** O(N)
    *   Each reversal operation takes O(length of subarray) time. Since we reverse the entire array once, then two subarrays that sum up to the entire array, the total time is proportional to N (N + k + N-k = 2N).
*   **Space Complexity:** O(1)
    *   All operations are performed in-place, modifying the original array directly.

---

## Problem 2: Merge Intervals (Optimal: Sort and Merge)

**Problem Statement:** Given an array of intervals `[start, end]`, merge all overlapping intervals.

**Intuition:**
The core difficulty is efficiently identifying which intervals overlap. If intervals are unsorted, checking every pair would be `O(N^2)`, and merging could complicate things further by creating new overlaps or invalidating previous checks.
The key insight is that if we sort the intervals by their start times, any overlapping intervals *must* be adjacent or close to each other in the sorted list. This allows for a single pass to merge.

**Algorithm Steps:**

1.  **Sort the intervals**: Sort the input array `intervals` based on the `start` time of each interval in ascending order. If start times are equal, the order of end times doesn't significantly impact correctness but can be consistent.
2.  **Initialize `mergedIntervals`**: Create an empty list to store the merged results.
3.  **Iterate and Merge**: Go through each `currentInterval` in the sorted list:
    *   **Case 1: No overlap or `mergedIntervals` is empty**: If `mergedIntervals` is empty, or the `currentInterval` does not overlap with the `lastInterval` added to `mergedIntervals` (i.e., `lastInterval.end < currentInterval.start`), then `currentInterval` is a new, non-overlapping interval. Add it directly to `mergedIntervals`.
    *   **Case 2: Overlap**: If `currentInterval` *does* overlap with `lastInterval` (i.e., `lastInterval.end >= currentInterval.start`), then merge them. The merged interval will start at `lastInterval.start` and end at `max(lastInterval.end, currentInterval.end)`. Update the `lastInterval` in `mergedIntervals` with this new merged end time.
4.  **Return `mergedIntervals`**.

**Detailed Example:**
`intervals = [[1,3],[8,10],[2,6],[15,18]]`

1.  **Sort**: `[[1,3],[2,6],[8,10],[15,18]]`
2.  `mergedIntervals = []`

*   **Process `[1,3]`**: `mergedIntervals` is empty. Add `[1,3]`.
    `mergedIntervals = [[1,3]]`
*   **Process `[2,6]`**:
    *   `lastInterval = [1,3]`, `currentInterval = [2,6]`
    *   `lastInterval.end (3) >= currentInterval.start (2)` -> Overlap!
    *   Merge: `[lastInterval.start, max(lastInterval.end, currentInterval.end)]` = `[1, max(3, 6)]` = `[1,6]`
    *   Update `mergedIntervals[0]` to `[1,6]`.
    `mergedIntervals = [[1,6]]`
*   **Process `[8,10]`**:
    *   `lastInterval = [1,6]`, `currentInterval = [8,10]`
    *   `lastInterval.end (6) < currentInterval.start (8)` -> No overlap.
    *   Add `[8,10]`.
    `mergedIntervals = [[1,6],[8,10]]`
*   **Process `[15,18]`**:
    *   `lastInterval = [8,10]`, `currentInterval = [15,18]`
    *   `lastInterval.end (10) < currentInterval.start (15)` -> No overlap.
    *   Add `[15,18]`.
    `mergedIntervals = [[1,6],[8,10],[15,18]]`

**Result**: `[[1,6],[8,10],[15,18]]`

**Complexity Analysis:**
*   **Time Complexity:** O(N log N)
    *   Sorting the intervals dominates the time complexity, which takes O(N log N) for N intervals.
    *   The single pass through the sorted intervals takes O(N).
*   **Space Complexity:** O(N)
    *   The `mergedIntervals` list can, in the worst case (no overlaps), contain all N original intervals.
    *   The space used by the sort algorithm (e.g., Timsort in JavaScript) can also be O(N) in the worst case.

---

## Problem 3: Subarray Sum Equals K (Optimal: Prefix Sums with Hash Map)

**Problem Statement:** Given an array `nums` and integer `k`, count continuous subarrays whose sum equals `k`.

**Intuition:**
A brute-force approach (nested loops) to check all subarrays takes `O(N^2)` time. To improve this, we can use prefix sums.
Let `P[i]` be the sum of elements from `nums[0]` to `nums[i-1]`.
Then, the sum of a subarray `nums[i...j]` can be expressed as `P[j+1] - P[i]`.
We are looking for `P[j+1] - P[i] = k`. This can be rearranged to `P[i] = P[j+1] - k`.

This means, for every `currentSum` (which is effectively `P[j+1]`), if we have seen a previous prefix sum `P[i]` such that `P[i] = currentSum - k`, then the subarray between `i` and `j` sums to `k`. We can use a hash map to quickly look up and count these previous prefix sums.

**Algorithm Steps:**

1.  **Initialize**:
    *   `count = 0` (to store the total number of valid subarrays).
    *   `currentSum = 0` (the running prefix sum).
    *   `sumCountMap = new Map()` (to store `(prefix_sum -> count_of_occurrences)`).
2.  **Initialize `sumCountMap` with `(0, 1)`**: This is crucial. It handles the case where `currentSum` itself is equal to `k`. If `currentSum - k` is 0, and we find `0` in the map, it means the subarray from the very beginning up to the current index sums to `k`.
3.  **Iterate through `nums`**: For each `num` in the array:
    *   Add `num` to `currentSum`: `currentSum += num`.
    *   **Check for `(currentSum - k)`**: If `sumCountMap` contains the key `(currentSum - k)`, it means there exist one or more previous points in the array where the prefix sum was `(currentSum - k)`. Each such occurrence signifies a subarray ending at the current index with sum `k`. Add `sumCountMap.get(currentSum - k)` to `count`.
    *   **Update `sumCountMap`**: Add or increment the count of `currentSum` in the map: `sumCountMap.set(currentSum, (sumCountMap.get(currentSum) || 0) + 1)`.
4.  **Return `count`**.

**Detailed Example:**
`nums = [1, 2, 3]`, `k = 3`

1.  `count = 0`, `currentSum = 0`, `sumCountMap = {0: 1}`

*   **Process `num = 1` (index 0)**:
    *   `currentSum = 0 + 1 = 1`
    *   `neededSum = currentSum - k = 1 - 3 = -2`. `sumCountMap` does not have `-2`.
    *   `sumCountMap.set(1, 1)` -> `sumCountMap = {0: 1, 1: 1}`
*   **Process `num = 2` (index 1)**:
    *   `currentSum = 1 + 2 = 3`
    *   `neededSum = currentSum - k = 3 - 3 = 0`. `sumCountMap` has `0` with count `1`.
    *   `count += 1` -> `count = 1` (Subarray `[1,2]` sums to 3)
    *   `sumCountMap.set(3, 1)` -> `sumCountMap = {0: 1, 1: 1, 3: 1}`
*   **Process `num = 3` (index 2)**:
    *   `currentSum = 3 + 3 = 6`
    *   `neededSum = currentSum - k = 6 - 3 = 3`. `sumCountMap` has `3` with count `1`.
    *   `count += 1` -> `count = 2` (Subarray `[3]` sums to 3)
    *   `sumCountMap.set(6, 1)` -> `sumCountMap = {0: 1, 1: 1, 3: 1, 6: 1}`

**Result**: `count = 2`

**Complexity Analysis:**
*   **Time Complexity:** O(N)
    *   We iterate through the array once.
    *   Hash map operations (get, set, has) typically take O(1) time on average.
*   **Space Complexity:** O(N)
    *   In the worst case, all prefix sums are unique, and the hash map stores N entries.

---

## Problem 4: Trapping Rain Water (Optimal: Two Pointers)

**Problem Statement:** Given an elevation map, compute how much water it can trap.

**Intuition:**
For any given bar at index `i`, the amount of water it can trap depends on the maximum height of a bar to its left (`maxLeft`) and the maximum height of a bar to its right (`maxRight`). The water level at bar `i` will be `min(maxLeft, maxRight)`. If this water level is greater than `height[i]`, then `min(maxLeft, maxRight) - height[i]` units of water are trapped above bar `i`.

A brute force approach would be `O(N^2)`. Precomputing `maxLeft` and `maxRight` arrays improves it to `O(N)` time but uses `O(N)` space. The two-pointer approach aims for `O(N)` time and `O(1)` space.

The key insight for the two-pointer approach is that we only need to know the *actual* `min(maxLeft, maxRight)` for a given bar. If we move pointers from both ends towards the center:
*   If `height[left] < height[right]`: This means the potential water level at the current `left` position is limited by `height[left]` (or `maxLeft` if `maxLeft` is greater) because we know for sure there's a wall on the right (`height[right]`) that is at least as tall as `height[left]`. So, the water trapped at `left` is determined *only* by `maxLeft` (the left boundary) and `height[left]`. We can calculate water for `left` and move `left` forward.
*   If `height[left] >= height[right]`: Symmetrically, the water level at `right` is limited by `height[right]` (or `maxRight` if `maxRight` is greater). The water trapped at `right` is determined *only* by `maxRight` (the right boundary) and `height[right]`. We can calculate water for `right` and move `right` backward.

**Algorithm Steps:**

1.  **Initialize**:
    *   `left = 0`, `right = n - 1` (pointers at the ends of the array).
    *   `maxLeft = 0`, `maxRight = 0` (to store the maximum height encountered from left and right, respectively).
    *   `totalWater = 0`.
2.  **Iterate with two pointers**: While `left < right`:
    *   **If `height[left] < height[right]`**:
        *   This implies that `height[left]` is the shorter wall encountered so far, and the actual `maxRight` for the current `left` position will be at least `height[right]`. Therefore, the water trapped at `left` is limited by `maxLeft`.
        *   If `height[left] >= maxLeft`: Update `maxLeft = height[left]`. (No water trapped yet or new max wall found).
        *   Else (`height[left] < maxLeft`): Water can be trapped. `totalWater += maxLeft - height[left]`.
        *   Move `left` pointer: `left++`.
    *   **Else (`height[left] >= height[right]`)**:
        *   This implies `height[right]` is the shorter wall, and `maxLeft` for `right` will be at least `height[left]`. The water trapped at `right` is limited by `maxRight`.
        *   If `height[right] >= maxRight`: Update `maxRight = height[right]`.
        *   Else (`height[right] < maxRight`): Water can be trapped. `totalWater += maxRight - height[right]`.
        *   Move `right` pointer: `right--`.
3.  **Return `totalWater`**.

**Detailed Example:**
`height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`

*   `left=0`, `right=11`, `maxLeft=0`, `maxRight=0`, `totalWater=0`

| Iteration | `left` | `right` | `height[left]` | `height[right]` | `maxLeft` | `maxRight` | Condition (`h[l] < h[r]`) | Action                                | `totalWater` | `height` state (simplified) |
| :-------- | :----- | :------ | :------------- | :-------------- | :-------- | :--------- | :-------------------------- | :------------------------------------ | :----------- | :-------------------------- |
| 1         | 0      | 11      | 0              | 1               | 0         | 0          | True                        | `h[l] (0) >= maxL (0)`. `maxL=0`. `left++` | 0            | `[0],1,0,2,...`             |
| 2         | 1      | 11      | 1              | 1               | 0         | 0          | False                       | `h[r] (1) >= maxR (0)`. `maxR=1`. `right--` | 0            | `...2,1,[1]`                |
| 3         | 1      | 10      | 1              | 2               | 0         | 1          | True                        | `h[l] (1) >= maxL (0)`. `maxL=1`. `left++` | 0            | `[0,1],0,2,...`             |
| 4         | 2      | 10      | 0              | 2               | 1         | 1          | True                        | `h[l] (0) < maxL (1)`. `water += (1-0)=1`. `left++` | 1            | `0,[1,0],2,...`             |
| 5         | 3      | 10      | 2              | 2               | 1         | 1          | False                       | `h[r] (2) >= maxR (1)`. `maxR=2`. `right--` | 1            | `...3,2,[1,2]`              |
| 6         | 3      | 9       | 2              | 1               | 1         | 2          | False                       | `h[r] (1) < maxR (2)`. `water += (2-1)=1`. `right--` | 2            | `...3,2,1,[2]`              |
| 7         | 3      | 8       | 2              | 2               | 1         | 2          | False                       | `h[r] (2) >= maxR (2)`. `maxR=2`. `right--` | 2            | `...3,[2,1,2]`              |
| 8         | 3      | 7       | 2              | 3               | 1         | 2          | True                        | `h[l] (2) >= maxL (1)`. `maxL=2`. `left++` | 2            | `0,1,0,[2],1,0,1,3...`      |
| 9         | 4      | 7       | 1              | 3               | 2         | 2          | True                        | `h[l] (1) < maxL (2)`. `water += (2-1)=1`. `left++` | 3            | `0,1,0,2,[1],0,1,3...`      |
| 10        | 5      | 7       | 0              | 3               | 2         | 2          | True                        | `h[l] (0) < maxL (2)`. `water += (2-0)=2`. `left++` | 5            | `0,1,0,2,1,[0],1,3...`      |
| 11        | 6      | 7       | 1              | 3               | 2         | 2          | True                        | `h[l] (1) < maxL (2)`. `water += (2-1)=1`. `left++` | 6            | `0,1,0,2,1,0,[1],3...`      |
| 12        | 7      | 7       | -              | -               | -         | -          | `left < right` is false     | Loop ends.                            | 6            |                             |

**Result**: `totalWater = 6`

**Complexity Analysis:**
*   **Time Complexity:** O(N)
    *   The two pointers `left` and `right` traverse the array, each moving at most N times. The loop continues until `left >= right`.
    *   All operations inside the loop are constant time.
*   **Space Complexity:** O(1)
    *   Only a few constant variables (`left`, `right`, `maxLeft`, `maxRight`, `totalWater`) are used. No auxiliary arrays are created.

---

## Problem 5: Find the Duplicate Number (Optimal: Floyd's Tortoise and Hare / Cycle Detection)

**Problem Statement:** Given `n+1` integers in range `[1, n]`, find the single repeated number without modifying the array and using O(1) extra space.

**Intuition:**
The constraints (`n+1` numbers in range `[1, n]`, exactly one duplicate, O(1) space, no modification) are a strong hint towards an unusual approach. The "Pigeonhole Principle" guarantees a duplicate exists.
The most elegant solution involves transforming the problem into detecting a cycle in a linked list.

Imagine the array `nums` as a linked list where `index -> nums[index]` represents a pointer.
For example, if `nums = [1, 3, 4, 2, 2]`:
*   `index 0` points to `nums[0] = 1`
*   `index 1` points to `nums[1] = 3`
*   `index 2` points to `nums[2] = 4`
*   `index 3` points to `nums[3] = 2`
*   `index 4` points to `nums[4] = 2`

This forms a sequence starting from `index 0` (or any starting point, but `0` works well as an "entry" into the value range `1..n`):
`0 -> 1 -> 3 -> 2 -> 4 -> 2 -> 4 -> ...`
Notice the sequence `2 -> 4 -> 2` forms a cycle. The number `2` is the entry point of this cycle, and it is also the duplicate number. The reason a cycle forms is precisely because of the duplicate. Since two different indices (e.g., `3` and `4`) point to the same value (`2`), this creates a "fork" where two paths converge into one, leading to a cycle.

**Algorithm Steps (Floyd's Tortoise and Hare):**

1.  **Phase 1: Detect a cycle and find an intersection point.**
    *   Initialize two pointers, `tortoise` and `hare`, both starting at `nums[0]`.
    *   Move `tortoise` one step at a time: `tortoise = nums[tortoise]`.
    *   Move `hare` two steps at a time: `hare = nums[nums[hare]]`.
    *   Continue this until `tortoise === hare`. This meeting point is guaranteed to be within the cycle.

2.  **Phase 2: Find the entry point of the cycle.**
    *   Reset `tortoise` back to `nums[0]` (the starting point of our sequence).
    *   Keep `hare` at the intersection point found in Phase 1.
    *   Move both `tortoise` and `hare` one step at a time:
        *   `tortoise = nums[tortoise]`
        *   `hare = nums[hare]`
    *   The point where they meet again is the "entrance" to the cycle. This value is the duplicate number.

**Mathematical Basis (Intuition for Phase 2):**
If `C` is the length of the cycle, `S` is the distance from the start to the cycle entry, and `L` is the distance from the cycle entry to the meeting point (within the cycle), then:
*   Tortoise: `S + L`
*   Hare: `S + L + nC` (for some integer `n`, since hare goes multiple times around the cycle)
Since Hare is twice as fast: `2(S + L) = S + L + nC`.
This simplifies to `S + L = nC`.
Rearranging: `S = nC - L`. This means the distance from the start (`S`) to the cycle entry is `n` full cycles minus the distance `L`.
If `n=1`, `S = C - L`. This means if you start a pointer from the beginning (`S` steps) and another from the meeting point (which is `L` steps *away from the entrance* in the cycle, so `C-L` steps *to the entrance*), they will meet at the cycle entrance.

**Detailed Example:**
`nums = [1, 3, 4, 2, 2]`

1.  **Phase 1: Find Intersection**
    *   `tortoise = nums[0] = 1`
    *   `hare = nums[0] = 1`

    | Step | `tortoise` (1x) | `hare` (2x)     | `tortoise !== hare` | Path of tortoise | Path of hare       |
    | :--- | :-------------- | :-------------- | :------------------ | :--------------- | :----------------- |
    | Init | 1               | 1               | False               |                  |                    |
    | 1    | `nums[1] = 3`   | `nums[nums[1]] = nums[3] = 2` | True                | `1 -> 3`         | `1 -> 3 -> 2`      |
    | 2    | `nums[3] = 2`   | `nums[nums[2]] = nums[4] = 2` | False               | `3 -> 2`         | `2 -> 4 -> 2`      |
    *   They meet at `2`. Intersection found.

2.  **Phase 2: Find Cycle Entrance**
    *   `tortoise = nums[0] = 1`
    *   `hare = 2` (from previous phase)

    | Step | `tortoise` (1x) | `hare` (1x)     | `tortoise !== hare` | Path of tortoise | Path of hare       |
    | :--- | :-------------- | :-------------- | :------------------ | :--------------- | :----------------- |
    | Init | 1               | 2               | True                |                  |                    |
    | 1    | `nums[1] = 3`   | `nums[2] = 4`   | True                | `1 -> 3`         | `2 -> 4`           |
    | 2    | `nums[3] = 2`   | `nums[4] = 2`   | False               | `3 -> 2`         | `4 -> 2`           |
    *   They meet at `2`.

**Result**: The duplicate number is `2`.

**Complexity Analysis:**
*   **Time Complexity:** O(N)
    *   In Phase 1, the `hare` pointer travels at most `2N` steps (it might do a couple of loops around the cycle). The `tortoise` travels at most `N` steps.
    *   In Phase 2, both pointers travel at most `N` steps to meet at the cycle entrance.
    *   Overall, the number of steps is proportional to N.
*   **Space Complexity:** O(1)
    *   Only a few constant variables (`tortoise`, `hare`) are used. The array is not modified.

---
```