This document provides detailed explanations of the implemented linked list algorithms.


**1. Reverse Linked List:**

* **Iterative Approach:** The iterative approach uses three pointers: `prev`, `curr`, and `nextTemp`.  It iterates through the list, reversing the `next` pointer of each node.
* **Recursive Approach:** (To be added) A recursive approach can elegantly reverse the list.  The base case is an empty or single-node list.  Otherwise, recursively reverse the rest of the list and then append the current node to the end of the reversed list.


**2. Detect Cycle:**

* **Floyd's Tortoise and Hare:** This algorithm uses two pointers, a "slow" pointer and a "fast" pointer. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. If there is a cycle, the fast pointer will eventually catch up to the slow pointer.


**3. Merge Two Sorted Lists:** (To be added)


**4. Remove Nth Node From End:** (To be added)


**5. Palindrome Linked List:** (To be added)