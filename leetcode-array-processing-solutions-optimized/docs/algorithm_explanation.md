```markdown
# Algorithm Explanations for Array Manipulation Problems

This document provides detailed explanations for the algorithms implemented in this project, focusing on their logic, time complexity, and space complexity.

---

## 1. Maximum Subarray Sum (Kadane's Algorithm)

### Problem Description
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

### Optimal Solution: Kadane's Algorithm
*   **Approach**: Dynamic Programming
*   **Logic**:
    Kadane's algorithm iterates through the array and maintains two variables:
    1.  `current_max`: The maximum sum of a subarray ending at the current position.
    2.  `max_so_far`: The overall maximum sum found anywhere in the array.

    At each element `num`, `current_max` is updated to be the maximum of `num` itself (starting a new subarray from `num`) or `current_max + num` (extending the current subarray).
    `max_so_far` is then updated to be the maximum of its current value and `current_max`.

    This works because if `current_max` becomes negative, it means adding previous elements would decrease any future sum. So, it's better to restart the subarray from the current element `num`. The initialization of `max_so_far` and `current_max` with `nums[0]` ensures correct handling for arrays containing all negative numbers (where the result is the largest single negative number).

*   **Example**: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
    | Index | Element | `current_max` (`max(nums[i], current_max + nums[i])`) | `max_so_far` (`max(max_so_far, current_max)`) |
    | :---- | :------ | :------------------------------------------------------ | :--------------------------------------------- |
    | 0     | -2      | -2                                                      | -2                                             |
    | 1     | 1       | `max(1, -2+1)` = 1                                      | `max(-2, 1)` = 1                               |
    | 2     | -3      | `max(-3, 1-3)` = -2                                     | `max(1, -2)` = 1                               |
    | 3     | 4       | `max(4, -2+4)` = 4                                      | `max(1, 4)` = 4                                |
    | 4     | -1      | `max(-1, 4-1)` = 3                                      | `max(4, 3)` = 4                                |
    | 5     | 2       | `max(2, 3+2)` = 5                                       | `max(4, 5)` = 5                                |
    | 6     | 1       | `max(1, 5+1)` = 6                                       | `max(5, 6)` = 6                                |
    | 7     | -5      | `max(-5, 6-5)` = 1                                      | `max(6, 1)` = 6                                |
    | 8     | 4       | `max(4, 1+4)` = 5                                       | `max(6, 5)` = 6                                |

    Final `max_so_far`: 6

*   **Time Complexity**: `O(N)`
    We iterate through the array exactly once.
*   **Space Complexity**: `O(1)`
    We use only a few constant extra variables.

### Brute Force Solution
*   **Logic**:
    Iterate through all possible subarrays. For each possible start index `i` and end index `j`, calculate the sum of `nums[i...j]` and update a global maximum.
*   **Time Complexity**: `O(N^2)`
    Two nested loops, where the inner loop calculates the sum.
*   **Space Complexity**: `O(1)`

---

## 2. Product of Array Except Self

### Problem Description
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must write an algorithm that runs in `O(n)` time and without using the division operation.

### Optimal Solution: Two-Pass Approach
*   **Logic**:
    The key insight is that for any element `nums[i]`, the product of all elements except `nums[i]` can be found by multiplying the product of all elements to its left by the product of all elements to its right.
    `answer[i] = (product of nums[0...i-1]) * (product of nums[i+1...n-1])`

    1.  **First Pass (Left-to-Right)**:
        Initialize `answer` array with 1s. Initialize `left_product = 1`.
        Iterate from `i = 0` to `n-1`:
        *   `answer[i] = left_product` (stores product of elements before `nums[i]`)
        *   `left_product *= nums[i]` (update `left_product` for the next iteration)
        After this pass, `answer[i]` holds the product of all elements strictly to the left of index `i`.

    2.  **Second Pass (Right-to-Left)**:
        Initialize `right_product = 1`.
        Iterate from `i = n-1` down to `0`:
        *   `answer[i] *= right_product` (multiply the stored left product by the product of elements strictly to the right of `nums[i]`)
        *   `right_product *= nums[i]` (update `right_product` for the next iteration)
        After this pass, `answer[i]` holds the final desired product.

*   **Example**: `nums = [1, 2, 3, 4]`
    *   Initialize `answer = [1, 1, 1, 1]`, `left_product = 1`.
    *   **Pass 1 (Left-to-Right)**:
        *   `i=0`: `answer[0]=1`. `left_product=1*1=1`. `answer=[1,1,1,1]`
        *   `i=1`: `answer[1]=1`. `left_product=1*2=2`. `answer=[1,1,1,1]`
        *   `i=2`: `answer[2]=2`. `left_product=2*3=6`. `answer=[1,1,2,1]`
        *   `i=3`: `answer[3]=6`. `left_product=6*4=24`. `answer=[1,1,2,6]`
    *   `answer` after Pass 1: `[1, 1, 2, 6]`
    *   Initialize `right_product = 1`.
    *   **Pass 2 (Right-to-Left)**:
        *   `i=3`: `answer[3]=6*1=6`. `right_product=1*4=4`. `answer=[1,1,2,6]`
        *   `i=2`: `answer[2]=2*4=8`. `right_product=4*3=12`. `answer=[1,1,8,6]`
        *   `i=1`: `answer[1]=1*12=12`. `right_product=12*2=24`. `answer=[1,12,8,6]`
        *   `i=0`: `answer[0]=1*24=24`. `right_product=24*1=24`. `answer=[24,12,8,6]`

    Final `answer`: `[24, 12, 8, 6]`

*   **Time Complexity**: `O(N)`
    Two passes over the array.
*   **Space Complexity**: `O(1)`
    The output array does not count as extra space per problem constraints. Only a few constant extra variables are used.

### Brute Force Solution
*   **Logic**:
    For each element `nums[i]`, iterate through the entire array again, multiplying all elements except `nums[i]`.
*   **Time Complexity**: `O(N^2)`
*   **Space Complexity**: `O(N)` (for the result array)

---

## 3. Trapping Rain Water

### Problem Description
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Optimal Solution: Two-Pointer Technique
*   **Logic**:
    The amount of water trapped at any index `i` is determined by the minimum of the maximum height to its left and the maximum height to its right, minus its own height: `water[i] = min(max_left[i], max_right[i]) - height[i]`.

    The two-pointer approach optimizes this to `O(1)` space by avoiding explicit `max_left` and `max_right` arrays. It maintains `left` and `right` pointers, and `max_left` and `max_right` variables that store the maximum height encountered so far from the respective sides.

    We move the pointer corresponding to the *smaller* `max` value.
    If `max_left < max_right`:
    *   The water trapped at `height[left]` is limited by `max_left`. Even if there is a taller bar on the right side, `max_left` is the bottleneck for water at `left`.
    *   We can calculate `water += max_left - height[left]` and then `left++`. We update `max_left = max(max_left, height[left])` for the next iteration.
    If `max_right <= max_left`:
    *   Symmetrically, water at `height[right]` is limited by `max_right`.
    *   We calculate `water += max_right - height[right]` and then `right--`. We update `max_right = max(max_right, height[right])`.

*   **Example**: `height = [0,1,0,2,1,0,1,3,2,1,2,1]` (Dry run is provided in `main_algorithms.cpp` comments due to its length)

*   **Time Complexity**: `O(N)`
    The two pointers traverse the array once.
*   **Space Complexity**: `O(1)`
    Only a few constant extra variables.

### Alternative Optimal: Monotonic Stack
*   **Logic**:
    This approach uses a stack to keep track of bars that could potentially form the left boundary of a water-trapping container. The stack stores indices of bars in *decreasing* order of height. When an increasing bar `height[i]` is encountered:
    1.  It implies that `height[i]` might be a right boundary.
    2.  Pop elements from the stack that are shorter than `height[i]`. These popped elements are the "bottoms" of the wells.
    3.  If the stack is not empty after popping (meaning there's a left boundary), water is trapped between `stack.top()` (left boundary), the popped `bottom_bar`, and `i` (right boundary).
    4.  Calculate trapped water: `(min(height[i], height[stack.top()]) - height[bottom_bar]) * (i - stack.top() - 1)`
*   **Time Complexity**: `O(N)`
    Each element is pushed onto and popped from the stack at most once.
*   **Space Complexity**: `O(N)`
    In the worst case (e.g., a decreasing sequence of heights `[5,4,3,2,1]`), all elements are pushed onto the stack.

### Alternative Optimal: Dynamic Programming
*   **Logic**:
    This approach first pre-calculates the `max_left` and `max_right` arrays.
    1.  `left_max[i]` stores the maximum height of a bar from index `0` to `i`.
    2.  `right_max[i]` stores the maximum height of a bar from index `i` to `n-1`.
    These are computed in two separate passes (`left_max` from left-to-right, `right_max` from right-to-left).
    Then, in a third pass, iterate from `i = 0` to `n-1` and calculate `total_water += max(0, min(left_max[i], right_max[i]) - height[i])`.
*   **Time Complexity**: `O(N)`
    Three passes over the array.
*   **Space Complexity**: `O(N)`
    Two additional arrays (`left_max`, `right_max`) of size `N` are used.

### Brute Force Solution
*   **Logic**:
    For each bar `height[i]` (excluding the first and last), scan to its left to find `max_left_i` and scan to its right to find `max_right_i`. Then calculate `max(0, min(max_left_i, max_right_i) - height[i])` and add to total.
*   **Time Complexity**: `O(N^2)`
    For each of `N` bars, we perform `O(N)` work to find max_left and max_right.
*   **Space Complexity**: `O(1)`

---

## 4. Rotate Array

### Problem Description
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

### Optimal Solution: Reversal Method
*   **Logic**:
    This method performs rotation in-place in `O(N)` time and `O(1)` space. The steps are:
    1.  Normalize `k`: `k = k % n` (where `n` is array length) to handle `k` greater than `n`.
    2.  Reverse the *entire* array.
    3.  Reverse the first `k` elements.
    4.  Reverse the remaining `n-k` elements.

    Consider `nums = [1,2,3,4,5,6,7]` and `k=3`.
    *   Original: `[1,2,3,4,5,6,7]`
    *   1. Reverse all: `[7,6,5,4,3,2,1]`
    *   2. Reverse first `k=3` elements: `[5,6,7,4,3,2,1]`
    *   3. Reverse remaining `n-k=4` elements: `[5,6,7,1,2,3,4]` (This is the rotated array)

*   **Time Complexity**: `O(N)`
    Three `std::reverse` operations, each taking `O(N)` time.
*   **Space Complexity**: `O(1)`
    All operations are performed in-place.

### Alternative Solution: Temporary Array
*   **Logic**:
    Create a new temporary array of the same size. For each element `nums[i]` in the original array, place it into `temp[(i + k) % n]`. After filling `temp`, copy its contents back to `nums`.
*   **Time Complexity**: `O(N)`
    One pass to copy elements to `temp`, one pass to copy back to `nums`.
*   **Space Complexity**: `O(N)`
    An auxiliary array of size `N` is used.

### Naive Solution: Repeated Single Rotation
*   **Logic**:
    Rotate the array by one position to the right, `k` times. A single right rotation involves storing the last element, shifting all other elements one position to the right, and then placing the stored element at the beginning.
*   **Time Complexity**: `O(N*k)`
    Each single rotation takes `O(N)` time, and this is repeated `k` times. This can be `O(N^2)` in the worst case (when `k` is close to `N`).
*   **Space Complexity**: `O(1)`

---

## 5. Merge Sorted Arrays

### Problem Description
You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge `nums2` into `nums1` as one sorted array. `nums1` has a length of `m + n`, where the first `m` elements are the valid ones, and the last `n` elements are set to `0` (empty space).

### Optimal Solution: Two-Pointer (from End)
*   **Logic**:
    Since `nums1` has enough empty space at its end, we can merge from the end of both arrays. This avoids shifting elements in `nums1` when inserting smaller elements from `nums2` at the beginning.
    1.  Initialize three pointers:
        *   `p1`: points to the last valid element of `nums1` (`m-1`).
        *   `p2`: points to the last element of `nums2` (`n-1`).
        *   `write_idx`: points to the last position in `nums1` where an element should be placed (`m+n-1`).
    2.  Compare `nums1[p1]` and `nums2[p2]`. Place the larger element into `nums1[write_idx]`. Decrement the pointer of the element placed and `write_idx`. Continue this as long as both `p1` and `p2` are non-negative.
    3.  After the loop, if there are any remaining elements in `nums2` (`p2 >= 0`), copy them directly to `nums1` from `write_idx` downwards. (If `p1 >= 0`, `nums1` elements are already in their correct sorted positions).

*   **Example**: `nums1 = [1,2,3,0,0,0]`, `m=3`, `nums2 = [2,5,6]`, `n=3`
    (Dry run is provided in `main_algorithms.cpp` comments due to its length)

*   **Time Complexity**: `O(m + n)`
    Each element from `nums1` (valid part) and `nums2` is considered and placed once.
*   **Space Complexity**: `O(1)`
    All operations are performed in-place within `nums1`.

### Alternative Solution: Auxiliary Array
*   **Logic**:
    Create a new auxiliary array of size `m+n`. Use two pointers (`p1` for `nums1` and `p2` for `nums2`) to iterate from the beginning of both arrays. Compare `nums1[p1]` and `nums2[p2]`, placing the smaller one into the auxiliary array and incrementing its pointer. Once one array is exhausted, copy the remaining elements from the other array. Finally, copy the contents of the auxiliary array back into `nums1`.
*   **Time Complexity**: `O(m + n)`
    One pass to merge into the auxiliary array, one pass to copy back.
*   **Space Complexity**: `O(m + n)`
    An auxiliary array of size `m+n` is used.

### Alternative Solution: Using `std::sort`
*   **Logic**:
    The simplest approach is to copy all `n` elements from `nums2` into the `n` empty slots at the end of `nums1`. Then, use `std::sort` on the entire `nums1` array (which now contains `m+n` elements).
*   **Time Complexity**: `O((m+n) log (m+n))`
    Copying `nums2` is `O(n)`. Sorting the combined array is `O((m+n) log (m+n))`. The sorting dominates.
*   **Space Complexity**: `O(1)` or `O(M+N)`
    `std::sort` typically uses Introsort (a hybrid algorithm) which is `O(log N)` auxiliary space in typical cases, but can degenerate to `O(N)` for specific implementations or if Merge Sort is used. For interview purposes, it's often considered efficient space-wise.
```