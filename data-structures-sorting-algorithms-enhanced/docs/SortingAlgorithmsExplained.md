```markdown
# Sorting Algorithms Explained

This document provides a detailed overview of common sorting algorithms, including their principles, time and space complexity, stability, and typical use cases.

## Table of Contents
1.  [Comparison-Based Sorts](#1-comparison-based-sorts)
    *   [Bubble Sort](#11-bubble-sort)
    *   [Selection Sort](#12-selection-sort)
    *   [Insertion Sort](#13-insertion-sort)
    *   [Merge Sort](#14-merge-sort)
    *   [Quick Sort](#15-quick-sort)
    *   [Heap Sort](#16-heap-sort)
2.  [Non-Comparison-Based Sorts](#2-non-comparison-based-sorts)
    *   [Counting Sort](#21-counting-sort)
    *   [Radix Sort](#22-radix-sort)
3.  [Key Concepts](#3-key-concepts)
    *   [Stability](#31-stability)
    *   [In-place Sorting](#32-in-place-sorting)

---

## 1. Comparison-Based Sorts

These algorithms sort elements by comparing pairs of elements. Their lower bound for time complexity is O(N log N).

### 1.1. Bubble Sort

*   **Principle**: Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Passes are repeated until no swaps are needed.
*   **How it works**:
    1.  Start from the beginning of the list.
    2.  Compare the first two elements. If the first is greater than the second, swap them.
    3.  Move to the next pair and repeat.
    4.  After one pass, the largest element will "bubble up" to its correct position at the end.
    5.  Repeat passes, excluding elements already in place, until no swaps occur in a pass.
*   **Time Complexity**:
    *   **Worst-Case**: O(N^2) (e.g., reverse-sorted array)
    *   **Average-Case**: O(N^2)
    *   **Best-Case**: O(N) (already sorted array, with optimization to stop early)
*   **Space Complexity**: O(1) (in-place)
*   **Stability**: Stable
*   **Use Cases**: Rarely used in practice due to poor performance; good for teaching basic sorting concepts.

### 1.2. Selection Sort

*   **Principle**: Divides the list into a sorted and an unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and puts it at the beginning of the sorted sublist.
*   **How it works**:
    1.  Find the minimum element in the unsorted portion of the array.
    2.  Swap it with the first element of the unsorted portion.
    3.  Move the boundary of the sorted portion one step to the right.
    4.  Repeat until the entire array is sorted.
*   **Time Complexity**:
    *   **Worst-Case**: O(N^2)
    *   **Average-Case**: O(N^2)
    *   **Best-Case**: O(N^2)
*   **Space Complexity**: O(1) (in-place)
*   **Stability**: Unstable
*   **Use Cases**: Rarely used in practice; simple to implement. The number of swaps is minimal (at most N-1), which might be beneficial if writing to memory is very expensive.

### 1.3. Insertion Sort

*   **Principle**: Builds the final sorted array one item at a time. It iterates through the input elements and inserts each element into its correct position within the already sorted part of the array.
*   **How it works**:
    1.  Start from the second element (the first element is considered a sorted sublist of size 1).
    2.  Take the current element and compare it with elements in the sorted sublist to its left.
    3.  Shift elements in the sorted sublist that are greater than the current element one position to the right.
    4.  Insert the current element into the empty space.
    5.  Repeat for all elements.
*   **Time Complexity**:
    *   **Worst-Case**: O(N^2) (e.g., reverse-sorted array)
    *   **Average-Case**: O(N^2)
    *   **Best-Case**: O(N) (already sorted array)
*   **Space Complexity**: O(1) (in-place)
*   **Stability**: Stable
*   **Use Cases**:
    *   Very small datasets.
    *   Datasets that are already substantially sorted.
    *   As a subroutine in more complex algorithms (e.g., Timsort, Introsort for small partitions).

### 1.4. Merge Sort

*   **Principle**: A divide-and-conquer algorithm. It divides the unsorted list into N sublists, each containing one element (a list of one element is considered sorted). Then, it repeatedly merges sublists to produce new sorted sublists until there is only one sorted list remaining.
*   **How it works**:
    1.  **Divide**: Continuously divide the unsorted array into two halves until you have arrays of size 1 (which are inherently sorted).
    2.  **Conquer (Merge)**: Repeatedly merge these sorted sub-arrays to produce new sorted sub-arrays. The merging process involves comparing elements from the two sub-arrays and placing them into a temporary array in sorted order.
*   **Time Complexity**:
    *   **Worst-Case**: O(N log N)
    *   **Average-Case**: O(N log N)
    *   **Best-Case**: O(N log N)
*   **Space Complexity**: O(N) (requires an auxiliary array of size N for merging)
*   **Stability**: Stable
*   **Use Cases**:
    *   Sorting linked lists (efficiently handles non-random access).
    *   External sorting (when data doesn't fit in memory).
    *   Guaranteed O(N log N) performance, making it reliable.

### 1.5. Quick Sort

*   **Principle**: Also a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
*   **How it works**:
    1.  **Choose a Pivot**: Select an element from the array as the pivot (e.g., first, last, median-of-three, random).
    2.  **Partition**: Rearrange the array such that all elements smaller than the pivot come before it, and all elements greater come after it. Elements equal to the pivot can go on either side. The pivot is now in its final sorted position.
    3.  **Recursively Sort**: Recursively apply QuickSort to the sub-array of smaller elements and the sub-array of greater elements.
*   **Time Complexity**:
    *   **Worst-Case**: O(N^2) (e.g., if pivot is always the smallest/largest, for an already sorted array with naive pivot selection)
    *   **Average-Case**: O(N log N) (most common scenario)
    *   **Best-Case**: O(N log N) (when pivot perfectly divides array into two halves)
*   **Space Complexity**: O(log N) (average for recursion stack), O(N) (worst-case for unbalanced partitions)
*   **Stability**: Unstable
*   **Use Cases**:
    *   Widely used in practice (e.g., `Arrays.sort()` for primitives in Java often uses a dual-pivot QuickSort or similar hybrid).
    *   Generally faster than Merge Sort in practice due to better cache performance and lower constant factors, despite Merge Sort having a better worst-case guarantee.
    *   In-place sorting where space is a concern.

### 1.6. Heap Sort

*   **Principle**: A comparison-based sorting algorithm that uses a binary heap data structure. It's similar to selection sort in that it finds the maximum (or minimum) element and places it at the end (or beginning) of the sorted portion.
*   **How it works**:
    1.  **Build Max-Heap**: Transform the input array into a max-heap. This means that for any given node `i`, the value of `node i` is greater than or equal to the values of its children. This can be done in O(N) time.
    2.  **Extract Max**: Repeatedly extract the maximum element (which is the root of the heap `arr[0]`), swap it with the last element of the heap, and reduce the heap size by one. Then, heapify the root of the reduced heap to maintain the max-heap property.
*   **Time Complexity**:
    *   **Worst-Case**: O(N log N)
    *   **Average-Case**: O(N log N)
    *   **Best-Case**: O(N log N)
*   **Space Complexity**: O(1) (in-place)
*   **Stability**: Unstable
*   **Use Cases**:
    *   When O(N log N) worst-case performance is required without using O(N) extra space (unlike Merge Sort).
    *   Priority queues (the underlying data structure is a heap).

---

## 2. Non-Comparison-Based Sorts

These algorithms do not sort by comparing pairs of elements. They rely on assumptions about the data (e.g., integer keys within a certain range). Their time complexity can be better than O(N log N).

### 2.1. Counting Sort

*   **Principle**: Sorts elements by counting the occurrences of each distinct element in the input array. It then uses these counts to determine the positions of each element in the sorted output array.
*   **How it works**:
    1.  Find the maximum element in the input array.
    2.  Create a `count` array (or frequency map) of size `max + 1`, initialized to zeros.
    3.  Iterate through the input array, incrementing `count[arr[i]]` for each element `arr[i]`.
    4.  Modify the `count` array to store the cumulative sum, such that `count[i]` now contains the actual position of element `i` in the output array.
    5.  Create an `output` array. Iterate through the input array **from right to left** (to ensure stability). Place `arr[i]` into `output[count[arr[i]] - 1]`, and then decrement `count[arr[i]]`.
    6.  Copy the `output` array back to the original array.
*   **Time Complexity**: O(N + K), where N is the number of elements and K is the range of input values (max - min + 1).
*   **Space Complexity**: O(K)
*   **Stability**: Stable (if implemented correctly, by iterating from right to left in step 5)
*   **Use Cases**:
    *   When the range of input numbers (K) is not significantly larger than the number of elements (N).
    *   As a subroutine in Radix Sort.
    *   Limited to integers (or data that can be mapped to integers). Often restricted to non-negative integers for simplicity.

### 2.2. Radix Sort

*   **Principle**: A non-comparison integer sorting algorithm that sorts data by processing individual digits (or bits) of the numbers. It distributes elements into buckets according to their radix (e.g., decimal digits).
*   **How it works**:
    1.  Determine the number of passes needed (equal to the maximum number of digits in any element).
    2.  For each digit position (starting from the least significant digit, LSD, to the most significant digit, MSD):
        *   Perform a stable sort (like Counting Sort) on the array, considering only the current digit.
    3.  After processing all digit positions, the array will be sorted.
*   **Time Complexity**: O(d * (N + K)), where N is the number of elements, d is the number of digits in the maximum number, and K is the base (radix) of the number system (e.g., 10 for decimal digits). Often simplified to O(N * (log_K(MaxVal)))
*   **Space Complexity**: O(N + K)
*   **Stability**: Stable (inherits stability from the underlying stable sorting algorithm used for digit passes)
*   **Use Cases**:
    *   When the keys are integers and have a limited range of values or a limited number of digits.
    *   Can be faster than comparison sorts for large N and small d*K.
    *   Limited to integers (or data that can be represented as fixed-length integer keys). Often restricted to non-negative integers.

---

## 3. Key Concepts

### 3.1. Stability

A sorting algorithm is **stable** if it preserves the relative order of equal elements. This means that if two elements `A` and `B` have the same value, and `A` appears before `B` in the original array, then `A` will still appear before `B` in the sorted array.

*   **Stable Sorts**: Bubble Sort, Insertion Sort, Merge Sort, Counting Sort, Radix Sort.
*   **Unstable Sorts**: Selection Sort, Quick Sort, Heap Sort.

Stability is important when the elements have associated data that is not part of the sorting key, and the original relative order of elements with equal keys needs to be maintained.

### 3.2. In-place Sorting

An algorithm is **in-place** if it does not require extra space proportional to the input size (N) for its operation. It only uses a small, constant amount of auxiliary space (O(1)) beyond the input array storage.

*   **In-place Sorts**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Heap Sort, Dutch National Flag Problem.
*   **Not Strictly In-place (require O(N) auxiliary space)**: Merge Sort (for the auxiliary array), Counting Sort (for the count array), Radix Sort (for count array and output array).

In-place sorting is crucial in scenarios where memory is a significant constraint.
```