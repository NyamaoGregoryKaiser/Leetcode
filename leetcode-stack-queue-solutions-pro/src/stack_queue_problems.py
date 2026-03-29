# src/stack_queue_problems.py
import collections
from src.custom_stack import CustomStack
from src.custom_queue import CustomQueue

"""
Collection of Stack and Queue related problems with optimal solutions.
Each problem includes detailed comments, time/space complexity analysis,
and where applicable, discussions on alternative approaches (e.g., brute force).
"""

# --- Problem 1: Valid Parentheses ---

def is_valid_parentheses(s: str) -> bool:
    """
    Determines if the input string containing parentheses '(', ')', '{', '}', '[', ']' is valid.
    An input string is valid if:
    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    3. Every close bracket has a corresponding open bracket of the same type.

    Optimal Approach: Using a Stack.
    Iterate through the string:
    - If an opening bracket is encountered, push it onto the stack.
    - If a closing bracket is encountered:
        - If the stack is empty, it means there's no corresponding opening bracket, so it's invalid.
        - Pop the top element from the stack.
        - Check if the popped opening bracket matches the current closing bracket. If not, it's invalid.
    After iterating through the string, if the stack is empty, all brackets were matched correctly.
    Otherwise, there are unmatched opening brackets, so it's invalid.

    Time Complexity: O(N) where N is the length of the string `s`.
                     Each character is pushed/popped at most once.
    Space Complexity: O(N) in the worst case (e.g., "((((((("), where the stack stores all opening brackets.
    """
    stack = []
    # Map for quick lookup of matching brackets
    bracket_map = {")": "(", "}": "{", "]": "["}

    for char in s:
        if char in bracket_map:  # It's a closing bracket
            # If stack is empty, no opening bracket to match, or if top doesn't match
            top_element = stack.pop() if stack else '#' # Use '#' as a placeholder for an empty stack
            if bracket_map[char] != top_element:
                return False
        else:  # It's an opening bracket
            stack.append(char)

    # After iterating through all characters, the stack should be empty for a valid string.
    return not stack

# Brute force (less relevant for this problem, as stack is quite direct.
# A "brute force" might be replacing matching pairs until no more changes, but that's complex and slow).
# Instead, we can consider a naive approach that might fail on nesting:
def is_valid_parentheses_naive(s: str) -> bool:
    """
    A naive approach for balanced parentheses, but does not guarantee correct nesting.
    Counts opening and closing brackets for each type.
    This will fail for cases like "([)]".
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    counts = {'(': 0, ')': 0, '{': 0, '}': 0, '[': 0, ']': 0}
    for char in s:
        if char in counts:
            counts[char] += 1
    
    return (counts['('] == counts[')'] and
            counts['{'] == counts['}'] and
            counts['['] == counts[']'])


# --- Problem 2: Min Stack ---

class MinStack:
    """
    Designs a stack that supports push, pop, top, and getMin operations in O(1) time complexity.

    Optimal Approach: Using an auxiliary stack to store minimums.
    When pushing a value:
    - Push the value onto the main stack.
    - If the auxiliary minimums stack is empty, or the current value is less than or equal to
      the top of the minimums stack, push the current value onto the minimums stack.
    When popping a value:
    - Pop from the main stack.
    - If the popped value is equal to the top of the minimums stack, pop from the minimums stack.

    This ensures that the top of the auxiliary minimums stack always holds the current minimum.

    Time Complexity: All operations (push, pop, top, getMin) are O(1).
                     Push and pop involve at most two list operations.
    Space Complexity: O(N) in the worst case (e.g., a monotonically decreasing sequence pushed),
                      where N is the number of elements in the stack. In this case, both main and
                      min_stack will grow to N.
                      In the best case (monotonically increasing sequence), min_stack only stores one element.
    """
    def __init__(self):
        """
        Initializes the MinStack with a main stack and an auxiliary min_stack.
        """
        self.stack = []  # Main stack to store all elements
        self.min_stack = [] # Auxiliary stack to store minimums seen so far

    def push(self, val: int) -> None:
        """
        Pushes an element `val` onto the stack.
        Updates the min_stack if `val` is a new minimum or equal to the current minimum.
        """
        self.stack.append(val)
        # Push to min_stack only if it's empty or current value is less than or equal to current minimum.
        # Equality is important to handle duplicates correctly, ensuring pop removes corresponding min.
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        """
        Removes the element on top of the stack.
        If the popped element is the current minimum, it's also removed from min_stack.
        """
        if not self.stack:
            raise IndexError("pop from empty MinStack")
        
        popped_val = self.stack.pop()
        # If the popped value was the current minimum, pop it from min_stack as well.
        if popped_val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        """
        Gets the top element of the main stack without removing it.
        """
        if not self.stack:
            raise IndexError("top from empty MinStack")
        return self.stack[-1]

    def getMin(self) -> int:
        """
        Retrieves the minimum element in the stack.
        """
        if not self.min_stack:
            raise IndexError("getMin from empty MinStack")
        return self.min_stack[-1]

    def __len__(self):
        return len(self.stack)

# Alternative (less memory efficient if many distinct minimums):
# Store tuples (value, current_min) in a single stack.
class MinStackTuple:
    def __init__(self):
        self.stack = [] # Stores (value, current_min_up_to_this_value)

    def push(self, val: int) -> None:
        current_min = self.getMin() if self.stack else float('inf')
        new_min = min(val, current_min)
        self.stack.append((val, new_min))

    def pop(self) -> None:
        if not self.stack:
            raise IndexError("pop from empty MinStackTuple")
        self.stack.pop()

    def top(self) -> int:
        if not self.stack:
            raise IndexError("top from empty MinStackTuple")
        return self.stack[-1][0]

    def getMin(self) -> int:
        if not self.stack:
            raise IndexError("getMin from empty MinStackTuple")
        return self.stack[-1][1]

# --- Problem 3: Implement Queue using Stacks ---

class MyQueue:
    """
    Implements a first-in, first-out (FIFO) queue using two stacks.

    Optimal Approach: Two stacks, `input_stack` and `output_stack`.
    - `push(x)`: Always pushes to `input_stack`. This is O(1).
    - `pop()`:
        - If `output_stack` is not empty, pop from it. This is O(1).
        - If `output_stack` is empty, transfer all elements from `input_stack` to `output_stack`.
          This effectively reverses the `input_stack` so that the oldest element is at the top of `output_stack`.
          Then, pop from `output_stack`. This transfer operation takes O(N) where N is the size of `input_stack`.
          However, each element is moved at most twice (once from input to output stack), so the amortized time
          complexity for `pop` is O(1).
    - `peek()`: Similar logic to `pop()`, but just returns the top without removing.
    - `empty()`: Returns true if both stacks are empty.

    Time Complexity:
    - `push`: O(1) amortized. (Python list append)
    - `pop`: O(1) amortized. (Each element is pushed/popped from input/output stack at most twice).
    - `peek`: O(1) amortized.
    - `empty`: O(1).
    Space Complexity: O(N) where N is the total number of elements stored in the queue,
                      as elements are distributed between `input_stack` and `output_stack`.
    """

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.input_stack = []
        self.output_stack = []

    def _transfer_if_needed(self):
        """
        Helper method to transfer elements from input_stack to output_stack
        if output_stack is empty. This ensures the correct FIFO order for pop/peek.
        """
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())

    def push(self, x: int) -> None:
        """
        Pushes element x to the back of the queue.
        """
        self.input_stack.append(x)

    def pop(self) -> int:
        """
        Removes the element from the front of the queue and returns that element.
        """
        self._transfer_if_needed()
        if not self.output_stack:
            raise IndexError("pop from empty MyQueue")
        return self.output_stack.pop()

    def peek(self) -> int:
        """
        Get the front element.
        """
        self._transfer_if_needed()
        if not self.output_stack:
            raise IndexError("peek from empty MyQueue")
        return self.output_stack[-1]

    def empty(self) -> bool:
        """
        Returns whether the queue is empty.
        """
        return not self.input_stack and not self.output_stack

# --- Problem 4: Implement Stack using Queues ---

class MyStack:
    """
    Implements a last-in, first-out (LIFO) stack using only queues.
    We will use `collections.deque` for efficient queue operations (O(1) append/popleft).

    Optimal Approach: Using one main queue and a temporary queue (or by making push/pop expensive).

    Approach 1: Make push operation O(N) (expensive push).
    - `push(x)`:
        1. Add `x` to the main queue (q1).
        2. Rotate elements: For every element already in q1 (except the newly added `x`),
           dequeue it and enqueue it back. This moves `x` to the front, effectively making it the "top" of the stack.
           This costs O(N) because N-1 elements are dequeued and enqueued.
    - `pop()`: O(1) (just dequeue from q1).
    - `top()`: O(1) (just peek at front of q1).
    - `empty()`: O(1).

    Approach 2: Make pop operation O(N) (expensive pop, using two queues).
    - `push(x)`: Add `x` to q1. O(1).
    - `pop()`:
        1. Move N-1 elements from q1 to q2 (temporary queue). The last element remaining in q1 is the top of the stack.
        2. Pop and return this last element from q1.
        3. Swap q1 and q2 (q2 becomes the new q1).
        This costs O(N).
    - `top()`: Same as pop, but don't remove, then move back. O(N).
    - `empty()`: O(1).

    We'll implement Approach 1 (expensive push) for `MyStack`.

    Time Complexity (Expensive Push - Approach 1):
    - `push`: O(N) where N is the current number of elements in the stack.
    - `pop`: O(1)
    - `top`: O(1)
    - `empty`: O(1)
    Space Complexity: O(N) for storing elements in the queue.
    """

    def __init__(self):
        """
        Initialize your data structure here.
        Using a single `collections.deque` as the underlying queue.
        """
        self.q = collections.deque()

    def push(self, x: int) -> None:
        """
        Pushes element x onto the stack. Makes x the "top" element.
        To achieve LIFO with a FIFO queue:
        1. Add x to the back of the queue.
        2. Rotate the queue: Dequeue all elements that were added *before* x,
           and enqueue them back. This effectively moves x to the front.
        """
        self.q.append(x)
        # Move all elements except the newly added one to the back
        # This makes the new element the first one to be dequeued (LIFO behavior)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        """
        Removes the element on top of the stack and returns that element.
        Since push made the top element the front of the queue, just dequeue.
        """
        if not self.q:
            raise IndexError("pop from empty MyStack")
        return self.q.popleft()

    def top(self) -> int:
        """
        Get the top element.
        Since push made the top element the front of the queue, just peek.
        """
        if not self.q:
            raise IndexError("top from empty MyStack")
        return self.q[0]

    def empty(self) -> bool:
        """
        Returns whether the stack is empty.
        """
        return not self.q

# --- Problem 5: Daily Temperatures ---

def daily_temperatures(temperatures: list[int]) -> list[int]:
    """
    Given an array of integers `temperatures` representing the daily temperatures,
    return an array `answer` such that `answer[i]` is the number of days you have
    to wait after the `i`-th day to get a warmer temperature.
    If there is no future day for which this is possible, keep `answer[i] == 0`.

    Optimal Approach: Using a Monotonic Stack.
    A monotonic stack (here, a decreasing stack) stores indices of temperatures.
    When iterating through the temperatures:
    - For each current temperature `T[i]`:
        - While the stack is not empty and the temperature at the index `stack[-1]`
          is less than the current temperature `T[i]`:
            - Pop the index `prev_index` from the stack.
            - The waiting days for `T[prev_index]` is `i - prev_index`. Store this in `answer[prev_index]`.
        - Push the current index `i` onto the stack.
    After iterating, any indices remaining in the stack have no warmer day, so their `answer` remains 0.

    Time Complexity: O(N) where N is the number of temperatures.
                     Each temperature is pushed onto the stack once and popped from the stack at most once.
    Space Complexity: O(N) in the worst case (e.g., temperatures are monotonically decreasing),
                      where the stack stores all indices.
    """
    n = len(temperatures)
    answer = [0] * n
    stack = [] # Stores indices [index1, index2, ...]

    for i in range(n):
        current_temp = temperatures[i]
        # While stack is not empty and current_temp is warmer than the temperature at stack's top index
        while stack and current_temp > temperatures[stack[-1]]:
            prev_index = stack.pop()
            answer[prev_index] = i - prev_index
        
        # Push current index onto the stack
        # This maintains a stack of indices for which we haven't found a warmer day yet,
        # and the temperatures corresponding to these indices are in decreasing order.
        stack.append(i)
    
    # Any indices remaining in the stack will have 0 waiting days by default (initialization)
    return answer

def daily_temperatures_brute_force(temperatures: list[int]) -> list[int]:
    """
    Brute force approach for Daily Temperatures.
    For each day, iterate through all subsequent days to find a warmer one.

    Time Complexity: O(N^2) where N is the number of temperatures.
                     For each day (N), we potentially iterate through N-1 subsequent days.
    Space Complexity: O(N) for the result array.
    """
    n = len(temperatures)
    answer = [0] * n

    for i in range(n):
        for j in range(i + 1, n):
            if temperatures[j] > temperatures[i]:
                answer[i] = j - i
                break # Found the first warmer day, move to next i
    
    return answer