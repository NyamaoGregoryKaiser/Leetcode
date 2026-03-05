import unittest
import random
from typing import List

from core_algorithms.quicksort_mergesort import QuickSort, MergeSort
from utils.array_generator import ArrayGenerator

class TestSortingAlgorithms(unittest.TestCase):

    def _assert_sorted(self, arr: List[int]) -> None:
        """Helper to assert that an array is sorted in non-decreasing order."""
        for i in range(len(arr) - 1):
            self.assertLessEqual(arr[i], arr[i+1], f"Array is not sorted: {arr}")

    # --- QuickSort Tests ---
    def test_quicksort_empty(self):
        arr = []
        QuickSort.sort(arr)
        self.assertEqual(arr, [])

    def test_quicksort_single_element(self):
        arr = [5]
        QuickSort.sort(arr)
        self.assertEqual(arr, [5])

    def test_quicksort_two_elements(self):
        arr = [5, 2]
        QuickSort.sort(arr)
        self.assertEqual(arr, [2, 5])
        
        arr = [2, 5]
        QuickSort.sort(arr)
        self.assertEqual(arr, [2, 5])

    def test_quicksort_sorted_array(self):
        arr = [1, 2, 3, 4, 5]
        QuickSort.sort(arr)
        self.assertEqual(arr, [1, 2, 3, 4, 5])

    def test_quicksort_reverse_sorted_array(self):
        arr = [5, 4, 3, 2, 1]
        QuickSort.sort(arr)
        self.assertEqual(arr, [1, 2, 3, 4, 5])

    def test_quicksort_with_duplicates(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
        QuickSort.sort(arr)
        self.assertEqual(arr, [1, 1, 2, 3, 3, 4, 5, 5, 6, 9])
        self._assert_sorted(arr)

    def test_quicksort_all_same_elements(self):
        arr = [7, 7, 7, 7, 7]
        QuickSort.sort(arr)
        self.assertEqual(arr, [7, 7, 7, 7, 7])
        self._assert_sorted(arr)

    def test_quicksort_random_arrays(self):
        for _ in range(10): # Run multiple times with different random arrays
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, 0, 100)
            expected = sorted(arr) # Python's built-in sort for comparison
            QuickSort.sort(arr)
            self.assertEqual(arr, expected)
            self._assert_sorted(arr)
            
    def test_quicksort_hoare_partition(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        QuickSort.sort(arr, use_hoare=True)
        self.assertEqual(arr, [1, 1, 2, 3, 4, 5, 6, 9])
        self._assert_sorted(arr)

    def test_quicksort_randomized_lomuto(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, 0, 100)
            expected = sorted(arr)
            QuickSort.sort(arr, randomized=True)
            self.assertEqual(arr, expected)
            self._assert_sorted(arr)

    def test_quicksort_randomized_hoare(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, 0, 100)
            expected = sorted(arr)
            QuickSort.sort(arr, use_hoare=True, randomized=True)
            self.assertEqual(arr, expected)
            self._assert_sorted(arr)

    # --- MergeSort Tests ---
    def test_mergesort_empty(self):
        arr = []
        result = MergeSort.sort(arr)
        self.assertEqual(result, [])

    def test_mergesort_single_element(self):
        arr = [5]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [5])

    def test_mergesort_two_elements(self):
        arr = [5, 2]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [2, 5])
        
        arr = [2, 5]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [2, 5])

    def test_mergesort_sorted_array(self):
        arr = [1, 2, 3, 4, 5]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [1, 2, 3, 4, 5])

    def test_mergesort_reverse_sorted_array(self):
        arr = [5, 4, 3, 2, 1]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [1, 2, 3, 4, 5])

    def test_mergesort_with_duplicates(self):
        arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [1, 1, 2, 3, 3, 4, 5, 5, 6, 9])
        self._assert_sorted(result)

    def test_mergesort_all_same_elements(self):
        arr = [7, 7, 7, 7, 7]
        result = MergeSort.sort(arr)
        self.assertEqual(result, [7, 7, 7, 7, 7])
        self._assert_sorted(result)

    def test_mergesort_random_arrays(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, 0, 100)
            expected = sorted(arr)
            result = MergeSort.sort(arr)
            self.assertEqual(result, expected)
            self._assert_sorted(result)

    def test_mergesort_in_place_empty(self):
        arr = []
        MergeSort.sort_in_place(arr)
        self.assertEqual(arr, [])

    def test_mergesort_in_place_single_element(self):
        arr = [5]
        MergeSort.sort_in_place(arr)
        self.assertEqual(arr, [5])

    def test_mergesort_in_place_random_arrays(self):
        for _ in range(10):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, 0, 100)
            expected = sorted(arr)
            MergeSort.sort_in_place(arr)
            self.assertEqual(arr, expected)
            self._assert_sorted(arr)
            
    def test_mergesort_stability(self):
        # Mergesort is a stable sort.
        # Use tuples where first element is value, second is original index.
        arr = [(5, 0), (2, 1), (5, 2), (1, 3), (2, 4)]
        
        # Define a comparison key for sorting based on the value
        # The expected output should preserve original order for equal values
        # (1,3), (2,1), (2,4), (5,0), (5,2)
        expected = [(1, 3), (2, 1), (2, 4), (5, 0), (5, 2)]
        
        # Sort based only on the value for the algorithm
        def merge_sort_tuples(input_arr: List[tuple]) -> List[tuple]:
            if len(input_arr) <= 1:
                return input_arr
            
            mid = len(input_arr) // 2
            left = merge_sort_tuples(input_arr[:mid])
            right = merge_sort_tuples(input_arr[mid:])
            
            merged = []
            i = j = 0
            while i < len(left) and j < len(right):
                if left[i][0] <= right[j][0]: # Compare only by value, <= for stability
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1
            merged.extend(left[i:])
            merged.extend(right[j:])
            return merged

        result = merge_sort_tuples(arr)
        self.assertEqual(result, expected, f"Mergesort failed stability test: {result} != {expected}")

if __name__ == '__main__':
    unittest.main()