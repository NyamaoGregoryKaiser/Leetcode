```python
"""
stack_queue_problems.py

This file contains optimal solutions to several common coding interview problems
involving Stack and Queue data structures. Each function includes detailed
comments, time, and space complexity analysis.
"""

import collections

# --- Problem 1: Valid Parentheses ---
# LeetCode: 20
# Description: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
# determine if the input string is valid.
# An input string is valid if:
# 1. Open brackets must be closed by the same type of brackets.
# 2. Open brackets must be closed in the correct order.
# 3. Every close bracket has a corresponding open bracket of the same type.

def is_valid_parentheses(s: str) -> bool:
    """
    Determines if the input string has valid parentheses.

    Uses a stack to keep track of open brackets. When a closing bracket is encountered,
    it checks if the stack's top element is the corresponding opening bracket.

    Args:
        s: The input string containing parentheses.

    Returns:
        True if the parentheses are valid, False otherwise.

    Time Complexity: O(N), where N is the length of the string `s`.
                     Each character is pushed onto the stack or popped from it once.
    Space Complexity: O(N), in the worst case (e.g., "((("), the stack can store
                      all opening brackets.
    """
    stack = []  # Use a list as a stack
    mapping = {")": "(", "}": "{", "]": "["} # Map closing brackets to their opening counterparts

    for char in s:
        if char in mapping:  # It's a closing bracket
            # Get the top element from the stack, or use a dummy value if stack is empty
            top_element = stack.pop() if stack else '#'
            # Check if the popped element matches the expected opening bracket
            if mapping[char] != top_element:
                return False
        else:  # It's an opening bracket
            stack.append(char)

    # After iterating through the entire string, the stack should be empty
    # if all opening brackets were correctly closed.
    return not stack

# --- Problem 2: Min Stack ---
# LeetCode: 155
# Description: Design a stack that supports push, pop, top, and retrieving the minimum
# element in constant time.
# Implement the MinStack class:
# - MinStack() initializes the stack object.
# - void push(int val) pushes the element val onto the stack.
# - void pop() removes the element on the top of the stack.
# - int top() gets the top element of the stack.
# - int getMin() retrieves the minimum element in the stack.

class MinStack:
    """
    Implements a stack with O(1) time complexity for push, pop, top, and getMin.

    Approach: Use an auxiliary stack (`min_stack`) to keep track of the minimum
    element at each corresponding state of the main stack.

    Time Complexity:
        - push: O(1)
        - pop: O(1)
        - top: O(1)
        - getMin: O(1)
    Space Complexity: O(N), where N is the number of elements in the stack.
                      In the worst case (elements pushed in descending order),
                      both stacks can grow to size N.
    """
    def __init__(self):
        """
        Initializes the MinStack object with an empty main stack and an empty
        auxiliary minimum tracking stack.
        """
        self.stack = []       # Main stack to store all elements
        self.min_stack = []   # Auxiliary stack to store the minimum at each point

    def push(self, val: int) -> None:
        """
        Pushes an element onto the stack. Updates the min_stack accordingly.
        """
        self.stack.append(val)
        # The new minimum is the smaller of the current value and the current min_stack top
        # (if min_stack is not empty). If min_stack is empty, the current value is the min.
        current_min = self.min_stack[-1] if self.min_stack else float('inf')
        self.min_stack.append(min(val, current_min))

    def pop(self) -> None:
        """
        Removes the element from the top of the stack.
        Both stacks are popped to maintain consistency.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("pop from empty stack")
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        """
        Returns the element at the top of the stack without removing it.
        Raises an IndexError if the stack is empty.
        """
        if not self.stack:
            raise IndexError("top from empty stack")
        return self.stack[-1]

    def getMin(self) -> int:
        """
        Retrieves the current minimum element in the stack.
        Raises an IndexError if the stack is empty.
        """
        if not self.min_stack:
            raise IndexError("getMin from empty stack")
        return self.min_stack[-1]

# --- Problem 3: Implement Queue using Stacks ---
# LeetCode: 232
# Description: Implement a first-in-first-out (FIFO) queue using only two stacks.
# The implemented queue should support all the functions of a normal queue
# (push, peek, pop, and empty).
#
# Implement the MyQueue class:
# - push(x) Pushes element x to the back of the queue.
# - pop() Removes the element from the front of the queue and returns it.
# - peek() Returns the element at the front of the queue.
# - empty() Returns true if the queue is empty, false otherwise.
#
# Notes:
# - You must use only standard operations of a stack, which means only push to top,
#   peek/pop from top, size, and is_empty operations are valid.
# - You may assume that all operations are valid (for example, no pop or peek operations
#   will be called on an empty queue).

class MyQueue:
    """
    Implements a Queue using two stacks. This approach provides amortized O(1)
    time complexity for push, pop, and peek operations.

    Approach:
    - `in_stack`: Used for push operations (enqueue elements).
    - `out_stack`: Used for pop and peek operations (dequeue elements).

    When popping or peeking, if `out_stack` is empty, all elements are moved
    from `in_stack` to `out_stack`. This reversal ensures FIFO order.
    The cost of moving N elements is amortized over N push operations.

    Time Complexity:
        - push: O(1)
        - pop: Amortized O(1). Worst case O(N) when `out_stack` is empty and
               elements need to be moved from `in_stack`.
        - peek: Amortized O(1). Worst case O(N).
        - empty: O(1)
    Space Complexity: O(N), where N is the number of elements in the queue.
                      Both stacks together store all elements.
    """
    def __init__(self):
        """
        Initializes the queue with two empty stacks.
        """
        self.in_stack = []   # For new elements (push)
        self.out_stack = []  # For old elements (pop, peek)

    def push(self, x: int) -> None:
        """
        Pushes element x to the back of the queue.
        Time: O(1)
        """
        self.in_stack.append(x)

    def _transfer_if_needed(self) -> None:
        """
        Helper method to transfer elements from in_stack to out_stack if out_stack is empty.
        This ensures elements are in the correct order for FIFO operations.
        """
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())

    def pop(self) -> int:
        """
        Removes the element from the front of the queue and returns it.
        Time: Amortized O(1) (Worst case O(N))
        """
        self._transfer_if_needed()
        if not self.out_stack:
            raise IndexError("pop from empty queue") # Should not happen per problem statement
        return self.out_stack.pop()

    def peek(self) -> int:
        """
        Returns the element at the front of the queue.
        Time: Amortized O(1) (Worst case O(N))
        """
        self._transfer_if_needed()
        if not self.out_stack:
            raise IndexError("peek from empty queue") # Should not happen per problem statement
        return self.out_stack[-1]

    def empty(self) -> bool:
        """
        Returns true if the queue is empty, false otherwise.
        Time: O(1)
        """
        return not self.in_stack and not self.out_stack


# --- Problem 4: Sliding Window Maximum ---
# LeetCode: 239
# Description: You are given an array of integers nums, there is a sliding window of
# size k which is moving from the very left of the array to the very right.
# You can only see the k numbers in the window. Each time the sliding window moves
# right by one position.
# Return the max sliding window.

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    """
    Finds the maximum value in each sliding window of size k.

    Uses a deque (double-ended queue) to store indices of elements in the current
    window in decreasing order of their values. This is a Monotonic Deque approach.

    Args:
        nums: The input list of integers.
        k: The size of the sliding window.

    Returns:
        A list of maximum values for each sliding window.

    Time Complexity: O(N), where N is the length of `nums`. Each element is
                     added and removed from the deque at most once.
    Space Complexity: O(K), as the deque stores at most K elements (indices).
    """
    if not nums or k == 0:
        return []

    if k == 1: # Edge case: window size 1, just return the array
        return nums

    # Deque stores indices, not values. Elements in deque are in decreasing order.
    # The front of the deque (index 0) will always hold the index of the maximum element
    # in the current window.
    dq = collections.deque()
    result = []
    n = len(nums)

    for i in range(n):
        # 1. Remove elements from the front of the deque if they are outside the current window.
        #    The current window ranges from (i - k + 1) to i.
        if dq and dq[0] == i - k:
            dq.popleft()

        # 2. Remove elements from the back of the deque that are smaller than the current element `nums[i]`.
        #    These elements can no longer be the maximum because `nums[i]` is greater and more recent.
        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()

        # 3. Add the current element's index to the back of the deque.
        dq.append(i)

        # 4. If the window has fully formed (i.e., we have processed at least `k` elements),
        #    the maximum for this window is `nums[dq[0]]`.
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

# --- Problem 5: Daily Temperatures ---
# LeetCode: 739
# Description: Given an array of integers temperatures represents the daily temperatures,
# return an array answer such that answer[i] is the number of days you have to wait
# after the ith day to get a warmer temperature. If there is no future day for which
# this is possible, keep answer[i] == 0 instead.

def daily_temperatures(temperatures: list[int]) -> list[int]:
    """
    Calculates the number of days to wait for a warmer temperature.

    Uses a monotonic stack (specifically, a decreasing stack) to efficiently find
    the next greater element for each temperature. The stack stores indices.

    Args:
        temperatures: A list of daily temperatures.

    Returns:
        A list where `answer[i]` is the number of days to wait for a warmer
        temperature after day `i`.

    Time Complexity: O(N), where N is the number of temperatures. Each temperature
                     is pushed onto the stack and popped from it at most once.
    Space Complexity: O(N), in the worst case (e.g., temperatures in decreasing
                      order), the stack can store all indices.
    """
    n = len(temperatures)
    answer = [0] * n  # Initialize result array with zeros
    stack = []        # Stores indices of temperatures in decreasing order

    for i in range(n):
        current_temp = temperatures[i]

        # While stack is not empty and the current temperature is warmer than
        # the temperature at the index on top of the stack:
        while stack and current_temp > temperatures[stack[-1]]:
            # Pop the index from the stack
            prev_index = stack.pop()
            # Calculate the waiting days and store it in the answer array
            answer[prev_index] = i - prev_index

        # Push the current index onto the stack
        stack.append(i)

    # After the loop, any indices remaining in the stack have no warmer day
    # to their right, so their corresponding answer[i] remains 0 (as initialized).
    return answer

if __name__ == "__main__":
    from src.utils import Timer

    print("--- Problem 1: Valid Parentheses ---")
    with Timer("Valid Parentheses"):
        test_cases_vp = [
            ("()", True),
            ("()[]{}", True),
            ("(]", False),
            ("([)]", False),
            ("{[]}", True),
            ("", True),
            ("[", False),
            ("]", False),
            ("((((", False),
            ("))))", False),
            ("{[()]}", True)
        ]
        for s, expected in test_cases_vp:
            result = is_valid_parentheses(s)
            print(f"'{s}' -> {result} (Expected: {expected}) {'✅' if result == expected else '❌'}")

    print("\n--- Problem 2: Min Stack ---")
    with Timer("Min Stack"):
        minStack = MinStack()
        minStack.push(-2)
        minStack.push(0)
        minStack.push(-3)
        print(f"Min: {minStack.getMin()}") # Expected: -3
        minStack.pop()
        print(f"Top: {minStack.top()}")   # Expected: 0
        print(f"Min: {minStack.getMin()}") # Expected: -2
        minStack.pop()
        print(f"Top: {minStack.top()}")   # Expected: -2
        print(f"Min: {minStack.getMin()}") # Expected: -2
        minStack.push(-1)
        minStack.push(10)
        print(f"Top: {minStack.top()}")   # Expected: 10
        print(f"Min: {minStack.getMin()}") # Expected: -2

        minStack2 = MinStack()
        minStack2.push(5)
        minStack2.push(4)
        minStack2.push(3)
        minStack2.push(2)
        minStack2.push(1)
        print(f"Min2: {minStack2.getMin()}") # Expected: 1
        minStack2.pop() # pop 1
        print(f"Min2: {minStack2.getMin()}") # Expected: 2
        minStack2.pop() # pop 2
        print(f"Min2: {minStack2.getMin()}") # Expected: 3


    print("\n--- Problem 3: Implement Queue using Stacks ---")
    with Timer("Queue using Stacks"):
        myQueue = MyQueue()
        myQueue.push(1) # queue is: [1]
        myQueue.push(2) # queue is: [1, 2] (left is front)
        print(f"Peek: {myQueue.peek()}") # Expected: 1
        print(f"Pop: {myQueue.pop()}")   # Expected: 1, queue is: [2]
        print(f"Empty? {myQueue.empty()}") # Expected: False
        myQueue.push(3) # queue is: [2, 3]
        print(f"Peek: {myQueue.peek()}") # Expected: 2
        print(f"Pop: {myQueue.pop()}")   # Expected: 2, queue is: [3]
        print(f"Pop: {myQueue.pop()}")   # Expected: 3, queue is: []
        print(f"Empty? {myQueue.empty()}") # Expected: True

    print("\n--- Problem 4: Sliding Window Maximum ---")
    with Timer("Sliding Window Maximum"):
        test_cases_swm = [
            ([1,3,-1,-3,5,3,6,7], 3, [3,3,5,5,6,7]),
            ([1], 1, [1]),
            ([1, -1], 1, [1, -1]),
            ([9,11], 2, [11]),
            ([4,-2], 2, [4]),
            ([7,2,4], 2, [7,4]),
            ([1,3,1,2,0,5], 3, [3,3,2,5]),
            ([1,2,3,4,5], 3, [3,4,5]),
            ([5,4,3,2,1], 3, [5,4,3]),
            ([], 0, []),
            ([1,2,3], 0, []) # Should be handled as empty list for k=0
        ]
        for nums, k, expected in test_cases_swm:
            result = max_sliding_window(nums, k)
            print(f"Nums: {nums}, k: {k} -> {result} (Expected: {expected}) {'✅' if result == expected else '❌'}")


    print("\n--- Problem 5: Daily Temperatures ---")
    with Timer("Daily Temperatures"):
        test_cases_dt = [
            ([73,74,75,71,69,72,76,73], [1,1,4,2,1,1,0,0]),
            ([30,40,50,60], [1,1,1,0]),
            ([30,60,90], [1,1,0]),
            ([89,62,70,58,47,47,46,76,100,70], [8,1,5,4,3,2,1,1,0,0]),
            ([100,90,80,70,60], [0,0,0,0,0]),
            ([60,70,60,80], [1,2,1,0]),
            ([70,60,50,40], [0,0,0,0]),
            ([], [])
        ]
        for temperatures, expected in test_cases_dt:
            result = daily_temperatures(temperatures)
            print(f"Temps: {temperatures} -> {result} (Expected: {expected}) {'✅' if result == expected else '❌'}")
```