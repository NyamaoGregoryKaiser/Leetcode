# Linked List Algorithm Explanations

This document provides detailed explanations for the Linked List problems implemented in this project. It covers problem statements, example walkthroughs, optimal solutions, alternative approaches, complexity analysis, visual diagrams, edge cases, and interview tips.

---

## 1. Reverse Linked List

### Problem Statement

Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Example:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> None`
Output: `5 -> 4 -> 3 -> 2 -> 1 -> None`

### Approach 1: Iterative (Optimal)

This is the most common and generally preferred approach for reversing a linked list in interviews due to its optimal space complexity. It involves iterating through the list and changing the `next` pointers of each node to point to its previous node.

#### Algorithm Steps

1.  **Initialize Pointers**:
    *   `prev`: Points to the previously processed node. Initially `None` because the new tail (original head) will point to `None`.
    *   `curr`: Points to the current node being processed. Initially `head`.
    *   `next_temp`: A temporary pointer to store `curr.next` *before* `curr.next` is modified. This is crucial to not lose the rest of the list.

2.  **Iterate and Reverse**:
    *   Loop `while curr is not None`:
        *   Store `curr.next` in `next_temp`. (e.g., if `curr` is 1, `next_temp` is 2)
        *   Change `curr.next` to `prev`. This reverses the pointer. (e.g., 1's next now points to `None`)
        *   Move `prev` to `curr`. (e.g., `prev` becomes 1)
        *   Move `curr` to `next_temp`. (e.g., `curr` becomes 2)

3.  **Return**: After the loop, `curr` will be `None`, meaning all nodes have been processed. `prev` will be pointing to the original last node, which is now the new head of the reversed list. Return `prev`.

#### ASCII Diagram Walkthrough (Example: `1 -> 2 -> 3 -> None`)

Initial State:
```
prev = None
curr = 1 -> 2 -> 3 -> None
next_temp = ?
```

**Iteration 1 (curr = 1):**
1. `next_temp = curr.next` (stores 2)
   `prev = None`
   `curr = 1`
   `next_temp = 2`
   `List: 1 -> 2 -> 3 -> None`

2. `curr.next = prev` (1 now points to None)
   `prev = None`
   `curr = 1`
   `next_temp = 2`
   `List: 1 -> None` (2 -> 3 -> None is still somewhere via `next_temp`)

3. `prev = curr` (prev becomes 1)
   `prev = 1`
   `curr = 1`
   `next_temp = 2`
   `List: 1 -> None`

4. `curr = next_temp` (curr becomes 2)
   `prev = 1`
   `curr = 2`
   `next_temp = 2`
   `List: 1 -> None` (Original: 2 -> 3 -> None)
---

**Iteration 2 (curr = 2):**
1. `next_temp = curr.next` (stores 3)
   `prev = 1`
   `curr = 2`
   `next_temp = 3`
   `List: 1 <- 2 -> 3 -> None`

2. `curr.next = prev` (2 now points to 1)
   `prev = 1`
   `curr = 2`
   `next_temp = 3`
   `List: 1 <- 2` (Original: 3 -> None)

3. `prev = curr` (prev becomes 2)
   `prev = 2`
   `curr = 2`
   `next_temp = 3`
   `List: 1 <- 2`

4. `curr = next_temp` (curr becomes 3)
   `prev = 2`
   `curr = 3`
   `next_temp = 3`
   `List: 1 <- 2` (Original: 3 -> None)
---

**Iteration 3 (curr = 3):**
1. `next_temp = curr.next` (stores None)
   `prev = 2`
   `curr = 3`
   `next_temp = None`
   `List: 1 <- 2 <- 3 -> None`

2. `curr.next = prev` (3 now points to 2)
   `prev = 2`
   `curr = 3`
   `next_temp = None`
   `List: 1 <- 2 <- 3`

3. `prev = curr` (prev becomes 3)
   `prev = 3`
   `curr = 3`
   `next_temp = None`
   `List: 1 <- 2 <- 3`

4. `curr = next_temp` (curr becomes None)
   `prev = 3`
   `curr = None`
   `next_temp = None`
   `List: 1 <- 2 <- 3`
---

**Loop Terminates** (`curr` is None). Return `prev` (which is 3).
Final Result: `3 -> 2 -> 1 -> None`

#### Complexity Analysis

*   **Time Complexity**: `O(N)`, where N is the number of nodes in the linked list. Each node is visited exactly once to update its `next` pointer.
*   **Space Complexity**: `O(1)`, as only a constant number of extra pointers (`prev`, `curr`, `next_temp`) are used, regardless of the list's size.

### Approach 2: Recursive

The recursive approach is more elegant but uses more space due to the recursion stack.

#### Algorithm Steps

1.  **Base Cases**:
    *   If the list is empty (`head is None`) or has only one node (`head.next is None`), it's already reversed. Return `head`.

2.  **Recursive Step**:
    *   Let `next_node` be `head.next`.
    *   Recursively call `reverse_list_recursive(next_node)`. This call will reverse the sublist starting from `next_node` and return its new head (which was the original tail of the sublist). Let's call this `reversed_head`.
    *   After the recursive call returns, `next_node` (the original second node) will still be pointing to `head` (if its pointer was not already redirected by a deeper recursive call). More accurately, `head.next` still points to `next_node`. Now, `next_node` is the *tail* of the sublist that just got reversed. We need to connect `next_node` to `head`.
    *   Set `next_node.next = head`. This makes the original `next_node` point back to `head`.
    *   Set `head.next = None`. The original `head` is now the last node of the reversed segment, so its `next` should be `None`.
    *   Return `reversed_head`. This `reversed_head` propagates up the call stack as the true head of the fully reversed list.

#### Complexity Analysis

*   **Time Complexity**: `O(N)`, where N is the number of nodes. Each node is processed once.
*   **Space Complexity**: `O(N)`, due to the recursion stack. In the worst case (a long list), N stack frames will be created.

#### Interview Tips & Variations

*   **Clarification**: Always confirm if you need to reverse in-place or if creating new nodes is allowed (usually in-place).
*   **Edge Cases**: Empty list, single-node list, two-node list.
*   **Follow-up**: Reverse a linked list between two positions (e.g., LeetCode 92). This often combines the iterative approach with careful boundary handling.
*   **Double Linked List**: Reversing a doubly linked list is similar but requires updating both `next` and `prev` pointers. It's often easier than singly linked lists due to backward pointers.

---

## 2. Detect Cycle in Linked List

### Problem Statement

Given the `head` of a linked list, return `true` if there is a cycle in the linked list. A cycle means that some node in the list can be reached again by continuously following the `next` pointer.

**Example:**
Input: `3 -> 2 -> 0 -> -4` (tail connects to node with val 2, i.e., `pos = 1`)
Output: `true`

### Approach 1: Floyd's Tortoise and Hare (Two-Pointer) Algorithm (Optimal)

This is the most efficient and classic approach. It uses two pointers, one moving faster than the other. If a cycle exists, the faster pointer will eventually catch up to the slower pointer.

#### Algorithm Steps

1.  **Handle Edge Cases**: If the list is empty (`head is None`) or has only one node (`head.next is None`), a cycle cannot exist. Return `false`.

2.  **Initialize Pointers**:
    *   `slow`: Moves one step at a time.
    *   `fast`: Moves two steps at a time.
    *   Both `slow` and `fast` start at `head`.

3.  **Traverse and Detect**:
    *   Loop `while fast is not None and fast.next is not None`:
        *   Move `slow` one step: `slow = slow.next`.
        *   Move `fast` two steps: `fast = fast.next.next`.
        *   If `slow == fast`, a cycle is detected. Return `true`.

4.  **No Cycle**: If the loop finishes (meaning `fast` or `fast.next` became `None`), it indicates the end of the list was reached, so there is no cycle. Return `false`.

#### ASCII Diagram Walkthrough (Example: `1 -> 2 -> 3 -> 4 -> 2 (cycle)`)

Initial State:
```
head = 1
slow = 1
fast = 1

List: 1 -> 2 -> 3 -> 4 ->
             ^----------|
```

**Iteration 1:**
`slow` moves to 2
`fast` moves to 3
```
slow = 2
fast = 3

List: 1 -> 2 -> 3 -> 4 ->
             ^----------|
```

**Iteration 2:**
`slow` moves to 3
`fast` moves to 2 (from 4, points to 2)
```
slow = 3
fast = 2

List: 1 -> 2 -> 3 -> 4 ->
             ^----------|
```

**Iteration 3:**
`slow` moves to 4
`fast` moves to 4 (from 2, points to 3, then to 4)
```
slow = 4
fast = 4

List: 1 -> 2 -> 3 -> 4 ->
             ^----------|
```
`slow == fast` is true! Cycle detected.

#### Complexity Analysis

*   **Time Complexity**: `O(N)`, where N is the number of nodes. In the worst case (no cycle or cycle detected near the end), the pointers traverse the list at most twice. When a cycle exists, the fast pointer enters the cycle first, and the slow pointer catches up within the cycle. The distance covered is proportional to N.
*   **Space Complexity**: `O(1)`, as only two extra pointers are used.

### Approach 2: Hash Table (Set) Approach

This approach is simpler to understand but uses more space. It involves storing visited nodes in a hash set.

#### Algorithm Steps

1.  **Handle Edge Cases**: If the list is empty (`head is None`), a cycle cannot exist. Return `false`.

2.  **Initialize**:
    *   `visited_nodes`: An empty hash set (Python `set`) to store `ListNode` objects.
    *   `current`: A pointer initialized to `head`.

3.  **Traverse and Check**:
    *   Loop `while current is not None`:
        *   Check if `current` is already in `visited_nodes`. If yes, a cycle is detected. Return `true`.
        *   Add `current` to `visited_nodes`.
        *   Move `current` to `current.next`.

4.  **No Cycle**: If the loop finishes, no cycle was found. Return `false`.

#### Complexity Analysis

*   **Time Complexity**: `O(N)`, where N is the number of nodes. Each node is visited once, and hash set operations (add, check existence) take `O(1)` on average.
*   **Space Complexity**: `O(N)`, as in the worst case (no cycle), all N nodes are stored in the hash set.

#### Interview Tips & Variations

*   **Follow-up (Harder)**: Find the starting node of the cycle. After `slow` and `fast` meet, move `slow` back to `head`. Then, move both `slow` and `fast` one step at a time. The point where they meet again is the start of the cycle.
*   **Linked List properties**: Understand why the Tortoise and Hare algorithm works. The key insight is that if there's a cycle, the relative speed difference will eventually cause the faster pointer to "lap" the slower pointer.
*   **Real-world analogy**: Running on a circular track. The faster runner will eventually lap the slower runner.

---

## 3. Merge Two Sorted Lists

### Problem Statement

Merge two sorted singly linked lists into a single sorted linked list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Example:**
Input: `l1 = 1 -> 2 -> 4`, `l2 = 1 -> 3 -> 4`
Output: `1 -> 1 -> 2 -> 3 -> 4 -> 4`

### Approach 1: Iterative (Optimal)

This approach is generally preferred due to its constant space complexity. It builds the new merged list by iteratively comparing nodes from the two input lists.

#### Algorithm Steps

1.  **Create Dummy Node**:
    *   Initialize a `dummy_head` node (e.g., `ListNode(0)`). This simplifies the logic, especially for the very first node of the merged list, as you don't need to special-case whether the merged list is empty.
    *   Initialize a `current` pointer to `dummy_head`. This pointer will traverse the new merged list and append nodes.

2.  **Iterate and Merge**:
    *   Loop `while l1 is not None and l2 is not None`:
        *   Compare `l1.val` and `l2.val`.
        *   If `l1.val <= l2.val`:
            *   Append `l1` to `current.next`: `current.next = l1`.
            *   Move `l1` forward: `l1 = l1.next`.
        *   Else (if `l2.val` is smaller):
            *   Append `l2` to `current.next`: `current.next = l2`.
            *   Move `l2` forward: `l2 = l2.next`.
        *   Always move `current` forward to the newly appended node: `current = current.next`.

3.  **Append Remaining Nodes**:
    *   After the loop, one of the lists (`l1` or `l2`) might still have remaining nodes (because the other list became `None`). Since these remaining nodes are already sorted, simply append the entire rest of the non-empty list to `current.next`.
    *   `current.next = l1 if l1 is not None else l2` (or simply `current.next = l1 or l2` in Python).

4.  **Return Result**: The merged list begins at `dummy_head.next`. Return `dummy_head.next`.

#### ASCII Diagram Walkthrough (Example: `l1 = 1 -> 2 -> 4`, `l2 = 1 -> 3 -> 4`)

Initial State:
```
dummy_head = 0
current = 0
l1 = 1 -> 2 -> 4
l2 = 1 -> 3 -> 4
Merged: 0 -> None
```

**Iteration 1:** (`l1.val=1`, `l2.val=1`)
`l1.val <= l2.val` is true.
`current.next = l1` (0 -> 1)
`l1` moves to 2
`current` moves to 1
```
current = 1
l1 = 2 -> 4
l2 = 1 -> 3 -> 4
Merged: 0 -> 1 -> None
```

**Iteration 2:** (`l1.val=2`, `l2.val=1`)
`l1.val <= l2.val` is false.
`current.next = l2` (1 -> 1)
`l2` moves to 3
`current` moves to 1 (the second 1)
```
current = 1
l1 = 2 -> 4
l2 = 3 -> 4
Merged: 0 -> 1 -> 1 -> None
```

**Iteration 3:** (`l1.val=2`, `l2.val=3`)
`l1.val <= l2.val` is true.
`current.next = l1` (second 1 -> 2)
`l1` moves to 4
`current` moves to 2
```
current = 2
l1 = 4
l2 = 3 -> 4
Merged: 0 -> 1 -> 1 -> 2 -> None
```

**Iteration 4:** (`l1.val=4`, `l2.val=3`)
`l1.val <= l2.val` is false.
`current.next = l2` (2 -> 3)
`l2` moves to 4
`current` moves to 3
```
current = 3
l1 = 4
l2 = 4
Merged: 0 -> 1 -> 1 -> 2 -> 3 -> None
```

**Iteration 5:** (`l1.val=4`, `l2.val=4`)
`l1.val <= l2.val` is true.
`current.next = l1` (3 -> 4)
`l1` moves to None
`current` moves to 4 (the first 4)
```
current = 4
l1 = None
l2 = 4
Merged: 0 -> 1 -> 1 -> 2 -> 3 -> 4 -> None
```

**Loop Terminates** (`l1` is None).

**Append Remaining:**
`current.next = l2` (first 4 -> second 4)
```
current = 4 (the first 4)
l1 = None
l2 = None
Merged: 0 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> None
```

Return `dummy_head.next` (which is `1 -> 1 -> 2 -> 3 -> 4 -> 4 -> None`).

#### Complexity Analysis

*   **Time Complexity**: `O(M + N)`, where M and N are the lengths of `l1` and `l2` respectively. Each node from both lists is visited and relinked exactly once.
*   **Space Complexity**: `O(1)`, as only a few extra pointers and a dummy node are used. No new nodes are created; existing nodes are simply re-linked.

### Approach 2: Recursive

The recursive approach is concise but uses more space for the recursion stack.

#### Algorithm Steps

1.  **Base Cases**:
    *   If `l1` is `None`, return `l2` (the merged list is just `l2`).
    *   If `l2` is `None`, return `l1` (the merged list is just `l1`).

2.  **Recursive Step**:
    *   Compare `l1.val` and `l2.val`.
    *   If `l1.val <= l2.val`:
        *   `l1` becomes the head of the merged list.
        *   Recursively merge `l1.next` with `l2`, and set `l1.next` to the result of this recursive call.
        *   Return `l1`.
    *   Else (if `l2.val` is smaller):
        *   `l2` becomes the head of the merged list.
        *   Recursively merge `l1` with `l2.next`, and set `l2.next` to the result.
        *   Return `l2`.

#### Complexity Analysis

*   **Time Complexity**: `O(M + N)`, where M and N are the lengths of `l1` and `l2`. Each node is processed once.
*   **Space Complexity**: `O(M + N)`, due to the recursion stack. In the worst case, the depth of the recursion can be the sum of the lengths of the two lists.

#### Interview Tips & Variations

*   **Clarification**: Ensure the output should be a new list using the existing nodes, or if new nodes should be created (usually the former for efficiency).
*   **K Sorted Lists**: A common follow-up is to merge K sorted linked lists. This can be solved using a min-heap (priority queue) or by repeatedly merging two lists at a time.
*   **In-place**: Both provided solutions are "in-place" in the sense that they reuse existing nodes rather than creating new ones.

---

## 4. Remove Nth Node From End of List

### Problem Statement

Given the `head` of a singly linked list, remove the nth node from the end of the list, and return its head.

**Example:**
Input: `head = 1 -> 2 -> 3 -> 4 -> 5`, `n = 2`
Output: `1 -> 2 -> 3 -> 5`
(The 2nd node from the end is 4. Removing it results in `1 -> 2 -> 3 -> 5`)

### Approach 1: Two-Pointer Approach (Optimal)

This is the most efficient approach, requiring only a single pass through the list. It uses two pointers (`fast` and `slow`) to maintain a constant `n` gap between them.

#### Algorithm Steps

1.  **Create Dummy Node**:
    *   Initialize a `dummy_head` node (e.g., `ListNode(0)`) and make it point to the original `head`. This is crucial for handling the edge case where the head of the original list needs to be removed.
    *   Initialize `fast` and `slow` pointers to `dummy_head`.

2.  **Establish Gap**:
    *   Move the `fast` pointer `n` steps forward. After this, `fast` will be `n` nodes ahead of `slow`.
    *   Example: For `1 -> 2 -> 3 -> 4 -> 5` and `n=2`.
        *   `dummy_head` points to 1. `slow = dummy_head`, `fast = dummy_head`.
        *   Move `fast` 2 steps: `fast` is now at node `2`.
        *   The gap between `slow` (`dummy_head`) and `fast` (`2`) is 2 nodes.

3.  **Traverse to Find Node**:
    *   Now, move both `fast` and `slow` pointers one step at a time, simultaneously.
    *   Continue this until `fast` reaches the end of the list (i.e., `fast is None`).
    *   When `fast` becomes `None`, `slow` will be pointing to the node *directly before* the Nth node from the end.
    *   Why `fast` to `None` and not `fast.next` to `None`?
        *   If `fast` is `None` then `slow` is at the node *before* the one to be deleted.
        *   If `fast.next` is `None` then `slow` is at the node *to be deleted*.
        *   We need `slow` to be `n` steps *before* the node to remove. So `fast` must be `n+1` steps ahead.
        *   So, we initialize `fast` to `dummy_head`, move it `n+1` times. Then loop until `fast` is `None`. This leaves `slow` at the node *before* the target.

4.  **Remove Node**:
    *   To remove the Nth node from the end, update `slow.next` to bypass it: `slow.next = slow.next.next`.

5.  **Return Result**: The new head of the list is `dummy_head.next`. Return it.

#### ASCII Diagram Walkthrough (Example: `1 -> 2 -> 3 -> 4 -> 5`, `n = 2`)

Initial State:
```
dummy_head = 0
slow = 0
fast = 0
List: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
```

**Step 2: Establish Gap (Move `fast` `n+1=3` steps forward):**
`fast` moves 3 steps: `0 -> 1 -> 2 -> 3`
```
slow = 0
fast = 3
List: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
             ^           ^
             slow       fast
```

**Step 3: Traverse to Find Node (Move both until `fast` is None):**

**Iteration 1:**
`slow` moves to 1
`fast` moves to 4
```
slow = 1
fast = 4
List: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
                  ^        ^
                  slow    fast
```

**Iteration 2:**
`slow` moves to 2
`fast` moves to 5
```
slow = 2
fast = 5
List: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
                       ^        ^
                       slow    fast
```

**Iteration 3:**
`slow` moves to 3
`fast` moves to None
```
slow = 3
fast = None
List: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
                            ^
                            slow (points to node BEFORE target 4)
```

**Step 4: Remove Node:**
`slow.next` (which is 3's next, pointing to 4) is set to `slow.next.next` (which is 4's next, pointing to 5).
Effectively: `3.next` now points to `5`. Node `4` is bypassed.
```
slow.next = 5
List: 0 -> 1 -> 2 -> 3 -> 5 -> None
```

**Step 5: Return Result:**
`dummy_head.next` (which is `1`).
Final Output: `1 -> 2 -> 3 -> 5 -> None`

#### Complexity Analysis

*   **Time Complexity**: `O(L)`, where L is the length of the linked list. The `fast` pointer effectively traverses the list once (`n` steps + `L-n` steps).
*   **Space Complexity**: `O(1)`, as only a few extra pointers and a dummy node are used.

### Approach 2: Two-Pass Approach

This approach is simpler conceptually but requires traversing the list twice.

#### Algorithm Steps

1.  **Create Dummy Node**:
    *   Initialize a `dummy_head` node pointing to the original `head`.

2.  **First Pass (Calculate Length)**:
    *   Traverse the entire linked list from `head` to calculate its `length`.

3.  **Calculate Target Position**:
    *   The Nth node from the end is equivalent to the `(length - n)`th node from the beginning (0-indexed). Let this be `steps_to_reach_prev`.
    *   We need to stop at the node *before* the one to be removed.

4.  **Second Pass (Remove Node)**:
    *   Initialize a `current` pointer to `dummy_head`.
    *   Traverse `steps_to_reach_prev` steps forward. `current` will now point to the node *before* the one to be removed.
    *   Update `current.next = current.next.next` to remove the target node.

5.  **Return Result**: Return `dummy_head.next`.

#### Complexity Analysis

*   **Time Complexity**: `O(L)`, where L is the length of the linked list. The list is traversed twice (once for length, once for removal).
*   **Space Complexity**: `O(1)`, as only a few extra pointers and a dummy node are used.

#### Interview Tips & Variations

*   **Dummy Node**: Emphasize the importance of the dummy node to handle the edge case of removing the head of the original list without special conditional logic.
*   **`n` vs. Length**: Clarify what happens if `n` is greater than the length of the list (problem constraints usually guarantee `n` is valid).
*   **Return Type**: Make sure to return the *head* of the *modified* list, which might be different from the original `head`.
*   **Variations**: Remove all occurrences of a value, remove duplicates (sorted/unsorted).

---