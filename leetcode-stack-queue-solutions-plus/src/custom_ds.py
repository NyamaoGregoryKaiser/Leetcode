```python
"""
custom_ds.py

This file contains custom implementations of Stack and Queue data structures
using Python's built-in list. These are for illustrative purposes to understand
the underlying mechanics. For production code, `collections.deque` is
generally preferred for queues due to its O(1) append/pop from both ends.
"""

class CustomStack:
    """
    A custom implementation of a Stack using Python's list.
    LIFO (Last In, First Out) principle.
    """
    def __init__(self):
        """
        Initializes an empty stack.
        """
        self._items = []

    def push(self, item):
        """
        Adds an item to the top of the stack.
        Time Complexity: O(1) amortized.
        """
        self._items.append(item)

    def pop(self):
        """
        Removes and returns the item from the top of the stack.
        Raises an IndexError if the stack is empty.
        Time Complexity: O(1).
        """
        if not self.is_empty():
            return self._items.pop()
        raise IndexError("pop from empty stack")

    def peek(self):
        """
        Returns the item at the top of the stack without removing it.
        Raises an IndexError if the stack is empty.
        Time Complexity: O(1).
        """
        if not self.is_empty():
            return self._items[-1]
        raise IndexError("peek from empty stack")

    def is_empty(self):
        """
        Checks if the stack is empty.
        Time Complexity: O(1).
        """
        return len(self._items) == 0

    def size(self):
        """
        Returns the number of items in the stack.
        Time Complexity: O(1).
        """
        return len(self._items)

    def __str__(self):
        """
        String representation of the stack.
        """
        return f"Stack: {self._items}"

    def __repr__(self):
        """
        Formal representation of the stack.
        """
        return f"CustomStack({self._items})"

class CustomQueue:
    """
    A custom implementation of a Queue using Python's list.
    FIFO (First In, First Out) principle.
    Note: For a truly efficient queue in Python, `collections.deque` is
    recommended as `list.pop(0)` is O(N). This implementation is for
    demonstration purposes only.
    """
    def __init__(self):
        """
        Initializes an empty queue.
        """
        self._items = []

    def enqueue(self, item):
        """
        Adds an item to the rear of the queue.
        Time Complexity: O(1) amortized.
        """
        self._items.append(item)

    def dequeue(self):
        """
        Removes and returns the item from the front of the queue.
        Raises an IndexError if the queue is empty.
        Time Complexity: O(N) because list.pop(0) shifts all subsequent elements.
        For an O(1) dequeue, use `collections.deque`.
        """
        if not self.is_empty():
            return self._items.pop(0)
        raise IndexError("dequeue from empty queue")

    def front(self):
        """
        Returns the item at the front of the queue without removing it.
        Raises an IndexError if the queue is empty.
        Time Complexity: O(1).
        """
        if not self.is_empty():
            return self._items[0]
        raise IndexError("front from empty queue")

    def is_empty(self):
        """
        Checks if the queue is empty.
        Time Complexity: O(1).
        """
        return len(self._items) == 0

    def size(self):
        """
        Returns the number of items in the queue.
        Time Complexity: O(1).
        """
        return len(self._items)

    def __str__(self):
        """
        String representation of the queue.
        """
        return f"Queue: {self._items}"

    def __repr__(self):
        """
        Formal representation of the queue.
        """
        return f"CustomQueue({self._items})"

if __name__ == "__main__":
    # --- CustomStack Demonstration ---
    print("--- CustomStack Demo ---")
    s = CustomStack()
    print(f"Is stack empty? {s.is_empty()}") # True
    s.push(10)
    s.push(20)
    print(s) # Stack: [10, 20]
    print(f"Stack size: {s.size()}") # 2
    print(f"Top element: {s.peek()}") # 20
    print(f"Popped: {s.pop()}") # 20
    print(s) # Stack: [10]
    print(f"Is stack empty? {s.is_empty()}") # False
    s.pop()
    print(f"Is stack empty? {s.is_empty()}") # True
    try:
        s.pop()
    except IndexError as e:
        print(f"Error when popping from empty stack: {e}")

    print("\n--- CustomQueue Demo ---")
    # --- CustomQueue Demonstration ---
    q = CustomQueue()
    print(f"Is queue empty? {q.is_empty()}") # True
    q.enqueue('A')
    q.enqueue('B')
    print(q) # Queue: ['A', 'B']
    print(f"Queue size: {q.size()}") # 2
    print(f"Front element: {q.front()}") # A
    print(f"Dequeued: {q.dequeue()}") # A
    print(q) # Queue: ['B']
    print(f"Is queue empty? {q.is_empty()}") # False
    q.dequeue()
    print(f"Is queue empty? {q.is_empty()}") # True
    try:
        q.dequeue()
    except IndexError as e:
        print(f"Error when dequeuing from empty queue: {e}")
```