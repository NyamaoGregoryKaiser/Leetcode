# Sorting Algorithm Explanations

This document provides detailed explanations of the sorting algorithms used in this project.


## Merge Sort

**(Diagram: ASCII art representation of merge sort)**

**Explanation:**  Merge sort is a divide-and-conquer algorithm that recursively divides the input array into smaller subarrays until each subarray contains only one element. Then, it repeatedly merges the subarrays to produce new sorted subarrays until there is only one sorted array remaining.


**Time Complexity:** O(n log n)
**Space Complexity:** O(n)


## QuickSort

**(Diagram: ASCII art representation of quicksort)**


**Explanation:** QuickSort is another divide-and-conquer algorithm. It selects a 'pivot' element and partitions the array around the pivot such that elements smaller than the pivot are before it, and elements greater than the pivot are after it.  The subarrays are then recursively sorted.

**Time Complexity:** Average: O(n log n), Worst: O(n^2)
**Space Complexity:** O(log n) (recursive calls)


// ... (Explain other algorithms similarly) ...