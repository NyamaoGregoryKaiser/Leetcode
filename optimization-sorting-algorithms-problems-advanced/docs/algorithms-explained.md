# Algorithms Explained

This document provides a detailed explanation of the sorting algorithms implemented in this project, covering their core logic, characteristics, and complexity analysis.

---

## 1. Bubble Sort

*   **Concept**: Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.
*   **Mechanism**:
    1.  Start from the first element.
    2.  Compare the current element with the next element.
    3.  If the current element is greater than the next, swap them.
    4.  Move to the next pair.
    5.  Repeat this process for `n-1` passes. In each pass, the largest unsorted element "bubbles" up to its correct position at the end of the unsorted portion.
*   **Example (Pass 1)**: `[5, 1, 4, 2, 8]`
    *   `(5, 1)` -> `[1, 5, 4, 2, 8]` (swap)
    *   `(5, 4)` -> `[1, 4, 5, 2, 8]` (swap)
    *   `(5, 2)` -> `[1, 4, 2, 5, 8]` (swap)
    *   `(5, 8)` -> `[1, 4, 2, 5, 8]` (no swap)
    *   End of Pass 1: `[1, 4, 2, 5, 8]` (8 is in its final position)
*   **Optimizations**: An optimization exists to stop early if a pass completes without any swaps.
*   **Characteristics**:
    *   **In-place**: Yes.
    *   **Stable**: Yes (if comparison `>` is used).
*   **Complexity**:
    *   **Time**:
        *   Worst Case: O(N^2) (e.g., reverse sorted array)
        *   Average Case: O(N^2)
        *   Best Case: O(N) (if already sorted and optimized to stop early)
    *   **Space**: O(1) auxiliary space.

---

## 2. Merge Sort

*   **Concept**: Merge Sort is a divide-and-conquer algorithm. It divides the unsorted list into `n` sublists, each containing one element (a list of one element is considered sorted). Then, it repeatedly merges sublists to produce new sorted sublists until there is only one sorted list remaining.
*   **Mechanism**:
    1.  **Divide**: Split the array into two halves until individual elements are reached.
    2.  **Conquer (Sort)**: Recursively sort each sub-array.
    3.  **Combine (Merge)**: Merge the two sorted sub-arrays back into a single sorted array. This merge step is crucial: it compares elements from the two halves and places them into a temporary array in sorted order.
*   **Example**: See `visual-diagrams.md` for an ASCII art example.
*   **Characteristics**:
    *   **In-place**: No (typically requires O(N) auxiliary space for merging).
    *   **Stable**: Yes.
*   **Complexity**:
    *   **Time**:
        *   Worst Case: O(N log N)
        *   Average Case: O(N log N)
        *   Best Case: O(N log N)
    *   **Space**: O(N) auxiliary space (due to temporary array used during merging).

---

## 3. Quick Sort

*   **Concept**: Quick Sort is also a divide-and-conquer algorithm. It picks an element as a "pivot" and partitions the array around the pivot, such that all elements smaller than the pivot come before it, and all elements greater than the pivot come after it. The sub-arrays are then recursively sorted.
*   **Mechanism**:
    1.  **Pick a Pivot**: Choose an element from the array (e.g., the last element, first, median-of-three, or random).
    2.  **Partition**: Rearrange the array such that all elements less than the pivot are moved to its left, and all elements greater are moved to its right. The pivot is then in its final sorted position. This process returns the pivot's final index.
    3.  **Recurse**: Recursively apply Quick Sort to the sub-array of elements to the left of the pivot and the sub-array to the right of the pivot.
*   **Example**: See `visual-diagrams.md` for an ASCII art example of partitioning.
*   **Characteristics**:
    *   **In-place**: Yes (if implemented correctly, partitions within the original array).
    *   **Stable**: No (generally not stable, depends on partitioning scheme).
*   **Complexity**:
    *   **Time**:
        *   Worst Case: O(N^2) (occurs if the pivot selection consistently results in very unbalanced partitions, e.g., already sorted array with last element as pivot).
        *   Average Case: O(N log N)
        *   Best Case: O(N log N)
    *   **Space**: O(log N) on average (due to recursion stack depth), O(N) in worst case (unbalanced partitions).

---

## 4. Heap Sort

*   **Concept**: Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It's an in-place algorithm that can be thought of as an improved selection sort: it finds the maximum element and places it at the end.
*   **Mechanism**:
    1.  **Build Max-Heap**: Convert the unsorted array into a max-heap. This means the largest element is at the root.
    2.  **Extract Max and Heapify**:
        *   Swap the root (largest element) with the last element of the heap.
        *   Reduce the size of the heap by one.
        *   Heapify the new root to restore the max-heap property.
    3.  Repeat step 2 until the heap size is 1. The array will be sorted in ascending order.
*   **Example**: See `visual-diagrams.md` for an ASCII art example.
*   **Characteristics**:
    *   **In-place**: Yes.
    *   **Stable**: No.
*   **Complexity**:
    *   **Time**:
        *   Worst Case: O(N log N)
        *   Average Case: O(N log N)
        *   Best Case: O(N log N)
    *   **Space**: O(1) auxiliary space.

---

## 5. Counting Sort

*   **Concept**: Counting Sort is a non-comparison-based sorting algorithm suitable for sorting data that are integers within a specific range. It works by counting the number of occurrences of each distinct element in the input array.
*   **Mechanism**:
    1.  **Find Range**: Determine the minimum and maximum values in the input array.
    2.  **Create Count Array**: Initialize a `count` array of size `max - min + 1` (or `max + 1` if `min` is 0) with all zeros.
    3.  **Populate Count Array**: Iterate through the input array and increment the count for each element in the `count` array. `count[x - min]` stores the frequency of `x`.
    4.  **Modify Count Array (Optional for stable sort)**: Modify the `count` array to store the actual position of each element in the output array. This is done by summing up the counts: `count[i] = count[i] + count[i-1]`.
    5.  **Build Output Array**: Iterate through the input array in reverse. For each element `x`, place it at `output[count[x - min] - 1]` and then decrement `count[x - min]`. (Iterating in reverse ensures stability).
*   **Example**: To sort `[1, 4, 1, 2, 7, 5, 2]`
    *   Max = 7, Min = 1. Count array size 7.
    *   `count` array after step 3: `[0, 2, 2, 0, 1, 1, 0, 1]` (index 0 for val 1, index 1 for val 2 etc.)
    *   `count` array after step 4 (cumulative sums): `[0, 2, 4, 4, 5, 6, 6, 7]`
    *   Build `output` array by iterating original in reverse and using `count` for placement.
*   **Characteristics**:
    *   **In-place**: No (requires O(N+K) auxiliary space for count and output arrays).
    *   **Stable**: Yes (if implemented correctly, especially step 5).
*   **Constraints**:
    *   Works best when the range `K` (max-min) of input numbers is not significantly larger than the number of elements `N`.
    *   Typically used for non-negative integers.
*   **Complexity**:
    *   **Time**: O(N + K), where N is the number of elements and K is the range of input values (max - min + 1).
    *   **Space**: O(N + K) auxiliary space.

---