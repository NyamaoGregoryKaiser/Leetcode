```markdown
# Algorithm Explanation: Heap Operations

This document provides a detailed explanation of Heap data structures and the algorithms used to solve the problems in this project.

## 1. Introduction to Heaps

A heap is a specialized tree-based data structure that satisfies the heap property. This property states that if `P` is a parent node of `C`, then the value of `P` must be either greater than or equal to (in a max-heap) or less than or equal to (in a min-heap) the value of `C`.

Heaps are typically implemented using an array, which gives them a compact representation and allows for efficient calculation of parent/child indices:
*   The root is at index `0`.
*   For any node at index `i`:
    *   Its left child is at `2*i + 1`.
    *   Its right child is at `2*i + 2`.
    *   Its parent is at `(i - 1) / 2` (integer division).

### 1.1 Min-Heap
In a min-heap, the value of each node is less than or equal to the values of its children. Consequently, the smallest element is always at the root (index `0`).

```
        (min_val)
        /     \
    (val1)   (val2)
    / \      / \
```

### 1.2 Max-Heap
In a max-heap, the value of each node is greater than or equal to the values of its children. Consequently, the largest element is always at the root (index `0`).

```
        (max_val)
        /     \
    (val1)   (val2)
    / \      / \
```

## 2. Core Heap Operations

The primary operations for maintaining the heap property after an insertion or deletion are `sift_up` (also known as `heapify-up` or `bubble-up`) and `sift_down` (also known as `heapify-down` or `bubble-down`).

### 2.1 `sift_up` (After Insertion)

When a new element is added to the heap, it's typically placed at the end of the array (last leaf node). `sift_up` then moves this element up the tree, swapping it with its parent if the heap property is violated, until it reaches its correct position.

**Algorithm:**
1.  Start at the `index` of the newly inserted element.
2.  While `index > 0` (not the root) and the element at `index` violates the heap property with its parent:
    *   Swap the element at `index` with its parent.
    *   Update `index` to its parent's index.

**Example (Min-Heap, inserting 1):**
Initial Heap (array): `[2, 5, 15, 12]`
Insert `1` -> `[2, 5, 15, 12, 1]` (index 4)

1.  `index = 4`, `parent_index = (4-1)/2 = 1`. `data[4]=1`, `data[1]=5`. `1 < 5`, swap.
    Heap: `[2, 1, 15, 12, 5]`
    `index = 1`
2.  `index = 1`, `parent_index = (1-1)/2 = 0`. `data[1]=1`, `data[0]=2`. `1 < 2`, swap.
    Heap: `[1, 2, 15, 12, 5]`
    `index = 0`
3.  `index = 0`. Loop terminates.

Final Heap: `[1, 2, 15, 12, 5]` (Min-heap property restored)

### 2.2 `sift_down` (After Deletion/Heapify)

When the root element is removed (e.g., `pop` in a min/max heap), the last element in the array is moved to the root position. `sift_down` then moves this element down the tree, swapping it with its smallest (for min-heap) or largest (for max-heap) child, until it satisfies the heap property.

`sift_down` is also used during the initial heap construction (heapify-down method).

**Algorithm:**
1.  Start at `index` (e.g., root, `0`).
2.  While the element at `index` has at least one child:
    *   Find the index of the "priority" child (smallest for min-heap, largest for max-heap).
    *   If the element at `index` satisfies the heap property with this child, break.
    *   Else, swap the element at `index` with the "priority" child.
    *   Update `index` to the child's index.

**Example (Min-Heap, popping 1):**
Initial Heap: `[1, 2, 15, 12, 5]`
Pop `1`: Remove `1`, move `5` to root. Array becomes `[5, 2, 15, 12]` (index 0)

1.  `index = 0`. `data[0]=5`. Children: `data[1]=2`, `data[2]=15`. Smallest child is `2` (at `index=1`).
    `5` is not `< 2`. Swap `5` and `2`.
    Heap: `[2, 5, 15, 12]`
    `index = 1`
2.  `index = 1`. `data[1]=5`. Children: `data[3]=12` (left child 2\*1+1=3). Right child `2*1+2=4` is out of bounds. Smallest child is `12` (at `index=3`).
    `5` is `< 12`. Heap property satisfied. Break.

Final Heap: `[2, 5, 15, 12]`

## 3. Problem Solutions Using Heaps

### 3.1 Kth Largest Element in an Array

**Problem Description**: Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array.

**Heap Approach (Min-Heap)**:
To find the `k`-th largest element, we maintain a min-heap of size `k`.
1.  Iterate through the `nums` array.
2.  For each `num`:
    *   Push `num` onto the min-heap.
    *   If the heap size exceeds `k`, pop the smallest element (which is `min_heap.top()`).
3.  After processing all elements, the `min_heap.top()` will be the `k`-th largest element.

**Why this works**: The min-heap always holds the `k` largest elements encountered so far. When a new element `X` arrives:
*   If `X` is smaller than the current smallest among the `k` largest (i.e., `min_heap.top()`), then `X` cannot be one of the `k` largest elements, so we discard it by not adding it (or adding it and immediately popping it).
*   If `X` is larger, it replaces the current smallest in the top `k`, effectively maintaining the `k` largest.

**Time Complexity**: `O(N log K)`
*   `N` elements are processed.
*   Each `push`/`pop` operation on a heap of size `K` takes `O(log K)` time.
**Space Complexity**: `O(K)` for the min-heap.

**Alternative (Quickselect)**: `O(N)` average, `O(N^2)` worst-case. This is a non-heap approach, usually faster on average but more complex to implement correctly for worst-case guarantee.

### 3.2 Merge K Sorted Lists

**Problem Description**: Merge `k` sorted linked lists into one sorted linked list.

**Heap Approach (Min-Heap of `ListNode*`)**:
We use a min-heap to keep track of the smallest element from all `k` lists currently available.
1.  Create a min-heap that stores `ListNode*` pointers, ordered by their `val`.
2.  Initialize the heap by pushing the head node of each non-empty list.
3.  Create a dummy head for the merged list.
4.  While the heap is not empty:
    *   Extract the node with the smallest `val` from the heap (`min_heap.top()` then `pop()`).
    *   Append this node to the merged list.
    *   If the extracted node has a `next` element, push `next` onto the heap.

```
       Heap (min-heap on node->val)
       [ (1, L1), (1, L2), (2, L3) ]  (initially, heads of lists)
         |
         v
    Merged List
```
**Example Walkthrough**: `lists = [[1,4,5],[1,3,4],[2,6]]`

1.  **Initial**: `heap = [{1,L1}, {1,L2}, {2,L3}]` (where {val, list_node} representing head). `merged = dummy`
2.  **Pop {1,L1}**: `merged = dummy -> 1`. Add `L1->next` (node 4 from L1).
    `heap = [{1,L2}, {2,L3}, {4,L1_next}]`
3.  **Pop {1,L2}**: `merged = dummy -> 1 -> 1`. Add `L2->next` (node 3 from L2).
    `heap = [{2,L3}, {3,L2_next}, {4,L1_next}]`
4.  **Pop {2,L3}**: `merged = dummy -> 1 -> 1 -> 2`. Add `L3->next` (node 6 from L3).
    `heap = [{3,L2_next}, {4,L1_next}, {6,L3_next}]`
...and so on.

**Time Complexity**: `O(N log K)`
*   `N` is the total number of elements across all lists.
*   Each element is pushed into and popped from a heap, which takes `O(log K)` time because the heap size is at most `K` (the number of lists).
**Space Complexity**: `O(K)` for the min-heap.

**Alternative (Divide and Conquer)**: `O(N log K)`. Merging two lists is `O(L1 + L2)`. Repeatedly merging pairs of lists until only one remains. This offers similar performance to the heap approach.

### 3.3 Find Median from Data Stream

**Problem Description**: Implement a data structure `MedianFinder` that can `addNum` and `findMedian`.

**Heap Approach (Two Heaps)**:
We maintain two heaps:
*   A **max-heap** (`low_heap`) to store the *smaller half* of the numbers.
*   A **min-heap** (`high_heap`) to store the *larger half* of the numbers.

The `max_heap.top()` will be the largest element in the smaller half, and `min_heap.top()` will be the smallest element in the larger half.

**Key Invariants**:
1.  All elements in `low_heap` are less than or equal to all elements in `high_heap`.
2.  The sizes of the heaps differ by at most 1 (`|low_heap.size() - high_heap.size()| <= 1`).

**`addNum(int num)` logic**:
1.  **Placement**:
    *   If `low_heap` is empty or `num <= low_heap.top()`, push `num` to `low_heap`.
    *   Else, push `num` to `high_heap`.
2.  **Rebalancing**:
    *   If `low_heap.size() > high_heap.size() + 1`, move `low_heap.top()` to `high_heap`. (Maintain max_heap larger or equal size)
    *   If `high_heap.size() > low_heap.size()`, move `high_heap.top()` to `low_heap`. (Maintain max_heap potentially larger by 1 for odd total count)

**`findMedian()` logic**:
*   If `low_heap.size() == high_heap.size()` (even total numbers): Median is `(low_heap.top() + high_heap.top()) / 2.0`.
*   If `low_heap.size() > high_heap.size()` (odd total numbers): Median is `low_heap.top()`. (The single middle element is always kept in the max-heap `low_heap`).

**Example Walkthrough**:
Initial: `low_heap = []`, `high_heap = []`

1.  `addNum(1)`: `low_heap = [1]` (`high_heap` empty, `1 <= 0` false, so pushes to low). Rebalance not needed.
    `findMedian()`: `1.0`
2.  `addNum(2)`: `2 > low_heap.top() (1)`, push `2` to `high_heap`. `low_heap=[1]`, `high_heap=[2]`.
    Rebalance: `high_heap.size() (1) == low_heap.size() (1)`. No rebalance.
    `findMedian()`: `(1+2)/2.0 = 1.5`
3.  `addNum(3)`: `3 > low_heap.top() (1)`, push `3` to `high_heap`. `low_heap=[1]`, `high_heap=[2,3]`.
    Rebalance: `high_heap.size() (2) > low_heap.size() (1)`. Move `high_heap.top() (2)` to `low_heap`.
    `low_heap=[1,2]`, `high_heap=[3]`.
    `findMedian()`: `low_heap.size() (2) > high_heap.size() (1)`. Median is `low_heap.top() (2.0)`.

**Time Complexity**:
*   `addNum`: `O(log N)` (heap push/pop operations).
*   `findMedian`: `O(1)`.
**Space Complexity**: `O(N)` to store all numbers.

### 3.4 Top K Frequent Elements

**Problem Description**: Return the `k` most frequent elements from a given integer array.

**Heap Approach (Min-Heap of `(frequency, element)` pairs)**:
1.  **Frequency Counting**: Use a hash map (e.g., `std::unordered_map` or `std::map`) to count the frequency of each element in the input array.
    *   `Map: {element -> frequency}`
2.  **Min-Heap Maintenance**: Create a min-heap that stores pairs `(frequency, element)`. The heap should prioritize smaller frequencies at the top.
    *   Iterate through the `(element, frequency)` pairs from the map.
    *   For each pair `(freq, num)`:
        *   Push `(freq, num)` onto the min-heap.
        *   If the heap's size exceeds `k`, pop the pair with the smallest frequency (which is `min_heap.top()`). This ensures the heap always holds the `k` pairs with the highest frequencies.
3.  **Result Extraction**: After processing all frequencies, the heap contains the `k` most frequent elements. Extract the `element` part of each pair from the heap into a result vector.

**Example Walkthrough**: `nums = [1,1,1,2,2,3], k = 2`

1.  **Frequency Map**: `map = {1:3, 2:2, 3:1}`
2.  **Min-Heap**: (stores `(frequency, element)` pairs)
    *   Process `(1,3)`: `heap = [(1,3)]` (push 3,1)
    *   Process `(2,2)`: `heap = [(2,2), (1,3)]` (push 2,2. (2,2) is smaller than (1,3) by first component (frequency) so it's top)
    *   Process `(3,1)`: `heap = [(3,1), (2,2), (1,3)]`. Heap size is 3, which is `> k=2`. Pop `(3,1)` (smallest frequency).
        `heap = [(2,2), (1,3)]`
3.  **Extract Result**:
    *   Pop `(2,2)`: `result = [2]`
    *   Pop `(1,3)`: `result = [2, 1]`

Final result (order doesn't matter): `[1, 2]`

**Time Complexity**: `O(N + M log K)`
*   `O(N)` to build the frequency map (`N` is total elements).
*   `O(M log K)` to iterate through `M` distinct elements (map entries) and perform `log K` heap operations. `M <= N`.
**Space Complexity**: `O(M + K)`
*   `O(M)` for the frequency map.
*   `O(K)` for the min-heap.

---
```