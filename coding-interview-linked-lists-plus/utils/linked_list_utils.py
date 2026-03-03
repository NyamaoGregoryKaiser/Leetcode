# utils/linked_list_utils.py

class ListNode:
    """
    Definition for singly-linked list.
    """
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __repr__(self):
        """
        String representation for debugging.
        """
        return f"ListNode({self.val})"

def create_linked_list_from_list(arr):
    """
    Helper function to create a linked list from a Python list.
    Example: [1, 2, 3] -> 1 -> 2 -> 3
    """
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def convert_linked_list_to_list(head):
    """
    Helper function to convert a linked list to a Python list.
    Example: 1 -> 2 -> 3 -> None -> [1, 2, 3]
    """
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result

def print_linked_list(head, message="Linked List: "):
    """
    Helper function to print the linked list for debugging purposes.
    """
    if not head:
        print(f"{message}None")
        return
    current = head
    values = []
    while current:
        values.append(str(current.val))
        current = current.next
    print(f"{message}{' -> '.join(values)}")

def create_linked_list_with_cycle(arr, pos):
    """
    Helper function to create a linked list with a cycle.
    :param arr: List of values for the linked list.
    :param pos: The index (0-indexed) where the tail's next pointer should connect.
                -1 means no cycle.
    :return: Head of the linked list.
    """
    if not arr:
        return None

    nodes = []
    head = ListNode(arr[0])
    nodes.append(head)
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
        nodes.append(current)

    if pos != -1:
        if 0 <= pos < len(nodes):
            current.next = nodes[pos] # Create the cycle
        else:
            raise ValueError("Position for cycle is out of bounds.")
    
    return head