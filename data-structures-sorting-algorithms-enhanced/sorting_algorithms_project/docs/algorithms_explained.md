# Sorting Algorithms Explained

This document provides a detailed explanation of common sorting algorithms, including their working principles, time/space complexity, stability, and illustrative ASCII diagrams.

---

## 1. Bubble Sort

**Concept:** Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. Larger elements "bubble" to the end of the list.

**How it Works (Pass 1 example):**
Array: `[5, 1, 4, 2, 8]`

1.  Compare 5 and 1: `(5 > 1)` -> Swap. Array: `[1, 5, 4, 2, 8]`
2.  Compare 5 and 4: `(5 > 4)` -> Swap. Array: `[1, 4, 5, 2, 8]`
3.  Compare 5 and 2: `(5 > 2)` -> Swap. Array: `[1, 4, 2, 5, 8]`
4.  Compare 5 and 8: `(5 < 8)` -> No swap. Array: `[1, 4, 2, 5, 8]`
    *At the end of Pass 1, 8 (the largest) is in its correct position.*

**ASCII Diagram:**

```
Initial:   [ 5, 1, 4, 2, 8 ]
Pass 1:
(5,1)swap  [ 1, 5, 4, 2, 8 ]
(5,4)swap  [ 1, 4, 5, 2, 8 ]
(5,2)swap  [ 1, 4, 2, 5, 8 ]
(5,8)no    [ 1, 4, 2, 5, 8 ] [8 is sorted]
Pass 2:
(1,4)no    [ 1, 4, 2, 5, 8 ]
(4,2)swap  [ 1, 2, 4, 5, 8 ]
(4,5)no    [ 1, 2, 4, 5, 8 ] [5 is sorted]
Pass 3:
(1,2)no    [ 1, 2, 4, 5, 8 ]
(2,4)no    [ 1, 2, 4, 5, 8 ] [4 is sorted]
... (further passes will find no swaps, so algorithm can stop early)
Final:     [ 1, 2, 4, 5, 8 ]
```

**Complexity:**
*   **Time:** O(n^2) (Worst and Average), O(n) (Best - if optimized for early exit)
*   **Space:** O(1) (In-place)
*   **Stability:** Stable

**Edge Cases & Gotchas:**
*   **Already Sorted:** With the early exit optimization, it's O(n). Without it, still O(n^2).
*   **Reverse Sorted:** Worst case, O(n^2).
*   **Duplicates:** Handles them correctly and maintains relative order.

---

## 2. Selection Sort

**Concept:** Selection Sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from the unsorted part and putting it at the beginning of the unsorted part. It maintains two subarrays: one sorted, one unsorted.

**How it Works (example):**
Array: `[64, 25, 12, 22, 11]`

1.  **Pass 1:**
    *   Find minimum in `[64, 25, 12, 22, 11]` -> `11` (at index 4)
    *   Swap `11` with `64` (at index 0). Array: `[11, 25, 12, 22, 64]`
2.  **Pass 2:**
    *   Find minimum in `[25, 12, 22, 64]` -> `12` (at index 2 of original, now index 1 of unsorted)
    *   Swap `12` with `25`. Array: `[11, 12, 25, 22, 64]`
3.  ... and so on.

**ASCII Diagram:**

```
Initial:   [ 64, 25, 12, 22, 11 ]
           ^   ^   ^   ^   ^
Pass 1: (min=11 at idx 4)
           [ 11, 25, 12, 22, 64 ]
             ^   ^   ^   ^   ^
Pass 2: (min=12 at idx 2)
           [ 11, 12, 25, 22, 64 ]
                 ^   ^   ^   ^
Pass 3: (min=22 at idx 3)
           [ 11, 12, 22, 25, 64 ]
                     ^   ^   ^
Pass 4: (min=25 at idx 4)
           [ 11, 12, 22, 25, 64 ]
                         ^   ^
Final:     [ 11, 12, 22, 25, 64 ]
```

**Complexity:**
*   **Time:** O(n^2) (Worst, Average, Best) - Always performs n-1 swaps and n(n-1)/2 comparisons.
*   **Space:** O(1) (In-place)
*   **Stability:** Unstable

**Edge Cases & Gotchas:**
*   **Duplicates:** Does not maintain relative order of equal elements. Example: `[5a, 8, 5b, 2]` -> `[2, 5b, 8, 5a]`.
*   **Performance:** While O(n^2), it performs fewer swaps than Bubble Sort, which might be beneficial if writes are expensive.

---

## 3. Insertion Sort

**Concept:** Insertion Sort builds the final sorted array one item at a time. It iterates through the input array and, for each element, finds its correct position within the already sorted part of the array and inserts it there.

**How it Works (example):**
Array: `[12, 11, 13, 5, 6]`

1.  `[12]` (Sorted part is `[12]`)
2.  Take `11`. `11 < 12`. Shift `12` right. Insert `11`. Array: `[11, 12, 13, 5, 6]` (Sorted part `[11, 12]`)
3.  Take `13`. `13 > 12`. No shift. Array: `[11, 12, 13, 5, 6]` (Sorted part `[11, 12, 13]`)
4.  Take `5`. `5 < 13`, `5 < 12`, `5 < 11`. Shift `13`, `12`, `11` right. Insert `5`. Array: `[5, 11, 12, 13, 6]` (Sorted part `[5, 11, 12, 13]`)
5.  ... and so on.

**ASCII Diagram:**

```
Initial:   [ 12, 11, 13, 5, 6 ]
Sorted:    [ 12 ]
Iter 1 (11):
  11 < 12. Move 12. Insert 11.
           [ 11, 12, 13, 5, 6 ]
           <--Sorted-->
Iter 2 (13):
  13 > 12. No move. Insert 13.
           [ 11, 12, 13, 5, 6 ]
           <-----Sorted----->
Iter 3 (5):
  5 < 13. Move 13.
  5 < 12. Move 12.
  5 < 11. Move 11. Insert 5.
           [ 5, 11, 12, 13, 6 ]
           <-------Sorted------->
Iter 4 (6):
  6 < 13. Move 13.
  6 < 12. Move 12.
  6 < 11. Move 11.
  6 > 5. Stop. Insert 6.
           [ 5, 6, 11, 12, 13 ]
           <----------Sorted---------->
Final:     [ 5, 6, 11, 12, 13 ]
```

**Complexity:**
*   **Time:** O(n^2) (Worst and Average), O(n) (Best - if nearly or fully sorted)
*   **Space:** O(1) (In-place)
*   **Stability:** Stable

**Edge Cases & Gotchas:**
*   **Small datasets or nearly sorted data:** Very efficient, often outperforming O(n log n) sorts due to smaller constant factors.
*   **Large, unsorted data:** Performs poorly.

---

## 4. Merge Sort

**Concept:** Merge Sort is a divide-and-conquer algorithm. It works by recursively breaking down an array into two or more subarrays until each subarray contains only one element (which is by definition sorted). Then, these subarrays are merged back together in a sorted manner.

**How it Works (example):**
Array: `[38, 27, 43, 3, 9, 82, 10]`

1.  **Divide:** Recursively split the array in half until individual elements.
    `[38, 27, 43, 3, 9, 82, 10]`
    `[38, 27, 43], [3, 9, 82, 10]`
    `[38], [27, 43]`, `[3, 9], [82, 10]`
    `[38], [27], [43]`, `[3], [9], [82], [10]`
2.  **Conquer (Merge):** Merge sorted subarrays.
    `[27, 38], [43]` -> `[27, 38, 43]`
    `[3, 9], [10, 82]` -> `[3, 9, 10, 82]`
    `[27, 38, 43], [3, 9, 10, 82]` -> `[3, 9, 10, 27, 38, 43, 82]`

**ASCII Diagram:**

```
Array: [38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3]         [9, 82, 10]
[38, 27] [43, 3]        [9, 82] [10]
[38] [27] [43] [3]      [9] [82] [10]

Merge:
[27, 38] [3, 43]        [9, 82] [10]
[3, 27, 38, 43]         [9, 10, 82]
[3, 9, 10, 27, 38, 43, 82]
```

**Complexity:**
*   **Time:** O(n log n) (Worst, Average, Best)
*   **Space:** O(n) (Due to temporary arrays created during merge)
*   **Stability:** Stable

**Edge Cases & Gotchas:**
*   **Recursive Depth:** Can lead to stack overflow for very large arrays if not implemented iteratively.
*   **Space:** The O(n) space complexity is its main drawback compared to in-place sorts like Quick Sort or Heap Sort. True in-place merge sort is possible but very complex and usually slower.

---

## 5. Quick Sort

**Concept:** Quick Sort is a highly efficient, in-place, comparison-based sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

**How it Works (Lomuto Partition example):**
Array: `[10, 80, 30, 90, 40, 50, 70]`
Pivot: `70` (last element)

1.  **Partition:** Rearrange elements such that elements smaller than 70 are on its left, and larger elements on its right.
    `[10, 30, 40, 50, 70, 90, 80]` (70 is now in its sorted position)
2.  **Recursively Sort:**
    *   Left subarray: `[10, 30, 40, 50]`
    *   Right subarray: `[90, 80]`

**ASCII Diagram (Lomuto Partition, pivot = last element):**

```
Array: [10, 80, 30, 90, 40, 50, 70]
Low=0, High=6. Pivot = arr[6] = 70.
i=-1

j=0 (arr[0]=10) <= 70: i=0, swap(arr[0],arr[0]) -> [10, 80, 30, 90, 40, 50, 70]
j=1 (arr[1]=80) > 70: No swap.
j=2 (arr[2]=30) <= 70: i=1, swap(arr[1],arr[2]) -> [10, 30, 80, 90, 40, 50, 70]
j=3 (arr[3]=90) > 70: No swap.
j=4 (arr[4]=40) <= 70: i=2, swap(arr[2],arr[4]) -> [10, 30, 40, 90, 80, 50, 70]
j=5 (arr[5]=50) <= 70: i=3, swap(arr[3],arr[5]) -> [10, 30, 40, 50, 80, 90, 70]

End of loop. Swap pivot (arr[6]=70) with arr[i+1] (arr[4]=80)
           [10, 30, 40, 50, 70, 90, 80]
Partition index (pivot's final position) = 4

Recursive calls:
QuickSort([10, 30, 40, 50], 0, 3)
QuickSort([90, 80], 5, 6)
```

**Complexity:**
*   **Time:** O(n log n) (Average and Best), O(n^2) (Worst - poor pivot choice)
*   **Space:** O(log n) (Average - for recursion stack), O(n) (Worst - unbalanced partitions)
*   **Stability:** Unstable

**Edge Cases & Gotchas:**
*   **Pivot Choice:** Critical for performance. Random pivot or median-of-three can mitigate worst-case scenarios.
*   **Already Sorted/Reverse Sorted:** Can lead to O(n^2) if pivot choice is naive (e.g., always first/last element).
*   **Duplicates:** Can impact performance slightly depending on partition scheme. Hoare's partition is often better with duplicates.

---

## 6. Heap Sort

**Concept:** Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It's an in-place algorithm that has a time complexity of O(n log n) in all cases (worst, average, and best).

**How it Works:**

1.  **Build a Max-Heap:** Transform the input array into a max-heap. In a max-heap, the largest element is at the root. This step takes O(n) time.
2.  **Extract Elements:**
    *   Swap the root (largest element) with the last element of the heap.
    *   Reduce the size of the heap by one (effectively "removing" the largest element from the heap part).
    *   Heapify the new root. This re-establishes the max-heap property.
    *   Repeat until the heap size is 1.

**ASCII Diagram:**

```
Array: [4, 10, 3, 5, 1] (size N=5)

1. Build Max-Heap:
   Start from last non-leaf node (index N/2 - 1 = 1).
   _heapify(arr, 5, 1):
     arr[1]=10 (parent), children arr[3]=5, arr[4]=1. 10 is largest. No change.
     [4, 10, 3, 5, 1]

   _heapify(arr, 5, 0):
     arr[0]=4 (parent), children arr[1]=10, arr[2]=3. 10 is largest. Swap 4 and 10.
     [10, 4, 3, 5, 1]
     Now arr[0] is 10. New child at index 1 is 4. Need to heapify subtree at index 1.
     _heapify(arr, 5, 1):
       arr[1]=4 (parent), children arr[3]=5, arr[4]=1. 5 is largest. Swap 4 and 5.
       [10, 5, 3, 4, 1]
       Now arr[1] is 5. New child at index 3 is 4. No children for 4. Stop.

   Max-Heap Built: [10, 5, 3, 4, 1]

2. Extract elements:
   i = 4 (N-1): Swap arr[0] (10) with arr[4] (1). Heap size = 4.
     [1, 5, 3, 4, 10] (10 is sorted)
     _heapify(arr, 4, 0):
       arr[0]=1. children arr[1]=5, arr[2]=3. 5 is largest. Swap 1 and 5.
       [5, 1, 3, 4, 10]
       _heapify(arr, 4, 1):
         arr[1]=1. children arr[3]=4. 4 is largest. Swap 1 and 4.
         [5, 4, 3, 1, 10]
         _heapify(arr, 4, 3): no children.

   i = 3: Swap arr[0] (5) with arr[3] (1). Heap size = 3.
     [1, 4, 3, 5, 10] (5 is sorted)
     _heapify(arr, 3, 0):
       arr[0]=1. children arr[1]=4, arr[2]=3. 4 is largest. Swap 1 and 4.
       [4, 1, 3, 5, 10]
       _heapify(arr, 3, 1):
         arr[1]=1. children arr[2]=3. 3 is largest. Swap 1 and 3.
         [4, 3, 1, 5, 10]
         _heapify(arr, 3, 2): no children.

   i = 2: Swap arr[0] (4) with arr[2] (1). Heap size = 2.
     [1, 3, 4, 5, 10] (4 is sorted)
     _heapify(arr, 2, 0):
       arr[0]=1. children arr[1]=3. 3 is largest. Swap 1 and 3.
       [3, 1, 4, 5, 10]
       _heapify(arr, 2, 1): no children.

   i = 1: Swap arr[0] (3) with arr[1] (1). Heap size = 1.
     [1, 3, 4, 5, 10] (3 is sorted)
     Heap size is 1, loop ends.

Final Sorted Array: [1, 3, 4, 5, 10]
```

**Complexity:**
*   **Time:** O(n log n) (Worst, Average, Best) - Building heap O(n), N extractions each O(log n).
*   **Space:** O(1) (In-place)
*   **Stability:** Unstable

**Edge Cases & Gotchas:**
*   **Duplicates:** Handled correctly, but relative order is not preserved.
*   **Implementation:** Correctly implementing `heapify` and ensuring correct indices for children and parent in the array representation is key.
*   **Performance:** Consistent O(n log n), but often has larger constant factors than Quick Sort in practice.

---
```