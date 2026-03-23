```markdown
# Heap Operations Explained

This document provides a detailed explanation of Heap data structures, their properties, common operations, and how they are implemented using arrays.

## 1. What is a Heap?

A Heap is a specialized tree-based data structure that satisfies the **heap property**. It is typically implemented as a complete binary tree.

### Complete Binary Tree Property
A complete binary tree is a binary tree in which all levels are completely filled except possibly the last level, and all nodes in the last level are as far left as possible. This property is crucial for efficient array-based representation.

### Heap Property
There are two main types of heaps, defined by their heap property:

*   **Min-Heap:** For every node `i` other than the root, the value of node `i` is greater than or equal to the value of its parent `p`. This means the smallest element is always at the root.
    ```
          1
         / \
        2   3
       / \
      4   5
    ```

*   **Max-Heap:** For every node `i` other than the root, the value of node `i` is less than or equal to the value of its parent `p`. This means the largest element is always at the root.
    ```
          5
         / \
        4   3
       / \
      2   1
    ```

## 2. Array Representation of a Heap

Due to the complete binary tree property, a heap can be efficiently stored in a simple array without using pointers. This is a common and memory-efficient way to implement heaps.

Given an element at index `i` (0-indexed):
*   **Parent Node:** `(i - 1) / 2` (using integer division, e.g., `Math.floor((i-1)/2)`)
*   **Left Child:** `2 * i + 1`
*   **Right Child:** `2 * i + 2`

**Example: Min-Heap [1, 2, 3, 4, 5]**

```
Array Indices: [0, 1, 2, 3, 4]
Array Values:  [1, 2, 3, 4, 5]

Visual Tree:
       (0) 1
       /   \
  (1) 2     (2) 3
     / \
(3) 4   (4) 5

- Node at index 0 (value 1):
  - Left child: 2*0+1 = 1 (value 2)
  - Right child: 2*0+2 = 2 (value 3)

- Node at index 1 (value 2):
  - Parent: (1-1)/2 = 0 (value 1)
  - Left child: 2*1+1 = 3 (value 4)
  - Right child: 2*1+2 = 4 (value 5)
```

## 3. Core Heap Operations

The primary operations on a heap are `insert` and `extract-min/max`. Both rely on helper functions `heapifyUp` (also called `bubbleUp` or `siftUp`) and `heapifyDown` (also called `bubbleDown` or `siftDown`).

### a. `insert(item)`: Adding an Element

1.  Place the new `item` at the very end of the heap array (maintaining the complete tree property).
2.  Call `heapifyUp` on the newly inserted `item` to restore the heap property.

#### `heapifyUp(index)` (for Min-Heap)

Starts from the `index` of the newly inserted element and moves it upwards until the heap property is satisfied.
If the element at `index` is smaller than its parent, swap them. Repeat until the element is at the root or is greater than or equal to its parent.

**Example: Min-Heap, insert 1 into [2, 3, 5, 4]**

```
Initial state (after appending 1):
Array: [2, 3, 5, 4, 1]
Indices: 0  1  2  3  4

Tree:
       2
      / \
     3   5
    / \
   4   1 (index 4)

heapifyUp(4):
1. Compare arr[4] (1) with parent arr[(4-1)/2=1] (3). 1 < 3. Swap.
   Array: [2, 1, 5, 4, 3]
   Current index: 1
   Tree:
          2
         / \
        1   5
       / \
      4   3

2. Compare arr[1] (1) with parent arr[(1-1)/2=0] (2). 1 < 2. Swap.
   Array: [1, 2, 5, 4, 3]
   Current index: 0 (root, stop)
   Tree:
          1
         / \
        2   5
       / \
      4   3

Heap property restored.
```

### b. `extract-min/max()`: Removing the Top Element

1.  The root element is the min (or max) element. Save it to return later.
2.  Replace the root with the last element in the heap array (maintaining the complete tree property).
3.  Remove the last element (which is now at the root) from its original position (effectively shortening the array).
4.  Call `heapifyDown` on the new root (index 0) to restore the heap property.

#### `heapifyDown(index)` (for Min-Heap)

Starts from `index` and moves the element downwards until the heap property is satisfied.
If the element at `index` is greater than its child (or the smaller of its two children), swap it with the smaller child. Repeat until the element is a leaf or is smaller than or equal to both its children.

**Example: Min-Heap, extractMin from [1, 2, 5, 4, 3]**

```
Initial state (after extracting 1 and moving 3 to root):
Array: [3, 2, 5, 4]
Indices: 0  1  2  3

Tree:
          3 (index 0)
         / \
        2   5
       /
      4

heapifyDown(0):
1. Children of arr[0] (3): arr[1] (2), arr[2] (5). Smallest child is 2.
   Compare arr[0] (3) with arr[1] (2). 3 > 2. Swap.
   Array: [2, 3, 5, 4]
   Current index: 1
   Tree:
          2
         / \
        3   5
       /
      4

2. Children of arr[1] (3): arr[3] (4). (No right child). Smallest child is 4.
   Compare arr[1] (3) with arr[3] (4). 3 < 4. No swap needed. Stop.
   (The node at index 1 is now smaller than its child or has no children).

Heap property restored.
```

### c. `peek()`: Inspecting the Top Element

1.  Returns the element at index 0 (the root) without modifying the heap.

### d. `buildHeap(array)`: Initializing from an Array

This operation transforms an arbitrary array into a heap in `O(N)` time.
The naive approach of `N` successive `insert` operations would take `O(N log N)`.

1.  Treat the given array as the internal storage for the heap.
2.  Start from the last non-leaf node (index `floor(N/2) - 1` for a 0-indexed array of size `N`).
3.  For each node from `floor(N/2) - 1` down to 0 (the root), call `heapifyDown`.
    By starting from the bottom-most parents and working upwards, `heapifyDown` ensures that the subtree rooted at the current node becomes a valid heap. When it reaches the root (index 0), the entire structure is a heap.

## 4. Time and Space Complexity

| Operation       | Time Complexity | Space Complexity |
| :-------------- | :-------------- | :--------------- |
| `insert`        | O(log N)        | O(1) (amortized) |
| `extract-min/max` | O(log N)        | O(1)             |
| `peek`          | O(1)            | O(1)             |
| `isEmpty`, `size` | O(1)            | O(1)             |
| `buildHeap`     | O(N)            | O(1) (in-place)  |

*   **N**: Number of elements in the heap.
*   **Log N**: The height of a complete binary tree with N nodes is log₂N. Heapify operations traverse this height.
*   **Space Complexity**: O(N) for storing the elements in the underlying array. Operations themselves use O(1) auxiliary space.

## 5. Why Heaps are Efficient

*   **Fast Min/Max Access:** Constant time `peek()` for the smallest/largest element.
*   **Efficient Insertion/Deletion:** Logarithmic time for adding or removing elements, making them ideal for priority queues where elements are constantly being added and the highest/lowest priority needs to be retrieved.
*   **O(N) Build Time:** Can be constructed efficiently from an unsorted array.
*   **Memory Efficiency:** Array-based implementation is compact and cache-friendly, avoiding pointer overheads of linked structures.

Heaps are fundamental for algorithms like Heapsort, priority queues, finding k-th smallest/largest elements, merging sorted streams, and more.
```