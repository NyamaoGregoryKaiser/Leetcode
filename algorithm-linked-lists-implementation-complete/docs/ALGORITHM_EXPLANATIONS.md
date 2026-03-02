```markdown
# 📚 Algorithm Explanations for Linked List Problems

This document provides detailed explanations for the algorithms implemented in the project, including their logic, ASCII diagrams for visualization, and a breakdown of time and space complexity.

---

## Problem 1: Reverse Linked List

**Problem Statement:** Given the head of a singly linked list, reverse the list, and return the reversed list's head.

### 1.1 Iterative Approach (Optimal)

*   **High-Level Idea:**
    We traverse the list, and at each node, we change its `next` pointer to point to the *previous* node. To do this, we need to keep track of the previous node and temporarily store the next node (of the *original* list) before modifying the current node's `next` pointer.

*   **Detailed Steps:**
    1.  Initialize three pointers:
        *   `prev = null`: This will eventually be the new tail of the reversed list and then the new head.
        *   `current = head`: This pointer iterates through the original list.
        *   `nextTemp`: A temporary pointer to store `current.next` before `current.next` is reassigned.
    2.  Loop while `current` is not `null`:
        *   Store `current.next` in `nextTemp`.
        *   Change `current.next` to point to `prev`. This reverses the link.
        *   Move `prev` forward: `prev = current`.
        *   Move `current` forward: `current = nextTemp`.
    3.  After the loop, `current` will be `null`, and `prev` will be pointing to the original last node, which is now the new head of the reversed list. Return `prev`.

*   **ASCII Diagram:**

    Original: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`

    Initial:
    `prev = NULL`
    `current = 1`
    `nextTemp` (undefined)

    --- Loop 1 (current = 1) ---
    `nextTemp = 2` (stores original next of 1)
    `1.next = NULL` (reverses link)
    `prev = 1`
    `current = 2`

    State: `NULL <- 1   2 -> 3 -> 4 -> 5 -> NULL`
                 `^prev` `^current` `^nextTemp`

    --- Loop 2 (current = 2) ---
    `nextTemp = 3`
    `2.next = 1`
    `prev = 2`
    `current = 3`

    State: `NULL <- 1 <- 2   3 -> 4 -> 5 -> NULL`
                     `^prev` `^current` `^nextTemp`

    --- ... (continues) ---

    --- Loop 5 (current = 5) ---
    `nextTemp = NULL`
    `5.next = 4`
    `prev = 5`
    `current = NULL`

    State: `NULL <- 1 <- 2 <- 3 <- 4 <- 5   NULL`
                                        `^prev` `^current`

    --- Loop ends ---

    Return `prev` (which is `5`).
    Result: `5 -> 4 -> 3 -> 2 -> 1 -> NULL`

*   **Edge Cases:**
    *   **Empty list (`head = null`):** The loop won't run, `prev` remains `null`, which is correct.
    *   **Single node list (`head -> null`):** Loop runs once. `nextTemp` becomes `null`. `head.next` becomes `null`. `prev` becomes `head`. `current` becomes `null`. Returns `head`, which is correct.

*   **Complexity:**
    *   **Time:** `O(N)` - We visit each node exactly once.
    *   **Space:** `O(1)` - We use a constant number of pointers regardless of list size.

### 1.2 Recursive Approach

*   **High-Level Idea:**
    The recursion works by first reversing the *rest* of the list and then handling the current node. The base case is an empty list or a single-node list, which is already reversed.

*   **Detailed Steps:**
    1.  **Base Case:** If `head` is `null` or `head.next` is `null` (empty or single-node list), it's already reversed. Return `head`.
    2.  **Recursive Step:**
        *   Call `reverseListRecursive(head.next)`. This call will eventually return the *new head* of the completely reversed sublist (e.g., if `head` is `1` and list is `1 -> 2 -> 3 -> null`, this call returns `3`). Let's call this `newHead`.
        *   Now, `head.next` (e.g., `2`) points to `head` (e.g., `1`). This creates the reverse link: `2 -> 1`.
        *   To avoid a cycle in the original direction (`1 -> 2`), set `head.next` to `null`. This makes `head` (the original head of the sublist) the new tail.
        *   Return `newHead`.

*   **ASCII Diagram:**

    Original: `1 -> 2 -> 3 -> NULL`

    `reverseListRecursive(1)`:
      `newHead = reverseListRecursive(2)`
        `newHead = reverseListRecursive(3)`
          Base case: `head = 3`, `head.next = NULL`. Returns `3`.
        `newHead = 3` (returned from `reverseListRecursive(3)`)
        Current `head` is `2`.
        `2.next.next = 2`  => `3.next = 2` (linking `3 -> 2`)
        `2.next = NULL`    => `2.next = NULL` (breaking `2 -> 3`)
        Returns `newHead` (`3`).
      `newHead = 3` (returned from `reverseListRecursive(2)`)
      Current `head` is `1`.
      `1.next.next = 1`  => `2.next = 1` (linking `2 -> 1`)
      `1.next = NULL`    => `1.next = NULL` (breaking `1 -> 2`)
      Returns `newHead` (`3`).

    Result: `3 -> 2 -> 1 -> NULL`

*   **Edge Cases:** Same as iterative: empty and single-node lists are handled by the base case.

*   **Complexity:**
    *   **Time:** `O(N)` - Each node is visited once during the recursive calls.
    *   **Space:** `O(N)` - Due to the recursion call stack. In the worst case (a list of N nodes), the depth of the stack can be N.

### 1.3 Brute Force (Array Conversion)

*   **High-Level Idea:**
    Convert the linked list to an array, reverse the array, and then build a new linked list from the reversed array.

*   **Detailed Steps:**
    1.  Traverse the linked list from `head` and push each node's `val` into an array.
    2.  Use the array's built-in `reverse()` method.
    3.  Create a new linked list by iterating through the reversed array and creating new `Node`s.

*   **Complexity:**
    *   **Time:** `O(N)` - `O(N)` to convert to array, `O(N)` to reverse array, `O(N)` to rebuild list. Total `O(N)`.
    *   **Space:** `O(N)` - For storing all node values in a new array.

---

## Problem 2: Merge Two Sorted Lists

**Problem Statement:** Given the heads of two sorted linked lists `list1` and `list2`, merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

### 2.1 Iterative Approach (Optimal)

*   **High-Level Idea:**
    Build a new merged list by iteratively comparing the heads of the two input lists. The smaller node is appended to the merged list, and its pointer is advanced. A dummy head simplifies the initialization.

*   **Detailed Steps:**
    1.  Create a `dummyHead` node (e.g., with value 0) to serve as a starting point. This avoids special handling for the first node of the merged list.
    2.  Create a `current` pointer, initialized to `dummyHead`. This pointer will always point to the last node added to the merged list.
    3.  Loop while both `list1` and `list2` are not `null`:
        *   Compare `list1.val` and `list2.val`.
        *   If `list1.val <= list2.val`, append `list1` to `current.next`. Then advance `list1 = list1.next`.
        *   Else, append `list2` to `current.next`. Then advance `list2 = list2.next`.
        *   In both cases, advance `current = current.next`.
    4.  After the loop, one of the lists might still have remaining elements. Append the rest of that list to `current.next` (since they are already sorted and greater than or equal to the last merged node).
        *   If `list1` is not `null`, `current.next = list1`.
        *   If `list2` is not `null`, `current.next = list2`.
    5.  The head of the fully merged list is `dummyHead.next`.

*   **ASCII Diagram:**

    `list1: 1 -> 2 -> 4 -> NULL`
    `list2: 1 -> 3 -> 4 -> NULL`

    Initial:
    `dummyHead: 0 -> NULL`
    `current = dummyHead`
    `list1_ptr = 1`
    `list2_ptr = 1`

    --- Loop 1 --- (`1 <= 1`)
    `current.next = list1_ptr` (0 -> 1)
    `list1_ptr = 2`
    `current = 1`

    State: `0 -> 1 -> NULL`
           `^dummy` `^current`
                    `^list1_ptr(2)`
                    `^list2_ptr(1)`

    --- Loop 2 --- (`1 < 2`)
    `current.next = list2_ptr` (1 -> 1)
    `list2_ptr = 3`
    `current = 1` (the new 1 from list2)

    State: `0 -> 1 -> 1 -> NULL`
           `^dummy`    `^current`
                       `^list1_ptr(2)`
                       `^list2_ptr(3)`

    --- Loop 3 --- (`2 < 3`)
    `current.next = list1_ptr` (1 -> 2)
    `list1_ptr = 4`
    `current = 2`

    State: `0 -> 1 -> 1 -> 2 -> NULL`
           `^dummy`       `^current`
                          `^list1_ptr(4)`
                          `^list2_ptr(3)`

    --- ... (continues) ---

    Eventually:
    `0 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> NULL`
                                        `^current`
                                        `^list1_ptr(NULL)`
                                        `^list2_ptr(NULL)`

    Return `dummyHead.next` (which is the first `1`).

*   **Edge Cases:**
    *   **Both lists empty:** `dummyHead.next` remains `null`, correct.
    *   **One list empty:** The loop won't run. The non-empty list will be directly appended to `dummyHead.next`. Correct.
    *   **Single node lists:** Handled correctly.

*   **Complexity:**
    *   **Time:** `O(N + M)` - Where N and M are the lengths of `list1` and `list2`. Each node from both lists is visited and appended exactly once.
    *   **Space:** `O(1)` - Only a constant number of pointers are used. The nodes themselves are just re-linked, not created new (unless specifically required, but usually not for this problem).

### 2.2 Recursive Approach

*   **High-Level Idea:**
    The problem has optimal substructure. If you know how to merge the rest of the lists, you can merge the current heads.

*   **Detailed Steps:**
    1.  **Base Cases:**
        *   If `list1` is `null`, return `list2`.
        *   If `list2` is `null`, return `list1`.
    2.  **Recursive Step:**
        *   Compare `list1.val` and `list2.val`.
        *   If `list1.val <= list2.val`:
            *   Set `list1.next` to the result of merging `list1.next` and `list2`.
            *   Return `list1` as the head of the current merged sublist.
        *   Else (`list2.val` is smaller):
            *   Set `list2.next` to the result of merging `list1` and `list2.next`.
            *   Return `list2` as the head of the current merged sublist.

*   **ASCII Diagram:**

    `list1: 1 -> 2 -> 4 -> NULL`
    `list2: 1 -> 3 -> 4 -> NULL`

    `merge(1, 1)`:
      `1_list1.val <= 1_list2.val`
      `1_list1.next = merge(2_list1, 1_list2)`
        `1_list2.val < 2_list1.val`
        `1_list2.next = merge(2_list1, 3_list2)`
          `2_list1.val < 3_list2.val`
          `2_list1.next = merge(4_list1, 3_list2)`
            `3_list2.val < 4_list1.val`
            `3_list2.next = merge(4_list1, 4_list2)`
              `4_list1.val <= 4_list2.val`
              `4_list1.next = merge(NULL, 4_list2)`
                Base Case: `NULL`. Returns `4_list2`.
              `4_list1.next = 4_list2` (`4 -> 4`)
              Returns `4_list1`.
            `3_list2.next = 4_list1` (`3 -> 4`)
            Returns `3_list2`.
          `2_list1.next = 3_list2` (`2 -> 3`)
          Returns `2_list1`.
        `1_list2.next = 2_list1` (`1 -> 2`)
        Returns `1_list2`.
      `1_list1.next = 1_list2` (`1 -> 1`)
      Returns `1_list1`.

    Result: The first `1` from `list1` points to the first `1` from `list2`, which points to `2` from `list1`, etc. forming `1 -> 1 -> 2 -> 3 -> 4 -> 4 -> NULL`.

*   **Edge Cases:**
    *   **Empty lists:** Base cases handle this by returning the non-empty list or `null` if both are empty.

*   **Complexity:**
    *   **Time:** `O(N + M)` - Each recursive call merges one node from either `list1` or `list2`.
    *   **Space:** `O(N + M)` - Due to the recursion stack depth, which can be up to `N + M` in the worst case (e.g., alternating elements).

---

## Problem 3: Detect Linked List Cycle (Floyd's Tortoise and Hare)

**Problem Statement (Part I):** Given the head of a linked list, return `true` if there is a cycle in the linked list. Otherwise, return `false`.
**Problem Statement (Part II):** Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

### 3.1 `hasCycle` (Boolean Check)

*   **High-Level Idea:**
    Use two pointers, a "slow" pointer and a "fast" pointer. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. If there's a cycle, the fast pointer will eventually "catch up" to the slow pointer inside the cycle. If there's no cycle, the fast pointer will reach the end of the list (`null`).

*   **Detailed Steps:**
    1.  Initialize `slow = head` and `fast = head`.
    2.  Loop while `fast` is not `null` and `fast.next` is not `null` (ensures `fast` can always take two steps):
        *   Move `slow` one step: `slow = slow.next`.
        *   Move `fast` two steps: `fast = fast.next.next`.
        *   If `slow` becomes equal to `fast`, a cycle is detected. Return `true`.
    3.  If the loop completes, it means `fast` reached the end of the list without meeting `slow`, so there is no cycle. Return `false`.

*   **ASCII Diagram (Cycle Detection):**

    List: `1 -> 2 -> 3 -> 4 -> 5`
                     `^-------|` (5 points to 3)

    Initial:
    `slow = 1`
    `fast = 1`

    --- Loop 1 ---
    `slow = 2`
    `fast = 3`

    State: `1 -> 2 -> 3 -> 4 -> 5`
                `^s`    `^f`

    --- Loop 2 ---
    `slow = 3`
    `fast = 5`

    State: `1 -> 2 -> 3 -> 4 -> 5`
                     `^s`       `^f`

    --- Loop 3 ---
    `slow = 4`
    `fast = 3` (because 5.next is 3)

    State: `1 -> 2 -> 3 -> 4 -> 5`
                     `^f`    `^s`

    --- Loop 4 ---
    `slow = 5`
    `fast = 5` (because 3.next is 4, 4.next is 5)

    State: `1 -> 2 -> 3 -> 4 -> 5`
                     `^s,f` (meet!)

    Return `true`.

*   **Edge Cases:**
    *   **Empty list (`head = null`):** Returns `false`, correct.
    *   **Single node list (`head -> null`):** `fast.next` is `null` in the first check, loop doesn't run. Returns `false`, correct.
    *   **Single node self-loop (`head -> head`):**
        *   Initial: `slow = head`, `fast = head`.
        *   Loop 1: `slow = head.next` (which is `head`). `fast = head.next.next` (which is `head`).
        *   `slow === fast`. Returns `true`. Correct.

*   **Complexity:**
    *   **Time:** `O(N)` - In the worst case, fast traverses the entire list and then both traverse the cycle. The number of steps is proportional to N.
    *   **Space:** `O(1)` - Only two pointers are used.

### 3.2 `detectCycle` (Find Cycle Start Node)

*   **High-Level Idea:**
    This builds on the `hasCycle` logic. Once the slow and fast pointers meet within a cycle, we know a cycle exists. To find the start of the cycle, we reset one pointer (e.g., `slow`) to the `head` and keep the other pointer (`fast`) at the meeting point. Then, we advance both pointers one step at a time. The point where they meet again will be the start of the cycle.

*   **Mathematical Intuition (Proof Sketch):**
    Let `L` be the distance from the head to the cycle's start.
    Let `C` be the length of the cycle.
    Let `K` be the distance from the cycle's start to the meeting point.

    When slow and fast meet:
    Slow's distance = `L + K`
    Fast's distance = `L + K + nC` (where `n` is the number of full cycles fast has traversed)

    Since fast moves twice as fast: `2 * (L + K) = L + K + nC`
    Simplifying: `L + K = nC`
    Rearranging: `L = nC - K`
    This can be written as: `L = (n-1)C + (C - K)`

    `C - K` is the distance from the meeting point back to the cycle start.
    So, if `slow` starts from `head` (distance `L`) and `fast` starts from the meeting point (distance `C-K` to cycle start), and they both move one step, they will cover the remaining distance and meet exactly at the cycle's start.

*   **Detailed Steps:**
    1.  **Phase 1: Detect Cycle:**
        *   Use `slow` and `fast` pointers as in `hasCycle`.
        *   If `fast` reaches `null` or `fast.next` reaches `null`, no cycle exists; return `null`.
        *   If `slow === fast`, a cycle is detected. Break the loop.
    2.  **Phase 2: Find Cycle Start:**
        *   Reset `slow` pointer to `head`.
        *   Keep `fast` pointer at the meeting point found in Phase 1.
        *   Move both `slow` and `fast` one step at a time, simultaneously.
        *   The node where they meet again is the starting node of the cycle. Return this node.

*   **ASCII Diagram (Finding Cycle Start):**

    List: `1 -> 2 -> 3 -> 4 -> 5`
                     `^-------|` (5 points to 3)

    Phase 1:
    `slow` and `fast` meet at `5`.

    Phase 2:
    `slow = 1` (reset to head)
    `fast = 5` (remains at meeting point)

    --- Loop 1 ---
    `slow = 2`
    `fast = 3` (5.next is 3)

    State: `1 -> 2 -> 3 -> 4 -> 5`
                 `^s` `^f`

    --- Loop 2 ---
    `slow = 3`
    `fast = 4`

    State: `1 -> 2 -> 3 -> 4 -> 5`
                      `^s` `^f`

    --- Loop 3 ---
    `slow = 4`
    `fast = 5`

    State: `1 -> 2 -> 3 -> 4 -> 5`
                          `^s` `^f`

    --- Loop 4 ---
    `slow = 5`
    `fast = 3` (5.next is 3)

    State: `1 -> 2 -> 3 -> 4 -> 5`
                     `^f`       `^s`

    (Wait, my manual trace of `slow` and `fast` movement after reset was slightly off. Let's re-trace carefully for phase 2. The *distance* `L` is `2` (1 to 3). The *distance* `K` is `2` (3 to 5). The *cycle length* `C` is `3` (3->4->5->3).
    `L=2`, `K=2`, `C=3`.
    `L + K = 2 + 2 = 4`.
    `nC` where `n=1`: `1 * 3 = 3`. This doesn't match `L+K=nC` if `nC` is strictly multiple of C.
    The formula is `Distance(fast) = 2 * Distance(slow)`.
    Let `m` be distance from head to meeting point. `m_slow = m`, `m_fast = 2m`.
    If `m` is slow's distance, then `m = L + K`.
    Fast travels `L + (some number of cycles) + K`.
    `2(L+K) = L + K + xC` implies `L+K = xC`.
    `L = xC - K`.
    Let `slow` start from `head` (position `0`). `fast` starts from meeting point (position `L+K`).
    They meet when `0 + steps = L + K + steps (mod C)`.
    Let `meetingPoint = M`.
    Distance `Head -> Cycle_Start = L`.
    Distance `Cycle_Start -> Meeting_Point = K`.
    `L = nC - K`.
    This implies `L % C = (nC - K) % C = -K % C = (C - K) % C`.
    So, the distance from `Head` to `Cycle_Start` is equal to the distance from `Meeting_Point` to `Cycle_Start` (travelling within the cycle).
    So if we move `slow` from `Head` and `fast` from `Meeting_Point` one step at a time, they will meet at `Cycle_Start`.

    Correct Trace for Phase 2:
    `slow = 1`
    `fast = 5` (meeting point)

    --- Iteration 1 ---
    `slow = 1.next = 2`
    `fast = 5.next = 3`
    `slow !== fast`

    --- Iteration 2 ---
    `slow = 2.next = 3`
    `fast = 3.next = 4`
    `slow !== fast`

    --- Iteration 3 ---
    `slow = 3.next = 4`
    `fast = 4.next = 5`
    `slow !== fast`

    --- Iteration 4 ---
    `slow = 4.next = 5`
    `fast = 5.next = 3`
    `slow !== fast`

    The previous diagram for Phase 2 was wrong. `slow` will become 3 in 2 steps. `fast` will become 3 in 2 steps.
    Let's re-verify:
    Head = 1. Cycle Start = 3. Meeting Point = 5.
    L = 2 (1->2->3)
    K = 2 (3->4->5)
    C = 3 (3->4->5->3)
    `L = 2`. `C - K = 3 - 2 = 1`. This does not match `L = C - K`.
    The formula is `L = (n-1)C + (C - K)`.
    For `n=1`: `L = C-K`.
    For our example: `1->2->3->4->5` (5 connects to 3).
    Path `1->2->3`. `L=2`.
    Cycle `3->4->5->3`. `C=3`.
    Fast and Slow meet at `5`. `K=2` (distance from 3 to 5).
    Here `L=2`, `C=3`, `K=2`.
    `L = (C-K) + (n-1)C`
    `2 = (3-2) + (n-1)3`
    `2 = 1 + (n-1)3`
    `1 = (n-1)3`. This implies `n-1 = 1/3`, which means `n` is not an integer.
    The issue is with `K`. `K` is distance *within* cycle.
    `slow` travels `L+K`. `fast` travels `L+K+jC` (j is number of cycle rounds).
    `2(L+K) = L+K+jC` => `L+K = jC`.
    `L = jC - K`.
    If `j=1` (fast completes one round more than slow) then `L = C-K`.
    In our example, `L=2`, `C=3`. `2 = (3-K)`. So `K=1`.
    This means if `L=2` and `C=3`, `slow` and `fast` should meet after 1 step into the cycle.
    `1->2->3->4->5` (5 points to 3)
    Initial: S=1, F=1
    S=2, F=3
    S=3, F=5
    S=4, F=3 (Oops, fast 5.next is 3, fast 3.next is 4, 4.next is 5. So fast next state is 4, then 5. No, 5.next is 3. From 3, fast moves to 5. From 5, fast moves to 4 (5.next=3, 3.next=4)).
    Let's retrace the movement very strictly:
    `H: 1->2->3->4->5 (5->3)`
    S=1, F=1
    S=2, F=3
    S=3, F=5
    S=4 (3.next), F=4 (5.next.next: 5->3->4)
    S=5 (4.next), F=3 (4.next.next: 4->5->3)
    S=3 (5.next), F=5 (3.next.next: 3->4->5)
    S=4 (3.next), F=4 (5.next.next: 5->3->4)  <--- They meet at 4!

    So the meeting point `M` is `4`.
    `L = 2` (1->2->3)
    `K = 1` (3->4) - distance from cycle start to meeting point
    `C = 3` (3->4->5->3)
    `L = jC - K`
    `2 = j*3 - 1`
    `3 = j*3` => `j=1`. This works! Fast travelled one full cycle more than slow.

    Now for Phase 2:
    `slow = 1`
    `fast = 4` (meeting point)

    --- Iteration 1 ---
    `slow = 1.next = 2`
    `fast = 4.next = 5`
    `slow !== fast`

    --- Iteration 2 ---
    `slow = 2.next = 3`
    `fast = 5.next = 3`
    `slow === fast`! They meet at `3`, which is the cycle start. Correct.

*   **Edge Cases:**
    *   **No cycle:** Handled by Phase 1, returns `null`.
    *   **Single node self-loop:**
        *   Phase 1: `slow` and `fast` both start at `head`. `slow = head.next = head`. `fast = head.next.next = head`. They meet at `head`. `cycleDetected = true`.
        *   Phase 2: `slow = head`. `fast = head`. `slow === fast`. Returns `head`. Correct.
    *   **Head is part of the cycle immediately:**
        `1 -> 2 -> 3` (3 points to 1)
        *   Phase 1:
            S=1, F=1
            S=2, F=3
            S=3, F=2 (3.next=1, 1.next=2)
            S=1 (3.next), F=1 (2.next.next: 2->3->1)  <-- Meet at 1.
        *   Phase 2:
            S=1, F=1
            They meet at 1. Return 1. Correct.

*   **Complexity:**
    *   **Time:** `O(N)` - Phase 1 takes `O(N)` steps. Phase 2 also takes at most `O(N)` steps (the length `L` from head to cycle start is at most `N`, and the cycle length is at most `N`). Total `O(N)`.
    *   **Space:** `O(1)` - Only two pointers are used.

---

## Problem 4: Find Kth Node From End of List

**Problem Statement:** Given the head of a singly linked list and an integer `k`, return the `k`-th node from the end of the list. Assume `k` is always valid (1 <= k <= list.length).

### 4.1 Two-Pointer Approach (Optimal)

*   **High-Level Idea:**
    Maintain a fixed gap of `k` nodes between two pointers, `fast` and `slow`. When `fast` reaches the end of the list, `slow` will be at the `k`-th node from the end.

*   **Detailed Steps:**
    1.  Initialize `slow = head` and `fast = head`.
    2.  Move `fast` pointer `k` steps forward. This establishes the `k`-node gap.
        *   `for (let i = 0; i < k; i++) { fast = fast.next; }`
        *   Since `k` is valid, `fast` will not become `null` during this step.
    3.  Now, move both `slow` and `fast` pointers one step at a time, simultaneously, until `fast` becomes `null` (indicating it has traversed the entire list).
        *   `while (fast !== null) { slow = slow.next; fast = fast.next; }`
    4.  When `fast` is `null`, `slow` will be pointing to the `k`-th node from the end. Return `slow`.

*   **ASCII Diagram:**

    List: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`, `k = 2`

    Initial:
    `slow = 1`
    `fast = 1`

    --- Move fast `k` steps (k=2) ---
    `fast = 1.next = 2`
    `fast = 2.next = 3`
    Now `fast = 3`

    State: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
           `^s`        `^f` (gap of 2 nodes: 2, 3)

    --- Move both until fast is NULL ---
    Loop 1:
    `slow = 2`
    `fast = 4`

    State: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
                `^s`       `^f`

    Loop 2:
    `slow = 3`
    `fast = 5`

    State: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
                     `^s`       `^f`

    Loop 3:
    `slow = 4`
    `fast = NULL` (5.next is NULL)

    State: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
                          `^s`       `^f` (NULL)

    Return `slow` (which is `4`).

*   **Edge Cases:**
    *   **Single node list, `k=1`:** `fast` moves 1 step to `null`. `slow` is still at `head`. Then `while` loop doesn't run. `slow` correctly returns `head`. (Correction: `fast` moves `k` times. For `[1]`, `k=1`, `fast` becomes `null`. Then `while` loop doesn't run. `slow` is at `head`. Returns `head` (1). Correct.)
    *   **`k` is list length (finds head):** `[1,2,3], k=3`.
        *   `fast` moves 3 steps to `null`.
        *   `slow` is at `head`.
        *   `while` loop doesn't run. Returns `head` (1). Correct.

*   **Complexity:**
    *   **Time:** `O(N)` - `k` steps for `fast`, then `N-k` steps for both. Total `N` steps for `fast` to reach end, `N-k` for `slow`. Sum is `O(N)`.
    *   **Space:** `O(1)` - Constant number of pointers.

### 4.2 Two-Pass Approach (Calculate Length First)

*   **High-Level Idea:**
    First, find the total length of the list. Then, calculate which node from the beginning corresponds to the `k`-th node from the end. Finally, traverse to that node.

*   **Detailed Steps:**
    1.  **First Pass:** Traverse the entire list to count the total number of nodes, `N`.
    2.  Calculate the 0-indexed position from the beginning: `targetIndex = N - k`.
    3.  **Second Pass:** Traverse the list again from the `head`, moving `current` pointer `targetIndex` steps.
    4.  The `current` pointer will be at the `k`-th node from the end. Return `current`.

*   **ASCII Diagram:**

    List: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`, `k = 2`

    --- First Pass (Calculate Length) ---
    `current` traverses `1, 2, 3, 4, 5, NULL`.
    `N = 5`.

    --- Calculate Target Index ---
    `targetIndex = N - k = 5 - 2 = 3`. (0-indexed, meaning the 4th node)

    --- Second Pass (Traverse to Target) ---
    `current = head` (1)
    Move 3 steps:
    `current = 1.next = 2` (1st step)
    `current = 2.next = 3` (2nd step)
    `current = 3.next = 4` (3rd step)

    Return `current` (which is `4`).

*   **Edge Cases:**
    *   **Single node list, `k=1`:** `N=1`. `targetIndex = 1-1 = 0`. Second pass moves 0 steps. Returns `head`. Correct.
    *   **`k` is list length (finds head):** `[1,2,3], k=3`. `N=3`. `targetIndex = 3-3 = 0`. Second pass moves 0 steps. Returns `head`. Correct.

*   **Complexity:**
    *   **Time:** `O(N)` - First pass `O(N)`. Second pass `O(N-k)` (at most `O(N)`). Total `O(N)`.
    *   **Space:** `O(1)` - Constant variables for length and pointer.

---

## Problem 5: Remove Nth Node From End of List

**Problem Statement:** Given the head of a singly linked list, remove the `nth` node from the end of the list and return its head. Assume `n` is always valid (1 <= n <= list.length).

### 5.1 One-Pass Two-Pointer Approach with Dummy Node (Optimal)

*   **High-Level Idea:**
    Similar to finding the Kth node from the end, but to *remove* a node, we need to locate its *predecessor*. We'll use two pointers and a `dummy` node. The `fast` pointer will be `n+1` steps ahead of `slow`. When `fast` reaches the end, `slow` will be at the node *before* the one to be removed.

*   **Detailed Steps:**
    1.  **Dummy Node:** Create a `dummy` node (`dummy = new Node(0)`) and set `dummy.next = head`. This simplifies the logic, especially if the head node itself needs to be removed. The final result will be `dummy.next`.
    2.  **Initialize Pointers:**
        *   `slow = dummy`
        *   `fast = dummy`
    3.  **Advance Fast Pointer:** Move `fast` pointer `n + 1` steps forward. This creates a gap such that when `fast` reaches `null`, `slow` will be at the predecessor of the `nth` node from the end.
        *   `for (let i = 0; i <= n; i++) { fast = fast.next; }`
        *   Since `n` is valid, `fast` will not become `null` within this loop (unless the list is empty, which constraints prevent).
    4.  **Advance Both Pointers:** Now, move both `slow` and `fast` one step at a time, simultaneously, until `fast` becomes `null`.
        *   `while (fast !== null) { slow = slow.next; fast = fast.next; }`
    5.  **Remove Node:** At this point, `slow` is pointing to the node *before* the target node.
        *   The node to be removed is `slow.next`.
        *   Bypass it: `slow.next = slow.next.next;`
    6.  **Return New Head:** Return `dummy.next`.

*   **ASCII Diagram:**

    List: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`, `n = 2` (remove node `4`)

    Initial:
    `dummy: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`
    `slow = 0` (dummy)
    `fast = 0` (dummy)

    --- Move fast `n+1` steps (2+1 = 3 steps) ---
    `fast = 0.next = 1`
    `fast = 1.next = 2`
    `fast = 2.next = 3`
    Now `fast = 3`

    State: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`
           `^s`        `^f` (gap of `n` nodes: 1, 2, 3)

    --- Move both until fast is NULL ---
    Loop 1:
    `slow = 1`
    `fast = 4`

    State: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`
                `^s`          `^f`

    Loop 2:
    `slow = 2`
    `fast = 5`

    State: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`
                     `^s`          `^f`

    Loop 3:
    `slow = 3`
    `fast = NULL` (5.next is NULL)

    State: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL`
                          `^s` `^target` `^f`(NULL)

    --- Remove Node ---
    `slow.next` is `4`. `slow.next.next` is `5`.
    `3.next = 5`.

    Result: `0 -> 1 -> 2 -> 3 -> 5 -> NULL`
    Return `dummy.next` (which is `1`).

*   **Edge Cases:**
    *   **Removing the head node (`n = list.length`):**
        `[1,2,3], n=3`. `dummy: 0->1->2->3`.
        `fast` moves `3+1=4` steps. `fast` becomes `null`.
        `slow` is at `dummy`.
        `slow.next = slow.next.next` => `dummy.next = dummy.next.next`.
        `0.next = 1.next` => `0.next = 2`.
        Result: `0 -> 2 -> 3`. Return `dummy.next` (which is `2`). Correct.
    *   **Single node list, `n=1`:**
        `[1], n=1`. `dummy: 0->1`.
        `fast` moves `1+1=2` steps. `fast` becomes `null`.
        `slow` is at `dummy`.
        `slow.next = slow.next.next` => `dummy.next = dummy.next.next`.
        `0.next = 1.next` => `0.next = null`.
        Result: `0 -> NULL`. Return `dummy.next` (which is `null`). Correct.

*   **Complexity:**
    *   **Time:** `O(N)` - `n+1` steps for `fast`, then `N-n` steps for both. Total `O(N)`.
    *   **Space:** `O(1)` - Constant number of pointers and the dummy node.
```