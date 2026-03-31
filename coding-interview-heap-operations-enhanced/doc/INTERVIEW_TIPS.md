```markdown
# Interview Tips: Heap Operations

This document provides guidance for approaching heap-related problems in coding interviews, including common patterns, variations, crucial edge cases, and general advice.

## 1. Recognizing Heap Problems

Heaps are powerful tools for certain types of problems. Look for keywords or patterns that suggest a heap solution:

*   **"Kth largest/smallest"**: Often indicates a Min-Heap (for Kth largest) or Max-Heap (for Kth smallest) of size K.
*   **"Top K" or "Most Frequent K"**: Similar to Kth largest/smallest, usually involves a fixed-size heap.
*   **"Median in a stream"**: A classic problem solvable with two heaps (one Max-Heap, one Min-Heap).
*   **"Merge K sorted..." (lists, arrays, files)**: A Min-Heap is excellent for managing the smallest elements from K sources.
*   **"Scheduler/Prioritization"**: When tasks have priorities and you always need to process the highest/lowest priority task next.
*   **"Sliding Window Maximum/Minimum" (less direct, but related)**: A deque is often more optimal, but a heap can be used.

## 2. General Interview Strategy

1.  **Understand the Problem:**
    *   Read carefully. Clarify input/output formats, constraints (N, K ranges, data types, negative numbers, duplicates).
    *   Ask clarifying questions (e.g., "Are the lists truly sorted?", "What if K is larger than the number of unique elements?").

2.  **Brainstorm Approaches:**
    *   **Brute Force:** Start with the simplest, often inefficient, approach (e.g., sort everything). This helps you understand the problem space and provides a baseline.
    *   **Optimization with Data Structures:** Can a hash map, set, queue, stack, or *heap* help?
        *   If you need the min/max element quickly from a dynamic collection, or the Kth min/max, think HEAP.
    *   **Divide and Conquer / Dynamic Programming:** Less common for pure heap problems, but keep in mind.

3.  **Choose Optimal Approach & Explain:**
    *   State your chosen approach (e.g., "I'll use a Min-Heap of size K").
    *   Explain *why* it's optimal (time/space complexity benefits over brute force).
    *   Walk through the algorithm step-by-step with a simple example.

4.  **Code It:**
    *   Write clean, readable code.
    *   Use meaningful variable names.
    *   Handle edge cases as you go or after the main logic.

5.  **Test and Debug:**
    *   Mentally trace your code with your chosen example.
    *   Consider specific edge cases (empty input, single element, all duplicates, K=1, K=N).
    *   Verify time and space complexity.

## 3. Heap-Specific Considerations

### 3.1. Min-Heap vs. Max-Heap

*   **Kth Largest Element:** Use a **Min-Heap** of size `K`. Why? You want to store the `K` largest elements. The smallest among these `K` largest will be at the root. If a new element comes in that is larger than the root, it means it's one of the new `K` largest, so you pop the smallest (root) and insert the new element.
*   **Kth Smallest Element:** Use a **Max-Heap** of size `K`. Similar logic, but for the smallest elements.

### 3.2. Custom Implementation vs. Standard Library `std::priority_queue`

*   **Interview Context:**
    *   Most commonly, you're expected to use `std::priority_queue` for convenience and to focus on the *algorithm*.
    *   However, being able to *explain* how a heap works internally (heapify-up/down) is crucial.
    *   Sometimes, an interviewer might specifically ask you to implement a heap from scratch. This project includes a custom implementation to prepare for that.
*   **`std::priority_queue` defaults to Max-Heap.** For a Min-Heap, you need to provide a custom comparator:
    *   `std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;`
    *   For custom objects (e.g., `pair<int, int>`), you'll need a custom `struct` comparator.

### 3.3. Balancing Heaps (e.g., Find Median)

*   When using two heaps, ensure their sizes are balanced. The common rule is `abs(heap1.size() - heap2.size()) <= 1`.
*   Maintain the invariant: `max_heap.top() <= min_heap.top()` (or similar, depending on how you define your halves).
*   If an element needs to move from one heap to another, it's a `pop()` from one and a `push()` to the other.

### 3.4. Storing Custom Objects/Pairs

*   Many heap problems involve storing `std::pair<int, int>` (e.g., `(frequency, element)`, `(value, list_index)`).
*   When using `std::priority_queue` with pairs, it defaults to comparing the `first` element, then the `second` if the `first`s are equal. If you need different behavior (e.g., min-heap based on `first`, max-heap based on `second`), you'll need a custom comparator:

    ```cpp
    // Example: Min-heap of pairs based on first element
    struct ComparePairs {
        bool operator()(const std::pair<int, int>& a, const std::pair<int, int>& b) {
            return a.first > b.first; // For Min-Heap on first element
        }
    };
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, ComparePairs> pq;
    ```

## 4. Edge Cases and Gotchas

*   **Empty Inputs:** What if `nums` is empty? What if `k` is 0 or negative?
*   **Single Element:** If `nums` has only one element.
*   **`k = 1` or `k = N`:**
    *   For Kth largest, `k=1` means largest, `k=N` means smallest.
*   **Duplicates:** How do duplicates affect the count or order?
*   **All Same Elements:** E.g., `[5, 5, 5, 5]`, `k=2`.
*   **Large Inputs:** Consider `N` up to 10^5 or 10^6. Does your `O(N log N)` solution become `O(N log K)`?
*   **Memory Limits:** For very large N, if `O(N)` space is too much, look for `O(K)` or `O(1)` space solutions (though often `O(N)` is acceptable for heaps as it's typically storing *some* data).
*   **Iterator Invalidation:** Less common with `std::priority_queue`, but if implementing your own heap or using other containers, be mindful.

## 5. Time and Space Complexity Analysis

Always be ready to analyze your solution's complexity.

*   **Heap push/pop:** `O(log H)` where `H` is the current size of the heap.
*   **Building a heap from `N` elements:** `O(N)` (using `std::make_heap`) or `O(N log N)` (repeated `push`).
*   **Iterating `N` times with heap operations:** `N * O(log H)`.

## 6. Example Walkthrough (Kth Largest)

Let's say you're asked for the 3rd largest element.
`nums = [4, 5, 8, 2]`, `k = 3`
`add(3), add(5), add(10), add(9), add(4)`

1.  **Initialize `KthLargest(3, [4, 5, 8, 2])`**
    *   Create `min_heap` (max size 3).
    *   `push(4)`: `[4]`
    *   `push(5)`: `[4, 5]` -> heap becomes `[4, 5]`
    *   `push(8)`: `[4, 5, 8]` -> heap becomes `[4, 5, 8]`
    *   `push(2)`: `[2, 4, 5, 8]` -> `2` is added. Size 4. Pop `top()` (which is `2`).
        *   Heap is `[4, 5, 8]`.
    *   Current 3 largest: `4, 5, 8`. Smallest of these is `4`. `kth_largest = 4`.

2.  **`add(3)`**
    *   `push(3)`: `[3, 4, 5, 8]` -> `3` is added. Size 4.
    *   `top()` is `3`. Is `3` one of the 3 largest? No, because `[3, 4, 5, 8]` means `3` is the smallest. Pop `3`.
    *   Heap is `[4, 5, 8]`.
    *   `top()` is `4`. Return `4`.

3.  **`add(5)`**
    *   `push(5)`: `[4, 5, 5, 8]` -> `5` is added. Size 4.
    *   `top()` is `4`. Is `4` one of the 3 largest? No. Pop `4`.
    *   Heap is `[5, 5, 8]`.
    *   `top()` is `5`. Return `5`.

And so on. This methodical walkthrough demonstrates your understanding.

---

By keeping these tips in mind and practicing with the problems provided in this project, you'll be well-prepared to tackle heap-related questions in technical interviews. Good luck!
```