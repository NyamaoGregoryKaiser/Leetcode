import unittest
import random
import copy

from algorithms.bubble_sort import bubble_sort
from algorithms.selection_sort import selection_sort
from algorithms.insertion_sort import insertion_sort
from algorithms.merge_sort import merge_sort, merge_sort_in_place
from algorithms.quick_sort import quick_sort
from algorithms.heap_sort import heap_sort

from utils.array_generator import generate_random_array, generate_sorted_array, generate_reverse_sorted_array, generate_array_with_duplicates

class TestSortingAlgorithms(unittest.TestCase):

    def setUp(self):
        """Set up for all test methods."""
        self.algorithms = {
            "Bubble Sort": bubble_sort,
            "Selection Sort": selection_sort,
            "Insertion Sort": insertion_sort,
            "Merge Sort (new list)": lambda arr: merge_sort(copy.deepcopy(arr)), # Merge Sort returns a new list
            "Merge Sort (in-place)": merge_sort_in_place, # Modifies in-place
            "Quick Sort (last pivot)": lambda arr: quick_sort(arr, pivot_choice="last"),
            "Quick Sort (first pivot)": lambda arr: quick_sort(arr, pivot_choice="first"),
            "Quick Sort (middle pivot)": lambda arr: quick_sort(arr, pivot_choice="middle"),
            "Quick Sort (random pivot)": lambda arr: quick_sort(arr, pivot_choice="random"),
            "Heap Sort": heap_sort,
        }

    def _test_sort(self, sort_func, arr, expected_sorted_arr):
        """Helper to test a given sort function."""
        # For merge_sort (new list) specifically, we need to pass a copy and compare the return value.
        # For in-place sorts, we pass the original and check if it's modified.
        if "Merge Sort (new list)" in sort_func.__name__: # This check is a bit tricky due to lambda names
            sorted_arr = sort_func(copy.deepcopy(arr))
            self.assertEqual(sorted_arr, expected_sorted_arr)
        else:
            original_arr_copy = copy.deepcopy(arr) # Keep original for in-place modification
            sort_func(original_arr_copy)
            self.assertEqual(original_arr_copy, expected_sorted_arr)

    def test_empty_array(self):
        """Test sorting an empty array."""
        empty_arr = []
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                # For merge_sort that returns new list
                if name == "Merge Sort (new list)":
                    result = func([])
                    self.assertEqual(result, [])
                else:
                    arr_copy = []
                    func(arr_copy)
                    self.assertEqual(arr_copy, [])

    def test_single_element_array(self):
        """Test sorting an array with a single element."""
        single_arr = [5]
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                # For merge_sort that returns new list
                if name == "Merge Sort (new list)":
                    result = func([5])
                    self.assertEqual(result, [5])
                else:
                    arr_copy = [5]
                    func(arr_copy)
                    self.assertEqual(arr_copy, [5])

    def test_already_sorted_array(self):
        """Test sorting an array that is already sorted."""
        arr = generate_sorted_array(10)
        expected = copy.deepcopy(arr)
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                self._test_sort(func, arr, expected)

    def test_reverse_sorted_array(self):
        """Test sorting a reverse-sorted array."""
        arr = generate_reverse_sorted_array(10)
        expected = sorted(copy.deepcopy(arr))
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                self._test_sort(func, arr, expected)

    def test_random_array(self):
        """Test sorting a random array."""
        arr = generate_random_array(100, -100, 100)
        expected = sorted(copy.deepcopy(arr))
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                self._test_sort(func, arr, expected)

    def test_array_with_duplicates(self):
        """Test sorting an array containing duplicate elements."""
        arr = generate_array_with_duplicates(20, 0, 5) # e.g., [1, 3, 0, 1, 2, 3, 0, 4, 2, ...]
        expected = sorted(copy.deepcopy(arr))
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                self._test_sort(func, arr, expected)

    def test_large_random_array(self):
        """Test sorting a large random array."""
        arr = generate_random_array(1000, -1000, 1000)
        expected = sorted(copy.deepcopy(arr))
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                # We can skip O(N^2) sorts for very large arrays in unit tests
                if name in ["Bubble Sort", "Selection Sort", "Insertion Sort"] and len(arr) > 100:
                    continue # Skip very slow sorts for large inputs
                self._test_sort(func, arr, expected)

    def test_array_with_negative_numbers(self):
        """Test sorting an array with negative numbers."""
        arr = generate_random_array(50, -100, -1)
        expected = sorted(copy.deepcopy(arr))
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                self._test_sort(func, arr, expected)

    def test_array_with_mixed_numbers(self):
        """Test sorting an array with mixed positive, negative, and zero."""
        arr = generate_random_array(50, -50, 50)
        expected = sorted(copy.deepcopy(arr))
        for name, func in self.algorithms.items():
            with self.subTest(algorithm=name):
                self._test_sort(func, arr, expected)

    def test_stability_merge_sort(self):
        """
        Test stability for Merge Sort (known to be stable).
        Elements are tuples (value, original_index) to track stability.
        """
        arr = [(5, 0), (2, 1), (5, 2), (1, 3), (2, 4)]
        # Expected sorted based on value, then original index for stability
        expected = [(1, 3), (2, 1), (2, 4), (5, 0), (5, 2)]
        
        # Merge Sort (new list) is explicitly designed for stability.
        result = merge_sort(copy.deepcopy(arr))
        self.assertEqual(result, expected)

    def test_instability_quick_sort_and_selection_sort(self):
        """
        Demonstrate instability for Quick Sort and Selection Sort (known to be unstable).
        Elements are tuples (value, original_index) to track stability.
        A specific test case that is known to break stability.
        """
        arr_base = [(5, 'a'), (2, 'b'), (5, 'c')]
        # If sorted by value: [(2, 'b'), (5, 'a'), (5, 'c')] or [(2, 'b'), (5, 'c'), (5, 'a')]
        # Stable output should be [(2, 'b'), (5, 'a'), (5, 'c')]

        # Test Selection Sort
        arr_selection = list(arr_base)
        selection_sort(arr_selection)
        # Expected to be unstable: (5, 'a') might swap with (2, 'b') placing it after (5, 'c')
        # This specific input for selection sort will swap (5, 'a') with (2, 'b') first
        # then find smallest (2,'b'), swap with (5,'a'), then find (5,'c') as smallest of remaining, then swap (5,'c') with (5,'a')
        # Original: [(5, 'a'), (2, 'b'), (5, 'c')]
        # Smallest is (2, 'b'), swap with (5, 'a'): [(2, 'b'), (5, 'a'), (5, 'c')] -- in this specific case, it happens to be stable
        # Let's try a different one: [3a, 4, 2, 3b] -> [2, 3b, 4, 3a] - 3a and 3b order changed
        arr_unstable_selection = [(3, 'a'), (4, 'b'), (2, 'c'), (3, 'd')]
        selection_sort(arr_unstable_selection)
        self.assertNotEqual(arr_unstable_selection, [(2, 'c'), (3, 'a'), (3, 'd'), (4, 'b')]) # This would be stable
        self.assertEqual(arr_unstable_selection, [(2, 'c'), (3, 'd'), (3, 'a'), (4, 'b')]) # The expected unstable output

        # Test Quick Sort (can be unstable depending on pivot and partition)
        arr_quick = list(arr_base)
        quick_sort(arr_quick)
        # The exact output depends on pivot choice and partition logic.
        # It's hard to guarantee a specific unstable output without knowing exact swaps.
        # But generally, quicksort does not guarantee stability.
        # A simple test for stability would be to check against a stable sort's output.
        # For simplicity, we'll just check if it correctly sorts by value, and acknowledge instability
        # by not asserting specific tuple order beyond value.
        values_only = [item[0] for item in arr_quick]
        self.assertEqual(values_only, [2, 5, 5])
        # A true stability test would require more complex assertions or a larger dataset where instability is forced.

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```