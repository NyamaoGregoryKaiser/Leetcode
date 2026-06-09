import unittest
from main_algorithms.problem4_sliding_window_maximum import max_sliding_window_optimal, max_sliding_window_bruteforce

class TestSlidingWindowMaximum(unittest.TestCase):

    def run_tests_for_function(self, func):
        # Basic cases
        self.assertEqual(func([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7])
        self.assertEqual(func([1], 1), [1])
        self.assertEqual(func([1, -1], 1), [1, -1])
        self.assertEqual(func([9, 11], 2), [11])
        self.assertEqual(func([4, -2], 2), [4])

        # Edge cases
        self.assertEqual(func([], 0), [])
        self.assertEqual(func([1, 2, 3], 0), [])
        self.assertEqual(func([], 1), []) # Empty nums, k > 0
        self.assertEqual(func([1,2,3,4,5], 1), [1,2,3,4,5]) # k=1
        self.assertEqual(func([1,2,3,4,5], 5), [5]) # k=N
        self.assertEqual(func([1,2,3], 4), []) # k > N

        # Decreasing sequence
        self.assertEqual(func([5, 4, 3, 2, 1], 3), [5, 4, 3])
        # Increasing sequence
        self.assertEqual(func([1, 2, 3, 4, 5], 3), [3, 4, 5])
        # Mixed
        self.assertEqual(func([1, 3, 1, 2, 0, 5], 3), [3, 3, 2, 5])
        self.assertEqual(func([-7, -8, 7, 5, 7, 1, 6, 0], 4), [7, 7, 7, 7, 6])
        self.assertEqual(func([1, 3, 1, 2, 0, 5], 2), [3, 3, 2, 2, 5])
        self.assertEqual(func([1, -9, 3, 8, 4, 0, 10], 4), [8, 8, 8, 10])

        # All same elements
        self.assertEqual(func([7, 7, 7, 7, 7], 3), [7, 7, 7])

        # Negative numbers only
        self.assertEqual(func([-1, -2, -3, -4, -5], 3), [-1, -2, -3])
        self.assertEqual(func([-5, -4, -3, -2, -1], 3), [-3, -2, -1])


    def test_optimal_solution(self):
        print("\nRunning tests for max_sliding_window_optimal...")
        self.run_tests_for_function(max_sliding_window_optimal)

    def test_brute_force_solution(self):
        print("\nRunning tests for max_sliding_window_bruteforce...")
        self.run_tests_for_function(max_sliding_window_bruteforce)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)