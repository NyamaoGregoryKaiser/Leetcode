# tests/test_permutations.py

import unittest
from src.backtracking_problems import BacktrackingSolutions
from src.utils import compare_list_of_lists

class TestPermutations(unittest.TestCase):
    def setUp(self):
        self.solver = BacktrackingSolutions()

    def test_empty_list(self):
        nums = []
        expected = [[]]
        result = self.solver.permutations(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_single_element(self):
        nums = [1]
        expected = [[1]]
        result = self.solver.permutations(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_two_elements(self):
        nums = [1, 2]
        expected = [[1, 2], [2, 1]]
        result = self.solver.permutations(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_three_elements(self):
        nums = [1, 2, 3]
        expected = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1]
        ]
        result = self.solver.permutations(nums)
        self.assertTrue(compare_list_of_lists(expected, result))
        self.assertEqual(len(result), 6) # Sanity check for N!

    def test_elements_out_of_order_input(self):
        nums = [3, 1, 2]
        expected = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1]
        ]
        result = self.solver.permutations(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_negative_numbers(self):
        nums = [-1, 0]
        expected = [[-1, 0], [0, -1]]
        result = self.solver.permutations(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_four_elements(self):
        nums = [1, 2, 3, 4]
        # There are 4! = 24 permutations. We'll just check the count.
        result = self.solver.permutations(nums)
        self.assertEqual(len(result), 24)

        # Quick check for uniqueness of inner lists (after sorting them for comparison)
        unique_results = []
        for p in result:
            sorted_p_tuple = tuple(p) # Tuples are hashable
            if sorted_p_tuple not in unique_results:
                unique_results.append(sorted_p_tuple)
        self.assertEqual(len(unique_results), 24) # All permutations should be unique

if __name__ == '__main__':
    unittest.main()