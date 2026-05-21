# Binary Search: A Core Algorithm Explained

Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## How it Works

Imagine you have a phone book sorted by name, and you're looking for "Alice".
1.  You open the book to the middle. If you see "Bob", you know "Alice" must be in the first half of the book (since 'A' comes before 'B').
2.  Now you take the first half of the book and again open it to the middle. If you see "Aaron", you know "Alice" must be in the second half of *that* portion.
3.  You repeat this process, eliminating half of the remaining search space with each step, until you find "Alice" or determine she's not in the book.

## Algorithm Steps (Iterative Approach)

Let's formalize this for an array `arr` sorted in ascending order, looking for `target`.

1.  **Initialize Pointers:**
    *   `low`: Points to the beginning of the search space (index 0).
    *   `high`: Points to the end of the search space (index `len(arr) - 1`).

2.  **Loop Condition:** Continue the search as long as `low <= high`. This condition ensures that the search space (`[low, high]`) is not empty. If `low` crosses `high`, it means the `target` is not in the array.

3.  **Calculate Midpoint:**
    *   `mid = low + (high - low) // 2`
    *   This formula for `mid` is preferred over `(low + high) // 2` to prevent potential integer overflow in languages like C++ or Java when `low` and `high` are very large (though Python handles large integers automatically).

4.  **Compare `arr[mid]` with `target`:**
    *   **Case 1: `arr[mid] == target`**
        *   You found the target! Return `mid`.
    *   **Case 2: `arr[mid] < target`**
        *   The target must be in the right half of the current search space. Discard the left half.
        *   Update `low = mid + 1`.
    *   **Case 3: `arr[mid] > target`**
        *   The target must be in the left half of the current search space. Discard the right half.
        *   Update `high = mid - 1`.

5.  **Target Not Found:** If the loop finishes (i.e., `low > high`), it means the target was not found in the array. Return -1.

## Key Properties and Why it's Efficient

*   **Sorted Data:** Binary search critically relies on the input data being sorted. If the data is unsorted, binary search cannot be applied.
*   **Divide and Conquer:** It's a classic example of a "divide and conquer" algorithm.
*   **Logarithmic Time Complexity:** Because the search space is halved in each step, the time complexity is `O(log N)`, where N is the number of elements in the array. This is extremely efficient for large datasets compared to linear search (`O(N)`).
    *   Example: For an array of 1 million elements, a linear search might take up to 1 million comparisons. A binary search would take at most `log2(1,000,000)` which is approximately 20 comparisons.
*   **Constant Space Complexity:** The iterative version uses only a few variables (`low`, `high`, `mid`), resulting in `O(1)` space complexity. The recursive version uses `O(log N)` space due to the recursion call stack.

## Common Template (Right-Inclusive `[low, high]` Search Space)

Most binary search problems can be solved with a slight variation of this template.

```python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1 # Search space is [low, high]

    while low <= high: # While search space is valid
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1 # Target is in right half [mid+1, high]
        else: # arr[mid] > target
            high = mid - 1 # Target is in left half [low, mid-1]
            
    return -1 # Target not found
```

## Variations: Lower Bound and Upper Bound (Finding First/Last Occurrence)

When dealing with duplicates, the standard binary search might return *any* index where the target is found. To find the *first* or *last* occurrence, we slightly modify the logic:

*   **Finding First Occurrence (Lower Bound):**
    *   When `arr[mid] == target`, we've found a possible first occurrence. We store this `mid` as a potential answer and try to find an *even earlier* occurrence by searching in the left half: `high = mid - 1`.

*   **Finding Last Occurrence (Upper Bound):**
    *   When `arr[mid] == target`, we've found a possible last occurrence. We store this `mid` as a potential answer and try to find an *even later* occurrence by searching in the right half: `low = mid + 1`.

These variations ensure that when the loop terminates, `ans` holds the correct first/last index, or -1 if not found.

## Binary Search on the Answer

Some problems don't directly involve searching an array for an element, but rather searching for a *value* that satisfies a certain condition. This is known as "binary search on the answer".

**Characteristics:**
*   You're looking for a minimum/maximum value that satisfies a property.
*   The property must be monotonic: if a value `X` satisfies the property, then all values `Y > X` (or `Y < X`) also satisfy it.
*   You can define a valid search range (minimum and maximum possible answers).
*   You need an efficient `check(value)` function that determines if a given `value` satisfies the property.

**General Template:**

```python
def check(value, ...):
    # This function determines if 'value' is a feasible answer.
    # Returns True if 'value' satisfies the condition, False otherwise.
    # Time complexity of this function affects the overall binary search complexity.
    pass

def binary_search_on_answer(min_possible_ans, max_possible_ans, ...):
    low = min_possible_ans
    high = max_possible_ans
    ans = -1 # Or a default impossible value

    while low <= high:
        mid = low + (high - low) // 2
        if check(mid, ...):
            ans = mid   # 'mid' is a possible answer. Try for a better (e.g., smaller) one.
            high = mid - 1
        else:
            low = mid + 1 # 'mid' is too small/doesn't satisfy. Need larger.
            
    return ans
```

The "Kth Smallest Element in Sorted Matrix" problem is a prime example of "binary search on the answer". We are searching for the *value* of the k-th smallest element, not its index in a 1D array.

---