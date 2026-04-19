import unittest
import sys
import os

# Add the project root to the sys.path to allow imports from 'algorithms'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from algorithms.fibonacci import fib_recursive, fib_memo, fib_tabulation, fib_space_optimized

class TestFibonacci(unittest.TestCase):

    def test_fib_recursive(self):
        # Test cases for the recursive (brute force) solution
        self.assertEqual(fib_recursive(0), 0)
        self.assertEqual(fib_recursive(1), 1)
        self.assertEqual(fib_recursive(2), 1)
        self.assertEqual(fib_recursive(3), 2)
        self.assertEqual(fib_recursive(5), 5)
        self.assertEqual(fib_recursive(10), 55)
        self.assertEqual(fib_recursive(20), 6765)
        
        # Test with a value that would be slow for larger N, but still manageable for test
        self.assertEqual(fib_recursive(30), 832040)

        # Test edge cases
        with self.assertRaises(ValueError):
            fib_recursive(-1)

    def test_fib_memo(self):
        # Test cases for the memoization (top-down DP) solution
        self.assertEqual(fib_memo(0), 0)
        self.assertEqual(fib_memo(1), 1)
        self.assertEqual(fib_memo(2), 1)
        self.assertEqual(fib_memo(3), 2)
        self.assertEqual(fib_memo(5), 5)
        self.assertEqual(fib_memo(10), 55)
        self.assertEqual(fib_memo(20), 6765)
        self.assertEqual(fib_memo(30), 832040)
        self.assertEqual(fib_memo(50), 12586269025)

        # Test with an empty memo dict explicitly
        self.assertEqual(fib_memo(7, {}), 13)

        # Test edge cases
        with self.assertRaises(ValueError):
            fib_memo(-1)

    def test_fib_tabulation(self):
        # Test cases for the tabulation (bottom-up DP) solution
        self.assertEqual(fib_tabulation(0), 0)
        self.assertEqual(fib_tabulation(1), 1)
        self.assertEqual(fib_tabulation(2), 1)
        self.assertEqual(fib_tabulation(3), 2)
        self.assertEqual(fib_tabulation(5), 5)
        self.assertEqual(fib_tabulation(10), 55)
        self.assertEqual(fib_tabulation(20), 6765)
        self.assertEqual(fib_tabulation(30), 832040)
        self.assertEqual(fib_tabulation(50), 12586269025)
        self.assertEqual(fib_tabulation(100), 354224848179261915075)

        # Test edge cases
        with self.assertRaises(ValueError):
            fib_tabulation(-1)

    def test_fib_space_optimized(self):
        # Test cases for the space-optimized solution
        self.assertEqual(fib_space_optimized(0), 0)
        self.assertEqual(fib_space_optimized(1), 1)
        self.assertEqual(fib_space_optimized(2), 1)
        self.assertEqual(fib_space_optimized(3), 2)
        self.assertEqual(fib_space_optimized(5), 5)
        self.assertEqual(fib_space_optimized(10), 55)
        self.assertEqual(fib_space_optimized(20), 6765)
        self.assertEqual(fib_space_optimized(30), 832040)
        self.assertEqual(fib_space_optimized(50), 12586269025)
        self.assertEqual(fib_space_optimized(100), 354224848179261915075)

        # Test edge cases
        with self.assertRaises(ValueError):
            fib_space_optimized(-1)

    def test_large_inputs_consistency(self):
        # Ensure all optimized methods produce the same result for large N
        n_large = 90
        memo_res = fib_memo(n_large)
        tab_res = fib_tabulation(n_large)
        space_opt_res = fib_space_optimized(n_large)

        self.assertEqual(memo_res, tab_res)
        self.assertEqual(tab_res, space_opt_res)
        # Expected value for fib(90) (from external calculation)
        self.assertEqual(memo_res, 2880067194370816120)

if __name__ == '__main__':
    unittest.main()