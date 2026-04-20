# Memory Efficiency in Heap Operations

Memory efficiency is an important aspect of algorithm design, especially in environments with limited resources or when dealing with very large datasets. For heap operations, understanding the memory footprint of the data structure and associated algorithms is critical.

---

## Heap Data Structure (`src/data-structures/Heap.ts`)

The core `Heap` implementation in this project is an **array-based binary heap**.

*   **Memory Usage:** O(N)
    *   The heap stores its elements in a contiguous array. If there are `N` elements in the heap, it requires space proportional to `N` to store them.
    *   `N` elements, each taking `sizeof(T)` bytes, plus array overhead.
*   **Memory Characteristics:**
    *   **Contiguous Allocation:** The array stores elements contiguously in memory (or references to objects, in the case of TypeScript/JavaScript). This can lead to better cache performance compared to linked data structures (like a binary tree with actual nodes).
    *   **No Node Overhead:** Unlike a linked-list based binary tree, there's no explicit `Node` object for each element with `left`, `right`, `parent` pointers. The parent-child relationships are calculated mathematically based on array indices. This reduces per-element memory overhead.

**Comparison with Node-based Heaps:**
While often conceptually explained as a tree, implementing a heap using actual tree nodes (where each node object explicitly stores references to its children and parent) would incur higher memory overhead per element due to the storage of these references. An array-based heap is generally the more memory-efficient choice for typical binary heap implementations.

---

## Memory Efficiency of Problem Solutions

Let's re-evaluate the memory footprint for each problem, focusing on `auxiliary` space (space used beyond input/output, typically for the data structures and variables).

### 1. Kth Largest/Smallest Element in an Array

*   **Optimized (Heap):**
    *   **Auxiliary Space:** O(K)
    *   The `Heap` itself consumes O(K) memory to store up to `K` elements. This is very memory-efficient if `K` is small compared to `N`.
*   **Brute-Force (Sorting):**
    *   **Auxiliary Space:** O(1) or O(N)
    *   In-place sorting algorithms use O(1) auxiliary space (e.g., Heapsort, some QuickSort variants if stack space is ignored).
    *   Non-in-place algorithms (like Merge Sort) or `Array.prototype.sort` (which might be Timsort) can use O(N) or O(log N) auxiliary space.
    *   If sorting modifies the input array, it's considered O(1) auxiliary space relative to the *input size* for some definitions, but it uses space *within* the array. A copy of the array would be O(N).

**Memory Trade-off:**
When `K` is small, the heap approach is both time- and space-efficient compared to a copying sort or one requiring large auxiliary space. If sorting can be done truly in-place with O(1) auxiliary space (like Heapsort), then the space difference might be negligible, but time complexity still favors the heap for small K.

---

### 2. Merge K Sorted Lists

*   **Optimized (Heap):**
    *   **Auxiliary Space:** O(K)
    *   The `Heap` stores up to `K` `ListNode` objects (or references to them).
    *   Each `ListNode` object itself consumes memory for `val` and `next` pointer. The heap stores references to these nodes, not copies of the entire lists.
    *   The resulting merged list (`output`) consumes O(N) space, but this is typically considered output space, not auxiliary space.
*   **Brute-Force (Iterative Merging):**
    *   **Auxiliary Space:** O(1) (excluding recursive stack space for `mergeTwoLists` if implemented recursively, which would be O(L) where L is list length).
    *   The iterative `mergeKListsIterative` function uses a small number of variables and directly modifies `ListNode.next` pointers. No additional data structures proportional to N or K are allocated beyond the output list itself.

**Memory Trade-off:**
The heap approach has an O(K) memory overhead for the heap structure. The iterative approach (especially the divide-and-conquer variant used in `mergeKListsIterative`) has an advantage in terms of auxiliary space, offering O(1) in ideal iterative implementations. However, the O(K) memory for the heap is often a small price to pay for the significant time complexity improvement from O(N*K) to O(N log K).

---

### 3. Top K Frequent Elements

*   **Optimized (Frequency Map + Min-Heap):**
    *   **Auxiliary Space:** O(M + K)
    *   The `frequencyMap` stores counts for `M` unique elements, consuming O(M) space.
    *   The `Heap` stores up to `K` `{element, frequency}` objects, consuming O(K) space.
    *   In the worst case, `M` can be `N` (all elements unique), leading to O(N) auxiliary space.
*   **Brute-Force (Frequency Map + Full Sort):**
    *   **Auxiliary Space:** O(M) or O(N)
    *   The `frequencyMap` consumes O(M) space.
    *   Converting the map to an array of pairs consumes O(M) space.
    *   Sorting this array might use additional O(M) space depending on the sort algorithm.
    *   In the worst case, `M = N`, leading to O(N) auxiliary space.

**Memory Trade-off:**
Both approaches typically require O(N) auxiliary space in the worst case (when all elements are unique and `M=N`). The heap approach generally performs better in time for small `K` while having similar (or slightly better if `M` is much larger than `K`) memory footprint compared to sorting all `M` unique elements.

---

### 4. Find Median from Data Stream

*   **Optimized (Two Heaps):**
    *   **Auxiliary Space:** O(N)
    *   Both `maxHeap` and `minHeap` collectively store all `N` numbers added to the stream.
*   **Naive (Sorted Array/List):**
    *   **Auxiliary Space:** O(N)
    *   The array stores all `N` numbers added to the stream.

**Memory Trade-off:**
In terms of memory, both the optimized two-heap approach and the naive sorted array approach consume O(N) space, as they both must store all input numbers. The efficiency difference lies entirely in their time complexities for `addNum`. The heap data structure's array-based implementation is generally efficient for storage compared to a linked list structure for the sorted array.

---

## General Memory Considerations for Heaps

1.  **Array vs. Node-based:** Array-based heaps (used here) are generally more memory-efficient than explicit node-based tree structures due to implicit parent/child relationships and no pointer overhead per node.
2.  **References vs. Copies:** In JavaScript/TypeScript, when you insert objects into a heap, you're usually storing references to those objects. The memory consumed by the actual objects is separate from the heap's internal array storage (which stores these references).
3.  **Primitive Types:** For primitive types (numbers, booleans), the values themselves are stored directly in the array, making it very compact.
4.  **Garbage Collection:** In managed languages like TypeScript, old objects (e.g., `ListNode`s that have been merged or `{element, frequency}` objects that have been extracted from a heap) will eventually be garbage collected, freeing up memory.
5.  **Memory Locality:** The contiguous nature of an array-based heap can lead to better cache performance, reducing memory access times.

In most interview scenarios, the time complexity is prioritized, but a brief discussion of memory usage and potential optimizations (like using primitive types if possible, or considering `K` vs `N` for space) demonstrates a well-rounded understanding.