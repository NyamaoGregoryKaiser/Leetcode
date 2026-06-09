from typing import List

class MyQueue:
    """
    Implements a first-in-first-out (FIFO) queue using two stacks.

    The core idea is to maintain two stacks: `input_stack` for pushing elements
    and `output_stack` for popping/peeking elements.
    - When an element is `push`ed, it always goes into `input_stack`.
    - When `pop` or `peek` is called:
        - If `output_stack` is empty, all elements are moved from `input_stack`
          to `output_stack`. This reverses their order, making the first-in
          element available at the top of `output_stack`.
        - Then, the operation (`pop` or `peek`) is performed on `output_stack`.

    This strategy ensures that `pop` and `peek` operations are amortized O(1).
    A single `pop` or `peek` might take O(N) if it requires moving elements,
    but over a sequence of M operations, each element is moved at most twice
    (once from input to output, once out of output), resulting in O(1) amortized
    time per operation.

    Time Complexity:
        - push: O(1)
        - pop: Amortized O(1) (Worst case O(N) if `output_stack` is empty and `input_stack` has N elements)
        - peek: Amortized O(1) (Worst case O(N) if `output_stack` is empty and `input_stack` has N elements)
        - empty: O(1)
    Space Complexity: O(N), where N is the total number of elements in the queue,
                      as elements are stored across the two stacks.
    """

    def __init__(self):
        """
        Initializes the queue with two empty lists to act as stacks.
        """
        self.input_stack: List[int] = []
        self.output_stack: List[int] = []

    def _transfer_elements(self) -> None:
        """
        Helper method to transfer all elements from input_stack to output_stack.
        This operation reverses the order of elements, effectively preparing them
        for FIFO retrieval.
        """
        if not self.output_stack: # Only transfer if output_stack is empty
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())

    def push(self, x: int) -> None:
        """
        Pushes element x to the back of the queue.
        Time: O(1)
        """
        self.input_stack.append(x)

    def pop(self) -> int:
        """
        Removes the element from the front of the queue and returns it.
        If the queue is empty, raises an IndexError.
        Time: Amortized O(1)
        """
        self._transfer_elements()
        if not self.output_stack:
            raise IndexError("pop from empty queue")
        return self.output_stack.pop()

    def peek(self) -> int:
        """
        Returns the element at the front of the queue without removing it.
        If the queue is empty, raises an IndexError.
        Time: Amortized O(1)
        """
        self._transfer_elements()
        if not self.output_stack:
            raise IndexError("peek from empty queue")
        return self.output_stack[-1]

    def empty(self) -> bool:
        """
        Returns true if the queue is empty, false otherwise.
        Time: O(1)
        """
        return not self.input_stack and not self.output_stack

if __name__ == '__main__':
    print("--- Testing MyQueue (Queue using Stacks) ---")
    queue = MyQueue()
    print(f"Is empty? {queue.empty()}") # Expected: True

    queue.push(1)
    queue.push(2)
    print(f"Push 1, 2. Input stack: {queue.input_stack}, Output stack: {queue.output_stack}") # Input: [1, 2], Output: []

    print(f"Peek: {queue.peek()}") # Expected: 1 (input_stack transfers to output_stack: [2, 1])
    print(f"After peek. Input stack: {queue.input_stack}, Output stack: {queue.output_stack}") # Input: [], Output: [2, 1]

    queue.push(3)
    print(f"Push 3. Input stack: {queue.input_stack}, Output stack: {queue.output_stack}") # Input: [3], Output: [2, 1]

    print(f"Pop: {queue.pop()}")   # Expected: 1
    print(f"After pop. Input stack: {queue.input_stack}, Output stack: {queue.output_stack}") # Input: [3], Output: [2]

    print(f"Peek: {queue.peek()}") # Expected: 2
    print(f"After peek. Input stack: {queue.input_stack}, Output stack: {queue.output_stack}") # Input: [3], Output: [2]

    print(f"Is empty? {queue.empty()}") # Expected: False

    print(f"Pop: {queue.pop()}") # Expected: 2
    print(f"Pop: {queue.pop()}") # Expected: 3 (input_stack transfers to output_stack: [3])

    print(f"Is empty? {queue.empty()}") # Expected: True

    # Test edge case: pop/peek from empty queue
    empty_queue = MyQueue()
    print(f"\nEmpty queue state: {empty_queue.empty()}") # Expected: True
    try:
        empty_queue.pop()
    except IndexError as e:
        print(f"Caught expected error for empty queue pop: {e}")
    try:
        empty_queue.peek()
    except IndexError as e:
        print(f"Caught expected error for empty queue peek: {e}")

    # Test sequence: push, pop, push, pop
    queue2 = MyQueue()
    queue2.push(10)
    print(f"Pop: {queue2.pop()}") # Expected: 10
    queue2.push(20)
    print(f"Peek: {queue2.peek()}") # Expected: 20
    print(f"Pop: {queue2.pop()}") # Expected: 20
    print(f"Is empty? {queue2.empty()}") # Expected: True