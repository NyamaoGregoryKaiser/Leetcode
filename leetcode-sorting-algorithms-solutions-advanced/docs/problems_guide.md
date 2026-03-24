# Problem Guide: Sorting Algorithms Interview Project

This document provides detailed problem statements for each coding challenge in the project, along with examples. Understanding the problem thoroughly is the first step towards an optimal solution.

---

## Problem 1: Kth Largest Element in an Array

**Problem Statement:**

Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array.

Note that it is the `k`-th largest element in the *sorted order*, not the `k`-th distinct element.

You must solve it without sorting the input array explicitly (though sorting is an approach you can consider for comparison).

**Example 1:**

```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Explanation: If sorted, the array is [1,2,3,4,5,6]. The 2nd largest element is 5.
```

**Example 2:**

```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
Explanation: If sorted, the array is [1,2,2,3,3,4,5,5,6]. The 4th largest element is 4.
```

**Constraints:**

*   `1 <= k <= nums.length <= 10^5`
*   `-10^4 <= nums[i] <= 10^4`

---

## Problem 2: Merge Overlapping Intervals

**Problem Statement:**

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example 1:**

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

**Example 2:**

```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Example 3:**

```
Input: intervals = [[1,4],[0,4]]
Output: [[0,4]]
Explanation: Intervals [1,4] and [0,4] overlap, merge them into [0,4].
```

**Constraints:**

*   `0 <= intervals.length <= 10^4`
*   `intervals[i].length == 2`
*   `0 <= start_i <= end_i <= 10^4`

---

## Problem 3: Group Anagrams

**Problem Statement:**

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Example 2:**

```
Input: strs = ["a"]
Output: [["a"]]
```

**Example 3:**

```
Input: strs = [""]
Output: [[""]]
```

**Constraints:**

*   `1 <= strs.length <= 10^4`
*   `0 <= strs[i].length <= 100`
*   `strs[i]` consists of lowercase English letters.

---

## Problem 4: Wiggle Sort II

**Problem Statement:**

Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3]...`.

You may assume the input array always has a valid answer.

**Example 1:**

```
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: Another valid answer is [1,4,1,5,1,6].
```

**Example 2:**

```
Input: nums = [1,3,2,2,3,1]
Output: [2,3,1,3,1,2]
Explanation: Another valid answer is [1,3,2,3,1,2].
```

**Constraints:**

*   `1 <= nums.length <= 5 * 10^4`
*   `0 <= nums[i] <= 5000`
*   It is guaranteed that there will be an answer for the given input `nums`.

**Follow Up:**
Could you solve it in O(N) time complexity and/or in-place with O(1) extra space?
(Note: The O(1) space, O(N) time solution for Wiggle Sort II is significantly complex and often involves a virtual indexing trick combined with a 3-way partition).

---