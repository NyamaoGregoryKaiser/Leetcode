# Binary Search: A Comprehensive Guide for Interviews

## Introduction to Binary Search

Binary Search is an efficient algorithm for finding an element from a **sorted** list of elements. It works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, the algorithm narrows the interval to the lower half. Otherwise, it narrows it to the upper half. This process continues until the value is found or the interval is empty.

**Key Prerequisite:** The data must be sorted. Binary Search cannot be applied to unsorted data.

**Time Complexity:** O(log N)
**Space Complexity:** O(1) for iterative, O(log N) for recursive (due to call stack)

## Core Logic and Invariants

The heart of binary search lies in managing three pointers: `low`, `high`, and `mid`.

*   `low`: The starting index of the current search space.
*   `high`: The ending index of the current search space.
*   `mid`: The middle index, calculated as `low + (high - low) / 2`. This calculation prevents potential integer overflow compared to `(low + high) / 2` when `low` and `high` are very large.

The search continues as long as `low <= high` (inclusive range) or `low < high` (exclusive range for certain problems, often `upper_bound` variants).

**General Template (Iterative):**

```cpp
int binarySearch(const std::vector<int>& nums, int target) {
    int low = 0;
    int high = nums.size() - 1;

    while (low <= high) { // Important: <= means search space is [low, high] inclusive
        int mid = low + (high - low) / 2; // Prevent overflow

        if (nums[mid] == target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            low = mid + 1; // Target is in the right half
        } else { // nums[mid] > target
            high = mid - 1; // Target is in the left half
        }
    }
    return -1; // Target not found
}
```

## Common Pitfalls and Gotchas

1.  **Integer Overflow for `mid`:** As mentioned, `mid = low + (high - low) / 2` is safer than `mid = (low + high) / 2` when `low` and `high` can be very large.
2.  **Off-by-One Errors:**
    *   **Loop Condition:** `while (low <= high)` is common when `high` represents an inclusive boundary. If `high` is an exclusive boundary (e.g., `nums.size()`), then `while (low < high)` might be used. Be consistent.
    *   **Pointer Updates:** `low = mid + 1` and `high = mid - 1` are crucial. If you use `low = mid` or `high = mid` incorrectly, you might enter an infinite loop (e.g., if `mid` never changes because `low` and `high` converge to `mid`).
3.  **Boundary Conditions:** Consider empty arrays, single-element arrays, target at the beginning/end, target not present.
4.  **Duplicates:** Standard binary search returns *any* index of the target. For first/last occurrence, modifications are needed.

## Variations of Binary Search

Binary search is incredibly versatile. Here are some common patterns beyond finding an exact match:

### 1. Finding First/Last Occurrence

When duplicates are present, you might need to find the *first* or *last* index of the target.

*   **Finding First Occurrence:**
    *   When `nums[mid] == target`, store `mid` as a potential answer and try to find an even earlier occurrence by setting `high = mid - 1`.
*   **Finding Last Occurrence:**
    *   When `nums[mid] == target`, store `mid` as a potential answer and try to find an even later occurrence by setting `low = mid + 1`.

This requires a `result` variable initialized to -1, which gets updated whenever `target` is found.

### 2. `lower_bound` and `upper_bound` (STL-like behavior)

These are common operations, often implemented using binary search:

*   **`lower_bound(target)`:** Returns an iterator/index to the first element that is **not less than** `target` (i.e., greater than or equal to `target`).
*   **`upper_bound(target)`:** Returns an iterator/index to the first element that is **greater than** `target`.

These are effectively finding the first occurrence of `target` or the first element *after* all occurrences of `target`. They use slightly different `while` loop conditions and pointer updates (e.g., `high = mid` instead of `high = mid - 1` for `lower_bound` to ensure `mid` itself is considered as a potential answer).

### 3. Binary Search on the Answer Space

This is an advanced but very powerful application. Instead of searching for an element within the input array, you binary search for the *value of the answer itself*.

**How it works:**
1.  **Identify the search space for the answer:** Determine the minimum possible value (`min_ans`) and maximum possible value (`max_ans`) for the answer.
2.  **Define a `check(value)` function:** This function takes a candidate `value` from your answer space and returns `true` if `value` satisfies some condition (e.g., `value` is a valid answer, or `value` is "too large/small" and we need to try smaller/larger values). This function typically runs in O(N) or O(N log N) time.
3.  **Binary Search on `[min_ans, max_ans]`:**
    *   If `check(mid)` is true, it means `mid` *could* be the answer (or a possible answer that's too large, if we're looking for the smallest), so we might store `mid` as a potential answer and try smaller values by setting `high = mid - 1`.
    *   If `check(mid)` is false, `mid` is too small (or invalid), so we need a larger value by setting `low = mid + 1`.

**Example Problems:**
*   Smallest Divisor Given a Threshold (as implemented in this project)
*   Kth Smallest Element in a Sorted Matrix
*   Capacity to Ship Packages Within D Days
*   Minimize Max Value (e.g., "Split Array Largest Sum")

## Interview Tips and Strategies

1.  **Verify Sorted Input:** Always confirm with the interviewer if the input is guaranteed to be sorted. If not, sorting might be the first step (adding O(N log N) to complexity).
2.  **Draw Diagrams:** For complex variations (rotated arrays, finding peaks), draw out the array and pointer movements. This helps visualize the logic and avoid errors.
3.  **Handle Edge Cases First:**
    *   Empty array (`nums.size() == 0`).
    *   Single-element array (`nums.size() == 1`).
    *   Target at the very beginning or end.
    *   Target not present in the array.
4.  **Be Clear About Inclusivity:** Decide if your `high` pointer is inclusive or exclusive and stick to it consistently (`low <= high` vs `low < high`).
5.  **Test Midpoint Calculation:** Always use `mid = low + (high - low) / 2`.
6.  **Analyze Time/Space:** Be ready to explain why binary search is O(log N) time and typically O(1) space (iterative).
7.  **Consider `std::lower_bound` and `std::upper_bound`:** Mention that C++ STL provides these functions, but be prepared to implement them from scratch.
8.  **Understand "Binary Search on Answer":** This is a critical pattern. If a problem asks for "minimum X such that condition Y is met" or "maximum Z such that condition W is met," and you can define a monotonic `check` function, consider binary search on the answer.

## Conclusion

Binary search is more than just a simple lookup algorithm; it's a powerful technique with numerous applications in various forms. Mastering its variations and understanding the core principles will significantly boost your performance in coding interviews. Practice with different problems, especially those involving `lower_bound`, `upper_bound`, and binary search on the answer space.

---