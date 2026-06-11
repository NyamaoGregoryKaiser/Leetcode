```python
"""
test_stack_queue_problems.py

This file contains unit tests for the functions and classes defined in
`src/stack_queue_problems.py` using Python's `unittest` framework.
"""

import unittest
import collections
from src.stack_queue_problems import (
    is_valid_parentheses,
    MinStack,
    MyQueue,
    max_sliding_window,
    daily_temperatures
)

class TestStackQueueProblems(unittest.TestCase):

    # --- Test Cases for Problem 1: Valid Parentheses ---
    def test_valid_parentheses(self):
        self.assertTrue(is_valid_parentheses("()"))
        self.assertTrue(is_valid_parentheses("()[]{}"))
        self.assertTrue(is_valid_parentheses("{[]}"))
        self.assertTrue(is_valid_parentheses(""))
        self.assertTrue(is_valid_parentheses("({[]})"))

    def test_invalid_parentheses(self):
        self.assertFalse(is_valid_parentheses("(]"))
        self.assertFalse(is_valid_parentheses("([)]"))
        self.assertFalse(is_valid_parentheses("{"))
        self.assertFalse(is_valid_parentheses("}"))
        self.assertFalse(is_valid_parentheses("((("))
        self.assertFalse(is_valid_parentheses(")))"))
        self.assertFalse(is_valid_parentheses("]"))
        self.assertFalse(is_valid_parentheses("{[}")) # Mismatched type but correct count

    def test_mixed_parentheses(self):
        self.assertFalse(is_valid_parentheses("]["))
        self.assertFalse(is_valid_parentheses("({[)"))

    # --- Test Cases for Problem 2: Min Stack ---
    def test_min_stack_basic_operations(self):
        minStack = MinStack()
        minStack.push(-2)
        minStack.push(0)
        minStack.push(-3)
        self.assertEqual(minStack.getMin(), -3)
        self.assertEqual(minStack.top(), -3)
        minStack.pop()
        self.assertEqual(minStack.top(), 0)
        self.assertEqual(minStack.getMin(), -2)

    def test_min_stack_ascending_order(self):
        minStack = MinStack()
        minStack.push(1)
        minStack.push(2)
        minStack.push(3)
        self.assertEqual(minStack.getMin(), 1)
        self.assertEqual(minStack.top(), 3)
        minStack.pop()
        self.assertEqual(minStack.getMin(), 1)
        self.assertEqual(minStack.top(), 2)

    def test_min_stack_descending_order(self):
        minStack = MinStack()
        minStack.push(3)
        minStack.push(2)
        minStack.push(1)
        self.assertEqual(minStack.getMin(), 1)
        self.assertEqual(minStack.top(), 1)
        minStack.pop()
        self.assertEqual(minStack.getMin(), 2)
        self.assertEqual(minStack.top(), 2)

    def test_min_stack_empty_operations(self):
        minStack = MinStack()
        self.assertTrue(not hasattr(minStack, 'stack') or not minStack.stack) # Check if empty initially

        with self.assertRaises(IndexError):
            minStack.pop()
        with self.assertRaises(IndexError):
            minStack.top()
        with self.assertRaises(IndexError):
            minStack.getMin()

        minStack.push(10)
        self.assertEqual(minStack.top(), 10)
        self.assertEqual(minStack.getMin(), 10)
        minStack.pop()
        with self.assertRaises(IndexError):
            minStack.pop()

    def test_min_stack_with_duplicates(self):
        minStack = MinStack()
        minStack.push(5)
        minStack.push(2)
        minStack.push(5)
        minStack.push(2)
        self.assertEqual(minStack.getMin(), 2)
        minStack.pop() # pop 2
        self.assertEqual(minStack.getMin(), 2)
        minStack.pop() # pop 5
        self.assertEqual(minStack.getMin(), 2)
        minStack.pop() # pop 2
        self.assertEqual(minStack.getMin(), 5)

    # --- Test Cases for Problem 3: Implement Queue using Stacks ---
    def test_my_queue_basic_operations(self):
        myQueue = MyQueue()
        self.assertTrue(myQueue.empty())
        myQueue.push(1)
        myQueue.push(2)
        self.assertFalse(myQueue.empty())
        self.assertEqual(myQueue.peek(), 1)
        self.assertEqual(myQueue.pop(), 1)
        self.assertEqual(myQueue.peek(), 2)
        self.assertFalse(myQueue.empty())
        self.assertEqual(myQueue.pop(), 2)
        self.assertTrue(myQueue.empty())

    def test_my_queue_push_pop_interleaved(self):
        myQueue = MyQueue()
        myQueue.push(1)
        self.assertEqual(myQueue.pop(), 1)
        myQueue.push(2)
        myQueue.push(3)
        self.assertEqual(myQueue.pop(), 2)
        myQueue.push(4)
        self.assertEqual(myQueue.peek(), 3)
        self.assertEqual(myQueue.pop(), 3)
        self.assertEqual(myQueue.pop(), 4)
        self.assertTrue(myQueue.empty())

    def test_my_queue_single_element(self):
        myQueue = MyQueue()
        myQueue.push(5)
        self.assertFalse(myQueue.empty())
        self.assertEqual(myQueue.peek(), 5)
        self.assertEqual(myQueue.pop(), 5)
        self.assertTrue(myQueue.empty())

    # Problem states "assume all operations are valid", so no need to test pop/peek on empty

    # --- Test Cases for Problem 4: Sliding Window Maximum ---
    def test_max_sliding_window_standard(self):
        self.assertEqual(max_sliding_window([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7])
        self.assertEqual(max_sliding_window([1,3,1,2,0,5], 3), [3,3,2,5])

    def test_max_sliding_window_edge_cases(self):
        self.assertEqual(max_sliding_window([1], 1), [1])
        self.assertEqual(max_sliding_window([1, -1], 1), [1, -1])
        self.assertEqual(max_sliding_window([9,11], 2), [11])
        self.assertEqual(max_sliding_window([4,-2], 2), [4])
        self.assertEqual(max_sliding_window([7,2,4], 2), [7,4])

    def test_max_sliding_window_empty_or_zero_k(self):
        self.assertEqual(max_sliding_window([], 0), [])
        self.assertEqual(max_sliding_window([1,2,3], 0), [])
        self.assertEqual(max_sliding_window([], 1), [])

    def test_max_sliding_window_all_same(self):
        self.assertEqual(max_sliding_window([1,1,1,1,1], 3), [1,1,1])
        self.assertEqual(max_sliding_window([5,5,5,5], 2), [5,5,5])

    def test_max_sliding_window_monotonic(self):
        self.assertEqual(max_sliding_window([1,2,3,4,5], 3), [3,4,5]) # Increasing
        self.assertEqual(max_sliding_window([5,4,3,2,1], 3), [5,4,3]) # Decreasing

    # --- Test Cases for Problem 5: Daily Temperatures ---
    def test_daily_temperatures_standard(self):
        self.assertEqual(daily_temperatures([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0])
        self.assertEqual(daily_temperatures([30,40,50,60]), [1,1,1,0])
        self.assertEqual(daily_temperatures([30,60,90]), [1,1,0])

    def test_daily_temperatures_monotonic_cases(self):
        self.assertEqual(daily_temperatures([89,62,70,58,47,47,46,76,100,70]), [8,1,5,4,3,2,1,1,0,0])
        self.assertEqual(daily_temperatures([100,90,80,70,60]), [0,0,0,0,0]) # Decreasing
        self.assertEqual(daily_temperatures([60,70,60,80]), [1,2,1,0])

    def test_daily_temperatures_empty_input(self):
        self.assertEqual(daily_temperatures([]), [])
        self.assertEqual(daily_temperatures([10]), [0]) # Single element
        self.assertEqual(daily_temperatures([70,60,50,40]), [0,0,0,0]) # All decreasing, no warmer days

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```