# Sorting Algorithm Explanations

This document details the sorting algorithms implemented in this project.

## Merge Sort

**Algorithm:**

1. **Divide:** Recursively divide the unsorted array into halves until each subarray contains one element.
2. **Conquer:** Sort each one-element subarray (they are trivially sorted).
3. **Combine:** Repeatedly merge the subarrays to produce new sorted subarrays until there is only one sorted array remaining.

**Time Complexity:** O(n log n)
**Space Complexity:** O(n)  (due to recursive calls and merging)

**Diagram (ASCII Art - simplified):**

```
[8, 3, 1, 7, 0, 10, 2]
       |
[8, 3, 1, 7]   [0, 10, 2]
   |           |
[8, 3] [1, 7] [0, 10] [2]
 |     |     |     |
[8][3][1][7][0][10][2]  (Base case)
```


## Quick Sort  (Add similar explanation and diagrams for other algorithms like QuickSort and HeapSort)

...(Explanation, time/space complexity, diagram)...


## Heap Sort ...(Explanation, time/space complexity, diagram)...