import unittest
from main_algorithms.problem3_queue_using_stacks import MyQueue

class TestMyQueue(unittest.TestCase):

    def test_basic_operations(self):
        queue = MyQueue()
        self.assertTrue(queue.empty())

        queue.push(1)
        self.assertFalse(queue.empty())
        self.assertEqual(queue.peek(), 1)
        self.assertEqual(queue.pop(), 1)
        self.assertTrue(queue.empty())

        queue.push(2)
        self.assertEqual(queue.peek(), 2)
        self.assertEqual(queue.pop(), 2)
        self.assertTrue(queue.empty())

    def test_multiple_pushes_and_pops(self):
        queue = MyQueue()
        queue.push(1)
        queue.push(2)
        queue.push(3)

        self.assertFalse(queue.empty())
        self.assertEqual(queue.peek(), 1)
        self.assertEqual(queue.pop(), 1)

        self.assertEqual(queue.peek(), 2)
        self.assertEqual(queue.pop(), 2)

        queue.push(4)
        self.assertEqual(queue.peek(), 3)
        self.assertEqual(queue.pop(), 3)

        self.assertEqual(queue.peek(), 4)
        self.assertEqual(queue.pop(), 4)

        self.assertTrue(queue.empty())

    def test_interspersed_operations(self):
        queue = MyQueue()
        queue.push(1)
        self.assertEqual(queue.peek(), 1)
        queue.push(2)
        self.assertEqual(queue.pop(), 1)
        queue.push(3)
        self.assertEqual(queue.peek(), 2)
        self.assertEqual(queue.pop(), 2)
        self.assertEqual(queue.pop(), 3)
        self.assertTrue(queue.empty())

    def test_empty_queue_exceptions(self):
        queue = MyQueue()
        self.assertTrue(queue.empty())

        with self.assertRaises(IndexError):
            queue.pop()
        
        with self.assertRaises(IndexError):
            queue.peek()
        
        queue.push(10)
        self.assertFalse(queue.empty())
        self.assertEqual(queue.pop(), 10)
        self.assertTrue(queue.empty())

        with self.assertRaises(IndexError):
            queue.pop()
        
        with self.assertRaises(IndexError):
            queue.peek()

    def test_large_number_of_elements(self):
        queue = MyQueue()
        num_elements = 1000
        for i in range(num_elements):
            queue.push(i)
        
        for i in range(num_elements // 2):
            self.assertEqual(queue.pop(), i)
        
        for i in range(num_elements, num_elements + 500):
            queue.push(i)
        
        for i in range(num_elements // 2, num_elements + 500):
            self.assertEqual(queue.pop(), i)
        
        self.assertTrue(queue.empty())

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)