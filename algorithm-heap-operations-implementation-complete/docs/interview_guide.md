# Heap Operations: Interview Guide

This guide provides practical tips, common variations, and potential pitfalls for coding interviews involving heap data structures.

## 1. Understanding the Role of Heaps

Before jumping into solutions, always ask yourself: "Why a heap here?"
Heaps are ideal when you need to efficiently find the **minimum or maximum element** from a collection, especially when that collection is **dynamically changing** (elements are added and removed frequently).

**Key Indicators for Heap Usage:**
*   "Kth largest/smallest" (often a min-heap for Kth largest, or max-heap for Kth smallest)
*   "Top K" or "Smallest K" elements
*   "Median from a data stream"
*   "Merge K sorted..." (lists, arrays, files)
*   Problems involving priority (e.g., event scheduling, tasks with priorities)
*   Dijkstra's algorithm, Prim's algorithm (though often implemented with `std::set` in C++ for flexible updates, conceptually a min-priority queue)

## 2. Standard Library `std::priority_queue` vs. Custom Heap

In C++ interviews, `std::priority_queue` is usually your go-to for heap problems. It's efficient, well-tested, and covers most use cases.

*   **`std::priority_queue` (Default Max-Heap):**
    ```cpp
    std::priority_queue<int> max_heap; // Largest element on top
    ```
*   **`std::priority_queue` (Min-Heap):**
    ```cpp
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap; // Smallest element on top
    ```
    *   The second template argument (`std::vector<int>`) is the underlying container (default is `std::vector`).
    *   The third argument (`std::greater<int>`) is the comparator. `std::greater<T>` makes it a min-heap because it defines "greater than" as higher priority, which means smaller elements are actually considered "greater" in terms of priority to bubble up. (Confusing, yes, but that's how it works).

**When to implement a custom heap?**
*   **Explicitly asked:** The interviewer might want to see your understanding of heap internals.
*   **Non-standard operations:** If you need to delete arbitrary elements, update priorities (decrease-key/increase-key), or iterate through the heap in a way `std::priority_queue` doesn't support directly (e.g., building a Fibonacci heap for advanced use cases). For most interview problems, `std::priority_queue` is sufficient.

## 3. Interview Steps and Tips

1.  **Clarify the Problem:**
    *   Are duplicates allowed? How are they handled?
    *   What are the constraints on input size, element values (positive/negative)?
    *   What exactly does "Kth largest" mean (distinct vs. in sorted order)?
    *   What if `k` is invalid (e.g., `k > N`, `k <= 0`)?

2.  **Brainstorm Approaches:**
    *   **Brute-force:** Sorting the entire array/list (e.g., `O(N log N)`). This is usually a good baseline to discuss.
    *   **Heap-based:** If min/max/Kth element is involved, a heap is likely optimal.
    *   **Other optimized techniques:** For Kth element, Quickselect is a strong alternative. For top K frequent, bucket sort might be `O(N)`.

3.  **Choose Optimal Approach & Explain:**
    *   Justify your choice. "I'll use a min-heap because..."
    *   Walk through the algorithm step-by-step.
    *   Use a small example to demonstrate.

4.  **Discuss Time and Space Complexity:**
    *   For heap operations: `push` and `pop` are `O(log N)`, `top` is `O(1)`. Building a heap from an array is `O(N)`.
    *   Be precise: `O(N log K)` vs `O(N log N)` vs `O(N)`.
    *   Consider both time and auxiliary space.

5.  **Write Clean Code:**
    *   Use meaningful variable names.
    *   Add comments for complex logic.
    *   Handle edge cases explicitly (empty inputs, `k=1`, `k=N`).

6.  **Test Thoroughly:**
    *   **Small examples:** The ones you used during explanation.
    *   **Edge cases:** Empty input, single element, all elements same, `k=1`, `k=N`.
    *   **Worst-case scenarios:** If your Quickselect uses a fixed pivot and input is sorted/reverse-sorted.

7.  **Discuss Follow-ups & Variations:** Be prepared for these!

## 4. Common Variations and Follow-ups

*   **Kth Largest/Smallest with Duplicates:** Usually, "Kth largest" means the element you'd find at index `N-K` in a sorted array (e.g., `[3,2,3,1,2,4,5,5,6], k=4` -> `[1,2,2,3,3,4,5,5,6]`, 4th largest is `4`). If distinct Kth is asked, it's a different problem.
*   **K Closest Points to Origin:** Use a max-heap of size K. Store `(distance, point)` pairs. If current point's distance is smaller than heap's top, pop and push.
*   **Sliding Window Median/Max/Min:** Use two heaps for median. For max/min, usually a deque (`std::deque`) is more efficient to maintain monotonic queue.
*   **Merge K sorted streams/files:** Same logic as merge K sorted lists, but use custom iterators or file pointers with the min-heap.
*   **Building a Heap:** If `std::make_heap` is not allowed, explain the `O(N)` bottom-up heap construction by calling `heapifyDown` from `(N/2 - 1)` down to `0`.
*   **Decrease/Increase Key:** If element priorities can change. `std::priority_queue` doesn't directly support this. You'd need a custom heap where nodes store their index in the underlying array, or use a `std::set` (often preferred in C++ for this). Or, a simpler approach for interviews is to push the updated item (creating a duplicate) and ignore older (stale) entries if popped.

## 5. Edge Cases and Gotchas

*   **Empty inputs:** Handle empty arrays, empty lists of lists, empty data streams.
*   **Invalid `k`:** What if `k` is out of bounds (e.g., `k > N` or `k <= 0`)?
*   **Large `N`, small `K`:** This is where `O(N log K)` heap solutions shine over `O(N log N)` sorting.
*   **Large `N`, `K ~ N`:** Heap solutions become `O(N log N)`. Quickselect (average `O(N)`) might be better if allowed.
*   **Integer overflow:** Be mindful of sums or calculations (e.g., median calculations) that could lead to overflow if using `int`. Use `long long` or `double` where appropriate.
*   **Memory management:** For linked list problems, remember to `delete` allocated `ListNode` objects to prevent memory leaks, especially when constructing new lists.
*   **Comparator Logic:** The most common mistake with `std::priority_queue` is getting the comparator wrong for min-heap vs. max-heap. Remember `std::greater<T>` for min-heap (smallest on top). For custom comparators `comp(a,b)` in `std::priority_queue`, it should return `true` if `a` has *lower* priority than `b` (meaning `a` will go "below" `b`).

## 6. Self-Reflection

After implementing and testing, ask yourself:
*   Can this be optimized further? (E.g., `O(N)` Quickselect vs `O(N log K)` heap).
*   Are there any trade-offs (time vs. space, average vs. worst-case)?
*   How would this perform with different data distributions (sorted, reverse-sorted, all identical)?
*   What if the input size is extremely large (e.g., fits in disk, not memory)? (This leads to external sorting/merging).

By thoroughly preparing with these concepts, approaches, and considerations, you'll be well-equipped to tackle heap-related coding interview questions confidently.

---