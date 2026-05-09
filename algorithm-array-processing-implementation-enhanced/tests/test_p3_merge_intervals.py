import unittest
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from problems.p3_merge_intervals import merge_intervals_sorted

class TestMergeIntervals(unittest.TestCase):

    def _test_single_case(self, func, intervals, expected):
        result = func(intervals)
        self.assertEqual(result, expected, 
                         f"Function: {func.__name__}, Input: {intervals}, Expected: {expected}, Got: {result}")

    def test_basic_merge(self):
        intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
        expected = [[1, 6], [8, 10], [15, 18]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_full_overlap(self):
        intervals = [[1, 10], [2, 3], [4, 5], [6, 7]]
        expected = [[1, 10]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_intervals_touching(self):
        intervals = [[1, 4], [4, 5]]
        expected = [[1, 5]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_no_overlap(self):
        intervals = [[1, 2], [3, 4], [5, 6]]
        expected = [[1, 2], [3, 4], [5, 6]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_empty_input(self):
        intervals = []
        expected = []
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_single_interval(self):
        intervals = [[1, 5]]
        expected = [[1, 5]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_intervals_out_of_order(self):
        intervals = [[8, 10], [1, 3], [15, 18], [2, 6]]
        expected = [[1, 6], [8, 10], [15, 18]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_complex_overlap(self):
        intervals = [[1, 4], [0, 4]]
        expected = [[0, 4]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

        intervals = [[0, 4], [1, 4]]
        expected = [[0, 4]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

        intervals = [[0, 0], [1, 4]]
        expected = [[0, 0], [1, 4]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

        intervals = [[1, 4], [0, 1]]
        expected = [[0, 4]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

        intervals = [[1, 4], [0, 2], [3, 5]]
        expected = [[0, 5]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_negative_numbers(self):
        intervals = [[-5, -2], [-3, 0], [1, 2]]
        expected = [[-5, 0], [1, 2]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

    def test_duplicates(self):
        intervals = [[1, 3], [1, 3], [2, 4]]
        expected = [[1, 4]]
        self._test_single_case(merge_intervals_sorted, intervals, expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)