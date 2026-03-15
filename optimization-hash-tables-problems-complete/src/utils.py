from typing import Any, Optional

class DoublyLinkedNode:
    """
    A node for a Doubly Linked List, used primarily by the LFUCache.
    Stores key, value, and pointers to previous and next nodes.
    """
    def __init__(self, key: Any, value: Any):
        self.key = key
        self.value = value
        self.prev: Optional['DoublyLinkedNode'] = None
        self.next: Optional['DoublyLinkedNode'] = None

class DoublyLinkedList:
    """
    A custom Doubly Linked List implementation.
    This list keeps track of its head and tail, and supports O(1) insertion and deletion
    at both ends, and O(1) deletion of a given node.
    It's crucial for the LFUCache to maintain the order of keys for a given frequency.
    """
    def __init__(self):
        # Dummy head and tail nodes to simplify edge cases (empty list, adding/removing first/last node)
        self.head: DoublyLinkedNode = DoublyLinkedNode(-1, -1) # Sentinel head
        self.tail: DoublyLinkedNode = DoublyLinkedNode(-1, -1) # Sentinel tail
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0 # Number of actual elements in the list

    def _add_node_to_head(self, node: DoublyLinkedNode):
        """Helper to add a node right after the head (becomes the new first actual node)."""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
        self.size += 1

    def _add_node_to_tail(self, node: DoublyLinkedNode):
        """Helper to add a node right before the tail (becomes the new last actual node)."""
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node
        self.size += 1

    def _remove_node(self, node: DoublyLinkedNode):
        """Helper to remove a given node from the list."""
        if self.size == 0:
            return
        node.prev.next = node.next
        node.next.prev = node.prev
        node.prev = None # Help with garbage collection
        node.next = None # Help with garbage collection
        self.size -= 1

    def add_at_head(self, node: DoublyLinkedNode):
        """Adds a node to the front of the list (right after the dummy head)."""
        self._add_node_to_head(node)

    def add_at_tail(self, node: DoublyLinkedNode):
        """Adds a node to the end of the list (right before the dummy tail)."""
        self._add_node_to_tail(node)

    def remove_node(self, node: DoublyLinkedNode):
        """Removes a specific node from the list."""
        self._remove_node(node)

    def remove_head(self) -> Optional[DoublyLinkedNode]:
        """Removes and returns the first actual node in the list."""
        if self.size == 0:
            return None
        node_to_remove = self.head.next
        self._remove_node(node_to_remove)
        return node_to_remove

    def remove_tail(self) -> Optional[DoublyLinkedNode]:
        """Removes and returns the last actual node in the list."""
        if self.size == 0:
            return None
        node_to_remove = self.tail.prev
        self._remove_node(node_to_remove)
        return node_to_remove

    def get_head(self) -> Optional[DoublyLinkedNode]:
        """Returns the first actual node in the list without removing it."""
        if self.size == 0:
            return None
        return self.head.next

    def get_tail(self) -> Optional[DoublyLinkedNode]:
        """Returns the last actual node in the list without removing it."""
        if self.size == 0:
            return None
        return self.tail.prev
    
    def is_empty(self) -> bool:
        """Checks if the list is empty."""
        return self.size == 0

    def __len__(self) -> int:
        return self.size

    def __repr__(self) -> str:
        nodes = []
        current = self.head.next
        while current is not self.tail:
            nodes.append(f"({current.key}:{current.value})")
            current = current.next
        return " <-> ".join(nodes)

# Example usage (for testing purposes, not part of the class itself)
if __name__ == "__main__":
    print("--- DoublyLinkedList Test ---")

    dll = DoublyLinkedList()
    print(f"Initial list: {dll}, size: {len(dll)}") # Expected: , size: 0

    node1 = DoublyLinkedNode(1, "A")
    dll.add_at_head(node1)
    print(f"After add_at_head(1:A): {dll}, size: {len(dll)}") # Expected: (1:A), size: 1

    node2 = DoublyLinkedNode(2, "B")
    dll.add_at_tail(node2)
    print(f"After add_at_tail(2:B): {dll}, size: {len(dll)}") # Expected: (1:A) <-> (2:B), size: 2

    node3 = DoublyLinkedNode(3, "C")
    dll.add_at_head(node3)
    print(f"After add_at_head(3:C): {dll}, size: {len(dll)}") # Expected: (3:C) <-> (1:A) <-> (2:B), size: 3

    node4 = DoublyLinkedNode(4, "D")
    dll.add_at_tail(node4)
    print(f"After add_at_tail(4:D): {dll}, size: {len(dll)}") # Expected: (3:C) <-> (1:A) <-> (2:B) <-> (4:D), size: 4

    removed_head = dll.remove_head()
    print(f"Removed head: {removed_head.key}:{removed_head.value}, List: {dll}, size: {len(dll)}") # Expected: 3:C, List: (1:A) <-> (2:B) <-> (4:D), size: 3

    removed_tail = dll.remove_tail()
    print(f"Removed tail: {removed_tail.key}:{removed_tail.value}, List: {dll}, size: {len(dll)}") # Expected: 4:D, List: (1:A) <-> (2:B), size: 2

    dll.remove_node(node1) # Remove (1:A)
    print(f"Removed node (1:A): {dll}, size: {len(dll)}") # Expected: (2:B), size: 1

    dll.remove_node(node2) # Remove (2:B)
    print(f"Removed node (2:B): {dll}, size: {len(dll)}") # Expected: , size: 0

    print(f"Is list empty? {dll.is_empty()}") # Expected: True
    print(f"Remove from empty list: {dll.remove_head()}") # Expected: None

    node5 = DoublyLinkedNode(5, "E")
    dll.add_at_head(node5)
    print(f"After adding (5:E) to empty list: {dll}, size: {len(dll)}") # Expected: (5:E), size: 1
    print(f"Head: {dll.get_head().key}:{dll.get_head().value}") # Expected: 5:E
    print(f"Tail: {dll.get_tail().key}:{dll.get_tail().value}") # Expected: 5:E