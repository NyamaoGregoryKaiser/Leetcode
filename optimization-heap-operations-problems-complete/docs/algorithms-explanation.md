# Algorithms Explanation: Heap-Based Solutions

This document provides a detailed explanation of the heap-based algorithms used to solve the problems in this project. For each problem, we cover the core idea, algorithm steps, time and space complexity, and illustrative ASCII diagrams.

---

## 1. Kth Largest/Smallest Element in an Array

**Problem:** Find the Kth largest or Kth smallest element in an unsorted array.

### Core Idea

The key insight is that we don't need to sort the entire array. To find the Kth largest element, we only care about the largest `K` elements. A **Min-Heap** of size `K` can efficiently maintain these `K` largest elements. Similarly, for the Kth smallest, a **Max-Heap** of size `K` is used.

### Algorithm: Kth Largest Element (Min-Heap)

1.  **Initialize a Min-Heap:** This heap will store up to `K` elements.
2.  **Iterate through the array `nums`:**
    *   For each `num` in `nums`:
        *   **Insert `num` into the Min-Heap.**
        *   **Check size:** If the heap's `size()` exceeds `K`, remove the smallest element from the heap (`heap.extract()`).
3.  **Result:** After iterating through all elements, the Min-Heap will contain the `K` largest elements from the input array. The smallest element currently in this Min-Heap (i.e., its root, `heap.peek()`) will be the Kth largest element overall.

**Why a Min-Heap for Kth Largest?**
If we want the Kth largest, we want to keep track of *large* numbers. A min-heap allows us to easily discard numbers that are *too small* to be in the top K. If a new number comes in and the heap is already full (size K), and the new number is larger than the current smallest in the heap, it means the new number is now one of the top K, and the old smallest is no longer. By extracting the minimum, we ensure the heap always contains the `K` largest numbers, and the root is the `K`th largest.

### ASCII Diagram (Kth Largest - Min-Heap of size 3 for `[3, 2, 1, 5, 6, 4]`)

```
Initial: minHeap = [] (K=3)

1. Add 3:
   minHeap = [3]

2. Add 2:
   minHeap = [2, 3] (heapify up)

3. Add 1:
   minHeap = [1, 3, 2] (heapify up)

4. Add 5:
   minHeap = [1, 3, 2, 5] (size > K=3)
   Extract 1 (smallest): minHeap = [2, 3, 5] (heapify down)
                        (root: 2)

5. Add 6:
   minHeap = [2, 3, 5, 6] (size > K=3)
   Extract 2 (smallest): minHeap = [3, 5, 6] (heapify down)
                        (root: 3)

6. Add 4:
   minHeap = [3, 5, 6, 4] (size > K=3)
   Extract 3 (smallest): minHeap = [4, 5, 6] (heapify down)
                        (root: 4)

Final: minHeap.peek() = 4. The 3rd largest element is 4.
(Wait, for K=2 and [3,2,1,5,6,4], the 2nd largest is 5. Let's re-trace for K=2)

--- Re-tracing for K=2 and [3, 2, 1, 5, 6, 4] ---

Initial: minHeap = [] (K=2)

1. Add 3:
   minHeap = [3]

2. Add 2:
   minHeap = [2, 3]

3. Add 1:
   minHeap = [1, 3, 2] (size > K=2)
   Extract 1: minHeap = [2, 3]
              (root: 2)

4. Add 5:
   minHeap = [2, 3, 5] (size > K=2)
   Extract 2: minHeap = [3, 5]
              (root: 3)

5. Add 6:
   minHeap = [3, 5, 6] (size > K=2)
   Extract 3: minHeap = [5, 6]
              (root: 5)

6. Add 4:
   minHeap = [4, 6, 5] (size > K=2)
   If new value (4) < root (5), no extract. Oh, my logic in code is `insert` then `extract`.
   The `insert(4)` will result in `[4,5,6]` then `extract()` will remove `4`.
   Let's ensure the `shouldSwap` logic is correct to maintain the min-heap property.
   For `minHeap.insert(4)` when heap is `[5,6]`:
    - `[5,6,4]`
    - `heapifyUp`: 4 swaps with 5. `[4,6,5]`
    - `minHeap.size()` (3) > K (2), so `minHeap.extract()`
    - `extract` removes 4. Heap becomes `[5,6]`
   This seems correct.

Final: minHeap.peek() = 5. The 2nd largest element is 5. This matches the example.

```

### Algorithm: Kth Smallest Element (Max-Heap)

1.  **Initialize a Max-Heap:** This heap will store up to `K` elements.
2.  **Iterate through the array `nums`:**
    *   For each `num` in `nums`:
        *   **Insert `num` into the Max-Heap.**
        *   **Check size:** If the heap's `size()` exceeds `K`, remove the largest element from the heap (`heap.extract()`).
3.  **Result:** After iterating through all elements, the Max-Heap will contain the `K` smallest elements from the input array. The largest element currently in this Max-Heap (i.e., its root, `heap.peek()`) will be the Kth smallest element overall.

**Why a Max-Heap for Kth Smallest?**
Symmetric to the Kth largest, we want to keep track of *small* numbers. A max-heap allows us to easily discard numbers that are *too large* to be in the top K smallest. If a new number comes in and the heap is already full (size K), and the new number is smaller than the current largest in the heap, it means the new number is now one of the top K, and the old largest is no longer. By extracting the maximum, we ensure the heap always contains the `K` smallest numbers, and the root is the `K`th smallest.

### Complexity Analysis

*   **Time Complexity:** O(N log K)
    *   We iterate through all `N` elements in the input array.
    *   For each element, we perform an `insert` and potentially an `extract` operation on the heap.
    *   Both `insert` and `extract` operations take O(log S) time, where `S` is the current size of the heap.
    *   Since the heap size is capped at `K`, each heap operation takes O(log K) time.
    *   Total time: `N * O(log K) = O(N log K)`.
*   **Space Complexity:** O(K)
    *   The heap stores at most `K` elements.

---

## 2. Merge K Sorted Lists

**Problem:** Merge `k` sorted linked lists into one single sorted linked list.

### Core Idea

This problem is a classic application of a **Min-Heap (Priority Queue)**. At any point, we need to know which of the `k` lists has the smallest next element to add to our merged list. A Min-Heap can efficiently provide this minimum element from among the `k` active list heads.

### Algorithm

1.  **Initialize a Min-Heap:** This heap will store `ListNode` objects (or objects containing `val` and `ListNode` reference). The comparison in the heap should be based on the `val` of the `ListNode`.
2.  **Populate the Heap:** Iterate through the array of `k` lists. For each non-null list head, insert it into the Min-Heap.
3.  **Construct Merged List:**
    *   Create a `dummyHead` node (e.g., with value 0) to simplify handling the head of the merged list.
    *   Maintain a `current` pointer, initialized to `dummyHead`.
    *   **While the Min-Heap is not empty:**
        *   **Extract Minimum:** Remove the node with the smallest `val` from the heap (`minHeap.extract()`). Let this be `smallestNode`.
        *   **Append to Result:** Attach `smallestNode` to `current.next`.
        *   **Advance `current`:** Move `current` to `smallestNode` (`current = current.next`).
        *   **Add Next Element (if any):** If `smallestNode` has a `next` node (`smallestNode.next !== null`), insert `smallestNode.next` into the Min-Heap. This ensures that the next element from the list `smallestNode` came from is considered.
4.  **Return Result:** The merged list starts from `dummyHead.next`.

### ASCII Diagram (Merge K Lists with `[1,4,5], [1,3,4], [2,6]`)

```
Initial:
Lists: L1: [1]->[4]->[5]
       L2: [1]->[3]->[4]
       L3: [2]->[6]
minHeap = []
mergedList = dummyHead -> null

1. Populate heap:
   minHeap.insert(L1 head {val: 1, node: L1_node1})
   minHeap.insert(L2 head {val: 1, node: L2_node1})
   minHeap.insert(L3 head {val: 2, node: L3_node1})
   minHeap state (elements might be in different positions, root is always min):
   [ {1, L1_node1}, {1, L2_node1}, {2, L3_node1} ]  (conceptual, heap property based on val)
   Root = {1, L1_node1} (or L2_node1)

2. Loop:
   a. Extract {1, L1_node1}.
      mergedList = dummyHead -> 1
      current = L1_node1
      Insert L1_node1.next ({4, L1_node4}) into heap.
      minHeap = [ {1, L2_node1}, {2, L3_node1}, {4, L1_node4} ]
      Root = {1, L2_node1}

   b. Extract {1, L2_node1}.
      mergedList = dummyHead -> 1 -> 1
      current = L2_node1
      Insert L2_node1.next ({3, L2_node3}) into heap.
      minHeap = [ {2, L3_node1}, {3, L2_node3}, {4, L1_node4} ]
      Root = {2, L3_node1}

   c. Extract {2, L3_node1}.
      mergedList = dummyHead -> 1 -> 1 -> 2
      current = L3_node1
      Insert L3_node1.next ({6, L3_node6}) into heap.
      minHeap = [ {3, L2_node3}, {4, L1_node4}, {6, L3_node6} ]
      Root = {3, L2_node3}

   d. Extract {3, L2_node3}.
      mergedList = dummyHead -> 1 -> 1 -> 2 -> 3
      current = L2_node3
      Insert L2_node3.next ({4, L2_node4}) into heap.
      minHeap = [ {4, L1_node4}, {4, L2_node4}, {6, L3_node6} ]
      Root = {4, L1_node4} (or L2_node4)

   e. Extract {4, L1_node4}.
      mergedList = dummyHead -> 1 -> 1 -> 2 -> 3 -> 4
      current = L1_node4
      Insert L1_node4.next ({5, L1_node5}) into heap.
      minHeap = [ {4, L2_node4}, {5, L1_node5}, {6, L3_node6} ]
      Root = {4, L2_node4}

   f. Extract {4, L2_node4}.
      mergedList = dummyHead -> 1 -> 1 -> 2 -> 3 -> 4 -> 4
      current = L2_node4
      L2_node4.next is null. No new element to add.
      minHeap = [ {5, L1_node5}, {6, L3_node6} ]
      Root = {5, L1_node5}

   g. Extract {5, L1_node5}.
      mergedList = dummyHead -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5
      current = L1_node5
      L1_node5.next is null. No new element to add.
      minHeap = [ {6, L3_node6} ]
      Root = {6, L3_node6}

   h. Extract {6, L3_node6}.
      mergedList = dummyHead -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
      current = L3_node6
      L3_node6.next is null. No new element to add.
      minHeap = []

Loop ends.

Result: `1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6`
```

### Complexity Analysis

*   **Time Complexity:** O(N log K)
    *   `N` is the total number of elements across all `k` lists.
    *   Initially, `k` list heads are inserted into the heap: O(K log K).
    *   Each of the `N` elements is inserted into the heap once and extracted from the heap once.
    *   Heap operations (`insert`, `extract`) take O(log S) time, where `S` is the current heap size.
    *   The heap size is at most `K` (it holds one element from each of the `k` lists).
    *   Therefore, each heap operation takes O(log K) time.
    *   Total time: `N * O(log K) = O(N log K)`.
*   **Space Complexity:** O(K)
    *   The heap stores at most `K` elements (one from each of the `k` lists).

---

## 3. Top K Frequent Elements

**Problem:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.

### Core Idea

This problem involves finding frequencies and then selecting the top `K` based on those frequencies. We can use a hash map to count frequencies and a **Min-Heap** to efficiently maintain the `K` elements with the highest frequencies.

### Algorithm (Map + Min-Heap)

1.  **Count Frequencies:**
    *   Use a `Map<number, number>` (or hash map/dictionary) to store the frequency of each number in `nums`.
    *   Iterate through `nums`, incrementing counts.
    *   Time: O(N), Space: O(M) where `M` is the number of unique elements (up to `N`).
2.  **Build Min-Heap of `[frequency, element]` pairs:**
    *   Initialize a Min-Heap. The heap will store objects like `{ element: number, frequency: number }`.
    *   The comparison logic for the Min-Heap should be based on `frequency` in ascending order. This means the root of the heap will always be the element with the *lowest* frequency among those currently in the heap.
    *   Iterate through the `frequencyMap` (each unique element and its frequency):
        *   **Insert** the `{ element, frequency }` pair into the Min-Heap.
        *   **Check size:** If the heap's `size()` exceeds `K`, remove the root (the element with the smallest frequency) using `minHeap.extract()`.
3.  **Extract Results:**
    *   After processing all unique elements from the frequency map, the Min-Heap will contain exactly `K` elements. These `K` elements will be the `k` most frequent elements overall.
    *   Extract them one by one from the heap (`minHeap.extract()`) and collect their `element` values into a result array.
    *   Time: O(K log K) for extraction. The problem usually doesn't require sorted output.

**Why a Min-Heap?**
We want the *top K* frequent elements. A min-heap, when capped at size `K`, ensures that it always holds the `K` elements that have *currently* been identified as the most frequent. When a new element comes along, if its frequency is higher than the least frequent element currently in the heap (the root), then the new element replaces the least frequent one. This keeps the heap updated with the `K` elements that are most likely to be among the final top `K`.

### ASCII Diagram (Top 2 Frequent for `[1,1,1,2,2,3]`)

```
Initial: nums = [1,1,1,2,2,3], K=2
frequencyMap = {}
minHeap = [] (compares by frequency, min frequency at root)

1. Build frequencyMap:
   frequencyMap: { 1: 3, 2: 2, 3: 1 }

2. Iterate frequencyMap and populate minHeap:

   a. Process {element: 1, frequency: 3}:
      minHeap.insert({1,3}) -> minHeap = [{1,3}]
      size (1) <= K (2).

   b. Process {element: 2, frequency: 2}:
      minHeap.insert({2,2}) -> minHeap = [{2,2}, {1,3}] (heapify up based on frequency)
      size (2) <= K (2).

   c. Process {element: 3, frequency: 1}:
      minHeap.insert({3,1}) -> minHeap = [{3,1}, {1,3}, {2,2}] (heapify up)
      size (3) > K (2).
      minHeap.extract() (removes {3,1} as it has the lowest frequency).
      minHeap = [{2,2}, {1,3}] (heapify down)
      Root = {2,2}

3. Extract results:
   minHeap is not empty.
   a. minHeap.extract() -> {2,2}
      result = [2]
   b. minHeap.extract() -> {1,3}
      result = [2, 1] (or [1,2], order doesn't matter for `expect.arrayContaining`)

Final result: `[2, 1]` (or `[1, 2]`)
```

### Complexity Analysis

*   **Time Complexity:** O(N + M log K)
    *   O(N) to build the frequency map (where `N` is the length of `nums`).
    *   `M` is the number of unique elements in `nums`. In the worst case, `M = N`.
    *   Iterating through the `M` entries of the frequency map: Each involves an `insert` and potentially an `extract` operation on the heap.
    *   Heap operations take O(log S) time, where `S` is the current heap size. Here, `S` is capped at `K`. So, O(log K).
    *   Total time for heap operations: `M * O(log K)`.
    *   Overall: O(N + M log K). In the worst case (all unique elements), this simplifies to O(N log K).
*   **Space Complexity:** O(M + K)
    *   O(M) for the frequency map (stores up to `M` unique elements).
    *   O(K) for the heap (stores up to `K` elements).
    *   Overall: O(N) in the worst case (all elements unique).

---

## 4. Find Median from Data Stream

**Problem:** Design a data structure that supports adding new numbers and finding the median of all numbers added so far.

### Core Idea

The median of a sorted list of numbers is the middle element (if odd count) or the average of the two middle elements (if even count). To maintain this efficiently as new numbers arrive, we can use two heaps:
*   A **Max-Heap** (`maxHeap`): Stores the *smaller half* of the numbers. Its root will be the largest number in the smaller half.
*   A **Min-Heap** (`minHeap`): Stores the *larger half* of the numbers. Its root will be the smallest number in the larger half.

By maintaining these two heaps, we ensure that:
1.  All elements in `maxHeap` are less than or equal to all elements in `minHeap`.
2.  The sizes of the two heaps are balanced, differing by at most 1.
    *   If `total_elements` is odd: `maxHeap.size() == minHeap.size() + 1`. The median is `maxHeap.peek()`.
    *   If `total_elements` is even: `maxHeap.size() == minHeap.size()`. The median is `(maxHeap.peek() + minHeap.peek()) / 2`.

### Algorithm (`addNum` method)

1.  **Initial Placement:** Always add the new number `num` to the `maxHeap`. This keeps `maxHeap` as the primary "recipient" and helps with balancing logic.
2.  **Maintain Heap Property (Order Invariant):**
    *   If `maxHeap.peek()` is greater than `minHeap.peek()` (meaning an element from the "smaller half" is larger than an element from the "larger half"), then move `maxHeap.extract()` to `minHeap.insert()`. This corrects the ordering.
3.  **Maintain Size Balance (Count Invariant):**
    *   If `maxHeap.size()` becomes too large (i.e., `maxHeap.size() > minHeap.size() + 1`), move `maxHeap.extract()` to `minHeap.insert()`.
    *   If `minHeap.size()` becomes larger than `maxHeap.size()` (i.e., `minHeap.size() > maxHeap.size()`), move `minHeap.extract()` to `maxHeap.insert()`.

This balancing ensures that `maxHeap` either has the same number of elements as `minHeap` or exactly one more.

### Algorithm (`findMedian` method)

1.  **Check Sizes:**
    *   If `maxHeap.size() == minHeap.size()`, the total count of numbers is even. The median is `(maxHeap.peek() + minHeap.peek()) / 2`.
    *   If `maxHeap.size() > minHeap.size()`, the total count of numbers is odd. The median is `maxHeap.peek()`. (Since `maxHeap` always takes the extra element if count is odd).

### ASCII Diagram (Adding `[1, 2, 3, 4, 5]`)

```
Initial: maxHeap = [], minHeap = []

1. addNum(1):
   maxHeap.insert(1) -> maxHeap = [1]
   Balance:
     - Order OK: maxHeap.peek() (1) > minHeap.peek() (undefined) is false or handled.
     - Size OK: maxHeap (1), minHeap (0). maxHeap.size() = minHeap.size() + 1.
   State: maxHeap=[1], minHeap=[]
   findMedian() -> 1 (odd count, maxHeap.peek())

2. addNum(2):
   maxHeap.insert(2) -> maxHeap = [2,1] (after heapify up)
   Balance:
     - Order OK: minHeap is empty.
     - Size: maxHeap (2), minHeap (0). maxHeap.size() > minHeap.size() + 1.
     - Move maxHeap.extract() (2) to minHeap.insert() (2).
   State: maxHeap=[1], minHeap=[2]
   findMedian() -> (1+2)/2 = 1.5 (even count)

3. addNum(3):
   maxHeap.insert(3) -> maxHeap = [3,1] (after heapify up), minHeap = [2]
   Balance:
     - Order: maxHeap.peek() (3) > minHeap.peek() (2) -> TRUE.
     - Move maxHeap.extract() (3) to minHeap.insert() (3).
       maxHeap becomes [1], minHeap becomes [2,3]
     - Size: maxHeap (1), minHeap (2). minHeap.size() > maxHeap.size().
     - Move minHeap.extract() (2) to maxHeap.insert() (2).
       maxHeap becomes [2,1], minHeap becomes [3]
   State: maxHeap=[2,1], minHeap=[3]
   findMedian() -> 2 (odd count, maxHeap.peek())

4. addNum(4):
   maxHeap.insert(4) -> maxHeap = [4,1,2], minHeap = [3]
   Balance:
     - Order: maxHeap.peek() (4) > minHeap.peek() (3) -> TRUE.
     - Move maxHeap.extract() (4) to minHeap.insert() (4).
       maxHeap becomes [2,1], minHeap becomes [3,4]
     - Size: maxHeap (2), minHeap (2). Sizes are equal.
   State: maxHeap=[2,1], minHeap=[3,4]
   findMedian() -> (2+3)/2 = 2.5 (even count)

5. addNum(5):
   maxHeap.insert(5) -> maxHeap = [5,1,2], minHeap = [3,4]
   Balance:
     - Order: maxHeap.peek() (5) > minHeap.peek() (3) -> TRUE.
     - Move maxHeap.extract() (5) to minHeap.insert() (5).
       maxHeap becomes [2,1], minHeap becomes [3,4,5]
     - Size: maxHeap (2), minHeap (3). minHeap.size() > maxHeap.size().
     - Move minHeap.extract() (3) to maxHeap.insert() (3).
       maxHeap becomes [3,1,2], minHeap becomes [4,5]
   State: maxHeap=[3,1,2], minHeap=[4,5]
   findMedian() -> 3 (odd count, maxHeap.peek())

Final state:
maxHeap (smaller half): `[3, 1, 2]` (ordered as max-heap, root 3)
minHeap (larger half): `[4, 5]` (ordered as min-heap, root 4)
Median is `maxHeap.peek()` = 3.
```

### Complexity Analysis

*   **`addNum` method:**
    *   **Time Complexity:** O(log N)
        *   Each `addNum` operation involves at most two heap insertions and two heap extractions.
        *   Heap operations on a heap of size `S` take O(log S) time.
        *   Since the total number of elements `N` is distributed between the two heaps, each heap will have a size of approximately `N/2`.
        *   Therefore, each heap operation takes O(log(N/2)) which simplifies to O(log N).
    *   **Space Complexity:** O(N)
        *   Both heaps together store all `N` numbers added to the data structure.
*   **`findMedian` method:**
    *   **Time Complexity:** O(1)
        *   Peeking at the root of a heap is an O(1) operation.
    *   **Space Complexity:** O(1)
        *   No additional space is used beyond the heaps themselves.

---

## Conclusion

Heaps are powerful tools for problems requiring efficient access to the minimum or maximum element, or maintaining order dynamically. Understanding these core patterns and their complexity is crucial for success in coding interviews. The solutions provided in this project demonstrate these optimal heap-based approaches.