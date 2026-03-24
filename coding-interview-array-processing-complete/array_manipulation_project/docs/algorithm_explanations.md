# Detailed Algorithm Explanations, Diagrams, and Interview Tips

This document provides in-depth explanations for each array manipulation problem covered in this project. For each problem, you'll find:

*   A clear problem statement.
*   A high-level overview of the approach.
*   Step-by-step logic with examples.
*   ASCII art diagrams to visualize the algorithm.
*   Detailed time and space complexity analysis.
*   Discussion of edge cases and common pitfalls.
*   Interview tips, follow-up questions, and variations.

---

## 1. Maximum Subarray Sum (Kadane's Algorithm)

### Problem Statement
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

### High-Level Approach

**Brute Force:** Iterate through all possible subarrays, calculate their sum, and keep track of the maximum. This involves nested loops.
**Kadane's Algorithm (Optimal):** This is a dynamic programming approach (or greedy approach). It maintains two variables: `max_current` (the maximum sum ending at the current position) and `max_global` (the overall maximum sum found so far). At each element, `max_current` is updated to be either the current element itself (starting a new subarray) or the current element plus `max_current` from the previous position (extending the current subarray). `max_global` is updated whenever `max_current` exceeds it.

### Step-by-Step Logic & ASCII Diagram (Kadane's Algorithm)

Let's trace Kadane's algorithm with `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

1.  **Initialization:**
    *   `max_current = nums[0] = -2`
    *   `max_global = nums[0] = -2`

2.  **Iterate `i` from 1 to `n-1`:**

    *   **i = 1, nums[1] = 1**
        *   `max_current = max(nums[1], max_current + nums[1])`
        *   `max_current = max(1, -2 + 1) = max(1, -1) = 1`
        *   `max_global = max(max_global, max_current) = max(-2, 1) = 1`
        *   _State: `max_current = 1`, `max_global = 1`_

    *   **i = 2, nums[2] = -3**
        *   `max_current = max(-3, 1 + (-3)) = max(-3, -2) = -2`
        *   `max_global = max(1, -2) = 1`
        *   _State: `max_current = -2`, `max_global = 1`_

    *   **i = 3, nums[3] = 4**
        *   `max_current = max(4, -2 + 4) = max(4, 2) = 4`
        *   `max_global = max(1, 4) = 4`
        *   _State: `max_current = 4`, `max_global = 4`_

    *   **i = 4, nums[4] = -1**
        *   `max_current = max(-1, 4 + (-1)) = max(-1, 3) = 3`
        *   `max_global = max(4, 3) = 4`
        *   _State: `max_current = 3`, `max_global = 4`_

    *   **i = 5, nums[5] = 2**
        *   `max_current = max(2, 3 + 2) = max(2, 5) = 5`
        *   `max_global = max(4, 5) = 5`
        *   _State: `max_current = 5`, `max_global = 5`_

    *   **i = 6, nums[6] = 1**
        *   `max_current = max(1, 5 + 1) = max(1, 6) = 6`
        *   `max_global = max(5, 6) = 6`
        *   _State: `max_current = 6`, `max_global = 6`_

    *   **i = 7, nums[7] = -5**
        *   `max_current = max(-5, 6 + (-5)) = max(-5, 1) = 1`
        *   `max_global = max(6, 1) = 6`
        *   _State: `max_current = 1`, `max_global = 6`_

    *   **i = 8, nums[8] = 4**
        *   `max_current = max(4, 1 + 4) = max(4, 5) = 5`
        *   `max_global = max(6, 5) = 6`
        *   _State: `max_current = 5`, `max_global = 6`_

3.  **Return `max_global`:** `6`

#### ASCII Diagram for Kadane's

```
Array:   [-2,  1, -3,  4, -1,  2,  1, -5,  4]
Indices:   0   1   2   3   4   5   6   7   8

i = 0: current = -2, global = -2
i = 1: current = max(1, -2+1) = 1    global = max(-2, 1) = 1
i = 2: current = max(-3, 1-3) = -2   global = max(1, -2) = 1
i = 3: current = max(4, -2+4) = 4    global = max(1, 4) = 4  <-- New Max Subarray starts here
                                        [4]
i = 4: current = max(-1, 4-1) = 3    global = max(4, 3) = 4
i = 5: current = max(2, 3+2) = 5    global = max(4, 5) = 5
i = 6: current = max(1, 5+1) = 6    global = max(5, 6) = 6  <-- [4, -1, 2, 1] sum = 6
i = 7: current = max(-5, 6-5) = 1   global = max(6, 1) = 6
i = 8: current = max(4, 1+4) = 5    global = max(6, 5) = 6

Result: 6
```

### Time and Space Complexity

*   **`max_subarray_sum_brute_force`**:
    *   **Time**: O(n^2). Two nested loops iterate through all `n * (n+1) / 2` possible subarrays.
    *   **Space**: O(1). Only a few variables are used.

*   **`max_subarray_sum_kadane`**:
    *   **Time**: O(n). A single pass through the array.
    *   **Space**: O(1). Only two variables (`max_current`, `max_global`) are used.

### Edge Cases and Gotchas

*   **Empty Array**: The problem statement usually implies "at least one number". If an empty array is possible, define its behavior (e.g., raise an error or return 0, depending on requirements). Our solution raises a `ValueError`.
*   **All Negative Numbers**: If all numbers are negative, Kadane's algorithm correctly returns the largest (least negative) single number. E.g., `[-2, -3, -1]` should return `-1`. This is handled by initializing `max_current` and `max_global` to `nums[0]`.
*   **All Zeroes**: Should return `0`. Handled correctly.

### Interview Tips and Variations

*   **Understanding DP/Greedy**: This problem is a classic example of both. Explain why it works: a subarray with a negative sum will never help create a larger sum if it's extended. It's better to start a new subarray.
*   **Return Subarray Indices**: A common follow-up is to return the start and end indices of the maximum sum subarray. This can be done by tracking `start_index_current_subarray` and updating it when `max_current` is reset or when `max_global` is updated.
*   **Circular Array**: What if the array is circular? The maximum sum subarray could wrap around. This can be solved by considering two cases:
    1.  The maximum sum subarray is non-wrapping (solved by standard Kadane's).
    2.  The maximum sum subarray is wrapping. This is equivalent to `total_sum - minimum_subarray_sum` (where `minimum_subarray_sum` is found using a modified Kadane's for minimums). The final answer is the maximum of these two cases. Be careful if all numbers are negative; `total_sum - min_sum` might give `0` which isn't right.
*   **K-Subarrays**: Find the maximum sum of `k` non-overlapping subarrays. This is a harder DP problem.

---

## 2. Rotate Array

### Problem Statement
Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.

### High-Level Approach

**Using Extra Space:** Create a new array and place each element `nums[i]` into `rotated_arr[(i + k) % n]`. Then copy the new array back to the original.
**Using Reversals (Optimal, In-Place):** This clever technique performs three reversals to achieve the rotation in-place:
1.  Reverse the entire array.
2.  Reverse the first `k` elements.
3.  Reverse the remaining `n-k` elements.

### Step-by-Step Logic & ASCII Diagram (Reversal Method)

Let's rotate `nums = [1, 2, 3, 4, 5, 6, 7]` by `k = 3`.
`n = 7`, `k = 3`.

1.  **Normalize `k`**: `k = k % n`. Here, `3 % 7 = 3`.

2.  **Reverse the entire array `nums` from index `0` to `n-1`**:
    *   `[1, 2, 3, 4, 5, 6, 7]`
    *   `reverse(nums, 0, 6)`
    *   `nums` becomes `[7, 6, 5, 4, 3, 2, 1]`

3.  **Reverse the first `k` elements (from index `0` to `k-1`)**:
    *   `k = 3`, so `reverse(nums, 0, 2)`
    *   `nums` becomes `[5, 6, 7, 4, 3, 2, 1]`

4.  **Reverse the remaining `n-k` elements (from index `k` to `n-1`)**:
    *   `k = 3`, `n-1 = 6`, so `reverse(nums, 3, 6)`
    *   `nums` becomes `[5, 6, 7, 1, 2, 3, 4]`

The array is now rotated correctly!

#### ASCII Diagram for Reversal Method

```
Original Array:      [ 1, 2, 3, 4, 5, 6, 7 ]  (k=3)
Indices:              0  1  2  3  4  5  6

Step 1: Reverse entire array (0 to n-1)
                     ^-------------------^
Result:              [ 7, 6, 5, 4, 3, 2, 1 ]

Step 2: Reverse first k elements (0 to k-1)
                     ^-----^
Result:              [ 5, 6, 7, 4, 3, 2, 1 ]

Step 3: Reverse remaining n-k elements (k to n-1)
                               ^--------^
Result:              [ 5, 6, 7, 1, 2, 3, 4 ]

Final Rotated Array: [ 5, 6, 7, 1, 2, 3, 4 ]
```

### Time and Space Complexity

*   **`rotate_array_extra_space`**:
    *   **Time**: O(n). One pass to populate the auxiliary array, another pass to copy back.
    *   **Space**: O(n). Requires an auxiliary array of the same size.

*   **`rotate_array_reverse`**:
    *   **Time**: O(n). Each reversal operation takes O(length of subarray) time. Since we reverse the whole array once, and two parts, the total operations are proportional to `n + k + (n-k) = 2n`.
    *   **Space**: O(1). All operations are performed in-place.

### Edge Cases and Gotchas

*   **Empty Array**: Handle `[]` gracefully (do nothing).
*   **Single Element Array**: `[1]`, `k=any`. Should remain `[1]`.
*   **`k` is a multiple of `n`**: If `k = n`, `2n`, etc., the array should return to its original state. The `k % n` operation handles this.
*   **`k` is larger than `n`**: `k = 8`, `n = 7`. `k % n = 1`. This also correctly handled by `k % n`.
*   **`k = 0`**: No rotation needed. Handled by `k % n` resulting in `0`.
*   **Mutable Input**: Remember that array rotation usually implies in-place modification. Be careful when testing by making copies if needed.

### Interview Tips and Variations

*   **Clarify In-place**: Always ask if the rotation needs to be done in-place or if auxiliary space is allowed. The optimal solution is typically O(1) space.
*   **Other In-place Methods**: Discuss cyclic replacement (juggling algorithm) as another O(1) space method. It's harder to implement correctly during an interview.
*   **Left Rotation**: How would you rotate to the left? It's similar: reverse `0` to `k-1`, then `k` to `n-1`, then `0` to `n-1`. Or, just rotate right by `n-k` steps.
*   **2D Array Rotation**: How would you rotate a matrix by 90 degrees? This is a common follow-up and often involves transposing and then reversing rows/columns.

---

## 3. Product of Array Except Self

### Problem Statement
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
**Constraint**: You must write an algorithm that runs in O(n) time and without using the division operation.

### High-Level Approach

**Brute Force:** For each element `nums[i]`, iterate through the entire array again, multiplying all elements except `nums[i]`.
**Optimized (Prefix/Suffix Products):** The key insight is that `answer[i]` is the product of all elements to its left multiplied by the product of all elements to its right. We can compute these prefix and suffix products in two passes.

### Step-by-Step Logic & ASCII Diagram (Optimized)

Let's use `nums = [1, 2, 3, 4]`.
`n = 4`. `result = [1, 1, 1, 1]` initially.

#### Pass 1: Calculate Prefix Products

`result[i]` will store the product of all elements to the *left* of `i`.

*   **Initialize `left_product = 1`**
*   **`i = 0`:**
    *   `result[0] = left_product = 1`
    *   `left_product = left_product * nums[0] = 1 * 1 = 1`
    *   `result` is `[1, 1, 1, 1]`
*   **`i = 1`:**
    *   `result[1] = left_product = 1`
    *   `left_product = left_product * nums[1] = 1 * 2 = 2`
    *   `result` is `[1, 1, 1, 1]`
*   **`i = 2`:**
    *   `result[2] = left_product = 2`
    *   `left_product = left_product * nums[2] = 2 * 3 = 6`
    *   `result` is `[1, 1, 2, 1]`
*   **`i = 3`:**
    *   `result[3] = left_product = 6`
    *   `left_product = left_product * nums[3] = 6 * 4 = 24`
    *   `result` is `[1, 1, 2, 6]`

**After Pass 1**: `result` contains `[Product_left_of_0, Product_left_of_1, Product_left_of_2, Product_left_of_3]`
This is `[1, 1, 2, 6]` for our example.

#### Pass 2: Calculate Suffix Products and Combine

`right_product` will store the product of all elements to the *right* of `i`. We multiply this with `result[i]` (which currently holds prefix product).

*   **Initialize `right_product = 1`**
*   **`i = 3` (iterate backwards from `n-1` to `0`):**
    *   `result[3] = result[3] * right_product = 6 * 1 = 6`
    *   `right_product = right_product * nums[3] = 1 * 4 = 4`
    *   `result` is `[1, 1, 2, 6]`
*   **`i = 2`:**
    *   `result[2] = result[2] * right_product = 2 * 4 = 8`
    *   `right_product = right_product * nums[2] = 4 * 3 = 12`
    *   `result` is `[1, 1, 8, 6]`
*   **`i = 1`:**
    *   `result[1] = result[1] * right_product = 1 * 12 = 12`
    *   `right_product = right_product * nums[1] = 12 * 2 = 24`
    *   `result` is `[1, 12, 8, 6]`
*   **`i = 0`:**
    *   `result[0] = result[0] * right_product = 1 * 24 = 24`
    *   `right_product = right_product * nums[0] = 24 * 1 = 24`
    *   `result` is `[24, 12, 8, 6]`

**Final Result**: `[24, 12, 8, 6]`

#### ASCII Diagram for Optimized Solution

```
nums:   [ 1,   2,   3,   4 ]
Indices:  0    1    2    3

Pass 1: Calculate left products (stores in result)
result: [ 1,   1,   2,   6 ]
         ^    ^    ^    ^
        prod prod prod prod
        of   of   of   of
        nothing [1]  [1,2] [1,2,3]

Pass 2: Calculate right products & combine
right_prod starts at 1

i=3: nums[3]=4, result[3]=6
     result[3] = 6 * 1 (right_prod) = 6
     right_prod = 1 * 4 = 4
result: [ 1,   1,   2,   6 ]

i=2: nums[2]=3, result[2]=2
     result[2] = 2 * 4 (right_prod) = 8
     right_prod = 4 * 3 = 12
result: [ 1,   1,   8,   6 ]

i=1: nums[1]=2, result[1]=1
     result[1] = 1 * 12 (right_prod) = 12
     right_prod = 12 * 2 = 24
result: [ 1,  12,   8,   6 ]

i=0: nums[0]=1, result[0]=1
     result[0] = 1 * 24 (right_prod) = 24
     right_prod = 24 * 1 = 24
result: [24,  12,   8,   6 ]

Final: [24, 12, 8, 6]
```

### Time and Space Complexity

*   **`product_except_self_brute_force`**:
    *   **Time**: O(n^2). Nested loops.
    *   **Space**: O(1) (excluding the output array).

*   **`product_except_self_optimized`**:
    *   **Time**: O(n). Two passes through the array.
    *   **Space**: O(1) (excluding the output array). The `result` array is considered the output as per common interview practice for problems returning an array. If the output array counts as extra space, it's O(n).

### Edge Cases and Gotchas

*   **Zeroes in Array**:
    *   **One zero**: If there's exactly one zero, all `answer[i]` will be `0` except for the index `j` where `nums[j] == 0`. `answer[j]` will be the product of all non-zero elements.
    *   **Two or more zeroes**: All `answer[i]` will be `0`.
    *   The prefix/suffix product method handles these cases correctly without special checks, as multiplying by zero propagates `0`.
*   **Empty Array**: Returns `[]`.
*   **Single Element Array**: `[5]` -> `[1]`. Handled.
*   **Negative Numbers**: Handles correctly. E.g., `[-1, -2, -3]` -> `[-6, -3, -2]`.

### Interview Tips and Variations

*   **No Division Constraint**: This is the crucial part. Without this, one could simply calculate the total product and then divide by `nums[i]`. The prefix/suffix method is designed for this constraint.
*   **Space Complexity**: The O(1) space complexity is usually emphasized, meaning *additional* space beyond the output array. If the interviewer counts the output array, then it's O(n). Clarify this.
*   **Follow-up: What if integer overflow is a concern?** If numbers are very large, one might need to use a BigInt library or handle modulo arithmetic if the problem specifies it.

---

## 4. Merge Overlapping Intervals

### Problem Statement
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### High-Level Approach

The core idea is that to effectively merge intervals, they must be processed in a specific order. Sorting the intervals by their start times simplifies the merging logic significantly. After sorting, we can iterate through the intervals and merge them if the current interval overlaps with the previous one.

### Step-by-Step Logic & ASCII Diagram

Let `intervals = [[1,3], [8,10], [15,18], [2,6]]`.

1.  **Sort intervals by start time:**
    *   Original: `[[1,3], [8,10], [15,18], [2,6]]`
    *   Sorted: `[[1,3], [2,6], [8,10], [15,18]]`

2.  **Initialize `merged = []`**

3.  **Iterate through sorted intervals:**

    *   **Interval `[1,3]`:**
        *   `merged` is empty. Append `[1,3]`.
        *   `merged = [[1,3]]`

    *   **Interval `[2,6]`:**
        *   Check for overlap with last merged interval: `merged[-1]` is `[1,3]`.
        *   Does `[2,6]` overlap `[1,3]`? Yes, because `2 <= 3`.
        *   Merge: Update end of `merged[-1]` to `max(3, 6) = 6`.
        *   `merged = [[1,6]]`

    *   **Interval `[8,10]`:**
        *   Check for overlap with last merged interval: `merged[-1]` is `[1,6]`.
        *   Does `[8,10]` overlap `[1,6]`? No, because `8 > 6`.
        *   Append `[8,10]` to `merged`.
        *   `merged = [[1,6], [8,10]]`

    *   **Interval `[15,18]`:**
        *   Check for overlap with last merged interval: `merged[-1]` is `[8,10]`.
        *   Does `[15,18]` overlap `[8,10]`? No, because `15 > 10`.
        *   Append `[15,18]` to `merged`.
        *   `merged = [[1,6], [8,10], [15,18]]`

4.  **Return `merged`**: `[[1,6], [8,10], [15,18]]`

#### ASCII Diagram for Merging Intervals

```
Original Intervals:    [1,3]   [8,10]   [15,18]  [2,6]
                       +---+   +----+   +-----+  +---+

Step 1: Sort by start time
                       [1,3]   [2,6]   [8,10]   [15,18]
                       +---+   +---+   +----+   +-----+

Step 2: Initialize merged = []

Step 3: Process intervals

  1. Current: [1,3]
     merged is empty, add [1,3]
     merged = [[1,3]]
     +---+
     |   |
     [1,3]

  2. Current: [2,6]
     Check: current[0] (2) <= merged[-1][1] (3)? Yes. Overlap.
     Merge: update merged[-1][1] = max(merged[-1][1], current[1]) = max(3, 6) = 6
     merged = [[1,6]]
     +-----+
     |     |
     [1,6]

  3. Current: [8,10]
     Check: current[0] (8) <= merged[-1][1] (6)? No. No overlap.
     Add [8,10]
     merged = [[1,6], [8,10]]
     +-----+     +----+
     |     |     |    |
     [1,6]       [8,10]

  4. Current: [15,18]
     Check: current[0] (15) <= merged[-1][1] (10)? No. No overlap.
     Add [15,18]
     merged = [[1,6], [8,10], [15,18]]
     +-----+     +----+     +-----+
     |     |     |    |     |     |
     [1,6]       [8,10]     [15,18]

Final Result: [[1,6], [8,10], [15,18]]
```

### Time and Space Complexity

*   **`merge_intervals`**:
    *   **Time**: O(n log n). The dominant factor is the sorting step, which takes O(n log n) for `n` intervals. The subsequent single pass to merge takes O(n) time.
    *   **Space**: O(n) in the worst case for the output `merged` list (when no intervals overlap). Also, sorting algorithms can take O(log n) to O(n) auxiliary space depending on the implementation.

### Edge Cases and Gotchas

*   **Empty Input**: `[]` should return `[]`. Handled.
*   **Single Interval**: `[[1,5]]` should return `[[1,5]]`. Handled.
*   **No Overlaps**: `[[1,2], [3,4], [5,6]]` should return as is. Handled.
*   **Intervals touching (boundary overlap)**: `[[1,3], [3,5]]` should merge to `[[1,5]]`. Our `interval[0] > merged[-1][1]` condition correctly handles this: `3` is not `> 3`, so they merge.
*   **Contained Intervals**: `[[1,8], [2,5]]` should merge to `[[1,8]]`. Handled by `max(merged[-1][1], interval[1])`.
*   **Unsorted Input**: The first step of sorting handles this automatically.

### Interview Tips and Variations

*   **Sorting is Key**: Emphasize that sorting by start time is the fundamental step to make this problem tractable in O(N log N). Without sorting, you'd likely end up with an O(N^2) approach checking all pairs.
*   **Follow-up: Insert a new interval**: Given a sorted list of non-overlapping intervals, insert a new interval and merge if necessary. This can be done in O(N) by finding the insertion point and merging around it, without needing to re-sort the entire list.
*   **Number of non-overlapping intervals**: A variation asks for the maximum number of non-overlapping intervals, which is related to activity selection problem (greedy approach, sort by end times).
*   **Different Merge Conditions**: What if intervals `[1,3]` and `[4,5]` should merge? (i.e., if `end_1 + 1 == start_2`). The condition `interval[0] > merged[-1][1]` would need adjustment.

---

## 5. Find Smallest Missing Positive Integer

### Problem Statement
Given an unsorted integer array `nums`, find the smallest missing positive integer.
You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

### High-Level Approach

**Using a Set (O(n) space):** The easiest way is to put all positive numbers into a set. Then iterate from `1` upwards and check if `1, 2, 3...` are present in the set. The first one not found is the answer.
**In-place Modification (O(1) space, Optimal):** This is the tricky part. The idea is to use the array itself as a hash map. If a number `x` is present, we try to put it at index `x-1`. For example, `1` should be at `nums[0]`, `2` at `nums[1]`, and so on. We ignore non-positive numbers and numbers larger than `n` (the array length), as they can't be the smallest missing positive within the `[1, n]` range. After placing numbers correctly, the first index `i` where `nums[i] != i + 1` reveals `i + 1` as the smallest missing positive. If all numbers from `1` to `n` are present, then `n + 1` is the answer.

### Step-by-Step Logic & ASCII Diagram (Optimized O(1) Space)

Let `nums = [3, 4, -1, 1]`. `n = 4`.

#### Phase 1: Place numbers in their correct positions (in-place "hashing")

Iterate `i` from `0` to `n-1`. Inside the loop, use a `while` loop to swap `nums[i]` until it's either:
1.  Out of the valid range `[1, n]`.
2.  Negative or zero.
3.  Already in its correct position (`nums[i] == i + 1`).
4.  The target position `nums[num - 1]` already contains `num` (to avoid infinite loops with duplicates).

Example: `nums = [3, 4, -1, 1]`

*   **`i = 0`, `nums[0] = 3`**
    *   `1 <= 3 <= 4` (valid range) and `3 != nums[3-1]` (i.e. `3 != nums[2] = -1`). Swap `nums[0]` with `nums[3-1] = nums[2]`.
    *   `nums` becomes `[-1, 4, 3, 1]`
    *   `nums[0]` is now `-1`.
    *   `while` loop condition `1 <= -1 <= 4` is false. Move to next `i`.
*   **`i = 1`, `nums[1] = 4`**
    *   `1 <= 4 <= 4` (valid range) and `4 != nums[4-1]` (i.e. `4 != nums[3] = 1`). Swap `nums[1]` with `nums[4-1] = nums[3]`.
    *   `nums` becomes `[-1, 1, 3, 4]`
    *   `nums[1]` is now `1`.
    *   `1 <= 1 <= 4` (valid range) and `1 != nums[1-1]` (i.e. `1 != nums[0] = -1`). Swap `nums[1]` with `nums[1-1] = nums[0]`.
    *   `nums` becomes `[1, -1, 3, 4]`
    *   `nums[1]` is now `-1`.
    *   `while` loop condition `1 <= -1 <= 4` is false. Move to next `i`.
*   **`i = 2`, `nums[2] = 3`**
    *   `1 <= 3 <= 4` (valid range) and `3 != nums[3-1]` (i.e. `3 != nums[2] = 3`). Condition `nums[i] != nums[nums[i] - 1]` is false, because `3` is already at `nums[2]`. `while` loop terminates.
*   **`i = 3`, `nums[3] = 4`**
    *   `1 <= 4 <= 4` (valid range) and `4 != nums[4-1]` (i.e. `4 != nums[3] = 4`). Condition `nums[i] != nums[nums[i] - 1]` is false, because `4` is already at `nums[3]`. `while` loop terminates.

**After Phase 1**: `nums = [1, -1, 3, 4]`

#### Phase 2: Find the first missing positive

Iterate `i` from `0` to `n-1` again. If `nums[i]` is not `i + 1`, then `i + 1` is the smallest missing positive.

*   **`i = 0`:** `nums[0] = 1`. `1 == 0 + 1`. Match.
*   **`i = 1`:** `nums[1] = -1`. `-1 != 1 + 1`. Found! The smallest missing positive is `1 + 1 = 2`.

**Return 2.**

#### ASCII Diagram for Optimized Solution

```
nums:   [ 3,  4, -1,  1 ]  (n=4)
Indices:  0   1   2   3

Phase 1: In-place placement

i=0, nums[0]=3. Target pos for 3 is index 2. nums[2]=-1.
   Swap nums[0] and nums[2].
   [ -1, 4, 3, 1 ]
   Now nums[0]=-1. Not in range [1,4]. Done with i=0.

i=1, nums[1]=4. Target pos for 4 is index 3. nums[3]=1.
   Swap nums[1] and nums[3].
   [ -1, 1, 3, 4 ]
   Now nums[1]=1. Target pos for 1 is index 0. nums[0]=-1.
   Swap nums[1] and nums[0].
   [ 1, -1, 3, 4 ]
   Now nums[1]=-1. Not in range [1,4]. Done with i=1.

i=2, nums[2]=3. Target pos for 3 is index 2. nums[2]=3.
   Already in correct position (nums[i] == nums[nums[i]-1]). Done with i=2.

i=3, nums[3]=4. Target pos for 4 is index 3. nums[3]=4.
   Already in correct position. Done with i=3.

Array after Phase 1:
nums:   [ 1, -1,  3,  4 ]
Indices:  0   1   2   3

Phase 2: Find first mismatch

i=0: nums[0]=1. Is 1 == (0+1)? Yes.
i=1: nums[1]=-1. Is -1 == (1+1)? No.
     Mismatch found at index 1.
     Smallest missing positive is (1+1) = 2.

Return: 2
```

### Time and Space Complexity

*   **`find_missing_positive_optimized`**:
    *   **Time**: O(n). Although there's a nested `while` loop, each number is swapped at most once into its correct position. The outer loop runs `n` times. The total number of swaps across all `while` loops is also at most `n`. Thus, the total operations are proportional to `n`.
    *   **Space**: O(1). All modifications are done in-place within the input array.

*   **`find_missing_positive_set_based`**:
    *   **Time**: O(n). One pass to insert positive numbers into the set, and another pass (worst case `n` iterations) to check for missing positives.
    *   **Space**: O(n) in the worst case, if all numbers are positive and unique (the set stores up to `n` elements).

### Edge Cases and Gotchas

*   **Empty Array**: The smallest missing positive is `1`. Handled.
*   **All Negatives/Zeroes**: `[-1, -5, 0]` should return `1`. Handled correctly.
*   **Array contains 1 to n**: `[1,2,3,4,5]` should return `n+1 = 6`. Handled correctly by returning `n+1` if no mismatch is found in Phase 2.
*   **Duplicates**: `[1,1]` should return `2`. Handled by the `nums[i] != nums[nums[i]-1]` check in the `while` loop to prevent infinite swaps for duplicates.
*   **Numbers > n**: `[1, 1000]` should return `2`. The `1 <= nums[i] <= n` condition correctly ignores these numbers, as they cannot be the smallest missing positive within `[1, n]`.

### Interview Tips and Variations

*   **Why does `nums[i] != nums[nums[i] - 1]` prevent infinite loops?** If `nums[i]` is, say, `3`, and `nums[2]` is also `3`, then `3 == 3` is true. Swapping `nums[i]` with `nums[nums[i]-1]` would be swapping `3` with `3`, which is useless and would cause an infinite loop if `nums[i]` never changes. This check ensures we only swap if the target position truly holds a different value.
*   **The "Hash Map" analogy**: Explain how you're using array indices as keys and values as presence markers.
*   **Constraints are Key**: Emphasize how the O(1) space constraint drives this complex solution, and that if O(N) space were allowed, a hash set would be much simpler.
*   **Finding `k`th missing positive**: A harder variant that often involves binary search or more advanced data structures.
*   **Generalize to `[M, M+N-1]`**: What if we need to find the smallest missing number in a different range? The logic would need to be adapted, but the in-place idea could potentially be extended.

---

(Total estimated lines for docs/algorithm_explanations.md: ~700-800 lines)