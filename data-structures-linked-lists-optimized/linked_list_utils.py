"""
linked_list_utils.py

This file contains the definition for the ListNode class and
utility functions to facilitate working with Linked Lists in Python.
"""

from typing import List, Optional

class ListNode:
    """
    Definition for a singly-linked list node.
    """
    def __init__(self, val: int = 0, next: Optional['ListNode'] = None):
        """
        Initializes a new ListNode.

        Args:
            val (int): The value stored in the node.
            next (Optional[ListNode]): A pointer to the next node in the list.
                                      Defaults to None if it's the last node.
        """
        self.val = val
        self.next = next

    def __eq__(self, other: object) -> bool:
        """
        Overrides the default equality comparison for ListNode objects.
        Two ListNodes are considered equal if they have the same value
        and their 'next' pointers also point to equal ListNodes (recursively).
        This allows for direct comparison of entire linked lists.

        Args:
            other (object): The other object to compare with.

        Returns:
            bool: True if the nodes (and subsequent lists) are equal, False otherwise.
        """
        if not isinstance(other, ListNode):
            return NotImplemented
        return self.val == other.val and self.next == other.next

    def __repr__(self) -> str:
        """
        Provides a string representation of the ListNode object,
        useful for debugging.
        """
        return f"ListNode(val={self.val}, next={self.next.val if self.next else 'None'})"

def list_to_linked_list(arr: List[int]) -> Optional[ListNode]:
    """
    Converts a Python list of integers into a singly-linked list.

    Args:
        arr (List[int]): A list of integers to convert.

    Returns:
        Optional[ListNode]: The head of the newly created linked list,
                            or None if the input list is empty.
    """
    if not arr:
        return None

    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

def linked_list_to_list(head: Optional[ListNode]) -> List[int]:
    """
    Converts a singly-linked list into a Python list of integers.

    Args:
        head (Optional[ListNode]): The head of the linked list.

    Returns:
        List[int]: A list of integers representing the linked list values.
                   Returns an empty list if the input linked list is empty.
    """
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result

def print_linked_list(head: Optional[ListNode]) -> None:
    """
    Prints the values of a singly-linked list in a readable format.

    Args:
        head (Optional[ListNode]): The head of the linked list.
    """
    current = head
    values = []
    while current:
        values.append(str(current.val))
        current = current.next
    print(" -> ".join(values) if values else "Empty List")

def create_cycle_list(arr: List[int], pos: int) -> Optional[ListNode]:
    """
    Converts a Python list into a singly-linked list and optionally
    creates a cycle within it.

    Args:
        arr (List[int]): A list of integers to convert.
        pos (int): The 0-indexed position where the tail's next pointer
                   should connect to form a cycle.
                   If pos is -1, no cycle is formed.

    Returns:
        Optional[ListNode]: The head of the newly created linked list.
                            Returns None if the input list is empty.

    Raises:
        ValueError: If pos is out of bounds for non-empty list.
    """
    if not arr:
        return None

    head = ListNode(arr[0])
    current = head
    nodes = [head] # Store all nodes to easily find the node at 'pos'

    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
        nodes.append(current)

    if pos != -1:
        if not (0 <= pos < len(nodes)):
            raise ValueError(f"Cycle position {pos} is out of bounds for list of size {len(arr)}")
        # The tail (current) points back to the node at `pos`
        current.next = nodes[pos]

    return head

if __name__ == "__main__":
    # Example Usage:
    print("--- Testing list_to_linked_list and print_linked_list ---")
    arr1 = [1, 2, 3, 4, 5]
    ll1 = list_to_linked_list(arr1)
    print(f"Original list: {arr1}")
    print("Linked list: ", end="")
    print_linked_list(ll1) # Expected: 1 -> 2 -> 3 -> 4 -> 5

    arr_empty = []
    ll_empty = list_to_linked_list(arr_empty)
    print(f"Original list: {arr_empty}")
    print("Linked list: ", end="")
    print_linked_list(ll_empty) # Expected: Empty List

    arr_single = [100]
    ll_single = list_to_linked_list(arr_single)
    print(f"Original list: {arr_single}")
    print("Linked list: ", end="")
    print_linked_list(ll_single) # Expected: 100

    print("\n--- Testing linked_list_to_list ---")
    list_from_ll1 = linked_list_to_list(ll1)
    print(f"Linked list to list: {list_from_ll1}") # Expected: [1, 2, 3, 4, 5]
    list_from_ll_empty = linked_list_to_list(ll_empty)
    print(f"Empty Linked list to list: {list_from_ll_empty}") # Expected: []

    print("\n--- Testing create_cycle_list ---")
    # No cycle
    cycle_ll_no_cycle = create_cycle_list([1, 2, 3, 4, 5], -1)
    print("List with no cycle: ", end="")
    print_linked_list(cycle_ll_no_cycle) # Expected: 1 -> 2 -> 3 -> 4 -> 5

    # Cycle at pos 0 (head)
    cycle_ll_head_cycle = create_cycle_list([1, 2, 3], 0)
    # We can't print this fully without infinite loop, so we'll check by properties later
    print(f"List [1, 2, 3] with cycle at pos 0 (head): val={cycle_ll_head_cycle.val}, next.val={cycle_ll_head_cycle.next.val}, tail.next.val={cycle_ll_head_cycle.next.next.next.val}") # Expected: tail (3) points to 1

    # Cycle in middle
    cycle_ll_middle_cycle = create_cycle_list([1, 2, 3, 4, 5], 2) # 5 points to 3
    print(f"List [1, 2, 3, 4, 5] with cycle at pos 2 (3): val={cycle_ll_middle_cycle.val}, tail.next.val={cycle_ll_middle_cycle.next.next.next.next.next.val}") # Expected: tail (5) points to 3

    # Cycle on single node
    cycle_ll_single_node_cycle = create_cycle_list([1], 0)
    print(f"List [1] with cycle at pos 0: val={cycle_ll_single_node_cycle.val}, next.val={cycle_ll_single_node_cycle.next.val}") # Expected: tail (1) points to 1