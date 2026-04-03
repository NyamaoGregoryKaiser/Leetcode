from collections import deque

"""
Custom Data Structures: Stack and Queue

This file provides simple implementations of Stack and Queue using Python's
built-in list and collections.deque. These are primarily for educational
purposes or when specific methods not covered by standard library types
are desired.

For production code, `collections.deque` is generally preferred for both
stack and queue functionalities due to its O(1) append/pop from both ends.
A Python list used as a stack (append/pop from end) is also O(1) amortized.
A Python list used as a queue (append to end, pop from beginning) is O(N)
for pop from beginning, making it inefficient.
"""

class CustomStack:
    """
    A simple Stack implementation using Python's list.
    Behaves as LIFO (Last-In, First-Out).
    """
    def __init__(self):
        """Initializes an empty stack."""
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
        Raises IndexError if the stack is empty.
        Time Complexity: O(1).
        """
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        """
        Returns the item at the top of the stack without removing it.
        Raises IndexError if the stack is empty.
        Time Complexity: O(1).
        """
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

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
        """String representation of the stack."""
        return str(self._items)

    def __len__(self):
        """Allows len() to be used on the stack."""
        return len(self._items)

class CustomQueue:
    """
    A simple Queue implementation using Python's collections.deque.
    Behaves as FIFO (First-In, First-Out).
    `collections.deque` is efficient for queue operations as it supports
    O(1) appends and pops from both ends.
    """
    def __init__(self):
        """Initializes an empty queue."""
        self._items = deque()

    def enqueue(self, item):
        """
        Adds an item to the back (rear) of the queue.
        Time Complexity: O(1).
        """
        self._items.append(item)

    def dequeue(self):
        """
        Removes and returns the item from the front of the queue.
        Raises IndexError if the queue is empty.
        Time Complexity: O(1).
        """
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()

    def peek(self):
        """
        Returns the item at the front of the queue without removing it.
        Raises IndexError if the queue is empty.
        Time Complexity: O(1).
        """
        if self.is_empty():
            raise IndexError("peek from empty queue")
        return self._items[0]

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
        """String representation of the queue."""
        return str(list(self._items)) # Convert deque to list for consistent string representation

    def __len__(self):
        """Allows len() to be used on the queue."""
        return len(self._items)

# Example Usage
if __name__ == "__main__":
    print("--- CustomStack Demo ---")
    stack = CustomStack()
    print(f"Is stack empty? {stack.is_empty()}") # True
    stack.push(10)
    stack.push(20)
    print(f"Stack: {stack}, Size: {stack.size()}") # [10, 20], Size: 2
    print(f"Top element: {stack.peek()}") # 20
    print(f"Popped: {stack.pop()}") # 20
    print(f"Stack: {stack}, Size: {stack.size()}") # [10], Size: 1
    stack.push(30)
    print(f"Stack: {stack}") # [10, 30]
    print(f"Popped: {stack.pop()}") # 30
    print(f"Popped: {stack.pop()}") # 10
    print(f"Is stack empty? {stack.is_empty()}") # True
    try:
        stack.pop()
    except IndexError as e:
        print(f"Error: {e}") # Error: pop from empty stack

    print("\n--- CustomQueue Demo ---")
    queue = CustomQueue()
    print(f"Is queue empty? {queue.is_empty()}") # True
    queue.enqueue("apple")
    queue.enqueue("banana")
    print(f"Queue: {queue}, Size: {queue.size()}") # ['apple', 'banana'], Size: 2
    print(f"Front element: {queue.peek()}") # apple
    print(f"Dequeued: {queue.dequeue()}") # apple
    print(f"Queue: {queue}, Size: {queue.size()}") # ['banana'], Size: 1
    queue.enqueue("cherry")
    print(f"Queue: {queue}") # ['banana', 'cherry']
    print(f"Dequeued: {queue.dequeue()}") # banana
    print(f"Dequeued: {queue.dequeue()}") # cherry
    print(f"Is queue empty? {queue.is_empty()}") # True
    try:
        queue.dequeue()
    except IndexError as e:
        print(f"Error: {e}") # Error: dequeue from empty queue