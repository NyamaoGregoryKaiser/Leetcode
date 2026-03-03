# main_algorithms/remove_nth_from_end.py

from utils.linked_list_utils import ListNode

class SolutionRemoveNthFromEnd:
    """
    Problem: Remove Nth Node From End of List
    Given the head of a linked list, remove the nth node from the end of the list
    and return its head.

    Example 1:
    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]

    Example 2:
    Input: head = [1], n = 1
    Output: []

    Example 3:
    Input: head = [1,2], n = 1
    Output: [1]
    """

    def removeNthFromEnd_two_pass(self, head: ListNode, n: int) -> ListNode:
        """
        Approach 1: Two-pass Algorithm
        First pass: Calculate the length of the list.
        Second pass: Traverse to the (length - n)th node and remove the next node.

        Algorithm:
        1. Edge Case: If the list is empty, return None.
        2. First Pass (Calculate Length):
           a. Initialize a `dummy_head` node and point its `next` to `head`.
              This simplifies handling cases where the head itself needs to be removed.
           b. Traverse the list from `dummy_head` to find its total length.
           c. `length = 0` (or 1 if starting from head and incrementing from there).
              Keep traversing until `curr` is `None`.
        3. Calculate the position of the node to remove from the beginning:
           `pos_to_remove = length - n`.
           If `pos_to_remove` is 0, it means we need to remove the original head.
        4. Second Pass (Remove Node):
           a. Reset `current` pointer to `dummy_head`.
           b. Traverse `pos_to_remove` steps from `dummy_head`. The `current` pointer
              will then be at the node *before* the one to be removed.
           c. Perform the removal: `current.next = current.next.next`.
        5. Return `dummy_head.next`.

        Complexity Analysis:
        - Time Complexity: O(L), where L is the length of the linked list.
          We traverse the list once to find the length (O(L)) and once again
          to find the (L-n)th node (O(L)). Total is O(L).
        - Space Complexity: O(1). We only use a few extra pointers.
        """
        if not head:
            return None

        dummy_head = ListNode(0)
        dummy_head.next = head

        length = 0
        current = head
        while current:
            length += 1
            current = current.next
        
        # The node to remove is at index `length - n` (0-indexed)
        # We need to stop at the node before it, i.e., at index `length - n - 1`.
        # So we iterate `length - n` times from dummy_head.
        steps_to_predecessor = length - n
        
        if steps_to_predecessor < 0:
            # This case means n > length, which per problem constraints usually doesn't happen,
            # but good to be aware. For Nth from end, N is guaranteed to be valid.
            return head # Or raise error

        current = dummy_head
        for _ in range(steps_to_predecessor):
            current = current.next
        
        # current is now the node *before* the one to be removed
        current.next = current.next.next

        return dummy_head.next

    def removeNthFromEnd_one_pass(self, head: ListNode, n: int) -> ListNode:
        """
        Approach 2: One-pass Algorithm (Two Pointers)
        This method uses two pointers, `fast` and `slow`, separated by `n` nodes.
        When `fast` reaches the end of the list, `slow` will be at the node
        *before* the one to be removed.

        Algorithm:
        1. Edge Case: If the list is empty, return None.
        2. Create a `dummy_head` node and point its `next` to `head`.
           This simplifies handling cases where the head itself needs to be removed.
        3. Initialize `fast` and `slow` pointers, both starting at `dummy_head`.
        4. Move `fast` pointer `n+1` steps forward. This creates a gap of `n` nodes
           between `fast` and `slow`. (The `+1` is because `slow` needs to stop
           *before* the node to be removed).
        5. Now, move both `fast` and `slow` one step at a time until `fast` reaches `None`.
           When `fast` becomes `None`, `slow` will be at the node just before the `n`th
           node from the end.
        6. Perform the removal: `slow.next = slow.next.next`.
        7. Return `dummy_head.next`.

        Example: head = [1,2,3,4,5], n = 2
        dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> None
        slow = dummy, fast = dummy

        Move fast n+1 = 3 steps:
        fast: dummy -> 1 -> 2 -> 3
        slow: dummy

        Move fast and slow together until fast is None:
        Iteration 1:
        slow: dummy -> 1
        fast: dummy -> 1 -> 2 -> 3 -> 4

        Iteration 2:
        slow: dummy -> 1 -> 2
        fast: dummy -> 1 -> 2 -> 3 -> 4 -> 5

        Iteration 3:
        slow: dummy -> 1 -> 2 -> 3
        fast: dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> None
        Now fast is None. slow is at 3. The node to remove is 4.
        slow.next (4) = slow.next.next (5).
        Result: dummy -> 1 -> 2 -> 3 -> 5

        Complexity Analysis:
        - Time Complexity: O(L), where L is the length of the linked list.
          Both pointers traverse the list, with `fast` making roughly `L` steps
          and `slow` making `L-n` steps. Total is O(L).
        - Space Complexity: O(1). We only use a few extra pointers.
        """
        if not head:
            return None

        dummy_head = ListNode(0)
        dummy_head.next = head

        slow = dummy_head
        fast = dummy_head

        # Move fast pointer n+1 steps ahead
        # This ensures 'slow' is at the node *before* the one to be removed
        # when 'fast' reaches the end.
        for _ in range(n + 1):
            if not fast: # Should not happen if n is valid per constraints
                raise ValueError("n is larger than list length")
            fast = fast.next
        
        # Move both fast and slow until fast reaches the end
        while fast:
            slow = slow.next
            fast = fast.next
        
        # At this point, slow is the node BEFORE the one to be removed
        # e.g., if we want to remove 4, slow is at 3.
        # So, slow.next is the node to be removed.
        slow.next = slow.next.next

        return dummy_head.next