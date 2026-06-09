import collections

class CustomStack:
    """
    A basic custom Stack implementation using a Python list.
    For educational purposes to understand stack operations.
    Python's built-in list can be used directly as a stack.
    """
    def __init__(self):
        """
        Initializes an empty stack.
        """
        self._stack = []

    def push(self, item):
        """
        Adds an item to the top of the stack.
        Time Complexity: O(1) amortized
        Space Complexity: O(1)
        """
        self._stack.append(item)

    def pop(self):
        """
        Removes and returns the item from the top of the stack.
        Raises an IndexError if the stack is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._stack.pop()

    def peek(self):
        """
        Returns the item at the top of the stack without removing it.
        Raises an IndexError if the stack is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._stack[-1]

    def is_empty(self):
        """
        Checks if the stack is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._stack) == 0

    def size(self):
        """
        Returns the number of items in the stack.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._stack)

    def __len__(self):
        return self.size()

    def __str__(self):
        return str(self._stack)

    def __repr__(self):
        return f"CustomStack({self._stack})"

class CustomQueue:
    """
    A basic custom Queue implementation using a Python list.
    For educational purposes.
    Note: Python's list is inefficient for front-of-queue operations (pop(0)).
    For optimal performance, `collections.deque` should be used.
    """
    def __init__(self):
        """
        Initializes an empty queue.
        """
        self._queue = []

    def enqueue(self, item):
        """
        Adds an item to the back of the queue.
        Time Complexity: O(1) amortized
        Space Complexity: O(1)
        """
        self._queue.append(item)

    def dequeue(self):
        """
        Removes and returns the item from the front of the queue.
        Raises an IndexError if the queue is empty.
        Time Complexity: O(N) because elements need to be shifted.
                         This is why `collections.deque` is preferred.
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._queue.pop(0)

    def front(self):
        """
        Returns the item at the front of the queue without removing it.
        Raises an IndexError if the queue is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("front from empty queue")
        return self._queue[0]

    def is_empty(self):
        """
        Checks if the queue is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._queue) == 0

    def size(self):
        """
        Returns the number of items in the queue.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._queue)

    def __len__(self):
        return self.size()

    def __str__(self):
        return str(self._queue)

    def __repr__(self):
        return f"CustomQueue({self._queue})"

class DequeQueue:
    """
    A Queue implementation using collections.deque, which is efficient
    for both `append` and `popleft` operations (O(1) amortized).
    This is generally the preferred way to implement a queue in Python.
    """
    def __init__(self):
        self._queue = collections.deque()

    def enqueue(self, item):
        """
        Adds an item to the back of the queue.
        Time Complexity: O(1) amortized
        Space Complexity: O(1)
        """
        self._queue.append(item)

    def dequeue(self):
        """
        Removes and returns the item from the front of the queue.
        Time Complexity: O(1) amortized
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._queue.popleft()

    def front(self):
        """
        Returns the item at the front of the queue without removing it.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("front from empty queue")
        return self._queue[0]

    def is_empty(self):
        """
        Checks if the queue is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._queue) == 0

    def size(self):
        """
        Returns the number of items in the queue.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._queue)

    def __len__(self):
        return self.size()

    def __str__(self):
        return str(list(self._queue))

    def __repr__(self):
        return f"DequeQueue({list(self._queue)})"

if __name__ == '__main__':
    print("--- Testing CustomStack ---")
    s = CustomStack()
    print(f"Is empty? {s.is_empty()}") # True
    s.push(10)
    s.push(20)
    print(f"Stack: {s}, Size: {s.size()}") # [10, 20]
    print(f"Peek: {s.peek()}") # 20
    print(f"Pop: {s.pop()}") # 20
    print(f"Stack: {s}, Size: {s.size()}") # [10]
    s.push(30)
    print(f"Stack: {s}") # [10, 30]
    print(f"Is empty? {s.is_empty()}") # False
    while not s.is_empty():
        print(f"Popping: {s.pop()}")
    print(f"Is empty? {s.is_empty()}") # True
    try:
        s.pop()
    except IndexError as e:
        print(f"Caught expected error: {e}")

    print("\n--- Testing CustomQueue ---")
    q = CustomQueue()
    print(f"Is empty? {q.is_empty()}") # True
    q.enqueue(100)
    q.enqueue(200)
    print(f"Queue: {q}, Size: {q.size()}") # [100, 200]
    print(f"Front: {q.front()}") # 100
    print(f"Dequeue: {q.dequeue()}") # 100
    print(f"Queue: {q}, Size: {q.size()}") # [200]
    q.enqueue(300)
    print(f"Queue: {q}") # [200, 300]
    print(f"Is empty? {q.is_empty()}") # False
    while not q.is_empty():
        print(f"Dequeuing: {q.dequeue()}")
    print(f"Is empty? {q.is_empty()}") # True
    try:
        q.dequeue()
    except IndexError as e:
        print(f"Caught expected error: {e}")

    print("\n--- Testing DequeQueue (Optimal Queue) ---")
    dq = DequeQueue()
    print(f"Is empty? {dq.is_empty()}") # True
    dq.enqueue(1)
    dq.enqueue(2)
    print(f"Queue: {dq}, Size: {dq.size()}") # [1, 2]
    print(f"Front: {dq.front()}") # 1
    print(f"Dequeue: {dq.dequeue()}") # 1
    print(f"Queue: {dq}, Size: {dq.size()}") # [2]
    dq.enqueue(3)
    print(f"Queue: {dq}") # [2, 3]
    print(f"Is empty? {dq.is_empty()}") # False
    while not dq.is_empty():
        print(f"Dequeuing: {dq.dequeue()}")
    print(f"Is empty? {dq.is_empty()}") # True
    try:
        dq.dequeue()
    except IndexError as e:
        print(f"Caught expected error: {e}")