```markdown
# Algorithm Explanation: Binary Search

Binary Search is an efficient algorithm for finding an item from a **sorted list of items**. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## Core Principle: Divide and Conquer

1.  **Start with an entire sorted array/list.** Define a search space using two pointers: `low` (beginning of the search space) and `high` (end of the search space).
2.  **Find the middle element:** Calculate `mid = low + (high - low) / 2`. This formula prevents potential integer overflow that could occur with `(low + high) / 2` if `low` and `high` are very large.
3.  **Compare the middle element with the target value:**
    *   If `nums[mid] == target`, the target is found at `mid`.
    *   If `nums[mid] < target`, the target must be in the right half (elements greater than `nums[mid]`). Discard `mid` and the left half by setting `low = mid + 1`.
    *   If `nums[mid] > target`, the target must be in the left half (elements less than `nums[mid]`). Discard `mid` and the right half by setting `high = mid - 1`.
4.  **Repeat:** Continue this process until the search space is empty (`low > high`). If the loop terminates and the target hasn't been found, it means the target is not present in the array.

## Time and Space Complexity

*   **Time Complexity: O(log N)**
    *   Binary search divides the search space in half with each comparison.
    *   For an array of `N` elements, it takes approximately `log₂N` steps to find the target.
    *   This is significantly faster than linear search (O(N)) for large datasets.

*   **Space Complexity: O(1)** (for iterative approach)
    *   The algorithm uses a constant amount of extra space for variables like `low`, `high`, `mid`.
    *   If implemented recursively, the space complexity would be O(log N) due to the call stack depth. Iterative is generally preferred for interviews unless a recursive solution offers particular clarity.

## Edge Cases and Gotchas

1.  **Empty Array:** Handle `nums == null` or `nums.length == 0` explicitly.
2.  **Single Element Array:** Ensure the logic correctly handles arrays with one element.
3.  **Target Not Found:** The loop condition `low <= high` is crucial. When `low > high`, the search space has become invalid, indicating the target is not present.
4.  **Integer Overflow:** Use `mid = low + (high - low) / 2` instead of `(low + high) / 2` to prevent overflow for large `low` and `high` values.
5.  **Boundary Conditions (`low = mid + 1` vs `high = mid - 1` vs `low = mid` vs `high = mid`):**
    *   When `nums[mid]` is *not* the target, we can safely exclude `mid` from the next search space (e.g., `mid + 1`, `mid - 1`).
    *   When `nums[mid]` *could be* the target (e.g., finding first/last occurrence, or when checking a condition), sometimes you might set `high = mid` or `low = mid` and adjust the loop condition (`low < high`) and return value accordingly. This is the trickiest part of binary search variations.

## Common Variations and Patterns

Binary search isn't just for finding an exact value. It's often used when you need to find *the first element that satisfies a condition*, *the last element that satisfies a condition*, or *the smallest/largest value that meets a certain criteria*.

### 1. Finding First/Last Occurrence (Lower/Upper Bound)
*   **Lower Bound (First Occurrence):** When `nums[mid] == target`, you save `mid` as a potential answer, but continue searching in the *left* half (`high = mid - 1`) to see if an even earlier occurrence exists.
*   **Upper Bound (Last Occurrence):** When `nums[mid] == target`, you save `mid` as a potential answer, but continue searching in the *right* half (`low = mid + 1`) to see if an even later occurrence exists.

### 2. Binary Search on Answer
*   Instead of searching for a value in the array, you search for an "answer" in a *range of possible answers*.
*   Example: `sqrt(x)` - the answer is between 0 and x. You binary search for the integer `k` such that `k*k <= x` and `(k+1)*(k+1) > x`.
*   Example: Finding the minimum time to complete `N` tasks given `K` workers and varying task times (e.g., each worker takes `T` time, how many tasks can they complete?). The "answer" is the minimum time, which you binary search for. The "check function" for `mid` would be: "Can all tasks be completed within `mid` time?"

### 3. Binary Search with a Predicate (Condition)
*   Often, binary search is applied to find the "transition point" where a boolean condition changes from false to true (or vice-versa).
*   The array might not be explicitly sorted by value, but there's a monotonic property you can exploit.
*   Example: `findPeakElement` - the condition is `nums[mid] > nums[mid+1]`. If true, the peak is `mid` or to its left (`high = mid`); if false, it's to the right (`low = mid + 1`).

### 4. Search in Rotated Sorted Array
*   This is a classic problem where the array is sorted but "broken" into two sorted parts.
*   The key is to determine which half (`low...mid` or `mid...high`) is **sorted** and then check if the target falls within that sorted range. If it does, narrow the search to that range. Otherwise, search the other (potentially unsorted) half.

## Best Practices for Implementation

*   **Initialize `low` and `high` correctly:** Typically `0` and `nums.length - 1` for a 0-indexed array.
*   **Loop Condition:** `while (low <= high)` is common when searching for an exact value or finding a "point" where `low` and `high` converge to the result. `while (low < high)` is often used when `mid` might be `high` and you need to keep searching until `low == high` is the answer. Be mindful of which to use.
*   **Midpoint Calculation:** `int mid = low + (high - low) / 2;`
*   **Updating Pointers:**
    *   `low = mid + 1;` when `nums[mid]` is too small.
    *   `high = mid - 1;` when `nums[mid]` is too large.
    *   For variations, `high = mid;` or `low = mid;` might be used, which requires careful adjustment of loop conditions and return values.

By understanding these principles, variations, and edge cases, you can effectively tackle most binary search problems in coding interviews.
```