```markdown
# Algorithms Explanation: Linked Lists

This document provides detailed explanations, ASCII art diagrams, and complexity analysis for the core Linked List algorithms implemented in `main_algorithms/linked_list_problems.py`.

---

## 1. Reverse Linked List

### Problem Statement
Given the `head` of a singly linked list, reverse the list, and return the reversed list.

### 1.1 Iterative Approach (`reverse_list_iterative`)

**Approach:**
The iterative approach uses three pointers: `prev`, `curr`, and `next_temp`. `curr` iterates through the list. For each `curr` node, we first store its `next` node in `next_temp` (because we're about to change `curr.next`). Then, we reverse `curr.next` to point to `prev`. Finally, we advance `prev` to `curr` and `curr` to `next_temp` to continue the process.

**Algorithm Steps:**
1.  Initialize `prev = None`. This will be the new tail of the list and eventually the new head.
2.  Initialize `curr = head`. This pointer will traverse the original list.
3.  While `curr` is not `None`:
    *   `next_temp = curr.next`: Store the next node to ensure we don't lose the rest of the list.
    *   `curr.next = prev`: Reverse the current node's pointer to point to the `prev` node.
    *   `prev = curr`: Move `prev` one step forward, it now points to the node that was `curr`.
    *   `curr = next_temp`: Move `curr` one step forward, to the node that was originally next.
4.  After the loop, `curr` will be `None`, and `prev` will be pointing to the last node of the original list, which is now the new head. Return `prev`.

**ASCII Diagram (Iteration):**

Initial:
```
None <- prev   curr -> Node1 -> Node2 -> Node3 -> None
             ^ next_temp
```

Step 1 (curr = Node1):
```
None <- prev   curr -> Node1 -> Node2 -> Node3 -> None
             ^          ^
             |          | (next_temp points to Node2)
             ------------- (curr.next points to prev)
```
After advancing pointers:
```
None <- Node1 <- prev   curr -> Node2 -> Node3 -> None
                         ^ next_temp
```

Step 2 (curr = Node2):
```
None <- Node1 <- prev   curr -> Node2 -> Node3 -> None
                         ^          ^
                         |          | (next_temp points to Node3)
                         ------------- (curr.next points to prev)
```
After advancing pointers:
```
None <- Node1 <- Node2 <- prev   curr -> Node3 -> None
                                  ^ next_temp
```
...and so on.

**Time Complexity:** O(N), where N is the number of nodes in the linked list. Each node is visited exactly once.
**Space Complexity:** O(1), as only a few extra pointers (`prev`, `curr`, `next_temp`) are used, independent of the list size.

### 1.2 Recursive Approach (`reverse_list_recursive`)

**Approach:**
The recursive approach hinges on the idea that if you can reverse the sublist starting from `head.next`, then you just need to correctly link `head` into that reversed sublist.

**Algorithm Steps:**
1.  **Base Case:** If `head` is `None` (empty list) or `head.next` is `None` (single node list), the list is already "reversed". Return `head`.
2.  **Recursive Step:**
    *   `new_head = reverse_list_recursive(head.next)`: This call will reverse the sublist starting from `head.next` and return the new head of that reversed sublist. `new_head` will be the ultimate head of the fully reversed list.
    *   `head.next.next = head`: This is the crucial step. The node that was originally `head.next` (let's call it `second_node`) is now the tail of the `new_head`'s reversed sublist. We make `second_node` point back to `head`.
    *   `head.next = None`: The original `head` node is now the tail of the entire reversed list, so its `next` pointer must be `None`.
3.  Return `new_head`.

**ASCII Diagram (Recursion for `1->2->3`):**

Initial Call: `reverse_list_recursive(1)`
  Call: `reverse_list_recursive(2)`
    Call: `reverse_list_recursive(3)`
      Base Case: `head=3`, `head.next=None`. Returns `3`.
    Returns `new_head = 3` to `reverse_list_recursive(2)`
    Inside `reverse_list_recursive(2)`:
      `head` is `2`. `head.next` is `3`. `new_head` is `3`.
      `head.next.next = head` becomes `3.next = 2`.  List is now `3 -> 2`.
      `head.next = None` becomes `2.next = None`. List is now `3 -> 2 -> None`.
    Returns `new_head = 3` to `reverse_list_recursive(1)`
  Inside `reverse_list_recursive(1)`:
    `head` is `1`. `head.next` is `2`. `new_head` is `3`.
    `head.next.next = head` becomes `2.next = 1`. List is now `3 -> 2 -> 1`.
    `head.next = None` becomes `1.next = None`. List is now `3 -> 2 -> 1 -> None`.
  Returns `new_head = 3`.

Final result: `3 -> 2 -> 1 -> None`.

**Time Complexity:** O(N). Each node is visited and processed once during the recursion unwinding.
**Space Complexity:** O(N) due to the recursion call stack. In the worst case, the stack depth can be N.

---

## 2. Detect Cycle in Linked List

### Problem Statement
Given the `head` of a linked list, return `true` if the list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.

### 2.1 Cycle Detection (`has_cycle`) - Floyd's Tortoise and Hare

**Approach:**
This classic algorithm uses two pointers: a 'slow' pointer that moves one step at a time, and a 'fast' pointer that moves two steps at a time. If there's a cycle, the fast pointer will eventually "lap" the slow pointer and they will meet inside the cycle. If there's no cycle, the fast pointer (or its `next`) will reach `None`.

**Algorithm Steps:**
1.  Initialize `slow = head` and `fast = head`.
2.  While `fast` is not `None` and `fast.next` is not `None`:
    *   `slow = slow.next`: Move `slow` one step.
    *   `fast = fast.next.next`: Move `fast` two steps.
    *   If `slow == fast`, a cycle is detected. Return `True`.
3.  If the loop finishes (because `fast` or `fast.next` became `None`), it means no cycle was found. Return `False`.

**ASCII Diagram:**

No Cycle:
```
H -> A -> B -> C -> D -> None
S    F
     S    F
          S    F
               S    F  (Fast reaches None)
```

Cycle:
```
H -> A -> B -> C -> D
          ^         |
          |---------|
S    F
     S    F
          S         F (B.next = C, C.next = D, D.next = B)
          S         F (Slow moves to C, Fast moves to D.next which is B)
          S         F (Slow moves to D, Fast moves to B.next which is C)
          S    F    (Slow moves to B, Fast moves to C.next which is D)
          S    F    (Slow moves to C, Fast moves to D.next which is B)
          S    F    (Slow moves to D, Fast moves to B.next which is C)
          ^    ^    (They meet at some point within the cycle)
          |----|
```

**Time Complexity:** O(N). In the worst case, the fast pointer traverses the entire list, and then potentially some part of the cycle before meeting the slow pointer.
**Space Complexity:** O(1). Only two pointers are used.

### 2.2 Finding Cycle Start (`detect_cycle_start`)

**Approach:**
This builds upon the Tortoise and Hare algorithm. Once a cycle is detected (i.e., `slow == fast`), we know there's a cycle. To find its starting node:
1.  Keep one pointer at the meeting point (`fast` or `slow`).
2.  Move the *other* pointer back to the `head`.
3.  Move both pointers one step at a time. The point where they meet again will be the start of the cycle.

**Why this works (Intuition/Proof Sketch):**
Let `D` be the distance from the head to the start of the cycle.
Let `L` be the length of the cycle.
Let `K` be the distance from the cycle start to the meeting point (within the cycle).

When `slow` and `fast` meet:
*   `slow` has traveled `D + K` steps.
*   `fast` has traveled `D + K + m*L` steps (where `m` is an integer representing full cycle traversals by `fast`).
*   Since `fast` moves twice as fast as `slow`: `2 * (D + K) = D + K + m*L`
*   Simplifying: `D + K = m*L`
*   Rearranging for `D`: `D = m*L - K`. This can also be written as `D = (m-1)*L + (L-K)`.

This last form `D = (m-1)*L + (L-K)` implies that the distance `D` from the head to the cycle start is equivalent to traversing `m-1` full cycles and then traveling `L-K` distance from the meeting point. Since `L-K` is the remaining distance from the meeting point to the cycle start *going around the cycle*, it means that if one pointer starts at `head` and another at `meeting_point`, and both move one step, they will meet exactly at the cycle's starting node.

**ASCII Diagram:**

```
H -> A -> B -> C -> D -> E
          ^              |
          |--------------|
          (Cycle starts at B)

1. Find Meeting Point:
   H -> A -> B -> C -> D -> E
   S    F
        S    F
             S    F
             S         F (Slow=C, Fast=E)
                  S    F (Slow=D, Fast=B) -- Let's say they meet at D (K=2 from B)
Meeting Point = D

2. Find Cycle Start:
   H -> A -> B -> C -> D -> E
   P1                P2 (Start P1 at H, P2 at D)

   P1: H -> A
   P2: D -> E

   P1: A -> B
   P2: E -> B (They meet at B!)
```

**Time Complexity:** O(N). Two passes over the list in the worst case (one to detect cycle, one to find start).
**Space Complexity:** O(1). Only a few pointers are used.

---

## 3. Merge Two Sorted Linked Lists

### Problem Statement
Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

### 3.1 Iterative Approach (`merge_two_lists_iterative`)

**Approach:**
We use a dummy node (also known as a sentinel node) to simplify handling the head of the new merged list. A `current` pointer tracks the tail of the merged list, and we append the smaller of the two list heads to it.

**Algorithm Steps:**
1.  Create a `dummy_head = ListNode(0)`. This node does not contain actual data but acts as a placeholder.
2.  Initialize `current = dummy_head`. This pointer will move along the merged list.
3.  While both `l1` and `l2` are not `None`:
    *   Compare `l1.val` and `l2.val`.
    *   If `l1.val <= l2.val`, append `l1` to `current.next` and advance `l1 = l1.next`.
    *   Else, append `l2` to `current.next` and advance `l2 = l2.next`.
    *   Always advance `current = current.next` to the newly added node.
4.  After the loop, one of the lists might have remaining elements (because the other became `None`). Attach the rest of the non-empty list to `current.next`.
5.  Return `dummy_head.next` (the actual head of the merged list).

**ASCII Diagram:**

`l1 = [1,2,4]`, `l2 = [1,3,4]`

Initial:
```
Dummy -> None
^
current
l1 -> 1 -> 2 -> 4 -> None
l2 -> 1 -> 3 -> 4 -> None
```

Step 1 (l1.val=1, l2.val=1, choose l1 first):
```
Dummy -> 1 -> None
         ^
         current
l1 -> 2 -> 4 -> None
l2 -> 1 -> 3 -> 4 -> None
```

Step 2 (l1.val=2, l2.val=1, choose l2):
```
Dummy -> 1 -> 1 -> None
              ^
              current
l1 -> 2 -> 4 -> None
l2 -> 3 -> 4 -> None
```

Step 3 (l1.val=2, l2.val=3, choose l1):
```
Dummy -> 1 -> 1 -> 2 -> None
                   ^
                   current
l1 -> 4 -> None
l2 -> 3 -> 4 -> None
```
... and so on.

**Time Complexity:** O(N + M), where N and M are the lengths of `l1` and `l2` respectively. Each node from both lists is visited exactly once.
**Space Complexity:** O(1). We are modifying existing pointers and only use a few extra variables. The new list uses the nodes from the input lists.

### 3.2 Recursive Approach (`merge_two_lists_recursive`)

**Approach:**
The recursive approach defines the merge operation in terms of smaller merge operations.
The base cases handle empty lists. The recursive step compares the head of the two lists, picks the smaller one as the head of the current merged segment, and recursively merges the rest.

**Algorithm Steps:**
1.  **Base Cases:**
    *   If `l1` is `None`, return `l2`.
    *   If `l2` is `None`, return `l1`.
2.  **Recursive Step:**
    *   If `l1.val <= l2.val`:
        *   The current head of the merged list is `l1`.
        *   Recursively call `merge_two_lists_recursive(l1.next, l2)` to merge the rest of `l1` with `l2`.
        *   Set `l1.next` to the result of this recursive call.
        *   Return `l1`.
    *   Else (`l2.val < l1.val`):
        *   The current head of the merged list is `l2`.
        *   Recursively call `merge_two_lists_recursive(l1, l2.next)` to merge `l1` with the rest of `l2`.
        *   Set `l2.next` to the result of this recursive call.
        *   Return `l2`.

**Time Complexity:** O(N + M). Each recursive call performs constant work and processes one node from either list.
**Space Complexity:** O(N + M) due to the recursion call stack. In the worst case (e.g., lists alternate elements), the depth of the stack can be N + M.

---

## 4. Remove Nth Node From End of List

### Problem Statement
Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

### Approach: Two Pointers (Single Pass) (`remove_nth_from_end`)

**Approach:**
A single-pass solution uses two pointers, `slow` and `fast`, to maintain a gap of `n` nodes between them. By moving `fast` `n+1` steps ahead initially, `slow` will naturally stop at the node *before* the one to be removed when `fast` reaches the end of the list. This "one-step-behind" positioning is crucial for linked list deletion, as you need access to the preceding node to modify pointers.

**Algorithm Steps:**
1.  Create a `dummy_head = ListNode(0)`. Set `dummy_head.next = head`. This handles the edge case where the head node itself needs to be removed.
2.  Initialize `slow = dummy_head` and `fast = dummy_head`.
3.  Move `fast` `n+1` steps forward. This establishes the desired `n`-node gap, ensuring `slow` is in the correct position when `fast` terminates.
    *   If `fast` becomes `None` during this step (meaning `n` is greater than or equal to the list length), this indicates an invalid `n` or an empty list scenario not covered by standard problem constraints. For LeetCode, `n` is usually guaranteed valid.
4.  Move both `slow` and `fast` one step forward at a time, until `fast` reaches `None` (the end of the list).
5.  At this point, `slow` will be pointing to the node *immediately before* the `nth` node from the end.
6.  Perform the deletion: `slow.next = slow.next.next`. This effectively bypasses the node `slow.next` (which is the `nth` node from the end), removing it from the list.
7.  Return `dummy_head.next`.

**ASCII Diagram:**

`head = [1, 2, 3, 4, 5]`, `n = 2` (Remove 4)

Initial:
```
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> None
^        ^
slow     fast
```

Move `fast` `n+1 = 3` steps ahead:
```
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> None
^                  ^
slow               fast
```

Move `slow` and `fast` together until `fast` reaches `None`:
```
Dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> None
                   ^                  ^
                   slow               fast (after moving 3 steps)
```
In this state, `slow` points to `3`. `slow.next` is `4` (the node to be removed). `slow.next.next` is `5`.

Deletion: `slow.next = slow.next.next`
```
Dummy -> 1 -> 2 -> 3 -> 5 -> None
```
The node `4` is bypassed and effectively removed.

**Time Complexity:** O(N), where N is the number of nodes. Both pointers traverse the list at most once.
**Space Complexity:** O(1). Only a few extra pointers are used.

---

## 5. Add Two Numbers (as Linked Lists)

### Problem Statement
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**
`l1 = [2,4,3]` (represents 342)
`l2 = [5,6,4]` (represents 465)
Output: `[7,0,8]` (represents 807)

### Approach: Iterative with Carry

**Approach:**
This problem simulates the manual process of adding two numbers column by column, starting from the least significant digit (which is the head of the linked lists due to reverse order). We maintain a `carry` variable that propagates through the addition.

**Algorithm Steps:**
1.  Create a `dummy_head = ListNode(0)`. This will be the starting point of our result list.
2.  Initialize `current = dummy_head` and `carry = 0`.
3.  Loop while `l1` is not `None` OR `l2` is not `None` OR `carry` is not `0`. This condition ensures we continue as long as there are digits to add from either list or a pending carry.
4.  Inside the loop:
    *   Get the value of the current node from `l1` (`val1`). If `l1` is `None`, treat `val1` as 0.
    *   Get the value of the current node from `l2` (`val2`). If `l2` is `None`, treat `val2` as 0.
    *   Calculate `total_sum = val1 + val2 + carry`.
    *   Update `carry = total_sum // 10` (integer division gives the carry-over).
    *   The digit for the new node is `digit = total_sum % 10` (remainder gives the current digit).
    *   Create a new `ListNode(digit)` and set `current.next` to this new node.
    *   Advance `current = current.next`.
    *   If `l1` is not `None`, advance `l1 = l1.next`.
    *   If `l2` is not `None`, advance `l2 = l2.next`.
5.  After the loop, return `dummy_head.next`, which is the head of the sum linked list.

**ASCII Diagram:**

`l1 = [2,4,3]`, `l2 = [5,6,4]`

Initial:
```
Dummy -> None
^
current
carry = 0

l1: 2 -> 4 -> 3 -> None
l2: 5 -> 6 -> 4 -> None
```

Iteration 1 (2 + 5, carry=0):
`val1 = 2`, `val2 = 5`, `carry = 0`
`total_sum = 2 + 5 + 0 = 7`
`carry = 7 // 10 = 0`
`digit = 7 % 10 = 7`
`current.next = ListNode(7)`, `current` moves to `7`.

```
Dummy -> 7 -> None
              ^
              current
carry = 0

l1: 4 -> 3 -> None
l2: 6 -> 4 -> None
```

Iteration 2 (4 + 6, carry=0):
`val1 = 4`, `val2 = 6`, `carry = 0`
`total_sum = 4 + 6 + 0 = 10`
`carry = 10 // 10 = 1`
`digit = 10 % 10 = 0`
`current.next = ListNode(0)`, `current` moves to `0`.

```
Dummy -> 7 -> 0 -> None
                   ^
                   current
carry = 1

l1: 3 -> None
l2: 4 -> None
```

Iteration 3 (3 + 4, carry=1):
`val1 = 3`, `val2 = 4`, `carry = 1`
`total_sum = 3 + 4 + 1 = 8`
`carry = 8 // 10 = 0`
`digit = 8 % 10 = 8`
`current.next = ListNode(8)`, `current` moves to `8`.

```
Dummy -> 7 -> 0 -> 8 -> None
                        ^
                        current
carry = 0

l1: None
l2: None
```

Loop condition (`l1 or l2 or carry`) is now false.
Return `dummy_head.next` which is `7 -> 0 -> 8`.

**Time Complexity:** O(max(N, M)), where N and M are the lengths of `l1` and `l2`. We iterate through the longer list at most once.
**Space Complexity:** O(max(N, M)). A new linked list is created to store the sum, which will have a length of at most `max(N, M) + 1` (in case of an extra carry digit).
```