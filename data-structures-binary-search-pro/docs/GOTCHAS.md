# Binary Search: Common Gotchas and Edge Cases

Binary search, while seemingly simple, is notoriously prone to off-by-one errors and other subtle bugs. Here's a rundown of common pitfalls and how to avoid them.

## 1. Integer Overflow in `mid` Calculation

**The Problem**:
A common way to calculate the middle index is `mid = (low + high) / 2;`. While this works for most cases, if `low` and `high` are very large integers (e.g., close to `INT_MAX`), their sum `(low + high)` could exceed the maximum value an `int` can hold, leading to an overflow and an incorrect `mid` value.

**The Solution**:
Use `mid = low + (high - low) / 2;`
This formula calculates the difference first, which prevents the sum from overflowing. It's mathematically equivalent but safer.

## 2. Loop Termination Condition (`low <= high` vs `low < high`)

This is one of the most frequent sources of off-by-one errors. The choice depends on *what* `low` and `high` represent and *what* you're trying to achieve when the loop ends.

*   **`while (low <= high)`**:
    *   This is the most common and robust approach for finding an exact match or for "binary search on the answer" problems where `low` and `high` can converge to the answer itself.
    *   The search space is `[low, high]`, inclusive.
    *   When `low == high`, there's still one element to check.
    *   The loop terminates when `low = high + 1`. This means `low` is the first element *greater than* the search space, and `high` is the last element *less than* the search space.
    *   **Use when**:
        *   Searching for an exact value.
        *   Finding `lower_bound` (first element `>= target`). `low` will point to the correct position.
        *   Finding `upper_bound` (first element `> target`). `low` will point to the correct position.
        *   Binary search on the answer where `ans` is updated inside the loop.

*   **`while (low < high)`**:
    *   This is used when the search space is `[low, high)`, i.e., `high` is exclusive.
    *   The loop terminates when `low == high`. At this point, `low` (or `high`) is usually the answer.
    *   Requires careful handling of `mid` and `low/high` updates to ensure `low` can eventually equal `high` without infinite loops.
    *   Often seen in problems where `mid` can be the answer, and you need to potentially include `mid` in the next search range.
    *   **Example**: `high = mid` (when `arr[mid] >= target`) and `low = mid + 1` (when `arr[mid] < target`).

**Recommendation**: Stick to `while (low <= high)` for most problems as it tends to be more intuitive for inclusive ranges. When implementing `lower_bound`/`upper_bound` patterns, `low = mid + 1` and `high = mid - 1` are standard. If `high = mid` or `low = mid` is used, the loop condition and `mid` calculation might need adjustment to prevent infinite loops.

## 3. Correctly Adjusting `low` and `high`

*   **`low = mid + 1` vs `low = mid`**:
    *   `low = mid + 1`: Use when `arr[mid]` is definitively *not* the answer, and you need to search strictly to the right. (e.g., `arr[mid] < target`).
    *   `low = mid`: Use when `mid` *could* potentially be the answer, and you're trying to find the *smallest* such `mid` that satisfies a condition. This often pairs with `while (low < high)` and `high = mid`. Be careful to avoid infinite loops (e.g., `mid = (low + high + 1) / 2` or `mid = low + (high - low + 1) / 2` if updating `low = mid`).

*   **`high = mid - 1` vs `high = mid`**:
    *   `high = mid - 1`: Use when `arr[mid]` is definitively *not* the answer, and you need to search strictly to the left. (e.g., `arr[mid] > target`).
    *   `high = mid`: Use when `mid` *could* potentially be the answer, and you're trying to find the *largest* such `mid` that satisfies a condition. This often pairs with `while (low < high)` and `low = mid`.

## 4. Handling Duplicates

*   If the goal is to find *any* occurrence, the standard binary search works.
*   If the goal is to find the *first* or *last* occurrence, the logic changes:
    *   **First Occurrence (`lower_bound` pattern)**:
        If `arr[mid] == target`, you found a potential first occurrence. Store `mid` as a candidate answer, and then try to find an even earlier occurrence by searching `high = mid - 1`.
    *   **Last Occurrence (`upper_bound` - 1 pattern)**:
        If `arr[mid] == target`, you found a potential last occurrence. Store `mid` as a candidate answer, and then try to find an even later occurrence by searching `low = mid + 1`.

## 5. Edge Cases

*   **Empty Array**: `nums.empty()` or `nums.size() == 0`. Binary search should immediately return "not found" or handle gracefully.
*   **Single Element Array**: Ensure `low`, `high`, and `mid` logic correctly handles `low == high == 0`.
*   **Target at Extremes**: Target is the first element (`arr[0]`) or the last element (`arr[n-1]`).
*   **Target Not Found**: The loop must terminate correctly, and a sensible "not found" value (e.g., -1) should be returned.
*   **All Elements are Same**: E.g., `[5, 5, 5, 5, 5]`. This is important for first/last occurrence.

## 6. Infinite Loops

Infinite loops usually occur due to incorrect `low/high` updates or an incorrect `mid` calculation when `low` and `high` are adjacent.

*   If `mid = low + (high - low) / 2;` (which rounds down), and your update is `low = mid`, with `high = mid - 1` when `arr[mid]` is not the answer, then if `low = 0, high = 1`, `mid` becomes `0`. If `low = mid` is triggered, `low` remains `0`. You're stuck.
*   If `mid = low + (high - low + 1) / 2;` (which rounds up), and your update is `high = mid`, with `low = mid + 1` when `arr[mid]` is not the answer, then if `low = 0, high = 1`, `mid` becomes `1`. If `high = mid` is triggered, `high` remains `1`. You're stuck.

**Rule of Thumb**:
*   When using `mid = low + (high - low) / 2;` (rounds down), if you might set `low = mid`, always set `high = mid - 1` to ensure the range shrinks.
*   When using `mid = low + (high - low + 1) / 2;` (rounds up), if you might set `high = mid`, always set `low = mid + 1` to ensure the range shrinks.

Or, simplify by always using `mid = low + (high - low) / 2;` and adjust `low = mid + 1` and `high = mid - 1` for most exact/first/last occurrence searches. For binary search on an answer where `mid` itself could be the answer, and you keep narrowing, careful consideration of `low = mid` or `high = mid` and `mid` rounding is necessary.

By being mindful of these common issues, you can implement robust and correct binary search algorithms.

---