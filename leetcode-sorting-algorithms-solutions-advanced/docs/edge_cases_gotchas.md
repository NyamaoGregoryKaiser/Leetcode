# Edge Cases and Gotchas in Sorting Problems

Understanding edge cases and potential pitfalls is crucial for writing robust and correct algorithms, especially in interviews. This document highlights common ones for sorting-related problems.

---

## General Sorting-Related Edge Cases

1.  **Empty Array (`[]`):**
    *   **Behavior:** Most sorting algorithms and problem solutions should gracefully handle empty inputs, typically returning an empty list or array.
    *   **Gotcha:** If not handled, attempting to access `arr[0]` or `len(arr) - 1` can lead to `IndexError`.
    *   **Example Problem:** Kth Largest Element (`k` cannot be found in an empty array), Merge Intervals (returns `[]`).

2.  **Single Element Array (`[x]`):**
    *   **Behavior:** An array with one element is already "sorted" and usually needs no further processing.
    *   **Gotcha:** Recursive algorithms need a base case for `len(arr) <= 1`. Partitioning logic might break if `low == high`.
    *   **Example Problem:** Kth Largest Element (if `k=1`, the element itself is the answer), Wiggle Sort II (array `[x]` is trivially wiggle sorted).

3.  **Arrays with Duplicate Elements:**
    *   **Behavior:** Standard sorting algorithms handle duplicates correctly.
    *   **Gotcha:**
        *   **Kth Largest/Smallest:** Be clear if `k`-th refers to distinct elements or sorted order. Typically, it's sorted order (e.g., `[3,2,3,1,2,4,5,5,6]`, 4th largest is `4`, not a distinct count).
        *   **Stable Sorting:** Some problems require stable sorting (relative order of equal elements is preserved, e.g., merging records where order matters for ties). Quick Sort is generally not stable; Merge Sort is. Python's `list.sort()` and `sorted()` are stable.
        *   **Wiggle Sort II:** Strict inequality (`<`, `>`) is impossible if all elements are the same (e.g., `[2,2,2]`). The problem statement for Wiggle Sort II guarantees a valid answer always exists, implying that the element distribution allows for the strict inequalities. This is a common point of failure for naive `O(1)` space solutions if not handled via median partitioning correctly.

4.  **Arrays with All Same Elements (`[x, x, x, ...]`):**
    *   A special case of duplicates. For problems like Kth Largest, it's straightforward. For Wiggle Sort II, as noted, it typically makes the problem unsolvable if strict inequality is required.

5.  **Large Input Sizes:**
    *   **Behavior:** Performance becomes critical (time and space complexity).
    *   **Gotcha:** O(N^2) or O(N\*L^2) solutions will TLE (Time Limit Exceeded). Excessive recursion depth can lead to `RecursionError` in Python for very large `N` (e.g., Quick Sort/Quickselect without tail call optimization or iterative implementation).
    *   **Example:** Kth Largest Quickselect `O(N^2)` worst case needs randomization.

6.  **Negative Numbers/Zero:**
    *   **Behavior:** Most comparison-based sorts handle these naturally.
    *   **Gotcha:** If using counting sort or bucket sort, ensure the range includes negative numbers (e.g., by shifting indices) or has appropriate buckets for zero.
    *   **Example:** Merge Intervals with `[-5, -1], [-2, 0]`.

---

## Problem-Specific Edge Cases

### Kth Largest Element

*   **`k = 1`:** Find the maximum element.
*   **`k = N` (length of array):** Find the minimum element.
*   **`k` out of bounds (e.g., `k < 1` or `k > N`):** Should raise an error or handle according to problem specification. Our solutions raise `ValueError`.

### Merge Overlapping Intervals

*   **No Overlap:** `[[1,2], [3,4], [5,6]]` -> `[[1,2], [3,4], [5,6]]`. No merges.
*   **Complete Overlap:** `[[1,5], [2,3]]` -> `[[1,5]]`. Inner interval completely covered.
*   **Touching Intervals:** `[[1,4], [4,5]]` -> `[[1,5]]`. The endpoint of one is the start point of another; they merge.
*   **Intervals Out of Order:** `[[8,10], [1,3], [2,6]]`. This is why sorting by start time is crucial. The algorithm handles this by sorting first.
*   **Single Interval:** `[[1,5]]` -> `[[1,5]]`.

### Group Anagrams

*   **Empty String (`""`):** `[""]` -> `[[""]]`. An empty string is an anagram of itself. `["", "a", ""]` -> `[["",""], ["a"]]`.
*   **Single Character Strings:** `["a", "b"]` -> `[["a"], ["b"]]`.
*   **Case Sensitivity:** Problem specifies "lowercase English letters". If not, decide whether "Aa" and "aA" are anagrams. Usually, convert to a common case. Our solutions are case-sensitive as per standard problem interpretation if not specified otherwise.
*   **Non-Alphabetic Characters:** Problem usually specifies character set (e.g., "lowercase English letters"). If numbers or symbols are allowed, counting sort-based keys need adjustment (e.g., use a hash map for counts instead of a fixed-size array).

### Wiggle Sort II

*   **Strict Inequality (`<`, `>`):** This is the biggest gotcha. If many elements are equal to the median, distributing them to satisfy strict inequality can be tricky.
    *   Example: `[1,1,1,1,2,2,2,2]`. Median is 1 (or 2). `small` = `[1,1,1,1]`, `large` = `[2,2,2,2]`. Wiggle sorted `[1,2,1,2,1,2,1,2]` works.
    *   Example: `[1,1,1,1,1,2,2,2]`. Median is 1. `small` = `[]`, `equal` = `[1,1,1,1,1]`, `large` = `[2,2,2]`.
        Filling `nums` as `[E, L, E, L, E, E, L, E]`:
        `nums = [1,2,1,2,1,1,2,1]` (Using 5 ones and 3 twos, distributing large first).
        `1 < 2 > 1 < 2 > 1 !< 1 !> 2 !< 1`. This would fail.
        The problem explicitly guarantees a valid answer exists. This implies that the input `nums` will always allow a distribution of elements satisfying the condition. This makes the median strategy robust.
*   **Odd vs. Even Length:** The split point for median and partitioning indices often depends on whether `N` is odd or even.
    *   `(N-1)//2` is a common way to get the "lower median" index for both odd/even `N`.
    *   The interleaving pattern needs to correctly handle remaining elements if `N` is odd.

---