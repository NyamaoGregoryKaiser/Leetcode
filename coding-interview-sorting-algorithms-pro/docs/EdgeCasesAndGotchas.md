```markdown
# Edge Cases and Gotchas in Sorting Algorithms

Understanding edge cases and potential pitfalls is crucial for robust algorithm design and for demonstrating thoroughness in an interview.

## 1. Common Edge Cases for Sorting Algorithms

When designing or testing a sorting algorithm, always consider these input scenarios:

*   **Empty Array**: `[]`
    *   Expected behavior: The algorithm should handle this gracefully (e.g., do nothing, return an empty array). Should not throw `NullPointerException` or `ArrayIndexOutOfBoundsException`.
*   **Single-Element Array**: `[5]`
    *   Expected behavior: Already sorted. The algorithm should do nothing or return the array as is.
*   **Two-Element Array**: `[5, 1]` or `[1, 5]`
    *   This is the smallest case that truly requires a swap or comparison. Helps verify base logic.
*   **Already Sorted Array**: `[1, 2, 3, 4, 5]`
    *   Best-case for some algorithms (e.g., Insertion Sort, optimized Quick Sort with good pivot).
    *   Worst-case for others (e.g., naive Quick Sort with first/last element as pivot).
*   **Reverse Sorted Array**: `[5, 4, 3, 2, 1]`
    *   Worst-case for Insertion Sort and some Quick Sort implementations.
    *   Average-case for Merge Sort and Heap Sort.
*   **Array with All Same Elements**: `[7, 7, 7, 7, 7]`
    *   Tests handling of equal elements. Stability might be relevant here.
*   **Array with Duplicates**: `[3, 1, 4, 1, 5, 9, 2, 6]`
    *   Tests handling of equal elements. Stability is important if relative order of duplicates matters.
*   **Array with Negative Numbers**: `[-5, -1, -10, 0]`
    *   Ensures comparison logic works correctly with negative values.
*   **Array with Large Numbers**: `[Integer.MAX_VALUE, ..., Integer.MIN_VALUE]`
    *   Tests potential for integer overflow if sums or intermediate products are calculated (less common for basic sorting, but relevant for other algorithms).
*   **Array with Zero**: `[0, 5, -2, 1]`
    *   Simple, but good to include.
*   **Array with Many Unique Elements / Few Unique Elements**:
    *   Tests performance on diverse data distributions.

## 2. Gotchas and Pitfalls

### General Sorting Algorithm Pitfalls:

1.  **Off-by-one Errors**:
    *   Common in loop bounds (`< length` vs. `<= length-1`).
    *   Recursive function `low`, `high`, `mid` calculations (`mid = low + (high - low) / 2` is safer than `(low + high) / 2` to prevent overflow, though unlikely for array indices).
    *   Array copying (`System.arraycopy`, `Arrays.copyOfRange`).

2.  **Incorrect Swapping Logic**:
    *   Forgetting to handle `i == j` case (though `ArrayUtils.swap` covers this).
    *   Swapping with a temporary variable incorrectly.

3.  **Auxiliary Space Management**:
    *   Merge Sort: Forgetting to create or manage the temporary array correctly.
    *   In-place algorithms (Quick Sort, Heap Sort, Dutch National Flag): Accidentally using extra space, or needing to justify O(log N) stack space for recursion.

4.  **Base Cases for Recursion**:
    *   For `low >= high` (empty or single-element subarray) in recursive sorts. If not handled, leads to infinite recursion or incorrect behavior.

### Algorithm-Specific Gotchas:

#### Quick Sort:

*   **Pivot Selection**:
    *   **Worst-Case `O(N^2)`**: Choosing the first or last element as pivot in an already sorted or reverse-sorted array. Random pivot, median-of-three, or Hoare's partition help mitigate this.
    *   Lomuto partition vs. Hoare's partition. Lomuto can be easier to implement but may perform more swaps. Hoare's is generally more efficient.
*   **Handling Duplicates**: Naive partitioning can sometimes lead to unbalanced partitions if all elements are identical, especially with Lomuto. This can still lead to `O(N^2)` for specific inputs, though Java's `Arrays.sort` (Dual-Pivot Quicksort) handles this well.

#### Merge Sort:

*   **Space Complexity**: It inherently uses O(N) auxiliary space. If the problem has strict O(1) space constraints, Merge Sort is not suitable.
*   **In-place Merge**: While possible (e.g., using block swaps), it's significantly more complex and often negates performance benefits. Standard implementations use O(N) space.

#### Heap Sort:

*   **0-based vs 1-based Indexing**: Heap operations (parent, left child, right child) are often described with 1-based indexing. When implementing with 0-based arrays, formulas are:
    *   Parent of `i`: `(i - 1) / 2`
    *   Left child of `i`: `2 * i + 1`
    *   Right child of `i`: `2 * i + 2`
    *   Miscalculating these indices is a common error.
*   **Correct `heapify` Bounds**: The `n` parameter (heap size) in `heapify` must be carefully managed as the heap shrinks during the sorting phase.

#### QuickSelect:

*   **Randomized Pivot**: Crucial for achieving average O(N). Without it, worst-case O(N^2) is easily hit.
*   **Correct Target Index**: The `k`-th largest is `(N - k)`-th smallest (0-indexed). It's easy to get `k` vs `N-k` mixed up, especially with 1-based vs 0-based `k`.

#### Dutch National Flag Algorithm (`Sort Colors`):

*   **`mid` Increment after `swap(mid, high)`**: When `nums[mid]` is `2`, you swap `nums[mid]` with `nums[high]` and decrement `high`. **DO NOT** increment `mid`. The new element at `nums[mid]` (which came from `high`) could be `0`, `1`, or `2` and needs to be re-evaluated. If you increment `mid`, you might skip processing a `0` or `1` that landed in the middle.
*   **Pointers Crossing**: The `while (mid <= high)` condition is vital. If `mid` passes `high`, the processing is complete.

## 3. General Interviewer Expectations

*   **Handle Null/Empty Inputs**: Always check for `null` or empty arrays at the beginning of your function.
*   **Understand Time/Space Complexity**: Be able to analyze and articulate the complexities for best, average, and worst cases.
*   **Discuss Stability**: Know if your algorithm is stable or unstable and what that means.
*   **In-Place vs. Out-of-Place**: Understand the memory implications.
*   **Justify Choices**: If there are multiple ways to solve a problem (e.g., QuickSelect vs. Min-Heap for Kth Largest), be ready to discuss trade-offs (e.g., average vs. worst-case time, space).
*   **Modular Code**: Use helper functions (like `swap`) to keep the main logic clean.
*   **Clear Comments**: Explain complex parts of your code.
*   **Test Cases**: Mentally walk through a few small examples, including edge cases, to demonstrate your understanding.
```