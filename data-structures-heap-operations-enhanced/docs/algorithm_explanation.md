# Algorithm Explanation: Heaps

## 1. What is a Heap?

A **Heap** is a specialized tree-based data structure that satisfies the heap property. In a binary heap, the tree is a complete binary tree, meaning all levels are fully filled except possibly the last level, which is filled from left to right.

There are two main types of binary heaps:

*   **Min-Heap:** For any given node `i`, the value of `node(i)` is less than or equal to the value of its children. The smallest element is always at the root.
*   **Max-Heap:** For any given node `i`, the value of `node(i)` is greater than or equal to the value of its children. The largest element is always at the root.

Heaps are commonly implemented using an array (or `std::vector` in C++) because of their complete binary tree property. This allows for efficient mapping of tree indices to array indices:
*   Parent of node at index `i`: `(i - 1) / 2`
*   Left child of node at index `i`: `2 * i + 1`
*   Right child of node at index `i`: `2 * i + 2`

## 2. Basic Heap Operations (Min-Heap Example)

### 2.1. `push(value)` (Insert)

To insert a new value:
1.  Add the new value to the end of the array (last position in the heap).
2.  **Heapify-Up (Percolate-Up / Sift-Up):** Compare the new value with its parent. If the child is smaller than its parent (for a min-heap), swap them. Continue this process upwards until the heap property is restored (either the child is greater than or equal to its parent, or it reaches the root).

**Time Complexity:** O(log N), where N is the number of elements in the heap.

### 2.2. `pop()` (Extract Minimum)

To remove the minimum value (root for min-heap):
1.  The minimum value is always at the root (`data[0]`). Store it to return.
2.  Move the last element of the array to the root position (`data[0]`).
3.  Remove the last element from the array (reduce heap size).
4.  **Heapify-Down (Percolate-Down / Sift-Down):** Compare the new root with its children. If the parent is larger than one or both children, swap it with the *smaller* child (for a min-heap). Continue this process downwards until the heap property is restored (either the parent is smaller than or equal to both children, or it reaches a leaf node).

**Time Complexity:** O(log N).

### 2.3. `top()` (Peek Minimum)

Simply return the element at the root (`data[0]`).

**Time Complexity:** O(1).

### 2.4. `empty()` / `size()`

Check if the heap is empty or get its size.

**Time Complexity:** O(1).

## 3. Problem-Specific Algorithm Explanations

### Problem 1: Kth Largest Element in an Array

**Core Idea:** We only care about the `k` largest elements. A Min-Heap is perfect for this.

**Algorithm:**
1.  Initialize a `MinHeap` (or `std::priority_queue<int, std::vector<int>, std::greater<int>>`).
2.  Iterate through each `num` in the input array `nums`:
    *   Push `num` into the heap.
    *   If the heap's size becomes greater than `k`, `pop()` the smallest element (which is at the root). This ensures the heap always contains at most `k` elements, and these `k` elements are candidates for the `k` largest.
3.  After iterating through all numbers, the heap will contain the `k` largest elements from the input array. The smallest among these `k` elements will be at the root of the Min-Heap, which is precisely the `k`th largest element overall.
4.  Return `heap.top()`.

**Time Complexity:** O(N log K)
*   N insertions/pops.
*   Each insertion/pop takes O(log K) time since the heap size is at most K.

**Space Complexity:** O(K)
*   The heap stores at most K elements.

**Alternative (Brute-Force / Comparison):**
*   **Sorting:** Sort the entire array `nums` in descending order. The `k`th largest element will be `nums[k-1]`.
    *   Time: O(N log N)
    *   Space: O(log N) or O(N) depending on sort implementation.
*   **`std::nth_element`:** This C++ STL function partitions the array such that the element at the `n`-th position is the one that would be in that position if the array were sorted. All elements before this position are less than or equal to it, and all after are greater than or equal to it.
    *   Time: Average O(N), Worst Case O(N^2)
    *   Space: O(1)

The heap approach is better than full sorting if `K` is significantly smaller than `N`. It's competitive with `nth_element` in average cases and often more intuitive to implement without library specifics.

### Problem 2: Merge K Sorted Lists

**Core Idea:** We need to efficiently find the smallest element among `k` possibilities (the current heads of the `k` lists) at each step. A Min-Heap is ideal for this.

**Algorithm:**
1.  Create a `MinHeap` that stores `ListNode*`. The comparison for the heap should be based on the `val` of the `ListNode`.
2.  Initialize the heap: Iterate through the input `lists` array. For each non-null head `list[i]`, push `list[i]` into the heap.
3.  Create a dummy head node and a `current` pointer for the merged list.
4.  While the heap is not empty:
    *   `pop()` the smallest node (say, `min_node`) from the heap. This `min_node` is the next smallest element overall.
    *   Append `min_node` to the merged list: `current->next = min_node; current = current->next;`
    *   If `min_node` has a `next` element (`min_node->next != nullptr`), push `min_node->next` into the heap. This ensures we consider the next element from the list `min_node` originated from.
5.  Return `dummy_head->next`.

**Time Complexity:** O(N log K)
*   N is the total number of nodes across all lists.
*   K is the number of lists.
*   Each node is pushed into and popped from the heap exactly once.
*   Each push/pop operation takes O(log K) time, as the heap size is at most K (storing one node from each list).

**Space Complexity:** O(K)
*   The heap stores at most K `ListNode*` pointers.

**Alternative (Brute-Force / Comparison):**
*   **Concatenate and Sort:** Collect all nodes into a single `std::vector`, sort it, then reconstruct a linked list.
    *   Time: O(N log N) (N is total nodes)
    *   Space: O(N)
*   **Iterative Comparison:** In each step, iterate through all `k` list heads to find the minimum.
    *   Time: O(N * K) (N total nodes, K comparisons per step)
    *   Space: O(1)

The heap approach is significantly more efficient than both alternatives for larger K.

### Problem 3: Find Median from Data Stream

**Core Idea:** Maintain two balanced heaps. One heap stores the smaller half of numbers (Max-Heap), and the other stores the larger half (Min-Heap).

**Data Structure:**
*   `max_heap_low`: A Max-Heap storing the smaller half of numbers. `max_heap_low.top()` gives the largest element in the lower half.
*   `min_heap_high`: A Min-Heap storing the larger half of numbers. `min_heap_high.top()` gives the smallest element in the upper half.

**Algorithm for `addNum(int num)`:**
1.  **Placement:**
    *   If `max_heap_low` is empty or `num <= max_heap_low.top()`, push `num` into `max_heap_low`.
    *   Else, push `num` into `min_heap_high`.
2.  **Balancing:** Ensure the heaps are balanced such that:
    *   `max_heap_low.size()` is either equal to `min_heap_high.size()` OR `max_heap_low.size() == min_heap_high.size() + 1`. (This convention prefers `max_heap_low` to hold the extra element if total count is odd, making `max_heap_low.top()` the median).
    *   If `max_heap_low.size() > min_heap_high.size() + 1`: Move `max_heap_low.top()` to `min_heap_high`.
    *   If `min_heap_high.size() > max_heap_low.size()`: Move `min_heap_high.top()` to `max_heap_low`.

**Algorithm for `findMedian()`:**
1.  If `max_heap_low.size() == min_heap_high.size()`: The median is the average of `max_heap_low.top()` and `min_heap_high.top()`.
2.  Else (`max_heap_low.size() == min_heap_high.size() + 1`): The median is `max_heap_low.top()`.

**Time Complexity:**
*   `addNum`: O(log N), where N is the total count of numbers added so far. Each operation (push, pop) takes logarithmic time.
*   `findMedian`: O(1). Accessing the top of a heap is constant time.

**Space Complexity:** O(N)
*   Storing all N numbers across two heaps.

### Problem 4: Top K Frequent Elements

**Core Idea:** We need to keep track of frequencies and then select the top `k` based on these frequencies. A Min-Heap storing `(frequency, element)` pairs is efficient.

**Algorithm:**
1.  **Frequency Counting:** Use an `std::unordered_map<int, int>` (or `std::map`) to count the frequency of each number in `nums`. Let this map be `freq_map`.
2.  **Heap Construction:**
    *   Create a `MinHeap` that stores `std::pair<int, int>` (frequency, number). The comparison should be based on the `frequency` (first element of the pair).
    *   Iterate through each `(num, frequency)` pair in `freq_map`:
        *   Push the pair `{frequency, num}` into the heap.
        *   If the heap's size exceeds `k`, `pop()` the pair with the smallest frequency (which is at the root).
3.  **Result Extraction:**
    *   After iterating through all frequencies, the heap will contain `k` pairs, representing the `k` most frequent elements.
    *   Create a `std::vector<int>` to store the result.
    *   While the heap is not empty, `pop()` elements, extract the `num` (second element of the pair), and add it to the result vector.

**Time Complexity:** O(N + M log K)
*   N: number of elements in `nums`. O(N) for frequency counting.
*   M: number of unique elements in `nums` (which is `freq_map.size()`).
*   O(M log K) for heap operations. Each of M unique elements is pushed once, and potentially popped once. Heap operations take O(log K) time as the heap size is at most K.
*   Overall, this simplifies to O(N log K) in the worst case where M is close to N.

**Space Complexity:** O(M + K)
*   O(M) for the frequency map.
*   O(K) for the heap.
*   Overall, O(N) in the worst case where M is close to N.

**Alternative (Brute-Force / Comparison):**
*   **Sorting Frequencies:** Count frequencies, then store `(frequency, number)` pairs in a `std::vector`, sort this vector by frequency in descending order, and take the first `k` elements.
    *   Time: O(N + M log M)
    *   Space: O(N)
*   **Bucket Sort (Optimization):** Count frequencies. Create an array of lists/vectors where `buckets[i]` contains all numbers with frequency `i`. Iterate the buckets from highest frequency downwards until `k` elements are collected.
    *   Time: O(N) (if max frequency `N` is not too large, and map operations are O(1) average).
    *   Space: O(N)

The heap approach is generally competitive and simpler to implement than bucket sort, especially when the maximum frequency is very large, making the bucket array sparse.