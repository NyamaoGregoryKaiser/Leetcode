# src/custom_stack.py
"""
A simple custom implementation of a Stack data structure using a Python list.
This is primarily for educational purposes to demonstrate the LIFO principle.
Python's built-in list can directly be used as a stack with `append()` and `pop()`.
"""

class CustomStack:
    def __init__(self):
        """
        Initializes an empty stack.
        The underlying data structure is a Python list.
        """
        self._data = []

    def push(self, item):
        """
        Adds an item to the top of the stack.
        Time Complexity: O(1) amortized (Python list append)
        Space Complexity: O(1) for the operation, O(N) for the stack storage
        """
        self._data.append(item)

    def pop(self):
        """
        Removes and returns the item from the top of the stack.
        If the stack is empty, raises an IndexError.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._data.pop()

    def peek(self):
        """
        Returns the item at the top of the stack without removing it.
        If the stack is empty, raises an IndexError.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._data[-1]

    def is_empty(self):
        """
        Checks if the stack is empty.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._data) == 0

    def size(self):
        """
        Returns the number of items in the stack.
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self._data)

    def __len__(self):
        """
        Enables use of len() with CustomStack instances.
        """
        return self.size()

    def __str__(self):
        """
        String representation of the stack.
        """
        return f"CustomStack({self._data})"

    def __repr__(self):
        """
        Formal string representation.
        """
        return self.__str__()

# Example usage (for testing/demonstration)
if __name__ == "__main__":
    stack = CustomStack()
    print(f"Is empty: {stack.is_empty()}") # True
    stack.push(10)
    stack.push(20)
    stack.push(30)
    print(f"Stack: {stack}") # CustomStack([10, 20, 30])
    print(f"Size: {stack.size()}") # 3
    print(f"Peek: {stack.peek()}") # 30
    print(f"Popped: {stack.pop()}") # 30
    print(f"Stack after pop: {stack}") # CustomStack([10, 20])
    print(f"Peek after pop: {stack.peek()}") # 20
    stack.push(40)
    print(f"Stack: {stack}") # CustomStack([10, 20, 40])
    while not stack.is_empty():
        print(f"Popped: {stack.pop()}")
    print(f"Is empty: {stack.is_empty()}") # True
    try:
        stack.pop()
    except IndexError as e:
        print(f"Error: {e}") # Error: pop from empty stack
    try:
        stack.peek()
    except IndexError as e:
        print(f"Error: {e}") # Error: peek from empty stack