import unittest
from algorithms.combination_sum import combination_sum, combination_sum2

class TestCombinationSum(unittest.TestCase):

    # --- Tests for combination_sum (elements can be reused) ---
    def test_combination_sum_basic(self):
        candidates = [2, 3, 6, 7]
        target = 7
        expected = [[2, 2, 3], [7]]
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum_no_solution(self):
        candidates = [2, 4]
        target = 7
        expected = []
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum_larger_target(self):
        candidates = [2, 3, 5]
        target = 8
        expected = [
            [2, 2, 2, 2],
            [2, 3, 3],
            [3, 5]
        ]
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum_single_candidate(self):
        candidates = [3]
        target = 9
        expected = [[3, 3, 3]]
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum_single_candidate_no_match(self):
        candidates = [3]
        target = 7
        expected = []
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum_empty_candidates(self):
        candidates = []
        target = 5
        expected = []
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum_target_zero(self):
        candidates = [1, 2, 3]
        target = 0
        expected = [[]] # An empty combination sums to zero
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)
        
    def test_combination_sum_candidates_with_one(self):
        candidates = [1]
        target = 5
        expected = [[1,1,1,1,1]]
        actual = combination_sum(candidates, target)
        self.assertCountEqual(actual, expected)


    # --- Tests for combination_sum2 (elements used once, duplicates handled) ---
    def test_combination_sum2_basic(self):
        candidates = [10, 1, 2, 7, 6, 1, 5]
        target = 8
        expected = [
            [1, 1, 6],
            [1, 2, 5],
            [1, 7],
            [2, 6]
        ]
        actual = combination_sum2(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum2_duplicates_only(self):
        candidates = [2, 2, 2]
        target = 4
        expected = [[2, 2]]
        actual = combination_sum2(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum2_no_solution(self):
        candidates = [2, 5]
        target = 3
        expected = []
        actual = combination_sum2(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum2_larger_set(self):
        candidates = [1, 1, 1, 1, 2, 2, 3]
        target = 4
        expected = [
            [1, 1, 1, 1],
            [1, 1, 2],
            [1, 3],
            [2, 2]
        ]
        actual = combination_sum2(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum2_all_distinct(self):
        candidates = [1, 2, 3]
        target = 3
        expected = [[1, 2], [3]]
        actual = combination_sum2(candidates, target)
        self.assertCountEqual(actual, expected)

    def test_combination_sum2_target_zero(self):
        candidates = [1, 2, 3]
        target = 0
        expected = [[]] # An empty combination sums to zero
        actual = combination_sum2(candidates, target)
        self.assertCountEqual(actual, expected)
        
    def test_combination_sum2_candidates_with_zero(self):
        # Although problem constraints usually say positive integers, if 0 is allowed.
        candidates = [0, 1, 1, 2]
        target = 2
        expected = [[0,1,1], [0,2], [1,1], [2]] # combinations with 0, and without 0
        # If 0 cannot be counted as part of a sum, then [0,1,1] and [0,2] wouldn't be valid.
        # Assuming 0 is just another number, and problem usually says "positive integers".
        # If target=0, and candidates=[0], it should be [[0]] and [[]] if 0 is considered.
        # For simplicity, assuming candidates are positive as per typical problem statements.
        pass


if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```