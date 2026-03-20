# Binary Search: Interview Tips and Variations

Binary Search is a foundational algorithm frequently tested in coding interviews. Beyond the basic implementation, interviewers look for your ability to adapt it to various scenarios, handle edge cases, and reason about its properties.

## When to Consider Binary Search

Look for these clues in a problem statement:

1.  **Sorted Data**: The most obvious hint. If the input array/list is sorted, binary search is almost always applicable for searching or finding boundaries.
2.  **"Find the first/last/smallest/largest..."**: These phrases often indicate that you need to find a specific boundary or an extreme value, which can be done efficiently with binary search.
3.  **Monotonic Property**: If you can define a `check(value)` function that returns `true` or `false`, and this function has a monotonic property (i.e., if `check(x)` is true, then `check(x+1)` is also true, or vice versa), then you can binary search on the *answer itself*. This is often called "Binary Search on the Answer."
    *   Example: "Find the minimum `X` such that `P(X)` is true." If `P(X)` is true, then `P(X+1)` must also be true. The search space for `X` becomes `[min_possible_X, max_possible_X]`.
4.  **Optimizing a Linear Search**: If a brute-force solution is `O(N)` and involves iterating through a sorted structure or a monotonic property, Binary Search might upgrade it to `O(log N)`.

## Interview Preparation Strategy

1.  **Master the Core**: Be able to write the standard iterative binary search from memory quickly and flawlessly.
2.  **Understand the Templates**: Know how to modify the core logic to find the first occurrence, last occurrence, or smallest element greater than/equal to the target.
3.  **Practice Variations**: Work through problems like "Search in Rotated Sorted Array," "Peak Element," and "First Bad Version" to understand common adaptations.
4.  **"Binary Search on the Answer"**: Practice problems that require binary searching on the *result* rather than directly on an array. Examples: finding square root, splitting array into K subarrays with minimum largest sum, minimum time to complete tasks.
5.  **Edge Cases**: Always consider empty arrays, single-element arrays, targets at boundaries, and targets not present.
6.  **Time & Space Complexity**: Be ready to state and justify the `O(log N)` time and `O(1)` (iterative) or `O(log N)` (recursive) space complexities.
7.  **Verbalize Your Thought Process**: Explain your approach, how binary search applies, how `low`/`high` are updated, and why your solution is correct.

## Common Follow-up Questions and Variations

### 1. Duplicates

*   **Question**: How would you find the *count* of occurrences of a target in a sorted array with duplicates?
*   **Approach**: Find the first occurrence (using binary search template 2), then find the last occurrence (using binary search template 3). The count is `last_idx - first_idx + 1`. If either returns -1, the count is 0.

### 2. Search in Rotated Sorted Array (already covered in problems)

*   **Key**: Identify which half of the array is sorted, and use that to decide which way to adjust `low` or `high`.

### 3. Binary Search in 2D Arrays (Sorted Matrix)

*   **Question**: Given an `m x n` matrix with integers, where each row is sorted, and the first integer of each row is greater than the last integer of the previous row. Search for a target.
*   **Approach 1 (Two Binary Searches)**:
    1.  Binary search on the rows to find the correct row where the target *could* exist (by comparing `target` with the first and last elements of each row).
    2.  Once the row is identified, binary search within that row.
*   **Approach 2 (Treat as 1D Array)**: Flatten the 2D matrix conceptually into a 1D array of size `m*n`. Map a 1D index `k` to 2D coordinates `(row = k / n, col = k % n)`. Then perform a single binary search.

### 4. Search in an "Infinite" Sorted Array

*   **Question**: Given an API `getElement(index)` that returns the element at `index` (or an error if `index` is out of bounds), find a target in a sorted array of unknown, potentially infinite, size.
*   **Approach**: You can't just use `arr.length - 1` for `high`.
    1.  **Find the bounds**: Start with a small range, e.g., `low = 0`, `high = 1`.
    2.  While `getElement(high)` is less than `target`:
        *   `low = high`
        *   `high = high * 2` (exponentially increase `high` to quickly find a range that *might* contain the target).
    3.  Once `getElement(high)` is `>= target`, you now have a finite search space `[low, high]` on which to perform a standard binary search.

### 5. Find K-th Smallest Element

*   **Question**: In a sorted matrix, or two sorted arrays, find the K-th smallest element.
*   **Approach**: Often "Binary Search on the Answer". The answer (K-th smallest element) will be within a range `[min_possible_value, max_possible_value]`.
    *   Define a `countLessOrEqualTo(value)` function which efficiently counts how many elements in the data structure are less than or equal to `value`.
    *   Perform binary search on `value`. If `countLessOrEqualTo(mid)` is `>= k`, it means `mid` *could* be the k-th smallest (or something smaller is). If `countLessOrEqualTo(mid)` is `< k`, then `mid` is too small, and we need to search higher.

### 6. Smallest Element Greater Than Target

*   **Question**: In a sorted array, find the smallest element that is strictly greater than the target.
*   **Approach**: This is a classic "lower bound" type problem.
    1.  Initialize `ans = -1` (or `Infinity`).
    2.  Use a `while (low <= high)` loop.
    3.  If `arr[mid] > target`: This `arr[mid]` is a candidate. Store `mid` (or `arr[mid]`) in `ans` and try to find an even smaller one by setting `high = mid - 1`.
    4.  If `arr[mid] <= target`: `mid` is too small (or equal), so search higher: `low = mid + 1`.
    5.  Return `ans`.

### 7. Binary Search for Floating Point Numbers

*   **Question**: Find the square root of `x` up to `N` decimal places.
*   **Approach**: The search space is continuous, not discrete indices.
    1.  Define a range `[low, high]` (e.g., `[0, x]` or `[0, 1]` if `x < 1`).
    2.  Instead of `while (low <= high)`, use `while (high - low > epsilon)` (where `epsilon` is a small value like `1e-7` for precision). Or, loop a fixed number of iterations (e.g., 100 times for sufficient precision).
    3.  Adjust `low = mid` or `high = mid` (not `mid+1`/`mid-1` because `mid` itself could be the answer, and we're dealing with continuous values).

Mastering these variations demonstrates a deep understanding of Binary Search and its versatility, making you well-prepared for any related interview question.