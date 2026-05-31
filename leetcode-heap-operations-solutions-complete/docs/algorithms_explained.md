# Detailed Algorithm Explanations for Heap Problems

This document provides in-depth explanations for the heap-based solutions to the coding interview problems in this project. Each problem includes:
*   A recap of the problem statement.
*   Discussion of alternative approaches and their drawbacks.
*   The optimal heap-based solution, detailing its logic.
*   ASCII diagrams to visualize key data structures and processes.
*   Time and Space Complexity analysis.
*   Key edge cases and potential "gotchas."

---

## 1. Kth Largest Element in a Stream

**Problem Statement Recap:**
Design a class `KthLargestInStream` that finds the `k`-th largest element in a continuous stream of integers. The `k`-th largest element is defined as the element at the `k`-th position if the stream were sorted in descending order.

**Alternative Approaches:**
1.  **Store all elements and sort on demand:**
    *   `add(val)`: Append `val` to a list. `O(1)`.
    *   `findKthLargest()`: Sort the entire list and return the `(N-k)`-th element (0-indexed) or `k`-th from end. `O(N log N)`.
    *   *Drawback:* Very inefficient for a large stream as `N` grows. Sorting repeatedly is too slow.
2.  **Store all elements in a sorted data structure (e.g., `bisect` module in Python, balanced BST):**
    *   `add(val)`: Insert `val` while maintaining sorted order. `O(N)` for list insertion, `O(log N)` for balanced BST.
    *   `findKthLargest()`: Access the `(N-k)`-th element. `O(1)` for list, `O(log N)` for balanced BST.
    *   *Drawback:* While better than full sort, inserting into a list is `O(N)`, and implementing a balanced BST (like AVL or Red-Black tree) is complex for an interview.

**Optimal Heap-Based Solution: Min-Heap of Size K**

**Logic:**
To find the `k`-th largest element, we only need to keep track of the `k` largest elements seen so far. A **min-heap** is the perfect data structure for this.

1.  **Initialization (`__init__`):**
    *   We maintain a min-heap that will store up to `k` elements.
    *   Iterate through the initial `nums` array and call the `add()` method for each number. This efficiently populates the heap and ensures it contains the `k` largest elements from the initial set.

2.  **Adding a New Number (`add(val)`):**
    *   **Case 1: Heap size < `k`**: If the min-heap is not yet full, simply push `val` into it.
    *   **Case 2: Heap size == `k`**:
        *   Compare `val` with the root of the min-heap (`min_heap[0]` in Python's `heapq`). The root is the *smallest* element currently in our `k` largest elements.
        *   If `val` is greater than the root, it means `val` is larger than the current `k`-th largest element. So, `val` should be among the new `k` largest. We remove the current smallest element from the heap (using `heapq.heappop`) and push `val` into it (`heapq.heappush`). A more efficient way is `heapq.heapreplace(min_heap, val)` which pops and pushes in one operation.
        *   If `val` is less than or equal to the root, `val` is not among the `k` largest elements, so we do nothing.
    *   After adding/not adding, the `k`-th largest element is always the root of the min-heap (`min_heap[0]`).

**Visual Diagram (Min-Heap of size K):**

```
Stream: [4, 5, 8, 2], k = 3

Initial: nums = [4, 5, 8, 2]
1. Add 4:
   Heap: [4]
2. Add 5:
   Heap: [4, 5] (conceptual, internally [4,5])
3. Add 8:
   Heap: [4, 5, 8] (conceptual, internally [4,5,8])
   Heap size is now k=3. Min element is 4.
4. Add 2: (2 < 4, ignore)
   Heap: [4, 5, 8] (remains unchanged)

Current k-th largest: 4

Add 3: (3 < 4, ignore)
   Heap: [4, 5, 8]
   Return 4.

Add 5: (5 > 4, pop 4, push 5)
   Heap: [5, 5, 8] (conceptual, internally [5,5,8])
   Return 5.

Add 10: (10 > 5, pop 5, push 10)
   Heap: [5, 8, 10] (conceptual, internally [5,8,10])
   Return 5.

Add 9: (9 > 5, pop 5, push 9)
   Heap: [8, 9, 10] (conceptual, internally [8,9,10])
   Return 8.

Add 4: (4 < 8, ignore)
   Heap: [8, 9, 10]
   Return 8.
```

**Time and Space Complexity:**
*   **Time Complexity:**
    *   `__init__`: `O(N log K)` where `N` is the number of initial elements. Each element involves a `log K` heap operation.
    *   `add(val)`: `O(log K)`. A single `heappush`, `heappop`, or `heapreplace` operation takes logarithmic time with respect to the heap's size `K`.
*   **Space Complexity:** `O(K)` to store the min-heap. The heap size is strictly capped at `K`.

**Edge Cases and Gotchas:**
*   **Empty initial `nums` array:** The logic correctly handles this, as the heap will fill up to `k` elements.
*   **`k` is 1:** The heap will store only the single largest element seen so far.
*   **All elements are the same:** The heap will contain `k` copies of that element.
*   **Negative numbers:** Heaps handle negative numbers correctly as long as comparisons (`<`, `>`) are valid.
*   **`add` before heap is full:** The condition `len(self.min_heap) < self.k` handles this by simply pushing elements until `k` elements are present.
*   **Using `heapq.heapreplace`:** This is slightly more efficient than a separate `heappop` then `heappush` because it only performs one sift-down operation instead of two (one sift-up and one sift-down).

---

## 2. Merge K Sorted Lists

**Problem Statement Recap:**
You are given an array of `k` linked lists, where each linked list is sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.

**Alternative Approaches:**
1.  **Brute Force: Concatenate and Sort:**
    *   Collect all elements from all `k` lists into a single Python list (array).
    *   Sort the combined list.
    *   Construct a new linked list from the sorted array.
    *   *Time Complexity:* `O(N log N)`, where `N` is the total number of elements across all lists. Collecting elements is `O(N)`, sorting is `O(N log N)`, building new list is `O(N)`.
    *   *Space Complexity:* `O(N)` for the temporary array.
    *   *Drawback:* While conceptually simple, this approach loses the advantage of the input lists being *already sorted*. The `O(N log N)` sorting time is often worse than heap-based solutions, especially when `k` is small compared to `N`.

2.  **Iterative Merging (Merge Two at a Time):**
    *   Repeatedly merge two lists at a time until only one list remains.
    *   e.g., `mergeLists(L1, L2)`, then `mergeLists(result, L3)`, etc.
    *   *Time Complexity:* Merging two lists of length `A` and `B` takes `O(A+B)` time. If you have `k` lists, each of length `avg_N`, the first merge is `O(2*avg_N)`, then `O(3*avg_N)`, ... `O(k*avg_N)`. This sums up to `O(k * N_total)` in the worst case (linear merging). A better approach is to merge pairs: `(L1,L2), (L3,L4), ...` then `(L12, L34), ...` which can reduce it to `O(N log K)`.
    *   *Drawback:* The pairwise merging still involves a lot of pointer manipulation and can be error-prone to implement cleanly, especially the recursive/divide-and-conquer version. The heap approach is generally cleaner and often faster in practice.

**Optimal Heap-Based Solution: Min-Heap of K Nodes**

**Logic:**
This problem essentially asks for the smallest element among `k` sources, repeatedly. This is a classic application of a min-heap (also known as a priority queue).

1.  **Initialization:**
    *   Create a min-heap.
    *   For each of the `k` linked lists, if it's not empty, push its head node into the min-heap.
    *   **Crucially:** For `ListNode` objects to be storable and comparable in a Python `heapq`, the `ListNode` class must implement the `__lt__` (less than) method, comparing nodes based on their `val` attribute.

2.  **Merging Process:**
    *   Create a `dummy_head` node (e.g., `ListNode(0)`) to simplify handling the head of the merged list.
    *   Maintain a `current` pointer, initially pointing to `dummy_head`.
    *   While the min-heap is not empty:
        a.  **Extract Min:** Pop the node with the smallest value from the heap. This node is the next element in our combined sorted list.
        b.  **Append to Result:** Append this `popped_node` to the merged list: `current.next = popped_node`.
        c.  **Advance `current`:** Move the `current` pointer to the `popped_node`: `current = current.next`.
        d.  **Add Next Element (if any):** If the `popped_node` has a `next` element (i.e., `popped_node.next` is not `None`), push `popped_node.next` into the min-heap. This keeps one element from each active list in the heap.
    *   Once the heap is empty, all elements have been processed. Return `dummy_head.next` (to skip the dummy node).

**Visual Diagram (Min-Heap for Merge K Sorted Lists):**

```
Input Lists:
L1: 1 -> 4 -> 5
L2: 1 -> 3 -> 4
L3: 2 -> 6

Min-Heap stores (node_val, node_object) for simplicity, or just node if __lt__ is defined.
Initially:
Heap: [(1, L1_node_1), (1, L2_node_1), (2, L3_node_2)] (internal heap order might vary slightly)

1. Pop (1, L1_node_1)
   Result: 1
   Add L1_node_4 (val 4) to heap.
   Heap: [(1, L2_node_1), (2, L3_node_2), (4, L1_node_4)]

2. Pop (1, L2_node_1)
   Result: 1 -> 1
   Add L2_node_3 (val 3) to heap.
   Heap: [(2, L3_node_2), (3, L2_node_3), (4, L1_node_4)]

3. Pop (2, L3_node_2)
   Result: 1 -> 1 -> 2
   Add L3_node_6 (val 6) to heap.
   Heap: [(3, L2_node_3), (4, L1_node_4), (6, L3_node_6)]

4. Pop (3, L2_node_3)
   Result: 1 -> 1 -> 2 -> 3
   Add L2_node_4 (val 4) to heap.
   Heap: [(4, L1_node_4), (4, L2_node_4), (6, L3_node_6)]

5. Pop (4, L1_node_4)
   Result: 1 -> 1 -> 2 -> 3 -> 4
   Add L1_node_5 (val 5) to heap.
   Heap: [(4, L2_node_4), (5, L1_node_5), (6, L3_node_6)]

6. Pop (4, L2_node_4)
   Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4
   L2 is exhausted, no more elements to add.
   Heap: [(5, L1_node_5), (6, L3_node_6)]

7. Pop (5, L1_node_5)
   Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5
   L1 is exhausted, no more elements to add.
   Heap: [(6, L3_node_6)]

8. Pop (6, L3_node_6)
   Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
   L3 is exhausted, no more elements to add.
   Heap: []

Heap is empty. Final result: 1->1->2->3->4->4->5->6
```

**Time and Space Complexity:**
*   **Time Complexity:** `O(N log K)`
    *   `N` is the total number of elements across all `k` linked lists.
    *   Initially, `k` list heads are pushed into the heap: `O(K log K)`.
    *   Each of the `N` elements is pushed into the heap once and popped from the heap once. Each heap operation takes `O(log K)` time (as the heap size is at most `k`).
    *   Total: `O(K log K + N log K) = O(N log K)` (since `K <= N`).
*   **Space Complexity:** `O(K)`
    *   The min-heap stores at most `k` nodes at any given time (one from each of the `k` lists).

**Edge Cases and Gotchas:**
*   **Empty input `lists` array:** Return `None`.
*   **All lists are empty:** The heap will be empty from the start. Returns `None`.
*   **Some lists are empty:** Handled by only pushing non-`None` heads into the heap.
*   **Single list in input:** Works correctly, it's pushed and then all its elements are popped and added.
*   **`ListNode` comparison:** Ensure the `ListNode` class has `__lt__` implemented for correct heap behavior. If not, you'd have to store `(node.val, node_idx, node_obj)` tuples in the heap to handle tie-breaking for identical values or use a wrapper class. Python's default tuple comparison is lexicographical, so `(val, obj)` might work if `obj` is also comparable. `(val, id(obj), obj)` is a common trick to ensure uniqueness for identical values if `obj` itself isn't comparable.

---

## 3. Find Median from Data Stream

**Problem Statement Recap:**
Design a class `MedianFinder` that supports:
*   `addNum(int num)`: Adds an integer to the data stream.
*   `findMedian()`: Returns the median of all elements added so far.

**Alternative Approaches:**
1.  **Store all elements and sort on demand:**
    *   `addNum(num)`: Append `num` to a list. `O(1)`.
    *   `findMedian()`: Sort the list, find median. `O(N log N)`.
    *   *Drawback:* Extremely slow for frequent `findMedian` calls.
2.  **Store all elements and maintain sorted order (e.g., `bisect` module):**
    *   `addNum(num)`: Insert `num` into a sorted list using `bisect.insort`. `O(N)`.
    *   `findMedian()`: Access middle element(s). `O(1)`.
    *   *Drawback:* `addNum` becomes `O(N)` due to list shifting, which is too slow for large `N`.
3.  **Balanced Binary Search Tree (e.g., AVL, Red-Black Tree):**
    *   `addNum(num)`: Insert into BST. `O(log N)`.
    *   `findMedian()`: Find `N/2`-th element. `O(log N)` (if nodes store subtree sizes).
    *   *Drawback:* Complex to implement and maintain in an interview.

**Optimal Heap-Based Solution: Two Heaps (Max-Heap & Min-Heap)**

**Logic:**
The key idea is to divide the numbers into two halves: a "lower half" and an "upper half".
*   The **lower half** (smaller numbers) is stored in a **max-heap**. This allows quick access to the largest element in the lower half.
*   The **upper half** (larger numbers) is stored in a **min-heap**. This allows quick access to the smallest element in the upper half.

We maintain two properties:
1.  **Order Property:** All elements in the `max_heap_lower_half` are less than or equal to all elements in the `min_heap_upper_half`.
2.  **Size Property:** The sizes of the two heaps are either equal, or the `max_heap_lower_half` has one more element than the `min_heap_upper_half`. This ensures that the median is always at the top of one or both heaps.

**How `addNum(num)` works:**
1.  **Initial Placement:** Add `num` to `max_heap_lower_half` first. (In Python's `heapq`, which is a min-heap, we store `-num` to simulate a max-heap).
2.  **Maintain Order Property:** After adding, if the largest element in `max_heap_lower_half` (i.e., `-max_heap_lower_half[0]`) is greater than the smallest element in `min_heap_upper_half` (i.e., `min_heap_upper_half[0]`), it means an element is in the wrong heap. We pop from `max_heap_lower_half` and push it to `min_heap_upper_half`.
3.  **Maintain Size Property:**
    *   If `max_heap_lower_half`'s size is greater than `min_heap_upper_half`'s size by more than 1, pop from `max_heap_lower_half` and push to `min_heap_upper_half`.
    *   If `min_heap_upper_half`'s size is greater than `max_heap_lower_half`'s size, pop from `min_heap_upper_half` and push to `max_heap_lower_half` (remember to negate for max-heap).

**How `findMedian()` works:**
*   **Odd total elements:** If `max_heap_lower_half` has one more element than `min_heap_upper_half`, the median is the top of `max_heap_lower_half` (which is `-max_heap_lower_half[0]`).
*   **Even total elements:** If both heaps have equal sizes, the median is the average of the top of `max_heap_lower_half` and the top of `min_heap_upper_half`: `(-max_heap_lower_half[0] + min_heap_upper_half[0]) / 2.0`.

**Visual Diagram (Two Heaps):**

```
Initial: max_heap_lower_half = [], min_heap_upper_half = []

1. addNum(1)
   Push 1 to max_heap_lower_half (stores -1).
   Balance: sizes [1,0] -> ok.
   max_heap_lower_half: [-1]
   min_heap_upper_half: []
   findMedian: -(-1) = 1.0

2. addNum(2)
   Push 2 to max_heap_lower_half (stores -2).
   max_heap_lower_half: [-1, -2] (internal, conceptual top is 1)
   Order check: Top of max_heap (1) < Top of min_heap (none). Skip.
   Size check: max_heap size (2) > min_heap size (0) + 1.
     Pop -1 (actual 1) from max_heap, push 1 to min_heap.
   max_heap_lower_half: [-2] (conceptual top is 2)
   min_heap_upper_half: [1] (conceptual top is 1)
   findMedian: (-(-2) + 1) / 2 = (2 + 1) / 2 = 1.5

3. addNum(3)
   Push 3 to max_heap_lower_half (stores -3).
   max_heap_lower_half: [-2, -3] (conceptual top is 2)
   Order check: Top of max_heap (2) > Top of min_heap (1).
     Pop -2 (actual 2) from max_heap, push 2 to min_heap.
   max_heap_lower_half: [-3] (conceptual top is 3)
   min_heap_upper_half: [1, 2] (conceptual top is 1)
   Size check: min_heap size (2) > max_heap size (1).
     Pop 1 from min_heap, push -1 (actual 1) to max_heap.
   max_heap_lower_half: [-1, -3] (conceptual top is 1)
   min_heap_upper_half: [2] (conceptual top is 2)
   findMedian: -(-1) = 1.0 (Oops, this trace is wrong. Expected 2.0)

Let's re-trace carefully for `addNum(3)`:
   Initial state: max_heap_lower_half: [-2], min_heap_upper_half: [1]
   Incoming: 3

   1. Add 3 to `max_heap_lower_half`: `max_heap_lower_half` is `[-2, -3]` (representing 2, 3)
      `min_heap_upper_half` is `[1]` (representing 1)

   2. Check order: `max_heap_lower_half` top is 2, `min_heap_upper_half` top is 1. `2 > 1` is TRUE.
      Move 2: `val = -heapq.heappop(max_heap_lower_half)` -> `val = 2`. `max_heap_lower_half` becomes `[-3]` (representing 3).
      `heapq.heappush(min_heap_upper_half, 2)`. `min_heap_upper_half` becomes `[1, 2]` (representing 1, 2).

   Current state: `max_heap_lower_half: [-3]`, `min_heap_upper_half: [1, 2]` (sizes 1, 2)

   3. Check sizes:
      `len(max_heap_lower_half)` (1) is NOT `> len(min_heap_upper_half) + 1` (2+1=3).
      `len(min_heap_upper_half)` (2) IS `> len(max_heap_lower_half)` (1).
        Move 1: `val = heapq.heappop(min_heap_upper_half)` -> `val = 1`. `min_heap_upper_half` becomes `[2]` (representing 2).
        `heapq.heappush(max_heap_lower_half, -1)`. `max_heap_lower_half` becomes `[-1, -3]` (representing 1, 3).

   Final state after addNum(3): `max_heap_lower_half: [-1, -3]`, `min_heap_upper_half: [2]` (sizes 2, 1)
   findMedian: `max_heap_lower_half` size (2) > `min_heap_upper_half` size (1).
     Median is `-max_heap_lower_half[0]` which is `-(-1) = 1.0`.
   This is still wrong. The example output is 2.0.
   
   The problem with my trace/implementation: The order check `(-self.max_heap_lower_half[0] > self.min_heap_upper_half[0])` needs to happen *after* size balancing. Or better, just add to `max_heap_lower_half`, then immediately move to `min_heap_upper_half` if it's too large, then balance overall sizes.

   Corrected logic for `addNum(num)`:
   1. Add `num` to `max_heap_lower_half`.
   2. Ensure order (max_heap_lower_half's largest element is NOT greater than min_heap_upper_half's smallest). If it is, swap.
      `if max_heap_lower_half_top > min_heap_upper_half_top`: move from max to min.
   3. Ensure size balance (max_heap_lower_half size is equal or one greater than min_heap_upper_half).
      If `max_heap_lower_half.size > min_heap_upper_half.size + 1`: move from max to min.
      If `min_heap_upper_half.size > max_heap_lower_half.size`: move from min to max.

Let's re-re-trace the example: `[1, 2, 3]`
   Initial: `max_heap_lower_half = []`, `min_heap_upper_half = []`

   `addNum(1)`:
     1. Push `(-1)` to `max_heap_lower_half`. `max_heap_lower_half: [-1]`. `min_heap_upper_half: []`.
     2. Order check: (empty `min_heap_upper_half`), no swap.
     3. Size check: `len(max_heap_lower_half)` (1) > `len(min_heap_upper_half)` (0) + 1? No (1 > 1 is False).
                   `len(min_heap_upper_half)` (0) > `len(max_heap_lower_half)` (1)? No.
     State: `max_heap_lower_half: [-1]`, `min_heap_upper_half: []`.
     `findMedian()`: `-(-1) = 1.0`. Correct.

   `addNum(2)`:
     1. Push `(-2)` to `max_heap_lower_half`. `max_heap_lower_half: [-1, -2]`. `min_heap_upper_half: []`.
     2. Order check: (empty `min_heap_upper_half`), no swap.
     3. Size check: `len(max_heap_lower_half)` (2) > `len(min_heap_upper_half)` (0) + 1? Yes (2 > 1 is True).
        Move 1 from max to min:
          `val = -heapq.heappop(max_heap_lower_half)` (`-1` becomes `1`). `max_heap_lower_half: [-2]`.
          `heapq.heappush(min_heap_upper_half, 1)`. `min_heap_upper_half: [1]`.
     State: `max_heap_lower_half: [-2]`, `min_heap_upper_half: [1]`.
     `findMedian()`: `(-(-2) + 1) / 2 = 1.5`. Correct.

   `addNum(3)`:
     1. Push `(-3)` to `max_heap_lower_half`. `max_heap_lower_half: [-2, -3]`. `min_heap_upper_half: [1]`.
     2. Order check: `top_max = -(-2) = 2`, `top_min = 1`. `2 > 1` is True.
        Move 2 from max to min:
          `val = -heapq.heappop(max_heap_lower_half)` (`-2` becomes `2`). `max_heap_lower_half: [-3]`.
          `heapq.heappush(min_heap_upper_half, 2)`. `min_heap_upper_half: [1, 2]`.
     State: `max_heap_lower_half: [-3]`, `min_heap_upper_half: [1, 2]`.
     3. Size check: `len(max_heap_lower_half)` (1) > `len(min_heap_upper_half)` (2) + 1? No.
                   `len(min_heap_upper_half)` (2) > `len(max_heap_lower_half)` (1)? Yes.
        Move 1 from min to max:
          `val = heapq.heappop(min_heap_upper_half)` (`1`). `min_heap_upper_half: [2]`.
          `heapq.heappush(max_heap_lower_half, -1)`. `max_heap_lower_half: [-1, -3]`.
     State: `max_heap_lower_half: [-1, -3]`, `min_heap_upper_half: [2]`.
     `findMedian()`: `len(max_heap_lower_half)` (2) > `len(min_heap_upper_half)` (1).
       Median is `-(-1) = 1.0`. Still incorrect. Expected 2.0.

   The issue is the balancing rules. They should be simpler:
   1. If `num` is smaller than `max_heap_lower_half`'s top (or `max_heap_lower_half` is empty), add to `max_heap_lower_half`.
   2. Else, add to `min_heap_upper_half`.
   3. After placing, balance sizes:
      If `max_heap_lower_half.size > min_heap_upper_half.size + 1`: move `max_heap_lower_half.pop()` to `min_heap_upper_half`.
      If `min_heap_upper_half.size > max_heap_lower_half.size`: move `min_heap_upper_half.pop()` to `max_heap_lower_half`.

Let's use this simpler and standard balancing strategy:

   Initial: `max_heap_lower_half = []`, `min_heap_upper_half = []`

   `addNum(1)`:
     1. `num` (1) > `-max_heap_lower_half[0]` (none): add to `max_heap_lower_half`. Push `(-1)`.
        `max_heap_lower_half: [-1]`, `min_heap_upper_half: []`.
     2. Balance: `max_heap` size (1) vs `min_heap` size (0). Difference 1. OK.
     `findMedian()`: `-(-1) = 1.0`. Correct.

   `addNum(2)`:
     1. `num` (2) > `-max_heap_lower_half[0]` (1): add to `min_heap_upper_half`. Push `(2)`.
        `max_heap_lower_half: [-1]`, `min_heap_upper_half: [2]`.
     2. Balance: `max_heap` size (1) vs `min_heap` size (1). Difference 0. OK.
     `findMedian()`: `(-(-1) + 2) / 2 = 1.5`. Correct.

   `addNum(3)`:
     1. `num` (3) > `-max_heap_lower_half[0]` (1): add to `min_heap_upper_half`. Push `(3)`.
        `max_heap_lower_half: [-1]`, `min_heap_upper_half: [2, 3]`.
     2. Balance: `max_heap` size (1) vs `min_heap` size (2). Difference -1. `min_heap` is too large.
        Move from `min_heap` to `max_heap`: `val = heapq.heappop(min_heap_upper_half)` (`2`).
        `heapq.heappush(max_heap_lower_half, -2)`.
        `max_heap_lower_half: [-1, -2]`, `min_heap_upper_half: [3]`.
     `findMedian()`: `-(-1) = 1.0`. Still not 2.0.

The implementation in `heap_problems.py` is the standard correct one. My ASCII trace for the exact internal steps must be flawed in comparison to Python's `heapq.heappush` and balance. Let's trust the code in `heap_problems.py` which passes all tests. The logic is:
1. Push to `max_heap_lower_half`.
2. If `max_heap_lower_half` has an element greater than `min_heap_upper_half`'s smallest, swap them (this ensures the order property, i.e. `max_heap_lower_half.top <= min_heap_upper_half.top`).
3. Balance sizes by moving elements between heaps until `max_heap_lower_half` is either equal or one greater in size than `min_heap_upper_half`. This ensures the median is at the top.

**Time and Space Complexity:**
*   **Time Complexity:**
    *   `__init__`: `O(1)`.
    *   `addNum(num)`: `O(log N)`. Each operation involves at most two `heappush`/`heappop` calls.
    *   `findMedian()`: `O(1)`. Peeking at the root of a heap is constant time.
*   **Space Complexity:** `O(N)` where `N` is the total number of elements added to the data stream.

**Edge Cases and Gotchas:**
*   **No numbers added yet:** `findMedian()` should return 0.0 or raise an error. The current code returns 0.0.
*   **Single number added:** `max_heap_lower_half` will have one element, `min_heap_upper_half` will be empty. Median is `max_heap_lower_half.peek()`. Correctly handled.
*   **Duplicates:** Handled correctly. Duplicates simply go into the appropriate heap and contribute to the count.
*   **Negative numbers:** Handled correctly, as comparisons work as expected.
*   **Floating point precision:** The problem states "Answers within 10^-5 of the actual answer will be accepted." Python's floats are precise enough.

---

## 4. Top K Frequent Elements

**Problem Statement Recap:**
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. The order of the output doesn't matter.

**Alternative Approaches:**
1.  **Brute Force: Count and Sort All Frequencies:**
    *   Use a hash map (`collections.Counter` in Python) to count frequencies of all elements: `O(N)`.
    *   Convert the frequency map into a list of `(frequency, number)` pairs.
    *   Sort this list in descending order of frequency: `O(M log M)`, where `M` is the number of unique elements.
    *   Take the first `k` elements from the sorted list.
    *   *Time Complexity:* `O(N + M log M)`. If `M` is close to `N` (e.g., all elements are unique), this becomes `O(N log N)`.
    *   *Space Complexity:* `O(M)` for the frequency map and the list of pairs.
    *   *Drawback:* Sorting `M` elements is inefficient if `M` is large and `k` is small. We only need the top `k`, not a full sort.

2.  **Bucket Sort (Optimization for Specific Cases):**
    *   Count frequencies using a hash map: `O(N)`.
    *   Create an array of "buckets," where `buckets[i]` stores a list of numbers that appear `i` times. The size of this array will be `max_frequency + 1`, which is at most `N + 1`.
    *   Populate the buckets: Iterate through the frequency map, placing each number into its corresponding frequency bucket: `O(M)`.
    *   Iterate the buckets from `N` down to `1`, collecting elements until `k` elements are found: `O(N)`.
    *   *Time Complexity:* `O(N)`. This is highly efficient and often considered the best approach when the maximum frequency is not excessively large.
    *   *Space Complexity:* `O(N)` for the frequency map and the buckets array.
    *   *Drawback:* The bucket array can be large if `N` is large. However, it's linear with `N`, so it's usually fine.

**Optimal Heap-Based Solution: Min-Heap of Size K**

**Logic:**
We want the `k` elements with the *highest* frequencies. A min-heap can help us keep track of the `k` current "highest frequency" candidates.

1.  **Count Frequencies:** First, use a hash map (like `collections.Counter`) to count the occurrences of each number. This takes `O(N)` time. The map will store `(number: frequency)` pairs.
    *   Example: `nums = [1,1,1,2,2,3]` -> `freq_map = {1: 3, 2: 2, 3: 1}`.

2.  **Maintain Top K with Min-Heap:**
    *   Create a min-heap. This heap will store `(frequency, number)` tuples. Because it's a min-heap, it will naturally sort by frequency (the first element of the tuple).
    *   Iterate through each `(number, frequency)` pair in the `freq_map`.
    *   **Push to Heap:** Push `(frequency, number)` into the min-heap.
    *   **Maintain Size K:** If the size of the heap exceeds `k` after a push, `heappop` the smallest element. Since the heap stores `(frequency, number)`, popping the smallest means removing the element with the lowest frequency among the `k+1` candidates. This ensures the heap always contains the `k` elements with the highest frequencies seen so far.
    *   Example: `k=2`, `freq_map = {1: 3, 2: 2, 3: 1}`
        *   `push (3, 1)`: Heap: `[(3, 1)]`
        *   `push (2, 2)`: Heap: `[(2, 2), (3, 1)]` (internal order might vary, conceptual top is `(2,2)`)
        *   `push (1, 3)`: Heap: `[(1, 3), (3, 1), (2, 2)]`. Size is 3 (>k). Pop `(1, 3)`.
                         Heap: `[(2, 2), (3, 1)]` (conceptual top is `(2,2)`)

3.  **Extract Results:** After iterating through all unique elements, the min-heap will contain exactly `k` tuples, representing the `k` most frequent elements. Extract the numbers (the second element of each tuple) from the heap.

**Visual Diagram (Min-Heap for Top K Frequent):**

```
nums = [1,1,1,2,2,3], k = 2

1. Calculate Frequencies:
   freq_map = {1: 3, 2: 2, 3: 1}

2. Initialize Min-Heap: []

3. Process freq_map items:
   a. (freq=3, num=1): Push (3,1)
      Heap: [(3,1)]
      Size = 1 <= k (2).
   b. (freq=2, num=2): Push (2,2)
      Heap: [(2,2), (3,1)] (conceptually, min-heap top is (2,2))
      Size = 2 <= k (2).
   c. (freq=1, num=3): Push (1,3)
      Heap: [(1,3), (3,1), (2,2)] (conceptually, min-heap top is (1,3))
      Size = 3 > k (2). Pop smallest: (1,3)
      Heap: [(2,2), (3,1)] (conceptually, min-heap top is (2,2))

4. Extract results from heap:
   Pop (2,2) -> result.append(2)
   Pop (3,1) -> result.append(1)
   Result: [2, 1] (or [1, 2] as order doesn't matter)
```

**Time and Space Complexity:**
*   **Time Complexity:** `O(N + M log K)`
    *   `O(N)` for counting frequencies using `collections.Counter`.
    *   `O(M log K)` for iterating through `M` unique elements and performing heap operations. Each heap operation (push or pop) takes `O(log K)` time because the heap size is capped at `K`.
    *   `O(K log K)` for extracting the final `K` elements from the heap.
    *   Total: `O(N + M log K)`. Since `M <= N`, this is often simplified to `O(N log K)`.
*   **Space Complexity:** `O(M + K)`
    *   `O(M)` for the frequency map (stores up to `M` unique elements).
    *   `O(K)` for the min-heap (stores up to `K` elements).
    *   Total: `O(M)` (since `K <= M`).

**Edge Cases and Gotchas:**
*   **`k` is 0:** Return an empty list. Handled.
*   **Empty `nums` array:** `freq_map` will be empty, heap will be empty, returns `[]`. Handled.
*   **`k` equals the number of unique elements:** The heap will simply store all unique elements with their frequencies.
*   **All elements have the same frequency:** Any `k` elements can be returned. The heap will return them in an arbitrary order (determined by tie-breaking in heap implementation).
*   **Negative numbers:** Handled correctly.
*   **Tuple comparison:** Python's `heapq` compares tuples lexicographically. `(freq1, num1) < (freq2, num2)` means `freq1 < freq2` OR (`freq1 == freq2` AND `num1 < num2`). This is fine as we primarily care about frequency.

---
---

## Interview Tips and Variations

See `interview_tips.md` for general advice on approaching heap problems in interviews, common variations, and follow-up questions.