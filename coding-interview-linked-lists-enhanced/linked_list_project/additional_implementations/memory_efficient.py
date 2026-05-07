```python
from typing import Optional
from utils.linked_list_utils import ListNode, list_to_linked_list, linked_list_to_list

class ReverseListMemoryAnalysis:
    """
    Demonstrates different approaches to reversing a linked list with a focus
    on memory implications: in-place modification vs. creating new nodes.
    """

    @staticmethod
    def reverse_list_in_place(head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Reverses a linked list in-place using iterative pointer manipulation.
        This is the most memory-efficient approach for reversing a list.

        Algorithm:
        - Uses three pointers: `prev`, `curr`, `next_temp`.
        - `prev` tracks the reversed portion, initially None.
        - `curr` traverses the original list, initially head.
        - `next_temp` temporarily stores the next node before `curr.next` is reversed.

        Time Complexity: O(N), as each node is visited once.
        Space Complexity: O(1), as only a constant number of extra pointers are used,
                          and no new nodes are allocated.
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
    def reverse_list_new_nodes(head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Reverses a linked list by creating an entirely new linked list
        and copying values in reverse order. This is generally NOT
        memory-efficient if the original nodes can be reused.

        Algorithm:
        - Iterates through the original list.
        - For each node in the original list, it creates a new `ListNode`.
        - These new nodes are constructed such that they form a reversed list.
          This often means inserting new nodes at the beginning of the new list.

        Time Complexity: O(N), as each node is visited once and a new node is created for each.
        Space Complexity: O(N), as a completely new linked list of N nodes is created.
                          This can be significant for large lists.
        """
        new_head: Optional[ListNode] = None
        current_original: Optional[ListNode] = head

        while current_original:
            # Create a new node with the current_original's value
            # and make it the new head of the reversed list.
            # Its 'next' points to the previous new_head.
            new_node = ListNode(current_original.val)
            new_node.next = new_head
            new_head = new_node
            
            current_original = current_original.next
            
        return new_head

# --- Example Usage ---
if __name__ == "__main__":
    test_list_data = [1, 2, 3, 4, 5]

    print(f"Original list: {linked_list_to_list(list_to_linked_list(test_list_data))}\n")

    # In-place reversal (memory-efficient)
    head_in_place = list_to_linked_list(test_list_data)
    print("--- In-Place Reversal (Memory-Efficient) ---")
    print(f"Input: {linked_list_to_list(head_in_place)}")
    result_in_place = ReverseListMemoryAnalysis.reverse_list_in_place(head_in_place)
    print(f"Result: {linked_list_to_list(result_in_place)}")
    print(f"Time Complexity: O(N)")
    print(f"Space Complexity: O(1) (No new nodes allocated)")
    # Note: The original 'head_in_place' now points to the tail of the reversed list.
    # print(f"Original head after reversal: {linked_list_to_list(head_in_place)}") # will be [1] -> None


    print("\n--- Reversal by Creating New Nodes (Memory-Inefficient if original can be reused) ---")
    head_new_nodes = list_to_linked_list(test_list_data)
    print(f"Input: {linked_list_to_list(head_new_nodes)}")
    result_new_nodes = ReverseListMemoryAnalysis.reverse_list_new_nodes(head_new_nodes)
    print(f"Result: {linked_list_to_list(result_new_nodes)}")
    print(f"Time Complexity: O(N)")
    print(f"Space Complexity: O(N) (N new nodes allocated)")
    # Note: The original 'head_new_nodes' is unchanged.
    print(f"Original head after reversal (unchanged): {linked_list_to_list(head_new_nodes)}")

    print("\n--- Comparison ---")
    print("When problems allow modification of existing nodes, 'in-place' solutions are generally preferred")
    print("for their O(1) space complexity. If the original structure must be preserved AND its nodes cannot")
    print("be reused (e.g., due to multiple references or specific problem constraints), then allocating new")
    print("nodes might be necessary, leading to O(N) space complexity.")
```