# Stack and Queue Algorithm Explanations

This document provides detailed explanations of the algorithms used in the `stack_queue` project.

## Problem 1: Valid Parentheses

**Algorithm:** Uses a stack to track opening brackets.  When a closing bracket is encountered, it's checked against the top of the stack. If they match, the opening bracket is popped; otherwise, the string is invalid.

**Time Complexity:** O(n), where n is the length of the string.
**Space Complexity:** O(n) in the worst case (all opening brackets).

**Diagram (ASCII art):**

```
Input: "([{}])"

Stack: []  ->  [(]  ->  [([}  ->  [([  ->  []  ->  []  -> [] (Empty - Valid)
```


## Problem 2: Queue using Stacks (Explanation Omitted for Brevity)

## Problem 3: Stack using Queues (Explanation Omitted for Brevity)

## Problem 4: Reverse a Queue

**Algorithm:** Uses a stack as an intermediary to reverse the queue. Elements are pushed onto the stack from the queue, then popped back into the queue in reverse order.

**Time Complexity:** O(n)
**Space Complexity:** O(n)


## Problem 5: Largest Rectangular Area in Histogram (Explanation Omitted for Brevity)