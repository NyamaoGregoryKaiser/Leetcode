```markdown
# Detailed Algorithm Explanations

This document provides in-depth explanations for the problems implemented in `src/algorithms/arrayManipulation.js`. Each section will cover the problem statement, the core idea behind the optimal solution, step-by-step logic, and illustrative ASCII art diagrams.

## Table of Contents

1.  [Maximum Sum of K-sized Subarray](#1-maximum-sum-of-k-sized-subarray)
2.  [Rotate Array](#2-rotate-array)
3.  [Product of Array Except Self](#3-product-of-array-except-self)
4.  [Merge Overlapping Intervals](#4-merge-overlapping-intervals)

---

## 1. Maximum Sum of K-sized Subarray

### Problem Statement

Given an array of integers `nums` and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.

### Optimal Solution: Sliding Window

The brute-force approach would involve iterating through all possible subarrays of size `k`, calculating their sum, and finding the maximum. This would be O(N*K).
The optimal solution uses the **Sliding Window** technique, which reduces the complexity to O(N).

**Core Idea:**
Instead of recalculating the sum for each subarray from scratch, we "slide" a window of size `k` across the array. When the window slides one position to the right, we subtract the element that goes out of the window from the left and add the new element that comes into the window from the right. This allows us to update the sum in O(1) time per step.

**Step-by-Step Logic:**

1.  **Calculate Initial Window Sum:** Sum the first `k` elements to get the sum of the first window. This will be our initial `maxSum` and `windowSum`.
2.  **Slide the Window:**
    *   Start a loop from `k` to the end of the array (`nums.length`).
    *   In each iteration, update `windowSum`:
        *   Subtract the element that is leaving the window (i.e., `nums[i - k]`).
        *   Add the new element entering the window (i.e., `nums[i]`).
    *   Compare the `windowSum` with `maxSum` and update `maxSum` if `windowSum` is greater.
3.  **Return `maxSum`**.

**Example Walkthrough:**

`nums = [2, 1, 5, 1, 3, 2]`, `k = 3`

1.  **Initial Window (i=0 to k-1):**
    `[2, 1, 5]`
    `windowSum = 2 + 1 + 5 = 8`
    `maxSum = 8`

    ```
    Array: [2, 1, 5, 1, 3, 2]
             ^  ^  ^
             Window
    ```

2.  **Slide 1 (i=3):**
    Element leaving: `nums[0] = 2`
    Element entering: `nums[3] = 1`
    `windowSum = 8 - 2 + 1 = 7`
    `maxSum = max(8, 7) = 8`

    ```
    Array: [2, 1, 5, 1, 3, 2]
                ^  ^  ^
                Window
    ```

3.  **Slide 2 (i=4):**
    Element leaving: `nums[1] = 1`
    Element entering: `nums[4] = 3`
    `windowSum = 7 - 1 + 3 = 9`
    `maxSum = max(8, 9) = 9`

    ```
    Array: [2, 1, 5, 1, 3, 2]
                   ^  ^  ^
                   Window
    ```

4.  **Slide 3 (i=5):**
    Element leaving: `nums[2] = 5`
    Element entering: `nums[5] = 2`
    `windowSum = 9 - 5 + 2 = 6`
    `maxSum = max(9, 6) = 9`

    ```
    Array: [2, 1, 5, 1, 3, 2]
                      ^  ^  ^
                      Window
    ```

Result: `maxSum = 9`

---

## 2. Rotate Array

### Problem Statement

Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.
Perform this operation in-place if possible.

### Approach 1 (Optimal In-Place): Reversal Algorithm

**Core Idea:**
This algorithm leverages the property that reversing a segment of an array, and then reversing another segment, and then reversing the whole array can achieve rotation efficiently in-place.
The key insight is:
*   Original array: `A B C D E F G`
*   Rotate right by `k=3`: `E F G A B C D`
*   This is equivalent to: `(A B C D) (E F G)` -> `(reversed A B C D) (reversed E F G)` -> `D C B A G F E` -> `reversed (D C B A G F E)` -> `E F G A B C D`

**Step-by-Step Logic:**

1.  **Handle `k`:** `k` can be greater than the array length. So, normalize `k` by `k = k % nums.length`.
2.  **Reverse the entire array:** `[1, 2, 3, 4, 5, 6, 7]` -> `[7, 6, 5, 4, 3, 2, 1]`
3.  **Reverse the first `k` elements:** `[7, 6, 5, 4, 3, 2, 1]` -> `[5, 6, 7, 4, 3, 2, 1]` (for `k=3`, `[7, 6, 5]` becomes `[5, 6, 7]`)
4.  **Reverse the remaining `n-k` elements:** `[5, 6, 7, 4, 3, 2, 1]` -> `[5, 6, 7, 1, 2, 3, 4]` (for `n-k=4`, `[4, 3, 2, 1]` becomes `[1, 2, 3, 4]`)

**Helper Function (Reverse):**
A utility `reverse(arr, start, end)` function is used to reverse a portion of the array in-place.

**Example Walkthrough:**

`nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`

1.  `k = 3 % 7 = 3`
2.  **Reverse entire array (0 to 6):**
    `[1, 2, 3, 4, 5, 6, 7]` -> `[7, 6, 5, 4, 3, 2, 1]`
    ```
    Original:   [ 1, 2, 3, 4, 5, 6, 7 ]
    Reversed:   [ 7, 6, 5, 4, 3, 2, 1 ]
    ```
3.  **Reverse first `k=3` elements (0 to 2):**
    `[7, 6, 5, 4, 3, 2, 1]` -> `[5, 6, 7, 4, 3, 2, 1]`
    ```
    Array:      [ 7, 6, 5, 4, 3, 2, 1 ]
                   <----->
                   Reverse this part
    Result:     [ 5, 6, 7, 4, 3, 2, 1 ]
    ```
4.  **Reverse remaining `n-k=4` elements (3 to 6):**
    `[5, 6, 7, 4, 3, 2, 1]` -> `[5, 6, 7, 1, 2, 3, 4]`
    ```
    Array:      [ 5, 6, 7, 4, 3, 2, 1 ]
                         <--------->
                         Reverse this part
    Result:     [ 5, 6, 7, 1, 2, 3, 4 ]
    ```
This is the final rotated array.

---

## 3. Product of Array Except Self

### Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

### Optimal Solution: Prefix and Suffix Products

**Core Idea:**
For each element `nums[i]`, its "product except self" is the product of all elements to its *left* multiplied by the product of all elements to its *right*.
We can calculate all prefix products in one pass and all suffix products in another pass. Then, combine them.

**Step-by-Step Logic:**

1.  **Initialize `answer` array:** Create an array `answer` of the same size as `nums`, filled with 1s. This `answer` array will temporarily store the prefix products, then be updated with suffix products.
2.  **Calculate Left Products (Prefix Products):**
    *   Iterate from left to right (`i` from `0` to `n-1`).
    *   For `answer[i]`, it should store the product of `nums[0] * ... * nums[i-1]`.
    *   Maintain a `leftProduct` variable.
    *   `answer[0]` is initialized to `1` (no elements to its left).
    *   For `i > 0`, `answer[i] = leftProduct`.
    *   Update `leftProduct = leftProduct * nums[i]`.
    *   After this pass, `answer[i]` contains the product of all elements to the left of index `i`.
3.  **Calculate Right Products (Suffix Products) and Final Result:**
    *   Iterate from right to left (`i` from `n-1` down to `0`).
    *   Maintain a `rightProduct` variable.
    *   Multiply `answer[i]` (which currently holds the left product) by `rightProduct` (which holds the product of all elements to its right). This gives the final product.
    *   Update `rightProduct = rightProduct * nums[i]`.

**Example Walkthrough:**

`nums = [1, 2, 3, 4]`

1.  **Initialize `answer` array:**
    `answer = [1, 1, 1, 1]`

2.  **Calculate Left Products:**
    *   `leftProduct = 1`
    *   `i = 0`: `answer[0] = 1`. `leftProduct = 1 * nums[0] = 1 * 1 = 1`.
    *   `i = 1`: `answer[1] = leftProduct = 1`. `leftProduct = 1 * nums[1] = 1 * 2 = 2`.
    *   `i = 2`: `answer[2] = leftProduct = 2`. `leftProduct = 2 * nums[2] = 2 * 3 = 6`.
    *   `i = 3`: `answer[3] = leftProduct = 6`. `leftProduct = 6 * nums[3] = 6 * 4 = 24`.
    *   After Left Products pass: `answer = [1, 1, 2, 6]` (stores `[P(left of 0), P(left of 1), P(left of 2), P(left of 3)]`)

    ```
    nums:    [ 1,   2,   3,   4 ]
    answer:  [ 1,   1,   2,   6 ]  <-- Prefix products for elements *before* index i
    ```

3.  **Calculate Right Products and Final Result:**
    *   `rightProduct = 1`
    *   `i = 3`: `answer[3] = answer[3] * rightProduct = 6 * 1 = 6`. `rightProduct = 1 * nums[3] = 1 * 4 = 4`.
    *   `i = 2`: `answer[2] = answer[2] * rightProduct = 2 * 4 = 8`. `rightProduct = 4 * nums[2] = 4 * 3 = 12`.
    *   `i = 1`: `answer[1] = answer[1] * rightProduct = 1 * 12 = 12`. `rightProduct = 12 * nums[1] = 12 * 2 = 24`.
    *   `i = 0`: `answer[0] = answer[0] * rightProduct = 1 * 24 = 24`. `rightProduct = 24 * nums[0] = 24 * 1 = 24`.
    *   After Right Products pass: `answer = [24, 12, 8, 6]` (final result)

    ```
    nums:    [ 1,   2,   3,   4 ]
    answer:  [ 1,   1,   2,   6 ]  (from previous step)

    i=3: answer[3] = 6 * 1 = 6. rightProduct = 4
    answer:  [ 1,   1,   2,   6 ]
                            ^  (rightProduct = 1)
                                  Product of elements to the right of 3: (empty) = 1

    i=2: answer[2] = 2 * 4 = 8. rightProduct = 12
    answer:  [ 1,   1,   8,   6 ]
                         ^  (rightProduct = 4)
                                  Product of elements to the right of 2: [4] = 4

    i=1: answer[1] = 1 * 12 = 12. rightProduct = 24
    answer:  [ 1,   12,  8,   6 ]
                     ^  (rightProduct = 12)
                                  Product of elements to the right of 1: [3, 4] = 12

    i=0: answer[0] = 1 * 24 = 24. rightProduct = 24
    answer:  [ 24,  12,  8,   6 ]
               ^  (rightProduct = 24)
                                  Product of elements to the right of 0: [2, 3, 4] = 24

    Final Result: [24, 12, 8, 6]
    ```

---

## 4. Merge Overlapping Intervals

### Problem Statement

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Optimal Solution: Sort and Merge

**Core Idea:**
The key to merging intervals is to first sort them. Once sorted by their start times, overlapping intervals will always be adjacent or follow each other closely. This simplifies the merging logic significantly.

**Step-by-Step Logic:**

1.  **Handle Edge Cases:** If there are 0 or 1 intervals, there's nothing to merge, so return the input array as is.
2.  **Sort Intervals:** Sort the `intervals` array based on the `start` time of each interval. If `start` times are equal, sort by `end` times (though not strictly necessary for correctness, it can make it deterministic).
3.  **Initialize `merged` list:** Create an empty list called `merged` to store the non-overlapping intervals. Add the first interval from the sorted list to `merged`.
4.  **Iterate and Merge:**
    *   Iterate through the sorted intervals starting from the second interval.
    *   For each current interval `[currentStart, currentEnd]`, compare it with the `[lastMergedStart, lastMergedEnd]` interval in the `merged` list.
    *   **If Overlap:** If `currentStart <= lastMergedEnd`, it means there's an overlap. Update the `lastMergedEnd` to be the maximum of `lastMergedEnd` and `currentEnd`. Effectively, `merged[lastIndex] = [lastMergedStart, max(lastMergedEnd, currentEnd)]`.
    *   **If No Overlap:** If `currentStart > lastMergedEnd`, there is no overlap. The `current` interval is distinct and should be added as a new interval to the `merged` list.
5.  **Return `merged` list**.

**Example Walkthrough:**

`intervals = [[1,3], [2,6], [8,10], [15,18]]`

1.  **Sort Intervals:** (Already sorted by start time in this example)
    `[[1,3], [2,6], [8,10], [15,18]]`

2.  **Initialize `merged`:**
    `merged = [[1,3]]` (Add the first interval)

    ```
    Sorted Intervals: [ [1,3], [2,6], [8,10], [15,18] ]
    Merged:           [ [1,3] ]
                      ^
                      lastMerged: [1,3]
    ```

3.  **Iterate and Merge:**

    *   **Current Interval: `[2,6]`**
        *   `lastMerged = [1,3]`
        *   `currentStart (2) <= lastMergedEnd (3)` -> **Overlap!**
        *   Update `lastMergedEnd` to `max(3, 6) = 6`.
        *   `merged` becomes `[[1,6]]`.

        ```
        Sorted: [ [1,3], [2,6], [8,10], [15,18] ]
                         ^
                         Current: [2,6]
        Merged: [ [1,6] ]
                  ^
                  lastMerged: [1,6]
        ```

    *   **Current Interval: `[8,10]`**
        *   `lastMerged = [1,6]`
        *   `currentStart (8) > lastMergedEnd (6)` -> **No Overlap!**
        *   Add `[8,10]` as a new interval to `merged`.
        *   `merged` becomes `[[1,6], [8,10]]`.

        ```
        Sorted: [ [1,3], [2,6], [8,10], [15,18] ]
                                 ^
                                 Current: [8,10]
        Merged: [ [1,6], [8,10] ]
                           ^
                           lastMerged: [8,10]
        ```

    *   **Current Interval: `[15,18]`**
        *   `lastMerged = [8,10]`
        *   `currentStart (15) > lastMergedEnd (10)` -> **No Overlap!**
        *   Add `[15,18]` as a new interval to `merged`.
        *   `merged` becomes `[[1,6], [8,10], [15,18]]`.

        ```
        Sorted: [ [1,3], [2,6], [8,10], [15,18] ]
                                         ^
                                         Current: [15,18]
        Merged: [ [1,6], [8,10], [15,18] ]
                                   ^
                                   lastMerged: [15,18]
        ```

Final Result: `[[1,6], [8,10], [15,18]]`
```