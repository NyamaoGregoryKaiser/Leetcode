```markdown
# Algorithm Explanations: Heap Operations

This document provides detailed explanations of the algorithms used to solve various heap-related coding interview problems. It covers the core concepts, step-by-step logic, and complexity analysis for each solution.

## Table of Contents

1.  [Introduction to Heaps](#1-introduction-to-heaps)
    *   [Min-Heap](#min-heap)
    *   [Max-Heap](#max-heap)
    *   [Common Heap Operations](#common-heap-operations)
    *   [Array Representation of a Heap](#array-representation-of-a-heap)
2.  [Problem 1: Kth Smallest Element in an Unsorted Array](#2-problem-1-kth-smallest-element-in-an-unsorted-array)
    *   [Optimal: Max-Heap of Size K](#optimal-max-heap-of-size-k)
    *   [Alternative: Min-Heap](#alternative-min-heap)
    *   [Alternative: Sorting](#alternative-sorting)
3.  [Problem 2: Find Median from Data Stream](#3-problem-2-find-median-from-data-stream)
    *   [Optimal: Two Heaps](#optimal-two-heaps)
4.  [Problem 3: Merge K Sorted Lists](#4-problem-3-merge-k-sorted-lists)
    *   [Optimal: Min-Heap](#optimal-min-heap)
    *   [Alternative: Merge One By One](#alternative-merge-one-by-one)
    *   [Alternative: Divide and Conquer](#alternative-divide-and-conquer)
5.  [Problem 4: Top K Frequent Elements](#5-problem-4-top-k-frequent-elements)
    *   [Optimal: Min-Heap](#optimal-min-heap-1)
    *   [Alternative: Max-Heap](#alternative-max-heap)
    *   [Alternative: Bucket Sort](#alternative-bucket-sort)
6.  [Complexity Summary](#6-complexity-summary)

---

## 1. Introduction to Heaps

A Heap is a special tree-based data structure that satisfies the heap property. It's typically implemented as an array. The two main types are Min-Heap and Max-Heap. In Java, `PriorityQueue` is a Min-Heap by default.

### Min-Heap

*   **Heap Property:** For every node `i` other than the root, the value of node `i` is greater than or equal to the value of its parent `P(i)`.
*   **Smallest element** is always at the root.

```ascii
      (1)
     /   \
   (3)   (5)
  / \   / \
(4) (6) (7) (8)
```

### Max-Heap

*   **Heap Property:** For every node `i` other than the root, the value of node `i` is less than or equal to the value of its parent `P(i)`.
*   **Largest element** is always at the root.

```ascii
      (8)
     /   \
   (6)   (7)
  / \   / \
(3) (4) (1) (5)
```

### Common Heap Operations

| Operation | Description                            | Time Complexity |
| :-------- | :------------------------------------- | :-------------- |
| `peek()`  | Retrieve root element (min/max)        | O(1)            |
| `offer()` | Insert an element                      | O(log N)        |
| `poll()`  | Remove and return root element (min/max) | O(log N)        |
| `size()`  | Number of elements                     | O(1)            |
| `isEmpty()` | Check if empty                       | O(1)            |

### Array Representation of a Heap

Heaps are typically implemented using an array because of the following property:
*   If a node is at index `i`:
    *   Its **parent** is at index `(i - 1) / 2`.
    *   Its **left child** is at index `2 * i + 1`.
    *   Its **right child** is at index `2 * i + 2`.

This allows for efficient navigation without explicit pointers.

## 2. Problem 1: Kth Smallest Element in an Unsorted Array

**Problem:** Given an unsorted array of numbers, find the Kth smallest number.

### Optimal: Max-Heap of Size K

**Logic:**
To find the Kth smallest element, we are interested in the `k` smallest elements. If we maintain a Max-Heap of size `k`, this heap will always contain the `k` smallest elements encountered so far. The largest among these `k` elements (i.e., the root of the Max-Heap) will be the Kth smallest overall.

1.  Initialize a Max-Heap (`PriorityQueue` with `Collections.reverseOrder()`).
2.  Iterate through each `num` in the input array:
    a.  Add `num` to the Max-Heap.
    b.  If the heap's size exceeds `k`, remove the largest element from the heap (using `poll()`). This ensures the heap always contains the `k` smallest elements seen so far.
3.  After iterating through all numbers, the top element of the Max-Heap (`peek()`) is the Kth smallest element.

**Example Trace (nums = {3, 2, 1, 5, 6, 4}, k = 2):**

1.  `maxHeap = []`
2.  `num = 3`: `maxHeap = [3]`
3.  `num = 2`: `maxHeap = [3, 2]` (internally `[3, 2]`, root is 3)
4.  `num = 1`: `maxHeap = [3, 2, 1]`. Size (3) > k (2). Poll 3. `maxHeap = [2, 1]` (root is 2).
5.  `num = 5`: `maxHeap = [5, 2, 1]`. Size (3) > k (2). Poll 5. `maxHeap = [2, 1]` (root is 2).
6.  `num = 6`: `maxHeap = [6, 2, 1]`. Size (3) > k (2). Poll 6. `maxHeap = [2, 1]` (root is 2).
7.  `num = 4`: `maxHeap = [4, 2, 1]`. Size (3) > k (2). Poll 4. `maxHeap = [2, 1]` (root is 2).

Result: `maxHeap.peek()` = 2.

**Time Complexity:** O(N log K)
*   N iterations.
*   Each `offer`/`poll` on a heap of size K takes O(log K).
**Space Complexity:** O(K) for the heap.

### Alternative: Min-Heap

**Logic:**
Add all elements to a Min-Heap. Then, `poll()` the heap `k` times. The Kth element removed will be the Kth smallest.

**Time Complexity:** O(N + K log N)
*   O(N) to build the heap (or N log N if elements are added one by one).
*   O(K log N) for polling K elements.
**Space Complexity:** O(N) for the heap.

### Alternative: Sorting

**Logic:**
Sort the array in ascending order and return the element at index `k-1`.

**Time Complexity:** O(N log N)
**Space Complexity:** O(1) or O(N) depending on sorting algorithm.

## 3. Problem 2: Find Median from Data Stream

**Problem:** Design a data structure to efficiently find the median of a dynamically growing list of numbers.

### Optimal: Two Heaps

**Logic:**
The key idea is to divide the numbers into two halves: a smaller half and a larger half.
*   **Max-Heap (`small`):** Stores the smaller half of the numbers. Its root is the largest element in the smaller half.
*   **Min-Heap (`large`):** Stores the larger half of the numbers. Its root is the smallest element in the larger half.

We maintain these properties:
1.  All elements in `small` are less than or equal to all elements in `large`.
2.  The sizes of the two heaps are balanced:
    *   `small.size() == large.size()` (for even total count)
    *   `small.size() == large.size() + 1` (for odd total count)

This ensures that the median can always be found by looking at the roots of the heaps.

**`addNum(int num)` Steps:**
1.  Add `num` to `small` (the Max-Heap).
2.  **Balance values:** If `small.peek()` > `large.peek()` (and `large` is not empty), move `small.poll()` to `large`. This ensures that all elements in `small` are indeed smaller than or equal to elements in `large`.
3.  **Balance sizes:**
    *   If `small.size() > large.size() + 1`, move `small.poll()` to `large`.
    *   If `large.size() > small.size()`, move `large.poll()` to `small`.

**`findMedian()` Steps:**
*   If `small.size() == large.size()`: Median is `(small.peek() + large.peek()) / 2.0`.
*   If `small.size() > large.size()`: Median is `small.peek()`.

**Example Trace (`addNum`):**

Initial: `small=[]`, `large=[]`

1.  `addNum(1)`:
    *   `small=[1]`, `large=[]`
    *   Sizes: `small=1`, `large=0`. Balanced.
    *   Median: `small.peek()` = 1.0

2.  `addNum(2)`:
    *   `small=[2,1]`, `large=[]` (Max-heap, root 2)
    *   Values: `small.peek()` (2) > `large.peek()` (null). Move 2 to `large`.
        `small=[1]`, `large=[2]` (Min-heap, root 2)
    *   Sizes: `small=1`, `large=1`. Balanced.
    *   Median: `(1 + 2) / 2.0` = 1.5

3.  `addNum(3)`:
    *   `small=[3,1]`, `large=[2]`
    *   Values: `small.peek()` (3) > `large.peek()` (2). Move 3 to `large`.
        `small=[1]`, `large=[3,2]` (Min-heap, root 2)
    *   Sizes: `small=1`, `large=2`. `large` is too big. Move `large.poll()` (2) to `small`.
        `small=[2,1]`, `large=[3]` (Max-heap root 2, Min-heap root 3)
    *   Sizes: `small=2`, `large=1`. Balanced.
    *   Median: `small.peek()` = 2.0

```ascii
Visualizing the two heaps:

After addNum(1):
  Max-Heap (small)    Min-Heap (large)
       [1]                 []
   Median: 1

After addNum(2):
  Max-Heap (small)    Min-Heap (large)
       [1]                 [2]
   Median: (1+2)/2 = 1.5

After addNum(3):
  Max-Heap (small)    Min-Heap (large)
       [2]                 [3]
      /
     [1]
   Median: 2

After addNum(4):
  Max-Heap (small)    Min-Heap (large)
       [2]                 [3]
      / \                   /
     [1] [4]               [4] (original state after adding 4 to small, then value balance, then size balance)
  Correct state:
  Max-Heap (small)    Min-Heap (large)
       [2]                 [3]
      /                   /
     [1]                 [4]
   Median: (2+3)/2 = 2.5
```

**Time Complexity:**
*   `addNum`: O(log N) - each heap operation is O(log M), where M is heap size (approx N/2).
*   `findMedian`: O(1) - just peeking at roots.
**Space Complexity:** O(N) for storing all numbers across both heaps.

## 4. Problem 3: Merge K Sorted Lists

**Problem:** Merge K sorted linked lists into one sorted linked list.

### Optimal: Min-Heap

**Logic:**
This problem is an extension of merging two sorted lists. Instead of comparing just two heads, we need to compare `K` heads. A Min-Heap is perfect for this.

1.  Initialize a Min-Heap that stores `ListNode` objects, ordered by their `val`.
2.  Add the head node of each non-empty input list into the Min-Heap.
3.  Create a dummy head for the merged list.
4.  While the heap is not empty:
    a.  Extract the node with the smallest value from the heap (`minHeap.poll()`). This node is the next node in our merged list.
    b.  Append this node to the merged list.
    c.  If the extracted node has a `next` node, add that `next` node to the heap.
5.  Return the `next` of the dummy head.

**Example Trace (K=3 lists: [1,4,5], [1,3,4], [2,6]):**

1.  `minHeap = []`, `dummyHead = (0)->null`, `current = dummyHead`
2.  Add heads: `minHeap = [(1 from L1), (1 from L2), (2 from L3)]` (Min-heap by value)
3.  Loop:
    *   **Poll (1 from L1)**. `current.next = (1 from L1)`. `current = (1 from L1)`. Add `4 (from L1)` to heap.
        `mergedList: (0)->(1 from L1)->null`
        `minHeap = [(1 from L2), (2 from L3), (4 from L1)]`
    *   **Poll (1 from L2)**. `current.next = (1 from L2)`. `current = (1 from L2)`. Add `3 (from L2)` to heap.
        `mergedList: (0)->(1 from L1)->(1 from L2)->null`
        `minHeap = [(2 from L3), (3 from L2), (4 from L1)]`
    *   **Poll (2 from L3)**. `current.next = (2 from L3)`. `current = (2 from L3)`. Add `6 (from L3)` to heap.
        `mergedList: (0)->(1 from L1)->(1 from L2)->(2 from L3)->null`
        `minHeap = [(3 from L2), (4 from L1), (6 from L3)]`
    *   ...and so on...

```ascii
Heap based merge:
Initial state:
minHeap = { (1, L1), (1, L2), (2, L3) }  (Tuple (value, original_list_id))
merged = Dummy -> null

1. Poll (1, L1). merged = Dummy -> 1(L1). Add L1.next (4, L1)
   minHeap = { (1, L2), (2, L3), (4, L1) }

2. Poll (1, L2). merged = Dummy -> 1(L1) -> 1(L2). Add L2.next (3, L2)
   minHeap = { (2, L3), (3, L2), (4, L1) }

3. Poll (2, L3). merged = Dummy -> 1(L1) -> 1(L2) -> 2(L3). Add L3.next (6, L3)
   minHeap = { (3, L2), (4, L1), (6, L3) }

... and so on until minHeap is empty.
```

**Time Complexity:** O(N log K)
*   N is the total number of nodes across all K lists.
*   Each node is inserted into and extracted from the heap once.
*   The heap stores at most K elements (one head from each list).
*   Each heap operation (insert/extract) takes O(log K) time.
**Space Complexity:** O(K) for the heap.

### Alternative: Merge One By One

**Logic:**
Repeatedly merge two lists using a standard merge-two-sorted-lists algorithm.
`result = merge(list1, list2)`
`result = merge(result, list3)`
...
`result = merge(result, listK)`

**Time Complexity:** O(N * K)
*   Merging two lists of length `L1` and `L2` takes O(L1 + L2).
*   In the worst case, for K lists, each merge involves a growing merged list, leading to `O(N + (N/2) + (N/3) ...)` effectively `O(N*K)`.
**Space Complexity:** O(1) (excluding the output merged list and recursion stack for `mergeTwoLists`).

### Alternative: Divide and Conquer

**Logic:**
Similar to mergesort, divide the array of lists into two halves, recursively merge them, and then merge the two resulting lists.
`merge(0, k-1) = merge(merge(0, (k-1)/2), merge((k-1)/2 + 1, k-1))`

**Time Complexity:** O(N log K)
*   At each level of recursion, we perform merges. There are `log K` levels.
*   At each level, the total number of nodes processed across all merges is N.
*   Example: merging 4 lists [A,B,C,D]
    *   Level 1: merge(A,B) -> AB, merge(C,D) -> CD (2 merges, total N operations)
    *   Level 2: merge(AB, CD) -> ABCD (1 merge, total N operations)
    *   Total 2N operations, `log K` levels.
**Space Complexity:** O(log K) for the recursion stack.

## 5. Problem 4: Top K Frequent Elements

**Problem:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.

### Optimal: Min-Heap

**Logic:**
We need the `k` elements with the *highest* frequency. To efficiently maintain these, we can use a Min-Heap. The heap will store `(frequency, number)` pairs, and its size will be limited to `k`. If a new pair comes in with a frequency higher than the smallest frequency in the heap, it replaces the smallest.

1.  **Count Frequencies:** Use a `HashMap` to store the frequency of each number. (Key: number, Value: frequency).
2.  **Populate Min-Heap:** Iterate through the `entrySet()` of the frequency map.
    a.  Add each `(number, frequency)` pair to a Min-Heap. The heap should be ordered by frequency (smallest frequency at the top).
    b.  If the heap's size exceeds `k`, remove the element with the smallest frequency (`minHeap.poll()`).
3.  **Extract Result:** After processing all unique numbers, the heap will contain the `k` most frequent elements. Extract them into an array.

**Example Trace (nums = {1,1,1,2,2,3}, k=2):**

1.  `freqMap = {1:3, 2:2, 3:1}`
2.  `minHeap = []` (ordered by frequency ascending)
3.  Process map entries:
    *   `entry = (1, 3)`: `minHeap = [(1,3)]`
    *   `entry = (2, 2)`: `minHeap = [(2,2), (1,3)]` (root is (2,2) because freq 2 < freq 3)
    *   `entry = (3, 1)`: `minHeap = [(3,1), (2,2), (1,3)]`. Size (3) > k (2). Poll `(3,1)` (smallest frequency).
        `minHeap = [(2,2), (1,3)]` (root is (2,2))
4.  Result: Poll elements from `minHeap`: `(2,2)`, then `(1,3)`. Return `[2, 1]` (order doesn't matter).

```ascii
Min-Heap to find Top K Frequent:
(entry: value, frequency)

freqMap = { 1:3, 2:2, 3:1 }
k = 2

1. Add (1,3): minHeap = { (1,3) }
2. Add (2,2): minHeap = { (2,2), (1,3) }  (min-heap based on frequency)
3. Add (3,1): minHeap = { (3,1), (2,2), (1,3) }
   Size (3) > k (2). Poll smallest freq: (3,1)
   minHeap = { (2,2), (1,3) }

Final minHeap contains top 2 frequent elements.
```

**Time Complexity:** O(N + M log K)
*   O(N) to build the frequency map (N is number of elements in `nums`).
*   O(M log K) to iterate through M unique elements (map entries) and perform heap operations. M can be up to N.
*   Effectively O(N log K) if K < M.
**Space Complexity:** O(M + K) for the frequency map and the heap.

### Alternative: Max-Heap

**Logic:**
1.  Count frequencies.
2.  Add all `(number, frequency)` pairs to a Max-Heap (ordered by frequency descending).
3.  Poll K times to get the K most frequent elements.

**Time Complexity:** O(N + M log M)
*   O(N) for frequency map.
*   O(M) to build the Max-Heap from M entries (or M log M if inserting one by one).
*   O(K log M) to poll K times.
*   If K is small and M is large, `M log M` is worse than `M log K`.
**Space Complexity:** O(M) for map and heap.

### Alternative: Bucket Sort

**Logic:**
This method is very efficient if the maximum frequency (which can be up to N) is not excessively large.

1.  **Count Frequencies:** Use a `HashMap` to store frequencies.
2.  **Create Buckets:** Create an array of lists, where `buckets[i]` will store all numbers that have a frequency of `i`. The size of this array will be `N+1` (since frequency can range from 1 to N).
3.  **Populate Buckets:** Iterate through the frequency map and place each number into its corresponding bucket based on its frequency.
4.  **Extract Result:** Iterate through the `buckets` array from the highest frequency index down to 1. Collect elements until `k` elements are found.

**Example Trace (nums = {1,1,1,2,2,3}, k=2):**

1.  `freqMap = {1:3, 2:2, 3:1}`
2.  `buckets = new List[nums.length + 1]` (size 7 for this example, indices 0-6).
3.  Populate:
    *   `buckets[3] = [1]` (num 1 has freq 3)
    *   `buckets[2] = [2]` (num 2 has freq 2)
    *   `buckets[1] = [3]` (num 3 has freq 1)
4.  Extract: `resultList = []`
    *   `i = 6` (empty)
    *   `i = 5` (empty)
    *   `i = 4` (empty)
    *   `i = 3`: `buckets[3] = [1]`. Add 1. `resultList = [1]`. Size is 1, < k.
    *   `i = 2`: `buckets[2] = [2]`. Add 2. `resultList = [1, 2]`. Size is 2, == k. Stop.

Result: `[1, 2]`

```ascii
Bucket Sort for Top K Frequent:

nums = {1,1,1,2,2,3}, k=2

1. Frequencies:
   1 -> 3
   2 -> 2
   3 -> 1

2. Buckets (array of lists, index = frequency):
   buckets[0] = []
   buckets[1] = [3]  (num 3 has freq 1)
   buckets[2] = [2]  (num 2 has freq 2)
   buckets[3] = [1]  (num 1 has freq 3)
   buckets[4] = []
   buckets[5] = []
   buckets[6] = [] (max freq is nums.length)

3. Collect from max freq down:
   - Check buckets[6], [5], [4] (all empty)
   - Check buckets[3]: Contains [1]. Add 1 to result. Result: [1].
   - Check buckets[2]: Contains [2]. Add 2 to result. Result: [1, 2].
   - Result size is 2 (k). Stop.

Final Result: [1, 2]
```

**Time Complexity:** O(N) (average) or O(N + MaxFreq)
*   O(N) for frequency map.
*   O(N) for populating buckets (each number inserted once).
*   O(MaxFreq) to iterate buckets, and total elements collected is N. Overall, effectively O(N) because `MaxFreq` can be at most `N`.
**Space Complexity:** O(N) for frequency map and buckets.

---

## 6. Complexity Summary

| Problem                             | Solution                         | Time Complexity        | Space Complexity         | Notes                                                |
| :---------------------------------- | :------------------------------- | :--------------------- | :----------------------- | :--------------------------------------------------- |
| **Kth Smallest Element**            | Max-Heap (size K)                | O(N log K)             | O(K)                     | Optimal for K << N                                   |
|                                     | Min-Heap (full)                  | O(N + K log N)         | O(N)                     |                                                      |
|                                     | Sorting                          | O(N log N)             | O(1) or O(N)             | Simple baseline                                      |
|                                     | Quickselect (not implemented here) | O(N) average, O(N^2) worst | O(log N) average, O(N) worst | More advanced, non-heap, often fastest for Kth element |
| **Find Median from Data Stream**    | Two Heaps (Max-Heap + Min-Heap)  | `addNum`: O(log N)<br>`findMedian`: O(1) | O(N)                   | Optimal for stream medians                           |
|                                     | Sorted List (`ArrayList`)        | `addNum`: O(N)<br>`findMedian`: O(1) | O(N)                   | Simpler, but slower `addNum`                         |
| **Merge K Sorted Lists**            | Min-Heap                         | O(N log K)             | O(K)                     | Optimal for general K                                |
|                                     | Merge One By One                 | O(N * K)               | O(1)                     | Less efficient for large K                           |
|                                     | Divide and Conquer               | O(N log K)             | O(log K)                 | Comparable to Min-Heap, typically faster due to constant factors |
| **Top K Frequent Elements**         | Min-Heap (size K)                | O(N + M log K)         | O(M + K)                 | Optimal for K << M                                   |
|                                     | Max-Heap (full)                  | O(N + M log M)         | O(M)                     | Less optimal if K << M                               |
|                                     | Bucket Sort                      | O(N + MaxFreq)         | O(N)                     | Optimal if `MaxFreq` is not too large                |

*   `N`: Total number of elements/nodes.
*   `K`: The parameter K (e.g., Kth smallest, K most frequent).
*   `M`: Number of unique elements.
*   `MaxFreq`: Maximum frequency of any element.
```