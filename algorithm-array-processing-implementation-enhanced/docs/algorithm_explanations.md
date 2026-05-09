# Algorithm Explanations

This document provides detailed explanations for the optimal algorithms used in the `array_manipulation_project`. Each explanation covers the core idea, step-by-step logic, and why it's efficient.

---

## 1. Rotate Array (Reverse Method)

**Problem:** Given an array, rotate the array to the right by `k` steps.

**Core Idea:**
The reverse method is an elegant and efficient in-place solution. It leverages the property that rotating an array by `k` positions to the right is equivalent to:
1. Reversing the entire array.
2. Reversing the first `k` elements.
3. Reversing the remaining `n-k` elements.

**Step-by-Step Logic:**

Let `nums` be the array of length `n` and `k` be the number of steps.
First, handle `k %= n` to ensure `k` is within the array bounds and represents the effective rotation. If `k` is 0, no rotation is needed.

1.  **Reverse the entire array:**
    This brings the elements that should be at the end to the beginning, and vice versa.
    Example: `nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`
    After reversing all: `[7, 6, 5, 4, 3, 2, 1]`

2.  **Reverse the first `k` elements:**
    The elements that are now at `nums[0...k-1]` are the `k` elements that were originally at the end of the array. Reversing them puts them in their correct relative order for the rotated array.
    Example: `[7, 6, 5, 4, 3, 2, 1]`
    After reversing first `k=3` elements: `[5, 6, 7, 4, 3, 2, 1]`

3.  **Reverse the remaining `n-k` elements:**
    The elements now at `nums[k...n-1]` are the `n-k` elements that were originally at the beginning of the array. Reversing them also puts them in their correct relative order.
    Example: `[5, 6, 7, 4, 3, 2, 1]`
    After reversing `n-k=4` elements from index 3 to 6: `[5, 6, 7, 1, 2, 3, 4]`

The array is now correctly rotated.

**Complexity Analysis:**
*   **Time Complexity:** O(n). Each element is swapped at most a constant number of times (three passes over the array or parts of it).
*   **Space Complexity:** O(1). All operations are performed in-place.

---

## 2. Maximum Subarray Sum (Kadane's Algorithm)

**Problem:** Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

**Core Idea:**
Kadane's algorithm is a dynamic programming approach that maintains the maximum sum found so far (`global_max`) and the maximum sum of a subarray ending at the current position (`current_max`). It makes a single pass through the array.

**Step-by-Step Logic:**

Let `nums` be the input array.
Initialize `global_max = nums[0]` and `current_max = nums[0]`.

Iterate from the second element (`i = 1`) to the end of the array:

For each `nums[i]`:

1.  **Update `current_max`:**
    The maximum sum of a subarray ending at `nums[i]` can either be:
    *   `nums[i]` itself (starting a new subarray from `nums[i]`)
    *   `current_max + nums[i]` (extending the previous subarray)
    We take the maximum of these two options: `current_max = max(nums[i], current_max + nums[i])`.
    If `current_max` becomes negative before adding `nums[i]`, it means the prefix sum up to `i-1` was detrimental, so it's better to start a new subarray from `nums[i]`.

2.  **Update `global_max`:**
    `global_max` keeps track of the overall maximum sum encountered so far.
    It is updated as `global_max = max(global_max, current_max)`.

After iterating through all elements, `global_max` will hold the maximum subarray sum.

**Example:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

| Index | Element (`nums[i]`) | `current_max = max(nums[i], current_max + nums[i])` | `global_max = max(global_max, current_max)` |
| :---- | :------------------ | :-------------------------------------------------- | :------------------------------------------ |
| Initial | -                   | `-2` (nums[0])                                      | `-2` (nums[0])                              |
| 1     | `1`                 | `max(1, -2 + 1) = max(1, -1) = 1`                   | `max(-2, 1) = 1`                            |
| 2     | `-3`                | `max(-3, 1 + -3) = max(-3, -2) = -2`                | `max(1, -2) = 1`                            |
| 3     | `4`                 | `max(4, -2 + 4) = max(4, 2) = 4`                    | `max(1, 4) = 4`                             |
| 4     | `-1`                | `max(-1, 4 + -1) = max(-1, 3) = 3`                  | `max(4, 3) = 4`                             |
| 5     | `2`                 | `max(2, 3 + 2) = max(2, 5) = 5`                     | `max(4, 5) = 5`                             |
| 6     | `1`                 | `max(1, 5 + 1) = max(1, 6) = 6`                     | `max(5, 6) = 6`                             |
| 7     | `-5`                | `max(-5, 6 + -5) = max(-5, 1) = 1`                  | `max(6, 1) = 6`                             |
| 8     | `4`                 | `max(4, 1 + 4) = max(4, 5) = 5`                     | `max(6, 5) = 6`                             |

Final `global_max = 6`.

**Complexity Analysis:**
*   **Time Complexity:** O(n). A single pass through the array.
*   **Space Complexity:** O(1). Uses a few constant extra variables.

---

## 3. Merge Intervals

**Problem:** Given a collection of intervals, merge all overlapping intervals.

**Core Idea:**
The key to efficiently merging intervals is to first sort them. Once sorted by their start times, overlapping intervals will always be adjacent or partially overlapping. We can then iterate through the sorted intervals and merge them greedily.

**Step-by-Step Logic:**

Let `intervals` be a list of `[start, end]` pairs.

1.  **Sort Intervals:**
    Sort the entire list of intervals based on their start times. If start times are equal, sort by end times (though not strictly necessary for correctness, it can make the order deterministic).
    Example: `intervals = [[1, 3], [8, 10], [2, 6], [15, 18]]`
    Sorted: `[[1, 3], [2, 6], [8, 10], [15, 18]]`

2.  **Initialize `merged_intervals`:**
    Create an empty list `merged_intervals` to store the non-overlapping results.

3.  **Iterate and Merge:**
    Iterate through each `current_interval` in the sorted `intervals` list:
    *   **Case 1: No overlap or `merged_intervals` is empty:**
        If `merged_intervals` is empty, or if the `current_interval[0]` (current start time) is greater than the `merged_intervals[-1][1]` (end time of the last merged interval), it means there's no overlap with the last merged interval. So, simply add `current_interval` to `merged_intervals`.
    *   **Case 2: Overlap:**
        If there is an overlap (i.e., `current_interval[0]` is less than or equal to `merged_intervals[-1][1]`), update the end time of the last interval in `merged_intervals`. The new end time will be `max(merged_intervals[-1][1], current_interval[1])`. This effectively extends the merged interval to cover the current one.

**Example:** `intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]`

1.  Sorted `intervals`: `[[1, 3], [2, 6], [8, 10], [15, 18]]`
2.  `merged_intervals = []`

Processing:

*   **`current_interval = [1, 3]`**: `merged_intervals` is empty. Add `[1, 3]`.
    `merged_intervals = [[1, 3]]`

*   **`current_interval = [2, 6]`**: `2 <= merged_intervals[-1][1]` (2 <= 3). Overlap!
    Update `merged_intervals[-1][1] = max(3, 6) = 6`.
    `merged_intervals = [[1, 6]]`

*   **`current_interval = [8, 10]`**: `8 > merged_intervals[-1][1]` (8 > 6). No overlap. Add `[8, 10]`.
    `merged_intervals = [[1, 6], [8, 10]]`

*   **`current_interval = [15, 18]`**: `15 > merged_intervals[-1][1]` (15 > 10). No overlap. Add `[15, 18]`.
    `merged_intervals = [[1, 6], [8, 10], [15, 18]]`

Final `merged_intervals = [[1, 6], [8, 10], [15, 18]]`.

**Complexity Analysis:**
*   **Time Complexity:** O(n log n). This is dominated by the initial sorting step. The iteration and merging process takes O(n).
*   **Space Complexity:** O(n). For storing the `merged_intervals` list. Python's Timsort might also use O(n) auxiliary space in the worst case.

---

## 4. Two Sum Variations (Hash Map and Two Pointers)

These problems involve finding combinations of numbers that sum to a target. Different variations benefit from different techniques.

### a) Two Sum (Hash Map)

**Problem:** Find two numbers in an array that add up to a specific target and return their indices.

**Core Idea:**
A hash map (dictionary in Python) allows for O(1) average time lookups. We can iterate through the array, and for each number, calculate the `complement` needed to reach the target. We then check if this complement is already in our hash map.

**Step-by-Step Logic:**

1.  **Initialize `num_map`:** Create an empty hash map (e.g., `dict()` in Python) to store `(number: index)` pairs encountered so far.

2.  **Iterate and Check:** For each `num` at `index i` in the array:
    *   Calculate `complement = target - num`.
    *   **Check in `num_map`:** If `complement` exists as a key in `num_map`:
        This means we have found the two numbers. The indices are `num_map[complement]` and the current index `i`. Return `[num_map[complement], i]`.
    *   **Add to `num_map`:** If `complement` is not found, add the current `num` and its `index i` to the `num_map` (`num_map[num] = i`).

**Example:** `nums = [2, 7, 11, 15]`, `target = 9`

1.  `num_map = {}`

Processing:

*   `i = 0`, `num = 2`:
    `complement = 9 - 2 = 7`. `7` is not in `num_map`.
    Add `(2: 0)` to `num_map`. `num_map = {2: 0}`
*   `i = 1`, `num = 7`:
    `complement = 9 - 7 = 2`. `2` *is* in `num_map`! Its index is `num_map[2] = 0`.
    Return `[0, 1]`.

**Complexity Analysis:**
*   **Time Complexity:** O(n) on average. Each lookup and insertion in a hash map takes O(1) on average. In the worst case (hash collisions), it could degrade to O(n), but this is rare with good hash functions.
*   **Space Complexity:** O(n). In the worst case, all `n` elements might be stored in the hash map.

---

### b) Three Sum (Two Pointers on Sorted Array)

**Problem:** Find all unique triplets in an array which sum to zero.

**Core Idea:**
This builds upon the Two Sum problem. By sorting the array first, we can reduce the problem to iterating through each number `nums[i]` and then finding two other numbers `nums[left]` and `nums[right]` in the *remaining sorted subarray* that sum to `-nums[i]` (our `target`). The two-pointer technique efficiently finds these pairs while handling duplicates.

**Step-by-Step Logic:**

1.  **Sort the array:** `nums.sort()`. This allows using two pointers and easily skipping duplicates.
    Example: `nums = [-1, 0, 1, 2, -1, -4]`
    Sorted: `[-4, -1, -1, 0, 1, 2]`

2.  **Iterate with `i` (first element):**
    Loop `i` from `0` to `n-3` (to allow for `left` and `right` pointers).
    *   **Skip duplicates for `nums[i]`:** If `i > 0` and `nums[i] == nums[i-1]`, continue to the next `i` to avoid duplicate triplets.
    *   Set `target = -nums[i]`. We need to find two numbers that sum to this `target`.
    *   Initialize `left = i + 1` and `right = n - 1`.

3.  **Two-Pointer Scan (for `left` and `right`):**
    While `left < right`:
    *   Calculate `current_sum = nums[left] + nums[right]`.
    *   **If `current_sum == target`:**
        *   Found a triplet: `[nums[i], nums[left], nums[right]]`. Add it to the result list.
        *   Increment `left` and decrement `right`.
        *   **Skip duplicates for `nums[left]` and `nums[right]`:**
            While `left < right` and `nums[left] == nums[left-1]`, increment `left`.
            While `left < right` and `nums[right] == nums[right+1]`, decrement `right`.
            (Careful with index; `nums[left] == nums[left+1]` is typically used when `left` is incremented. `nums[right] == nums[right-1]` for `right` decremented.)
            The provided code uses `nums[left] == nums[left+1]` and `nums[right] == nums[right-1]` after finding a valid triplet and before incrementing/decrementing. This is to skip subsequent duplicate values that would yield the same triplet.
    *   **If `current_sum < target`:**
        Increment `left` to increase the sum.
    *   **If `current_sum > target`:**
        Decrement `right` to decrease the sum.

**Example (simplified path):** `nums = [-4, -1, -1, 0, 1, 2]`

*   `i = 0`, `nums[i] = -4`. `target = 4`. `left = 1`, `right = 5`.
    *   `nums[left] + nums[right]` = `-1 + 2 = 1`. `1 < 4`. `left++` -> `left = 2`.
    *   `nums[left] + nums[right]` = `-1 + 2 = 1`. `1 < 4`. `left++` -> `left = 3`.
    *   `nums[left] + nums[right]` = `0 + 2 = 2`. `2 < 4`. `left++` -> `left = 4`.
    *   `nums[left] + nums[right]` = `1 + 2 = 3`. `3 < 4`. `left++` -> `left = 5`.
    *   `left >= right`. Loop ends.
*   `i = 1`, `nums[i] = -1`. (Skip `i=1` because `nums[1] == nums[0]` is false)
    `target = 1`. `left = 2`, `right = 5`.
    *   `nums[left] + nums[right]` = `-1 + 2 = 1`. `1 == 1`. Found triplet `[-1, -1, 2]`. Add to result. `left++`, `right--`. `left=3, right=4`.
        (Skip duplicates for `left` and `right` now if any.) `nums[left]=0, nums[left-1]=-1`, not dup. `nums[right]=1, nums[right+1]=2`, not dup.
    *   `nums[left] + nums[right]` = `0 + 1 = 1`. `1 == 1`. Found triplet `[-1, 0, 1]`. Add to result. `left++`, `right--`. `left=4, right=3`.
    *   `left >= right`. Loop ends.
*   `i = 2`, `nums[i] = -1`. Skip, because `nums[2] == nums[1]`.
*   ...and so on.

**Complexity Analysis:**
*   **Time Complexity:** O(n^2). Sorting takes O(n log n). The outer loop runs `n` times. The inner two-pointer loop runs O(n) times. Total: O(n log n + n * n) = O(n^2).
*   **Space Complexity:** O(log n) to O(n) for sorting (depends on implementation). O(number of triplets) for the result list.

### c) Four Sum (Extension of Three Sum)

**Problem:** Find all unique quadruplets in an array which sum to a specific target.

**Core Idea:**
This is a direct extension of the Three Sum problem. We add another nested loop to fix the first two elements, and then use the two-pointer technique for the remaining two.

**Step-by-Step Logic:**

1.  **Sort the array:** `nums.sort()`.

2.  **Outer loops for `i` and `j` (first two elements):**
    *   Loop `i` from `0` to `n-4`.
        *   **Skip duplicates for `nums[i]`:** If `i > 0` and `nums[i] == nums[i-1]`, continue.
    *   Loop `j` from `i + 1` to `n-3`.
        *   **Skip duplicates for `nums[j]`:** If `j > i + 1` and `nums[j] == nums[j-1]`, continue.
        *   Calculate `two_sum_target = target - nums[i] - nums[j]`.
        *   Initialize `left = j + 1` and `right = n - 1`.

3.  **Inner Two-Pointer Scan (for `left` and `right`):**
    While `left < right`:
    *   Calculate `current_sum = nums[left] + nums[right]`.
    *   **If `current_sum == two_sum_target`:**
        *   Found a quadruplet: `[nums[i], nums[j], nums[left], nums[right]]`. Add it to the result.
        *   Increment `left` and decrement `right`.
        *   **Skip duplicates for `nums[left]` and `nums[right]`:** (Similar to Three Sum)
            While `left < right` and `nums[left] == nums[left-1]`, increment `left`.
            While `left < right` and `nums[right] == nums[right+1]`, decrement `right`.
    *   **If `current_sum < two_sum_target`:** Increment `left`.
    *   **If `current_sum > two_sum_target`:** Decrement `right`.

**Complexity Analysis:**
*   **Time Complexity:** O(n^3). Sorting is O(n log n). The two outer loops run O(n^2) times, and the inner two-pointer loop runs O(n) times. Total: O(n log n + n * n * n) = O(n^3).
*   **Space Complexity:** O(log n) to O(n) for sorting. O(number of quadruplets) for the result list.

---

## 5. Next Permutation

**Problem:** Rearrange numbers into the lexicographically next greater permutation. If no such arrangement is possible, rearrange it as the lowest possible order (sorted in ascending order). Must be in-place and use constant extra memory.

**Core Idea:**
The algorithm finds the "pivot" point where the change needs to occur and then makes the smallest possible change to the right of that pivot to get the next permutation. This involves finding the rightmost element that can be swapped to increase the number, and then sorting the suffix to make it lexicographically smallest.

**Step-by-Step Logic:**

Let `nums` be the input array of length `n`.

1.  **Find the `pivot` (`k`):**
    Scan from right to left (`k` from `n-2` down to `0`). Find the *first* index `k` such that `nums[k] < nums[k+1]`.
    This `nums[k]` is the element that needs to be changed (increased) to get a larger permutation. The suffix `nums[k+1:]` is currently in descending order.
    If no such `k` is found (i.e., `k` becomes -1), it means the entire array is in descending order (e.g., `[3, 2, 1]`). This is the largest possible permutation. In this case, reverse the entire array to get the smallest possible permutation (e.g., `[1, 2, 3]`) and return.

2.  **Find the `swap_with_pivot` (`l`):**
    Scan again from right to left (`l` from `n-1` down to `k+1`). Find the *first* index `l` such that `nums[l] > nums[k]`.
    This `nums[l]` is the smallest element in the suffix `nums[k+1:]` that is greater than `nums[k]`. We swap `nums[k]` with this `nums[l]` to make the smallest possible increase at index `k`.

3.  **Swap `nums[k]` and `nums[l]`:**
    Perform the swap. Now, `nums[k]` is larger, and the suffix `nums[k+1:]` (which includes the original `nums[k]` at index `l`) is still in descending order (except for the swapped elements).

4.  **Reverse the suffix `nums[k+1:]`:**
    After the swap, the suffix `nums[k+1:]` (from index `k+1` to `n-1`) must be rearranged into the smallest possible lexicographical order. Since it was in descending order before the swap, and we swapped `nums[k]` with an element from this suffix, simply reversing this suffix will put it in ascending order, which is the lexicographically smallest arrangement.

**Example:** `nums = [1, 5, 8, 4, 7, 6, 5, 3, 1]`

1.  **Find `k`:**
    *   `nums[7]=3 < nums[8]=1` (F)
    *   `nums[6]=5 < nums[7]=3` (F)
    *   `nums[5]=6 < nums[6]=5` (F)
    *   `nums[4]=7 < nums[5]=6` (F)
    *   `nums[3]=4 < nums[4]=7` (T) -> **`k = 3` (`nums[k] = 4`)**
    Array: `[1, 5, 8, **4**, 7, 6, 5, 3, 1]`

2.  **Find `l`:** (first from right > `nums[k]=4`)
    *   `nums[8]=1 > 4` (F)
    *   `nums[7]=3 > 4` (F)
    *   `nums[6]=5 > 4` (T) -> **`l = 6` (`nums[l] = 5`)**
    Array: `[1, 5, 8, **4**, 7, 6, **5**, 3, 1]`

3.  **Swap `nums[k]` and `nums[l]` (4 and 5):**
    Array: `[1, 5, 8, **5**, 7, 6, **4**, 3, 1]`

4.  **Reverse suffix `nums[k+1:]` (from index 4 to 8): `[7, 6, 4, 3, 1]`**
    Reversed: `[1, 3, 4, 6, 7]`
    Final Array: `[1, 5, 8, 5, **1, 3, 4, 6, 7**]`

**Complexity Analysis:**
*   **Time Complexity:** O(n). In the worst case, we traverse the array three times (once for `k`, once for `l`, once for reversing the suffix). Each traversal is O(n).
*   **Space Complexity:** O(1). All operations are performed in-place.

---