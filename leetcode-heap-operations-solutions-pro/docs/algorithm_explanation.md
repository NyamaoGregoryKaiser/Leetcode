# Heap Algorithm Explanations

This document provides a detailed explanation of the Heap data structure and the algorithms used to solve the problems in this project.

## 1. The Heap Data Structure

A heap is a specialized tree-based data structure that satisfies the heap property. It is typically implemented as an array.

**Heap Properties:**
1.  **Shape Property:** A heap is a **complete binary tree**. This means all levels of the tree are fully filled, except possibly the last level, which is filled from left to right. This property allows heaps to be efficiently stored in an array.
    *   For a node at index `i`:
        *   Its left child is at `2i + 1`.
        *   Its right child is at `2i + 2`.
        *   Its parent is at `(i - 1) // 2`.
2.  **Heap Property:**
    *   **Min-Heap:** For every node `i` (except the root), the value of node `i` is greater than or equal to the value of its parent `p`. This means the smallest element is always at the root.
    *   **Max-Heap:** For every node `i` (except the root), the value of node `i` is less than or equal to the value of its parent `p`. This means the largest element is always at the root.

**Key Operations:**

*   **`heapify_up` (or `sift_up`/`bubble_up`):** Used after inserting a new element at the end of the heap. It compares the new element with its parent and swaps them if the heap property is violated, moving the new element upwards until the property is restored or it reaches the root.
    *   Time Complexity: O(log N)
*   **`heapify_down` (or `sift_down`/`bubble_down`):** Used after removing the root element (the min/max). The last element of the heap replaces the root, and then it is compared with its children and swapped with the smaller (min-heap) or larger (max-heap) child, moving downwards until the property is restored or it reaches a leaf.
    *   Time Complexity: O(log N)
*   **`push` (insert):** Adds a new element to the heap. It appends the element to the end of the array and then calls `heapify_up`.
    *   Time Complexity: O(log N)
*   **`pop` (delete min/max):** Removes and returns the root element (the min/max). It swaps the root with the last element, removes the last element, and then calls `heapify_down` on the new root.
    *   Time Complexity: O(log N)
*   **`peek` (get min/max):** Returns the root element without removing it.
    *   Time Complexity: O(1)

**Python's `heapq` Module:**
Python's standard library `heapq` module provides an implementation of the min-heap. It treats a regular Python list as a heap.
*   `heapq.heappush(heap, item)`: Pushes an item onto the heap.
*   `heapq.heappop(heap)`: Pops and returns the smallest item from the heap.
*   `heapq.heapify(x)`: Transforms list `x` into a heap, in-place, in linear time.
*   To simulate a max-heap using `heapq`, one typically negates the values before pushing them onto the min-heap and negates them back when popping.

## 2. Algorithms for Problems

### Problem 1: Kth Largest Element in an Array

**Problem:** Find the `k`th largest element.

**Heap Approach (Min-Heap):**
1.  We need to find the `k` largest elements. A min-heap is ideal for this.
2.  Initialize an empty min-heap.
3.  Iterate through each `num` in the input array:
    *   Push `num` onto the min-heap.
    *   If the size of the min-heap exceeds `k`, pop the smallest element from the heap (which is the root).
4.  After processing all numbers, the min-heap will contain exactly `k` elements. The smallest element in this min-heap (its root) will be the `k`th largest element from the original array.

**Why a Min-Heap of size `k`?**
If we maintain a min-heap of size `k`, it implies that all `k` elements currently in the heap are larger than any element that was popped out. When a new element comes, we add it. If the heap grows to `k+1`, the smallest of these `k+1` elements is removed. This smallest element is either the new element (if it's very small) or one of the previous `k` elements (if the new element is large). In any case, we are always keeping the `k` largest elements. The root of this min-heap is therefore the `k`th largest element overall.

*   **Time Complexity:** O(N log k) - For N elements, each heap operation takes O(log k) time.
*   **Space Complexity:** O(k) - The heap stores at most `k` elements.

### Problem 2: Merge K Sorted Lists

**Problem:** Merge `k` sorted linked lists into one.

**Heap Approach (Min-Heap):**
1.  Initialize a dummy `ListNode` and a `current` pointer to it to build the merged list.
2.  Create a min-heap.
3.  For each of the `k` input linked lists, if it's not empty, push its first node (the head) into the min-heap.
    *   **Important:** The `ListNode` class must implement `__lt__` (less than) for proper comparison within the heap. Python's `heapq` can handle custom objects if they are comparable.
4.  While the min-heap is not empty:
    *   Pop the smallest node (`node`) from the heap. This is the next smallest element overall.
    *   Append `node` to the merged list: `current.next = node`, then `current = current.next`.
    *   If the popped `node` has a `next` node (meaning its list is not exhausted), push `node.next` into the min-heap. This ensures the next element from that list is considered.
5.  Return `dummy.next`, which is the head of the completely merged list.

**Why a Min-Heap?**
At any point, we want to know the absolute smallest element among the *current* heads of all `k` lists. A min-heap efficiently provides this smallest element in O(1) (peek) or O(log k) (pop) time.

*   **Time Complexity:** O(N log k) - N is the total number of nodes across all lists. Each of the N nodes is pushed and popped exactly once. Each heap operation takes O(log k) time, where `k` is the number of lists.
*   **Space Complexity:** O(k) - The heap stores at most `k` nodes (one from each list).

### Problem 3: Top K Frequent Elements

**Problem:** Find the `k` most frequent elements.

**Heap Approach (Min-Heap):**
1.  **Count Frequencies:** Use a hash map (like Python's `collections.Counter`) to count the frequency of each number in the input array. This takes O(N) time.
2.  Initialize an empty min-heap. This heap will store `(frequency, number)` pairs. We want to keep the `k` elements with the *highest* frequencies.
3.  Iterate through the `(number, frequency)` pairs from the frequency map:
    *   Push the pair `(frequency, number)` onto the min-heap.
    *   If the size of the min-heap exceeds `k`, pop the pair with the smallest frequency (the root).
4.  After processing all pairs, the min-heap will contain `k` pairs, which correspond to the `k` most frequent elements.
5.  Extract the numbers from these `k` pairs and return them.

**Why a Min-Heap of size `k` for *Top K*?**
Similar to "Kth Largest", a min-heap of size `k` effectively keeps track of the "largest `k` items". In this case, "largest" refers to frequency. By popping the minimum frequency element when the heap size exceeds `k`, we ensure only the `k` highest frequency elements remain.

*   **Time Complexity:** O(N + M log k) - N for counting frequencies (M is number of unique elements). M for iterating through unique elements, each heap operation O(log k). In the worst case (all elements unique), M=N, resulting in O(N log k).
*   **Space Complexity:** O(M + k) - O(M) for the frequency map, O(k) for the heap. In the worst case, O(N + k) = O(N).

### Problem 4: Find Medians in a Data Stream

**Problem:** Efficiently add numbers to a stream and find the median.

**Heap Approach (Two Heaps - Max-Heap and Min-Heap):**
This problem requires maintaining a dynamically changing median. The optimal approach uses two heaps:
1.  **`max_heap` (for the smaller half):** Stores numbers in the lower half of the sorted data. Since it's a max-heap, its root gives the largest element in the smaller half. (Implemented as a min-heap by negating values in Python).
2.  **`min_heap` (for the larger half):** Stores numbers in the upper half of the sorted data. Its root gives the smallest element in the larger half.

**Balancing Property:**
*   The `max_heap` can have at most one more element than the `min_heap`.
*   This ensures that if the total number of elements `N` is odd, the median is `max_heap`'s root. If `N` is even, the median is the average of `max_heap`'s root and `min_heap`'s root.

**`addNum(num)` operation:**
1.  Always add the new `num` to the `max_heap` first (negated for Python's `heapq`).
2.  **Balance ordering:** Check if the largest element in `max_heap` (which is `-self.max_heap[0]`) is greater than the smallest element in `min_heap` (`self.min_heap[0]`). If so, transfer the root of `max_heap` to `min_heap` to maintain the property that all elements in `max_heap` are less than or equal to all elements in `min_heap`.
3.  **Balance sizes:**
    *   If `max_heap`'s size becomes `min_heap`'s size + 2, transfer `max_heap`'s root to `min_heap`.
    *   If `min_heap`'s size becomes `max_heap`'s size + 1, transfer `min_heap`'s root to `max_heap` (negated).

**`findMedian()` operation:**
1.  If the total number of elements (sum of heap sizes) is odd, the median is `-self.max_heap[0]`.
2.  If the total number of elements is even, the median is `(-self.max_heap[0] + self.min_heap[0]) / 2.0`.

*   **Time Complexity:** O(log N) for `addNum`, O(1) for `findMedian`. Each insertion involves a few heap operations.
*   **Space Complexity:** O(N) to store all numbers across the two heaps.

### Problem 5: Smallest Range Covering Elements from K Lists

**Problem:** Find the smallest range `[a, b]` such that `a` comes from at least one of `k` sorted lists, and `b` comes from at least one of `k` sorted lists.

**Heap Approach (Min-Heap and Sliding Window concept):**
This is a more advanced problem combining heaps with a sliding window-like logic.
1.  **Initialization:**
    *   Create a min-heap. Each element in the heap will be a tuple `(value, list_index, element_index)` representing a number from one of the `k` lists.
    *   Initialize `current_max` to track the maximum value present among the elements currently in the heap.
    *   Initialize `min_range_start` and `min_range_end` to store the best range found so far (e.g., `(-infinity, +infinity)` or the range of the initial heap state).
2.  **Populate Initial Heap:**
    *   For each of the `k` lists, push its first element `(value, list_index, 0)` into the min-heap.
    *   Update `current_max` with the maximum value among these first elements.
3.  **Iterate and Adjust Range:**
    *   Loop indefinitely until a break condition is met.
    *   In each iteration:
        *   Pop the smallest element `(min_val, list_idx, elem_idx)` from the min-heap. `min_val` is the current smallest value among the `k` lists' "active" elements.
        *   **Check and Update Range:** Compare the current range (`current_max - min_val`) with the `min_range_end - min_range_start`. If the current range is smaller, update `min_range_start = min_val` and `min_range_end = current_max`. If ranges are equal, apply the tie-breaking rule (smaller `min_val`).
        *   **Advance List:** If there is a next element in `nums[list_idx]` (i.e., `elem_idx + 1 < len(nums[list_idx])`):
            *   Push the next element `(next_val, list_idx, elem_idx + 1)` into the min-heap.
            *   Update `current_max = max(current_max, next_val)`.
        *   **Break Condition:** If the list from which `min_val` was popped is exhausted (no next element), then it's impossible to maintain at least one element from each of the `k` lists. Break the loop.
4.  Return `[min_range_start, min_range_end]`.

**Why a Min-Heap and `current_max`?**
*   The min-heap efficiently gives us the overall smallest element (`min_val`) among the `k` currently considered elements (one from each list).
*   `current_max` tracks the largest among these `k` elements.
*   Together, `min_val` and `current_max` define the current range that covers at least one element from each of the `k` lists. We continuously try to shrink this range by advancing the list from which `min_val` came, effectively "sliding" the window.

*   **Time Complexity:** O(N log k) - N is the total number of elements across all lists. Each element is pushed and popped from the heap at most once. Heap operations take O(log k) time.
*   **Space Complexity:** O(k) - The heap stores at most `k` elements.

---
**Summary of Heap Strengths:**

*   **Efficient Selection (Kth largest/smallest, Top K frequent):** Heaps excel at finding the `k` most extreme elements in O(N log k) time and O(k) space, which is often superior to sorting (O(N log N) time, O(N) space) when `k` is small.
*   **Priority Queue Implementation:** Heaps are the go-to data structure for priority queues, offering O(log N) insertion/deletion and O(1) peek. This is crucial for problems like merging sorted lists or scheduling.
*   **Dynamic Median/Percentile Tracking:** Two-heap approaches allow for efficient (O(log N)) updates and (O(1)) retrieval of median/percentiles in a data stream.

Understanding these patterns and the underlying heap mechanics is key to solving a wide range of interview problems.