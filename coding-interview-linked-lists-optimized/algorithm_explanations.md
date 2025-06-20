# Algorithm Explanations

This document provides detailed explanations of the linked list algorithms implemented in this project.

## 1. Reverse Linked List

**Algorithm:**  The iterative approach uses three pointers: `prev`, `curr`, and `nextTemp`.  It iterates through the list, reversing the `next` pointer of each node.

**Time Complexity:** O(n) - We traverse the list once.
**Space Complexity:** O(1) - We use a constant amount of extra space.


## 2. Detect Cycle (Floyd's Tortoise and Hare)

**Algorithm:** Floyd's cycle-finding algorithm uses two pointers, a "slow" pointer and a "fast" pointer. The slow pointer moves one node at a time, while the fast pointer moves two nodes at a time. If there is a cycle, the fast pointer will eventually lap the slow pointer.

**Time Complexity:** O(n) in the worst case (no cycle).
**Space Complexity:** O(1)


## 3. Merge Two Sorted Lists  (Implementation left as exercise)

## 4. Remove Nth Node From End (Implementation left as exercise)

## 5. Palindrome Linked List (Implementation left as exercise)