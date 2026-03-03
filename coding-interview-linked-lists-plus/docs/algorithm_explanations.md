# Detailed Algorithm Explanations

This document provides in-depth explanations for each Linked List problem implemented in this project, including step-by-step logic, key insights, and visual (ASCII art) diagrams to aid understanding.

## 1. Reverse Linked List

**Problem**: Given the head of a singly linked list, reverse the list, and return the reversed list.

### Approach 1: Iterative Method

**Logic**:
The iterative approach involves traversing the list and changing the `next` pointer of each node to point to its previous node. To do this without losing track of the rest of the list, we need three pointers:
1.  `prev`: Points to the node that was just processed and is now part of the reversed list. Initially `None`.
2.  `curr`: Points to the current node being processed from the original list. Initially `head`.
3.  `next_node`: Temporarily stores the `next` node of `curr` *before* `curr.next` is modified.

**Steps**:
1.  Initialize `prev = None` and `curr = head`.
2.  Loop while `curr` is not `None`:
    *   Store `curr.next` in `next_node`.
    *   Change `curr.next` to `prev`.
    *   Move `prev` to `curr`.
    *   Move `curr` to `next_node`.
3.  When the loop finishes, `curr` will be `None`, and `prev` will be the new head of the reversed list (the original tail).

**ASCII Art Walkthrough (1 -> 2 -> 3 -> None)**:

Initial state:
```
prev: None
curr: 1 -> 2 -> 3 -> None
next_node: ?
```

Iteration 1 (`curr` is 1):
1.  `next_node = curr.next` (2)
2.  `curr.next = prev` (1.next = None)
3.  `prev = curr` (prev = 1)
4.  `curr = next_node` (curr = 2)

State after iteration 1:
```
prev: 1 -> None
curr: 2 -> 3 -> None
next_node: 2
```

Iteration 2 (`curr` is 2):
1.  `next_node = curr.next` (3)
2.  `curr.next = prev` (2.next = 1)
3.  `prev = curr` (prev = 2)
4.  `curr = next_node` (curr = 3)

State after iteration 2:
```
prev: 2 -> 1 -> None
curr: 3 -> None
next_node: 3
```

Iteration 3 (`curr` is 3):
1.  `next_node = curr.next` (None)
2.  `curr.next = prev` (3.next = 2)
3.  `prev = curr` (prev = 3)
4.  `curr = next_node` (curr = None)

State after iteration 3:
```
prev: 3 -> 2 -> 1 -> None
curr: None
next_node: None
```

Loop ends. Return `prev` (which is 3).
Result: `3 -> 2 -> 1 -> None`

**Time Complexity**: O(N), as we visit each node exactly once.
**Space Complexity**: O(1), as we only use a few extra pointers.

### Approach 2: Recursive Method

**Logic**:
The recursive approach is often more elegant but uses stack space. The core idea is to reverse the sublist starting from `head.next`, and then append the current `head` node to the tail of that reversed sublist.

**Steps**:
1.  **Base Case**: If the list is empty (`head is None`) or has only one node (`head.next is None`), it's already reversed. Return `head`.
2.  **Recursive Step**:
    *   Recursively call the function on `head.next`. This call will return the new head of the reversed sublist (let's call it `new_head`).
    *   Now, `head.next` (the original second node) is the *last* node of the reversed sublist. We want to make it point back to the current `head`. So, `head.next.next = head`.
    *   The current `head` is now the new tail of the entire reversed list, so its `next` pointer should be `None`. Set `head.next = None`.
    *   Return `new_head` (the head of the fully reversed list).

**ASCII Art Walkthrough (1 -> 2 -> 3 -> None)**:

`reverse(1->2->3)`
  `reverse(2->3)`
    `reverse(3)`
      Base case: `3.next` is `None`. Returns `3`. (This `3` is the `new_head` for `reverse(2->3)`)
    Back in `reverse(2->3)`:
      `new_head` = `3`
      `head` = `2`
      `head.next` (which is `3`)`.next` = `head` (`2`). So `3.next = 2`. List is `3 -> 2`.
      `head.next` (`2`).next = `None`. So `2.next = None`. List is `3 -> 2 -> None`.
      Returns `3`. (This `3` is the `new_head` for `reverse(1->2->3)`)
  Back in `reverse(1->2->3)`:
    `new_head` = `3 -> 2 -> None`
    `head` = `1`
    `head.next` (which is `2`)`.next` = `head` (`1`). So `2.next = 1`. List becomes `3 -> 2 -> 1`.
    `head.next` (`1`).next = `None`. So `1.next = None`. List becomes `3 -> 2 -> 1 -> None`.
    Returns `3`.

Result: `3 -> 2 -> 1 -> None`

**Time Complexity**: O(N), as each node is visited once during the recursion unwinding.
**Space Complexity**: O(N), due to the recursion call stack. Each recursive call adds a frame to the stack, leading to a depth proportional to the list's length.

---

## 2. Merge Two Sorted Lists

**Problem**: Merge two sorted linked lists into a single sorted list.

### Approach 1: Iterative Method (Using Dummy Head)

**Logic**:
We create a dummy node which serves as a placeholder for the head of the new merged list. We then use a `current` pointer to traverse and build the merged list, always appending the smaller node from the two input lists.

**Steps**:
1.  Create a `dummy_head` node (e.g., `ListNode(0)`). This node is not part of the final list but simplifies handling the first node.
2.  Initialize `current` to `dummy_head`.
3.  Loop while both `list1` and `list2` are not `None`:
    *   If `list1.val` is less than or equal to `list2.val`:
        *   `current.next = list1`
        *   `list1 = list1.next`
    *   Else:
        *   `current.next = list2`
        *   `list2 = list2.next`
    *   Advance `current`: `current = current.next`
4.  After the loop, one of the lists might still have remaining nodes. Append the rest of the non-null list to `current.next` (e.g., `current.next = list1 or list2`). Since both input lists were sorted, the remaining portion is also sorted.
5.  Return `dummy_head.next` (the true head of the merged list).

**ASCII Art Walkthrough (list1 = 1->2->4, list2 = 1->3->4)**:

Initial state:
```
dummy_head: 0
current: 0
list1: 1 -> 2 -> 4 -> None
list2: 1 -> 3 -> 4 -> None
Merged: 0 -> None
```

Iteration 1 (list1.val=1, list2.val=1): `1 <= 1` is true.
1.  `current.next = list1` (0 -> 1)
2.  `list1 = list1.next` (list1 is now 2 -> 4)
3.  `current = current.next` (current is now 1)

State:
```
dummy_head: 0
current:      1
list1:          2 -> 4 -> None
list2:      1 -> 3 -> 4 -> None
Merged: 0 -> 1 -> None
```

Iteration 2 (list1.val=2, list2.val=1): `2 <= 1` is false.
1.  `current.next = list2` (1 -> 1)
2.  `list2 = list2.next` (list2 is now 3 -> 4)
3.  `current = current.next` (current is now 1 (the one from list2))

State:
```
dummy_head: 0
current:          1
list1:          2 -> 4 -> None
list2:              3 -> 4 -> None
Merged: 0 -> 1 -> 1 -> None
```
... and so on. This continues until one list is exhausted. The remaining part of the other list is simply appended.

**Time Complexity**: O(M + N), where M and N are the lengths of `list1` and `list2`. We iterate through both lists once.
**Space Complexity**: O(1), as we only use a few extra pointers and modify the existing nodes.

### Approach 2: Recursive Method

**Logic**:
The recursive solution works by determining which list's head should be the head of the merged list, then recursively merging the rest.

**Steps**:
1.  **Base Cases**:
    *   If `list1` is `None`, return `list2`.
    *   If `list2` is `None`, return `list1`.
2.  **Recursive Step**:
    *   If `list1.val <= list2.val`:
        *   `list1.next` should be the result of merging `list1.next` and `list2`.
        *   Return `list1`.
    *   Else:
        *   `list2.next` should be the result of merging `list1` and `list2.next`.
        *   Return `list2`.

**ASCII Art Walkthrough (list1 = 1->2, list2 = 3->4)**:

`merge(1->2, 3->4)`:
  `1.val (1) <= 3.val (3)` is true.
  `1.next` = `merge(2, 3->4)`
    `2.val (2) <= 3.val (3)` is true.
    `2.next` = `merge(None, 3->4)`
      Base case: `list1` is `None`. Returns `3->4`.
    Back in `merge(2, 3->4)`:
      `2.next` = `3->4`. So now `2->3->4`.
      Returns `2`.
  Back in `merge(1->2, 3->4)`:
    `1.next` = `2->3->4`. So now `1->2->3->4`.
    Returns `1`.

Result: `1 -> 2 -> 3 -> 4 -> None`

**Time Complexity**: O(M + N), as each node is visited once during the recursive calls.
**Space Complexity**: O(M + N), due to the recursion call stack, which can go as deep as the total number of nodes in the worst case.

---

## 3. Linked List Cycle Detection

**Problem**: Determine if a linked list has a cycle, and if so, find the starting node of the cycle and its length.

### Approach: Floyd's Tortoise and Hare (Fast and Slow Pointers)

This algorithm is a classic for cycle detection in linked lists. It uses two pointers, one moving faster than the other.

#### `hasCycle`: Detect Cycle Existence

**Logic**:
If there is a cycle, the fast pointer will eventually "catch up" to the slow pointer within the cycle. If there's no cycle, the fast pointer will reach the end of the list (None).

**Steps**:
1.  Initialize `slow` and `fast` pointers to `head`.
2.  Loop while `fast` and `fast.next` are not `None`:
    *   Move `slow` one step: `slow = slow.next`.
    *   Move `fast` two steps: `fast = fast.next.next`.
    *   If `slow == fast`, a cycle is detected. Return `True`.
3.  If the loop completes, `fast` reached `None`, meaning no cycle. Return `False`.

**ASCII Art Walkthrough (Cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle at 2))**:

Initial state:
```
slow: 1
fast: 1
```

Iteration 1:
```
slow: 2
fast: 3
```

Iteration 2:
```
slow: 3
fast: 2
```

Iteration 3:
```
slow: 4
fast: 4  <-- They meet! Cycle detected.
```

**Time Complexity**: O(N). The fast pointer traverses the list at most twice.
**Space Complexity**: O(1). Only two pointers are used.

#### `detectCycle`: Find Cycle Start Node

**Logic**:
If a cycle is detected (using the fast/slow approach), reset one pointer (e.g., `slow`) to `head`, and keep the other (`fast`) at the meeting point. Then, move both pointers one step at a time. The point where they meet again is the start of the cycle. This works due to a mathematical property: the distance from the head to the cycle start is equal to the distance from the meeting point to the cycle start, traversed *k* times the cycle length.

**Steps**:
1.  Perform the `hasCycle` steps. If no cycle, return `None`.
2.  If a cycle is detected and `slow` and `fast` have met:
    *   Reset `slow = head`.
    *   Move `slow` and `fast` one step at a time until they meet again.
    *   The node where they meet is the cycle's starting node. Return it.

**ASCII Art Walkthrough (Cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle at 2))**:

(From `hasCycle`, `slow` and `fast` meet at 4).
Initial Phase 2 state:
```
head: 1
slow: 1
fast: 4 (meeting point)
```

Move both one step:
```
Iteration 1:
slow: 2
fast: 2  <-- They meet! This is the cycle start.
```

Result: Node with value 2.

**Time Complexity**: O(N). Two phases, each O(N).
**Space Complexity**: O(1).

#### `cycleLength`: Calculate Cycle Length

**Logic**:
Once a cycle is detected and the meeting point of `slow` and `fast` is found, keep one pointer (e.g., `slow`) at the meeting point. Then, move the other pointer (`fast`) one step at a time, counting steps, until it meets `slow` again. The count will be the length of the cycle.

**Steps**:
1.  Perform the `hasCycle` steps. If no cycle, return 0.
2.  If a cycle is detected and `slow` and `fast` have met:
    *   Initialize `count = 0`.
    *   Start a `current` pointer from the meeting point (`current = slow`).
    *   Loop:
        *   Move `current = current.next`.
        *   Increment `count`.
        *   If `current == slow`, break the loop.
    *   Return `count`.

**ASCII Art Walkthrough (Cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle at 2))**:

(From `hasCycle`, `slow` and `fast` meet at 4).
Initial Phase 2 state:
```
slow: 4 (meeting point)
current: 4
count: 0
```

Move `current` one step and count until it meets `slow` again:
```
Iteration 1:
current: 2
count: 1

Iteration 2:
current: 3
count: 2

Iteration 3:
current: 4
count: 3  <-- Meets slow. Break.
```

Result: Cycle length is 3 (nodes 2, 3, 4 form the cycle).

**Time Complexity**: O(N).
**Space Complexity**: O(1).

---

## 4. Remove Nth Node From End of List

**Problem**: Remove the *n*th node from the end of a linked list and return its head.

### Approach 1: Two-pass Algorithm

**Logic**:
This approach involves two passes. The first pass calculates the total length of the list. The second pass then determines which node to remove from the beginning and skips it. A dummy node is useful to handle cases where the head needs to be removed.

**Steps**:
1.  Create a `dummy_head` pointing to the original `head`. This simplifies removing the actual head.
2.  **First Pass (Calculate Length)**: Traverse the list from `head` to count all nodes. Let this be `length`.
3.  Calculate the position of the node *before* the one to be removed from the beginning. This is `length - n` steps from the `dummy_head`.
4.  **Second Pass (Remove Node)**:
    *   Initialize a `current` pointer to `dummy_head`.
    *   Traverse `length - n` steps. `current` will now point to the node directly *before* the target node.
    *   Perform the removal: `current.next = current.next.next`.
5.  Return `dummy_head.next`.

**ASCII Art Walkthrough (1 -> 2 -> 3 -> 4 -> 5, n = 2)**:

Initial state (dummy node setup):
```
dummy_head: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
```

1.  **First Pass**: Calculate length. Length = 5.
2.  **Calculate target position**: We want to remove the 2nd from end, which is node 4.
    To remove node 4, we need to stop at node 3.
    Node 4 is at index 3 (0-indexed). `length - n = 5 - 2 = 3`. So, we need to iterate 3 steps from `dummy_head`.
3.  **Second Pass**:
    `current = dummy_head` (0)
    Move 3 steps:
    `current` moves to 1
    `current` moves to 2
    `current` moves to 3 (now `current` points to node 3)

    Remove `current.next`: `current.next = current.next.next`
    Node 3's next (4) is now set to 4's next (5).
    List becomes: `0 -> 1 -> 2 -> 3 -> 5 -> None`

Result: `1 -> 2 -> 3 -> 5 -> None`

**Time Complexity**: O(L), where L is the length of the list. We traverse the list twice.
**Space Complexity**: O(1).

### Approach 2: One-pass Algorithm (Two Pointers)

**Logic**:
This optimized approach uses two pointers, `fast` and `slow`. The `fast` pointer is advanced `n+1` steps ahead of `slow`. This creates a gap of `n` nodes. When `fast` reaches the end of the list, `slow` will be positioned exactly at the node *before* the *n*th node from the end.

**Steps**:
1.  Create a `dummy_head` pointing to the original `head`.
2.  Initialize `slow` and `fast` pointers to `dummy_head`.
3.  Advance `fast` pointer `n+1` steps. This positions `fast` `n` nodes ahead of `slow` (and ensures `slow` will stop *before* the node to be removed).
4.  Move both `fast` and `slow` one step at a time until `fast` becomes `None` (reaches the end of the list).
5.  At this point, `slow` will be pointing to the node directly *before* the one to be removed.
6.  Perform the removal: `slow.next = slow.next.next`.
7.  Return `dummy_head.next`.

**ASCII Art Walkthrough (1 -> 2 -> 3 -> 4 -> 5, n = 2)**:

Initial state:
```
dummy: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
slow:  ^
fast:  ^
```

1.  Advance `fast` `n+1 = 3` steps:
    `fast` moves to 1, then 2, then 3.
```
dummy: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
slow:  ^
fast:             ^
```

2.  Move `slow` and `fast` together until `fast` is `None`:
    Iteration 1:
    `slow` to 1, `fast` to 4
    ```
    dummy: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
    slow:       ^
    fast:                  ^
    ```
    Iteration 2:
    `slow` to 2, `fast` to 5
    ```
    dummy: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
    slow:            ^
    fast:                        ^
    ```
    Iteration 3:
    `slow` to 3, `fast` to `None`
    ```
    dummy: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> None
    slow:                 ^
    fast:                                 ^ (None)
    ```
    `fast` is now `None`. `slow` is at node 3.

3.  Remove `slow.next`:
    `slow.next` (node 4) is skipped. `slow.next` (node 3's next) now points to `node 4.next` (node 5).
    List becomes: `0 -> 1 -> 2 -> 3 -> 5 -> None`

Result: `1 -> 2 -> 3 -> 5 -> None`

**Time Complexity**: O(L), where L is the length of the list. We traverse the list once.
**Space Complexity**: O(1).

---

## 5. Palindrome Linked List

**Problem**: Check if a singly linked list is a palindrome.

### Approach 1: Optimized O(1) Space (Find Middle, Reverse Second Half, Compare)

**Logic**:
This approach leverages the fast and slow pointer technique to find the middle of the list. Once the middle is found, the second half of the list is reversed. Then, the values of the first half are compared with the values of the reversed second half. This way, we avoid using O(N) auxiliary space.

**Steps**:
1.  **Handle Edge Cases**: If the list is empty or has only one node, it's a palindrome. Return `True`.
2.  **Find the Middle**: Use `slow` and `fast` pointers.
    *   `slow` moves one step.
    *   `fast` moves two steps.
    *   When `fast` reaches the end (or `fast.next` is `None`), `slow` will be at the middle of the list.
    *   After this loop, `slow` will point to the end of the first half, or the node right before the start of the second half (if even length). The start of the second half is `slow.next`.
3.  **Reverse the Second Half**: Take the sublist starting from `slow.next` and reverse it using an iterative reversal function (e.g., `reverseList_iterative` from our `SolutionReverseList`). Let `reversed_second_half_head` be the new head of this reversed portion.
4.  **Compare**:
    *   Initialize `p1 = head` (start of the original list).
    *   Initialize `p2 = reversed_second_half_head`.
    *   Iterate while `p2` is not `None` (meaning we haven't exhausted the shorter half):
        *   If `p1.val != p2.val`, then it's not a palindrome. Return `False`.
        *   Move `p1 = p1.next` and `p2 = p2.next`.
5.  If the loop completes, all comparable nodes matched. Return `True`.
6.  (Optional but good for interview discussion): Restore the list to its original state by reversing the second half again and re-attaching it to the end of the first half.

**ASCII Art Walkthrough (1 -> 2 -> 2 -> 1)**:

Initial:
```
head: 1 -> 2 -> 2 -> 1 -> None
```

1.  **Find Middle**:
    `slow = 1`, `fast = 1`
    Iter 1: `slow = 2`, `fast = 2`
    Iter 2: `slow = 2`, `fast = None` (fast.next.next is None -> 1.next.next is 2.next.next which is 1.next.next.next which is None)
    Loop ends. `slow` is at node 2 (the first '2'). The second half starts from `slow.next` (the second '2').

2.  **Reverse Second Half**:
    `second_half_start` is `2 -> 1 -> None`.
    Reverse this: `1 -> 2 -> None`.
    `reversed_second_half_head` is `1 -> 2 -> None`.

3.  **Compare**:
    `p1 = head` (1 -> 2 -> 2 -> 1)
    `p2 = reversed_second_half_head` (1 -> 2)

    Iter 1: `p1.val (1) == p2.val (1)`. Match.
        `p1` moves to 2 (first 2). `p2` moves to 2 (second half's 2).
    Iter 2: `p1.val (2) == p2.val (2)`. Match.
        `p1` moves to 2 (second 2). `p2` moves to None.
    `p2` is `None`. Loop ends.

4.  Return `True`.

**Time Complexity**: O(N). Finding middle, reversing, and comparing all take O(N) time.
**Space Complexity**: O(1). We use a few pointers. The iterative reversal also uses O(1) space.

### Approach 2: Auxiliary O(N) Space (Using a List or Stack)

**Logic**:
This is a simpler, but less space-efficient, approach. It involves storing all the linked list values into a dynamic array (Python list) or a stack, and then checking if this auxiliary data structure forms a palindrome.

**Steps**:
1.  **Traverse and Store**: Iterate through the linked list from `head` to `None`. For each node, append its `val` to a Python list (e.g., `values`).
2.  **Check Palindrome**: Compare the `values` list with its reverse (`values[::-1]`). If they are equal, the linked list is a palindrome.

**ASCII Art Walkthrough (1 -> 2 -> 2 -> 1)**:

Initial:
```
head: 1 -> 2 -> 2 -> 1 -> None
values: []
```

1.  **Traverse and Store**:
    `current = 1`: `values = [1]`
    `current = 2`: `values = [1, 2]`
    `current = 2`: `values = [1, 2, 2]`
    `current = 1`: `values = [1, 2, 2, 1]`
    `current = None`: Loop ends.

2.  **Check Palindrome**:
    `values = [1, 2, 2, 1]`
    `values[::-1] = [1, 2, 2, 1]`
    `[1, 2, 2, 1] == [1, 2, 2, 1]` is `True`.

Result: `True`.

**Time Complexity**: O(N). Traversing the list to copy values is O(N). Checking a Python list for palindrome takes O(N).
**Space Complexity**: O(N). We store all N values in the auxiliary list.