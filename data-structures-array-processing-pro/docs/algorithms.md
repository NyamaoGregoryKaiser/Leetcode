```markdown
# Algorithm Explanations for Array Manipulation Problems

This document provides detailed explanations of the algorithms implemented for each problem, focusing on their logic, time complexity, and space complexity.

---

## 1. Rotate Array

**Problem:** Given an integer array `nums`, rotate the array to the right by `k` steps. This must be done in-place.

### Approach 1: Using a Temporary Array (Non-Optimal, Not In-place)

*   **Logic:**
    1.  Create a new temporary array `temp` of the same size as `nums`.
    2.  Iterate through `nums` from `i = 0` to `n-1`.
    3.  For each element `nums[i]`, place it in `temp` at the index `(i + k) % n`. The modulo operator `% n` handles wrapping around the array.
    4.  After filling `temp`, copy all elements from `temp` back into `nums`.

*   **Time Complexity:** `O(N)`
    *   One pass to fill the temporary array.
    *   One pass to copy back to the original array.
*   **Space Complexity:** `O(N)`
    *   Requires a temporary array of size `N`.

### Approach 2: Using the Reverse Technique (Optimal, In-place)

*   **Logic:** This clever approach uses three reversals to achieve the rotation in-place.
    1.  Normalize `k`: `k = k % n` (where `n` is the array length) to handle rotations larger than the array size.
    2.  **Reverse the entire array:** This brings the last `k` elements to the beginning in reverse order, and the first `n-k` elements to the end in reverse order.
        *   Example: `[1,2,3,4,5,6,7]`, `k=3` -> Reverse all: `[7,6,5,4,3,2,1]`
    3.  **Reverse the first `k` elements:** This puts the first `k` (originally last `k`) elements into their correct rotated order.
        *   Example: `[7,6,5,4,3,2,1]` -> Reverse first 3: `[5,6,7,4,3,2,1]`
    4.  **Reverse the remaining `n-k` elements:** This puts the remaining elements (originally first `n-k`) into their correct rotated order.
        *   Example: `[5,6,7,4,3,2,1]` -> Reverse last `n-k=4` elements: `[5,6,7,1,2,3,4]`

*   **Time Complexity:** `O(N)`
    *   Each reversal operation takes `O(N)` time (or `O(length_of_subarray_reversed)`). Since we do 3 reversals over parts of the array, it's `3 * O(N)` which simplifies to `O(N)`.
*   **Space Complexity:** `O(1)`
    *   All operations are performed in-place without using extra arrays.

### Approach 3: Cyclic Replacements (In-place)

*   **Logic:**
    1.  Normalize `k`: `k = k % n`.
    2.  Start with `count = 0` (number of elements moved) and `start = 0` (starting index for a cycle).
    3.  Loop while `count < n`:
        *   Store `nums[start]` in a `prev` variable.
        *   Set `current = start`.
        *   Enter a `do-while` loop:
            *   Calculate `next = (current + k) % n`. This is the target position for `prev`.
            *   Store `nums[next]` in a `temp` variable.
            *   Place `prev` into `nums[next]`.
            *   Update `prev = temp` (the element that was just displaced).
            *   Update `current = next` (move to the next position in the cycle).
            *   Increment `count`.
        *   The inner `do-while` loop continues until `current` returns to `start`, completing one cycle.
        *   After a cycle, increment `start` to begin a new cycle if not all elements have been moved. The number of cycles is `gcd(n, k)`.

*   **Time Complexity:** `O(N)`
    *   Each element is visited and moved exactly once.
*   **Space Complexity:** `O(1)`
    *   Only a few extra variables are used.

---

## 2. Maximum Subarray Sum (Kadane's Algorithm)

**Problem:** Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.

### Approach 1: Brute Force (O(N^2))

*   **Logic:**
    1.  Initialize `maxSum` to negative infinity (or the first element).
    2.  Use a nested loop:
        *   The outer loop (`i`) picks a starting point for the subarray.
        *   The inner loop (`j`) extends the subarray from `i` to `j`.
        *   Calculate the `currentSum` of `nums[i...j]`.
        *   Update `maxSum = Math.max(maxSum, currentSum)`.

*   **Time Complexity:** `O(N^2)`
    *   The outer loop runs `N` times. The inner loop runs up to `N` times for each outer loop iteration.
*   **Space Complexity:** `O(1)`
    *   Only a few variables are used.

### Approach 2: Kadane's Algorithm (Optimal, O(N))

*   **Logic (Dynamic Programming):** This algorithm iterates through the array once, keeping track of two values:
    1.  `currentMax`: The maximum sum of a subarray ending at the *current* position.
    2.  `globalMax`: The overall maximum sum found anywhere in the array so far.

    The key idea is that for each element `num` at index `i`:
    *   The maximum sum ending at `i` (`currentMax`) is either `num` itself (meaning we start a new subarray from `num` because adding `num` to the previous `currentMax` would make it smaller) OR `num` added to the maximum sum ending at `i-1` (`currentMax + num`).
        `currentMax = Math.max(num, currentMax + num);`
    *   The `globalMax` is then updated by comparing it with the `currentMax` found at the current position.
        `globalMax = Math.max(globalMax, currentMax);`

    Initialization: `currentMax` and `globalMax` are both initialized to `nums[0]`. This correctly handles arrays with all negative numbers (e.g., `[-2, -1]` should return `-1`).

*   **Time Complexity:** `O(N)`
    *   A single pass through the array.
*   **Space Complexity:** `O(1)`
    *   Only two variables (`currentMax`, `globalMax`) are needed.

---

## 3. Trapping Rain Water

**Problem:** Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining.

### Approach 1: Brute Force (O(N^2))

*   **Logic:** For each bar (excluding the first and last, which can't trap water), calculate the amount of water it can hold.
    1.  Initialize `totalWater = 0`.
    2.  Iterate from `i = 1` to `n-2` (second bar to second-to-last bar).
    3.  For each `height[i]`:
        *   Find `maxLeft`: The maximum height of a bar from index `0` to `i` (inclusive).
        *   Find `maxRight`: The maximum height of a bar from index `i` to `n-1` (inclusive).
        *   The water trapped above `height[i]` is `max(0, min(maxLeft, maxRight) - height[i])`.
        *   Add this amount to `totalWater`.

*   **Time Complexity:** `O(N^2)`
    *   Outer loop runs `N` times. Inner loops (to find `maxLeft` and `maxRight`) each run up to `N` times.
*   **Space Complexity:** `O(1)`
    *   Only a few variables are used.

### Approach 2: Dynamic Programming (O(N) Time, O(N) Space)

*   **Logic:** Precompute the maximum left and right heights for each position to avoid redundant calculations.
    1.  Create `leftMax` array of size `N`. `leftMax[i]` will store the maximum height encountered from `height[0]` to `height[i]`.
        *   `leftMax[0] = height[0]`
        *   `for i = 1 to n-1: leftMax[i] = Math.max(leftMax[i-1], height[i])`
    2.  Create `rightMax` array of size `N`. `rightMax[i]` will store the maximum height encountered from `height[n-1]` to `height[i]`.
        *   `rightMax[n-1] = height[n-1]`
        *   `for i = n-2 down to 0: rightMax[i] = Math.max(rightMax[i+1], height[i])`
    3.  Initialize `totalWater = 0`.
    4.  Iterate from `i = 0` to `n-1`. For each bar:
        *   `totalWater += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i])`

*   **Time Complexity:** `O(N)`
    *   Three passes over the array (one for `leftMax`, one for `rightMax`, one for calculating water).
*   **Space Complexity:** `O(N)`
    *   Two additional arrays (`leftMax`, `rightMax`) of size `N`.

### Approach 3: Two Pointers (Optimal, O(N) Time, O(1) Space)

*   **Logic:** This approach is the most efficient. It uses two pointers (`left` and `right`) starting at the ends of the array and moves them inward. It tracks the `maxLeft` and `maxRight` heights encountered so far.
    *   Initialize `left = 0`, `right = n-1`.
    *   Initialize `maxLeft = 0`, `maxRight = 0`.
    *   Initialize `totalWater = 0`.
    *   While `left < right`:
        *   If `height[left] < height[right]`:
            *   We are limited by the `left` side.
            *   Update `maxLeft = Math.max(maxLeft, height[left])`.
            *   If `height[left] < maxLeft` (meaning there's a higher wall to the left), then water can be trapped: `totalWater += maxLeft - height[left]`.
            *   Increment `left`.
        *   Else (`height[left] >= height[right]`):
            *   We are limited by the `right` side.
            *   Update `maxRight = Math.max(maxRight, height[right])`.
            *   If `height[right] < maxRight` (meaning there's a higher wall to the right), then water can be trapped: `totalWater += maxRight - height[right]`.
            *   Decrement `right`.

*   **Why this works:** When `height[left] < height[right]`, it means that the water trapped at `left` (and any points to its right up to `right`) will *at most* be bounded by `maxLeft` and `height[right]`. Since we already know `height[left] < height[right]`, the actual right boundary for `height[left]` will be at least `height[right]`. Thus, the water at `left` is solely determined by `maxLeft`. A similar argument applies when `height[left] >= height[right]`.

*   **Time Complexity:** `O(N)`
    *   The two pointers traverse the array once.
*   **Space Complexity:** `O(1)`
    *   Only a few variables are used.

---

## 4. Product of Array Except Self

**Problem:** Given an integer array `nums`, return an array `answer` where `answer[i]` is the product of all elements in `nums` except `nums[i]`. Must be `O(N)` time and without division.

### Approach 1: Using Division (Disallowed by Problem)

*   **Logic:**
    1.  Calculate `totalProduct` of all elements in `nums`.
    2.  Count the number of zeros (`zeroCount`) and note the `zeroIndex`.
    3.  If `zeroCount > 1`: all results are 0.
    4.  If `zeroCount == 1`: only `answer[zeroIndex]` is `totalProduct` (product of non-zero elements), others are 0.
    5.  If `zeroCount == 0`: `answer[i] = totalProduct / nums[i]`.

*   **Time Complexity:** `O(N)`
*   **Space Complexity:** `O(1)` (excluding output array)

### Approach 2: Two-Pass Prefix and Suffix Products (Optimal, No Division)

*   **Logic:** This elegant solution involves two passes to build up the products from both left and right sides.
    1.  **Initialize `answer` array:** Create an `answer` array of the same size as `nums`.
    2.  **First Pass (Left Products / Prefix Products):**
        *   Initialize `answer[0] = 1`. (There are no elements to the left of the first element, so their product is 1).
        *   Iterate from `i = 1` to `n-1`:
            *   `answer[i] = answer[i-1] * nums[i-1]`
        *   After this pass, `answer[i]` stores the product of all elements to the *left* of `nums[i]`.
            *   Example: `nums = [1,2,3,4]` -> `answer = [1, 1, 2, 6]`
                *   `answer[0] = 1`
                *   `answer[1] = answer[0] * nums[0] = 1 * 1 = 1`
                *   `answer[2] = answer[1] * nums[1] = 1 * 2 = 2`
                *   `answer[3] = answer[2] * nums[2] = 2 * 3 = 6`
    3.  **Second Pass (Right Products / Suffix Products and Final Calculation):**
        *   Initialize `rightProduct = 1`. (There are no elements to the right of the last element, so their product is 1). This variable will accumulate the product of elements to the right as we move left.
        *   Iterate from `i = n-1` down to `0`:
            *   `answer[i] = answer[i] * rightProduct` (Multiply the left product by the right product to get the total product except `nums[i]`).
            *   `rightProduct = rightProduct * nums[i]` (Update `rightProduct` to include the current `nums[i]` for the next iteration to its left).
        *   Example (continuing from above): `nums = [1,2,3,4]`, initial `answer = [1, 1, 2, 6]`
            *   `i=3`: `answer[3] = answer[3] * 1 = 6 * 1 = 6`. `rightProduct = 1 * nums[3] = 4`.
            *   `i=2`: `answer[2] = answer[2] * 4 = 2 * 4 = 8`. `rightProduct = 4 * nums[2] = 12`.
            *   `i=1`: `answer[1] = answer[1] * 12 = 1 * 12 = 12`. `rightProduct = 12 * nums[1] = 24`.
            *   `i=0`: `answer[0] = answer[0] * 24 = 1 * 24 = 24`. `rightProduct = 24 * nums[0] = 24`.
        *   Final `answer = [24, 12, 8, 6]`.

*   **Time Complexity:** `O(N)`
    *   Two passes over the array.
*   **Space Complexity:** `O(1)` (excluding the output array `answer`, which is typically not counted as "extra" space in this problem type).

```