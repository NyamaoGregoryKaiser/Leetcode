```markdown
# Algorithm Explanation: Heap Operations

This document provides a detailed explanation of the Heap data structure, its custom implementation within this project, and the logic behind solving the included problems using heaps.

## 1. Introduction to Heaps

A **Heap** is a specialized tree-based data structure that satisfies the heap property:

*   **Min-Heap Property:** For every node `i` other than the root, the value of `i` is greater than or equal to the value of its parent `p`. (Smallest element is at the root).
*   **Max-Heap Property:** For every node `i` other than the root, the value of `i` is less than or equal to the value of its parent `p`. (Largest element is at the root).

Heaps are typically implemented as an array. The parent-child relationships are calculated based on array indices:
*   For a node at index `i`:
    *   Its left child is at `2*i + 1`.
    *   Its right child is at `2*i + 2`.
    *   Its parent is at `(i - 1) / 2`.

**Why use Heaps?**
Heaps are efficient for quickly finding the minimum (Min-Heap) or maximum (Max-Heap) element, and for maintaining a sorted order among a dynamically changing set of elements. Key operations (insertion, deletion of min/max) have a time complexity of `O(log n)`, where `n` is the number of elements in the heap.

## 2. Custom Heap Implementation (`src/heap_operations.hpp`)

This project includes generic `MinHeap` and `MaxHeap` classes. They are implemented using a `std::vector` as the underlying storage.

### 2.1 Core Operations

*   **`push(T value)`**: Inserts a new element.
    1.  Add the new element to the end of the `std::vector`.
    2.  Perform `heapify_up` to restore the heap property.
*   **`pop()`**: Removes the top (min/max) element.
    1.  Swap the root element with the last element in the `std::vector`.
    2.  Remove the last element (which was the original root).
    3.  Perform `heapify_down` from the new root to restore the heap property.
*   **`top()`**: Returns the top (min/max) element without removing it.
*   **`size()` / `empty()`**: Standard container operations.

### 2.2 Heapify Operations

These are crucial for maintaining the heap property after insertion or deletion.

#### `heapify_up(int index)`
This operation moves an element at `index` up the tree until it finds its correct position.

**Logic:**
1.  Compare the element at `index` with its parent `(index - 1) / 2`.
2.  If the element is smaller than its parent (for Min-Heap) or larger (for Max-Heap), swap them.
3.  Repeat step 1-2 with the parent's index until the element is at the root or its parent is in the correct order.

**ASCII Diagram (Min-Heap - `heapify_up` example after inserting 2):**
Initial state:
```
        5
       / \
      8   10
     / \
    12  9
```
Insert 2:
```
        5
       / \
      8   10
     / \   /
    12  9 2
```
`heapify_up(index=5, value=2)`:
*   `2` (idx 5) < `10` (idx 2)? Yes. Swap.
```
        5
       / \
      8   2
     / \   /
    12  9 10
```
*   `2` (idx 2) < `5` (idx 0)? Yes. Swap.
```
        2
       / \
      8   5
     / \   /
    12  9 10
```
Heap property restored.

#### `heapify_down(int index)`
This operation moves an element at `index` down the tree until it finds its correct position.

**Logic:**
1.  Find the smallest child (for Min-Heap) or largest child (for Max-Heap) of the element at `index`.
2.  If the element at `index` is greater than its smallest child (for Min-Heap) or smaller than its largest child (for Max-Heap), swap them.
3.  Repeat step 1-2 with the child's index until the element has no children or is in the correct order relative to its children.

**ASCII Diagram (Min-Heap - `heapify_down` example after popping root 5):**
Initial state (root 5 popped, last element 12 moved to root):
```
        12
       /  \
      8    10
     / \
    9   7
```
`heapify_down(index=0, value=12)`:
*   Children of `12` are `8` (idx 1) and `10` (idx 2). Smallest is `8`.
*   `12` (idx 0) > `8` (idx 1)? Yes. Swap.
```
        8
       /  \
      12   10
     /  \
    9    7
```
*   Now `12` is at `idx 1`. Children of `12` are `9` (idx 3) and `7` (idx 4). Smallest is `7`.
*   `12` (idx 1) > `7` (idx 4)? Yes. Swap.
```
        8
       /  \
      7    10
     /  \
    9    12
```
Heap property restored.

## 3. Problem Explanations

### Problem 1: Kth Largest Element in a Stream

**Description:** Design a class `KthLargest` that takes an integer `k` and an array `nums` as constructor parameters. It should have a method `add(val)` that returns the k-th largest element in the stream after adding `val`.

**Core Idea:**
To find the k-th largest element efficiently, we don't need all elements sorted. We only care about the top `k` largest elements. A **Min-Heap** of size `k` is perfect for this.

**Algorithm (Min-Heap):**
1.  **Initialization:** Create a Min-Heap. Iterate through the initial `nums` array. For each number:
    *   Push the number into the heap.
    *   If the heap size exceeds `k`, pop the smallest element (which is `top()`). This ensures the heap always contains the `k` largest elements seen so far.
2.  **`add(val)` method:**
    *   Push `val` into the heap.
    *   If the heap size exceeds `k`, pop the smallest element.
    *   The `top()` of the Min-Heap will be the k-th largest element.

**Time/Space Complexity:**
*   **Initialization:** `O(N log K)` time, `O(K)` space (where `N` is initial `nums` size).
*   **`add` operation:** `O(log K)` time, `O(K)` space.

### Problem 2: Merge K Sorted Lists

**Description:** Merge `k` sorted linked lists into one sorted linked list.

**Core Idea:**
This problem can be thought of as repeatedly finding the smallest element among the `k` current heads of the lists. A **Min-Heap** is ideal for this.

**Algorithm (Min-Heap of Pointers/Nodes):**
1.  Create a dummy head for the merged list.
2.  Create a Min-Heap that stores pointers/nodes to the current heads of the `k` lists, ordered by their values.
3.  Initialize the heap: For each of the `k` lists, if its head is not null, push its head node into the heap.
4.  While the heap is not empty:
    *   Extract the smallest node `min_node` from the heap (this will be the `top()` and `pop()` it).
    *   Append `min_node` to the merged list.
    *   If `min_node` has a `next` node, push `min_node->next` into the heap.
5.  Return the `next` of the dummy head.

**Time/Space Complexity:**
*   Let `N` be the total number of elements across all `k` lists.
*   **Time:** `O(N log K)`. Each of the `N` elements is pushed into and popped from the heap once. Each heap operation takes `O(log K)` time because the heap size is at most `k`.
*   **Space:** `O(K)` for the heap to store at most `k` elements (one from each list).

**Brute Force Comparison:**
*   Collect all elements into a single `std::vector`.
*   Sort the `std::vector`.
*   Reconstruct a new linked list.
*   **Time:** `O(N log N)` for sorting.
*   **Space:** `O(N)` for the vector.
*   **Conclusion:** Heap approach is better when `K` is significantly smaller than `N` (e.g., `K << N`).

### Problem 3: Find Median from Data Stream

**Description:** Design a data structure that supports adding new numbers and finding the median of all numbers added so far.

**Core Idea:**
Maintain two heaps:
1.  A **Max-Heap** (`lower_half`): Stores the smaller half of the numbers.
2.  A **Min-Heap** (`upper_half`): Stores the larger half of the numbers.

The goal is to keep these heaps balanced such that:
*   `lower_half.top()` is the largest element in the smaller half.
*   `upper_half.top()` is the smallest element in the larger half.
*   The sizes of the heaps differ by at most 1.

**Algorithm:**
1.  **`addNum(num)`:**
    *   If `lower_half` is empty or `num <= lower_half.top()`, push `num` to `lower_half`.
    *   Else, push `num` to `upper_half`.
    *   **Balance Heaps:**
        *   If `lower_half.size() > upper_half.size() + 1`: Move `lower_half.top()` to `upper_half`.
        *   If `upper_half.size() > lower_half.size()`: Move `upper_half.top()` to `lower_half`.

2.  **`findMedian()`:**
    *   If `lower_half.size() == upper_half.size()`: Median is `(lower_half.top() + upper_half.top()) / 2.0`.
    *   Else (`lower_half` will have one more element): Median is `lower_half.top()`.

**Time/Space Complexity:**
*   **`addNum`:** `O(log N)` time, where `N` is the total numbers added. (Heap insertions/deletions take log time).
*   **`findMedian`:** `O(1)` time.
*   **Space:** `O(N)` to store all numbers across two heaps.

### Problem 4: Top K Frequent Elements

**Description:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.

**Core Idea:**
1.  First, count the frequency of each element.
2.  Then, use a **Min-Heap** to keep track of the `k` elements with the highest frequencies seen so far. The heap will store `(frequency, element)` pairs, ordered by frequency.

**Algorithm:**
1.  **Count Frequencies:** Use a `std::unordered_map<int, int>` to store `(element, frequency)` pairs. Iterate through `nums` to populate this map.
2.  **Build Min-Heap:** Create a Min-Heap that stores `std::pair<int, int>` (frequency, element). The heap should be ordered by the `frequency` (first element of the pair).
3.  Iterate through the `(element, frequency)` pairs in the map:
    *   Push the current `(frequency, element)` pair into the heap.
    *   If the heap size exceeds `k`, pop the element with the smallest frequency (which is `top()`).
4.  **Extract Results:** After processing all elements, the heap will contain the `k` most frequent elements. Pop all elements from the heap and add their associated element values to a result vector.

**Time/Space Complexity:**
*   **Frequency Counting:** `O(N)` time, `O(N)` space for the map (where `N` is the number of elements in `nums`).
*   **Heap Operations:** `O(M log K)` time, where `M` is the number of *unique* elements in `nums` (`M <= N`). Each push/pop on a heap of size `k` is `O(log K)`.
*   **Total Time:** `O(N + M log K)`. In the worst case, `M = N`, so `O(N log K)`.
*   **Total Space:** `O(N)` for the map, `O(K)` for the heap. So `O(N)` overall.

---

This document should provide a solid understanding of the concepts and implementations within the project. Refer to the code for specific details and `INTERVIEW_TIPS.md` for interview-specific guidance.
```