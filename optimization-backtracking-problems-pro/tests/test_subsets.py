# tests/test_subsets.py

import unittest
from src.backtracking_problems import BacktrackingSolutions
from src.utils import compare_list_of_lists

class TestSubsets(unittest.TestCase):
    def setUp(self):
        self.solver = BacktrackingSolutions()

    def test_empty_list(self):
        nums = []
        expected = [[]]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_single_element(self):
        nums = [1]
        expected = [[], [1]]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_two_elements(self):
        nums = [1, 2]
        expected = [[], [1], [2], [1, 2]]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_three_elements(self):
        nums = [1, 2, 3]
        expected = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_elements_out_of_order_input(self):
        # The algorithm itself handles order-independent input for unique elements
        # The output order may differ, but the sets should be the same.
        nums = [3, 1, 2]
        expected = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_negative_numbers(self):
        nums = [-1, 0, 1]
        expected = [[], [-1], [0], [1], [-1, 0], [-1, 1], [0, 1], [-1, 0, 1]]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_larger_set(self):
        nums = [1, 2, 3, 4]
        # 2^4 = 16 subsets
        expected = [
            [], [1], [2], [3], [4],
            [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4],
            [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4],
            [1, 2, 3, 4]
        ]
        result = self.solver.subsets(nums)
        self.assertTrue(compare_list_of_lists(expected, result))
        self.assertEqual(len(result), 16) # Sanity check for count

if __name__ == '__main__':
    unittest.main()