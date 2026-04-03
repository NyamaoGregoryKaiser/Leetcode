import unittest
import sys
import os

# Add parent directory to path to allow importing main_algorithms
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main_algorithms.problem_01_valid_parentheses import Solution as ValidParenthesesSolution
from main_algorithms.problem_02_min_stack import MinStack
from main_algorithms.problem_03_queue_using_stacks import MyQueue
from main_algorithms.problem_04_sliding_window_maximum import Solution as SlidingWindowMaximumSolution
from main_algorithms.problem_05_rotten_oranges import Solution as RottenOrangesSolution

class TestStackQueueProblems(unittest.TestCase):

    def test_01_valid_parentheses(self):
        sol = ValidParenthesesSolution()
        self.assertTrue(sol.isValid("()"))
        self.assertTrue(sol.isValid("()[]{}"))
        self.assertTrue(sol.isValid("{[]}"))
        self.assertTrue(sol.isValid(""))
        self.assertFalse(sol.isValid("(]"))
        self.assertFalse(sol.isValid("([)]"))
        self.assertFalse(sol.isValid("{"))
        self.assertFalse(sol.isValid("]"))
        self.assertFalse(sol.isValid("((("))
        self.assertFalse(sol.isValid(")))"))
        self.assertTrue(sol.isValid("((({[[[]]]}))())"))
        self.assertFalse(sol.isValid("((({[[[]]]}))()")) # Missing closing ')'

    def test_02_min_stack(self):
        minStack = MinStack()
        minStack.push(-2)
        minStack.push(0)
        minStack.push(-3)
        self.assertEqual(minStack.getMin(), -3)
        minStack.pop()
        self.assertEqual(minStack.top(), 0)
        self.assertEqual(minStack.getMin(), -2)

        minStack2 = MinStack()
        minStack2.push(5)
        minStack2.push(2)
        minStack2.push(8)
        minStack2.push(1)
        self.assertEqual(minStack2.getMin(), 1)
        minStack2.pop() # Pop 1
        self.assertEqual(minStack2.getMin(), 2)
        minStack2.pop() # Pop 8
        self.assertEqual(minStack2.top(), 2)
        self.assertEqual(minStack2.getMin(), 2)
        minStack2.pop() # Pop 2
        self.assertEqual(minStack2.top(), 5)
        self.assertEqual(minStack2.getMin(), 5)
        minStack2.pop() # Pop 5

        with self.assertRaises(IndexError):
            minStack2.pop()
        with self.assertRaises(IndexError):
            minStack2.top()
        with self.assertRaises(IndexError):
            minStack2.getMin()
        
        # Test with increasing sequence
        minStack3 = MinStack()
        minStack3.push(1)
        minStack3.push(2)
        minStack3.push(3)
        self.assertEqual(minStack3.getMin(), 1)
        minStack3.pop()
        self.assertEqual(minStack3.getMin(), 1)

    def test_03_queue_using_stacks(self):
        myQueue = MyQueue()
        self.assertTrue(myQueue.empty())
        myQueue.push(1)
        myQueue.push(2)
        self.assertFalse(myQueue.empty())
        self.assertEqual(myQueue.peek(), 1)
        self.assertEqual(myQueue.pop(), 1)
        self.assertEqual(myQueue.peek(), 2)
        myQueue.push(3)
        myQueue.push(4)
        self.assertEqual(myQueue.pop(), 2)
        self.assertEqual(myQueue.pop(), 3)
        self.assertEqual(myQueue.peek(), 4)
        self.assertEqual(myQueue.pop(), 4)
        self.assertTrue(myQueue.empty())

        with self.assertRaises(IndexError):
            myQueue.pop()
        with self.assertRaises(IndexError):
            myQueue.peek()
        
        # Test sequences of operations
        myQueue2 = MyQueue()
        myQueue2.push(10)
        self.assertEqual(myQueue2.pop(), 10)
        self.assertTrue(myQueue2.empty())
        myQueue2.push(20)
        myQueue2.push(30)
        myQueue2.push(40)
        self.assertEqual(myQueue2.peek(), 20)
        self.assertEqual(myQueue2.pop(), 20)
        self.assertEqual(myQueue2.pop(), 30)
        myQueue2.push(50)
        self.assertEqual(myQueue2.peek(), 40)
        self.assertEqual(myQueue2.pop(), 40)
        self.assertEqual(myQueue2.pop(), 50)
        self.assertTrue(myQueue2.empty())


    def test_04_sliding_window_maximum(self):
        sol = SlidingWindowMaximumSolution()
        self.assertEqual(sol.maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7])
        self.assertEqual(sol.maxSlidingWindow([1], 1), [1])
        self.assertEqual(sol.maxSlidingWindow([1, -1], 1), [1, -1])
        self.assertEqual(sol.maxSlidingWindow([7, 2, 4], 2), [7, 4])
        self.assertEqual(sol.maxSlidingWindow([9,11,12,7,10,6], 3), [12,12,12,10])
        self.assertEqual(sol.maxSlidingWindow([4,-2], 2), [4])
        self.assertEqual(sol.maxSlidingWindow([1,3,1,2,0,5], 3), [3,3,2,5])
        self.assertEqual(sol.maxSlidingWindow([-7,-8,7,5,7,1,6,0], 4), [7,7,7,7,6])
        self.assertEqual(sol.maxSlidingWindow([1,2,3,4,5], 5), [5])
        self.assertEqual(sol.maxSlidingWindow([5,4,3,2,1], 5), [5])

    def test_05_rotten_oranges(self):
        sol = RottenOrangesSolution()
        self.assertEqual(sol.orangesRotting([[2,1,1],[1,1,0],[0,1,1]]), 4)
        self.assertEqual(sol.orangesRotting([[2,1,1],[0,1,1],[1,0,1]]), -1)
        self.assertEqual(sol.orangesRotting([[0,2]]), 0)
        self.assertEqual(sol.orangesRotting([[0]]), 0)
        self.assertEqual(sol.orangesRotting([[1]]), -1)
        self.assertEqual(sol.orangesRotting([[2,2,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]), 4)
        self.assertEqual(sol.orangesRotting([[1,1,1],[1,1,1],[1,1,2]]), 4)
        self.assertEqual(sol.orangesRotting([[2,1,1],[1,1,1],[0,1,2]]), 2) # A case to manually trace:
        # Initial:
        # [2,1,1]
        # [1,1,1]
        # [0,1,2]
        # Queue: [(0,0), (2,2)], Fresh: 6

        # Min 1:
        # Rotten: (0,0) -> (0,1), (1,0)
        # Rotten: (2,2) -> (1,2), (2,1)
        # Grid:
        # [2,2,1]
        # [2,1,2]
        # [0,2,2]
        # Queue: [(0,1), (1,0), (1,2), (2,1)], Fresh: 2 (at (0,2), (1,1))

        # Min 2:
        # Rotten from (0,1) -> (0,2)
        # Rotten from (1,0) -> (1,1) (already rotten by (2,1)) - NO, it makes (1,1) rot
        # Rotten from (1,2) -> no new (0,2) and (1,1) already processed
        # Rotten from (2,1) -> (1,1)
        # Grid:
        # [2,2,2]
        # [2,2,2]
        # [0,2,2]
        # Queue: (0,2), (1,1) (or similar order depending on queue order) Fresh: 0
        # Result: 2

        self.assertEqual(sol.orangesRotting([[0,0,0],[0,0,0],[0,0,0]]), 0) # Empty grid conceptually
        self.assertEqual(sol.orangesRotting([[1,1,1],[1,0,1],[1,1,1]]), -1) # Middle orange empty, impossible to rot
        self.assertEqual(sol.orangesRotting([[2]]), 0) # Single rotten orange

if __name__ == '__main__':
    unittest.main()