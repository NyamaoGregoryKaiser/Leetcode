# Interview Tips for Heap Operations

Heaps are a fundamental data structure often tested in coding interviews. Mastering them demonstrates strong algorithmic thinking and data structure knowledge.

## 1. Understand the Core Concepts

*   **Heap Property:** Clearly articulate the difference between Min-Heap (parent <= children) and Max-Heap (parent >= children).
*   **Complete Binary Tree:** Explain why heaps are usually implemented with arrays and how parent/child indices are calculated.
*   **Basic Operations:** Know the time complexities for `insert`, `extract-min/max`, `peek-min/max`.
    *   `insert`: O(log N)
    *   `extract-min/max`: O(log N)
    *   `peek-min/max`: O(1)
    *   `build_heap` from array: O(N) (often overlooked, but important)

## 2. When to Use a Heap

Heaps are excellent choices for problems involving:

*   **Priority Queues:** If you need to repeatedly extract the minimum or maximum element from a collection.
*   **"Top K" Problems:** Finding the K largest/smallest, K frequent, K closest elements. A min-heap (for largest) or max-heap (for smallest) of size K is the typical pattern.
*   **Merging Sorted Data:** Like merging K sorted lists/arrays.
*   **Running Statistics:** Such as finding the median of a data stream.
*   **Graph Algorithms:** Dijkstra's, Prim's (though `std::priority_queue` is often used here).

## 3. Standard Library vs. Custom Implementation

*   **`std::priority_queue` (C++):** This is a max-heap by default.
    *   `std::priority_queue<int>`: Max-Heap of ints.
    *   `std::priority_queue<int, std::vector<int>, std::greater<int>>`: Min-Heap of ints.
    *   For custom objects, you'll need to define `operator<` or provide a custom comparator.
*   **Interview Context:**
    *   For most problems, using `std::priority_queue` is perfectly acceptable and expected. It shows you know the standard library.
    *   **However**, if explicitly asked to "implement a heap" or if the problem is foundational (like this project's custom heaps), be prepared to write it from scratch (array-based, `heapify_up`, `heapify_down`). This demonstrates a deeper understanding. Always clarify with the interviewer.

## 4. Key Problem Patterns & Variations

*   **Kth Largest/Smallest:**
    *   **Variation:** Kth largest *distinct* element. Requires a `std::set` or `std::unordered_set` first to get unique elements, then apply the heap logic.
    *   **Variation:** Kth largest in a stream. Use a min-heap of size K, similar to `KthLargestElement` problem.
*   **Merge K Sorted Lists/Arrays:**
    *   **Variation:** Merge K sorted files (disk I/O implications).
    *   **Variation:** Merge `k` sorted intervals.
*   **Median from Data Stream:**
    *   **Variation:** Find `p`th percentile. Similar two-heap approach, but sizes would be `p%` and `(100-p)%` of the total.
*   **Top K Frequent:**
    *   **Variation:** Top K frequent words in a document (involves string processing and tokenization).
    *   **Variation:** If frequencies are tied, break ties by value (e.g., smaller number first). Requires custom comparator for pairs.

## 5. Discussing Edge Cases and Constraints

Always think about these:

*   **Empty input:** `nums` is empty, `lists` is empty.
*   **Single element:** `nums.length = 1`, `k = 1`.
*   **`k` value:** `k=1` (smallest/largest), `k=N` (entire array).
*   **Duplicates:** How does your solution handle duplicates? (Heaps usually handle them fine).
*   **Data Range:** Are numbers positive/negative? Max/min values? (Affects integer overflow, though less common with heaps).
*   **Linked Lists:** Null lists, single-node lists.

## 6. Interview Strategy

1.  **Clarify:** Ask clarifying questions about input constraints, `k`'s range, duplicates, return order.
2.  **Example:** Work through a small example manually to ensure you understand the problem.
3.  **Brute Force:** Briefly mention a brute-force approach (e.g., sort the whole array for Kth largest) and its complexity. This shows you can identify less optimal solutions.
4.  **Optimal Solution (Heap):** Explain *why* a heap is suitable. Describe the algorithm step-by-step.
    *   Which type of heap (min/max)?
    *   What exactly is stored in the heap (e.g., `int`, `ListNode*`, `pair<int, int>`)?
    *   How is the heap property maintained during operations?
5.  **Time/Space Complexity:** Analyze thoroughly. Don't just state it; explain *why*.
    *   Example: "Each of N elements is pushed into the heap once, taking log K time, so total N log K."
6.  **Code:** Write clean, well-commented code. Use meaningful variable names.
7.  **Test:** Walk through your code with your example. Consider an edge case.
8.  **Refine/Discuss:** Be open to suggestions. If the interviewer asks about alternatives, discuss them.

## 7. Self-Practice Checklist

*   Can I implement a Min-Heap and Max-Heap from scratch (array-based, `heapify_up`, `heapify_down`)?
*   Can I solve Kth Largest, Merge K Sorted Lists, Median from Data Stream, Top K Frequent with heaps?
*   Can I use `std::priority_queue` correctly for both min and max heap behaviors?
*   Can I correctly explain the time and space complexity for all heap operations and problems?
*   Can I identify when a heap is the appropriate data structure for a given problem?

By focusing on these points, you'll be well-prepared to tackle heap-related questions in your coding interviews.