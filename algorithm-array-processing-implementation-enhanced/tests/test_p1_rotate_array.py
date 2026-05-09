import unittest
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p1_rotate_array import (
    rotate_array_brute_force,
    rotate_array_extra_space,
    rotate_array_reverse,
    rotate_array_cyclic_replacements
)

class TestRotateArray(unittest.TestCase):

    def setUp(self):
        # List of functions to test. Each function takes (nums, k) and modifies nums in-place.
        self.rotate_functions = [
            rotate_array_brute_force,
            rotate_array_extra_space,
            rotate_array_reverse,
            rotate_array_cyclic_replacements
        ]

    def _test_single_case(self, func, initial_arr, k, expected_arr):
        arr_copy = list(initial_arr) # Ensure each function gets a fresh copy
        func(arr_copy, k)
        self.assertEqual(arr_copy, expected_arr, 
                         f"Function: {func.__name__}, Input: {initial_arr}, k: {k}")

    def test_basic_rotation(self):
        test_cases = [
            ([1, 2, 3, 4, 5, 6, 7], 3, [5, 6, 7, 1, 2, 3, 4]),
            ([-1, -100, 3, 99], 2, [3, 99, -1, -100]),
        ]
        for func in self.rotate_functions:
            for initial, k, expected in test_cases:
                self._test_single_case(func, initial, k, expected)

    def test_k_greater_than_n(self):
        test_cases = [
            ([1, 2], 3, [2, 1]), # k = 3 % 2 = 1 rotation
            ([1, 2, 3], 4, [3, 1, 2]), # k = 4 % 3 = 1 rotation
            ([1, 2, 3, 4, 5], 7, [4, 5, 1, 2, 3]), # k = 7 % 5 = 2 rotations
        ]
        for func in self.rotate_functions:
            for initial, k, expected in test_cases:
                self._test_single_case(func, initial, k, expected)

    def test_k_equals_n_or_multiple_of_n(self):
        test_cases = [
            ([1, 2, 3], 3, [1, 2, 3]), # k = 3 % 3 = 0 rotation
            ([1, 2, 3, 4], 0, [1, 2, 3, 4]),
            ([1, 2, 3, 4], 4, [1, 2, 3, 4]), # k = 4 % 4 = 0 rotation
            ([1, 2, 3, 4, 5], 10, [1, 2, 3, 4, 5]), # k = 10 % 5 = 0 rotation
        ]
        for func in self.rotate_functions:
            for initial, k, expected in test_cases:
                self._test_single_case(func, initial, k, expected)

    def test_empty_array(self):
        test_cases = [
            ([], 1, []),
            ([], 5, []),
            ([], 0, []),
        ]
        for func in self.rotate_functions:
            for initial, k, expected in test_cases:
                self._test_single_case(func, initial, k, expected)

    def test_single_element_array(self):
        test_cases = [
            ([1], 1, [1]),
            ([1], 5, [1]),
            ([1], 0, [1]),
        ]
        for func in self.rotate_functions:
            for initial, k, expected in test_cases:
                self._test_single_case(func, initial, k, expected)

    def test_array_with_duplicates(self):
        test_cases = [
            ([1, 1, 1], 1, [1, 1, 1]),
            ([1, 2, 1, 2], 1, [2, 1, 2, 1]),
            ([0, 0, 0, 0, 0], 2, [0, 0, 0, 0, 0]),
        ]
        for func in self.rotate_functions:
            for initial, k, expected in test_cases:
                self._test_single_case(func, initial, k, expected)
                
    def test_large_array_small_k(self):
        large_arr = list(range(1000))
        k = 1
        expected = [999] + list(range(999))
        for func in self.rotate_functions:
            self._test_single_case(func, large_arr, k, expected)

    def test_large_array_large_k(self):
        large_arr = list(range(1000))
        k = 999 # Equivalent to rotating by 1 to the left, or (1000-1) to the right
        expected = [1] + list(range(2, 1000)) + [0] # [1, 2, ..., 999, 0]
        for func in self.rotate_functions:
            self._test_single_case(func, large_arr, k, expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)