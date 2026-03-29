# tests/test_stack_queue_problems.py
import unittest
from src.stack_queue_problems import (
    is_valid_parentheses,
    is_valid_parentheses_naive, # For comparison, though it fails on nesting
    MinStack,
    MinStackTuple,
    MyQueue,
    MyStack,
    daily_temperatures,
    daily_temperatures_brute_force
)

class TestStackQueueProblems(unittest.TestCase):

    # --- Test Cases for Valid Parentheses ---
    def test_valid_parentheses_optimal(self):
        self.assertTrue(is_valid_parentheses("()"))
        self.assertTrue(is_valid_parentheses("()[]{}"))
        self.assertTrue(is_valid_parentheses("{[]}"))
        self.assertTrue(is_valid_parentheses("((()))"))
        self.assertTrue(is_valid_parentheses("({[]})"))
        self.assertTrue(is_valid_parentheses("")) # Empty string is valid

    def test_invalid_parentheses_optimal(self):
        self.assertFalse(is_valid_parentheses("("))
        self.assertFalse(is_valid_parentheses(")"))
        self.assertFalse(is_valid_parentheses("([)]"))
        self.assertFalse(is_valid_parentheses("((("))
        self.assertFalse(is_valid_parentheses(")))"))
        self.assertFalse(is_valid_parentheses("{[}"))
        self.assertFalse(is_valid_parentheses("]"))
        self.assertFalse(is_valid_parentheses("){"))

    def test_valid_parentheses_naive_comparison(self):
        # Naive approach should fail on nesting
        self.assertTrue(is_valid_parentheses_naive("()"))
        self.assertTrue(is_valid_parentheses_naive("()[]{}"))
        self.assertTrue(is_valid_parentheses_naive("{[]}"))
        self.assertTrue(is_valid_parentheses_naive("((()))"))
        self.assertFalse(is_valid_parentheses_naive("([)]")) # This case fails for naive
        self.assertTrue(is_valid_parentheses_naive(""))
        # Note: naive also passes "){" if counts are equal for each type, which they might be.
        # It's not a strong alternative, more of an example of what NOT to do.

    # --- Test Cases for Min Stack ---
    def test_min_stack(self):
        minStack = MinStack()
        minStack.push(-2)
        minStack.push(0)
        minStack.push(-3)
        self.assertEqual(minStack.getMin(), -3)
        minStack.pop()
        self.assertEqual(minStack.top(), 0)
        self.assertEqual(minStack.getMin(), -2)

        minStack = MinStack()
        minStack.push(1)
        minStack.push(2)
        self.assertEqual(minStack.getMin(), 1)
        minStack.pop()
        self.assertEqual(minStack.getMin(), 1) # Still 1
        minStack.pop()
        with self.assertRaises(IndexError):
            minStack.getMin()

        minStack = MinStack()
        minStack.push(2)
        minStack.push(0)
        minStack.push(3)
        minStack.push(0)
        self.assertEqual(minStack.getMin(), 0)
        minStack.pop() # Pops 0
        self.assertEqual(minStack.getMin(), 0) # Min is now the previous 0
        minStack.pop() # Pops 3
        self.assertEqual(minStack.getMin(), 0) # Min is still 0
        minStack.pop() # Pops 0
        self.assertEqual(minStack.getMin(), 2) # Min is 2

    def test_min_stack_empty_operations(self):
        minStack = MinStack()
        self.assertTrue(len(minStack) == 0)
        with self.assertRaises(IndexError):
            minStack.pop()
        with self.assertRaises(IndexError):
            minStack.top()
        with self.assertRaises(IndexError):
            minStack.getMin()
        
        minStack.push(5)
        self.assertFalse(len(minStack) == 0)
        self.assertEqual(minStack.top(), 5)
        self.assertEqual(minStack.getMin(), 5)
        minStack.pop()
        self.assertTrue(len(minStack) == 0)


    def test_min_stack_tuple_implementation(self):
        minStack = MinStackTuple()
        minStack.push(-2)
        minStack.push(0)
        minStack.push(-3)
        self.assertEqual(minStack.getMin(), -3)
        minStack.pop()
        self.assertEqual(minStack.top(), 0)
        self.assertEqual(minStack.getMin(), -2)

        minStack = MinStackTuple()
        minStack.push(2)
        minStack.push(0)
        minStack.push(3)
        minStack.push(0)
        self.assertEqual(minStack.getMin(), 0)
        minStack.pop() # Pops 0
        self.assertEqual(minStack.getMin(), 0) # Min is now the previous 0
        minStack.pop() # Pops 3
        self.assertEqual(minStack.getMin(), 0) # Min is still 0
        minStack.pop() # Pops 0
        self.assertEqual(minStack.getMin(), 2) # Min is 2


    # --- Test Cases for Implement Queue using Stacks ---
    def test_my_queue(self):
        myQueue = MyQueue()
        self.assertTrue(myQueue.empty())
        myQueue.push(1)
        myQueue.push(2)
        self.assertFalse(myQueue.empty())
        self.assertEqual(myQueue.peek(), 1)
        self.assertEqual(myQueue.pop(), 1)
        self.assertEqual(myQueue.peek(), 2)
        myQueue.push(3)
        self.assertEqual(myQueue.peek(), 2)
        self.assertEqual(myQueue.pop(), 2)
        self.assertEqual(myQueue.pop(), 3)
        self.assertTrue(myQueue.empty())

    def test_my_queue_edge_cases(self):
        myQueue = MyQueue()
        with self.assertRaises(IndexError):
            myQueue.pop()
        with self.assertRaises(IndexError):
            myQueue.peek()

        myQueue.push(10)
        self.assertEqual(myQueue.peek(), 10)
        self.assertFalse(myQueue.empty())
        self.assertEqual(myQueue.pop(), 10)
        self.assertTrue(myQueue.empty())
        with self.assertRaises(IndexError):
            myQueue.pop()

        myQueue.push(1)
        myQueue.push(2)
        myQueue.pop()
        myQueue.push(3)
        self.assertEqual(myQueue.pop(), 2)
        self.assertEqual(myQueue.pop(), 3)
        self.assertTrue(myQueue.empty())


    # --- Test Cases for Implement Stack using Queues ---
    def test_my_stack(self):
        myStack = MyStack()
        self.assertTrue(myStack.empty())
        myStack.push(1)
        myStack.push(2)
        self.assertFalse(myStack.empty())
        self.assertEqual(myStack.top(), 2)
        self.assertEqual(myStack.pop(), 2)
        self.assertEqual(myStack.top(), 1)
        myStack.push(3)
        self.assertEqual(myStack.top(), 3)
        self.assertEqual(myStack.pop(), 3)
        self.assertEqual(myStack.pop(), 1)
        self.assertTrue(myStack.empty())

    def test_my_stack_edge_cases(self):
        myStack = MyStack()
        with self.assertRaises(IndexError):
            myStack.pop()
        with self.assertRaises(IndexError):
            myStack.top()
        
        myStack.push(5)
        self.assertEqual(myStack.top(), 5)
        self.assertFalse(myStack.empty())
        self.assertEqual(myStack.pop(), 5)
        self.assertTrue(myStack.empty())
        with self.assertRaises(IndexError):
            myStack.pop()

        myStack.push(1)
        myStack.push(2)
        myStack.pop()
        myStack.push(3)
        self.assertEqual(myStack.pop(), 3)
        self.assertEqual(myStack.pop(), 1)
        self.assertTrue(myStack.empty())


    # --- Test Cases for Daily Temperatures ---
    def test_daily_temperatures_optimal(self):
        self.assertEqual(daily_temperatures([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0])
        self.assertEqual(daily_temperatures([30,40,50,60]), [1,1,1,0])
        self.assertEqual(daily_temperatures([30,20,10]), [0,0,0])
        self.assertEqual(daily_temperatures([89,62,70,58,47,47,46,76,100,70]), [8,1,5,4,3,2,1,1,0,0])
        self.assertEqual(daily_temperatures([]), [])
        self.assertEqual(daily_temperatures([100]), [0])
        self.assertEqual(daily_temperatures([10,10,10,10]), [0,0,0,0])
        self.assertEqual(daily_temperatures([50,40,30,20,10,60]), [5,4,3,2,1,0])
        self.assertEqual(daily_temperatures([30,60,90]), [1,1,0])

    def test_daily_temperatures_brute_force(self):
        self.assertEqual(daily_temperatures_brute_force([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0])
        self.assertEqual(daily_temperatures_brute_force([30,40,50,60]), [1,1,1,0])
        self.assertEqual(daily_temperatures_brute_force([30,20,10]), [0,0,0])
        self.assertEqual(daily_temperatures_brute_force([89,62,70,58,47,47,46,76,100,70]), [8,1,5,4,3,2,1,1,0,0])
        self.assertEqual(daily_temperatures_brute_force([]), [])
        self.assertEqual(daily_temperatures_brute_force([100]), [0])
        self.assertEqual(daily_temperatures_brute_force([10,10,10,10]), [0,0,0,0])
        self.assertEqual(daily_temperatures_brute_force([50,40,30,20,10,60]), [5,4,3,2,1,0])
        self.assertEqual(daily_temperatures_brute_force([30,60,90]), [1,1,0])

if __name__ == '__main__':
    unittest.main()