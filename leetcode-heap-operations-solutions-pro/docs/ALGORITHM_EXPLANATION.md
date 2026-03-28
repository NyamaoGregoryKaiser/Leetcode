```markdown
# Heap Algorithm Explanation

This document provides a detailed explanation of the Heap data structure, its properties, internal workings, and why it's a powerful tool in computer science and coding interviews.

## 1. What is a Heap?

A Heap is a specialized tree-based data structure that satisfies the **heap property**. It's commonly implemented as an array, making it a highly efficient structure for specific tasks.

There are two main types of heaps:

*   **Min-Heap**: In a Min-Heap, the value of each node is less than or equal to the value of its children. This means the smallest element is always at the root (the top of the tree).
*   **Max-Heap**: In a Max-Heap, the value of each node is greater than or equal to the value of its children. This means the largest element is always at the root.

### Key Characteristics:

1.  **Complete Binary Tree**: A heap is always a complete binary tree. This means all levels are completely filled, except possibly the last level, which is filled from left to right. This property is crucial for its efficient array representation.
2.  **Heap Property**: As described above (Min-Heap or Max-Heap property).

## 2. Array Representation of a Heap

The complete binary tree property allows a heap to be efficiently stored in a simple array (or list) without explicit pointers.

*   The root element is at index `0`.
*   For any node at index `i`:
    *   Its **left child** is at index `2 * i + 1`.
    *   Its **right child** is at index `2 * i + 2`.
    *   Its **parent** is at index `floor((i - 1) / 2)`.

**Example (Min-Heap):**

Consider a heap `[3, 5, 10, 12, 15]`

```
Array:
Index:  0   1   2   3   4
Value:  3   5  10  12  15
```

Tree representation:

```
        3 (index 0)
       / \
      5   10 (indices 1, 2)
     / \
    12 15 (indices 3, 4)
```

*   Node at index 1 (value 5):
    *   Parent: `floor((1-1)/2) = 0` (value 3) -> `3 < 5` (Min-Heap property holds)
    *   Left Child: `2*1+1 = 3` (value 12) -> `5 < 12`
    *   Right Child: `2*1+2 = 4` (value 15) -> `5 < 15`

## 3. Core Heap Operations

### 3.1. `insert(value)` - Adding an Element

When a new element is inserted, it's initially added to the *end* of the heap array (maintaining the complete binary tree property). This might violate the heap property, so we perform an `_heapifyUp` (or `bubbleUp`/`percolateUp`) operation.

**`_heapifyUp` Process:**
1.  Add the new element to the last position in the array.
2.  Compare the new element with its parent.
3.  If the new element violates the heap property (e.g., in a Min-Heap, the child is smaller than its parent), swap the element with its parent.
4.  Repeat steps 2-3 until the element is at the root or the heap property is satisfied (i.e., the element is in its correct position relative to its parent).

**Time Complexity: O(log N)**
In the worst case, the new element might "bubble up" from the last level to the root, which involves traversing a path of length `log N` (the height of the tree). Each comparison and swap takes O(1) time.

### 3.2. `extract()` - Removing the Root Element (Min or Max)

To remove the highest-priority element (minimum in Min-Heap, maximum in Max-Heap), we follow these steps:
1.  Store the root element (which is the one to be extracted).
2.  Move the *last element* of the heap array to the root position.
3.  Remove the last element from the array (effectively reducing the heap size by 1).
4.  The new root might violate the heap property, so we perform a `_heapifyDown` (or `bubbleDown`/`percolateDown`) operation.

**`_heapifyDown` Process:**
1.  Start with the element at the root (index 0).
2.  Compare the current element with its children.
3.  If the current element violates the heap property (e.g., in a Min-Heap, the parent is larger than one or both children), swap it with the *smaller* child (for a Min-Heap) or the *larger* child (for a Max-Heap).
4.  Repeat steps 2-3 until the element is a leaf node or the heap property is satisfied (i.e., the element is in its correct position relative to its children).

**Time Complexity: O(log N)**
Similar to `heapifyUp`, the element might "bubble down" from the root to a leaf, traversing a path of length `log N`.

### 3.3. `peek()` - Getting the Root Element

This operation simply returns the element at the root of the heap (index 0) without removing it.

**Time Complexity: O(1)**

### 3.4. `size()` and `isEmpty()`

These operations return the current number of elements in the heap and check if it's empty, respectively.

**Time Complexity: O(1)**

## 4. Why Heaps are Efficient

*   **Logarithmic Operations**: The core `insert` and `extract` operations are `O(log N)`, which is very efficient, especially for large `N`. This is because the height of a complete binary tree with `N` nodes is `log N`.
*   **Constant-Time Access to Min/Max**: `peek()` allows instant access to the minimum or maximum element, which is the defining feature of priority queues.
*   **Space Efficiency**: The array-based representation is very compact, using only `O(N)` space.

## 5. Applications of Heaps (Common Interview Scenarios)

Heaps are versatile and used in many algorithms and data structures:

*   **Priority Queues**: Heaps are the primary implementation for priority queues, where elements are retrieved based on their priority (e.g., task scheduling).
*   **Finding Kth Smallest/Largest Elements**: Efficiently finding the Kth largest/smallest element in a stream or large array.
*   **Median of a Data Stream**: Maintaining the median of a dynamically changing set of numbers.
*   **Sorting (Heapsort)**: While not directly implemented here, heapsort is an `O(N log N)` comparison-based sorting algorithm.
*   **Graph Algorithms**: Used in algorithms like Dijkstra's (for shortest path) and Prim's (for minimum spanning tree) to efficiently retrieve the minimum-weight edge/vertex.
*   **Merging K Sorted Lists/Arrays**: Efficiently combining multiple sorted collections into one.
*   **Huffman Coding**: Used to build optimal prefix codes for data compression.

Understanding heaps deeply is crucial for solving a wide range of algorithmic problems.
```