import unittest
from algorithms.subsets import subsets, subsets_with_dup, subsets_iterative, subsets_with_dup_iterative

class TestSubsets(unittest.TestCase):

    def test_subsets_empty(self):
        self.assertEqual(subsets([]), [[]])
        self.assertEqual(subsets_iterative([]), [[]])

    def test_subsets_single_element(self):
        expected = [[], [1]]
        self.assertCountEqual(subsets([1]), expected)
        self.assertCountEqual(subsets_iterative([1]), expected)

    def test_subsets_two_elements(self):
        expected = [[], [1], [2], [1, 2]]
        self.assertCountEqual(subsets([1, 2]), expected)
        self.assertCountEqual(subsets_iterative([1, 2]), expected)

    def test_subsets_three_elements(self):
        expected = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
        self.assertCountEqual(subsets([1, 2, 3]), expected)
        self.assertCountEqual(subsets_iterative([1, 2, 3]), expected)

    def test_subsets_four_elements(self):
        nums = [4, 1, 2, 3] # Order shouldn't matter for distinct elements
        expected_len = 2**len(nums) # 2^4 = 16
        self.assertEqual(len(subsets(nums)), expected_len)
        self.assertEqual(len(subsets_iterative(nums)), expected_len)
        # Check specific subset, e.g., [1,3] must be present
        self.assertIn([1, 3], subsets(nums))
        self.assertIn([1, 3], subsets_iterative(nums))

    def test_subsets_with_dup_empty(self):
        self.assertEqual(subsets_with_dup([]), [[]])
        self.assertEqual(subsets_with_dup_iterative([]), [[]])

    def test_subsets_with_dup_single_element(self):
        expected = [[], [1]]
        self.assertCountEqual(subsets_with_dup([1]), expected)
        self.assertCountEqual(subsets_with_dup_iterative([1]), expected)

    def test_subsets_with_dup_two_elements_distinct(self):
        expected = [[], [1], [2], [1, 2]]
        self.assertCountEqual(subsets_with_dup([1, 2]), expected)
        self.assertCountEqual(subsets_with_dup_iterative([1, 2]), expected)

    def test_subsets_with_dup_two_elements_duplicate(self):
        # nums = [1, 1] -> [], [1], [1, 1]
        expected = [[], [1], [1, 1]]
        self.assertCountEqual(subsets_with_dup([1, 1]), expected)
        self.assertCountEqual(subsets_with_dup_iterative([1, 1]), expected)

    def test_subsets_with_dup_three_elements_one_dup(self):
        # nums = [1, 2, 2] -> [], [1], [2], [1, 2], [2, 2], [1, 2, 2]
        expected = [[], [1], [2], [1, 2], [2, 2], [1, 2, 2]]
        self.assertCountEqual(subsets_with_dup([1, 2, 2]), expected)
        self.assertCountEqual(subsets_with_dup_iterative([1, 2, 2]), expected)

    def test_subsets_with_dup_three_elements_all_dup(self):
        # nums = [1, 1, 1] -> [], [1], [1, 1], [1, 1, 1]
        expected = [[], [1], [1, 1], [1, 1, 1]]
        self.assertCountEqual(subsets_with_dup([1, 1, 1]), expected)
        self.assertCountEqual(subsets_with_dup_iterative([1, 1, 1]), expected)

    def test_subsets_with_dup_multiple_duplicates_complex(self):
        nums = [4, 4, 4, 1, 4]
        # Sorted: [1, 4, 4, 4, 4]
        # Expected unique subsets:
        # [], [1]
        # [4], [1,4]
        # [4,4], [1,4,4]
        # [4,4,4], [1,4,4,4]
        # [4,4,4,4], [1,4,4,4,4]
        # Total 10 unique subsets
        expected_len = 10
        self.assertEqual(len(subsets_with_dup(nums)), expected_len)
        self.assertEqual(len(subsets_with_dup_iterative(nums)), expected_len)

        # Check a specific subset, e.g., [4,4,4] must be present
        self.assertIn([4, 4, 4], subsets_with_dup(nums))
        self.assertIn([4, 4, 4], subsets_with_dup_iterative(nums))

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```