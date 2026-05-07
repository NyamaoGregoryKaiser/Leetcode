```python
from typing import Optional, List
# Assuming ListNode and utilities are available via package structure or relative import
from utils.linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list

class LinkedListProblems:
    """
    A collection of common Linked List problems with optimal solutions.
    """

    @staticmethod
    def reverse_list_iterative(head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 1: Reverse a Singly Linked List (Iterative Approach)

        Given the head of a singly linked list, reverse the list, and return the reversed list.

        Example:
            Input: head = [1,2,3,4,5]
            Output: [5,4,3,2,1]

        Approach: Iterative
        We use three pointers: `prev`, `curr`, and `next_temp`.
        - `prev` keeps track of the previous node (initially None).
        - `curr` is the current node we are processing (initially `head`).
        - `next_temp` temporarily stores the next node before `curr.next` is changed.

        Algorithm:
        1. Initialize `prev = None` and `curr = head`.
        2. While `curr` is not `None`:
           a. Store the next node: `next_temp = curr.next`.
           b. Reverse the current node's pointer: `curr.next = prev`.
           c. Move `prev` to `curr`: `prev = curr`.
           d. Move `curr` to `next_temp`: `curr = next_temp`.
        3. After the loop, `prev` will be the new head of the reversed list.

        Time Complexity: O(N), where N is the number of nodes in the linked list.
                         We visit each node exactly once.
        Space Complexity: O(1). We only use a few extra pointers, independent of input size.
        """
        prev: Optional[ListNode] = None
        curr: Optional[ListNode] = head

        while curr:
            next_temp = curr.next  # Store next node
            curr.next = prev       # Reverse current node's pointer
            prev = curr            # Move prev to current node
            curr = next_temp       # Move current to next node

        return prev # prev will be the new head

    @staticmethod
    def reverse_list_recursive(head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 1: Reverse a Singly Linked List (Recursive Approach)

        Given the head of a singly linked list, reverse the list, and return the reversed list.

        Approach: Recursive
        The idea is to recursively reverse the sublist starting from `head.next`,
        and then fix the pointers for the current `head` node.

        Algorithm:
        1. Base case: If `head` is `None` or `head.next` is `None` (single node), it's already reversed.
           Return `head`.
        2. Recursive step:
           a. Recursively call `reverse_list_recursive` on `head.next`. Let the result be `new_head`.
              `new_head` will be the actual head of the fully reversed list (e.g., if input is 1->2->3,
              after reversing 2->3 to 3->2, `new_head` is 3).
           b. Now, `head.next` points to the node that was originally next to `head`.
              This node (let's call it `second_node`) now has its `next` pointer pointing to `None`
              (because its original `next` was reversed to point to `head.next.next`).
              We need to make `second_node.next` point back to `head`.
              So, `head.next.next = head`.
           c. Set `head.next = None` to break the original link and ensure `head` becomes the tail.
        3. Return `new_head`.

        Time Complexity: O(N), where N is the number of nodes. Each node is visited once.
        Space Complexity: O(N) due to the recursion call stack. In the worst case (a long list),
                          it can lead to stack overflow for very large N.
        """
        # Base case: empty list or single node list
        if not head or not head.next:
            return head

        # Recursively reverse the rest of the list
        new_head = LinkedListProblems.reverse_list_recursive(head.next)

        # After the recursive call returns, 'head.next' is the head of the reversed sublist.
        # For example, if original was 1->2->3->4, and new_head is 4->3->2,
        # then head is 1, head.next is 2. The sublist 2->3->4 was reversed to 4->3->2.
        # Now, we need to connect 1 to the end of the reversed sublist (which is 2).
        head.next.next = head # Make the original next node point back to head
        head.next = None      # Disconnect head from its original next (it's now the tail)

        return new_head # The actual head of the fully reversed list

    @staticmethod
    def has_cycle(head: Optional[ListNode]) -> bool:
        """
        Problem 2: Linked List Cycle

        Given the head of a linked list, return true if the list has a cycle in it.
        There is a cycle in a linked list if there is some node in the list that can be reached
        again by continuously following the next pointer.

        Approach: Floyd's Tortoise and Hare (Fast and Slow Pointers)
        This algorithm uses two pointers, a 'slow' pointer that moves one step at a time,
        and a 'fast' pointer that moves two steps at a time.
        If there is a cycle, the fast pointer will eventually catch up to the slow pointer
        (they will meet at some node within the cycle). If there is no cycle, the fast pointer
        will reach the end of the list (None).

        Algorithm:
        1. Initialize `slow = head` and `fast = head`.
        2. While `fast` and `fast.next` are not `None`:
           a. Move `slow` one step: `slow = slow.next`.
           b. Move `fast` two steps: `fast = fast.next.next`.
           c. If `slow == fast`, a cycle is detected. Return `True`.
        3. If the loop finishes, it means `fast` (or `fast.next`) became `None`, so there's no cycle.
           Return `False`.

        Time Complexity: O(N). In the worst case (no cycle or a very long cycle),
                         the fast pointer traverses the list. Each step of fast covers 2 nodes,
                         and slow covers 1 node. So, total work is proportional to N.
        Space Complexity: O(1). Only two pointers are used.
        """
        if not head:
            return False

        slow: Optional[ListNode] = head
        fast: Optional[ListNode] = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        
        return False

    @staticmethod
    def detect_cycle_start(head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 2 Variation: Find the starting node of the cycle.

        If there is a cycle, return the node where the cycle begins.
        If there is no cycle, return None.

        Approach: Floyd's Tortoise and Hare with a second pass.
        1. Use the standard Floyd's algorithm to detect a cycle. If no cycle, return None.
        2. If a cycle is detected (slow == fast), reset one pointer (e.g., `slow_again = head`).
        3. Move both `slow_again` and `fast` (the meeting point pointer) one step at a time.
        4. The node where they meet is the start of the cycle.

        Proof (Intuition):
        - Let `D` be the distance from head to the start of the cycle.
        - Let `L` be the length of the cycle.
        - Let `K` be the distance from the cycle start to the meeting point.

        When `slow` and `fast` meet:
        - `slow` has traveled `D + K` steps.
        - `fast` has traveled `D + K + m*L` steps (where `m` is some integer for cycle traversals).
        - Since `fast` moves twice as fast as `slow`: `2 * (D + K) = D + K + m*L`
        - Simplifying: `D + K = m*L`
        - Rearranging: `D = m*L - K` or `D = (m-1)*L + (L-K)`

        This means that the distance from the head to the cycle start (`D`) is equal to
        the distance from the meeting point back to the cycle start (`L-K`, potentially plus full cycles).
        So, if we put one pointer at `head` and one at `meeting_point`, and move them one step at a time,
        they will meet exactly at the cycle's starting node.

        Time Complexity: O(N). Two passes over the list in the worst case (first to detect, second to find start).
        Space Complexity: O(1). Only a few pointers are used.
        """
        if not head:
            return None

        slow: Optional[ListNode] = head
        fast: Optional[ListNode] = head
        
        # Step 1: Detect if a cycle exists
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                # Cycle detected
                break
        else:
            # No cycle found (fast or fast.next became None)
            return None

        # Step 2: Find the starting node of the cycle
        # If a cycle exists, 'slow' and 'fast' met.
        # Now, move one pointer to the head, and both move one step at a time.
        # They will meet at the start of the cycle.
        pointer1: Optional[ListNode] = head
        pointer2: Optional[ListNode] = slow # or fast, doesn't matter, they are at the same point

        while pointer1 != pointer2:
            pointer1 = pointer1.next
            pointer2 = pointer2.next
        
        return pointer1 # This is the start of the cycle


    @staticmethod
    def merge_two_lists_iterative(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 3: Merge Two Sorted Lists (Iterative Approach)

        Merge two sorted linked lists and return it as a new sorted list.
        The new list should be made by splicing together the nodes of the first two lists.

        Example:
            Input: l1 = [1,2,4], l2 = [1,3,4]
            Output: [1,1,2,3,4,4]

        Approach: Iterative
        Use a dummy node to simplify the logic of adding to the merged list and handling the head.
        Maintain a `current` pointer to the tail of the merged list.

        Algorithm:
        1. Create a `dummy_head` node (e.g., with value 0 or -1).
        2. Initialize `current = dummy_head`.
        3. While both `l1` and `l2` are not `None`:
           a. Compare `l1.val` and `l2.val`.
           b. Append the smaller node to `current.next`.
           c. Move the corresponding list pointer forward (e.g., if `l1.val` was smaller, `l1 = l1.next`).
           d. Move `current` to the newly added node (`current = current.next`).
        4. After the loop, one of the lists might still have remaining elements.
           Append the rest of the non-empty list to `current.next`.
        5. The merged list starts from `dummy_head.next`.

        Time Complexity: O(N + M), where N and M are the lengths of l1 and l2 respectively.
                         We visit each node from both lists exactly once.
        Space Complexity: O(1) if we are modifying the existing nodes' `next` pointers.
                          (The space for the new dummy node is constant).
        """
        dummy_head = ListNode(0) # Sentinel node
        current = dummy_head

        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        # Append the remaining list (if any)
        if l1:
            current.next = l1
        elif l2:
            current.next = l2
        
        return dummy_head.next

    @staticmethod
    def merge_two_lists_recursive(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 3: Merge Two Sorted Lists (Recursive Approach)

        Approach: Recursive
        The base cases are when one of the lists is empty.
        In the recursive step, compare the heads of `l1` and `l2`.
        The smaller node becomes the head of the merged list, and its `next` pointer
        is set to the result of merging the rest of its list with the other list.

        Algorithm:
        1. Base cases:
           a. If `l1` is `None`, return `l2`.
           b. If `l2` is `None`, return `l1`.
        2. Recursive step:
           a. If `l1.val <= l2.val`:
              `l1.next = merge_two_lists_recursive(l1.next, l2)`
              Return `l1`.
           b. Else (`l2.val < l1.val`):
              `l2.next = merge_two_lists_recursive(l1, l2.next)`
              Return `l2`.

        Time Complexity: O(N + M). Each recursive call performs constant work and reduces the total
                         number of nodes to process. There will be N+M calls.
        Space Complexity: O(N + M) due to the recursion call stack. In the worst case (e.g., one list much
                          longer than the other, or alternating elements), the depth of recursion
                          can be N+M.
        """
        # Base cases
        if not l1:
            return l2
        if not l2:
            return l1

        # Recursive step
        if l1.val <= l2.val:
            l1.next = LinkedListProblems.merge_two_lists_recursive(l1.next, l2)
            return l1
        else:
            l2.next = LinkedListProblems.merge_two_lists_recursive(l1, l2.next)
            return l2


    @staticmethod
    def remove_nth_from_end(head: Optional[ListNode], n: int) -> Optional[ListNode]:
        """
        Problem 4: Remove Nth Node From End of List

        Given the head of a linked list, remove the nth node from the end of the list and return its head.

        Example:
            Input: head = [1,2,3,4,5], n = 2
            Output: [1,2,3,5]
            (Removes 4)

            Input: head = [1], n = 1
            Output: []

            Input: head = [1,2], n = 2
            Output: [2]
            (Removes 1)

        Approach: Two Pointers (Single Pass)
        We use two pointers, `slow` and `fast`, separated by `n` nodes.
        When `fast` reaches the end of the list, `slow` will be at the node *before* the Nth node from the end.
        This allows `slow` to directly modify `slow.next` to remove the target node.

        Algorithm:
        1. Create a `dummy_head` node and point its `next` to `head`. This simplifies edge cases
           like removing the head node.
        2. Initialize `slow = dummy_head` and `fast = dummy_head`.
        3. Move `fast` `n+1` steps forward. This creates a gap of `n` nodes between `slow` and `fast`,
           and `fast` is one node ahead of where it would be if the gap was just `n`.
           The reason for `n+1` steps is to ensure `slow` stops *before* the node to be removed.
        4. While `fast` is not `None`:
           a. Move both `slow` and `fast` one step forward.
        5. When `fast` reaches `None`, `slow` will be pointing to the node directly preceding
           the node to be removed.
        6. Remove the node: `slow.next = slow.next.next`.
        7. Return `dummy_head.next`.

        Time Complexity: O(N), where N is the number of nodes. Both pointers traverse the list once.
        Space Complexity: O(1). Only a few extra pointers are used.
        """
        dummy_head = ListNode(0)
        dummy_head.next = head

        slow: Optional[ListNode] = dummy_head
        fast: Optional[ListNode] = dummy_head

        # Move fast n+1 steps ahead of slow
        # This makes the gap between slow and fast (n nodes + the node to be removed)
        # When fast reaches end, slow will be at node *before* the one to be removed
        for _ in range(n + 1):
            if fast: # Ensure fast doesn't become None prematurely
                fast = fast.next
            else:
                # This case implies n is larger than the list length, or head was None
                # LeetCode problem constraints usually guarantee n is valid, but defensive check
                return head # Or raise an error, depending on spec

        # Move both pointers until fast reaches the end
        while fast:
            slow = slow.next
            fast = fast.next
        
        # Now, slow is pointing to the node right before the one to be removed
        # The node to remove is slow.next
        if slow and slow.next:
            slow.next = slow.next.next
        
        return dummy_head.next

    @staticmethod
    def add_two_numbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        """
        Problem 5: Add Two Numbers

        You are given two non-empty linked lists representing two non-negative integers.
        The digits are stored in reverse order, and each of their nodes contains a single digit.
        Add the two numbers and return the sum as a linked list.
        You may assume the two numbers do not contain any leading zero, except the number 0 itself.

        Example:
            Input: l1 = [2,4,3], l2 = [5,6,4]  (Represents 342 + 465)
            Output: [7,0,8]                    (Represents 807)

        Approach: Iterative with Carry
        Simulate manual addition process, digit by digit, from right to left (which is head to tail in reverse order).

        Algorithm:
        1. Create a `dummy_head` node (e.g., with value 0). This will point to the head of the result list.
        2. Initialize `current = dummy_head` and `carry = 0`.
        3. Loop while `l1` is not `None` OR `l2` is not `None` OR `carry` is not 0:
           a. Get the values of the current digits (or 0 if a list is exhausted):
              `val1 = l1.val if l1 else 0`
              `val2 = l2.val if l2 else 0`
           b. Calculate the sum: `total_sum = val1 + val2 + carry`.
           c. Update `carry`: `carry = total_sum // 10`.
           d. Get the digit for the new node: `digit = total_sum % 10`.
           e. Create a new node with `digit` and append it to `current.next`.
           f. Move `current` to the new node: `current = current.next`.
           g. Advance `l1` and `l2` if they are not `None`.
        4. Return `dummy_head.next`.

        Time Complexity: O(max(N, M)), where N and M are the lengths of l1 and l2.
                         We iterate through the longer list at most once.
        Space Complexity: O(max(N, M)). A new linked list is created to store the sum,
                          which will have at most max(N, M) + 1 nodes.
        """
        dummy_head = ListNode(0)
        current = dummy_head
        carry = 0

        while l1 or l2 or carry: # Continue as long as there are digits or a carry
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            # Calculate sum and new carry
            total_sum = val1 + val2 + carry
            carry = total_sum // 10
            digit = total_sum % 10

            # Create new node and append
            current.next = ListNode(digit)
            current = current.next

            # Move to the next nodes in l1 and l2
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
        
        return dummy_head.next
```