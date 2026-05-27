```markdown
# Interview Guide: Heap Operations

This document provides tips, common edge cases, and variations for Heap-related problems during coding interviews.

## 1. General Interview Tips for Heap Problems

*   **Clarify Constraints**: Always start by asking about input size, range of values, duplicates, and expected time/space complexity. This helps in choosing the right approach.
    *   *Example Question*: "What is the maximum size of the array/number of lists?" "Can numbers be negative?" "Are there any memory limits?"
*   **Identify Heap Suitability**: Heaps are ideal when you need to quickly find the minimum or maximum element among a collection, or maintain a "top K" set of elements. They shine when you don't need the entire collection sorted, but only its extremes.
    *   *Keywords*: "k-th smallest/largest", "top k", "median", "priority queue", "merge sorted streams/lists".
*   **Choose Min-Heap vs. Max-Heap**:
    *   **Min-Heap**: Use when you need the smallest element frequently, or to keep track of the *largest* `k` elements (by popping the smallest when size > k).
    *   **Max-Heap**: Use when you need the largest element frequently, or to keep track of the *smallest* `k` elements (by popping the largest when size > k).
*   **Start with Brute Force (if applicable)**: Briefly describe a naive solution (e.g., sorting the whole array) to establish a baseline. This shows you can solve the problem, even if not optimally.
*   **Optimize with Heaps**: Explain *why* a heap is a better choice. Compare its complexity to the brute-force.
*   **Walkthrough an Example**: Use a small example to illustrate your chosen heap-based algorithm step-by-step. Verbally trace the heap's state.
*   **Discuss Edge Cases**: Proactively identify and discuss edge cases.
*   **Complexity Analysis**: Always provide a detailed time and space complexity analysis for your solution.
*   **Talk Through Your Code**: Explain your thought process as you write code. Don't just type silently.
*   **Test Your Code**: Once done, walk through a few test cases (including edge cases) with your interviewer.

## 2. Common Edge Cases and Gotchas

*   **Empty Inputs**:
    *   Empty array (`nums` for Kth Largest, Top K Frequent).
    *   Empty list of lists (`lists` for Merge K Sorted Lists).
    *   Empty stream (`MedianFinder`).
*   **Single Element/List**: What happens when `k=1` or `k=N`? Or when there's only one list to merge?
*   **Duplicates**: Do duplicates affect the count (e.g., "k-th largest distinct" vs. "k-th largest element in sorted order")? Most problems imply non-distinct count unless specified.
*   **All Same Elements**: If all elements are identical, how does your solution behave?
*   **Negative Numbers/Zero**: Ensure your logic handles them correctly.
*   **Large Number of Elements/High K**: `K` can be close to `N`. `N` can be very large. Consider memory limits.
*   **Data Type Limits**: Are `int` values sufficient, or do you need `long long`?
*   **Memory Management (C++ specific)**: For linked lists, explicitly deleting nodes or using smart pointers is crucial to avoid memory leaks. In interviews, often simplified unless it's a specific memory-management question.

## 3. Problem-Specific Interview Tips & Variations

### 3.1 Kth Largest Element in an Array

*   **Core Idea**: Keep a min-heap of size `k`.
*   **Variations**:
    *   **Kth Smallest Element**: Use a max-heap of size `k`.
    *   **Kth Largest *Distinct* Element**: Use a `std::set` or hash set first to get distinct elements, then apply Kth largest logic.
    *   **Finding N-K smallest**: Equivalent to Kth largest.
    *   **Median of an unsorted array**: Special case where `k = N/2` (or `N/2+1`). Quickselect is generally preferred for this.
*   **Discussion Points**:
    *   Compare heap solution (`O(N log K)`) with Quickselect (`O(N)` average, `O(N^2)` worst-case). Quickselect is theoretically faster but trickier to implement correctly for guaranteed `O(N)` worst-case (median-of-medians pivot selection).
    *   Space complexity trade-offs: `O(K)` for heap, `O(1)` (in-place) for Quickselect if implemented iteratively.

### 3.2 Merge K Sorted Lists

*   **Core Idea**: Use a min-heap to always pick the smallest available node from `k` lists.
*   **Variations**:
    *   **Merge K Sorted Arrays**: Same logic, just manage array indices instead of `ListNode->next`.
    *   **Merge K Sorted Files**: Conceptually similar, but involves external sorting if files are too large for memory.
    *   **Merge 2 Sorted Lists**: Often a warm-up for this problem.
*   **Discussion Points**:
    *   Compare heap solution (`O(N log K)`) with `O(N*K)` brute force (repeatedly merging two lists naively) and `O(N log K)` divide-and-conquer approach.
    *   Linked List node ownership and memory management.

### 3.3 Find Median from Data Stream

*   **Core Idea**: Two heaps approach (max-heap for smaller half, min-heap for larger half) to maintain balance.
*   **Variations**:
    *   **Sliding Window Median**: Find the median of elements in a fixed-size window as it slides over an array. Requires a more complex two-heap setup or a balanced BST (like `std::multiset` in C++).
    *   **Mean/Mode from Data Stream**: Mean is simpler (sum/count). Mode is harder (requires frequency map + possibly a max-heap on frequencies).
*   **Discussion Points**:
    *   Importance of balancing the heap sizes (differ by at most 1).
    *   How `low_heap.top()` and `high_heap.top()` combine to form the median.
    *   Choosing which heap receives a new number first before rebalancing.

### 3.4 Top K Frequent Elements

*   **Core Idea**: Use a hash map for frequency counts, then a min-heap to keep track of the top `k` frequencies.
*   **Variations**:
    *   **Bottom K Frequent Elements**: Use a max-heap of size `k` to keep track of elements with smallest frequencies.
    *   **Top K Frequent Words**: Same logic, but with strings.
    *   **Finding elements with frequency > N/K**: Related to bucket sort or counting sort.
*   **Discussion Points**:
    *   Choice between `std::map` (ordered keys, `O(log N)` access) and `std::unordered_map` (average `O(1)` access, no order) for frequency counting. `unordered_map` is generally preferred for performance here.
    *   The `O(N + M log K)` complexity (where `M` is distinct elements) and why it's better than `O(N + M log M)` (map then sort).
    *   Consider Bucket Sort (or Counting Sort) if frequencies are within a limited range. For example, if max frequency is `F_max`, you could create `F_max+1` buckets (vectors of numbers), put numbers in buckets by their frequency, then iterate buckets from `F_max` down to get top K. This can be `O(N)` overall but requires knowing frequency range.

By internalizing these concepts and practice, you'll be well-prepared for heap-related questions in technical interviews. Good luck!
```