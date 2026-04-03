from collections import deque

"""
Problem 3: Implement Queue using Stacks

Implement a first in, first out (FIFO) queue using only two stacks. The implemented queue
should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:
- `void push(int x)`: Pushes element x to the back of the queue.
- `int pop()`: Removes the element from the front of the queue and returns it.
- `int peek()`: Returns the element at the front of the queue.
- `boolean empty()`: Returns `true` if the queue is empty, `false` otherwise.

Notes:
- You must use only standard operations of a stack, which means only `push to top`,
  `peek/pop from top`, `size`, and `is empty` operations are valid.
- Depending on your language, a stack may be implemented using a list or deque.

Example 1:
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (left-most is front)
myQueue.peek();  // return 1
myQueue.pop();   // return 1, queue is [2]
myQueue.empty(); // return false

Constraints:
1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All calls to pop and peek are valid (i.e., the queue will not be empty when pop or peek is called).
"""

class MyQueue:
    """
    Implements a queue using two stacks.

    The core idea is to use two stacks: an `in_stack` for pushing elements
    and an `out_stack` for popping/peeking elements.

    When pushing an element, it's simply added to `in_stack`.
    When popping or peeking, if `out_stack` is empty, all elements are
    transferred from `in_stack` to `out_stack` (reversing their order,
    thus making the oldest element of `in_stack` the top of `out_stack`).
    Then, the operation is performed on `out_stack`.

    Time Complexity:
    - `push`: O(1) amortized. Always a single push to `in_stack`.
    - `pop`: O(1) amortized. In the worst case (when `out_stack` is empty),
             it involves popping all elements from `in_stack` and pushing them
             to `out_stack` (O(N) operations), but this transfer only happens
             after N `push` operations. Each element is pushed and popped
             at most twice across both stacks.
    - `peek`: O(1) amortized, for the same reasons as `pop`.
    - `empty`: O(1). Checking if both stacks are empty.

    Space Complexity: O(N), where N is the total number of elements currently
                      in the queue. All elements are stored across the two stacks.
    """

    def __init__(self):
        """
        Initializes the queue object with two stacks (implemented using collections.deque).
        - `_in_stack`: Used for push operations. Elements are added here.
        - `_out_stack`: Used for pop and peek operations. Elements are moved here
                        when pop/peek is called and _out_stack is empty.
        """
        self._in_stack = deque()
        self._out_stack = deque()

    def _transfer_if_needed(self):
        """
        Helper method to transfer elements from `in_stack` to `out_stack`.
        This is called before any `pop` or `peek` operation if `_out_stack` is empty.
        It effectively reverses the order of elements so that the oldest element
        (FIFO principle) is at the top of `_out_stack`.
        """
        if not self._out_stack:
            while self._in_stack:
                self._out_stack.append(self._in_stack.pop())

    def push(self, x: int) -> None:
        """
        Pushes element x to the back of the queue.
        Simply adds to the `in_stack`.
        """
        self._in_stack.append(x)

    def pop(self) -> int:
        """
        Removes the element from the front of the queue and returns it.
        Transfers elements if `_out_stack` is empty, then pops from `_out_stack`.
        Assumes the queue is not empty.
        """
        self._transfer_if_needed()
        if self._out_stack:
            return self._out_stack.pop()
        raise IndexError("pop() called on an empty queue.")


    def peek(self) -> int:
        """
        Returns the element at the front of the queue without removing it.
        Transfers elements if `_out_stack` is empty, then peeks from `_out_stack`.
        Assumes the queue is not empty.
        """
        self._transfer_if_needed()
        if self._out_stack:
            return self._out_stack[-1] # Peek at the top of the stack
        raise IndexError("peek() called on an empty queue.")

    def empty(self) -> bool:
        """
        Returns `true` if the queue is empty, `false` otherwise.
        The queue is empty if both internal stacks are empty.
        """
        return not self._in_stack and not self._out_stack

# Example usage:
if __name__ == "__main__":
    myQueue = MyQueue()
    print(f"Is empty initially? {myQueue.empty()}") # Expected: True

    myQueue.push(1) # _in_stack: [1]
    myQueue.push(2) # _in_stack: [1, 2]
    print(f"Peek: {myQueue.peek()}") # Expected: 1 (_in_stack: [], _out_stack: [2, 1])
    print(f"Pop: {myQueue.pop()}")   # Expected: 1 (_in_stack: [], _out_stack: [2])
    print(f"Peek: {myQueue.peek()}") # Expected: 2 (_in_stack: [], _out_stack: [2])
    print(f"Is empty? {myQueue.empty()}") # Expected: False

    myQueue.push(3) # _in_stack: [3], _out_stack: [2]
    myQueue.push(4) # _in_stack: [3, 4], _out_stack: [2]
    print(f"Pop: {myQueue.pop()}")   # Expected: 2 (_in_stack: [3, 4], _out_stack: []) -> transfer -> _in_stack: [], _out_stack: [4, 3] -> pop -> _out_stack: [4])
    print(f"Pop: {myQueue.pop()}")   # Expected: 3 (_in_stack: [], _out_stack: [4])
    print(f"Pop: {myQueue.pop()}")   # Expected: 4 (_in_stack: [], _out_stack: [])
    print(f"Is empty? {myQueue.empty()}") # Expected: True

    try:
        myQueue.pop()
    except IndexError as e:
        print(f"Attempted pop on empty queue: {e}") # Expected: IndexError