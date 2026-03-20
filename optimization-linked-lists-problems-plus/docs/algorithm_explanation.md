```markdown
# Detailed Algorithm Explanations for Linked List Problems

This document provides in-depth explanations for each Linked List problem implemented in the `LinkedListProblems.java` class. It covers the problem statement, various approaches (including brute force and optimized solutions), step-by-step logic, ASCII art diagrams for visualization, and a thorough analysis of time and space complexity, along with potential edge cases and "gotchas."

---

## 1. Problem: Reverse Linked List

**Problem Statement:**
Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Example:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> null`
Output: `5 -> 4 -> 3 -> 2 -> 1 -> null`

---

### Approach 1.1: Iterative Solution

**Logic:**
The iterative approach involves traversing the list and, for each node, changing its `next` pointer to point to the `previous` node. We use three pointers to manage this process:
1.  `prev`: Stores the node that was just processed (its `next` pointer has already been reversed). Initially `null`.
2.  `current`: The node currently being processed. Its `next` pointer will be reversed in the current step. Initially `head`.
3.  `nextTemp`: A temporary pointer to store `current.next` *before* `current.next` is modified. This is crucial to avoid losing the rest of the list.

**Step-by-Step:**

Let's trace with `1 -> 2 -> 3 -> null`:

**Initial State:**
`prev = null`
`current = 1`
`head = 1`

```
null <- prev
          |
         current
           |
           1 -> 2 -> 3 -> null
```

**Iteration 1 (current = 1):**
1.  `nextTemp = current.next` (which is `2`).
2.  `current.next = prev` (so, `1.next` becomes `null`).
3.  `prev = current` (so, `prev` becomes `1`).
4.  `current = nextTemp` (so, `current` becomes `2`).

```
           prev
             |
null <- 1    2 -> 3 -> null
             |
            current
nextTemp -> 2
```

**Iteration 2 (current = 2):**
1.  `nextTemp = current.next` (which is `3`).
2.  `current.next = prev` (so, `2.next` becomes `1`).
3.  `prev = current` (so, `prev` becomes `2`).
4.  `current = nextTemp` (so, `current` becomes `3`).

```
                prev
                  |
null <- 1 <- 2    3 -> null
                  |
                 current
nextTemp -> 3
```

**Iteration 3 (current = 3):**
1.  `nextTemp = current.next` (which is `null`).
2.  `current.next = prev` (so, `3.next` becomes `2`).
3.  `prev = current` (so, `prev` becomes `3`).
4.  `current = nextTemp` (so, `current` becomes `null`).

```
                     prev
                       |
null <- 1 <- 2 <- 3    null
                       |
                      current
nextTemp -> null
```

**Loop ends (current is null).**
Return `prev`, which is `3`. The list is `3 -> 2 -> 1 -> null`.

**Time Complexity:** O(N), where N is the number of nodes in the linked list. We traverse the list once.
**Space Complexity:** O(1) auxiliary space, as we only use a few extra pointers.

**Edge Cases & Gotchas:**
*   **Empty list:** `head` is `null`. The loop won't run, `prev` remains `null`, correctly returned.
*   **Single node list:** `head` points to a single node. `current.next` becomes `null`, `prev` becomes the single node, `current` becomes `null`. Correctly returns the single node.
*   **Two nodes:** Handles correctly, `2->1`.

---

### Approach 1.2: Recursive Solution

**Logic:**
The recursive approach leverages the call stack. The base cases handle an empty list or a single-node list. For a list with two or more nodes, it recursively reverses the rest of the list and then adjusts the pointers.

**Step-by-Step:**

Let's trace with `1 -> 2 -> 3 -> null`:

`reverseListRecursive(head=1)`:
1.  `head=1`, `head.next=2`. Not base case.
2.  Call `reverseListRecursive(head.next=2)`. This call will return the new head of the sublist `2 -> 3 -> null` reversed, which is `3`.
    *   `reverseListRecursive(head=2)`:
        1.  `head=2`, `head.next=3`. Not base case.
        2.  Call `reverseListRecursive(head.next=3)`.
            *   `reverseListRecursive(head=3)`:
                1.  `head=3`, `head.next=null`. Base case. Returns `3`.
            *   `reversedHead = 3`.
            *   `head.next.next = head` becomes `2.next.next = 2` -> `3.next = 2`.
            *   `head.next = null` becomes `2.next = null`.
            *   Current state: `null <- 2 <- 3`. Returns `3`.
    *   `reversedHead = 3`.
    *   `head.next.next = head` becomes `1.next.next = 1` -> `2.next = 1`.
    *   `head.next = null` becomes `1.next = null`.
    *   Current state: `null <- 1 <- 2 <- 3`. Returns `3`.

**Final Result:** `3` is returned, and the list structure is `3 -> 2 -> 1 -> null`.

**Time Complexity:** O(N), where N is the number of nodes. Each node is processed once (when returning from recursion).
**Space Complexity:** O(N) due to the recursion call stack. For very large N, this could lead to a `StackOverflowError`.

**Edge Cases & Gotchas:**
*   **Empty list / Single node list:** Handled by the base case, correctly returning `head`.
*   **Stack Overflow:** For extremely long linked lists (e.g., millions of nodes), the recursion depth might exceed the JVM's stack limit. The iterative solution is safer in such scenarios.

---

## 2. Problem: Merge Two Sorted Lists

**Problem Statement:**
Given the heads of two sorted linked lists `list1` and `list2`, merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Example:**
Input: `list1 = 1 -> 2 -> 4 -> null`, `list2 = 1 -> 3 -> 4 -> null`
Output: `1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null`

---

### Approach 2.1: Iterative Solution

**Logic:**
This method merges two sorted linked lists into a single sorted linked list iteratively. It uses a `dummyHead` node to simplify the logic of appending to the merged list. This avoids special handling for the first node.

**Step-by-Step:**

Let's trace with `list1 = 1 -> 2 -> 4 -> null`, `list2 = 1 -> 3 -> 4 -> null`

**Initial State:**
`dummyHead = 0` (placeholder node)
`current = dummyHead`
`list1 = 1 -> 2 -> 4 -> null`
`list2 = 1 -> 3 -> 4 -> null`

```
dummyHead (0) -> null
   ^ current
```

**Iteration 1 (list1.val = 1, list2.val = 1):**
*   `list1.val <= list2.val` is true.
*   `current.next = list1` (`0.next` becomes `1`).
*   `list1` advances to `2`.
*   `current` advances to `1`.

```
dummyHead (0) -> 1 -> null
                 ^ current
list1 = 2 -> 4 -> null
list2 = 1 -> 3 -> 4 -> null
```

**Iteration 2 (list1.val = 2, list2.val = 1):**
*   `list1.val <= list2.val` is false.
*   `current.next = list2` (`1.next` becomes `1` (from list2)).
*   `list2` advances to `3`.
*   `current` advances to `1` (from list2).

```
dummyHead (0) -> 1 (from L1) -> 1 (from L2) -> null
                                ^ current
list1 = 2 -> 4 -> null
list2 = 3 -> 4 -> null
```

**Iteration 3 (list1.val = 2, list2.val = 3):**
*   `list1.val <= list2.val` is true.
*   `current.next = list1` (`1.next` becomes `2`).
*   `list1` advances to `4`.
*   `current` advances to `2`.

```
dummyHead (0) -> 1 -> 1 -> 2 -> null
                            ^ current
list1 = 4 -> null
list2 = 3 -> 4 -> null
```

...and so on. The process continues until one of the lists becomes `null`.
Finally, if `list1` is not `null`, `current.next = list1`. If `list2` is not `null`, `current.next = list2`.

**End State:**
`dummyHead (0) -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null`
Return `dummyHead.next`.

**Time Complexity:** O(M + N), where M and N are the lengths of `list1` and `list2` respectively. We iterate through both lists once.
**Space Complexity:** O(1) auxiliary space, as we only use a few extra pointers.

**Edge Cases & Gotchas:**
*   **Both lists empty:** `list1` and `list2` are `null`. `dummyHead.next` is `null`, correctly returned.
*   **One list empty:** The loop won't run, and the non-null list will be appended correctly.
*   **Lists of different lengths:** Handled naturally as the remaining nodes of the longer list are simply appended.

---

### Approach 2.2: Recursive Solution

**Logic:**
The recursive approach makes choices at each step and then delegates the rest of the merging to recursive calls.

**Step-by-Step:**

Let's trace with `list1 = 1 -> 2 -> 4 -> null`, `list2 = 1 -> 3 -> 4 -> null`

`mergeTwoListsRecursive(list1=1, list2=1)`:
1.  `list1.val (1) <= list2.val (1)` is true.
2.  `list1.next = mergeTwoListsRecursive(list1.next=2, list2=1)`.
    *   `mergeTwoListsRecursive(list1=2, list2=1)`:
        1.  `list1.val (2) <= list2.val (1)` is false.
        2.  `list2.next = mergeTwoListsRecursive(list1=2, list2.next=3)`.
            *   `mergeTwoListsRecursive(list1=2, list2=3)`:
                1.  `list1.val (2) <= list2.val (3)` is true.
                2.  `list1.next = mergeTwoListsRecursive(list1.next=4, list2=3)`.
                    *   `mergeTwoListsRecursive(list1=4, list2=3)`:
                        1.  `list1.val (4) <= list2.val (3)` is false.
                        2.  `list2.next = mergeTwoListsRecursive(list1=4, list2.next=4)`.
                            *   `mergeTwoListsRecursive(list1=4, list2=4)`:
                                1.  `list1.val (4) <= list2.val (4)` is true.
                                2.  `list1.next = mergeTwoListsRecursive(list1.next=null, list2=4)`.
                                    *   `mergeTwoListsRecursive(list1=null, list2=4)`:
                                        1.  Base case: `list1` is null. Returns `list2` (which is `4`).
                                    *   `list1.next` (original `4`) becomes `4` (from list2).
                                    *   Return `list1` (original `4`). So `4 -> 4 -> null`.
                                *   `list2.next` (original `3`) becomes `4` (from list1).
                                *   Return `list2` (original `3`). So `3 -> 4 -> 4 -> null`.
                            *   `list1.next` (original `2`) becomes `3`.
                            *   Return `list1` (original `2`). So `2 -> 3 -> 4 -> 4 -> null`.
                        *   `list2.next` (original `1` from list2) becomes `2`.
                        *   Return `list2` (original `1` from list2). So `1 -> 2 -> 3 -> 4 -> 4 -> null`.
                    *   `list1.next` (original `1` from list1) becomes `1`.
                    *   Return `list1` (original `1` from list1). So `1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null`.

**Final Result:** Returns the head of the merged list.

**Time Complexity:** O(M + N), where M and N are the lengths of `list1` and `list2`. Each comparison and pointer adjustment processes one node, and we visit all nodes.
**Space Complexity:** O(M + N) due to the recursion call stack. In the worst case (e.g., one list much longer than the other), the stack depth can be M+N.

**Edge Cases & Gotchas:**
*   **Empty lists:** Base cases handle `null` inputs correctly.
*   **Stack Overflow:** For very long lists, the recursion depth might cause a `StackOverflowError`. The iterative solution is generally preferred for production code for this reason, especially if list lengths are unknown or can be very large.

---

## 3. Problem: Detect Cycle and Find Cycle Start

**Problem Statement:**
Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.
A cycle exists if continuously following the `next` pointer leads back to a previously visited node.

**Example:**
Input: `3 -> 2 -> 0 -> -4 -> 2 (cycle back to 2)`
Output: Node with value `2`

---

### Approach 3.1: Using a HashSet

**Logic:**
This method traverses the linked list, storing each visited node in a `HashSet`. If it encounters a node that is already in the set, it means a cycle is detected, and that node is the start of the cycle.

**Step-by-Step:**

Let's trace with `1 -> 2 -> 3 -> 4 -> 2 (cycle back to 2)`

**Initial State:**
`visitedNodes = {}`
`current = 1`

**Iteration 1 (current = 1):**
*   `visitedNodes` does not contain `1`.
*   Add `1` to `visitedNodes`. `visitedNodes = {1}`.
*   `current` moves to `2`.

**Iteration 2 (current = 2):**
*   `visitedNodes` does not contain `2`.
*   Add `2` to `visitedNodes`. `visitedNodes = {1, 2}`.
*   `current` moves to `3`.

**Iteration 3 (current = 3):**
*   `visitedNodes` does not contain `3`.
*   Add `3` to `visitedNodes`. `visitedNodes = {1, 2, 3}`.
*   `current` moves to `4`.

**Iteration 4 (current = 4):**
*   `visitedNodes` does not contain `4`.
*   Add `4` to `visitedNodes`. `visitedNodes = {1, 2, 3, 4}`.
*   `current` moves to `2` (due to cycle).

**Iteration 5 (current = 2):**
*   `visitedNodes` *does* contain `2`.
*   Cycle detected! Return `current` (which is `2`).

**Time Complexity:** O(N), where N is the number of nodes in the linked list. In the worst case (no cycle or cycle at the very end), we visit each node once. `HashSet` operations (add, contains) take O(1) on average.
**Space Complexity:** O(N), as in the worst case (no cycle), we store all N nodes in the hash set.

**Edge Cases & Gotchas:**
*   **Empty list / Single node list:** `null` or single node list will correctly return `null` as no cycle will be detected.
*   **Cycle at head:** The head node itself will be detected as the cycle start on its second visit.
*   **Performance vs. Memory:** This approach is simple to implement but uses O(N) space. For very large lists, this might be a concern.

---

### Approach 3.2: Floyd's Tortoise and Hare (Fast and Slow Pointers)

**Logic:**
This is an optimized approach that uses two pointers, a "slow" pointer and a "fast" pointer, to solve the problem in O(1) space.

**Phase 1: Detect Cycle**
*   `slow` pointer moves one step at a time.
*   `fast` pointer moves two steps at a time.
*   If there's a cycle, `fast` will eventually catch `slow` within the cycle. If `fast` reaches `null` (or `fast.next` is `null`), there's no cycle.

**Phase 2: Find Cycle Start**
*   Once `slow` and `fast` meet in Phase 1, reset `slow` to the `head` of the list.
*   Keep `fast` at the meeting point.
*   Move both `slow` and `fast` one step at a time.
*   The point where they meet *again* is the start of the cycle.

**Mathematical Proof for Phase 2 (Intuition):**
Let:
*   `L` = distance from `head` to the cycle start.
*   `C` = length of the cycle.
*   `D` = distance from cycle start to the meeting point (where `slow` and `fast` first meet).

When `slow` and `fast` meet:
*   `slow` has traveled `L + D` steps.
*   `fast` has traveled `L + D + k*C` steps (where `k` is some integer, `fast` completed `k` full cycles).
*   Since `fast` moves twice as fast as `slow`: `2 * (L + D) = L + D + k*C`
*   Simplifying: `L + D = k*C`

This means the distance `L + D` is a multiple of the cycle length `C`.
Now, consider `slow` starting from `head` and `fast` starting from the meeting point.
*   `slow` needs to travel `L` steps to reach the cycle start.
*   `fast` is at `D` distance from cycle start. To reach the cycle start, `fast` needs to travel `C - D` steps (or `C - D + C`, etc.).
*   Since `L + D = k*C`, we can say `L = k*C - D`.
*   If `slow` travels `L` steps, it reaches the cycle start.
*   If `fast` travels `L` steps from its meeting point, it also reaches `k*C - D` steps from its current position. Since its current position is `D` steps into the cycle, `fast` effectively reaches `D + (k*C - D) = k*C` steps from the cycle start. This position `k*C` steps from the cycle start is the cycle start itself.
*   Therefore, moving both at the same pace, they will meet exactly at the cycle's starting node.

**Step-by-Step (Simplified Trace):**
List: `1 -> 2 -> 3 -> 4 -> 5 -> 3 (cycle back to 3)`

**Phase 1: Detect Cycle**

**Initial:**
`slow = 1`, `fast = 1`

**Steps:**
| Step | Slow   | Fast     | Meeting? |
| :--- | :----- | :------- | :------- |
| 0    | 1      | 1        | No       |
| 1    | 2      | 3        | No       |
| 2    | 3      | 5        | No       |
| 3    | 4      | 4        | Yes! (`slow` and `fast` meet at node 4) |

Cycle detected! Meeting point is `4`.

**Phase 2: Find Cycle Start**

**Initial:**
`pointer1 = head (1)`
`pointer2 = meeting_point (4)`

**Steps:**
| Step | Pointer 1 | Pointer 2 | Meeting? |
| :--- | :-------- | :-------- | :------- |
| 0    | 1         | 4         | No       |
| 1    | 2         | 5         | No       |
| 2    | 3         | 3         | Yes! (`pointer1` and `pointer2` meet at node 3) |

Cycle start is `3`.

**Time Complexity:** O(N), where N is the number of nodes in the linked list. Both pointers traverse the list at most twice.
**Space Complexity:** O(1) auxiliary space, as we only use a few extra pointers. This is superior to the HashSet approach in terms of memory.

**Edge Cases & Gotchas:**
*   **Empty list / Single node list:** Handled by initial `null` checks. `fast` or `fast.next` would become null, correctly indicating no cycle.
*   **Cycle at head:** `1 -> 1 (cycle)`. `slow` and `fast` both start at 1. `fast` moves to `1.next.next` (which is `1`). They meet at `1`. Then `pointer1` starts at `1`, `pointer2` starts at `1`. They immediately meet at `1`, correctly returning `1`.
*   **Loop Length:** Floyd's algorithm works regardless of the cycle length or its position.

---

## 4. Problem: Remove Nth Node From End of List

**Problem Statement:**
Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

**Constraints:**
*   The number of nodes in the list is `sz`.
*   `1 <= sz <= 30`
*   `0 <= Node.val <= 100`
*   `1 <= n <= sz`

**Example:**
Input: `head = 1 -> 2 -> 3 -> 4 -> 5 -> null`, `n = 2`
Output: `1 -> 2 -> 3 -> 5 -> null`

---

### Approach 4.1: Two-Pass Solution

**Logic:**
This approach involves two passes through the linked list:
1.  **First Pass:** Traverse the entire list to calculate its total length (`sz`).
2.  **Second Pass:** Determine the 0-indexed position of the node to remove from the *beginning* of the list. This is `length - n`. Then, traverse to the node *just before* the one to be removed and adjust its `next` pointer to skip the `nth` node from the end.

**Step-by-Step:**

Let's trace with `head = 1 -> 2 -> 3 -> 4 -> 5 -> null`, `n = 2`

**Phase 1: Calculate Length**
*   `current = 1`, `length = 0`
*   `1`: `length = 1`, `current = 2`
*   `2`: `length = 2`, `current = 3`
*   `3`: `length = 3`, `current = 4`
*   `4`: `length = 4`, `current = 5`
*   `5`: `length = 5`, `current = null`
*   Loop ends. `length = 5`.

**Phase 2: Remove Node**
*   `length = 5`, `n = 2`.
*   Node to remove is at index `length - n = 5 - 2 = 3` (0-indexed) from the beginning. This is node `4`.
*   We need to stop at the node *before* index 3, which is index `2` (node `3`).
*   `indexToDeleteFromStart = 3`.

**Initial:**
`current = head (1)`
`i = 0`

**Loop `for (int i = 0; i < indexToDeleteFromStart - 1; i++)`:**
*   `i = 0`: `current = current.next` (to `2`).
*   `i = 1`: `current = current.next` (to `3`).
*   Loop ends because `i` (2) is not less than `indexToDeleteFromStart - 1` (2).
*   `current` is now `3`.

**Remove Operation:**
*   `current.next = current.next.next` becomes `3.next = 3.next.next`.
*   `3.next` (which was `4`) now points to `5` (which was `4.next`).
*   The list becomes `1 -> 2 -> 3 -> 5 -> null`.

**Return `head` (which is `1`).**

**Time Complexity:** O(N) because we traverse the list twice (once to count, once to find and remove).
**Space Complexity:** O(1) auxiliary space.

**Edge Cases & Gotchas:**
*   **Removing the head node:** If `n` is equal to the total `length`, then `length - n` is `0`. This means we need to remove the head. The condition `if (n == length) return head.next;` handles this gracefully.
*   **Empty list:** The constraint `1 <= sz` ensures this won't happen for valid `n`. If it were possible, returning `null` would be appropriate.
*   **Single node list:** `head = 1 -> null, n = 1`. `length = 1`. `n == length` is true. Returns `head.next` (which is `null`), correctly removing the only node.

---

### Approach 4.2: One-Pass Solution (Two Pointers)

**Logic:**
This is an optimized approach that uses two pointers, `fast` and `slow`, to solve the problem in a single pass.
1.  Initialize a `dummyHead` node pointing to the original `head`. This simplifies handling the edge case where the head node itself needs to be removed.
2.  Initialize `fast` and `slow` pointers to `dummyHead`.
3.  Move the `fast` pointer `n+1` steps ahead. This creates a gap of `n` nodes between `slow` and `fast`. The `+1` is crucial because `slow` will stop *before* the node to be removed (at the node whose `next` pointer needs to be updated).
4.  Move both `fast` and `slow` pointers one step at a time until `fast` reaches the end of the list (becomes `null`).
5.  When `fast` reaches `null`, `slow` will be pointing to the node just before the `nth` node from the end.
6.  Remove the `nth` node: `slow.next = slow.next.next`.
7.  Return `dummyHead.next` as the new head of the list.

**Step-by-Step:**

Let's trace with `head = 1 -> 2 -> 3 -> 4 -> 5 -> null`, `n = 2`

**Initial State:**
`dummyHead = 0`
`dummyHead.next = 1`
`fast = 0` (dummyHead)
`slow = 0` (dummyHead)

```
dummyHead (0) -> 1 -> 2 -> 3 -> 4 -> 5 -> null
    ^ fast
    ^ slow
```

**Step 1: Move `fast` `n+1` steps ahead (`n=2`, so 3 steps).**
*   `i=0`: `fast` moves to `1`.
*   `i=1`: `fast` moves to `2`.
*   `i=2`: `fast` moves to `3`.
*   Loop ends. `fast` is at `3`.

```
dummyHead (0) -> 1 -> 2 -> 3 -> 4 -> 5 -> null
    ^ slow              ^ fast
```

**Step 2: Move `fast` and `slow` together until `fast` is `null`.**

| Fast (Current) | Slow (Current) | Fast (Next) | Slow (Next) |
| :------------- | :------------- | :---------- | :---------- |
| 3              | 0              | 4           | 1           |
| 4              | 1              | 5           | 2           |
| 5              | 2              | null        | 3           |
| `fast` is null. Loop ends. |

*   `slow` is now at `3`.

```
dummyHead (0) -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                         ^ slow
                                        ^ fast (now null)
```

**Step 3: Remove the `nth` node.**
*   `slow.next = slow.next.next` becomes `3.next = 3.next.next`.
*   `3.next` (which was `4`) now points to `5` (which was `4.next`).
*   The list becomes `0 -> 1 -> 2 -> 3 -> 5 -> null`.

**Return `dummyHead.next` (which is `1`).**

**Time Complexity:** O(N), as we traverse the list once.
**Space Complexity:** O(1) auxiliary space.

**Edge Cases & Gotchas:**
*   **Removing the head node:** `head = 1 -> 2 -> null`, `n = 2`.
    *   `dummyHead (0) -> 1 -> 2 -> null`.
    *   `fast` moves `n+1=3` steps: `0 -> 1 -> 2 -> null`. `fast` becomes `null`.
    *   `slow` is at `dummyHead (0)`.
    *   `slow.next = slow.next.next` becomes `0.next = 0.next.next`.
    *   `0.next` (which was `1`) now points to `2` (which was `1.next`).
    *   Result: `0 -> 2 -> null`.
    *   Return `dummyHead.next` (which is `2`). Correctly removes `1`.
*   The use of a `dummyHead` elegantly handles removing the original head without special conditional logic.

---

## 5. Problem: Palindrome Linked List

**Problem Statement:**
Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.

**Example:**
Input: `1 -> 2 -> 2 -> 1 -> null`
Output: `true`

Input: `1 -> 2 -> 3 -> null`
Output: `false`

---

### Approach 5.1: Using a Stack (O(N) Space)

**Logic:**
This method uses a stack to store the values of the first half of the linked list. Then, it compares the values in the second half with the values popped from the stack.

**Step-by-Step:**

Let's trace with `head = 1 -> 2 -> 3 -> 2 -> 1 -> null` (odd length)

**Phase 1: Populate Stack and Find Middle**
*   Initialize `stack = []`, `slow = head (1)`, `fast = head (1)`.

| Iteration | Slow | Fast | Stack | Condition (fast!=null && fast.next!=null) |
| :-------- | :--- | :--- | :---- | :---------------------------------------- |
| Initial   | 1    | 1    | []    | True                                      |
| 1         | 1    | 1    | [1]   | True (`slow` to 2, `fast` to 3)           |
| 2         | 2    | 3    | [1, 2]| True (`slow` to 3, `fast` to 1)           |
| 3         | 3    | 1    | [1, 2, 3]| False (`fast.next` is null)           |

*   Loop ends. `slow` is at `3`, `fast` is at `1`.
*   Since `fast` is not `null` (it's at `1`), it means we have an odd number of nodes. Advance `slow` one step: `slow = slow.next` (to `2`).

**Phase 2: Compare Second Half with Stack**
*   `slow` is at `2`, `stack = [1, 2, 3]`

| Iteration | Slow | Stack.peek() | Stack.pop() | Comparison (pop != slow.val) | Result |
| :-------- | :--- | :----------- | :---------- | :--------------------------- | :----- |
| 1         | 2    | 3            | 3           | `3 != 2` is true             | `false` |

*   Mismatch found. Return `false`.

**Wait, the example `1 -> 2 -> 3 -> 2 -> 1` is a palindrome. What went wrong in the trace?**
Ah, my mistake in manual stack population. The `stack` should contain the *first half*. The `slow` pointer should move *after* pushing.

Corrected trace for `1 -> 2 -> 3 -> 2 -> 1 -> null`:

**Phase 1: Populate Stack and Find Middle**
*   Initialize `stack = []`, `slow = head (1)`, `fast = head (1)`.

| Iteration | Slow (Before push) | Fast (Before advance) | Stack (After push) | Slow (After advance) | Fast (After advance) | Condition (fast!=null && fast.next!=null) |
| :-------- | :----------------- | :-------------------- | :----------------- | :------------------- | :------------------- | :---------------------------------------- |
| Initial   | 1                  | 1                     | []                 | 1                    | 1                    | True                                      |
| 1         | 1                  | 1                     | [1]                | 2                    | 3                    | True (`slow` to 2, `fast` to 3)           |
| 2         | 2                  | 3                     | [1, 2]             | 3                    | 1                    | False (`fast.next` is null)               |

*   Loop ends. `slow` is at `3`, `fast` is at `1`. `stack = [1, 2]`.
*   Since `fast` is not `null` (it's at `1`), it means an odd number of nodes. Advance `slow` one step: `slow = slow.next` (to `2` -- the node after the middle `3`).

**Phase 2: Compare Second Half with Stack**
*   `slow` is at `2`, `stack = [1, 2]`

| Iteration | Slow (Current) | Stack.pop() | Comparison (pop != slow.val) | Result |
| :-------- | :------------- | :---------- | :--------------------------- | :----- |
| 1         | 2              | 2           | `2 != 2` is false            | Continue |
|           | `slow` to `1`  |             |                              |          |
| 2         | 1              | 1           | `1 != 1` is false            | Continue |
|           | `slow` to `null` |             |                              |          |

*   Loop ends because `slow` is `null`. All comparisons passed.
*   Return `true`. Correct!

**Time Complexity:** O(N), where N is the number of nodes. We traverse the list twice effectively (once to fill stack, once to compare).
**Space Complexity:** O(N/2) = O(N) due to storing half of the nodes in the stack.

**Edge Cases & Gotchas:**
*   **Empty list / Single node list:** Handled by base cases (`null` or `head.next == null`).
*   **Even/Odd length:** The `if (fast != null)` check correctly handles skipping the middle node for odd-length lists.

---

### Approach 5.2: Reversing the Second Half (O(1) Space)

**Logic:**
This is an optimized approach that achieves O(1) space complexity by reversing the second half of the linked list.

1.  **Find the middle:** Use slow and fast pointers to locate the middle of the linked list.
2.  **Split and Reverse:** From the middle, reverse the second half of the list.
3.  **Compare:** Compare the first half of the original list with the reversed second half.
4.  **Restore (Optional but Recommended):** Revert the second half to its original order to leave the list unchanged.

**Step-by-Step:**

Let's trace with `head = 1 -> 2 -> 3 -> 2 -> 1 -> null` (odd length)

**Phase 1: Find Middle**
*   Initialize `slow = head (1)`, `fast = head (1)`.

| Iteration | Slow (After advance) | Fast (After advance) | Condition (fast!=null && fast.next!=null) |
| :-------- | :------------------- | :------------------- | :---------------------------------------- |
| Initial   | 1                    | 1                    | True                                      |
| 1         | 2                    | 3                    | True                                      |
| 2         | 3                    | 1                    | False (`fast.next` is null)               |

*   Loop ends. `slow` is at `3` (the middle node), `fast` is at `1` (the last node).

**Phase 2: Reverse Second Half**
*   The second half starts from `slow` (node `3`). We need to reverse `3 -> 2 -> 1 -> null`.
*   Using `reverseListIterative(slow)` on `3 -> 2 -> 1 -> null` results in `1 -> 2 -> 3 -> null`.
*   `secondHalfHead` becomes `1` (the new head of the reversed second half).
*   The original list looks like: `1 -> 2 -> 3` (first half ends here) ... and `3` is also the head of the reversed second half `1 -> 2 -> 3`.
    *Wait, this is incorrect behavior if `reverseListIterative` is used directly on `slow` for odd length list, as `slow` is the middle node and part of *both* conceptual halves. For odd lists, the *real* second half starts after `slow`.*
    *Corrected approach*: The `slow` pointer will point to the beginning of the second half (or the middle node for odd lists). We need to reverse from `slow.next` for odd lists, and from `slow` for even lists. The `reverseListIterative` function (which reverses from a given head) will work correctly if `slow` is passed.
    *   For odd list `1->2->3->2->1`, `slow` points to `3`. The actual second half `2->1` needs to be reversed. This requires `slow` to be `2` for `reverseListIterative`.
    *   A common pattern is to have `slow` be the node *before* the start of the second half, then `slow.next = reverseList(slow.next)`.

Let's refine the middle finding:
To correctly reverse the second half, `slow` should point to the head of the second half.
If list is `1 -> 2 -> 3 -> 2 -> 1`: `slow` is `3`. Second half `2 -> 1`.
If list is `1 -> 2 -> 2 -> 1`: `slow` is `2` (the second `2`). Second half `2 -> 1`.
This means `slow` *is* the head of the second half.

The key is that the `slow` pointer points to the first node of the second half. For odd length lists, this is the true middle node. For even length lists, it's the first node of the second half.

So, `secondHalfHead = reverseListIterative(slow)`.
For `1 -> 2 -> 3 -> 2 -> 1`:
`slow` is `3`. Reversing `3 -> 2 -> 1` gives `1 -> 2 -> 3`. `secondHalfHead` becomes `1` (node from the original list's tail).
Original list: `head = 1 -> 2 -> 3 -> 2 -> 1 -> null`
After `secondHalfHead = reverseListIterative(slow)`:
`slow` (the original `3`) is now `null` (`3.next = null` from `reverseListIterative`).
The section `3 -> 2 -> 1` is effectively severed and reversed.
The first half is `1 -> 2`. The second half (reversed) is `1 -> 2 -> 3`.

**Phase 3: Compare**
*   `firstHalfCurrent = head (1)`.
*   `secondHalfCurrent = secondHalfHead (1)` (from reversed `1 -> 2 -> 3`).

| Iteration | First Half | Second Half (Reversed) | Comparison (f.val != s.val) |
| :-------- | :--------- | :--------------------- | :-------------------------- |
| Initial   | 1          | 1                      | `1 != 1` is false           |
| 1         | 2          | 2                      | `2 != 2` is false           |
| 2         | 3          | 3                      | `3 != 3` is false           |
| 3         | `null`     | `null`                 | Loop ends.                  |

*   `isPalindrome` remains `true`.

**Phase 4: Restore Original List (Re-reverse the second half)**
*   Call `reverseListIterative(originalSecondHalfHead)` on `1 -> 2 -> 3 -> null`.
*   This restores `3 -> 2 -> 1 -> null`.
*   The original `head` (`1 -> 2 -> 3`) is still pointing to `3`. The `3` node now points to `2`, and `2` to `1`.
*   The list is fully restored: `1 -> 2 -> 3 -> 2 -> 1 -> null`.

**Final Result:** Returns `true`.

**Time Complexity:** O(N), where N is the number of nodes.
*   Finding middle: O(N/2)
*   Reversing second half: O(N/2)
*   Comparing halves: O(N/2)
*   Restoring list: O(N/2)
Total: O(N).
**Space Complexity:** O(1) auxiliary space, as we only use a few extra pointers.

**Edge Cases & Gotchas:**
*   **Empty list / Single node list:** Handled by base cases, correctly returning `true`.
*   **Even/Odd length:** The fast/slow pointer logic correctly identifies the start of the second half in both cases. For an even length list `1->2->2->1`, `slow` stops at the first `2`. Reversing `2->1` gives `1->2`. Comparing `1->2` with `1->2` works.
*   **List Modification:** This approach modifies the list temporarily. The restoration step is crucial if the original list structure must be preserved. Interviewers often ask about this.

---

This concludes the detailed algorithm explanations. Reviewing these approaches with diagrams and complexity analysis will greatly enhance understanding and preparation for linked list interview questions.
```