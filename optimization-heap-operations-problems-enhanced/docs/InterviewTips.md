```markdown
# Heap Operations: Interview Tips and Variations

Mastering heap-related problems is crucial for coding interviews. This document provides tips on how to approach these problems, common pitfalls, questions to ask, and variations.

## 1. General Approach to Heap Problems

1.  **Identify the Need for Ordering/Priority:**
    *   Do you need to repeatedly find the smallest/largest element?
    *   Do you need to maintain a "top K" or "bottom K" set of elements?
    *   Is there a "next best" or "next worst" element that needs to be processed from a collection?
    *   If yes to any of these, a heap (PriorityQueue in Java) is a strong candidate.

2.  **Choose the Right Heap Type (Min-Heap vs. Max-Heap):**
    *   **Finding the Kth LARGEST/TOP K elements:** Use a **Min-Heap** of size `K`. Why? Because the smallest element in this min-heap will be your Kth largest overall. If you encounter an element larger than the current smallest in your min-heap, you replace it, always keeping track of the K largest.
        *   `PriorityQueue<Integer> minHeap = new PriorityQueue<>();`
    *   **Finding the Kth SMALLEST/BOTTOM K elements:** Use a **Max-Heap** of size `K`. Why? The largest element in this max-heap will be your Kth smallest overall. If you encounter an element smaller than the current largest in your max-heap, you replace it.
        *   `PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());`
    *   **General "Get Min/Max repeatedly":** Use a Min-Heap for getting min, Max-Heap for getting max.

3.  **Custom Objects in Heaps:**
    *   If you need to store custom objects (e.g., `ListNode`, `Map.Entry`, `Pair`), ensure they implement `Comparable` or provide a `Comparator` to the `PriorityQueue` constructor.
    *   Example: `new PriorityQueue<>((a, b) -> a.val - b.val);` for `ListNode`.

4.  **Edge Cases and Constraints:**
    *   Empty input array/list.
    *   `k` value: `k=1`, `k=N` (where N is total elements), `k > N` (usually not allowed by problem statement, but clarify).
    *   Duplicate elements.
    *   Negative numbers.
    *   Large input sizes (consider `int` vs `long`).

## 2. Common Pitfalls and Gotchas

*   **Off-by-one errors with `k`:** Ensure `k` is handled correctly, especially when checking `heap.size() > k`.
*   **Incorrect Comparator:** A common mistake is to reverse the comparator for min/max heap. Double-check.
*   **Null Pointers:** When dealing with linked lists (e.g., `node.next`), always check for `null`.
*   **Not handling duplicates correctly:** Ensure your frequency counts or heap logic correctly accounts for multiple occurrences of the same value.
*   **Misunderstanding heap properties:** Remember `PriorityQueue`'s `poll()` removes the *head* (min for min-heap, max for max-heap), and `peek()` inspects it.
*   **Forgetting `Collections.reverseOrder()` for Max-Heap:** `PriorityQueue` is a min-heap by default.

## 3. Questions to Ask the Interviewer

*   **Constraints on `N` and `K`:** What are the typical sizes of the input array/lists (`N`) and `K`? This helps determine if an O(N log N) solution is acceptable or if O(N log K) or O(N) is required.
*   **Input Data Range:** Are numbers always positive? Can they be very large? (Affects data types).
*   **Duplicate Elements:** How should duplicates be handled? (e.g., `k`th largest distinct vs. `k`th largest overall).
*   **Output Format:** For Top K Frequent, does the order of the `k` elements matter?
*   **Space vs. Time Trade-off:** Is it okay to use extra space for a faster solution?
*   **Clarification on "Sorted":** For `Merge K Sorted Lists`, are they always ascending?
*   **Mutable Inputs:** Can I modify the input array/lists?

## 4. Interview-Specific Tips

*   **Start with Brute Force:** Briefly mention a brute-force approach (e.g., sorting the whole array, concatenating all lists and sorting) to show you understand the problem, then immediately pivot to the optimal heap solution.
*   **Explain Your Thought Process:** Talk out loud. Explain *why* you choose a heap, *why* a min-heap over a max-heap (or vice-versa) for your specific problem.
*   **Draw Diagrams:** For problems like `Merge K Sorted Lists`, draw how the heap state changes with nodes entering and leaving. For `Kth Largest`, illustrate the heap's contents. Use ASCII art or a whiteboard.
*   **Walk Through an Example:** Pick a small, non-trivial example and trace your code's execution step-by-step with the interviewer. This demonstrates attention to detail and helps catch errors.
*   **Complexity Analysis is Key:** Always provide the time and space complexity of your chosen solution and compare it to alternative approaches.
*   **Code Structure:** Use meaningful variable names, add comments where logic might be complex. Aim for clean, readable code.
*   **Test Cases:** After coding, suggest test cases, including edge cases. This shows thoroughness.
*   **Be Prepared to Implement a Custom Heap:** While Java's `PriorityQueue` is standard, some interviewers might ask you to implement a min-heap from scratch to test your understanding of heapify operations. The `CustomMinHeap.java` in this project is an example.

## 5. Problem Variations

### Kth Largest Element:
*   **Kth Smallest Element:** Use a Max-Heap of size `K`.
*   **Find Median in Data Stream:** Maintain two heaps: a max-heap for the lower half and a min-heap for the upper half, balanced such that their sizes differ by at most 1.
*   **Find elements within a range (e.g., Xth to Yth largest):** Combine sorting with finding Kth element.

### Merge K Sorted Lists:
*   **Merge K Sorted Arrays:** Same logic, just handle arrays instead of linked lists.
*   **Merge intervals:** Can use a min-heap to sort intervals by start time, then merge.
*   **Ugly Number (finding the nth ugly number):** Use a min-heap to generate candidates.

### Top K Frequent Elements:
*   **Top K Frequent Words:** Similar, just count word frequencies instead of integers.
*   **Find elements with frequency greater than N/K:** Use a HashMap, then filter.
*   **Least K Frequent Elements:** Use a Max-Heap of size `K`.
*   **Bottom K frequent elements:** Min-heap where frequency is the key, of size k.

By understanding these concepts and practicing with the provided problems, you will be well-equipped to tackle heap-related questions in your next coding interview.
```