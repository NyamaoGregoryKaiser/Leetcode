```markdown
# Algorithms Explanation

This document provides detailed explanations for the optimal solutions implemented in `src/algorithms/`. For alternative approaches and their trade-offs, refer to the `implementations/` directory and `InterviewTips.md`.

---

## 1. Reverse Linked List (Optimal: Iterative)

**Problem:** Given the head of a singly linked list, reverse the list, and return the reversed list's head.

**Algorithm: Iterative Approach (`reverseListIterative`)**

The iterative approach reverses the pointers one by one as it traverses the list. It requires three pointers to keep track of the current node, the previous node, and the next node.

1.  **Initialization**:
    *   `prev`: A pointer initialized to `null`. This will eventually become the new tail of the list, pointing to nothing.
    *   `current`: A pointer initialized to `head`. This pointer iterates through the original list.
    *   `nextTemp`: A temporary pointer to store `current.next` before `current.next` is modified.

2.  **Iteration**: Loop while `current` is not `null`.
    *   **Step 1: Save `next`**: Store `current.next` in `nextTemp`. This is crucial because `current.next` is about to be changed, and we need to retain access to the rest of the original list.
    *   **Step 2: Reverse Link**: Change `current.next` to point to `prev`. This is the core step where the direction of the link is reversed.
    *   **Step 3: Advance `prev`**: Update `prev` to `current`. The current node now becomes the "previous" node for the next iteration.
    *   **Step 4: Advance `current`**: Update `current` to `nextTemp`. Move to the next node in the original sequence.

3.  **Completion**: When `current` becomes `null`, it means all nodes have been processed. The `prev` pointer will be pointing to the last node of the original list, which is now the new head of the reversed list. Return `prev`.

**Example Trace (`[1 -> 2 -> 3 -> null]`)**

| Step | `prev`     | `current`  | `nextTemp` | List State (conceptual) |
| :--- | :--------- | :--------- | :--------- | :---------------------- |
| Init | `null`     | `1`        | `null`     | `1 -> 2 -> 3 -> null`   |
| 1.1  | `null`     | `1`        | `2`        | `1 -> 2 -> 3 -> null`   |
| 1.2  | `null`     | `1`        | `2`        | `1 -> null`             |
| 1.3  | `1`        | `1`        | `2`        | `1 -> null`             |
| 1.4  | `1`        | `2`        | `2`        | `1 -> null`, `2 -> 3`   |
| 2.1  | `1`        | `2`        | `3`        | `1 -> null`, `2 -> 3`   |
| 2.2  | `1`        | `2`        | `3`        | `2 -> 1 -> null`        |
| 2.3  | `2`        | `2`        | `3`        | `2 -> 1 -> null`        |
| 2.4  | `2`        | `3`        | `3`        | `2 -> 1 -> null`, `3 -> null` |
| 3.1  | `2`        | `3`        | `null`     | `2 -> 1 -> null`, `3 -> null` |
| 3.2  | `2`        | `3`        | `null`     | `3 -> 2 -> 1 -> null`   |
| 3.3  | `3`        | `3`        | `null`     | `3 -> 2 -> 1 -> null`   |
| 3.4  | `3`        | `null`     | `null`     | `3 -> 2 -> 1 -> null`   |
| Loop End: `current` is `null`. Return `prev` (`3`). |

**Complexity Analysis:**

*   **Time Complexity: O(N)**, where N is the number of nodes in the linked list. We traverse the list exactly once, performing a constant number of operations for each node.
*   **Space Complexity: O(1)**. We only use a fixed number of pointers (`prev`, `current`, `nextTemp`), regardless of the list's size.

---

## 2. Linked List Cycle (Optimal: Floyd's Tortoise and Hare)

**Problem:** Given the head of a linked list, determine if there is a cycle in the linked list.

**Algorithm: Floyd's Tortoise and Hare (Two Pointers) Approach (`hasCycle`)**

This clever algorithm uses two pointers moving at different speeds to detect a cycle. If a cycle exists, the faster pointer will eventually catch up to the slower pointer.

1.  **Initialization**:
    *   `slow`: A pointer initialized to `head`. It moves one step at a time.
    *   `fast`: A pointer initialized to `head`. It moves two steps at a time.

2.  **Edge Cases**: If the list is empty (`head` is null) or has only one node (`head.next` is null), a cycle is impossible. Return `false`.

3.  **Traversal and Detection**: Loop while `fast` and `fast.next` are not `null`. These conditions ensure that `fast` always has at least one (and preferably two) valid next nodes to jump to without causing a `null` pointer exception.
    *   Move `slow` one step: `slow = slow.next`.
    *   Move `fast` two steps: `fast = fast.next.next`.
    *   **Check for Meeting**: If `slow` becomes equal to `fast` (`slow === fast`), a cycle has been detected. Return `true`.

4.  **No Cycle**: If the loop finishes (meaning `fast` or `fast.next` became `null`), it indicates that the `fast` pointer reached the end of the list, which means there is no cycle. Return `false`.

**Why it works:**
Imagine `slow` and `fast` pointers are racers on a track.
*   If the track is linear, `fast` will eventually reach the end.
*   If the track is circular, `fast` is moving twice as fast as `slow`. Each "lap" `fast` gains one "lap" on `slow`. Since `fast` starts ahead (or at the same spot) in a cycle, it will inevitably lap `slow` (or meet `slow` if they start at the same position and `fast` completes a full lap). The relative distance between them decreases by one unit per time step, so they are guaranteed to meet if a cycle exists.

**Complexity Analysis:**

*   **Time Complexity: O(N)**, where N is the number of nodes. In the worst case (no cycle or cycle far down the list), the fast pointer traverses the list approximately twice. Each step is a constant operation.
*   **Space Complexity: O(1)**. Only two constant extra pointers (`slow`, `fast`) are used.

---

## 3. Merge Two Sorted Lists (Optimal: Recursive)

**Problem:** Merge two sorted linked lists into one new sorted list.

**Algorithm: Recursive Approach (`mergeTwoListsRecursive`)**

The recursive solution for merging two sorted lists is elegant and concise. It builds the merged list by comparing the heads of the two input lists and recursively merging the rest.

1.  **Base Cases**:
    *   If `list1` is `null`, it means we've exhausted `list1`. The remaining merged list is simply `list2`. Return `list2`.
    *   If `list2` is `null`, it means we've exhausted `list2`. The remaining merged list is simply `list1`. Return `list1`.

2.  **Recursive Step**:
    *   **Compare Heads**: Compare the `val` of `list1` and `list2`.
    *   **Choose Smaller Head**:
        *   If `list1.val <= list2.val`: The head of the merged list will be `list1`. Recursively call `mergeTwoListsRecursive` with `list1.next` and `list2` to merge the remaining portions. Set `list1.next` to the result of this recursive call. Return `list1`.
        *   Else (`list2.val` is smaller): The head of the merged list will be `list2`. Recursively call `mergeTwoListsRecursive` with `list1` and `list2.next`. Set `list2.next` to the result of this recursive call. Return `list2`.

**Example Trace (`list1 = [1,3,5], list2 = [2,4,6]`)**

```
merge([1,3,5], [2,4,6])
  // 1 <= 2, so 1 is head
  1.next = merge([3,5], [2,4,6])
    // 2 < 3, so 2 is head
    2.next = merge([3,5], [4,6])
      // 3 < 4, so 3 is head
      3.next = merge([5], [4,6])
        // 4 < 5, so 4 is head
        4.next = merge([5], [6])
          // 5 < 6, so 5 is head
          5.next = merge([], [6]) // list1 is null, returns [6]
          // Back in merge([5], [6]): 5.next = [6] => [5 -> 6]
          // Returns [5 -> 6]
        // Back in merge([5], [4,6]): 4.next = [5 -> 6] => [4 -> 5 -> 6]
        // Returns [4 -> 5 -> 6]
      // Back in merge([3,5], [4,6]): 3.next = [4 -> 5 -> 6] => [3 -> 4 -> 5 -> 6]
      // Returns [3 -> 4 -> 5 -> 6]
    // Back in merge([3,5], [2,4,6]): 2.next = [3 -> 4 -> 5 -> 6] => [2 -> 3 -> 4 -> 5 -> 6]
    // Returns [2 -> 3 -> 4 -> 5 -> 6]
  // Back in merge([1,3,5], [2,4,6]): 1.next = [2 -> 3 -> 4 -> 5 -> 6] => [1 -> 2 -> 3 -> 4 -> 5 -> 6]
  // Returns [1 -> 2 -> 3 -> 4 -> 5 -> 6]
```

**Complexity Analysis:**

*   **Time Complexity: O(M + N)**, where M and N are the number of nodes in `list1` and `list2` respectively. Each recursive call processes one node, and we process all nodes from both lists exactly once.
*   **Space Complexity: O(M + N)**. This is due to the recursion call stack. In the worst case (e.g., merging `[1,2,3]` with `[4,5,6]`), the recursion depth can be M+N, consuming proportional stack space. For very large lists, this can lead to stack overflow.

---

## 4. Remove Nth Node From End of List (Optimal: One-Pass Two-Pointer)

**Problem:** Given the head of a linked list, remove the nth node from the end of the list and return its head.

**Algorithm: One-Pass Two-Pointer Approach (`removeNthFromEndOnePass`)**

This method efficiently solves the problem in a single pass using two pointers: a `slow` pointer and a `fast` pointer, separated by `n` nodes.

1.  **Dummy Node**:
    *   Create a `dummy` node and set `dummy.next = head`. This simplifies handling edge cases, especially when the node to be removed is the original head of the list (e.g., removing the 2nd node from end of `[1,2]`, which is `1`).
    *   Initialize `slow` and `fast` pointers to `dummy`.

2.  **Advance `fast` Pointer**:
    *   Move the `fast` pointer `n + 1` steps forward.
    *   The purpose of `n+1` steps is to establish a gap of `n` nodes between `slow` and `fast`. When `fast` eventually reaches `null` (end of the list), `slow` will be positioned exactly at the node *before* the one that needs to be removed.
    *   Example: `[1,2,3,4,5]`, `n=2`.
        *   `dummy` -> `1` -> `2` -> `3` -> `4` -> `5`
        *   `slow` = `dummy`, `fast` = `dummy`
        *   Advance `fast` `n+1=3` steps: `fast` moves to node `3`.
        *   State: `slow = dummy`, `fast = node(3)`

3.  **Move Both Pointers**:
    *   Now, move both `slow` and `fast` pointers one step at a time until `fast` becomes `null`.
    *   Because `fast` was `n+1` steps ahead, when `fast` reaches `null`, `slow` will naturally be at the node *before* the Nth node from the end.
    *   Example continuation: `[1,2,3,4,5]`, `n=2`. `slow = dummy`, `fast = node(3)`
        *   1st iteration: `slow = node(1)`, `fast = node(4)`
        *   2nd iteration: `slow = node(2)`, `fast = node(5)`
        *   3rd iteration: `slow = node(3)`, `fast = null` (loop terminates)
        *   State: `slow = node(3)`. Node to remove is node `4`. `slow` is correctly positioned before it.

4.  **Remove Node**:
    *   The node to be removed is `slow.next`.
    *   Update `slow.next` to `slow.next.next`, effectively bypassing and removing the target node.

5.  **Return Head**:
    *   Return `dummy.next`. This correctly returns the head of the modified list. If the original head was removed, `dummy.next` will point to the new head. If the list becomes empty, `dummy.next` will be `null`.

**Complexity Analysis:**

*   **Time Complexity: O(L)**, where L is the length of the linked list. The `fast` pointer traverses the list once (L steps) and then both pointers traverse the remaining `L-n` steps. This is effectively a single pass.
*   **Space Complexity: O(1)**. We only use a constant number of extra pointers (`dummy`, `slow`, `fast`).

---
```