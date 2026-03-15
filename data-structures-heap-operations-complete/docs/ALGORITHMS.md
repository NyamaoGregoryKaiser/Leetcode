# Algorithms and Data Structures: Heaps

This document provides a detailed explanation of Binary Heaps and their applications in solving common algorithmic problems.

## 1. What is a Heap?

A **Heap** is a specialized tree-based data structure that satisfies the heap property. It is typically implemented as an array, making use of the implicit tree structure where parent/child relationships are determined by array indices.

### 1.1. Heap Properties

1.  **Shape Property:** A binary heap is a **complete binary tree**. This means all levels of the tree are fully filled, except possibly the last level, which is filled from left to right. This property allows heaps to be efficiently represented using an array.
    *   For a node at index `i` (0-indexed):
        *   Its left child is at `2i + 1`.
        *   Its right child is at `2i + 2`.
        *   Its parent is at `floor((i - 1) / 2)`.

    ```ascii
            [0]
           /   \
        [1]     [2]
       /   \   /   \
    [3]   [4] [5]   [6]
    ```

2.  **Heap Property:**
    *   **Min-Heap:** For every node `i`, the value of node `i` is less than or equal to the value of its children. The smallest element is always at the root (index 0).
    *   **Max-Heap:** For every node `i`, the value of node `i` is greater than or equal to the value of its children. The largest element is always at the root (index 0).

### 1.2. Heap Operations & Time Complexity

| Operation       | Min-Heap (Time) | Max-Heap (Time) | Space | Description                                                         |
| :-------------- | :-------------- | :-------------- | :---- | :------------------------------------------------------------------ |
| `peek()`        | O(1)            | O(1)            | O(1)  | Returns the root element without removing it.                       |
| `insert(item)`  | O(log N)        | O(log N)        | O(1)  | Adds an item and re-establishes heap property (`heapifyUp`).        |
| `extractMin()`  | O(log N)        | N/A             | O(1)  | Removes and returns the smallest item (`heapifyDown`).             |
| `extractMax()`  | N/A             | O(log N)        | O(1)  | Removes and returns the largest item (`heapifyDown`).              |
| `buildHeap(arr)`| O(N)            | O(N)            | O(1)  | Converts an array into a heap in-place.                             |
| `size()`        | O(1)            | O(1)            | O(1)  | Returns the number of elements.                                     |
| `isEmpty()`     | O(1)            (O(1)            | O(1)  | Checks if the heap is empty.                                        |

*   **N**: Number of elements in the heap.
*   **Logarithmic Complexity (log N):** Arises because heap operations involve traversing the height of the tree, which is `log N` for a complete binary tree.
*   **O(N) for `buildHeap`:** While it seems like `N` `heapifyDown` operations (each `O(log N)`) would lead to `O(N log N)`, a tighter analysis shows that `buildHeap` is actually `O(N)` because most elements are in the lower levels of the tree and require fewer swaps.

### 1.3. `heapifyUp` (Swim)

Used after an insertion. A new element is added to the end of the array (leaf node). If it violates the heap property (e.g., in a Min-Heap, it's smaller than its parent), it's swapped upwards with its parent until the heap property is restored.

**Min-Heap Example: Insert 2**
Initial Heap (Min-Heap): `[10, 20, 30, 40]`
Array representation:
```
[10, 20, 30, 40]
 ^
root
```
1.  **Add 2 to end:** `[10, 20, 30, 40, 2]`
    ```
    [10, 20, 30, 40, 2]
                     ^
                    idx 4
    ```
2.  **Compare 2 (idx 4) with parent 40 (idx 1):** `2 < 40`. Swap.
    ```
    [10, 2, 30, 40, 20]
         ^
        idx 1
    ```
3.  **Compare 2 (idx 1) with parent 10 (idx 0):** `2 < 10`. Swap.
    ```
    [2, 10, 30, 40, 20]
     ^
    idx 0
    ```
4.  **At root (idx 0):** Heap property restored.

### 1.4. `heapifyDown` (Sink)

Used after `extractMin`/`extractMax`. The root (smallest/largest) is removed, and the last element in the array takes its place. This new root might violate the heap property, so it's swapped downwards with its smallest/largest child until the heap property is restored.

**Min-Heap Example: Extract Min from `[2, 10, 30, 40, 20]`**
1.  **Extract root 2.** Move last element 20 to root: `[20, 10, 30, 40]`
    ```
    [20, 10, 30, 40]
     ^
    root
    ```
2.  **Compare 20 (idx 0) with children 10 (idx 1) and 30 (idx 2):** Smallest child is 10. Swap 20 with 10.
    ```
    [10, 20, 30, 40]
         ^
        idx 1
    ```
3.  **Compare 20 (idx 1) with children 40 (idx 3) and (no right child):** Smallest child is 40. Compare 20 with 40. `20 < 40`. No swap needed (20 is smaller than its child).
    ```
    [10, 20, 30, 40]
         ^
        idx 1
    ```
4.  **Heap property restored.**

## 2. Heap Applications (Problems)

Heaps are fundamentally **Priority Queues**. They are excellent for problems that involve:
*   Finding the Kth smallest/largest element.
*   Merging sorted streams/lists.
*   Maintaining a running median.
*   Scheduling tasks based on priority.

### 2.1. Problem 1: Kth Largest Element in an Array

**Strategy:** Use a **Min-Heap of size `k`**.
*   Iterate through `nums`.
*   Insert each number into the heap.
*   If the heap's size exceeds `k`, `extractMin()`.
*   After processing all numbers, `peek()` the heap's root. This is the `k`th largest element.

**Why Min-Heap for Kth Largest?**
A Min-Heap will always keep the smallest of the `k` largest elements at its root. If we add a new element `X`:
*   If `X` is greater than the current smallest in the heap (`peek()`), then `X` should be among the top `k`. We remove the current `peek()` and add `X`.
*   If `X` is smaller, it's irrelevant to the top `k` elements, so we ignore it.
This ensures the heap always contains the `k` largest elements seen so far, and its minimum (root) is the `k`th largest overall.

**Complexity:**
*   **Time:** O(N log K) (N insertions/extractions, each O(log K))
*   **Space:** O(K) (Heap stores K elements)

**Alternative:** Quickselect (Average O(N), Worst O(N^2)) or Sorting (O(N log N)). Heap is generally preferred for clarity and good worst-case performance when K is small relative to N.

### 2.2. Problem 2: Merge k Sorted Lists

**Strategy:** Use a **Min-Heap (Priority Queue)**.
*   The heap stores `ListNode` objects, prioritized by `node.val`.
*   Initialize the heap with the head nodes of all non-empty lists.
*   Create a dummy node for the merged list.
*   While the heap is not empty:
    1.  `extractMin()`: Get the node with the smallest value.
    2.  Append it to the merged list.
    3.  If the extracted node has a `next` element, `insert()` `node.next` into the heap.

**Complexity:**
*   **Time:** O(N log K) (N total nodes, K lists. Each node processed once: O(log K) for heap operations).
*   **Space:** O(K) (Heap stores up to K nodes, one from each list).

**Alternative:** Divide and Conquer (Pairwise merging). This also achieves O(N log K) time and O(log K) space for recursion stack. Brute force (collect all values, sort, rebuild list) is O(N log N) time, O(N) space.

### 2.3. Problem 3: Find Median from Data Stream

**Strategy:** Use **Two Heaps** – a **Max-Heap** (`maxHeapSmall`) and a **Min-Heap** (`minHeapLarge`).
*   `maxHeapSmall` stores the smaller half of numbers (root is largest in smaller half).
*   `minHeapLarge` stores the larger half of numbers (root is smallest in larger half).

**Invariants:**
1.  `maxHeapSmall.peek() <= minHeapLarge.peek()`
2.  `maxHeapSmall.size()` is either equal to `minHeapLarge.size()` or `maxHeapSmall.size() == minHeapLarge.size() + 1`.

**`addNum(num)`:**
1.  Add `num` to `maxHeapSmall`.
2.  If `maxHeapSmall.peek() > minHeapLarge.peek()`, transfer `maxHeapSmall.extractMax()` to `minHeapLarge.insert()`. (Ensures invariant 1)
3.  Balance sizes: If `maxHeapSmall.size() > minHeapLarge.size() + 1`, transfer `maxHeapSmall.extractMax()` to `minHeapLarge.insert()`. Else if `minHeapLarge.size() > maxHeapSmall.size()`, transfer `minHeapLarge.extractMin()` to `maxHeapSmall.insert()`. (Ensures invariant 2)

**`findMedian()`:**
*   If `maxHeapSmall.size() > minHeapLarge.size()`, median is `maxHeapSmall.peek()`.
*   If `maxHeapSmall.size() == minHeapLarge.size()`, median is `(maxHeapSmall.peek() + minHeapLarge.peek()) / 2`.

**Complexity:**
*   **`addNum` Time:** O(log N) (N is total elements so far, heap operations on half-sized heaps).
*   **`findMedian` Time:** O(1) (just peeking).
*   **Space:** O(N) (stores all elements across two heaps).

**Alternative:** Keeping a sorted list and inserting with binary search for O(N) `addNum` and O(1) `findMedian`. Or full sort for O(N log N) `findMedian`. Two heaps provide a balanced O(log N) for both.

### 2.4. Problem 4: Top K Frequent Elements

**Strategy:**
1.  **Count Frequencies:** Use a hash map to store `(number -> frequency)`.
2.  **Min-Heap of size K:** Create a Min-Heap that stores `(frequency, number)` pairs. The comparator should prioritize pairs with *smaller* frequencies.
3.  **Populate Heap:** Iterate through the frequency map. For each `(freq, num)` pair:
    *   `insert()` it into the heap.
    *   If `heap.size() > k`, `extractMin()`. This ensures the heap always contains the `k` pairs with the highest frequencies.
4.  **Extract Result:** `extractMin()` all elements from the heap and collect their numbers.

**Why Min-Heap for Top K Frequent?**
Similar to Kth largest, we want to keep track of the *K largest frequencies*. A Min-Heap of size K will keep the K largest frequencies, with the smallest of those K (the Kth largest frequency) at its root. Any new pair with a frequency higher than the root will replace the root.

**Complexity:**
*   **Time:** O(N + M log K)
    *   O(N) for counting frequencies (N is total elements).
    *   O(M log K) for heap operations (M distinct elements, each O(log K)).
    *   O(K log K) for extracting final results.
    *   Worst case (M=N): O(N log K).
*   **Space:** O(M + K) (M for frequency map, K for heap).

**Alternative:**
*   **Sorting:** Create a list of `(frequency, number)` pairs, sort by frequency (O(M log M)), then take top K. Worst case O(N log N).
*   **Bucket Sort:** (O(N) time, O(N) space). Create `N+1` buckets (indexed by frequency). Place numbers into their respective frequency buckets. Then iterate from `buckets[N]` down to `buckets[1]` to collect `k` elements. This is the optimal time complexity.

### 2.5. Problem 5: Kth Largest Element in a Data Stream

**Strategy:** This is almost identical to "Kth Largest Element in an Array", but encapsulated in a class to handle `add` operations over time.
*   Initialize a **Min-Heap of size `k`** in the constructor.
*   The `add(val)` method:
    1.  `insert(val)` into the heap.
    2.  If `heap.size() > k`, `extractMin()`.
    3.  `return heap.peek()`.

**Complexity:**
*   **Constructor:** O(initial_N log K) (initial_N is count of initial numbers).
*   **`add` Time:** O(log K) (for each new element).
*   **Space:** O(K) (heap stores K elements).

**Alternative:** Naive approach would store all elements in a dynamic array, sort it, and return the Kth element on each `add` call, leading to O(N log N) per `add` (where N is current stream size), which is highly inefficient.

## 3. Conclusion

Heaps (Min-Heaps and Max-Heaps) are fundamental data structures for efficiently managing ordered collections where only the extreme elements (min/max) are frequently accessed. They are a powerful tool for optimizing problems that would otherwise require full sorting or inefficient linear scans. Mastering heap operations and recognizing problem patterns where they apply is crucial for competitive programming and technical interviews.