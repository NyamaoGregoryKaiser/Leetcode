import unittest
from src.subsets import find_subsets, find_subsets_alternative_approach

class TestSubsets(unittest.TestCase):

    def _normalize_subsets(self, list_of_subsets):
        """Helper to sort each subset and the list of subsets for consistent comparison."""
        return sorted([sorted(subset) for subset in list_of_subsets])

    def test_empty_list(self):
        self.assertEqual(self._normalize_subsets(find_subsets([])), self._normalize_subsets([[]]))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach([])), self._normalize_subsets([[]]))

    def test_single_element(self):
        self.assertEqual(self._normalize_subsets(find_subsets([1])), self._normalize_subsets([[], [1]]))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach([1])), self._normalize_subsets([[], [1]]))

    def test_two_elements(self):
        expected = [[], [1], [2], [1, 2]]
        self.assertEqual(self._normalize_subsets(find_subsets([1, 2])), self._normalize_subsets(expected))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach([1, 2])), self._normalize_subsets(expected))

    def test_three_elements(self):
        nums = [1, 2, 3]
        expected = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
        self.assertEqual(self._normalize_subsets(find_subsets(nums)), self._normalize_subsets(expected))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach(nums)), self._normalize_subsets(expected))

    def test_larger_set(self):
        nums = [4, 5, 6, 7]
        expected = [
            [], [4], [5], [6], [7],
            [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7],
            [4, 5, 6], [4, 5, 7], [4, 6, 7], [5, 6, 7],
            [4, 5, 6, 7]
        ]
        self.assertEqual(self._normalize_subsets(find_subsets(nums)), self._normalize_subsets(expected))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach(nums)), self._normalize_subsets(expected))

    def test_elements_with_zero(self):
        nums = [0, 1]
        expected = [[], [0], [1], [0, 1]]
        self.assertEqual(self._normalize_subsets(find_subsets(nums)), self._normalize_subsets(expected))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach(nums)), self._normalize_subsets(expected))

    def test_negative_elements(self):
        nums = [-1, 0, 1]
        expected = [[], [-1], [0], [1], [-1, 0], [-1, 1], [0, 1], [-1, 0, 1]]
        self.assertEqual(self._normalize_subsets(find_subsets(nums)), self._normalize_subsets(expected))
        self.assertEqual(self._normalize_subsets(find_subsets_alternative_approach(nums)), self._normalize_subsets(expected))

    def test_all_numbers_of_nums_are_unique_constraint(self):
        # This problem explicitly states unique elements, so no need to test duplicates in input
        pass

if __name__ == '__main__':
    unittest.main()