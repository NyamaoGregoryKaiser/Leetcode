# Understanding Binary Search

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## Prerequisites

Binary Search requires the following conditions to be met for effective application:

1.  **Sorted Data:** The most crucial requirement is that the collection of items (usually an array or list) must be sorted in either ascending or descending order. If the data is not sorted, binary search will not work correctly.
2.  **Random Access:** The data structure must allow for efficient random access to its elements (e.g., `O(1)` access time by index). Arrays are ideal for this, while linked lists are not suitable for standard binary search due to their `O(N)` access time for the middle element.

## How it Works (The Core Idea)

Imagine you're looking for a word in a dictionary. You wouldn't start from the first page and scan page by page. Instead, you'd open to roughly the middle, check if your word comes before or after the words on that page, and then repeat the process on the relevant half. Binary Search works similarly:

1.  **Define Search Space:** Start with the entire sorted array as your search space, defined by `left` (starting index) and `right` (ending index).
2.  **Find Middle Element:** Calculate the middle index `mid = left + (right - left) // 2`.
3.  **Compare:**
    *   If `nums[mid]` is equal to the `target`, you've found it! Return `mid`.
    *   If `nums[mid]` is less than the `target`, it means the `target` (if it exists) must be in the right half of the array. So, you update `left = mid + 1`.
    *   If `nums[mid]` is greater than the `target`, it means the `target` (if it exists) must be in the left half of the array. So, you update `right = mid - 1`.
4.  **Repeat:** Continue steps 2-3 until `left > right`. If the loop terminates and the target hasn't been found, it means the target is not in the array.

## Time and Space Complexity

*   **Time Complexity: O(log N)**
    *   In each step of binary search, the search space is effectively halved.
    *   For an array of `N` elements, the number of comparisons required in the worst case is proportional to `log2(N)`.
    *   This makes binary search significantly faster than linear search (O(N)) for large datasets.
*   **Space Complexity: O(1)** (for iterative implementation)
    *   The algorithm only requires a few variables to store the `left`, `right`, and `mid` pointers, regardless of the input size. This is constant space.
    *   A recursive implementation might use `O(log N)` space due to the function call stack.

## Why `mid = left + (right - left) // 2`?

A common way to calculate the middle index is `(left + right) // 2`. While this works for most cases, if `left` and `right` are very large integers (close to the maximum value an integer type can hold, e.g., `INT_MAX` in C++/Java), their sum `left + right` could potentially exceed the maximum integer value and cause an **integer overflow**.

The expression `left + (right - left) // 2` is mathematically equivalent but avoids this overflow by first calculating the difference (`right - left`), which will always be less than or equal to `right` (and thus within reasonable bounds), then dividing it by 2, and finally adding it to `left`. This ensures that `left + (right - left) // 2` will always be less than or equal to `right`, preventing overflow. In Python, which handles arbitrary-precision integers, this is less of a concern, but it's a good practice to be aware of from a general algorithm design perspective.

## Applications and Variations

Binary search is not just for finding elements in sorted arrays. It's a powerful technique for searching a "monotonic" function or property. If a property is `True` for `x < k` and `False` for `x >= k` (or vice-versa), you can often use binary search to find `k`.

Common variations and applications include:

*   Finding the first or last occurrence of an element in an array with duplicates.
*   Finding the smallest element greater than a target (or largest element less than a target).
*   Searching in rotated sorted arrays.
*   Finding a peak element.
*   Finding the square root of a number (like `sqrt(x)`).
*   Solving problems where the answer itself is in a monotonic range (e.g., finding the minimum speed to eat bananas, minimum time to complete tasks).
*   "Binary search on the answer" problems.

Understanding the core binary search template and how to adjust `left` and `right` pointers based on the problem's specific conditions is key to mastering this algorithm.