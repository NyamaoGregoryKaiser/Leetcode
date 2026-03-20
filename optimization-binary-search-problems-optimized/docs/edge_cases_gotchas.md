# Binary Search: Edge Cases and Gotchas

Binary Search is notorious for off-by-one errors and subtle bugs related to boundary conditions. Mastering these edge cases is crucial for robust implementations.

## 1. Empty Array

*   **Problem**: What if the input array `nums` is empty?
*   **Expected Behavior**: Binary Search should immediately return `-1` (or indicating not found).
*   **Implementation Note**: Always check `if (!nums || nums.length === 0)` at the beginning of your function. If not handled, `nums.length - 1` will be `-1`, leading to incorrect `mid` calculations or out-of-bounds access.

## 2. Single Element Array

*   **Problem**: What if the input array contains only one element?
*   **Expected Behavior**: If the element is the target, return its index (0). Otherwise, return -1.
*   **Implementation Note**: Ensure your `low`, `high`, and `mid` calculations, as well as the loop condition (`low <= high`), correctly handle `low=0`, `high=0`. This is usually covered correctly if your `mid` calculation is `Math.floor(low + (high - low) / 2)` and your loop is `while (low <= high)`.

## 3. Target at Boundaries (First/Last Element)

*   **Problem**: What if the `target` is the very first or very last element of the array?
*   **Expected Behavior**: The algorithm should correctly find it.
*   **Implementation Note**: This tests if your `low = mid + 1` and `high = mid - 1` adjustments are correct and don't prematurely exclude the boundaries.

## 4. Target Not Present

*   **Problem**: What if the `target` is not in the array?
*   **Expected Behavior**: The loop should terminate with `low > high`, and the function should return `-1` (or an appropriate "not found" indicator).
*   **Implementation Note**: This is the core reason for the `low <= high` loop condition. If `low` and `high` cross (`low > high`), it means the search space has become empty.

## 5. Duplicate Elements

*   **Problem**: When the array contains duplicate elements, and the target is one of them.
*   **Expected Behavior**:
    *   For a standard "find any" binary search, returning *any* index of the target is fine.
    *   For "find first occurrence," "find last occurrence," or "find count of occurrences," special handling is needed (as seen in Problem 5).
*   **Implementation Note**: The standard `if (arr[mid] === target) return mid;` might return an index of a duplicate that is not the first or last. For specific first/last, you need to adjust `low` or `high` even after finding the target, to continue searching in the appropriate half.

## 6. Integer Overflow (in C++/Java)

*   **Problem**: In languages like C++, Java, `int mid = (low + high) / 2;` can lead to integer overflow if `low` and `high` are both large positive integers, causing `low + high` to exceed the maximum value for an `int`.
*   **Solution**: Use `int mid = low + (high - low) / 2;`
*   **JavaScript Note**: JavaScript numbers are 64-bit floating-point, so this is generally **not an issue** for array indices which are well within `2^53 - 1`. However, it's a critical concept to be aware of and good practice to apply if you're writing in a language like Java/C++.

## 7. Off-by-One Errors in Loop Conditions and Index Adjustments

This is the most frequent source of bugs.

*   **`while (low <= high)` vs `while (low < high)`**:
    *   `low <= high`: The search space is `[low, high]` (inclusive). This means `low` and `high` can point to the same element, and `mid` could be that element. This is generally preferred for finding an exact match or a boundary.
    *   `low < high`: The search space is `[low, high)` (exclusive of `high`). The loop terminates when `low` equals `high`. If you use this, you need to carefully adjust `mid` and the `low/high` updates to ensure no element is skipped and the loop doesn't get stuck. This can be trickier.
    *   **Recommendation**: Stick to `while (low <= high)` for most problems, as it simplifies reasoning about inclusive ranges.

*   **`low = mid + 1` vs `high = mid - 1`**:
    *   When `arr[mid]` is *not* the target (or the condition you're looking for), you know `arr[mid]` itself cannot be the answer. So, you can safely exclude `mid` from the next search space.
    *   `mid + 1` and `mid - 1` correctly shrink the search space.
    *   **Gotcha**: In some complex variations (e.g., finding the first element *greater than* target), `mid` might still be a candidate for the answer even if it doesn't strictly match the target condition. In such cases, `high = mid` or `low = mid` might be appropriate, and the loop condition might need to be `low < high`. This makes these variations harder to get right without careful reasoning.

*   **`mid` Calculation Rounding**:
    *   `Math.floor()` is crucial in JavaScript to get an integer index. `Math.floor(low + (high - low) / 2)` or `Math.floor((low + high) / 2)`.
    *   If `high - low` is odd, `(high - low) / 2` will have a `.5` component. `Math.floor` correctly rounds down.

## 8. Infinite Loops

An infinite loop usually occurs when `low` or `high` are not updated correctly, leading to `low` never crossing `high` or `low` and `high` getting stuck.

*   **Common cause**: `low = mid` or `high = mid` when `low < high`.
    *   If `mid` calculation is `Math.floor((low + high) / 2)`:
        *   If `high = mid` is used, and `low = mid - 1`, `high` could get stuck if `mid` always rounds down to `low`. Example: `low=0, high=1, mid=0`. If `high = mid`, then `high` remains `0`, `low` remains `0`. Infinite loop.
    *   If `mid` calculation is `Math.ceil((low + high) / 2)`:
        *   If `low = mid` is used, `low` could get stuck. Example: `low=0, high=1, mid=1`. If `low = mid`, then `low` remains `1`, `high` remains `1`. Infinite loop.

*   **Solution**: Be mindful of how `mid` is calculated and how `low`/`high` are updated.
    *   If you use `mid = Math.floor(...)`, then `low = mid + 1` and `high = mid - 1` are generally safe for exact matches.
    *   If you need `low = mid` or `high = mid` (e.g., `firstBadVersion` or searching for a boundary), carefully consider the `mid` calculation and the loop condition `low < high`. Sometimes, you might need two different `mid` calculations like `mid1 = Math.floor((low + high) / 2)` and `mid2 = Math.ceil((low + high) / 2)` depending on which boundary you're closing in on.

## Summary

Always consider these points when implementing Binary Search:
1.  **Empty array**: Handle explicitly.
2.  **Single element array**: Ensure it works.
3.  **Boundary targets**: Check `arr[0]` and `arr[length-1]`.
4.  **Target not found**: Ensure correct `-1` return.
5.  **Duplicates**: Be aware if you need first/last/any.
6.  **`mid` calculation**: Use `low + (high - low) / 2` and `Math.floor()`.
7.  **Loop condition (`low <= high`)**: Stick to this for inclusive ranges, modify only with good reason.
8.  **Index adjustments (`mid + 1`, `mid - 1`)**: Ensure they don't skip potential answers or cause infinite loops.

Thorough testing with these edge cases is the best way to ensure your Binary Search implementation is correct.