# Linked List Interview Project

This project provides a comprehensive set of coding interview problems focused on Linked Lists. It includes multiple problem statements, optimal solutions with different approaches, detailed explanations, performance analysis, extensive test cases, and benchmarking code.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [How to Run](#how-to-run)
3.  [Data Structures and Utilities](#data-structures-and-utilities)
4.  [Problems and Solutions](#problems-and-solutions)
    *   [Problem 1: Reverse Linked List](#problem-1-reverse-linked-list)
    *   [Problem 2: Middle of the Linked List](#problem-2-middle-of-the-linked-list)
    *   [Problem 3: Merge Two Sorted Lists](#problem-3-merge-two-sorted-lists)
    *   [Problem 4: Detect and Remove Cycle](#problem-4-detect-and-remove-cycle)
5.  [Performance Benchmarking](#performance-benchmarking)
6.  [Interview Tips and Variations](#interview-tips-and-variations)
7.  [Edge Cases and Gotchas](#edge-cases-and-gotchas)

---

## 1. Project Overview

This project aims to simulate a realistic coding interview experience for Linked List problems. It covers fundamental concepts such as pointer manipulation, two-pointer techniques, recursion, and iterative approaches, along with handling various edge cases. Each problem includes:

*   **Problem Description:** Clear statement of the problem.
*   **Multiple Approaches:** Different ways to solve the problem, often including brute force (if applicable) and optimized solutions.
*   **Optimal Solution:** The most efficient approach in terms of time and space complexity.
*   **Detailed Comments:** Inline comments explaining the logic and steps.
*   **Time and Space Complexity Analysis:** A thorough breakdown of the resource usage.
*   **ASCII Art Diagrams:** Visual aids to understand pointer movements for complex problems.
*   **Extensive Test Cases:** JUnit tests covering normal, empty, single-node, and specific edge cases.
*   **Performance Benchmarking:** Code to compare the execution time of different solutions.

## 2. How to Run

This project uses Java and JUnit 5 for testing.

**Prerequisites:**
*   Java Development Kit (JDK) 8 or higher
*   A build tool like Maven or Gradle (or just compile and run manually)

**Using a standard Java IDE (IntelliJ IDEA, Eclipse, VS Code with Java extensions):**

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd linked-list-interview-project
    ```
2.  **Open the project:** Import the `linked-list-interview-project` directory as a new Java project in your IDE. Most IDEs will automatically detect the source folders.
3.  **Run Tests:** Navigate to `src/test/java/com/linkedlist/tests/` and run the JUnit tests for individual problems or all tests.
4.  **Run Benchmarker:** Navigate to `src/main/java/com/linkedlist/performance/LinkedListBenchmarker.java` and run its `main` method to see performance comparisons.

**Manual Compilation and Execution (from project root):**

1.  **Compile Main Source Files:**
    ```bash
    javac -d out src/main/java/com/linkedlist/*.java src/main/java/com/linkedlist/problems/*.java src/main/java/com/linkedlist/performance/*.java
    ```
2.  **Run Benchmarker:**
    ```bash
    java -cp out com.linkedlist.performance.LinkedListBenchmarker
    ```
3.  **To run tests manually, you'd need JUnit on your classpath.** This is generally easier done within an IDE or using a build tool. For this project, assume IDE integration for testing.

## 3. Data Structures and Utilities

*   **`ListNode.java`**:
    A fundamental building block for all linked list problems. Represents a single node in a singly linked list.
    ```java
    class ListNode {
        int val;
        ListNode next;
        // Constructors
    }
    ```

*   **`LinkedListUtils.java`**:
    Provides helpful static methods to create, manipulate, and visualize linked lists, especially useful for testing and debugging.
    *   `createLinkedList(int[] arr)`: Creates a linked list from an array.
    *   `printList(ListNode head)`: Prints the linked list elements.
    *   `areEqual(ListNode l1, ListNode l2)`: Compares two linked lists for equality.
    *   `createListWithCycle(int[] arr, int pos)`: Creates a linked list with a cycle.
    *   `getNthNode(ListNode head, int n)`: Gets the Nth node in a list (useful for creating cycles).

## 4. Problems and Solutions

### Problem 1: Reverse Linked List

**Description:** Given the `head` of a singly linked list, reverse the list, and return the reversed list.

**Example:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
Output: `5 -> 4 -> 3 -> 2 -> 1 -> NULL`

**Approaches:**
1.  **Iterative (Optimal):** Uses three pointers (`prev`, `curr`, `nextTemp`) to reverse the links one by one.
2.  **Recursive:** Breaks the problem down into reversing the rest of the list and then attaching the current node.

**ASCII Art - Iterative Reversal:**
```
Initial:
prev=NULL
curr=1 -> 2 -> 3 -> NULL

Iteration 1 (curr=1):
nextTemp = 2
curr.next = prev (1 -> NULL)
prev = curr (prev=1)
curr = nextTemp (curr=2)

State:
prev=1 -> NULL
curr=2 -> 3 -> NULL

Iteration 2 (curr=2):
nextTemp = 3
curr.next = prev (2 -> 1 -> NULL)
prev = curr (prev=2)
curr = nextTemp (curr=3)

State:
prev=2 -> 1 -> NULL
curr=3 -> NULL

... continues until curr is NULL.
Finally, prev will be the new head.
```

### Problem 2: Middle of the Linked List

**Description:** Given the `head` of a singly linked list, return the middle node of the list. If there are two middle nodes, return the second middle node.

**Example 1:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> NULL`
Output: `3 -> 4 -> 5 -> NULL` (node with value 3)

**Example 2:**
Input: `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL`
Output: `4 -> 5 -> 6 -> NULL` (node with value 4)

**Approach:**
1.  **Fast and Slow Pointers (Optimal):**
    *   Initialize two pointers, `slow` and `fast`, both pointing to the head.
    *   Move `fast` two steps at a time and `slow` one step at a time.
    *   When `fast` reaches the end of the list (or `fast.next` is null for odd length lists), `slow` will be at the middle.

**ASCII Art - Fast and Slow Pointers:**
```
List: 1 -> 2 -> 3 -> 4 -> 5 -> NULL

Initial:
slow: 1
fast: 1

Step 1:
slow: 2
fast: 3

Step 2:
slow: 3
fast: 5

Step 3:
slow: 4
fast: NULL (fast.next is NULL) -> Loop ends.

Result: slow points to 3.
```

### Problem 3: Merge Two Sorted Lists

**Description:** You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into a single **sorted** list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Example:**
Input: `list1 = [1,2,4]`, `list2 = [1,3,4]`
Output: `[1,1,2,3,4,4]`

**Approaches:**
1.  **Iterative (Optimal):** Use a dummy head node and an `iterator` pointer. Compare nodes from `list1` and `list2`, attaching the smaller one to the `iterator.next` and advancing the corresponding list's pointer.
2.  **Recursive:** The base cases are when one list is empty. Otherwise, compare heads; the smaller head becomes the current node, and its `next` points to the recursive call result of the remaining lists.

### Problem 4: Detect and Remove Cycle

**Description:** Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`. If a cycle is detected, remove it.

**Example (Cycle at node 2):**
Input: `3 -> 2 -> 0 -> -4`
              `^         |`
              `|_________|`
Output: `Node with value 2` (after removal: `3 -> 2 -> 0 -> -4 -> NULL`)

**Approaches:**
1.  **Floyd's Tortoise and Hare (Optimal O(1) space):**
    *   Use fast and slow pointers to detect a cycle. If they meet, a cycle exists.
    *   To find the start of the cycle: Reset `slow` to `head`. Move `slow` and `fast` one step at a time. The point where they meet again is the start of the cycle.
    *   To remove the cycle: Find the node *before* the cycle start by advancing one pointer until its next is the cycle start. Set its `next` to `null`.
2.  **Hash Set (O(N) space):**
    *   Traverse the list, storing each node in a hash set. If a node is encountered that is already in the set, a cycle is detected, and that node is the cycle start.

**ASCII Art - Floyd's Tortoise and Hare (Detection):**
```
List: 1 -> 2 -> 3 -> 4 -> 5 -> 3 (cycle back to 3)

Initial:
slow: 1
fast: 1

Step 1:
slow: 2
fast: 3

Step 2:
slow: 3
fast: 5

Step 3:
slow: 4
fast: 4 (They meet! Cycle detected)
```

**ASCII Art - Floyd's Tortoise and Hare (Finding Cycle Start & Removal):**
```
After detection, fast and slow met at node 4.
List: 1 -> 2 -> (3) -> 4 -> 5 -> (3)
              ^---------^

1. Reset slow to head:
   head: 1
   slow: 1
   fast: 4 (still at meeting point)

2. Move head and fast one step at a time:
   head: 1 -> 2
   fast: 4 -> 5

   head: 2 -> 3 (MEET!)
   fast: 5 -> 3 (MEET!)

   They meet at node 3. This is the cycle start.

3. To remove, find node before cycle start:
   - Use a pointer `p` starting from `head`.
   - Use a pointer `q` starting from `cycleStart` (node 3).
   - Advance `p` and `q` until `p.next == q.next`. (This finds the node whose `next` points to the cycle start, within the cycle path itself).
   - A simpler way: use `slow` (now at cycle start) and another pointer `curr` from `head`. Advance both. When `curr.next == slow`, then `curr` is the node before cycle start.
   - Even simpler for removal if you have the cycle start: traverse from head until you reach the cycle start, count 'k' steps. Then traverse 'k' steps from cycle start, the node *before* `cycleStart` will be found.
   - For Floyd's, once `slow` and `fast` meet at the start of the cycle, simply iterate one more pointer from the head, and another from the meeting point, advancing both by one step. The point where they meet again is the start of the cycle. Then, to remove, keep one pointer at the meeting point and another *before* it, advancing it until it points to the cycle start.
   - **Revised Removal (after finding `cycleStart`):**
     Initialize `current = head`.
     While `current.next != cycleStart`, move `current = current.next`.
     Then `current.next = null`.
     (This is incorrect if `cycleStart` is `head`. A more robust way is to find the node whose `next` is `cycleStart` while traversing *within* the cycle, or from the head to find the "pre-cycle" node.)

   - **Correct Removal for Floyd's:**
     `pointer1` at `head`.
     `pointer2` at `cycleStart`.
     Advance `pointer1` until `pointer1.next == pointer2`. (This means `pointer1` is the node *before* the cycle entry, coming from the head.)
     Then `pointer1.next = null`.

     No, wait. Once you have `cycleStart`, you need the *last node in the cycle* whose `next` points to `cycleStart`.
     `curr = cycleStart`
     While `curr.next != cycleStart`, `curr = curr.next`.
     Then `curr.next = null`.

     This is the most direct way to remove the cycle once the start is found.
```

## 5. Performance Benchmarking

The `LinkedListBenchmarker.java` file provides a simple framework to compare the execution times of different approaches for the problems. It uses `System.nanoTime()` to measure the time taken for various operations.

To run the benchmarker:
`java -cp out com.linkedlist.performance.LinkedListBenchmarker` (if using manual compilation)
Or run the `main` method directly from your IDE.

## 6. Interview Tips and Variations

*   **Always clarify constraints:** Are values unique? What's the range of `N` (number of nodes)? Can the list be empty?
*   **Draw diagrams:** Especially for pointer manipulation problems (reversal, cycles), diagrams are crucial for visualizing and debugging. ASCII art is a great tool for this.
*   **Think about edge cases first:** Empty list, single node list, two-node list. These often break naive solutions.
*   **Complexity analysis:** Be prepared to discuss time and space complexity for your solution(s). Justify your choices.
*   **Explain your thought process:** Talk out loud. Don't just jump to code. Explain your initial thoughts, how you'd refine them, and why you choose a particular approach.
*   **"What if" scenarios:** Be ready for variations.
    *   **Reverse:** Reverse a sublist (e.g., between `m` and `n`).
    *   **Middle:** Return the first middle node instead of the second for even lists. Find `k`th node from end.
    *   **Merge:** Merge k sorted lists.
    *   **Cycle:** Find length of cycle.
*   **Dummy Node:** Often useful for problems involving modifying the head of a linked list (e.g., merging, deleting head, adding before head). It simplifies code by avoiding null checks for the actual head.
*   **Singly vs. Doubly:** Most problems are for singly linked lists. If it's doubly, point out how that simplifies/changes things (e.g., reversal is easier with `prev` pointers readily available).

## 7. Edge Cases and Gotchas

*   **Empty List (`head == null`):** Most operations on an empty list should either return `null` or handle gracefully.
*   **Single Node List (`head.next == null`):** A list with one node is often a base case.
*   **Two Node List (`head.next.next == null`):** Sometimes behaves differently than longer lists.
*   **Even vs. Odd Length:** For problems like "Middle Node" or "Kth from end," even and odd lengths might result in different outcomes or require careful pointer handling.
*   **Off-by-one errors:** Especially when dealing with indices, `k`th node, or loop conditions.
*   **Null Pointer Exceptions (NPEs):** When traversing, always check `node != null` before accessing `node.next`. If using `node.next.next`, ensure `node.next != null` first.
*   **Modifying the `head`:** If your solution changes the `head` of the list (e.g., deletion at head, reversal), ensure you return the new head correctly. A dummy node can help here.
*   **Infinite loops in cycle detection:** If your fast/slow pointers are not handled correctly, they might never meet or jump over each other.
*   **Removing cycle:** Make sure to set the `next` pointer of the *last node in the cycle* to `null` to break it.

---
This concludes the README. Let's proceed with the code files.
---