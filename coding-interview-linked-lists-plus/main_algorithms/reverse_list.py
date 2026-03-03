# main_algorithms/reverse_list.py

from utils.linked_list_utils import ListNode

class SolutionReverseList:
    """
    Problem: Reverse Linked List
    Given the head of a singly linked list, reverse the list, and return the reversed list.

    Example 1:
    Input: head = [1,2,3,4,5]
    Output: [5,4,3,2,1]

    Example 2:
    Input: head = [1,2]
    Output: [2,1]

    Example 3:
    Input: head = []
    Output: []
    """

    def reverseList_iterative(self, head: ListNode) -> ListNode:
        """
        Approach 1: Iterative Method
        This method uses three pointers: `prev`, `curr`, and `next_node`.
        It iterates through the list, re-pointing each node's `next` pointer
        to the `prev` node.

        Algorithm:
        1. Initialize `prev` to `None`. This will be the new tail of the reversed list.
        2. Initialize `curr` to `head`. This pointer traverses the original list.
        3. Loop while `curr` is not `None`:
           a. Store the next node: `next_node = curr.next`. This is crucial to not lose
              the rest of the list when we change `curr.next`.
           b. Reverse the current node's pointer: `curr.next = prev`.
           c. Move `prev` forward: `prev = curr`. `prev` now points to the node that
              was just reversed.
           d. Move `curr` forward: `curr = next_node`. `curr` now points to the next
              node in the original list to be processed.
        4. After the loop, `curr` will be `None`, and `prev` will be pointing to the
           original tail, which is now the new head of the reversed list. Return `prev`.

        Complexity Analysis:
        - Time Complexity: O(N), where N is the number of nodes in the linked list.
          We iterate through the list exactly once.
        - Space Complexity: O(1). We only use a few extra pointers (`prev`, `curr`, `next_node`),
          which is constant space regardless of the list size.
        """
        prev = None
        curr = head
        while curr:
            next_node = curr.next # Store next node
            curr.next = prev      # Reverse current node's pointer
            prev = curr           # Move prev to current node
            curr = next_node      # Move curr to next original node
        return prev

    def reverseList_recursive(self, head: ListNode) -> ListNode:
        """
        Approach 2: Recursive Method
        This method uses recursion to reverse the list. The idea is to reverse
        the sublist starting from the second node and then append the head to its tail.

        Algorithm:
        1. Base Case: If the list is empty (`head` is `None`) or has only one node
           (`head.next` is `None`), it's already reversed. Return `head`.
        2. Recursive Step:
           a. Recursively call `reverseList_recursive` on `head.next`. This will
              return the new head of the reversed sublist (e.g., if original was 1->2->3->4,
              this call on 2->3->4 returns 4->3->2). Let's call this `new_head`.
           b. At this point, `head.next` (which is the second node of the original list)
              is now the tail of the reversed sublist. We want to connect `head` to its
              `next` pointer. So, `head.next.next = head`. This makes `2->1` from `1->2`.
           c. `head` is now the last node in the reversed sublist, so its `next` should
              be `None`. `head.next = None`.
           d. Return `new_head`, which is the head of the fully reversed list.

        Example trace for 1->2->3->None:
        - reverseList_recursive(1->2->3):
            - Calls reverseList_recursive(2->3):
                - Calls reverseList_recursive(3):
                    - Base case: head.next is None. Returns 3. (new_head = 3)
                - Back in reverseList_recursive(2->3):
                    - new_head = 3
                    - head = 2. head.next (which is 3) points to 2. (3->2)
                    - head.next (which is 2) points to None. (2->None)
                    - Returns 3. (new_head = 3->2)
            - Back in reverseList_recursive(1->2->3):
                - new_head = 3->2
                - head = 1. head.next (which is 2) points to 1. (2->1)
                - head.next (which is 1) points to None. (1->None)
                - Returns 3. (new_head = 3->2->1)

        Complexity Analysis:
        - Time Complexity: O(N), where N is the number of nodes. Each node is visited
          once during the recursion unwinding.
        - Space Complexity: O(N) due to the recursion stack. In the worst case (a long list),
          the depth of the recursion can be N.
        """
        if not head or not head.next:
            return head

        # Recursively reverse the rest of the list
        new_head = self.reverseList_recursive(head.next)

        # Attach the current head to the end of the reversed sublist
        # If head was 1, head.next was 2. After recursive call, 2's next might be 3.
        # Now, head.next is the node that was originally after head (e.g., 2).
        # We want that node (2) to point back to head (1).
        head.next.next = head
        
        # The original head (1) is now the tail, so its next should be None
        head.next = None

        return new_head