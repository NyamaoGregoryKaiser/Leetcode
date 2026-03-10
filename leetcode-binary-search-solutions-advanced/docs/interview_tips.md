# Binary Search: Interview Tips and Variations

Binary search is a staple in coding interviews. It tests your ability to think algorithmically, handle boundary conditions, and apply a fundamental technique to various problems.

## What Interviewers Look For

When you're presented with a binary search problem, interviewers are typically assessing:

1.  **Problem Recognition:** Can you identify when binary search is applicable? (Hint: sorted array, "search space" that can be halved, monotonic property).
2.  **Correct Template Application:** Do you know the standard binary search template (`left <= right` vs `left < right`, `mid` calculation, `left/right` updates)?
3.  **Boundary Conditions and Edge Cases:** Can you handle an empty array, single-element array, target at extremes, or target not present? This is often where candidates make mistakes.
4.  **Off-by-One Errors:** Correctly setting `left = mid + 1` or `right = mid - 1` (or `mid`) without causing infinite loops or missing elements.
5.  **Adaptation:** Can you adapt the basic binary search logic to more complex scenarios (e.g., rotated arrays, finding first/last occurrences, "binary search on the answer" problems)?
6.  **Time and Space Complexity Analysis:** Can you correctly state why binary search is O(log N) time and O(1) space (iterative)?

## How to Approach Binary Search Problems in an Interview

1.  **Identify Applicability:**
    *   Look for keywords: "sorted array", "find minimum/maximum value that satisfies a condition", "range", "logarithmic time complexity".
    *   Check if the problem space has a monotonic property (e.g., if `P(x)` is true, then `P(x+1)` is also true, or vice versa). If you can define a `check(x)` function that returns true/false, and the transition from false to true (or true to false) is what you're looking for, binary search might be the answer.

2.  **Define Search Space (`left`, `right`):**
    *   What's the smallest possible answer? (e.g., `0`, `1`, `min(nums)`) -> This is your `left`.
    *   What's the largest possible answer? (e.g., `len(nums) - 1`, `max(nums)`, `sum(nums)`) -> This is your `right`.
    *   Be precise with inclusive/exclusive bounds. Often, `left` and `right` are inclusive.

3.  **Choose a Template:**
    *   **`while left <= right:` (Exact Match / "Classic" Binary Search)**: Best when you're looking for a specific value that *must* exist within the `[left, right]` range. `mid` is always a potential answer. If `nums[mid] == target`, you return. Otherwise, `left = mid + 1` or `right = mid - 1`.
    *   **`while left < right:` (Finding Boundary / "Binary Search on Answer")**: Best when you're looking for the *first* or *last* element satisfying a condition, or minimizing/maximizing a value. The loop terminates when `left == right`, and that `left` (or `right`) is your answer. You need to be careful with `mid` calculation and `left/right` updates to avoid infinite loops:
        *   If your update logic can set `right = mid`, use `mid = left + (right - left) // 2`.
        *   If your update logic can set `left = mid`, use `mid = left + (right - left + 1) // 2`.
        *   This ensures `mid` always shifts towards `right` or `left` respectively, preventing `left` from getting stuck when `right = left + 1`.

4.  **Develop the `mid` Logic:**
    *   What condition are you checking at `nums[mid]`?
    *   How does that condition inform whether you should search the left half (`right = ...`) or the right half (`left = ...`)?
    *   Crucially, decide if `mid` itself could be part of the potential answer range, or if it should be completely excluded.

5.  **Handle Termination and Return Value:**
    *   If using `left <= right`, what happens if the loop finishes without returning? (Often means target not found, return -1).
    *   If using `left < right`, the loop terminates when `left == right`. What should be returned? (`left` or `right` usually).

6.  **Test with Edge Cases:**
    *   Empty array.
    *   Single element array.
    *   Target at start/end.
    *   Target not present.
    *   Array with duplicates (if applicable to the problem).
    *   Smallest possible inputs, largest possible inputs.

## Common Binary Search Variations

1.  **Finding First/Last Occurrence:** As seen in `find_first_last_position.py`.
    *   To find the first: if `nums[mid] == target`, save `mid` as a candidate, then search `[left, mid - 1]`.
    *   To find the last: if `nums[mid] == target`, save `mid` as a candidate, then search `[mid + 1, right]`.

2.  **Search in Rotated Sorted Array:** As seen in `rotated_sorted_array.py`.
    *   The core idea is that one half (either `[left, mid]` or `[mid, right]`) *must* be sorted.
    *   Identify the sorted half.
    *   Check if the target falls within that sorted half's range. If so, search there.
    *   Otherwise, search the unsorted half.

3.  **Binary Search on the Answer:** Many problems don't directly involve searching a sorted array for an index. Instead, the *answer itself* (e.g., minimum capacity, maximum value, square root) lies within a monotonic range.
    *   Example: `sqrt_x.py`. The `ans = floor(sqrt(x))` is searched for in the range `[0, x]`.
    *   Example: Find `k` such that a property `P(k)` is true, `P(k-1)` is false. You binary search on the possible values of `k`. The `check(k)` function would test the property.

4.  **Finding a Peak/Trough:** As seen in `peak_element.py`.
    *   The `mid` element is compared to its neighbors.
    *   If `nums[mid]` is ascending (e.g., `nums[mid] < nums[mid+1]`), the peak must be to the right.
    *   If `nums[mid]` is descending (e.g., `nums[mid] > nums[mid+1]`), the peak must be at or to the left.

By internalizing these variations and the general approach, you'll be well-prepared to tackle binary search problems in interviews. Remember to communicate your thought process, clarify assumptions, and test thoroughly.