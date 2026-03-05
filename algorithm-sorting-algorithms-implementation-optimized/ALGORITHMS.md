# Detailed Algorithm Explanations

This document provides in-depth explanations of the sorting algorithms and related techniques used in this project. It covers the core logic, time/space complexity, and visual diagrams.

---

## 1. Quicksort

Quicksort is an efficient, in-place, comparison-based sorting algorithm. It uses a divide-and-conquer strategy.

### Core Idea
1.  **Pick a Pivot**: Choose an element from the array, called a pivot.
2.  **Partition**: Rearrange the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side. After this, the pivot is in its final sorted position.
3.  **Recurse**: Recursively apply the above steps to the sub-array of elements smaller than the pivot and separately to the sub-array of elements greater than the pivot.

### Partition Schemes

#### a) Lomuto Partition Scheme
*   **How it works**:
    1.  Choose the last element as the pivot (or swap a chosen pivot to the end).
    2.  Maintain an index `i` (pointer to the "smaller" elements boundary), initially `low - 1`.
    3.  Iterate `j` from `low` to `high - 1`:
        *   If `arr[j]` is less than or equal to the pivot, increment `i` and swap `arr[i]` with `arr[j]`.
    4.  Finally, swap `arr[i + 1]` with `arr[high]` (the pivot). `i + 1` is the final position of the pivot.
*   **Advantages**: Simpler to implement.
*   **Disadvantages**: Poor performance on arrays with many duplicate elements. Often makes unbalanced partitions.
*   **ASCII Diagram (Lomuto)**:
    ```
    Array: [ 3, 7, 8, 5, 2, 1, 9, 4, 6 ]  Pivot = 6 (arr[high])
            ^                      ^
            low                    high

    Initial: i = low - 1 = -1

    j = 0 (arr[0]=3): 3 <= 6. i becomes 0. Swap arr[0] with arr[0]. arr = [3, 7, 8, 5, 2, 1, 9, 4, 6]
                      (i=0)

    j = 1 (arr[1]=7): 7 > 6. No swap. arr = [3, 7, 8, 5, 2, 1, 9, 4, 6]
                      (i=0)

    j = 2 (arr[2]=8): 8 > 6. No swap. arr = [3, 7, 8, 5, 2, 1, 9, 4, 6]
                      (i=0)

    j = 3 (arr[3]=5): 5 <= 6. i becomes 1. Swap arr[1] (7) with arr[3] (5). arr = [3, 5, 8, 7, 2, 1, 9, 4, 6]
                      (i=1)                       ^      ^

    j = 4 (arr[4]=2): 2 <= 6. i becomes 2. Swap arr[2] (8) with arr[4] (2). arr = [3, 5, 2, 7, 8, 1, 9, 4, 6]
                      (i=2)                       ^      ^

    j = 5 (arr[5]=1): 1 <= 6. i becomes 3. Swap arr[3] (7) with arr[5] (1). arr = [3, 5, 2, 1, 8, 7, 9, 4, 6]
                      (i=3)                          ^      ^

    j = 6 (arr[6]=9): 9 > 6. No swap. arr = [3, 5, 2, 1, 8, 7, 9, 4, 6]
                      (i=3)

    j = 7 (arr[7]=4): 4 <= 6. i becomes 4. Swap arr[4] (8) with arr[7] (4). arr = [3, 5, 2, 1, 4, 7, 9, 8, 6]
                      (i=4)                             ^      ^

    After loop (j reaches high-1):
    Swap arr[i+1] (arr[5]=7) with arr[high] (arr[8]=6).
    arr = [3, 5, 2, 1, 4, 6, 9, 8, 7]
                           ^  ^

    Final partitioned array:
    [ 3, 5, 2, 1, 4 | 6 | 9, 8, 7 ]
                     ^
                  Pivot in place
    ```

#### b) Hoare Partition Scheme
*   **How it works**:
    1.  Choose the first element as the pivot (or any other).
    2.  Maintain two pointers, `i` (from left) and `j` (from right).
    3.  `i` moves right, `j` moves left.
    4.  Increment `i` until `arr[i] >= pivot`.
    5.  Decrement `j` until `arr[j] <= pivot`.
    6.  If `i < j`, swap `arr[i]` and `arr[j]`.
    7.  Repeat until `i >= j`. When `i >= j`, the partition is complete. The pivot's final position is between `j` and `i`.
*   **Advantages**: More efficient on average, handles duplicates better. Often makes more balanced partitions.
*   **Disadvantages**: Slightly more complex to implement correctly (especially handling `i` and `j` pointers and the final swap).
*   **ASCII Diagram (Hoare)**:
    ```
    Array: [ 7, 2, 1, 6, 8, 5, 3, 4 ]  Pivot = 7 (arr[low])
            ^ low                 ^ high

    Initial: i = low, j = high + 1

    1. Increment i until arr[i] >= pivot (7):
       i starts at 0 (arr[0]=7). arr[0] >= 7. i = 0.

    2. Decrement j until arr[j] <= pivot (7):
       j starts at 8. j = 7 (arr[7]=4). arr[7] <= 7. j = 7.

    3. i < j (0 < 7). Swap arr[0] (7) and arr[7] (4).
       arr = [ 4, 2, 1, 6, 8, 5, 3, 7 ]
               ^                     ^
               i                     j

    4. Repeat:
       Increment i until arr[i] >= pivot (7):
         i = 1 (arr[1]=2) < 7
         i = 2 (arr[2]=1) < 7
         i = 3 (arr[3]=6) < 7
         i = 4 (arr[4]=8) >= 7. i = 4.

       Decrement j until arr[j] <= pivot (7):
         j = 6 (arr[6]=3) < 7
         j = 5 (arr[5]=5) < 7
         j = 4 (arr[4]=8) > 7. Oops, this is wrong. j should be decremented until arr[j] <= pivot.
         j = 7 (arr[7]=7) <= 7. j=7. (Start of inner loop)
         j = 6 (arr[6]=3) <= 7. j=6.
         j = 5 (arr[5]=5) <= 7. j=5.

       Corrected loop:
       i = 0, j = 8. pivot = arr[0]=7.
       i moves: arr[0]=7 (>=7). i=0.
       j moves: arr[7]=4 (<=7). j=7.
       i < j. Swap arr[0] and arr[7]. arr = [4, 2, 1, 6, 8, 5, 3, 7]

       i moves: arr[1]=2, arr[2]=1, arr[3]=6, arr[4]=8 (>=7). i=4.
       j moves: arr[6]=3, arr[5]=5, arr[4]=8. Oops, arr[j] <= pivot.
                j starts at 7 (arr[7]=7). It satisfies. So, j=7.
                This indicates a problem with basic Hoare description: j should find a value _less_ than pivot.
                A more robust Hoare: `i` finds element >= pivot, `j` finds element <= pivot.

       Let's use a common variant: pivot at `arr[low]`.
       `i` starts at `low-1`, `j` starts at `high+1`.
       `while True`:
         `do i++ while arr[i] < pivot`
         `do j-- while arr[j] > pivot`
         `if i >= j, break`
         `swap arr[i], arr[j]`

    Re-attempt Hoare Partition:
    Array: [ 7, 2, 1, 6, 8, 5, 3, 4 ]
           Pivot = 7
           i = low - 1 = -1
           j = high + 1 = 8

    Loop 1:
      i becomes 0 (arr[0]=7, not <7)
      j becomes 7 (arr[7]=4, <7)
      i < j (0 < 7). Swap arr[0] (7) and arr[7] (4).
      arr = [ 4, 2, 1, 6, 8, 5, 3, 7 ]
              ^                     ^
              i                     j

    Loop 2:
      i becomes 1 (arr[1]=2, <7)
      i becomes 2 (arr[2]=1, <7)
      i becomes 3 (arr[3]=6, <7)
      i becomes 4 (arr[4]=8, not <7). i = 4.

      j becomes 6 (arr[6]=3, <7)
      j becomes 5 (arr[5]=5, <7)
      j becomes 4 (arr[4]=8, not >7)
      Wait, j should keep moving right past its boundary until `arr[j] <= pivot`
      The `do...while` syntax is tricky in Python. Let's trace it simply:

      `pivot = arr[low]`
      `i = low`
      `j = high`

      `while True:`
        `while i < high and arr[i] < pivot: i += 1`
        `while j > low and arr[j] > pivot: j -= 1`

        `if i >= j: return j # or i, depends on implementation`
        `arr[i], arr[j] = arr[j], arr[i]`
        `i += 1`
        `j -= 1`

    Example from code with `pivot = arr[low]`:
    Array: `[ 7, 2, 1, 6, 8, 5, 3, 4 ]`
    `low = 0`, `high = 7`, `pivot = 7`

    Initial: `i = 0`, `j = 7`

    Iteration 1:
      `while i < high and arr[i] < pivot`: (arr[0]=7, false) `i` stays `0`.
      `while j > low and arr[j] > pivot`:
        `j=7` (arr[7]=4, false, 4 is not > 7) `j` stays `7`.
      `i < j` (0 < 7). Swap `arr[0]` (7) and `arr[7]` (4).
      Array: `[ 4, 2, 1, 6, 8, 5, 3, 7 ]`
      `i` becomes `1`, `j` becomes `6`.

    Iteration 2:
      `while i < high and arr[i] < pivot`:
        `i=1` (arr[1]=2, true). `i=2`.
        `i=2` (arr[2]=1, true). `i=3`.
        `i=3` (arr[3]=6, true). `i=4`.
        `i=4` (arr[4]=8, false, 8 is not < 7). `i` is `4`.
      `while j > low and arr[j] > pivot`:
        `j=6` (arr[6]=3, false, 3 is not > 7). `j` is `6`.
      `i < j` (4 < 6). Swap `arr[4]` (8) and `arr[6]` (3).
      Array: `[ 4, 2, 1, 6, 3, 5, 8, 7 ]`
                           ^     ^
      `i` becomes `5`, `j` becomes `5`.

    Iteration 3:
      `while i < high and arr[i] < pivot`: (arr[5]=5, true). `i=6`.
      `i=6` (arr[6]=8, false). `i` is `6`.
      `while j > low and arr[j] > pivot`: (arr[5]=5, false). `j` is `5`.
      `i >= j` (6 >= 5). Break. Return `j` (`5`).

    Final state after partition (pivot was `arr[low]=7`):
    `[ 4, 2, 1, 6, 3, 5, 8, 7 ]`
                           ^ (original pivot location)
                     ^ (partition index returned by Hoare, j=5)
    Elements `low` to `j` (0 to 5) are `[4, 2, 1, 6, 3, 5]` -- all <= 7.
    Elements `j+1` to `high` (6 to 7) are `[8, 7]` -- all >= 7.
    The pivot `7` ends up in the right partition.

    This variant of Hoare is more robust.
    ```

### Time and Space Complexity
*   **Time Complexity**:
    *   **Average Case**: O(N log N). This occurs when partitions are roughly balanced.
    *   **Worst Case**: O(N^2). This happens when the pivot consistently picks the smallest or largest element, leading to highly unbalanced partitions (e.g., already sorted array with first element as pivot).
*   **Space Complexity**:
    *   **Average Case**: O(log N). Due to the recursive call stack depth.
    *   **Worst Case**: O(N). If partitions are highly unbalanced (e.g., always one element on one side, N-1 on other), the recursion depth can be N.
*   **Stability**: Quicksort is generally **not stable**. The relative order of equal elements may not be preserved.

### Edge Cases and Gotchas
*   **Pivot Selection**: Crucial for performance.
    *   Always picking first/last: Bad for already sorted/reverse-sorted arrays.
    *   Random pivot: Generally good average performance, prevents worst-case on specific input patterns.
    *   Median-of-three: Pick median of `low`, `middle`, `high` elements as pivot. Good for reducing worst-case probability.
*   **Small Arrays**: For very small sub-arrays (e.g., < 10-15 elements), insertion sort can be faster than Quicksort due to lower overhead. Hybrid sort algorithms often switch to insertion sort for small partitions.
*   **Duplicate Elements**: Can lead to unbalanced partitions if not handled carefully, especially with Lomuto. Hoare tends to handle them better.

---

## 2. Mergesort

Mergesort is an efficient, stable, comparison-based sorting algorithm. It also uses a divide-and-conquer strategy.

### Core Idea
1.  **Divide**: Recursively divide the unsorted list into `n` sublists, each containing one element (a list of one element is considered sorted).
2.  **Conquer (Merge)**: Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.

### Merge Step
The critical part is the merging process. Two already sorted sub-arrays are merged into a single sorted array.
*   Compare the first elements of both sub-arrays.
*   Take the smaller one and put it into the merged array.
*   Advance the pointer for the sub-array from which the element was taken.
*   Repeat until one sub-array is exhausted.
*   Append any remaining elements from the other sub-array.

### ASCII Diagram (Mergesort)
```
Array: [38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3]       [9, 82, 10]
  /          \          /     \
[38, 27]    [43, 3]    [9, 82]   [10]
  /   \      /   \      /   \
[38] [27]  [43] [3]  [9] [82]  [10]

Conquer (Merge):
[27, 38]    [3, 43]    [9, 82]   [10]
   \       /             \     /
   [3, 27, 38, 43]       [9, 10, 82]
           \             /
         [3, 9, 10, 27, 38, 43, 82]
```

### Time and Space Complexity
*   **Time Complexity**:
    *   **Best, Average, Worst Case**: O(N log N). This is because the array is always divided into two halves, and merging takes linear time. The recursion depth is `log N`, and at each level, `N` operations (merges) are performed.
*   **Space Complexity**:
    *   **Worst Case**: O(N). An auxiliary array of size N is typically required during the merge step to hold the merged elements. This is the main drawback compared to in-place sorts like Quicksort.
*   **Stability**: Mergesort is inherently **stable**. The relative order of equal elements is preserved during the merge process.

### Edge Cases and Gotchas
*   **Space Overhead**: The O(N) auxiliary space can be a concern for very large datasets or memory-constrained environments.
*   **Recursive Calls**: Deep recursion stacks for very large N. Can be mitigated by an iterative (bottom-up) Mergesort, but the recursive version is usually simpler to implement and reason about.

---

## 3. Quickselect (for Kth Largest/Smallest Element)

Quickselect is an algorithm to find the k-th smallest (or k-th largest) element in an unsorted array. It is a selection algorithm, a close relative of Quicksort.

### Core Idea
Quickselect uses the same partitioning logic as Quicksort.
1.  **Pick a Pivot**: Choose an element (pivot) from the array.
2.  **Partition**: Rearrange the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. The pivot is now at its final sorted position (`pivot_index`).
3.  **Compare**:
    *   If `pivot_index` is `k-1` (for 0-indexed Kth smallest), then the pivot is the Kth smallest element.
    *   If `pivot_index > k-1`, the Kth smallest element must be in the left sub-array. Recurse on the left sub-array.
    *   If `pivot_index < k-1`, the Kth smallest element must be in the right sub-array. Recurse on the right sub-array, adjusting `k` if necessary (e.g., if finding Kth smallest, and we recurse right, we now need to find `k - (pivot_index - low + 1)` smallest element in the right subarray).

### Time and Space Complexity
*   **Time Complexity**:
    *   **Average Case**: O(N). Because Quickselect only recurses on one side of the partition, the average number of operations is reduced from O(N log N) to O(N).
    *   **Worst Case**: O(N^2). Similar to Quicksort, if the pivot is consistently chosen poorly (e.g., always the smallest or largest), the performance degrades. Random pivot selection helps mitigate this.
*   **Space Complexity**:
    *   **Average Case**: O(log N). Due to recursive call stack.
    *   **Worst Case**: O(N).

### Edge Cases and Gotchas
*   **`k` value**: Ensure `k` is within valid bounds (`1 <= k <= N`).
*   **0-indexing vs 1-indexing**: Be careful if the problem asks for the "kth largest" (1-indexed) and your implementation works with "kth smallest" (0-indexed).
*   **Randomized Pivot**: Crucial for achieving average O(N) performance reliably.

---

## 4. Dutch National Flag Problem (Sort Colors)

This problem involves sorting an array containing only three distinct values (typically 0, 1, and 2, representing colors). It's a classic single-pass, in-place partitioning problem.

### Core Idea (Dijkstra's 3-way Partitioning)
Use three pointers: `low`, `mid`, and `high`.
*   `low`: Points to the last position of `0`. Elements `arr[0...low-1]` are `0`.
*   `mid`: Points to the current element being considered. Elements `arr[low...mid-1]` are `1`.
*   `high`: Points to the first position of `2`. Elements `arr[high+1...N-1]` are `2`.

The algorithm iterates while `mid <= high`:
1.  If `arr[mid]` is `0`: Swap `arr[low]` and `arr[mid]`. Increment `low` and `mid`.
2.  If `arr[mid]` is `1`: Increment `mid`.
3.  If `arr[mid]` is `2`: Swap `arr[mid]` and `arr[high]`. Decrement `high`. (Note: `mid` is NOT incremented, because the swapped element from `high` might be a `0` or `1` and needs to be processed.)

### ASCII Diagram (Dutch National Flag)
```
Array: [ 2, 0, 2, 1, 1, 0 ]
        low
        mid
                          high

1. arr[mid] (2) is 2. Swap arr[mid] (2) with arr[high] (0). Decrement high.
   Array: [ 2, 0, 0, 1, 1, 2 ]
           low
           mid             high

2. arr[mid] (0) is 0. Swap arr[low] (2) with arr[mid] (0). Increment low, mid.
   Array: [ 0, 2, 0, 1, 1, 2 ]
              low
                 mid         high

3. arr[mid] (0) is 0. Swap arr[low] (2) with arr[mid] (0). Increment low, mid.
   Array: [ 0, 0, 2, 1, 1, 2 ]
                 low
                    mid      high

4. arr[mid] (1) is 1. Increment mid.
   Array: [ 0, 0, 2, 1, 1, 2 ]
                 low
                       mid   high

5. arr[mid] (1) is 1. Increment mid.
   Array: [ 0, 0, 2, 1, 1, 2 ]
                 low
                          mid high

6. arr[mid] (1) is 1. mid > high (5 > 4). Loop terminates. Oh, wait.
   The condition is `mid <= high`.
   At step 5, `mid = 4`, `high = 4`. `arr[mid]=1`. Increment `mid`.
   Now `mid = 5`, `high = 4`. Condition `mid <= high` (5 <= 4) is false. Loop terminates.

Final sorted array: `[ 0, 0, 1, 1, 2, 2 ]`

Let's re-trace with a slightly different example to show a `2` being swapped into `mid` that then needs reprocessing.
Array: [ 1, 0, 2 ]
        low
        mid
              high

1. arr[mid] (1) is 1. Increment mid.
   Array: [ 1, 0, 2 ]
           low
              mid
              high

2. arr[mid] (0) is 0. Swap arr[low] (1) with arr[mid] (0). Increment low, mid.
   Array: [ 0, 1, 2 ]
              low
                 mid
              high

3. arr[mid] (2) is 2. Swap arr[mid] (2) with arr[high] (2). Decrement high.
   Array: [ 0, 1, 2 ]
              low
                 mid
           high (now pointing at original arr[1]=1)

4. Now mid=2, high=1. `mid <= high` (2 <= 1) is false. Loop terminates.
   Sorted: `[0, 1, 2]`

This algorithm is highly efficient for this specific problem.
```

### Time and Space Complexity
*   **Time Complexity**: O(N). Each element is visited at most twice (once by `mid`, once by `low`/`high` in a swap).
*   **Space Complexity**: O(1). It's an in-place sort.
*   **Stability**: Not stable. Swapping elements can change the relative order of equal elements.

### Edge Cases and Gotchas
*   **Empty or Single-element Array**: The loop `while mid <= high` correctly handles these.
*   **All Same Color**: E.g., `[0, 0, 0]` or `[1, 1, 1]`. The pointers move correctly.
*   **Order of Operations**: The critical part is *not* incrementing `mid` when `arr[mid]` is `2` because the element swapped from `high` might be a `0` or `1` and needs to be re-evaluated.

---

## 5. Merge Intervals

This problem uses sorting as a crucial preprocessing step to simplify the merging logic.

### Core Idea
1.  **Sort**: Sort all intervals based on their start times. This is the most important step, as it ensures that when we consider an interval, all potentially overlapping intervals starting before it have already been processed or are next in line.
2.  **Merge**: Iterate through the sorted intervals. Maintain a `merged` list.
    *   If the `merged` list is empty, or the current interval does not overlap with the last interval in `merged`, simply add the current interval to `merged`.
    *   If the current interval *does* overlap with the last interval in `merged`, merge them by updating the end time of the last interval in `merged` to be the maximum of its current end time and the current interval's end time.

### Overlap Condition
Two intervals `[a, b]` and `[c, d]` overlap if:
*   `a <= d` AND `c <= b`
    *   More simply, if `c <= b` (current interval's start is less than or equal to the previous interval's end).

### ASCII Diagram (Merge Intervals)
```
Input: [[1,3], [2,6], [8,10], [15,18]]

1. Sort by start time (already sorted in this example):
   [[1,3], [2,6], [8,10], [15,18]]

2. Initialize merged = []

3. Process [1,3]:
   merged is empty. Add [1,3].
   merged = [[1,3]]

4. Process [2,6]:
   Last merged interval: [1,3]. Current: [2,6].
   Overlap? 2 <= 3. Yes.
   Merge: Update last merged interval's end to max(3, 6) = 6.
   merged = [[1,6]]

5. Process [8,10]:
   Last merged interval: [1,6]. Current: [8,10].
   Overlap? 8 <= 6. No.
   Add [8,10].
   merged = [[1,6], [8,10]]

6. Process [15,18]:
   Last merged interval: [8,10]. Current: [15,18].
   Overlap? 15 <= 10. No.
   Add [15,18].
   merged = [[1,6], [8,10], [15,18]]

Final result: [[1,6], [8,10], [15,18]]
```

### Time and Space Complexity
*   **Time Complexity**: O(N log N). Dominated by the initial sorting step. The iteration and merging take O(N) time.
*   **Space Complexity**: O(N). In the worst case (no overlapping intervals), the `merged` list will contain all `N` intervals.

### Edge Cases and Gotchas
*   **Empty Input**: The code should handle an empty list of intervals gracefully (return an empty list).
*   **Single Interval**: Returns the interval itself.
*   **All Overlapping Intervals**: E.g., `[[1,10], [2,3], [4,5]]` should merge to `[[1,10]]`.
*   **Intervals with Identical Start/End**: E.g., `[[1,5], [5,10]]` should merge to `[[1,10]]` (or `[[1,5], [5,10]]` depending on problem statement, but usually merged if touching). The condition `current_start <= last_end` covers this.

---

### Interview Tips and Variations (Refer to `resources/interview_notes.md`)

This concludes the detailed algorithm explanations.

---