import unittest
import random
from sorting_problems.k_largest_element import (
    find_kth_largest_quickselect,
    find_kth_largest_sort,
    find_kth_largest_heap
)

class TestKthLargestElement(unittest.TestCase):

    def setUp(self):
        # List of functions to test, along with their names for reporting
        self.functions = [
            (find_kth_largest_quickselect, "Quickselect"),
            (find_kth_largest_sort, "Sort"),
            (find_kth_largest_heap, "Min-Heap")
        ]

    def _test_all_functions(self, nums, k, expected):
        """Helper to run a test case across all implemented functions."""
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} for nums={nums}, k={k}"):
                # Pass a copy of nums because Quickselect modifies in-place
                actual = func(list(nums), k)
                self.assertEqual(actual, expected)

    def test_basic_cases(self):
        self._test_all_functions([3, 2, 1, 5, 6, 4], 2, 5)
        self._test_all_functions([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4)
        self._test_all_functions([1], 1, 1)
        self._test_all_functions([7, 6, 5, 4, 3, 2, 1], 5, 3)

    def test_duplicate_elements(self):
        self._test_all_functions([3, 2, 3, 1, 2, 4, 5, 5, 6], 1, 6)
        self._test_all_functions([3, 2, 3, 1, 2, 4, 5, 5, 6], 9, 1)
        self._test_all_functions([2, 2, 2, 2, 2], 3, 2)

    def test_single_element_array(self):
        self._test_all_functions([100], 1, 100)

    def test_sorted_array(self):
        self._test_all_functions([1, 2, 3, 4, 5], 1, 5)
        self._test_all_functions([1, 2, 3, 4, 5], 3, 3)
        self._test_all_functions([1, 2, 3, 4, 5], 5, 1)

    def test_reverse_sorted_array(self):
        self._test_all_functions([5, 4, 3, 2, 1], 1, 5)
        self._test_all_functions([5, 4, 3, 2, 1], 3, 3)
        self._test_all_functions([5, 4, 3, 2, 1], 5, 1)

    def test_large_array(self):
        nums = [random.randint(0, 1000000) for _ in range(1000)]
        k = random.randint(1, 1000)
        
        # Determine expected value once using sorting, which is reliable
        expected = sorted(nums, reverse=True)[k-1]

        self._test_all_functions(nums, k, expected)
        
        # Test for k=1 (largest)
        expected_largest = max(nums)
        self._test_all_functions(nums, 1, expected_largest)

        # Test for k=N (smallest)
        expected_smallest = min(nums)
        self._test_all_functions(nums, len(nums), expected_smallest)

    def test_edge_cases_invalid_k(self):
        for func, name in self.functions:
            with self.subTest(msg=f"Testing {name} with k=0"):
                with self.assertRaises(ValueError):
                    func([1, 2, 3], 0)
            with self.subTest(msg=f"Testing {name} with k > len(nums)"):
                with self.assertRaises(ValueError):
                    func([1, 2, 3], 4)
            with self.subTest(msg=f"Testing {name} with empty nums"):
                with self.assertRaises(ValueError):
                    func([], 1)
            with self.subTest(msg=f"Testing {name} with empty nums and k=0"):
                with self.assertRaises(ValueError):
                    func([], 0)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)