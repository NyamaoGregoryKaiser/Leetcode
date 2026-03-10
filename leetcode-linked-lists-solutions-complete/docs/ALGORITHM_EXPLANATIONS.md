# Algorithm Explanations

This document provides detailed explanations for the algorithms implemented in this project, including their logic, why certain approaches are optimal, and their time and space complexity analyses.

---

## 1. Reverse Linked List

**Problem:** Given the `head` of a singly linked list, reverse the list, and return the reversed list.

### 1.1. Iterative Approach (Optimal for Space)

*   **Logic:** This approach processes each node exactly once, reversing its `next` pointer. It uses three pointers to keep track of the current node, the previous node, and the next node in the original list.
    1.  Initialize `prev` to `null` (this will eventually be the new head).
    2.  Initialize `current` to `head` (the node being processed).
    3.  Loop while `current` is not `null`:
        *   Store `current.next` in a temporary variable (`nextTemp`) to avoid losing the rest of the list.
        *   Change `current.next` to point to `prev`, effectively reversing the link.
        *   Move `prev` to `current` (the node just processed becomes the new 'previous').
        *   Move `current` to `nextTemp` (move to the next node in the original list).
    4.  After the loop, `prev` will point to the last node of the original list, which is now the head of the reversed list.

*   **Why it's Optimal (for Space):** It performs the reversal in-place by manipulating existing pointers without requiring additional data structures proportional to the input size.

*   **Time Complexity:** `O(N)`
    *   We traverse the list exactly once, visiting each node.

*   **Space Complexity:** `O(1)`
    *   We only use a few constant-space pointers (`prev`, `current`, `nextTemp`).

### 1.2. Recursive Approach

*   **Logic:** The recursive solution leverages the call stack to manage the reversal.
    1.  **Base Case:** If the list is empty (`head` is `null`) or has only one node (`head.next` is `null`), it's already reversed. Return `head`.
    2.  **Recursive Step:**
        *   Recursively call the function for `head.next`. This call will reverse the sublist starting from the second node and return its new head (let's call it `restReversedHead`).
        *   Now, `head` is the first node of the original list. `head.next` is the original second node, which is now the *tail* of the `restReversedHead` list.
        *   To link `head` to the end of the `restReversedHead` list, we set `head.next.next = head`.
        *   Finally, `head` (the original first node) is now the *last* node of the reversed list, so its `next` pointer must be set to `null`: `head.next = null`.
        *   Return `restReversedHead` as it is the head of the fully reversed list.

*   **Trade-offs:** Elegant and concise but comes with a memory cost.

*   **Time Complexity:** `O(N)`
    *   Each node is visited once during the recursive calls.

*   **Space Complexity:** `O(N)`
    *   Due to the recursion call stack, in the worst case (a long list), `N` stack frames might be created. This can lead to a stack overflow for very long lists in some environments.

---

## 2. Merge Two Sorted Lists

**Problem:** Given the heads of two sorted linked lists `list1` and `list2`, merge them into a single **sorted** list.

### 2.1. Iterative Approach (Optimal for Space and Common Use)

*   **Logic:** This approach builds the merged list by iteratively comparing the current nodes of `list1` and `list2` and appending the smaller one to the new list.
    1.  Create a `dummy` node. This simplifies the logic by providing a consistent starting point for the merged list, avoiding special handling for the first node.
    2.  Initialize a `current` pointer to `dummy`. This pointer will track the tail of the merged list.
    3.  Loop while both `list1` and `list2` are not `null`:
        *   Compare `list1.val` and `list2.val`.
        *   Append the node with the smaller value to `current.next`.
        *   Advance the pointer of the list from which the node was taken (e.g., if `list1.val` was smaller, `list1 = list1.next`).
        *   Advance `current` to `current.next` (the newly added node).
    4.  After the loop, one of the lists might have remaining nodes (because it's longer). Append the non-null remainder to `current.next`.
    5.  Return `dummy.next`, which is the actual head of the merged list.

*   **Why it's Optimal:** It's efficient in both time and space and is generally preferred in iterative contexts.

*   **Time Complexity:** `O(M + N)`
    *   Where `M` and `N` are the number of nodes in `list1` and `list2` respectively. Each node from both lists is visited and processed exactly once.

*   **Space Complexity:** `O(1)`
    *   Only a few constant-space pointers (`dummyHead`, `current`, `list1`, `list2`) are used. The existing nodes are re-wired, not new ones created (except the dummy).

### 2.2. Recursive Approach

*   **Logic:** The recursive solution elegantly breaks down the problem.
    1.  **Base Cases:**
        *   If `list1` is `null`, return `list2` (nothing from `list1` to merge).
        *   If `list2` is `null`, return `list1` (nothing from `list2` to merge).
    2.  **Recursive Step:**
        *   Compare `list1.val` and `list2.val`.
        *   If `list1.val <= list2.val`: The head of the merged list will be `list1`. Recursively merge `list1.next` with `list2`, and attach the result to `list1.next`. Return `list1`.
        *   Else (`list2.val` is smaller): The head of the merged list will be `list2`. Recursively merge `list1` with `list2.next`, and attach the result to `list2.next`. Return `list2`.

*   **Trade-offs:** More concise, but incurs call stack overhead.

*   **Time Complexity:** `O(M + N)`
    *   Each recursive call processes one node, and there are `M+N` nodes in total.

*   **Space Complexity:** `O(M + N)`
    *   Due to the recursion call stack depth. In the worst case, if one list is much longer, the stack depth can be `M+N`.

---

## 3. Detect Cycle in Linked List

**Problem:** Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

### 3.1. Floyd's Tortoise and Hare (Fast and Slow Pointers) (Optimal for Space)

*   **Logic:** This algorithm is famously used for cycle detection and finding the cycle's starting point with minimal space. It consists of two phases:

    **Phase 1: Detect Cycle**
    1.  Initialize two pointers, `slow` and `fast`, both starting at `head`.
    2.  Move `slow` one step at a time (`slow = slow.next`).
    3.  Move `fast` two steps at a time (`fast = fast.next.next`).
    4.  If `fast` or `fast.next` becomes `null`, there is no cycle, return `null`.
    5.  If `slow` and `fast` meet (point to the same node), a cycle is detected. Proceed to Phase 2.

    **Phase 2: Find Cycle Start**
    1.  Once `slow` and `fast` meet at an `intersection` node within the cycle.
    2.  Reset `slow` back to `head`.
    3.  Move both `slow` and `fast` one step at a time.
    4.  The node where they meet *again* is the starting node of the cycle.

*   **Why it works (Mathematical Proof):**
    *   Let `L` be the distance from the head to the start of the cycle.
    *   Let `C` be the length of the cycle.
    *   Let `K` be the distance from the cycle start to the `intersection` point (where `slow` and `fast` first meet).
    *   When `slow` and `fast` meet:
        *   `slow` has traveled `L + K` steps.
        *   `fast` has traveled `L + K + nC` steps (where `n` is some integer, as `fast` completed `n` full cycles more than `slow`).
    *   Since `fast` travels twice as fast: `2 * (L + K) = L + K + nC`.
    *   Simplifying, we get: `L + K = nC`.
    *   Rearranging: `L = nC - K`.
    *   This can be rewritten as `L = (n-1)C + (C - K)`.
    *   This equation means that `L` (distance from head to cycle start) is equal to `(C - K)` plus some multiples of `C`.
    *   Therefore, if you move one pointer from the `head` (`L` steps) and another from the `intersection` point (`C - K` steps), they will both reach the cycle start simultaneously. By moving both `slow` (from `head`) and `fast` (from `intersection`) one step at a time, they are effectively covering these distances and will meet at the cycle's entry point.

*   **Time Complexity:** `O(N)`
    *   In Phase 1, `fast` traverses at most `2N` nodes, and `slow` traverses `N` nodes.
    *   In Phase 2, both pointers traverse at most `N` nodes. Total `O(N)`.

*   **Space Complexity:** `O(1)`
    *   Only a few constant-space pointers are used.

### 3.2. Hash Set Approach (Brute Force / Extra Space)

*   **Logic:** This approach is simpler to understand but uses more memory.
    1.  Initialize an empty `Set` (or `HashSet` in other languages) to store `ListNode` objects.
    2.  Traverse the linked list using a `current` pointer starting from `head`.
    3.  In each step:
        *   Check if `current` is `null`. If so, the end of the list is reached, meaning no cycle. Return `null`.
        *   Check if `current` is already present in the `Set`. If it is, this `current` node is the first node encountered twice, which means it's the start of the cycle. Return `current`.
        *   If `current` is not in the `Set`, add it to the `Set` and move `current` to `current.next`.

*   **Trade-offs:** Simple to implement but uses linear space.

*   **Time Complexity:** `O(N)`
    *   Each node is visited once. `Set` operations (add, has) take average `O(1)` time.

*   **Space Complexity:** `O(N)`
    *   In the worst case (no cycle or a very long cycle), all `N` nodes might be stored in the hash set.

---

## 4. Remove Nth Node From End of List

**Problem:** Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head.

### 4.1. One-Pass (Two-Pointer Approach) (Optimal)

*   **Logic:** This approach uses two pointers, `fast` and `slow`, to accomplish the task in a single traversal.
    1.  Create a `dummy` node and point its `next` to `head`. This is crucial for handling edge cases, especially when the node to be removed is the actual `head` of the list.
    2.  Initialize `fast` and `slow` pointers to the `dummy` node.
    3.  Move `fast` `n+1` steps forward. This ensures that when `fast` reaches the end of the list, `slow` will be exactly one node *before* the node to be removed.
        *   The `+1` is because `slow` needs to stop at the node *preceding* the one to be removed, so it can bypass it. If `fast` moves `n` steps, `slow` will be at the node to be removed.
    4.  Now, move both `fast` and `slow` one step at a time until `fast` reaches `null` (i.e., it has traversed the entire list).
    5.  At this point, `slow` is pointing to the node *before* the `n`-th node from the end.
    6.  Bypass the `n`-th node from the end: `slow.next = slow.next.next`.
    7.  Return `dummy.next` (the head of the potentially modified list).

*   **Why it's Optimal:** It requires only one pass through the linked list, making it very efficient in terms of time.

*   **Time Complexity:** `O(L)`
    *   Where `L` is the number of nodes in the linked list. The `fast` pointer traverses the list once (initially `n+1` steps, then `L-n-1` steps with `slow`).

*   **Space Complexity:** `O(1)`
    *   Only a few constant-space pointers (`dummy`, `fast`, `slow`) are used.

### 4.2. Two-Pass Approach (Less Optimal)

*   **Logic:** This approach first determines the length of the list and then makes a second pass to find and remove the target node.
    1.  Create a `dummy` node and point its `next` to `head` (for handling head removal).
    2.  **First Pass:** Traverse the entire list to count the total number of nodes (`length`).
    3.  Calculate the 0-indexed position of the node to be removed from the *beginning* of the list: `indexToRemove = length - n`.
    4.  **Second Pass:** Initialize a `current` pointer to the `dummy` node. Traverse `indexToRemove` steps. `current` will now point to the node *before* the one to be removed.
    5.  Bypass the node: `current.next = current.next.next`.
    6.  Return `dummy.next`.

*   **Trade-offs:** Easier to reason about for some, but less efficient due to two full traversals.

*   **Time Complexity:** `O(L)`
    *   Where `L` is the number of nodes. We traverse the list twice.

*   **Space Complexity:** `O(1)`
    *   Only a few constant-space variables (`dummy`, `length`, `current`) are used.

---