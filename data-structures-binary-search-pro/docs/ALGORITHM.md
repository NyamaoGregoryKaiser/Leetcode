# Binary Search Algorithms: An In-Depth Explanation

Binary Search is a highly efficient algorithm for finding an element in a sorted array or list. Its efficiency stems from its divide-and-conquer strategy, repeatedly halving the search interval.

## 1. Core Principle

The fundamental idea behind binary search is simple:
1.  Start with a sorted array and define a search range using two pointers: `low` (start index) and `high` (end index).
2.  Calculate the `mid` index: `mid = low + (high - low) / 2`. (This avoids potential integer overflow compared to `(low + high) / 2`).
3.  Compare the element at `mid` with the `target`:
    *   If `arr[mid] == target`, the element is found.
    *   If `arr[mid] < target`, the target must be in the right half (elements greater than `arr[mid]`). So, update `low = mid + 1`.
    *   If `arr[mid] > target`, the target must be in the left half (elements smaller than `arr[mid]`). So, update `high = mid - 1`.
4.  Repeat steps 2-3 until `low > high`. If the loop terminates and the element hasn't been found, it means the target is not in the array.

### Visual Diagram (Basic Binary Search)

```
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Initial:
low = 0, high = 9
mid = 0 + (9-0)/2 = 4 (arr[4] = 16)
16 < 23, so target is in right half.
low = mid + 1 = 5

Iteration 1:
low = 5, high = 9
mid = 5 + (9-5)/2 = 7 (arr[7] = 56)
56 > 23, so target is in left half.
high = mid - 1 = 6

Iteration 2:
low = 5, high = 6
mid = 5 + (6-5)/2 = 5 (arr[5] = 23)
23 == 23, target found at index 5.
```

## 2. Variations of Binary Search

While the core principle remains, binary search has several important variations:

### 2.1. Finding First/Last Occurrence (Lower Bound / Upper Bound)

When an array contains duplicate elements, you might need to find the first or last index of a target.

*   **First Occurrence (Lower Bound)**: Find the smallest index `i` such that `arr[i] >= target`. If `arr[i] == target`, this is the first occurrence.
    *   The `ans` is initialized to -1 (or array size).
    *   If `arr[mid] >= target`, it means `mid` *could* be our answer or the answer is to its left. So we record `ans = mid` and try `high = mid - 1`.
    *   If `arr[mid] < target`, the answer must be to the right. So, `low = mid + 1`.

### Visual Diagram (First Occurrence)

```
Array: [2, 5, 5, 5, 8, 12]
Target: 5

Initial: ans = -1
low = 0, high = 5
mid = 2 (arr[2] = 5)
arr[mid] >= target (5 >= 5) -> ans = 2, high = mid - 1 = 1

Iteration 1:
low = 0, high = 1
mid = 0 (arr[0] = 2)
arr[mid] < target (2 < 5) -> low = mid + 1 = 1

Iteration 2:
low = 1, high = 1
mid = 1 (arr[1] = 5)
arr[mid] >= target (5 >= 5) -> ans = 1, high = mid - 1 = 0

Iteration 3:
low = 1, high = 0
Loop terminates (low > high).
Result: ans = 1 (index of first '5')
```

*   **Last Occurrence (Upper Bound minus 1)**: Find the largest index `i` such that `arr[i] <= target`. If `arr[i] == target`, this is the last occurrence.
    *   The `ans` is initialized to -1.
    *   If `arr[mid] <= target`, it means `mid` *could* be our answer or the answer is to its right. So we record `ans = mid` and try `low = mid + 1`.
    *   If `arr[mid] > target`, the answer must be to the left. So, `high = mid - 1`.

### 2.2. Binary Search on the Answer Space

Sometimes, binary search isn't directly applied to indices of an array, but rather to a range of *possible answers*.
Examples: finding the square root of a number, finding the minimum value for which a condition is met (e.g., minimum capacity to ship packages within D days).

*   **Mechanism**:
    1.  Define a search space `[low, high]` for the *answer* itself (e.g., `[0, x]` for `sqrt(x)`).
    2.  For a `mid` value from this answer space, check if it satisfies a given `condition`.
    3.  If `condition(mid)` is true, `mid` could be a valid answer (or a better answer might exist in a certain direction). Update `ans = mid` and `high = mid - 1` (or `low = mid + 1` depending on whether we seek min or max satisfying value).
    4.  If `condition(mid)` is false, `mid` is not a valid answer, so adjust `low` or `high` to exclude it.
    5.  The loop typically runs until `low <= high`. The final `ans` variable holds the desired result.

### 2.3. Search in Rotated Sorted Array

This problem involves an array that was originally sorted but then rotated at some pivot. E.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`.

*   **Key Idea**: One half of the array will *always* be sorted.
    1.  Determine which half (`[low, mid]` or `[mid, high]`) is sorted.
    2.  Check if the `target` falls within the sorted half.
    3.  If it does, narrow down the search to that half.
    4.  Otherwise, narrow down the search to the unsorted half.

### Visual Diagram (Search in Rotated Sorted Array)

```
Array: [4, 5, 6, 7, 0, 1, 2]
Target: 0

Initial: low = 0, high = 6
mid = 3 (arr[3] = 7)

Check left half [low...mid]: arr[0] = 4, arr[3] = 7. (4 <= 7) -> Left half is sorted.
Target 0 is NOT in [4, 7].
So, target must be in the right (unsorted) half.
low = mid + 1 = 4

Iteration 1:
low = 4, high = 6
mid = 4 + (6-4)/2 = 5 (arr[5] = 1)

Check left half [low...mid]: arr[4] = 0, arr[5] = 1. (0 <= 1) -> Left half is sorted.
Target 0 IS in [0, 1].
So, target must be in the left half.
high = mid - 1 = 4

Iteration 2:
low = 4, high = 4
mid = 4 (arr[4] = 0)
arr[mid] == target (0 == 0) -> Target found at index 4.
```

### 2.4. Kth Smallest Element in Two Sorted Arrays

This is a more advanced problem, often considered a variation of "Median of Two Sorted Arrays". It uses a binary search-like partitioning strategy.

*   **Key Idea**: To find the Kth smallest element, we want to partition the two arrays `nums1` and `nums2` such that the combined count of elements in the left partitions is `k`, and all elements in the left partitions are less than or equal to all elements in the right partitions.
    1.  Ensure `nums1` is the shorter array (swap if needed). This makes the binary search space smaller.
    2.  Binary search on the number of elements taken from `nums1` (let it be `partitionX`).
    3.  Then, calculate the number of elements to take from `nums2` (`partitionY = k - partitionX`).
    4.  Check the "validity" of this partition:
        *   `maxLeftX = (partitionX == 0) ? -INF : nums1[partitionX - 1]`
        *   `minRightX = (partitionX == m) ? +INF : nums1[partitionX]`
        *   `maxLeftY = (partitionY == 0) ? -INF : nums2[partitionY - 1]`
        *   `minRightY = (partitionY == n) ? +INF : nums2[partitionY]`
    5.  If `maxLeftX <= minRightY` and `maxLeftY <= minRightX`, then the partition is correct, and the Kth element is `max(maxLeftX, maxLeftY)`.
    6.  If `maxLeftX > minRightY`, it means we took too many elements from `nums1`, so reduce `partitionX` (i.e., `high = partitionX - 1`).
    7.  If `maxLeftY > minRightX`, it means we took too few elements from `nums1`, so increase `partitionX` (i.e., `low = partitionX + 1`).

This process effectively performs a binary search on the possible split points in the smaller array.

## 3. Time and Space Complexity

All standard binary search variations operate in **O(log N)** time complexity, where N is the size of the search space. This logarithmic complexity is why it's so efficient for large datasets.
The iterative implementations typically have **O(1)** space complexity, as they only use a few variables.
Recursive implementations have **O(log N)** space complexity due to the function call stack.

## Conclusion

Binary search is a fundamental algorithm with broad applications. Mastering its core principles and variations is crucial for any aspiring software engineer. Remember to consider edge cases, `mid` calculation, and correct `low`/`high` adjustments for different problem types.

---