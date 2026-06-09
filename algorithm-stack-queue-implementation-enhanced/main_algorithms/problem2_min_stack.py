from typing import List, Tuple

class MinStack:
    """
    Implements a stack that supports push, pop, top, and retrieving the minimum
    element in constant time.

    This is achieved by storing tuples `(value, current_min)` on the main stack.
    When an element `val` is pushed, the `current_min` is determined by comparing
    `val` with the `current_min` of the previous stack top (or `val` itself if empty).
    This ensures that `getMin()` always returns the `current_min` of the top element
    in O(1) time.

    Alternatively, an auxiliary stack can be used to store minimums.
    Each time a value is pushed, if it's less than or equal to the current minimum,
    it's also pushed onto the min_stack. When popped, if the popped value equals
    the min_stack's top, min_stack is also popped. This achieves the same O(1)
    performance. The chosen implementation (tuple storage) is slightly more
    memory-efficient if values are often non-minimums, as it only stores one extra
    integer per element instead of potentially two separate stack elements.

    Time Complexity:
        - push: O(1)
        - pop: O(1)
        - top: O(1)
        - getMin: O(1)
    Space Complexity: O(N), where N is the number of elements in the stack,
                      as each element stores its value and the current minimum.
    """

    def __init__(self):
        """
        Initializes the stack. The stack stores tuples of (value, current_min_at_this_level).
        """
        self.stack: List[Tuple[int, int]] = []

    def push(self, val: int) -> None:
        """
        Pushes an element `val` onto the stack. Updates the current minimum if necessary.
        """
        if not self.stack:
            # If the stack is empty, the first element is also the minimum
            self.stack.append((val, val))
        else:
            # The current minimum is the smaller of `val` and the minimum of the previous top
            current_min = self.stack[-1][1]
            self.stack.append((val, min(val, current_min)))

    def pop(self) -> None:
        """
        Removes the element on the top of the stack.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("pop from empty stack")
        self.stack.pop()

    def top(self) -> int:
        """
        Gets the top element of the stack (its value, not the min tuple).
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("top from empty stack")
        return self.stack[-1][0]

    def getMin(self) -> int:
        """
        Retrieves the minimum element in the stack.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("getMin from empty stack")
        return self.stack[-1][1]

class MinStackAuxiliaryStack:
    """
    An alternative implementation of MinStack using an auxiliary stack to keep track of minimums.

    When `push(val)`:
    - `val` is pushed onto the main stack.
    - If `min_stack` is empty or `val` is less than or equal to the top of `min_stack`,
      `val` is pushed onto `min_stack`. This handles duplicates correctly (e.g., push 5, push 5, pop 5, getMin should still be 5).

    When `pop()`:
    - The top element is popped from the main stack.
    - If this popped element is equal to the top of `min_stack`, then `min_stack` is also popped.

    This ensures `getMin()` is always O(1).

    Time Complexity:
        - push: O(1)
        - pop: O(1)
        - top: O(1)
        - getMin: O(1)
    Space Complexity: O(N) in the worst case (e.g., a decreasing sequence like 5,4,3,2,1),
                      as both stacks could grow to N elements. In the best case (e.g., 10,20,30,40,50),
                      min_stack might only store one element, making it O(1) for min_stack space.
    """
    def __init__(self):
        self.main_stack: List[int] = []
        self.min_stack: List[int] = [] # Stores current minimums

    def push(self, val: int) -> None:
        self.main_stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if not self.main_stack:
            raise IndexError("pop from empty stack")
        
        popped_val = self.main_stack.pop()
        if popped_val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        if not self.main_stack:
            raise IndexError("top from empty stack")
        return self.main_stack[-1]

    def getMin(self) -> int:
        if not self.min_stack:
            raise IndexError("getMin from empty stack")
        return self.min_stack[-1]


if __name__ == '__main__':
    print("--- Testing MinStack (Tuple Storage) ---")
    minStack = MinStack()
    minStack.push(-2)
    minStack.push(0)
    minStack.push(-3)
    print(f"Stack after pushes: {minStack.stack}") # Should be [(-2,-2), (0,-2), (-3,-3)]
    print(f"getMin: {minStack.getMin()}") # Expected: -3
    minStack.pop()
    print(f"Stack after pop: {minStack.stack}") # Should be [(-2,-2), (0,-2)]
    print(f"top: {minStack.top()}")     # Expected: 0
    print(f"getMin: {minStack.getMin()}") # Expected: -2

    minStack2 = MinStack()
    minStack2.push(5)
    minStack2.push(2)
    minStack2.push(4)
    minStack2.push(1)
    minStack2.push(3)
    print(f"\nStack 2: {minStack2.stack}")
    print(f"getMin: {minStack2.getMin()}") # Expected: 1
    minStack2.pop() # Pop 3
    print(f"top: {minStack2.top()}") # Expected: 1
    print(f"getMin: {minStack2.getMin()}") # Expected: 1
    minStack2.pop() # Pop 1
    print(f"top: {minStack2.top()}") # Expected: 4
    print(f"getMin: {minStack2.getMin()}") # Expected: 2

    print("\n--- Testing MinStackAuxiliaryStack ---")
    minStackAux = MinStackAuxiliaryStack()
    minStackAux.push(-2)
    minStackAux.push(0)
    minStackAux.push(-3)
    print(f"Main Stack: {minStackAux.main_stack}, Min Stack: {minStackAux.min_stack}")
    print(f"getMin: {minStackAux.getMin()}") # Expected: -3
    minStackAux.pop()
    print(f"Main Stack: {minStackAux.main_stack}, Min Stack: {minStackAux.min_stack}")
    print(f"top: {minStackAux.top()}")     # Expected: 0
    print(f"getMin: {minStackAux.getMin()}") # Expected: -2

    minStackAux2 = MinStackAuxiliaryStack()
    minStackAux2.push(5)
    minStackAux2.push(2)
    minStackAux2.push(4)
    minStackAux2.push(1)
    minStackAux2.push(3)
    print(f"\nMain Stack 2: {minStackAux2.main_stack}, Min Stack 2: {minStackAux2.min_stack}")
    print(f"getMin: {minStackAux2.getMin()}") # Expected: 1
    minStackAux2.pop() # Pop 3
    print(f"top: {minStackAux2.top()}") # Expected: 1
    print(f"getMin: {minStackAux2.getMin()}") # Expected: 1
    minStackAux2.pop() # Pop 1
    print(f"top: {minStackAux2.top()}") # Expected: 4
    print(f"getMin: {minStackAux2.getMin()}") # Expected: 2

    # Test edge case: pop from empty stack
    empty_stack = MinStack()
    try:
        empty_stack.pop()
    except IndexError as e:
        print(f"\nCaught expected error for empty stack pop: {e}")
    try:
        empty_stack.top()
    except IndexError as e:
        print(f"Caught expected error for empty stack top: {e}")
    try:
        empty_stack.getMin()
    except IndexError as e:
        print(f"Caught expected error for empty stack getMin: {e}")