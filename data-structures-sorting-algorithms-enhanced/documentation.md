# Sorting Algorithms Documentation

This document provides detailed explanations of the sorting algorithms implemented in this project.


## Merge Sort

**Algorithm:**

1. Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
2. Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.

**Time Complexity:** O(n log n)
**Space Complexity:** O(n)


## Quick Sort

**Algorithm:**

1. Pick an element, called a pivot, from the array.
2. Partitioning: reorder the array so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it (equal values can go either way). After this partitioning, the pivot is in its final position.
3. Recursively apply steps 1 and 2 to the sub-array of elements with smaller values and separately the sub-array of elements with greater values.

**Time Complexity:**  Average: O(n log n), Worst: O(n^2)
**Space Complexity:** O(log n) (due to recursion)



## Heap Sort

**Algorithm:**

1. Build a max-heap from the input array. A max-heap is a complete binary tree where the value of each node is greater than or equal to the value of its children.
2. Swap the root element (the maximum) with the last element of the heap.
3. Reduce the heap size by 1 and heapify the root element.
4. Repeat steps 2 and 3 until the heap size is 1.


**Time Complexity:** O(n log n)
**Space Complexity:** O(1)


## Bubble Sort (Inefficient - for comparison)

**Algorithm:** Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

**Time Complexity:** O(n^2)
**Space Complexity:** O(1)

**(Add diagrams and edge case discussions for each algorithm here)**