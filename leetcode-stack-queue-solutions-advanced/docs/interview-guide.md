# Interview Guide: Stack and Queue

This document provides tips, common patterns, edge cases, and variations for Stack and Queue problems often encountered in coding interviews.

---

## General Interview Tips

1.  **Clarify the Problem**: Before writing any code, ensure you fully understand the problem. Ask clarifying questions:
    *   What are the input constraints (data types, size, range)?
    *   Are there any invalid inputs? How should they be handled?
    *   What are edge cases (empty input, single element, all same elements)?
    *   What is the expected output format?
    *   Are there any performance constraints (time/space limits)?
    *   Does the input need to be modified in-place or should a new structure be returned?

2.  **Talk Through Your Approach**: Articulate your thought process.
    *   Start with a brute-force or naive solution and explain why it might be suboptimal.
    *   Then, brainstorm how Stacks or Queues might improve efficiency.
    *   Clearly explain the logic behind your chosen approach.

3.  **Draw Diagrams (ASCII Art)**: Visualizing the stack/queue operations with examples is incredibly helpful for both you and the interviewer. Show how elements are pushed, popped, and how the data structure changes state.

4.  **Write Clean, Modular Code**:
    *   Use meaningful variable names.
    *   Break down complex logic into smaller, helper functions.
    *   Add comments for tricky parts, especially for time/space complexity.

5.  **Test Thoroughly**:
    *   Walk through your code with the provided examples.
    *   Test edge cases (empty, single element, extreme values, invalid inputs).
    *   Consider cases that break your assumptions.

6.  **Analyze Complexity**:
    *   Always state the time and space complexity of your solution.
    *   Explain *why* your solution has that complexity (e.g., "we iterate through the array once (O(N)), and each stack operation is O(1)").
    *   Be prepared to discuss tradeoffs if there are multiple solutions.

---

## Stack - Common Patterns and Use Cases

A Stack is a LIFO (Last-In, First-Out) data structure. Think of a stack of plates.

**Core Operations**: `push`, `pop`, `peek`, `isEmpty`, `size`.

**When to use a Stack**:
*   **Reversal**: If you need to reverse elements or process them in reverse order of their appearance.
    *   *Examples*: Reverse a string, check palindromes (by pushing half and comparing), evaluating postfix/prefix expressions.
*   **Matching/Balancing**: For checking if parentheses, brackets, or braces are balanced and correctly nested.
    *   *Examples*: Valid Parentheses, HTML tag validation.
*   **Tracking Previous/Next Greater/Smaller Element**: When you need to find the next greater/smaller element for each element in an array, or similar problems involving relative order. This often involves a "monotonic stack."
    *   *Examples*: Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram.
*   **Backtracking/DFS**: Implicitly used in recursion for managing function calls, explicitly used in iterative Deep-First Search (DFS).
    *   *Examples*: Maze solving (iterative DFS), expression parsing.
*   **Function Call Stack**: Understanding how recursion works implicitly uses a stack.

**Common Edge Cases for Stacks**:
*   Empty stack (attempting `pop` or `peek` on an empty stack).
*   Stack with a single element.
*   Stack that grows to its maximum possible size (e.g., all opening brackets).
*   Input with only elements that get popped immediately (e.g., "()()()").

**Interview Variations for Stacks**:
*   **Min Stack**: Design a stack that supports `push`, `pop`, `top`, and `getMin` in O(1) time. (Hint: use two stacks or store min with each element).
*   **Implement Queue using Stacks**: (As seen in this project)
*   **Stack from Scratch**: Implement a stack using an array or a linked list.
*   **Valid Parentheses Extensions**:
    *   Allow specific wildcard characters.
    *   Calculate minimum number of parentheses to remove to make valid.
*   **Trapping Rain Water**: Advanced problem involving finding water trapped between bars, often solvable with a monotonic stack.

---

## Queue - Common Patterns and Use Cases

A Queue is a FIFO (First-In, First-Out) data structure. Think of a line at a store.

**Core Operations**: `enqueue`, `dequeue`, `peek`, `isEmpty`, `size`.

**When to use a Queue**:
*   **Breadth-First Search (BFS)**: Fundamental for level-order traversal of trees and graphs.
    *   *Examples*: Shortest path in unweighted graph (like Walls and Gates), binary tree level order traversal, Rotten Oranges.
*   **Task Scheduling/Processing**: When tasks need to be processed in the order they arrive.
    *   *Examples*: Printer queues, CPU scheduling, web server request handling.
*   **Buffering**: Holding data temporarily before processing.
*   **Simulations**: Modeling real-world queues.
*   **Producer-Consumer Problem**: Often used as the buffer between producers and consumers.

**Common Edge Cases for Queues**:
*   Empty queue (attempting `dequeue` or `peek` on an empty queue).
*   Queue with a single element.
*   Queue where elements are immediately dequeued after enqueue (e.g., `enqueue(1), dequeue(), enqueue(2), dequeue()`).
*   Queue growing to its maximum capacity.

**Interview Variations for Queues**:
*   **Implement Stack using Queues**: (Reverse of Implement Queue using Stacks, often more complex).
*   **Circular Queue**: Implement a fixed-size queue that efficiently reuses array space.
*   **Deque (Double-Ended Queue)**: A queue that allows additions and removals from both ends. Used for problems like Sliding Window Maximum (as seen in this project) and finding palindromes.
*   **BFS on 2D Grid**: (As seen in Walls and Gates, common pattern).
    *   Count islands/connected components.
    *   Shortest path in a maze.
*   **Heap/Priority Queue**: While not a basic queue, a priority queue extends the concept, where elements are dequeued based on priority, not strictly arrival order.

---

## Memory Efficiency Considerations

*   **Array-based vs. Linked List-based**:
    *   **Arrays**: Generally more memory-efficient due to contiguous memory allocation and less overhead per element. However, resizing can be costly (`O(N)`). Efficient `Queue` implementations with arrays use two pointers (`head`, `tail`) to avoid `shift()` costs, with periodic re-indexing to prevent sparse arrays.
    *   **Linked Lists**: More memory overhead per element (due to pointers), but `O(1)` for insertions/deletions at ends without resizing issues.
    *   For most interview problems in JavaScript, an array-based `Stack` (`push`/`pop`) and an optimized array-based `Queue` (using `head`/`tail` pointers or `push`/`shift` for simplicity, being aware of `shift` cost) are acceptable.

*   **Storing Elements vs. Indices**:
    *   For problems like "Sliding Window Maximum", storing *indices* in the deque is more flexible than storing values, as you need to check if an element is out of the window based on its original position.
    *   This is generally a design choice based on the specific problem requirements.

---

## Conclusion

Mastering Stacks and Queues involves not just knowing their definitions but understanding *when* and *how* to apply them effectively. Practice diverse problems, pay attention to edge cases, and always articulate your thought process and complexity analysis. Good luck!

---