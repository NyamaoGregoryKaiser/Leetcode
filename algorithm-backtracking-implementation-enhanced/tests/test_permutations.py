import unittest
from algorithms.permutations import permute, permute_unique, permute_swap_based

class TestPermutations(unittest.TestCase):

    def test_permute_empty(self):
        self.assertEqual(permute([]), [[]])
        self.assertEqual(permute_swap_based([]), [[]])

    def test_permute_single_element(self):
        self.assertEqual(permute([1]), [[1]])
        self.assertEqual(permute_swap_based([1]), [[1]])

    def test_permute_two_elements(self):
        expected = [[1, 2], [2, 1]]
        self.assertCountEqual(permute([1, 2]), expected)
        self.assertCountEqual(permute_swap_based([1, 2]), expected)

    def test_permute_three_elements(self):
        expected = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1]
        ]
        self.assertCountEqual(permute([1, 2, 3]), expected)
        self.assertCountEqual(permute_swap_based([1, 2, 3]), expected)

    def test_permute_four_elements_distinct(self):
        # Just check the count for larger inputs as actual comparison is lengthy
        nums = [1, 2, 3, 4]
        self.assertEqual(len(permute(nums)), 24) # 4! = 24
        self.assertEqual(len(permute_swap_based(nums)), 24)

    def test_permute_unique_empty(self):
        self.assertEqual(permute_unique([]), [[]])

    def test_permute_unique_single_element(self):
        self.assertEqual(permute_unique([1]), [[1]])

    def test_permute_unique_two_elements_distinct(self):
        expected = [[1, 2], [2, 1]]
        self.assertCountEqual(permute_unique([1, 2]), expected)

    def test_permute_unique_two_elements_duplicate(self):
        expected = [[1, 1]]
        self.assertCountEqual(permute_unique([1, 1]), expected)

    def test_permute_unique_three_elements_one_dup(self):
        expected = [
            [1, 1, 2], [1, 2, 1], [2, 1, 1]
        ]
        self.assertCountEqual(permute_unique([1, 1, 2]), expected)

    def test_permute_unique_three_elements_all_dup(self):
        expected = [[1, 1, 1]]
        self.assertCountEqual(permute_unique([1, 1, 1]), expected)

    def test_permute_unique_multiple_duplicates(self):
        expected = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1]
        ]
        self.assertCountEqual(permute_unique([1, 2, 3]), expected) # Should work for distinct too

        nums = [2, 2, 1, 1]
        # Unique permutations for [1,1,2,2]
        # (4! / (2! * 2!)) = 24 / (2 * 2) = 6
        expected_len = 6
        self.assertEqual(len(permute_unique(nums)), expected_len)
        # Check a specific expected subset for correctness if desired
        expected_perms_for_1122 = [
            [1, 1, 2, 2], [1, 2, 1, 2], [1, 2, 2, 1],
            [2, 1, 1, 2], [2, 1, 2, 1], [2, 2, 1, 1]
        ]
        self.assertCountEqual(permute_unique(nums), expected_perms_for_1122)

    def test_permute_unique_mixed_duplicates(self):
        nums = [3, 3, 0, 3]
        # Sorted: [0, 3, 3, 3]
        # Number of permutations: 4! / 3! = 24 / 6 = 4
        expected = [
            [0, 3, 3, 3],
            [3, 0, 3, 3],
            [3, 3, 0, 3],
            [3, 3, 3, 0]
        ]
        self.assertCountEqual(permute_unique(nums), expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```