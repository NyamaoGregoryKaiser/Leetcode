# Problem Descriptions

This document provides detailed descriptions of the problems solved in the `src/algorithms.cpp` file. Each problem includes a clear statement, example inputs/outputs, and notes on its significance for coding interviews.

---

## 1. Standard Binary Search

**Problem Statement:**
Given a sorted array of integers `nums` and an integer `target`, write a function to search for `target` in `nums`. If `target` exists, return its index. Otherwise, return -1.

**Example:**
Input: `nums = [-1,0,3,5,9,12]`, `target = 9`
Output: `4` (because `nums[4] == 9`)

Input: `nums = [-1,0,3,5,9,12]`, `target = 2`
Output: `-1`

**Significance:**
This is the foundational binary search problem. It tests understanding of the core loop invariant, `low`, `high`, `mid` pointer movements, and boundary conditions (`low <= high` vs `low < high`). It's often asked as a warm-up or as a component of more complex problems. Both iterative and recursive approaches are common.

---

## 2. Find First and Last Occurrence

**Problem Statement:**
Given a sorted array of integers `nums` with potential duplicates, find the starting and ending position of a given `target` value.
If the `target` is not found in the array, return `[-1, -1]`.
Your algorithm's runtime complexity should be in the order of O(log n).

**Example:**
Input: `nums = [5,7,7,8,8,10]`, `target = 8`
Output: `[3,4]`

Input: `nums = [5,7,7,8,8,10]`, `target = 6`
Output: `[-1,-1]`

Input: `nums = []`, `target = 0`
Output: `[-1,-1]`

**Significance:**
This problem extends the basic binary search to handle duplicates. It requires a subtle modification to the standard binary search to either continue searching to the left (for the first occurrence) or to the right (for the last occurrence) even when the target is found. This is a very common interview question to check how well you understand binary search variations.

---

## 3. Search in Rotated Sorted Array

**Problem Statement:**
Given a sorted array `nums` that has been rotated at an unknown pivot (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`). Your task is to find a `target` value in this rotated array. If the `target` is found, return its index, otherwise return -1.
You may assume no duplicate elements exist in the array.
Your algorithm's runtime complexity must be O(log n).

**Example:**
Input: `nums = [4,5,6,7,0,1,2]`, `target = 0`
Output: `4`

Input: `nums = [4,5,6,7,0,1,2]`, `target = 3`
Output: `-1`

Input: `nums = [1]`, `target = 0`
Output: `-1`

**Significance:**
This is a classic and frequently asked binary search problem that tests your ability to handle non-trivial sorted structures. The key is to identify which half of the array (from `low` to `mid` or `mid` to `high`) is sorted, and then determine if the `target` falls within that sorted segment. If not, the target must be in the unsorted segment.

---

## 4. Find Peak Element

**Problem Statement:**
A peak element is an element that is strictly greater than its neighbors.
Given an integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
You may imagine that `nums[-1] = nums[n] = -∞`.
You must write an algorithm that runs in O(log n) time.

**Example:**
Input: `nums = [1,2,3,1]`
Output: `2` (3 is a peak element)

Input: `nums = [1,2,1,3,5,6,4]`
Output: `1` (2 is a peak element, or index 5 where 6 is a peak element. The function can return either.)

**Constraints:**
-   `1 <= nums.length <= 1000`
-   `-2^31 <= nums[i] <= 2^31 - 1`
-   `nums[i] != nums[i + 1]` for all valid `i`.

**Significance:**
This problem demonstrates binary search on a "non-monotonically" sorted array. While the whole array isn't sorted, there's a property (the existence of a peak) that allows us to discard half the search space. The "imaginary" `-∞` neighbors simplify boundary conditions. It's a good problem to test understanding of slightly more abstract binary search applications.

---

## 5. Smallest Divisor Given a Threshold (Binary Search on Answer)

**Problem Statement:**
Given an array of integers `nums` and an integer `threshold`, we are looking for the smallest positive integer `divisor` such that, if we divide each element in `nums` by `divisor` and sum up the results (each division result is rounded up to the nearest integer), the final sum is less than or equal to `threshold`.

**Example:**
Input: `nums = [1,2,5,9]`, `threshold = 6`
Output: `5`
Explanation:
-   If divisor = 1, sum = 1+2+5+9 = 17 > 6
-   If divisor = 4, sum = ceil(1/4) + ceil(2/4) + ceil(5/4) + ceil(9/4) = 1 + 1 + 2 + 3 = 7 > 6
-   If divisor = 5, sum = ceil(1/5) + ceil(2/5) + ceil(5/5) + ceil(9/5) = 1 + 1 + 1 + 2 = 5 <= 6
The smallest divisor that satisfies the condition is 5.

Input: `nums = [44,22,33,11,1]`, `threshold = 5`
Output: `44`

**Constraints:**
-   `1 <= nums.length <= 5 * 10^4`
-   `1 <= nums[i] <= 10^6`
-   `nums.length <= threshold <= 10^6`

**Significance:**
This is a classic example of "Binary Search on the Answer Space." Instead of searching for an index in a sorted array, we are searching for a specific *value* (the `divisor` in this case) within a possible range of values. The `check` function (or `predicate`) determines if a given candidate `divisor` is valid. This pattern is crucial for solving many optimization problems efficiently, and it's a common advanced binary search topic in interviews. The range for the divisor would be `[1, max(nums)]`.

---