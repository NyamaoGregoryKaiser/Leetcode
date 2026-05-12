import unittest
from src.permutations import find_permutations, find_permutations_swap_approach

class TestPermutations(unittest.TestCase):

    def _normalize_permutations(self, list_of_permutations):
        """Helper to sort each permutation (lexicographically) and the list of permutations for consistent comparison."""
        # For permutations, the order of elements within a permutation matters.
        # But the order of permutations in the result list does not.
        # So we sort the outer list of permutations.
        return sorted(list_of_permutations)

    def test_empty_list(self):
        self.assertEqual(self._normalize_permutations(find_permutations([])), self._normalize_permutations([[]]))
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach([])), self._normalize_permutations([[]]))

    def test_single_element(self):
        self.assertEqual(self._normalize_permutations(find_permutations([1])), self._normalize_permutations([[1]]))
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach([1])), self._normalize_permutations([[1]]))

    def test_two_elements(self):
        nums = [1, 2]
        expected = [[1, 2], [2, 1]]
        self.assertEqual(self._normalize_permutations(find_permutations(nums)), self._normalize_permutations(expected))
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach(nums)), self._normalize_permutations(expected))

    def test_three_elements(self):
        nums = [1, 2, 3]
        expected = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
        self.assertEqual(self._normalize_permutations(find_permutations(nums)), self._normalize_permutations(expected))
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach(nums)), self._normalize_permutations(expected))

    def test_elements_with_zero(self):
        nums = [0, 1]
        expected = [[0, 1], [1, 0]]
        self.assertEqual(self._normalize_permutations(find_permutations(nums)), self._normalize_permutations(expected))
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach(nums)), self._normalize_permutations(expected))

    def test_negative_elements(self):
        nums = [-1, 0, 1]
        expected = [
            [-1, 0, 1], [-1, 1, 0],
            [0, -1, 1], [0, 1, -1],
            [1, -1, 0], [1, 0, -1]
        ]
        self.assertEqual(self._normalize_permutations(find_permutations(nums)), self._normalize_permutations(expected))
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach(nums)), self._normalize_permutations(expected))

    def test_four_elements(self):
        nums = [1, 2, 3, 4]
        # Calculate expected for N=4, which is 4! = 24 permutations
        # This is a bit long to write out, so we'll just check the count and a few examples.
        # The normalization will ensure correctness if implementation is right.
        actual = find_permutations(nums)
        self.assertEqual(len(actual), 24)
        self.assertIn([1, 2, 3, 4], actual)
        self.assertIn([4, 3, 2, 1], actual)
        self.assertIn([1, 3, 2, 4], actual)
        self.assertEqual(self._normalize_permutations(find_permutations_swap_approach(nums)), self._normalize_permutations(actual))

    def test_all_numbers_of_nums_are_unique_constraint(self):
        # This problem explicitly states distinct integers, so no need to test duplicates in input
        pass

if __name__ == '__main__':
    unittest.main()