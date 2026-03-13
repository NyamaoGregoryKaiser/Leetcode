# Binary Search: A Deep Dive

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the potential locations to just one.

## 1. Prerequisites

The most crucial prerequisite for Binary Search is that the input data structure **must be sorted**. If the array or list is not sorted, Binary Search cannot be applied directly.

## 2. Core Logic

The core idea of Binary Search relies on maintaining a search space defined by two pointers: `low` and `high`.

1.  **Initialization**:
    *   `low` points to the first element (index 0).
    *   `high` points to the last element (index `length - 1`).

2.  **Iteration**: The search continues as long as `low <= high`. This condition ensures that the search space `[low, high]` is valid (it can contain at least one element or be empty).

3.  **Midpoint Calculation**: In each iteration, calculate the middle index:
    `mid = low + (high - low) / 2;`
    This calculation is preferred over `mid = (low + high) / 2` to prevent potential integer overflow when `low` and `high` are very large (though `(low+high)/2` is fine in Java if `low` and `high` are indices of arrays up to `Integer.MAX_VALUE`).

4.  **Comparison and Adjustment**:
    *   If `arr[mid] == target`: The target is found at `mid`. Return `mid`.
    *   If `arr[mid] < target`: The target, if it exists, must be in the right half of the current search space. Update `low = mid + 1`.
    *   If `arr[mid] > target`: The target, if it exists, must be in the left half of the current search space. Update `high = mid - 1`.

5.  **Termination**:
    *   If the target is found, the function returns its index.
    *   If the loop finishes (`low > high`), it means the target was not found in the array. Return -1 (or throw an exception, depending on requirements).

## 3. Visual Diagram (Standard Binary Search)

Let's trace a search for `target = 7` in `arr = [1, 3, 5, 7, 9, 11]`.

```
Array:   [1, 3, 5, 7, 9, 11]
Indices:  0  1  2  3  4   5

Initial:
low = 0, high = 5
Target = 7

Iteration 1:
mid = 0 + (5-0)/2 = 2
arr[mid] = arr[2] = 5

5 < 7, so target is in the right half.
Update low = mid + 1 = 2 + 1 = 3.

Search Space:
         [1, 3, 5, 7, 9, 11]
low --------->^   ^<--------- high
                mid

Iteration 2:
low = 3, high = 5
mid = 3 + (5-3)/2 = 4
arr[mid] = arr[4] = 9

9 > 7, so target is in the left half.
Update high = mid - 1 = 4 - 1 = 3.

Search Space:
         [1, 3, 5, 7, 9, 11]
         ^ low, high ^
             mid

Iteration 3:
low = 3, high = 3
mid = 3 + (3-3)/2 = 3
arr[mid] = arr[3] = 7

7 == 7. Target found! Return mid = 3.
```

## 4. Time and Space Complexity

*   **Time Complexity: O(log N)**
    Binary Search halves the search space in each step. For an array of `N` elements, it takes `log2(N)` steps in the worst case.
*   **Space Complexity: O(1)**
    Binary Search uses a constant amount of extra space for `low`, `high`, and `mid` variables, regardless of the input array size. Recursive implementations might use `O(log N)` stack space.

## 5. Common Variations

Binary Search is a versatile algorithm that can be adapted to solve a wide range of problems beyond simple element finding. The core idea remains the same: identify a monotonic property in the search space and repeatedly narrow down the range.

### a. Finding First/Last Occurrence (with duplicates)

When duplicates are present and you need the *first* or *last* index:

*   **When `arr[mid] == target`:**
    *   For **first occurrence**: Record `mid` as a potential answer, then try to find an earlier occurrence by searching in the left half: `high = mid - 1`.
    *   For **last occurrence**: Record `mid` as a potential answer, then try to find a later occurrence by searching in the right half: `low = mid + 1`.

### b. Search in Rotated Sorted Array

This variation requires identifying which part of the array (`[low, mid]` or `[mid, high]`) is sorted and then checking if the target lies within that sorted range.

```
Example: arr = [4, 5, 6, 7, 0, 1, 2], target = 0

Initial: low=0, high=6
mid = 3, arr[mid]=7

nums[low] (4) <= nums[mid] (7)  -> Left half [4,5,6,7] is sorted.
Is target (0) in [4,7]? No.
So, target must be in the right (unsorted) half.
low = mid + 1 = 4.

Next: low=4, high=6
mid = 4 + (6-4)/2 = 5
arr[mid] = 1

nums[low] (0) > nums[mid] (1) -> This means the pivot is in the left part of current range [low, mid].
                                 So the right half [1,2] is sorted.
Is target (0) in [1,2]? No.
So, target must be in the left (unsorted) half.
high = mid - 1 = 4.

Next: low=4, high=4
mid = 4 + (4-4)/2 = 4
arr[mid] = 0

arr[mid] == target (0). Return mid = 4.
```

### c. Predicate-Based Binary Search

Many problems don't involve searching for an *element* directly but for a property that changes monotonically. You define a boolean `predicate(value)` function (e.g., "can we make `k` groups if each group has at least `value` items?").
The goal is often to find the "minimum `value` for which `predicate(value)` is true" or "maximum `value` for which `predicate(value)` is true".

The search space then becomes the possible range of answers (e.g., `[0, MaxPossibleValue]`), not the input array indices.

Examples:
*   Finding square root (`mySqrt(x)`): Search for `y` such that `y*y <= x`.
*   Finding minimum/maximum capacity/speed/time to satisfy a condition.
*   Cutting a stick to get `k` pieces of at least length `L`.

---