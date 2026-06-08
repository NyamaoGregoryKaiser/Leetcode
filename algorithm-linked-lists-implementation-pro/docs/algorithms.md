```markdown
# Linked List Algorithm Explanations and Interview Guide

This document provides detailed explanations for each Linked List problem in the project, including optimal solutions, alternative approaches, time/space complexity analysis, ASCII art diagrams, edge case considerations, and interview tips.

---

## 1. Reverse Linked List

### Problem Description
Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
Output: `5 -> 4 -> 3 -> 2 -> 1 -> NULL`

### Optimal Solution: Iterative Approach

**Algorithm:**
The iterative approach uses three pointers: `prev`, `current`, and `nextTemp`.
1.  Initialize `prev` to `NULL`. This will be the new tail of the reversed list.
2.  Initialize `current` to `head`. This pointer traverses the original list.
3.  Loop while `current` is not `NULL`:
    *   Store `current.next` in `nextTemp` (to avoid losing the rest of the list).
    *   Reverse the current node's pointer: `current.next = prev`.
    *   Move `prev` to `current` (as `current` is now part of the reversed segment).
    *   Move `current` to `nextTemp` (to continue traversing the original list).
4.  After the loop, `prev` will point to the new head of the reversed list.

**ASCII Art Diagram:**

Initial state:
```
NULL <- prev   current -> nextTemp
              [1]  ->  [2]  ->  [3]  ->  NULL
               ^head
```

Iteration 1 (`current = 1`):
1. `nextTemp = 2`
2. `current.next = prev` (1.next = NULL)
3. `prev = 1`
4. `current = 2`
```
NULL <- [1] <- prev    current -> nextTemp
               ^head         [2]  ->  [3]  ->  NULL
```

Iteration 2 (`current = 2`):
1. `nextTemp = 3`
2. `current.next = prev` (2.next = 1)
3. `prev = 2`
4. `current = 3`
```
NULL <- [1] <- [2] <- prev    current -> nextTemp
                      ^head         [3]  ->  NULL
```

...and so on until `current` is `NULL`. `prev` will then be the last node (new head).

**Complexity Analysis:**
*   **Time Complexity:** O(N) where N is the number of nodes in the linked list. We iterate through the list exactly once.
*   **Space Complexity:** O(1) as we only use a few extra pointers (`prev`, `current`, `nextTemp`) regardless of the list's size.

### Alternative Solution: Recursive Approach

**Algorithm:**
The recursive approach is more elegant but consumes more stack space.
1.  **Base Case:** If the `head` is `NULL` or `head.next` is `NULL` (single node), the list is already reversed, so return `head`.
2.  **Recursive Step:**
    *   Recursively call the function for the rest of the list: `newHead = reverseLinkedListRecursive(head.next)`. This call will eventually return the *original* last node of the list.
    *   Once `newHead` is returned (e.g., from `B` for `A->B->C`), `head.next` is `B`. `B.next` is currently pointing to `C` (if not last node). We want `B.next` to point to `A`. So, `head.next.next = head`.
    *   The original `head` (e.g., `A`) is now the last node in its segment, so its `next` pointer should be set to `NULL`: `head.next = NULL`.
    *   Return `newHead`.

**Complexity Analysis:**
*   **Time Complexity:** O(N). Each node is visited once during the recursion.
*   **Space Complexity:** O(N) due to the recursion stack. In the worst case, the stack depth can be N, which can lead to stack overflow for very long lists in languages with limited call stack size.

### Edge Cases and Gotchas

*   **Empty List:** `head` is `NULL`. Both iterative and recursive solutions handle this correctly by returning `NULL`.
*   **Single Node List:** `head.next` is `NULL`. Both solutions return `head`, which is correct.
*   **Two Node List:** Works as expected.
*   **Cycles:** This problem assumes a simple singly linked list without cycles. If a cycle exists, the iterative solution would enter an infinite loop, and the recursive solution would lead to a stack overflow.

### Interview Tips and Variations

*   **Clarifying Questions:**
    *   Is it a singly or doubly linked list? (Assumed singly).
    *   Are there any cycles? (Assumed no).
    *   What are the constraints on the number of nodes? (For stack space consideration).
*   **Walkthrough:** Explain the pointer movements clearly, especially for the iterative solution. Use an example like `1 -> 2 -> 3`.
*   **Complexity:** State and justify the time and space complexity for both approaches.
*   **Trade-offs:** Discuss the trade-offs between iterative (O(1) space) and recursive (O(N) space, potential stack overflow) solutions. Iterative is generally preferred for production code for this reason.
*   **Variations:**
    *   **Reverse a sublist:** Reverse nodes from position M to N.
    *   **Reverse a linked list in k-groups:** Reverse every k nodes.
    *   **Reverse a doubly linked list:** Simpler as you have `prev` pointers.

---

## 2. Detect Cycle in Linked List

### Problem Description
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `NULL`.

**Example:**
Input: `head = [3,2,0,-4]`, `pos = 1` (tail points to node at index 1, i.e., value 2)
Output: Node with value 2.

**ASCII Art Diagram:**
```
[3] -> [2] -> [0] -> [-4]
        ^            |
        |____________|
```

### Optimal Solution: Floyd's Tortoise and Hare (Two-Pointer Algorithm)

**Algorithm:**
This algorithm consists of two phases:

**Phase 1: Detect Cycle**
1.  Initialize two pointers, `slow` and `fast`, both starting at `head`.
2.  Move `slow` one step at a time (`slow = slow.next`).
3.  Move `fast` two steps at a time (`fast = fast.next.next`).
4.  If `slow` and `fast` meet at any point, a cycle is detected. Break the loop.
5.  If `fast` or `fast.next` becomes `NULL`, there is no cycle. Return `NULL`.

**Phase 2: Find Cycle Start**
1.  Once `slow` and `fast` meet (cycle detected), reset `slow` back to `head`.
2.  Now, move both `slow` and `fast` one step at a time.
3.  The point where they meet again is the start of the cycle. Return this node.

**Why Phase 2 works (Mathematical Proof Sketch):**
Let `L` be the total length of the list, `F` be the length of the non-cyclic part, and `C` be the length of the cyclic part.
When `slow` and `fast` meet for the first time inside the cycle:
*   `slow` has traveled `F + x` steps (where `x` is the distance into the cycle from its start).
*   `fast` has traveled `F + x + nC` steps (where `n` is the number of full cycles `fast` completed).
*   Since `fast` moves twice as fast as `slow`: `2 * (F + x) = F + x + nC`
*   Simplifying: `F + x = nC`
*   Rearranging: `F = nC - x`
*   This can be written as: `F = (n-1)C + (C - x)`
*   `C - x` is the remaining distance in the cycle from the meeting point back to the cycle start.
*   This equation means that the distance from the head to the cycle start (`F`) is equal to the distance from the meeting point to the cycle start (plus any full cycles, which doesn't affect the meeting point).
*   Therefore, if one pointer starts at `head` (`F` distance away from cycle start) and another pointer starts at the meeting point (`C - x` distance away from cycle start), and both move one step at a time, they will meet exactly at the cycle's starting node.

**ASCII Art Diagram (Phase 1: Detect Cycle):**

Initial:
```
H [1] -> [2] -> [3] -> [4] -> [5]
^head
^slow, ^fast
```

After 1 step:
```
H [1] -> [2] -> [3] -> [4] -> [5]
        ^slow  ^fast
```

After 2 steps:
```
H [1] -> [2] -> [3] -> [4] -> [5]
                ^slow         ^fast
```

...If there's a cycle, they will eventually meet.

**ASCII Art Diagram (Phase 2: Find Cycle Start):**

Suppose `slow` and `fast` met at node `M`.
```
H [1] -> [2] -> [3] -> [4] -> [5] -> [6] -> [7]
^head         ^start                    ^M (meeting point)
```

Reset `slow` to `head`, `fast` stays at `M`.
Move `slow` and `fast` one step at a time:
```
Iteration 1:
slow = [1], fast = [7]

Iteration 2:
slow = [2], fast = [8] (assume 8 is next after 7 in cycle)

Iteration 3:
slow = [3], fast = [9] (assume 9 is next after 8)
... they will eventually meet at the cycle start (e.g. node 3 in the diagram if the cycle is 3->4->5->6->7->8->9->3)
```

**Complexity Analysis:**
*   **Time Complexity:** O(N) where N is the number of nodes in the linked list.
    *   Phase 1: `fast` can traverse at most 2N steps (if no cycle, fast reaches end; if cycle, it will meet slow within 2C steps after entering the cycle). `slow` traverses N steps. Overall O(N).
    *   Phase 2: `slow` traverses F steps, `fast` traverses (C - x) steps, then they meet at cycle start. Overall O(N).
*   **Space Complexity:** O(1) as we only use a few extra pointers.

### Alternative Solution: Using a Hash Set

**Algorithm:**
1.  Initialize a `Set` (or hash table) to store visited nodes.
2.  Iterate through the linked list with a `current` pointer.
3.  In each step:
    *   Check if `current` is already in the `Set`. If yes, a cycle is detected, and `current` is the starting node of the cycle. Return `current`.
    *   If not, add `current` to the `Set`.
    *   Move `current` to `current.next`.
4.  If `current` becomes `NULL`, the end of the list is reached, and no cycle exists. Return `NULL`.

**Complexity Analysis:**
*   **Time Complexity:** O(N). In the worst case (no cycle or cycle detected at the very end), we iterate through all N nodes. Set insertion and lookup operations take O(1) on average.
*   **Space Complexity:** O(N). In the worst case (no cycle), we store all N nodes in the Set. This can be problematic for very large lists due to memory limits.

### Edge Cases and Gotchas

*   **Empty List:** `head` is `NULL`. Both solutions return `NULL`.
*   **Single Node List:** `head -> NULL`. No cycle possible. Both return `NULL`.
*   **Single Node with Self-Loop:** `head -> head`. Both correctly identify `head` as the cycle start.
*   **Two Node List:** `1 -> 2 -> NULL` (no cycle), `1 -> 2 -> 1` (cycle at 1). Both solutions handle these.
*   **Long List:** The Set approach consumes O(N) space which might be an issue. Floyd's algorithm is superior here.

### Interview Tips and Variations

*   **Clarifying Questions:**
    *   Can the list be empty or have a single node?
    *   What are the constraints on the number of nodes? (For space complexity choice).
*   **Walkthrough:** Explain the movement of `slow` and `fast` pointers with a small example. Clearly distinguish between the two phases.
*   **Complexity:** Emphasize why Floyd's algorithm is O(1) space, making it optimal.
*   **Trade-offs:** Discuss the space-time trade-off between the Set approach (simpler to implement, O(N) space) and Floyd's algorithm (more complex to derive, O(1) space).
*   **Variations:**
    *   **Length of the cycle:** Once `slow` and `fast` meet, fix one pointer and move the other around the cycle, counting nodes until they meet again.
    *   **Finding the node before the cycle start:** Can be useful for breaking the cycle.

---

## 3. Merge Two Sorted Lists

### Problem Description
You are given the heads of two sorted singly linked lists `list1` and `list2`. Merge the two lists into a single `sorted` list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Example:**
Input: `list1 = [1,2,4]`, `list2 = [1,3,4]`
Output: `[1,1,2,3,4,4]`

### Optimal Solution: Iterative Approach

**Algorithm:**
The iterative approach uses a `dummyHead` and a `current` pointer to build the new merged list.
1.  Create a `dummyHead` node (e.g., `new ListNode(0)`). This node simplifies the logic for adding the first element to the merged list.
2.  Initialize a `current` pointer to `dummyHead`. This pointer will always point to the last node added to the merged list.
3.  Loop while both `list1` and `list2` are not `NULL`:
    *   Compare `list1.val` and `list2.val`.
    *   If `list1.val <= list2.val`:
        *   Append `list1` to the merged list: `current.next = list1`.
        *   Advance `list1`: `list1 = list1.next`.
    *   Else (`list2.val` is smaller):
        *   Append `list2` to the merged list: `current.next = list2`.
        *   Advance `list2`: `list2 = list2.next`.
    *   Always advance `current` to the newly appended node: `current = current.next`.
4.  After the loop, one of the lists might still have remaining nodes (because the other became `NULL`). Since these remaining nodes are already sorted and larger than all nodes merged so far, simply append the rest of that list to the `current.next`:
    *   If `list1` is not `NULL`, `current.next = list1`.
    *   If `list2` is not `NULL`, `current.next = list2`.
5.  Return `dummyHead.next` (the actual head of the merged list).

**ASCII Art Diagram:**

Initial state:
```
dummy -> NULL
^current

list1: [1] -> [2] -> [4] -> NULL
list2: [1] -> [3] -> [4] -> NULL
```

Iteration 1 (`list1.val=1`, `list2.val=1`):
`list1.val <= list2.val` is true.
`current.next = list1` (dummy.next = 1)
`list1` moves to `2`. `current` moves to `1`.
```
dummy -> [1] -> NULL
         ^current

list1: [2] -> [4] -> NULL
list2: [1] -> [3] -> [4] -> NULL
```

Iteration 2 (`list1.val=2`, `list2.val=1`):
`list1.val <= list2.val` is false.
`current.next = list2` (1.next = 1)
`list2` moves to `3`. `current` moves to `1`.
```
dummy -> [1] -> [1] -> NULL
                ^current

list1: [2] -> [4] -> NULL
list2: [3] -> [4] -> NULL
```
...and so on.

**Complexity Analysis:**
*   **Time Complexity:** O(M + N) where M and N are the number of nodes in `list1` and `list2` respectively. In the worst case, we traverse each node from both lists exactly once.
*   **Space Complexity:** O(1) as we only use a few extra pointers (`dummyHead`, `current`) and don't create new nodes, only re-link existing ones.

### Alternative Solution: Recursive Approach

**Algorithm:**
The recursive approach leverages the sorted nature of the lists.
1.  **Base Cases:**
    *   If `list1` is `NULL`, return `list2`.
    *   If `list2` is `NULL`, return `list1`.
2.  **Recursive Step:**
    *   Compare `list1.val` and `list2.val`.
    *   If `list1.val <= list2.val`:
        *   `list1`'s current node is the head of the merged list for this subproblem.
        *   Recursively merge the rest of `list1` (`list1.next`) with `list2`.
        *   Set `list1.next` to the result of this recursive call.
        *   Return `list1`.
    *   Else (`list2.val` is smaller):
        *   `list2`'s current node is the head of the merged list for this subproblem.
        *   Recursively merge `list1` with the rest of `list2` (`list2.next`).
        *   Set `list2.next` to the result of this recursive call.
        *   Return `list2`.

**Complexity Analysis:**
*   **Time Complexity:** O(M + N). Each node is visited and compared exactly once across all recursive calls.
*   **Space Complexity:** O(M + N) due to the recursion stack. In the worst case, the stack depth can be M + N (e.g., if one list is much longer and its elements are always chosen first). This can lead to stack overflow for very long lists.

### Edge Cases and Gotchas

*   **Both lists empty:** Both solutions return `NULL`.
*   **One list empty:** The non-empty list is returned directly.
*   **Single node lists:** Handled correctly.
*   **Duplicate values:** The `<= ` comparison ensures stability (elements from `list1` appear first if values are equal).
*   **All elements from one list smaller:** The loop continues until one list is exhausted, then the remainder of the other list is appended correctly.

### Interview Tips and Variations

*   **Clarifying Questions:**
    *   Are the lists guaranteed to be sorted? (Assumed yes).
    *   What to do with duplicate values? (Usually, keep all of them).
    *   What are the constraints on list lengths? (For stack space).
*   **Walkthrough:** Illustrate with an example like `[1, 3]` and `[2, 4]` for both iterative and recursive.
*   **Complexity:** Compare the space complexities and discuss the practical implications of recursion stack for very large lists. Iterative is generally preferred.
*   **Variations:**
    *   **Merge K sorted lists:** Can be solved using a min-heap or by repeatedly merging two lists at a time.
    *   **Merge two unsorted lists:** No simple optimal solution; typically requires sorting the combined list or using a hash table to count frequencies.

---

## 4. Remove Nth Node From End of List

### Problem Description
Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

**Example:**
Input: `head = [1,2,3,4,5]`, `n = 2`
Output: `[1,2,3,5]` (Node with value 4 is removed)

### Optimal Solution: Two-Pointer (One-Pass) Approach

**Algorithm:**
This approach makes a single pass through the linked list using two pointers, `fast` and `slow`. A `dummyHead` is used to simplify edge cases.
1.  Create a `dummyHead` node pointing to the original `head`. This allows us to handle the case where the head itself needs to be removed.
2.  Initialize `fast` and `slow` pointers to `dummyHead`.
3.  Advance `fast` pointer `n + 1` steps from `dummyHead`. This creates a gap of `n` nodes between `fast` and `slow`. (If `fast` starts at `head`, it would be `n` steps. Starting at `dummyHead` means `fast` is `n` steps ahead of `slow` when `slow` is at `head`).
4.  Move both `fast` and `slow` pointers one step at a time until `fast` reaches `NULL` (the end of the list).
5.  When `fast` is `NULL`, `slow` will be pointing to the node *before* the `nth` node from the end. This is because the `n`-node gap has been maintained.
6.  To remove the `nth` node from the end, update `slow.next` to `slow.next.next`, effectively bypassing the node.
7.  Return `dummyHead.next` as the new head of the list.

**ASCII Art Diagram:**

Initial state (remove 2nd from end, `n=2`):
```
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> NULL
^slow
^fast
```

Advance `fast` `n+1=3` steps:
```
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> NULL
^slow                   ^fast
```

Move both `slow` and `fast` simultaneously until `fast` is `NULL`:
```
After 1 step:
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> NULL
         ^slow               ^fast

After 2 steps:
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> NULL
                ^slow                      ^fast

After 3 steps (fast is now NULL):
dummy -> [1] -> [2] -> [3] -> [4] -> [5] -> NULL
                       ^slow                     ^fast (NULL)
```
`slow` is at `[3]`. The node to remove is `slow.next` (`[4]`).
Set `slow.next = slow.next.next` (`[3].next = [5]`).

Result:
```
dummy -> [1] -> [2] -> [3] -> [5] -> NULL
```

**Complexity Analysis:**
*   **Time Complexity:** O(L) where L is the length of the linked list. The `fast` pointer traverses L times (or L+1 with dummy). The `slow` pointer traverses (L - n) times. Overall, it's a single pass.
*   **Space Complexity:** O(1) as we only use a few extra pointers (`dummyHead`, `slow`, `fast`).

### Alternative Solution: Two-Pass Approach

**Algorithm:**
This approach involves two passes through the linked list.
1.  Create a `dummyHead` node pointing to the original `head`.
2.  **First Pass:** Traverse the entire list to calculate its total length `L`.
3.  Calculate the position from the beginning (0-indexed) of the node *before* the one to remove. If we want to remove the `nth` node from the end, which is the `(L - n + 1)`-th node from the beginning, we need to reach the `(L - n)`-th node from the beginning.
    *   `nodesToTraverse = L - n`.
4.  **Second Pass:** Initialize a `current` pointer to `dummyHead`.
5.  Traverse `current` `nodesToTraverse` steps forward.
6.  `current` will now be pointing to the node *before* the node to be removed.
7.  Remove the node: `current.next = current.next.next`.
8.  Return `dummyHead.next`.

**Complexity Analysis:**
*   **Time Complexity:** O(L). We traverse the list completely twice. This is still O(L) but less efficient in terms of actual operations than the one-pass solution.
*   **Space Complexity:** O(1) as we only use a few extra pointers and variables.

### Edge Cases and Gotchas

*   **Removing the Head (`n = L`):**
    *   The `dummyHead` pattern elegantly handles this. If `n = L`, `slow` will end up at `dummyHead`, and `slow.next` (`dummyHead.next`) will be the original head. Updating `dummyHead.next` correctly removes it.
*   **Removing the Tail (`n = 1`):** Works correctly.
*   **Single Node List (`[1]`, `n = 1`):** The list becomes empty (`NULL`). `dummyHead.next` becomes `NULL`.
*   **`n` is larger than the list length:** Problem constraints usually guarantee `n` is valid. If not, the `fast` pointer might become `NULL` prematurely in the one-pass, or `nodesToTraverse` could be negative in the two-pass, requiring error handling.

### Interview Tips and Variations

*   **Clarifying Questions:**
    *   Is `n` always valid (i.e., within the bounds of the list length)? (Typically, yes).
    *   Can the list be empty? (Problem usually implies non-empty).
*   **Walkthrough:** Explain both approaches with an example. The two-pointer (one-pass) solution is usually preferred for its elegance and better constant factor performance.
*   **Complexity:** Clearly state and justify the O(L) time and O(1) space for both, but highlight why one-pass is generally better.
*   **Variations:**
    *   **Find middle of linked list:** This is a special case of the two-pointer technique (`fast` moves twice, `slow` moves once). When `fast` reaches the end, `slow` is at the middle.
    *   **Remove all nodes with a specific value:** Different problem, usually requires a dummy head and careful pointer manipulation.
    *   **Delete the Nth node (from the beginning):** Much simpler, just traverse `N-1` steps and then `current.next = current.next.next`.

---

## 5. Add Two Numbers

### Problem Description
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**
Input: `l1 = [2,4,3]` (represents 342), `l2 = [5,6,4]` (represents 465)
Output: `[7,0,8]` (represents 807)

### Optimal Solution: Iterative Approach

**Algorithm:**
This approach simulates manual column-wise addition with a carry-over, iterating through both lists simultaneously.
1.  Create a `dummyHead` node (e.g., `new ListNode(0)`) to simplify the construction of the result list.
2.  Initialize a `current` pointer to `dummyHead`. This pointer will always point to the last node added to the result list.
3.  Initialize a `carry` variable to `0`.
4.  Loop while `l1` is not `NULL`, or `l2` is not `NULL`, or `carry` is not `0`. This ensures all digits and any final carry are processed.
5.  Inside the loop:
    *   Get the value of the current digit from `l1`. If `l1` is `NULL`, use `0`. Advance `l1` to `l1.next` if it's not `NULL`.
    *   Get the value of the current digit from `l2`. If `l2` is `NULL`, use `0`. Advance `l2` to `l2.next` if it's not `NULL`.
    *   Calculate the `sum` of `val1 + val2 + carry`.
    *   Update `carry` for the next iteration: `carry = Math.floor(sum / 10)`.
    *   Create a new node with the digit `sum % 10` and append it to `current.next`.
    *   Advance `current` to this newly created node: `current = current.next`.
6.  After the loop, return `dummyHead.next`.

**ASCII Art Diagram:**

Input: `l1 = [2,4,3]`, `l2 = [5,6,4]` (numbers 342 + 465)

Initial:
```
dummy -> NULL
^current
carry = 0

l1: [2] -> [4] -> [3] -> NULL
^l1

l2: [5] -> [6] -> [4] -> NULL
^l2
```

Iteration 1 (l1=2, l2=5, carry=0):
`sum = 2 + 5 + 0 = 7`
`carry = floor(7/10) = 0`
`digit = 7 % 10 = 7`
`current.next = new ListNode(7)`
`current` moves to `7`. `l1` moves to `4`. `l2` moves to `6`.
```
dummy -> [7] -> NULL
         ^current
carry = 0

l1: [4] -> [3] -> NULL
l2: [6] -> [4] -> NULL
```

Iteration 2 (l1=4, l2=6, carry=0):
`sum = 4 + 6 + 0 = 10`
`carry = floor(10/10) = 1`
`digit = 10 % 10 = 0`
`current.next = new ListNode(0)`
`current` moves to `0`. `l1` moves to `3`. `l2` moves to `4`.
```
dummy -> [7] -> [0] -> NULL
                ^current
carry = 1

l1: [3] -> NULL
l2: [4] -> NULL
```

Iteration 3 (l1=3, l2=4, carry=1):
`sum = 3 + 4 + 1 = 8`
`carry = floor(8/10) = 0`
`digit = 8 % 10 = 8`
`current.next = new ListNode(8)`
`current` moves to `8`. `l1` moves to `NULL`. `l2` moves to `NULL`.
```
dummy -> [7] -> [0] -> [8] -> NULL
                       ^current
carry = 0

l1: NULL
l2: NULL
```
Loop ends because `l1`, `l2`, and `carry` are all 0.
Return `dummyHead.next` which is `[7,0,8]`.

**Complexity Analysis:**
*   **Time Complexity:** O(max(M, N)) where M and N are the number of nodes in `l1` and `l2` respectively. We iterate through the longer of the two lists once.
*   **Space Complexity:** O(max(M, N)) because a new linked list is created to store the sum. In the worst case (e.g., adding 99 + 1), the result list can be one node longer than the longer input list.

### Alternative Solution: Recursive Approach

**Algorithm:**
The recursive approach processes digits from right to left (least significant to most significant), passing the `carry` through recursive calls. A helper function is typically used.
1.  **Helper Function `_addTwoNumbersRecursive(l1, l2, carry)`:**
    *   **Base Case:** If both `l1` and `l2` are `NULL` and `carry` is `0`, return `NULL` (end of addition).
    *   Get `val1` (from `l1` or `0` if `l1` is `NULL`) and `val2` (from `l2` or `0` if `l2` is `NULL`).
    *   Calculate `sum = val1 + val2 + carry`.
    *   Create a `newNode` with `sum % 10`.
    *   Recursively call `_addTwoNumbersRecursive` for `l1.next`, `l2.next`, and `Math.floor(sum / 10)` to get the `next` node for `newNode`.
    *   Set `newNode.next` to the result of the recursive call.
    *   Return `newNode`.
2.  **Main Function `addTwoNumbersRecursive(l1, l2)`:**
    *   Simply call the helper function: `return _addTwoNumbersRecursive(l1, l2, 0)`.

**Complexity Analysis:**
*   **Time Complexity:** O(max(M, N)). Each pair of digits is processed once.
*   **Space Complexity:** O(max(M, N)) due to the recursion stack. The depth of the recursion can be up to `max(M, N) + 1` (for the final carry). This can lead to stack overflow for very long lists.

### Edge Cases and Gotchas

*   **Empty lists:** Problem states non-empty, but if `0` is allowed (`[0]`), it's handled.
*   **Lists of different lengths:** The logic of using `0` for exhausted lists handles this correctly.
*   **Final carry-over:** If the last addition results in a carry (e.g., `9 + 1 = 10`), an extra node is correctly added to the result list.
*   **Numbers containing zero:** E.g., `[0,1]` (10) + `[0,1]` (10) = `[0,2]` (20). Works as expected.

### Interview Tips and Variations

*   **Clarifying Questions:**
    *   Are the numbers non-negative? (Yes, stated).
    *   Are leading zeros allowed (other than for the number 0 itself)? (No, stated).
    *   What are the constraints on the number of nodes? (For stack space).
*   **Walkthrough:** Explain the iterative solution using the example. It's more straightforward to reason about than recursion for this problem.
*   **Complexity:** Discuss the space complexity of creating a new list. Highlight the O(1) auxiliary space (excluding result list) for iterative vs O(N) for recursive.
*   **Variations:**
    *   **Digits stored in forward order:** This is significantly harder. You would typically need to reverse the lists first (or use recursion to reach the end and sum from there, passing carry back up), then add, and potentially reverse the result.
    *   **Add two numbers represented as strings:** Convert to linked lists, then apply this algorithm, or use array-based arithmetic.
    *   **Large numbers (BigInt):** This problem is essentially a manual implementation of BigInt addition using linked lists.

---
```