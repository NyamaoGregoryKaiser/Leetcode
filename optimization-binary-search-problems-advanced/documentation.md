# Binary Search Algorithm

**Algorithm Explanation:**

Binary search is an efficient algorithm for finding a target value within a *sorted* array. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the lower half; otherwise, it continues in the upper half.  This process repeats until the target is found or the search interval is empty.

**Visual Diagram (ASCII Art):**

```
[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]  Target: 23

          ^
          |
      [mid]

Left: 0, Right: 9
... (Iterations until target is found at index 6) ...
```


**Edge Cases and Gotchas:**

* **Unsorted array:** Binary search only works on sorted arrays.
* **Duplicate values:**  Standard binary search might not find the first or last occurrence of a duplicate value.  Modifications are needed for that (see `firstOccurrence` and `lastOccurrence` functions).
* **Empty array:** Handle the case where the input array is empty.
* **Target not found:** The algorithm should return a value (e.g., -1) to indicate that the target was not found.


**Interview Tips and Variations:**

* Be prepared to discuss the algorithm's time and space complexity.
* Be ready to explain variations like finding the first/last occurrence or searching in a rotated sorted array.
* Consider discussing iterative vs. recursive implementations and their tradeoffs.