```markdown
# Binary Search Algorithm Explained

Binary Search is an efficient, comparison-based search algorithm that works on **sorted arrays**. Its core idea is to repeatedly divide the search interval in half.

## 1. Core Principles

1.  **Sorted Data**: Binary search *requires* the input array to be sorted. If the array is not sorted, you must sort it first (which adds O(N log N) time complexity), or Binary Search cannot be applied.
2.  **Divide and Conquer**: The algorithm operates by repeatedly halving the portion of the list that could contain the target value.
3.  **Comparison**: It compares the target value with the middle element of the search interval.
    *   If the target matches the middle element, the search is successful.
    *   If the target is less than the middle element, the search continues in the lower half of the interval.
    *   If the target is greater than the middle element, the search continues in the upper half of the interval.
4.  **Termination**: The process continues until the target is found or the search interval becomes empty (meaning the target is not in the array).

## 2. Algorithm Steps (Standard Search for an Exact Value)

Let's say we have a sorted array `arr` and a `target` value to find.

1.  Initialize two pointers: `left = 0` (start of the array) and `right = arr.length - 1` (end of the array).
2.  While `left <= right`: (This condition means the search space `[left, right]` is valid and potentially contains the target)
    a.  Calculate the middle index: `mid = floor((left + right) / 2)`.
    b.  Compare `arr[mid]` with `target`:
        *   If `arr[mid] === target`, we found the target. Return `mid`.
        *   If `arr[mid] < target`, the target must be in the right half. Update `left = mid + 1`.
        *   If `arr[mid] > target`, the target must be in the left half. Update `right = mid - 1`.
3.  If the loop finishes (i.e., `left > right`), it means the target was not found. Return -1.

## 3. Visual Diagram (ASCII Art)

Let's search for `target = 6` in `arr = [1, 3, 5, 6, 7, 9, 11]`.

```
Array:   [1, 3, 5, 6, 7, 9, 11]
Indices:  0  1  2  3  4  5  6

Iteration 1:
  left = 0, right = 6
  mid = floor((0 + 6) / 2) = 3
  arr[mid] = arr[3] = 6

  Target (6) === arr[mid] (6). Found! Return mid = 3.
```

Another example: Search for `target = 4` in `arr = [1, 3, 5, 7, 9]`.

```
Array:   [1, 3, 5, 7, 9]
Indices:  0  1  2  3  4

Iteration 1:
  left = 0, right = 4
  mid = floor((0 + 4) / 2) = 2
  arr[mid] = arr[2] = 5

  Target (4) < arr[mid] (5). Target is in the left half.
  right = mid - 1 = 2 - 1 = 1

Iteration 2:
  left = 0, right = 1
  mid = floor((0 + 1) / 2) = 0
  arr[mid] = arr[0] = 1

  Target (4) > arr[mid] (1). Target is in the right half.
  left = mid + 1 = 0 + 1 = 1

Iteration 3:
  left = 1, right = 1
  mid = floor((1 + 1) / 2) = 1
  arr[mid] = arr[1] = 3

  Target (4) > arr[mid] (3). Target is in the right half.
  left = mid + 1 = 1 + 1 = 2

Iteration 4:
  left = 2, right = 1
  Condition `left <= right` (2 <= 1) is FALSE. Loop terminates.

Target not found. Return -1.
```

## 4. Time and Space Complexity

*   **Time Complexity: O(log N)**
    Each step of the algorithm halves the search space. This logarithmic reduction in search space leads to O(log N) time complexity, where N is the number of elements in the array. This is significantly faster than linear search (O(N)) for large arrays.
*   **Space Complexity: O(1)** (Iterative) or **O(log N)** (Recursive)
    *   **Iterative**: Binary search uses a constant amount of extra space for pointers (`left`, `right`, `mid`), hence O(1) space complexity.
    *   **Recursive**: A recursive implementation consumes stack space for function calls. In the worst case, the recursion depth is O(log N), so it has O(log N) space complexity.

## 5. Important Considerations and Variations

### a. Calculating `mid`

A common subtle bug arises from `mid = floor((left + right) / 2)`. If `left` and `right` are very large integers (e.g., close to `MAX_INT`), `left + right` could overflow.
A safer way to calculate `mid` is:
`mid = left + floor((right - left) / 2)`

This prevents overflow and works identically. It's good practice in languages where integer overflow is a concern (e.g., C++, Java, but less critical in JavaScript where numbers are floats).

### b. Loop Termination Conditions (`left <= right` vs `left < right`)

The choice of `left <= right` vs `left < right` for the `while` loop, and how `left` and `right` are updated (`mid` vs `mid +/- 1`), dictates the search space and influences whether `mid` itself is included or excluded in the next iteration.

*   **`while (left <= right)`**:
    *   Search space `[left, right]` (inclusive).
    *   If `arr[mid] === target`, return `mid`.
    *   If `arr[mid] < target`, `left = mid + 1`. (Exclude `mid` as it's too small).
    *   If `arr[mid] > target`, `right = mid - 1`. (Exclude `mid` as it's too large).
    *   When the loop terminates, `left > right`. This means the search space is invalid. The target is not found (or `left` points to the insertion point).
    *   This is the most common pattern for finding an *exact value*.

*   **`while (left < right)`**:
    *   Search space `[left, right)` (left inclusive, right exclusive).
    *   `mid = left + floor((right - left) / 2)` (or `ceil` if biased right for two-element arrays).
    *   Updates often involve `left = mid` or `right = mid`.
    *   The loop terminates when `left === right`. At this point, `left` (or `right`) is often the answer.
    *   This pattern is useful for finding boundaries, insertion points, or minimizing/maximizing a value where `mid` might *be* the potential answer. It requires careful handling of `mid` calculation and `left/right` updates to avoid infinite loops and correctly converge.

### c. Common Problem Patterns Solvable with Binary Search

Beyond finding an exact value, Binary Search is incredibly versatile:

1.  **Finding First/Last Occurrence of an Element**: When duplicates exist.
2.  **Finding an Element in a Rotated Sorted Array**: A trickier variation where the array is sorted but "broken" at a pivot.
3.  **Finding a Peak Element**: In an array where elements increase and then decrease.
4.  **Finding the Square Root of a Number**: Binary search on the *answer space* (i.e., what could the square root be?).
5.  **Finding an Element in a Sorted Matrix**: Applying binary search row-wise or on the entire flattened matrix conceptualization.
6.  **Minimizing/Maximizing a Value that Satisfies a Condition**: If a property is monotonic (e.g., `P(x)` is true for `x >= K` and false for `x < K`), binary search can find `K`. This is often called "Binary Search on the Answer".
7.  **Finding `k`-th Smallest/Largest Element**: In scenarios like sorted matrices, two sorted arrays, etc.

Understanding these variations is key to mastering Binary Search for interviews. The problems in this project cover some of these common patterns.
```