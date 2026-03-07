# Linked List Algorithms: Detailed Explanations and Interview Tips

This document provides in-depth explanations for the Linked List problems implemented in `LinkedListProblems.java`, covering their logic, time/space complexity, edge cases, and relevant interview tips.

---

## 1. Reverse Linked List

### Problem Description
Given the `head` of a singly linked list, reverse the list, and return the reversed list.

### Approaches

#### A. Iterative Approach

**Logic:**
The iterative approach uses three pointers to keep track of the current node, the previous node, and the next node. It iterates through the list, changing the `next` pointer of each node to point to its `prev` node.

1.  **Initialization:**
    *   `prev`: Starts as `null`. This will be the new tail of the list and eventually the head of the reversed list.
    *   `current`: Starts as `head`. This pointer moves through the original list.
    *   `nextTemp`: A temporary pointer to store `current.next` before `current.next` is modified.

2.  **Iteration:**
    While `current` is not `null`:
    *   Store `current.next` in `nextTemp`. This is crucial to not lose access to the rest of the list.
    *   Change `current.next` to `prev`. This reverses the link.
    *   Move `prev` to `current`. `prev` now points to the node that was just reversed.
    *   Move `current` to `nextTemp`. `current` advances to the next node in the original list.

3.  **Return:**
    Once `current` becomes `null`, it means we've processed all nodes. `prev` will be pointing to the last node of the original list, which is now the head of the reversed list.

**Diagram (Conceptual):**

Original: `1 -> 2 -> 3 -> NULL`
Initial: `prev=NULL`, `current=1`, `nextTemp=NULL`

1.  `current=1`:
    `nextTemp = 2` (stores 2)
    `1.next = NULL` (reverses link)
    `prev = 1`
    `current = 2`
    State: `NULL <- 1`, `2 -> 3 -> NULL` (prev=1, current=2)

2.  `current=2`:
    `nextTemp = 3` (stores 3)
    `2.next = 1` (reverses link)
    `prev = 2`
    `current = 3`
    State: `NULL <- 1 <- 2`, `3 -> NULL` (prev=2, current=3)

3.  `current=3`:
    `nextTemp = NULL` (stores NULL)
    `3.next = 2` (reverses link)
    `prev = 3`
    `current = NULL`
    State: `NULL <- 1 <- 2 <- 3` (prev=3, current=NULL)

Loop ends. Return `prev` (which is `3`).
Result: `3 -> 2 -> 1 -> NULL`

**Complexity:**
*   **Time Complexity:** `O(N)`, where N is the number of nodes. We traverse the list exactly once.
*   **Space Complexity:** `O(1)`. We use a constant number of pointers.

#### B. Recursive Approach

**Logic:**
The recursive approach leverages the call stack to reverse the links. The core idea is to reverse the *rest* of the list and then correctly attach the `head` to the new tail of that reversed "rest."

1.  **Base Case:**
    If `head` is `null` (empty list) or `head.next` is `null` (single-node list), the list is already reversed. Return `head`.

2.  **Recursive Step:**
    *   Recursively call `reverseListRecursive(head.next)`. This call will reverse the sublist starting from the second node (`head.next`) and return the *new head* of that reversed sublist. Let's call this `reversedRest`.
    *   Now, `head.next` points to the node that was originally second. In the reversed `reversedRest`, this node is the *tail*. We need its `next` pointer to point back to the original `head`. So, `head.next.next = head;`.
    *   Finally, the original `head` is now the last node in the overall reversed list. Its `next` pointer should be `null`. So, `head.next = null;`.
    *   Return `reversedRest`, which is the true head of the completely reversed list.

**Diagram (Conceptual):**

Original: `1 -> 2 -> 3 -> NULL`

1.  `reverseListRecursive(1)`:
    *   Calls `reverseListRecursive(2)`
        *   Calls `reverseListRecursive(3)`
            *   Calls `reverseListRecursive(NULL)` - returns `NULL` (base case)
            *   `reverseListRecursive(3)`: `head=3`, `head.next=NULL` -> base case. Returns `3`.
        *   `reverseListRecursive(2)` receives `reversedRest=3`
            *   `head.next` is `3`. So, `3.next = 2` (reverses `2->3` to `3->2`)
            *   `2.next = NULL` (2 becomes tail)
            *   Returns `3`
    *   `reverseListRecursive(1)` receives `reversedRest=3`
        *   `head.next` is `2`. So, `2.next = 1` (reverses `1->2` to `2->1`)
        *   `1.next = NULL` (1 becomes tail)
        *   Returns `3`

Result: `3 -> 2 -> 1 -> NULL`

**Complexity:**
*   **Time Complexity:** `O(N)`, where N is the number of nodes. Each node is processed once during the recursion.
*   **Space Complexity:** `O(N)` due to the recursion call stack. In the worst case, the depth of the stack can be N.

### Interview Tips and Variations
*   **Always ask about edge cases:** empty list, single-node list.
*   **Understand both iterative and recursive:** Iterative is generally preferred for production code to avoid stack overflow for very long lists, but recursive demonstrates a deeper understanding of recursion.
*   **Variations:**
    *   Reverse a sublist (e.g., reverse nodes from position `m` to `n`).
    *   Reverse every `k` nodes. (See `ReversalVariations.java`)

---

## 2. Detect Cycle and Find Start Node

### Problem Description
Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

### Approach: Floyd's Tortoise and Hare (Slow and Fast Pointers)

**Logic:**
This algorithm uses two pointers, `slow` and `fast`, moving at different speeds to detect and then locate the cycle.

**Phase 1: Detect the Cycle**

1.  **Initialization:**
    *   `slow`: Starts at `head`, moves one step at a time (`slow = slow.next`).
    *   `fast`: Starts at `head`, moves two steps at a time (`fast = fast.next.next`).

2.  **Movement:**
    *   If a cycle exists, `fast` will eventually "lap" `slow` and they will meet at some node within the cycle.
    *   If `fast` or `fast.next` ever becomes `null`, it means `fast` reached the end of the list, and therefore no cycle exists.

**Diagram (Conceptual for detection):**

`H -> A -> B -> C -> D -> E -> F -> G`
         `^                      |`
         `|______________________|` (Cycle starts at B)

*   `slow = H`, `fast = H`
*   `slow = A`, `fast = B`
*   `slow = B`, `fast = D`
*   `slow = C`, `fast = F`
*   `slow = D`, `fast = B` (fast completed one cycle, landed on B)
*   `slow = E`, `fast = D`
*   `slow = F`, `fast = F` (MEET!)

**Phase 2: Find the Start of the Cycle**

Once `slow` and `fast` meet:

1.  **Reset `slow`:** Move `slow` back to `head`.
2.  **Advance both at same speed:** Keep `fast` at the meeting point. Now, move both `slow` and `fast` one step at a time.
3.  **Meeting Point is Cycle Start:** The node where they meet again is the beginning of the cycle.

**Mathematical Proof (Simplified):**
Let `L` be the distance from `head` to the cycle start.
Let `C` be the length of the cycle.
Let `K` be the distance from the cycle start to the meeting point (within the cycle).

*   When `slow` and `fast` meet:
    *   `Distance(slow) = L + K`
    *   `Distance(fast) = L + K + n * C` (where `n` is the number of full cycles `fast` has completed)
    *   Since `fast` moves twice as fast as `slow`: `2 * Distance(slow) = Distance(fast)`
    *   `2 * (L + K) = L + K + n * C`
    *   `2L + 2K = L + K + n * C`
    *   `L + K = n * C`
    *   Rearranging: `L = n * C - K`
    *   `L = (n - 1) * C + (C - K)`

This equation is key:
*   `L` is the distance from `head` to the cycle start.
*   `(C - K)` is the remaining distance from the meeting point `K` back to the cycle start (moving forward within the cycle).

So, if we put one pointer at `head` (distance `L` to cycle start) and another at the meeting point (distance `C-K` to cycle start), and both move one step at a time, they will meet exactly at the cycle start.

**Complexity:**
*   **Time Complexity:** `O(N)`. In the worst case, `fast` traverses roughly `2N` nodes, `slow` traverses `N` nodes in Phase 1. In Phase 2, both pointers traverse at most `N` nodes. Overall, linear time.
*   **Space Complexity:** `O(1)`. Only a constant number of pointers are used.

### Interview Tips and Variations
*   This is a classic "two-pointer" problem. Make sure you understand why Floyd's algorithm works mathematically.
*   **Edge cases:** Empty list, single-node list (no cycle), list with two nodes (cycle or no cycle), cycle at head, cycle at tail.
*   **Common mistake:** Not handling `fast == null` or `fast.next == null` correctly in the cycle detection phase. This will lead to `NullPointerExceptions`.
*   **Variations:**
    *   Just detect if a cycle exists (return boolean).
    *   Find the length of the cycle (once slow/fast meet, leave slow there and move fast until it meets slow again, counting steps).
    *   Find intersection of two linked lists (can be seen as a cycle if one list ends and points to a node in the other).

---

## 3. Merge Two Sorted Lists

### Problem Description
You are given the heads of two sorted linked lists, `list1` and `list2`. Merge the two lists into a single sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

### Approach: Iterative with a Dummy Node

**Logic:**
This approach uses a dummy node to simplify the process of building the new merged list, especially for handling the head.

1.  **Initialization:**
    *   `dummyHead`: A new `ListNode` (e.g., with value 0 or any placeholder). This node is not part of the actual merged list but acts as a convenient starting point.
    *   `current`: A pointer initialized to `dummyHead`. This pointer will always point to the last node added to our merged list.

2.  **Merging Loop:**
    While both `list1` and `list2` have nodes:
    *   Compare `list1.val` and `list2.val`.
    *   If `list1.val` is less than or equal to `list2.val`:
        *   Set `current.next = list1`. (Append `list1`'s current node to the merged list).
        *   Move `list1` to `list1.next`. (Advance `list1`'s pointer).
    *   Else (if `list2.val` is smaller):
        *   Set `current.next = list2`. (Append `list2`'s current node).
        *   Move `list2` to `list2.next`. (Advance `list2`'s pointer).
    *   In either case, advance `current` to `current.next` (to the newly added node).

3.  **Append Remaining Nodes:**
    After the loop, one of the lists might still have remaining nodes (because the other became `null`). Since both input lists were sorted, the remaining nodes of the non-empty list are all greater than or equal to the last merged node.
    *   If `list1` is not `null`, set `current.next = list1`.
    *   Else (if `list2` is not `null`), set `current.next = list2`.

4.  **Return:**
    The actual head of the merged list is `dummyHead.next`.

**Diagram (Conceptual):**

`list1 = 1 -> 2 -> 4`
`list2 = 1 -> 3 -> 4`

Initial: `dummyHead=0`, `current=0`, `list1=1`, `list2=1`

1.  `list1.val (1) <= list2.val (1)`:
    `current.next = list1` (0 -> 1)
    `list1 = 2`
    `current = 1`
    Merged: `0 -> 1`

2.  `list1.val (2) > list2.val (1)`:
    `current.next = list2` (1 -> 1)
    `list2 = 3`
    `current = 1`
    Merged: `0 -> 1 -> 1`

3.  `list1.val (2) <= list2.val (3)`:
    `current.next = list1` (1 -> 2)
    `list1 = 4`
    `current = 2`
    Merged: `0 -> 1 -> 1 -> 2`

4.  `list1.val (4) > list2.val (3)`:
    `current.next = list2` (2 -> 3)
    `list2 = 4`
    `current = 3`
    Merged: `0 -> 1 -> 1 -> 2 -> 3`

5.  `list1.val (4) <= list2.val (4)`:
    `current.next = list1` (3 -> 4)
    `list1 = NULL`
    `current = 4`
    Merged: `0 -> 1 -> 1 -> 2 -> 3 -> 4`

Loop ends as `list1` is `NULL`.
Append remaining `list2`: `current.next = list2` (4 -> 4)
Merged: `0 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4`

Return `dummyHead.next` (which is `1`).
Result: `1 -> 1 -> 2 -> 3 -> 4 -> 4`

**Complexity:**
*   **Time Complexity:** `O(M + N)`, where M and N are the lengths of `list1` and `list2`. We traverse each list once, comparing and linking nodes.
*   **Space Complexity:** `O(1)`. We only use a few extra pointers and do not create new nodes (we re-link existing ones).

### Interview Tips and Variations
*   **Dummy Node:** A common and powerful technique for Linked List problems, especially when modifying the head of the list. It simplifies code by avoiding special checks for `null` head during insertion/deletion.
*   **Recursive Solution:** Also possible, where the base case is when one list is `null`, and the recursive step merges the tails after deciding which head is smaller. It's more concise but has `O(M+N)` space complexity due to the call stack.
*   **Variations:**
    *   Merge `k` sorted lists (can be solved with a min-heap or by repeatedly merging two lists).
    *   Merge two unsorted lists (requires sorting, or merging with duplicate handling if necessary).

---

## 4. Remove Nth Node From End of List

### Problem Description
Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head.

### Approach: Two Pointers (Fast and Slow)

**Logic:**
This problem is efficiently solved using two pointers, `fast` and `slow`, maintaining a gap of `n` nodes between them.

1.  **Initialization with Dummy Node:**
    *   Create a `dummy` node and set `dummy.next = head`. This helps in cases where the head itself needs to be removed.
    *   Initialize `fast` and `slow` pointers to `dummy`.

2.  **Create the Gap:**
    *   Move the `fast` pointer `n` steps ahead. Now `fast` is `n` nodes ahead of `slow`.

3.  **Move Both Pointers:**
    *   Move both `fast` and `slow` one step at a time until `fast` reaches the end of the list (i.e., `fast.next == null`).
    *   When `fast.next` is `null`, `fast` is pointing to the last node. At this point, `slow` will be exactly one node *before* the n-th node from the end. This is because the gap of `n` nodes has been maintained.

4.  **Remove the Node:**
    *   The node to be removed is `slow.next`. Update the links: `slow.next = slow.next.next`. This effectively bypasses and removes the n-th node from the end.

5.  **Return:**
    Return `dummy.next`, which is the head of the modified list.

**Diagram (Conceptual):**

`head = 1 -> 2 -> 3 -> 4 -> 5`, `n = 2` (remove 4)

Initial: `dummy=0`, `fast=0`, `slow=0`
List: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`

1.  Move `fast` `n=2` steps:
    `fast` moves to `1` (1st step)
    `fast` moves to `2` (2nd step)
    State: `dummy=0`, `slow=0`, `fast=2`
    Gap: `0 --(1)-- 1 --(2)-- 2` (`fast` is 2 nodes ahead of `slow`)

2.  Move `fast` and `slow` until `fast.next == null`:
    *   `fast=2`, `slow=0`
        *   `fast=3`, `slow=1`
    *   `fast=4`, `slow=2`
    *   `fast=5`, `slow=3` (Now `fast.next` is `NULL`)
    State: `dummy=0`, `slow=3`, `fast=5`

3.  Remove `slow.next`:
    `slow` is `3`. `slow.next` is `4`. We want to remove `4`.
    Set `slow.next = slow.next.next` (i.e., `3.next = 5`).
    List becomes: `0 -> 1 -> 2 -> 3 -> 5 -> NULL`

Return `dummy.next` (which is `1`).
Result: `1 -> 2 -> 3 -> 5 -> NULL`

**Complexity:**
*   **Time Complexity:** `O(N)`, where N is the number of nodes. The `fast` pointer traverses the list once (n steps + (N-n) steps).
*   **Space Complexity:** `O(1)`. Uses a constant number of pointers.

### Interview Tips and Variations
*   **Dummy Node is critical:** It simplifies handling removal of the actual `head` node, avoiding a separate `if (n == length)` check.
*   **Careful with `n`:** Ensure `n` is always valid (e.g., `1 <= n <= list_length`). The problem usually guarantees this.
*   **Edge cases:**
    *   Removing the head (`n == length`).
    *   Removing the tail (`n == 1`).
    *   List with only one node (removing it results in an empty list).
    *   List with two nodes (removing head or tail).
*   **Finding the middle node:** This is another common two-pointer problem, often using slow and fast pointers where fast moves twice as fast as slow. When fast reaches the end, slow is at the middle.

---

## 5. Reorder List

### Problem Description
You are given the `head` of a singly linked list. Reorder the list such that: `L0 → LN → L1 → LN-1 → L2 → LN-2 → ...`. You may not modify the values in the list's nodes, only nodes themselves may be changed.

### Approach: Three Steps

This problem combines several fundamental Linked List operations: finding the middle, reversing a list, and merging two lists.

1.  **Find the Middle of the Linked List:**
    *   Use the slow and fast pointer approach. `slow` moves one step, `fast` moves two steps.
    *   When `fast` reaches the end (or `fast.next` is `null`), `slow` will be at the middle node.
    *   For lists with an even number of nodes (e.g., `1->2->3->4`), `slow` will stop at `2` (the end of the first half).
    *   For lists with an odd number of nodes (e.g., `1->2->3->4->5`), `slow` will stop at `3` (the exact middle).

2.  **Reverse the Second Half:**
    *   Disconnect the first half from the second half. This is crucial: set `slow.next = null`.
    *   The head of the second half is `slow.next` (before setting it to null).
    *   Use the `reverseListIterative` method (or similar) to reverse this second half.

3.  **Merge the Two Halves Alternately:**
    *   You now have two lists:
        *   `firstHalfHead`: `L0 -> L1 -> L2 -> ...`
        *   `secondHalfHead` (reversed): `LN -> LN-1 -> LN-2 -> ...`
    *   Merge them by taking one node from the first, then one from the second, and so on.
    *   Use two pointers, `p1` for the first half and `p2` for the second half.
    *   In a loop, take `p1.next`, then `p2`, then `p1.next` again (which was the stored `nextP1`).
    *   Carefully store the `next` pointers before modifying them.

**Diagram (Conceptual):**

`head = 1 -> 2 -> 3 -> 4 -> 5`

**Step 1: Find Middle**
`slow` at `3`, `fast` at `NULL` (after `5`)
`firstHalfHead = 1`
`secondHalfHead` is originally `4`

**Step 2: Split and Reverse Second Half**
Original list: `1 -> 2 -> 3 -> 4 -> 5`
After `slow.next = null`: `1 -> 2 -> 3 -> NULL` (first half) and `4 -> 5 -> NULL` (second half)
Reverse second half: `5 -> 4 -> NULL`

Now we have:
`p1 = 1 -> 2 -> 3 -> NULL`
`p2 = 5 -> 4 -> NULL`

**Step 3: Merge Alternately**

1.  `p1=1`, `p2=5`
    `nextP1=2`, `nextP2=4`
    `1.next = 5`
    `5.next = 2`
    `p1 = 2`, `p2 = 4`
    List: `1 -> 5 -> 2`

2.  `p1=2`, `p2=4`
    `nextP1=3`, `nextP2=NULL`
    `2.next = 4`
    `4.next = 3`
    `p1 = 3`, `p2 = NULL`
    List: `1 -> 5 -> 2 -> 4 -> 3`

Loop ends because `p2` is `NULL`.
Result: `1 -> 5 -> 2 -> 4 -> 3`

**Complexity:**
*   **Time Complexity:** `O(N)`, where N is the number of nodes.
    *   Finding middle: `O(N)`.
    *   Reversing second half: `O(N/2) = O(N)`.
    *   Merging: `O(N/2) = O(N)`.
    *   Total: `O(N)`.
*   **Space Complexity:** `O(1)`. Only a constant number of pointers are used (assuming iterative reversal).

### Interview Tips and Variations
*   This problem is a great test of combining multiple basic linked list operations. If you're stuck, try to break it down.
*   **Pay attention to pointer management** during merging. It's easy to lose track of `next` pointers.
*   **Edge cases:** Empty list, single-node list, two-node list (already reordered), three-node list.
*   **Variations:**
    *   Reorder in a different pattern (e.g., group odds and evens).
    *   Requires a deep understanding of linked list manipulation.

---

## General Linked List Interview Tips

*   **Dummy Nodes:** Always consider using a dummy head node (`ListNode dummy = new ListNode(0); dummy.next = head;`). It simplifies code, especially when deletions or insertions happen at the head. Remember to return `dummy.next`.
*   **Two Pointers:** A fundamental technique for many linked list problems (fast/slow, prev/current, current/next). Use them for:
    *   Cycle detection (Floyd's Tortoise and Hare).
    *   Finding the middle of the list.
    *   Finding the Nth node from the end.
    *   Detecting intersections.
*   **Edge Cases:** Always explicitly ask about and handle:
    *   Empty list (`head == null`).
    *   Single-node list (`head.next == null`).
    *   Two-node list.
    *   List operations at the beginning, middle, or end of the list.
*   **Drawing Diagrams:** Don't hesitate to draw out pointer movements on paper or a whiteboard. This is crucial for visualizing the state of the list and preventing errors. ASCII art diagrams in this project are a good example.
*   **NullPointerExceptions:** These are very common in linked list problems. Carefully check `current != null`, `current.next != null` before dereferencing.
*   **Immutability vs. In-Place:** Most interview problems require in-place modifications (O(1) auxiliary space). Be clear if you're allowed to create new nodes or if you must modify existing ones.
*   **Recursive vs. Iterative:** Understand both. Iterative solutions are generally safer for very long lists to avoid stack overflow. Recursive solutions can be more elegant for certain problems (like reversal) but come with a space overhead.
*   **Helper Functions:** For complex problems (like `reorderList`), breaking it down into smaller, reusable helper functions (e.g., `findMiddle`, `reverseList`, `mergeAlternately`) makes the code cleaner and easier to reason about.
*   **Practice:** The best way to get good is to practice a variety of problems, paying close attention to pointer manipulation and edge cases.

---
This concludes the detailed algorithm explanations. Refer to the provided code for implementation details and the test files to see them in action.