import unittest
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p4_two_sum_variations import (
    two_sum_hash_map,
    two_sum_two_pointers_sorted,
    three_sum,
    four_sum
)

class TestTwoSumVariations(unittest.TestCase):

    # --- Two Sum (Hash Map) ---
    def test_two_sum_hash_map_basic(self):
        self.assertCountEqual(two_sum_hash_map([2, 7, 11, 15], 9), [0, 1])
        self.assertCountEqual(two_sum_hash_map([3, 2, 4], 6), [1, 2])
        self.assertCountEqual(two_sum_hash_map([3, 3], 6), [0, 1])

    def test_two_sum_hash_map_negative_numbers(self):
        self.assertCountEqual(two_sum_hash_map([-1, -2, -3, -4, -5], -8), [2, 4])
        self.assertCountEqual(two_sum_hash_map([-1, 0, 1], 0), [0, 2])

    def test_two_sum_hash_map_no_solution(self):
        self.assertEqual(two_sum_hash_map([1, 2, 3], 7), [])
        self.assertEqual(two_sum_hash_map([], 0), [])
        self.assertEqual(two_sum_hash_map([5], 5), [])

    # --- Two Sum (Two Pointers - returning values) ---
    def test_two_sum_two_pointers_sorted_basic(self):
        self.assertCountEqual(two_sum_two_pointers_sorted([2, 7, 11, 15], 9), [2, 7])
        self.assertCountEqual(two_sum_two_pointers_sorted([3, 2, 4], 6), [2, 4]) # original array sorted to [2,3,4]
        self.assertCountEqual(two_sum_two_pointers_sorted([3, 3], 6), [3, 3])

    def test_two_sum_two_pointers_sorted_negative_numbers(self):
        self.assertCountEqual(two_sum_two_pointers_sorted([-1, -2, -3, -4, -5], -8), [-3, -5])
        self.assertCountEqual(two_sum_two_pointers_sorted([-1, 0, 1], 0), [-1, 1])

    def test_two_sum_two_pointers_sorted_no_solution(self):
        self.assertEqual(two_sum_two_pointers_sorted([1, 2, 3], 7), [])
        self.assertEqual(two_sum_two_pointers_sorted([], 0), [])
        self.assertEqual(two_sum_two_pointers_sorted([5], 5), [])

    # --- Three Sum ---
    def assertTripletsEqual(self, actual, expected):
        """Helper to compare lists of triplets, ignoring order of triplets and order within triplet."""
        self.assertEqual(len(actual), len(expected), f"Expected {len(expected)} triplets, got {len(actual)}")
        actual_sorted = sorted([sorted(t) for t in actual])
        expected_sorted = sorted([sorted(t) for t in expected])
        self.assertEqual(actual_sorted, expected_sorted)

    def test_three_sum_basic(self):
        nums = [-1, 0, 1, 2, -1, -4]
        expected = [[-1, -1, 2], [-1, 0, 1]]
        self.assertTripletsEqual(three_sum(nums), expected)

    def test_three_sum_zeros(self):
        nums = [0, 0, 0]
        expected = [[0, 0, 0]]
        self.assertTripletsEqual(three_sum(nums), expected)

        nums_four_zeros = [0, 0, 0, 0]
        expected_four_zeros = [[0, 0, 0]]
        self.assertTripletsEqual(three_sum(nums_four_zeros), expected_four_zeros)

    def test_three_sum_no_solution(self):
        nums = [1, 2, 3]
        expected = []
        self.assertTripletsEqual(three_sum(nums), expected)

    def test_three_sum_empty(self):
        nums = []
        expected = []
        self.assertTripletsEqual(three_sum(nums), expected)

    def test_three_sum_less_than_three_elements(self):
        nums = [1, 2]
        expected = []
        self.assertTripletsEqual(three_sum(nums), expected)

    def test_three_sum_duplicates_and_negatives(self):
        nums = [-2, 0, 0, 2, 2]
        expected = [[-2, 0, 2]]
        self.assertTripletsEqual(three_sum(nums), expected)
        
        nums_complex = [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6] # Target 0
        expected_complex = [[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]
        self.assertTripletsEqual(three_sum(nums_complex), expected_complex)

    # --- Four Sum ---
    def assertQuadrupletsEqual(self, actual, expected):
        """Helper to compare lists of quadruplets, ignoring order of quadruplets and order within quadruplet."""
        self.assertEqual(len(actual), len(expected), f"Expected {len(expected)} quadruplets, got {len(actual)}")
        actual_sorted = sorted([sorted(t) for t in actual])
        expected_sorted = sorted([sorted(t) for t in expected])
        self.assertEqual(actual_sorted, expected_sorted)

    def test_four_sum_basic(self):
        nums = [1, 0, -1, 0, -2, 2]
        target = 0
        expected = [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

    def test_four_sum_target_other_than_zero(self):
        nums = [2, 2, 2, 2, 2]
        target = 8
        expected = [[2, 2, 2, 2]]
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

        nums = [1, 2, 3, 4, 5, 6]
        target = 10
        expected = [[1, 2, 3, 4]]
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

    def test_four_sum_no_solution(self):
        nums = [1, 2, 3, 4]
        target = 100
        expected = []
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

    def test_four_sum_empty(self):
        nums = []
        target = 0
        expected = []
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

    def test_four_sum_less_than_four_elements(self):
        nums = [1, 2, 3]
        target = 6
        expected = []
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

    def test_four_sum_duplicates(self):
        nums = [0, 0, 0, 0, 0, 0]
        target = 0
        expected = [[0, 0, 0, 0]]
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

        nums = [-3,-1,0,2,4,5]
        target = 2
        expected = [[-3,-1,2,4]]
        self.assertQuadrupletsEqual(four_sum(nums, target), expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)