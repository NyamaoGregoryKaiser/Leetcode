# Binary Search Interview Project - Problem Descriptions

This document provides detailed descriptions for each Binary Search problem implemented in the `BinarySearchProblems.java` file. Each problem outlines its objective, examples, and important considerations.

---

## 1. Standard Binary Search

**Problem:** Given a sorted array of integers `arr` and an integer `target`, return the index of `target` if it exists in the array. Otherwise, return -1.

**Constraints:**
- The array `arr` is sorted in ascending order.
- The array can contain distinct or duplicate elements (though for standard search, duplicates don't change the outcome for finding *any* instance).
- `1 <= arr.length <= 10^4`
- `-10^9 <= arr[i], target <= 10^9`

**Examples:**

1.  **Input:** `arr = [1, 3, 5, 7, 9]`, `target = 5`
    **Output:** `2` (Index of 5)

2.  **Input:** `arr = [2, 4, 6, 8, 10]`, `target = 7`
    **Output:** `-1` (7 is not in the array)

3.  **Input:** `arr = [11]`, `target = 11`
    **Output:** `0`

4.  **Input:** `arr = []`, `target = 5`
    **Output:** `-1` (Empty array)

**Key Idea:**
The core Binary Search logic: repeatedly divide the search interval in half. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half.

---

## 2. Find First/Last Occurrence of Target

**Problem:** Given a sorted array of integers `arr` that may contain duplicate elements, and an integer `target`, find:
   a. The index of the **first occurrence** of `target`.
   b. The index of the **last occurrence** of `target`.
If the target is not found, return -1.

**Constraints:**
- The array `arr` is sorted in ascending order.
- The array can contain duplicate elements.
- `1 <= arr.length <= 10^4`
- `-10^9 <= arr[i], target <= 10^9`

**Examples (for both first and last occurrence):**

1.  **Input:** `arr = [1, 2, 3, 3, 3, 4, 5]`, `target = 3`
    **First Occurrence Output:** `2`
    **Last Occurrence Output:** `4`

2.  **Input:** `arr = [1, 1, 1, 1, 1]`, `target = 1`
    **First Occurrence Output:** `0`
    **Last Occurrence Output:** `4`

3.  **Input:** `arr = [10, 20, 30, 40]`, `target = 20`
    **First Occurrence Output:** `1`
    **Last Occurrence Output:** `1`

4.  **Input:** `arr = [1, 2, 4, 5]`, `target = 3`
    **First Occurrence Output:** `-1`
    **Last Occurrence Output:** `-1`

**Key Idea:**
Modify the standard binary search. When `arr[mid] == target`, instead of immediately returning `mid`:
- For **first occurrence**: store `mid` as a potential answer and continue searching in the *left half* (`high = mid - 1`) to find an even earlier occurrence.
- For **last occurrence**: store `mid` as a potential answer and continue searching in the *right half* (`low = mid + 1`) to find an even later occurrence.

---

## 3. Search in Rotated Sorted Array

**Problem:** Given an integer array `nums` sorted in ascending order, but rotated at an unknown pivot. For example, `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`. Your task is to find a given `target` value in this rotated array. If `target` is not found, return -1. Assume there are no duplicate elements in the array.

**Constraints:**
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are unique.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`

**Examples:**

1.  **Input:** `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 0`
    **Output:** `4`

2.  **Input:** `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 3`
    **Output:** `-1`

3.  **Input:** `nums = [1]`, `target = 0`
    **Output:** `-1`

4.  **Input:** `nums = [1, 3]`, `target = 3`
    **Output:** `1`

**Key Idea:**
The array is split into two parts by the pivot, one of which *must* be sorted. In each step of the binary search, determine which half (`nums[low]` to `nums[mid]` or `nums[mid]` to `nums[high]`) is sorted. Then, check if the `target` falls within the range of that sorted half. If it does, narrow the search to that half. Otherwise, narrow the search to the other (unsorted) half.

---

## 4. Find Peak Element

**Problem:** A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, where `nums[i] != nums[i+1]` for all valid `i`. Find and return the index of any peak element. You may imagine that `nums[-1] = nums[n] = -∞`. Your solution should run in `O(log N)` time.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-10^9 <= nums[i] <= 10^9`
- `nums[i] != nums[i+1]` for all valid `i`.

**Examples:**

1.  **Input:** `nums = [1, 2, 3, 1]`
    **Output:** `2` (Index of 3, since 3 > 2 and 3 > 1)

2.  **Input:** `nums = [1, 2, 1, 3, 5, 6, 4]`
    **Output:** `1` (Index of 2) or `5` (Index of 6). Both are valid peak elements. Your function can return either.

**Key Idea:**
Since `nums[-1]` and `nums[n]` are considered `-∞`, a peak element is guaranteed to exist. We can use binary search by comparing `nums[mid]` with `nums[mid+1]`:
- If `nums[mid] < nums[mid+1]`, it means we are on an increasing slope. A peak must exist to the right of `mid` (including `mid+1`). So, move `low = mid + 1`.
- If `nums[mid] > nums[mid+1]`, it means we are on a decreasing slope or `mid` itself is a peak. A peak must exist at or to the left of `mid`. So, move `high = mid`.
The loop terminates when `low == high`, and that index will be a peak.

---

## 5. Sqrt(x) - Integer Square Root

**Problem:** Given a non-negative integer `x`, compute and return the integer square root of `x`. The returned integer part is truncated. For example, `sqrt(8)` should return `2` because `sqrt(8)` is `2.828...`, and after truncating, it becomes `2`.

**Constraints:**
- `0 <= x <= 2^31 - 1` (Integer.MAX_VALUE)

**Examples:**

1.  **Input:** `x = 4`
    **Output:** `2`

2.  **Input:** `x = 8`
    **Output:** `2`

3.  **Input:** `x = 0`
    **Output:** `0`

4.  **Input:** `x = 1`
    **Output:** `1`

5.  **Input:** `x = 2147395599` (A large number close to `Integer.MAX_VALUE`)
    **Output:** `46340`

**Key Idea:**
The square root of `x` (if `x > 1`) will always be in the range `[1, x]`. We can perform a binary search on this range to find the largest integer `ans` such that `ans * ans <= x`.
- Initialize `low = 1`, `high = x`.
- While `low <= high`:
  - Calculate `mid`.
  - Compute `square = mid * mid`. Use `long` for `square` to prevent overflow, as `mid` can be up to `Integer.MAX_VALUE / 2` and `mid * mid` can exceed `Integer.MAX_VALUE`.
  - If `square == x`, we found the exact square root, return `mid`.
  - If `square < x`, `mid` is a potential answer. Store `mid` and try to find a larger one in the right half (`low = mid + 1`).
  - If `square > x`, `mid` is too large. Search in the left half (`high = mid - 1`).
The final `ans` stored will be the truncated integer square root.

---