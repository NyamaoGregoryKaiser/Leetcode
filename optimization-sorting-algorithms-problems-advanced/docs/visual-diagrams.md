# Visual Diagrams (ASCII Art)

This document provides ASCII art diagrams to help visualize the working principles of some core sorting algorithms and related concepts.

---

## 1. Merge Sort: Divide and Conquer

Merge Sort works by recursively dividing the array into halves until individual elements are reached, then merging them back in sorted order.

```
Initial Array: [38, 27, 43, 3, 9, 82, 10]

Step 1: Divide
                               [38, 27, 43, 3, 9, 82, 10]
                               /                       \
                      [38, 27, 43, 3]             [9, 82, 10]
                      /           \               /         \
                 [38, 27]       [43, 3]        [9, 82]      [10]
                 /    \         /    \         /    \
               [38]   [27]    [43]   [3]      [9]   [82]

Step 2: Merge (Conquer)
               [27, 38]       [3, 43]        [9, 82]      [10]
                      \           /               \         /
                      [3, 27, 38, 43]             [9, 10, 82]
                               \                       /
                               [3, 9, 10, 27, 38, 43, 82]

Sorted Array: [3, 9, 10, 27, 38, 43, 82]
```

---

## 2. Quick Sort: Partitioning

Quick Sort's efficiency largely depends on its `partition` step, which rearranges elements around a chosen pivot. Here, we demonstrate Lomuto's Partition scheme where the last element is chosen as the pivot.

```
Initial Array: [10, 80, 30, 90, 40, 50, 70]
Pivot = 70 (last element)
'i' tracks the boundary of elements <= pivot
'j' iterates through the array

[10, 80, 30, 90, 40, 50, 70]
 ^i  ^j (arr[j] = 10 <= 70) => swap(arr[i], arr[j]); i++
[10, 80, 30, 90, 40, 50, 70]
  ^i  ^j (arr[j] = 80 > 70) => j++
[10, 80, 30, 90, 40, 50, 70]
  ^i      ^j (arr[j] = 30 <= 70) => swap(arr[i], arr[j]); i++
[10, 30, 80, 90, 40, 50, 70]
      ^i      ^j (arr[j] = 90 > 70) => j++
[10, 30, 80, 90, 40, 50, 70]
      ^i          ^j (arr[j] = 40 <= 70) => swap(arr[i], arr[j]); i++
[10, 30, 40, 90, 80, 50, 70]
         ^i          ^j (arr[j] = 50 <= 70) => swap(arr[i], arr[j]); i++
[10, 30, 40, 50, 80, 90, 70]
             ^i              ^j (end of loop, j is at pivot - 1)

Finally, swap pivot (arr[high]) with arr[i]:
[10, 30, 40, 50, 70, 90, 80]
             ^i  ^pivot (swap arr[i] with arr[high])

Partitioned Array: [10, 30, 40, 50, 70, 90, 80]
                                 ^ Pivot is now in its correct position.
Elements to the left are <= 70. Elements to the right are > 70.
Recursively sort [10, 30, 40, 50] and [90, 80].
```

---

## 3. Heap Sort: Heapify and Extract Max

Heap Sort builds a Max-Heap from the array, then repeatedly extracts the maximum element (root) and places it at the end of the sorted portion.

```
Initial Array: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7] (index 0-9)

Step 1: Build Max-Heap (visualizing as a tree)
A max-heap ensures parent >= children.
Let's simplify with the array representation after building:
[16, 14, 10, 8, 7, 9, 3, 2, 4, 1]

Heap (array representation):
    16 (0)
   /  \
  14   10 (1, 2)
 / \   / \
8   7 9   3 (3, 4, 5, 6)
/ \ /
2  4 1 (7, 8, 9)

Step 2: Extract Max and Heapify
Loop for i from n-1 down to 1:
1. Swap arr[0] (max) with arr[i] (last element of current heap).
2. Reduce heap size.
3. Call heapify on the new root (index 0).

Example - First Iteration (i = 9):
1. Swap 16 (arr[0]) and 1 (arr[9]):
   Array: [1, 14, 10, 8, 7, 9, 3, 2, 4, | 16] (16 is now sorted)
2. Heap size = 9.
3. Heapify arr[0] (which is 1):
   1 is smaller than its children (14, 10).
   Swap 1 with 14:
   Array: [14, 1, 10, 8, 7, 9, 3, 2, 4, | 16]
   Now 1 is at index 1. Its children are 8, 7.
   Swap 1 with 8:
   Array: [14, 8, 10, 1, 7, 9, 3, 2, 4, | 16]
   (Simplified: This process continues until 1 sinks to its correct place, and 14 bubbles up)
   Heap after heapify(0):
   [14, 8, 10, 4, 7, 9, 3, 2, 1, | 16] (This is the new heap)

Repeat this process. In each step, the largest remaining element moves to its sorted position at the end of the array.
```

---

## 4. Dutch National Flag Problem (Sort Colors)

This problem partitions an array of 0s, 1s, and 2s into three sections in a single pass.

```
Array: [2, 0, 2, 1, 1, 0]
Pointers:
  low  = 0 (boundary for 0s)
  mid  = 0 (current element being examined)
  high = 5 (boundary for 2s)

Initial:
[2, 0, 2, 1, 1, 0]
 ^low
 ^mid
         ^high

Iteration 1: mid = 0, arr[mid] = 2
  arr[mid] is 2, swap with arr[high], high--
[2, 0, 2, 1, 1, 0]  (swap arr[0] and arr[5])
[0, 0, 2, 1, 1, 2]
 ^low
 ^mid
       ^high

Iteration 2: mid = 0, arr[mid] = 0
  arr[mid] is 0, swap with arr[low], low++, mid++
[0, 0, 2, 1, 1, 2]  (arr[0] is already 0, so effectively no change but pointers move)
   ^low
   ^mid
       ^high

Iteration 3: mid = 1, arr[mid] = 0
  arr[mid] is 0, swap with arr[low], low++, mid++
[0, 0, 2, 1, 1, 2]
     ^low
     ^mid
       ^high

Iteration 4: mid = 2, arr[mid] = 2
  arr[mid] is 2, swap with arr[high], high--
[0, 0, 1, 1, 2, 2]  (swap arr[2] and arr[4])
     ^low
     ^mid
     ^high

Iteration 5: mid = 2, arr[mid] = 1
  arr[mid] is 1, mid++
[0, 0, 1, 1, 2, 2]
     ^low
       ^mid
     ^high

Iteration 6: mid = 3, arr[mid] = 1
  arr[mid] is 1, mid++
[0, 0, 1, 1, 2, 2]
     ^low
         ^mid
     ^high

mid (4) is now > high (3). Loop terminates.

Sorted Array: [0, 0, 1, 1, 2, 2]
```
---