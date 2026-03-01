# Heap Operations: Interview Tips and Variations

Heaps are a versatile data structure, and understanding them deeply is crucial for coding interviews. This document provides tips, common variations, and things to watch out for.

## 1. Core Concepts to Master

*   **Min-Heap vs. Max-Heap:** Know their properties and how they differ. Be able to describe their uses.
*   **Heap Operations:** Understand `push` (insert), `pop` (delete min/max), `peek` (get min/max), and how `heapify_up` (`sift-up`) and `heapify_down` (`sift-down`) work to maintain the heap property.
*   **Time/Space Complexity:** Memorize O(log N) for insertions/deletions, O(1) for peek, and O(N) or O(k) space for many applications.
*   **Array Representation:** Be able to draw or explain how a heap (a complete binary tree) is stored in an array.

## 2. Python `heapq` Specifics

*   **Min-Heap Only:** `heapq` is a min-heap.
*   **Simulating Max-Heap:** Remember to negate values when pushing/popping to use `heapq` as a max-heap. `heapq.heappush(heap, -value)`, `value = -heapq.heappop(heap)`.
*   **List-Based:** `heapq` works on regular Python lists. You don't create a `Heap` object.

## 3. Common Problem Patterns

Heaps are typically used in these scenarios:

*   **Kth Largest/Smallest Element:** Maintain a heap of size `k`.
    *   For Kth **largest**, use a **min-heap** of size `k`.
    *   For Kth **smallest**, use a **max-heap** of size `k`.
*   **Top K Frequent/Largest/Smallest:** Similar to Kth element, often involves a preliminary frequency count (hash map) then a fixed-size heap.
*   **Merge K Sorted Data Structures:** Use a min-heap to keep track of the smallest element from each of the `k` structures (lists, arrays, streams).
*   **Median/Percentile in a Data Stream:** Use two heaps (one min-heap, one max-heap) to divide the data into two halves and maintain balance.
*   **Priority Queues:** Any problem that requires processing items based on their priority (e.g., shortest path algorithms like Dijkstra's, event scheduling).
*   **Sliding Window Minimum/Maximum:** Sometimes a heap can be used, though deque-based solutions are often preferred for strict sliding window. For "Smallest Range Covering Elements from K Lists", a heap is perfect.

## 4. Interview Tips and Strategies

1.  **Clarify the Problem:**
    *   Are duplicates allowed? How are they handled (e.g., Kth largest can include duplicates)?
    *   What are the constraints (N, K range, value range)? This impacts complexity trade-offs.
    *   What type of data (integers, custom objects)? If custom objects, how do they compare? (e.g., `__lt__` method for ListNode).

2.  **Start with Brute Force/Naïve:** Briefly mention a brute-force approach (e.g., sorting the whole array) and its complexity. This shows you understand the problem space.

3.  **Identify Heap Applicability:**
    *   Do you need the "K" most something? (Heap of size K)
    *   Do you need to continuously get the minimum/maximum from a dynamic set? (Priority Queue)
    *   Do you need to keep data balanced around a median? (Two heaps)

4.  **Choose the Right Heap Type:**
    *   If you need the largest `k` items, a min-heap of size `k` is efficient. The root is the `k`th largest.
    *   If you need the smallest `k` items, a max-heap of size `k` is efficient. The root is the `k`th smallest.
    *   For merging, a min-heap is usually used to get the overall minimum.

5.  **Walk Through an Example:** Use a small, custom example to demonstrate your algorithm step-by-step. Show how elements are pushed, popped, and how the heap structure changes. This is crucial for verifying your logic.

6.  **Analyze Complexity:** Clearly state the time and space complexity. Explain how you arrived at it.
    *   **Time:** Usually `O(N log K)` or `O(N log N)`.
    *   **Space:** Usually `O(K)` or `O(N)`.

7.  **Discuss Edge Cases:**
    *   Empty input array/list(s).
    *   `k` equals 1.
    *   `k` equals `N` (total number of elements).
    *   All elements are the same.
    *   Negative numbers.
    *   Large input sizes (where `O(N log K)` beats `O(N log N)`).

8.  **Code Clearly:**
    *   Use meaningful variable names.
    *   Add comments for complex logic.
    *   Handle edge cases explicitly.

## 5. Common Variations and Follow-ups

*   **Bounded Max/Min:** "Find the K largest/smallest elements in a stream of N numbers, where N can be very large." -> This is a classic `O(K)` space, `O(N log K)` time problem, ideal for a fixed-size heap.
*   **Finding the Kth element without modifying the input array:** Heap solutions typically don't modify the input array, making them suitable.
*   **"Top K" problem variants:**
    *   Top K frequent words in a document (requires `Counter` or hash map).
    *   Top K longest strings.
    *   Top K reviews by rating.
*   **Variations of "Merge K Sorted Lists":**
    *   Merge K sorted arrays/streams.
    *   Merge K sorted files (external sort).
*   **Variations of "Median Finder":**
    *   Find the `p`-th percentile instead of just the median. (Extend two-heap logic to maintain `p` and `1-p` portions).
    *   What if deletion is also required? (More complex, requires lazy deletion or a more advanced heap implementation like a Fibonacci heap or self-balancing BST).
*   **"Smallest Range":** Consider what happens if lists are empty or contain duplicates.

## 6. Gotchas and Pitfalls

*   **Min-Heap vs. Max-Heap Confusion:** The most common mistake. Remember: if you want the largest `k` items, you use a min-heap of size `k` (the smallest item in the heap is your `k`th largest).
*   **Tuple Comparison:** When storing tuples in `heapq` (e.g., `(frequency, item)`), Python compares them lexicographically. If frequencies are equal, it compares `item`. This might need adjustment if `item` itself is not comparable or if a specific tie-breaking rule is needed (e.g., using `(frequency, index, item)` to ensure unique items).
*   **Off-by-one errors with `k`:** Carefully check `k-1` vs `k` for indexing and heap sizes.
*   **Edge cases with empty heaps:** `pop()` or `peek()` on an empty heap should raise an `IndexError`. Handle these gracefully.
*   **Python `heapq` mutates list in place:** If you need the original list untouched, make a copy.

By focusing on these points, you can approach heap-related interview questions with confidence and demonstrate a solid understanding of this powerful data structure.

---