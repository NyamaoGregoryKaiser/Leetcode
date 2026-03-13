# Binary Search Algorithms: Detailed Explanation

This document provides an in-depth explanation of Binary Search, its core principles, and detailed walkthroughs for each problem implemented in `src/main/java/com/binarysearch/algorithms/BinarySearchProblems.java`.

## Table of Contents

1.  [Introduction to Binary Search](#introduction-to-binary-search)
    *   [Prerequisites](#prerequisites)
    *   [Core Idea](#core-idea)
    *   [The Iterative Template](#the-iterative-template)
    *   [Time and Space Complexity](#time-and-space-complexity)
2.  [Problem 1: Standard Binary Search (`find`)](#problem-1-standard-binary-search-find)
    *   [Problem Statement](#problem-statement)
    *   [Intuition](#intuition)
    *   [Step-by-Step Logic](#step-by-step-logic)
    *   [ASCII Diagram](#ascii-diagram)
3.  [Problem 2: Find First/Last Occurrence (`findFirst`, `findLast`)](#problem-2-find-firstlast-occurrence-findfirst-findlast)
    *   [Problem Statement](#problem-statement-1)
    *   [Intuition](#intuition-1)
    *   [Step-by-Step Logic (`findFirst`)](#step-by-step-logic-findfirst)
    *   [Step-by-Step Logic (`findLast`)](#step-by-step-logic-findlast)
    *   [ASCII Diagram](#ascii-diagram-1)
4.  [Problem 3: Search in Rotated Sorted Array (`searchInRotatedSortedArray`)](#problem-3-search-in-rotated-sorted-array-searchinrotatedsortedarray)
    *   [Problem Statement](#problem-statement-2)
    *   [Intuition](#intuition-2)
    *   [Step-by-Step Logic](#step-by-step-logic-1)
    *   [ASCII Diagram](#ascii-diagram-2)
5.  [Problem 4: Find Peak Element (`findPeakElement`)](#problem-4-find-peak-element-findpeakelement)
    *   [Problem Statement](#problem-statement-3)
    *   [Intuition](#intuition-3)
    *   [Step-by-Step Logic](#step-by-step-logic-2)
    *   [ASCII Diagram](#ascii-diagram-3)
6.  [Problem 5: Sqrt(x) (`mySqrt`)](#problem-5-sqrtx-mysqrt)
    *   [Problem Statement](#problem-statement-4)
    *   [Intuition](#intuition-4)
    *   [Step-by-Step Logic](#step-by-step-logic-3)
    *   [ASCII Diagram](#ascii-diagram-4)
7.  [Edge Cases and Gotchas](#edge-cases-and-gotchas)
    *   [Integer Overflow for `mid`](#integer-overflow-for-mid)
    *   [Infinite Loops](#infinite-loops)
    *   [Handling Duplicates](#handling-duplicates)
    *   [Empty or Single-Element Arrays](#empty-or-single-element-arrays)

---

## 1. Introduction to Binary Search

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

### Prerequisites

The most critical prerequisite for Binary Search is that the data structure must be **sorted**. If the data is not sorted, Binary Search cannot be applied directly.

### Core Idea

1.  **Start with a range:** Define a `low` pointer at the beginning of the search space and a `high` pointer at the end.
2.  **Find the middle element:** Calculate `mid = low + (high - low) / 2`.
3.  **Compare:**
    *   If `nums[mid]` is the target, you've found it.
    *   If `nums[mid]` is less than the target, the target must be in the right half. Update `low = mid + 1`.
    *   If `nums[mid]` is greater than the target, the target must be in the left half. Update `high = mid - 1`.
4.  **Repeat:** Continue steps 2-3 until `low > high`. If the loop finishes and the target hasn't been found, it's not in the array.

### The Iterative Template

Most Binary Search problems can be solved using a variation of this template:

```java
int low = 0;
int high = nums.length - 1; // Or some other upper bound

while (low <= high) { // Or low < high, depending on problem
    int mid = low + (high - low) / 2; // Avoids overflow for large low, high

    if (nums[mid] == target) {
        // Found it! (or maybe store answer and continue searching)
        return mid;
    } else if (nums[mid] < target) {
        low = mid + 1; // Target is in the right half
    } else { // nums[mid] > target
        high = mid - 1; // Target is in the left half
    }
}
return -1; // Target not found
```

The key differences between variations often lie in:
*   The `while` loop condition (`low <= high` vs `low < high`).
*   How `low` and `high` are updated (`mid + 1`, `mid - 1`, or `mid`).
*   What to return or store as the "answer" (`mid`, `low`, `high`).

### Time and Space Complexity

*   **Time Complexity:** `O(log N)`
    *   In each step, the search space is halved. For an array of `N` elements, this takes `log N` steps.
*   **Space Complexity:** `O(1)` (for iterative Binary Search)
    *   Only a few variables (`low`, `high`, `mid`, `target`) are used, regardless of the input size.
    *   Recursive Binary Search uses `O(log N)` stack space due to function call frames.

---

## 2. Problem 1: Standard Binary Search (`find`)

### Problem Statement

Given a sorted array of integers `nums` and an integer `target`, return the index of `target` if it is in `nums`, otherwise return `-1`.

### Intuition

This is the most straightforward application of Binary Search. We iteratively narrow down the search space until we either find the target or the search space becomes empty.

### Step-by-Step Logic

1.  Initialize `low = 0` and `high = nums.length - 1`.
2.  While `low <= high`:
    *   Calculate `mid = low + (high - low) / 2`.
    *   If `nums[mid] == target`, we found the target. Return `mid`.
    *   If `nums[mid] < target`, the target must be in the right half. Update `low = mid + 1`.
    *   If `nums[mid] > target`, the target must be in the left half. Update `high = mid - 1`.
3.  If the loop finishes, it means `low > high`, and the target was not found. Return `-1`.

### ASCII Diagram

```
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] , Target = 23

Initial:
  low                high
   |                  |
  [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
   0  1  2  3   4   5   6   7   8   9

Iteration 1:
  mid = (0 + 9) / 2 = 4. nums[4] = 16. 16 < 23. Target is in right half.
  low = mid + 1 = 5.

           low           high
            |             |
  [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
   0  1  2  3   4   5   6   7   8   9

Iteration 2:
  mid = (5 + 9) / 2 = 7. nums[7] = 56. 56 > 23. Target is in left half.
  high = mid - 1 = 6.

           low  high
            |    |
  [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
   0  1  2  3   4   5   6   7   8   9

Iteration 3:
  mid = (5 + 6) / 2 = 5. nums[5] = 23. 23 == 23. Found! Return 5.

                mid
                 |
  [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
   0  1  2  3   4   5   6   7   8   9
```

---

## 3. Problem 2: Find First/Last Occurrence (`findFirst`, `findLast`)

### Problem Statement

Given a sorted array `nums` with potentially duplicate elements and a target value, find the index of its first occurrence and its last occurrence. If the target is not found, return `-1`.

### Intuition

These problems are variations of standard Binary Search. When we find an element `nums[mid]` that equals the `target`, we don't stop.
*   For `findFirst`, we store `mid` as a potential answer and try to find an even earlier occurrence by searching in the left half (`high = mid - 1`).
*   For `findLast`, we store `mid` as a potential answer and try to find an even later occurrence by searching in the right half (`low = mid + 1`).

### Step-by-Step Logic (`findFirst`)

1.  Initialize `low = 0`, `high = nums.length - 1`, and `firstOccurrence = -1`.
2.  While `low <= high`:
    *   Calculate `mid = low + (high - low) / 2`.
    *   If `nums[mid] == target`:
        *   We found a potential first occurrence. Store `mid` in `firstOccurrence`.
        *   Now, try to find an even earlier occurrence in the left half. Update `high = mid - 1`.
    *   If `nums[mid] < target`:
        *   Target must be in the right half. Update `low = mid + 1`.
    *   If `nums[mid] > target`:
        *   Target must be in the left half. Update `high = mid - 1`.
3.  Return `firstOccurrence`.

### Step-by-Step Logic (`findLast`)

1.  Initialize `low = 0`, `high = nums.length - 1`, and `lastOccurrence = -1`.
2.  While `low <= high`:
    *   Calculate `mid = low + (high - low) / 2`.
    *   If `nums[mid] == target`:
        *   We found a potential last occurrence. Store `mid` in `lastOccurrence`.
        *   Now, try to find an even later occurrence in the right half. Update `low = mid + 1`.
    *   If `nums[mid] < target`:
        *   Target must be in the right half. Update `low = mid + 1`.
    *   If `nums[mid] > target`:
        *   Target must be in the left half. Update `high = mid - 1`.
3.  Return `lastOccurrence`.

### ASCII Diagram

```
Array: [1, 2, 3, 3, 3, 3, 4, 5, 6] , Target = 3

Find First Occurrence:

Initial:
  low                      high
   |                        |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   firstOccurrence = -1

Iteration 1:
  mid = 4. nums[4]=3. Found! firstOccurrence = 4. Search left: high = 3.
  low    high
   |      |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   firstOccurrence = 4

Iteration 2:
  mid = 1. nums[1]=2. 2 < 3. Search right: low = 2.
       low high
        |  |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   firstOccurrence = 4

Iteration 3:
  mid = 2. nums[2]=3. Found! firstOccurrence = 2. Search left: high = 1.
       high
        | low
        |  |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   firstOccurrence = 2

Loop terminates (low > high). Return firstOccurrence = 2.

---------------------------------------------------------------------

Find Last Occurrence:

Initial:
  low                      high
   |                        |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   lastOccurrence = -1

Iteration 1:
  mid = 4. nums[4]=3. Found! lastOccurrence = 4. Search right: low = 5.
                     low high
                      |   |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   lastOccurrence = 4

Iteration 2:
  mid = 7. nums[7]=5. 5 > 3. Search left: high = 6.
                     low high
                      |  |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   lastOccurrence = 4

Iteration 3:
  mid = 5. nums[5]=3. Found! lastOccurrence = 5. Search right: low = 6.
                       low
                       | high
                       |  |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   lastOccurrence = 5

Iteration 4:
  mid = 6. nums[6]=4. 4 > 3. Search left: high = 5.
                       high
                       | low
                       |  |
  [1, 2, 3, 3, 3, 3, 4, 5, 6]
   0  1  2  3  4  5  6  7  8   lastOccurrence = 5

Loop terminates (low > high). Return lastOccurrence = 5.
```

---

## 4. Problem 3: Search in Rotated Sorted Array (`searchInRotatedSortedArray`)

### Problem Statement

Given a sorted array `nums` that has been rotated at some pivot unknown to you beforehand (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`), and a target value, find the index of the target. If the target is not in the array, return `-1`. Assume no duplicate elements exist in the array.

### Intuition

The key here is that even though the whole array is rotated, one half of the array will always be sorted. By comparing `nums[mid]` with `nums[low]` (or `nums[high]`), we can determine which half is sorted and whether our `target` lies within that sorted half.

### Step-by-Step Logic

1.  Initialize `low = 0` and `high = nums.length - 1`.
2.  While `low <= high`:
    *   Calculate `mid = low + (high - low) / 2`.
    *   If `nums[mid] == target`, return `mid`.
    *   **Check which half is sorted:**
        *   **If the left half is sorted (`nums[low] <= nums[mid]`):**
            *   If `target` is within the range of the left sorted half (`nums[low] <= target && target < nums[mid]`):
                *   Search in the left half: `high = mid - 1`.
            *   Else (`target` is in the right, unsorted/rotated half):
                *   Search in the right half: `low = mid + 1`.
        *   **Else (the right half is sorted `nums[low] > nums[mid]`):**
            *   If `target` is within the range of the right sorted half (`nums[mid] < target && target <= nums[high]`):
                *   Search in the right half: `low = mid + 1`.
            *   Else (`target` is in the left, unsorted/rotated half):
                *   Search in the left half: `high = mid - 1`.
3.  If the loop finishes, return `-1`.

### ASCII Diagram

```
Array: [4, 5, 6, 7, 0, 1, 2], Target = 0

Initial:
  low                  high
   |                    |
  [4, 5, 6, 7, 0, 1, 2]
   0  1  2  3  4  5  6

Iteration 1:
  mid = (0 + 6) / 2 = 3. nums[3] = 7. Target = 0.
  nums[low] (4) <= nums[mid] (7) -> Left half is sorted: [4, 5, 6, 7]
  Is Target (0) in [nums[low] (4) to nums[mid] (7)]? No.
  So, Target must be in the right half.
  low = mid + 1 = 4.

                   low   high
                    |     |
  [4, 5, 6, 7, 0, 1, 2]
   0  1  2  3  4  5  6

Iteration 2:
  mid = (4 + 6) / 2 = 5. nums[5] = 1. Target = 0.
  nums[low] (0) > nums[mid] (1) -> Right half is sorted: [1, 2]
  Is Target (0) in [nums[mid] (1) to nums[high] (2)]? No.
  So, Target must be in the left unsorted/rotated half.
  high = mid - 1 = 4.

                   low high
                    |   |
  [4, 5, 6, 7, 0, 1, 2]
   0  1  2  3  4  5  6

Iteration 3:
  mid = (4 + 4) / 2 = 4. nums[4] = 0. Target = 0. Found! Return 4.

                     mid
                      |
  [4, 5, 6, 7, 0, 1, 2]
   0  1  2  3  4  5  6
```

---

## 5. Problem 4: Find Peak Element (`findPeakElement`)

### Problem Statement

A peak element is an element that is greater than its neighbors. Given an input array `nums`, where `nums[i] != nums[i+1]`, find a peak element and return its index. You may imagine that `nums[-1] = nums[n] = -∞`.

### Intuition

This problem doesn't search for a specific `target` value, but rather a property. Since `nums[i] != nums[i+1]`, there are no plateaus. The "infinite" neighbors assumption at the boundaries guarantees that a peak always exists (e.g., if `nums` is strictly increasing, the last element is a peak; if strictly decreasing, the first element is a peak).
If `nums[mid] < nums[mid+1]`, it means we are on an uphill slope. A peak must exist to the right of `mid` (including `mid+1`). So we move `low = mid + 1`.
If `nums[mid] > nums[mid+1]`, we are on a downhill slope or at a peak. A peak must exist at or to the left of `mid`. So we move `high = mid`.
The loop condition `low < high` is crucial here because `mid` can be a potential answer. When `low == high`, that index is the peak.

### Step-by-Step Logic

1.  Initialize `low = 0` and `high = nums.length - 1`.
2.  While `low < high`:
    *   Calculate `mid = low + (high - low) / 2`.
    *   **Compare `nums[mid]` with `nums[mid + 1]`:**
        *   If `nums[mid] < nums[mid + 1]` (uphill slope):
            *   A peak must exist to the right. Update `low = mid + 1`.
        *   Else (`nums[mid] > nums[mid + 1]`, downhill slope or peak):
            *   A peak must exist at or to the left of `mid`. Update `high = mid`.
3.  When the loop terminates, `low == high`. This index `low` (or `high`) is the peak element. Return `low`.

### ASCII Diagram

```
Array: [1, 2, 1, 3, 5, 6, 4]

Initial:
  low                      high
   |                        |
  [1, 2, 1, 3, 5, 6, 4]
   0  1  2  3  4  5  6

Iteration 1:
  mid = (0 + 6) / 2 = 3. nums[3] = 3. nums[4] = 5.
  nums[mid] (3) < nums[mid+1] (5) -> Uphill slope. Peak is to the right.
  low = mid + 1 = 4.

                   low   high
                    |     |
  [1, 2, 1, 3, 5, 6, 4]
   0  1  2  3  4  5  6

Iteration 2:
  mid = (4 + 6) / 2 = 5. nums[5] = 6. nums[6] = 4.
  nums[mid] (6) > nums[mid+1] (4) -> Downhill slope or peak. Peak is at or to the left.
  high = mid = 5.

                   low high
                    |   |
  [1, 2, 1, 3, 5, 6, 4]
   0  1  2  3  4  5  6

Iteration 3:
  mid = (4 + 5) / 2 = 4. nums[4] = 5. nums[5] = 6.
  nums[mid] (5) < nums[mid+1] (6) -> Uphill slope. Peak is to the right.
  low = mid + 1 = 5.

                       low high
                        |   |
  [1, 2, 1, 3, 5, 6, 4]
   0  1  2  3  4  5  6

Loop terminates (low == high == 5). Return low = 5.
Peak element is 6 at index 5.
```

---

## 6. Problem 5: Sqrt(x) (`mySqrt`)

### Problem Statement

Compute and return the square root of `x`. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.

### Intuition

This problem applies Binary Search to a *range of possible answers* rather than array indices. We are looking for an integer `ans` such that `ans * ans <= x` and `(ans + 1) * (ans + 1) > x`. The search space for `ans` is from `0` to `x` (or `x/2 + 1` for optimization, or even `Integer.MAX_VALUE`).

### Step-by-Step Logic

1.  Handle base cases: If `x < 2`, return `x` (since `sqrt(0)=0`, `sqrt(1)=1`).
2.  Initialize `low = 1` and `high = x`. Initialize `ans = 0`.
3.  While `low <= high`:
    *   Calculate `mid = low + (high - low) / 2`.
    *   **Crucial:** Use `long` for `square = (long)mid * mid` to prevent integer overflow when `mid` is large.
    *   If `square == x`:
        *   Exact match found. Return `mid`.
    *   If `square < x`:
        *   `mid` could be the answer, or a larger number might be the answer. Store `mid` as a potential answer and try to find a larger one in the right half. Update `ans = mid`, `low = mid + 1`.
    *   If `square > x`:
        *   `mid` is too large. Search in the left half. Update `high = mid - 1`.
4.  Return `ans`. (When the loop ends, `ans` holds the largest integer whose square is less than or equal to `x`).

### ASCII Diagram

```
Target = 8. Find floor(sqrt(8)). Answer should be 2.

Initial:
  low                      high
   |                        |
   1 ... 2 ... 3 ... 4 ... 5 ... 6 ... 7 ... 8   (Possible answers)
  ans = 0

Iteration 1:
  mid = (1 + 8) / 2 = 4. mid*mid = 16. 16 > 8. Too large.
  high = mid - 1 = 3.

  low  high
   |    |
   1 ... 2 ... 3 ... (4) ... 5 ... 6 ... 7 ... 8
  ans = 0

Iteration 2:
  mid = (1 + 3) / 2 = 2. mid*mid = 4. 4 < 8. Potentially correct.
  ans = mid = 2. Search right. low = mid + 1 = 3.

       high low
        |    |
   1 ... 2 ... 3 ... (4) ... 5 ... 6 ... 7 ... 8
  ans = 2

Iteration 3:
  mid = (3 + 3) / 2 = 3. mid*mid = 9. 9 > 8. Too large.
  high = mid - 1 = 2.

       high
        | low
        |  |
   1 ... 2 ... 3 ... (4) ... 5 ... 6 ... 7 ... 8
  ans = 2

Loop terminates (low > high). Return ans = 2.
```

---

## 7. Edge Cases and Gotchas

### Integer Overflow for `mid`

`int mid = (low + high) / 2;` can cause overflow if `low` and `high` are very large integers (e.g., close to `Integer.MAX_VALUE`).
**Solution:** Use `int mid = low + (high - low) / 2;` This is mathematically equivalent but avoids the intermediate sum `low + high`.

### Infinite Loops

This usually happens due to incorrect `low`/`high` updates or `while` loop conditions:
*   **`while (low < high)` with `high = mid` and `low = mid` (or `mid - 1`):** If `mid` happens to be `low`, and `nums[mid]` causes `low = mid`, it will loop infinitely. Use `mid = low + (high - low + 1) / 2` (or `(low + high + 1) / 2`) when `low = mid` is a possibility and you want `mid` to round up to prevent `low` from never moving when `low` and `high` are adjacent.
*   **`while (low <= high)` with `low = mid` or `high = mid`:** Similarly, if `mid` doesn't change `low` or `high` enough, it can loop. The standard `low = mid + 1` and `high = mid - 1` ensures progress. Problems like `findPeakElement` use `high = mid` but handle this by ensuring `low < high` and careful mid calculation.

### Handling Duplicates

Standard Binary Search might return any index of a duplicate. For problems requiring the *first* or *last* occurrence, the `ans` variable and conditional range narrowing (e.g., `high = mid - 1` for `findFirst`) are essential.

### Empty or Single-Element Arrays

Always consider these:
*   **Empty array:** `nums.length == 0`. Most implementations will handle this correctly if `high` is initialized to `nums.length - 1`, making the `while (low <= high)` condition immediately false.
*   **Single-element array:** `nums.length == 1`. The `mid` calculation will point to this element, and the comparison logic should work as expected.
*   **Edge indices:** Target at `nums[0]` or `nums[nums.length - 1]`.

---
This document covers the fundamental aspects and specific problem strategies for Binary Search. Remember to practice these variations to build intuition and confidence for interviews!