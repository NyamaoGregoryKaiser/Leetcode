import unittest
from sorting_problems.merge_intervals import merge_intervals_optimal

class TestMergeIntervals(unittest.TestCase):

    def test_no_overlap(self):
        intervals = [[1, 2], [3, 4], [5, 6]]
        expected = [[1, 2], [3, 4], [5, 6]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_full_overlap(self):
        intervals = [[1, 5], [2, 3]]
        expected = [[1, 5]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_partial_overlap(self):
        intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
        expected = [[1, 6], [8, 10], [15, 18]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_touching_intervals(self):
        intervals = [[1, 4], [4, 5]]
        expected = [[1, 5]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_intervals_requiring_multiple_merges(self):
        intervals = [[1, 4], [0, 4]]
        expected = [[0, 4]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

        intervals = [[1, 4], [0, 1]]
        expected = [[0, 4]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

        intervals = [[0, 1], [1, 2], [2, 3], [3, 4]]
        expected = [[0, 4]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)
        
        intervals = [[0, 10], [1, 5], [2, 3], [7, 8]]
        expected = [[0, 10]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_unsorted_intervals(self):
        intervals = [[8, 10], [1, 3], [15, 18], [2, 6]]
        expected = [[1, 6], [8, 10], [15, 18]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

        intervals = [[1, 4], [0, 0], [4, 5]]
        expected = [[0, 0], [1, 5]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_empty_input(self):
        self.assertEqual(merge_intervals_optimal([]), [])

    def test_single_interval(self):
        self.assertEqual(merge_intervals_optimal([[1, 5]]), [[1, 5]])

    def test_negative_numbers(self):
        intervals = [[-5, -1], [-2, 0]]
        expected = [[-5, 0]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

        intervals = [[-10, -5], [-4, 0], [1, 5], [6, 10]]
        expected = [[-10, 0], [1, 5], [6, 10]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

    def test_large_numbers(self):
        intervals = [[100000000, 200000000], [150000000, 250000000]]
        expected = [[100000000, 250000000]]
        self.assertEqual(merge_intervals_optimal(intervals), expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)