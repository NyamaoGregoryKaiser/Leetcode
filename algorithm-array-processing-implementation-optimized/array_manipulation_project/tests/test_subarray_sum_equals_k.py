import unittest
from src.problems.subarray_sum_equals_k import (
    subarray_sum_brute_force,
    subarray_sum_prefix_hashmap
)

class TestSubarraySumEqualsK(unittest.TestCase):

    def setUp(self):
        # Define common test cases
        self.test_cases = [
            ([1, 1, 1], 2, 2),  # Subarrays: [1,1] (idx 0-1), [1,1] (idx 1-2)
            ([1, 2, 3], 3, 2),  # Subarrays: [1,2] (idx 0-1), [3] (idx 2-2)
            ([1, -1, 0], 0, 3), # Subarrays: [1,-1], [-1,0], [0]
            ([0, 0, 0], 0, 6),  # Subarrays: [0] x 3, [0,0] x 2, [0,0,0] x 1
            ([1], 1, 1),       # Subarray: [1]
            ([], 1, 0),        # Empty array
            ([-1, -1, 1], 0, 1), # Subarray: [-1,1]
            ([28, 54, 7, -70, 22, 65, -6], 100, 1), # Subarray: [28, 54, 7, -70, 22, 65, -6]
            ([0], 0, 1),
            ([10, 5, 2, 7, 1, 9], 15, 1), # Subarray: [5, 2, 7, 1]
            ([1, 2, 1, 2, 1], 3, 4), # Subarrays: [1,2], [2,1], [1,2], [2,1]
            ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15, 3) # [1,2,3,4,5], [4,5,6], [6,7,2]
        ]

    def _run_test_for_function(self, subarray_sum_func):
        for nums, k, expected in self.test_cases:
            with self.subTest(msg=f"Function: {subarray_sum_func.__name__}, nums: {nums}, k: {k}"):
                result = subarray_sum_func(nums, k)
                self.assertEqual(result, expected)

    def test_subarray_sum_brute_force(self):
        print("\nTesting subarray_sum_brute_force...")
        self._run_test_for_function(subarray_sum_brute_force)
        print("subarray_sum_brute_force tests passed.")

    def test_subarray_sum_prefix_hashmap(self):
        print("\nTesting subarray_sum_prefix_hashmap...")
        self._run_test_for_function(subarray_sum_prefix_hashmap)
        print("subarray_sum_prefix_hashmap tests passed.")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)