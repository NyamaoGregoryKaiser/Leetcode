```markdown
# Sorting Algorithms Explanation

This document provides detailed explanations for the core sorting algorithms and problem-specific techniques implemented in this project.

## Table of Contents

1.  [Merge Sort](#merge-sort)
2.  [Quick Sort](#quick-sort)
3.  [Heap Sort](#heap-sort)
4.  [QuickSelect (for Kth Largest Element)](#quickselect-for-kth-largest-element)
5.  [Dutch National Flag Algorithm (for Sort Colors)](#dutch-national-flag-algorithm-for-sort-colors)
6.  [Counting Sort](#counting-sort)

---

## 1. Merge Sort

Merge Sort is a divide-and-conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.

**How it works:**
1.  **Divide**: Divide the unsorted list into `n` sublists, each containing one element (a list of one element is considered sorted).
2.  **Conquer (Recursion)**: Recursively sort the sublists until each sublist contains only one element.
3.  **Combine (Merge)**: Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list. The core of this algorithm is the `merge()` function, which merges two sorted sub-arrays back into one.

**Visual Diagram (Merge Step):**

```
    Original Array: [38, 27, 43, 3, 9, 82, 10]
    
    Divide:
    [38, 27, 43, 3]    [9, 82, 10]

    Further Divide:
    [38, 27] [43, 3]    [9, 82] [10]

    Further Divide (to single elements):
    [38] [27] [43] [3]    [9] [82] [10]

    Merge (Pairs):
    [27, 38] [3, 43]      [9, 82] [10]

    Merge (Four-element chunks):
    [3, 27, 38, 43]       [9, 10, 82]

    Final Merge:
    [3, 9, 10, 27, 38, 43, 82]
```

**Key Characteristics:**
*   **Time Complexity:** O(N log N) in all cases (best, average, worst). This is because it always divides the array into two halves and merges them, irrespective of the input data.
*   **Space Complexity:** O(N) due to the auxiliary array used during the merge step.
*   **Stability:** Stable. It preserves the relative order of equal elements.
*   **In-Place:** Not strictly in-place due to the auxiliary array.

**When to Use:**
*   When stability is required.
*   For linked lists, as it performs well without random access.
*   For external sorting (when data doesn't fit in memory).

## 2. Quick Sort

Quick Sort is also a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.

**How it works:**
1.  **Choose a Pivot**: Select an element from the array, called the pivot. (Common choices: first element, last element, median-of-three, or random element).
2.  **Partition**: Rearrange the array such that all elements less than the pivot come before the pivot, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side. After partitioning, the pivot is in its final sorted position.
3.  **Recurse**: Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

**Visual Diagram (Lomuto Partition - Last element as pivot):**

```
    Array: [7, 2, 1, 6, 8, 5, 3, 4]
    Pivot = 4 (last element)
    
    Pointers: i = -1 (elements < pivot)
              j = current element (iterating)
    
    Initial:    [ 7,  2,  1,  6,  8,  5,  3,  4 ]
                ^          ^                  ^
               low         j                  high (pivot)
               i = -1
    
    j=0, nums[0]=7 (>4): no swap
    Array:    [ 7,  2,  1,  6,  8,  5,  3,  4 ]
                ^       ^                  ^
               low      j                  high (pivot)
               i = -1
    
    j=1, nums[1]=2 (<=4): swap(nums[i+1], nums[j]), i++
    Swap(nums[0], nums[1]): [ 2,  7,  1,  6,  8,  5,  3,  4 ]
                             ^          ^                  ^
                            low         j                  high (pivot)
                            i = 0
    
    j=2, nums[2]=1 (<=4): swap(nums[i+1], nums[j]), i++
    Swap(nums[1], nums[2]): [ 2,  1,  7,  6,  8,  5,  3,  4 ]
                                ^          ^                  ^
                               low         j                  high (pivot)
                               i = 1
    
    j=3, nums[3]=6 (>4): no swap
    Array:    [ 2,  1,  7,  6,  8,  5,  3,  4 ]
                                ^          ^                  ^
                              low          j                  high (pivot)
                              i = 1
    ... (continue until j reaches high-1)
    
    After loop, swap(nums[i+1], nums[high]): (pivot 4 moves to correct position)
    Assume i is at index 2 (after elements 2, 1, 3 are moved)
    [ 2,  1,  3,  7,  8,  5,  6,  4 ]
                   ^                  ^
                   i+1               high (pivot)
    Swap(nums[3], nums[7]):
    [ 2,  1,  3,  4,  8,  5,  6,  7 ]
                   ^
               Partition Index (pIdx) = 3
    
    Elements to the left of 4 are smaller, to the right are larger.
```

**Key Characteristics:**
*   **Time Complexity:**
    *   Average: O(N log N)
    *   Worst: O(N^2) (occurs with poor pivot selection, e.g., already sorted array and always picking first/last element as pivot). Randomized pivot selection helps mitigate this.
*   **Space Complexity:** O(log N) on average for recursion stack, O(N) in worst case.
*   **Stability:** Unstable.
*   **In-Place:** Yes, generally considered in-place.

**When to Use:**
*   Generally the fastest comparison-based sort for average cases.
*   When space complexity is a concern (due to its in-place nature).

## 3. Heap Sort

Heap Sort is a comparison-based sorting technique based on binary heap data structure. It's similar to selection sort where we first find the maximum element and place it at the end. We repeat the same process for the remaining elements.

**How it works:**
1.  **Build Max-Heap**: Transform the input array into a max-heap. In a max-heap, the largest element is at the root. This step takes O(N) time.
2.  **Sort Down**:
    *   Swap the root (largest element) with the last element of the heap.
    *   Reduce the size of the heap by 1.
    *   Heapify the new root to restore the max-heap property.
    *   Repeat until the heap size is 1.

**Visual Diagram (Max Heapify and Sort Down):**

```
    Initial Array: [12, 11, 13, 5, 6, 7]
    N = 6

    1. Build Max-Heap:
       (Start heapifying from last non-leaf node: index N/2 - 1 = 6/2 - 1 = 2 (value 13))
    
       [12, 11, 13, 5, 6, 7]
                 ^ (13) is child of 11, but 13 > 11. Swap.
    
       Heapify(arr, 6, 2): (13)
           13
          /  \
         5    6
    
    
       Heapify(arr, 6, 1): (11, children 5, 6) -> 11 is largest
           11
          /  \
         5    6
    
       Heapify(arr, 6, 0): (12, children 13, 7) -> 13 is largest. Swap.
           12  ->  13
          /  \    /  \
         13   7  12   7
        / \      / \
       5   6    5   6
    
    After building max-heap (conceptual): [13, 12, 7, 5, 6, 11] (array representation)
    
    2. Sort Down:
       a. Swap root (13) with last element (11). Heap size N=5.
          Array: [11, 12, 7, 5, 6, | 13]
          Heapify(arr, 5, 0): (11 is new root) -> 12 is largest. Swap.
          
              11  ->  12
             /  \    /  \
            12   7  11   7
           / \      / \
          5   6    5   6
          Array: [12, 11, 7, 5, 6, | 13]
       b. Swap root (12) with last element (6). Heap size N=4.
          Array: [6, 11, 7, 5, | 12, 13]
          Heapify(arr, 4, 0): (6 is new root) -> 11 is largest. Swap.
          Array: [11, 6, 7, 5, | 12, 13]
       ... and so on.
    
    Final sorted array: [5, 6, 7, 11, 12, 13]
```

**Key Characteristics:**
*   **Time Complexity:** O(N log N) in all cases (best, average, worst). Building the heap takes O(N), and N extractions (heapify operations) each take O(log N).
*   **Space Complexity:** O(1) as it is an in-place sorting algorithm.
*   **Stability:** Unstable.
*   **In-Place:** Yes.

**When to Use:**
*   When O(N log N) worst-case time complexity is required with O(1) auxiliary space.

## 4. QuickSelect (for Kth Largest Element)

QuickSelect is a selection algorithm to find the `k`-th smallest (or largest) element in an unordered list. It is a variation of Quick Sort.

**How it works:**
The core idea is the same as Quick Sort's partitioning, but instead of recursing on both sides of the pivot, it only recurses on the side that contains the element we're looking for.

To find the `k`-th largest element in an array of size `N`, we find the `(N - k)`-th smallest element (using 0-based indexing for "smallest").

1.  **Choose a Pivot**: Randomly select a pivot element (crucial for average-case O(N)).
2.  **Partition**: Partition the array around the pivot. Let the pivot's final sorted index be `pIdx`.
3.  **Compare and Recurse**:
    *   If `pIdx` is exactly the target index (`N - k` for k-th largest), then `nums[pIdx]` is our answer.
    *   If `pIdx < (N - k)`, the target element must be in the right sub-array (elements greater than the pivot). Recurse on the right side.
    *   If `pIdx > (N - k)`, the target element must be in the left sub-array (elements smaller than the pivot). Recurse on the left side.

**Example (Finding 2nd largest in `[3, 2, 1, 5, 6, 4]`, N=6, k=2. Target index = N-k = 6-2 = 4 (for 4th smallest)):**

```
    Array: [3, 2, 1, 5, 6, 4] , target index = 4
    
    1. Choose pivot (e.g., last element, 4). Partition:
       [3, 2, 1, 4, 6, 5]
                  ^
                  pIdx = 3
                  
    2. pIdx (3) < target index (4). Recurse on right subarray [6, 5].
       New array: [6, 5], target index (relative to original array) remains 4.
       Relative target index for [6,5] is 4 - (pIdx + 1) = 4 - (3 + 1) = 0.
       So, find 0th smallest in [6,5].
    
    3. Choose pivot (e.g., last element, 5). Partition:
       [5, 6]
        ^
        pIdx = 0
    
    4. pIdx (0) == relative target index (0). Element at pIdx, which is 5, is the answer.
```

**Key Characteristics:**
*   **Time Complexity:**
    *   Average: O(N) - Significantly faster than O(N log N) sorting.
    *   Worst: O(N^2) (occurs with poor pivot selection, though randomized pivot makes this rare).
*   **Space Complexity:** O(log N) on average for recursion stack, O(N) in worst case.

**When to Use:**
*   When only the `k`-th order statistic is needed, not the full sorted array.
*   For finding medians or specific percentiles.

## 5. Dutch National Flag Algorithm (for Sort Colors)

This algorithm is a three-way partitioning scheme, specifically designed to sort an array containing only three distinct values (like 0s, 1s, and 2s). It's a single-pass algorithm.

**How it works:**
It uses three pointers: `low`, `mid`, and `high`.
*   `low`: Points to the end of the 0s region. All elements before `low` (exclusive) are 0s.
*   `mid`: Points to the current element being examined.
*   `high`: Points to the beginning of the 2s region. All elements after `high` (exclusive) are 2s.

The algorithm maintains an invariant that:
*   `nums[0...low-1]` contains all 0s.
*   `nums[low...mid-1]` contains all 1s.
*   `nums[mid...high]` contains unknown elements.
*   `nums[high+1...N-1]` contains all 2s.

**Steps:**
1.  Initialize `low = 0`, `mid = 0`, `high = N - 1`.
2.  Iterate while `mid <= high`:
    *   If `nums[mid]` is `0`:
        *   Swap `nums[low]` and `nums[mid]`.
        *   Increment `low` and `mid`. (The element swapped into `mid` from `low` must be a 1 or 0, and if it's a 0 it's already handled, if it's a 1, `mid` would pass over it, which is correct).
    *   If `nums[mid]` is `1`:
        *   Increment `mid`. (It's in its correct place).
    *   If `nums[mid]` is `2`:
        *   Swap `nums[mid]` and `nums[high]`.
        *   Decrement `high`. (Crucially, `mid` is **not** incremented. The element swapped into `mid` from `high` could be 0, 1, or 2 and needs to be re-examined in the next iteration).

**Visual Diagram:**

```
    Array: [2, 0, 2, 1, 1, 0]
    Pointers: low=0, mid=0, high=5

    Iteration 1: nums[mid]=nums[0]=2
        Swap(nums[0], nums[5]): [0, 0, 2, 1, 1, 2]
        low=0, mid=0, high=4 (mid stays, new nums[0] needs checking)

    Iteration 2: nums[mid]=nums[0]=0
        Swap(nums[0], nums[0]): [0, 0, 2, 1, 1, 2] (no effective change)
        low=1, mid=1, high=4

    Iteration 3: nums[mid]=nums[1]=0
        Swap(nums[1], nums[1]): [0, 0, 2, 1, 1, 2]
        low=2, mid=2, high=4

    Iteration 4: nums[mid]=nums[2]=2
        Swap(nums[2], nums[4]): [0, 0, 1, 1, 2, 2]
        low=2, mid=2, high=3

    Iteration 5: nums[mid]=nums[2]=1
        mid=3
        low=2, mid=3, high=3

    Iteration 6: nums[mid]=nums[3]=1
        mid=4
        low=2, mid=4, high=3
        (Loop terminates as mid > high)

    Final Array: [0, 0, 1, 1, 2, 2]
```

**Key Characteristics:**
*   **Time Complexity:** O(N) - Single pass, each element visited a constant number of times.
*   **Space Complexity:** O(1) - In-place sorting.
*   **Stability:** Unstable (due to swaps).

**When to Use:**
*   When sorting elements with a small, fixed number of distinct values (especially 3).
*   For problems like partitioning arrays around a pivot into three sections (less than, equal to, greater than).

## 6. Counting Sort

Counting Sort is a non-comparison based sorting algorithm. It's efficient for sorting elements when the range of input numbers (`k`) is not significantly greater than the number of elements (`N`).

**How it works (for general integer sorting, adapted for `Sort Colors`):**
1.  **Count Frequencies**: Create a count array (or frequency map) to store the count of each unique element in the input array.
2.  **Cumulative Frequencies (Optional for `Sort Colors` simple variant)**: Modify the count array such that each element stores the sum of previous counts. This cumulative count indicates the actual position of the element in the output array.
3.  **Build Output Array**: Iterate through the input array from right to left (to maintain stability if needed). Place each element into its correct sorted position in an output array based on the cumulative counts, and decrement the count.

**How it works (Simplified for `Sort Colors` problem - two-pass):**
1.  **Count Frequencies**: Iterate through the input array and count the occurrences of 0s, 1s, and 2s. Store them in a small array `counts[3]`.
2.  **Overwrite Array**: Iterate through the input array's positions.
    *   Fill the first `counts[0]` positions with `0`.
    *   Then fill the next `counts[1]` positions with `1`.
    *   Finally, fill the remaining `counts[2]` positions with `2`.

**Example (`Sort Colors` simplified):**

```
    Array: [2, 0, 2, 1, 1, 0]

    1. Count Frequencies:
       counts[0] = 2 (two 0s)
       counts[1] = 2 (two 1s)
       counts[2] = 2 (two 2s)

    2. Overwrite Array:
       - Fill first 2 positions with 0: [0, 0, _, _, _, _]
       - Fill next 2 positions with 1: [0, 0, 1, 1, _, _]
       - Fill remaining 2 positions with 2: [0, 0, 1, 1, 2, 2]

    Final Array: [0, 0, 1, 1, 2, 2]
```

**Key Characteristics:**
*   **Time Complexity:** O(N + k), where `N` is the number of elements and `k` is the range of input values (max - min + 1). For `Sort Colors`, `k=3` (values 0, 1, 2), so it's O(N).
*   **Space Complexity:** O(k) for the count array. For `Sort Colors`, `k=3`, so O(1).
*   **Stability:** Can be implemented as stable (if using cumulative sums and iterating from right to left). The two-pass `Sort Colors` variant is not inherently stable in how elements are moved but produces the correct final order regardless.

**When to Use:**
*   When `k` (the range of numbers) is small relative to `N`.
*   For `Sort Colors`, it's a simple and effective O(N) solution.
```