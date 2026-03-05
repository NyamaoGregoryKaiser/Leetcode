import unittest
import random
from typing import List

from core_algorithms.sort_colors import SortColors
from utils.array_generator import ArrayGenerator

class TestSortColors(unittest.TestCase):

    def _assert_sorted_colors(self, arr: List[int]) -> None:
        """Helper to assert that an array of colors is sorted (0s, then 1s, then 2s)."""
        if not arr:
            return
        
        last_val = arr[0]
        for i in range(1, len(arr)):
            self.assertLessEqual(last_val, arr[i], f"Array is not sorted: {arr}")
            last_val = arr[i]
            
        # Ensure only 0, 1, 2 are present
        for x in arr:
            self.assertIn(x, [0, 1, 2], f"Invalid color found: {x} in {arr}")

    # --- Dutch National Flag Tests ---
    def test_dnf_empty(self):
        arr = []
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [])

    def test_dnf_single_element(self):
        arr = [0]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [0])
        arr = [1]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [1])
        arr = [2]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [2])

    def test_dnf_basic(self):
        arr = [2, 0, 2, 1, 1, 0]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [0, 0, 1, 1, 2, 2])
        self._assert_sorted_colors(arr)

    def test_dnf_sorted_array(self):
        arr = [0, 0, 1, 1, 2, 2]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [0, 0, 1, 1, 2, 2])
        self._assert_sorted_colors(arr)

    def test_dnf_reverse_sorted_array(self):
        arr = [2, 2, 1, 1, 0, 0]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [0, 0, 1, 1, 2, 2])
        self._assert_sorted_colors(arr)

    def test_dnf_all_zeros(self):
        arr = [0, 0, 0, 0]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [0, 0, 0, 0])
        self._assert_sorted_colors(arr)

    def test_dnf_all_ones(self):
        arr = [1, 1, 1, 1]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [1, 1, 1, 1])
        self._assert_sorted_colors(arr)

    def test_dnf_all_twos(self):
        arr = [2, 2, 2, 2]
        SortColors.sort_colors_dutch_national_flag(arr)
        self.assertEqual(arr, [2, 2, 2, 2])
        self._assert_sorted_colors(arr)
        
    def test_dnf_mixed_random_arrays(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = [random.randint(0, 2) for _ in range(size)]
            expected = sorted(arr)
            SortColors.sort_colors_dutch_national_flag(arr)
            self.assertEqual(arr, expected)
            self._assert_sorted_colors(arr)

    # --- Counting Sort Tests ---
    def test_counting_sort_empty(self):
        arr = []
        SortColors.sort_colors_counting_sort(arr)
        self.assertEqual(arr, [])

    def test_counting_sort_single_element(self):
        arr = [0]
        SortColors.sort_colors_counting_sort(arr)
        self.assertEqual(arr, [0])

    def test_counting_sort_basic(self):
        arr = [2, 0, 2, 1, 1, 0]
        SortColors.sort_colors_counting_sort(arr)
        self.assertEqual(arr, [0, 0, 1, 1, 2, 2])
        self._assert_sorted_colors(arr)

    def test_counting_sort_random_arrays(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = [random.randint(0, 2) for _ in range(size)]
            expected = sorted(arr)
            SortColors.sort_colors_counting_sort(arr)
            self.assertEqual(arr, expected)
            self._assert_sorted_colors(arr)

    def test_counting_sort_value_error(self):
        arr = [0, 1, 3, 2] # Contains invalid color 3
        with self.assertRaises(ValueError):
            SortColors.sort_colors_counting_sort(arr)
            
    # --- Python Built-in Sort Tests ---
    def test_python_sort_basic(self):
        arr = [2, 0, 2, 1, 1, 0]
        SortColors.sort_colors_python_sort(arr)
        self.assertEqual(arr, [0, 0, 1, 1, 2, 2])
        self._assert_sorted_colors(arr)

    def test_python_sort_random_arrays(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = [random.randint(0, 2) for _ in range(size)]
            expected = sorted(arr)
            SortColors.sort_colors_python_sort(arr)
            self.assertEqual(arr, expected)
            self._assert_sorted_colors(arr)

if __name__ == '__main__':
    unittest.main()