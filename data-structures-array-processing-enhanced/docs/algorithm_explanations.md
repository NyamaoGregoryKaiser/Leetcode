```markdown
# Algorithm Explanations

This document provides in-depth explanations for the array manipulation algorithms implemented in this project. Each section covers the optimal approach, alternative strategies, visual diagrams (using ASCII art), and critical edge cases.

---

## 1. Rotate Array

### Problem Statement

Rotate an integer array `nums` to the right by `k` steps, where `k` is non-negative. The operation should be performed in-place.

### Optimal Solution: Reversal Algorithm

The most efficient in-place solution for array rotation is the reversal algorithm. It achieves `O(N)` time complexity and `O(1)` space complexity.

**Logic:**

The key idea is that rotating an array `[1,2,3,4,5,6,7]` by `k=3` steps to the right results in `[5,6,7,1,2,3,4]`. This can be achieved by a series of reversals:

1.  **Normalize `k`**: `k` can be greater than the array's length (`n`). The effective rotation steps will be `k % n`.
2.  **Reverse the entire array**: This brings the elements that should be at the end to the beginning (in reverse order) and vice-versa.
3.  **Reverse the first `k` elements**: These are the elements that should now be at the beginning of the rotated array.
4.  **Reverse the remaining `n-k` elements**: These are the elements that should now be at the end of the rotated array.

**Step-by-step Example (`nums = [1,2,3,4,5,6,7]`, `k = 3`):**

Initial Array:
```
[ 1, 2, 3, 4, 5, 6, 7 ]
  ^                 ^
  0                 6 (n-1)
```

1.  **Reverse entire array `[0...n-1]`:**
    `reverse([0...6])`
    ```
    [ 7, 6, 5, 4, 3, 2, 1 ]
    ```

2.  **Reverse first `k` elements `[0...k-1]`:**
    `k = 3`, so `reverse([0...2])`
    ```
    [ 5, 6, 7, 4, 3, 2, 1 ]
      ^  ^  ^
      first k elements reversed
    ```

3.  **Reverse remaining `n-k` elements `[k...n-1]`:**
    `n-k = 7-3 = 4`. So `reverse([3...6])`
    ```
    [ 5, 6, 7, 1, 2, 3, 4 ]
               ^  ^  ^  ^
               remaining n-k elements reversed
    ```
    Result: `[5,6,7,1,2,3,4]` - Correctly rotated!

**Time Complexity:** O(N) because each element is reversed at most three times.
**Space Complexity:** O(1) because the operations are performed in-place.

### Alternative Approach: Using Auxiliary Array

A simpler, but less space-efficient, approach is to use a temporary array.

**Logic:**

1.  Create a new array `rotated` of the same size as `nums`.
2.  For each element `nums[i]`, place it into `rotated[(i + k) % n]`.
3.  Copy all elements from `rotated` back into `nums`.

**Time Complexity:** O(N) (one pass to fill `rotated`, one pass to copy back).
**Space Complexity:** O(N) (for the `rotated` array).

### Edge Cases and Gotchas

*   **`k = 0` or `nums.length = 0` or `nums.length = 1`:** No rotation is needed. The code handles this by checking `k === 0` and `n === 0`. For `n=1`, `k %= n` will always result in `k=0`, correctly leading to no rotation.
*   **`k > n` (array length):** `k %= n` handles this correctly, as rotating `n+x` times is the same as rotating `x` times.
*   **Negative `k`:** The problem states `k` is non-negative. If it were allowed, you'd typically normalize it to `k = (k % n + n) % n` to always get a positive effective `k`. Our current `k %= n` would result in negative `k` if `k` input was negative.

---

## 2. Product of Array Except Self

### Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The algorithm must run in `O(N)` time and without using the division operation.

### Optimal Solution: Two-Pass Approach (Prefix/Suffix Products)

This approach avoids division and achieves `O(N)` time complexity with `O(1)` auxiliary space (if the output array doesn't count as extra space, which is common).

**Logic:**

The product of all elements except `nums[i]` can be found by multiplying the product of all elements to the left of `i` by the product of all elements to the right of `i`.

`answer[i] = (product of nums[0]...nums[i-1]) * (product of nums[i+1]...nums[n-1])`

We can calculate these two parts in two passes:

1.  **First Pass (Left Products):** Iterate from left to right. For each `i`, `answer[i]` will store the product of all elements to its left.
    *   Initialize `leftProduct = 1`.
    *   For `i` from `0` to `n-1`:
        *   `answer[i] = leftProduct`
        *   `leftProduct *= nums[i]`

2.  **Second Pass (Right Products):** Iterate from right to left. For each `i`, multiply `answer[i]` (which currently holds the left product) by the product of all elements to its right.
    *   Initialize `rightProduct = 1`.
    *   For `i` from `n-1` down to `0`:
        *   `answer[i] *= rightProduct`
        *   `rightProduct *= nums[i]`

**Step-by-step Example (`nums = [1,2,3,4]`):**

Initial `answer` array: `[1,1,1,1]`

**Pass 1 (Left Products):**
`leftProduct = 1`

*   `i = 0`: `answer[0] = 1`. `leftProduct = 1 * nums[0] = 1 * 1 = 1`.
    `answer: [1,1,1,1]`
*   `i = 1`: `answer[1] = 1`. `leftProduct = 1 * nums[1] = 1 * 2 = 2`.
    `answer: [1,1,1,1]`
*   `i = 2`: `answer[2] = 2`. `leftProduct = 2 * nums[2] = 2 * 3 = 6`.
    `answer: [1,1,2,1]`
*   `i = 3`: `answer[3] = 6`. `leftProduct = 6 * nums[3] = 6 * 4 = 24`.
    `answer: [1,1,2,6]`

After Pass 1: `answer = [1, 1, 2, 6]` (contains left products: `[1, nums[0], nums[0]*nums[1], nums[0]*nums[1]*nums[2]]`)

**Pass 2 (Right Products):**
`rightProduct = 1`

*   `i = 3`: `answer[3] = answer[3] * rightProduct = 6 * 1 = 6`. `rightProduct = 1 * nums[3] = 1 * 4 = 4`.
    `answer: [1,1,2,6]`
*   `i = 2`: `answer[2] = answer[2] * rightProduct = 2 * 4 = 8`. `rightProduct = 4 * nums[2] = 4 * 3 = 12`.
    `answer: [1,1,8,6]`
*   `i = 1`: `answer[1] = answer[1] * rightProduct = 1 * 12 = 12`. `rightProduct = 12 * nums[1] = 12 * 2 = 24`.
    `answer: [1,12,8,6]`
*   `i = 0`: `answer[0] = answer[0] * rightProduct = 1 * 24 = 24`. `rightProduct = 24 * nums[0] = 24 * 1 = 24`.
    `answer: [24,12,8,6]`

Final `answer`: `[24,12,8,6]`.

**Time Complexity:** O(N) (two passes over the array).
**Space Complexity:** O(1) (excluding the output array, which is required). If the output array counts, it's O(N).

### Brute Force Approach (with division)

If division were allowed, one could:

1.  Calculate the `totalProduct` of all elements.
2.  Iterate through the array, and for each `nums[i]`, `answer[i] = totalProduct / nums[i]`.
This approach requires careful handling of zeros.

**Edge Cases and Gotchas**

*   **Zeros in the array:**
    *   **One zero:** If there's exactly one zero (e.g., `[1,2,0,4]`), only `answer[index_of_zero]` will be non-zero (product of all other numbers). All other `answer[i]` will be zero. The two-pass method correctly handles this as `leftProduct` or `rightProduct` will become zero and propagate.
    *   **Two or more zeros:** If there are two or more zeros (e.g., `[1,0,2,0,4]`), then `answer[i]` will be zero for *all* `i`, as any product involving two different elements will necessarily include at least one zero. The two-pass method also handles this naturally.
*   **Empty array or single element array:** The problem constraints usually define `nums.length >= 2`. For a single element, the product "except self" is generally `1` (product of an empty set). Our code covers this.
*   **Large numbers:** Ensure the product fits in the allowed integer type. JavaScript numbers (double-precision floating-point) can handle larger values than 32-bit integers, but very large products could still lead to loss of precision or `Infinity`. The problem constraints usually guarantee fit.

---

## 3. Merge Intervals

### Problem Statement

Given an array of `intervals` where `intervals[i] = [start, end]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Optimal Solution: Sort and Merge (Greedy Approach)

This is the standard optimal approach, achieving `O(N log N)` time complexity and `O(N)` space complexity.

**Logic:**

The crucial insight is that if you sort the intervals by their start times, you only need to compare an interval with the *last merged interval*. If they overlap, you merge them. If not, the current interval becomes a new, separate merged interval.

1.  **Sort the intervals:** Sort the input `intervals` array based on the start time of each interval. If start times are equal, you can use the end time as a tie-breaker, though it's often not strictly necessary for correctness.
2.  **Iterate and Merge:**
    *   Initialize an empty list `mergedIntervals`.
    *   Iterate through the sorted intervals. For each `currentInterval`:
        *   If `mergedIntervals` is empty, or `currentInterval.start` is greater than `mergedIntervals.last().end`, then there's no overlap with the last merged interval. Add `currentInterval` as a new interval to `mergedIntervals`.
        *   Otherwise (an overlap exists: `currentInterval.start <= mergedIntervals.last().end`), merge `currentInterval` with `mergedIntervals.last()`. Update `mergedIntervals.last().end = max(mergedIntervals.last().end, currentInterval.end)`.

**Step-by-step Example (`intervals = [[1,3],[8,10],[2,6],[15,18]]`):**

Initial `intervals` (unsorted):
```
[ [1,3], [8,10], [2,6], [15,18] ]
```

1.  **Sort intervals by start time:**
    ```
    [ [1,3], [2,6], [8,10], [15,18] ]
    ```

2.  **Iterate and Merge:**
    `mergedIntervals = []`

    *   `currentInterval = [1,3]`
        *   `mergedIntervals` is empty. Add `[1,3]`.
        *   `mergedIntervals: [ [1,3] ]`

    *   `currentInterval = [2,6]`
        *   Last merged: `[1,3]`. `current.start (2)` <= `last.end (3)`. Overlap!
        *   Merge: `mergedIntervals.last().end = max(3, 6) = 6`.
        *   `mergedIntervals: [ [1,6] ]`

    *   `currentInterval = [8,10]`
        *   Last merged: `[1,6]`. `current.start (8)` > `last.end (6)`. No overlap. Add `[8,10]`.
        *   `mergedIntervals: [ [1,6], [8,10] ]`

    *   `currentInterval = [15,18]`
        *   Last merged: `[8,10]`. `current.start (15)` > `last.end (10)`. No overlap. Add `[15,18]`.
        *   `mergedIntervals: [ [1,6], [8,10], [15,18] ]`

Final `mergedIntervals`: `[ [1,6], [8,10], [15,18] ]`

**Time Complexity:** O(N log N) (dominated by the sorting step). The iteration is O(N).
**Space Complexity:** O(N) (for storing the sorted intervals and the `mergedIntervals` array). If the sort is in-place, then it's `O(N)` for the result array.

### Brute Force Approach (O(N^2))

A less efficient brute-force approach would involve repeatedly iterating through the list of intervals and merging any two overlapping intervals found. This process would need to be repeated until no more merges are possible in a full pass.

**Time Complexity:** O(N^2) in the worst case, as a single merge operation might enable further merges, requiring multiple passes over the array.
**Space Complexity:** O(N) for potentially creating new arrays in each merge pass.

### Edge Cases and Gotchas

*   **Empty input or single interval:** No merging needed, return as is.
*   **Intervals that touch:** E.g., `[1,2]` and `[2,3]`. These are usually considered overlapping and should merge to `[1,3]`. The condition `current.start <= last.end` correctly handles this.
*   **Fully contained intervals:** E.g., `[1,5]` and `[2,3]`. These are merged correctly: `max(5,3) = 5`, resulting in `[1,5]`.
*   **All intervals merge into one:** The algorithm handles this by continuously extending the last merged interval.
*   **Sorted input:** If input is already sorted, the sorting step is still `O(N log N)` but might perform faster in practice. The core logic remains `O(N)`.

---

## 4. Trapping Rain Water

### Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Optimal Solution: Two-Pointer Approach

This approach is highly efficient, achieving `O(N)` time complexity and `O(1)` extra space complexity.

**Logic:**

The amount of water a bar at index `i` can trap is `min(max_left_height, max_right_height) - height[i]`. The challenge is to find `max_left_height` and `max_right_height` efficiently for each `i`.

The two-pointer technique avoids pre-calculating two full `max_left` and `max_right` arrays. Instead, it maintains `leftMax` and `rightMax` as it moves two pointers (`left` and `right`) towards the center.

1.  Initialize `left = 0`, `right = n-1`.
2.  Initialize `leftMax = 0`, `rightMax = 0`.
3.  Initialize `totalWater = 0`.
4.  **Loop while `left < right`:**
    *   **If `height[left] < height[right]`:**
        *   This means the height of the current `left` bar is the limiting factor for the water we might trap *on the left side*.
        *   If `height[left] >= leftMax`: Update `leftMax = height[left]`. No water is trapped at this `left` position as it's a new highest boundary.
        *   Else (`height[left] < leftMax`): Water is trapped! Add `leftMax - height[left]` to `totalWater`.
        *   Move `left` pointer: `left++`.
    *   **Else (`height[right] <= height[left]`):**
        *   Symmetrically, `height[right]` is the limiting factor on the right side.
        *   If `height[right] >= rightMax`: Update `rightMax = height[right]`. No water trapped.
        *   Else (`height[right] < rightMax`): Water is trapped! Add `rightMax - height[right]` to `totalWater`.
        *   Move `right` pointer: `right--`.

**Why this works (Intuition):**
When `height[left] < height[right]`, we know that the `rightMax` (the maximum height to the right of `left`) will *at least* be `height[right]` (and potentially higher). Therefore, `height[left]` is guaranteed to be the shorter wall for any water calculation at `left`. We can confidently calculate `leftMax - height[left]` for the current `left` position, as the `right` boundary is ensured to be sufficient. The symmetrical logic applies when `height[right] <= height[left]`.

**Step-by-step Example (`height = [0,1,0,2,1,0,1,3,2,1,2,1]`):**
`n = 12`

Initial: `left=0, right=11, leftMax=0, rightMax=0, totalWater=0`

| Iter | `h[L]` | `h[R]` | Condition `h[L]<h[R]` | Action                               | `left` | `right` | `leftMax` | `rightMax` | `totalWater` |
| :--- | :----- | :----- | :-------------------- | :----------------------------------- | :----- | :------ | :-------- | :--------- | :----------- |
| 1    | `h[0]=0` | `h[11]=1` | True                  | `h[0] (0) >= leftMax (0)` -> `leftMax=0` | 1      | 11      | 0         | 0          | 0            |
| 2    | `h[1]=1` | `h[11]=1` | False                 | `h[11] (1) >= rightMax (0)` -> `rightMax=1` | 1      | 10      | 0         | 1          | 0            |
| 3    | `h[1]=1` | `h[10]=2` | True                  | `h[1] (1) >= leftMax (0)` -> `leftMax=1` | 2      | 10      | 1         | 1          | 0            |
| 4    | `h[2]=0` | `h[10]=2` | True                  | `h[2] (0) < leftMax (1)` -> `water+= (1-0)=1` | 3      | 10      | 1         | 1          | 1            |
| 5    | `h[3]=2` | `h[10]=2` | False                 | `h[10] (2) >= rightMax (1)` -> `rightMax=2` | 3      | 9       | 1         | 2          | 1            |
| 6    | `h[3]=2` | `h[9]=1`  | False                 | `h[9] (1) < rightMax (2)` -> `water+= (2-1)=1` | 3      | 8       | 1         | 2          | 2            |
| 7    | `h[3]=2` | `h[8]=2`  | False                 | `h[8] (2) >= rightMax (2)` -> `rightMax=2` | 3      | 7       | 1         | 2          | 2            |
| 8    | `h[3]=2` | `h[7]=3`  | True                  | `h[3] (2) >= leftMax (1)` -> `leftMax=2` | 4      | 7       | 2         | 2          | 2            |
| 9    | `h[4]=1` | `h[7]=3`  | True                  | `h[4] (1) < leftMax (2)` -> `water+= (2-1)=1` | 5      | 7       | 2         | 2          | 3            |
| 10   | `h[5]=0` | `h[7]=3`  | True                  | `h[5] (0) < leftMax (2)` -> `water+= (2-0)=2` | 6      | 7       | 2         | 2          | 5            |
| 11   | `h[6]=1` | `h[7]=3`  | True                  | `h[6] (1) < leftMax (2)` -> `water+= (2-1)=1` | 7      | 7       | 2         | 2          | 6            |
Loop ends (`left` is no longer `<` `right`).

Final `totalWater = 6`.

**Time Complexity:** O(N) (single pass with two pointers).
**Space Complexity:** O(1) (only a few variables).

### Alternative Approach: Dynamic Programming (Precomputing Max Heights)

This approach is also `O(N)` time complexity but uses `O(N)` extra space.

**Logic:**

1.  Create a `leftMax` array: `leftMax[i]` stores the maximum height encountered from index `0` up to `i`.
2.  Create a `rightMax` array: `rightMax[i]` stores the maximum height encountered from index `n-1` down to `i`.
3.  Iterate from `i = 0` to `n-1`. For each `i`, the water trapped is `max(0, min(leftMax[i], rightMax[i]) - height[i])`. Sum these values.

**Visual Example (`height = [0,1,0,2,1,0,1,3,2,1,2,1]`):**

`height` array:
```
[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
```

`leftMax` array:
```
// `leftMax[i] = max(leftMax[i-1], height[i])`
[0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]
```

`rightMax` array:
```
// `rightMax[i] = max(rightMax[i+1], height[i])`
[3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]
```

Calculate trapped water: `min(leftMax[i], rightMax[i]) - height[i]`
```
i=0: min(0,3)-0 = 0
i=1: min(1,3)-1 = 0
i=2: min(1,3)-0 = 1
i=3: min(2,3)-2 = 0
i=4: min(2,3)-1 = 1
i=5: min(2,3)-0 = 2
i=6: min(2,3)-1 = 1
i=7: min(3,3)-3 = 0
i=8: min(3,2)-2 = 0
i=9: min(3,2)-1 = 1
i=10: min(3,2)-2 = 0
i=11: min(3,1)-1 = 0
```
Total water: `0+0+1+0+1+2+1+0+0+1+0+0 = 6`.

**Time Complexity:** O(N) (three passes: one for `leftMax`, one for `rightMax`, one for summation).
**Space Complexity:** O(N) (for `leftMax` and `rightMax` arrays).

### Edge Cases and Gotchas

*   **`n <= 2`:** Cannot trap water with 0, 1, or 2 bars, as there are no "walls" on both sides. The code correctly returns 0.
*   **Monotonic arrays (increasing or decreasing):** No water can be trapped, as there's no depression. `[1,2,3,4,5]` or `[5,4,3,2,1]` will yield 0 water.
*   **Flat array:** E.g., `[2,2,2,2,2]`. No water trapped, result 0.
*   **Zero height bars:** Treated as any other bar, but contribute more to `min(leftMax, rightMax) - height[i]` if they are in a depression.
*   **Very tall outer bars:** If `height[0]` and `height[n-1]` are very tall, they act as large containers. The two-pointer approach effectively finds these "boundaries" dynamically.

---
```