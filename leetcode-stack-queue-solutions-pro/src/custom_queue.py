# src/custom_queue.py
"""
A simple custom implementation of a Queue data structure using a Python list.
This demonstrates the FIFO principle.
Python's `collections.deque` is a more efficient built-in queue implementation.
For a simple list-based queue, `append()` for enqueue and `pop(0)` for dequeue are used.
Note: `pop(0)` is O(N) because it requires shifting all subsequent elements.
For O(1) enqueue/dequeue, `collections.deque` or a linked-list based implementation is preferred.
"""

class CustomQueue:
    def __init__(self):
        """
        Initializes an empty queue.
        The underlying data structure is a Python list.
        """
        self._data = []

    def enqueue(self, item):
        """
        Adds an item to the rear of the queue.
        Time Complexity: O(1) amortized (Python list append)
        Space Complexity: O(1) for the operation, O(N) for the queue storage
        """
        self._data.append(item)

    def dequeue(self):
        """
        Removes and returns the item from the front of the queue.
        If the queue is empty, raises an IndexError.
        Time Complexity: O(N) because `pop(0)` shifts all elements.
                         For O(1), `collections.deque` or a linked list is needed.
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._data.pop(0)

    def peek(self):
        """
        Returns the item at the front of the queue without removing it.
        If the queue is empty, raises an IndexError.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("peek from empty queue")
        return self._data[0]

    def is_empty(self):
        """
        Checks if the queue is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._data) == 0

    def size(self):
        """
        Returns the number of items in the queue.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._data)

    def __len__(self):
        """
        Enables use of len() with CustomQueue instances.
        """
        return self.size()

    def __str__(self):
        """
        String representation of the queue.
        """
        return f"CustomQueue({self._data})"

    def __repr__(self):
        """
        Formal string representation.
        """
        return self.__str__()

# Example usage (for testing/demonstration)
if __name__ == "__main__":
    queue = CustomQueue()
    print(f"Is empty: {queue.is_empty()}") # True
    queue.enqueue(10)
    queue.enqueue(20)
    queue.enqueue(30)
    print(f"Queue: {queue}") # CustomQueue([10, 20, 30])
    print(f"Size: {queue.size()}") # 3
    print(f"Peek: {queue.peek()}") # 10
    print(f"Dequeued: {queue.dequeue()}") # 10
    print(f"Queue after dequeue: {queue}") # CustomQueue([20, 30])
    print(f"Peek after dequeue: {queue.peek()}") # 20
    queue.enqueue(40)
    print(f"Queue: {queue}") # CustomQueue([20, 30, 40])
    while not queue.is_empty():
        print(f"Dequeued: {queue.dequeue()}")
    print(f"Is empty: {queue.is_empty()}") # True
    try:
        queue.dequeue()
    except IndexError as e:
        print(f"Error: {e}") # Error: dequeue from empty queue
    try:
        queue.peek()
    except IndexError as e:
        print(f"Error: {e}") # Error: peek from empty queue