# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the concepts behind some of the algorithms.

---

## 1. Rotate Array - Three Reversals Method

**Problem**: Rotate `[1, 2, 3, 4, 5, 6, 7]` by `k = 3` steps to the right.
**Expected Result**: `[5, 6, 7, 1, 2, 3, 4]`

Initial Array:
```
[ 1 | 2 | 3 | 4 | 5 | 6 | 7 ]
  0   1   2   3   4   5   6
```

**Step 1: Reverse the entire array.**
`std::reverse(nums.begin(), nums.end());`
The array becomes `[7, 6, 5, 4, 3, 2, 1]`.

```
[ 7 | 6 | 5 | 4 | 3 | 2 | 1 ]
```

**Step 2: Reverse the first `k` elements.**
Here, `k=3`. So, reverse `nums[0]` to `nums[2]`.
`std::reverse(nums.begin(), nums.begin() + k);`
The array becomes `[5, 6, 7, 4, 3, 2, 1]`.

```
[ 5 | 6 | 7 | 4 | 3 | 2 | 1 ]
  ^------^ (reversed)
```

**Step 3: Reverse the remaining `n-k` elements.**
Here, `n=7, k=3`, so `n-k=4`. Reverse `nums[3]` to `nums[6]`.
`std::reverse(nums.begin() + k, nums.end());`
The array becomes `[5, 6, 7, 1, 2, 3, 4]`.

```
[ 5 | 6 | 7 | 1 | 2 | 3 | 4 ]
            ^------------^ (reversed)
```

**Result:** The array is now correctly rotated!

---

## 2. Product of Array Except Self - Optimal Method

**Problem**: `nums = [1, 2, 3, 4]`
**Expected Result**: `[24, 12, 8, 6]`

### Step 1: Left Pass (Calculate prefix products)

`result` array initialized. `right_product` starts at 1.

Original `nums`:
```
  [ 1 | 2 | 3 | 4 ]
```

Initialize `result` and `right_product`:
```
  [ 1 | 1 | 1 | 1 ]   (result array for storing left products initially)
      ^
      result[0] = 1 (nothing to the left)
```

**Iteration 1: `i = 1`**
`result[1] = result[0] * nums[0]`
`result[1] = 1 * 1 = 1`
`result` becomes `[1, 1, 1, 1]`

**Iteration 2: `i = 2`**
`result[2] = result[1] * nums[1]`
`result[2] = 1 * 2 = 2`
`result` becomes `[1, 1, 2, 1]`

**Iteration 3: `i = 3`**
`result[3] = result[2] * nums[2]`
`result[3] = 2 * 3 = 6`
`result` becomes `[1, 1, 2, 6]`

After Left Pass:
```
Left Products (in result array):
  [ 1 | 1 | 2 | 6 ]
```
(`result[i]` now holds product of `nums[0]...nums[i-1]`)

### Step 2: Right Pass (Calculate suffix products and combine)

`right_product = 1` initially. Iterate from right to left.

**Iteration 1: `i = 3` (`nums[3] = 4`)**
`result[3] = result[3] * right_product`
`result[3] = 6 * 1 = 6`
`right_product = right_product * nums[3]`
`right_product = 1 * 4 = 4`
`result` is now `[1, 1, 2, 6]`

**Iteration 2: `i = 2` (`nums[2] = 3`)**
`result[2] = result[2] * right_product`
`result[2] = 2 * 4 = 8`
`right_product = right_product * nums[2]`
`right_product = 4 * 3 = 12`
`result` is now `[1, 1, 8, 6]`

**Iteration 3: `i = 1` (`nums[1] = 2`)**
`result[1] = result[1] * right_product`
`result[1] = 1 * 12 = 12`
`right_product = right_product * nums[1]`
`right_product = 12 * 2 = 24`
`result` is now `[1, 12, 8, 6]`

**Iteration 4: `i = 0` (`nums[0] = 1`)**
`result[0] = result[0] * right_product`
`result[0] = 1 * 24 = 24`
`right_product = right_product * nums[0]`
`right_product = 24 * 1 = 24`
`result` is now `[24, 12, 8, 6]`

Final Result:
```
  [ 24 | 12 | 8 | 6 ]
```

---

## 3. Maximum Subarray Sum - Kadane's Algorithm

**Problem**: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
**Expected Result**: `6` (from subarray `[4, -1, 2, 1]`)

`global_max` and `current_max` track the largest sum found and the largest sum ending at the current position, respectively.

Initial: `global_max = -2`, `current_max = -2` (from `nums[0]`)

| Index (i) | `nums[i]` | `current_max = max(nums[i], current_max + nums[i])` | `global_max = max(global_max, current_max)` | Explanation                                       |
| :-------- | :-------- | :---------------------------------------------------- | :-------------------------------------------- | :------------------------------------------------ |
| 0         | -2        | (initial) -2                                        | (initial) -2                                  | Base case                                         |
| 1         | 1         | `max(1, -2 + 1) = max(1, -1) = 1`                     | `max(-2, 1) = 1`                              | Start new subarray [1]                            |
| 2         | -3        | `max(-3, 1 + -3) = max(-3, -2) = -2`                  | `max(1, -2) = 1`                              | Extend [1,-3], but sum is -2, so current_max -2 |
| 3         | 4         | `max(4, -2 + 4) = max(4, 2) = 4`                      | `max(1, 4) = 4`                               | Start new subarray [4] (because -2 is bad)      |
| 4         | -1        | `max(-1, 4 + -1) = max(-1, 3) = 3`                    | `max(4, 3) = 4`                               | Extend [4,-1]                                     |
| 5         | 2         | `max(2, 3 + 2) = max(2, 5) = 5`                       | `max(4, 5) = 5`                               | Extend [4,-1,2]                                   |
| 6         | 1         | `max(1, 5 + 1) = max(1, 6) = 6`                       | `max(5, 6) = 6`                               | Extend [4,-1,2,1]                                 |
| 7         | -5        | `max(-5, 6 + -5) = max(-5, 1) = 1`                    | `max(6, 1) = 6`                               | Extend [4,-1,2,1,-5] sum becomes 1                |
| 8         | 4         | `max(4, 1 + 4) = max(4, 5) = 5`                       | `max(6, 5) = 6`                               | Extend [4,-1,2,1,-5,4] sum becomes 5              |

Final `global_max = 6`.

---

## 4. Merge Intervals

**Problem**: `intervals = [[1,3], [2,6], [8,10], [15,18]]`
**Expected Result**: `[[1,6], [8,10], [15,18]]`

### Step 1: Sort the intervals by start time.

Original:
```
[[1,3], [2,6], [8,10], [15,18]]
```
(Already sorted in this example)

### Step 2: Iterate and Merge

Initialize `merged_intervals` with the first interval:
`merged_intervals = [[1,3]]`

**Process `[2,6]`:**
*   `last_merged = [1,3]`
*   `current = [2,6]`
*   Overlap? `current.start (2) <= last_merged.end (3)` -> YES.
*   Merge: Update `last_merged.end = max(last_merged.end (3), current.end (6)) = 6`.
*   `merged_intervals` becomes `[[1,6]]`

**Process `[8,10]`:**
*   `last_merged = [1,6]`
*   `current = [8,10]`
*   Overlap? `current.start (8) <= last_merged.end (6)` -> NO (`8 > 6`).
*   No overlap: Add `current` as a new interval.
*   `merged_intervals` becomes `[[1,6], [8,10]]`

**Process `[15,18]`:**
*   `last_merged = [8,10]`
*   `current = [15,18]`
*   Overlap? `current.start (15) <= last_merged.end (10)` -> NO (`15 > 10`).
*   No overlap: Add `current` as a new interval.
*   `merged_intervals` becomes `[[1,6], [8,10], [15,18]]`

All intervals processed. Return `merged_intervals`.

Final Result:
```
[[1,6], [8,10], [15,18]]
```
---