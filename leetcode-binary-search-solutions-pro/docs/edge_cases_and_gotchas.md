# Binary Search: Edge Cases and Gotchas

Binary Search is deceptively simple but notoriously difficult to implement perfectly due to subtle boundary conditions. Here's a breakdown of common pitfalls and how to address them.

## 1. Off-by-One Errors in Loop Conditions and Pointer Updates

**The Problem:** The most frequent mistake in binary search. It's easy to get `low <= high` vs. `low < high`, and `mid` vs. `mid + 1` or `mid - 1` wrong, leading to infinite loops or missing valid results.

**Explanation:**
*   **`while low <= high` (Inclusive Search Space `[low, high]`):**
    *   This is the most common and generally easiest to reason about. It means `mid` can be equal to `low` or `high`. The loop continues as long as there's at least one element in the search space.
    *   If `arr[mid] == target`, you usually return `mid`.
    *   If `arr[mid] < target`, the target is in `[mid+1, high]`, so `low = mid + 1`.
    *   If `arr[mid] > target`, the target is in `[low, mid-1]`, so `high = mid - 1`.
    *   When `low` becomes `high + 1`, the search space `[low, high]` becomes empty, and the loop terminates.

*   **`while low < high` (Half-Inclusive Search Space `[low, high)` or `(low, high]`):**
    *   This is sometimes used, but requires more careful handling of `mid` and pointer updates.
    *   If `arr[mid] == target`, you return `mid`.
    *   If `arr[mid] < target`, `low = mid + 1`.
    *   If `arr[mid] > target`, `high = mid`. (Because `mid` could still be the answer, but the actual target is to its left.)
    *   The loop terminates when `low == high`. The final `low` (or `high`) usually points to the potential answer or insertion point.
    *   **Gotcha:** If your `mid` calculation rounds down (`(low + high) // 2`), and you use `high = mid` when `low + 1 == high`, then `mid` will always be `low`. If `arr[low]` doesn't satisfy the condition, `high` will never change, leading to an infinite loop. To fix this, if `high = mid` is a possibility, use `mid = low + (high - low + 1) // 2` (rounds up) for `low < high` loops to prevent `mid` from always staying at `low`.
    *   **Recommendation:** Stick to `low <= high` initially for clarity and fewer pitfalls.

## 2. Integer Overflow for `mid` Calculation

**The Problem:** In languages with fixed-size integer types (like Java, C++), `(low + high)` can exceed the maximum integer value if `low` and `high` are very large.

**Solution:** Use `mid = low + (high - low) // 2`.
*   This calculation is mathematically equivalent but avoids the intermediate `low + high` sum.
*   Python's integers handle arbitrary size, so this is not a correctness issue in Python, but it's good practice for cross-language consistency.

## 3. Handling Duplicates (First/Last Occurrence, Lower/Upper Bound)

**The Problem:** When an array contains duplicates of the target, the standard binary search might return any one of their indices. To find the *first* or *last* occurrence, specific adjustments are needed.

**Solutions:**
*   **Find First Occurrence (Lower Bound):**
    *   When `arr[mid] == target`, store `mid` as a potential answer (`ans = mid`). Then, critically, continue searching in the *left* half to see if an earlier occurrence exists: `high = mid - 1`.
*   **Find Last Occurrence (Upper Bound):**
    *   When `arr[mid] == target`, store `mid` as a potential answer (`ans = mid`). Then, critically, continue searching in the *right* half to see if a later occurrence exists: `low = mid + 1`.

## 4. Empty Arrays and Single-Element Arrays

**The Problem:** Binary search algorithms need to gracefully handle arrays with zero or one element.

**Solution:**
*   **Empty Array:** Check `if not arr:` (or `if len(arr) == 0:`). If the array is empty, binary search cannot proceed, so return -1 immediately.
*   **Single-Element Array:** The general `low <= high` loop handles this correctly. `low=0, high=0`, `mid=0`. If `arr[0]` is the target, it's found. If not, `low` or `high` will update, making `low > high`, and the loop terminates, returning -1. No special handling is usually required *inside* the loop if the template is correct.

## 5. Rotated Sorted Arrays with Duplicates

**The Problem:** Searching in a rotated sorted array becomes significantly harder when duplicates are present (e.g., `[1,1,1,1,1,0,1,1,1]`). The logic of determining which half is sorted (`nums[low] <= nums[mid]`) can fail.
*   Example: `nums = [1, 0, 1, 1, 1], target = 0`
    *   `low=0, high=4, mid=2, nums[mid]=1`.
    *   `nums[low] (1) == nums[mid] (1)`. This doesn't tell us if `[low, mid]` is sorted or if the rotation point is within this segment.
    *   If `nums[low] == nums[mid] == nums[high]`, we might not be able to narrow the search space efficiently.

**Solution:**
*   **If `nums[low] == nums[mid]` (and `nums[mid] == nums[high]`):** The only safe move is to shrink the search space by one element from both ends: `low += 1` and `high -= 1`. In the worst case, this degrades to `O(N)` complexity (e.g., `[1,1,1,1,0,1,1,1,1]`).
*   **If `nums[low] == nums[mid]` (but `nums[mid] != nums[high]`):** The rotation point is likely to the left of `mid` or `mid` is the pivot. The left segment `[low, mid]` effectively looks flat. It's safe to discard `low`: `low += 1`.
*   **Recommendation:** Many interview problems for "Search in Rotated Sorted Array" explicitly state "no duplicates" to avoid this complexity. Always clarify this with the interviewer.

## 6. Incorrect Termination Conditions for Monotonic Properties

**The Problem:** When binary searching for a value that satisfies a monotonic property (e.g., "minimum value X such that `check(X)` is true"), it's crucial to correctly update `low`/`high` and store the `ans`.

**Example: Find smallest X such that `check(X)` is true.**
*   If `check(mid)` is true: `mid` *could* be the answer. Store `mid` (`ans = mid`) and try to find a *smaller* `mid` that also satisfies the condition: `high = mid - 1`.
*   If `check(mid)` is false: `mid` is too small. Need a larger value: `low = mid + 1`.

**Gotcha:** If you just set `ans = mid` and `return mid` immediately, you might not find the *smallest* `X`. The loop needs to continue to explore smaller values.

## Summary of Best Practices

1.  **Always use `low + (high - low) // 2` for `mid`.**
2.  **Use `while low <= high` for the main loop condition.**
3.  **Handle empty arrays at the beginning.**
4.  **Carefully determine `low = mid + 1` vs `high = mid - 1` based on the comparison.**
5.  **For first/last occurrence, remember to store the result and continue searching in the appropriate half.**
6.  **For "binary search on the answer," ensure your `check()` function is correct and the `ans` variable is updated appropriately.**
7.  **Clarify duplicate handling for rotated sorted arrays.**

Mastering these points will significantly reduce bugs in your binary search implementations.

---