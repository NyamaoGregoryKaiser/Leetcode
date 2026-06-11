```python
"""
queue_from_stacks_variations.py

This file demonstrates alternative approaches and variations for implementing
a Queue using Stacks (LeetCode 232).
"""

import collections # For comparison with standard deque

# --- Variation 1: Non-amortized O(N) pop/peek ---
# This approach ensures `push` is O(1) but makes `pop` and `peek` O(N)
# because elements are transferred on *every* pop/peek if out_stack is empty,
# or even worse, if `in_stack` is always transferred on `pop` or `peek`
# regardless of `out_stack` state. The specific implementation here
# demonstrates a simpler, less efficient transfer strategy.

class MyQueueNaiveTransfer:
    """
    Implements a Queue using two stacks with a less optimized transfer strategy.
    `push` is O(1), but `pop` and `peek` are O(N) in the worst case
    if the transfer logic is naive.

    This specific implementation's pop/peek are technically still amortized O(1)
    if the transfer check is `if not self.out_stack`, just like the main problem.
    To make it truly O(N) every time for pop/peek, you'd need to force a full
    transfer on every pop/peek call, which is very inefficient.

    Let's re-implement for a truly O(N) pop/peek strategy for demonstration:
    On every pop/peek, move all elements from in_stack to out_stack,
    perform operation, then move all back from out_stack to in_stack.
    This is extremely inefficient but demonstrates an O(N) approach.
    """
    def __init__(self):
        self.main_stack = [] # Acts as the "in_stack"
        self.temp_stack = [] # Used for temporary reversal during pop/peek

    def push(self, x: int) -> None:
        """
        Pushes element x to the back of the queue. O(1).
        """
        self.main_stack.append(x)

    def _transfer_all_and_back(self):
        """
        Helper to transfer all elements from main_stack to temp_stack,
        then back from temp_stack to main_stack.
        This is for demonstrating O(N) pop/peek if called often.
        """
        while self.main_stack:
            self.temp_stack.append(self.main_stack.pop())
        # The first element of the queue is now at the top of temp_stack.
        # Now, transfer back for push to work correctly for the next push.
        # This part makes it O(N) for pop/peek
        # (This is a simplified for demo, actual O(N) pop/peek would dequeue and then transfer back)

    def pop(self) -> int:
        """
        Removes the element from the front of the queue and returns it.
        This implementation makes it O(N) by always reversing `main_stack`
        to get the front element, then reversing it back.
        """
        if self.empty():
            raise IndexError("pop from empty queue")

        # Move all elements from main_stack to temp_stack to reverse order
        while self.main_stack:
            self.temp_stack.append(self.main_stack.pop())

        # The front element is now at the top of temp_stack
        front_element = self.temp_stack.pop()

        # Move elements back from temp_stack to main_stack
        while self.temp_stack:
            self.main_stack.append(self.temp_stack.pop())

        return front_element

    def peek(self) -> int:
        """
        Returns the element at the front of the queue. O(N).
        """
        if self.empty():
            raise IndexError("peek from empty queue")

        # Move all elements from main_stack to temp_stack to reverse order
        while self.main_stack:
            self.temp_stack.append(self.main_stack.pop())

        # The front element is now at the top of temp_stack
        front_element = self.temp_stack[-1] # Peek, not pop

        # Move elements back from temp_stack to main_stack
        while self.temp_stack:
            self.main_stack.append(self.temp_stack.pop())

        return front_element

    def empty(self) -> bool:
        """
        Returns true if the queue is empty, false otherwise. O(1).
        """
        return not self.main_stack


# --- Variation 2: Using Python's collections.deque as a reference ---
# This is how a queue is typically implemented efficiently in Python,
# for comparison purposes.

class MyPythonDequeQueue:
    """
    A queue implementation using Python's `collections.deque` for reference.
    This is the most efficient and Pythonic way to implement a queue.
    """
    def __init__(self):
        self.deque = collections.deque()

    def push(self, x: int) -> None:
        """
        Pushes element x to the back of the queue. O(1).
        """
        self.deque.append(x)

    def pop(self) -> int:
        """
        Removes the element from the front of the queue and returns it. O(1).
        """
        if not self.deque:
            raise IndexError("pop from empty queue")
        return self.deque.popleft()

    def peek(self) -> int:
        """
        Returns the element at the front of the queue. O(1).
        """
        if not self.deque:
            raise IndexError("peek from empty queue")
        return self.deque[0]

    def empty(self) -> bool:
        """
        Returns true if the queue is empty, false otherwise. O(1).
        """
        return len(self.deque) == 0


if __name__ == "__main__":
    from src.utils import Timer
    from src.stack_queue_problems import MyQueue # Original from main file

    print("--- MyQueue (Amortized O(1) - Original) Demo ---")
    with Timer("Original MyQueue"):
        mq_orig = MyQueue()
        mq_orig.push(1)
        mq_orig.push(2)
        print(f"Peek: {mq_orig.peek()}") # 1
        print(f"Pop: {mq_orig.pop()}")   # 1
        mq_orig.push(3)
        print(f"Peek: {mq_orig.peek()}") # 2
        print(f"Pop: {mq_orig.pop()}")   # 2
        print(f"Pop: {mq_orig.pop()}")   # 3
        print(f"Empty? {mq_orig.empty()}") # True

    print("\n--- MyQueueNaiveTransfer (O(N) pop/peek) Demo ---")
    with Timer("MyQueueNaiveTransfer"):
        mq_naive = MyQueueNaiveTransfer()
        mq_naive.push(1)
        mq_naive.push(2)
        print(f"Peek: {mq_naive.peek()}") # 1
        print(f"Pop: {mq_naive.pop()}")   # 1
        mq_naive.push(3)
        print(f"Peek: {mq_naive.peek()}") # 2
        print(f"Pop: {mq_naive.pop()}")   # 2
        print(f"Pop: {mq_naive.pop()}")   # 3
        print(f"Empty? {mq_naive.empty()}") # True
        try:
            mq_naive.pop()
        except IndexError as e:
            print(f"Error for empty queue pop: {e}")

    print("\n--- MyPythonDequeQueue (Reference) Demo ---")
    with Timer("MyPythonDequeQueue"):
        mq_deque = MyPythonDequeQueue()
        mq_deque.push(1)
        mq_deque.push(2)
        print(f"Peek: {mq_deque.peek()}") # 1
        print(f"Pop: {mq_deque.pop()}")   # 1
        mq_deque.push(3)
        print(f"Peek: {mq_deque.peek()}") # 2
        print(f"Pop: {mq_deque.pop()}")   # 2
        print(f"Pop: {mq_deque.pop()}")   # 3
        print(f"Empty? {mq_deque.empty()}") # True
```