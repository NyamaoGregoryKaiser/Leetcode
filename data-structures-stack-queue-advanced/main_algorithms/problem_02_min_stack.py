from collections import deque

"""
Problem 2: Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element
in constant time.

Implement the `MinStack` class:
- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

Each function call should operate in O(1) time complexity.

Example 1:
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

Constraints:
-2^31 <= val <= 2^31 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 * 10^4 calls will be made to push, pop, top, and getMin.
"""

class MinStack:
    """
    Implements a stack that supports O(1) time complexity for push, pop, top, and getMin.

    Approach: Using an auxiliary stack to store minimums.
    Each time an element is pushed onto the main stack, we also check if it's
    less than or equal to the current minimum. If it is, we push it onto the
    min_stack. When an element is popped from the main stack, if it was the
    current minimum (i.e., it's equal to the top of the min_stack), we also
    pop from the min_stack.

    Time Complexity: O(1) for all operations (push, pop, top, getMin).
                     All stack operations (append, pop, peek) on deque are O(1).
    Space Complexity: O(N) in the worst case, where N is the number of elements
                      in the stack. In the worst case (e.g., all elements pushed
                      in decreasing order), the min_stack will have N elements,
                      mirroring the main stack. In the best case (e.g., all
                      elements pushed in increasing order), min_stack will have
                      only one element (the initial minimum).
    """

    def __init__(self):
        """
        Initializes the MinStack object.
        Two deques are used:
        - `_stack`: The main stack to store all elements.
        - `_min_stack`: An auxiliary stack to store the minimum elements encountered so far.
                        The top of _min_stack will always represent the current minimum.
        """
        self._stack = deque()
        self._min_stack = deque()

    def push(self, val: int) -> None:
        """
        Pushes an element `val` onto the stack.
        If `val` is less than or equal to the current minimum (or if _min_stack is empty),
        it is also pushed onto the _min_stack.
        """
        self._stack.append(val)
        if not self._min_stack or val <= self._min_stack[-1]:
            self._min_stack.append(val)

    def pop(self) -> None:
        """
        Removes the element on the top of the stack.
        If the popped element is the current minimum (i.e., it's equal to the top of _min_stack),
        then it is also popped from _min_stack.
        """
        if self._stack:
            popped_val = self._stack.pop()
            if popped_val == self._min_stack[-1]:
                self._min_stack.pop()

    def top(self) -> int:
        """
        Gets the top element of the stack.
        Assumes the stack is non-empty.
        """
        if self._stack:
            return self._stack[-1]
        raise IndexError("top() called on an empty stack.")

    def getMin(self) -> int:
        """
        Retrieves the minimum element in the stack.
        Assumes the stack is non-empty.
        """
        if self._min_stack:
            return self._min_stack[-1]
        raise IndexError("getMin() called on an empty stack.")

# Example usage:
if __name__ == "__main__":
    minStack = MinStack()
    minStack.push(-2)
    minStack.push(0)
    minStack.push(-3)
    print(f"Current min: {minStack.getMin()}") # Expected: -3
    minStack.pop()
    print(f"Top element: {minStack.top()}")    # Expected: 0
    print(f"Current min: {minStack.getMin()}") # Expected: -2

    minStack2 = MinStack()
    minStack2.push(5)
    minStack2.push(2)
    minStack2.push(8)
    minStack2.push(1)
    print(f"Current min: {minStack2.getMin()}") # Expected: 1
    minStack2.pop() # Pop 1
    print(f"Current min: {minStack2.getMin()}") # Expected: 2
    minStack2.pop() # Pop 8
    print(f"Top element: {minStack2.top()}")    # Expected: 2
    print(f"Current min: {minStack2.getMin()}") # Expected: 2
    minStack2.pop() # Pop 2
    print(f"Top element: {minStack2.top()}")    # Expected: 5
    print(f"Current min: {minStack2.getMin()}") # Expected: 5
    minStack2.pop() # Pop 5

    try:
        minStack2.getMin()
    except IndexError as e:
        print(f"Attempted getMin on empty stack: {e}") # Expected: IndexError