import unittest
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p2_max_subarray_sum import (
    max_subarray_brute_force,
    max_subarray_dp_kadane
)

class TestMaxSubarraySum(unittest.TestCase):

    def setUp(self):
        self.max_subarray_functions = [
            max_subarray_brute_force,
            max_subarray_dp_kadane
        ]

    def _test_single_case(self, func, arr, expected_sum):
        result_sum = func(arr)
        self.assertEqual(result_sum, expected_sum, 
                         f"Function: {func.__name__}, Input: {arr}, Expected: {expected_sum}, Got: {result_sum}")

    def test_basic_cases(self):
        test_cases = [
            ([-2, 1, -3, 4, -1, 2, 1, -5, 4], 6), # Standard example
            ([1], 1),
            ([5, 4, -1, 7, 8], 23),
            ([0], 0),
            ([1, 2, 3, 4, 5], 15), # All positive
            ([-1, -2, -3, -4, -5], -1), # All negative, pick largest single element
        ]
        for func in self.max_subarray_functions:
            for arr, expected in test_cases:
                self._test_single_case(func, list(arr), expected) # Pass copy as some algorithms might mutate (though not these)

    def test_mixed_pos_neg(self):
        test_cases = [
            ([1, -2, 3, -1, 2], 4), # [3, -1, 2]
            ([-2, -3, 4, -1, -2, 1, 5, -3], 7), # [4, -1, -2, 1, 5]
            ([-1, 2, 3, -4, 5, -6], 5), # [5]
        ]
        for func in self.max_subarray_functions:
            for arr, expected in test_cases:
                self._test_single_case(func, list(arr), expected)

    def test_edge_cases(self):
        # Problem constraints usually say array has at least one number
        # If allowed empty:
        # self.assertRaises(ValueError, lambda: func([])) 

        # Single element
        self._test_single_case(max_subarray_brute_force, [7], 7)
        self._test_single_case(max_subarray_dp_kadane, [7], 7)
        self._test_single_case(max_subarray_brute_force, [-7], -7)
        self._test_single_case(max_subarray_dp_kadane, [-7], -7)

        # All zeros
        self._test_single_case(max_subarray_brute_force, [0, 0, 0], 0)
        self._test_single_case(max_subarray_dp_kadane, [0, 0, 0], 0)

    def test_large_array(self):
        large_arr_pos = list(range(1, 1001)) # [1, 2, ..., 1000]
        expected_pos = sum(large_arr_pos) # Sum of all elements
        
        large_arr_neg = [-i for i in range(1, 1001)] # [-1, -2, ..., -1000]
        expected_neg = -1 # Largest single element

        large_arr_mixed = [i if i % 2 == 0 else -i for i in range(1, 1001)] # [ -1, 2, -3, 4, ... ]
        # For mixed, Kadane's is needed to find the actual max
        # [-1, 2, -3, 4, -5, 6, ..., 998, -999, 1000]
        # max subarray would be [500, ..., 1000] if negative values were smaller,
        # here it might be 1000 itself, or a subsequence ending in 1000.
        # Running Kadane on it to get expected:
        # Expected for [ -1, 2, -3, 4, -5, 6, -7, 8, ... 1000] is 1000 (just [1000])
        # If it was [1, -1, 2, -2, 3, -3, ..., 500], then 500
        # For the given pattern, [-1, 2, -3, 4, ... 998, -999, 1000]
        # The positive runs are always better than negative starts.
        # current_max = max(nums[i], current_max + nums[i])
        # if current_max is (say, -1), then max(nums[i], -1 + nums[i]) -> max(-1, -1-1) = -1. For 2 it becomes max(2, -1+2) = 2.
        # For [-1, 2, -3, 4]
        # i=0: cur=-1, glob=-1
        # i=1 (2): cur=max(2, -1+2)=2, glob=max(-1,2)=2
        # i=2 (-3): cur=max(-3, 2-3)=-1, glob=max(2,-1)=2
        # i=3 (4): cur=max(4, -1+4)=4, glob=max(2,4)=4
        # The current implementation of mixed array actually results in 1000 for the final element
        # It should actually be `500` if the array was generated `[1,-2,3,-4...,999,-1000]` then last element is `-1000`
        # Let's use a simpler pattern for large mixed to get a predictable result for brute force also
        large_arr_mixed_predictable = [1, -1, 1, -1, 1, -1, 100, -1, 101, -1, 102] + [-1] * 989
        expected_mixed = 102 # [102] subarray

        for func in self.max_subarray_functions:
            self._test_single_case(func, list(large_arr_pos), expected_pos)
            self._test_single_case(func, list(large_arr_neg), expected_neg)
            self._test_single_case(func, list(large_arr_mixed_predictable), expected_mixed)


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)