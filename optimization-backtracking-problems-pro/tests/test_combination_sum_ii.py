# tests/test_combination_sum_ii.py

import unittest
from src.backtracking_problems import BacktrackingSolutions
from src.utils import compare_list_of_lists

class TestCombinationSumII(unittest.TestCase):
    def setUp(self):
        self.solver = BacktrackingSolutions()

    def test_example_case(self):
        candidates = [10, 1, 2, 7, 6, 1, 5]
        target = 8
        expected = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_no_solution(self):
        candidates = [2, 3, 6, 7]
        target = 1
        expected = []
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_single_combination(self):
        candidates = [1, 2, 3]
        target = 3
        expected = [[3]]
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_multiple_uses_of_same_value_but_unique_indices(self):
        candidates = [2, 5, 2, 1, 2]
        target = 5
        # Sorted candidates: [1, 2, 2, 2, 5]
        expected = [[1, 2, 2], [5]]
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_large_target_with_small_numbers(self):
        candidates = [1, 1, 1, 1, 1, 1]
        target = 3
        expected = [[1, 1, 1]]
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_target_larger_than_sum_of_all_candidates(self):
        candidates = [1, 2, 3]
        target = 10
        expected = []
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_all_candidates_used(self):
        candidates = [1, 2, 3]
        target = 6
        expected = [[1, 2, 3]]
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_candidates_with_zero_target(self):
        candidates = [1, 2, 3]
        target = 0
        expected = [[]] # An empty combination sums to 0
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

    def test_duplicate_candidates_with_no_duplicate_target(self):
        candidates = [1, 1, 2, 3, 3]
        target = 4
        # Expected from [1,1,2,3,3] target 4:
        # 1 + 3 (from 1st 1 and 1st 3) -> [1,3]
        # 1 + 3 (from 1st 1 and 2nd 3) -> duplicate [1,3]
        # 1 + 3 (from 2nd 1 and 1st 3) -> duplicate [1,3]
        # 1 + 3 (from 2nd 1 and 2nd 3) -> duplicate [1,3]
        # 1 + 1 + 2 -> [1,1,2]
        # So only [[1,3], [1,1,2]]
        expected = [[1, 3], [1, 1, 2]]
        result = self.solver.combination_sum_ii(candidates, target)
        self.assertTrue(compare_list_of_lists(expected, result))

if __name__ == '__main__':
    unittest.main()