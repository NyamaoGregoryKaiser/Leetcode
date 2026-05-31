import collections

# A simple ListNode class for linked list problems (like Merge K Sorted Lists)
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __lt__(self, other):
        """
        Enables comparison of ListNode objects based on their value.
        Essential for using ListNode objects directly in a min-heap.
        """
        return self.val < other.val

    def __repr__(self):
        return f"ListNode({self.val})"

def list_to_linked_list(arr):
    """Converts a Python list to a linked list."""
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

def linked_list_to_list(head):
    """Converts a linked list to a Python list."""
    arr = []
    current = head
    while current:
        arr.append(current.val)
        current = current.next
    return arr

# A generic comparator class can be useful if elements in heap are complex
# and need custom comparison logic, e.g., tuples where comparison is by specific index.
# For Python's heapq, tuples are compared lexicographically by default, which is often sufficient.
# For custom objects, __lt__ is generally the way to go (as shown in ListNode).
# This is more of a conceptual utility or for languages without direct __lt__ overloading.
class ComparableWrapper:
    """
    A wrapper class to make non-comparable objects comparable in a heap,
    or to specify a custom comparison key.
    Useful when you want to store an object in a heap but sort it based on
    a specific attribute or a calculated value.
    """
    def __init__(self, value, key_func=None):
        self._value = value
        self._key = key_func(value) if key_func else value

    def __lt__(self, other):
        return self._key < other._key

    def __eq__(self, other):
        return self._key == other._key

    def get_value(self):
        return self._value
    
    def __repr__(self):
        return f"ComparableWrapper(value={self._value}, key={self._key})"

if __name__ == "__main__":
    # Test ListNode and conversion utilities
    print("--- Testing ListNode and Linked List Utilities ---")
    list_arr = [1, 3, 5, 7, 9]
    linked_list_head = list_to_linked_list(list_arr)
    print(f"Original list: {list_arr}")
    print(f"Converted linked list: {linked_list_to_list(linked_list_head)}")

    list_arr_empty = []
    linked_list_empty = list_to_linked_list(list_arr_empty)
    print(f"Empty list to linked list: {linked_list_empty}")
    print(f"Linked list to empty list: {linked_list_to_list(linked_list_empty)}")

    # Test ComparableWrapper
    print("\n--- Testing ComparableWrapper ---")
    import heapq
    
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age
        def __repr__(self):
            return f"Person({self.name}, {self.age})"

    people = [Person("Alice", 30), Person("Bob", 25), Person("Charlie", 35)]

    # We want to put these in a min-heap based on age
    # Using a custom key function with ComparableWrapper
    heap = []
    for p in people:
        heapq.heappush(heap, ComparableWrapper(p, key_func=lambda person: person.age))

    print(f"Heap (sorted by age): {[cw.get_value() for cw in heap]}")
    # Expected output (order based on age, Bob first, then Alice, then Charlie)
    # Heap (sorted by age): [Person(Bob, 25), Person(Alice, 30), Person(Charlie, 35)]
    
    # Pop elements from heap
    sorted_people = []
    while heap:
        sorted_people.append(heapq.heappop(heap).get_value())
    print(f"Popped in order: {sorted_people}") # Expected: [Person(Bob, 25), Person(Alice, 30), Person(Charlie, 35)]