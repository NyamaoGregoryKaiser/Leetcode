```markdown
# Sorting Algorithms: Detailed Explanations

This document provides in-depth explanations of common sorting algorithms, covering their intuition, step-by-step process, properties, and when to use them.

---

## 1. Bubble Sort

*   **Intuition**:
    Bubble Sort is the simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. Larger elements "bubble" to the end of the list.

*   **How it Works (Step-by-step)**:
    1.  Start from the first element and compare it with the second. If the first is greater than the second, swap them.
    2.  Move to the next pair (second and third elements) and repeat the comparison and swap.
    3.  Continue this process until the end of the list. After the first pass, the largest element will be at the last position.
    4.  Repeat the entire process for the remaining `n-1` elements (excluding the last element which is now sorted).
    5.  Continue `n-1` passes. An optimization is to stop early if no swaps occurred in a full pass, meaning the array is sorted.

*   **Properties**:
    *   **Stable**: Yes.
    *   **In-place**: Yes.
    *   **Adaptive**: Yes (with optimization).
    *   **Best for**: Educational purposes, or extremely small datasets.

*   **Time Complexity**:
    *   Worst-case: O(N^2)
    *   Average-case: O(N^2)
    *   Best-case: O(N) (if array is already sorted and optimized)

*   **Space Complexity**: O(1)

---

## 2. Selection Sort

*   **Intuition**:
    Selection Sort improves on Bubble Sort by making only one swap per pass. It divides the input list into two parts: a sorted sublist on the left and an unsorted sublist on the right. It repeatedly selects the smallest (or largest) element from the unsorted sublist and swaps it with the leftmost unsorted element, moving the boundary between the sublists one element to the right.

*   **How it Works (Step-by-step)**:
    1.  Find the minimum element in the unsorted portion of the array.
    2.  Swap it with the first element of the unsorted portion.
    3.  Consider the first element now sorted and repeat the process for the remaining unsorted portion.

*   **Properties**:
    *   **Stable**: No.
    *   **In-place**: Yes.
    *   **Adaptive**: No.
    *   **Best for**: Cases where memory writes are expensive (e.g., flash memory), as it minimizes swaps.

*   **Time Complexity**:
    *   Worst-case: O(N^2)
    *   Average-case: O(N^2)
    *   Best-case: O(N^2)

*   **Space Complexity**: O(1)

---

## 3. Insertion Sort

*   **Intuition**:
    Insertion Sort builds the final sorted array one item at a time. It's like sorting a hand of playing cards: you pick up one card at a time and insert it into its correct position among the cards already sorted in your hand.

*   **How it Works (Step-by-step)**:
    1.  Assume the first element `arr[0]` is a sorted subarray of size 1.
    2.  Take the next element `arr[i]` (starting from `i=1`) and compare it with elements in the sorted subarray (`arr[0...i-1]`).
    3.  Shift elements in the sorted subarray that are greater than `arr[i]` one position to the right to make space.
    4.  Insert `arr[i]` into its correct position.
    5.  Repeat until all elements are considered.

*   **Properties**:
    *   **Stable**: Yes.
    *   **In-place**: Yes.
    *   **Adaptive**: Yes (very efficient for nearly sorted arrays).
    *   **Best for**: Small datasets, or datasets that are already substantially sorted. Also useful in hybrid sorts (like Timsort, Introsort).

*   **Time Complexity**:
    *   Worst-case: O(N^2)
    *   Average-case: O(N^2)
    *   Best-case: O(N) (if array is already sorted)

*   **Space Complexity**: O(1)

---

## 4. Merge Sort

*   **Intuition**:
    Merge Sort is a "divide and conquer" algorithm. It recursively breaks down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems are then combined to give a solution to the original problem. Think of it like splitting a deck of cards in half repeatedly until you have single cards, then merging them back together in sorted order.

*   **How it Works (Step-by-step)**:
    1.  **Divide**: If the array has more than one element, split it into two halves.
    2.  **Conquer**: Recursively sort each half using Merge Sort.
    3.  **Combine (Merge)**: Merge the two sorted halves back into a single sorted array. This is the core operation: take two sorted lists and combine them into one sorted list by comparing their first elements repeatedly.

*   **Properties**:
    *   **Stable**: Yes.
    *   **In-place**: No (requires O(N) auxiliary space).
    *   **Adaptive**: No.
    *   **Best for**: Linked lists, external sorting (when data doesn't fit in memory), situations where stability is important. Guarantees O(N log N) performance.

*   **Time Complexity**:
    *   Worst-case: O(N log N)
    *   Average-case: O(N log N)
    *   Best-case: O(N log N)

*   **Space Complexity**: O(N) (due to the auxiliary array used in the merge step)

---

## 5. Quick Sort

*   **Intuition**:
    Quick Sort is another "divide and conquer" algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This process is repeated until the entire array is sorted. It's often faster in practice than Merge Sort and Heap Sort.

*   **How it Works (Step-by-step)**:
    1.  **Choose a Pivot**: Select an element from the array to be the pivot. Common strategies include the first, last, middle, or a random element. (Our implementation uses the last element for Lomuto partition).
    2.  **Partition**: Rearrange the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side. The pivot element is now in its final sorted position.
    3.  **Conquer**: Recursively apply Quick Sort to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

*   **Properties**:
    *   **Stable**: No.
    *   **In-place**: Yes (most implementations, including ours).
    *   **Adaptive**: No (can degrade on already sorted data with naive pivot choice).
    *   **Best for**: General-purpose sorting, especially for arrays in main memory.

*   **Time Complexity**:
    *   Worst-case: O(N^2) (occurs when pivot selection consistently leads to unbalanced partitions, e.g., already sorted array and choosing first/last element as pivot).
    *   Average-case: O(N log N)
    *   Best-case: O(N log N)

*   **Space Complexity**:
    *   Average-case: O(log N) (due to recursion stack for balanced partitions)
    *   Worst-case: O(N) (for highly unbalanced partitions)

---

## 6. Heap Sort

*   **Intuition**:
    Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It's conceptually similar to selection sort, but instead of iterating to find the maximum element, it uses the heap's property to efficiently find the maximum. The maximum element (root of a max-heap) is extracted and placed at the end of the array, and the process repeats with the remaining elements.

*   **How it Works (Step-by-step)**:
    1.  **Build a Max-Heap**: Convert the unsorted array into a max-heap. In a max-heap, the value of each node is greater than or equal to the value of its children. This can be done in O(N) time.
    2.  **Sort (Extract-Max)**:
        *   The largest element is at the root of the heap (`arr[0]`).
        *   Swap the root element with the last element of the heap.
        *   Reduce the size of the heap by one (effectively removing the largest element from the heap part).
        *   Heapify the root (`arr[0]`) to restore the max-heap property for the reduced heap.
        *   Repeat this process `N-1` times until the heap is empty. The array will be sorted in ascending order.

*   **Properties**:
    *   **Stable**: No.
    *   **In-place**: Yes.
    *   **Adaptive**: No.
    *   **Best for**: Guaranteed O(N log N) performance (unlike Quick Sort's worst-case O(N^2)). Useful when memory is a concern.

*   **Time Complexity**:
    *   Worst-case: O(N log N)
    *   Average-case: O(N log N)
    *   Best-case: O(N log N)

*   **Space Complexity**: O(1)

---
```