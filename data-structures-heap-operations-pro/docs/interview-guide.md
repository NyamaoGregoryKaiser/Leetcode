```markdown
# Heap Interview Guide: Tips, Variations, and Gotchas

Heaps are a popular topic in coding interviews due to their versatility in solving problems related to finding k-th smallest/largest elements, managing priorities, and merging sorted data. This guide provides tips for excelling in heap-related interview questions.

## 1. Core Concepts to Master

Before diving into problems, ensure you have a strong grasp of these fundamentals:

*   **Definition:** What is a heap? (Complete binary tree, heap property).
*   **Types:** Min-Heap vs. Max-Heap (know the difference in property and typical use cases).
*   **Array Representation:** How a heap is stored in an array, and how to calculate parent/child indices (0-indexed and 1-indexed).
*   **Core Operations:**
    *   `insert` (O(log N)): Involves `heapifyUp` (bubble up, sift up).
    *   `extract-min/max` (O(log N)): Involves `heapifyDown` (bubble down, sift down).
    *   `peek` (O(1)): Get top element.
    *   `buildHeap` (O(N)): Efficiently construct a heap from an array.
*   **Time & Space Complexity:** Know the complexity for all operations and be ready to explain why.

## 2. Explaining Your Heap Implementation

If asked to implement a heap from scratch:

1.  **Start with the basics:** Explain the concept of a heap, its properties (complete binary tree, min/max heap property), and why an array is a good choice for implementation.
2.  **Parent/Child Indexing:** Clearly state your indexing convention (0-indexed is common) and derive the formulas for parent, left child, and right child.
3.  **Core Methods First:** Implement `swap`, `parent`, `leftChild`, `rightChild`.
4.  **HeapifyUp/Down:** These are the heart of the heap. Explain their purpose, step-by-step logic, and how they restore the heap property.
    *   Use an example to trace one `heapifyUp` or `heapifyDown` call.
    *   Mention the base cases (root for `heapifyUp`, leaf for `heapifyDown`).
5.  **Insert/Extract:** Show how these high-level operations leverage `heapifyUp` and `heapifyDown`.
6.  **Edge Cases:** Discuss how your implementation handles empty heaps, single-element heaps.
7.  **Custom Comparators:** A good implementation should be generic and accept a custom comparator for non-primitive types or specific ordering needs. This shows flexibility and good design.

## 3. Common Interview Problems & Variations

Most heap problems fall into a few categories:

*   **K-th Smallest/Largest Element:**
    *   **Problem:** Find the K-th largest/smallest element in an array.
    *   **Solution:** Use a Min-Heap (for Kth largest) or Max-Heap (for Kth smallest) of size K.
    *   **Variations:** Kth largest in a stream (like in this project), K closest points, K-th largest sum subarray.
    *   **Tip:** When looking for the Kth largest, use a Min-Heap of size K. The root will be your answer. (And vice-versa).
*   **Priority Queues:**
    *   **Problem:** Implement a priority queue, tasks scheduling by priority.
    *   **Solution:** Directly use a Min-Heap (for lowest priority first) or Max-Heap (for highest priority first).
    *   **Variations:** Simulate CPU scheduling, event queue, task manager.
*   **Merging Sorted Structures:**
    *   **Problem:** Merge K sorted lists/arrays (like in this project).
    *   **Solution:** Use a Min-Heap to keep track of the smallest available element from each list.
    *   **Variations:** Merge K sorted files, find smallest range covering elements from K lists.
*   **Median from Data Stream:**
    *   **Problem:** Find the median of numbers as they arrive in a stream (like in this project).
    *   **Solution:** Use two heaps: a Max-Heap for the smaller half and a Min-Heap for the larger half. Maintain balance between their sizes.
    *   **Variations:** Similar two-heap problems where you need to maintain a "window" or "balance" of elements.
*   **Heap Sort:**
    *   **Problem:** Sort an array using a heap.
    *   **Solution:** Build a Max-Heap from the array. Repeatedly extract the max element and place it at the end of the array. This is an in-place sort.

## 4. Edge Cases and Gotchas

Always discuss and test these:

*   **Empty Heap:** What happens if `peek()` or `extract()` is called on an empty heap? (Should return `undefined` or `null`).
*   **Single Element Heap:** How do `insert` and `extract` behave with just one element?
*   **Duplicate Values:** Heaps must handle duplicates correctly (e.g., both `1`s should be extracted if they are the smallest).
*   **`k` value:** For k-th largest/frequent, what if `k` is larger than the array size? What if `k` is 0 or negative?
*   **Input Constraints:** Are numbers always positive? Integers? Floats? Negatives? This might influence your comparator.
*   **Large Inputs:** Consider `N` up to 10^5 or 10^6. O(N log N) is typically fine, O(N^2) is not. O(N log K) is excellent if K is small.

## 5. Interview Tips

*   **Clarify:** Ask clarifying questions about input constraints, expected output format, edge cases, and time/space requirements.
*   **Think Aloud:** Explain your thought process, even if you make wrong turns. The interviewer wants to see how you approach problems.
*   **Start with Brute-Force (if applicable):** Briefly mention a brute-force approach, its complexity, and why it's not optimal. Then pivot to a heap-based solution.
*   **Draw Diagrams:** For heap problems, drawing the heap (as a tree) and tracing `heapifyUp`/`heapifyDown` on paper (or whiteboard) is incredibly helpful for explaining your logic. Use ASCII art like in the `docs/heap-operations-explained.md`.
*   **Walkthrough an Example:** Use a small, concrete example to demonstrate your algorithm step-by-step.
*   **Code Structure:** Use clear function names, comments, and organize your code.
*   **Complexity Analysis:** Explicitly state the time and space complexity for your solution and explain your reasoning.
*   **Test Cases:** Think of and articulate a few test cases, including edge cases, and mentally walk through them.
*   **Polite & Confident:** Maintain a positive attitude. It's okay to make mistakes; focus on correcting them and learning.

## 6. Variations and Follow-up Questions

*   **In-Place Heap Construction:** How would you build a heap directly within an existing array in O(N) time? (Answer: Start `heapifyDown` from `floor(N/2)-1` down to 0).
*   **Decrease/Increase Key:** How would you implement `decreaseKey` (for Min-Heap) or `increaseKey` (for Max-Heap) if you knew the index of the element? (Answer: Modify value, then call `heapifyUp` or `heapifyDown` as appropriate). This requires storing indices if elements are not unique.
*   **Heap with Objects:** How do you handle objects in a heap? (Answer: Use a custom comparator function that compares the relevant property of the objects).
*   **Non-standard K-th problem:** "Find the Kth smallest difference between any two elements." (Often solvable with a Min-Heap and careful state tracking).
*   **External K-th:** If the data is too large to fit in memory, how would you find the K-th largest? (Answer: Disk-based merge sort-like approach, or iterating through chunks and using a heap of size K).

By thoroughly preparing these aspects, you'll be well-equipped to tackle almost any heap-related coding interview challenge.
```