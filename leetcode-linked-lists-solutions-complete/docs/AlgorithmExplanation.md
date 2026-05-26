```markdown
# Algorithm Explanations for Linked List Problems

This document provides detailed explanations, ASCII art diagrams, and discussions of edge cases for the optimal solutions implemented in `src/main/java/com/example/linkedlist/Problems.java`.

---

## 1. Reorder List (L0 -> Ln -> L1 -> Ln-1 -> ...)

**Problem Description:**
Given a singly linked list L: L0 -> L1 -> ... -> Ln-1 -> Ln, reorder it to: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ... You may not modify the values in the list's nodes. Only nodes themselves may be changed.

**Optimal Approach: Find Middle, Reverse Second Half, Merge**

This problem can be broken down into three main steps, each of which is a common linked list operation:

### Step 1: Find the Middle of the Linked List

We use the "fast and slow pointers" technique.
*   Initialize `slow` and `fast` pointers to the `head` of the list.
*   `slow` moves one step at a time (`slow = slow.next`).
*   `fast` moves two steps at a time (`fast = fast.next.next`).
*   When `fast` reaches the end of the list (or `fast.next` is null), `slow` will be at the middle.

**Diagram (Even Length):**
```
1 -> 2 -> 3 -> 4 -> null
^         ^
slow      fast

       1 -> 2 -> 3 -> 4 -> null
            ^         ^
            slow      fast (fast.next is null, loop ends)

Middle = 2 (slow pointer)
```

**Diagram (Odd Length):**
```
1 -> 2 -> 3 -> 4 -> 5 -> null
^         ^
slow      fast

       1 -> 2 -> 3 -> 4 -> 5 -> null
            ^              ^
            slow           fast (fast.next.next is null, loop ends)

Middle = 3 (slow pointer)
```

### Step 2: Split the List and Reverse the Second Half

1.  **Split:** Once `slow` is at the middle, we cut the link to form two separate lists. The first list goes from `head` to `slow`. The second list starts from `slow.next`.
    *   `firstHalfHead = head`
    *   `secondHalfHead = slow.next`
    *   `slow.next = null` (This is crucial to terminate the first half)

2.  **Reverse:** Reverse the `secondHalfHead` list. This is a classic linked list reversal.
    *   Iteratively traverse the list, changing `current.next` to `prev`, then advancing `prev` and `current`.

**Diagram (Example: 1->2->3->4->5, split at 3):**
```
Original:    1 -> 2 -> 3 -> 4 -> 5 -> null

After finding middle (node 3):
slow points to 3.
firstHalfHead = 1.
secondHalfHead = 4.
3.next = null.

First Half:  1 -> 2 -> 3 -> null
Second Half: 4 -> 5 -> null

After reversing Second Half:
Second Half: 5 -> 4 -> null
```

### Step 3: Merge the Two Halves Alternating Nodes

Now we have:
*   `firstHalfHead`: L0 -> L1 -> L2 -> ...
*   `secondHalfHead`: Ln -> Ln-1 -> Ln-2 -> ... (reversed)

We merge them by taking one node from `firstHalfHead`, then one from `secondHalfHead`, and so on.

**Diagram (Example: First: 1->2->3, Second: 5->4):**
```
Initial:
p1 = 1
p2 = 5

Iteration 1:
p1.next = p2        (1 -> 5)
p2.next = p1.original_next (5 -> 2)
Result: 1 -> 5 -> 2 -> ...
Update pointers: p1 = 2, p2 = 4

Iteration 2:
p1.next = p2        (2 -> 4)
p2.next = p1.original_next (4 -> 3)
Result: 1 -> 5 -> 2 -> 4 -> 3 -> ...
Update pointers: p1 = 3, p2 = null

Iteration 3:
p1 = 3, p2 = null. Loop ends.
Final: 1 -> 5 -> 2 -> 4 -> 3 -> null
```

**Edge Cases & Gotchas:**
*   **Empty list or single node:** `head == null || head.next == null`. The algorithm handles this by returning immediately, as no reordering is needed.
*   **Two nodes:** `head = [1,2]`. `slow` points to 1, `fast` to null. `secondHalfHead` is 2. `1.next = null`. `secondHalfHead` becomes null after reverse (list with 1 node reversed is itself). Merging handles it correctly (1->2->null).
*   **Odd vs. Even Length:** The fast/slow pointer logic correctly identifies the middle. For an even length (e.g., 4 nodes), `slow` will stop at the 2nd node. For an odd length (e.g., 5 nodes), `slow` will stop at the 3rd node. This naturally makes the first half slightly longer or equal to the second half, which is fine for the merging step.

---

## 2. Add Two Numbers

**Problem Description:**
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return the sum as a linked list.

**Optimal Approach: Iterative Sum with Carry**

This is a straightforward simulation of how we do addition by hand, from right to left (least significant digit to most significant digit), carrying over any tens digit to the next position.

### Algorithm Steps:

1.  **Initialize:**
    *   A `dummyHead` node (e.g., with value 0) to simplify creating the result list.
    *   A `current` pointer, initially pointing to `dummyHead`, to build the result list.
    *   A `carry` variable, initialized to 0.

2.  **Iterate:** Continue as long as either `l1` or `l2` has nodes remaining, or there's a `carry` from the previous sum.

3.  **Sum Digits:**
    *   Get the value from `l1` (or 0 if `l1` is null).
    *   Get the value from `l2` (or 0 if `l2` is null).
    *   Calculate `sum = val1 + val2 + carry`.

4.  **Update Carry and Digit:**
    *   `carry = sum / 10` (e.g., if sum is 17, carry is 1).
    *   `digit = sum % 10` (e.g., if sum is 17, digit is 7).

5.  **Append to Result:**
    *   Create a new `LinkedListNode` with `digit`.
    *   Attach it to `current.next`.
    *   Move `current` to this new node.

6.  **Advance Pointers:**
    *   If `l1` is not null, move `l1 = l1.next`.
    *   If `l2` is not null, move `l2 = l2.next`.

7.  **Return:** `dummyHead.next` (to skip the initial dummy node).

**Diagram (Example: 342 + 465 = 807):**
```
l1: 2 -> 4 -> 3 -> null  (represents 342)
l2: 5 -> 6 -> 4 -> null  (represents 465)
Result: _ (dummy head)

Iteration 1 (current = _):
  val1 = 2, val2 = 5, carry = 0
  sum = 2 + 5 + 0 = 7
  carry = 0, digit = 7
  Result: _ -> 7
  current = 7 (new node)
  l1 = 4, l2 = 6

Iteration 2 (current = 7):
  val1 = 4, val2 = 6, carry = 0
  sum = 4 + 6 + 0 = 10
  carry = 1, digit = 0
  Result: _ -> 7 -> 0
  current = 0 (new node)
  l1 = 3, l2 = 4

Iteration 3 (current = 0):
  val1 = 3, val2 = 4, carry = 1
  sum = 3 + 4 + 1 = 8
  carry = 0, digit = 8
  Result: _ -> 7 -> 0 -> 8
  current = 8 (new node)
  l1 = null, l2 = null

Iteration 4 (current = 8):
  l1 = null, l2 = null, carry = 0. Loop terminates.

Return dummyHead.next: 7 -> 0 -> 8 -> null (represents 807)
```

**Edge Cases & Gotchas:**
*   **Lists of different lengths:** Handled by checking `l1 != null` and `l2 != null` and using 0 for exhausted lists.
*   **Carry at the end:** The `while (l1 != null || l2 != null || carry != 0)` condition ensures that if there's a final carry (e.g., 99 + 1 = 100), an extra node is created for it.
*   **Input lists are null:** The problem states "non-empty," so this specific edge case is not strictly required by the problem, but the code implicitly handles it if one of the inputs were `null` by treating it as a list of zeros. If both are `null`, the loop condition `carry != 0` would be false and it would return `dummyHead.next` which is `null`. A list of [0] + [0] would correctly yield [0].

---

## 3. Merge k Sorted Lists

**Problem Description:**
You are given an array of `k` linked-lists `lists`, each linked list is sorted in ascending order. Merge all the linked-lists into one sorted linked list and return it.

**Optimal Approach: Using a Min-Priority Queue (Min-Heap)**

This problem is efficiently solved using a min-priority queue (min-heap). The idea is to always extract the smallest available node from all lists, add it to the merged list, and then add the extracted node's next element back into the priority queue.

### Algorithm Steps:

1.  **Initialize:**
    *   Create a `PriorityQueue` that stores `LinkedListNode` objects. The comparator should order nodes by their `val` in ascending order.
    *   Create a `dummyHead` node (e.g., with value 0) and a `tail` pointer, initially pointing to `dummyHead`, to build the merged list.

2.  **Populate Priority Queue:**
    *   Iterate through the input `lists` array.
    *   For each non-null `head` node of a list, add it to the `minHeap`. This puts the first elements of all `k` lists into the heap.

3.  **Extract and Merge:**
    *   While the `minHeap` is not empty:
        *   `smallestNode = minHeap.poll()`: Extract the node with the smallest value from the heap.
        *   `tail.next = smallestNode`: Append this `smallestNode` to our merged list.
        *   `tail = tail.next`: Move the `tail` pointer to the newly added node.
        *   `if (smallestNode.next != null) { minHeap.add(smallestNode.next); }`: If the `smallestNode` had a next node, add *that* next node to the heap. This ensures that the next smallest element from that particular list is considered in future comparisons.

4.  **Return:** `dummyHead.next`.

**Diagram (Example: [[1,4,5],[1,3,4],[2,6]]):**
```
Initial Lists:
L1: 1 -> 4 -> 5 -> null
L2: 1 -> 3 -> 4 -> null
L3: 2 -> 6 -> null

Min-Heap (stores head nodes): [ (1 from L1), (1 from L2), (2 from L3) ]
Dummy result: _

1. Poll (1 from L1). Result: _ -> 1. Add 4 (L1.next) to heap.
   Heap: [ (1 from L2), (2 from L3), (4 from L1) ]

2. Poll (1 from L2). Result: _ -> 1 -> 1. Add 3 (L2.next) to heap.
   Heap: [ (2 from L3), (3 from L2), (4 from L1) ]

3. Poll (2 from L3). Result: _ -> 1 -> 1 -> 2. Add 6 (L3.next) to heap.
   Heap: [ (3 from L2), (4 from L1), (6 from L3) ]

4. Poll (3 from L2). Result: _ -> 1 -> 1 -> 2 -> 3. Add 4 (L2.next) to heap.
   Heap: [ (4 from L1), (4 from L2), (6 from L3) ]

5. Poll (4 from L1). Result: _ -> 1 -> 1 -> 2 -> 3 -> 4. Add 5 (L1.next) to heap.
   Heap: [ (4 from L2), (5 from L1), (6 from L3) ]

6. Poll (4 from L2). Result: _ -> 1 -> 1 -> 2 -> 3 -> 4 -> 4. (L2 is exhausted).
   Heap: [ (5 from L1), (6 from L3) ]

7. Poll (5 from L1). Result: _ -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5. (L1 is exhausted).
   Heap: [ (6 from L3) ]

8. Poll (6 from L3). Result: _ -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6. (L3 is exhausted).
   Heap: [ ]

Heap is empty. Loop terminates.
Final Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6 -> null
```

**Edge Cases & Gotchas:**
*   **`lists` array is null or empty:** Handled by `if (lists == null || lists.length == 0) return null;`.
*   **`lists` array contains null lists:** The loop `for (LinkedListNode listHead : lists)` correctly skips null `listHead`s.
*   **Single list in the array:** Works correctly; its head is added, then its subsequent nodes, eventually recreating the original list.
*   **All lists are empty/null:** The heap will be empty from the start, returning `null`.

---

## 4. Reverse Nodes in k-Group

**Problem Description:**
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. If the number of nodes is not a multiple of k, then the remaining nodes, in the end, should remain as they are.

**Optimal Approach: Iterative Reversal of k-length Segments**

This problem requires careful management of pointers to correctly reverse segments and link them back to the rest of the list.

### Algorithm Steps:

1.  **Setup Dummy Node:** Create a `dummy` node and point its `next` to the `head` of the input list. This simplifies handling the new head of the entire list.
2.  **Initialize Pointers:**
    *   `prevGroupTail`: Points to the node *before* the current k-group. Initially `dummy`.
    *   `current`: Points to the start of the current k-group. Initially `head`.
3.  **Loop Through List:**
    *   **Check for k nodes:** Before reversing, iterate `k` steps starting from `current` to determine if a full `k`-group exists. Let `groupHead` be `current` and `groupEnd` be the node *after* the `k`-th node. If `count < k`, it means we don't have a full `k`-group, so we stop and leave the remaining nodes untouched.
    *   **Reverse k-Group:** Use a helper function `reverseSublist(start, end)` to reverse the segment from `groupHead` up to (but not including) `groupEnd`. This helper returns the new head of the reversed segment.
    *   **Connect Groups:**
        *   `prevGroupTail.next = newHeadOfReversedGroup`: Connect the previous segment's tail to the new head of the reversed group.
        *   `groupHead.next = groupEnd`: The original `groupHead` (which is now the tail of the reversed segment) must point to `groupEnd` (the start of the next segment).
    *   **Update for Next Iteration:**
        *   `prevGroupTail = groupHead`: The `groupHead` (now tail of reversed segment) becomes the `prevGroupTail` for the next iteration.
        *   `current = groupEnd`: The `current` pointer moves to the start of the next potential k-group.
4.  **Return:** `dummy.next` (the new head of the entire modified list).

### Helper: `reverseSublist(start, end)`

This helper reverses a portion of a linked list from `start` up to (but not including) `end`.
*   Uses `prev`, `current`, `nextTemp` pointers similar to standard linked list reversal.
*   The loop condition is `while (current != end)`.

**Diagram (Example: 1->2->3->4->5, k=2):**

```
Initial: D -> 1 -> 2 -> 3 -> 4 -> 5 -> null
         ^    ^
         prev prevGroupTail (D)
              current (1)

Iteration 1 (k=2):
  groupHead = 1.
  Check for 2 nodes: 1->2 (groupEnd will be 3). Count = 2. Yes, reverse.

  Reverse 1->2 (up to 3):
    1->2 becomes 2->1.
    newHeadOfReversedGroup = 2.

  Connect:
    prevGroupTail.next = 2  (D -> 2)
    groupHead.next = groupEnd (1 -> 3)

  Resulting list state: D -> 2 -> 1 -> 3 -> 4 -> 5 -> null

  Update for next iteration:
    prevGroupTail = groupHead (which is 1)
    current = groupEnd (which is 3)

Iteration 2 (k=2):
  D -> 2 -> 1 -> 3 -> 4 -> 5 -> null
             ^    ^
             prevGroupTail (1)
                  current (3)
  groupHead = 3.
  Check for 2 nodes: 3->4 (groupEnd will be 5). Count = 2. Yes, reverse.

  Reverse 3->4 (up to 5):
    3->4 becomes 4->3.
    newHeadOfReversedGroup = 4.

  Connect:
    prevGroupTail.next = 4  (1 -> 4)
    groupHead.next = groupEnd (3 -> 5)

  Resulting list state: D -> 2 -> 1 -> 4 -> 3 -> 5 -> null

  Update for next iteration:
    prevGroupTail = groupHead (which is 3)
    current = groupEnd (which is 5)

Iteration 3 (k=2):
  D -> 2 -> 1 -> 4 -> 3 -> 5 -> null
                      ^    ^
                      prevGroupTail (3)
                           current (5)
  groupHead = 5.
  Check for 2 nodes: 5->null. Count = 1. Not enough (count < k).
  Break loop.

Final Result: D -> 2 -> 1 -> 4 -> 3 -> 5 -> null
Return dummy.next: 2 -> 1 -> 4 -> 3 -> 5 -> null
```

**Edge Cases & Gotchas:**
*   **`head == null` or `k == 1`:** The base cases are handled explicitly. If `k=1`, no groups are truly reversed, the list remains the same.
*   **List shorter than `k`:** The initial check for `count < k` correctly identifies this, and the list remains unchanged.
*   **`dummy` node is crucial:** It simplifies handling the case where the original `head` itself is reversed (e.g., in the first group reversal). Without it, connecting the reversed first group would require special handling.
*   **Pointer `groupHead.next = groupEnd`:** This is the most common point of error. The original head of the reversed segment becomes its tail, and it must point to the *beginning* of the *next* segment.
*   **Careful with `groupEnd`:** It points to the node *after* the `k`-th node of the current group. It might be `null`. The `reverseSublist` helper handles `end` being `null` correctly.
```