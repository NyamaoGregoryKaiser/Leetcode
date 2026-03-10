# Binary Search: Edge Cases and Gotchas

Binary Search, despite its simplicity, is notorious for off-by-one errors and subtle bugs related to boundary conditions. Understanding and correctly handling these scenarios is crucial for a robust implementation.

## Common Edge Cases

1.  **Empty Array (`nums = []`):**
    *   **Behavior:** The `while` loop condition (`left <= right`) will immediately be `False` if `left = 0` and `right = -1` (from `len(nums) - 1`). The function should correctly return `-1` (or `[-1, -1]` for range problems).
    *   **Solution:** Ensure the initial `left` and `right` pointers are set correctly and the loop condition handles this. Most iterative templates naturally manage this.

2.  **Single Element Array (`nums = [val]`):**
    *   **Behavior:** `left = 0`, `right = 0`. `mid = 0`.
        *   If `nums[0] == target`, it's found.
        *   If `nums[0] != target`, `left` will become `1` or `right` will become `-1`. The loop `left <= right` will terminate, returning `-1`.
    *   **Solution:** The standard template works correctly.

3.  **Target at Boundaries (First or Last Element):**
    *   **Behavior:** The search should correctly identify the target whether it's the very first or very last element.
    *   **Solution:** The `left = mid + 1` and `right = mid - 1` adjustments ensure that the boundary elements are considered and the search space shrinks correctly.

4.  **Target Smaller Than Smallest Element / Larger Than Largest Element:**
    *   **Behavior:** The `left` pointer will eventually exceed `right`, or vice-versa, without finding the target.
    *   **Solution:** The loop termination condition `left <= right` correctly handles this, causing the function to return `-1` (or the default 'not found' value).

5.  **Array with All Duplicate Elements (`nums = [7, 7, 7, 7, 7]`, `target = 7`):**
    *   **Behavior:** For a standard binary search returning *any* index, this is fine. For finding *first* or *last* occurrences, specific modifications are needed.
    *   **Solution (First/Last):**
        *   **First:** When `nums[mid] == target`, record `mid` as a potential answer, then try to find an *earlier* occurrence by setting `right = mid - 1`.
        *   **Last:** When `nums[mid] == target`, record `mid` as a potential answer, then try to find a *later* occurrence by setting `left = mid + 1`.

## Common Gotchas and Implementation Details

1.  **Infinite Loops (`left <= right` vs `left < right`):**
    *   **`while left <= right:` (Most Common Template for Finding Exact Match)**
        *   When `left == right`, `mid = left`.
        *   If `nums[mid] == target`, it returns.
        *   If `nums[mid] < target`, `left = mid + 1`. Now `left` is `original_left + 1`, `right` is `original_left`. `left > right`, loop terminates.
        *   If `nums[mid] > target`, `right = mid - 1`. Now `left` is `original_left`, `right` is `original_left - 1`. `left > right`, loop terminates.
        *   **Verdict:** This template is generally safe from infinite loops when `left = mid + 1` and `right = mid - 1`. It terminates correctly when `left > right`.

    *   **`while left < right:` (Common for "Binary Search on Answer" or Finding Boundaries)**
        *   When `left` and `right` become adjacent (e.g., `left=k, right=k+1`), `mid` will be `k`.
        *   If the logic always moves `left = mid` or `right = mid`, you can get an infinite loop if `mid` is always `left` and `left` never changes.
        *   **Solution:** If using `left < right`, it's common to use:
            *   `mid = left + (right - left) // 2` (flooring division) when `right = mid` is a possibility.
            *   `mid = left + (right - left + 1) // 2` (ceiling division) when `left = mid` is a possibility.
            *   Ensure `left` and `right` always change and eventually cross or meet.
        *   **Example (Peak Element):** `find_peak_element` uses `left < right`. When `nums[mid] > nums[mid+1]`, it sets `right = mid`. This is safe because `mid` can be `left`. If `right` was `mid-1`, `left` could become `mid` and `right` `mid-1`, leading to early termination. The `right = mid` logic allows the `mid` index itself to be considered a possible peak.

2.  **Integer Overflow for `mid`:**
    *   **Gotcha:** `mid = (left + right) / 2` can overflow if `left` and `right` are both large positive integers (e.g., `2^31 - 1`).
    *   **Solution:** Use `mid = left + (right - left) // 2`. This calculates the offset from `left` and adds it, avoiding the large intermediate sum. In Python, this is less of an issue due to arbitrary precision integers, but it's a critical consideration in languages like C++, Java, or Go.

3.  **Correctly Setting `left` and `right` Boundaries:**
    *   **Gotcha:** Off-by-one errors with `mid+1` or `mid-1` are extremely common.
    *   **Consider:**
        *   If `nums[mid]` is *too small*, the target must be strictly to the right of `mid`. So `left = mid + 1`.
        *   If `nums[mid]` is *too large*, the target must be strictly to the left of `mid`. So `right = mid - 1`.
        *   If `nums[mid]` *could be* the answer (e.g., finding first occurrence, `nums[mid] == target`, and you want an even earlier one), you might set `right = mid`.
        *   If `nums[mid]` *could be* the answer and you want a *later* one, you might set `left = mid`.
    *   **Rule of thumb:** If the `mid` element is explicitly ruled out, move the boundary one step past `mid` (`mid+1` or `mid-1`). If `mid` itself *might* be the answer, include it in the next search space (`left=mid` or `right=mid`).

4.  **Handling `x = 0` or `x = 1` for `sqrt(x)`:**
    *   **Gotcha:** If `x = 0`, `left = 1, right = x // 2 = 0`. The loop `left <= right` (`1 <= 0`) is false, returning initial `ans = 0`. Correct.
    *   If `x = 1`, `left = 1, right = x // 2 = 0`. The loop `left <= right` (`1 <= 0`) is false, returning initial `ans = 0`. Incorrect (`sqrt(1)=1`).
    *   **Solution:** Handle `x < 2` (i.e., 0 or 1) as a base case, returning `x` directly. This simplifies the loop logic and correctly covers these small values.

By being mindful of these edge cases and implementing the pointer movements precisely, you can write robust binary search algorithms.