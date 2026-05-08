# Algorithm Explanations

This document provides detailed explanations for the algorithms implemented in this project. Each problem's explanation covers its core idea, step-by-step logic, and why specific approaches are considered optimal.

---

## 1. Rotate Array

**Problem**: Given an array, rotate the array to the right by `k` steps.

**Input**: `nums` (vector of integers), `k` (integer)
**Output**: `nums` (rotated in-place)

### a) Brute Force (Shift by One `k` Times)

*   **Idea**: To rotate right by `k` steps, we can repeatedly perform a single right rotation `k` times. A single right rotation involves moving the last element to the front and shifting all other elements one position to the right.
*   **Logic**:
    1.  Normalize `k`: `k = k % n` (where `n` is array size) to handle `k` values larger than `n`.
    2.  Repeat `k` times:
        *   Store the last element (`nums[n-1]`).
        *   Shift elements `nums[n-1]` down to `nums[1]` one position to the right: `nums[j] = nums[j-1]` for `j` from `n-1` down to `1`.
        *   Place the stored last element at `nums[0]`.
*   **Time Complexity**: O(n*k). Each single rotation takes O(n) time, and we do it `k` times. In the worst case, `k` can be close to `n`, leading to O(n^2).
*   **Space Complexity**: O(1) because it's an in-place modification.

### b) Using Extra Space (Temporary Array)

*   **Idea**: Create a new array and place each element from the original array directly into its final rotated position.
*   **Logic**:
    1.  Normalize `k`: `k = k % n`.
    2.  Create a temporary array `temp` of the same size as `nums`.
    3.  Iterate through `nums` with index `i`:
        *   The element `nums[i]` will move to index `(i + k) % n` in the `temp` array.
        *   So, `temp[(i + k) % n] = nums[i]`.
    4.  Copy all elements from `temp` back to `nums`.
*   **Time Complexity**: O(n). One pass to fill `temp`, one pass to copy back to `nums`.
*   **Space Complexity**: O(n) for the `temp` array.

### c) Three Reversals (Optimal In-Place)

*   **Idea**: This clever method uses three `std::reverse` operations to achieve rotation in-place.
*   **Logic**:
    1.  Normalize `k`: `k = k % n`. If `k` is 0, no rotation is needed.
    2.  **Reverse the entire array**: This brings the elements that should be at the end to the beginning, but in reverse order.
        *   Example: `[1,2,3,4,5,6,7]`, `k=3` -> `[7,6,5,4,3,2,1]`
    3.  **Reverse the first `k` elements**: This correctly positions the last `k` elements of the *original* array.
        *   Example: `[7,6,5,4,3,2,1]` (reversed entire) -> reverse first 3 `[5,6,7,4,3,2,1]`
    4.  **Reverse the remaining `n-k` elements**: This correctly positions the first `n-k` elements of the *original* array.
        *   Example: `[5,6,7,4,3,2,1]` -> reverse remaining `[5,6,7,1,2,3,4]`
*   **Time Complexity**: O(n). Three passes over parts of the array (which sum up to `n`). `std::reverse` takes O(length) time.
*   **Space Complexity**: O(1) because all operations are done in-place.

### d) Juggling Algorithm (Optimal In-Place)

*   **Idea**: The Juggling Algorithm is an optimization of the block swap algorithm. It moves elements in cycles. The number of cycles is equal to `GCD(n, k)` (Greatest Common Divisor of array size `n` and rotation steps `k`).
*   **Logic**:
    1.  Normalize `k`: `k = k % n`. If `k` is 0, no rotation needed.
    2.  Calculate `GCD(n, k)`.
    3.  For each cycle (from `i = 0` to `GCD - 1`):
        *   Store the element `nums[i]` in a temporary variable (`temp`).
        *   Start a cycle: `j = i`.
        *   While true:
            *   Calculate the index `next_idx` where `nums[j]` should come from. For a right rotation, it's `(j - k + n) % n`.
            *   If `next_idx` is `i` (we've completed the cycle), break.
            *   Move `nums[next_idx]` to `nums[j]`: `nums[j] = nums[next_idx]`.
            *   Update `j = next_idx`.
        *   Place `temp` (the element that started this cycle) into `nums[j]`.
*   **Time Complexity**: O(n). Each element is visited and moved exactly once.
*   **Space Complexity**: O(1) for the temporary variable.

---

## 2. Product of Array Except Self

**Problem**: Given an array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Constraints: O(n) time, no division operation.

**Input**: `nums` (vector of integers)
**Output**: `answer` (vector of integers)

### a) Brute Force with Division (If Allowed)

*   **Idea**: Calculate the total product of all elements. Then, for each element `nums[i]`, divide the total product by `nums[i]` to get the desired result.
*   **Logic**:
    1.  Calculate `total_product` of all elements. Keep track of `zero_count`.
    2.  Handle edge cases:
        *   If `zero_count > 1`: Any element's product except self will be 0.
        *   If `zero_count == 1`:
            *   For `nums[i] == 0`, `answer[i]` is `total_product` (of non-zero elements).
            *   For `nums[i] != 0`, `answer[i]` is 0.
        *   If `zero_count == 0`: `answer[i] = total_product / nums[i]`.
*   **Time Complexity**: O(n). Two passes: one for total product, one for populating the result.
*   **Space Complexity**: O(1) (excluding output array).
*   **Why not optimal (given constraint)**: Uses division, which is often disallowed or avoided in this problem to test for prefix/suffix product understanding.

### b) Optimal: Prefix and Suffix Products (Without Division)

*   **Idea**: For each element `nums[i]`, its "product except self" is the product of all elements to its left multiplied by the product of all elements to its right. We can compute these two products separately with two passes.
*   **Logic**:
    1.  Initialize `result` array of size `n`.
    2.  **First Pass (Prefix Products - Left Pass)**:
        *   `result[0] = 1` (There's nothing to the left of the first element).
        *   For `i` from `1` to `n-1`: `result[i] = result[i-1] * nums[i-1]`.
        *   After this pass, `result[i]` stores the product of `nums[0] * ... * nums[i-1]`.
        *   Example: `nums = [1,2,3,4]` -> `result = [1, 1, 2, 6]`
    3.  **Second Pass (Suffix Products - Right Pass)**:
        *   Initialize a variable `right_product = 1` (There's nothing to the right of the last element, conceptually).
        *   Iterate `i` from `n-1` down to `0`:
            *   `result[i] = result[i] * right_product`. (This combines the prefix product at `result[i]` with the suffix product `right_product`).
            *   Update `right_product = right_product * nums[i]`. (Prepare `right_product` for the next element to its left).
        *   Example:
            *   `i=3 (nums[3]=4)`: `result[3] = 6 * 1 = 6`. `right_product = 1 * 4 = 4`.
            *   `i=2 (nums[2]=3)`: `result[2] = 2 * 4 = 8`. `right_product = 4 * 3 = 12`.
            *   `i=1 (nums[1]=2)`: `result[1] = 1 * 12 = 12`. `right_product = 12 * 2 = 24`.
            *   `i=0 (nums[0]=1)`: `result[0] = 1 * 24 = 24`. `right_product = 24 * 1 = 24`.
    4.  Return `result`.
*   **Time Complexity**: O(n). Two passes through the array.
*   **Space Complexity**: O(1) (excluding the output array, which is required). If modifying the input array is allowed, this could also be O(1) total, but usually, a new array is expected.

---

## 3. Maximum Subarray Sum (Kadane's Algorithm)

**Problem**: Find the contiguous subarray (containing at least one number) which has the largest sum.

**Input**: `nums` (vector of integers)
**Output**: Maximum sum (integer)

### a) Brute Force

*   **Idea**: Check every possible contiguous subarray, calculate its sum, and keep track of the maximum sum found.
*   **Logic**:
    1.  Initialize `max_so_far` to the first element (or negative infinity).
    2.  Use nested loops:
        *   Outer loop (`i`) defines the start of the subarray.
        *   Inner loop (`j`) defines the end of the subarray.
        *   Inside the inner loop, calculate the `current_sum` from `nums[i]` to `nums[j]`.
        *   Update `max_so_far = max(max_so_far, current_sum)`.
*   **Time Complexity**: O(n^2). The nested loops result in `n * (n+1) / 2` subarrays.
*   **Space Complexity**: O(1).

### b) Kadane's Algorithm (Optimal Dynamic Programming / Greedy)

*   **Idea**: This algorithm is a classic dynamic programming approach. It iterates through the array once, keeping track of two values:
    1.  `current_max`: The maximum sum of a subarray ending at the *current* position.
    2.  `global_max`: The overall maximum sum found so far across all subarrays.
*   **Logic**:
    1.  Initialize `global_max = nums[0]` and `current_max = nums[0]`. (Assuming `nums` is not empty. If it can be empty, handle that case).
    2.  Iterate from the second element (`i = 1`) to the end of `nums`:
        *   For each element `nums[i]`, decide if it's better to extend the previous subarray (`current_max + nums[i]`) or start a new subarray with `nums[i]` itself.
        *   `current_max = max(nums[i], current_max + nums[i])`.
        *   Update `global_max = max(global_max, current_max)`.
    3.  Return `global_max`.
*   **Key Insight**: If `current_max` becomes negative, it's better to discard the previous subarray and start a new one from the current element, because a negative sum will only reduce the sum of any future positive elements.
*   **Time Complexity**: O(n). A single pass through the array.
*   **Space Complexity**: O(1).

---

## 4. Merge Intervals

**Problem**: Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Input**: `intervals` (vector of `[start, end]` vectors)
**Output**: `merged_intervals` (vector of `[start, end]` vectors)

### a) Sorting and Merging (Optimal)

*   **Idea**: The key insight is that if we sort the intervals by their start times, then any overlapping intervals must be adjacent in the sorted list. This simplifies the merging logic significantly.
*   **Logic**:
    1.  **Handle Empty Input**: If `intervals` is empty, return an empty list.
    2.  **Sort Intervals**: Sort the input `intervals` array based on the `start_i` of each interval. A custom comparator might be needed if not using a default sort on pairs/structs.
    3.  **Initialize `merged_intervals`**: Add the first interval from the sorted list to `merged_intervals`. This will be our current reference for merging.
    4.  **Iterate and Merge**: Iterate through the rest of the sorted intervals (from the second one):
        *   Let `last_merged_interval` be the last interval in `merged_intervals`.
        *   Let `current_interval` be the interval being considered from the sorted input.
        *   **Check for Overlap**: If `current_interval.start <= last_merged_interval.end`:
            *   Overlap exists. Merge them by updating the `end` of `last_merged_interval`.
            *   The new `end` should be `max(last_merged_interval.end, current_interval.end)`. This handles cases where `current_interval` is fully contained within `last_merged_interval` or extends it.
        *   **No Overlap**: If `current_interval.start > last_merged_interval.end`:
            *   No overlap. Add `current_interval` as a new, distinct interval to `merged_intervals`.
    5.  Return `merged_intervals`.
*   **Time Complexity**: O(N log N). This is dominated by the initial sorting step, where N is the number of intervals. The merging pass takes O(N) time.
*   **Space Complexity**: O(N). In the worst-case scenario (e.g., no overlaps at all), the `merged_intervals` list will contain all N original intervals. In the best case (all intervals merge into one), it's O(1) (excluding input size).

---