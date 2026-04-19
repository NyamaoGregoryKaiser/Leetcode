```markdown
# Binary Search: Edge Cases and Gotchas

Binary Search, while efficient, is notoriously prone to off-by-one errors and infinite loops if not implemented carefully. Understanding common edge cases and pitfalls is crucial for robust solutions.

## 1. Midpoint Calculation (`mid = low + (high - low) / 2`)

**Gotcha:** `mid = (low + high) / 2`
**Problem:** If `low` and `high` are both large positive integers (e.g., close to `Integer.MAX_VALUE`), their sum `(low + high)` can exceed `Integer.MAX_VALUE`, leading to an integer overflow and an incorrect `mid` value (potentially negative).
**Solution:** Use `mid = low + (high - low) / 2`. This calculation is mathematically equivalent but avoids the intermediate sum that could overflow.

## 2. Loop Condition (`while (low <= high)` vs `while (low < high)`)

The choice of loop condition depends heavily on how `low` and `high` are updated.

*   **`while (low <= high)` (Most Common for Exact Match)**
    *   **Behavior:** The search space includes `mid`. The loop continues as long as there's a valid range where `low` could be equal to `high` (single element remaining).
    *   **Updates:**
        *   If `arr[mid] == target`, you typically `return mid;`
        *   If `arr[mid] < target`, `low = mid + 1;` (target is strictly to the right)
        *   If `arr[mid] > target`, `high = mid - 1;` (target is strictly to the left)
    *   **Return:** If the loop finishes, `target` was not found, return `-1`.
    *   **Advantages:** Simple, intuitive for finding exact matches.
    *   **When to Use:** Standard search for an element, finding first/last occurrence (with modifications).

*   **`while (low < high)` (Common for Finding Minimum/Maximum or "Smallest `X` that satisfies condition `P`")**
    *   **Behavior:** The search space is `[low, high-1]`. The loop terminates when `low` and `high` meet, and that `low` (or `high`) index is usually the answer. `mid` can never be equal to `high` if `high = mid`, as `low` must be less than `high`.
    *   **Updates:**
        *   If `arr[mid]` satisfies a condition, it *might* be the answer, but a better answer might be in `[low, mid]`. So, `high = mid;` (potential answer at `mid` or to its left).
        *   If `arr[mid]` does not satisfy a condition, the answer must be in `[mid+1, high]`. So, `low = mid + 1;`
    *   **Return:** `low` (or `high`) after the loop terminates.
    *   **Advantages:** Guarantees that `low` will point to the smallest element satisfying the condition (or largest, depending on logic). Avoids explicit `return -1` inside the loop for certain problems.
    *   **When to Use:** `findPeakElement`, `findMinInRotatedSortedArray`, `mySqrt`, or problems where you search for a threshold.
    *   **Gotcha:** If you use `mid = (low + high) / 2` and `low = mid` in the loop, you can get an infinite loop if `low = high - 1`. Example: `low=0, high=1, mid=0`. If `low = mid` is updated, `low` stays 0.
    *   **Solution:** When `low = mid` is a possible update, use `mid = low + (high - low + 1) / 2` (or `mid = (low + high + 1) / 2`) for the `mid` calculation. This biases `mid` towards the higher index, ensuring `low` can advance if `low=mid`.

## 3. Off-by-One Errors in Pointer Updates

*   **`low = mid` vs `low = mid + 1`**:
    *   If `arr[mid]` is *too small* (e.g., `arr[mid] < target`), you know `mid` itself cannot be the answer. So, the new search space starts *after* `mid`: `low = mid + 1`.
    *   If `arr[mid]` *could be* the answer, or a potential candidate, and you want to continue searching on its left (or for a smaller value satisfying the condition), you might set `high = mid`. Similarly for `low = mid`.

*   **`high = mid` vs `high = mid - 1`**:
    *   If `arr[mid]` is *too large* (e.g., `arr[mid] > target`), you know `mid` itself cannot be the answer. So, the new search space ends *before* `mid`: `high = mid - 1`.
    *   If `arr[mid]` *could be* the answer, or a potential candidate, and you want to continue searching on its right (or for a larger value satisfying the condition), you might set `low = mid`.

The key is to precisely define whether `mid` itself is a possible answer or definitely not, for the *next iteration*.

## 4. Handling Empty or Single-Element Arrays

*   **Empty Array (`arr == null` or `arr.length == 0`)**: Always check for this at the beginning. Binary search cannot operate on an empty array. Return `-1` or throw an `IllegalArgumentException`.
*   **Single-Element Array (`arr.length == 1`)**:
    *   If `arr[0] == target`, return `0`.
    *   Otherwise, return `-1`.
    *   A correctly implemented binary search should handle this automatically, but it's a good mental check. For problems like `findPeakElement`, a single element is always a peak.

## 5. Duplicates

*   Standard binary search typically returns *any* index where the target is found.
*   If you need the *first* or *last* occurrence, you need to modify the logic:
    *   **First Occurrence:** When `arr[mid] == target`, store `mid` as a potential answer and then set `high = mid - 1` to continue searching in the left half for an even earlier occurrence.
    *   **Last Occurrence:** When `arr[mid] == target`, store `mid` as a potential answer and then set `low = mid + 1` to continue searching in the right half for an even later occurrence.

## 6. Integer Overflow in Problem Specific Logic

*   **Example: `mySqrt(x)`**: When calculating `mid * mid`, if `mid` is an `int` and `mid * mid` exceeds `Integer.MAX_VALUE`, it will overflow.
*   **Solution:** Use `long` for `mid` and `square` calculations, or check `if (mid > x / mid)` instead of `if (mid * mid > x)` to avoid explicit multiplication that could overflow.

## General Debugging Tips

*   **Print `low`, `high`, `mid`, and `arr[mid]`** in each iteration to trace the search space.
*   **Draw small examples** and manually trace `low` and `high` to ensure they move correctly.
*   **Consider the smallest non-trivial cases**: e.g., an array of 2 or 3 elements.
*   **Think about the termination condition**: What happens when `low` and `high` cross or meet? Does the final `low` or `high` correctly represent the answer?
```