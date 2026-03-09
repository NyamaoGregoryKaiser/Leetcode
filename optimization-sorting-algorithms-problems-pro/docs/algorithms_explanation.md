```markdown
# Sorting Algorithms: Detailed Explanations

This document provides in-depth explanations of various sorting algorithms implemented in this project, covering their working principles, complexities, and visual insights (where applicable using ASCII art).

---

## 1. Bubble Sort

### Concept
Bubble Sort is the simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. Elements "bubble up" to their correct position.

### How it Works
1.  Start at the beginning of the list.
2.  Compare the first two elements. If the first is greater than the second, swap them.
3.  Move to the next pair of elements (second and third) and repeat the comparison and swap.
4.  Continue this process until the end of the list. After the first pass, the largest element will be at the end.
5.  Repeat the entire process for the remaining `N-1` elements (excluding the last one which is now sorted).
6.  Each pass puts the next largest element in its correct place. The process stops when a pass completes with no swaps.

### Time Complexity
*   **Worst Case**: O(N^2) (e.g., a reverse sorted array). Each element might be compared and swapped multiple times.
*   **Average Case**: O(N^2)
*   **Best Case**: O(N) (if the array is already sorted, due to the `swapped` flag optimization, it completes in one pass).

### Space Complexity
*   **Auxiliary Space**: O(1) (it's an in-place sorting algorithm).

### Stability
*   **Stable**: Yes, it preserves the relative order of equal elements.

### ASCII Art (Example Pass)

Initial Array: `[ 5, 1, 4, 2, 8 ]`

**Pass 1:**
1.  Compare (5, 1): `[ 1, 5, 4, 2, 8 ]` (Swap 5 and 1)
2.  Compare (5, 4): `[ 1, 4, 5, 2, 8 ]` (Swap 5 and 4)
3.  Compare (5, 2): `[ 1, 4, 2, 5, 8 ]` (Swap 5 and 2)
4.  Compare (5, 8): `[ 1, 4, 2, 5, 8 ]` (No swap)
End of Pass 1: `[ 1, 4, 2, 5, 8 ]` (8 is now in its correct place)

**Pass 2:** (elements up to index 3)
1.  Compare (1, 4): `[ 1, 4, 2, 5, 8 ]` (No swap)
2.  Compare (4, 2): `[ 1, 2, 4, 5, 8 ]` (Swap 4 and 2)
3.  Compare (4, 5): `[ 1, 2, 4, 5, 8 ]` (No swap)
End of Pass 2: `[ 1, 2, 4, 5, 8 ]` (5 is now in its correct place)

And so on, until no swaps occur in a pass.

---

## 2. Selection Sort

### Concept
Selection Sort is an in-place comparison-based algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and puts it at the beginning of the sorted sublist.

### How it Works
1.  Start with the first element as the minimum (`minIdx`).
2.  Iterate through the *unsorted* portion of the array to find the true minimum element.
3.  Once the true minimum is found, swap it with the element at the current position (`i`).
4.  Increment `i` and repeat the process for the remaining unsorted portion.

### Time Complexity
*   **Worst Case**: O(N^2)
*   **Average Case**: O(N^2)
*   **Best Case**: O(N^2) (It always performs `N` passes, regardless of input order).

### Space Complexity
*   **Auxiliary Space**: O(1) (in-place sort).

### Stability
*   **Unstable**: No, it does not preserve the relative order of equal elements. If `[5a, 8, 5b]` and `5b` is swapped with an earlier minimum, `5a` and `5b` might change relative order.

### ASCII Art (Example Pass)

Initial Array: `[ 5, 1, 4, 2, 8 ]`

**Pass 1 (i=0):**
1.  Current minIdx = 0 (value 5).
2.  Scan from index 1:
    *   (1 < 5) => minIdx = 1 (value 1)
    *   (4 > 1) => minIdx = 1
    *   (2 > 1) => minIdx = 1
    *   (8 > 1) => minIdx = 1
3.  Found min = 1 at index 1. Swap `arr[0]` (5) with `arr[1]` (1).
Array: `[ 1, 5, 4, 2, 8 ]` (1 is now sorted)

**Pass 2 (i=1):**
1.  Current minIdx = 1 (value 5).
2.  Scan from index 2:
    *   (4 < 5) => minIdx = 2 (value 4)
    *   (2 < 4) => minIdx = 3 (value 2)
    *   (8 > 2) => minIdx = 3
3.  Found min = 2 at index 3. Swap `arr[1]` (5) with `arr[3]` (2).
Array: `[ 1, 2, 4, 5, 8 ]` (2 is now sorted)

And so on.

---

## 3. Insertion Sort

### Concept
Insertion Sort builds the final sorted array one item at a time. It iterates through the input array and removes one element at each iteration, finds the place where it belongs within the already sorted part of the array, and inserts it there.

### How it Works
1.  The first element is considered sorted.
2.  Take the next element (`currentVal`).
3.  Compare `currentVal` with elements in the sorted portion, moving elements greater than `currentVal` one position to the right to make space.
4.  Insert `currentVal` into its correct position.
5.  Repeat until all elements are processed.

### Time Complexity
*   **Worst Case**: O(N^2) (e.g., a reverse sorted array). Each element might need to be shifted across the entire sorted sublist.
*   **Average Case**: O(N^2)
*   **Best Case**: O(N) (if the array is already sorted, it only makes N comparisons without many shifts).

### Space Complexity
*   **Auxiliary Space**: O(1) (in-place sort).

### Stability
*   **Stable**: Yes, it preserves the relative order of equal elements because new elements are inserted *after* existing equal elements.

### ASCII Art (Example Pass)

Initial Array: `[ 5, 1, 4, 2, 8 ]`

**Iteration 1 (i=1, currentVal=1):**
1.  `[ 5, 1, 4, 2, 8 ]`
    `currentVal = 1`. Compare with `arr[0]` (5).
2.  `5 > 1`, so shift 5 to the right.
    `[ _ , 5, 4, 2, 8 ]` (gap at index 0)
3.  Insert `currentVal` (1) at index 0.
    `[ 1, 5, 4, 2, 8 ]` (sorted part: `[1, 5]`)

**Iteration 2 (i=2, currentVal=4):**
1.  `[ 1, 5, 4, 2, 8 ]`
    `currentVal = 4`. Compare with `arr[1]` (5).
2.  `5 > 4`, so shift 5 to the right.
    `[ 1, _ , 5, 2, 8 ]` (gap at index 1)
3.  Compare `currentVal` (4) with `arr[0]` (1).
    `1 < 4`, so 4 should be inserted after 1.
4.  Insert `currentVal` (4) at index 1.
    `[ 1, 4, 5, 2, 8 ]` (sorted part: `[1, 4, 5]`)

And so on.

---

## 4. Merge Sort

### Concept
Merge Sort is a highly efficient, general-purpose, comparison-based sorting algorithm. It's a divide-and-conquer algorithm. It recursively divides the array into two halves until it cannot be further divided (i.e., array with 0 or 1 element). Then, it merges the smaller sorted sub-arrays back together to form a larger sorted array.

### How it Works
1.  **Divide**: Continuously split the array into two halves until each sub-array contains only one element (a single element is considered sorted).
2.  **Conquer (Merge)**: Repeatedly merge these sub-arrays to produce new sorted sub-arrays. This merge step is where the actual sorting happens. When merging two sorted lists, compare their first elements, take the smaller one, and add it to the result. Repeat until one list is exhausted, then append the remaining elements of the other list.

### Time Complexity
*   **Worst Case**: O(N log N)
*   **Average Case**: O(N log N)
*   **Best Case**: O(N log N)
    *   The `log N` factor comes from the number of times the array is divided (like levels in a binary tree).
    *   The `N` factor comes from the merging step at each level, which requires iterating through all N elements.

### Space Complexity
*   **Auxiliary Space**: O(N) (for the temporary array used during the merge operation). This is a disadvantage compared to in-place algorithms.

### Stability
*   **Stable**: Yes, it can be implemented to preserve the relative order of equal elements.

### ASCII Art (Divide and Merge)

Initial Array: `[ 8, 3, 1, 5, 9, 2, 6, 4 ]`

**Divide Phase:**
```
[ 8, 3, 1, 5, 9, 2, 6, 4 ]
/                         \
[ 8, 3, 1, 5 ]            [ 9, 2, 6, 4 ]
/            \            /            \
[ 8, 3 ]     [ 1, 5 ]     [ 9, 2 ]     [ 6, 4 ]
/   \        /   \        /   \        /   \
[ 8 ] [ 3 ]  [ 1 ] [ 5 ]  [ 9 ] [ 2 ]  [ 6 ] [ 4 ]
```

**Merge Phase:**
```
[ 8 ] [ 3 ]  -> [ 3, 8 ]
[ 1 ] [ 5 ]  -> [ 1, 5 ]
[ 9 ] [ 2 ]  -> [ 2, 9 ]
[ 6 ] [ 4 ]  -> [ 4, 6 ]

Combining level 1 merges:
[ 3, 8 ]     [ 1, 5 ]     -> [ 1, 3, 5, 8 ]
[ 2, 9 ]     [ 4, 6 ]     -> [ 2, 4, 6, 9 ]

Combining level 2 merges (final step):
[ 1, 3, 5, 8 ] [ 2, 4, 6, 9 ] -> [ 1, 2, 3, 4, 5, 6, 8, 9 ]
```

---

## 5. Quick Sort

### Concept
Quick Sort is an efficient, in-place, comparison-based sorting algorithm. Like Merge Sort, it's a divide-and-conquer algorithm. It picks an element as a `pivot` and partitions the given array around the picked pivot.

### How it Works
1.  **Pick a Pivot**: Choose an element from the array to be the pivot. The choice of pivot heavily influences performance. Common strategies include:
    *   First/Last element (simple, but bad for sorted/reverse sorted arrays)
    *   Random element (mitigates worst-case)
    *   Median-of-three (picks median of first, middle, last elements for robustness) - *used in this implementation*.
2.  **Partition**: Rearrange the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side. After partitioning, the pivot is in its final sorted position.
3.  **Recurse**: Recursively apply Quick Sort to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

### Time Complexity
*   **Worst Case**: O(N^2) (if pivot selection consistently leads to unbalanced partitions, e.g., always picking the smallest/largest element).
*   **Average Case**: O(N log N)
*   **Best Case**: O(N log N)

### Space Complexity
*   **Auxiliary Space**: O(log N) on average (for the recursion stack). O(N) in the worst case (highly unbalanced partitions).

### Stability
*   **Unstable**: No, it generally does not preserve the relative order of equal elements because of the swaps during partitioning.

### ASCII Art (Partition Step)

Initial Array (low=0, high=7): `[ 7, 2, 1, 6, 8, 3, 5, 4 ]`
Let's choose `4` (last element) as pivot for simplicity in diagram.

**Partition Phase:**
Pivot = 4 (at index 7)
`i` (index of smaller element) = -1 (initially `low - 1`)
`j` (current element) = 0

`[ 7, 2, 1, 6, 8, 3, 5, 4 ]`
`i`
`j`

1.  `arr[0]` (7) > pivot (4). No swap. `j` moves.
2.  `arr[1]` (2) < pivot (4). `i` increments to 0. Swap `arr[0]` (7) and `arr[1]` (2).
    `[ 2, 7, 1, 6, 8, 3, 5, 4 ]`
    `   i`
    `     j`
3.  `arr[2]` (1) < pivot (4). `i` increments to 1. Swap `arr[1]` (7) and `arr[2]` (1).
    `[ 2, 1, 7, 6, 8, 3, 5, 4 ]`
    `      i`
    `        j`
4.  `arr[3]` (6) > pivot (4). No swap. `j` moves.
5.  `arr[4]` (8) > pivot (4). No swap. `j` moves.
6.  `arr[5]` (3) < pivot (4). `i` increments to 2. Swap `arr[2]` (7) and `arr[5]` (3).
    `[ 2, 1, 3, 6, 8, 7, 5, 4 ]`
    `         i`
    `               j`
7.  `arr[6]` (5) > pivot (4). No swap. `j` moves.
End of loop. `j` is at `high-1` (6).
Finally, swap `arr[i+1]` (arr[3], value 6) with `arr[high]` (arr[7], value 4).
    `[ 2, 1, 3, 4, 8, 7, 5, 6 ]`
    `         pivot (index 3)`

Result after partition:
`[ (2, 1, 3) ], 4, [ (8, 7, 5, 6) ]`
Now recursively sort the left and right sub-arrays.

---

## 6. Heap Sort

### Concept
Heap Sort is a comparison-based sorting technique based on the Binary Heap data structure. It's similar to selection sort where we find the maximum (or minimum) element and place it at the end (or beginning). However, Heap Sort uses a heap to find the maximum/minimum element efficiently, in `O(log N)` time.

### How it Works
1.  **Build Max Heap**: Transform the input array into a max-heap. A max-heap is a complete binary tree where every parent node is greater than or equal to its children. This step takes O(N) time.
2.  **Extract Max**: Repeatedly extract the maximum element (which is always the root of the heap) and place it at the end of the array. After extracting the root, replace it with the last element of the heap, reduce the heap size, and then "heapify" the new root to maintain the max-heap property. This step is repeated N times, each taking O(log N) time.

### Time Complexity
*   **Worst Case**: O(N log N)
*   **Average Case**: O(N log N)
*   **Best Case**: O(N log N)

### Space Complexity
*   **Auxiliary Space**: O(1) (in-place sort).

### Stability
*   **Unstable**: No, it generally does not preserve the relative order of equal elements because of swaps during heapify operations.

### ASCII Art (Heap Structure)

Example Array: `[ 8, 3, 1, 5, 9, 2, 6, 4 ]`

**Step 1: Build Max Heap**
(Conceptual view, not exactly array indices)

```
       9
     /   \
    8     6
   / \   / \
  5   3 2   1
 /
4
```
The array representation of this heap would be `[9, 8, 6, 5, 3, 2, 1, 4]`.

**Step 2: Extract Max & Heapify**

1.  Swap `9` (root) with `4` (last element). Array becomes `[4, 8, 6, 5, 3, 2, 1, 9]`.
    Now `9` is sorted at the end. Reduce heap size.
    Heap: `[4, 8, 6, 5, 3, 2, 1]`

2.  Heapify root (4):
    Root 4. Children 8 (L), 6 (R). Largest is 8. Swap 4 and 8.
    Heap: `[8, 4, 6, 5, 3, 2, 1]`
          `8`
        `/   \`
       `4`     `6`
      `/ \   /`
     `5`   `3 2`   `1`
    (4's new children are 5, 3. Largest 5. Swap 4 and 5.)
    Heap: `[8, 5, 6, 4, 3, 2, 1]`

    New Heap representation:
    ```
           8
         /   \
        5     6
       / \   / \
      4   3 2   1
    ```

3.  Swap `8` (root) with `1` (last element). Array becomes `[1, 5, 6, 4, 3, 2, 8, 9]`.
    Now `8` and `9` are sorted. Reduce heap size.
    Heap: `[1, 5, 6, 4, 3, 2]`

And so on, until the heap is empty.

---

## 7. Counting Sort

### Concept
Counting Sort is a non-comparison based integer sorting algorithm. It works by counting the number of occurrences of each distinct element in the input array. It's efficient for sorting data within a specific range.

### Constraints
*   Works only for non-negative integers.
*   The range of input numbers (`k`) should not be significantly larger than `N`, otherwise, it becomes inefficient in terms of space.

### How it Works
1.  **Find Max**: Determine the maximum element in the input array. This is needed to define the size of the `count` array.
2.  **Count Occurrences**: Create a `count` array (or frequency map) whose size is `max + 1`. Iterate through the input array and increment the count for each element found.
3.  **Modify Count Array (Cumulative Sum)**: Iterate through the `count` array, updating each element to be the sum of itself and all prior elements. This transforms `count[i]` to represent the *actual position* of element `i` in the output array.
4.  **Build Output Array**: Create an `output` array of the same size as the input. Iterate through the input array *from right to left* (this is crucial for stability):
    *   For each element `x`, find its position in the `output` array using `count[x] - 1`.
    *   Place `x` into `output[count[x] - 1]`.
    *   Decrement `count[x]` to handle duplicate elements correctly (the next `x` will go to the previous position).
5.  **Copy Back**: Copy the elements from the `output` array back into the original array.

### Time Complexity
*   **Worst Case**: O(N + K)
*   **Average Case**: O(N + K)
*   **Best Case**: O(N + K)
    *   `N` is the number of elements in the input array.
    *   `K` is the range of input numbers (max value - min value + 1, usually `max + 1` for non-negative).

### Space Complexity
*   **Auxiliary Space**: O(N + K) (for the `count` array and `output` array).

### Stability
*   **Stable**: Yes, if implemented by iterating from right to left when building the output array. This ensures elements with the same value retain their original relative order.

### ASCII Art (Example)

Initial Array: `[ 1, 4, 1, 2, 7, 5, 2 ]`
Max element = 7. So `count` array size = 8 (indices 0-7).

**1. Count Occurrences:**
`count = [ 0, 0, 0, 0, 0, 0, 0, 0 ]` (initialized to zeros)
Input: `1` -> `count[1]++`
Input: `4` -> `count[4]++`
...
After counting:
`count = [ 0, 2, 2, 0, 1, 1, 0, 1 ]`
Indexes:  `  0  1  2  3  4  5  6  7`

**2. Cumulative Count:**
`count[0] = 0`
`count[1] = count[0] + count[1] = 0 + 2 = 2`
`count[2] = count[1] + count[2] = 2 + 2 = 4`
`count[3] = count[2] + count[3] = 4 + 0 = 4`
`count[4] = count[3] + count[4] = 4 + 1 = 5`
`count[5] = count[4] + count[5] = 5 + 1 = 6`
`count[6] = count[5] + count[6] = 6 + 0 = 6`
`count[7] = count[6] + count[7] = 6 + 1 = 7`
Updated `count` array:
`count = [ 0, 2, 4, 4, 5, 6, 6, 7 ]`
Indexes:  `  0  1  2  3  4  5  6  7`

**3. Build Output Array (iterate input right-to-left):**
`output = [ _, _, _, _, _, _, _ ]` (size 7)

*   `arr[6] = 2`: `count[2]` is 4. `output[4-1] = output[3] = 2`. `count[2]` becomes 3.
    `output = [ _, _, _, 2, _, _, _ ]`
*   `arr[5] = 5`: `count[5]` is 6. `output[6-1] = output[5] = 5`. `count[5]` becomes 5.
    `output = [ _, _, _, 2, _, 5, _ ]`
*   `arr[4] = 7`: `count[7]` is 7. `output[7-1] = output[6] = 7`. `count[7]` becomes 6.
    `output = [ _, _, _, 2, _, 5, 7 ]`
*   `arr[3] = 2`: `count[2]` is 3. `output[3-1] = output[2] = 2`. `count[2]` becomes 2.
    `output = [ _, _, 2, 2, _, 5, 7 ]`
*   `arr[2] = 1`: `count[1]` is 2. `output[2-1] = output[1] = 1`. `count[1]` becomes 1.
    `output = [ _, 1, 2, 2, _, 5, 7 ]`
*   `arr[1] = 4`: `count[4]` is 5. `output[5-1] = output[4] = 4`. `count[4]` becomes 4.
    `output = [ _, 1, 2, 2, 4, 5, 7 ]`
*   `arr[0] = 1`: `count[1]` is 1. `output[1-1] = output[0] = 1`. `count[1]` becomes 0.
    `output = [ 1, 1, 2, 2, 4, 5, 7 ]`

**4. Copy Back:**
Original array becomes `[ 1, 1, 2, 2, 4, 5, 7 ]`

---

## 8. Radix Sort

### Concept
Radix Sort is a non-comparison based integer sorting algorithm. It sorts elements by processing individual digits. It works by distributing elements into buckets according to their radix (base) or digits.

### Constraints
*   Works only for integers (or data that can be mapped to integers).
*   Typically implemented for non-negative integers.

### How it Works
It processes numbers digit by digit, from the least significant digit (LSD) to the most significant digit (MSD). For each digit position, it uses a stable sorting algorithm (like Counting Sort) to sort the numbers based on that digit.

1.  **Find Max**: Determine the maximum element in the input array. This is needed to know the number of passes (number of digits in the largest number).
2.  **Iterate by Digit**:
    *   Start with `exp = 1` (for the units place, 10^0).
    *   Perform a stable sort (e.g., Counting Sort) on the input array based on the digit at the current `exp` position. (i.e., `(arr[i] / exp) % 10`).
    *   Multiply `exp` by 10 (to move to the tens place, hundreds place, etc.).
    *   Repeat until `max / exp` is 0 (meaning all digits of the largest number have been processed).

### Time Complexity
*   **Worst Case**: O(N * k)
*   **Average Case**: O(N * k)
*   **Best Case**: O(N * k)
    *   `N` is the number of elements.
    *   `k` is the number of digits in the maximum number (or maximum number of bits for a bit-wise radix sort).
    *   If `k` is considered constant (e.g., for fixed-size integers), then it's effectively O(N).

### Space Complexity
*   **Auxiliary Space**: O(N + B), where `B` is the base (e.g., 10 for decimal digits) for the buckets/count array used by the stable inner sort.

### Stability
*   **Stable**: Yes, because it relies on a stable sorting algorithm (like Counting Sort) for each digit pass.

### ASCII Art (Example)

Initial Array: `[ 170, 45, 75, 90, 802, 24, 2, 66 ]`
Max element = 802 (3 digits), so 3 passes needed.

**Pass 1: Sort by Units Digit (exp=1)**
Using Counting Sort (conceptually, not showing full process):
*   Units digits: 0 (170, 90), 5 (45, 75), 2 (802, 2), 4 (24), 6 (66)
Sorted by units digit: `[ 170, 90, 802, 2, 24, 45, 75, 66 ]` (Maintaining original order for same units digit)

**Pass 2: Sort by Tens Digit (exp=10)**
*   Tens digits: 7 (170, 75), 9 (90), 0 (802, 2), 2 (24), 4 (45), 6 (66)
Sorted by tens digit: `[ 802, 2, 24, 45, 66, 170, 75, 90 ]`

**Pass 3: Sort by Hundreds Digit (exp=100)**
*   Hundreds digits: 8 (802), 0 (all others less than 100), 1 (170)
Sorted by hundreds digit: `[ 2, 24, 45, 66, 75, 90, 170, 802 ]`

Final Sorted Array: `[ 2, 24, 45, 66, 75, 90, 170, 802 ]`

---
```