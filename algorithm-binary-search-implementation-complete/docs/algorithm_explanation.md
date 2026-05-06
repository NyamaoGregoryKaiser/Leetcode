# Binary Search: A Deep Dive

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## 1. Prerequisites

The absolute prerequisite for Binary Search is that the data structure (usually an array or list) must be **sorted**. If the data is not sorted, Binary Search will not work correctly.

## 2. The Core Logic

The algorithm maintains a search space within the sorted array, defined by two pointers: `low` and `high`.
1.  Initialize `low` to the first index (0) and `high` to the last index (`len(arr) - 1`).
2.  While `low <= high` (meaning the search space is still valid and not empty):
    a.  Calculate the `mid` index: `mid = low + (high - low) // 2`. This calculation prevents potential integer overflow compared to `(low + high) // 2` when `low` and `high` are very large (though less critical in Python).
    b.  Compare the element at `arr[mid]` with the `target`:
        *   If `arr[mid] == target`, the target is found. Return `mid`.
        *   If `arr[mid] < target`, the target must be in the right half of the current search space. Update `low = mid + 1`.
        *   If `arr[mid] > target`, the target must be in the left half of the current search space. Update `high = mid - 1`.
3.  If the loop finishes and the target hasn't been found, it means `low > high`, and the search space has become empty. Return -1 (or an appropriate indicator for "not found").

### Visual Diagram (Standard Search)

Let's search for `target = 6` in `arr = [1, 3, 5, 6, 7, 9, 10]`

```
arr:   [1, 3, 5, 6, 7, 9, 10]
Indices: 0  1  2  3  4  5   6

Iteration 1:
low = 0, high = 6
mid = 0 + (6 - 0) // 2 = 3
arr[mid] = arr[3] = 6
target == arr[mid]. Found! Return 3.
```

Let's search for `target = 4` in `arr = [1, 3, 5, 7, 9]`

```
arr:   [1, 3, 5, 7, 9]
Indices: 0  1  2  3  4

Iteration 1:
low = 0, high = 4
mid = 0 + (4 - 0) // 2 = 2
arr[mid] = arr[2] = 5
target (4) < arr[mid] (5). Target must be in left half.
high = mid - 1 = 1

Iteration 2:
low = 0, high = 1
mid = 0 + (1 - 0) // 2 = 0
arr[mid] = arr[0] = 1
target (4) > arr[mid] (1). Target must be in right half.
low = mid + 1 = 1

Iteration 3:
low = 1, high = 1
mid = 1 + (1 - 1) // 2 = 1
arr[mid] = arr[1] = 3
target (4) > arr[mid] (3). Target must be in right half.
low = mid + 1 = 2

Iteration 4:
low = 2, high = 1
low > high. Loop terminates. Target not found. Return -1.
```

## 3. Time and Space Complexity

*   **Time Complexity: O(log N)**
    *   In each step, the search space is halved. For an array of N elements, it takes `log_2(N)` steps to narrow down the search to a single element. This is incredibly efficient, especially for large arrays.
*   **Space Complexity: O(1)** (for iterative version) or **O(log N)** (for recursive version)
    *   The iterative version uses a constant amount of extra space for `low`, `high`, `mid` variables.
    *   The recursive version uses space on the call stack, which can grow up to `log N` in depth in the worst case.

## 4. Iterative vs. Recursive

*   **Iterative:** Generally preferred in production code due to lower memory overhead (O(1) space) and avoidance of recursion depth limits.
*   **Recursive:** Can be more concise or elegant for some problems, but comes with O(log N) space complexity and potential for stack overflow on very large inputs (though less likely in Python than C++ or Java for typical array sizes).

## 5. Common Binary Search Templates/Patterns

Beyond finding an exact target, Binary Search is versatile for finding boundaries or "first true" conditions.

### a. Standard Search (Find Any Occurrence)

This is what `core_binary_search.binary_search_iterative` demonstrates. It returns the index of *any* matching target, or -1 if not found.

### b. Find First Occurrence (Leftmost Boundary / Lower Bound)

Used when you need the index of the *first* element that is equal to or greater than the target. If the target itself exists multiple times, it returns the index of its first appearance. If the target is not present, it returns the index where it *would* be inserted to maintain sorted order.

*   **Key Idea:** When `arr[mid] == target`, we might have found the target, but there could be an earlier occurrence. So, we save `mid` as a potential answer and continue searching in the left half (`high = mid - 1`). If `arr[mid] > target`, `mid` is too large, so we also save `mid` as a potential answer and search left. If `arr[mid] < target`, we must go right (`low = mid + 1`).
*   **Return Value:** The smallest index `i` such that `arr[i] >= target`. If all elements are less than `target`, returns `len(arr)`.

**Example:** `arr = [1, 2, 2, 3, 3, 3, 4]`, `target = 3`
Returns index `3` (`arr[3]` is the first `3`).

**Visual Diagram (`target = 3` in `[1, 2, 2, 3, 3, 3, 4]`)**

```
arr:   [1, 2, 2, 3, 3, 3, 4]
Indices: 0  1  2  3  4  5  6
ans = 7 (initially len(arr))

Iteration 1: low=0, high=6, mid=3. arr[3]=3.
   arr[mid] >= target (3 >= 3) -> Yes.
   ans = 3. high = 2.

Iteration 2: low=0, high=2, mid=1. arr[1]=2.
   arr[mid] >= target (2 >= 3) -> No. (2 < 3)
   low = 2.

Iteration 3: low=2, high=2, mid=2. arr[2]=2.
   arr[mid] >= target (2 >= 3) -> No. (2 < 3)
   low = 3.

Iteration 4: low=3, high=2.
   low > high. Loop terminates.

Return ans = 3.
```
*(Implemented as `core_binary_search.binary_search_template_leftmost`)*

### c. Find Last Occurrence (Rightmost Boundary / Upper Bound)

Used when you need the index of the *first* element that is *strictly greater* than the target. If the target itself exists multiple times, this will point one position past its last appearance. To get the index of the last occurrence of the target, you often take this result and subtract 1 (then verify if `arr[result - 1] == target`).

*   **Key Idea:** When `arr[mid] > target`, `mid` is too large, so it's a potential answer for "first element > target". We save `mid` and try to find a smaller one in the left half (`high = mid - 1`). If `arr[mid] <= target`, `mid` is too small or equal, so we must go right (`low = mid + 1`).
*   **Return Value:** The smallest index `i` such that `arr[i] > target`. If all elements are less than or equal to `target`, returns `len(arr)`.

**Example:** `arr = [1, 2, 2, 3, 3, 3, 4]`, `target = 3`
Returns index `6` (`arr[6]` is the `4`, which is the first element > `3`).
To get the last `3`, we'd do `6 - 1 = 5`.

**Visual Diagram (`target = 3` in `[1, 2, 2, 3, 3, 3, 4]`)**

```
arr:   [1, 2, 2, 3, 3, 3, 4]
Indices: 0  1  2  3  4  5  6
ans = 7 (initially len(arr))

Iteration 1: low=0, high=6, mid=3. arr[3]=3.
   arr[mid] > target (3 > 3) -> No. (3 <= 3)
   low = 4.

Iteration 2: low=4, high=6, mid=5. arr[5]=3.
   arr[mid] > target (3 > 3) -> No. (3 <= 3)
   low = 6.

Iteration 3: low=6, high=6, mid=6. arr[6]=4.
   arr[mid] > target (4 > 3) -> Yes.
   ans = 6. high = 5.

Iteration 4: low=6, high=5.
   low > high. Loop terminates.

Return ans = 6.
```
*(Implemented as `core_binary_search.binary_search_template_rightmost`)*

### d. Binary Search on the "Answer" (or "Search Space")

This is a powerful pattern where the problem isn't directly about finding an index in a sorted array, but rather about finding a specific value `X` that satisfies a certain condition. The crucial insight is that the *property* (e.g., "there are at least `k` elements less than or equal to `X`") is monotonic. If `X` satisfies the condition, any value `Y > X` will also satisfy it. If `X` does not satisfy the condition, any `Y < X` will also not satisfy it.

*   **Steps:**
    1.  Identify the *range of possible answers* (e.g., `[min_possible_value, max_possible_value]`). This defines your `low` and `high` for the binary search.
    2.  For a `mid` value within this range, define a `check(mid)` function. This function determines if `mid` satisfies the condition.
    3.  If `check(mid)` is true, it means `mid` could be the answer, or a smaller value could also be the answer. So, you store `mid` as a potential answer and try `high = mid - 1`.
    4.  If `check(mid)` is false, `mid` is too small. You need to look for a larger answer: `low = mid + 1`.
*   **Example Problem:** Kth Smallest Element in a Sorted Matrix (implemented in `problem_kth_smallest_matrix.py`). Here, we search for a value `X` such that there are exactly `k` elements in the matrix less than or equal to `X`. The `check(X)` function counts elements `<= X`.

## 6. Edge Cases and Gotchas

*   **Empty Array:** Always handle `[]` as an input. Most binary searches will return -1 or 0 (for insertion point) in this case.
*   **Single Element Array:** Test `[X]` with `target = X` and `target = Y`.
*   **Target at Ends:** Target is `arr[0]` or `arr[len(arr)-1]`.
*   **Target Not Found:** Ensure your logic correctly handles cases where the target doesn't exist.
*   **Duplicates:** Different templates handle duplicates differently. Ensure your chosen template aligns with the problem's requirements (e.g., find *any* index vs. *first* index).
*   **`low <= high` vs `low < high`:**
    *   `low <= high`: When `low` and `high` can point to the same element, and that element might be the answer. This is the most common and robust approach. The loop ends when `low > high`.
    *   `low < high`: Less common for general search. If used, `mid` calculation might need adjustment, and the post-loop check of `arr[low]` or `arr[high]` is often necessary. Can be useful when you need to narrow down to a single element.
*   **`mid` Calculation:** `mid = low + (high - low) // 2` is safer than `(low + high) // 2` in languages with fixed-size integers to prevent overflow, especially if `low + high` could exceed the maximum integer value. In Python, this isn't a typical overflow issue, but it's good practice.
*   **Off-by-one errors:** Carefully consider `mid + 1` and `mid - 1` when updating `low` and `high`.

## 7. ASCII Diagram for `mid = low + (high - low) // 2`

This visualizes how `low`, `high`, and `mid` behave:

```
Search Space:   [ L . . . . M . . . . H ]
Indices:        low       mid       high

If arr[mid] < target:
  Move low to mid + 1 (search right)
  [ . . . . M + 1 . . H ]
            low       high

If arr[mid] > target:
  Move high to mid - 1 (search left)
  [ L . . . M - 1 . . . ]
  low       high

If arr[mid] == target:
  Found! (Or adjust low/high for first/last occurrence)
```

## Further Reading and Practice

The provided code covers several standard binary search problems. To deepen your understanding, explore problems like:
*   Finding the peak element in a mountain array.
*   Finding square root using binary search.
*   Aggressive Cows / Painter's Partition problem (more complex "binary search on answer").
*   Ternary Search (a variation for unimodal functions, less common than binary search).

---