import unittest
from src.combination_sum_ii import combination_sum_ii

class TestCombinationSumII(unittest.TestCase):

    def _normalize_combinations(self, list_of_combinations):
        """Helper to sort each combination and the list of combinations for consistent comparison."""
        return sorted([sorted(combo) for combo in list_of_combinations])

    def test_example_one(self):
        candidates = [10, 1, 2, 7, 6, 1, 5]
        target = 8
        expected = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_example_two(self):
        candidates = [2, 5, 2, 1, 2]
        target = 5
        expected = [[1, 2, 2], [5]]
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_no_combination_possible(self):
        candidates = [1, 2, 3]
        target = 7
        expected = []
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_single_element_target_match(self):
        candidates = [1]
        target = 1
        expected = [[1]]
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_single_element_target_no_match(self):
        candidates = [2]
        target = 1
        expected = []
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_empty_candidates_target_zero(self):
        candidates = []
        target = 0
        expected = [[]] # An empty combination sums to 0
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_empty_candidates_target_non_zero(self):
        candidates = []
        target = 5
        expected = []
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_all_ones_target_multiple(self):
        candidates = [1, 1, 1, 1]
        target = 2
        expected = [[1, 1]] # Only one unique combination of two 1s
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_larger_set_with_duplicates(self):
        candidates = [1, 1, 2, 3, 4, 5, 6, 7]
        target = 8
        expected = [
            [1, 1, 6],
            [1, 2, 5],
            [1, 3, 4],
            [1, 7],
            [2, 6],
            [3, 5],
        ]
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_target_larger_than_any_sum(self):
        candidates = [1, 2, 3]
        target = 10
        expected = []
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_target_equal_to_single_candidate(self):
        candidates = [3, 4, 5]
        target = 4
        expected = [[4]]
        self.assertEqual(self._normalize_combinations(combination_sum_ii(candidates, target)),
                         self._normalize_combinations(expected))

    def test_target_with_zero_candidate(self):
        # Problem constraints state 1 <= candidates[i], so no zero candidates.
        # But if they were allowed:
        # candidates = [0, 1, 2], target = 1
        # expected = [[0, 1], [1]] -> this would be tricky depending on how zeros are handled for "unique" combinations
        pass

if __name__ == '__main__':
    unittest.main()