import unittest
from copy import deepcopy
from src.problems.array_rotation import (
    rotate_array_brute_force,
    rotate_array_extra_space,
    rotate_array_reversal
)

class TestArrayRotation(unittest.TestCase):

    def setUp(self):
        # Define common test cases
        self.test_cases = [
            ([1, 2, 3, 4, 5, 6, 7], 3, [5, 6, 7, 1, 2, 3, 4]),
            ([-1, -100, 3, 99], 2, [3, 99, -1, -100]),
            ([1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]), # k == N
            ([1, 2, 3, 4, 5], 0, [1, 2, 3, 4, 5]), # k == 0
            ([1, 2], 3, [2, 1]), # k > N
            ([1], 1, [1]), # Single element array
            ([], 5, []), # Empty array
            ([1, 2, 3], 4, [3, 1, 2]), # k > N, small array
            ([1, 2, 3, 4, 5], 6, [5, 1, 2, 3, 4]), # k > N, one full rotation + 1 step
            ([1, 2, 3], 2, [2, 3, 1]), # Specific case
            ([7, 8, 9, 10, 11, 12], 1, [12, 7, 8, 9, 10, 11]),
            ([1,2,3,4,5,6], 11, [2,3,4,5,6,1]) # k > N
        ]

    def _run_test_for_function(self, rotate_func):
        for original_nums, k, expected_nums in self.test_cases:
            with self.subTest(msg=f"Function: {rotate_func.__name__}, nums: {original_nums}, k: {k}"):
                # Create a deep copy because rotation functions modify in-place
                nums_copy = deepcopy(original_nums)
                rotate_func(nums_copy, k)
                self.assertEqual(nums_copy, expected_nums)

    def test_rotate_array_brute_force(self):
        print("\nTesting rotate_array_brute_force...")
        self._run_test_for_function(rotate_array_brute_force)
        print("rotate_array_brute_force tests passed.")

    def test_rotate_array_extra_space(self):
        print("\nTesting rotate_array_extra_space...")
        self._run_test_for_function(rotate_array_extra_space)
        print("rotate_array_extra_space tests passed.")

    def test_rotate_array_reversal(self):
        print("\nTesting rotate_array_reversal...")
        self._run_test_for_function(rotate_array_reversal)
        print("rotate_array_reversal tests passed.")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)