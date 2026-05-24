# Heap Operations: Algorithm Explanation

This document provides a detailed explanation of heap data structures, their operations, and how they are applied to solve common coding interview problems.

## 1. Introduction to Heaps

A **heap** is a specialized tree-based data structure that satisfies the **heap property**. It is typically implemented as an array-based binary tree, making it efficient for various operations.

### Heap Property
For any given node `i` in a heap:
*   **Min-Heap:** The value of node `i` is less than or equal to the value of its children. The smallest element is always at the root.
*   **Max-Heap:** The value of node `i` is greater than or equal to the value of its children. The largest element is always at the root.

### Binary Heap (Array Representation)
A binary heap is a complete binary tree, meaning all levels are fully filled except possibly the last level, which is filled from left to right. This completeness allows for an efficient array-based representation:
*   The root is at index `0`.
*   For a node at index `i`:
    *   Its left child is at index `2i + 1`.
    *   Its right child is at index `2i + 2`.
    *   Its parent is at index `(i - 1) / 2` (integer division).

**Example (Max-Heap):**
```
          100 (idx 0)
         /   \
      90(1)   80(2)
     /  \    /
    70(3) 60(4) 50(5)
```
Array representation: `[100, 90, 80, 70, 60, 50]`

## 2. Core Heap Operations

The primary operations on a heap are `push` (insert) and `pop` (delete max/min). Both operations involve restoring the heap property after an element is added or removed.

### 2.1. Push (Insert an element)

1.  Add the new element to the *end* of the array (maintaining completeness).
2.  **Heapify-Up (or Bubble-Up):** Compare the new element with its parent. If it violates the heap property (e.g., in a max-heap, child is greater than parent), swap them. Continue this process upwards until the heap property is restored or the root is reached.

**Example (Max-Heap, push 95):**
Initial: `[100, 90, 80, 70, 60, 50]`
1. Add 95: `[100, 90, 80, 70, 60, 50, 95]`
```
          100
         /   \
      90      80
     /  \    /  \
    70  60  50  95 (new, idx 6)
```
2. Heapify-Up 95:
   * 95 (idx 6), Parent 80 (idx 2). 95 > 80. Swap.
   `[100, 90, 95, 70, 60, 50, 80]`
```
          100
         /   \
      90      95 (idx 2)
     /  \    /  \
    70  60  50  80
```
   * 95 (idx 2), Parent 100 (idx 0). 95 < 100. Stop. Heap property restored.

Time Complexity: O(log N) in worst case (element bubbles up from leaf to root).

### 2.2. Pop (Remove the root element)

1.  Replace the root element with the *last* element in the array.
2.  Remove the last element (which was moved to the root).
3.  **Heapify-Down (or Bubble-Down):** Compare the new root element with its children. If it violates the heap property (e.g., in a max-heap, root is smaller than a child), swap it with the *larger* child (for max-heap) or *smaller* child (for min-heap). Continue this process downwards until the heap property is restored or it becomes a leaf node.

**Example (Max-Heap, pop 100):**
Initial: `[100, 90, 80, 70, 60, 50, 95]` (from previous push)
1. Swap 100 (root) with 95 (last): `[95, 90, 80, 70, 60, 50, 100]`
2. Remove 100: `[95, 90, 80, 70, 60, 50]`
```
          95 (new root)
         /   \
      90      80
     /  \    /
    70  60  50
```
3. Heapify-Down 95:
   * 95 (idx 0). Children: 90 (idx 1), 80 (idx 2).
   * Larger child is 90. 95 < 90 is false. 95 > 90. No swap needed. Stop.
   (Wait, this is wrong. 95 is not smaller than children, so no swap needed. But previous structure means it should be 100 at root before. Let's restart with the true root for clarity).

Let's use a clear example:
Initial Max-Heap: `[100, 90, 80, 70, 60, 50]`
```
          100 (idx 0)
         /   \
      90(1)   80(2)
     /  \    /
    70(3) 60(4) 50(5)
```
1. Replace root (100) with last (50): `[50, 90, 80, 70, 60, 100]`
2. Remove last element (now 100): `[50, 90, 80, 70, 60]`
```
          50 (new root)
         /   \
      90      80
     /  \
    70  60
```
3. Heapify-Down 50 (idx 0):
   * Children: 90 (idx 1), 80 (idx 2).
   * Largest child is 90. 50 < 90. Swap 50 and 90.
   `[90, 50, 80, 70, 60]`
```
          90
         /   \
      50 (idx 1)  80
     /  \
    70  60
```
4. Heapify-Down 50 (new index 1):
   * Children: 70 (idx 3), 60 (idx 4).
   * Largest child is 70. 50 < 70. Swap 50 and 70.
   `[90, 70, 80, 50, 60]`
```
          90
         /   \
      70      80
     /  \
    50 (idx 3) 60
```
5. Heapify-Down 50 (new index 3):
   * Children: none (indices 7, 8 out of bounds). Stop. Heap property restored.

Time Complexity: O(log N) in worst case (element bubbles down from root to leaf).

## 3. Custom Heap Implementation (`custom_heap.hpp`)

The `CustomHeap` class template provides a generic binary heap that can function as either a min-heap or a max-heap, depending on the supplied comparator.

*   **Template Parameters:**
    *   `T`: The type of elements to store.
    *   `Comparator`: A functor (like `std::less<T>` for max-heap or `std::greater<T>` for min-heap) that defines the priority. `comp(a, b)` returns `true` if `a` has *lower* priority than `b`.
        *   For Max-Heap: `a < b` means `a` has lower priority (smaller element).
        *   For Min-Heap: `a > b` means `a` has lower priority (larger element).
*   **Key Methods:**
    *   `push(const T& value)`: Inserts `value`, performs `heapifyUp`. O(log N).
    *   `pop()`: Removes root, moves last element to root, performs `heapifyDown`. O(log N).
    *   `top() const`: Returns the root element. O(1).
    *   `empty() const`, `size() const`: O(1).
    *   `CustomHeap(const std::vector<T>& data)`: Constructor to build a heap from a vector. It performs `heapifyDown` from `(size/2 - 1)` down to `0` to establish the heap property. This is an O(N) operation.

## 4. Problem Solutions

### Problem 1: Kth Largest Element in an Array

**Goal:** Find the Kth largest element in an unsorted array.

**Approach 1: Min-Heap (`findKthLargest_MinHeap`, `findKthLargest_CustomMinHeap`)**
1.  Initialize a min-heap.
2.  Iterate through `nums`:
    *   Push the current number into the min-heap.
    *   If the heap's size exceeds `k`, pop the smallest element (from the top of the min-heap).
3.  After iterating through all numbers, the min-heap will contain the `k` largest elements. Its top element will be the `k`th largest.

*   **Time Complexity:** `O(N log K)` (N pushes/pops, each O(log K) for a heap of size K).
*   **Space Complexity:** `O(K)` (to store K elements in the heap).

**Approach 2: Quickselect (`findKthLargest_Quickselect`)**
Quickselect is a selection algorithm that finds the k-th smallest (or largest) element. It's an average O(N) algorithm, similar to QuickSort but only partitions one side of the pivot.

1.  The problem asks for the Kth largest. This is equivalent to finding the `(N - K)`th smallest element (0-indexed). Let `target_index = nums.size() - k`.
2.  Use a partitioning scheme (like in QuickSort) that rearranges elements such that all elements less than the pivot are on its left, and all greater elements are on its right. The `partition` function returns the pivot's final index.
3.  Compare `pivot_index` with `target_index`:
    *   If `pivot_index == target_index`, we found the element.
    *   If `pivot_index < target_index`, the element is in the right partition.
    *   If `pivot_index > target_index`, the element is in the left partition.
4.  Recursively apply this process to the relevant sub-array until the element is found. (Iterative implementation provided to avoid deep recursion stack issues).

*   **Average Time Complexity:** `O(N)`. Random pivot selection helps achieve this.
*   **Worst-case Time Complexity:** `O(N^2)` (if pivot selection consistently picks the smallest/largest element).
*   **Space Complexity:** `O(1)` (in-place modification, recursion stack `O(log N)` average, `O(N)` worst).

### Problem 2: Merge K Sorted Lists

**Goal:** Merge `K` sorted linked lists into one sorted linked list.

**Approach 1: Min-Heap (`mergeKLists_MinHeap`, `mergeKLists_CustomMinHeap`)**
1.  Initialize a min-heap that stores `ListNode*` pointers, ordered by their `val`.
    *   For `std::priority_queue`, use `std::greater<ListNode*>` (or a custom struct `CompareListNode`) to create a min-heap.
    *   For `CustomHeap`, use `CustomCompareListNode`.
2.  Add the head of each non-empty list to the min-heap.
3.  Create a dummy head for the merged list.
4.  While the heap is not empty:
    *   Extract the node with the smallest value (heap's top).
    *   Append this node to the merged list.
    *   If the extracted node has a `next` element, push that `next` element into the heap.
5.  Return `dummy_head->next`.

*   **Time Complexity:** `O(N log K)`.
    *   `N` is the total number of elements across all lists.
    *   `K` is the number of lists.
    *   Each of the N elements is pushed into and popped from the heap once. Each heap operation takes `O(log K)` time.
*   **Space Complexity:** `O(K)` (the heap stores at most K elements, one from each list).

### Problem 3: Top K Frequent Elements

**Goal:** Find the `K` most frequent elements in an array.

**Approach 1: Hash Map + Min-Heap (`topKFrequent_MinHeap`, `topKFrequent_CustomMinHeap`)**
1.  Use a `std::map<int, int>` (or `std::unordered_map`) to count the frequency of each number in the input array.
2.  Initialize a min-heap that stores `std::pair<int, int>` elements (frequency, number).
    *   The comparator should prioritize elements with *smaller* frequencies to be at the top.
    *   For `std::priority_queue`, use a custom comparator like `ComparePairFrequency`.
    *   For `CustomHeap`, use `CustomComparePairFrequency`.
3.  Iterate through the frequency map:
    *   Push each `(frequency, number)` pair into the min-heap.
    *   If the heap's size exceeds `K`, pop the top element (which has the smallest frequency).
    *   This ensures the heap always contains the `K` pairs with the highest frequencies.
4.  Extract the `number` component from the `K` pairs remaining in the heap into a result vector.

*   **Time Complexity:** `O(N + M log K)`.
    *   `O(N)` to build the frequency map (N elements in input array).
    *   `O(M log K)` to iterate through `M` unique elements in the map and perform heap operations (M is the number of unique elements, M <= N).
*   **Space Complexity:** `O(M + K)`.
    *   `O(M)` for the frequency map.
    *   `O(K)` for the min-heap.

**Approach 2: Hash Map + Bucket Sort (`topKFrequent_BucketSort`)**
This approach can achieve O(N) time complexity.

1.  Use a `std::map<int, int>` to count the frequency of each number.
2.  Create a `std::vector<std::vector<int>>` called `buckets`. The index of `buckets` represents a frequency, and the inner vector at that index stores all numbers that appear with that frequency. The maximum possible frequency is `N` (the size of the input array).
3.  Populate the `buckets` by iterating through the frequency map.
4.  Iterate through the `buckets` from the highest possible frequency (`N`) down to `1`. For each frequency, add all numbers in that bucket to the result list until `K` elements are collected.

*   **Time Complexity:** `O(N)`.
    *   `O(N)` for frequency counting.
    *   `O(N)` for populating buckets (worst case, if all numbers unique, map has N entries, max freq 1).
    *   `O(N)` for collecting results (total elements collected is at most N).
*   **Space Complexity:** `O(N)`.
    *   `O(N)` for the frequency map.
    *   `O(N)` for the buckets array (max frequency can be N).

### Problem 4: Find Median from Data Stream

**Goal:** Design a data structure that efficiently supports adding numbers and finding the current median.

**Approach 1: Two Heaps (`MedianFinder`, `CustomMedianFinder`)**
This is a classic application of two heaps.

1.  **Data Structure:**
    *   `max_heap_small_half`: A max-heap to store the smaller half of the numbers. Its top element is the largest in the smaller half.
    *   `min_heap_large_half`: A min-heap to store the larger half of the numbers. Its top element is the smallest in the larger half.

2.  **`addNum(int num)` logic:**
    *   **Placement:** If `num` is smaller than or equal to the top of `max_heap_small_half` (or if `max_heap_small_half` is empty), push `num` into `max_heap_small_half`. Otherwise, push it into `min_heap_large_half`.
    *   **Balancing Invariant:** The sizes of the two heaps should differ by at most 1. Specifically, `max_heap_small_half` can have at most one more element than `min_heap_large_half`.
        *   If `max_heap_small_half.size() > min_heap_large_half.size() + 1`: Move `max_heap_small_half.top()` to `min_heap_large_half`.
        *   If `min_heap_large_half.size() > max_heap_small_half.size()`: Move `min_heap_large_half.top()` to `max_heap_small_half`.
    *   This strategy ensures that `max_heap_small_half.top()` is always less than or equal to `min_heap_large_half.top()`.

3.  **`findMedian()` logic:**
    *   If the total number of elements is odd (`max_heap_small_half.size() > min_heap_large_half.size()`): The median is simply `max_heap_small_half.top()`.
    *   If the total number of elements is even: The median is the average of `max_heap_small_half.top()` and `min_heap_large_half.top()`.

*   **`addNum` Time Complexity:** `O(log N)` (each heap push/pop is logarithmic).
*   **`findMedian` Time Complexity:** `O(1)` (accessing heap tops is constant time).
*   **Space Complexity:** `O(N)` (to store all N numbers in the two heaps).

---