```markdown
# Heap Data Structure: Detailed Explanation, Diagrams, Edge Cases, and Interview Tips

This document provides a comprehensive guide to the Heap data structure, supplementing the code implementations in this project.

## Table of Contents

1.  [What is a Heap?](#1-what-is-a-heap)
    *   [Complete Binary Tree Property](#complete-binary-tree-property)
    *   [Heap Property](#heap-property)
    *   [Types of Heaps](#types-of-heaps)
2.  [Heap Operations (Min-Heap Example)](#2-heap-operations-min-heap-example)
    *   [Representation (Array Mapping)](#representation-array-mapping)
    *   [Insertion (push)](#insertion-push)
    *   [Extraction (pop / extract-min)](#extraction-pop--extract-min)
    *   [Peek (min / max)](#peek-min--max)
    *   [Heapify (Building a Heap)](#heapify-building-a-heap)
3.  [Visual Diagrams (ASCII Art)](#3-visual-diagrams-ascii-art)
    *   [Initial Heap Structure](#initial-heap-structure)
    *   [Insertion Example](#insertion-example)
    *   [Extraction Example](#extraction-example)
4.  [Time and Space Complexity Summary](#4-time-and-space-complexity-summary)
5.  [Edge Cases and Gotchas](#5-edge-cases-and-gotchas)
    *   [Empty Heap](#empty-heap)
    *   [Single Element Heap](#single-element-heap)
    *   [Duplicate Elements](#duplicate-elements)
    *   [K Values (Kth Smallest/Largest)](#k-values-kth-smallestlargest)
    *   [`std::priority_queue` Behavior](#stdpriority_queue-behavior)
    *   [Memory Management for Pointers (e.g., ListNode)](#memory-management-for-pointers-eg-listnode)
6.  [Interview Tips and Variations](#6-interview-tips-and-variations)
    *   [When to Use Which Heap?](#when-to-use-which-heap)
    *   [Common Follow-up Questions](#common-follow-up-questions)
    *   [Related Problems / Variations](#related-problems--variations)
    *   [Trade-offs](#trade-offs)
    *   [Communicating Your Solution](#communicating-your-solution)

---

## 1. What is a Heap?

A heap is a highly efficient, specialized tree-based data structure that satisfies two main properties:

### Complete Binary Tree Property
A binary tree is **complete** if all levels are completely filled, except possibly the last level, and the last level has all its nodes as far left as possible. This property allows heaps to be efficiently stored in an array or `std::vector` without wasting space.

### Heap Property
This property defines the ordering of elements within the heap:
*   **Min-Heap Property**: For every node `i` other than the root, the value of `i` is greater than or equal to the value of its parent `P(i)`. This means the smallest element is always at the root.
*   **Max-Heap Property**: For every node `i` other than the root, the value of `i` is less than or equal to the value of its parent `P(i)`. This means the largest element is always at the root.

### Types of Heaps
*   **Min-Heap**: Useful for efficiently finding or extracting the smallest element.
*   **Max-Heap**: Useful for efficiently finding or extracting the largest element.
*   **Binary Heap**: The most common type, typically implemented as a complete binary tree.
*   **Fibonacci Heap, Binomial Heap**: More complex heaps used for highly optimized graph algorithms in theoretical computer science, less common in general coding interviews.

## 2. Heap Operations (Min-Heap Example)

We will use a Min-Heap for demonstrating operations. The principles apply symmetrically to a Max-Heap.

### Representation (Array Mapping)
For a 0-indexed array `heap[]`:
*   Parent of node at index `i`: `(i - 1) / 2`
*   Left child of node at index `i`: `2 * i + 1`
*   Right child of node at index `i`: `2 * i + 2`

### Insertion (`push`)
1.  Add the new element to the end of the heap (the next available position in the underlying array).
2.  **Sift-Up (or Heapify-Up)**: Compare the new element with its parent. If it violates the heap property (e.g., new element is smaller than parent in a min-heap), swap them. Continue this process upwards until the heap property is restored or the element reaches the root.
    *   **Time Complexity**: O(log N), where N is the number of elements in the heap.

### Extraction (`pop` / `extract-min`)
1.  The root element is the minimum (for a min-heap). Store it as the result.
2.  Replace the root with the last element in the heap.
3.  Remove the last element (which is now at the root's original position).
4.  **Sift-Down (or Heapify-Down)**: Compare the new root with its children. If it violates the heap property (e.g., new root is larger than one or both children in a min-heap), swap it with the *smaller* child. Continue this process downwards until the heap property is restored or the element reaches a leaf node.
    *   **Time Complexity**: O(log N).

### Peek (`min` / `max`)
1.  Simply return the root element. No modification to the heap.
    *   **Time Complexity**: O(1).

### Heapify (Building a Heap)
To build a heap from an arbitrary array:
1.  Place all elements into the array in any order.
2.  Starting from the **last non-leaf node** (parent of the last element, which is `(N/2)-1` for 0-indexed array of size N) and moving upwards to the root (index 0), apply the `siftDown` operation to each node. This ensures that when `siftDown` is called on a node, its children's subtrees are already valid heaps.
    *   **Time Complexity**: O(N). Although it looks like `N` sifting operations, each `siftDown` on average takes less than `log N` time, resulting in an overall O(N) complexity for building.

## 3. Visual Diagrams (ASCII Art)

Let's illustrate with a Min-Heap.
Array representation: `[1, 3, 2, 6, 5, 8, 7, 9]`

### Initial Heap Structure
```
        1
      /   \
     3     2
    / \   / \
   6   5 8   7
  /
 9
```
Array: `[1, 3, 2, 6, 5, 8, 7, 9]`

### Insertion Example: Insert `4` into the Min-Heap
1.  Add `4` to the end:
    Array: `[1, 3, 2, 6, 5, 8, 7, 9, 4]`
    ```
            1
          /   \
         3     2
        / \   / \
       6   5 8   7
      / \
     9   4 (new)
    ```
2.  Sift-Up `4`:
    *   `4` (index 8) vs Parent `9` (index 3). `4 < 9`, swap.
        Array: `[1, 3, 2, 4, 5, 8, 7, 9, 6]`
        ```
                1
              /   \
             3     2
            / \   / \
           4   5 8   7
          / \
         9   6
        ```
    *   `4` (index 3) vs Parent `6` (index 1). Wait, `4`'s parent is `2`. (indices: `4` is at `3`, parent is `(3-1)/2 = 1`). `4` vs parent `3`. `4 > 3`, no swap.
        The heap property is restored.
        *(Self-correction on parent index: `9` was at index `7`, parent `(7-1)/2=3`. `6` was at `3`, parent `(3-1)/2=1`. Parent of `4` at index `8` is `(8-1)/2=3`. This node was `6`. So `4` was compared with `6` and swapped).*
        *(Correcting `siftUp` step: `4` at index `8`. Parent is `(8-1)/2=3`. Element at `3` is `6`. `4<6`, swap. `4` moves to index `3`. Parent is `(3-1)/2=1`. Element at `1` is `3`. `4>3`, stop).*

    Final (after inserting 4):
    ```
            1
          /   \
         3     2
        / \   / \
       4   5 8   7
      / \
     9   6
    ```
    Array: `[1, 3, 2, 4, 5, 8, 7, 9, 6]` (after initial `6` replaced with `4`, and `4` sifted up)

### Extraction Example: Extract Min from the above Heap
(Heap: `[1, 3, 2, 4, 5, 8, 7, 9, 6]`)
1.  Min element is `1`. Store `1`.
2.  Replace `1` with the last element `6`. Remove `6` from end.
    Array: `[6, 3, 2, 4, 5, 8, 7, 9]`
    ```
            6 (new root)
          /   \
         3     2
        / \   / \
       4   5 8   7
      /
     9
    ```
3.  Sift-Down `6`:
    *   `6` (index 0) vs children `3` (index 1) and `2` (index 2). Smallest child is `2`. `6 > 2`, swap with `2`.
        Array: `[2, 3, 6, 4, 5, 8, 7, 9]`
        ```
            2
          /   \
         3     6 (new position)
        / \   / \
       4   5 8   7
      /
     9
        ```
    *   `6` (index 2) vs children `8` (index 5) and `7` (index 6). Smallest child is `7`. `6 < 7`, no swap. (Wait, `6`'s children are `2*2+1=5` (value `8`) and `2*2+2=6` (value `7`). Smallest child is `7`). `6 < 7`, so heap property is restored.
        *(Self-correction: Sift down `6`. Children are `3` and `2`. Smallest is `2`. Swap `6` and `2`. `2` is now root. `6` is at index `2`. Its children are `2*2+1 = 5` (value `8`) and `2*2+2=6` (value `7`). Smallest child is `7`. `6 < 7`, so `6` is valid parent of `7` and `8`). The heap property is restored.)*

    Final (after extracting 1):
    ```
            2
          /   \
         3     6
        / \   / \
       4   5 8   7
      /
     9
    ```
    Array: `[2, 3, 6, 4, 5, 8, 7, 9]`

## 4. Time and Space Complexity Summary

| Operation        | Time Complexity | Space Complexity | Notes                                       |
| :--------------- | :-------------- | :--------------- | :------------------------------------------ |
| `push` (insert)  | O(log N)        | O(1)             | Sift-up operation.                          |
| `pop` (extract)  | O(log N)        | O(1)             | Sift-down operation.                        |
| `peek`           | O(1)            | O(1)             | Access root element directly.               |
| Build Heap (N elements) | O(N)            | O(N)             | In-place from an array.                     |

*   **N**: Number of elements in the heap.

## 5. Edge Cases and Gotchas

### Empty Heap
*   `peek()` or `pop()` on an empty heap should typically throw an exception or return a special value (e.g., `std::optional` or check `isEmpty()`).
*   The `size()` should be 0.
*   The `isEmpty()` method should return `true`.

### Single Element Heap
*   `push()`: Adding a second element correctly positions it.
*   `pop()`: The single element is returned, and the heap becomes empty.
*   `peek()`: Returns the single element.

### Duplicate Elements
*   Heaps generally handle duplicate elements correctly without special logic. Their relative order might not be preserved, but the heap property still holds. For example, in a min-heap, if you have `[1, 2, 2, 3]`, both `2`s will be correctly placed relative to `1` and `3`.

### K Values (Kth Smallest/Largest)
*   **Be careful with `k` validation**: `k` must be `1 <= k <= N` (where N is the total number of elements). Invalid `k` values should be handled (e.g., throwing `std::invalid_argument`).
*   **Max-Heap for Kth Smallest**: A common pitfall is to use a Min-Heap for Kth smallest. The optimal approach is to use a **Max-Heap of size `k`**. This heap stores the `k` *smallest* elements encountered so far. The largest of these `k` smallest elements (which is `heap.top()`) will be the Kth smallest overall.
*   **Min-Heap for Kth Largest**: Similarly, for Kth largest, use a **Min-Heap of size `k`**. It stores the `k` *largest* elements encountered, and `heap.top()` will be the Kth largest.

### `std::priority_queue` Behavior
*   In C++, `std::priority_queue` is a **max-heap** by default.
    *   To make it a **min-heap**: `std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;`
*   For custom objects or `std::pair`s, `std::priority_queue` uses `operator<` for comparison.
    *   If you store `std::pair<int, int>` (e.g., `{frequency, element}`), it compares `first` elements, then `second` elements if `first` are equal. This is useful for Top K Frequent where you want to prioritize by frequency, then perhaps by element value.
    *   For a min-heap of `std::pair`, you need `std::greater<std::pair<int, int>>`.

### Memory Management for Pointers (e.g., `ListNode` for Merge K Sorted Lists)
*   When a heap stores pointers (e.g., `ListNode*`), the heap itself manages the pointers, not the objects they point to. You are responsible for the lifetime of the pointed-to objects.
*   In `mergeKLists`, nodes are moved from input lists to the merged list. The original list structures are modified, and the individual `ListNode` objects are reused. No explicit `delete` is needed for these nodes *during* the merge, but the caller of `mergeKLists` is responsible for `delete`ing the *entire merged list* once it's no longer needed, to prevent memory leaks. The test file demonstrates this cleanup.

## 6. Interview Tips and Variations

### When to Use Which Heap?
*   **Min-Heap**: Best for problems where you need quick access to the smallest element, or for keeping track of the `K` largest elements (by pushing and popping if `size > K`). Examples: Dijkstra's, Prim's, Kth Smallest/Largest (indirectly).
*   **Max-Heap**: Best for problems where you need quick access to the largest element, or for keeping track of the `K` smallest elements (by pushing and popping if `size > K`). Examples: Kth Smallest/Largest (directly).
*   **Two Heaps**: Ideal for finding the median or maintaining order in a data stream.

### Common Follow-up Questions
*   **"Can you implement the heap from scratch?"**: Demonstrates understanding of internal mechanics. (Provided in `min_heap.h`, `max_heap.h`).
*   **"What if `K` is very large/small?"**: Discuss edge cases and how complexity changes. If `K` is `N`, it's similar to sorting. If `K=1`, it's finding min/max.
*   **"How would you handle ties?"**: Depends on the problem. For Top K Frequent, if multiple elements have the same frequency, the problem usually allows any tie-breaking. `std::priority_queue`'s default behavior for `std::pair` will use the second element for tie-breaking.
*   **"Space/Time tradeoffs?"**: For Kth Smallest, sorting is O(N log N) time, O(1) space (if in-place). Heap is O(N log K) time, O(K) space. `std::nth_element` is O(N) average time, O(1) space. The choice depends on constraints.

### Related Problems / Variations
*   **Find Kth Largest Element**: Directly solvable with a Min-Heap of size K.
*   **Sort an array using a heap (Heapsort)**: Build a max-heap, then repeatedly extract max and place at end of array. O(N log N) time, O(1) space.
*   **Priority Queue Implementation**: A heap is the canonical implementation for a priority queue.
*   **Sliding Window Median**: Use two heaps to maintain the median in a sliding window.
*   **Meeting Rooms II**: Use a min-heap to keep track of end times of meetings.
*   **Connect Ropes / Huffman Coding**: Often uses a min-heap to repeatedly combine smallest elements.

### Trade-offs
*   **Arrays vs. Heaps**: Arrays offer O(1) access but O(N log N) for sorting, O(N) for insertion/deletion. Heaps offer O(log N) for insertion/deletion and O(1) for min/max peek, but not arbitrary access.
*   **Hash Maps vs. Heaps**: Hash maps provide O(1) average time for lookup/insertion. Heaps provide ordered access for min/max. Often used together (e.g., Top K Frequent) to combine strengths.

### Communicating Your Solution
*   **Clarify**: Always rephrase the problem and clarify constraints (e.g., `k` bounds, input sizes, duplicates, value ranges).
*   **Example**: Work through a small example to illustrate your logic.
*   **High-Level First**: Start with the overall approach (e.g., "I'll use a min-heap for this").
*   **Detailed Steps**: Break down the algorithm into clear steps.
*   **Complexity Analysis**: State time and space complexity and justify them.
*   **Edge Cases**: Explicitly mention how you handle edge cases (empty inputs, `k` values, etc.).
*   **Code Structure**: Talk about the classes, functions, and data structures you'll use.
*   **Refinement**: Be open to discussing optimizations or alternative approaches.

Understanding heaps deeply, not just knowing how to use `std::priority_queue`, is crucial for interview success. This project aims to provide that depth.
```