import unittest
import random
import copy
from algorithms.sorting_algorithms import insertion_sort, merge_sort, quick_sort

class TestSortingAlgorithms(unittest.TestCase):

    def _verify_sort(self, sort_func, arr, expected_sorted_arr):
        """Helper to test sorting functions."""
        # For in-place sorts, pass a copy. For out-of-place, handle return value.
        if sort_func.__name__ == 'merge_sort':
            result = sort_func(arr)
            self.assertEqual(result, expected_sorted_arr,
                             f"Failed for {sort_func.__name__} on input {arr}")
        else:
            arr_copy = list(arr)
            sort_func(arr_copy)
            self.assertEqual(arr_copy, expected_sorted_arr,
                             f"Failed for {sort_func.__name__} on input {arr}")

    def test_empty_array(self):
        arr = []
        expected = []
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_single_element_array(self):
        arr = [5]
        expected = [5]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_already_sorted_array(self):
        arr = [1, 2, 3, 4, 5]
        expected = [1, 2, 3, 4, 5]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_reverse_sorted_array(self):
        arr = [5, 4, 3, 2, 1]
        expected = [1, 2, 3, 4, 5]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_array_with_duplicates(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
        expected = [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_array_with_negative_numbers(self):
        arr = [-5, 0, -10, 3, -1, 7]
        expected = [-10, -5, -1, 0, 3, 7]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_mixed_positive_negative_zero(self):
        arr = [0, -2, 5, -1, 3, 0, -4]
        expected = [-4, -2, -1, 0, 0, 3, 5]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_large_random_array(self):
        num_elements = 1000
        arr = [random.randint(-1000, 1000) for _ in range(num_elements)]
        expected = sorted(arr)
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_very_large_random_array(self):
        num_elements = 10000
        arr = [random.randint(-10000, 10000) for _ in range(num_elements)]
        expected = sorted(arr)
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_array_with_identical_elements(self):
        arr = [7, 7, 7, 7, 7]
        expected = [7, 7, 7, 7, 7]
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

    def test_almost_sorted_array(self):
        arr = list(range(100))
        # Introduce a few unsorted elements
        arr[50], arr[51] = arr[51], arr[50]
        arr[10], arr[90] = arr[90], arr[10]
        expected = sorted(arr)
        for sort_func in [insertion_sort, merge_sort, quick_sort]:
            with self.subTest(sort_func=sort_func.__name__):
                self._verify_sort(sort_func, arr, expected)

if __name__ == '__main__':
    unittest.main()