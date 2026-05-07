```python
from typing import Optional
from utils.linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list

class RemoveNthNodeVariations:
    """
    Demonstrates brute-force (two-pass) vs. optimized (single-pass) solutions
    for "Remove Nth Node From End of List".
    """

    @staticmethod
    def remove_nth_from_end_two_pass(head: Optional[ListNode], n: int) -> Optional[ListNode]:
        """
        Problem: Remove Nth Node From End of List (Two-Pass Approach)

        This approach first calculates the total length of the linked list.
        Then, it traverses the list again to find the node just before the one to be removed.

        Algorithm:
        1. Handle edge case: If head is None, return None.
        2. First pass: Iterate through the list to calculate its `length`.
        3. Determine the index of the node to remove from the beginning:
           `node_to_remove_from_start_idx = length - n`.
        4. Handle edge case: If `node_to_remove_from_start_idx` is 0, it means the head needs to be removed.
           Return `head.next`.
        5. Second pass: Initialize a `current` pointer to `head`. Traverse `node_to_remove_from_start_idx - 1` times.
           This positions `current` at the node *before* the one to be removed.
        6. Perform deletion: `current.next = current.next.next`.
        7. Return `head`.

        Time Complexity: O(N) + O(N) = O(N). Two full passes over the list.
        Space Complexity: O(1). Only a few extra variables.
        """
        if not head:
            return None

        length = 0
        current = head
        while current:
            length += 1
            current = current.next

        # Calculate the position from the beginning to find the node to remove
        # For n=1 (remove last), node_from_start_idx = length - 1
        # For n=length (remove first), node_from_start_idx = 0
        node_to_remove_from_start_idx = length - n

        # If we need to remove the head node (e.g., list [1,2,3], n=3, length=3, idx=0)
        if node_to_remove_from_start_idx == 0:
            return head.next

        # Traverse to the node *before* the one to be removed
        current = head
        for _ in range(node_to_remove_from_start_idx - 1):
            current = current.next
        
        # current.next is the node to be removed
        if current and current.next:
            current.next = current.next.next
        
        return head

    @staticmethod
    def remove_nth_from_end_optimized(head: Optional[ListNode], n: int) -> Optional[ListNode]:
        """
        Problem: Remove Nth Node From End of List (Optimized One-Pass Approach)

        This is the preferred solution as it completes the task in a single pass.
        It uses two pointers, `slow` and `fast`, separated by `n` nodes.

        Algorithm:
        1. Create a `dummy_head` node (`ListNode(0)`) and set its `next` to `head`.
           This handles edge cases where the head itself needs to be removed.
        2. Initialize `slow = dummy_head` and `fast = dummy_head`.
        3. Move `fast` `n+1` steps forward. This establishes a gap of `n` nodes between `slow` and `fast`,
           ensuring `slow` will stop *before* the target node when `fast` reaches the end.
        4. Move both `slow` and `fast` one step at a time until `fast` becomes `None`.
        5. At this point, `slow` is pointing to the node immediately preceding the Nth node from the end.
        6. Perform the deletion: `slow.next = slow.next.next`.
        7. Return `dummy_head.next`.

        Time Complexity: O(N). Single pass over the list.
        Space Complexity: O(1). A few extra pointers.
        """
        dummy_head = ListNode(0)
        dummy_head.next = head

        slow: Optional[ListNode] = dummy_head
        fast: Optional[ListNode] = dummy_head

        # Move fast n+1 steps ahead
        # This is because 'slow' needs to stop at the node *before* the one to be removed.
        for _ in range(n + 1):
            if fast:
                fast = fast.next
            else:
                # Should not happen if n is guaranteed valid and head is not None
                return head # Or raise an error
        
        # Move both pointers until fast reaches the end
        while fast:
            slow = slow.next
            fast = fast.next
        
        # 'slow' is now at the node just before the one to be removed
        if slow and slow.next: # Ensure slow and slow.next are not None
            slow.next = slow.next.next
        
        return dummy_head.next

# --- Example Usage ---
if __name__ == "__main__":
    test_list_data = [1, 2, 3, 4, 5]
    n_to_remove = 2 # Remove '4' (2nd from end)

    print(f"Original list: {linked_list_to_list(list_to_linked_list(test_list_data))}")
    print(f"Removing {n_to_remove}th node from end.\n")

    # Brute-Force (Two-Pass) Solution
    head_bf = list_to_linked_list(test_list_data)
    print("--- Brute-Force (Two-Pass) Solution ---")
    print(f"Input: {linked_list_to_list(head_bf)} (removing {n_to_remove}th)")
    result_bf = RemoveNthNodeVariations.remove_nth_from_end_two_pass(head_bf, n_to_remove)
    print(f"Result: {linked_list_to_list(result_bf)}")
    print(f"Time Complexity: O(N) [Two passes]")
    print(f"Space Complexity: O(1)\n")

    # Optimized (One-Pass) Solution
    head_opt = list_to_linked_list(test_list_data)
    print("--- Optimized (One-Pass) Solution ---")
    print(f"Input: {linked_list_to_list(head_opt)} (removing {n_to_remove}th)")
    result_opt = RemoveNthNodeVariations.remove_nth_from_end_optimized(head_opt, n_to_remove)
    print(f"Result: {linked_list_to_list(result_opt)}")
    print(f"Time Complexity: O(N) [Single pass]")
    print(f"Space Complexity: O(1)\n")

    print("--- Edge Cases (Optimized Solution) ---")
    # Removing head
    head_remove_head = list_to_linked_list([1, 2, 3])
    print(f"Input: {linked_list_to_list(head_remove_head)} (removing 3rd from end (head))")
    result_remove_head = RemoveNthNodeVariations.remove_nth_from_end_optimized(head_remove_head, 3)
    print(f"Result: {linked_list_to_list(result_remove_head)}")

    # Removing tail
    head_remove_tail = list_to_linked_list([1, 2, 3])
    print(f"Input: {linked_list_to_list(head_remove_tail)} (removing 1st from end (tail))")
    result_remove_tail = RemoveNthNodeVariations.remove_nth_from_end_optimized(head_remove_tail, 1)
    print(f"Result: {linked_list_to_list(result_remove_tail)}")

    # Single node list
    head_single_node = list_to_linked_list([1])
    print(f"Input: {linked_list_to_list(head_single_node)} (removing 1st from end)")
    result_single_node = RemoveNthNodeVariations.remove_nth_from_end_optimized(head_single_node, 1)
    print(f"Result: {linked_list_to_list(result_single_node)}")
```