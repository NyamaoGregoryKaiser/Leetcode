```markdown
# Array Manipulation Algorithms: Detailed Explanations

This document provides in-depth explanations for the array manipulation problems covered in this project. For each problem, we'll discuss the problem statement, various approaches (including brute-force and optimized solutions), step-by-step logic, illustrative examples, ASCII diagrams, and comprehensive time and space complexity analysis.

---

## Problem 1: Rotate Array

**Problem Statement:**
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is a non-negative integer. The array should be modified **in-place** if possible.

**Key Idea:** The rotation is cyclic. `k` can be greater than the array length, so we use `k % n` to find the effective number of rotations.

### Approach 1.1: Brute Force (Repeated Shifting)

**Concept:**
The simplest way to rotate an array to the right by `k` positions is to perform `k` single-position rotations. In each single rotation, the last element moves to the first position, and all other elements shift one position to the right.

**Step-by-step Logic:**
1.  Calculate `k = k % n` to handle cases where `k` is greater than `n`.
2.  Repeat `k` times:
    a.  Store the last element (`nums[n-1]`) in a temporary variable.
    b.  Shift all elements from `nums[n-2]` down to `nums[0]` one position to the right (i.e., `nums[j] = nums[j-1]`).
    c.  Place the temporary element at `nums[0]`.

**Example:** `nums = [1,2,3,4,5,6,7], k = 3`
1.  `k = 3 % 7 = 3`
2.  **Rotation 1:**
    `last = 7`
    `[1,2,3,4,5,6,7]` -> `[_,1,2,3,4,5,6]`
    `nums[0] = 7`
    Result: `[7,1,2,3,4,5,6]`
3.  **Rotation 2:**
    `last = 6`
    `[7,1,2,3,4,5,6]` -> `[_,7,1,2,3,4,5]`
    `nums[0] = 6`
    Result: `[6,7,1,2,3,4,5]`
4.  **Rotation 3:**
    `last = 5`
    `[6,7,1,2,3,4,5]` -> `[_,6,7,1,2,3,4]`
    `nums[0] = 5`
    Result: `[5,6,7,1,2,3,4]`

**Complexity Analysis:**
*   **Time Complexity:** `O(k * n)`. In the worst case, `k` can be up to `n-1` (after modulo operation), leading to `O(n^2)`. Each inner loop iterates `n` times.
*   **Space Complexity:** `O(1)` (in-place). Only a few extra variables are used.

### Approach 1.2: Using Extra Space

**Concept:**
Create a new array and place each element from the original array into its final rotated position. Then, copy all elements back to the original array.

**Step-by-step Logic:**
1.  Calculate `k = k % n`.
2.  Create a new array, `rotated`, of the same size as `nums`.
3.  Iterate through `nums` from `i = 0` to `n-1`.
    a.  For each element `nums[i]`, its new position will be `(i + k) % n`.
    b.  Assign `rotated[(i + k) % n] = nums[i]`.
4.  Copy all elements from `rotated` back to `nums`.

**Example:** `nums = [1,2,3,4,5,6,7], k = 3`
1.  `k = 3 % 7 = 3`
2.  `rotated = [_,_,_,_,_,_,_]`
3.  Fill `rotated`:
    *   `nums[0]=1` -> `rotated[(0+3)%7] = rotated[3] = 1`
    *   `nums[1]=2` -> `rotated[(1+3)%7] = rotated[4] = 2`
    *   `nums[2]=3` -> `rotated[(2+3)%7] = rotated[5] = 3`
    *   `nums[3]=4` -> `rotated[(3+3)%7] = rotated[6] = 4`
    *   `nums[4]=5` -> `rotated[(4+3)%7] = rotated[0] = 5`
    *   `nums[5]=6` -> `rotated[(5+3)%7] = rotated[1] = 6`
    *   `nums[6]=7` -> `rotated[(6+3)%7] = rotated[2] = 7`
    Resulting `rotated`: `[5,6,7,1,2,3,4]`
4.  Copy `rotated` to `nums`: `nums = [5,6,7,1,2,3,4]`

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. Two passes over the array (one to fill `rotated`, one to copy back).
*   **Space Complexity:** `O(n)` because a new array of size `n` is created.

### Approach 1.3: Reversal Algorithm (Optimal In-place)

**Concept:**
This clever in-place approach uses three reversals to achieve the rotation. It works by understanding that rotating an array `[A, B]` by `k` positions to the right results in `[B, A]`, where `B` is the last `k` elements and `A` is the first `n-k` elements.

**Step-by-step Logic:**
1.  Calculate `k = k % n`.
2.  **Reverse the entire array.** This puts the elements in reverse order.
    `[1,2,3,4,5,6,7]` -> `[7,6,5,4,3,2,1]`
3.  **Reverse the first `k` elements.** This corrects the order of the block that should be at the beginning after rotation.
    `[7,6,5,4,3,2,1]` (first 3 elements) -> `[5,6,7,4,3,2,1]`
4.  **Reverse the remaining `n-k` elements.** This corrects the order of the block that should be at the end after rotation.
    `[5,6,7,4,3,2,1]` (last 4 elements) -> `[5,6,7,1,2,3,4]`

**Example:** `nums = [1,2,3,4,5,6,7], k = 3`
Original: `[ 1, 2, 3, 4, 5, 6, 7 ]`
Partition: `[ (1,2,3,4), (5,6,7) ]`
Let `A = (1,2,3,4)` and `B = (5,6,7)`. We want `[B, A]`.

1.  **Reverse all:** `[ 7, 6, 5, 4, 3, 2, 1 ]`
    `[ reverse(A) , reverse(B) ]` -> `[ (4,3,2,1), (7,6,5) ]`
    (Wait, this isn't exactly `reverse(A)` and `reverse(B)`. It's `B_reversed` then `A_reversed`. Let's clarify with indices.)
    Original array `nums` is split into two logical parts: `nums[0...n-k-1]` and `nums[n-k...n-1]`.
    For `k=3, n=7`: `nums[0...3]` (elements 1,2,3,4) and `nums[4...6]` (elements 5,6,7).

    The elements that move to the front are `nums[n-k]` to `nums[n-1]`.
    The elements that move to the back are `nums[0]` to `nums[n-k-1]`.

    Let's re-trace with the standard definition:
    1.  Reverse the whole array: `[1,2,3,4,5,6,7]` -> `[7,6,5,4,3,2,1]`
    2.  Reverse the first `k` elements (indices `0` to `k-1`): `[7,6,5],4,3,2,1` -> `[5,6,7],4,3,2,1`
    3.  Reverse the remaining `n-k` elements (indices `k` to `n-1`): `5,6,7,[4,3,2,1]` -> `5,6,7,[1,2,3,4]`
    Final: `[5,6,7,1,2,3,4]`

**Diagram:**
```
Original: [ 1, 2, 3, 4, 5, 6, 7 ]  (n=7, k=3)
           <-------A------> <---B--->
           (n-k elements)   (k elements)

Step 1: Reverse entire array (0 to n-1)
        [ 7, 6, 5, 4, 3, 2, 1 ]
        <-----B'-----> <----A'---->

Step 2: Reverse first k elements (0 to k-1)
        [ 5, 6, 7, 4, 3, 2, 1 ]
        <---B---> <----A'---->

Step 3: Reverse remaining (n-k) elements (k to n-1)
        [ 5, 6, 7, 1, 2, 3, 4 ]
        <---B---> <----A---->
```

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. Each element is reversed at most 3 times.
*   **Space Complexity:** `O(1)` (in-place). Only a few extra variables are used for the `reverse` helper function.

---

## Problem 2: Maximum Subarray Sum (Kadane's Algorithm)

**Problem Statement:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Key Idea:** The maximum subarray problem can be solved efficiently using dynamic programming or a greedy approach by observing how the sum changes as we iterate through the array.

### Approach 2.1: Brute Force

**Concept:**
Iterate through all possible contiguous subarrays, calculate their sum, and keep track of the maximum sum found.

**Step-by-step Logic:**
1.  Initialize `maxSum = Integer.MIN_VALUE`.
2.  Use a nested loop:
    a.  Outer loop (`i`) iterates from `0` to `n-1` (start of subarray).
    b.  Inner loop (`j`) iterates from `i` to `n-1` (end of subarray).
    c.  Inside the inner loop, calculate the `currentSum` of `nums[i...j]`.
    d.  Update `maxSum = max(maxSum, currentSum)`.

**Example:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
*   `i=0`:
    *   `j=0`: `[-2]`, `currentSum = -2`, `maxSum = -2`
    *   `j=1`: `[-2,1]`, `currentSum = -1`, `maxSum = -1`
    *   `j=2`: `[-2,1,-3]`, `currentSum = -4`, `maxSum = -1`
    ...
*   `i=3`:
    *   `j=3`: `[4]`, `currentSum = 4`, `maxSum = 4` (assuming previous max was less than 4)
    *   `j=4`: `[4,-1]`, `currentSum = 3`, `maxSum = 4`
    *   `j=5`: `[4,-1,2]`, `currentSum = 5`, `maxSum = 5`
    *   `j=6`: `[4,-1,2,1]`, `currentSum = 6`, `maxSum = 6`
    ... and so on.

**Complexity Analysis:**
*   **Time Complexity:** `O(n^2)`. The outer loop runs `n` times, and the inner loop runs up to `n` times.
*   **Space Complexity:** `O(1)`. Only a few extra variables are used.

### Approach 2.2: Kadane's Algorithm (Optimal Dynamic Programming/Greedy)

**Concept:**
This algorithm iterates through the array once, keeping track of two values:
1.  `currentMax`: The maximum sum of a subarray ending at the *current* position.
2.  `globalMax`: The overall maximum sum found so far across all subarrays.

The logic for `currentMax` is: for an element `nums[i]`, the maximum sum ending at `i` is either `nums[i]` itself (starting a new subarray) or `nums[i]` added to the `currentMax` from the previous position (`currentMax + nums[i]`). We choose the larger of these two.
If `currentMax` becomes negative, it means that including the previous elements up to `i-1` makes the sum smaller than `nums[i]` alone. So, we essentially "discard" the previous sum and start a new subarray from `nums[i]`.

**Step-by-step Logic:**
1.  Initialize `globalMax = nums[0]` (or `Integer.MIN_VALUE`).
2.  Initialize `currentMax = nums[0]` (or `0` if empty array is allowed and can return `0`).
3.  Iterate from `i = 1` to `n-1`:
    a.  `currentMax = Math.max(nums[i], currentMax + nums[i])`
    b.  `globalMax = Math.max(globalMax, currentMax)`
4.  Return `globalMax`.

**Example:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
Initial: `globalMax = -2`, `currentMax = -2`

| Index `i` | `nums[i]` | `currentMax` calculation `max(nums[i], currentMax + nums[i])` | `currentMax` value | `globalMax` calculation `max(globalMax, currentMax)` | `globalMax` value |
| :-------- | :-------- | :-------------------------------------------------------------- | :----------------- | :--------------------------------------------------- | :---------------- |
| 0         | -2        | (initial)                                                       | -2                 | (initial)                                            | -2                |
| 1         | 1         | `max(1, -2 + 1) = max(1, -1) = 1`                               | 1                  | `max(-2, 1) = 1`                                     | 1                 |
| 2         | -3        | `max(-3, 1 + -3) = max(-3, -2) = -2`                            | -2                 | `max(1, -2) = 1`                                     | 1                 |
| 3         | 4         | `max(4, -2 + 4) = max(4, 2) = 4`                                | 4                  | `max(1, 4) = 4`                                      | 4                 |
| 4         | -1        | `max(-1, 4 + -1) = max(-1, 3) = 3`                              | 3                  | `max(4, 3) = 4`                                      | 4                 |
| 5         | 2         | `max(2, 3 + 2) = max(2, 5) = 5`                                 | 5                  | `max(4, 5) = 5`                                      | 5                 |
| 6         | 1         | `max(1, 5 + 1) = max(1, 6) = 6`                                 | 6                  | `max(5, 6) = 6`                                      | 6                 |
| 7         | -5        | `max(-5, 6 + -5) = max(-5, 1) = 1`                              | 1                  | `max(6, 1) = 6`                                      | 6                 |
| 8         | 4         | `max(4, 1 + 4) = max(4, 5) = 5`                                 | 5                  | `max(6, 5) = 6`                                      | 6                 |

Final `globalMax = 6`.

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. A single pass through the array.
*   **Space Complexity:** `O(1)`. Only a few extra variables are used.

---

## Problem 3: Trapping Rain Water

**Problem Statement:**
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Key Idea:** The amount of water a bar `i` can trap is determined by the minimum of the tallest bar to its left and the tallest bar to its right, minus its own height. `water_at_i = max(0, min(max_left_i, max_right_i) - height[i])`.

### Approach 3.1: Brute Force

**Concept:**
For each bar (excluding the first and last, which can't trap water), find the maximum height to its left and the maximum height to its right. Then, calculate the water it can hold.

**Step-by-step Logic:**
1.  Initialize `totalWater = 0`.
2.  Iterate from `i = 1` to `n-2` (excluding boundary bars).
    a.  Find `leftMax`: Iterate from `j = 0` to `i` to find the maximum height `height[j]`.
    b.  Find `rightMax`: Iterate from `j = i` to `n-1` to find the maximum height `height[j]`.
    c.  Calculate `water_at_current_bar = Math.max(0, Math.min(leftMax, rightMax) - height[i])`.
    d.  Add `water_at_current_bar` to `totalWater`.
3.  Return `totalWater`.

**Example:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Consider `i = 2` (bar at height `0`):
*   `leftMax`: iterate `j=0,1,2`. `max(height[0], height[1], height[2]) = max(0,1,0) = 1`.
*   `rightMax`: iterate `j=2,...,11`. `max(height[2],...,height[11]) = max(0,2,1,0,1,3,2,1,2,1) = 3`.
*   `min(leftMax, rightMax) = min(1, 3) = 1`.
*   `water_at_2 = min(1,3) - height[2] = 1 - 0 = 1`. `totalWater += 1`.

**Complexity Analysis:**
*   **Time Complexity:** `O(n^2)`. For each of the `n-2` bars, we perform two linear scans (left and right).
*   **Space Complexity:** `O(1)`. Only a few extra variables are used.

### Approach 3.2: Dynamic Programming (Precompute Max Heights)

**Concept:**
The brute-force approach repeatedly calculates `leftMax` and `rightMax` for each bar. We can optimize this by precomputing these values in separate arrays.

**Step-by-step Logic:**
1.  Initialize `totalWater = 0`.
2.  Create `leftMax[]` and `rightMax[]` arrays of size `n`.
3.  **Fill `leftMax` array (left-to-right pass):**
    `leftMax[0] = height[0]`.
    For `i = 1` to `n-1`: `leftMax[i] = Math.max(leftMax[i-1], height[i])`.
4.  **Fill `rightMax` array (right-to-left pass):**
    `rightMax[n-1] = height[n-1]`.
    For `i = n-2` down to `0`: `rightMax[i] = Math.max(rightMax[i+1], height[i])`.
5.  **Calculate total water (final pass):**
    For `i = 0` to `n-1`: `totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i])`.
6.  Return `totalWater`.

**Example:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
*   **`leftMax`:** `[0,1,1,2,2,2,2,3,3,3,3,3]`
*   **`rightMax`:** `[3,3,3,3,3,3,3,3,2,2,2,1]`

| Index `i` | `height[i]` | `leftMax[i]` | `rightMax[i]` | `min(leftMax, rightMax)` | `min - height[i]` | `Trapped Water` |
| :-------- | :---------- | :----------- | :------------ | :----------------------- | :---------------- | :-------------- |
| 0         | 0           | 0            | 3             | 0                        | 0                 | 0               |
| 1         | 1           | 1            | 3             | 1                        | 0                 | 0               |
| 2         | 0           | 1            | 3             | 1                        | 1                 | 1               |
| 3         | 2           | 2            | 3             | 2                        | 0                 | 0               |
| 4         | 1           | 2            | 3             | 2                        | 1                 | 1               |
| 5         | 0           | 2            | 3             | 2                        | 2                 | 2               |
| 6         | 1           | 2            | 3             | 2                        | 1                 | 1               |
| 7         | 3           | 3            | 3             | 3                        | 0                 | 0               |
| 8         | 2           | 3            | 2             | 2                        | 0                 | 0               |
| 9         | 1           | 3            | 2             | 2                        | 1                 | 1               |
| 10        | 2           | 3            | 2             | 2                        | 0                 | 0               |
| 11        | 1           | 3            | 1             | 1                        | 0                 | 0               |
Total Trapped Water = `1 + 1 + 2 + 1 + 1 = 6`.

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. Three passes over the array.
*   **Space Complexity:** `O(n)`. Two auxiliary arrays (`leftMax` and `rightMax`) of size `n` are used.

### Approach 3.3: Two Pointers (Optimal and O(1) Space)

**Concept:**
This approach improves upon the DP solution by observing that we don't need to store the full `leftMax` and `rightMax` arrays. We can use two pointers, `left` and `right`, starting from the ends of the array, and maintain `maxLeft` and `maxRight` (the maximum height encountered so far from the left/right).

The key insight is:
If `height[left] < height[right]`:
The amount of water at `height[left]` depends *only* on `maxLeft`. This is because we know there's a wall at `height[right]` (or something taller) that is at least as tall as `height[left]`. So, `min(maxLeft, maxRight)` will be limited by `maxLeft`. We can safely calculate water at `left` and then move `left` inwards.

If `height[right] <= height[left]`:
Similarly, the water at `height[right]` depends *only* on `maxRight`. We can safely calculate water at `right` and then move `right` inwards.

**Step-by-step Logic:**
1.  Initialize `totalWater = 0`, `left = 0`, `right = n-1`.
2.  Initialize `maxLeft = 0`, `maxRight = 0`.
3.  While `left < right`:
    a.  If `height[left] < height[right]`:
        i.  If `height[left] >= maxLeft`: Update `maxLeft = height[left]`.
        ii. Else: `totalWater += maxLeft - height[left]`.
        iii. Increment `left`.
    b.  Else (`height[right] <= height[left]`):
        i.  If `height[right] >= maxRight`: Update `maxRight = height[right]`.
        ii. Else: `totalWater += maxRight - height[right]`.
        iii. Decrement `right`.
4.  Return `totalWater`.

**Example:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Initial: `left=0`, `right=11`, `maxLeft=0`, `maxRight=0`, `totalWater=0`

| `l` | `r` | `h[l]` | `h[r]` | `maxL` | `maxR` | Condition `h[l]<h[r]` | Action                                                               | `totalWater` | `l` | `r` |
| :-- | :-- | :----- | :----- | :----- | :----- | :-------------------- | :------------------------------------------------------------------- | :----------- | :-: | :-: |
| 0   | 11  | 0      | 1      | 0      | 0      | True                  | `h[l]` (0) >= `maxL` (0), `maxL` = 0. `l`++                               | 0            | 1   | 11  |
| 1   | 11  | 1      | 1      | 0      | 0      | False (h[r]<=h[l])    | `h[r]` (1) >= `maxR` (0), `maxR` = 1. `r`--                               | 0            | 1   | 10  |
| 1   | 10  | 1      | 2      | 0      | 1      | True                  | `h[l]` (1) >= `maxL` (0), `maxL` = 1. `l`++                               | 0            | 2   | 10  |
| 2   | 10  | 0      | 2      | 1      | 1      | True                  | `h[l]` (0) < `maxL` (1), `totalWater` += `maxL` - `h[l]` = 1-0 = 1. `l`++ | 1            | 3   | 10  |
| 3   | 10  | 2      | 2      | 1      | 1      | False (h[r]<=h[l])    | `h[r]` (2) >= `maxR` (1), `maxR` = 2. `r`--                               | 1            | 3   | 9   |
| 3   | 9   | 2      | 1      | 1      | 2      | False (h[r]<=h[l])    | `h[r]` (1) < `maxR` (2), `totalWater` += `maxR` - `h[r]` = 2-1 = 1. `r`-- | 2            | 3   | 8   |
| 3   | 8   | 2      | 2      | 1      | 2      | False (h[r]<=h[l])    | `h[r]` (2) >= `maxR` (2), `maxR` = 2. `r`--                               | 2            | 3   | 7   |
| 3   | 7   | 2      | 3      | 1      | 2      | True                  | `h[l]` (2) >= `maxL` (1), `maxL` = 2. `l`++                               | 2            | 4   | 7   |
| 4   | 7   | 1      | 3      | 2      | 2      | True                  | `h[l]` (1) < `maxL` (2), `totalWater` += `maxL` - `h[l]` = 2-1 = 1. `l`++ | 3            | 5   | 7   |
| 5   | 7   | 0      | 3      | 2      | 2      | True                  | `h[l]` (0) < `maxL` (2), `totalWater` += `maxL` - `h[l]` = 2-0 = 2. `l`++ | 5            | 6   | 7   |
| 6   | 7   | 1      | 3      | 2      | 2      | True                  | `h[l]` (1) < `maxL` (2), `totalWater` += `maxL` - `h[l]` = 2-1 = 1. `l`++ | 6            | 7   | 7   |
Loop ends as `left` is no longer less than `right`.
Final `totalWater = 6`.

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. A single pass through the array, as `left` and `right` pointers traverse the array only once.
*   **Space Complexity:** `O(1)`. Only a few extra variables are used.

---

## Problem 4: Product of Array Except Self

**Problem Statement:**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and **without using the division operation**.

**Key Idea:**
The product of all elements except `nums[i]` can be thought of as `(product of elements to the left of i) * (product of elements to the right of i)`. We can compute these two products separately and then combine them.

### Approach 4.1: Brute Force (using Division - violates constraint)

**Concept:**
Calculate the product of all elements in the array. Then, for each element `nums[i]`, the result `answer[i]` is simply `total_product / nums[i]`. This is simple but violates the "no division" constraint and requires special handling for zeros.

**Handling Zeros:**
*   **No zeros:** Straightforward division.
*   **Exactly one zero:** The `total_product` will be zero. For `nums[i]` where `nums[i] != 0`, `answer[i]` will be `0`. For the index `j` where `nums[j] == 0`, `answer[j]` will be the product of all other non-zero elements.
*   **Two or more zeros:** The `total_product` will be zero. All elements `answer[i]` will be `0` because any product excluding one element will still contain at least one zero.

**Step-by-step Logic (with zero handling):**
1.  Initialize `totalProduct = 1`, `zeroCount = 0`, `indexOfFirstZero = -1`.
2.  Iterate through `nums`:
    a.  If `nums[i] == 0`, increment `zeroCount` and store `indexOfFirstZero = i` if it's the first zero.
    b.  Else, `totalProduct *= nums[i]`.
3.  Create `answer[]` array of size `n`.
4.  If `zeroCount > 1`: return `answer` (which is already filled with zeros).
5.  If `zeroCount == 1`:
    a.  Set `answer[indexOfFirstZero] = totalProduct`.
    b.  Return `answer`.
6.  If `zeroCount == 0`:
    a.  For `i = 0` to `n-1`: `answer[i] = totalProduct / nums[i]`.
    b.  Return `answer`.

**Example:** `nums = [1,2,3,4]`
1.  `totalProduct = 1 * 2 * 3 * 4 = 24`. `zeroCount = 0`.
2.  `answer[0] = 24 / 1 = 24`
3.  `answer[1] = 24 / 2 = 12`
4.  `answer[2] = 24 / 3 = 8`
5.  `answer[3] = 24 / 4 = 6`
Result: `[24, 12, 8, 6]`

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. Two passes (one for total product, one for results).
*   **Space Complexity:** `O(1)` (excluding the output array).

### Approach 4.2: Two Pass (Prefix/Suffix Products - Optimal, No Division)

**Concept:**
To avoid division, we can build up the result array by combining prefix products and suffix products.
1.  First pass (left-to-right): Calculate `answer[i]` as the product of all elements to the *left* of `nums[i]`.
2.  Second pass (right-to-left): Multiply `answer[i]` by the product of all elements to the *right* of `nums[i]`.

**Step-by-step Logic:**
1.  Create `answer[]` array of size `n`.
2.  **Left Pass (calculate prefix products):**
    a.  Initialize `answer[0] = 1` (since there are no elements to the left of the first element).
    b.  For `i = 1` to `n-1`: `answer[i] = answer[i-1] * nums[i-1]`.
    *After this pass, `answer[i]` holds the product of `nums[0]...nums[i-1]`.*
3.  **Right Pass (calculate suffix products and combine):**
    a.  Initialize `rightProduct = 1` (this will store the product of elements to the right of the current index).
    b.  For `i = n-1` down to `0`:
        i.  `answer[i] = answer[i] * rightProduct`. (Multiply left product by right product).
        ii. `rightProduct = rightProduct * nums[i]`. (Update `rightProduct` for the next iteration, moving left).
4.  Return `answer`.

**Example:** `nums = [1,2,3,4]`

1.  Initialize `answer = [_,_,_,_]` (or `[0,0,0,0]` in Java).

2.  **Left Pass:**
    *   `answer[0] = 1`
    *   `i=1`: `answer[1] = answer[0] * nums[0] = 1 * 1 = 1`
    *   `i=2`: `answer[2] = answer[1] * nums[1] = 1 * 2 = 2`
    *   `i=3`: `answer[3] = answer[2] * nums[2] = 2 * 3 = 6`
    After Left Pass: `answer = [1, 1, 2, 6]`
    (This `answer[i]` now holds `product of elements to the left of i`)

3.  **Right Pass:**
    *   Initialize `rightProduct = 1`
    *   `i=3`:
        *   `answer[3] = answer[3] * rightProduct = 6 * 1 = 6`
        *   `rightProduct = rightProduct * nums[3] = 1 * 4 = 4`
    *   `i=2`:
        *   `answer[2] = answer[2] * rightProduct = 2 * 4 = 8`
        *   `rightProduct = rightProduct * nums[2] = 4 * 3 = 12`
    *   `i=1`:
        *   `answer[1] = answer[1] * rightProduct = 1 * 12 = 12`
        *   `rightProduct = rightProduct * nums[1] = 12 * 2 = 24`
    *   `i=0`:
        *   `answer[0] = answer[0] * rightProduct = 1 * 24 = 24`
        *   `rightProduct = rightProduct * nums[0] = 24 * 1 = 24`
    After Right Pass: `answer = [24, 12, 8, 6]`

**Diagram:**
```
nums:    [ 1,   2,   3,   4 ]

Left pass (prefix products in `answer`):
answer:  [ 1,   1,   2,   6 ]   (e.g., answer[2] = nums[0]*nums[1] = 1*2 = 2)
       ^    ^    ^    ^
       |    |    |    |
       product of elements BEFORE current index

Right pass (suffix products combined with `answer`):
       rightProduct = 1 (initially)

i=3: nums[3]=4
  answer[3] = answer[3] * rightProduct = 6 * 1 = 6
  rightProduct = rightProduct * nums[3] = 1 * 4 = 4

i=2: nums[2]=3
  answer[2] = answer[2] * rightProduct = 2 * 4 = 8
  rightProduct = rightProduct * nums[2] = 4 * 3 = 12

i=1: nums[1]=2
  answer[1] = answer[1] * rightProduct = 1 * 12 = 12
  rightProduct = rightProduct * nums[1] = 12 * 2 = 24

i=0: nums[0]=1
  answer[0] = answer[0] * rightProduct = 1 * 24 = 24
  rightProduct = rightProduct * nums[0] = 24 * 1 = 24

Final answer: [ 24, 12, 8, 6 ]
```

**Complexity Analysis:**
*   **Time Complexity:** `O(n)`. Two passes over the array.
*   **Space Complexity:** `O(1)` (excluding the output array). The problem usually allows the output array not to count towards extra space. If a new array for suffix products were used, it would be `O(n)`.

---
```