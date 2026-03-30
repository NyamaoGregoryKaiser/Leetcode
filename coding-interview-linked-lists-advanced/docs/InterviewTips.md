```markdown
# Linked List Interview Tips and Variations

This document provides general advice for tackling Linked List problems in interviews, common edge cases to consider, and typical variations or follow-up questions.

---

## General Interview Tips for Linked Lists

1.  **Understand the Basics:**
    *   **Node Structure:** Be comfortable defining a `ListNode` (value and `next` pointer).
    *   **Singly vs. Doubly:** Most problems default to singly. Clarify if not specified.
    *   **Head/Tail:** How to access/modify the beginning and end.
    *   **Traversal:** Iterating through the list.

2.  **Drawing is Crucial:**
    *   Always use a whiteboard or pen & paper to draw out the linked list and visualize pointer movements. This is especially important for complex manipulations like reversing or two-pointer techniques.
    *   Use ASCII art if practicing digitally (as shown in `Diagrams.md`).

3.  **Use a Dummy Node (Sentinel Node):**
    *   For many problems (e.g., merging, removing head, adding to head), using a `dummy` node simplifies the code.
    *   A `dummy` node is a temporary node placed *before* the actual head. It makes operations at the head of the list consistent with operations in the middle, avoiding special checks for `head === null` or modifying the head pointer directly.
    *   Remember to return `dummy.next` as the actual head.

4.  **Pointer Management is Key:**
    *   Linked list problems are all about manipulating pointers correctly.
    *   Always keep track of what each pointer represents (e.g., `prev`, `current`, `nextTemp`, `slow`, `fast`).
    *   Be careful not to lose track of parts of the list by incorrectly overwriting a `next` pointer before saving its original value.

5.  **Identify Patterns:**
    *   **Two Pointers:** Many problems can be solved with two pointers moving at different speeds or with different offsets (e.g., cycle detection, finding middle, removing Nth from end).
    *   **Recursion vs. Iteration:** Be ready to implement both for problems like reversing a list. Understand their time/space tradeoffs (recursion often uses more space due to stack).

6.  **Test Thoroughly (Mental Walkthrough):**
    *   **Empty List:** `[]`
    *   **Single Node List:** `[1]`
    *   **Two Node List:** `[1,2]`
    *   **Even/Odd Length Lists:** Relevant for middle-finding, etc.
    *   **Edge Cases Specific to the Problem:**
        *   Removing the head.
        *   Removing the tail.
        *   Cycle at head/tail for cycle detection.
        *   Lists of minimum allowed size.

7.  **Discuss Time & Space Complexity:**
    *   Always articulate the complexity of your chosen solution.
    *   Be prepared to justify your choice (e.g., "I'm using the iterative solution for O(1) space complexity, but a recursive one would be O(N) due to call stack").

---

## Edge Cases and Gotchas

*   **Null Pointer Exceptions:** The most common error. Always check `if (node !== null)` before accessing `node.next` or `node.val`. This applies to `fast.next !== null` before `fast.next.next` in two-pointer problems.
*   **List Length:** Small lists (0, 1, 2 nodes) often behave differently. Your general solution should handle them gracefully.
*   **Modifying Head:** If the operation potentially changes the head of the list (e.g., removing the first element, reversing the list), ensure your function correctly returns the *new* head. A dummy node helps manage this.
*   **Creating Cycles:** When creating test cases for cycle detection, ensure the cycle is formed correctly and can be detected. Be mindful of where the tail points.
*   **Infinite Loops:** In cycle detection, if you make a mistake in pointer movement, `slow` and `fast` might never meet, leading to an infinite loop if `fast` never reaches `null`. Or, in reversing, `current` might never become `null`.

---

## Interview Tips specific to Problems Covered

### 1. Reverse Linked List
*   **Variations:**
    *   Reverse a sub-list (e.g., reverse from `m` to `n`). This requires careful handling of the nodes *before* `m` and *after* `n`.
    *   Reverse nodes in k-group.
*   **Tip:** Practice both iterative (O(1) space) and recursive (O(N) space) solutions. Interviewers often ask for both to assess understanding of recursion and memory implications.

### 2. Detect Cycle in Linked List
*   **Variations:**
    *   Return the node where the cycle begins (if a cycle exists). (Floyd's algorithm can be extended for this: once slow and fast meet, move slow back to head, then move slow and fast one step at a time until they meet again. That meeting point is the cycle start).
    *   Find the length of the cycle. (Once slow and fast meet, fix one, and move the other until they meet again, counting steps).
*   **Tip:** Always prefer Floyd's Tortoise and Hare (O(1) space) over the HashSet approach (O(N) space).

### 3. Merge Two Sorted Lists
*   **Variations:**
    *   Merge K sorted lists (can be solved by repeatedly merging two lists, or using a min-heap).
    *   Sort a linked list (can be done using merge sort, which involves splitting and merging).
*   **Tip:** Be comfortable with both iterative (O(1) space, generally preferred) and recursive (O(N) space, elegant) solutions. The iterative version is often more robust for very large lists.

### 4. Remove Nth Node From End of List
*   **Variations:**
    *   Find the middle of the linked list (use two pointers: fast moves twice as fast as slow).
    *   Remove all nodes with a specific value.
    *   Remove duplicates from a sorted/unsorted list.
*   **Tip:** The one-pass two-pointer solution is the optimal one. Ensure you understand the `n+1` offset for the fast pointer with a dummy node to correctly position `slow` before the node to remove. Mental walk-throughs with different `n` values (e.g., removing head, tail, middle) are essential.

---

By mastering these core problems and understanding their variations, you'll be well-prepared for almost any linked list question in a coding interview. Good luck!
```