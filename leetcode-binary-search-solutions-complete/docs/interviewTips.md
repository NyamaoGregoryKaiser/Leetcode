```markdown
# Binary Search Interview Tips and Variations

Binary Search is a foundational algorithm, and interviewers often use it to gauge a candidate's precision, edge case handling, and ability to adapt a basic algorithm to complex scenarios.

## 1. General Interview Tips for Binary Search

1.  **Confirm Sortedness**: Always start by asking if the array is sorted. If not, clarify if you should sort it first (and mention the O(N log N) cost) or if you're expected to find another approach.
2.  **Define Search Space**: Clearly define `left` and `right` pointers (inclusive/exclusive). This helps in setting the loop condition (`left <= right` or `left < right`) and update rules.
3.  **Choose `mid` Calculation Carefully**: Prefer `mid = left + floor((right - left) / 2)` to avoid potential integer overflow, even if JavaScript handles large numbers differently than C++/Java. It shows good practice.
4.  **Handle Duplicates**: If the problem statement doesn't explicitly mention "no duplicates", ask about them. This is a common trap. Problems like "find first/last occurrence" directly address this.
5.  **Edge Cases are Crucial**:
    *   **Empty array**: `[]`
    *   **Single element array**: `[5]`
    *   **Two element array**: `[1, 2]`
    *   **Target at beginning/end**: `[1, 5, 10]`, target 1 or 10.
    *   **Target not present**: `[1, 5, 10]`, target 6.
    *   **All elements are the same**: `[7, 7, 7, 7]`
6.  **Explain Your Logic**: Verbally walk through your thought process. Explain why you chose a particular loop condition, how `mid` is calculated, and why `left`/`right` are updated the way they are.
7.  **Trace with an Example**: Before writing code, use a small example array and trace the `left`, `right`, `mid`, and `arr[mid]` values for a few iterations. This helps catch logical errors.
8.  **Iterative vs. Recursive**: While both are valid, iterative solutions are generally preferred in interviews for O(1) space complexity (avoiding stack overflow for very deep recursion) and often cleaner debugging. Be prepared to implement either if asked.
9.  **Don't Rush**: Binary Search can seem simple, but precision is key. A small error in bounds or updates can lead to infinite loops or incorrect results. Take your time.

## 2. Common Variations and Gotchas

### a. Finding First/Last Occurrence

**Problem**: Given `[1, 2, 3, 3, 3, 4, 5]` and `target = 3`, find the index of the first `3` (index 2) and the last `3` (index 4).

**Gotcha**: A standard binary search finds *any* occurrence. To find the first, if `arr[mid] === target`, you might store `mid` as a potential answer and then try to find an even earlier occurrence by searching in the `[left, mid - 1]` range (`right = mid - 1`). Similarly, for the last occurrence, you search in `[mid + 1, right]` (`left = mid + 1`).

### b. Search in Rotated Sorted Array

**Problem**: `[4, 5, 6, 7, 0, 1, 2]`, `target = 0`.
**Gotcha**: The array is "partially sorted". You need to figure out which half is sorted and whether the target lies in that sorted half.
*   Compare `arr[left]` with `arr[mid]`.
    *   If `arr[left] <= arr[mid]`, the left half `[left, mid]` is sorted.
        *   If `target` is within `[arr[left], arr[mid]]`, search left (`right = mid - 1`).
        *   Else, search right (`left = mid + 1`).
    *   If `arr[left] > arr[mid]`, the right half `[mid, right]` is sorted.
        *   If `target` is within `[arr[mid], arr[right]]`, search right (`left = mid + 1`).
        *   Else, search left (`right = mid - 1`).

### c. Finding Peak Element

**Problem**: `[1, 2, 1, 3, 5, 6, 4]`. Peak elements are 2 (index 1) and 6 (index 5).
**Gotcha**: This is a binary search where the array is *not* entirely sorted, but it has a monotonic property (increasing then decreasing).
*   If `arr[mid] > arr[mid + 1]`, it means `mid` could be a peak, or the peak is to its left. So, `right = mid`. (Note: `mid` is not `mid-1` because `mid` *could* be the peak).
*   If `arr[mid] < arr[mid + 1]`, it means `mid` is on an increasing slope, so the peak must be to its right. So, `left = mid + 1`.
*   The loop condition is typically `left < right`, and when it terminates, `left` (or `right`) is the peak.

### d. Binary Search on the Answer

**Problem**: `sqrt(x)`, `Kth Smallest Element in a Sorted Matrix`, `Minimum Time to Complete N Tasks`, etc.
**Gotcha**: The array itself might not be sorted, but the *range of possible answers* is. You apply binary search on this range.
1.  **Identify Search Space**: What's the minimum possible answer? What's the maximum? (e.g., for `sqrt(x)`, range is `[0, x]`).
2.  **Define `check(mid)` Function**: Create a function `check(val)` that returns `true` if `val` *could* be an answer (or satisfies some condition) and `false` otherwise. This function must be monotonic.
3.  **Adjust Pointers Based on `check(mid)`**:
    *   If `check(mid)` is true, `mid` is a possible answer. Try to find a smaller/better answer by searching left (`ans = mid; right = mid - 1` or `right = mid`).
    *   If `check(mid)` is false, `mid` is too small/large. Search right (`left = mid + 1`).

This is a powerful technique for a wide range of problems that don't immediately look like binary search.

## 3. Post-Interview / Self-Reflection

*   Did I consider all edge cases?
*   Is my code clean and readable?
*   Are the variable names clear?
*   Is the time and space complexity optimal?
*   Could there be a simpler way? (Sometimes, a more straightforward linear scan is acceptable for very small constraints, but usually not for binary search problems).
*   Did I handle potential overflow for `mid`?
*   Did I accidentally introduce an infinite loop? (Often happens when `mid` is not excluded correctly in `left = mid` or `right = mid` scenarios).

By diligently preparing for these aspects, you can confidently approach Binary Search problems in interviews.
```