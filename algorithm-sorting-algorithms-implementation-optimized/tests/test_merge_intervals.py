import unittest
import random
from typing import List, Tuple

from core_algorithms.merge_intervals import MergeIntervals
from utils.array_generator import ArrayGenerator # Not strictly needed here, but good practice

class TestMergeIntervals(unittest.TestCase):

    def _assert_merged_intervals(self, result: List[List[int]], expected: List[List[int]]) -> None:
        """Helper to assert that two lists of intervals are identical and sorted."""
        self.assertEqual(len(result), len(expected), f"Length mismatch. Result: {result}, Expected: {expected}")
        # Ensure each interval is a list of two ints, and they are sorted
        for r_interval, e_interval in zip(result, expected):
            self.assertEqual(len(r_interval), 2, f"Interval {r_interval} is not of length 2.")
            self.assertEqual(r_interval, e_interval, f"Interval mismatch. Result: {result}, Expected: {expected}")
            self.assertLessEqual(r_interval[0], r_interval[1], f"Interval start > end: {r_interval}")
        
        # Ensure the final result is sorted by start time and non-overlapping
        for i in range(len(result) - 1):
            self.assertLessEqual(result[i][1], result[i+1][0], f"Overlapping or unsorted intervals: {result}")


    # --- Optimal Merge Tests ---
    def test_merge_empty(self):
        intervals = []
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, [])

    def test_merge_single_interval(self):
        intervals = [[1, 5]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, [[1, 5]])

    def test_merge_no_overlap(self):
        intervals = [[1, 2], [3, 4], [5, 6]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, [[1, 2], [3, 4], [5, 6]])

    def test_merge_adjacent_overlap(self):
        intervals = [[1, 3], [3, 6], [8, 10]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, [[1, 6], [8, 10]])

    def test_merge_simple_overlap(self):
        intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, [[1, 6], [8, 10], [15, 18]])

    def test_merge_full_overlap(self):
        intervals = [[1, 10], [2, 3], [4, 5]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, [[1, 10]])

    def test_merge_reverse_order(self):
        intervals = [[15, 18], [8, 10], [2, 6], [1, 3]]
        result = MergeIntervals.merge(intervals)
        # Should be sorted first, then merged
        self._assert_merged_intervals(result, [[1, 6], [8, 10], [15, 18]])

    def test_merge_complex_unordered(self):
        intervals = [[4, 5], [1, 4], [0, 0], [2, 3], [1, 5]]
        expected = [[0, 5]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, expected)

    def test_merge_with_negative_numbers(self):
        intervals = [[-5, -2], [-3, 0], [1, 1], [0, 2]]
        expected = [[-5, 2]]
        result = MergeIntervals.merge(intervals)
        self._assert_merged_intervals(result, expected)

    def test_merge_all_same_intervals(self):
        intervals = [[1,5], [1,5], [1,5]]
        expected = [[1,5]]
        result = MergeIntervals.merge(intervals)
        self.assertEqual(result, expected)

    def test_merge_random_intervals(self):
        for _ in range(10):
            size = random.randint(5, 50)
            intervals = []
            for _ in range(size):
                start = random.randint(-100, 100)
                end = start + random.randint(0, 50) # Ensure end >= start
                intervals.append([start, end])
            
            # Use the optimal merge method to get a reference
            # Need to deep copy for optimal, as it modifies in place
            reference_intervals = [list(i) for i in intervals]
            
            # Manual sorting and merging for comparison, mimicking the algorithm's expected output
            reference_intervals.sort(key=lambda x: x[0])
            expected_merged = []
            if reference_intervals:
                expected_merged.append(reference_intervals[0])
                for i in range(1, len(reference_intervals)):
                    current_interval = reference_intervals[i]
                    last_merged = expected_merged[-1]
                    if current_interval[0] <= last_merged[1]:
                        last_merged[1] = max(last_merged[1], current_interval[1])
                    else:
                        expected_merged.append(current_interval)

            result = MergeIntervals.merge(intervals)
            self._assert_merged_intervals(result, expected_merged)

    # --- Naive (No Sort Single Pass) Merge Tests ---
    # These tests are primarily to demonstrate when the naive approach fails
    # due to the lack of initial sorting.
    def test_naive_merge_empty(self):
        intervals = []
        result = MergeIntervals.merge_naive_no_initial_sort(intervals)
        self._assert_merged_intervals(result, [])

    def test_naive_merge_single_interval(self):
        intervals = [[1, 5]]
        result = MergeIntervals.merge_naive_no_initial_sort(intervals)
        self._assert_merged_intervals(result, [[1, 5]])

    def test_naive_merge_already_sorted_no_overlap(self):
        intervals = [[1, 2], [3, 4], [5, 6]]
        result = MergeIntervals.merge_naive_no_initial_sort(intervals)
        self._assert_merged_intervals(result, [[1, 2], [3, 4], [5, 6]])

    def test_naive_merge_already_sorted_with_overlap(self):
        intervals = [[1, 3], [2, 6], [8, 10]]
        result = MergeIntervals.merge_naive_no_initial_sort(intervals)
        self._assert_merged_intervals(result, [[1, 6], [8, 10]])

    def test_naive_merge_failure_unsorted_non_adjacent_overlap(self):
        # This is a key test to show the failure of the naive method
        intervals = [[1, 4], [8, 10], [2, 3]]
        # The naive method (single pass without sort) would process:
        # 1. [[1,4]]
        # 2. [[1,4], [8,10]] (no overlap with [1,4])
        # 3. [[1,4], [8,10], [2,3]] (no overlap with [8,10], and [2,3] is not checked against [1,4])
        # The correct result after sorting would be [[1,4], [8,10]] or [[1,4]] if [2,3] was meant to merge.
        # But if you process [2,3] before [1,4] it's [2,3], then [1,4] added.
        
        # What `merge_naive_no_initial_sort` actually does:
        # [1,4] -> result=[[1,4]]
        # [8,10] -> no overlap with [1,4] -> result=[[1,4], [8,10]]
        # [2,3] -> no overlap with [8,10] -> result=[[1,4], [8,10], [2,3]]
        # This result is incorrect. The expected correct is [[1,4], [8,10]]
        expected_failure_result = [[1,4], [8,10], [2,3]] # Actual result of the naive approach
        result = MergeIntervals.merge_naive_no_initial_sort(intervals)
        self.assertEqual(result, expected_failure_result, "Naive merge should produce this unsorted partial result.")
        
        # Assert that this naive result is NOT the optimally merged one
        optimal_result = MergeIntervals.merge([list(i) for i in intervals])
        self.assertNotEqual(result, optimal_result, "Naive approach correctly demonstrated failure against optimal.")


if __name__ == '__main__':
    unittest.main()