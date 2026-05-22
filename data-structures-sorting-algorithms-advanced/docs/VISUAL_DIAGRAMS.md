```markdown
# Sorting Algorithms: Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the internal workings of some key sorting algorithms and interview problems.

---

## 1. Merge Sort: Divide and Conquer

Merge sort visually demonstrates the "divide and conquer" paradigm.

```
Initial Array: [38, 27, 43, 3, 9, 82, 10]

Step 1: Divide (Recursively split the array in half)
       [38, 27, 43, 3, 9, 82, 10]
           /                 \
    [38, 27, 43, 3]       [9, 82, 10]
      /         \           /     \
  [38, 27]    [43, 3]     [9, 82]   [10]
    /   \     /   \     /   \
  [38] [27] [43] [3]   [9] [82]

Step 2: Conquer & Combine (Merge sorted subarrays)
  [38] [27] -> [27, 38]
  [43] [3]  -> [3, 43]
  [9] [82] -> [9, 82]

       [27, 38]    [3, 43]     [9, 82]   [10]
            \       /             \       /
         [3, 27, 38, 43]      [9, 10, 82]
               \             /
          [3, 9, 10, 27, 38, 43, 82] (Final Sorted Array)
```

**Explanation**:
Each pair of single-element arrays (which are trivially sorted) is merged into a sorted two-element array. These two-element arrays are then merged into sorted four-element arrays, and so on, until the entire original array is sorted. The crucial part is the `merge` operation, which takes two sorted lists and efficiently combines them.

---

## 2. Quick Sort: Partitioning (Lomuto Scheme)

The core of Quick Sort is the partitioning step. Here, we illustrate the Lomuto partition scheme where the last element is chosen as the pivot.

```
Array: [7, 2, 1, 6, 8, 5, 3, 4]
Pivot: 4 (last element)
Initial: low=0, high=7, pivot_value=4

Iteration 1 (j=0, arr[0]=7): 7 > 4. No swap. i=-1.
[7, 2, 1, 6, 8, 5, 3, 4]
 ^ j

Iteration 2 (j=1, arr[1]=2): 2 <= 4. Increment i. Swap arr[0] and arr[1].
i=0
[2, 7, 1, 6, 8, 5, 3, 4]
   ^ j

Iteration 3 (j=2, arr[2]=1): 1 <= 4. Increment i. Swap arr[1] and arr[2].
i=1
[2, 1, 7, 6, 8, 5, 3, 4]
      ^ j

Iteration 4 (j=3, arr[3]=6): 6 > 4. No swap.
[2, 1, 7, 6, 8, 5, 3, 4]
         ^ j

Iteration 5 (j=4, arr[4]=8): 8 > 4. No swap.
[2, 1, 7, 6, 8, 5, 3, 4]
            ^ j

Iteration 6 (j=5, arr[5]=5): 5 > 4. No swap.
[2, 1, 7, 6, 8, 5, 3, 4]
               ^ j

Iteration 7 (j=6, arr[6]=3): 3 <= 4. Increment i. Swap arr[2] and arr[6].
i=2
[2, 1, 3, 6, 8, 5, 7, 4]
                  ^ j
                     (Loop ends as j reaches high-1)

Final step: Swap pivot (arr[high]=4) with arr[i+1]=arr[3]=6.
i+1 = 3
[2, 1, 3, 4, 8, 5, 7, 6]
         ^ pivot in final position

Resulting array after partition:
[2, 1, 3]  < Pivot (4) >  [8, 5, 7, 6]
Sub-array 1              Sub-array 2

Pivot's final index is 3. The algorithm then recursively sorts the subarrays.
```

**Explanation**:
The Lomuto partition maintains an `i` pointer that tracks the boundary between elements less than or equal to the pivot and elements greater than the pivot. `j` iterates through the array. If `arr[j]` is smaller than the pivot, `i` is incremented, and `arr[j]` is swapped with `arr[i]`. Finally, the pivot is swapped with `arr[i+1]` to place it in its correct sorted position.

---

## 3. Sort Colors (Dutch National Flag Algorithm): One-Pass

This algorithm uses three pointers to sort an array of 0s, 1s, and 2s in a single pass.

```
Initial Array: [2, 0, 2, 1, 1, 0]
Pointers:
  low = 0 (boundary for 0s)
  mid = 0 (current element being examined)
  high = 5 (boundary for 2s)

Iteration 1: mid=0, arr[mid]=2
  - arr[mid] is 2. Swap arr[mid] with arr[high]. Decrement high.
  Array: [2, 0, 2, 1, 1, 2]
             ^      ^    ^
           mid      high
  (mid stays at 0, because the new arr[mid] needs to be re-evaluated)

Iteration 2: mid=0, arr[mid]=2 (again)
  - arr[mid] is 2. Swap arr[mid] with arr[high]. Decrement high.
  Array: [1, 0, 2, 1, 2, 2]
             ^   ^    ^
           mid   high
  (mid stays at 0)

Iteration 3: mid=0, arr[mid]=1
  - arr[mid] is 1. Increment mid.
  Array: [1, 0, 2, 1, 2, 2]
                ^ ^
              low mid high

Iteration 4: mid=1, arr[mid]=0
  - arr[mid] is 0. Swap arr[mid] with arr[low]. Increment low and mid.
  Array: [0, 1, 2, 1, 2, 2]
             ^   ^
           low mid high

Iteration 5: mid=2, arr[mid]=2
  - arr[mid] is 2. Swap arr[mid] with arr[high]. Decrement high.
  Array: [0, 1, 1, 2, 2, 2]
                 ^   ^
               low mid high
  (mid stays at 2)

Iteration 6: mid=2, arr[mid]=1 (after swap)
  - arr[mid] is 1. Increment mid.
  Array: [0, 1, 1, 2, 2, 2]
                     ^
                   low/mid (now 3) high (now 3)

Iteration 7: mid=3, high=3. mid <= high condition is true. arr[mid]=2.
  - arr[mid] is 2. Swap arr[mid] with arr[high]. Decrement high.
  Array: [0, 1, 1, 2, 2, 2]
                       ^
                     low/mid (now 3) high (now 2)
  (mid stays at 3)

Loop terminates: mid (3) is now > high (2).

Final Sorted Array: [0, 1, 1, 2, 2, 2]
```

**Explanation**:
*   `low` points to the last known 0. Elements `[0...low-1]` are 0s.
*   `high` points to the first known 2. Elements `[high+1...N-1]` are 2s.
*   `mid` scans the array.
    *   If `arr[mid]` is 0, it belongs in the `0` section. Swap `arr[mid]` with `arr[low]`, then move both `low` and `mid` forward.
    *   If `arr[mid]` is 1, it's in its correct relative place. Just move `mid` forward.
    *   If `arr[mid]` is 2, it belongs in the `2` section. Swap `arr[mid]` with `arr[high]`, then move `high` backward. `mid` is not incremented because the element swapped into `arr[mid]` might be a 0 or 1, which needs further processing.

---
```