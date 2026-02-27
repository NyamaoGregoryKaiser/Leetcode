```markdown
# Heap Operations: Detailed Algorithm Explanations

This document delves into the core concepts of Heap data structures and provides in-depth explanations for the solutions implemented in this project.

## 1. What is a Heap?

A heap is a specialized tree-based data structure that satisfies the heap property.
The two main types are:

*   **Min-Heap:** For every node `N`, the value of `N` is less than or equal to the values of its children. The smallest element is always at the root.
*   **Max-Heap:** For every node `N`, the value of `N` is greater than or equal to the values of its children. The largest element is always at the root.

Heaps are typically implemented as an array. The tree structure is implicitly represented:
*   The root is at index `0`.
*   For a node at index `i`:
    *   Its left child is at index `2*i + 1`.
    *   Its right child is at index `2*i + 2`.
    *   Its parent is at index `(i - 1) / 2`.

**Key Properties:**
*   **Complete Binary Tree:** All levels are completely filled, except possibly the last level, which is filled from left to right. This ensures efficient array representation.
*   **Heap Property:** Maintained after every insertion or deletion.

### ASCII Art - Min-Heap Example:

```
        1
      /   \
     2     3
    / \   / \
   7   8 4   5
```

Array representation: `[1, 2, 3, 7, 8, 4, 5]`

### Core Heap Operations:

*   **`insert(element)` / `add(element)`:** Adds a new element to the heap. The element is initially placed at the end of the array, and then "heapified up" (or "bubbled up") by repeatedly swapping it with its parent if it violates the heap property, until its correct position is found.
    *   Time Complexity: O(log N)
*   **`extract_min()` / `poll()` (for Min-Heap):** Removes and returns the smallest element (the root). The last element in the array is moved to the root position. Then, this new root is "heapified down" (or "bubbled down") by repeatedly swapping it with its smallest child (for min-heap) if it violates the heap property, until its correct position is found.
    *   Time Complexity: O(log N)
*   **`peek()` / `min()`:** Returns the smallest element (the root) without removing it.
    *   Time Complexity: O(1)
*   **`heapify()` (Building a Heap):** Given an arbitrary array, we can convert it into a heap. A common approach is to iterate from the last non-leaf node up to the root, calling `heapifyDown` on each node.
    *   Time Complexity: O(N) (surprisingly, not O(N log N))

## 2. Problem Explanations and Solutions

### Problem 1: Kth Largest Element in an Array

**Goal:** Find the Kth largest element in an unsorted array.

**Core Idea:** We don't need to sort the entire array. We only care about the `k` largest elements. A min-heap is perfect for this.

**Optimal Heap-based Solution (using a Min-Heap):**

1.  **Initialize a Min-Heap:** Create a min-heap (e.g., `java.util.PriorityQueue`).
2.  **Iterate through `nums`:** For each `num` in the input array:
    *   `Add num` to the min-heap.
    *   If the `size` of the min-heap exceeds `k`, `remove` the smallest element (which is at the root using `poll()`).
3.  **Result:** After iterating through all numbers, the min-heap will contain the `k` largest elements, with the smallest among them (the Kth largest overall) at the root. Return `heap.peek()`.

**Why a Min-Heap of size K?**
If we want the Kth *largest* element, we maintain a heap of size K. When a new element comes in:
*   If it's smaller than the current smallest in our heap (i.e., `heap.peek()`), it cannot be among the K largest, so we ignore it.
*   If it's larger, it means it's a candidate for the K largest. We remove the current smallest element from the heap (`heap.poll()`) and insert the new, larger element (`heap.add(num)`). This ensures the heap always contains the K largest elements seen *so far*, and its minimum element is the Kth largest overall.

**Example Walkthrough: `nums = [3,2,1,5,6,4], k = 2`**

| Num | Heap State (Min-Heap) | Action                                    |
| :-- | :-------------------- | :---------------------------------------- |
| `3` | `[3]`                 | Add 3                                     |
| `2` | `[2,3]`               | Add 2                                     |
| `1` | `[1,2,3]`             | Add 1                                     |
|     | `[2,3]`               | Heap size > k (3 > 2), poll 1 (smallest)  |
| `5` | `[2,3,5]`             | Add 5                                     |
|     | `[3,5]`               | Heap size > k (3 > 2), poll 2 (smallest)  |
| `6` | `[3,5,6]`             | Add 6                                     |
|     | `[5,6]`               | Heap size > k (3 > 2), poll 3 (smallest)  |
| `4` | `[4,5,6]`             | Add 4                                     |
|     | `[5,6]`               | Heap size > k (3 > 2), poll 4 (smallest)  |

Final Heap: `[5,6]`. `heap.peek()` is `5`.

**Complexity Analysis:**
*   **Time Complexity:** O(N log K)
    *   We iterate through `N` elements.
    *   Each `add` or `poll` operation on a heap of size `K` takes O(log K) time.
*   **Space Complexity:** O(K)
    *   The heap stores at most `K` elements.

**Alternative Approaches (and why heap is preferred):**
1.  **Sorting:** Sort the entire array and return `nums[nums.length - k]`.
    *   Time Complexity: O(N log N)
    *   Space Complexity: O(log N) or O(N) depending on sort implementation (e.g., QuickSort in-place is O(log N) for recursion stack).
    *   *Drawback:* Much slower than O(N log K) if `K` is significantly smaller than `N`.
2.  **QuickSelect (Partition-based Selection Algorithm):**
    *   Average Time Complexity: O(N)
    *   Worst Case Time Complexity: O(N^2)
    *   Space Complexity: O(log N) (for recursion stack)
    *   *Drawback:* More complex to implement correctly compared to the heap approach, and worst-case performance can be poor. Still, it's asymptotically faster on average.

---

### Problem 2: Merge K Sorted Lists

**Goal:** Merge `k` sorted linked lists into one sorted linked list.

**Core Idea:** At any point, the next smallest element for our merged list must come from the heads of the current `k` lists. A min-heap can efficiently keep track of these `k` head elements and allow us to extract the smallest one.

**Optimal Heap-based Solution (using a Min-Heap):**

1.  **Initialize a Min-Heap:** Create a min-heap that stores `ListNode` objects. The heap should be ordered based on the `val` of the `ListNode`.
2.  **Populate Initial Heap:** For each linked list in the input `lists` array, if it's not empty, add its head node to the min-heap.
3.  **Build Merged List:**
    *   Create a dummy head node for the merged list (to simplify edge cases).
    *   Initialize a `tail` pointer to this dummy head.
    *   While the min-heap is not empty:
        *   `Extract` the node with the smallest value from the heap (`heap.poll()`). Let this be `currentNode`.
        *   Append `currentNode` to the merged list: `tail.next = currentNode`.
        *   Move the `tail` pointer forward: `tail = tail.next`.
        *   If `currentNode` has a `next` node (i.e., the list it came from is not exhausted), `add` `currentNode.next` to the min-heap.
4.  **Result:** Return `dummyHead.next`.

**Example Walkthrough: `lists = [[1,4,5],[1,3,4],[2,6]]`**

1.  **Initial Heap (Min-Heap on `ListNode.val`):** Add `1` (from List1), `1` (from List2), `2` (from List3).
    Heap: `[ (1, List1_node1), (1, List2_node1), (2, List3_node1) ]`
    (Smallest at root: List1_node1 with val 1)

2.  **Loop:**
    *   **Iteration 1:**
        *   Poll `(1, List1_node1)`. `MergedList: 1`
        *   Add `List1_node1.next` (`4`) to heap.
        *   Heap: `[ (1, List2_node1), (2, List3_node1), (4, List1_node2) ]`
    *   **Iteration 2:**
        *   Poll `(1, List2_node1)`. `MergedList: 1 -> 1`
        *   Add `List2_node1.next` (`3`) to heap.
        *   Heap: `[ (2, List3_node1), (3, List2_node2), (4, List1_node2) ]`
    *   **Iteration 3:**
        *   Poll `(2, List3_node1)`. `MergedList: 1 -> 1 -> 2`
        *   Add `List3_node1.next` (`6`) to heap.
        *   Heap: `[ (3, List2_node2), (4, List1_node2), (6, List3_node2) ]`
    *   **Iteration 4:**
        *   Poll `(3, List2_node2)`. `MergedList: 1 -> 1 -> 2 -> 3`
        *   Add `List2_node2.next` (`4`) to heap.
        *   Heap: `[ (4, List1_node2), (4, List2_node3), (6, List3_node2) ]`
    *   **Iteration 5:**
        *   Poll `(4, List1_node2)`. `MergedList: 1 -> 1 -> 2 -> 3 -> 4`
        *   Add `List1_node2.next` (`5`) to heap.
        *   Heap: `[ (4, List2_node3), (5, List1_node3), (6, List3_node2) ]`
    *   **Iteration 6:**
        *   Poll `(4, List2_node3)`. `MergedList: 1 -> 1 -> 2 -> 3 -> 4 -> 4`
        *   Add `List2_node3.next` (null) to heap. (Nothing to add).
        *   Heap: `[ (5, List1_node3), (6, List3_node2) ]`
    *   **Iteration 7:**
        *   Poll `(5, List1_node3)`. `MergedList: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5`
        *   Add `List1_node3.next` (null) to heap.
        *   Heap: `[ (6, List3_node2) ]`
    *   **Iteration 8:**
        *   Poll `(6, List3_node2)`. `MergedList: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6`
        *   Add `List3_node2.next` (null) to heap.
        *   Heap: `[]` (empty)

**Complexity Analysis:**
*   Let `N` be the total number of elements across all `k` lists.
*   **Time Complexity:** O(N log K)
    *   Initially, adding `k` head nodes to the heap takes O(K log K) time.
    *   In the worst case, we extract `N` elements from the heap.
    *   Each extraction (`poll`) and subsequent insertion (`add`) takes O(log K) time because the heap size is at most `k`.
    *   Total: O(K log K + N log K) which simplifies to O(N log K) since `N` is usually much larger than `K`.
*   **Space Complexity:** O(K)
    *   The heap stores at most `k` `ListNode` references (one from each list).

**Alternative Approaches:**
1.  **Brute Force (Collect and Sort):**
    *   Collect all `N` elements from all lists into a single `ArrayList`.
    *   Sort the `ArrayList`.
    *   Reconstruct a new linked list from the sorted `ArrayList`.
    *   Time Complexity: O(N log N) (for sorting)
    *   Space Complexity: O(N) (for `ArrayList`)
2.  **Divide and Conquer:**
    *   Pair up lists and merge them. E.g., merge `list0` with `list1`, `list2` with `list3`, etc.
    *   Repeat until only one list remains.
    *   Time Complexity: O(N log K)
    *   Space Complexity: O(log K) (for recursion stack)
    *   *Comparison with Heap:* Both achieve O(N log K). The heap approach is often slightly easier to implement iteratively without recursion overhead.

---

### Problem 3: Top K Frequent Elements

**Goal:** Find the `k` most frequent elements in an array.

**Core Idea:**
1.  First, we need to count the frequency of each distinct element. A `HashMap` is ideal for this.
2.  Then, from these frequencies, we need to find the `k` elements with the highest frequencies. A min-heap can help us maintain the `k` most frequent elements seen so far.

**Optimal Heap-based Solution (using HashMap + Min-Heap):**

1.  **Count Frequencies:**
    *   Create a `HashMap<Integer, Integer>` to store `(element, frequency)` pairs.
    *   Iterate through the input array `nums`. For each `num`, increment its count in the hash map.
    *   Time: O(N)
    *   Space: O(M) where `M` is the number of distinct elements (M <= N).

2.  **Use a Min-Heap for Top K:**
    *   Create a `Min-Heap` (e.g., `java.util.PriorityQueue`). The heap will store `Map.Entry<Integer, Integer>` objects (or a custom `Frequency` class) and should be ordered by frequency (the `value` in the map entry).
    *   Iterate through each `(element, frequency)` entry in the hash map:
        *   `Add` the entry to the min-heap.
        *   If the `size` of the min-heap exceeds `k`, `remove` the entry with the smallest frequency (`heap.poll()`). This ensures the heap always contains `k` elements that have the highest frequencies among those processed so far.
    *   Time: O(M log K)
    *   Space: O(K)

3.  **Extract Results:**
    *   Create an `int[]` array of size `k`.
    *   While the heap is not empty, `remove` elements one by one from the heap (`heap.poll()`) and add their `key` (the element itself) to the result array.
    *   Time: O(K log K) (or O(K) if simply moving to list/array)
    *   Space: O(K) (for result array)

**Example Walkthrough: `nums = [1,1,1,2,2,3], k = 2`**

1.  **Frequency Map:**
    `{ 1: 3, 2: 2, 3: 1 }`

2.  **Min-Heap (ordered by frequency):** `Entry(element, frequency)`

    *   Process `Entry(1, 3)`:
        *   Add `(1,3)` to heap. Heap: `[(1,3)]` (Size 1)
    *   Process `Entry(2, 2)`:
        *   Add `(2,2)` to heap. Heap: `[(2,2), (1,3)]` (Size 2)
    *   Process `Entry(3, 1)`:
        *   Add `(3,1)` to heap. Heap: `[(3,1), (2,2), (1,3)]` (Size 3)
        *   Heap size > k (3 > 2), so `poll()` the smallest frequency: `(3,1)`.
        *   Heap: `[(2,2), (1,3)]` (Size 2)

3.  **Extract Results:**
    *   `poll()`: `(2,2)`. Result: `[2]`
    *   `poll()`: `(1,3)`. Result: `[2, 1]`

Final Result: `[2, 1]` (or `[1, 2]`, order doesn't matter).

**Complexity Analysis:**
*   `N` is the number of elements in `nums`.
*   `M` is the number of distinct elements in `nums` (`M <= N`).
*   **Time Complexity:** O(N + M log K)
    *   O(N) for frequency counting.
    *   O(M log K) for iterating through `M` distinct elements and performing heap operations (each O(log K)).
*   **Space Complexity:** O(M + K)
    *   O(M) for the frequency map.
    *   O(K) for the heap.

**Alternative Approaches:**
1.  **HashMap + Sorting:**
    *   Count frequencies (O(N) time, O(M) space).
    *   Convert `HashMap` entries into a list.
    *   Sort the list of entries by frequency in descending order (O(M log M) time).
    *   Take the first `k` elements.
    *   Time Complexity: O(N + M log M)
    *   Space Complexity: O(M)
    *   *Comparison:* If `K` is much smaller than `M`, the heap approach (O(M log K)) is faster than sorting all `M` elements (O(M log M)). If `K` is close to `M`, performance is similar.
2.  **Bucket Sort (using array of lists):**
    *   Count frequencies (O(N) time, O(M) space).
    *   Create an array of `List<Integer>[]` where `index` represents frequency and `value` is a list of elements with that frequency. The size of this array would be `N + 1` (max possible frequency is `N`).
    *   Iterate through the frequency map and place elements into their corresponding frequency buckets.
    *   Iterate the buckets from highest frequency down to 1, collecting `k` elements.
    *   Time Complexity: O(N) (if max frequency is bounded, which it is by `N`)
    *   Space Complexity: O(N)
    *   *Comparison:* This is the most optimal approach in terms of time complexity (linear). It's generally preferred if the range of frequencies is not excessively large, making the bucket array creation feasible.

---

This comprehensive overview should provide a solid foundation for understanding heap-based solutions for these common interview problems.
```