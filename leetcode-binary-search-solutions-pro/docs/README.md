# Documentation: Problem Descriptions

This document provides detailed descriptions for each Binary Search problem tackled in this project. For each problem, you'll find its statement, illustrative examples, and notes on how it relates to Binary Search.

---

## 1. Standard Binary Search & First/Last Occurrence

**Problem Statement:**

Given a sorted array of integers `nums` and an integer `target`, perform the following searches:

1.  **Standard Search:** Find the index of `target` in `nums`. If `target` is not found, return -1.
2.  **First Occurrence:** Find the index of the first occurrence of `target` in `nums`. If `target` is not found, return -1.
3.  **Last Occurrence:** Find the index of the last occurrence of `target` in `nums`. If `target` is not found, return -1.
4.  **First and Last Occurrence:** Return a tuple `(first_index, last_index)` representing the range of `target` in `nums`. If `target` is not found, return `(-1, -1)`.

You may assume the array is sorted in non-decreasing order.

**Examples:**

```
nums = [1, 2, 3, 3, 3, 4, 5], target = 3

1. Standard Search (target=3): Output: 2 (or 3, or 4 - any valid index of 3)
   Our `binary_search_iterative` implementation returns 2.

2. First Occurrence (target=3): Output: 2
   Explanation: The first '3' is at index 2.

3. Last Occurrence (target=3): Output: 4
   Explanation: The last '3' is at index 4.

4. First and Last Occurrence (target=3): Output: (2, 4)

---
nums = [1, 2, 4, 5], target = 3
1. Standard Search (target=3): Output: -1
2. First Occurrence (target=3): Output: -1
3. Last Occurrence (target=3): Output: -1
4. First and Last Occurrence (target=3): Output: (-1, -1)

---
nums = [5], target = 5
1. Standard Search (target=5): Output: 0
2. First Occurrence (target=5): Output: 0
3. Last Occurrence (target=5): Output: 0
4. First and Last Occurrence (target=5): Output: (0, 0)
```

**Binary Search Relevance:**
These are foundational binary search problems. The standard search is the simplest application. Finding first/last occurrences requires slight modifications to the standard algorithm to continue searching in a specific half even after a match is found, to ensure the *earliest* or *latest* match is identified.

---

## 2. Search in Rotated Sorted Array

**Problem Statement:**

Given a sorted array of distinct integers `nums` that has been rotated at an unknown pivot, and an integer `target`, return the index of `target` if it is in `nums`, or -1 otherwise.

For example, `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]` after rotation. The array contains no duplicate elements.

**Examples:**

```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
Explanation: 0 is at index 4 in the rotated array.

---
nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
Explanation: 3 is not present in the array.

---
nums = [1], target = 0
Output: -1
Explanation: 0 is not present in the array.
```

**Binary Search Relevance:**
This is a classic variation. The key insight is that even after rotation, one of the two halves (from `low` to `mid` or from `mid` to `high`) will *always* be sorted. By identifying the sorted half and checking if the `target` falls within its range, you can intelligently narrow down the search space in `O(log N)` time.

---

## 3. Find Peak Element

**Problem Statement:**

A peak element is an element that is strictly greater than its neighbors. Given an integer array `nums`, where `nums[i] != nums[i+1]` for all valid `i`, find a peak element and return its index. If the array contains multiple peaks, return the index to any of them.

You may imagine that `nums[-1] = nums[n] = -infinity`. This means that an element at the edge of the array can be a peak if it's greater than its single neighbor.

**Examples:**

```
nums = [1, 2, 3, 1]
Output: 2
Explanation: 3 is a peak element and its index is 2.

---
nums = [1, 2, 1, 3, 5, 6, 4]
Output: 1 or 5
Explanation: Your function can return either index 1 where the peak element is 2, or index 5 where the peak element is 6.
```

**Binary Search Relevance:**
This problem leverages binary search by observing that a peak *must* exist in certain directions. If `nums[mid] < nums[mid+1]`, it implies we are on an "uphill" slope, guaranteeing a peak exists to the right (including `nums[mid+1]` itself or further right due to the `-infinity` boundary condition). Conversely, if `nums[mid] > nums[mid+1]`, we are on a "downhill" slope (or at a peak), guaranteeing a peak exists to the left (including `nums[mid]` itself). This allows for a `O(log N)` solution by narrowing the search space.

---

## 4. Kth Smallest Element in a Sorted Matrix

**Problem Statement:**

Given an `n x n` matrix where each of the rows and columns are sorted in ascending order, return the k-th smallest element in the matrix.

Note that it is the k-th smallest element *overall*, not the k-th distinct element.

**Examples:**

```
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
], k = 8
Output: 13
Explanation: The elements in sorted order are 1, 5, 9, 10, 11, 12, 13, 13, 15. The 8th smallest is 13.

---
matrix = [[-5]], k = 1
Output: -5

---
matrix = [[1,2],[1,3]], k = 3
Output: 2
Explanation: The elements in sorted order are 1, 1, 2, 3. The 3rd smallest is 2.
```

**Binary Search Relevance:**
This problem is a classic example of "binary search on the answer". Instead of searching for an index, we binary search for the *value* of the k-th smallest element.

The search range for this value is from `matrix[0][0]` (minimum possible) to `matrix[n-1][n-1]` (maximum possible). For any `mid` value in this range, we can efficiently count how many elements in the matrix are less than or equal to `mid`.
*   If this count is `>= k`, it means `mid` could be our answer, or the actual k-th smallest element is even smaller. So we try `high = mid - 1` and store `mid` as a potential answer.
*   If the count is `< k`, `mid` is too small, and we need to look for larger values: `low = mid + 1`.

The `count_less_equal` helper function itself can be implemented efficiently in `O(N)` time for an `N x N` matrix (by starting from the top-right corner and moving left or down). This makes the overall complexity `O(N * log(Max - Min))`.

---