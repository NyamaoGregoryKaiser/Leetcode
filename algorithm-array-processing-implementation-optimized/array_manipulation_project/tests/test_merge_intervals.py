import unittest
from copy import deepcopy
from src.problems.merge_intervals import merge_intervals_sort

class TestMergeIntervals(unittest.TestCase):

    def setUp(self):
        self.test_cases = [
            # Standard cases
            ([[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]]),
            ([[1,4],[4,5]], [[1,5]]), # Touching intervals
            ([[1,4],[0,4]], [[0,4]]), # Interval containing another
            ([[1,4],[0,1]], [[0,4]]), # Overlap at start
            ([[1,4],[0,0]], [[0,0],[1,4]]), # No overlap, different start times
            ([[2,3],[4,5],[6,7],[8,9],[1,10]], [[1,10]]), # All merge into one
            ([[1,10]], [[1,10]]), # Single interval
            ([], []), # Empty list
            ([[1,2]], [[1,2]]), # One interval
            ([[1,4],[0,4],[2,3]], [[0,4]]), # Internal overlaps, needs careful merging
            ([[1,3],[2,4],[5,7],[6,8]], [[1,4],[5,8]]), # Multiple merges
            ([[1,3],[4,6],[8,10]], [[1,3],[4,6],[8,10]]), # No overlaps
            ([[1,5],[2,3]], [[1,5]]), # Interval containing another
            ([[1,5],[0,3],[7,8],[9,10]], [[0,5],[7,8],[9,10]]), # Complex scenario
            ([[0,0],[1,1],[0,0]], [[0,0],[1,1]]) # Duplicates
        ]

    def test_merge_intervals_sort(self):
        print("\nTesting merge_intervals_sort...")
        for intervals, expected in self.test_cases:
            with self.subTest(msg=f"Input: {intervals}"):
                # Use deepcopy to ensure original list is not modified for subsequent tests
                intervals_copy = deepcopy(intervals)
                result = merge_intervals_sort(intervals_copy)
                self.assertEqual(result, expected)
        print("merge_intervals_sort tests passed.")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)