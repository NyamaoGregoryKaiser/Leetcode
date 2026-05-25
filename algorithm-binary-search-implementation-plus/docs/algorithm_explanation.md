# Binary Search: Detailed Explanation, Edge Cases, and Interview Tips

## What is Binary Search?

Binary Search is an efficient algorithm for finding an item from a **sorted** list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

**Core Idea**:
1.  Start with the entire sorted array.
2.  Look at the middle element.
3.  If the middle element is your target, you're done!
4.  If the target is smaller than the middle element, discard the right half of the array (and the middle element).
5.  If the target is larger than the middle element, discard the left half of the array (and the middle element).
6.  Repeat the process with the remaining half until the target is found or the search space is empty.

## Preconditions for Binary Search

The most crucial precondition for Binary Search is that the input array (or list) **must be sorted**. If the data is not sorted, Binary Search will not work correctly.

## Core Logic and Variables

The algorithm typically uses three pointers (or indices):
*   `low` (or `start`): Points to the beginning of the current search space.
*   `high` (or `end`): Points to the end of the current search space.
*   `mid`: The calculated middle point of `low` and `high`.

The loop continues as long as `low <= high`.

**Calculating `mid`**:
A common way to calculate `mid` is `(low + high) / 2`. However, for very large `low` and `high` values (e.g., close to `INT_MAX`), `low + high` could overflow.
A safer way to calculate `mid` to prevent integer overflow is:
`mid = low + (high - low) / 2;`

**Updating `low` and `high`**:
*   If `arr[mid] == target`: You found it! Return `mid`.
*   If `arr[mid] < target`: The target must be in the right half. Update `low = mid + 1`.
*   If `arr[mid] > target`: The target must be in the left half. Update `high = mid - 1`.

## Time and Space Complexity

*   **Time Complexity: O(log N)**
    Each step of binary search effectively halves the search space. This logarithmic reduction in search space makes it extremely fast for large inputs.
    Example: For N = 1 billion, `log2(10^9)` is approximately 30. So, it takes about 30 comparisons to find an element!

*   **Space Complexity: O(1) (Iterative) or O(log N) (Recursive)**
    *   **Iterative**: Uses a constant amount of extra space for `low`, `high`, `mid` variables. Hence, O(1).
    *   **Recursive**: The recursion stack can grow up to `log N` calls deep in the worst case. Hence, O(log N).

## Variations of Binary Search

Binary search isn't just for finding an exact match. It's a powerful technique for problems where you can discard half of the search space based on a condition.

1.  **Finding First/Last Occurrence (Lower Bound / Upper Bound)**
    *   Instead of stopping when `arr[mid] == target`, you save `mid` as a potential answer and continue searching in the appropriate half to find an *earlier* or *later* occurrence.
    *   **Lower Bound**: Search for the smallest index `i` such that `arr[i] >= target`. To find the first occurrence of `target`, search for lower bound and then verify if `arr[result] == target`.
        *   If `arr[mid] >= target`: `result = mid`, `high = mid - 1` (try to find an even smaller index).
        *   If `arr[mid] < target`: `low = mid + 1`.
    *   **Upper Bound**: Search for the smallest index `i` such that `arr[i] > target`. To find the last occurrence of `target`, find `upper_bound(target)` and decrement by 1.
        *   If `arr[mid] > target`: `result = mid`, `high = mid - 1` (try to find an even smaller index).
        *   If `arr[mid] <= target`: `low = mid + 1`.

2.  **Searching in a Rotated Sorted Array**
    *   The array is partially sorted. The trick is to identify which half (`[low...mid]` or `[mid...high]`) is sorted and then determine if the target lies within that sorted half.
    *   If `arr[low] <= arr[mid]`: Left half is sorted.
        *   If `target` is in `[arr[low], arr[mid])`: `high = mid - 1`.
        *   Else: `low = mid + 1`.
    *   If `arr[low] > arr[mid]`: Right half is sorted.
        *   If `target` is in `(arr[mid], arr[high]]`: `low = mid + 1`.
        *   Else: `high = mid - 1`.

3.  **Finding Minimum/Maximum in a Rotated Sorted Array**
    *   Similar to searching in rotated array, but the condition for narrowing the search space is based on finding the pivot point (the minimum element).
    *   If `arr[low] <= arr[high]`: The array is sorted (or not rotated), `arr[low]` is the minimum.
    *   Else, the minimum is in the unsorted part. The search continues until `low` points to the minimum.

4.  **Binary Search on the Answer (or Result)**
    *   This is for problems where you're not searching for an element *in* an array, but rather for an optimal *value* that satisfies a condition. The "answer" itself lies within a certain range, and you can apply binary search on this range.
    *   Example: `sqrt(x)`. The possible answers for `sqrt(x)` lie between 0 and `x` (or `x/2` for optimization). For a `mid` value, you check if `mid*mid == x`, `mid*mid < x`, or `mid*mid > x` to narrow the range for the actual square root. Other examples include finding a value that satisfies a monotonic property (e.g., minimum capacity to ship packages, largest value such that condition holds).

## Edge Cases and Gotchas

1.  **Empty Array**: Always check if the array is empty before starting the search. Return -1 or handle as specified.
2.  **Single Element Array**: Ensure your `low`, `high`, `mid` logic correctly handles arrays of size 1.
3.  **Target at Boundaries**: Test with target as the first or last element.
4.  **Target Not Found**: Ensure the loop terminates correctly and returns -1 (or appropriate value) when the target is not present.
5.  **Integer Overflow for `mid`**: As discussed, use `mid = low + (high - low) / 2;`
6.  **Infinite Loops**: This often happens if `low` and `high` are not updated correctly, leading to `low <= high` always being true for the same `mid`.
    *   If `arr[mid] < target`, `low` *must* become `mid + 1`.
    *   If `arr[mid] > target`, `high` *must* become `mid - 1`.
    *   The `low = mid` or `high = mid` updates are usually reserved for variations where `mid` itself could be part of the next search space (e.g., `lower_bound`, or when `low` and `high` can be adjacent). In such cases, carefully consider `mid = low + (high - low + 1) / 2;` and how `low`/`high` are updated. The `mid = low + (high-low)/2` with `low=mid+1` and `high=mid-1` is generally the safest for classic "find exact element".

7.  **Duplicates**: For problems like finding first/last occurrence, simply finding `target` at `mid` isn't enough; you need to adjust search space to find the *boundary* of occurrences.
8.  **Off-by-one errors**: These are common. Pay close attention to `low <= high` vs `low < high`, and `mid+1` vs `mid-1`.
    *   `while (low <= high)`: This allows `low == high`, meaning a single element is left to check. If that's `mid`, it's checked. This is typical for classic search.
    *   `while (low < high)`: This means `low` and `high` are always distinct. The loop will terminate when `low == high`, leaving one element. This form is often used in problems like finding minimum in rotated sorted array, where `low` eventually points to the answer. The update rules change: `high = mid` or `low = mid`.

## Interview Tips and Common Questions

1.  **Clarifying Questions**:
    *   Is the array sorted? (Crucial for binary search!)
    *   What should be returned if the target is not found? (e.g., -1, an exception, a boolean)
    *   Are there duplicates? If so, should I return the first, last, or any occurrence?
    *   What are the constraints on input size and element values? (e.g., can values be negative, can they overflow `int`?)
    *   What about empty arrays or single-element arrays?

2.  **Walkthrough an Example**:
    *   Always trace your logic with a small example array and a target, showing how `low`, `high`, and `mid` change. This helps you catch errors and demonstrates your thought process.

3.  **Time and Space Complexity**:
    *   Be prepared to explain why Binary Search is O(log N) time and O(1) (iterative) or O(log N) (recursive) space.

4.  **Variations**:
    *   The interviewer might start with classic binary search and then ask for a variation (first/last occurrence, rotated array, square root). Be familiar with these common patterns.
    *   If they ask a non-obvious binary search problem, try to identify if it has a "monotonic property" - can you discard half the search space based on a true/false check related to the "answer"?

5.  **Coding Style**:
    *   Use clear variable names (`low`, `high`, `mid`).
    *   Add comments for complex logic.
    *   Handle edge cases explicitly.

6.  **Testing**:
    *   Mentally or explicitly test with edge cases: empty, single element, target at start/end, target not present, duplicates.

## Visual Diagrams (See `binary_search_diagram.txt`)

Visualizing the `low`, `high`, and `mid` pointers moving through the array can be incredibly helpful for understanding and debugging binary search. The `binary_search_diagram.txt` file provides ASCII art examples for this.