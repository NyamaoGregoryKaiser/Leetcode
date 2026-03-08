```markdown
# Interview Tips for Binary Search Problems

Binary search is a fundamental algorithm, and interviewers often use it to test a candidate's precision with boundary conditions, loop invariants, and problem-solving under constraints. Here are some tips to excel:

## Before You Start Coding

1.  **Verify Sortedness:** Binary search *requires* a sorted input (or at least an array with a monotonic property). If the input isn't sorted, clarify with the interviewer if you need to sort it first (which adds O(N log N) time complexity) or if binary search is applicable at all.
2.  **Clarify Constraints & Edge Cases:**
    *   **Array Size:** Empty array? Single element? Very large array?
    *   **Duplicates:** Are there duplicate elements? How should they be handled (e.g., find any occurrence, first, last)? This significantly changes the logic.
    *   **Value Range:** Are numbers positive, negative, zero? Can they overflow `int`? (Crucial for `mid * mid` operations).
    *   **Target Presence:** Is the target guaranteed to be in the array? If not, what should be returned (`-1`, null, `Optional`?)
    *   **Rotated Arrays:** If rotated, are duplicates allowed? (Often no duplicates are assumed for rotated array problems to simplify).

3.  **Identify the Monotonic Property:** Binary search works on a "search space" where a certain property is monotonic (either strictly increasing or decreasing, or changing from `false` to `true`).
    *   **Classic BS:** `nums[i]` is increasing.
    *   **Find Peak:** `nums[i] > nums[i+1]` or `nums[i] < nums[i+1]` divides the array.
    *   **Sqrt(x):** `k*k` is increasing.
    *   **Search on Answer:** The "can it be done in `X` time/value?" function usually has a monotonic property.

## During Implementation

1.  **Choose Iterative over Recursive:** While recursion is elegant, iterative binary search avoids stack overflow issues for very large inputs and typically has better constant factor performance. It's generally preferred in interviews for this reason.
2.  **`mid` Calculation:** Always use `int mid = low + (high - low) / 2;` to prevent integer overflow.
3.  **Loop Condition and Pointer Updates - The Core Logic:** This is where most mistakes happen.
    *   **`while (low <= high)`:** This is the most common and robust for finding an exact match or where `low` and `high` converge to the final answer. When `nums[mid]` is not the target, you can safely move `low = mid + 1` or `high = mid - 1`. If the loop finishes, `low` will be `high + 1`, meaning the search space is empty.
    *   **`while (low < high)`:** Used when the `mid` element itself could be the answer, and you might set `high = mid` or `low = mid`. This setup guarantees that `low` will eventually equal `high`, and that final index `low` (or `high`) is the answer. Be careful with `low = mid` vs `low = mid + 1` and `high = mid` vs `high = mid - 1` to avoid infinite loops, especially when `mid` might resolve to `low` (e.g. `(low+high)/2` when `high = low+1`). In such cases, `mid = low + (high - low + 1) / 2` (ceiling division) or explicit handling is needed if `low` could be `mid`.
    *   **Be consistent:** Once you choose a template (`low <= high` or `low < high`), stick to its specific pointer update rules.

4.  **Consider Intermediate Values:** For problems like `sqrt(x)` or where `mid * mid` is calculated, ensure that the product doesn't overflow `int`. Use `long` for intermediate calculations if necessary.

5.  **Think about how the array is "divided":**
    *   Is `mid` included in the next search space, or excluded?
    *   When searching for the *first* occurrence, if `nums[mid] == target`, you save `mid` and then try to find an *earlier* occurrence by setting `high = mid - 1`.
    *   When searching for the *last* occurrence, if `nums[mid] == target`, you save `mid` and then try to find a *later* occurrence by setting `low = mid + 1`.

## After Coding

1.  **Test with Edge Cases:**
    *   Empty array `[]`
    *   Single element array `[X]`
    *   Two element array `[X, Y]`
    *   Target at beginning, end, middle
    *   Target not present (less than min, greater than max, in between)
    *   Array with all same elements `[X, X, X]` (especially for duplicates)
    *   Negative numbers
    *   Large inputs (to check for overflow)

2.  **Walkthrough:** Mentally (or on a whiteboard) walk through your code with a small example array and the target. Trace `low`, `high`, and `mid` values at each step. This helps catch off-by-one errors.

3.  **Explain Your Logic:** Clearly articulate your thought process to the interviewer. Explain:
    *   Why binary search is applicable.
    *   Your choice of `low`, `high` initialization.
    *   Your loop condition and `mid` calculation.
    *   Your pointer update rules (`low = mid + 1`, `high = mid - 1`, etc.).
    *   How your code handles edge cases.
    *   The time and space complexity.

## Common Binary Search Problem Variations

*   **Find an element:** Standard binary search.
*   **Find first/last occurrence of an element:** Modified binary search.
*   **Find element in rotated sorted array:** Tricky logic to identify the sorted half.
*   **Find peak element:** Binary search on a condition/property.
*   **Find minimum in rotated sorted array:** Similar to rotated sorted array search.
*   **Find square root (or `nth` root):** Binary search on the answer space.
*   **Find median of two sorted arrays:** More complex, but conceptually uses binary search on partitioning.
*   **Kth smallest element in a matrix/array where values have a monotonic property:** Binary search on the answer.
*   **Aggressive Cows / Book Allocation / Ship within D days (problems asking for "minimum possible maximum" or "maximum possible minimum"):** Binary search on the answer space, with a helper function to check if a `mid` value is feasible.

Mastering these tips and variations will significantly boost your confidence and performance in binary search-related interview questions.
```