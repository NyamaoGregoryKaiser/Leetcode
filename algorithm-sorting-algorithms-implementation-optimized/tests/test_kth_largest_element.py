import unittest
import random
from typing import List

from core_algorithms.kth_largest_element import KthLargestElement
from utils.array_generator import ArrayGenerator

class TestKthLargestElement(unittest.TestCase):

    # --- Quickselect Tests ---
    def test_quickselect_basic(self):
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([3, 2, 1, 5, 6, 4], 2), 5)
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)

    def test_quickselect_single_element(self):
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([1], 1), 1)

    def test_quickselect_largest_k(self):
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([7, 6, 5, 4, 3, 2, 1], 1), 7) # 1st largest
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([10, 20, 30, 40, 50], 1), 50)

    def test_quickselect_smallest_k(self):
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([7, 6, 5, 4, 3, 2, 1], 7), 1) # 7th largest
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([10, 20, 30, 40, 50], 5), 10)

    def test_quickselect_duplicates(self):
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([1, 1, 1, 1, 1], 3), 1)
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([3, 2, 3, 1, 2, 4, 5, 5, 6], 1), 6)
        self.assertEqual(KthLargestElement.find_kth_largest_quickselect([3, 2, 3, 1, 2, 4, 5, 5, 6], 3), 5)

    def test_quickselect_random_arrays(self):
        for _ in range(20):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, -100, 100)
            k = random.randint(1, size)
            
            expected = sorted(arr, reverse=True)[k-1] # Use Python sort for expected
            result = KthLargestElement.find_kth_largest_quickselect(arr, k)
            self.assertEqual(result, expected, f"Failed for arr={arr}, k={k}")

    def test_quickselect_value_errors(self):
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_quickselect([], 1)
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_quickselect([1, 2, 3], 0)
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_quickselect([1, 2, 3], 4)

    # --- Heap-based Tests ---
    def test_heap_basic(self):
        self.assertEqual(KthLargestElement.find_kth_largest_heap([3, 2, 1, 5, 6, 4], 2), 5)
        self.assertEqual(KthLargestElement.find_kth_largest_heap([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)

    def test_heap_single_element(self):
        self.assertEqual(KthLargestElement.find_kth_largest_heap([1], 1), 1)

    def test_heap_largest_k(self):
        self.assertEqual(KthLargestElement.find_kth_largest_heap([7, 6, 5, 4, 3, 2, 1], 1), 7)
        self.assertEqual(KthLargestElement.find_kth_largest_heap([10, 20, 30, 40, 50], 1), 50)

    def test_heap_smallest_k(self):
        self.assertEqual(KthLargestElement.find_kth_largest_heap([7, 6, 5, 4, 3, 2, 1], 7), 1)
        self.assertEqual(KthLargestElement.find_kth_largest_heap([10, 20, 30, 40, 50], 5), 10)

    def test_heap_duplicates(self):
        self.assertEqual(KthLargestElement.find_kth_largest_heap([1, 1, 1, 1, 1], 3), 1)
        self.assertEqual(KthLargestElement.find_kth_largest_heap([3, 2, 3, 1, 2, 4, 5, 5, 6], 1), 6)
        self.assertEqual(KthLargestElement.find_kth_largest_heap([3, 2, 3, 1, 2, 4, 5, 5, 6], 3), 5)

    def test_heap_random_arrays(self):
        for _ in range(20):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, -100, 100)
            k = random.randint(1, size)
            
            expected = sorted(arr, reverse=True)[k-1]
            result = KthLargestElement.find_kth_largest_heap(arr, k)
            self.assertEqual(result, expected, f"Failed for arr={arr}, k={k}")

    def test_heap_value_errors(self):
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_heap([], 1)
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_heap([1, 2, 3], 0)
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_heap([1, 2, 3], 4)

    # --- Sort-based Tests ---
    def test_sort_basic(self):
        self.assertEqual(KthLargestElement.find_kth_largest_sort([3, 2, 1, 5, 6, 4], 2), 5)
        self.assertEqual(KthLargestElement.find_kth_largest_sort([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)

    def test_sort_single_element(self):
        self.assertEqual(KthLargestElement.find_kth_largest_sort([1], 1), 1)

    def test_sort_largest_k(self):
        self.assertEqual(KthLargestElement.find_kth_largest_sort([7, 6, 5, 4, 3, 2, 1], 1), 7)
        self.assertEqual(KthLargestElement.find_kth_largest_sort([10, 20, 30, 40, 50], 1), 50)

    def test_sort_smallest_k(self):
        self.assertEqual(KthLargestElement.find_kth_largest_sort([7, 6, 5, 4, 3, 2, 1], 7), 1)
        self.assertEqual(KthLargestElement.find_kth_largest_sort([10, 20, 30, 40, 50], 5), 10)

    def test_sort_duplicates(self):
        self.assertEqual(KthLargestElement.find_kth_largest_sort([1, 1, 1, 1, 1], 3), 1)
        self.assertEqual(KthLargestElement.find_kth_largest_sort([3, 2, 3, 1, 2, 4, 5, 5, 6], 1), 6)
        self.assertEqual(KthLargestElement.find_kth_largest_sort([3, 2, 3, 1, 2, 4, 5, 5, 6], 3), 5)

    def test_sort_random_arrays(self):
        for _ in range(20):
            size = random.randint(10, 100)
            arr = ArrayGenerator.generate_random_array(size, -100, 100)
            k = random.randint(1, size)
            
            expected = sorted(arr, reverse=True)[k-1]
            result = KthLargestElement.find_kth_largest_sort(arr, k)
            self.assertEqual(result, expected, f"Failed for arr={arr}, k={k}")

    def test_sort_value_errors(self):
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_sort([], 1)
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_sort([1, 2, 3], 0)
        with self.assertRaises(ValueError):
            KthLargestElement.find_kth_largest_sort([1, 2, 3], 4)

if __name__ == '__main__':
    unittest.main()