```python
"""
min_stack_variations.py

This file demonstrates alternative approaches and variations for implementing
the Min Stack problem (LeetCode 155).
"""

import math # For float('inf')

# --- Variation 1: Single Stack with (value, current_min) pairs ---
# This approach stores tuples on the main stack, where each tuple contains
# the value itself and the minimum value observed up to that point (inclusive).

class MinStackWithPairs:
    """
    MinStack implementation using a single stack where each element is a tuple
    (value, minimum_so_far).

    Time Complexity:
        - push: O(1)
        - pop: O(1)
        - top: O(1)
        - getMin: O(1)
    Space Complexity: O(N), where N is the number of elements in the stack.
                      Each element stores two values.
    """
    def __init__(self):
        """
        Initializes the MinStack object with an empty list to store (value, min_so_far) pairs.
        """
        self.stack = [] # Stores tuples: (value, min_value_at_this_point)

    def push(self, val: int) -> None:
        """
        Pushes an element onto the stack, recording the minimum value at this state.
        """
        current_min_so_far = self.getMin() if self.stack else float('inf')
        new_min = min(val, current_min_so_far)
        self.stack.append((val, new_min))

    def pop(self) -> None:
        """
        Removes the element from the top of the stack.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("pop from empty stack")
        self.stack.pop()

    def top(self) -> int:
        """
        Returns the element at the top of the stack (the value part of the tuple).
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("top from empty stack")
        return self.stack[-1][0] # Return the actual value

    def getMin(self) -> int:
        """
        Retrieves the current minimum element in the stack (the min_so_far part).
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("getMin from empty stack")
        return self.stack[-1][1] # Return the stored minimum


# --- Variation 2: O(1) Space Min Stack (with a caveat) ---
# This is a clever trick, but often comes with constraints (e.g., non-negative integers,
# or specific value ranges) and can be harder to implement correctly.
# The core idea is to encode the previous minimum value into the pushed element
# when a new minimum is set.
# This implementation assumes no specific constraints on value ranges, but will
# modify the value stored.

class MinStackO1Space:
    """
    MinStack implementation that aims for O(1) auxiliary space, but this comes
    with the caveat that values pushed onto the stack are modified if they
    are new minimums.

    Approach:
    - Maintain a `min_val` variable to track the current minimum.
    - When `push(val)`:
        - If `val <= min_val`, it's a new minimum. We push `2*val - min_val` onto the stack
          and update `min_val = val`. The pushed value `2*val - min_val` actually encodes
          the *previous* minimum.
        - Otherwise, just push `val`.
    - When `pop()`:
        - If the popped `val_on_stack` is less than `min_val`, it means `val_on_stack` was
          an encoded value (i.e., `2*actual_min - previous_min`). We can recover the
          `previous_min` using `2*min_val - val_on_stack` and update `min_val` to it.
          The `actual_min` that was logically popped is the old `min_val`.
        - Otherwise, just pop `val_on_stack`.

    Time Complexity: O(1) for all operations.
    Space Complexity: O(N) for the main stack, but O(1) auxiliary space
                      (excluding the main stack itself, which is required).
    """
    def __init__(self):
        """
        Initializes the stack and the current minimum tracking variable.
        `float('inf')` is used as an initial sentinel for `min_val`.
        """
        self.stack = []
        self.min_val = float('inf')

    def push(self, val: int) -> None:
        """
        Pushes an element onto the stack. If `val` is a new minimum,
        the element pushed encodes the previous minimum.
        """
        if not self.stack: # First element
            self.stack.append(val)
            self.min_val = val
        elif val <= self.min_val:
            # New minimum found. Push an encoded value (2*new_min - old_min)
            # and update min_val. The actual value 'val' is now min_val.
            self.stack.append(2 * val - self.min_val)
            self.min_val = val
        else:
            # Not a new minimum, just push the value.
            self.stack.append(val)

    def pop(self) -> None:
        """
        Removes the element from the top of the stack.
        If the popped value indicates it was an encoded old minimum,
        recover the actual previous minimum.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("pop from empty stack")

        popped_val = self.stack.pop()
        if popped_val < self.min_val:
            # This means `popped_val` was actually `2*current_min - previous_min`
            # The value logically popped was `self.min_val`.
            # Restore previous_min: previous_min = 2*current_min - popped_val
            self.min_val = 2 * self.min_val - popped_val

    def top(self) -> int:
        """
        Returns the element at the top of the stack.
        If the top element is an encoded value (meaning it's less than `self.min_val`),
        the actual top value is `self.min_val`.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("top from empty stack")

        top_val_on_stack = self.stack[-1]
        if top_val_on_stack < self.min_val:
            # If the value on stack is less than current min, it means current_min
            # itself was the *actual value* pushed at that point, and top_val_on_stack
            # is an encoded previous min.
            return self.min_val
        else:
            return top_val_on_stack

    def getMin(self) -> int:
        """
        Retrieves the current minimum element in the stack.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("getMin from empty stack")
        return self.min_val


if __name__ == "__main__":
    from src.utils import Timer

    print("--- MinStack (Two Stacks - Original) Demo ---")
    from src.stack_queue_problems import MinStack # Original from main file
    with Timer("Original MinStack (Two Stacks)"):
        ms_orig = MinStack()
        ms_orig.push(-2)
        ms_orig.push(0)
        ms_orig.push(-3)
        print(f"Min: {ms_orig.getMin()}") # -3
        ms_orig.pop()
        print(f"Top: {ms_orig.top()}")   # 0
        print(f"Min: {ms_orig.getMin()}") # -2

    print("\n--- MinStackWithPairs Demo ---")
    with Timer("MinStackWithPairs"):
        ms_pairs = MinStackWithPairs()
        ms_pairs.push(-2)
        ms_pairs.push(0)
        ms_pairs.push(-3)
        print(f"Min: {ms_pairs.getMin()}") # -3
        print(f"Stack contents: {ms_pairs.stack}") # e.g., [(-2, -2), (0, -2), (-3, -3)]
        ms_pairs.pop()
        print(f"Top: {ms_pairs.top()}")   # 0
        print(f"Min: {ms_pairs.getMin()}") # -2
        print(f"Stack contents: {ms_pairs.stack}") # e.g., [(-2, -2), (0, -2)]

    print("\n--- MinStackO1Space Demo ---")
    with Timer("MinStackO1Space"):
        ms_o1 = MinStackO1Space()
        ms_o1.push(-2)
        print(f"Stack: {ms_o1.stack}, Min: {ms_o1.getMin()}") # Stack: [-2], Min: -2
        ms_o1.push(0)
        print(f"Stack: {ms_o1.stack}, Min: {ms_o1.getMin()}") # Stack: [-2, 0], Min: -2
        ms_o1.push(-3) # New min. old_min = -2. push 2*(-3) - (-2) = -6 + 2 = -4
        print(f"Stack: {ms_o1.stack}, Min: {ms_o1.getMin()}") # Stack: [-2, 0, -4], Min: -3
        print(f"Top: {ms_o1.top()}")   # -3 (because stack[-1] (-4) < min_val (-3), so actual top is min_val)
        print(f"Min: {ms_o1.getMin()}") # -3

        ms_o1.pop() # Pop -4. This was 2*current_min - prev_min = 2*(-3) - prev_min.
                    # popped_val (-4) < min_val (-3). Restore min_val = 2*(-3) - (-4) = -6 + 4 = -2.
        print(f"Stack: {ms_o1.stack}, Min: {ms_o1.getMin()}") # Stack: [-2, 0], Min: -2
        print(f"Top: {ms_o1.top()}")   # 0

        ms_o1.pop() # Pop 0. Not less than min_val (-2).
        print(f"Stack: {ms_o1.stack}, Min: {ms_o1.getMin()}") # Stack: [-2], Min: -2
        print(f"Top: {ms_o1.top()}")   # -2
```