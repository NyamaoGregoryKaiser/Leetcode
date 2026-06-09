import unittest
from main_algorithms.problem2_min_stack import MinStack, MinStackAuxiliaryStack

class TestMinStack(unittest.TestCase):

    def run_min_stack_tests(self, min_stack_class):
        ms = min_stack_class()
        ms.push(-2)
        ms.push(0)
        ms.push(-3)
        self.assertEqual(ms.getMin(), -3)
        self.assertEqual(ms.top(), 0) # Top before pop is 0 (from -3, 0, -2)
        ms.pop() # Pop -3
        self.assertEqual(ms.top(), 0) # Top is now 0
        self.assertEqual(ms.getMin(), -2) # Min is now -2

        ms.push(-4)
        ms.push(10)
        ms.push(-5)
        self.assertEqual(ms.getMin(), -5)
        self.assertEqual(ms.top(), -5)
        ms.pop() # Pop -5
        self.assertEqual(ms.getMin(), -4) # Min is now -4

        # Test with empty operations
        ms_empty = min_stack_class()
        with self.assertRaises(IndexError):
            ms_empty.pop()
        with self.assertRaises(IndexError):
            ms_empty.top()
        with self.assertRaises(IndexError):
            ms_empty.getMin()

        # Test sequence with specific values
        ms_seq = min_stack_class()
        ms_seq.push(5)
        self.assertEqual(ms_seq.getMin(), 5)
        ms_seq.push(2)
        self.assertEqual(ms_seq.getMin(), 2)
        ms_seq.push(4)
        self.assertEqual(ms_seq.getMin(), 2)
        ms_seq.push(1)
        self.assertEqual(ms_seq.getMin(), 1)
        ms_seq.push(3)
        self.assertEqual(ms_seq.getMin(), 1)
        ms_seq.pop() # pop 3
        self.assertEqual(ms_seq.top(), 1)
        self.assertEqual(ms_seq.getMin(), 1)
        ms_seq.pop() # pop 1
        self.assertEqual(ms_seq.top(), 4)
        self.assertEqual(ms_seq.getMin(), 2)
        ms_seq.pop() # pop 4
        self.assertEqual(ms_seq.top(), 2)
        self.assertEqual(ms_seq.getMin(), 2)
        ms_seq.pop() # pop 2
        self.assertEqual(ms_seq.top(), 5)
        self.assertEqual(ms_seq.getMin(), 5)
        ms_seq.pop() # pop 5
        with self.assertRaises(IndexError):
            ms_seq.pop()

        # Test duplicates
        ms_dup = min_stack_class()
        ms_dup.push(5)
        ms_dup.push(5)
        ms_dup.push(3)
        self.assertEqual(ms_dup.getMin(), 3)
        ms_dup.pop() # pop 3
        self.assertEqual(ms_dup.getMin(), 5)
        ms_dup.pop() # pop 5
        self.assertEqual(ms_dup.getMin(), 5)
        ms_dup.pop() # pop 5
        with self.assertRaises(IndexError):
            ms_dup.getMin()
        
        # Test large values
        ms_large = min_stack_class()
        ms_large.push(10**9)
        ms_large.push(10**5)
        ms_large.push(10**9 + 7)
        self.assertEqual(ms_large.getMin(), 10**5)
        ms_large.pop()
        self.assertEqual(ms_large.getMin(), 10**5)

    def test_min_stack_tuple_storage(self):
        print("\nRunning tests for MinStack (Tuple Storage)...")
        self.run_min_stack_tests(MinStack)

    def test_min_stack_auxiliary_stack(self):
        print("\nRunning tests for MinStackAuxiliaryStack...")
        self.run_min_stack_tests(MinStackAuxiliaryStack)


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)