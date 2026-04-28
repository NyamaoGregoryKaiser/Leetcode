# Algorithms Explanation

This document provides a detailed explanation of the algorithms implemented for each array manipulation problem in this project. It covers the logic, step-by-step examples, time/space complexity analysis, and a comparison of different approaches.

---

## 1. Rotate Array

**Problem:** Given an array `nums`, rotate the array to the right by `k` steps. This must be an in-place algorithm.

### A. Three Reversals Method (Optimal In-Place)

This is the most efficient and common in-place solution for rotating an array.

**Algorithm Logic:**
The key idea is that rotating an array `[1,2,3,4,5,6,7]` by `k=3` steps to the right results in `[5,6,7,1,2,3,4]`. Notice that the last `k` elements move to the front, and the first `N-k` elements move to the end.
This transformation can be achieved by three reversal operations:

1.  **Reverse the entire array:** This brings the elements that should be at the end to the front (in reverse order), and vice-versa.
2.  **Reverse the first `k` elements:** This corrects the order of the `k` elements that are now at the front.
3.  **Reverse the remaining `N-k` elements:** This corrects the order of the `N-k` elements that are now at the end.

**Step-by-Step Example:** `nums = [1,2,3,4,5,6,7]`, `k = 3`

1.  **Normalize `k`:** `k = 3 % 7 = 3`. (If `k` were 10, it would be `10 % 7 = 3` rotations).
2.  **Reverse all elements:** `reverse(nums, 0, 6)`
    `[1,2,3,4,5,6,7]` -> `[7,6,5,4,3,2,1]`

3.  **Reverse the first `k` elements:** `reverse(nums, 0, 2)` (elements at index 0, 1, 2)
    `[7,6,5,4,3,2,1]` -> `[5,6,7,4,3,2,1]`

4.  **Reverse the remaining `N-k` elements:** `reverse(nums, 3, 6)` (elements at index 3, 4, 5, 6)
    `[5,6,7,4,3,2,1]` -> `[5,6,7,1,2,3,4]`

**Visual Diagram (ASCII Art):**

```
Initial Array:
[ 1, 2, 3, 4, 5, 6, 7 ]
  ^         ^       ^
  0         k=3     N-1

1. Reverse entire array (0 to N-1):
[ 7, 6, 5, 4, 3, 2, 1 ]

2. Reverse first k elements (0 to k-1):
  [ 5, 6, 7 ], 4, 3, 2, 1 ]
  <--- k elements --->

3. Reverse remaining N-k elements (k to N-1):
[ 5, 6, 7, [ 1, 2, 3, 4 ]
           <-- N-k elements -->

Final Result:
[ 5, 6, 7, 1, 2, 3, 4 ]
```

**Time Complexity:** O(N)
Each `reverse` operation iterates through half of its segment, effectively visiting each element a constant number of times across all three reverses.
**Space Complexity:** O(1)
All operations are performed in-place.

---

### B. Using Temporary Array (Less Optimal Space)

This approach creates a new array to store the rotated elements and then copies them back.

**Algorithm Logic:**
For each element at index `i` in the original array, its new position will be `(i + k) % N`. We can populate a new temporary array using this mapping.

**Step-by-Step Example:** `nums = [1,2,3,4], k = 2`

1.  **Normalize `k`:** `k = 2 % 4 = 2`.
2.  Create `temp = [_,_,_,_]` (size 4).
3.  **Iterate `i` from 0 to 3:**
    *   `i=0, nums[0]=1`: `temp[(0+2)%4] = temp[2] = 1`
    *   `i=1, nums[1]=2`: `temp[(1+2)%4] = temp[3] = 2`
    *   `i=2, nums[2]=3`: `temp[(2+2)%4] = temp[0] = 3`
    *   `i=3, nums[3]=4`: `temp[(3+2)%4] = temp[1] = 4`
    Result `temp = [3,4,1,2]`
4.  Copy elements from `temp` back to `nums`.
    `nums = [3,4,1,2]`

**Time Complexity:** O(N)
Two passes over the array: one to fill the temporary array, one to copy back.
**Space Complexity:** O(N)
A temporary array of size `N` is created.

---

### C. Using `splice` and `unshift` (Less Efficient In-Place)

This approach leverages built-in array methods for in-place manipulation, but they often have hidden performance costs.

**Algorithm Logic:**
1.  Normalize `k`.
2.  Use `splice` to remove the last `k` elements from the array. This returns them as a new array.
3.  Use `unshift` to add these `k` elements to the beginning of the original array.

**Step-by-Step Example:** `nums = [1,2,3,4,5,6,7], k = 3`

1.  **Normalize `k`:** `k = 3 % 7 = 3`.
2.  `nums.splice(7 - 3)` i.e., `nums.splice(4)`
    *   `rotatedPart = [5,6,7]`
    *   `nums` becomes `[1,2,3,4]`
3.  `nums.unshift(...rotatedPart)`
    *   `nums.unshift(5,6,7)`
    *   `nums` becomes `[5,6,7,1,2,3,4]`

**Time Complexity:** O(N)
`splice` and `unshift` operations in JavaScript, for most engines, involve shifting elements. Removing `k` elements from the end might be `O(k)`, but adding `k` elements to the beginning of an `N-k` length array is `O(N-k)`. In the worst case, these operations are `O(N)`.
**Space Complexity:** O(k)
For storing the `k` elements temporarily.

---

**Edge Cases and Gotchas for Rotate Array:**

*   **Empty array or single element array:** No rotation is needed. Handle by checking `nums.length <= 1`.
*   **`k = 0`:** No rotation is needed.
*   **`k` is a multiple of `N` (e.g., `k = N` or `k = 2*N`):** The array returns to its original state. Normalize `k` using `k = k % N` to handle this and reduce unnecessary operations.
*   **Negative `k`:** The problem states `k` is non-negative. If it could be negative, you might need to convert negative `k` to positive `k'` (e.g., `k=-1` rotate right by `N-1`).

---

## 2. Product of Array Except Self

**Problem:** Given an integer array `nums`, return an array `answer` where `answer[i]` is the product of all elements of `nums` except `nums[i]`. Must be `O(N)` time and without using division.

### A. Optimal Approach (Prefix and Suffix Products)

This method cleverly calculates the product without using division and in linear time.

**Algorithm Logic:**
For each element `nums[i]`, its result `answer[i]` is the product of all elements to its left multiplied by the product of all elements to its right.

1.  **Initialize `answer` array:** Create an array `answer` of the same size as `nums`, and fill it with `1`s. This array will eventually store our final result.
2.  **Calculate Prefix Products (Left-to-Right Pass):**
    *   Initialize a variable `prefixProduct = 1`.
    *   Iterate from `i = 0` to `n-1`:
        *   `answer[i]` will initially store the product of all elements *to its left*. So, `answer[i] = prefixProduct`.
        *   Update `prefixProduct` by multiplying it with `nums[i]` (for the next iteration).
    *   After this pass, `answer[i]` contains `nums[0] * nums[1] * ... * nums[i-1]`.
        For `answer[0]`, this product is `1` (empty prefix product).
3.  **Calculate Suffix Products and Combine (Right-to-Left Pass):**
    *   Initialize a variable `suffixProduct = 1`.
    *   Iterate from `i = n-1` down to `0`:
        *   Multiply `answer[i]` (which currently holds the prefix product) by `suffixProduct` (which holds the product of elements *to its right*). This gives the final result for `answer[i]`.
        *   Update `suffixProduct` by multiplying it with `nums[i]` (for the next iteration).

**Step-by-Step Example:** `nums = [1,2,3,4]`

**Initialization:**
`n = 4`
`answer = [1, 1, 1, 1]`

**Pass 1: Left-to-Right (Prefix Products)**
`prefixProduct = 1`

*   `i = 0`: `answer[0] = prefixProduct` (which is 1). `prefixProduct = 1 * nums[0] = 1 * 1 = 1`.
    `answer = [1, 1, 1, 1]`
*   `i = 1`: `answer[1] = prefixProduct` (which is 1). `prefixProduct = 1 * nums[1] = 1 * 2 = 2`.
    `answer = [1, 1, 1, 1]`
*   `i = 2`: `answer[2] = prefixProduct` (which is 2). `prefixProduct = 2 * nums[2] = 2 * 3 = 6`.
    `answer = [1, 1, 2, 1]`
*   `i = 3`: `answer[3] = prefixProduct` (which is 6). `prefixProduct = 6 * nums[3] = 6 * 4 = 24`.
    `answer = [1, 1, 2, 6]`

*State after Pass 1 (Intermediate `answer` array):* `[1, 1, 2, 6]`
   (These are `[product_of_elements_left_of_0, product_of_elements_left_of_1, ...]`)

**Pass 2: Right-to-Left (Suffix Products & Final Combination)**
`suffixProduct = 1`

*   `i = 3`: `answer[3] = answer[3] * suffixProduct = 6 * 1 = 6`. `suffixProduct = 1 * nums[3] = 1 * 4 = 4`.
    `answer = [1, 1, 2, 6]`
*   `i = 2`: `answer[2] = answer[2] * suffixProduct = 2 * 4 = 8`. `suffixProduct = 4 * nums[2] = 4 * 3 = 12`.
    `answer = [1, 1, 8, 6]`
*   `i = 1`: `answer[1] = answer[1] * suffixProduct = 1 * 12 = 12`. `suffixProduct = 12 * nums[1] = 12 * 2 = 24`.
    `answer = [1, 12, 8, 6]`
*   `i = 0`: `answer[0] = answer[0] * suffixProduct = 1 * 24 = 24`. `suffixProduct = 24 * nums[0] = 24 * 1 = 24`.
    `answer = [24, 12, 8, 6]`

**Final Result:** `[24, 12, 8, 6]`

**Time Complexity:** O(N)
Two passes over the array.
**Space Complexity:** O(1) auxiliary space (if the output array doesn't count towards extra space, which is typically the case for this problem). If the output array counts, then O(N).

---

### B. Brute-Force Approach

This method directly applies the problem definition but is inefficient.

**Algorithm Logic:**
For each `nums[i]`, iterate through the entire array again, multiplying all elements *except* `nums[i]`.

**Step-by-Step Example:** `nums = [1,2,3,4]`

*   `i = 0 (nums[0]=1)`: Product of `2,3,4` is `24`. `answer[0] = 24`.
*   `i = 1 (nums[1]=2)`: Product of `1,3,4` is `12`. `answer[1] = 12`.
*   `i = 2 (nums[2]=3)`: Product of `1,2,4` is `8`. `answer[2] = 8`.
*   `i = 3 (nums[3]=4)`: Product of `1,2,3` is `6`. `answer[3] = 6`.

**Time Complexity:** O(N^2)
Nested loops, where `N` is the length of the array.
**Space Complexity:** O(N)
For the output array.

---

**Edge Cases and Gotchas for Product Except Self:**

*   **Zeros in the array:**
    *   **One zero:** If there's exactly one zero, say at `nums[k]`, then `answer[k]` will be the product of all other elements, and all other `answer[i]` (where `i != k`) will be `0`.
    *   **Multiple zeros:** If there are two or more zeros, then every element in the `answer` array will be `0`.
    The prefix/suffix product method handles these cases naturally.
*   **Negative numbers:** The logic works correctly with negative numbers.
*   **Single element array:** The problem usually implies `N >= 2`. If `N=1`, the product of "all other elements" is an empty product, which is typically `1`. Our optimal solution correctly returns `[1]` for `nums=[5]`.
*   **Overflow:** The problem states "product... is guaranteed to fit in a 32-bit integer." In JavaScript, numbers are 64-bit floating point, so overflow is less likely for standard integer ranges. However, in languages like Java/C++, this is a critical consideration.

---

## 3. Maximum Subarray Sum (Kadane's Algorithm)

**Problem:** Given an integer array `nums`, find the contiguous subarray which has the largest sum and return its sum.

### A. Kadane's Algorithm (Optimal Dynamic Programming)

Kadane's algorithm is a classic example of dynamic programming that solves this problem in linear time.

**Algorithm Logic:**
The core idea is to maintain two variables:
1.  `currentMax`: The maximum sum of a subarray *ending at the current position*.
2.  `maxSoFar`: The overall maximum sum found anywhere in the array so far.

As we iterate through the array:
*   For each element `num`, we decide if it's better to start a **new subarray** at `num` (meaning `num` itself is the current max sum ending here) or to **extend the previous subarray** by adding `num` to `currentMax`.
    So, `currentMax = Math.max(num, currentMax + num)`.
*   At each step, we update `maxSoFar` by comparing it with the current `currentMax`.
    `maxSoFar = Math.max(maxSoFar, currentMax)`.

**Key Insight:** If `currentMax` (sum ending at previous position) becomes negative, it's better to "reset" the subarray and start a new one from the current element, because a negative prefix will only reduce the sum of any future positive elements.

**Step-by-Step Example:** `nums = [-2,1,-3,4,-1,2,1,-5,4]`

**Initialization:**
`maxSoFar = nums[0] = -2`
`currentMax = nums[0] = -2`

**Iteration (`i` from 1 to `N-1`):**

*   `i = 1, num = 1`:
    *   `currentMax = Math.max(1, -2 + 1) = Math.max(1, -1) = 1`
    *   `maxSoFar = Math.max(-2, 1) = 1`
    *   *Interpretation:* At index 1, max sum ending here is `[1]`, total max sum is `1`.

*   `i = 2, num = -3`:
    *   `currentMax = Math.max(-3, 1 + -3) = Math.max(-3, -2) = -2`
    *   `maxSoFar = Math.max(1, -2) = 1`
    *   *Interpretation:* At index 2, max sum ending here is `[1,-3]`, total max sum is still `1`.

*   `i = 3, num = 4`:
    *   `currentMax = Math.max(4, -2 + 4) = Math.max(4, 2) = 4`
    *   `maxSoFar = Math.max(1, 4) = 4`
    *   *Interpretation:* At index 3, max sum ending here is `[4]`, total max sum is `4`. (It's better to start new subarray at `4` than continue `-2+4` because previous `currentMax` was `-2`).

*   `i = 4, num = -1`:
    *   `currentMax = Math.max(-1, 4 + -1) = Math.max(-1, 3) = 3`
    *   `maxSoFar = Math.max(4, 3) = 4`

*   `i = 5, num = 2`:
    *   `currentMax = Math.max(2, 3 + 2) = Math.max(2, 5) = 5`
    *   `maxSoFar = Math.max(4, 5) = 5`

*   `i = 6, num = 1`:
    *   `currentMax = Math.max(1, 5 + 1) = Math.max(1, 6) = 6`
    *   `maxSoFar = Math.max(5, 6) = 6`

*   `i = 7, num = -5`:
    *   `currentMax = Math.max(-5, 6 + -5) = Math.max(-5, 1) = 1`
    *   `maxSoFar = Math.max(6, 1) = 6`

*   `i = 8, num = 4`:
    *   `currentMax = Math.max(4, 1 + 4) = Math.max(4, 5) = 5`
    *   `maxSoFar = Math.max(6, 5) = 6`

**Final Result:** `6`

**Visual Diagram (Conceptual):**

```
Array:      [-2,  1, -3,  4, -1,  2,  1, -5,  4 ]
currentMax: [-2,  1, -2,  4,  3,  5,  6,  1,  5 ] (max sum ending at this point)
maxSoFar:   [-2,  1,  1,  4,  4,  5,  6,  6,  6 ] (overall max sum found)

Illustrating `currentMax = Math.max(num, currentMax + num)`:
  Index 0: num=-2. currentMax = max(-2, 0-2) = -2 (start new)
  Index 1: num=1.  currentMax = max(1, -2+1) = 1 (start new, as -2+1 < 1)
  Index 2: num=-3. currentMax = max(-3, 1-3) = -2 (continue)
  Index 3: num=4.  currentMax = max(4, -2+4) = 4 (start new, as -2+4 < 4)
  ... and so on
```

**Time Complexity:** O(N)
A single pass through the array.
**Space Complexity:** O(1)
Only a few variables are used.

---

### B. Brute-Force Approach

This method checks all possible contiguous subarrays.

**Algorithm Logic:**
1.  Initialize `maxSum` to negative infinity (or the first element).
2.  Use nested loops:
    *   Outer loop (`i`): Represents the starting index of a subarray.
    *   Inner loop (`j`): Represents the ending index of a subarray.
3.  Inside the inner loop, calculate the sum of the subarray `nums[i...j]` and update `maxSum` if it's greater than the current `maxSum`.

**Step-by-Step Example:** `nums = [1, -2, 3]`

*   `maxSum = 1` (init with `nums[0]`)

*   `i = 0`:
    *   `j = 0`: `currentSum = 1`. `maxSum = max(1, 1) = 1`. Subarray: `[1]`
    *   `j = 1`: `currentSum = 1 + (-2) = -1`. `maxSum = max(1, -1) = 1`. Subarray: `[1, -2]`
    *   `j = 2`: `currentSum = -1 + 3 = 2`. `maxSum = max(1, 2) = 2`. Subarray: `[1, -2, 3]`

*   `i = 1`:
    *   `currentSum = 0` (reset for new start)
    *   `j = 1`: `currentSum = -2`. `maxSum = max(2, -2) = 2`. Subarray: `[-2]`
    *   `j = 2`: `currentSum = -2 + 3 = 1`. `maxSum = max(2, 1) = 2`. Subarray: `[-2, 3]`

*   `i = 2`:
    *   `currentSum = 0`
    *   `j = 2`: `currentSum = 3`. `maxSum = max(2, 3) = 3`. Subarray: `[3]`

**Final Result:** `3`

**Time Complexity:** O(N^2)
Nested loops, one for start index and one for end index.
**Space Complexity:** O(1) auxiliary space.

---

**Edge Cases and Gotchas for Max Subarray Sum:**

*   **All negative numbers:** Kadane's algorithm correctly handles this. `maxSoFar` will be the largest (closest to zero) single negative number. E.g., `[-5, -2, -8]` correctly returns `-2`.
*   **Single element array:** Handled correctly. `maxSoFar` is initialized to this element, and the loop doesn't run, or if it runs from `i=0` it compares itself to itself.
*   **Empty array:** The problem usually specifies at least one number. If allowed, it should probably throw an error or return 0. Our implementation throws an error.

---

## 4. Merge Overlapping Intervals

**Problem:** Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return a new array of non-overlapping intervals.

### A. Sorting and Single Pass (Optimal)

This approach is the standard and most efficient way to solve the problem.

**Algorithm Logic:**
The key insight is that if you sort the intervals by their start times, you only need to look at the current interval and the **last merged interval** to determine if they overlap.

1.  **Sort Intervals:** Sort the input `intervals` array based on the start time of each interval. If start times are equal, sort by end times (though this usually doesn't affect correctness for merging).
2.  **Initialize `merged` list:** Create an empty list called `merged` to store the result.
3.  **Iterate and Merge:**
    *   Add the first interval from the sorted list to `merged`.
    *   For each subsequent interval in the sorted list:
        *   Let `currentInterval` be the interval being considered.
        *   Let `lastMergedInterval` be the last interval added to the `merged` list.
        *   **Check for Overlap:** If `currentInterval[0] <= lastMergedInterval[1]` (the current interval starts before or at the end of the last merged interval), then they overlap.
            *   **Merge:** Update the end time of `lastMergedInterval` to be `Math.max(lastMergedInterval[1], currentInterval[1])`. This ensures the merged interval covers both.
        *   **No Overlap:** If `currentInterval[0] > lastMergedInterval[1]`, there's no overlap.
            *   **Add New:** Add `currentInterval` as a new, distinct interval to the `merged` list.
4.  **Return `merged` list.**

**Step-by-Step Example:** `intervals = [[1,3],[8,10],[2,6],[15,18]]`

1.  **Sort:** `intervals` becomes `[[1,3],[2,6],[8,10],[15,18]]`

2.  **Initialize `merged = []`**

3.  **Iteration:**
    *   **Add first interval:** `merged.push([1,3])`
        `merged = [[1,3]]`

    *   **Current: `[2,6]`**
        *   `lastMergedInterval = [1,3]`
        *   Check overlap: `current[0] (2) <= last[1] (3)`? Yes, `2 <= 3`. **Overlap!**
        *   Merge: Update `lastMergedInterval[1]` to `Math.max(3, 6) = 6`.
        *   `merged = [[1,6]]`

    *   **Current: `[8,10]`**
        *   `lastMergedInterval = [1,6]`
        *   Check overlap: `current[0] (8) <= last[1] (6)`? No, `8 > 6`. **No overlap.**
        *   Add new: `merged.push([8,10])`
        *   `merged = [[1,6],[8,10]]`

    *   **Current: `[15,18]`**
        *   `lastMergedInterval = [8,10]`
        *   Check overlap: `current[0] (15) <= last[1] (10)`? No, `15 > 10`. **No overlap.**
        *   Add new: `merged.push([15,18])`
        *   `merged = [[1,6],[8,10],[15,18]]`

**Final Result:** `[[1,6],[8,10],[15,18]]`

**Visual Diagram (ASCII Art):**

```
Sorted Intervals:
[1,3] [2,6] [8,10] [15,18]
      ^
      Intervals sorted by start point

Processing:

1. Add [1,3] to merged:
   Merged: [[1,3]]

2. Current: [2,6]
   Last merged: [1,3]
   Overlap: Yes (2 <= 3)
   Merge: Extend last to cover max end
   Merged: [[1,6]]
           <----->
           (covers [1,3] and [2,6])

3. Current: [8,10]
   Last merged: [1,6]
   Overlap: No (8 > 6)
   Add new:
   Merged: [[1,6], [8,10]]
                      <---->

4. Current: [15,18]
   Last merged: [8,10]
   Overlap: No (15 > 10)
   Add new:
   Merged: [[1,6], [8,10], [15,18]]
                               <---->

Final Result: [[1,6],[8,10],[15,18]]
```

**Time Complexity:** O(N log N)
Dominated by the sorting step. The single pass iteration is O(N).
**Space Complexity:** O(N)
For the `merged` list, and potentially for the sorted copy of intervals if the `sort` implementation doesn't sort in-place (JavaScript's `Array.prototype.sort` generally sorts in-place).

---

**Edge Cases and Gotchas for Merge Overlapping Intervals:**

*   **Empty input array:** Return an empty array.
*   **Single interval:** No merging possible, return the interval as is.
*   **Intervals that touch:** E.g., `[1,4]` and `[4,5]`. These are considered overlapping and should merge to `[1,5]`. The condition `current[0] <= last[1]` correctly handles this (`4 <= 4`).
*   **One interval completely subsumes another:** E.g., `[1,10]` and `[2,3]`. The `Math.max` in the merge step correctly ensures the larger interval's end point is maintained.
*   **All intervals overlap:** All should merge into one large interval.
*   **No intervals overlap:** The `merged` list will simply contain all original intervals.
*   **Sorting stability:** While not critical for correctness with basic integer intervals, knowing if the sort is stable (preserves relative order of equal elements) can sometimes be relevant for complex objects. JavaScript's `sort` is not guaranteed to be stable for all implementations.
*   **Modifying intervals vs. creating new ones:** The optimal solution modifies the last interval in the `merged` list in-place (by changing its end point). This is fine as it's a new array created for `merged`. If the problem required strictly immutable intervals, you'd need to create new interval objects.

---

### Comparison of Approaches Summary

| Problem                  | Optimal Approach                               | Time Complexity | Space Complexity | Alternative Approaches & Trade-offs                                                                      |
| :----------------------- | :--------------------------------------------- | :-------------- | :--------------- | :------------------------------------------------------------------------------------------------------- |
| **Rotate Array**         | Three Reversals                                | O(N)            | O(1)             | Temp Array (O(N) space), Splice/Unshift (O(N) time for shifting, O(K) space for removed elements)        |
| **Product Except Self**  | Prefix/Suffix Products                         | O(N)            | O(1) auxiliary   | Brute Force (O(N^2) time)                                                                                |
| **Max Subarray Sum**     | Kadane's Algorithm                             | O(N)            | O(1)             | Brute Force (O(N^2) time)                                                                                |
| **Merge Intervals**      | Sort then Single Pass (Greedy)                 | O(N log N)      | O(N)             | No commonly discussed "brute force" that's fundamentally different; variations usually involve map/sweep-line if not allowed to sort. |

---