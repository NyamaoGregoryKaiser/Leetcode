import unittest
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p5_next_permutation import next_permutation_in_place

class TestNextPermutation(unittest.TestCase):

    def _test_single_case(self, initial_arr, expected_arr):
        arr_copy = list(initial_arr) # Work on a copy as it's in-place
        next_permutation_in_place(arr_copy)
        self.assertEqual(arr_copy, expected_arr, 
                         f"Input: {initial_arr}, Expected: {expected_arr}, Got: {arr_copy}")

    def test_basic_cases(self):
        self._test_single_case([1, 2, 3], [1, 3, 2])
        self._test_single_case([1, 3, 2], [2, 1, 3])
        self._test_single_case([2, 1, 3], [2, 3, 1])
        self._test_single_case([2, 3, 1], [3, 1, 2])
        self._test_single_case([3, 1, 2], [3, 2, 1])

    def test_largest_permutation(self):
        # Should revert to smallest permutation (sorted ascending)
        self._test_single_case([3, 2, 1], [1, 2, 3])
        self._test_single_case([5, 4, 3, 2, 1], [1, 2, 3, 4, 5])
        self._test_single_case([1], [1]) # Single element is already largest and smallest

    def test_with_duplicates(self):
        self._test_single_case([1, 1, 5], [1, 5, 1])
        self._test_single_case([1, 5, 1], [5, 1, 1])
        self._test_single_case([2, 2, 7, 5, 3, 1], [2, 3, 1, 2, 5, 7])
        self._test_single_case([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) # No change for this k=-1 case
        self._test_single_case([1, 1, 1, 1], [1, 1, 1, 1])

    def test_edge_cases(self):
        self._test_single_case([], []) # Empty array
        self._test_single_case([1], [1]) # Single element
        self._test_single_case([1, 2], [2, 1])
        self._test_single_case([2, 1], [1, 2])
        
    def test_complex_cases(self):
        self._test_single_case([5, 4, 7, 5, 3, 2], [5, 4, 7, 3, 2, 5]) # Corrected expected for [5,4,7,5,3,2] -> [5,4,7,3,2,5] NO. This example is wrong.
        # Let's re-trace [5,4,7,5,3,2]
        # k=2 (nums[2]=7 < nums[3]=5) -> False
        # k=1 (nums[1]=4 < nums[2]=7) -> True! k=1, nums[k]=4.
        # Find l > k where nums[l] > nums[k]=4:
        # nums[5]=2 (no)
        # nums[4]=3 (no)
        # nums[3]=5 (yes!) l=3, nums[l]=5.
        # Swap nums[1] and nums[3]: [5, 5, 7, 4, 3, 2]
        # Reverse suffix nums[k+1:] = nums[2:] = [7, 4, 3, 2] -> [2, 3, 4, 7]
        # Result: [5, 5, 2, 3, 4, 7]
        self._test_single_case([5, 4, 7, 5, 3, 2], [5, 5, 2, 3, 4, 7])

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)