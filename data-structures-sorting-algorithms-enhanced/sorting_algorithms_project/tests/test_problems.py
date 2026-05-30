import unittest
import copy

from problems.problem_1_two_sum_sorted import two_sum_brute_force, two_sum_hash_map, two_sum_two_pointers
from problems.problem_2_merge_intervals import merge_intervals
from problems.problem_3_k_largest_elements import find_kth_largest_sort, find_kth_largest_min_heap
from additional_implementations.quickselect import find_kth_largest_quickselect
from problems.problem_4_sort_colors import sort_colors_two_pass_counting, sort_colors_one_pass_three_pointers

class TestProblems(unittest.TestCase):

    # --- Problem 1: Two Sum (Sorted Array) ---
    def test_two_sum(self):
        test_cases = [
            ([2, 7, 11, 15], 9, [1, 2]),
            ([2, 3, 4], 6, [1, 3]),
            ([-1, 0], -1, [1, 2]),
            ([1, 2, 3, 4, 5], 9, [4, 5]),
            ([1, 3, 4, 5, 7, 10, 11], 9, [3, 4]), # Custom case
            ([1, 2, 3, 4, 5], 10, []), # No solution
            ([], 5, []), # Empty array
            ([5], 5, []), # Single element array
        ]

        # Brute Force
        for numbers, target, expected in test_cases:
            with self.subTest(msg=f"Brute Force: {numbers}, target={target}"):
                self.assertEqual(two_sum_brute_force(numbers, target), expected)
        
        # Hash Map
        for numbers, target, expected in test_cases:
            with self.subTest(msg=f"Hash Map: {numbers}, target={target}"):
                self.assertEqual(two_sum_hash_map(numbers, target), expected)

        # Two Pointers (Optimal for Sorted Array)
        for numbers, target, expected in test_cases:
            with self.subTest(msg=f"Two Pointers: {numbers}, target={target}"):
                self.assertEqual(two_sum_two_pointers(numbers, target), expected)

    # --- Problem 2: Merge Intervals ---
    def test_merge_intervals(self):
        test_cases = [
            ([[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]]),
            ([[1,4],[4,5]], [[1,5]]), # Adjacent intervals
            ([[1,4],[0,4]], [[0,4]]), # Contains interval
            ([[1,4],[0,0]], [[0,0],[1,4]]), # No overlap
            ([[1,4],[0,1]], [[0,4]]), # Overlap at boundary
            ([[1,4],[2,3]], [[1,4]]), # Contained interval
            ([[1,10],[2,3],[4,5],[6,7],[8,9]], [[1,10]]), # All merge into one
            ([], []), # Empty list
            ([[1,5]], [[1,5]]), # Single interval
            ([[1,2],[3,4],[5,6]], [[1,2],[3,4],[5,6]]), # No overlap, sorted
            ([[3,4],[1,2],[5,6]], [[1,2],[3,4],[5,6]]), # No overlap, unsorted
            ([[2,3],[4,5],[6,7],[8,9],[1,10]], [[1,10]]), # Unsorted, all merge
        ]

        for intervals, expected in test_cases:
            with self.subTest(msg=f"Merge Intervals: {intervals}"):
                # Merge Intervals modifies the list in place after sorting a copy.
                # The function itself creates a new list, so no deepcopy needed on intervals.
                self.assertEqual(merge_intervals(intervals), expected)

    # --- Problem 3: Kth Largest Element ---
    def test_kth_largest_element(self):
        test_cases = [
            ([3,2,1,5,6,4], 2, 5),
            ([3,2,3,1,2,4,5,5,6], 4, 4),
            ([1], 1, 1),
            ([7,6,5,4,3,2,1], 5, 3), # k=5, 5th largest is 3
            ([10,20,30,40,50], 1, 50), # largest
            ([10,20,30,40,50], 5, 10), # smallest
            ([0,0,0,0,0], 3, 0), # duplicates
        ]
        
        # Sort and Pick
        for nums, k, expected in test_cases:
            with self.subTest(msg=f"Sort & Pick: {nums}, k={k}"):
                # find_kth_largest_sort modifies nums in place, so pass a copy
                self.assertEqual(find_kth_largest_sort(copy.deepcopy(nums), k), expected)
        
        # Min-Heap
        for nums, k, expected in test_cases:
            with self.subTest(msg=f"Min-Heap: {nums}, k={k}"):
                self.assertEqual(find_kth_largest_min_heap(nums, k), expected)

        # Quickselect
        for nums, k, expected in test_cases:
            with self.subTest(msg=f"Quickselect: {nums}, k={k}"):
                # Quickselect modifies nums in place, so pass a copy
                self.assertEqual(find_kth_largest_quickselect(copy.deepcopy(nums), k), expected)
        
        # Test edge cases for k
        with self.assertRaises(ValueError):
            find_kth_largest_sort([], 1)
        with self.assertRaises(ValueError):
            find_kth_largest_min_heap([1], 0)
        with self.assertRaises(ValueError):
            find_kth_largest_quickselect([1,2], 3)

    # --- Problem 4: Sort Colors ---
    def test_sort_colors(self):
        test_cases = [
            ([2,0,2,1,1,0], [0,0,1,1,2,2]),
            ([2,0,1], [0,1,2]),
            ([0], [0]),
            ([1], [1]),
            ([2], [2]),
            ([0,0,0], [0,0,0]),
            ([1,1,1], [1,1,1]),
            ([2,2,2], [2,2,2]),
            ([0,1,2], [0,1,2]),
            ([2,1,0], [0,1,2]),
            ([1,0,2], [0,1,2]),
            ([], []), # Empty array
            ([0,2,1,0,1,2,0,1,2], [0,0,0,1,1,1,2,2,2]) # Longer array
        ]

        # Two-Pass Counting Sort
        for nums, expected in test_cases:
            with self.subTest(msg=f"Two-Pass Counting: {nums}"):
                nums_copy = copy.deepcopy(nums)
                sort_colors_two_pass_counting(nums_copy)
                self.assertEqual(nums_copy, expected)
        
        # One-Pass Three-Pointers (Optimal)
        for nums, expected in test_cases:
            with self.subTest(msg=f"One-Pass Three-Pointers: {nums}"):
                nums_copy = copy.deepcopy(nums)
                sort_colors_one_pass_three_pointers(nums_copy)
                self.assertEqual(nums_copy, expected)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```