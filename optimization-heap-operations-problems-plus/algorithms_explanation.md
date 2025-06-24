# Algorithm Explanations and Diagrams

## Heap Sort

**Algorithm:**

1. Build a max-heap from the input array.
2. Repeatedly extract the maximum element from the heap (root) and place it at the end of the array.
3. Reduce the heap size by 1 and repeat until the heap is empty.

**Time Complexity:** O(n log n)
**Space Complexity:** O(1) (in-place)

**ASCII Art Diagram (simplified):**

```
[5, 2, 8, 1, 9, 4]  ->  Build Max-Heap

[9, 8, 5, 1, 2, 4]  ->  Extract Max (9)

[8, 5, 4, 1, 2]    ->  Repeat...
```

## Find Kth Largest Element

**Algorithm:** Uses a min-heap of size k.  Iterates through the array, adding elements to the heap if they are larger than the smallest element in the heap.

**Time Complexity:** O(n log k)
**Space Complexity:** O(k)


(Add explanations for other problems similarly)